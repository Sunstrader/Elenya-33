function ensureArray(obj, key) {
  if (!Array.isArray(obj[key])) obj[key] = [];
  return obj[key];
}

function clampNumber(v, min, max) {
  const n = Number(v);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

const AAA_GAUGE_LIMITS = {
  instabilite: [0, 60], affinite_ombre: [0, 20], affinite_eclaireur: [0, 20],
  lien_O: [0, 20], lien_E: [0, 20], possession: [0, 30],
  memoire_kalthar: [0, 20], volonte: [0, 15],
  presence_O: [0, 12], presence_E: [0, 12], presence_S: [0, 15],
  distance_O: [0, 20], distance_E: [0, 20], tension_triangle: [0, 20]
};


// =============================================================================
// V36 — COEUR NARRATIF / ÉCHOS / RELATIONS COMPORTEMENTALES
// =============================================================================
const RELATIONSHIP_STYLES = {
  O: { distant:'distance', tense:'tension', warm:'attachement', deep:'confiance', possessive:'possession' },
  E: { distant:'distance', tense:'doute', warm:'devotion', deep:'confiance', possessive:'cage' }
};

function ensureNarrativeState(state) {
  if (!state.narrative || typeof state.narrative !== 'object') state.narrative = {};
  if (!state.narrative.relationshipStyle) state.narrative.relationshipStyle = { O:'distance', E:'distance' };
  if (!Array.isArray(state.narrative.echoes)) state.narrative.echoes = [];
  if (!state.narrative.echoCounts || typeof state.narrative.echoCounts !== 'object') state.narrative.echoCounts = {};
  if (!state.narrative.endingSeeds || typeof state.narrative.endingSeeds !== 'object') state.narrative.endingSeeds = {};
  return state.narrative;
}

function deriveRelationshipStyle(state, route) {
  const n = ensureNarrativeState(state);
  const g = state.gauges || {};
  const lien = Number(g[route === 'O' ? 'lien_O' : 'lien_E'] || 0);
  const dist = Number(g[route === 'O' ? 'distance_O' : 'distance_E'] || 0);
  const possession = Number(g.possession || 0);
  const volonte = Number(g.volonte || 0);
  let style = 'distance';
  if (possession >= 15 && lien >= 7) style = RELATIONSHIP_STYLES[route].possessive;
  else if (lien >= 11 && volonte >= 7 && dist <= 10) style = RELATIONSHIP_STYLES[route].deep;
  else if (lien >= 6 && dist <= 14) style = RELATIONSHIP_STYLES[route].warm;
  else if (lien >= 3) style = RELATIONSHIP_STYLES[route].tense;
  n.relationshipStyle[route] = style;
  return style;
}



// =============================================================================
// V50.1 — ARCHITECTURE GELÉE : MODE / ROUTE / ROMANCE
// =============================================================================
function isNGPlusState(gs) {
  return !!gs && gs.gameMode === 'ngplus';
}
function isClassicState(gs) {
  return !isNGPlusState(gs);
}
function canEnterPoly(state) {
  if (!state || !Array.isArray(state.flags)) return false;
  return state.flags.includes('poly_active') || state.flags.includes('ngplus_route_both') || state.flags.includes('ngplus_truce');
}
function markRelationshipApproach(state, route) {
  if (!state.flags) state.flags = [];
  const r = String(route || '').toUpperCase();
  if (r === 'O') {
    if (!state.flags.includes('relation_O_ouverte_acte1')) state.flags.push('relation_O_ouverte_acte1');
    state.gauges.presence_O = Math.max(0, Number(state.gauges.presence_O || 0) + 1);
  }
  if (r === 'E') {
    if (!state.flags.includes('relation_E_ouverte_acte1')) state.flags.push('relation_E_ouverte_acte1');
    state.gauges.presence_E = Math.max(0, Number(state.gauges.presence_E || 0) + 1);
  }
}
function enforceCompanionExclusivity(state) {
  if (!state || !Array.isArray(state.flags)) return;
  const f = state.flags;
  const o = f.includes('avec_ombre');
  const e = f.includes('avec_eclaireur');
  const polyAllowed = canEnterPoly(state);
  if (o && e && !polyAllowed) {
    // Une relation secondaire peut être ouverte sans devenir le compagnon actif.
    // On conserve les traces relationnelles, mais un seul compagnon reste "avec" Elenya.
    const route = String(state.route || '');
    if (route === 'eclaireur') {
      state.flags.splice(state.flags.indexOf('avec_ombre'), 1);
    } else {
      state.flags.splice(state.flags.indexOf('avec_eclaireur'), 1);
    }
  }
  state.route = o && e && polyAllowed ? 'poly' : o ? 'ombre' : e ? 'eclaireur' : 'solo';
}

function updateRelationshipIntegrity(state) {
  ensureNarrativeState(state);
  const g = state.gauges || {};
  const O = Number(g.lien_O||0), E = Number(g.lien_E||0);
  const V = Number(g.volonte||0), P = Number(g.possession||0);
  // Le Poly exige désormais une volonté de liberté minimale : aimer deux personnes
  // ne doit pas automatiquement signifier les posséder toutes les deux.
  if (O >= 7 && E >= 7 && V >= 8 && P <= 14) state.flags = Array.from(new Set([...(state.flags||[]),'poly_eligible']));
  else state.flags = (state.flags||[]).filter(x => x !== 'poly_eligible');
  if (O >= 10 && V >= 7 && P <= 10) state.flags = Array.from(new Set([...(state.flags||[]),'kaelen_amour_libre']));
  if (E >= 10 && V >= 7 && P <= 10) state.flags = Array.from(new Set([...(state.flags||[]),'alistair_foi_libre']));
  deriveRelationshipStyle(state,'O');
  deriveRelationshipStyle(state,'E');
}

function normalizeV50State(state) {
  state.version = Math.max(Number(state.version||0), 39);
  if (!state.gameMode) state.gameMode = 'classic';
  if (state.gameMode !== 'ngplus') state.gameMode = 'classic';
  if (!state.narrative) ensureNarrativeState(state);
  if (!state.ngPlus) state.ngPlus = {cycle:0, echoes:[], originEnds:[]};
  if (!state.gauges) state.gauges = {};
  if (!Array.isArray(state.flags)) state.flags = [];
  enforceCompanionExclusivity(state);
  updateRelationshipIntegrity(state);
  recomputeNarrativeSeeds(state);
  return state;
}
function recomputeNarrativeSeeds(state) {
  ensureNarrativeState(state);
  const g = state.gauges || {}, f = state.flags || [];
  const O = Number(g.lien_O||0), E = Number(g.lien_E||0), P = Number(g.possession||0), V = Number(g.volonte||0), M = Number(g.memoire_kalthar||0), I = Number(g.instabilite||0);
  state.narrative.endingSeeds = {
    shadow: O + Number(g.affinite_ombre||0),
    light: E + Number(g.affinite_eclaireur||0),
    poly: O + E + Number(g.tension_triangle||0),
    freedom: V + Number(g.presence_S||0),
    possession: P + I,
    truth: M + Number(getRep(state,'culte')||0) + Number(getRep(state,'village')||0),
    sacrifice: Number(f.includes('ngplus_trone_sacrifice'))*6 + I,
    reconciliation: V + Number(f.includes('ngplus_truce'))*4 + Number(f.includes('oraya_pardonne'))*3,
    corona: I + M
  };
  deriveRelationshipStyle(state,'O');
  deriveRelationshipStyle(state,'E');
  return state.narrative.endingSeeds;
}

function recordNarrativeEcho(state, echoId, label) {
  const n = ensureNarrativeState(state);
  if (!echoId) return;
  n.echoCounts[echoId] = Number(n.echoCounts[echoId] || 0) + 1;
  n.echoes.push({ id:echoId, label:label || echoId, scene:state.currentSceneId, ts:Date.now() });
  if (n.echoes.length > 40) n.echoes.splice(0, n.echoes.length - 40);
}

function inferChoiceEchoes(state, choice) {
  if (!choice) return;
  const key = String(choice.key || '').toUpperCase();
  const target = String(choice.target || '').trim().toLowerCase();
  const effects = Array.isArray(choice.effects) ? choice.effects : [];
  const add = (id,label)=>recordNarrativeEcho(state,id,label);

  // V51.7.6 — métadonnée sémantique d'abord ; clé legacy uniquement en fallback.
  const targetKaelen = /^(kaelen|ombre|o)$/.test(target) || /\bkaelen\b/.test(target);
  const targetAlistair = /^(alistair|eclaireur|e)$/.test(target) || /\balistair\b/.test(target);
  if (targetKaelen) add('kaelen_attention','Kaelen — attention');
  if (targetAlistair) add('alistair_attention','Alistair — attention');

  if (!target) {
    if (/KAELEN|OMBRE|(?:^|_)O(?:_|$)|APPROCHER_O/.test(key)) add('kaelen_attention','Kaelen — attention');
    if (/ALISTAIR|ECLAIREUR|(?:^|_)E(?:_|$)|APPROCHER_E/.test(key)) add('alistair_attention','Alistair — attention');
  }

  effects.forEach(e=>{
    if (!e) return;
    if (e.type === 'ADD_GAUGE' && Number(e.value||0) > 0) {
      if (e.target === 'lien_O') add('kaelen_closeness','Lien avec Kaelen');
      if (e.target === 'lien_E') add('alistair_closeness','Lien avec Alistair');
      if (e.target === 'memoire_kalthar') add('kalthar_memory','Mémoire de Kalthar');
      if (e.target === 'volonte') add('elenya_freedom','Volonté d’Elenya');
      if (e.target === 'possession') add('possession','Possession');
      if (e.target === 'instabilite') add('storm','Instabilité');
    }
    if (e.type === 'SET_FLAG' && /pardon|liber|truce|detruit|bris/i.test(String(e.target||''))) add('liberation_choice','Choix de libération');
  });
}

function latestNarrativeEcho(state) {
  const n = ensureNarrativeState(state);
  return n.echoes.length ? n.echoes[n.echoes.length - 1] : null;
}

const BUILD_VERSION = '52.4.3-free-voice';
const SCHEMA_VERSION = 50;
const ENGINE_LABEL = 'Corona Glacialis — V52.4.3-free-voice · Refonte en validation';

const V50_LEGACY_SCENE_ID_MAP = Object.freeze({
  "ACTE1_07": "ACTE1_07_RETROUVAILLES",
  "ACTE1_08": "ACTE1_08_SECRET",
  "ACTE1_08B": "ACTE1_08B_BIVOUAC_LISIERE",
  "ACTE2_03": "ACTE2_03_BIVOUAC_AUTOMNE",
  "ACTE2_05": "ACTE2_05_ARRIVEE_AUBERGE",
  "ACTE2_06": "ACTE2_06_NUIT_AUBERGE",
  "ACTE2_06B": "ACTE2_06B_LENDEMAIN_CONFIDENCE",
  "ACTE2_08": "ACTE2_08_MATIN_AUBERGE",
  "ACTE2_10": "ACTE2_10_RIVIERE_CRISTAL",
  "ACTE2_12": "ACTE2_12_NUIT_ISOLEE",
  "ACTE3_01F": "ACTE3_01_FRONTIERE_1",
  "ACTE3_03": "ACTE3_03_LA_SIRENE",
  "ACTE3_03B": "ACTE3_03B_RESISTANCE",
  "ACTE3_08": "ACTE3_08_MISE_AU_POINT",
  "ACTE3_09": "ACTE3_09_VILLAGE_CACHE",
  "ACTE3_09B": "ACTE3_09B_BIVOUAC_TEMPETE",
  "ACTE3_10": "ACTE3_10_ACCUEIL_CULTE_1",
  "ACTE3_12": "ACTE3_12_AUTEL_KALTHAR",
  "ACTE3_13": "ACTE3_13_ARTEFACT",
  "ACTE4_05": "ACTE4_05_ARRIVEE_PORTES_1",
  "ACTE4_06": "ACTE4_06_MASQUE_TOMBE_1",
  "ACTE4_07": "ACTE4_07_ADIEU_KALTHAR",
  "ACTE4_08": "ACTE4_08_CORRIDOR_OBSIDIENNE",
  "L_MARCHE_1": "LIEN_MARCHE_1",
  "L_MARCHE_2": "LIEN_MARCHE_2"
});

function migrateLegacySceneId(sceneId) {
  return V50_LEGACY_SCENE_ID_MAP[String(sceneId || '')] || sceneId;
}

function normalizeGameState(state) {
  // V50.1 Clean Gold Master migration / coherence pass
  state = state || {};
  if (!state || typeof state !== 'object') state = {};
  ensureArray(state, 'flags');
  ensureArray(state, 'globalFlags');
  ensureArray(state, 'achievements');
  ensureArray(state, 'returnStack');
  ensureArray(state, 'choiceHistory');
  ensureArray(state, 'sceneHistory');
  ensureArray(state, 'triggerHistory');
  if (!state.gauges || typeof state.gauges !== 'object') state.gauges = {};
  const defaults = {
    instabilite:0, affinite_ombre:0, affinite_eclaireur:0, lien_O:0, lien_E:0,
    possession:0, memoire_kalthar:0, volonte:0, presence_O:0, presence_E:0, presence_S:0,
    distance_O:0, distance_E:0, tension_triangle:0
  };
  Object.keys(defaults).forEach(k => {
    if (state.gauges[k] === undefined || state.gauges[k] === null) state.gauges[k] = defaults[k];
    const lim = AAA_GAUGE_LIMITS[k];
    state.gauges[k] = clampNumber(state.gauges[k], lim[0], lim[1]);
  });
  if (!state.timers || typeof state.timers !== 'object') state.timers = {};
  ['blessure','venin','colere_ordre','avance_veyra','dette_kaelen'].forEach(k => {
    if (state.timers[k] === undefined) state.timers[k] = -1;
  });
  if (!Array.isArray(state.inventory)) state.inventory = [];
  if (!state.reputation || typeof state.reputation !== 'object') state.reputation = {};
  ['ordre','culte','ombre','village'].forEach(k => {
    state.reputation[k] = clampNumber(state.reputation[k] === undefined ? 0 : state.reputation[k], -20, 20);
  });
  if (!state.quests || typeof state.quests !== 'object') state.quests = {};
  if (!state.stats || typeof state.stats !== 'object') state.stats = {};
  state.stats.choicesMade = Math.max(0, Number(state.stats.choicesMade) || 0);
  state.stats.playTime = Math.max(0, Number(state.stats.playTime) || 0);
  if (!state.sessionStartedAt) state.sessionStartedAt = Date.now();
  if (!state.gameMode) state.gameMode = 'classic';
  if (state.gameMode !== 'classic' && state.gameMode !== 'ngplus') state.gameMode = 'classic';
  ensureNarrativeState(state);
  if (!state.ngPlus) state.ngPlus = { cycle: 0, echoes: [], originEnds: [] };
  if (!Array.isArray(state.ngPlus.echoes)) state.ngPlus.echoes = [];
  if (!Array.isArray(state.ngPlus.originEnds)) state.ngPlus.originEnds = [];
  if (!state.currentSceneId) state.currentSceneId = state.gameMode === 'ngplus' ? 'NGP_01_SEUIL' : 'ACTE1_01_REVEIL';
  state.currentSceneId = migrateLegacySceneId(state.currentSceneId);
  if (state.gameMode === 'ngplus') state.ngPlus.cycle = Math.max(1, Number(state.ngPlus.cycle) || 1);
  normalizeV50State(state);
  state.schemaVersion = SCHEMA_VERSION;
  return state;
}

function pushUnique(arr, value, max) {
  if (!Array.isArray(arr) || !value) return;
  if (!arr.includes(value)) arr.push(value);
  if (max && arr.length > max) arr.splice(0, arr.length - max);
}

// ==========================================
// 4. CLASSE SCENEMANAGER V27
// ==========================================
