import assert from 'node:assert/strict';
import fs from 'node:fs';
import {makeTeam} from '../previews/natal/abertura/alternativas/equipes.mjs';
import {attachment} from '../previews/natal/abertura/alternativas/arreios.mjs';
const source=JSON.parse(fs.readFileSync(new URL('../previews/natal/abertura/alternativas/fisica.json',import.meta.url)));
const unchanged=JSON.stringify(source);
for(const count of [4,6,9]){
 const team=makeTeam(source,count);assert.equal(team.teamCount,count);
 for(const f of team.frames){
  assert.equal(f.d.length,count);assert.equal(f.r.length,count);
  f.r.forEach((r,i)=>{const a=attachment(f.s,source.pins.sled),b=attachment(f.d[i],source.pins.deer);assert.ok(Math.hypot(r[0][0]-a.x,r[0][1]-a.y)<.001);assert.ok(Math.hypot(r.at(-1)[0]-b.x,r.at(-1)[1]-b.y)<.001);assert.ok(r.flat().every(Number.isFinite));});
  for(let i=1;i<Math.min(count,8);i+=2)assert.ok(Math.abs(f.d[i].y-f.s.y)<16,'near row must align with sleigh');
 }
 assert.notDeepEqual(team.frames[120].d[0].legs,team.frames[120].d[2].legs,'animals must have staggered gait');
}
assert.equal(JSON.stringify(source),unchanged,'original simulation must stay unchanged');
console.log('PASS: 4/6/9 layouts, attached reins, aligned near row, staggered gait and original source preserved.');
