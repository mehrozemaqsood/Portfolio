import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [w,h,n] of [[768,1024,'t'],[390,844,'m'],[1440,900,'d']]) {
  const p = await (await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2})).newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://localhost:4321/');
  await p.waitForTimeout(1000);
  await p.screenshot({path:`/tmp/h${n}_0.png`,clip:{x:0,y:0,width:w,height:n=='d'?790:460}});
  await p.waitForTimeout(9000);
  const r=await p.evaluate(()=>[...document.querySelectorAll('.ms')].map(e=>[e.dataset.stage,!!e.offsetParent,e.querySelector('.ms-sc').children.length,new DOMMatrix(getComputedStyle(e.querySelector('.ms-sc')).transform).m42|0]));
  console.log(n,JSON.stringify(r),errs.join('|'));
  await p.screenshot({path:`/tmp/h${n}_1.png`,clip:{x:0,y:0,width:w,height:n=='d'?790:460}});
  await p.close();
}
await b.close();
