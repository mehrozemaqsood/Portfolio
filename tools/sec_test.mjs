import {chromium} from 'playwright';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const pages=['','boltshift','lensesonline','stichting-sportpark','zapier','visual-design'];
let bad=0;
for(const [n,w,h] of [['d',1440,900],['t',768,900],['m',390,800]]) for(const pg of pages){
  const p=await b.newPage({viewport:{width:w,height:h}});
  const v=[],errs=[];
  p.on('console',m=>{if(m.type()==='error'&&!/_vercel|404/.test(m.text()+m.location().url))errs.push(m.text().slice(0,150)); if(/Content Security Policy|Refused to/.test(m.text()))v.push(m.text().slice(0,200))});
  p.on('pageerror',e=>errs.push('PE '+e.message.slice(0,150)));
  await p.addInitScript(()=>document.addEventListener('securitypolicyviolation',e=>console.error('CSPV '+e.violatedDirective+' '+e.blockedURI)));
  await p.goto('http://localhost:4400/'+pg);await p.waitForTimeout(1500);
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=1500){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});await p.waitForTimeout(600);
  const z=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--z'));
  const imgs=await p.evaluate(()=>{const i=[...document.images];return [i.length,i.filter(x=>x.draggable).length,i.filter(x=>x.complete&&x.naturalWidth===0&&x.offsetParent).length]});
  const hdr=await (await p.request.get('http://localhost:4400/'+pg)).headers();
  console.log(n,pg||'home','z='+(+z).toFixed(3),'imgs',imgs.join('/'),'csp-ok',!!hdr['content-security-policy'],errs.length?('ERR '+errs.join(' | ')):'', v.length?('VIOL '+v.join(' | ')):'');
  if(errs.length||v.length||imgs[1]) bad++;
  await p.close();
}
console.log('problems',bad);await b.close();
