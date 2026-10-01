import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:390,height:800}});
await p.goto('http://localhost:4321/?still');await p.waitForTimeout(800);
await p.locator('#menu-open-m').click();await p.waitForTimeout(1200);
await p.screenshot({path:'/tmp/menu.png',clip:{x:0,y:150,width:390,height:380}});await b.close();
