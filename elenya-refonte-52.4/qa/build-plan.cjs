// Archive des 100 idées et des décisions explicitement transmises dans le chat.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
let domains;
const planHtmlPath = path.resolve(__dirname, '../../plan-optimisation-elenya.html');
const fallbackHtmlPath = '/workspace/plan-optimisation-elenya.html';
const jsonPath = path.resolve(__dirname, '../docs/plan-100-reponses.json');

if (fs.existsSync(planHtmlPath) || fs.existsSync(fallbackHtmlPath)) {
  const p = fs.existsSync(planHtmlPath) ? planHtmlPath : fallbackHtmlPath;
  const original = fs.readFileSync(p, 'utf8');
  const match = original.match(/const domains=(\[[\s\S]*?\n\]);/);
  if (!match) throw new Error('Catalogue introuvable');
  domains = vm.runInNewContext('(' + match[1] + ')');
} else if (fs.existsSync(jsonPath)) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const domainMap = new Map();
  data.points.forEach(pt => {
    if (!domainMap.has(pt.domain)) domainMap.set(pt.domain, []);
    domainMap.get(pt.domain).push([pt.originalPriority, pt.idea]);
  });
  domains = Array.from(domainMap.entries());
} else {
  throw new Error('Catalogue introuvable');
}
const specifics={
 '0-5':'Montrer les conséquences du gel dans la scène suivante : sol gelé, arbalète et personnages réellement gelés dans le récit.',
 '0-7':'Les variantes doivent rester cohérentes avec le lieu et le moment, notamment dans la forêt noire avec la sirène.',
 '0-9':'Une cinématique par choix serait lourde ; choisir librement les moments où le mouvement apporte quelque chose.',
 '1-0':'La musique doit suivre l’ambiance et rester cohérente lors du passage d’une scène à l’autre.',
 '1-2':'Conserver la continuité musicale entre scènes proches.',
 '1-5':'Les thèmes des personnages peuvent annoncer subtilement une direction de fin.',
 '2-0':'Associer si possible une présence visuelle aux ambiances sonores.',
 '2-1':'Sons de boutons cohérents, par exemple du givre ; ne pas annoncer le personnage ou la scène suivante.',
 '2-2':'Un son avec un effet visuel peut remplacer utilement une vidéo à chaque choix.',
 '2-3':'Les volumes séparés doivent être dans les paramètres.',
 '3-3':'Tenir compte du popup de conséquences déjà présent.',
 '3-5':'Ajouter des annonces seulement si elles servent réellement le jeu.',
 '5-9':'Revoir la NG+ : trop de choix convergent sans réponse propre à la décision.',
 '7-9':'L’arbre doit aussi être consultable depuis l’accueil.',
 '8-4':'Ajouter si possible un narrateur qui lit la scène, pour les personnes malvoyantes ou qui préfèrent écouter.',
 '8-8':'Privilégier des commandes simples : flèches pour se déplacer et Entrée pour valider ; aucun raccourci obligatoire.',
 '9-4':'Appliquer la même exigence de vraies conséquences et de contenu à la NG+.'
};
const groups=[
 [
 ['partiel','Huit nouveaux décors asymétriques publiés ; tous les autres cadrages ne sont pas refaits.'],
 ['partiel','Mezzanine oblique, vue latérale de forêt, contrepoint du trône, combe en plongée.'],
 ['partiel','Autel, auberge, serre, bibliothèque et catacombes différenciés ; direction artistique globale encore à harmoniser.'],
 ['partiel','Huit décors remplacés dans des scènes ciblées ; pas de nouveaux sprites complets.'],
 ['présent','33 vidéos de fins, trois CG romantiques et vidéo du duel conservées ; aucune nouvelle vidéo dans cette livraison.'],
 ['implémenté','Givre persistant après le choix du sol ; teinte des compagnons dans la scène où ils sont gelés ; décor des lances distinct.'],
 ['partiel','Éléments de décor hors cadre et plans asymétriques ; pas de nouveaux personnages au premier plan.'],
 ['restant','Variantes jour/nuit et avant/après supplémentaires non produites. Le ravin à lances n’est pas montré avant ce choix.'],
 ['partiel','Effets 2.5D existants conservés, nappe de givre ajoutée ; cheveux/tissus non refaits.'],
 ['présent','Cinématiques existantes préservées ; effets visuels/sonores pour les choix courants.']
 ],[
 ['partiel','Routage par ambiance conservé ; cohérence musicale exhaustive de chaque scène non validée à l’écoute.'],
 ['implémenté','Rotation lors de la fin naturelle d’une piste, en plus des changements d’ambiance.'],
 ['implémenté','Une scène de même ambiance conserve le morceau en cours.'],
 ['implémenté','Fondus existants consolidés et reprise après galerie corrigée.'],
 ['présent','Les thèmes d’action et de fin restent attachés à ces ambiances.'],
 ['bloqué','La génération d’un thème de personnage a renvoyé daily_limit dans Background Music ; aucun nouveau morceau produit.'],
 ['bloqué','Aucune paire calme/intense de nouveau thème produite. Les dix MP3 fournis restent la bande-son.'],
 ['partiel','Changements pilotés par la scène ; pas de synchronisation au mot ou à une mesure musicale.'],
 ['implémenté','Lecteur des morceaux découverts accessible depuis la galerie et l’accueil.'],
 ['implémenté','Un morceau se débloque lorsqu’il a effectivement démarré, pas au simple chargement d’une scène.']
 ],[
 ['partiel','Ambiances synthétiques de vent et souffle filtré, effets de glace ; pas encore une banque naturaliste complète.'],
 ['implémenté','Clics discrets de givre, indépendants du futur choix narratif.'],
 ['partiel','Signatures pour deux actions de combat et effets de gel ; tous les combats ne sont pas sonorisés individuellement.'],
 ['implémenté','Quatre volumes : musique, ambiance, effets, narrateur.'],
 ['partiel','Lecteur de galerie exclusif, voix annulée au changement, source d’ambiance précédente arrêtée ; écoute réelle à contrôler.'],
 ['partiel','Familles d’ambiances par type de lieu ; pas encore une signature unique par lieu.'],
 ['restant','Pas de mixage progressif fondé sur la tension narrative.'],
 ['partiel','Lieux calmes sans source d’ambiance ; silences dramatiques sur mesure restant à écrire et mixer.'],
 ['partiel','Deux intensités de glace ; pas de signature complète pour chaque pouvoir.'],
 ['implémenté','Vibrations légères désactivées par défaut, activables si le navigateur les prend en charge.']
 ],[
 ['partiel','Contrôles de continuité existants, 1 547 parcours simulés et correction d’un double premier contact avec Lyra ; pas de relecture chronologique exhaustive.'],
 ['partiel','Première scène de Lyra réécrite pour ne plus répéter sa présentation suivante.'],
 ['implémenté','Objectif par acte, distinct en classique et NG+, consultable dans le codex en jeu.'],
 ['implémenté','72 réponses NG+, cinq branches, effets de glace et conséquences reportées dans la finale NG+.'],
 ['partiel','Répétition de Lyra supprimée ; pas de réduction globale des cinq actes.'],
 ['partiel','L’indice de Lyra prépare la voix utilisée comme arme ; audit global des annonces restant.'],
 ['implémenté','Branches archives/sceau/cendres et scènes séparées Kaelen/Alistair en NG+.'],
 ['implémenté','Choix entre conserver la preuve, protéger les noms et détruire les documents.'],
 ['partiel','Amitié, contrat et renoncement au pouvoir pris en compte avant la fin NG+ ; autres fins non réécrites.'],
 ['présent','Déclencheurs conditionnels du moteur conservés et testés par les contrôles préexistants.']
 ],[
 ['partiel','Révélations existantes conservées ; aucun nouveau canon global sur l’origine du givre.'],
 ['partiel','Contrats des Confrères et sceau de l’Ordre développés dans les nouvelles branches.'],
 ['partiel','Renoncement au givre rappelé avant la finale NG+ ; bible complète des pouvoirs restante.'],
 ['partiel','Première rencontre de Lyra et retour au trône détruit corrigés ; pas toutes les contradictions des cinq actes.'],
 ['implémenté','Entrées courtes du codex débloquées par découverte ; nouvelles informations dans des échanges et décisions.'],
 ['partiel','Liste des scènes découvertes classée par acte ; pas une chronologie absolue des trois siècles de lore.'],
 ['partiel','Dix entrées initiales ; tous les personnages et lieux ne sont pas encore documentés.'],
 ['implémenté','Branches d’archives en NG+ et entrée des contrats après découverte.'],
 ['présent','Témoignages divergents préexistants conservés ; pas de nouveau corpus de légendes par faction.'],
 ['restant','Aucune intrigue de suite ajoutée sans consolidation préalable du canon.']
 ],[
 ['partiel','Motivations de liberté de Kaelen et d’Alistair développées ; revue de tous les personnages restante.'],
 ['partiel','Nouveaux dialogues distincts : réserve ironique de Kaelen, aveu et question chez Alistair.'],
 ['implémenté','Accord d’égal à égal ou d’amitié suivi d’une réponse propre et d’effets persistants.'],
 ['partiel','L’amitié explicite bloque la proposition amoureuse finale ; audit complet des anciennes romances restant.'],
 ['partiel','Premier indice de Lyra mieux relié au sauvetage ; autres rôles secondaires conservés.'],
 ['implémenté','Documents de la dette héritée et mécanisme du sceau accessibles sur des branches facultatives.'],
 ['présent','Conflits et réactions croisées existants conservés.'],
 ['partiel','Documents et devoirs hérités approfondis ; pas un nouveau secret pour chaque personnage.'],
 ['partiel','Gel visuel conforme aux flags de la scène ; tenues et blessures dessinées restant à produire.'],
 ['implémenté','Cinq scènes inédites et réponses immédiates pour les 72 choix NG+.']
 ],[
 ['partiel','Étape de discussion et limites personnelles ajoutées en NG+ ; progression classique non entièrement réécrite.'],
 ['partiel','La présence en NG+ ne vaut plus automatiquement promesse romantique après les nouvelles scènes d’amitié.'],
 ['implémenté','Valeurs numériques du HUD masquées ; retours narratifs conservés.'],
 ['partiel','Nouvelles scènes spécifiques aux deux partenaires ; travail global sur chaque romance restant.'],
 ['présent','Fins et épilogues existants conservés, sans prétendre à une nouvelle conclusion pour chaque romance secondaire.'],
 ['présent','Réactions croisées du moteur existant conservées et contrôles de régression passés.'],
 ['partiel','Discussions de couple/limites en NG+ ; aucune série complète d’après-couple ajoutée.'],
 ['implémenté','L’amitié en NG+ permet de poursuivre la campagne sans fin immédiate.'],
 ['présent','Route multiple conditionnelle préservée ; pas de cumul automatique de points présenté comme consentement.'],
 ['partiel','Conséquences nouvelles avant la finale NG+ ; les épilogues classiques restent ceux de la base.']
 ],[
 ['partiel','Contrats d’effets, choix cachés et nouveaux choix testés ; toutes les combinaisons des 580 choix ne sont pas exhaustivement parcourues.'],
 ['partiel','Nouveaux choix explicites et métadonnées existantes ; pas de balisage systématique de chaque réplique ancienne.'],
 ['partiel','Convergences NG+ dotées de réponses et effets distincts ; cinq branches ajoutées. La convergence n’est pas supprimée lorsqu’elle reste utile.'],
 ['présent','Instantanés internes conservés pour les sauvegardes et la compatibilité ; le retour arrière n’est plus exposé afin de préserver le poids des choix.'],
 ['implémenté','Sauvegarde locale avant chaque choix, recharge accessible depuis les sauvegardes.'],
 ['restant','Aucun compte à rebours ajouté : il reste à écrire ses conséquences et à vérifier l’accessibilité avec le narrateur.'],
 ['présent','Conditions de mémoire et de flags existantes conservées ; nouveaux documents alimentent la mémoire.'],
 ['présent','Conditions serveur sur relations et jauges maintenues et refus de choix non disponible testé.'],
 ['implémenté','La partie est désormais sans retour arrière par défaut ; les sauvegardes manuelles restent accessibles.'],
 ['implémenté','Carte depuis l’accueil et le jeu, titres inconnus masqués et liens parcourus repérés.']
 ],[
 ['partiel','Syntaxe et logique de certains contrôles testées ; aucun test de clic dans un navigateur réel n’a pu être exécuté.'],
 ['partiel','Barre compacte défilante, panneaux et choix adaptatifs ; validation réelle Android/iOS restante.'],
 ['présent','Journal uniquement ouvert sur commande ; interception des raccourcis derrière les panneaux corrigée.'],
 ['implémenté','Texte redimensionnable, défilement des longues listes de choix, contraste renforcé.'],
 ['implémenté','Historique et affichage instantané conservés ; lecture automatique des simples Continuer et narrateur facultatif ajoutés.'],
 ['implémenté','Quatre tailles existantes ; correction du style qui pouvait neutraliser leur effet.'],
 ['implémenté','Contraste renforcé dans les paramètres.'],
 ['implémenté','Masquage de l’interface avec bouton de réapparition.'],
 ['implémenté','Flèches haut/bas et Entrée ; Espace ne choisit plus arbitrairement la première réponse.'],
 ['présent','Curseur de vitesse du texte conservé ; vitesse de narration séparée.']
 ],[
 ['partiel','33 fins présentes et destinations valides ; 25 atteintes par parcours simulés. Huit restent à valider par un parcours complet.'],
 ['présent','33 vidéos et trois CG conservées ; pas de validation à l’écran de chaque média lors de cette passe.'],
 ['partiel','Progression et routes connues dans la carte ; indices individualisés pour toutes les fins non ajoutés.'],
 ['implémenté','Import fusionné, anciens formats acceptés, sauvegardes serveur fragmentées avec écriture protégée.'],
 ['implémenté','Cinq nouvelles scènes, choix propres, amitiés explicites et deux succès secrets.'],
 ['implémenté','Compteurs de scènes, fins et choix découverts dans la carte.'],
 ['implémenté','Une mémoire sans chaînes et La place d’un ami, titres masqués tant que verrouillés.'],
 ['restant','Fresque originale préservée ; évolution graphique selon les fins non ajoutée.'],
 ['restant','Aucun commentaire de création débloqué à 100 % ajouté.'],
 ['partiel','NG+ reste conditionnée aux neuf fins majeures ; pas de nouvelle fin ultime supplémentaire dans cette livraison.']
 ]
];
if(domains.length!==10||groups.some(g=>g.length!==10))throw new Error('Le plan doit contenir 100 points');
const rows=domains.flatMap(([domain,ideas],di)=>ideas.map(([priority,idea],i)=>({id:String(di+1).padStart(2,'0')+'.'+String(i+1).padStart(2,'0'),domain,number:i+1,idea,originalPriority:priority,score:5,scoreMeaning:'Idée beaucoup aimée',carteBlanche:true,remark:specifics[di+'-'+i]||'Carte blanche pour la mise en œuvre.',remarkIsReformulated:true,status:groups[di][i][0],evidence:groups[di][i][1]})));
const report={project:'Elenya',release:'52.4.0-rc2',date:'2026-09-11',source:'100 réponses explicites du propriétaire dans le chat ; remarques spécifiques reformulées fidèlement.',meaning:'5/5 mesure l’adhésion à l’idée, pas son taux de réalisation.',summary:{approved:100,ratings:100,byStatus:rows.reduce((o,r)=>(o[r.status]=(o[r.status]||0)+1,o),{})},points:rows};
fs.mkdirSync(path.join(__dirname,'../docs'),{recursive:true});fs.writeFileSync(path.join(__dirname,'../docs/plan-100-reponses.json'),JSON.stringify(report,null,2));
let md='# Elenya — suivi des 100 réponses\n\n**Les 100 idées sont approuvées à 5/5. Ce score indique combien l’idée est aimée ; ce n’est pas un score d’avancement.**\n\nVersion 52.4.0-rc2 du 11 septembre 2026. Les remarques sont reformulées pour conserver les contraintes dans le projet.\n\n**La refonte complète des 100 points n’est pas terminée.** « Implémenté » signifie présent dans ce code ; les contrôles d’interface restent à valider dans les navigateurs cibles. « Présent » désigne un élément déjà dans la base, conservé ici.\n\n';
for(const domain of domains.map(d=>d[0])){md+='## '+domain+'\n\n';for(const r of rows.filter(r=>r.domain===domain))md+=`### ${r.id} — ${r.idea}\n\nNote : **5/5** · Carte blanche : oui · État : **${r.status}**\n\n${r.remark}\n\nRéalisation : ${r.evidence}\n\n`;}
md+='## Limites rencontrées\n\n- Background Music : réponse daily_limit, aucun nouveau thème généré.\n- La tâche de création de variantes supplémentaires a été interrompue par une limite d’utilisation ; huit décors utilisables sont néanmoins publiés.\n- Chromium absent et téléchargement expiré ; tests moteur/état client exécutés, aucune recette réelle mobile ou navigateur déclarée.\n- Publication des nouveaux médias sur GitHub réussie. Aucun déploiement du code sur Google Apps Script effectué.\n';
fs.writeFileSync(path.join(__dirname,'../docs/suivi-100-points.md'),md);console.log(report.summary);
