import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();
await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(900); await p.screenshot({path:'/tmp/mb1.png'});
await p.evaluate(()=>scrollTo(0,2600)); await p.waitForTimeout(700); await p.screenshot({path:'/tmp/mb2.png'});
await b.close();
