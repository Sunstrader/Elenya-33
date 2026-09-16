/** V52 — fragment DB ACTE4.
 * Généré depuis V51.7.6 sans réécriture narrative.
 * 24 scènes.
 */
function _dbActe4V52_() {
  return {
'ACTE4_01_DEPART_VILLAGE': {
  sceneNumber: 'ACTE4_01_DEPART_VILLAGE', 
  chapter: 4, 
  title: "Le Dôme Mobile", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/D%C3%B4me_magique_en_ascension_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let intro = "";
    if (gs.hasFlag('compagnons_enchaines')) {
      intro = "Les stigmates des fers du culte marquent encore les poignets d’Alistair et de Kaelen — des bracelets de peau rouge qu’aucun des deux n’a mentionnés.\n\n";
    } else if (gs.hasFlag('alistair_emprisonne')) {
      intro = "Les stigmates des fers du culte marquent encore les poignets d’Alistair.\n\n";
    }
    return intro + "L’ascension finale s’opère au-delà des limites viables du monde. Le blizzard arrache des blocs de roche. Levant la Larme d’Ébène, tu structures la tempête : un dôme de glace translucide s’élève pour encapsuler votre trio, divisé en trois alcôves étanches — une dernière nuit, avant que tout ne se décide. La nef s’arrache à la montagne vers la Citadelle.";
  },
  choices: [
    { key: 'A', text: "Traverser la structure vers l’espace de nuit.", next: 'ACTE4_01_HALTE_DOME' }
  ]
},

'ACTE4_01_HALTE_DOME': {
  sceneNumber: '4.01.ADD', 
  chapter: 4, 
  title: "Au Cœur du Dôme", 
  mood: 'exploration',
  getDynamicNarrative: (gs) => "Pendant la montée, la structure du dôme gémit sous la pression des vents d’altitude. La barrière tiendra, mais de justesse.",
  choices: [
    { key: 'AVANCER', text: "Rejoindre la zone des alcôves.", next: 'ACTE4_02_CHOIX_CHAMBRE' }
  ]
},

'ACTE4_02_CHOIX_CHAMBRE': {
  sceneNumber: 'ACTE4_02_CHOIX_CHAMBRE',
  chapter: 4,
  title: "Derrière le Givre",
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Int%C3%A9rieur_du_d%C3%B4me\_(alc%C3%B4ves)_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  getDynamicNarrative: (gs) => {
    let text = "À travers la cloison gauche, l’Ombre de Kaelen glisse le long des parois, patiente comme une lame qui attend son heure. À droite, Alistair courbe l’échine sous son halo doré mourant, une lumière qui semble s’excuser d’exister encore.\n\n";

    if (gs.getGauge('instabilite') >= 30) {
      text += "Tes pupilles blanches illuminent les trois alcôves. Tu n’as plus besoin de choisir : tu es déjà la souveraine de ce huis clos. Le givre qui s’élève de tes doigts n’est plus une barrière. C’est un trône.\n\n";
    } else if (gs.getGauge('instabilite') >= 15) {
      text += "Le givre a grimpé jusqu’à tes tempes. Chaque respiration que tu prends fait geler un peu plus l’air entre vous. Ils le sentent. Ils attendent.\n\n";
    } else {
      text += "Tu as encore le luxe de l’hésitation. Pour l’instant.\n\n";
    }

    text += "La souveraine détient l’arbitrage absolu de ce huis clos.";
    text += "\n\nLe dôme gémit sous le vent d’altitude. Une dernière nuit. Après ça, plus rien ne sera négociable.";
    return text;
  },
  choices: [
    {
      key: 'O',
      condition: (gs) => COND.canIntimateO(gs, 4),
      text: "Dissoudre la cloison gauche. Revendiquer l’obscurité de Kaelen.",
      effects: [{ type: "SET_FLAG", target: "go_O" }],
      next: 'ACTE4_03_SPICY_KAELEN'
    },
    {
      key: 'E',
      condition: (gs) => COND.canIntimateE(gs, 4),
      text: "Fissurer le Sceau d’Alistair. Consumer le reste de sa sainte Lumière.",
      effects: [{ type: "SET_FLAG", target: "go_E" }],
      next: 'ACTE4_03_SPICY_ALISTAIR'
    },
    {
      key: 'DOMINER',
      condition: (gs) => COND.domination(gs) && companionPresentO(gs) && companionPresentE(gs),
      text: "« Les deux. Maintenant. À genoux. »",
      effects: [
        { type: "SET_FLAG", target: "go_poly_domination" },
        { type: "ADD_GAUGE", target: "instabilite", value: 2 }
      ],
      next: 'ACTE4_04_POLY_DOMINATION'
    },
    {
      key: 'S',
      text: "Sceller tes parois de givre. Tu n’as besoin d’aucun de leurs masques.",
      effects: [
        { type: "SET_FLAG", target: "nuit_solo_acte4" },
        { type: "SET_FLAG", target: "voie_solo_profonde" },
        { type: "ADD_GAUGE", target: "volonte", value: 2 }
      ],
      next: 'ACTE4_04_COMMUNION_FINALE_SOLO'
    }
  ]
},

'ACTE4_03_SPICY_KAELEN': {
    sceneNumber: 'ACTE4_03_SPICY_KAELEN',
    chapter: 4,
    title: "Le Fil de la Lame",
    mood: 'romance',
    image: "https://drive.google.com/thumbnail?id=1gW_9DxYNy1S5Ger4EUtkT1DX_V4-3nPH&sz=w1920",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
    voice: "",
    getDynamicNarrative: (gs) => {
      let text = "Le givre s'efface. Kaelen ne dit rien. Il n'a jamais dit grand-chose.\n\n" +
        "Il pose ses dagues sur la pierre. Une par une. Comme on dépose des armes devant un roi.\n\n" +
        "Puis il s'assoit. Dos au mur. Yeux sur toi.\n\n" +
        "« Je ne bougerai pas, » dit-il. « Sauf si tu me le demandes. »\n\n" +
        "Ce n'est pas une reddition. C'est un contrat. Le premier qu'il propose sans y être forcé.\n\n";
      if (gs.hasFlag('dague_kaelen_prise')) {
        text += "Tu as sa dague à la ceinture. Il le sait. Il sait que tu pourrais le tuer avant qu'il ne cligne des yeux.\n\n" +
          "C'est pour ça qu'il est resté. Pas par confiance. Par calcul. Ou par quelque chose qui n'a pas encore de nom.\n\n";
      }
      if (gs.hasFlag('kaelen_sub')) {
        text += "Il attend. Pas comme un chien. Comme un homme qui a enfin trouvé une pièce où il peut rester sans avoir à justifier sa présence.\n\n";
      } else {
        text += "Il attend. Pas comme un chien. Comme un homme qui a enfin trouvé une pièce où il peut poser ses armes sans qu'on les lui arrache.\n\n";
      }
      text += "Le feu du dôme crépite. Dehors, le blizzard hurle. Ici, pour la première fois, le silence n'est pas une arme.";
      return text;
    },
    choices: [
      {
        key: 'A_DOM',
        text: "T'approcher. Prendre son visage entre tes mains. Sans un mot.",
        effects: [
          { type: "SET_FLAG", target: "nuit_kaelen" },
          { type: "SET_FLAG", target: "kaelen_dom" }
        ],
        next: 'ACTE4_05_ARRIVEE_PORTES_1'
      },
      {
        key: 'A_SUB',
        text: "T'asseoir en face de lui. Laisser le silence faire le reste.",
        effects: [
          { type: "SET_FLAG", target: "nuit_kaelen" },
          { type: "SET_FLAG", target: "kaelen_sub" }
        ],
        next: 'ACTE4_05_ARRIVEE_PORTES_1'
      },
      {
        key: 'B',
        text: "Te lever. Sortir. Le laisser seul avec ses dagues posées.",
        effects: [{ type: "SET_FLAG", target: "kaelen_refuse" }],
        response: "Kaelen ne te retient pas. Il reprend ses dagues seulement lorsque la cloison s'est refermée derrière toi.",
        next: 'ACTE4_05_ARRIVEE_PORTES_1'
      }
    ]
  },

'ACTE4_03_SPICY_ALISTAIR': {
    sceneNumber: 'ACTE4_03_SPICY_ALISTAIR',
    chapter: 4,
    title: "Le Péché Sacré",
    mood: 'romance',
    image: "https://drive.google.com/thumbnail?id=1eFby2N2lliUBuDgEQ7pNGAEASXKsLGkc&sz=w1920",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
    voice: "",
    getDynamicNarrative: (gs) => {
      let text = "Le Sceau de givre se brise. Alistair ne dit rien. Il n'a plus de mots depuis longtemps.\n\n" +
        "Il s'agenouille. Pas en prière. En homme qui a enfin trouvé un autel où il peut poser son fardeau.\n\n" +
        "Son insigne est éteint. Il le pose à côté de lui. Comme on dépose une lettre qu'on n'osera plus relire.\n\n" +
        "« Je ne te demanderai rien, » dit-il. « Sauf de me regarder. »\n\n" +
        "Ce n'est pas une prière. C'est un aveu. Le premier qu'il fait sans y être forcé.\n\n";
      if (gs.hasFlag('alistair_pure')) {
        text += "Il attend. Pas comme un pénitent. Comme un homme qui a enfin trouvé une lumière qui ne le brûle pas.\n\n";
      } else {
        text += "Il attend. Pas comme un pénitent. Comme un homme qui a enfin trouvé une porte qu'il peut ouvrir sans qu'on la lui arrache.\n\n";
      }
      text += "Le feu du dôme crépite. Dehors, le blizzard hurle. Ici, pour la première fois, le silence n'est pas une cage.";
      return text;
    },
    choices: [
      {
        key: 'A_CORRUPT',
        text: "T'approcher. Prendre son visage entre tes mains. Sans un mot.",
        effects: [
          { type: "SET_FLAG", target: "nuit_alistair" },
          { type: "SET_FLAG", target: "alistair_corrupt" }
        ],
        next: 'ACTE4_05_ARRIVEE_PORTES_1'
      },
      {
        key: 'A_PURE',
        text: "T'asseoir en face de lui. Laisser le silence faire le reste.",
        effects: [
          { type: "SET_FLAG", target: "nuit_alistair" },
          { type: "SET_FLAG", target: "alistair_pure" }
        ],
        next: 'ACTE4_05_ARRIVEE_PORTES_1'
      },
      {
        key: 'B',
        text: "Te lever. Sortir. Le laisser seul avec son insigne éteint.",
        effects: [{ type: "SET_FLAG", target: "alistair_refuse" }],
        response: "Alistair incline la tête et te laisse partir. La porte reste ouverte, mais il ne la franchit pas à ta place.",
        next: 'ACTE4_05_ARRIVEE_PORTES_1'
      }
    ]
  },

'ACTE4_04_POLY_DOMINATION': {
  sceneNumber: '4.04.DOM',
  chapter: 4,
  title: "Le Trône de Chair et de Givre",
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Int%C3%A9rieur_du_d%C3%B4me\_(alc%C3%B4ves)_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "Le givre obéit. Les deux cloisons s’effondrent simultanément.\n\n";
    text += "Kaelen et Alistair se retrouvent face à toi, le souffle court, le regard levé vers tes pupilles blanches.\n\n";
    text += "« À genoux, » as-tu dit. Ce n’était pas une invitation.\n\n";
    text += "Ils s’agenouillent. L’un avec un sourire carnassier, l’autre avec une dévotion brisée. Le dôme n’est plus un abri. C’est une salle du trône.\n\n";
    text += "Tu n’as plus besoin de choisir. Tu les prends tous les deux.";
    return text;
  },
  choices: [
    {
      key: 'A',
      text: "Sourire dans l’obscurité. Leurs chaînes sont scellées.",
      effects: [
        { type: "SET_FLAG", target: "nuit_kaelen" },
        { type: "SET_FLAG", target: "nuit_alistair" },
        { type: "SET_FLAG", target: "domination_finale" }
      ],
      next: 'ACTE4_05_ARRIVEE_PORTES_1'
    }
  ]
},

'ACTE4_04_COMMUNION_FINALE_SOLO': {
  sceneNumber: 'ACTE4_04_COMMUNION_FINALE_SOLO', 
  chapter: 4, 
  title: "La Reine Seule", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Int%C3%A9rieur_du_d%C3%B4me_(alc%C3%B4ves)_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Fen%20bg/SPRITE_FEN_ASSIS_FACE_FIX_202606231738.png",
  voice: "",
  text: `Tu verrouilles tes parois de glace, isolant ton dôme de leurs souffles de mortels. Fen se love contre ta gorge, son souffle chaud rappelant l’ancienne alliance avec Kalthar. Tu feras face à ton Trône entière, intouchable, libre de toute redevance.`,
  choices: [
    { key: 'A', text: "Fermer les yeux. Attendre l’aube du Zéro Absolu.", effects: [{ type: "SET_FLAG", target: "solo_identite_finale" }], next: 'ACTE4_05_ARRIVEE_PORTES_1' }
  ]
},

'ACTE4_04_POLY_ALISTAIR': {
  sceneNumber: 'ACTE4_04_POLY_ALISTAIR', 
  chapter: 4, 
  title: "Le Fruit Défendu", 
  mood: 'romance',
  image: "https://drive.google.com/thumbnail?id=1eFby2N2lliUBuDgEQ7pNGAEASXKsLGkc&sz=w1920",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "La peau encore marquée par les morsures de Kaelen, tu glisses dans l’alcôve du clerc. Alistair capte instantanément l’odeur de cuir et de cendre de son rival.\n\n";
    if (gs.hasFlag('reve_poly')) {
      text += "Il n’y a plus de sirène ni de fièvre magique pour lui servir d’excuse ce soir. La jalousie pure, fanatique, ravage ce qu’il lui reste de sainte réserve. ";
    } else {
      text += "Brisé par un accès de jalousie fanatique, sa sainte réserve s’effondre. ";
    }
    text += "Il se jette sur toi avec la fureur d’un inquisiteur qui châtie sa propre idole.";
    return text;
  },
  choices: [
    { key: 'A', text: "Sourire dans l’obscurité. Leurs chaînes sont scellées, tu les possèdes tous deux.", effects: [{ type: "SET_FLAG", target: "nuit_alistair" }, { type: "SET_FLAG", target: "nuit_kaelen" }], next: 'ACTE4_05_ARRIVEE_PORTES_1' }
  ]
},

'ACTE4_04_POLY_KAELEN': {
  sceneNumber: 'ACTE4_04_POLY_KAELEN', 
  chapter: 4, 
  title: "La Marque de l’Ombre", 
  mood: 'romance',
  image: "https://drive.google.com/thumbnail?id=1gW_9DxYNy1S5Ger4EUtkT1DX_V4-3nPH&sz=w1920",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Encore imprégnée de la chaleur sacrée du prêtre, tu pénètres dans le dôme de l’assassin.\n\n";
    if (gs.hasFlag('reve_poly')) {
      text += "« On remet ça, Reine ? Mais cette fois, personne ne pourra accuser la fièvre, » gronde-t-il.\n";
    } else {
      text += "« Tu viens te décrasser de son encens ecclésiastique dans mes bras ? » gronde-t-il.\n";
    }
    text += "Sa main agrippe tes poignets pour te coller contre sa poitrine. Ses lèvres effacent les caresses d’Alistair avec une ardeur agressive.";
    return text;
  },
  choices: [
    { key: 'A', text: "T’abandonner à la rivalité sauvage de la meute.", effects: [{ type: "SET_FLAG", target: "nuit_kaelen" }, { type: "SET_FLAG", target: "nuit_alistair" }], next: 'ACTE4_05_ARRIVEE_PORTES_1' }
  ]
},

'ACTE4_05_ARRIVEE_PORTES_1': {
  sceneNumber: 'ACTE4_05_ARRIVEE_PORTES_1', 
  chapter: 4, 
  title: "L’Aube", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Vaste_parvis_de_pierre_gel%C3%A9e_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Le dôme de lévitation s’immobilise. Les parois de glace fondent instantanément pour vous livrer au parvis des Portes Noires de la Citadelle.\n\n";

    if (gs.hasFlag('double_jeu')) {
      text += "L’atmosphère sature de haine. Alistair observe Kaelen avec des yeux de tueur, crucifié par ta duplicité.\n";
    } else if (gs.hasFlag('nuit_alistair')) {
      if (gs.hasFlag('alistair_corrupt')) {
        text += "Alistair marche à tes côtés, le visage encore marqué par la honte — et par autre chose. Sa vertu a plié. Il le sait. Il ne regarde plus le ciel.\n";
      } else if (gs.hasFlag('alistair_pure')) {
        text += "Alistair te couve d’un regard transi, dévot, presque apaisé. Pour la première fois, sa foi et son désir ne se combattent plus.\n";
      } else {
        text += "Alistair te couve d’un regard transi, dévot, mais une tension terrible tord ses traits.\n";
      }
    } else if (gs.hasFlag('nuit_kaelen')) {
      if (gs.hasFlag('kaelen_dom')) {
        text += "Kaelen se maintient dans ton ombre, la mâchoire serrée. Il a cédé — et il n’a pas l’habitude. Son regard sur toi est plus lourd qu’avant.\n";
      } else if (gs.hasFlag('kaelen_sub')) {
        text += "Kaelen marche trop près. Sa main frôle parfois la tienne, comme s’il vérifiait que tu es encore réelle. L’Ombre a goûté, et elle n’a pas fini.\n";
      } else {
        text += "Kaelen se maintient dans ton ombre immédiate, surveillant les moindres spasmes du prêtre.\n";
      }
    } else if (gs.hasFlag('nuit_solo_acte4')) {
      text += "Les deux rivaux observent une distance clinique, intimidés par ta froideur souveraine.\n";
    }

    if (gs.hasFlag('kaelen_a_dit_ton_monstre')) {
      text += "\nKaelen évite le mot qu’il t’avait jeté autrefois — monstre. Cette fois, son silence ressemble à une excuse qu’il n’ose pas encore prononcer.\n";
    }
    if (gs.hasFlag('alistair_a_promis_cage')) {
      text += "\nAlistair regarde les Portes Noires puis détourne les yeux. La promesse d’une cage qu’il avait autrefois appelée protection revient entre vous comme une dette encore vivante.\n";
    }
    if (gs.hasFlag('possession_warning_ecoute')) {
      text += "\nTu te souviens de l’instant où tu as ouvert la main au lieu de serrer davantage. Le geste minuscule te paraît maintenant plus difficile que tous les trônes.\n";
    } else if (gs.hasFlag('possession_warning_ignore')) {
      text += "\nTu te souviens de l’avertissement que tu as choisi d’ignorer. Depuis, chaque porte ressemble davantage à quelque chose qu’on pourrait verrouiller.\n";
    }

    text += "\n\nLes vantaux d’obsidienne exigent le sacrifice de la Larme.";
    return text;
  },
  choices: [
    { key: 'NEXT', text: "Déployer la Larme d’Ébène devant l’alliage...", next: 'ACTE4_06_MASQUE_TOMBE_1' },
    {
      key:'V517_DEFERRED_O',
      condition:(gs)=>gs.hasFlag('_romance_deferred_O')&&COND.companionPresentO(gs)&&!gs.hasFlag('_romance_beat_recent'),
      text:"Revenir vers Kaelen. Cette conversation n'a pas disparu.",
      intent:'confiance',target:'Kaelen',importance:'significant',
      effects:[{type:'PUSH_RETURN',target:'ACTE4_05_ARRIVEE_PORTES_1'}],
      next:'ROMANCE_DEFERRED_KAELEN'
    },
    {
      key:'V517_DEFERRED_E',
      condition:(gs)=>gs.hasFlag('_romance_deferred_E')&&COND.companionPresentE(gs)&&!gs.hasFlag('_romance_beat_recent'),
      text:"Revenir vers Alistair. Cette conversation n'a pas disparu.",
      intent:'confiance',target:'Alistair',importance:'significant',
      effects:[{type:'PUSH_RETURN',target:'ACTE4_05_ARRIVEE_PORTES_1'}],
      next:'ROMANCE_DEFERRED_ALISTAIR'
    }
  ]
},

'ACTE4_06_MASQUE_TOMBE_1': {
  sceneNumber: 'ACTE4_06_MASQUE_TOMBE_1', 
  chapter: 4, 
  title: "La Chute des Masques", 
  mood: 'action',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Vaste_parvis_de_pierre_gel%C3%A9e_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "URL_VOIX_ALISTAIR",
  getDynamicNarrative: (gs) => {
    let text = "L’instant bascule. Alistair s’interpose entre la serrure et toi, son insigne crevant la pénombre d’un éclat d’or tranchant.\n\n";
    text += "« Le premier jour, je t’ai juré de briser tes chaînes, Elenya, » lâche l’Inquisiteur, et pour la première fois, sa voix ne tremble pas de ferveur mais de honte. « Mais mon Ordre refuse de détruire l’arme continentale que tu incarnes. Ce Sceau Solaire va figer ta conscience à jamais — des chaînes dorées, pour que le monde dorme mieux. »\n\n";
    
    if (gs.hasFlag('ton_douceur')) {
      text += "Son armure morale se fissure : « ";
      if (gs.hasFlag('alistair_perdu')) text += "J’ai ressenti ta douceur quand nous avons quitté les ruines... ";
      else text += "J’ai vu l’amertume de ton sacrifice... ";
      text += "Tu n’es pas le démon de leurs sermons. »\n";
    }

    if (gs.hasFlag('nuit_alistair') && !gs.hasFlag('double_jeu')) text += "Des larmes de sang s’évaporent. « Je t’aime... pardonne mon hérésie. »";
    else if (gs.hasFlag('double_jeu')) text += "« Tu n’es qu’une courtisane de givre et de vice, » crache-t-il.";
    else text += "« Ton éveil s’arrête ici, anomalie. »";
    return text;
  },
  choices: [
    { key: 'NEXT', text: "Faire face à sa trahison...", next: 'ACTE4_06_MASQUE_TOMBE_2' },
    { key: 'KNEW', 
  text: "« Je savais déjà. Ou j’aurais dû savoir. Montre-moi que tu ne mens pas encore. »", 
  effects: [
    { type: "SET_FLAG", target: "alistair_confronte" }
  ], 
  next: 'ACTE4_06_MASQUE_TOMBE_2' 
},
  ]
},

'ACTE4_06B_TEST_KAELEN': {
  sceneNumber: '4.06B',
  chapter: 4,
  title: "La Lame à Nu",
  mood: 'tension',
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('dague_kaelen_prise')) {
      let t = "Kaelen te fixe longuement. Puis, lentement, il sort sa dernière dague et te tend la garde.\n\nIl s’arrête à mi-geste. Son regard glisse vers ta ceinture, là où repose déjà l’autre lame — la sienne.\n\n";
      if (gs.hasFlag('dague_sang')) {
        t += "Il remarque une tache sombre près de la garde. « Tu l’as fait saigner. Au village. » Un battement. « Bien. »\n\n";
      }
      t += "« Tu en as déjà une. » Un sourire étrange, presque fatigué. « La mienne. »\n\nIl te tend quand même la seconde.\n\n« Alors plante celle-là. Si je mens. »\n\nIl n’y a aucune ironie dans sa voix. Seulement une fatigue ancienne.\n\n« Les Confrères m’ont payé pour te livrer. J’ai pris l’argent. Puis j’ai changé d’avis. C’est tout. Pas de grand serment. Pas de destinée. Juste un tueur qui a décidé de garder ce qu’on lui avait dit de vendre. »";
      return t;
    }
    return "Kaelen te fixe longuement. Puis, lentement, il retourne l’une de ses dagues et te tend la garde.\n\n« Tiens. Si je mens, plante-la. »\n\nIl n’y a aucune ironie dans sa voix. Seulement une fatigue ancienne.\n\n« Les Confrères m’ont payé pour te livrer. J’ai pris l’argent. Puis j’ai changé d’avis. C’est tout. Pas de grand serment. Pas de destinée. Juste un tueur qui a décidé de garder ce qu’on lui avait dit de vendre. »";
  },
  choices: [
    { 
      key: 'TRUST', 
      text: "Lui rendre la dague. « Reste. »", 
      effects: [{ type: "SET_FLAG", target: "kaelen_absous" }], 
      next: 'ACTE4_07_ADIEU_KALTHAR' 
    },
    { 
      key: 'COLD', 
      text: "Garder la dague. « On verra. »", 
      effects: [{ type: "SET_FLAG", target: "kaelen_juge" }], 
      next: 'ACTE4_07_ADIEU_KALTHAR' 
    },
    {
      key: 'BOTH',
      condition: (gs) => gs.hasFlag('dague_kaelen_prise'),
      text: "Garder les deux. « Je n’ai jamais dit que je te faisais confiance. »",
      effects: [
        { type: "SET_FLAG", target: "kaelen_juge" },
        { type: "ADD_GAUGE", target: "lien_O", value: 1 }
      ],
      next: 'ACTE4_07_ADIEU_KALTHAR'
    }
  ]
},

'ACTE4_06_MASQUE_TOMBE_2': {
  sceneNumber: 'ACTE4_06_MASQUE_TOMBE_2', 
  chapter: 4, 
  title: "La Chute des Masques", 
  mood: 'action',
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "URL_VOIX_KAELEN",
  getDynamicNarrative: (gs) => {
    // --- VERSION NG+ COMIQUE ---
    

    // --- VERSION NORMALE (avec dague) ---
    if (gs.hasFlag('dague_kaelen_prise')) {
      return "Kaelen glisse sur la glace, sa dague restante décrivant des cercles chirurgicaux, une danse qu’il connaît par cœur depuis bien plus longtemps que cette nuit. « Donne-moi le signal, Reine. Je lui ouvre la carotide avant que son dogme n’imprime son premier maillon sur ta peau. »";
    }
    return "Kaelen glisse sur la glace, ses dagues décrivant des cercles chirurgicaux, une danse qu’il connaît par cœur depuis bien plus longtemps que cette nuit. « Donne-moi le signal, Reine. Je lui ouvre la carotide avant que son dogme n’imprime son premier maillon sur ta peau. »";
  },
  choices: [
    
    { 
      key: 'REDEEM', 
      condition: (gs) => isClassicState(gs) && (gs.hasFlag('nuit_alistair') || gs.hasFlag('alistair_foi_libre') || gs.hasFlag('alistair_porte_ouverte')) && !gs.hasFlag('double_jeu'), 
      text: "« Leurs autels sont loin, Alistair. Choisis le réel. Brise tes fers. »", 
      effects: [{ type: "SET_FLAG", target: "alistair_redime" }], 
      next: 'ACTE4_06_OMBRE_AVEU' 
    },
    { 
      key: 'KILL', 
      condition: (gs) => isClassicState(gs),
      text: "Faire un signe de tête glacial à Kaelen. « Sectionne ses liens. »", 
      effects: [{ type: "SET_FLAG", target: "alistair_mort" }], 
      next: 'ACTE4_06_OMBRE_AVEU' 
    },
    { 
      key: 'SPARE', 
      condition: (gs) => isClassicState(gs),
      text: "Invoquer une décharge thermique négative pour faire éclater sa chaîne de lumière.", 
      effects: [{ type: "SET_FLAG", target: "alistair_epargne" }], 
      next: 'ACTE4_06_OMBRE_AVEU' 
    },
    { 
      key: 'SUBMIT', 
      condition: (gs) => isClassicState(gs),
      text: "Baisser les bras. Laisser le Sceau s’apposer.", 
      next: 'GAME_OVER_SCELLEE' 
    }
  ]
},

'ACTE4_06_OMBRE_AVEU': {
  sceneNumber: 'ACTE4_06_OMBRE_AVEU', 
  chapter: 4, 
  title: "Le Prix du Silence", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Vaste_parvis_de_pierre_gel%C3%A9e_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  voice: "URL_VOIX_KAELEN",
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('alistair_epargne')) text += "Le sceau divin éclate sous ton givre. Alistair s’effondre à genoux, ses chaînes dorées réduites en poussière avant même d’avoir touché ta peau.\n\n";
    else if (gs.hasFlag('alistair_mort')) text += "La lame de Kaelen ne laisse qu’un trait rouge. L’Inquisiteur s’écroule, et le silence qui suit est plus lourd que n’importe quel de ses sermons.\n\n";
    else if (gs.hasFlag('alistair_redime')) text += "Alistair tremble et jette l’insigne brûlant dans le blizzard, comme on se débarrasse enfin d’un mensonge qu’on portait depuis trop longtemps.\n\n";

    text += "Kaelen essuie l’acier de ses lames. « Tu veux savoir pourquoi ma dague t’attendait la première nuit ? Les Confrères de Cendre avaient signé mon contrat pour livrer la Reine vivante à leurs laboratoires de Mana. J’ai empoché l’avance. Maintenant... Je préfère éviscérer toute la guilde plutôt que de leur concéder un centimètre de ta peau. »\n\n";
    text += "Il ajoute, plus bas, presque pour lui-même : « Ils ne renonceront pas parce qu’un contrat est rompu, Elenya. Les Confrères n’oublient jamais une dette. »\n";
    text += "\nSur la crête, une silhouette trop nette s’efface dans le blizzard. Kaelen serre la garde de sa dague sans la tirer.\n« Ils surveillent. Pas aujourd’hui. » La dette reste ouverte — pour une autre nuit, ou pour le silence.\n";
    
    if (gs.hasFlag('nuit_kaelen') || gs.hasFlag('romance_reelle_O')) text += "Il serre les dents. « Mais je refusais que tu l’apprennes par leurs émissaires. »";
    else text += "Il hausse les épaules. « Un tueur reste un outil, le contrat est simplement devenu obsolète. »";

    return text;
  },
  choices: [
    { key: 'TRUST', condition: (gs) => gs.hasFlag('nuit_kaelen') || gs.hasFlag('romance_reelle_O') || gs.hasFlag('kaelen_absous') || gs.hasFlag('kaelen_amour_libre') || gs.hasFlag('kaelen_attend_permission'), text: "« Reste à mes côtés. »", effects: [{ type: "SET_FLAG", target: "kaelen_absous" }], next: 'ACTE4_07_ADIEU_KALTHAR' },
    { key: 'COLD', text: "« Restons-en là. »", effects: [{ type: "ADD_GAUGE", target: "instabilite", value: 3 }, { type: "SET_FLAG", target: "kaelen_juge" }], next: 'ACTE4_07_ADIEU_KALTHAR' }
  ]
},

'ACTE4_07_ADIEU_KALTHAR': {
  sceneNumber: 'ACTE4_07_ADIEU_KALTHAR', 
  chapter: 4, 
  title: "Le Seuil du Zéro Absolu", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Portes_noires_ouvertes_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kalthar%20bg/SPRITE_KALTHAR_ASTRAL_DEBOUT_FACE_202606231758.png",
  voice: "URL_VOIX_KALTHAR",
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('fen_adieu_scene')) {
      if (gs.hasFlag('kaelen_absous')) text += "Kaelen rengaine ses dagues et se place dans ton sillage sans troubler le silence.\n\n";
      else if (gs.hasFlag('kaelen_juge')) text += "Kaelen garde ses distances. Même lui comprend que cet instant n'appelle aucun commentaire.\n\n";
      text += "La Larme d’Ébène s’insère d’elle-même dans la serrure. Là où Fen se tenait, quelques cristaux persistent une seconde avant de fondre.\n\n";
      if (gs.hasFlag('kalthar_amour_sans_dette')) text += "Tu portes désormais Kalthar comme on porte une saison achevée : pas comme une chaîne, pas comme une permission à demander pour aimer encore.\n\n";
      text += "Les vantaux pivotent. Le passé vient de te rendre la clé du présent.";
      return text;
    }
    if (gs.hasFlag('kaelen_absous')) text += "Kaelen rengaine ses dagues et se place solennellement dans ton sillage.\n\n";
    else if (gs.hasFlag('kaelen_juge')) text += "Ton indifférence scelle ses émotions derrière une muraille de glace.\n\n";

    text += "La Larme d’Ébène s’insère d’elle-même. Fen bondit de ton épaule pour dessiner la haute carrure du Roi Kalthar. *« Le cycle se clôt... Règne désormais sans entraves. »*\n\n";
    text += "Sa silhouette spectrale se tourne une dernière fois vers toi. Il n’y a plus de mise en garde à te faire, plus de menace à décrypter dans le noir. Seulement un roi qui rend, enfin, sa couronne.\n\n";
    text += "Le petit corps blanc du familier se raidit, puis s’efface — non pas comme une mort, mais comme un poids qu’on repose après l’avoir porté trop longtemps. Fen ne glapit pas. Il ne lutte pas. Il se dissout dans un dernier scintillement de givre, et pour la première fois depuis ton réveil, tu es seule dans ta propre tête.\n\n";
    text += "Tu comprends maintenant. Fen n’était pas un familier. Il était Kalthar. Ou ce qu’il en restait. Un roi réduit à un furet, attendant ton réveil pendant des siècles. Il t’a jugée quand tu as hésité devant la fresque. Il t’a mordue quand tu as failli oublier qui tu étais. Il t’a guidée quand tu ne savais plus où aller.\n\n";
    text += "Chaque sifflement était une phrase dans une langue que tu avais oubliée. Chaque regard était un souvenir qu’il ne pouvait plus te dire avec des mots.\n\n";
    text += "Et ce soir, il te rend ta couronne.\n\n";
    if (gs.hasFlag('panthere_liberee')) {
      text += "Dans le scintillement, un second éclat — trop bref pour un nom, assez net pour un remerciement. La panthère de la volière. La veille que tu n’as pas volée. Kalthar, quelque part, a pris note.\n\n";
      if (gs.hasFlag('plume_givre_gardee')) {
        text += "La plume de givre contre ta peau pulse une dernière fois, puis s’éteint — comme si Fen emportait le message.\n\n";
      }
    } else if (gs.hasFlag('panthere_absorbee')) {
      text += "Le scintillement a un goût de fer. Fen part sans te regarder. La dette de la volière n’est pas réglée ; elle s’enterre seulement avec lui.\n\n";
    }

    text += "Les vantaux pivotent.";
    return text;
  },
  choices: [
    { key: 'A', text: "Franchir le seuil et pénétrer dans la Citadelle.", next: 'ACTE4_07B_CHOC_FRAGMENT' }
  ]
},

'ACTE4_07B_CHOC_FRAGMENT': {
  sceneNumber: '4.07B',
  chapter: 4,
  title: "Le Nom dans la Bouche",
  mood: 'tension',
  getDynamicNarrative: (gs) => {
    let text = "Tu es de retour sur le parvis. La Larme d’Ébène brûle encore dans ta paume.\n\n";
    if (gs.hasFlag('frag4_nom_prononce')) {
      text += "Le nom d’Oraya résonne encore dans ta gorge comme un goût de fer. Tu regardes tes mains. Elles tremblent. Légèrement.\n\n";
      if (gs.hasFlag('alistair_mort')) {
        text += "Kaelen te regarde d’un air inquiet, mais ne pose pas de question.\n\n";
      } else if (gs.hasFlag('avec_ombre') || gs.hasFlag('kaelen_absous') || gs.hasFlag('nuit_kaelen')) {
        text += "Kaelen te regarde d’un air inquiet, mais ne pose pas de question.\n\n";
      } else if (gs.hasFlag('avec_eclaireur') || gs.hasFlag('nuit_alistair') || gs.hasFlag('alistair_redime')) {
        text += "Alistair te regarde d’un air inquiet, mais ne pose pas de question.\n\n";
      } else {
        text += "Kaelen et Alistair échangent un regard. Aucun des deux ne pose de question.\n\n";
      }
      text += "Tu es différente. Et ils le sentent.";
    } else {
      text += "Tu gardes le silence. Mais quelque chose a changé dans la façon dont tu te tiens. Plus droite. Plus lourde.\n\nLe secret d’Oraya pèse maintenant autant que la Larme.";
    }
    return text;
  },
  choices: [
    { key: 'A', text: "Franchir les portes.", next: 'ACTE4_08_CORRIDOR_OBSIDIENNE' }
  ]
},

'ACTE4_08_CORRIDOR_OBSIDIENNE': {
  sceneNumber: '4.08.ADD', 
  chapter: 4, 
  title: "Le Corridor d’Obsidienne", 
  mood: 'tension',
  getDynamicNarrative: (gs) => "Les murs de la Citadelle reflètent ton image démultipliée. Chaque pas rapproche ton corps de la décision finale.",
  choices: [
    { key: 'PENETRER', text: "Ouvrir la porte de la nef.", next: 'ACTE4_08_SEUIL_ETERNITE' }
  ]
},

'ACTE4_08_SEUIL_ETERNITE': {
  sceneNumber: 'ACTE4_08_SEUIL_ETERNITE', 
  chapter: 4, 
  title: "Le Froid Absolu", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Antichambre_glaciale_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: (gs) => gs.hasFlag('alistair_mort') ? null : "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "L’air est le Zéro Absolu. Un battement de cœur sans protection et le sang cristallise dans les artères.\n\n";
    if (gs.hasFlag('alistair_mort')) {
      text += "« La première nuit, ils se battaient tous les deux pour savoir à qui j’appartenais, » murmures-tu, le regard glissant sur la place vide à la droite de Kaelen. « Aujourd’hui, il ne reste que toi, et ta vie m’appartient. Ma magie est l’unique bouclier. Je dois geler ton cœur. »";
    } else if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde') || gs.hasFlag('fin_solo')) {
      text += "Kaelen et Alistair sont derrière toi, au seuil. Pas pour te porter — pour voir si tu franchis.\n\n";
      text += "« Vous m’avez suivie jusqu’ici, » dis-tu sans vous retourner. « Ce qui vient ne vous demande ni serment ni permission. Ma magie est le seul bouclier. Je dois geler ce qui doit l’être — seule. »";
    } else {
      text += "« La première nuit, vous vous battiez pour savoir à qui j’appartenais, » murmures-tu, et la phrase résonne comme un jugement autant qu’un souvenir. « Aujourd’hui, vos vies m’appartiennent. Ma magie est l’unique bouclier. Je dois geler " + (gs.hasFlag('alistair_redime') ? "vos cœurs" : "ton cœur") + ". »";
    }
    return text;
  },
  choices: [
    { key: 'O', condition: (gs) => gs.hasFlag('nuit_kaelen') || gs.hasFlag('romance_reelle_O') || gs.hasFlag('kaelen_absous'), text: "Infuser ton fluide dans le cœur de Kaelen pour en faire ton Consort Noir.", effects: [{ type: "SET_FLAG", target: "consort_kaelen" }], next: 'ACTE4_09_TRONE_EBENE' },
    { key: 'E', condition: (gs) => gs.hasFlag('alistair_redime'), text: "Infuser Alistair pour en faire ton Paladin Éternel.", effects: [{ type: "SET_FLAG", target: "consort_alistair" }], next: 'ACTE4_09_TRONE_EBENE' },
    { key: 'S', text: "« Vos corps appartiennent à la terre. » Franchir le seuil seule.", effects: [{ type: "SET_FLAG", target: "fin_solo" }], next: 'ACTE4_09_TRONE_EBENE' }
  ]
},

'ACTE4_09_TRONE_EBENE': {
  sceneNumber: 'ACTE4_09_TRONE_EBENE', 
  chapter: 4, 
  title: "Le Poids du Monde", 
  mood: 'epilogue',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Immense_salle_du_tr%C3%B4ne_d_%C3%A9b%C3%A8ne_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "La salle du trône n’est plus qu’une cathédrale de glace éventrée. Au-dessus trône une immense toile : elle te représente majestueuse aux côtés du Roi Kalthar, un chat noir au poitrail orné d’un cercle blanc paresseusement lové à vos pieds.\n\n";
    text += "À la seconde où ton corps s’y installe, l’intégralité du fluide de cette ère afflue dans tes artères. Le jour de ton réveil, il n’y avait ni douleur ni passé. Aujourd’hui, l’avenir t’appartient — avec tout son poids, et tout ce qu’il te reste à décider d’en faire.\n\n";
    if (gs.hasFlag('verite_complete')) {
      text += "\n\nTu sais maintenant que le Trône n’est pas une fin — c’est une prison de ton propre choix. Oraya t’a scellée pour te protéger du monde. Le monde t’a réveillée pour te détruire. Et toi, tu vas décider qui avait raison.\n";
    }
    if (gs.hasFlag('consort_kaelen')) {
      if (gs.hasFlag('kaelen_absous')) text += "Kaelen veille à ta droite, ses iris mués en un bleu arctique aveuglant. « Je t’avais prévenue... Le continent est à tes ordres. »\n";
      else text += "Kaelen se tient à ta droite, figé dans une obéissance éternelle.\n";
    } else if (gs.hasFlag('consort_alistair')) {
      text += "Alistair se dresse à ta gauche, son aura sainte convertie en une lumière cristalline. « Je suis ton exécuteur, Elenya. »\n";
    } else if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde') || gs.hasFlag('fin_solo')) {
      text += "Kaelen et Alistair sont dans la nef, assez loin pour ne plus être des guides, assez près pour voir ce que tu deviens. Tu occupes l’espace seule — intouchable, souveraine de ton propre mythe.\n";
    } else {
      text += "Tu occupes l’espace seule, intouchable, souveraine de ton propre mythe.\n";
    }
    return text;
  },
  choices: [
    
    
    {
      key: 'FIN_CHAOS',
      intent: "corruption",
      target: "Elenya",
      importance: "critical",
      irreversible: true,
      feedback: "Le Trône enregistre ce choix comme une fin possible de ton histoire.",
      journal: "Au Trône d’Ébène, tu as choisi la voie chaos.",
      text: "Céder. Te dissoudre dans la tempête.",
      requires: { 'gauges.instabilite': { min: 30 } },
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_chaos" }],
      next: 'FIN_CHAOS'
    },
    {
  key: 'FIN_OMBRE',
  intent: "engagement",
  target: "Kaelen",
  importance: "critical",
  irreversible: true,
  feedback: "Le Trône enregistre ce choix comme une fin possible de ton histoire.",
  journal: "Au Trône d’Ébène, tu as choisi la voie ombre.",
  text: "Consacrer ton hiver aux Cendres avec Kaelen.",
  condition: (gs) =>
    gs.hasFlag('avec_ombre') &&
    gs.hasFlag('consort_kaelen') &&
    gs.getGauge('lien_O') >= 4 &&
    gs.getGauge('affinite_ombre') >= gs.getGauge('affinite_eclaireur') &&
    (
      gs.hasFlag('joute_gagne_O') ||
      gs.hasFlag('domination_acte3_O') ||
      gs.hasFlag('crevasse_domination') ||
      gs.hasFlag('nuit_kaelen') ||
      gs.getGauge('lien_O') >= 6
    ),
  effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_ombre" }],
  next: 'FIN_OMBRE'
},
   {
  key: 'FIN_ECLAIREUR',
  intent: "engagement",
  target: "Alistair",
  importance: "critical",
  irreversible: true,
  feedback: "Le Trône enregistre ce choix comme une fin possible de ton histoire.",
  journal: "Au Trône d’Ébène, tu as choisi la voie eclaireur.",
  text: "Accepter la cage dorée de l’Ordre avec Alistair.",
  condition: (gs) =>
    gs.hasFlag('avec_eclaireur') &&
    !gs.hasFlag('alistair_mort') &&
    !gs.hasFlag('alistair_perdu_definitif') &&
    gs.hasFlag('consort_alistair') &&
    gs.getGauge('lien_E') >= 4 &&
    gs.getGauge('affinite_eclaireur') >= gs.getGauge('affinite_ombre') &&
    (
      gs.hasFlag('joute_gagne_E') ||
      gs.hasFlag('domination_acte3_E') ||
      gs.hasFlag('crevasse_domination') ||
      gs.hasFlag('nuit_alistair') ||gs.getGauge('lien_E') >= 6
    ),
  effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_eclaireur" }],
  next: 'FIN_ECLAIREUR'
},
    {
  key: 'FIN_POLY',
  intent: "engagement",
  target: "Kaelen & Alistair",
  importance: "critical",
  irreversible: true,
  feedback: "Le Trône enregistre ce choix comme une fin possible de ton histoire.",
  journal: "Au Trône d’Ébène, tu as choisi la voie poly.",
  text: "Rester avec tous les deux. Ensemble.",
  condition: (gs) =>
    !gs.hasFlag('alistair_mort') &&
    !gs.hasFlag('alistair_perdu_definitif') &&
    !gs.hasFlag('kaelen_perdu_definitif') &&
    (
      (gs.hasFlag('poly_eligible') &&
       gs.getGauge('lien_O') >= 3 &&
       gs.getGauge('lien_E') >= 3) ||
      gs.hasFlag('go_poly_domination') ||
      gs.hasFlag('domination_finale')
    ),
  effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_poly" }],
  next: 'FIN_POLY'
},
    {
      key: 'V28_FIN_RECONVERSION_O',
      condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
        && !gs.hasFlag('avec_ombre')
        && !gs.hasFlag('kaelen_mort')
        && !gs.hasFlag('kaelen_perdu_definitif')
        && (gs.getGauge('presence_O') >= 8 || gs.getGauge('affinite_ombre') >= 10)
        && gs.getGauge('lien_O') >= 3,
      text: "« Kaelen. À ma droite. Maintenant. »",
      effects: [
        { type: "ADD_GAUGE", target: "presence_O", value: 1 },
        { type: "ADD_GAUGE", target: "lien_O", value: 2 },
        { type: "JOIN_COMPANION", target: "O" },
        { type: "SET_FLAG", target: "consort_kaelen" },
        { type: "SET_FLAG", target: "v28_conversion_finale_O" }
      ],
      next: 'FIN_OMBRE'
    },
    {
      key: 'V28_FIN_RECONVERSION_E',
      condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
        && !gs.hasFlag('avec_eclaireur')
        && !gs.hasFlag('alistair_mort')
        && !gs.hasFlag('alistair_perdu_definitif')
        && (gs.getGauge('presence_E') >= 8 || gs.getGauge('affinite_eclaireur') >= 10)
        && gs.getGauge('lien_E') >= 3,
      text: "« Alistair. Tiens le seuil. »",
      effects: [
        { type: "ADD_GAUGE", target: "presence_E", value: 1 },
        { type: "ADD_GAUGE", target: "lien_E", value: 2 },
        { type: "JOIN_COMPANION", target: "E" },
        { type: "SET_FLAG", target: "consort_alistair" },
        { type: "SET_FLAG", target: "v28_conversion_finale_E" }
      ],
      next: 'FIN_ECLAIREUR'
    },
    {
      key: 'FIN_SOLO',
      text: "Quitter le Trône. Partir seule vers le Nord.",
      condition: (gs) =>
        (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) &&
        gs.hasFlag('fin_solo'),
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_solo" }],
      next: 'FIN_SOLO'
    },
    {
  key: 'FIN_RECONCILIATION',
  text: "Tracer un hiver qui protège sans posséder.",
  condition: (gs) =>
    !gs.hasFlag('alistair_mort') && !gs.hasFlag('alistair_perdu_definitif') &&
    gs.hasFlag('ton_douceur') &&
    gs.getGauge('instabilite') < 10 &&
    Math.abs(gs.getGauge('affinite_ombre') - gs.getGauge('affinite_eclaireur')) <= 3 &&
    !gs.hasFlag('domination_finale') &&
    !gs.hasFlag('crevasse_domination') &&
    !gs.hasFlag('joute_froide_O') &&
    !gs.hasFlag('joute_froide_E') &&
    !gs.hasFlag('domination_acte3_O') &&
    !gs.hasFlag('domination_acte3_E'),
  effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_reconciliation" }],
  next: 'FIN_RECONCILIATION'
},
    {
      key: 'FIN_MORTELLE',
      text: "Revenir. Redevenir humaine.",
      requires: { 'gauges.instabilite': { max: 14 } },
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_mortelle" }],
      next: 'FIN_MORTELLE'
    },
    {
      key: 'FIN_HIVER',
      text: "Dominer. Régner seule sur l’hiver éternel.",
      condition: (gs) => {
        const solo = gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde') || (!gs.hasFlag('avec_ombre') && !gs.hasFlag('avec_eclaireur'));
        const liensBas = gs.getGauge('lien_O') <= 2 && gs.getGauge('lien_E') <= 2;
        const instab = gs.getGauge('instabilite') >= 15;
        // Solo max instab OU liens bas + instab (tyran isolé)
        return instab && (solo || liensBas);
      },
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_hiver" }],
      next: 'FIN_HIVER'
    },
    {
      key: 'FIN_SACRIFICE',
      text: "Sacrifier. Absorber le froid pour sauver le monde.",
      condition: (gs) => gs.getGauge('lien_O') >= 3 || gs.getGauge('lien_E') >= 3,
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_sacrifice" }],
      next: 'FIN_SACRIFICE'
    },
    {
      key: 'FIN_TEMOIN',
      text: "Régner, mais les laisser ensemble dans l’ombre du Trône.",
      condition: (gs) => !gs.hasFlag('alistair_mort') && !gs.hasFlag('alistair_perdu_definitif') && gs.hasFlag('pomme_ramassee') && gs.hasFlag('regard_partage_feu') && !gs.hasFlag('double_jeu'),
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_temoin" }],
      next: 'FIN_TEMOIN'
    },
    {
      key: 'FIN_EQUILIBRE',
      text: "Régner sans posséder. Protéger sans enchaîner.",
      condition: (gs) => !gs.hasFlag('alistair_mort') && !gs.hasFlag('alistair_perdu_definitif')
        && gs.hasFlag('ton_douceur')
        && gs.getGauge('instabilite') < 15
        && gs.hasFlag('reliques_completes')
        && !gs.hasFlag('domination_finale')
        && !gs.hasFlag('crevasse_domination')
        && (gs.hasFlag('tension_kaelen_alistair_apaisee') || gs.hasFlag('serment_kaelen_approfondi') || gs.hasFlag('doute_alistair_progressif')),
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_equilibre" }],
      next: 'FIN_EQUILIBRE'
    },
    {
      key: 'FIN_REDEMPTION',
      text: "Pardonner. Guérir. Régner avec ceux qui t'ont attendue.",
      condition: (gs) => !gs.hasFlag('alistair_mort') && !gs.hasFlag('alistair_perdu_definitif')
        && gs.hasFlag('oraya_pardonnee')
        && gs.hasFlag('lyra_liberee')
        && gs.hasFlag('fen_accepte')
        && gs.hasFlag('ton_douceur')
        && gs.getGauge('instabilite') < 10
        && !gs.hasFlag('domination_finale')
        && !gs.hasFlag('crevasse_domination'),
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_redemption" }],
      next: 'FIN_REDEMPTION'
    },
    {
      key: 'FIN_VERITE',
      text: "Savoir. Choisir. Régner en pleine conscience.",
      condition: (gs) => gs.hasFlag('verite_complete')
        && gs.hasFlag('frag4_nom_prononce')
        && (gs.hasFlag('oraya_pardonnee') || gs.hasFlag('oraya_ignoree'))
        && gs.getGauge('instabilite') < 20
        && !gs.hasFlag('domination_finale'),
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_verite" }],
      next: 'FIN_VERITE'
    },
    {
      key: 'FIN_BRISEE',
      text: "Ne rien décider. Laisser l’hiver en suspens.",
      effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_brisee" }],
      next: 'FIN_BRISEE'
    },
    {
      key: 'FIN_ISSUES_SECONDAIRES',
      condition: (gs) => gs.hasFlag('veyra_pacte_accepte') ||
                         gs.hasFlag('mira_fuite_acceptee') ||
                         gs.hasFlag('seraphine_hostile') ||
                         gs.hasFlag('seraphine_ennemie') ||
                         (gs.getGauge('memoire_kalthar') >= 15 && gs.getGauge('volonte') >= 10) ||
                         (gs.hasFlag('dette_O_confrontee') && gs.hasFlag('dette_E_confrontee')),
      text: "Regarder les chemins que tes choix ont laissés ouverts.",
      next: 'ACTE4_09_ISSUES_SECONDAIRES'
    }
  ]
},

  // ==========================================
  // FINS ET SCÈNES SPÉCIALES
  // ==========================================

'CORONA_APPEL': {
  sceneNumber:'4.C2',chapter:4,title:"Ni Mur ni Porte",mood:'mystery',
  text:"À proximité du Trône, la même ligne de givre réapparaît sous tes pieds. Elle avance avec ton pouls, recule avec lui : le même mouvement minuscule que la première fois.\n\nCette fois tu comprends. Le monde t'a toujours présenté deux solutions : fermer la frontière ou l'ouvrir. Régner ou abandonner.\n\nMais une frontière peut être vivante. Corona n'est pas un royaume. C'est une fonction.",
  choices:[{key:'COMPRENDRE',text:"« Alors je peux devenir le seuil sans devenir la serrure. »",intent:'liberte',target:'Monde',importance:'critical',feedback:"La voie de Corona devient un choix conscient, pas seulement une condition cachée.",journal:"Tu as compris que Corona signifiait devenir une frontière consciente plutôt qu'un mur.",effects:[{type:'SET_FLAG',target:'corona_comprise'},{type:'SET_FLAG',target:'corona_position_finale'},{type:'ADD_GAUGE',target:'volonte',value:2}],next:'RETURN'}]
},

'ACTE4_09_ISSUES_SECONDAIRES': {
    sceneNumber: 'ACTE4_09B',
    chapter: 4,
    title: "Les Portes que le Trône n'a pas Fermées",
    mood: 'epilogue',
    getDynamicNarrative: (gs) => {
      return "Le Trône offre ses grandes réponses. Mais certaines portes ne s'ouvrent pas avec une couronne. " +
        "Elles s'ouvrent avec ce que tu as fait avant d'arriver ici.\n\n" +
        "Cinq chemins restent visibles dans la glace. Tu n'en suivras qu'un. " +
        "Aucun ne peut effacer les autres : ils appartiennent déjà à ta mémoire.";
    },
    choices: [
      {
        key: 'VEYRA',
        condition: (gs) => gs.hasFlag('veyra_position_finale'),
        text: "Le pacte de Veyra. Choisir le pouvoir sans attache.",
        effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_veyra" }],
        next: 'FIN_VEYRA'
      },
      {
        key: 'SERAPHINE',
        condition: (gs) => gs.hasFlag('seraphine_position_finale'),
        text: "L'Ordre. Affronter jusqu'au bout la dette de lumière.",
        effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_seraphine" }],
        next: 'FIN_SERAPHINE'
      },
      {
        key: 'MIRA',
        condition: (gs) => gs.hasFlag('mira_route_sans_nom_vecue') && gs.hasFlag('mira_fuite_acceptee'),
        text: "La route de Mira. Quitter le mythe avant qu'il ne te possède.",
        effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_mira" }],
        next: 'FIN_MIRA'
      },
      {
        key: 'CORONA',
        condition: (gs) => gs.hasFlag('corona_position_finale') && gs.hasFlag('corona_comprise'),
        text: "La frontière vivante. Devenir le rempart plutôt que la souveraine.",
        effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_corona" }],
        next: 'FIN_CORONA'
      },
      {
        key: 'DETTE',
        condition: (gs) => gs.hasFlag('dette_position_finale') && gs.hasFlag('dette_systeme_compris'),
        text: "Annuler les dettes. Ne laisser personne hériter de tes chaînes.",
        effects: [{ type: "UNLOCK_ACHIEVEMENT", target: "ach_fin_dette_annulee" }],
        next: 'FIN_DETTE_ANNULEE'
      },
      {
        key: 'BACK',
        text: "Revenir au Trône.",
        next: 'ACTE4_09_TRONE_EBENE'
      },
    {key:'V515_VEYRA_FINAL',condition:(gs)=>gs.hasFlag('veyra_verite_decouverte')&&!gs.hasFlag('veyra_position_finale'),text:"Parler une dernière fois à Veyra avant de choisir une issue.",effects:[{type:'PUSH_RETURN',target:'ACTE4_09_ISSUES_SECONDAIRES'}], next:'VEYRA_DERNIER_PACTE'},
    {key:'V515_SERAPHINE_FINAL',condition:(gs)=>gs.hasFlag('seraphine_fracture_vue')&&!gs.hasFlag('seraphine_position_finale'),text:"Demander à Séraphine quel serment peut encore survivre.",effects:[{type:'PUSH_RETURN',target:'ACTE4_09_ISSUES_SECONDAIRES'}], next:'SERAPHINE_DERNIER_SERMENT'},
    {key:'V515_CORONA_APPEL',condition:(gs)=>gs.hasFlag('corona_vision_vue')&&(gs.getGauge('memoire_kalthar')||0)>=12&&(gs.getGauge('volonte')||0)>=8&&!gs.hasFlag('corona_comprise'),text:"Revenir à l'idée de la frontière qui n'est ni mur ni porte.",effects:[{type:'PUSH_RETURN',target:'ACTE4_09_ISSUES_SECONDAIRES'}], next:'CORONA_APPEL'},
    {key:'V515_DETTE_CHOIX',condition:(gs)=>gs.hasFlag('dette_systeme_compris')&&!gs.hasFlag('dette_position_finale'),text:"Décider ce qui peut encore être hérité des anciennes dettes.",effects:[{type:'PUSH_RETURN',target:'ACTE4_09_ISSUES_SECONDAIRES'}], next:'DETTE_CHOIX'}
  ]
  },

'ACTE4_AVEU_PARALLELE': {
    sceneNumber: 'AVEU_KA',
    chapter: 4,
    title: "Ce que le Trône n’entend pas",
    mood: 'intimate',
    getDynamicNarrative: (gs) => {
      return "Tu es déjà devant le Trône d’Ébène. Derrière toi, dans l’ombre de la salle, deux voix basses se croisent.\n\n" + "Kaelen : « Tu savais. Depuis la pomme. »\n\n" + "Alistair : « Oui. »\n\n" + "Un silence. Puis le froissement d’une cape. Un geste qu’on ne voit pas, mais qu’on entend.\n\n" + "Tu pourrais te retourner. Tu pourrais les interrompre. Tu restes face au Trône.\n\n" + "Ils ne te demandent rien. Ils ne te doivent rien. Et pour une fois, ce n’est pas une trahison.";
    },
    choices: [
      {
        key: 'A',
        text: "Les laisser. Continuer vers le Trône.",
        effects: [
          { type: "SET_FLAG", target: "_aveu_parallele_vu" },
          { type: "SET_FLAG", target: "kaelen_alistair_rapprochement" }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "« Je vous ai entendus. Continuez. »",
        effects: [
          { type: "SET_FLAG", target: "_aveu_parallele_vu" },
          { type: "SET_FLAG", target: "kaelen_alistair_rapprochement" },
          { type: "UNLOCK_ACHIEVEMENT", target: "ach_wingwoman" }
        ],
        next: 'RETURN'
      }
    ]
  },

'RELIQUE_KALTHAR_3': {
    sceneNumber: 'V26.4.R3',
    chapter: 4,
    title: "La Dernière Pierre",
    mood: 'exploration',
    getDynamicNarrative: (gs) => {
      return "Au seuil de la Citadelle, une pierre se détache du mur. Elle tombe à tes " + "pieds.\n\n" + "Un fragment de stèle. Ton nom y est gravé — mais à l'envers. Comme si quelqu'un " + "l'avait écrit en regardant ton reflet dans la glace.\n\n" + "Tu le ramasses. Les trois reliques pulsent maintenant à l'unisson, synchronisées avec " + "ton propre cœur.";
    },
    choices: [{
      key: 'NEXT',
      text: "Réunir les trois fragments.",
      effects: [
        { type: "SET_FLAG", target: "relique_3_trouvee" },
        { type: "SET_FLAG", target: "reliques_completes" },
        { type: "ADD_GAUGE", target: "instabilite", value: -3 }
      ],
      next: 'RETURN'
    }]
  },

'FEN_ADIEU': {
    sceneNumber: 'V40.3.FA',
    chapter: 4,
    title: "La Cinquième Note",
    mood: 'intimate',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Fen%20bg/SPRITE_FEN_ASSIS_FACE_FIX_202606231738.png",
    getDynamicNarrative: (gs) => {
      let text = "Fen descend de ton épaule sans qu'on l'y invite.\n\n";
      text += "Au seuil des Portes Noires, il se retourne vers toi et siffle les quatre notes que tu connais.\n\n";
      text += "Puis vient la cinquième.\n\n";
      text += "Le souvenir ne revient pas comme une vision. Il revient comme une certitude : ta main dans une autre main ; de la neige sur un rebord de fenêtre ; un homme qui terminait toujours cette mélodie trop bas pour chanter juste. Kalthar.\n\n";
      text += "Tu prononces son nom. Fen ferme les yeux.\n\n";
      text += "C'est tout ce qu'il fallait.\n\n";
      text += "Le givre gagne son pelage sans le blesser. Sa petite silhouette s'allonge dans la lumière, non pour redevenir vraiment un homme, mais assez pour que ton cœur reconnaisse une posture : celle du roi qui s'inclinait devant toi quand personne ne regardait.\n\n";
      text += "Il n'y a ni accusation ni demande. Trois siècles n'aboutissent pas à une dette de plus.\n\n";
      text += "Seulement à un adieu.\n\n";
      text += "La lumière se défait. Quelque chose de froid et de léger se pose contre ton front, à l'endroit exact où reposait autrefois ta couronne.\n\n";
      text += "Kalthar ne te demande pas de l'attendre. Il te rend au monde.";
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Fermer les yeux. « Merci d'avoir attendu. Maintenant, repose-toi. »",
        effects: [
          { type: "SET_FLAG", target: "fen_accepte" },
          { type: "SET_FLAG", target: "fen_adieu_scene" },
          { type: "SET_FLAG", target: "kalthar_amour_sans_dette" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "Tendre la main une dernière fois, même en sachant qu'elle se refermera sur du givre.",
        effects: [
          { type: "SET_FLAG", target: "fen_refuse" },
          { type: "SET_FLAG", target: "fen_adieu_scene" },
          { type: "ADD_GAUGE", target: "memoire_kalthar", value: 1 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        text: "Ne rien dire. Certaines histoires d'amour méritent un silence entier.",
        effects: [
          { type: "SET_FLAG", target: "fen_silence" },
          { type: "SET_FLAG", target: "fen_adieu_scene" },
          { type: "SET_FLAG", target: "kalthar_amour_sans_dette" }
        ],
        next: 'RETURN'
      }
    ]
  },
  };
}
