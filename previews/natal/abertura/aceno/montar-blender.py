"""Author an editable 2.5D Santa rig; bake the waving channels for the web player."""
import bpy,json,math
from pathlib import Path
R=Path(__file__).resolve().parent;A=json.loads((R/'atlas.json').read_text())
# The hat's original pompom is cropped from its UV region; a separate part follows the hat.
A['parts']['hat']['h']=220
(R/'atlas-web.json').write_text(json.dumps(A,indent=2))
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=8;scene.render.resolution_x=960;scene.render.resolution_y=800;scene.render.resolution_percentage=100;scene.render.film_transparent=True;scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA';scene.render.fps=60;scene.frame_start=1;scene.frame_end=661;scene.view_settings.view_transform='Standard'
m=bpy.data.materials.new('Pintura original · alfa limpo');m.use_nodes=True;n=m.node_tree.nodes;n.clear();out=n.new('ShaderNodeOutputMaterial');mix=n.new('ShaderNodeMixShader');transparent=n.new('ShaderNodeBsdfTransparent');em=n.new('ShaderNodeEmission');tex=n.new('ShaderNodeTexImage');tex.image=bpy.data.images.load(str(R/'papai-noel-atlas.png'));tex.image.pack();tex.image.filepath='//papai-noel-atlas.png';mul=n.new('ShaderNodeMath');mul.operation='MULTIPLY';mul.inputs[1].default_value=10;sub=n.new('ShaderNodeMath');sub.operation='ADD';sub.inputs[1].default_value=-8.8;sub.use_clamp=True
for a,b in [(tex.outputs['Color'],em.inputs['Color']),(tex.outputs['Alpha'],mul.inputs[0]),(mul.outputs[0],sub.inputs[0]),(sub.outputs[0],mix.inputs[0]),(transparent.outputs[0],mix.inputs[1]),(em.outputs[0],mix.inputs[2]),(mix.outputs[0],out.inputs[0])]:m.node_tree.links.new(a,b)
ar=bpy.data.armatures.new('Papai Noel · aceno');rig=bpy.data.objects.new('Papai Noel · braços, cabeça e gorro',ar);scene.collection.objects.link(rig);bpy.context.view_layer.objects.active=rig;rig.select_set(True);bpy.ops.object.mode_set(mode='EDIT')
defs=[('body',(0,0),(0,-10),None),('head',(-13,-96),(-13,-130),'body'),('upper',(-47,-75),(-47,-47),'body'),('forearm',(-47,-47),(-47,-107),'upper'),('hat',(-23,-136),(-23,-160),'head'),('pompom',(-68,-124),(-68,-108),'hat')]
for name,head,tail,parent in defs:
 b=ar.edit_bones.new(name);b.head=(head[0],-head[1],0);b.tail=(tail[0],-tail[1],0)
 if parent:b.parent=ar.edit_bones[parent]
bpy.ops.object.mode_set(mode='OBJECT');rig.show_in_front=True
for pb in rig.pose.bones:pb.rotation_mode='XYZ'
def plane(name,part,x,y,w,h,z,bone=None):
 q=A['parts'][part];mesh=bpy.data.meshes.new(name);mesh.from_pydata([(x,-y,z),(x+w,-y,z),(x+w,-y-h,z),(x,-y-h,z)],[],[(0,1,2,3)]);mesh.update();ob=bpy.data.objects.new(name,mesh);scene.collection.objects.link(ob);mesh.materials.append(m);uv=mesh.uv_layers.new();u=q['x']/A['width'];v=1-q['y']/A['height'];du=q['w']/A['width'];dv=q['h']/A['height'];coords=[(u,v),(u+du,v),(u+du,v-dv),(u,v-dv)]
 for loop in mesh.loops:uv.data[loop.index].uv=coords[loop.vertex_index]
 if bone:
  ob.parent=rig;g=ob.vertex_groups.new(name=bone);g.add([0,1,2,3],1,'REPLACE');mod=ob.modifiers.new('Peça articulada','ARMATURE');mod.object=rig
 return ob
plane('Trenó vermelho e dourado','sled',-140,-85,280,180,0)
plane('Corpo sentado','body',-58,-95,102,98,2,'body')
plane('Rosto e barba','head',-52,-148,78,91,3,'head')
plane('Braço próximo','upper',-60,-79,27,38,4,'upper')
plane('Antebraço e mão aberta','wave',-65,-109,38,68,5,'forearm')
plane('Gorro sem pompom duplicado','hat',-71,-166,100,54,6,'hat')
plane('Pompom articulado','pompom',-82,-130,37,28,7,'pompom')
plane('Lanterna','lantern',-112,-3,27,49,8)
states={k:{'p':0.,'v':0.} for k in ['head','hat','pompom']}
def spring(name,target,k,d):
 s=states[name];dt=1/60;s['v']+=((target-s['p'])*k-d*s['v'])*dt;s['p']+=s['v']*dt;return s['p']
def smooth(x):x=max(0,min(1,x));return x*x*(3-2*x)
for frame in range(661):
 t=frame/60;envelope=smooth((t-.8)/.55)*(1-smooth((t-4.7)/.65));body_y=23+math.sin(t*5.2)*2.2;body_a=math.sin(t*3.1)*2.1
 values={'body':body_a,'head':spring('head',math.sin(t*3.2)*3.2+envelope*2.5,75,12),'upper':32-envelope*9+math.sin(t*4.2)*2,'forearm':-32+envelope*math.sin((t-.2)*2*math.pi*2.1)*24,'hat':spring('hat',-body_a*.5+math.sin(t*3.4-.5)*4.5,48,7),'pompom':spring('pompom',math.sin(t*4.8-1)*13,34,4)}
 rig.location.y=-body_y;rig.keyframe_insert('location',frame=frame+1)
 for name,value in values.items():pb=rig.pose.bones[name];pb.rotation_euler.z=-math.radians(value);pb.keyframe_insert('rotation_euler',frame=frame+1)
frames=[]
for frame in range(661):
 scene.frame_set(frame+1);pose={name:round(-math.degrees(rig.pose.bones[name].rotation_euler.z),4) for name in ['body','head','upper','forearm','hat','pompom']};pose['y']=round(-rig.location.y,4);frames.append(pose)
(R/'aceno.json').write_text(json.dumps({'authoring':'Blender '+bpy.app.version_string,'fps':60,'duration':11,'frames':frames},separators=(',',':')))
camd=bpy.data.cameras.new('Câmera de revisão');cam=bpy.data.objects.new('Câmera de revisão',camd);scene.collection.objects.link(cam);cam.location=(0,36,1000);camd.type='ORTHO';camd.ortho_scale=370;scene.camera=cam;scene.frame_set(124)
scene['Rig type']='2.5D illustrated cutout, hierarchical upper-arm/forearm waving, damped secondary motion';scene['Web export']='aceno.json and atlas-web.json'
bpy.ops.wm.save_as_mainfile(filepath=str(R/'papai-noel-acenando.blend'));scene.render.filepath=str(R/'revisao-papai-noel.png');bpy.ops.render.render(write_still=True)
print('SANTA_WAVE_OK',len(frames),'frames,',len(rig.pose.bones),'bones')
