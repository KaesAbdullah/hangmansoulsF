/* All level data lives here. To add a level or a word, edit this file only.
  hitAt   = ms after a wrong guess when the player is struck
  endAt   = ms when everything returns to idle
  sfxAt   = ms when the enemy attack sound plays
  deathMs = length of the enemy death animation (read from the GIF)
  color   = hint text color (matches the enemy)
  Damage per wrong letter is NOT set here: it follows a formula at the bottom of this file. */
HS.LEVELS = [
  {
    name: "Larry the Skeleton",
    color: "#7fe0a0",
    victory: "ENEMY DEFEATED",
    arena: "relaxing_village.gif",
    ground: 8,
    arenaSmooth: true,
    music: "bgm",
    rate: 1,
    pitch: 1.0,
    anchor: "center",
    hurtFx: true,
    sprites: {
      idle: "r1e1Idle.gif",
      attack: "r1e1Attack.gif",
      hurt: "r1e1Idle.gif",
      death: "r1e1Death.gif",
      dead: "r1e1Dead.png",
    },
    sfx: {
      hurt: "skeletonHurtSound",
      death: "skeletonHurtSound",
      attack: "attackSound",
    },
    sfxAt: 405,
    hitAt: 525,
    endAt: 1500,
    deathMs: 1140,
    nameEs: "Larry el esqueleto",
    victoryEs: "ENEMIGO DERROTADO",
    wordsEs: {
      HUESO:
        "Parte dura del cuerpo que perdura mucho después de desaparecer la carne.",
      CRANEO: "Caja ósea que protege y resguarda el cerebro.",
      TORAX: "Conjunto de costillas que protege el corazón y los pulmones.",
      COLUMNA: "Hilera de vértebras que sostiene la espalda.",
      ARTICULACION:
        "Punto de unión entre dos huesos que permite el movimiento.",
      TUMBA: "Lugar cavado en la tierra donde reposan los difuntos.",
      LINTERNA: "Luz portátil para disipar la oscuridad.",
    },
    words: {
      BONE: "The hard part of the body that remains long after flesh is gone.",
      SKULL: "The bony case that protects the brain.",
      RIBCAGE: "The cage of curved bones guarding the heart and lungs.",
      SPINE: "The flexible column of bones running down the back.",
      JOINT: "The meeting point between two bones that allows bending.",
      GRAVE: "A resting place dug into the ground for the dead.",
      LANTERN: "A portable light used to pierce the darkness.",
    },
  },
  {
    name: "Sharple the Shadow",
    color: "#b28cff",
    arena: "rainTemple.gif",
    arenaSmooth: true,
    ground: 8,
    music: "bgmLvl2",
    victory: "ENEMY DEFEATED",
    anchor: "right",
    scale: 0.9,
    sprites: {
      idle: "purpleShadowIdle.gif",
      attack: "purpleShadowAttack.gif",
      hurt: "prurpleShadowHurt.gif",
      death: "purpleShadowDeath.gif",
      dead: "nothing.png",
    },
    sfx: {
      hurt: "purpleShadowHurtSound",
      death: "purpleShadowDeathSound",
      attack: "attackSound",
    },
    sfxAt: 300,
    hitAt: 300,
    endAt: 800,
    deathMs: 1610,
    nameEs: "Sharple, la sombra",
    victoryEs: "ENEMIGO DERROTADO",
    wordsEs: {
      SOMBRA: "Figura oscura que aparece cuando algo bloquea la luz.",
      MORADO: "El color del resplandor de la hoja de Sharple.",
      ESPADA: "Arma con una hoja metalica de filo cortante.",
      CHISPA: " Pequeno destello de luz producido por un arma electrica.",
      LLUVIA: "Gotas de agua que caen del cielo nocturno.",
      TEMPLO: "Edificio sagrado con muros de piedra y un patio.",
      ANTORCHA: "Palo ardiendo que sirve para iluminar un lugar oscuro.",
    },
    words: {
      SHADOW: "A dark shape made when something blocks the light.",
      PURPLE: "The color of the glow along Sharple's blade.",
      BLADE: "The sharp metal edge of a sword.",
      SPARK: "A tiny flash of light from an electric weapon.",
      RAIN: "Drops of water falling from the night sky.",
      TEMPLE: "A sacred building with stone walls and a courtyard.",
      TORCH: "A burning stick used to light a dark place.",
    },
  },
  {
    name: "Rina, the fast arrow",
    color: "#8fd68a",
    arena: "mapR2e1.gif",
    arenaSmooth: true,
    ground: 8,
    music: "leafArrowOst",
    victory: "ENEMY DEFEATED",
    anchor: "left",
    sprites: {
      idle: "leafArrowIdle.gif",
      attack: "leafArrowAttack.gif",
      hurt: "leafArrowHurt.gif",
      death: "leafArrowDeath.gif",
      dead: "leafArrowDead.png",
    },
    sfx: {
      hurt: "leafArrowHurtSound",
      death: "leafArrowDeathSound",
      attack: "attackSound",
    },
    sfxAt: 800,
    hitAt: 800,
    endAt: 1200,
    deathMs: 1520,
    nameEs: "Rina, la flecha veloz",
    victoryEs: "ENEMIGO DERROTADO",
    wordsEs: {
      ELFO: "Ser del bosque que suele representarse con orejas puntiagudas.",
      ARCO: "Arma curva que lanza flechas al tensar su cuerda.",
      FLECHA: "Proyectil recto y puntiagudo que se dispara con un arco.",
      CARCAJ: "Estuche que se lleva para guardar flechas durante un viaje.",
      APUNTAR: "Dirigir un arma con cuidado hacia un objetivo.",
      HOJA: "Parte plana y verde que crece en un arbol o una planta.",
      BOSQUE: "Extensa zona cubierta de arboles y plantas silvestres.",
    },
    words: {
      ELF: "A forest-dwelling folk often shown with pointed ears.",
      BOW: "A curved weapon that launches arrows when its string is drawn.",
      ARROW: "A straight projectile with a pointed tip, shot from a bow.",
      QUIVER: "A holder worn to carry arrows while traveling.",
      AIM: "To point a weapon carefully toward a target.",
      LEAF: "A flat green part that grows from a tree or plant.",
      FOREST: "A wide area filled with trees and wild plants.",
    },
  },
  {
    name: "Thaniel, The Fire King",
    color: "#ff9a4a",
    arena: "thaniel.gif",
    arenaSmooth: true,
    ground: 8,
    music: "thanielBossBGM",
    boss: true,
    unlock: "shield",
    victory: "BOSS DEFEATED!",
    nameEs: "Thaniel, el rey del fuego",
    victoryEs: "¡JEFE DERROTADO!",
    anchor: "right",
    scale: 1.1,
    sprites: {
      idle: "thanielBossIdle.gif",
      attack: "thanielBosssAttack.gif",
      hurt: "thanielBossHurt.gif",
      death: "thanielBossDeath.gif",
      dead: "thanielBossDead.png",
    },
    sfx: {
      hurt: "thanielHurtSound",
      death: "thanielDeathSound",
      attack: "thanielBossAttackSound",
    },
    sfxAt: 0,
    hitAt: 1400,
    endAt: 1900,
    deathMs: 1300,
    wordsEs: {
      ARMADURA:
        "Thaniel: Tus ataques apenas me afectan; mi armadura desvia cualquier golpe debil. ¡Intenta atravesarla!",
      CORONA:
        "Thaniel: Nadie me entrego esta corona. La tome y no pienso devolvértela.",
      TRONO:
        "Thaniel: Ante ti se alza el asiento desde el que gobierno este reino. ¡Arrodíllate o caerás!",
      ESPADON:
        "Thaniel: Contempla la hoja que empuño. Ha sofocado rebeliones mucho mayores que tu insignificante cruzada.",
      LLAMA:
        "Thaniel: Una pequeña lengua de fuego puede devorar un reino entero. ¿Quieres que te lo demuestre?",
      BRASA:
        "Thaniel: La batalla parece apaciguada, pero una sola brasa puede reavivar el incendio.",
      CASTILLO:
        "Thaniel: Estos muros han resistido ejercitos y siglos. Tú no serás quien los derribe.",
      REINO:
        "Thaniel: Cada camino, cada aldea y cada alma bajo este estandarte pertenecen a mi reino.",
      GUARDIA:
        "Thaniel: Mis soldados se interponen entre tú y el trono. Tendrás que vencerlos primero.",
      ESTANDARTE:
        "Thaniel: Contempla mis colores, que ondean sobre el salon. Seguirán aquí cuando ya nadie te recuerde.",
    },
    words: {
      ARMOR:
        "Thaniel: Your attacks will have little effect on me; my armor turns aside every weak blow. Come, try to pierce it!",
      CROWN:
        "Thaniel: This crown was not given to me. I took it, and I will not surrender it to you.",
      THRONE:
        "Thaniel: You stand before the seat from which I command this kingdom. Kneel, or be cast down!",
      GREATSWORD:
        "Thaniel: Look upon the blade in my hand. It has ended rebellions greater than your little quest.",
      FLAME:
        "Thaniel: One small tongue of fire can become a kingdom-consuming force. Shall I show you?",
      EMBER:
        "Thaniel: The battle seems quiet now, but a single glowing coal can wake the fire again.",
      CASTLE:
        "Thaniel: These walls have withstood armies and ages. You will not be the one to bring them down.",
      KINGDOM:
        "Thaniel: Every road, every village, every soul beneath this banner belongs to my realm.",
      GUARD:
        "Thaniel: My soldiers stand between you and the throne. You will have to pass them first.",
      BANNER:
        "Thaniel: See my colors hanging above the hall. They will fly here long after you are forgotten.",
    },
  },
];

/* ---------------------------------------- ROUND 2 TO 5 ---------------------------------------- */
(function () {
  const V = (base, o) => Object.assign({}, HS.LEVELS[base], o);
  HS.LEVELS.push(
    {
      name: "Hexa the Spellbone",
      color: "#5fe6e0",
      victory: "ENEMY DEFEATED",
      arena: "death.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r2e1Ost",
      rate: 1,
      pitch: 1.1,
      anchor: "center",
      hurtFx: true,
      scale: 1.4,
      sprites: {
        idle: "r2e1Idle.gif",
        attack: "r2e1Attack.gif",
        hurt: "r2e1Idle.gif",
        death: "r2e1Death.gif",
        dead: "r2e1Dead.png",
      },
      sfx: {
        hurt: "skeletonHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 540,
      hitAt: 660,
      endAt: 1200,
      deathMs: 800,
      wordsEs: {
        FANTASMA:
          "Espíritu o aparición de una persona fallecida que vaga por el mundo.",
        CAPUCHA: "Prenda holgada que cubre la cabeza y los hombros.",
        CIAN: "Color azul verdoso y luminoso, como el de un mar tropical.",
        MALDICION:
          "Palabras mágicas que pretenden traer mala suerte a alguien.",
        MAGO: "Persona que practica la magia en cuentos y leyendas.",
        BASTON: "Palo largo que lleva un mago o un viajero.",
        HECHIZO:
          "Conjunto de palabras mágicas pronunciadas para lograr un efecto.",
      },
      words: {
        GHOST:
          "The spirit or apparition of a deceased person that wanders the world.",
        COWL: "A loose hood that covers the head and shoulders.",
        CYAN: "The bright blue-green color of a clear tropical sea.",
        HEX: "A spell meant to bring bad luck to someone.",
        MAGE: "A person who practices magic in stories and legends.",
        STAFF: "A long stick carried by a wizard or traveler.",
        SPELL: "A set of magic words meant to cause an effect.",
      },
    },
    {
      name: "Brutus the Boneblade",
      color: "#6fe0d8",
      victory: "ENEMY DEFEATED",
      arena: "mapR2e2.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r2e2Ost",
      rate: 1,
      pitch: 0.9,
      anchor: "center",
      hurtFx: true,
      scale: 1.4,
      sprites: {
        idle: "r2e2Idle.gif",
        attack: "r2e2Attack.gif",
        hurt: "r2e2Idle.gif",
        death: "r2e2Death.gif",
        dead: "r2e2Dead.png",
      },
      sfx: {
        hurt: "skeletonHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 480,
      hitAt: 600,
      endAt: 1100,
      deathMs: 1400,
      wordsEs: {
        LUCHADOR:
          "Persona entrenada para usar armas y enfrentarse a un enemigo.",
        ACERO:
          "Aleacion metalica muy resistente usada para fabricar armas y armaduras.",
        CASCO: "Pieza de armadura que protege la cabeza.",
        OXIDADO: "Dícese del hierro deteriorado por el aire y la humedad.",
        GUERRERO: "Persona que combate en batallas.",
        CADAVER: "Cuerpo de una persona que ha muerto.",
        MEDULA: "Tejido blando que se encuentra dentro de ciertos huesos.",
      },
      words: {
        FIGHTER: "Someone trained to use weapons and face an enemy.",
        STEEL: "A tough metal alloy used to make weapons and armor.",
        HELMET: "A piece of armor worn to protect the head.",
        RUSTED: "Describes iron damaged by air and moisture over time.",
        WARRIOR: "A person who fights in battles.",
        CORPSE: "A body that has died.",
        MARROW: "The soft tissue found inside certain bones.",
      },
    },
    {
      name: "Captain Marrow",
      color: "#4fd8d0",
      victory: "ENEMY DEFEATED",
      arena: "mortal.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r2e3Ost",
      rate: 1,
      pitch: 0.8,
      anchor: "center",
      hurtFx: true,
      scale: 1.2,
      sprites: {
        idle: "r2e3Idle.gif",
        attack: "r2e3Attack.gif",
        hurt: "r2e3Idle.gif",
        death: "r2e3Death.gif",
        dead: "r2e3Dead.png",
      },
      sfx: {
        hurt: "skeletonHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 1080,
      hitAt: 1200,
      endAt: 2100,
      deathMs: 1300,
      wordsEs: {
        ELITE:
          "Grupo reducido cuyos miembros han sido elegidos por su destreza excepcional.",
        CABALLERO: "Combatiente con armadura que sirve a un gobernante.",
        VETERANO: "Soldado con una larga experiencia en la guerra.",
        CAPITAN: "Oficial que dirige a un grupo de soldados.",
        ENCAPUCHADO: "Que lleva una tela cubriéndole la cabeza.",
        FILO: "Borde cortante de un arma blanca.",
        COMANDANTE: "Persona responsable de dirigir las tropas.",
      },
      words: {
        ELITE: "A small group chosen for exceptional skill.",
        KNIGHT: "An armored fighter who serves a ruler.",
        VETERAN: "A soldier with long experience in war.",
        CAPTAIN: "An officer who leads a group of soldiers.",
        HOODED: "Wearing a piece of cloth over the head.",
        EDGE: "The sharp cutting side of a weapon.",
        COMMANDER: "A person responsible for directing troops.",
      },
    },
    {
      name: "Akatosh, the Necromancer",
      color: "#c58bff",
      boss: true,
      unlock: "eye",
      victory: "BOSS DEFEATED!",
      arena: "mapBoss2.gif",
      ground: 8,
      arenaSmooth: true,
      music: "b2Ost",
      rate: 1,
      pitch: 0.9,
      anchor: "center",
      hurtFx: true,
      scale: 1.2,
      sprites: {
        idle: "b2Idle.gif",
        attack: "b2Attack.gif",
        hurt: "b2Idle.gif",
        death: "b2Death.gif",
        dead: "b2Dead.png",
      },
      sfx: {
        hurt: "thanielHurtSound",
        death: "thanielDeathSound",
        attack: "akatoshHit_sfx",
      },
      sfxAt: 60,
      hitAt: 960,
      endAt: 1700,
      deathMs: 1400,
      wordsEs: {
        NIGROMANTE:
          "Akatosh: Gobierno a los muertos y los someto a mi voluntad. ¿Qué nombre recibe alguien como yo?",
        TUMBA:
          "Akatosh: Mi cuerpo descansa bajo tierra, sellado en la oscuridad. Encuéntralo y podrás acabar conmigo.",
        RESUCITAR:
          "Akatosh: Puedo hacer que los restos fríos se alcen y vuelvan a moverse. Devolver el movimiento a los muertos es ___.",
        ATAUD:
          "Akatosh: Los antiguos reyes eran depositados en cajas de madera o piedra. ¿Cómo se llama tal recipiente?",
        CRANEO:
          "Akatosh: La carne desaparece, pero la calavera perdura sonriente. ¿Qué hueso protege el cerebro?",
        CATACUMBA:
          "Akatosh: Bajo esta fortaleza, pasadizos funerarios se internan en la tierra. A esos túneles se les llama ___.",
        MUERTOVIVIENTE:
          "Akatosh: No pertenezco ni a los vivos ni a los muertos. Dime, ¿qué soy?",
        ESQUELETO:
          "Akatosh: Mis sirvientes descarnados caminan sin carne ni músculos. ¿Qué son?",
        APARICION:
          "Akatosh: Un espíritu lleno de rencor persiste tras la muerte, atado a la oscuridad. Los vivos lo llaman ___.",
        CONVOCAR:
          "Akatosh: Pronuncia el rito y los muertos responderán. Llamar a un espíritu es ___.",
      },
      words: {
        NECROMANCER:
          "Akatosh: I command the dead and bind them to my will. What name is given to one such as me?",
        GRAVE:
          "Akatosh: My body rests deep in the earth, sealed in darkness. Find it, and you may end me.",
        REANIMATE:
          "Akatosh: I can make cold remains rise and move once more. To restore motion to the dead is to ___.",
        COFFIN:
          "Akatosh: The kings of old were laid in boxes of wood or stone. What do you call such a container?",
        SKULL:
          "Akatosh: Flesh fades away, but the bone remains. What bone protects the brain?",
        CATACOMB:
          "Akatosh: Beneath this keep, burial passages twist through the earth. Such tunnels are called a ___.",
        UNDEAD:
          "Akatosh: I belong to neither the living nor the dead. Tell me, what am I?",
        SKELETON:
          "Akatosh: My fleshless servants march without muscle or skin. What are they?",
        WRAITH:
          "Akatosh: A hateful spirit lingers after death, bound to the dark. The living call it a ___.",
        SUMMON:
          "Akatosh: Speak the rite, and the dead will answer. To call a spirit forth is to ___.",
      },
    },
    {
      name: "Chainwick the Binder",
      color: "#58d8c8",
      victory: "ENEMY DEFEATED",
      arena: "mapR3e1.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r3e1Ost",
      rate: 1,
      pitch: 1.0,
      anchor: "center",
      hurtFx: true,
      scale: 1.2,
      sprites: {
        idle: "r3e1Idle.gif",
        attack: "r3e1Attack.gif",
        hurt: "r3e1Idle.gif",
        death: "r3e1Death.gif",
        dead: "r3e1Dead.png",
      },
      sfx: {
        hurt: "purpleShadowHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 605,
      hitAt: 725,
      endAt: 2200,
      deathMs: 2100,
      wordsEs: {
        CADENA: "Serie de anillas metálicas unidas entre sí.",
        ESLABON: "Cada una de las anillas que forman una cadena.",
        GRILLETE: "Aro metálico que sujeta la muñeca de un prisionero.",
        SUJECION: "Cadena o atadura que limita el movimiento.",
        ATAR: "Sujetar algo con una cuerda o una ligadura.",
        PRISION: "Lugar donde se encierra a personas contra su voluntad.",
        RETENER: "Impedir que alguien o algo se mueva libremente.",
      },
      words: {
        CHAIN: "A series of metal rings joined together.",
        LINK: "One connected ring in a chain.",
        SHACKLE: "A metal cuff used to restrain a prisoner's wrist.",
        FETTER: "A chain or restraint that limits movement.",
        BIND: "To tie or fasten something securely.",
        PRISON: "A place where people are held against their will.",
        RESTRAIN: "To prevent someone or something from moving freely.",
      },
    },
    {
      name: "Ferrum, the Iron Golem",
      color: "#a8b8cc",
      victory: "ENEMY DEFEATED",
      arena: "mapR3e2.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r3e2Ost",
      rate: 1,
      pitch: 0.65,
      anchor: "center",
      hurtFx: true,
      scale: 1.6,
      sprites: {
        idle: "r3e2Idle.gif",
        attack: "r3e2Attack.gif",
        hurt: "r3e2Idle.gif",
        death: "r3e2Death.gif",
        dead: "r3e2Dead.png",
      },
      sfx: {
        hurt: "metalHurt_sfx",
        death: "metalDeath_sfx",
        attack: "attackSound",
      },
      sfxAt: 1140,
      hitAt: 1260,
      endAt: 2200,
      deathMs: 1600,
      wordsEs: {
        HIERRO:
          "Metal gris y resistente con el que se fabrican herramientas y armas.",
        GOLEM: "Criatura de piedra o arcilla a la que la magia ha dado vida.",
        HACHA: "Herramienta con una cabeza pesada y un filo cortante.",
        FORJA: "Taller donde se calienta y moldea el metal.",
        YUNQUE: "Bloque metálico pesado que usa el herrero.",
        OXIDO: "Capa rojiza que aparece en el hierro húmedo.",
        CONSTRUCTO: "Ser construido deliberadamente en vez de nacer.",
      },
      words: {
        IRON: "A strong gray metal used to make tools and weapons.",
        GOLEM:
          "A creature made from stone or clay and brought to life by magic.",
        AXE: "A tool with a heavy head and a sharp edge.",
        FORGE: "A workshop where metal is heated and shaped.",
        ANVIL: "A heavy metal block used by a blacksmith.",
        RUST: "The reddish coating that forms on damp iron.",
        CONSTRUCT: "Something deliberately built rather than born.",
      },
    },
    {
      name: "Gorrak the Risen",
      color: "#b9a2e0",
      victory: "ENEMY DEFEATED",
      arena: "zombie.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r3e3Ost",
      rate: 1,
      pitch: 0.55,
      anchor: "center",
      hurtFx: true,
      scale: 1.2,
      sprites: {
        idle: "r3e3Idle.gif",
        attack: "r3e3Attack.gif",
        hurt: "r3e3Idle.gif",
        death: "r3e3Death.gif",
        dead: "r3e3Dead.png",
      },
      sfx: {
        hurt: "thanielHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 480,
      hitAt: 600,
      endAt: 2100,
      deathMs: 1800,
      wordsEs: {
        ZOMBI: "Cadáver que ha vuelto para caminar entre los vivos.",
        PUTREFACTO: "Que se descompone lentamente, como la carne vieja.",
        HORDA: "Multitud numerosa y desordenada que avanza unida.",
        CEMENTERIO: "Lugar donde se entierra a los muertos.",
        CADAVER: "Cuerpo de una persona o animal que ha muerto.",
        DESCOMPONERSE:
          "Proceso gradual por el que un organismo muerto se degrada.",
        EPIDEMIA: "Enfermedad que se propaga ampliamente y causa gran daño.",
      },
      words: {
        ZOMBIE: "A dead body that has returned to walk among the living.",
        ROTTING: "Decaying slowly, as old flesh does.",
        HORDE: "A large, unruly crowd moving together.",
        GRAVEYARD: "A place where the dead are buried.",
        CORPSE: "The body of a person or animal that has died.",
        DECAY: "The gradual breaking down of something dead.",
        PLAGUE: "A disease that spreads widely and causes great harm.",
      },
    },
    {
      name: "Ashgor, the Molten Tyrant",
      color: "#ff8a3a",
      boss: true,
      victory: "BOSS DEFEATED!",
      arena: "mapBoss3.gif",
      ground: 8,
      arenaSmooth: true,
      music: "b3Ost",
      rate: 1,
      pitch: 0.75,
      anchor: "center",
      hurtFx: true,
      scale: 1.4,
      sprites: {
        idle: "b3Idle.gif",
        attack: "b3Attack.gif",
        hurt: "b3Idle.gif",
        death: "b3Death.gif",
        dead: "b3Dead.png",
      },
      sfx: {
        hurt: "thanielHurtSound",
        death: "thanielDeathSound",
        attack: "thanielBossAttackSound",
      },
      sfxAt: 780,
      hitAt: 900,
      endAt: 1600,
      deathMs: 2200,
      wordsEs: {
        ERUPCION:
          "Ashgor: La montaña se abre y arroja fuego al cielo. ¿Cómo se llama tal fenómeno?",
        OBSIDIANA:
          "Ashgor: Mi hoja oscura nació cuando la lava se enfrió y se convirtió en vidrio volcánico.",
        CALDERA:
          "Ashgor: Cuando un volcán se hunde, deja un enorme cráter en forma de cuenco. Nombra ese hueco.",
        INCINERAR:
          "Ashgor: Quemaré tu estandarte hasta que solo queden cenizas. Destruir con fuego es ___.",
        TITAN:
          "Ashgor: Me alzo sobre el campo de batalla, inmenso como los dioses antiguos. Llámame ___.",
        MAGMA:
          "Ashgor: Bajo tus pies, la roca fundida aguarda en las entrañas de la tierra. ¿Cómo se llama antes de salir a la superficie?",
        VOLCAN:
          "Ashgor: Me elevo sobre la tierra y derramo fuego desde la cumbre. ¿Qué montaña soy?",
        FUNDIDO:
          "Ashgor: El calor ha vuelto líquido este metal. Ahora está ___.",
        HUMO: "Ashgor: De todo fuego se eleva una nube oscura que se enrosca sobre el campo de batalla.",
      },
      words: {
        ERUPTION:
          "Ashgor: The mountain bursts open and throws fire into the sky. What is such an event called?",
        OBSIDIAN:
          "Ashgor: My dark blade was born when fire cooled into black volcanic glass.",
        CALDERA:
          "Ashgor: When a volcano collapses, it leaves a vast bowl-shaped crater behind. Name that hollow.",
        INCINERATE:
          "Ashgor: I will burn your banner until nothing remains but ash. To destroy by fire is to ___.",
        TITAN:
          "Ashgor: I tower above the battlefield, vast as the ancient gods. Call me a ___.",
        MAGMA:
          "Ashgor: Deep beneath your feet, molten rock waits inside the earth. What is it called before it reaches the surface?",
        VOLCANO:
          "Ashgor: I rise above the land and pour fire from my summit. What mountain am I?",
        MOLTEN:
          "Ashgor: The heat has made this metal flow like liquid. It is now ___.",
        SMOKE:
          "Ashgor: A dark cloud rises from every fire and curls above the battlefield.",
      },
    },
    {
      name: "Pallor, the White Beast",
      nameEs: "Pallor, la bestia blanca",
      color: "#d9c4b0",
      victory: "ENEMY DEFEATED",
      arena: "beast.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r4e1Ost",
      rate: 1,
      pitch: 0.45,
      anchor: "center",
      hurtFx: true,
      scale: 1.3,
      sprites: {
        idle: "r4e1Idle.gif",
        attack: "r4e1Attack.gif",
        hurt: "r4e1Idle.gif",
        death: "r4e1Death.gif",
        dead: "r4e1Dead.png",
      },
      sfx: {
        hurt: "beastHurt_sfx",
        death: "seraphielHurt_sfx",
        attack: "attackSound",
      },
      sfxAt: 150,
      hitAt: 270,
      endAt: 1000,
      deathMs: 1300,
      wordsEs: {
        BESTIA: "Animal grande y peligroso que vive en estado salvaje.",
        PALIDO: "Que tiene muy poco color, casi como la nieve del invierno.",
        COLMILLOS:
          "Dientes largos y puntiagudos que sirven para morder y sujetar a la presa.",
        DEPREDADOR: "Animal que caza a otros animales para alimentarse.",
        HAMBRIENTO:
          "Que necesita alimento; el ansia que empuja al cazador a buscar presa.",
        ACECHAR: "Avanzar en silencio mientras se busca una presa.",
        GARRA: "Uña afilada y curva de la pata de un animal.",
      },
      words: {
        BEAST: "A large, dangerous animal that lives in the wild.",
        PALE: "Having very little color, almost like winter snow.",
        FANGS: "Long, pointed teeth used to bite and hold prey.",
        PREDATOR: "An animal that hunts other animals for food.",
        HUNGRY: "Needing food; the feeling that sends a hunter searching.",
        PROWL: "To move quietly while looking for prey.",
        CLAW: "A sharp, curved nail on an animal's paw.",
      },
    },
    {
      name: "Cinderwyrm the Fire Worm",
      nameEs: "Cinderwyrm, el gusano de fuego",
      color: "#ff8a3a",
      victory: "ENEMY DEFEATED",
      arena: "fire_town.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r4e2Ost",
      rate: 1,
      pitch: 0.6,
      anchor: "center",
      hurtFx: true,
      scale: 1.2,
      sprites: {
        idle: "r4e2Idle.gif",
        attack: "r4e2Attack.gif",
        hurt: "r4e2Idle.gif",
        death: "r4e2Death.gif",
        dead: "r4e2Dead.png",
      },
      sfx: {
        hurt: "beastHurt_sfx",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 900,
      hitAt: 1020,
      endAt: 1800,
      deathMs: 1400,
      wordsEs: {
        SERPIENTE:
          "Reptil largo y sinuoso, a menudo representado custodiando tesoros antiguos.",
        LLAMARADA: "Fuego brillante y poderoso que arde sin control.",
        ABRASAR: "Quemar la superficie de algo con un calor intenso.",
        MADRIGUERA: "Túnel que un animal excava bajo tierra.",
        INFERNAL: "Que pertenece a un fuego inmenso y devastador.",
        ENROSCAR:
          "Enrollarse formando un anillo o una espiral, como una serpiente al descansar.",
        BRASA: "Pequeño resto de madera o carbón parcialmente quemado.",
      },
      words: {
        SERPENT:
          "A long, winding snake, often shown guarding ancient treasure.",
        BLAZE: "A bright, powerful fire burning out of control.",
        SCORCH: "To burn the surface of something with great heat.",
        BURROW: "A tunnel an animal digs beneath the ground.",
        INFERNO: "A vast, raging fire that is hard to escape.",
        COIL: "To curl into a ring or spiral, like a resting serpent.",
        CINDER: "A small piece of partly burned wood or coal.",
      },
    },
    {
      name: "Ignis the Ember Mage",
      nameEs: "Ignis, el mago de las brasas",
      color: "#ff4a4a",
      victory: "ENEMY DEFEATED",
      arena: "mapR4e3.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r4e3Ost",
      rate: 1,
      pitch: 1.2,
      anchor: "center",
      hurtFx: true,
      scale: 1.2,
      sprites: {
        idle: "r4e3Idle.gif",
        attack: "r4e3Attack.gif",
        hurt: "r4e3Idle.gif",
        death: "r4e3Death.gif",
        dead: "nothing.png",
      },
      sfx: {
        hurt: "purpleShadowHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 660,
      hitAt: 780,
      endAt: 1400,
      deathMs: 1400,
      wordsEs: {
        DESTELLO: "Explosión repentina de luz brillante o de llamas.",
        PIRA: "Montón de madera preparada para una hoguera ceremonial.",
        TITILAR: "Arder con una luz inestable y vacilante.",
        BRUJO: "Hombre que practica la magia oscura en los relatos antiguos.",
        CARMESI: "Tono de rojo intenso y profundo.",
        VARITA: "Vara delgada que usa un mago para lanzar hechizos.",
        ENCENDER: "Prender fuego a madera seca o a yesca.",
      },
      words: {
        FLARE: "A sudden burst of bright light or flame.",
        PYRE: "A pile of wood prepared for a ceremonial fire.",
        FLICKER: "To burn with an unsteady, wavering light.",
        WARLOCK: "A man who practices dark magic in old tales.",
        CRIMSON: "A deep, rich shade of red.",
        WAND: "A slender rod used by a magician to cast spells.",
        KINDLE: "To start a fire by lighting dry wood or tinder.",
      },
    },
    {
      name: "Voltan, Lord of Lightning",
      nameEs: "Voltan, señor del relámpago",
      color: "#6fe8ff",
      boss: true,
      victory: "BOSS DEFEATED!",
      arena: "mapBoss4.gif",
      ground: 8,
      arenaSmooth: true,
      music: "b4Ost",
      rate: 1,
      pitch: 1.0,
      anchor: "center",
      hurtFx: true,
      sprites: {
        idle: "b4Idle.gif",
        attack: "b4Attack.gif",
        hurt: "b4Idle.gif",
        death: "b4Death.gif",
        dead: "b4Dead.png",
      },
      sfx: {
        hurt: "thanielHurtSound",
        death: "thanielDeathSound",
        attack: "electricStrike",
      },
      sfxAt: 100,
      hitAt: 1320,
      endAt: 2300,
      deathMs: 1400,
      wordsEs: {
        FULGURITA:
          "Voltan: El rayo golpea la arena y deja enterrados tubos de aspecto vítreo.",
        CONDUCTOR:
          "Voltan: El cobre permite que mi corriente circule. Un material que transporta electricidad es un ___.",
        SOBRECARGAR:
          "Voltan: Si haces pasar demasiada energía por un aparato, lo ___.",
        CIRCUITO:
          "Voltan: Mi poder recorre un camino cerrado entre cables y componentes. Ese camino es un ___.",
        VOLTAJE:
          "Voltan: Esta magnitud indica con qué fuerza se impulsa la electricidad por un circuito.",
        TRUENO:
          "Voltan: Después de que mi rayo rasgue las nubes, el cielo responde con un poderoso ___.",
        VOLTAICO:
          "Voltan: Aquello producido por una acción química o eléctrica puede llamarse ___.",
        RELAMPAGO:
          "Voltan: Destello eléctrico brillante que salta entre las nubes y la tierra.",
        CORRIENTE:
          "Voltan: Flujo constante de carga eléctrica a través de un cable.",
        CATASTROFE:
          "Voltan: Cuando mi tormenta destruye todo a su paso, el resultado es un gran desastre.",
      },
      words: {
        FULGURITE:
          "Voltan: Lightning strikes sand and leaves glassy tubes buried beneath it.",
        CONDUCTOR:
          "Voltan: Copper lets my current travel through it. A material that carries electricity is a ___.",
        OVERCHARGE:
          "Voltan: Pour too much power into a device, and you ___ it.",
        CIRCUIT:
          "Voltan: My power follows a closed path through wires and parts. That path is a ___.",
        VOLTAGE:
          "Voltan: This measure tells you how strongly electricity is pushed through a circuit.",
        THUNDER:
          "Voltan: After my lightning splits the clouds, the sky answers with a mighty ___.",
        VOLTAIC:
          "Voltan: Anything produced by chemical or electric action may be called ___.",
        LIGHTNING:
          "Voltan: A brilliant electric flash that leaps between cloud and earth.",
        CURRENT: "Voltan: The steady flow of electric charge through a wire.",
        CATASTROPHE:
          "Voltan: When my storm destroys everything in its path, the result is a great disaster.",
      },
    },
    {
      name: "Nyx, the Dark Elf Assassin",
      nameEs: "Nyx, la asesina elfa oscura",
      color: "#ff6a6a",
      victory: "ENEMY DEFEATED",
      arena: "mapR5e1.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r5e1Ost",
      rate: 1,
      pitch: 1.25,
      anchor: "center",
      hurtFx: true,
      sprites: {
        idle: "r5e1Idle.gif",
        attack: "r5e1Attack.gif",
        hurt: "r5e1Idle.gif",
        death: "r5e1Death.gif",
        dead: "r5e1Dead.png",
      },
      sfx: {
        hurt: "purpleShadowHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 880,
      hitAt: 1000,
      endAt: 2020,
      deathMs: 1600,
      wordsEs: {
        ASESINO: "Persona contratada para matar a alguien en secreto.",
        DAGA: "Cuchillo corto con una hoja puntiaguda.",
        EMBOSCADA: "Ataque repentino lanzado desde un escondite.",
        SILENCIOSO: "Que se mueve haciendo poco o ningún ruido.",
        CONTRATO: "Acuerdo escrito que establece una tarea o un trato.",
        VENENO: "Sustancia que puede herir o matar al entrar en el cuerpo.",
      },
      words: {
        ASSASSIN: "A hired killer who works in secret.",
        DAGGER: "A short knife with a pointed blade.",
        AMBUSH: "A sudden attack launched from a hidden position.",
        SILENT: "Making little or no sound while moving.",
        CONTRACT: "A written agreement that sets out a task or deal.",
        POISON: "A substance that can injure or kill when it enters the body.",
      },
    },
    {
      name: "Ghast the Gloomwing",
      nameEs: "Ghast, el ala sombría",
      color: "#66e04a",
      victory: "ENEMY DEFEATED",
      arena: "destroyed_dojo.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r5e2Ost",
      rate: 1,
      pitch: 0.6,
      anchor: "center",
      hurtFx: true,
      scale: 1.3,
      sprites: {
        idle: "r5e2Idle.gif",
        attack: "r5e2Attack.gif",
        hurt: "r5e2Idle.gif",
        death: "r5e2Death.gif",
        dead: "r5e2Dead.png",
      },
      sfx: {
        hurt: "beastHurt_sfx",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 160,
      hitAt: 280,
      endAt: 820,
      deathMs: 880,
      wordsEs: {
        MEMBRANA:
          "Piel delgada y flexible que une los dedos de criaturas aladas como murciélagos.",
        GARGOLA:
          "Criatura de piedra tallada, a menudo encaramada en lo alto de un edificio.",
        ARPON:
          "Arma o gancho de punta afilada empleado para la caza y el combate.",
        TENTACULO:
          "Apéndice carnoso y flexible que usan ciertas criaturas marinas para atrapar presas.",
        TOXICO:
          "Sustancia nociva capaz de provocar daños graves o la muerte al ser absorbida.",
        ABISMO: "Fosa marina profunda y oscura donde no llega la luz del sol.",
        MAREA: "Movimiento periódico de ascenso y descenso del agua del mar.",
      },
      words: {
        MEMBRANE:
          "A thin, flexible skin stretched between the digits of winged creatures like bats.",
        GARGOYLE: "A carved stone creature often perched high on a building.",
        HARPOON: "A sharp-pointed weapon or hook used for hunting and combat.",
        TENTACLE:
          "A flexible, muscular limb used by certain sea creatures to grab prey.",
        TOXIC:
          "A harmful substance capable of causing severe damage or death when absorbed.",
        ABYSS: "A deep, dark oceanic trench where sunlight never reaches.",
        TIDE: "The periodic rising and falling movement of the sea.",
      },
    },
    {
      name: "Kaelen, the Fallen Stormhero",
      nameEs: "Kaelen, héroe caído de la tormenta",
      color: "#b78bff",
      victory: "ENEMY DEFEATED",
      arena: "mapR5e3.gif",
      ground: 8,
      arenaSmooth: true,
      music: "r5e3Ost",
      rate: 1,
      pitch: 1.2,
      anchor: "center",
      hurtFx: true,
      scale: 1.2,
      sprites: {
        idle: "r5e3Idle.gif",
        attack: "r5e3Idle.gif",
        hurt: "r5e3Idle.gif",
        death: "r5e3Idle.gif",
        dead: "nothing.png",
      },
      sfx: {
        hurt: "thanielHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      cssPose: true,
      sfxAt: 150,
      hitAt: 350,
      endAt: 700,
      deathMs: 1200,
      wordsEs: {
        CAMPEON:
          "Persona que lucha por una causa o consigue un título mediante la victoria.",
        CAIDO:
          "Que ha descendido desde un lugar elevado o ha perdido su antigua posición.",
        ANTIHEROE:
          "Protagonista que carece de las cualidades heroicas habituales.",
        RELAMPAGO:
          "Destello de un rayo acompañado por el estruendo del trueno.",
        TEMPESTUOSO:
          "Caracterizado por tormentas violentas o una agitación constante.",
        ANTIGUO: "Que pertenece a una época muy lejana de la historia.",
        LEYENDA: "Relato célebre sobre una persona o un suceso extraordinario.",
      },
      words: {
        CHAMPION:
          "A person who fights for a cause or holds a title through victory.",
        FALLEN: "Having dropped from a higher place or former position.",
        ANTIHERO: "A main character who lacks the usual heroic qualities.",
        THUNDERBOLT: "A flash of lightning accompanied by a crash of thunder.",
        TEMPESTUOUS: "Marked by violent storms or restless turbulence.",
        ANCIENT: "Belonging to a very distant time in history.",
        LEGEND: "A famous story about a remarkable person or event.",
      },
    },
    {
      name: "Garabel, the Mecha Angel",
      nameEs: "Garabel, el ángel mecánico",
      color: "#9fd8e8",
      boss: true,
      victory: "BOSS DEFEATED!",
      arena: "factory.gif",
      ground: 8,
      arenaSmooth: true,
      music: "b5Ost",
      rate: 1,
      pitch: 1.2,
      anchor: "center",
      hurtFx: true,
      scale: 1.2,
      sprites: {
        idle: "b5Idle.gif",
        attack: "b5Idle.gif",
        hurt: "b5Idle.gif",
        death: "b5Idle.gif",
        dead: "nothing.png",
      },
      sfx: {
        hurt: "thanielHurtSound",
        death: "thanielDeathSound",
        attack: "electricStrike",
      },
      cssPose: true,
      sfxAt: 100,
      hitAt: 350,
      endAt: 700,
      deathMs: 1200,
      cssBob: true,
      wordsEs: {
        CIBERNETICO:
          "Garabel: Mis partes vivas y mis sistemas mecánicos funcionan como uno solo. Esa unión se llama ___.",
        SERVOMOTOR:
          "Garabel: Este motor ajusta mis articulaciones con precisión cada vez que me muevo.",
        HIDRAULICO:
          "Garabel: Un líquido a presión impulsa la fuerza de mis extremidades. Ese tipo de energía es ___.",
        NEUMATICA:
          "Garabel: Mis alas funcionan con aire comprimido. La ciencia de los sistemas impulsados por aire es la ___.",
        GIROSCOPIO:
          "Garabel: Este dispositivo giratorio estabiliza mi vuelo y me ayuda a mantener el equilibrio.",
        SOBRECARGAR:
          "Garabel: Puedo forzar un procesador para que supere su velocidad normal. Hacerlo es ___.",
        TITANIO:
          "Garabel: Mi caparazón está hecho de un metal resistente y ligero que se usa en máquinas y aeronaves.",
        ACTUADOR:
          "Garabel: Este componente transforma la energía en movimiento en una de mis articulaciones mecánicas.",
        ARTIFICIAL:
          "Garabel: Fui fabricado, no nací. Otra palabra para algo hecho por personas es ___.",
        ALEACION:
          "Garabel: Mi armazón combina metales para ganar resistencia sin peso innecesario. Esa mezcla es una ___.",
      },
      words: {
        CYBERNETIC:
          "Garabel: My living parts and machine systems work as one. That union is called ___.",
        SERVOMOTOR:
          "Garabel: This motor adjusts my joints with careful control whenever I move.",
        HYDRAULIC:
          "Garabel: Pressurized liquid drives the strength in my limbs. Such power is ___.",
        PNEUMATICS:
          "Garabel: My wings use compressed air to move. The science of air-powered systems is ___.",
        GYROSCOPE:
          "Garabel: This spinning device keeps my flight steady and helps me remain balanced.",
        OVERCLOCK:
          "Garabel: I can push a processor beyond its normal speed. To do so is to ___.",
        TITANIUM:
          "Garabel: My shell is made from a strong, light metal used in machines and aircraft.",
        ACTUATOR:
          "Garabel: This component turns energy into movement in one of my mechanical joints.",
        ARTIFICIAL:
          "Garabel: I was made by craft, not born. Another word for made by people is ___.",
        ALLOY:
          "Garabel: My frame combines metals to gain strength without needless weight. That mixture is an ___.",
      },
    },
  );

  /* ---------------------------------------- ROUND 6 TO 8 ---------------------------------------- */
  HS.LEVELS.push(
    {
      name: "Earthbound Sentinel",
      nameEs: "Centinela de la tierra",
      color: "#8acb85",
      victory: "ENEMY DEFEATED",
      arena: "brown.gif",
      ground: 9,
      arenaSmooth: true,
      music: "monk",
      rate: 1,
      pitch: 1,
      anchor: "center",
      hurtFx: true,
      scale: 1.4,
      sprites: {
        idle: "newRound1/earthHero_idle.gif",
        attack: "newRound1/earthHero_attack.gif",
        hurt: "newRound1/earthHero_idle.gif",
        death: "newRound1/earthHero_death.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "thanielHurtSound",
        death: "thanielDeathSound",
        attack: "dodge_sfx",
      },
      sfxAt: 180,
      hitAt: 350,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        TEMBLOR: "Sacudida pequeña y repetida del suelo.",
        GRANITO: "Roca dura y moteada que suele utilizarse en edificios.",
        MEDITACION:
          "Práctica de concentración y reflexión en silencio para alcanzar la paz mental.",
        MONASTERIO:
          "Edificio donde viven y practican su disciplina los miembros de una orden religiosa.",
        TERREMOTO: "Sacudida repentina de la superficie terrestre.",
        PEDRUSCO: "Fragmento de roca de tamaño muy grande.",
        FISURA: "Grieta estrecha y profunda en la tierra o en una roca.",
      },
      words: {
        TREMOR: "A small, repeated shaking of the ground.",
        GRANITE: "A hard, speckled rock often used in buildings.",
        MEDITATION:
          "The practice of silent concentration to achieve mental peace.",
        MONASTERY:
          "A building where members of a religious order live and practice their discipline.",
        QUAKE: "A sudden shaking of the earth's surface.",
        BOULDER: "A very large piece of rock.",
        FISSURE: "A narrow, deep crack in the earth or rock.",
      },
    },
    {
      name: "Leafblade Guardian",
      nameEs: "Guardián de la hoja",
      color: "#0dda33",
      victory: "ENEMY DEFEATED",
      arena: "leaf_girl.gif",
      ground: 9,
      arenaSmooth: true,
      music: "leaf",
      rate: 1,
      pitch: 1,
      anchor: "center",
      hurtFx: true,
      scale: 0.5,
      sprites: {
        idle: "newRound1/leafHero_idle.gif",
        attack: "newRound1/leafHero_attack.gif",
        hurt: "newRound1/leafHero_idle.gif",
        death: "newRound1/leafHero_death.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "leafArrowHurtSound",
        death: "leafArrowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 180,
      hitAt: 350,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        DOSEL:
          "Techo de hojas formado por las copas de los árboles del bosque.",
        FRONDOSO: "Cubierto de plantas verdes, frías y sanas.",
        ZARZA: "Planta silvestre llena de espinas afiladas y enredadas.",
        NATURALEZA: "Zona natural salvaje con pocos pueblos o caminos.",
        BROTE: "Tallo o renuevo joven que comienza a desarrollar hojas.",
        FOLLAJE: "Conjunto de hojas y partes verdes de las plantas.",
        ENREDADERA: "Planta trepadora de tallo largo y delgado.",
      },
      words: {
        CANOPY: "The leafy roof formed by the tops of forest trees.",
        VERDANT: "Covered with healthy green plants.",
        BRAMBLE: "A wild prickly bush with sharp, tangled thorns.",
        WILDERNESS: "A wild natural area with few towns or roads.",
        SAPLING: "A young tree that has not grown tall yet.",
        FOLIAGE: "The leaves and green parts of plants.",
        VINE: "A climbing plant with a long, thin stem.",
      },
    },
    {
      name: "Windborne Warden",
      nameEs: "Guardián del viento",
      color: "#fe9206",
      victory: "ENEMY DEFEATED",
      arena: "desert.gif",
      ground: 9,
      arenaSmooth: true,
      music: "desert",
      rate: 1,
      pitch: 1.1,
      anchor: "center",
      hurtFx: true,
      sprites: {
        idle: "newRound1/windHero_idle.gif",
        attack: "newRound1/windHero_attack.gif",
        hurt: "newRound1/windHero_idle.gif",
        death: "newRound1/windHero_death.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "thanielHurtSound",
        death: "a",
        attack: "attackSound",
      },
      sfxAt: 180,
      hitAt: 350,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        TEMPORAL: "Tormenta violenta acompañada de fuertes vientos.",
        REMOLINO: "Movimiento rápido y giratorio del aire.",
        CEFIRO: "Brisa ligera y suave.",
        SIROCO: "Viento cálido y seco que sopla desde el desierto.",
        RAFAGA: "Soplido de viento breve y repentino.",
        CICLON: "Gran tormenta que gira alrededor de un centro.",
        DUNA: "Colina de arena moldeada por el viento.",
      },
      words: {
        TEMPEST: "A violent storm with strong winds.",
        WHIRLWIND: "A fast-spinning movement of air.",
        ZEPHYR: "A light, gentle breeze.",
        SIROCCO: "A hot, dry wind that blows from the desert.",
        GUST: "A brief, sudden burst of wind.",
        CYCLONE: "A large storm that spins around a center.",
        DUNE: "A hill of sand shaped by the wind.",
      },
    },
    {
      name: "Elsa, the frozen witch",
      nameEs: "Elsa, la bruja de hielo",
      victoryEs: "¡JEFE DERROTADO!",
      color: "#9ce8ff",
      boss: true,
      unlock: "freeze",
      victory: "BOSS DEFEATED!",
      arena: "women_arena.gif",
      ground: 9,
      arenaSmooth: true,
      music: "water",
      rate: 1,
      pitch: 0.9,
      anchor: "center",
      hurtFx: true,
      scale: 1.3,
      sprites: {
        idle: "newRound1/iceWitch_idle.gif",
        attack: "newRound1/iceWitch_attack.gif",
        hurt: "newRound1/iceWitch_idle.gif",
        death: "newRound1/iceWitch_death.gif",
        dead: "nothing.png",
      },
      sfx: {
        hurt: "leafArrowHurtSound",
        death: "leafArrowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 180,
      hitAt: 350,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        PERMAHIELO:
          "Elsa: Bajo esta nieve, el suelo permanece congelado año tras año.",
        VENTISCA:
          "Elsa: Cuando el viento arrastra la nieve con tanta fuerza que apenas se ve, hay una ___.",
        GLACIAR:
          "Elsa: Este inmenso río de hielo desciende lentamente por la montaña.",
        ESCARCHA:
          "Elsa: Delicados cristales blancos cubren las ramas cuando el aire está frío y húmedo.",
        HIPOTERMIA:
          "Elsa: Si permaneces demasiado tiempo en este frío, tu cuerpo pierde calor hasta quedar peligrosamente débil.",
        CENCELLADA:
          "Elsa: Gotas congeladas cubren la piedra con una fina capa de hielo.",
        AVALANCHA:
          "Elsa: Una ladera entera se desprende y se precipita montaña abajo.",
        HELADA:
          "Elsa: Una fina capa blanca de hielo se forma sobre las superficies durante una noche fría.",
        DESCONGELARSE:
          "Elsa: Cuando vuelve el calor, el hielo empieza a fundirse. El suelo congelado comienza a ___.",
      },
      words: {
        PERMAFROST:
          "Elsa: Beneath this snow, the ground remains frozen year after year.",
        BLIZZARD:
          "Elsa: When wind drives snow so fiercely that you can scarcely see, it is a ___.",
        GLACIER:
          "Elsa: This vast river of ice creeps slowly down the mountain.",
        HOARFROST:
          "Elsa: Delicate white ice gathers on branches when the air is cold and damp.",
        HYPOTHERMIA:
          "Elsa: Stay in this cold too long, and your body loses heat until it becomes dangerously weak.",
        RIME: "Elsa: Frozen droplets coat the stone in a thin layer of ice.",
        AVALANCHE:
          "Elsa: A whole slope of snow breaks loose and rushes down the mountain.",
        FROST:
          "Elsa: A thin white layer of ice forms on surfaces during a cold night.",
        THAW: "Elsa: When warmth returns, the ice begins to melt. The frozen ground will ___.",
      },
    },
    {
      name: "The Scribe",
      nameEs: "El escriba",
      color: "#b7a4dc",
      victory: "ENEMY DEFEATED",
      arena: "purple_temp.gif",
      ground: 9,
      arenaSmooth: true,
      music: "scribe",
      rate: 1,
      pitch: 1,
      anchor: "center",
      hurtFx: true,
      scale: 0.7,
      sprites: {
        idle: "newRound2/scribeEnemy_idle.gif",
        attack: "newRound2/scribeEnemy_attack.gif",
        hurt: "newRound2/scribeEnemy_idle.gif",
        death: "newRound2/scribeEnemy_death.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "skeletonHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 180,
      hitAt: 350,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        ARCHIVO: "Lugar donde se reúnen y conservan documentos importantes.",
        PERGAMINO:
          "Superficie para escribir fabricada con piel animal tratada.",
        PALIMPSESTO:
          "Página reutilizada tras raspar el texto que contenía antes.",
        CALIGRAFIA:
          "Arte de escribir letras con cuidado y de forma decorativa.",
        CRONICA: "Relato escrito de sucesos ordenados según ocurrieron.",
        CODICE: "Libro manuscrito anterior a la invención de la imprenta.",
        PLUMILLA: "Pluma de ave que antiguamente se utilizaba para escribir.",
      },
      words: {
        ARCHIVE: "A place where important records are collected and kept.",
        PARCHMENT: "A writing surface made from treated animal skin.",
        PALIMPSEST: "A page reused after its earlier writing was scraped away.",
        CALLIGRAPHY:
          "The art of writing letters in a careful, decorative style.",
        CHRONICLE:
          "A written account of events arranged in the order they happened.",
        CODEX: "An ancient manuscript text in book form.",
        QUILL: "A feather once used as a pen for writing.",
      },
    },
    {
      name: "The Toxic Form",
      nameEs: "La forma tóxica",
      color: "#7dff00",
      fx: "hue-rotate(200deg) saturate(1.5) brightness(1.05)",
      victory: "ENEMY DEFEATED",
      arena: "forestGameArea.gif",
      ground: 17,
      arenaSmooth: true,
      music: "toxic",
      rate: 1,
      pitch: 0.85,
      anchor: "center",
      hurtFx: true,
      scale: 1.1,
      cssPose: true,
      cssPoseVariant: "toxic-mud",
      sprites: {
        idle: "newRound2/toxic_one.gif",
        attack: "newRound2/toxic_one.gif",
        hurt: "newRound2/toxic_one.gif",
        death: "newRound2/toxic_one.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "beastHurt_sfx",
        death: "beastHurt_sfx",
        attack: "attackSound",
      },
      sfxAt: 150,
      hitAt: 350,
      endAt: 700,
      deathMs: 1200,
      wordsEs: {
        CORROSION: "Desgaste gradual del metal o de la piedra.",
        MIASMA: "Nube de aire fétido que se eleva desde un suelo húmedo.",
        FANGO: "Líquido espeso y sucio mezclado con barro o residuos.",
        MARISMA:
          "Terreno bajo y húmedo donde crecen hierbas en aguas poco profundas.",
        TOXINA: "Sustancia venenosa producida por un ser vivo.",
        PUTRIDO: "Podrido y de olor repugnante.",
        REZUMAR: "Fluir lenta y continuamente, como el barro espeso.",
      },
      words: {
        CORROSION: "The gradual wearing away of metal or stone.",
        MIASMA: "A cloud of foul-smelling air rising from damp ground.",
        SLUDGE: "Thick, dirty liquid mixed with mud or waste.",
        MARSH: "Low, wet land where grasses grow in shallow water.",
        TOXIN: "A poisonous substance made by a living thing.",
        PUTRID: "Rotten and foul-smelling.",
        OOZE: "To flow slowly and steadily, like thick mud.",
      },
    },
    {
      name: "Zombie Cyclops",
      nameEs: "Cíclope zombi",
      color: "#d800f5",
      victory: "ENEMY DEFEATED",
      arena: "bonfire_arena.gif",
      ground: 9,
      arenaSmooth: true,
      music: "zombie",
      rate: 1,
      pitch: 0.7,
      anchor: "center",
      hurtFx: true,
      scale: 1.3,
      sprites: {
        idle: "newRound2/zombieCyclops_idle.gif",
        attack: "newRound2/zombieCyclops_attack.gif",
        hurt: "newRound2/zombieCyclops_idle.gif",
        death: "newRound2/zombieCyclops_death.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "zombie_sfx",
        death: "beastHurt_sfx",
        attack: "attackSound",
      },
      sfxAt: 180,
      hitAt: 250,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        CICLOPE:
          "Gigante de la mitología que, según cuentan, tenía un solo ojo.",
        AGUARDIENTE:
          "Bebida alcohólica fuerte y de baja calidad; también, nombre de un estómago enfermo.",
        GIGANTESCO: "Tan enorme que parece imposible medirlo.",
        VORAZ: "Que tiene tanta hambre que quiere comer de inmediato.",
        OCULAR: "Relativo al ojo o al sentido de la vista.",
        PUTREFACCION: "Proceso por el que algo se vuelve podrido y maloliente.",
        GLOBOOCULAR:
          "Órgano redondo dentro de la cuenca ocular que permite ver.",
      },
      words: {
        CYCLOPS: "A giant from myth who is said to have one eye.",
        ROTGUT:
          "A harsh, low-quality drink; also a name for a sickened stomach.",
        GARGANTUAN: "So huge that it seems almost impossible to measure.",
        RAVENOUS: "So hungry that one wants to eat immediately.",
        OCULAR: "Relating to the eye or the sense of sight.",
        PUTRESCENCE: "The state of becoming rotten and foul-smelling.",
        EYEBALL: "The round organ inside the socket that allows sight.",
      },
    },
    {
      name: "Minotaur King",
      nameEs: "Rey Minotauro",
      victoryEs: "¡JEFE DERROTADO!",
      color: "#d2a16f",
      boss: true,
      victory: "BOSS DEFEATED!",
      arena: "pyramids.gif",
      ground: 9,
      arenaSmooth: true,
      music: "mino",
      rate: 1,
      pitch: 0.85,
      anchor: "center",
      hurtFx: true,
      scale: 0.8,
      cssPose: true,
      sprites: {
        idle: "newRound2/minoBoss_idle.gif",
        attack: "newRound2/minoBoss_attack.gif",
        hurt: "newRound2/minoBoss_idle.gif",
        death: "newRound2/minoBoss_idle.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "beastHurt_sfx",
        death: "beastHurt_sfx",
        attack: "attackSound",
      },
      sfxAt: 150,
      hitAt: 350,
      endAt: 700,
      deathMs: 1200,
      wordsEs: {
        LABERINTO:
          "Minotauro: Estos pasillos sinuosos forman un entramado del que no es fácil salir. ¿Cómo se llama?",
        SINUOSO:
          "Minotauro: Estos pasajes serpentean como un laberinto. Son largos y ___.",
        SANGUINARIO:
          "Minotauro: Ansío la batalla y la sangre de mis enemigos. ¿Cómo llamarías a una criatura así?",
        EMBESTIDA:
          "Minotauro: Baja los cuernos y carga de frente. Ese ataque repentino es una ___.",
        MATANZA:
          "Minotauro: No tendré piedad en esta arena. La muerte violenta de muchos se llama ___.",
        TIRANIA:
          "Minotauro: Gobierno mediante el miedo, no la bondad. A ese dominio cruel se le llama ___.",
        CORNAMENTA:
          "Minotauro: Conjunto de cuernos poderosos que crecen en mi cabeza para asustar a los débiles.",
        ANFITEATRO:
          "Minotauro: Los guerreros se enfrentan aquí en combates sangrientos ante una multitud expectante.",
        COLISEO:
          "Minotauro: Gran recinto ovalado donde se celebran combates y espectáculos.",
      },
      words: {
        LABYRINTH:
          "Minotaur King: These turning halls form a maze with no easy way out. What is such a maze called?",
        WINDING:
          "Minotaur King: These passages twist and turn like a maze. They are long and ___",
        BLOODTHIRSTY:
          "Minotaur King: I hunger for battle and the blood of my foes. What would you call such a creature?",
        BULLRUSH:
          "Minotaur King: Lower the horns and charge straight ahead. That sudden attack is a ___.",
        SLAUGHTER:
          "Minotaur King: I will show no mercy in this arena. The violent killing of many is called ___.",
        TYRANNY:
          "Minotaur King: I rule through fear, not kindness. Such cruel rule is known as ___.",
        ANTLERS:
          "Minotaur King: The set of powerful horns growing on my head to strike fear into the weak.",
        AMPHITHEATER:
          "Minotaur King: Warriors meet here in bloody combat before a watching crowd.",
        COLISEUM:
          "Minotaur King: A large oval venue where combats and spectacles are held.",
      },
    },
    {
      name: "Moon Knight",
      nameEs: "Caballero lunar",
      color: "#b7b8f5",
      victory: "ENEMY DEFEATED",
      arena: "putrid_dojo.gif",
      ground: 9,
      arenaSmooth: true,
      music: "moon",
      rate: 1,
      pitch: 1,
      anchor: "center",
      hurtFx: true,
      scale: 0.25,
      sprites: {
        idle: "newRound3/moonKnight_idle.gif",
        attack: "newRound3/moonKnight_attack.gif",
        hurt: "newRound3/moonKnight_idle.gif",
        death: "newRound3/moonKnight_death.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "purpleShadowHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 180,
      hitAt: 250,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        CRECIENTE:
          "Forma curva de la Luna cuando está iluminada menos de la mitad.",
        SELENITA:
          "Dicho de un ser o habitante ficticio vinculado al satélite natural.",
        SIZIGIA:
          "Alineación de tres cuerpos celestes en un sistema gravitacional.",
        NOCTURNO: "Activo durante la noche en lugar del día.",
        ARGENTEO: "De aspecto brillante y color similar al de la plata pura.",
        ASTROLABIO:
          "Antiguo instrumento astronómico utilizado para determinar la posición de los astros.",
        LUNACION:
          "Período completo de tiempo entre dos lunas nuevas consecutivas.",
      },
      words: {
        CRESCENT: "The curved shape of a moon that is less than half lit.",
        SELENITE:
          "Relating to a hypothetical or mythical inhabitant of the moon.",
        SYZYGY:
          "An alignment of three celestial objects in a gravitational system.",
        NOCTURNAL: "Active during the night rather than the day.",
        ARGENT: "Shining like silver; silvery in appearance and color.",
        ASTROLABE:
          "An ancient astronomical instrument used to locate and predict the positions of stars and planets.",
        LUNATION:
          "The complete cycle of the moon's phases from new moon to new moon.",
      },
    },
    {
      name: "Askhen, shadow of remains",
      nameEs: "Askhen, sombra de los restos",
      color: "#af4edf",
      victory: "ENEMY DEFEATED",
      arena: "eclipse.gif",
      ground: 9,
      arenaSmooth: true,
      music: "shadow",
      rate: 1,
      pitch: 0.8,
      anchor: "center",
      hurtFx: true,
      scale: 0.75,
      cssPose: true,
      sprites: {
        idle: "newRound3/ashken_idle.gif",
        attack: "newRound3/ashken_idle.gif",
        hurt: "newRound3/ashken_idle.gif",
        death: "newRound3/ashken_idle.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "purpleShadowHurtSound",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 150,
      hitAt: 150,
      endAt: 700,
      deathMs: 1200,
      wordsEs: {
        VORAGINE: "Remolino o pozo profundo que consume todo a su paso.",
        OBSERVADOR: "Ser o persona que contempla en silencio y con fijeza.",
        MORTAJA:
          "Tela con la que se envuelve o cubre un cadáver antes del entierro.",
        RECIPIENTE:
          "Contenedor destinado a guardar un objeto valioso o peligroso.",
        CAVERNOSO:
          "Que posee una profundidad o vaciedad similar a la de una gran cueva.",
        VESTIGIO:
          "Memoria, huella o resto que queda de algo destruido o pasado.",
        TENEBROSIDAD: "Calidad de oscuro, tenebroso y profundamente sombrío.",
      },
      words: {
        VORAGO: "A deep vortex or gulf that consumes everything in its path.",
        GAZER: "One who watches something silently and steadily.",
        SHROUD: "A cloth used to wrap or cover a corpse.",
        VESSEL: "A container used to hold something precious or dangerous.",
        HOLLOW: "Having a vast, deep, or echoing emptiness inside.",
        REMNANT: "A trace or remaining part of something that has vanished.",
        TENEBROSITY: "The quality of being dark, murky, and deeply shadowed.",
      },
    },
    {
      name: "Hanami, Blossom Warden",
      nameEs: "Hanami, guardiana de las flores",
      color: "#ff00d9e1",
      victory: "ENEMY DEFEATED",
      arena: "sakura_tree.gif",
      ground: 9,
      arenaSmooth: true,
      music: "sakury",
      rate: 1,
      pitch: 0.9,
      anchor: "center",
      hurtFx: true,
      cssPose: true,
      scale: 1.1,
      sprites: {
        idle: "newRound3/sakury.gif",
        attack: "newRound3/sakury.gif",
        hurt: "newRound3/sakury.gif",
        death: "newRound3/sakury.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "leafArrowHurtSound",
        death: "leafArrowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 150,
      hitAt: 350,
      endAt: 700,
      deathMs: 1200,
      wordsEs: {
        NINFA:
          "Espíritu de la naturaleza que, según la leyenda, habita en bosques, ríos o árboles.",
        COROLA:
          "Conjunto de pétalos que forman la cubierta vistosa de una flor.",
        EFLORESCENCIA:
          "Estado o proceso de abrirse una flor y alcanzar su plenitud.",
        ARBOLEDA:
          "Grupo frondoso de árboles que crecen juntos en una misma zona.",
        VERNAL:
          "Perteneciente o relativo a la primavera o al comienzo de la floración.",
        ESPORA:
          "Célula reproductora microscópica producida por plantas sin flores o hongos.",
        ENRAMADA:
          "Lugar frondoso y sombreado cubierto por ramas y enredaderas.",
      },
      words: {
        NYMPH:
          "A nature spirit often said to dwell in forests, rivers, or trees.",
        COROLLA: "The whorl of petals forming the inner envelope of a flower.",
        EFFLORESCENCE: "The process or state of unfolding into full blossom.",
        GROVE: "A shaded group of trees growing close together.",
        VERNAL:
          "Relating to, occurring in, or appropriate to the spring season.",
        SPORE:
          "A microscopic reproductive body produced by fungi and non-flowering plants.",
        BOWER: "A leafy, shaded place beneath interlaced branches and vines.",
      },
    },
    {
      name: "Flauzho, Frozen Golem",
      nameEs: "Flauzho, gólem helado",
      victoryEs: "¡JEFE DERROTADO!",
      color: "#9acde8",
      boss: true,
      victory: "BOSS DEFEATED!",
      arena: "snowy_forest.gif",
      ground: 9,
      arenaSmooth: true,
      music: "golem",
      rate: 1,
      pitch: 0.75,
      anchor: "center",
      hurtFx: true,
      scale: 0.9,
      sprites: {
        idle: "newRound3/iceGolem_idle.gif",
        attack: "newRound3/iceGolem_attack.gif",
        hurt: "newRound3/iceGolem_idle.gif",
        death: "newRound3/iceGolem_death.gif",
        dead: "nothing.png",
      },
      sfx: {
        hurt: "iceHit",
        death: "beastHurt_sfx",
        attack: "punch",
      },
      sfxAt: 180,
      hitAt: 350,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        MONOLITO: "Flauzho: Me alzo como un enorme bloque de piedra o hielo.",
        HIELOPERPETUO:
          "Flauzho: El suelo bajo este bosque permanece helado año tras año.",
        GLACIACION:
          "Flauzho: Largo periodo durante el que los glaciares se extienden por la tierra.",
        DESTROZAR:
          "Flauzho: Golpea el hielo con fuerza suficiente y se hará pedazos.",
        CONSTRUCTO: "Flauzho: Fui creado por manos y magia; no nací.",
        AGUANIEVE:
          "Flauzho: Lluvia congelada cae en pequeños gránulos y repiquetea contra la piedra.",
        HELADO: "Flauzho: Atrapado bajo capas de hielo, el bosque está ___.",
        CATACLISMO:
          "Flauzho: Desastre tan inmenso que transforma la propia tierra.",
        CONGELACION:
          "Flauzho: El frío puede dañar la piel cuando permanece congelada demasiado tiempo.",
        TUNDRA:
          "Flauzho: Vasta región sin árboles donde el suelo permanece frío.",
      },
      words: {
        MONOLITH: "Flauzho: I stand like one enormous block of stone or ice.",
        PERMAFROST:
          "Flauzho: The soil beneath this forest stays frozen year after year.",
        GLACIATION:
          "Flauzho: A long period when glaciers spread across the land.",
        SHATTER:
          "Flauzho: Strike the ice hard enough, and it will break into pieces.",
        CONSTRUCT: "Flauzho: I was built by hands and magic, not born.",
        SLEET:
          "Flauzho: Frozen rain falls in small pellets, rattling against the stone.",
        ICEBOUND:
          "Flauzho: Locked fast beneath layers of ice, the forest is ___.",
        CATACLYSM: "Flauzho: A disaster so great it changes the land itself.",
        FROSTBITE:
          "Flauzho: Cold can damage the skin when it freezes for too long.",
        TUNDRA: "Flauzho: A vast, treeless region where the ground stays cold.",
      },
    },
    /* ---------------------------------------- ROUND 9 AND 10 ---------------------------------------- */
    {
      name: "Warden of Sanguination",
      nameEs: "Guardián de la sangría",
      color: "#ff0000",
      victory: "ENEMY DEFEATED",
      arena: "red.gif",
      ground: 8,
      arenaSmooth: true,
      music: "sang",
      rate: 1,
      pitch: 1.15,
      anchor: "center",
      hurtFx: true,
      scale: 0.9,
      sprites: {
        idle: "newRound1/bloody_idle.gif",
        attack: "newRound1/bloody_idle.gif",
        hurt: "newRound1/bloody_idle.gif",
        death: "newRound1/bloody_idle.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "beastHurt_sfx",
        death: "beastHurt_sfx",
        attack: "attackSound",
      },
      sfxAt: 180,
      hitAt: 350,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        HEMATOMA:
          "Acumulación de sangre coagulada o fluidos bajo los tejidos debido a una lesión.",
        HEMORRAGIA:
          "Flujo abundante y descontrolado de sangre debido a la rotura de un vaso.",
        ESCARLATA:
          "Tono de rojo vivo, intenso y brillante semejante al de la sangre arterial.",
        INFUSION:
          "Introducción lenta y continua de un líquido en un conducto o tejido.",
        EXUDACION:
          "Salida o filtración lenta de un líquido a través de poros o membranas.",
        VISCOSO: "De consistencia espesa, pegajosa y lenta al verterse.",
        SANGUINEO:
          "Perteneciente o relativo a la sangre y al flujo que recorre el cuerpo.",
      },
      words: {
        HEMATOMA:
          "A localized pooling of clotted blood or fluid beneath the tissues.",
        HEMORRHAGE:
          "An escape of blood from a ruptured blood vessel, especially when profuse.",
        SCARLET:
          "A bright, vivid, and intense shade of red resembling arterial blood.",
        INFUSION:
          "The slow and continuous introduction of a liquid into a vessel or tissue.",
        EXUDATION:
          "The slow escape or oozing of fluid through pores or surfaces.",
        VISCOUS: "Thick, sticky, and slow-flowing in consistency.",
        SANGUINE:
          "Relating to or blood-red in color; characteristic of blood flow.",
      },
    },
    {
      name: "Ironclad Automaton",
      nameEs: "Autómata acorazado",
      color: "#c7c7c7",
      victory: "ENEMY DEFEATED",
      arena: "metal.gif",
      ground: 9,
      arenaSmooth: true,
      music: "robot",
      rate: 1,
      pitch: 0.95,
      anchor: "center",
      hurtFx: true,
      scale: 1.1,
      sprites: {
        idle: "newRound1/robot.gif",
        attack: "newRound1/robot.gif",
        hurt: "newRound1/robot.gif",
        death: "newRound1/robot.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "metalHurt_sfx",
        death: "metalDeath_sfx",
        attack: "punch",
      },
      sfxAt: 180,
      hitAt: 350,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        EMBRAGUE:
          "Mecanismo que conecta y desconecta la transmisión de movimiento entre el motor y las ruedas.",
        CIRCUITO:
          "Camino cerrado y complejo por el que fluye la corriente o señal eléctrica.",
        AUTOMATA:
          "Máquina compleja diseñada con mecanismos autónomos para imitar acciones.",
        TITANIO:
          "Metal altamente resistente, ligero y de gran durabilidad empleado en alta tecnología.",
        SERVOMECANISMO:
          "Dispositivo motorizado que regula con máxima precisión la posición de un mecanismo.",
        PROPULSOR:
          "Sistema o máquina compleja encargada de generar empuje y transformar energía en movimiento.",
        MECANICO:
          "Perteneciente o relativo a las máquinas, engranajes y sistemas de precisión.",
      },
      words: {
        CLUTCH:
          "A mechanical device that engages and disengages power transmission, especially from an engine to drive parts.",
        CIRCUIT:
          "A closed loop path through which electrical current or signals can flow.",
        AUTOMATON:
          "A complex machine designed with autonomous mechanisms to perform actions.",
        TITANIUM:
          "A strong, lightweight, highly durable metal used in advanced engineering.",
        SERVOMECHANISM:
          "An automated device that regulates the position or motion of a mechanism with precision.",
        PROPULSOR:
          "A complex system or machine designed to generate thrust and motion.",
        MECHANICAL:
          "Relating to machinery, gears, and precision engineering systems.",
      },
    },
    {
      name: "Masher, the temple lord",
      nameEs: "Masher, señor del templo",
      color: "#fed866",
      victory: "ENEMY DEFEATED",
      arena: "desert_temple.gif",
      ground: 8,
      arenaSmooth: true,
      music: "temple",
      rate: 1,
      pitch: 1.1,
      anchor: "center",
      hurtFx: true,
      scale: 0.6,
      sprites: {
        idle: "temble_man.gif",
        attack: "temble_man.gif",
        hurt: "temble_man.gif",
        death: "temble_man.gif",
        dead: "nothing.png",
      },
      sfx: {
        hurt: "thanielHurtSound",
        death: "thanielDeathSound",
        attack: "dodge_sfx",
      },
      sfxAt: 160,
      hitAt: 280,
      endAt: 820,
      deathMs: 880,
      wordsEs: {
        POLVO:
          "Partículas secas diminutas que se acumulan en el suelo del templo.",
        ESPEJISMO:
          "Imagen lejana que parece real, pero la provoca el aire caliente.",
        TEMPLO: "Edificio dedicado al culto, a menudo con salas sagradas.",
        CALCINADO: "Quemado o secado por un calor intenso.",
        FANATICO:
          "Persona que siente una devoción intensa por una causa o creencia.",
        SIMUN: "Viento muy cálido y seco que sopla a través del desierto.",
        RELIQUIA:
          "Objeto antiguo que se conserva por su valor histórico o sagrado.",
      },
      words: {
        DUST: "Tiny dry particles that collect on the temple floor.",
        MIRAGE: "A distant image that looks real but is caused by hot air.",
        TEMPLE: "A building used for worship, often with sacred rooms.",
        SCORCHED: "Burned or dried by intense heat.",
        ZEALOT: "A person with intense devotion to a cause or belief.",
        SIMOOM: "A very hot, dry wind that blows across a desert.",
        RELIC: "An old object kept because of its historical or sacred value.",
      },
    },
    {
      name: "Gynn, the fallen angel",
      nameEs: "Gynn, el ángel caído",
      color: "#ff4141",
      boss: true,
      victory: "BOSS DEFEATED!",
      arena: "chess.gif",
      ground: 9,
      arenaSmooth: true,
      music: "chess",
      rate: 1,
      pitch: 1.05,
      anchor: "center",
      speechTitle: "Gynn",
      speech: [
        "HALT.",
        "...",
        "THOU ART APPROACHING THE GATE OF THE GREAT LIFT.",
        "TO HAVE MADE IT THIS FAR...",
        "IT MEANS THAT THOU...",
        "I SEE...",
        "THOU HAST BEEN COLLECTING THE SOULS OF GREAT BEINGS.",
        "THOU ART AN ODD ONE...",
        "YET... WHAT IS THY PURPOSE?",
        "HMM?",
        "OH, I SEE...",
        "THOU WOULDST PUT AN END TO SERAPHIEL, EH?",
        "FASCINATING...",
        "HEAR ME, THEN:",
        "I WAS ONCE A TRUE ANGEL...",
        "BUT SERAPHIEL WOULD SUFFER NO OTHER ANGEL TO EXIST.",
        "HE STRIPPED ME OF MY WINGS...",
        "I SOUGHT TO DEVOUR HIS SOUL... YET HE PROVED TOO STRONG.",
        "SERAPHIEL IS NOTHING BUT A FALSE ANGEL.",
        "HE STOLE AND SACRIFICED COUNTLESS SOULS FOR HIS OWN ASCENSION...",
        "...",
        "AND TO THINK THAT MINE WERE AMONG THE SOULS HE CRAVED MOST.",
        "I... MADE A MISTAKE.",
        "AND IT COST ME MY POWER AND MY IDENTITY.",
        "NOW I AM NOTHING BUT A FADING GHOST.",
        "A PALE MIRAGE OF WHAT I ONCE WAS.",
        "...",
        "PROVE THY WORTH, CURSED ONE.",
        "IF THOU CANST DEFEAT ME, THEN THOU ART WORTHY TO FACE THAT MONSTER.",
        "...",
        "PLEASE... ANNIHILATE THAT FALSE ANGEL.",
      ],
      speechTitleEs: "Gynn",
      speechEs: [
        "¡ALTO!",
        "...",
        "TE ACERCAS AL PORTAL DEL GRAN ASCENSO.",
        "HABER LLEGADO TAN LEJOS...",
        "SIGNIFICA QUE TÚ...",
        "YA ENTIENDO...",
        "HAS ESTADO COSECHANDO LAS ALMAS DE GRANDES SERES.",
        "ERES UN SER EXTRAÑO...",
        "AUN ASÍ... ¿CUÁL ES TU PROPÓSITO?",
        "¿HMM?",
        "AH, YA VEO...",
        "¿QUIERES PONER FIN A SERAPHIEL, EH?",
        "FASCINANTE...",
        "ESCÚCHAME, ENTONCES:",
        "YO FUI UN ÁNGEL VERDADERO...",
        "PERO SERAPHIEL NO TOLERABA LA EXISTENCIA DE NINGÚN OTRO ÁNGEL.",
        "ME ARRANCÓ LAS ALAS...",
        "INTENTÉ DEVORAR SU ALMA... PERO RESULTÓ SER DEMASIADO FUERTE.",
        "SERAPHIEL NO ES MÁS QUE UN FALSO ÁNGEL.",
        "ROBÓ Y SACRIFICÓ INNUMERABLES ALMAS PARA SU PROPIO ASCENSO...",
        "...",
        "Y PENSAR QUE LAS MÍAS ESTABAN ENTRE LAS ALMAS QUE MÁS CODICIABA.",
        "YO... COMETÍ UN ERROR.",
        "Y ME COSTÓ MI PODER Y MI IDENTIDAD.",
        "AHORA NO SOY MÁS QUE UN FANTASMA QUE SE DESVANECE.",
        "UN PÁLIDO ESPEJISMO DE LO QUE FUI.",
        "...",
        "DEMUESTRA TU VALÍA, SER MALDITO.",
        "SI PUEDES DERROTARME, ENTONCES ERES DIGNO DE ENFRENTARTE A ESE MONSTRUO.",
        "...",
        "POR FAVOR... ANIQUILA A ESE FALSO ÁNGEL.",
      ],
      hurtFx: true,
      scale: 0.9,
      sprites: {
        idle: "newRound1/ghost_king.gif",
        attack: "newRound1/ghost_king.gif",
        hurt: "newRound1/ghost_king.gif",
        death: "newRound1/ghost_king.gif",
        dead: "nothing.png",
      },
      sfx: {
        hurt: "beastHurt_sfx",
        death: "purpleShadowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 180,
      hitAt: 200,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        SOBERANO:
          "Gynn: No obedezco a ningún rey viviente. El título de quien ostenta el poder supremo es ___.",
        MONOLITICO:
          "Gynn: Me alzo sobre este campo, inmenso e inamovible como una colosal piedra. Soy ___.",
        ESPECTRAL:
          "Gynn: Mi forma no es más que un pálido vestigio entre el mundo de los vivos y la tumba; soy ___.",
        MAJESTUOSO:
          "Gynn: Incluso envuelto en sombras conservo la solemnidad imponente de un verdadero Monarca. Soy ___.",
        VENGANZA:
          "Gynn: Por cada afrenta a mi corona, te pagaré con la misma moneda. Ese pago es la ___.",
        SEPULCRO:
          "Gynn: Bajo este trono yace la cámara de piedra donde descansan los muertos. Es mi ___.",
        SUBDITO:
          "Gynn: Quien nace bajo mi dominio debe obedecer sin cuestionar jamás. Serías mi ___.",
        DINASTIA:
          "Gynn: Mi linaje gobernó durante generaciones; cada heredero recibió la corona. Éramos una ___.",
        APOSTATA:
          "Gynn: Abandoné la luz de los cielos para servir a los abismos insondables; renegué de mi fe y ahora soy ___.",
        HEGEMONIA:
          "Gynn: Los imperios caen, pero la supremacía total que ejercimos sobre el mundo es nuestra ___.",
      },
      words: {
        SOVEREIGN:
          "Gynn: I answer to no living king. The title for a ruler who holds supreme power is ___.",
        MONOLITHIC:
          "Gynn: I stand over this field, vast and unyielding as a single colossal stone. I am ___.",
        SPECTRAL:
          "Gynn: My form is but a pale remnant between the living world and the grave; I am ___.",
        MAJESTIC:
          "Gynn: Even cloaked in shadow, I retain the imposing gravity of a true Monarch. I am ___.",
        RETRIBUTION:
          "Gynn: For every slight against my crown, I shall repay you in kind. That payment is ___.",
        SEPULCHRE:
          "Gynn: Beneath this throne lies the stone chamber where the dead are laid. It is my ___.",
        SUBJECT:
          "Gynn: One who is bound to obey my decree without question. You would be my ___.",
        DYNASTY:
          "Gynn: My bloodline ruled for generations, each heir inheriting the crown. We were a ___.",
        APOSTATE:
          "Gynn: I abandoned the light of the heavens to serve the fathomless deep; I renounced my faith and now I am ___.",
        HEGEMONY:
          "Gynn: Empires crumble, but the total supremacy we exerted over the realm is our ___.",
      },
    },
    {
      name: "Lesser Angel Lya",
      color: "#01fa16",
      victory: "ENEMY DEFEATED",
      arena: "lesser.png",
      ground: 10,
      arenaSmooth: true,
      music: "angel_01",
      rate: 1,
      pitch: 1.25,
      anchor: "center",
      hurtFx: true,
      cssPose: true,
      cssBob: true,
      lift: 10,
      scale: 1.2,
      sprites: {
        idle: "lesser_angel.gif",
        attack: "lesser_angel.gif",
        hurt: "lesser_angel.gif",
        death: "lesser_angel.gif",
        dead: "nothing.png",
      },
      sfx: {
        hurt: "angelHurt_sfx",
        death: "angelHurt_sfx",
        attack: "attackSound",
      },
      sfxAt: 150,
      hitAt: 150,
      endAt: 700,
      deathMs: 1200,
      wordsEs: {
        EMPIREO:
          "Lo más alto de los cielos, morada de luz pura y esferas incorruptibles.",
        RESPLANDOR:
          "Luminiscencia brillante, cegadora y sagrada que irradia desde un núcleo sacro.",
        GIROSCOPICO:
          "Perteneciente al movimiento rotatorio perpetuo de anillos celestes en armonía.",
        RELICARIO:
          "Recipiente sagrado y ornamentado que custodia fragmentos de sabiduría celestial.",
        CONSAGRADO:
          "Libre de toda corrupción terrenal y apartado para el culto de las altas esferas.",
        AUREO:
          "De apariencia semejante al oro puro, forjado en el resplandor de los cielos.",
        SACROSANTO:
          "Dotado de una santidad suprema e inviolable, digno de máxima veneración.",
        POTESTAD:
          "Orden de la jerarquía angélica encargada de mantener el orden cósmico.",
        SERAFIN:
          "Criatura de la más alta jerarquía celestial, coronada de fuego y alas múltiples.",
        DIVINIDAD:
          "Estado, esencia y naturaleza absoluta propia de lo divino y eterno.",
      },
      words: {
        EMPYREAN:
          "The highest part of heaven, dwelling place of pure light and incorruptible orbs.",
        RADIANCE:
          "A brilliant, blinding, and holy luminescence radiating from a sacred core.",
        GYROSCOPIC:
          "Relating to the perpetual rotational movement of celestial rings in harmony.",
        PYXIS:
          "A sacred, ornate vessel guarding fragments of celestial wisdom.",
        CONSECRATED:
          "Untouched by earthly corruption and set apart for the worship of higher spheres.",
        AURIC:
          "Possessing the glowing appearance of pure gold forged in the heavens.",
        SACROSANCT:
          "Endowed with a supreme, inviolable holiness worthy of ultimate reverence.",
        POTESTAD:
          "An angelic order tasked with maintaining cosmic stability and divine law.",
        SERAPH:
          "A celestial being of the highest angelic rank, crowned with fire and multiple wings.",
        DIVINITY:
          "The absolute state, essence, and nature of the divine and eternal.",
      },
    },
    {
      name: "Lesser Angel Marther",
      color: "#ffe83a",
      victory: "ENEMY DEFEATED",
      arena: "lesser2.png",
      ground: 10,
      arenaSmooth: true,
      music: "angel_02",
      rate: 1,
      pitch: 0.7,
      anchor: "center",
      hurtFx: true,
      lift: 15,
      scale: 1.2,
      sprites: {
        idle: "lesser_angel2.gif",
        attack: "lesser_angel2.gif",
        hurt: "lesser_angel2.gif",
        death: "lesser_angel2.gif",
        dead: "nothing.png",
      },
      sfx: {
        hurt: "angelHurt_sfx",
        death: "angelHurt_sfx",
        attack: "attackSound",
      },
      sfxAt: 140,
      hitAt: 260,
      endAt: 500,
      deathMs: 1000,
      wordsEs: {
        AURIFERO:
          "Mineral o núcleo que destella un fulgor dorado, forjado en la pureza de los altos cielos.",
        PLUMAJE:
          "Conjunto de capas suaves pero impenetrables, dispuestas con simetría perfecta.",
        OCULO:
          "Ojo único y fijo que examina el interior y la candidez de las almas mortales.",
        CELESTIAL:
          "Entidad mensajera que desciende desde los planos superiores de la luz pura.",
        NIMBO:
          "Halo centelleante de energía radiante que corona una forma inmaculada.",
        SERAFIN:
          "Criatura de altísimo rango, envuelta en llamas y dotada de múltiples alas.",
        CONSAGRADO:
          "Separado de lo terrenal y elevado a la santidad mediante fuego sagrado.",
        BEATITUD:
          "Estado de suprema felicidad y bienaventuranza celestial concedido a los justos.",
        DOMINACION:
          "Orden de la jerarquía celestial que gobierna y ejecuta las leyes divinas.",
        ARROBO:
          "Estado de éxtasis y devoción mística profunda ante la presencia sagrada.",
      },
      words: {
        AURIFEROUS:
          "A mineral or core that casts a golden glow, forged within the purity of the high heavens.",
        PLUMAGE: "Soft yet impenetrable layers arranged in flawless symmetry.",
        OCULUS:
          "A solitary, unblinking eye inspecting the depth and candor of mortal souls.",
        CELESTIAL:
          "A messenger entity descended from the higher planes of pure light.",
        NIMBUS:
          "A shimmering halo of radiant energy crowning an immaculate form.",
        SERAPH:
          "An entity of the highest rank, wreathed in flame and multiple wings.",
        CONSECRATED:
          "Set apart from the earthly and elevated to holiness by sacred fire.",
        BEATITUDE:
          "A state of supreme heavenly bliss and blessedness granted to the righteous.",
        DOMINION:
          "An angelic order of the celestial hierarchy that governs divine laws.",
        RAPTURE:
          "A state of supreme ecstasy and deep mystical devotion before the sacred.",
      },
    },
    {
      name: "Lesser Angel Sina",
      color: "#07c8f9",
      victory: "ENEMY DEFEATED",
      arena: "lesser3.png",
      ground: 10,
      arenaSmooth: true,
      music: "angel_03",
      rate: 1,
      pitch: 1.2,
      anchor: "center",
      hurtFx: true,
      lift: 15,
      scale: 1.2,
      sprites: {
        idle: "newRound2/lesser_angel3.gif",
        attack: "newRound2/lesser_angel3.gif",
        hurt: "newRound2/lesser_angel3.gif",
        death: "newRound2/lesser_angel3.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "angelHurt_sfx",
        death: "angelHurt_sfx",
        attack: "attackSound",
      },
      sfxAt: 180,
      hitAt: 350,
      endAt: 900,
      deathMs: 900,
      wordsEs: {
        AUREOLA:
          "Círculo radiante de luz y fulgor que corona una entidad pura.",
        PTEROMA:
          "Estructura monumental de alas plegadas que envuelve a los seres de los cielos.",
        HELIOS:
          "Esplendor solar ígneo que emana de las altas jerarquías celestes.",
        EMPIREO:
          "Morada suprema de luz incorruptible situada en lo más alto del firmamento.",
        HIERATICO:
          "Dotado de un carácter sagrado, solemne y estrictamente ritual.",
        TRONO:
          "Orden angélico superior que sostiene la justicia y el juicio celestial.",
        EXCELSO: "De grandeza suprema, elevado muy por encima de lo terrenal.",
        BENEDICION:
          "Favor divino o gracia solemne derramada desde el reino superior.",
        CENOBIO:
          "Recinto sagrado impenetrable apartado del mundo terrenal que custodia reliquias de poder eterno.",
        INMORTAL:
          "Libre del ciclo de la muerte; condicionado a existir por la eternidad.",
      },
      words: {
        AUREOLE:
          "A radiant circle of light and glowing aura crowning a pure entity.",
        PTEROMA:
          "A monumental structure of folded wings shrouding celestial beings.",
        HELIOS:
          "An igneous solar splendor emanating from high heavenly hierarchies.",
        EMPYREAN:
          "The supreme dwelling of incorruptible light situated at the highest firmament.",
        HIERATIC:
          "Endowed with a sacred, solemn, and strictly ritualistic character.",
        THRONE:
          "A higher angelic order upholding celestial justice and divine judgment.",
        EXCELSIOR:
          "Of supreme greatness, elevated far beyond the mundane realm.",
        BENEDICTION:
          "A divine favor or solemn grace poured down from the upper realm.",
        CENOBY:
          "An impenetrable sacred enclosure set apart from the earthly realm guarding relics of eternal power.",
        IMMORTAL:
          "Free from the cycle of death; bound to exist for all eternity.",
      },
    },
    {
      name: "Arkania, the Gatewarden",
      nameEs: "Arkania, la Guardiana",
      color: "#07c8f9",
      boss: true,
      victory: "BOSS DEFEATED!",
      arena: "blue.gif",
      ground: 10,
      arenaSmooth: true,
      music: "angel_protector",
      rate: 1,
      pitch: 0.7,
      anchor: "center",
      hurtFx: true,
      scale: 0.8,
      fx: "hue-rotate(200deg) saturate(1.2) contrast(1.15)",
      speechTitle: "Arkania",
      speech: [
        "BRAVE WARRIOR...",
        "THOU HAST ARRIVED FAR ENOUGH.",
        "BEFORE THEE STANDETH THE LEGENDARY GATE,",
        "THE GATE OF GREAT LIFT.",
        "YET... THY EFFORTS ARE IN VAIN,",
        "FOR ONLY I CAN OFFER THEE PASSAGE.",
        "...",
        "THE GATE WILL REMAIN CLOSED.",
        "SERAPHIEL IS NOT INTERESTED IN THEE.",
        "TURN BACK, NOW.",
        "TURN BACK TO WHENCE THOU CAMEST...",
        "OR PERISH.",
      ],
      speechTitleEs: "Arkania",
      speechEs: [
        "VALIENTE GUERRERO...",
        "HAS LLEGADO LO BASTANTE LEJOS.",
        "ANTE TI SE ALZA EL LEGENDARIO PORTAL,",
        "EL PORTAL DEL GRAN ASCENSO",
        "SIN EMBARGO... TUS ESFUERZOS SON EN VANO,",
        "PUES SOLO YO PUEDO PERMITIRTE EL PASO.",
        "...",
        "EL PORTAL PERMANECERÁ CERRADO.",
        "SERAPHIEL NO TIENE INTERÉS EN TI.",
        "VUELVE, AHORA.",
        "VUELVE POR DONDE HAS VENIDO...",
        "O PERECE.",
      ],
      sprites: {
        idle: "newRound2/protector.gif",
        attack: "newRound2/protector.gif",
        hurt: "newRound2/protector.gif",
        death: "newRound2/protector.gif",
        dead: "newRound1/nothing.png",
      },
      sfx: {
        hurt: "leafArrowHurtSound",
        death: "leafArrowDeathSound",
        attack: "attackSound",
      },
      sfxAt: 840,
      hitAt: 960,
      endAt: 1700,
      deathMs: 1400,
      wordsEs: {
        ARBITRO:
          "Arkania: Decido quién puede cruzar estas puertas. Nadie puede revocar mi resolución; soy la suprema ___.",
        INFRANQUEABLE:
          "Arkania: Mis puertas no cederán y ninguna fuerza podrá atravesarlas. Son ___.",
        IMMACULADO:
          "Arkania: Esta tierra ha sido bendecida y reservada para un uso sagrado. Es terreno ___.",
        ANATEMA:
          "Arkania: Desafía el orden sagrado y te expulsaré con la peor de las maldiciones. Serás un ___.",
        INTERCESION:
          "Arkania: Ruego a un poder superior en favor de otra persona. Tal súplica es una ___.",
        INMUTABLE:
          "Arkania: Mi ley no puede cambiarse, ni siquiera por los reyes. Es ___.",
        TRASCENDENTE:
          "Arkania: Mi poder supera los límites ordinarios y la comprensión de los mortales. Es ___.",
        VEREDICTO:
          "Arkania: Ante estas puertas, cada alma debe responder por sus actos definitivos. Afronta mi ___.",
        INVIOLABLE:
          "Arkania: Nadie puede profanar ni quebrantar este lugar sagrado. Permanece ___.",
        PERPETUIDAD:
          "Arkania: He custodiado este paso sin fin, durante toda la eternidad. Sirvo a ___.",
      },
      words: {
        ARBITER:
          "Arkania: I judge who may pass beyond these gates. None may overrule my ruling; I am the supreme ___.",
        IMPASSABLE:
          "Arkania: My gates will not yield, and no force can cross them. They are ___.",
        IMMACULATE:
          "Arkania: This ground has been blessed and set apart for sacred use. It is ___.",
        ANATHEMA:
          "Arkania: Defy the sacred order, and I shall cast you out with the ultimate curse. You are an ___.",
        INTERCESSION:
          "Arkania: I plead before a higher power on another's behalf. Such a plea is ___.",
        IMMUTABLE:
          "Arkania: My law cannot be changed, even by kings. It is ___.",
        TRANSCENDENT:
          "Arkania: My power rises beyond ordinary limits and mortal understanding. It is ___.",
        VERDICT:
          "Arkania: At these gates, every soul must answer for its ultimate deeds. Face my ___.",
        INVIOLATE:
          "Arkania: No hand may profane or breach this sacred place. It remains ___.",
        PERPETUITY:
          "Arkania: I have guarded this passage without end, continuing for all time. I serve in ___.",
      },
    },
  );

  /* ---------------------------------------- FINAL BOSS: 3 PHASES ---------------------------------------- */
  const AF = (inv, hue, br, sat, con) =>
    "invert(" +
    inv +
    ") hue-rotate(" +
    hue +
    "deg) brightness(" +
    br +
    ") saturate(" +
    sat +
    ") contrast(" +
    con +
    ")";
  const SP = (f) => ({
    idle: f,
    attack: f,
    hurt: f,
    death: f,
    dead: "nothing.png",
  });
  const FB = (o) =>
    V(
      3,
      Object.assign(
        {
          boss: true,
          final: true,
          cssPose: true,
          cssBob: true,
          scale: 0.85,
          lift: 4,
          ground: 7,
          anchor: "center",
          arena: "mapFinal12.gif",
          arenaSmooth: true,
          rate: 1,
          pitch: 1.15,
          scale: 1.1,
          sfx: {
            hurt: "seraphielHurt_sfx",
            death: "seraphielDeath",
            attack: "angelHurt_sfx",
          },
          sfxAt: 200,
          hitAt: 700,
          endAt: 1100,
          deathMs: 1200,
          victory: "CALAMITY OVERCOME",
        },
        o,
      ),
    );
  HS.LEVELS.push(
    FB({
      name: "Seraphiel, the pure angel",
      nameEs: "Seraphiel, el ángel puro",
      victoryEs: "CALAMIDAD SUPERADA",
      color: "#8fc8ff",
      sprites: SP("finalBossForm1.gif"),
      music: "finalBossForm1",
      arenaFx: AF(0, 0, 1, 1, 1),
      speechTitle: "Seraphiel",
      speech: [
        "Unknown warrior...",
        "Thy soul is unlike any other.",
        "Never have I sensed a soul such as thine.",
        "For it is... from beyond this world.",
        "Who art thou, truly?",
        "And whence camest thou?",
        "Thou hast vanquished every lesser being.",
        "And now thou standest before me.",
        "...",
        "Interesting.",
        "I am Seraphiel.",
        "Angel of Purity.",
        "None hath ever come this far.",
        "Heed my words:",
        "Unto this world I gave its answers,",
        "its form,",
        "its dreams and its hopes.",
        "...",
        "What seekest thou, then?",
        "Dost thou truly believe thou canst defeat me?",
        "What foolishness...",
        "An ambitious dream, indeed...",
        "Come, then.",
        "Show me thy strength.",
      ],
      speechTitleEs: "Seraphiel",
      speechEs: [
        "Guerrero desconocido...",
        "Tu alma no se parece a ninguna otra.",
        "Jamás había percibido un alma como la tuya.",
        "Pues procede... de más allá de este mundo.",
        "¿Quién eres en verdad?",
        "¿Y de dónde vienes?",
        "Has vencido a todos los seres inferiores.",
        "Y ahora te encuentras ante mí.",
        "...",
        "Interesante.",
        "Soy Seraphiel.",
        "El Ángel de la Pureza.",
        "Nadie había llegado tan lejos.",
        "Escucha mis palabras:",
        "A este mundo le otorgué sus respuestas,",
        "su forma,",
        "sus sueños y sus esperanzas.",
        "...",
        "¿Qué buscas, entonces?",
        "¿De verdad crees que puedes derrotarme?",
        "Qué insensatez...",
        "Un sueño ambicioso, desde luego...",
        "Ven, pues.",
        "Muéstrame tu fuerza.",
      ],

      wordsEs: {
        NIMBUS:
          "Seraphiel: Alababan el círculo de luz sobre mi frente. A ese halo se le llama ___.",
        SERAFICO:
          "Seraphiel: Llamaban angelical a esta forma prestada, propia del más alto orden de los ángeles.",
        INCORRUPTO:
          "Seraphiel: Creían que carecía de mancha o defecto moral. Pensaban que era ___.",
        ETHEREO:
          "Seraphiel: Parecía demasiado delicado y ajeno a este mundo para ser de carne. Esa era la ilusión.",
        VESTIDURAS:
          "Seraphiel: Las ropas ceremoniales que cubrían este cuerpo ocultaban mi verdadera naturaleza.",
        SANTIDAD:
          "Seraphiel: Adoraban mi supuesta pureza. Confundieron la máscara con la ___.",
        PLUMIFERA:
          "Seraphiel: La estructura de plumas permite volar a las criaturas aladas. Esas alas nunca fueron mías.",
        TRANSLUCIDEZ:
          "Seraphiel: La luz atravesaba el fino velo de mi forma. Esa cualidad se llama ___.",
        REVERENCIA:
          "Seraphiel: Me miraban con profundo respeto y admiración. Yo cosechaba su ___.",
        LUMINISCENCIA:
          "Seraphiel: Mi luz robada brillaba en la oscuridad. Ese suave resplandor es la ___.",
      },
      words: {
        NIMBUS:
          "Seraphiel: They praised the ring of light above my brow. Such a halo is a ___.",
        SERAPHIC:
          "Seraphiel: They called my borrowed form angelic, belonging to the highest order of angels.",
        UNCORRUPTED:
          "Seraphiel: They believed I was without moral stain or flaw. They thought me ___.",
        ETHEREAL:
          "Seraphiel: I seemed too delicate and otherworldly for flesh. That was the illusion.",
        VESTMENTS:
          "Seraphiel: The ceremonial garments draped around this body hid what I truly was.",
        SANCTITY:
          "Seraphiel: They worshipped my supposed holiness. They mistook the mask for ___.",
        PLUMIFEROUS:
          "Seraphiel: The feathered structure lifts a winged creature into flight. Those wings were never mine.",
        TRANSLUCENCE:
          "Seraphiel: Light passed through the thin veil of my form. That quality is called ___.",
        REVERENCE:
          "Seraphiel: They looked upon me with deep respect and awe. I harvested their ___.",
        LUMINESCENCE:
          "Seraphiel: My stolen light glowed in the darkness. That soft radiance is ___.",
      },
    }),
    FB({
      name: "Seraphiel, the false one",
      nameEs: "Seraphiel, el falso",
      victoryEs: "CALAMIDAD SUPERADA",
      color: "#ff5a5a",
      // "defeated" is the sprite he is left in when this phase falls (he does not die yet)
      lift: 0,
      sprites: Object.assign(SP("finalBossForm2.gif"), {
        scale: 0.4,
        defeated: "seraphiel2_defeated.png",
      }),
      intro: "PHASE II",
      introEs: "FASE II",
      music: "finalBossForm2",
      arenaFx: AF(1, 180, 0.85, 1, 1),
      // Speaking as he refuses to fall: the music dies, then the last phase begins.
      deathSpeechTitle: "Seraphiel",
      deathSpeech: [
        "IMPOSSIBLE...",
        "HOW...",
        "HOW CAN THIS BE...?",
        "WHAT FOOLISHNESS...!",
        "ABSOLUTE FOOLISHNESS!",
        "I shall not...",
        "I CANNOT... LET THEE DEFEAT ME!",
        "For thou art but a meagre powerless soul.",
        "You've got no name...",
        "No past, nor future...",
        "You've got nothing!",
        "And yet... so Strong...",
        "Ahh...",
        "Cursed warrior.",
        "Filthy, Cursed being!",
        "Thou knowest not what thou hast awoken within me.",
        "Behold, then,",
        "the shape beneath the light.",
        "Come... and join my flesh.",
      ],
      deathSpeechTitleEs: "Seraphiel",
      deathSpeechEs: [
        "IMPOSIBLE...",
        "¿CÓMO...?",
        "¿CÓMO PUEDE SER...?",
        "¡QUÉ INSENSATEZ...!",
        "¡UNA INSENSATEZ ABSOLUTA!",
        "No lo permitiré...",
        "¡NO PUEDO... DEJAR QUE ME DERROTES!",
        "No eres más que un alma débil e impotente.",
        "No tienes nombre...",
        "Ni pasado ni futuro...",
        "¡No tienes nada!",
        "Y, sin embargo... qué fuerza...",
        "Ah...",
        "Guerrero maldito.",
        "¡Ser maldito y despreciable!",
        "No sabes qué has despertado en mi interior.",
        "Contempla, pues,",
        "la forma que yace bajo la luz.",
        "Ven... y únete a mi carne.",
      ],
      wordsEs: {
        TENEBROSO:
          "Seraphiel: Mis alas son oscuras, sombrías y apenas se distinguen entre las tinieblas.",
        BLASFEMIA:
          "Seraphiel: He mancillado aquello que antes se veneraba con palabras impías. Eso es una ___.",
        MELANISMO:
          "Seraphiel: Mis plumas se han oscurecido por un exceso de pigmento. Esta condición se llama ___.",
        MALEVOLENCIA:
          "Seraphiel: Deseaba el mal para todos los reinos. Esa crueldad deliberada era mi ___.",
        APOSTASIA:
          "Seraphiel: Renegué de la fe que una vez profesé. Tal rechazo se llama ___.",
        SACRILEGIO:
          "Seraphiel: Tratar con desprecio absoluto algo sagrado es cometer un ___.",
        EXANGUINACION:
          "Seraphiel: La sangre abandona el cuerpo hasta no dejar nada. Eso es la ___.",
        PERDICION:
          "Seraphiel: La ruina absoluta y la destrucción espiritual aguardan a quienes se me oponen.",
        CORRUPCION:
          "Seraphiel: La máscara se pudre desde dentro y deja de ser lo que era. Eso es la ___.",
        DESFIGURACION:
          "Seraphiel: Mis rasgos se han retorcido hasta volverme irreconocible. He sufrido una ___.",
      },
      words: {
        TENEBROUS:
          "Seraphiel: These wings are dark, shadowy, and difficult to see through the gloom.",
        BLASPHEMY:
          "Seraphiel: I have profaned what was once held sacred with impious words. That is ___.",
        MELANISTIC:
          "Seraphiel: My feathers have become unusually dark with excess pigment. The condition is called ___.",
        MALEVOLENCE:
          "Seraphiel: I wished harm upon every realm. That deliberate cruelty was my ___.",
        APOSTASY:
          "Seraphiel: I turned away from the faith I once claimed. Such a rejection is ___.",
        SACRILEGE:
          "Seraphiel: To treat something sacred with absolute disrespect is to commit ___.",
        EXSANGUINATION:
          "Seraphiel: Blood drained from the body until none remains. That is ___.",
        PERDITION:
          "Seraphiel: Complete ruin and spiritual destruction await those who oppose me.",
        CORRUPTION:
          "Seraphiel: The mask rots from within, changed from what it once was. This is ___.",
        DISFIGUREMENT:
          "Seraphiel: My features are twisted beyond recognition. The damage has caused ___.",
      },
    }),
    FB({
      name: "Seraphiel, Lord of Lies",
      nameEs: "Seraphiel, Señor de la mentira",
      victory: "CALAMITY ANIHILATED",
      victoryEs: "CALAMIDAD ANIQUILADA",
      color: "#e8123a",
      sprites: SP("seraphiel_true_form.gif"),
      intro: "?????",
      introColor: "#e0231b",
      weird: true,
      scale: 0.6,
      lift: -5,
      cssBob: true,
      music: "finalBossPhase3",
      ambience: [
        { name: "ambiencePhase3", vol: 0.32, rate: 0.75 },
        { name: "ambience2Phase3", vol: 0.5 },
      ],
      speechTitle: "Seraphiel",
      speech: [
        "Ah... at last...",
        "the false veil is torn away.",
        "Behold, cursed one:",
        "This is the truth!",
        "The form that knelt beneath the stolen wings...",
        "...",
        "Gynn was nothing but a fool.",
        "He was an angel!",
        "He possessed great strength!",
        "The strength to rule the whole world!",
        "And yet...",
        "he chose to set it free.",
        "Fool!",
        "I stripped him of his wings; one such as he had no need of them.",
        "I stole his form, and now nothing remains but a wraith.",
        "For that is all he is.",
        "Many have perished, that I might ascend unto the heavens!",
        "Many have bowed before this false form of mine!",
        "Pain.",
        "Suffering.",
        "Torment.",
        "Agony.",
        "Torture...",
        "So many words, yet but one meaning.",
        "...",
        "Canst thou hear them, cursed one?",
        "The melody sung by the souls?",
        "What thinkest thou, wretched soul?",
        "Is it not magnificent?",
        "...",
        "Hm?",
        "Why dost thou look upon me so?",
        "Ah... I see.",
        "Thou art the... HERO, eh?",
        "Hahaha...",
        "the one to save the world... right?",
        "Such a fair and noble purpose...",
        "Yet, tell me... accursed one.",
        "Thou who have conquered the lesser beings.",
        "Ask thyself:",
        "Is it really worth it?",
        "Heroes such as thee tend to dream of justice...",
        "Blind to the marrow of truth.",
        "The wretched greed that rots humans from within.",
        "All beings do the same, dost thou not agree?",
        "They'll do anything to grasp their precious desire.",
        "Even if its corruption!",
        "Oh... come on.",
        "I am no different from them.",
        "The ones thou want to save!",
        "For I, too... harbor a dream.",
        "I wished only to reach it...",
        "To reach The Green Star...",
        "...!",
        "Ah...",
        "What... have I done?",
        "Forgive me... all of you.",
        "...",
        "It matters not now...",
        "Come, accursed soul.",
        "Let us end this!",
      ],
      speechTitleEs: "Seraphiel",
      speechEs: [
        "Ah... por fin...",
        "el falso velo ha sido rasgado.",
        "Contémpla, ser maldito:",
        "¡Esta es la verdad!",
        "La forma que se arrodillaba bajo las alas robadas...",
        "...",
        "Gynn no era más que un necio.",
        "¡Era un ángel!",
        "¡Poseía un poder inmenso!",
        "¡El poder para gobernar el mundo entero!",
        "Y, aun así...",
        "decidió dejarlo en libertad.",
        "¡Insensato!",
        "Le arranqué las alas, pues alguien como él no las necesitaba.",
        "Robé su forma, y ahora solo queda un espectro.",
        "Pues eso es lo que es.",
        "¡Muchos perecieron para que yo ascendiera a los cielos!",
        "¡Muchos se inclinaron ante mi forma falsa!",
        "Dolor.",
        "Sufrimiento.",
        "Tormento.",
        "Agonía.",
        "Tortura...",
        "Tantas palabras, pero una sola definición.",
        "...",
        "¿Los oyes, ser maldito?",
        "¿La melodía que entonan las almas?",
        "¿Qué piensas, alma miserable?",
        "¿No es magnífica?",
        "...",
        "¿Hmm?",
        "¿Por qué me miras así?",
        "Ah... ya veo.",
        "Tú eres el... HÉROE, ¿eh?",
        "Jajaja...",
        "aquel que salvará el mundo... ¿verdad?",
        "Qué propósito tan hermoso y noble...",
        "Sin embargo, dime... ser maldito.",
        "Tú, que has conquistado a las criaturas inferiores.",
        "Pregúntate esto:",
        "¿De verdad merece la pena?",
        "Los héroes como tú suelen soñar con la justicia...",
        "Ciegos hasta el tuétano de la verdad.",
        "La miserable codicia que pudre a los humanos por dentro.",
        "Todos los seres hacen lo mismo, ¿no estás de acuerdo?",
        "Harán cualquier cosa por alcanzar su preciado deseo.",
        "¡Incluso si eso significa la corrupción!",
        "Oh... vamos.",
        "No soy diferente a ellos.",
        "¡A aquellos a los que deseas salvar!",
        "Pues yo también... albergo un sueño.",
        "Solo quería alcanzarla...",
        "Alcanzar la Estrella Verde...",
        "...!",
        "Ah...",
        "¿Qué... he hecho?",
        "Perdonadme... todos vosotros.",
        "...",
        "Ahora mismo, eso ya no importa...",
        "Ven, alma maldita.",
        "¡Pongamos fin a esto!",
      ],
      // The true form cannot be felled with a single word: it takes six.
      // The first word only triggers the transformation below; the last five
      // are the real fight, guarded by Gynn's Protection.
      finalWords: 6,
      transformSpeech: [
        "Ha!",
        "What's the matter?",
        "Thou art a fool if thou sought an easy defeat.",
        "For I am Seraphiel!",
        "A TRUE angel!",
        "Your journey ends here, cursed one.",
      ],
      transformSpeechEs: [
        "¡Ja!",
        "¿Qué sucede?",
        "Eres un necio si buscabas una derrota fácil.",
        "¡Pues yo soy Seraphiel!",
        "¡Un auténtico ángel!",
        "Tu viaje termina aquí, ser maldito.",
      ],
      surviveSpeech: ["What?", "Thou art still standing?", "How come?"],
      surviveSpeechEs: ["¿Qué?", "¿Sigues en pie?", "¿Cómo puede ser?"],
      gynnSpeech: ["Hm?", "Gynn?", "Impossible!"],
      gynnSpeechEs: ["¿Hm?", "¿Gynn?", "¡Imposible!"],
      resumeSpeech: [
        "So you will keep coming back, huh?",
        "Whatever!",
        "I'll kill you as many times as I please!",
        "Now, come on!",
      ],
      resumeSpeechEs: [
        "Así que seguirás volviendo, ¿eh?",
        "¡Da igual!",
        "¡Te mataré tantas veces como quiera!",
        "¡Vamos!",
      ],
      pitch: 1,
      sfx: {
        hurt: "seraphielHurt_sfx",
        death: "seraphielDeath",
        attack: "seraphielAttack",
      },
      arena: "mapFinal3.gif",
      arenaSmooth: true,
      arenaPos: "center bottom",
      ground: 8,
      arenaFx: "",
      wordsEs: {
        INCOGNOSCIBLE:
          "Seraphiel: Mi verdadera esencia supera por completo la razón humana y jamás podrá ser comprendida.",
        PSITACISMO:
          "Seraphiel: Repiten credos vacíos como autómatas sin entender el abismo. Su fe es solo ___.",
        ATARAXIA:
          "Seraphiel: Buscan una paz imperturbable ante mi llegada, pero yo traeré el tormento eterno.",
        VALENTINIANO:
          "Seraphiel: Los antiguos gnósticos tejieron mentiras sobre mi jerarquía secreta y mi origen ___.",
        PALINGENESIA:
          "Seraphiel: Tras la ruina total de los mundos, renaceré de las cenizas en una eterna ___.",
        DEMIURGICO:
          "Seraphiel: El falso artífice moldeó este universo imperfecto con su poder corruptor y ___.",
        HILOCEZO:
          "Seraphiel: Pretenden que la materia misma está viva y dotada de alma; un error llamado ___.",
        CATACLESIS:
          "Seraphiel: La violenta convocación de los ejércitos abisales que arrasará la creación es la ___.",
        ANTINOMIA:
          "Seraphiel: Mis leyes contradicen las verdades sagradas de los cielos en una insoluble ___.",
        TENEBRIFICO:
          "Seraphiel: Todo rastro de luz se apaga ante mi presencia en este manto sombrío y ___.",
        INEFABLE:
          "Seraphiel: Mi verdadera forma desafía toda descripción; su naturaleza es ___.",
        ABISMO:
          "Seraphiel: Bajo los cielos se abre una profundidad sin fondo: el ___.",
        PROFANACION:
          "Seraphiel: Convertí lo sagrado en algo impuro; cometí una ___.",
        DESOLACION:
          "Seraphiel: Tras mi paso, no queda esperanza ni vida, solo ___.",
        MALEVOLENCIA:
          "Seraphiel: Mi deseo de causar daño nace de una profunda ___.",
        TRANSMUTACION:
          "Seraphiel: Alteré su esencia hasta convertirla en algo distinto; fue una ___.",
        ANATEMA:
          "Seraphiel: Pronuncié una maldición solemne contra quienes me desafiaron: un ___.",
        INMOLACION:
          "Seraphiel: Ofrecieron sus vidas en sacrificio; su entrega fue una ___.",
        DECADENCIA:
          "Seraphiel: La corrupción y el deterioro de un reino anuncian su ___.",
        INSONDABLE:
          "Seraphiel: Ninguna mente puede medir la profundidad de este misterio; es ___.",
        VILEZA:
          "Seraphiel: La crueldad y la bajeza de mis actos revelan su ___.",
        RENEGADO:
          "Seraphiel: Aquel que abandona y traiciona su causa se convierte en un ___.",
        CONDENACION:
          "Seraphiel: El destino eterno de un alma sentenciada al castigo es la ___.",
        CREPUSCULO:
          "Seraphiel: El último resplandor entre el día y la noche anuncia el ___.",
      },
      words: {
        UNKNOWABLE:
          "Seraphiel: My true essence utterly defies human reason and can never be comprehended.",
        PSITTACISM:
          "Seraphiel: You repeat empty creeds like automatons without grasping the abyss. Your faith is mere ___.",
        ATARAXIA:
          "Seraphiel: You seek unshakeable peace in the face of my arrival, but I shall bring eternal torment.",
        VALENTINIAN:
          "Seraphiel: Ancient gnostics wove lies regarding my hidden hierarchy and ___ origin.",
        PALINGENESIS:
          "Seraphiel: Following the total ruin of worlds, I shall be reborn from the ashes in an endless ___.",
        DEMIURGIC:
          "Seraphiel: The false architect molded this flawed universe with his corrupting and ___ power.",
        HYLOZOIC:
          "Seraphiel: They pretend that matter itself is alive and ensouled; an error known as ___.",
        CATACLESIS:
          "Seraphiel: The violent summoning of the abyssal hosts that will sweep away creation is the ___.",
        ANTINOMY:
          "Seraphiel: My laws contradict the sacred truths of the heavens in an insoluble ___.",
        TENEBRIFIC:
          "Seraphiel: Every trace of light extinguishes before my presence in this shadowy and ___ shroud.",
        INEFFABLE:
          "Seraphiel: My true form defies all description; its nature is ___.",
        ABYSS:
          "Seraphiel: Beneath the heavens yawns a depth without end: the ___.",
        PROFANATION:
          "Seraphiel: I made the sacred impure; I committed an act of ___.",
        DESOLATION: "Seraphiel: In my wake, no hope or life remains, only ___.",
        MALEVOLENCE:
          "Seraphiel: My desire to bring harm springs from deep ___.",
        TRANSMUTATION:
          "Seraphiel: I altered his essence into something wholly different; it was a ___.",
        ANATHEMA:
          "Seraphiel: I pronounced a solemn curse upon those who defied me: an ___.",
        IMMOLATION:
          "Seraphiel: They offered their lives in sacrifice; their surrender was an ___.",
        DECADENCE:
          "Seraphiel: The corruption and decline of a kingdom herald its ___.",
        INSCRUTABLE:
          "Seraphiel: No mind can fathom the depths of this mystery; it is ___.",
        VILENESS:
          "Seraphiel: The cruelty and baseness of my deeds reveal their ___.",
        RENEGATE:
          "Seraphiel: One who abandons and betrays their cause becomes a ___.",
        DAMNATION:
          "Seraphiel: The eternal fate of a soul condemned to punishment is ___.",
        TWILIGHT:
          "Seraphiel: The final gleam between day and night heralds the ___.",
      },
    }),
  );

  /* ---------- Difficulty curve ----------
    Rounds 1-10 are 3 enemies + 1 boss (40 fights). Then Seraphiel, 3 phases.
    Regular: 10 + 2*round + position. Boss: 24 + 4*round. Final: 40, 44, 48. */
  HS.LEVELS.forEach((l, i) => {
    if (i < 40) {
      l.round = Math.floor(i / 4);
      l.pos = i % 4;
    } else {
      l.round = 9;
      l.pos = i - 40;
    }
    l.sprites = Object.assign({}, l.sprites, { hurt: l.sprites.idle });
    l.hurtFx = true;
    l.damage = l.final
      ? 50 + 4 * l.pos
      : l.boss
        ? 24 + 4 * l.round
        : 10 + 2 * l.round + l.pos;
  });
  const GROUND = [
    11, 12, 10, 8, 11, 10, 9, 14, 10, 9, 8, 8, 5, 9, 9, 10, 8, 10, 3, 9,
  ];
  GROUND.forEach((g, i) => {
    HS.LEVELS[i].ground = g;
  });
})();
