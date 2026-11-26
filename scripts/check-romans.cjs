'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx={};vm.createContext(ctx);for(const f of ['roman-data.js','theory.js'])vm.runInContext(fs.readFileSync('chapter-9/'+f,'utf8'),ctx);
const D=ctx.ROMAN_DATA,T=ctx.RomanTheory;
const spellings=[['D F# A','E G B','F# A C#','G B D','A C# E','B D F#','C# E G'],['Eb G Bb','F Ab C','G Bb D','Ab C Eb','Bb D F','C Eb G','D F Ab'],['A C# E','B D F#','C# E G#','D F# A','E G# B','F# A C#','G# B D'],['Bb D F','C Eb G','D F A','Eb G Bb','F A C','G Bb D','A C Eb']];
assert.equal(D.triad_sets.length,4);let count=0;
D.triad_sets.forEach((s,g)=>s.chords.forEach((q,i)=>{
 assert.equal(q.notes.map(n=>T.parse(n).name).join(' '),spellings[g][i]);assert.equal(q.roman,['I','ii','iii','IV','V','vi','vii°'][i]);
 assert(T.checkNotes(q.notes,q));assert(T.checkNotes(q.notes.map(n=>n.slice(0,-1)+(+n.slice(-1)+1)),q));assert(!T.checkNotes([q.notes[1],q.notes[2],q.notes[0]],q));assert(!T.checkNotes(['','',''],q));
 const wrong=q.notes.slice();wrong[1]=wrong[1][0]+(T.parse(wrong[1]).acc?'':'#')+wrong[1].slice(-1);assert(!T.checkNotes(wrong,q));
 const svg=T.svg(q.notes,'check',0,s.clef,s.signature);assert.equal((svg.match(/<ellipse/g)||[]).length,3);assert.equal((svg.match(/fill="none"/g)||[]).length,3);assert(svg.includes('role="application"'));count++;
}));
assert.equal(T.resolve('F','key','4',['F#','C#']),'F#4');assert.equal(T.resolve('F','','4',['F#','C#']),'F4');assert.equal(T.fromStep(34,'key',['Bb','Eb']),'Bb4');
assert(T.svg(['F4','',''],'Natural',0,'treble',['F#','C#']).includes('♮'));
for(const [v,a] of [[' viio ','vii°'],['vii dim','vii°'],['VII','VII'],['v','v'],['V','V']])assert(T.checkRoman(v,a));
for(const [v,a] of [['v','V'],['V','v'],['VII','vii°'],['VII°','vii°'],['VI','vi'],['i','I'],['vii','vii°'],['','I']])assert(!T.checkRoman(v,a));
assert.equal(D.major_identify['C major'].map(q=>q[1]).join(' '),'IV vi vii° V ii');assert.equal(D.major_identify['G major'].map(q=>q[1]).join(' '),'vi IV vii° V ii');assert.equal(D.minor_identify.map(q=>q[1]).join(' '),'i iv V VI vii° v VII');
const html=fs.readFileSync('chapter-9/index.html','utf8');assert.equal((html.match(/<audio\b/g)||[]).length,1);assert.equal((html.match(/<table\b/g)||[]).length,6);assert(html.includes('Download printable chapter'));assert(!html.includes('exercises/'));assert(fs.readFileSync('chapter-9/assets/chapter-9-print.pdf').subarray(0,5).toString()==='%PDF-');
console.log(`PASS: ${count} triads independently checked, 17 Roman identifications, key-signature overrides, V/v distinction, transparent noteheads, local recording, six tables, and student PDF.`);
