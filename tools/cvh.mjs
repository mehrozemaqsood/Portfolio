import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:2})).newPage();
await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(800);
const a=p.locator('.stage-d header a',{hasText:'View CV'}); const bb=await a.boundingBox();
await p.mouse.move(bb.x+20,bb.y+20,{steps:5}); await p.waitForTimeout(700);
await p.screenshot({path:'/tmp/cvh.png',clip:{x:bb.x-30,y:bb.y-20,width:bb.width+60,height:bb.height+40}});
await b.close();
