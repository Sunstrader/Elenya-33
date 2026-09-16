function _parseDynamicText(text, state) {
  let output = text;
  const regex = /{if:(flags|gauges|timers).([^>|<|=]+)(?:([>|<|=]+)(\d+))?}([\s\S]*?)(?:{else}([\s\S]*?))?{endif}/g;
  while (regex.test(output)) {
    output = output.replace(regex, (match, type, key, op, val, tT, tF) => {
      let sV = type === 'flags' ? state.flags.includes(key) : (state[type][key] || 0);
      let met = op ? (
        op === '>' ? sV > val :
        op === '<' ? sV < val :
        op === '>=' ? sV >= val :
        op === '<=' ? sV <= val :
        op === '=' ? sV == val :
        sV == val
      ) : (type === 'flags' ? sV : !!sV);
      return met ? tT : (tF || "");
    });
  }
  return output;
}

function checkRequirements(requires, state) {
  if (!requires) return true;
  for (const [key, cond] of Object.entries(requires)) {
    const [type, name] = key.split('.');
    const val = (state[type] && state[type][name]) || 0;
    if (cond.max !== undefined && val > cond.max) return false;
    if (cond.min !== undefined && val < cond.min) return false;
  }
  return true;
}

function hasAnyFlag(state, ...flags) {
  if (!state || !Array.isArray(state.flags)) return false;
  return flags.some(f => state.flags.includes(f));
}

function hasAllFlags(state, ...flags) {
  if (!state || !Array.isArray(state.flags)) return false;
  return flags.every(f => state.flags.includes(f));
}

function resolveSprites(gs) {
  if (!gs || typeof gs.hasFlag !== 'function') return { left: null, right: null };
  const left = (gs.hasFlag('kaelen_perdu') || gs.hasFlag('kaelen_perdu_definitif') || gs.hasFlag('kaelen_mort')) ? null : 'Kaelen';
  const right = (gs.hasFlag('alistair_perdu') || gs.hasFlag('alistair_perdu_definitif') || gs.hasFlag('alistair_mort') || gs.hasFlag('alistair_emprisonne')) ? null : 'Alistair';
  return { left, right };
}


// ===== V40.3 : PRÉSENCE PHYSIQUE ≠ RELATION ROMANTIQUE =====
function _ctxHasFlag(ctx, flag) {
  if (!ctx) return false;
  if (typeof ctx.hasFlag === 'function') return !!ctx.hasFlag(flag);
  return Array.isArray(ctx.flags) && ctx.flags.includes(flag);
}
function _ctxGauge(ctx, gauge) {
  if (!ctx) return 0;
  if (typeof ctx.getGauge === 'function') return Number(ctx.getGauge(gauge) || 0);
  return Number((ctx.gauges && ctx.gauges[gauge]) || 0);
}
function relationAvailableO(ctx) {
  return _ctxHasFlag(ctx,'avec_ombre')
      || _ctxHasFlag(ctx,'relation_O_ouverte_acte1')
      || _ctxHasFlag(ctx,'focus_romantique_O')
      || _ctxHasFlag(ctx,'kaelen_retrouvailles_choisi')
      || _ctxGauge(ctx,'lien_O') >= 3;
}
function relationAvailableE(ctx) {
  return _ctxHasFlag(ctx,'avec_eclaireur')
      || _ctxHasFlag(ctx,'relation_E_ouverte_acte1')
      || _ctxHasFlag(ctx,'focus_romantique_E')
      || _ctxHasFlag(ctx,'alistair_retrouvailles_choisi')
      || _ctxGauge(ctx,'lien_E') >= 3;
}

// V50.4.0 — présence physique : un choix ponctuel (ex. chute) ne verrouille pas l'autre romance.
function companionPresentO(ctx) {
  return !_ctxHasFlag(ctx,'kaelen_mort') && !_ctxHasFlag(ctx,'kaelen_perdu') && !_ctxHasFlag(ctx,'kaelen_perdu_definitif');
}
function companionPresentE(ctx) {
  return !_ctxHasFlag(ctx,'alistair_mort') && !_ctxHasFlag(ctx,'alistair_perdu') && !_ctxHasFlag(ctx,'alistair_perdu_definitif') && !_ctxHasFlag(ctx,'alistair_emprisonne');
}

// ===== V51 — CONDITIONS SÉMANTIQUES =====
// Une seule grammaire pour distinguer présence, ouverture relationnelle et intimité.
const COND = Object.freeze({
  companionPresentO: (gs) => companionPresentO(gs),
  companionPresentE: (gs) => companionPresentE(gs),
  solo: (gs) => _ctxHasFlag(gs,'voie_solo') || _ctxHasFlag(gs,'voie_solo_profonde'),
  canApproachO: (gs) => companionPresentO(gs),
  canApproachE: (gs) => companionPresentE(gs),
  romanceOpenO: (gs) => companionPresentO(gs) && relationAvailableO(gs),
  romanceOpenE: (gs) => companionPresentE(gs) && relationAvailableE(gs),
  canIntimateO: (gs, minLien=4) => companionPresentO(gs) && relationAvailableO(gs) && _ctxGauge(gs,'lien_O') >= minLien,
  canIntimateE: (gs, minLien=4) => companionPresentE(gs) && relationAvailableE(gs) && _ctxGauge(gs,'lien_E') >= minLien,
  domination: (gs) => _ctxGauge(gs,'instabilite') >= 25 || _ctxGauge(gs,'possession') >= 15,
  polyEligible: (gs) => _ctxHasFlag(gs,'poly_eligible') || _ctxHasFlag(gs,'poly_active') || _ctxHasFlag(gs,'ngplus_route_both') || _ctxHasFlag(gs,'ngplus_truce')
});

function lastClassicEndingFromFlags(ctx) {
  const flags = ctx && Array.isArray(ctx.globalFlags) ? ctx.globalFlags : [];
  const hit = flags.find(f => String(f).startsWith('last_classic_end:'));
  return hit ? String(hit).slice('last_classic_end:'.length) : null;
}

// ===== HELPERS V28 : ROUTES FLUIDES =====
function getRouteMode(state) {
  if (!state || !Array.isArray(state.flags)) return 'solo';
  const o = state.flags.includes('avec_ombre');
  const e = state.flags.includes('avec_eclaireur');
  if (o && e) return 'poly';
  if (o) return 'ombre';
  if (e) return 'eclaireur';
  return (state.flags.includes('voie_solo_profonde') || state.flags.includes('voie_solo')) ? 'solo' : 'neutre';
}

function joinCompanion(state, route) {
  if (!state.flags) state.flags = [];
  if (route === 'O') {
    if (!state.flags.includes('avec_ombre')) state.flags.push('avec_ombre');
    state.flags = state.flags.filter(f => f !== 'voie_solo' && f !== 'voie_solo_profonde');
    if (!state.flags.includes('solo_bascule_vers_O')) state.flags.push('solo_bascule_vers_O');
  } else if (route === 'E') {
    if (!state.flags.includes('avec_eclaireur')) state.flags.push('avec_eclaireur');
    state.flags = state.flags.filter(f => f !== 'voie_solo' && f !== 'voie_solo_profonde');
    if (!state.flags.includes('solo_bascule_vers_E')) state.flags.push('solo_bascule_vers_E');
  }
}

/**
 * Route relationnelle souple.
 * - O/E : compagnon principal ajouté sans effacer l'autre.
 * - solo : ne supprime jamais les jauges de relation déjà gagnées.
 * Cette fonction sert aux effets de bascule et aux choix de convergence.
 */
function switchCompanion(state, route, options = {}) {
  if (!state.flags) state.flags = [];
  const r = String(route || '').toUpperCase();
  const keepOther = options.keepOther !== false;

  if (r === 'O') {
    if (!state.flags.includes('avec_ombre')) state.flags.push('avec_ombre');
    if (!keepOther) state.flags = state.flags.filter(f => f !== 'avec_eclaireur');
    state.flags = state.flags.filter(f => f !== 'voie_solo' && f !== 'voie_solo_profonde');
    state.flags.push(...(['pont_O_depuis_E'].filter(f => !state.flags.includes(f))));
  } else if (r === 'E') {
    if (!state.flags.includes('avec_eclaireur')) state.flags.push('avec_eclaireur');
    if (!keepOther) state.flags = state.flags.filter(f => f !== 'avec_ombre');
    state.flags = state.flags.filter(f => f !== 'voie_solo' && f !== 'voie_solo_profonde');
    state.flags.push(...(['pont_E_depuis_O'].filter(f => !state.flags.includes(f))));
  }
  state.route = state.flags.includes('avec_ombre') && state.flags.includes('avec_eclaireur')
    ? 'poly'
    : state.flags.includes('avec_ombre') ? 'ombre'
    : state.flags.includes('avec_eclaireur') ? 'eclaireur' : 'solo';
  return state.route;
}

// ===== HELPERS V27 =====
function _echo(gs, flag, textIfTrue, textIfFalse = "") {
  return gs.hasFlag(flag) ? textIfTrue : textIfFalse;
}

function hasItem(state, id) {
  return state.inventory && state.inventory.includes(id);
}

function addItem(state, id) {
  if (!state.inventory) state.inventory = [];
  if (!state.inventory.includes(id) && state.inventory.length < 8) {
    state.inventory.push(id);
  }
}

function removeItem(state, id) {
  if (!state.inventory) return;
  state.inventory = state.inventory.filter(i => i !== id);
}

function addRep(state, faction, value) {
  if (!state.reputation) state.reputation = { ordre:0, culte:0, ombre:0, village:0 };
  state.reputation[faction] = (state.reputation[faction] || 0) + value;
  if (state.reputation[faction] > 20) state.reputation[faction] = 20;
  if (state.reputation[faction] < -20) state.reputation[faction] = -20;
}

function getRep(state, faction) {
  return (state.reputation && state.reputation[faction]) || 0;
}

function decrementTimers(state, previousScene, nextScene, timeCost) {
  if (!state.timers) return;

  // V51.7.6 — coût temporel explicite. Sans métadonnée, l'ancien comportement reste valide.
  let resolvedTimeCost = timeCost;
  if (resolvedTimeCost === undefined || resolvedTimeCost === null) {
    const prev = String(previousScene || '');
    const next = String(nextScene || '');
    const mainAct3Move = prev !== next && /^ACTE3_/.test(prev) && /^ACTE3_/.test(next);
    const sanctuaryReached = next === 'ACTE3_09_VILLAGE_CACHE';
    resolvedTimeCost = mainAct3Move && !sanctuaryReached ? 1 : 0;
  }
  resolvedTimeCost = Math.max(0, Math.floor(Number(resolvedTimeCost) || 0));

  Object.keys(state.timers).forEach(t => {
    if (typeof state.timers[t] !== 'number' || state.timers[t] <= 0) return;
    if (t === 'venin') {
      if (resolvedTimeCost <= 0) return;
      state.timers[t] = Math.max(0, state.timers[t] - resolvedTimeCost);
      return;
    }
    state.timers[t]--;
  });
}

// ==========================================
// 4. OUTILS AAA — NORMALISATION & INTEGRITE
// ==========================================
