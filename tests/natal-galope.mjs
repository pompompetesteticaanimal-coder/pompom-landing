import assert from 'node:assert/strict';
import {legCycle} from '../previews/natal/abertura/alternativas/galope.mjs';
const hoof=([upper,knee])=>({x:-27*Math.sin(upper)-27*Math.sin(upper+knee),y:27*Math.cos(upper)+27*Math.cos(upper+knee)});
let strokes=0;
for(let animal=0;animal<9;animal++)for(let n=0;n<240;n++){
 const t=n/120,angles=legCycle(t,animal),a=angles.map(hoof),b=legCycle(t+.001,animal).map(hoof);
 for(let leg=0;leg<4;leg++){
  const elbow={x:-27*Math.sin(angles[leg][0]),y:27*Math.cos(angles[leg][0])},cross=a[leg].x*elbow.y-a[leg].y*elbow.x;
  assert.ok(leg<2?cross<0:cross>0,'front and hind joints must bend on their intended opposite sides');
 }
 for(let leg=0;leg<4;leg++)if(a[leg].y>43){assert.ok(b[leg].x<a[leg].x,'extended hoof must sweep backwards to propel the animal forwards');strokes++;}
}
assert.ok(strokes>1000);
console.log('PASS: all four hooves sweep backwards on the downward/extended stroke across nine staggered animals.');
