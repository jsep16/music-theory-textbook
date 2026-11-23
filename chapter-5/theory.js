'use strict';
(()=>{
 const D=globalThis.KEY_DATA;
 const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const display=v=>v.replace(/b/g,'♭').replace(/#/g,'♯');
 function keyName(value,mode='major'){
  const s=String(value).trim().replace(/♭/g,'b').replace(/♯/g,'#').replace(/flat/gi,'b').replace(/sharp/gi,'#').replace(/[-\s]/g,'');
  const m=/^([a-g])([b#]?)(major|maj|minor|min|m)?$/i.exec(s);if(!m)return null;
  if(m[3]&&((/^(major|maj)$/i.test(m[3]))!==(mode==='major')))return null;
  return m[1].toUpperCase()+m[2].toLowerCase();
 }
 const slots=D.groups.flatMap((keys,position)=>keys.map((key,row)=>({key,position,row,allowed:keys})));
 function checkCircle(states){
  const names=states.map(s=>keyName(s.major));
  return states.map((s,i)=>{
   const slot=slots[i],name=names[i],key=D.keys[name];
   return !!key&&slot.allowed.includes(name)&&keyName(s.minor,'minor')===key.minor&&Number(s.count)===key.count&&s.count!==''&&s.type===key.type&&!slots.some((other,j)=>i!==j&&other.position===slot.position&&names[j]===name);
  });
 }
 function staffPart(x,bottom,count,type,color='#143d3a'){
  let out='';for(let i=0;i<5;i++)out+=`<path d="M${x} ${bottom-i*4}h72" fill="none" stroke="#66796d" stroke-width=".45"/>`;
  out+=`<path d="${D.glyph}" transform="translate(${x+3} ${bottom-4}) scale(.016 -.016)" fill="#143d3a"/>`;
  const heights=type==='sharp'?[16,10,18,12,6,14,8]:[8,14,6,12,4,10,2];
  if(type==='sharp'||type==='flat')for(let i=0;i<Math.max(0,Math.min(7,Number(count)||0));i++)out+=`<text x="${x+22+i*6}" y="${bottom-heights[i]+3}" fill="${color}" font-family="DejaVu Sans,Arial,sans-serif" font-size="10">${type==='sharp'?'♯':'♭'}</text>`;
  return out;
 }
 function signatureSvg(count,type,label){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 48" role="img" aria-label="${esc(label)}">${staffPart(8,33,count,type)}</svg>`;}
 function circleSvg(states,active=0,results=null){
  const cx=252,cy=242;let out='';for(const r of [54,115,165])out+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#a3b0a8" stroke-width=".7"/>`;
  for(let i=0;i<12;i++){const a=-Math.PI/2+(i+.5)*Math.PI/6;out+=`<path d="M${cx+54*Math.cos(a)} ${cy+54*Math.sin(a)}L${cx+165*Math.cos(a)} ${cy+165*Math.sin(a)}" stroke="#a3b0a8" stroke-width=".7"/>`;}
  out+='<text x="252" y="237" text-anchor="middle" fill="#62726c" font-family="Arial,sans-serif" font-size="9">Circle of fifths</text><text x="252" y="252" text-anchor="middle" fill="#62726c" font-family="Arial,sans-serif" font-size="7">Select a staff to edit</text>';
  slots.forEach((slot,i)=>{
   const a=-Math.PI/2+slot.position*Math.PI/6,pair=slot.allowed.length===2,off=pair?(slot.row===0?-8:8):0,staffOff=pair?(slot.row===0?-17:17):0;
   const mx=cx+145*Math.cos(a),my=cy+145*Math.sin(a)+off,nx=cx+92*Math.cos(a),ny=cy+92*Math.sin(a)+off,sx=cx+207*Math.cos(a)-36,bottom=cy+207*Math.sin(a)+staffOff+6,s=states[i];
   const color=results?(results[i]?'#216b60':'#a43828'):'#143d3a';
   out+=`<g data-slot="${i}" role="button" tabindex="0" aria-label="Edit circle position ${i+1}${i===0?', supplied C major':''}" aria-pressed="${i===active}"><rect x="${sx-4}" y="${bottom-27}" width="80" height="36" rx="3" fill="${i===active?'#e6f1ed':'transparent'}" stroke="${i===active?color:'transparent'}"/>${staffPart(sx,bottom,s.count,s.type,color)}`;
   for(const [x,y,value,mode] of [[mx,my,s.major,'major'],[nx,ny,s.minor,'minor']]){
    const name=keyName(value,mode);out+=name?`<text x="${x}" y="${y+3}" text-anchor="middle" fill="${color}" font-family="Arial,sans-serif" font-size="${mode==='major'?7.5:7}">${esc(display(name)+' '+mode)}</text>`:`<path d="M${x-16} ${y+3}h32" stroke="#94a39a" stroke-width=".6"/>`;
    if(pair)out+=`<text x="${x-20}" y="${y+3}" text-anchor="end" fill="#62726c" font-family="Arial,sans-serif" font-size="6">${slot.row+1}</text>`;
   }
   if(pair)out+=`<text x="${sx-3}" y="${bottom-7}" text-anchor="end" fill="#62726c" font-family="Arial,sans-serif" font-size="6">${slot.row+1}</text>`;
   out+='</g>';
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 504 486" role="group" aria-label="Interactive circle of fifths with fifteen key signature positions">${out}</svg>`;
 }
 globalThis.KeyTheory={esc,display,keyName,slots,checkCircle,signatureSvg,circleSvg};
})();
