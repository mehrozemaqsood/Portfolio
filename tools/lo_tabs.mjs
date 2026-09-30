import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await b.newPage({ viewport:{width:1440,height:900}, deviceScaleFactor:1 });
await p.goto('http://localhost:4321/lensesonline',{waitUntil:'networkidle'});
const box = await p.locator('.stage-d [data-lo-tabs]').first();
await box.scrollIntoViewIfNeeded();
for (const [i,n] of [[2,'product'],[3,'calc']]) {
  await p.locator(`.stage-d [data-tab="${i}"]`).first().click();
  await p.waitForTimeout(900);
  await box.screenshot({path:`/tmp/lo_${n}.png`});
}
await p.goto('http://localhost:4321/boltshift',{waitUntil:'networkidle'});
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}});
await p.waitForTimeout(500);
const sec = p.locator('.stage-d section[aria-label*="prototype" i], .stage-d section[aria-label*="Native" i]').first();
await sec.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
await p.screenshot({path:'/tmp/bolt_proto.png'});
await b.close();
