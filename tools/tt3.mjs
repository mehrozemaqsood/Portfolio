import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:768,height:900}});
await p.goto('http://localhost:4321/?still');await p.waitForTimeout(800);
const s=p.locator('section:has(.rec-stack):visible').first();await s.scrollIntoViewIfNeeded();await p.waitForTimeout(600);
await s.screenshot({path:'/tmp/tsec.png'});await b.close();
