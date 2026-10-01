import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:390,height:800},deviceScaleFactor:2});
await p.goto('http://localhost:4321/?still');await p.waitForTimeout(1200);
const s=p.locator('section:has(.rec-stack):visible').first();await s.scrollIntoViewIfNeeded();await p.waitForTimeout(800);
console.log(await s.evaluate(e=>[...e.querySelectorAll('p')].slice(0,5).map(x=>{const r=x.getBoundingClientRect();return x.textContent+' '+r.left.toFixed(1)+'-'+r.right.toFixed(1)})));
await s.screenshot({path:'/tmp/recm.png'});await b.close();
