import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const run = async (rm, label) => {
  const c = await b.newContext({viewport:{width:1440,height:900}, reducedMotion: rm?'reduce':'no-preference'});
  const p = await c.newPage();
  await p.addInitScript(()=>{window.__cls=0;new PerformanceObserver(l=>{for(const e of l.getEntries()) if(!e.hadRecentInput) window.__cls+=e.value}).observe({type:'layout-shift',buffered:true})});
  await p.goto('http://localhost:4321/');
  await p.waitForTimeout(3000);
  const r = await p.evaluate(()=>{const s=document.querySelector('.ms-sc');return {t:s?getComputedStyle(s).transform:null,anims:s?s.getAnimations().length:-1,cls:window.__cls,sw:document.documentElement.scrollWidth,iw:innerWidth,op:document.querySelector('.ms-vp')&&getComputedStyle(document.querySelector('.ms-vp')).opacity}});
  console.log(label, JSON.stringify(r));
  if(!rm){await p.reload();await p.waitForTimeout(800);const t0=await p.evaluate(()=>getComputedStyle(document.querySelector('.ms-sc')).transform);await p.waitForTimeout(2500);const t1=await p.evaluate(()=>getComputedStyle(document.querySelector('.ms-sc')).transform);console.log('refresh: at0.8s',t0,'at3.3s',t1)}
  await c.close();
};
await run(true,'reduced'); await run(false,'normal'); await b.close();
