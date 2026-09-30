import sys
from PIL import Image
import numpy as np
a=Image.open(sys.argv[1]).convert('RGB');b=Image.open(sys.argv[2]).convert('RGB')
y0=int(sys.argv[3]) if len(sys.argv)>3 else 0
y1=int(sys.argv[4]) if len(sys.argv)>4 else min(a.size[1],b.size[1])
A=np.array(a)[y0:y1].astype(int);B=np.array(b)[y0:y1].astype(int)
h=min(len(A),len(B));d=np.abs(A[:h]-B[:h]).max(-1)
print(a.size,b.size)
for y in range(0,h,100):print(y0+y,round(d[y:y+100].mean(),1),round((d[y:y+100]>40).mean()*100,1))
Image.fromarray((d*3).clip(0,255).astype('uint8')).save('/tmp/cmpdiff.png')
