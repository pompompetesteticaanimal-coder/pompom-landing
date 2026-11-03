import bpy,numpy as np,json
from pathlib import Path
root=Path(__file__).resolve().parent
im=bpy.data.images.load(str(root/'papai-noel-atlas.png'));w,h=im.size
pixels=np.array(im.pixels[:],dtype=np.float32).reshape(h,w,4)[::-1]
names=['sled','body','head','upper','wave','hat','pompom','lantern'];out={}
for i,name in enumerate(names):
 x0=round((i%4)*w/4);x1=round((i%4+1)*w/4);y0=round((i//4)*h/2);y1=round((i//4+1)*h/2)
 yy,xx=np.where(pixels[y0:y1,x0:x1,3]>.90)
 if not len(xx):raise RuntimeError(name+' missing')
 out[name]={'x':int(x0+xx.min()),'y':int(y0+yy.min()),'w':int(xx.max()-xx.min()+1),'h':int(yy.max()-yy.min()+1)}
(root/'atlas.json').write_text(json.dumps({'width':w,'height':h,'parts':out},indent=2))
print('ATLAS_BOUNDS',out)
