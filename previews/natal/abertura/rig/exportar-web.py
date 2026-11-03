"""Run with: blender -b pompom-treno-renas.blend --python exportar-web.py"""
import bpy,json,math
from pathlib import Path
root=Path(__file__).resolve().parent
scene=bpy.context.scene
arms=sorted([o for o in scene.objects if o.type=='ARMATURE'],key=lambda o:o.name)
sled=next(o for o in scene.objects if o.name.startswith('Trenó ·'))
ropes=sorted([o for o in scene.objects if o.type=='CURVE' and o.name.startswith('Rédea ')],key=lambda o:o.name)
frames=[]
for frame in range(scene.frame_start,scene.frame_end+1):
 scene.frame_set(frame);ds=[]
 for arm in arms:
  p=arm.pose.bones
  ds.append({'x':arm.location.x,'y':-arm.location.y,'a':-arm.rotation_euler.z,'head':-p['head'].rotation_euler.z,'tail':-p['tail'].rotation_euler.z,'scarf':-p['scarf'].rotation_euler.z,'legs':[[-p['upper_'+str(i)].rotation_euler.z,-p['lower_'+str(i)].rotation_euler.z] for i in range(4)]})
 frames.append({'t':(frame-scene.frame_start)/scene.render.fps,'s':{'x':sled.location.x,'y':-sled.location.y,'a':-sled.rotation_euler.z},'d':ds,'r':[[[p.co.x,-p.co.y] for p in ob.data.splines[0].points] for ob in ropes]})
def clean(o):
 if isinstance(o,float):
  if not math.isfinite(o):raise ValueError('Invalid animation value')
  return round(o,4)
 if isinstance(o,list):return [clean(x) for x in o]
 if isinstance(o,dict):return {k:clean(v) for k,v in o.items()}
 return o
result=clean({'engine':'Matter.js 0.20.0','authoring':'Blender '+bpy.app.version_string,'fps':scene.render.fps,'duration':(scene.frame_end-scene.frame_start)/scene.render.fps,'frames':frames,'notes':'Mass-spring physics and flexible rein chains simulated with Matter.js; articulated FK/IK rig authored in Blender and exported here. 2.5D cutout artwork, not a volumetric 3D character.'})
(root/'movimento-web.json').write_text(json.dumps(result,separators=(',',':')))
print('WEB_EXPORT_OK',len(frames),'frames')
