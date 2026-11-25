'use strict';
(()=>{
 const $=(q,r=document)=>r.querySelector(q),$$=(q,r=document)=>[...r.querySelectorAll(q)],D=SEVENTH_DATA,T=SeventhTheory;
 const sets={build:D.build,identify:D.identify,invert:D.inversions};
 const states={build:D.build.map(q=>[q.root,'','','']),invert:D.inversions.map(()=>['','','',''])};
 const selected={build:D.build.map(()=>1),invert:D.inversions.map(()=>0)};
 const position=['Root position','First inversion','Second inversion','Third inversion'];
 const chordLabel=q=>T.display(T.parse(q.root).name)+' '+q.quality;
 const options=(vals,current)=>vals.map(([v,l])=>`<option value="${v}"${v===current?' selected':''}>${l}</option>`).join('');
 function noteControls(kind,i,slot){
  const fixed=kind==='build'&&slot===0,n=T.parse(states[kind][i][slot]),labels=kind==='build'?['Root (given)','Third','Fifth','Seventh']:['Lowest note','Second note','Third note','Highest note'];
  const pref=`${kind}-${i}-${slot}`;
  return `<fieldset data-slot-controls="${slot}"${slot!==selected[kind][i]?' hidden':''}><legend>${labels[slot]}</legend><div class="note-controls"><label for="${pref}-letter">Letter<select id="${pref}-letter" data-part="letter"${fixed?' disabled class="fixed-note"':''}>${options([['','Choose'],...'CDEFGAB'.split('').map(l=>[l,l])],n?.letter||'')}</select></label><label for="${pref}-acc">Accidental<select id="${pref}-acc" data-part="acc"${fixed?' disabled class="fixed-note"':''}>${options([['','Natural ♮'],['b','Flat ♭'],['#','Sharp ♯'],['bb','Double flat ♭♭'],['##','Double sharp ♯♯']],n?.acc||'')}</select></label><label for="${pref}-octave">Octave<select id="${pref}-octave" data-part="octave"${fixed?' disabled class="fixed-note"':''}>${options([1,2,3,4,5,6].map(o=>[String(o),String(o)]),String(n?.octave||T.parse(sets[kind][i].root).octave))}</select></label></div></fieldset>`;
 }
 function extraControls(kind,i,q){
  if(kind==='build')return `<div class="construction-labels" data-extra><label for="${kind}-${i}-triad">Triad quality<select id="${kind}-${i}-triad" data-triad>${options([['','Choose'],['major','Major'],['minor','Minor'],['diminished','Diminished']],'')}</select></label><label for="${kind}-${i}-seventh">Root-to-seventh interval<select id="${kind}-${i}-seventh" data-seventh>${options([['','Choose'],['M7','Major 7th'],['m7','Minor 7th'],['d7','Diminished 7th']],'')}</select></label></div>`;
  return `<div class="construction-labels" data-extra><label for="${kind}-${i}-member">Chord member in the bass<select id="${kind}-${i}-member" data-member>${options([['','Choose'],['root','Root'],['third','Third'],['fifth','Fifth'],['seventh','Seventh']],'')}</select></label></div>`;
 }
 function actions(kind){return `<div class="practice-actions"><button type="button" data-check="${kind}">Check all answers</button><button type="button" data-reset="${kind}">Reset this set</button><p id="${kind}-feedback" role="status"></p></div>`;}
 function cardTitle(kind,q,i){return `${i+1}. ${T.esc(chordLabel(q))}${kind==='invert'?' · '+position[q.inversion]:''}`;}
 for(const kind of ['build','invert']){
  $('#'+kind+'-mount').innerHTML=(kind==='build'?'<p id="staff-help" class="practice-help">Staff entry: choose a note slot, then click or tap at its height. Arrow Up/Down moves one staff step; choose accidentals separately. Middle C is C4.</p>':'')+'<div class="triad-grid">'+sets[kind].map((q,i)=>{
   const labels=kind==='build'?['Root (given)','Third','Fifth','Seventh']:['Lowest','Second','Third','Highest'];
   return `<article class="triad-question" data-kind="${kind}" data-question="${i}"><h3>${cardTitle(kind,q,i)}</h3><p class="clef-label">${q.clef==='bass'?'Bass':'Treble'} clef</p><div class="staff-mount">${T.svg(states[kind][i],'Question '+(i+1)+' editable staff',true,selected[kind][i],q.clef)}</div><div class="note-slots" role="group" aria-label="Choose the note to edit">${labels.map((l,s)=>`<button type="button" data-slot="${s}" aria-pressed="${s===selected[kind][i]}">${l}</button>`).join('')}</div>${[0,1,2,3].map(s=>noteControls(kind,i,s)).join('')}<p class="spelling-note">Notes, low to high: <span data-note-list>${T.esc(states[kind][i].map(p=>p?T.display(p):'—').join(' · '))}</span></p>${extraControls(kind,i,q)}<div class="practice-actions"><button type="button" data-check-one>Check this chord</button></div><p class="question-feedback" role="status"></p></article>`;
  }).join('')+'</div>'+actions(kind);
 }
 $('#identify-mount').innerHTML='<div class="triad-grid">'+D.identify.map((q,i)=>`<article class="triad-question" data-kind="identify" data-question="${i}"><h3>${i+1}. Identify the seventh chord</h3>${T.svg(q.notes,'Notated seventh chord for question '+(i+1),false,0,q.clef)}<label for="identify-${i}-root">Root<input id="identify-${i}-root" data-root autocomplete="off" spellcheck="false" maxlength="24" placeholder="e.g. E-flat"></label><label for="identify-${i}-quality">Quality<select id="identify-${i}-quality" data-quality>${options([['','Choose'],...D.qualities.map(q=>[q.name,q.name])],'')}</select></label><p class="question-feedback" role="status"></p></article>`).join('')+'</div>'+actions('identify');
 function clear(card){card.classList.remove('correct','incorrect');$('.question-feedback',card).textContent='';$$('input,select',card).forEach(el=>el.removeAttribute('aria-invalid'));$('#'+card.dataset.kind+'-feedback').textContent='';}
 function draw(card){const {kind,question}=card.dataset,i=Number(question);$('.staff-mount',card).innerHTML=T.svg(states[kind][i],'Question '+(i+1)+' editable staff',true,selected[kind][i],sets[kind][i].clef);$('[data-note-list]',card).textContent=states[kind][i].map(p=>p?T.display(p):'—').join(' · ');}
 function selectSlot(card,slot){const {kind,question}=card.dataset;selected[kind][Number(question)]=slot;$$('[data-slot]',card).forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.slot)===slot)));$$('[data-slot-controls]',card).forEach(f=>f.hidden=Number(f.dataset.slotControls)!==slot);draw(card);}
 function setStaffNote(card,step){
  const {kind,question}=card.dataset,i=Number(question),slot=selected[kind][i];
  if(kind==='build'&&slot===0){$('.question-feedback',card).textContent='The root is supplied. Choose Third, Fifth, or Seventh to enter a note.';return;}
  const f=$(`[data-slot-controls="${slot}"]`,card),acc=$('[data-part="acc"]',f).value;
  const p=T.fromStep(Math.max(7,Math.min(48,step)),acc),n=T.parse(p);states[kind][i][slot]=p;
  $('[data-part="letter"]',f).value=n.letter;$('[data-part="octave"]',f).value=String(n.octave);clear(card);draw(card);
 }
 function check(card){
  const {kind,question}=card.dataset,i=Number(question),q=sets[kind][i];
  const ok=kind==='identify'?T.rootName($('[data-root]',card).value)===T.parse(q.root).name&&$('[data-quality]',card).value===q.quality:T.checkNotes(states[kind][i],q)&&(kind==='build'?$('[data-triad]',card).value===q.triadQuality&&$('[data-seventh]',card).value===q.seventhQuality:$('[data-member]',card).value===['root','third','fifth','seventh'][q.inversion]);
  card.classList.toggle('correct',ok);card.classList.toggle('incorrect',!ok);
  $$('input,select',card).filter(el=>!el.disabled).forEach(el=>el.setAttribute('aria-invalid',String(!ok)));
  $('.question-feedback',card).textContent=ok?'Correct.':kind==='identify'?'Try again. Check the root spelling and the triad quality and root-to-seventh interval.':'Try again. Check the spelling, accidentals, and lowest note; enter all four notes from low to high and complete the labels.';
  return ok;
 }
 $$('.triad-question').forEach(card=>{
  const kind=card.dataset.kind,i=Number(card.dataset.question);
  $$('[data-extra] select',card).forEach(el=>el.addEventListener('change',()=>clear(card)));
  if(kind==='identify'){$$('input,select',card).forEach(el=>el.addEventListener('input',()=>clear(card)));return;}
  card.addEventListener('click',e=>{
   const b=e.target.closest('[data-slot]');if(b){selectSlot(card,Number(b.dataset.slot));return;}
   if(e.target.closest('[data-check-one]')){check(card);return;}
   const svg=e.target.closest('.staff-mount svg');if(svg){const box=svg.getBoundingClientRect(),y=svg.viewBox.baseVal.y+(e.clientY-box.top)/box.height*svg.viewBox.baseVal.height;setStaffNote(card,T.base(sets[kind][i].clef)+Math.round((150-y)/6));$('.staff-mount svg',card).focus({preventScroll:true});}
  });
  card.addEventListener('keydown',e=>{if(e.target.matches('.staff-mount svg')&&(e.key==='ArrowUp'||e.key==='ArrowDown')){e.preventDefault();const n=T.parse(states[kind][i][selected[kind][i]]);setStaffNote(card,(n?.step||T.base(sets[kind][i].clef))+(e.key==='ArrowUp'?1:-1));$('.staff-mount svg',card).focus({preventScroll:true});}});
  $$('[data-slot-controls] select',card).forEach(el=>el.addEventListener('change',()=>{
   const f=el.closest('fieldset'),slot=Number(f.dataset.slotControls),l=$('[data-part="letter"]',f).value,a=$('[data-part="acc"]',f).value,o=$('[data-part="octave"]',f).value;
   states[kind][i][slot]=l?l+a+o:'';clear(card);draw(card);
  }));
 });
 $$('[data-check]').forEach(button=>button.addEventListener('click',()=>{const kind=button.dataset.check;let count=0;$$(`[data-kind="${kind}"]`).forEach(c=>count+=check(c));$('#'+kind+'-feedback').textContent=`${count} of ${sets[kind].length} correct.${count===sets[kind].length?' You completed this set!':''}`;}));
 $$('[data-reset]').forEach(button=>button.addEventListener('click',()=>{
  const kind=button.dataset.reset;$$(`[data-kind="${kind}"]`).forEach(card=>{const i=Number(card.dataset.question);clear(card);$$('[data-extra] select',card).forEach(el=>el.value='');
   if(kind==='identify'){$$('input,select',card).forEach(el=>el.value='');return;}
   states[kind][i]=kind==='build'?[sets[kind][i].root,'','','']:['','','',''];selected[kind][i]=kind==='build'?1:0;
   $$('[data-slot-controls]',card).forEach((f,s)=>{const n=T.parse(states[kind][i][s]);$('[data-part="letter"]',f).value=n?.letter||'';$('[data-part="acc"]',f).value=n?.acc||'';$('[data-part="octave"]',f).value=String(n?.octave||T.parse(sets[kind][i].root).octave);});selectSlot(card,selected[kind][i]);
  });
 }));
 const dialog=$('#image-dialog');let opener;
 $$('[data-image]').forEach(b=>b.addEventListener('click',()=>{opener=b;$('img',dialog).src=b.dataset.image;$('img',dialog).alt=b.dataset.alt;dialog.showModal();document.body.classList.add('dialog-open');}));
 $('.dialog-close',dialog).addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');opener?.focus();});
 $$('audio').forEach(audio=>{audio.addEventListener('play',()=>$$('audio').forEach(other=>{if(other!==audio)other.pause();}));audio.addEventListener('error',()=>{if(!audio.parentElement.querySelector('.audio-error')){const p=document.createElement('p');p.className='audio-error';p.setAttribute('role','status');p.textContent='Recording could not load. Use the download link to listen.';audio.after(p);}});});
})();
