import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for (const [w,h,path] of [[768,1024,'/'],[768,1024,'/boltshift'],[768,1024,'/lensesonline'],[1440,900,'/zapier'],[1440,900,'/visual-design'],[1440,900,'/stichting-sportpark'],[1440,900,'/lensesonline']]) {
  const p = await (await b.newContext({viewport:{width:w,height:h}})).newPage();
  await p.goto('http://localhost:4321'+path,{waitUntil:'load'}); await p.waitForTimeout(1200);
  const r=await p.evaluate(()=>{const n=[...document.querySelectorAll('nav')].find(n=>n.offsetParent&&/BoltShift/.test(n.textContent));if(!n)return 'none';const b=n.getBoundingClientRect();const nx=n.parentElement.querySelectorAll('a[href*="CV"], a[href*="linkedin"]')[0]?.getBoundingClientRect();return [Math.round(b.x),Math.round(b.right),nx&&Math.round(nx.x), n.textContent.trim().replace(/\s+/g,' ')]});
  console.log(w,path,JSON.stringify(r)); await p.close();
}
await b.close();
