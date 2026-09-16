// Recherche déterministe de parcours légaux vers les fins rares ; aucun état injecté.
const fs=require('node:fs');const {api}=require('./engine.cjs').loadEngine(__dirname+'/../project');
const clone=x=>JSON.parse(JSON.stringify(x)),db=api.DB;
const baseline=JSON.parse(fs.readFileSync(__dirname+'/resultats-moteur.json'));
const found={...baseline.journeys.classic.endings},errors=[];let seed=940,count=0;
const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const finalChoices=Object.entries(db).flatMap(([id,s])=>(s.choices||[]).filter(c=>db[c.next]?.isEnd).map(c=>({id,...c})));
const ends=Object.keys(db).filter(id=>db[id].isEnd);
for(const target of ends.filter(id=>!found[id])){
  const guards=finalChoices.filter(c=>c.next===target),pos=new Set(),neg=new Set(),related=new Set();
  for(const c of guards){related.add(c.id);const str=String(c.condition||'');for(const m of str.matchAll(/(!?)gs\.hasFlag\(['"]([^'"]+)['"]\)/g))(m[1]?neg:pos).add(m[2]);}
  for(let level=0;level<2;level++)for(const[id,s]of Object.entries(db))for(const c of s.choices||[]){if((c.effects||[]).some(e=>e.type==='SET_FLAG'&&pos.has(e.target))){related.add(id);for(const m of String(c.condition||'').matchAll(/(?<!!)gs\.hasFlag\(['"]([^'"]+)['"]\)/g))pos.add(m[1]);}}
  const low=/MORTELLE|RECONCILIATION|EQUILIBRE|REDEMPTION|VERITE|ACTE5/.test(target);
  for(let run=0;run<100&&!found[target];run++){
    count++;let state={gameMode:'classic'},route=[];
    for(let step=0;step<180;step++){
      const data=api.serverGetPendingScene(clone(state));if(!data){errors.push({target,reason:'null'});break;}state=data.renderedState;
      if(data.isEnd){found[state.currentSceneId]??=route.slice();if(!data.postEnding||!/^ACTE5/.test(target))break;}
      if(!data.choices.length){errors.push({target,scene:state.currentSceneId,reason:'no choices'});break;}
      const options=data.choices.map(c=>{
        const raw=db[state.currentSceneId].choices.find(x=>x.key===c.key);let score=(random()-.5)*(run%4+1.5);
        if(c.next===target)score+=200;
        if(db[c.next]?.isEnd&&c.next!==target)score-=20;
        if(related.has(c.next))score+=2;
        for(const e of raw.effects||[]){if(e.type==='SET_FLAG'){if(pos.has(e.target))score+=5;if(neg.has(e.target))score-=10;if(/mort|perdu_definitif/.test(e.target))score-=5;}
          if(e.type==='ADD_GAUGE'){if(e.target==='instabilite')score-=Number(e.value)*(low?.7:.12);if(e.target==='memoire_kalthar'&&/VERITE|EQUILIBRE/.test(target))score+=Number(e.value)*.7;if(e.target==='possession')score-=Number(e.value)*.15;}
          if(e.type==='ADD_TIMER'&&e.target==='venin'&&state.timers.venin<3)score+=Number(e.value);
        }
        return {c,score};
      }).sort((a,b)=>b.score-a.score);
      const choice=options[0].c;route.push([state.currentSceneId,choice.key]);const result=api.serverProcessChoice(clone(state),choice.key);if(result.error){errors.push({target,reason:result.error});break;}state=result.updatedState;
    }
  }
}
fs.writeFileSync(__dirname+'/resultats-fins-ciblees.json',JSON.stringify({runs:count,reached:Object.keys(found),notReached:ends.filter(id=>!found[id]),errors,routes:found,limits:'Recherche heuristique finie. Une fin non atteinte ici n’est pas démontrée inaccessible.'},null,2));
console.log(JSON.stringify({runs:count,reached:Object.keys(found).length,notReached:ends.filter(id=>!found[id]),errors:errors.length},null,2));
