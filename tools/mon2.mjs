import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const clip={x:340,y:220,width:700,height:520};
const q = await b.newPage({ viewport:{width:1440,height:900} });
await q.goto('http://localhost:4321/',{waitUntil:'load'}); await q.waitForTimeout(2500);
await q.evaluate(()=>{document.querySelector('.stage-d .ms-sc').getAnimations().forEach(a=>{a.pause();a.currentTime=0});});
await q.waitForTimeout(1200);
await q.screenshot({path:'/tmp/m_zero.png',clip});
await b.close();
