// V51.5.0.1.1 — Narrative UX Polish: semantic feedback/journal metadata; no morality color-coding.
/* ELENYA FROST — Moteur V51.5.0 « CORONA GLACIALIS — SEMANTIC NARRATIVE AUDIT & QA »
 * V50.4.0 RELATIONSHIP FREEDOM — présence physique ≠ verrou romantique; intimité avancée conserve ses seuils de lien.
 * VISUAL MASTER V50.2 — assets sélectionnés depuis Feuille 1/2/3/4/6/8; jsDelivr privilégié.
 * Base : V30.0.0 AAA FINAL + refonte des routes relationnelles
 * 
 * V52.3.5 — GALERIE COMPLÈTE (base narrative V51.7.6) :
 *   - Pass narratif AAA : mémoire corporelle d’Elenya, indices Kalthar, conséquences relationnelles
 *   - Relations comportementales renforcées : respect / liberté / possession / doute
 *   - Exclusivité stricte du compagnon : la fresque ne peut jamais appeler l’autre personnage
 *   - Poly conditionné par confiance mutuelle, jamais par simple cumul de jauges
 *   - Seeds de fins stabilisés et normalisés avant les scènes finales
 *   - QA de cohérence : flags contradictoires, compagnon impossible, transitions NG+
 *   - Métadonnées de mise en scène : emotionalBeat / memoryEcho / relationFocus
 *   - Versioning des sauvegardes et migration V36 → V50.1
 *
 * V36.0.0 — VERSION AAA ULTRA COMPLETE :
 *   - Nouvelles jauges : possession / memoire_kalthar / volonte
 *   - Système de timers unifié (décrément automatique)
 *   - Inventaire narratif léger (max 8 objets)
 *   - Réputation factions (ordre / culte / ombre / village)
 *   - Mémoire du Monde (globalFlags enrichis)
 *   - Nouveaux personnages : Seraphine, Veyra, Nomade, Mira
 *   - Acte V (Post-Trône) + 8+ nouvelles fins
 *   - Correction critique : timer.venin décrémenté
 *   - Helpers unifiés : _echo, hasItem, addRep, etc.
 *   - Système de présence narrative O/E/S + bascules fluides sans verrouillage de route
 *   - Solo habité : traces, échos, scènes exclusives et compagnons récupérables
 *   - Effet JOIN_COMPANION pour passer de Solo à O/E sans casser les anciens flags
 *   - Standards AAA : ≥200 mots scènes clés, ≥4 choix impactants
 *   - Routes relationnelles fluides dès l'Acte 1 : le choix de chute n'enferme plus la partie
 *   - Pont Alistair ↔ Kaelen après la fresque + mode triangle cohérent
 *   - Timers unifiés : suppression des décréments manuels doublons
 *   - QA renforcée : sauvegarde globale corrigée et jauges relationnelles normalisées
 * 
 * Rétrocompatibilité V26/V27/V30/V33/V35/V36 : conservée ; V50.1 sépare CLASSIQUE et NEW GAME+ et ajoute les couches relationnelles/échos
 * Note cible : AAA — architecture narrative/logicielle renforcée
 */
// V51.5.0 CONTINUITY & STATE — corrections de consolidation :
// - Legacy V27 retiré du DB actif; migration d’anciennes sauvegardes via V50_LEGACY_SCENE_ID_MAP.
// - Joutes actives consolidées hors section legacy; aucun stub court actif.
// - Versioning unifié BUILD_VERSION/SCHEMA_VERSION.
// - Payoffs ajoutés pour kaelen_a_dit_ton_monstre / alistair_a_promis_cage.
// - Avertissement possession à 20 avec possibilité de lâcher prise avant GAME OVER >=25.
// - Tri des triggers déterministe à priorité égale.
// - Conditions d’auberge basées sur relationAvailableO/E plutôt que flags jamais produits.


// =============================================================================
// NOTES DE DESIGN V27.0 (ne pas afficher en jeu)
// -----------------------------------------------------------------------------
// THÈSE : « On ne possède jamais ce qu’on aime. On ne sauve jamais ce qu’on enferme. »
// VOIX :
//   Kaelen  → cynisme tranchant, contrat, possessivité sans mots
//   Alistair → foi qui se fissure, cage dorée, tendresse dangereuse
//   Oraya   → culpabilité millénaire, gestes avant les mots
//   Lyra    → voix brisée, liberté terrifiante
//   Fen     → silence + sifflement ancien (Kalthar fragmenté)
//   Seraphine → glaciale, brillante, déjà brisée (sœur Alistair)
//   Veyra   → amère, sensuelle, cynisme de prêtresse déchue
//   Mira    → terre-à-terre, insolente, loyale (voie Solo)
//   Nomade  → quasi-mutisme, yeux vides, dernier fragment
// =============================================================================

// V51.7.6 — PACING & AGENCY:
 // - Respiration entre gros beats relationnels sans laisser la priorité des triggers choisir le partenaire.
 // - Si Kaelen et Alistair sont tous deux éligibles sur un hub, le joueur choisit qui approcher maintenant.
 // - L'autre opportunité est reportée (_romance_deferred_O/E), jamais supprimée.
 // - Les opportunités reportées réapparaissent sur des hubs de respiration (nuit isolée / bivouac tempête / portes).
 // - Aucun choix de partenaire n'est déduit automatiquement des jauges.

// V51.7.6 — NARRATIVE VOICE POLISH:
 // - Alistair : moins d'aveu explicatif, davantage de clé / sceau / silence / geste.
 // - Deferred O/E : reprend le vrai palier relationnel encore non vu au lieu d'un payoff court uniforme.
 // - Signatures secondaires renforcées (Séraphine, Veyra, Corona, Dette).
 // - Solo Acte 1 : mémoire corporelle Elenya/Fen renforcée, sans transformer Solo en romance de substitution.

// V51.7.6 — ACT I PLAYTEST FIX:
 // - Cendres Froides / Jalousie Souterraine : sprites strictement conditionnés au compagnon présent.
 // - La Triangulation : continuité physique corrigée après La Jonction des Routes.
 // - Cendres sous la Neige / Lisière : orientation unique Kaelen / Alistair / les deux,
 //   sans transformer le bivouac en menu de scènes à vider.
 // - Le choix "les deux" possède un vrai beat de trio, sans verrouiller les romances futures.
 // - Notifications de feedback de choix déplacées en haut de l'écran.

// ==========================================
// 1. POINTS D'ENTRÉE DU JEU
// ==========================================

function doGet(e) {
  const params = (e && e.parameter) || {};
  const reviewMode = String(params.review || '').toLowerCase();

  // V52.0.1 — accès agents/IA : endpoint JSON sans localStorage ni injection JS.
  if (reviewMode === 'api' || reviewMode === 'json') {
    return reviewerApiGet_(e);
  }

  // Interface Reviewer humaine + mode agent stateless.
  // V52.0.2 : les paramètres sont injectés côté serveur dans le template.
  // Important : dans HtmlService, le document rendu peut vivre dans un iframe
  // googleusercontent dont location.search ne reflète pas forcément l'URL /exec.
  if (reviewMode === '1' || reviewMode === 'guest' || reviewMode === 'review' ||
      reviewMode === 'annotate' || reviewMode === 'agent' || reviewMode === 'ai') {
    const tpl = HtmlService.createTemplateFromFile('Reviewer');
    const boot = {
      review: reviewMode,
      name: String(params.name || params.guest || ''),
      profile: String(params.profile || ''),
      gid: String(params.gid || params.guestId || ''),
      contact: String(params.contact || ''),
      stateless: String(params.stateless || '') === '1',
      agent: reviewMode === 'agent' || reviewMode === 'ai'
    };
    // Évite qu'une valeur utilisateur puisse fermer une balise <script>.
    tpl.reviewerBootJson = JSON.stringify(boot).replace(/</g, '\\u003c');
    return tpl
      .evaluate()
      .setTitle(boot.agent
        ? 'Elenya Frost — Reviewer Agent IA'
        : 'Elenya Frost — Annotation invitée')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }

  return HtmlService.createTemplateFromFile('V12_Jeu')
    .evaluate()
    .setTitle('Elenya Frost — Corona Glacialis')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}


/**
 * V52 / Reviewer API V3.3 — entrée POST pour les agents IA.
 * Les écritures exigent un agentId + token générés par le propriétaire.
 */
function doPost(e) {
  const params = (e && e.parameter) || {};
  let reviewMode = String(params.review || '').toLowerCase();

  // Secours : certains clients POSTent un JSON sans conserver la query string.
  if (!reviewMode) {
    try {
      const body = JSON.parse(String(e && e.postData && e.postData.contents || '{}'));
      reviewMode = String(body.review || body.mode || '').toLowerCase();
    } catch (err) {}
  }

  if (reviewMode === 'api' || reviewMode === 'json' || !reviewMode) {
    return reviewerApiPost_(e);
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      ok:false,
      error:'UNSUPPORTED_POST_MODE',
      review:reviewMode
    }, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚔️ Elenya Frost')
    .addItem('Lancer le Jeu — AAA', 'openGameModal')
    .addItem('Réinitialiser Partie', 'serverResetGame')
    .addToUi();
}

function openGameModal() {
  const html = HtmlService.createTemplateFromFile('V12_Jeu')
    .evaluate()
    .setWidth(1000)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, '❄️ Elenya Frost — Corona Glacialis');
}

// ==========================================
// 2. CONFIGURATION DU MIDDLEWARE (TRIGGERS)
// ==========================================



// V52 — inclusion HTML modulaire.
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
