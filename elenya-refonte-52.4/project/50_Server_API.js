// ==========================================
// 5. FONCTIONS API GOOGLE APPS SCRIPT
// ==========================================

function serverProcessChoice(state, key) {
  const manager = new SceneManager(state || {});
  // V40.3.7 — payoff immédiat des choix de dialogue.
  // Un choix peut définir `response` sans créer une micro-scène artificielle.
  const sourceSceneId = manager.state.currentSceneId;
  const sourceSceneObj = manager.db[sourceSceneId];
  const selectedChoice = sourceSceneObj && Array.isArray(sourceSceneObj.choices)
    ? sourceSceneObj.choices.find(c => c.key === key)
    : null;

  const result = manager.processChoice(key);
  if (result.error) return {updatedState:manager.state,nextSceneData:manager.renderScene(sourceSceneId),error:result.error};
  const nextSceneId = result.nextScene;
  const sceneObj = manager.db[nextSceneId];

  if (sceneObj && sceneObj.isEnd && sceneObj.achievementId) {
    // V51 — mémoriser la dernière fin classique pour les variations du Cycle Brisé.
    if (manager.state.gameMode === 'classic' && /^FIN_/.test(String(nextSceneId || ''))) {
      manager.state.globalFlags = (manager.state.globalFlags || []).filter(f => !String(f).startsWith('last_classic_end:'));
      manager.state.globalFlags.push('last_classic_end:' + nextSceneId);
      manager._saveGlobals();
    }
    if (!manager.state.achievements.includes(sceneObj.achievementId)) {
      manager.state.achievements.push(sceneObj.achievementId);
      manager._saveGlobals();
    }
    if (sceneObj.achievementId === 'ach_fin_solo' && manager._deriveRoute() === 'solo') {
      if (!manager.state.achievements.includes('ach_solo_complet')) {
        manager.state.achievements.push('ach_solo_complet');
        manager._saveGlobals();
      }
    }
    const classicRequired = [
      'ach_fin_ombre','ach_fin_eclaireur','ach_fin_poly','ach_fin_solo',
      'ach_fin_reconciliation','ach_fin_hiver','ach_fin_sacrifice','ach_fin_mortelle','ach_fin_brisee'
    ];
    if (manager.state.gameMode === 'classic' && classicRequired.every(a => manager.state.achievements.includes(a)) && !manager.state.globalFlags.includes('ng_plus_unlocked')) {
      manager.state.globalFlags.push('ng_plus_unlocked');
      manager._saveGlobals();
    }
  }

  // Une nouvelle décision remplace l’écho précédent, y compris quand elle revient au même nœud.
  manager.state.narrative.lastChoiceResponse = null;
  const nextSceneData = manager.renderScene(nextSceneId);

  if (selectedChoice && selectedChoice.response && nextSceneData) {
    let responseText = "";
    try {
      if (typeof selectedChoice.response === 'function') {
        const gs = {
          gameMode: manager.state.gameMode,
          hasFlag: (f) => manager.state.flags.includes(f),
          hasGlobalFlag: (f) => manager.state.globalFlags.includes(f),
          getGauge: (g) => manager.state.gauges[g] || 0,
          hasItem: (id) => hasItem(manager.state, id),
          getRep: (faction) => getRep(manager.state, faction),
          hasOriginEnd: (endId) => Array.isArray(manager.state.ngPlus && manager.state.ngPlus.originEnds) && manager.state.ngPlus.originEnds.includes(endId),
          getLastClassicEnding: () => lastClassicEndingFromFlags(manager.state)
        };
        responseText = selectedChoice.response(gs) || "";
      } else {
        responseText = String(selectedChoice.response || "");
      }
    } catch (e) {
      responseText = "";
    }
    responseText = _parseDynamicText(responseText, manager.state);
    if (responseText.trim()) {
      nextSceneData.narrative = responseText.trim() + "\n\n" + (nextSceneData.narrative || "");
      nextSceneData.choiceResponse = responseText.trim();
      manager.state.narrative.lastChoiceResponse = {source:sourceSceneId, destination:manager.state.currentSceneId, text:responseText.trim()};
    }
  }

  if (selectedChoice && nextSceneData) {
    manager.state.narrative.lastChoicePresentation = {destination:manager.state.currentSceneId,effect:selectedChoice.presentationEffect||null};
    nextSceneData.presentation = refontePresentation_(manager.state, sceneObj, manager.state.currentSceneId);
  }
  return {
    nextSceneData: nextSceneData,
    updatedState: manager.state,
    choiceUX: selectedChoice ? {
      key: selectedChoice.key || null,
      intent: selectedChoice.intent || null,
      target: selectedChoice.target || null,
      feedback: selectedChoice.feedback || null,
      journal: selectedChoice.journal || null,
      importance: selectedChoice.importance || 'minor',
      irreversible: selectedChoice.irreversible === true
    } : null,
    error: result.error || null};
}

function serverGetPendingScene(state) {
  let globals = { globalFlags: [], achievements: [] };
  try {
    const globalsStr = PropertiesService.getUserProperties().getProperty('elenya_globals');
    if (globalsStr) globals = JSON.parse(globalsStr);
  } catch (e) {}
  state = normalizeGameState(state || {});
  state.sessionStartedAt = Date.now();
  state.achievements=Array.from(new Set([...(globals.achievements||[]),...state.achievements]));
  const hasLast=state.globalFlags.some(f=>String(f).startsWith('last_classic_end:'));
  state.globalFlags=Array.from(new Set([...(globals.globalFlags||[]).filter(f=>!hasLast||!String(f).startsWith('last_classic_end:')),...state.globalFlags]));
  const manager = new SceneManager(state);
  return manager.renderScene(state.currentSceneId);
}

function _saveKeyForMode(mode) {
  return mode === 'ngplus' ? 'elenya_state_ngplus' : 'elenya_state_classic';
}

function serverSaveGame(state) {
  let lock = null;
  try {
    if (typeof LockService !== 'undefined') { lock=LockService.getUserLock(); if(!lock.tryLock(1000))return {ok:false,error:'Une sauvegarde est déjà en cours. Réessaie.'}; }
    const normalized = normalizeGameState(state || {});
    const key = _saveKeyForMode(normalized.gameMode);
    const props=PropertiesService.getUserProperties(),raw=JSON.stringify(normalized);
    // Petits fragments UTF-16 : aucune propriété ne contient toute une longue partie.
    const generation=Date.now().toString(36)+'_'+Utilities.getUuid().replace(/[^a-z0-9]/gi,'');
    const previous=props.getProperty(key+'_manifest'),chunks=[];
    try {
      for(let i=0;i<raw.length;i+=1800){const name=key+'_chunk_'+generation+'_'+chunks.length;chunks.push(name);props.setProperty(name,raw.slice(i,i+1800));}
      props.setProperty(key+'_manifest',JSON.stringify({version:1,chunks:chunks,length:raw.length}));
    } catch(e) { chunks.forEach(k=>{try{props.deleteProperty(k)}catch(_){}});throw e; }
    // Le pointeur n'est remplacé qu'après l'écriture complète ; anciennes sauvegardes intactes.
    try { const old=JSON.parse(previous||'null');if(old&&Array.isArray(old.chunks))old.chunks.filter(k=>typeof k==='string'&&k.startsWith(key+'_chunk_')&&!chunks.includes(k)).forEach(k=>props.deleteProperty(k)); } catch(_) {}
    return { ok: true, version: BUILD_VERSION, mode: normalized.gameMode };
  } catch (e) {
    return { ok: false, error: String(e) };
  } finally { if(lock)lock.releaseLock(); }
}

function serverLoadGame(mode) {
  try {
    mode = mode === 'ngplus' ? 'ngplus' : 'classic';
    const key = _saveKeyForMode(mode);
    const props=PropertiesService.getUserProperties();
    let raw = null;
    const manifestRaw=props.getProperty(key+'_manifest');
    if(manifestRaw){
      const manifest=JSON.parse(manifestRaw);
      if(!Array.isArray(manifest.chunks)||manifest.version!==1)throw new Error('Index de sauvegarde invalide');
      raw=manifest.chunks.map(k=>{if(typeof k!=='string'||!k.startsWith(key+'_chunk_'))throw new Error('Fragment invalide');const part=props.getProperty(k);if(part===null)throw new Error('Sauvegarde incomplète');return part;}).join('');
      if(raw.length!==manifest.length)throw new Error('Sauvegarde tronquée');
    }
    if(!raw)raw=props.getProperty(key);
    if (!raw && mode === 'classic') raw = PropertiesService.getUserProperties().getProperty('elenya_state');
    if (!raw) return { ok: false, state: null };
    return { ok: true, state: normalizeGameState(JSON.parse(raw)) };
  } catch (e) {
    return { ok: false, state: null, error: String(e) };
  }
}

function serverGetMainMenu() {
  let globals = { globalFlags: [], achievements: [] };
  try {
    const raw = PropertiesService.getUserProperties().getProperty('elenya_globals');
    if (raw) globals = JSON.parse(raw);
  } catch (e) {}
  const required = [
    'ach_fin_ombre','ach_fin_eclaireur','ach_fin_poly','ach_fin_solo',
    'ach_fin_reconciliation','ach_fin_hiver','ach_fin_sacrifice','ach_fin_mortelle','ach_fin_brisee'
  ];
  const unlocked = required.every(a => (globals.achievements || []).includes(a));
  const classic = serverLoadGame('classic');
  const ngplus = serverLoadGame('ngplus');
  return {
    ngPlusUnlocked: unlocked,
    achievements: globals.achievements || [],
    globalFlags: globals.globalFlags || [],
    classicSave: classic.state || null,
    ngPlusSave: ngplus.state || null,
    classicEnds: required.filter(a => (globals.achievements || []).includes(a)).length,
    classicEndsRequired: required.length
  };
}

function serverStartNewGamePlus() {
  const menu = serverGetMainMenu();
  if (!menu.ngPlusUnlocked) return { ok: false, error: 'NEW GAME+ verrouillé. Terminez les 9 fins classiques requises.' };
  const state = normalizeGameState({
    gameMode: 'ngplus',
    currentSceneId: 'NGP_01_SEUIL',
    flags: ['ngplus_started'],
    globalFlags: menu.globalFlags || [],
    achievements: menu.achievements || [],
    gauges: { instabilite: 0, affinite_ombre: 0, affinite_eclaireur: 0, lien_O: 0, lien_E: 0, possession: 0, memoire_kalthar: 0, volonte: 5, presence_O: 0, presence_E: 0, presence_S: 0, distance_O: 5, distance_E: 5, tension_triangle: 0 },
    timers: {},
    inventory: [],
    reputation: {},
    quests: {},
    stats: { choicesMade: 0, playTime: 0 },
    ngPlus: { cycle: 1, echoes: [], originEnds: requiredClassicEndings_(menu.achievements || []) },
    narrative: { relationshipStyle:{O:'distance',E:'distance'}, echoes:[], echoCounts:{}, endingSeeds:{} }
  });
  PropertiesService.getUserProperties().setProperty('elenya_state_ngplus', JSON.stringify(state));
  return { ok: true, state: state };
}

function requiredClassicEndings_(achievements) {
  const required = [
    'ach_fin_ombre','ach_fin_eclaireur','ach_fin_poly','ach_fin_solo',
    'ach_fin_reconciliation','ach_fin_hiver','ach_fin_sacrifice','ach_fin_mortelle','ach_fin_brisee'
  ];
  return required.filter(a => achievements.includes(a));
}

function serverResetRun(mode) {
  const key = _saveKeyForMode(mode === 'ngplus' ? 'ngplus' : 'classic');
  try {
    const props=PropertiesService.getUserProperties();
    const raw=props.getProperty(key+'_manifest');
    props.deleteProperty(key+'_manifest');
    if(raw){try{const old=JSON.parse(raw);(old.chunks||[]).filter(k=>typeof k==='string'&&k.startsWith(key+'_chunk_')).forEach(k=>props.deleteProperty(k));}catch(_){}}
    props.deleteProperty(key);
    if (mode !== 'ngplus') PropertiesService.getUserProperties().deleteProperty('elenya_state');
    return { ok: true };
  } catch (e) { return { ok: false, error: String(e) }; }
}

function _validateSceneDatabase(db, prefix='') {
  const keys = Object.keys(db || {}), missing=[], deadEnds=[], placeholders=[];
  keys.forEach(id=>{
    const scene=db[id]||{}, choices=Array.isArray(scene.choices)?scene.choices:[];
    if(!scene.isEnd && choices.length===0) deadEnds.push(prefix+id);
    choices.forEach(c=>{ if(c.next && c.next!=='RETURN' && c.next!=='END' && !db[c.next]) missing.push(prefix+id+' -> '+c.next); });
    ['image','transitionGif','sprite','spriteLeft','spriteRight'].forEach(k=>{ const v=scene[k]; if(typeof v==='string' && AAA_ASSET_PLACEHOLDER_RE.test(v)) placeholders.push(prefix+id+'.'+k+'='+v); });
  });
  return {keys,missing,deadEnds,placeholders};
}
function serverValidateDatabase() {
  applyRefonte_();
  const classic=_validateSceneDatabase(typeof DB!=='undefined'?DB:{},'CLASSIC:');
  const ng=_validateSceneDatabase(typeof NGPLUS_DB!=='undefined'?NGPLUS_DB:{},'NG+:');
  return {
    version:BUILD_VERSION,
    scenes:classic.keys.length,
    ngPlusScenes:ng.keys.length,
    sceneNumbers:[...new Set(classic.keys.map(k=>(DB[k]||{}).sceneNumber||k))].length,
    ngPlusSceneNumbers:[...new Set(ng.keys.map(k=>(NGPLUS_DB[k]||{}).sceneNumber||k))].length,
    missing:[...classic.missing,...ng.missing],
    deadEnds:[...classic.deadEnds,...ng.deadEnds],
    placeholders:[...classic.placeholders,...ng.placeholders]
  };
}

function serverResetGame() {
  return {classic:serverResetRun('classic'),ngplus:serverResetRun('ngplus')};
}

function serverGetNarrativeMeta(state) {
  const s = normalizeGameState(state || {});
  return {
    relationship: s.narrative.relationshipStyle,
    echoes: s.narrative.echoes.slice(-12),
    endingSeeds: s.narrative.endingSeeds,
    gameMode: s.gameMode,
    cycle: s.ngPlus.cycle || 0
  };
}

function serverGetGlobalFlags() {
  try {
    const globalsStr = PropertiesService.getUserProperties().getProperty('elenya_globals');
    if (!globalsStr) return [];
    const globals = JSON.parse(globalsStr);
    return globals.globalFlags || [];
  } catch (e) {
    return [];
  }
}

// ==========================================
// 5B. QA / DIAGNOSTICS AAA FINAUX
// ==========================================
function serverGetBuildInfo() {
  applyRefonte_();
  const db = typeof DB !== 'undefined' ? DB : {};
  const ids = Object.keys(db);
  const sceneNumbers = ids.map(id => db[id] && db[id].sceneNumber).filter(Boolean);
  return {
    version: BUILD_VERSION,
    engine: ENGINE_LABEL,
    sceneKeys: ids.length,
    uniqueSceneNumbers: [...new Set(sceneNumbers)].length,
    schemaVersion: SCHEMA_VERSION,
    generatedAt: new Date().toISOString()
  };
}

function serverRunAAAHealthCheck() {
  const db = typeof DB !== 'undefined' ? DB : {};
  const ids = Object.keys(db);
  const idSet = new Set(ids);
  const sceneNumbers = ids.map(id => db[id] && db[id].sceneNumber).filter(Boolean);
  const duplicates = [];
  const seen = {};
  sceneNumbers.forEach(n => { seen[n] = (seen[n] || 0) + 1; });
  Object.keys(seen).forEach(n => { if (seen[n] > 1) duplicates.push({ sceneNumber:n, count:seen[n] }); });
  const missing = [], deadEnds = [], invalidReturns = [], referenced = new Set(['ACTE1_01_REVEIL']);
  ids.forEach(id => {
    const s = db[id] || {};
    const choices = Array.isArray(s.choices) ? s.choices : [];
    if (!s.isEnd && choices.length === 0) deadEnds.push(id);
    choices.forEach(c => {
      if (!c || !c.next) return;
      if (c.next === 'RETURN') {
        if (!s.returnsAllowed && !s.sceneNumber && !id) invalidReturns.push(id);
        return;
      }
      if (c.next === 'END') return;
      referenced.add(c.next);
      if (!idSet.has(c.next)) missing.push(id + ' -> ' + c.next);
    });
  });
  const triggerTargets = (typeof TRIGGERS !== 'undefined' ? TRIGGERS : []).map(t => t.interceptToScene).filter(Boolean);
  const triggerMissing = triggerTargets.filter(t => !idSet.has(t));
  triggerTargets.forEach(t => referenced.add(t));
  const neverReferenced = ids.filter(id => !referenced.has(id) && id !== 'ERREUR_SCENE');
  const placeholders = [];
  ids.forEach(id => {
    const s=db[id]||{};
    ['image','transitionGif','sprite','spriteLeft','spriteRight'].forEach(k=>{
      const v=s[k];
      if (typeof v === 'string' && AAA_ASSET_PLACEHOLDER_RE.test(v) && k !== 'voice') placeholders.push(id+'.'+k+'='+v);
    });
  });
  return {
    ok: missing.length===0 && triggerMissing.length===0 && deadEnds.length===0 && duplicates.length===0,
    version:BUILD_VERSION, sceneKeys:ids.length, uniqueSceneNumbers:[...new Set(sceneNumbers)].length,
    duplicateSceneNumbers:duplicates, missingTransitions:missing, missingTriggerTargets:triggerMissing,
    deadEnds, neverReferenced, placeholders
  };
}

// ==========================================
// 6. BASE DE DONNÉES DES SCÈNES (INTÉGRALE V50.1 — legacy migré)
// ==========================================
// ==========================================
// 6. BASE DE DONNÉES DES SCÈNES (INTÉGRALE)
// ==========================================
