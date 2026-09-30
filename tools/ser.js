const EX=new Set("__IDS__".split(","));
const R=v=>Math.round(v*100)/100;
const hx=c=>{const f=v=>Math.round(v*255).toString(16).padStart(2,"0");return "#"+f(c.r)+f(c.g)+f(c.b)};
const paint=p=>{
  if(p.visible===false)return null;
  if(p.type==="SOLID")return {k:"s",c:hx(p.color),o:p.opacity!==undefined&&p.opacity!==1?R(p.opacity):undefined};
  if(p.type.startsWith("GRADIENT")){const t=p.gradientTransform;return {k:p.type==="GRADIENT_LINEAR"?"gl":p.type==="GRADIENT_RADIAL"?"gr":"go",t:t.map(r=>r.map(v=>R(v*1000)/1000)),st:p.gradientStops.map(s=>[hx(s.color),R(s.color.a*(p.opacity===undefined?1:p.opacity)),R(s.position*1000)/1000]),o:undefined}}
  if(p.type==="IMAGE")return {k:"i",m:p.scaleMode,o:p.opacity!==undefined&&p.opacity!==1?R(p.opacity):undefined};
  return null;
};
const fl=a=>{if(a===figma.mixed||!a)return undefined;const r=a.map(paint).filter(Boolean);return r.length?r:undefined};
const eff=n=>{const r=[];for(const e of n.effects||[]){if(e.visible===false)continue;
  if(e.type==="DROP_SHADOW"||e.type==="INNER_SHADOW")r.push({k:e.type==="DROP_SHADOW"?"d":"n",c:hx(e.color),a:R(e.color.a),x:e.offset.x,y:e.offset.y,b:e.radius,s:e.spread||0});
  else if(e.type==="LAYER_BLUR")r.push({k:"lb",b:e.radius});else if(e.type==="BACKGROUND_BLUR")r.push({k:"bb",b:e.radius});}
  return r.length?r:undefined};
const out=(o,k,v)=>{if(v!==undefined&&v!==null&&v!==0&&v!==false&&!(Array.isArray(v)&&!v.length))o[k]=v};
async function ser(n,parent){
  if(n.visible===false)return null;
  const o={t:n.type[0]+(n.type==="TEXT"?"":n.type[1]),n:(n.name||"").slice(0,24),x:R(n.x),y:R(n.y),w:R(n.width),h:R(n.height)};
  if(n.type==="TEXT")o.t="T";else if(n.type==="FRAME"||n.type==="COMPONENT"||n.type==="INSTANCE"||n.type==="GROUP"||n.type==="SECTION")o.t=n.type==="GROUP"?"G":"F";
  else if(n.type==="RECTANGLE")o.t="R";else if(n.type==="ELLIPSE")o.t="E";else o.t="V";
  if(EX.has(n.id)){o.id=n.id;o.ex=1}
  out(o,"rot",R(n.rotation||0));
  if(n.opacity!==undefined&&n.opacity!==1)o.op=R(n.opacity);
  if(n.blendMode&&n.blendMode!=="NORMAL"&&n.blendMode!=="PASS_THROUGH")o.bm=n.blendMode;
  if(parent&&parent.layoutMode&&parent.layoutMode!=="NONE"){
    if(n.layoutPositioning==="ABSOLUTE")o.abs=1;
    if(n.layoutGrow)o.gr=n.layoutGrow;
    if(n.layoutAlign==="STRETCH")o.st=1;
  }
  const c=n.constraints;if(c&&parent&&(!parent.layoutMode||parent.layoutMode==="NONE"||n.layoutPositioning==="ABSOLUTE"))o.cn=[c.horizontal[0],c.vertical[0]];
  if("fills" in n){const f=fl(n.fills);if(f)o.f=f}
  if("strokes" in n){const s=fl(n.strokes);if(s){o.sk=s;const w=n.strokeWeight;o.sw=w===figma.mixed?[n.strokeTopWeight,n.strokeRightWeight,n.strokeBottomWeight,n.strokeLeftWeight]:w;o.sa=n.strokeAlign[0];if(n.dashPattern&&n.dashPattern.length)o.da=n.dashPattern}}
  if("cornerRadius" in n){const r=n.cornerRadius;if(r===figma.mixed)o.r=[n.topLeftRadius,n.topRightRadius,n.bottomRightRadius,n.bottomLeftRadius];else if(r)o.r=r}
  const e=eff(n);if(e)o.e=e;
  if(n.clipsContent&&(n.type==="FRAME"||n.type==="COMPONENT"||n.type==="INSTANCE"))o.cl=1;
  if(n.isMask)o.mk=1;
  if(n.layoutMode&&n.layoutMode!=="NONE"){o.L=n.layoutMode[0];o.g=n.itemSpacing;o.p=[n.paddingTop,n.paddingRight,n.paddingBottom,n.paddingLeft];
    o.pa=n.primaryAxisAlignItems[0]+(n.primaryAxisAlignItems==="SPACE_BETWEEN"?"B":"");o.ca=n.counterAxisAlignItems[0];
    o.ps=n.primaryAxisSizingMode[0];o.cs=n.counterAxisSizingMode[0];if(n.layoutWrap==="WRAP")o.wr=1;}
  if(n.type==="TEXT"){
    const segs=n.getStyledTextSegments(["fontName","fontSize","fills","lineHeight","letterSpacing","textCase","textDecoration","textStyleId"]);
    o.tx=segs.map(s=>{const lh=s.lineHeight,ls=s.letterSpacing;const f=fl(s.fills);return {s:s.characters,ff:s.fontName.family,fs:s.fontName.style,z:s.fontSize,lh:lh.unit==="AUTO"?undefined:(lh.unit==="PIXELS"?lh.value:lh.value+"%"),ls:ls.value?(ls.unit==="PIXELS"?ls.value:ls.value+"%"):undefined,c:f&&f[0].k==="s"?f[0].c:undefined,co:f&&f[0].o,cf:f&&f[0].k!=="s"?f:undefined,tc:s.textCase!=="ORIGINAL"?s.textCase[0]:undefined,td:s.textDecoration!=="NONE"?s.textDecoration[0]:undefined}});
    o.ta=n.textAlignHorizontal[0];o.tv=n.textAlignVertical[0];o.ar=n.textAutoResize[0];
    if(n.maxLines)o.ml=n.maxLines;
    delete o.f;
  }
  if(o.t==="V"){try{o.svg=await n.exportAsync({format:"SVG_STRING",svgIdAttribute:false,svgOutlineText:false})}catch(e){o.err=1}}
  if(!o.ex&&"children" in n&&o.t!=="V"){const k=[];for(const ch of n.children){const s=await ser(ch,n);if(s)k.push(s)}if(k.length)o.k=k}
  return o;
}
const node=await figma.getNodeByIdAsync("__NODE__");
const res=await ser(node,null);
const js=JSON.stringify(res);
return {len:js.length,nodes:(js.match(/"t":/g)||[]).length,svg:(js.match(/"svg"/g)||[]).length};
