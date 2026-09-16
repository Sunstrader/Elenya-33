# Estimation de production vocale — 15 septembre 2026

Cette estimation sert uniquement de garde-fou avant de lancer la génération. Elle dépend fortement du débit réel de lecture et des tarifs Google Cloud en vigueur.

## Volume calculé par le corpus

- 1 voix : 731 582 caractères, 2 260 fichiers, ~813 minutes d’audio avec l’hypothèse de 900 caractères/minute.
- 4 voix : 2 926 328 caractères, 9 040 fichiers, ~3251 minutes d’audio avec la même hypothèse.

## Ordre de grandeur Gemini 3.1 Flash TTS

Tarifs Google Cloud observés le 15/09/2026 : entrée texte 1 USD / million de tokens ; sortie audio 20 USD / million de tokens ; 25 tokens audio par seconde.

Avec les hypothèses ci-dessus :

- 1 voix : environ **25 USD**.
- 4 voix : environ **98 USD**.

Ce n’est pas un devis. Vérifier la page officielle avant la génération complète : https://cloud.google.com/text-to-speech/pricing

## Recommandation

1. Générer les 4 aperçus français.
2. Choisir la voix préférée.
3. Générer d’abord un pack complet d’une seule voix.
4. Ne générer les 3 autres packs complets que si le choix de voix par joueur vaut réellement le surcoût et le stockage.
