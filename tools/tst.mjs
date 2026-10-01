import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [n,w,h] of [['d',1440,900],['m',390,800]]){
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});
  await p.goto('http://localhost:4321/?still');await p.waitForTimeout(800);
  const st=p.locator('.rec-stack:visible').first();await st.scrollIntoViewIfNeeded();await p.waitForTimeout(500);
  const box=await st.boundingBox();
  for(let i=0;i<5;i++){
    await p.screenshot({path:`/tmp/t_${n}_${i}.png`,clip:{x:Math.max(0,box.x-40),y:box.y-60,width:Math.min(w,box.width+80),height:box.height+90}});
    const x=box.x+box.width/2,y=box.y+box.height/2;
    await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+200,y,{steps:8});await p.mouse.up();await p.waitForTimeout(900);
  }
  await p.close();
}
await b.close();
