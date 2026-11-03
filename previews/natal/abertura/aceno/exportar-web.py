"""blender -b papai-noel-acenando.blend --python exportar-web.py"""
import bpy,json,math
from pathlib import Path
R=Path(__file__).resolve().parent;scene=bpy.context.scene
rig=next(o for o in scene.objects if o.type=='ARMATURE');frames=[]
for frame in range(scene.frame_start,scene.frame_end+1):
 scene.frame_set(frame);pose={name:round(-math.degrees(rig.pose.bones[name].rotation_euler.z),4) for name in ['body','head','upper','forearm','hat','pompom']};pose['y']=round(-rig.location.y,4)
 if not all(math.isfinite(v) for v in pose.values()):raise ValueError('Invalid pose')
 frames.append(pose)
(R/'aceno.json').write_text(json.dumps({'authoring':'Blender '+bpy.app.version_string,'fps':scene.render.fps,'duration':(scene.frame_end-scene.frame_start)/scene.render.fps,'frames':frames},separators=(',',':')))
print('WAVE_EXPORT_OK',len(frames),'frames')
