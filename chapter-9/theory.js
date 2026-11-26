'use strict';
(()=>{
 const D=globalThis.ROMAN_DATA,L='CDEFGAB',S=[0,2,4,5,7,9,11];
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const display=s=>String(s).replace(/b/g,'♭').replace(/#/g,'♯');
 function parse(p){const m=/^([A-G])(b|#)?([1-6])$/.exec(p||'');if(!m)return null;const a=m[2]||'',o=+m[3],i=L.indexOf(m[1]);return {letter:m[1],acc:a,octave:o,name:m[1]+a,step:o*7+i,midi:(o+1)*12+S[i]+(a==='#'?1:a==='b'?-1:0)};}
 const base=clef=>clef==='bass'?18:30;
 const keyAcc=(letter,sig)=>(sig.find(n=>n[0]===letter)||'').slice(1);
 const resolve=(letter,acc,octave,sig)=>letter+(acc==='key'?keyAcc(letter,sig):acc)+octave;
 function fromStep(step,acc,sig){const o=Math.floor(step/7),l=L[(step%7+7)%7];return resolve(l,acc,o,sig);}
 function roman(s){return String(s).normalize('NFKC').trim().replace(/\s/g,'').replace(/(?:diminished|dim\.?|o|º)$/i,'°');}
 const checkRoman=(s,answer)=>roman(s)===answer;
 function checkNotes(notes,q){const ps=notes.map(parse);if(ps.length!==3||ps.some(p=>!p))return false;const expected=q.notes.map(p=>parse(p).name),names=ps.map(p=>p.name);return expected.every(n=>names.includes(n))&&new Set(names).size===3&&ps.every((p,i)=>!i||ps[i-1].midi<p.midi)&&names[0]===expected[0];}
 function geometry(notes,clef){const ys=notes.map(parse).filter(Boolean).map(n=>150-(n.step-base(clef))*6);const top=Math.min(30,...ys.map(y=>y-24)),bottom=Math.max(205,...ys.map(y=>y+37));return {top,height:bottom-top,footer:bottom-12};}
 function svg(notes,label,selected,clef,sig){
  const g=geometry(notes,clef);let out='';for(let i=0;i<5;i++)out+=`<path d="M14 ${150-i*12}H286" stroke="#65766c" stroke-width=".8"/>`;
  out+=`<path d="${D.glyphs[clef]}" transform="translate(25 ${clef==='bass'?114:138}) scale(.048 -.048)" fill="#143d3a"/>`;
  const flat=sig[0].endsWith('b'),heights=flat?(clef==='bass'?[2,5,1,4,0,3,-1]:[4,7,3,6,2,5,1]):(clef==='bass'?[6,3,7,4,1,5,2]:[8,5,9,6,3,7,4]);
  sig.forEach((n,i)=>out+=`<text x="${64+i*13}" y="${150-heights[i]*6+7}" fill="#143d3a" font-family="DejaVu Sans,Arial,sans-serif" font-size="24">${flat?'♭':'♯'}</text>`);
  notes.forEach((p,i)=>{const n=parse(p);if(!n)return;const step=n.step-base(clef),y=150-step*6,x=201;let s='';
   if(step<0)for(let v=-2;v>=step;v-=2)s+=`<path d="M${x-12} ${150-v*6}h24" stroke="#143d3a"/>`;
   if(step>8)for(let v=10;v<=step;v+=2)s+=`<path d="M${x-12} ${150-v*6}h24" stroke="#143d3a"/>`;
   s+=`<ellipse cx="${x}" cy="${y}" rx="7" ry="4.5" transform="rotate(-14 ${x} ${y})" fill="none" stroke="${i===selected?'#b16c20':'#143d3a'}" stroke-width="2"/>`;
   if(n.acc!==keyAcc(n.letter,sig))s+=`<text x="${184-(i%2?14:0)}" y="${y+7}" text-anchor="end" fill="#143d3a" font-family="DejaVu Sans,Arial,sans-serif" font-size="24">${n.acc?display(n.acc):'♮'}</text>`;
   out+=s;
  });
  out+=`<text x="150" y="${g.footer}" text-anchor="middle" fill="#62726c" font-family="Arial,sans-serif" font-size="10">Choose a slot, then tap a staff position</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 ${g.top} 300 ${g.height}" role="application" tabindex="0" aria-label="${esc(label+'; '+clef+' clef')}" aria-describedby="staff-help">${out}</svg>`;
 }
 globalThis.RomanTheory={esc,display,parse,base,keyAcc,resolve,fromStep,roman,checkRoman,checkNotes,geometry,svg};
})();
