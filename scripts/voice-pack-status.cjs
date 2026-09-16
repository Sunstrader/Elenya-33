'use strict';
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');

const ROOT=path.resolve(__dirname,'..');
const VOICE_ROOT=path.join(ROOT,'elenya-refonte-52.4/assets/voices');
const corpus=JSON.parse(fs.readFileSync(path.join(VOICE_ROOT,'voice-corpus.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(VOICE_ROOT,'pack-manifest.json'),'utf8'));
const voices=['Algenib','Achird','Sulafat','Leda'];
const style=manifest.style||'fantasy';
const requireFull=process.env.VOICE_REQUIRE_FULL==='1' || process.argv.includes('--require-full');

function key(text,voice){return 'sha256_'+crypto.createHash('sha256').update(`${String(text||'').trim()}|${voice}|${style}`).digest('hex')}
function fileFor(entry){if(typeof entry==='string')return entry;return entry&&entry.file}
function exists(rel){return !!rel && fs.existsSync(path.join(VOICE_ROOT,String(rel).replace(/^\/+/,'')))}

const report={version:manifest.version||null,style,segments:corpus.uniqueSegments,charactersPerVoice:corpus.uniqueCharacters,voices:{},complete:true};
for(const voice of voices){
  let mapped=0,files=0;
  for(const seg of corpus.segments){
    const e=manifest.entries&&manifest.entries[key(seg.text,voice)];
    if(e)mapped++;
    if(exists(fileFor(e)))files++;
  }
  const previews=(manifest.voices?.[voice]?.previews||[]).filter(exists).length;
  const coverage=corpus.uniqueSegments?files/corpus.uniqueSegments:0;
  report.voices[voice]={mapped,files,missing:corpus.uniqueSegments-files,coverage:Number((coverage*100).toFixed(2)),previews};
  if(files!==corpus.uniqueSegments||previews<1)report.complete=false;
}
console.log(JSON.stringify(report,null,2));
if(requireFull&&!report.complete)process.exit(2);
