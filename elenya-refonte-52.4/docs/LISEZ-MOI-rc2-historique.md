# Elenya — 52.4.0-rc2

Cette archive est une **version intermédiaire de la refonte**, basée sur le projet 52.3.5 et le Reviewer v4. Les 100 idées ont bien été enregistrées avec la note 5/5. Elles ne sont pas toutes terminées : le détail point par point est dans `docs/suivi-100-points.md` et les réponses réutilisables dans `docs/plan-100-reponses.json`.

## Ce qui change réellement

- Huit décors asymétriques créés, publiés sur GitHub et affectés à des scènes cohérentes. La fresque d’origine est préservée. Le décor avec des lances de glace n’apparaît qu’après le choix correspondant.
- Cinq nouvelles scènes NG+, soit 26 scènes NG+ au total. Les 72 choix de cette campagne ont une réponse propre. Les chemins de contrat, de sceau et d’amitié ont des effets persistants. Deux succès secrets accompagnent ces choix.
- Les décisions sont définitives pendant la partie afin de préserver leur poids narratif ; une sauvegarde est créée avant chaque décision pour garder un point de reprise volontaire.
- Sauvegarde avant chaque décision ; import qui fusionne les découvertes ; sauvegardes serveur fragmentées et conservées en cas d’échec pendant l’écriture. Les trois emplacements manuels peuvent être remplacés.
- Narrateur français facultatif, volume par défaut prioritaire sur les autres sons, mise en sourdine temporaire de la musique et des ambiances pendant la lecture, contraste renforcé, commandes flèches/Entrée, interface masquable et défilement adapté aux longues listes.
- Rotation musicale entre les deux pistes d’une ambiance lorsqu’un morceau se termine ; continuité entre scènes proches. Lecteur des morceaux découverts dans la galerie et l’accueil.
- Carte des parcours et codex retirés du menu principal pour alléger l’écran d’accueil ; ils restent accessibles dans le panneau discret « Options de lecture » pendant une partie. Les noms des scènes inconnues restent masqués.
- Le choix de rester avec Fen mène directement au matin et à la scène de l’aubergiste ; le flashback parasite, la rencontre de Mira et la scène solo automatique ne s’intercalent plus à cet endroit. Ces contenus restent réservés à leurs moments narratifs ultérieurs.
- La fin ne quitte plus automatiquement l’écran après vingt secondes. Le premier indice de Lyra ne répète plus sa présentation suivante.

Le code comporte **247 scènes et 580 choix**, dont les choix d’épilogue. Le catalogue de consultation exclut la scène technique d’erreur. Les **33 vidéos de fin, trois CG romantiques et dix morceaux existants** gardent leurs références.

## Vérifications effectuées et limites

Les contrôles utilisent le vrai moteur du projet dans Node, avec les services Google simulés : vérification de syntaxe, contrats d’effets, destinations, régressions existantes, anciennes sauvegardes, écriture interrompue, choix cachés, réponses de NG+ et reprise du texte. Des tests séparés contrôlent les sauvegardes, les choix et l’import avec un DOM simulé.

**1 547 parcours simulés n’ont rencontré aucun blocage** : 700 parcours variés et 847 recherches ciblées. Ils ont atteint **19 fins classiques et les six fins NG+**, soit **25 sur 33**. Les huit restantes sont listées dans `qa/resultats-fins-ciblees.json` ; ce résultat ne prouve ni leur inaccessibilité ni leur accessibilité complète.

**Aucune recette dans un vrai navigateur ou sur le déploiement Google n’a été effectuée.** Chromium était absent et son téléchargement a expiré. Il reste notamment à contrôler le rendu mobile, le chargement réel de tous les médias, l’écoute et les voix disponibles sur les appareils cibles.

La refonte complète du scénario, du lore, des romances et de tous les sprites n’est pas achevée. Les variantes visuelles supplémentaires, les thèmes de personnages, la fresque évolutive et plusieurs autres ajouts sont signalés dans le suivi. Background Music a renvoyé `daily_limit` : **aucun nouveau morceau n’a été généré**. Le narrateur utilise la synthèse vocale disponible dans le navigateur et privilégie une voix française locale ; certaines voix nécessitent Internet. [Documentation SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices).

## Fichiers et publication

`project/` contient le code Apps Script. `docs/` contient tes réponses et le suivi. `qa/` contient les tests et leurs résultats. Les médias sont hébergés dans [le commit des huit nouveaux décors](https://github.com/Sunstrader/elenya-3d-assets/commit/b02779d6f91076b3bfedc96622b311255ce7f1ac), avec empreintes de vérification dans `docs/medias-publies.json`.

**Seuls les nouveaux décors sont publiés. Le code n’a pas été envoyé ni déployé sur Google Apps Script.** Cette archive ne remplace donc pas ton jeu en ligne.

## Préparer cette version dans Cloud Shell

Envoie `elenya-52.4.0-rc2.zip` dans ton dossier personnel Cloud Shell, puis :

```bash
cd ~
unzip elenya-52.4.0-rc2.zip -d elenya-52.4.0-rc2
cd ~/elenya-52.4.0-rc2/elenya-refonte-52.4
node qa/check.cjs
node qa/client-state.cjs
```

Pour conserver une copie du code actuellement en ligne, dans un nouveau dossier :

```bash
elenya_backup_dir=$(mktemp -d "$HOME/elenya-avant-refonte.XXXXXX")
cd "$elenya_backup_dir"
clasp clone 1IEWLRwRA8i5MYtkMOsmTkOn1YTZ4RiJmiMIzMhXhmKnwPiVkoD7rtyo0
```

Pour envoyer cette version de travail dans l’éditeur Apps Script :

```bash
cd ~/elenya-52.4.0-rc2/elenya-refonte-52.4/project
clasp push --force
clasp open-script
```

Si la session Google est expirée, `clasp login` permet de la rétablir. Le projet contient déjà sa configuration `.clasp.json`. L’envoi du code et la mise à jour d’un déploiement sont deux opérations distinctes. [Guide officiel clasp](https://developers.google.com/apps-script/guides/clasp).

Pour tester le code envoyé, utilise **Déployer → Tester les déploiements**. Après validation, **Déployer → Gérer les déploiements → Modifier → Nouvelle version → Déployer** met à jour le déploiement existant. Conserve son URL pour garder le même contexte de stockage du navigateur. [Gestion des déploiements Apps Script](https://developers.google.com/apps-script/concepts/deployments).

Avant de changer de version, le bouton **Sauvegardes → Exporter** permet de conserver une copie personnelle de la partie, des succès et de la galerie. L’arbre comptabilise les choix parcourus depuis la mise à jour, pas des choix anciens dont aucune trace n’a été sauvegardée.
