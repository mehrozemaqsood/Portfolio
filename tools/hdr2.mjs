import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const pg of ['boltshift','lensesonline','zapier','stichting-sportpark','visual-design'])
for (const [n,w] of [['d',1440],['t',768],['m',390]]){
  const p=await b.newPage({viewport:{width:w,height:300}});
  await p.goto(`http://localhost:4321/${pg}?still`);await p.waitForTimeout(500);
  const r=await p.evaluate(()=>{const hs=[...document.querySelectorAll('header')].filter(h=>h.offsetParent);const h=hs[0];if(!h)return 'nohdr';const vis=[...h.querySelectorAll('a')].filter(a=>a.offsetParent&&/CV|Connect/.test(a.textContent)).map(a=>a.textContent.trim().replace(/\s+/g,' ')+'@'+Math.round(a.getBoundingClientRect().left)+'-'+Math.round(a.getBoundingClientRect().right));return r=vis.join(' | ')+' vw'+innerWidth});
  console.log(pg,n,r);
  if(pg==='zapier'||pg==='visual-design'||pg==='boltshift') await p.screenshot({path:`/tmp/h_${pg}_${n}.png`,clip:{x:0,y:0,width:w,height:100}});
  await p.close();
}
await b.close();
