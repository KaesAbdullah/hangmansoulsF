/* Shared helpers: saved progress, sound effects, music (+ optional ambience layers). */
window.HS = (function () {
  const KEY = "hangmanSouls.v2";
  const DEFAULTS = {
    level: 0,
    round: null,
    language: "en",
    seenTutorial: false,
    seenOpening: false,
    seenDeflect: false,
    seenPerfectBlock: false,
    seenFlaskBonus: false,
    seenBossWordHints: false,
    seenGearInfo: { shield: false, eye: false, freeze: false },
    cleared: false,
    flask: true,
    flaskCount: 1,
    shield: true,
    eye: true,
    dodge: true,
    freeze: true,
    debugShield: false,
    debugEnabled: false,
    unlocked: { shield: false, eye: false, freeze: false },
    temp: false,
    tempUp: false,
    cpTemp: false,
    hp: 100,
    muted: false,
    bgmVolume: 0.6,
    sfxVolume: 0.6,
  };
  let S = null,
    bgm = null,
    amb = [],
    bgmKey = null;

  function load() {
    if (!S) {
      let stored = {};
      try {
        stored = JSON.parse(localStorage.getItem(KEY) || "{}");
      } catch (e) {}
      S = Object.assign({}, DEFAULTS, stored);
      let savedLanguage = null;
      try {
        savedLanguage = localStorage.getItem("hangmanSouls.language");
      } catch (e) {}
      const requestedLanguage = new URLSearchParams(location.search).get(
        "lang",
      );
      if (requestedLanguage === "en" || requestedLanguage === "es") {
        savedLanguage = requestedLanguage;
      }
      if (savedLanguage === "en" || savedLanguage === "es") {
        S.language = savedLanguage;
      }
      let savedDebug = null;
      try {
        savedDebug = localStorage.getItem("hangmanSouls.debugEnabled");
      } catch (e) {}
      const requestedDebug = new URLSearchParams(location.search).get("debug");
      if (requestedDebug === "1" || requestedDebug === "0") {
        S.debugEnabled = requestedDebug === "1";
      } else if (savedDebug === "true" || savedDebug === "false") {
        S.debugEnabled = savedDebug === "true";
      }
      const legacyVolume = S.volume;
      if (S.bgmVolume == null)
        S.bgmVolume = legacyVolume == null ? DEFAULTS.bgmVolume : legacyVolume;
      if (S.sfxVolume == null)
        S.sfxVolume = legacyVolume == null ? DEFAULTS.sfxVolume : legacyVolume;
      if (S.ver !== 8) {
        if (!S.ver || S.ver < 3) S.eye = true;
        if (typeof S.hp !== "number") S.hp = 100;
        if ((S.ver || 0) < 6 && S.level >= 20) S.level = 40 + (S.level - 20);
        if ((S.ver || 0) < 7) S.freeze = true;
        S.unlocked = {
          shield: S.level > 3,
          eye: S.level > 7,
          freeze: S.level > 23,
        };
        S.ver = 8;
      }
      if (S.unlocked)
        S.unlocked = Object.assign({}, DEFAULTS.unlocked, S.unlocked);
      S.seenGearInfo = Object.assign({}, DEFAULTS.seenGearInfo, S.seenGearInfo);
      if (S.volume != null) {
        delete S.volume;
        save();
      }
    }
    return S;
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
      localStorage.setItem(
        "hangmanSouls.debugEnabled",
        S && S.debugEnabled ? "true" : "false",
      );
      if (S && (S.language === "en" || S.language === "es")) {
        localStorage.setItem("hangmanSouls.language", S.language);
      }
    } catch (e) {}
  }

  // rate != 1 shifts pitch (used for variants of existing sounds).
  function setRate(a, rate) {
    if (!rate || rate === 1) return;
    a.preservesPitch = false;
    a.webkitPreservesPitch = false;
    a.mozPreservesPitch = false;
    a.playbackRate = rate;
  }
  function sfx(name, rate, volumeMultiplier) {
    const s = load();
    if (s.muted) return;
    const a = new Audio("sounds/sfx/" + name + ".mp3");
    const boosts = {
      beastHurt_sfx: 1.7,
      blockbreak_sfx: 1.75,
      block_sfx: 1.55,
      crit_sfx: 2.5,
      dodge_sfx: 1.65,
      perfectblock_sfx: 0.9,
      seraphielHurt_sfx: 1.6,
      seraphielAttack: 1.45,
      seraphielDeath: 1.4,
      zombie_sfx: 2.5,
    };
    a.volume = Math.min(
      1,
      s.sfxVolume * (boosts[name] || 1) * (volumeMultiplier || 1),
    );
    setRate(a, rate);
    a.play().catch(() => {});
  }
  function play(a) {
    a.play().catch(() => {
      // Browsers block autoplay until the first click or key press.
      const go = () => {
        if (a === bgm || amb.includes(a)) a.play().catch(() => {});
      };
      addEventListener("pointerdown", go, { once: true });
      addEventListener("keydown", go, { once: true });
    });
  }
  // ambience: a name, or a list of { name, vol, rate } layers that play along with the music
  function music(name, rate, ambience, volumeMultiplier) {
    const layers = (ambience ? [].concat(ambience) : []).map((a) =>
      typeof a === "string" ? { name: a, vol: 0.45 } : a,
    );
    const key =
      name +
      "@" +
      (rate || 1) +
      "@" +
      layers.map((l) => l.name + ":" + (l.rate || 1)).join("+");
    if (bgm && bgmKey === key && !bgm.paused) return;
    stopMusic();
    bgmKey = key;
    const s = load();
    bgm = new Audio("sounds/bgm/" + name + ".mp3");
    setRate(bgm, rate);
    bgm.loop = true;
    bgm.dataset.vol = 0.6 * (volumeMultiplier || 1);
    bgm.volume = Math.min(1, s.bgmVolume * parseFloat(bgm.dataset.vol));
    bgm.muted = s.muted;
    play(bgm);
    layers.forEach((l) => {
      const a = new Audio("sounds/bgm/" + l.name + ".mp3");
      setRate(a, l.rate);
      a.loop = true;
      a.dataset.vol = l.vol;
      a.volume = Math.min(1, s.bgmVolume * l.vol);
      a.muted = s.muted;
      amb.push(a);
      play(a);
    });
  }
  function endLore() {
    music("ending_ost");
  }
  function stopMusic() {
    [bgm].concat(amb).forEach((a) => {
      if (a) a.pause();
    });
    bgm = null;
    amb = [];
    bgmKey = null;
  }
  // Stop only the main theme; the ambience layers keep playing (used by the
  // final boss when it refuses to fall and begins to speak).
  function stopBgm() {
    if (bgm) bgm.pause();
    bgm = null;
    bgmKey = null;
  }

  function applyAudio() {
    const s = load();
    if (bgm) {
      bgm.muted = s.muted;
      bgm.volume = Math.min(
        1,
        s.bgmVolume * parseFloat(bgm.dataset.vol || "0.6"),
      );
    }
    amb.forEach((a) => {
      a.muted = s.muted;
      a.volume = Math.min(1, s.bgmVolume * parseFloat(a.dataset.vol));
    });
  }
  function setAudio(p) {
    Object.assign(load(), p);
    save();
    applyAudio();
  }
  function setLanguage(language) {
    const s = load();
    if (language !== "en" && language !== "es") return false;
    if (s.language !== language) {
      s.language = language;
      s.round = null;
    }
    try {
      localStorage.setItem("hangmanSouls.language", language);
    } catch (e) {}
    save();
    return true;
  }
  addEventListener("storage", (event) => {
    if (event.key !== "hangmanSouls.debugEnabled" || !S) return;
    S.debugEnabled = event.newValue === "true";
    document.dispatchEvent(
      new CustomEvent("hangmanSouls:debugChanged", {
        detail: { enabled: S.debugEnabled },
      }),
    );
  });
  document.addEventListener("DOMContentLoaded", applyAudio);

  // Start a fresh run: back to the first enemy with all items reset (and locked again).
  function resetRun() {
    Object.assign(load(), {
      level: 0,
      round: null,
      flask: true,
      flaskCount: 1,
      shield: true,
      eye: true,
      dodge: true,
      freeze: true,
      temp: false,
      tempUp: false,
      cpTemp: false,
      hp: 100,
      seenOpening: false,
      unlocked: { shield: false, eye: false, freeze: false },
      seenGearInfo: { shield: false, eye: false, freeze: false },
    });
    save();
  }

  return {
    load,
    save,
    sfx,
    music,
    endLore,
    stopMusic,
    stopBgm,
    setAudio,
    setLanguage,
    resetRun,
  };
})();
