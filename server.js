'use strict';

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const { URL } = require('node:url');
const { createIsolatedEngine } = require('./elenya-refonte-52.4/qa/engine.cjs');

const PORT = 3000;
const HOST = '0.0.0.0';
const ROOT = __dirname;
const projectRoot = path.join(ROOT, 'elenya-refonte-52.4/project');
const assetsRoot = path.join(ROOT, 'elenya-refonte-52.4/assets');
const docsRoot = path.join(ROOT, 'elenya-refonte-52.4/docs');

let isolatedEngine = null;
try {
  isolatedEngine = createIsolatedEngine(projectRoot);
} catch (e) {
  console.warn('Moteur local isolé non initialisé:', e.message);
}

const ALLOWED_GAS_METHODS = new Set([
  'serverGetMainMenu',
  'serverGetPendingScene',
  'serverProcessChoice',
  'serverStartNewGamePlus',
  'serverGetExplorer',
  'serverSaveGame',
  'serverLoadGame',
  'serverGetBuildInfo',
  'serverValidateDatabase',
  'serverRunAAAHealthCheck'
]);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

function sendJson(res, status, body) {
  const data = Buffer.from(JSON.stringify(body));
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length,
    'Cache-Control': 'no-store'
  });
  res.end(data);
}

function sendText(res, status, text, contentType = 'text/plain; charset=utf-8') {
  const data = Buffer.from(text);
  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': data.length,
    'Cache-Control': 'no-store'
  });
  res.end(data);
}

function readJson(req, maxBytes = 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(Object.assign(new Error('Payload trop volumineux'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8') || '{}';
        resolve(JSON.parse(raw));
      } catch (_) {
        reject(Object.assign(new Error('JSON invalide'), { statusCode: 400 }));
      }
    });
    req.on('error', reject);
  });
}

function safeStaticPath(base, relativePath) {
  let decoded;
  try { decoded = decodeURIComponent(relativePath); } catch (_) { return null; }
  if (decoded.includes('\0') || decoded.includes('..') || decoded.toLowerCase().includes('.env') || decoded.toLowerCase().includes('.git') || decoded.toLowerCase().endsWith('.zip')) return null;
  const absolute = path.resolve(base, decoded.replace(/^\/+/, ''));
  const normalizedBase = path.resolve(base) + path.sep;
  if (absolute !== path.resolve(base) && !absolute.startsWith(normalizedBase)) return null;
  return absolute;
}

function serveStatic(res, base, relativePath) {
  const filePath = safeStaticPath(base, relativePath);
  if (!filePath) return sendJson(res, 403, { ok: false, error: 'Accès interdit' });
  let stat;
  try { stat = fs.statSync(filePath); } catch (_) { return sendText(res, 404, 'Introuvable'); }
  if (!stat.isFile()) return sendText(res, 404, 'Introuvable');
  const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Cache-Control': /pack-manifest\.json$/i.test(filePath) ? 'no-store' : 'public, max-age=3600'
  });
  fs.createReadStream(filePath).pipe(res);
}

function getClientMeta(args) {
  return (args[0] && typeof args[0] === 'object') ? args[0] : {};
}

function runGas(fnName, args) {
  if (!isolatedEngine) return { status: 503, body: { ok: false, error: 'Moteur local indisponible' } };
  if (!ALLOWED_GAS_METHODS.has(fnName)) return { status: 403, body: { ok: false, error: 'Opération non autorisée' } };
  if (!Array.isArray(args)) return { status: 400, body: { ok: false, error: 'Format des arguments invalide' } };

  try {
    if (fnName === 'serverSaveGame') {
      const state = args[0];
      if (!state || typeof state !== 'object' || !state.currentSceneId) {
        return { status: 200, body: { ok: true, result: { ok: false, error: 'État de sauvegarde invalide' } } };
      }
      return { status: 200, body: { ok: true, result: { ok: true, localOnly: true } } };
    }

    if (fnName === 'serverLoadGame') {
      return { status: 200, body: { ok: true, result: { ok: false, localOnly: true, error: 'Sauvegardes gérées localement dans ce navigateur.' } } };
    }

    if (fnName === 'serverGetMainMenu') {
      const clientMeta = getClientMeta(args);
      const required = [
        'ach_fin_ombre','ach_fin_eclaireur','ach_fin_poly','ach_fin_solo',
        'ach_fin_reconciliation','ach_fin_hiver','ach_fin_sacrifice','ach_fin_mortelle','ach_fin_brisee'
      ];
      const clientAchievements = Array.isArray(clientMeta.achievements) ? clientMeta.achievements : [];
      const unlocked = required.every(a => clientAchievements.includes(a));
      return { status: 200, body: { ok: true, result: {
        ngPlusUnlocked: unlocked,
        achievements: clientAchievements,
        globalFlags: Array.isArray(clientMeta.globalFlags) ? clientMeta.globalFlags : [],
        classicSave: null,
        ngPlusSave: null,
        classicEnds: required.filter(a => clientAchievements.includes(a)).length,
        classicEndsRequired: required.length
      } } };
    }

    if (fnName === 'serverStartNewGamePlus') {
      const clientMeta = getClientMeta(args);
      const clientAchievements = Array.isArray(clientMeta.achievements) ? clientMeta.achievements : [];
      const required = [
        'ach_fin_ombre','ach_fin_eclaireur','ach_fin_poly','ach_fin_solo',
        'ach_fin_reconciliation','ach_fin_hiver','ach_fin_sacrifice','ach_fin_mortelle','ach_fin_brisee'
      ];
      const unlocked = required.every(a => clientAchievements.includes(a));
      if (!unlocked) {
        return { status: 200, body: { ok: true, result: { ok: false, error: 'NEW GAME+ verrouillé. Termine les 9 fins classiques requises.' } } };
      }
      const initialProps = new Map([
        ['elenya_globals', JSON.stringify({
          achievements: clientAchievements,
          globalFlags: Array.isArray(clientMeta.globalFlags) ? clientMeta.globalFlags : []
        })]
      ]);
      const rawRes = isolatedEngine.run('serverStartNewGamePlus', [], initialProps);
      return { status: 200, body: { ok: true, result: rawRes } };
    }

    if (fnName === 'serverGetBuildInfo') {
      const result = isolatedEngine.run(fnName, args) || {};
      result.version = '52.4.3-free-voice';
      result.engine = 'Corona Glacialis — V52.4.3-free-voice · Full Voice Ready';
      return { status: 200, body: { ok: true, result } };
    }

    const result = isolatedEngine.run(fnName, args);
    return { status: 200, body: { ok: true, result } };
  } catch (err) {
    console.error(`Erreur exécution isolée ${fnName}:`, err.message);
    return { status: 500, body: { ok: false, error: 'Une erreur est survenue lors du traitement de la requête.' } };
  }
}

function assembleGameHtml() {
  const builtIndex = path.join(ROOT, 'index.html');
  if (fs.existsSync(builtIndex)) return fs.readFileSync(builtIndex, 'utf8');

  const v12Path = path.join(projectRoot, 'V12_Jeu.html');
  if (!fs.existsSync(v12Path)) return null;
  let html = fs.readFileSync(v12Path, 'utf8');
  html = html.replace(/<\?!\s*=\s*include\('([^']+)'\);\s*\?>/g, (_match, fileName) => {
    const filePath = path.join(projectRoot, `${fileName}.html`);
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : `<!-- Fichier manquant: ${fileName} -->`;
  });

  const bridgeScript = `
<script>
(function() {
  if (!window.google) window.google = {};
  if (!window.google.script) window.google.script = {};
  if (!window.google.script.run) {
    function makeRunner() {
      var successHandler = null, failureHandler = null;
      var runner = {
        withSuccessHandler: function(fn) { successHandler = fn; return runner; },
        withFailureHandler: function(fn) { failureHandler = fn; return runner; }
      };
      var methods = [
        'serverGetMainMenu', 'serverGetPendingScene',
        'serverProcessChoice', 'serverStartNewGamePlus',
        'serverSaveGame', 'serverLoadGame', 'serverGetExplorer',
        'serverGetBuildInfo', 'serverValidateDatabase',
        'serverRunAAAHealthCheck'
      ];
      function createCaller(m) {
        return function() {
          var args = Array.prototype.slice.call(arguments);
          fetch('/api/gas/' + encodeURIComponent(m), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ args: args })
          })
          .then(function(r) { return r.json(); })
          .then(function(data) {
            if (data && data.ok) {
              if (successHandler) successHandler(data.result);
            } else if (failureHandler) {
              failureHandler(new Error((data && data.error) || 'Erreur requête'));
            }
          })
          .catch(function(err) { if (failureHandler) failureHandler(err); });
        };
      }
      methods.forEach(function(m) { runner[m] = createCaller(m); });
      if (typeof Proxy !== 'undefined') {
        return new Proxy(runner, {
          get: function(target, prop) {
            if (prop in target) return target[prop];
            if (typeof prop === 'string' && prop.startsWith('server')) return createCaller(prop);
            return target[prop];
          }
        });
      }
      return runner;
    }
    window.google.script.run = makeRunner();
    window.google.script.run.withSuccessHandler = function(fn) { return makeRunner().withSuccessHandler(fn); };
    window.google.script.run.withFailureHandler = function(fn) { return makeRunner().withFailureHandler(fn); };
  }
})();
</script>`;

  return html.replace('</head>', `${bridgeScript}\n</head>`);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  if (pathname === '/healthz') {
    return sendJson(res, isolatedEngine ? 200 : 503, { ok: Boolean(isolatedEngine), version: '52.4.3-free-voice' });
  }

  if (req.method === 'POST' && pathname.startsWith('/api/gas/')) {
    const fnName = pathname.slice('/api/gas/'.length);
    try {
      const payload = await readJson(req);
      const out = runGas(fnName, payload.args);
      return sendJson(res, out.status, out.body);
    } catch (err) {
      return sendJson(res, err.statusCode || 500, { ok: false, error: err.message || 'Erreur requête' });
    }
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { ok: false, error: 'Méthode non autorisée' });
  }

  if (pathname === '/' || pathname === '/index.html') {
    const html = assembleGameHtml();
    if (!html) return sendText(res, 404, 'V12_Jeu.html introuvable');
    return sendText(res, 200, html, 'text/html; charset=utf-8');
  }

  if (pathname.startsWith('/assets/')) return serveStatic(res, assetsRoot, pathname.slice('/assets/'.length));
  if (pathname.startsWith('/docs/')) return serveStatic(res, docsRoot, pathname.slice('/docs/'.length));
  if (pathname.startsWith('/project/')) return serveStatic(res, projectRoot, pathname.slice('/project/'.length));

  return sendText(res, 404, 'Introuvable');
});

server.listen(PORT, HOST, () => {
  console.log(`Serveur Elenya en écoute sur ${HOST}:${PORT}`);
});
