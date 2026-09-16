#!/usr/bin/env bash
set -euo pipefail

KEY_DIR="$HOME/.config/elenya"
KEY_FILE="$KEY_DIR/gemini-free.key"
MODEL="${ELENYA_TTS_MODEL:-gemini-3.1-flash-tts-preview}"

mkdir -p "$KEY_DIR"
chmod 700 "$KEY_DIR"

echo "Elenya — préparation Gemini TTS FREE-ONLY"
echo "-----------------------------------------"
echo "Cette build refuse les backends Cloud/Vertex payants."
echo "Le projet associé à la clé doit être affiché 'Free' dans Google AI Studio."
echo "Clés AI Studio : https://aistudio.google.com/app/api-keys"
echo

# Si un ID de projet est fourni, on refuse automatiquement un projet facturé.
PROJECT_ID="${GEMINI_FREE_PROJECT_ID:-${GOOGLE_CLOUD_PROJECT:-}}"
if command -v gcloud >/dev/null 2>&1 && [[ -n "$PROJECT_ID" ]]; then
  BILLING="$(gcloud billing projects describe "$PROJECT_ID" --format='value(billingEnabled)' 2>/dev/null || true)"
  if [[ "$BILLING" == "True" || "$BILLING" == "true" ]]; then
    echo "STOP : la facturation Cloud est active sur le projet '$PROJECT_ID'." >&2
    echo "Pour Elenya zéro dépense, utilise une clé d'un projet AI Studio affiché Free." >&2
    exit 4
  elif [[ "$BILLING" == "False" || "$BILLING" == "false" ]]; then
    echo "✓ Projet '$PROJECT_ID' sans facturation Cloud active."
    export ELENYA_FREE_TIER_CONFIRMED=1
  fi
fi

if [[ "${ELENYA_FREE_TIER_CONFIRMED:-0}" != "1" ]]; then
  echo "Vérifie dans AI Studio que le projet de la clé affiche exactement : Free."
  read -r -p "Tape GRATUIT pour confirmer (rien d'autre ne continuera) : " CONFIRM
  if [[ "$CONFIRM" != "GRATUIT" ]]; then
    echo "Annulé : aucune requête TTS n'a été envoyée."
    exit 5
  fi
fi

KEY="${GEMINI_API_KEY:-}"
if [[ -z "$KEY" && -s "$KEY_FILE" ]]; then
  KEY="$(tr -d '\r\n' < "$KEY_FILE")"
fi
if [[ -z "$KEY" ]]; then
  read -r -s -p "Colle la clé API du projet FREE (elle restera uniquement dans Cloud Shell) : " KEY
  echo
fi
if [[ -z "$KEY" ]]; then
  echo "Clé vide." >&2
  exit 6
fi

# Vérification non-générative : disponibilité du modèle, sans produire d'audio.
HTTP_CODE="$(curl -sS -o /tmp/elenya-gemini-model.json -w '%{http_code}' \
  -H "x-goog-api-key: $KEY" \
  "https://generativelanguage.googleapis.com/v1beta/models/$MODEL" || true)"
if [[ "$HTTP_CODE" != "200" ]]; then
  echo "La clé n'accède pas au modèle $MODEL (HTTP $HTTP_CODE)." >&2
  cat /tmp/elenya-gemini-model.json 2>/dev/null || true
  exit 7
fi

printf '%s' "$KEY" > "$KEY_FILE"
chmod 600 "$KEY_FILE"
unset KEY GEMINI_API_KEY

echo "✓ Clé FREE validée pour $MODEL."
echo "✓ Stockée hors du projet : $KEY_FILE (permissions 600)."
echo "✓ Aucun secret ne sera embarqué dans le jeu ni envoyé aux joueurs."
echo
echo "Étape sûre suivante : npm run voice:previews"
