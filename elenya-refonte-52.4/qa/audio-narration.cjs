// Tests ciblés de la logique client. DOM simulé : ceci ne remplace pas un test visuel.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(__dirname+'/../project/Scripts_Refonte.html','utf8');
const main=fs.readFileSync(__dirname+'/../project/Scripts_Game.html','utf8');
const clone=x=>JSON.parse(JSON.stringify(x)),storage=new Map(),nodes=new Map(),events={};
let state={},autosaves=0,rendered=null;
function node(id){if(!nodes.has(id)){const classes=new Set();nodes.set(id,{id,hidden:true,disabled:false,textContent:'',dataset:{},style:{setProperty(){}},children:[],classList:{add:(...x)=>x.forEach(v=>classes.add(v)),remove:(...x)=>x.forEach(v=>classes.delete(v)),contains:x=>classes.has(x),toggle:(x,on)=>{if(on===undefined)on=!classes.has(x);on?classes.add(x):classes.delete(x);return on;}},before(){},focus(){},setAttribute(){},appendChild(x){this.children.push(x)},querySelectorAll(){return[]},addEventListener(){},isConnected:true})}return nodes.get(id)}
const document={hidden:false,body:node('body'),activeElement:node('active'),getElementById:node,querySelector:s=>node(s),querySelectorAll:()=>[],createElement:tag=>node('created-'+nodes.size),addEventListener:(name,fn)=>{events[name]=fn}};
node('accueil-screen').classList.add('hidden');node('rf-dialog').hidden=true;
const localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
const timers=new Map();let timerId=0,spoken=[],voices=[],gains=[],sources=[];
const param=()=>({value:1,setTargetAtTime(v){this.value=v},setValueAtTime(v){this.value=v},cancelScheduledValues(){},exponentialRampToValueAtTime(v){this.end=v}});
const audioNode=()=>({gain:param(),frequency:param(),connect(n){this.output=n;return n},disconnect(){},start(){this.started=true},stop(){}});
const synth={getVoices:()=>voices,cancel(){},speak(u){spoken.push(u)},addEventListener(){}};
class AC {constructor(){this.currentTime=0;this.sampleRate=100;this.destination={}}resume(){return Promise.resolve()}suspend(){return Promise.resolve()}createGain(){const n=audioNode();gains.push(n);return n}createBufferSource(){const n=audioNode();sources.push(n);return n}createBiquadFilter(){return audioNode()}createBuffer(c,n){return {getChannelData:()=>new Float32Array(n)}}}
function tick(n=30){for(let i=0;i<n;i++)for(const [id,fn] of [...timers])if(timers.has(id))fn()}
function near(a,b){assert(Math.abs(a-b)<1e-8,`${a} != ${b}`)}
const ctx=vm.createContext({console,JSON,Date,Math,Set,Map,Promise,document,localStorage,window:{speechSynthesis:synth,SpeechSynthesisUtterance:class {},AudioContext:AC},SpeechSynthesisUtterance:class {constructor(text){this.text=text}},navigator:{},matchMedia:()=>({matches:false}),setTimeout:()=>1,clearTimeout(){},setInterval(fn){const id=++timerId;timers.set(id,fn);return id},clearInterval(id){timers.delete(id)},
  getActiveState:()=>clone(state),setActiveState:s=>state=clone(s),getAllAchievements:()=>['permanent'],getCurrentMode:()=>state.gameMode||'classic',originalRender:d=>{rendered=clone(d)},autoSave:()=>autosaves++,stopAmbientMedia(){},skipTypeWriter(){},hideOverlay(){},updateStats(){},textSizeStep(){},escapeHtml:s=>String(s),playAudioForScene(){},CONFIG:{BGM_VOLUME:.7,AUDIO_MAP:{}},_isMuted:false,_currentAudioMood:null,_currentAudioUrl:null,isTyping:false,
  syncKnownAchievementsBaseline(){},hideSaveModal(){},renderSceneDataFromServer(){},refreshMainMenu(){},alert(){},
  FileReader:class { readAsText(file){ this.onload({target:{result:file.text}}); } }
});
vm.runInContext(source.slice(source.indexOf('function segmentNarrative'),source.indexOf('const originalRender='))+'\nglobalThis.rf=RF;',ctx);
const rf=ctx.rf;

vm.runInContext(main.slice(main.indexOf('function setBgmVolume('),main.indexOf('(function initParticles()')),ctx);
const bgm=node('bgm');bgm.paused=false;bgm.play=()=>Promise.resolve();bgm.pause=()=>{bgm.paused=true};
rf.scene({sceneId:'A',title:'Titre',narrative:'Une phrase. Une autre.',choices:[],presentation:{ambience:'wind'}});
// Les voix peuvent arriver tard ; le choix enregistré est respecté.
voices=[{name:'Standard',voiceURI:'local',lang:'fr-FR',localService:true},{name:'Natural French',voiceURI:'natural',lang:'fr-FR',localService:false}];
rf.speak();near(bgm.volume,.35);assert.equal(spoken.at(-1).voice.voiceURI,'natural');
spoken.at(-1).onstart();tick();near(bgm.volume,.35*.25);
rf.effect('ice-storm');assert(sources.at(-1).started);near(gains[0].gain.value,.16*.25);
// Une piste qui entre en fondu pendant la narration reste atténuée.
ctx.fadeAudio(bgm,bgm.volume,0,400,()=>ctx.fadeAudio(bgm,0,.35,800,null));tick(50);near(bgm.volume,.35*.25);
// Changer le volume pendant la lecture ne restaure pas une ancienne valeur.
rf.prefs.music=.6;rf.applyPrefs();near(bgm.volume,.6*.25);
rf.stopVoice();tick();near(bgm.volume,.6);near(gains[0].gain.value,.16);
rf.prefs.voiceURI='local';rf.speak();assert.equal(spoken.at(-1).voice.voiceURI,'local');spoken.at(-1).onstart();tick();
// Une erreur/interruption libère toujours le mix.
spoken.at(-1).onerror({error:'interrupted'});tick();near(bgm.volume,.6);
rf.speak();const old=spoken.at(-1);old.onstart();tick();rf.speak();const latest=spoken.at(-1);latest.onstart();tick();old.onend();near(bgm.volume,.6*.25);
// Fin complète : remontée du volume et effets toujours présents.
for(let i=0;i<10;i++){spoken.at(-1).onstart();spoken.at(-1).onend()}tick();near(bgm.volume,.6);
rf.speak();spoken.at(-1).onstart();tick();ctx._isMuted=true;rf.applyPrefs();rf.stopVoice();tick();near(bgm.volume,0);
ctx._isMuted=false;rf.applyPrefs();near(bgm.volume,.6);
rf.speak();spoken.at(-1).onstart();tick();document.hidden=true;events.visibilitychange();tick();near(bgm.volume,.6);
console.log(JSON.stringify({ok:true,checks:['atténuation à 25 %, jamais coupure','fondu de piste pendant la voix','effets joués à volume réduit','nouveau volume conservé','voix française choisie','erreur et interruption','événements anciens ignorés','fin de lecture','sourdine manuelle','onglet masqué'],environment:'Node VM ; audio, DOM et synthèse vocale simulés'},null,2));
