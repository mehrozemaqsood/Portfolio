import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [n,w,h] of [['d',1440,900],['t',768,900],['m',390,800]]){
  const p=await b.newPage({viewport:{width:w,height:h}});
  await p.goto('http://localhost:4321/?still');await p.waitForTimeout(1000);
  const a=p.locator('a[href="/visual-design"].project-card:visible').first();
  await a.scrollIntoViewIfNeeded();await p.waitForTimeout(1800);
  console.log(n,await a.boundingBox());
  await a.screenshot({path:`/tmp/vdc_${n}.png`});
  const sec=n==='d'?'#work':n==='t'?'#work-t':'#work-m';
  console.log(n,'section h',await p.locator(sec).evaluate(e=>e.getBoundingClientRect().height));
  await p.close();
}
await b.close();
