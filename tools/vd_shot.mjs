import { chromium } from 'playwright';
const [,, out='/tmp/vd.png'] = process.argv;
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:390,height:800} });
await p.goto('http://localhost:4321/visual-design',{waitUntil:'networkidle'});
const H = await p.evaluate(()=>document.documentElement.scrollHeight);
for (let y=0;y<H;y+=600){ await p.evaluate(y=>window.scrollTo(0,y),y); await p.waitForTimeout(150); }
await p.waitForTimeout(1500);
await p.evaluate(()=>window.scrollTo(0,0));
await p.screenshot({path:out,fullPage:true});
await b.close();
