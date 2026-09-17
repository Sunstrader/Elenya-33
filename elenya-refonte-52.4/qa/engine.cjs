const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function loadEngine(root, customProps) {
  const props = customProps || new Map();
  const propertyStore = {getProperty:k=>props.get(k)||null,setProperty:(k,v)=>props.set(k,v),deleteProperty:k=>props.delete(k)};
  let uuid=0;
  const ctx = vm.createContext({console, Date, Math, JSON, PropertiesService:{getUserProperties:()=>propertyStore,getScriptProperties:()=>propertyStore}, Logger:{log:()=>{}}, Utilities:{getUuid:()=> 'qa-uuid-'+(++uuid)}});
  const files = ['20_Core_Helpers.js','21_Assets.js','22_State.js','10_Triggers.js',
    'DATABASE_Acte1.js','DATABASE_Acte2.js','DATABASE_Acte3.js','DATABASE_Acte4.js','DATABASE_Acte5.js',
    'DATABASE_Relations.js','DATABASE_Fragments.js','DATABASE_Secondary.js','DATABASE_Endings.js','DATABASE_Misc.js',
    'DATABASE_Index.js','DATABASE_NGPlus.js','23_Refonte.js','24_NGPlus_Ultra.js','30_SceneManager.js','50_Server_API.js','90_QA.js','95_NGPlus_Ultra_QA.js'];
  for(const f of files) if(fs.existsSync(path.join(root,f))) vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx,{filename:f});
  vm.runInContext('if(typeof applyRefonte_==="function")applyRefonte_(); globalThis.api = {DB, NGPLUS_DB, SceneManager, normalizeGameState, serverGetPendingScene, serverProcessChoice, serverValidateDatabase, BUILD_VERSION, ELENYA_ENDING_VIDEO_IDS_V55};',ctx);
  return {ctx,api:ctx.api,props};
}

// Moteur stateless isolé pour le serveur web : compile les scripts une fois et exécute chaque requête dans un sandbox propre sans état persistant partagé
function createIsolatedEngine(root) {
  const files = ['20_Core_Helpers.js','21_Assets.js','22_State.js','10_Triggers.js',
    'DATABASE_Acte1.js','DATABASE_Acte2.js','DATABASE_Acte3.js','DATABASE_Acte4.js','DATABASE_Acte5.js',
    'DATABASE_Relations.js','DATABASE_Fragments.js','DATABASE_Secondary.js','DATABASE_Endings.js','DATABASE_Misc.js',
    'DATABASE_Index.js','DATABASE_NGPlus.js','23_Refonte.js','24_NGPlus_Ultra.js','30_SceneManager.js','50_Server_API.js','95_NGPlus_Ultra_QA.js'];
  const compiled = files.filter(f=>fs.existsSync(path.join(root,f))).map(f=>new vm.Script(fs.readFileSync(path.join(root,f),'utf8'),{filename:f}));
  const initScript = new vm.Script('if(typeof applyRefonte_==="function")applyRefonte_();');
  // Charge une instance de référence pour les métadonnées statiques immuables (catalogue scènes, fins, musiques)
  const ref = loadEngine(root);
  return {
    referenceApi: ref.api,
    run(fnName, args, customProps) {
      const tempProps = customProps ? new Map(customProps) : new Map();
      const propertyStore = {getProperty:k=>tempProps.get(k)||null,setProperty:(k,v)=>tempProps.set(k,v),deleteProperty:k=>tempProps.delete(k)};
      let uuid = 0;
      const ctx = vm.createContext({console, Date, Math, JSON, PropertiesService:{getUserProperties:()=>propertyStore,getScriptProperties:()=>propertyStore}, Logger:{log:()=>{}}, Utilities:{getUuid:()=> 'iso-uuid-'+(++uuid)}});
      for(const s of compiled) s.runInContext(ctx);
      initScript.runInContext(ctx);
      if(typeof ctx[fnName] !== 'function') throw new Error('Fonction introuvable: ' + fnName);
      return ctx[fnName].apply(null, args);
    }
  };
}
if(require.main===module){
  const root=path.resolve(process.argv[2]||path.join(__dirname,'../project'));
  const {api}=loadEngine(root);
  console.log(JSON.stringify(api.serverValidateDatabase(),null,2));
  for(const [mode,db] of [['classic',api.DB],['ngplus',api.NGPLUS_DB]]) {
    const scenes=Object.entries(db), choices=scenes.flatMap(([id,s])=>(s.choices||[]).map(c=>({id,...c})));
    const backgrounds=[...new Set(scenes.map(([,s])=>s.image).filter(Boolean))];
    console.log(JSON.stringify({mode,scenes:scenes.length,choices:choices.length,withoutResponse:choices.filter(c=>!c.response).length,staticBackgrounds:backgrounds.length,ends:scenes.filter(([,s])=>s.isEnd).length}));
    if(mode==='ngplus') console.log(scenes.map(([id,s])=>({id,title:s.title,choices:(s.choices||[]).map(c=>({key:c.key,hasResponse:!!c.response,next:c.next}))})));
  }
}
module.exports={loadEngine,createIsolatedEngine};