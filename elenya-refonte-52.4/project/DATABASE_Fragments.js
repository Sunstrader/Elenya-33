/** V52 — fragment DB FRAGMENTS.
 * Généré depuis V51.7.6 sans réécriture narrative.
 * 16 scènes.
 */
function _dbFragmentsV52_() {
  return {
'FRAGMENT_1_VISAGE': {
    sceneNumber: 'FRAG_1', chapter: 1, title: "Le Visage dans la Glace", mood: 'tension', isFlashback: true,
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/royaume-souvenirs.webp",
    transitionGif: "https://cdn.jsdelivr.net/gh/Sunstrader/acte-1@main/Ice_surface_shattering_into_shards_202608131130.mp4",
    getDynamicNarrative: (gs) => {
  return `La pierre de la fresque devient liquide sous tes doigts. Le monde bascule.\n\nTu es ailleurs. Ailleurs et avant. Une salle de miroirs, mais les miroirs ne reflètent pas ton visage actuel — ils montrent une femme plus jeune, des yeux moins froids, une couronne de givre vivant posée sur des cheveux noirs.\n\nUn homme se tient derrière toi. Tu ne vois que ses mains posées sur tes épaules, et son reflet est flou, comme effacé par le temps.\n\n« Tu hésites encore, » murmure-t-il. Sa voix te semble familière, mais tu ne saurais dire pourquoi.\n\nTu portes une robe de cérémonie. Dehors, des cloches sonnent. Pas des cloches de deuil — des cloches de couronnement. Ou d’enterrement royal.\n\nAu centre de la table, posé sur un écrin d’obsidienne ouverte, un cristal noir pulse faiblement. Une larme de pierre qui semble contenir une nuit entière.\n\nTu ne sais plus lequel des deux.`;
},
    choices: [
      { key: 'A', text: "Te retourner pour voir son visage.", effects: [{ type: "ADD_GAUGE", target: "instabilite", value: 3 }, { type: "SET_FLAG", target: "frag1_visage_vu" }], next: 'FRAGMENT_1_REVEIL' },
      { key: 'B', text: "Fixer ton reflet. Essayer de te souvenir de ton nom.", effects: [{ type: "ADD_GAUGE", target: "instabilite", value: 5 }, { type: "SET_FLAG", target: "frag1_nom_cherche" }], next: 'FRAGMENT_1_REVEIL' }
    ]
  },

'FRAGMENT_1_REVEIL': {
    sceneNumber: 'FRAG_1B', chapter: 1, title: "Évanescence", mood: 'exploration', isFlashback: true,
    getDynamicNarrative: (gs) => {
      let text = "";
      if (gs.hasFlag('frag1_visage_vu')) {
        text += `Tu te retournes, mais la lumière s'évapore. Ses traits se dissolvent dans un éclat de givre. Tu n'as vu que ses yeux — bleus, infiniment tristes, infiniment familiers.\n\n`;
      } else {
        text += `Ton reflet te fixe avec une intensité qui n'est pas la tienne. Ses lèvres bougent sans que tu parles. Un nom se forme sur ses lèvres, mais le son est étouffé par le fracas de la glace qui se brise.\n\n`;
      }
      text += `Le miroir se fissure de haut en bas. Le monde s'effondre en éclats de cristal.\n\nTu reviens à toi devant la fresque, la main encore posée sur la pierre. Fen te lèche les doigts avec inquiétude. `;
      
      if (gs.hasFlag('avec_ombre')) {
        text += `Kaelen est planté derrière toi, croisant les bras avec un sourire en coin. « Tu t'endors debout, Reine ? » te demande-t-il.\n\n`;
      } else if (gs.hasFlag('avec_eclaireur')) {
        text += `Alistair s'approche prudemment, les yeux pleins d'inquiétude. « Est-ce que ça va ? » te demande-t-il.\n\n`;
      } else {
        text += `Le silence des catacombes s’étend autour de toi.\n\n`;
      }

      text += `Tu ne sais pas quoi répondre. Quelque chose a bougé dans ton esprit, comme une pierre qui se déplace sous la glace d'un lac.`;
      return text;
    },
    choices: [{ key: 'NEXT', text: "Mentir. Dire que ce n'est rien.", effects: [{ type: "SET_FLAG", target: "_fragment_1_vu" }], next: 'ACTE1_04_AUTOMATE' }]
  },

'FRAGMENT_KAELEN_ANCESTRE': {
  sceneNumber: 'FRAG_K',
  chapter: 1,
  title: "Le Sang du Contrat",
  mood: 'tension',
  isFlashback: true,
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Salle_de_pierre_noire_202606191344.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "Le feu du bivouac s'éteint d'un coup. Fen se raidit sur ton épaule, ses yeux noirs devenant des lanternes d'ambre.\n\n";
    text += "Tu es ailleurs. Une crypte de basalte fumant, éclairée par des braises bleues. Un homme jeune, le visage marqué des mêmes traits anguleux que Kaelen mais sans la cicatrice de cynisme, est agenouillé devant un trône vide.\n\n";
    text += "« Je jure sur le sang des Cendres, » dit-il, et sa voixest le précédent exact de celle que tu connais. « Que ma lame ne servira qu'à protéger la Souveraine du Gel. Que mon feu s'éteindra avant qu'elle ne frissonne. Que mes descendants porteront ce serment jusqu'à son réveil. »\n\n";
text += "Une main se pose sur son épaule --- Kalthar, tu le sais sans le voir. « Le monde changera, » dit le Roi. « Les Cendres deviendront commerce. Les serments, contrats. Mais si un seul de tes héritiers garde la mémoire de ce moment, elle survivra. »\n\n";
text += "L'homme lève la tête. Ses yeux --- les yeux de Kaelen --- sont pleins d'une ferveur qui n'a encore jamais été trahie.\n\n";



return text;

},
choices: [
{
key: 'A',
text: "Revenir au feu, le cœur battant.",
effects: [
{ type: "ADD_GAUGE", target: "lien_O", value: 2 },
{ type: "SET_FLAG", target: "_frag_k_vu" },
{ type: "SET_FLAG", target: "secret_ancetre_kaelen" }
],
next: 'ACTE2_01_RENCONTRE_SILAS_1'
},
{
key: 'B',
text: "Serrer les poings. « Les serments ne valent que ceux qui les portent. »",
effects: [
{ type: "ADD_GAUGE", target: "affinite_ombre", value: 3 },
{ type: "SET_FLAG", target: "_frag_k_vu" }
],
next: 'ACTE2_01_RENCONTRE_SILAS_1'
}
]
},

'FRAGMENT_ALISTAIR_ANCESTRE': {
sceneNumber: 'FRAG_A',
chapter: 1,
title: "La Forge du Sceau",
mood: 'tension',
isFlashback: true,
image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Forge_sacrée_202606191344.jpeg",
getDynamicNarrative: (gs) => {
let text = "L'insigne d'Alistair brûle contre ta paume --- pas de chaleur, de lumière. Fen siffle, reculant dans tes cheveux.\n\n";
text += "Vision. Une forge blanche, aveuglante. Un homme en haillons d'or martèle un cercle de lumière brute. Il est Leonhart --- tu vois le nom gravé dans ses mains callleuses. À ses côtés, Kalthar, vivant, le visage grave.\n\n";
text += "« Ce Sceau ne la liera que si elle le demande, » dit le Roi. « C'est un verrou, oui. Mais de l'intérieur. Une porte qu'elle seule peut ouvrir --- ou fermer. Si l'Ordre un jour détourne cet outil... »\n\n";
text += "Le forgeron hoche la tête, le visage ruisselant de sueur et de larmes. « Alors mes descendants sauront que la Cage Dorée n'était pas une prison. C'était un refuge. Et celui qui l'ouvrira de force en fera une geôle. »\n\n";
text += "La lumière s'effondre. Tu reviens au bivouac, l'insigne froid entre tes doigts.\n\n";



return text;

},
choices: [
{
key: 'A',
text: "Rendre l'insigne à Alistair sans rien dire.",
effects: [
{ type: "ADD_GAUGE", target: "lien_E", value: 2 },
{ type: "SET_FLAG", target: "_frag_a_vu" },
{ type: "SET_FLAG", target: "verite_lignee_alistair" }
],
next: 'ACTE2_01_RENCONTRE_SILAS_1'
},
{
key: 'B',
text: "Garder l'insigne une seconde de trop. « Votre Ordre a oublié l'origine. »",
effects: [
{ type: "ADD_GAUGE", target: "affinite_eclaireur", value: 3 },
{ type: "SET_FLAG", target: "_frag_a_vu" }
],
next: 'ACTE2_01_RENCONTRE_SILAS_1'
}
]
},

  // ==========================================
  // ACTE 2 : LA DESCENTE ET L'HÉRÉSIE
  // ==========================================

'FRAGMENT_2_TRONE': {
  sceneNumber: 'FRAG_2', 
  chapter: 2, 
  title: "Le Trône de Cendre", 
  mood: 'tension', 
  isFlashback: true,
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Tr%C3%B4ne_astral_abstrait_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    return `Le noir de la rivière te dévore les yeux. Puis tu vois — vraiment vois — autre chose.\n\nTu es assise sur un trône d’obsidienne. Pas celui que tu cherches. Celui que tu as *quitté*. La salle du conseil s’étend devant toi, vaste, silencieuse, peuplée de visages que tu reconnais sans pouvoir les nommer.\n\nUn homme en armure blanche — non, pas Alistair, plus vieux, plus cassé — brandit un parchemin brûlant.\n\n« Votre Majesté, l’Ordre du Soleil refuse la trêve. Ils ont invoqué l’Entité de Calcination aux portes de Prymaëlis. »\n\nUn autre, voûté, les mains noircies par le Mana brut : « Le complexe minier s’effondre. Les piliers ne tiendront pas. Si nous ne scellons pas la faille — »\n\n« — le continent brûlera, » termines-tu. La phrase sort de ta bouche sans que tu y penses. Comme si tu l’avais déjà dite. Cent fois. Mille.\n\nTous les regards se tournent vers toi. Attendant. Attendant toujours.\n\nTu portes la couronne de givre. Tu es leur reine. Tu es leur monstre. Tu es leur seule issue.`;
  },
  choices: [
    { 
      key: 'A', 
      text: "« Préparez le rituel de Stase. Je gèlerai Prymaëlis moi-même. »", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 5 }, 
        { type: "SET_FLAG", target: "frag2_rituel_accepte" }
      ], 
      next: 'FRAGMENT_2_REVEIL' 
    },
    { 
      key: 'B', 
      text: "« Il doit y avoir une autre voie. Je ne sacrifierai pas — » (Tu t’interromps. Qui ?)", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 8 }, 
        { type: "SET_FLAG", target: "frag2_hesitation" }
      ], 
      next: 'FRAGMENT_2_REVEIL' 
    }
  ]
},

'FRAGMENT_2_REVEIL': {
  sceneNumber: 'FRAG_2B', 
  chapter: 2, 
  title: "Évanescence", 
  mood: 'exploration', 
  isFlashback: true,
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('frag2_rituel_accepte')) {
      text += `Le conseil s’incline. Pas de joie, pas de soulagement — seulement une résignation antique. Ils savaient. Ils savaient tous que cela finirait ainsi.\n\nUn vieillard au fond de la salle pleure en silence. Tu ne sais pas pourquoi.\n\n`;
    } else {
      text += `Ta voix trahit une faille. Les conseillers échangent des regards. L’homme en blanc baisse les yeux.\n\n« Il n’y a pas d’autre voie, Votre Majesté. Vous le savez depuis le début. »\n\nLa phrase tombe comme une lame. Tu la connais. Tu l’as entendue. Dans un autre temps, un autre lieu, une autre vie.\n\n`;
    }
    text += `Le trône se fissure. Non — c’est la rivière qui reprend ses droits. Le courant noir te crache sur la rive nord, le souffle court, les tempes battantes.\n\n`;

    if (gs.hasFlag('alistair_perdu')) {
      text += `Kaelen te tient par le bras, inquiet. « Tu as crié un nom. Kalthar. Qui est-ce ? »\n\nTu ne réponds pas. Tu ne peux pas. Le nom résonne dans ta gorge comme une lame de givre.`;
    } else if (gs.hasFlag('kaelen_perdu')) {
      text += `Alistair te soutient, blême. « Votre magie a vacillé. Vous avez murmuré… quelque chose à propos d’un rituel. »\n\nTu détournes les yeux. Le rituel. Oui. Tu connais ce rituel. Tu l’as conçu.`;
    } else {
      text += `Les deux hommes te fixent avec des expressions différentes mais identiques d’inquiétude. Tu as parlé dans le courant. Des mots que tu ne maîtrisais pas.\n\nTu t’élances vers la rive sans un mot. Le passé te rattrape, et il court plus vite que toi.`;
    }
    return text;
  },
  choices: [
    { 
      key: 'NEXT', 
      text: "Reprendre la marche. Laisser le silence digérer la vérité.", 
      effects: [{ type: "SET_FLAG", target: "_fragment_2_vu" }], 
      next: 'ACTE2_11_RIVE_NORD' 
    }
  ]
},

'FRAGMENT_KALTHAR_LARME': {
sceneNumber: 'FRAG_K_LARME',
chapter: 2,
title: "L'Obsidienne des Adieux",
mood: 'tension',
isFlashback: true,
image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Trône_astral_abstrait_202606191345.jpeg",
getDynamicNarrative: (gs) => {
let text = "Fen s'effondre sur tes genoux, ses yeux noirs devenus des puits d'ambre. La transe te prend sans prévenir.\n\n";
text += "Tu es dans la salle du trône, mais elle est intacte. Vivante. Kalthar se tient devant toi, plus jeune que dans tes souvenirs fragmentés, et dans sa main droite, il tient la Larme d'Ébène --- non pas dans un écrin, mais nue, pulsant d'une lueur intérieure.\n\n";
text += "« Je ne te demande pas de m'attendre, » dit-il. « Je te demande de survivre. Cette pierre contient ce que je n'ai pas pu te dire de vive voix. Si un jour tu la brises... »\n\n";
text += "Il s'approche. Son front touche le tien. Le givre et le feu se mélangent.\n\n";
text += "« ...tu me libéreras. Ou tu te libéreras de moi. Les deux sont une victoire. »\n\n";
 
    
    return text;
  },
  choices: [
    {
      key: 'A',
      text: "Te réveiller, les paumes brûlantes de froid.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 3 },
        { type: "SET_FLAG", target: "_frag_larme_vu" },
        { type: "SET_FLAG", target: "kalthar_larme_souvenir" }
      ],
      next: 'ACTE2_09B_BIVOUAC_GLACE'
    },
    {
      key: 'B',
      text: "Tenter de briser la pierre dans le rêve. « Je choisis la liberté. »",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 8 },
        { type: "SET_FLAG", target: "_frag_larme_vu" },
        { type: "SET_FLAG", target: "kalthar_larme_rejet" }
      ],
      next: 'ACTE2_09B_BIVOUAC_GLACE'
    }
  ]
},

// ==========================================
// LIAISON MARCHE 2 — Après auberge
// ==========================================

'FRAGMENT_CENDRES_SOLEIL': {
  sceneNumber: 'FRAG_CS',
  chapter: 2,
  title: "Le Serment Partagé",
  mood: 'tension',
  isFlashback: true,
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Salle_de_pierre_noire_202606191344.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "Fen se raidit. Ses yeux deviennent ambre. Le monde bascule.\n\n";
    text += "Tu es ailleurs. Une salle de basalte fumant. Deux hommes agenouillés face à un trône vide.\n\n";
    text += "L’un porte les traits anguleux de Kaelen, sans la cicatrice de cynisme. L’autre a les mains calleuses d’un Leonhart.\n\n";
    text += "Kalthar pose une main sur chaque épaule.\n\n";
    text += "« L’un gardera le feu. L’autre gardera la lumière. Mais si le jour vient où la Souveraine se réveille, vous oublierez vos ordres. Vous vous souviendrez seulement de ce serment. »\n\n";
    text += "Les deux hommes lèvent la tête. Leurs yeux — les mêmes yeux que tu connais — sont pleins d’une ferveur qui n’a encore jamais été vendue.\n\n";
    
    return text;
  },
  choices: [
    {
      key: 'A',
      text: "Revenir au présent, le cœur battant.",
      effects: [
        { type: "ADD_GAUGE", target: "lien_O", value: 1 },
        { type: "ADD_GAUGE", target: "lien_E", value: 1 },
        { type: "SET_FLAG", target: "_frag_cendres_vu" },
        { type: "SET_FLAG", target: "secret_ancetre_partage" }
      ],
      next: 'ACTE2_01_RENCONTRE_SILAS_1'
    },
    {
      key: 'B',
      text: "Serrer les poings. « Les serments ne valent que ceux qui les portent. »",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 3 },
        { type: "SET_FLAG", target: "_frag_cendres_vu" }
      ],
      next: 'ACTE2_01_RENCONTRE_SILAS_1'
    }
  ]
},

// ==========================================
// MICRO-FRAGMENT LARME D’ÉBÈNE (précoce)
// ==========================================


// ==========================================
// JOUTE 2 — KAELEN (après crevasse)
// ==========================================
// ==========================================
// JOUTE 2 — ALISTAIR
// ==========================================
  // ==========================================
  // ACTE 3 : LE POISON ET LE CULTE
  // ==========================================

'FRAGMENT_3_TRAHISON': {
  sceneNumber: 'FRAG_3', 
  chapter: 3, 
  title: "La Dernière Nuit de Kalthar", 
  mood: 'romance', 
  isFlashback: true,
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Autel_int%C3%A9rieur_avec_%C3%A9p%C3%A9e_bris%C3%A9e_202606191345.jpeg",
  getDynamicNarrative: (gs) => {
    return `L’épée brisée sur l’autel… tu y étais quand il l’a brisée. Kalthar est à genoux dans sa chambre royale, consumé par le feu rituel de l’Ordre, sa couronne déjà à terre comme un objet devenu inutile.\n\n« Je gèlerai le monde, » dis-tu. Et tu ajoutes, plus bas, comme un secret qu’on ne fait qu’à soi-même : « Je t’attendrai. »\n\nIl sourit. Le dernier sourire de Kalthar — le même sourire, tu le sais maintenant avec certitude, que celui de l’homme aux mains familières dans la salle de miroirs. C’était lui. Ça a toujours été lui.`;
  },
  choices: [
    { 
      key: 'A', 
      text: "Poser ta main sur sa joue. « Ne meurs pas avant que je revienne. »", 
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: -5 }, 
        { type: "SET_FLAG", target: "frag3_pacte_dit" }
      ], 
      next: 'FRAGMENT_3_REVEIL' 
    }
  ]
},

'FRAGMENT_3_REVEIL': {
  sceneNumber: 'FRAG_3B', 
  chapter: 3, 
  title: "Évanescence", 
  mood: 'exploration', 
  isFlashback: true,
  getDynamicNarrative: (gs) => {
    return `Le souvenir se brise. Kalthar ne t’a pas trahie, il s’est sacrifié — et cette seule nuance change tout ce que tu croyais savoir de toi-même.\n\nMais qui t’a mise sur la stèle ? Qui a scellé ta conscience ?`;
  },
  choices: [
    { 
      key: 'NEXT', 
      text: "Serrer l’épée brisée.", 
      effects: [{ type: "SET_FLAG", target: "_fragment_3_vu" }], 
      next: 'ACTE3_13_ARTEFACT' 
    }
  ]
},

'FRAGMENT_ANCESTRE_KALTHAR_JEUNE': {
  sceneNumber: 'FRAG_K_JEUNE',
  chapter: 3,
  title: "Le Roi avant la Couronne",
  mood: 'tension',
  isFlashback: true,
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Salle_de_pierre_noire_202606191344.jpeg",
  getDynamicNarrative: (gs) => {
    let text = "Fen se raidit contre ton cou. Ses yeux deviennent ambre. Le monde bascule.\n\nTu es ailleurs. Une salle de pierre noire, avant les flammes, avant le gel. Un homme jeune — Kalthar, mais sans la couronne, sans la gravité — rit. Vraiment rit. Ses mains sont posées sur tes épaules.\n\n« Tu hésites encore, » dit-il. Exactement les mêmes mots que dans le premier fragment. Mais ici, sa voix est chaude.\n\n« Si tu prends la couronne, tu ne pourras plus jamais être seulement toi. »\n\nTu sens le poids de la couronne de givre vivant dans tes propres mains. Tu ne l’as pas encore mise.\n\n";
    if (gs.getGauge('instabilite') >= 20) {
      text += "Dans cette vision, tu souris. Un sourire que tu ne te souviens pas d’avoir porté. « Alors je serai le monde. »";
    } else {
      text += "Dans cette vision, tu hésites. Et Kalthar attend, patient, comme s’il avait tout le temps du monde.";
    }
    return text;
  },
  choices: [
    {
      key: 'A',
      text: "Te retourner pour voir son visage clairement.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 4 },
        { type: "SET_FLAG", target: "frag_k_jeune_visage" },
        { type: "SET_FLAG", target: "_frag_k_jeune_vu" }
      ],
      next: 'FRAGMENT_ANCESTRE_KALTHAR_REVEIL'
    },
    {
      key: 'B',
      text: "Poser la couronne. Dans la vision. Dans le souvenir.",
      effects: [
        { type: "ADD_GAUGE", target: "instabilite", value: 6 },
        { type: "SET_FLAG", target: "frag_k_jeune_couronne" },
        { type: "SET_FLAG", target: "_frag_k_jeune_vu" }
      ],
      next: 'FRAGMENT_ANCESTRE_KALTHAR_REVEIL'
    }
  ]
},

'FRAGMENT_ANCESTRE_KALTHAR_REVEIL': {
  sceneNumber: 'FRAG_K_JEUNE_B',
  chapter: 3,
  title: "Évanescence",
  mood: 'exploration',
  isFlashback: true,
  getDynamicNarrative: (gs) => {
    let text = "Le rire de Kalthar se brise en éclats de givre. Tu reviens au présent, Fen encore crispé contre toi.\n\n";
    if (gs.hasFlag('frag_k_jeune_visage')) {
      text += "Tu as vu ses yeux. Les mêmes que dans le premier fragment. Les mêmes que ceux qui t’ont mise sur la stèle.\n\n";
    }
    if (gs.hasFlag('avec_ombre')) {
      text += "Kaelen te fixe, un sourcil levé. « Encore une de tes absences, Reine ? »";
    } else if (gs.hasFlag('avec_eclaireur')) {
      text += "Alistair s’est rapproché, inquiétude pure. « Elenya… ? »";
    }
    return text;
  },
  choices: [
    {
      key: 'NEXT',
      text: "Mentir. Dire que ce n’est rien.",
      effects: [{ type: "SET_FLAG", target: "_frag_k_jeune_vu" }],
      next: 'ACTE3_12_AUTEL_KALTHAR'
    }
  ]
},

  // ==========================================
  // ACTE 4 : LE TRÔNE D'ÉBÈNE
  // ==========================================

'FRAGMENT_4_STELE': {
  sceneNumber: 'FRAG_4', 
  chapter: 4, 
  title: "L’Endormissement", 
  mood: 'epilogue', 
  isFlashback: true,
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Autel_de_glace_202606191344.jpeg",
  getDynamicNarrative: (gs) => {
    return `La Larme d’Ébène pulse dans ta paume. Les portes de la Citadelle s’ouvrent.\n\nEt soudain — rien. Le monde s’efface. Pas un évanouissement. Un *souvenir qui arrive enfin*, comme une dette qu’on venait seulement de se rappeler devoir.\n\nTu es là. Vraiment là. Sur la stèle. Pas celle des ruines où tu t’es réveillée — celle d’origine, dans le cœur du palais en flammes. Le rituel de Stase tourne autour de toi, un tourbillon de givre et de lumière bleue qui ralentit le temps jusqu’à l’arrêt.\n\nKalthar est mort. Tu le sais maintenant. Tu l’as su avant de le savoir. Son corps brûle quelque part dans les décombres, et tu es seule avec le poids du monde figé sur tes épaules.\n\nMais tu n’es pas seule.\n\nUne silhouette se tient au bord du cercle rituel. Tu ne vois pas son visage — le givre déjà naissant brouille les contours. Mais tu vois ses mains. Des mains que tu connais. Des mains qui ont tenu les tiennes, qui t’ont habillée pour le rituel, qui ont posé la couronne sur ton front avant de reculer.\n\n« Dors, Elenya, » dit la voix. Féminine. Ancienne. Fatiguée d’un amour qui dure trop longtemps.\n\n« Je veillerai sur ton corps. Je veillerai sur ton secret. Je veillerai jusqu’à ce que le monde soit digne de ton réveil. »\n\nTu veux crier. Tu veux demander qui elle est. Mais le gel monte, monte, emplit ta bouche, tes poumons, tes pensées. La dernière chose que tu vois, ce sont ses yeux — bleus, infiniment tristes, infiniment familiers.\n\nLes mêmes yeux que dans le premier fragment.\n\nLes yeux de celle qui t’a mise sur la stèle.\n\nLes yeux de celle qui t’attend encore.\n\nTu sais maintenant. Oraya. La Grande Prêtresse du village caché. Celle qui t’a accueillie avec des larmes sacrées en voyant Fen — des larmes qui, tu le comprends enfin, n’avaient rien de rituel. Elle n’était pas une prêtresse avant toi. Elle l’est devenue en te veillant, comme on se construit une raison de vivre autour d’un serment qu’on a fait seul, dans le noir, à quelqu’un qui ne pouvait pas entendre.\n\nElle t’a mise sur la stèle. Elle t’a gardée en vie. Elle t’a attendue pendant des siècles.\n\nPourquoi ?\n\nTu ne sais pas encore. Mais tu sais que le cycle ne se referme pas sans elle.`;
  },
  choices: [
    { key: 'A', text: "Te réveiller en hurlant. Le nom sur tes lèvres : « Oraya. »", effects: [{ type: "ADD_GAUGE", target: "instabilite", value: 6 }, { type: "SET_FLAG", target: "frag4_nom_prononce" }], next: 'FRAGMENT_4_RETOUR' },
    { key: 'B', text: "Te réveiller en silence. Le savoir brûlant dans ta poitrine comme un charbon de glace.", effects: [{ type: "ADD_GAUGE", target: "instabilite", value: 3 }, { type: "SET_FLAG", target: "frag4_silence" }], next: 'FRAGMENT_4_RETOUR' }
  ]
},

'FRAGMENT_4_RETOUR': {
  sceneNumber: 'FRAG_4B', 
  chapter: 4, 
  title: "La Vérité du Zéro", 
  mood: 'epilogue', 
  isFlashback: true,
  getDynamicNarrative: (gs) => {
    let text = "";
    if (gs.hasFlag('frag4_nom_prononce')) {
      text += `Le nom a déjà été prononcé. Oraya. Il ne gagne rien à être répété. Ce qui reste, c'est la sensation de l'avoir porté trois siècles sans le savoir.\n\n`;
      text += `Ta gorge brûle. Le givre autour de tes bottes s'est fendu en étoile, comme si le souvenir avait traversé ton corps avant de trouver une sortie.\n\n`;
    } else {
      text += `Tu gardes le nom derrière tes dents. Pas par ignorance — par choix. Le silence n'efface pas Oraya ; il t'empêche seulement de lui donner, déjà, la forme d'un verdict.\n\n`;
      text += `Tes doigts se referment sur la Larme d'Ébène. Elle est tiède. C'est presque plus difficile à accepter que le souvenir.\n\n`;
    }

    text += `Tu rouvres les yeux sur le parvis de la Citadelle. Le monde n'a pas bougé pendant ton absence : mêmes portes, même vent, mêmes silhouettes qui attendent que tu reviennes vraiment.\n\n`;
    text += `Mais toi, oui. Tu sais désormais qui t'a couchée sur la stèle. Tu ignores encore ce que tu feras de cette vérité — remercier, condamner, comprendre, ou refuser ces quatre verbes.\n\n`;
    text += `Le Trône d'Ébène n'est plus la promesse d'une réponse. C'est l'endroit où tes réponses devront enfin t'appartenir.`;

    return text;
  },
  choices: [
    { key: 'NEXT', text: "Franchir le seuil. La dernière vérité t’appartient.", effects: [{ type: "SET_FLAG", target: "_fragment_4_vu" }, { type: "SET_FLAG", target: "verite_complete" }], next: 'ACTE4_08_CORRIDOR_OBSIDIENNE' }
  ]
},

'FRAGMENT_SERMENT_CENDRES': {
    sceneNumber: 'V26.4.FS',
    chapter: 3,
    title: "Le Serment qu'on N'a Pas Choisi",
    mood: 'tension',
    isFlashback: true,
    getDynamicNarrative: (gs) => {
      return "Le feu du bivouac s'éteint d'un coup. Fen se raidit. Le monde bascule.\n\n" + "Tu es ailleurs. Une crypte de basalte. Un homme jeune — l'ancêtre de Kaelen, tu le sais sans le voir — est agenouillé devant un trône vide. Il saigne. Pas d'une blessure. D'un serment qu'on vient de lui imposer.\n\n" + "« Je jure, » dit-il. Mais sa voix tremble. Ce n'est pas la ferveur. C'est la résignation.\n\n" + "Kalthar se tient debout derrière lui. Pas en roi. En homme fatigué.\n\n" + "« Tu n'es pas obligé, » dit Kalthar. « Si tu refuses, je trouverai un autre moyen. »\n\n" + "L'homme lève la tête. Ses yeux — les yeux de Kaelen — sont pleins de quelque chose qui n'est pas encore du cynisme. Juste de la lucidité.\n\n" + "« Si je refuse, c'est mon fils qui portera le serment. Ou mon petit-fils. Je préfère que ce soit moi. »\n\n" + "Il signe. Pas avec fierté. Avec le calme de celui qui vient de négocier la seule liberté qu'il lui restait : choisir qui souffrirait à sa place.\n\n" + "Tu reviens au bivouac. Kaelen dort, le visage fermé. Tu ne le regardes plus comme un assassin. Tu le regardes comme un homme qui paie une dette contractée avant sa naissance.";
    },
    choices: [{
      key: 'NEXT',
      text: "Revenir au présent.",
      effects: [
        { type: "SET_FLAG", target: "_frag_serment_vu" },
        { type: "SET_FLAG", target: "serment_kaelen_approfondi" },
        { type: "ADD_GAUGE", target: "lien_O", value: 2 }
      ],
      next: 'RETURN'
    }]
  },

'FRAGMENT_4_ENRICHI': {
    sceneNumber: 'FRAG_4E',
    chapter: 4,
    title: "La Stèle et le Nom",
    mood: 'tension',
    isFlashback: true,
    getDynamicNarrative: (gs) => {
      return "La mémoire s’ouvre plus large cette fois.\n\n" +
        "Tu es allongée sur la stèle. Des mains te tiennent — des mains que tu reconnais maintenant. Oraya. Et derrière elle, une silhouette plus grande, plus ancienne.\n\n" +
        "« Elle ne se souviendra de rien, » dit une voix. « C’est le prix. »\n\n" +
        "Une autre voix — la tienne, plus jeune — répond : « Alors prononce mon nom une dernière fois. Pour que je sache au moins ce que je perds. »\n\n" +
        "Le nom est prononcé. Tu l’entends. Tu le gardes.\n\n" +
        "Quand tu reviens au présent, le Trône d’Ébène n’est plus seulement une pierre. C’est un tombeau que tu as choisi.";
    },
    choices: [{
      key: 'NEXT',
      text: "Garder le nom.",
      effects: [
        { type: "SET_FLAG", target: "_frag4_enrichi_vu" },
        { type: "SET_FLAG", target: "frag4_nom_prononce" },
        { type: "SET_FLAG", target: "verite_complete" },
        { type: "ADD_GAUGE", target: "memoire_kalthar", value: 3 }
      ],
      next: 'RETURN'
    }]
  },

  // ==========================================
  // GAME OVERS
  // ==========================================

// ==========================================
  // SCÈNES SECONDAIRES & RELIQUES
  // ==========================================

// ==========================================
  // LIENS DE MARCHE & TRANSITIONS
  // ==========================================

// ==========================================
  // VOIE SOLO — SCÈNES EXCLUSIVES
  // ==========================================
  };
}
