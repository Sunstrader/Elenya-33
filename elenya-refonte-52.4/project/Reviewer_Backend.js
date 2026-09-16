/**
 * ELENYA FROST — REVIEWER BACKEND V3
 * À ajouter dans le MÊME projet Google Apps Script que le moteur actuel.
 *
 * Principe :
 * - lit directement DB + NGPLUS_DB du moteur déjà présent ;
 * - aucun .gs à charger côté invité ;
 * - enregistre automatiquement les retours dans un Google Sheet central ;
 * - chaque retour invité reste "À VÉRIFIER" côté propriétaire ;
 * - une nouvelle modification après validation passe automatiquement à "À REVALIDER".
 */

const ELENYA_REVIEWER = Object.freeze({
  APP_VERSION: '4.0.0-visual-path-history',
  AGENT_API_VERSION: '1.1.0',
  AGENT_ACCESS_PROPERTY: 'ELENYA_REVIEWER_AGENT_ACCESS_V1',
  SHEET_ID_PROPERTY: 'ELENYA_REVIEWER_SHEET_ID',
  SPREADSHEET_NAME: 'ELENYA FROST — Retours testeurs',
  REVIEWS_SHEET: 'Reviews',
  GUESTS_SHEET: 'Guests',
  REVIEW_HEADERS: [
    'KEY', 'DATASET', 'BUILD_VERSION', 'GUEST_ID', 'GUEST_NAME', 'GUEST_PROFILE', 'CONTACT',
    'SCENE_ID', 'SCENE_TITLE', 'ACT', 'STATUS', 'SCORE', 'TAGS', 'GENERAL_NOTE',
    'CONTINUITY', 'ROMANCE', 'MECHANICS', 'VISUAL', 'REWRITE', 'CHOICES_JSON',
    'CONTENT_HASH', 'GUEST_UPDATED_AT', 'SERVER_UPDATED_AT', 'VERIFICATION',
    'OWNER_DECISION', 'OWNER_NOTES'
  ],
  GUEST_HEADERS: [
    'GUEST_ID', 'GUEST_NAME', 'GUEST_PROFILE', 'CONTACT', 'CREATED_AT', 'LAST_SEEN_AT'
  ]
});

function reviewerSetup() {
  const ss = reviewerEnsureSpreadsheet_();
  const base = ScriptApp.getService().getUrl() || '';
  return {
    ok: true,
    spreadsheetUrl: ss.getUrl(),
    guestUrl: base ? base + '?review=guest' : '',
    appVersion: ELENYA_REVIEWER.APP_VERSION,
    buildVersion: reviewerBuildVersion_()
  };
}

function reviewerGetOwnerInfo() {
  const ss = reviewerEnsureSpreadsheet_();
  const base = ScriptApp.getService().getUrl() || '';
  return {
    spreadsheetUrl: ss.getUrl(),
    guestUrl: base ? base + '?review=guest' : '',
    buildVersion: reviewerBuildVersion_(),
    appVersion: ELENYA_REVIEWER.APP_VERSION
  };
}

/**
 * REVIEWER API AGENT V3.3 — lecture + écriture sécurisée par jeton.
 *
 * GET public:
 *   /exec?review=api
 *   /exec?review=api&scene=ACTE1_01_REVEIL
 *   /exec?review=api&full=1
 *   /exec?review=api&capabilities=1
 *
 * POST authentifié:
 *   /exec?review=api
 *   body JSON: { action:"submit", agentId:"agent-grok", token:"...", sceneId:"...", annotation:{...} }
 *
 * Le jeton n'est jamais exposé par une route publique. Il est généré par le
 * propriétaire depuis l'éditeur Apps Script via reviewerCreateGrokApiAccess().
 */
function reviewerApiGet_(e) {
  const params = (e && e.parameter) || {};
  const action = reviewerClean_(params.action || '', 40).toLowerCase();

  // V3.4 — secours d'écriture par GET pour les clients IA qui ne savent pas
  // suivre correctement la redirection POST de ContentService.
  // Cette route utilise une clé WRITE-ONLY distincte du token POST principal.
  if (action === 'submit' || action === 'report') {
    return reviewerJsonOutput_(reviewerApiGetSubmit_(e));
  }
  if (action === 'load') {
    return reviewerJsonOutput_(reviewerApiGetLoad_(e));
  }
  if (action === 'ping') {
    return reviewerJsonOutput_({
      ok:true, action:'ping', transport:'GET',
      apiVersion:ELENYA_REVIEWER.AGENT_API_VERSION,
      appVersion:ELENYA_REVIEWER.APP_VERSION,
      buildVersion:reviewerBuildVersion_(),
      serverTime:new Date().toISOString()
    });
  }

  const scenes = reviewerBuildCatalog_();
  const buildVersion = reviewerBuildVersion_();
  const datasetId = reviewerDatasetId_(buildVersion, scenes);
  const sceneId = reviewerClean_(params.scene || params.sceneId || '', 180);
  const full = String(params.full || '') === '1';
  const capabilities = String(params.capabilities || '') === '1' ||
    action === 'capabilities';
  let payload;

  if (capabilities) {
    payload = reviewerApiCapabilities_(buildVersion, datasetId, scenes.length);
  } else if (sceneId) {
    const scene = scenes.find(function(s) { return String(s.id) === sceneId; }) || null;
    payload = scene
      ? {ok:true, mode:'scene', apiVersion:ELENYA_REVIEWER.AGENT_API_VERSION,
          appVersion:ELENYA_REVIEWER.APP_VERSION, buildVersion:buildVersion,
          datasetId:datasetId, scene:scene}
      : {ok:false, mode:'scene', apiVersion:ELENYA_REVIEWER.AGENT_API_VERSION,
          appVersion:ELENYA_REVIEWER.APP_VERSION, buildVersion:buildVersion,
          datasetId:datasetId, error:'SCENE_NOT_FOUND', sceneId:sceneId};
  } else if (full) {
    payload = {
      ok:true, mode:'full', apiVersion:ELENYA_REVIEWER.AGENT_API_VERSION,
      appVersion:ELENYA_REVIEWER.APP_VERSION, buildVersion:buildVersion,
      datasetId:datasetId, sceneCount:scenes.length, scenes:scenes,
      generatedAt:new Date().toISOString()
    };
  } else {
    payload = {
      ok:true, mode:'index', apiVersion:ELENYA_REVIEWER.AGENT_API_VERSION,
      appVersion:ELENYA_REVIEWER.APP_VERSION, buildVersion:buildVersion,
      datasetId:datasetId, sceneCount:scenes.length,
      scenes:scenes.map(function(s) {
        return {
          id:s.id, sceneNumber:s.sceneNumber, chapter:s.chapter, act:s.act, campaign:s.campaign,
          title:s.title, mood:s.mood, choiceCount:Array.isArray(s.choices) ? s.choices.length : 0
        };
      }),
      usage:{
        scene:'?review=api&scene=ACTE1_01_REVEIL',
        full:'?review=api&full=1',
        capabilities:'?review=api&capabilities=1',
        write:'POST /exec?review=api ; secours IA: GET ?review=api&action=submit&agentId=...&key=...&sceneId=...&status=...&notes=...'
      },
      generatedAt:new Date().toISOString()
    };
  }

  return reviewerJsonOutput_(payload);
}

function reviewerApiCapabilities_(buildVersion, datasetId, sceneCount) {
  return {
    ok:true,
    mode:'capabilities',
    apiVersion:ELENYA_REVIEWER.AGENT_API_VERSION,
    appVersion:ELENYA_REVIEWER.APP_VERSION,
    buildVersion:buildVersion,
    datasetId:datasetId,
    sceneCount:sceneCount,
    read:{
      index:'GET ?review=api',
      scene:'GET ?review=api&scene=SCENE_ID',
      full:'GET ?review=api&full=1'
    },
    write:{
      endpoint:'POST ?review=api',
      authentication:'agentId + token dans le corps JSON',
      actions:['submit','batch','load','ping'],
      batchLimit:25,
      getFallback:{
        endpoint:'GET ?review=api&action=submit',
        authentication:'agentId + clé URL write-only',
        actions:['submit','load','ping'],
        note:'Secours pour clients qui gèrent mal la redirection POST ContentService. Une seule scène par requête GET.',
        directFields:['sceneId','status','score','tags','notes','continuity','romance','mechanics','visual','rewrite','choiceKey','choiceStatus','choiceNote'],
        payload:'payload peut contenir un JSON URL-encodé; data peut contenir ce même JSON en base64url.'
      },
      verification:'Tous les rapports IA sont enregistrés À VÉRIFIER.',
      submitSchema:{
        action:'submit',
        agentId:'agent-grok',
        token:'SECRET_FOURNI_PAR_LE_PROPRIETAIRE',
        sceneId:'ACTE1_01_REVEIL',
        annotation:{
          status:'review | issue | blocker | ok | none',
          score:'1..5 facultatif',
          tags:'texte facultatif',
          notes:'remarque générale',
          continuity:'continuité / logique temporelle',
          romance:'romance / relations',
          mechanics:'flags / jauges / mécanique',
          visual:'visuels / UX',
          rewrite:'réécriture proposée',
          choices:{
            CHOICE_KEY:{status:'review | issue | blocker | ok | none', note:'remarque'}
          }
        }
      }
    }
  };
}


/**
 * V3.4 — écriture de secours via GET.
 *
 * IMPORTANT :
 * - la clé `key` est WRITE-ONLY et distincte du token POST principal ;
 * - les rapports restent "À VÉRIFIER" ;
 * - le endpoint ne peut ni modifier le moteur ni valider un rapport propriétaire ;
 * - une requête = une scène, pour rester sous les limites d'URL.
 */
function reviewerApiGetSubmit_(e) {
  try {
    const params = (e && e.parameter) || {};
    const auth = reviewerApiAuthorizeUrlWriter_(params);
    if (!auth.ok) {
      return {
        ok:false, action:'submit', transport:'GET',
        error:'UNAUTHORIZED',
        message:'agentId ou clé write-only invalide.'
      };
    }

    if (!reviewerApiRateLimit_(auth.agentId)) {
      return {
        ok:false, action:'submit', transport:'GET',
        error:'RATE_LIMIT',
        message:'Trop de requêtes API. Réessaie dans environ une minute.'
      };
    }

    const body = reviewerApiGetBodyFromParams_(params);
    const result = reviewerApiSubmitOne_(auth, body);
    result.transport = 'GET_FALLBACK';
    return result;
  } catch (err) {
    return {
      ok:false, action:'submit', transport:'GET',
      error:'API_ERROR',
      message:String(err && err.message ? err.message : err)
    };
  }
}

function reviewerApiGetLoad_(e) {
  try {
    const params = (e && e.parameter) || {};
    const auth = reviewerApiAuthorizeUrlWriter_(params);
    if (!auth.ok) {
      return {
        ok:false, action:'load', transport:'GET',
        error:'UNAUTHORIZED',
        message:'agentId ou clé write-only invalide.'
      };
    }
    const scenes = reviewerBuildCatalog_();
    const buildVersion = reviewerBuildVersion_();
    const datasetId = reviewerDatasetId_(buildVersion, scenes);
    return {
      ok:true, action:'load', transport:'GET_FALLBACK',
      agentId:auth.agentId, buildVersion:buildVersion,
      datasetId:datasetId,
      annotations:reviewerLoadAnnotations_(auth.agentId, datasetId)
    };
  } catch (err) {
    return {
      ok:false, action:'load', transport:'GET',
      error:'API_ERROR',
      message:String(err && err.message ? err.message : err)
    };
  }
}

function reviewerApiGetBodyFromParams_(params) {
  params = params || {};
  let parsed = {};

  // 1) JSON URL-encodé classique.
  if (params.payload) {
    try {
      parsed = JSON.parse(String(params.payload));
    } catch (err) {
      throw new Error('payload JSON invalide.');
    }
  }

  // 2) JSON base64url, pratique pour les caractères spéciaux.
  if ((!parsed || !Object.keys(parsed).length) && params.data) {
    try {
      const bytes = Utilities.base64DecodeWebSafe(String(params.data));
      const raw = Utilities.newBlob(bytes).getDataAsString('UTF-8');
      parsed = JSON.parse(raw);
    } catch (err) {
      throw new Error('data base64url/JSON invalide.');
    }
  }

  parsed = (parsed && typeof parsed === 'object') ? parsed : {};
  const srcAnn = (parsed.annotation && typeof parsed.annotation === 'object')
    ? parsed.annotation
    : {};

  const annotation = Object.assign({}, srcAnn, {
    status: params.status || srcAnn.status || parsed.status || 'review',
    score: params.score || srcAnn.score || parsed.score || '',
    tags: params.tags || srcAnn.tags || parsed.tags || '',
    notes: params.notes || srcAnn.notes || parsed.notes || parsed.generalNote || '',
    continuity: params.continuity || srcAnn.continuity || parsed.continuity || '',
    romance: params.romance || srcAnn.romance || parsed.romance || '',
    mechanics: params.mechanics || srcAnn.mechanics || parsed.mechanics || '',
    visual: params.visual || srcAnn.visual || parsed.visual || '',
    rewrite: params.rewrite || srcAnn.rewrite || parsed.rewrite || ''
  });

  if (params.choices) {
    try {
      annotation.choices = JSON.parse(String(params.choices));
    } catch (err) {
      throw new Error('choices JSON invalide.');
    }
  }

  // Raccourci pour annoter un choix sans fabriquer un objet JSON complet.
  const choiceKey = reviewerClean_(params.choiceKey || '', 120);
  if (choiceKey) {
    annotation.choices = (annotation.choices && typeof annotation.choices === 'object')
      ? annotation.choices : {};
    annotation.choices[choiceKey] = {
      status:params.choiceStatus || 'review',
      note:params.choiceNote || ''
    };
  }

  return {
    action:'submit',
    sceneId:params.sceneId || params.scene || parsed.sceneId || parsed.scene || '',
    annotation:annotation
  };
}

function reviewerApiAuthorizeUrlWriter_(params) {
  params = params || {};
  const agentId = reviewerClean_(params.agentId || params.guestId || '', 120);
  const key = reviewerClean_(params.key || params.writeKey || '', 500);
  if (!agentId || !key) return {ok:false};

  const map = reviewerAgentAccessMap_();
  const rec = map[agentId];
  if (!rec || rec.enabled === false || !rec.urlWriteHash) return {ok:false};

  const actual = reviewerHash_(key);
  if (!reviewerConstantTimeEqual_(actual, String(rec.urlWriteHash))) return {ok:false};

  return {
    ok:true,
    agentId:agentId,
    name:reviewerClean_(rec.name || agentId, 120),
    profile:reviewerClean_(rec.profile || 'Testeur IA · API', 120),
    contact:reviewerClean_(rec.contact || '', 180)
  };
}

/**
 * Génère/rotationne uniquement la clé de secours GET pour un agent existant.
 * La clé est write-only et ne permet aucune action propriétaire.
 */
function reviewerCreateAgentBrowserWriteAccess_(agentId) {
  agentId = reviewerClean_(agentId, 120);
  const map = reviewerAgentAccessMap_();
  const rec = map[agentId];

  if (!rec || rec.enabled === false) {
    throw new Error('Agent introuvable ou désactivé : ' + agentId);
  }

  const key = 'gw_' + Utilities.getUuid().replace(/-/g, '') +
    Utilities.getUuid().replace(/-/g, '');
  const now = new Date().toISOString();

  rec.urlWriteHash = reviewerHash_(key);
  rec.urlWriteRotatedAt = now;
  map[agentId] = rec;
  reviewerSaveAgentAccessMap_(map);

  const base = ScriptApp.getService().getUrl() || '';
  const config = {
    ok:true,
    agentId:agentId,
    name:rec.name || agentId,
    profile:rec.profile || 'Testeur IA · API',
    writeKey:key,
    submitBase:base ? base + '?review=api&action=submit&agentId=' +
      encodeURIComponent(agentId) + '&key=' + encodeURIComponent(key) : '',
    pingUrl:base ? base + '?review=api&action=ping' : '',
    note:'Clé de secours GET write-only. Elle peut apparaître dans l’historique URL : ne la réutilise pas ailleurs et rotationne-la si elle fuite.'
  };

  const logLine = 'ELENYA_AGENT_BROWSER_WRITE=' + JSON.stringify(config);
  console.log(logLine);
  try { Logger.log(logLine); } catch (err) {}
  return config;
}

function reviewerCreateGrokBrowserWriteAccess() {
  return reviewerCreateAgentBrowserWriteAccess_('agent-grok');
}


/**
 * Point d'entrée POST pour les agents.
 * Accepte JSON et, en secours, un champ de formulaire "payload" contenant du JSON.
 */
function reviewerApiPost_(e) {
  try {
    const body = reviewerApiParseBody_(e);
    const action = reviewerClean_(
      body.action || ((e && e.parameter && e.parameter.action) || 'submit'), 40
    ).toLowerCase();

    if (action === 'ping') {
      return reviewerJsonOutput_({
        ok:true, action:'ping', apiVersion:ELENYA_REVIEWER.AGENT_API_VERSION,
        appVersion:ELENYA_REVIEWER.APP_VERSION, buildVersion:reviewerBuildVersion_(),
        serverTime:new Date().toISOString()
      });
    }

    const auth = reviewerApiAuthorizeAgent_(body, e);
    if (!auth.ok) {
      return reviewerJsonOutput_({
        ok:false, action:action, error:'UNAUTHORIZED',
        message:'agentId ou token invalide.'
      });
    }

    if (!reviewerApiRateLimit_(auth.agentId)) {
      return reviewerJsonOutput_({
        ok:false, action:action, error:'RATE_LIMIT',
        message:'Trop de requêtes API. Réessaie dans environ une minute.'
      });
    }

    if (action === 'load') {
      const scenes = reviewerBuildCatalog_();
      const buildVersion = reviewerBuildVersion_();
      const datasetId = reviewerDatasetId_(buildVersion, scenes);
      return reviewerJsonOutput_({
        ok:true, action:'load', agentId:auth.agentId, buildVersion:buildVersion,
        datasetId:datasetId,
        annotations:reviewerLoadAnnotations_(auth.agentId, datasetId)
      });
    }

    if (action === 'batch') {
      return reviewerJsonOutput_(reviewerApiSubmitBatch_(auth, body));
    }

    if (action === 'submit' || action === 'report') {
      return reviewerJsonOutput_(reviewerApiSubmitOne_(auth, body));
    }

    return reviewerJsonOutput_({
      ok:false, error:'UNKNOWN_ACTION', action:action,
      allowed:['submit','batch','load','ping']
    });
  } catch (err) {
    return reviewerJsonOutput_({
      ok:false, error:'API_ERROR',
      message:String(err && err.message ? err.message : err)
    });
  }
}

function reviewerApiParseBody_(e) {
  let raw = '';
  try { raw = String(e && e.postData && e.postData.contents || ''); } catch (err) {}
  if (!raw && e && e.parameter && e.parameter.payload) raw = String(e.parameter.payload);
  if (!raw) return Object.assign({}, (e && e.parameter) || {});
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (err) {
    throw new Error('JSON invalide dans le corps POST.');
  }
}

function reviewerApiSubmitOne_(auth, body, context) {
  const ctx = context || {};
  const scenes = ctx.scenes || reviewerBuildCatalog_();
  const buildVersion = ctx.buildVersion || reviewerBuildVersion_();
  const datasetId = ctx.datasetId || reviewerDatasetId_(buildVersion, scenes);
  const sceneId = reviewerClean_(body.sceneId || body.scene || '', 180);
  if (!sceneId) throw new Error('sceneId manquant.');

  const scene = scenes.find(function(s) { return String(s.id) === sceneId; }) || null;
  if (!scene) {
    return {ok:false, action:'submit', error:'SCENE_NOT_FOUND', sceneId:sceneId};
  }

  const annotation = reviewerApiAnnotationFromBody_(body);
  const result = reviewerSyncScene({
    guestId:auth.agentId,
    guestName:auth.name,
    guestProfile:auth.profile,
    contact:auth.contact || '',
    datasetId:datasetId,
    buildVersion:buildVersion,
    sceneId:scene.id,
    sceneTitle:scene.title,
    act:scene.act,
    annotation:annotation
  });

  return {
    ok:true, action:'submit', agentId:auth.agentId, sceneId:scene.id,
    sceneTitle:scene.title, buildVersion:buildVersion, datasetId:datasetId,
    verification:result.verification || 'À VÉRIFIER',
    unchanged:!!result.unchanged,
    syncedAt:result.syncedAt || new Date().toISOString()
  };
}

function reviewerApiSubmitBatch_(auth, body) {
  const entries = Array.isArray(body.entries) ? body.entries : [];
  const accepted = entries.slice(0, 25);
  const results = [];
  const scenes = reviewerBuildCatalog_();
  const buildVersion = reviewerBuildVersion_();
  const context = {
    scenes:scenes,
    buildVersion:buildVersion,
    datasetId:reviewerDatasetId_(buildVersion, scenes)
  };
  accepted.forEach(function(entry) {
    const merged = Object.assign({}, entry || {}, {
      annotation:(entry && entry.annotation) || entry || {}
    });
    const r = reviewerApiSubmitOne_(auth, merged, context);
    results.push(r);
  });
  return {
    ok:results.every(function(r){ return r && r.ok; }),
    action:'batch',
    agentId:auth.agentId,
    requested:entries.length,
    processed:results.length,
    truncated:entries.length > 25,
    batchLimit:25,
    results:results
  };
}

function reviewerApiAnnotationFromBody_(body) {
  const src = (body.annotation && typeof body.annotation === 'object')
    ? body.annotation
    : ((body.report && typeof body.report === 'object') ? body.report : body);
  return {
    status:src.status || 'review',
    score:src.score || '',
    tags:src.tags || '',
    notes:src.notes || src.generalNote || src.general || '',
    continuity:src.continuity || '',
    romance:src.romance || src.relationships || '',
    mechanics:src.mechanics || src.flags || '',
    visual:src.visual || src.ux || '',
    rewrite:src.rewrite || '',
    checklist:(src.checklist && typeof src.checklist === 'object') ? src.checklist : {},
    choices:(src.choices && typeof src.choices === 'object') ? src.choices : {},
    updatedAt:new Date().toISOString()
  };
}

function reviewerApiAuthorizeAgent_(body, e) {
  const agentId = reviewerClean_(body.agentId || body.guestId || '', 120);
  const token = reviewerClean_(body.token || '', 500);
  if (!agentId || !token) return {ok:false};

  const map = reviewerAgentAccessMap_();
  const rec = map[agentId];
  if (!rec || rec.enabled === false || !rec.tokenHash) return {ok:false};

  const actual = reviewerHash_(token);
  if (!reviewerConstantTimeEqual_(actual, String(rec.tokenHash))) return {ok:false};

  return {
    ok:true,
    agentId:agentId,
    name:reviewerClean_(rec.name || agentId, 120),
    profile:reviewerClean_(rec.profile || 'Testeur IA · API', 120),
    contact:reviewerClean_(rec.contact || '', 180)
  };
}

function reviewerAgentAccessMap_() {
  const props = PropertiesService.getScriptProperties();
  const raw = props.getProperty(ELENYA_REVIEWER.AGENT_ACCESS_PROPERTY) || '{}';
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (err) {
    return {};
  }
}

function reviewerSaveAgentAccessMap_(map) {
  PropertiesService.getScriptProperties().setProperty(
    ELENYA_REVIEWER.AGENT_ACCESS_PROPERTY,
    JSON.stringify(map || {})
  );
}

function reviewerCreateAgentApiAccess_(name, agentId, profile, contact) {
  name = reviewerClean_(name, 120) || 'Agent IA';
  agentId = reviewerClean_(agentId, 120) || ('agent-' + Utilities.getUuid());
  profile = reviewerClean_(profile, 120) || 'Testeur IA · API';
  contact = reviewerClean_(contact, 180);

  const token = 'ef_' + Utilities.getUuid().replace(/-/g, '') +
    Utilities.getUuid().replace(/-/g, '');
  const map = reviewerAgentAccessMap_();
  const now = new Date().toISOString();
  map[agentId] = {
    name:name,
    profile:profile,
    contact:contact,
    tokenHash:reviewerHash_(token),
    enabled:true,
    createdAt:(map[agentId] && map[agentId].createdAt) || now,
    rotatedAt:now
  };
  reviewerSaveAgentAccessMap_(map);

  reviewerRegisterGuest({
    guestId:agentId,
    name:name,
    profile:profile,
    contact:contact
  });

  const base = ScriptApp.getService().getUrl() || '';
  const config = {
    ok:true,
    agentId:agentId,
    name:name,
    profile:profile,
    token:token,
    readBase:base ? base + '?review=api' : '',
    capabilitiesUrl:base ? base + '?review=api&capabilities=1' : '',
    writeEndpoint:base ? base + '?review=api' : '',
    note:'Garde le token secret. Le serveur ne le réaffichera pas.'
  };
  const logLine = 'ELENYA_AGENT_ACCESS=' + JSON.stringify(config);
  console.log(logLine);
  try { Logger.log(logLine); } catch (err) {}
  return config;
}

/**
 * Fonction sans argument à lancer manuellement depuis Apps Script.
 * Elle crée/rotationne l'accès API de Grok et écrit la configuration dans le journal d'exécution.
 */
function reviewerCreateGrokApiAccess() {
  return reviewerCreateAgentApiAccess_('Grok', 'agent-grok', 'Testeur IA · API', '');
}

function reviewerRevokeGrokApiAccess() {
  return reviewerRevokeAgentApiAccess('agent-grok');
}

function reviewerRevokeAgentApiAccess(agentId) {
  agentId = reviewerClean_(agentId, 120);
  const map = reviewerAgentAccessMap_();
  if (!map[agentId]) return {ok:false, error:'AGENT_NOT_FOUND', agentId:agentId};
  map[agentId].enabled = false;
  map[agentId].revokedAt = new Date().toISOString();
  reviewerSaveAgentAccessMap_(map);
  return {ok:true, agentId:agentId, revoked:true};
}

function reviewerListAgentApiAccess() {
  const map = reviewerAgentAccessMap_();
  return Object.keys(map).map(function(agentId) {
    const r = map[agentId] || {};
    return {
      agentId:agentId,
      name:r.name || '',
      profile:r.profile || '',
      enabled:r.enabled !== false,
      createdAt:r.createdAt || '',
      rotatedAt:r.rotatedAt || '',
      urlWriteEnabled:!!r.urlWriteHash,
      urlWriteRotatedAt:r.urlWriteRotatedAt || '',
      revokedAt:r.revokedAt || ''
    };
  });
}

function reviewerApiRateLimit_(agentId) {
  try {
    const cache = CacheService.getScriptCache();
    const key = 'elenya_api_rl_' + reviewerHash_(String(agentId)).slice(0, 20);
    const count = Number(cache.get(key) || 0);
    if (count >= 120) return false;
    cache.put(key, String(count + 1), 60);
  } catch (err) {
    // Si CacheService est indisponible, ne bloque pas le testeur.
  }
  return true;
}

function reviewerConstantTimeEqual_(a, b) {
  a = String(a || '');
  b = String(b || '');
  let diff = a.length ^ b.length;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i % (a.length || 1)) || 0) ^
            (b.charCodeAt(i % (b.length || 1)) || 0);
  }
  return diff === 0;
}

function reviewerJsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

function reviewerBootstrap(request) {
  request = request || {};
  const guestId = reviewerClean_(request.guestId, 120);
  const scenes = reviewerBuildCatalog_();
  const buildVersion = reviewerBuildVersion_();
  const datasetId = reviewerDatasetId_(buildVersion, scenes);
  const saved = guestId ? reviewerLoadAnnotations_(guestId, datasetId) : {};

  return {
    ok: true,
    appVersion: ELENYA_REVIEWER.APP_VERSION,
    buildVersion: buildVersion,
    datasetId: datasetId,
    sceneCount: scenes.length,
    scenes: scenes,
    savedAnnotations: saved,
    generatedAt: new Date().toISOString()
  };
}

function reviewerRegisterGuest(profile) {
  profile = profile || {};
  const name = reviewerClean_(profile.name, 120);
  if (!name) throw new Error('Un nom ou pseudo est requis.');

  const guestId = reviewerClean_(profile.guestId, 120) || Utilities.getUuid();
  const role = reviewerClean_(profile.profile, 120) || 'Testeur invité';
  const contact = reviewerClean_(profile.contact, 180);
  const ss = reviewerEnsureSpreadsheet_();
  const sh = ss.getSheetByName(ELENYA_REVIEWER.GUESTS_SHEET);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const now = new Date();
    const row = reviewerFindRowByFirstColumn_(sh, guestId);
    if (row > 1) {
      const created = sh.getRange(row, 5).getValue() || now;
      sh.getRange(row, 1, 1, 6).setValues([[guestId, name, role, contact, created, now]]);
    } else {
      sh.appendRow([guestId, name, role, contact, now, now]);
    }
  } finally {
    lock.releaseLock();
  }
  return {ok:true, guestId:guestId, name:name, profile:role, contact:contact};
}

function reviewerSyncScene(payload) {
  payload = payload || {};
  const guestId = reviewerClean_(payload.guestId, 120);
  const guestName = reviewerClean_(payload.guestName, 120);
  const guestProfile = reviewerClean_(payload.guestProfile, 120) || 'Testeur invité';
  const contact = reviewerClean_(payload.contact, 180);
  const dataset = reviewerClean_(payload.datasetId, 180);
  const sceneId = reviewerClean_(payload.sceneId, 180);
  if (!guestId || !guestName || !dataset || !sceneId) {
    throw new Error('Profil invité, version ou scène manquante.');
  }

  const annotation = reviewerNormalizeAnnotation_(payload.annotation || {});
  const sceneTitle = reviewerClean_(payload.sceneTitle, 240);
  const act = reviewerClean_(payload.act, 80);
  const buildVersion = reviewerClean_(payload.buildVersion, 80) || reviewerBuildVersion_();
  const key = dataset + '|' + guestId + '|' + sceneId;
  const contentHash = reviewerHash_(JSON.stringify(annotation));
  const now = new Date();

  const ss = reviewerEnsureSpreadsheet_();
  const sh = ss.getSheetByName(ELENYA_REVIEWER.REVIEWS_SHEET);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const row = reviewerFindRowByFirstColumn_(sh, key);
    let ownerDecision = '';
    let ownerNotes = '';
    let verification = 'À VÉRIFIER';
    let existingHash = '';

    if (row > 1) {
      existingHash = String(sh.getRange(row, 21).getValue() || '');
      ownerDecision = String(sh.getRange(row, 25).getValue() || '');
      ownerNotes = String(sh.getRange(row, 26).getValue() || '');
      const previousVerification = String(sh.getRange(row, 24).getValue() || '');
      if (existingHash === contentHash) {
        sh.getRange(row, 23).setValue(now);
        return {ok:true, unchanged:true, verification:previousVerification || 'À VÉRIFIER', syncedAt:now.toISOString()};
      }
      if (ownerDecision || /VALID|ACCEPT|REJET|CORRIG/i.test(previousVerification)) {
        verification = 'À REVALIDER — MODIFIÉ PAR L’INVITÉ';
      }
    }

    const values = [[
      key, dataset, buildVersion, guestId, guestName, guestProfile, contact,
      sceneId, sceneTitle, act, annotation.status, annotation.score, annotation.tags,
      annotation.notes, annotation.continuity, annotation.romance, annotation.mechanics,
      annotation.visual, annotation.rewrite, JSON.stringify(annotation.choices || {}),
      contentHash, annotation.updatedAt || now.toISOString(), now,
      verification, ownerDecision, ownerNotes
    ]];

    if (row > 1) sh.getRange(row, 1, 1, values[0].length).setValues(values);
    else sh.appendRow(values[0]);

    reviewerTouchGuest_(ss, guestId, guestName, guestProfile, contact, now);
    return {ok:true, unchanged:false, verification:verification, syncedAt:now.toISOString()};
  } finally {
    lock.releaseLock();
  }
}

function reviewerSyncMany(payload) {
  payload = payload || {};
  const common = {
    guestId: payload.guestId,
    guestName: payload.guestName,
    guestProfile: payload.guestProfile,
    contact: payload.contact,
    datasetId: payload.datasetId,
    buildVersion: payload.buildVersion
  };
  const entries = Array.isArray(payload.entries) ? payload.entries : [];
  const out = [];
  entries.slice(0, 300).forEach(function(entry) {
    out.push(reviewerSyncScene(Object.assign({}, common, entry)));
  });
  return {ok:true, synced:out.length};
}

function reviewerLoadMyAnnotations(guestId, datasetId) {
  return reviewerLoadAnnotations_(reviewerClean_(guestId, 120), reviewerClean_(datasetId, 180));
}

function reviewerBuildCatalog_() {
  applyRefonte_();
  const out = [];
  reviewerAppendDb_(out, (typeof DB !== 'undefined' ? DB : {}), 'DB', 'CLASSIQUE');
  reviewerAppendDb_(out, (typeof NGPLUS_DB !== 'undefined' ? NGPLUS_DB : {}), 'NGPLUS_DB', 'NEW GAME+');
  return out;
}

function reviewerAppendDb_(out, db, dbName, campaign) {
  Object.keys(db || {}).forEach(function(id) {
    const s = db[id] || {};
    const choices = reviewerExtractChoices_(s);
    const chapter = Number(s.chapter || reviewerInferChapter_(id)) || 0;
    out.push({
      id: String(id),
      dbName: dbName,
      campaign: campaign,
      sceneNumber: reviewerPrimitive_(s.sceneNumber) || String(id),
      chapter: chapter,
      act: reviewerAct_(id, chapter, campaign),
      title: reviewerPrimitive_(s.title) || String(id),
      mood: reviewerPrimitive_(s.mood),
      image: refonteAsset_(normalizeAssetRef(endingCgV55_(id)||reviewerPrimitive_(s.image)),{flags:[]},id),
      transitionGif: normalizeAssetRef(endingVideoV55_(s,id)||reviewerPrimitive_(s.transitionGif)),
      sprite: normalizeAssetRef(reviewerPrimitive_(s.sprite)),
      spriteLeft: normalizeAssetRef(reviewerPrimitive_(s.spriteLeft)),
      spriteRight: normalizeAssetRef(reviewerPrimitive_(s.spriteRight)),
      narrative: reviewerNarrativePreview_(s),
      narrativeSource: reviewerNarrativeSource_(s),
      choices: choices,
      rawSummary: reviewerSceneSummary_(s)
    });
  });
}

function reviewerExtractChoices_(scene) {
  let list = [];
  if (Array.isArray(scene.choices)) list = scene.choices;
  else if (typeof scene.getChoices === 'function') {
    return [{
      key:'DYNAMIC', text:'Choix générés dynamiquement — consulter la source.', next:'', intent:'', target:'', importance:'',
      feedback:'', response:'', journal:'', condition:'', effects:'', source:String(scene.getChoices)
    }];
  }
  return list.map(function(c, i) {
    c = c || {};
    return {
      key: reviewerPrimitive_(c.key) || String(i + 1),
      text: reviewerChoiceText_(c),
      next: reviewerPrimitive_(c.next),
      intent: reviewerPrimitive_(c.intent),
      target: reviewerPrimitive_(c.target),
      importance: reviewerPrimitive_(c.importance),
      feedback: reviewerPrimitive_(c.feedback),
      response: reviewerPrimitive_(c.response),
      journal: reviewerPrimitive_(c.journal),
      condition: reviewerSerialize_(c.condition || c.conditionLabel || ''),
      effects: reviewerSerialize_(c.effects || ''),
      source: reviewerSerialize_(c)
    };
  });
}

function reviewerChoiceText_(c) {
  if (typeof c.text === 'string') return c.text;
  if (typeof c.getDynamicText === 'function') return '[Texte dynamique] ' + reviewerExtractReturnStrings_(String(c.getDynamicText));
  return reviewerPrimitive_(c.text) || '(texte dynamique)';
}

function reviewerNarrativePreview_(scene) {
  // Le moteur accepte getDynamicNarrative, text puis narrative. Le Reviewer doit
  // exposer les mêmes contrats pour éviter les faux positifs (notamment GAME_OVER_*).
  if (typeof scene.text === 'string' && scene.text.trim()) return scene.text;
  if (typeof scene.narrative === 'string' && scene.narrative.trim()) return scene.narrative;
  if (typeof scene.getDynamicNarrative === 'function') {
    const extracted = reviewerExtractReturnStrings_(String(scene.getDynamicNarrative));
    return extracted || 'Narratif dynamique — consulter « Source dynamique ».';
  }
  return '';
}

function reviewerNarrativeSource_(scene) {
  if (typeof scene.getDynamicNarrative === 'function') return String(scene.getDynamicNarrative);
  if (typeof scene.text === 'string') return scene.text;
  if (typeof scene.narrative === 'string') return scene.narrative;
  return reviewerSerialize_(scene.text || scene.narrative || '');
}

function reviewerExtractReturnStrings_(source) {
  source = String(source || '');
  const found = [];
  const re = /return\s+(["'`])([\s\S]*?)\1\s*;?/g;
  let m;
  while ((m = re.exec(source)) && found.length < 12) {
    const text = String(m[2] || '').replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"');
    if (text.trim() && found.indexOf(text) < 0) found.push(text.trim());
  }
  return found.join('\n\n— Variante —\n\n');
}

function reviewerSceneSummary_(scene) {
  const summary = {};
  ['relationFocus','emotionalBeat','isEnd','postEnding','isFlashback','hint','voice'].forEach(function(k) {
    if (typeof scene[k] !== 'undefined') summary[k] = reviewerSerialize_(scene[k]);
  });
  return JSON.stringify(summary, null, 2);
}

function reviewerPrimitive_(v) {
  if (v === null || typeof v === 'undefined') return '';
  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (typeof v === 'function') return String(v);
  return reviewerSerialize_(v);
}

function reviewerSerialize_(v) {
  if (v === null || typeof v === 'undefined') return '';
  if (typeof v === 'function') return String(v);
  if (typeof v === 'string') return v;
  try {
    return JSON.stringify(v, function(key, value) {
      return typeof value === 'function' ? String(value) : value;
    }, 2);
  } catch (e) {
    return String(v);
  }
}

function reviewerBuildVersion_() {
  if (typeof BUILD_VERSION !== 'undefined' && BUILD_VERSION) return String(BUILD_VERSION);
  try {
    if (typeof serverGetBuildInfo === 'function') {
      const info = serverGetBuildInfo();
      if (info && info.version) return String(info.version);
    }
  } catch (e) {}
  return 'CURRENT';
}

function reviewerDatasetId_(buildVersion, scenes) {
  return 'ELENYA_' + String(buildVersion || 'CURRENT') + '_' + String((scenes || []).length);
}

function reviewerInferChapter_(id) {
  const m = String(id || '').match(/^ACTE(\d+)/i);
  return m ? Number(m[1]) : 0;
}

function reviewerAct_(id, chapter, campaign) {
  if (campaign === 'NEW GAME+') return 'NEW GAME+';
  if (/^FIN_|^GAME_OVER/i.test(String(id))) return 'FINS';
  return chapter ? 'ACTE ' + chapter : 'AUTRES';
}

function reviewerNormalizeAnnotation_(a) {
  a = a || {};
  const status = ['none','ok','review','issue','blocker'].indexOf(String(a.status || 'none')) >= 0 ? String(a.status || 'none') : 'review';
  const scoreNum = Number(a.score || 0);
  const choices = (a.choices && typeof a.choices === 'object') ? a.choices : {};
  const cleanChoices = {};
  Object.keys(choices).slice(0, 100).forEach(function(key) {
    const c = choices[key] || {};
    cleanChoices[reviewerClean_(key, 120)] = {
      status: ['none','ok','review','issue','blocker'].indexOf(String(c.status || 'none')) >= 0 ? String(c.status || 'none') : 'review',
      note: reviewerCleanMultiline_(c.note, 12000)
    };
  });
  return {
    status: status,
    score: scoreNum >= 1 && scoreNum <= 5 ? scoreNum : '',
    tags: reviewerClean_(a.tags, 800),
    notes: reviewerCleanMultiline_(a.notes, 16000),
    continuity: reviewerCleanMultiline_(a.continuity, 16000),
    romance: reviewerCleanMultiline_(a.romance, 16000),
    mechanics: reviewerCleanMultiline_(a.mechanics, 16000),
    visual: reviewerCleanMultiline_(a.visual, 16000),
    rewrite: reviewerCleanMultiline_(a.rewrite, 24000),
    checklist: a.checklist && typeof a.checklist === 'object' ? a.checklist : {},
    choices: cleanChoices,
    updatedAt: reviewerClean_(a.updatedAt, 80) || new Date().toISOString(),
    trustLevel: 'guest_unverified',
    verification: 'pending_owner_review',
    requiresOwnerVerification: true
  };
}

function reviewerLoadAnnotations_(guestId, datasetId) {
  const result = {};
  if (!guestId || !datasetId) return result;
  const ss = reviewerEnsureSpreadsheet_();
  const sh = ss.getSheetByName(ELENYA_REVIEWER.REVIEWS_SHEET);
  const values = sh.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    const r = values[i];
    if (String(r[1]) !== datasetId || String(r[3]) !== guestId) continue;
    let choices = {};
    try { choices = JSON.parse(String(r[19] || '{}')); } catch (e) {}
    result[String(r[7])] = {
      status: String(r[10] || 'none'),
      score: r[11] || '',
      tags: String(r[12] || ''),
      notes: String(r[13] || ''),
      continuity: String(r[14] || ''),
      romance: String(r[15] || ''),
      mechanics: String(r[16] || ''),
      visual: String(r[17] || ''),
      rewrite: String(r[18] || ''),
      choices: choices,
      updatedAt: r[21] instanceof Date ? r[21].toISOString() : String(r[21] || ''),
      serverVerification: String(r[23] || 'À VÉRIFIER')
    };
  }
  return result;
}

function reviewerEnsureSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty(ELENYA_REVIEWER.SHEET_ID_PROPERTY);
  let ss = null;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create(ELENYA_REVIEWER.SPREADSHEET_NAME);
    props.setProperty(ELENYA_REVIEWER.SHEET_ID_PROPERTY, ss.getId());
  }
  reviewerEnsureSheet_(ss, ELENYA_REVIEWER.REVIEWS_SHEET, ELENYA_REVIEWER.REVIEW_HEADERS);
  reviewerEnsureSheet_(ss, ELENYA_REVIEWER.GUESTS_SHEET, ELENYA_REVIEWER.GUEST_HEADERS);
  const defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheetByName('Feuille 1');
  if (defaultSheet && ss.getSheets().length > 2) {
    try { ss.deleteSheet(defaultSheet); } catch (e) {}
  }
  return ss;
}

function reviewerEnsureSheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.getRange(1,1,1,headers.length).setValues([headers]);
  else {
    const current = sh.getRange(1,1,1,Math.max(headers.length, sh.getLastColumn())).getValues()[0];
    let mismatch = false;
    for (let i=0;i<headers.length;i++) if (String(current[i] || '') !== headers[i]) { mismatch = true; break; }
    if (mismatch) sh.getRange(1,1,1,headers.length).setValues([headers]);
  }
  sh.setFrozenRows(1);
  return sh;
}

function reviewerTouchGuest_(ss, guestId, name, profile, contact, now) {
  const sh = ss.getSheetByName(ELENYA_REVIEWER.GUESTS_SHEET);
  const row = reviewerFindRowByFirstColumn_(sh, guestId);
  if (row > 1) {
    const created = sh.getRange(row,5).getValue() || now;
    sh.getRange(row,1,1,6).setValues([[guestId,name,profile,contact,created,now]]);
  } else {
    sh.appendRow([guestId,name,profile,contact,now,now]);
  }
}

function reviewerFindRowByFirstColumn_(sheet, key) {
  if (!sheet || sheet.getLastRow() < 2 || !key) return -1;
  const found = sheet.getRange(2,1,sheet.getLastRow()-1,1)
    .createTextFinder(String(key)).matchEntireCell(true).findNext();
  return found ? found.getRow() : -1;
}

function reviewerHash_(text) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(text || ''), Utilities.Charset.UTF_8);
  return bytes.map(function(b) { const n = (b < 0 ? b + 256 : b); return ('0' + n.toString(16)).slice(-2); }).join('');
}

function reviewerClean_(v, max) {
  const s = String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim();
  return s.slice(0, max || 5000);
}

function reviewerCleanMultiline_(v, max) {
  return reviewerClean_(v, max || 16000).replace(/\r\n/g, '\n');
}
