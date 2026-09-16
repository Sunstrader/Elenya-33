# Pack vocal Elenya

Cette version est **offline-first** pour la narration : aucune clé Gemini n’est demandée aux joueurs.

## Voix candidates
- Algenib — masculine, grave / rocailleuse
- Achird — masculine, amicale
- Sulafat — féminine, chaude
- Leda — féminine, jeune / claire

Les aperçus doivent être générés en français dans `previews/` avec le script batch. S’ils manquent, l’interface utilise explicitement une voix française du navigateur comme secours.

`pack-manifest.json` contient `entries`, un dictionnaire `sha256_… -> fichier`. Les segments pré-générés peuvent être ajoutés sous `segments/<voix>/...`. Si un segment manque, le jeu bascule sur la synthèse française du navigateur au lieu d’appeler une API.
