import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [w,h,dpr,n] of [[390,844,3,'m'],[412,915,2.625,'m'],[768,1024,2,'t']]) {
  const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr}); const p=await c.newPage();
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(2200);
  await p.evaluate(()=>{document.getAnimations().forEach(a=>{try{a.pause();a.currentTime=0}catch(e){}})}); await p.waitForTimeout(400);
  const r=await p.evaluate((n)=>{const e=document.querySelector(`.stage-${n} .ms-vp`).getBoundingClientRect();return [e.right,e.bottom]},n);
  await p.screenshot({path:`/tmp/lm_${n}_${w}.png`,clip:{x:r[0]-50,y:r[1]-60,width:70,height:80}});
  await c.close();
}
await b.close();
