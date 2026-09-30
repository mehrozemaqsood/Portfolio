import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'reduce' });
await p.goto('http://localhost:4321/lensesonline',{waitUntil:'networkidle'});
await p.addStyleTag({content:'[data-fb]{display:none!important}'});
await p.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,100))}scrollTo(0,0)});
await p.waitForTimeout(1500);
for (const [n,l] of [['05','Mobile experience'],['06','Power calculator'],['07','Every page'],['08','Overlays and states'],['09','Components'],['10','Outcomes'],['11','FOOTER']]) {
  const el = l==='FOOTER' ? p.locator('.stage-d footer').last() : p.locator(`.stage-d section[aria-label="${l}"]`).first();
  await el.screenshot({path:`/tmp/lo_s${n}.png`});
}
await b.close();
