import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:4321/lensesonline?still',{waitUntil:'networkidle'});
await p.evaluate(()=>document.querySelector('[data-mtabs]').scrollIntoView({block:'center'}));
await p.waitForTimeout(500);
await p.click('[data-mt="2"]'); await p.waitForTimeout(400);
await p.screenshot({path:'/tmp/lt.png'});
await b.close();
