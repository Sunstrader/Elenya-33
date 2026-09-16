'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {loadEngine}=require('./engine.cjs');
const root=path.resolve(__dirname,'../project');
const corpus=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../assets/voices/voice-corpus.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../assets/voices/pack-manifest.json'),'utf8'));
const {api}=loadEngine(root);

assert.equal(corpus.language,'fr-FR');
assert.equal(corpus.sceneCounts.classic+corpus.sceneCounts.ngplus,246,'Le corpus doit couvrir les 246 scènes jouables hors ERREUR_SCENE');
assert(corpus.uniqueSegments>2000,'Le corpus semble incomplet');
assert(corpus.variants>1000,'Les variantes dynamiques semblent sous-échantillonnées');
assert(corpus.byKind.narrative>1000,'Narrations manquantes');
assert.equal(corpus.byKind.choiceResponse,174,'Toutes les réponses de choix doivent être incluses');
assert(corpus.byKind.choice>=500,'Les choix lisibles doivent être inclus');
assert.equal(manifest.apiRequiredForPlayers,false);
assert.equal(manifest.corpus,'voice-corpus.json');
for(const voice of ['Algenib','Achird','Sulafat','Leda']) assert(manifest.voices[voice],`Voix absente: ${voice}`);

// Régression : cette scène lit directement gs.timers. Le wrapper de SceneManager
// doit désormais exposer une copie des timers, sinon cette branche disparaît.
const state=api.normalizeGameState({gameMode:'classic',currentSceneId:'ACTE3_09B_BIVOUAC_TEMPETE',timers:{venin:2},gauges:{instabilite:10},flags:[]});
const manager=new api.SceneManager(state);
const rendered=manager.renderScene('ACTE3_09B_BIVOUAC_TEMPETE');
assert(rendered.narrative.includes('Il te reste deux jours'), 'La branche venin=2 doit être rendue');
assert(Array.isArray(rendered.voiceParts)&&rendered.voiceParts.some(p=>p.kind==='narrative'),'voiceParts doit exposer la narration canonique');

// Aucun ancien échantillon anglais AI Studio ne doit être embarqué dans le client.
const client=fs.readFileSync(path.resolve(root,'Scripts_Refonte.html'),'utf8');
assert(!client.includes('gstatic.com/aistudio/voices/samples'),'Les aperçus anglais ne doivent plus être utilisés');
assert(client.includes("VOICE_PACK_BASE+'previews/algenib.ogg'"),'Aperçu français local Algenib absent');
assert(client.includes('Aperçu français de secours'),'Fallback français explicite absent');
assert(client.includes('data.voiceParts'),'Le lecteur doit utiliser les morceaux canoniques fournis par le serveur');

console.log(JSON.stringify({ok:true,uniqueSegments:corpus.uniqueSegments,variants:corpus.variants,charactersPerVoice:corpus.uniqueCharacters,byKind:corpus.byKind,timerWrapper:'ok',voiceParts:'ok',englishPreviewsRemoved:true},null,2));
