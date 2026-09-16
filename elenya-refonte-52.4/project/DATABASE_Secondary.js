/** V52 — fragment DB SECONDARY.
 * Généré depuis V51.7.6 sans réécriture narrative.
 * 21 scènes.
 */
function _dbSecondaryV52_() {
  return {
'VEYRA_VERITE': {
  sceneNumber:'3.V2',chapter:3,title:"Le Fragment qui Ment",mood:'tension',
  getDynamicNarrative:(gs)=>{
    let t="Le fragment de couronne de Veyra chauffe dans ta paume alors qu'il devrait être mort depuis trois siècles.\n\nLe Nomade t'avait avertie : une relique ne ment pas comme une personne. Elle ment par omission.\n\n";
    if(gs.hasFlag('veyra_recit_mis_en_doute')) t+="Tu sais déjà que le récit de Veyra ne tient pas entièrement. Ce que tu découvres est pire : elle a mélangé deux vérités pour fabriquer une conclusion qui lui appartenait.\n\n";
    return t+"Veyra apparaît dans le reflet du métal. Comme toujours lorsqu'elle refuse de demander pardon, sa langue passe brièvement sur la cicatrice qui coupe sa lèvre. « Tu voulais savoir si je t'avais menti. La réponse est oui. Pas sur tout. C'est ce qui rend le mensonge utile. »";
  },
  choices:[
    {key:'VERITE',text:"« Alors donne-moi ce que tu as retiré de l'histoire. »",intent:'memoire',target:'Veyra',importance:'major',response:"Veyra ferme les yeux. « Kalthar avait choisi de mourir avant que tu choisisses pour lui. J'ai caché ça parce que je voulais que ta colère me soit utile. »",journal:"Tu as forcé Veyra à reconnaître qu'elle avait utilisé la mort de Kalthar pour orienter ta colère.",effects:[{type:'SET_FLAG',target:'veyra_verite_decouverte'},{type:'SET_FLAG',target:'veyra_mensonge_avoue'},{type:'ADD_GAUGE',target:'memoire_kalthar',value:2}],next:'RETURN'},
    {key:'BRISER',text:"Briser le fragment. Refuser que sa vérité continue de vivre dans un objet.",intent:'liberte',target:'Elenya',importance:'critical',irreversible:true,feedback:"Le fragment se fend. Veyra ne peut plus utiliser cette relique pour te rappeler à elle.",journal:"Tu as brisé le fragment de couronne de Veyra après avoir découvert que son récit était incomplet.",effects:[{type:'SET_FLAG',target:'veyra_verite_decouverte'},{type:'SET_FLAG',target:'veyra_fragment_brise'},{type:'ADD_GAUGE',target:'volonte',value:2},{type:'ADD_GAUGE',target:'possession',value:-1}],next:'RETURN'}
  ]
},

'VEYRA_DERNIER_PACTE': {
  sceneNumber:'4.V3',chapter:4,title:"Le Pacte qui n'en est plus un",mood:'intimate',
  getDynamicNarrative:(gs)=>"Veyra t'attend avant le Trône, sans contrat, sans garde, sans couronne. Son pouce trouve sa cicatrice, s'y arrête — puis sa main retombe avant le vieux geste de défense.\n\n« Si tu me choisis à la fin, je ne veux pas que ce soit parce que tu me dois quelque chose. Et je refuse de te devoir ma survie. »",
  choices:[
    {key:'EGALITE',text:"« Alors aucun pacte. Seulement deux personnes qui peuvent encore partir. »",intent:'liberte',target:'Veyra',importance:'critical',irreversible:true,feedback:"Veyra accepte une relation qui ne repose plus sur une dette.",journal:"Avant le Trône, tu as refusé tout nouveau pacte avec Veyra.",effects:[{type:'SET_FLAG',target:'veyra_position_finale'},{type:'SET_FLAG',target:'veyra_fin_egalite'}],next:'RETURN'},
    {key:'POUVOIR',text:"« Je veux ton pouvoir. Rien d'autre. »",intent:'possession',target:'Veyra',importance:'critical',irreversible:true,feedback:"Tu nommes enfin le pacte pour ce qu'il est.",journal:"Tu as conservé Veyra comme alliance de pouvoir, sans l'appeler amour.",effects:[{type:'SET_FLAG',target:'veyra_position_finale'},{type:'SET_FLAG',target:'veyra_fin_pouvoir'},{type:'ADD_GAUGE',target:'possession',value:2}],next:'RETURN'}
  ]
},

'SERAPHINE_FRACTURE': {
  sceneNumber:'3.S3',chapter:3,title:"La Foi après la preuve",mood:'tension',
  getDynamicNarrative:(gs)=>"Séraphine pose sur la table trois registres de l'Ordre. Les noms d'enfants y sont suivis de sommes, de serments, puis de dates de transfert.\n\n« Je croyais que mon frère avait trahi l'Ordre pour toi. L'Ordre l'avait déjà vendu avant qu'il sache parler. »\n\nAlistair ne lui demande pas pardon. Il lui laisse le registre. Séraphine en aligne les trois coins avec une précision presque violente, puis arrache de son propre ongle le petit sceau blanc de l'Ordre collé sur la couverture. Elle le garde entre deux doigts au lieu de le jeter.",
  choices:[
    {key:'OUVRIR',text:"« Alors ouvre les geôles avec moi. Pas pour lui. Pour ceux qui y sont encore. »",intent:'liberte',target:'Seraphine',importance:'major',response:"Séraphine ferme le registre. « Pour eux. Pas pour toi. » C'est assez.",journal:"Séraphine a découvert que l'Ordre traitait les serments comme des propriétés transmissibles.",effects:[{type:'SET_FLAG',target:'seraphine_fracture_vue'},{type:'SET_FLAG',target:'seraphine_ouvre_geoles'}],next:'RETURN'},
    {key:'BRULER',text:"« Brûle leurs serments. Tous. Même ceux qui te donnent encore du pouvoir. »",intent:'sacrifice',target:'Seraphine',importance:'critical',irreversible:true,response:"Elle approche le premier registre d'une flamme sacrée. « Si je commence, je ne m'arrête pas. »",journal:"Tu as demandé à Séraphine de brûler les serments héréditaires de l'Ordre.",effects:[{type:'SET_FLAG',target:'seraphine_fracture_vue'},{type:'SET_FLAG',target:'seraphine_brule_serments'}],next:'RETURN'}
  ]
},

'SERAPHINE_DERNIER_SERMENT': {
  sceneNumber:'4.S4',chapter:4,title:"Le Dernier Serment",mood:'intimate',
  getDynamicNarrative:(gs)=>"Séraphine attend devant une porte de l'Ordre déjà ouverte.\n\nElle tient encore entre deux doigts le petit sceau blanc arraché au registre. Elle le casse en deux sans quitter tes yeux.\n\n« Dis-moi une seule chose : après le Trône, est-ce que tu reconstruiras une autre institution qui prétendra sauver les gens malgré eux ? »",
  choices:[
    {key:'NON',text:"« Non. Et si je le fais, tu me combattras. »",intent:'liberte',target:'Seraphine',importance:'critical',irreversible:true,response:"« Alors j'espère ne jamais avoir à tenir cette promesse. »",journal:"Tu as donné à Séraphine le droit de te combattre si ton règne reproduisait les prisons de l'Ordre.",effects:[{type:'SET_FLAG',target:'seraphine_position_finale'},{type:'SET_FLAG',target:'seraphine_fin_alliee'}],next:'RETURN'},
    {key:'AUCUNE',text:"« Je ne te promets rien. Les promesses sont précisément ce qui nous a conduits ici. »",intent:'liberte',target:'Seraphine',importance:'critical',irreversible:true,response:"Séraphine sourit tristement. « Alors personne ne pourra vendre cette phrase après ta mort. »",journal:"Tu as refusé de remplacer les anciens serments par un nouveau serment personnel.",effects:[{type:'SET_FLAG',target:'seraphine_position_finale'},{type:'SET_FLAG',target:'seraphine_fin_sans_serment'}],next:'RETURN'}
  ]
},

'MIRA_ROUTE_SANS_NOM': {
  sceneNumber:'3.M3',chapter:3,title:"La Route sans Nom",mood:'exploration',
  text:"Mira te fait quitter la route principale avant minuit. Pendant trois heures, vous ne parlez presque pas.\n\nElle connaît les passages qui n'existent sur aucune carte. À l'aube, des cavaliers passent à trente mètres de votre cache. Mira ne sort pas sa lame. Elle te pose seulement deux doigts sur le poignet : attends.\n\nQuand le danger s'éloigne, tu comprends ce qu'elle proposait réellement lorsqu'elle disait disparaître. Pas une fuite romantique. Une compétence. Une vie faite d'absence choisie.",
  choices:[
    {key:'APPRENDRE',text:"« Apprends-moi à disparaître sans me perdre. »",intent:'confiance',target:'Mira',importance:'major',response:"Mira sourit. « Ça, c'est une question que je sais enseigner. »",journal:"Mira t'a montré ce que signifie réellement vivre hors des routes et des institutions.",effects:[{type:'SET_FLAG',target:'mira_route_sans_nom_vecue'},{type:'SET_FLAG',target:'mira_apprend_disparaitre'}],next:'RETURN'},
    {key:'RESTER',text:"« Je comprends mieux. Mais je ne sais pas encore si cette vie est la mienne. »",intent:'distance',target:'Mira',importance:'major',response:"« Parfait. Les mauvaises fuites commencent toujours par quelqu'un qui prétend être sûr. »",journal:"Tu as vécu une nuit sur les routes secrètes de Mira sans lui promettre de la suivre.",effects:[{type:'SET_FLAG',target:'mira_route_sans_nom_vecue'}],next:'RETURN'}
  ]
},

'DETTE_REVELATION': {
  sceneNumber:'3.D1',chapter:3,title:"Le Livre des Créances",mood:'tension',
  text:"Tu poses côte à côte ce que Kaelen appelle sa dette et ce qu'Alistair appelle son devoir. Les deux objets glissent légèrement sur la pierre et viennent se toucher avec un bruit sec. Aucun ne reste au-dessus de l'autre.\n\nLes mots diffèrent. La structure est identique : quelqu'un souffre, quelqu'un sauve, puis le survivant cesse de s'appartenir entièrement.\n\nOraya reconnaît le mécanisme avant toi. « Nous avons fait la même chose avec les serments. Avec le sang. Avec les morts. »\n\nCe n'est plus une histoire entre trois personnes. C'est une architecture.",
  choices:[
    {key:'ANNULER',text:"« Alors on n'annule pas deux dettes. On détruit le principe qui les rend héréditaires. »",intent:'liberte',target:'Monde',importance:'critical',response:"Pour la première fois, Kaelen et Alistair regardent le même ennemi.",journal:"Tu as compris que les dettes de Kaelen et d'Alistair étaient deux expressions d'un système plus vaste.",effects:[{type:'SET_FLAG',target:'dette_systeme_compris'},{type:'SET_FLAG',target:'dette_abolition_voulue'}],next:'RETURN'},
    {key:'PERSONNEL',text:"« Je peux libérer ceux que j'aime sans prétendre réécrire le monde entier. »",intent:'liberte',target:'Elenya',importance:'major',response:"Oraya acquiesce. « C'est déjà plus que ce que nous avons fait. »",journal:"Tu as choisi de traiter les dettes personnelles sans promettre d'abolir tout le système.",effects:[{type:'SET_FLAG',target:'dette_systeme_compris'},{type:'SET_FLAG',target:'dette_solution_personnelle'}],next:'RETURN'}
  ]
},

'DETTE_CHOIX': {
  sceneNumber:'4.D2',chapter:4,title:"Ce que personne ne peut hériter",mood:'intimate',
  text:"Avant le Trône, Kaelen et Alistair déposent chacun devant toi le symbole de ce qu'ils te devaient. Comme la première fois, les deux pièces glissent l'une vers l'autre et s'arrêtent côte à côte — jamais l'une sur l'autre.\n\nTu pourrais les rendre. Les détruire. Les conserver comme preuve.\n\nMais la vraie question est ailleurs : qu'est-ce qui empêchera quelqu'un de reconstruire la même dette après votre mort ?",
  choices:[
    {key:'ABOLIR',text:"Détruire les deux symboles. « Rien de ça ne sera transmissible. Ni amour, ni faute, ni salut. »",intent:'liberte',target:'Monde',importance:'critical',irreversible:true,feedback:"La voie Dette annulée devient une décision politique et intime.",journal:"Tu as décidé qu'aucune dette d'amour, de sang ou de salut ne pourrait être transmise comme un héritage.",effects:[{type:'SET_FLAG',target:'dette_position_finale'},{type:'SET_FLAG',target:'dette_abolie_structurellement'}],next:'RETURN'},
    {key:'RENDRE',text:"Rendre chaque symbole à celui qui le portait. « Votre liberté ne m'appartient pas non plus. »",intent:'liberte',target:'Kaelen & Alistair',importance:'critical',irreversible:true,feedback:"Tu refuses même de posséder la preuve de leur libération.",journal:"Tu as rendu à Kaelen et Alistair les symboles de leurs dettes.",effects:[{type:'SET_FLAG',target:'dette_position_finale'},{type:'SET_FLAG',target:'dette_rendue_aux_deux'}],next:'RETURN'}
  ]
},

'SILAS_MEMOIRES': {
    sceneNumber: 'V26.4.S',
    chapter: 3,
    title: "Ce que le Marchand se Rappelait",
    mood: 'exploration',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Silas%20bg/SPRITE_SILAS_DEBOUT_COURBE_SUPPLIANT_202606231802.png",
    getDynamicNarrative: (gs) => {
      let text = "Silas t'attend dans une ruelle du village caché. Il n'a pas l'air effrayé, ce soir. Juste... las.\n\n" + "« Majesté, » dit-il en s'inclinant maladroitement. « Je ne suis pas un homme d'histoire. Mais ma grand-mère vendait des étoffes au palais, avant le Gel. Elle m'a raconté des choses. »\n\n";
      if (!gs.hasFlag('silas_histoire_1')) {
        text += "« Elle disait que Kalthar n'était pas un tyran. Juste un homme qui a aimé trop fort une femme qui a aimé trop fort le monde. »\n\n";
      } else if (!gs.hasFlag('silas_histoire_2')) {
        text += "« Elle disait que l'Ordre, au début, priait devant ta statue. Pas contre. Ils ont changé de camp quand ils ont compris que tu ne reviendrais pas les bénir. »\n\n";
      } else {
        text += "« Elle m'a donné ça. » Il te tend un petit objet enveloppé dans un chiffon. « Elle disait que ça reviendrait à la Reine, un jour. »\n\n";
      }
      text += "Il te regarde avec des yeux trop vieux pour son visage. « Je ne sais pas si c'est vrai. Mais je sais que vous m'avez laissée vivre. Ça compte. »";
      return text;
    },
    choices: [
      {
        key: 'A',
        condition: (gs) => !gs.hasFlag('silas_histoire_1'),
        text: "Écouter la première histoire.",
        effects: [
          { type: "SET_FLAG", target: "silas_histoire_1" },
          { type: "ADD_GAUGE", target: "instabilite", value: -2 },
          { type: "ADD_TIMER", target: "venin", value: 1 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        condition: (gs) => gs.hasFlag('silas_histoire_1') && !gs.hasFlag('silas_histoire_2'),
        text: "Écouter la deuxième histoire.",
        effects: [
          { type: "SET_FLAG", target: "silas_histoire_2" },
          { type: "ADD_GAUGE", target: "instabilite", value: -2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        condition: (gs) => gs.hasFlag('silas_histoire_2') && !gs.hasFlag('silas_histoire_3'),
        text: "Prendre l'objet.",
        effects: [
          { type: "SET_FLAG", target: "silas_histoire_3" },
          { type: "SET_FLAG", target: "relique_silas" },
          { type: "ADD_GAUGE", target: "instabilite", value: -3 }
        ],
        next: 'RETURN'
      }
    ]
  },

'ORAYA_INDICE_1': {
    sceneNumber: 'V26.5.O1',
    chapter: 3,
    title: "Les Larmes qui ne Coulaient pas",
    mood: 'intimate',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Grande%20Pr%C3%AAtresse%20bg/SPRITE_PRETRESSE_DEBOUT_AUTORITAIRE_202606231801.png",
    getDynamicNarrative: (gs) => {
      return "Oraya s'approche de Fen. Sa main se tend — puis s'arrête à mi-chemin, comme si elle craignait de brûler.\n\n" +
        "Ses yeux bleuis par le froid se remplissent de larmes. Pas des larmes rituelles. Pas des larmes de prêtresse.\n\n" +
        "Des larmes de femme qui vient de retrouver quelque chose qu'elle croyait perdu depuis des siècles.\n\n" +
        "« Pardonnez-moi, » murmure-t-elle en baissant la main. « C'est... il me rappelle quelqu'un. »\n\n" +
        "Elle ne dit pas qui. Elle n'en a pas besoin. Fen la regarde avec une intensité que tu ne lui connais pas — pas de la méfiance, pas de la peur. De la reconnaissance.\n\n" +
        "Quelque chose, entre eux, s'est passé. Quelque chose que tu ne comprends pas encore.";
    },
    choices: [{
      key: 'NEXT',
      text: "Ne rien dire. Observer.",
      effects: [
        { type: "SET_FLAG", target: "oraya_indice_1" }
      ],
      next: 'RETURN'
    }]
  },

'ORAYA_INDICE_2': {
    sceneNumber: 'V26.5.O2',
    chapter: 3,
    title: "Ce qu'elle Savait sans Dire",
    mood: 'tension',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Grande%20Pr%C3%AAtresse%20bg/SPRITE_PRETRESSE_DEBOUT_AUTORITAIRE_202606231801.png",
    getDynamicNarrative: (gs) => {
      return "Oraya t'attend près de l'autel. Elle ne t'a pas suivie — elle t'a devancée.\n\n" +
        "« Vous avez mal à l'épaule gauche, » dit-elle sans te regarder. « Depuis le réveil. Une douleur ancienne, pas une blessure récente. »\n\n" +
        "Tu la fixes. Elle ne peut pas savoir ça.\n\n" +
        "« La stèle, » explique-t-elle. « Quand on vous y a mise, votre épaule gauche était déjà blessée. Le rituel de Stase n'a pas guéri — il a figé. »\n\n" +
        "Elle se tait. Puis, plus bas :\n\n" +
        "« Je sais ce que ça fait d'avoir mal au même endroit pendant trois cents ans. »\n\n" +
        "Elle s'éloigne avant que tu puisses répondre. Mais tu as vu ses mains trembler.";
    },
    choices: [{
      key: 'NEXT',
      text: "La laisser partir.",
      effects: [
        { type: "SET_FLAG", target: "oraya_indice_2" }
      ],
      next: 'RETURN'
    }]
  },

'ORAYA_INDICE_3': {
    sceneNumber: 'V26.5.O3',
    chapter: 3,
    title: "La Main qui Hésitait",
    mood: 'tension',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Grande%20Pr%C3%AAtresse%20bg/SPRITE_PRETRESSE_DEBOUT_AUTORITAIRE_202606231801.png",
    getDynamicNarrative: (gs) => {
      return "Oraya tient l'écrin d'obsidienne. La Larme d'Ébène pulse à l'intérieur, synchronisée avec ton propre cœur.\n\n" +
        "Ses mains tremblent. Pas de révérence. Pas de peur.\n\n" +
        "D'hésitation.\n\n" +
        "« Majesté, » dit-elle, et sa voix se brise sur le titre. « Si vous prenez cette pierre... vous saurez. »\n\n" +
        "Elle ne précise pas ce que tu sauras. Mais ses yeux — bleus, infiniment tristes, infiniment familiers — te fixent avec une intensité qui n'a rien de rituel.\n\n" +
        "Les mêmes yeux que dans le premier fragment.\n\n" +
        "Les mêmes yeux que dans la salle de miroirs.\n\n" +
        "Les mêmes yeux que ceux qui t'ont mise sur la stèle.";
    },
    choices: [{
      key: 'NEXT',
      text: "Prendre la Larme. Sans un mot.",
      effects: [
        { type: "SET_FLAG", target: "oraya_indice_3" }
      ],
      next: 'RETURN'
    }]
  },

'ORAYA_CONFRONTATION': {
    sceneNumber: 'V26.5.OC',
    chapter: 4,
    title: "La Gardienne du Gel",
    mood: 'tension',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Grande%20Pr%C3%AAtresse%20bg/SPRITE_PRETRESSE_DEBOUT_AUTORITAIRE_202606231801.png",
    getDynamicNarrative: (gs) => {
      let text = "Tu la trouves dans le corridor d'obsidienne. Elle ne fuit pas. Elle t'attend.\n\n" +
        "Ses mains sont vides. Ouvertes. Paumes vers le haut, comme elle tenait l'écrin de la Larme — mais cette fois, il n'y a plus rien à offrir.\n\n" +
        "« Vous savez, » dit-elle. Sa voix ne tremble plus. Ce n'est pas du courage. C'est de la fatigue — celle d'une femme qui a porté un secret trop lourd pendant trop longtemps, et qui vient enfin de le poser.\n\n" +
        "Elle ne dit pas ce qu'elle a fait. Elle n'a pas besoin. Ses yeux — bleus, infiniment tristes, infiniment familiers — le disent pour elle. Les mêmes yeux que dans le premier fragment. Les mêmes yeux que dans la salle de miroirs. Les mêmes yeux que ceux qui, dans la vision, tenaient les tiennes pendant le rituel.\n\n";
      if (gs.hasFlag('oraya_indice_1')) {
        text += "Tu te souviens de ses larmes en voyant Fen. Ce n'était pas du rituel. C'était du soulagement — celui d'une femme qui vient de retrouver quelque chose qu'elle croyait perdu depuis trois cents ans.\n\n";
      }
      if (gs.hasFlag('oraya_indice_2')) {
        text += "Tu te souviens de sa voix quand elle parlait de ton épaule blessée. Ce n'était pas de la dévotion. C'était de la mémoire — celle d'une femme qui sait ce que ça fait d'avoir mal au même endroit pendant des siècles.\n\n";
      }
      if (gs.hasFlag('oraya_indice_3')) {
        text += "Tu te souviens de son hésitation avant de te donner la Larme. Ce n'était pas du doute. C'était de la peur — peur que tu la haïsses, peur que tu la remercies, peur surtout que tu la regardes enfin.\n\n";
      }
      text += "Elle attend ton jugement. Pas comme une prêtresse. Comme une femme qui, quelque part entre la veille et la culpabilité, a oublié lequel des deux l'a gardée en vie.";
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Poser ta main sur sa joue. « Tu as fait ce que tu devais. Moi aussi. »",
        effects: [
          { type: "SET_FLAG", target: "oraya_pardonnee" },
          { type: "SET_FLAG", target: "oraya_confrontation_faite" },
          { type: "ADD_GAUGE", target: "instabilite", value: -3 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "« Tu m'as volé trois siècles. Je ne te pardonnerai jamais. »",
        effects: [
          { type: "SET_FLAG", target: "oraya_punie" },
          { type: "SET_FLAG", target: "oraya_confrontation_faite" },
          { type: "ADD_GAUGE", target: "instabilite", value: 5 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        text: "La regarder en silence. Puis continuer vers le Trône.",
        effects: [
          { type: "SET_FLAG", target: "oraya_ignoree" },
          { type: "SET_FLAG", target: "oraya_confrontation_faite" }
        ],
        next: 'RETURN'
      }
    ]
  },

'LYRA_INDICE_1': {
    sceneNumber: 'V26.5.L1',
    chapter: 3,
    title: "La Voix qui se Souvient",
    mood: 'tension',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Lyra%20bg/SPRITE_LYRA_DEBOUT_HYPNOTIQUE_202606231756.png",
    getDynamicNarrative: (gs) => {
      return "Lyra s'arrête en te voyant. Pas de chant. Pas de sourire.\n\n" +
        "Ses yeux opalins s'élargissent. Elle reconnaît quelque chose.\n\n" +
        "« Vous... » commence-t-elle. Puis elle se reprend. « Majesté. »\n\n" +
        "Le titre sonne faux dans sa bouche. Comme un masque trop grand.\n\n" +
        "Elle détourne le regard vers l'eau. « J'ai chanté pour des rois. Des prêtres. Des monstres. Mais jamais pour quelqu'un qui... »\n\n" +
        "Elle ne finit pas. Elle n'a pas besoin.";
    },
    choices: [{
      key: 'NEXT',
      text: "Continuer.",
      effects: [
        { type: "SET_FLAG", target: "lyra_indice_1" }
      ],
      next: 'RETURN'
    }]
  },

'LYRA_VERITE': {
    sceneNumber: 'V26.5.LV',
    chapter: 3,
    title: "Ce que la Sirène Était",
    mood: 'tension',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Lyra%20bg/SPRITE_LYRA_DEBOUT_HYPNOTIQUE_202606231756.png",
    getDynamicNarrative: (gs) => {
      return "Lyra ne chante plus. Elle parle.\n\n" +
        "« L'Ordre m'a prise quand j'avais douze ans. Ils ont dit que ma voix était un don. Ils ont menti. C'était une arme. »\n\n" +
        "Elle touche sa gorge. « Ils m'ont brisée pour que je chante ce qu'ils voulaient. Des siècles. »\n\n" +
        "Ses yeux ne sont plus opalins. Ils sont humains. Fatigués. Anciens.\n\n" +
        "« Si vous me libérez... je ne saurai plus qui je suis. Mais au moins, ce ne sera plus eux qui décideront. »";
    },
    choices: [
      {
        key: 'A',
        text: "« Tu es libre. Va. »",
        effects: [
          { type: "SET_FLAG", target: "lyra_liberee" },
          { type: "SET_FLAG", target: "lyra_verite_revelee" },
          { type: "ADD_GAUGE", target: "instabilite", value: -2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "« Tu resteras. Ta voix m'appartient. »",
        effects: [
          { type: "SET_FLAG", target: "lyra_punie" },
          { type: "SET_FLAG", target: "lyra_verite_revelee" },
          { type: "ADD_GAUGE", target: "instabilite", value: 3 }
        ],
        next: 'RETURN'
      }
    ]
  },

'SILAS_VERITE': {
    sceneNumber: 'V26.5.1.SV',
    chapter: 4,
    title: "Ce que le Marchand Savait",
    mood: 'intimate',
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Sprites%20-%20Silas%20bg/SPRITE_SILAS_DEBOUT_COURBE_SUPPLIANT_202606231802.png",
    getDynamicNarrative: (gs) => {
      let text = "Tu le trouves au pied de la Citadelle. Il ne s'incline plus. Il se tient droit, pour la première fois.\n\n" +
        "« Majesté, » dit-il. Cette fois, ce n'est pas une formule. C'est un constat.\n\n" +
        "« Je savais qui vous étiez. Depuis la première nuit. Ma grand-mère m'avait décrit vos yeux. »\n\n" +
        "Il te regarde avec des yeux trop vieux pour son visage.\n\n" +
        "« Je ne vous ai pas dénoncée. Pas par courage. Par dette. Ma famille vous doit trois siècles de silence. »\n\n" +
        "Il tend un dernier objet. Un parchemin. Les noms de tous les serviteurs royaux qui ont survécu au Gel.\n\n" +
        "« Ils sont encore là. Cachés. Ils attendent votre ordre. »\n\n";
      if (gs.hasFlag('silas_histoire_1') && gs.hasFlag('silas_histoire_2') && gs.hasFlag('silas_histoire_3')) {
        text += "Il sourit. Un vrai sourire. « Ma grand-mère avait raison. Vous êtes revenue. »\n\n";
      }
      if (gs.hasFlag('relique_silas')) {
        text += "L'objet qu'il t'a donné au village pulse faiblement dans ta poche. Comme un écho.\n\n";
      }
      text += "Il attend ton jugement.";
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "Accepter le parchemin. « Dis-leur que la Reine est revenue. »",
        effects: [
          { type: "SET_FLAG", target: "silas_verite_acceptee" },
          { type: "ADD_GAUGE", target: "instabilite", value: -3 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "Brûler le parchemin. « Je ne veux pas d'armée. Je veux la paix. »",
        effects: [
          { type: "SET_FLAG", target: "silas_verite_brulee" },
          { type: "ADD_GAUGE", target: "instabilite", value: -5 },
          { type: "SET_FLAG", target: "ton_douceur" }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        text: "Ignorer Silas. Continuer vers le Trône.",
        effects: [
          { type: "SET_FLAG", target: "silas_verite_ignoree" }
        ],
        next: 'RETURN'
      }
    ]
  },

'SERAPHINE_INTRO': {
    sceneNumber: 'V27.SER.1',
    chapter: 3,
    title: "La Sœur de Lumière",
    mood: 'tension',
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('seraphine_intro_vue'))state.flags.push('seraphine_intro_vue');},
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Place_du_village_avec_statue_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/seraphine.webp",
    getDynamicNarrative: (gs) => {
      let text = "Elle arrive sans bruit. Une silhouette blanche et or, plus fine qu’Alistair, plus tranchante.\n\n";
      text += "Ses yeux sont les mêmes que les siens — mais là où les siens doutent, les siens jugent.\n\n";
      text += "« Frère, » dit-elle. La voix est calme. Trop calme. « L’Ordre t’a cherché. Je t’ai trouvé. »\n\n";
      text += "Alistair se fige. Pour la première fois depuis des semaines, tu le vois réellement surpris.\n\n";
      text += "« Seraphine… »\n\n";
      text += "Elle ne le regarde pas. Elle te regarde. Et dans ce regard, tu lis déjà la sentence : menace. Miracle. Proie.\n\n";
      text += "« Majesté, » dit-elle enfin, s’inclinant d’un degré seulement. « L’Ordre du Soleil vous offre sa protection. Et me charge de m’assurer que mon frère ne devienne pas… un obstacle. »";
      return text;
    },
    choices: [
      {
        key: 'A',
        text: "« Ton frère n’est pas un obstacle. C’est un choix. »",
        response: "Seraphine ne cille pas. « C’est précisément ce que l’Ordre redoute : qu’il devienne capable de choisir contre nous. » Derrière elle, Alistair relève légèrement le menton. Pour une fois, personne ne parle de lui comme d’un serment ambulant sans qu’il l’entende.",
        effects: [
          { type: "SET_FLAG", target: "_seraphine_intro_vu" },
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "ADD_REP", target: "ordre", value: -2 },
          { type: "SET_FLAG", target: "seraphine_hostile" }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "« L’Ordre n’offre rien. Il prend. »",
        response: "Le regard de Seraphine se durcit. « Et le givre, lui, demande la permission avant de recouvrir une ville ? » Elle ne recule pas. La question n’est pas une défense de l’Ordre : c’est un avertissement que ta propre puissance devra supporter le même examen.",
        effects: [
          { type: "SET_FLAG", target: "_seraphine_intro_vu" },
          { type: "ADD_GAUGE", target: "volonte", value: 1 },
          { type: "ADD_REP", target: "ordre", value: -4 },
          { type: "SET_FLAG", target: "seraphine_ennemie" }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        text: "Laisser Alistair répondre.",
        response: "Alistair inspire. « Je ne suis pas son geôlier, Seraphine. » Sa sœur tourne enfin les yeux vers lui. « C’est précisément ce qui m’inquiète. » Aucun des deux ne hausse la voix. La fracture n’en est que plus nette.",
        effects: [
          { type: "SET_FLAG", target: "_seraphine_intro_vu" },
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "SET_FLAG", target: "seraphine_observatrice" }
        ],
        next: 'RETURN'
      },
      {
        key: 'D',
        text: "« Tu peux rester. Mais tu ne commandes pas ici. »",
        effects: [
          { type: "SET_FLAG", target: "_seraphine_intro_vu" },
          { type: "ADD_GAUGE", target: "possession", value: 2 },
          { type: "ADD_REP", target: "ordre", value: -1 },
          { type: "SET_FLAG", target: "seraphine_tolerée" }
        ],
        next: 'RETURN'
      }
    ]
  },

'MIRA_RENCONTRE': {
    sceneNumber: 'V27.MIRA.1',
    chapter: 2,
    title: "La Contrebandière",
    mood: 'exploration',
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('mira_rencontree'))state.flags.push('mira_rencontree');},
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Village_barricad%C3%A9_au_loin_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/mira.webp",
    getDynamicNarrative: (gs) => {
      return "Tu es seule. Ou presque.\n\n" +
        "Une jeune femme au manteau rapiécé te regarde depuis l’ombre d’un porche. Pas de révérence. Pas de peur. Juste une curiosité insolente.\n\n" +
        "« T’es la Reine de givre, hein ? » dit-elle. « On raconte que t’as gelé un continent. Moi j’ai gelé mon dîner trois fois cette semaine. On est presque égales. »\n\n" +
        "Elle s’approche. Une plume blanche est piquée dans ses cheveux — pas de magie, juste du style.\n\n" +
        "« Mira. Contrebande, informations, et parfois de la loyauté si on me paie correctement. T’as l’air d’avoir besoin des trois. »\n\n" +
        "Fen siffle doucement. Mira lui tire la langue.\n\n" +
        "« Ton rat est mignon. Il mord ? »";
    },
    choices: [
      {
        key: 'A',
        text: "« Il mord. Moi aussi. »",
        response: "Mira éclate d’un rire bref. « Parfait. J’ai toujours préféré les partenaires avec une clause de danger. » Elle détache la plume blanche de ses cheveux et te la tend.",
        effects: [
          { type: "SET_FLAG", target: "_mira_rencontre_vu" },
          { type: "SET_FLAG", target: "mira_alliee" },
          { type: "ADD_GAUGE", target: "volonte", value: 1 },
          { type: "ADD_ITEM", target: "plume_mira" }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "« Je n’ai besoin de personne. »",
      response: "Mira lève les mains. « Reçu. Je sais reconnaître une porte fermée. »",
        effects: [
          { type: "SET_FLAG", target: "_mira_rencontre_vu" },
          { type: "SET_FLAG", target: "mira_rejetee" },
          { type: "ADD_GAUGE", target: "instabilite", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        text: "« Tu mens déjà. Ça me plaît. »",
        response: "« Enfin quelqu’un qui apprécie mon sens du service. » Mira te tend sa plume. « Garde ça. Si quelqu’un te demande ce que ça signifie, mens mieux que moi. »",
        effects: [
          { type: "SET_FLAG", target: "_mira_rencontre_vu" },
          { type: "SET_FLAG", target: "mira_complice" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "ADD_ITEM", target: "plume_mira" }
        ],
        next: 'RETURN'
      },
      {
        key: 'D',
        text: "Lui donner une pièce (ou ce qui y ressemble) et partir.",
      response: "Elle fait disparaître le paiement. « Propre, net, sans dette. J'apprécie presque. »",
        effects: [
          { type: "SET_FLAG", target: "_mira_rencontre_vu" },
          { type: "SET_FLAG", target: "mira_payee" },
          { type: "ADD_REP", target: "village", value: 1 }
        ],
        next: 'RETURN'
      }
    ]
  },

'VEYRA_PACTE': {
    sceneNumber: 'V27.VEY.1',
    chapter: 3,
    title: "La Prêtresse Amère",
    mood: 'tension',
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('veyra_rencontree'))state.flags.push('veyra_rencontree');},
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Autel_int%C3%A9rieur_avec_%C3%A9p%C3%A9e_bris%C3%A9e_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/veyra.webp",
    getDynamicNarrative: (gs) => {
      return "Elle t’attend près de l’autel, mais ce n’est pas Oraya.\n\n" +
        "Plus jeune. Plus dure. Une cicatrice traverse sa lèvre supérieure comme une signature.\n\n" +
        "« Oraya t’a donné des larmes et des excuses, » dit-elle. « Moi je te donne un choix. »\n\n" +
        "Elle pose un objet noir sur la pierre — un fragment de couronne brisée.\n\n" +
        "« Kalthar m’a aimée autrefois. Avant toi. Avant le Gel. Il m’a choisie pour porter une partie de sa colère. »\n\n" +
        "Ses yeux brillent d’une lueur qui n’est plus tout à fait humaine.\n\n" +
        "« Je peux t’apprendre à ne plus jamais avoir besoin d’eux. Ni de Kaelen. Ni d’Alistair. Ni d’Oraya. Juste le pouvoir. Pur. Sans dette. »\n\n" +
        "Elle tend la main.\n\n" +
        "« Ou tu peux continuer à jouer à la reine qui hésite. »";
    },
    choices: [
      {
        key: 'A',
        text: "Prendre sa main. Accepter le pacte.",
      response: "Veyra referme tes doigts sur le fragment. « Alors garde-le assez longtemps pour découvrir si je t'ai menti. »",
        effects: [
          { type: "SET_FLAG", target: "_veyra_pacte_vu" },
          { type: "SET_FLAG", target: "veyra_pacte_accepte" },
          { type: "ADD_GAUGE", target: "possession", value: 5 },
          { type: "ADD_GAUGE", target: "volonte", value: -2 },
          { type: "ADD_ITEM", target: "fragment_couronne_veyra" }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "« Je n’ai pas besoin de toi pour être seule. »",
        effects: [
          { type: "SET_FLAG", target: "_veyra_pacte_vu" },
          { type: "SET_FLAG", target: "veyra_rejetee" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "ADD_GAUGE", target: "possession", value: -1 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        text: "« Tu mens. Kalthar n’aimait personne. »",
      response: "Son sourire se fige. « Enfin une bonne question. Kalthar n'était pas l'homme que vos souvenirs ont besoin qu'il soit. »",
        effects: [
          { type: "SET_FLAG", target: "_veyra_pacte_vu" },
          { type: "SET_FLAG", target: "veyra_defiee" },
          { type: "ADD_GAUGE", target: "memoire_kalthar", value: 2 },
          { type: "ADD_GAUGE", target: "instabilite", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'D',
        text: "Écouter en silence. Puis partir sans un mot.",
        effects: [
          { type: "SET_FLAG", target: "_veyra_pacte_vu" },
          { type: "SET_FLAG", target: "veyra_ignoree" },
          { type: "ADD_GAUGE", target: "volonte", value: 1 }
        ],
        next: 'RETURN'
      }
    ]
  },

'NOMADE_1': {
    sceneNumber: 'V27.NOM.1',
    chapter: 2,
    title: "L’Homme aux Yeux Vides",
    mood: 'exploration',
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%202/Rive_nord_isol%C3%A9e_202606191345.jpeg",
    getDynamicNarrative: (gs) => {
      return "Au bord de la rivière de cristal, quelqu’un est déjà là.\n\n" +
        "Un homme en manteau de voyage usé. Il ne te regarde pas. Il regarde l’eau.\n\n" +
        "Ses yeux sont d’un gris trop clair. Comme s’il avait vu trop de choses et que le monde avait décidé de les effacer.\n\n" +
        "Il ne parle pas. Il ne bouge pas. Quand tu passes près de lui, il incline à peine la tête — un salut, ou une reconnaissance.\n\n" +
        "Fen se plaque contre ton cou. Pour la première fois, il a peur.\n\n" +
        "L’homme reste. Tu continues.";
    },
    choices: [
      {
        key: 'A',
        text: "Tenter de lui parler.",
        response: "« Qui es-tu ? » demandes-tu. L’homme ne répond pas. Mais ses yeux quittent enfin l’eau pour Fen, et ses lèvres forment sans voix une syllabe que ton corps reconnaît avant ta mémoire. Fen se plaque davantage contre toi.",
        effects: [
          { type: "SET_FLAG", target: "_nomade_1_vu" },
          { type: "SET_FLAG", target: "nomade_aborde" },
          { type: "ADD_GAUGE", target: "memoire_kalthar", value: 1 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "L’ignorer. Continuer.",
        effects: [
          { type: "SET_FLAG", target: "_nomade_1_vu" },
          { type: "SET_FLAG", target: "nomade_ignore" }
        ],
        next: 'RETURN'
      },
      {
        key: 'C_PLUME',
        text: "Lui laisser la plume blanche de Mira.",
        response: "Le Nomade prend la plume du bout des doigts. Pour la première fois, quelque chose ressemble à un sourire sur son visage. Il la plante dans une fissure de la borne de glace — un morceau de vie ordinaire au milieu des reliques. Fen cesse de trembler.",
        condition: (gs) => gs.hasItem && gs.hasItem('plume_mira'),
        effects: [
          { type: "REMOVE_ITEM", target: "plume_mira" },
          { type: "SET_FLAG", target: "_nomade_1_vu" },
          { type: "SET_FLAG", target: "nomade_offrande_plume" },
          { type: "ADD_GAUGE", target: "memoire_kalthar", value: 2 },
          { type: "ADD_GAUGE", target: "volonte", value: 1 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C_COURONNE',
        text: "Lui laisser le fragment de couronne noire donné par Veyra.",
        response: "À peine le fragment touche-t-il sa paume que le Nomade retire la main comme s’il s’était brûlé. Puis il le ramasse malgré tout. « Pas… Kalthar », souffle-t-il — ses premiers mots. Fen pousse un cri aigu. Veyra t’a donné une relique, mais pas forcément la vérité qui allait avec.",
        condition: (gs) => gs.hasItem && gs.hasItem('fragment_couronne_veyra'),
        effects: [
          { type: "REMOVE_ITEM", target: "fragment_couronne_veyra" },
          { type: "SET_FLAG", target: "_nomade_1_vu" },
          { type: "SET_FLAG", target: "nomade_offrande_couronne" },
          { type: "SET_FLAG", target: "veyra_recit_mis_en_doute" },
          { type: "ADD_GAUGE", target: "memoire_kalthar", value: 3 }
        ],
        next: 'RETURN'
      },
      {
        key: 'D',
        text: "Rester une minute en silence à ses côtés.",
        response: "Une minute passe. Puis deux respirations se synchronisent presque malgré vous. L’homme ne parle toujours pas. Quand tu repars, il murmure quelque chose de trop bas pour être compris. Fen, lui, se retourne.",
        effects: [
          { type: "SET_FLAG", target: "_nomade_1_vu" },
          { type: "SET_FLAG", target: "nomade_silence_partage" },
          { type: "ADD_GAUGE", target: "volonte", value: 1 },
          { type: "ADD_GAUGE", target: "memoire_kalthar", value: 1 }
        ],
        next: 'RETURN'
      }
    ]
  },

'SERAPHINE_ARRIVEE': {
    sceneNumber: 'V27.SER.ARR',
    chapter: 3,
    title: "L'Inquisitrice",
    mood: 'tension',
  onEnter:(state)=>{if(state&&Array.isArray(state.flags)&&!state.flags.includes('seraphine_arrivee_vue'))state.flags.push('seraphine_arrivee_vue');},
    image: "https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Crat%C3%A8re_avec_village_cach%C3%A9_202606191345.jpeg",
    sprite: "https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/sprites/seraphine.webp",
    getDynamicNarrative: (gs) => {
      return "Le timer de colère de l’Ordre a expiré.\n\n" +
        "Seraphine Leonhart apparaît au bord du village caché, cape blanche tachée de cendre, insigne de l’Inquisition brillant comme une lame.\n\n" +
        "« Assez de jeux, » dit-elle. « Mon frère. La Reine. L’Ordre réclame des comptes. »\n\n" +
        "Ses yeux glissent sur toi, puis sur Alistair. Il n’y a plus de tendresse fraternelle. Seulement du devoir.";
    },
    choices: [
      {
        key: 'A',
        text: "Te placer devant Alistair. « Il reste avec moi. »",
        response: "Seraphine fixe la place que tu viens de prendre devant son frère. « Avec vous ? » Elle tourne enfin les yeux vers Alistair. « Est-ce aussi ce que toi, tu veux ? » Alistair répond avant que tu puisses le faire : « Oui. Aujourd’hui, oui. »",
        effects: [
          { type: "SET_FLAG", target: "seraphine_arrivee_vue" },
          { type: "ADD_GAUGE", target: "lien_E", value: 1 },
          { type: "ADD_REP", target: "ordre", value: -3 },
          { type: "SET_FLAG", target: "seraphine_hostile" }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "Laisser Alistair décider.",
        response: "Alistair avance d’un pas. « Je ne retourne pas à l’Ordre aujourd’hui. » Seraphine serre la mâchoire. « Alors au moins, cette désobéissance est la tienne. » Elle te regarde ensuite, comme si elle venait de t’accorder un crédit qu’elle pourra reprendre.",
        effects: [
          { type: "SET_FLAG", target: "seraphine_arrivee_vue" },
          { type: "SET_FLAG", target: "seraphine_observatrice" }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        text: "« L’Ordre n’a aucun droit ici. »",
        response: "La lumière de l’insigne de Seraphine monte d’un cran. « Alors nous avons enfin cessé de prétendre qu’il s’agit d’une négociation. » Elle ne tire pas son arme. Pas encore. Mais le prochain échange ne bénéficiera plus du vocabulaire de la courtoisie.",
        effects: [
          { type: "SET_FLAG", target: "seraphine_arrivee_vue" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 },
          { type: "ADD_REP", target: "ordre", value: -5 },
          { type: "SET_FLAG", target: "seraphine_ennemie" }
        ],
        next: 'RETURN'
      }
    ]
  },
  // ==========================================
  // ACTE 3 — URGENCE + VILLAGE + ARCS ORAYA/LYRA/FEN + NOUVEAUX
  // ==========================================

// Seraphine déjà livrée en PARTIE 2 — version courte rappel
// ==========================================
  // ACTE 4 — CORRIDOR, TRÔNE, FINS (enrichi V27)
  // ==========================================

// ==========================================
  // NOUVELLES FINS V27
  // ==========================================

'MIRA_SUITE_SOLO': {
    sceneNumber: 'V27.MIRA.2',
    chapter: 3,
    title: "La Contrebandière — Suite",
    mood: 'exploration',
    condition: (gs) => (gs.hasFlag('mira_alliee') || gs.hasFlag('mira_complice')) && gs.hasFlag('voie_solo'),
    getDynamicNarrative: (gs) => {
      return "Mira te retrouve au bord du village caché, les bras croisés.\n\n" +
        "« T’as encore l’air de quelqu’un qui porte un continent sur le dos, » dit-elle. « Ça fait lourd. »\n\n" +
        "Elle te tend une gourde. L’eau est froide. Pas magique. Juste de l’eau.\n\n" +
        "« Je connais un passage. Personne ne le surveille. On peut disparaître avant que les prêtres et les assassins se rappellent que t’existes. »\n\n" +
        "Elle attend. Pas à genoux. Debout. Comme une égale.";
    },
    choices: [
      {
        key: 'A',
        text: "« Montre-moi le passage. »",
        effects: [
          { type: "SET_FLAG", target: "mira_fuite_acceptee" },
          { type: "ADD_GAUGE", target: "volonte", value: 2 }
        ],
        next: 'RETURN'
      },
      {
        key: 'B',
        text: "« Pas encore. J’ai des choses à finir. »",
        effects: [
          { type: "SET_FLAG", target: "mira_attend" },
          { type: "ADD_GAUGE", target: "volonte", value: 1 }
        ],
        next: 'RETURN'
      },
      {
        key: 'C',
        text: "« Tu pourrais partir sans moi. »",
        effects: [
          { type: "SET_FLAG", target: "mira_liberee" },
          { type: "ADD_GAUGE", target: "volonte", value: 1 }
        ],
        next: 'RETURN'
      }
    ]
  },

  // ==========================================
  // SCÈNES DE TRANSITION & NETTOYAGE
  // ==========================================

// Placeholder de continuité pour les scènes non encore détaillées
  // (elles restent compatibles avec le système V27 et peuvent être enrichies plus tard)
  



// ==========================================
  // FINS EXISTANTES ENRICHIES (V27)
  // ==========================================

// ==========================================
  // SCÈNE CRITIQUE RESTANTE
  // ==========================================

// ==========================================
  // JOUTES FINALES (Acte 3)
  // ==========================================

// ==========================================
  // SCÈNES MANQUANTES CRITIQUES
  // ==========================================

// ==========================================
  // NETTOYAGE FLAGS & HELPERS FINAUX
  // ==========================================

  // Note technique (ne pas afficher en jeu) :
  // Flags purgés ou rendus lisibles en V27 :
  // - serviteurs_reveles → remplacé par silas_verite_acceptee / silas_verite_brulee
  // - lyra_reduite_arme → intégré dans lyra_punie
  // - fragment_kalthar_1 → désormais lu via memoire_kalthar
  // Tous les flags de possession / volonte / memoire_kalthar sont initialisés
  // et clampés dans SceneManager.

  // Scène de secours pour éviter les dead-ends
  };
}
