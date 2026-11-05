/* One engine for every fight. State machine: intro -> ready <-> busy -> won | lost.
   Input is only accepted in "ready", and every timer is tracked so a retry never
   inherits stale animations.
   Items: 1 Flask (heal), 2 Shield and 6 Eye Shield (toggles: they stay raised until they block an attack).
   Skills: 3 Magic Eye (marks a letter), 4 Dodge, 5 Freeze. */
(function () {
  const $ = (id) => document.getElementById(id);
  const L = HS.LEVELS,
    S = HS.load();
  const savedLanguage = S.language === "es" ? "es" : "en";
  HS.setLanguage(savedLanguage);
  const isSpanish = () => S.language === "es";
  const t = (key) => {
    const dictionary = window.HS_I18N || {};
    return (
      (dictionary[S.language] && dictionary[S.language][key]) ||
      (dictionary.en && dictionary.en[key]) ||
      key
    );
  };
  const enemyName = (level) =>
    isSpanish() ? level.nameEs || level.name : level.name;
  const hasBossNameReveal = (level) =>
    [
      "Gynn, the fallen angel",
      "Arkania, the Gatewarden",
      "Seraphiel, the pure angel",
      "Seraphiel, Lord of Lies",
    ].includes(level.name);
  const levelWords = (level) => {
    if (isSpanish() && !level.wordsEs) {
      console.error("Missing Spanish word list for", level.name);
      return {};
    }
    return isSpanish() ? level.wordsEs : level.words;
  };
  const hintFor = (level, answer) => {
    const words = levelWords(level);
    if (!words[answer]) {
      console.error("Missing selected-language hint for", level.name, answer);
      return "";
    }
    return words[answer];
  };
  const levelSpeech = (level, death) => {
    const localized = death ? level.deathSpeechEs : level.speechEs;
    const english = death ? level.deathSpeech : level.speech;
    if (isSpanish() && english && !localized) {
      console.error("Missing Spanish dialogue for", level.name);
      return [];
    }
    return isSpanish() ? localized || [] : english || [];
  };
  // The true Seraphiel (phase 3) cannot be felled by a single word: it takes six.
  const finalFour = () =>
    !!(lvl && lvl.final && lvl.pos === 2 && lvl.finalWords);
  // While Gynn's Protection still has charges, it blesses every item and skill.
  const gynnBuff = () =>
    finalFour() && round.gynnActive && round.gynnCharges > 0;
  const bossTitle = () =>
    isSpanish()
      ? lvl.speechTitleEs || lvl.speechTitle || lvl.name
      : lvl.speechTitle || lvl.name;
  // Fetch a localized scripted speech array by its base key (e.g. "transformSpeech").
  const speechArray = (key) => {
    const localized = lvl[key + "Es"];
    const english = lvl[key];
    if (isSpanish() && english && !localized) {
      console.error("Missing Spanish dialogue for", lvl.name, key);
      return [];
    }
    return isSpanish() ? localized || [] : english || [];
  };
  let sealedGearOwner = null;
  const P = $("pSprite"),
    E = $("eSprite");
  const FR = $("freeze"),
    DS = $("debugShield");
  const PL = {
    idle: "playerIdle.gif",
    attack: "playerAttack.gif",
    hurt: "playerHurt.gif",
    death: "playerDeath.gif",
    dead: "playerIsDead.png",
    defense: "playerDefense.png",
  };
  const localizedCallout = (key, params) => {
    let text = t(key);
    Object.keys(params || {}).forEach((name) => {
      text = text.replace("{" + name + "}", params[name]);
    });
    return text;
  };
  const enemyCallout = (text, kind) => {
    const c = document.createElement("div");
    c.className = "enemy-callout " + (kind || "");
    c.textContent = text;
    c.style.right = "2%";
    c.style.bottom = "calc(var(--ground, 6%) + 52%)";
    document.querySelector(".stage").appendChild(c);
    void c.offsetWidth;
    c.classList.add("show");
    setTimeout(() => c.remove(), 2000);
  };
  const updateStatusIcons = () => {
    const container = $("statusIcons");
    container.innerHTML = "";
    const add = (file, name, effect) => {
      const icon = document.createElement("img");
      icon.src = "img/" + file;
      icon.className = "status-icon";
      icon.alt = "Status: " + name;
      icon.dataset.tipName = name;
      icon.dataset.tipEffect = effect;
      container.appendChild(icon);
    };
    if (round.freezeUp)
      add("icons/enemy_frozenStatus.png", t("frozen"), t("enemyFrozenEffect"));
    if (round.stunCount > 0)
      add(
        "icons/enemy_stunnedStatus.png",
        t("stunned"),
        localizedCallout("stunEffect", { n: round.stunCount }),
      );
    $("eSlot").classList.toggle("stunned", round.stunCount > 0);
  };
  const HEAL = 40; // flask
  const SHIELD = 30; // damage a shield absorbs before it breaks
  const EYE_CHANCE = 0.38; // magic eye success rate
  const EYE_HEAL_MIN = 10,
    EYE_HEAL_MAX = 20; // bonus for guessing a letter the Eye marked
  const ROUNDS = 11;
  const WIN_HEAL = 20,
    WIN_HEAL_FINAL = 40; // HP healed by winning a fight (only a boss refills HP completely)
  const PERFECT_CHANCE = 0.25; // chance that a raised shield blocks an attack completely
  const TEMP_PERFECT_CHANCE = 0.33; // chance that a temp shield (from Eye) blocks an attack completely
  const EYE_BLEED_MIN = 10,
    EYE_BLEED_MAX = 20; // what a failed Magic Eye costs
  const EYE_CAN_KILL = false; // false: the bleeding can leave you at 1 HP but never kills you
  const DODGE_CHANCE = 0.4; // chance that a raised dodge avoids the next attack
  const CRIT_CHANCE_ENEMY = 0.1; // DEBUG: guarantee a critical hit on every enemy attack
  const CRIT_CHANCE_BOSS = 0.13; // DEBUG: guarantee a critical hit on every boss attack
  const CRIT_MULTIPLIER = 1.25; // crit attacks deal 25% more damage
  let optionsOpen = false,
    weirdTimer = null;
  const BANNER_MS = 3200; // PHASE banner on screen
  const ARENA_MS = 3000; // arena look change between final boss phases

  let lvl,
    round,
    phase = "busy",
    timers = [];
  const snd = (n) => HS.sfx(n, lvl.pitch); // enemy sounds use the level's pitch
  const setImg = (el, f) => {
    el.src = "img/sprites/" + f.replace(/^newRound[0-9]+\//, "");
  };
  const pose = (name) => {
    setImg(E, lvl.sprites[name]);
    E.dataset.pose = name;
    const poseFile = (lvl.sprites[name] || "").replace(/^newRound[0-9]+\//, "");
    const idleFile = (lvl.sprites.idle || "").replace(/^newRound[0-9]+\//, "");
    const fallback = name !== "idle" && poseFile === idleFile;
    E.dataset.poseFallback = fallback ? "true" : "false";
    E.dataset.poseVariant = lvl.cssPoseVariant || "default";
    E.dataset.deathEffect =
      lvl.sprites.death === lvl.sprites.idle ? "disintegrate" : "sprite";
    // use a sprite-specific scale if provided (e.g. for defeated Seraphiel)
    const s =
      name === "defeated" && lvl.sprites.scale
        ? lvl.sprites.scale
        : lvl.scale || 1;
    $("eSlot").style.setProperty("--es", s);
  };
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  const eyeTargets = () =>
    [...new Set(round.word)].filter(
      (c) => !round.hits.includes(c) && !(round.marked || []).includes(c),
    );
  const complete = () => [...round.word].every((c) => round.hits.includes(c));
  [P, E].forEach((el) =>
    el.addEventListener("load", () =>
      el.style.setProperty("--nw", el.naturalWidth),
    ),
  );

  // the final boss lore plays once; not again on continue/retry
  let loreDone = false;
  // while set, the hint box is speaking these lines instead of lvl.speech
  // (the final boss's dying words before the next phase begins)
  let midSpeech = null;
  // The true form's cutscene also speaks through the hint box: scriptQueued holds
  // its lines and what to do once they are dismissed. A dialog popup can hand
  // control back to the cutscene when it closes, via learnOnClose.
  let scriptQueued = null;
  let learnOnClose = null;

  /* ---------- rendering ---------- */
  // fill = current HP, ghost = the chunk just lost (shown in yellow until the hit finishes)
  function hpBar(fill, ghost) {
    $("hpFill").style.width = fill + "%";
    $("hpGhost").style.width = (ghost === undefined ? fill : ghost) + "%";
    $("hpbar").setAttribute("aria-valuenow", Math.round(fill));
    $("hpcounter").textContent =
      t("hpWord") + ": " + Math.round(round.hp) + "/100";
  }
  function callout(text, kind) {
    // kind: 'hurt' (red), 'heal' (green) or nothing (gold)
    const c = $("callout");
    c.className = "callout " + (kind || "");
    c.textContent = text;
    void c.offsetWidth;
    c.classList.add("show");
  }
  function render() {
    const w = round.word;
    $("word").innerHTML = [...w]
      .map(
        (c) =>
          '<span class="slot" data-c="' +
          c +
          '">' +
          (round.hits.includes(c) ? c : "") +
          "</span>",
      )
      .join("");
    $("word").setAttribute(
      "aria-label",
      [...w]
        .map((c) =>
          round.hits.includes(c) ? c : isSpanish() ? "hueco" : "blank",
        )
        .join(" "),
    );
    $("wrong").textContent = round.misses.join(" ");
    if (!(lvl.speech && !round.speechDone)) setHint(hintFor(lvl, w));
    document.querySelectorAll(".key").forEach((k) => {
      const c = k.dataset.k,
        hit = round.hits.includes(c),
        miss = round.misses.includes(c);
      k.classList.toggle("hit", hit);
      k.classList.toggle("miss", miss);
      k.disabled = hit || miss;
      k.classList.toggle(
        "marked",
        !hit && !miss && (round.marked || []).includes(c),
      ); // Magic Eye
    });
    updateItems();
    updateStatusIcons();
  }
  function setHint(text) {
    // "NAME: speech": the speaker's name gets a darker tone of the speech color
    const h = $("hint");
    h.textContent = "";
    const hintPrefix =
      isSpanish() && lvl.hintPrefixEs ? lvl.hintPrefixEs : lvl.hintPrefix;
    if (hintPrefix && phase !== "speech") {
      h.textContent = hintPrefix + text;
      return;
    }
    const appendSpeechText = (content) => {
      const phrase = isSpanish() ? "Estrella Verde" : "The Green Star";
      const index = content.indexOf(phrase);
      if (index < 0) {
        h.appendChild(document.createTextNode(content));
        return;
      }
      h.appendChild(document.createTextNode(content.slice(0, index)));
      const emphasis = document.createElement("span");
      emphasis.className = "green-star-emphasis";
      emphasis.textContent = phrase;
      h.appendChild(emphasis);
      h.appendChild(
        document.createTextNode(content.slice(index + phrase.length)),
      );
    };
    const m = /^([^:]{1,24}:)([\s\S]*)$/.exec(text);
    if (m) {
      const who = document.createElement("span");
      who.className = "who";
      who.textContent = m[1];
      h.appendChild(who);
      appendSpeechText(m[2]);
    } else appendSpeechText(text);
  }
  function shade(hex) {
    // same hue, darker: the monochrome partner of a color
    const n = parseInt(hex.slice(1), 16),
      r = (n >> 16) / 255,
      g = ((n >> 8) & 255) / 255,
      b = (n & 255) / 255;
    const mx = Math.max(r, g, b),
      mn = Math.min(r, g, b),
      l = (mx + mn) / 2,
      d = mx - mn;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    let h = 0;
    if (d)
      h =
        mx === r
          ? ((g - b) / d + 6) % 6
          : mx === g
            ? (b - r) / d + 2
            : (r - g) / d + 4;
    return (
      "hsl(" +
      Math.round(h * 60) +
      "," +
      Math.round(s * 100) +
      "%," +
      Math.round(l * 52) +
      "%)"
    );
  }

  const LOCK = {
    shield: {
      get before() {
        return t("soulOf");
      },
      get boss() {
        return "Thaniel";
      },
      get after() {
        return t("required");
      },
      color: "#ff9a4a",
    },
    eye: {
      get before() {
        return t("soulOf");
      },
      get boss() {
        return "Akatosh";
      },
      get after() {
        return t("required");
      },
      color: "#c58bff",
    },
    freeze: {
      get before() {
        return t("soulOf");
      },
      get boss() {
        return "Elsa";
      },
      get after() {
        return t("required");
      },
      color: "#9ce8ff",
    },
  };
  const GEAR_INFO = {
    shield: {
      title: "THE SHIELD",
      titleEs: "EL ESCUDO",
      icon: "shield.png",
      body: "YOU JUST UNLOCKED THE SHIELD. IT ABSORBS DAMAGE WHEN RAISED.",
      bodyEs: "ACABAS DE DESBLOQUEAR EL ESCUDO. ABSORBE DAÑO CUANDO LO ALZAS.",
    },
    eye: {
      title: "THE MAGIC EYE",
      titleEs: "EL OJO MÁGICO",
      icon: "magicEye.png",
      body: "YOU JUST UNLOCKED THE MAGIC EYE. IT CAN MARK A LETTER IN THE ENEMY'S WORD.",
      bodyEs: "ACABAS DE DESBLOQUEAR EL OJO MÁGICO. PUEDE SEÑALAR UNA LETRA DE LA PALABRA DEL ENEMIGO.",
    },
    freeze: {
      title: "FREEZE",
      titleEs: "CONGELAR",
      icon: "freeze.png",
      body: "YOU JUST UNLOCKED FREEZE. IT PREVENTS THE ENEMY FROM ATTACKING ON YOUR NEXT TURN.",
      bodyEs: "ACABAS DE DESBLOQUEAR CONGELAR. IMPIDE QUE EL ENEMIGO TE ATAQUE EN TU PRÓXIMO TURNO.",
    },
  };
  function setTip(btn, t) {
    // t: { name, status, effect, info } for gear, or { lock } for still-locked gear
    btn.dataset.tipName = t.name || "";
    btn.dataset.tipStatus = t.status || "";
    btn.dataset.tipEffect = t.effect || "";
    btn.dataset.tipInfo = t.info || "";
    if (t.lock) btn.dataset.tipLock = t.lock;
    else delete btn.dataset.tipLock;
  }
  function updateItems() {
    const box = document.querySelector(".box.itemrow");
    if (box) box.classList.toggle("gynn-blessed", gynnBuff());
    const fl = $("flask"),
      sh = $("shield"),
      ey = $("eye"),
      dg = $("dodge"),
      fr = $("freeze"),
      tp = $("tempShield"),
      ds = $("debugShield");
    const U = S.unlocked || {},
      refill = lvl.final ? t("nextPhase") : t("boss"),
      pct = (x) => Math.round(x * 100),
      up = round.shieldUp;
    // gear() marks still-locked pieces, swaps in the lock hint and reports the state
    const gear = (btn, key, t) => {
      const isLocked = !U[key];
      btn.classList.toggle("locked", isLocked);
      setTip(btn, isLocked ? { lock: key } : t);
      return isLocked;
    };
    // Flask (always available from the start)
    fl.classList.toggle("used", !S.flask);
    fl.disabled = !S.flask || round.hp >= 100;
    fl.querySelector("img").src =
      "img/icons/" + (S.flask ? "flask.png" : "flask_empty.png");
    const counter = fl.querySelector(".flask-counter");
    if (counter) counter.textContent = "x" + S.flaskCount;
    setTip(fl, {
      name: t("flaskStatus"),
      status: S.flask ? t("readyStatus") : t("empty"),
      effect:
        localizedCallout(gynnBuff() ? "heal60" : "heal40") +
        " (" +
        S.flaskCount +
        " " +
        t("remaining") +
        ")",
      info: S.flask
        ? localizedCallout("flaskComboInfo", { target: refill })
        : localizedCallout("restoredAtBoss", { target: refill }),
    });
    // Shield
    const shBroken = !S.shield && up !== "reg";
    sh.classList.toggle("active", up === "reg");
    sh.classList.toggle("used", shBroken);
    sh.disabled =
      gear(sh, "shield", {
        name: t("shieldStatus"),
        status:
          up === "reg"
            ? localizedCallout("shieldRaised")
            : shBroken
              ? t("broken")
              : localizedCallout("shieldLowered"),
        effect: localizedCallout(gynnBuff() ? "shieldAbsorbs40" : "shieldAbsorbs"),
        info: shBroken
          ? localizedCallout("restoredAtBoss", { target: refill })
          : localizedCallout("shieldPerfectInfo", {
              n: pct(gynnBuff() ? 0.4 : PERFECT_CHANCE),
            }),
      }) || shBroken;
    // Magic Eye
    ey.querySelector("img").src =
      "img/icons/" + (S.eye ? "magicEye.png" : "magicEye_closed.png");
    ey.classList.toggle("used", !S.eye);
    ey.disabled =
      gear(ey, "eye", {
        name: t("magicEyeStatus"),
        status: S.eye ? t("open") : t("closed"),
        effect: localizedCallout("eyeEffect", {
          n: pct(gynnBuff() ? 0.5 : EYE_CHANCE),
        }),
        info: !S.eye
          ? localizedCallout("eyeMissInfo", { target: refill })
          : !eyeTargets().length
            ? t("noLetters")
            : gynnBuff()
              ? t("eyeGynnInfo")
              : localizedCallout("eyeHelpInfo", {
                min: EYE_HEAL_MIN,
                max: EYE_HEAL_MAX,
                bleedMin: EYE_BLEED_MIN,
                bleedMax: EYE_BLEED_MAX,
                hp: t("hpWord"),
              }),
      }) ||
      !S.eye ||
      !eyeTargets().length;
    // Dodge (always available from the start)
    dg.classList.toggle("active", !!round.dodgeUp);
    dg.classList.toggle("used", !S.dodge && !round.dodgeUp);
    dg.disabled = !S.dodge && !round.dodgeUp;
    setTip(dg, {
      name: t("dodgeStatus"),
      status: round.dodgeUp
        ? t("dodgeReady")
        : S.dodge
          ? t("readyStatus")
          : t("spent"),
      effect: localizedCallout("dodgeEffect", {
        n: pct(gynnBuff() ? 0.6 : DODGE_CHANCE),
      }),
      info:
        !S.dodge && !round.dodgeUp
          ? localizedCallout("restoredAtBoss", { target: refill })
          : t("dodgeInfo"),
    });
    // Freeze
    fr.classList.toggle("active", !!round.freezeUp);
    fr.classList.toggle("used", !S.freeze && !round.freezeUp);
    fr.querySelector("img").src =
      "img/icons/" + (S.freeze ? "freeze.png" : "freeze_empty.png");
    fr.disabled =
      gear(fr, "freeze", {
        name: t("freezeStatus"),
        status: round.freezeUp
          ? t("active")
          : S.freeze
            ? t("readyStatus")
            : t("spent"),
        effect: t(gynnBuff() ? "freezeEffectGynn" : "freezeEffect"),
        info:
          !S.freeze && !round.freezeUp
            ? localizedCallout("restoredAtBoss", { target: refill })
            : t("freezeInfo"),
      }) ||
      (!S.freeze && !round.freezeUp);
    // Eye Shield (a gift from the Magic Eye; only exists while it is unbroken)
    tp.parentElement.hidden = !S.temp && up !== "temp";
    tp.classList.toggle("active", up === "temp");
    tp.disabled = !S.temp && up !== "temp";
    setTip(tp, {
      name: t("eyeShield"),
      status: up === "temp" ? t("raised") : t("unbroken"),
      effect: localizedCallout("eyeShieldAbsorbs"),
      info: localizedCallout("eyeTempInfo", {
        n: pct(gynnBuff() ? 1 : TEMP_PERFECT_CHANCE),
      }),
    });
    // Debug shield
    ds.parentElement.hidden = !S.debugEnabled;
    ds.classList.toggle("active", up === "debug");
    setTip(ds, {
      name: t("debugShield"),
      status: up === "debug" ? t("raised") : t("lowered"),
      effect: t("debugShieldEffect"),
      info: t("debugShieldInfo"),
    });
  }
  function playerIdle() {
    setImg(P, round.shieldUp ? PL.defense : PL.idle);
  } // raised shield = "defense up" pose
  function idle() {
    playerIdle();
    pose("idle");
  }
  function persist() {
    round.language = S.language || "en";
    S.round = Object.assign({ level: S.level }, round);
    HS.save();
  }

  /* ---------- level / round setup ---------- */
  // Difficulty from the round: enemies 1-3 EASY / 4-7 NORMAL / 8-10 HARD;
  // bosses 1-3 NORMAL / 4-8 HARD / 9-10 NIGHTMARE; the final phases NIGHTMARE,
  // except the last one, where the difficulty is unknown even to Seraphiel.
  function difficulty(l) {
    if (l.final)
      return l.pos === 2 ? ["UNKNOWN", "unknown"] : ["NIGHTMARE", "nightmare"];
    if (l.boss)
      return l.round <= 2
        ? ["NORMAL", "normal"]
        : l.round <= 7
          ? ["HARD", "hard"]
          : ["NIGHTMARE", "nightmare"];
    return l.round <= 2
      ? ["EASY", "easy"]
      : l.round <= 6
        ? ["NORMAL", "normal"]
        : ["HARD", "hard"];
  }
  function localizeBattleStatic() {
    const spanish = isSpanish();
    document.documentElement.lang = spanish ? "es" : "en";
    document.title = t("battleTitle");
    $("portrait").alt = t("you");
    P.alt = t("player");
    E.alt = t("enemy");
    $("stage").setAttribute("aria-label", t("battleArena"));
    $("hpbar").setAttribute("aria-label", t("health"));
    $("diffLabel").textContent = t("difficulty");
    document.querySelectorAll(".itemgroup h3")[0].textContent = t("items");
    document.querySelectorAll(".itemgroup h3")[1].textContent = t("skills");
    $("optBtn").textContent = t("options");
    $("nextBtn").textContent = t("next");
    $("nextBtn").hidden = !S.debugEnabled;
    $("optsT").textContent = t("optionsTitle");
    $("optMainMenu").textContent = t("mainMenu");
    $("optClose").setAttribute("aria-label", t("close"));
    $("bgmLabel").firstChild.textContent = t("musicVolume");
    $("sfxLabel").firstChild.textContent = t("sfxVolume");
    $("bgmVol").setAttribute("aria-label", t("musicVolume"));
    $("sfxVol").setAttribute("aria-label", t("sfxVolume"));
    $("hintGo").textContent = t("next");
    $("speechSkip").textContent = t("skip");
    $("learnGo").textContent = t("understood");
    $("howT").textContent = t("howTo");
    $("tutNext").textContent = t("next");
    $("result").setAttribute("aria-label", t("result"));
    document.querySelector(".tip").textContent = t("keyboardHelp");
    document.querySelectorAll(".itembtn").forEach((button) => {
      const key = {
        flask: "flask",
        shield: "shield",
        eye: "magicEye",
        dodge: "dodge",
        freeze: "freeze",
        tempShield: "eyeShield",
        debugShield: "debugShield",
      }[button.id];
      if (key) button.setAttribute("aria-label", t(key));
    });
    const blessing = $("gynnBlessingText");
    if (blessing) blessing.textContent = t("gynnBlessingText");
    const gynnBtn = $("gynnSkill");
    if (gynnBtn) gynnBtn.setAttribute("aria-label", t("gynnSkillAria"));
  }
  function setupLevel() {
    clearTimers();
    setWeird(false);
    scriptQueued = null;
    learnOnClose = null;
    resetFinalFourDom();
    document.documentElement.lang = isSpanish() ? "es" : "en";
    lvl = L[S.level];
    document.body.classList.toggle("boss", !!lvl.boss);
    document.body.style.setProperty("--accent", lvl.color || "");
    document.body.style.setProperty(
      "--accent-dark",
      shade(lvl.color || "#7cc4bb"),
    );
    document.body.style.setProperty("--plate", lvl.final ? lvl.color : "");
    if (sealedGearOwner && sealedGearOwner !== lvl.name) {
      sealGear(false);
      sealedGearOwner = null;
    }
    const bossIntroName = $("bossIntroName");
    bossIntroName.hidden = true;
    bossIntroName.replaceChildren();
    const arena = $("arena");
    arena.style.backgroundImage = "url(img/maps/" + lvl.arena + ")";
    arena.style.backgroundPosition = lvl.arenaPos || "";
    arena.style.transition = "none"; // phase changes animate it (see win)
    arena.style.filter = lvl.arenaFx || "";
    arena.style.imageRendering = lvl.arenaSmooth ? "auto" : "";
    $("arena2").style.transition = "none";
    $("arena2").style.opacity = 0;
    $("stage").style.setProperty("--ground", lvl.ground + "%");
    E.style.filter = lvl.fx || "";
    localizeBattleStatic();
    localizeBattleStatic();
    $("eSlot").classList.toggle("fxpose", !!lvl.cssPose);
    $("eSlot").classList.toggle("fxbob", !!lvl.cssBob);
    $("eSlot").classList.toggle("fxhurt", !!lvl.hurtFx);
    $("eSlot").style.setProperty("--es", lvl.scale || 1);
    $("eSlot").style.setProperty("--lift", (lvl.lift || 0) + "%");
    $("eSlot").dataset.anchor = lvl.anchor;
    $("eName").textContent = enemyName(lvl);
    // top-center tag, three rows: LEVEL N / (icon) ENEMY n or BOSS / DIFFICULTY LEVEL: TIER
    // never reveal how many phases the final boss has: it is simply the final round
    const isP3 = lvl.final && lvl.pos === 2;
    $("levelNum").textContent = isP3
      ? t("unknownRound")
      : lvl.final
        ? t("finalRound")
        : t("level") + " " + (lvl.round + 1);
    const lt = $("levelText");
    lt.textContent = isP3
      ? "?????"
      : lvl.final
        ? t("finalBoss")
        : lvl.boss
          ? t("boss")
          : t("enemy") + " " + (lvl.pos + 1);
    lt.className = lvl.final ? "lv-final" : lvl.boss ? "lv-boss" : "lv-enemy";
    const tier = difficulty(lvl);
    $("diffText").textContent = isSpanish() ? t(tier[1]) : tier[0];
    $("diffLabel").textContent = t("difficulty");
    $("diffText").className = "tier " + tier[1];
    $("levelIcon").src =
      "img/icons/" +
      (lvl.final
        ? "iconFinal.png"
        : lvl.boss
          ? "iconBoss.png"
          : "iconEnemy.png"); // enemy, boss or final boss medallion
    Object.values(lvl.sprites)
      .concat(
        Object.values(PL),
        "maps/" + lvl.arena,
        "icons/flask_empty.png",
        "icons/magicEye_closed.png",
        "icons/freeze_empty.png",
      )
      .filter((f) => typeof f === "string")
      .forEach((f) => {
        new Image().src =
          f.indexOf("maps/") === 0 ||
          f.indexOf("icons/") === 0 ||
          f.indexOf("sprites/") === 0
            ? "img/" + f.replace(/^sprites\/newRound[0-9]+\//, "sprites/")
            : "img/sprites/" + f.replace(/^newRound[0-9]+\//, "");
      });

    const saved = S.round;
    const wordsForLanguage = levelWords(lvl);
    if (!Object.keys(wordsForLanguage).length) {
      console.error("No playable words for selected language on", lvl.name);
      return;
    }
    const missingWordHints = Object.keys(wordsForLanguage).filter(
      (word) =>
        typeof wordsForLanguage[word] !== "string" ||
        !wordsForLanguage[word].trim(),
    );
    if (missingWordHints.length) {
      console.error(
        "Missing " +
          (isSpanish() ? "Spanish" : "English") +
          " hints for " +
          lvl.name +
          ": " +
          missingWordHints.join(", "),
      );
      return;
    }
    if (
      saved &&
      saved.level === S.level &&
      saved.language === (S.language || "en") &&
      wordsForLanguage[saved.word]
    )
      round = saved;
    else {
      const words = Object.keys(wordsForLanguage);
      round = {
        language: S.language || "en",
        word: words[Math.floor(Math.random() * words.length)],
        hits: [],
        misses: [],
        hp: S.hp,
        hpStart: S.hp,
        shieldUp: S.temp && S.tempUp ? "temp" : false,
        dodgeUp: false,
        freezeUp: false,
        freezeTurns: 0,
        stunCount: 0,
        marked: [],
        combo: 0,
      };
      if (finalFour()) initFinalFour();
      persist();
    }
    if (finalFour() && (!round.finalSteps || !round.finalSteps.length)) {
      // a save from before the four-word mechanic: rebuild its queue
      initFinalFour();
      persist();
    }
    if (round.shieldUp === true) round.shieldUp = "reg"; // older saves
    round.dodgeUp = !!round.dodgeUp;
    if (hasBossNameReveal(lvl) && !round.speechDone) {
      $("eName").textContent = "";
    }
    $("result").classList.remove("open");
    P.classList.toggle("shielded", !!round.shieldUp);
    P.classList.toggle("dodging", round.dodgeUp);
    idle();
    render();
    hpBar(round.hp);
    if (finalFour() && round.transformed) restoreFinalFour();
    HS.music(lvl.music, lvl.rate, lvl.ambience);
    if (!(lvl.speech && !round.speechDone)) {
      $("hintTitle").textContent = t("wordHint");
      $("hintGo").hidden = true;
    }
    const newlyUnlockedGear =
      lvl.pos === 0 && lvl.round > 0
        ? Object.keys(GEAR_INFO).find(
            (key) =>
              S.unlocked[key] &&
              !S.seenGearInfo[key] &&
              L.slice(0, S.level).some((previous) => previous.unlock === key),
          )
        : null;
    if (S.level === 0 && !S.seenOpening) {
      phase = "intro";
      startOpening();
    } else if (S.level === 0 && !S.seenTutorial) {
      phase = "intro";
      openTutorial();
    } else if (newlyUnlockedGear) {
      S.seenGearInfo[newlyUnlockedGear] = true;
      HS.save();
      phase = "intro";
      learn(
        null,
        isSpanish()
          ? GEAR_INFO[newlyUnlockedGear].titleEs
          : GEAR_INFO[newlyUnlockedGear].title,
        isSpanish()
          ? GEAR_INFO[newlyUnlockedGear].bodyEs
          : GEAR_INFO[newlyUnlockedGear].body,
        true,
        GEAR_INFO[newlyUnlockedGear].icon,
      );
    } else if (lvl.name === "Thaniel, The Fire King" && !S.seenBossWordHints) {
      phase = "intro";
      learn("seenBossWordHints", t("learnBossTitle"), t("learnBossBody"));
      phase = "ready";
    } else if (lvl.final && !lvl.intro && !loreDone) {
      loreDone = true;
      phase = "intro";
      startLore();
    } // always plays before Seraphiel phase 1, but only once
    else if (lvl.speech && !round.speechDone) {
      startSpeech();
    } else {
      phase = "ready";
      setWeird(!!lvl.weird);
    }
  }

  /* ---------- items ---------- */
  function useFlask() {
    if (phase === "speech") HS.sfx("seraphielHurt_sfx");
    if (phase !== "ready" || !S.flask || round.hp >= 100) return;
    phase = "busy";
    S.flaskCount--;
    if (S.flaskCount <= 0) S.flask = false;
    const gain = Math.min(gynnBuff() ? 60 : HEAL, 100 - round.hp);
    round.hp += gain;
    persist();
    hpBar(round.hp);
    updateItems();
    HS.sfx("menuSelect", 1.6);
    callout("+" + gain + " " + t("hpWord"), "heal");
    P.classList.add("heal");
    later(() => {
      P.classList.remove("heal");
      phase = "ready";
    }, 700);
  }
  function toggleShield(kind) {
    // toggle: raising costs nothing, a shield only breaks when it blocks. Only one is raised at a time.
    if (phase === "speech") HS.sfx("seraphielHurt_sfx");
    if (phase !== "ready") return;
    const stock = kind === "reg" ? S.shield : S.temp;
    if (round.shieldUp === kind) {
      round.shieldUp = false;
      HS.sfx("menuHover", 0.8);
      callout(t("defenseDown"));
    } else if (stock) {
      round.shieldUp = kind;
      HS.sfx("blockbreak_sfx", 1.15);
      callout(t("defenseUp"));
    } else return;
    S.tempUp = round.shieldUp === "temp";
    P.classList.toggle("shielded", !!round.shieldUp);
    playerIdle();
    persist();
    updateItems();
  }
  const useShield = () => toggleShield("reg"),
    useTemp = () => toggleShield("temp");
  function useDebugShield() {
    // debug shield: unlimited usage, 100% perfect block
    if (phase === "speech") HS.sfx("seraphielHurt_sfx");
    if (phase !== "ready" || !S.debugEnabled) return;
    if (round.shieldUp === "debug") {
      round.shieldUp = false;
      HS.sfx("menuHover", 0.8);
      callout(t("debugDown"));
    } else {
      round.shieldUp = "debug";
      HS.sfx("blockbreak_sfx", 1.2);
      callout(t("debugUp"));
    }
    P.classList.toggle("shielded", !!round.shieldUp);
    playerIdle();
    persist();
    updateItems();
  }
  function useDodge() {
    // toggle: it is used up by the next attack, whether the dodge works or not
    if (phase === "speech") HS.sfx("seraphielHurt_sfx");
    if (phase !== "ready") return;
    if (round.dodgeUp) {
      round.dodgeUp = false;
      HS.sfx("menuHover", 0.8);
      callout(t("dodgeCancelled"));
    } else if (S.dodge) {
      round.dodgeUp = true;
      HS.sfx("dodge_sfx");
      callout(t("dodgeReady"));
    } else return;
    P.classList.toggle("dodging", round.dodgeUp);
    persist();
    updateItems();
  }
  function useFreeze() {
    // like Magic Eye: used once, consumed on next letter press
    if (phase === "speech") HS.sfx("seraphielHurt_sfx");
    if (phase !== "ready" || !S.freeze) return;
    phase = "busy";
    S.freeze = false;
    round.freezeUp = true;
    round.freezeTurns = gynnBuff() ? 2 : 1;
    HS.sfx("freeze_sfx");
    callout(t("enemyFrozen"));
    E.classList.add("frozen");
    persist();
    updateItems();
    updateStatusIcons();
    later(() => {
      phase = "ready";
    }, 500);
  }
  function useEye() {
    // once per round (and per phase of the final boss); a failed try still uses it
    if (phase === "speech") HS.sfx("seraphielHurt_sfx");
    if (phase !== "ready" || !S.eye || !eyeTargets().length) return;
    phase = "busy";
    S.eye = false;
    round.marked = round.marked || [];
    const options = eyeTargets();
    if (Math.random() < (gynnBuff() ? 0.5 : EYE_CHANCE)) {
      // success: a correct letter's key glows blue
      round.marked.push(options[Math.floor(Math.random() * options.length)]);
      persist();
      render();
      HS.sfx("menuSelect", 1.3);
      callout(t("eyeMarks"));
    } else {
      // a miss: under Gynn's Protection, there is no punish!
      if (gynnBuff()) {
        HS.sfx("wrongSound");
        callout(t("eyeMissNoPunish"));
        persist();
        updateItems();
      } else {
        const before = round.hp,
          roll =
            EYE_BLEED_MIN +
            Math.floor(Math.random() * (EYE_BLEED_MAX - EYE_BLEED_MIN + 1));
        round.hp = Math.max(EYE_CAN_KILL ? 0 : 1, before - roll);
        HS.sfx("wrongSound");
        callout(
          localizedCallout("eyeBleeds", {
            n: before - round.hp + " " + t("hpWord"),
          }),
          "hurt",
        );
        if (round.hp === 0) return fatal(before);
        persist();
        updateItems();
        hpBar(round.hp, before);
        setImg(P, PL.hurt);
        later(() => {
          hpBar(round.hp);
          playerIdle();
        }, 600);
      }
    }
    later(() => {
      phase = "ready";
    }, 700);
  }
  // Guessing a letter the Eye marked: heal 10-40 HP, or raise a shield if already at full health.
  function eyeBonus() {
    if (round.hp < 100) {
      const roll =
        EYE_HEAL_MIN +
        Math.floor(Math.random() * (EYE_HEAL_MAX - EYE_HEAL_MIN + 1));
      const gain = Math.min(100 - round.hp, roll);
      round.hp += gain;
      hpBar(round.hp);
      callout(
        localizedCallout("eyeHeals", {
          n: gain + " " + t("hpWord"),
        }),
        "heal",
      );
    } else if (!S.temp) {
      // at full health: a temporary Eye Shield that lasts until it breaks
      S.temp = true;
      S.tempUp = true;
      round.shieldUp = "temp";
      P.classList.add("shielded");
      playerIdle();
      callout(t("eyeGrantsShield"));
    } else return;
    HS.sfx("menuSelect", 1.6);
    updateItems();
  }

  /* ---------- guessing ---------- */
  function guess(ch) {
    if (phase === "speech" && /^[A-Z]$/.test(ch)) HS.sfx("seraphielHurt_sfx");
    if (phase !== "ready" || !/^[A-Z]$/.test(ch)) return;
    if (round.hits.includes(ch) || round.misses.includes(ch)) return;
    phase = "busy";
    if (round.word.includes(ch)) {
      round.hits.push(ch);
      const blessed = (round.marked || []).includes(ch); // a letter the Magic Eye marked
      round.marked = (round.marked || []).filter((c) => c !== ch);
      // Increment combo on correct guess
      round.combo = (round.combo || 0) + 1;
      // Check for 4-letter combo bonus
      if (round.combo >= 4) {
        if (round.combo === 4 && S.flaskCount < 3) {
          S.flaskCount++;
          S.flask = true;
          HS.sfx("menuSelect", 1.6);
          callout(t("combo"), "heal");
          learn("seenFlaskBonus", t("comboTitle"), t("comboBody"));
        }
        round.combo = 0;
      }
      // Decrement stun count on correct guess
      if (round.stunCount > 0) round.stunCount--;
      // Freeze wears off once its turns are spent (two under Gynn's Protection)
      if (round.freezeUp && (round.freezeTurns = (round.freezeTurns || 1) - 1) <= 0) {
        round.freezeUp = false;
        round.freezeTurns = 0;
        S.freeze = false;
        E.classList.remove("frozen");
      }
      render();
      if (complete()) {
        if (finalFour()) return advanceFinalWord();
        return win();
      }
      if (blessed) eyeBonus();
      persist();
      strike();
    } else {
      round.misses.push(ch);
      HS.sfx("wrongSound");
      // Reset combo on wrong guess
      round.combo = 0;
      const before = round.hp;
      let dmg = lvl.damage,
        blocked = 0,
        perfect = false,
        dodged = false,
        dodgeMissed = false,
        crit = false;

      // Decrement stun count on wrong guess
      if (round.stunCount > 0) round.stunCount--;
      // Freeze shields you while it lasts - no damage (two turns under Gynn's Protection)
      if (round.freezeUp) {
        if ((round.freezeTurns = (round.freezeTurns || 1) - 1) <= 0) {
          round.freezeUp = false;
          round.freezeTurns = 0;
          S.freeze = false;
          E.classList.remove("frozen");
        }
        dmg = 0;
        HS.sfx("dodge_sfx");
        enemyCallout(t("frozenCallout"), "freeze");
        render();
        persist();
        later(() => {
          phase = "ready";
        }, 600);
        return;
      }
      // Stun prevents enemy attack
      if (round.stunCount > 0) {
        dmg = 0;
        HS.sfx("dodge_sfx");
        enemyCallout(t("stunnedCallout"), "stun");
        render();
        persist();
        later(() => {
          phase = "ready";
        }, 600);
        return;
      }
      // Check for crit
      const critChance = lvl.boss ? CRIT_CHANCE_BOSS : CRIT_CHANCE_ENEMY;
      if (Math.random() < critChance) {
        crit = true;
        dmg = Math.round(dmg * CRIT_MULTIPLIER);
      }
      if (round.dodgeUp) {
        // a raised dodge is used up by the attack
        round.dodgeUp = false;
        S.dodge = false;
        P.classList.remove("dodging");
        if (Math.random() < (gynnBuff() ? 0.6 : DODGE_CHANCE)) {
          dodged = true;
          dmg = 0;
        } else dodgeMissed = true;
      }
      if (round.shieldUp && !dodged) {
        // a shield breaks only when it blocks (a dodged attack never reaches it)
        const kind = round.shieldUp;
        const perfectChance =
          kind === "debug"
            ? 1.0
            : kind === "reg"
              ? gynnBuff()
                ? 0.4
                : PERFECT_CHANCE
              : gynnBuff()
                ? 1.0
                : TEMP_PERFECT_CHANCE;
        const shieldMax = gynnBuff() ? 40 : SHIELD;
        blocked = Math.min(dmg, shieldMax);
        dmg -= blocked;
        if (Math.random() < perfectChance) {
          perfect = true;
          dmg = 0;
        } // a perfect block stops everything
        // Regular shield doesn't break on perfect block; temp shield always breaks; debug shield never breaks
        if (perfect && (kind === "reg" || kind === "debug")) {
          // shield stays up
        } else {
          round.shieldUp = false;
          if (kind === "reg") S.shield = false;
          else if (kind === "temp") {
            S.temp = false;
            S.tempUp = false;
          }
        }
        // Perfect block on crit stuns enemy for 2 letters
        if (perfect && crit) {
          round.stunCount = 2;
          HS.sfx("perfectblock_sfx", 1.3); // Modified sfx with higher pitch
          callout(t("splendidDeflect"), "perfect");
          learn("seenDeflect", t("deflectName"), t("deflectBody"));
          // Add screen shake and freeze effect
          document.body.classList.add("screen-shake");
          setTimeout(() => document.body.classList.remove("screen-shake"), 400);
          document.body.classList.add("screen-freeze");
          setTimeout(
            () => document.body.classList.remove("screen-freeze"),
            500,
          );
        }
      }
      round.hp = Math.max(0, round.hp - dmg);
      render();
      if (round.hp === 0) return fatal(before);
      persist();
      enemyAttack(before, blocked, dmg, perfect, dodged, dodgeMissed, crit);
    }
  }

  function strike() {
    // player lands a hit
    HS.sfx("attackSound");
    snd(lvl.sfx.hurt);
    setImg(P, PL.attack);
    pose("hurt");
    later(() => {
      idle();
      phase = "ready";
    }, 600);
  }

  function enemyAttack(
    before,
    blocked,
    dmg,
    perfect,
    dodged,
    dodgeMissed,
    crit,
  ) {
    // the enemy strikes back: dodged, shielded or neither
    pose("attack");
    // Use higher pitch for crit attack sound
    const attackRate = crit ? 1.3 : 1;
    later(() => {
      if (crit) HS.sfx("crit_sfx");
      HS.sfx(lvl.sfx.attack, lvl.pitch * attackRate);
    }, lvl.sfxAt);
    if (dodgeMissed) callout(t("dodgeFailed"), "miss");
    later(() => {
      if (dodged) {
        HS.sfx("dodge_sfx");
        callout(t("dodged"), "dodge");
        P.classList.add("sidestep");
        setTimeout(() => P.classList.remove("sidestep"), 650);
      } else {
        if (blocked) P.classList.remove("shielded");
        if (perfect) {
          if (crit) {
            // Crit perfect block stun message already shown in guess()
          } else {
            HS.sfx("perfectblock_sfx");
            callout(t("perfectBlock"), "perfect");
            learn(
              "seenPerfectBlock",
              t("perfectBlockName"),
              t("perfectBlockBody"),
            );
          }
        } else if (blocked && blocked + dmg > (gynnBuff() ? 40 : SHIELD)) {
          HS.sfx("blockbreak_sfx");
        } else if (blocked) {
          HS.sfx("block_sfx");
        }
        if (dmg) {
          hpBar(round.hp, before);
          setImg(P, PL.hurt);
          callout(
            (crit ? t("crit") + " " : "") +
              (blocked ? t("shieldBroke") + " " : "") +
              "-" +
              dmg +
              " " +
              t("hpWord"),
            "hurt",
          );
        } else if (!perfect) callout(t("blocked"));
      }
    }, lvl.hitAt);
    later(() => {
      hpBar(round.hp);
      idle();
      phase = "ready";
    }, lvl.endAt);
  }

  function morphArena(next) {
    // same picture: slide its filter. A different picture: crossfade over it.
    const a = $("arena"),
      b = $("arena2");
    if (next.arena === lvl.arena) {
      a.style.transition = "filter " + ARENA_MS + "ms ease-in-out";
      a.style.filter = next.arenaFx || "";
      return;
    }
    b.style.transition = "none";
    b.style.opacity = 0;
    b.style.backgroundImage = "url(img/maps/" + next.arena + ")";
    b.style.backgroundPosition = next.arenaPos || "";
    b.style.filter = next.arenaFx || "";
    b.style.imageRendering = next.arenaSmooth ? "auto" : "";
    void b.offsetWidth;
    b.style.transition = "opacity " + ARENA_MS + "ms ease-in-out";
    b.style.opacity = 1;
  }

  /* ---------- end of round ---------- */
  function showResult(title, note, cls, btnText, onClick) {
    closeLearn(); // never let a technique popup sit under the end-of-round banner
    $("rTitle").textContent = title;
    // note is a string, or one string per row (some rows carry an <img>, e.g. the unlock icon)
    const rn = $("rNote");
    rn.textContent = "";
    const lines = Array.isArray(note) ? note : note ? [note] : [];
    lines.forEach((line) => {
      const row = document.createElement("div");
      row.className = "rline";
      row.innerHTML = line;
      const lower = line.toLowerCase();
      if (lower.includes("unlocked") || lower.includes("desbloqueado"))
        row.classList.add("status-unlock");
      else if (lower.includes("gained") || lower.includes("health points"))
        row.classList.add("status-heal");
      else if (lower.includes("restored") || lower.includes("recovered"))
        row.classList.add("status-restored");
      else if (
        lower.includes("return to the first enemy") ||
        lower.includes("return to the first phase")
      )
        row.classList.add("status-return");
      rn.append(row);
    });
    $("result").className = "overlay open " + cls;
    const isVictory = cls.split(/\s+/).includes("won");
    if (isVictory) {
      const titleEl = $("rTitle");
      titleEl.classList.remove("victory-enter");
      void titleEl.offsetWidth;
      titleEl.classList.add("victory-enter");
      HS.sfx("menuSelect", 0.85);
      rn.querySelectorAll(".rline").forEach((row, i) => {
        row.classList.add("status-enter");
        row.style.setProperty("--status-delay", 0.85 + i * 0.55 + "s");
        setTimeout(
          () => {
            if (row.querySelector(".unlock-message")) {
              HS.sfx("menuSelect", 0.62);
              setTimeout(() => HS.sfx("menuHover", 1.45), 70);
            } else {
              HS.sfx("menuHover", 1.15);
            }
          },
          850 + i * 550,
        );
      });
    }
    const b = $("rBtn");
    b.textContent = btnText;
    b.onclick = () => {
      HS.sfx("menuSelect");
      onClick();
    };
    b.focus();
  }

  function lose(before) {
    phase = "lost";
    // A defeat sends you back to the first enemy of the round (a boss is the checkpoint), with the health and items you had then.
    const was = S.level,
      first = lvl.final
        ? L.findIndex((l) => l.final)
        : Math.floor(S.level / 4) * 4;
    S.level = first;
    S.hp = 100;
    S.flask = true;
    S.flaskCount = 1;
    S.shield = S.eye = S.dodge = S.freeze = true;
    S.temp = !!S.cpTemp;
    S.tempUp = false;
    S.round = null;
    HS.save();
    pose("attack");
    later(() => snd(lvl.sfx.attack), lvl.sfxAt);
    later(() => {
      HS.stopMusic();
      hpBar(0, before);
      P.classList.remove("shielded", "dodging");
      setImg(P, PL.death);
      HS.sfx("hasMuertoSound");
    }, lvl.hitAt);
    later(() => {
      hpBar(0);
      setImg(P, PL.dead);
      pose("idle");
      showResult(
        t("youDied"),
        first === was
          ? ""
          : lvl.final
            ? t("returnFirstPhase")
            : t("returnFirstEnemy"),
        "died",
        t("tryAgain"),
        () => setupLevel(),
      );
    }, lvl.hitAt + 1700);
  }

  function win() {
    phase = "won";
    S.round = null;
    const last = S.level === L.length - 1;
    const morePhases = lvl.final && !last; // another phase of the final boss follows
    const note = []; // one row per line under the victory title
    const hpBefore = round.hp,
      refill = lvl.boss && !lvl.final; // a round boss refills HP; every other win only heals a little
    S.hp = refill
      ? 100
      : Math.min(100, round.hp + (lvl.final ? WIN_HEAL_FINAL : WIN_HEAL));
    if (refill) {
      S.flask = true;
      S.flaskCount = 1;
      S.shield = true;
      S.eye = true;
      S.dodge = true;
      S.freeze = true;
      S.cpTemp = S.temp; // this boss is the new checkpoint
      note.push(t("itemsRestored"));
      note.push(t("healthRecovered"));
      if (lvl.round === 9) S.showLore = true; // after round 10, Seraphiel's story plays (also forced on phase 1)
    } else if (!last && S.hp > hpBefore) {
      note.push(localizedCallout("gainedHp", { n: S.hp - hpBefore }));
    }
    if (morePhases) {
      S.flask = true;
      S.flaskCount = 1;
      S.shield = true;
      S.eye = true;
      S.dodge = true;
      S.freeze = true;
    } // the final boss refills your items every phase
    if (lvl.unlock && S.unlocked && !S.unlocked[lvl.unlock]) {
      S.unlocked[lvl.unlock] = true; // defeating a Great Foe grants its item or skill
      const gear = {
        shield: [t("shield"), "shield.png"],
        eye: [t("magicEye"), "magicEye.png"],
        freeze: [t("freeze"), "freeze.png"],
      }[lvl.unlock];
      note.push(
        '<span class="unlock-message">' +
          t("youUnlocked") +
          " " +
          gear[0] +
          ' <img class="unlockIcon" src="img/icons/' +
          gear[1] +
          '" alt=""></span>',
      );
    }
    if (last) {
      HS.resetRun();
      S.cleared = true;
    } else S.level++;
    S.round = null;
    HS.save();
    HS.sfx("attackSound");
    snd(lvl.sfx.hurt);
    if (lvl.sfx.death) snd(lvl.sfx.death);
    setImg(P, PL.attack);
    // a phase that only speaks its dying words (deathSpeech) does not vanish: it stays standing
    pose(lvl.deathSpeech ? "idle" : "death");
    later(() => {
      P.classList.remove("shielded", "dodging");
      setImg(P, PL.idle);
    }, 960);
    later(() => {
      if (!last && S.hp > hpBefore) {
        hpBar(S.hp);
        callout(
          refill ? t("healed") : "+" + (S.hp - hpBefore) + " " + t("hpWord"),
          "heal",
        );
      }
    }, 700);
    if (morePhases) {
      // seamless: banner, then straight into the next phase. But a phase that
      // refuses to fall speaks first (deathSpeech), with the music already dead.
      if (lvl.deathSpeech) later(() => startDeathSpeech(), lvl.deathMs);
      else later(() => beginNextPhase(), lvl.deathMs);
      return;
    }
    later(() => {
      HS.stopMusic();
      if (lvl.boss) HS.sfx("hasGanadoSound"); // the victory jingle is for bosses only
      pose("dead");
      showResult(
        isSpanish() ? lvl.victoryEs || lvl.victory : lvl.victory,
        note,
        lvl.final ? "won calamity" : "won",
        last ? t("continue") : lvl.boss ? t("nextRound") : t("nextEnemy"),
        last
          ? () => {
              location.href =
                "ending.html?lang=" + encodeURIComponent(S.language || "en");
            }
          : () => setupLevel(),
      );
    }, lvl.deathMs);
  }

  /* ---------- debug ---------- */
  function debugKill() {
    // insta-kill the current foe, skipping the hangman (the NEXT debug button)
    if (!S.debugEnabled) return;
    if (phase === "speech") HS.sfx("seraphielHurt_sfx");
    if (phase !== "ready") return;
    HS.sfx("menuSelect");
    round.hits = [...new Set(round.word)];
    render();
    if (finalFour()) return advanceFinalWord();
    win();
  }

  /* ---------- wiring ---------- */
  const keys = $("keys");
  ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].forEach((row) => {
    const r = document.createElement("div");
    r.className = "row";
    [...row].forEach((c) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "key";
      b.dataset.k = c;
      b.textContent = c;
      b.addEventListener("click", () => guess(c));
      r.append(b);
    });
    keys.append(r);
  });
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if ($("learn").classList.contains("open")) {
      closeLearn(); // any key dismisses a technique popup so it never leaks into the fight
      return;
    }
    if ($("opening").classList.contains("open")) {
      if (openingPart === 1) {
        $("opening").classList.add("skip");
        $("openingContinue").click();
      } else {
        skipOpening();
      }
      return;
    }
    if ($("lore").classList.contains("open")) {
      skipLore();
      return;
    } // any key shows the whole story
    if (phase === "speech" && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      advanceSpeech();
      return;
    }
    if (optionsOpen) {
      if (e.key === "Escape") closeOptions();
      return;
    }
    if (e.key === "1") return useFlask();
    if (e.key === "2") return useShield();
    if (e.key === "3") return useEye();
    if (e.key === "4") return useDodge();
    if (e.key === "5") return useFreeze();
    if (e.key === "6") return useTemp();
    if (e.key === "0" && S.debugEnabled) return useDebugShield();
    if (e.key.length === 1 && /[a-z]/i.test(e.key)) guess(e.key.toUpperCase());
  });
  $("flask").addEventListener("click", useFlask);
  $("shield").addEventListener("click", useShield);
  $("eye").addEventListener("click", useEye);
  $("dodge").addEventListener("click", useDodge);
  $("freeze").addEventListener("click", useFreeze);
  $("tempShield").addEventListener("click", useTemp);
  $("debugShield").addEventListener("click", useDebugShield);
  $("nextBtn").addEventListener("click", () => {
    if (S.debugEnabled) debugKill();
  });
  $("optMainMenu").href =
    "menu.html?lang=" +
    encodeURIComponent(S.language || "en") +
    "&debug=" +
    (S.debugEnabled ? "1" : "0");
  $("optMainMenu").addEventListener("click", () => HS.sfx("menuSelect"));
  document.addEventListener("dragstart", (e) => e.preventDefault()); // nothing on screen can be dragged

  /* ---------- progressive tutorial ---------- */
  const tutSteps = [...document.querySelectorAll("#howto .tutcol")];
  let tutI = 0;
  function tutShow(i) {
    tutI = Math.max(0, Math.min(i, tutSteps.length - 1));
    tutSteps.forEach((s, n) => (s.hidden = n !== tutI));
    $("tutNext").textContent =
      tutI === tutSteps.length - 1 ? t("understood") : t("next");
  }
  function openTutorial() {
    $("howT").textContent = t("howTo");
    const headings = [t("mechanics"), t("itemsSkills"), t("statusEffects")];
    const columns = document.querySelectorAll("#howto .tutcol");
    columns.forEach((column, index) => {
      const heading = column.querySelector("h3");
      if (heading) heading.textContent = headings[index];
    });
    const paragraphs = {
      tutorialOne: t("tutorialBody1"),
      tutorialTwo: t("tutorialBody2"),
    };
    const mechanics = columns[0].querySelectorAll("p");
    mechanics[0].textContent = paragraphs.tutorialOne;
    mechanics[1].textContent = paragraphs.tutorialTwo;
    columns[1].querySelectorAll(".tutline span")[0].innerHTML =
      "<b>" + t("flask").toUpperCase() + "</b> " + t("tutorialFlask");
    columns[1].querySelectorAll(".tutline span")[1].innerHTML =
      "<b>" + t("dodge").toUpperCase() + "</b> " + t("tutorialDodge");
    columns[1].querySelector(".tut-unlocks p").textContent =
      t("tutorialUnlocks");
    columns[2].querySelectorAll(".tutline span")[0].innerHTML =
      "<b>" + t("frozen").toUpperCase() + ":</b> " + t("tutorialFrozen");
    columns[2].querySelectorAll(".tutline span")[1].innerHTML =
      "<b>" + t("stunned").toUpperCase() + ":</b> " + t("tutorialStunned");
    tutShow(0);
    $("howto").classList.add("open");
    $("tutNext").focus();
  }
  function closeTutorial() {
    S.seenTutorial = true;
    HS.save();
    $("howto").classList.remove("open");
    phase = "ready";
  }
  $("tutNext").addEventListener("click", () => {
    HS.sfx("menuSelect");
    if (tutI < tutSteps.length - 1) tutShow(tutI + 1);
    else closeTutorial();
  });

  /* ---------- first-time technique popups ---------- */
  function learn(flag, title, body, resumeAfterClose = false, icon = null) {
    if (flag && S[flag]) return; // shown once per save, ever
    if (flag) {
      S[flag] = true;
      HS.save();
    }
    $("learnT").textContent = title;
    $("learnBody").textContent = body;
    const learnIcon = $("learnIcon");
    learnIcon.hidden = !icon;
    learnIcon.removeAttribute("src");
    learnIcon.alt = icon ? title : "";
    if (icon) learnIcon.src = "img/icons/" + icon;
    $("learn").classList.toggle("learn-unlock", !!icon);
    $("learn").classList.add("open");
    $("learn").dataset.resumeAfterClose = resumeAfterClose ? "true" : "false";
    $("learnGo").focus();
  }
  function closeLearn() {
    const resumeAfterClose = $("learn").dataset.resumeAfterClose === "true";
    $("learn").classList.remove("open", "learn-gynn");
    delete $("learn").dataset.resumeAfterClose;
    const after = learnOnClose;
    learnOnClose = null;
    if (resumeAfterClose) phase = "ready";
    if (after) after();
  }
  $("learnGo").addEventListener("click", () => {
    HS.sfx("menuSelect");
    closeLearn();
  });

  /* ---------- tooltips, options, final boss story, glitch effect ---------- */
  const tip = $("tip");
  function fillTip(rows, anchor, cls) {
    // rows: [["ITEM: ", "Flask"], ["EFFECT: ", "Heals 40 health points."]]
    tip.className = "itemtip" + (cls ? " " + cls : "");
    tip.textContent = "";
    rows.forEach(([k, v]) => {
      const row = document.createElement("div"),
        key = document.createElement("b");
      key.textContent = k;
      row.append(key);
      if (v && typeof v === "object" && v.boss) {
        const name = document.createElement("span");
        name.className = "lock-boss-name";
        name.textContent = v.boss;
        name.style.setProperty("--boss-color", v.color);
        row.append(name, document.createTextNode(v.after));
      } else if (v) {
        row.append(document.createTextNode(v));
      }
      tip.append(row);
    });
    tip.hidden = false;
    const r = anchor.getBoundingClientRect(),
      t = tip.getBoundingClientRect();
    let top = r.top - t.height - 10;
    if (top < 8) top = r.bottom + 10;
    tip.style.left =
      Math.min(
        Math.max(8, r.left + r.width / 2 - t.width / 2),
        innerWidth - t.width - 8,
      ) + "px";
    tip.style.top = top + "px";
  }
  // Sealed keys and items show the current speaker's warning.
  const showBlockedTip = (anchor) => {
    const key =
      lvl.name === "Gynn, the fallen angel"
        ? "gynnSpeaking"
        : lvl.name === "Arkania, the Gatewarden"
          ? "arkaniaSpeaking"
          : lvl.final && lvl.pos === 0
            ? "seraphielSpeaking"
            : "seraphielBlocked";
    fillTip([["", t(key)]], anchor, "blocked");
  };
  function showTip(btn) {
    if (btn.classList.contains("blocked")) {
      showBlockedTip(btn);
      return;
    }
    if (btn.dataset.tipLock) {
      const lock = LOCK[btn.dataset.tipLock];
      fillTip([[lock.before, lock]], btn, "locked");
      return;
    }
    fillTip(
      [
        [t("item"), btn.dataset.tipName],
        [t("status"), btn.dataset.tipStatus],
        [t("effect"), btn.dataset.tipEffect],
        [t("infoLabel"), btn.dataset.tipInfo],
      ],
      btn,
    );
  }
  function showStatusTip(icon) {
    fillTip(
      [
        [t("status"), icon.dataset.tipName],
        [t("effect"), icon.dataset.tipEffect],
      ],
      icon,
    );
  }
  document.querySelectorAll(".itemwrap").forEach((w) => {
    const b = w.firstElementChild;
    ["mouseenter", "focusin"].forEach((ev) =>
      w.addEventListener(ev, () => showTip(b)),
    );
    ["mouseleave", "focusout"].forEach((ev) =>
      w.addEventListener(ev, () => {
        tip.hidden = true;
      }),
    );
  });
  document.querySelectorAll(".tut-lock-icon").forEach((button) => {
    const showLockTip = () => {
      const lock = LOCK[button.dataset.lock];
      if (lock) fillTip([[lock.before, lock]], button, "locked");
    };
    button.addEventListener("mouseenter", showLockTip);
    button.addEventListener("focus", showLockTip);
    button.addEventListener("mouseleave", () => {
      tip.hidden = true;
    });
    button.addEventListener("blur", () => {
      tip.hidden = true;
    });
  });
  const statusIcons = $("statusIcons");
  statusIcons.addEventListener("mouseover", (e) => {
    const icon = e.target.closest(".status-icon");
    if (icon) showStatusTip(icon);
  });
  statusIcons.addEventListener("mouseout", (e) => {
    if (e.target.closest(".status-icon")) tip.hidden = true;
  });
  $("keys").addEventListener("mouseover", (e) => {
    const k = e.target.closest(".key.blocked");
    if (k) showBlockedTip(k);
  });
  $("keys").addEventListener("mouseout", (e) => {
    if (e.target.closest(".key.blocked")) tip.hidden = true;
  });

  const gynnSprite = $("gynnSprite");
  gynnSprite.addEventListener("mouseenter", () => {
    fillTip([["", t("gynnHoverTip")]], gynnSprite, "gynn-tip");
  });
  gynnSprite.addEventListener("mouseleave", () => {
    tip.hidden = true;
  });

  function openOptions() {
    optionsOpen = true;
    HS.sfx("menuSelect");
    $("optsBox").classList.add("open");
    $("optClose").focus();
  }
  function closeOptions() {
    optionsOpen = false;
    HS.sfx("menuSelect");
    $("optsBox").classList.remove("open");
    $("optBtn").blur();
  }
  $("optBtn").addEventListener("click", openOptions);
  $("optBtn").addEventListener("mouseenter", () => {
    if ($("optBtn").classList.contains("blocked")) showBlockedTip($("optBtn"));
  });
  $("optBtn").addEventListener("mouseleave", () => {
    tip.hidden = true;
  });
  $("optBtn").addEventListener("focus", () => {
    if ($("optBtn").classList.contains("blocked")) showBlockedTip($("optBtn"));
  });
  $("optBtn").addEventListener("blur", () => {
    tip.hidden = true;
  });
  $("optClose").addEventListener("click", closeOptions);
  $("bgmVol").value = S.bgmVolume;
  $("bgmVol").addEventListener("input", () =>
    HS.setAudio({ bgmVolume: parseFloat($("bgmVol").value) }),
  );
  $("sfxVol").value = S.sfxVolume;
  $("sfxVol").addEventListener("input", () =>
    HS.setAudio({ sfxVolume: parseFloat($("sfxVol").value) }),
  );

  let openingPart = 1;
  function localizeOpening() {
    const first = $("openingPartOne").querySelectorAll("p");
    const second = $("openingPartTwo").querySelectorAll("p");
    ["introOne1", "introOne2", "introOne3", "introOne4"].forEach(
      (key, index) => {
        if (index === 1) {
          first[index].innerHTML =
            t(key) +
            ' <span class="purity-hero">' +
            (isSpanish()
              ? "héroe elegido de la pureza"
              : "the chosen hero of purity") +
            "</span>...";
        } else if (index === 2) {
          first[index].innerHTML =
            (isSpanish()
              ? "que había derrotado a un gran ser: "
              : "Who had defeated a great being: ") +
            '<span class="lord_chaos">' +
            (isSpanish() ? "el Señor del Caos" : "The Lord of Chaos") +
            "</span>.";
        } else first[index].textContent = t(key);
      },
    );
    [
      "introTwo1",
      "introTwo2",
      "introTwo3",
      "introTwo4",
      "introTwo5",
      "introTwo6",
      "introTwo7",
      "introTwo8",
    ].forEach((key, index) => {
      if (index === 4) {
        second[index].innerHTML =
          (isSpanish()
            ? "Destronaría al falso ángel, "
            : "They would dethrone the false angel, ") +
          '<span class="opening-red-emphasis">Seraphiel</span>' +
          (isSpanish()
            ? ", que solo había traído falsas esperanzas a este mundo."
            : ", who brought nothing but false hope to this world.");
      } else if (index === 6) {
        second[index].innerHTML =
          (isSpanish()
            ? "Pues necesitaría las almas de "
            : "For they would need the souls of ") +
          '<span class="souls-great-beings">' +
          (isSpanish() ? "diez grandes seres" : "ten great beings") +
          "</span>.";
      } else if (index === 7) {
        second[index].innerHTML =
          (isSpanish()
            ? "Con esas almas, el portal del gran ascenso le conduciría hasta el "
            : "With those souls, the Gate of the Great Rift would carry them to the ") +
          '<span class="opening-red-emphasis">' +
          (isSpanish() ? "falso ángel" : "false angel") +
          "</span>.";
      } else second[index].textContent = t(key);
    });
    $("openingContinue").textContent = t("continue");
    $("openingGo").textContent = t("begin");
  }
  function startOpening() {
    openingPart = 1;
    localizeOpening();
    $("openingPartOne").hidden = false;
    $("openingPartTwo").hidden = true;
    $("opening").classList.remove("skip", "leaving");
    $("opening").classList.add("open");
    loreMusicPlaying = true;
    HS.music("graciasTheme", 1);
    setTimeout(() => HS.sfx("distant_scream"), 800);
  }
  function skipOpening() {
    $("opening").classList.add("skip");
    (openingPart === 1 ? $("openingContinue") : $("openingGo")).focus();
  }
  $("openingContinue").addEventListener("animationend", () =>
    $("openingContinue").focus(),
  );
  $("openingGo").addEventListener("animationend", () => $("openingGo").focus());
  $("openingContinue").addEventListener("click", () => {
    if (openingPart !== 1) return;
    HS.sfx("menuSelect");
    openingPart = 2;
    $("openingPartOne").hidden = true;
    $("openingPartTwo").hidden = false;
    $("opening").classList.remove("skip");
    $("openingPartTwo")
      .querySelectorAll("p, #openingGo")
      .forEach((el) => {
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
      });
    $("openingGo").focus();
  });
  $("opening").addEventListener("pointerdown", (e) => {
    if (e.target.id !== "openingContinue" && e.target.id !== "openingGo")
      skipOpening();
  });
  $("openingGo").addEventListener("click", () => {
    if ($("opening").classList.contains("leaving")) return;
    HS.sfx("menuSelect");
    S.seenOpening = true;
    HS.save();
    $("opening").classList.add("leaving");
    HS.stopMusic();
    loreMusicPlaying = false;
    HS.music(lvl.music, lvl.rate, lvl.ambience); // start the fight's music inside this user gesture; the delayed setupLevel() cannot be trusted to do it
    setTimeout(() => {
      $("opening").classList.remove("open", "leaving");
      if (!S.seenTutorial) {
        openTutorial();
      } else {
        phase = "ready";
        setupLevel();
      }
    }, 1700);
  });

  function startLore() {
    const lines = $("lore").querySelectorAll(".lore p");
    ["lore1", "lore2", "lore3", "lore4", "lore5", "lore6", "lore7"].forEach(
      (key, index) => {
        lines[index].textContent = t(key);
      },
    );
    $("loreGo").textContent = t("ready");
    $("lore").setAttribute("aria-label", t("finalBossLore"));
    $("lore").classList.remove("skip");
    $("lore").classList.add("open");
    loreMusicPlaying = true;
    HS.music("seraphiel_introLore", 1);
  }
  function skipLore() {
    $("lore").classList.add("skip");
    $("loreGo").focus();
  }
  $("loreGo").addEventListener("animationend", () => $("loreGo").focus());
  $("lore").addEventListener("pointerdown", (e) => {
    if (e.target.id !== "loreGo") skipLore();
  });
  $("loreGo").addEventListener("click", () => {
    // fade the story away to reveal the fight
    if ($("lore").classList.contains("leaving")) return;
    HS.sfx("menuSelect");
    $("lore").classList.add("leaving");
    HS.stopMusic();
    loreMusicPlaying = false;
    HS.music(lvl.music, lvl.rate, lvl.ambience); // start the fight's music inside this user gesture; the delayed setupLevel() cannot be trusted to do it
    setTimeout(() => {
      $("lore").classList.remove("open", "leaving");
      phase = "ready";
      setupLevel();
    }, 1700);
  });

  function speechLines() {
    if (scriptQueued) return scriptQueued.lines;
    return midSpeech || levelSpeech(lvl, false);
  }
  function sealGear(on, color) {
    // Boss speech seals the keyboard and gear until all lines are dismissed.
    sealedGearOwner = on ? lvl.name : null;
    document.querySelectorAll(".key, .itembtn, #optBtn").forEach((el) => {
      el.classList.toggle("blocked", on);
      el.classList.toggle("white", on && color === "white");
      el.classList.toggle("red", on && color === "red");
      el.classList.toggle("blue", on && color === "blue");
    });
  }
  function startSpeech() {
    phase = "speech";
    round.speechI = round.speechI || 0;
    $("hintTitle").textContent = isSpanish()
      ? lvl.speechTitleEs || lvl.speechTitle || "Seraphiel"
      : lvl.speechTitle || "Seraphiel";
    $("hintGo").hidden = false;
    $("speechSkip").hidden = false;
    setHint(speechLines()[round.speechI]);
    if (lvl.final) {
      const color = lvl.pos === 0 ? "white" : "red";
      sealGear(true, color);
    } else if (lvl.name === "Arkania, the Gatewarden") {
      sealGear(true, "blue");
    } else if (lvl.name === "Gynn, the fallen angel") {
      sealGear(true, "red");
    }
  }
  // The beaten final-boss phase refuses to fall: he stays on his feet and speaks,
  // the music dies, and only when he is done does the last phase begin.
  function startDeathSpeech() {
    pose(lvl.sprites.defeated ? "defeated" : "idle"); // beaten, but still standing to speak
    HS.stopMusic();
    midSpeech = levelSpeech(lvl, true);
    round.speechI = 0;
    phase = "speech";
    $("hintTitle").textContent = isSpanish()
      ? lvl.deathSpeechTitleEs || lvl.deathSpeechTitle || enemyName(lvl)
      : lvl.deathSpeechTitle || lvl.name;
    $("hintGo").hidden = false;
    $("speechSkip").hidden = false;
    setHint(midSpeech[0]);
    if (lvl.final) sealGear(true, "red");
  }
  // the seamless phase change: banner + arena morph, then the next fight
  function beginNextPhase() {
    phase = "busy"; // no input during the banner
    const next = L[S.level];
    pose("dead");
    $("banner").textContent =
      isSpanish() && next.introEs ? next.introEs : next.intro;
    $("banner").classList.add("show");
    morphArena(next); // the arena changes look behind the banner
    $("banner").style.color = next.introColor || "";
    if (next.weird) {
      document.body.classList.add("weirdAll");
      startGlitch(420);
    } // the ????? is corrupted too
    HS.music(next.music, next.rate, next.ambience);
    later(() => {
      $("banner").classList.remove("show");
      setupLevel();
    }, BANNER_MS);
  }
  function revealBossName(fightMusic, onComplete) {
    phase = "intro";
    const reveal = $("bossIntroName");
    const isSeraphielFlesh = lvl.name === "Seraphiel, Lord of Lies";
    const name = enemyName(lvl).toUpperCase();
    const color =
      lvl.name === "Arkania, the Gatewarden"
        ? "#70dfff"
        : lvl.name === "Seraphiel, the pure angel"
          ? "#ffffff"
          : lvl.name === "Seraphiel, Lord of Lies"
            ? "#ff2400"
            : "#ff3030";
    reveal.style.setProperty("--boss-intro-color", color);
    reveal.replaceChildren();
    reveal.hidden = false;
    [...name].forEach((character, index) => {
      const letter = document.createElement("span");
      letter.textContent = character === " " ? "\u00a0" : character;
      if (character === " ") letter.className = "space";
      letter.style.animationDelay = index * 230 + "ms";
      reveal.appendChild(letter);
      if (character !== " ") {
        later(
          () =>
            HS.sfx(
              "letter_sfx",
              isSeraphielFlesh ? 0.72 : 1,
              isSeraphielFlesh ? 1.45 : 1,
            ),
          index * 230,
        );
      }
    });
    const duration = name.length * 230 + 500;
    later(() => {
      if (fightMusic) {
        const volumeMultiplier = {
          gynn_fight_bgm: 1.5,
          seraphiel_phase1_fight_bgm: 1.8,
          seraphiel_phase2_fight_bgm: 1.2,
        }[fightMusic] || 1;
        HS.music(fightMusic, 1, lvl.ambience, volumeMultiplier);
      }
      $("eName").textContent = enemyName(lvl);
      reveal.hidden = true;
      reveal.replaceChildren();
      onComplete();
    }, duration);
  }
  function advanceSpeech() {
    if (phase !== "speech") return;
    HS.sfx("menuSelect");
    // Play Seraphiel's hurt sound when advancing speech in the last phase.
    if (lvl.final && lvl.weird) HS.sfx("seraphielHurt_sfx");
    round.speechI = (round.speechI || 0) + 1;
    const lines = speechLines();
    if (round.speechI < lines.length) {
      setHint(lines[round.speechI]);
      if (!midSpeech && !scriptQueued) persist();
      return;
    }
    $("speechSkip").hidden = true;
    $("hintGo").hidden = true;
    $("hintTitle").textContent = t("wordHint");
    tip.hidden = true;
    if (scriptQueued) {
      // a cutscene line's last beat: continue the sequence it belongs to
      const done = scriptQueued.onComplete;
      scriptQueued = null;
      if (done) done();
      return;
    }
    if (midSpeech) {
      // his dying words are over: now the last phase takes the stage
      midSpeech = null;
      beginNextPhase();
      return;
    }
    round.speechDone = true;
    persist();
    if (hasBossNameReveal(lvl)) {
      HS.stopMusic();
      revealBossName(
        lvl.name === "Gynn, the fallen angel"
          ? "gynn_fight_bgm"
          : lvl.name === "Arkania, the Gatewarden"
            ? "arkania_fight_bgm"
            : lvl.name === "Seraphiel, the pure angel"
              ? "seraphiel_phase1_fight_bgm"
              : lvl.name === "Seraphiel, Lord of Lies"
                ? "seraphiel_phase2_fight_bgm"
                : lvl.music,
        () => {
          setHint(hintFor(lvl, round.word));
          setWeird(!!lvl.weird);
          phase = "ready";
          sealGear(false);
          if (lvl.final && lvl.weird) startGlitch(420);
        },
      );
      return;
    }
    setHint(hintFor(lvl, round.word));
    setWeird(!!lvl.weird);
    phase = "ready";
    // The fight begins: the sealed keyboard and gear open, and the warning clears
    sealGear(false);
  }
  $("hintGo").addEventListener("click", advanceSpeech);
  $("speechSkip").addEventListener("click", () => {
    if (phase !== "speech") return;
    round.speechI = speechLines().length - 1;
    advanceSpeech();
  });

  /* ---------- Seraphiel's true form: four words, Gynn's Protection ---------- */
  // Pick four distinct words from the phase's own pool: the first only forces the
  // angel to reveal itself, the last three are the real fight.
  function initFinalFour() {
    const pool = [...new Set(Object.keys(levelWords(lvl)))];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    round.finalSteps = pool.slice(0, lvl.finalWords);
    round.finalStep = 0;
    round.transformed = false;
    round.gynnActive = false;
    round.gynnCharges = 5;
    round.word = round.finalSteps[0];
  }
  function resetFinalFourDom() {
    const g = $("gynnSprite");
    g.hidden = true;
    g.classList.remove("show");
    const glow = $("soulGlow");
    glow.classList.remove("show");
    glow.textContent = "";
    const counter = $("p3Counter");
    counter.hidden = true;
    counter.textContent = "";
    $("gynnSkillWrap").hidden = true;
    $("stage").classList.remove("arena-inverted", "gynn-swapped");
    $("word").classList.remove("fade-red");
    $("keys").classList.remove("tremble-red");
    const overlay = $("finalDefeatOverlay");
    if (overlay) {
      overlay.classList.remove("active");
      overlay.hidden = true;
    }
  }
  function restoreFinalFour() {
    const g = $("gynnSprite");
    g.hidden = false;
    g.classList.add("show");
    $("gynnSkillWrap").hidden = false;
    updateGynnSkill();
    updateFinalCounter();
  }
  function updateFinalCounter() {
    const el = $("p3Counter");
    if (!finalFour() || !round.transformed) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent =
      Math.max(0, lvl.finalWords - round.finalStep) +
      " " +
      t("seraphielHearts");
  }
  function updateGynnSkill() {
    const btn = $("gynnSkill");
    const charges = round.gynnCharges || 0;
    $("gynnCounter").textContent = "x" + charges;
    btn.classList.toggle("used", charges <= 0);
    btn.setAttribute("aria-label", t("gynnSkillAria"));
    const blessing = $("gynnBlessingText");
    if (blessing) blessing.textContent = t("gynnBlessingText");
    setTip(btn, {
      name: t("gynnProtName"),
      status: t("gynnProtStatus"),
      effect: t("gynnProtEffect"),
      info: localizedCallout("gynnProtInfo", { n: charges }),
    });
  }
  // Show a scripted beat in the hint box and continue the sequence when dismissed.
  function playScript(lines, title, onComplete) {
    if (!lines || !lines.length) {
      if (onComplete) onComplete();
      return;
    }
    phase = "speech";
    scriptQueued = { lines, onComplete };
    round.speechI = 0;
    $("hintTitle").textContent = title;
    $("hintGo").hidden = false;
    $("speechSkip").hidden = false;
    setHint(lines[0]);
  }
  // A completed word of the true form. The first one never kills: it transforms.
  function advanceFinalWord() {
    if (!round.transformed) {
      $("word").classList.add("fade-red");
      $("keys").classList.add("tremble-red");
      later(() => {
        $("word").classList.remove("fade-red");
        $("keys").classList.remove("tremble-red");
      }, 1000);
      return startTransformation();
    }
    round.finalStep++;
    updateFinalCounter();
    if (round.finalStep >= lvl.finalWords) {
      return seraphielFinalDefeat();
    }
    phase = "busy";
    HS.sfx("attackSound");
    snd(lvl.sfx.hurt);
    setImg(P, PL.attack);
    pose("hurt");

    // Every time the player guesses a word, the guessed word fades to red and all button letters tremble and change to red for a second
    $("word").classList.add("fade-red");
    $("keys").classList.add("tremble-red");

    persist();
    later(() => {
      $("word").classList.remove("fade-red");
      $("keys").classList.remove("tremble-red");
      round.word = round.finalSteps[round.finalStep];
      round.hits = [];
      round.misses = [];
      round.marked = [];
      round.combo = 0;
      round.freezeUp = false;
      round.freezeTurns = 0;
      E.classList.remove("frozen");
      persist();
      idle();
      render();
      hpBar(round.hp);
      phase = "ready";
    }, 1000);
  }
  function seraphielFinalDefeat() {
    phase = "busy";
    round.hits = [...new Set(round.word)];
    render();
    $("word").classList.add("fade-red");
    $("keys").classList.add("tremble-red");
    HS.sfx("attackSound");
    snd(lvl.sfx.hurt);
    setImg(P, PL.attack);
    pose("hurt");
    HS.stopMusic();
    later(() => {
      setImg(P, PL.idle);
      $("word").classList.remove("fade-red");
      $("keys").classList.remove("tremble-red");
      HS.sfx("seraphiel_final_defeat");
      const overlay = $("finalDefeatOverlay");
      const scream = $("finalDefeatScream");
      if (scream) scream.textContent = t("seraphielFinalScream");
      if (overlay) {
        overlay.hidden = false;
        requestAnimationFrame(() => overlay.classList.add("active"));
      }
    }, 450);
    // The fade to white stays as long as the 10-second defeat SFX
    later(() => {
      HS.resetRun();
      S.cleared = true;
      S.round = null;
      HS.save();
      pose("dead");
      HS.sfx("hasGanadoSound");
      showResult(
        isSpanish() ? lvl.victoryEs || lvl.victory : lvl.victory,
        [],
        "won calamity",
        t("continue"),
        () => {
          location.href =
            "ending.html?lang=" + encodeURIComponent(S.language || "en");
        },
      );
      const overlay = $("finalDefeatOverlay");
      if (overlay) {
        overlay.classList.remove("active");
        overlay.hidden = true;
      }
    }, 10450);
  }
  // The first word falls but Seraphiel does not: the music dies, the taunt begins.
  function startTransformation() {
    setWeird(false);
    phase = "busy";
    round.transformed = true;
    round.finalStep = 1;
    round.gynnCharges = 5;
    round.word = round.finalSteps[round.finalStep];
    round.hits = [];
    round.misses = [];
    round.marked = [];
    round.combo = 0;
    round.freezeUp = false;
    round.freezeTurns = 0;
    round.dodgeUp = false;
    E.classList.remove("frozen");
    persist();
    HS.stopMusic(); // silence music and ambience
    idle();
    later(() => {
      playScript(speechArray("transformSpeech"), bossTitle(), () =>
        seraphielFatalBlow(),
      );
    }, 900);
  }
  function seraphielFatalBlow() {
    phase = "busy";
    pose("attack");
    const before = round.hp;
    later(() => snd(lvl.sfx.attack), lvl.sfxAt);
    later(() => {
      HS.sfx("crit_sfx");
      callout("-" + before + " " + t("hpWord"), "hurt");
      setImg(P, PL.hurt);
      hpBar(0, before);
    }, lvl.hitAt);
    later(() => {
      round.hp = 1;
      persist();
      setImg(P, PL.idle);
      hpBar(1);
      playScript(speechArray("surviveSpeech"), bossTitle(), showSoulGlow);
    }, lvl.hitAt + 900);
  }
  function showSoulGlow() {
    phase = "busy";
    const glow = $("soulGlow");
    glow.textContent = t("gynnSoul");
    glow.classList.add("show");
    HS.sfx("angelHurt_sfx");
    HS.sfx("menuSelect", 0.75);
    // the first (scripted) activation mends you to full health and restores all item usages
    round.hp = 100;
    round.shieldUp = false;
    round.dodgeUp = false;
    round.freezeUp = false;
    round.freezeTurns = 0;
    round.marked = [];
    round.stunCount = 0;
    S.flask = true;
    S.flaskCount = 1;
    S.shield = S.eye = S.dodge = S.freeze = true;
    S.temp = !!S.cpTemp;
    S.tempUp = false;
    E.classList.remove("frozen");
    P.classList.remove("shielded", "dodging");
    persist();
    setImg(P, PL.idle);
    hpBar(100, 1);
    callout("+100 " + t("hpWord"), "heal");
    updateItems();
    later(() => {
      glow.classList.remove("show");
      showGynnSprite();
    }, 2400);
  }
  function showGynnSprite() {
    const g = $("gynnSprite");
    g.hidden = false;
    requestAnimationFrame(() => g.classList.add("show"));
    later(() => {
      playScript(speechArray("gynnSpeech"), bossTitle(), showGynnProtection);
    }, 1200);
  }
  function showGynnProtection() {
    round.gynnActive = true;
    persist();
    $("gynnSkillWrap").hidden = false;
    updateGynnSkill();
    HS.sfx("menuSelect", 1.3);
    learnOnClose = () =>
      playScript(speechArray("resumeSpeech"), bossTitle(), startRealFinalFight);
    $("learn").classList.add("learn-gynn");
    learn(
      null,
      t("gynnProtectionTitle"),
      t("gynnProtectionBody"),
      false,
      "gynn_protection.png",
    );
  }
  // The real fight: the final theme alone, the word counter beside the name.
  function startRealFinalFight() {
    HS.stopMusic(); // the ambience falls silent too: only the final theme remains
    HS.music("finalBattle_bgm");
    updateFinalCounter();
    round.word = round.finalSteps[round.finalStep];
    round.hits = [];
    round.misses = [];
    round.marked = [];
    round.combo = 0;
    persist();
    idle();
    render();
    hpBar(round.hp);
    phase = "ready";
    setWeird(false);
  }
  // Gynn's Protection: a fatal blow instead heals to full and restores every usage.
  function gynnSave(before) {
    phase = "busy";
    round.gynnCharges--;
    snd(lvl.sfx.hurt);
    setImg(P, PL.hurt);
    callout("-" + before + " " + t("hpWord"), "hurt");
    hpBar(0, before);
    later(() => {
      $("stage").classList.add("gynn-swapped");
      later(() => {
        $("stage").classList.remove("gynn-swapped");
      }, 1000);

      const glow = $("soulGlow");
      glow.textContent = t("gynnProtCallout");
      glow.classList.add("show");
      HS.sfx("angelHurt_sfx");
      HS.sfx("menuSelect", 0.75);
      round.hp = 100;
      round.shieldUp = false;
      round.dodgeUp = false;
      round.freezeUp = false;
      round.freezeTurns = 0;
      round.marked = [];
      round.stunCount = 0;
      S.flask = true;
      S.flaskCount = 1;
      S.shield = S.eye = S.dodge = S.freeze = true;
      S.temp = !!S.cpTemp;
      S.tempUp = false;
      E.classList.remove("frozen");
      persist();
      P.classList.remove("shielded", "dodging");
      setImg(P, PL.idle);
      hpBar(100, 0);
      callout("+100 " + t("hpWord"), "heal");
      updateItems();
      updateGynnSkill();
    }, 800);
    later(() => {
      $("soulGlow").classList.remove("show");
      idle();
      render();
      hpBar(round.hp);
      phase = "ready";
    }, 2800);
  }
  function fatal(before) {
    if (finalFour() && round.transformed && round.gynnCharges > 0)
      return gynnSave(before);
    return lose(before);
  }

  function glitch() {
    // for a moment, letters ANYWHERE on screen turn to noise: keys, slots, hint, names, the ?????
    const SYM = "#%&?\u00a7\u2588\u2592\u2591\u00a4\u00bf",
      saved = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        /\S/.test(n.nodeValue) &&
        n.parentElement &&
        !n.parentElement.closest("script,style,#lore")
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
    });
    let n;
    while ((n = w.nextNode())) {
      saved.push([n, n.nodeValue]);
      n.nodeValue = n.nodeValue.replace(/\S/g, (c) =>
        Math.random() < 0.3 ? SYM[Math.floor(Math.random() * SYM.length)] : c,
      );
    }
    setTimeout(
      () =>
        saved.forEach(([x, v]) => {
          x.nodeValue = v;
        }),
      190,
    );
  }
  function startGlitch(every) {
    clearInterval(weirdTimer);
    if (!/calm/.test(location.search))
      weirdTimer = setInterval(() => {
        if (Math.random() < 0.65) glitch();
      }, every);
  }
  function setWeird(on) {
    clearInterval(weirdTimer);
    document.body.classList.toggle("weirdAll", on);
    if (on) startGlitch(1700);
  }

  const forced = parseInt(
    new URLSearchParams(location.search).get("level"),
    10,
  );
  if (forced >= 1 && forced <= L.length) {
    S.level = forced - 1;
    S.round = null;
  }
  setupLevel();
})();
