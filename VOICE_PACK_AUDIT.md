# Elenya 52.4.3 — audit Free Voice

## Sécurité coût

- Gemini 3.1 Flash TTS **Free Tier uniquement**.
- Backend `gemini-free` seul autorisé.
- Cloud/Vertex/payant explicitement bloqué.
- Préparation avec confirmation du projet `Free` dans AI Studio.
- Contrôle automatique `billingEnabled` si `GEMINI_FREE_PROJECT_ID` est fourni.
- Arrêt sur quota HTTP 429, sans fallback payant.
- Reprise idempotente : un fichier déjà présent n’est pas régénéré.
- Clé stockée hors dépôt ; aucune clé côté joueur.

## Corpus

- 246 scènes jouables.
- 1 269 variantes narratives.
- 2 260 segments uniques.
- 731 582 caractères par voix.
- 1 301 segments de narration.
- 550 textes de choix.
- 174 réponses de choix.
- 235 titres.

## Architecture

- Manifeste : `elenya-refonte-52.4/assets/voices/pack-manifest.json`.
- Format cible : OGG/Opus quand `ffmpeg` est disponible, WAV sinon.
- Node/Railway : `/assets/voices/`.
- Apps Script : CDN GitHub automatique.
- Segment absent : fallback TTS français du navigateur.

## Contrôles

- `npm test` inclut désormais `qa/free-tier-voice.cjs`.
- Ce test échoue si l’ancien endpoint Cloud TTS réapparaît, si le backend payant n’est plus neutralisé, ou si le manifeste n’est plus marqué `free-only`.
- `npm run voice:status` mesure la couverture réelle par voix.
