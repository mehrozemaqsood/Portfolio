import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const w of [390,360,430]) { const p = await (await b.newContext({viewport:{width:w,height:844},deviceScaleFactor:2})).newPage();
await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(800); await p.screenshot({path:`/tmp/hm_${w}.png`,clip:{x:0,y:0,width:w,height:120}}); }
await b.close();
