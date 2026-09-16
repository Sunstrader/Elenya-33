# Elenya 52 Audio — 52.4.3 Free Voice

Cette build prépare les **2 260 segments français** d’Elenya pour une narration pré-générée avec **Gemini 3.1 Flash TTS Free Tier uniquement**.

## Zéro dépense par conception

- Backend autorisé : `gemini-free` uniquement.
- Les backends Google Cloud / Vertex / payants sont refusés par le générateur.
- `scripts/prepare-cloud-tts.sh` est volontairement neutralisé.
- La première préparation exige de confirmer que le projet de la clé est affiché **Free** dans Google AI Studio.
- Si un `GEMINI_FREE_PROJECT_ID` est fourni et que Cloud Billing est actif, la préparation s’arrête.
- Sur HTTP 429 / quota gratuit atteint, la génération sauvegarde son avancement et s’arrête. Relancer plus tard reprend sans refaire les fichiers existants.
- Aucune clé API n’est embarquée dans le jeu ni demandée aux joueurs.

## Voix candidates

- Algenib
- Achird
- Sulafat
- Leda

Les libellés de genre/style du manifeste sont des choix de casting d’Elenya, pas des classifications officielles de Google.

## Corpus

- 246 scènes jouables (+ scène technique)
- 1 269 variantes narratives
- 2 260 segments uniques
- 731 582 caractères par voix

Détails : `elenya-refonte-52.4/docs/voice-corpus-report.json` et `elenya-refonte-52.4/assets/voices/voice-corpus.json`.

## Cloud Shell — méthode gratuite

```bash
bash scripts/prepare-gemini-free.sh
npm run voice:previews
npm run voice:status
```

Le script demande une clé provenant d’un projet **Free** dans Google AI Studio. Elle est stockée uniquement dans `~/.config/elenya/gemini-free.key` avec permissions `600`, hors du dépôt.

### Générer Sulafat en priorité

```bash
npm run voice:generate
npm run voice:status
```

La commande est reprenable. Si le quota gratuit est atteint, elle s’arrête volontairement et tu relances la même commande plus tard.

### Une autre voix

```bash
node scripts/generate-full-voice-pack.mjs --backend=gemini-free --voice=Algenib
node scripts/generate-full-voice-pack.mjs --backend=gemini-free --voice=Achird
node scripts/generate-full-voice-pack.mjs --backend=gemini-free --voice=Leda
```

### Les quatre voix complètes

```bash
npm run voice:generate:all
```

C’est 9 040 fichiers au maximum ; en Free Tier cela peut demander plusieurs sessions/jours selon les quotas actifs du projet.

## Vérifications

```bash
npm test
npm run lint
npm run build
npm run voice:status
```

`npm run voice:verify` ne réussit que lorsque les quatre voix couvrent les 2 260 segments et possèdent leurs aperçus.

## Lecture dans le jeu

- Node / Railway : `/assets/voices/`
- Apps Script : fallback CDN GitHub vers `Sunstrader/elenya-52-audio`
- Segment manquant : fallback TTS français du navigateur

Le joueur n’utilise jamais l’API Gemini.
