import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(500);
for (const [t,n] of [[0,'a'],[8000,'b']]) { await p.evaluate((t)=>document.querySelectorAll('.hero-breathe').forEach(e=>e.getAnimations().forEach(a=>{a.pause();a.currentTime=t})),t); await p.waitForTimeout(300); await p.screenshot({path:`/tmp/br_${n}.png`,clip:{x:0,y:0,width:1440,height:790}}); }
await b.close();
