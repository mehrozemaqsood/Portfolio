import json,re,sys
f,maxd=sys.argv[1],int(sys.argv[2])
t=json.load(open(f))[0]['text']
d=-1
for l in t.split('\n'):
    m=re.match(r'(\s*)<(\w[\w-]*) id="([\d:;]+)" name="([^"]*)" x="([-\d.e]+)" y="([-\d.e]+)" width="([\d.e+-]+)" height="([\d.e+-]+)"',l)
    if m:
        dep=len(m.group(1))//2
        if dep<=maxd and m.group(2)!='vector' and 'Rectangle' not in m.group(4):
            print('  '*dep+f'{m.group(2)} {m.group(3)} "{m.group(4)[:45]}" y={float(m.group(6)):.1f} h={float(m.group(8)):.1f} x={float(m.group(5)):.0f} w={float(m.group(7)):.0f}')
