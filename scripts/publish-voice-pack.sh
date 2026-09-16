#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Ce dossier n'est pas un clone Git. Clone d'abord Sunstrader/elenya-52-audio, puis recopie le pack généré." >&2
  exit 2
fi
git add elenya-refonte-52.4/assets/voices elenya-refonte-52.4/docs/voice-corpus-report.json
if git diff --cached --quiet; then
  echo "Aucun changement vocal à publier."
  exit 0
fi
git commit -m "Ajoute/met à jour le pack vocal français Elenya 52.4.3 Free Voice"
git push origin HEAD
printf '\nPack vocal publié. Apps Script le chargera via le CDN GitHub après propagation.\n'
