import { chromium } from 'playwright';
const [,, w='390', sel='.stage-m'] = process.argv;
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:+w,height:900}})).newPage();
await p.goto('http://localhost:4321/',{waitUntil:'networkidle'});
const r = await p.evaluate((sel)=>{const m=document.querySelector(sel);let y0=m.getBoundingClientRect().top+scrollY;return [...m.children].map(c=>{const r=c.getBoundingClientRect();return [c.id||c.className.toString().slice(0,30),+(r.top+scrollY-y0).toFixed(1),+r.height.toFixed(1)]})},sel);
console.log(r.map(x=>x.join('\t')).join('\n'));
await b.close();
