import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:390,height:800}});
await p.goto('http://localhost:4321/?still');await p.waitForTimeout(1200);
const s=p.locator('#about-m');await s.scrollIntoViewIfNeeded();await p.waitForTimeout(1500);
await s.screenshot({path:'/tmp/abm.png'});await b.close();
