#!/usr/bin/env node
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const VOICE_ROOT = path.join(ROOT, 'elenya-refonte-52.4/assets/voices');
const CORPUS_PATH = path.join(VOICE_ROOT, 'voice-corpus.json');
const MANIFEST_PATH = path.join(VOICE_ROOT, 'pack-manifest.json');
const PROGRESS_PATH = path.join(VOICE_ROOT, 'generation-progress.json');
const ALL_VOICES = ['Algenib','Achird','Sulafat','Leda'];
const PREVIEW_TEXT = "Sur les crêtes de givre, le vent murmure les légendes d'Elenya. Les cristaux d'éther s'illuminent dans la pénombre glaciale.";
const STYLE = process.env.ELENYA_VOICE_STYLE || 'fantasy';
const MODEL = process.env.ELENYA_TTS_MODEL || 'gemini-3.1-flash-tts-preview';
const LOCALE = process.env.ELENYA_TTS_LOCALE || 'fr-FR';
const STYLE_PROMPT = process.env.ELENYA_TTS_PROMPT || "Narration fantasy sombre et immersive, naturelle et cinématographique. Français de France. Articulation claire, rythme posé autour de 0,95x, émotion contenue mais présente. Ne lis aucune instruction : prononce uniquement le texte fourni, sans l'ajouter ni le reformuler.";

const args = Object.fromEntries(process.argv.slice(2).map(x=>{
  const m=x.match(/^--([^=]+)(?:=(.*))?$/); return m?[m[1],m[2]===undefined?true:m[2]]:[x,true];
}));
const voiceArg = args.voices ?? args.voice;
const voices = voiceArg ? String(voiceArg).split(',').map(s=>s.trim()).filter(Boolean) : (args['all-voices'] ? ALL_VOICES : ['Sulafat']);
for(const v of voices) if(!ALL_VOICES.includes(v)) throw new Error(`Voix non prise en charge: ${v}`);
const limit = args.limit ? Math.max(1, Number(args.limit)||0) : Infinity;
const backendArg = String(args.backend || 'gemini-free').toLowerCase();
const FREE_ONLY = process.env.ELENYA_FREE_ONLY !== '0';
const FREE_KEY_FILE = path.join(os.homedir(), '.config', 'elenya', 'gemini-free.key');
const previewsOnly = !!args['previews-only'];
const dryRun = !!args['dry-run'];
const kinds = args.kinds ? new Set(String(args.kinds).split(',').map(s=>s.trim()).filter(Boolean)) : null;
const force = !!args.force;
const maxRetries = Math.max(1, Number(args.retries || 6));

function sha256(s){return crypto.createHash('sha256').update(String(s)).digest('hex')}
function manifestKey(text,voice,style=STYLE){return 'sha256_'+sha256(`${String(text||'').trim()}|${voice||''}|${style||''}`)}
function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
function commandExists(name){return spawnSync('bash',['-lc',`command -v ${name}`],{stdio:'ignore'}).status===0}
function apiKeys(){
  const keys=[];
  for(const k of ['GEMINI_API_KEY_VOICE','GEMINI_API_KEY','GOOGLE_API_KEY']) if(process.env[k]) keys.push(process.env[k]);
  if(process.env.GEMINI_API_KEYS) keys.push(...process.env.GEMINI_API_KEYS.split(',').map(x=>x.trim()).filter(Boolean));
  for(let i=1;i<=20;i++)if(process.env[`GEMINI_API_KEY_${i}`])keys.push(process.env[`GEMINI_API_KEY_${i}`]);
  try {
    if(fsSync.existsSync(FREE_KEY_FILE)){
      const saved=fsSync.readFileSync(FREE_KEY_FILE,'utf8').trim();
      if(saved)keys.push(saved);
    }
  } catch {}
  return [...new Set(keys)];
}
function selectBackend(){
  if(['cloud','vertex','paid'].includes(backendArg)){
    throw new Error('Backend payant désactivé : cette build est FREE-ONLY. Utilise --backend=gemini-free.');
  }
  if(!['auto','gemini','gemini-free'].includes(backendArg))throw new Error(`Backend inconnu: ${backendArg}`);
  return apiKeys().length ? 'gemini-free' : 'none';
}
const backend=selectBackend();

async function readJson(file,fallback){try{return JSON.parse(await fs.readFile(file,'utf8'))}catch{return fallback}}
async function writeJsonAtomic(file,obj){const tmp=file+'.tmp';await fs.writeFile(tmp,JSON.stringify(obj,null,2));await fs.rename(tmp,file)}
function hasFile(rel){return rel && fsSync.existsSync(path.join(VOICE_ROOT,rel))}

function wrapWav(pcm,sampleRate=24000){
  const b=Buffer.alloc(44+pcm.length);b.write('RIFF',0);b.writeUInt32LE(36+pcm.length,4);b.write('WAVE',8);b.write('fmt ',12);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(sampleRate,24);b.writeUInt32LE(sampleRate*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(pcm.length,40);pcm.copy(b,44);return b;
}
let keyCursor=0;
async function geminiFreeSynthesize(text,voice){
  const keys=apiKeys();if(!keys.length)throw Object.assign(new Error('Aucune clé Gemini disponible'),{fatal:true});
  const key=keys[keyCursor++%keys.length];
  const instruction=`${STYLE_PROMPT}\n\nTexte à prononcer exactement :\n${text}`;
  const body={model:MODEL,input:instruction,response_format:{type:'audio'},generation_config:{speech_config:[{voice}]}};
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/interactions',{method:'POST',headers:{'x-goog-api-key':key,'Content-Type':'application/json','Api-Revision':'2026-05-20'},body:JSON.stringify(body)});
  const raw=await r.text();let data={};try{data=JSON.parse(raw)}catch{}
  if(!r.ok){const e=new Error(data?.error?.message||raw||`Gemini TTS ${r.status}`);e.status=r.status;e.code=data?.error?.status;e.quota=r.status===429;e.fatal=[400,401,403,404].includes(r.status);throw e;}
  const b64=data?.output_audio?.data;if(!b64)throw new Error('Gemini TTS: output_audio absent');
  return {bytes:wrapWav(Buffer.from(b64,'base64')),ext:'wav',contentType:'audio/wav'};
}

async function synthesize(text,voice){
  let last;
  for(let attempt=0;attempt<maxRetries;attempt++){
    try{return await geminiFreeSynthesize(text,voice)}catch(e){
      last=e;if(e.fatal)throw e;
      if(e.quota && attempt>=Math.min(maxRetries-1,3)){
        e.quotaStop=true;
        throw e;
      }
      const delay=Math.min(60000,2000*Math.pow(2,attempt))+Math.floor(Math.random()*800);
      console.warn(`  ↻ ${e.status||e.code||''} ${e.message}; nouvelle tentative dans ${Math.round(delay/1000)} s`);
      await sleep(delay);
    }
  }
  if(last?.status===429)last.quotaStop=true;
  throw last||new Error('Échec TTS');
}

async function maybeConvertToOgg(result,basePath){
  if(result.ext==='ogg'){const p=basePath+'.ogg';await fs.writeFile(p,result.bytes);return p;}
  const wav=basePath+'.wav';await fs.writeFile(wav,result.bytes);
  if(commandExists('ffmpeg')){
    const ogg=basePath+'.ogg';const r=spawnSync('ffmpeg',['-y','-loglevel','error','-i',wav,'-c:a','libopus','-b:a','48k','-vbr','on',ogg]);
    if(r.status===0){await fs.unlink(wav).catch(()=>{});return ogg;}
  }
  return wav;
}

const corpus=await readJson(CORPUS_PATH,null);if(!corpus)throw new Error('Corpus vocal absent. Lance: npm run voice:corpus');
const manifest=await readJson(MANIFEST_PATH,{version:'52.4.3-free-voice-pack',mode:'offline-first',apiRequiredForPlayers:false,voices:{},entries:{}});
manifest.version='52.4.3-free-voice-pack';manifest.mode='offline-first';manifest.apiRequiredForPlayers=false;manifest.generationTier='free-only';manifest.paidFallback=false;manifest.language=LOCALE;manifest.model=MODEL;manifest.style=STYLE;manifest.corpus='voice-corpus.json';manifest.entries=manifest.entries||{};manifest.voices=manifest.voices||{};
for(const v of ALL_VOICES)manifest.voices[v]=manifest.voices[v]||{};

const progress=await readJson(PROGRESS_PATH,{generated:0,skipped:0,failed:0,last:null,failures:[]});
console.log(JSON.stringify({backend,freeOnly:FREE_ONLY,paidFallback:false,model:MODEL,locale:LOCALE,voices,previewsOnly,segments:corpus.uniqueSegments,charactersPerVoice:corpus.uniqueCharacters,totalCharacters:corpus.uniqueCharacters*voices.length,dryRun},null,2));
if(backend==='none'&&!dryRun){console.error(`\nAucune clé Gemini Free Tier disponible. Lance d’abord: bash scripts/prepare-gemini-free.sh\nLa clé reste dans ${FREE_KEY_FILE} (chmod 600) et n’est jamais envoyée aux joueurs.`);process.exit(3)}

async function generatePreview(voice){
  const existing=manifest.voices[voice]?.previews?.find(hasFile);if(existing&&!force){console.log(`✓ aperçu ${voice} déjà présent`);return}
  const dir=path.join(VOICE_ROOT,'previews');await fs.mkdir(dir,{recursive:true});
  if(dryRun){console.log(`[dry] aperçu ${voice}: ${PREVIEW_TEXT.length} caractères`);return}
  console.log(`▶ aperçu français ${voice}`);
  let result;
  try{result=await synthesize(PREVIEW_TEXT,voice)}catch(e){
    if(e.quotaStop||e.status===429){console.warn('⏸ Quota gratuit atteint pendant les aperçus. Relance plus tard : rien ne sera régénéré.');process.exit(75)}
    throw e;
  }
  const out=await maybeConvertToOgg(result,path.join(dir,voice.toLowerCase()));
  manifest.voices[voice]={...(manifest.voices[voice]||{}),previews:[path.relative(VOICE_ROOT,out).replaceAll('\\','/')]};await writeJsonAtomic(MANIFEST_PATH,manifest);
}
for(const voice of voices)await generatePreview(voice);
if(previewsOnly){console.log('Aperçus terminés.');process.exit(0)}

let tasks=[];
for(const voice of voices){
  for(const seg of corpus.segments){
    if(kinds && !seg.kinds.some(k=>kinds.has(k)))continue;
    const key=manifestKey(seg.text,voice,STYLE);const entry=manifest.entries[key];const rel=typeof entry==='string'?entry:entry?.file;
    if(!force&&rel&&hasFile(rel)){progress.skipped++;continue}
    tasks.push({voice,seg,key});
  }
}
tasks=tasks.slice(0,limit);
console.log(`À générer: ${tasks.length} fichier(s). Déjà présents: ${progress.skipped}.`);
if(dryRun){const chars=tasks.reduce((a,t)=>a+t.seg.chars,0);console.log(JSON.stringify({dryRun:true,tasks:tasks.length,characters:chars,estimatedRawMinutes:Math.round(chars/900)},null,2));process.exit(0)}

let done=0;
for(const task of tasks){
  const {voice,seg,key}=task;const dir=path.join(VOICE_ROOT,'segments',voice.toLowerCase());await fs.mkdir(dir,{recursive:true});
  const base=path.join(dir,key.replace(/^sha256_/,'').slice(0,32));
  try{
    console.log(`[${++done}/${tasks.length}] ${voice} · ${seg.kinds.join('+')} · ${seg.chars} car.`);
    const result=await synthesize(seg.text,voice);const out=await maybeConvertToOgg(result,base);const rel=path.relative(VOICE_ROOT,out).replaceAll('\\','/');
    manifest.entries[key]={file:rel,voice,style:STYLE,textId:seg.id,chars:seg.chars};
    progress.generated++;progress.last={voice,textId:seg.id,file:rel,at:new Date().toISOString()};
    await writeJsonAtomic(MANIFEST_PATH,manifest);await writeJsonAtomic(PROGRESS_PATH,progress);
  }catch(e){
    if(e.quotaStop||e.status===429){
      progress.quotaStopped={voice,textId:seg.id,at:new Date().toISOString(),message:e.message};
      await writeJsonAtomic(PROGRESS_PATH,progress);
      console.warn('\n⏸ Quota GRATUIT atteint. Arrêt volontaire sans bascule payante. Relance la même commande plus tard : les fichiers existants seront ignorés.');
      process.exit(75);
    }
    progress.failed++;progress.failures.push({voice,textId:seg.id,message:e.message,status:e.status||null,at:new Date().toISOString()});progress.failures=progress.failures.slice(-100);
    await writeJsonAtomic(PROGRESS_PATH,progress);console.error(`✗ ${voice}/${seg.id}: ${e.message}`);if(e.fatal)throw e;
  }
}
console.log(JSON.stringify({ok:true,generated:progress.generated,failed:progress.failed,manifestEntries:Object.keys(manifest.entries).length,progress:path.relative(ROOT,PROGRESS_PATH)},null,2));
