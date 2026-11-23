'use strict';
(function(root){
 const letters='CDEFGAB';
 function parse(p){const m=/^([A-G])([b#]?)([4-6])$/.exec(p);if(!m)return null;return {letter:m[1],accidental:m[2],octave:Number(m[3]),step:Number(m[3])*7+letters.indexOf(m[1])};}
 function normalize(v){return v.trim().replace(/♭/g,'b').replace(/♯/g,'#').replace(/\s+/g,'');}
 function matchPitch(value,expected){return normalize(value)===expected;}
 const abbreviations={'Major 2nd':'M2','Minor 3rd':'m3','Perfect 5th':'P5','Perfect 4th':'P4','Major 6th':'M6','Minor 2nd':'m2','Perfect unison':'P1','Minor 7th':'m7','Augmented 4th':'A4','Perfect octave':'P8','Major 3rd':'M3','Minor 6th':'m6','Major 7th':'M7','Diminished 5th':'d5'};
 function matchInterval(v,expected){const a=v.trim();return a===abbreviations[expected]||a.toLowerCase().replace(/\s+/g,'')===expected.toLowerCase().replace(/\s+/g,'')||(expected==='Perfect unison'&&/^(unison|perfect1st)$/i.test(normalize(a)))||(expected==='Perfect octave'&&/^(octave|perfect8th)$/i.test(normalize(a)));}
 function positionFromY(y){const steps=Math.round((130-y)/6);return Math.max(28,Math.min(48,30+steps));}
 function pitchAt(step){return {letter:letters[step%7],octave:Math.floor(step/7)};}
 function symbol(p,x,color){const v=parse(p);if(!v)return '';const step=v.step-30,y=130-step*6;let s='';if(step<0)for(let a=-2;a>=step;a-=2)s+=`<path d="M${x-11} ${130-a*6}h22"/>`;if(step>8)for(let a=10;a<=step;a+=2)s+=`<path d="M${x-11} ${130-a*6}h22"/>`;s+=`<ellipse cx="${x}" cy="${y}" rx="7" ry="4.5" transform="rotate(-14 ${x} ${y})" fill="white" stroke-width="2"/>`;if(v.accidental)s+=`<text x="${x-22}" y="${y+5}" fill="${color}" stroke="none" font-family="DejaVu Sans,Arial,sans-serif" font-size="21">${v.accidental==='b'?'♭':'♯'}</text>`;return `<g fill="none" stroke="${color}" stroke-width="1">${s}</g>`;}
 function staff(lower,upper,options={}){let s='<rect width="260" height="180" fill="white"/>';for(let i=0;i<5;i++)s+=`<path d="M10 ${82+i*12}H250" stroke="#52665d" stroke-width="1"/>`;s+=`<path d="${root.INTERVAL_DATA.glyph}" transform="translate(18 118) scale(.048 -.048)" fill="#143d3a"/>`;s+=symbol(lower,95,'#143d3a');if(upper)s+=symbol(upper,193,'#216b60');return `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="180" viewBox="0 0 260 180" role="img" aria-label="${options.label||'Treble-clef staff for interval practice'}">${s}</svg>`;}
 root.IntervalTheory={parse,normalize,matchPitch,matchInterval,positionFromY,pitchAt,staff,abbreviations};
})(globalThis);
