/** V52 — fragment DB ACTE1.
 * Généré depuis V51.7.6 sans réécriture narrative.
 * 26 scènes.
 */
function _dbActe1V52_() {
  return {
'ACTE1_01_REVEIL': {
  sceneNumber: 'ACTE1_01_REVEIL',
  chapter: 1,
  title: "Le Froid de l'Amnésie",
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/autel-reveil.webp",
  transitionGif: "https://raw.githubusercontent.com/Sunstrader/test-/main/reveil.mp4",
  sprite: "",
  voice: "",
  getDynamicNarrative: (gs) => {
    

    // Version normale
    return "Le monde naît dans un sifflement de givre — une odeur de métal froid et d'ozone brûlé, comme si l'air lui-même avait été forgé puis trempé trop vite. La conscience revient comme une aiguille glacée enfoncée sous les tempes, balayant tout arrière-plan. Pas de douleur, pas de passé, aucune attache : tu es un canevas blanc sur un autel de pierre noire, et la pierre se souvient de ton poids avant même que tu ne te souviennes de toi. Autour de toi, les vestiges d'une architecture cyclopéenne percent un ciel de cendre. La léthargie millénaire se fissure, tes muscles se délient sous une couche de glace en liquéfaction lente — un bruit de verre qui pleure. Un seul écho persiste au centre du néant, ancré comme une obsession, comme la dernière page d'un livre qu'on aurait brûlé : Elenya. Le sommeil des siècles prend fin, la lumière du jour exige ton éveil.\n\n";
  },
  choices: [
    
    {
      key: 'ADD',
      text: "Inspecter les rainures de l'autel avant de te lever.",
      effects: [{ type: "SET_FLAG", target: "reveil_autel_inspecte" }],
      next: 'ACTE1_01_REVEIL_DETAILS'
    },
    {
      key: 'A',
      text: "S'arracher à l'autel et marcher vers la lumière du jour.",
      effects: [{ type: "SET_FLAG", target: "reveil_autel_quitte" }],
      next: 'ACTE1_01_REVEIL_DETAILS'
    }
  ]
},

'ACTE1_01_REVEIL_DETAILS': {
    sceneNumber: '1.01.ADD',
    chapter: 1,
    title: "L'Empreinte de la Stèle",
    mood: 'exploration',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/autel-reveil.webp",
    getDynamicNarrative: (gs) => {
      let text = "";
      if (gs.hasFlag('reveil_autel_inspecte')) {
        text += "Tu prends le temps de suivre les rainures du bout des doigts. Le givre qui recouvrait l'autel conserve la forme exacte de ton corps ; sous ta paume, une onde résiduelle fait vibrer tes bras.\n\n";
      } else if (gs.hasFlag('reveil_autel_quitte')) {
        text += "Tu t'arraches à l'autel sans lui offrir une seconde inspection. Derrière toi, le givre conserve encore la forme exacte de ton corps, mais tu refuses de laisser la pierre décider de ton premier geste.\n\n";
      } else {
        text += "Le givre qui recouvrait l'autel conserve la forme exacte de ton corps. Tu ne sais pas encore si cette empreinte est un souvenir ou un avertissement.\n\n";
      }
      text += "La galerie s'ouvre devant toi. Tes pas résonnent sur le basalte. Les murs ne sont pas faits de pierre, mais de souvenirs vitrifiés.\n\n";
      text += "Deux odeurs se disputent l'air. L'ozone, à gauche — sec, électrique, comme un orage contenu. La cendre froide, à droite — ancienne, presque animale.";
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Suivre l'odeur de l'ozone.",
        effects: [
          { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 1 },
          { type: "SET_FLAG", target: "galeries_ozone" }
        ],
        next: 'ACTE1_02_RENCONTRE_1'
      },
      {
        key: 'B',
        text: "Suivre l'odeur de la cendre froide.",
        effects: [
          { type: "ADD_GAUGE", target: "affinite_ombre", value: 1 },
          { type: "SET_FLAG", target: "galeries_cendre" }
        ],
        next: 'ACTE1_02_RENCONTRE_1'
      }
    ]
  },

'ACTE1_02_RENCONTRE_1': {
  sceneNumber: 'ACTE1_02_RENCONTRE_1',
  chapter: 1,
  title: "Le Duel des Ombres",
  mood: 'tension',
  // L'image de fond fixe : la cour enneigée.
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/cour-duel.webp",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/kaelen.webp",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/alistair.webp",
  // V52.2.2 — ouverture HD 720p : remplace le GIF 480p tramé.
  transitionGif: "https://cdn.jsdelivr.net/gh/Sunstrader/acte-1@main/Two_warriors_freeze_mid-combat_202608131548.mp4",
  voice: "URL_VOIX_KAELEN",
  getDynamicNarrative: (gs) => {
    
    let lead = "";
    if (gs.hasFlag('galeries_ozone')) {
      lead = "L’ozone t’a guidée jusqu’ici : la lumière du prêtre frappe d’abord ton regard.\n\n";
    } else if (gs.hasFlag('galeries_cendre')) {
      lead = "La cendre froide t’a guidée jusqu’ici : c’est l’ombre aux dagues que tu entends avant de le voir.\n\n";
    }
    return lead + `Un choc métallique brise la pureté du silence. Au centre des ruines, deux lames s'affrontent à mort avec une haine chirurgicale. Une silhouette en armure noire mat virevolte, esquive une charge lourde et fait danser deux dagues effilées. L'homme s'arrête, un rictus cynique étirant ses traits, ses yeux fixés sur son adversaire en blanc. Sa voix s'élève, coupante et ironique, portée par le vent : « Tu t'épuises, prêtre. Ton bouclier prend l'eau et tes mains tremblent. Ton Ordre n'a aucun droit sur elle. Elle m'appartient déjà — j'ai été payé pour ça bien avant que tu n'apprennes son nom. »`;
  },
  choices: [
    // Première confrontation : aucun choix de retrouvailles ici.
    { 
      key: 'NEXT', 
      condition: (gs) => isClassicState(gs),
      text: "S'avancer au cœur du conflit...", 
      next: 'ACTE1_02_RENCONTRE_2' 
    }
  ]
},

'ACTE1_02_RENCONTRE_2': {
    sceneNumber: 'ACTE1_02_RENCONTRE_2',
    chapter: 1,
    title: "Le Duel des Ombres",
    mood: 'tension',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/cour-duel.webp",
    spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/kaelen.webp",
    spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/alistair.webp",
    // La vidéo vient d'être jouée à l'ouverture : ne pas la répéter ici.
    //spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_A_GENOUX_202606191737-removebg-preview.png",
    //spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/Alistair_combat_stance_radiant_s%E2%80%A6_202606231808.png",
    voice: "URL_VOIX_ALISTAIR",
    text: `L'homme au plastron ecclésiastique redresse sa haute stature, la mâchoire serrée par l'effort. Son sceptre lourd crépite d'une ferveur dorée qui fait fumer la poudreuse à ses pieds — une lumière trop propre pour ce lieu de cendre. « Arrière, démon. Les desseins de l'Ordre du Soleil sont absolus. Elle sera guidée et purifiée, ta lame ne la frôlera pas. »

À l'instant où ton ombre s'allonge entre eux, le combat s'éteint net. Leurs souffles se coupent, blancs dans l'air, comme deux prières interrompues. Les deux rivaux se figent, abasourdis par ton éveil. Tu n'es plus le mythe qu'ils traquent, tu es la souveraine de leur destin — et déjà, sans le savoir, la mesure de leur future geôle. Leurs regards convergent, suspendus à ton premier geste.`,
    choices: [
      { key: 'O', text: "Ancrer ton regard dans celui de l'Inconnu en noir. Son aura sentant la cendre froide résonne avec ton vide.", effects: [{ type: "ADD_GAUGE", target: "affinite_ombre", value: 3 }, { type: "SET_FLAG", target: "react_ombre" }], next: 'ACTE1_03_FAMILIER_1' },
      { key: 'E', text: "Te tourner vers l'homme en blanc. Son odeur d'ozone et sa magie rayonnante promettent un havre apaisant.", effects: [{ type: "ADD_GAUGE", target: "affinite_eclaireur", value: 3 }, { type: "SET_FLAG", target: "react_lumiere" }], next: 'ACTE1_03_FAMILIER_1' },
      { key: 'S', text: "Rejeter leur dualité. Geler le sol d'un geste sec. « Baissez vos armes. »", effects: [{ type: "ADD_GAUGE", target: "instabilite", value: 5 }, { type: "SET_FLAG", target: "react_givre" }], next: 'ACTE1_03_FAMILIER_1' }]
  },

'ACTE1_03_FAMILIER_1': {
  sceneNumber: 'ACTE1_03_FAMILIER_1',
  chapter: 1,
  title: "L'Écho de Neige",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/cour-duel.webp",
  spriteLeft: (gs) => gs.hasFlag('react_ombre') ? "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_KAELEN_AMUSE.png_202607022256-removebg-preview.png" : "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_KAELEN_MEPRISANT.png_202607022256-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/Alistair__Inquiet__main_sur_son_202607022256-removebg-preview.png",
  voice: "URL_VOIX_ALISTAIR",
  getDynamicNarrative: (gs) => {
    let text = "L'esplanade subit le contre-coup de ta présence. L'air se fige instantanément, et le givre, en se déposant, dessine sur la pierre des motifs qui ressemblent, un instant, à des barreaux.\n\n";
    if (gs.hasFlag('react_ombre')) text += "L'homme en noir laisse échapper un sifflement amusé face à ton choix mémoriel — un son qui sonne creux, comme une clause qu'on tait. Alistair recule d'un pas, la main crispée sur son insigne, blessé par cette préférence.\n\n";
    else if (gs.hasFlag('react_lumiere')) text += "Alistair redresse le buste, un soupir de soulagement soulevant son armure sainte. Sous le métal, quelque chose cliquette — un sceau qu'on referme plutôt qu'on n'ouvre. Kaelen crache au sol, ses dagues décrivant un arc de pur mépris.\n\n";
    else if (gs.hasFlag('react_givre')) text += "Ton onde de givre cloue leurs bottes au sol. Les deux guerriers reculent d'un même mouvement, mesurant avec effroi la puissance brute de ton autorité naissante.\n\n";

    

    text += "Le vent hurle plus fort entre les arches de pierre. L'homme en blanc rompt la distance, la main gauche appuyée sur un lourd talisman dissimulé sous sa tunique — un geste qu'il croit discret, et qui ne l'est pas.\n\n« Je refuse que le sang entache ce jour, » dit-il, sa voix trahissant une ferveur solennelle. « Je suis Alistair Leonhart. Je suis venu briser tes chaînes. Je... »\n\nUn frémissement sous la poudreuse l'interrompt.";
    return text;
  },
  choices: [{ key: 'NEXT', text: "Observer le mouvement à tes pieds...", next: 'ACTE1_03_FAMILIER_2' }]
},

'ACTE1_03_FAMILIER_2': {
  sceneNumber: 'ACTE1_03_FAMILIER_2',
  chapter: 1,
  title: "L'Écho de Neige",
  mood: 'action',
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/Kaelen__Baisse_l%C3%A9g%C3%A8rement_sa_garde__202607022256-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/Alistair__Fascin%C3%A9_par_Fen__baissant_202607022256-removebg-preview.png",
  voice: "URL_VOIX_KAELEN",
  onEnter: (state) => { if (!state.flags.includes('_fen_introduced')) state.flags.push('_fen_introduced'); },
  getDynamicNarrative: (gs) => {
    

    return `La neige s'agite. Une petite créature au pelage d'un blanc irisé, Fen, jaillit de la poudreuse pour se nicher d'un bond contre ton cou. Ta mémoire est éteinte, mais ton corps reconnaît instantanément cette chaleur animale et son parfum musqué. Alistair baisse sa garde, captivé par la bête, mais Kaelen rompt le charme d'un ricanement sec.\n\n« Une Reine déchue et son rat de compagnie. Le tableau est parfait. »\n\nSa provocation meurt dans un grondement souterrain titanesque. La pierre se fracture, le sol se dérobe sous vos pieds, vous précipitant ensemble dans un gouffre vertical. La chute est immédiate.`;
  },
  choices: [

    { 
      key: 'O', 
      condition: (gs) => isClassicState(gs),
      text: "Saisir la main de l'assassin. Kaelen te harponne dans le vide pour amortir l'impact.", 
      intent: 'confiance',
      target: 'Kaelen',
      importance: 'significant',
      feedback: "Kaelen a été celui que tu as choisi dans le vide. Ce n’est pas une promesse, mais le lien existe.",
      effects: [
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 10 },
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "ADD_GAUGE", target: "presence_O", value: 2 },
        { type: "SET_FLAG", target: "avec_ombre" },
        { type: "SET_FLAG", target: "compagnon_chute_O" }
      ], 
      next: 'ACTE1_04_FRESQUE' 
    },
    { 
      key: 'E', 
      condition: (gs) => isClassicState(gs),
      text: "Appeler le prêtre. Alistair déploie son bouclier lumineux pour envelopper ta chute.", 
      intent: 'confiance',
      target: 'Alistair',
      importance: 'significant',
      feedback: "Alistair a été celui que tu as appelé dans le vide. Ce n’est pas un serment, mais le lien existe.",
      effects: [
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 10 },
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "ADD_GAUGE", target: "presence_E", value: 2 },
        { type: "SET_FLAG", target: "avec_eclaireur" },
        { type: "SET_FLAG", target: "compagnon_chute_E" }
      ], 
      next: 'ACTE1_04_FRESQUE' 
    },
    {
      key: 'S',
      condition: (gs) => isClassicState(gs),
      text: "Repousser les deux hommes d'une bourrasque d'orgueil. Affronter le gouffre seule.",
      intent: 'liberte',
      target: 'Elenya',
      importance: 'significant',
      feedback: "Tu refuses les deux mains et demandes au givre de te porter. Cette fois, l’instabilité vient bien de toi.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 6 },
        { type: "ADD_GAUGE", target: "presence_S", value: 2 },
        { type: "SET_FLAG", target: "voie_solo" },
        { type: "SET_FLAG", target: "chute_solo_givre" }
      ],
      next: 'ACTE1_04_FRESQUE'
    }
  ]
},

'ACTE1_04_FRESQUE': {
    sceneNumber: 'ACTE1_04_FRESQUE',
    chapter: 1,
    title: "Mémoires de Glace",
    mood: 'exploration',
    emotionalBeat: 'memory',
    memoryEcho: 'kalthar_melody',
    relationFocus: (gs) => gs.hasFlag('avec_ombre') ? 'O' : (gs.hasFlag('avec_eclaireur') ? 'E' : 'S'),
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Catacombes_avec_fresque_202606191344.jpeg",
    sprite: (gs) => {
      if (gs.hasFlag('avec_ombre')) return "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_KAELEN_SOL.png_202607022256-removebg-preview.png";
      if (gs.hasFlag('avec_eclaireur')) return "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_ALISTAIR_SOL.png_202607022256-removebg-preview.png";
      return null;
    },
    voice: "",
    getDynamicNarrative: (gs) => {
      let _kaltharEcho = "";
      if (gs.getGauge('memoire_kalthar') >= 2 || gs.hasFlag('kalthar_melody')) {
        _kaltharEcho = "Une mélodie très ancienne traverse la pierre. Trois notes seulement. Ton corps la reconnaît avant ton esprit. Quelqu’un t’attendait ici.\n\n";
      }

      let baseText = "Le choc ébranle les profondeurs, mais ton fluide magique — épaulé par le petit furet cramponné à ton épaule — encaisse l'impact. Tu te redresses au cœur de catacombes oubliées, étouffées par une poussière séculaire.\n\n";
      if (gs.hasFlag('avec_ombre')) baseText += "Kaelen se relève avec une souplesse de chat, secouant son armure sombre. « Le dévot a raté la marche. Tant mieux, l'air est plus respirable sans ses sermons. » Ses lames brillent d'un reflet cruel dans le noir.\n\n";
      else if (gs.hasFlag('avec_eclaireur')) baseText += "Alistair se relève en gémissant, son insigne crépitant d'un reste de barrière sacrée. « L'assassin finira par ramper jusqu'ici... restons vigilants, » murmure-t-il, les yeux fixés sur les galeries noires.\n\n";
      else baseText += "Le tombeau de pierre ne rend que l’écho. Les jurons lointains des deux hommes résonnent plusieurs niveaux au-dessus. Fen pousse un faible sifflement, ses yeux noirs brillant d'une lueur bioluminescente qui perce les ténèbres.\n\n";
      baseText += "La lueur de la bête éclaire une fresque monumentale sculptée à même le basalte. Elle dépeint une souveraine ceinte d'un diadème de givre. Face à une mer de flammes démoniaques menaçant d'engloutir le monde, elle ne détruit pas : elle fige le continent pour contenir le brasier. Ce n'est pas le portrait d'un tyran cruel, mais le témoignage d'un sacrifice désespéré pour sauver la création.\n\n";
      baseText += "Un frisson qui n'a rien de mémoriel remonte le long de ta nuque : ton corps reconnaît ce diadème de givre avant même que ta raison ne l'admette. Tu ne te souviens de rien — et pourtant tu sais, avec une certitude glaçante, que cette souveraine sculptée dans la pierre, c'est toi.\n\n";
      
      return _kaltharEcho + baseText;
    },
    choices: [
      { 
        key: 'O', 
        condition: (gs) => gs.hasFlag('avec_ombre') && !gs.hasFlag('avec_eclaireur'), 
        text: "Se tourner vers Kaelen et jouer de provocation. « Alors mon mythe n'est qu'un mensonge pieux ? Décevant. »",
        response: "Kaelen suit du regard la souveraine gravée dans la pierre, puis toi. « Les mensonges pieux sont rarement aussi bien armés. » Son sourire revient, mais ses yeux restent sérieux. « Si cette femme était toi, j’aimerais surtout savoir qui a eu besoin que tu oublies pourquoi tu l’as fait. »",
        effects: [
          { type: "ADD_GAUGE", target: "lien_O", value: 1 }, 
          { type: "SET_FLAG", target: "fresque_O" },
          { type: "SET_FLAG", target: "fresque_touched" }
        ], 
        next: 'ACTE1_04_TRANSITION' 
      },
      {
        key: 'O_RETURN',
        condition: (gs) => gs.hasFlag('avec_ombre') && !gs.hasFlag('avec_eclaireur'),
        text: "Garder Kaelen à distance sans fermer la porte. « Cette fresque ne décide pas de nous. »",
        effects: [
          { type: "SET_FLAG", target: "fresque_O" },
          { type: "SET_FLAG", target: "fresque_touched" },
          { type: "SET_FLAG", target: "route_relationnelle_ouverte" }
        ],
        next: 'ACTE1_04_TRANSITION'
      },
      { 
        key: 'E', 
        condition: (gs) => gs.hasFlag('avec_eclaireur') && !gs.hasFlag('avec_ombre'), 
        text: "Soutenir Alistair. Poser ta main froide sur son bras quand sa foi vacille. « Regarde-moi. Respire. »",
        response: "Alistair obéit avant de s’en rendre compte. Son regard quitte la fresque pour s’ancrer dans le tien. « On m’a appris qu’elle avait choisi le monde contre les hommes. » Sa voix baisse. « Et je suis en train de regarder la femme qu’on m’avait appris à réduire à cette phrase. »",
        effects: [
          { type: "ADD_GAUGE", target: "lien_E", value: 1 }, 
          { type: "SET_FLAG", target: "fresque_E" },
          { type: "SET_FLAG", target: "fresque_touched" }
        ], 
        next: 'ACTE1_04_TRANSITION' 
      },
      {
        key: 'E_HOLD',
        condition: (gs) => gs.hasFlag('avec_eclaireur') && !gs.hasFlag('avec_ombre'),
        text: "Garder Alistair à distance sans le rejeter. Retirer doucement ta main. « Pas encore. »",
        effects: [
          { type: "SET_FLAG", target: "fresque_E" },
          { type: "SET_FLAG", target: "fresque_touched" },
          { type: "SET_FLAG", target: "route_relationnelle_ouverte" }
        ],
        next: 'ACTE1_04_TRANSITION'
      },
      { 
        key: 'S', 
        condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'), 
        text: "Affronter seule la fresque. Effleurer la roche gravée et laisser le souvenir venir.", 
        effects: [
          { type: "ADD_GAUGE", target: "instabilite", value: 2 }, 
          { type: "SET_FLAG", target: "fresque_S" },
          { type: "SET_FLAG", target: "fresque_touched" }
        ], 
        next: 'ACTE1_04_TRANSITION' 
      },
      { 
        key: 'C', 
        text: "Refuser le souvenir. Détourner les yeux de la fresque et chercher immédiatement la sortie.", 
        effects: [{ type: "SET_FLAG", target: "fresque_ignore" }], 
        next: 'ACTE1_04_TRANSITION' 
      }
    ]
  },

'ACTE1_04_TRANSITION': {
    sceneNumber: '1.04.BIS',
    chapter: 1,
    title: "Les Marches de Basalte",
    mood: 'exploration',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/galeries-basalte.webp",
    getDynamicNarrative: (gs) => {
      return "Avant d'atteindre la salle de l'automate, la galerie s'enfonce dans une série de marches taillées à même la roche mère. L'air y est saturé d'une vapeur glaciale qui colle aux vêtements.\n\n" +
      (gs.hasFlag('avec_ombre') ? "Kaelen vérifie la tension de ses dagues. 'Ce lieu n'a pas vu la lumière du jour depuis des siècles. Reste derrière moi.'\n\n" : "") +
      (gs.hasFlag('avec_eclaireur') ? "Alistair murmure des prières de protection, son sceptre diffusant un halo doré réconfortant dans l'obscurité.\n\n" : "") +
      "Fen siffle doucement, les sens en alerte.";
    },
    choices: [
      { key: 'CONTINUER', text: "S'avancer vers la chambre de l'automate.", next: 'ACTE1_04_AUTOMATE' }
    ]
  },

'ACTE1_04_AUTOMATE': {
  sceneNumber: 'ACTE1_04_AUTOMATE',
  chapter: 1,
  title: "Le Gardien de Pierre",
  mood: 'action',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/chambre-automate.webp",
  onEnter: (state) => {
    if (!state.flags.includes('automate_entered')) {
      state.flags.push('automate_entered');
    }
  },
  getDynamicNarrative: (gs) => {
    let text = "Un grondement sourd monte des murs. La fresque se fissure. De la pierre et du cristal, un automate s’arrache au basalte comme un os qu’on arrache d’une chair morte. Ses yeux s’allument d’une lueur cyan, froide, vengeresse — la même lumière que celle qui pulse parfois sous ta peau.\n\n";

    if (gs.hasFlag('avec_ombre') && gs.hasFlag('avec_eclaireur')) {
      text += "Kaelen part sur le flanc gauche tandis qu’Alistair verrouille le centre. Pour la première fois, leurs gestes se répondent avant même qu’ils aient besoin de se parler. Une dague détourne la lame tournante ; un éclat de lumière frappe le cristal au moment exact où l’assassin ouvre une brèche.\n\n";
      text += "« Ne t’habitue pas à travailler avec moi, » grogne Kaelen.\n\n« Je n’avais pas prévu de le faire, » répond Alistair. Mais il ne recule pas.\n\n";
    } else if (gs.hasFlag('avec_ombre')) {
      text += "Kaelen ne dit rien. Il glisse déjà sur le côté, dagues nues, le corps bas. L’automate frappe. Une lame tournante racle l’endroit où se trouvait sa tête une demi-seconde plus tôt. « Un joujou de plus, Reine, » souffle-t-il, et dans sa voix il y a presque… de l’amusement. Ou de l’appétit.\n\n";
    } else if (gs.hasFlag('avec_eclaireur')) {
      text += "Alistair dresse son bouclier de lumière. L’automate l’absorbe. La lueur dorée se fond dans le cristal et le rend plus brillant, plus vif, plus affamé. « Il se nourrit du divin… » murmure le prêtre, la mâchoire serrée. Sa foi vient de devenir une arme contre lui.\n\n";
    } else {
      text += "Fen se plaque contre ton cou, un frisson de peur animale. Tu lèves la main sans réfléchir. Le givre répond avant même que tu formules l’ordre. Une muraille de glace pure se dresse. L’automate la frappe, s’y enfonce, et ses engrenages se grippent dans un cri de métal et de cristal.\n\n";
    }

    text += "La bataille est brève, brutale, presque intime. Quand l’automate s’effondre en poussière de cristal et d’os de pierre, le silence qui suit est plus lourd que le combat lui-même.\n\n";
    text += "Dans l’alcôve qu’il gardait, l’air est plus chaud. Ou peut-être est-ce seulement ton sang qui bat trop fort. Un endroit pour souffler. Pour ne pas encore remonter.";

    return text;
  },
  choices: [
    { 
      key: 'NEXT', 
      text: "Traverser le passage étroit…", 
      effects: [{ type: "SET_FLAG", target: "fragment_kalthar_1" }], 
      next: 'ACTE1_05_BIVOUAC' 
    }
  ]
},

'ACTE1_05_BIVOUAC': {
  sceneNumber: 'ACTE1_05_BIVOUAC',
  chapter: 1,
  title: "La Chaleur des Profondeurs",
  mood: 'romance',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/bivouac-souterrain.webp",
  sprite: (gs) => {
    if (gs.hasFlag('avec_ombre')) return "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_KAELEN_BIVOUAC.png_202607022256-removebg-preview.png";
    if (gs.hasFlag('avec_eclaireur')) return "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_ALISTAIR_BIVOUAC.png_202607022256-removebg-preview.png";
    return null;
  },
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Le froid ici n’est plus une agression. C’est une reconnaissance. Ton sang s’accorde à la température des catacombes comme s’il rentrait enfin chez lui. La vérité de la fresque s’est installée entre les murs, lourde, silencieuse, impossible à ignorer.\n\n";

    // Réactions selon le choix face à la fresque
    if (gs.hasFlag('fresque_O')) {
      text += "Kaelen t’observe depuis l’ombre. Le contrat a bougé. Il ne parle pas d’attachement. Seulement d’une pièce trop rare pour la laisser aux prêtres.\n\n";
    } else if (gs.hasFlag('fresque_E')) {
      text += "Le contact de ta main sur le bras d’Alistair a laissé une trace. Il n’a pas dit que l’Ordre avait menti — seulement que le monde, soudain, ne tenait plus. Sa dévotion bascule : plus seulement religieuse, personnelle. Et dangereuse.\n\n";
    } else if (gs.hasFlag('fresque_S')) {
      text += "L’écho du givre originel pulse sous ta peau. Une vibration solitaire. Tu as touché ton propre mythe et le monde entier semble s’être un peu éloigné de toi.\n\n";
    } else if (gs.hasFlag('fresque_ignore')) {
      text += "Tu as détourné les yeux. Le passé est une ruine. Cette indifférence glace l’atmosphère plus sûrement que n’importe quel sortilège.\n\n";
    }

    // Scène selon le compagnon — le mode triangle reste jouable dès l'Acte 1.
    if (gs.hasFlag('avec_ombre') && gs.hasFlag('avec_eclaireur')) {
      text += `Kaelen refuse d’allumer du feu. Alistair en allume pourtant un, minuscule, assez faible pour ne pas attirer les regards.\n\nKaelen fixe la flamme, puis le prêtre. « Tu fais toujours l’inverse de ce qu’on te demande ? »\n\n« Seulement quand la demande est mauvaise. »\n\nTu comprends alors que le choix de la chute n’a pas créé un gagnant. Il a seulement déplacé les lignes.`;
    } else if (gs.hasFlag('avec_ombre')) {
      text += `Kaelen refuse d’allumer du feu. L’obscurité est son terrain. « Tu as de quoi glacer une armée, » murmure-t-il près de ton oreille, « et tu cajoles un furet. Soit tu es plus dangereuse que je ne le pensais, soit tu joues. Les deux m’intéressent. »\n\nIl s’approche. Trop près. Fen siffle. Kaelen n’a pas l’air offensé : il regarde, mesure, range l’information.`;
    } else if (gs.hasFlag('avec_eclaireur')) {
      if (gs.hasFlag('_lien_E_1_vu')) {
        // Compatibilité : une ancienne sauvegarde peut avoir déjà joué LIEN_E_1.
        text += `L’étincelle d’Alistair est déjà là. Il ne répète pas ce qui a été dit auparavant. Il se contente de maintenir la lumière assez loin de toi pour qu’elle réchauffe la pierre sans toucher ton givre.`;
      } else {
        text += `Alistair allume une étincelle basse puis pose sa cape sur la pierre, entre vous plutôt que sur tes épaules. Le geste ressemble à une offre qu’il refuse encore de nommer.\n\n« On m’a appris à protéger ce que je ne comprends pas, » dit-il. Son regard glisse vers l’entrée de l’alcôve, puis revient vers toi. « Je commence à soupçonner que protéger et enfermer peuvent avoir exactement le même visage. »\n\nIl ne cherche pas ta main. Il attend seulement de voir quelle distance tu choisis de laisser entre sa lumière et ton froid.`;
      }
    } else {
      text += `Fen s’endort sur tes genoux. Sa respiration est la seule pulsation vivante de la pièce. Dans ce tête-à-tête avec les ténèbres, la solitude n’est plus un manque. C’est le premier jalon d’une liberté que tu commences à reconquérir.`;
    }

    // Compatibilité anciennes sauvegardes : échos de l'ancien palier LIEN_E_1.
    if (gs.hasFlag('_lien_E_1_distance')) {
      text += "\n\nTu as reculé. Alistair a refermé les doigts sur le bord de la cape un instant trop long — puis a repris son étincelle comme si de rien n’était.";
    } else if (gs.hasFlag('_lien_E_1_contact')) {
      text += "\n\nTu n’as pas bougé. L’étincelle pulse encore trop près de ton poignet, plus basse, comme s’il avait peur d’éteindre ce qu’il n’ose pas nommer.";
    }

    return text;
  },
  choices: [
  // --- Voie Ombre ---
  { 
    key: 'O1', 
    condition: (gs) => gs.hasFlag('avec_ombre'), 
    text: "Flirter avec Kaelen par la menace. « Un pas de plus, et je fige ton cœur. » Glisser un demi-sourire cruel.",
    response: "Kaelen avance précisément d’un demi-pas. « Là ? » demande-t-il. Le sourire qu’il te rend est trop calme pour être de l’inconscience. « Je préfère connaître la distance exacte avant de prendre un risque. » Puis il s’arrête. Il a joué — et il a respecté la limite.",
    effects: [
      { type: "ADD_GAUGE", target: "lien_O", value: 1 },
      { type: "SET_FLAG", target: "_lien_O_1_vu" },
      { type: "SET_FLAG", target: "bivouac_menace" }
    ], 
    next: 'ACTE1_05B_REVEIL_BIVOUAC' 
  },
  { 
    key: 'O2', 
    condition: (gs) => gs.hasFlag('avec_ombre'), 
    text: "Maintenir Kaelen sur le terrain du contrat. Soutenir son regard et exiger son nom et son prix.",
    response: "« Kaelen. » Il laisse son nom tomber entre vous comme une pièce sur une table. Puis son sourire revient. « Mon prix ? Assez pour que je reste tant que ça ressemble encore à un contrat. Le jour où je reste après… là, tu pourras commencer à t’inquiéter. »",
    effects: [
      { type: "ADD_GAUGE", target: "affinite_ombre", value: 3 },
      { type: "SET_FLAG", target: "_lien_O_1_vu" },
      { type: "SET_FLAG", target: "bivouac_nom" }
    ], 
    next: 'ACTE1_05B_REVEIL_BIVOUAC' 
  },
  { 
    key: 'O3', 
    condition: (gs) => gs.hasFlag('avec_ombre'), 
    text: "Se rapprocher de Kaelen sans parler. Laisser le silence et la proximité faire le reste.",
    response: "Kaelen ne tourne pas la tête lorsque tu t’installes près de lui. Il décale seulement une dague pour qu’elle ne se trouve plus entre vos deux corps. Aucun commentaire. Le geste suffit.",
    effects: [
      { type: "ADD_GAUGE", target: "lien_O", value: 1 },
      { type: "SET_FLAG", target: "_lien_O_1_vu" },
      { type: "SET_FLAG", target: "bivouac_silence_proche" }
    ], 
    next: 'ACTE1_05B_REVEIL_BIVOUAC' 
  },

  // --- Voie Éclaireur ---
    // --- Voie Éclaireur (V26.5.1 : plus de re-prise de main si LIEN déjà vu) ---
  {
    key: 'E1',
    condition: (gs) => gs.hasFlag('avec_eclaireur') && gs.hasFlag('_lien_E_1_vu'),
    text: "Poser une limite à Alistair sans le rejeter. « Garde le cadre si tu veux — pas sur moi. »",
    response: "Alistair absorbe la correction sans se défendre. Il replie sa cape sur ses propres genoux. « D’accord. Le cadre pour moi. Pas autour de toi. » Ce n’est pas une promesse parfaite, mais c’est la première qu’il reformule au lieu de l’imposer.",
    effects: [
      { type: "ADD_GAUGE", target: "lien_E", value: 1 },
      { type: "SET_FLAG", target: "bivouac_garde_cadre" }
    ],
    next: 'ACTE1_05B_REVEIL_BIVOUAC'
  },
  {
    key: 'E2',
    condition: (gs) => gs.hasFlag('avec_eclaireur') && gs.hasFlag('_lien_E_1_vu'),
    text: "Repousser Alistair franchement. Éteindre l’étincelle. « Ta pitié m’insulte, prêtre. »",
    response: "L’étincelle meurt entre les doigts d’Alistair. Il ne la rallume pas. « Ce n’était pas de la pitié. » Il marque un temps, puis renonce à se justifier. « Mais si c’est ainsi que tu l’as reçue, je recule. »",
    effects: [
      { type: "ADD_GAUGE", target: "distance_E", value: 2 },
      { type: "ADD_GAUGE", target: "volonte", value: 1 },
      { type: "SET_FLAG", target: "bivouac_retire_cadre" }
    ],
    next: 'ACTE1_05B_REVEIL_BIVOUAC'
  },
  {
    key: 'E3',
    condition: (gs) => gs.hasFlag('avec_eclaireur') && gs.hasFlag('_lien_E_1_vu'),
    text: "Accepter la présence d’Alistair. Le laisser rester à la lisière de ta lumière.",
    response: "Alistair reste exactement où tu l’as laissé. Sa lumière baisse jusqu’à ne plus être qu’une chaleur sur la pierre. « Je peux faire ça », murmure-t-il. « Être là sans avancer. »",
    effects: [
      { type: "ADD_GAUGE", target: "lien_E", value: 1 },
      { type: "SET_FLAG", target: "bivouac_accepte_cadre" },
      { type: "SET_FLAG", target: "ton_douceur" }
    ],
    next: 'ACTE1_05B_REVEIL_BIVOUAC'
  },
  // V40.3.7 — choix standard sur une nouvelle partie.
  // Les variantes E1/E2/E3 ci-dessus ne servent plus qu'aux sauvegardes legacy
  // qui avaient déjà traversé LIEN_E_1.
  {
    key: 'E1b',
    condition: (gs) => gs.hasFlag('avec_eclaireur') && !gs.hasFlag('_lien_E_1_vu'),
    text: "Poser une limite à Alistair sans le rejeter. « Ta lumière faiblit. Garde tes distances. »",
    response: "Alistair retire aussitôt sa main de la cape qu’il allait te tendre. « Je garderai la distance. » Son regard demeure pourtant sur toi, non pour surveiller, mais pour vérifier qu’il a bien compris où tu as posé la limite.",
    effects: [
      { type: "ADD_GAUGE", target: "lien_E", value: 1 },
      { type: "SET_FLAG", target: "_lien_E_1_vu" },
      { type: "SET_FLAG", target: "_lien_E_1_distance" },
      { type: "SET_FLAG", target: "bivouac_garde_cadre" }
    ],
    next: 'ACTE1_05B_REVEIL_BIVOUAC'
  },
  {
    key: 'E2b',
    condition: (gs) => gs.hasFlag('avec_eclaireur') && !gs.hasFlag('_lien_E_1_vu'),
    text: "Repousser Alistair franchement. Tourner le dos à l’étincelle. « Ta pitié m’insulte, prêtre. »",
    response: "La lumière s’éteint derrière toi. « Compris. » Un seul mot. Quand tu regardes de nouveau, Alistair s’est déplacé de l’autre côté de l’alcôve. Il a choisi de prendre ton refus au sérieux plutôt que d’en faire une épreuve de foi.",
    effects: [
      { type: "ADD_GAUGE", target: "distance_E", value: 2 },
      { type: "ADD_GAUGE", target: "volonte", value: 1 },
      { type: "SET_FLAG", target: "_lien_E_1_vu" },
      { type: "SET_FLAG", target: "_lien_E_1_distance" },
      { type: "SET_FLAG", target: "bivouac_retire_cadre" }
    ],
    next: 'ACTE1_05B_REVEIL_BIVOUAC'
  },
  {
    key: 'E3b',
    condition: (gs) => gs.hasFlag('avec_eclaireur') && !gs.hasFlag('_lien_E_1_vu'),
    text: "Se rapprocher d’Alistair sans promesse. Rester à la lisière de sa lumière, juste un instant.",
    response: "Alistair cesse de parler. Il ne transforme pas ton approche en bénédiction. Il laisse seulement l’étincelle entre vous diminuer jusqu’à ce qu’elle réchauffe sans éclairer, présence offerte plutôt que revendiquée.",
    effects: [
      { type: "ADD_GAUGE", target: "lien_E", value: 1 },
      { type: "SET_FLAG", target: "_lien_E_1_vu" },
      { type: "SET_FLAG", target: "_lien_E_1_contact" },
      { type: "SET_FLAG", target: "bivouac_accepte_cadre" },
      { type: "SET_FLAG", target: "ton_douceur" }
    ],
    next: 'ACTE1_05B_REVEIL_BIVOUAC'
  },

  // --- Voie Solo ---
  { 
    key: 'S1', 
    condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'), 
    text: "Fermer les yeux. Écouter le froid qui pulse en toi comme un second cœur.", 
    effects: [
      { type: "ADD_GAUGE", target: "instabilite", value: 3 },
      { type: "SET_FLAG", target: "bivouac_solo_froid" }
    ], 
    next: 'ACTE1_05B_REVEIL_BIVOUAC' 
  },
  { 
    key: 'S2', 
    condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'), 
    text: "Flatter doucement l’oreille de Fen. La seule chaleur que tu acceptes encore.", 
    effects: [
      { type: "SET_FLAG", target: "bivouac_fen_seul" }
    ], 
    next: 'ACTE1_05B_REVEIL_BIVOUAC' 
  }
]
},

'ACTE1_05B_REVEIL_BIVOUAC': {
  sceneNumber: '1.05B',
  chapter: 1,
  title: "Cendres Froides",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Bivouac_aube.jpeg",
  spriteLeft: (gs) => gs.hasFlag('avec_ombre')
    ? "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png"
    : "",
  spriteRight: (gs) => gs.hasFlag('avec_eclaireur')
    ? "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png"
    : "",
  getDynamicNarrative: (gs) => {
    let text = "L’aube grise s’infiltre. La nuit a laissé une trace : une distance nouvelle, sans mots.\n\n";

    if (gs.hasFlag('bivouac_silence_proche') || gs.hasFlag('bivouac_contact_volontaire')) {
      text += "Kaelen est déjà debout, trop loin. Il n’a pas dormi.";
    } else if (gs.hasFlag('bivouac_solo_froid') || gs.hasFlag('bivouac_fen_seul')) {
      text += "Fen est encore contre ta gorge. La montagne attend.";
    } else if (gs.hasFlag('avec_ombre')) {
      if (gs.hasFlag('dague_kaelen_prise')) {
        text += "Kaelen range sa dague restante. Il a remarqué l’absence de l’autre — moins de défi, plus de calcul.";
      } else {
        text += "Kaelen range ses dagues avec une lenteur inhabituelle. Moins de défi. Plus de calcul.";
      }
    } else if (gs.hasFlag('avec_eclaireur')) {
      text += "Alistair a déjà prié. Quand il te voit éveillée, il détourne le regard un instant trop long.";
    } else {
      text += "Il faut repartir.";
    }
    return text;
  },
  choices: [
    {
      key: 'A',
      text: "Se lever sans un mot.",
      condition: (gs) => !gs.hasFlag('voie_solo') && !gs.hasFlag('voie_solo_profonde'),
      next: 'ACTE1_05C_JALOUSIE_SOUTERRAINE'
    },
    {
      key: 'A_SOLO',
      condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'),
      text: "Se lever. Continuer seule.",
      next: 'ACTE1_06_REMONTEE'
    }
  ]
},

'ACTE1_05C_JALOUSIE_SOUTERRAINE': {
  sceneNumber: '1.05C',
  chapter: 1,
  title: "Jalousie Souterraine",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/bivouac-souterrain.webp",
  spriteLeft: (gs) => gs.hasFlag('avec_ombre')
    ? "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png"
    : "",
  spriteRight: (gs) => gs.hasFlag('avec_eclaireur')
    ? "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png"
    : "",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "La galerie reprend. Ce qui s’est passé dans l’alcôve reste entre vous — non dit, non effacé.\n\n";

    if (gs.hasFlag('avec_ombre')) {
      text += "Kaelen est déjà debout, trop près de toi. Ses yeux glissent un instant vers l’entrée de la galerie — là où Alistair aurait dû apparaître — puis reviennent sur toi avec une intensité possessive.\n\n";
      text += "« Il n’est pas là, » murmure-t-il. « Tant mieux. L’air est plus respirable sans ses prières. »\n\n";
      text += "Mais sous le cynisme, tu sens autre chose : une satisfaction trop vive, presque jalouse. Comme s’il savait déjà que ta chute l’avait choisi, et qu’il n’avait aucune intention de partager ce choix.";
    } 
    else if (gs.hasFlag('avec_eclaireur')) {
      text += "Alistair se redresse en premier. Sa main hésite un instant près de ton épaule, puis se retire. Ses yeux cherchent instinctivement l’ombre de Kaelen… et ne la trouvent pas.\n\n";
      text += "« L’assassin a dû prendre une autre route, » dit-il, trop vite. « Ou il a préféré nous abandonner. »\n\n";
      text += "La phrase sonne comme un soulagement qu’il n’ose pas avouer. Sa jalousie n’est pas encore nommée, mais elle plane déjà entre vous — douce, étouffée, et dangereuse.";
    }

    text += "\n\nLe silence qui suit n’est plus celui de la nuit. C’est celui de deux hommes qui commencent à mesurer ce que ta présence leur coûte… et ce qu’ils sont prêts à prendre.";
    return text;
  },
  choices: [
    // --- Voie Ombre ---
    {
      key: 'O1',
      condition: (gs) => gs.hasFlag('avec_ombre'),
      text: "Soutenir son regard. « Tu sembles content de son absence, Kaelen. »",
      response: "« Content ? Non. » Kaelen jette un regard vers la galerie vide. « Disons que je préfère négocier sans un prêtre qui récite les petites lignes du contrat derrière mon épaule. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "SET_FLAG", target: "jalousie_kaelen_vue" }
      ],
      next: 'ACTE1_06_REMONTEE'
    },
    {
      key: 'O2',
      condition: (gs) => gs.hasFlag('avec_ombre'),
      text: "Détourner les yeux. « Son absence ne change rien. Remontons. »",
      effects: [
        { type: "ADD_GAUGE", target: "affinite_ombre", value: 2 },
        { type: "SET_FLAG", target: "jalousie_ignoree" }
      ],
      next: 'ACTE1_06_REMONTEE'
    },

    // --- Voie Éclaireur ---
    {
      key: 'E1',
      condition: (gs) => gs.hasFlag('avec_eclaireur'),
      text: "Poser ta main sur son bras. « Tu as peur qu’il revienne, Alistair ? »",
      response: "« Peur de lui ? Non. » Le regard d’Alistair descend vers ta main puis remonte. « De ce que je pourrais vouloir quand il reviendra… c’est une question moins confortable. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "jalousie_alistair_vue" }
      ],
      next: 'ACTE1_06_REMONTEE'
    },
    {
      key: 'E2',
      condition: (gs) => gs.hasFlag('avec_eclaireur'),
      text: "« Peu importe où il est. On avance. » Couper court.",
      effects: [
        { type: "ADD_GAUGE", target: "affinite_eclaireur", value: 2 },
        { type: "SET_FLAG", target: "jalousie_ignoree" },
        { type: "SET_FLAG", target: "ton_douceur" }
      ],
      next: 'ACTE1_06_REMONTEE'
    },

    // --- Choix neutre (toujours disponible) ---
    {
      key: 'S',
      text: "Se lever sans un mot et s’avancer vers la faille. Leur jalousie n’est pas ton problème.",
      effects: [
        { type: "ADD_GAUGE", target: "volonte", value: 1 },
        { type: "ADD_GAUGE", target: "presence_S", value: 1 },
        { type: "SET_FLAG", target: "jalousie_ignoree" }
      ],
      next: 'ACTE1_06_REMONTEE'
    }
  ]
},

'ACTE1_06_REMONTEE': {
  sceneNumber: 'ACTE1_06_REMONTEE',
  chapter: 1,
  title: "À Bout de Souffle",
  mood: 'action',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/galeries-basalte.webp",
  sprite: (gs) => {
    if (gs.hasFlag('avec_ombre')) return "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_KAELEN_BIVOUAC.png_202607022256-removebg-preview.png";
    if (gs.hasFlag('avec_eclaireur')) return "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_ALISTAIR_BIVOUAC.png_202607022256-removebg-preview.png";return null;
  },
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "";

    // === Réactions au bivouac (nouveaux + anciens flags) ===
    if (gs.hasFlag('bivouac_menace')) {
      text += "L'assassin a répondu à ta menace par un sourire carnassier, acceptant tacitement ce rapport de force brutal.\n\n";
    } 
    else if (gs.hasFlag('bivouac_nom')) {
      text += "Depuis qu’il t’a donné son nom sans vraiment chiffrer son prix, le mot contrat a changé de poids entre vous. Il ressemble déjà moins à une somme qu’à une excuse pour rester.\n\n";
    } 
    else if (gs.hasFlag('bivouac_silence_proche')) {
      text += "Le silence que tu as laissé s'installer a pesé plus lourd qu'une menace. Kaelen n'a rien dit, mais il s'est rapproché d'un pas, comme si ton mutisme était une invitation qu'il avait parfaitement comprise.\n\n";
    } 
    else if (gs.hasFlag('bivouac_garde_main') || gs.hasFlag('bivouac_garde_cadre')) {
      text += "Le prêtre n'a pas reculé. Il a accepté ton avertissement tout en gardant le cadre — lumière basse, distance mesurée, trop près pour être innocent.\n\n";
    }
    else if (gs.hasFlag('bivouac_retire_main') || gs.hasFlag('bivouac_retire_cadre')) {
      text += "Ta rebuffade a glacé les ardeurs d'Alistair. Il a ravalé sa pitié, s'enfermant dans une politesse blessée et distante.\n\n";
    }
    else if (gs.hasFlag('bivouac_contact_volontaire') || gs.hasFlag('bivouac_accepte_cadre')) {
      text += "Tu as laissé le silence faire le travail. Ce simple refus de le chasser a fait vaciller quelque chose dans le regard d'Alistair — une dévotion qui n'était plus seulement celle d'un soldat de la Lumière.\n\n";
    } 
    else if (gs.hasFlag('bivouac_solo_froid') || gs.hasFlag('bivouac_medite')) {
      text += "Ta méditation glaciale a restauré tes forces, érigeant une muraille entre ta souveraineté et le reste du monde souterrain.\n\n";
    } 
    else if (gs.hasFlag('bivouac_fen_seul') || gs.hasFlag('bivouac_fen_calme')) {
      text += "Ton indifférence face à leur tension a forcé le silence. Tu n'as accordé ton attention qu'au familier, les ignorant superbement.\n\n";
    }

    // === Ascension ===
    text += "L'ascension est brutale. Le froid draine tes forces alors que tu gravis les parois de la faille. Fen se faufile à travers une conduite d'aération effondrée, indiquant la seule issue verticale vers la surface. L'ascension ne tolère aucun faux pas.\n\n";

    if (gs.hasFlag('avec_ombre') && gs.hasFlag('avec_eclaireur')) {
      text += "Une corniche se dérobe sous ton poids. Kaelen attrape ton poignet au même instant qu’Alistair plante son sceptre dans une fissure et ancre une ligne de lumière. L’un tire, l’autre stabilise. Aucun ne lâche.\n\n« Ne prends pas ça pour une victoire, » souffle Kaelen.\n\n« Je n’en prends aucune quand il s’agit de la garder en vie, » répond Alistair.";
    } else if (gs.hasFlag('avec_ombre')) {
      text += "Une corniche se dérobe sous ton poids. D'un réflexe foudroyant, l'homme en noir te harponne le poignet. Le vide gronde en dessous. « Je garde toujours ce qui m'appartient, Reine, » siffle-t-il en te hissant d'un coup sec contre son plastron de cuir. Son souffle court trahit l'effort — et, l'espace d'un souffle, autre chose qu'il ne nomme pas.";
    } else if (gs.hasFlag('avec_eclaireur')) {
      text += "Tes doigts gelés glissent sur la pierre humide. Alistair lâche son sceptre, t'attrape à bras-le-corps et plaque ton dos contre la paroi rocheuse pour bloquer ta chute. Vos visages se frôlent dans l'obscurité du puits, son cœur cognant violemment contre ton épaule — une ferveur qui, déjà, ressemble un peu trop à un vœu de propriété qu'il ne prononcerait jamais tout haut.";
    } else {
      text += "Seule face à la paroi, tu refuses la faiblesse. Tu infuses ta magie brute dans la pierre, vitrifiant l'humidité pour créer tes propres prises de givre acérées. Tes doigts saignent sous l'effort, mais ta progression ne dépend de personne.";
    }

    return text;
  },
  choices: [
    { 
      key: 'O', 
      condition: (gs) => gs.hasFlag('avec_ombre'), 
      text: "Soutenir son étreinte. « Je n'appartiens qu'à l'Hiver, Kaelen. Souviens-toi de ça. »", 
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 }, 
        { type: "SET_FLAG", target: "remontee_defi" }
      ], 
      next: 'ACTE1_06C_CONVERGENCE' 
    },
    { 
      key: 'E', 
      condition: (gs) => gs.hasFlag('avec_eclaireur'), 
      text: "Poser ta paume sur son cœur pour calmer son rythme. « Je te tiens, Sentinelle. »", 
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 }, 
        { type: "SET_FLAG", target: "remontee_rassure" },
        { type: "SET_FLAG", target: "ton_douceur" }
      ], 
      next: 'ACTE1_06C_CONVERGENCE' 
    },
    { 
      key: 'S', 
      condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'), 
      text: "Ignorer la douleur de tes doigts et te hisser hors du puits.", 
      effects: [
        { type: "ADD_GAUGE", target: "volonte", value: 1 },
        { type: "ADD_GAUGE", target: "presence_S", value: 1 },
        { type: "SET_FLAG", target: "remontee_seule" }
      ], 
      next: 'ACTE1_06C_CONVERGENCE' 
    },
    { 
      key: 'C', 
      condition: (gs) => !gs.hasFlag('voie_solo') && !gs.hasFlag('voie_solo_profonde'), 
      text: "Te dégager froidement de son contact dès que tes pieds touchent un sol stable.", 
      effects: [
        { type: "SET_FLAG", target: "remontee_froid" }
      ], 
      next: 'ACTE1_06C_CONVERGENCE' 
    }
  ]
},

'ACTE1_06C_CONVERGENCE': {
  sceneNumber: '1.06C',
  chapter: 1,
  title: "La Jonction des Routes",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/galeries-basalte.webp",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
  voice: "",
  
  getDynamicNarrative: (gs) => {
    let text = "Les galeries se rejoignent enfin. Une bifurcation, puis une seconde — et les pas qui manquaient reviennent dans l'écho.\n\n";

    if (gs.hasFlag('avec_ombre')) {
      text += "Alistair apparaît dans un tunnel latéral, couvert de poussière mais debout. Il vérifie d'abord que tu respires. Kaelen vérifie d'abord qu'il n'est pas suivi. Aucun des deux ne commente encore le temps passé loin de l'autre.\n\n";
    } else if (gs.hasFlag('avec_eclaireur')) {
      text += "Kaelen émerge d'un passage de service, une entaille fraîche sur la manche. Son regard te compte en un instant — entière, mobile, vivante — puis passe à Alistair. Le prêtre fait le même inventaire. Rien de plus.\n\n";
    } else {
      text += "Kaelen et Alistair finissent par apparaître de deux passages différents. Ils ont survécu sans toi ; tu as survécu sans eux. Pour l'instant, cette symétrie suffit.\n\n";
    }

    text += "La sortie est au-dessus. Les mots qui comptent attendront la surface, là où personne ne pourra prétendre que l'urgence les a choisis à ta place.";
    return text;
  },

  choices: [
    {
      key: 'V28_O',
      condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
        && !gs.hasFlag('avec_ombre'),
      text: "Regarder Kaelen. « Tu as survécu. Alors marche avec moi. Pas devant. »",
      effects: [
        { type: "ADD_GAUGE", target: "presence_O", value: 3 },
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "JOIN_COMPANION", target: "O" },
        { type: "SET_FLAG", target: "convergence_acknowledged" }
      ],
      next: 'ACTE1_07_RETROUVAILLES'
    },
    {
      key: 'V28_E',
      condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
        && !gs.hasFlag('avec_eclaireur'),
      text: "Regarder Alistair. « Tu es blessé ? Reste près de moi. »",
      response: "« Rien qui exige une prière. » Il se rapproche pourtant d’un pas. « Je resterai. Mais parce que tu me l’as demandé — pas parce que j’ai décidé que tu avais besoin de moi. »",
      effects: [
        { type: "ADD_GAUGE", target: "presence_E", value: 3 },
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "JOIN_COMPANION", target: "E" },
        { type: "SET_FLAG", target: "convergence_acknowledged" }
      ],
      next: 'ACTE1_07_RETROUVAILLES'
    },
    {
      key: 'V28_S',
      condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'),
      text: "Les laisser là. Continuer seule. Fen suffit.",
      effects: [
        { type: "ADD_GAUGE", target: "presence_S", value: 2 },
        { type: "ADD_GAUGE", target: "volonte", value: 1 },
        { type: "SET_FLAG", target: "convergence_acknowledged" },
        { type: "SET_FLAG", target: "solo_convergence_choisie" }
      ],
      next: 'ACTE1_08B_BIVOUAC_LISIERE'
    },
    {
      key: 'V28_DOUBLE',
      condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
        && gs.getGauge('affinite_ombre') >= 2
        && gs.getGauge('affinite_eclaireur') >= 2,
      text: "« Vous deux. Assez près. Pas assez pour m'enfermer. On avance. »",
      effects: [
        { type: "ADD_GAUGE", target: "presence_O", value: 2 },
        { type: "ADD_GAUGE", target: "presence_E", value: 2 },
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "truce_initiale" },
        { type: "SET_FLAG", target: "relation_O_ouverte_acte1" },
        { type: "SET_FLAG", target: "relation_E_ouverte_acte1" },
        { type: "SET_FLAG", target: "convergence_acknowledged" }
      ],
      next: 'ACTE1_07_RETROUVAILLES'
    },
    {
      key: 'APPROCHER_O_DEPUIS_E',
      condition: (gs) => gs.hasFlag('avec_eclaireur') && !gs.hasFlag('avec_ombre'),
      text: "Quitter un instant la lumière d'Alistair et rejoindre Kaelen. « Toi. Marche avec moi. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "ADD_GAUGE", target: "presence_O", value: 2 },
        { type: "ADD_GAUGE", target: "distance_O", value: -2 },
        { type: "SET_FLAG", target: "relation_O_ouverte_acte1" },
        { type: "SET_FLAG", target: "focus_romantique_O" },
        { type: "REMOVE_FLAG", target: "focus_romantique_E" },
        { type: "SET_FLAG", target: "convergence_acknowledged" }
      ],
      next: 'ACTE1_07K_RETROUVAILLES_KAELEN'
    },
    {
      key: 'APPROCHER_E_DEPUIS_O',
      condition: (gs) => gs.hasFlag('avec_ombre') && !gs.hasFlag('avec_eclaireur'),
      text: "Laisser Kaelen derrière toi un instant et rejoindre Alistair. « Je veux t'entendre, toi. »",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "ADD_GAUGE", target: "presence_E", value: 2 },
        { type: "ADD_GAUGE", target: "distance_E", value: -2 },
        { type: "SET_FLAG", target: "relation_E_ouverte_acte1" },
        { type: "SET_FLAG", target: "focus_romantique_E" },
        { type: "REMOVE_FLAG", target: "focus_romantique_O" },
        { type: "SET_FLAG", target: "convergence_acknowledged" }
      ],
      next: 'ACTE1_07E_RETROUVAILLES_ALISTAIR'
    },
    {
      key: 'NEXT',
      text: "Continuer vers la surface avec le groupe intact.",
      effects: [
        { type: "SET_FLAG", target: "convergence_acknowledged" },
        { type: "ADD_GAUGE", target: "instabilite", value: 1 }
      ],
      next: 'ACTE1_07_RETROUVAILLES'
    }
  ]
},

'ACTE1_07_RETROUVAILLES': {
  sceneNumber: 'ACTE1_07_RETROUVAILLES',
  chapter: 1,
  title: "La Triangulation",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Surface_brumeuse_enneig%C3%A9e_202606191344.jpeg",
  spriteLeft: (gs) => gs.hasFlag('avec_ombre') 
    ? "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_KAELEN_PROTECTEUR.png" 
    : "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_KAELEN_PERSILFLANT.png",
  spriteRight: (gs) => gs.hasFlag('avec_ombre') 
    ? "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_ALISTAIR_JALOUX.png" 
    : "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_ALISTAIR_PROTECTEUR.png",
  voice: "",
  onEnter: (state) => {
    // V40: le compagnon de chute décrit une présence physique, jamais une préférence romantique.
    // Les retrouvailles rouvrent les deux relations sans pénaliser automatiquement l'absent.
    if (!state.flags.includes('relations_reouvertes_surface')) state.flags.push('relations_reouvertes_surface');
  },
  getDynamicNarrative: (gs) => {
    // --- VERSION NORMALE ---
    let text = "";

    if (gs.hasFlag('remontee_defi')) {
      text += "Ton défi a glacé le sang de l’assassin. Il t’a hissée avec une brutalité respectueuse, presque cérémonielle. Le contact de son gantelet sur ton poignet a laissé une empreinte plus longue que nécessaire.\n\n";
    } else if (gs.hasFlag('remontee_rassure')) {
      text += "Ton contact a apaisé les tremblements du prêtre. Il t’a soulevée avec une dévotion renouvelée, comme si chaque centimètre te ramenant à la surface était un serment silencieux.\n\n";
    } else if (gs.hasFlag('remontee_seule')) {
      text += "Tu as vaincu l’abîme à la seule force de ta volonté. Tes doigts saignent encore, la pierre a pris son tribut, mais tu es sortie sans dette.\n\n";
    } else if (gs.hasFlag('remontee_froid')) {
      text += "Ta rebuffade a rétabli une distance clinique dès que tes pieds ont touché le sol stable. Le corps qui t’avait retenue n’existe plus.\n\n";
    }

    if (gs.hasFlag('jalousie_kaelen_vue')) {
      text += "Kaelen a encore ce sourire trop content de l’absence d’Alistair — un écho de la galerie. Il ne l’a pas oublié.\n\n";
    } else if (gs.hasFlag('jalousie_alistair_vue')) {
      text += "Alistair jette un regard en arrière, comme s’il cherchait encore l’ombre de Kaelen. La jalousie de la galerie n’est pas retombée.\n\n";
    }

    text += "Vous percez enfin la neige dure. La brume rampe sur les pavés morts des ruines. Au-dessus, l’étoile d’Essinay perce les nuages d’un œil froid et patient.\n\n";

    if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
      text += "Alistair et Kaelen t’attendent déjà, essoufflés, la neige encore fraîche sur leurs épaules. Ils ont contourné la faille par un ancien escalier de service à demi effondré. Ils n’ont pas voulu te laisser distancer seule — un réflexe de survie plus que de galanterie, mais un réflexe tout de même.\n\n";
      text += "Les deux rivaux font un pas simultané vers toi, guettant un signe, un verdict, une faille dans ton silence. Tu es le centre de gravité de leur conflit.";
    } else if (gs.hasFlag('avec_ombre')) {
      text += "Alistair marche à l’écart, blessé par ta proximité avec l’Ombre. Une silhouette d’or attend au bord du gouffre. Ses yeux se rivènt immédiatement sur la main de Kaelen encore posée — ou qui vient de se retirer — de ton armure.\n\n";
      text += "« Tu n’as rien ? » demande le prêtre. Sa voix vibre d’une jalousie sourde qu’aucune prière ne peut masquer. Le secret de la fresque pèse entre vous trois comme une troisième présence.";
    } else if (gs.hasFlag('avec_eclaireur')) {
      text += "Kaelen est déjà avec vous lorsqu’un pan de galerie débouche sur la surface. Il garde quelques pas de côté — assez pour ne pas marcher dans la lumière d’Alistair, pas assez pour prétendre qu’il voyage seul. Son regard glisse sur votre proximité avec un détachement feint qui ne trompe personne.\n\n";
      text += "« Le dévot a donc décidé de garder sa sainte route jusqu’au bout, » persifle l’assassin en faisant danser sa dague entre ses doigts. L’hostilité territoriale est immédiate, presque animale.";
    }

    return text;
  },
  choices: [

    { 
      key: 'A', 
      condition: (gs) => !gs.hasFlag('voie_solo') && !gs.hasFlag('voie_solo_profonde'), 
      text: "Taire la vérité de la Fresque. Lancer un regard complice à ton compagnon de chute.", 
      effects: [
        { type: "SET_FLAG", target: "secret_partage" },
        { type: "SET_FLAG", target: "triangulation_secret_garde" }
      ],
      next: 'ACTE1_07B_REACTION_TRIANGULATION' 
    },
    { 
      key: 'B', 
      condition: (gs) => !gs.hasFlag('voie_solo') && !gs.hasFlag('voie_solo_profonde'), 
      text: "Révéler la fresque. « Votre Église a récrit l’histoire. J’ai gelé ce monde pour le sauver. »", 
      effects: [
        { type: "SET_FLAG", target: "verite_eclatante" },
        { type: "SET_FLAG", target: "triangulation_verite_dite" }
      ],
      next: 'ACTE1_07B_REACTION_TRIANGULATION' 
    },
    { 
      key: 'S', 
      condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'), 
      text: "Fendre le duo sans leur accorder un regard. « En route. Le temps presse. »", 
      effects: [
        { type: "ADD_GAUGE", target: "volonte", value: 1 },
        { type: "ADD_GAUGE", target: "presence_S", value: 1 },
        { type: "SET_FLAG", target: "solo_froid_surface" },
        { type: "SET_FLAG", target: "triangulation_coupe_court" }
      ],
      next: 'ACTE1_07B_REACTION_TRIANGULATION' 
    }
  ]
},

'ACTE1_07K_RETROUVAILLES_KAELEN': {
  sceneNumber: '1.07K',
  chapter: 1,
  title: "Ce qui n'était pas dans le gouffre",
  mood: 'romance',
  relationFocus: 'O',
  getDynamicNarrative: (gs) => {
    let text = "Kaelen ne te facilite pas la tâche. Il attend que tu aies quitté la lumière d'Alistair avant de ralentir, puis continue encore quelques pas comme s'il n'avait rien remarqué.\n\n";
    text += "« Tu voulais me parler. » Ce n'est pas une question.\n\n";
    text += "La neige craque sous vos bottes. Derrière vous, Alistair garde assez de distance pour prétendre qu'il ne surveille pas la conversation.\n\n";
    text += "Kaelen tourne enfin la tête. Son regard descend une seconde vers les traces de poussière claire laissées sur ton armure par les catacombes. « Je ne vais pas te demander ce qui s'est passé en bas. Si tu veux que je le sache, tu me le diras. »\n\n";
    text += "Il pourrait plaisanter. Revendiquer. Marchander. Il ne le fait pas. Cette retenue te surprend davantage qu'une jalousie ouverte.\n\n";
    if (gs.getGauge('lien_O') >= 2) text += "« Mais ne confonds pas mon silence avec de l'indifférence. » Sa voix baisse. « Je suis mauvais à beaucoup de choses. Attendre en fait partie. »";
    else text += "« Alors ? » Un coin de sa bouche remonte. « Tu as traversé un gouffre avec un prêtre et tu reviens chercher la mauvaise fréquentation. Je devrais augmenter mon tarif. »";
    return text;
  },
  choices: [
    {
      key:'K_REVENUE',
      text:"« Je suis revenue vers toi. Pour l'instant, ça devrait te suffire. »",
      response: "Kaelen te fixe une seconde de trop. Puis son sourire se défait, juste assez pour laisser passer quelque chose de plus brut. « Pour l’instant, oui. » Il se remet en marche à ton rythme. « Mais ne t’habitue pas à me voir accepter un paiement aussi vague. »",
      effects:[
        {type:"ADD_GAUGE",target:"lien_O",value:2},
        {type:"ADD_GAUGE",target:"distance_O",value:-2},
        {type:"SET_FLAG",target:"kaelen_retrouvailles_choisi"},
        {type:"SET_FLAG",target:"focus_romantique_O"}
      ],
      next:'ACTE1_08_SECRET'
    },
    {
      key:'K_VERITE',
      text:"Lui raconter seulement ce que la fresque t'a fait ressentir. Pas ce qu'Alistair a fait.",
      response: "Kaelen n’interrompt pas une seule fois. Quand tu termines, il regarde devant lui plutôt que vers toi. « Donc ce n’était pas une image. C’était une blessure qui savait où frapper. » Sa mâchoire se serre. « D’accord. Je ne te demanderai pas ce que le prêtre a fait. Pas aujourd’hui. »",
      effects:[
        {type:"ADD_GAUGE",target:"lien_O",value:1},
        {type:"ADD_GAUGE",target:"memoire_kalthar",value:1},
        {type:"SET_FLAG",target:"kaelen_fresque_confiee"},
        {type:"SET_FLAG",target:"focus_romantique_O"}
      ],
      next:'ACTE1_08_SECRET'
    },
    {
      key:'K_PROVOQUE',
      text:"« Jaloux, assassin ? »",
      response: "« Jaloux ? » Il goûte le mot comme s’il calculait sa valeur. « Ça supposerait que je revendique quelque chose. Je déteste seulement les marchés où je ne connais pas les autres offres. »",
      effects:[
        {type:"ADD_GAUGE",target:"affinite_ombre",value:2},
        {type:"SET_FLAG",target:"jalousie_kaelen_contenue"},
        {type:"SET_FLAG",target:"focus_romantique_O"}
      ],
      next:'ACTE1_08_SECRET'
    },
    {
      key:'K_DISTANCE',
      text:"« Je voulais seulement vérifier que tu étais vivant. N'en fais pas un contrat. »",
      response: "Le sourire de Kaelen revient, mais il n’atteint pas complètement ses yeux. « Dommage. J’avais déjà préparé les clauses. » Il recule d’un demi-pas, te rendant exactement l’espace que tu viens de réclamer. « Vivant, donc. Vérification terminée. »",
      effects:[
        {type:"ADD_GAUGE",target:"volonte",value:1},
        {type:"ADD_GAUGE",target:"distance_O",value:1},
        {type:"SET_FLAG",target:"kaelen_retrouvailles_distance"}
      ],
      next:'ACTE1_08_SECRET'
    }
  ]
},

'ACTE1_07E_RETROUVAILLES_ALISTAIR': {
  sceneNumber: '1.07E',
  chapter: 1,
  title: "Hors de l'ombre",
  mood: 'romance',
  relationFocus: 'E',
  getDynamicNarrative: (gs) => {
    let text = "Alistair comprend que tu viens vers lui avant que tu prononces son nom. Son premier réflexe est de se redresser, comme devant un autel. Le second est plus humain : il desserre enfin la main autour de son sceptre.\n\n";
    text += "Kaelen poursuit sa marche sur le flanc du groupe. Il ne se retourne pas. Ce refus même de regarder suffit à dire qu'il a remarqué.\n\n";
    text += "« Vous n'avez aucune dette envers moi pour ce qui s'est passé en bas », dit Alistair. Puis il ferme les yeux une seconde. « Pardon. Tu n'as aucune dette envers moi. »\n\n";
    text += "Le tutoiement lui coûte davantage que le combat. Il attend, sans avancer la main.\n\n";
    if (gs.getGauge('lien_E') >= 2) text += "« J'essaie de comprendre comment rester près de toi sans décider à ta place de la distance qui nous sépare. »";
    else text += "« Si tu es venue demander des réponses, j'en ai moins qu'avant la chute. C'est peut-être la première chose vraie que je puisse t'offrir. »";
    return text;
  },
  choices: [
    {
      key:'E_RESTE',
      text:"« Alors reste. Sans serment. Sans cage. »",
      response: "Alistair baisse les yeux comme si ces quatre mots pesaient davantage qu’un ordre. Quand il relève la tête, son sceptre n’est plus entre vous. « Je peux essayer. » Un souffle. « Rester sans transformer ma peur en devoir. » Il prend place à ton côté, pas devant toi. ",
      effects:[
        {type:"ADD_GAUGE",target:"lien_E",value:2},
        {type:"ADD_GAUGE",target:"distance_E",value:-2},
        {type:"ADD_GAUGE",target:"volonte",value:1},
        {type:"SET_FLAG",target:"alistair_retrouvailles_choisi"},
        {type:"SET_FLAG",target:"focus_romantique_E"}
      ],
      next:'ACTE1_08_SECRET'
    },
    {
      key:'E_DOUTE',
      text:"Lui demander ce que la fresque a brisé dans sa foi.",
      response: "Alistair garde le silence assez longtemps pour que tu croies qu’il va esquiver. « Elle n’a pas brisé ma foi. » Ses doigts quittent enfin son insigne. « Elle a brisé la certitude que ma foi et l’Ordre étaient la même chose. Je ne sais pas encore lequel des deux j’ai servi toute ma vie. »",
      effects:[
        {type:"ADD_GAUGE",target:"lien_E",value:1},
        {type:"ADD_GAUGE",target:"affinite_eclaireur",value:1},
        {type:"SET_FLAG",target:"alistair_doute_partage"},
        {type:"SET_FLAG",target:"focus_romantique_E"}
      ],
      next:'ACTE1_08_SECRET'
    },
    {
      key:'E_KAELEN',
      text:"« Kaelen compte aussi. Je ne te mentirai pas là-dessus. »",
      response: "Une tension traverse le visage d’Alistair, brève mais impossible à manquer. Son regard glisse vers Kaelen, puis revient à toi. « Je préfère une vérité qui me déplaît à une place obtenue par omission. » Sa main se resserre une fois sur le sceptre avant de se détendre. « Je ferai avec ce que tu choisis de me donner. »",
      effects:[
        {type:"ADD_GAUGE",target:"volonte",value:2},
        {type:"SET_FLAG",target:"alistair_sait_kaelen_compte"},
        {type:"SET_FLAG",target:"jalousie_alistair_contenue"},
        {type:"SET_FLAG",target:"focus_romantique_E"}
      ],
      next:'ACTE1_08_SECRET'
    },
    {
      key:'E_DISTANCE',
      text:"« Je voulais savoir si tu avais survécu. Rien de plus. »",
      response: "Alistair acquiesce sans chercher à réduire la distance. « Alors tu as ta réponse. » Il inspire, puis ajoute plus doucement : « Et merci d’avoir voulu la connaître. Je ne prendrai pas cela pour une promesse que tu n’as pas faite. »",
      effects:[
        {type:"ADD_GAUGE",target:"distance_E",value:1},
        {type:"SET_FLAG",target:"alistair_retrouvailles_distance"}
      ],
      next:'ACTE1_08_SECRET'
    }
  ]
},

'ACTE1_08B_BIVOUAC_LISIERE': {
  sceneNumber: '1.08B',
  chapter: 1,
  title: "La Lisière des Pins Noirs",
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Foret_pins_noirs_202606191344.jpeg",
  onEnter: (state) => {
    if (!state || !Array.isArray(state.flags)) return;
    const f = state.flags;
    const hasO = f.includes('bivouac_feu_O');
    const hasE = f.includes('bivouac_feu_E');
    const firstO = f.includes('lisiere_premier_O');
    const firstE = f.includes('lisiere_premier_E');
    const orderKnown = f.includes('lisiere_ordre_O_puis_E') || f.includes('lisiere_ordre_E_puis_O');
    const directBoth = f.includes('lisiere_orientation_DEUX');

    if (!directBoth && !firstO && !firstE) {
      if (hasO && !hasE) f.push('lisiere_premier_O');
      else if (hasE && !hasO) f.push('lisiere_premier_E');
    }

    if (!directBoth && hasO && hasE && !orderKnown) {
      if (firstO) f.push('lisiere_ordre_O_puis_E');
      else if (firstE) f.push('lisiere_ordre_E_puis_O');
      if (!state.gauges) state.gauges = {};
      state.gauges.tension_triangle = Math.max(0, Number(state.gauges.tension_triangle || 0) + 1);
    }
  },
  getDynamicNarrative: (gs) => {
    // V51.5.0 — un retour du lac est distinct d'un rapprochement au feu.
    if (gs.hasFlag('lisiere_retour_lyra_K')) {
      return "Le feu réapparaît entre les troncs. Kaelen ne plaisante toujours pas. Il jette une dernière fois les yeux vers le lac. « On a vu la même chose. Ça suffit pour cette nuit. » Fen se roule près des braises, mais garde une oreille tournée vers le nord-est.";
    }
    if (gs.hasFlag('lisiere_retour_lyra_E')) {
      return "Vous retrouvez le feu sans avoir trouvé de nom pour la silhouette. Alistair garde son insigne éteint. « Je préfère te dire que je ne sais pas plutôt que d'inventer une certitude. » Fen se couche près des braises, le museau encore tourné vers le lac.";
    }
    if (gs.hasFlag('lisiere_retour_lyra_solo')) {
      return "Tu retrouves le feu avec la vibration du lac encore dans les os. Fen vient contre ta botte. Personne ne transforme ton silence en question.";
    }

    // V51.7.6 — si "les deux" a été choisi dans Cendres sous la Neige,
    // l'entrée à la Lisière doit payer ce choix immédiatement, avant tout beat secondaire.
    if (gs.hasFlag('lisiere_orientation_DEUX') && !gs.hasFlag('lisiere_interaction_active')) {
      let t = "La forêt de pins noirs s'ouvre comme une mâchoire sur le seuil des Terres Basses. Sous les branches, le premier feu prend mal dans l'humidité.\n\n";
      t += "Tu ne choisis aucun bord de la clairière. Tu t'assieds entre Kaelen et Alistair, assez près de chacun pour que le geste ne puisse pas être pris pour un accident.\n\n";
      t += "Kaelen déplace ses dagues vers l'extérieur du cercle au lieu de les garder entre vous. Alistair commence à déplier sa cape, hésite, puis la pose à plat derrière vous trois plutôt que sur tes seules épaules. Aucun ne gagne la place. Aucun n'est rejeté.\n\n";
      t += "Fen tourne une fois autour de vos bottes avant de se coucher près des braises. Le silence qui suit est moins confortable qu'un tête-à-tête : chacun doit accepter que ta proximité ne soit pas une récompense à posséder.\n\n";
      if (!gs.hasFlag('lyra_prescience') && !gs.hasFlag('_lyra_echo_vu')) {
        t += "Puis le vent porte une note aiguë depuis le nord-est, trop pure pour être un cri d'oiseau. Fen relève le museau.";
      }
      return t;
    }

    // V50.5 — après un rapprochement, ne pas rejouer toute l'introduction.
    // La scène devient un beat court permettant d'approcher l'autre compagnon.
    if (gs.hasFlag('lisiere_interaction_active')) {
      let beat = "";
      const o = gs.hasFlag('bivouac_feu_O');
      const e = gs.hasFlag('bivouac_feu_E');
      if (o && e && gs.hasFlag('lisiere_orientation_DEUX')) {
        beat += "Tu as pris place entre eux plutôt que d'aller d'un bord du feu à l'autre. Kaelen a déplacé ses lames vers l'extérieur. Alistair a gardé sa cape pliée sur ses genoux.\n\n";
        beat += "Ils se regardent une fois, puis te regardent toi. Pas de victoire, pas de défaite — seulement la difficulté nouvelle d'accepter que ta proximité puisse exister sans exclusivité.";
      } else if (o && e && gs.hasFlag('lisiere_ordre_O_puis_E')) {
        beat += "Tu quittes la chaleur sèche de Kaelen pour rejoindre Alistair de l’autre côté du feu. Le mouvement est assez simple pour n’appartenir qu’à toi.\n\n";
        beat += "La pierre de Kaelen cesse de courir sur le fil de sa dague. Une seconde. Son sourire revient, plus mince. « Je vois. » Il ne te réclame pas. Il enregistre seulement le choix.\n\n";
        beat += "Alistair te fait une place sans triomphe. Sa lumière baisse d’un ton, comme s’il refusait de transformer ton approche en victoire.";
      } else if (o && e && gs.hasFlag('lisiere_ordre_E_puis_O')) {
        beat += "Tu quittes la lumière retenue d’Alistair pour rejoindre Kaelen près des braises. Le déplacement ne demande aucune permission.\n\n";
        beat += "Alistair perd un mot au milieu de sa prière. Il le reprend trop calmement. Sa cape reste pourtant près du feu au lieu de retourner sur ses épaules.\n\n";
        beat += "Kaelen décale sa dague pour te laisser de la place. Aucun sourire de conquête. Seulement ce regard noir qui demande ce que tu feras ensuite.";
      } else if (o) {
        beat += "Tu t’es rapprochée de Kaelen. La chaleur de son épaule tranche avec ton givre. Il ne transforme pas le geste en contrat.\n\n";
        if (companionPresentE(gs)) beat += "De l’autre côté du feu, Alistair a vu. Il baisse les yeux vers son insigne, puis les relève vers toi : blessure minuscule, porte toujours ouverte.";
      } else if (e) {
        beat += "Tu t’es rapprochée d’Alistair. Sa lumière reste basse, contenue, assez proche pour réchauffer sans encercler.\n\n";
        if (companionPresentO(gs)) beat += "Kaelen a vu le geste. Son pouce s’immobilise sur la garde de sa dague, puis reprend son mouvement : irritation brève, curiosité intacte.";
      } else {
        beat += "Le feu craque entre vous. Rien n’est encore choisi.";
      }
      if (gs.hasFlag('lisiere_romance_O_ouverte')) {
        beat += "\n\nLe regard de Kaelen a changé depuis que tu as choisi de ne pas laisser toute la distance intacte. Rien n’est promis ; quelque chose est désormais possible.";
      }
      if (gs.hasFlag('lisiere_romance_E_ouverte')) {
        beat += "\n\nAlistair ne cache plus tout à fait ce qui existe derrière sa retenue. Tu n’as fait aucun serment ; la possibilité, elle, est réelle.";
      }
      if (!gs.hasFlag('lyra_prescience') && !gs.hasFlag('_lyra_echo_vu')) {
        beat += "\n\nLa note aiguë revient du nord-est. Fen lève le museau.";
      }
      return beat;
    }

    let text = "La forêt de pins noirs s'ouvre comme une mâchoire sur le seuil des Terres Basses. L'air y est plus dense, chargé d'une résine qui masque l'odeur de la cendre. Vous campez dans une clairière où le givre n'a pas encore perdu ses droits, mais où la boue commence à poindre sous la neige.\n\n";
    
    if (gs.hasFlag('avec_ombre')) {
  if (gs.hasFlag('O_distant_1')) {
    if (gs.hasFlag('dague_kaelen_prise')) {
      text += "Kaelen s'installe à l'opposé du feu, sa dague restante dressée entre vous comme une clôture invisible. Il aiguise la lame depuis une heure, le regard rivé sur l'obscurité au-delà des flammes. Il ne t'a pas adressé la parole depuis la surface.\n\n";
    } else {
      text += "Kaelen s'installe à l'opposé du feu, ses dagues dressées entre vous comme une clôture invisible. Il aiguise une lame depuis une heure, le regard rivé sur l'obscurité au-delà des flammes. Il ne t'a pas adressé la parole depuis la surface.\n\n";
    }
  } else {
    text += "Kaelen occupe l'espace avec une présence animale, posant son équipement près de toi sans demander la permission. Ses yeux glissent sur toi, calculateurs, mais moins hostiles qu'hier.\n\n";
  }
}
    
    if (gs.hasFlag('avec_eclaireur')) {
      if (gs.hasFlag('E_distant_1')) {
        text += "Alistair prie à genoux, le dos tourné, son insigne caché dans ses mains comme un secret qu'il te refuse. Sa cape est tendue entre deux pins pour former une paroi, un cloisonnement physique de sa retenue.\n\n";
      } else {
        text += "Alistair s'affaire autour du feu avec une sollicitude maladroite, disposant sa cape sur la pierre la plus plane pour t'offrir un siège. Ses gestes hésitent entre le chevalier et le pénitent.\n\n";
      }
    }
    
    // Après les retrouvailles, compagnon principal != présence physique.
    // Le troisième membre du groupe reste visible même quand la scène focalise une relation.
    if (gs.hasFlag('relations_reouvertes_surface')) {
      if (gs.hasFlag('avec_ombre') && !gs.hasFlag('avec_eclaireur')) {
        text += "Alistair garde l’autre bord du feu. Assez loin pour respecter la conversation, assez près pour rappeler que le voyage se fait désormais à trois.\n\n";
      } else if (gs.hasFlag('avec_eclaireur') && !gs.hasFlag('avec_ombre')) {
        text += "Kaelen reste à la lisière de la clairière, officiellement occupé à surveiller les arbres. Le fait qu’il entende tout n’échappe à personne.\n\n";
      }
    }

    if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
      text += "Fen creuse dans la neige et en ressort une racine gelée qu'il ronge avec une concentration absurde. Kaelen et Alistair ont choisi chacun une extrémité du camp : présents, mais sans prétendre devenir tes guides.\n\n";
    }

    // V26.3.7 — écho rapprochement feu
    if (gs.hasFlag('bivouac_feu_O_rapproche')) {
      text += "Kaelen n’a pas rouvré la distance. L’épaule où ta main s’est posée reste un point de chaleur qu’il ne commente pas.\n\n";
    } else if (gs.hasFlag('bivouac_feu_O_proche')) {
      text += "Le silence près du feu tient. Kaelen n’a pas bougé d’un cran — assez près pour le partage, assez loin pour le calcul.\n\n";
    }
    if (gs.hasFlag('bivouac_feu_E_rapproche')) {
      text += "Alistair a laissé sa cape où elle est. Le geste de restitution a tenu : il te regarde sans muraille, encore un peu trop près de l’aveu.\n\n";
    } else if (gs.hasFlag('bivouac_feu_E_proche')) {
      text += "Tes doigts ont frôlé les siens en t’asseyant. Alistair n’en a rien dit — mais sa lumière pulse un peu plus bas, comme pour ne pas te forcer.\n\n";
    }
    

    if (gs.hasFlag('lisiere_ordre_O_puis_E')) {
      text += "Quand tu te rapproches ensuite d’Alistair, la pierre de Kaelen cesse de courir sur le fil de sa dague. Une seule seconde. Son sourire revient aussitôt, plus mince. « Je vois. » Rien de plus — mais il a parfaitement compris.\n\n";
    } else if (gs.hasFlag('lisiere_ordre_E_puis_O')) {
      text += "Quand tu rejoins ensuite Kaelen, Alistair perd un mot au milieu de sa prière. Il le reprend sans commentaire, trop calmement. Sa cape reste pourtant près du feu au lieu de retourner sur ses épaules.\n\n";
    }

    if (gs.hasFlag('lyra_prescience') || gs.hasFlag('_lyra_echo_vu')) {
      text += "La note du nord-est s’est tue. Le lac gelé a rendu ce qu’il avait à montrer. Fen reste calme, le museau tourné vers le feu.\n\n";
      if (gs.hasFlag('lyra_confie_K')) {
        text += "Kaelen n’a pas commenté la silhouette. Il a seulement resserré sa garde un instant — assez pour prouver qu’il avait vu, pas assez pour en faire un rapport.\n\n";
      } else if (gs.hasFlag('lyra_confie_E')) {
        text += "Alistair jette encore un regard vers le nord-est, comme s’il cherchait une bénédiction ou un exorcisme. Tu lui as posé la question ; il n’a pas eu de réponse nette à te donner.\n\n";
      }
    } else {
      text += "Le vent porte par intermittences une note aiguë, trop pure pour être un cri d’oiseau. Elle vient du nord-est, là où la forêt dégringole vers des vallées inconnues. Fen lève le museau, les vibrisses frémissantes, mais ne siffle pas.\n\n";
      text += "La note s’attarde une seconde de trop. Comme si quelque chose, ou quelqu’un, avait reconnu ton souffle.\n\n";
      
        text += "Fen gronde très bas. Pas de peur. De reconnaissance.";
      
    }
    
    return text;
  },
  choices: [
  // --- Rapprochement Kaelen ---
  {
    key: 'O_FEU',
    condition: (gs) => companionPresentO(gs) && gs.hasFlag('O_distant_1') && !gs.hasFlag('bivouac_feu_O') && !gs.hasFlag('lisiere_orientation_O') && !gs.hasFlag('lisiere_orientation_E') && !gs.hasFlag('lisiere_orientation_DEUX') && !gs.hasFlag('lisiere_orientation_SOLO'),
    text: "Contourner les lames de Kaelen et poser ta main sur son épaule. « Le feu est plus chaud de ce côté, assassin. »",
    effects: [
      { type: "ADD_GAUGE", target: "lien_O", value: 1 },
      { type: "REMOVE_FLAG", target: "O_distant_1" },
      { type: "SET_FLAG", target: "bivouac_feu_O" },
      { type: "SET_FLAG", target: "bivouac_feu_O_rapproche" },
      { type: "SET_FLAG", target: "lisiere_orientation_O" },
      { type: "SET_FLAG", target: "lisiere_interaction_active" }
    ],
    next: 'ACTE1_08B_BIVOUAC_LISIERE'
  },
  {
    key: 'O_FEU_OK',
    condition: (gs) => companionPresentO(gs) && !gs.hasFlag('O_distant_1') && !gs.hasFlag('bivouac_feu_O') && !gs.hasFlag('lisiere_orientation_O') && !gs.hasFlag('lisiere_orientation_E') && !gs.hasFlag('lisiere_orientation_DEUX') && !gs.hasFlag('lisiere_orientation_SOLO'),
    text: "Se rapprocher de Kaelen. T'asseoir près de lui et partager le silence du feu.",
    effects: [
      { type: "ADD_GAUGE", target: "lien_O", value: 1 },
      { type: "SET_FLAG", target: "bivouac_feu_O" },
      { type: "SET_FLAG", target: "bivouac_feu_O_proche" },
      { type: "SET_FLAG", target: "lisiere_orientation_O" },
      { type: "SET_FLAG", target: "lisiere_interaction_active" }
    ],
    next: 'ACTE1_08B_BIVOUAC_LISIERE'
  },

  // --- Rapprochement Alistair ---
  {
    key: 'E_FEU',
    condition: (gs) => companionPresentE(gs) && gs.hasFlag('E_distant_1') && !gs.hasFlag('bivouac_feu_E') && !gs.hasFlag('lisiere_orientation_O') && !gs.hasFlag('lisiere_orientation_E') && !gs.hasFlag('lisiere_orientation_DEUX') && !gs.hasFlag('lisiere_orientation_SOLO'),
    text: "Défaire sa paroi de cape et la lui rendre. « Je n'ai pas besoin de murailles, prêtre. J'ai besoin de tes yeux. »",
    effects: [
      { type: "ADD_GAUGE", target: "lien_E", value: 1 },
      { type: "REMOVE_FLAG", target: "E_distant_1" },
      { type: "SET_FLAG", target: "bivouac_feu_E" },
      { type: "SET_FLAG", target: "bivouac_feu_E_rapproche" },
      { type: "SET_FLAG", target: "lisiere_orientation_E" },
      { type: "SET_FLAG", target: "lisiere_interaction_active" }
    ],
    next: 'ACTE1_08B_BIVOUAC_LISIERE'
  },
  {
    key: 'E_FEU_OK',
    condition: (gs) => companionPresentE(gs) && !gs.hasFlag('E_distant_1') && !gs.hasFlag('bivouac_feu_E') && !gs.hasFlag('lisiere_orientation_O') && !gs.hasFlag('lisiere_orientation_E') && !gs.hasFlag('lisiere_orientation_DEUX') && !gs.hasFlag('lisiere_orientation_SOLO'),
    text: "Se rapprocher d'Alistair. Accepter sa cape et laisser tes doigts effleurer les siens en t'asseyant.",
    effects: [
      { type: "ADD_GAUGE", target: "lien_E", value: 1 },
      { type: "SET_FLAG", target: "bivouac_feu_E" },
      { type: "SET_FLAG", target: "bivouac_feu_E_proche" },
      { type: "SET_FLAG", target: "lisiere_orientation_E" },
      { type: "SET_FLAG", target: "lisiere_interaction_active" }
    ],
    next: 'ACTE1_08B_BIVOUAC_LISIERE'
  },


  {
    key: 'OE_FEU',
    condition: (gs) => companionPresentO(gs) && companionPresentE(gs)
      && !gs.hasFlag('lisiere_orientation_O')
      && !gs.hasFlag('lisiere_orientation_E')
      && !gs.hasFlag('lisiere_orientation_DEUX')
      && !gs.hasFlag('lisiere_orientation_SOLO'),
    text: "T’asseoir entre Kaelen et Alistair. Ne choisir aucun côté du feu.",
    response: "Le silence change de forme. Kaelen range sa dague vers l’extérieur. Alistair garde sa cape pliée. Aucun ne peut prétendre que tu as glissé vers lui par défaut.",
    effects: [
      { type: "ADD_GAUGE", target: "lien_O", value: 1 },
      { type: "ADD_GAUGE", target: "lien_E", value: 1 },
      { type: "ADD_GAUGE", target: "tension_triangle", value: 1 },
      { type: "SET_FLAG", target: "bivouac_feu_O" },
      { type: "SET_FLAG", target: "bivouac_feu_E" },
      { type: "SET_FLAG", target: "lisiere_orientation_DEUX" },
      { type: "SET_FLAG", target: "lisiere_interaction_active" }
    ],
    next: 'ACTE1_08B_BIVOUAC_LISIERE'
  },

  {
    key: 'OE_FEU_LIEN',
    condition: (gs) => companionPresentO(gs) && companionPresentE(gs)
      && gs.hasFlag('lisiere_orientation_DEUX')
      && !gs.hasFlag('lisiere_trio_vu'),
    text: "Rester avec eux deux. Voir ce que devient le silence quand personne n’obtient l’exclusivité.",
    intent:'confiance',target:'Kaelen & Alistair',importance:'major',
    next: 'LIEN_LISIERE_DEUX'
  },

  // --- V51.3 : après l'approche, le joueur peut explicitement initier la romance ---
  {
    key: 'O_FEU_ROMANCE',
    condition: (gs) => companionPresentO(gs)
      && gs.hasFlag('bivouac_feu_O')
      && gs.hasFlag('lisiere_orientation_O')
      && !gs.hasFlag('lisiere_romance_O_vu'),
    text: "Rester avec Kaelen. Voir si la proximité peut devenir autre chose.",
    next: 'LIEN_LISIERE_KAELEN'
  },
  {
    key: 'E_FEU_ROMANCE',
    condition: (gs) => companionPresentE(gs)
      && gs.hasFlag('bivouac_feu_E')
      && gs.hasFlag('lisiere_orientation_E')
      && !gs.hasFlag('lisiere_romance_E_vu'),
    text: "Rester avec Alistair. Lui laisser la possibilité de répondre autrement qu’en prêtre.",
    next: 'LIEN_LISIERE_ALISTAIR'
  },


  // --- V28 : Solo habité / traces ---
  {
    key: 'V28_O_TRACE',
    condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
      && (gs.getGauge('presence_O') >= 3 || gs.getGauge('affinite_ombre') >= 4)
      && !gs.hasFlag('v28_trace_O_vu'),
    text: "Kaelen est à l'écart. T'asseoir près de lui sans demander la permission.",
    effects: [
      { type: "ADD_GAUGE", target: "presence_O", value: 2 },
      { type: "ADD_GAUGE", target: "lien_O", value: 1 },
      { type: "SET_FLAG", target: "v28_trace_O_vu" }
    ],
    next: 'V28_SOLO_KAELEN'
  },
  {
    key: 'V28_E_TRACE',
    condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'))
      && (gs.getGauge('presence_E') >= 3 || gs.getGauge('affinite_eclaireur') >= 4)
      && !gs.hasFlag('v28_trace_E_vu'),
    text: "Rester dans la lumière d'Alistair. Pas près de lui. Juste assez pour être vue.",
    effects: [
      { type: "ADD_GAUGE", target: "presence_E", value: 2 },
      { type: "ADD_GAUGE", target: "lien_E", value: 1 },
      { type: "SET_FLAG", target: "v28_trace_E_vu" }
    ],
    next: 'V28_SOLO_ALISTAIR'
  },

  // --- Solo ---
  {
    key: 'S_MEDITE',
    condition: (gs) => (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) && !gs.hasFlag('bivouac_solo_lisiere'),
    text: "Fermer les yeux et laisser le froid du sol monter en toi.",
    effects: [
      { type: "ADD_GAUGE", target: "instabilite", value: 2 },
      { type: "SET_FLAG", target: "bivouac_solo_lisiere" }
    ],
    next: 'ACTE1_08B_BIVOUAC_LISIERE'
  },

  // --- Suivre le chant (une seule fois) ---
  {
    key: 'SUIVRE_CHANT',
    condition: (gs) => !gs.hasFlag('lyra_prescience') && !gs.hasFlag('_lyra_echo_vu'),
    text: "Suivre la note aiguë jusqu’au lac gelé que tu devines derrière les pins.",
    effects: [
      { type: "ADD_GAUGE", target: "instabilite", value: 3 },
      { type: "SET_FLAG", target: "lyra_prescience" },
      { type: "SET_FLAG", target: "_lyra_echo_vu" },
      { type: "REMOVE_FLAG", target: "lisiere_interaction_active" },
      { type: "SET_FLAG", target: "lisiere_exploration_active" }
    ],
    next: 'ACTE1_08B_LYRA_ECHO'
  },

  // --- Sortie ---
  {
    key: 'REPARTIR',
    condition: (gs) =>
      gs.hasFlag('bivouac_feu_O') ||
      gs.hasFlag('bivouac_feu_E') ||
      gs.hasFlag('bivouac_solo_lisiere') ||
      gs.hasFlag('lyra_prescience'),
    text: "Dormir une heure et reprendre la route avant l’aube.",
    effects: [
      { type: "SET_FLAG", target: "bivouac_lisiere_fini" },
      { type: "REMOVE_FLAG", target: "lisiere_interaction_active" },
      { type: "REMOVE_FLAG", target: "lisiere_exploration_active" },
      { type: "REMOVE_FLAG", target: "lisiere_retour_lyra_K" },
      { type: "REMOVE_FLAG", target: "lisiere_retour_lyra_E" },
      { type: "REMOVE_FLAG", target: "lisiere_retour_lyra_solo" }
    ],
    next: 'ACTE2_01_RENCONTRE_SILAS_1'
  }
]
},


  // V51.3 — opportunités romantiques explicites après un rapprochement physique.
  // Approcher quelqu'un n'enferme jamais la route : le joueur choisit ensuite
  // s'il veut faire monter la tension romantique ou rester dans la proximité simple.

'ACTE1_07B_REACTION_TRIANGULATION': {
  sceneNumber:'1.07B',
  chapter:1,
  title:"Ce qui reste entre vous",
  mood:'tension',
  image:"https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Surface_brumeuse_enneig%C3%A9e_202606191344.jpeg",
  spriteLeft:(gs)=>companionPresentO(gs)
    ? "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_KAELEN_PERSILFLANT.png"
    : "",
  spriteRight:(gs)=>companionPresentE(gs)
    ? "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_ALISTAIR_PROTECTEUR.png"
    : "",
  getDynamicNarrative:(gs)=>{
    if(gs.hasFlag('triangulation_secret_garde')){
      let t="Tu gardes la fresque pour toi — et pour celui qui était là lorsqu’elle s’est ouverte.\n\n";
      if(gs.hasFlag('avec_ombre')){
        t+="Ton regard rencontre celui de Kaelen. Il ne sourit pas. Sa dague cesse simplement de tourner entre ses doigts. Alistair voit l’échange et comprend qu’une porte vient de se fermer devant lui, sans savoir ce qu’elle contient.\n\n";t+="« Très bien, » dit-il après un silence. Son insigne reste dans sa paume au lieu de se lever entre vous.";
      } else if(gs.hasFlag('avec_eclaireur')){
        t+="Alistair reçoit ton regard sans triomphe. Ses doigts se referment une seconde sur son insigne, comme pour retenir la réponse qui lui vient. Kaelen suit l’échange et son amusement disparaît juste assez pour montrer qu’il a compris qu’il existe un secret dont il est exclu.\n\n";
        t+="« Charmant, » souffle-t-il. Il range pourtant sa dague au lieu d’en faire une menace.";
      } else {
        t+="Kaelen et Alistair comprennent au même instant que tu ne leur donneras rien de plus. Aucun des deux n’aime la limite. Aucun ne la franchit.";
      }
      return t;
    }
    if(gs.hasFlag('triangulation_verite_dite')){
      let t="Tu jettes la vérité entre eux comme une lame sur une table : l’Église a récrit l’histoire. Le givre n’était pas seulement une catastrophe. Tu l’as appelé pour sauver ce qui pouvait encore l’être.\n\n";
      t+="Alistair blanchit. Son pouce cherche le bord de son insigne puis s’arrête. « Si c’est vrai… » Il ne termine pas. Pour une fois, il ne transforme pas son doute en sermon.\n\n";
      t+="Kaelen, lui, ne regarde pas le prêtre. Il te regarde toi. « Voilà enfin quelque chose qui mérite qu’on arrête de jouer aux versions officielles. » Son ton reste mordant, mais sa dague redescend.";
      return t;
    }
    if(gs.hasFlag('triangulation_coupe_court')){
      return "Tu passes entre eux sans offrir de verdict. « En route. Le temps presse. »\n\nKaelen ouvre la bouche, puis la referme en voyant que tu ne ralentis pas. Alistair fait un pas pour te suivre et range son insigne sans prière. Leur rivalité reste derrière toi quelques secondes, forcée de choisir entre continuer à se mesurer et ne pas te perdre.\n\nIls te suivent.";
    }
    return "La brume glisse entre les pierres. Ce que tu viens de choisir a déplacé quelque chose entre vous trois, même si personne ne lui donne encore de nom.";
  },
  choices:[
    {
      key:'CONTINUE',
      text:"Reprendre la route.",
      effects:[{type:'SET_FLAG',target:'triangulation_payoff_vu'}],
      next:'ACTE1_08_SECRET'
    }
  ]
},

'ACTE1_08_SECRET': {
  sceneNumber: 'ACTE1_08_SECRET',
  chapter: 1,
  title: "Le Poids des Silences",
  mood: 'exploration',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Chemin_forestier_202606191344.jpeg",
  spriteLeft: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_KAELEN_RETRAIT.png",
  spriteRight: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/bg/URL_SPRITE_ALISTAIR_MARCHE.png",
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Le cortège s’ébranle vers la lisière des Terres Basses. La poudreuse laisse place à une boue gelée qui craque sous les pas. L’air sent le sapin mort et le fer froid.\n\n";

    if (gs.hasFlag('secret_partage') && gs.hasFlag('avec_ombre')) {
      text += "Alistair marche en éclaireur, mais ses yeux reviennent sans cesse vers toi. Il a intercepté ton regard muet avec l’assassin. Sa main se crispe sur son sceptre, rongée par la peur de te voir basculer définitivement vers les ombres.\n\n";
      text += "Kaelen, lui, marche presque à ton épaule. Il ne dit rien. Il n’a pas besoin.";
    } 
    else if (gs.hasFlag('secret_partage') && gs.hasFlag('avec_eclaireur')) {
      text += "Kaelen reste sur les flancs, sa silhouette se fondant dans le décor. Ta complicité naissante avec le clerc a refroidi son arrogance. Ses dagues s’aiguisent dans un crissement régulier, presque méditatif.\n\n";
      text += "Alistair, en tête, jette de temps à autre un regard en arrière. Comme pour s’assurer que tu es toujours là.";
    } 
    else if (gs.hasFlag('verite_eclatante')) {
      text += "Ta révélation a agi comme un poison lent. Alistair avance comme un automate, ses certitudes théologiques en ruine. Chaque pas semble lui coûter.\n\n";
      text += "À l’inverse, Kaelen t’observe avec un respect teinté de crainte. Tu n’es plus une proie magique. Tu es une souveraine politique — et potentiellement la plus dangereuse des deux.";
    } 
    else {
      text += "Tu imposes le rythme. Fen est blotti sous ta capuche, chaud contre ta clavicule. Derrière toi, les deux hommes te suivent comme des loups soumis à la meute, surveillant tes moindres gestes tout en se jaugeant mutuellement.";
    }

    return text;
  },
  choices: [
    { key: 'A', text: "« Les ruines appartiennent aux morts. Regardons devant. » Adopter un ton coupant.", effects: [{ type: "SET_FLAG", target: "ton_sarcasme" }], next: 'LIEN_MARCHE_1' },
{ key: 'B', text: "Laisser un soupir s'échapper. « L'histoire est gravée dans la pierre. Notre futur reste à écrire. »", effects: [{ type: "SET_FLAG", target: "ton_douceur" }], next: 'LIEN_MARCHE_1' }
  ]
},

'ACTE1_08B_LYRA_ECHO': {
  sceneNumber: '1.08B.L',
  chapter: 1,
  title: "L'Écho Opalin",
  mood: 'tension',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Lac_gelé_silhouette_202606191344.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "Tu avances entre les pins jusqu'à une dépression où l'eau dort sous une carapace de glace noire. La note s'est tue.\n\n";
    text += "Au centre du lac, une silhouette féminine est agenouillée, le dos tourné, les doigts enfoncés dans l'eau gelée jusqu'aux poignets. Elle ne porte que des voiles opalins qui ne semblent ni mouillés ni givrés. Ses cheveux flottent sans vent.\n\n";
    text += "Fen gronde dans ton col, un son bas et ancestral, pas de peur --- de reconnaissance.\n\n";
    text += "La silhouette se tourne. Tu ne vois pas son visage. Le clair de lune se brise sur ses yeux --- des prunelles sans pupilles, pareilles à des perles noires polies par la mer.\n\n";
    
    
      text += "Elle ouvre la bouche. Pas de son --- seulement une vibration qui fait vibrer la glace sous tes bottes, une question posée dans une langue que tes os comprennent mais que ta mémoire a oubliée.";
    
    
    return text;
  },
  choices: [
    {
      key: 'A',
      text: "Reculer sans un mot. Certaines visions ne se partagent pas.",
      intent: 'memoire',
      target: 'Elenya',
      importance: 'significant',
      response: "Tu recules jusqu’aux pins sans quitter le lac des yeux. Quand tu retrouves le feu, personne ne te demande de parler. Fen, lui, reste tourné vers le nord-est.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 3 },
        { type: "SET_FLAG", target: "lyra_prescience" },
        { type: "REMOVE_FLAG", target: "lisiere_interaction_active" },
        { type: "REMOVE_FLAG", target: "lisiere_exploration_active" },
        { type: "SET_FLAG", target: "lisiere_retour_lyra_solo" }
      ],
      next: 'ACTE1_08B_BIVOUAC_LISIERE'
    },
    {
      key: 'B',
      condition: (gs) => gs.hasFlag('avec_ombre') || gs.hasFlag('relation_O_ouverte_acte1'),
      text: "Serrer la garde de Kaelen. « Tu l'as vue aussi ? »",
      intent: 'confiance',
      target: 'Kaelen',
      importance: 'significant',
      feedback: "Kaelen comprend que tu lui demandes un témoin, pas une explication.",
      response: "Kaelen fixe le centre du lac longtemps après que la silhouette s’est dissoute. « Oui. » Sa réponse tombe sans ironie. « Je l’ai vue. Et non, je n’aime pas la façon dont elle nous regardait. » Il ne prétend pas savoir davantage. Sur le chemin du feu, il reste à portée de ta main.",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "SET_FLAG", target: "lyra_prescience" },
        { type: "SET_FLAG", target: "lyra_confie_K" },
        { type: "REMOVE_FLAG", target: "lisiere_interaction_active" },
        { type: "REMOVE_FLAG", target: "lisiere_exploration_active" },
        { type: "SET_FLAG", target: "lisiere_retour_lyra_K" }
      ],
      next: 'ACTE1_08B_BIVOUAC_LISIERE'
    },
    {
      key: 'C',
      condition: (gs) => gs.hasFlag('avec_eclaireur') || gs.hasFlag('relation_E_ouverte_acte1'),
      text: "Tendre la main vers Alistair. « Dis-moi que tu vois ce que je vois. »",
      intent: 'confiance',
      target: 'Alistair',
      importance: 'significant',
      feedback: "Alistair accepte de ne pas avoir de réponse sacrée à te donner.",
      response: "Alistair ne prend pas ta main tout de suite. Il regarde d’abord le lac. « Je la vois. » Sa lumière vacille. « Mais je ne sais pas ce qu’elle est. » Puis ses doigts trouvent les tiens, non pour te guider, seulement pour confirmer que vous avez vu la même chose.",
      effects: [
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "lyra_prescience" },
        { type: "SET_FLAG", target: "lyra_confie_E" },
        { type: "REMOVE_FLAG", target: "lisiere_interaction_active" },
        { type: "REMOVE_FLAG", target: "lisiere_exploration_active" },
        { type: "SET_FLAG", target: "lisiere_retour_lyra_E" }
      ],
      next: 'ACTE1_08B_BIVOUAC_LISIERE'
    }
  ]
},

'V28_SOLO_KAELEN': {
    sceneNumber: 'V28.1.SOLO.O',
    chapter: 1,
    title: "La Dague sur la Pierre",
    mood: 'intimate',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Foret_pins_noirs_202606191344.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Kaelen%20bg/SPRITE_KAELEN_DEBOUT_PROFIL_202606231737-removebg-preview.png",
    getDynamicNarrative: (gs) => {
      return "Tu t’assois à distance de Kaelen. Il ne te regarde pas tout de suite. Sa dague travaille la pierre avec un bruit régulier, presque cérémoniel.\\n\\n" +
        "« Tu m’as ignoré pendant des heures. »\\n\\n" +
        "« Je sais. »\\n\\n" +
        "Il tourne enfin les yeux vers toi. Pas de reproche. Quelque chose de plus dangereux : il a compris que ton silence était un choix.\\n\\n" +
        "« Alors pourquoi venir maintenant ? »\\n\\n" +
        "Tu regardes la lame. « Parce que je voulais savoir si tu resterais sans que je te le demande. »\\n\\n" +
        "Kaelen sourit à peine. « Voilà une question que je peux respecter. »\\n\\n" +
        "Il pose la dague entre vous, poignée tournée vers toi. Pas une offrande. Pas une chaîne. Une possibilité.\\n\\n" +
        "« Je ne te promets pas d’obéir, Reine. »\\n\\n" +
        "« Je ne te l’ai pas demandé. »\\n\\n" +
        "Pour la première fois, la distance entre vous n’est plus un abandon. C’est un espace que vous pouvez traverser.";
    },
    choices: [
      {
        key: 'A',
        text: "Prendre la dague. « Alors reste assez près pour que je puisse te choisir. »",
        effects: [
          { type: "ADD_GAUGE", target: "presence_O", value: 2 },
          { type: "ADD_GAUGE", target: "lien_O", value: 1 },
          { type: "SET_FLAG", target: "dague_kaelen_prise" }
        ],
        next: 'ACTE1_08B_BIVOUAC_LISIERE'
      }
    ]
  },

'V28_SOLO_ALISTAIR': {
    sceneNumber: 'V28.1.SOLO.E',
    chapter: 1,
    title: "La Lumière qui n’ordonne pas",
    mood: 'intimate',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Foret_pins_noirs_202606191344.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprite%20Alistair%20bg/SPRITE_ALISTAIR_DEBOUT_FACE_202606231808.png",
    getDynamicNarrative: (gs) => {
      return "Tu ne t’assois pas près d’Alistair. Tu entres seulement dans le cercle de lumière de son insigne. Il le remarque.\\n\\n" +
        "« Je pensais que vous vouliez être seule. »\\n\\n" +
        "« Je le veux. »\\n\\n" +
        "Il baisse les yeux. « Alors je ne vous demanderai pas de rester. »\\n\\n" +
        "Cette réponse te surprend davantage qu’une prière ou qu’un serment.\\n\\n" +
        "« Et si je reviens ? »\\n\\n" +
        "Alistair relève les yeux. « Alors je serai là. Pas devant vous. Pas au-dessus de vous. À côté. Si vous l’acceptez. »\\n\\n" +
        "La lumière de son insigne vacille. Pour la première fois, elle ressemble moins à une cage qu’à une porte laissée ouverte.";
    },
    choices: [
      {
        key: 'A',
        text: "Toucher l’insigne. « Alors ne ferme pas la porte. »",
        effects: [
          { type: "ADD_GAUGE", target: "presence_E", value: 2 },
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "SET_FLAG", target: "insigne_alistair_ramasse" }
        ],
        next: 'ACTE1_08B_BIVOUAC_LISIERE'
      }
    ]
  },

'ACTE1_SOLO_ECHO': {
    sceneNumber: '1.SOLO',
    chapter: 1,
    title: "L’Écho dans la Pierre",
    mood: 'tension',
    condition: (gs) => gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde'),
    getDynamicNarrative: (gs) => {
      return "Tu as repoussé les deux hommes dans le gouffre. Leurs jurons s’éloignent — pour l’instant.\n\n" +
        "La fresque te regarde. Pas avec reproche. Avec attente.\n\n" +
        "Fen se hisse contre ton poignet. Avant même de réfléchir, ton pouce trouve l'endroit précis derrière son oreille où son pouls cogne le plus fort. Ton esprit ne se souvient de rien. Ton corps, lui, connaît ce geste.\n\n" +
        "La reconnaissance te traverse plus violemment qu'un nom retrouvé : quelque chose en toi existait avant les deux hommes, avant la couronne, peut-être même avant ta propre version de l'histoire.\n\n" +
        "« Je n’ai besoin de guide », dis-tu à la pierre. Fen serre ses griffes juste assez pour rappeler qu'être seule ne signifie pas être vide.\n\n" +
        "La pierre ne contredit pas. Elle attend la suite. Eux, quelque part au-dessus ou en dessous, aussi.";
    },
    choices: [
      { key: 'A', text: "Grimper vers la surface — sans leur main.", effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 2 },
        { type: "SET_FLAG", target: "solo_couronne" },
        { type: "SET_FLAG", target: "_solo_echo_vu" }
      ], next: 'RETURN' }
    ]
  },

'FEN_INDICE_1': {
    sceneNumber: 'V40.3.F1',
    chapter: 1,
    title: "Trois Notes dans la Pierre",
    mood: 'exploration',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Fen%20bg/SPRITE_FEN_ASSIS_FACE_FIX_202606231738.png",
    getDynamicNarrative: (gs) => {
      return "Fen cesse brusquement de bouger devant la fresque.\n\n" +
        "Il ne regarde pas la reine sculptée. Il regarde la silhouette effacée à son côté — un personnage dont le visage a été martelé jusqu'à disparaître.\n\n" +
        "Trois notes quittent sa gorge. Trop justes pour un cri d'animal. La pierre renvoie la troisième avec un léger retard.\n\n" +
        "Quelque chose se serre sous tes côtes. Pas un souvenir. Plutôt l'empreinte laissée par un souvenir arraché.\n\n" +
        "Fen pose une patte contre le basalte, exactement à l'endroit où la main de la silhouette devait rejoindre celle de la reine. Puis il repart comme si rien ne s'était passé.";
    },
    choices: [{
      key: 'NEXT',
      text: "Garder les trois notes en mémoire.",
      effects: [
        { type: "SET_FLAG", target: "fen_fresque" },
        { type: "SET_FLAG", target: "kalthar_melody" },
        { type: "ADD_GAUGE", target: "memoire_kalthar", value: 1 }
      ],
      next: 'RETURN'
    }]
  },

'ERREUR_SCENE': {
    sceneNumber: 'ERR',
    chapter: 1,
    title: "Erreur de Continuum",
    mood: 'exploration',
    getDynamicNarrative: (gs) => {
      return "Le chemin s’est brouillé. Tu reprends tes esprits un peu plus loin.\n\nLe voyage continue.";
    },
    choices: [
      {
        key: 'NEXT',
        text: "Continuer.",
        next: 'ACTE1_01_REVEIL'
      }
    ]
  },
  // =============================================================================
  // RÉCAPITULATIF V30.0.0 « CORONA GLACIALIS — AAA FINAL »
  // =============================================================================
  // 
  // NOUVELLES JAUGES
  //   possession        0-30   (possession / contrôle)
  //   memoire_kalthar   0-20   (récupération mémoire)
  //   volonte           0-15   (résistance aux dettes et triggers)
  //
  // NOUVEAUX TIMERS
  //   venin             (corrigé : décrément automatique dans processChoice)
  //   colere_ordre      (Seraphine)
  //   avance_veyra
  //   dette_kaelen
  //
  // NOUVEAUX SYSTÈMES
  //   inventory[]       max 8 objets
  //   reputation        { ordre, culte, ombre, village }
  //   Mémoire du Monde  (globalFlags enrichis)
  //
  // NOUVEAUX PERSONNAGES & SCÈNES
  //   SERAPHINE_INTRO / SERAPHINE_ARRIVEE
  //   VEYRA_PACTE
  //   MIRA_RENCONTRE / MIRA_SUITE_SOLO
  //   NOMADE_1
  //   GAME_OVER_POSSESSION
  //
  // NOUVELLES FINS
  //   FIN_VEYRA
  //   FIN_SERAPHINE
  //   FIN_MIRA
  //   FIN_CORONA
  //   FIN_DETTE_ANNULEE
  //
  // ACTE V (post-Trône)
  //   ACTE5_01_LENDEMAIN
  //   ACTE5_02_VEILLE / DEPART / RETOUR
  //
  // ENRICHISSEMENTS MAJEURS
  //   Toutes les fins existantes lisent possession / memoire_kalthar / volonte
  //   Timer venin fonctionnel
  //   Joutes O2 / E2 complètes
  //   Arc Oraya / Lyra / Fen conservé et renforcé
  //   Voie Solo renforcée (Mira + scènes exclusives)
  //
  // FLAGS ORPHELINS PURGÉS
  //   serviteurs_reveles → silas_verite_*
  //   lyra_reduite_arme  → lyra_punie
  //   fragment_kalthar_1 → memoire_kalthar
  //
  // RÉTROCOMPATIBILITÉ
  //   100 % des flags, jauges et scènes V26 restent valides
  //   Anciennes sauvegardes initialisent automatiquement les nouvelles jauges à 0
  // =============================================================================

  // ==========================================
  // SCÈNES DE SÉCURITÉ & CONTINUITÉ FINALE
  // ==========================================

// ==========================================
  // VÉRIFICATION DE COHÉRENCE (notes techniques)
  // ==========================================
  //
  // 1. Timer venin : onEnter de URGENCE_NARRATIVE pose timers.venin = 3
  //    processChoice appelle decrementTimers() → le trigger timer_venin_check fonctionne.
  //
  // 2. Nouvelles jauges : initialisées dans SceneManager même sur anciennes saves.
  //
  // 3. Inventaire : addItem / hasItem / removeItem opérationnels.
  //
  // 4. Réputation : addRep / getRep opérationnels.
  //
  // 5. Aucun dead-end : toutes les scènes ont au moins un choix NEXT ou conditionnel.
  //
  // 6. Triggers prioritaires : Game Over (90-150) > Romance/Joutes (8-15) > Indices (4-7).
  //
  // 7. Voie Solo : scènes exclusives + Mira + FIN_MIRA + FIN_SOLO enrichie.
  //
  // 8. Acte V : 3 épilogues jouables selon le choix post-Trône.
  //
  // 9. Nouvelles fins branchées via conditions sur flags + jauges.
  //
  // 10. Rétrocompatibilité NG+ et achievements conservée.

  // ==========================================
  // FIN DE LA BASE DE DONNÉES PRINCIPALE
  // (Les scènes V26 non explicitement réécrites restent
  //  valides et peuvent être collées à la suite de ce bloc
  //  sans modification de structure.)
  // ==========================================

  // ==========================================
  // FERMETURE DE LA BASE DE DONNÉES
  // ==========================================


// =============================================================================
// GARANTIES AAA V29
// =============================================================================
// - Validation serveur des choix : impossible de forcer un choix caché depuis le client.
// - Entrée de scène idempotente : timers/onEnter ne se déclenchent pas plusieurs fois par rendu.
// - Historique de choix/scènes pour conséquences et analytics.
// - Présence O/E/S exposée au front-end.
// - JOIN_COMPANION / LEAVE_COMPANION pour routes fluides.
// - Normalisation des jauges et sauvegardes V26/V27/V28.
// - Normalisation des assets placeholder vers null pour éviter les URLs fantômes.
// - API serverValidateDatabase() pour QA automatisée.
// - API serverSaveGame()/serverLoadGame() pour sauvegarde persistante optionnelle.
// =============================================================================
  };
}
