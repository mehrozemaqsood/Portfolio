import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const clip={x:340,y:220,width:700,height:520};
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:4321/?still',{waitUntil:'networkidle'}); await p.waitForTimeout(800);
await p.screenshot({path:'/tmp/m_still.png',clip});
const q = await b.newPage({ viewport:{width:1440,height:900} });
const t0=Date.now();
await q.goto('http://localhost:4321/',{waitUntil:'load'});
const shots=[[1000,'a'],[2400,'b'],[6000,'c'],[12000,'d'],[19000,'e'],[30000,'f']];
for(const [t,n] of shots){ const w=t-(Date.now()-t0); if(w>0) await q.waitForTimeout(w); await q.screenshot({path:`/tmp/m_${n}.png`,clip}); console.log(n,Date.now()-t0, await q.evaluate(()=>getComputedStyle(document.querySelector('.stage-d .ms-sc')).transform)); }
console.log('scrollbars', await q.evaluate(()=>[document.documentElement.scrollWidth, innerWidth]));
await b.close();
