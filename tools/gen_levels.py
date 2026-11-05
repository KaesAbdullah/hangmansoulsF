import json, re

meta = json.load(open("meta.json"))
ARENA = {
    0: ("forestGameArea.gif", 7),
    1: ("rainyGameArena.gif", 6),
    2: ("leafGameArea.gif", 3),
    3: ("thanielBossArena.gif", 4),
}
KIT = {
    "skel": dict(
        hurt="skeletonHurtSound", death="purpleShadowDeathSound", attack="attackSound"
    ),
    "shadow": dict(
        hurt="purpleShadowHurtSound",
        death="purpleShadowDeathSound",
        attack="attackSound",
    ),
    "beast": dict(
        hurt="leafArrowHurtSound", death="leafArrowDeathSound", attack="attackSound"
    ),
    "heavy": dict(
        hurt="thanielHurtSound", death="thanielDeathSound", attack="attackSound"
    ),
    "brute": dict(
        hurt="thanielHurtSound", death="purpleShadowDeathSound", attack="attackSound"
    ),
    "creature": dict(
        hurt="skeletonHurtSound", death="thanielDeathSound", attack="attackSound"
    ),
    "demon": dict(
        hurt="skeletonHurtSound", death="purpleShadowDeathSound", attack="attackSound"
    ),
    "hero": dict(
        hurt="thanielHurtSound", death="purpleShadowDeathSound", attack="attackSound"
    ),
    "boss": dict(
        hurt="thanielHurtSound",
        death="thanielDeathSound",
        attack="thanielBossAttackSound",
    ),
}
G = "grayscale(1) sepia(1) "
E = [
    # ---------------- Round 2: the Necropolis ----------------
    dict(
        k="r2e1",
        name="Hexa the Spellbone",
        color="#5fe6e0",
        base=0,
        afx=G + "hue-rotate(80deg) saturate(1.6) brightness(.85)",
        kit="skel",
        pitch=1.1,
        words={
            "SPELL": "Words of power that a mage casts.",
            "ARCANE": "Relating to secret magical knowledge.",
            "SCYTHE": "A long curved blade on a pole, like the one it holds.",
            "COWL": "The hood worn over a robed head.",
            "CYAN": "The color of the flame burning in its skull.",
            "HEX": "A curse laid upon a victim.",
        },
    ),
    dict(
        k="r2e2",
        name="Brutus the Boneblade",
        color="#6fe0d8",
        base=1,
        afx=G + "hue-rotate(150deg) saturate(1.4) brightness(.8)",
        kit="skel",
        pitch=0.9,
        words={
            "SWORD": "The long weapon it swings.",
            "FIGHTER": "Someone trained for battle, as this skeleton once was.",
            "BONES": "What it is made of.",
            "HELMET": "Protective gear worn over the head.",
            "FLAME": "The glowing fire in its eyes.",
            "RUSTED": "How old iron looks after years of damp.",
        },
    ),
    dict(
        k="r2e3",
        name="Captain Marrow, the Elite",
        color="#4fd8d0",
        base=2,
        afx="grayscale(1) sepia(.6) hue-rotate(170deg) saturate(1.5) brightness(.55)",
        kit="skel",
        pitch=0.8,
        words={
            "ELITE": "Of the highest rank or skill.",
            "KNIGHT": "A mounted warrior sworn to a lord.",
            "VETERAN": "A soldier who has seen many wars.",
            "CAPTAIN": "The leader of a company of soldiers.",
            "HOODED": "Wearing a cowl over the head.",
            "STEEL": "Hard metal forged from iron.",
        },
    ),
    dict(
        k="b2",
        boss=1,
        name="Akatosh, the Necromancer",
        color="#c58bff",
        base=3,
        afx=G + "hue-rotate(240deg) saturate(2.4) brightness(.7)",
        kit="boss",
        pitch=1.15,
        words={
            "NECROMANCER": "Akatosh: One who commands the dead. I am a ___.",
            "GRAVE": "Akatosh: Where your body will lie when I am done.",
            "SUMMON": "Akatosh: To call forth my servants from the dark.",
            "CURSE": "Akatosh: An evil spell that follows you to the end.",
            "STAFF": "Akatosh: The twisted rod that channels my power.",
            "SOULS": "Akatosh: What I harvest from the fallen.",
            "UNDEAD": "Akatosh: Dead, yet they still walk at my command.",
            "SORCERY": "Akatosh: Dark magic is my art.",
        },
    ),
    # ---------------- Round 3: the Ruined Keep ----------------
    dict(
        k="r3e1",
        name="Chainwick the Binder",
        color="#58d8c8",
        base=1,
        afx=G + "hue-rotate(160deg) saturate(1.2) brightness(.7)",
        kit="shadow",
        pitch=1.0,
        words={
            "CHAIN": "Linked rings of metal, wielded as a weapon.",
            "LINK": "One ring of a chain.",
            "MAGE": "A wielder of magic.",
            "SHACKLE": "A ring that binds a prisoner\u2019s wrist.",
            "FETTER": "A chain that holds a prisoner.",
        },
    ),
    dict(
        k="r3e2",
        name="Ferrum, the Iron Golem",
        color="#a8b8cc",
        base=0,
        afx="grayscale(1) sepia(.5) brightness(.8) contrast(1.1)",
        kit="heavy",
        pitch=0.65,
        words={
            "IRON": "The metal it is made of.",
            "GOLEM": "A lifeless giant animated by magic.",
            "AXE": "The heavy blade on its pole.",
            "FORGE": "Where iron is heated and shaped.",
            "ANVIL": "The block a blacksmith hammers on.",
            "RUST": "What iron grows when left in the rain.",
        },
    ),
    dict(
        k="r3e3",
        name="Gorrak the Risen",
        color="#b9a2e0",
        base=2,
        afx="sepia(1) saturate(1.6) hue-rotate(40deg) brightness(.55)",
        kit="brute",
        pitch=0.55,
        words={
            "ZOMBIE": "A corpse that walks again.",
            "SHIELD": "It carries one on its arm.",
            "ROTTING": "Slowly decaying, like this warrior.",
            "HORDE": "A great crowd of enemies.",
            "GRAVEYARD": "Where the dead are buried.",
            "CARRION": "Dead flesh left behind for scavengers.",
        },
    ),
    dict(
        k="b3",
        boss=1,
        name="Nyx, the Dark Elf Assassin",
        color="#ff6a6a",
        base=3,
        afx=G + "hue-rotate(-30deg) saturate(3) brightness(.6)",
        kit="boss",
        pitch=1.25,
        words={
            "ASSASSIN": "Nyx: A killer for hire. I am an ___.",
            "DAGGER": "Nyx: A short blade, perfect for a quiet kill.",
            "AMBUSH": "Nyx: A surprise attack from hiding.",
            "SILENT": "Nyx: Without a sound. That is how I move.",
            "CONTRACT": "Nyx: The agreement that put your name on my list.",
            "POISON": "Nyx: A deadly drop on the blade.",
            "DROW": "Nyx: Another name for my dark kin.",
        },
    ),
    # ---------------- Round 4: the Stormlands ----------------
    dict(
        k="r4e1",
        name="Pallor, the White Beast",
        color="#d9c4b0",
        base=0,
        afx="grayscale(1) sepia(.6) hue-rotate(180deg) saturate(1.2) brightness(1.1)",
        kit="creature",
        pitch=0.45,
        words={
            "BEAST": "A wild and dangerous animal.",
            "PALE": "Lacking color, like this creature.",
            "FANGS": "Its sharp teeth.",
            "PREDATOR": "A hunter that feeds on other animals.",
            "HUNGRY": "Needing food, as this monster always is.",
            "PROWL": "To move quietly while hunting.",
        },
    ),
    dict(
        k="r4e2",
        name="Cinderwyrm the Fire Worm",
        color="#ff8a3a",
        base=2,
        afx="sepia(1) saturate(3) hue-rotate(-35deg) brightness(.75)",
        kit="shadow",
        pitch=0.6,
        words={
            "WORM": "A long, soft creature without legs.",
            "BLAZE": "A large, fierce fire.",
            "MOLTEN": "Melted by great heat.",
            "SCORCH": "To burn the surface of something.",
            "BURROW": "A tunnel dug by an animal.",
            "INFERNO": "A huge, raging fire.",
        },
    ),
    dict(
        k="r4e3",
        src="r2e3",
        ph=1,
        name="Stormbound Revenant",
        color="#ffe14d",
        fx="hue-rotate(-120deg) saturate(2) brightness(1.15)",
        base=1,
        afx=G + "hue-rotate(10deg) saturate(2.5) brightness(.85)",
        kit="skel",
        pitch=1.3,
        music="r2e2",
        rate=1.1,
        words={
            "STORM": "Wind, rain and thunder together.",
            "THUNDER": "The boom that follows lightning.",
            "LIGHTNING": "A flash of electricity in the sky.",
            "SPARK": "A tiny bright flash of fire or electricity.",
            "CURRENT": "A flow of electric charge.",
        },
    ),
    dict(
        k="b4",
        boss=1,
        name="Voltan, Lord of Lightning",
        color="#6fe8ff",
        base=3,
        afx=G + "hue-rotate(150deg) saturate(2.2) brightness(.95)",
        kit="boss",
        pitch=1.0,
        words={
            "LIGHTNING": "Voltan: A bolt from the sky that answers my call.",
            "WARRIOR": "Voltan: One who lives to fight. I am a ___.",
            "SHOCK": "Voltan: A sudden jolt that stops the heart.",
            "CHARGE": "Voltan: To rush at the enemy, or to fill with power.",
            "STATIC": "Voltan: A crackle of electricity that clings to cloth.",
            "VOLTAGE": "Voltan: The force that drives a current.",
            "SURGE": "Voltan: A sudden powerful rush.",
            "CONDUCTOR": "Voltan: A material that lets lightning pass through.",
        },
    ),
    # ---------------- Round 5: the Void ----------------
    dict(
        k="r5e1",
        src="r3e3",
        ph=1,
        name="Hollow Marauder",
        color="#d070c0",
        fx="hue-rotate(40deg) saturate(1.6) brightness(.6)",
        base=0,
        afx=G + "hue-rotate(250deg) saturate(2) brightness(.5)",
        kit="beast",
        pitch=0.6,
        music="r3e1",
        rate=0.9,
        words={
            "HOLLOW": "Empty on the inside.",
            "EMPTY": "Holding nothing at all.",
            "DECAY": "Slow rotting away.",
            "WITHER": "To dry up and fade.",
            "MARAUDER": "A raider who roams to loot and kill.",
        },
    ),
    dict(
        k="r5e2",
        src="r3e2",
        ph=1,
        name="Obsidian Colossus",
        color="#8a7ad8",
        fx="sepia(1) hue-rotate(230deg) saturate(3) brightness(.55)",
        base=1,
        afx=G + "hue-rotate(260deg) saturate(2) brightness(.5)",
        kit="heavy",
        pitch=0.5,
        music="r2e1",
        rate=0.85,
        words={
            "OBSIDIAN": "Black volcanic glass.",
            "COLOSSUS": "A statue or being of enormous size.",
            "MONOLITH": "A single huge standing stone.",
            "UNBREAKABLE": "Impossible to break.",
            "TITAN": "A giant from ancient myth.",
        },
    ),
    dict(
        k="r5e3",
        src="r4e1",
        ph=1,
        name="Voidmaw",
        color="#a070ff",
        fx="sepia(1) hue-rotate(230deg) saturate(3) brightness(.5)",
        base=2,
        afx=G + "hue-rotate(240deg) saturate(2.2) brightness(.4)",
        kit="beast",
        pitch=0.5,
        words={
            "DEVOUR": "To eat greedily and completely.",
            "MAW": "The mouth of a great beast.",
            "VORACIOUS": "Always hungry for more.",
            "CHASM": "A deep crack in the ground.",
            "ECHO": "A sound that bounces back.",
        },
    ),
    dict(
        k="b5",
        boss=1,
        name="The Void King",
        color="#e08aff",
        base=3,
        afx=G + "hue-rotate(250deg) saturate(2.6) brightness(.35)",
        kit="boss",
        pitch=0.7,
        words={
            "VOID": "Void King: Emptiness without end. My kingdom.",
            "KING": "Void King: A ruler of a realm. I am yours.",
            "THRONE": "Void King: The seat from which I rule.",
            "DOMINION": "Void King: Absolute rule over all that exists.",
            "TYRANT": "Void King: A cruel ruler who answers to no one.",
            "NOTHINGNESS": "Void King: The state of being no thing at all.",
            "OBLIVION": "Void King: Utter forgetting, where you are going.",
            "ENTROPY": "Void King: The slow decay of all order.",
        },
    ),
]
byk = {e["k"]: e for e in E}
NEW = [
    dict(
        k="b3",
        boss=1,
        name="Ashgor, the Molten Tyrant",
        color="#ff8a3a",
        map="mapBoss3.gif",
        gnd=8,
        kit="boss",
        pitch=0.75,
        words={
            "VOLCANO": "Ashgor: A mountain that spits fire. I am its heart.",
            "MAGMA": "Ashgor: Molten rock beneath the earth. It is my blood.",
            "ERUPTION": "Ashgor: When the mountain explodes and the sky burns.",
            "CRATER": "Ashgor: The great bowl at the top of a volcano.",
            "FURNACE": "Ashgor: A roaring oven where metal melts. That is my belly.",
            "ASHFALL": "Ashgor: Gray snow of burnt dust drifting from the sky.",
            "COLOSSUS": "Ashgor: A giant of living stone and fire.",
            "FIEND": "Ashgor: A horned horror from the pit. I am one.",
        },
    ),
    dict(
        k="r4e3",
        name="Ignis the Ember Mage",
        color="#ff4a4a",
        base=1,
        afx=G + "hue-rotate(-20deg) saturate(3) brightness(.6)",
        kit="shadow",
        pitch=1.2,
        words={
            "FLARE": "A sudden bright burst of flame.",
            "PYRE": "A pile of wood built to burn.",
            "SKULL": "The bone of the head. This mage carries one.",
            "EMBER": "A glowing piece of coal in a dying fire.",
            "WARLOCK": "A dark magic user who bargains for power.",
            "CRIMSON": "A deep, rich red, like the flame on its staff.",
        },
    ),
    dict(
        k="r5e1",
        name="Nyx, the Dark Elf Assassin",
        color="#ff6a6a",
        map="mapR5e1.gif",
        gnd=8,
        kit="shadow",
        pitch=1.25,
        words={
            "ASSASSIN": "Nyx: A killer for hire. I am an ___.",
            "DAGGER": "Nyx: A short blade, perfect for a quiet kill.",
            "AMBUSH": "Nyx: A surprise attack from hiding.",
            "SILENT": "Nyx: Without a sound. That is how I move.",
            "CONTRACT": "Nyx: The agreement that put your name on my list.",
            "POISON": "Nyx: A deadly drop on the blade.",
            "DROW": "Nyx: Another name for my dark kin.",
        },
    ),
    dict(
        k="r5e2",
        name="Ghast the Gloomwing",
        color="#66e04a",
        base=1,
        afx=G + "hue-rotate(110deg) saturate(2) brightness(.5)",
        kit="demon",
        pitch=0.6,
        words={
            "WINGS": "What lets it fly through the dark.",
            "GARGOYLE": "A winged stone monster perched on old towers.",
            "TALONS": "Sharp claws used to seize prey.",
            "SWOOP": "To dive down suddenly on a target.",
            "VENOM": "Poison from a fang or a stinger.",
            "GLOOM": "A dark, heavy, hopeless mood.",
        },
    ),
    dict(
        k="r5e3",
        name="Kaelen, the Fallen Stormhero",
        color="#b78bff",
        map="mapR5e3.gif",
        gnd=3,
        kit="hero",
        pitch=0.65,
        words={
            "HERO": "A brave champion who protects others. He once was one.",
            "FALLEN": "Brought low from a great height, like this champion.",
            "ANTIHERO": "A hero who lost his noble ways. That is what he is now.",
            "THUNDERBOLT": "A flash of lightning and a crash of thunder in one.",
            "EMERALD": "The deep green gem that colors this arena.",
            "ANCIENT": "From the oldest age of the world, like his legend.",
            "LEGEND": "A tale of great deeds, passed down through the ages.",
        },
    ),
    dict(
        k="b5",
        boss=1,
        name="Garabel, the Mecha Angel",
        color="#9fd8e8",
        map="mapBoss5.gif",
        gnd=9,
        kit="boss",
        pitch=1.2,
        bob=1,
        words={
            "ANGEL": "Garabel: A winged messenger. I am the machine-made kind.",
            "MECHA": "Garabel: A giant fighting machine built of steel.",
            "FEATHERS": "Garabel: Each steel plate on my wings is one.",
            "CIRCUIT": "Garabel: The path electricity follows inside my body.",
            "ENGINE": "Garabel: The heart that powers my body, humming inside.",
            "ARMOR": "Garabel: The plates that shield my body.",
            "PRECISION": "Garabel: Exactness. I never miss.",
            "REACTOR": "Garabel: The core that burns inside me.",
        },
    ),
]
for e in NEW:
    byk[e["k"]] = e
MAPS = {
    "r2e1": "mapR2e1",
    "r2e2": "mapR2e2",
    "r2e3": "mapR2e3",
    "b2": "mapBoss2",
    "r3e1": "mapR3e1",
    "r3e2": "mapR3e2",
    "r3e3": "mapR3e3",
    "b3": "mapBoss3",
    "r4e1": "mapR4e1",
    "r4e2": "mapR4e2",
    "r4e3": "mapR4e3",
    "b4": "mapBoss4",
    "r5e1": "mapR5e1",
    "r5e2": "mapR5e2",
    "r5e3": "mapR5e3",
    "b5": "mapBoss5",
}
for k, m in MAPS.items():
    byk[k].update(
        map=m + ".gif", gnd=8, afx=None
    )  # real maps keep their own colors; GROUND in levels.js sets where everyone stands
order = [
    "r2e1",
    "r2e2",
    "r2e3",
    "b2",
    "r3e1",
    "r3e2",
    "r3e3",
    "b3",
    "r4e1",
    "r4e2",
    "r4e3",
    "b4",
    "r5e1",
    "r5e2",
    "r5e3",
    "b5",
]
E = [byk[k] for k in order]


def js(e):
    k = e["k"]
    m = meta[k]
    boss = e.get("boss")
    css = "attack" not in m["poses"]
    if e.get("map"):
        arena, ground = e["map"], e["gnd"]
    else:
        arena, ground = ARENA[e["base"]]
    i = lambda n: f"{k}{n}.gif"
    dead = "nothing.png" if m["death"] in ("dissolve", None) else f"{k}Dead.png"
    sp = dict(
        idle=i("Idle"),
        attack=i("Idle") if css else i("Attack"),
        hurt=i("Idle"),
        death=i("Idle") if css else i("Death"),
        dead=dead,
    )
    o = dict(name=e["name"], color=e["color"])
    if boss:
        o["boss"] = True
    o.update(
        victory="BOSS DEFEATED!" if boss else "ENEMY DEFEATED",
        arena=arena,
        ground=ground,
    )
    if e.get("map"):
        o["arenaSmooth"] = True
    if e.get("afx"):
        o["arenaFx"] = e["afx"]
    o.update(
        music=e.get("musicFile") or e.get("music", k) + "Ost",
        rate=e.get("rate", 1),
        pitch=e["pitch"],
        anchor="center",
        hurtFx=True,
        sprites=sp,
        sfx=KIT[e["kit"]],
    )
    if css:
        o.update(cssPose=True, sfxAt=150, hitAt=350, endAt=700, deathMs=1200)
    else:
        o.update(
            sfxAt=m["sfxAt"], hitAt=m["hitAt"], endAt=m["endAt"], deathMs=m["deathMs"]
        )
    if e.get("bob"):
        o["cssBob"] = True
    o["words"] = e["words"]
    return "    " + json.dumps(o, ensure_ascii=False)


mid = """/* ---------- Rounds 2 to 5 ----------
   Real art and music from the hangman_ext pack. Sprites were processed by build/assets.py (background removed,
   aligned, scaled, mirrored to face the player, long attacks sped up to ~2s). The pack has no hurt animation, so
   `hurt` reuses the idle GIF and hurtFx adds a shake. Enemy sounds are existing sounds at a different pitch.
   Characters without a death GIF get a generated pixel dissolve; characters with only an idle (Brann, Garabel) use
   cssPose: attack/hit/death are CSS motion on the idle sprite. Maps are the pack's own arenas (arenaSmooth). */
(function () {
  const V = (base, o) => Object.assign({}, HS.LEVELS[base], o);
  HS.LEVELS.push(
""" + ",\n".join(js(e) for e in E) + "\n  );\n\n"
s = open("/home/claude/hangman-souls/js/levels.js").read()
i2 = s.index("/* ---------- Rounds 2 to 5 ----------")
i6 = s.index("  /* ---------- Round 6: the FINAL BOSS")
tail = s[i6:].replace("a shield absorbs 20", "a shield absorbs 30")
open("/home/claude/hangman-souls/js/levels.js", "w").write(s[:i2] + mid + tail)
