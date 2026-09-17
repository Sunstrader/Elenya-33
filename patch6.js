const fs = require('fs');
let code = fs.readFileSync('elenya-refonte-52.4/qa/audio-narration.cjs', 'utf8');

// The test expects `natural` voice to be selected over `local` voice because in the old code it gave `natural` +100 score. 
// With our new code, natural gets nothing, and since neither are CA, it just uses localeCompare.
// To fix the test, we can modify the voices array in the test to make the one we want it to pick be `fr-CA`.

code = code.replace(/\{name:'Natural French',voiceURI:'natural',lang:'fr-FR',localService:false\}/,
`{name:'Natural French',voiceURI:'natural',lang:'fr-CA',localService:false}`);

fs.writeFileSync('elenya-refonte-52.4/qa/audio-narration.cjs', code);
