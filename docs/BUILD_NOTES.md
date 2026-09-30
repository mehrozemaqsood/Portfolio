# Build notes — Figma → Astro (design fidelity is THE requirement)

Figma file key `VuIKSUi6sX65cplSt05nCF`, page "Final Design". Figma is the single source of truth.
Never redesign, simplify or "improve". Every pixel, font, colour, radius, shadow, gradient, blur, image crop, and text string must match.
Stack: Astro (static) + Tailwind v4 (build-time only, zero runtime) + sharp-optimised images. Only tiny vanilla scripts in `<script>` tags; no frameworks.

## Frames (each page has 3 Figma frames)
| page | desktop 1440 | tablet 768 | mobile 390 |
|---|---|---|---|
| home (`/`) | 24:38980 | 398:1725 | 398:2135 (+ mobile menu 399:3108) |
| /boltshift | 124:1195 | 402:1930 | 401:2950 |
| /lensesonline | 124:1584 | 403:2649 | 403:2041 |
| /stichting-sportpark | 124:1799 | 406:2211 | 406:2712 |
| /zapier | 137:2373 | 406:3577 | 406:4068 |
| /visual-design | 325:1669 | 407:2345 | 407:2706 |
(verify width of each frame with use_figma; if a tablet/mobile id is swapped, use the one with the right width.)

## Page structure
`src/pages/<slug>.astro` renders `<main class="stage stage-d">`, `stage-t`, `stage-m` containing components
`src/components/<slug>/{Desktop,Tablet,Mobile}.astro`. CSS in `src/styles/global.css` shows exactly one stage per viewport
(≥1024 desktop 1440-wide, 600–1023 tablet 768-wide, <600 mobile 390-wide) and scales it uniformly with `zoom: var(--z)`. So inside each component
you write the Figma frame 1:1 in px (Tailwind arbitrary values like `w-[1200px]`, `top-[372px]`), exactly like `src/components/home/*D.astro` (read `HeroD.astro`, `WorksD.astro`, `ServicesD.astro`, `CtaD.astro`, `FooterD.astro` first — they are finished and verified examples).
Shared: `FooterD.astro` (desktop footer, reuse it on case studies if the Figma footer is identical — compare), `src/components/FloatingBar.astro` (`<FloatingBar v="d|t|m" />` — floating Homepage / Connect now / Back-to-top pills; check each frame for it).

## Fonts / classes
`font-ral` Raleway, `font-utara` Utara (self-hosted, weights 300–700), `font-inter`, `font-nun`. Figma text like `font-['Raleway:SemiBold']` → `font-ral font-semibold`.
`font-['Arial:Regular']` → `font-[Arial,Helvetica,sans-serif]`.

## Converting get_design_context output
1. Call `get_design_context` (skillNames `resource:figma-design-to-code`) on ONE section at a time (never the whole 16000px page). Convert React → Astro HTML: `className`→`class`, remove TS, `{...}` text strings → plain text, self-close nothing wrongly.
2. Replace the asset constants (`imgXxx`) with local assets:
   - Raster images: `<Img f="KEY" class="..." sizes="..." />` (`src/components/Img.astro`). KEY must exist in `src/assets/images.json`. Keys look like `BoltShift_201-1148` (prefix + node id with `:`→`-`), `R2_<id>` (re-exports of cropped nodes), `COMP..._`, `Lens...`, `Stic...`, `Zapi...`, `Visu...`, `PortfolioH_`. The key with the id of the node that has the image fill (look at `data-node-id`). Use `grep -o '"[A-Za-z0-9]*_<id-with-dashes>"' src/assets/images.json` to find it. `tools/hashmap.txt` lists `nodeId|prefix|imageHash(+F|C)` so same-hash images can be reused.
   - IMPORTANT: a file can be the raw source image (needs the crop/position/size Figma applies — `object-cover`, offsets and scale from the generated code) or an already-cropped render. ALWAYS verify visually (see below). If an image is missing or wrong, produce it (see "Getting assets") — never leave a placeholder, never substitute another image.
   - Icons/vectors: use the SVG. Export exact SVG with `use_figma`: `await (await figma.getNodeByIdAsync(ID)).exportAsync({format:"SVG_STRING"})` (output ≤ ~20KB per call) and save under `public/icons/<name>.svg` (inline `<svg>` for small recolourable ones). Never hand-draw icons.
3. Exact text, exact font sizes/weights/tracking/line-height, exact colours. Gradients/blend/blur/shadows as in the code. Keep `backdrop-blur`, `drop-shadow` etc.
4. Semantics/SEO/a11y (without changing visuals): real `<h1>` for the page title, `<h2>` for section titles, `<a>`/`<button>` for interactive things, meaningful `alt` text for content images (alt="" for decorative), `<section>` landmarks with `aria-label`s, `loading="lazy"` for all images except the above-the-fold hero (`eager` prop on Img).
5. Global CSS gotcha: unlayered CSS beats Tailwind utilities. Put resets in `@layer base`.

## Verification loop (mandatory, per section)
* Build: `npx astro build`; preview: `npx astro preview --port 4321` (already running in background? if not: `nohup npx astro preview --port 4321 &`). Use a unique port per agent if another is running (e.g. 4322+).
* Screenshot your page with `node tools/fulldiff.mjs http://localhost:PORT/<slug> /tmp/<you>.png 1440` (reduced-motion, scrolls to trigger lazy images; pass width 768 / 390 for other stages). `tools/clip.mjs` clips a region (edit URL inside).
* Get Figma's own render: `mcp__Figma__download_assets` (nodeId=section or frame, defaultFormat png) returns a short-lived URL; the sandbox shell CANNOT reach figma.com, so download through the user's Chrome: use `mcp__claude-in-chrome__tabs_create_mcp` (own tab! close it when done), `navigate` to the URL (Chrome saves the file into C:\Users\Mehroze Maqsood\Downloads named like the URL's last path segment + ext), wait ~5–10 s, then `mcp__remote-devices__device_stage_files` with that path → appears in `/mnt/user-data/uploads/Downloads/`. (Figma caps exports at 4096px on the long edge; for tall frames export section by section at `defaultScale` 1.) Raw source images of a node are also listed in `rawImages` → download the same way if an exported asset is missing/wrong.
* Compare with Python (PIL/numpy): resize to the same size, compute abs diff, view diff image; text-edge noise is normal, *filled* blocks/shifted items are bugs. Fix until every section matches; then re-check with the real Figma screenshot visually (`get_screenshot`).
* Don't commit/push (the lead does). Don't touch files outside your page's component folder/page file, except adding new assets: raw files → `src/assets/raw/<KEY>.png|jpg`, then `flock /tmp/opt.lock node tools/optimize-new.mjs` (incremental, safe to run repeatedly).

## Interactions (only what the Figma/notes define; nothing else)
* Pill buttons with a `Fill` child (0.01px tall at rest): on hover the fill wipes up from the bottom (`transition-[height] duration-300`, `group-hover:h-[calc(100%+2px)]`) and label colour flips to dark where Figma shows it (see CtaD.astro). "Connect now" buttons have no fill effect; they link to LinkedIn https://www.linkedin.com/in/muhammadmehrozemaqsood/ .
* Contact links: mailto:mehrozemaqsood8@gmail.com, WhatsApp https://wa.me/923246319870, Behance https://www.behance.net/mehrozemaqsood, LinkedIn above.
* Check each frame's `reactions` / hyperlinks / prototype connections with use_figma (`node.reactions`, text `hyperlink`) and implement exactly those links (e.g. "Interactive prototype" embeds/links, lightboxes, anchors). If the Figma defines a hover/active state as a component variant (State=Hover/Active), implement it.
* Respect `prefers-reduced-motion`; don't add animations that Figma doesn't show (a tiny fade-in-on-scroll is NOT allowed unless told).
* Mobile/tablet: no hover-only dependencies.

## Performance
Images lazy except LCP; give `<Img sizes>` realistic widths; no layout shift (Img sets width/height). Avoid big inline SVG duplicates — put repeated SVGs in `public/icons/` and use `<img>`. Keep scripts tiny.
