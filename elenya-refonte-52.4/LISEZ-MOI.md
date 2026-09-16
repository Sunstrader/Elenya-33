# Elenya — 52.4.3-free-voice

Cette version conserve les correctifs 52.4/52.4.1 (NG+, sauvegardes, galerie, audio, historique) et ajoute l'infrastructure complète pour un pack vocal français pré-généré.

## Voix

- Algenib — masculine
- Achird — masculine
- Sulafat — féminine
- Leda — féminine

Le jeu n'a plus besoin de générer les voix à la volée. Il cherche d'abord un fichier pré-généré dans `assets/voices/pack-manifest.json`, puis utilise la synthèse vocale française du navigateur seulement si ce fichier n'existe pas encore.

Le corpus contient 2 260 segments uniques issus des 246 scènes jouables et de 1 269 variantes narratives détectées.

## Validation

Depuis la racine du projet Node :

```bash
npm test
npm run lint
npm run build
npm run voice:status
```

## Cloud Shell — génération des 4 aperçus français

```bash
cd ~/elenya-52-audio-52.4.3-free-voice
bash scripts/prepare-gemini-free.sh
npm run voice:previews
npm run voice:status
```

## Cloud Shell — pack complet Sulafat

```bash
npm run voice:generate
npm run voice:status
```

Pour générer volontairement les quatre voix complètes :

```bash
npm run voice:generate:all
```

La génération est reprenable et saute les fichiers déjà produits.

## Apps Script

Pour pousser le code Apps Script après sauvegarde :

```bash
set -e
cd ~/elenya-52-audio-52.4.3-free-voice
npm test
cd elenya-refonte-52.4/project
clasp login
clasp push --force
clasp open-script
```

Dans Apps Script : `Déployer` → `Gérer les déploiements` → `Modifier` → `Nouvelle version` → `Déployer`.

Les fichiers audio ne sont pas hébergés par Apps Script. Le client détecte Apps Script et charge automatiquement le pack depuis le dépôt GitHub public ; il faut donc publier `assets/voices/` sur le dépôt après génération.
