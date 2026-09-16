/** V52 — fragment DB ACTE3.
 * Généré depuis V51.7.6 sans réécriture narrative.
 * 32 scènes.
 */
function _dbActe3V52_() {
  return {
'V28_ORAYA_PROPOSE_GUIDE': {
    sceneNumber: 'V28.3.ORAYA',
    chapter: 3,
    title: "La Solitude n’est pas une Couronne",
    mood: 'mystic',
    getDynamicNarrative: (gs) => {
      let text = "Oraya te regarde longtemps avant de parler. Elle ne regarde pas tes armes. Elle regarde ce qui n’est plus à tes côtés.\\n\\n";
      text += "« Majesté, vous marchez seule. Mais derrière vous, il y a ceux qui vous attendent. »\\n\\n";
      if (gs.getGauge('presence_O') >= 6 && gs.getGauge('presence_E') >= 6) {
        text += "Dans l’entrée du village, Kaelen et Alistair restent à distance l’un de l’autre. Ils ne s’avancent pas. Ils ont appris que te suivre ne donne pas le droit d’entrer.\\n\\n";
      } else if (gs.getGauge('presence_O') >= 6) {
        text += "Kaelen est là, adossé à la pierre. Il ne t’appelle pas. Il attend que le choix vienne de toi.\\n\\n";
      } else {
        text += "Alistair est là, l’insigne couvert de neige. Il ne prie pas pour te ramener. Il prie pour avoir la force de respecter ta décision.\\n\\n";
      }
      text += "Oraya baisse les yeux. « La solitude peut être une liberté. Elle peut aussi devenir une prison si personne n’a le droit de vous atteindre. »";
      return text;
    },
    choices: [
      {
        key: 'O',
        condition: (gs) => gs.getGauge('presence_O') >= 6 && !gs.hasFlag('avec_ombre'),
        text: "« Kaelen. Qu’il vienne. »",
        effects: [
          { type: "ADD_GAUGE", target: "lien_O", value: 2 },
          { type: "JOIN_COMPANION", target: "O" },
          { type: "SET_FLAG", target: "_v28_oraya_guide_vu" }
        ],
        next: 'ACTE3_10_ACCUEIL_CULTE_1'
      },
      {
        key: 'E',
        condition: (gs) => gs.getGauge('presence_E') >= 6 && !gs.hasFlag('avec_eclaireur'),
        text: "« Alistair. Qu’il entre. »",
        effects: [
          { type: "ADD_GAUGE", target: "lien_E", value: 2 },
          { type: "JOIN_COMPANION", target: "E" },
          { type: "SET_FLAG", target: "_v28_oraya_guide_vu" }
        ],
        next: 'ACTE3_10_ACCUEIL_CULTE_1'
      },
      {
        key: 'S',
        text: "« Je marche seule. C’est mon choix. »",
        effects: [
          { type: "ADD_GAUGE", target: "presence_S", value: 3 },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "SET_FLAG", target: "_v28_oraya_guide_vu" },
          { type: "SET_FLAG", target: "solo_choix_definitif_acte3" }
        ],
        next: 'ACTE3_SOLO_ORAYA'
      }
    ]
  },

  // V51 — payoff exclusif de la voie Solo en Acte III.

'ACTE3_SOLO_ORAYA': {
    sceneNumber: 'ACTE3_SOLO_ORAYA',
    chapter: 3,
    title: "Ce que la Reine ne doit à personne",
    mood: 'intimate',
    relationFocus: 'S',
    getDynamicNarrative: (gs) => {
      let text = "Oraya ne te conduit pas immédiatement vers le sanctuaire. Elle attend que les pas de Kaelen et d’Alistair se soient éloignés, puis t’emmène sous une arche effondrée où le vent ne porte aucune voix.\n\n";
      text += "« Vous avez refusé leurs mains. »\n\nTu corriges sans colère : « J’ai refusé qu’elles deviennent des chaînes. Ce n’est pas la même chose. »\n\n";
      text += "La vieille prêtresse encaisse la phrase comme un verdict ancien. « Non. Et j’ai mis trois siècles à apprendre la différence. » Elle retire de son cou une petite plaque de givre noir. Aucun symbole d’Ordre. Aucun sceau royal. Seulement ton nom, gravé de travers, comme par une main qui tremblait.\n\n";
      text += "« Avant le rituel, vous m’aviez demandé de détruire ceci si vous commenciez à parler de votre peuple comme de choses à conserver. Je ne l’ai pas fait. Je me suis dit que vous étiez trop importante pour avoir le droit de disparaître. »\n\n";
      text += "Fen quitte ton épaule et renifle la plaque. Trois notes minuscules vibrent dans sa gorge. Kalthar. Pas comme roi. Comme témoin.\n\n";
      text += "Tu comprends que la voie solitaire n’est pas l’absence d’amour. C’est l’endroit où personne ne peut transformer l’amour en mandat. Même toi.";
      return text;
    },
    choices: [
      {
        key:'GARDER',
        intent: "memoire",
        target: "Elenya",
        importance: "major",
        irreversible: false,
        feedback: "Tu gardes la limite posée autrefois sans lui rendre le pouvoir de décider à ta place.",
        journal: "Tu as conservé la plaque d’Oraya comme une limite, pas comme un ordre venu de ton ancienne vie.",
        text:"Garder la plaque. « Je veux me souvenir de la limite que j’avais moi-même posée. »",
        response:"Oraya dépose la plaque dans ta paume sans refermer tes doigts dessus. « Alors qu’elle reste une limite. Pas une relique. » Fen siffle une fois, approbation ou avertissement impossible à distinguer.",
        effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:2},{type:'ADD_GAUGE',target:'volonte',value:2},{type:'SET_FLAG',target:'solo_oraya_limite_retrouvee'}],
        next:'ACTE3_10_ACCUEIL_CULTE_1'
      },
      {
        key:'BRISER',
        intent: "liberte",
        target: "Elenya",
        importance: "major",
        irreversible: false,
        feedback: "Même l’ancienne Elenya ne décidera pas pour celle que tu es devenue.",
        journal: "Tu as brisé la plaque qui portait l’une de tes anciennes volontés.",
        text:"Briser la plaque. « Même mes anciennes volontés n’ont pas autorité sur moi aujourd’hui. »",
        response:"La plaque casse avec un bruit beaucoup trop léger pour trois siècles de culpabilité. Oraya ferme les yeux. « Voilà une réponse que je n’aurais jamais su vous donner. »",
        effects:[{type:'ADD_GAUGE',target:'volonte',value:3},{type:'SET_FLAG',target:'solo_oraya_passe_brise'}],
        next:'ACTE3_10_ACCUEIL_CULTE_1'
      },
      {
        key:'RENDRE',
        intent: "pardon",
        target: "Oraya",
        importance: "major",
        irreversible: false,
        feedback: "Tu rends à Oraya sa part du souvenir sans en faire une nouvelle dette.",
        journal: "Tu as rendu à Oraya le souvenir qu’elle portait pour toi depuis trois siècles.",
        text:"Rendre la plaque à Oraya. « Ce souvenir est aussi le tien. Porte-le sans me le devoir. »",
        response:"Oraya hésite avant de la reprendre. Pas parce qu’elle refuse — parce que personne ne lui avait encore rendu le droit de porter sa propre faute sans en faire une mission. « Je vais essayer. »",
        effects:[{type:'ADD_GAUGE',target:'volonte',value:2},{type:'ADD_REP',target:'culte',value:2},{type:'SET_FLAG',target:'solo_oraya_dette_rendue'}],
        next:'ACTE3_10_ACCUEIL_CULTE_1'
      }
    ]
  },

'KAELEN_CONFRONTATION_DETTE': {
    sceneNumber: 'K_DETTE',
    chapter: 3,
    title: "Ce que l'assassin ne pardonne pas",
    mood: 'tension',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
    getDynamicNarrative: (gs) => {
      return "Il te barre la route. Pas une embuscade. Une attente.\n" +
        "« Tu m'as ignoré, Reine. Trois fois. Pas une. Trois. »\n" +
        "Sa voix est plate. Pas de colère. Pire : de la lucidité.\n" +
        "« Je ne suis pas un chien qu'on rappelle. Je suis un contrat. Et les contrats ont des clauses de résiliation. »\n" +
        "Il pose sa dague entre vous.\n" +
        "« Alors dis-moi. Maintenant. Est-ce que je reste ? Ou est-ce que je pars ? Mais ne me laisse pas dans ce flou. C'est pire que le rejet. »";
    },
    choices: [
      {
        key: 'A',
        intent: "reparation",
        target: "Kaelen",
        importance: "major",
        irreversible: false,
        feedback: "Kaelen accepte de rester, mais la réparation devra désormais être choisie des deux côtés.",
        journal: "Tu as demandé à Kaelen de rester et reconnu que le flou entre vous avait eu un prix.",
        text: "« Tu restes. Pardonne-moi. »",
        response: "Kaelen regarde la dague posée entre vous, puis la reprend sans la rengainer. « Le pardon, c’est cher. » Un silence. « Mais rester parce que tu me le demandes clairement, ça je peux encore le faire. » Il se décale de la route. Pas tout à fait contre toi. Plus tout à fait dehors.",
        effects: [
          { type: "SET_FLAG", target: "dette_O_confrontee" },
          { type: "ADD_GAUGE", target: "distance_O", value: -4 },
          { type: "ADD_GAUGE", target: "lien_O", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        intent: "rupture",
        target: "Kaelen",
        importance: "critical",
        irreversible: true,
        feedback: "Kaelen part. Cette fois, le départ est définitif.",
        journal: "Tu as libéré Kaelen de votre lien en lui demandant de partir définitivement.",
        text: "« Pars. Le contrat est rompu. »",
        response: "Kaelen ne négocie pas. C’est presque pire. Il range sa dague, incline la tête une fois et dit seulement : « Enfin une clause claire. » Quand il tourne le dos, il ne vérifie pas si tu le regardes partir.",
        effects: [
          { type: "SET_FLAG", target: "dette_O_confrontee" },
          { type: "SET_FLAG", target: "kaelen_perdu_definitif" },
          { type: "LEAVE_COMPANION", target: "O" },
          { type: "ADD_GAUGE", target: "distance_O", value: 10 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        intent: "liberte",
        target: "Kaelen",
        importance: "major",
        irreversible: false,
        feedback: "Tu rends à Kaelen le droit de décider s’il reste.",
        journal: "Tu as refusé de choisir à la place de Kaelen. Il reste aujourd’hui par sa propre décision.",
        text: "« Je ne décide pas pour toi. Choisis. »",
        response: "Kaelen rit sans joie. « Tu sais que c’est plus cruel, ça ? » Il reprend sa dague. « Me laisser une porte et m’obliger à admettre que je peux vouloir rester. » Puis il te dépasse. « Très bien. Je choisis aujourd’hui. Demain, on verra. »",
        effects: [
          { type: "SET_FLAG", target: "dette_O_confrontee" },
          { type: "ADD_GAUGE", target: "distance_O", value: -2 },
          { type: "ADD_GAUGE", target: "instabilite", value: 3 },
          { type: "ADD_TIMER", target: "venin", value: 2 }
        ],
        next: 'RETURN'
      }
    ]
  },

'ALISTAIR_CONFRONTATION_DETTE': {
    sceneNumber: 'E_DETTE',
    chapter: 3,
    title: "Ce que le prêtre ne pardonne pas",
    mood: 'tension',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
    getDynamicNarrative: (gs) => {
      return "Il t'attend près d'un autel en ruine. Pas en prière. En jugement.\n" +
        "« Vous m'avez ignorée, Majesté. Trois fois. Pas une. Trois. »\n" +
        "Sa voix ne tremble plus. Elle est devenue tranchante.\n" +
        "« Je ne suis pas un chien qu'on rappelle. Je suis un serment. Et les serments ont des fins. »\n" +
        "Il pose son insigne entre vous. Éteint.\n" +
        "« Alors dites-moi. Maintenant. Est-ce que je reste ? Ou est-ce que je pars ? Mais ne me laissez pas dans ce flou. C'est pire que le rejet. »";
    },
    choices: [
      {
        key: 'A',
        intent: "reparation",
        target: "Alistair",
        importance: "major",
        irreversible: false,
        feedback: "Alistair accepte de rester, mais la réparation devra désormais être choisie des deux côtés.",
        journal: "Tu as demandé à Alistair de rester et reconnu que le flou entre vous avait eu un prix.",
        text: "« Tu restes. Pardonne-moi. »",
        response: "Alistair ferme les yeux. L’insigne reste éteint entre vous. « Je peux rester. » Il rouvre les yeux. « Mais pas comme si ces semaines n’avaient rien coûté. Si nous réparons quelque chose, ce sera à deux. Pas par absolution. »",
        effects: [
          { type: "SET_FLAG", target: "dette_E_confrontee" },
          { type: "ADD_GAUGE", target: "distance_E", value: -4 },
          { type: "ADD_GAUGE", target: "lien_E", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        intent: "rupture",
        target: "Alistair",
        importance: "critical",
        irreversible: true,
        feedback: "Alistair part. Cette fois, le départ est définitif.",
        journal: "Tu as libéré Alistair de votre lien en lui demandant de partir définitivement.",
        text: "« Pars. Le serment est rompu. »",
        response: "Alistair inspire comme après un coup. Puis il ramasse son insigne. « Alors je pars comme un homme, pas comme un paladin déchu. » Il te salue sans geste liturgique. « Merci au moins de ne pas appeler cela un sacrifice. »",
        effects: [
          { type: "SET_FLAG", target: "dette_E_confrontee" },
          { type: "SET_FLAG", target: "alistair_perdu_definitif" },
          { type: "LEAVE_COMPANION", target: "E" },
          { type: "ADD_GAUGE", target: "distance_E", value: 10 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        intent: "liberte",
        target: "Alistair",
        importance: "major",
        irreversible: false,
        feedback: "Tu rends à Alistair le droit de décider s’il reste.",
        journal: "Tu as refusé de choisir à la place de Alistair. Il reste aujourd’hui par sa propre décision.",
        text: "« Je ne décide pas pour toi. Choisis. »",
        response: "Alistair reste immobile longtemps. « Toute ma vie, quelqu’un a choisi ce que mon devoir exigeait. » Ses doigts se referment sur l’insigne. « Je déteste que tu me rendes cette liberté maintenant. » Un souffle. « Et je crois que j’en avais besoin. »",
        effects: [
          { type: "SET_FLAG", target: "dette_E_confrontee" },
          { type: "ADD_GAUGE", target: "distance_E", value: -2 },
          { type: "ADD_GAUGE", target: "instabilite", value: 3 }
        ],
        next: 'RETURN'
      }
    ]
  },

'ACTE3_01_TENSION_GROUPE': {
  sceneNumber: '3.01.ADD', 
  chapter: 3, 
  title: "Halte dans le Frimas", 
  mood: 'tension',
  getDynamicNarrative: (gs) => {
    return "Avant l’attaque de Fen, le groupe marque un arrêt. La méfiance entre Kaelen et Alistair est devenue presque physique — un froid plus tranchant que celui du vent.";
  },
  choices: [
    { 
      key: 'REPARTIR', 
      text: "Ordonner le départ immédiat.", 
      next: 'ACTE3_01_FRONTIERE_1' 
    }
  ]
},

'ACTE3_01_FRONTIERE_1': {
  sceneNumber: 'ACTE3_01_FRONTIERE_1', 
  chapter: 3, 
  title: "La Morsure du Guide", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Cr%C3%AAte_neigeuse_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Fen%20bg/SPRITE_FEN_ASSIS_FACE_FIX_202606231738.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Le froid s’abat comme un linceul alors que vous franchissez les bornes du Vrai Nord.\n\n";

    if (gs.hasFlag('verite_mine')) {
      text += "La brisure de son univers dogmatique force Alistair au mutisme. Il progresse la tête basse, rongé par un doute corrosif.\n\n";
    } else if (gs.hasFlag('mensonge_mine')) {
      text += "La suspicion épaissit l’air. Vos compagnons s’observent, conscients que l’alliance est factice — un accord tacite de ne pas creuser plus loin.\n\n";
    } else if (gs.hasFlag('silence_mine')) {
      text += "Ton autorité clinique interdit la moindre réplique. Le groupe avance au pas de charge.\n\n";
    }

    if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
      text += "Kaelen et Alistair marchent dans ton sillage. Tu ne leur as pas demandé la route — ils l’ont prise quand même.\n\n";
    }

    text += "Soudain, Fen virevolte sur ton épaule et plante ses crocs à la base de ta nuque. Ce n’est pas une attaque animale. C’est un décret royal : l’ultime épreuve imposée par l’esprit de Kalthar pour éprouver ta souveraineté.\n\n";
    text += "Un venin de Mana purifié s’injecte dans tes artères, court-circuitant tes réserves magiques. Ta perception se disloque sous une fièvre foudroyante. Le monde se dédouble en couches de froid et de feu.\n\n";
    text += "À travers le voile délirant de tes synapses, un cri aigu traverse la tempête. En contrebas d’un précipice, une inconnue rampe, encerclée par des prédateurs cristallins.";
    return text;
  },
  choices: [
    { 
      key: 'NEXT', timeCost:1, 
      text: "Forcer tes yeux à fixer la gorge...", 
      next: 'ACTE3_01_FRONTIERE_2' 
    }
  ]
},

'ACTE3_01_FRONTIERE_2': {
  sceneNumber: 'ACTE3_01_FRONTIERE_2', 
  chapter: 3, 
  title: "La Morsure du Guide", 
  mood: 'tension',
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "URL_VOIX_KAELEN",
  text: `La fièvre déforme les reliefs. Kaelen se plaque contre l’arête rocheuse, sa main retenant ton épaule d’un geste sec, presque brutal dans sa précision. Sa voix te parvient avec un écho lointain, déformé.\n\n« C’est une embuscade classique. La déclivité du terrain, l’absence de fuite… C’est un appât mécanique. On ne bouge pas. Laisse les monstres nettoyer la piste. »`,
  choices: [
    { 
      key: 'NEXT', 
      text: "Attendre le verdict de la Sentinelle...", 
      next: 'ACTE3_01_FRONTIERE_3' 
    }
  ]
},

'ACTE3_01_FRONTIERE_3': {
  sceneNumber: 'ACTE3_01_FRONTIERE_3', 
  chapter: 3, 
  title: "La Morsure du Guide", 
  mood: 'tension',
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "URL_VOIX_ALISTAIR",
  text: `Alistair resserre les doigts sur sa relique, son regard fuyant la victime — une lâcheté qu’il maquille en principe. La lâcheté tactique s’abrite sous le dogme.\n\n« L’assassin a raison, Elenya. Notre objectif supérieur interdit le moindre détour. Sa vie est un sacrifice acceptable pour la sauvegarde du monde. »\n\nLeur prudence de mortels te paraît d’une insignifiance grotesque. Le venin de Fen sature tes tempes, exigeant une libération de force immédiate sous peine d’implosion.`,
  choices: [
    { 
      key: 'O', 
      text: "Te caler contre la roche. « Kaelen dicte la marche. Restons à couvert. »", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 5 }, 
        { type: "SET_FLAG", target: "alistair_insoumis" }
      ], 
      next: 'ACTE3_02_SAUVETAGE' 
    },
    { 
      key: 'E', 
      text: "Chercher l’or d’Alistair. « Suivons tes préceptes, prêtre. Ignorons-la. »", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 5 }, 
        { type: "SET_FLAG", target: "kaelen_insoumis" }
      ], 
      next: 'ACTE3_02_SAUVETAGE' 
    },
    { 
      key: 'S', 
      text: "Lâcher un rire fracturé qui les fige. « Que le sang chaud coule. Il fera fondre mon ennui. »", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 10 }, 
        { type: "SET_FLAG", target: "double_insoumission" }
      ], 
      next: 'ACTE3_02_SAUVETAGE' 
    }
  ]
},

'ACTE3_02_SAUVETAGE': {
  sceneNumber: 'ACTE3_02_SAUVETAGE', 
  chapter: 3, 
  title: "Visions Brisées", 
  mood: 'action',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Ravin_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Le poison altère la gravité. Tu as l’illusion de survoler le gouffre. Ton arbitrage dément rompt l’équilibre de l’escorte.\n\n";

    if (gs.hasFlag('alistair_insoumis')) {
      text += "L’inconnue lève une main vers vous — un geste minuscule, humain, qui fissure soudain la logique d’Alistair. Sa doctrine disait sacrifice acceptable ; sa conscience refuse d’en prononcer la sentence. Il plonge dans l’arène en invoquant ses dieux et se retrouve instantanément submergé par la meute cristalline.";
    } else if (gs.hasFlag('kaelen_insoumis')) {
      text += "L’inconnue lève une main vers vous. Kaelen détourne d’abord les yeux, puis jure : l’appât ressemble trop à une exécution commanditée, le genre de contrat qu’il déteste reconnaître. Il sabote sa propre consigne et saute dans la combe, ses lames traçant des arcs sanglants au milieu des pinces de verre, mais le nombre l’accable.";
    } else if (gs.hasFlag('double_insoumission')) {
      text += "Effrayés par le sifflement dément de ton rire, les deux hommes comprennent que ta lucidité s’effondre. Refusant de s’aligner sur ta démence naissante, ils unissent leurs armes et plongent ensemble pour extraire la proie.";
    }

    text += "\n\nLa plaie à ta nuque pulse en rythme avec la détresse de la gorge. L’énergie accumulée doit sortir — une marée qui ne demande plus la permission.";
    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "Libérer l’ouragan. Une onde de gel absolu pulvérise les structures de la combe.",effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 15 }, 
        { type: "SET_FLAG", target: "sauvetage_burst" }
      ], 
      next: 'ACTE3_03_LA_SIRENE' 
    },
    { 
      key: 'B', 
      text: "Forger des lances de glace géométriques pour harponner chirurgicalement les bêtes.", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 2 }, 
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 2 }, 
        { type: "SET_FLAG", target: "sauvetage_lance" }
      ], 
      next: 'ACTE3_03_LA_SIRENE' 
    }
  ]
},

'ACTE3_03_LA_SIRENE': {
    sceneNumber: 'ACTE3_03_LA_SIRENE',
    chapter: 3,
    title: "La Voix qui se Souvenait",
    mood: 'tension',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Ravin_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Lyra%20bg/SPRITE_LYRA_DEBOUT_HYPNOTIQUE_202606231756.png",
    voice: "URL_VOIX_LYRA",
    getDynamicNarrative: (gs) => {
      // --- VERSION NG+ COMIQUE ---
      
      // --- VERSION NORMALE ---
      let text = "";
      if (gs.hasFlag('sauvetage_burst')) {
        text += "L'éruption de givre a vitrifié l'arène. Les prédateurs ne sont plus que des sculptures brisées.\n\n";
      } else if (gs.hasFlag('sauvetage_lance')) {
        text += "Tes lances de glace ont cloué les monstres au basalte.\n\n";
      }
      text += "La survivante se redresse lentement. Ses iris opalins, dépourvus de pupilles, ciblent ton esprit.\n\n" +
        "Elle ouvre la bouche. Pas pour chanter. Pour parler.\n\n" +
        "« Vous... » commence-t-elle. Sa voix vibre sur une fréquence harmonique étrange. « Vous portez son regard. »\n\n" +
        "Elle ne dit pas de qui. Mais Fen, contre ta gorge, se raidit.\n\n" +
        "« Je m'appelle Lyra, » dit-elle. Et ce n'est pas une présentation. C'est un aveu.\n\n" +
        "« J'étais... avant. Avant que l'Ordre ne me prenne. Avant qu'ils ne brisent ma voix pour en faire une arme. »\n\n" +
        "Ses yeux se fixent sur les tiens. Pas de charme. De reconnaissance.\n\n" +
        "« Ma grand-mère chantait dans la chapelle du palais. Elle m'a dit qu'un jour, la Reine reviendrait. Et que je la reconnaîtrais à ses yeux. »\n\n";
      if (gs.hasFlag('fresque_touched')) {
        text += "Tu penses à la fresque. À la souveraine qui fige le continent. Lyra ne parle pas d'un mythe. Elle parle de toi.\n\n";
      }
      text += "Les visages de Kaelen et d'Alistair se détendent. Le chant de Lyra — même sans notes — agit sur eux comme une berceuse ancienne.\n\n" +
        "Seule ta nuque brûle sous le venin de Fen, cautère douloureux qui te garde lucide.";
      return text;
    },
    choices: [
      
      {
        key: 'A',
        condition: (gs) => isClassicState(gs),
        text: "« Tu te souviens de moi. Moi, je ne me souviens de rien. Parle. »",
        effects: [
          { type: "ADD_GAUGE", target: "instabilite", value: 3 },
          { type: "SET_FLAG", target: "sirene_acceptee" },
          { type: "SET_FLAG", target: "lyra_a_parle" }
        ],
        next: 'ACTE3_03B_RESISTANCE'
      },
      {
        key: 'B',
        condition: (gs) => isClassicState(gs),
        text: "« Garde tes souvenirs. Je n'ai pas besoin d'une prêtresse. J'ai besoin d'une arme. »",
        effects: [
          { type: "ADD_GAUGE", target: "instabilite", value: 5 },
          { type: "SET_FLAG", target: "sirene_acceptee" },
          { type: "SET_FLAG", target: "lyra_punie" }
        ],
        next: 'ACTE3_03B_RESISTANCE'
      }
    ]
  },


// Nouvelle scène NG+

'ACTE3_03B_RESISTANCE': {
  sceneNumber: '3.03B',
  chapter: 3,
  title: "Le Fil qui Cède",
  mood: 'tension',
  getDynamicNarrative: (gs) => {
    return "Lyra commence à chanter.\n\nKaelen fronce les sourcils le premier. Sa main va instinctivement à sa dague, puis retombe. Alistair murmure une prière… qui s’étouffe à mi-chemin.\n\n« Quelque chose… » commence Kaelen, la voix déjà pâteuse.\n\nAlistair secoue la tête, comme pour chasser une mouche. « Ce n’est pas… naturel… »\n\nPuis leurs yeux se vident, l’un après l’autre.\n\nToi seule restes debout, le venin de Fen brûlant encore dans ta nuque.";
  },
  choices: [
    { key: 'A', text: "Les regarder basculer.", next: 'ACTE3_04_ENVOUTEMENT' }
  ]
},

'ACTE3_04_ENVOUTEMENT': {
  sceneNumber: 'ACTE3_04_ENVOUTEMENT', 
  chapter: 3, 
  title: "Le Chant de la Fièvre", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Campement_dans_la_neige_(nuit)_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  text: `Le feu de camp est dressé, mais l’air s’épaissit d’un parfum écœurant, presque sirupeux. Lyra chantonne une mélodie sans paroles, un fil sonore qui s’enroule autour de la raison comme du lierre.\n\nAlistair abandonne sa relique sacrée, les yeux vagues. Kaelen a le souffle court, ses dagues gisant dans la boue. Ils rampent vers l’abomination, subjugués par l’illusion d’une trêve charnelle.\n\nEn toi, le venin de Fen se confronte à la transe de la sirène — deux magies étrangères qui se disputent le même corps. Le choc des deux magies libère une pulsion prédatrice féroce. Ta nature rejette l’ingérence : personne ne s’appropriera tes instruments de pouvoir, qu’ils soient prêtres ou assassins.`,
  choices: [
    { 
      key: 'O', 
      text: "Canaliser l’illusion pour assouvir ta possession sur l’Ombre.", 
      effects: [{ type: "SET_FLAG", target: "reve_O" }], 
      next: 'ACTE3_05_FIEVRE' 
    },
    { 
      key: 'E', 
      text: "Briser la sainte retenue d’Alistair. L’entraîner dans une damnation charnelle.", 
      effects: [{ type: "SET_FLAG", target: "reve_E" }], 
      next: 'ACTE3_05_FIEVRE' 
    },
    { 
      key: 'POLY', 
      text: "Revendiquer les deux. Ils sont les extensions de ton Trône, tes jouets.", 
      effects: [
        { type: "SET_FLAG", target: "reve_poly" },
        { type: "SET_FLAG", target: "double_jeu" },
        { type: "ADD_GAUGE", target: "possession", value: 3 },
        { type: "UNLOCK_ACHIEVEMENT", target: "ach_poly" }
      ], 
      next: 'ACTE3_05_FIEVRE' 
    },
    { 
      key: 'S', 
      text: "Refuser la souillure de la chair. Empaler la sirène sur un éperon de givre noir.", 
      effects: [{ type: "SET_FLAG", target: "reve_solo" }], 
      next: 'ACTE3_05_FIEVRE' 
    },
    { 
      key: 'ABANDON', 
      text: "Fermer les yeux et laisser la mélodie dissoudre ta volonté.", 
      next: 'GAME_OVER_SIRENE' 
    }
  ]
},

'ACTE3_05_FIEVRE': {
  sceneNumber: 'ACTE3_05_FIEVRE', 
  chapter: 3, 
  title: "Possession", 
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Campement_dans_la_neige_(nuit)_202606191345.jpeg",
  sprite: "", 
  voice: "",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('reve_O')) {
      return "Tu écartes Lyra d’une bourrasque et plaques Kaelen au sol. Tes lèvres figent les siennes dans une morsure charnelle brutale. C’est une étreinte de prédateurs, sauvage, dénuée de tendresse, où tu consumes l’énergie de l’assassin jusqu’à l’extinction de tes sens.";
    }
    if (gs.hasFlag('reve_E')) {
      return "Tes doigts s’insèrent sous le maillage de fer d’Alistair. Le clerc cède avec le râle d’un damné, ses vœux sacrifiés sur l’autel de tes hanches. Il s’agrippe à ta chair froide en psalmodiant ton nom en guise de litanie divine pendant une nuit de luxure interdite.";
    }
    if (gs.hasFlag('reve_poly')) {
      return "Ton fluide magique sature la combe. Tu plies les deux hommes à ta volonté, les fusionnant dans un même maelström de chair et de givre. Alistair et Kaelen cèdent à l’envoûtement de ta souveraineté, devenant les instruments de ta faim magique jusqu’à l’inconscience.";
    }
    return "Un éperon de glace jaillit des braises et transperce le cœur de Lyra. Le mirage s’effondre en cendres grises, sans un cri, sans une trace — comme si le mensonge n’avait jamais eu de corps. L’effort pour contenir le venin de Fen fracture tes dernières défenses, te précipitant dans un sommeil lourd peuplé de spectres.";
  },
  choices: [
    { 
      key: 'A', 
      text: "Sombrer dans le vide noir du sommeil.", 
      effects: [{ type: "SET_FLAG", target: "sommeil_lourd" }], 
      next: 'ACTE3_06_REVEIL_TORDU' 
    }
  ]
},

'ACTE3_06_REVEIL_TORDU': {
  sceneNumber: 'ACTE3_06_REVEIL_TORDU', 
  chapter: 3, 
  title: "Réalité Brisée", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Campement_dans_la_neige_(matin)_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('reve_solo')) {
      return "Tu t’éveilles sur la roche gelée, tes vêtements intacts. Alistair et Kaelen gisent à quelques pas, hébétés. La sirène n’est plus qu’un sillage de suie. Kaelen crache un filet de salive rouge : « Tu as hurlé des ordres de guerre toute la nuit. » Ils ont protégé ton sommeil.\n\n" +
        (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')
          ? "Tu ne leur offres ni excuse ni reconnaissance. Ils sont là — tu n’as pas besoin qu’ils le soient."
          : "Ils ont protégé ton sommeil, et tu ne leur offres que ton mutisme.");
    }

    let text = "La fièvre bat en retraite, laissant un goût de cuivre sous la langue. Tu ressens l’empreinte d’un corps nu contre le tien sous le manteau. Mais à l’ouverture des paupières, le réel te frappe au visage.\n\n";

    if (gs.hasFlag('reve_O')) {
      text += "Ce n’est pas Kaelen qui dort contre ta poitrine. C’est Alistair, son torse marqué par les stigmates bleutés de tes ongles. À l’autre extrémité de la combe, Kaelen est enchaîné au sol par des blocs de glace incassables que tu as sécrétés durant ton délire — une ironie qui ne t’échappe pas. Le venin a interverti leurs silhouettes. Tu as consommé le prêtre en pensant asservir l’assassin.";
    } else if (gs.hasFlag('reve_E')) {
      text += "Ce n’est pas la silhouette sainte d’Alistair qui partage ta couche. C’est Kaelen, un sourire carnassier étirant ses lèvres froides. À quelques mètres, Alistair est assis dans la poudreuse, les poignets liés par des lianes de givre, ses yeux injectés de sang fixant le vide. L’illusion a profané sa foi par ton erreur.";
    } else if (gs.hasFlag('reve_poly')) {
      text += "Tu es au centre des cendres. Tes deux gardiens sont adossés à la paroi, prisonniers de carcans de glace pure, les traits ravagés par l’épouvante et l’épuisement. Tu les as brisés simultanément, vidant leurs réserves physiques pour purger ta fièvre. La sirène s’est dissoute.";
    }
    return text;
  },
  choices: [
    { 
      key: 'A', 
      condition: (gs) => !gs.hasFlag('reve_solo'), 
      text: "Briser les entraves d’un geste sec, sans un mot d’excuse.", 
      effects: [{ type: "SET_FLAG", target: "liens_brises" }], 
      next: 'ACTE3_07_BRISER_LA_GLACE' 
    },
    { 
      key: 'B', 
      condition: (gs) => gs.hasFlag('reve_solo'), 
      text: "Se redresser en silence. Reprendre la route.", 
      next: 'ACTE3_07_BRISER_LA_GLACE' 
    }
  ]
},

'ACTE3_07_BRISER_LA_GLACE': {
  sceneNumber: 'ACTE3_07_BRISER_LA_GLACE', 
  chapter: 3, 
  title: "Gueule de Bois Magique", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Campement_dans_la_neige_(matin)_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    // Refus de la sirène : le groupe est là, mais pas de honte charnelle
    if (gs.hasFlag('reve_solo')) {
      if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
        return "Tu te redresses. Kaelen et Alistair sont déjà debout. La sirène n’a laissé ni étreinte ni excuse — seulement le souvenir de tes ordres hurlés dans la nuit.\n\n" + "Ils attendent quelque chose. Un regard, une faille. Tu ne leur en donnes pas.\n\n" + "On rassemble les effets. Le blizzard commence à sceller la combe.";
      }
      return "Tu te redresses. Kaelen et Alistair sont déjà debout, trop silencieux. La sirène a laissé un vide entre vous : ni chair ni honte partagée, seulement le souvenir de tes ordres hurlés dans la nuit.\n\n" + "Personne ne cherche ton regard. On rassemble les effets à la hâte avant que le blizzard ne scelle la combe.";
    }

    let text = "D’un claquement de doigts, les entraves de givre volent en éclats. Les hommes se redressent en silence, réajustant leurs pièces d’armure avec une raideur mécanique — le corps qui range ce que l’esprit refuse encore d’admettre.\n\n";

    if (gs.hasFlag('reve_O')) {
      text += "« Le venin de Fen a saboté mes sens, » lâches-tu d’une voix blanche. « J’ai confondu vos silhouettes sous le chant. »\n\n";
      text += "Kaelen serre les poings, la glotte nouée par une fureur pure. « Une erreur de cible ? Tu m’as cloué au sol pendant que le dévot profitait de tes faveurs ! Ta couronne n’excuse pas cette insulte, Reine. »\n\n";
      text += "Alistair détourne les yeux, drapé dans une honte ecclésiastique destructrice. « J’ai embrassé l’abîme… Que cette nuit meure dans le silence. À jamais. »";
    } else if (gs.hasFlag('reve_E')) {
      text += "« Mon fluide a été corrompu par la sirène, » murmures-tu en fixant l’assassin. « C’était une erreur de perception. »\n\n";
      text += "Kaelen esquisse un sourire cruel en ajustant ses gants. « Une erreur délicieuse, ma Reine. Je ne regrette rien. Demande plutôt à l’Inquisiteur s’il a apprécié le spectacle depuis sa cage de givre. »\n\n";
      text += "Alistair, la lèvre tremblante de dégoût, refuse de croiser ton sillage. « C’est un sacrilège infâme. Ne m’adresse plus la parole. »";
    } else if (gs.hasFlag('reve_poly')) {
      text += "« Le Mana pur a submergé ma conscience, » tentes-tu d’articuler face à leur mutisme.\n\n";
      text += "Kaelen crache un caillot noir dans la neige. « Tu nous as traités comme du bétail pour purger tes veines. Tu es d’une cruauté digne des pires légendes, Elenya. »\n\n";
      text += "Alistair rajuste sa cape d’une main fébrile. « La tyrannie et la débauche… Tu es le monstre qu’on m’a ordonné de sceller. Hâtons-nous d’en finir. »";
    }

    text += "\n\nLe climat relationnel est devenu plus tranchant que le gel du Nord. Il faut lever le camp.";
    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "Reprendre la marche. La route expurgera les rancœurs.", 
      effects: [{ type: "SET_FLAG", target: "depart_malaise" }], 
      next: 'ACTE3_08_MISE_AU_POINT' 
    }
  ]
},

'ACTE3_08_MISE_AU_POINT': {
  sceneNumber: 'ACTE3_08_MISE_AU_POINT',
  chapter: 3,
  title: "Réalité Froide",
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Marche_dans_la_temp%C3%AAte_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  getDynamicNarrative: (gs) => {
    let text = "La distance entre les trois marcheurs s’étire sur plusieurs mètres, une géométrie muette.\n\n";

    if ((gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) && gs.hasFlag('reve_solo')) {
      text += "Ils sont derrière toi. Pas guides, pas amants — des silhouettes que tu n’as pas renvoyées. Ton refus de la sirène les a glacés plus sûrement qu’une insulte.\n\n";
    } else if (gs.hasFlag('reve_solo')) {
      text += "Ton refus absolu de céder à l’illusion a glacé tes gardiens. Ils avancent en silence, terrifiés par l’inhumanité de ta résistance.\n\n";
    } else {
      text += "L’orgueil de Kaelen saigne sous la blessure. Alistair s’enferme dans un mutisme de pénitence.\n\n";
    }

    // --- Variations Instabilité ---
    if (gs.getGauge('instabilite') >= 30) {
      text += "Tes pupilles blanches illuminent la tempête. Tu n’as plus besoin de parler pour qu’ils comprennent : tu es déjà en train de devenir autre chose. Le givre qui s’élève de tes pas n’est plus un sortilège. C’est une déclaration de souveraineté.\n\n";
    } else if (gs.getGauge('instabilite') >= 15) {
      text += "Le givre a grimpé jusqu’à tes tempes. Chaque mot que tu pourrais prononcer porte maintenant un poids de cristal. Ils le sentent.\n\n";
    } else {
      text += "Tu as encore un visage presque humain. Presque.\n\n";
    }

    text += "Pour éviter une exécution mutuelle avant le sommet, la souveraine doit ancrer les positions dans le réel, dépouillé des vapeurs du poison.";
    return text;
  },
  choices: [
    {
      key: 'O_KISS',
      intent: "romance",
      target: "Kaelen",
      importance: "major",
      irreversible: false,
      feedback: "Cette fois, Kaelen sait que le désir ne vient ni du poison ni du contrat.",
      journal: "Dans la tempête, tu as embrassé Kaelen en pleine conscience.",
      condition: (gs) => gs.getGauge('affinite_ombre') >= 10 && gs.getGauge('instabilite') < 30,
      text: "Tirer Kaelen à l’abri d’une muraille de neige et l’embrasser avec violence. « Cette fois, ma vue est claire. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 3 },
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: -5 },
        { type: "SET_FLAG", target: "romance_reelle_O" }
      ],
      next: 'ACTE3_09_ENTREE_SANCTUAIRE'
    },
    {
      key: 'E_KISS',
      intent: "romance",
      target: "Alistair",
      importance: "major",
      irreversible: false,
      feedback: "Alistair comprend que ce baiser n’est ni un mirage ni une prière.",
      journal: "Dans la tempête, tu as embrassé Alistair en pleine conscience.",
      condition: (gs) => gs.getGauge('affinite_eclaireur') >= 10 && gs.getGauge('instabilite') < 30,
      text: "Saisir la main d’Alistair et presser tes lèvres contre les siennes. « Ce moment ne doit rien au mirage, Alistair. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 3 },
        { type: "ADD_GAUGE", target: "affinite_ombre", value: -5 },
        { type: "SET_FLAG", target: "romance_reelle_E" }
      ],
      next: 'ACTE3_09_ENTREE_SANCTUAIRE'
    },
    {
      key: 'DOMINER_O',
      intent: "domination",
      target: "Kaelen",
      importance: "critical",
      irreversible: true,
      feedback: "Une limite vient d’être franchie : Kaelen obéit, mais ce geste n’est pas de l’amour.",
      journal: "Tu as ordonné à Kaelen de s’agenouiller. Le pouvoir a pris la place que le désir aurait pu occuper.",
      condition: (gs) => gs.getGauge('instabilite') >= 25 && (gs.hasFlag('avec_ombre') || gs.getGauge('lien_O') >= 3),
      text: "« À genoux, Kaelen. Maintenant. » Quelque chose en toi trouve l’ordre beaucoup trop naturel.",
      response: "Kaelen ne s’agenouille pas tout de suite. Son regard remonte lentement jusqu’au tien. Puis un genou touche la neige — non comme une caresse, mais comme un test. « Voilà ce que tu veux ? » Sa voix ne contient aucun flirt. Seulement la question que ton pouvoir préférerait ne pas entendre.",
      effects: [
        { type: "ADD_GAUGE", target: "possession", value: 3 },
        { type: "ADD_GAUGE", target: "distance_O", value: 2 },
        { type: "ADD_GAUGE", target: "instabilite", value: 2 },
        { type: "SET_FLAG", target: "domination_path_chosen" },
        { type: "SET_FLAG", target: "domination_acte3_O" }
      ],
      next: 'ACTE3_09_ENTREE_SANCTUAIRE'
    },
    {
      key: 'DOMINER_E',
      intent: "domination",
      target: "Alistair",
      importance: "critical",
      irreversible: true,
      feedback: "Une limite vient d’être franchie : Alistair obéit, mais refuse que tu appelles cela de l’amour.",
      journal: "Tu as ordonné à Alistair de s’agenouiller et revendiqué sa lumière.",
      condition: (gs) => gs.getGauge('instabilite') >= 25 && (gs.hasFlag('avec_eclaireur') || gs.getGauge('lien_E') >= 3),
      text: "« À genoux, Alistair. Ta lumière m’appartient. » La phrase ressemble trop à une ancienne cage.",
      response: "Alistair pâlit. Sa première réaction est presque un réflexe appris : obéir. Puis il lève les yeux avant de plier le genou. « Si je le fais, ne l’appelle pas de l’amour. » La lumière autour de lui se contracte comme une porte qu’on force.",
      effects: [
        { type: "ADD_GAUGE", target: "possession", value: 3 },
        { type: "ADD_GAUGE", target: "distance_E", value: 2 },
        { type: "ADD_GAUGE", target: "instabilite", value: 2 },
        { type: "SET_FLAG", target: "domination_path_chosen" },
        { type: "SET_FLAG", target: "domination_acte3_E" }
      ],
      next: 'ACTE3_09_ENTREE_SANCTUAIRE'
    },
    {
      key: 'S',
      intent: "distance",
      target: "Elenya",
      importance: "significant",
      irreversible: false,
      text: "Ignorer leurs blessures d’amour-propre. Maintenir ta marche en tête sans un regard en arrière.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 5 },
        { type: "SET_FLAG", target: "ignore_malaise" }
      ],
      next: 'ACTE3_09_ENTREE_SANCTUAIRE'
    }
  ]
},

'ACTE3_09_ENTREE_SANCTUAIRE': {
  sceneNumber: '3.09.BIS', 
  chapter: 3, 
  title: "Les Portes du Culte", 
  mood: 'tension',
  getDynamicNarrative: (gs) => {
    return "Le sentier serpente entre des stèles gravées des noms des anciens fidèles. Le froid y résonne comme une prière continue — une litanie que le glacier n’a jamais cessé de réciter.";
  },
  choices: [
    { key: 'ENTRER', text: "Fendre la brume sacrée.", next: 'ACTE3_09B_BIVOUAC_TEMPETE' }
  ]
},

'ACTE3_09_VILLAGE_CACHE': {
  sceneNumber: 'ACTE3_09_VILLAGE_CACHE', 
  chapter: 3, 
  title: "Le Sanctuaire du Givre Éternel", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Crat%C3%A8re_avec_village_cach%C3%A9_202606191345.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  onEnter: (state) => {
    if (state.timers && state.timers.venin !== undefined) {
      state.timers.venin = -1; // Résolu : arrivée au village
    }
    if (state.flags && state.flags.includes('silas_bouton_garde') && !state.flags.includes('silas_bouton_reconnu')) {
      state.flags.push('silas_bouton_reconnu');
      if (!state.gauges) state.gauges = {};
      state.gauges.memoire_kalthar = Math.max(0, Number(state.gauges.memoire_kalthar || 0) + 1);
    }
  },
  getDynamicNarrative: (gs) => {
    let text = "La brume d’altitude se déchire sur un gouffre géométrique.\n\n";
    if (gs.hasFlag('silas_bouton_reconnu')) {
      text += "À l’entrée du sanctuaire, une vieille vigie aperçoit le bouton gravé d’un flocon à ta ceinture. Son visage change. « Livrée du palais d’hiver… » souffle-t-elle. Le symbole tire de ta mémoire une pulsation brève : cet objet appartenait bien à ton ancien monde.\n\n";
    }
    if (gs.hasFlag('marche_rapide') && gs.hasFlag('silas_ami')) {
      text += "Au détour d'une ruelle, tu cherches Silas des yeux. Son chariot est là. Lui n'est pas là. Une rumeur court : il est parti la veille, pressé par une dette plus ancienne que ta venue. Tu as gagné du temps. Tu as perdu un témoin.\n\n";
    }

    if (gs.hasFlag('domination_acte3_O')) {
      text += "Kaelen marche à tes côtés, mais l’espace entre vous a changé. Le genou posé dans la neige n’a rien réparé : il a rendu visible une frontière que ton pouvoir vient de franchir.\n\n";
    } else if (gs.hasFlag('domination_acte3_E')) {
      text += "Alistair avance avec une lumière tenue très près du corps. Ton ordre résonne encore entre vous ; il ne l’a pas confondu avec une déclaration d’amour.\n\n";
    } else if (gs.hasFlag('romance_reelle_O')) {
      text += "La brutalité de ton baiser a restauré l’orgueil de l’assassin. Kaelen retrouve sa démarche de chasseur à tes côtés.\n\n";
    } else if (gs.hasFlag('romance_reelle_E')) {
      text += "Le prêtre avance le teint rehaussé par l’étreinte, acceptant sa déchéance dogmatique pour tes beaux yeux.\n\n";
    } else if (gs.hasFlag('ignore_malaise')) {
      text += "Ton indifférence royale pèse sur leurs épaules comme une chape de plomb. Personne ne rompt le silence.\n\n";
    }

    // V26.3.7 — silence crevasse (groupe vs solo)
    if (gs.hasFlag('crevasse_silence_solo')) {
      text += "Le blizzard n’a pas eu de vote. Tu as avancé ; derrière toi, deux silhouettes ont suivi sans consigne.\n\n";
    } else if (gs.hasFlag('crevasse_silence_groupe')) {
      text += "Personne n’a tranché dans la crevasse. Le silence a décidé à votre place — et il marche encore entre vos pas.\n\n";
    } else if (gs.hasFlag('crevasse_silence')) {
      text += "Le silence de la crevasse n’est pas retombé. Il s’est seulement déplacé avec vous jusqu’ici.\n\n";
    }

    if (gs.getGauge('instabilite') >= 30) {
      text += "Tu croises ton reflet dans une paroi de glace vive. Tes pupilles ont disparu, remplacées par un blanc arctique irradiant. Tu ne satures pas de magie. Tu es en train de devenir la Tempête.\n\n";
    }

    text += "En contrebas du dôme de glace s’étend une cité clandestine sculptée dans le glacier. Au centre de la place d’armes se dresse une effigie monolithique de trente mètres de haut : elle reproduit tes traits, couronnée de pointes de givre, dominant des habitations de basalte — un visage que tu ne te souviens pas d’avoir porté, sculpté par des mains qui, elles, s’en souvenaient.\n\n";

    if (gs.hasFlag('domination_acte3_O')) {
      text += "Kaelen reste hors de portée de ta main. « Ton empire, » corrige-t-il lorsqu’un fidèle parle de votre arrivée comme d’un triomphe commun. Le mot est précis. Pas tendre.\n\n";
    } else if (gs.hasFlag('domination_acte3_E')) {
      text += "Alistair ne se place plus devant toi lorsque les fidèles approchent. Il se tient sur le côté, comme s’il refusait que son obéissance récente devienne la preuve que tu avais raison de l’exiger.\n\n";
    } else if (gs.hasFlag('romance_reelle_O')) {
      text += "Kaelen glisse son bras ceinturonné autour de ta taille. « Tu as ton propre empire occulte, ma Reine. L’Ordre va s’étouffer de rage. »\n\n";
    } else if (gs.hasFlag('romance_reelle_E')) {
      text += "Alistair recule, les mains sur son insigne. « Les Enfants du Gel… Des cellules d’hérétiques que nous pensions éradiquées. Ils te vénèrent comme une idole de destruction. »\n\n";
    } else {
      text += "« Le bastion des Enfants du Gel… » murmure le prêtre, sa main cherchant machinalement une garde pour se rassurer.\n\n";
    }

    text += "Des vigies encapuchonnées de blanc s’élancent. En te reconnaissant, elles s’effondrent face contre terre dans la poudreuse. Fen pousse un glapissement de triomphe. Tu es de retour chez toi — un « chez toi » que tu découvres en même temps que tu le réclames.";
    if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
      text += "\n\nKaelen et Alistair restent en retrait. Pas exclus — non invités à parler à ta place.";
    }
    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "Descendre l’escalier de glace vers la foule prosternée.", 
      next: 'ACTE3_10_ACCUEIL_CULTE_1' 
    },
    {
      key:'V517_RELATION_CHOICE_VILLAGE',
      condition:(gs)=>COND.romanceOpenO(gs)&&COND.romanceOpenE(gs)
        && gs.getGauge('lien_O')>=5&&gs.getGauge('lien_E')>=5
        && !gs.hasFlag('_joute_O2_vu')&&!gs.hasFlag('_joute_E2_vu')
        && !gs.hasFlag('_romance_beat_recent'),
      text:"Deux conversations attendent. Choisir celle qui doit avoir lieu maintenant.",
      intent:'liberte',target:'Kaelen & Alistair',importance:'major',
      next:'ROMANCE_AGENCY_VILLAGE'
    }
  ]
},

'ACTE3_10_ACCUEIL_CULTE_1': {
  sceneNumber: 'ACTE3_10_ACCUEIL_CULTE_1', 
  chapter: 3, 
  title: "La Garde", 
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Place_du_village_avec_statue_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Grande%20Pr%C3%AAtresse%20bg/SPRITE_PRETRESSE_DEBOUT_AUTORITAIRE_202606231801.png",
  voice: "URL_VOIX_PRETRESSE",
  getDynamicNarrative: (gs) => {
    let intro = "";
    if (gs.hasFlag('silas_mort')) {
      intro += "Un officier murmure à l’oreille de la foule en fixant ton cortège : « C’est elle… Celle qui a purgé le marchand de la route du Sud. La pitié n’émousse pas son bras. » La réputation de ta rigueur t’a devancée.\n\n";
    } else if (gs.hasFlag('silas_ami')) {
      intro += "Une matrone s’incline avec une ferveur soulagée : « Vous avez épargné le colporteur de la frontière. La Reine protège les humbles. » Le sillage de ta clémence adoucit leur accueil.\n\n";
    }

    let text = intro + "La Grande Prêtresse Oraya fend la haie d’honneur, ses fourrures blanches balayant le sol, ses yeux rituels bleuis par le froid emplis de larmes sacrées à la vue de Fen. « Le guide de Kalthar a retrouvé sa Souveraine… La prophétie de l’Hiver s’incarne. Notre veille prend fin. » Sa voix tremble sur ce dernier mot, comme si elle portait ce serment depuis bien plus longtemps que sa charge ne le laisse croire.\n\n";
    if (gs.hasFlag('marche_rapide')) {
      text += "Son regard se durcit en te détaillant. « Votre arrivée est... précipitée, Majesté. » Le mot sonne comme un reproche voilé. Les Enfants du Gel ont eu le temps de douter — votre vitesse a nourri les rumeurs. L’accueil sera chaleureux en apparence, mais chaque sourire cache une méfiance neuve.\n\n";
    }
    if (gs.hasFlag('marche_lente')) {
      text += "Son regard s’adoucit en te détaillant. « Vous avez pris le temps de venir jusqu’à nous. » Le mot sonne comme une bénédiction voilée. Les Enfants du Gel ont eu le temps de préparer ton arrivée — les rites sont plus longs, plus profonds, plus vrais. L’accueil est celui qu’on réserve à une reine qui sait que la haste est une insulte au sacré.\n\n";
    }
    text += "Ses traits se durcissent en ciblant Kaelen et Alistair. « Mais ces parasites transpirent l’odeur des cités du Sud. Ils doivent céder leurs armes et subir la purification avant le Conseil. »\n\nKaelen retient un sifflement. Alistair crispe les doigts sur son sceptre. Le moindre geste déclenchera un massacre.";
    return text;
  },
  choices: [
    { 
      key: 'O', 
      text: "Autoriser Kaelen à feindre la soumission tout en dissimulant une dague dans sa botte.", 
      effects: [{ type: "SET_FLAG", target: "kaelen_arme" }], 
      next: 'ACTE3_11_JUGEMENT' 
    },
    { 
      key: 'E', 
      text: "Exiger d’Alistair qu’il dépose son sceptre sacré pour garantir la trêve.", 
      effects: [{ type: "SET_FLAG", target: "alistair_desarme" }], 
      next: 'ACTE3_11_JUGEMENT' 
    },
    { 
      key: 'S', 
      text: "Geler l’acier des gardes d’un geste sec. « Ils conservent leurs lames. »", 
      effects: [{ type: "SET_FLAG", target: "autorite_royale" }], 
      next: 'ACTE3_11_JUGEMENT' 
    }
  ]
},

'ACTE3_11_JUGEMENT': {
  sceneNumber: '3.11', 
  chapter: 3, 
  title: "Le Verdict de Basalte", 
  mood: 'tension',
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Grande%20Pr%C3%AAtresse%20bg/SPRITE_PRETRESSE_DEBOUT_AUTORITAIRE_202606231801.png",
  getDynamicNarrative: (gs) => {
    // --- VERSION NG+ COMIQUE ---
    

    // --- VERSION NORMALE ---
    let text = "Sous la coupole de basalte de la salle d’audience, l’acoustique amplifie le sang qui bat dans tes tempes.\n\n";

    if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
      text += "Kaelen et Alistair sont à tes côtés, désarmés ou non. Le tribunal te regarde toi. Pas le trio.\n\n";
    }

    if (gs.hasFlag('kaelen_arme')) {
      text += "Alors que les gardes s’approchent, Kaelen ne se laisse pas faire. La dague qu’il avait cachée dans sa botte jaillit, balafant la main d’un officier.\n\n";
    } else if (gs.hasFlag('alistair_desarme')) {
      text += "Alistair remet son sceptre aux vestales, un geste qui lui coûte visiblement plus qu’il ne le montre. Connaissant désormais les mensonges de son Ordre, il n’a plus l’énergie morale de défendre son dogme.\n\n";
    } else if (gs.hasFlag('autorite_royale')) {
      text += "La Prêtresse ravale son insistance, courbant l’échine devant la souveraineté chirurgicale de ton fluide.\n\n";
    }

    text += "La matriarche pointe un doigt accusateur vers le clerc. « Cet Inquisiteur porte les insignes du culte qui a supplicié notre peuple. Ordonne qu’on le jette dans la fosse de glace. »";
    return text;
  },
  choices: [
    
    { 
      key: 'O', 
      condition: (gs) => isClassicState(gs),
      text: "« Précipitez le clerc au cachot. Kaelen reste à mes côtés. »", 
      effects: [{ type: "SET_FLAG", target: "alistair_emprisonne" }], 
      next: 'ACTE3_11_PRISON_ECHANGE' 
    },
    { 
      key: 'E_TYRAN', 
      condition: (gs) => !gs.hasGlobalFlag('ng_plus_unlocked') && (gs.hasFlag('silas_mort') || gs.hasFlag('auberge_sanglante')), 
      text: "« Il est sous ma protection. » Ta réputation de boucher les terrifie.", 
      effects: [
        { type: "SET_FLAG", target: "alistair_protege" },
        { type: "SET_FLAG", target: "protege_terreur" }
      ], 
      next: 'ACTE3_12_AUTEL_KALTHAR' 
    },
    { 
      key: 'E_CLEMENT', 
      condition: (gs) => !gs.hasGlobalFlag('ng_plus_unlocked') && !gs.hasFlag('silas_mort') && !gs.hasFlag('auberge_sanglante'), 
      text: "« Il est sous ma protection. » Déchaîner ton aura magique.", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 5 }, 
        { type: "SET_FLAG", target: "alistair_protege" },
        { type: "SET_FLAG", target: "protege_aura" }
      ], 
      next: 'ACTE3_12_AUTEL_KALTHAR' 
    },
    { 
      key: 'S', 
      condition: (gs) => isClassicState(gs),
      text: "« Placez-les tous deux sous escorte armée. »", 
      effects: [{ type: "SET_FLAG", target: "compagnons_enchaines" }], 
      next: 'ACTE3_12_AUTEL_KALTHAR' 
    }
  ]
},

'ACTE3_11_PRISON_ECHANGE': {
  sceneNumber: '3.11.ADD', 
  chapter: 3, 
  title: "Regard à Travers les Barreaux", 
  mood: 'intimate',
  getDynamicNarrative: (gs) => {
    return gs.hasFlag('alistair_emprisonne') 
      ? "En passant près de la grille des geôles, Alistair ne dit mot. Mais son regard croise le tien — un instant trop long, trop chargé."
      : "Les cellules restent vides, gardées par la glace.";
  },
  choices: [
    { 
      key: 'SUIVRE', 
      text: "Rejoindre l’Autel.", 
      next: 'ACTE3_12_AUTEL_KALTHAR' 
    }
  ]
},

'ACTE3_12_AUTEL_KALTHAR': {
  sceneNumber: 'ACTE3_12_AUTEL_KALTHAR', 
  chapter: 3, 
  title: "Le Poids de la Couronne", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Autel_int%C3%A9rieur_avec_%C3%A9p%C3%A9e_bris%C3%A9e_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kalthar%20bg/SPRITE_KALTHAR_ASTRAL_DEBOUT_FACE_202606231758.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('alistair_emprisonne')) {
      text += "Alistair est traîné vers les cryptes basses, son regard cherchant le tien une dernière fois avant que les portes ne se referment.\n\n";
    } else if (gs.hasFlag('alistair_protege')) {
      if (gs.hasFlag('protege_terreur')) {
        text += "La Prêtresse s’incline trop vite. Ta réputation de boucher a précédé ta voix : personne dans la nef ne cherche à vérifier si le prêtre mérite vraiment ta protection.\n\n";
      } else if (gs.hasFlag('protege_aura')) {
        text += "La Prêtresse s’incline. L’aura que tu as déployée laisse encore un goût d’ozone dans la nef ; elle dissimule sa frustration derrière un respect forcé.\n\n";
      } else {
        text += "La Prêtresse s’incline, dissimulant sa frustration.\n\n";
      }
    } else if (gs.hasFlag('compagnons_enchaines')) {
      text += "Kaelen et Alistair sont évacués de la nef, un silence pesant entre les gardes et eux.\n\n";
    }

    text += "Tu t’avances vers l’épée brisée de Kalthar, posée sur l’autel comme une plaie qu’on refuse de refermer.";
    if ((gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) && !gs.hasFlag('compagnons_enchaines') && !gs.hasFlag('alistair_emprisonne')) {
      text += " Derrière toi, Kaelen et Alistair attendent sans un mot — témoins, pas prêtres de ta couronne.";
    }
    text += " La mémoire mémorielle explose.";
    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "Toucher l’épée brisée...", 
      effects: [{ type: "SET_FLAG", target: "verite_kalthar" }], 
      next: 'FRAGMENT_3_TRAHISON' 
    }
  ]
},

'ACTE3_13_ARTEFACT': {
  sceneNumber: 'ACTE3_13_ARTEFACT', 
  chapter: 3, 
  title: "La Larme", 
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Autel_int%C3%A9rieur_avec_%C3%A9p%C3%A9e_bris%C3%A9e_202606191345.jpeg",
  sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Grande%20Pr%C3%AAtresse%20bg/SPRITE_PRETRESSE_DEBOUT_AUTORITAIRE_202606231801.png",
  voice: "URL_VOIX_PRETRESSE",
  text: `Oraya soutient un lourd écrin d’obsidienne contenant la Larme d’Ébène, ses mains tremblant sous le poids autant que sous la révérence. « Ce cristal consumera les verrous protégeant les accès de la Citadelle. Saisis-la, Majesté. »\n\nLe cristal pulse. Exactement comme dans le reflet du premier fragment. Exactement comme dans les yeux de Fen, une nuit sous le chêne mort.\n\nTu savais. Sans savoir. Depuis le début.`,
  choices: [
    { 
      key: 'A', 
      text: "Prendre la Larme d’Ébène et ordonner l’ascension vers les cimes.", 
      effects: [{ type: "SET_FLAG", target: "artefact_citadelle" }], 
      next: 'ACTE4_01_DEPART_VILLAGE' 
    },
    {key:'V515_VEYRA_VERITE', timeCost:0,condition:(gs)=>(gs.hasFlag('veyra_pacte_accepte')||gs.hasFlag('veyra_recit_mis_en_doute'))&&!gs.hasFlag('veyra_verite_decouverte'),text:"Examiner le fragment de Veyra avant d'aller plus loin.",effects:[{type:'PUSH_RETURN',target:'ACTE3_13_ARTEFACT'}], next:'VEYRA_VERITE'},
    {key:'V515_SERAPHINE_FRACTURE', timeCost:0,condition:(gs)=>gs.hasFlag('seraphine_arrivee_vue')&&!gs.hasFlag('seraphine_fracture_vue'),text:"Lire avec Séraphine les registres saisis à l'Ordre.",effects:[{type:'PUSH_RETURN',target:'ACTE3_13_ARTEFACT'}], next:'SERAPHINE_FRACTURE'},
    {key:'V515_MIRA_ROUTE', timeCost:0,condition:(gs)=>(gs.hasFlag('mira_fuite_acceptee')||gs.hasFlag('mira_attend')||gs.hasFlag('mira_liberee'))&&!gs.hasFlag('mira_route_sans_nom_vecue'),text:"Suivre Mira par une route qui n'existe sur aucune carte.",effects:[{type:'PUSH_RETURN',target:'ACTE3_13_ARTEFACT'}], next:'MIRA_ROUTE_SANS_NOM'},
    {key:'V515_CORONA_VISION', timeCost:0,condition:(gs)=>(gs.getGauge('memoire_kalthar')||0)>=6&&!gs.hasFlag('corona_vision_vue'),text:"Examiner la ligne de givre qui respire avec toi.",effects:[{type:'PUSH_RETURN',target:'ACTE3_13_ARTEFACT'}], next:'CORONA_VISION'},
    {key:'V515_DETTE_REVELATION', timeCost:0,condition:(gs)=>gs.hasFlag('dette_O_confrontee')&&gs.hasFlag('dette_E_confrontee')&&!gs.hasFlag('dette_systeme_compris'),text:"Mettre côte à côte les deux dettes. Chercher ce qu'elles ont en commun.",effects:[{type:'PUSH_RETURN',target:'ACTE3_13_ARTEFACT'}], next:'DETTE_REVELATION'}
  ]
},

'ACTE3_09B_BIVOUAC_TEMPETE': {
  sceneNumber: '3.09B',
  chapter: 3,
  title: "La Crevasse avant le Jugement",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Crevasse_blizzard_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
  let text = "";
  if (gs.timers && gs.timers.venin !== undefined && gs.timers.venin > 0) {
    text += "La veine noire sous ton poignet a grimpé jusqu’à ton coude. ";
    if (gs.timers.venin === 1) {
      text += "Il te reste une journée. Peut-être moins. Le village caché n’est plus une destination — c’est une course contre ta propre chair.\n\n";
    } else if (gs.timers.venin === 2) {
      text += "Il te reste deux jours. Le compte à rebours pulse sous ta peau, synchronisé avec ton cœur.\n\n";
    } else {
      text += "Il te reste " + gs.timers.venin + " jours. Le venin monte, lent, inexorable.\n\n";
    }
  }

  // --- Branche Domination (haute Instabilité) ---
  if (gs.hasFlag('crevasse_domination')) {
    if (gs.getGauge('instabilite') >= 30) {
      text += "Tes pupilles blanches balayent les deux silhouettes. Le givre s’élève du sol et forme deux genoux de glace pure.\n\n« À genoux, » as-tu dit. Ce n’était pas une demande.\n\nKaelen s’agenouille le premier, un sourire carnassier aux lèvres. Alistair hésite une demi-seconde de trop — le givre le force. Ses genoux frappent la pierre.\n\n« Consorts, » murmures-tu. « Ou outils. À vous de choisir la nuance. »";
    } else {
      text += "Tu as ordonné. Ils ont obéi.\n\nKaelen s’agenouille sans un mot, le regard levé, défi et soumission mêlés. Alistair tremble, mais il plie. L’insigne éteint brille une dernière fois entre ses doigts avant de retomber.\n\nLe silence de la crevasse est devenu un trône.";
    }
    return text;
  }

  // --- Branches existantes (romance classique) ---
  if (gs.getGauge('instabilite') < 15) {
    if (gs.hasFlag('romance_crevasse_O')) {
      text += "Kaelen tremble contre toi. Pas de froid. De peur. « Je n'ai jamais eu peur de mourir, » murmure-t-il dans ton cou, ses lèvres brûlantes sur ta peau gelée. « Mais je ne sais pas comment survivre à toi. » Ses mains sont maladroites, presque timides --- l'assassin démonté par la tendresse.\n\n";
      text += "Tu l'enveloppes de ton manteau, et pour un instant, il n'y a plus de Reine, plus d'Ombre. Juste deux corps qui refusent le froid.";
    } else if (gs.hasFlag('romance_crevasse_E')) {
      text += "Alistair pleure en silence, ses larmes s'évaporant sur ta joue avant de geler. « Je ne mérite pas ce moment, » souffle-t-il. « Je ne mérite pas ta chaleur. »\n\n";
      text += "Tu lui fermes la bouche d'un baiser lent, solennel, comme un serment que tu prends plutôt qu'il ne te donne. Il frissonne, puis se fond contre toi, enfin délivré de son jugement intérieur.";
    }
  } else if (gs.getGauge('instabilite') >= 15 && gs.getGauge('instabilite') < 30) {
    if (gs.hasFlag('romance_crevasse_O')) {
      text += "Kaelen t'observe avec une faim calculée. « Tu me donnes ce que tu refuses aux autres, » dit-il, ses doigts glissant sous ta tunique avec une précision de chirurgien. « Je vais m'en souvenir quand ils te réclameront. »\n\n";
      text += "Tu ne réponds pas. Tu le laisses faire, utilisant son désir comme un levier, une corde que tu tires quand ça t'arrange. Le plaisir est réel. Le froid, aussi.";
    } else if (gs.hasFlag('romance_crevasse_E')) {
      text += "Alistair est à genoux devant toi, non pas en prière, en soumission. « Dis-moi ce que tu veux, » bredouille-t-il, le visage levé vers tes yeux de givre. « Je briserai n'importe quel vœu. »\n\n";
      text += "Tu poses ta main sur sa tête. C'est un geste de bénédiction et de chaîne. Il le sait. Il l'accepte.";
    }
  } else {
    if (gs.hasFlag('romance_crevasse_O')) {
      text += "Tes pupilles blanches reflètent le visage de Kaelen décomposé en lumière spectrale. « Consort Noir, » dis-tu, et ce n'est pas une demande. C'est une ordination.\n\n";
      text += "Il s'agenouille sans hésiter, sa dague posée entre vous comme un gage. « Je t'appartiens, Majesté. Corps, âme, et Cendres. » Le givre recouvre ses épaules, scellant le pacte dans la chair.";
    } else if (gs.hasFlag('romance_crevasse_E')) {
      text += "Alistair ne pleure plus. Il est figé, transi d'adoration et d'horreur. « Tu es devenue... » Il cherche le mot.\n\n";
      text += "« Divine, » termines-tu pour lui. « Et tu es mon Paladin Éternel. Ma cage dorée. Ma propriété. » Tu lui prends le menton. Il fond dans ta main, brisé, comblé, damné.";
    }
  }

  // Premier passage : aucun flag romance/domination encore
  if (!text) {
    text = "La crevasse s’ouvre comme une cicatrice dans le glacier. Le vent y hurle en notes trop pures, trop proches du chant de Lyra pour être un hasard.\n\n";
    if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
      text += "Kaelen et Alistair sont là, de part et d’autre du sentier. Pas pour te guider — parce qu’ils n’ont pas tourné les talons.\n\n";
      text += "Fen plaque ses oreilles contre ta gorge. Le jugement attend au fond de la brume. Tu n’as promis demain à personne.";
    } else if (gs.hasFlag('avec_ombre') && !gs.hasFlag('avec_eclaireur')) {
      text += "Kaelen marche un pas derrière toi, lames prêtes. Le silence entre vous n’est plus seulement hostile — il est lourd, comme avant une chute.\n\n";
      text += "Le village caché n’est plus qu’une lueur au-delà du blizzard.";
    } else if (gs.hasFlag('avec_eclaireur') && !gs.hasFlag('avec_ombre')) {
      text += "Alistair serre son insigne éteint. La crevasse lui rappelle trop les fosses de l’Ordre.\n\n";
      text += "« Après ça, » murmure-t-il, « il n’y aura plus de mensonge possible. »";
    } else {
      text += "Kaelen et Alistair se tiennent de part et d’autre, trop proches pour s’ignorer, trop fiers pour se parler.\n\n";
      text += "Le jugement du culte n’est plus qu’une descente. Ce qui se joue ici, dans le vent, pourrait compter davantage.";
    }
  }

  return text;
},
  choices: [
    {
      key: 'O_REPARER',
      condition: (gs) => companionPresentO(gs) && gs.hasFlag('O_distant_1'),
      text: "Tendre la main vers Kaelen. « Je n'ai pas oublié qui m'a tirée du gouffre. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 2 },
        { type: "REMOVE_FLAG", target: "O_distant_1" },
        { type: "SET_FLAG", target: "romance_crevasse_O" },
        { type: "SET_FLAG", target: "crevasse_doux" }
      ],
      next: 'ACTE3_09B_ROMANCE_URGENCE'
    },
    {
      key: 'E_REPARER',
      condition: (gs) => companionPresentE(gs) && gs.hasFlag('E_distant_1'),
      text: "Poser ta main sur l'insigne éteint d'Alistair. « Ta lumière ne m'a jamais offensée. C'est ton silence qui me blesse. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 2 },
        { type: "REMOVE_FLAG", target: "E_distant_1" },
        { type: "SET_FLAG", target: "romance_crevasse_E" },
        { type: "SET_FLAG", target: "crevasse_doux" }
      ],
      next: 'ACTE3_09B_ROMANCE_URGENCE'
    },
    {
      key: 'O_CONSOMMER',
      condition: (gs) => companionPresentO(gs) && !gs.hasFlag('O_distant_1') && gs.getGauge('lien_O') >= 4,
      text: "Saisir Kaelen par le col et l'attirer dans l'ombre de la crevasse. Pas de mots. Plus de temps.",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "SET_FLAG", target: "romance_crevasse_O" },
        { type: "SET_FLAG", target: "crevasse_brulant" }
      ],
      next: 'ACTE3_09B_ROMANCE_URGENCE'
    },
    {
      key: 'E_CONSOMMER',
      condition: (gs) => companionPresentE(gs) && !gs.hasFlag('E_distant_1') && gs.getGauge('lien_E') >= 4,
      text: "Effleurer les lèvres d'Alistair. « Si demain est le jugement, je veux un péché dont je ne demanderai pas pardon. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "romance_crevasse_E" },
        { type: "SET_FLAG", target: "crevasse_brulant" }
      ],
      next: 'ACTE3_09B_ROMANCE_URGENCE'
    },
    {
      key: 'S_AVANCER',
      condition: (gs) => !gs.hasFlag('voie_solo') && !gs.hasFlag('voie_solo_profonde'),
      text: "Fermer les yeux et laisser le blizzard décider à votre place.",
      effects: [
        { type: "ADD_GAUGE", target: "volonte", value: 1 },
        { type: "ADD_GAUGE", target: "presence_S", value: 1 },
        { type: "SET_FLAG", target: "crevasse_silence" },
        { type: "SET_FLAG", target: "crevasse_silence_groupe" }
      ],
      next: 'ACTE3_09_VILLAGE_CACHE'
    },
    {
      key: 'V28_RECONQUERIR_O',
      condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
        && (gs.getGauge('presence_O') >= 5 || gs.getGauge('affinite_ombre') >= 8)
        && !gs.hasFlag('avec_ombre'),
      text: "Tendre la main vers Kaelen. « Je n'ai pas oublié. »",
      effects: [
        { type: "ADD_GAUGE", target: "presence_O", value: 2 },
        { type: "ADD_GAUGE", target: "lien_O", value: 3 },
        { type: "JOIN_COMPANION", target: "O" },
        { type: "SET_FLAG", target: "romance_crevasse_O" },
        { type: "SET_FLAG", target: "v28_reconquete_crevasse_O" }
      ],
      next: 'ACTE3_09B_ROMANCE_URGENCE'
    },
    {
      key: 'V28_RECONQUERIR_E',
      condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
        && (gs.getGauge('presence_E') >= 5 || gs.getGauge('affinite_eclaireur') >= 8)
        && !gs.hasFlag('avec_eclaireur'),
      text: "Poser ta main sur l'insigne d'Alistair. « Ta lumière me manque. »",
      effects: [
        { type: "ADD_GAUGE", target: "presence_E", value: 2 },
        { type: "ADD_GAUGE", target: "lien_E", value: 3 },
        { type: "JOIN_COMPANION", target: "E" },
        { type: "SET_FLAG", target: "romance_crevasse_E" },
        { type: "SET_FLAG", target: "v28_reconquete_crevasse_E" }
      ],
      next: 'ACTE3_09B_ROMANCE_URGENCE'
    },
    {
      key: 'S_AVANCER_SOLO',
      condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'),
      text: "Avancer sans demander leur avis. Le blizzard n’en a pas non plus.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 3 },
        { type: "SET_FLAG", target: "crevasse_silence" },
        { type: "SET_FLAG", target: "crevasse_silence_solo" }
      ],
      next: 'ACTE3_09_VILLAGE_CACHE'
    },
    {
      key: 'AVANCER',
      condition: (gs) => !gs.hasFlag('O_distant_1') && !gs.hasFlag('E_distant_1'),
      text: "Reprendre la route. Le village est proche.",
      effects: [
        { type: "SET_FLAG", target: "crevasse_finie" }
      ],
      next: 'ACTE3_09_VILLAGE_CACHE'
    },
    {
      key: 'DOMINER',
      condition: (gs) => gs.getGauge('instabilite') >= 25,
      text: "« À genoux. Les deux. »",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 2 },
        { type: "SET_FLAG", target: "crevasse_domination" }
      ],
      next: 'ACTE3_09B_ROMANCE_URGENCE'
    },
    {
      key:'V517_DEFERRED_O',
      condition:(gs)=>gs.hasFlag('_romance_deferred_O')&&COND.companionPresentO(gs)&&!gs.hasFlag('_romance_beat_recent'),
      text:"Revenir vers Kaelen. Cette conversation n'a pas disparu.",
      intent:'confiance',target:'Kaelen',importance:'significant',
      effects:[{type:'PUSH_RETURN',target:'ACTE3_09B_BIVOUAC_TEMPETE'}],
      next:'ROMANCE_DEFERRED_KAELEN'
    },
    {
      key:'V517_DEFERRED_E',
      condition:(gs)=>gs.hasFlag('_romance_deferred_E')&&COND.companionPresentE(gs)&&!gs.hasFlag('_romance_beat_recent'),
      text:"Revenir vers Alistair. Cette conversation n'a pas disparu.",
      intent:'confiance',target:'Alistair',importance:'significant',
      effects:[{type:'PUSH_RETURN',target:'ACTE3_09B_BIVOUAC_TEMPETE'}],
      next:'ROMANCE_DEFERRED_ALISTAIR'
    }
  ]
},

'ACTE3_09B_ROMANCE_URGENCE': {
  sceneNumber: '3.09B.R',
  chapter: 3,
  title: "Le Dernier Souffle Chaud",
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Crevasse_intimite_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "";

    // Un choix explicite de réparation gouverne toujours le payoff.
    // L'instabilité peut colorer la scène, mais ne transforme plus une main tendue en domination.
    if (gs.hasFlag('crevasse_doux')) {
      if (gs.hasFlag('romance_crevasse_O')) {
        text += "Kaelen regarde ta main avant de la prendre. « Réparer n’efface pas la dette, » souffle-t-il. « Mais ça peut empêcher qu’elle décide pour nous. » Il reste près de toi sans s’agenouiller, libre de retirer ses doigts — et il ne les retire pas.";
      } else if (gs.hasFlag('romance_crevasse_E')) {
        text += "Alistair pose ses doigts sur les tiens, sans prière et sans serment. « La lumière n’a rien à exiger de toi. Moi non plus. » Il reste parce que tu lui as ouvert un espace, pas parce qu’une chaîne le retient.";
      }
    } else if (gs.getGauge('instabilite') < 15) {
      if (gs.hasFlag('romance_crevasse_O')) {
        text += "Kaelen tremble contre toi. Pas de froid. De peur. « Je n'ai jamais eu peur de mourir, » murmure-t-il dans ton cou, ses lèvres brûlantes sur ta peau gelée. « Mais je ne sais pas comment survivre à toi. » Ses mains sont maladroites, presque timides --- l'assassin démonté par la tendresse.\n\n";
        text += "Tu l'enveloppes de ton manteau, et pour un instant, il n'y a plus de Reine, plus d'Ombre. Juste deux corps qui refusent le froid.";
      } else if (gs.hasFlag('romance_crevasse_E')) {
        text += "Alistair pleure en silence, ses larmes s'évaporant sur ta joue avant de geler. « Je ne mérite pas ce moment, » souffle-t-il. « Je ne mérite pas ta chaleur. »\n\n";
        text += "Tu lui fermes la bouche d'un baiser lent, solennel, comme un serment que tu prends plutôt qu'il ne te donne. Il frissonne, puis se fond contre toi, enfin délivré de son jugement intérieur.";
      }
    } else if (gs.getGauge('instabilite') >= 15 && gs.getGauge('instabilite') < 30) {
      if (gs.hasFlag('romance_crevasse_O')) {
        text += "Kaelen t'observe avec une faim calculée. « Tu me donnes ce que tu refuses aux autres, » dit-il, ses doigts glissant sous ta tunique avec une précision de chirurgien. « Je vais m'en souvenir quand ils te réclameront. »\n\n";
        text += "Tu ne réponds pas. Tu le laisses faire, utilisant son désir comme un levier, une corde que tu tires quand ça t'arrange. Le plaisir est réel. Le froid, aussi.";
      } else if (gs.hasFlag('romance_crevasse_E')) {
        text += "Alistair est à genoux devant toi, non pas en prière, en soumission. « Dis-moi ce que tu veux, » bredouille-t-il, le visage levé vers tes yeux de givre. « Je briserai n'importe quel vœu. »\n\n";
        text += "Tu poses ta main sur sa tête. C'est un geste de bénédiction et de chaîne. Il le sait. Il l'accepte.";
      }
    } else {
      if (gs.hasFlag('romance_crevasse_O')) {
        text += "Tes pupilles blanches reflètent le visage de Kaelen décomposé en lumière spectrale. « Consort Noir, » dis-tu, et ce n'est pas une demande. C'est une ordination.\n\n";
        text += "Il s'agenouille sans hésiter, sa dague posée entre vous comme un gage. « Je t'appartiens, Majesté. Corps, âme, et Cendres. » Le givre recouvre ses épaules, scellant le pacte dans la chair.";
      } else if (gs.hasFlag('romance_crevasse_E')) {
        text += "Alistair ne pleure plus. Il est figé, transi d'adoration et d'horreur. « Tu es devenue... » Il cherche le mot.\n\n";
        text += "« Divine, » termines-tu pour lui. « Et tu es mon Paladin Éternel. Ma cage dorée. Ma propriété. » Tu lui prends le menton. Il fond dans ta main, brisé, comblé, damné.";
      }
    }

    // V26.3.7 — écho ton réparer vs consommer
    if (gs.hasFlag('crevasse_doux')) {
      text += "\n\nLe geste est resté ouvert — une main tendue, pas une prise. Demain, le village jugera. Ce soir, le froid a cédé d’un degré.";
    } else if (gs.hasFlag('crevasse_brulant')) {
      text += "\n\nIl n’y a pas eu de négociation. Seulement l’urgence, et le givre qui a pris le goût de la peau.";
    }

    if (!text) {
      text = "Le blizzard referme la crevasse derrière vous. Aucun geste n'est réclamé, aucun serment arraché : seulement des souffles courts et la certitude d'avoir survécu ensemble. Vous reprenez la route lorsque chacun peut de nouveau tenir debout.";
    }
    
    return text;
  },
  choices: [
    {
      key: 'A',
      text: "Laisser le silence emporter ce qui vient de se sceller.",
      effects: [
        { type: "SET_FLAG", target: "crevasse_finie" }],
      next: 'ACTE3_09_VILLAGE_CACHE'
    }
  ]
},

// ==========================================
// NOUVELLES SCÈNES DE LIAISON + JOUTES + FLASHBACK
// ==========================================

'ACTE3_DAGUE_COMBAT': {
    sceneNumber: 'DAGUE_COMBAT',
    chapter: 3,
    title: "Lame Empruntée",
    mood: 'tension',
    condition: (gs) => gs.hasFlag('dague_kaelen_prise') && !gs.hasFlag('dague_utilisee_combat'),
    getDynamicNarrative: (gs) => {
      return "Un garde du village caché bloque le passage, lame haute. Kaelen a déjà la main sur sa seconde dague.\n\n" + "Tu sors celle qu’il t’a laissée. Le métal chante légèrement.\n\n" + "Kaelen lève un sourcil. « Elle coupe toujours aussi bien. Même dans tes mains. »";
    },
    choices: [
      {
        key: 'A',
        text: "Finir le duel toi-même.",
        effects: [
          { type: "SET_FLAG", target: "dague_utilisee_combat" },
          { type: "SET_FLAG", target: "dague_sang" },
          { type: "SET_FLAG", target: "_dague_combat_vu" },
          { type: "ADD_GAUGE", target: "lien_O", value: 1 },
          { type: "ADD_GAUGE", target: "affinite_ombre", value: 3 },
          { type: "UNLOCK_ACHIEVEMENT", target: "ach_dague_combat" }
        ],
        next: 'ACTE3_09_VILLAGE_CACHE'
      },
      {
        key: 'B',
        text: "Laisser Kaelen terminer.",
        effects: [
          { type: "SET_FLAG", target: "dague_utilisee_combat" },
          { type: "SET_FLAG", target: "_dague_combat_vu" },
          { type: "ADD_GAUGE", target: "lien_O", value: 1 }
        ],
        next: 'ACTE3_09_VILLAGE_CACHE'
      }
    ]
  },

'ACTE3_SILAS_CAMEO': {
    sceneNumber: '3.SILAS',
    chapter: 3,
    title: "Une Dette Ancienne",
    mood: 'exploration',
    condition: (gs) => gs.hasFlag('silas_ami') || gs.hasFlag('silas_mort'),
    getDynamicNarrative: (gs) => {
      if (gs.hasFlag('silas_ami')) {
        return "Au détour d’une ruelle du village caché, un marchand familier te tend un petit objet inutile mais touchant — un bouton de manteau gravé d’un flocon.\n\n" + "Silas a survécu. Il ne dit presque rien. Il sourit juste, comme un homme qui a compris que certaines dettes se règlent en silence.";
      }
      return "Une rumeur court entre les baraques du village caché : le marchand aux étoffes étranges n’est jamais ressorti de la mine. Personne ne dit son nom. Tout le monde le regarde quand même.";
    },
    choices: [
      {
        key: 'NEXT',
        text: "Continuer.",
        effects: [{ type: "SET_FLAG", target: "_silas_cameo_vu" }],
        next: 'RETURN'
      }
    ]
  },

'KAELEN_SILENCE': {
    sceneNumber: 'V26.4.K',
    chapter: 3,
    title: "Ce que le Regard Garde",
    mood: 'intimate',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Crevasse_blizzard_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
    getDynamicNarrative: (gs) => {
      return "Il ne parle pas.\n\n" + "Depuis une heure, Kaelen est assis en face de toi, de l'autre côté du feu. Il n'aiguise pas ses dagues. Il ne vérifie pas les issues. Il ne fait rien d'utile — ce qui, chez lui, est déjà un aveu.\n\n" + "Il te regarde. Pas avec désir. Pas avec défi. Avec cette attention totale, chirurgicale, d'un homme qui inventorie ce qu'il pourrait perdre.\n\n" + "Tu soutiens son regard. Une minute. Deux. Cinq.\n\n" + "Il ne détourne pas les yeux. Il ne sourit pas. Il ne dit rien.\n\n" + "Puis, très lentement, il pose sa main à plat sur la pierre entre vous — paume vers le haut. Une invitation. Ou une reddition. Chez lui, c'est la même chose.\n\n" + "Tu ne la prends pas. Il ne la retire pas.\n\n" + "Le feu crépite. Le blizzard hurle dehors. Et dans ce silence, il vient de te dire plus qu'il ne l'a jamais fait avec des mots.";
    },
    choices: [{
      key: 'NEXT',
      text: "Laisser la main là. Jusqu'au matin.",
      effects: [
        { type: "SET_FLAG", target: "_kaelen_silence_vu" },
        { type: "SET_FLAG", target: "possession_kaelen_sans_mots" }
      ],
      next: 'RETURN'
    }]
  },

'FEU_PARTAGE_EXTENSION': {
    sceneNumber: 'V26.4.F',
    chapter: 3,
    title: "Le Feu qui ne Demande Rien",
    mood: 'intimate',
    getDynamicNarrative: (gs) => {
      return "Vous êtes trois autour du feu. Pour la première fois depuis la pomme, personne ne parle.\n\n" + "Kaelen a posé sa dague à côté de lui — pas par confiance, par fatigue. Alistair a éteint son insigne — pas par doute, par épuisement. Toi, tu regardes les flammes comme on regarde une vieille blessure qui a fini de saigner.\n\n" + "Le silence n'est plus hostile. Il est... possible.\n\n" + "Kaelen pousse un tison vers Alistair. Sans un mot. Le prêtre le regarde, surpris, puis hoche la tête. Un geste minuscule. Mais c'est la première fois depuis des semaines qu'ils partagent quelque chose sans que ce soit toi.\n\n" + "Tu ne dis rien. Tu n'as rien à dire.\n\n" + "Le feu continue. Eux aussi. Toi aussi.";
    },
    choices: [{
      key: 'NEXT',
      text: "Laisser la nuit finir.",
      effects: [
        { type: "SET_FLAG", target: "_feu_partage_ext_vu" },
        { type: "SET_FLAG", target: "tension_kaelen_alistair_apaisee" }
      ],
      next: 'RETURN'
    }]
  },

'RELIQUE_KALTHAR_2': {
    sceneNumber: 'V26.4.R2',
    chapter: 3,
    title: "Le Sceau de la Volière",
    mood: 'exploration',
    getDynamicNarrative: (gs) => {
      return "Dans une ruelle du village caché, un enfant te tend un objet qu'il a trouvé dans " + "les ruines.\n\n" + "Un sceau royal. L'empreinte est usée, mais le givre qui l'entoure est encore vivant. Il " + "fond lentement sous tes doigts, comme s'il attendait d'être reconnu.\n\n" + "« C'était à lui, » dit l'enfant. « À l'ancien roi. »";
    },
    choices: [{
      key: 'NEXT',
      text: "Prendre le sceau.",
      effects: [
        { type: "SET_FLAG", target: "relique_2_trouvee" },
        { type: "ADD_GAUGE", target: "instabilite", value: 2 }
      ],
      next: 'RETURN'
    }]
  },

'URGENCE_NARRATIVE': {
    sceneNumber: 'V26.5.1.UN',
    chapter: 3,
    title: "Le Venin qui Monte",
    mood: 'tension',
    onEnter: (state) => {
      if (!state.timers) state.timers = {};
      state.timers.venin = 7; // V40.3 : marge jouable, les micro-choix ne doivent plus tuer en quelques clics
    },
    getDynamicNarrative: (gs) => {
      let text = "Le venin de Fen pulse sous ta peau. Tu le sens remonter — lentement, inexorablement. Une veine noire sous la peau de ton poignet, hier invisible, aujourd'hui large comme un fil.\n\n" +
        "Si tu n'agis pas, il atteindra ton cœur bientôt. Le temps n'est plus une abstraction.\n\n";
      if (companionPresentO(gs) && companionPresentE(gs)) {
        text += "Kaelen et Alistair ont vu la veine noire au même instant. L'assassin serre sa dague contre le temps ; le prêtre referme ses doigts sur son insigne éteint. Aucun des deux ne te demande lequel doit parler.\n\n" +
          "« Le village caché, » tranche Kaelen. Alistair acquiesce. « Pour une fois, nous sommes d'accord. »\n\n";
      } else if (companionPresentO(gs)) {
        text += "Kaelen te regarde. Il a vu. Il ne dit rien. Mais sa main se crispe sur sa dague — pas contre toi. Contre le temps.\n\n" +
          "« Le village caché, » dit-il enfin. « Ils ont peut-être un remède. Ou une malédiction qui tue plus vite. À ce stade, c'est la même chose. »\n\n";
      } else if (companionPresentE(gs)) {
        text += "Alistair te regarde. Il a vu. Son insigne pulse — faible, inquiet, comme une prière qui ne sait plus à qui s'adresser.\n\n" +
          "« Le village caché, » dit-il enfin. « Les Enfants du Gel connaissent peut-être un rituel. Ou un poison pire. À ce stade, c'est la même chose. »\n\n";
      } else {
        text += "Fen te regarde. Il a vu. Ses yeux noirs brillent d'une lueur ancienne — pas de la peur. De la reconnaissance. Comme s'il savait, depuis le début, que ce moment viendrait.\n\n" +
          "Le village caché. Là-bas, peut-être, une réponse. Ou une fin.\n\n";
      }
      text += "Le compte à rebours a commencé. Tu as encore une marge, mais chaque détour coûte.";
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Accélérer vers le village caché. Pas de temps à perdre.",
        effects: [
          { type: "SET_FLAG", target: "urgence_declenchee" },
          { type: "SET_FLAG", target: "marche_rapide" },
          { type: "ADD_GAUGE", target: "instabilite", value: 3 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "Garder le rythme. La panique ne sauve personne.",
        effects: [
          { type: "SET_FLAG", target: "urgence_declenchee" },
          { type: "SET_FLAG", target: "marche_lente" },
          { type: "ADD_GAUGE", target: "instabilite", value: -2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        text: "Ignorer le venin. Tu es la Reine de Givre. Tu ne crains pas la mort.",
        effects: [
          { type: "SET_FLAG", target: "urgence_declenchee" },
          { type: "ADD_GAUGE", target: "instabilite", value: 5 },
          { type: "SET_FLAG", target: "voie_solo" }
        ],
        next: 'RETURN'
      }
    ]
  },

'AVERTISSEMENT_POSSESSION': {
    sceneNumber: 'V50.POS.WARNING',
    chapter: 3,
    title: "Ce que le Givre Serre Trop Fort",
    mood: 'tension',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/royaume-souvenirs.webp",
    transitionGif: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/animations/souvenirs-vivants.mp4",
    getDynamicNarrative: (gs) => {
      let text = "Le froid ne vient plus seulement de toi. Il revient vers toi.\n\n";
      text += "Tes doigts se ferment sans raison. Sur une manche. Une poignée. Un souvenir. Tout ce qui pourrait partir devient soudain quelque chose à retenir.\n\n";
      text += "Fen — ou la mémoire de son poids — te rappelle une vérité simple : garder n’est pas aimer. Empêcher de partir n’est pas sauver.\n\n";
      if (gs.getGauge('possession') >= 25) {
        text += "Tu as déjà franchi la limite. Il reste une dernière seconde pour ouvrir la main.";
      } else {
        text += "Tu sens la limite approcher. Encore quelques gestes de ce genre et le Gel choisira à ta place.";
      }
      return text;
    },
    choices: [
      {
        key: 'RELEASE',
        text: "Ouvrir la main. Renoncer à retenir ce qui veut partir.",
        effects: [
          { type: 'SET_FLAG', target: '_possession_warning_vu' },
          { type: 'SET_FLAG', target: 'possession_warning_ecoute' },
          { type: 'ADD_GAUGE', target: 'possession', value: -5 },
          { type: 'ADD_GAUGE', target: 'volonte', value: 1 }
        ],
        next: 'RETURN'
      },
      {
        key: 'HOLD',
        text: "Refermer les doigts. « Ce qui est mien reste mien. »",
        effects: [
          { type: 'SET_FLAG', target: '_possession_warning_vu' },
          { type: 'SET_FLAG', target: 'possession_warning_ignore' }
        ],
        next: 'RETURN'
      }
    ]
  },

  // === V50.1 ACTIVE JOUTES — CONSOLIDATED, NO LEGACY STUBS ===
  };
}
