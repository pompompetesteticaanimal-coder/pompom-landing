import * as T from './vendor/three.module.js';
// Original procedural modelling: no downloaded character assets.
export function createModel(host){
 const scene=new T.Scene();scene.background=new T.Color('#1b1025');scene.fog=new T.FogExp2('#21162d',.018);
 const renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.45;host.append(renderer.domElement);
 const camera=new T.PerspectiveCamera(39,1,.1,100);const rig=new T.Group();scene.add(rig);
 const mat=(c,metal=0,rough=.55)=>new T.MeshStandardMaterial({color:c,metalness:metal,roughness:rough});
 const red=mat('#b71939',.15,.28),gold=mat('#e9b65e',.7,.25),fur=mat('#a2693d'),cream=mat('#f5dfb4'),white=mat('#fff3df'),dark=mat('#241f2b'),brown=mat('#553527'),skin=mat('#f4b699'),green=mat('#315b4b');
 const sphere=new T.SphereGeometry(1,20,14),box=new T.BoxGeometry(1,1,1);
 function ell(parent,material,x,y,z,sx,sy,sz){const m=new T.Mesh(sphere,material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);parent.add(m);return m}
 function cube(parent,material,x,y,z,sx,sy,sz){const m=new T.Mesh(box,material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);parent.add(m);return m}
 function tube(parent,points,r,material){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));const m=new T.Mesh(new T.TubeGeometry(curve,32,r,6,false),material);parent.add(m);return m}
 function group(parent,x=0,y=0,z=0){const g=new T.Group();g.position.set(x,y,z);parent.add(g);return g}
 function torus(parent,material,x,y,z,r,t){const m=new T.Mesh(new T.TorusGeometry(r,t,8,28),material);m.position.set(x,y,z);parent.add(m);return m}
 const sled=group(rig);
 const hull=new T.Shape();hull.moveTo(-1.2,-.12);hull.bezierCurveTo(-1.6,.1,-1.45,.7,-1.35,.9);hull.bezierCurveTo(-.8,.7,-.95,.08,.15,.2);hull.bezierCurveTo(.7,.22,1.25,.7,1.13,.92);hull.bezierCurveTo(1.65,.85,1.5,.25,.87,-.12);hull.lineTo(-1.2,-.12);
 const hg=new T.ExtrudeGeometry(hull,{depth:.96,bevelEnabled:true,bevelThickness:.06,bevelSize:.06,bevelSegments:3,steps:1});hg.translate(0,0,-.48);sled.add(new T.Mesh(hg,red));
 for(const z of [-.56,.56]){
  tube(sled,[[-1.45,-.47,z],[-1.1,-.58,z],[.9,-.58,z],[1.48,-.32,z],[1.53,-.06,z],[1.35,.02,z]],.045,gold);
  for(const x of [-.85,.65])tube(sled,[[x,-.45,z],[x+.06,-.1,z]],.035,gold);
  tube(sled,[[-1.35,.87,z],[-1.04,.62,z],[-.8,.2,z],[.15,.24,z],[.8,.5,z],[1.13,.9,z]],.035,gold);
  tube(sled,[[-1,.03,z],[.15,.02,z],[.9,.35,z]],.025,gold);
  for(let i=0;i<7;i++){const x=-.9+i*.26;torus(sled,gold,x,.12,z,.06,.012)}
  tube(sled,[[-.5,.19,z],[-.7,.42,z],[-.45,.55,z],[-.3,.39,z],[-.5,.29,z]],.018,gold);
 }
 cube(sled,dark,-.15,.35,0,.8,.12,.76);cube(sled,red,-.65,.7,0,.15,.8,.83);
 const santa=group(sled,-.15,.45,0);ell(santa,red,-.1,.5,0,.47,.59,.42);ell(santa,white,.03,.97,0,.31,.2,.31);ell(santa,skin,.04,1.21,0,.29,.31,.27);
 // Beard locks and moustache; a fully modelled figure, not a billboard.
 for(let i=0;i<11;i++){const a=i/10*Math.PI;ell(santa,white,.21+Math.sin(a)*.08,1.09-Math.sin(a)*.3,Math.cos(a)*.25,.16,.18,.105)}
 ell(santa,skin,.33,1.22,0,.1,.095,.1);ell(santa,white,.29,1.11,-.105,.075,.055,.14);ell(santa,white,.29,1.11,.105,.075,.055,.14);
 for(const z of [-.21,.21])ell(santa,dark,.23,1.32,z,.027,.035,.025);
 const hat=group(santa,.01,1.43,0);const cone=new T.Mesh(new T.ConeGeometry(.31,.52,20),red);cone.position.set(-.1,.19,0);cone.rotation.z=.36;hat.add(cone);ell(hat,white,-.23,.42,0,.105,.11,.105);ell(hat,white,0,-.02,0,.32,.085,.29);
 for(const z of [-.31,.31]){tube(santa,[[0,.72,z],[.3,.62,z],[.5,.69,z]],.12,red);ell(santa,white,.44,.68,z,.085,.12,.12);ell(santa,dark,.53,.67,z,.105,.09,.10);ell(santa,dark,.32,.08,z*.65,.24,.15,.16)}
 cube(santa,dark,.03,.38,0,.85,.1,.84);cube(santa,gold,.46,.38,0,.035,.16,.2);cube(santa,dark,.48,.38,0,.035,.095,.12);
 ell(sled,green,-1,.95,0,.42,.55,.4);tube(sled,[[-1.25,1.33,0],[-1.05,1.43,0],[-.78,1.35,0]],.025,gold);
 for(let i=0;i<5;i++){const x=-1.04+(i%2)*.34,y=1.1+Math.floor(i/2)*.26,z=(i%3-1)*.27,s=.30;const g=group(sled,x,y,z);g.rotation.y=i*.4;cube(g,i%2?red:green,0,0,0,s,s,s);cube(g,gold,0,0,.154,.065,s+.01,.01);cube(g,gold,0,.154,0,.065,.01,s+.01);torus(g,gold,-.06,.19,0,.075,.014);torus(g,gold,.06,.19,0,.075,.014)}
 const lantern=group(sled,1.1,.55,.6);tube(lantern,[[0,.15,0],[0,-.05,0]],.015,gold);cube(lantern,gold,0,-.16,0,.16,.23,.16);const glow=new T.MeshBasicMaterial({color:'#ffe8a1'});cube(lantern,glow,.005,-.16,.09,.10,.15,.01);const lamp=new T.PointLight('#ffb949',2,3);lamp.position.set(1.15,.4,.8);sled.add(lamp);
 function makeDeer(i){const root=group(rig),body=group(root);ell(body,fur,0,0,0,.53,.28,.23);ell(body,cream,.25,-.03,0,.20,.22,.225);ell(body,cream,-.48,.08,0,.15,.13,.15);
  const tail=group(body,-.48,.11,0);ell(tail,cream,-.14,.08,0,.21,.08,.075);
  const head=group(body,.31,.13,0);ell(head,fur,.08,.28,0,.17,.37,.16);ell(head,fur,.2,.57,0,.25,.17,.15);ell(head,cream,.35,.52,0,.18,.10,.13);ell(head,i?red:dark,.49,.55,0,.07,.065,.075);
  for(const z of [-.14,.14]){ell(head,dark,.27,.65,z,.03,.035,.025);ell(head,white,.28,.66,z*1.04,.009,.011,.009);const ear=ell(head,fur,-.04,.65,z*1.6,.16,.075,.06);ear.rotation.z=-.3;
   tube(head,[[-.03,.65,z],[-.16,.87,z*1.2],[-.1,1.12,z*1.4],[-.22,1.24,z*1.4]],.025,brown);tube(head,[[-.13,.88,z*1.2],[-.32,.97,z*1.35],[-.38,1.1,z*1.4]],.019,brown);tube(head,[[-.12,1.08,z*1.4],[.04,1.17,z*1.5],[.07,1.28,z*1.5]],.018,brown);
  }
  const collar=torus(body,red,.23,.05,0,.255,.042);collar.rotation.y=Math.PI/2;const bell=group(body,.28,-.23,.17);ell(bell,gold,0,-.03,0,.055,.065,.055);tube(bell,[[-.025,-.075,.04],[.025,-.075,.04]],.006,dark);
  for(const z of [-.24,.24])tube(body,[[.17,.13,z],[-.24,-.13,z]],.025,red);
  const legs=[];for(let j=0;j<4;j++){const hip=group(body,j>=2?-.30:.28,-.12,j%2?-.15:.15),upper=group(hip),lower=group(upper,0,-.27,0);ell(upper,fur,0,-.13,0,.075,.18,.065);ell(lower,fur,0,-.12,0,.045,.15,.043);ell(lower,dark,.015,-.27,.0,.075,.07,.065);legs.push({upper,lower})}
  return {root,head,tail,legs,bell};
 }
 const deer=[makeDeer(0),makeDeer(1)];
 // Dynamic ropes are rendered as real 3D tubes, rebuilt from the baked mass nodes.
 const ropes=Array.from({length:4},()=>{const curve=new T.CatmullRomCurve3([new T.Vector3(0,0,0),new T.Vector3(1,0,0)]);const mesh=new T.Mesh(new T.TubeGeometry(curve,36,.012,5,false),gold);mesh.geometry.attributes.position.setUsage(T.DynamicDrawUsage);mesh.frustumCulled=false;rig.add(mesh);return mesh});
 const moonMaterial=new T.MeshStandardMaterial({color:'#ffe9b8',emissive:'#edc77a',emissiveIntensity:.7,roughness:1});const moon=ell(scene,moonMaterial,-1.4,3.1,-8,1.65,1.65,.4);
 for(let i=0;i<15;i++){const a=i*2.4,r=.15+(i%4)*.16;ell(moon,mat('#c7b18f'),Math.cos(a)*r,Math.sin(a)*r,Math.sqrt(1-r*r)*.99,.04+(i%3)*.015,.045,.014)}
 scene.add(new T.HemisphereLight('#a5c9ff','#3a1730',2.1));const key=new T.DirectionalLight('#ffe2ad',4.4);key.position.set(-3,6,7);scene.add(key);const rim=new T.DirectionalLight('#8dbeed',3.2);rim.position.set(5,2,-5);scene.add(rim);
 const stars=[];for(let i=0;i<180;i++){const a=i*2.399;stars.push(Math.sin(a)*18,Math.cos(i*3.2)*12,-12-Math.sin(i)*8)}const starGeo=new T.BufferGeometry();starGeo.setAttribute('position',new T.Float32BufferAttribute(stars,3));scene.add(new T.Points(starGeo,new T.PointsMaterial({color:'#ffe1ad',size:.035,transparent:true,opacity:.8})));
 const hills=group(scene,0,-4,-5);for(let i=0;i<9;i++){const mountain=new T.Mesh(new T.ConeGeometry(2.5,3.4,4),mat(i%2?'#49384c':'#58455b',0,1));mountain.position.set((i-4)*3,Math.sin(i)*.3,-i%3*2);mountain.rotation.y=Math.PI/4;hills.add(mountain);const snowcap=new T.Mesh(new T.ConeGeometry(.75,1,4),white);snowcap.position.copy(mountain.position).add(new T.Vector3(0,1.2,0));snowcap.rotation.y=Math.PI/4;hills.add(snowcap)}
 const snowGeo=new T.BufferGeometry(),snowPos=new Float32Array(130*3);snowGeo.setAttribute('position',new T.BufferAttribute(snowPos,3));scene.add(new T.Points(snowGeo,new T.PointsMaterial({color:'#e7e9f3',size:.045,transparent:true,opacity:.6})));
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 function update(t,f){sled.position.set(f.s.x/100,-f.s.y/100,0);sled.rotation.z=-f.s.a;lantern.rotation.z=-f.s.lantern;
  deer.forEach((d,i)=>{const q=f.d[i];d.root.position.set(q.x/100,-q.y/100,i?.12:-.12);d.root.rotation.z=-q.a;d.head.rotation.z=-q.head;d.tail.rotation.z=-q.tail;d.bell.rotation.z=-q.bell;d.legs.forEach((leg,j)=>{leg.upper.rotation.z=-q.legs[j][0];leg.lower.rotation.z=-q.legs[j][1]})});
  for(let i=0;i<4;i++){const pts=f.r[i%2].map((p,j)=>new T.Vector3(p[0]/100,-p[1]/100,(i<2?.18:-.18)+Math.sin(j*.4+t*5)*.012));const curve=new T.CatmullRomCurve3(pts),position=ropes[i].geometry.attributes.position;for(let n=0;n<=36;n++){const v=curve.getPointAt(n/36),tangent=curve.getTangentAt(n/36),len=Math.hypot(tangent.x,tangent.y)||1;for(let j=0;j<=5;j++){const a=j/5*Math.PI*2,c=Math.cos(a)*.012;position.setXYZ(n*6+j,v.x-tangent.y/len*c,v.y+tangent.x/len*c,v.z+Math.sin(a)*.012)}}position.needsUpdate=true;ropes[i].geometry.computeVertexNormals()}
  if(t<5.2){const enter=clamp((t-.2)/1.2,0,1),exit=clamp((t-4)/1.2,0,1);rig.position.set(-8*(1-enter)+exit*9,.3+exit*2,Math.sin(t*.7)*.3-exit*3);rig.rotation.set(Math.sin(t*.9)*.04,-.15+Math.sin(t*.7)*.18,-exit*.2);rig.scale.setScalar(1)}else{const q=clamp((t-5.2)/1.25,0,1);rig.position.set(5-6.4*q,2.5+.6*q,-8-q*3);rig.rotation.set(0,Math.PI,0);rig.scale.setScalar(.65-.49*q);}
  rig.visible=t>.15&&t<6.6;camera.position.set(4.5-Math.sin(t*.6)*1.2,2.4,22);camera.lookAt(.1,-1.45,0);
  for(let i=0;i<130;i++){snowPos[i*3]=Math.sin(i*7.3)*9+Math.sin(t+i)*.2;snowPos[i*3+1]=((i*.39-t*.7)%13+13)%13-6;snowPos[i*3+2]=Math.cos(i*3)*8}snowGeo.attributes.position.needsUpdate=true;
  renderer.render(scene,camera);
 }
 function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.render(scene,camera)}
 const observer=new ResizeObserver(resize);observer.observe(host);resize();
 return {update,info:{renderer:'Three.js '+T.REVISION,mode:'Volumetric meshes, perspective camera, articulated limbs, coupled traction'},dispose(){observer.disconnect();const geos=new Set(),mats=new Set();scene.traverse(o=>{if(o.geometry)geos.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>mats.add(m))});geos.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove()}};
}
