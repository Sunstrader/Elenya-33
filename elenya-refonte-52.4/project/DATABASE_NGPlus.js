// V52 — NEW GAME+ séparé du moteur. Contenu narratif inchangé depuis V51.7.6.
const NGPLUS_DB = {
  'NGP_01_SEUIL': {
    sceneNumber:'NGP_01_SEUIL', chapter:1, title:"Le seuil qui se souvient", mood:'epilogue',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Cour_ext%C3%A9rieure_enneig%C3%A9e_202606191344.jpeg',
    getDynamicNarrative:(gs)=>{
      const origins = (gs.hasGlobalFlag('ng_plus_unlocked') ? 'Les fins classiques sont gravées quelque part derrière tes yeux. ' : '');
      const last = gs.getLastClassicEnding ? gs.getLastClassicEnding() : null;
      let lastEcho = '';
      if (last === 'FIN_OMBRE') lastEcho = "La dernière chose dont ton corps se souvient est une main tachée de cendre près d’un Trône trop froid.\n\n";
      else if (last === 'FIN_ECLAIREUR') lastEcho = "La dernière chose dont ton corps se souvient est une lumière magnifique qui ressemblait trop à une porte fermée.\n\n";
      else if (last === 'FIN_POLY') lastEcho = "La dernière chose dont ton corps se souvient est le poids de deux mains et la peur secrète de les transformer en chaînes.\n\n";
      else if (last === 'FIN_SOLO') lastEcho = "La dernière chose dont ton corps se souvient est une route vers le Nord et le silence choisi de n’appartenir à personne.\n\n";
      else if (last === 'FIN_HIVER') lastEcho = "La dernière chose dont ton corps se souvient est un monde trop silencieux sous un hiver qui avait appris ton nom.\n\n";
      else if (last === 'FIN_SACRIFICE') lastEcho = "La dernière chose dont ton corps se souvient est la sensation de disparaître pour sauver des gens qui n’avaient jamais demandé ce prix.\n\n";
      else if (last === 'FIN_MORTELLE') lastEcho = "La dernière chose dont ton corps se souvient est un cœur redevenu mortel — terriblement bref, terriblement vivant.\n\n";
      else if (last === 'FIN_RECONCILIATION') lastEcho = "La dernière chose dont ton corps se souvient est un hiver tracé comme une protection qui refusait enfin de devenir une cage.\n\n";
      else if (last === 'FIN_BRISEE') lastEcho = "La dernière chose dont ton corps se souvient est une décision laissée en suspens jusqu’à ce que le monde recommence à ta place.\n\n";
      return origins + lastEcho + "Tu te réveilles avant de respirer.\n\n"+
      "Le froid n'est pas une sensation. C'est une mémoire.\n\n"+
      "Pendant une seconde, tu vois une constellation de trônes, d’hivers et de versions de la même couronne. Dans l'une, Kaelen tient ta main. Dans une autre, Alistair porte tes chaînes. Dans une troisième, aucun des deux n'est là. Tu vois une statue de diamant. Une tempête sans nom. Une aube humaine. Un trône vide.\n\n"+
      "Puis tout disparaît.\n\n"+
      "Fen siffle. Pas comme un animal surpris. Comme quelqu'un qui reconnaît enfin la pièce où il se trouve.\n\n"+
      "Tu poses la main sur la stèle. Une phrase apparaît dans le givre : « CE N'EST PAS LE PREMIER MATIN. »\n\n"+
      "Cette fois, tu ne demandes pas qui a écrit. Tu demandes seulement : combien de fois suis-je morte ?";
    },
    choices:[
      {key:'MEMOIRE',text:"Toucher la phrase et accepter de revoir les fins possibles.",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:3},{type:'SET_FLAG',target:'ngplus_memoire_acceptee'}],next:'NGP_02_NEUF_ECHOS'},
      {key:'REFUS',text:"Geler la stèle. Refuser que les anciennes vies dictent celle-ci.",effects:[{type:'ADD_GAUGE',target:'volonte',value:2},{type:'SET_FLAG',target:'ngplus_refus_initial'}],next:'NGP_02_NEUF_ECHOS'},
      {key:'FEN',text:"Prendre Fen contre toi. « Toi, tu savais. »",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:2},{type:'SET_FLAG',target:'ngplus_fen_interroge'}],next:'NGP_02_NEUF_ECHOS'},
      {key:'COURONNE',text:"Reprendre la couronne de givre avant toute réponse.",effects:[{type:'ADD_GAUGE',target:'volonte',value:1},{type:'SET_FLAG',target:'ngplus_couronne_reprise'}],next:'NGP_02_NEUF_ECHOS'}
    ]
  },

  'NGP_02_NEUF_ECHOS': {
    sceneNumber:'NGP_02_NEUF_ECHOS', chapter:1, title:"Neuf vies dans la neige", mood:'exploration',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/royaume-souvenirs.webp',
    getDynamicNarrative:(gs)=>{
      let t="Les souvenirs ne reviennent pas comme des scènes. Ils reviennent comme des cicatrices.\n\n";
      t+="Tu reconnais des gestes que tu n'as jamais appris dans cette vie : la façon de fermer une porte derrière Kaelen, la manière de retirer une clé des doigts d'Alistair, le poids d'une couronne devenue trop lourde, la voix de Mira quand elle te demande où aller après avoir abandonné le continent.\n\n";
      t+="Et derrière toutes ces fins, une constante : Kalthar.\n\n";
      t+="Dans chaque version du monde, il meurt. Dans chaque version, quelque chose reste incomplet.\n\n";
      t+="Fen te regarde. Ses yeux noirs ne sont plus ceux d'un familier. Ils sont ceux d'un homme qui attend depuis trois siècles qu'une question soit enfin posée correctement.\n\n";
      t+="« Tu n'es pas revenue pour recommencer, n'est-ce pas ? » demandes-tu.\n\n";
      t+="Le furet siffle une mélodie que ton corps reconnaît avant ton esprit : deux notes, puis une troisième. Le vieux motif du palais.";
      return t;
    },
    choices:[
      {key:'KALTHAR',text:"« Alors montre-moi ce que toutes les fins avaient en commun. »",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:3},{type:'SET_FLAG',target:'ngplus_cherche_verite'}],next:'NGP_03_PALAIS_ECHO'},
      {key:'AMOUR',text:"« Les fins n'étaient pas le problème. C'était ce que nous faisions de l'amour. »",effects:[{type:'ADD_GAUGE',target:'volonte',value:2},{type:'SET_FLAG',target:'ngplus_these_amour'}],next:'NGP_03_PALAIS_ECHO'},
      {key:'TRONE',text:"« Le problème, c'est le Trône. Il veut toujours quelqu'un dessus. »",effects:[{type:'ADD_GAUGE',target:'possession',value:1},{type:'SET_FLAG',target:'ngplus_defi_trone'}],next:'NGP_03_PALAIS_ECHO'},
      {key:'SILENCE',text:"Ne rien répondre. Faire confiance à ce que ton corps sait déjà.",effects:[{type:'ADD_GAUGE',target:'volonte',value:1}],next:'NGP_03_PALAIS_ECHO'}
    ]
  },

  'NGP_03_PALAIS_ECHO': {
    sceneNumber:'NGP_03_PALAIS_ECHO', chapter:1, title:"Le palais qui n’existe plus", mood:'intimate',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/royaume-souvenirs.webp',
    getDynamicNarrative:(gs)=>{
      return "Le palais apparaît autour de toi sans être réellement là. Une salle de banquet se dessine dans la neige. Des coupes intactes. Des rideaux immobiles. Une fenêtre ouverte sur un continent qui n'existe plus.\n\n"+
      "Tu reconnais la table où Kalthar te laissait choisir la musique. Le pilier contre lequel Kaelen s'est appuyé dans une autre vie. La chapelle où Alistair a compris que sa foi avait été fabriquée pour toi.\n\n"+
      "Le pire n'est pas de revoir ces souvenirs. Le pire est de comprendre qu'ils sont vrais. Toutes ces versions ont existé quelque part. Elles ont laissé une empreinte dans le monde, même si personne ne s'en souvient.\n\n"+
      "Fen saute sur la table. Une seconde silhouette se reflète dans le verre : un homme aux yeux bleus.\n\n"+
      "« Kalthar. »\n\n"+
      "Le reflet sourit sans joie.\n\n"+
      "« Cette fois, ne me sauve pas. »";
    },
    choices:[
      {key:'PROMESSE',text:"« Je ne te sauverai pas. Je te laisserai me dire la vérité. »",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:3},{type:'SET_FLAG',target:'ngplus_promesse_kalthar'}],next:'NGP_04_FRESQUE_REPRISE'},
      {key:'COLERE',text:"« Tu m’as laissée porter trois siècles de silence. Parle. »",effects:[{type:'ADD_GAUGE',target:'instabilite',value:3},{type:'SET_FLAG',target:'ngplus_colere_kalthar'}],next:'NGP_04_FRESQUE_REPRISE'},
      {key:'PARDON',text:"« Je ne sais pas encore si je peux te pardonner. »",effects:[{type:'ADD_GAUGE',target:'volonte',value:2},{type:'SET_FLAG',target:'ngplus_pardon_prudent'}],next:'NGP_04_FRESQUE_REPRISE'},
      {key:'DEPART',text:"Quitter le reflet. « Je vivrai d’abord. Les morts attendront. »",effects:[{type:'ADD_GAUGE',target:'volonte',value:3},{type:'SET_FLAG',target:'ngplus_vie_avant_morts'}],next:'NGP_04_FRESQUE_REPRISE'}
    ]
  },

  'NGP_04_FRESQUE_REPRISE': {
    sceneNumber:'NGP_04_FRESQUE_REPRISE', chapter:1, title:"La fresque qui mentait autrement", mood:'exploration',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%201/Catacombes_avec_fresque_202606191344.jpeg',
    getDynamicNarrative:(gs)=>{
      return "La fresque est là. La même pierre. Le même brasier. Le même diadème.\n\nMais cette fois, quelque chose a changé.\n\nTu vois ce qui n'était pas visible la première fois : derrière la souveraine, Kalthar tient le cercle de Stase ouvert avec ses propres mains. Derrière lui, Oraya attend. Et au-dessus d'eux, une forme brûlante n'a pas de visage.\n\nL'Entité de Calcination.\n\nTu comprends soudain que le Gel n'était pas une arme. C'était une porte fermée de l'intérieur.\n\nLa fresque ne racontait pas la vérité. Elle racontait seulement la moitié de la vérité.\n\nTon regard glisse vers les traces de tes anciennes vies. Dans neuf versions du monde, tu as essayé de résoudre le même problème avec des choix différents. Dans aucune, tu n'as demandé qui bénéficiait du cycle.\n\nFen siffle.\n\nCette fois, le son ressemble presque à un rire.";
    },
    choices:[
      {key:'DETTE',text:"Chercher le nom de celui qui a créé le cycle.",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:4},{type:'SET_FLAG',target:'ngplus_nom_cycle'}],next:'NGP_05_CONFRERIE'},
      {key:'GEL',text:"Renforcer le Gel et accepter d’en devenir la gardienne.",effects:[{type:'ADD_GAUGE',target:'instabilite',value:4},{type:'SET_FLAG',target:'ngplus_gardienne_gel'}],next:'NGP_05_CONFRERIE'},
      {key:'BRISER',text:"Fendre la fresque. « Je refuse de revivre cette histoire. »",effects:[{type:'ADD_GAUGE',target:'volonte',value:3},{type:'SET_FLAG',target:'ngplus_briser_fresque'}],next:'NGP_05_CONFRERIE'},
      {key:'FEN',text:"Poser la main sur Fen et attendre qu’il choisisse de parler.",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:2},{type:'SET_FLAG',target:'ngplus_fen_confession'}],next:'NGP_05_CONFRERIE'}
    ]
  },

  'NGP_05_CONFRERIE': {
    sceneNumber:'NGP_05_CONFRERIE', chapter:1, title:"Les contrats qui survivent aux hommes", mood:'tension',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/galeries-basalte.webp',
    getDynamicNarrative:(gs)=>{
      return "Une marque noire apparaît dans la neige. Trois traits. Le symbole des Confrères de Cendre.\n\n"+
      "Tu connais ce signe. Tu connais même la voix de l'homme qui l'a porté dans certaines vies. Kaelen.\n\n"+
      "Mais aucun pas ne suit. Seulement une lettre déposée sous la marque : CONTRAT INITIAL — LIVRER LA REINE.\n\n"+
      "Tu souris malgré toi.\n\n"+
      "« Même dans un monde où il m'aime, il commence par me vendre. »\n\n"+
      "La neige se soulève. Une deuxième marque apparaît : un soleil traversé par une clé. Le sceau Leonhart.\n\n"+
      "Alistair n'est pas là non plus. Mais son absence a la même forme que celle de Kaelen : deux hommes programmés par des morts pour devenir les instruments d'une femme qu'ils n'avaient jamais rencontrée.\n\n"+
      "Tu comprends enfin le piège du cycle : il ne choisit jamais l'homme. Il choisit la cage, puis te demande quel gardien tu préfères.";
    },
    choices:[
      {key:'OMBRE',text:"Rechercher le contrat de Kaelen.",effects:[{type:'ADD_GAUGE',target:'affinite_ombre',value:2},{type:'SET_FLAG',target:'ngplus_contrat_kaelen'}],next:'NGP_06_DEUX_PORTES'},
      {key:'ECLAIREUR',text:"Rechercher l’origine du Sceau Leonhart.",effects:[{type:'ADD_GAUGE',target:'affinite_eclaireur',value:2},{type:'SET_FLAG',target:'ngplus_sceau_leonhart'}],next:'NGP_06_DEUX_PORTES'},
      {key:'LIBERTE',text:"Brûler les deux marques.",effects:[{type:'ADD_GAUGE',target:'volonte',value:3},{type:'SET_FLAG',target:'ngplus_marques_brisees'}],next:'NGP_06_DEUX_PORTES'},
      {key:'TRIANGLE',text:"Conserver les deux marques. « Je veux savoir pourquoi elles me suivent. »",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:2},{type:'SET_FLAG',target:'ngplus_deux_marques'}],next:'NGP_06_DEUX_PORTES'}
    ]
  },

  'NGP_06_DEUX_PORTES': {
    sceneNumber:'NGP_06_DEUX_PORTES', chapter:2, title:"Deux portes, aucune promesse", mood:'intimate',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/dome-magique.webp',
    getDynamicNarrative:(gs)=>{
      return "Deux portes apparaissent dans la neige.\n\nLa première est noire. Derrière elle, tu entends le frottement d'une dague contre une pierre.\n\nLa seconde est blanche. Derrière elle, une prière s'interrompt juste avant le dernier mot.\n\nTu pourrais ouvrir l'une. Tu pourrais ouvrir l'autre. Tu pourrais ne rien ouvrir.\n\nLe cycle attend que tu choisisses un homme comme si le monde était une serrure et l'amour une clé.\n\nTu comprends alors la première véritable différence entre une partie classique et celle-ci : tu connais maintenant le prix de chaque porte.\n\nAucune ne donne la liberté. Mais l'une peut peut-être apprendre à ne plus la prendre.";
    },
    choices:[
      {key:'O',text:"Ouvrir la porte noire. « Kaelen. Pas comme contrat. Comme choix. »",effects:[{type:'ADD_GAUGE',target:'lien_O',value:2},{type:'ADD_GAUGE',target:'affinite_ombre',value:2},{type:'SET_FLAG',target:'ngplus_route_O'}],next:'NGP_07_KAELEN_ECHO'},
      {key:'E',text:"Ouvrir la porte blanche. « Alistair. Pas comme geôlier. Comme homme. »",effects:[{type:'ADD_GAUGE',target:'lien_E',value:2},{type:'ADD_GAUGE',target:'affinite_eclaireur',value:2},{type:'SET_FLAG',target:'ngplus_route_E'}],next:'NGP_08_ALISTAIR_ECHO'},
      {key:'BOTH',text:"Ouvrir les deux portes et refuser d’appeler cela une promesse.",effects:[{type:'ADD_GAUGE',target:'lien_O',value:1},{type:'ADD_GAUGE',target:'lien_E',value:1},{type:'SET_FLAG',target:'ngplus_route_both'}],next:'NGP_09_DEUX_ECHOS'},
      {key:'NONE',text:"Geler les deux portes. « Cette fois, je ne choisirai personne pour être libre. »",effects:[{type:'ADD_GAUGE',target:'volonte',value:3},{type:'SET_FLAG',target:'ngplus_route_none'}],next:'NGP_10_ORAYA'}
    ]
  },

  'NGP_07_KAELEN_ECHO': {
    sceneNumber:'NGP_07_KAELEN_ECHO', chapter:2, title:"Kaelen — le contrat sans signature", mood:'romance',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/mansarde-auberge.webp',
    sprite:'Kaelen',
    getDynamicNarrative:(gs)=>{
      let echo = "";
      const last = gs.getLastClassicEnding ? gs.getLastClassicEnding() : null;
      if (last === 'FIN_OMBRE') echo = "Avant même de le voir, ta paume se souvient d’une main couverte de cendre et du poids d’un trône partagé. Kaelen fronce les sourcils au même instant, comme si la même cicatrice venait de tirer sous sa peau.\n\n";
      else if (last === 'FIN_POLY') echo = "Une image impossible traverse le couloir : Kaelen à ta droite, Alistair à ta gauche, aucun des trois certain de savoir où finit l’amour et où commence la peur de perdre.\n\n";
      else if (last === 'FIN_HIVER' || last === 'FIN_BRISEE') echo = "Kaelen te regarde avec la prudence d’un homme qui a déjà assisté à ta disparition sans pouvoir expliquer où ni quand.\n\n";
      return echo + "Kaelen est assis dans une pièce qui n'existe dans aucune carte. Il tient une feuille vierge.\n\n« Tu as déjà signé, » dis-tu.\n\n« Non. »\n\nIl retourne la feuille. Au dos, ton nom apparaît, écrit avec une encre ancienne.\n\n« C'est toi qui as signé pour moi. Dans une vie. »\n\nTu approches.\n\n« Et tu as accepté ? »\n\nIl hausse une épaule.\n\n« J'ai accepté beaucoup de choses. La livraison. La fuite. Le mensonge. Toi, c'était la seule clause que je n'arrivais pas à exécuter. »\n\nTu prends la feuille et la déchires.\n\nIl te regarde faire sans protester.\n\n« Voilà, » dis-tu. « Plus de contrat. »\n\nKaelen sourit. Pas son sourire de combat. Quelque chose de plus rare.\n\n« Alors je vais devoir trouver une autre raison de rester. »";
    },
    choices:[
      {key:'STAY',text:"« Trouve-la. Je ne te la donnerai pas. »",effects:[{type:'ADD_GAUGE',target:'lien_O',value:3},{type:'ADD_GAUGE',target:'volonte',value:1},{type:'SET_FLAG',target:'ngplus_kaelen_libre'}],next:'NGP_10_ORAYA'},
      {key:'KISS',text:"Lui demander d’un regard. L’embrasser seulement lorsqu’il réduit lui-même la distance.",response:"Kaelen attend encore un battement, puis vient à toi de son propre mouvement.",effects:[{type:'ADD_GAUGE',target:'lien_O',value:4},{type:'SET_FLAG',target:'ngplus_kaelen_baiser'}],next:'NGP_10_ORAYA'},
      {key:'DISTANCE',text:"Lui rendre la feuille. « Garde-la. Je garde ma liberté. »",effects:[{type:'ADD_GAUGE',target:'distance_O',value:2},{type:'ADD_GAUGE',target:'volonte',value:2},{type:'SET_FLAG',target:'ngplus_kaelen_distance'}],next:'NGP_10_ORAYA'},
      {key:'QUESTION',text:"« Qui a écrit le premier contrat ? »",response:"Kaelen regarde le nom ancien au dos de la feuille. « Pas un Confrère. Quelqu’un d’avant nous. Quelqu’un qui croyait qu’une protection pouvait survivre à celui qui l’ordonnait. » Le nom reste effacé, mais la dette vient de gagner un âge.",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:3},{type:'SET_FLAG',target:'ngplus_contrat_source'}],next:'NGP_10_ORAYA'}
    ]
  },

  'NGP_08_ALISTAIR_ECHO': {
    sceneNumber:'NGP_08_ALISTAIR_ECHO', chapter:2, title:"Alistair — la clé rendue", mood:'romance',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/dome-magique.webp',
    sprite:'Alistair',
    getDynamicNarrative:(gs)=>{
      let echo = "";
      const last = gs.getLastClassicEnding ? gs.getLastClassicEnding() : null;
      if (last === 'FIN_ECLAIREUR') echo = "La clé dans sa main te fait mal avant même que tu comprennes pourquoi. Une autre Elenya a déjà accepté une lumière assez belle pour oublier qu’elle fermait une porte. Alistair pâlit comme s’il venait d’entendre la même serrure.\n\n";
      else if (last === 'FIN_POLY') echo = "Pendant une seconde, tu te souviens de deux présences autour d’un même trône. Pas d’une victoire : d’un équilibre constamment menacé de devenir une cage à trois.\n\n";
      else if (last === 'FIN_SACRIFICE' || last === 'FIN_MORTELLE') echo = "Alistair te regarde comme quelqu’un qu’il a déjà perdue dans un rêve dont il ne possède que le deuil.\n\n";
      return echo + "Alistair se tient devant une porte ouverte. Dans sa main, la clé du sanctuaire.\n\n« Dans toutes les versions, tu me demandes de t'ouvrir une porte, » dit-il.\n\n« Et dans combien d'entre elles tu la refermes ? »\n\nIl baisse les yeux.\n\n« Toutes. »\n\nLe mot lui coûte davantage qu'une prière.\n\nTu tends la main.\n\nIl pose la clé dans ta paume.\n\n« Je ne veux plus être ton geôlier. »\n\n« Alors ne le sois pas. »\n\n« Et si je reste ? »\n\n« Reste parce que tu le veux. Pas parce qu'un sceau a décidé que tu devais me protéger. »\n\nIl ferme les yeux. Quand il les rouvre, la lumière n'a pas disparu. Elle n'a simplement plus besoin d'une chaîne pour exister.";
    },
    choices:[
      {key:'STAY',text:"« Reste. Mais la porte reste ouverte. »",effects:[{type:'ADD_GAUGE',target:'lien_E',value:3},{type:'ADD_GAUGE',target:'volonte',value:1},{type:'SET_FLAG',target:'ngplus_alistair_libre'}],next:'NGP_10_ORAYA'},
      {key:'KISS',text:"Lui tendre la main. Attendre qu’il choisisse le baiser et te rende la clé.",response:"Alistair franchit la porte ouverte de son propre pas, puis dépose la clé dans ta paume.",effects:[{type:'ADD_GAUGE',target:'lien_E',value:4},{type:'SET_FLAG',target:'ngplus_alistair_baiser'}],next:'NGP_10_ORAYA'},
      {key:'DISTANCE',text:"Déposer la clé au sol. « Ni serrure ni prison. »",effects:[{type:'ADD_GAUGE',target:'distance_E',value:2},{type:'ADD_GAUGE',target:'volonte',value:2},{type:'SET_FLAG',target:'ngplus_alistair_distance'}],next:'NGP_10_ORAYA'},
      {key:'QUESTION',text:"« Qui a forgé le premier sceau ? »",response:"Alistair retourne la clé entre ses doigts. « Pas mon père. Pas même son père. Le dessin est plus ancien que les Leonhart que l’Ordre m’a appris à réciter. » Sa voix se brise. « On a élevé ma famille autour d’une serrure dont on avait oublié le premier geôlier. »",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:3},{type:'SET_FLAG',target:'ngplus_sceau_source'}],next:'NGP_10_ORAYA'}
    ]
  },

  'NGP_09_DEUX_ECHOS': {
    sceneNumber:'NGP_09_DEUX_ECHOS', chapter:2, title:"Deux hommes, deux mémoires", mood:'romance',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp',
    spriteLeft:'Kaelen', spriteRight:'Alistair',
    getDynamicNarrative:(gs)=>{
      return "Kaelen et Alistair apparaissent de part et d'autre d'un couloir impossible. Ils ne sont pas ensemble. Ils sont deux souvenirs qui ont enfin compris qu'ils partagent la même cicatrice.\n\nKaelen regarde le prêtre. « Tu avais une clé. »\n\nAlistair répond : « Et toi un contrat. »\n\n« Les deux étaient des chaînes. »\n\nTu les observes. Pour la première fois, leur rivalité ne tourne pas autour de toi.\n\n« Vous avez tous les deux été fabriqués pour moi, » dis-tu. « Mais je ne vous appartiens pas. Et vous ne m'appartenez pas. »\n\nLe silence qui suit est presque paisible.\n\nKaelen range sa dague. Alistair retire son insigne.\n\nCe n'est pas une promesse de polyamour. Ce n'est pas une décision finale. C'est simplement le premier moment où aucun des deux ne cherche à gagner.";
    },
    choices:[
      {key:'TRUCE',text:"« Alors marchez avec moi sans chercher à gagner. »",effects:[{type:'ADD_GAUGE',target:'lien_O',value:2},{type:'ADD_GAUGE',target:'lien_E',value:2},{type:'SET_FLAG',target:'ngplus_truce'}],next:'NGP_10_ORAYA'},
      {key:'O',text:"Prendre la main de Kaelen.",effects:[{type:'ADD_GAUGE',target:'lien_O',value:3},{type:'SET_FLAG',target:'ngplus_choix_final_O'}],next:'NGP_10_ORAYA'},
      {key:'E',text:"Prendre la main d’Alistair.",effects:[{type:'ADD_GAUGE',target:'lien_E',value:3},{type:'SET_FLAG',target:'ngplus_choix_final_E'}],next:'NGP_10_ORAYA'},
      {key:'NONE',text:"Les laisser libres de choisir eux-mêmes.",effects:[{type:'ADD_GAUGE',target:'volonte',value:3},{type:'SET_FLAG',target:'ngplus_libertes'}],next:'NGP_10_ORAYA'}
    ]
  },

  'NGP_10_ORAYA': {
    sceneNumber:'NGP_10_ORAYA', chapter:3, title:"Oraya n’a plus trois siècles pour mentir", mood:'tension',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/forge-sacree.webp',
    getDynamicNarrative:(gs)=>{
      return "Oraya t'attend devant une stèle vide. Elle ne pleure pas. Elle a épuisé ses larmes il y a longtemps.\n\n« Tu es revenue. »\n\n« Je n'étais jamais partie. »\n\nElle comprend.\n\nTu lui montres les neuf cicatrices de mémoire qui traversent ton poignet.\n\n« Tu savais que je recommencerais ? »\n\n« Je savais que le monde recommencerait. Je ne savais pas si toi, tu accepterais de rester dans son histoire. »\n\nOraya révèle alors la vérité : le rituel n'a jamais créé le cycle. Il l'a seulement rendu possible. Le véritable cycle est nourri par les décisions de ceux qui veulent posséder la solution parfaite. Chaque fin classique est devenue une ancre. Chaque fois qu'Elenya a choisi un homme, un trône, une mort ou une fuite, le monde a retenu le choix au lieu de retenir la liberté.\n\n« Alors je peux le briser ? »\n\n« Oui. Mais tu devras accepter qu'aucune fin ne soit parfaite. »";
    },
    choices:[
      {key:'PARDON',text:"Pardonner à Oraya sans absoudre ce qu’elle a fait.",effects:[{type:'ADD_GAUGE',target:'volonte',value:3},{type:'SET_FLAG',target:'ngplus_oraya_pardon'}],next:'NGP_11_LYRA'},
      {key:'PUNIR',text:"« Tu as gardé mon corps. Je ne te donnerai pas mon pardon. »",effects:[{type:'ADD_GAUGE',target:'instabilite',value:3},{type:'SET_FLAG',target:'ngplus_oraya_punition'}],next:'NGP_11_LYRA'},
      {key:'QUESTION',text:"Exiger le nom de l’architecte du cycle.",response:"Oraya secoue lentement la tête. « Il n’y en a pas un. C’est ce qui le rend si difficile à tuer. Le rituel a ouvert la possibilité ; nos choix répétés ont bâti la prison. » Elle soutient ton regard. « Si tu cherches un coupable unique, le cycle aura déjà gagné. »",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:4},{type:'SET_FLAG',target:'ngplus_architecte_demande'}],next:'NGP_11_LYRA'},
      {key:'SILENCE',text:"Ne rien dire. Laisser Oraya vivre avec ce qu’elle a fait.",effects:[{type:'ADD_GAUGE',target:'volonte',value:2},{type:'SET_FLAG',target:'ngplus_oraya_silence'}],next:'NGP_11_LYRA'}
    ]
  },

  'NGP_11_LYRA': {
    sceneNumber:'NGP_11_LYRA', chapter:3, title:"La voix qui ne veut plus être une arme", mood:'intimate',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/observatoire.webp',
    sprite:'Lyra',
    getDynamicNarrative:(gs)=>{
      return "Lyra t'attend dans une chapelle sans murs. Elle ne chante pas.\n\n« Dans une autre vie, tu m'as libérée. Dans une autre, tu m'as gardée. Dans une autre, tu m'as oubliée. »\n\nTu ne te défends pas.\n\n« Et toi ? Que veux-tu ? »\n\nElle touche sa gorge.\n\n« Je veux que ma voix m'appartienne, même si elle ne chante plus jamais. »\n\nLa phrase te frappe plus fort que tous les souvenirs.\n\nLe cycle exige toujours une utilisation : une reine doit régner, un paladin doit protéger, un assassin doit tuer, une sirène doit chanter.\n\nTu comprends enfin que briser le cycle commence par laisser les autres être inutiles à ton histoire.\n\nLyra sourit.\n\n« Alors chante avec moi. Pas pour le monde. Pour personne. »\n\nEt pour la première fois, sa voix n'ouvre aucune porte. Elle ne commande rien. Elle existe.";
    },
    choices:[
      {key:'LIBERER',text:"« Ta voix est à toi. Je ne te demanderai jamais de la rendre utile. »",effects:[{type:'ADD_GAUGE',target:'volonte',value:3},{type:'SET_FLAG',target:'ngplus_lyra_liberee'}],next:'NGP_12_FEN'},
      {key:'CHANT',text:"Chanter avec elle, sans magie.",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:2},{type:'SET_FLAG',target:'ngplus_lyra_chant'}],next:'NGP_12_FEN'},
      {key:'POUVOIR',text:"Lui proposer de garder son pouvoir pour elle-même.",effects:[{type:'ADD_GAUGE',target:'possession',value:2},{type:'SET_FLAG',target:'ngplus_lyra_pouvoir'}],next:'NGP_12_FEN'},
      {key:'SILENCE',text:"Rester assise près d’elle. Aucun mot.",effects:[{type:'ADD_GAUGE',target:'volonte',value:2}],next:'NGP_12_FEN'}
    ]
  },

  'NGP_12_FEN': {
    sceneNumber:'NGP_12_FEN', chapter:3, title:"Le roi qui a attendu trop longtemps", mood:'intimate',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/royaume-souvenirs.webp',
    sprite:'Fen',
    getDynamicNarrative:(gs)=>{
      return "Fen saute sur la stèle. Le furet blanc tremble.\n\nPuis il cesse d'être un animal.\n\nKalthar apparaît devant toi, translucide, les mêmes yeux bleus que dans tous les souvenirs.\n\n« Enfin. »\n\nTu ne cours pas vers lui. Tu as déjà fait cette erreur dans trop de vies.\n\n« Pourquoi m'as-tu laissée ? »\n\n« Parce que je t'aimais assez pour accepter que tu me détestes. »\n\nIl t'explique le dernier morceau : son sacrifice n'était pas la cause du Gel. Il était la clef qui empêchait le Brasier de trouver un esprit vivant à consumer. Tant qu'Elenya cherchait à le ressusciter, le cycle gardait une porte ouverte.\n\n« Tu ne dois pas me ramener. »\n\nLe mot est presque tendre.\n\n« Tu dois me laisser mourir correctement. »\n\nFen redevient le petit animal qu'il était. Il vient se blottir contre ta gorge. Cette fois, tu comprends ce que signifie survivre à quelqu'un.";
    },
    choices:[
      {key:'LETTING_GO',text:"« Alors je te laisse partir. »",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:5},{type:'SET_FLAG',target:'ngplus_kalthar_lache'}],next:'NGP_13_BRASIER'},
      {key:'REFUSE',text:"« Non. Je refuse encore de te perdre. »",effects:[{type:'ADD_GAUGE',target:'possession',value:4},{type:'SET_FLAG',target:'ngplus_kalthar_refuse'}],next:'NGP_13_BRASIER'},
      {key:'ASK',text:"« Est-ce que tu m’as aimée ou seulement protégée ? »",response:"Kalthar ferme les yeux. « Je t’ai protégée quand j’avais peur de te perdre. Je t’ai aimée quand j’ai compris que te garder aurait été une autre manière de te perdre. » Quand il les rouvre, il n’y a plus de roi dans son regard. Seulement l’homme. « Les deux ont existé. Je regrette seulement le temps qu’il m’a fallu pour apprendre la différence. »",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:3},{type:'SET_FLAG',target:'ngplus_kalthar_amour'}],next:'NGP_13_BRASIER'},
      {key:'SILENCE',text:"Le serrer contre toi sans chercher de réponse.",effects:[{type:'ADD_GAUGE',target:'volonte',value:3},{type:'SET_FLAG',target:'ngplus_kalthar_silence'}],next:'NGP_13_BRASIER'}
    ]
  },

  'NGP_13_BRASIER': {
    sceneNumber:'NGP_13_BRASIER', chapter:4, title:"Le brasier derrière le monde", mood:'action',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/fin-chaos.webp',
    getDynamicNarrative:(gs)=>{
      return "Le ciel s'ouvre. Pas comme une tempête. Comme une plaie.\n\nL'Entité de Calcination regarde enfin directement Elenya. Elle n'a pas de visage parce qu'un visage supposerait qu'elle comprenne ce qu'elle détruit.\n\n« RECOMMENCE. »\n\nLe mot traverse le continent. Les fins classiques apparaissent autour de toi comme des éclats de miroir. Chaque éclat propose une solution connue : régner, mourir, aimer, fuir, pardonner, posséder, sacrifier.\n\nTu pourrais choisir une nouvelle fois.\n\nMais tu comprends le piège. Le Brasier ne se nourrit pas du feu. Il se nourrit du choix qui prétend être définitif.\n\nAlors tu fais quelque chose que la reine d'origine n'avait jamais tenté : tu refuses de devenir la réponse unique.";
    },
    choices:[
      {key:'GEL',text:"Lever la main et enfermer le Brasier dans une frontière vivante.",effects:[{type:'ADD_GAUGE',target:'instabilite',value:4},{type:'SET_FLAG',target:'ngplus_frontiere'}],next:'NGP_14_TRONE_BRIS'},
      {key:'MORTEL',text:"Abandonner le givre et devenir mortelle avant qu’il ne puisse te posséder.",effects:[{type:'ADD_GAUGE',target:'volonte',value:4},{type:'SET_FLAG',target:'ngplus_mortelle'}],next:'NGP_14_TRONE_BRIS'},
      {key:'LIBERTE',text:"Briser les miroirs de toutes les fins.",effects:[{type:'ADD_GAUGE',target:'volonte',value:5},{type:'SET_FLAG',target:'ngplus_miroirs_brises'}],next:'NGP_14_TRONE_BRIS'},
      {key:'POSSESSION',text:"Absorber le Brasier et devenir sa prison.",effects:[{type:'ADD_GAUGE',target:'possession',value:5},{type:'ADD_GAUGE',target:'instabilite',value:5},{type:'SET_FLAG',target:'ngplus_brasier_absorbe'}],next:'NGP_14_TRONE_BRIS'}
    ]
  },

  'NGP_14_TRONE_BRIS': {
    sceneNumber:'NGP_14_TRONE_BRIS', chapter:4, title:"Le Trône refuse de mourir", mood:'tension',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp',
    getDynamicNarrative:(gs)=>{
      return "Le Trône d'Ébène apparaît. Il est intact.\n\nTu le regardes avec une fatigue immense.\n\nDans toutes les fins, tu t'es assise dessus ou tu l'as détruit. Tu as cru qu'il fallait posséder le centre du monde pour pouvoir le sauver.\n\nCette fois, tu vois sa fonction réelle : le Trône n'est pas un siège. C'est un mécanisme de décision. Il transforme une volonté individuelle en loi du monde.\n\nC'est pourquoi il aime les rois. C'est pourquoi il aime les sacrifices. C'est pourquoi il aime les amants possessifs et les paladins dévoués. Il ne comprend qu'une chose : quelqu'un doit décider pour tous.\n\nTu poses les deux mains sur l'accoudoir.\n\n« Non. »\n\nLe Trône tremble.\n\nTu ne vas pas choisir une meilleure cage. Tu vas supprimer la nécessité d'en avoir une.";
    },
    choices:[
      {key:'DESTROY',text:"Détruire le Trône.",effects:[{type:'ADD_GAUGE',target:'volonte',value:4},{type:'SET_FLAG',target:'ngplus_trone_detruit'}],next:'NGP_15_DERNIER_CHOIX'},
      {key:'TRANSFORM',text:"Transformer le Trône en mémoire, pas en pouvoir.",effects:[{type:'ADD_GAUGE',target:'memoire_kalthar',value:3},{type:'SET_FLAG',target:'ngplus_trone_memoire'}],next:'NGP_15_DERNIER_CHOIX'},
      {key:'KEEP',text:"Garder le Trône et promettre de ne jamais l’utiliser.",effects:[{type:'ADD_GAUGE',target:'possession',value:2},{type:'SET_FLAG',target:'ngplus_trone_garde'}],next:'NGP_15_DERNIER_CHOIX'},
      {key:'SACRIFICE',text:"T’offrir à sa place.",effects:[{type:'ADD_GAUGE',target:'instabilite',value:5},{type:'SET_FLAG',target:'ngplus_trone_sacrifice'}],next:'NGP_15_DERNIER_CHOIX'}
    ]
  },

  'NGP_15_DERNIER_CHOIX': {
    sceneNumber:'NGP_15_DERNIER_CHOIX', chapter:5, title:"Ce qui reste quand on ne choisit pas", mood:'epilogue',
    image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/fin-aube.webp',
    getDynamicNarrative:(gs)=>{
      return "Le monde attend.\n\nKaelen, Alistair, Oraya, Lyra, Mira, les fidèles, les humains : chacun porte une version différente de ce que tu devrais devenir. Même Kalthar, désormais silencieux, a laissé son empreinte sur ton choix.\n\nTu comprends enfin la phrase que ton propre sang essayait de te rappeler depuis le premier réveil : on ne sauve jamais ce qu'on enferme.\n\nMais il existe une nuance que tu n'avais pas comprise.\n\nOn ne libère pas non plus quelqu'un en décidant à sa place ce que doit être sa liberté.\n\nTu regardes ceux qui restent.\n\n« Je ne vais pas vous choisir une fin. »\n\nLe monde ne se brise pas.\n\nPour la première fois, il respire.";
    },
    choices:[
      {key:'FRONTIERE',condition:(gs)=>gs.hasFlag('ngplus_frontiere') && gs.getGauge('volonte')>=10,text:"Devenir la frontière vivante entre le Brasier et le monde.",effects:[{type:'SET_FLAG',target:'ngplus_final_frontiere'}],next:'NG_FIN_FRONTIERE'},
      {key:'CYCLE',condition:(gs)=>gs.hasFlag('ngplus_kalthar_refuse') && gs.getGauge('possession')>=8,text:"Refuser encore de laisser Kalthar partir. Accepter le recommencement.",effects:[{type:'SET_FLAG',target:'ngplus_final_cycle'}],next:'NG_FIN_CYCLE'},
      {key:'FINAL',text:"Avancer sans couronne.",effects:[{type:'SET_FLAG',target:'ngplus_final_libre'}],next:'NG_FIN_LIBERATION'},
      {key:'LOVE',condition:(gs)=>
        (gs.hasFlag('ngplus_route_O') && !gs.hasFlag('ngplus_kaelen_distance')) ||
        (gs.hasFlag('ngplus_route_E') && !gs.hasFlag('ngplus_alistair_distance')) ||
        (gs.hasFlag('ngplus_route_both') && !gs.hasFlag('ngplus_libertes')),
        text:"Tendre la main à celui ou ceux qui ont choisi de rester, sans les retenir.",effects:[{type:'SET_FLAG',target:'ngplus_final_amour'}],next:'NG_FIN_AMOUR'},
      {key:'THRONE',condition:(gs)=>gs.hasFlag('ngplus_route_both'),text:"Retourner une dernière fois vers le Trône.",effects:[{type:'SET_FLAG',target:'ngplus_final_trone'}],next:'NG_FIN_DEUX_MAINS'},
      {key:'VOID',text:"Laisser le silence décider.",effects:[{type:'SET_FLAG',target:'ngplus_final_void'}],next:'NG_FIN_VIDE'}
    ]
  },

  'NG_FIN_LIBERATION': {sceneNumber:'NG_FIN_LIBERATION',chapter:5,title:"La Fin du Cycle",mood:'end',isEnd:true,achievementId:'ach_ng_fin_liberation',getDynamicNarrative:(gs)=>"Le Gel se retire du monde comme une marée. La couronne fond sans douleur. Le Brasier perd son chemin vers les vivants.\n\nElenya Frost n'est plus une reine éternelle. Elle est une femme qui a survécu à toutes les histoires qu'on avait écrites pour elle.\n\nLe monde continue sans son autorisation. C'est la plus belle victoire qu'elle pouvait lui offrir."},

  'NG_FIN_AMOUR': {sceneNumber:'NG_FIN_AMOUR',chapter:5,title:"Choisir sans enfermer",mood:'end',isEnd:true,achievementId:'ach_ng_fin_amour',getDynamicNarrative:(gs)=>{
    const o=!gs.hasFlag('ngplus_kaelen_distance') && (
      gs.hasFlag('ngplus_kaelen_libre') || gs.hasFlag('ngplus_kaelen_baiser') ||
      gs.hasFlag('ngplus_choix_final_O') || gs.hasFlag('ngplus_truce')
    );
    const e=!gs.hasFlag('ngplus_alistair_distance') && (
      gs.hasFlag('ngplus_alistair_libre') || gs.hasFlag('ngplus_alistair_baiser') ||
      gs.hasFlag('ngplus_choix_final_E') || gs.hasFlag('ngplus_truce')
    );
    let who=o&&e?"Kaelen et Alistair restent, chacun avec sa propre liberté.":o?"Kaelen reste. Pas comme contrat : comme homme qui peut partir.":e?"Alistair reste. Pas comme geôlier : comme homme qui peut ouvrir la porte.":"Personne ne reste par devoir. Et pourtant tu n'es plus seule.";
    return "Le monde n'a pas besoin d'un couple parfait. Il a besoin de gens capables de partir et de revenir.\n\n"+who+"\n\nTu ne promets pas l'éternité. Tu promets seulement de ne pas confondre amour et possession.";
  }},

  'NG_FIN_DEUX_MAINS': {sceneNumber:'NG_FIN_DEUX_MAINS',chapter:5,title:"Deux mains libres",mood:'end',isEnd:true,achievementId:'ach_ng_fin_deux_mains',getDynamicNarrative:(gs)=>"Tu regardes le Trône une dernière fois. Puis tu refuses de t'y asseoir.\n\nKaelen pose une main sur le bois noir. Alistair pose l'autre. Aucun ne prend le pouvoir.\n\nTu souris.\n\n« Voilà. Vous avez enfin trouvé quelque chose que vous pouvez partager : la décision de ne pas décider à ma place. »\n\nLe Trône se fissure. Pas dans une explosion. Dans un soupir.\n\nTrois silhouettes quittent la salle sans couronne. Le monde leur appartient moins qu'avant. Et c'est précisément pour cela qu'il peut enfin leur appartenir un peu."},

  'NG_FIN_VIDE': {sceneNumber:'NG_FIN_VIDE',chapter:5,title:"Le Trône vide",mood:'end',isEnd:true,achievementId:'ach_ng_fin_vide',getDynamicNarrative:(gs)=>"Elenya ne choisit ni le pouvoir, ni l'amour, ni la mort.\n\nElle choisit le silence.\n\nLe Trône reste vide. Le monde apprend à vivre sans souverain. Les anciennes fins s'effacent une à une, comme des traces de pas sous la neige.\n\nQuelque part, Fen siffle une dernière fois. Deux notes. Puis une troisième.\n\nKalthar est enfin libre.\n\nEt Elenya aussi."},

  'NG_FIN_CYCLE': {sceneNumber:'NG_FIN_CYCLE',chapter:5,title:"Le Roi du Recommencement",mood:'end',isEnd:true,achievementId:'ach_ng_fin_cycle',getDynamicNarrative:(gs)=>"Tu refuses de lâcher Kalthar. Le Brasier trouve la faille.\n\nLe monde recommence.\n\nMais cette fois, tu sais que tu es dans une boucle. Tu entends ton propre réveil avant même de t'être endormie.\n\nLe cycle n'est plus une prison cachée. Il est devenu ta décision.\n\nFen ouvre les yeux sur la stèle.\n\n« Encore ? »\n\nTu souris.\n\n« Encore. »"},

  'NG_FIN_FRONTIERE': {sceneNumber:'NG_FIN_FRONTIERE',chapter:5,title:"La Frontière vivante",mood:'end',isEnd:true,achievementId:'ach_ng_fin_frontiere',getDynamicNarrative:(gs)=>"Tu deviens la frontière. Pas une reine. Pas une déesse. Une ligne vivante entre le Brasier et le monde.\n\nLes générations futures apprendront ton nom comme une géographie : ici commence Elenya, ici finit le feu.\n\nTu ne possèdes rien. Tu empêches seulement le monde de brûler.\n\nPour la première fois, ton sacrifice ne demande à personne de t'aimer pour le comprendre."}
};

// V52.1.5 — chaque fin NG+ possède son propre cadre au lieu d'hériter
// accidentellement du décor de la scène précédente.
Object.assign(NGPLUS_DB.NG_FIN_LIBERATION, {image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/fin-aube.webp'});
Object.assign(NGPLUS_DB.NG_FIN_AMOUR, {image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/serre.webp'});
Object.assign(NGPLUS_DB.NG_FIN_DEUX_MAINS, {image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp'});
Object.assign(NGPLUS_DB.NG_FIN_VIDE, {image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/trone-ebene.webp'});
Object.assign(NGPLUS_DB.NG_FIN_CYCLE, {image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/autel-reveil.webp', sprite:'Fen'});
Object.assign(NGPLUS_DB.NG_FIN_FRONTIERE, {image:'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/backgrounds/fin-chaos.webp'});
