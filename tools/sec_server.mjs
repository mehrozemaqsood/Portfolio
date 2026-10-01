import http from 'http';import fs from 'fs';import path from 'path';
const cfg=JSON.parse(fs.readFileSync('vercel.json'));const root='dist';
const mime={html:'text/html; charset=utf-8',js:'text/javascript',css:'text/css',svg:'image/svg+xml',png:'image/png',webp:'image/webp',avif:'image/avif',woff2:'font/woff2',woff:'font/woff',pdf:'application/pdf',ico:'image/x-icon',txt:'text/plain',json:'application/json'};
http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);let f=path.join(root,u);
 if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');
 if(!fs.existsSync(f)&&fs.existsSync(f+'.html'))f+='.html';
 if(!fs.existsSync(f)){r.writeHead(404);return r.end('nf')}
 const h={'Content-Type':mime[f.split('.').pop()]||'application/octet-stream'};
 for(const rule of cfg.headers){const re=new RegExp('^'+rule.source.replace('(.*)','.*')+'$');if(re.test(u))for(const x of rule.headers)h[x.key]=x.value}
 r.writeHead(200,h);fs.createReadStream(f).pipe(r)}).listen(4400);
