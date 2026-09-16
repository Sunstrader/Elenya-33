'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { loadEngine } = require('../elenya-refonte-52.4/qa/engine.cjs');

const ROOT = path.resolve(__dirname, '..');
const PROJECT = path.join(ROOT, 'elenya-refonte-52.4/project');
const OUT = path.join(ROOT, 'elenya-refonte-52.4/assets/voices/voice-corpus.json');
const REPORT = path.join(ROOT, 'elenya-refonte-52.4/docs/voice-corpus-report.json');
const MAX_STATES_PER_SCENE = Number(process.env.VOICE_CORPUS_MAX_STATES || 1400);

const { api, ctx } = loadEngine(PROJECT);

function uniq(arr) { return [...new Set(arr)]; }
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function hashText(text) { return crypto.createHash('sha256').update(String(text)).digest('hex'); }

function segmentNarrative(fullText, maxChunkSize = 800) {
  if (!fullText || typeof fullText !== 'string') return [];
  const trimmed = fullText.trim().replace(/\*+/g, '');
  if (!trimmed) return [];
  if (trimmed.length <= maxChunkSize) return [trimmed];
  const paragraphs = trimmed.split(/\n\s*\n/);
  const chunks = [];
  let currentChunk = '';
  for (const para of paragraphs) {
    const cleanPara = para.trim();
    if (!cleanPara) continue;
    if (cleanPara.length > maxChunkSize) {
      const sentences = cleanPara.match(/[^.!?…\n]+[.!?…]*(?:\s+|$)/g) || [cleanPara];
      for (const sent of sentences) {
        const cleanSent = sent.trim();
        if (!cleanSent) continue;
        if (cleanSent.length > maxChunkSize) {
          const words = cleanSent.split(/\s+/);
          for (const word of words) {
            if ((currentChunk + ' ' + word).trim().length > maxChunkSize) {
              if (currentChunk.trim()) chunks.push(currentChunk.trim());
              currentChunk = word;
            } else currentChunk = currentChunk ? currentChunk + ' ' + word : word;
          }
        } else if ((currentChunk + ' ' + cleanSent).trim().length > maxChunkSize) {
          if (currentChunk.trim()) chunks.push(currentChunk.trim());
          currentChunk = cleanSent;
        } else currentChunk = currentChunk ? currentChunk + ' ' + cleanSent : cleanSent;
      }
    } else if ((currentChunk + '\n\n' + cleanPara).trim().length > maxChunkSize) {
      if (currentChunk.trim()) chunks.push(currentChunk.trim());
      currentChunk = cleanPara;
    } else currentChunk = currentChunk ? currentChunk + '\n\n' + cleanPara : cleanPara;
  }
  if (currentChunk.trim()) chunks.push(currentChunk.trim());
  return chunks;
}

const SKIP_CALLS = new Set(['if','for','while','switch','catch','function','return','String','Number','Boolean','Array','Object','Math','Date','JSON','parseInt','parseFloat','isNaN','setTimeout','clearTimeout']);

function depShape() {
  return { flags:new Set(), globalFlags:new Set(), gauges:new Set(), timers:new Set(), items:new Set(), reps:new Set(), originEnds:new Set(), lastEndings:new Set(), helperSources:[] };
}
function mergeDeps(a,b){ for(const k of ['flags','globalFlags','gauges','timers','items','reps','originEnds','lastEndings']) for(const v of b[k]) a[k].add(v); a.helperSources.push(...b.helperSources); return a; }
function regexValues(src, regex) { const out=[]; let m; while((m=regex.exec(src))) out.push(m[1]); return out; }

function directDeps(src) {
  src = String(src || '');
  const d = depShape();
  const specs = [
    ['flags', /\.hasFlag\(\s*['"]([^'"]+)['"]\s*\)/g],
    ['globalFlags', /\.hasGlobalFlag\(\s*['"]([^'"]+)['"]\s*\)/g],
    ['gauges', /\.getGauge\(\s*['"]([^'"]+)['"]\s*\)/g],
    ['items', /\.hasItem\(\s*['"]([^'"]+)['"]\s*\)/g],
    ['reps', /\.getRep\(\s*['"]([^'"]+)['"]\s*\)/g],
    ['originEnds', /\.hasOriginEnd\(\s*['"]([^'"]+)['"]\s*\)/g],
    ['flags', /_echo\(\s*[^,]+,\s*['"]([^'"]+)['"]/g]
  ];
  for (const [k,r] of specs) for (const v of regexValues(src,r)) d[k].add(v);
  // Helpers variadiques hasAnyFlag/hasAllFlags : récupérer toutes les chaînes dans l'appel.
  for (const m of src.matchAll(/has(?:Any|All)Flag\(([^)]*)\)/g)) {
    for (const sm of m[1].matchAll(/['"]([^'"]+)['"]/g)) d.flags.add(sm[1]);
  }
  // Accès direct hérité : gs.timers.venin
  for (const m of src.matchAll(/\bgs\.timers\.([A-Za-z0-9_]+)/g)) d.timers.add(m[1]);
  for (const m of src.matchAll(/\bgs\.gauges\.([A-Za-z0-9_]+)/g)) d.gauges.add(m[1]);
  // Conditions textuelles de _parseDynamicText.
  for (const m of src.matchAll(/{if:(flags|gauges|timers)\.([^}><=|]+)(?:[><=]+-?\d+)?}/g)) {
    const map = {flags:'flags',gauges:'gauges',timers:'timers'};
    d[map[m[1]]].add(m[2]);
  }
  // Valeurs possibles de getLastClassicEnding() comparées à des IDs littéraux.
  if (/getLastClassicEnding\s*\(/.test(src)) {
    for (const m of src.matchAll(/['"]((?:FIN|GAME_OVER)_[A-Z0-9_]+)['"]/g)) d.lastEndings.add(m[1]);
  }
  return d;
}

function getCondFunction(name) {
  try { return vm.runInContext(`(typeof COND !== 'undefined' && COND.${name}) || null`, ctx); }
  catch (_) { return null; }
}

function collectDeps(fn, depth=0, seen=new Set()) {
  const d = depShape();
  if (typeof fn !== 'function' || depth > 5) return d;
  const src = Function.prototype.toString.call(fn);
  if (seen.has(src)) return d;
  seen.add(src);
  mergeDeps(d, directDeps(src));
  d.helperSources.push(src);
  const names = new Set();
  for (const m of src.matchAll(/\b([A-Za-z_$][\w$]*)\s*\(/g)) names.add(m[1]);
  for (const name of names) {
    if (SKIP_CALLS.has(name)) continue;
    const helper = ctx[name];
    if (typeof helper === 'function' && helper !== fn) mergeDeps(d, collectDeps(helper, depth+1, seen));
  }
  for (const m of src.matchAll(/\bCOND\.([A-Za-z_$][\w$]*)\s*\(/g)) {
    const helper = getCondFunction(m[1]);
    if (typeof helper === 'function') mergeDeps(d, collectDeps(helper, depth+1, seen));
  }
  return d;
}

function parseThresholds(src, getter, key) {
  const values = new Set([0,1,2,3,4,5,8,10,12,15,16,20,24,25,26,30]);
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const patterns = [
    new RegExp(`${getter}\\(\\s*['\"]${escaped}['\"]\\s*\\)\\s*(?:[<>]=?|={2,3}|!={1,2})\\s*(-?\\d+(?:\\.\\d+)?)`, 'g'),
    new RegExp(`(?:const|let|var)\\s+([A-Za-z_$][\\w$]*)\\s*=\\s*[^;\\n]*${getter}\\(\\s*['\"]${escaped}['\"]\\s*\\)[^;\\n]*;?([\\s\\S]{0,500})`, 'g')
  ];
  let m;
  while((m=patterns[0].exec(src))) {
    const n=Number(m[1]); if(Number.isFinite(n)) { values.add(n-1); values.add(n); values.add(n+1); }
  }
  while((m=patterns[1].exec(src))) {
    const varName=m[1], tail=m[2];
    const rr=new RegExp(`\\b${varName}\\b\\s*(?:[<>]=?|={2,3}|!={1,2})\\s*(-?\\d+(?:\\.\\d+)?)`,'g'); let q;
    while((q=rr.exec(tail))) { const n=Number(q[1]); if(Number.isFinite(n)){values.add(n-1);values.add(n);values.add(n+1);} }
  }
  return [...values].filter(v=>Number.isFinite(v) && v>=-50 && v<=100).sort((a,b)=>a-b);
}

function configSignature(c) {
  return JSON.stringify({
    f:[...(c.flags||[])].sort(), gf:[...(c.globalFlags||[])].sort(),
    g:c.gauges||{}, t:c.timers||{}, i:[...(c.inventory||[])].sort(), r:c.reputation||{},
    o:[...(c.originEnds||[])].sort(), le:c.lastEnding||null
  });
}
function addConfig(list, seen, cfg) {
  if (list.length >= MAX_STATES_PER_SCENE) return;
  const sig=configSignature(cfg); if(seen.has(sig)) return; seen.add(sig); list.push(cfg);
}

const UNIVERSAL_PROFILES = [
  {flags:[],gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]},
  {flags:['avec_ombre','relation_O_ouverte_acte1','focus_romantique_O'],gauges:{lien_O:6,affinite_ombre:8},timers:{venin:4},inventory:[],reputation:{ombre:10},globalFlags:[],originEnds:[]},
  {flags:['avec_eclaireur','relation_E_ouverte_acte1','focus_romantique_E'],gauges:{lien_E:6,affinite_eclaireur:8},timers:{venin:3},inventory:[],reputation:{ordre:10},globalFlags:[],originEnds:[]},
  {flags:['avec_ombre','avec_eclaireur','poly_eligible','poly_active'],gauges:{lien_O:7,lien_E:7,affinite_ombre:10,affinite_eclaireur:10},timers:{venin:2},inventory:[],reputation:{ombre:10,ordre:10},globalFlags:[],originEnds:[]},
  {flags:['voie_solo','voie_solo_profonde'],gauges:{instabilite:5,volonte:8},timers:{venin:1},inventory:[],reputation:{},globalFlags:[],originEnds:[]},
  {flags:['voie_solo','sirene_acceptee'],gauges:{instabilite:30,possession:20,memoire_kalthar:4,volonte:3},timers:{venin:1},inventory:[],reputation:{culte:15},globalFlags:[],originEnds:[]},
  {flags:['kalthar_verite','corona_comprise'],gauges:{memoire_kalthar:20,volonte:18,instabilite:0,possession:0},timers:{venin:0},inventory:[],reputation:{village:15},globalFlags:[],originEnds:[]},
  {flags:['kaelen_mort','alistair_mort','voie_solo'],gauges:{lien_O:0,lien_E:0,instabilite:15},timers:{venin:0},inventory:[],reputation:{ombre:-10,ordre:-10},globalFlags:[],originEnds:[]},
];

function generateConfigs(scene, mode, deps) {
  const list=[], seen=new Set();
  for(const p of UNIVERSAL_PROFILES) addConfig(list,seen,clone(p));
  const flags=[...deps.flags], globals=[...deps.globalFlags], items=[...deps.items], origin=[...deps.originEnds];
  const combinedSource = deps.helperSources.join('\n') + '\n' + String(scene.text||scene.narrative||'');

  // Combinaisons de drapeaux : exhaustif pour les petits ensembles, couverture pairwise sinon.
  const n=flags.length;
  if(n<=9){
    const total=1<<n;
    for(let mask=0;mask<total && list.length<MAX_STATES_PER_SCENE;mask++){
      const f=[]; for(let i=0;i<n;i++)if(mask&(1<<i))f.push(flags[i]);
      addConfig(list,seen,{flags:f,gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]});
    }
  } else {
    addConfig(list,seen,{flags:[],gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]});
    addConfig(list,seen,{flags:flags.slice(),gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]});
    for(const f of flags){
      addConfig(list,seen,{flags:[f],gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]});
      addConfig(list,seen,{flags:flags.filter(x=>x!==f),gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]});
    }
    outer: for(let i=0;i<flags.length;i++)for(let j=i+1;j<flags.length;j++){
      addConfig(list,seen,{flags:[flags[i],flags[j]],gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]});
      if(list.length>=Math.min(MAX_STATES_PER_SCENE,320))break outer;
    }
  }

  // Gauges / réputation / timers : seuils et valeurs usuelles, combinés à quelques profils de flags.
  const flagBases = [[], flags.slice(), ...flags.slice(0,8).map(f=>[f])];
  for(const g of deps.gauges){
    const vals=parseThresholds(combinedSource,'(?:gs\\.)?getGauge',g);
    for(const v of vals) for(const fb of flagBases.slice(0,6)) addConfig(list,seen,{flags:fb,gauges:{[g]:v},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]});
  }
  for(const r of deps.reps){
    for(const v of [-20,-10,-1,0,1,5,10,20]) for(const fb of flagBases.slice(0,4)) addConfig(list,seen,{flags:fb,gauges:{},timers:{},inventory:[],reputation:{[r]:v},globalFlags:[],originEnds:[]});
  }
  for(const t of deps.timers){
    for(const v of [0,1,2,3,4,5,7,10]) for(const fb of flagBases.slice(0,5)) addConfig(list,seen,{flags:fb,gauges:{},timers:{[t]:v},inventory:[],reputation:{},globalFlags:[],originEnds:[]});
  }

  // Croisements des gauges si plusieurs : bas / haut / domination / mémoire.
  const gs=[...deps.gauges];
  if(gs.length>1){
    const low={}, high={}, mid={}; gs.forEach(g=>{low[g]=0;mid[g]=5;high[g]=30;});
    for(const fb of flagBases.slice(0,5)) { addConfig(list,seen,{flags:fb,gauges:low,timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]}); addConfig(list,seen,{flags:fb,gauges:mid,timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]}); addConfig(list,seen,{flags:fb,gauges:high,timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[]}); }
  }

  for(const gf of globals){ addConfig(list,seen,{flags:[],gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[gf],originEnds:[]}); }
  if(globals.length) addConfig(list,seen,{flags:[],gauges:{},timers:{},inventory:[],reputation:{},globalFlags:globals.slice(),originEnds:[]});
  for(const it of items){ addConfig(list,seen,{flags:[],gauges:{},timers:{},inventory:[it],reputation:{},globalFlags:[],originEnds:[]}); }
  if(items.length) addConfig(list,seen,{flags:[],gauges:{},timers:{},inventory:items.slice(),reputation:{},globalFlags:[],originEnds:[]});
  for(const e of origin){ addConfig(list,seen,{flags:[],gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:[e]}); }
  if(origin.length) addConfig(list,seen,{flags:[],gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[],originEnds:origin.slice()});

  const endings = deps.lastEndings.size ? [...deps.lastEndings] : [];
  if(/getLastClassicEnding\s*\(/.test(combinedSource)) {
    const candidates=endings.length?endings:(api.ELENYA_ENDING_VIDEO_IDS_V55||[]);
    for(const e of candidates) addConfig(list,seen,{flags:[],gauges:{},timers:{},inventory:[],reputation:{},globalFlags:[`last_classic_end:${e}`],originEnds:[],lastEnding:e});
  }

  return list.slice(0,MAX_STATES_PER_SCENE);
}

function wrapperFromConfig(cfg, mode) {
  const flags=(cfg.flags||[]).slice(), globalFlags=(cfg.globalFlags||[]).slice(), gauges={...(cfg.gauges||{})}, timers={...(cfg.timers||{})}, inventory=(cfg.inventory||[]).slice(), reputation={...(cfg.reputation||{})};
  const originEnds=(cfg.originEnds||[]).slice();
  return {
    gameMode: mode,
    flags, globalFlags, gauges, timers, inventory, reputation,
    route: cfg.route || null,
    ngPlus: {originEnds}, achievements: [],
    hasFlag:f=>flags.includes(f),
    hasGlobalFlag:f=>globalFlags.includes(f),
    getGauge:g=>Number(gauges[g]||0),
    addFlag:f=>{if(!flags.includes(f))flags.push(f)},
    hasItem:id=>inventory.includes(id),
    getRep:f=>Number(reputation[f]||0),
    hasOriginEnd:id=>originEnds.includes(id),
    getLastClassicEnding:()=>cfg.lastEnding || ((globalFlags.find(f=>String(f).startsWith('last_classic_end:'))||'').split(':')[1]||null)
  };
}

function parserState(cfg, mode) {
  return api.normalizeGameState({
    gameMode: mode,
    flags:(cfg.flags||[]).slice(), globalFlags:(cfg.globalFlags||[]).slice(), gauges:{...(cfg.gauges||{})}, timers:{...(cfg.timers||{})},
    inventory:(cfg.inventory||[]).slice(), reputation:{...(cfg.reputation||{})},
    ngPlus:{originEnds:(cfg.originEnds||[]).slice()}
  });
}

const segments = new Map();
function addSegment(text, meta) {
  for(const seg of segmentNarrative(String(text||''),800)){
    const id='text_'+hashText(seg).slice(0,24);
    if(!segments.has(id))segments.set(id,{id,text:seg,chars:[...seg].length,bytes:Buffer.byteLength(seg,'utf8'),kinds:[],sources:[]});
    const r=segments.get(id);
    if(meta.kind && !r.kinds.includes(meta.kind))r.kinds.push(meta.kind);
    const source={mode:meta.mode||null,sceneId:meta.sceneId||null,choiceKey:meta.choiceKey||null,variant:meta.variant??null};
    const sig=JSON.stringify(source); if(!r._src)r._src=new Set(); if(!r._src.has(sig)){r._src.add(sig);r.sources.push(source);}
  }
}

const sceneReport=[];
const errors=[];
let dynamicScenes=0, staticScenes=0, totalVariantOutputs=0;
for(const [mode,db] of [['classic',api.DB],['ngplus',api.NGPLUS_DB]]){
  for(const [sceneId,scene] of Object.entries(db)){
    if(sceneId==='ERREUR_SCENE')continue;
    addSegment(scene.title||sceneId,{kind:'title',mode,sceneId});
    const rawStatic=String(scene.text||scene.narrative||'');
    let deps=directDeps(rawStatic);
    if(typeof scene.getDynamicNarrative==='function') mergeDeps(deps,collectDeps(scene.getDynamicNarrative));
    const configs=generateConfigs(scene,mode,deps);
    const outputs=new Map();
    const fn=typeof scene.getDynamicNarrative==='function'?scene.getDynamicNarrative:null;
    if(fn) dynamicScenes++; else staticScenes++;
    for(let i=0;i<configs.length;i++){
      const cfg=configs[i];
      try{
        const raw=fn?fn(wrapperFromConfig(cfg,mode)):rawStatic;
        const parsed=String(ctx._parseDynamicText(String(raw||''),parserState(cfg,mode))||'').trim();
        if(!parsed)continue;
        if(/{if:/.test(parsed)) errors.push({sceneId,mode,type:'unparsed_conditional',text:parsed.slice(0,180)});
        if(!outputs.has(parsed))outputs.set(parsed,{cfgIndex:i});
      }catch(e){ errors.push({sceneId,mode,type:'render_error',message:e.message,cfgIndex:i}); }
    }
    let variant=0;
    for(const text of outputs.keys()) addSegment(text,{kind:'narrative',mode,sceneId,variant:variant++});
    totalVariantOutputs+=outputs.size;
    for(const c of (scene.choices||[])){
      if(c.text)addSegment(`Choix : ${c.text}`,{kind:'choice',mode,sceneId,choiceKey:c.key});
      if(typeof c.response==='string'&&c.response.trim()) addSegment(String(ctx._parseDynamicText(c.response,parserState({},mode))||c.response),{kind:'choiceResponse',mode,sceneId,choiceKey:c.key});
    }
    sceneReport.push({mode,sceneId,title:scene.title||'',dynamic:!!fn,testedStates:configs.length,variants:outputs.size,deps:{flags:[...deps.flags],globalFlags:[...deps.globalFlags],gauges:[...deps.gauges],timers:[...deps.timers],items:[...deps.items],reps:[...deps.reps],originEnds:[...deps.originEnds],lastEndings:[...deps.lastEndings]}});
  }
}

const rows=[...segments.values()].map(r=>{delete r._src; r.kinds.sort(); return r;}).sort((a,b)=>a.id.localeCompare(b.id));
const charTotal=rows.reduce((a,r)=>a+r.chars,0), byteTotal=rows.reduce((a,r)=>a+r.bytes,0);
const byKind={}; for(const r of rows)for(const k of r.kinds)byKind[k]=(byKind[k]||0)+1;
const corpus={
  version:'52.4.3-voice-corpus', generatedAt:new Date().toISOString(), language:'fr-FR', maxSegmentChars:800,
  sceneCounts:{classic:Object.keys(api.DB).filter(x=>x!=='ERREUR_SCENE').length,ngplus:Object.keys(api.NGPLUS_DB).filter(x=>x!=='ERREUR_SCENE').length,total:Object.keys(api.DB).filter(x=>x!=='ERREUR_SCENE').length+Object.keys(api.NGPLUS_DB).filter(x=>x!=='ERREUR_SCENE').length,dynamic:dynamicScenes,static:staticScenes},
  variants:totalVariantOutputs, uniqueSegments:rows.length, uniqueCharacters:charTotal, utf8Bytes:byteTotal, byKind, segments:rows
};
fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.writeFileSync(OUT,JSON.stringify(corpus,null,2));
fs.writeFileSync(REPORT,JSON.stringify({summary:{...corpus,segments:undefined},errors,scenes:sceneReport},null,2));
console.log(JSON.stringify({ok:errors.filter(e=>e.type==='render_error').length===0, scenes:corpus.sceneCounts, variants:totalVariantOutputs, uniqueSegments:rows.length, uniqueCharacters:charTotal, byKind, errors:errors.length, output:path.relative(ROOT,OUT)},null,2));
if(errors.some(e=>e.type==='render_error'))process.exitCode=2;
