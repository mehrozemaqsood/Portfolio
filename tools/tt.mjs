import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:700,height:900}});
await p.goto('http://localhost:4321/?still');await p.waitForTimeout(800);
const st=p.locator('.rec-stack:visible').first();await st.scrollIntoViewIfNeeded();await p.waitForTimeout(500);
const bx=await st.boundingBox();console.log(bx);
await p.screenshot({path:'/tmp/tt0.png',clip:{x:0,y:bx.y-70,width:700,height:bx.height+110}});
const x=bx.x+bx.width/2,y=bx.y+bx.height/2;
for(let i=0;i<2;i++){await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+260,y,{steps:8});await p.mouse.up();await p.waitForTimeout(900);}
await p.screenshot({path:'/tmp/tt2.png',clip:{x:0,y:bx.y-70,width:700,height:bx.height+110}});
await b.close();
