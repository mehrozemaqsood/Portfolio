import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:4321/');
const out=[];
for (let s=2;s<=90;s+=4){ await p.waitForTimeout(s===2?2000:4000); out.push(s+':'+Math.round(await p.evaluate(()=>new DOMMatrix(getComputedStyle(document.querySelector('.ms-sc')).transform).m42))); }
console.log(out.join(' '));
await p.screenshot({path:'/tmp/final.png',clip:{x:380,y:225,width:600,height:370}});
await b.close();
