import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../previews/natal/abertura/',import.meta.url);
const d=JSON.parse(fs.readFileSync(new URL('alternativas/fisica.json',root)));
assert.equal(d.frames.length,661);
assert.equal(d.fps,60);
const point=(b,p)=>[b.x+p.x*Math.cos(b.a)-p.y*Math.sin(b.a),b.y+p.x*Math.sin(b.a)+p.y*Math.cos(b.a)];
function finite(x){if(typeof x==='number')assert.ok(Number.isFinite(x));else if(Array.isArray(x))x.forEach(finite);else if(x&&typeof x==='object')Object.values(x).forEach(finite);else assert.notEqual(x,null)}
finite(d);
for(const f of d.frames){
 f.r.forEach((r,i)=>{
  assert.equal(r.length,15);
  const ends=[point(f.s,d.pins.sled),point(f.d[i],d.pins.deer)];
  [r[0],r.at(-1)].forEach((p,j)=>assert.ok(Math.hypot(p[0]-ends[j][0],p[1]-ends[j][1])<.006,'rein detached from moving body'));
  for(let j=1;j<r.length;j++)assert.ok(Math.hypot(r[j][0]-r[j-1][0],r[j][1]-r[j-1][1])<34,'unstable rein segment');
 });
}
const span=key=>Math.max(...d.frames.map(f=>f.s[key]))-Math.min(...d.frames.map(f=>f.s[key]));
assert.ok(span('x')>40&&span('x')<120,'traction response lost or unstable');
assert.ok(span('y')>40&&span('y')<120,'vertical inertia lost or unstable');
assert.ok(span('a')>.035&&span('a')<.4,'off-centre rein torque lost or unstable');
assert.notDeepEqual(d.frames[126].d[0].legs,d.frames[147].d[0].legs);
// The prior illustration remains a separate, unchanged eight-second source.
const original=JSON.parse(fs.readFileSync(new URL('rig/movimento-web.json',root)));
assert.equal(original.duration,8);
assert.equal(original.frames.length,481);
console.log('PASS: finite motion; body-attached reins; bounded inertia and torque; distinct gallop; v15 preserved.');
