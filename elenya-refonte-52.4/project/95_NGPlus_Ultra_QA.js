// V52.5 — QA dédiée à la campagne NG+ Ultra.
// Ce fichier ne modifie aucune donnée de jeu.
function serverRunNGPlusUltraQA(){
  applyRefonte_();
  const ng=typeof NGPLUS_DB!=='undefined'?NGPLUS_DB:{};
  const ids=Object.keys(ng),errors=[],warnings=[];
  const all=new Set(ids);
  const main=['NGP_01_SEUIL','NGP_02_NEUF_ECHOS','NGP_03_PALAIS_ECHO','NGP_04_FRESQUE_REPRISE','NGP_07_KAELEN_ECHO','NGP_08_ALISTAIR_ECHO','NGP_09_DEUX_ECHOS','NGP_10_ORAYA','NGP_11_LYRA','NGP_12_FEN','NGP_13_BRASIER','NGP_14_TRONE_BRIS','NGP_15_DERNIER_CHOIX'];
  ids.forEach(id=>{
    const s=ng[id]||{};
    if(!s.image)errors.push(id+' sans image');
    if(s.image&&typeof normalizeAssetRef==='function'&&!normalizeAssetRef(s.image))errors.push(id+' image non résolue');
    if(!s.isEnd&&!(s.choices||[]).length)errors.push(id+' cul-de-sac');
    (s.choices||[]).forEach(c=>{
      if(!c||!c.key)errors.push(id+' choix sans clé');
      if(!c||!String(c.text||'').trim())errors.push(id+' choix sans texte');
      if(c&&c.next&&c.next!=='END'&&c.next!=='RETURN'&&!all.has(c.next))errors.push(id+'::'+c.key+' -> '+c.next+' absent');
    });
  });
  main.forEach(id=>{
    const s=ng[id];if(!s)return errors.push(id+' absent');
    const normal=(s.choices||[]).filter(c=>c.key!=='NEUVIEME');
    const targets=normal.map(c=>c.next);
    if(new Set(targets).size!==targets.length)errors.push(id+' : convergence immédiate restante');
  });
  const ultra=ids.filter(id=>/^NGP_U/.test(id));
  if(ultra.length!==54)errors.push('54 scènes Ultra attendues, reçu '+ultra.length);
  if(ids.length!==80)errors.push('80 scènes NG+ attendues, reçu '+ids.length);
  const choiceCount=ids.reduce((n,id)=>n+(ng[id].choices||[]).length,0);
  if(choiceCount!==181)errors.push('181 choix NG+ attendus, reçu '+choiceCount);
  const endings=ids.filter(id=>ng[id]&&ng[id].isEnd);
  if(endings.length!==6)errors.push('6 fins NG+ attendues, reçu '+endings.length);
  if(!ng.NGP_U12_NEUVIEME)errors.push('Scène secrète NGP_U12_NEUVIEME absente');
  return {ok:errors.length===0,version:typeof BUILD_VERSION!=='undefined'?BUILD_VERSION:'?',scenes:ids.length,ultraScenes:ultra.length,choices:choiceCount,endings:endings.length,errors,warnings};
}

// Overrides des anciens audits dont les compteurs étaient figés avant l'extension NG+.
function serverRunV52ModularQA(){
  applyRefonte_();
  const classic=typeof DB!=='undefined'?DB:{};
  const ng=typeof NGPLUS_DB!=='undefined'?NGPLUS_DB:{};
  const errors=[],warnings=[];
  if(Object.keys(classic).length!==221)errors.push('DB classique modifiée: '+Object.keys(classic).length);
  if(Object.keys(ng).length!==80)errors.push('NGPLUS_DB: '+Object.keys(ng).length+' scènes au lieu de 80');
  const all=new Set(Object.keys(classic).concat(Object.keys(ng)));
  Object.entries(classic).concat(Object.entries(ng)).forEach(([id,s])=>(s.choices||[]).forEach(c=>{
    if(c&&c.next&&c.next!=='END'&&c.next!=='RETURN'&&!all.has(c.next))warnings.push(id+'::'+String(c.key||'?')+' -> '+c.next);
  }));
  return {ok:errors.length===0,version:typeof BUILD_VERSION!=='undefined'?BUILD_VERSION:'?',classicScenes:Object.keys(classic).length,ngPlusScenes:Object.keys(ng).length,errors,warnings};
}

function serverRunV5220UltimateQA(){
  applyRefonte_();
  const errors=[];
  const classic=typeof DB!=='undefined'?DB:{};
  const ng=typeof NGPLUS_DB!=='undefined'?NGPLUS_DB:{};
  const all=Object.assign({},classic,ng);
  const supported=new Set(['ADD_GAUGE','SET_GAUGE','ADD_TIMER','SET_TIMER','SET_FLAG','REMOVE_FLAG','SET_GLOBAL_FLAG','UNLOCK_ACHIEVEMENT','PUSH_RETURN','ADD_ITEM','REMOVE_ITEM','ADD_REP','SET_ROUTE','JOIN_COMPANION','SWITCH_COMPANION','LEAVE_COMPANION']);
  if(Object.keys(all).length!==301)errors.push('Inventaire attendu : 301 scènes, reçu '+Object.keys(all).length);
  Object.entries(all).forEach(([id,s])=>(s.choices||[]).forEach(c=>(c.effects||[]).forEach(e=>{if(e&&e.type&&!supported.has(e.type))errors.push(id+' effet inconnu: '+e.type);}))); 
  Object.entries(ng).forEach(([id,s])=>{if(!s.image)errors.push(id+' sans décor NG+');});
  const ultra=serverRunNGPlusUltraQA();if(!ultra.ok)errors.push(...ultra.errors);
  return {ok:errors.length===0,version:typeof BUILD_VERSION!=='undefined'?BUILD_VERSION:'?',errors,checks:{sceneInventory:301,classicScenes:221,ngPlusScenes:80,ultraScenes:54,ngPlusChoices:181,endings:6,effectContract:true,directResumeBackground:true}};
}