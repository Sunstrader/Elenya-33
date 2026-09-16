const fs = require('fs');
const path = require('path');
const vm = require('vm');

let errors = 0;
let warnings = 0;
let checkedFiles = 0;

function logOk(msg) {
  console.log(`  \x1b[32m✔\x1b[0m ${msg}`);
}

function logError(file, msg) {
  console.error(`  \x1b[31m✖\x1b[0m [${file}] ${msg}`);
  errors++;
}

function logWarn(file, msg) {
  console.warn(`  \x1b[33m⚠\x1b[0m [${file}] ${msg}`);
  warnings++;
}

console.log('\x1b[1m=== Validation du Codebase (Linter Elenya) ===\x1b[0m\n');

// 1. Validation de la syntaxe JS / CJS
const jsDirs = [
  '.',
  'scripts',
  'elenya-refonte-52.4/project',
  'elenya-refonte-52.4/qa'
];

for (const dir of jsDirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.js') || file.endsWith('.cjs')) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) continue;
      checkedFiles++;
      const code = fs.readFileSync(fullPath, 'utf8');
      try {
        new vm.Script(code, { filename: fullPath });
        logOk(`${fullPath} — Syntaxe valide`);
      } catch (err) {
        logError(fullPath, `Erreur de syntaxe: ${err.message}`);
      }
    }
  }
}

// 2. Validation des fichiers templates HTML
const projectHtmlFiles = fs.readdirSync('elenya-refonte-52.4/project').filter(f => f.endsWith('.html'));
for (const htmlFile of projectHtmlFiles) {
  const fullPath = path.join('elenya-refonte-52.4/project', htmlFile);
  checkedFiles++;
  const content = fs.readFileSync(fullPath, 'utf8');

  // Extraction des balises <script>...</script> pour vérifier leur syntaxe
  const scriptRegex = /<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi;
  let match;
  let scriptIndex = 0;
  while ((match = scriptRegex.exec(content)) !== null) {
    scriptIndex++;
    let scriptBody = match[1];
    if (!scriptBody.trim()) continue;
    // Remplacement des tags de templating Google Apps Script (ex: <?!= ... ?>) par une valeur JS valide pour la validation
    scriptBody = scriptBody.replace(/<\?[\s\S]*?\?>/g, ' null ');
    try {
      new vm.Script(scriptBody, { filename: `${htmlFile}#script${scriptIndex}` });
    } catch (err) {
      logError(`${htmlFile} (balise script #${scriptIndex})`, `Erreur de syntaxe: ${err.message}`);
    }
  }
  logOk(`${fullPath} — Blocs scripts validés (${scriptIndex} bloc(s))`);
}

// 3. Vérification de l'intégrité de index.html
if (fs.existsSync('index.html')) {
  checkedFiles++;
  const indexContent = fs.readFileSync('index.html', 'utf8');
  if (!indexContent.includes('google.script.run')) {
    logError('index.html', 'Le bridge google.script.run est manquant.');
  } else if (!indexContent.includes('serverStartNewGamePlus')) {
    logError('index.html', 'La fonction serverStartNewGamePlus est manquante dans le bridge.');
  } else if (!indexContent.includes('sha256')) {
    logError('index.html', 'Le module cryptographique sha256 est manquant dans Scripts_Refonte.');
  } else {
    logOk('index.html — Bridge et modules audio & NG+ présents');
  }
} else {
  logError('index.html', 'Fichier index.html inexistant.');
}

// 4. Vérification de la configuration package.json & metadata.json
if (fs.existsSync('package.json')) {
  checkedFiles++;
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (!pkg.scripts || !pkg.scripts.start || !pkg.scripts.test) {
      logWarn('package.json', 'Scripts standards (start, test) incomplets.');
    } else {
      logOk('package.json — Configuration valide');
    }
  } catch (err) {
    logError('package.json', `JSON invalide: ${err.message}`);
  }
}

if (fs.existsSync('metadata.json')) {
  checkedFiles++;
  try {
    JSON.parse(fs.readFileSync('metadata.json', 'utf8'));
    logOk('metadata.json — Structure valide');
  } catch (err) {
    logError('metadata.json', `JSON invalide: ${err.message}`);
  }
}

console.log(`\n\x1b[1mRésultats :\x1b[0m ${checkedFiles} fichiers analysés, ${errors} erreur(s), ${warnings} avertissement(s).`);

if (errors > 0) {
  console.error('\x1b[31mÉchec de la validation du linter.\x1b[0m\n');
  process.exit(1);
} else {
  console.log('\x1b[32mToutes les vérifications syntaxiques et structurelles ont réussi !\x1b[0m\n');
  process.exit(0);
}
