import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'})).newPage();
await p.goto('http://localhost:4333/stichting-sportpark/',{waitUntil:'networkidle'});
await p.click('.stage-d [data-chip="old"]');
await p.evaluate(()=>{document.querySelector('.stage-d [data-viewport]').scrollTop=400});
await p.waitForTimeout(500);
await p.screenshot({path:'/tmp/old.png',fullPage:true,clip:{x:0,y:1150,width:1440,height:900}});
await b.close();
