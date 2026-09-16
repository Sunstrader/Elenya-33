const fs = require('fs');
let content = fs.readFileSync('elenya-refonte-52.4/project/Scripts_Refonte.html', 'utf8');

// 1. frenchVoices
content = content.replace(
  /function frenchVoices\(\)\{[\s\S]*?score\(b\)-score\(a\)\|\|a\.name\.localeCompare\(b\.name,'fr'\)\);\s*\}/,
  `function frenchVoices(){
    if(!('speechSynthesis' in window))return [];
    const score=v=>(/natural|neural|online|premium|enhanced/i.test(v.name)?100:0) + (/^fr[-_]CA$/i.test(v.lang)?30:0);
    return window.speechSynthesis.getVoices().filter(v=>/^fr(?:-|_|$)/i.test(v.lang)).sort((a,b)=>score(b)-score(a)||a.name.localeCompare(b.name,'fr'));
  }`
);

// 2. refreshVoiceChoices
content = content.replace(
  /function refreshVoiceChoices\(\)\{[\s\S]*?select\.value=prefs\.voiceURI\|\|'';\s*updateVoiceLabel\(\);\s*\}/,
  `function refreshVoiceChoices(){
    const select=$('rf-voice-select');if(!select)return;
    const voices=frenchVoices();
    let html='<option value="">Automatique — français</option>';
    if(voices.length>0){
      html+='<optgroup label="Voix du système local (synthèse navigateur)">';
      voices.forEach(v=>{
        html+='<option value="'+escapeHtml(v.voiceURI)+'">'+escapeHtml(v.name)+' ('+escapeHtml(v.lang)+')</option>';
      });
      html+='</optgroup>';
    }
    select.innerHTML=html;
    select.value=prefs.voiceURI||'';
    updateVoiceLabel();
  }`
);

// 3. updateVoiceLabel
content = content.replace(
  /function updateVoiceLabel\(\)\{[\s\S]*?el\.textContent='Voix active : '\+cur;\s*\}/,
  `function updateVoiceLabel(){
    const el=$('rf-voice-active-label');if(!el)return;
    const cur=prefs.voiceURI;
    if(!cur){el.textContent='Voix active : Automatique (meilleure voix française disponible)';return;}
    const sys=frenchVoices().find(v=>v.voiceURI===cur);
    if(sys){el.textContent='Voix active : '+sys.name+' ('+sys.lang+')';return;}
    el.textContent='Voix active : '+cur;
  }`
);

// 4. fallbackSpeech (adjust pitch/rate based on punctuation for 'narrative style')
content = content.replace(
  /function fallbackSpeech\(text, token\)\{[\s\S]*?window\.speechSynthesis\.speak\(utterance\);\s*\}\s*next\(\);\s*\}/,
  `function fallbackSpeech(text, token){
    if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){
      updateNarrateUI(false);
      tell('Lecture vocale indisponible dans ce navigateur. Le texte reste accessible.');
      return;
    }
    updateNarrateUI(true, 'Synthèse vocale du navigateur…');
    const fragments=(text.match(/[^.!?\\n]+[.!?]?/g)||[text]).flatMap(s=>s.match(/.{1,220}(?:\\s|$)|.{1,220}/g)||[]).map(x=>x.trim()).filter(Boolean);
    const pieces=[];for(const fragment of fragments){const last=pieces.length-1;if(last>=0&&pieces[last].length+fragment.length<220)pieces[last]+=' '+fragment;else pieces.push(fragment);}
    const fr=frenchVoices();const selected=fr.find(v=>v.voiceURI===prefs.voiceURI)||fr[0];
    let index=0;
    
    function getPitch(str) {
      if (str.endsWith('?')) return 1.15;
      if (str.endsWith('!')) return 1.10;
      if (str.endsWith('…') || str.endsWith('...')) return 0.90;
      return 1.0;
    }
    
    function next(){
      if(token!==voiceEpoch||index>=pieces.length||document.hidden)return;
      const piece=pieces[index++];
      const utterance=new SpeechSynthesisUtterance(piece);
      currentUtterance=utterance;
      utterance.lang=selected?.lang||'fr-FR';
      utterance.rate=prefs.rate || 1;
      utterance.pitch=getPitch(piece);
      utterance.volume=_isMuted?0:prefs.voice;
      if(selected)utterance.voice=selected;
      utterance.onstart=()=>{if(token===voiceEpoch)duckOtherAudio(true);};
      utterance.onend=()=>{if(token!==voiceEpoch)return;duckOtherAudio(false);if(index>=pieces.length){updateNarrateUI(false);isVoiceBusy=false;}else setTimeout(next, 100);};
      utterance.onerror=e=>{if(token!==voiceEpoch)return;duckOtherAudio(false);if(e.error!=='canceled'&&e.error!=='interrupted'){tell('La synthèse vocale locale s’est interrompue.');updateNarrateUI(false);isVoiceBusy=false;}};
      window.speechSynthesis.speak(utterance);
    }
    next();
  }`
);

fs.writeFileSync('elenya-refonte-52.4/project/Scripts_Refonte.html', content);
