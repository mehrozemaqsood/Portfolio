import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:4321/',{waitUntil:'networkidle'});
console.log(await p.evaluate(()=>{const a=document.querySelector('footer a[href="#about"]');const s=getComputedStyle(a);return [s.color,s.fontWeight,s.fontFamily,s.opacity]}));
await b.close();
