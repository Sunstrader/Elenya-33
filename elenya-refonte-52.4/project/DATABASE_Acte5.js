/** V52 — fragment DB ACTE5.
 * Généré depuis V51.7.6 sans réécriture narrative.
 * 4 scènes.
 */
function _dbActe5V52_() {
  return {
'ACTE5_01_LENDEMAIN': {
    sceneNumber: 'ACTE5_01',
    chapter: 5,
    title: "Le Lendemain du Trône",
    mood: 'epilogue',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Campement_dans_la_neige_(matin)_202606191345.jpeg",
    getDynamicNarrative: (gs) => {
      let text = "Le jour se lève sur un monde qui a changé — ou qui n’a pas changé du tout.\n\n";
      text += "Tu es encore là. Ou plus tout à fait.\n\n";
      if (gs.hasFlag('fen_accepte')) {
        text += "Parfois, quand le vent tombe, tu entends encore un sifflement très bas.\n\n";
      }
      if (gs.hasFlag('oraya_pardonnee')) {
        text += "Oraya veille quelque part. Elle ne prie plus. Elle attend.\n\n";
      }
      text += "Le Trône est derrière toi. Ou sous toi. Ou en toi.\n\n";
      text += "Il reste à décider ce que tu en fais maintenant.";
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Rester. Veiller.",
        next: 'ACTE5_02_VEILLE'
      },
      {
        key: 'B',
        text: "Partir. Sans regarder en arrière.",
        next: 'ACTE5_02_DEPART'
      },
      {
        key: 'C',
        text: "Revenir sur tes pas. Voir qui reste.",
        next: 'ACTE5_02_RETOUR'
      }
    ]
  },

'ACTE5_02_VEILLE': {
    sceneNumber: 'ACTE5_02V',
    chapter: 5,
    title: "La Veille",
    mood: 'epilogue',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Place_du_village_avec_statue_202606191345.jpeg",
    isEnd: true,
    getDynamicNarrative: (gs) => {
      return "Tu restes.\n\n" +
        "Les saisons passent. Les gens s’habituent. Certains t’apportent des offrandes. D’autres te maudissent en silence.\n\n" +
        "Tu ne réponds plus. Tu veilles.\n\n" +
        "Et quelque part, dans le froid qui n’est plus tout à fait le tien, tu sais que c’est assez.";
    },
    choices: []
  },

'ACTE5_02_DEPART': {
    sceneNumber: 'ACTE5_02D',
    chapter: 5,
    title: "Le Départ",
    mood: 'epilogue',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Cr%C3%AAte_neigeuse_202606191345.jpeg",
    isEnd: true,
    getDynamicNarrative: (gs) => {
      let text = "Tu pars.\n\n" +
        "Sans couronne. Sans mythe. Sans dette.\n\n" +
        "Le Nord t’ouvre ses portes. Ou le Sud. Ou n’importe où.\n\n";
      if ((gs.getGauge('presence_O') || 0) >= 5) {
        text += "Derrière toi, une dague est plantée dans la neige. Kaelen ne t’a pas suivie. Il n’a pas eu besoin de le faire.\n\n";
      }
      if ((gs.getGauge('presence_E') || 0) >= 5) {
        text += "Plus loin, une faible lueur disparaît entre les arbres. Alistair prie encore — non pour te retenir, mais pour que ton choix reste tien.\n\n";
      }
      if ((gs.getGauge('presence_S') || 0) >= 8) {
        text += "Quand le vent se lève, trois notes semblent revenir avec lui. Tu reconnais la mélodie de Fen sans confondre le souvenir avec une présence. Tu n’as pas vaincu la solitude. Tu l’as choisie.\n\n";
      }
      text += "Pour la première fois, la route n’a pas de fin écrite à l’avance.\n\n" +
        "Et même lorsque tu marches seule, ceux qui t’ont aimée ne disparaissent plus simplement parce que tu leur as fermé la porte.";
      return text;
    },
    choices: []
  },

'ACTE5_02_RETOUR': {
    sceneNumber: 'ACTE5_02R',
    chapter: 5,
    title: "Ceux qui Restent",
    mood: 'epilogue',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Campement_dans_la_neige_(nuit)_202606191345.jpeg",
    isEnd: true,
    getDynamicNarrative: (gs) => {
      let text = "Tu reviens sur tes pas.\n\n";
      if (gs.hasFlag('avec_ombre') && !gs.hasFlag('kaelen_mort') && !gs.hasFlag('kaelen_perdu_definitif')) {
        text += "Kaelen est encore là. Il ne dit rien. Il range juste une dague de plus.\n\n";
      }
      if (gs.hasFlag('avec_eclaireur') && !gs.hasFlag('alistair_mort') && !gs.hasFlag('alistair_perdu_definitif')) {
        text += "Alistair est encore là. Son insigne est éteint. Il sourit quand même.\n\n";
      }
      if (gs.hasFlag('mira_alliee') || gs.hasFlag('mira_complice')) {
        text += "Mira lève un sourcil. « T’as oublié un truc ? »\n\n";
      }
      text += "Tu ne réponds pas. Tu t’assieds simplement à côté d’eux.\n\n";
      text += "Le monde peut attendre.";
      return text;
    },
    choices: []
  },
  // ==========================================
  // FRAGMENTS (enrichis V27)
  // ==========================================
  };
}
