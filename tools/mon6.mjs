import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p = await (await b.newContext({viewport:{width:1440,height:900}})).newPage();
await p.goto('http://localhost:4321/?still'); await p.waitForTimeout(1500);
await p.screenshot({path:'/tmp/st.png',clip:{x:690,y:295,width:80,height:50}});
await p.goto('http://localhost:4321/'); await p.waitForTimeout(9000);
await p.screenshot({path:'/tmp/an.png',clip:{x:690,y:295,width:80,height:50}});
await b.close();
