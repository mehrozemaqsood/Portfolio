import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:4321/');
for (const t of [1000,3500,8000]) { await p.waitForTimeout(t===1000?1000:t-(t===3500?1000:3500)); await p.screenshot({path:`/tmp/h_${t}.png`,clip:{x:380,y:225,width:600,height:500}}); }
await b.close();
