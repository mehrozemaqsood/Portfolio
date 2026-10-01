import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(500);
let k=0; for (const t of [0,4500,9000]) { await p.evaluate((t)=>document.querySelectorAll('.hw').forEach(e=>e.getAnimations().forEach(a=>{a.pause();a.currentTime=t})),t); await p.waitForTimeout(300); await p.screenshot({path:`/tmp/wv_${k++}.png`,clip:{x:0,y:0,width:1440,height:790}}); }
await b.close();
