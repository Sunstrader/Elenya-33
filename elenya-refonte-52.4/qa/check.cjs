// Contrôles reproductibles du vrai moteur GAS dans Node (services Google simulés).
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {loadEngine}=require('./engine.cjs');
const root=path.resolve(__dirname,'../project'),{api,ctx,props}=loadEngine(root);
const clone=x=>JSON.parse(JSON.stringify(x)),checks=[];
function check(name,fn){fn();checks.push(name)}
check('Syntaxe de tous les scripts et des scripts HTML',()=>{
  let combined='';for(const f of fs.readdirSync(root)){const source=fs.readFileSync(path.join(root,f),'utf8');if(f.endsWith('.js'))new vm.Script(source,{filename:f});
    if(f.endsWith('.html'))for(const m of source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)){if(!m[1].includes('<?'))new vm.Script(m[1],{filename:f});if(['Scripts_Game.html','Scripts_Refonte.html','Character_3D_Runtime.html'].includes(f))combined+=m[1]+'\n';}}
  new vm.Script(combined);
});
check('247 scènes, destinations présentes, aucun cul-de-sac déclaré',()=>{const r=api.serverValidateDatabase();assert.equal(r.scenes+r.ngPlusScenes,247);for(const k of ['missing','deadEnds','placeholders'])assert.equal(r[k].length,0,k)});
check('Campagne classique : contrôles de régression préexistants',()=>assert.equal(ctx.serverRunComprehensiveQA().ok,true));
check('72 choix NG+, tous avec réponse immédiate',()=>{const choices=Object.values(api.NGPLUS_DB).flatMap(s=>s.choices||[]);assert.equal(choices.length,72);assert(choices.every(c=>c.response))});
check('Cinq nouvelles branches : textes, effets et reconnexions',()=>{
  for(const [source,key,target] of [['NGP_05_CONFRERIE','OMBRE','NGP_05A_ARCHIVES'],['NGP_05_CONFRERIE','ECLAIREUR','NGP_05B_SCEAU'],['NGP_05_CONFRERIE','LIBERTE','NGP_05C_CENDRES'],['NGP_07_KAELEN_ECHO','STAY','NGP_07B_PAS'],['NGP_08_ALISTAIR_ECHO','STAY','NGP_08B_SEUIL']]){
    const result=api.serverProcessChoice({gameMode:'ngplus',currentSceneId:source},key);assert.equal(result.error,null);assert.equal(result.updatedState.currentSceneId,target);assert(result.nextSceneData.narrative.length>100);
    for(const choice of result.nextSceneData.choices){const r=api.serverProcessChoice(clone(result.updatedState),choice.key);assert.equal(r.error,null);assert(r.nextSceneData.choiceResponse);assert.equal(r.updatedState.stats.choicesMade,2);}
  }
});
check('Reprendre conserve une réponse, sans la dupliquer',()=>{const r=api.serverProcessChoice({gameMode:'ngplus'},'MEMOIRE'),resumed=api.serverGetPendingScene(clone(r.updatedState));assert.equal(resumed.narrative,r.nextSceneData.narrative);assert.equal(resumed.renderedState.currentSceneId,r.updatedState.currentSceneId)});
check('Choix invalide refusé sans incrémentation ni réponse',()=>{const s=api.serverGetPendingScene({gameMode:'ngplus'}).renderedState,r=api.serverProcessChoice(clone(s),'INEXISTANT');assert(r.error);assert.equal(r.updatedState.currentSceneId,s.currentSceneId);assert.equal(r.updatedState.stats.choicesMade,s.stats.choicesMade)});
check('Refus explicite d’une romance respecté en NG+',()=>{const s=api.serverGetPendingScene({gameMode:'ngplus',currentSceneId:'NGP_15_DERNIER_CHOIX',flags:['ngplus_route_O','ngplus_kaelen_amitie']});assert(!s.choices.some(c=>c.key==='LOVE'));assert(api.serverProcessChoice(clone(s.renderedState),'LOVE').error)});
check('Trône détruit : aucune invitation contradictoire à le rejoindre',()=>{const s=api.serverGetPendingScene({gameMode:'ngplus',currentSceneId:'NGP_15_DERNIER_CHOIX',flags:['ngplus_route_both','ngplus_trone_detruit']});assert(!s.choices.some(c=>c.key==='THRONE'))});
check('Fen : choix direct vers le matin, sans flashback parasite',()=>{const start={gameMode:'classic',currentSceneId:'ACTE2_06_NUIT_AUBERGE',flags:['voie_solo'],gauges:{presence_S:0,tension_triangle:0}};const result=api.serverProcessChoice(start,'S');assert.equal(result.updatedState.currentSceneId,'ACTE2_08_MATIN_AUBERGE');assert.match(result.nextSceneData.title,/Froid Trahisseur/i);assert.match(result.nextSceneData.narrative,/Ils descendent avec toi/i)});
check('Effet de combat fidèle au choix, aucun gel des compagnons hors scénario',()=>{for(const [k,effect] of [['A','ice-storm'],['B','ice-lance']]){const r=api.serverProcessChoice({currentSceneId:'ACTE3_02_SAUVETAGE'},k);assert.equal(r.nextSceneData.presentation.effect,effect);assert.equal(r.nextSceneData.presentation.frozenCharacter,null);assert.equal(/basalt-ravine-oblique/.test(r.nextSceneData.image),k==='B')}});
check('Sauvegarde longue fragmentée et rechargée sans perte',()=>{const state=api.normalizeGameState({currentSceneId:'ACTE1_01_REVEIL',narrative:{testArchive:'Mémoire❄️'.repeat(2800)},noRollback:true});assert(ctx.serverSaveGame(clone(state)).ok);const loaded=ctx.serverLoadGame('classic');assert(loaded.ok);assert.equal(loaded.state.narrative.testArchive,state.narrative.testArchive);assert.equal(loaded.state.noRollback,true);for(const [key,value]of props)if(key.includes('_chunk_'))assert(Buffer.byteLength(value)<8000)});
check('Échec d’écriture : sauvegarde précédente encore lisible',()=>{
  const store=ctx.PropertiesService.getUserProperties(),original=store.setProperty;let count=0;store.setProperty=(k,v)=>{if(k.includes('_chunk_')&&++count===2)throw new Error('Quota simulé');return original(k,v)};
  const before=ctx.serverLoadGame('classic').state.narrative.testArchive;const r=ctx.serverSaveGame({currentSceneId:'ACTE1_01_REVEIL',narrative:{testArchive:'Autre'.repeat(5000)}});store.setProperty=original;assert.equal(r.ok,false);assert.equal(ctx.serverLoadGame('classic').state.narrative.testArchive,before);
});
check('Ancienne sauvegarde JSON toujours reconnue',()=>{props.delete('elenya_state_ngplus_manifest');props.set('elenya_state_ngplus',JSON.stringify({gameMode:'ngplus',currentSceneId:'NGP_07_KAELEN_ECHO',flags:['ngplus_route_O'],achievements:['ach_fin_solo']}));const r=ctx.serverLoadGame('ngplus');assert(r.ok);assert.equal(r.state.currentSceneId,'NGP_07_KAELEN_ECHO');assert(r.state.achievements.includes('ach_fin_solo'))});
check('Catalogue de la carte et 33 fins conservés',()=>{const r=ctx.serverGetExplorer();assert.equal(r.scenes.filter(s=>s.end).length,33);assert.equal(r.backgrounds.length,8);assert.equal(api.ELENYA_ENDING_VIDEO_IDS_V55.length,33)});
let seed=524;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const journeys={classic:{runs:0,endings:{},errors:[],steps:[]},ngplus:{runs:0,endings:{},errors:[],steps:[]}};
for(const mode of ['classic','ngplus'])for(let run=0;run<350;run++){
  let state={gameMode:mode},route=[],out=journeys[mode];out.runs++;
  for(let step=0;step<180;step++){
    const data=api.serverGetPendingScene(clone(state));if(!data){out.errors.push({run,reason:'rendu null',state:state.currentSceneId});break;}
    state=data.renderedState;if(data.isEnd){out.endings[state.currentSceneId]??=route;out.steps.push(step);break;}
    if(!data.choices.length){out.errors.push({run,reason:'aucun choix visible',scene:state.currentSceneId});break;}
    const choice=data.choices[Math.floor(random()*data.choices.length)];route.push([state.currentSceneId,choice.key]);const result=api.serverProcessChoice(clone(state),choice.key);
    if(result.error){out.errors.push({run,reason:result.error,scene:state.currentSceneId});break;}state=result.updatedState;
    if(step===179)out.errors.push({run,reason:'limite 180 transitions',scene:state.currentSceneId});
  }
}
check('700 parcours automatiques sans blocage',()=>{assert.equal(journeys.classic.errors.length,0,JSON.stringify(journeys.classic.errors.slice(0,3)));assert.equal(journeys.ngplus.errors.length,0,JSON.stringify(journeys.ngplus.errors.slice(0,3)))});
check('Les six fins NG+ atteintes par des parcours réels',()=>assert.equal(Object.keys(journeys.ngplus.endings).length,6));
const report={version:api.BUILD_VERSION,environment:'Node VM ; services Google simulés, sans navigateur réel',checks,journeys,limitations:['Pas de validation visuelle ni de clics sur le déploiement Google Apps Script.','Les parcours aléatoires ne prouvent pas toutes les combinaisons de choix.','Audio et synthèse vocale à vérifier sur les appareils cibles.']};
fs.writeFileSync(path.join(__dirname,'resultats-moteur.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({ok:true,checks:checks.length,classicEnds:Object.keys(journeys.classic.endings).length,ngPlusEnds:Object.keys(journeys.ngplus.endings).length},null,2));
