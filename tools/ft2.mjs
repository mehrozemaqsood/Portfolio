import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [w,h,n] of [[390,844,'m'],[768,1024,'t']]) {
  const p = await (await b.newContext({viewport:{width:w,height:h}})).newPage();
  await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(800);
  const f=p.locator(`.stage-${n} footer`); await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  await f.screenshot({path:`/tmp/f_${n}.png`});
  const r=await p.evaluate((n)=>{const f=document.querySelector(`.stage-${n} footer`);return [f.scrollHeight,f.clientHeight]},n); console.log(n,r);
}
await b.close();
