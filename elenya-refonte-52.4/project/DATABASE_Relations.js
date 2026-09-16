/** V52 — fragment DB RELATIONS.
 * Généré depuis V51.7.6 sans réécriture narrative.
 * 26 scènes.
 */
function _dbRelationsV52_() {
  return {
'LIEN_LISIERE_DEUX': {
  sceneNumber:'1.08B.OE',
  chapter:1,
  title:"Le Feu n'appartient à personne",
  mood:'intimate',
  image:"https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Foret_pins_noirs_202606191344.jpeg",
  getDynamicNarrative:(gs)=>{
    let t="Tu restes entre eux. Pas comme un prix placé au centre d'un duel : comme la personne qui a choisi l'endroit exact où s'asseoir.\n\n";
    t+="Kaelen finit par poser sa pierre à aiguiser. Alistair laisse son insigne sous sa chemise. Leurs mains restent de leur côté du feu.\n\n";
    if(gs.hasFlag('avec_eclaireur')) t+="Alistair connaît déjà la chaleur de ta proximité depuis la chute. Il ne s'en sert pas pour réclamer davantage. Kaelen le remarque — et, pour une fois, garde son commentaire.\n\n";
    else if(gs.hasFlag('avec_ombre')) t+="Kaelen connaît déjà la proximité née de la chute. Il ne transforme pas cette avance en droit acquis. Alistair le voit, et sa lumière cesse de pulser comme une alarme.\n\n";
    t+="Le silence à trois est plus difficile que deux tête-à-tête successifs. Personne ne peut faire semblant d'ignorer l'autre.";
    return t;
  },
  choices:[
    {
      key:'OE_MAIN',
      text:"Poser une main près de chacun, sans saisir personne. Les laisser décider s'ils veulent réduire la distance.",
      intent:'confiance',target:'Kaelen & Alistair',importance:'major',
      feedback:"Tu ouvres l’espace aux deux sans transformer leur réponse en dette.",
      effects:[
        {type:'ADD_GAUGE',target:'lien_O',value:1},
        {type:'ADD_GAUGE',target:'lien_E',value:1},
        {type:'ADD_GAUGE',target:'tension_triangle',value:1},
        {type:'SET_FLAG',target:'lisiere_trio_vu'},
        {type:'SET_FLAG',target:'lisiere_trio_ouvert'}
      ],
      next:'ACTE1_08B_BIVOUAC_LISIERE'
    },
    {
      key:'OE_TENDRE',
      text:"Rester simplement entre eux, épaule contre épaule quand le froid vous rapproche.",
      intent:'tendresse',target:'Kaelen & Alistair',importance:'significant',
      feedback:"La proximité existe sans promesse ni exclusivité.",
      effects:[
        {type:'ADD_GAUGE',target:'lien_O',value:1},
        {type:'ADD_GAUGE',target:'lien_E',value:1},
        {type:'SET_FLAG',target:'lisiere_trio_vu'},
        {type:'SET_FLAG',target:'lisiere_trio_tendresse'}
      ],
      next:'ACTE1_08B_BIVOUAC_LISIERE'
    },
    {
      key:'OE_DISTANCE',
      text:"« Pas de compétition ce soir. » Revenir à Fen et laisser le feu entre vous.",
      intent:'liberte',target:'Elenya',importance:'significant',
      feedback:"Tu refuses que leur rivalité transforme ta proximité en enjeu.",
      effects:[
        {type:'ADD_GAUGE',target:'volonte',value:1},
        {type:'SET_FLAG',target:'lisiere_trio_vu'},
        {type:'SET_FLAG',target:'lisiere_trio_limite'}
      ],
      next:'ACTE1_08B_BIVOUAC_LISIERE'
    }
  ]
},

'LIEN_LISIERE_KAELEN': {
    sceneNumber: '1.08B.K',
    chapter: 1,
    title: "Braises sans contrat",
    mood: 'romance',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Interactions%20bg/INTERACTION_DUO_KAELEN_TENDRESSE_JOUE_FIX_NO_TEXT_202606231806.png",
    getDynamicNarrative: (gs) => {
      let text = "Kaelen ne bouge pas quand tu restes près de lui. Les braises dessinent un reflet cuivre sur sa cicatrice. Sa dague repose enfin à plat, hors de l’espace entre vous.\n\n";
      text += "« Tu es venue jusqu’ici, » murmure-t-il. Pas une victoire. Une constatation. Son regard descend une seconde vers ta bouche, puis remonte vers tes yeux. « Je peux continuer à parler. Ou me taire. C’est toi qui décides. »";
      if (gs.hasFlag('bivouac_feu_E')) {
        text += "\n\nDe l’autre côté du feu, Alistair existe toujours. Kaelen ne te demande pas de l’effacer pour rester ici.";
      }
      return text;
    },
    choices: [
      {
        key: 'K_ROMANCE',
        importance: "major",
        irreversible: false,
        intent: 'romance',
        target: 'Kaelen',
        feedback: "Kaelen comprend que tu n’es pas venue seulement chercher sa compagnie.",
        journal: "À la Lisière des Pins Noirs, tu as choisi de laisser Kaelen voir qu’il pouvait exister autre chose entre vous.",
        text: "Réduire encore la distance. « Alors tais-toi une seconde. »",
        effects: [
          { type: "ADD_GAUGE", target: "lien_O", value: 2 },
          { type: "ADD_GAUGE", target: "presence_O", value: 1 },
          { type: "SET_FLAG", target: "interet_romantique_O" },
          { type: "SET_FLAG", target: "lisiere_romance_O_ouverte" },
          { type: "SET_FLAG", target: "lisiere_romance_O_vu" }
        ],
        next: 'ACTE1_08B_BIVOUAC_LISIERE'
      },
      {
        key: 'K_TENDRESSE',
        importance: "significant",
        irreversible: false,
        intent: 'tendresse',
        target: 'Kaelen',
        feedback: "La proximité demeure. Tu refuses encore de lui donner un nom.",
        text: "Rester épaule contre épaule, sans transformer la proximité en promesse.",
        effects: [
          { type: "ADD_GAUGE", target: "lien_O", value: 1 },
          { type: "SET_FLAG", target: "lisiere_tendresse_O" },
          { type: "SET_FLAG", target: "lisiere_romance_O_vu" }
        ],
        next: 'ACTE1_08B_BIVOUAC_LISIERE'
      },
      {
        key: 'K_RETOUR',
        intent: "distance",
        target: "Kaelen",
        importance: "minor",
        irreversible: false,
        text: "Lui rendre son espace. Le désir peut attendre.",
        effects: [
          { type: "SET_FLAG", target: "lisiere_romance_O_vu" }
        ],
        next: 'ACTE1_08B_BIVOUAC_LISIERE'
      }
    ]
  },

'LIEN_LISIERE_ALISTAIR': {
    sceneNumber: '1.08B.E',
    chapter: 1,
    title: "Lumière sans serment",
    mood: 'romance',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Interactions%20bg/INTERACTION_DUO_ALISTAIR_TENDRESSE_MAINS_GEL_GLOW_202606231806.png",
    getDynamicNarrative: (gs) => {
      let text = "Alistair garde sa lumière assez basse pour qu’elle ne ressemble plus à une barrière. Quand tu restes près de lui, sa respiration change à peine — juste assez pour trahir l’homme sous le prêtre.\n\n";
      text += "« Elenya… » Ton nom s’arrête contre ses lèvres comme une question. Il ne tend pas la main. Il te laisse l’espace de décider si ce moment doit devenir autre chose.";
      if (gs.hasFlag('bivouac_feu_O')) {
        text += "\n\nKaelen reste près des braises. Sa présence n’annule pas celle d’Alistair, et Alistair ne te demande pas de choisir entre eux.";
      }
      return text;
    },
    choices: [
      {
        key: 'E_ROMANCE',
        importance: "major",
        irreversible: false,
        intent: 'romance',
        target: 'Alistair',
        feedback: "Alistair comprend que tu t’adresses à l’homme, pas au prêtre.",
        journal: "À la Lisière des Pins Noirs, tu as pris la main d’Alistair sans lui demander de serment.",
        text: "Prendre sa main et la garder dans la tienne. « Ne prie pas. Reste. »",
        effects: [
          { type: "ADD_GAUGE", target: "lien_E", value: 2 },
          { type: "ADD_GAUGE", target: "presence_E", value: 1 },
          { type: "SET_FLAG", target: "interet_romantique_E" },
          { type: "SET_FLAG", target: "lisiere_romance_E_ouverte" },
          { type: "SET_FLAG", target: "lisiere_romance_E_vu" }
        ],
        next: 'ACTE1_08B_BIVOUAC_LISIERE'
      },
      {
        key: 'E_TENDRESSE',
        importance: "significant",
        irreversible: false,
        intent: 'tendresse',
        target: 'Alistair',
        feedback: "Sa lumière reste basse. La proximité suffit pour cette nuit.",
        text: "Partager sa chaleur sans demander davantage.",
        effects: [
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "SET_FLAG", target: "lisiere_tendresse_E" },
          { type: "SET_FLAG", target: "lisiere_romance_E_vu" }
        ],
        next: 'ACTE1_08B_BIVOUAC_LISIERE'
      },
      {
        key: 'E_RETOUR',
        intent: "distance",
        target: "Alistair",
        importance: "minor",
        irreversible: false,
        text: "Laisser la question ouverte et revenir au feu.",
        effects: [
          { type: "SET_FLAG", target: "lisiere_romance_E_vu" }
        ],
        next: 'ACTE1_08B_BIVOUAC_LISIERE'
      }
    ]
  },

'LIEN_MARCHE_BLANCHE': {
  sceneNumber: 'LIEN_MB',
  chapter: 2,
  title: "La Marche Blanche",
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Marche_dans_la_neige_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "La neige est redevenue reine. Le monde s’est réduit à un corridor blanc, le souffle court, les pas lourds. Vous avez fait halte dans une anfractuosité de glace, juste assez large pour trois corps et un silence trop dense.\n\n";
    if (gs.hasFlag('avec_ombre') || gs.hasFlag('joute_gagne_O') || gs.hasFlag('joute_perdue_O')) {
      text += "Kaelen est trop près. Ou trop loin. Selon le jour. Selon la joute.\n\n";
    }
    if (gs.hasFlag('avec_eclaireur') || gs.hasFlag('joute_gagne_E') || gs.hasFlag('joute_perdue_E')) {
      text += "Alistair a les lèvres bleues. Il ne prie plus à voix haute. Il murmure quelque chose qui n’est plus une prière.\n\n";
    }
    if (gs.getGauge('instabilite') >= 20) {
      text += "Tes pupilles ont commencé à blanchir. Tu le sens. Ils le voient. Personne n’en parle.\n\n";
    }
    if ((gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) && !gs.hasFlag('avec_ombre') && !gs.hasFlag('avec_eclaireur')) {
      text += "Ils n’ont pas offert de cape ni de lame. Tu n’as rien demandé. Trois silhouettes, un seul rythme — le tien.\n\n";
    }
    text += "Le vent porte encore, très loin, une note trop pure pour être un oiseau.";
    return text;
  },
  choices: [
    {
      key: 'O_PROCHE',
      condition: (gs) => gs.hasFlag('avec_ombre') || gs.getGauge('lien_O') >= 3,
      text: "Tendre la main vers Kaelen. « Reste. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "SET_FLAG", target: "marche_blanche_O" }
      ],
      next: 'LIEN_MARCHE_BLANCHE_B'
    },
    {
      key: 'E_PROCHE',
      condition: (gs) => gs.hasFlag('avec_eclaireur') || gs.getGauge('lien_E') >= 3,
      text: "Poser ta main sur l’insigne éteint d’Alistair. « Ta lumière n’a jamais offensé. C’est ton silence qui blesse. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "marche_blanche_E" }
      ],
      next: 'LIEN_MARCHE_BLANCHE_B'
    },
    {
      key: 'S_FROID',
      text: "Fermer les yeux. Laisser le blizzard décider.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 4 },
        { type: "SET_FLAG", target: "marche_blanche_solo" }
      ],
      next: 'LIEN_MARCHE_BLANCHE_B'
    }
  ]
},

'LIEN_MARCHE_BLANCHE_B': {
  sceneNumber: 'LIEN_MBB',
  chapter: 2,
  title: "Ce que le Blizzard garde",
  mood: 'tension',
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('marche_blanche_O')) {
      text += "Kaelen a pris ta main. Ses doigts sont brûlants contre ton givre. Il n’a rien dit. Il n’avait plus besoin.";
    } else if (gs.hasFlag('marche_blanche_E')) {
      text += "Alistair a frémi. L’insigne est resté froid. Mais sa main, elle, a répondu.";
    } else {
      text += "Fen s’est blotti plus fort. Le blizzard a décidé. Kaelen et Alistair n’ont pas bougé pour te convaincre du contraire.";
    }
    return text;
  },
  choices: [
    {
      key: 'NEXT',
      text: "Reprendre la marche.",
      effects: [{ type: "SET_FLAG", target: "lien_marche_blanche_vu" }],
      next: 'ACTE2_10_RAVIN'
    }
  ]
},

'LIEN_MARCHE_2': {
  sceneNumber: 'LIEN_M2',
  chapter: 2,
  title: "Neige qui ne tombe plus",
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chemin_enneige_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "La route vers les Hautes Terres n’est plus qu’un sillage de boue gelée. Le vent a cessé. Le silence est trop propre.\n\n";
    
    if (gs.hasFlag('avec_ombre')) {
      if (gs.hasFlag('O_distant_1') || gs.hasFlag('O_distant_2')) {
        text += "Kaelen marche trois pas derrière. Ses dagues sont rangées, mais la distance est une lame qu’il ne rengaine pas.\n\n";
      } else {
        text += "Kaelen est à ton épaule. L’odeur de cendre froide s’est installée comme une seconde peau. Il ne parle pas. Il n’a plus besoin.\n\n";
      }
      text += "Alistair ferme la marche. Il ne s’impose pas dans votre silence, mais son pas reste assez proche pour appartenir au même voyage.\n\n";
    } else if (gs.hasFlag('avec_eclaireur')) {
      if (gs.hasFlag('E_distant_1') || gs.hasFlag('E_distant_2')) {
        text += "Alistair a tendu sa cape entre deux pins morts. Une paroi de tissu et de silence.\n\n";
      } else {
        text += "Alistair marche à ton rythme. L’insigne est éteint. Il ne prie plus à voix haute.\n\n";
      }
      text += "Kaelen ouvre la route quelques mètres devant. Il prétend ne pas écouter. La régularité avec laquelle il ralentit prouve le contraire.\n\n";
    } else {
      text += "Fen est le seul souffle chaud contre ta gorge. Kaelen et Alistair sont dans le noir, à portée de voix, hors de portée d’ordre.\n\n";
    }
    
    if (gs.getGauge('instabilite') >= 15) {
      text += "Les veines de givre ont grimpé jusqu’à tes avant-bras. Tu les sens. Ils les voient.\n\n";
    }
    
    text += "Le silence n’est plus une absence. C’est une question que personne n’ose poser.";
    return text;
  },
  // V50.4.0 : la chute influence le contexte, pas la disponibilité romantique.
  // Si Kaelen et Alistair sont encore physiquement présents, les deux rapprochements restent proposés.
  choices: [
    {
      key: 'O_REPARER',
      condition: (gs) => companionPresentO(gs) && (gs.hasFlag('O_distant_1') || gs.hasFlag('O_distant_2')),
      text: "Ralentir jusqu’à ce qu’il te rattrape. « Marche avec moi, assassin. Ou reste derrière. Choisis. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 2 },
        { type: "REMOVE_FLAG", target: "O_distant_1" },
        { type: "REMOVE_FLAG", target: "O_distant_2" },
        { type: "SET_FLAG", target: "marche2_proche_O" }
      ],
      next: 'LIEN_MARCHE_2B'
    },
    {
      key: 'E_REPARER',
      condition: (gs) => companionPresentE(gs) && (gs.hasFlag('E_distant_1') || gs.hasFlag('E_distant_2')),
      text: "Défaire sa paroi de cape. « Je n’ai pas besoin de murailles. J’ai besoin que tu me regardes. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 2 },
        { type: "REMOVE_FLAG", target: "E_distant_1" },
        { type: "REMOVE_FLAG", target: "E_distant_2" },
        { type: "SET_FLAG", target: "marche2_proche_E" }
      ],
      next: 'LIEN_MARCHE_2B'
    },
    {
      key: 'SILENCE',
      text: "Ne rien dire. Laisser le silence faire le travail.",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "marche2_silence" }
      ],
      next: 'LIEN_MARCHE_2B'
    },
    {
      key: 'S_FROID',
      condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde') || gs.getGauge('instabilite') >= 20,
      text: "Rester seule. Fermer les yeux et laisser le froid du sol monter en toi comme une prière.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 3 },
        { type: "SET_FLAG", target: "marche2_solo" }
      ],
      next: 'LIEN_MARCHE_2B'
    }
  ]
},

'LIEN_MARCHE_2B': {
  sceneNumber: 'LIEN_M2B',
  chapter: 2,
  title: "Ce que le vent ne porte plus",
  mood: 'romance',
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('marche2_proche_O') || (gs.hasFlag('marche2_silence') && gs.hasFlag('avec_ombre'))) {
      text += "Kaelen n’a pas répondu. Mais sa main a effleuré la tienne une fraction de seconde trop longue.\n\n« Tu joues avec le feu, Reine, » murmure-t-il. « Et moi, je suis fait de cendres. »\n\nIl ne retire pas sa main.";
    } else if (gs.hasFlag('marche2_proche_E') || (gs.hasFlag('marche2_silence') && gs.hasFlag('avec_eclaireur'))) {
      text += "Alistair a frémi. L’insigne pulse une seule fois, puis s’éteint pour de bon.\n\n« Dans l’Ordre, on nous apprend que le toucher est une tentation, » dit-il très bas. « Ce soir… je ne sais plus quelle vertu défendre. »";
    } else {
      text += "Fen s’est blotti plus fort. Le monde continue de tourner autour de toi, même quand tu refuses de le regarder.";
    }
    return text;
  },
  choices: [
    {
      key: 'NEXT',
      text: "Laisser le silence sceller ce qui vient de se passer.",
      effects: [{ type: "SET_FLAG", target: "lien_marche2_vu" }],
      next: 'ACTE2_09_MARCHE_BLANCHE' // V50.5 : restaure la marche blanche avant la rivière
    }
  ]
},

// ==========================================
// FLASHBACK CROISÉ CENDRES / SOLEIL
// ==========================================

'LIEN_MARCHE_1': {
  sceneNumber: 'LIEN_M1',
  chapter: 1,
  title: "Cendres sous la Neige",
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Foret_pins_noirs_202606191344.jpeg",
  getDynamicNarrative: (gs) => {
    let text = `La lisière s’est refermée derrière vous. Le vent porte encore l’écho lointain d’une note trop pure pour être un oiseau. Vous avez fait halte dans une anfractuosité de basalte. Le feu est petit, volontairement.

`;

    const oPresent = companionPresentO(gs);
    const ePresent = companionPresentE(gs);

    if (oPresent && ePresent) {
      if (gs.hasFlag('avec_ombre')) {
        text += `Kaelen est resté naturellement plus près depuis la chute. L’odeur de cendre froide se mêle à celle de la résine. Il ne te regarde pas, mais tu sens qu’il inventorie chaque micro-geste.

Alistair monte la première garde à quelques mètres. Il vous laisse de l’espace sans quitter le groupe ; quand ton regard croise le sien, il ne détourne pas les yeux.

`;
      } else if (gs.hasFlag('avec_eclaireur')) {
        text += `Alistair a gardé auprès de toi cette proximité née de la chute. Sa cape repose encore sur tes épaules ; ses doigts ont tremblé quand ils ont effleuré les tiens, et il ne s’est pas excusé.

Kaelen s’est posté hors du cercle de lumière, assez loin pour ne pas interrompre, assez près pour intervenir avant qu’une branche ne craque deux fois. Quand tu tournes la tête vers lui, son attention est déjà sur toi.

`;
      } else {
        text += `Kaelen s’est installé à portée de voix, occupé à faire glisser une pierre sur le fil d’une dague qu’il n’avait pourtant pas besoin d’affûter.

Alistair a pris la garde de l’autre côté du feu. Sa cape pliée près de toi ressemble moins à une offrande qu’à une question laissée ouverte.

`;
      }

      text += `Aucun des deux n’est parti. Aucun choix n’est encore scellé. Le silence n’est plus une absence. C’est une direction à prendre.`;
    } else if (oPresent) {
      text += `Kaelen est trop près. L’odeur de cendre froide se mêle à celle de la résine. Il ne te regarde pas, mais tu sens qu’il inventorie chaque micro-geste.

Le silence n’est plus une absence. C’est une arme.`;
    } else if (ePresent) {
      text += `Alistair a disposé sa cape pour toi. Ses doigts ont tremblé quand ils ont effleuré les tiens. Il ne s’est pas excusé.

Le silence n’est plus une absence. C’est une prière qui attend une réponse.`;
    } else {
      text += `Le feu claque seul entre les pierres. Il ne reste que Fen, le vent et ce que tu refuses encore de nommer.

Le silence n’est plus une absence. C’est un choix.`;
    }

    return text;
  },
  choices: [
    {
      key: 'O_REPARER',
      condition: (gs) => companionPresentO(gs) && gs.hasFlag('O_distant_1'),
      text: "Rejoindre Kaelen. Contourner ses lames et t’asseoir à son épaule. « Le feu est plus chaud de ce côté. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "REMOVE_FLAG", target: "O_distant_1" },
        { type: "SET_FLAG", target: "marche1_proche_O" },
        { type: "SET_FLAG", target: "lisiere_orientation_O" },
        { type: "SET_FLAG", target: "bivouac_feu_O" }
      ],
      next: 'LIEN_MARCHE_1B'
    },
    {
      key: 'E_REPARER',
      condition: (gs) => companionPresentE(gs) && gs.hasFlag('E_distant_1'),
      text: "Rejoindre Alistair. Défaire sa paroi de cape et la lui rendre. « Je n’ai pas besoin de murailles. J’ai besoin de tes yeux. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "REMOVE_FLAG", target: "E_distant_1" },
        { type: "SET_FLAG", target: "marche1_proche_E" },
        { type: "SET_FLAG", target: "lisiere_orientation_E" },
        { type: "SET_FLAG", target: "bivouac_feu_E" }
      ],
      next: 'LIEN_MARCHE_1B'
    },
    {
      key: 'O_PROCHE',
      condition: (gs) => companionPresentO(gs) && !gs.hasFlag('O_distant_1'),
      text: "Se rapprocher de Kaelen. Laisser le silence s’installer entre vous. Trop près. Trop longtemps.",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "SET_FLAG", target: "marche1_silence_O" },
        { type: "SET_FLAG", target: "lisiere_orientation_O" },
        { type: "SET_FLAG", target: "bivouac_feu_O" }
      ],
      next: 'LIEN_MARCHE_1B'
    },
    {
      key: 'E_PROCHE',
      condition: (gs) => companionPresentE(gs) && !gs.hasFlag('E_distant_1'),
      text: "Se rapprocher d’Alistair. Poser ta main sur la sienne, juste un instant.",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "marche1_contact_E" },
        { type: "SET_FLAG", target: "lisiere_orientation_E" },
        { type: "SET_FLAG", target: "bivouac_feu_E" }
      ],
      next: 'LIEN_MARCHE_1B'
    },
    {
      key: 'OE_PROCHES',
      condition: (gs) => companionPresentO(gs) && companionPresentE(gs),
      text: "Ne choisir aucun côté du feu. T’asseoir entre Kaelen et Alistair et leur faire une place à tous les deux.",
      response: "Kaelen relève un sourcil. Alistair retient le réflexe de déplacer sa cape pour toi. Aucun des deux ne gagne le centre : tu l’as pris toi-même.",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "ADD_GAUGE", target: "tension_triangle", value: 1 },
        { type: "SET_FLAG", target: "marche1_deux" },
        { type: "SET_FLAG", target: "lisiere_orientation_DEUX" },
        { type: "SET_FLAG", target: "bivouac_feu_O" },
        { type: "SET_FLAG", target: "bivouac_feu_E" }
      ],
      next: 'LIEN_MARCHE_1B'
    },
    {
      key: 'S_FROID',
      text: "Rester seule. Fermer les yeux et laisser le froid du sol monter en toi comme une prière.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 3 },
        { type: "SET_FLAG", target: "marche1_solo" },
        { type: "SET_FLAG", target: "lisiere_orientation_SOLO" }
      ],
      next: 'LIEN_MARCHE_1B'
    }
  ]
},

'LIEN_MARCHE_1B': {
  sceneNumber: 'LIEN_M1B',
  chapter: 1,
  title: "Ce que le Feu ne Dit pas",
  mood: 'romance',
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('marche1_deux')) {
      text += "Tu t’es assise entre eux sans demander à aucun de céder sa place. Kaelen a déplacé sa dague vers l’extérieur du cercle. Alistair a plié sa cape au lieu de la poser sur tes épaules.\n\nLe feu vous éclaire tous les trois sans désigner de centre. Pour une fois, leur rivalité doit apprendre à contourner ton choix au lieu de le définir.";
    } else if (gs.hasFlag('marche1_proche_O') || gs.hasFlag('marche1_silence_O')) {
      text += "Kaelen n’a pas bougé quand tu t’es approchée. Mais sa respiration a changé. Plus lente. Plus contrôlée.\n\n« Tu joues avec le feu, Reine, » murmure-t-il enfin. « Et moi, je suis fait de cendres. »\n\nIl ne retire pas sa main quand tes doigts l’effleurent. C’est déjà trop.";
    } else if (gs.hasFlag('marche1_proche_E') || gs.hasFlag('marche1_contact_E')) {
      text += "Alistair a frémi sous ton contact. L’insigne pulse une seule fois, puis s’éteint.\n\n« Dans l’Ordre, on nous apprend que le toucher est une tentation, » dit-il très bas. « Ce soir… je ne sais plus quelle vertu défendre. »\n\nIl ne retire pas sa main non plus.";
    } else {
      text += "Fen s’est blotti plus fort. Le feu crépite. Kaelen et Alistair sont là, dans le noir. Tu n’as besoin d’aucun des deux pour sentir que le monde continue de tourner — et eux le savent.";
    }
    return text;
  },
  choices: [
    {
      key: 'NEXT',
      text: "Laisser le silence sceller ce qui vient de se passer.",
      effects: [{ type: "SET_FLAG", target: "lien_marche1_vu" }],
      next: 'ACTE1_08B_BIVOUAC_LISIERE'
    }
  ]
},

'ROMANCE_AGENCY_NUIT_AUBERGE': {
  sceneNumber:'V51.7.NIGHT.AGENCY',chapter:2,title:"Deux portes dans la même nuit",mood:'intimate',
  text:"La chambre s'est enfin tue. Kaelen est resté près de ses lames. Alistair près de la fenêtre.\n\nAucun des deux ne te réclame. C'est précisément pour cela que la décision doit venir de toi.\n\nTu peux accorder cette nuit à l'un, laisser l'autre moment pour plus tard, ou ne rien ouvrir du tout.",
  choices:[
    {key:'O',text:"Aller vers Kaelen.",intent:'confiance',target:'Kaelen',importance:'major',
     feedback:"Tu choisis Kaelen pour ce moment. Alistair n'est pas effacé : sa conversation est reportée.",
     effects:[{type:'SET_FLAG',target:'_romance_deferred_E'}],next:'LIEN_O_2_CONFIDENCE'},
    {key:'E',text:"Aller vers Alistair.",intent:'confiance',target:'Alistair',importance:'major',
     feedback:"Tu choisis Alistair pour ce moment. Kaelen n'est pas effacé : sa conversation est reportée.",
     effects:[{type:'SET_FLAG',target:'_romance_deferred_O'}],next:'LIEN_E_2_CONFIDENCE'},
    {key:'NONE',text:"Ne rejoindre personne. Garder la nuit pour toi.",intent:'liberte',target:'Elenya',importance:'significant',
     feedback:"Tu refuses que l'urgence du moment devienne une obligation. Les deux opportunités restent possibles plus tard.",
     effects:[{type:'SET_FLAG',target:'_romance_deferred_O'},{type:'SET_FLAG',target:'_romance_deferred_E'},{type:'SET_FLAG',target:'_romance_beat_recent'}],next:'ACTE2_06_NUIT_AUBERGE'}
  ]
},

'ROMANCE_AGENCY_MATIN_AUBERGE': {
  sceneNumber:'V51.7.MORNING.AGENCY',chapter:2,title:"À qui donner le matin",mood:'intimate',
  text:"Le jour blanchit les vitres. Kaelen et Alistair sont assez proches pour que tu sentes les deux silences — et assez loin pour qu'aucun ne puisse prétendre que ton regard lui appartient.\n\nSi un moment doit s'ouvrir maintenant, c'est toi qui choisis lequel.",
  choices:[
    {key:'O',text:"Chercher Kaelen.",intent:'confiance',target:'Kaelen',importance:'major',
     feedback:"Kaelen reçoit ce moment. Celui d'Alistair est reporté, pas annulé.",
     effects:[{type:'SET_FLAG',target:'_romance_deferred_E'}],next:'R_O_1'},
    {key:'E',text:"Chercher Alistair.",intent:'confiance',target:'Alistair',importance:'major',
     feedback:"Alistair reçoit ce moment. Celui de Kaelen est reporté, pas annulé.",
     effects:[{type:'SET_FLAG',target:'_romance_deferred_O'}],next:'R_E_1'},
    {key:'BOTH',text:"Rester dans l'espace commun. Ne privilégier personne ce matin.",intent:'liberte',target:'Kaelen & Alistair',importance:'significant',
     feedback:"Tu ne choisis aucun tête-à-tête. Les deux possibilités restent vivantes pour plus tard.",
     effects:[{type:'SET_FLAG',target:'_romance_deferred_O'},{type:'SET_FLAG',target:'_romance_deferred_E'},{type:'SET_FLAG',target:'_romance_beat_recent'}],next:'ACTE2_08_MATIN_AUBERGE'}
  ]
},

'ROMANCE_AGENCY_VILLAGE': {
  sceneNumber:'V51.7.VILLAGE.AGENCY',chapter:3,title:"Une seule conversation à la fois",mood:'tension',
  text:"Le village bruisse derrière vous. Kaelen a quelque chose à dire. Alistair aussi.\n\nLes deux conversations sont trop importantes pour être empilées comme des tâches dans un journal. Tu refuses que l'ordre des événements décide à ta place.",
  choices:[
    {key:'O',text:"« Kaelen. Toi d'abord. »",intent:'confiance',target:'Kaelen',importance:'major',
     feedback:"Tu choisis d'affronter la conversation de Kaelen maintenant. Celle d'Alistair attendra un lieu où elle pourra respirer.",
     effects:[{type:'SET_FLAG',target:'_romance_deferred_E'},{type:'PUSH_RETURN',target:'ACTE3_09_VILLAGE_CACHE'}],next:'JOUTE_O_2'},
    {key:'E',text:"« Alistair. Viens. »",intent:'confiance',target:'Alistair',importance:'major',
     feedback:"Tu choisis d'affronter la conversation d'Alistair maintenant. Celle de Kaelen attendra un lieu où elle pourra respirer.",
     effects:[{type:'SET_FLAG',target:'_romance_deferred_O'},{type:'PUSH_RETURN',target:'ACTE3_09_VILLAGE_CACHE'}],next:'JOUTE_E_2'},
    {key:'NONE',text:"« Pas ici. Pas maintenant. »",intent:'liberte',target:'Kaelen & Alistair',importance:'significant',
     feedback:"Tu reportes les deux conversations plutôt que de les laisser se dévorer l'une l'autre.",
     effects:[{type:'SET_FLAG',target:'_romance_deferred_O'},{type:'SET_FLAG',target:'_romance_deferred_E'},{type:'SET_FLAG',target:'_romance_beat_recent'}],next:'ACTE3_09_VILLAGE_CACHE'}
  ]
},

'ROMANCE_DEFERRED_KAELEN': {
  onEnter:(state)=>{
    if(state&&Array.isArray(state.flags)){
      if(!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');
      state.flags=state.flags.filter(f=>f!=='_romance_deferred_O');
    }
  },
  sceneNumber:'V51.7.DEFER.O',chapter:3,title:"Ce qui n'a pas été perdu",mood:'intimate',
  getDynamicNarrative:(gs)=>{
    let t="Kaelen comprend avant que tu parles. « Ah. La conversation qu'on n'a pas eue. »\\n\\nIl pose sa dague à plat, hors de portée de sa main. Un geste assez rare pour valoir une phrase.\\n\\n";
    if(!gs.hasFlag('_lien_O_2_vu')) {
      t+="Ce qui avait été repoussé n'était pas encore une déclaration. C'était plus ancien : la première fois où il aurait pu te montrer ce qu'il cache derrière ses tarifs.\\n\\n« Tu voulais du temps. Tu en as eu. Moi aussi. »";
    } else if(!gs.hasFlag('_done_R_O_1')) {
      t+="La porte qu'il avait laissée ouverte n'a jamais été refermée. Il ne te rappelle pas la dette du moment manqué ; il se contente de se placer assez près pour que tu puisses choisir la distance.\\n\\n« Toujours pas de clause automatique. »";
    } else if(!gs.hasFlag('_joute_O2_vu')) {
      t+="La conversation du village est restée entre vous comme une lame non tirée. Kaelen la sort enfin — métaphoriquement, pour une fois.\\n\\n« On n'a pas réglé le dernier tarif. Je préfère tard à jamais. »";
    } else {
      t+="Vous avez déjà franchi les grands seuils. Ce retour n'est donc pas une répétition : seulement la preuve que « plus tard » n'était pas un autre mot pour « jamais ».";
    }
    return t+"\\n\\nIl attend. Sans avancer.";
  },
  choices:[
    {key:'CONF_TRUST',condition:(gs)=>!gs.hasFlag('_lien_O_2_vu'),text:"« Alors montre-moi quelque chose que tu ne peux pas facturer. »",intent:'confiance',target:'Kaelen',importance:'major',
     response:"Kaelen retire lentement une vieille pièce de sa poche, usée jusqu'à n'avoir presque plus de visage. « Premier paiement que j'ai refusé. » Il la dépose dans ta paume puis referme tes doigts dessus, sans la reprendre.",
     effects:[{type:'SET_FLAG',target:'_lien_O_2_vu'},{type:'SET_FLAG',target:'_lien_O_2_doux'},{type:'ADD_GAUGE',target:'lien_O',value:1},{type:'SET_FLAG',target:'romance_deferred_O_payoff'}],next:'RETURN'},
    {key:'R_ROMANCE',condition:(gs)=>gs.hasFlag('_lien_O_2_vu')&&!gs.hasFlag('_done_R_O_1'),text:"Réduire la distance. « Plus tard n'était pas jamais. »",intent:'romance',target:'Kaelen',importance:'major',
     response:"Kaelen ne prend rien. Il attend que ton front touche le sien avant de fermer les yeux.",
     effects:[{type:'SET_FLAG',target:'_done_R_O_1'},{type:'SET_FLAG',target:'_romance_O_deepened'},{type:'SET_FLAG',target:'focus_romantique_O'},{type:'ADD_GAUGE',target:'lien_O',value:2},{type:'SET_FLAG',target:'romance_deferred_O_payoff'}],next:'RETURN'},
    {key:'R_TENDER',condition:(gs)=>gs.hasFlag('_lien_O_2_vu')&&!gs.hasFlag('_done_R_O_1'),text:"Rester épaule contre épaule, sans transformer l'instant en promesse.",intent:'tendresse',target:'Kaelen',importance:'significant',
     effects:[{type:'SET_FLAG',target:'_done_R_O_1'},{type:'SET_FLAG',target:'kaelen_limite_respectee'},{type:'ADD_GAUGE',target:'lien_O',value:1},{type:'ADD_GAUGE',target:'volonte',value:1},{type:'SET_FLAG',target:'romance_deferred_O_payoff'}],next:'RETURN'},
    {key:'J_FREE',condition:(gs)=>gs.hasFlag('_done_R_O_1')&&!gs.hasFlag('_joute_O2_vu'),text:"« Tu peux rester. Mais aucune dette ne t'achète une place près de moi. »",intent:'liberte',target:'Kaelen',importance:'major',
     response:"Kaelen regarde la dague posée loin de sa main. « Enfin un contrat que je peux signer. » Il ne demande rien en échange.",
     effects:[{type:'SET_FLAG',target:'_joute_O2_vu'},{type:'SET_FLAG',target:'kaelen_amour_libre'},{type:'ADD_GAUGE',target:'lien_O',value:2},{type:'ADD_GAUGE',target:'volonte',value:2},{type:'ADD_GAUGE',target:'possession',value:-1},{type:'SET_FLAG',target:'romance_deferred_O_payoff'}],next:'RETURN'},
    {key:'J_DISTANCE',condition:(gs)=>gs.hasFlag('_done_R_O_1')&&!gs.hasFlag('_joute_O2_vu'),text:"« Le tarif est simple : tu ne me possèdes pas. »",intent:'distance',target:'Kaelen',importance:'major',
     response:"Son sourire disparaît. Puis revient autrement. « Reçu. » Un mot net, sans négociation.",
     effects:[{type:'SET_FLAG',target:'_joute_O2_vu'},{type:'ADD_GAUGE',target:'volonte',value:2},{type:'SET_FLAG',target:'joute_froide_O'},{type:'SET_FLAG',target:'romance_deferred_O_payoff'}],next:'RETURN'},
    {key:'ROMANCE',condition:(gs)=>gs.hasFlag('_joute_O2_vu'),text:"Réduire la distance sans rouvrir les anciens comptes.",intent:'romance',target:'Kaelen',importance:'major',
     effects:[{type:'ADD_GAUGE',target:'lien_O',value:2},{type:'SET_FLAG',target:'focus_romantique_O'},{type:'SET_FLAG',target:'romance_deferred_O_payoff'}],next:'RETURN'},
    {key:'BACK',condition:(gs)=>gs.hasFlag('_joute_O2_vu'),text:"« Je voulais seulement que tu saches que je n'avais pas oublié. »",intent:'distance',target:'Kaelen',importance:'significant',
     effects:[{type:'SET_FLAG',target:'romance_deferred_O_closed'}],next:'RETURN'}
  ]
},

'ROMANCE_DEFERRED_ALISTAIR': {
  onEnter:(state)=>{
    if(state&&Array.isArray(state.flags)){
      if(!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');
      state.flags=state.flags.filter(f=>f!=='_romance_deferred_E');
    }
  },
  sceneNumber:'V51.7.DEFER.E',chapter:3,title:"La porte restée ouverte",mood:'intimate',
  getDynamicNarrative:(gs)=>{
    let t="Alistair te voit revenir vers lui. Sa main va aussitôt à son insigne — puis s'arrête avant de le toucher.\\n\\n";
    if(!gs.hasFlag('_lien_E_2_vu')) {
      t+="La confidence repoussée est encore là, entière. Il sort le sceau de sa poche, le pose face contre pierre et attend que sa lumière s'éteigne.\\n\\n« Je n'ai pas trouvé de meilleure réponse depuis. Seulement moins de certitudes. »";
    } else if(!gs.hasFlag('_done_R_E_1')) {
      t+="Il ouvre une porte voisine par réflexe, puis laisse sa main sur le battant au lieu de la refermer. Le geste vous ramène tous les deux au matin qui n'a pas eu lieu.\\n\\nAucun discours. La porte reste ouverte.";
    } else if(!gs.hasFlag('_joute_E2_vu')) {
      t+="L'insigne est dans sa paume. Le chemin derrière lui aussi. Il les regarde l'un puis l'autre et pose finalement le métal sur une pierre entre vous.\\n\\n« Je n'ai plus envie d'appeler ça une mission. »";
    } else {
      t+="Le dernier seuil a déjà été nommé. Cette fois il ne reste rien à résoudre, seulement une présence à accepter ou non.";
    }
    return t+"\\n\\nSes mains demeurent ouvertes.";
  },
  choices:[
    {key:'CONF_DOUX',condition:(gs)=>!gs.hasFlag('_lien_E_2_vu'),text:"Poser deux doigts sur le sceau éteint, sans tenter de le rallumer.",intent:'tendresse',target:'Alistair',importance:'major',
     response:"Alistair couvre le sceau de sa paume. Pas pour le cacher : pour sentir qu'il est froid. Il hoche une fois la tête.",
     effects:[{type:'SET_FLAG',target:'_lien_E_2_vu'},{type:'SET_FLAG',target:'_lien_E_2_doux'},{type:'ADD_GAUGE',target:'lien_E',value:1},{type:'SET_FLAG',target:'romance_deferred_E_payoff'}],next:'RETURN'},
    {key:'CONF_DUR',condition:(gs)=>!gs.hasFlag('_lien_E_2_vu'),text:"« Ton Ordre t'a menti. Mais je ne serai pas ta nouvelle foi. »",intent:'liberte',target:'Alistair',importance:'major',
     response:"Sa main se crispe sur le bord de la table. Il ne proteste pas. Il retourne seulement l'insigne face contre bois.",
     effects:[{type:'SET_FLAG',target:'_lien_E_2_vu'},{type:'SET_FLAG',target:'_lien_E_2_dur'},{type:'ADD_GAUGE',target:'volonte',value:1},{type:'SET_FLAG',target:'romance_deferred_E_payoff'}],next:'RETURN'},
    {key:'R_ROMANCE',condition:(gs)=>gs.hasFlag('_lien_E_2_vu')&&!gs.hasFlag('_done_R_E_1'),text:"Prendre sa main et la guider jusqu'à ta joue.",intent:'romance',target:'Alistair',importance:'major',
     response:"Ses doigts commencent à se refermer puis s'arrêtent. Il regarde la porte ouverte derrière toi et laisse sa paume souple contre ta peau.",
     effects:[{type:'SET_FLAG',target:'_done_R_E_1'},{type:'SET_FLAG',target:'_romance_E_deepened'},{type:'SET_FLAG',target:'alistair_porte_ouverte'},{type:'SET_FLAG',target:'focus_romantique_E'},{type:'ADD_GAUGE',target:'lien_E',value:2},{type:'ADD_GAUGE',target:'volonte',value:1},{type:'SET_FLAG',target:'romance_deferred_E_payoff'}],next:'RETURN'},
    {key:'R_NOTYET',condition:(gs)=>gs.hasFlag('_lien_E_2_vu')&&!gs.hasFlag('_done_R_E_1'),text:"« Pas encore. Laisse seulement la porte ouverte. »",intent:'liberte',target:'Alistair',importance:'significant',
     response:"Alistair retire sa main du battant. La porte demeure exactement comme elle est.",
     effects:[{type:'SET_FLAG',target:'_done_R_E_1'},{type:'SET_FLAG',target:'alistair_limite_respectee'},{type:'ADD_GAUGE',target:'lien_E',value:1},{type:'ADD_GAUGE',target:'volonte',value:2},{type:'SET_FLAG',target:'romance_deferred_E_payoff'}],next:'RETURN'},
    {key:'J_FREE',condition:(gs)=>gs.hasFlag('_done_R_E_1')&&!gs.hasFlag('_joute_E2_vu'),text:"« Reste si tu le choisis. Mais ne fais pas de moi ta nouvelle foi. »",intent:'liberte',target:'Alistair',importance:'major',
     response:"Alistair lève l'insigne. Ses lèvres bougent par habitude ; aucune prière ne vient. Il l'enveloppe dans un morceau de tissu et le range au fond de sa sacoche.",
     effects:[{type:'SET_FLAG',target:'_joute_E2_vu'},{type:'SET_FLAG',target:'alistair_foi_libre'},{type:'SET_FLAG',target:'focus_romantique_E'},{type:'ADD_GAUGE',target:'lien_E',value:2},{type:'ADD_GAUGE',target:'volonte',value:2},{type:'ADD_GAUGE',target:'possession',value:-2},{type:'SET_FLAG',target:'romance_deferred_E_payoff'}],next:'RETURN'},
    {key:'J_LEAVE',condition:(gs)=>gs.hasFlag('_done_R_E_1')&&!gs.hasFlag('_joute_E2_vu'),text:"« Tu peux partir. Je ne te retiendrai pas. »",intent:'liberte',target:'Alistair',importance:'major',
     response:"Il regarde le chemin du retour, ramasse son insigne, puis le glisse dans sa poche au lieu de le remettre. Quand il revient vers toi, il n'explique pas pourquoi.",
     effects:[{type:'SET_FLAG',target:'_joute_E2_vu'},{type:'SET_FLAG',target:'alistair_libre_choisir'},{type:'ADD_GAUGE',target:'volonte',value:2},{type:'ADD_GAUGE',target:'lien_E',value:1},{type:'SET_FLAG',target:'romance_deferred_E_payoff'}],next:'RETURN'},
    {key:'ROMANCE',condition:(gs)=>gs.hasFlag('_joute_E2_vu'),text:"Prendre sa main. « Plus tard n'était pas jamais. »",intent:'romance',target:'Alistair',importance:'major',
     effects:[{type:'ADD_GAUGE',target:'lien_E',value:2},{type:'SET_FLAG',target:'focus_romantique_E'},{type:'SET_FLAG',target:'romance_deferred_E_payoff'}],next:'RETURN'},
    {key:'BACK',condition:(gs)=>gs.hasFlag('_joute_E2_vu'),text:"« Je voulais seulement que l'attente ne ressemble pas à un rejet. »",intent:'distance',target:'Alistair',importance:'significant',
     effects:[{type:'SET_FLAG',target:'romance_deferred_E_closed'}],next:'RETURN'}
  ]
},

'R_O_1': {
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');},
  sceneNumber: 'R_O_1',
  chapter: 2,
  title: "La Porte qu'il Laisse Ouverte",
  mood: 'intimate',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Bivouac_nuit_kaelen.jpeg",
  condition: (gs) => relationAvailableO(gs),
  getDynamicNarrative: (gs) => {
    let text = "La mansarde dort. Kaelen, non. Il est près de la lucarne, une dague démontée sur les genoux, mais ses mains ont cessé de travailler depuis que tu es entrée.\n\n";
    if (gs.hasFlag('kaelen_retrouvailles_choisi')) {
      text += "« Tu as déjà fait un détour pour venir me chercher une fois. » Son regard se pose sur toi. « Je n'ai pas oublié. »\n\n";
    } else if (gs.hasFlag('focus_romantique_O')) {
      text += "Il a remarqué les derniers pas que tu as faits vers lui. Évidemment. Kaelen remarque tout ce qui pourrait devenir une dette — surtout ce qu'il espère ne jamais avoir à réclamer.\n\n";
    }
    text += "« J'ai passé ma vie à garder une sortie. Une fenêtre. Une lame. Un nom qui n'était pas le mien. » Il remonte la dague, puis la pose hors de portée. Volontairement. « Avec toi, je vérifie encore les portes. Seulement, je ne suis plus certain de vouloir les prendre. »\n\n";
    text += "Il se lève et vient jusqu'à toi. Assez près pour que sa chaleur contredise le froid de la chambre. Pas assez pour te toucher.\n\n";
    text += "« Voilà le nouveau tarif, Reine : je ne prends rien que tu ne me donnes. »\n\n";
    text += "Sa main se lève, puis s'arrête entre vous, paume ouverte. Pour un homme qui a toujours vécu en saisissant avant qu'on lui retire, attendre ressemble presque à une confession.";
    if (gs.hasFlag('alistair_sait_kaelen_compte')) {
      text += "\n\nIl sait qu'Alistair existe dans cette histoire. Il ne prononce pas son nom. La retenue est plus tranchante qu'une scène de jalousie.";
    }
    return text;
  },
  choices: [
    {
      key: 'O_TOUCH',
      text: "Prendre sa main. « Alors ne prends rien. Reste seulement. »",
      response: "Les doigts de Kaelen se referment sur les tiens seulement après les tiens sur les siens. « Rester, je peux essayer. » Son pouce effleure ta peau. « Le plus dur sera de ne pas transformer ça en quelque chose qu’on peut perdre. »",
      effects: [
        { type: "SET_FLAG", target: "_romance_O_deepened" },
        { type: "SET_FLAG", target: "_done_R_O_1" },
        { type: "SET_FLAG", target: "kaelen_attend_permission" },
        { type: "SET_FLAG", target: "focus_romantique_O" },
        { type: "ADD_GAUGE", target: "lien_O", value: 2 },
        { type: "ADD_GAUGE", target: "volonte", value: 1 },
        { type: "ADD_GAUGE", target: "possession", value: -1 }
      ],
      next: 'ACTE2_08_MATIN_AUBERGE'
    },
    {
      key: 'O_KISS',
      text: "Réduire toi-même la dernière distance. Le reste appartient à la nuit.",
      response: "Kaelen te laisse franchir la dernière distance. Il ne saisit rien, ne prend pas l’avantage. Quand il répond enfin au baiser, c’est avec une retenue presque violente — comme si attendre ta décision lui coûtait plus que n’importe quel combat.",
      effects: [
        { type: "SET_FLAG", target: "_romance_O_deepened" },
        { type: "SET_FLAG", target: "_done_R_O_1" },
        { type: "SET_FLAG", target: "intimite_O_suggeree" },
        { type: "SET_FLAG", target: "focus_romantique_O" },
        { type: "ADD_GAUGE", target: "lien_O", value: 2 }
      ],
      next: 'ACTE2_08_MATIN_AUBERGE'
    },
    {
      key: 'O_NOT_YET',
      text: "Effleurer sa paume puis la laisser retomber. « Pas ce soir. »",
      response: "Kaelen baisse les yeux vers sa main vide. Puis il la remet dans sa poche. « Pas ce soir. » Il répète tes mots sans ironie. « Ça ressemble beaucoup à une porte. J’essaierai de ne pas la forcer. »",
      effects: [
        { type: "SET_FLAG", target: "_done_R_O_1" },
        { type: "SET_FLAG", target: "kaelen_limite_respectee" },
        { type: "SET_FLAG", target: "focus_romantique_O" },
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "ADD_GAUGE", target: "volonte", value: 2 }
      ],
      next: 'ACTE2_08_MATIN_AUBERGE'
    }
  ]
},

'R_E_1': {
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');},
  sceneNumber: 'R_E_1',
  chapter: 2,
  title: "La Porte Restée Ouverte",
  mood: 'intimate',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Bivouac_aube_alistair.jpeg",
  condition: (gs) => relationAvailableE(gs),
  getDynamicNarrative: (gs) => {
    let text = "L'aube blanchit les volets. Alistair a retiré son armure, mais pas son insigne. Il le tient dans sa paume comme on tient une question dont on connaît enfin le prix.\n\n";
    if (gs.hasFlag('alistair_retrouvailles_choisi')) {
      text += "« Tu m'as dit de rester sans serment. » Il laisse échapper un souffle presque amusé. « Je découvre que c'est beaucoup plus difficile que d'obéir. »\n\n";
    } else if (gs.hasFlag('focus_romantique_E')) {
      text += "Depuis que tu as choisi de revenir vers lui, sa politesse est devenue moins sûre. Il ne sait plus très bien où finit le devoir et où commence l'homme.\n\n";
    }
    text += "Il ferme la porte de la chambre par réflexe. Le déclic le fait se figer.\n\n";
    text += "Son regard va de la serrure à toi. Puis il rouvre la porte.\n\n";
    text += "Il regarde encore la serrure. Son pouce trouve machinalement le bord de son insigne, comme s'il cherchait un ordre gravé dans le métal. Puis il détache l'insigne et le pose à côté de la clé.\n\n";
    text += "« Je ferme les portes sans y penser. » C'est tout ce qu'il dit d'abord. Sa main se lève vers toi, s'arrête à mi-chemin, puis retombe.\n\n";
    text += "Il recule d'un pas et laisse entre vous la porte ouverte, la clé sur la table et assez d'espace pour que ton prochain geste n'appartienne qu'à toi.";
    if (gs.hasFlag('kaelen_fresque_confiee') || gs.hasFlag('focus_romantique_O')) {
      text += "\n\nIl sait que Kaelen compte peut-être aussi. Une ombre traverse son visage, contenue aussitôt. Il ne te demande pas de choisir pour apaiser sa peur.";
    }
    return text;
  },
  choices: [
    {
      key: 'E_TOUCH',
      text: "Prendre sa main et la poser contre ta joue. « Apprends à rester sans clé. »",
      response: "Alistair tremble lorsque sa paume touche ta joue. Ses doigts commencent à se refermer, puis s'immobilisent. Il jette un regard à la clé restée sur la table et ouvre de nouveau la main. « D'accord. » Un seul mot, sans serment derrière.",
      effects: [
        { type: "SET_FLAG", target: "_romance_E_deepened" },
        { type: "SET_FLAG", target: "_done_R_E_1" },
        { type: "SET_FLAG", target: "alistair_porte_ouverte" },
        { type: "SET_FLAG", target: "focus_romantique_E" },
        { type: "ADD_GAUGE", target: "lien_E", value: 2 },
        { type: "ADD_GAUGE", target: "volonte", value: 1 },
        { type: "ADD_GAUGE", target: "possession", value: -1 }
      ],
      next: 'ACTE2_08_MATIN_AUBERGE'
    },
    {
      key: 'E_KISS',
      text: "L'embrasser avant qu'il puisse transformer l'instant en prière. La porte reste ouverte.",
      response: "Le premier souffle d’Alistair ressemble effectivement à une prière. Il l’avale avant qu’elle ne devienne un mot et répond au baiser comme un homme qui accepte enfin de ne pas bénir ce qu’il désire.",
      effects: [
        { type: "SET_FLAG", target: "_romance_E_deepened" },
        { type: "SET_FLAG", target: "_done_R_E_1" },
        { type: "SET_FLAG", target: "intimite_E_suggeree" },
        { type: "SET_FLAG", target: "focus_romantique_E" },
        { type: "ADD_GAUGE", target: "lien_E", value: 2 }
      ],
      next: 'ACTE2_08_MATIN_AUBERGE'
    },
    {
      key: 'E_NOT_YET',
      text: "« Pas encore. Mais ne referme pas la porte. »",
      response: "Alistair regarde la porte ouverte derrière lui. « Elle restera ouverte. » Il sourit à peine. « Même si tu ne reviens pas ce soir. Même si tu ne reviens jamais pour ça. »",
      effects: [
        { type: "SET_FLAG", target: "_done_R_E_1" },
        { type: "SET_FLAG", target: "alistair_limite_respectee" },
        { type: "SET_FLAG", target: "focus_romantique_E" },
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "ADD_GAUGE", target: "volonte", value: 2 }
      ],
      next: 'ACTE2_08_MATIN_AUBERGE'
    }
  ]
},

// V40.3.7 LEGACY — plus interceptée dans une nouvelle partie.

'LIEN_O_2_CONFIDENCE': {
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');},
  sceneNumber: 'L2_O',
  chapter: 2,
  title: "Ce que les Lames Cachent",
  mood: 'intimate',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chambre_exigu%C3%AB_202606191345.jpeg",
  condition: (gs) => relationAvailableO(gs),
  getDynamicNarrative: (gs) => {
    let text = "Alistair a quitté la mansarde pour prier en bas. Kaelen n’a pas bougé : il a calculé l’espace, les issues, le temps avant le retour du prêtre.\n\n";
    text += "« Cette lame, » dit-il sans te regarder, doigts sur une garde ébréchée, « elle a tué mon premier maître. J’avais douze ans. Il m’avait acheté pour les écuries. »\n\n";
    text += "Il pose ça entre vous comme une pièce sur une table — assez pour prouver qu’il n’est pas né dans la soie, pas assez pour se livrer.\n\n";
    text += "« Les Confrères m’ont dit que j’avais du talent. Personne ne me l’avait dit avant. » Un rire sec. « Depuis, je vends ce talent au plus offrant. Ou au plus intéressant. »\n\n";
    text += "Il te regarde enfin. Pas de pitié demandée. « Ne me raconte pas ta vie. Je n’en ai pas besoin pour faire mon travail. Mais ne me mens pas sur les termes. Si tu me gardes, dis-moi pour quoi. L’utilité, je comprends. Le reste… » Il hésite une fraction. « Le reste, je le facture plus cher. »";
    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "« Je ne sais pas qui j’étais, Kaelen. Comment pourrais-je te mentir ? »", 
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 }, 
        { type: "SET_FLAG", target: "_lien_O_2_vu" },
        { type: "SET_FLAG", target: "_lien_O_2_ouvert" }
      ], 
      next: 'ACTE2_06_NUIT_AUBERGE' 
    },
    { 
      key: 'B', 
      text: "« Ta confidence ne m’achète rien. Garde tes secrets, je garde les miens. »", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 3 }, 
        { type: "SET_FLAG", target: "_lien_O_2_vu" },
        { type: "SET_FLAG", target: "_lien_O_2_ferme" }
      ], 
      next: 'ACTE2_06_NUIT_AUBERGE' 
    }
  ]
},

// V40.3.7 LEGACY — plus interceptée dans une nouvelle partie.

'LIEN_E_2_CONFIDENCE': {
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');},
  sceneNumber: 'L2_E',
  chapter: 2,
  title: "Le Sceau qui Tremble",
  mood: 'intimate',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Chambre_exigu%C3%AB_202606191345.jpeg",
  condition: (gs) => relationAvailableE(gs),
  getDynamicNarrative: (gs) => {
    let text = "Kaelen a quitté la mansarde. Tu es seule avec Alistair dans l’exiguïté des combles.\n\n";
    text += "Il tourne son insigne entre ses doigts. « Ma mère me l’a donné le jour où l’Ordre m’a pris. Elle ne pleurait pas. Elle disait que c’était un honneur. »\n\n";
    text += "« J’ai passé vingt ans à croire que cette lumière me guidait. »\n\n";
    text += "Il presse le pouce contre le sceau. D'ordinaire, le geste suffit à le rallumer. Cette fois la lumière vient, hésite, puis meurt. Il recommence. Rien.\n\n";
    text += "Alistair pourrait prier. Tu le vois prendre son souffle pour le faire. Il renonce et dépose l'insigne face contre bois.\n\n";
    text += "« La stèle n'a rien fait de spectaculaire. » Sa voix baisse. « Elle m'a seulement empêché de remettre le sceau du bon côté. »\n\n";
    text += "Sa main reste posée près de l'objet, sans le reprendre. Quand il te regarde enfin, il ne demande ni absolution ni réponse. Il laisse simplement l'insigne éteint entre vous.";
    return text;
  },
  choices: [
    { 
      key: 'A', 
      text: "« Ton Ordre t’a menti, Alistair. Mais ce n’est pas moi qui te sauverai. Relève-toi seul. »", 
      effects: [
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 3 }, 
        { type: "SET_FLAG", target: "_lien_E_2_vu" },
        { type: "SET_FLAG", target: "_lien_E_2_dur" }
      ], 
      next: 'ACTE2_06_NUIT_AUBERGE' 
    },
    { 
      key: 'B', 
      text: "Poser ta main sur son insigne éteint. « La lumière n’est pas dans cet objet. Elle est dans le choix que tu fais ce soir. »", 
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 }, 
        { type: "SET_FLAG", target: "_lien_E_2_vu" },
        { type: "SET_FLAG", target: "_lien_E_2_doux" }
      ], 
      next: 'ACTE2_06_NUIT_AUBERGE' 
    }
  ]
},

'LIEN_POMME': {
    sceneNumber: 'L_POMME',
    chapter: 2,
    title: "La Pomme et les Deux Mains",
    mood: 'romance',
    // Trigger lien_pomme contrôle l'accès (run classique: double lien ≥2)
    condition: (gs) => true,
    getDynamicNarrative: (gs) => {
      return "Un pommier tordu surplombe le sentier. Une pomme se détache, roule, s’arrête entre les bottes de Kaelen et d’Alistair.\n\n" + "Les deux se baissent en même temps. Leurs doigts se touchent sur la peau rouge.\n\n" + "Un silence. Trop long.\n\n" + "Kaelen retire sa main le premier, mâchoire serrée. Alistair garde la pomme, puis la tend à l’assassin sans un mot.\n\n" + "Kaelen la prend. Il ne la mange pas. Il la glisse dans sa poche.";
    },
    choices: [
      {
        key: 'A',
        text: "Ne rien dire. Continuer.",
        effects: [
          { type: "SET_FLAG", target: "pomme_ramassee" },
          { type: "ADD_GAUGE", target: "lien_O", value: 1 },
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "UNLOCK_ACHIEVEMENT", target: "ach_pomme" }
        ],
        next: 'RETURN'
      }
    ]
  },

'LIEN_FEU_PARTAGE': {
    sceneNumber: 'L_FEU',
    chapter: 2,
    title: "Le Même Feu",
    mood: 'intimate',
    condition: (gs) => gs.hasFlag('pomme_ramassee') || gs.hasFlag('kaelen_alistair_rapprochement'),
    getDynamicNarrative: (gs) => {
      return "Le feu de camp est trop petit pour trois. Tu t’éloignes volontairement « pour surveiller ».\n\n" + "Derrière toi, Kaelen et Alistair restent seuls face aux flammes.\n\n" + "Tu n’entends pas les mots. Seulement le silence qui change de densité — moins hostile, plus gêné, presque tiède.\n\n" + "Quand tu reviens, ils sont assis un peu trop près. Personne ne commente.";
    },
    choices: [
      {
        key: 'NEXT',
        text: "Faire comme si de rien n’était.",
        effects: [{ type: "SET_FLAG", target: "regard_partage_feu" }],
        next: 'RETURN'
      }
    ]
  },

'ACTE_DAGUE_GRAVURE': {
    sceneNumber: 'DAGUE_GRAV',
    chapter: 3,
    title: "Ce que la Lame Retient",
    mood: 'intimate',
    condition: (gs) => gs.hasFlag('dague_kaelen_prise') && !gs.hasFlag('dague_gravee'),
    getDynamicNarrative: (gs) => {
      return "Tu tournes la dague de Kaelen entre tes doigts. Le métal est froid, familier.\n\n" + "Sans vraiment y penser, tu gravues un signe minuscule près de la garde — un fragment de givre, à peine visible.\n\n" + "Tu ne le diras pas à voix haute. C’est une marque — quelque chose de toi sur ce qui fut à lui.";
    },
    choices: [
      {
        key: 'A',
        text: "Ranger la dague. Ne rien expliquer.",
        effects: [
          { type: "SET_FLAG", target: "dague_gravee" },
          { type: "UNLOCK_ACHIEVEMENT", target: "ach_dague_gravee" }
        ],
        next: 'RETURN'
      }
    ]
  },

'LIEN_NON_DIT': {
    sceneNumber: 'L_NONDIT',
    chapter: 2,
    title: "Ce qui ne se dit pas",
    mood: 'intimate',
    condition: (gs) => gs.hasFlag('pomme_ramassee') && !gs.hasFlag('silence_complice_auberge'),
    getDynamicNarrative: (gs) => {
      return "Plus tard, dans le silence de l’auberge, Kaelen et Alistair échangent un regard par-dessus ta tête.\n\n" + "Rien n’est dit. Une main est tendue un instant de trop près d’une autre. Puis le moment passe.\n\n" + "Tu fais semblant de ne pas avoir vu.";
    },
    choices: [
      {
        key: 'NEXT',
        text: "Laisser le silence s’installer.",
        effects: [
          { type: "SET_FLAG", target: "silence_complice_auberge" },
          { type: "SET_FLAG", target: "main_tendue_crevasse" }
        ],
        next: 'RETURN'
      }
    ]
  },

'JOUTE_O_1': {
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');},
    sceneNumber: 'JOUTE_O_1',
    chapter: 2,
    title: "Le Tarif et la Porte",
    mood: 'tension',
    condition: (gs) => relationAvailableO(gs),
    getDynamicNarrative: (gs) => {
      return "Kaelen s’adosse au mur de la mansarde, bras croisés. L’aube n’est pas encore levée.\n\n" +
        "« On va clarifier les termes, Reine. »\n\n" +
        "Il ne sort pas de dague. C’est pire.\n\n" +
        "« Je reste. Pour l’instant. Mais chaque jour que je passe à te suivre au lieu de prendre la porte, ça me coûte. »\n\n" +
        "Ses yeux ne quittent pas les tiens.\n\n" +
        "« Dis-moi ce que tu es prête à payer. Ou dis-moi de partir. Les deux me conviennent. L’entre-deux, non. »";
    },
    choices: [
      {
        key: 'A',
        intent: "liberte",
        target: "Kaelen",
        importance: "major",
        irreversible: false,
        text: "« Je ne paie rien. Tu restes parce que tu le veux. »",
        response: "Kaelen ne sourit pas. « Mauvaise négociatrice. » Puis, après un temps : « Bonne réponse. Si je reste, la dette sera à moi. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_O1_vu" },
          { type: "ADD_GAUGE", target: "lien_O", value: 1 },
          { type: "ADD_GAUGE", target: "volonte", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        intent: "possession",
        target: "Kaelen",
        importance: "significant",
        irreversible: false,
        text: "« Le tarif, c’est moi. Prends-le ou pars. »",
        response: "Son regard descend sur toi puis remonte, lentement. « Voilà un prix qui sait qu’il est dangereux. » Il ne te touche pas. « Je vais avoir besoin de lire les conditions. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_O1_vu" },
          { type: "ADD_GAUGE", target: "lien_O", value: 2 },
          { type: "ADD_GAUGE", target: "possession", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        intent: "liberte",
        target: "Kaelen",
        importance: "major",
        irreversible: false,
        text: "« La porte est là. Je ne te retiendrai pas. »",
        response: "Kaelen regarde réellement la porte. Une seconde. Deux. « C’est agaçant. » Il reste adossé au mur. « J’espérais que tu me donnerais une raison de prétendre que je n’avais pas choisi. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_O1_vu" },
          { type: "ADD_GAUGE", target: "affinite_ombre", value: 2 },
          { type: "ADD_GAUGE", target: "volonte", value: 1 }
        ],
        next: 'RETURN'
      },
      {
        key: 'D',
        intent: "tendresse",
        target: "Kaelen",
        importance: "significant",
        irreversible: false,
        text: "Rester silencieuse. Le laisser décider.",
        response: "Le silence s’étire. Kaelen finit par souffler du nez. « Très bien. Pas de contrat, alors. » Il ne bouge pas vers la porte. « Juste une mauvaise décision que je continuerai demain. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_O1_vu" },{ type: "ADD_GAUGE", target: "lien_O", value: 1 },
          { type: "SET_FLAG", target: "joute_silence_O" }
        ],
        next: 'RETURN'
      }
    ]
  },

'JOUTE_E_1': {
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');},
    sceneNumber: 'JOUTE_E_1',
    chapter: 2,
    title: "La Clé et le Seuil",
    mood: 'tension',
    condition: (gs) => relationAvailableE(gs),
    getDynamicNarrative: (gs) => {
      return "Alistair tient quelque chose dans sa main fermée. Une clé ancienne. Ou un sceau.\n\n" +
        "« L’Ordre m’a donné ça le jour où j’ai prêté serment. »\n\n" +
        "Il l’ouvre. La lumière en sort, faible.\n\n" +
        "« Je peux t’enfermer pour te protéger. Ou je peux te laisser la clé. »\n\n" +
        "Ses doigts tremblent à peine.\n\n" +
        "« Dis-moi laquelle des deux options te fait le plus peur. »";
    },
    choices: [
      {
        key: 'A',
        intent: "confiance",
        target: "Alistair",
        importance: "major",
        irreversible: false,
        text: "« Garde ta clé. Je ne suis la prisonnière de personne. »",
        response: "Alistair referme les doigts sur la clé. « Non. » Il la glisse ensuite dans ta direction, s'arrête, puis la ramène à lui. Le mouvement avorté dit davantage que son serment n'aurait su le faire.",
        effects: [
          { type: "SET_FLAG", target: "_joute_E1_vu" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        intent: 'distance',
        target: "Alistair",
        importance: "major",
        irreversible: false,
        text: "Prendre la clé. « Et si c’était toi qui avais besoin d’être enfermé ? »",
        response: "Un rire bref lui échappe — sans joie, mais sans défense non plus. « Alors ne me donne jamais la clé de ma propre cellule. » Son pouce frôle le métal dans ta paume. « Je pourrais appeler ça de la protection. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_E1_vu" },
          { type: "ADD_GAUGE", target: "lien_E", value: 2 },
          { type: "ADD_GAUGE", target: "possession", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        intent: "liberte",
        target: "Alistair",
        importance: "major",
        irreversible: false,
        text: "« Pose-la. On verra demain. »",
        response: "Il pose la clé entre vous. « Demain. » Pour une fois, le mot n’a rien d’un serment. Seulement la permission de ne pas décider ce soir.",
        effects: [
          { type: "SET_FLAG", target: "_joute_E1_vu" },
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "SET_FLAG", target: "ton_douceur" }
        ],
        next: 'RETURN'
      },
      {
        key: 'D',
        intent: "tendresse",
        target: "Alistair",
        importance: "significant",
        irreversible: false,
        text: "Fermer sa main sur la clé sans la prendre.",
        response: "Alistair baisse les yeux vers tes doigts sur les siens. « Tu me laisses le choix. » Il avale difficilement. « J’aimerais apprendre à faire la même chose pour toi. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_E1_vu" },
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "ADD_GAUGE", target: "volonte", value: 1 }
        ],
        next: 'RETURN'
      }
    ]
  },

'JOUTE_O_2': {
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');},
    sceneNumber: 'JOUTE_O_2',
    chapter: 3,
    title: "Le Dernier Tarif",
    mood: 'tension',
    condition: (gs) => relationAvailableO(gs),
    getDynamicNarrative: (gs) => {
      let text = "Le village caché est derrière vous. La crevasse s’ouvre devant.\n\n";
      text += "Kaelen s’arrête. Il ne sort pas de dague. Il n’en a plus besoin.\n\n";
      text += "« On approche de la fin, Reine. »\n\n";
      text += "Il te regarde droit. Plus de ricanement. Plus de clause.\n\n";
      text += "« Si je continue, je ne pourrai plus partir. Pas proprement. Pas sans laisser quelque chose derrière. »\n\n";
      text += "Un silence.\n\n";
      text += "« Dis-moi maintenant si tu veux que je reste jusqu’au bout. Ou dis-moi de prendre la porte pendant qu’il en reste une. »";
      if (gs.getGauge('possession') >= 10) {
        text += "\n\nTu sens déjà la réponse dans ta poitrine. Tu ne le laisseras pas partir.";
      }
      return text;
    },
    choices: [
      {
        key: 'A',
        intent: "romance",
        target: "Kaelen",
        importance: "major",
        irreversible: false,
        text: "« Reste. Jusqu’au bout. »",
        response: "Kaelen te regarde comme s’il cherchait la clause cachée. « Jusqu’au bout, alors. » Son sourire revient, mais il est plus sombre. « Fais juste attention, Reine. Les mots comme celui-là deviennent vite des chaînes quand on a peur de perdre. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_O2_vu" },
          { type: "ADD_GAUGE", target: "lien_O", value: 2 },
          { type: "ADD_GAUGE", target: "possession", value: 2 },
          { type: "SET_FLAG", target: "kaelen_jusqu_au_bout" }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        intent: "liberte",
        target: "Kaelen",
        importance: "major",
        irreversible: false,
        text: "« La porte est encore là. Prends-la si tu dois. »",
        response: "Kaelen tourne la tête vers le chemin derrière vous. « Tu es vraiment mauvaise en possession. » Il souffle un rire. « Tant mieux. Je reste aujourd’hui. Parce que la porte existe encore. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_O2_vu" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "ADD_GAUGE", target: "lien_O", value: 1 },
          { type: "SET_FLAG", target: "kaelen_libre_choisir" }
        ],
        next: 'RETURN'
      },
      {
        key: 'E',
        text: "« Reste si c’est ton choix. Demain, je te laisserai encore choisir. »",
        response: "Quelque chose se défait dans les épaules de Kaelen. « Demain aussi ? » Il hoche lentement la tête. « Ça, je peux le croire. Pas l’éternité. Demain. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_O2_vu" },
          { type: "SET_FLAG", target: "kaelen_amour_libre" },
          { type: "SET_FLAG", target: "focus_romantique_O" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "ADD_GAUGE", target: "lien_O", value: 2 },
          { type: "ADD_GAUGE", target: "possession", value: -2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        intent: "distance",
        target: "Kaelen",
        importance: "significant",
        irreversible: false,
        text: "« Je ne te demande rien. Je ne te retiens pas. »",
        response: "Le visage de Kaelen se ferme, puis s’apaise d’une manière plus difficile à lire. « Alors ne sois pas surprise si je reste quand même. » Il te dépasse de quelques pas. « Et ne prends pas ça pour un contrat. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_O2_vu" },
          { type: "ADD_GAUGE", target: "volonte", value: 3 },
          { type: "SET_FLAG", target: "joute_froide_O" }
        ],
        next: 'RETURN'
      },
      {
        key: 'D',
        intent: "tendresse",
        target: "Kaelen",
        importance: "significant",
        irreversible: false,
        text: "Rester silencieuse. Le laisser lire ta réponse dans tes yeux.",
        response: "Kaelen soutient ton regard jusqu’à ce que le silence devienne presque une réponse. « Mauvaise habitude », murmure-t-il. « Me laisser interpréter. » Pourtant il reste. Cette fois, il sait que l’incertitude fait partie du choix.",
        effects: [
          { type: "SET_FLAG", target: "_joute_O2_vu" },
          { type: "ADD_GAUGE", target: "lien_O", value: 1 },
          { type: "SET_FLAG", target: "possession_kaelen_sans_mots" }
        ],
        next: 'RETURN'
      }
    ]
  },

'JOUTE_E_2': {
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('_romance_beat_recent'))state.flags.push('_romance_beat_recent');},
    sceneNumber: 'JOUTE_E_2',
    chapter: 3,
    title: "Le Dernier Seuil",
    mood: 'tension',
    condition: (gs) => relationAvailableE(gs),
    getDynamicNarrative: (gs) => {
      let text = "Avant le village, Alistair s’arrête. L’insigne brille faiblement dans sa main.\n\n";
      text += "« Je peux encore faire demi-tour. » Il ne précise pas vers quoi. Il n'en a pas besoin.\n\n";
      text += "Il détache son insigne. Le chemin du retour est derrière lui ; toi, devant. Pendant plusieurs secondes il tient le métal exactement entre les deux directions.\n\n";
      text += "Puis il pose l'insigne sur une borne de pierre. Pas à tes pieds. Pas dans ta main.\n\n";
      text += "« Si je continue, je ne veux plus pouvoir appeler ça une mission. »\n\n";
      text += "Il fait un pas vers toi et s'arrête avant d'entrer dans ton espace. Le reste de la question demeure dans la distance qu'il te laisse.";
      if (gs.getGauge('possession') >= 10) {
        text += "\n\nTu sens déjà la cage se reformer. Plus douce. Plus définitive.";
      }
      return text;
    },
    choices: [
      {
        key: 'A',
        intent: "romance",
        target: "Alistair",
        importance: "major",
        irreversible: false,
        text: "« Reste. Même si ce n’est plus pour le monde. »",
        response: "Alistair regarde l'insigne abandonné sur la borne. Il ne le reprend pas. « Alors je reste. » Quand il vient à toi, il s'arrête encore à une respiration de distance, jusqu'à ce que ce soit toi qui la fermes.",
        effects: [
          { type: "SET_FLAG", target: "_joute_E2_vu" },
          { type: "ADD_GAUGE", target: "lien_E", value: 2 },
          { type: "ADD_GAUGE", target: "possession", value: 2 },
          { type: "SET_FLAG", target: "alistair_pour_toi" }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        intent: "liberte",
        target: "Alistair",
        importance: "major",
        irreversible: false,
        text: "« Tu peux partir. Je ne te retiendrai pas. »",
        response: "Alistair regarde longtemps le chemin du retour. Il ramasse son insigne — puis, au lieu de le remettre, le glisse dans sa poche. Quand il revient vers toi, il ne prononce aucune justification. Le choix se voit dans ses pas.",
        effects: [
          { type: "SET_FLAG", target: "_joute_E2_vu" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "SET_FLAG", target: "alistair_libre_choisir" }
        ],
        next: 'RETURN'
      },
      {
        key: 'E',
        intent: "liberte",
        target: "Alistair",
        importance: "major",
        irreversible: false,
        text: "« Reste si tu le choisis. Mais ne fais jamais de moi la nouvelle forme de ta foi. »",
        response: "Alistair lève son insigne à hauteur de ses yeux. Ses lèvres bougent par habitude, mais aucune prière ne vient. Il replie le symbole dans un morceau de tissu et le range au fond de sa sacoche. Puis il revient vers toi les mains vides.",
        effects: [
          { type: "SET_FLAG", target: "_joute_E2_vu" },
          { type: "SET_FLAG", target: "alistair_foi_libre" },
          { type: "SET_FLAG", target: "focus_romantique_E" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "ADD_GAUGE", target: "lien_E", value: 2 },
          { type: "ADD_GAUGE", target: "possession", value: -2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        intent: "distance",
        target: "Alistair",
        importance: "significant",
        irreversible: false,
        text: "« Je n’ai jamais demandé à être sauvée. »",
        response: "Alistair encaisse la phrase sans défense. « Je sais. » Cette fois il ne dit pas qu’il voulait seulement protéger. « J’ai longtemps utilisé le salut pour éviter de demander ce que tu voulais. Je ne peux pas effacer ça. »",
        effects: [
          { type: "SET_FLAG", target: "_joute_E2_vu" },
          { type: "ADD_GAUGE", target: "volonte", value: 3 },
          { type: "SET_FLAG", target: "joute_froide_E" }
        ],
        next: 'RETURN'
      },
      {
        key: 'D',
        intent: "tendresse",
        target: "Alistair",
        importance: "significant",
        irreversible: false,
        text: "Poser ta main sur la sienne. Sans un mot.",
        response: "Alistair retourne lentement sa main sous la tienne, paume ouverte. Il ne prononce aucun serment. Pour lui, le silence est peut-être l’effort le plus difficile de tous.",
        effects: [
          { type: "SET_FLAG", target: "_joute_E2_vu" },
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "SET_FLAG", target: "ton_douceur" }
        ],
        next: 'RETURN'
      }
    ]
  },
  };
}
