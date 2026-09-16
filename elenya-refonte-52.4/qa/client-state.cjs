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
const ctx=vm.createContext({console,JSON,Date,Math,Set,Map,Promise,document,localStorage,window:{},navigator:{},matchMedia:()=>({matches:false}),setTimeout:()=>1,clearTimeout(){},clearInterval(){},
  getActiveState:()=>clone(state),setActiveState:s=>state=clone(s),getAllAchievements:()=>['permanent'],getCurrentMode:()=>state.gameMode||'classic',originalRender:d=>{rendered=clone(d)},autoSave:()=>autosaves++,stopAmbientMedia(){},skipTypeWriter(){},hideOverlay(){},updateStats(){},textSizeStep(){},escapeHtml:s=>String(s),playAudioForScene(){},CONFIG:{BGM_VOLUME:.7,AUDIO_MAP:{}},_isMuted:false,_currentAudioMood:null,_currentAudioUrl:null,isTyping:false,
  syncKnownAchievementsBaseline(){},hideSaveModal(){},renderSceneDataFromServer(){},refreshMainMenu(){},alert(){},
  FileReader:class { readAsText(file){ this.onload({target:{result:file.text}}); } }
});
vm.runInContext(source.slice(source.indexOf('const RF ='),source.indexOf('const originalRender='))+'\nglobalThis.rf=RF;',ctx);
const rf=ctx.rf;
const first={gameMode:'classic',currentSceneId:'A',gauges:{lien_O:3},flags:['avant'],timers:{venin:4},inventory:['relique'],returnStack:['X'],choiceHistory:[],narrative:{echoes:[]},stats:{choicesMade:0,playTime:100},achievements:[]};
state=clone(first);rf.scene({sceneId:'A',title:'Avant',narrative:'Avant.',choices:[],renderedState:clone(state)});
assert.equal(rf.prepareChoice(),true);assert.equal(rf.prepareChoice(),false);
const second={...clone(first),currentSceneId:'B',flags:['apres'],gauges:{lien_O:5},timers:{venin:3},inventory:[],returnStack:[],choiceHistory:[{scene:'A',choice:'O'}],narrative:{echoes:['choix']},stats:{choicesMade:1,playTime:200}};
state=clone(second);rf.settle(true);rf.scene({sceneId:'B',title:'Après',narrative:'Après.',choices:[],renderedState:clone(state)});
rf.rollback(-1);
for(const k of ['currentSceneId','gauges','flags','timers','inventory','returnStack','choiceHistory','narrative','stats'])assert.deepEqual(state[k],first[k],k);
assert(state.achievements.includes('permanent'));assert.equal(rendered.sceneId,'A');assert.equal(autosaves,1);
rf.rollback(1);assert.equal(state.currentSceneId,'B');rf.rollback(-1);assert.equal(rf.prepareChoice(),true);
state={...clone(first),currentSceneId:'C',flags:['autre']};rf.settle(true);rf.scene({sceneId:'C',title:'Autre',narrative:'Autre.',choices:[],renderedState:clone(state)});rf.rollback(1);assert.equal(state.currentSceneId,'C');
state.noRollback=true;rf.rollback(-1);assert.equal(state.currentSceneId,'C');state.noRollback=false;
const epoch=rf.epoch;rf.cleanup();assert(rf.epoch>epoch);assert.equal(rf.current,null);assert.equal(rf.busy,false);assert.equal(node('rf-tools').hidden,true);
// Exécute la véritable fonction d’import avec FileReader simulé.
ctx._visitedScenes=new Set(['old-scene']);storage.set('ef_gallery',JSON.stringify(['old-image']));
vm.runInContext(main.slice(main.indexOf('function importSave(event)'),main.indexOf('function autoSave()')),ctx);
ctx.importSave({target:{files:[{text:JSON.stringify({backupVersion:1,state:{gameMode:'classic',currentSceneId:'A',flags:[],achievements:['from-backup']},achievements:['second-achievement'],gallery:['new-image'],visitedScenes:['new-scene'],coverage:{scenes:{'classic:NEW':true},edges:{},music:[]}})}]}});
assert.deepEqual(JSON.parse(storage.get('ef_gallery')),['old-image','new-image']);assert(ctx._visitedScenes.has('old-scene'));assert(ctx._visitedScenes.has('new-scene'));assert(state.achievements.includes('permanent'));assert(state.achievements.includes('from-backup'));assert(rf.coverage.scenes['classic:NEW']);
const before=clone(state);ctx.importSave({target:{files:[{text:'{"state":null}'}]}});assert.deepEqual(state,before);
console.log(JSON.stringify({ok:true,checks:['instantanés complets','double clic bloqué','retour et avance','nouvelle branche invalide l’avance','mode sans retour','réponses réseau périmées invalidées','import fusionne galerie et découvertes','import invalide préserve la partie'],environment:'Node VM avec DOM/FileReader simulés'},null,2));
