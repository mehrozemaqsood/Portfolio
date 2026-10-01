// Motion layer: scroll reveals, custom cursor, magnetic pills. Transform/opacity/clip only,
// so every element rests exactly where Figma places it. Skipped for reduced motion or ?still.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]still\b/.test(location.search);
const root = document.documentElement;
if (!reduce) {
  root.classList.add('mo');
  const SKIP = 'a,button,header,nav,[tabindex],[data-fb],[data-nomotion],.zp,.gw,svg';
  const sel = 'h1,h2,h3,p,figure,[data-rv-card]';
  const nodes = [...document.querySelectorAll('.stage ' + sel.split(',').join(',.stage '))].filter((e) => !e.closest(SKIP) && !(e.matches('p') && e.getAttribute('aria-hidden') === 'true' && false));
  const big = (e) => e.matches('h1,h2') || (e.matches('p') && e.className.includes('font-utara'));
  nodes.forEach((e) => {
    e.setAttribute('data-rv', e.matches('figure') ? 'img' : big(e) ? 'big' : 'txt');
  });
  // Scroll-position check instead of IntersectionObserver: IO reports 0 for elements that are
  // translated outside an overflow-clip parent, which would leave them hidden forever.
  let pending = nodes.slice(), tick = false;
  const check = () => {
    tick = false;
    const vh = innerHeight, hit = [];
    pending = pending.filter((e) => {
      if (!e.isConnected) return false;
      if (e.offsetParent === null && getComputedStyle(e).position !== 'fixed') return true; // other breakpoint's stage
      const r = e.getBoundingClientRect();
      if (r.top < vh * 0.93) { hit.push([r.top, e]); return false; }
      return true;
    });
    hit.sort((x, y) => x[0] - y[0]).forEach(([t, e], i) => {
      const d = t > vh || t < 0 ? 0 : Math.min(i, 6) * 90;
      e.style.setProperty('--rv-d', d + 'ms');
      requestAnimationFrame(() => e.classList.add('in'));
      setTimeout(() => { e.removeAttribute('data-rv'); e.classList.remove('in'); e.style.removeProperty('--rv-d'); }, 1700 + d);
    });
  };
  const req = () => { if (!tick) { tick = true; requestAnimationFrame(check); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  req();

  // Cursor: small difference-blend dot that swells over links and buttons
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'mo-cur';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    root.classList.add('mo-cursor');
    let x = -50, y = -50, cx = x, cy = y, s = 1, ts = 1, raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22; s += (ts - s) * 0.18;
      dot.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%) scale(${s})`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) + Math.abs(ts - s) > 0.02 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY; dot.style.opacity = '1';
      ts = e.target.closest && e.target.closest('a,button,[role=button]') ? 4.2 : 1;
      kick();
    }, { passive: true });
    document.addEventListener('pointerleave', () => { dot.style.opacity = '0'; });
    addEventListener('pointerdown', () => { ts = 0.7; kick(); });
    addEventListener('pointerup', (e) => { ts = e.target.closest && e.target.closest('a,button') ? 4.2 : 1; kick(); });

    // Magnetic pill buttons
    document.querySelectorAll('.stage a[class*="rounded-[46px]"],[data-fb] a,[data-fb] button').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px ${((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px`;
      });
      b.addEventListener('pointerleave', () => { b.style.translate = ''; });
    });
  }
}
