import { chromium } from 'playwright';
import fs from 'fs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [w,h,dpr] of [[1440,900,1],[1440,900,2],[1707,960,1.5],[1536,864,1.25],[1920,1080,1],[2560,1300,1]]) {
  const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr}); const p=await c.newPage();
  await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const e=document.querySelector('.stage-d .ms-vp').getBoundingClientRect();return [e.left,e.top,e.right,e.bottom]});
  const clip={x:r[2]-40,y:r[3]-70,width:60,height:90};
  await p.screenshot({path:`/tmp/lk_s_${w}_${dpr}.png`,clip});
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1900);
  await p.evaluate(()=>{document.getAnimations().forEach(a=>{try{a.pause();a.currentTime=0}catch(e){}})});
  await p.waitForTimeout(400);
  await p.screenshot({path:`/tmp/lk_a_${w}_${dpr}.png`,clip});
  await c.close();
}
await b.close();
