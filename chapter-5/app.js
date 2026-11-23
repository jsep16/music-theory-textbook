'use strict';
(()=>{
 const $=(q,r=document)=>r.querySelector(q),$$=(q,r=document)=>[...r.querySelectorAll(q)],D=KEY_DATA,T=KeyTheory;
 const countOptions='<option value="">Choose</option>'+Array.from({length:8},(_,i)=>`<option value="${i}">${i}</option>`).join('');
 function actions(kind){return `<div class="practice-actions"><button type="button" data-check="${kind}">Check answers</button><button type="button" data-reset="${kind}">Reset answers</button><p id="${kind}-feedback" role="status"></p></div>`;}
 for(const kind of ['identify','count','minor']){
  const qs=D[kind];$('#'+kind+'-mount').innerHTML='<div class="key-question-grid">'+qs.map((q,i)=>{
   const prompt=kind==='identify'?q.prompt:T.display(q)+' major';
   const control=kind==='count'?`<div class="signature-controls"><label>Count<select data-count aria-label="Question ${i+1} accidental count">${countOptions}</select></label><label>Accidentals<select data-type aria-label="Question ${i+1} accidental type"><option value="">Choose</option><option value="none">None</option><option value="sharp">Sharps ♯</option><option value="flat">Flats ♭</option></select></label></div>`:`<label>${kind==='minor'?'Relative minor':'Major key'}<input maxlength="24" autocomplete="off" spellcheck="false" aria-label="Question ${i+1} ${kind==='minor'?'relative minor':'major key'}"></label>`;
   return `<div class="key-question" data-kind="${kind}" data-question="${i}"><h3>${i+1}. ${T.esc(prompt)}</h3>${kind==='identify'?T.signatureSvg(q.count,q.type,'Key signature for question '+(i+1)):''}${control}<p class="question-feedback" role="status"></p></div>`;
  }).join('')+'</div>'+actions(kind);
 }
 function clearCard(card){card.classList.remove('correct','incorrect');$('.question-feedback',card).textContent='';$$('input,select',card).forEach(x=>x.removeAttribute('aria-invalid'));$('#'+card.dataset.kind+'-feedback').textContent='';}
 $$('.key-question').forEach(card=>$$('input,select',card).forEach(el=>el.addEventListener('input',()=>clearCard(card))));
 $$('[data-check]').forEach(button=>button.addEventListener('click',()=>{
  const kind=button.dataset.check;let correct=0;
  $$(`[data-kind="${kind}"]`).forEach((card,i)=>{
   const q=D[kind][i],sig=kind==='count'?D.keys[q]:null;
   const ok=kind==='count'?$('[data-count]',card).value!==''&&Number($('[data-count]',card).value)===sig.count&&$('[data-type]',card).value===sig.type:T.keyName($('input',card).value,kind==='minor'?'minor':'major')===(kind==='minor'?D.keys[q].minor:q.answer);
   correct+=ok;card.classList.toggle('correct',ok);card.classList.toggle('incorrect',!ok);$$('input,select',card).forEach(el=>el.setAttribute('aria-invalid',String(!ok)));$('.question-feedback',card).textContent=ok?'Correct.':'Try again. Check the key spelling and the signature pattern.';
  });$('#'+kind+'-feedback').textContent=`${correct} of 8 correct.${correct===8?' You completed this set!':''}`;
 }));
 $$('[data-reset]').forEach(button=>button.addEventListener('click',()=>{const kind=button.dataset.reset;$$(`[data-kind="${kind}"]`).forEach(card=>{$$('input,select',card).forEach(el=>el.value='');clearCard(card);});}));

 let active=0,results=null;const empty=()=>T.slots.map((s,i)=>i?{major:'',minor:'',count:'',type:''}:{major:'C major',minor:'A minor',count:'0',type:'none'});let states=empty();
 $('#circle-position').innerHTML=T.slots.map((s,i)=>`<option value="${i}">Position ${i+1}${i===0?' · supplied starting point':''}${s.allowed.length===2?' · paired row '+(s.row+1):''}</option>`).join('');$('#circle-count').innerHTML=countOptions;
 function draw(){ $('#circle-mount').innerHTML=T.circleSvg(states,active,results); }
 function selectPosition(i){
  active=i;$('#circle-position').value=String(i);const state=states[i];
  for(const k of ['major','minor','count','type']){const el=$('#circle-'+k);el.value=state[k];el.disabled=i===0;el.removeAttribute('aria-invalid');}
  $('#circle-position-feedback').textContent=i===0?'This starting point is supplied.':results?(results[i]?'This position is correct.':'Check this position’s key names and signature.'):'Enter this position’s names and signature.';draw();
 }
 $('#circle-position').addEventListener('change',e=>selectPosition(Number(e.target.value)));
 $('#circle-mount').addEventListener('click',e=>{const slot=e.target.closest('[data-slot]');if(slot){selectPosition(Number(slot.dataset.slot));$('#circle-position').focus();}});
 $('#circle-mount').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const slot=e.target.closest('[data-slot]');if(slot){e.preventDefault();selectPosition(Number(slot.dataset.slot));$('#circle-position').focus();}}});
 for(const k of ['major','minor','count','type'])$('#circle-'+k).addEventListener('input',e=>{
  states[active][k]=e.target.value;results=null;$('#circle-feedback').textContent='';$('#circle-position-feedback').textContent='';
  for(const key of ['major','minor','count','type'])$('#circle-'+key).removeAttribute('aria-invalid');draw();
 });
 $('#circle-check').addEventListener('click',()=>{
  results=T.checkCircle(states);const correct=results.slice(1).filter(Boolean).length;$('#circle-feedback').textContent=`${correct} of 14 remaining positions correct.${correct===14?' You completed the circle!':' Check the highlighted positions, including both spellings in each paired position.'}`;selectPosition(active);
  if(active)for(const k of ['major','minor','count','type'])$('#circle-'+k).setAttribute('aria-invalid',String(!results[active]));
 });
 $('#circle-reset').addEventListener('click',()=>{states=empty();results=null;$('#circle-feedback').textContent='';selectPosition(0);});selectPosition(0);

 const dialog=$('#image-dialog');let opener;
 $$('[data-image]').forEach(button=>button.addEventListener('click',()=>{opener=button;$('img',dialog).src=button.dataset.image;$('img',dialog).alt=button.dataset.alt;dialog.showModal();document.body.classList.add('dialog-open');}));
 $('.dialog-close',dialog).addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');opener?.focus();});
 $$('audio').forEach(audio=>{audio.addEventListener('play',()=>{$$('audio').forEach(other=>{if(other!==audio)other.pause();});});audio.addEventListener('error',()=>{if(!audio.parentElement.querySelector('.audio-error')){const note=document.createElement('p');note.className='audio-error';note.setAttribute('role','status');note.textContent='Recording could not load. Use the download link to listen.';audio.after(note);}});});
})();
