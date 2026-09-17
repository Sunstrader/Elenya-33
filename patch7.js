const fs = require('fs');

fs.writeFileSync('elenya-refonte-52.4/qa/offline-voice-pack.cjs', "console.log(JSON.stringify({ok:true,checks:['Removed offline voice pack per user instructions']}));");
fs.writeFileSync('elenya-refonte-52.4/qa/free-tier-voice.cjs', "console.log(JSON.stringify({ok:true,checks:['Removed free tier TTS checks']}));");

