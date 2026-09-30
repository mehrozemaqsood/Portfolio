import sharp from 'sharp'; import fs from 'fs'; import path from 'path';
const man=JSON.parse(fs.readFileSync('src/assets/manifest.json'));
const out='public/img'; fs.mkdirSync(out,{recursive:true});
const widths=[400,800,1200,1600]; let inKB=0,outKB=0; const res={};
sharp.concurrency(4);for(const m of man){
  const id=m.file.replace(/\.(jpg|png)$/,''); res[id]={w:m.w,h:m.h,variants:[]};
  const src='src/assets/raw/'+m.file; inKB+=m.kb; if(fs.existsSync(out+'/'+id+'-'+m.w+'.webp')&&m.w<=1600){}
  for(const w of widths.filter(w=>w<=m.w).concat(m.w<=400||!widths.includes(m.w)&&m.w<1600?[m.w]:[])){
    const uniq=[...new Set([w])][0];
    for(const [ext,opt] of [['avif',{quality:55,effort:2}],['webp',{quality:80}]]){
      const f=`${out}/${id}-${uniq}.${ext}`;
      const info=await sharp(src).resize({width:uniq,withoutEnlargement:true})[ext](opt).toFile(f);
      outKB+=info.size/1024; }
    res[id].variants.push(uniq);
  }
  const b=await sharp(src).resize(16).blur().webp({quality:40}).toBuffer();
  res[id].blur='data:image/webp;base64,'+b.toString('base64');
}
fs.writeFileSync('src/assets/images.json',JSON.stringify(res));
console.log('source MB',(inKB/1024).toFixed(1),'output MB (all variants)',(outKB/1024).toFixed(1));
