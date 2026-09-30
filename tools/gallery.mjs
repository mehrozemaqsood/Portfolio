import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:1 });
await p.goto('http://localhost:4321/',{waitUntil:'networkidle'});
const top = await p.evaluate(()=>document.querySelector('#more-work')?.getBoundingClientRect().top+scrollY);
console.log('top',top);
for (const y of [top-600, top-300, top, top+300]) { await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(1200);
 await p.screenshot({path:`/tmp/g_${Math.round(y)}.png`}); }
await b.close();
