import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [w,h,dpr] of [[1440,900,1],[1707,960,1.5],[1920,1080,1],[1536,864,1.25]]) {
  const p = await (await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr})).newPage();
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(7500);
  const r=await p.evaluate(()=>{const e=document.querySelector('.stage-d .ms').getBoundingClientRect();return [e.x,e.y,e.width,e.height]});
  await p.screenshot({path:`/tmp/w_${w}.png`,clip:{x:r[0]-30,y:r[1]-20,width:r[2]+60,height:380*(r[2]/556)}});
  console.log(w,r);
  await p.close();
}
await b.close();
