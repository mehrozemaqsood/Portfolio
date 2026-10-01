import { chromium } from 'playwright';
const [,, slug, w='768', out='/tmp/s.png'] = process.argv;
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:+w,height:900} });
await p.goto('http://localhost:4321/'+slug,{waitUntil:'networkidle'});
const H = await p.evaluate(()=>document.documentElement.scrollHeight);
for (let y=0;y<H;y+=700){ await p.evaluate(y=>window.scrollTo(0,y),y); await p.waitForTimeout(120); }
await p.waitForTimeout(1200);
await p.evaluate(()=>window.scrollTo(0,0));
await p.screenshot({path:out,fullPage:true});
await b.close();
