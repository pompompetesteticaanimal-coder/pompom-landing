/* New studies only: physically coupled traction. The original rig is untouched. */
const M=require('../rig/vendor/matter.js'),fs=require('fs'),path=require('path');
const {Engine,Bodies,Body,Composite,Constraint}=M;
const engine=Engine.create({constraintIterations:28,positionIterations:12,velocityIterations:10});
engine.gravity.y=0;
function body(x,y,w,h,m){const b=Bodies.rectangle(x,y,w,h,{frictionAir:.035,collisionFilter:{group:-1}});Body.setMass(b,m);Composite.add(engine.world,b);return b}
const sled=body(-165,38,210,100,6.8),deer=[body(90,3,96,42,1.8),body(250,-23,96,42,1.6)];
const anchor=(b,p)=>({x:b.position.x+p.x*Math.cos(b.angle)-p.y*Math.sin(b.angle),y:b.position.y+p.x*Math.sin(b.angle)+p.y*Math.cos(b.angle)});
const guides=deer.map((b,i)=>{const c=Constraint.create({bodyB:b,pointA:{...b.position},length:0,stiffness:.075,damping:.12});Composite.add(engine.world,c);return c});
const lift=Constraint.create({bodyB:sled,pointA:{x:-165,y:38},length:0,stiffness:.000018,damping:.003});Composite.add(engine.world,lift);
const pins={sled:{x:95,y:-23},deer:{x:27,y:-5}};
const ropes=deer.map(b=>{const a=anchor(sled,pins.sled),z=anchor(b,pins.deer),N=15,segment=Math.hypot(z.x-a.x,z.y-a.y)/(N-1)*1.055,nodes=[];
 for(let i=1;i<N-1;i++){const k=i/(N-1);nodes.push(body(a.x+(z.x-a.x)*k,a.y+(z.y-a.y)*k+Math.sin(k*Math.PI)*20,2,2,.032))}
 const ends=[sled,...nodes,b];for(let i=0;i<ends.length-1;i++)Composite.add(engine.world,Constraint.create({bodyA:ends[i],bodyB:ends[i+1],pointA:i===0?{...pins.sled}:{x:0,y:0},pointB:i===ends.length-2?{...pins.deer}:{x:0,y:0},length:segment,stiffness:.82,damping:.035}));
 return {deer:b,nodes};});
function state(){return {p:0,v:0}}
const secondary=deer.map(()=>({head:state(),tail:state(),scarf:state(),bell:state()})),lantern=state();
function spring(s,target,k,d,dt){s.v+=((target-s.p)*k-d*s.v)*dt;s.p+=s.v*dt;return s.p}
const gaussian=(t,c,w)=>Math.exp(-(((t-c)/w)**2));
function gait(t,i){const phase=t*2*Math.PI*1.35+i*.9;return Array.from({length:4},(_,j)=>{const q=phase+(j%2?Math.PI*.8:0)+(j>=2?1.7:0);const x=Math.sin(q)*25,y=34+Math.cos(q)*12,L=27,dist=Math.min(52,Math.hypot(x,y)),knee=(j<2?-1:1)*Math.acos((dist*dist-2*L*L)/(2*L*L));return[-Math.atan2(x,y)-knee/2,knee]})}
const frames=[],dt=1/120,settle=5;
for(let n=0;n<=(11+settle)*120;n++){
 const t=n*dt-settle,wave=t*Math.PI*2*1.35;
 // Accelerating departure, climbing turn, then braking: inertial forces in the flight frame.
 const ax=.000055*gaussian(t,1.1,.55)-.00009*gaussian(t,4.5,.5)+.000045*gaussian(t,5.55,.4);
 const ay=.000085*gaussian(t,3.9,.65)-.000055*gaussian(t,5.5,.5);
 const gust=.000025*Math.sin(t*3.3)*gaussian(t,2.8,1.6);
 deer.forEach((b,i)=>{const ph=wave+i*.9;guides[i].pointA.x=(i?250:90)+Math.sin(ph)*5+12*gaussian(t,1.2,.6);guides[i].pointA.y=(i?-23:3)+Math.cos(ph)*11-14*gaussian(t,4,.65);
  b.torque+=(Math.sin(ph-.5)*.10-b.angle)*b.inertia*.00007-b.angularVelocity*b.inertia*.0004;
 });
 for(const b of [sled,...deer])Body.applyForce(b,b.position,{x:-ax*b.mass*8,y:(ay+gust)*b.mass*8});
 // No prescribed sleigh rotation: the off-centre reins generate the torque.
 sled.torque+=(-sled.angle*.000003-sled.angularVelocity*.00009)*sled.inertia;
 ropes.forEach((r,i)=>r.nodes.forEach((b,j)=>Body.applyForce(b,b.position,{x:(-.000006+gust*.4)*b.mass,y:(.00024+Math.sin(t*6-j*.6+i)*.000012)*b.mass})));
 Engine.update(engine,1000/120);
 const d=deer.map((b,i)=>{const q=secondary[i],ph=wave+i*.9;return {x:b.position.x,y:b.position.y,a:b.angle,head:spring(q.head,-b.angle*.8-Math.cos(ph)*.13,95,10,dt),tail:spring(q.tail,Math.sin(ph+1)*.45+b.velocity.y*.07,55,6,dt),scarf:spring(q.scarf,Math.sin(t*8+i)*.22-b.velocity.y*.12,75,7,dt),bell:spring(q.bell,-b.velocity.x*.2+Math.sin(ph)*.3,68,5,dt),legs:gait(t,i)}});
 const lamp=spring(lantern,-sled.velocity.x*.22-sled.angle*1.2,40,4,dt);
 if(t>=0&&n%2===0)frames.push({t,s:{x:sled.position.x,y:sled.position.y,a:sled.angle,lantern:lamp},d,r:ropes.map(r=>[Object.values(anchor(sled,pins.sled)),...r.nodes.map(b=>[b.position.x,b.position.y]),Object.values(anchor(r.deer,pins.deer))])});
}
const data={engine:'Matter.js 0.20.0',revision:16,fps:60,duration:11,pins,notes:'Dynamic body-to-body reins with 13 interior masses; off-centre traction torque, inertial forces, 120 Hz solve. Controlled IK legs, secondary damped springs.',frames};
function clean(o){if(typeof o==='number'){if(!Number.isFinite(o))throw Error('Nonfinite');return Math.round(o*1e4)/1e4}if(Array.isArray(o))return o.map(clean);if(o&&typeof o==='object')return Object.fromEntries(Object.entries(o).map(([k,v])=>[k,clean(v)]));return o}
fs.writeFileSync(path.join(__dirname,'fisica.json'),JSON.stringify(clean(data)));
for(const key of ['x','y','a']){const a=frames.map(f=>f.s[key]);console.log('sled',key,Math.min(...a),Math.max(...a))}
console.log('Baked',frames.length,'frames; dynamic rein attachments.');
