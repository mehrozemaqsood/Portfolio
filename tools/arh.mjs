import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('http://localhost:4321/?still');await p.waitForTimeout(1500);
const a=p.locator('a[href="/Mehroze_UIUX_CV.pdf"]').first();
await a.hover();await p.waitForTimeout(600);
console.log(await a.locator('path').first().evaluate(e=>getComputedStyle(e).stroke));
await a.screenshot({path:'/tmp/arh.png'});await b.close();
