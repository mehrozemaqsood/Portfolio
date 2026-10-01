// Motion layer: scroll reveals, custom cursor, magnetic pills. Transform/opacity/clip only,
// so every element rests exactly where Figma places it. Skipped for reduced motion or ?still.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]still\b/.test(location.search);
const root = document.documentElement;
if (!reduce) {
  root.classList.add('mo');
  const SKIP = 'a,button,header,nav,[tabindex],[data-fb],[data-nomotion],.zp,.gw,svg';
  const sel = 'h1,h2,h3,p,figure,[data-rv-card]';
  const home = location.pathname === '/';
  const nodes = [...document.querySelectorAll('.stage ' + sel.split(',').join(',.stage '))].filter((e) => !e.closest(SKIP) && !(home && e.closest('.stage > :first-child')) && !String(e.className).includes('font-utara'));
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


  // Smooth (inertial) wheel scrolling. Nested scroll areas (phone/browser mockups) keep native scrolling.
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let cur = scrollY, tgt = scrollY, run = false;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const inner = (el) => {
      for (; el && el !== document.body && el !== root; el = el.parentElement) {
        const o = getComputedStyle(el).overflowY;
        if ((o === 'auto' || o === 'scroll') && el.scrollHeight > el.clientHeight + 1) return true;
      }
      return false;
    };
    const step = () => {
      cur += (tgt - cur) * 0.085;
      if (Math.abs(tgt - cur) < 0.4) { cur = tgt; run = false; }
      scrollTo(0, cur);
      if (run) requestAnimationFrame(step);
    };
    addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.defaultPrevented || inner(e.target)) return;
      e.preventDefault();
      if (!run) { cur = tgt = scrollY; }
      tgt = Math.max(0, Math.min(max(), tgt + e.deltaY * (e.deltaMode === 1 ? 32 : 1)));
      if (!run) { run = true; requestAnimationFrame(step); }
    }, { passive: false });
    addEventListener('scroll', () => { if (!run) { cur = tgt = scrollY; } }, { passive: true });
  }

  // Cursor: small difference-blend dot that swells over links and buttons
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'mo-cur';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    root.classList.add('mo-cursor');
    let x = -50, y = -50, cx = x, cy = y, s = 16, ts = 16, raf = 0;
    const loop = () => {
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22; s += (ts - s) * 0.18;
      dot.style.width = dot.style.height = s.toFixed(2) + 'px';
      dot.style.transform = `translate3d(${(cx - s / 2).toFixed(2)}px,${(cy - s / 2).toFixed(2)}px,0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) + Math.abs(ts - s) > 0.02 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY; dot.style.opacity = '1';
      ts = e.target.closest && e.target.closest('a,button,[role=button]') ? 72 : 16;
      kick();
    }, { passive: true });
    document.addEventListener('pointerleave', () => { dot.style.opacity = '0'; });
    addEventListener('pointerdown', () => { ts = 11; kick(); });
    addEventListener('pointerup', (e) => { ts = e.target.closest && e.target.closest('a,button') ? 72 : 16; kick(); });

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
