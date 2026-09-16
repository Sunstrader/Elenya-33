const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..', 'elenya-refonte-52.4/project');
const v12Path = path.join(projectRoot, 'V12_Jeu.html');

let html = fs.readFileSync(v12Path, 'utf8');
html = html.replace(/<\?!\s*=\s*include\('([^']+)'\);\s*\?>/g, (match, fileName) => {
  const filePath = path.join(projectRoot, `${fileName}.html`);
  if (fs.existsSync(filePath)) return fs.readFileSync(filePath, 'utf8');
  return `<!-- Fichier manquant: ${fileName} -->`;
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
            } else {
              if (failureHandler) failureHandler(new Error((data && data.error) || 'Erreur requête'));
            }
          })
          .catch(function(err) {
            if (failureHandler) failureHandler(err);
          });
        };
      }
      methods.forEach(function(m) {
        runner[m] = createCaller(m);
      });
      if (typeof Proxy !== 'undefined') {
        return new Proxy(runner, {
          get: function(target, prop) {
            if (prop in target) return target[prop];
            if (typeof prop === 'string' && prop.startsWith('server')) {
              return createCaller(prop);
            }
            return target[prop];
          }
        });
      }
      return runner;
    }
    window.google.script.run = makeRunner();
    window.google.script.run.withSuccessHandler = function(fn) {
      var r = makeRunner();
      return r.withSuccessHandler(fn);
    };
    window.google.script.run.withFailureHandler = function(fn) {
      var r = makeRunner();
      return r.withFailureHandler(fn);
    };
  }
})();
</script>
`;

html = html.replace('</head>', bridgeScript + '\n</head>');
fs.writeFileSync(path.join(__dirname, '..', 'index.html'), html, 'utf8');
console.log('Build terminé : index.html synchronisé (' + html.length + ' octets)');
