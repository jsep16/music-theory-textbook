'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const context={};vm.createContext(context);for(const name of ['key-data.js','theory.js'])vm.runInContext(fs.readFileSync('chapter-5/'+name,'utf8'),context);
const D=context.KEY_DATA,T=context.KeyTheory;
for(const [input,mode,want] of [['E-flat major','major','Eb'],['g♭','major','Gb'],['F sharp minor','minor','F#'],['Am','minor','A'],['C minor','major',null],['C major','minor',null],['','major',null],['<script>','major',null],['H major','major',null],['C##','major',null]])assert.equal(T.keyName(input,mode),want);
const natural={C:0,D:2,E:4,F:5,G:7,A:9,B:11},letters='CDEFGAB';
function majorSignature(key){const root=natural[key[0]]+(key[1]==='#'?1:key[1]==='b'?-1:0),alter=[];for(const [i,offset] of [0,2,4,5,7,9,11].entries()){const l=letters[(letters.indexOf(key[0])+i)%7],delta=((root+offset-natural[l]+6)%12)-6;if(delta)alter.push([l,delta]);}return alter;}
for(const [name,sig] of Object.entries(D.keys)){const alterations=majorSignature(name);assert.equal(alterations.length,sig.count);assert(alterations.every(([,d])=>d===(sig.type==='sharp'?1:-1)));const minor=natural[sig.minor[0]]+(sig.minor[1]==='#'?1:sig.minor[1]==='b'?-1:0),major=natural[name[0]]+(name[1]==='#'?1:name[1]==='b'?-1:0);assert.equal((minor-major+12)%12,9);}
const complete=T.slots.map(s=>({major:s.key,minor:D.keys[s.key].minor,count:String(D.keys[s.key].count),type:D.keys[s.key].type}));assert.equal(complete.length,15);assert(T.checkCircle(complete).every(Boolean));
for(const position of [5,6,7]){const indices=T.slots.map((s,i)=>s.position===position?i:-1).filter(i=>i>=0),swapped=complete.map(s=>({...s}));[swapped[indices[0]],swapped[indices[1]]]=[swapped[indices[1]],swapped[indices[0]]];assert(T.checkCircle(swapped).every(Boolean));const duplicate=complete.map(s=>({...s}));duplicate[indices[1]]={...duplicate[indices[0]]};assert(!T.checkCircle(duplicate)[indices[0]]&&!T.checkCircle(duplicate)[indices[1]]);}
const empty=complete.map((s,i)=>i?{major:'',minor:'',count:'',type:''}:s);assert.equal(T.checkCircle(empty).filter(Boolean).length,1);
const svg=T.circleSvg(complete,0);assert.equal((svg.match(/data-slot=/g)||[]).length,15);assert.equal((svg.match(/role="button"/g)||[]).length,15);assert(!svg.includes('undefined'));assert(!svg.includes('NaN'));
assert.deepEqual(Array.from(D.identify,q=>q.answer),['E','Db','Gb','D','Eb','G','C#','Ab']);
console.log('PASS: 15 independently derived key signatures and relative minors; answer spellings and invalid inputs; complete, blank, swapped and duplicate circle cases; 15 keyboard-accessible circle positions.');
