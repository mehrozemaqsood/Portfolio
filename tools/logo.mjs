import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1440,height:300},deviceScaleFactor:6});
await p.goto('http://localhost:4321/zapier?still');await p.waitForTimeout(500);
await p.screenshot({path:'/tmp/logo_real.png',clip:{x:70,y:20,width:70,height:50}});await b.close();
