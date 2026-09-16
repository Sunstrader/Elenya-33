/** V52 — fragment DB ENDINGS.
 * Généré depuis V51.7.6 sans réécriture narrative.
 * 24 scènes.
 */
function _dbEndingsV52_() {
  return {
'FIN_POLY': {
  sceneNumber: 'FIN_POLY',
  chapter: 4,
  title: "L'Indécision Éternelle",
  mood: 'epilogue',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp",
  isEnd: true,
    postEnding: true,
  achievementId: "ach_fin_poly",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('domination_finale') || gs.hasFlag('go_poly_domination')) {
      return "Tu as ordonné. Ils ont obéi. Kaelen et Alistair restent enchaînés dans ton Trône, non par indécision, mais par souveraineté pure. Deux satellites d’un astre qui ne se donne jamais, et qui n’a plus besoin de le cacher.";
    }
    if (gs.hasFlag('double_jeu')) {
      return "Tu refuses de choisir. Kaelen et Alistair restent enchaînés dans ton Trône, éternellement suspendus entre ombre et lumière, deux satellites d’un astre qui ne se donne jamais tout à fait — ta possession permanente, et la leur aussi, dans un jeu dont toi seule connais les règles.";
    }
    return "Tu refuses de choisir. Kaelen et Alistair restent à tes côtés, l’un dans l’ombre, l’autre dans la lumière — non par duplicité, mais parce qu’aucun trône, aucun serment, n’a jamais su contenir entièrement ce que tu es. Deux satellites d’un astre qui ne se donne jamais tout à fait, et qui ne le leur cache pas.";
  },
  choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
},

'GAME_OVER_SURCHARGE': {
  sceneNumber: 'GAME_OVER_SURCHARGE', 
  chapter: 2, 
  title: "[FIN PRÉMATURÉE : Surcharge Magique]", 
  mood: 'gameover',
  image: "https://drive.google.com/thumbnail?id=1ZcF5UhO50AVPg8AvuBD_zZ8TLkKJch4R&sz=w1920", 
  sprite: null, 
  voice: "",
  text: "Le givre ne te protège plus. Il te dévore. L’énergie que tu as accumulée, choix après choix, dépasse ce qu’un corps peut contenir. Tes canaux magiques se fissurent, puis éclatent. Un instant encore, tu es Elenya. L’instant d’après, tu n’es plus qu’une tempête de glace pure, sans nom, sans mémoire, sans fin.",
  isEnd: true, 
  achievementId: "ach_surcharge", 
  choices: []
},

'GAME_OVER_SIRENE': {
  sceneNumber: 'GAME_OVER_SIRENE', 
  chapter: 3, 
  title: "[FIN PRÉMATURÉE : L’Illusion Mortelle]", 
  mood: 'gameover',
  image: "https://drive.google.com/thumbnail?id=1bT25yHMpf0B4zPTi-HVRsCa2AI2jgsAy&sz=w1920", 
  sprite: null, 
  voice: "",
  text: "Tu capitules devant la mélodie de Lyra. Il n’y a pas de douleur, seulement une douceur qui aspire, qui vide, qui efface. Ton fluide est siphonné. Ta conscience s’efface dans la poudreuse, et la dernière chose que tu entends est un chant qui continue sans toi.",
  isEnd: true, 
  achievementId: "ach_sirene", 
  choices: []
},

'GAME_OVER_SCELLEE': {
  sceneNumber: 'GAME_OVER_SCELLEE', 
  chapter: 4, 
  title: "[FIN PRÉMATURÉE : L’Esclave de la Lumière]", 
  mood: 'gameover',
  image: "https://drive.google.com/thumbnail?id=1U4ZGWcFt14FPI2R9kAn8cm1d-w-VVpv6&sz=w1920", 
  sprite: null, 
  voice: "",
  text: "Tu laisses Alistair appliquer le Sceau Solaire. Il n’y a pas de violence dans ce geste — seulement une douceur inflexible, celle d’un homme convaincu de faire le bien. Pour lui, c’est un acte d’amour qui a la forme d’un sacrifice.\n\nTa conscience est emprisonnée dans une cage de diamant, éveillée, lucide, éternelle — les chaînes dorées, exactement comme promis.\n\nIl veille. Il prie. Il a réussi.\n\nIl a tout perdu de ce qui aurait pu le rendre humain. Kaelen n’était pas là pour trancher les chaînes — ou tu ne lui en as pas laissé le temps.",
  isEnd: true, 
  achievementId: "ach_scellee", 
  choices: []
},

'FIN_HIVER': {
  sceneNumber: 'FIN_HIVER', 
  chapter: 4, 
  title: "L’Ère de Glace", 
  mood: 'epilogue',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/fin-chaos.webp",
  sprite: null, 
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Tu frappes l’obsidienne. Une onde de choc ravage le continent d’un seul souffle, sans retour possible. Les cathédrales de la Lumière sont broyées sous le givre, leurs cloches figées à mi-volée. L’humanité apprendra à prier la Glace — non par foi, mais parce qu’il ne restera rien d’autre à prier.";
    if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
      text += "\n\nKaelen et Alistair ont vu le geste. Ni couronne partagée, ni serment d’amour : seulement le règne d’une femme qui n’a demandé la permission à personne.";
    }
    if (gs.hasFlag('silas_mort')) text += "\nLe marchand Silas a été la première victime de ce règne, une note en bas de page dans l’histoire d’un empire qui n’écrira plus que la tienne.";
    else if (gs.hasFlag('silas_ami')) text += "\nSilas pleure à genoux, voyant son commerce enseveli — le dernier homme à qui tu as offert une once de clémence, à présent recouvert comme tout le reste.";
    if (gs.hasFlag('urgence_declenchee') && gs.hasFlag('marche_rapide')) {
      text += "\n\nTu te souviens pourtant d’avoir couru contre le venin, autrefois, comme si quelques heures pouvaient encore décider de ta vie. Tu as survécu à cette urgence. Ce que tu imposes au monde maintenant est un choix, pas une agonie.";
    }
    return text;
  },

  isEnd: true,
    postEnding: false,
  achievementId: "ach_fin_hiver", 
  choices: []
},

'FIN_SACRIFICE': {
  sceneNumber: 'FIN_SACRIFICE', 
  chapter: 4, 
  title: "La Déesse Martyre", 
  mood: 'epilogue',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/dome-magique.webp",
  transitionGif: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/animations/eveil-givre.gif",
  sprite: null, 
  voice: "",
  getDynamicNarrative: (gs) => {
    let text = "Tu inverses le flux du Trône. Tu absorbes l’intégralité du gel mondial pour te transformer en statue de diamant pur — un sarcophage de lumière froide, offrant un sursis au monde qui ne saura jamais ton nom pour cela.";
    if (gs.hasFlag('silas_ami')) text += "\nSilas voit les feuilles rousses renaître et allume un cierge en ton nom, sans savoir que la sainte qu’il prie a passé le plus clair de son éveil à être traitée de démon.";
    return text;
  },
  isEnd: true,
    postEnding: false,
  achievementId: "ach_fin_sacrifice", 
  choices: []
},

'FIN_MORTELLE': {
  sceneNumber: 'FIN_MORTELLE', 
  chapter: 4, 
  title: "L’Aube Humaine", 
  mood: 'epilogue',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/fin-aube.webp",
  sprite: null, 
  voice: "",
  text: "Tu déclenches une surcharge cataclysmique. Le Trône d’Ébène se fissure, ses veines de givre s’effondrant comme un château de verre. Le froid mord ta peau — non plus une caresse familière, mais une vraie douleur, la première depuis ton réveil. Tu es redevenue humaine. Kaelen et Alistair peuvent encore être quelque part derrière toi — ou non. Tu t’éloignes vers le Sud, sans couronne, sans mythe, prête à vivre — et pour la première fois, ce mot n’a plus rien d’un sortilège.",
  isEnd: true,
    postEnding: false,
  achievementId: "ach_fin_mortelle", 
  choices: []
},

'FIN_OMBRE': {
  sceneNumber: 'FIN_OMBRE',
  chapter: 4,
  title: 'Trône des Cendres',
  mood: 'end',
  isEnd: true,
    postEnding: true,
  achievementId: 'ach_fin_ombre',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('kaelen_amour_libre') || gs.hasFlag('kaelen_attend_permission')) {
      return "Tu prends place au cœur de la salle du trône. Kaelen reste à ta droite parce qu’il l’a choisi — et parce qu’il sait que la porte demeurera ouverte.\n\nLes Cendres ne sont plus un contrat. Sa dague repose entre vous, non comme une dette ou une chaîne, mais comme la preuve qu’il peut reprendre la route quand il le voudra.\n\n« Je reste, » dit-il.\n\nCe n’est pas une promesse d’éternité. C’est une décision présente, libre, qu’aucun trône ne possède.";
    }
    let text = "Tu prends place au cœur de la salle du trône. Kaelen se tient à ta droite — non comme un garde, non comme un mari de bal : comme une lame qu’on a décidé de porter jusqu’au bout.\n\n";
    text += "Les Cendres ne réclament pas ton pardon ; elles réclament ta volonté. Tu ne figes pas le monde entier. Tu figes ce qui t’a trahie, ce qui t’a vendue, ce qui a voulu écrire ta légende à ta place.\n\n";
    text += "Le continent plie. Kaelen n’a plus comment s’en retirer proprement. Il a réécrit le contrat à son nom — et au tien.\n\n";
    text += "« Je n’ai pas signé pour te sauver, » avait-il dit un jour. « J’ai signé pour rester. » Aujourd’hui, c’est lui qui a fermé la porte.";
    if (gs.hasFlag('dague_gravee') && gs.hasFlag('kaelen_absous')) {
      text += "\n\nIl regarde la dague à ta ceinture. Son regard s’attarde sur la marque de givre près de la garde.\n\n« Tu as marqué mon arme. Tu as marqué ce qui reste de moi. »";
    }

    if (gs.hasFlag('possession_kaelen_sans_mots')) {
      text += "\n\nTu te souviens de cette nuit dans la crevasse. Sa main posée sur la pierre, paume vers le haut. Il n'avait rien dit. Il n'avait rien demandé. Et tu avais compris, sans un mot, qu'il ne resterait pas par contrat — mais par choix.\n\nAujourd'hui, c'est lui qui a fermé la porte. Pas parce que tu l'y as forcé. Parce qu'il a décidé de rester.";
    }
    if (gs.hasFlag('serment_kaelen_approfondi')) {
      text += "\n\nTu te souviens du flashback. L'ancêtre qui signait sans ferveur. La dette contractée avant sa naissance. Kaelen ne porte plus un serment — il paie une dette que d'autres ont contractée pour lui. Et ce soir, pour la première fois, il a choisi de la payer jusqu'au bout.";
    }

    return text;
  },
  choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
},

'FIN_ECLAIREUR': {
  sceneNumber: 'FIN_ECLAIREUR',
  chapter: 4,
  title: 'La Cage Dorée',
  mood: 'end',
  isEnd: true,
    postEnding: true,
  achievementId: 'ach_fin_eclaireur',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/dome-magique.webp",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('alistair_foi_libre') || gs.hasFlag('alistair_porte_ouverte') || gs.hasFlag('alistair_pure')) {
      return "L’Ordre du Soleil ouvre ses portes sans les refermer derrière toi. Alistair se tient près du seuil, son insigne éteint dans la paume.\n\n« Je ne serai plus ton geôlier, » dit-il. « Et je ne demanderai à aucune lumière de décider si je peux rester. »\n\nTu n’es ni miracle ni prisonnière. Lui n’est ni gardien ni serrure. Lorsque vous avancez, la porte demeure ouverte derrière vous — assez large pour partir, assez réelle pour choisir de revenir.";
    }
    let text = "L’Ordre du Soleil a su te donner un sanctuaire — et un sanctuaire ressemble toujours assez à une prison pour qu’on ne voie la différence qu’une fois les portes fermées.\n\n";
    text += "Alistair se tient près de toi, lumière tenue droite, foi devenue serrure. On t’appelle miracle, on t’appelle salut. Lui s’appelle fidélité.\n\n";
    text += "Tu n’es plus chassée. Tu n’es plus libre non plus. Et lui non plus : chaque jour il vérifie les seuils, les distances, les prières. Il est le gardien — et le prisonnier du rôle.\n\n";
    text += "Personne n’ose dire le mot cage. C’est pour ça qu’elle tient.";
    if (gs.hasFlag('domination_finale') || gs.hasFlag('crevasse_domination')) {
      text += "\n\nIl s’est agenouillé. Il restera à genoux. La cage dorée est la sienne autant que la tienne.";
    }

    if (gs.hasFlag('doute_alistair_progressif')) {
      text += "\n\nTu te souviens de cette nuit dans l'auberge. Il priait sans mots. Son insigne était éteint. Ses doigts traçaient des cercles dans la poussière — des cercles qui ressemblaient à une cage, ou à un berceau. Il ne savait pas que tu le regardais.\n\nCe soir, sa cage dorée est la sienne autant que la tienne. Il ne prie plus pour le monde. Il prie pour que tu ne sortes jamais.";
    }

    return text;
  },
  choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
},

'FIN_SOLO': {
  sceneNumber: 'FIN_SOLO',
  chapter: 4,
  title: 'Ligne de Fuite',
  mood: 'end',
  isEnd: true,
  postEnding: false,
  achievementId: 'ach_fin_solo',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/fin-aube.webp",
  getDynamicNarrative: (gs) => {
    let text = "Tu quittes le Trône sans te retourner. Derrière toi, Kaelen et Alistair restent dans la nef — compagnons de route jusqu’ici, pas guides pour la suite.\n\n";
    text += "Le Nord s’ouvre devant toi. Tu as choisi ta route sans maître. Le monde gardera des histoires sur toi ; aucune ne pourra t’atteindre là où tu vas.\n\n";
    text += "Tu n’es plus un symbole. Tu es une fuite — librement choisie.";

    if (gs.hasFlag('solo_couronne')) {
      text += "\n\nDans le silence qui suit, une voix intérieure — la tienne, plus ancienne — murmure : « La couronne n’était jamais sur une tête. Elle était dans le choix de marcher sans t’appuyer. »";
    }

    if (gs.hasFlag('fen_refuse')) {
      text += "\n\nTu te souviens de la main tendue au seuil, refermée sur du givre. Refuser l’adieu n’a pas retenu Kalthar. Cela t’a seulement appris qu’aimer quelqu’un ne suffit pas à empêcher son départ.";
    } else if (gs.hasFlag('fen_silence')) {
      text += "\n\nTu n’as rien dit au moment de le perdre. Ce silence marche maintenant avec toi — non comme une dette, mais comme la dernière place que tu lui as laissée libre.";
    } else if (gs.hasFlag('fen_accepte')) {
      text += "\n\nTu ne sens plus Fen contre ta gorge. Mais parfois, quand le vent tombe, tu crois entendre un sifflement très bas. Très ancien. Pas une présence à retenir : le souvenir d’un roi qui t’a enfin rendue au monde.";
    } else {
      text += "\n\nFen n’est plus là. Kalthar non plus. Pour la première fois, avancer ne signifie pas être suivie.";
    }

    return text;
  },
  choices: []
},

'FIN_RECONCILIATION': {
  sceneNumber: 'FIN_RECONCILIATION',
  chapter: 4,
  title: 'Ligne Commune',
  mood: 'end',
  isEnd: true,
    postEnding: true,
  achievementId: 'ach_fin_reconciliation',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/serre.webp",
  getDynamicNarrative: (gs) => {
    return "Tu refuses la domination comme la soumission. Tu fais du givre une frontière fine, assez forte pour protéger sans étouffer.\n\n" + "Kaelen accepte un amour qui n’est plus une prise de territoire — orgueil plié, pas brisé.\n\n" + "Alistair lâche assez le besoin de cage pour rester sans devoir te résoudre. Pour lui, c’est le maximum d’une vie.\n\n" + "Chacun perd une version de soi. Personne ne possède personne. Le monde ne t’appartient pas. Tu n’appartiens à personne.\n\n" + "On ne s’est pas sauvés. On a cessé de se posséder.";
  },
  choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
},

'FIN_BRISEE': {
  sceneNumber: 'FIN_BRISEE',
  chapter: 4,
  title: 'Hiver Inachevé',
  mood: 'end',
  isEnd: true,
    postEnding: true,
  achievementId: 'ach_fin_brisee',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp",
  getDynamicNarrative: (gs) => {
    if (gs.hasFlag('voie_solo') || gs.hasFlag('voie_solo_profonde')) {
      return "Tu restes immobile, et le monde aussi. Rien ne tranche. Rien ne s’effondre complètement. Rien ne guérit. Le Trône te garde comme il garde les pierres : dans le froid, dans l’attente, dans l’absence de réponse.\n\n" + "Kaelen et Alistair s’éloignent sans que tu les retiennes. Compagnons de route, jamais guides — tu ne leur as jamais promis d’arrivée.\n\n" + "L’hiver continue, mais il ne sait plus vers quoi aller.";
    }
    return "Tu restes immobile, et le monde aussi. Rien ne tranche. Rien ne s’effondre complètement. Rien ne guérit. Le Trône te garde comme il garde les pierres : dans le froid, dans l’attente, dans l’absence de réponse. Tes guides s’éloignent sans que tu les retiennes. L’hiver continue, mais il ne sait plus vers quoi aller.";
  },
  choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
},

'FIN_CHAOS': {
  sceneNumber: 'FIN_CHAOS', 
  chapter: 4, 
  title: "La Tempête Sans Nom", 
  mood: 'epilogue',
  image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/fin-chaos.webp",
  transitionGif: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/animations/tempete-finale.mp4",
  sprite: null, 
  voice: "",
  getDynamicNarrative: (gs) => {
    return "La jauge mentale cède. Il n’y a pas de cri, pas de dernier mot — seulement une dissolution, syllabe par syllabe, jusqu’à ce que le nom lui-même n’ait plus de bouche pour le porter.\n\n" + "Kaelen et Alistair disparaissent dans le même blanc — témoins un instant, puis rien.\n\n" + "Tu te dissous et deviens la tempête elle-même. Dans cent ans, on parlera d’un blizzard qui n’a jamais cessé. Personne ne saura qu’il fut, un jour, une reine.";
  },
  isEnd: true,
    postEnding: false,
  achievementId: "ach_fin_chaos", 
  choices: []
},

'FIN_TEMOIN': {
    sceneNumber: 'FIN_TEMOIN',
    chapter: 4,
    title: "L’Ombre du Trône",
    mood: 'epilogue',
    isEnd: true,
    postEnding: true,
    achievementId: "ach_fin_temoin",
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp",
    getDynamicNarrative: (gs) => {
      let text = "Tu règne. Le continent plie sous le givre, mais pas jusqu’à se briser.\n\n" + "Kaelen et Alistair restent dans l’ombre du Trône — non comme souverains, non comme prisonniers. Comme deux hommes qui ont enfin cessé de se mentir.\n\n" + "Tu ne les as pas choisis l’un contre l’autre. Tu les as simplement laissés se choisir.\n\n" + "Et de temps en temps, quand la neige tombe plus dense, tu sens deux regards qui ne te demandent plus rien.";
      if (gs.hasFlag('tension_kaelen_alistair_apaisee')) {
        text += "\n\nTu te souviens de cette nuit autour du feu. Kaelen avait poussé un tison vers Alistair. Sans un mot. Le prêtre avait hoché la tête. Un geste minuscule. Mais c’était la première fois depuis des semaines qu’ils partageaient quelque chose sans que ce soit toi.\n\nCe soir, ils partagent l’ombre du Trône. Pas parce que tu les y as forcés. Parce qu’ils ont choisi d’y rester ensemble.";
      }
      if (gs.hasFlag('fen_accepte')) {
        text += "\n\nFen n’est plus là. Mais parfois, quand la neige tombe plus dense, une chaleur fantôme revient contre ta gorge. Tu sais qu’elle ne respire pas : c’est ton corps qui se souvient avant toi.";
      }
      return text;
    },
    choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
  },




  //==========================================
  // V26.4.0 — NOUVELLES SCÈNES
  //==========================================

'FIN_EQUILIBRE': {
    sceneNumber: 'FIN_EQUILIBRE',
    chapter: 4,
    title: "Le Trône sans Ombre",
    mood: 'end',
    isEnd: true,
    postEnding: true,
    achievementId: 'ach_fin_equilibre',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp",
    getDynamicNarrative: (gs) => {
      let text = "Tu t'assieds sur le Trône d'Ébène. Mais tu ne gèles rien.\n\n" +
        "Les trois reliques de Kalthar pulsent dans tes paumes — éclat de couronne, sceau royal, fragment de stèle — et se fondent en une seule lumière, ni chaude ni froide. Juste vraie.\n\n" +
        "Kaelen reste debout. Pas à genoux. Pas en garde. Debout, comme un homme qui a choisi de rester sans qu'on le lui demande.\n\n" +
        "Alistair reste debout aussi. Son insigne est rallumé, mais il ne le brandit plus. Il le porte comme on porte un souvenir, pas comme une arme.\n\n" +
        "Tu n'as choisi ni l'un ni l'autre. Tu ne les as pas rejetés non plus. Tu as simplement cessé d'être le centre de leur guerre — et ils ont cessé, d'eux-mêmes, de se battre.\n\n" +
        "Le monde ne t'appartient pas. Tu ne leur appartiens pas. Et pour la première fois depuis ton réveil, ce n'est pas une perte. C'est un équilibre.";
      if (gs.hasFlag('relique_silas')) {
        text += "\n\nQuelque part dans le Sud, un marchand lève les yeux vers le ciel. Il ne sait pas pourquoi. Mais il sourit.";
      }
      if (gs.hasFlag('oraya_pardonnee')) {
        text += "\n\nQuelque part dans le village caché, Oraya lève les yeux vers le ciel. Elle ne prie plus. Elle veille. Et pour la première fois depuis des siècles, elle sait pourquoi.";
      }
      if (gs.hasFlag('lyra_liberee')) {
        text += "\n\nQuelque part dans les lacs du Nord, une voix s'élève. Pas un chant de sirène. Une voix humaine. Lyra ne chante plus pour survivre. Elle chante pour se souvenir de ce qu'elle était avant que l'Ordre ne la brise.";
      }
      if (gs.hasFlag('fen_accepte')) {
        text += "\n\nTu ne sens plus Fen contre ta gorge. Mais parfois, quand le vent tombe, tu entends un sifflement très bas. Très ancien. Comme une note qu'un roi chantait à sa reine, il y a très longtemps.";
      }
      if (gs.hasFlag('silas_verite_acceptee')) {
        text += "\n\nQuelque part dans le Sud, une bannière se déploie. Les serviteurs de Kalthar ont attendu trois siècles. Ce soir, ils servent encore — mais par choix, pas par dette.";
      }
      if (gs.hasFlag('silas_verite_brulee')) {
        text += "\n\nQuelque part dans le Sud, un marchand regarde brûler un parchemin. Il ne pleure pas. Il sourit. Pour la première fois de sa vie, il est libre.";
      }
      return text;
    },
    choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
  },

// V26.5.0 — ARC ORAYA / LYRA / FEN
  //==========================================

'FIN_REDEMPTION': {
    sceneNumber: 'FIN_REDEMPTION',
    chapter: 4,
    title: "La Reine qui Pardonne",
    mood: 'end',
    isEnd: true,
    postEnding: true,
    achievementId: 'ach_fin_redemption',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp",
    getDynamicNarrative: (gs) => {
      let text = "Tu t'assieds sur le Trône d'Ébène. Mais tu ne gèles rien.\n\n" +
        "Oraya se tient à ta gauche. Elle n'est plus une prêtresse. Elle est une gardienne. Son insigne — celui qu'elle a porté pendant des siècles en te veillant — pulse d'une lumière bleue, ni chaude ni froide. Juste vraie.\n\n" +
        "Lyra se tient à ta droite. Elle n'est plus une sirène. Elle est une voix. Ses yeux ne sont plus opalins — ils sont humains, fatigués, anciens. Elle ne chante plus pour survivre. Elle chante pour se souvenir.\n\n" +
        "La place contre ta gorge est vide. Fen n’est plus un familier à tes côtés : tu sais maintenant qu’il était Kalthar, ou ce qu’il en restait. Il t’a attendue, jugée, mordue, guidée — puis il est parti lorsque tu lui as enfin permis de reposer sa dette. Sa couronne, elle, est restée avec toi.\n\n";
      if (gs.hasFlag('avec_ombre') || gs.hasFlag('kaelen_absous')) {
        text += "Kaelen reste debout. Pas à genoux. Pas en garde. Debout, comme un homme qui a choisi de rester sans qu'on le lui demande. Il ne porte plus de contrat. Il porte un choix.\n\n";
      }
      if (gs.hasFlag('avec_eclaireur') || gs.hasFlag('alistair_redime')) {
        text += "Alistair reste debout aussi. Son insigne est rallumé, mais il ne le brandit plus. Il le porte comme on porte un souvenir, pas comme une arme. Il ne prie plus pour le monde. Il prie pour que tu ne souffres plus.\n\n";
      }
      text += "Tu n'as pas choisi l'un contre l'autre. Tu n'as pas rejeté Oraya. Tu n'as pas puni Lyra. Tu as simplement cessé d'être le centre de leur guerre — et eux ont cessé, d'eux-mêmes, de se battre.\n\n" +
        "Le monde ne t'appartient pas. Tu ne leur appartiens pas. Et pour la première fois depuis ton réveil, ce n'est pas une perte.\n\n" +
        "C'est une rédemption.";
      if (gs.hasFlag('relique_silas')) {
        text += "\n\nQuelque part dans le Sud, un marchand lève les yeux vers le ciel. Il ne sait pas pourquoi. Mais il sourit.";
      }
      if (gs.hasFlag('panthere_liberee')) {
        text += "\n\nQuelque part dans les ruines de la volière, une plume de givre pulse une dernière fois. Puis s'éteint. La veille que tu n'as pas volée a trouvé sa paix.";
      }
      if (gs.hasFlag('silas_verite_acceptee')) {
        text += "\n\nQuelque part dans le Sud, une bannière se déploie. Les serviteurs de Kalthar ont attendu trois siècles. Ce soir, ils servent encore — mais par choix, pas par dette.";
      }
      return text;
    },
    choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
  },

'FIN_VERITE': {
    sceneNumber: 'FIN_VERITE',
    chapter: 4,
    title: "Le Trône de Vérité",
    mood: 'end',
    isEnd: true,
    postEnding: true,
    achievementId: 'ach_fin_verite',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp",
    getDynamicNarrative: (gs) => {
      let text = "Tu t'assieds sur le Trône d'Ébène. Et pour la première fois depuis ton réveil, tu sais qui tu es.\n\n" +
        "Tu es Elenya. Reine de Givre. Gardienne du secret. Prisonnière de la stèle. Et aujourd'hui, libre de choisir ce que tu en fais.\n\n";
      if (gs.hasFlag('frag4_nom_prononce')) {
        text += "Oraya est là. Tu as prononcé son nom. Elle t'a mise sur la stèle. Elle t'a gardée en vie. Elle t'a attendue pendant des siècles. Tu ne sais pas si c'est de l'amour ou de la culpabilité. Tu ne sais pas si tu dois la remercier ou la punir.\n\n" +
          "Mais tu sais que le cycle ne se referme pas sans elle.\n\n";
      }
      if (gs.hasFlag('verite_mine')) {
        text += "Tu as dit la vérité à la mine. Tu as stabilisé cette montagne pendant que leurs ancêtres pillaient le Mana. L'Ordre a préféré l'oubli à la gratitude. Mais toi, tu n'oublies pas.\n\n";
      }
      if (gs.hasFlag('fen_fresque') && gs.hasFlag('fen_note')) {
        text += "Fen n'est plus là. Mais tu sais, maintenant, qu'il n'était pas un familier. Il était Kalthar. Ou ce qu'il en restait. Un roi réduit à un furet, attendant ton réveil pendant des siècles. Il t'a jugée. Il t'a mordue. Il t'a guidée. Et maintenant, il te rend ta couronne.\n\n";
      }
      text += "Le Trône n'est pas une fin. C'est une prison de ton propre choix. Oraya t'a scellée pour te protéger du monde. Le monde t'a réveillée pour te détruire. Et toi, tu vas décider qui avait raison.\n\n" +
        "Tu ne figes pas le monde. Tu ne le libères pas non plus. Tu le regardes. Et tu choisis, pour la première fois, ce que tu en fais.\n\n" +
        "Pas parce que tu le dois. Pas parce que tu le peux. Mais parce que tu le veux.";
      if (gs.hasFlag('oraya_pardonnee')) {
        text += "\n\nOraya sourit. Pas de soulagement. De paix. Elle a veillé pendant des siècles. Et ce soir, pour la première fois, elle peut dormir.";
      }
      if (gs.hasFlag('silas_verite_acceptee')) {
        text += "\n\nQuelque part dans le Sud, une bannière se déploie. Les serviteurs de Kalthar ont attendu trois siècles. Ce soir, ils servent encore — mais par choix, pas par dette.";
      }
      return text;
    },
    choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
  },

'GAME_OVER_VENIN': {
    sceneNumber: 'GAME_OVER_VENIN',
    chapter: 3,
    title: "[FIN PRÉMATURÉE : Le Venin de Fen]",
    mood: 'gameover',
    sprite: null,
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/foret-noire.webp",
    voice: "",
    getDynamicNarrative: (gs) => {
      let text = "La veine noire atteint ton cœur un soir, sans bruit. Pas de cri. Pas de lutte. Juste un froid qui n'est plus le tien — un froid étranger, qui te prend de l'intérieur.\n\n";
      if (gs.hasFlag('avec_ombre')) {
        text += "Kaelen te trouve au matin, assise contre un rocher, les yeux ouverts sur un ciel que tu ne vois plus. Il reste là une heure. Deux. Puis il range ses dagues et s'éloigne sans un mot. Le contrat est rompu. La dette est close.\n\n";
      } else if (gs.hasFlag('avec_eclaireur')) {
        text += "Alistair te trouve au matin, assise contre un rocher, les yeux ouverts sur un ciel que tu ne vois plus. Il prie. Pas pour ton âme. Pour la sienne — pour qu'il puisse porter ce qu'il n'a pas su empêcher.\n\n";
      } else {
        text += "Fen te trouve au matin. Il reste contre ta gorge jusqu'à ce que ton corps refroidisse. Puis il s'éloigne vers le nord, seul, comme il l'a été pendant trois cents ans.\n\n";
      }
      text += "Le venin de Fen t'a tuée. Pas parce que tu étais faible. Parce que tu as cru que tu avais le temps.";
      return text;
    },
    isEnd: true,achievementId: "ach_venin",
    choices: []
  },

 // ==========================================
  // ACTE 1 : L'ÉVEIL DU GIVRE (enrichi AAA)
  // ==========================================

// --- Suite Acte 1 (Fresque, Automate, Bivouac) conservée et légèrement enrichie ---
  // (Les scènes ACTE1_04_FRESQUE à ACTE1_06_REMONTEE restent structurellement identiques
  //  à V26.5.1.1 avec ajouts mineurs de jauges possession / memoire_kalthar / volonte
  //  et échos Mémoire du Monde. Texte intégral disponible sur demande de PARTIE détaillée.)

  // ==========================================
  // NOUVELLES SCÈNES V27 — PERSONNAGES
  // ==========================================

'GAME_OVER_POSSESSION': {
    sceneNumber: 'GAME_OVER_POSSESSION',
    chapter: 3,
    title: "[FIN PRÉMATURÉE : La Possession]",
    mood: 'gameover',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Immense_salle_du_tr%C3%B4ne_d_%C3%A9b%C3%A8ne_202606191345.jpeg",
    isEnd: true,
    achievementId: "ach_possession",
    getDynamicNarrative: (gs) => {
      return "Tu as trop pris. Trop gardé. Trop refusé de lâcher.\n\n" +
        "Le monde autour de toi se fige — non par magie, mais par refus. Les gens s’écartent. Les portes se ferment. Même Fen détourne les yeux.\n\n" +
        "Tu restes seule au centre d’un cercle de silence. Tu as gagné. Tu as tout. Et il ne reste plus rien à posséder.\n\n" +
        "La dernière chose que tu entends est ta propre voix qui demande : « Pourquoi personne ne reste ? »\n\n" +
        "Personne ne répond.";
    },
    choices: []
  },

  // ... (les scènes V26 restantes — LIEN_*, R_*, FRAGMENT_*, FINS, etc. — sont conservées
  //      et seront livrées intégralement dans les PARTIES suivantes avec enrichissements
  //      possession / memoire_kalthar / volonte / échos Mémoire du Monde)


  // ==========================================
  // SUITE ACTE 1 — FRESQUE → REMONTÉE (enrichi V27)
  // ==========================================

// ==========================================
  // SCÈNES DE LIEN ENRICHIES (V27)
  // ==========================================

// ==========================================
  // ACTE 2 — AUBERGE & ROMANCES (enrichi V27)
  // ==========================================

// JOUTE O_1 (extrait enrichi)
// JOUTE E_1 (extrait enrichi)
// ==========================================
  // ACTE 3 — URGENCE + VILLAGE + ARCS ORAYA/LYRA/FEN + NOUVEAUX
  // ==========================================

// Seraphine déjà livrée en PARTIE 2 — version courte rappel

'FIN_VEYRA': {
    sceneNumber: 'FIN_VEYRA',
    chapter: 4,
    title: "La Reine Noire",
    mood: 'end',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Immense_salle_du_tr%C3%B4ne_d_%C3%A9b%C3%A8ne_202606191345.jpeg",
    isEnd: true,
    postEnding: true,
    achievementId: 'ach_fin_veyra',
    getDynamicNarrative: (gs) => {
      let text = "Tu as pris la main de Veyra. Le pacte s’est refermé comme une lame autour de deux volontés qui avaient juré de ne dépendre de personne.\n\n";
      text += "Le Trône n’a pas résisté. Il a reconnu quelque chose de plus ancien que la royauté : l’appétit de survivre sans témoin, sans dette et sans permission. Le givre devient noir aux jointures de tes doigts. Veyra ne s’incline pas. C’est précisément pour cela que tu la gardes près de toi.\n\n";
      if (gs.hasItem && gs.hasItem('fragment_couronne_veyra')) text += "Le fragment de couronne noire reste sur ton bureau. Certaines nuits, il pulse à contretemps de ton givre, rappel discret que la version de Veyra sur Kalthar n’a jamais été entièrement vérifiée.\n\n";
      if (gs.hasFlag('veyra_recit_mis_en_doute')) text += "Le Nomade a fissuré une partie du récit de Veyra : le fragment n’était pas ce qu’elle prétendait. Tu choisis pourtant le pacte en connaissance de cause. Ce n’est plus de la crédulité. C’est une décision — et donc une responsabilité.\n\n";
      if (gs.getGauge('possession') >= 15) text += "Au début, tu appelles cela un pacte entre égales. Puis les portes du palais cessent de s’ouvrir sans ton ordre. Les messagers apprennent à baisser les yeux. Même Veyra commence à mesurer la distance entre ta main et la sienne avant de parler. Tu comprends trop tard que le pouvoir sans attache sait fabriquer ses propres chaînes.\n\n";
      else text += "Veyra te rappelle chaque fois que tu transformes une décision en décret. Elle n’est ni amante docile ni prêtresse. Elle est la preuve vivante que quelqu’un peut rester sans appartenir. Cette friction empêche ton règne de devenir tout à fait une tyrannie — mais jamais tout à fait une paix.\n\n";
      text += "Kaelen n’est plus à ta droite. Alistair ne veille plus à gauche. Oraya a quitté le sanctuaire. Les fidèles prononcent ton nom comme on prononce une météo dangereuse. Dans les villages, les enfants apprennent à reconnaître le ciel avant les armoiries : lorsque les nuages prennent une teinte d’encre, la Reine Noire regarde vers eux.\n\n";
      if (gs.hasFlag('silas_ami')) text += "Silas continue pourtant de laisser un bouton gravé sur les bornes de route. Un objet minuscule, inutile face à ton pouvoir. Tu n’en fais jamais retirer un seul.\n\n";
      text += "Tu règnes. Tu ne manques de rien. C’était la promesse.\n\nEt certains soirs, lorsque Veyra dort loin de toi par choix, tu comprends la clause que personne n’avait écrite : ne dépendre de personne n’est pas la même chose qu’être libre. La solitude absolue est encore une forme de possession — celle d’un monde où plus rien ne peut te quitter parce que plus rien n’ose vraiment entrer.";
      return text;
    },
    choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
  },

'FIN_SERAPHINE': {
    sceneNumber: 'FIN_SERAPHINE',
    chapter: 4,
    title: "La Sœur de Lumière",
    mood: 'end',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/seraphine.webp",
    isEnd: true,
    postEnding: true,
    achievementId: 'ach_fin_seraphine',
    getDynamicNarrative: (gs) => {
      let text = "Seraphine reste debout quand tous les autres s’agenouillent. Son insigne de l’Inquisition brille dans la salle du Trône comme une seconde lame.\n\n";
      text += "« L’Ordre a perdu un frère », dit-elle. Sa voix ne tremble pas. « Il ne gagnera pas une nouvelle prison. »\n\n";
      if (gs.hasFlag('alistair_mort')) text += "Le nom d’Alistair ne peut plus être utilisé comme argument. Il est devenu une absence entre vous, quelque chose que ni la doctrine ni ton givre ne peuvent ressusciter. Seraphine te hait encore certains matins pour avoir survécu là où lui n’a pas pu. Elle se hait davantage de savoir que ce n’est pas toute la vérité.\n\n";
      else text += "Alistair est vivant quelque part hors de cette salle. Seraphine refuse de le transformer en monnaie de négociation. Pour la première fois, son frère n’est plus un sceau, un paladin ou un héritier : seulement un homme qui devra décider lui-même s’il revient.\n\n";
      text += "Tu ne dissous pas l’Ordre. Tu lui retires son droit de parler au nom du salut. Les tribunaux sacrés deviennent des chambres de témoignage. Les geôles bénies sont ouvertes. Les serments héréditaires sont brûlés un par un sous le regard de celle qui les avait défendus toute sa vie.\n\n";
      if (gs.hasFlag('seraphine_ennemie')) text += "Seraphine ne te pardonne pas. Elle travaille avec toi comme on travaille avec une tempête contenue : sans confiance, sans dévotion, avec une vigilance qui t’empêche parfois de devenir ce qu’elle craignait. Cette hostilité devient étrangement utile.\n\n";
      else text += "Seraphine finit par te croire sur un point seulement : une protection imposée reste une cage, même lorsque ses barreaux sont faits de lumière. Ce n’est pas de l’amitié. C’est mieux que l’obéissance.\n\n";
      text += "Des années plus tard, on l’appelle la Sœur de Lumière non parce qu’elle t’a servie, mais parce qu’elle a appris à tenir une lampe sans décider qui devait marcher dessous.\n\nEt quand tu regardes le Trône, tu comprends enfin ce que cette fin t’a coûté : tu n’as pas vaincu l’Ordre. Tu lui as retiré l’excuse d’aimer en enfermant. À toi maintenant de ne pas reprendre cette excuse sous un autre nom.";
      return text;
    },
    choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
  },

'FIN_MIRA': {
    sceneNumber: 'FIN_MIRA',
    chapter: 4,
    title: "Ligne de Contrebande",
    mood: 'end',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Cr%C3%AAte_neigeuse_202606191345.jpeg",
    isEnd: true,
    postEnding: true,
    achievementId: 'ach_fin_mira',
    getDynamicNarrative: (gs) => {
      let text = "Tu quittes le Trône avant que quelqu’un ait le temps de transformer ton départ en cérémonie. Mira t’attend au-delà des dernières marches, manteau rapiécé, plume blanche dans les cheveux et un sac beaucoup trop léger pour une fuite historique.\n\n";
      text += "« T’as vraiment laissé tomber le continent ? » demande-t-elle.\n\n« J’ai laissé tomber l’idée qu’il devait m’appartenir pour survivre. »\n\nMira réfléchit une seconde. « C’est moins drôle comme réponse. Mais ça fera l’affaire. »\n\n";
      text += "Vous partez par les routes que les cartes royales considèrent comme des erreurs : cols de contrebandiers, ponts effondrés, villages sans bannière. Au début, les gens reconnaissent ton visage. Ils t’appellent Majesté. Mira répond systématiquement : « Elle voyage léger, alors évitez les titres encombrants. »\n\n";
      if (gs.hasItem && gs.hasItem('plume_mira')) text += "La plume blanche qu’elle t’avait donnée est encore dans ta poche lorsque vous franchissez la première frontière. Mira la remarque et n’en dit rien. Le sourire suffit : tu avais gardé la preuve qu’une rencontre pouvait compter sans devenir un serment.\n\n";
      if (gs.hasFlag('nomade_offrande_plume')) text += "Ta plume, elle, est restée derrière sur une borne de glace, offerte à l’homme silencieux de la rivière. Mira hausse les épaules quand tu le lui racontes. « Tant mieux. Les cadeaux qui circulent vivent plus longtemps. »\n\n";
      if (gs.hasFlag('mira_complice')) text += "Elle te confie les codes, les caches, les noms qu’on ne prononce pas devant les douaniers. Tu lui confies quelque chose de plus difficile : le droit de te dire non sans craindre le givre. Votre complicité ne ressemble à aucune cour. Elle ne demande aucune fidélité éternelle.\n\n";
      else text += "Mira garde ses distances au début. Elle t’apprend quand même à payer un repas, à dormir sous un toit qui fuit et à ne pas corriger chaque injustice comme si le monde entier était encore ton royaume.\n\n";
      if (gs.hasFlag('silas_bouton_garde')) text += "Le bouton de Silas finit cousu à l’intérieur de ton manteau. Personne ne le voit. C’est justement pour cela que tu le gardes : un rappel que l’histoire peut tenir dans un objet sans devenir une relique.\n\n";
      text += "Kaelen et Alistair restent derrière — s’ils sont encore vivants, ils deviennent des personnes plutôt que des directions. Certains hivers, une lettre arrive. Tu réponds parfois. Parfois non. La liberté vaut aussi par ce qu’elle autorise à ne pas poursuivre.\n\n";
      text += "Des années plus tard, une légende circule au Nord : une ancienne reine traverse les frontières avec une contrebandière insolente et paie toujours trop cher son pain. Personne ne sait si c’est vrai.\n\nPour la première fois depuis trois siècles, cela ne t’importe pas. Ton nom n’a plus besoin d’être une couronne pour être le tien.";
      return text;
    },
    choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
  },

'FIN_CORONA': {
    sceneNumber: 'FIN_CORONA',
    chapter: 5,
    title: "Corona Glacialis",
    mood: 'end',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Campement_dans_la_neige_(matin)_202606191345.jpeg",
    isEnd: true,
    postEnding: true,
    achievementId: 'ach_fin_corona',
    getDynamicNarrative: (gs) => {
      let text = "Tu refuses le Trône. Tu refuses aussi la fuite. Entre ces deux gestes existe une troisième possibilité que personne n’avait prévue parce qu’elle ne ressemble ni à une victoire ni à un sacrifice.\n\n";
      text += "Tu marches jusqu’à l’endroit où le Gel rencontre encore la terre vivante. Là, tu poses les deux mains dans la neige et la mémoire de Kalthar remonte sans t’engloutir. Tu comprends enfin la forme exacte de son erreur : il avait voulu devenir une porte. Une porte finit toujours par appartenir à celui qui possède la clé.\n\n";
      text += "Alors tu deviens une frontière. Pas un mur. Pas une serrure. Une ligne capable de reculer, d’avancer et de laisser passer. Le givre cesse d’obéir à des décrets. Il répond à ton attention comme un animal ancien que l’on ne dresse plus.\n\n";
      if (companionPresentO(gs) && gs.getGauge('lien_O') >= 4) text += "Kaelen marche parfois sur le versant sombre de la ligne. Il ne demande plus où elle mène. Il demande seulement si tu veux de la compagnie aujourd’hui. Certains jours, la réponse est non. Il revient quand même le lendemain, sans contrat.\n\n";
      if (companionPresentE(gs) && gs.getGauge('lien_E') >= 4) text += "Alistair entretient des feux du côté habité. Il a cessé de bénir la frontière. « Elle n’a pas besoin de ma permission pour tenir », dit-il aux pèlerins. C’est probablement la prière la plus sincère qu’il ait jamais prononcée.\n\n";
      if (!companionPresentO(gs) && !companionPresentE(gs)) text += "Personne ne marche à tes côtés. Ce n’est ni une punition ni un échec. Les villages laissent parfois du thé chaud sur les bornes de glace. Tu le bois seule et tu repars seule, entière.\n\n";
      text += "Les générations cessent peu à peu de parler d’une reine. Elles parlent de Corona Glacialis comme d’une géographie vivante : ici commence le froid qu’on respecte ; ici finit le feu qu’on ne laissera plus dévorer le monde.\n\nTu n’es pas immortelle au sens où l’étaient les légendes. Tu changes. Tu fatigues. Tu apprends. La frontière change avec toi.\n\nEt pour la première fois, protéger quelque chose ne signifie pas décider à sa place de ce qu’il doit devenir.";
      return text;
    },
    choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
  },

'FIN_DETTE_ANNULEE': {
    sceneNumber: 'FIN_DETTE_ANNULEE',
    chapter: 4,
    title: "Dettes Soldées",
    mood: 'end',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%204/Immense_salle_du_tr%C3%B4ne_d_%C3%A9b%C3%A8ne_202606191345.jpeg",
    isEnd: true,
    postEnding: true,
    achievementId: 'ach_fin_dette_annulee',
    getDynamicNarrative: (gs) => {
      let text = "Tu ne t’assieds pas immédiatement. Devant le Trône, tu prononces les noms un à un, non comme une reine faisant l’appel de ses sujets, mais comme une femme rendant ce qu’elle n’avait jamais eu le droit de conserver.\n\n";
      text += "« Oraya. Lyra. Fen. Silas. Kaelen. Alistair. Tous ceux qui m’ont portée, gardée, vendue, aimée, haïe ou sauvée sans me demander si je voulais l’être. »\n\nLe givre grimpe sur les accoudoirs. Tu poses une main dessus. « La dette est annulée. »\n\n";
      if (gs.hasFlag('dette_O_confrontee')) text += "Le contrat de Kaelen se couvre de blanc dans ta mémoire. Pas effacé : rendu à celui qui l’a signé. S’il reste, ce ne sera plus parce qu’une ancienne clause a survécu à ses auteurs.\n\n";
      if (gs.hasFlag('dette_E_confrontee')) text += "Le sceau d’Alistair cesse de brûler comme une obligation. Il peut garder sa foi, la perdre ou la reconstruire. Tu refuses seulement qu’elle continue à porter ton nom comme une serrure.\n\n";
      if (gs.hasFlag('silas_bouton_garde')) text += "Dans ta poche, le bouton gravé de Silas cogne contre ta paume. Une dette minuscule, presque ridicule. Tu souris. Les petites choses aussi ont le droit d’être rendues sans devenir des serments.\n\n";
      text += "Tu fais ouvrir les registres. Les créances héréditaires de l’Ordre sont abolies. Les pactes de sang des Confrères expirent avec ceux qui les ont conclus. Les cultes n’ont plus le droit de transmettre une faute comme un héritage. Le royaume découvre quelque chose de beaucoup plus terrifiant que la vengeance : des individus obligés de choisir à nouveau ce qu’ils veulent faire de leur vie.\n\n";
      text += "Certains te remercient. D’autres t’accusent d’avoir détruit l’ordre du monde. Ils ont raison sur un point : l’ancien ordre reposait précisément sur le fait que chacun devait quelque chose à quelqu’un de mort.\n\n";
      if (gs.getGauge('volonte') >= 12) text += "Tu refuses finalement le siège et fais du Trône une salle d’audience vide. Aucune volonté unique n’y devient loi.\n\n";
      else text += "Tu t’assieds encore sur le Trône, mais tu fais graver une phrase sous tes pieds : AUCUNE DETTE NE SURVIT À CELUI QUI L’A CHOISIE. Elle s’adresse autant à toi qu’aux autres.\n\n";
      text += "Le silence qui suit n’est plus une cage. C’est l’espace inconfortable où chacun doit répondre de ses propres choix. Pour une fois, personne ne peut appeler cela du destin.";
      return text;
    },
    choices: [{ key: 'EPILOGUE', text: "Voir ce qui reste après le Trône.", next: 'ACTE5_01_LENDEMAIN' }]
  },
  };
}
