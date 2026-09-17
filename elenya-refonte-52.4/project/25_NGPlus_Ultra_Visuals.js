// V52.5 — VISUELS / FEEDBACK NG+ ULTRA. Couche additive et idempotente.
var _ngPlusUltraVisualsApplied=false;
function applyNgPlusUltraVisuals_(){
  if(_ngPlusUltraVisualsApplied||typeof NGPLUS_DB==='undefined')return;
  if(typeof applyNgPlusUltra_==='function')applyNgPlusUltra_();
  _ngPlusUltraVisualsApplied=true;

  const set=(id,props)=>{if(NGPLUS_DB[id])Object.assign(NGPLUS_DB[id],props);};

  // Personnages principaux : le décor reste visible, mais les scènes qui parlent d'une présence
  // affichent enfin cette présence au lieu d'un écran purement textuel.
  set('NGP_01_SEUIL',{sprite:'Fen'});
  set('NGP_02_NEUF_ECHOS',{sprite:'Fen'});
  set('NGP_03_PALAIS_ECHO',{sprite:'Kalthar'});
  set('NGP_04_FRESQUE_REPRISE',{sprite:'Fen'});
  set('NGP_07_KAELEN_ECHO',{sprite:'Kaelen',relationFocus:'O'});
  set('NGP_08_ALISTAIR_ECHO',{sprite:'Alistair',relationFocus:'E'});
  set('NGP_09_DEUX_ECHOS',{sprite:null,spriteLeft:'Kaelen',spriteRight:'Alistair',relationFocus:'BOTH'});
  set('NGP_11_LYRA',{sprite:'Lyra'});
  set('NGP_12_FEN',{sprite:'Fen'});
  set('NG_FIN_CYCLE',{sprite:'Fen'});

  // Scènes Ultra : sprites uniquement quand un personnage est réellement présent dans le texte.
  ['NGP_U01_FEN','NGP_U04_SECRET_FEN','NGP_U12_REFUS','NGP_U12_FEN'].forEach(id=>set(id,{sprite:'Fen'}));
  ['NGP_U02_KALTHAR','NGP_U03_ECOUTE','NGP_U03_COLERE','NGP_U03_PARDON','NGP_U12_DEUIL','NGP_U12_NEUVIEME'].forEach(id=>set(id,{sprite:'Kalthar'}));
  ['NGP_U07_RESTE','NGP_U07_BAISER','NGP_U07_DISTANCE','NGP_U07_SOURCE'].forEach(id=>set(id,{sprite:'Kaelen',relationFocus:'O'}));
  ['NGP_U08_RESTE','NGP_U08_BAISER','NGP_U08_DISTANCE','NGP_U08_SOURCE'].forEach(id=>set(id,{sprite:'Alistair',relationFocus:'E'}));
  ['NGP_U09_TRUCE','NGP_U09_O','NGP_U09_E','NGP_U09_NONE'].forEach(id=>set(id,{sprite:null,spriteLeft:'Kaelen',spriteRight:'Alistair',relationFocus:'BOTH'}));
  ['NGP_U11_LIBRE','NGP_U11_CHANT','NGP_U11_POUVOIR','NGP_U11_SILENCE'].forEach(id=>set(id,{sprite:'Lyra'}));

  // Les choix des micro-branches donnent aussi une réponse immédiate avant la reconnexion.
  Object.entries(NGPLUS_DB).forEach(([id,scene])=>{
    if(!/^NGP_U/.test(id))return;
    (scene.choices||[]).forEach(c=>{
      if(c.response)return;
      if(c.key==='COMPRENDRE')c.response='Tu prends le temps de comprendre ce que cette décision change avant de poursuivre.';
      else if(c.key==='AGIR')c.response='Tu agis sans transformer ton geste en ordre pour ceux qui viendront après toi.';
      else if(c.key==='PARTAGER')c.response='La vérité cesse d’être seulement la tienne. Elle devient une mémoire que d’autres pourront contredire et compléter.';
      else if(c.key==='GARDER')c.response='Tu gardes cette vérité pour l’instant, consciente que le secret lui-même peut devenir une forme de pouvoir.';
      else c.response='La décision laisse une trace. Tu poursuis sans prétendre qu’elle résout tout.';
    });
  });

  const baseImg = (typeof ELENYA_ART_V54_BASE !== 'undefined' ? ELENYA_ART_V54_BASE : 'https://cdn.jsdelivr.net/gh/Sunstrader/elenya-3d-assets@main/game-v54/');
  const fallbackBg = baseImg + 'backgrounds/royaume-souvenirs.webp';
  const spectralFenScenes = new Set(['NGP_12_FEN']);

  Object.entries(NGPLUS_DB).forEach(([id, scene]) => {
    if (!scene) return;

    // Ne jamais laisser une scène NG+ sans décor exploitable.
    if (!scene.image || scene.image.trim() === '' || scene.image === 'null' || scene.image === 'undefined') {
      scene.image = fallbackBg;
    }

    // Fen n'est spectral que pendant la scène où le furet devient Kalthar.
    // Les autres apparitions de Fen restent normales et conservent leur propre décor.
    if (spectralFenScenes.has(id)) {
      scene.presentation = scene.presentation || {};
      scene.presentation.spectralOverlay = true;
    }
  });

  // Repères de mise en scène pour le client et les outils QA.
  Object.entries(NGPLUS_DB).forEach(([id,scene])=>{
    if(!scene.emotionalBeat){
      if(/^NGP_U15_/.test(id)||/^NG_FIN_/.test(id))scene.emotionalBeat='resolution';
      else if(/^NGP_U1[34]_/.test(id))scene.emotionalBeat='confrontation';
      else if(/^NGP_U0[789]_/.test(id))scene.emotionalBeat='relationship';
      else if(/^NGP_U12_/.test(id))scene.emotionalBeat='grief';
      else if(/^NGP_U/.test(id))scene.emotionalBeat='memory';
    }
  });
}

(function(){
  if(typeof applyRefonte_!=='function'||applyRefonte_._ngpuVisuals)return;
  const base=applyRefonte_;
  applyRefonte_=function(){base();applyNgPlusUltraVisuals_();};
  applyRefonte_._ngpuVisuals=true;
})();