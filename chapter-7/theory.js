'use strict';
(()=>{
 const D=globalThis.SEVENTH_DATA,L='CDEFGAB',S=[0,2,4,5,7,9,11];
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const display=s=>String(s).replace(/b/g,'♭').replace(/#/g,'♯');
 function parse(p){const m=/^([A-G])(bb|##|b|#)?([1-6])$/.exec(p||'');if(!m)return null;const a=m[2]||'',o=Number(m[3]),i=L.indexOf(m[1]);return {letter:m[1],acc:a,octave:o,name:m[1]+a,step:o*7+i,midi:(o+1)*12+S[i]+[...a].reduce((s,c)=>s+(c==='#'?1:-1),0)};}
 function rootName(s){s=String(s).trim().replace(/𝄫/g,'bb').replace(/♭/g,'b').replace(/♯/g,'#').replace(/double[ -]*flat/gi,'bb').replace(/double[ -]*sharp/gi,'##').replace(/flat/gi,'b').replace(/sharp/gi,'#').replace(/[\s-]/g,'');const m=/^([a-g])(bb|##|b|#)?$/i.exec(s);return m?m[1].toUpperCase()+(m[2]||'').toLowerCase():null;}
 const base=clef=>clef==='bass'?18:30;
 function fromStep(step,acc=''){const o=Math.floor(step/7),l=L[(step%7+7)%7];return l+acc+o;}
 function checkNotes(notes,q){const ps=notes.map(parse);if(ps.length!==4||ps.some(p=>!p))return false;const expected=q.notes.map(p=>parse(p).name),names=ps.map(p=>p.name);return expected.every(n=>names.includes(n))&&new Set(names).size===4&&ps.every((p,i)=>!i||ps[i-1].midi<p.midi)&&names[0]===expected[0];}
 function headOffsets(notes){const offsets=[];notes.forEach((p,i)=>{const n=parse(p),prev=i?parse(notes[i-1]):null;offsets.push(n&&prev&&n.step-prev.step===1&&!offsets[i-1]?12:0);});return offsets;}
 function geometry(notes,clef){const ys=notes.map(parse).filter(Boolean).map(n=>150-(n.step-base(clef))*6);const top=Math.min(0,...ys.map(y=>y-28)),bottom=Math.max(220,...ys.map(y=>y+42));return {top,height:bottom-top,footer:bottom-13};}
 function svg(notes,label,interactive=false,selected=0,clef='treble'){
  const g=geometry(notes,clef),offsets=headOffsets(notes);let out='';for(let i=0;i<5;i++)out+=`<path d="M14 ${150-i*12}H286" stroke="#65766c" stroke-width=".8"/>`;
  out+=`<path d="${D.glyphs[clef]}" transform="translate(25 ${clef==='bass'?114:138}) scale(.048 -.048)" fill="#143d3a"/>`;
  notes.forEach((p,i)=>{const n=parse(p);if(!n)return;const step=n.step-base(clef),y=150-step*6,x=179+offsets[i];let s='';
   if(step<0)for(let v=-2;v>=step;v-=2)s+=`<path d="M${x-12} ${150-v*6}h24" stroke="#143d3a"/>`;
   if(step>8)for(let v=10;v<=step;v+=2)s+=`<path d="M${x-12} ${150-v*6}h24" stroke="#143d3a"/>`;
   s+=`<ellipse cx="${x}" cy="${y}" rx="7" ry="4.5" transform="rotate(-14 ${x} ${y})" fill="none" stroke="${interactive&&i===selected?'#b16c20':'#143d3a'}" stroke-width="2"/>`;
   if(n.acc==='##'){const a=154-(i%2?15:0);s+=`<path d="M${a-5} ${y-5}l10 10m-10 0l10-10" fill="none" stroke="#143d3a" stroke-width="2.4"/>`;}
   else if(n.acc)s+=`<text x="${162-(i%2?15:0)}" y="${y+6}" text-anchor="end" fill="#143d3a" font-family="DejaVu Sans,Arial,sans-serif" font-size="21">${display(n.acc)}</text>`;
   out+=s;
  });
  if(interactive)out+=`<text x="150" y="${g.footer}" text-anchor="middle" fill="#62726c" font-family="Arial,sans-serif" font-size="10">Choose a slot, then tap a staff position</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${g.top} 300 ${g.height}" ${interactive?'role="application" tabindex="0"':'role="img"'} aria-label="${esc(label+'; '+clef+' clef')}"${interactive?' aria-describedby="staff-help"':''}>${out}</svg>`;
 }
 globalThis.SeventhTheory={esc,display,parse,rootName,base,fromStep,checkNotes,headOffsets,geometry,svg};
})();
