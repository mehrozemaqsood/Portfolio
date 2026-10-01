import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(800);
await p.evaluate(()=>document.getElementById('services').scrollIntoView()); await p.waitForTimeout(1000);
const r=p.locator('#services .svc-row').nth(2); await r.scrollIntoViewIfNeeded(); const bb=await r.boundingBox();
await p.mouse.move(bb.x+300,bb.y+40,{steps:6}); await p.waitForTimeout(1200);
await p.screenshot({path:'/tmp/svc3.png'});
await b.close();
