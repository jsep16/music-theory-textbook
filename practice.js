'use strict';
(() => {
  // Clef outlines are reused from the chapter's engraved notation, not font-dependent symbols.
  const glyphs = {"treble": "M441 -245c-23 -4 -48 -6 -76 -6c-59 0 -102 7 -130 20c-88 42 -150 93 -187 154c-26 44 -43 103 -48 176c0 6 -1 13 -1 19c0 54 15 111 45 170c29 57 65 106 110 148s96 85 153 127c-3 16 -8 46 -13 92c-4 43 -5 73 -5 89c0 117 16 172 69 257c34 54 64 82 89 82 c21 0 43 -30 69 -92s39 -115 41 -159v-15c0 -109 -21 -162 -67 -241c-13 -20 -63 -90 -98 -118c-13 -9 -25 -19 -37 -29l31 -181c8 1 18 2 28 2c58 0 102 -12 133 -35c59 -43 92 -104 98 -184c1 -7 1 -15 1 -22c0 -123 -87 -209 -181 -248c8 -57 17 -110 25 -162 c5 -31 6 -58 6 -80c0 -30 -5 -53 -14 -70c-35 -64 -88 -99 -158 -103c-5 0 -11 -1 -16 -1c-37 0 -72 10 -108 27c-50 24 -77 59 -80 105v11c0 29 7 55 20 76c18 28 45 42 79 44h6c49 0 93 -42 97 -87v-9c0 -51 -34 -86 -105 -106c17 -24 51 -36 102 -36c62 0 116 43 140 85 c9 16 13 41 13 74c0 20 -1 42 -5 67c-8 53 -18 106 -26 159zM461 939c-95 0 -135 -175 -135 -286c0 -24 2 -48 5 -71c50 39 92 82 127 128c40 53 60 100 60 140v8c-4 53 -22 81 -55 81h-2zM406 119l54 -326c73 25 110 78 110 161c0 7 0 15 -1 23c-7 95 -57 142 -151 142h-12 zM382 117c-72 -2 -128 -47 -128 -120v-7c2 -46 43 -99 75 -115c-3 -2 -7 -5 -10 -10c-70 33 -116 88 -123 172v11c0 68 44 126 88 159c23 17 49 29 78 36l-29 170c-21 -13 -52 -37 -92 -73c-50 -44 -86 -84 -109 -119c-45 -69 -67 -130 -67 -182v-13c5 -68 35 -127 93 -176 s125 -73 203 -73c25 0 50 3 75 9c-19 111 -36 221 -54 331z", "bass": "M582 -120c0 32 26 58 58 58s58 -26 58 -58s-26 -58 -58 -58s-58 26 -58 58zM582 120c0 32 26 58 58 58s58 -26 58 -58s-26 -58 -58 -58s-58 26 -58 58zM158 96c51 0 73 -14 88 -49l16 -39c0 -17 -2 -30 -7 -40c-3 -11 -10 -21 -19 -31c-17 -18 -49 -43 -84 -43 c-55 0 -77 13 -112 44c-24 21 -35 55 -35 100c0 46 14 81 32 112c30 52 71 79 137 93l36 6l26 2c154 0 235 -68 274 -182c11 -32 18 -68 18 -107c0 -103 -26 -182 -68 -250c-89 -145 -234 -230 -412 -288l-30 -5c-9 0 -14 3 -14 8c3 10 5 11 10 16c35 15 70 30 96 44l78 43 c96 57 162 136 197 258c9 33 17 60 22 100c3 22 5 35 6 39c-7 69 -16 115 -23 140s-4 22 -16 40c-8 12 -19 23 -31 34c-24 21 -62 44 -118 44c-48 0 -84 -8 -113 -28c-28 -19 -42 -44 -42 -73v-16c2 -5 3 -9 4 -11c24 22 52 39 84 39z", "c": "M175 502h43v-456c10 5 18 12 37 29c16 19 22 27 27 38s8 24 14 49c3 22 5 43 5 62c7 -34 31 -54 73 -60c73 18 99 61 100 165c0 46 -10 78 -31 100c-18 23 -41 35 -69 35c-40 0 -65 -32 -66 -84c6 12 11 16 39 24c5 0 2 1 16 -4l17 -10l10 -14l7 -18 c-4 -32 -23 -48 -56 -48c-51 0 -77 33 -77 98c10 35 16 47 30 61c9 9 15 14 23 17c3 3 22 9 27 11l34 3l35 2c123 0 192 -64 192 -178l1 -33c0 -52 -20 -97 -60 -134c-18 -15 -42 -28 -74 -39c-30 -9 -63 -13 -101 -13l-93 -88v-34l93 -88c38 0 71 -4 101 -13 c32 -11 56 -24 74 -39c40 -37 60 -82 60 -134l-3 -33c0 -115 -68 -178 -190 -178l-35 2l-34 3c-5 2 -24 8 -27 11c-26 11 -40 32 -53 78c0 65 26 98 77 98c33 0 52 -16 56 -48l-7 -18l-10 -14l-17 -10c-14 -5 -11 -4 -16 -4c-28 8 -33 12 -39 24c1 -52 26 -84 66 -84 c28 0 51 12 69 35c21 22 31 54 31 100c-1 104 -27 147 -100 165c-42 -6 -66 -26 -73 -60c0 19 -2 40 -5 62c-6 25 -9 38 -14 49s-11 19 -27 38c-19 17 -27 24 -37 29v-456h-43v1004zM0 502h118v-1004h-118v1004z"};
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const clean = value => value.trim().toLowerCase().replace(/\s+/g,'');
  function mark(input, correct) { input.setAttribute('aria-invalid', String(!correct)); input.classList.toggle('answer-correct',correct); }
  function unmark(input) {input.removeAttribute('aria-invalid');input.classList.remove('answer-correct');}
  function resetInputs(root, feedback) {$$('input',root).forEach(i=>{i.value='';unmark(i);});feedback.textContent='';}
  $$('input[type="text"]').forEach(i=>i.addEventListener('input',()=>unmark(i)));
  function pitchMatch(value, pitch) {return new RegExp(`^${pitch[0]}(?:${pitch.slice(1)})?$`,'i').test(value.trim());}
  const beatBox=$('#four-beats');
  $('[data-check-beats]').addEventListener('click',()=>{let count=0;$$('select',beatBox).forEach((select,i)=>{const ok=select.value===['yes','no','no','yes'][i];mark(select,ok);count+=ok;});$('#beat-feedback').textContent=count===4?'All four measures are correct!':`${count} of 4 correct. Add the quarter-note beat values in each measure, then compare the total with four.`;});
  $('[data-reset-beats]').addEventListener('click',()=>{$$('select',beatBox).forEach(s=>{s.value='';unmark(s);});$('#beat-feedback').textContent='';});
  $$('select',beatBox).forEach(s=>s.addEventListener('change',()=>unmark(s)));
  const timeBox=$('#time-practice');
  $('[data-check-time]').addEventListener('click',()=>{
    const answers=[['3','three'],['quarter','quarternote','1/4'],['6','six'],['eighth','eighthnote','8th','1/8'],['2','two'],['half','halfnote','1/2'],['9','nine'],['eighth','eighthnote','8th','1/8']];
    let count=0;$$('input',timeBox).forEach((input,i)=>{const ok=answers[i].includes(clean(input.value));mark(input,ok);count+=ok;});
    $('#time-feedback').textContent=count===8?'All eight blanks are correct. Well done!':`${count} of 8 blanks correct. Review the marked blanks: the top number gives the number of notes; the bottom number gives their value.`;
  });
  $$('input',timeBox).forEach(i=>i.addEventListener('input',()=>{$('#time-feedback').textContent='';}));
  $('[data-reset-time]').addEventListener('click',()=>resetInputs(timeBox,$('#time-feedback')));
  const scoreBox=$('#score-questions');
  $('[data-check-score]').addEventListener('click',()=>{let count=0;$$('input',scoreBox).forEach((input,i)=>{const ok=pitchMatch(input.value,['A4','F4','G3','G4'][i]);mark(input,ok);count+=ok;});$('#score-feedback').textContent=count===4?'All four answers are correct!':`${count} of 4 correct. Review the marked answers, counting measures and beats from the beginning.`;});
  $$('input',scoreBox).forEach(i=>i.addEventListener('input',()=>{$('#score-feedback').textContent='';}));
  $('[data-reset-score]').addEventListener('click',()=>resetInputs(scoreBox,$('#score-feedback')));
  function clef(name,x=18,staffTop=80) {
    // Engraving units have 250 units between staff lines; scale to 12 screen units.
    const kind=['alto','tenor'].includes(name)?'c':name;
    const anchor=name==='treble'?staffTop+36:name==='bass'?staffTop+12:name==='tenor'?staffTop+12:staffTop+24;
    return `<path d="${glyphs[kind]}" transform="translate(${x} ${anchor}) scale(.048 -.048)" fill="currentColor"/>`;
  }
  function staff(x1,x2,top=80){return Array.from({length:5},(_,i)=>`<path d="M${x1} ${top+i*12}H${x2}"/>`).join('');}
  function note(x,y,value,options={}) {
    const hollow=value>=2, whole=value===4;
    let s=`<ellipse cx="${x}" cy="${y}" rx="${whole?8:7}" ry="4.7" transform="rotate(-16 ${x} ${y})" fill="${hollow?'white':'currentColor'}" stroke="currentColor" stroke-width="1.8"/>`;
    if(!whole)s+=`<path d="M${x+6} ${y}V${y-40}" stroke="currentColor" stroke-width="1.7"/>`;
    if(value<1&&!options.beamed)for(let i=0;i<(value===.25?2:1);i++)s+=`<path d="M${x+6} ${y-40+i*9}c1 10 22 10 8 27c9-17-7-15-8-20" fill="currentColor"/>`;
    if(value===1.5||value===3)s+=`<circle cx="${x+15}" cy="${y-4}" r="2.4" fill="currentColor"/>`;
    return s;
  }
  const svg = (body,w,h,label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const rhythmData=[
    {time:[4,4],notes:[2,1],answer:1},{time:[3,4],notes:[.5,.5],answer:2},
    {time:[2,4],notes:[1.5],answer:.5},{time:[6,8],notes:[.5,.5,.5,.5,.5],answer:.5},
    {time:[4,4],notes:[1,1],answer:2},{time:[3,4],notes:[1,1],answer:1},
    {time:[6,8],notes:[.5,.5,.5],answer:1.5},{time:[2,4],notes:[.5,.5,.5],answer:.5},
    {time:[4,4],notes:[3],answer:1},{time:[6,8],notes:[1.5],answer:1.5}
  ];
  const rhythmChoices=[['','Choose a note'],['4','Whole note'],['3','Dotted half note'],['2','Half note'],['1.5','Dotted quarter note'],['1','Quarter note'],['0.5','Eighth note'],['0.25','Sixteenth note']];
  function rhythmSVG(data,value,index) {
    let body=`<g color="#143d3a"><g stroke="currentColor" stroke-width="1">${staff(12,438,65)}<path d="M438 65V113"/></g>${clef('treble',21,65)}<g fill="currentColor" font-family="Georgia,serif" font-weight="bold" font-size="29" text-anchor="middle"><text x="70" y="87">${data.time[0]}</text><text x="70" y="112">${data.time[1]}</text></g>`;
    const xs=data.notes.map((_,i)=>105+i*(240/(Math.max(2,data.notes.length))));
    data.notes.forEach((n,i)=>{body+=note(xs[i],101,n,{beamed:n===.5&&data.notes.length>1});});
    // The original paired/grouped eighth notes share beams; keep the same grouping.
    const groups=index===3?[[0,1,2],[3,4]]:index===6?[[0,1,2]]:data.notes.filter(n=>n===.5).length>1?[[0,1]]:[];
    groups.forEach(g=>{body+=`<path d="M${xs[g[0]]+6} 61H${xs[g[g.length-1]]+6}" stroke="currentColor" stroke-width="4"/>`;});
    if(index===7)body+=`<path d="M${xs[2]+6} 61c1 10 22 10 8 27c9-17-7-15-8-20" fill="currentColor"/>`;
    body+='<rect x="358" y="55" width="65" height="67" rx="5" fill="white" stroke="#819b91" stroke-dasharray="4 3"/>';
    body+=value?`<g color="#216b60">${note(383,101,Number(value))}</g>`:'<text x="390" y="100" text-anchor="middle" font-family="system-ui" fill="#62726c" font-size="24">?</text>';
    return svg(body+'</g>',450,155,`Measure ${index+1}, ${data.time.join('/')} time; ${value?rhythmChoices.find(c=>c[0]===value)[1]+' inserted':'blank note to complete'}`);
  }
  const rhythmBox=$('#rhythm-practice');rhythmBox.hidden=false;
  $('.exercise-mount',rhythmBox).innerHTML=`<div class="rhythm-cards">${rhythmData.map((d,i)=>`<div class="rhythm-card"><h4>Measure ${i+1}</h4><div class="rhythm-staff">${rhythmSVG(d,'',i)}</div><label>Missing note<select aria-label="Missing note in measure ${i+1}">${rhythmChoices.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select></label><p class="item-feedback"></p></div>`).join('')}</div><div class="practice-actions"><button type="button" data-check-rhythm>Check all measures</button><button type="button" data-reset-rhythm>Reset measures</button><p id="rhythm-feedback" class="practice-feedback" role="status"></p></div>`;
  const rhythmCards=$$('.rhythm-card',rhythmBox);
  rhythmCards.forEach((card,i)=>$('select',card).addEventListener('change',e=>{unmark(e.target);$('.item-feedback',card).textContent='';$('#rhythm-feedback').textContent='';$('.rhythm-staff',card).innerHTML=rhythmSVG(rhythmData[i],e.target.value,i);}));
  $('[data-check-rhythm]').addEventListener('click',()=>{let count=0;rhythmCards.forEach((card,i)=>{const sel=$('select',card),ok=Number(sel.value)===rhythmData[i].answer;mark(sel,ok);count+=ok;$('.item-feedback',card).textContent=ok?'Correct.':sel.value?'Try again. Count the duration already in the measure.':'Choose a note first.';});$('#rhythm-feedback').textContent=`${count} of 10 measures correct.${count===10?' You completed every measure!':''}`;});
  $('[data-reset-rhythm]').addEventListener('click',()=>{rhythmCards.forEach((card,i)=>{const sel=$('select',card);sel.value='';unmark(sel);$('.item-feedback',card).textContent='';$('#rhythm-feedback').textContent='';$('.rhythm-staff',card).innerHTML=rhythmSVG(rhythmData[i],'',i);});$('#rhythm-feedback').textContent='';});
  // These are the exact 64 written pitches from the approved worksheet and answer key.
  const pitchRows=[
    ['C2','G3','C3','G4','F2','A2','G1','B3'],['D5','B5','A4','G3','E5','D6','A4','B3'],
    ['C4','G3','G4','D4','C3','B4','A3','F4'],['C3','F3','D4','B4','E4','B3','B2','F3'],
    ['A3','E4','A3','D3','C4','G4','B3','D4'],['E3','G3','B3','G3','B2','G4','B3','F3'],
    ['C4','F4','D5','G4','G5','F4','C4','A4'],['C2','E3','C4','C3','B2','D2','D3','F3']
  ];
  const clefs=['bass','treble','alto','tenor','alto','tenor','treble','bass'];
  const letterIndex=p=>Number(p.slice(1))*7+'CDEFGAB'.indexOf(p[0]);
  function pitchSVG(pitch,clefName,index){
    const bottom={treble:'E4',bass:'G2',alto:'F3',tenor:'D3'}[clefName];const step=letterIndex(pitch)-letterIndex(bottom),y=128-step*6;
    let body=`<g color="#143d3a"><g stroke="currentColor" stroke-width="1">${staff(9,171)}<path d="M171 80V128"/>`;
    if(step<0)for(let s=-2;s>=step;s-=2)body+=`<path d="M95 ${128-s*6}H121"/>`;
    if(step>8)for(let s=10;s<=step;s+=2)body+=`<path d="M95 ${128-s*6}H121"/>`;
    body+=`</g>${clef(clefName)}${note(108,y,4)}</g>`;
    return svg(body,180,205,`${clefName} clef, note ${index+1}. Identify the note shown on the staff.`);
  }
  const noteBox=$('#note-practice');noteBox.hidden=false;
  $('.exercise-mount',noteBox).innerHTML=`<div class="note-row-nav"><button type="button" data-prev-row aria-label="Previous worksheet row">←</button><label for="note-row">Worksheet row <select id="note-row">${clefs.map((c,i)=>`<option value="${i}">${i+1} · ${c[0].toUpperCase()+c.slice(1)} clef</option>`).join('')}</select></label><button type="button" data-next-row aria-label="Next worksheet row">→</button></div><p class="practice-help">Select an answer box, then type or tap a letter.</p><div class="letter-pad" aria-label="Note letters">${'ABCDEFG'.split('').map(l=>`<button type="button" data-letter="${l}">${l}</button>`).join('')}</div><div class="note-cards"></div><div class="practice-actions"><button type="button" data-check-notes>Check this row</button><button type="button" data-reset-notes>Reset this row</button><p id="note-feedback" class="practice-feedback" role="status"></p></div><p id="note-progress" class="practice-help"></p>`;
  let row=0, activeNote=0;
  const responses=pitchRows.map(()=>Array(8).fill('')), results=pitchRows.map(()=>Array(8).fill(null));
  function progress(){const correct=results.flat().filter(x=>x===true).length;$('#note-progress').textContent=`${correct} of 64 notes checked correct across all eight rows.`;}
  function renderRow(){
    $('#note-row').value=String(row);$('[data-prev-row]').disabled=row===0;$('[data-next-row]').disabled=row===7;
    $('.note-cards',noteBox).innerHTML=pitchRows[row].map((p,i)=>`<label class="note-card"><span>Note ${i+1}</span>${pitchSVG(p,clefs[row],i)}<input type="text" maxlength="3" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Row ${row+1}, note ${i+1} in ${clefs[row]} clef" placeholder="A–G"></label>`).join('');
    $$('input',noteBox).forEach((input,i)=>{input.value=responses[row][i];if(results[row][i]!==null)mark(input,results[row][i]);input.addEventListener('focus',()=>{activeNote=i;$$('.note-card',noteBox).forEach((c,j)=>c.classList.toggle('is-active',i===j));});input.addEventListener('input',()=>{responses[row][i]=input.value;results[row][i]=null;unmark(input);$('#note-feedback').textContent='';progress();});input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();if(i<7)$$('input',noteBox)[i+1].focus();else $('[data-check-notes]').click();}});});
    $('#note-feedback').textContent='';activeNote=0;progress();
  }
  function changeRow(next){row=next;renderRow();}
  $('#note-row').addEventListener('change',e=>changeRow(Number(e.target.value)));
  $('[data-prev-row]').addEventListener('click',()=>changeRow(Math.max(0,row-1)));
  $('[data-next-row]').addEventListener('click',()=>changeRow(Math.min(7,row+1)));
  $$('[data-letter]').forEach(button=>button.addEventListener('click',()=>{const input=$$('input',noteBox)[activeNote];input.value=button.dataset.letter;input.dispatchEvent(new Event('input',{bubbles:true}));input.focus();}));
  $('[data-check-notes]').addEventListener('click',()=>{let count=0;$$('input',noteBox).forEach((input,i)=>{const ok=pitchMatch(input.value,pitchRows[row][i]);results[row][i]=ok;mark(input,ok);count+=ok;});$('#note-feedback').textContent=count===8?'All eight notes in this row are correct! Move to another row to continue.':`${count} of 8 correct. Review the marked notes. Count lines and spaces from a note you know.`;progress();});
  $('[data-reset-notes]').addEventListener('click',()=>{responses[row].fill('');results[row].fill(null);renderRow();});
  renderRow();
  // All drawing points are normalized, so resizing preserves completed strokes.
  $$('.trace-practice').forEach(box=>{
    const originalGuide=$('img',box), kind=box.dataset.trace;
    const staves=kind==='20'?[['treble',70],['bass',275]]:[[kind==='15'?'treble':kind==='17'?'bass':'alto',70]];
    let guide='<rect width="800" height="'+(kind==='20'?440:270)+'" fill="white"/>';
    staves.forEach(([name,top])=>{
      guide+='<g stroke="#60746b" stroke-width="1">'+Array.from({length:5},(_,i)=>`<path d="M20 ${top+i*25}H780"/>`).join('')+'</g>';
      for(let i=0;i<7;i++){
        const anchor=name==='treble'?top+75:name==='bass'?top+25:top+50;
        guide+=`<path d="${glyphs[name==='alto'?'c':name]}" transform="translate(${35+i*105} ${anchor}) scale(.1 -.1)" fill="none" stroke="#a5afa7" stroke-width="16" stroke-dasharray="1 34" stroke-linecap="round"/>`;
      }
    });
    originalGuide.outerHTML=svg(guide,800,kind==='20'?440:270,originalGuide.alt);
    const canvas=$('canvas',box),ctx=canvas.getContext('2d');
    let strokes=[],current=null,pointer=null;
    function redraw(){const r=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;if(!r.width||!r.height)return;canvas.width=Math.round(r.width*dpr);canvas.height=Math.round(r.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.strokeStyle='#216b60';ctx.fillStyle='#216b60';ctx.lineWidth=3;ctx.lineCap='round';ctx.lineJoin='round';for(const stroke of strokes){ctx.beginPath();stroke.forEach((p,i)=>{const x=p.x*r.width,y=p.y*r.height;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);});ctx.stroke();if(stroke.length===1){ctx.beginPath();ctx.arc(stroke[0].x*r.width,stroke[0].y*r.height,1.5,0,Math.PI*2);ctx.fill();}}$('[data-undo]',box).disabled=strokes.length===0;$('[data-clear]',box).disabled=strokes.length===0;}
    function point(e){const r=canvas.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)),y:Math.max(0,Math.min(1,(e.clientY-r.top)/r.height))};}
    canvas.addEventListener('pointerdown',e=>{if(pointer!==null||e.button!==0)return;e.preventDefault();pointer=e.pointerId;current=[point(e)];strokes.push(current);canvas.setPointerCapture(pointer);redraw();$('.trace-status',box).textContent='Drawing';});
    canvas.addEventListener('pointermove',e=>{if(e.pointerId!==pointer||!current)return;current.push(point(e));redraw();});
    function finish(e){if(e.pointerId!==pointer)return;const id=pointer;pointer=null;current=null;if(canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);$('.trace-status',box).textContent=`${strokes.length} stroke${strokes.length===1?'':'s'} drawn.`;}
    canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);canvas.addEventListener('lostpointercapture',finish);
    $('[data-undo]',box).addEventListener('click',()=>{strokes.pop();redraw();$('.trace-status',box).textContent='Last stroke removed.';});
    $('[data-clear]',box).addEventListener('click',()=>{strokes=[];current=null;pointer=null;redraw();$('.trace-status',box).textContent='Drawing cleared.';});
    if('ResizeObserver' in window)new ResizeObserver(redraw).observe(canvas);else window.addEventListener('resize',redraw);
    redraw();
  });
  $$('.worksheet-reference').forEach(d=>d.open=false);
  $$('.trace-print-original').forEach(f=>f.classList.add('tracing-enabled'));
})();
