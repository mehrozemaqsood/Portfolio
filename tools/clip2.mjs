import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:390,height:800} });
await p.goto('http://localhost:4321/?still',{waitUntil:'networkidle'});
const y = await p.evaluate(()=>{const e=document.querySelector('.stage-m .rec-stack');return e.getBoundingClientRect().top+scrollY-300});
await p.evaluate(y=>window.scrollTo(0,y),y); await p.waitForTimeout(600);
await p.screenshot({path:'/tmp/rm.png'});
await b.close();
