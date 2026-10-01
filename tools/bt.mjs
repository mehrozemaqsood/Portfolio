import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:4321/',{waitUntil:'networkidle'});
await p.screenshot({path:'/tmp/h.png',clip:{x:0,y:0,width:1440,height:120}});
await p.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));
await p.waitForTimeout(400);
await p.evaluate(()=>document.querySelector('a[href="#top"]').click());
const r=[]; for(let i=0;i<6;i++){await p.waitForTimeout(400); r.push(Math.round(await p.evaluate(()=>scrollY)));}
console.log(r.join(' '));
await b.close();
