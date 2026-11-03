"""Build an editable Blender 2.5D cutout rig from the same baked motion used on web."""
import bpy,json,math
from pathlib import Path
R=Path(__file__).resolve().parent
D=json.loads((R/'movimento.json').read_text());A=json.loads((R/'atlas.json').read_text())
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=8;scene.render.resolution_x=1080;scene.render.resolution_y=600;scene.render.resolution_percentage=100;scene.render.film_transparent=True;scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA';scene.render.fps=60;scene.frame_start=1;scene.frame_end=len(D['frames'])
scene.view_settings.view_transform='Standard'
def mat(name,file,cut=True):
 m=bpy.data.materials.new(name);m.use_nodes=True;n=m.node_tree.nodes;n.clear();out=n.new('ShaderNodeOutputMaterial');mix=n.new('ShaderNodeMixShader');transparent=n.new('ShaderNodeBsdfTransparent');em=n.new('ShaderNodeEmission');tex=n.new('ShaderNodeTexImage');tex.image=bpy.data.images.load(str(file),check_existing=True);tex.image.pack();m.node_tree.links.new(tex.outputs['Color'],em.inputs['Color']);m.node_tree.links.new(transparent.outputs[0],mix.inputs[1]);m.node_tree.links.new(em.outputs[0],mix.inputs[2]);m.node_tree.links.new(mix.outputs[0],out.inputs[0]);
 if cut:
  mul=n.new('ShaderNodeMath');mul.operation='MULTIPLY';mul.inputs[1].default_value=10;sub=n.new('ShaderNodeMath');sub.operation='ADD';sub.inputs[1].default_value=-8.8;sub.use_clamp=True;m.node_tree.links.new(tex.outputs['Alpha'],mul.inputs[0]);m.node_tree.links.new(mul.outputs[0],sub.inputs[0]);m.node_tree.links.new(sub.outputs[0],mix.inputs[0])
 else:m.node_tree.links.new(tex.outputs['Alpha'],mix.inputs[0])
 return m
atlasmat=mat('Rena · textura e recorte alfa',R/'rena-atlas-limpo.png');sledmat=mat('Papai Noel · trenó',R/'treno-santa-rig.png')
def plane(name,part,x,y,w,h,z,arm=None,bone=None,material=atlasmat):
 mesh=bpy.data.meshes.new(name);verts=[(x,-y,z),(x+w,-y,z),(x+w,-y-h,z),(x,-y-h,z)];mesh.from_pydata(verts,[],[(0,1,2,3)]);mesh.update();ob=bpy.data.objects.new(name,mesh);scene.collection.objects.link(ob);mesh.materials.append(material)
 if part:
  q=A['parts'][part];u0=q['x']/A['width'];u1=(q['x']+q['w'])/A['width'];v1=1-q['y']/A['height'];v0=1-(q['y']+q['h'])/A['height']
 else:u0,u1,v0,v1=0,1,0,1
 uv=mesh.uv_layers.new();coords=[(u0,v1),(u1,v1),(u1,v0),(u0,v0)]
 for loop in mesh.loops:uv.data[loop.index].uv=coords[loop.vertex_index]
 if arm:
  ob.parent=arm
  if bone:
   group=ob.vertex_groups.new(name=bone);group.add([0,1,2,3],1,'REPLACE');mod=ob.modifiers.new('Rig articulado','ARMATURE');mod.object=arm
 return ob
arms=[]
for idx in range(2):
 ar=bpy.data.armatures.new('Esqueleto_Rena_'+str(idx+1));ob=bpy.data.objects.new('Rena_'+str(idx+1)+' · galope e inércia',ar);scene.collection.objects.link(ob);bpy.context.view_layer.objects.active=ob;ob.select_set(True);bpy.ops.object.mode_set(mode='EDIT')
 root=ar.edit_bones.new('body');root.head=(0,0,0);root.tail=(0,10,0)
 for j in range(4):
  hx=-28 if j>=2 else 27;hy=10 if j%2 else 15
  u=ar.edit_bones.new('upper_'+str(j));u.head=(hx,-hy,0);u.tail=(hx,-hy-25,0);u.parent=root
  l=ar.edit_bones.new('lower_'+str(j));l.head=u.tail;l.tail=(hx,-hy-52,0);l.parent=u;l.use_connect=True
 for name,h,t in [('head',(32,10,0),(32,65,0)),('tail',(-46,5,0),(-70,5,0)),('scarf',(32,5,0),(-30,5,0))]:
  b=ar.edit_bones.new(name);b.head=h;b.tail=t;b.parent=root
 bpy.ops.object.mode_set(mode='OBJECT');ob.show_in_front=True
 for pb in ob.pose.bones:
  pb.rotation_mode='XYZ'
  if pb.name!='body':
   lim=pb.constraints.new('LIMIT_ROTATION');lim.owner_space='LOCAL';lim.use_limit_z=True;lim.min_z=-2.9;lim.max_z=2.9
 plane('Rena'+str(idx+1)+'_body','body',-50,-28,100,57,3,ob,'body')
 plane('Rena'+str(idx+1)+'_head','head',15,-97,64,94,5,ob,'head')
 plane('Rena'+str(idx+1)+'_tail','tail',-75,-17,32,25,1,ob,'tail')
 plane('Rena'+str(idx+1)+'_scarf','scarf',-35,-9,72,23,6,ob,'scarf')
 for j in range(4):
  hx=-28 if j>=2 else 27;hy=10 if j%2 else 15;rear=j>=2;z=2 if j%2 else 4
  plane('Rena'+str(idx+1)+'_upper'+str(j),'rearUpper' if rear else 'foreUpper',hx-9,hy-5,18,33,z,ob,'upper_'+str(j))
  plane('Rena'+str(idx+1)+'_lower'+str(j),'rearLower' if rear else 'foreLower',hx-6,hy+20,12,35,z,ob,'lower_'+str(j))
 arms.append(ob);ob.select_set(False)
sled=bpy.data.objects.new('Trenó · massa 4.6 · molas amortecidas',None);scene.collection.objects.link(sled);s=plane('Papai Noel e carroagem',None,-135,-110,270,220,7,material=sledmat);s.parent=sled
ropes=[];gold=bpy.data.materials.new('Rédeas douradas');gold.diffuse_color=(.65,.34,.12,1);gold.use_nodes=True;bs=gold.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(.65,.34,.12,1);bs.inputs['Metallic'].default_value=.6;bs.inputs['Roughness'].default_value=.38
for idx in range(2):
 curve=bpy.data.curves.new('Corda física '+str(idx+1),'CURVE');curve.dimensions='3D';curve.bevel_depth=1.4;curve.bevel_resolution=2;sp=curve.splines.new('POLY');sp.points.add(8);ob=bpy.data.objects.new('Rédea '+str(idx+1)+' · 9 nós Matter.js',curve);scene.collection.objects.link(ob);curve.materials.append(gold);ropes.append(ob)
for i,frame in enumerate(D['frames']):
 if i%2 and i!=len(D['frames'])-1:continue
 fn=i+1;scene.frame_set(fn);s=frame['s'];sled.location=(s['x'],-s['y'],0);sled.rotation_euler[2]=-s['a'];sled.keyframe_insert('location',frame=fn);sled.keyframe_insert('rotation_euler',frame=fn)
 for idx,arm in enumerate(arms):
  d=frame['d'][idx];arm.location=(d['x'],-d['y'],0);arm.rotation_euler[2]=-d['a'];arm.keyframe_insert('location',frame=fn);arm.keyframe_insert('rotation_euler',frame=fn)
  for name in ['head','tail','scarf']:
   pb=arm.pose.bones[name];pb.rotation_euler[2]=-d[name];pb.keyframe_insert('rotation_euler',frame=fn)
  for j in range(4):
   for k,name in enumerate(['upper_','lower_']):
    pb=arm.pose.bones[name+str(j)];pb.rotation_euler[2]=-d['legs'][j][k];pb.keyframe_insert('rotation_euler',frame=fn)
 for idx,rope in enumerate(ropes):
  for j,p in enumerate(frame['r'][idx]):
   point=rope.data.splines[0].points[j];point.co=(p[0],-p[1],8,1);point.keyframe_insert('co',frame=fn)
camd=bpy.data.cameras.new('Câmera ortográfica');cam=bpy.data.objects.new('Câmera ortográfica',camd);scene.collection.objects.link(cam);cam.location=(0,-10,1000);camd.type='ORTHO';camd.ortho_scale=760;scene.camera=cam
world=bpy.data.worlds.new('Ambiente') if not scene.world else scene.world;scene.world=world;world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.12,.12,.12,1)
light=bpy.data.lights.new('Luz de revisão','AREA');light.energy=1600;lo=bpy.data.objects.new('Luz de revisão',light);scene.collection.objects.link(lo);lo.location=(0,0,500);light.size=600
scene['Physics engine']='Matter.js 0.20.0';scene['Animation type']='2.5D cutout rig: articulated two-bone IK gallop; baked mass-spring inertia and rope chains';scene['Web frames']='movimento.json, 481 frames at 60 fps';scene.frame_set(109)
text=bpy.data.texts.new('LEIA-ME');text.write('Rig 2.5D de Natal. Os membros têm ossos e limites locais de rotação. Movimento de corpos e rédeas calculado em Matter.js e importado em keyframes. O player web usa os mesmos dados. Não é um modelo volumétrico 3D.\n')
bpy.ops.wm.save_as_mainfile(filepath=str(R/'pompom-treno-renas.blend'))
scene.render.filepath=str(R/'revisao-rig.png');bpy.ops.render.render(write_still=True)
print('BLENDER_RIG_OK',len(arms),'armatures',scene.frame_end,'frames')
