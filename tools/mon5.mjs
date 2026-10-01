import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:4321/');
await p.waitForTimeout(1500);
for (let i=0;i<30;i++){ await p.waitForTimeout(1000); await p.screenshot({path:`/tmp/s_${i}.png`,clip:{x:380,y:225,width:600,height:130}}); }
await b.close();
