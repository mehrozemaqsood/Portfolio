import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:4321/?still',{waitUntil:'networkidle'});
await p.evaluate(()=>document.querySelector('.stage-d .rec-stack').scrollIntoView({block:'center'}));
await p.waitForTimeout(600);
const r=await p.locator('.stage-d .rec-stack').boundingBox();
for(let i=0;i<2;i++){
 await p.mouse.move(r.x+200,r.y+80); await p.mouse.down(); await p.mouse.move(r.x+500,r.y+80,{steps:8}); await p.mouse.up(); await p.waitForTimeout(1200);
 console.log(i, await p.evaluate(()=>[...document.querySelectorAll('.stage-d .rec-back')].filter(e=>e.style.visibility!=='hidden').length+' backs; front='+document.querySelector('.stage-d .rec-front [data-f=n]').textContent));
}
await p.screenshot({path:'/tmp/rc.png'});
await b.close();
