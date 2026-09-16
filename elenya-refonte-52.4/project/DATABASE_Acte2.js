/** V52 — fragment DB ACTE2.
 * Généré depuis V51.7.6 sans réécriture narrative.
 * 48 scènes.
 */
function _dbActe2V52_() {
  return {
'ACTE2_01_RENCONTRE_SILAS_1': {
    sceneNumber: 'ACTE2_01_RENCONTRE_SILAS_1',
    chapter: 2,
    title: "Le Marchand qui se Souvenait",
    mood: 'exploration',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/caravane-silas.webp",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Silas%20bg/SPRITE_SILAS_DEBOUT_COURBE_SUPPLIANT_202606231802.png",
    voice: "URL_VOIX_SILAS",
    getDynamicNarrative: (gs) => {
      // --- VERSION NG+ ---
      
      // --- VERSION NORMALE ---
      let text = "La forêt rousse s'étend devant vous. Les feuilles écarlates crissent sous les bottes. L'air est lourd, presque moite après le froid des hauteurs.\n\n" +
        "Un chariot embourbé bloque le passage. Un homme saute de son siège, les mains levées.\n\n" +
        "« Pitié, voyageurs ! Je suis Silas, marchand de passage, je — »\n\n" +
        "Il s'arrête. Ses yeux se fixent sur toi. Pas de terreur. De reconnaissance.\n\n" +
        "« Vos yeux, » murmure-t-il. « Ma grand-mère... elle avait les mêmes. Elle vendait des étoffes au palais, avant le Gel. Elle m'a dit... »\n\n" +
        "Il s'interrompt. Regarde Kaelen. Regarde Alistair. Ravale ses mots.\n\n";
      if (gs.hasFlag('silas_mort')) {
        text += "Kaelen a déjà la main sur sa dague. Le marchand le voit. Il ne supplie plus. Il te regarde, toi.\n\n" +
          "« Dites-lui, » souffle-t-il. « Dites-lui ce qu'elle m'a dit. »";
      } else {
        text += "« Elle m'a raconté des choses, » reprend-il, plus bas. « Sur la Reine. Sur le Gel. Sur... »\n\n" +
          "Il s'interrompt encore. Quelque chose, dans son regard, n'est plus celui d'un marchand qui a peur. C'est celui d'un homme qui porte un secret trop lourd pour lui tout seul.";
      }
      return text;
    },
    choices: [
      
      {
        key: 'O',
        condition: (gs) => isClassicState(gs),
        text: "Laisser Kaelen le piller et l'égorger. Le secret meurt avec lui.",
        effects: [
          { type: "ADD_GAUGE", target: "affinite_ombre", value: 3 },
          { type: "SET_FLAG", target: "silas_mort" }
        ],
        next: 'ACTE2_01_SILAS_FOUILLAGE'
      },
      {
        key: 'E',
        condition: (gs) => isClassicState(gs),
        text: "« Parle. Maintenant. Avant qu'ils ne décident pour toi. »",
        effects: [
          { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 2 },
          { type: "SET_FLAG", target: "silas_ami" },
          { type: "SET_FLAG", target: "silas_a_parle_1" }
        ],
        next: 'ACTE2_01B_SILAS_CONFIDENCE'
      },
      {
        key: 'S',
        condition: (gs) => isClassicState(gs),
        text: "L'ignorer superbement. Son secret ne te regarde pas.",
        effects: [
          { type: "ADD_GAUGE", target: "instabilite", value: 3 },
          { type: "SET_FLAG", target: "silas_ignore" }
        ],
        next: 'ACTE2_01C_CHEMIN_VOLIERES'
      }
    ]
  },

'ACTE2_01_SILAS_FOUILLAGE': {
  sceneNumber: '2.01.ADD', 
  chapter: 2, 
  title: "Les Marchandises Abandonnées", 
  mood: 'exploration',
  getDynamicNarrative: (gs) => {
    return "Le chariot de Silas regorge de reliques du Sud. Sous la paille, quelques fioles de baume thermique gisent encore intactes. Coincé dans la doublure d’un manteau, tu trouves aussi un petit bouton gravé d’un flocon — assez ancien pour ne pas appartenir à ces vêtements. Silas ne parlera plus : tu prends l’objet, mais son histoire meurt avec lui. L’odeur du sang frais se mêle à celle des épices séchées. Kaelen essuie déjà sa lame.";
  },
  choices: [
    { 
      key: 'PRENDRE', 
      text: "Récupérer le bouton gravé et le baume, puis reprendre la route.", 
      effects: [
        { type: "SET_FLAG", target: "inventaire_baume" },
        { type: "SET_FLAG", target: "silas_bouton_garde" },
        { type: "SET_FLAG", target: "silas_bouton_pille" }
      ], 
      next: 'ACTE2_01C_CHEMIN_VOLIERES' 
    }
  ]
},

'ACTE2_01B_SILAS_CONFIDENCE': {
    sceneNumber: '2.01B',
    chapter: 2,
    title: "Ce que le Marchand N'osait Pas Dire",
    mood: 'intimate',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Silas%20bg/SPRITE_SILAS_DEBOUT_COURBE_SUPPLIANT_202606231802.png",
    getDynamicNarrative: (gs) => {
      let text = "Kaelen recule d'un pas. Alistair baisse son insigne. Silas comprend qu'il a une chance.\n\n" +
        "Il parle vite, comme un homme qui craint de changer d'avis.\n\n" +
        "« Ma grand-mère m'a dit que la Reine n'était pas un monstre. Que l'Ordre avait récrit l'histoire. Que le Gel n'était pas une malédiction, mais un... »\n\n" +
        "Il s'interrompt. Regarde autour de lui. Baisse la voix.\n\n" +
        "« Un sacrifice. »\n\n" +
        "Il te fixe. Ses yeux sont trop vieux pour son visage.\n\n" +
        "« Je ne sais pas si c'est vrai. Mais je sais que vous m'avez laissée vivre. Et ça, je ne l'oublierai pas. »\n\n";
      if (gs.hasFlag('fresque_touched')) {
        text += "Tu penses à la fresque. La souveraine qui fige le continent pour contenir le brasier. Ce n'est pas le portrait d'un tyran.\n\n" +
          "Silas a vu juste. Ou sa grand-mère a vu juste.\n\n";
      }
      text += "Il te tend un petit objet. Un bouton de manteau, gravé d'un flocon.\n\n" +
        "« Au cas où. Pour me reconnaître. Si un jour vous repassez par ici. »";
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Prendre le bouton. « Je m'en souviendrai. »",
        effects: [
          { type: "SET_FLAG", target: "silas_ami" },
          { type: "SET_FLAG", target: "silas_bouton_garde" }
        ],
        next: 'ACTE2_01C_CHEMIN_VOLIERES'
      },
      {
        key: 'B',
        text: "Refuser. « Garde-le. Et tais-toi. »",
        effects: [
          { type: "SET_FLAG", target: "silas_ami" }
        ],
        next: 'ACTE2_01C_CHEMIN_VOLIERES'
      }
    ]
  },

'ACTE2_01C_CHEMIN_VOLIERES': {
  sceneNumber: '2.01C',
  chapter: 2,
  title: "La Route des Cages Vides",
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chemin_enneige_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "Le chariot de Silas disparaît derrière les sapins et, pendant un moment, personne ne parle. Le chemin s’abaisse vers d’anciens communs royaux : murets effondrés, arches sans portes, cages de pierre ouvertes depuis des siècles.\n\n";
    text += "Kaelen passe devant une empreinte trop large pour un loup. Il s’accroupit, mesure la trace du bout de deux doigts, puis se relève sans tirer ses dagues. « Vieille. Mais pas morte. »\n\n";
    text += "Alistair examine un sceau solaire martelé sur une borne. Sous l’or arraché subsiste un motif plus ancien : un flocon entouré de cinq traits. « L’Ordre n’a pas construit cet endroit, » dit-il. Ce n’est pas une question.\n\n";
    text += "Fen, lui, ne regarde ni l’un ni l’autre. Il avance vers les volières abandonnées avec une certitude qui ne ressemble plus tout à fait à l’instinct.\n\n";
    if (gs.getGauge('memoire_kalthar') >= 4 || gs.hasFlag('_frag_k_vu') || gs.hasFlag('_frag_a_vu')) {
      text += "Un nom effleure ta mémoire puis se dérobe avant que tu puisses le retenir. Pas une réponse. Seulement la sensation d’avoir déjà marché ici aux côtés de quelqu’un.\n\n";
    }
    if (gs.hasFlag('silas_bouton_garde')) {
      text += "Le bouton gravé d’un flocon repose contre ta hanche. Tu possèdes l’objet, mais sa signification dépend de la manière dont tu l’as obtenu : confidence offerte ou secret arraché à un mort.\n\n";
    }
    if (gs.hasFlag('inventaire_baume')) {
      text += "Les fioles de baume thermique récupérées dans le chariot s’entrechoquent doucement à chaque pas.\n\n";
    }
    text += "Au-delà des cages vides, quelque chose gratte lentement la glace.";
    return text;
  },
  choices: [
    {
      key: 'NEXT',
      text: "Suivre Fen jusqu’aux anciennes volières.",
      effects: [{ type: "SET_FLAG", target: "approche_volieres_vue" }],
      next: 'ACTE2_02_QS_FAMILIERS'
    }
  ]
},

'ACTE2_02_QS_FAMILIERS': {
  sceneNumber: 'ACTE2_02.QS', 
  chapter: 2, 
  title: "Les Vestiges de la Fidélité", 
  mood: 'exploration',
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/panthere-givre.webp",
  getDynamicNarrative: (gs) => {
    let text = "Une panthère de givre garde la dernière volière intacte. Ses yeux sont des braises bleues, mais elle ne bondit pas. Elle regarde Fen avant de te regarder toi.\n\n";
    text += "Le furet laisse échapper trois notes très basses. La panthère incline la tête. Ton corps reconnaît quelque chose dans cet échange que ta mémoire refuse encore de nommer.\n\n";
    if (gs.getGauge('memoire_kalthar') >= 6 || gs.hasFlag('_frag_k_vu') || gs.hasFlag('_frag_a_vu')) {
      text += "Le nom de Kalthar remonte à la surface — pas comme une certitude, plutôt comme la pièce manquante d’un geste ancien. Cette bête appartenait au palais. Peut-être à lui. Peut-être à vous deux.\n\n";
    }
    
    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "La libérer du spectre spectral.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: -5 },
        { type: "SET_FLAG", target: "panthere_liberee" }
      ], 
      next: 'ACTE2_02B_PANTHERE_LIBEREE' 
    },
    { 
      key: 'B', 
      text: "Absorber son Mana pour renforcer ta puissance.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 10 },
        { type: "SET_FLAG", target: "panthere_absorbee" }
      ], 
      next: 'ACTE2_02B_PANTHERE_ABSORBEE' 
    }
  ]
},

'ACTE2_02B_PANTHERE_LIBEREE': {
  sceneNumber: '2.02B',
  chapter: 2,
  title: "Dernier Souffle de Fidélité",
  mood: 'exploration',
  getDynamicNarrative: (gs) => {
    let text = "Tu tends la main. La panthère de givre s’approche, pose son crâne spectral contre ta paume, puis se dissout en une pluie de cristaux bleus.\n\n";
    text += "Fen pousse un sifflement presque humain. Quelque chose de très ancien s’éteint — non une menace : une veille qui te reconnaît digne de la laisser partir.\n\n";
    text += "Dans la volière vide, une plume de givre ne fond pas. Tu la glisses près de ton cœur sans y penser.\n\n";
    text += "Kaelen n’a rien dit pendant le geste. Il n’a pas non plus tendu la main vers le Mana. « Sentimentale, » murmure-t-il. Ce n’est pas tout à fait un reproche.\n\n";
    text += "Alistair incline la tête, presque une prière. « Tu aurais pu la prendre. Tu as choisi de la rendre. » Dans sa voix : du respect — et un doute sur ce que ferait l’Ordre à sa place.";
    return text;
  },
  choices: [
    {
      key: 'NEXT',
      text: "Rejoindre le campement.",
      effects: [
        { type: "SET_FLAG", target: "plume_givre_gardee" },
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 1 },
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 1 }
      ],
      next: 'ACTE2_03_BIVOUAC_AUTOMNE'
    }
  ]
},

'ACTE2_02B_PANTHERE_ABSORBEE': {
  sceneNumber: '2.02C',
  chapter: 2,
  title: "Le Prix de la Veille",
  mood: 'tension',
  getDynamicNarrative: (gs) => {
    let text = "Tu tends la main. Au lieu de la libérer, tu tires.\n\n";
    text += "Le Mana de la panthère afflue dans tes canaux comme de l’eau glacée. Ses yeux s’éteignent. Fen crie — un son aigu, accusateur — puis se tait.\n\n";
    text += "La volière reste vide. Plus de spectre. Plus de veille. Seulement une chaleur nouvelle sous ta peau, et un goût de trahison ancienne sur la langue.\n\n";
    text += "Kaelen observe sans juger. Ou presque. « Tu prends ce dont tu as besoin. C’est honnête. » Il range une dague. « Juste… ne t’étonne pas si le petit te le fait payer. »\n\n";
    text += "Alistair a détourné les yeux. « Ce n’était plus un démon. C’était une promesse. » Il ne te condamne pas à voix haute. Sa main sur l’insigne le fait pour lui.";
    return text;
  },
  choices: [
    { key: 'NEXT', text: "Rejoindre le campement.", next: 'ACTE2_03_BIVOUAC_AUTOMNE' }
  ]
},

'ACTE2_03_BIVOUAC_AUTOMNE': {
  sceneNumber: 'ACTE2_03_BIVOUAC_AUTOMNE', 
  chapter: 2, 
  title: "Le Gardien Invisible", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Campement_sous_des_racines_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Fen%20bg/SPRITE_FEN_ASSIS_FACE_FIX_202606231738.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Le campement est établi sous les racines noueuses d’un chêne mort. Ce soir, Fen refuse la tiédeur de ton col. Le petit furet blanc s’est posté sur une branche basse, ses yeux noirs fixés sur Alistair avec une intensité presque humaine, dérangeante.\n\n";
    text += "À son attitude, tu ressens la vibration de l’esprit de Kalthar. Ce n’est plus tout à fait un animal qui surveille le prêtre : plutôt l’ombre de l’ancien Roi qui jauge le geôlier de sa Reine.\n\n";
    text += "Fen tourne ensuite la tête vers toi. Un instant, ses yeux reflètent quelque chose qui n’est pas le feu : un éclat noir, profond, comme une larme de pierre.\n\n";
    text += "Il siffle une seule note. Très basse. Très ancienne.\n\n";

    if (gs.hasFlag('panthere_liberee')) {
      text += "Fen reste collé à ta gorge, plus lourd qu’à l’habitude. Il a vu la veille se dissoudre sans être volée. Quelque chose en lui — ou en Kalthar — a tranché : tu n’es pas seulement une héritière de pouvoir. Tu es une héritière de choix.\n\n";
    } else if (gs.hasFlag('panthere_absorbee')) {
      text += "Fen garde ses distances sur la branche. Il a vu ce que tu as pris. Le regard qu’il pose sur toi n’est plus seulement animal : c’est une dette ouverte, et il ne l’oubliera pas.\n\n";
    }

    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "Sourire à cette complicité muette. Ton Roi veille sur ton honneur.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: -3 }, 
        { type: "SET_FLAG", target: "fen_observe" }
      ], 
      next: 'ACTE2_04_PONT_RUINE' 
    }
  ]
},

'ACTE2_04_PONT_RUINE': {
  // V26.3.6 — OBSERVER mène à lore dédié (plus choix creux)
  sceneNumber: '2.04.BIS',
  chapter: 2,
  title: "Le Passé Décomposé",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Village_barricad%C3%A9_au_loin_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    return "Le chemin menant au village traverse un ancien aqueduc effondré. Les sculptures qui l’ornaient représentent des figures royales brisées à coups de masse. Tu reconnais les armoiries de Kalthar sur un pan de mur lézardé. Quelqu’un a voulu effacer jusqu’au souvenir de son règne.";
  },
  choices: [
    {
      key: 'OBSERVER',
      text: "Étudier les gravures défigurées.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 2 },
        { type: "SET_FLAG", target: "ruines_kalthar_etudiees" }
      ],
      next: 'ACTE2_04_RUINES_DETAIL'
    },
    {
      key: 'FORCER',
      text: "Passer sans accorder un regard aux ruines.",
      effects: [{ type: "SET_FLAG", target: "ruines_ignorees" }],
      next: 'ACTE2_04_VILLAGE_HOSTILE'
    }
  ]
},

'ACTE2_04_RUINES_DETAIL': {
  // V26.3.6 — Lore Kalthar / damnatio memoriae
  sceneNumber: '2.04.LORE',
  chapter: 2,
  title: "Noms Qu’on A Voulu Taire",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Village_barricad%C3%A9_au_loin_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "Tu t’approches du pan de mur. Sous les impacts de masse, les reliefs gardent assez de forme pour lire ce qu’on a voulu détruire.\n\n";
    text += "Kalthar n’y est pas seul. À sa droite, une silhouette féminine a été martelée jusqu’au basalte nu — diadème de givre encore devinable, main tendue vers un horizon de flammes. À sa gauche, un second visage a été gratté : plus jeune, même sang, titre illisible.\n\n";
    text += "Une inscription en vieux nordique court sous les pieds brisés : *« Celui qui fige le monde pour le sauver ne mérite ni tombe ni nom. »* Plus bas, une main plus récente a gravé en langue vulgaire : *L’Ordre a purifié ce pont. Ne regardez pas en arrière.*\n\n";
    text += "Fen grogne. Sous ton doigt, le givre de la fresque d’origine pulse une fois — comme une reconnaissance, ou un rappel.";
    text += "\n\nAlistair détourne les yeux trop tard. « Ces lettres… ce n’est pas le style des bandits. C’est une damnatio. Officielle. »";
    text += "\n\nKaelen siffle entre ses dents. « Ils ont eu peur d’un mort. C’est toujours bon signe pour le vivant qui porte son sang. »";
    return text;
  },
  choices: [
    {
      key: 'GRAVER',
      text: "Retracer du doigt le diadème effacé. Laisser le givre le souligner.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 3 },
        { type: "SET_FLAG", target: "diademe_retrouve" },
        { type: "SET_FLAG", target: "ruines_kalthar_etudiees" }
      ],
      next: 'ACTE2_04_VILLAGE_HOSTILE'
    },
    {
      key: 'MEMORISER',
      text: "Graver la phrase dans ta mémoire. Continuer.",
      effects: [
        { type: "SET_FLAG", target: "lore_damnatio_kalthar" },
        { type: "SET_FLAG", target: "ruines_kalthar_etudiees" }
      ],
      next: 'ACTE2_04_VILLAGE_HOSTILE'
    }
  ]
},

'ACTE2_04_VILLAGE_HOSTILE': {
  sceneNumber: 'ACTE2_04_VILLAGE_HOSTILE', 
  chapter: 2, 
  title: "La Paranoïa Humaine", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Village_barricad%C3%A9_au_loin_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('fen_observe')) {
      text += "Alistair émerge d’une nuit sans repos, les yeux cernés par la surveillance occulte de la bête. Un roi mort qui ne dort jamais, et un prêtre qui commence à comprendre ce que ça signifie d’être jugé sans procès. Ses doigts tremblent sur son insigne sacré.\n\n";
    }
    text += "Les feux d’un village fortifié se dessinent à la lisière. La milice locale patrouille le long de la palissade, arbalètes chargées, le regard braqué sur les fourrés. Des fumées de soufre s’élèvent de la place : ils brûlent le givre pour conjurer la prophétie — comme si la peur, une fois assez dense, pouvait remplacer un mur.\n\n";
    if (gs.hasFlag('ruines_kalthar_etudiees') || gs.hasFlag('lore_damnatio_kalthar') || gs.hasFlag('diademe_retrouve')) {
      text += "Tu comprends mieux leurs brasiers : ce n’est pas seulement la prophétie qu’ils brûlent. C’est le même réflexe que sur le pont — effacer le givre, effacer le nom, effacer la peur.\n\n";
    } else if (gs.hasFlag('ruines_ignorees')) {
      text += "Tu n’as pas regardé les ruines. Le village, lui, regarde assez pour deux.\n\n";
    }
    text += "Passer sans affrontement est impossible.";
    return text;
  },
  choices: [
    { 
      key: 'O', 
      text: "Ordonner à Kaelen de nettoyer les vigies depuis les ombres, une par une.", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 5 }, 
        { type: "SET_FLAG", target: "village_sang" }
      ], 
      next: 'ACTE2_05_ARRIVEE_AUBERGE' 
    },
    { 
      key: 'E', 
      text: "Laisser Alistair brandir son autorité d’Inquisiteur, te faisant passer pour sa prisonnière.", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 5 }, 
        { type: "SET_FLAG", target: "alistair_geolier" }
      ], 
      next: '800' 
    },
    { 
      key: 'S', 
      text: "Avancer en pleine lumière. Éteindre leurs brasiers d’un souffle glacé pour semer la terreur.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 10 }, 
        { type: "SET_FLAG", target: "village_terreur" }
      ], 
      next: 'ACTE2_05_ARRIVEE_AUBERGE' 
    }
  ]
},

'ACTE2_05_ARRIVEE_AUBERGE': {
  sceneNumber: 'ACTE2_05_ARRIVEE_AUBERGE', 
  chapter: 2, 
  title: "Portes Closes", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Ext%C3%A9rieur_auberge_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Aubergiste%20bg/SPRITE_AUBERGISTE_GROGNANT_HOSTILE_202606231803.png",
  voice: "URL_VOIX_AUBERGISTE",
  getDynamicNarrative: (gs) => {
    let text = "L’Auberge du Sanglier Blanc dresse ses murs de bois vermoulu, ultime rempart avant les neiges éternelles. Dans un coin, des mercenaires comptent des pièces en chuchotant le nom des « Confrères de Cendre » — un nom qui ne signifie encore rien pour toi, et tout pour l’homme qui marche à ta droite.\n\n";
    text += "Un chat noir avec une tache blanche sur la gorge saute sur le comptoir. L’aubergiste l’appelle distraitement Azaya. Fen émerge de ton col et fixe le félin. L’espace d’une seconde, l’ancien roi et le chat de gouttière se toisent avec un respect absolu — deux créatures qui savent ce que c’est que de régner sur peu de chose — avant qu’Azaya ne détourne la tête avec un dédain royal.\n\n";

    if (gs.hasFlag('diademe_retrouve') || gs.hasFlag('lore_damnatio_kalthar')) {
      text += "Sur une poutre près du comptoir, quelqu’un a gratté un blason à moitié — même style de masse que sur le pont. Ici aussi, on a voulu faire taire un nom.\n\n";
    }
    if (gs.hasFlag('village_sang')) {
      text += "Dehors, le village est encore plongé dans le silence. Les cadavres des guetteurs n’ont pas encore été découverts. Le tenancier blêmit en remarquant le sang frais sur les gants de Kaelen, mais il ravale ses questions.";
    } else if (gs.hasFlag('village_terreur')) {
      text += "L’aubergiste recule d’un pas. La chute brutale de température à ton approche le fige d’effroi. Il a entendu les cris lointains des gardes de la palissade.";
    } else if (gs.hasFlag('prisonniere_refuse')) {
  text += "Alistair a baissé son insigne avant d'entrer. Le tenancier comprend que tu marches à ses côtés, pas sous sa garde. Le mot « prisonnière » ne franchit plus ses lèvres.\n\n";
} else if (gs.hasFlag('prisonniere_accepte') || gs.hasFlag('alistair_geolier')) {
  text += "L’homme s’incline avec une servilité craintive devant l’insigne d’Inquisiteur. Il n’ose pas poser de questions sur sa « prisonnière » — un mot qu’Alistair prononce avec une aisance qui devrait t’alarmer davantage.\n\n";
  text += "Alistair ne te regarde pas. Il garde les yeux fixés sur le tenancier, mais tu sens la tension dans sa mâchoire. Le rôle lui va trop bien.";
} else if (gs.hasFlag('silas_mort')) {
      text += "L’aubergiste blêmit : la rumeur de ton passage destructeur t’a précédée.";
    }

    text += "\n\n« Je n’ai qu’une seule mansarde utilisable sous les toits, » grogne-t-il en vous tendant précipitamment la clé en fer forgé. « Le reste de l’étage est condamné. Mon ancien commis, Siyane, a perdu l’esprit… Il ne reste qu’un seul matelas. À vous de décider qui dort au chaud. »";
    return text;
  },
  choices: [
    { key: 'A', text: "Saisir la clé de fer. Affronter le huis clos.", next: 'ACTE2_06_NUIT_AUBERGE' }
  ]
},

// V40.3.7 LEGACY — ancienne scène d'après-confidence, plus injectée dans une nouvelle partie.

'ACTE2_06B_LENDEMAIN_CONFIDENCE': {
  sceneNumber: '2.06B',
  chapter: 2,
  title: "Ce qui reste du silence",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/mansarde-auberge.webp",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('_lien_O_2_vu')) {
      if (gs.hasFlag('_lien_O_2_ouvert')) {
        return "Alistair est remonté. Kaelen est déjà près de la lucarne. Il ne détourne pas le regard quand tu passes : la confidence d’hier tient encore dans l’air, sans clause supplémentaire.\n\nLe silence entre vous n’est plus un mur. C’est un seuil.";
      }
      if (gs.hasFlag('_lien_O_2_ferme')) {
        return "Alistair est remonté. Kaelen est déjà près de la lucarne, le dos tourné. Ta réponse d’hier a refermé la conversation — proprement, comme un contrat qu’on refuse de renégocier.\n\nIl aiguise une lame. Le métal chante plus bas que d’habitude.";
      }
      return "Alistair est remonté. Kaelen est déjà près de la lucarne, le dos tourné. Il n’a pas dit un mot de plus depuis sa confidence. Mais quand tu passes près de lui, tu sens qu’il retient son souffle une fraction de seconde trop longtemps.\n\nLe silence entre vous n’est plus le même.";
    }
    if (gs.hasFlag('_lien_E_2_vu')) {
      if (gs.hasFlag('_lien_E_2_dur')) {
        return "Kaelen est revenu. Alistair range son insigne éteint contre sa poitrine. Tes mots d’hier — releve-toi seul — ont laissé une ligne nette entre vous.\n\nIl te salue d’un hochement. Professionnel. Trop.";
      }
      if (gs.hasFlag('_lien_E_2_doux')) {
        return "Kaelen est revenu. Alistair a encore la main près de l’endroit où ton doigt a touché l’insigne. Il ne te regarde pas directement, mais son attention colle à ta respiration comme une prière qu’il n’avoue plus.\n\nQuelque chose s’est ouvert. Il n’essaie pas de le refermer.";
      }
      return "Kaelen est revenu. Alistair range son insigne éteint contre sa poitrine comme on range une lettre qu’on n’osera plus relire. Il ne te regarde pas directement, mais tu sens son attention collée à ta moindre respiration.\n\nQuelque chose s’est ouvert. Et quelque chose d’autre s’est fermé.";
    }
    if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
      return "Le silence de la mansarde est devenu plus lourd que la veille. Kaelen près de la lucarne, Alistair près de la porte — deux sentinelles sans consigne. Tu n’en as donné aucune.";
    }
    return "Le silence de la mansarde est devenu plus lourd que la veille.";
  },
  choices: [
    { key: 'A', text: "Laisser le matin reprendre ses droits.", effects:[{type:'SET_FLAG',target:'_lendemain_confidence_vu'}], next: 'ACTE2_08_MATIN_AUBERGE' }
  ]
},

  // ... [AVEC LES MODIFICATIONS V27.0 APPLIQUÉES] ...

  // ==========================================
  // ACTE 2 — AUBERGE RÉÉCRITE V27.0
  // ==========================================

  // ==========================================
  // V28 — SCÈNES SOLO HABITÉES
  // ==========================================

'V28_SOLO_ECHO_AUBERGE': {
    sceneNumber: 'V28.2.ECHO',
    chapter: 2,
    title: "Ceux qui Attendront",
    mood: 'exploration',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chambre_exigu%C3%AB_202606191345.jpeg",
    getDynamicNarrative: (gs) => {
      let text = "Tu es seule dans la mansarde. Pourtant, la chambre garde deux traces de présence.\\n\\n";
      if (gs.getGauge('presence_O') >= gs.getGauge('presence_E')) {
        text += "Une dague est restée près de la lucarne. Pas oubliée. Déposée. Kaelen sait que tu la trouveras.\\n\\n";
      } else {
        text += "Un halo pâle reste sur le montant de la porte. Alistair a éteint son insigne avant de partir, mais la pierre s’en souvient encore.\\n\\n";
      }
      text += "Fen remue contre ta gorge. Le silence n’est plus vide. Il est peuplé de choses que tu as refusées — et de choses que tu pourrais encore choisir.\\n\\n";
      text += "Tu comprends enfin la différence entre être seule et être abandonnée.";
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Ne rien prendre. Garder seulement la possibilité de revenir.",
        effects: [
          { type: "ADD_GAUGE", target: "presence_S", value: 2 },
          { type: "SET_FLAG", target: "_v28_solo_echo_acte2_vu" }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      }
    ]
  },

'ACTE2_06_NUIT_AUBERGE': {
    sceneNumber: 'ACTE2_06_NUIT_AUBERGE',
    chapter: 2,
    title: "À Huis Clos",
    mood: 'tension',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chambre_exigu%C3%AB_202606191345.jpeg",
    spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
    spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
    onEnter: (state) => {
      // V27.0 : Les deux sont TOUJOURS présents au début
      if (!state.gauges.proximite_actuelle || state.gauges.proximite_actuelle === "neutre") {
        if ((state.gauges.lien_O || 0) > (state.gauges.lien_E || 0) + 2) {
          state.gauges.proximite_actuelle = "ombre";
        } else if ((state.gauges.lien_E || 0) > (state.gauges.lien_O || 0) + 2) {
          state.gauges.proximite_actuelle = "eclaireur";
        }
      }
    },
    getDynamicNarrative: (gs) => {
      let text = "Les combles sont étouffants. La charpente grince sous les assauts du blizzard. L'espace se réduit à un lit étroit, une chaise boiteuse, une lucarne donnant sur le néant. Fen s'approprie le centre de la couche, arbitre autoproclamé d'une guerre qu'il est seul à voir venir.\n";

      const presenceO = gs.hasFlag('avec_ombre')
        && !gs.hasFlag('kaelen_mort')
        && !gs.hasFlag('kaelen_perdu')
        && !gs.hasFlag('kaelen_perdu_definitif');
      const presenceE = gs.hasFlag('avec_eclaireur')
        && !gs.hasFlag('alistair_mort')
        && !gs.hasFlag('alistair_perdu')
        && !gs.hasFlag('alistair_perdu_definitif');

      if (presenceO && presenceE) {
        text += "Kaelen est posté près de la lucarne, dos tourné, mais son ombre effleure constamment la tienne. Alistair reste adossé à la porte, les bras croisés, l'insigne éteint entre ses doigts comme une prière qu'il n'ose plus formuler.\n";
        text += "Ils ne se regardent pas. Ils te regardent toi. Et dans ce triangle de silences, chacun attend de voir qui tu vas choisir — ou qui tu vas trahir en choisissant.\n";
      } else if (presenceO && !presenceE) {
        text += "Alistair a quitté la pièce il y a une heure. Il a dit 'prier en bas'. Vous savez tous les deux qu'il ne remontera pas.\n";
        text += "Kaelen est près de la lucarne. Seul. Avec toi. L'air sent la cendre froide et le cuir mouillé.\n";
      } else if (!presenceO && presenceE) {
        text += "Kaelen a disparu sans un mot. Sa dague restante gisait sur la pierre, là où il s'était assis. Un oubli ? Un message ?\n";
        text += "Alistair est adossé à la porte, plus pâle que d'habitude. Il a vu la dague. Il n'a rien dit.\n";
      } else {
        text += "Ils sont partis tous les deux. La mansarde n'a jamais été aussi grande.\n";
        text += "Fen est le seul corps chaud. Et pour la première fois, tu te demandes si c'est assez.\n";
      }

      // V40.3.7 — la conséquence de la confidence tient en un écho, pas une seconde scène.
      if (gs.hasFlag('_lien_O_2_ouvert')) {
        text += "\nLa confidence de Kaelen tient encore entre vous. Il ne l'explique pas une deuxième fois ; il ne baisse simplement plus les yeux quand tu le regardes.\n";
      } else if (gs.hasFlag('_lien_O_2_ferme')) {
        text += "\nKaelen a compris la limite. Il ne renégocie rien. Même son silence ressemble à un contrat respecté.\n";
      } else if (gs.hasFlag('_lien_E_2_doux')) {
        text += "\nAlistair garde son insigne éteint. Ton geste précédent lui suffit ; il ne transforme pas la nuit en seconde confession.\n";
      } else if (gs.hasFlag('_lien_E_2_dur')) {
        text += "\nAlistair reprend la distance que tu lui as imposée. Il ne se cache pas derrière une nouvelle prière pour la contester.\n";
      }

      if (gs.getGauge('tension_triangle') >= 6) {
        text += "\nL'air est si dense qu'on pourrait le trancher au couteau. Quelqu'un va craquer cette nuit.\n";
      }
      return text;
    },
    choices: [
      {
        key: 'O',
        condition: (gs) => companionPresentO(gs),
        text: "Rejoindre Kaelen près de la lucarne. Partager sa veille dans l'obscurité.",
        effects: [
          { type: "SET_FLAG", target: "intimite_O_auberge" },
          { type: "SET_FLAG", target: "_intimite_O_recente" },
          { type: "ADD_GAUGE", target: "lien_O", value: 2 },
          { type: "ADD_GAUGE", target: "distance_E", value: 2 },
          { type: "ADD_GAUGE", target: "tension_triangle", value: 3 }
        ],
        next: 'ACTE2_07_INTIMITE_O'
      },
      {
        key: 'E',
        condition: (gs) => companionPresentE(gs),
        text: "T'asseoir sur le matelas. Inviter Alistair à partager la seule chaleur disponible.",effects: [
          { type: "SET_FLAG", target: "intimite_E_auberge" },
          { type: "SET_FLAG", target: "_intimite_E_recente" },
          { type: "ADD_GAUGE", target: "lien_E", value: 2 },
          { type: "ADD_GAUGE", target: "distance_O", value: 2 },
          { type: "ADD_GAUGE", target: "tension_triangle", value: 3 }
        ],
        next: 'ACTE2_07_INTIMITE_E'
      },
      {
        key: 'V28_O_SOLO',
        condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
          && (gs.getGauge('presence_O') >= 4 || gs.getGauge('affinite_ombre') >= 6)
          && !gs.hasFlag('avec_ombre'),
        text: "Rejoindre Kaelen près de la lucarne. « Je n'ai pas changé d'avis. J'ai changé de distance. »",
        effects: [
          { type: "ADD_GAUGE", target: "presence_O", value: 2 },
          { type: "ADD_GAUGE", target: "lien_O", value: 2 },
          { type: "JOIN_COMPANION", target: "O" },
          { type: "SET_FLAG", target: "v28_bascule_auberge_O" }
        ],
        next: 'ACTE2_07_INTIMITE_O'
      },
      {
        key: 'V28_E_SOLO',
        condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
          && (gs.getGauge('presence_E') >= 4 || gs.getGauge('affinite_eclaireur') >= 6)
          && !gs.hasFlag('avec_eclaireur'),
        text: "Inviter Alistair à partager la chaleur. « Ne prie pas. Reste. »",
        effects: [
          { type: "ADD_GAUGE", target: "presence_E", value: 2 },
          { type: "ADD_GAUGE", target: "lien_E", value: 2 },
          { type: "JOIN_COMPANION", target: "E" },
          { type: "SET_FLAG", target: "v28_bascule_auberge_E" }
        ],
        next: 'ACTE2_07_INTIMITE_E'
      },
      {
        key: 'V28_S_SOLO',
        condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'),
        text: "Rester seule avec Fen. Ils peuvent attendre dehors.",
        effects: [
          { type: "ADD_GAUGE", target: "presence_S", value: 3 },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "SET_FLAG", target: "v28_solo_auberge_affirme" }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      },
      {
        key: 'S',
        text: "Tourner le dos à leur rivalité. Rester avec Fen et attendre calmement le matin.",
        effects: [
          { type: "SET_FLAG", target: "refus_nuit_auberge" },
          { type: "SET_FLAG", target: "_rejet_nuit_auberge_O" },
          { type: "SET_FLAG", target: "_rejet_nuit_auberge_E" },
          { type: "ADD_GAUGE", target: "distance_O", value: 3 },
          { type: "ADD_GAUGE", target: "distance_E", value: 3 },
          { type: "ADD_GAUGE", target: "tension_triangle", value: 5 }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      },
      {
        key: 'DOUBLE',
        condition: (gs) => gs.getGauge('lien_O') >= 4 && gs.getGauge('lien_E') >= 4 && gs.getGauge('tension_triangle') >= 5,
        text: "« Vous deux. Assez près du feu. Tous les deux. » Imposer une trêve.",
        effects: [
          { type: "SET_FLAG", target: "truce_auberge_forcee" },
          { type: "ADD_GAUGE", target: "tension_triangle", value: -2 },
          { type: "ADD_GAUGE", target: "instabilite", value: 3 }
        ],
        next: 'ACTE2_07_TRUCE_FORCEE'
      },
    {
      key:'V517_RELATION_CHOICE_NIGHT',
      condition:(gs)=>COND.romanceOpenO(gs)&&COND.romanceOpenE(gs)
        && gs.getGauge('lien_O')>=2&&gs.getGauge('lien_E')>=2
        && !gs.hasFlag('_lien_O_2_vu')&&!gs.hasFlag('_lien_E_2_vu')
        && !gs.hasFlag('_romance_beat_recent'),
      text:"Le silence offre deux présences. Décider vers qui aller cette nuit.",
      intent:'liberte',target:'Kaelen & Alistair',importance:'significant',
      next:'ROMANCE_AGENCY_NUIT_AUBERGE'
    }
  ]
  },

'ACTE2_07_INTIMITE_O': {
    sceneNumber: 'ACTE2_07_INTIMITE_O',
    chapter: 2,
    title: "Glace et Acier",
    mood: 'romance',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chambre_exigu%C3%AB_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
    getDynamicNarrative: (gs) => {
      let text = `Alistair quitte la pièce pour descendre prier parmi les ivrognes. Tu es seule avec l'Ombre — et pour la première fois, le silence entre vous ne pèse pas. Il *repose*.\n`;
      text += `Kaelen se tourne lentement vers toi. Sa dague effleure sa paume. Une odeur de cendre froide s'échappe de son manteau comme d'un feu qu'on aurait éteint trop vite.\n`;

      if (gs.getGauge('lien_O') >= 5 && gs.getGauge('distance_O') <= 3) {
        text += `« Je suis un monstre, oui. » Sa voix est basse, presque tendre. « Mais je suis *ton* monstre. Et ça, Reine, c'est la seule clause que je n'ai pas négociée. »\n`;
      } else {
        text += `« Le prêtre vacille, Elenya. Sa vertu n'est qu'un Sceau qui s'effondre, » murmure-t-il. « Moi, je n'ai aucun serment à trahir. Je suis un monstre, oui. Mais je suis *ton* monstre. »\n`;
      }

      text += `Ses doigts gantés effleurent la nappe de givre naissante sur ta joue. Un geste empreint d'une possession farouche — la même main, songes-tu confusément, qui pourrait un jour se refermer.`;

      
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Accepter son contact. « Alors prouve ta valeur, Kaelen. Reste à ma dévotion. »",
        effects: [
          { type: "ADD_GAUGE", target: "lien_O", value: 2 },
          { type: "ADD_GAUGE", target: "distance_O", value: -2 },
          { type: "ADD_GAUGE", target: "affinite_eclaireur", value: -3 },
          { type: "SET_FLAG", target: "kaelen_protecteur" },
          { type: "SET_FLAG", target: "kaelen_a_dit_ton_monstre" }
        ],
        next: 'ACTE2_07B_REACTION_E'
      },
      {
        key: 'B',
        text: "Repousser sa main. « Ne confonds pas mon intérêt avec de la soumission, assassin. »",
        effects: [
          { type: "ADD_GAUGE", target: "affinite_ombre", value: 5 },
          { type: "ADD_GAUGE", target: "distance_O", value: 2 },
          { type: "SET_FLAG", target: "rejet_kaelen" },
          { type: "SET_FLAG", target: "kaelen_limite_respectee" },
          { type: "REMOVE_FLAG", target: "intimite_O_auberge" },
          { type: "REMOVE_FLAG", target: "_intimite_O_recente" }
        ],
        next: 'ACTE2_07B_REACTION_E'
      }
    ]
  },

'ACTE2_07_INTIMITE_E': {
    sceneNumber: 'ACTE2_07_INTIMITE_E',
    chapter: 2,
    title: "La Cage Dorée",
    mood: 'romance',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chambre_exigu%C3%ab_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
    getDynamicNarrative: (gs) => {
      let text = `Kaelen lâche un rictus méprisant et s'éclipse dans le couloir. Alistair s'avance à pas lourds et s'agenouille devant toi, brisé. Ses paumes chaudes enveloppent tes poignets froids, libérant un flux magique doré pour apaiser ta peau — une odeur d'ozone, la même qu'à ton réveil, mais plus dense, plus proche, presque suffocante.\n`;

      if (gs.getGauge('lien_E') >= 5 && gs.getGauge('distance_E') <= 3) {
        text += `« Je sais quel abîme t'appelle, Elenya, » murmure-t-il, ses yeux fiévreux fixés sur tes lèvres. « Mais je refuse de te laisser devenir ce fléau. Je te protégerai. Dussé-je t'enfermer dans mes propres bras pour que le monde ne t'atteigne jamais. »\n`;
      } else {
        text += `« Je sais quel abîme t'appelle, Elenya, » murmure-t-il. « Mais je refuse de te laisser devenir ce fléau. Je briserai ton hiver, dussé-je t'enfermer dans un sanctuaire pour ton propre salut. »\n`;
      }

      text += `Sa poigne se resserre. Ce n'est plus une caresse. C'est la promesse d'une geôle sacrée — la même promesse qu'il t'a faite dans les ruines, en des mots presque identiques, sauf qu'à l'époque il parlait de *briser des chaînes*, et non d'en forger.`;

      
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Savourer sa chaleur. « Le monde m'a damnée, Alistair. Ne m'abandonne pas à mon tour. »",
        effects: [
          { type: "ADD_GAUGE", target: "lien_E", value: 2 },
          { type: "ADD_GAUGE", target: "distance_E", value: -2 },
          { type: "ADD_GAUGE", target: "affinite_ombre", value: -3 },
          { type: "SET_FLAG", target: "alistair_emprise" },
          { type: "SET_FLAG", target: "alistair_a_promis_cage" }
        ],
        next: 'ACTE2_07B_REACTION_O'
      },
      {
        key: 'B',
        text: "S'arracher à son étreinte. « Tes fers dorés ne m'entraveront pas, prêtre. »",
        effects: [
          { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 5 },
          { type: "ADD_GAUGE", target: "distance_E", value: 2 },
          { type: "SET_FLAG", target: "rejet_alistair" },
          { type: "SET_FLAG", target: "alistair_limite_respectee" },
          { type: "REMOVE_FLAG", target: "intimite_E_auberge" },
          { type: "REMOVE_FLAG", target: "_intimite_E_recente" }
        ],
        next: 'ACTE2_07B_REACTION_O'
      }
    ]
  },

'ACTE2_07B_REACTION_E': {
    sceneNumber: '2.07B.E',
    chapter: 2,
    title: "Ce que le prêtre a vu",
    mood: 'tension',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chambre_exigu%C3%ab_202606191345.jpeg",
    spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
    getDynamicNarrative: (gs) => {
      let text = "";
      const distE = gs.getGauge('distance_E');

      if (gs.hasFlag('rejet_kaelen')) {
        text += "Alistair a tout vu : la main de Kaelen s'approcher, puis ton geste net pour l'écarter.\n";
        text += "Il ne transforme pas ton refus en victoire personnelle. Il baisse simplement les yeux et te laisse reprendre ton espace.\n";
        text += "Kaelen remet son gant sans discuter. La limite a été entendue.\n";
      } else if (distE <= 3) {
        text += "Alistair n'a pas bougé. Il est resté adossé à la porte, les yeux fermés, les lèvres remuant une prière sans mots.\n";
        text += "Tu sens son regard sur ta nuque. Pas de reproche. Quelque chose de pire : de la résignation.\n";
        text += "Il sait. Il a toujours su. Mais voir la main de Kaelen effleurer ta joue — voir que tu n'as pas reculé — ça a brisé quelque chose qu'il ne pourra pas recoller avec des prières.\n";
        text += "Il finit par sortir. Sans bruit. La porte se referme. Et tu comprends, trop tard, que tu viens de perdre plus que tu ne l'imaginais.\n";
      } else if (distE <= 6) {
        text += "Alistair te regarde. Un instant. Deux.\n";
        text += "Puis il prend son insigne, le pose sur la table de nuit — entre vous, comme une frontière — et sort sans un mot.\n";
        text += "« Que la Lumière vous garde, » dit-il dans le couloir. Sa voix ne tremble pas. C'est ce qui te fait le plus mal.\n";
      } else {
        text += "Alistair crache. Littéralement. Sur le plancher, entre vos pieds.\n";
        text += "« Je vous laisse à votre nuit, » dit-il. Le mot 'nuit' sonne comme une insulte.\n";
        text += "Il claque la porte. Le bois tremble. Kaelen sourit. Toi, tu ne souris pas.\n";
      }
      return text;
    },
    choices: [
      {
        key: 'NEXT_INTIMITE',
        condition: (gs) => !gs.hasFlag('rejet_kaelen'),
        text: "Laisser la porte se refermer.",
        effects: [
          { type: "SET_FLAG", target: "alistair_a_vu_intimite_O" },
          { type: "SET_FLAG", target: "jalousie_auberge_vue" }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      },
      {
        key: 'NEXT_REFUS',
        condition: (gs) => gs.hasFlag('rejet_kaelen'),
        text: "Laisser chacun reprendre sa place.",
        effects: [
          { type: "SET_FLAG", target: "alistair_a_vu_refus_O" },
          { type: "SET_FLAG", target: "limite_auberge_vue" }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      }
    ]
  },

'ACTE2_07B_REACTION_O': {
    sceneNumber: '2.07B.O',
    chapter: 2,
    title: "Ce que l'assassin a vu",
    mood: 'tension',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chambre_exigu%C3%ab_202606191345.jpeg",
    spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
    getDynamicNarrative: (gs) => {
      let text = "";
      const distO = gs.getGauge('distance_O');

      if (gs.hasFlag('rejet_alistair')) {
        text += "Kaelen a vu Alistair resserrer sa prise, puis il t'a vue t'en dégager sans hésiter.\n";
        text += "Pour une fois, il ne ricane pas et ne transforme pas ton refus en avantage. Il range sa dague et détourne les yeux.\n";
        text += "Alistair ouvre les mains. La limite a été entendue.\n";
      } else if (distO <= 3) {
        text += "Kaelen n'a pas bougé. Il a regardé Alistair poser ses mains sur tes poignets. Il a regardé ta tête se pencher vers l'insigne éteint.\n";
        text += "Puis il a ramassé sa dague. Lentement. Comme un homme qui range une pièce après un enterrement.\n";
        text += "« Bon sommeil, Reine, » dit-il. Sa voix est plate. Trop plate. C'est la voix qu'il a avant de tuer.\n";
        text += "Il sort. La lucarne reste ouverte. Le froid entre. Tu ne le fermes pas.\n";
      } else if (distO <= 6) {
        text += "Kaelen ricane. Un rire sec, sans joie.\n";
        text += "« Le dévot a enfin trouvé sa sainte. » Il crache par terre. « Profite bien de ta cage dorée. »\n";
        text += "Il sort en claquant la porte. Alistair frissonne. Pas de froid. De triomphe.\n";
      } else {
        text += "Kaelen te fixe. Longuement. Puis il sourit.\n";
        text += "« Tu sais ce qui me plaît, Reine ? » dit-il en sortant. « C'est que tu vas le regretter. Pas demain. Pas la semaine prochaine. Mais un jour. Et ce jour-là, je serai loin. »\n";
        text += "La porte se ferme. Tu ne sais pas s'il ment.\n";
      }
      return text;
    },
    choices: [
      {
        key: 'NEXT_INTIMITE',
        condition: (gs) => !gs.hasFlag('rejet_alistair'),
        text: "Laisser la porte se refermer.",
        effects: [
          { type: "SET_FLAG", target: "kaelen_a_vu_intimite_E" },
          { type: "SET_FLAG", target: "jalousie_auberge_vue" }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      },
      {
        key: 'NEXT_REFUS',
        condition: (gs) => gs.hasFlag('rejet_alistair'),
        text: "Laisser chacun reprendre sa place.",
        effects: [
          { type: "SET_FLAG", target: "kaelen_a_vu_refus_E" },
          { type: "SET_FLAG", target: "limite_auberge_vue" }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      }
    ]
  },

'ACTE2_07_TRUCE_FORCEE': {
    sceneNumber: '2.07.TRUCE',
    chapter: 2,
    title: "La trêve qu'on n'a pas choisie",
    mood: 'tension',
    getDynamicNarrative: (gs) => {
      return "Tu l'as ordonné. Ils ont obéi. Pas par respect. Par épuisement.\n" +
        "Kaelen s'assoit à gauche du feu. Alistair à droite. Toi au centre. Fen sur tes genoux.\n" +
        "Personne ne parle. Le feu crépite. Le blizzard hurle dehors.\n" +
        "Puis Kaelen pousse un tison vers Alistair. Sans un mot.\n" +
        "Alistair le regarde. Hésite. Hoche la tête.\n" +
        "C'est le geste le plus proche d'une paix que tu aies jamais vu. Et tu sais, déjà, qu'il ne durera pas.\n" +
        "Mais ce soir, pour la première fois, ils ne sont pas ennemis. Juste deux hommes qui ont accepté de partager le feu. Avec toi au centre. Sans te posséder.";
    },
    choices: [
      {
        key: 'NEXT',
        text: "Laisser la nuit faire son travail.",
        effects: [
          { type: "SET_FLAG", target: "truce_auberge_forcee" },
          { type: "SET_FLAG", target: "tension_kaelen_alistair_apaisee" }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      }
    ]
  },

'ACTE2_07_TRANSE_FEN': {
    sceneNumber: 'ACTE2_07_TRANSE_FEN',
    chapter: 2,
    title: "Le souvenir que Fen réveille",
    mood: 'exploration',
    isFlashback: true,
    emotionalBeat: 'MÉMOIRE DE FEN',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Tr%C3%B4ne_astral_abstrait_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kalthar%20bg/SPRITE_KALTHAR_ASTRAL_DEBOUT_FACE_202606231758.png",
    getDynamicNarrative: (gs) => {
      let text = `La chambre ne disparaît pas d'un coup. Fen se glisse sous ton menton et sa chaleur ralentit ton souffle. Le blizzard, la charpente et les voix derrière la porte s'éloignent comme si la neige les recouvrait.\n\n`;
      text += `Quand tu rouvres les yeux, la mansarde a cédé la place à la solitude du Trône d'Ébène. Le spectre de Kalthar se dresse devant toi, son armure de brume larmoyante.\n\n`;
      text += `« Elenya… L'assassin cherchera à te posséder par le sang et la violence, tandis que le prêtre t'enfermera dans une cage dorée par dévotion… Les deux sont des geôles. »\n\n`;
      text += `Son visage spectral se rapproche, lourd d'un chagrin séculaire : « La cruauté de l'un ou la foi aveugle de l'autre finiront par te consumer. Ne sombre pas à nouveau dans leurs pièges. »`;

      if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
        text += "\n\nLa vision se fissure. La charpente revient d'abord, puis l'odeur de la neige. Alistair est debout près de la porte lorsque tu rouvres les yeux, mais tu reprends ta respiration seule.";
      } else {
        text += "\n\nLe trône se fissure. La charpente de l'auberge revient, puis la voix de Kaelen, penché sur toi, le front perlé de sueur : « Éveille-toi ! Ta transe est en train de figer la chambre ! »";
      }
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "T'agripper à son bras pour ancrer ton esprit dans le réel.",
        effects: [
          { type: "ADD_GAUGE", target: "instabilite", value: 5 },
          { type: "SET_FLAG", target: "avertissement_roi" }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      }
    ]
  },

'ACTE2_08B_MICRO_REACTION': {
    sceneNumber: '2.08B',
    chapter: 2,
    title: "Ce qui reste du silence",
    mood: 'intimate',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/mansarde-auberge.webp",
    getDynamicNarrative: (gs) => {
      let text = "";

      if (gs.hasFlag('avertissement_roi')) {
        text += "La vision se brise sans arracher le sol sous tes pieds. Tu rouvres les yeux dans la mansarde, Fen blotti contre ta gorge et le givre arrêté à quelques centimètres du plafond.\n";
        text += "Le trône, Kalthar et sa mise en garde ne sont déjà plus qu'un reflet derrière tes paupières. La chambre est toujours là. Le matin peut attendre quelques secondes.\n";
      }

      if (gs.hasFlag('intimite_O_auberge') && gs.hasFlag('alistair_a_vu_intimite_O')) {
        text += "Tu croises Alistair dans le couloir, avant qu'il ne sorte.\n";
        text += "Il ne te regarde pas. Il ajuste son insigne. Ses mains tremblent.\n";
        text += "« Je ne vous jugerai pas, » dit-il. « Mais ne me demandez pas de vous bénir. Pas ce matin. Pas tant que je sens encore son odeur sur vous. »\n";
        text += "Il passe. Tu ne le retiens pas. Tu ne peux pas.\n";
      } else if (gs.hasFlag('intimite_E_auberge') && gs.hasFlag('kaelen_a_vu_intimite_E')) {
        text += "Kaelen t'attend près de la porte. Il a un sourire carnassier.\n";
        text += "« Bien joué, Reine, » dit-il. « Le dévot est à toi. Mais dis-moi… quand il priera au-dessus de toi, est-ce que tu penseras à moi ? »\n";
        text += "Il n'attend pas de réponse. Il sort. Tu ne sais pas s'il plaisante.\n";
      } else if (gs.hasFlag('refus_nuit_auberge')) {
        text += "Tu les croises tous les deux en même temps, dans le couloir étroit.\n";
        text += "Un instant. Personne ne parle. Personne ne bouge.\n";
        text += "Puis Kaelen ricane. Alistair soupire. Ils s'écartent simultanément pour te laisser passer.\n";
        text += "C'est la chose la plus proche d'une trêve que tu aies jamais vue. Et tu la détestes.\n";
      }
      if (!text) {
        text = "Le couloir est silencieux au matin. La nuit n'a laissé ni aveu ni promesse, seulement cette distance prudente que chacun respecte encore. Tu descends rejoindre les autres sans forcer des mots qui ne sont pas prêts.";
      } else if (gs.hasFlag('avertissement_roi')) {
        text += "\nFen remue contre toi. Cette fois, le silence ne cache pas une autre scène : il marque simplement le retour au réel.";
      }
      return text;
    },
    choices: [
      {
        key: 'NEXT',
        text: "Reprendre pied dans la chambre, puis attendre que le matin commence.",
        effects: [
          { type: "SET_FLAG", target: "_micro_reaction_vu" }
        ],
        next: 'ACTE2_08_MATIN_AUBERGE'
      }
    ]
  },

'ACTE2_08_MATIN_AUBERGE': {
    sceneNumber: 'ACTE2_08_MATIN_AUBERGE',
    chapter: 2,
    title: "Le Froid Trahisseur",
    mood: 'tension',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Salle_commune_auberge_202606191345.jpeg",
    spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
    spriteRight: "Aubergiste",
    getDynamicNarrative: (gs) => {
      let text = "";

      if (gs.hasFlag('v28_solo_auberge_affirme')) {
        text += "Fen reste blotti contre ta gorge lorsque tu quittes la mansarde. Tu n'as pas choisi une vision ni une nouvelle voix dans ta tête : seulement quelques minutes de calme avant de redescendre.\n";
      }

      // V40.3.7 : payoff des choix de proximité de la scène relationnelle précédente.
      if (gs.hasFlag('intimite_O_suggeree')) {
        text += "Kaelen ne transforme pas le baiser en contrat au matin. Il te laisse sortir la première et reprend sa place dans le groupe sans commentaire — exactement comme il avait promis de ne rien prendre que tu ne donnes.\n";
      } else if (gs.hasFlag('kaelen_limite_respectee')) {
        text += "Kaelen ne retente pas le geste interrompu la veille. Quand vos mains se frôlent près de l'escalier, c'est lui qui retire la sienne le premier. « Pas ce soir », avait-tu dit. Il a entendu la limite, pas une invitation à négocier.\n";
      }
      if (gs.hasFlag('intimite_E_suggeree')) {
        text += "Alistair ne transforme pas le baiser en serment. Au matin, la porte de la chambre est encore ouverte derrière lui ; il n'y touche pas.\n";
      } else if (gs.hasFlag('alistair_limite_respectee')) {
        text += "Alistair garde une distance choisie, pas punitive. La porte reste ouverte et il ne cherche pas à convertir ton « pas encore » en promesse.\n";
      }

      // V27.0 : Conséquences visibles de la nuit
      if (gs.hasFlag('intimite_O_auberge')) {
        text += "Kaelen descend avec toi. Il ne revendique rien devant les autres ; ce qui s'est passé cette nuit n'a pas besoin d'être rejoué au petit matin.\n";
        if (gs.hasFlag('alistair_a_vu_intimite_O')) {
          if (gs.getGauge('distance_E') >= 7) {
            text += "Alistair te salue avec une correction glaciale et retourne à sa tasse. La blessure est là, mais il refuse d'en faire une seconde scène.\n";
          } else {
            text += "Alistair croise ton regard une fois. Il a vu, il sait, et te laisse décider si cette connaissance mérite des mots.\n";
          }
        }
      } else if (gs.hasFlag('intimite_E_auberge')) {
        text += "Alistair descend à tes côtés sans chercher à transformer la nuit en serment public. La porte est derrière vous ; le choix reste le tien.\n";
        if (gs.hasFlag('kaelen_a_vu_intimite_E')) {
          if (gs.getGauge('distance_O') >= 7) {
            text += "La place de Kaelen est vide. Sa réaction a déjà eu lieu ; son absence suffit, sans nouveau message à déchiffrer.\n";
          } else {
            text += "Kaelen est déjà là. Un mouvement de menton, rien de plus : il a vu, il sait, il reste.\n";
          }
        }
      } else if (gs.hasFlag('refus_nuit_auberge')) {
        text += "Ils descendent avec toi, ni protecteurs ni exclus. La distance de la nuit n'était pas un rejet — simplement l'absence de promesse.\n";
        if (gs.hasFlag('_rejet_nuit_auberge_O') && gs.hasFlag('_rejet_nuit_auberge_E')) {
          text += "Mais quelque chose a changé. Ils ne se battent plus. Ils ne te regardent plus. Ils ont compris, tous les deux, que tu ne choisiras pas. Et cette certitude les a glacés plus sûrement que le blizzard.\n";
        }
      } else if (gs.hasFlag('truce_auberge_forcee')) {
        text += "Ils descendent ensemble. Pas amis. Pas ennemis. Quelque chose d'instable. Une trêve qui ne tiendra pas.\n";
        text += "Kaelen a une égratignure sur la joue. Alistair boite légèrement. Tu ne demandes pas. Ils ne disent rien.\n";
      }

      text += "\nEn descendant dans la salle commune, l'ambiance est glaciale. La bière a gelé dans les chopes. Le feu de cheminée est mort, étouffé par une fine couche de givre bleu qui n'a rien de naturel.\n";
      text += "Ta simple présence prolongée sous ce toit a suffi à altérer la température du bâtiment — un aveu que ton corps fait à ta place.\n";
      text += "L'aubergiste balafré vous attend de pied ferme, une lourde arbalète épaulée.\n";

      return text;
    },
    choices: [
    
    { 
      key: 'O', 
      condition: (gs) => isClassicState(gs),
      text: "Donner le signal à Kaelen. Qu'il ouvre la voie dans le sang avant qu'ils ne tirent.", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 5 }, 
        { type: "SET_FLAG", target: "auberge_sanglante" }
      ], 
      next: 'LIEN_MARCHE_2' 
    },
    { 
      key: 'E', 
      condition: (gs) => isClassicState(gs),
      text: "Laisser Alistair révéler son sceau d'Inquisiteur pour exiger le passage.", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 5 }, 
        { type: "SET_FLAG", target: "auberge_soumise" }
      ], 
      next: 'LIEN_MARCHE_2' 
    },
    { 
      key: 'S', 
      condition: (gs) => isClassicState(gs), 
      text: "Geler l'arbalète de l'aubergiste et briser la porte d'entrée d'un coup de botte.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 10 }, 
        { type: "SET_FLAG", target: "auberge_gelee" }
      ], 
      next: 'LIEN_MARCHE_2' 
    },
    {
      key:'V517_RELATION_CHOICE_MORNING',
      condition:(gs)=>COND.romanceOpenO(gs)&&COND.romanceOpenE(gs)
        && gs.getGauge('lien_O')>=3&&gs.getGauge('lien_E')>=3
        && !gs.hasFlag('_done_R_O_1')&&!gs.hasFlag('_done_R_E_1')
        && !gs.hasFlag('_romance_beat_recent'),
      text:"Avant de reprendre la route, choisir à qui accorder ce moment.",
      intent:'liberte',target:'Kaelen & Alistair',importance:'significant',
      next:'ROMANCE_AGENCY_MATIN_AUBERGE'
    }
  ]
  },

  // ==========================================
  // NOUVELLES SCÈNES V27.0 — DETTE ÉMOTIONNELLE
  // ==========================================

'ACTE2_09_MARCHE_BLANCHE': {
  sceneNumber: 'ACTE2_09_MARCHE_BLANCHE', 
  chapter: 2, 
  title: "La Mort de l’Automne", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Paysage_tr%C3%A8s_enneig%C3%A9_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "La bâtisse s’efface derrière vous dans la brume. ";
    if (gs.hasFlag('baume_silas_utilise')) {
      text += "Le baume thermique de Silas brûle encore sous ta peau. Pour une fois, un objet pris sur la route change réellement la traversée : tes articulations répondent mieux et ton givre dévore moins vite tes réserves.\n\n";
    }

    if (gs.hasFlag('auberge_sanglante')) {
      text += "Les sacoches pleines des provisions pillées sur les cadavres, votre marche est brutale mais soutenue.\n\n";
    } else if (gs.hasFlag('auberge_soumise')) {
      text += "Les vivres réquisitionnés par le clerc maintiennent vos forces, mais la haine muette du village vous escorte.\n\n";
    } else if (gs.hasFlag('auberge_gelee')) {
      text += "Ayant fui l’auberge sans provisions, la faim ronge vos estomacs. Ta magie doit compenser l’épuisement physique du groupe, brûlant tes réserves.\n\n";
    }

    text += "La végétation pourrit à vue d’œil sous une nappe de neige de plus en plus épaisse. Le Vrai Nord commence ici — un pays qui n’a jamais connu que ton hiver.\n\n";

    if (gs.getGauge('instabilite') >= 15) {
      text += "Alistair observe tes doigts avec terreur. L’humidité cristallise spontanément sur ton passage sans incantation, dessinant sous ta peau de fines veines bleutées, comme des rivières gelées cherchant la surface. Ton humanité s’effrite.\n\n";
    }

    if (gs.hasFlag('kaelen_protecteur')) {
      text += "Kaelen ouvre la piste, brisant la croûte glacée pour sécuriser tes appuis d’une démarche inflexible.";
    } else if (gs.hasFlag('alistair_emprise')) {
      text += "Alistair se maintient à ta hauteur, murmurant des litanies pour endiguer ta mutation, comme on colmate une digue à mains nues.";
    } else {
      text += "Tu imposes une cadence impitoyable, indifférente à leurs corps qui souffrent.";
    }

    return text;
  },
  choices: [
    {
      key: 'BAUME_SILAS',
      condition: (gs) => gs.hasFlag('inventaire_baume') && !gs.hasFlag('baume_silas_utilise'),
      text: "Utiliser le baume thermique de Silas avant d’affronter la marche blanche.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: -4 },
        { type: "ADD_GAUGE", target: "volonte", value: 1 },
        { type: "REMOVE_FLAG", target: "inventaire_baume" },
        { type: "SET_FLAG", target: "baume_silas_utilise" }
      ],
      next: 'ACTE2_09_MARCHE_BLANCHE'
    },

    { 
      key: 'A', 
      text: "Forcer le pas. La tempête approche, leur fatigue est secondaire.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 5 }, 
        { type: "SET_FLAG", target: "marche_rapide" }
      ], 
      next: 'LIEN_MARCHE_BLANCHE' 
    },
    { 
      key: 'B', 
      condition: (gs) => !gs.hasFlag('auberge_gelee'), 
      text: "Ménager l’allure. Un outil brisé par le froid ne te servirait à rien.", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 2 }, 
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 2 }, 
        { type: "ADD_GAUGE", target: "instabilite", value: -3 }, 
        { type: "SET_FLAG", target: "marche_lente" }
      ], 
      next: 'LIEN_MARCHE_BLANCHE' 
    },
    { 
      key: 'B_HUNGRY', 
      condition: (gs) => gs.hasFlag('auberge_gelee'), 
      text: "Ralentir. L’absence de nourriture vous affaiblit trop pour courir.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 2 }, 
        { type: "SET_FLAG", target: "marche_lente" }
      ], 
      next: 'LIEN_MARCHE_BLANCHE' 
    }
  ]
},

'ACTE2_10_RAVIN': {
  sceneNumber: '2.10.BIS', 
  chapter: 2, 
  title: "Le Poids des Serments", 
  mood: 'tension',
  getDynamicNarrative: (gs) => {
    return "Le sentier s’arrête net devant une faille tellurique. En contrebas, un flot d’eau noire sature l’espace d’une énergie corrosive, comme une veine ouverte dans le corps du monde.\n\n" + "Alistair invoque sa foi pour forger un pont de lumière. Kaelen propose de te porter de bloc en bloc. Deux offres, deux serments tacites.\n\n" +
      (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')
        ? "Tu n’as pas à choisir un guide. Tu as à choisir un passage — et qui, éventuellement, restera sur l’autre rive."
        : "Un seul, tu le sens, tiendra jusqu’au bout. L’énergie est trop instable : le passage ne tiendra pas pour tout le monde.");
  },
  choices: [
    { key: 'NEXT', text: "S’approcher du courant noir...", next: 'ACTE2_10_RIVIERE_CRISTAL' }
  ]
},

'ACTE2_10_RIVIERE_CRISTAL': { 
  sceneNumber: 'ACTE2_10_RIVIERE_CRISTAL', 
  chapter: 2, 
  title: "Le Courant Noir", 
  mood: 'action', 
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Rivi%C3%A8re_noire_torrentielle_202606191345.jpeg", 
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png", 
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png", 
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('marche_rapide')) {
      text += "L’épuisement creuse les traits de tes compagnons à l’approche de l’eau noire.\n\n";
    } else {
      text += "L’allure ménagée leur a permis de garder l’œil vif face au danger.\n\n";
    }

    text += "Vous atteignez un torrent d’eau noire et bouillonnante, saturé d’une magie ancienne et agressive. L’ancien pont de pierre a été pulvérisé, ses vestiges à peine visibles sous l’écume sombre.\n\n";
    text += "Kaelen évalue la distance, pointant de gros blocs de givre à la dérive. « Je peux nous faire passer en bondissant de bloc en bloc. Je te porte, Elenya. Mais cette glace pourrie cédera sous le poids de l’armure du prêtre. »\n\n";
    text += "Alistair l’ignore et lève son sceptre. « Je vais forger une passerelle de lumière. » Il commence à incanter, mais le pont doré vacille et grésille sous les vapeurs toxiques du torrent. « Le courant corrompt ma magie… Le pont ne tiendra que quelques secondes avant de se dissoudre. »\n\n";
    text += "Il faut choisir, et vite. Deux mains tendues, un seul instant pour trancher — et la traversée laissera forcément l’un d’eux derrière, sur l’autre rive de ta décision.";
    return text;
  },
  choices: [
    { 
      key: 'O', 
      text: "Saisir la main de Kaelen. Sous votre poids, les blocs de glace s’enfoncent dans le courant noir, coupant la route à Alistair.", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 10 }, 
        { type: "SET_FLAG", target: "alistair_perdu" }
      ], 
      next: 'ACTE2_11_RIVE_NORD' 
    },
    { 
      key: 'E', 
      text: "T’élancer sur le pont d’Alistair. La structure divine fond dans l’eau noire juste après votre passage, bloquant Kaelen.", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 10 }, 
        { type: "SET_FLAG", target: "kaelen_perdu" }
      ], 
      next: 'ACTE2_11_RIVE_NORD' 
    },
    { 
      key: 'S', 
      text: "Geler une fine ligne d’eau pour toi seule. Le torrent furieux fracasse ta création immédiatement derrière toi.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 15 }, 
        { type: "SET_FLAG", target: "seule_nord" }
      ], 
      next: 'ACTE2_11_RIVE_NORD' 
    }
  ]
},

'ACTE2_11_RIVE_NORD': {
  sceneNumber: '2.11', 
  chapter: 2, 
  title: "Le Poids de l’Absence", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/lac-glaciaire.webp",
  getDynamicNarrative: (gs) => {
    let text = "Tes bottes frappent la rive nord avec lourdeur. Derrière toi, la fracture noire gronde, infranchissable — une frontière que tu viens de dessiner toi-même, d’un choix, sans y penser deux fois.\n\n";

    if (gs.hasFlag('alistair_perdu')) {
      text += "Kaelen te remet sur pied d’un geste ferme. Au-delà des vapeurs corrosives, la silhouette dorée du prêtre s’efface, comme une bougie qu’on éloigne trop vite d’une vitre. « Le dévot est resté sur la berge, » lâche l’assassin avec un sourire mauvais — et sous le sourire, quelque chose qui ressemble presque à du soulagement.";
    } else if (gs.hasFlag('kaelen_perdu')) {
      text += "Alistair s’écroule à tes côtés, épuisé. L’or divin s’est dissous en étincelles froides. Sur la berge sud, l’armure noire a disparu, avalée par la brume comme une dette qu’on efface. « C’est un décret de la Lumière, Elenya. Nous sommes enfin délivrés de son venin. »";
    } else {
      text += "Fen pointe le museau hors de ton col. Sur l’autre rive, les deux hommes observent ta trahison avec stupeur, deux silhouettes réduites par la distance à de simples taches de couleur. Cet isolement volontaire te procure une sensation de souveraineté absolue — et, quelque part sous la glace, un vertige que tu refuses de nommer.";
    }
    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "Trouver un abri pour la nuit.", 
      transitionGif: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Video/camp_setup.gif", 
      next: 'ACTE2_12_NUIT_ISOLEE' 
    }
  ]
},

'ACTE2_12_NUIT_ISOLEE': {
  sceneNumber: '2.12', 
  chapter: 2, 
  title: "Le Froid Rassurant", 
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/bivouac-souterrain.webp",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('alistair_perdu')) {
      return "Délivré de la censure morale du prêtre, Kaelen se déleste de ses armes une à une, comme on dépose une armure qu’on ne savait plus porter. « Sans ses litanies pour brider ton fluide, ta magie respire enfin, » note-t-il. Sa main effleure ton épaule — sans dague, sans gant, pour la première fois.";
    }
    if (gs.hasFlag('kaelen_perdu')) {
      return "Débarrassé de l’ombre inquisitrice du tueur, Alistair dépose son armure, pièce par pièce, dans un cliquetis presque cérémoniel. « Sa violence parasitait ton éveil, Elenya, » murmure-t-il en s’asseyant si près que son souffle réchauffe ta peau.";
    }
    return "En fixant les reflets de la glace vive, le souvenir du jour où tu as scellé ce torrent s’impose à toi, net comme une lame qu’on ressort d’un fourreau trop longtemps fermé. Fen te restitue ta mémoire fragment après fragment.";
  },
  choices: [
    { 
      key: 'O', 
      condition: (gs) => gs.hasFlag('alistair_perdu'), 
      text: "Le sommeil te gagne dans l’ombre...", 
      next: 'REVE_KAELEN' 
    },
    { 
      key: 'E', 
      condition: (gs) => gs.hasFlag('kaelen_perdu'), 
      text: "Le sommeil te gagne dans la lumière divine...", 
      next: 'REVE_ALISTAIR' 
    },
    { 
      key: 'S', 
      condition: (gs) => gs.hasFlag('seule_nord'), 
      text: "Le matin se lève sur la combe.", 
      next: 'ACTE2_12_QS_FLEURS' 
    },
    { 
      key: 'CONTINUER', 
      condition: (gs) => !gs.hasFlag('alistair_perdu') && !gs.hasFlag('kaelen_perdu') && !gs.hasFlag('seule_nord'), 
      text: "Fermer les yeux et laisser les fragments de mémoire s’ordonner...", 
      next: 'ACTE2_12_QS_FLEURS' 
    },
    {
      key:'V517_DEFERRED_O',
      condition:(gs)=>gs.hasFlag('_romance_deferred_O')&&COND.companionPresentO(gs)&&!gs.hasFlag('_romance_beat_recent'),
      text:"Revenir vers Kaelen. Cette conversation n'a pas disparu.",
      intent:'confiance',target:'Kaelen',importance:'significant',
      effects:[{type:'PUSH_RETURN',target:'ACTE2_12_NUIT_ISOLEE'}],
      next:'ROMANCE_DEFERRED_KAELEN'
    },
    {
      key:'V517_DEFERRED_E',
      condition:(gs)=>gs.hasFlag('_romance_deferred_E')&&COND.companionPresentE(gs)&&!gs.hasFlag('_romance_beat_recent'),
      text:"Revenir vers Alistair. Cette conversation n'a pas disparu.",
      intent:'confiance',target:'Alistair',importance:'significant',
      effects:[{type:'PUSH_RETURN',target:'ACTE2_12_NUIT_ISOLEE'}],
      next:'ROMANCE_DEFERRED_ALISTAIR'
    }
  ]
},

'REVE_KAELEN': {
  sceneNumber: 'REVE_KAELEN', 
  chapter: 2, 
  title: "Le Pacte des Cendres", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Tr%C3%B4ne_astral_abstrait_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kalthar%20bg/SPRITE_KALTHAR_ASTRAL_DEBOUT_FACE_202606231758.png",
  voice: "URL_VOIX_KALTHAR",
  getDynamicNarrative: (gs) => {
    return `La nuit te saisit sans transition. Tu te tiens dans une salle de pierre noire, face à un homme au visage masqué par des siècles de cendres — un visage qui, tu le sens, a porté beaucoup de noms avant celui-ci.\n\n« Le Pacte des Cendres, » murmure le spectre de Kalthar. « Mon ancêtre a payé le premier assassin de cette lignée pour veiller sur toi. Ce contrat a traversé les âges, changeant de mains, de visages, de dagues — mais jamais d’objet. Kaelen ne le sait pas encore, mais son sang est lié au mien par serment. »\n\nL’ombre de l’assassin se dessine derrière le trône, jeune, impatiente, ignorant encore le poids exact de son héritage — un contrat signé avant sa naissance, pour une reine qu’il croit avoir choisie librement.`;
  },
  choices: [
    { 
      key: 'A', 
      text: "Le souvenir s’efface...", 
      effects: [{ type: "SET_FLAG", target: "secret_ancetre_kaelen" }], 
      next: "ACTE2_12_QS_FLEURS" 
    }
  ]
},

'REVE_ALISTAIR': {
  sceneNumber: 'REVE_ALISTAIR', 
  chapter: 2, 
  title: "La Cage de Dévotion", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Tr%C3%B4ne_astral_abstrait_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kalthar%20bg/SPRITE_KALTHAR_ASTRAL_DEBOUT_FACE_202606231758.png",
  voice: "URL_VOIX_KALTHAR",
  getDynamicNarrative: (gs) => {
    return `Les murs de la mansarde s’effacent. Tu te tiens dans une chapelle de marbre blanc, éblouissante — un blanc trop pur pour être honnête.\n\n« La Cage de Dévotion, » souffle le spectre de Kalthar. « L’Inquisition n’a pas choisi Alistair par hasard. Sa lignée Leonhart a été purifiée pendant trois générations pour produire le geôlier parfait. Un homme assez dévot pour t’enchaîner, assez fort pour te contenir — et assez sincère pour ne jamais s’en rendre compte. »\n\nDes archives brûlent dans un brasier invisible. Des noms de famille s’effacent de la pierre, un par un, comme des preuves qu’on efface avant un procès. Alistair est le dernier maillon d’une chaîne forgée pour te capturer — et il croit, de toute son âme, qu’il est venu pour te libérer.`;
  },
  choices: [
    { 
      key: 'A', 
      text: "La lumière s’éteint...", 
      effects: [{ type: "SET_FLAG", target: "verite_lignee_alistair" }], 
      next: "ACTE2_12_QS_FLEURS" 
    }
  ]
},

'ACTE2_12_QS_FLEURS': {
  sceneNumber: '2.12.QS', 
  chapter: 2, 
  title: "La Mémoire du Sol", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/larmes-kalthar.webp",
  getDynamicNarrative: (gs) => {
    let text = "Dans une crevasse abritée du vent, des fleurs d’un rouge écarlate percent la neige, incongrues sur ce linceul blanc. Ce sont des Larmes de Kalthar. On dit qu’elles poussent là où le sang royal a touché la terre.\n\n";
    if (gs.hasFlag('fragment_kalthar_1')) {
      text += "En voyant ces pétales, le fragment de mémoire de l’automate vibre dans ton esprit. Tu ressens la tristesse du Roi Kalthar infuser tes propres veines, une douleur ancienne qui n’est pas tout à fait la tienne, et pas tout à fait celle d’un autre non plus.\n\n";
    }
    if (gs.hasFlag('kaelen_perdu')) {
      text += "Alistair s’arrête, le souffle court. Il veut en cueillir une pour son église, y voyant un signe de rédemption dans ce sang qui a fini par fleurir.";
    } else if (gs.hasFlag('alistair_perdu')) {
      text += "Kaelen s’arrête, la mâchoire serrée. Il veut les écraser sous sa botte, pour ne laisser aucune trace pour les Confrères de Cendre.";
    } else {
      text += "Seule, tu t’accroupis devant les pétales écarlates. Personne ici pour t’en disputer le sens — juste toi, et ce sang ancien qui a fini par fleurir.";
    }
    return text;
  },
  choices: [
    { 
      key: 'A', 
      condition: (gs) => gs.hasFlag('kaelen_perdu'), 
      text: "Laisser Alistair prier en paix.", 
      effects: [{ type: "ADD_GAUGE", target: "lien_E", value: 1 }], 
      next: 'ACTE2_13_PRYMAELIS' 
    },
    { 
      key: 'B_O', 
      condition: (gs) => gs.hasFlag('alistair_perdu'), 
      text: "Le laisser faire. « Elles ne serviront à personne, mortes ou vives. »", 
      effects: [{ type: "ADD_GAUGE", target: "lien_O", value: 1 }], 
      next: 'ACTE2_13_PRYMAELIS' 
    },
    { 
      key: 'B', 
      text: "Cueillir la fleur pour toi. « Un souvenir de lui. »", 
      effects: [{ type: "SET_FLAG", target: "fleur_sang_possedee" }], 
      next: 'ACTE2_13_PRYMAELIS' 
    }
  ]
},

'ACTE2_13_PRYMAELIS': {
  sceneNumber: '2.13', 
  chapter: 2, 
  title: "Le Complexe de Prymaëlis", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/galeries-basalte.webp",
  getDynamicNarrative: (gs) => {
    let text = "Vous atteignez le Défilé de Primaëlle. Le vent hurle contre les structures métalliques rouillées d’un cirque rocheux.\n\nAu centre, une immense porte de bronze barrée par des plaques de glace porte le nom **PRYMAËLIS** gravé en runes anciennes, brillant d’un éclat bleuté.\n\nLa porte reconnaît ton empreinte. Ce n’est pas une simple mine. C’est ton ancien sanctuaire royal, un hommage à une figure protectrice chérie de l’empire.";
    if (gs.hasFlag('fleur_sang_possedee')) {
      text += "\n\nLa fleur de sang cueillie sur la route s'est raidie dans le froid. Devant le nom de Prymaëlis, ses pétales se tournent pourtant vers la porte comme une aiguille vers le nord.";
    }
    return text;
  },
  choices: [
    { key: 'NEXT', text: "S’approcher des lourdes vannes...", next: 'ACTE2_13_MATIN_BIVOUAC' }
  ]
},

'ACTE2_13_MATIN_BIVOUAC': {
  sceneNumber: 'ACTE2_13_MATIN_BIVOUAC', 
  chapter: 2, 
  title: "Les Vestiges de l’Ancien Monde", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Entr%C3%A9e_de_mine_m%C3%A9tallique_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "La majesté de l’entrée s’impose. Fen détale le long d’un éperon rocheux pour s’arrêter devant la structure géométrique insérée dans la muraille : une immense vanne de fer corrodée, vestige d’une usine d’extraction de Mana pur.\n\n";
    if (gs.hasFlag('alistair_perdu')) {
      text += "Kaelen nettoie le givre des engrenages d’un revers de lame, presque tendre dans ce geste mécanique. « Le dogme clame que ta folie a rasé cette vallée. Ce mécanisme prouve que ton Église exploitait la montagne jusqu’à la moelle. »";
    } else if (gs.hasFlag('kaelen_perdu')) {
      text += "Alistair observe les glyphes industriels, blême, sa main tremblant à quelques centimètres du métal sans oser le toucher. « Les archives décrivent ce lieu comme le berceau de ton hérésie, Elenya… On m’a dissimulé la moitié des textes. »";
    } else {
      text += "Seule devant le vestige, tu apposes ta paume nue sur l’alliage gelé. Le métal reconnaît ton flux magique, comme une vieille serrure qui n’attendait que sa clé depuis des siècles.";
    }
    text += "\n\nLes contrepoids massifs gémissent, ouvrant un accès noir vers les galeries souterraines.";
    return text;
  },
  choices: [
    { key: 'A', text: "S’enfoncer dans les ténèbres industrielles de la mine.", next: 'ACTE2_14_VALVE_INTERMEDIAIRE' }
  ]
},

'ACTE2_14_VALVE_INTERMEDIAIRE': {
  // V26.3.6 — forcer vs absorber : flags + écho mine
  sceneNumber: '2.14.ADD',
  chapter: 2,
  title: "Pression de Mana",
  mood: 'action',
  getDynamicNarrative: (gs) => {
    return "Une conduite principale fuit, projetant des jets de Mana sous pression. Le passage exige une synchronisation parfaite. Le filon pulse — trop proche, trop vivant. Tu sens qu’il répondrait si tu ouvrais les canaux… ou qu’il te brûlerait si tu le traversais de force.";
  },
  choices: [
    {
      key: 'TRAVERSER',
      text: "Forcer le passage à travers le jet (sans absorber).",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 3 },
        { type: "SET_FLAG", target: "valve_forcee" }
      ],
      next: 'ACTE2_14_VALVE_ECHO'
    },
    {
      key: 'ABSORBER_FILON',
      text: "Ouvrir les canaux. Boire le mana du filon pour traverser plus vite.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 12 },
        { type: "SET_FLAG", target: "filon_absorbe" }
      ],
      next: 'ACTE2_14_VALVE_ECHO'
    }
  ]
},

'ACTE2_14_VALVE_ECHO': {
  // V26.3.6 — conséquence immédiate du choix valve
  sceneNumber: '2.14.ECHO',
  chapter: 2,
  title: "Après le Jet",
  mood: 'tension',
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('filon_absorbe')) {
      let t = "Le mana entre en toi comme une marée trop chaude. Tes veines s’allument d’un cyan douloureux. Le jet s’affaiblit — tu l’as bu plus qu’il ne t’a brûlé.\n\n";
      t += "Fen crache un éclair de givre. Quelque chose dans la mine a *entendu* : les filons plus loin vibrent à ton rythme maintenant.";
      if (gs.hasFlag('avec_eclaireur')) t += "\n\nAlistair recule d’un pas. « Ce n’est plus seulement du froid. C’est… une prise. »";
      if (gs.hasFlag('avec_ombre')) t += "\n\nKaelen a un rictus. « Efficace. Dangereux. J’aime les deux. »";
      return t;
    }
    let t = "Tu traverses à la force des épaules et du givre de surface. Le jet te lacère les avant-bras ; la peau fume un instant avant de se refermer trop vite.\n\n";
    t += "Tu n’as rien pris au filon. Il n’a rien pris de toi non plus — seulement une brûlure et le souvenir d’avoir refusé d’ouvrir.";
    if (gs.hasFlag('avec_eclaireur')) t += "\n\nAlistair expire, soulagé. « Parfois, ne pas boire le feu est déjà une prière. »";
    if (gs.hasFlag('avec_ombre')) t += "\n\nKaelen hausse un sourcil. « Propre. Ennuyeux. Mais propre. »";
    return t;
  },
  choices: [
    {
      key: 'NEXT',
      text: "S’enfoncer dans la mine.",
      next: 'ACTE2_14_MINE_PRYMAËLIS'
    }
  ]
},

'ACTE2_14_MINE_PRYMAËLIS': {
  sceneNumber: 'ACTE2_14_MINE_PRYMAËLIS',
  chapter: 2,
  title: "Les Échos Cristallisés",
  mood: 'action',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Int%C3%A9rieur_mine_de_cristaux_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let narrative = `Les boyaux de pierre sont saturés de filons de mana cyan, palpitant comme des veines sous une peau trop fine. Des ombres disloquées s’arrachent des parois : d’anciens mineurs, changés en goules de cristal par l’exposition prolongée au fluide brut.\n\n`;
    if (gs.hasFlag('filon_absorbe')) {
      narrative += `Les cristaux vibrent plus fort à ton approche — ils te reconnaissent comme une bouche déjà ouverte. Les goules se tournent vers toi en premier.\n\n`;
    } else if (gs.hasFlag('valve_forcee')) {
      narrative += `Tes avant-bras tirent encore. Les filons ne te reconnaissent pas : tu n’as fait que passer. Les goules hésitent une demi-seconde de plus.\n\n`;
    }

    if (gs.hasFlag('alistair_perdu')) {
  if (gs.hasFlag('dague_kaelen_prise')) {
    narrative += `Kaelen s’élance avec un rire féroce, sectionnant les articulations vitrifiées de sa dague restante, chaque coup net comme une signature. Fen recule devant l’énergie toxique.\n\n`;
  } else {
    narrative += `Kaelen s’élance avec un rire féroce, sectionnant les articulations vitrifiées de ses dagues, chaque coup net comme une signature. Fen recule devant l’énergie toxique.\n\n`;
  }

    } else if (gs.hasFlag('kaelen_perdu')) {
      narrative += `Alistair se poste en ancrage, libérant un rayon focalisé de son insigne pour dissoudre l’alliage. L’artefact chauffe à blanc, comme une prière qu’on force à devenir une arme.\n\n`;
    } else {
      narrative += `Les veines magiques entrent en résonance avec ton sang de givre. L’énergie accumulée réclame une décharge immédiate.\n\n`;
    }

    narrative += `Le silence revient sur les débris, plus dense qu’avant le combat. Une silhouette translucide émerge entre les filons cristallins, drapée de voiles opalescents. Sa forme est presque humaine, mais ses yeux brillent avec l’éternité des roches. C’est Prymaelis, la gardienne des mines de Prima.\n\n`;
    narrative += `« Enfin… », murmure-t-elle, sa voix résonnant contre les parois comme un écho glacé, comme si elle avait répété ce mot pendant des siècles pour ne pas oublier comment il sonnait. « Une âme qui reconnaît la vérité du gel. »\n\n`;
    narrative += `Elle pointe vers un pupitre scellé sous le givre. Fen découvre un registre de direction. Les rapports sont indiscutables :\n\n`;
    narrative += `« L’Ordre surmenait l’extraction pour déterrer la Larme d’Ébène », explique Prymaelis. « En creusant les piliers tectoniques, ils risquaient d’engloutir les cités du Sud. Vous avez figé le complexe. Vous avez sauvé des milliers de vies — et ils ont préféré vous appeler monstre plutôt que de vous devoir quoi que ce soit. »\n\n`;

    if (gs.hasFlag('alistair_perdu')) {
      narrative += `Kaelen siffle entre ses dents. « Tu as sauvé leurs provinces, et ils ont fabriqué une légende de démon pour justifier leur faillite. »\n\n`;
      narrative += `Prymaelis acquiesce, son sourire spectral s’élargissant. « Le monde est une transaction truquée. Mais vous… vous avez compris le prix du silence. »`;
    } else if (gs.hasFlag('kaelen_perdu')) {
      narrative += `Alistair lâche son arme, s’effondrant sur ses genouillères. Sa foi vacille devant les chiffres. « Mes maîtres savaient… »\n\n`;
      narrative += `« Oui », dit Prymaelis avec douceur, une douceur presque maternelle. « Et ils ont choisi l’oubli plutôt que la gratitude. »`;
    } else {
      narrative += `Prymaelis te regarde droit dans les yeux, comme si elle lisait un jugement rendu depuis longtemps. « Tu vois, maintenant. Tu n’étais pas le monstre de leurs sermons. Tu étais le bouclier du monde. »`;
    }

    return narrative;
  },
  choices: [
    {
      key: 'O',
      condition: (gs) => gs.hasFlag('alistair_perdu'),
      text: "Poser ta main sur l’épaule de Kaelen. « L’Ordre payera sa dette avec les intérêts. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 2 },
        { type: "SET_FLAG", target: "combat_mine_O" },
        { type: "SET_FLAG", target: "prymaelis_encountered" }
      ],
      next: 'ACTE2_15_SOUVENIRS_MINE'
    },
    {
      key: 'E_REDEMPTION',
      condition: (gs) => gs.hasFlag('kaelen_perdu'),
      text: "Prendre le menton d’Alistair. « La vérité te libère. Nous briserons leurs idoles ensemble. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 3 },
        { type: "SET_FLAG", target: "combat_mine_E" },
        { type: "SET_FLAG", target: "prymaelis_encountered" }
      ],
      next: 'ACTE2_15_SOUVENIRS_MINE'
    },
    {
      key: 'E_CRAVACHE',
      condition: (gs) => gs.hasFlag('kaelen_perdu'),
      text: "« Pleure sur tes mensonges si tu veux, mais fais-le en marchant. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "combat_mine_E" },
        { type: "SET_FLAG", target: "prymaelis_encountered" },
        { type: "ADD_GAUGE", target: "instabilite", value: 2 }
      ],
      next: 'ACTE2_15_SOUVENIRS_MINE'
    },
    {
      key: 'C',
      text: "Refermer le livre d’acier sans ajouter un mot.",
      effects: [
        { type: "SET_FLAG", target: "combat_mine_S" },
        { type: "SET_FLAG", target: "prymaelis_encountered" },
        { type: "ADD_GAUGE", target: "instabilite", value: 3 }
      ],
      next: 'ACTE2_15_SOUVENIRS_MINE'
    },
    {
      key: 'INTERACT_PRYMAELIS',
      text: "S’adresser directement à Prymaelis. « Qui es-tu ? Pourquoi m’aider ? »",
      response: "Prymaelis incline la tête. « J’étais la gardienne de ce complexe avant que l’Ordre ne transforme la montagne en dette. Je ne vous aide pas par fidélité, Majesté. Je témoigne. Trois siècles de mensonge ont besoin d’au moins une voix qui n’ait rien à gagner. »",
      condition: (gs) => !gs.hasFlag('prymaelis_spoken'),
      effects: [
        { type: "SET_FLAG", target: "prymaelis_spoken" },
        { type: "SET_FLAG", target: "prymaelis_encountered" }
      ],
      next: 'ACTE2_15_SOUVENIRS_MINE'
    }
  ]
},

'ACTE2_15_SOUVENIRS_MINE': {
  sceneNumber: 'ACTE2_15_SOUVENIRS_MINE', 
  chapter: 2, 
  title: "La Vérité du Gel", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Salle_de_contr%C3%B4le_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "L’écho des paroles de Prymaelis s’estompe entre les filons de cristal, mais leur poids reste, tapi dans le silence retrouvé.\n\n";

    if (gs.hasFlag('alistair_perdu')) {
      if (gs.hasFlag('dague_kaelen_prise')) {
        text += "Kaelen range sa dague restante avec une lenteur inhabituelle, le regard perdu sur le registre — comme si cette vérité pesait plus lourd que n’importe quelle lame.";
      } else {
        text += "Kaelen range ses dagues avec une lenteur inhabituelle, le regard perdu sur le registre — comme si cette vérité pesait plus lourd que n’importe quelle lame.";
      }
    } else if (gs.hasFlag('kaelen_perdu')) {
  text += "Alistair reste agenouillé un instant de trop, encore tremblant. Le doute qu’il vient d’avaler ne le quittera plus.";
  
} else {
      text += "Seule face aux débris, tu laisses la vérité géologique s’installer, froide et sans appel.";
    }

    return text;
  },
  choices: [
    { key: 'NEXT', text: "Laisser le registre derrière toi et poursuivre.", next: 'ACTE2_16_NUIT_MINE' }
  ]
},

'ACTE2_16_NUIT_MINE': {
  sceneNumber: 'ACTE2_16_NUIT_MINE', 
  chapter: 2, 
  title: "Le Feu sous la Glace", 
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Salle_de_contr%C3%B4le_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('alistair_perdu')) {
      return "La chaleur résiduelle des turbines sature la pièce. Kaelen brise l’écart, te pressant contre la roche, son odeur de cendre froide mêlée à la vapeur métallique. « Laisse le Sud à ses fables, Elenya. Je t’appartiens, corps et âme, » murmure-t-il, ses lèvres frôlant les tiennes — une promesse qui ne dit toujours pas tout.";
    }
    if (gs.hasFlag('kaelen_perdu')) {
      return "Alistair est dépossédé de son univers. Ses doigts tremblants remontent le long de ton cou, une odeur d’ozone tiède flottant entre vous comme un aveu. « Tout mon Ordre n’est qu’un blasphème… Il n’y a de sacré que ce que je ressens près de toi, » souffle-t-il avec la ferveur d’un damné qui vient de perdre son dieu et t’a trouvée à la place.";
    }
    return "Seule sur la roche tiède, tu laisses ton flux magique s’équilibrer. Ta souveraineté se passe de bras charnels.";
  },
  choices: [
    { 
      key: 'O_DOM', 
      condition: (gs) => gs.hasFlag('alistair_perdu'), 
      text: "Saisir sa nuque et imposer ton baiser avec l’autorité d’une Reine.", 
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 3 }, 
        { type: "SET_FLAG", target: "nuit_intense_O" }
      ], 
      next: 'ACTE2_17_RETROUVAILLES_SORTIE' 
    },
    { 
      key: 'E_DOUX', 
      condition: (gs) => gs.hasFlag('kaelen_perdu'), 
      text: "Envelopper son étreinte avec une douceur calculée pour panser ses blessures d’orgueil.", 
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 3 }, 
        { type: "SET_FLAG", target: "nuit_intense_E" }
      ], 
      next: 'ACTE2_17_RETROUVAILLES_SORTIE' 
    },
    { 
      key: 'SOLO', 
      condition: (gs) => !gs.hasFlag('alistair_perdu') && !gs.hasFlag('kaelen_perdu'), 
      text: "S’éloigner vers les générateurs pour méditer seule.", 
      effects: [{ type: "SET_FLAG", target: "nuit_nord_S" }], 
      next: 'ACTE2_16_COMMUNION_SOLO' 
    }
  ]
},

'ACTE2_16_COMMUNION_SOLO': {
  sceneNumber: 'ACTE2_16_COMMUNION_SOLO', 
  chapter: 2, 
  title: "Le Silence Choisi", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Salle_de_contr%C3%B4le_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Fen%20bg/SPRITE_FEN_ASSIS_FACE_FIX_202606231738.png",
  voice: "",
  text: "Au centre des générateurs gélifiés, tu enfouis tes doigts dans la fourrure de Fen. Sa tiédeur est l’unique ancrage que tu t’autorises. Face au mensonge d’une ère, la colère se mue en une certitude glacée : tu n’as besoin ni de l’absolution d’un clergé corrompu, ni de la validation d’un mercenaire. Cette solitude n’est pas un exil, c’est l’armure la plus pure — et pour la première fois depuis ton réveil, elle ne pèse rien.",
  choices: [
    { 
      key: 'A', 
      text: "Se redresser. Reprendre la route vers la Citadelle selon tes seuls termes.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: -5 }, 
        { type: "SET_FLAG", target: "solo_lucidite" }
      ], 
      next: 'ACTE2_17_RETROUVAILLES_SORTIE' 
    }
  ]
},

'ACTE2_17_RETROUVAILLES_SORTIE': {
  sceneNumber: 'ACTE2_17_RETROUVAILLES_SORTIE', 
  chapter: 2, 
  title: "Fantômes dans le Blizzard", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Rivi%C3%A8re_noire_torrentielle_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Les lourdes vannes nord s’ouvrent sur un mur de blizzard indomptable. À moitié ensevelie sous la poudreuse, une silhouette barre la sortie, immobile comme une question qu’on refuse de poser à voix haute.\n\n";

    if (gs.hasFlag('alistair_perdu')) {
      text += "Alistair se tient là, son armure sainte martelée par les glaces du torrent — vivant, alors que le courant aurait dû l’engloutir. Ton souffle se coupe une seconde de trop avant que tu ne le maîtrises. « Un affluent plus au sud, » lâche-t-il avant que tu ne poses la question, sa voix rauque de froid. « Ton Dieu ne m’a pas voulu, ou le mien ne t’a pas lâchée. » Son regard bascule sur Kaelen, puis s’ancre sur toi. « Vos secrets puent l’hérésie, Reine. Qu’avez-vous déterré sous cette roche ? »";
    } else if (gs.hasFlag('kaelen_perdu')) {
      text += "Kaelen est adossé à un bloc de givre, les bras croisés, cette fausse nonchalance qu’il porte comme une armure — vivant, alors que tu l’avais laissé de l’autre côté d’un torrent censé être infranchissable. « Une faille dans la paroi est, » dit-il avant que tu ne demandes, devançant ta question comme il devance toujours tes soupçons. « Les Confrères de Cendre m’ont appris à ne jamais faire confiance à une seule route. » « Alors ? On partage les mystères de la crypte ou on continue à jouer la comédie ? »";
    } else {
      text += "Les deux hommes se tiennent à distance. « Vos pas traînent, Elenya, » note le clerc d’un ton sec, sans qu’on sache s’il parle de fatigue ou de méfiance.";
    }
    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "Mentir : « Rien. Des ruines creuses. »", 
      effects: [
        { type: "SET_FLAG", target: "mensonge_mine" },
        { type: "SET_FLAG", target: "river_reunion_complete" },
        { type: "REMOVE_FLAG", target: "kaelen_perdu" },
        { type: "REMOVE_FLAG", target: "alistair_perdu" }
      ], 
      next: 'ACTE3_01_TENSION_GROUPE' 
    },
    { 
      key: 'B', 
      text: "« J’ai stabilisé cette montagne pendant que vos ancêtres pillaient le Mana. »", 
      effects: [
        { type: "SET_FLAG", target: "verite_mine" },
        { type: "SET_FLAG", target: "river_reunion_complete" },
        { type: "REMOVE_FLAG", target: "kaelen_perdu" },
        { type: "REMOVE_FLAG", target: "alistair_perdu" }
      ], 
      next: 'ACTE3_01_TENSION_GROUPE' 
    },
    { 
      key: 'C', 
      text: "Passer entre eux sans un mot. Ta royauté ne leur doit aucune explication.", 
      effects: [
        { type: "SET_FLAG", target: "silence_mine" },
        { type: "SET_FLAG", target: "river_reunion_complete" },
        { type: "REMOVE_FLAG", target: "kaelen_perdu" },
        { type: "REMOVE_FLAG", target: "alistair_perdu" }
      ], 
      next: 'ACTE3_01_TENSION_GROUPE' 
    }
  ]
},

'ACTE2_09B_BIVOUAC_GLACE': {
sceneNumber: '2.09B',
chapter: 2,
title: "L'Abri de la Marche Blanche",
mood: 'tension',
image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Tempete_neige_abri_202606191345.jpeg",
getDynamicNarrative: (gs) => {
let text = "La tempête blanche force un arrêt. Vous vous blottissez sous un surplomb de glace qui gémit sous les rafales. L'espace est exigu, une tombe de glace temporaire.\n\n";

if (gs.getGauge('instabilite') >= 30) {
  text += "Tes pupilles ont disparu, noyées dans un blanc arctique. Dans l'obscurité bleue de l'abri, tes yeux brillent comme des phares. ";
} else if (gs.getGauge('instabilite') >= 15) {
  text += "Des veines de givre palpitent sous ta peau, visibles même dans la pénombre. ";
}

if (gs.hasFlag('alistair_perdu')) {
  text += "Kaelen déploie une bâche de cuir pour bloquer l'entrée. Ses gestes sont rapides, efficaces, mais tu le vois jeter des regards vers tes mains --- fasciné par ce que tu deviens.\n\n";
} else if (gs.hasFlag('kaelen_perdu')) {
  text += "Alistair murmure des litanies de protection contre le froid. Ses prières s'étouffent quand il croise ton regard. Il voit le givre sous ta peau et sa foi vacille --- non pas par peur du démon, mais par peur de t'aimer dans ta transformation.\n\n";
} else if (gs.hasFlag('seule_nord')) {
  text += "Seule, tu sculptes les parois de l'abri pour qu'elles épousent ton dos. Fen se love contre ton cou, le seul témoin de ta métamorphose.\n\n";
} else {
  text += "Kaelen et Alistair se taisent, paralysés par la proximité forcée. Leurs haines personnelles semblent minuscules face au froid qui sort de toi.\n\n";
}

text += "Dans un recoin, quelque chose brille --- un éclat d'obsidienne noire, lisse, déplacé par la tempête. Il ne devrait pas être ici. La neige à des kilomètres à la ronde est blanche.\n\n";

return text;

},
choices: [
{
key: 'O_JOUTE',
condition: (gs) => (gs.hasFlag('avec_ombre') || gs.hasFlag('alistair_perdu')),
text: "Fixer Kaelen. « Parle-moi de tes cauchemars, assassin. Je veux savoir ce qui te fait trembler. »",
effects: [
{ type: "ADD_GAUGE", target: "lien_O", value: 1 },
{ type: "SET_FLAG", target: "bivouac_glace_joute" }
],
next: 'ACTE2_09B_JOUTE_PSY'
},
{
key: 'E_JOUTE',
condition: (gs) => (gs.hasFlag('avec_eclaireur') || gs.hasFlag('kaelen_perdu')),
text: "Saisir le poignet d'Alistair. « Dis-moi la vérité, prêtre. Pas celle de ton Ordre. La tienne. »",
effects: [
{ type: "ADD_GAUGE", target: "lien_E", value: 1 },
{ type: "SET_FLAG", target: "bivouac_glace_joute" }
],
next: 'ACTE2_09B_JOUTE_PSY'
},
{
key: 'S_ECLAT',
condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde') || gs.hasFlag('seule_nord')) && !gs.hasFlag('eclat_larme_vu'),
text: "Ramasser l'éclat d'obsidienne. Fen le recouvre immédiatement de givre.",
effects: [
{ type: "ADD_GAUGE", target: "instabilite", value: 2 },
{ type: "SET_FLAG", target: "eclat_larme_vu" }
],
next: 'FRAGMENT_KALTHAR_LARME'
},
{
key: 'REPARER',
condition: (gs) => (gs.hasFlag('avec_ombre') && gs.hasFlag('O_distant_1')) || (gs.hasFlag('avec_eclaireur') && gs.hasFlag('E_distant_1')),
text: "Utiliser le silence pour réparer ce qui a été brisé dans la traversée.",
effects: [
{ type: "REMOVE_FLAG", target: "O_distant_1" },
{ type: "REMOVE_FLAG", target: "E_distant_1" },
{ type: "SET_FLAG", target: "bivouac_glace_repare" }
],
next: 'ACTE2_10_RAVIN'
},
{
key: 'AVANCER',
text: "Attendre que la tempête faiblisse et repartir.",
effects: [
{ type: "SET_FLAG", target: "bivouac_glace_isole" }
],
next: 'ACTE2_10_RAVIN'
}
]
},

'ACTE2_09B_JOUTE_PSY': {
  sceneNumber: '2.09B.J',
  chapter: 2,
  title: "Le Jeu des Ombres et de la Lumière",
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Abri_glace_intimite_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "La tempête fait office de muraille. Dans cet abri de glace, le silence n'est pas vide --- il est chargé de questions que personne n'ose poser à voix haute.\n\n";

    if (gs.hasFlag('avec_ombre') || gs.hasFlag('alistair_perdu')) {
      if (gs.hasFlag('dague_kaelen_prise')) {
        text += "Kaelen est assis en tailleur, sa dague restante posée devant lui comme une carte qu’il refuse de jouer. « Tu parles dans ton sommeil, » dit-il soudain, sans te regarder. « Tu dis des noms. Des ordres. Des regrets. »\n\n";
      } else {
        text += "Kaelen est assis en tailleur, ses dagues posées devant lui comme des cartes qu’il refuse de jouer. « Tu parles dans ton sommeil, » dit-il soudain, sans te regarder. « Tu dis des noms. Des ordres. Des regrets. »\n\n";
      }
    } else if (gs.hasFlag('avec_eclaireur') || gs.hasFlag('kaelen_perdu')) {
      text += "Alistair tient son insigne éteint entre ses paumes, le pouce caressant les arêtes usées. « Dans l'Ordre, on nous apprend que le doute est une maladie, » murmure-t-il. « Mais depuis que je te suis... je doute de tout. Sauf de toi. Et c'est cela qui me terrifie. »\n\n";
    }

    if (gs.getGauge('instabilite') >= 30) {
      text += "Tes pupilles blanches captent la lueur du feu. Tu vois à travers eux. ";
      if (gs.hasFlag('avec_ombre') || gs.hasFlag('alistair_perdu')) {
        text += "L'âme de Kaelen n'est plus un mystère : c'est un loup de cendre, magnifique, mutilé, qui attend le coup de grâce ou la caresse avec la même impatience. ";
      } else {
        text += "L'âme d'Alistair est une cage dorée rouillée, dont les barreaux se tordent autour d'un cœur encore chaud. ";
      }
      text += "Tu parles sans choisir tes mots, car tes mots te choisissent.\n\n";
    } else if (gs.getGauge('instabilite') >= 15) {
      text += "Les veines de givre sous ta peau pulsent en rythme avec ton cœur. ";
      if (gs.hasFlag('avec_ombre') || gs.hasFlag('alistair_perdu')) {
        text += "Kaelen ne détache pas son regard de tes mains. Il est fasciné, hypnotisé par ce que tu deviens --- et par ce qu'il pourrait devenir à tes côtés. ";
      } else {
        text += "Alistair recule d'un pouce, puis se force à tenir. Il a peur. Pas de toi. De ce qu'il est prêt à sacrifier pour toi. ";
      }
      text += "\n\n";
    }

    text += "Ce qui restait sous les mots est remonté à la surface. Les mensonges polis n’ont plus où se cacher.";

    return text;
  },
choices: [
{
key: 'O_INTIME',
condition: (gs) => (gs.hasFlag('avec_ombre') || gs.hasFlag('alistair_perdu')) && gs.getGauge('instabilite') < 15,
text: "« Mon seul regret est de ne pas me souvenir de toi. »",
effects: [
{ type: "ADD_GAUGE", target: "lien_O", value: 3 },
{ type: "SET_FLAG", target: "joute_intime_O" }
],
next: 'ACTE2_10_RAVIN'
},
{
key: 'O_PREDATRICE',
condition: (gs) => (gs.hasFlag('avec_ombre') || gs.hasFlag('alistair_perdu')) && gs.getGauge('instabilite') >= 30,
text: "« Tu es à moi, Kaelen. Corps, lame, et serment. Répète-le. »",
effects: [
{ type: "ADD_GAUGE", target: "lien_O", value: 3 },
{ type: "ADD_GAUGE", target: "instabilite", value: 5 },
{ type: "SET_FLAG", target: "joute_predatrice" }
],
next: 'ACTE2_10_RAVIN'
},
{
key: 'O_FROIDE',
condition: (gs) => (gs.hasFlag('avec_ombre') || gs.hasFlag('alistair_perdu')) && gs.getGauge('instabilite') >= 15 && gs.getGauge('instabilite') < 30,
text: "« Mes cauchemars ne te concernent pas. Concentre-toi sur ta survie. »",
effects: [
{ type: "ADD_GAUGE", target: "affinite_ombre", value: 3 },
{ type: "SET_FLAG", target: "joute_fragile" }
],
next: 'ACTE2_10_RAVIN'
},
{
key: 'E_INTIME',
condition: (gs) => (gs.hasFlag('avec_eclaireur') || gs.hasFlag('kaelen_perdu')) && gs.getGauge('instabilite') < 15,
text: "« Ta foi n'est pas un fardeau, Alistair. C'est une lumière que je n'ai pas le droit d'éteindre. »",
effects: [
{ type: "ADD_GAUGE", target: "lien_E", value: 3 },
{ type: "SET_FLAG", target: "joute_intime_E" }
],
next: 'ACTE2_10_RAVIN'
},
{
key: 'E_PREDATRICE',
condition: (gs) => (gs.hasFlag('avec_eclaireur') || gs.hasFlag('kaelen_perdu')) && gs.getGauge('instabilite') >= 30,
text: "« À genoux, Sentinelle. Je veux que tu me regardes depuis le sol. »",
effects: [
{ type: "ADD_GAUGE", target: "lien_E", value: 3 },
{ type: "ADD_GAUGE", target: "instabilite", value: 5 },
{ type: "SET_FLAG", target: "joute_predatrice" }
],
next: 'ACTE2_10_RAVIN'
},
{
key: 'E_FROIDE',
condition: (gs) => (gs.hasFlag('avec_eclaireur') || gs.hasFlag('kaelen_perdu')) && gs.getGauge('instabilite') >= 15 && gs.getGauge('instabilite') < 30,
text: "« Ta terreur m'insulte, prêtre. Je ne suis pas ta damnation. »",
effects: [
{ type: "ADD_GAUGE", target: "affinite_eclaireur", value: 3 },
{ type: "SET_FLAG", target: "joute_fragile" }
],
next: 'ACTE2_10_RAVIN'
}
]
},

'CORONA_VISION': {
  sceneNumber:'2.C1',chapter:2,title:"La Frontière qui Respire",mood:'mystery',
  text:"Le givre sur la pierre ne forme ni mur ni porte. Il dessine une ligne qui se déplace avec ton souffle.\n\nFen pose une patte de chaque côté. Rien ne le repousse. Rien ne l'aspire. À chaque battement de ton pouls, la ligne avance d'un grain de givre puis recule exactement d'autant — comme si elle refusait de devenir fixe.\n\nUn souvenir sans visage remonte : Kalthar disant que toute frontière saine doit pouvoir être traversée dans les deux sens, sinon ce n'est plus une frontière mais une prison.",
  choices:[{key:'MEMOIRE',text:"Garder l'image. Une frontière n'est pas forcément un mur.",intent:'memoire',target:'Elenya',importance:'major',response:"Le givre se retire de tes bottes au lieu de s'y accrocher.",journal:"Tu as retrouvé une idée de Kalthar : une frontière qui ne permet aucun retour devient une prison.",effects:[{type:'SET_FLAG',target:'corona_vision_vue'},{type:'ADD_GAUGE',target:'memoire_kalthar',value:2}],next:'RETURN'}]
},

'800': {
  sceneNumber: '800',
  chapter: 2,
  title: "La Prisonnière de l’Inquisiteur",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Village_barricad%C3%A9_au_loin_202606191345.jpeg",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  getDynamicNarrative: (gs) => {
    let text = "Alistair marche un pas devant toi, l’insigne de l’Ordre brandi comme un laissez-passer. Les miliciens s’écartent. Ils ne te regardent plus comme une menace. Ils te regardent comme une prise.\n\n";
    text += "« Ne dis rien, » murmure-t-il sans se retourner. « Tant que je porte ce titre, tu es sous ma garde. C’est la seule façon de te faire entrer vivante. »\n\n";
    text += "Le mot *garde* sonne trop proche de *chaîne*. Tu sens le poids de son autorité sur tes épaules — et, plus inquiétant, le fait qu’il s’y habitue déjà.";
    return text;
  },
  choices: [
    {
      key: 'A',
      text: "Accepter le rôle. Pour l’instant.",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "prisonniere_accepte" }
      ],
      next: 'ACTE2_05_ARRIVEE_AUBERGE'
    },
    {
      key: 'B',
      text: "Lui rappeler, d’une voix glaciale, que tu n’es la prisonnière de personne.",
      effects: [
        { type: "ADD_GAUGE", target: "volonte", value: 2 },
        { type: "SET_FLAG", target: "prisonniere_refuse" }
      ],
      response: "Alistair baisse son insigne. « Sous ma garde n'a jamais voulu dire sous mon autorité. Tu as raison de me le rappeler. »",
      next: 'ACTE2_05_ARRIVEE_AUBERGE'
    }
  ]
}
,// ==========================================
  // NOUVELLES SCÈNES V26.2 (textes originaux inchangés ailleurs)
  // ==========================================

'ACTE_SOLO_FEN': {
    sceneNumber: 'SOLO_FEN',
    chapter: 2,
    title: "Seul le Furet",
    mood: 'exploration',
    condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'),
    getDynamicNarrative: (gs) => {
      return "Kaelen et Alistair sont là, quelque part dans le même campement, hors de ta ceinture et de tes prières.\n\n" + "Tu parles à Fen. Pas comme à un animal. Comme à la seule présence qui ne cherche ni à te sceller ni à te monnayer.\n\n" + "Il ne répond pas. Mais il ne part pas non plus. Eux non plus : ils attendent, sans ordre.";
    },
    choices: [
      { key: 'A', text: "Continuer sans t’appuyer sur eux.", effects: [
        { type: "SET_FLAG", target: "solo_couronne" },
        { type: "SET_FLAG", target: "_solo_fen_vu" }
      ], next: 'RETURN' }
    ]
  },

'ALISTAIR_PRIERE': {
    sceneNumber: 'V26.4.A',
    chapter: 2,
    title: "La Prière sans Mots",
    mood: 'intimate',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chambre_exigu%C3%AB_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
    getDynamicNarrative: (gs) => {
      return "Tu te réveilles avant lui.\n\n" + "Alistair est à genoux près de la lucarne, mais il ne prie pas. Du moins pas avec les mots qu'on lui a appris. Ses lèvres bougent, mais aucun son ne sort — seulement le souffle d'un homme qui essaie de retenir quelque chose qui déborde.\n\n" + "Son insigne est posé à côté de lui, sur la pierre froide. Éteint. Pour la première fois depuis que tu le connais.\n\n" + "Il ne sait pas que tu le regardes. Ses doigts tracent des cercles dans la poussière du rebord — des cercles qui ressemblent à une cage vue de dessus. Ou à un berceau. La frontière est mince, ce soir.\n\n" + "Quand il se redresse enfin, il a les yeux secs. Trop secs. Il ramasse l'insigne sans le rallumer, le glisse dans sa poche comme on cache une lettre compromettante.\n\n" + "Il ne te voit pas. Ou il fait semblant.\n\n" + "Tu te rendors. Mais tu sais, maintenant, que sa foi a un nouveau nom. Et qu'il ne le prononcera jamais tout haut.";
    },
    choices: [{
      key: 'NEXT',
      text: "Laisser le silence faire son travail.",
      effects: [
        { type: "SET_FLAG", target: "_alistair_priere_vu" },
        { type: "SET_FLAG", target: "doute_alistair_progressif" }
      ],
      next: 'RETURN'
    }]
  },

'RELIQUE_KALTHAR_1': {
   sceneNumber: 'V26.4.R1',
   chapter: 2,
   title: "Le Fragment de la Rivière",
   mood: 'exploration',
   getDynamicNarrative: (gs) => {
     return "Au bord du courant noir, quelque chose brille sous une pierre plate. Tu la " + "soulèves.\n\n" + "Un éclat de couronne. Du givre figé dans du métal ancien. Il pulse faiblement au " + "contact de ta paume — comme s'il reconnaissait son propriétaire.\n\n" + "Fen siffle. Pas de peur. De respect.";
   },
   choices: [{
     key: 'NEXT',
     text: "Garder l'éclat.",
     effects: [
       { type: "SET_FLAG", target: "relique_1_trouvee" },
       { type: "ADD_GAUGE", target: "instabilite", value: 2 }
     ],
     next: 'RETURN'
   }]
 },

'FEN_INDICE_2': {
    sceneNumber: 'V40.3.F2',
    chapter: 2,
    title: "La Mélodie Inachevée",
    mood: 'intimate',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Fen%20bg/SPRITE_FEN_ASSIS_FACE_FIX_202606231738.png",
    getDynamicNarrative: (gs) => {
      let text = "Le feu d'automne s'affaisse. Fen s'installe contre ta botte, le museau tourné vers les flammes.\n\n";
      text += "Il reprend les trois notes de la fresque. Cette fois, il en ajoute une quatrième.\n\n";
      text += "Ta main se ferme toute seule sur le tissu de ton manteau. Une image passe — pas assez longtemps pour devenir un visage : une fenêtre ouverte sur la neige, deux coupes oubliées, une voix d'homme qui s'interrompt parce que tu viens de rire.\n\n";
      text += "Puis plus rien.\n\n";
      text += "Fen te regarde. Tu pourrais jurer qu'il attend que tu complètes la mélodie. Tu en serais incapable.\n\n";
      text += "Alors il vient poser son front contre ta cheville, avec une patience beaucoup trop ancienne pour son petit corps.";
      return text;
    },
    choices: [{
      key: 'NEXT',
      text: "Ne pas forcer le souvenir. Le laisser revenir à son heure.",
      effects: [
        { type: "SET_FLAG", target: "fen_note" },
        { type: "ADD_GAUGE", target: "memoire_kalthar", value: 1 },
        { type: "ADD_GAUGE", target: "volonte", value: 1 }
      ],
      next: 'RETURN'
    }]
  },
  };
}
