// Refonte 52.4 — couches additives. Identifiants classiques et schéma 50 conservés.
var _refonteApplied = false;
var REFONTE_ART_BASE = 'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@b02779d6f91076b3bfedc96622b311255ce7f1ac/game-v56/backgrounds/';
var REFONTE_BACKGROUND_NAMES = {
  'winter-library-oblique':'Bibliothèque — vue de la mezzanine',
  'winter-greenhouse-oblique':'Serre — bassin et verrières',
  'snow-forest-sideview':'Lisière — pente nocturne',
  'basalt-ravine-oblique':'Combe — après les lances de givre',
  'rustic-inn-corner':'Auberge — salle commune',
  'awakening-frost-chamber':'Réveil — autel de basalte',
  'basalt-catacombs-transverse':'Galeries — voûtes irrégulières',
  'ebony-throne-lateral':'Trône — cathédrale éventrée'
};
function refonteAsset_(url,state,id) {
  if(!url||/\/cg\/|\/endings\//.test(url))return url;
  let name=null;
  if(/\/bibliotheque\.webp$/.test(url))name='winter-library-oblique';
  if(/\/serre\.webp$/.test(url))name='winter-greenhouse-oblique';
  if(/\/auberge\.webp$/.test(url))name='rustic-inn-corner';
  if(/^(ACTE1_01_REVEIL|NG_FIN_CYCLE)/.test(id))name='awakening-frost-chamber';
  if(/^(ACTE1_04_TRANSITION|ACTE1_06_REMONTEE|ACTE1_06C_CONVERGENCE|NGP_05C_CENDRES)$/.test(id))name='basalt-catacombs-transverse';
  if(/^(ACTE1_08B_BIVOUAC_LISIERE|LIEN_LISIERE_DEUX|KAELEN_SILENCE)$/.test(id))name='snow-forest-sideview';
  if(id==='ACTE4_09_TRONE_EBENE')name='ebony-throne-lateral';
  if(/^(ACTE3_02_SAUVETAGE|ACTE3_03_LA_SIRENE|ACTE3_03B_RESISTANCE|LYRA_INDICE_1)$/.test(id)){
    if(id!=='ACTE3_02_SAUVETAGE'&&(state.flags||[]).includes('sauvetage_lance'))name='basalt-ravine-oblique';
    else return 'https://cdn.jsdelivr.net/gh/Sunstrader/Releases@main/Acte%203/Ravin_202606191345.jpeg';
  }
  return name?REFONTE_ART_BASE+name+'.webp':url;
}
function applyRefonte_() {
  if (_refonteApplied) return;
  _refonteApplied = true;
  const responses = {
    NGP_01_SEUIL: {
      MEMOIRE:"Tu laisses les lettres se dissoudre sous ta paume. Les vies reviennent sans ordre, mais tu ne détournes plus les yeux : cette fois, tu veux pouvoir les comparer.",
      REFUS:"Une croûte blanche recouvre les mots. La pierre se tait ; ta mémoire, elle, ne s'efface pas. Tu garderas le droit de contredire ce qu'elle raconte.",
      FEN:"Fen se raidit, puis pose son museau contre ton poignet. Il ne nie pas. Tu desserres les doigts pour lui laisser une issue ; il reste.",
      COURONNE:"Le diadème mord ton front. Tu le soulèves aussitôt d'un doigt : porter une couronne ne lui donne pas encore le droit de penser à ta place."
    },
    NGP_02_NEUF_ECHOS: {
      KALTHAR:"Tu écartes les reflets des trônes pour chercher le même visage derrière chacun. Fen tourne la tête vers une fenêtre qui n'était pas là un instant plus tôt.",
      AMOUR:"Tu retiens les mains plutôt que les couronnes. Ce qui te trouble n'est pas qu'elles t'aient touchée : c'est de ne plus savoir, dans certaines vies, si elles pouvaient repartir.",
      TRONE:"Tu contournes le siège au lieu de t'y asseoir. Dans la neige, ses quatre pieds ont laissé une seule empreinte, comme si tout le monde devait finir au même endroit.",
      SILENCE:"Tu suis le rythme de ton souffle. Fen ne te guide pas ; il attend que tu choisisses la première empreinte. Tu avances, sans explication à offrir."
    },
    NGP_03_PALAIS_ECHO: {
      PROMESSE:"Le reflet cesse de sourire. « Alors laisse-moi finir, même si ce que tu entends te déplaît. » Pour une fois, tu n'essaies pas de saisir la main derrière le verre.",
      COLERE:"Une coupe éclate au bord de la table. Kalthar ne recule pas. « Ta colère n'efface pas ce que je te dois. » Tu laisses les éclats à leur place.",
      PARDON:"« Tu n'as pas à décider maintenant », répond le reflet. Le soulagement qui passe sur son visage ne ressemble pas à une absolution.",
      DEPART:"Tu dépasses la fenêtre sans te retourner. « Vis », souffle la voix derrière toi. Ce n'est plus un ordre ; tu peux poursuivre même sans lui répondre."
    },
    NGP_04_FRESQUE_REPRISE: {
      DETTE:"Sous le motif royal, tu découvres des marques superposées. Plusieurs mains ont corrigé la même inscription. Tu emportes la question de leur origine, pas encore une réponse.",
      GEL:"La fissure cesse de rougeoyer sous tes doigts. Maintenir la fermeture exige pourtant un effort continu : la garder n'est pas la réparer.",
      BRISER:"Tu fends une bordure du relief. Le dessin se brise sans que la chaleur derrière lui disparaisse. Détruire le récit du piège n'a pas détruit le piège.",
      FEN:"Le petit corps se détend sous ta main. Fen touche le cercle de Stase de son museau, puis retire la tête. Tu acceptes ce premier aveu incomplet."
    },
    NGP_05_CONFRERIE: {
      OMBRE:"Tu suis la ligne du contrat jusque sous la neige. Elle ne mène pas vers Kaelen mais vers ceux qui ont décidé de sa dette avant sa naissance.",
      ECLAIREUR:"Tu retournes l'empreinte du sceau. Sous l'emblème de foi apparaît le dessin d'une serrure : tu veux examiner le mécanisme avant de chercher son héritier.",
      LIBERTE:"Tu effaces les deux marques. Leur contour demeure un instant dans l'air, puis s'éteint. Il reste à décider ce que tu feras des preuves.",
      TRIANGLE:"Tu gardes les deux empreintes séparées dans tes paumes. Les réunir ne t'autorise pas à confondre les deux hommes qui les portent."
    },
    NGP_06_DEUX_PORTES: {
      O:"La porte noire s'entrouvre. Tu annonces ton arrivée avant d'entrer ; le bruit de la lame s'arrête, puis une voix te répond : « Entre. »",
      E:"Tu frappes au bois clair. Alistair interrompt sa prière et ouvre lui-même. Sa première décision de cette vie n'est pas de te barrer le passage.",
      BOTH:"Tu ouvres les deux portes sans appeler personne à toi. Les deux hommes se regardent avant de regarder ta main vide.",
      NONE:"Le givre condamne les serrures, pas la route. Tu passes entre les portes et rejoins seule la lumière de la stèle."
    },
    NGP_07_KAELEN_ECHO: {
      STAY:"Kaelen range les morceaux du contrat. « Je commence par marcher avec toi jusqu'au prochain tournant. Après, tu me reposeras la question. »",
      DISTANCE:"Il ramasse les fragments sans chercher à retenir ta main. « Tu ne me dois pas une place parce que j'ai cessé de te vendre. » Il s'écarte de la porte."
    },
    NGP_08_ALISTAIR_ECHO: {
      STAY:"Alistair détache la clé de sa chaîne. « Si je recommence à appeler protection ce qui te retient, dis-le-moi. » Tu réponds : « Je n'attendrai pas ton accord. »",
      DISTANCE:"Il ne ramasse pas la clé. « Alors je n'en chercherai pas une autre. » Pour la première fois, tu peux quitter la pièce sans qu'il te précède."
    },
    NGP_09_DEUX_ECHOS: {
      TRUCE:"Kaelen garde sa dague au fourreau. Alistair laisse son insigne sur la pierre. Le désaccord n'a pas disparu ; aucun des deux ne cherche à en faire ton épreuve.",
      NONE:"Tu refuses de distribuer les places. Ils acquiescent séparément : leur liberté ne dépendra pas du nombre de mains que tu choisis de prendre.",
      O:"Tu tends la main vers Kaelen sans la refermer. Il te rejoint de son propre mouvement ; Alistair s'écarte, sans qu'on lui demande de bénir ce choix.",
      E:"Alistair regarde ta main avant de la prendre. Kaelen incline la tête et se décale. La place laissée vide ne devient pas une dette envers lui."
    },
    NGP_10_ORAYA: {
      PARDON:"Oraya incline la tête. « Je répondrai quand même de ce que j'ai fait. » Tu gardes cette phrase plutôt que la promesse d'un oubli.",
      PUNIR:"Elle cherche une défense, puis renonce. « Je ne peux pas exiger de toi la paix que je t'ai refusée. » Tu passes sans lui offrir ton pardon.",
      SILENCE:"Tu laisses la stèle entre vous. Oraya comprend que ton silence n'est ni un acquittement ni une invitation à recommencer son plaidoyer."
    },
    NGP_11_LYRA: {
      LIBERER:"Lyra ouvre la bouche, puis choisit de ne pas chanter. Tu restes près d'elle. C'est ainsi qu'elle vérifie que tu pensais vraiment ce que tu disais.",
      CHANT:"Tu manques la première note. Lyra rit et la reprend plus bas. Rien ne se plie à vos voix, et aucune de vous n'essaie de corriger le monde.",
      POUVOIR:"« Le garder ne m'oblige pas à m'en servir », répond Lyra. Tu acquiesces ; elle attend encore un instant avant de te croire.",
      SILENCE:"Lyra déplace légèrement son manteau pour te faire une place. Vous regardez le ciel ouvert. Elle ne transforme pas ta présence en dette."
    },
    NGP_12_FEN: {
      LETTING_GO:"Tu ouvres les mains. Le reflet de Kalthar ne revient pas les remplir. Fen se blottit contre ton poignet : ce qui survit n'est plus une promesse de résurrection.",
      REFUSE:"Tu serres le petit corps contre toi et cherches le roi dans ses yeux. Fen remue pour respirer ; tu desserres ta prise, mais pas encore ton refus.",
      SILENCE:"Tu le tiens contre ton cœur sans rappeler le roi. Le poids chaud du furet suffit pour cet instant. Tu ne lui demandes pas d'être quelqu'un d'autre."
    },
    NGP_13_BRASIER: {
      GEL:"Le feu s'arrête contre ta paume, sans s'éteindre. Tu traces une limite que tu devras entretenir ; tu n'as pas vaincu la chaleur en prétendant qu'elle n'existait plus.",
      MORTEL:"Le froid quitte lentement tes doigts. Le Brasier ne trouve plus en toi la même prise, mais tes jambes tremblent : avancer mortelle aura aussi un prix.",
      LIBERTE:"Les miroirs éclatent les uns après les autres. Tu protèges ton visage de ton bras ; même la liberté laisse des éclats à ramasser.",
      POSSESSION:"La brûlure passe sous ta peau. L'espace d'un souffle, tu entends tes pensées avec une voix étrangère. Tu as pris la prison en toi, pas supprimé son prisonnier."
    },
    NGP_14_TRONE_BRIS: {
      DESTROY:"L'accoudoir cède. Tu attends que le monde tombe avec lui ; seul le bois noir s'effondre. Ceux qui vivaient à son ombre sont encore debout.",
      TRANSFORM:"Tu retires au mécanisme le droit d'ordonner. Les empreintes restent lisibles dans le bois : elles pourront être consultées, jamais obéies.",
      KEEP:"Tu retires les mains. Le siège demeure intact. Ta promesse de ne pas l'utiliser ne lie ni ta peur future ni ceux qui viendront après toi.",
      SACRIFICE:"Tu prends la place du mécanisme. Aussitôt, toutes les attentes se tournent vers toi. Tu reconnais trop tard la forme familière de cette solution."
    },
    NGP_15_DERNIER_CHOIX: {
      FRONTIERE:"Tu traces la limite au sol, puis la prolonges d'un pas. Elle devra laisser passer les vivants sans laisser entrer le Brasier.",
      CYCLE:"Tu prononces encore le nom de Kalthar comme un rappel. Les traces de pas s'effacent autour de toi. Le premier matin revient.",
      FINAL:"Tu poses la couronne à terre. Personne ne sait encore comment vivre sans elle. Tu acceptes de commencer sans leur imposer la réponse.",
      LOVE:"Tu tends la main et attends. Ce sont leurs pas, pas ton pouvoir, qui comblent la distance.",
      THRONE:"Vous revenez ensemble jusqu'au siège. Cette fois, le silence entre vous n'attend pas que tu désignes qui doit s'asseoir.",
      VOID:"Tu n'installes personne à ta place. La place vide inquiète le monde, mais elle ne lui donne aucun ordre."
    }
  };
  Object.keys(responses).forEach(id=>{
    const s=NGPLUS_DB[id]; if(!s)return;
    s.choices.forEach(c=>{if(!c.response&&responses[id][c.key])c.response=responses[id][c.key];});
  });
  // Les embranchements ci-dessous sont de vraies scènes avec une décision propre.
  const branches = [
    ['NGP_05_CONFRERIE','OMBRE','NGP_05A_ARCHIVES','Le nom sous la clause','bibliotheque',
      "Tu trouves le contrat sous une pile de copies. Le nom de Kaelen figure sur la dernière, pas sur la première.\n\nTu pourrais lui tendre cet héritage comme une accusation. Tu pourrais aussi en garder la preuve contre ceux qui le réclament. L'encre n'effacera pas ce qu'il a fait ; elle permet de distinguer sa décision de leur ordre.",
      ['PREUVE','Conserver une copie pour confronter les Confrères.','ngplus_preuve_contrat','memoire_kalthar',2,"Tu plies la copie sans l'ajouter à sa dette. Le texte servira de preuve, pas de laisse."],
      ['RENDRE','Laisser à Kaelen le droit de disposer de son contrat.','ngplus_contrat_rendu','volonte',2,"Tu ne brûles pas le papier à sa place. Pour défaire une emprise, tu commences par renoncer à ce geste-là."]],
    ['NGP_05_CONFRERIE','ECLAIREUR','NGP_05B_SCEAU','La serrure sans héritier','observatoire',
      "Le dessin du sceau n'est pas une bénédiction complète. Une partie de ses traits ramène toujours le porteur vers la même porte.\n\nTu peux en révéler le fonctionnement à Alistair ou briser ce dernier lien avant de le retrouver. Savoir n'est pas encore choisir pour lui.",
      ['EXPLIQUER','Conserver le dessin pour qu’Alistair décide en connaissance de cause.','ngplus_sceau_explique','memoire_kalthar',2,"Tu emportes le dessin ouvert, sans masquer le trait qui enferme. La décision suivante lui appartiendra."],
      ['ROMPRE','Rompre l’ancrage qui te lie au sceau, sans toucher à sa foi.','ngplus_ancrage_rompu','volonte',2,"Tu retires ton nom du cercle. La lumière demeure ; c'est son droit sur toi qui vient de disparaître."]],
    ['NGP_05_CONFRERIE','LIBERTE','NGP_05C_CENDRES','Ce qui vaut la peine de garder','galeries-basalte',
      "Les marques ont disparu, mais le papier ne s'est pas entièrement consumé. Un témoin pourrait encore le lire.\n\nDétruire les preuves protégerait ceux que les contrats désignent. Les conserver empêcherait leurs auteurs de prétendre qu'ils n'ont jamais existé. Tu ne peux pas obtenir les deux certitudes à la fois.",
      ['ARCHIVER','Garder les preuves, sans les noms des victimes.','ngplus_archive_anonyme','memoire_kalthar',2,"Tu sépares les clauses des noms. L'histoire pourra être racontée sans livrer de nouvelles prises."],
      ['DETRUIRE','Détruire les derniers exemplaires.','ngplus_copies_detruites','volonte',2,"Tu attends que la dernière lettre soit illisible. La preuve est perdue, mais personne ne pourra reprendre ce papier contre eux."]],
    ['NGP_07_KAELEN_ECHO','STAY','NGP_07B_PAS','Rester au prochain tournant','mansarde-auberge',
      "Kaelen attend sur le seuil. Il n'a plus de contrat à te montrer.\n\n« Si je reste, je ne te suivrai pas dans toutes tes décisions. »\n\n« Tu penses que je te le demanderais ? »\n\n« Je pense qu'un jour tu pourrais en avoir peur. Je préfère te le dire avant. »\n\nTu peux lui répondre sans transformer ce départ en nouveau serment.",
      ['EGAL','« Contredis-moi quand il le faut. Reste si tu le veux. »','ngplus_kaelen_egal','lien_O',2,"Il hoche la tête. « Tu vas regretter de me l'avoir proposé. » Son sourire ne retire rien au sérieux de l'accord."],
      ['AMI','« Marchons ensemble. Sans promesse amoureuse. »','ngplus_kaelen_amitie','volonte',2,"« Ensemble, alors », répond-il. Il n'essaie pas de transformer ce mot en autre chose."]],
    ['NGP_08_ALISTAIR_ECHO','STAY','NGP_08B_SEUIL','La place près de la porte','dome-magique',
      "Alistair reste près de la porte ouverte. Il garde les mains visibles, comme s'il apprenait à ne pas cacher une clé.\n\n« Je ne sais pas encore protéger sans décider à la place des autres. »\n\n« Alors demande avant d'agir. »\n\nIl inspire, puis pose enfin une question qui ne contient pas sa réponse :\n\n« Quelle place veux-tu me donner ? »",
      ['EGAL','« À mes côtés, pas devant ma liberté. »','ngplus_alistair_egal','lien_E',2,"Il quitte le seuil pour se mettre à ta hauteur. Le passage reste libre derrière vous."],
      ['AMI','« Celle d’un ami. Pas d’un gardien ni d’un amant. »','ngplus_alistair_amitie','volonte',2,"Il accueille la limite sans marchander. « Je peux commencer par cela. »"]]
  ];
  branches.forEach(b=>{
    const original=NGPLUS_DB[b[0]].choices.find(c=>c.key===b[1]);
    const next=original.next; original.next=b[2];
    NGPLUS_DB[b[2]]={sceneNumber:b[2],chapter:NGPLUS_DB[b[0]].chapter,title:b[3],mood:'exploration',image:ELENYA_ART_V54_BASE+'backgrounds/'+b[4]+'.webp',text:b[5],choices:[b[6],b[7]].map(c=>({key:c[0],text:c[1],importance:'major',effects:[{type:'SET_FLAG',target:c[2]},{type:'ADD_GAUGE',target:c[3],value:c[4]}],response:c[5],next}))};
  });
  NGPLUS_DB.NGP_05C_CENDRES.choices.find(c=>c.key==='ARCHIVER').effects.push({type:'UNLOCK_ACHIEVEMENT',target:'ach_archive_sans_chaines'});
  ['NGP_07B_PAS','NGP_08B_SEUIL'].forEach(id=>NGPLUS_DB[id].choices.find(c=>c.key==='AMI').effects.push({type:'UNLOCK_ACHIEVEMENT',target:'ach_amitie_choisie'}));
  const love=NGPLUS_DB.NGP_15_DERNIER_CHOIX.choices.find(c=>c.key==='LOVE'),oldLove=love.condition;
  love.condition=gs=>oldLove(gs)&&!gs.hasFlag('ngplus_kaelen_amitie')&&!gs.hasFlag('ngplus_alistair_amitie');
  const throne=NGPLUS_DB.NGP_15_DERNIER_CHOIX.choices.find(c=>c.key==='THRONE');
  throne.condition=gs=>gs.hasFlag('ngplus_route_both')&&!gs.hasFlag('ngplus_trone_detruit')&&!gs.hasFlag('ngplus_trone_memoire');
  const finale=NGPLUS_DB.NGP_15_DERNIER_CHOIX.getDynamicNarrative;
  NGPLUS_DB.NGP_15_DERNIER_CHOIX.getDynamicNarrative=gs=>{
    let consequence='';
    if(gs.hasFlag('ngplus_mortelle'))consequence='Tes doigts ne répondent plus au givre. Ce choix rend impossible de porter toi-même une frontière magique.\n\n';
    else if(gs.hasFlag('ngplus_brasier_absorbe'))consequence='La brûlure demeure sous ta peau. Absorber le Brasier ne l’a pas fait disparaître ; tu refuses de l’oublier en regardant ceux qui restent.\n\n';
    if(gs.hasFlag('ngplus_preuve_contrat')||gs.hasFlag('ngplus_sceau_explique'))consequence+='Les preuves sont encore dans tes mains. Elles pourront être transmises au lieu de devenir un nouveau secret royal.\n\n';
    return consequence+finale(gs);
  };
  // Trois effets explicitement liés à leur choix, pas déduits des jauges.
  const visualChoices=[['ACTE1_02_RENCONTRE_2','S','ground-frost'],['ACTE2_08_MATIN_AUBERGE','S','crossbow-frost'],['ACTE3_02_SAUVETAGE','A','ice-storm'],['ACTE3_02_SAUVETAGE','B','ice-lance']];
  visualChoices.forEach(([id,key,effect])=>{const c=DB[id]&&(DB[id].choices||[]).find(c=>c.key===key);if(c)c.presentationEffect=effect;});
  // Ce premier indice précédait la présentation de Lyra et la répétait presque mot pour mot.
  DB.LYRA_INDICE_1.getDynamicNarrative=gs=>{
    const aftermath=gs.hasFlag('sauvetage_lance')?'Les lances vibrent encore dans le basalte.':'Le givre retombe en poussière dans la combe.';
    return aftermath+' La survivante se protège les yeux, puis regarde ta main.\n\nElle commence un geste vers toi et s’arrête. Sous sa manche apparaît une brûlure circulaire ; elle la recouvre aussitôt.\n\n« Ne me demandez pas de chanter. »\n\nLa phrase est presque inaudible. À ton cou, Fen se raidit. Tu ne sais pas encore lequel des deux a reconnu l’autre.';
  };
}

function refontePresentation_(state,scene,sceneId) {
  const latest=state.narrative&&state.narrative.lastChoicePresentation;
  const effect=latest&&latest.destination===sceneId?latest.effect:null;
  const flags=state.flags||[];
  return {effect,groundFrozen:sceneId==='ACTE1_03_FAMILIER_1'&&flags.includes('react_givre'),
    iceStormAftermath:/^(ACTE3_03|LYRA_INDICE_1)/.test(sceneId)&&flags.includes('sauvetage_burst'),
    // Les compagnons ne gèlent que si le scénario affirme qu’ils sont immobilisés.
    frozenCharacter:sceneId==='ACTE3_06_REVEIL_TORDU'?(flags.includes('reve_poly')?'both':flags.includes('reve_O')?'Kaelen':flags.includes('reve_E')?'Alistair':null):null,
    ambience: /SIRENE|ENVOUTEMENT|RESISTANCE/.test(sceneId)?'wind': /AUBERGE|BIVOUAC|CAMPEMENT/.test(sceneId)?'fire': /FORET|MARCHE|NEIGE|TEMPETE/.test(sceneId)?'wind':'quiet'};
}

function serverGetExplorer() {
  applyRefonte_();
  return {version:BUILD_VERSION,backgrounds:Object.keys(REFONTE_BACKGROUND_NAMES).map(id=>({url:REFONTE_ART_BASE+id+'.webp',name:REFONTE_BACKGROUND_NAMES[id]})),scenes:[...Object.entries(DB).map(([id,s])=>[id,s,'classic']),...Object.entries(NGPLUS_DB).map(([id,s])=>[id,s,'ngplus'])].filter(([id])=>id!=='ERREUR_SCENE').map(([id,s,mode])=>({id,sceneNumber:s.sceneNumber||id,title:s.title||id,chapter:s.chapter||1,mode,end:!!s.isEnd,achievement:s.achievementId||null,choices:(s.choices||[]).map(c=>({key:c.key,text:c.text,next:c.next,conditional:!!(c.condition||c.requires)}))}))};
}
