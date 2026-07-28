# Nowenna Pompejańska (`pompeiana`) — complete source bundle
Every file of the project, verbatim. No build step, no dependencies: plain HTML + CSS + ES modules + JSON data, served over HTTP.

## Stack
| Layer | What it is |
|---|---|
| Runtime | The browser. No framework, no bundler, no package manager, no `node_modules`. |
| Markup | One `index.html` shell; the whole UI is built in JS via a 16-line `h()` hyperscript helper. |
| Styles | One hand-written `css/app.css` — CSS custom properties, `prefers-color-scheme` dark mode, `dvh`/`env(safe-area-inset-*)` for mobile. |
| Logic | 4 ES modules (`app.js` view layer, `store.js` state, `sequence.js` day expansion, `i18n.js` strings). Loaded with `<script type="module">`. |
| Data | 4 JSON files loaded with `fetch()` at boot — the source of truth for prayers, mysteries, schedule, languages. |
| Persistence | `localStorage`, single key `pompeiana.v1`. |
| Offline / install | `sw.js` service worker (cache-first, `pompejanka-v1`) + `app.webmanifest` → installable PWA. |
| Dev server | `python3 -m http.server` (anything static works). |
| External calls | Zero. Nothing leaves the device. |

## File inventory
| File | Bytes | SHA-256 |
|---|---:|---|
| `index.html` | 920 | `f864b2c16055bb22998263f483cb51e3295126ec604ce57dcbc7b4ea492ae938` |
| `app.webmanifest` | 565 | `d6b5c39f508ccdc19430518cae9861a6a3b2b97e3c7e2d2c4931e512dd2f07c9` |
| `sw.js` | 1366 | `fd5688378743f3cdcd74813f36087e77525d048113f2f33df669de67f6359887` |
| `css/app.css` | 14537 | `81c645739cebe1183dc3c275eff7b8052c776b218454da219de372872be9ec0f` |
| `js/app.js` | 23152 | `a70d16478517be63634f9732209a60df552eb9271a0886dfd378391d34c4f7fd` |
| `js/store.js` | 4714 | `e45cdcf2493b8f4175ef96aa3cb2302ff09b2c96ff81561246dfa1f883be0d38` |
| `js/sequence.js` | 2244 | `00c118a047ff969919e5b12ea10b8e9c36bbb4a56d06a5aca9c436ac079d09bf` |
| `js/i18n.js` | 14974 | `9565a89a367dfcdcb6285b107159de92e95183dae28adf244c0414eda146403d` |
| `icons/icon.svg` | 926 | `6943ac7c33c07ea96b150cee353d804794ca80d753859172f9c9b80412f9faaf` |
| `icons/icon-maskable.svg` | 1033 | `696a4ae9c879087fc177dc209db8df1632f5854a86f3e974b5e1033cb4b81b4c` |
| `manifest.json` | 477 | `a29add76eddeecb0fad6abdbe607d5e77d14d9384740f017975455bf4367ec37` |
| `languages.json` | 1327 | `f0c0f49688fb64d02ae9e7d80f3ad4e7b085b6adb7c12a9c81d42e37deda6d83` |
| `schedule.json` | 11741 | `ea8eb61432c2a94b8074cc31ad5c8df492a89b320676fdb2bac44f64ef37489b` |
| `common_prayers.json` | 53002 | `44acf13b9e8840bab7099e3be2eb6b01e0218ba11be9c9205ee665e4f21e07ea` |
| `mysteries.json` | 96294 | `057816a3f365eee4cfb90d893a55c648ebc523dda847489a669d049a2f7fd440` |
| `README.md` | 4041 | `83f7db4db9592a5fc99d95c68574b03c2730e68c1857285039bf11af749c6794` |
| `DATA_PACKAGE.md` | 3166 | `adbaf656f4b7bd9e3a3584a4a2459a9a725621bd55f724957ed29c2a194c721f` |
| `.gitignore` | 79 | `1056518457f798a60171ca111dd64da76bfaa384da94b9c499a3fe07f0d1f7cf` |
| `.claude/launch.json` | 201 | `0ec03453b0815c725c6619152af9ca44a1b9273d1d61dc3151c9a9a2f4ab4814` |

## Rebuilding from this file
Each file below appears under a `## \`path\`` heading inside a fenced block. To reconstruct the tree byte-for-byte, run the extractor at the bottom of this document (`unpack.py`), or copy each block manually into the named path.

---

## `index.html`

<!-- sha256:f864b2c16055bb22998263f483cb51e3295126ec604ce57dcbc7b4ea492ae938 bytes:920 -->

```html
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#fbfaf7" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="#15151a" media="(prefers-color-scheme: dark)" />
  <meta name="description" content="Nowenna Pompejańska — 54-dniowa nowenna różańcowa, offline, w 10 językach." />
  <title>Nowenna Pompejańska</title>
  <link rel="manifest" href="app.webmanifest" />
  <link rel="icon" href="icons/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="icons/icon.svg" />
  <link rel="stylesheet" href="css/app.css" />
</head>
<body>
  <noscript>Ta aplikacja wymaga JavaScript. / This app requires JavaScript.</noscript>
  <div id="app" aria-live="polite"></div>
  <script type="module" src="js/app.js"></script>
</body>
</html>
```

## `app.webmanifest`

<!-- sha256:d6b5c39f508ccdc19430518cae9861a6a3b2b97e3c7e2d2c4931e512dd2f07c9 bytes:565 -->

```json
{
  "name": "Nowenna Pompejańska",
  "short_name": "Nowenna",
  "description": "54-dniowa nowenna różańcowa do Matki Bożej z Pompei — offline, w 10 językach.",
  "lang": "pl",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#faf9f6",
  "theme_color": "#faf9f6",
  "icons": [
    { "src": "icons/icon.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "any" },
    { "src": "icons/icon-maskable.svg", "sizes": "any", "type": "image/svg+xml", "purpose": "maskable" }
  ]
}
```

## `sw.js`

<!-- sha256:fd5688378743f3cdcd74813f36087e77525d048113f2f33df669de67f6359887 bytes:1366 -->

```javascript
// Service worker — offline-first cache for the Pompeian Novena PWA.
const CACHE = "pompejanka-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./css/app.css",
  "./js/app.js",
  "./js/store.js",
  "./js/i18n.js",
  "./js/sequence.js",
  "./app.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-maskable.svg",
  "./languages.json",
  "./common_prayers.json",
  "./mysteries.json",
  "./schedule.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Cache-first for our own assets; network fallback otherwise.
self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  e.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((res) => {
          if (res.ok && new URL(request.url).origin === self.location.origin) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
```

## `css/app.css`

<!-- sha256:81c645739cebe1183dc3c275eff7b8052c776b218454da219de372872be9ec0f bytes:14537 -->

```css
/* Nowenna Pompejańska — calm minimal theme */

:root {
  --bg: #faf9f6;
  --surface: #ffffff;
  --ink: #23221f;
  --muted: #74726b;
  --faint: #9b988f;
  --line: #e8e4db;
  --accent: #5e7186;
  --accent-soft: #eef1f4;
  --accent-ink: #ffffff;
  --bead: #ded9cf;
  --danger: #9a5a4f;
  --radius: 16px;
  --radius-sm: 11px;
  --maxw: 640px;
  --font-ui: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-prayer: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif;
  --shadow: 0 1px 2px rgba(40, 38, 33, 0.04), 0 8px 28px rgba(40, 38, 33, 0.06);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #16161a;
    --surface: #1e1e24;
    --ink: #ece9e3;
    --muted: #a6a39c;
    --faint: #76746e;
    --line: #2d2d35;
    --accent: #93a6bc;
    --accent-soft: #24262d;
    --accent-ink: #16161a;
    --bead: #3a3a43;
    --danger: #cf8a7e;
    --shadow: 0 1px 2px rgba(0,0,0,0.3), 0 10px 30px rgba(0,0,0,0.35);
  }
}

* { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overscroll-behavior-y: none;
}

noscript { display: block; padding: 2rem; text-align: center; }

button { font-family: inherit; cursor: pointer; }

.screen {
  max-width: var(--maxw);
  margin: 0 auto;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.screen-pad { max-width: var(--maxw); margin: 0 auto; padding: clamp(1.25rem, 4vw, 2.25rem); }

/* ---- buttons ---- */
.btn {
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.85rem 1.4rem;
  font-size: 1rem;
  font-weight: 550;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  transition: transform .06s ease, background .15s ease, border-color .15s ease;
  -webkit-tap-highlight-color: transparent;
}
.btn:active { transform: scale(0.985); }
.btn-primary { background: var(--accent); color: var(--accent-ink); }
.btn-ghost { background: transparent; color: var(--muted); border-color: var(--line); }
.btn-block { width: 100%; }
.btn svg { display: block; }

.linkish {
  background: none; border: none; color: var(--accent);
  font-size: 0.95rem; font-weight: 550; padding: 0.2rem 0.1rem;
}
.linkish.small { font-size: 0.85rem; }

.icon-btn {
  background: none; border: none; color: var(--muted);
  width: 40px; height: 40px; border-radius: 50%;
  display: grid; place-items: center; padding: 0;
}
.icon-btn:active { background: var(--accent-soft); }

/* ---- language button + sheet ---- */
.lang-btn {
  display: inline-flex; align-items: center; gap: 0.4rem;
  background: var(--surface); border: 1px solid var(--line);
  color: var(--muted); border-radius: 999px;
  padding: 0.4rem 0.7rem; font-size: 0.82rem; font-weight: 600;
  letter-spacing: 0.04em;
}
.lang-btn:active { background: var(--accent-soft); }
.lang-globe { display: grid; place-items: center; color: var(--faint); }
.lang-code { line-height: 1; }

.sheet-backdrop {
  position: fixed; inset: 0; z-index: 50;
  background: rgba(20, 19, 16, 0.32);
  display: flex; align-items: flex-end; justify-content: center;
  animation: fade .18s ease;
}
@media (prefers-color-scheme: dark) { .sheet-backdrop { background: rgba(0,0,0,0.55); } }
.sheet {
  width: 100%; max-width: var(--maxw);
  background: var(--surface);
  border-radius: 22px 22px 0 0;
  padding: 0.5rem 1.1rem calc(1.4rem + env(safe-area-inset-bottom));
  box-shadow: 0 -10px 40px rgba(0,0,0,0.18);
  animation: slideup .24s cubic-bezier(.2,.8,.2,1);
  max-height: 82dvh; overflow-y: auto;
}
.sheet-grab { width: 38px; height: 4px; border-radius: 4px; background: var(--line); margin: 0.4rem auto 0.8rem; }
@keyframes fade { from { opacity: 0; } }
@keyframes slideup { from { transform: translateY(100%); } }

.lang-list { display: flex; flex-direction: column; }
.lang-row {
  display: flex; align-items: baseline; gap: 0.6rem;
  background: none; border: none; text-align: left;
  padding: 0.85rem 0.4rem; border-radius: 10px;
  color: var(--ink); border-bottom: 1px solid var(--line);
}
.lang-row:last-child { border-bottom: none; }
.lang-row-native { font-size: 1.08rem; font-weight: 550; }
.lang-row-en { font-size: 0.8rem; color: var(--faint); }
.lang-row.is-active { color: var(--accent); }
.lang-row.is-active .lang-row-native { font-weight: 700; }
.lang-check { margin-left: auto; color: var(--accent); display: grid; place-items: center; }

.translit-toggle {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1rem; margin-top: 0.9rem; padding: 0.9rem 0.4rem 0.2rem;
  border-top: 1px solid var(--line); font-size: 0.95rem; color: var(--muted);
}
.translit-toggle input { position: absolute; opacity: 0; pointer-events: none; }
.switch {
  width: 44px; height: 26px; border-radius: 999px; background: var(--line);
  position: relative; transition: background .18s ease; flex: none;
}
.switch::after {
  content: ""; position: absolute; top: 3px; left: 3px;
  width: 20px; height: 20px; border-radius: 50%; background: #fff;
  transition: transform .18s ease; box-shadow: 0 1px 3px rgba(0,0,0,.25);
}
.translit-toggle input:checked + .switch { background: var(--accent); }
.translit-toggle input:checked + .switch::after { transform: translateX(18px); }

.sheet-actions { display: flex; gap: 0.6rem; margin-top: 1rem; }
.sheet-actions.tight { margin-top: 0.6rem; }
.sheet-actions .btn { flex: 1; }

/* ---- top bars ---- */
.bar {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  gap: 0.5rem; padding: calc(0.5rem + env(safe-area-inset-top)) 0.85rem 0.5rem;
  background: color-mix(in srgb, var(--bg) 86%, transparent);
  backdrop-filter: saturate(1.2) blur(10px);
  border-bottom: 1px solid var(--line);
}
.bar-day { font-size: 0.9rem; font-weight: 600; color: var(--muted); letter-spacing: 0.01em; }

.home-top {
  display: flex; align-items: center; justify-content: space-between;
  padding: calc(0.7rem + env(safe-area-inset-top)) 1.1rem 0.4rem;
}
.home-top-spacer { flex: 1; }

/* ---- progress tracks ---- */
.track { height: 3px; background: var(--line); position: relative; overflow: hidden; }
.track-step { position: sticky; top: 52px; z-index: 9; }
.track-novena { border-radius: 3px; margin: 1.1rem 0 0.2rem; }
.track-fill { position: absolute; inset: 0 auto 0 0; background: var(--accent); transition: width .25s ease; border-radius: 3px; }

/* ---- intention follow-along strip ---- */
.intention-strip {
  display: flex; align-items: center; gap: 0.5rem;
  width: 100%; max-width: var(--maxw); margin: 0 auto;
  background: var(--accent-soft); border: none; border-bottom: 1px solid var(--line);
  color: var(--muted); text-align: left;
  padding: 0.5rem 1rem; font-size: 0.85rem;
}
.intention-strip .intention-icon { color: var(--accent); flex: none; }
.intention-strip-text {
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: white-space .2s; flex: 1;
}
.intention-strip.is-open .intention-strip-text { white-space: normal; }

/* ---- stage / card ---- */
.stage {
  flex: 1; display: flex; align-items: flex-start; justify-content: center;
  padding: clamp(1.1rem, 4vw, 2.2rem) clamp(1.1rem, 4vw, 1.6rem) 1.2rem;
}
.card {
  background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--radius); box-shadow: var(--shadow);
  width: 100%; padding: clamp(1.4rem, 5vw, 2.4rem); animation: rise .22s ease;
}
@keyframes rise { from { opacity: 0; transform: translateY(6px); } }

.eyebrow {
  margin: 0 0 0.7rem; font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.09em; text-transform: uppercase; color: var(--accent);
}
.card-title {
  margin: 0 0 0.4rem; font-family: var(--font-prayer);
  font-size: clamp(1.45rem, 5vw, 1.95rem); font-weight: 600; line-height: 1.25;
  letter-spacing: -0.01em;
}
.card-body { margin-top: 1rem; }
.prayer-text p {
  font-family: var(--font-prayer); font-size: clamp(1.12rem, 4vw, 1.32rem);
  line-height: 1.72; margin: 0 0 0.7rem;
}
.translit {
  color: var(--muted); font-style: italic; font-family: var(--font-prayer);
  font-size: 0.98rem; line-height: 1.6;
}
.translit-title { margin: -0.1rem 0 0.2rem; font-size: 1rem; }

/* ---- mystery card ---- */
.mystery .card-title { color: var(--ink); }
.scripture {
  margin-top: 1rem; padding: 0.9rem 1rem; background: var(--accent-soft);
  border-radius: var(--radius-sm);
}
.scripture-ref {
  display: flex; align-items: center; gap: 0.45rem; margin: 0;
  font-weight: 650; font-size: 0.95rem; color: var(--ink);
}
.scripture-ico { color: var(--accent); display: grid; place-items: center; }
.scripture-user { margin-top: 0.5rem; }
.scripture-text {
  font-family: var(--font-prayer); font-size: 1.05rem; line-height: 1.65;
  margin: 0 0 0.4rem; white-space: pre-wrap;
}
.add-scripture { color: var(--accent); }

.meditation { margin-top: 1.3rem; }
.med-label {
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.09em;
  text-transform: uppercase; color: var(--faint); margin: 0 0 0.35rem;
}
.med-text {
  font-family: var(--font-prayer); font-size: clamp(1.05rem, 4vw, 1.22rem);
  line-height: 1.72; margin: 0;
}

/* ---- counter / beads ---- */
.counter { margin-top: 1.6rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.counter-tap {
  background: none; border: none; padding: 0.4rem; width: 100%;
  display: flex; flex-direction: column; align-items: center; gap: 0.7rem;
  border-radius: var(--radius-sm);
}
.counter-tap:active { background: var(--accent-soft); }
.beads { display: flex; flex-wrap: wrap; gap: 0.55rem; justify-content: center; }
.bead {
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--bead); transition: background .12s ease, transform .12s ease;
}
.bead.on { background: var(--accent); transform: scale(1.12); }
.counter-num { font-size: 1.05rem; font-weight: 650; color: var(--muted); font-variant-numeric: tabular-nums; }
.counter-hint { font-size: 0.78rem; color: var(--faint); }
.counter.done .counter-num { color: var(--accent); }

/* ---- bottom nav ---- */
.navbar {
  position: sticky; bottom: 0; z-index: 10;
  display: flex; gap: 0.7rem; align-items: center;
  padding: 0.7rem 1rem calc(0.7rem + env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--bg) 86%, transparent);
  backdrop-filter: saturate(1.2) blur(10px);
  border-top: 1px solid var(--line);
}
.nav-back { flex: 0 0 auto; }
.nav-next { flex: 1; }

/* ---- home ---- */
.home-main { flex: 1; padding: clamp(1.5rem, 6vw, 3rem) clamp(1.25rem, 5vw, 2rem); display: flex; flex-direction: column; }
.home-eyebrow { text-align: center; margin: 0.5rem 0 0.4rem; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--faint); }
.home-day { text-align: center; font-family: var(--font-prayer); font-size: clamp(2.4rem, 11vw, 3.4rem); font-weight: 600; margin: 0; letter-spacing: -0.02em; }
.home-phase { text-align: center; color: var(--accent); font-weight: 600; margin: 0.2rem 0 0; }
.home-actions { margin-top: 1.6rem; display: flex; flex-direction: column; gap: 0.6rem; }
.home-foot { text-align: center; padding: 1rem 1rem calc(1.4rem + env(safe-area-inset-bottom)); }

.intention-card {
  margin-top: 1.6rem; background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--radius); padding: 1.1rem 1.2rem; box-shadow: var(--shadow);
}
.intention-head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.45rem; }
.intention-icon { color: var(--accent); display: inline-grid; place-items: center; }
.intention-label { font-size: 0.74rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--faint); }
.intention-head .linkish { margin-left: auto; }
.intention-text { margin: 0; font-family: var(--font-prayer); font-size: 1.12rem; line-height: 1.55; }
.intention-text.is-empty, .intention-inline-text.is-empty { color: var(--faint); font-style: italic; }

.intention-inline { margin-top: 1.1rem; padding: 0.9rem 1rem; background: var(--accent-soft); border-radius: var(--radius-sm); display: flex; align-items: flex-start; gap: 0.6rem; }
.intention-inline-text { margin: 0; flex: 1; font-family: var(--font-prayer); font-size: 1.12rem; line-height: 1.5; }

/* ---- welcome ---- */
.welcome { flex: 1; }
.welcome-title { font-family: var(--font-prayer); font-size: clamp(2rem, 8vw, 2.7rem); font-weight: 600; margin: 0.6rem 0 0.2rem; letter-spacing: -0.02em; }
.welcome-sub { color: var(--accent); font-weight: 600; margin: 0 0 1rem; }
.welcome-intro { color: var(--muted); font-size: 1.05rem; margin: 0 0 1.8rem; }
.field-label { display: block; font-size: 0.74rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--faint); margin-bottom: 0.5rem; }
.field {
  width: 100%; font-family: var(--font-prayer); font-size: 1.1rem; line-height: 1.55;
  color: var(--ink); background: var(--surface);
  border: 1px solid var(--line); border-radius: var(--radius-sm);
  padding: 0.8rem 0.9rem; resize: vertical;
}
.field:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.field-note { font-size: 0.85rem; color: var(--faint); margin: 0.5rem 0 1.4rem; }

/* ---- day done / finished ---- */
.day-done, .finished { min-height: 100dvh; }
.done-box { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem clamp(1.25rem, 6vw, 2.5rem) calc(2rem + env(safe-area-inset-bottom)); gap: 0.4rem; }
.done-mark { color: var(--accent); margin-bottom: 0.6rem; }
.done-mark.crown { color: var(--accent); }
.done-title { font-family: var(--font-prayer); font-size: clamp(1.8rem, 7vw, 2.4rem); font-weight: 600; margin: 0; }
.done-body { color: var(--muted); font-size: 1.05rem; max-width: 30ch; margin: 0.3rem 0 1.4rem; }
.done-body.quote { font-family: var(--font-prayer); font-style: italic; font-size: 1.2rem; color: var(--ink); max-width: 34ch; }
.done-intention { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--accent-soft); border-radius: 999px; padding: 0.5rem 1rem; margin-bottom: 1.6rem; font-family: var(--font-prayer); font-size: 1.02rem; }
.done-box .btn-block { max-width: 360px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
}
```

## `js/app.js`

<!-- sha256:a70d16478517be63634f9732209a60df552eb9271a0886dfd378391d34c4f7fd bytes:23152 -->

```javascript
// app.js — rendering and interaction for the Pompeian Novena PWA.

import {
  state, loadData, save,
  setLang, setTranslit, setIntention,
  beginNovena, setProgress, completeDay, resetDay, startNewNovena,
  getScripture, setScripture,
} from "./store.js";
import { ui, pick, pickTranslit, formatDay, CATEGORY } from "./i18n.js";
import { buildDay } from "./sequence.js";

const root = document.getElementById("app");
let dayCtx = null;        // cached buildDay() result for state.currentDay
let sheetOpen = false;    // language sheet visible?

// --- tiny hyperscript helper ---------------------------------------------
function h(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else if (k === "dataset") Object.assign(e.dataset, v);
    else e.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return e;
}

const L = () => state.lang;
const langMeta = () => state.data.languagesByCode[state.lang];

// --- top-level render ------------------------------------------------------
function render({ preserveScroll = false } = {}) {
  const y = preserveScroll ? window.scrollY : 0;
  root.replaceChildren();
  document.documentElement.lang = state.lang;

  let screen;
  if (state.finished) screen = renderFinished();
  else if (state.view === "pray") screen = renderPray();
  else if (state.view === "day-done") screen = renderDayDone();
  else screen = renderHome();

  root.appendChild(screen);
  if (sheetOpen) root.appendChild(renderLangSheet());

  if (preserveScroll) window.scrollTo(0, y);
  else window.scrollTo(0, 0);
}

// --- shared bits -----------------------------------------------------------
function langButton() {
  return h("button", {
    class: "lang-btn",
    "aria-label": ui("language", L()),
    onclick: () => { sheetOpen = true; render({ preserveScroll: true }); },
  }, h("span", { class: "lang-globe", "aria-hidden": "true", html: GLOBE_SVG }),
     h("span", { class: "lang-code" }, state.lang.toUpperCase()));
}

function renderLangSheet() {
  const close = () => { sheetOpen = false; render({ preserveScroll: true }); };
  const list = state.data.languages.map((l) =>
    h("button", {
      class: "lang-row" + (l.code === state.lang ? " is-active" : ""),
      onclick: () => {
        setLang(l.code);
        sheetOpen = false;
        render({ preserveScroll: true }); // stay on the exact same step + scroll
      },
    },
      h("span", { class: "lang-row-native" }, l.name_native),
      h("span", { class: "lang-row-en" }, l.name_en),
      l.code === state.lang ? h("span", { class: "lang-check", html: CHECK_SVG }) : null,
    )
  );

  const rows = [h("div", { class: "lang-list" }, ...list)];

  if (langMeta().has_translit) {
    rows.push(
      h("label", { class: "translit-toggle" },
        h("span", {}, ui("show_translit", L())),
        h("input", {
          type: "checkbox",
          checked: state.showTranslit ? true : null,
          onchange: (ev) => { setTranslit(ev.target.checked); render({ preserveScroll: true }); },
        }),
        h("span", { class: "switch", "aria-hidden": "true" }),
      )
    );
  }

  return h("div", { class: "sheet-backdrop", onclick: (e) => { if (e.target.classList.contains("sheet-backdrop")) close(); } },
    h("div", { class: "sheet", role: "dialog", "aria-modal": "true", "aria-label": ui("language", L()) },
      h("div", { class: "sheet-grab", "aria-hidden": "true" }),
      ...rows,
    )
  );
}

// --- HOME ------------------------------------------------------------------
function renderHome() {
  const firstRun = !state.startDate;
  const wrap = h("div", { class: "screen home" });

  wrap.appendChild(
    h("header", { class: "home-top" },
      h("span", { class: "home-top-spacer" }),
      langButton(),
    )
  );

  if (firstRun) {
    wrap.appendChild(renderWelcome());
    return wrap;
  }

  const day = state.currentDay;
  const info = state.data.schedule.days[day - 1];
  const phaseName = pick(state.data.schedule.phases[info.phase].name, L());
  const resuming = state.progress.stepIndex > 0;

  const center = h("div", { class: "home-main" });
  center.appendChild(h("p", { class: "home-eyebrow" }, pick({ pl:"Nowenna Pompejańska", it:"Novena Pompeiana", fr:"Neuvaine de Pompéi", es:"Novena de Pompeya", de:"Pompejanische Novene", la:"Novena Pompeiana", ru:"Помпейская новенна", uk:"Помпейська новена", be:"Пампейская навэна", zh:"龐貝聖母九日敬禮" }, L())));
  center.appendChild(h("h1", { class: "home-day" }, formatDay(day, 54, L())));
  center.appendChild(h("p", { class: "home-phase" }, phaseName));

  // progress bar across 54 days
  const pct = ((day - 1) / 54) * 100;
  center.appendChild(
    h("div", { class: "track track-novena", "aria-hidden": "true" },
      h("div", { class: "track-fill", style: `width:${pct}%` }),
    )
  );

  // intention card
  center.appendChild(renderIntentionCard());

  // actions
  const actions = h("div", { class: "home-actions" });
  actions.appendChild(
    h("button", { class: "btn btn-primary", onclick: startPraying },
      resuming ? ui("continue", L()) : ui("begin_day", L()))
  );
  if (resuming) {
    actions.appendChild(
      h("button", { class: "btn btn-ghost", onclick: () => { resetDay(); render(); } },
        ui("restart_day", L()))
    );
  }
  center.appendChild(actions);

  wrap.appendChild(center);

  wrap.appendChild(
    h("footer", { class: "home-foot" },
      h("button", { class: "linkish", onclick: confirmNewNovena }, ui("start_new", L())),
    )
  );
  return wrap;
}

function renderWelcome() {
  const box = h("div", { class: "screen-pad welcome" });
  box.appendChild(h("h1", { class: "welcome-title" }, ui("novena_title", L())));
  box.appendChild(h("p", { class: "welcome-sub" }, ui("subtitle", L())));
  box.appendChild(h("p", { class: "welcome-intro" }, ui("intro", L())));

  const intentionLabel = pick(state.data.prayers.intention_prompt.name, L());
  box.appendChild(h("label", { class: "field-label", for: "intention-input" }, intentionLabel));
  const ta = h("textarea", {
    id: "intention-input",
    class: "field",
    rows: "3",
    placeholder: ui("intention_placeholder", L()),
  });
  ta.value = state.intention || "";
  box.appendChild(ta);
  box.appendChild(h("p", { class: "field-note" }, ui("intention_note", L())));

  box.appendChild(
    h("button", {
      class: "btn btn-primary btn-block",
      onclick: () => {
        setIntention(ta.value);
        beginNovena();
        startPraying();
      },
    }, ui("begin_novena", L()))
  );
  return box;
}

function renderIntentionCard() {
  const card = h("div", { class: "intention-card" });
  const label = pick(state.data.prayers.intention_prompt.name, L());
  card.appendChild(
    h("div", { class: "intention-head" },
      h("span", { class: "intention-icon", "aria-hidden": "true", html: FLAME_SVG }),
      h("span", { class: "intention-label" }, label),
      h("button", { class: "linkish small", onclick: editIntentionInline }, ui("edit", L())),
    )
  );
  card.appendChild(
    h("p", { class: "intention-text" + (state.intention ? "" : " is-empty") },
      state.intention || ui("intention_placeholder", L()))
  );
  return card;
}

function editIntentionInline() {
  const current = state.intention || "";
  const ta = h("textarea", { class: "field", rows: "3" });
  ta.value = current;
  const dialog = h("div", { class: "sheet-backdrop", onclick: (e) => { if (e.target.classList.contains("sheet-backdrop")) { sheetOpen = false; render({ preserveScroll: true }); } } },
    h("div", { class: "sheet", role: "dialog", "aria-modal": "true" },
      h("div", { class: "sheet-grab", "aria-hidden": "true" }),
      h("label", { class: "field-label" }, pick(state.data.prayers.intention_prompt.name, L())),
      ta,
      h("div", { class: "sheet-actions" },
        h("button", { class: "btn btn-ghost", onclick: () => { render({ preserveScroll: true }); } }, ui("cancel", L())),
        h("button", { class: "btn btn-primary", onclick: () => { setIntention(ta.value); render({ preserveScroll: true }); } }, ui("save", L())),
      ),
    )
  );
  root.appendChild(dialog);
  ta.focus();
}

// --- PRAY ------------------------------------------------------------------
function startPraying() {
  dayCtx = buildDay(state.data, state.currentDay);
  state.view = "pray";
  if (state.progress.stepIndex >= dayCtx.steps.length) setProgress(0, 0);
  render();
}

function renderPray() {
  if (!dayCtx || dayCtx.day !== state.currentDay) dayCtx = buildDay(state.data, state.currentDay);
  const steps = dayCtx.steps;
  const idx = Math.min(state.progress.stepIndex, steps.length - 1);
  const step = steps[idx];

  const wrap = h("div", { class: "screen pray" });

  // top bar
  wrap.appendChild(
    h("header", { class: "bar" },
      h("button", { class: "icon-btn", "aria-label": ui("back_home", L()), onclick: goHome },
        h("span", { html: HOME_SVG, "aria-hidden": "true" })),
      h("div", { class: "bar-day" }, formatDay(state.currentDay, 54, L())),
      langButton(),
    )
  );

  // step progress bar
  const pct = ((idx + 1) / steps.length) * 100;
  wrap.appendChild(
    h("div", { class: "track track-step", "aria-hidden": "true" },
      h("div", { class: "track-fill", style: `width:${pct}%` }),
    )
  );

  // intention follow-along strip
  if (state.intention) wrap.appendChild(renderIntentionStrip());

  // step card
  const card = renderStep(step);
  wrap.appendChild(h("main", { class: "stage" }, card));

  // bottom nav
  const isLast = idx >= steps.length - 1;
  wrap.appendChild(
    h("nav", { class: "navbar" },
      h("button", { class: "btn btn-ghost nav-back", onclick: prevStep },
        h("span", { html: ARROW_L, "aria-hidden": "true" }), h("span", {}, ui("back", L()))),
      h("button", { class: "btn btn-primary nav-next", onclick: nextStep },
        h("span", {}, isLast ? ui("finish_day", L()) : ui("next", L())),
        h("span", { html: ARROW_R, "aria-hidden": "true" })),
    )
  );

  return wrap;
}

function renderIntentionStrip() {
  const strip = h("button", {
    class: "intention-strip",
    "aria-expanded": "false",
    onclick: (ev) => {
      const btn = ev.currentTarget;
      const expanded = btn.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    },
  },
    h("span", { class: "intention-icon", "aria-hidden": "true", html: FLAME_SVG }),
    h("span", { class: "intention-strip-text" }, state.intention),
  );
  return strip;
}

function eyebrowFor(step) {
  if (step.section === "opening") return ui("opening_section", L());
  if (step.section === "closing") return ui("closing_section", L());
  if (step.section === "mystery") {
    const m = state.data.mysteriesById[step.mysteryId];
    const cat = pick(CATEGORY[m.category], L());
    return `${ui("mystery_word", L())} ${step.decadeIndex} ${ui("of_word", L())} 20 · ${cat}`;
  }
  return "";
}

function renderStep(step) {
  if (step.kind === "intention") return renderIntentionStep(step);
  if (step.kind === "mystery") return renderMysteryStep(step);
  return renderPrayerStep(step);
}

function renderPrayerStep(step) {
  const prayer = state.data.prayers[step.prayerId];
  const meta = langMeta();
  const card = h("article", { class: "card" });
  card.appendChild(h("p", { class: "eyebrow" }, eyebrowFor(step)));
  card.appendChild(h("h2", { class: "card-title" }, pick(prayer.name, L())));
  const tname = pickTranslit(prayer.name, L(), meta);
  if (state.showTranslit && tname) card.appendChild(h("p", { class: "translit translit-title" }, tname));

  const body = h("div", { class: "card-body prayer-text" });
  body.appendChild(h("p", {}, pick(prayer.text, L())));
  const ttext = pickTranslit(prayer.text, L(), meta);
  if (state.showTranslit && ttext) body.appendChild(h("p", { class: "translit" }, ttext));
  card.appendChild(body);

  if (step.reps > 1) card.appendChild(renderCounter(step));
  return card;
}

function renderIntentionStep(step) {
  const prayer = state.data.prayers.intention_prompt;
  const card = h("article", { class: "card" });
  card.appendChild(h("p", { class: "eyebrow" }, ui("opening_section", L())));
  card.appendChild(h("h2", { class: "card-title" }, pick(prayer.name, L())));
  const body = h("div", { class: "card-body prayer-text" });
  body.appendChild(h("p", {}, pick(prayer.text, L())));
  card.appendChild(body);

  const box = h("div", { class: "intention-inline" });
  box.appendChild(h("p", { class: "intention-inline-text" + (state.intention ? "" : " is-empty") },
    state.intention || ui("intention_placeholder", L())));
  box.appendChild(h("button", { class: "linkish", onclick: editIntentionInline }, ui("edit", L())));
  card.appendChild(box);
  return card;
}

function renderMysteryStep(step) {
  const m = state.data.mysteriesById[step.mysteryId];
  const meta = langMeta();
  const card = h("article", { class: "card mystery" });
  card.appendChild(h("p", { class: "eyebrow" }, eyebrowFor(step)));
  card.appendChild(h("h2", { class: "card-title" }, pick(m.name, L())));
  const tname = pickTranslit(m.name, L(), meta);
  if (state.showTranslit && tname) card.appendChild(h("p", { class: "translit translit-title" }, tname));

  // scripture reference + user text
  const ref = pick(m.scripture.reference_localized, L());
  const scrip = h("div", { class: "scripture" });
  scrip.appendChild(h("p", { class: "scripture-ref" },
    h("span", { class: "scripture-ico", "aria-hidden": "true", html: BOOK_SVG }), ref));
  scrip.appendChild(renderScriptureBody(m));
  card.appendChild(scrip);

  // meditation
  const med = h("div", { class: "meditation" });
  med.appendChild(h("p", { class: "med-label" }, ui("meditation", L())));
  med.appendChild(h("p", { class: "med-text" }, pick(m.meditation, L())));
  const tmed = pickTranslit(m.meditation, L(), meta);
  if (state.showTranslit && tmed) med.appendChild(h("p", { class: "translit" }, tmed));
  card.appendChild(med);
  return card;
}

function renderScriptureBody(m) {
  const existing = getScripture(m.id, state.lang);
  const container = h("div", { class: "scripture-user" });

  if (existing) {
    container.appendChild(h("p", { class: "scripture-text" }, existing));
    container.appendChild(h("button", { class: "linkish small", onclick: () => openScriptureEditor(m, container) }, ui("edit", L())));
  } else {
    container.appendChild(
      h("button", { class: "linkish small add-scripture", onclick: () => openScriptureEditor(m, container) },
        "+ " + ui("scripture_add", L()))
    );
  }
  return container;
}

function openScriptureEditor(m, container) {
  const existing = getScripture(m.id, state.lang);
  const ta = h("textarea", { class: "field", rows: "5", placeholder: ui("scripture_add", L()) });
  ta.value = existing;
  container.replaceChildren(
    h("p", { class: "field-note" }, ui("scripture_hint", L())),
    ta,
    h("div", { class: "sheet-actions tight" },
      h("button", { class: "btn btn-ghost", onclick: () => { container.replaceChildren(renderScriptureBody(m)); } }, ui("cancel", L())),
      h("button", { class: "btn btn-primary", onclick: () => { setScripture(m.id, state.lang, ta.value.trim()); render({ preserveScroll: true }); } }, ui("save", L())),
    ),
  );
  ta.focus();
}

// Bead counter for repeated prayers (3× or 10×).
function renderCounter(step) {
  const reps = step.reps;
  const wrap = h("div", { class: "counter" });
  const beads = h("div", { class: "beads" });
  for (let i = 0; i < reps; i++) {
    beads.appendChild(h("span", { class: "bead" + (i < state.progress.rep ? " on" : "") }));
  }
  const num = h("span", { class: "counter-num" }, `${state.progress.rep} / ${reps}`);
  const hint = h("span", { class: "counter-hint" }, ui("tap_to_count", L()));

  const tap = () => {
    const rep = Math.min(reps, state.progress.rep + 1);
    setProgress(state.progress.stepIndex, rep);
    // update in place to avoid scroll jump
    [...beads.children].forEach((b, i) => b.classList.toggle("on", i < rep));
    num.textContent = `${rep} / ${reps}`;
    if (rep >= reps) wrap.classList.add("done");
  };

  const btn = h("button", { class: "counter-tap", "aria-label": ui("tap_to_count", L()), onclick: tap },
    beads, num);
  wrap.appendChild(btn);
  wrap.appendChild(hint);
  if (state.progress.rep >= reps) wrap.classList.add("done");
  return wrap;
}

// --- navigation ------------------------------------------------------------
function nextStep() {
  const steps = dayCtx.steps;
  const idx = state.progress.stepIndex;
  if (idx >= steps.length - 1) {
    state.view = "day-done";
    render();
    return;
  }
  setProgress(idx + 1, 0);
  render();
}

function prevStep() {
  const idx = state.progress.stepIndex;
  if (idx <= 0) { goHome(); return; }
  setProgress(idx - 1, 0);
  render();
}

function goHome() {
  state.view = "home";
  render();
}

// --- DAY DONE --------------------------------------------------------------
function renderDayDone() {
  const wrap = h("div", { class: "screen day-done" });
  wrap.appendChild(
    h("header", { class: "bar" },
      h("button", { class: "icon-btn", "aria-label": ui("back_home", L()), onclick: () => { setProgress(dayCtx.steps.length - 1, 0); state.view = "pray"; render(); } },
        h("span", { html: ARROW_L, "aria-hidden": "true" })),
      h("div", { class: "bar-day" }, formatDay(state.currentDay, 54, L())),
      langButton(),
    )
  );
  const box = h("div", { class: "done-box" });
  box.appendChild(h("div", { class: "done-mark", "aria-hidden": "true", html: CHECK_BIG_SVG }));
  box.appendChild(h("h1", { class: "done-title" }, ui("day_done_title", L())));
  box.appendChild(h("p", { class: "done-body" }, ui("day_done_body", L())));
  if (state.intention) {
    box.appendChild(
      h("div", { class: "done-intention" },
        h("span", { class: "intention-icon", "aria-hidden": "true", html: FLAME_SVG }),
        h("span", {}, state.intention)));
  }
  box.appendChild(
    h("button", { class: "btn btn-primary btn-block", onclick: () => { completeDay(); state.view = "home"; render(); } },
      ui("mark_complete", L()))
  );
  wrap.appendChild(box);
  return wrap;
}

// --- FINISHED --------------------------------------------------------------
function renderFinished() {
  const wrap = h("div", { class: "screen finished" });
  wrap.appendChild(h("header", { class: "home-top" }, h("span", { class: "home-top-spacer" }), langButton()));
  const box = h("div", { class: "done-box" });
  box.appendChild(h("div", { class: "done-mark crown", "aria-hidden": "true", html: CROWN_SVG }));
  box.appendChild(h("h1", { class: "done-title" }, ui("finished_title", L())));
  box.appendChild(h("p", { class: "done-body quote" }, ui("finished_body", L())));
  box.appendChild(
    h("button", { class: "btn btn-primary btn-block", onclick: confirmNewNovena }, ui("start_new", L()))
  );
  wrap.appendChild(box);
  return wrap;
}

function confirmNewNovena() {
  if (confirm(ui("confirm_restart_novena", L()))) {
    startNewNovena();
    state.view = "home";
    render();
  }
}

// --- keyboard --------------------------------------------------------------
document.addEventListener("keydown", (e) => {
  if (sheetOpen && e.key === "Escape") { sheetOpen = false; render({ preserveScroll: true }); return; }
  if (state.view !== "pray") return;
  if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
  if (e.key === "ArrowRight") { e.preventDefault(); nextStep(); }
  else if (e.key === "ArrowLeft") { e.preventDefault(); prevStep(); }
});

// --- swipe (touch) ---------------------------------------------------------
let touchX = null, touchY = null;
document.addEventListener("touchstart", (e) => {
  if (state.view !== "pray" || sheetOpen) return;
  touchX = e.changedTouches[0].clientX;
  touchY = e.changedTouches[0].clientY;
}, { passive: true });
document.addEventListener("touchend", (e) => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  touchX = touchY = null;
  if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  if (dx < 0) nextStep(); else prevStep();
}, { passive: true });

// --- SVG icons -------------------------------------------------------------
const GLOBE_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>';
const CHECK_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
const CHECK_BIG_SVG = '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="24" cy="24" r="21" opacity="0.25"/><path d="M14 24.5l7 7L34 17"/></svg>';
const HOME_SVG = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/></svg>';
const ARROW_L = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 5l-7 7 7 7"/></svg>';
const ARROW_R = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5l7 7-7 7"/></svg>';
const FLAME_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2c1 3-2 4-2 7a2 2 0 104 0c0-1 0-1 .5-2 1.5 1.5 2.5 3.5 2.5 6a5 5 0 11-10 0c0-4 5-6 5-11z"/></svg>';
const BOOK_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5A1.5 1.5 0 014 17.5z"/><path d="M20 5.5C20 4.7 19.3 4 18.5 4H13v15h5.5a1.5 1.5 0 001.5-1.5z"/></svg>';
const CROWN_SVG = '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 34h32M8 34l-2-16 9 7 9-13 9 13 9-7-2 16"/></svg>';

// --- boot ------------------------------------------------------------------
(async function boot() {
  try {
    await loadData();
    if (state.startDate && !state.finished) state.view = "home";
    render();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  } catch (e) {
    root.replaceChildren(h("div", { class: "screen-pad" },
      h("h1", {}, "Błąd / Error"),
      h("p", {}, String(e.message || e)),
      h("p", { class: "field-note" }, "Uruchom aplikację przez serwer HTTP (nie file://). / Serve the app over HTTP.")));
    console.error(e);
  }
})();
```

## `js/store.js`

<!-- sha256:e45cdcf2493b8f4175ef96aa3cb2302ff09b2c96ff81561246dfa1f883be0d38 bytes:4714 -->

```javascript
// store.js — app state, persistence (localStorage), and data loading.

const STORAGE_KEY = "pompeiana.v1";
const SUPPORTED = ["pl", "it", "fr", "es", "de", "la", "ru", "uk", "be", "zh"];

export const state = {
  // loaded data
  data: null,
  // session/preferences (persisted)
  lang: "pl",
  showTranslit: true,
  intention: "",
  startDate: null,     // ISO yyyy-mm-dd of day the novena began
  currentDay: 1,       // 1..54, the day currently being prayed
  finished: false,     // whole novena complete
  progress: { stepIndex: 0, rep: 0 }, // exact resume position within the current day
  scripture: {},       // { mysteryId: { langKey: userText } }
  // ephemeral
  view: "home",        // "home" | "pray" | "day-done"
};

function detectLang() {
  const candidates = [navigator.language, ...(navigator.languages || [])];
  for (const c of candidates) {
    if (!c) continue;
    const base = c.toLowerCase().split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return "pl";
}

export function save() {
  const payload = {
    lang: state.lang,
    showTranslit: state.showTranslit,
    intention: state.intention,
    startDate: state.startDate,
    currentDay: state.currentDay,
    finished: state.finished,
    progress: state.progress,
    scripture: state.scripture,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn("Could not persist state:", e);
  }
}

function restore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state.lang = detectLang();
      return;
    }
    const p = JSON.parse(raw);
    if (p.lang && SUPPORTED.includes(p.lang)) state.lang = p.lang;
    else state.lang = detectLang();
    if (typeof p.showTranslit === "boolean") state.showTranslit = p.showTranslit;
    if (typeof p.intention === "string") state.intention = p.intention;
    if (typeof p.startDate === "string") state.startDate = p.startDate;
    if (Number.isInteger(p.currentDay)) state.currentDay = clampDay(p.currentDay);
    if (typeof p.finished === "boolean") state.finished = p.finished;
    if (p.progress && Number.isInteger(p.progress.stepIndex)) {
      state.progress = { stepIndex: p.progress.stepIndex, rep: p.progress.rep || 0 };
    }
    if (p.scripture && typeof p.scripture === "object") state.scripture = p.scripture;
  } catch (e) {
    console.warn("Could not restore state:", e);
    state.lang = detectLang();
  }
}

export function clampDay(n) {
  return Math.min(54, Math.max(1, n));
}

export async function loadData() {
  const files = ["languages.json", "common_prayers.json", "mysteries.json", "schedule.json"];
  const [languages, commonPrayers, mysteries, schedule] = await Promise.all(
    files.map((f) => fetch(f).then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${f}: ${r.status}`);
      return r.json();
    }))
  );

  const languagesByCode = {};
  for (const l of languages.languages) languagesByCode[l.code] = l;

  const mysteriesById = {};
  for (const m of mysteries.mysteries) mysteriesById[m.id] = m;

  state.data = {
    languages: languages.languages,
    languagesByCode,
    prayers: commonPrayers.prayers,
    mysteries: mysteries.mysteries,
    mysteriesById,
    schedule,
  };

  restore();
  return state.data;
}

// --- mutators -------------------------------------------------------------

export function setLang(code) {
  state.lang = code;
  save();
}

export function setTranslit(on) {
  state.showTranslit = !!on;
  save();
}

export function setIntention(text) {
  state.intention = (text || "").trim();
  save();
}

export function beginNovena() {
  state.startDate = new Date().toISOString().slice(0, 10);
  state.currentDay = 1;
  state.finished = false;
  state.progress = { stepIndex: 0, rep: 0 };
  save();
}

export function setProgress(stepIndex, rep = 0) {
  state.progress = { stepIndex, rep };
  save();
}

export function completeDay() {
  if (state.currentDay >= 54) {
    state.finished = true;
  } else {
    state.currentDay = clampDay(state.currentDay + 1);
  }
  state.progress = { stepIndex: 0, rep: 0 };
  save();
}

export function resetDay() {
  state.progress = { stepIndex: 0, rep: 0 };
  save();
}

export function startNewNovena() {
  state.startDate = new Date().toISOString().slice(0, 10);
  state.currentDay = 1;
  state.finished = false;
  state.progress = { stepIndex: 0, rep: 0 };
  save();
}

export function getScripture(mysteryId, langKey) {
  return state.scripture?.[mysteryId]?.[langKey] || "";
}

export function setScripture(mysteryId, langKey, text) {
  if (!state.scripture[mysteryId]) state.scripture[mysteryId] = {};
  state.scripture[mysteryId][langKey] = text;
  save();
}
```

## `js/sequence.js`

<!-- sha256:00c118a047ff969919e5b12ea10b8e9c36bbb4a56d06a5aca9c436ac079d09bf bytes:2244 -->

```javascript
// sequence.js — expand schedule.json's daily_structure into a flat, navigable
// list of steps for a given day. Honors phase-based closing prayer.

import { clampDay } from "./store.js";

// Returns { day, phase, dayInfo, steps:[ stepObj, ... ] }
// stepObj shapes:
//   { kind:"prayer", prayerId, reps, section, decadeIndex?, mysteryId? }
//   { kind:"intention", prayerId:"intention_prompt", section:"opening" }
//   { kind:"mystery", mysteryId, decadeIndex, section:"mystery" }
export function buildDay(data, dayNumber) {
  const day = clampDay(dayNumber);
  const dayInfo = data.schedule.days[day - 1];
  const closingPrayerId = dayInfo.closing_prayer_id;
  const phase = data.schedule.phases[dayInfo.phase];
  const structure = data.schedule.daily_structure;
  const mysteries = data.mysteries;

  const steps = [];
  let section = "opening";
  let decadeIndex = 0;

  for (const item of structure) {
    if (item.action === "mysteries_loop") {
      section = "mystery";
      const count = item.mysteries_count || mysteries.length;
      for (let i = 0; i < count && i < mysteries.length; i++) {
        const m = mysteries[i];
        decadeIndex = i + 1;
        steps.push({
          kind: "mystery",
          mysteryId: m.id,
          decadeIndex,
          section: "mystery",
        });
        for (const sub of item.per_mystery) {
          if (sub.action === "prayer") {
            steps.push({
              kind: "prayer",
              prayerId: sub.prayer_id,
              reps: sub.repetitions || 1,
              section: "mystery",
              decadeIndex,
              mysteryId: m.id,
            });
          }
          // display_* actions are folded into the mystery card above
        }
      }
      section = "closing";
      continue;
    }

    if (item.action === "prayer") {
      const prayerId = item.prayer_id_dynamic ? closingPrayerId : item.prayer_id;
      if (prayerId === "intention_prompt") {
        steps.push({ kind: "intention", prayerId, section });
      } else {
        steps.push({
          kind: "prayer",
          prayerId,
          reps: item.repetitions || 1,
          section,
        });
      }
    }
  }

  return { day, phase, dayInfo, closingPrayerId, steps };
}
```

## `js/i18n.js`

<!-- sha256:9565a89a367dfcdcb6285b107159de92e95183dae28adf244c0414eda146403d bytes:14974 -->

```javascript
// i18n.js — UI strings + helpers for picking localized text and transliteration.
// Prayer/mystery content lives in the JSON data; this file only covers app chrome.

export const UI = {
  novena_title: { pl:"Nowenna Pompejańska", it:"Novena Pompeiana", fr:"Neuvaine de Pompéi", es:"Novena de Pompeya", de:"Pompejanische Novene", la:"Novena Pompeiana", ru:"Помпейская новенна", uk:"Помпейська новена", be:"Пампейская навэна", zh:"龐貝聖母九日敬禮" },
  subtitle: { pl:"54-dniowa nowenna różańcowa", it:"Novena del rosario di 54 giorni", fr:"Neuvaine du rosaire de 54 jours", es:"Novena del rosario de 54 días", de:"54-tägige Rosenkranz-Novene", la:"Novena rosarii dierum LIV", ru:"54-дневная новенна Розария", uk:"54-денна новена Розарія", be:"54-дзённая навэна Ружанца", zh:"五十四日玫瑰經九日敬禮" },
  intro: { pl:"27 dni próśb i 27 dni dziękczynienia do Matki Bożej Różańcowej z Pompei.", it:"27 giorni di supplica e 27 di ringraziamento alla Madonna del Rosario di Pompei.", fr:"27 jours de supplication et 27 d'action de grâces à Notre-Dame du Rosaire de Pompéi.", es:"27 días de súplica y 27 de acción de gracias a la Virgen del Rosario de Pompeya.", de:"27 Tage Bitte und 27 Tage Dank an die Rosenkranzkönigin von Pompeji.", la:"Dies XXVII supplicationis et XXVII gratiarum actionis ad Beatam Mariam Rosarii Pompeianam.", ru:"27 дней прошения и 27 дней благодарения Богоматери Розария Помпейской.", uk:"27 днів прохання і 27 днів подяки до Богородиці Розарія Помпейської.", be:"27 дзён просьбаў і 27 дзён падзякі да Маці Божай Ружанцовай з Пампеі.", zh:"向龐貝玫瑰聖母祈求二十七日，感恩二十七日。" },
  begin_novena: { pl:"Rozpocznij nowennę", it:"Inizia la novena", fr:"Commencer la neuvaine", es:"Comenzar la novena", de:"Novene beginnen", la:"Novenam incipere", ru:"Начать новенну", uk:"Розпочати новену", be:"Распачаць навэну", zh:"開始九日敬禮" },
  begin_day: { pl:"Rozpocznij dzień", it:"Inizia il giorno", fr:"Commencer le jour", es:"Comenzar el día", de:"Tag beginnen", la:"Diem incipere", ru:"Начать день", uk:"Почати день", be:"Пачаць дзень", zh:"開始今日" },
  continue: { pl:"Kontynuuj modlitwę", it:"Continua la preghiera", fr:"Continuer la prière", es:"Continuar la oración", de:"Gebet fortsetzen", la:"Orationem pergere", ru:"Продолжить молитву", uk:"Продовжити молитву", be:"Працягнуць малітву", zh:"繼續祈禱" },
  next: { pl:"Dalej", it:"Avanti", fr:"Suivant", es:"Siguiente", de:"Weiter", la:"Pergere", ru:"Далее", uk:"Далі", be:"Далей", zh:"下一步" },
  back: { pl:"Wstecz", it:"Indietro", fr:"Précédent", es:"Atrás", de:"Zurück", la:"Retro", ru:"Назад", uk:"Назад", be:"Назад", zh:"上一步" },
  finish_day: { pl:"Zakończ dzień", it:"Concludi il giorno", fr:"Terminer le jour", es:"Terminar el día", de:"Tag abschließen", la:"Diem concludere", ru:"Завершить день", uk:"Завершити день", be:"Завяршыць дзень", zh:"完成今日" },
  day_word: { pl:"Dzień", it:"Giorno", fr:"Jour", es:"Día", de:"Tag", la:"Dies", ru:"День", uk:"День", be:"Дзень", zh:"日" },
  language: { pl:"Język", it:"Lingua", fr:"Langue", es:"Idioma", de:"Sprache", la:"Lingua", ru:"Язык", uk:"Мова", be:"Мова", zh:"語言" },
  show_translit: { pl:"Pokaż transliterację", it:"Mostra traslitterazione", fr:"Afficher la translittération", es:"Mostrar transliteración", de:"Transliteration anzeigen", la:"Transliterationem monstrare", ru:"Показывать транслитерацию", uk:"Показувати транслітерацію", be:"Паказваць транслітарацыю", zh:"顯示音譯" },
  intention_placeholder: { pl:"W jakiej intencji się modlisz?", it:"Per quale intenzione preghi?", fr:"Pour quelle intention priez-vous ?", es:"¿Por qué intención rezas?", de:"Für welches Anliegen betest du?", la:"Pro qua intentione oras?", ru:"О каком намерении вы молитесь?", uk:"За яку інтенцію ви молитеся?", be:"За якую інтэнцыю вы моліцеся?", zh:"你為何意向祈禱？" },
  intention_note: { pl:"Ta intencja będzie Ci towarzyszyć przez całą nowennę.", it:"Questa intenzione ti accompagnerà per tutta la novena.", fr:"Cette intention vous accompagnera durant toute la neuvaine.", es:"Esta intención te acompañará durante toda la novena.", de:"Dieses Anliegen begleitet dich durch die ganze Novene.", la:"Haec intentio te per totam novenam comitabitur.", ru:"Это намерение будет сопровождать вас всю новенну.", uk:"Ця інтенція супроводжуватиме вас усю новену.", be:"Гэтая інтэнцыя будзе суправаджаць вас усю навэну.", zh:"此意向將伴隨你完成整個九日敬禮。" },
  edit: { pl:"Edytuj", it:"Modifica", fr:"Modifier", es:"Editar", de:"Bearbeiten", la:"Mutare", ru:"Изменить", uk:"Змінити", be:"Змяніць", zh:"編輯" },
  save: { pl:"Zapisz", it:"Salva", fr:"Enregistrer", es:"Guardar", de:"Speichern", la:"Servare", ru:"Сохранить", uk:"Зберегти", be:"Захаваць", zh:"儲存" },
  cancel: { pl:"Anuluj", it:"Annulla", fr:"Annuler", es:"Cancelar", de:"Abbrechen", la:"Renuntiare", ru:"Отмена", uk:"Скасувати", be:"Скасаваць", zh:"取消" },
  skip_for_now: { pl:"Pomiń na razie", it:"Salta per ora", fr:"Passer pour l'instant", es:"Omitir por ahora", de:"Vorerst überspringen", la:"Nunc praeterire", ru:"Пропустить пока", uk:"Пропустити поки", be:"Прапусціць пакуль", zh:"暫時略過" },
  tap_to_count: { pl:"Dotknij, aby liczyć", it:"Tocca per contare", fr:"Touchez pour compter", es:"Toca para contar", de:"Zum Zählen tippen", la:"Tange ad numerandum", ru:"Коснитесь, чтобы считать", uk:"Торкніться, щоб лічити", be:"Дакраніцеся, каб лічыць", zh:"輕觸計數" },
  scripture_add: { pl:"Dodaj tekst Pisma", it:"Aggiungi il testo biblico", fr:"Ajouter le texte biblique", es:"Añadir el texto bíblico", de:"Bibeltext hinzufügen", la:"Textum Scripturae addere", ru:"Добавить текст Писания", uk:"Додати текст Письма", be:"Дадаць тэкст Пісьма", zh:"加入聖經經文" },
  scripture_hint: { pl:"Wklej własny tekst z legalnie posiadanej Biblii. Zapisywany tylko na tym urządzeniu.", it:"Incolla il testo dalla tua Bibbia. Salvato solo su questo dispositivo.", fr:"Collez le texte de votre Bible. Enregistré uniquement sur cet appareil.", es:"Pega el texto de tu Biblia. Guardado solo en este dispositivo.", de:"Füge den Text aus deiner Bibel ein. Nur auf diesem Gerät gespeichert.", la:"Textum ex Bibliis tuis insere. Solum in hoc instrumento servatur.", ru:"Вставьте текст из вашей Библии. Хранится только на этом устройстве.", uk:"Вставте текст із вашої Біблії. Зберігається лише на цьому пристрої.", be:"Устаўце тэкст з вашай Бібліі. Захоўваецца толькі на гэтай прыладзе.", zh:"貼上你聖經中的經文。僅儲存於此裝置。" },
  meditation: { pl:"Rozważanie", it:"Meditazione", fr:"Méditation", es:"Meditación", de:"Betrachtung", la:"Meditatio", ru:"Размышление", uk:"Роздум", be:"Разважанне", zh:"默想" },
  mystery_word: { pl:"Tajemnica", it:"Mistero", fr:"Mystère", es:"Misterio", de:"Geheimnis", la:"Mysterium", ru:"Тайна", uk:"Таїна", be:"Таямніца", zh:"奧蹟" },
  opening_section: { pl:"Wprowadzenie", it:"Introduzione", fr:"Introduction", es:"Introducción", de:"Einleitung", la:"Introductio", ru:"Вступление", uk:"Вступ", be:"Уступ", zh:"開端" },
  closing_section: { pl:"Zakończenie", it:"Conclusione", fr:"Conclusion", es:"Conclusión", de:"Abschluss", la:"Conclusio", ru:"Заключение", uk:"Завершення", be:"Заканчэнне", zh:"結束" },
  day_done_title: { pl:"Dzień ukończony", it:"Giorno completato", fr:"Jour terminé", es:"Día completado", de:"Tag abgeschlossen", la:"Dies completus", ru:"День завершён", uk:"День завершено", be:"Дзень завершаны", zh:"今日已完成" },
  day_done_body: { pl:"Niech Maryja zachowa Twoją intencję w swoim Sercu.", it:"Che Maria custodisca la tua intenzione nel suo Cuore.", fr:"Que Marie garde votre intention dans son Cœur.", es:"Que María guarde tu intención en su Corazón.", de:"Maria bewahre dein Anliegen in ihrem Herzen.", la:"Maria intentionem tuam in Corde suo custodiat.", ru:"Да сохранит Мария ваше намерение в Своём Сердце.", uk:"Нехай Марія збереже вашу інтенцію у Своєму Серці.", be:"Няхай Марыя захавае вашу інтэнцыю ў Сваім Сэрцы.", zh:"願聖母將你的意向珍藏於心。" },
  mark_complete: { pl:"Zapisz dzień jako ukończony", it:"Segna il giorno come completato", fr:"Marquer le jour comme terminé", es:"Marcar el día como completado", de:"Tag als abgeschlossen markieren", la:"Diem ut completum signare", ru:"Отметить день завершённым", uk:"Позначити день завершеним", be:"Адзначыць дзень завершаным", zh:"標記今日完成" },
  back_home: { pl:"Strona główna", it:"Pagina iniziale", fr:"Accueil", es:"Inicio", de:"Startseite", la:"Initium", ru:"Главная", uk:"Головна", be:"Галоўная", zh:"首頁" },
  restart_day: { pl:"Zacznij dzień od nowa", it:"Ricomincia il giorno", fr:"Recommencer le jour", es:"Reiniciar el día", de:"Tag neu beginnen", la:"Diem denuo incipere", ru:"Начать день заново", uk:"Почати день знову", be:"Пачаць дзень нанова", zh:"重新開始今日" },
  finished_title: { pl:"Nowenna ukończona", it:"Novena completata", fr:"Neuvaine achevée", es:"Novena completada", de:"Novene vollendet", la:"Novena completa", ru:"Новенна завершена", uk:"Новену завершено", be:"Навэна завершана", zh:"九日敬禮圓滿完成" },
  finished_body: { pl:"Przeżyłeś wszystkie 54 dni. „I nigdy nie słyszano, abyś kogokolwiek opuściła.”", it:"Hai vissuto tutti i 54 giorni. «Non si è mai udito che tu abbia abbandonato qualcuno.»", fr:"Vous avez vécu les 54 jours. « On n'a jamais entendu dire que vous ayez abandonné quelqu'un. »", es:"Has vivido los 54 días. «Jamás se oyó decir que abandonaras a nadie.»", de:"Du hast alle 54 Tage vollendet. „Noch nie wurde gehört, dass du jemanden verlassen hast.“", la:"Omnes dies LIV complevisti. «Numquam auditum est quemquam a te derelictum esse.»", ru:"Вы прошли все 54 дня. «Никогда не было слышно, чтобы Ты оставила кого-либо.»", uk:"Ви пройшли всі 54 дні. «Ніколи не чувано, щоб Ти когось залишила.»", be:"Вы прайшлі ўсе 54 дні. «Ніколі не было чутна, каб Ты каго пакінула.»", zh:"你已走過全部五十四日。「從未聽聞祢曾遺棄求祢庇佑的人。」" },
  start_new: { pl:"Rozpocznij nową nowennę", it:"Inizia una nuova novena", fr:"Commencer une nouvelle neuvaine", es:"Comenzar una nueva novena", de:"Neue Novene beginnen", la:"Novam novenam incipere", ru:"Начать новую новенну", uk:"Розпочати нову новену", be:"Распачаць новую навэну", zh:"開始新的九日敬禮" },
  confirm_restart_novena: { pl:"Rozpocząć nową nowennę od dnia 1? Bieżący postęp zostanie wyzerowany.", it:"Iniziare una nuova novena dal giorno 1? I progressi attuali saranno azzerati.", fr:"Commencer une nouvelle neuvaine au jour 1 ? La progression actuelle sera réinitialisée.", es:"¿Comenzar una nueva novena desde el día 1? El progreso actual se restablecerá.", de:"Neue Novene ab Tag 1 beginnen? Der aktuelle Fortschritt wird zurückgesetzt.", la:"Novam novenam a die 1 incipere? Progressus praesens delebitur.", ru:"Начать новую новенну с дня 1? Текущий прогресс будет сброшен.", uk:"Розпочати нову новену з дня 1? Поточний прогрес буде скинуто.", be:"Распачаць новую навэну з дня 1? Бягучы прагрэс будзе скінуты.", zh:"從第 1 日開始新的九日敬禮？目前進度將被重設。" },
  of_word: { pl:"z", it:"di", fr:"sur", es:"de", de:"von", la:"ex", ru:"из", uk:"з", be:"з", zh:"／" },
};

export const CATEGORY = {
  joyful:    { pl:"Radosna",    it:"Gaudioso",     fr:"Joyeux",     es:"Gozoso",    de:"Freudenreich", la:"Gaudiosum", ru:"Радостная", uk:"Радісна",  be:"Радасная",  zh:"歡喜" },
  luminous:  { pl:"Światła",    it:"Luminoso",     fr:"Lumineux",   es:"Luminoso",  de:"Lichtreich",   la:"Luminosum", ru:"Светлая",   uk:"Світла",   be:"Светлая",   zh:"光明" },
  sorrowful: { pl:"Bolesna",    it:"Doloroso",     fr:"Douloureux", es:"Doloroso",  de:"Schmerzhaft",  la:"Dolorosum", ru:"Скорбная",  uk:"Скорботна", be:"Балесная", zh:"痛苦" },
  glorious:  { pl:"Chwalebna",  it:"Glorioso",     fr:"Glorieux",   es:"Glorioso",  de:"Glorreich",    la:"Gloriosum", ru:"Славная",   uk:"Славна",   be:"Хвалебная", zh:"榮福" },
};

const FALLBACK = "pl";

// Pick a localized string from a { lang: text } map, falling back gracefully.
export function pick(map, lang) {
  if (!map) return "";
  return map[lang] ?? map[FALLBACK] ?? Object.values(map)[0] ?? "";
}

// Pick the transliteration for a map + language, or "" if none.
export function pickTranslit(map, lang, langMeta) {
  if (!map || !langMeta || !langMeta.has_translit) return "";
  return map[langMeta.translit_key] ?? "";
}

// UI string shortcut.
export function ui(key, lang) {
  return pick(UI[key], lang);
}

// "Dzień 3 / 54" with locale-aware ordering for Chinese.
export function formatDay(n, total, lang) {
  if (lang === "zh") return `第 ${n} 日 ／ ${total}`;
  return `${ui("day_word", lang)} ${n} ${ui("of_word", lang)} ${total}`;
}
```

## `icons/icon.svg`

<!-- sha256:6943ac7c33c07ea96b150cee353d804794ca80d753859172f9c9b80412f9faaf bytes:926 -->

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Nowenna Pompejańska">
  <rect width="512" height="512" rx="112" fill="#5e7186"/>
  <g fill="none" stroke="#faf9f6" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
    <!-- rosary loop of beads -->
    <circle cx="256" cy="196" r="118"/>
    <g fill="#faf9f6" stroke="none">
      <circle cx="256" cy="78" r="13"/>
      <circle cx="333" cy="100" r="13"/>
      <circle cx="386" cy="158" r="13"/>
      <circle cx="403" cy="234" r="13"/>
      <circle cx="178" cy="100" r="13"/>
      <circle cx="125" cy="158" r="13"/>
      <circle cx="108" cy="234" r="13"/>
    </g>
    <!-- pendant cross -->
    <path d="M256 318 v150 M210 372 h92"/>
    <g fill="#faf9f6" stroke="none">
      <circle cx="232" cy="300" r="11"/>
      <circle cx="256" cy="312" r="11"/>
      <circle cx="280" cy="300" r="11"/>
    </g>
  </g>
</svg>
```

## `icons/icon-maskable.svg`

<!-- sha256:696a4ae9c879087fc177dc209db8df1632f5854a86f3e974b5e1033cb4b81b4c bytes:1033 -->

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Nowenna Pompejańska">
  <rect width="512" height="512" fill="#5e7186"/>
  <!-- maskable: keep art within the central ~80% safe zone -->
  <g transform="translate(256 256) scale(0.74) translate(-256 -256)">
    <g fill="none" stroke="#faf9f6" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="256" cy="196" r="118"/>
      <g fill="#faf9f6" stroke="none">
        <circle cx="256" cy="78" r="13"/>
        <circle cx="333" cy="100" r="13"/>
        <circle cx="386" cy="158" r="13"/>
        <circle cx="403" cy="234" r="13"/>
        <circle cx="178" cy="100" r="13"/>
        <circle cx="125" cy="158" r="13"/>
        <circle cx="108" cy="234" r="13"/>
      </g>
      <path d="M256 318 v150 M210 372 h92"/>
      <g fill="#faf9f6" stroke="none">
        <circle cx="232" cy="300" r="11"/>
        <circle cx="256" cy="312" r="11"/>
        <circle cx="280" cy="300" r="11"/>
      </g>
    </g>
  </g>
</svg>
```

## `manifest.json`

<!-- sha256:a29add76eddeecb0fad6abdbe607d5e77d14d9384740f017975455bf4367ec37 bytes:477 -->

```json
{
  "schema_version": "1.0",
  "package_version": "1.0.0",
  "generated": "2026-06-22",
  "name": "Nowenna Pompejańska",
  "description": "Baza modlitw 54-dniowej nowenny pompejańskiej w 10 językach (offline-first)",
  "languages_supported": ["pl","it","fr","es","de","la","ru","uk","be","zh"],
  "translit_languages": ["ru","uk","be","zh"],
  "mysteries_count": 20,
  "days_count": 54,
  "files": ["languages.json","common_prayers.json","mysteries.json","schedule.json"]
}
```

## `languages.json`

<!-- sha256:f0c0f49688fb64d02ae9e7d80f3ad4e7b085b6adb7c12a9c81d42e37deda6d83 bytes:1327 -->

```json
{
  "version": "1.0",
  "languages": [
    {"code":"pl","name_native":"polski","name_en":"Polish","script":"latin","has_translit":false},
    {"code":"it","name_native":"italiano","name_en":"Italian","script":"latin","has_translit":false},
    {"code":"fr","name_native":"français","name_en":"French","script":"latin","has_translit":false},
    {"code":"es","name_native":"español","name_en":"Spanish","script":"latin","has_translit":false},
    {"code":"de","name_native":"Deutsch","name_en":"German","script":"latin","has_translit":false},
    {"code":"la","name_native":"latine","name_en":"Latin","script":"latin","has_translit":false},
    {"code":"ru","name_native":"русский","name_en":"Russian","script":"cyrillic","has_translit":true,"translit_key":"ru_translit","translit_system":"ALA-LC"},
    {"code":"uk","name_native":"українська","name_en":"Ukrainian","script":"cyrillic","has_translit":true,"translit_key":"uk_translit","translit_system":"BGN/PCGN"},
    {"code":"be","name_native":"беларуская","name_en":"Belarusian","script":"cyrillic","has_translit":true,"translit_key":"be_translit","translit_system":"Łacinka"},
    {"code":"zh","name_native":"中文","name_en":"Chinese","script":"hanzi","has_translit":true,"translit_key":"zh_translit","translit_system":"Hanyu Pinyin"}
  ]
}
```

## `schedule.json`

<!-- sha256:ea8eb61432c2a94b8074cc31ad5c8df492a89b320676fdb2bac44f64ef37489b bytes:11741 -->

```json
{
  "version": "1.0",
  "_note": "Nowenna pompejańska trwa 54 dni: 27 dni błagalnych + 27 dni dziękczynnych. Codzienna struktura modlitwy jest taka sama; różni się tylko modlitwa zamykająca w zależności od fazy.",
  "phases": {
    "supplicatory": {
      "name": {
        "pl": "Część błagalna",
        "it": "Parte di supplica",
        "fr": "Partie de supplication",
        "es": "Parte de súplica",
        "de": "Bittteil",
        "la": "Pars supplicans",
        "ru": "Часть прошения",
        "ru_translit": "Chast' prosheniya",
        "uk": "Частина благальна",
        "uk_translit": "Chastyna blahal'na",
        "be": "Частка ўмольная",
        "be_translit": "Častka ŭmol'naja",
        "zh": "祈求部分",
        "zh_translit": "Qíqiú bùfèn"
      },
      "days": "1-27",
      "closing_prayer_id": "prayer_supplicatory"
    },
    "thanksgiving": {
      "name": {
        "pl": "Część dziękczynna",
        "it": "Parte di ringraziamento",
        "fr": "Partie d'action de grâces",
        "es": "Parte de acción de gracias",
        "de": "Dankteil",
        "la": "Pars gratiarum actionis",
        "ru": "Часть благодарения",
        "ru_translit": "Chast' blagodareniya",
        "uk": "Частина подяки",
        "uk_translit": "Chastyna podiaky",
        "be": "Частка падзякі",
        "be_translit": "Častka padziaki",
        "zh": "感恩部分",
        "zh_translit": "Gǎn'ēn bùfèn"
      },
      "days": "28-54",
      "closing_prayer_id": "prayer_thanksgiving"
    }
  },
  "daily_structure": [
    {
      "step": 1,
      "action": "prayer",
      "prayer_id": "sign_of_cross",
      "note": "Znak krzyża"
    },
    {
      "step": 2,
      "action": "prayer",
      "prayer_id": "opening_acclamation",
      "note": "Akt strzelisty otwarcia"
    },
    {
      "step": 3,
      "action": "prayer",
      "prayer_id": "intention_prompt",
      "note": "Intencja użytkownika (przechowywana w localStorage)"
    },
    {
      "step": 4,
      "action": "prayer",
      "prayer_id": "credo",
      "note": "Wierzę w Boga"
    },
    {
      "step": 5,
      "action": "prayer",
      "prayer_id": "pater_noster",
      "note": "Ojcze nasz"
    },
    {
      "step": 6,
      "action": "prayer",
      "prayer_id": "ave_maria",
      "repetitions": 3,
      "note": "3x Zdrowaś Maryjo"
    },
    {
      "step": 7,
      "action": "prayer",
      "prayer_id": "gloria_patri",
      "note": "Chwała Ojcu"
    },
    {
      "step": 8,
      "action": "mysteries_loop",
      "mysteries_count": 20,
      "per_mystery": [
        {
          "action": "display_name"
        },
        {
          "action": "display_scripture_reference_and_optional_user_text"
        },
        {
          "action": "display_meditation"
        },
        {
          "action": "prayer",
          "prayer_id": "pater_noster"
        },
        {
          "action": "prayer",
          "prayer_id": "ave_maria",
          "repetitions": 10
        },
        {
          "action": "prayer",
          "prayer_id": "gloria_patri"
        }
      ]
    },
    {
      "step": 9,
      "action": "prayer",
      "prayer_id": "sub_tuum_praesidium",
      "note": "Pod Twoją obronę"
    },
    {
      "step": 10,
      "action": "prayer",
      "prayer_id_dynamic": "closing_prayer_id_from_phase",
      "note": "Modlitwa zamykająca (zależy od fazy: błagalna dla dni 1-27, dziękczynna dla dni 28-54)"
    },
    {
      "step": 11,
      "action": "prayer",
      "prayer_id": "closing_acclamation",
      "repetitions": 3,
      "note": "3x akt strzelisty końcowy"
    },
    {
      "step": 12,
      "action": "prayer",
      "prayer_id": "sign_of_cross",
      "note": "Znak krzyża"
    }
  ],
  "days": [
    {
      "day_number": 1,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 2,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 3,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 4,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 5,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 6,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 7,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 8,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 9,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 10,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 11,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 12,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 13,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 14,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 15,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 16,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 17,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 18,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 19,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 20,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 21,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 22,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 23,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 24,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 25,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 26,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 27,
      "phase": "supplicatory",
      "is_final_day": false,
      "closing_prayer_id": "prayer_supplicatory"
    },
    {
      "day_number": 28,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 29,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 30,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 31,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 32,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 33,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 34,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 35,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 36,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 37,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 38,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 39,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 40,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 41,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 42,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 43,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 44,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 45,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 46,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 47,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 48,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 49,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 50,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 51,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 52,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 53,
      "phase": "thanksgiving",
      "is_final_day": false,
      "closing_prayer_id": "prayer_thanksgiving"
    },
    {
      "day_number": 54,
      "phase": "thanksgiving",
      "is_final_day": true,
      "closing_prayer_id": "prayer_thanksgiving"
    }
  ]
}
```

## `common_prayers.json`

<!-- sha256:44acf13b9e8840bab7099e3be2eb6b01e0218ba11be9c9205ee665e4f21e07ea bytes:53002 -->

```json
{
  "version": "1.0",
  "_note": "Modlitwy stałe nowenny pompejańskiej w 10 językach. Cyrylica i chiński mają dodatkowo *_translit (transliteracja łacińska).",
  "prayers": {
    "sign_of_cross": {
      "name": {
        "pl": "Znak krzyża",
        "it": "Segno della Croce",
        "fr": "Signe de la Croix",
        "es": "Señal de la Cruz",
        "de": "Kreuzzeichen",
        "la": "Signum Crucis",
        "ru": "Крестное знамение",
        "ru_translit": "Krestnoye znameniye",
        "uk": "Хресне знамення",
        "uk_translit": "Khresne znamennia",
        "be": "Знак крыжа",
        "be_translit": "Znak kryža",
        "zh": "十字聖號",
        "zh_translit": "Shízì Shènghào"
      },
      "text": {
        "pl": "W imię Ojca i Syna, i Ducha Świętego. Amen.",
        "it": "Nel nome del Padre e del Figlio e dello Spirito Santo. Amen.",
        "fr": "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.",
        "es": "En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.",
        "de": "Im Namen des Vaters und des Sohnes und des Heiligen Geistes. Amen.",
        "la": "In nomine Patris, et Filii, et Spiritus Sancti. Amen.",
        "ru": "Во имя Отца, и Сына, и Святого Духа. Аминь.",
        "ru_translit": "Vo imya Ottsa, i Syna, i Svyatogo Dukha. Amin'.",
        "uk": "В ім'я Отця, і Сина, і Святого Духа. Амінь.",
        "uk_translit": "V im'ia Ottsia, i Syna, i Sviatoho Dukha. Amin'.",
        "be": "У імя Айца, і Сына, і Сьвятога Духа. Амэн.",
        "be_translit": "U imja Ajca, i Syna, i Sviataha Ducha. Amen.",
        "zh": "因父、及子、及聖神之名。阿們。",
        "zh_translit": "Yīn Fù, jí Zǐ, jí Shèngshén zhī míng. Āmen."
      }
    },
    "opening_acclamation": {
      "name": {
        "pl": "Akt strzelisty otwarcia",
        "it": "Atto iniziale",
        "fr": "Invocation initiale",
        "es": "Jaculatoria inicial",
        "de": "Eröffnungsanrufung",
        "la": "Invocatio initialis",
        "ru": "Начальное воззвание",
        "ru_translit": "Nachal'noye vozzvaniye",
        "uk": "Початковий заклик",
        "uk_translit": "Pochatkovyi zaklyk",
        "be": "Пачатковы вокліч",
        "be_translit": "Pačatkovy voklič",
        "zh": "開始呼求",
        "zh_translit": "Kāishǐ hūqiú"
      },
      "text": {
        "pl": "Ten różaniec odmawiam na Twoją cześć, Królowo Różańca Świętego.",
        "it": "Questo rosario lo recito in tuo onore, Regina del Santissimo Rosario.",
        "fr": "Ce rosaire, je le récite en ton honneur, Reine du Très Saint Rosaire.",
        "es": "Este rosario lo rezo en tu honor, Reina del Santísimo Rosario.",
        "de": "Diesen Rosenkranz bete ich zu deiner Ehre, Königin des heiligen Rosenkranzes.",
        "la": "Hoc rosarium recito in honorem tuum, Regina sacratissimi Rosarii.",
        "ru": "Этот Розарий читаю в Твою честь, Царица Святого Розария.",
        "ru_translit": "Etot Rozariy chitayu v Tvoyu chest', Tsaritsa Svyatogo Rozariya.",
        "uk": "Цей Розарій відмовляю на Твою честь, Царице Святого Розарія.",
        "uk_translit": "Tsei Rozarii vidmovliaiu na Tvoiu chest', Tsarytse Sviatoho Rozariia.",
        "be": "Гэты Ружанец адмаўляю на Тваю чэсць, Каралева Сьвятога Ружанца.",
        "be_translit": "Hety Ružaniec admaŭlaju na Tvaju česć, Karaleva Sviataha Ružanca.",
        "zh": "我為光榮祢誦念這玫瑰經，聖玫瑰之后。",
        "zh_translit": "Wǒ wèi guāngróng nǐ sòngniàn zhè méiguī jīng, Shèng Méiguī zhī Hòu."
      }
    },
    "intention_prompt": {
      "name": {
        "pl": "Intencja",
        "it": "Intenzione",
        "fr": "Intention",
        "es": "Intención",
        "de": "Anliegen",
        "la": "Intentio",
        "ru": "Намерение",
        "ru_translit": "Namereniye",
        "uk": "Інтенція",
        "uk_translit": "Intentsiia",
        "be": "Інтэнцыя",
        "be_translit": "Intencyja",
        "zh": "祈禱意向",
        "zh_translit": "Qídǎo yìxiàng"
      },
      "text": {
        "pl": "Modlę się w intencji:",
        "it": "Prego per l'intenzione:",
        "fr": "Je prie pour l'intention :",
        "es": "Rezo por la intención:",
        "de": "Ich bete in folgender Meinung:",
        "la": "Oro pro intentione:",
        "ru": "Молюсь о следующем намерении:",
        "ru_translit": "Molyus' o sleduyushchem namerenii:",
        "uk": "Молюся в наступній інтенції:",
        "uk_translit": "Moliusia v nastupnii intentsii:",
        "be": "Малюся ў наступнай інтэнцыі:",
        "be_translit": "Maliusia ŭ nastupnaj intencyji:",
        "zh": "我為以下意向祈禱：",
        "zh_translit": "Wǒ wèi yǐxià yìxiàng qídǎo:"
      },
      "user_intention_placeholder": true
    },
    "credo": {
      "name": {
        "pl": "Skład Apostolski",
        "it": "Credo Apostolico",
        "fr": "Symbole des Apôtres",
        "es": "Credo de los Apóstoles",
        "de": "Apostolisches Glaubensbekenntnis",
        "la": "Symbolum Apostolorum",
        "ru": "Апостольский Символ веры",
        "ru_translit": "Apostol'skiy Simvol very",
        "uk": "Апостольський Символ віри",
        "uk_translit": "Apostol's'kyi Symvol viry",
        "be": "Апостальскі Сымбаль веры",
        "be_translit": "Apostal'ski Symbal viery",
        "zh": "宗徒信經",
        "zh_translit": "Zōngtú Xìnjīng"
      },
      "text": {
        "pl": "Wierzę w Boga, Ojca Wszechmogącego, Stworzyciela nieba i ziemi. I w Jezusa Chrystusa, Syna Jego Jedynego, Pana naszego, który się począł z Ducha Świętego, narodził się z Maryi Panny, umęczon pod Ponckim Piłatem, ukrzyżowan, umarł i pogrzebion, zstąpił do piekieł, trzeciego dnia zmartwychwstał, wstąpił na niebiosa, siedzi po prawicy Boga Ojca Wszechmogącego, stamtąd przyjdzie sądzić żywych i umarłych. Wierzę w Ducha Świętego, święty Kościół powszechny, świętych obcowanie, grzechów odpuszczenie, ciała zmartwychwstanie, żywot wieczny. Amen.",
        "it": "Io credo in Dio, Padre onnipotente, creatore del cielo e della terra. E in Gesù Cristo, suo unico Figlio, nostro Signore, il quale fu concepito di Spirito Santo, nacque da Maria Vergine, patì sotto Ponzio Pilato, fu crocifisso, morì e fu sepolto; discese agli inferi; il terzo giorno risuscitò da morte; salì al cielo, siede alla destra di Dio Padre onnipotente: di là verrà a giudicare i vivi e i morti. Credo nello Spirito Santo, la santa Chiesa cattolica, la comunione dei santi, la remissione dei peccati, la risurrezione della carne, la vita eterna. Amen.",
        "fr": "Je crois en Dieu, le Père tout-puissant, créateur du ciel et de la terre. Et en Jésus-Christ, son Fils unique, notre Seigneur, qui a été conçu du Saint-Esprit, est né de la Vierge Marie, a souffert sous Ponce Pilate, a été crucifié, est mort et a été enseveli, est descendu aux enfers, le troisième jour est ressuscité des morts, est monté aux cieux, est assis à la droite de Dieu le Père tout-puissant, d'où il viendra juger les vivants et les morts. Je crois en l'Esprit Saint, à la sainte Église catholique, à la communion des saints, à la rémission des péchés, à la résurrection de la chair, à la vie éternelle. Amen.",
        "es": "Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.",
        "de": "Ich glaube an Gott, den Vater, den Allmächtigen, den Schöpfer des Himmels und der Erde. Und an Jesus Christus, seinen eingeborenen Sohn, unsern Herrn, empfangen durch den Heiligen Geist, geboren von der Jungfrau Maria, gelitten unter Pontius Pilatus, gekreuzigt, gestorben und begraben, hinabgestiegen in das Reich des Todes, am dritten Tage auferstanden von den Toten, aufgefahren in den Himmel; er sitzt zur Rechten Gottes, des allmächtigen Vaters; von dort wird er kommen, zu richten die Lebenden und die Toten. Ich glaube an den Heiligen Geist, die heilige katholische Kirche, Gemeinschaft der Heiligen, Vergebung der Sünden, Auferstehung der Toten und das ewige Leben. Amen.",
        "la": "Credo in Deum, Patrem omnipotentem, Creatorem caeli et terrae. Et in Iesum Christum, Filium eius unicum, Dominum nostrum: qui conceptus est de Spiritu Sancto, natus ex Maria Virgine, passus sub Pontio Pilato, crucifixus, mortuus, et sepultus, descendit ad inferos, tertia die resurrexit a mortuis, ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis, inde venturus est iudicare vivos et mortuos. Credo in Spiritum Sanctum, sanctam Ecclesiam catholicam, sanctorum communionem, remissionem peccatorum, carnis resurrectionem, vitam aeternam. Amen.",
        "ru": "Верую в Бога, Отца Всемогущего, Творца неба и земли. И в Иисуса Христа, единственного Его Сына, Господа нашего, Который был зачат от Духа Святого, родился от Марии Девы, страдал при Понтии Пилате, был распят, умер и погребён, сошёл в ад, в третий день воскрес из мёртвых, восшёл на небеса и сидит одесную Бога Отца Всемогущего, оттуда придёт судить живых и мёртвых. Верую в Духа Святого, святую Вселенскую Церковь, общение святых, отпущение грехов, воскресение тела, жизнь вечную. Аминь.",
        "ru_translit": "Veruyu v Boga, Ottsa Vsemogushchego, Tvortsa neba i zemli. I v Iisusa Khrista, yedinstvennogo Yego Syna, Gospoda nashego, Kotoryy byl zachat ot Dukha Svyatogo, rodilsya ot Marii Devy, stradal pri Pontii Pilate, byl raspyat, umer i pogreben, soshel v ad, v tretiy den' voskres iz mertvykh, vosshel na nebesa i sidit odesnuyu Boga Ottsa Vsemogushchego, ottuda pridet sudit' zhivykh i mertvykh. Veruyu v Dukha Svyatogo, svyatuyu Vselenskuyu Tserkov', obshcheniye svyatykh, otpushcheniye grekhov, voskreseniye tela, zhizn' vechnuyu. Amin'.",
        "uk": "Вірую в Бога, Отця всемогутнього, Творця неба і землі. І в Ісуса Христа, Сина Його Єдиного, Господа нашого, що зачався від Духа Святого, народився від Марії Діви, страждав за Понтія Пилата, був розп'ятий, помер і похований, зійшов до пекла, на третій день воскрес із мертвих, вознісся на небеса і сидить праворуч Бога Отця всемогутнього, звідки прийде судити живих і мертвих. Вірую в Духа Святого, святу Вселенську Церкву, святих обcування, гріхів відпущення, тіла воскресіння, життя вічне. Амінь.",
        "uk_translit": "Viruiu v Boha, Ottsia vsemohutn'oho, Tvortsia neba i zemli. I v Isusa Khrysta, Syna Yoho Yedynoho, Hospoda nashoho, shcho zachavsia vid Dukha Sviatoho, narodyvsia vid Marii Divy, strazhdav za Pontiia Pylata, buv rozp'iatyi, pomer i pokhovanyi, ziishov do pekla, na tretii den' voskres iz mertvykh, voznissia na nebesa i sydyt' pravoruch Boha Ottsia vsemohutn'oho, zvidky pryide sudyty zhyvykh i mertvykh. Viruiu v Dukha Sviatoho, sviatu Vselens'ku Tserkvu, sviatykh obtsuvannia, hrikhiv vidpushchennia, tila voskresinnia, zhyttia vichne. Amin'.",
        "be": "Веру ў Бога, Айца ўсемагутнага, Стварыцеля неба і зямлі. І ў Езуса Хрыста, Сына Яго Адзінароднага, Госпада нашага, які зачаўся з Духа Сьвятога, нарадзіўся з Марыі Панны, цярпеў пад Понцкім Пілатам, быў укрыжаваны, памёр і пахаваны, сышоў да пекла, на трэці дзень уваскрос, узышоў на нябёсы, сядзіць праваруч Бога Айца ўсемагутнага, адтуль прыйдзе судзіць жывых і памёрлых. Веру ў Духа Сьвятога, сьвяты Касьцёл паўсюдны, абцаваньне сьвятых, адпушчэньне грахоў, цела ўваскрашэньне, жыцьцё вечнае. Амэн.",
        "be_translit": "Vieru ŭ Boha, Ajca ŭsiemahutnaha, Stvarycielia nieba i ziamli. I ŭ Jezusa Chrysta, Syna Jaho Adzinarodnaha, Hospada našaha, jaki začaŭsia z Ducha Sviataha, naradziŭsia z Maryji Panny, ciarpieŭ pad Pontskim Pilatam, byŭ ukryžavany, pamior i pachavany, syšoŭ da piekla, na treci dzień uvaskros, uzyšoŭ na niabiosy, siadzić pravaruč Boha Ajca ŭsiemahutnaha, adtul' pryjdzie sudzić žyvych i pamiorlych. Vieru ŭ Ducha Sviataha, sviaty Kaścioł paŭsiudny, abcavańnie sviatych, adpuščeńnie hrachoŭ, ciela uvaskrašeńnie, žyćcio viečnaje. Amen.",
        "zh": "我信全能者天主父，天地萬物的創造者。我信祂的唯一子、我們的主耶穌基督。祂因聖神降孕，由童貞瑪利亞誕生。祂在比拉多執政時蒙難，被釘在十字架上，死而安葬。祂下降陰府，第三日從死者中復活。祂升了天，坐在全能者天主父的右邊。祂要從天降來，審判生者死者。我信聖神。我信聖而公教會、諸聖相通功、罪過的赦免、肉身的復活、永恆的生命。阿們。",
        "zh_translit": "Wǒ xìn quánnéng zhě Tiānzhǔ Fù, tiāndì wànwù de chuàngzào zhě. Wǒ xìn tā de wéiyī Zǐ, wǒmen de Zhǔ Yēsū Jīdū. Tā yīn Shèngshén jiàng yùn, yóu tóngzhēn Mǎlìyǎ dànshēng. Tā zài Bǐlāduō zhízhèng shí méngnàn, bèi dīng zài shízìjià shàng, sǐ ér ānzàng. Tā xiàjiàng yīnfǔ, dì sān rì cóng sǐzhě zhōng fùhuó. Tā shēngle tiān, zuò zài quánnéng zhě Tiānzhǔ Fù de yòubiān. Tā yào cóng tiān jiàng lái, shěnpàn shēng zhě sǐ zhě. Wǒ xìn Shèngshén. Wǒ xìn shèng ér gōng jiàohuì, zhū shèng xiāngtōng gōng, zuìguò de shèmiǎn, ròushēn de fùhuó, yǒnghéng de shēngmìng. Āmen."
      }
    },
    "pater_noster": {
      "name": {
        "pl": "Ojcze nasz",
        "it": "Padre Nostro",
        "fr": "Notre Père",
        "es": "Padre Nuestro",
        "de": "Vater unser",
        "la": "Pater Noster",
        "ru": "Отче наш",
        "ru_translit": "Otche nash",
        "uk": "Отче наш",
        "uk_translit": "Otche nash",
        "be": "Ойча наш",
        "be_translit": "Ojča naš",
        "zh": "天主經",
        "zh_translit": "Tiānzhǔ jīng"
      },
      "text": {
        "pl": "Ojcze nasz, któryś jest w niebie, święć się imię Twoje, przyjdź królestwo Twoje, bądź wola Twoja jako w niebie, tak i na ziemi. Chleba naszego powszedniego daj nam dzisiaj, i odpuść nam nasze winy, jako i my odpuszczamy naszym winowajcom, i nie wódź nas na pokuszenie, ale nas zbaw ode złego. Amen.",
        "it": "Padre nostro, che sei nei cieli, sia santificato il tuo nome, venga il tuo regno, sia fatta la tua volontà, come in cielo così in terra. Dacci oggi il nostro pane quotidiano, e rimetti a noi i nostri debiti come noi li rimettiamo ai nostri debitori, e non abbandonarci alla tentazione, ma liberaci dal male. Amen.",
        "fr": "Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés. Et ne nous laisse pas entrer en tentation, mais délivre-nous du Mal. Amen.",
        "es": "Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu Reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén.",
        "de": "Vater unser im Himmel, geheiligt werde dein Name. Dein Reich komme. Dein Wille geschehe, wie im Himmel, so auf Erden. Unser tägliches Brot gib uns heute. Und vergib uns unsere Schuld, wie auch wir vergeben unsern Schuldigern. Und führe uns nicht in Versuchung, sondern erlöse uns von dem Bösen. Amen.",
        "la": "Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum quotidianum da nobis hodie, et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.",
        "ru": "Отче наш, сущий на небесах, да святится имя Твоё, да приидет Царствие Твоё, да будет воля Твоя и на земле, как на небе. Хлеб наш насущный дай нам на сей день; и прости нам долги наши, как и мы прощаем должникам нашим; и не введи нас в искушение, но избавь нас от лукавого. Аминь.",
        "ru_translit": "Otche nash, sushchiy na nebesakh, da svyatitsya imya Tvoyo, da priidet Tsarstviye Tvoyo, da budet volya Tvoya i na zemle, kak na nebe. Khleb nash nasushchnyy day nam na sey den'; i prosti nam dolgi nashi, kak i my proshchayem dolzhnikam nashim; i ne vvedi nas v iskusheniye, no izbav' nas ot lukavogo. Amin'.",
        "uk": "Отче наш, що єси на небесах, нехай святиться ім'я Твоє, нехай прийде Царство Твоє, нехай буде воля Твоя як на небі, так і на землі. Хліб наш насущний дай нам сьогодні; і прости нам провини наші, як і ми прощаємо винуватцям нашим; і не введи нас у спокусу, але визволи нас від лукавого. Амінь.",
        "uk_translit": "Otche nash, shcho yesy na nebesakh, nekhai sviatyt'sia im'ia Tvoie, nekhai pryide Tsarstvo Tvoie, nekhai bude volia Tvoia yak na nebi, tak i na zemli. Khlib nash nasushchnyi dai nam s'ohodni; i prosty nam provyny nashi, yak i my proshchaiemo vynuvattsiam nashym; i ne vvedy nas u spokusu, ale vyzvoly nas vid lukavoho. Amin'.",
        "be": "Ойча наш, які ёсьць у небе, сьвяціся імя Тваё, прыйдзі Валадарства Тваё, будзь воля Твая як у небе, так і на зямлі. Хлеба нашага штодзённага дай нам сёньня, і адпусьці нам правіны нашыя, як і мы адпускаем вінаватым нашым, і не ўводзь нас у спакусу, але збаў нас ад злога. Амэн.",
        "be_translit": "Ojča naš, jaki josć u niebie, sviacisia imja Tvajo, pryjdzi Vаladarstva Tvajo, budź volia Tvaja jak u niebie, tak i na ziamli. Chlieba našaha štodzionnaha daj nam sionnia, i adpusci nam praviny našyja, jak i my adpuskajem vinavatym našym, i nie ŭvodź nas u spakusu, alie zbaŭ nas ad zloha. Amen.",
        "zh": "我們的天父，願祢的名受顯揚；願祢的國來臨；願祢的旨意奉行在人間，如同在天上。求祢今天賞給我們日用的食糧；求祢寬恕我們的罪過，如同我們寬恕別人一樣；不要讓我們陷於誘惑，但救我們免於凶惡。阿們。",
        "zh_translit": "Wǒmen de Tiānfù, yuàn nǐ de míng shòu xiǎnyáng; yuàn nǐ de guó láilín; yuàn nǐ de zhǐyì fèngxíng zài rénjiān, rútóng zài tiānshàng. Qiú nǐ jīntiān shǎng gěi wǒmen rìyòng de shíliáng; qiú nǐ kuānshù wǒmen de zuìguò, rútóng wǒmen kuānshù biérén yīyàng; bùyào ràng wǒmen xiànyú yòuhuò, dàn jiù wǒmen miǎn yú xiōng'è. Āmen."
      }
    },
    "ave_maria": {
      "name": {
        "pl": "Zdrowaś Maryjo",
        "it": "Ave Maria",
        "fr": "Je vous salue Marie",
        "es": "Ave María",
        "de": "Gegrüßet seist du, Maria",
        "la": "Ave Maria",
        "ru": "Радуйся, Мария",
        "ru_translit": "Raduysya, Mariya",
        "uk": "Радуйся, Маріє",
        "uk_translit": "Raduisia, Marie",
        "be": "Вітай, Марыя",
        "be_translit": "Vitaj, Maryja",
        "zh": "聖母經",
        "zh_translit": "Shèngmǔ jīng"
      },
      "text": {
        "pl": "Zdrowaś Maryjo, łaski pełna, Pan z Tobą, błogosławionaś Ty między niewiastami, i błogosławiony owoc żywota Twojego, Jezus. Święta Maryjo, Matko Boża, módl się za nami grzesznymi teraz i w godzinę śmierci naszej. Amen.",
        "it": "Ave Maria, piena di grazia, il Signore è con te. Tu sei benedetta fra le donne e benedetto è il frutto del tuo seno, Gesù. Santa Maria, Madre di Dio, prega per noi peccatori, adesso e nell'ora della nostra morte. Amen.",
        "fr": "Je vous salue, Marie, pleine de grâce, le Seigneur est avec vous, vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous, pauvres pécheurs, maintenant et à l'heure de notre mort. Amen.",
        "es": "Dios te salve María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.",
        "de": "Gegrüßet seist du, Maria, voll der Gnade, der Herr ist mit dir. Du bist gebenedeit unter den Frauen, und gebenedeit ist die Frucht deines Leibes, Jesus. Heilige Maria, Mutter Gottes, bitte für uns Sünder jetzt und in der Stunde unseres Todes. Amen.",
        "la": "Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen.",
        "ru": "Радуйся, Мария, благодати полная, Господь с Тобою; благословенна Ты между жёнами, и благословен плод чрева Твоего Иисус. Святая Мария, Матерь Божия, молись о нас, грешных, ныне и в час смерти нашей. Аминь.",
        "ru_translit": "Raduysya, Mariya, blagodati polnaya, Gospod' s Toboyu; blagoslovenna Ty mezhdu zhenami, i blagosloven plod chreva Tvoyego Iisus. Svyataya Mariya, Mater' Bozhiya, molis' o nas, greshnykh, nyne i v chas smerti nashey. Amin'.",
        "uk": "Радуйся, Маріє, благодаті повна, Господь з Тобою; благословенна Ти між жінками, і благословенний плід лона Твого, Ісус. Свята Маріє, Мати Божа, молися за нас, грішних, нині і в годину смерті нашої. Амінь.",
        "uk_translit": "Raduisia, Marie, blahodati povna, Hospod' z Toboiu; blahoslovenna Ty mizh zhinkamy, i blahoslovennyi plid lona Tvoho, Isus. Sviata Marie, Maty Bozha, molysia za nas, hrishnykh, nyni i v hodynu smerti nashoi. Amin'.",
        "be": "Вітай, Марыя, ласкі поўная, Госпад з Табою, благаслаўлёная Ты між жанчынамі і благаслаўлёны плод улоньня Твайго, Езус. Сьвятая Марыя, Маці Божая, маліся за нас грэшных цяпер і ў хвіліну сьмерці нашай. Амэн.",
        "be_translit": "Vitaj, Maryja, łaski poŭnaja, Hospad z Taboju, blahasłaŭlonaja Ty miž žančynami i blahasłaŭlony płod uloŭnia Tvajho, Jezus. Sviataja Maryja, Maci Božaja, malisia za nas hrešnych ciapier i ŭ chvilinu smierci našaj. Amen.",
        "zh": "萬福瑪利亞，妳充滿聖寵！主與妳同在。妳在婦女中受讚頌，妳的親生子耶穌同受讚頌。天主聖母瑪利亞，求妳現在和我們臨終時，為我們罪人祈求天主。阿們。",
        "zh_translit": "Wànfú Mǎlìyǎ, nǐ chōngmǎn shèng chǒng! Zhǔ yǔ nǐ tóng zài. Nǐ zài fùnǚ zhōng shòu zànsòng, nǐ de qīnshēng zǐ Yēsū tóng shòu zànsòng. Tiānzhǔ shèngmǔ Mǎlìyǎ, qiú nǐ xiànzài hé wǒmen línzhōng shí, wèi wǒmen zuìrén qíqiú Tiānzhǔ. Āmen."
      }
    },
    "gloria_patri": {
      "name": {
        "pl": "Chwała Ojcu",
        "it": "Gloria al Padre",
        "fr": "Gloire au Père",
        "es": "Gloria al Padre",
        "de": "Ehre sei dem Vater",
        "la": "Gloria Patri",
        "ru": "Слава Отцу",
        "ru_translit": "Slava Ottsu",
        "uk": "Слава Отцю",
        "uk_translit": "Slava Ottsiu",
        "be": "Хвала Айцу",
        "be_translit": "Chvala Ajcu",
        "zh": "聖三光榮經",
        "zh_translit": "Shèngsān guāngróng jīng"
      },
      "text": {
        "pl": "Chwała Ojcu i Synowi, i Duchowi Świętemu. Jak była na początku, teraz i zawsze, i na wieki wieków. Amen.",
        "it": "Gloria al Padre e al Figlio e allo Spirito Santo. Come era nel principio, e ora e sempre, nei secoli dei secoli. Amen.",
        "fr": "Gloire au Père, et au Fils, et au Saint-Esprit. Comme il était au commencement, maintenant et toujours, et dans les siècles des siècles. Amen.",
        "es": "Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",
        "de": "Ehre sei dem Vater und dem Sohn und dem Heiligen Geist, wie im Anfang, so auch jetzt und alle Zeit und in Ewigkeit. Amen.",
        "la": "Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc, et semper, et in saecula saeculorum. Amen.",
        "ru": "Слава Отцу и Сыну, и Святому Духу. И ныне и присно, и во веки веков. Аминь.",
        "ru_translit": "Slava Ottsu i Synu, i Svyatomu Dukhu. I nyne i prisno, i vo veki vekov. Amin'.",
        "uk": "Слава Отцю, і Сину, і Святому Духові. Як було споконвіку, тепер і повсякчас, і на віки віків. Амінь.",
        "uk_translit": "Slava Ottsiu, i Synu, i Sviatomu Dukhovi. Yak bulo spokonviku, teper i povsiakchas, i na viky vikiv. Amin'.",
        "be": "Хвала Айцу і Сыну, і Сьвятому Духу. Як была спрадвеку, цяпер і заўсёды, і на векі вечныя. Амэн.",
        "be_translit": "Chvala Ajcu i Synu, i Sviatomu Duchu. Jak była spradvieku, ciapier i zaŭsiody, i na vieki viečnyja. Amen.",
        "zh": "願光榮歸於父、及子、及聖神，起初如何，今日亦然，直到永遠。阿們。",
        "zh_translit": "Yuàn guāngróng guī yú Fù, jí Zǐ, jí Shèngshén, qǐchū rúhé, jīnrì yìrán, zhídào yǒngyuǎn. Āmen."
      }
    },
    "sub_tuum_praesidium": {
      "name": {
        "pl": "Pod Twoją obronę",
        "it": "Sotto la tua protezione",
        "fr": "Sous votre protection",
        "es": "Bajo tu amparo",
        "de": "Unter deinen Schutz",
        "la": "Sub tuum praesidium",
        "ru": "Под Твою защиту",
        "ru_translit": "Pod Tvoyu zashchitu",
        "uk": "Під Твій покров",
        "uk_translit": "Pid Tvii pokrov",
        "be": "Пад Тваю абарону",
        "be_translit": "Pad Tvaju abaronu",
        "zh": "天主之母經",
        "zh_translit": "Tiānzhǔ zhī Mǔ jīng"
      },
      "text": {
        "pl": "Pod Twoją obronę uciekamy się, święta Boża Rodzicielko, naszymi prośbami racz nie gardzić w potrzebach naszych, ale od wszelakich złych przygód racz nas zawsze wybawiać, Panno chwalebna i błogosławiona. O Pani nasza, Orędowniczko nasza, Pośredniczko nasza, Pocieszycielko nasza. Z Synem swoim nas pojednaj, Synowi swojemu nas polecaj, swojemu Synowi nas oddawaj. Amen.",
        "it": "Sotto la tua protezione cerchiamo rifugio, Santa Madre di Dio: non disprezzare le suppliche di noi che siamo nella prova, e liberaci da ogni pericolo, o Vergine gloriosa e benedetta. Amen.",
        "fr": "Sous votre protection, nous cherchons un refuge, sainte Mère de Dieu. N'écartez pas les prières que nous vous adressons dans nos besoins, mais délivrez-nous toujours de tous les dangers, ô Vierge glorieuse et bénie. Amen.",
        "es": "Bajo tu amparo nos acogemos, Santa Madre de Dios; no deseches las oraciones que te dirigimos en nuestras necesidades, antes bien líbranos de todo peligro, oh Virgen gloriosa y bendita. Amén.",
        "de": "Unter deinen Schutz und Schirm fliehen wir, o heilige Gottesmutter; verschmähe nicht unser Gebet in unseren Nöten, sondern erlöse uns jederzeit von allen Gefahren, o du glorreiche und gebenedeite Jungfrau. Amen.",
        "la": "Sub tuum praesidium confugimus, sancta Dei Genetrix; nostras deprecationes ne despicias in necessitatibus nostris, sed a periculis cunctis libera nos semper, Virgo gloriosa et benedicta. Amen.",
        "ru": "Под Твою защиту прибегаем, Святая Богородица! Не презри молений наших в скорбях наших, но от всех опасностей избавляй нас всегда, Дева преславная и благословенная. Аминь.",
        "ru_translit": "Pod Tvoyu zashchitu pribegayem, Svyataya Bogoroditsa! Ne prezri moleniy nashikh v skorbyakh nashikh, no ot vsekh opasnostey izbavlyay nas vsegda, Deva preslavnaya i blagoslovennaya. Amin'.",
        "uk": "Під Твій покров прибігаємо, Свята Богородице! Не погорди молитвами нашими в скорботах наших, але від усяких бід визволяй нас завжди, Діво преславна і благословенна. Амінь.",
        "uk_translit": "Pid Tvii pokrov prybihaiemo, Sviata Bohorodytse! Ne pohordy molytvamy nashymy v skorbotakh nashykh, ale vid usiakykh bid vyzvoliai nas zavzhdy, Divo preslavna i blahoslovenna. Amin'.",
        "be": "Пад Тваю абарону ўцякаемся, сьвятая Багародзіца! Не пагардзі малітвамі нашымі ў патрэбах нашых, але ад усялякіх злых прыгодаў выбаўляй нас заўсёды, Панна слаўная і благаслаўлёная. Амэн.",
        "be_translit": "Pad Tvaju abaronu ŭciakajemsia, sviataja Bahorodzica! Nie pahardzi malitvami našymi ŭ patrebach našych, alie ad usialakich zlych pryhodaŭ vybaŭliaj nas zaŭsiody, Panna slaŭnaja i blahasłaŭlonaja. Amen.",
        "zh": "天主聖母，我們投奔到妳的庇護之下，當我們處於患難中時，請不要拒絕我們的祈求，且常救我們脫離凶險。可讚美又榮福的童貞瑪利亞。阿們。",
        "zh_translit": "Tiānzhǔ shèngmǔ, wǒmen tóubēn dào nǐ de bìhù zhī xià, dāng wǒmen chǔyú huànnàn zhōng shí, qǐng bùyào jùjué wǒmen de qíqiú, qiě cháng jiù wǒmen tuōlí xiōngxiǎn. Kě zànměi yòu róngfú de tóngzhēn Mǎlìyǎ. Āmen."
      }
    },
    "prayer_supplicatory": {
      "name": {
        "pl": "Modlitwa błagalna",
        "it": "Preghiera di supplica",
        "fr": "Prière de supplication",
        "es": "Oración de súplica",
        "de": "Bittgebet",
        "la": "Oratio supplicans",
        "ru": "Молитва прошения",
        "ru_translit": "Molitva prosheniya",
        "uk": "Молитва благальна",
        "uk_translit": "Molytva blahal'na",
        "be": "Малітва ўмольная",
        "be_translit": "Malitva ŭmol'naja",
        "zh": "祈求禱文",
        "zh_translit": "Qíqiú dǎowén"
      },
      "_author": "bł. Bartolo Longo (†1926, domena publiczna)",
      "_phase": "supplicatory (dni 1-27)",
      "text": {
        "pl": "Pomnij, o miłosierna Panno Różańcowa z Pompejów, jako nigdy jeszcze nie słyszano, aby ktokolwiek z czcicieli Twoich, z różańcem Twoim, pomocy Twojej wzywający, miał być przez Ciebie opuszczony. Ach, nie gardź prośbą moją, o Matko Słowa Przedwiecznego, ale przez święty Twój różaniec i przez upodobanie, jakie okazujesz dla Twojej świątyni w Pompejach, wysłuchaj mnie dobrotliwie. Amen.",
        "it": "Ricordati, o pietosa Vergine del Rosario di Pompei, non essersi mai udito al mondo che alcuno abbia ricorso al tuo Rosario, ed abbia implorato il tuo aiuto, e sia stato da Te abbandonato. Animato da tale fiducia, a Te ricorro, o Madre del Verbo: e per il Santo Rosario e pel diletto che mostri al tuo Santuario di Pompei, ascoltami benignamente. Amen.",
        "fr": "Souviens-toi, ô miséricordieuse Vierge du Rosaire de Pompéi, qu'on n'a jamais entendu dire qu'aucun de tes dévots, qui t'a invoquée par ton Rosaire, ait été abandonné par toi. Plein de cette confiance, je viens à toi, ô Mère du Verbe : par ton saint Rosaire et par ta prédilection pour ton Sanctuaire de Pompéi, écoute-moi favorablement. Amen.",
        "es": "Acuérdate, oh misericordiosa Virgen del Rosario de Pompeya, que jamás se ha oído decir en el mundo que alguno de cuantos han acudido a tu Rosario implorando tu auxilio, haya sido abandonado por Ti. Animado por esta confianza acudo a Ti, oh Madre del Verbo Eterno: por tu santo Rosario y por la predilección que muestras hacia tu Santuario de Pompeya, escúchame benignamente. Amén.",
        "de": "Gedenke, o gnadenvolle Jungfrau vom Rosenkranz von Pompeji, dass es noch nie gehört wurde, dass jemand, der zu deinem Rosenkranz seine Zuflucht nahm und dich um Hilfe anrief, von dir verlassen worden sei. Voll dieses Vertrauens komme ich zu dir, o Mutter des ewigen Wortes: durch deinen heiligen Rosenkranz und durch deine Vorliebe für dein Heiligtum von Pompeji, erhöre mich gnädig. Amen.",
        "la": "Memorare, o piissima Virgo Rosarii Pompeiana, non esse auditum a saeculo, quemquam ad Rosarium tuum confugientem, et auxilium tuum implorantem, a te derelictum fuisse. Hac freti fiducia, ad te confugimus, o Mater Verbi: per Rosarium tuum sanctum et per delectationem quam ostendis pro Sanctuario tuo Pompeiano, exaudi nos benigne. Amen.",
        "ru": "Вспомни, о милосердная Дева Розария Помпейская, что никогда не было слышно, чтобы кто-либо из обращавшихся к Твоему Розарию и просивших Твоей помощи был Тобою оставлен. Полный этого упования, прибегаю к Тебе, о Матерь Предвечного Слова: ради Твоего святого Розария и ради благоволения, которое Ты являешь Твоему Святилищу в Помпеях, выслушай меня милостиво. Аминь.",
        "ru_translit": "Vspomni, o miloserdnaya Deva Rozariya Pompeyskaya, chto nikogda ne bylo slyshno, chtoby kto-libo iz obrashchavshikhsya k Tvoyemu Rozariyu i prosivshikh Tvoyey pomoshchi byl Toboyu ostavlen. Polnyy etogo upovaniya, pribegayu k Tebe, o Mater' Predvechnogo Slova: radi Tvoyego svyatogo Rozariya i radi blagovoleniya, kotoroye Ty yavlyayesh' Tvoyemu Svyatilishchu v Pompeyakh, vyslushay menya milostivo. Amin'.",
        "uk": "Згадай, о милосердна Діво Розарія Помпейська, що ніколи не було чути, щоб хтось з тих, хто звертався до Твого Розарія і просив Твоєї допомоги, був Тобою залишений. Сповнений цієї довіри, вдаюся до Тебе, о Мати Передвічного Слова: заради Твого святого Розарія і заради прихильності, яку Ти виявляєш Твоєму Святилищу в Помпеях, вислухай мене ласкаво. Амінь.",
        "uk_translit": "Zhadai, o myloserdna Divo Rozariia Pompeis'ka, shcho nikoly ne bulo chuty, shchob khtos' z tykh, khto zvertavsia do Tvoho Rozariia i prosyv Tvoiei dopomohy, buv Toboiu zalyshenyi. Spovnenyi tsiiei doviry, vdaiusia do Tebe, o Maty Peredvichnoho Slova: zarady Tvoho sviatoho Rozariia i zarady prykhyl'nosti, yaku Ty vyiavliaiesh Tvoiemu Sviatylyshchu v Pompeiakh, vyslukhai mene laskavo. Amin'.",
        "be": "Прыпомні, о міласэрная Панна Ружанца Пампейская, што ніколі ня было чуваць, каб хто з прыхільнікаў Тваіх, з Ружанцом Тваім, дапамогі Тваёй просячы, быў Табой пакінуты. Поўны гэтай даверы, прыходжу да Цябе, о Маці Прадвечнага Слова: дзеля сьвятога Ружанца Твайго і дзеля ўпадабаньня, якое выказваеш да Твайго Сьвятыні ў Пампеях, выслухай мяне ласкава. Амэн.",
        "be_translit": "Prypomni, o miłaserdnaja Panna Ružanca Pampiejskaja, što nikoli nia było čuvać, kab chto z pryčylnikaŭ Tvaich, z Ružancom Tvaim, dapamohi Tvajoj prosiačy, byŭ Taboj pakinuty. Poŭny hetaj davery, prychodžu da Ciabie, o Maci Pradviečnaha Słova: dziela sviataha Ružanca Tvajho i dziela upadabaŭnia, jakoje vykazvaješ da Tvajho Sviatyni ŭ Pampiejach, vysluchaj mianie łaskava. Amen.",
        "zh": "請垂念，慈悲的龐貝玫瑰聖母，從來未曾聽說，凡投奔妳玫瑰經、懇求妳救助的人被妳遺棄。我懷著這份信賴投奔妳，永恆聖言之母：因妳神聖的玫瑰經，並因妳對龐貝聖殿的眷愛，求妳慈祥垂聽我的祈求。阿們。",
        "zh_translit": "Qǐng chuíniàn, cíbēi de Pángbèi méiguī shèngmǔ, cónglái wèicéng tīngshuō, fán tóubēn nǐ méiguī jīng, kěnqiú nǐ jiùzhù de rén bèi nǐ yíqì. Wǒ huáizhe zhè fèn xìnlài tóubēn nǐ, yǒnghéng shèngyán zhī mǔ: yīn nǐ shénshèng de méiguī jīng, bìng yīn nǐ duì Pángbèi shèngdiàn de juàn'ài, qiú nǐ cíxiáng chuítīng wǒ de qíqiú. Āmen."
      }
    },
    "prayer_thanksgiving": {
      "name": {
        "pl": "Modlitwa dziękczynna",
        "it": "Preghiera di ringraziamento",
        "fr": "Prière d'action de grâces",
        "es": "Oración de acción de gracias",
        "de": "Dankgebet",
        "la": "Oratio gratiarum actionis",
        "ru": "Молитва благодарения",
        "ru_translit": "Molitva blagodareniya",
        "uk": "Молитва подяки",
        "uk_translit": "Molytva podiaky",
        "be": "Малітва падзякі",
        "be_translit": "Malitva padziaki",
        "zh": "感恩禱文",
        "zh_translit": "Gǎn'ēn dǎowén"
      },
      "_author": "bł. Bartolo Longo (†1926, domena publiczna)",
      "_phase": "thanksgiving (dni 28-54)",
      "text": {
        "pl": "Cóż Ci dać mogę, o Królowo pełna miłości? Moje całe życie poświęcam Tobie. Ile mi sił starczy, będę rozszerzać cześć Twoją, o Dziewico Różańca Świętego z Pompejów, bo gdy Twojej pomocy wezwałem, nawiedziła mnie łaska Boża. Wszędzie będę opowiadać o miłosierdziu, które mi wyświadczyłaś. O ile zdołam, będę rozszerzać nabożeństwo do Różańca Świętego, wszystkim głosić będę, jak dobrotliwie obeszłaś się ze mną, aby i niegodni, tak jak ja, grzesznicy, z zaufaniem do Ciebie się udawali. O, gdyby cały świat wiedział, jak jesteś dobra, jaką masz litość nad cierpiącymi, wszystkie stworzenia uciekałyby się do Ciebie. Amen.",
        "it": "Che potrò io darti, o Regina piena d'amore? La mia povera vita la consacro a Te. Per quanto è in me, propagherò il tuo culto, o Vergine del Rosario di Pompei, perché quando ho invocato il tuo aiuto, è scesa su di me la grazia di Dio. Dovunque racconterò la misericordia che mi hai usata. Per quanto potrò, diffonderò la devozione al Santo Rosario, dirò a tutti come Tu sei stata buona con me, perché anche gli indegni, come io sono, peccatori, ricorrano a Te con fiducia. Oh, se il mondo intero sapesse quanto sei buona, quanta pietà hai dei sofferenti, tutte le creature ricorrerebbero a Te. Amen.",
        "fr": "Que pourrais-je te donner, ô Reine pleine d'amour ? Je te consacre toute ma vie. Autant que je le pourrai, je propagerai ton culte, ô Vierge du Rosaire de Pompéi, car lorsque j'ai invoqué ton aide, la grâce de Dieu est descendue sur moi. Partout je raconterai la miséricorde dont tu as usé envers moi. Autant que je le pourrai, je propagerai la dévotion au Saint Rosaire, je dirai à tous combien tu as été bonne envers moi, afin que les indignes, comme moi, pécheurs, recourent à toi avec confiance. Oh, si le monde entier savait combien tu es bonne, quelle pitié tu as pour les souffrants, toutes les créatures auraient recours à toi. Amen.",
        "es": "¿Qué podría darte, oh Reina llena de amor? Toda mi vida la consagro a Ti. Mientras tenga fuerzas, propagaré tu culto, oh Virgen del Rosario de Pompeya, porque cuando invoqué tu auxilio, descendió sobre mí la gracia de Dios. En todas partes contaré la misericordia que has tenido conmigo. Cuanto pueda, propagaré la devoción al Santo Rosario, diré a todos cuán buena has sido conmigo, para que también los indignos, como yo, pecadores, acudan a Ti con confianza. Oh, si el mundo entero supiera cuán buena eres, cuánta piedad tienes con los que sufren, todas las criaturas acudirían a Ti. Amén.",
        "de": "Was kann ich dir geben, o Königin voller Liebe? Mein ganzes Leben weihe ich dir. Soweit meine Kräfte reichen, werde ich deine Verehrung ausbreiten, o Jungfrau vom Rosenkranz von Pompeji, denn als ich deine Hilfe anrief, kam die Gnade Gottes auf mich herab. Überall werde ich von der Barmherzigkeit erzählen, die du mir erwiesen hast. Soweit ich kann, werde ich die Andacht zum heiligen Rosenkranz verbreiten, allen werde ich verkünden, wie gütig du an mir gehandelt hast, damit auch die Unwürdigen wie ich, Sünder, mit Vertrauen zu dir kommen. Oh, wüsste die ganze Welt, wie gut du bist, welch Erbarmen du mit den Leidenden hast, alle Geschöpfe würden zu dir ihre Zuflucht nehmen. Amen.",
        "la": "Quid Tibi dare possum, o Regina amoris plena? Totam vitam meam Tibi consecro. Quantum in me est, cultum tuum propagabo, o Virgo Rosarii Pompeiana, quia cum auxilium tuum imploravi, descendit super me gratia Dei. Ubique narrabo misericordiam quam mihi praestitisti. Quantum potero, devotionem sancti Rosarii diffundam, omnibus dicam quam bona fueris erga me, ut etiam indigni sicut ego peccatores cum fiducia ad Te confugiant. O, si totus mundus sciret quam bona sis, quantam misericordiam habeas erga patientes, omnes creaturae ad Te confugerent. Amen.",
        "ru": "Что я могу Тебе дать, о Царица, исполненная любви? Всю мою жизнь посвящаю Тебе. Сколько хватит сил, я буду распространять Твоё почитание, о Дева Розария Помпейская, ибо когда я призвал Твою помощь, на меня сошла благодать Божия. Повсюду буду рассказывать о милосердии, которое Ты мне явила. Сколько смогу, буду распространять почитание Святого Розария, всем буду возвещать, как милостиво Ты обошлась со мною, чтобы и недостойные, как я, грешники, с упованием прибегали к Тебе. О, если бы весь мир знал, как Ты добра, какое сострадание имеешь к страждущим, все творения прибегали бы к Тебе. Аминь.",
        "ru_translit": "Chto ya mogu Tebe dat', o Tsaritsa, ispolnennaya lyubvi? Vsyu moyu zhizn' posvyashchayu Tebe. Skol'ko khvatit sil, ya budu rasprostranyat' Tvoye pochitaniye, o Deva Rozariya Pompeyskaya, ibo kogda ya prizval Tvoyu pomoshch', na menya soshla blagodat' Bozhiya. Povsyudu budu rasskazyvat' o miloserdii, kotoroye Ty mne yavila. Skol'ko smogu, budu rasprostranyat' pochitaniye Svyatogo Rozariya, vsem budu vozveshchat', kak milostivo Ty oboshlas' so mnoyu, chtoby i nedostoynyye, kak ya, greshniki, s upovaniyem pribegali k Tebe. O, yesli by ves' mir znal, kak Ty dobra, kakoye sostradaniye imeyesh' k strazhdushchim, vse tvoreniya pribegali by k Tebe. Amin'.",
        "uk": "Що я можу Тобі дати, о Царице, повна любові? Все моє життя присвячую Тобі. Скільки сил вистачить, буду поширювати Твоє вшанування, о Діво Розарія Помпейська, бо коли я призвав Твоєї допомоги, на мене зійшла благодать Божа. Скрізь розповідатиму про милосердя, яке Ти мені виявила. Скільки зможу, буду поширювати побожність до Святого Розарія, всім буду звіщати, як ласкаво Ти зі мною повелася, щоб і негідні, як я, грішники, з довірою до Тебе вдавалися. О, якби весь світ знав, яка Ти добра, яке маєш співчуття до страждущих, усе творіння до Тебе вдавалося б. Амінь.",
        "uk_translit": "Shcho ya mozhu Tobi daty, o Tsarytse, povna liubovi? Vse moie zhyttia prysviachuiu Tobi. Skil'ky syl vystachyt', budu poshyriuvaty Tvoie vshanuvannia, o Divo Rozariia Pompeis'ka, bo koly ya pryzvav Tvoiei dopomohy, na mene ziishla blahodat' Bozha. Skriz' rozpovidatymu pro myloserdia, yake Ty meni vyiavyla. Skil'ky zmozhu, budu poshyriuvaty pobozhnist' do Sviatoho Rozariia, vsim budu zvishchaty, yak laskavo Ty zi mnoiu povelasia, shchob i nehidni, yak ya, hrishnyky, z doviroiu do Tebe vdavalysia. O, yakby ves' svit znav, yaka Ty dobra, yake maiesh spivchuttia do strazhdushchykh, use tvorinnia do Tebe vdavalosia b. Amin'.",
        "be": "Што я магу Табе даць, о Каралева, поўная любові? Усё маё жыцьцё прысьвячаю Табе. Колькі хопіць сілы, буду пашыраць Тваю чэсць, о Дзева Ружанца Пампейская, бо калі я заклікаў Тваёй дапамогі, сышла на мяне Божая ласка. Усюды буду расказваць пра міласэрнасьць, якую Ты мне аказала. Колькі здолею, буду пашыраць набажэнства да Сьвятога Ружанца, усім буду абвяшчаць, як ласкава Ты са мною абышлася, каб і нягодныя, як я, грэшнікі, з даверам да Цябе зьвярталіся. О, калі б увесь сьвет ведаў, якая Ты добрая, якую маеш літасьць над цярпячымі, усе стварэньні да Цябе зьвярталіся б. Амэн.",
        "be_translit": "Što ja mahu Tabie dać, o Karaleva, poŭnaja lubovi? Usio majo žyćcio prysviačaju Tabie. Kol'ki chopić siły, budu pašyrać Tvaju česć, o Dzieva Ružanca Pampiejskaja, bo kali ja zaklikaŭ Tvajoj dapamohi, sysła na mianie Božaja łaska. Usiudy budu raskazvać pra miłaserdnasć, jakuju Ty mnie akazała. Kol'ki zdoleju, budu pašyrać nabaženstva da Sviataha Ružanca, usim budu abviaščać, jak łaskava Ty sa mnoju abyšlasia, kab i niahodnyja, jak ja, hrešniki, z davieram da Ciabie zviartalisia. O, kali b uvieś sviet viedaŭ, jakaja Ty dobraja, jakuju maješ litasć nad ciarpiačymi, usie stvareńnia da Ciabie zviartalisia b. Amen.",
        "zh": "充滿愛德的母后，我能獻給妳什麼呢？我把整個生命都奉獻給妳。我要竭盡所能傳揚對妳的敬禮，龐貝玫瑰聖母，因為當我呼求妳的助佑時，天主的恩寵降臨到我身上。我要到處述說妳對我所行的慈悲。我要盡力傳揚玫瑰經的敬禮，向眾人宣揚妳對我何等慈愛，使像我這樣不堪的罪人也能滿懷信賴投奔妳。啊！如果整個世界都知道妳是多麼仁慈，對受苦者懷有怎樣的憐憫，所有受造之物都會投奔妳。阿們。",
        "zh_translit": "Chōngmǎn àidé de mǔhòu, wǒ néng xiàn gěi nǐ shénme ne? Wǒ bǎ zhěnggè shēngmìng dōu fèngxiàn gěi nǐ. Wǒ yào jié jìn suǒ néng chuányáng duì nǐ de jìnglǐ, Pángbèi méiguī shèngmǔ, yīnwèi dāng wǒ hūqiú nǐ de zhùyòu shí, Tiānzhǔ de ēnchǒng jiànglín dào wǒ shēn shàng. Wǒ yào dàochù shùshuō nǐ duì wǒ suǒ xíng de cíbēi. Wǒ yào jìnlì chuányáng méiguī jīng de jìnglǐ, xiàng zhòngrén xuānyáng nǐ duì wǒ héděng cí'ài, shǐ xiàng wǒ zhèyàng bùkān de zuìrén yě néng mǎnhuái xìnlài tóubēn nǐ. A! Rúguǒ zhěnggè shìjiè dōu zhīdào nǐ shì duōme réncí, duì shòukǔ zhě huái yǒu zěnyàng de liánmǐn, suǒyǒu shòuzào zhī wù dūhuì tóubēn nǐ. Āmen."
      }
    },
    "closing_acclamation": {
      "name": {
        "pl": "Akt strzelisty końcowy (3×)",
        "it": "Acclamazione finale (3×)",
        "fr": "Acclamation finale (3×)",
        "es": "Jaculatoria final (3×)",
        "de": "Schlussanrufung (3×)",
        "la": "Invocatio finalis (3×)",
        "ru": "Заключительное воззвание (3×)",
        "ru_translit": "Zaklyuchitel'noye vozzvaniye (3×)",
        "uk": "Завершальний заклик (3×)",
        "uk_translit": "Zavershal'nyi zaklyk (3×)",
        "be": "Заключны вокліч (3×)",
        "be_translit": "Zaklučny voklič (3×)",
        "zh": "結尾呼求 (3×)",
        "zh_translit": "Jiéwěi hūqiú (3×)"
      },
      "_repetitions": 3,
      "text": {
        "pl": "Królowo Różańca Świętego, módl się za nami!",
        "it": "Regina del Santissimo Rosario, prega per noi!",
        "fr": "Reine du Très Saint Rosaire, priez pour nous !",
        "es": "Reina del Santísimo Rosario, ¡ruega por nosotros!",
        "de": "Königin des heiligen Rosenkranzes, bitte für uns!",
        "la": "Regina sacratissimi Rosarii, ora pro nobis!",
        "ru": "Царица Святого Розария, молись о нас!",
        "ru_translit": "Tsaritsa Svyatogo Rozariya, molis' o nas!",
        "uk": "Царице Святого Розарія, молися за нас!",
        "uk_translit": "Tsarytse Sviatoho Rozariia, molysia za nas!",
        "be": "Каралева Сьвятога Ружанца, маліся за нас!",
        "be_translit": "Karaleva Sviataha Ružanca, malisia za nas!",
        "zh": "聖玫瑰之后，為我們祈求！",
        "zh_translit": "Shèng Méiguī zhī Hòu, wèi wǒmen qíqiú!"
      }
    }
  }
}
```

## `mysteries.json`

<!-- sha256:057816a3f365eee4cfb90d893a55c648ebc523dda847489a669d049a2f7fd440 bytes:96294 -->

```json
{
  "version": "1.0",
  "_note": "20 tajemnic różańca: 5 radosnych + 5 światła + 5 bolesnych + 5 chwalebnych. Każda zawiera nazwę w 10 językach, referencję biblijną (kanoniczną + zlokalizowaną), pusty slot text_user na własny tekst Pisma, oraz krótkie rozważanie.",
  "schema": {
    "mystery": {
      "id": "string, unique (e.g. 'joyful_1')",
      "category": "string: joyful|luminous|sorrowful|glorious",
      "order_in_set": "integer 1-5",
      "name": "object: language code -> name",
      "scripture": {
        "reference_canonical": "string in Latin/short form (e.g. 'Lk 1,26-38')",
        "reference_localized": "object: language code -> reference in local convention",
        "text_user": "object: language code -> empty string for user to paste own translation"
      },
      "meditation": "object: language code -> short meditation (1-2 sentences)"
    }
  },
  "mysteries": [
    {
      "id": "joyful_1",
      "category": "joyful",
      "order_in_set": 1,
      "name": {
        "pl": "Zwiastowanie Najświętszej Maryi Pannie",
        "it": "L'Annunciazione dell'Angelo a Maria Vergine",
        "fr": "L'Annonciation",
        "es": "La Anunciación del Ángel a María",
        "de": "Die Verkündigung des Herrn",
        "la": "Annuntiatio Domini",
        "ru": "Благовещение Пресвятой Девы Марии",
        "ru_translit": "Blagoveshcheniye Presvyatoy Devy Marii",
        "uk": "Благовіщення Пресвятої Богородиці",
        "uk_translit": "Blahovishchennia Presviatoi Bohorodytsi",
        "be": "Зьвеставаньне Найсьвяцейшай Панны Марыі",
        "be_translit": "Zviestavannie Najsviaciejšaj Panny Maryji",
        "zh": "聖母領報",
        "zh_translit": "Shèngmǔ lǐngbào"
      },
      "scripture": {
        "reference_canonical": "Łk 1,26-38",
        "reference_localized": {
          "pl": "Łk 1,26-38",
          "it": "Lc 1,26-38",
          "fr": "Lc 1,26-38",
          "es": "Lc 1,26-38",
          "de": "Lk 1,26-38",
          "la": "Lc 1,26-38",
          "ru": "Лк 1,26-38",
          "ru_translit": "Lk 1,26-38",
          "uk": "Лк 1,26-38",
          "uk_translit": "Lk 1,26-38",
          "be": "Лк 1,26-38",
          "be_translit": "Lk 1,26-38",
          "zh": "路加福音 1:26-38",
          "zh_translit": "Lùjiā fúyīn 1:26-38"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Maryja wypowiada swoje «fiat» w ciszy zwykłego dnia. Wieczne Słowo wybiera próg domu w Nazarecie, by stać się Ciałem; niech moje «tak» dziś otworzy Mu drzwi.",
        "it": "Maria pronuncia il suo «fiat» nel silenzio di un giorno qualunque. Il Verbo eterno sceglie la soglia di Nazaret per farsi carne; il mio «sì» oggi gli apra la porta.",
        "fr": "Marie prononce son « fiat » dans le silence d'un jour ordinaire. Le Verbe éternel choisit le seuil de Nazareth pour se faire chair ; que mon « oui » d'aujourd'hui Lui ouvre la porte.",
        "es": "María pronuncia su «fiat» en el silencio de un día cualquiera. El Verbo eterno escoge el umbral de Nazaret para hacerse carne; que mi «sí» de hoy le abra la puerta.",
        "de": "Maria spricht ihr «Fiat» in der Stille eines gewöhnlichen Tages. Das ewige Wort wählt die Schwelle von Nazaret, um Fleisch zu werden; mein «Ja» heute öffne Ihm die Tür.",
        "la": "Maria suum «fiat» pronuntiat in silentio diei communis. Verbum aeternum limen Nazareth eligit ut caro fiat; meum «ita» hodie portam Ei aperiat.",
        "ru": "Мария произносит своё «fiat» в тишине обыкновенного дня. Предвечное Слово избирает порог Назарета, чтобы стать плотью; пусть моё «да» сегодня откроет Ему дверь.",
        "ru_translit": "Mariya proiznosit svoyo «fiat» v tishine obyknovennogo dnya. Predvechnoye Slovo izbirayet porog Nazareta, chtoby stat' plot'yu; pust' moyo «da» segodnya otkroyet Yemu dver'.",
        "uk": "Марія промовляє своє «fiat» у тиші звичайного дня. Предвічне Слово обирає поріг Назарета, щоб стати плоттю; нехай моє «так» сьогодні відчинить Йому двері.",
        "uk_translit": "Mariia promovliaie svoie «fiat» u tyshi zvychainoho dnia. Predvichne Slovo obyraie porih Nazareta, shchob staty plottiu; nekhai moie «tak» s'ohodni vidchynyt' Yomu dveri.",
        "be": "Марыя вымаўляе сваё «fiat» у цішыні звычайнага дня. Прадвечнае Слова выбірае парог Назарэта, каб стаць целам; няхай маё «так» сёньня адчыніць Яму дзьверы.",
        "be_translit": "Maryja vymaŭlaje svajo «fiat» u cišyni zvyčajnaha dnia. Pradviečnaje Słova vybiraje paroh Nazareta, kab stać ciełam; niachaj majo «tak» sionnia adčynić Jamu dzvery.",
        "zh": "瑪利亞在平凡日子的寂靜中說出她的「願意」。永恆聖言選擇納匝肋的門檻而成為血肉；願我今日的「願意」為祂打開心門。",
        "zh_translit": "Mǎlìyǎ zài píngfán rìzi de jìjìng zhōng shuōchū tā de «yuànyì». Yǒnghéng shèngyán xuǎnzé Nàzāléi de ménkǎn ér chéngwéi xuèròu; yuàn wǒ jīnrì de «yuànyì» wèi tā dǎkāi xīnmén."
      }
    },
    {
      "id": "joyful_2",
      "category": "joyful",
      "order_in_set": 2,
      "name": {
        "pl": "Nawiedzenie świętej Elżbiety",
        "it": "La Visita di Maria a Santa Elisabetta",
        "fr": "La Visitation",
        "es": "La Visitación de María a Santa Isabel",
        "de": "Mariä Heimsuchung",
        "la": "Visitatio Beatae Mariae Virginis",
        "ru": "Посещение Девой Марией святой Елизаветы",
        "ru_translit": "Poseshcheniye Devoy Mariey svyatoy Elizavety",
        "uk": "Відвідини святої Єлисавети",
        "uk_translit": "Vidvidyny sviatoi Yelysavety",
        "be": "Адведзіны сьвятой Альжбеты",
        "be_translit": "Adviedziny sviatoj Al'žbiety",
        "zh": "聖母往見聖婦依撒伯爾",
        "zh_translit": "Shèngmǔ wǎng jiàn shèng fù Yīsābó'ěr"
      },
      "scripture": {
        "reference_canonical": "Łk 1,39-56",
        "reference_localized": {
          "pl": "Łk 1,39-56",
          "it": "Lc 1,39-56",
          "fr": "Lc 1,39-56",
          "es": "Lc 1,39-56",
          "de": "Lk 1,39-56",
          "la": "Lc 1,39-56",
          "ru": "Лк 1,39-56",
          "ru_translit": "Lk 1,39-56",
          "uk": "Лк 1,39-56",
          "uk_translit": "Lk 1,39-56",
          "be": "Лк 1,39-56",
          "be_translit": "Lk 1,39-56",
          "zh": "路加福音 1:39-56",
          "zh_translit": "Lùjiā fúyīn 1:39-56"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Maryja, niosąc Jezusa w łonie, śpieszy w góry, by służyć. Każda prawdziwa łaska wybiega ku drugiemu człowiekowi; kogo dziś mogę «nawiedzić», niosąc obecność Chrystusa?",
        "it": "Maria, portando Gesù in grembo, si affretta verso i monti per servire. Ogni grazia vera corre verso l'altro; chi posso «visitare» oggi, portando la presenza di Cristo?",
        "fr": "Marie, portant Jésus en son sein, se hâte vers la montagne pour servir. Toute vraie grâce s'élance vers l'autre ; qui puis-je « visiter » aujourd'hui en portant la présence du Christ ?",
        "es": "María, llevando a Jesús en su seno, se apresura a la montaña para servir. Toda gracia verdadera corre hacia el otro; ¿a quién puedo «visitar» hoy llevando la presencia de Cristo?",
        "de": "Maria eilt mit Jesus im Schoß ins Bergland, um zu dienen. Jede echte Gnade läuft zum Anderen hin; wen kann ich heute «heimsuchen», indem ich Christus trage?",
        "la": "Maria, Iesum gestans in utero, in montana festinat ut ministret. Omnis gratia vera ad alterum currit; quem hodie «visitare» possum, Christi praesentiam ferens?",
        "ru": "Мария, неся Иисуса во чреве, спешит в горы, чтобы послужить. Всякая истинная благодать бежит к другому; кого я могу «посетить» сегодня, неся присутствие Христа?",
        "ru_translit": "Mariya, nesya Iisusa vo chreve, speshit v gory, chtoby posluzhit'. Vsyakaya istinnaya blagodat' bezhit k drugomu; kogo ya mogu «posetit'» segodnya, nesya prisutstviye Khrista?",
        "uk": "Марія, несучи Ісуса в лоні, поспішає в гори, щоб послужити. Усяка справжня благодать біжить до іншого; кого я можу «відвідати» сьогодні, несучи присутність Христа?",
        "uk_translit": "Mariia, nesuchy Isusa v loni, pospishaie v hory, shchob posluzhyty. Usiaka spravzhnia blahodat' bizhyt' do inshoho; koho ya mozhu «vidvidaty» s'ohodni, nesuchy prysutnist' Khrysta?",
        "be": "Марыя, несучы Езуса ва ўлоньні, сьпяшаецца ў горы, каб паслужыць. Усялякая праўдзівая ласка бяжыць да другога; каго я магу «адведаць» сёньня, несучы прысутнасьць Хрыста?",
        "be_translit": "Maryja, nesučy Jezusa va ŭloŭni, śpiašajecca ŭ hory, kab pasłužyć. Usialakaja praŭdzivaja łaska biažyć da druhoha; kaho ja mahu «adviedać» sionnia, nesučy prysutnasć Chrysta?",
        "zh": "瑪利亞懷著耶穌急速登上山區去服事人。一切真正的恩寵都奔向他人；今天我能「探訪」誰，把基督的臨在帶給他？",
        "zh_translit": "Mǎlìyǎ huáizhe Yēsū jísù dēng shàng shānqū qù fúshì rén. Yīqiè zhēnzhèng de ēnchǒng dōu bēn xiàng tārén; jīntiān wǒ néng «tànfǎng» shéi, bǎ Jīdū de línzài dài gěi tā?"
      }
    },
    {
      "id": "joyful_3",
      "category": "joyful",
      "order_in_set": 3,
      "name": {
        "pl": "Narodzenie Pana Jezusa",
        "it": "La Nascita di Gesù a Betlemme",
        "fr": "La Nativité",
        "es": "El Nacimiento de Jesús",
        "de": "Die Geburt Jesu",
        "la": "Nativitas Domini",
        "ru": "Рождество Господа Иисуса Христа",
        "ru_translit": "Rozhdestvo Gospoda Iisusa Khrista",
        "uk": "Різдво Господа Ісуса Христа",
        "uk_translit": "Rizdvo Hospoda Isusa Khrysta",
        "be": "Нараджэньне Госпада Езуса Хрыста",
        "be_translit": "Naradženne Hospada Jezusa Chrysta",
        "zh": "耶穌聖誕",
        "zh_translit": "Yēsū shèngdàn"
      },
      "scripture": {
        "reference_canonical": "Łk 2,1-20",
        "reference_localized": {
          "pl": "Łk 2,1-20",
          "it": "Lc 2,1-20",
          "fr": "Lc 2,1-20",
          "es": "Lc 2,1-20",
          "de": "Lk 2,1-20",
          "la": "Lc 2,1-20",
          "ru": "Лк 2,1-20",
          "ru_translit": "Lk 2,1-20",
          "uk": "Лк 2,1-20",
          "uk_translit": "Lk 2,1-20",
          "be": "Лк 2,1-20",
          "be_translit": "Lk 2,1-20",
          "zh": "路加福音 2:1-20",
          "zh_translit": "Lùjiā fúyīn 2:1-20"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Bóg, którego nie obejmują niebiosa, mieści się w żłobie. Nie szuka tronu, lecz pieluszek; tam, gdzie świat widzi nędzę, On widzi mieszkanie.",
        "it": "Dio, che i cieli non contengono, sta in una mangiatoia. Non cerca un trono ma fasce; là dove il mondo vede miseria, Lui vede una dimora.",
        "fr": "Dieu, que les cieux ne contiennent pas, tient dans une mangeoire. Il ne cherche pas un trône mais des langes ; là où le monde voit la misère, Lui voit une demeure.",
        "es": "Dios, a quien los cielos no abarcan, cabe en un pesebre. No busca un trono sino pañales; donde el mundo ve miseria, Él ve una morada.",
        "de": "Gott, den die Himmel nicht fassen, passt in eine Krippe. Er sucht keinen Thron, sondern Windeln; wo die Welt Elend sieht, sieht Er eine Wohnung.",
        "la": "Deus, quem caeli non capiunt, in praesepio iacet. Non thronum sed pannos quaerit; ubi mundus miseriam videt, Ille mansionem.",
        "ru": "Бог, Которого небеса не вмещают, помещается в яслях. Он ищет не трона, но пелён; там, где мир видит нищету, Он видит обитель.",
        "ru_translit": "Bog, Kotorogo nebesa ne vmeshchayut, pomeshchayetsya v yaslyakh. On ishchet ne trona, no pelen; tam, gde mir vidit nishchetu, On vidit obitel'.",
        "uk": "Бог, Якого небеса не вміщають, поміщається в яслах. Він шукає не престолу, а пелен; там, де світ бачить злидні, Він бачить оселю.",
        "uk_translit": "Boh, Yakoho nebesa ne vmishchaiut', pomishchaiet'sia v yaslakh. Vin shukaie ne prestolu, a pelen; tam, de svit bachyt' zlydni, Vin bachyt' oseliu.",
        "be": "Бог, Якога нябёсы не зьмяшчаюць, зьмяшчаецца ў ясьлях. Ён шукае не пасаду, а пялюшак; там, дзе сьвет бачыць нэндзу, Ён бачыць жытло.",
        "be_translit": "Boh, Jakoha niabiosy nie zmiaščajuć, zmiaščajecca ŭ jaślach. Jon šukaje nie pasadu, a pialušak; tam, dzie sviet bačyć nendzu, Jon bačyć žytło.",
        "zh": "天地不能容納的天主，竟容身於馬槽。祂不尋求寶座，只要襁褓；世人看為貧乏的地方，祂視為居所。",
        "zh_translit": "Tiāndì bù néng róngnà de Tiānzhǔ, jìng róngshēn yú mǎcáo. Tā bù xúnqiú bǎozuò, zhǐ yào qiǎngbǎo; shìrén kàn wéi pínfá de dìfāng, Tā shì wéi jūsuǒ."
      }
    },
    {
      "id": "joyful_4",
      "category": "joyful",
      "order_in_set": 4,
      "name": {
        "pl": "Ofiarowanie Pana Jezusa w świątyni",
        "it": "La Presentazione di Gesù al Tempio",
        "fr": "La Présentation de Jésus au Temple",
        "es": "La Presentación de Jesús en el Templo",
        "de": "Die Darstellung des Herrn im Tempel",
        "la": "Praesentatio Domini in Templo",
        "ru": "Сретение Господне",
        "ru_translit": "Sreteniye Gospodne",
        "uk": "Стрітення Господнє",
        "uk_translit": "Stritennia Hospodnie",
        "be": "Ахвяраваньне Госпада Езуса ў сьвятыні",
        "be_translit": "Achviaravannie Hospada Jezusa ŭ sviatyni",
        "zh": "獻耶穌於聖殿",
        "zh_translit": "Xiàn Yēsū yú shèngdiàn"
      },
      "scripture": {
        "reference_canonical": "Łk 2,22-39",
        "reference_localized": {
          "pl": "Łk 2,22-39",
          "it": "Lc 2,22-39",
          "fr": "Lc 2,22-39",
          "es": "Lc 2,22-39",
          "de": "Lk 2,22-39",
          "la": "Lc 2,22-39",
          "ru": "Лк 2,22-39",
          "ru_translit": "Lk 2,22-39",
          "uk": "Лк 2,22-39",
          "uk_translit": "Lk 2,22-39",
          "be": "Лк 2,22-39",
          "be_translit": "Lk 2,22-39",
          "zh": "路加福音 2:22-39",
          "zh_translit": "Lùjiā fúyīn 2:22-39"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Symeon trzyma w rękach «Światło na oświecenie pogan» — i przepowiada Maryi miecz. Każda prawdziwa radość niesie w sobie cień krzyża; nie unikam go, ale obejmuję wraz z Nią.",
        "it": "Simeone tiene tra le braccia la «Luce per illuminare le genti» — e annuncia a Maria la spada. Ogni gioia vera porta in sé l'ombra della croce; non la fuggo, ma l'abbraccio insieme a Lei.",
        "fr": "Syméon tient dans ses bras la « Lumière des nations » — et annonce à Marie le glaive. Toute joie vraie porte en elle l'ombre de la croix ; je ne la fuis pas, je l'embrasse avec Elle.",
        "es": "Simeón tiene en sus brazos la «Luz para iluminar a los gentiles» — y anuncia a María la espada. Toda alegría verdadera lleva en sí la sombra de la cruz; no la rehúyo, la abrazo con Ella.",
        "de": "Simeon hält in seinen Armen das «Licht zur Erleuchtung der Heiden» — und kündigt Maria das Schwert an. Jede wahre Freude trägt den Schatten des Kreuzes; ich fliehe ihn nicht, ich umarme ihn mit Ihr.",
        "la": "Simeon ulnis tenet «Lumen ad revelationem gentium» — et Mariae gladium praedicit. Omne gaudium verum umbram crucis fert; non fugio sed cum Ea amplector.",
        "ru": "Симеон держит в руках «Свет к просвещению язычников» — и предрекает Марии меч. Всякая истинная радость несёт в себе тень креста; не бегу от неё, но обнимаю вместе с Ней.",
        "ru_translit": "Simeon derzhit v rukakh «Svet k prosveshcheniyu yazychnikov» — i predrekayet Marii mech. Vsyakaya istinnaya radost' nesyot v sebe ten' kresta; ne begu ot neyo, no obnimayu vmeste s Ney.",
        "uk": "Симеон тримає в руках «Світло на просвіту поган» — і провіщає Марії меч. Усяка справжня радість несе в собі тінь хреста; не тікаю від неї, а обіймаю разом з Нею.",
        "uk_translit": "Symeon trymaie v rukakh «Svitlo na prosvitu pohan» — i provishchaie Marii mech. Usiaka spravzhnia radist' nese v sobi tin' khresta; ne tikaiu vid nei, a obiimaiu razom z Neiu.",
        "be": "Сымэон трымае ў руках «Сьвятло на асьвечаньне паганаў» — і прадказвае Марыі меч. Усялякая праўдзівая радасьць нясе ў сабе цень крыжа; не ўцякаю ад яго, а абдымаю разам зь Ёю.",
        "be_translit": "Symeon trymaje ŭ rukach «Sviatło na asviečannie pahanaŭ» — i pradkazvaje Maryji mieč. Usialakaja praŭdzivaja radasć niasie ŭ sabie cień kryža; nie ŭciakaju ad jaho, a abdymaju razam z'Joju.",
        "zh": "西默盎手中抱著「啟示異邦的光明」——同時向瑪利亞預言那把劍。一切真正的喜樂都帶著十字架的陰影；我不逃避，要與祂母親一同擁抱。",
        "zh_translit": "Xīmò'áng shǒuzhōng bàozhe «qǐshì yìbāng de guāngmíng»——tóngshí xiàng Mǎlìyǎ yùyán nà bǎ jiàn. Yīqiè zhēnzhèng de xǐlè dōu dàizhe shízìjià de yīnyǐng; wǒ bù táobì, yào yǔ tā mǔqīn yītóng yōngbào."
      }
    },
    {
      "id": "joyful_5",
      "category": "joyful",
      "order_in_set": 5,
      "name": {
        "pl": "Odnalezienie Pana Jezusa w świątyni",
        "it": "Il Ritrovamento di Gesù nel Tempio",
        "fr": "Le Recouvrement de Jésus au Temple",
        "es": "El Hallazgo de Jesús en el Templo",
        "de": "Das Wiederfinden Jesu im Tempel",
        "la": "Inventio Iesu in Templo",
        "ru": "Обретение Иисуса в храме",
        "ru_translit": "Obreteniye Iisusa v khrame",
        "uk": "Знайдення Ісуса в храмі",
        "uk_translit": "Znaidennia Isusa v khrami",
        "be": "Знаходжаньне Езуса ў сьвятыні",
        "be_translit": "Znachodžannie Jezusa ŭ sviatyni",
        "zh": "耶穌十二齡講道",
        "zh_translit": "Yēsū shí'èr líng jiǎngdào"
      },
      "scripture": {
        "reference_canonical": "Łk 2,41-52",
        "reference_localized": {
          "pl": "Łk 2,41-52",
          "it": "Lc 2,41-52",
          "fr": "Lc 2,41-52",
          "es": "Lc 2,41-52",
          "de": "Lk 2,41-52",
          "la": "Lc 2,41-52",
          "ru": "Лк 2,41-52",
          "ru_translit": "Lk 2,41-52",
          "uk": "Лк 2,41-52",
          "uk_translit": "Lk 2,41-52",
          "be": "Лк 2,41-52",
          "be_translit": "Lk 2,41-52",
          "zh": "路加福音 2:41-52",
          "zh_translit": "Lùjiā fúyīn 2:41-52"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Trzy dni szukania, aż znajdują Go w domu Ojca. Czasem Jezus pozwala się zgubić, by Go szukano bardziej; gdzie dziś przestałem szukać?",
        "it": "Tre giorni di ricerca, finché Lo trovano nella casa del Padre. A volte Gesù si lascia perdere perché Lo si cerchi di più; dove oggi ho smesso di cercare?",
        "fr": "Trois jours de recherche, jusqu'à Le trouver dans la maison du Père. Parfois Jésus se laisse perdre pour qu'on Le cherche davantage ; où ai-je cessé de chercher aujourd'hui ?",
        "es": "Tres días de búsqueda, hasta encontrarlo en la casa del Padre. A veces Jesús se deja perder para que se le busque más; ¿dónde he dejado hoy de buscar?",
        "de": "Drei Tage Suche, bis sie Ihn im Haus des Vaters finden. Manchmal lässt Jesus sich verlieren, damit man Ihn mehr sucht; wo habe ich heute aufgehört zu suchen?",
        "la": "Tres dies quaerendi, donec Eum in domo Patris inveniunt. Aliquando Iesus se perdi sinit ut magis quaeratur; ubi hodie quaerere desii?",
        "ru": "Три дня поисков, пока не находят Его в доме Отца. Иногда Иисус позволяет Себя потерять, чтобы Его искали усерднее; где я перестал искать сегодня?",
        "ru_translit": "Tri dnya poiskov, poka ne nakhodyat Yego v dome Ottsa. Inogda Iisus pozvolyayet Sebya poteryat', chtoby Yego iskali userdneye; gde ya perestal iskat' segodnya?",
        "uk": "Три дні пошуків, аж поки не знаходять Його в домі Отця. Часом Ісус дозволяє Себе загубити, щоб шукали Його більше; де я перестав шукати сьогодні?",
        "uk_translit": "Try dni poshukiv, azh poky ne znakhodiat' Yoho v domi Ottsia. Chasom Isus dozvoliaie Sebe zahubyty, shchob shukaly Yoho bil'she; de ya perestav shukaty s'ohodni?",
        "be": "Тры дні пошукаў, пакуль ня знаходзяць Яго ў доме Айца. Часам Езус дазваляе Сябе згубіць, каб Яго шукалі больш; дзе я перастаў шукаць сёньня?",
        "be_translit": "Try dni pošukaŭ, pakul nia znachodziać Jaho ŭ domie Ajca. Časam Jezus dazvalaje Siabie zhubić, kab Jaho šukali bolš; dzie ja pierastaŭ šukać sionnia?",
        "zh": "尋找了三天，直到在父的家中找到祂。有時耶穌容許自己被失落，是為了讓人更熱切地尋找；今天我在哪裡停止了尋找？",
        "zh_translit": "Xúnzhǎole sān tiān, zhídào zài Fù de jiā zhōng zhǎodào tā. Yǒushí Yēsū róngxǔ zìjǐ bèi shīluò, shì wèile ràng rén gèng rèqiè de xúnzhǎo; jīntiān wǒ zài nǎlǐ tíngzhǐle xúnzhǎo?"
      }
    },
    {
      "id": "luminous_1",
      "category": "luminous",
      "order_in_set": 1,
      "name": {
        "pl": "Chrzest Pana Jezusa w Jordanie",
        "it": "Il Battesimo di Gesù nel Giordano",
        "fr": "Le Baptême de Jésus dans le Jourdain",
        "es": "El Bautismo de Jesús en el Jordán",
        "de": "Die Taufe Jesu im Jordan",
        "la": "Baptismus Iesu in Iordane",
        "ru": "Крещение Господа Иисуса во Иордане",
        "ru_translit": "Kreshcheniye Gospoda Iisusa vo Iordane",
        "uk": "Хрещення Господа Ісуса в Йордані",
        "uk_translit": "Khreshchennia Hospoda Isusa v Yordani",
        "be": "Хрост Госпада Езуса ў Ярдане",
        "be_translit": "Chrost Hospada Jezusa ŭ Jardanie",
        "zh": "耶穌在約但河受洗",
        "zh_translit": "Yēsū zài Yuēdànhé shòuxǐ"
      },
      "scripture": {
        "reference_canonical": "Mt 3,13-17",
        "reference_localized": {
          "pl": "Mt 3,13-17",
          "it": "Mt 3,13-17",
          "fr": "Mt 3,13-17",
          "es": "Mt 3,13-17",
          "de": "Mt 3,13-17",
          "la": "Mt 3,13-17",
          "ru": "Мф 3,13-17",
          "ru_translit": "Mf 3,13-17",
          "uk": "Мт 3,13-17",
          "uk_translit": "Mt 3,13-17",
          "be": "Мц 3,13-17",
          "be_translit": "Mc 3,13-17",
          "zh": "瑪竇福音 3:13-17",
          "zh_translit": "Mǎdòu fúyīn 3:13-17"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Niebo się otwiera nad Synem stojącym w wodzie grzeszników. Tam, gdzie wchodzę w swój brud, otwiera się także moje niebo, gdy obok mnie staje On.",
        "it": "Il cielo si apre sopra il Figlio nelle acque dei peccatori. Là dove entro nel mio fango, anche il mio cielo si apre, quando Lui mi sta accanto.",
        "fr": "Le ciel s'ouvre sur le Fils dans les eaux des pécheurs. Là où j'entre dans ma boue, mon ciel s'ouvre aussi, quand Il se tient à côté de moi.",
        "es": "El cielo se abre sobre el Hijo en las aguas de los pecadores. Allí donde entro en mi lodo, también mi cielo se abre, cuando Él está junto a mí.",
        "de": "Der Himmel öffnet sich über dem Sohn im Wasser der Sünder. Wo ich in meinen Schmutz hinabsteige, öffnet sich auch mein Himmel, wenn Er neben mir steht.",
        "la": "Caelum aperitur super Filium in aquis peccatorum. Ubi in lutum meum descendo, etiam caelum meum aperitur, cum Ille mihi adstat.",
        "ru": "Небо отверзается над Сыном в водах грешников. Там, где я схожу в свою грязь, отверзается и моё небо, когда Он становится рядом.",
        "ru_translit": "Nebo otverzayetsya nad Synom v vodakh greshnikov. Tam, gde ya skhozhu v svoyu gryaz', otverzayetsya i moyo nebo, kogda On stanovitsya ryadom.",
        "uk": "Небо відкривається над Сином у водах грішників. Там, де я входжу у свій бруд, відкривається й моє небо, коли Він стає поряд.",
        "uk_translit": "Nebo vidkryvaiet'sia nad Synom u vodakh hrishnykiv. Tam, de ya vkhodzhu u svii brud, vidkryvaiet'sia y moie nebo, koly Vin staie poriad.",
        "be": "Неба адчыняецца над Сынам у водах грэшнікаў. Там, дзе я ўваходжу ў свой бруд, адчыняецца і маё неба, калі Ён становіцца побач.",
        "be_translit": "Nieba adčyniajecca nad Synam u vodach hrešnikaŭ. Tam, dzie ja ŭvachodžu ŭ svoj brud, adčyniajecca i majo nieba, kali Jon stanovicca pobač.",
        "zh": "天為站在罪人之水中的聖子開啟。當我走進自己的污濁，祂站在我身旁時，我的天也為我開啟。",
        "zh_translit": "Tiān wèi zhàn zài zuìrén zhī shuǐ zhōng de Shèngzǐ kāiqǐ. Dāng wǒ zǒu jìn zìjǐ de wūzhuó, tā zhàn zài wǒ shēn páng shí, wǒ de tiān yě wèi wǒ kāiqǐ."
      }
    },
    {
      "id": "luminous_2",
      "category": "luminous",
      "order_in_set": 2,
      "name": {
        "pl": "Objawienie Pana Jezusa na weselu w Kanie",
        "it": "Le Nozze di Cana",
        "fr": "Les Noces de Cana",
        "es": "Las Bodas de Caná",
        "de": "Die Hochzeit zu Kana",
        "la": "Nuptiae Canae Galilaeae",
        "ru": "Брак в Кане Галилейской",
        "ru_translit": "Brak v Kane Galileyskoy",
        "uk": "Шлюб у Кані Галилейській",
        "uk_translit": "Shliub u Kani Halyleis'kii",
        "be": "Вясельле ў Кане Галілейскай",
        "be_translit": "Viaselle ŭ Kanie Halilejskaj",
        "zh": "加納婚宴的奇蹟",
        "zh_translit": "Jiānà hūnyàn de qíjī"
      },
      "scripture": {
        "reference_canonical": "J 2,1-12",
        "reference_localized": {
          "pl": "J 2,1-12",
          "it": "Gv 2,1-12",
          "fr": "Jn 2,1-12",
          "es": "Jn 2,1-12",
          "de": "Joh 2,1-12",
          "la": "Io 2,1-12",
          "ru": "Ин 2,1-12",
          "ru_translit": "In 2,1-12",
          "uk": "Ів 2,1-12",
          "uk_translit": "Iv 2,1-12",
          "be": "Ян 2,1-12",
          "be_translit": "Jan 2,1-12",
          "zh": "若望福音 2:1-12",
          "zh_translit": "Ruòwàng fúyīn 2:1-12"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Maryja zauważa brak wina, zanim ktokolwiek poprosi. «Zróbcie wszystko, cokolwiek wam powie» — to całe Jej Magisterium. Ufam, że dostrzega też mój brak.",
        "it": "Maria nota la mancanza del vino prima che qualcuno chieda. «Fate tutto quello che vi dirà» — è tutto il suo Magistero. Mi fido: vede anche la mia mancanza.",
        "fr": "Marie remarque le manque de vin avant que quelqu'un ne demande. «Faites tout ce qu'Il vous dira» — c'est tout son Magistère. Je me confie : Elle voit aussi mon manque.",
        "es": "María nota la falta de vino antes de que nadie pida. «Haced lo que Él os diga» — es todo su Magisterio. Confío: ve también mi carencia.",
        "de": "Maria bemerkt das Fehlen des Weins, bevor jemand fragt. «Was Er euch sagt, das tut» — das ist Ihr ganzes Lehramt. Ich vertraue: Sie sieht auch meinen Mangel.",
        "la": "Maria absentiam vini animadvertit antequam quis petat. «Quodcumque dixerit vobis, facite» — totum Eius Magisterium. Confido: etiam meam egestatem videt.",
        "ru": "Мария замечает нехватку вина прежде, чем кто-либо попросит. «Что скажет Он вам, то сделайте» — вот всё Её Учительство. Доверяю: видит и мой недостаток.",
        "ru_translit": "Mariya zamechayet nekhvatku vina prezhde, chem kto-libo poprosit. «Chto skazhet On vam, to sdelayte» — vot vsyo Yeyo Uchitel'stvo. Doveryayu: vidit i moy nedostatok.",
        "uk": "Марія помічає нестачу вина, перш ніж хтось попросить. «Зробіть усе, що Він вам скаже» — це все Її вчення. Довіряю: бачить і мою нестачу.",
        "uk_translit": "Mariia pomichaie nestachu vyna, persh nizh khtos' poprosyt'. «Zrobit' use, shcho Vin vam skazhe» — tse vse Yii vchennia. Doviriaiu: bachyt' i moiu nestachu.",
        "be": "Марыя заўважае нястачу віна перш, чым нехта папросіць. «Зрабіце ўсё, што Ён вам скажа» — гэта ўсё Яе вучэньне. Давяраю: бачыць і маю нястачу.",
        "be_translit": "Maryja zaŭvažaje niastaču vina perš, čym niechta paprosić. «Zrabicie ŭsio, što Jon vam skaža» — heta ŭsio Jaje vučennie. Daviaraju: bačyć i maju niastaču.",
        "zh": "瑪利亞在無人開口之前已留意到酒的短缺。「祂吩咐你們什麼，你們就做什麼」——這是祂全部的訓導。我相信：祂也看見我的缺乏。",
        "zh_translit": "Mǎlìyǎ zài wúrén kāikǒu zhīqián yǐ liúyì dào jiǔ de duǎnquē. «Tā fēnfù nǐmen shénme, nǐmen jiù zuò shénme» — zhè shì tā quánbù de xùndǎo. Wǒ xiāngxìn: tā yě kànjiàn wǒ de quēfá."
      }
    },
    {
      "id": "luminous_3",
      "category": "luminous",
      "order_in_set": 3,
      "name": {
        "pl": "Głoszenie Królestwa Bożego i wezwanie do nawrócenia",
        "it": "L'Annuncio del Regno di Dio e l'invito alla conversione",
        "fr": "L'Annonce du Royaume de Dieu et l'appel à la conversion",
        "es": "El Anuncio del Reino de Dios y la invitación a la conversión",
        "de": "Die Verkündigung des Reiches Gottes und der Aufruf zur Umkehr",
        "la": "Annuntiatio Regni Dei et invitatio ad conversionem",
        "ru": "Возвещение Царства Божия и призыв к обращению",
        "ru_translit": "Vozveshcheniye Tsarstva Bozhiya i prizyv k obrashcheniyu",
        "uk": "Проповідь Царства Божого і заклик до навернення",
        "uk_translit": "Propovid' Tsarstva Bozhoho i zaklyk do navernennia",
        "be": "Абвяшчэньне Валадарства Божага і пакліканьне да навяртаньня",
        "be_translit": "Abviaščennie Vаladarstva Božaha i paklikannie da naviartannia",
        "zh": "宣講天國並呼籲悔改",
        "zh_translit": "Xuānjiǎng tiānguó bìng hūyù huǐgǎi"
      },
      "scripture": {
        "reference_canonical": "Mk 1,14-15",
        "reference_localized": {
          "pl": "Mk 1,14-15",
          "it": "Mc 1,14-15",
          "fr": "Mc 1,14-15",
          "es": "Mc 1,14-15",
          "de": "Mk 1,14-15",
          "la": "Mc 1,14-15",
          "ru": "Мк 1,14-15",
          "ru_translit": "Mk 1,14-15",
          "uk": "Мк 1,14-15",
          "uk_translit": "Mk 1,14-15",
          "be": "Мк 1,14-15",
          "be_translit": "Mk 1,14-15",
          "zh": "馬爾谷福音 1:14-15",
          "zh_translit": "Mǎ'ěrgǔ fúyīn 1:14-15"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "«Czas się wypełnił». Nawrócenie nie jest gestem heroicznym, lecz codziennym obrotem twarzy w stronę Słońca. Co dziś wymaga ode mnie tego obrotu?",
        "it": "«Il tempo è compiuto». La conversione non è un gesto eroico, ma il giro quotidiano del volto verso il Sole. Cosa oggi mi chiede questo giro?",
        "fr": "«Le temps est accompli». La conversion n'est pas un geste héroïque, mais le tour quotidien du visage vers le Soleil. Qu'est-ce qui me demande ce tour aujourd'hui ?",
        "es": "«El tiempo se ha cumplido». La conversión no es un gesto heroico, sino el giro diario del rostro hacia el Sol. ¿Qué me pide hoy ese giro?",
        "de": "«Die Zeit ist erfüllt». Umkehr ist keine heroische Geste, sondern die tägliche Wendung des Gesichts zur Sonne. Was verlangt diese Wendung heute von mir?",
        "la": "«Impletum est tempus». Conversio non heroicus gestus est, sed cotidiana facies versio ad Solem. Quid hodie a me poscit haec versio?",
        "ru": "«Исполнилось время». Обращение — не героический жест, а ежедневный поворот лица к Солнцу. Чего требует от меня этот поворот сегодня?",
        "ru_translit": "«Ispolnilos' vremya». Obrashcheniye — ne geroicheskiy zhest, a yezhednevnyy povorot litsa k Solntsu. Chego trebuyet ot menya etot povorot segodnya?",
        "uk": "«Сповнився час». Навернення — не геройський жест, а щоденний поворот обличчя до Сонця. Чого вимагає від мене цей поворот сьогодні?",
        "uk_translit": "«Spovnyvsia chas». Navernennia — ne herois'kyi zhest, a shchodennyi povorot oblychchia do Sontsia. Choho vymahaie vid mene tsei povorot s'ohodni?",
        "be": "«Споўніўся час». Навяртаньне — не геройскі жэст, а штодзённы паварот твару да Сонца. Чаго патрабуе ад мяне гэты паварот сёньня?",
        "be_translit": "«Spoŭniŭsia čas». Naviartannie — nie hierojski žest, a štodzionny pavarot tvaru da Sonca. Čaho patrabuje ad mianie hety pavarot sionnia?",
        "zh": "「時候已滿。」悔改不是英雄式的舉動，而是每日把臉轉向太陽。今天這個轉向要求我做什麼？",
        "zh_translit": "«Shíhou yǐ mǎn». Huǐgǎi bùshì yīngxióng shì de jǔdòng, érshì měi rì bǎ liǎn zhuǎn xiàng tàiyáng. Jīntiān zhège zhuǎnxiàng yāoqiú wǒ zuò shénme?"
      }
    },
    {
      "id": "luminous_4",
      "category": "luminous",
      "order_in_set": 4,
      "name": {
        "pl": "Przemienienie Pana Jezusa na górze Tabor",
        "it": "La Trasfigurazione di Gesù sul Monte Tabor",
        "fr": "La Transfiguration",
        "es": "La Transfiguración del Señor",
        "de": "Die Verklärung Jesu auf dem Berg Tabor",
        "la": "Transfiguratio Domini",
        "ru": "Преображение Господне",
        "ru_translit": "Preobrazheniye Gospodne",
        "uk": "Преображення Господнє",
        "uk_translit": "Preobrazhennia Hospodnie",
        "be": "Перамяненьне Госпадаве",
        "be_translit": "Pieramianieńnie Hospadave",
        "zh": "耶穌大博爾山顯聖容",
        "zh_translit": "Yēsū Dàbó'ěr shān xiǎn shèngróng"
      },
      "scripture": {
        "reference_canonical": "Mt 17,1-9",
        "reference_localized": {
          "pl": "Mt 17,1-9",
          "it": "Mt 17,1-9",
          "fr": "Mt 17,1-9",
          "es": "Mt 17,1-9",
          "de": "Mt 17,1-9",
          "la": "Mt 17,1-9",
          "ru": "Мф 17,1-9",
          "ru_translit": "Mf 17,1-9",
          "uk": "Мт 17,1-9",
          "uk_translit": "Mt 17,1-9",
          "be": "Мц 17,1-9",
          "be_translit": "Mc 17,1-9",
          "zh": "瑪竇福音 17:1-9",
          "zh_translit": "Mǎdòu fúyīn 17:1-9"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Na chwilę uchyla się rąbek chwały, by uczniowie wytrzymali ciemność Kalwarii. Każda autentyczna pociecha jest paliwem na noc, która przyjdzie.",
        "it": "Per un istante si solleva il velo della gloria, perché i discepoli reggano il buio del Calvario. Ogni vera consolazione è combustibile per la notte che verrà.",
        "fr": "Un instant le voile de la gloire se lève, pour que les disciples tiennent l'obscurité du Calvaire. Toute vraie consolation est carburant pour la nuit à venir.",
        "es": "Por un instante se levanta el velo de la gloria, para que los discípulos resistan la oscuridad del Calvario. Toda consolación verdadera es combustible para la noche que vendrá.",
        "de": "Für einen Augenblick wird der Schleier der Herrlichkeit gelüftet, damit die Jünger die Dunkelheit Golgothas bestehen. Jeder echte Trost ist Treibstoff für die kommende Nacht.",
        "la": "Per momentum velum gloriae elevatur, ut discipuli tenebras Calvariae sustineant. Omnis vera consolatio fomes est noctis venturae.",
        "ru": "На мгновение приоткрывается завеса славы, чтобы ученики выдержали тьму Голгофы. Всякое подлинное утешение — топливо на грядущую ночь.",
        "ru_translit": "Na mgnoveniye priotkryvayetsya zavesa slavy, chtoby ucheniki vyderzhali t'mu Golgofy. Vsyakoye podlinnoye utesheniye — toplivo na gryadushchuyu noch'.",
        "uk": "На мить піднімається завіса слави, щоб учні витримали темряву Голгофи. Усяка справжня розрада — пальне на ніч, що прийде.",
        "uk_translit": "Na myt' pidnimaiet'sia zavisa slavy, shchob uchni vytrymaly temriavu Holhofy. Usiaka spravzhnia rozrada — pal'ne na nich, shcho pryide.",
        "be": "На імгненьне ўзьнімаецца заслона славы, каб вучні вытрымалі цемру Галгофы. Усялякая праўдзівая ўцеха — паліва на ноч, што прыйдзе.",
        "be_translit": "Na imhnieńnie ŭznimajecca zasłona słavy, kab vučni vytrymali ciemru Hałhofy. Usialakaja praŭdzivaja ŭciecha — paliva na noč, što pryjdzie.",
        "zh": "光榮的帷幕短暫揭起，好讓門徒能承受加爾瓦略的黑暗。每一個真實的安慰，都是即將到來之夜的燃料。",
        "zh_translit": "Guāngróng de wéimù duǎnzàn jiē qǐ, hǎo ràng méntú néng chéngshòu Jiā'ěrwǎlüè de hēi'àn. Měi yīgè zhēnshí de ānwèi, dōu shì jíjiāng dàolái zhī yè de ránliào."
      }
    },
    {
      "id": "luminous_5",
      "category": "luminous",
      "order_in_set": 5,
      "name": {
        "pl": "Ustanowienie Eucharystii",
        "it": "L'Istituzione dell'Eucaristia",
        "fr": "L'Institution de l'Eucharistie",
        "es": "La Institución de la Eucaristía",
        "de": "Die Einsetzung der Eucharistie",
        "la": "Institutio Eucharistiae",
        "ru": "Установление Евхаристии",
        "ru_translit": "Ustanovleniye Yevkharistii",
        "uk": "Установлення Євхаристії",
        "uk_translit": "Ustanovlennia Yevkharystii",
        "be": "Устанаўленьне Эўхарыстыі",
        "be_translit": "Ustanaŭlennie Eŭcharystyji",
        "zh": "建立聖體聖事",
        "zh_translit": "Jiànlì shèngtǐ shèngshì"
      },
      "scripture": {
        "reference_canonical": "Mt 26,26-29",
        "reference_localized": {
          "pl": "Mt 26,26-29",
          "it": "Mt 26,26-29",
          "fr": "Mt 26,26-29",
          "es": "Mt 26,26-29",
          "de": "Mt 26,26-29",
          "la": "Mt 26,26-29",
          "ru": "Мф 26,26-29",
          "ru_translit": "Mf 26,26-29",
          "uk": "Мт 26,26-29",
          "uk_translit": "Mt 26,26-29",
          "be": "Мц 26,26-29",
          "be_translit": "Mc 26,26-29",
          "zh": "瑪竇福音 26:26-29",
          "zh_translit": "Mǎdòu fúyīn 26:26-29"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "W przeddzień śmierci daje Siebie pod postacią chleba — najkruchszy gest, najtrwalsza obietnica. Jeśli On staje się dla mnie pokarmem, to ja stanę się chlebem dla drugich.",
        "it": "La vigilia della morte si dona sotto le specie del pane — il gesto più fragile, la promessa più tenace. Se Lui si fa cibo per me, io divento pane per gli altri.",
        "fr": "La veille de Sa mort, Il se donne sous l'espèce du pain — le geste le plus fragile, la promesse la plus tenace. S'Il se fait nourriture pour moi, je deviens pain pour les autres.",
        "es": "La víspera de Su muerte se entrega bajo la especie del pan — el gesto más frágil, la promesa más firme. Si Él se hace alimento para mí, yo me hago pan para los demás.",
        "de": "Am Vorabend Seines Todes gibt Er sich in der Gestalt des Brotes — die zerbrechlichste Geste, die haltbarste Verheißung. Wenn Er meine Nahrung wird, werde ich Brot für die anderen.",
        "la": "Pridie mortis Suae sub specie panis se dat — gestus fragillimus, promissio firmissima. Si Ille mihi cibus fit, ego panis aliis fio.",
        "ru": "В канун смерти отдаёт Себя под видом хлеба — жест самый хрупкий, обещание самое стойкое. Если Он становится пищей для меня, я становлюсь хлебом для других.",
        "ru_translit": "V kanun smerti otdayot Sebya pod vidom khleba — zhest samyy khrupkiy, obeshchaniye samoye stoykoye. Yesli On stanovitsya pishchey dlya menya, ya stanovlyus' khlebom dlya drugikh.",
        "uk": "Напередодні смерті віддає Себе під виглядом хліба — жест найкрихкіший, обіцянка найстійкіша. Якщо Він стає поживою для мене, я стаю хлібом для інших.",
        "uk_translit": "Naperedodni smerti viddaie Sebe pid vyhliadom khliba — zhest naikrykhkishyi, obitsianka naistiikisha. Yakshcho Vin staie pozhyvoiu dlia mene, ya staiu khlibom dlia inshykh.",
        "be": "Напярэдадні сьмерці аддае Сябе пад выглядам хлеба — жэст найкруткейшы, абяцаньне найстойкае. Калі Ён становіцца пакарманьнем для мяне, я стаюся хлебам для іншых.",
        "be_translit": "Napieradadni smierci addaje Siabie pad vyhliadam chleba — žest najkrutkiejšy, abiacańnie najstojkaje. Kali Jon stanovicca pakarmańniem dla mianie, ja stajusia chliebam dla inšych.",
        "zh": "在受死的前夕，祂以麵餅的形式把自己交付——最脆弱的舉動，最堅固的承諾。如果祂成為我的食糧，我便成為他人的餅。",
        "zh_translit": "Zài shòusǐ de qiánxī, tā yǐ miànbǐng de xíngshì bǎ zìjǐ jiāofù — zuì cuìruò de jǔdòng, zuì jiāngù de chéngnuò. Rúguǒ tā chéngwéi wǒ de shíliáng, wǒ biàn chéngwéi tārén de bǐng."
      }
    },
    {
      "id": "sorrowful_1",
      "category": "sorrowful",
      "order_in_set": 1,
      "name": {
        "pl": "Modlitwa Pana Jezusa w Ogrójcu",
        "it": "L'Agonia di Gesù nel Getsemani",
        "fr": "L'Agonie de Jésus au jardin",
        "es": "La Oración de Jesús en el Huerto",
        "de": "Das Gebet Jesu am Ölberg",
        "la": "Oratio Iesu in horto Gethsemani",
        "ru": "Моление о Чаше в Гефсиманском саду",
        "ru_translit": "Moleniye o Chashe v Gefsimanskom sadu",
        "uk": "Моління в Гетсиманському саду",
        "uk_translit": "Molinnia v Hetsymans'komu sadu",
        "be": "Малітва Езуса ў Гетсыманскім садзе",
        "be_translit": "Malitva Jezusa ŭ Hetsymanskim sadzie",
        "zh": "耶穌山園祈禱",
        "zh_translit": "Yēsū shānyuán qídǎo"
      },
      "scripture": {
        "reference_canonical": "Łk 22,39-46",
        "reference_localized": {
          "pl": "Łk 22,39-46",
          "it": "Lc 22,39-46",
          "fr": "Lc 22,39-46",
          "es": "Lc 22,39-46",
          "de": "Lk 22,39-46",
          "la": "Lc 22,39-46",
          "ru": "Лк 22,39-46",
          "ru_translit": "Lk 22,39-46",
          "uk": "Лк 22,39-46",
          "uk_translit": "Lk 22,39-46",
          "be": "Лк 22,39-46",
          "be_translit": "Lk 22,39-46",
          "zh": "路加福音 22:39-46",
          "zh_translit": "Lùjiā fúyīn 22:39-46"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "«Nie moja, ale Twoja wola». W tej jednej linijce mieści się cała wolność człowieka. Jezus modli się ją w pocie krwi — bym ja mógł ją wypowiedzieć w pocie codzienności.",
        "it": "«Non la mia, ma la tua volontà». In quest'unica frase sta tutta la libertà dell'uomo. Gesù la prega nel sudore di sangue — perché io possa pronunciarla nel sudore del quotidiano.",
        "fr": "«Non ma volonté, mais la tienne». Dans cette seule phrase tient toute la liberté de l'homme. Jésus la prie dans la sueur de sang — pour que je puisse la dire dans la sueur du quotidien.",
        "es": "«No mi voluntad, sino la tuya». En esta sola frase cabe toda la libertad del hombre. Jesús la reza en sudor de sangre — para que yo la pronuncie en el sudor del día a día.",
        "de": "«Nicht mein, sondern dein Wille». In diesem einen Satz steckt die ganze Freiheit des Menschen. Jesus betet ihn im Blutschweiß — damit ich ihn im Schweiß des Alltags sprechen kann.",
        "la": "«Non mea, sed tua voluntas». In hac una sententia tota libertas hominis continetur. Iesus eam orat in sudore sanguinis — ut ego eam in sudore cotidiani dicere possim.",
        "ru": "«Не Моя, но Твоя воля». В одной этой фразе вся свобода человека. Иисус молится её в кровавом поту — чтобы я мог произнести её в поту повседневности.",
        "ru_translit": "«Ne Moya, no Tvoya volya». V odnoy etoy fraze vsya svoboda cheloveka. Iisus molitsya yeyo v krovavom potu — chtoby ya mog proiznesti yeyo v potu povsednevnosti.",
        "uk": "«Не Моя, а Твоя воля». В одній цій фразі вся свобода людини. Ісус молиться її в кривавім поту — щоб я зміг вимовити її в поту буденності.",
        "uk_translit": "«Ne Moia, a Tvoia volia». V odnii tsii frazi vsia svoboda liudyny. Isus molyt'sia yii v kryvavim potu — shchob ya zmih vymovyty yii v potu budennosti.",
        "be": "«Ня Мая, але Твая воля». У адной гэтай фразе ўся свабода чалавека. Езус моліцца яе ў крывавым поце — каб я мог вымавіць яе ў поце штодзённасьці.",
        "be_translit": "«Nia Maja, alie Tvaja vola». U adnoj hetaj frazie ŭsia svaboda čaławieka. Jezus molicca jaje ŭ kryvavym pocie — kab ja moh vymavić jaje ŭ pocie štodzionnasci.",
        "zh": "「不要照我的意願，而要照祢的旨意。」這一句話容下人類全部的自由。耶穌在血汗中祈禱——好讓我能在日常的汗水中說出它。",
        "zh_translit": "«Bùyào zhào wǒ de yìyuàn, ér yào zhào nǐ de zhǐyì». Zhè yījù huà róng xià rénlèi quánbù de zìyóu. Yēsū zài xuèhàn zhōng qídǎo — hǎo ràng wǒ néng zài rìcháng de hànshuǐ zhōng shuōchū tā."
      }
    },
    {
      "id": "sorrowful_2",
      "category": "sorrowful",
      "order_in_set": 2,
      "name": {
        "pl": "Biczowanie Pana Jezusa",
        "it": "La Flagellazione di Gesù",
        "fr": "La Flagellation",
        "es": "La Flagelación del Señor",
        "de": "Die Geißelung Jesu",
        "la": "Flagellatio Iesu",
        "ru": "Бичевание Господа Иисуса",
        "ru_translit": "Bichevaniye Gospoda Iisusa",
        "uk": "Бичування Господа Ісуса",
        "uk_translit": "Bychuvannia Hospoda Isusa",
        "be": "Бічаваньне Госпада Езуса",
        "be_translit": "Bičavannie Hospada Jezusa",
        "zh": "耶穌受鞭打",
        "zh_translit": "Yēsū shòu biāndǎ"
      },
      "scripture": {
        "reference_canonical": "J 19,1",
        "reference_localized": {
          "pl": "J 19,1",
          "it": "Gv 19,1",
          "fr": "Jn 19,1",
          "es": "Jn 19,1",
          "de": "Joh 19,1",
          "la": "Io 19,1",
          "ru": "Ин 19,1",
          "ru_translit": "In 19,1",
          "uk": "Ів 19,1",
          "uk_translit": "Iv 19,1",
          "be": "Ян 19,1",
          "be_translit": "Jan 19,1",
          "zh": "若望福音 19:1",
          "zh_translit": "Ruòwàng fúyīn 19:1"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Ciało Niewinnego pokrywają rany za każdy grzech, którego nie chcę nazwać po imieniu. Nie kryję się dziś przed prawdą o sobie — Jego rany są moim leczeniem.",
        "it": "Il corpo dell'Innocente si copre di piaghe per ogni peccato che non voglio nominare. Oggi non mi nascondo davanti alla verità su di me — le Sue piaghe sono la mia guarigione.",
        "fr": "Le corps de l'Innocent se couvre de plaies pour chaque péché que je refuse de nommer. Je ne me cache pas aujourd'hui devant la vérité sur moi — Ses plaies sont ma guérison.",
        "es": "El cuerpo del Inocente se cubre de llagas por cada pecado que no quiero nombrar. Hoy no me escondo de la verdad sobre mí — Sus llagas son mi sanación.",
        "de": "Der Leib des Unschuldigen bedeckt sich mit Wunden für jede Sünde, die ich nicht beim Namen nennen will. Heute verberge ich mich nicht vor der Wahrheit über mich — Seine Wunden sind meine Heilung.",
        "la": "Corpus Innocentis vulneribus tegitur pro omni peccato quod nominare nolo. Hodie non me abscondo a veritate de me — vulnera Eius sanatio mea sunt.",
        "ru": "Тело Невинного покрывается ранами за каждый грех, который я не хочу назвать. Сегодня не прячусь от правды о себе — Его раны — моё исцеление.",
        "ru_translit": "Telo Nevinnogo pokryvayetsya ranami za kazhdyy grekh, kotoryy ya ne khochu nazvat'. Segodnya ne pryachus' ot pravdy o sebe — Yego rany — moyo istseleniye.",
        "uk": "Тіло Невинного вкривається ранами за кожен гріх, якого я не хочу назвати. Сьогодні не ховаюся від правди про себе — Його рани — моє зцілення.",
        "uk_translit": "Tilo Nevynnoho vkryvaiet'sia ranamy za kozhen hrikh, yakoho ya ne khochu nazvaty. S'ohodni ne khovaiusia vid pravdy pro sebe — Yoho rany — moie ztsilennia.",
        "be": "Цела Нявіннага накрываецца ранамі за кожны грэх, які я не хачу назваць. Сёньня ня хаваюся ад праўды пра сябе — Ягоныя раны — маё аздараўленьне.",
        "be_translit": "Ciela Niavinnaha nakryvajecca ranami za kožny hreh, jaki ja nie chaču nazvać. Sionnia nia chavajusia ad praŭdy pra siabie — Jahonyja rany — majo azdaraŭleńnie.",
        "zh": "無辜者的身體因我每一個不願指名的罪而蒙傷。今天我不再躲避關於我自己的真相——祂的傷痕，就是我的醫治。",
        "zh_translit": "Wúgū zhě de shēntǐ yīn wǒ měi yīgè bù yuàn zhǐmíng de zuì ér méngshāng. Jīntiān wǒ bù zài duǒbì guānyú wǒ zìjǐ de zhēnxiàng — tā de shānghén, jiùshì wǒ de yīzhì."
      }
    },
    {
      "id": "sorrowful_3",
      "category": "sorrowful",
      "order_in_set": 3,
      "name": {
        "pl": "Cierniem ukoronowanie Pana Jezusa",
        "it": "La Coronazione di spine",
        "fr": "Le Couronnement d'épines",
        "es": "La Coronación de espinas",
        "de": "Die Dornenkrönung Jesu",
        "la": "Coronatio spinis",
        "ru": "Терновый венец",
        "ru_translit": "Ternovyy venets",
        "uk": "Увінчання терновим вінком",
        "uk_translit": "Uvinchannia ternovym vinkom",
        "be": "Каранаваньне цернем",
        "be_translit": "Karanavannie ciernem",
        "zh": "耶穌受茨冠之苦",
        "zh_translit": "Yēsū shòu cíguān zhī kǔ"
      },
      "scripture": {
        "reference_canonical": "Mt 27,27-31",
        "reference_localized": {
          "pl": "Mt 27,27-31",
          "it": "Mt 27,27-31",
          "fr": "Mt 27,27-31",
          "es": "Mt 27,27-31",
          "de": "Mt 27,27-31",
          "la": "Mt 27,27-31",
          "ru": "Мф 27,27-31",
          "ru_translit": "Mf 27,27-31",
          "uk": "Мт 27,27-31",
          "uk_translit": "Mt 27,27-31",
          "be": "Мц 27,27-31",
          "be_translit": "Mc 27,27-31",
          "zh": "瑪竇福音 27:27-31",
          "zh_translit": "Mǎdòu fúyīn 27:27-31"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Naśmiewają się z Króla, którego nie rozpoznają. Każda moja próżność, każde podporządkowanie cudzemu zdaniu wbija jeden cierń więcej; daję Mu dziś prawo do bycia jedynym Sędzią mojej wartości.",
        "it": "Si fanno beffe del Re che non riconoscono. Ogni mia vanità, ogni asservimento all'opinione altrui infigge una spina in più; gli concedo oggi il diritto di essere l'unico Giudice del mio valore.",
        "fr": "Ils se moquent du Roi qu'ils ne reconnaissent pas. Chaque vanité de ma part, chaque soumission à l'opinion d'autrui enfonce une épine de plus ; je Lui accorde aujourd'hui le droit d'être le seul Juge de ma valeur.",
        "es": "Se burlan del Rey al que no reconocen. Cada vanidad mía, cada sumisión a la opinión ajena clava una espina más; hoy Le concedo el derecho de ser el único Juez de mi valor.",
        "de": "Sie verspotten den König, den sie nicht erkennen. Jede meiner Eitelkeiten, jede Unterwerfung unter fremde Meinungen schlägt einen Dorn mehr ein; ich gebe Ihm heute das Recht, der einzige Richter meines Wertes zu sein.",
        "la": "Irrident Regem quem non agnoscunt. Omnis mea vanitas, omnis subiectio alieno iudicio spinam unam plus infigit; do Illi hodie ius esse solum Iudicem valoris mei.",
        "ru": "Они насмехаются над Царём, Которого не узнают. Каждое моё тщеславие, каждое подчинение чужому мнению вбивает ещё один терний; даю Ему сегодня право быть единственным Судьёй моей ценности.",
        "ru_translit": "Oni nasmekhayutsya nad Tsaryom, Kotorogo ne uznayut. Kazhdoye moyo tshcheslaviye, kazhdoye podchineniye chuzhomu mneniyu vbivayet yeshchyo odin terniy; dayu Yemu segodnya pravo byt' yedinstvennym Sud'yoy moyey tsennosti.",
        "uk": "Вони насміхаються з Царя, Якого не впізнають. Кожна моя марнославність, кожне підкорення чужій думці вбиває ще один терен; даю Йому сьогодні право бути єдиним Суддею моєї цінності.",
        "uk_translit": "Vony nasmikhaiut'sia z Tsaria, Yakoho ne vpiznaiut'. Kozhna moia marnoslavnist', kozhne pidkorennia chuzhii dumtsi vbyvaie shche odyn teren; daiu Yomu s'ohodni pravo buty yedynym Suddeiu moiei tsinnosti.",
        "be": "Яны зьдзекуюцца з Караля, Якога не пазнаюць. Кожная мая марнаслаўнасьць, кожнае падпарадкаваньне чужой думцы заганяе яшчэ адзін цёрн; даю Яму сёньня права быць адзіным Судзьдзём маёй вартасьці.",
        "be_translit": "Jany zdziekujucca z Karalia, Jakoha nie paznajuć. Kožnaja maja marnasłaŭnasć, kožnaje padparadkavaŭnie čužoj dumcy zahaniaje jašče adzin ciorn; daju Jamu sionnia prava być adzinym Sudzdziom majoj vartasci.",
        "zh": "他們戲弄那未被認出的君王。我的每一份虛榮、每一次屈服於他人的評價，都釘下一根新的荊棘；今天我承認祂作我價值的唯一審判者。",
        "zh_translit": "Tāmen xìnòng nà wèi bèi rènchū de jūnwáng. Wǒ de měi yī fèn xūróng, měi yīcì qūfú yú tārén de píngjià, dōu dīng xià yīgēn xīn de jīngjí; jīntiān wǒ chéngrèn tā zuò wǒ jiàzhí de wéiyī shěnpàn zhě."
      }
    },
    {
      "id": "sorrowful_4",
      "category": "sorrowful",
      "order_in_set": 4,
      "name": {
        "pl": "Dźwiganie krzyża na Kalwarię",
        "it": "Gesù carica della Croce sale al Calvario",
        "fr": "Le Portement de la Croix",
        "es": "Jesús carga la Cruz camino del Calvario",
        "de": "Die Kreuztragung Jesu",
        "la": "Baiulatio Crucis",
        "ru": "Несение креста на Голгофу",
        "ru_translit": "Neseniye kresta na Golgofu",
        "uk": "Несення хреста на Голгофу",
        "uk_translit": "Nesennia khresta na Holhofu",
        "be": "Несьце крыжа на Галгофу",
        "be_translit": "Nieście kryža na Hałhofu",
        "zh": "耶穌負十字架上山",
        "zh_translit": "Yēsū fù shízìjià shàng shān"
      },
      "scripture": {
        "reference_canonical": "J 19,16-17",
        "reference_localized": {
          "pl": "J 19,16-17",
          "it": "Gv 19,16-17",
          "fr": "Jn 19,16-17",
          "es": "Jn 19,16-17",
          "de": "Joh 19,16-17",
          "la": "Io 19,16-17",
          "ru": "Ин 19,16-17",
          "ru_translit": "In 19,16-17",
          "uk": "Ів 19,16-17",
          "uk_translit": "Iv 19,16-17",
          "be": "Ян 19,16-17",
          "be_translit": "Jan 19,16-17",
          "zh": "若望福音 19:16-17",
          "zh_translit": "Ruòwàng fúyīn 19:16-17"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Trzy upadki — i trzy razy się podnosi. Nie wstrzymuje krzyża, wstrzymuje porażkę. Mój krzyż nie wymaga ode mnie heroizmu, tylko jednego: wstać kolejny raz.",
        "it": "Tre cadute — e tre volte si rialza. Non ferma la croce, ferma la sconfitta. La mia croce non mi chiede eroismo, ma una sola cosa: rialzarmi ancora.",
        "fr": "Trois chutes — et trois fois Il se relève. Il n'arrête pas la croix, Il arrête la défaite. Ma croix ne me demande pas l'héroïsme, seulement une chose : me relever encore.",
        "es": "Tres caídas — y tres veces se levanta. No detiene la cruz, detiene la derrota. Mi cruz no me pide heroísmo, solo una cosa: levantarme otra vez.",
        "de": "Drei Stürze — und dreimal richtet Er sich auf. Er hält das Kreuz nicht auf, Er hält die Niederlage auf. Mein Kreuz verlangt von mir keinen Heroismus, nur eines: noch einmal aufzustehen.",
        "la": "Tres lapsus — et ter resurgit. Non crucem prohibet, sed cladem. Crux mea heroismum a me non poscit, sed unum: iterum surgere.",
        "ru": "Три падения — и три раза встаёт. Не останавливает крест, а останавливает поражение. Мой крест не требует героизма, только одного: встать ещё раз.",
        "ru_translit": "Tri padeniya — i tri raza vstayot. Ne ostanavlivayet krest, a ostanavlivayet porazheniye. Moy krest ne trebuyet geroizma, tol'ko odnogo: vstat' yeshchyo raz.",
        "uk": "Три падіння — і тричі піднімається. Не зупиняє хрест, а зупиняє поразку. Мій хрест не вимагає геройства, лише одного: встати ще раз.",
        "uk_translit": "Try padinnia — i trychi pidnimaiet'sia. Ne zupyniaie khrest, a zupyniaie porazku. Mii khrest ne vymahaie heroistva, lyshe odnoho: vstaty shche raz.",
        "be": "Тры падзеньня — і тройчы ўстае. Ня спыняе крыжа, а спыняе паразу. Мой крыж не патрабуе ад мяне геройства, толькі аднаго: устаць яшчэ раз.",
        "be_translit": "Try padzieńnia — i trojčy ŭstaje. Nia spyniaje kryža, a spyniaje parazu. Moj kryž nie patrabuje ad mianie hierojstva, tolki adnaho: ustać jašče raz.",
        "zh": "三次跌倒——三次重新站起。祂沒有阻止十字架，祂阻止了失敗。我的十字架不要求英雄主義，只要求一件事：再站起來一次。",
        "zh_translit": "Sān cì diédǎo — sān cì chóngxīn zhànqǐ. Tā méiyǒu zǔzhǐ shízìjià, tā zǔzhǐle shībài. Wǒ de shízìjià bù yāoqiú yīngxióng zhǔyì, zhǐ yāoqiú yī jiàn shì: zài zhàn qǐlái yīcì."
      }
    },
    {
      "id": "sorrowful_5",
      "category": "sorrowful",
      "order_in_set": 5,
      "name": {
        "pl": "Śmierć Pana Jezusa na krzyżu",
        "it": "La Crocifissione e Morte di Gesù",
        "fr": "La Crucifixion et la Mort de Jésus",
        "es": "La Crucifixión y Muerte de Jesús",
        "de": "Der Kreuzestod Jesu",
        "la": "Crucifixio et mors Iesu",
        "ru": "Распятие и смерть Господа",
        "ru_translit": "Raspyatiye i smert' Gospoda",
        "uk": "Розп'яття і смерть Господа",
        "uk_translit": "Rozp'iattia i smert' Hospoda",
        "be": "Укрыжаваньне і сьмерць Госпада",
        "be_translit": "Ukryžavannie i smierć Hospada",
        "zh": "耶穌被釘死於十字架",
        "zh_translit": "Yēsū bèi dīng sǐ yú shízìjià"
      },
      "scripture": {
        "reference_canonical": "J 19,25-30",
        "reference_localized": {
          "pl": "J 19,25-30",
          "it": "Gv 19,25-30",
          "fr": "Jn 19,25-30",
          "es": "Jn 19,25-30",
          "de": "Joh 19,25-30",
          "la": "Io 19,25-30",
          "ru": "Ин 19,25-30",
          "ru_translit": "In 19,25-30",
          "uk": "Ів 19,25-30",
          "uk_translit": "Iv 19,25-30",
          "be": "Ян 19,25-30",
          "be_translit": "Jan 19,25-30",
          "zh": "若望福音 19:25-30",
          "zh_translit": "Ruòwàng fúyīn 19:25-30"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "«Wykonało się». Trzy słowa, w których mieści się odkupienie wszystkiego. U stóp krzyża stoi Matka — odtąd Matka każdego, kto pod ten krzyż staje.",
        "it": "«È compiuto». Tre parole in cui sta la redenzione di tutto. Ai piedi della croce sta la Madre — d'ora in poi Madre di chiunque vi si fermi sotto.",
        "fr": "«Tout est accompli». Trois mots qui contiennent la rédemption de tout. Au pied de la croix se tient la Mère — désormais Mère de quiconque vient s'arrêter sous cette croix.",
        "es": "«Todo está cumplido». Tres palabras que contienen la redención de todo. Al pie de la cruz está la Madre — desde ahora Madre de quien se detenga bajo esta cruz.",
        "de": "«Es ist vollbracht». Drei Worte, in denen die Erlösung von allem liegt. Am Fuß des Kreuzes steht die Mutter — von nun an Mutter jedes Menschen, der sich unter dieses Kreuz stellt.",
        "la": "«Consummatum est». Tres voces in quibus redemptio omnium continetur. Ad pedem crucis Mater stat — deinceps Mater cuiusvis sub hac cruce stantis.",
        "ru": "«Совершилось». Три слова, в которых вмещается искупление всего. У подножия креста стоит Матерь — отныне Матерь каждого, кто под этим крестом останавливается.",
        "ru_translit": "«Sovershilos'». Tri slova, v kotorykh vmeshchayetsya iskupleniye vsego. U podnozhiya kresta stoit Mater' — otnyne Mater' kazhdogo, kto pod etim krestom ostanavlivayetsia.",
        "uk": "«Звершилося». Три слова, в яких вміщається відкуплення всього. Біля підніжжя хреста стоїть Мати — відтепер Мати кожного, хто під цим хрестом зупиниться.",
        "uk_translit": "«Zvershylosia». Try slova, v yakykh vmishchaiet'sia vidkuplennia vsioho. Bilia pidnizhzhia khresta stoit' Maty — vidteper Maty kozhnoho, khto pid tsym khrestom zupynyt'sia.",
        "be": "«Зьдзейсьнілася». Тры словы, у якіх зьмяшчаецца адкупленьне ўсяго. Каля падножжа крыжа стаіць Маці — адгэтуль Маці кожнага, хто пад гэтым крыжам спыніцца.",
        "be_translit": "«Zdziejsniłasia». Try słovy, u jakich zmiaščajecca adkuplennia ŭsiaho. Kala padnožža kryža staić Maci — adhetul' Maci kožnaha, chto pad hetym kryžam spynicca.",
        "zh": "「完成了。」三個字裡藏著萬有的救贖。十字架下站著母親——從此她是每一個願在十字架下停留之人的母親。",
        "zh_translit": "«Wánchéngle». Sān gè zì lǐ cángzhe wànyǒu de jiùshú. Shízìjià xià zhànzhe mǔqīn — cóngcǐ tā shì měi yīgè yuàn zài shízìjià xià tíngliú zhī rén de mǔqīn."
      }
    },
    {
      "id": "glorious_1",
      "category": "glorious",
      "order_in_set": 1,
      "name": {
        "pl": "Zmartwychwstanie Pana Jezusa",
        "it": "La Risurrezione di Gesù",
        "fr": "La Résurrection",
        "es": "La Resurrección del Señor",
        "de": "Die Auferstehung Jesu",
        "la": "Resurrectio Domini",
        "ru": "Воскресение Господне",
        "ru_translit": "Voskreseniye Gospodne",
        "uk": "Воскресіння Господнє",
        "uk_translit": "Voskresinnia Hospodnie",
        "be": "Уваскрашэньне Госпадава",
        "be_translit": "Uvaskrašennie Hospadava",
        "zh": "耶穌復活",
        "zh_translit": "Yēsū fùhuó"
      },
      "scripture": {
        "reference_canonical": "Mt 28,1-10",
        "reference_localized": {
          "pl": "Mt 28,1-10",
          "it": "Mt 28,1-10",
          "fr": "Mt 28,1-10",
          "es": "Mt 28,1-10",
          "de": "Mt 28,1-10",
          "la": "Mt 28,1-10",
          "ru": "Мф 28,1-10",
          "ru_translit": "Mf 28,1-10",
          "uk": "Мт 28,1-10",
          "uk_translit": "Mt 28,1-10",
          "be": "Мц 28,1-10",
          "be_translit": "Mc 28,1-10",
          "zh": "瑪竇福音 28:1-10",
          "zh_translit": "Mǎdòu fúyīn 28:1-10"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Grób jest pusty, bo Życie nie mieści się w grobie. To, co we mnie umarło, nie musi pozostać w ziemi — On wychodzi pierwszy, by mnie wyprowadzić.",
        "it": "Il sepolcro è vuoto, perché la Vita non sta in un sepolcro. Ciò che in me è morto non deve restare nella terra — Lui esce per primo, per farmi uscire.",
        "fr": "Le tombeau est vide, car la Vie ne tient pas dans un tombeau. Ce qui est mort en moi ne doit pas rester en terre — Il sort le premier pour me faire sortir.",
        "es": "El sepulcro está vacío, porque la Vida no cabe en un sepulcro. Lo que en mí ha muerto no debe quedar bajo tierra — Él sale primero, para hacerme salir.",
        "de": "Das Grab ist leer, weil das Leben nicht in ein Grab passt. Was in mir gestorben ist, muss nicht in der Erde bleiben — Er geht zuerst hinaus, um mich hinauszuführen.",
        "la": "Sepulcrum vacuum est, quia Vita in sepulcro non capitur. Quod in me mortuum est in terra manere non debet — Ipse prior exit ut me educat.",
        "ru": "Гроб пуст, ибо Жизнь не вмещается во гробе. То, что во мне умерло, не должно оставаться в земле — Он выходит первым, чтобы вывести меня.",
        "ru_translit": "Grob pust, ibo Zhizn' ne vmeshchayetsya vo grobe. To, chto vo mne umerlo, ne dolzhno ostavat'sya v zemle — On vykhodit pervym, chtoby vyvesti menya.",
        "uk": "Гріб порожній, бо Життя не вміщається в гробі. Те, що в мені померло, не має лишатися в землі — Він виходить першим, щоб вивести мене.",
        "uk_translit": "Hrib porozhnii, bo Zhyttia ne vmishchaiet'sia v hrobi. Te, shcho v meni pomerlo, ne maie lyshatysia v zemli — Vin vykhodyt' pershym, shchob vyvesty mene.",
        "be": "Магіла пустая, бо Жыцьцё ня зьмяшчаецца ў магіле. Тое, што ў мне памерла, ня мусіць заставацца ў зямлі — Ён выходзіць першым, каб вывесьці мяне.",
        "be_translit": "Mahila pustaja, bo Žyćcio nia zmiaščajecca ŭ mahilie. Toje, što ŭ mnie pamierła, nia musić zastavacca ŭ ziamli — Jon vychodzić peršym, kab vyviesci mianie.",
        "zh": "墳墓空了，因為生命無法容於墳墓。我內裡死去的，不必留在地裡——祂先出來，為要把我帶出來。",
        "zh_translit": "Fénmù kōngle, yīnwèi shēngmìng wúfǎ róng yú fénmù. Wǒ nèi lǐ sǐqù de, bùbì liú zài dì lǐ — tā xiān chūlái, wèi yào bǎ wǒ dài chūlái."
      }
    },
    {
      "id": "glorious_2",
      "category": "glorious",
      "order_in_set": 2,
      "name": {
        "pl": "Wniebowstąpienie Pana Jezusa",
        "it": "L'Ascensione di Gesù al Cielo",
        "fr": "L'Ascension",
        "es": "La Ascensión del Señor",
        "de": "Die Himmelfahrt Christi",
        "la": "Ascensio Domini",
        "ru": "Вознесение Господне",
        "ru_translit": "Vozneseniye Gospodne",
        "uk": "Вознесіння Господнє",
        "uk_translit": "Voznesinnia Hospodnie",
        "be": "Узыходжаньне Госпадава",
        "be_translit": "Uzychodžannie Hospadava",
        "zh": "耶穌升天",
        "zh_translit": "Yēsū shēngtiān"
      },
      "scripture": {
        "reference_canonical": "Dz 1,6-11",
        "reference_localized": {
          "pl": "Dz 1,6-11",
          "it": "At 1,6-11",
          "fr": "Ac 1,6-11",
          "es": "Hch 1,6-11",
          "de": "Apg 1,6-11",
          "la": "Act 1,6-11",
          "ru": "Деян 1,6-11",
          "ru_translit": "Deian 1,6-11",
          "uk": "Ді 1,6-11",
          "uk_translit": "Di 1,6-11",
          "be": "Дз 1,6-11",
          "be_translit": "Dz 1,6-11",
          "zh": "宗徒大事錄 1:6-11",
          "zh_translit": "Zōngtú dàshìlù 1:6-11"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Wraca do Ojca, ale nie odchodzi. Niebo nie jest miejscem dalekim, lecz tym wymiarem rzeczywistości, do którego On dla mnie otwiera drzwi już dziś.",
        "it": "Torna al Padre, ma non se ne va. Il cielo non è un luogo lontano, ma quella dimensione del reale di cui Lui mi apre la porta già oggi.",
        "fr": "Il retourne au Père, mais ne s'en va pas. Le ciel n'est pas un lieu lointain, mais cette dimension du réel dont Il m'ouvre la porte dès aujourd'hui.",
        "es": "Vuelve al Padre, pero no se va. El cielo no es un lugar lejano, sino esa dimensión de lo real cuya puerta Él me abre ya hoy.",
        "de": "Er kehrt zum Vater zurück, aber Er geht nicht fort. Der Himmel ist kein ferner Ort, sondern jene Dimension der Wirklichkeit, deren Tür Er mir schon heute öffnet.",
        "la": "Ad Patrem redit, sed non discedit. Caelum non locus longinquus est, sed illa dimensio rerum cuius portam mihi iam hodie aperit.",
        "ru": "Возвращается к Отцу, но не уходит. Небо — не далёкое место, а то измерение реальности, дверь в которое Он отворяет мне уже сегодня.",
        "ru_translit": "Vozvrashchayetsia k Ottsu, no ne ukhodit. Nebo — ne dalyokoye mesto, a to izmereniye real'nosti, dver' v kotoroye On otvoryayet mne uzhe segodnya.",
        "uk": "Повертається до Отця, але не відходить. Небо — не далеке місце, а той вимір реальності, двері до якого Він відчиняє мені вже сьогодні.",
        "uk_translit": "Povertaiet'sia do Ottsia, ale ne vidkhodyt'. Nebo — ne daleke mistse, a toi vymir real'nosti, dveri do yakoho Vin vidchyniaie meni vzhe s'ohodni.",
        "be": "Вяртаецца да Айца, але не адыходзіць. Неба — ня далёкае месца, а той вымер рэчаіснасьці, дзьверы да якога Ён адчыняе мне ўжо сёньня.",
        "be_translit": "Viartajecca da Ajca, alie nie adychodzić. Nieba — nia daliokaje miesca, a toj vymier rečaisnasci, dzvery da jakoha Jon adčyniaje mnie ŭžo sionnia.",
        "zh": "祂回到父那裡，但沒有離開。天並非一個遙遠的地方，而是祂今天就為我打開門的那個現實之維度。",
        "zh_translit": "Tā huí dào fù nàlǐ, dàn méiyǒu líkāi. Tiān bìngfēi yīgè yáoyuǎn de dìfāng, ér shì tā jīntiān jiù wèi wǒ dǎkāi mén de nàgè xiànshí zhī wéidù."
      }
    },
    {
      "id": "glorious_3",
      "category": "glorious",
      "order_in_set": 3,
      "name": {
        "pl": "Zesłanie Ducha Świętego",
        "it": "La Discesa dello Spirito Santo",
        "fr": "La Pentecôte",
        "es": "La Venida del Espíritu Santo",
        "de": "Die Herabkunft des Heiligen Geistes",
        "la": "Descensus Spiritus Sancti",
        "ru": "Сошествие Святого Духа",
        "ru_translit": "Soshestviye Svyatogo Dukha",
        "uk": "Зіслання Святого Духа",
        "uk_translit": "Zislannia Sviatoho Dukha",
        "be": "Спасланьне Сьвятога Духа",
        "be_translit": "Spasłannie Sviataha Ducha",
        "zh": "聖神降臨",
        "zh_translit": "Shèngshén jiànglín"
      },
      "scripture": {
        "reference_canonical": "Dz 2,1-13",
        "reference_localized": {
          "pl": "Dz 2,1-13",
          "it": "At 2,1-13",
          "fr": "Ac 2,1-13",
          "es": "Hch 2,1-13",
          "de": "Apg 2,1-13",
          "la": "Act 2,1-13",
          "ru": "Деян 2,1-13",
          "ru_translit": "Deian 2,1-13",
          "uk": "Ді 2,1-13",
          "uk_translit": "Di 2,1-13",
          "be": "Дз 2,1-13",
          "be_translit": "Dz 2,1-13",
          "zh": "宗徒大事錄 2:1-13",
          "zh_translit": "Zōngtú dàshìlù 2:1-13"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Ogień, który nie spala, lecz uzdalnia. Apostołowie wychodzą z Wieczernika i mówią językami obcych — Duch zawsze popycha za próg, nie pozwala zatrzymać daru dla siebie.",
        "it": "Fuoco che non brucia, ma abilita. Gli Apostoli escono dal Cenacolo e parlano lingue altrui — lo Spirito spinge sempre oltre la soglia, non lascia trattenere il dono per sé.",
        "fr": "Un feu qui ne consume pas, mais habilite. Les Apôtres sortent du Cénacle et parlent les langues des autres — l'Esprit pousse toujours au-delà du seuil, ne laisse pas garder le don pour soi.",
        "es": "Fuego que no consume, sino capacita. Los Apóstoles salen del Cenáculo y hablan lenguas ajenas — el Espíritu siempre empuja más allá del umbral, no deja guardar el don para sí.",
        "de": "Feuer, das nicht verzehrt, sondern befähigt. Die Apostel verlassen den Abendmahlssaal und sprechen fremde Sprachen — der Geist treibt immer über die Schwelle, lässt die Gabe nicht für sich behalten.",
        "la": "Ignis qui non consumit sed habilitat. Apostoli e Cenaculo exeunt et alienis linguis loquuntur — Spiritus semper trans limen propellit, donum sibi retinere non sinit.",
        "ru": "Огонь, который не сжигает, но даёт способность. Апостолы выходят из Сионской горницы и говорят чужими языками — Дух всегда выталкивает за порог, не даёт удержать дар для себя.",
        "ru_translit": "Ogon', kotoryy ne szhigayet, no dayot sposobnost'. Apostoly vykhodyat iz Sionskoy gornitsy i govoryat chuzhimi yazykami — Dukh vsegda vytalkivayet za porog, ne dayot uderzhat' dar dlya sebya.",
        "uk": "Вогонь, що не палить, а уздібнює. Апостоли виходять із Сіонської горниці і говорять чужими мовами — Дух завжди штовхає за поріг, не дає затримати дар для себе.",
        "uk_translit": "Vohon', shcho ne palyt', a uzdibniuie. Apostoly vykhodiat' iz Sions'koi hornytsi i hovoriat' chuzhymy movamy — Dukh zavzhdy shtovkhaie za porih, ne daie zatrymaty dar dlia sebe.",
        "be": "Агонь, які ня паліць, а спраўляе. Апосталы выходзяць зь сёнскай гарніцы і гавораць чужымі мовамі — Дух заўсёды штурхае за парог, не дае затрымаць дар для сябе.",
        "be_translit": "Ahoń, jaki nia palić, a spraŭlaje. Apostały vychodziać z sionskaj harnicy i havorać čužymi movami — Duch zaŭsiody šturchaje za paroh, nie daje zatrymać dar dla siabie.",
        "zh": "火不焚燒，卻使人有能力。宗徒走出晚餐廳，說起別人的語言——聖神總把人推過門檻，不容人把恩賜留給自己。",
        "zh_translit": "Huǒ bù fénshāo, què shǐ rén yǒu nénglì. Zōngtú zǒuchū wǎncān tīng, shuō qǐ biérén de yǔyán — Shèngshén zǒng bǎ rén tuīguò ménkǎn, bù róng rén bǎ ēncì liú gěi zìjǐ."
      }
    },
    {
      "id": "glorious_4",
      "category": "glorious",
      "order_in_set": 4,
      "name": {
        "pl": "Wniebowzięcie Najświętszej Maryi Panny",
        "it": "L'Assunzione di Maria al Cielo",
        "fr": "L'Assomption de la Vierge Marie",
        "es": "La Asunción de María",
        "de": "Die Aufnahme Mariens in den Himmel",
        "la": "Assumptio Beatae Mariae Virginis",
        "ru": "Успение Пресвятой Богородицы",
        "ru_translit": "Uspeniye Presvyatoy Bogoroditsy",
        "uk": "Успіння Пресвятої Богородиці",
        "uk_translit": "Uspinnia Presviatoi Bohorodytsi",
        "be": "Узяцьце Найсьвяцейшай Панны Марыі ў неба",
        "be_translit": "Uziaćcie Najsviaciejšaj Panny Maryji ŭ nieba",
        "zh": "聖母蒙召升天",
        "zh_translit": "Shèngmǔ méngzhào shēngtiān"
      },
      "scripture": {
        "reference_canonical": "Ap 12,1",
        "reference_localized": {
          "pl": "Ap 12,1",
          "it": "Ap 12,1",
          "fr": "Ap 12,1",
          "es": "Ap 12,1",
          "de": "Offb 12,1",
          "la": "Apoc 12,1",
          "ru": "Откр 12,1",
          "ru_translit": "Otkr 12,1",
          "uk": "Од 12,1",
          "uk_translit": "Od 12,1",
          "be": "Ап 12,1",
          "be_translit": "Ap 12,1",
          "zh": "默示錄 12:1",
          "zh_translit": "Mòshìlù 12:1"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Pierwsza odkupiona w pełni — z ciałem i duszą. Maryja jest pierwociną tego, co czeka mnie; we mnie też nic nie zostanie zmarnowane, gdy jestem Boży.",
        "it": "La prima pienamente redenta — anima e corpo. Maria è primizia di ciò che mi attende; anche in me nulla andrà perduto, finché sono di Dio.",
        "fr": "La première pleinement rachetée — âme et corps. Marie est les prémices de ce qui m'attend ; en moi aussi rien ne sera perdu, tant que je suis à Dieu.",
        "es": "La primera plenamente redimida — alma y cuerpo. María es primicia de lo que me espera; tampoco en mí se perderá nada, mientras sea de Dios.",
        "de": "Die Erste, die ganz erlöst ist — mit Leib und Seele. Maria ist die Erstlingsfrucht dessen, was mich erwartet; auch in mir wird nichts verloren gehen, solange ich Gott gehöre.",
        "la": "Prima plene redempta — corpore et anima. Maria primitiae sunt eius quod me manet; in me quoque nihil peribit, dum Dei sum.",
        "ru": "Первая полностью искупленная — телом и душой. Мария — начаток того, что ожидает меня; во мне тоже ничто не пропадёт, пока я Божий.",
        "ru_translit": "Pervaya polnost'yu iskuplennaya — telom i dushoy. Mariya — nachatok togo, chto ozhidayet menya; vo mne tozhe nichto ne propadyot, poka ya Bozhiy.",
        "uk": "Перша повністю відкуплена — тілом і душею. Марія — первістка того, що очікує мене; у мені теж ніщо не пропаде, поки я Божий.",
        "uk_translit": "Persha povnistiu vidkuplena — tilom i dusheiu. Mariia — pervistka toho, shcho ochikuie mene; u meni tezh nishcho ne propade, poky ya Bozhyi.",
        "be": "Першая цалкам адкупленая — целам і душою. Марыя — пачатак таго, што чакае мяне; у мне таксама нічога не прападзе, пакуль я Божы.",
        "be_translit": "Peršaja całkam adkuplenaja — ciełam i dušoju. Maryja — pačatak taho, što čakaje mianie; u mnie taksama ničoha nie prapadzie, pakul ja Božy.",
        "zh": "首位完全得救贖的人——靈與肉。瑪利亞是我未來的初熟之果；只要我屬於天主，我內在也沒有什麼會被丟失。",
        "zh_translit": "Shǒuwèi wánquán dé jiùshú de rén — líng yǔ ròu. Mǎlìyǎ shì wǒ wèilái de chū shú zhī guǒ; zhǐyào wǒ shǔyú Tiānzhǔ, wǒ nèizài yě méiyǒu shénme huì bèi diūshī."
      }
    },
    {
      "id": "glorious_5",
      "category": "glorious",
      "order_in_set": 5,
      "name": {
        "pl": "Ukoronowanie Najświętszej Maryi Panny na Królową nieba i ziemi",
        "it": "L'Incoronazione di Maria, Regina del Cielo e della Terra",
        "fr": "Le Couronnement de Marie",
        "es": "La Coronación de María como Reina",
        "de": "Die Krönung Mariens zur Königin",
        "la": "Coronatio Beatae Mariae Virginis",
        "ru": "Венчание Пресвятой Богородицы",
        "ru_translit": "Venchaniye Presvyatoy Bogoroditsy",
        "uk": "Коронування Пресвятої Богородиці",
        "uk_translit": "Koronuvannia Presviatoi Bohorodytsi",
        "be": "Каранаваньне Найсьвяцейшай Панны Марыі",
        "be_translit": "Karanavannie Najsviaciejšaj Panny Maryji",
        "zh": "聖母榮受加冕",
        "zh_translit": "Shèngmǔ róngshòu jiāmiǎn"
      },
      "scripture": {
        "reference_canonical": "Ap 12,1",
        "reference_localized": {
          "pl": "Ap 12,1",
          "it": "Ap 12,1",
          "fr": "Ap 12,1",
          "es": "Ap 12,1",
          "de": "Offb 12,1",
          "la": "Apoc 12,1",
          "ru": "Откр 12,1",
          "ru_translit": "Otkr 12,1",
          "uk": "Од 12,1",
          "uk_translit": "Od 12,1",
          "be": "Ап 12,1",
          "be_translit": "Ap 12,1",
          "zh": "默示錄 12:1",
          "zh_translit": "Mòshìlù 12:1"
        },
        "text_user": {
          "pl": "",
          "it": "",
          "fr": "",
          "es": "",
          "de": "",
          "la": "",
          "ru": "",
          "ru_translit": "",
          "uk": "",
          "uk_translit": "",
          "be": "",
          "be_translit": "",
          "zh": "",
          "zh_translit": ""
        }
      },
      "meditation": {
        "pl": "Korona Maryi nie odgradza Jej od mnie, lecz dlatego jest królową, że jest matką. Kto bliżej tronu — bliżej spraw, które mi przynosi do tronu.",
        "it": "La corona di Maria non La separa da me; è regina perché è madre. Chi è più vicino al trono, è più vicino alle cose che porta al trono per me.",
        "fr": "La couronne de Marie ne La sépare pas de moi ; Elle est reine parce qu'Elle est mère. Qui est plus proche du trône est plus proche des choses qu'Elle y porte pour moi.",
        "es": "La corona de María no La aparta de mí; es reina porque es madre. Quien está más cerca del trono, está más cerca de las cosas que lleva por mí ante el trono.",
        "de": "Die Krone Marias trennt Sie nicht von mir; Sie ist Königin, weil Sie Mutter ist. Wer dem Thron näher ist, ist auch den Anliegen näher, die Sie für mich vor den Thron trägt.",
        "la": "Corona Mariae non Eam a me separat; Regina est quia Mater. Qui throno propinquior, rebus quas pro me ad thronum portat propinquior.",
        "ru": "Корона Марии не отделяет Её от меня; Она Царица, потому что Мать. Кто ближе к престолу — ближе к делам, которые Она несёт за меня к престолу.",
        "ru_translit": "Korona Marii ne otdelyayet Yeyo ot menya; Ona Tsaritsa, potomu chto Mat'. Kto blizhe k prestolu — blizhe k delam, kotoryye Ona nesyot za menya k prestolu.",
        "uk": "Корона Марії не відокремлює Її від мене; Вона Цариця, бо Мати. Хто ближче до престолу — ближче до справ, які Вона несе за мене до престолу.",
        "uk_translit": "Korona Marii ne vidokremliuie Yii vid mene; Vona Tsarytsia, bo Maty. Khto blyzhche do prestolu — blyzhche do sprav, yaki Vona nese za mene do prestolu.",
        "be": "Карона Марыі не аддзяляе Яе ад мяне; Яна Каралева, бо Маці. Хто бліжэй да пасаду — бліжэй да справаў, якія Яна нясе за мяне да пасаду.",
        "be_translit": "Karona Maryji nie addzialaje Jaje ad mianie; Jana Karalieva, bo Maci. Chto bližej da pasadu — bližej da spravaŭ, jakija Jana niasie za mianie da pasadu.",
        "zh": "瑪利亞的冠冕沒有把祂與我分開；祂是母親，所以是母后。離寶座越近的人，也離祂為我帶到寶座前的事更近。",
        "zh_translit": "Mǎlìyǎ de guānmiǎn méiyǒu bǎ tā yǔ wǒ fēnkāi; tā shì mǔqīn, suǒyǐ shì mǔhòu. Lí bǎozuò yuè jìn de rén, yě lí tā wèi wǒ dài dào bǎozuò qián de shì gèng jìn."
      }
    }
  ]
}
```

## `README.md`

<!-- sha256:83f7db4db9592a5fc99d95c68574b03c2730e68c1857285039bf11af749c6794 bytes:4041 -->

````markdown
# Nowenna Pompejańska — aplikacja PWA

Modlitewna aplikacja prowadząca przez **54-dniową nowennę pompejańską** (różaniec
codziennie: 27 dni próśb + 27 dni dziękczynienia). Offline-first, w 10 językach,
zero zewnętrznych wywołań — wszystko działa z lokalnych plików JSON.

## Jak uruchomić

Aplikacja to statyczne pliki, ale **musi być serwowana po HTTP** (moduły ES i
`fetch` nie działają z `file://`):

```bash
cd pompejanka-app
python3 -m http.server 8000
# otwórz http://localhost:8000
```

Każdy statyczny hosting też zadziała (GitHub Pages, Netlify, Cloudflare Pages…).
Po pierwszym otwarciu service worker zapisuje wszystko w cache → działa offline,
a na telefonie można „Dodaj do ekranu początkowego”.

## Co potrafi

- **Licznik dni** — duży „Dzień N / 54” + faza (błagalna / dziękczynna). Tempo
  **własne** (self-paced): dzień przechodzi dalej dopiero po jego ukończeniu,
  przerwy nie kasują postępu.
- **Intencja, która towarzyszy** — ustalasz ją na początku; widnieje na ekranie
  głównym, na kroku intencji i jako cienki, rozwijany pasek przez całą modlitwę.
- **Pełny przebieg dnia** wg `schedule.json` — 12 kroków rozwiniętych w 91 ekranów:
  znak krzyża → akt → intencja → Wierzę → Ojcze nasz → 3× Zdrowaś → Chwała →
  20 tajemnic (tytuł + Pismo + rozważanie + Ojcze nasz + 10× Zdrowaś + Chwała) →
  Pod Twoją obronę → modlitwa zamykająca (zależna od fazy) → 3× akt → znak krzyża.
- **Licznik paciorków** — przy 3× / 10× dotykasz, by liczyć; pozycja paciorka jest
  zapisywana (wznawiasz dokładnie tam, gdzie skończyłeś).
- **Panel języków** — minimalistyczny, dostępny w każdej chwili (przycisk w pasku
  górnym). Zmiana języka **nie gubi miejsca**: wracasz na ten sam krok, ten sam
  paciorek i tę samą pozycję przewijania. Dla rosyjskiego/ukraińskiego/białoruskiego/
  chińskiego dodatkowy przełącznik transliteracji łacińskiej.
- **Pismo Święte** — pokazujemy tylko referencję; własny tekst z legalnie posiadanej
  Biblii wklejasz sam, zapisywany lokalnie (per tajemnica, per język).
- Nawigacja: przyciski Dalej/Wstecz, strzałki ← → na klawiaturze, gesty przesunięcia.

## Struktura plików

```
index.html              # powłoka aplikacji
app.webmanifest         # manifest PWA (instalacja)
sw.js                   # service worker (cache offline)
css/app.css             # motyw „calm minimal” (jasny + ciemny)
js/
  app.js                # render + interakcje (główny plik)
  store.js              # stan + zapis w localStorage + wczytanie danych
  sequence.js           # rozwija daily_structure w listę kroków
  i18n.js               # teksty interfejsu + helpery językowe
icons/                  # ikony PWA (SVG)
languages.json          # ── \
common_prayers.json     #    │ paczka danych (źródło prawdy, nietknięte)
mysteries.json          #    │
schedule.json           # ── /
```

## Stan zapisywany (localStorage, klucz `pompeiana.v1`)

`lang`, `showTranslit`, `intention`, `startDate`, `currentDay`, `finished`,
`progress {stepIndex, rep}`, `scripture {mysteryId: {lang: tekst}}`.

## Uwagi

- Dane (`*.json`) traktowane są jako źródło prawdy i nie były modyfikowane —
  aplikacja w 100% z nich korzysta (`schedule.daily_structure`, fazy, tajemnice).
- Brak buildu/zależności — czysty HTML/CSS/JS (ES modules).
- Opis samej paczki danych: [`DATA_PACKAGE.md`](DATA_PACKAGE.md).

## Prawa autorskie

- Modlitwy tradycyjne (Wierzę, Ojcze nasz, Zdrowaś, Chwała, Pod Twoją obronę) —
  domena publiczna.
- Modlitwy bł. Bartolo Longo (†1926) — domena publiczna od 1996.
- Rozważania tajemnic — autorstwa Claude (Anthropic), 1–2 zdania na tajemnicę,
  można je swobodnie modyfikować.
- Tekst Pisma Świętego **nie jest częścią repozytorium** — wkleja go użytkownik
  z własnych, legalnie posiadanych źródeł; przechowywany tylko lokalnie.
- Kod aplikacji możesz dowolnie używać i modyfikować.
````

## `DATA_PACKAGE.md`

<!-- sha256:adbaf656f4b7bd9e3a3584a4a2459a9a725621bd55f724957ed29c2a194c721f bytes:3166 -->

````markdown
# Nowenna Pompejańska — baza danych dla aplikacji PWA

**Offline-first.** Wszystko w plikach JSON, zero zewnętrznych wywołań.

## Pliki paczki

| Plik | Zawartość |
|---|---|
| `manifest.json` | metadane wersji, lista plików |
| `languages.json` | 10 języków + reguły transliteracji |
| `common_prayers.json` | 11 modlitw stałych (Wierzę, Ojcze nasz, Zdrowaś, Chwała, Pod Twoją obronę, błagalna i dziękczynna bł. Bartolo Longo, akty strzeliste, znak krzyża, intencja) |
| `mysteries.json` | 20 tajemnic różańca (5 radosnych + 5 światła + 5 bolesnych + 5 chwalebnych) |
| `schedule.json` | 54-dniowy harmonogram + struktura dnia |

## Języki

`pl` polski · `it` włoski · `fr` francuski · `es` hiszpański · `de` niemiecki · `la` łacina · `ru` rosyjski · `uk` ukraiński · `be` białoruski · `zh` chiński (mandaryński)

Cyrylica i chiński mają dodatkowo klucz `*_translit` z łacińską transliteracją (ALA-LC dla rosyjskiego, BGN/PCGN dla ukraińskiego, Łacinka dla białoruskiego, Hanyu Pinyin z tonami dla chińskiego).

## Wzór pola wielojęzycznego

```json
"text": {
  "pl": "...",
  "it": "...",
  "fr": "...",
  "es": "...",
  "de": "...",
  "la": "...",
  "ru": "...", "ru_translit": "...",
  "uk": "...", "uk_translit": "...",
  "be": "...", "be_translit": "...",
  "zh": "...", "zh_translit": "..."
}
```

## Biblia — model bez tekstu

Paczka **nie zawiera** tekstu Pisma Świętego. Każda tajemnica ma:

```json
"scripture": {
  "reference_canonical": "Lk 1,26-38",
  "reference_localized": { "pl": "Łk 1,26-38", "it": "Lc 1,26-38", ... },
  "text_user": { "pl": "", "it": "", ... }
}
```

Aplikacja powinna:
- pokazać referencję,
- umożliwić użytkownikowi wklejenie własnego tekstu z legalnie posiadanej Biblii do `text_user[lang]`,
- przechowywać te wklejone teksty w `localStorage` / `IndexedDB` per tajemnica per język.

## Logika dnia (z `schedule.json` → `daily_structure`)

```
1.  Znak krzyża
2.  Akt strzelisty otwarcia
3.  Intencja użytkownika (z localStorage, ta sama na całą nowennę)
4.  Wierzę
5.  Ojcze nasz
6.  3× Zdrowaś Maryjo
7.  Chwała Ojcu
8.  Pętla po 20 tajemnicach:
       — Tytuł
       — (opcj.) Referencja + tekst użytkownika
       — Rozważanie
       — Ojcze nasz
       — 10× Zdrowaś Maryjo
       — Chwała Ojcu
9.  Pod Twoją obronę
10. Modlitwa zamykająca:
       — dni 1-27: prayer_supplicatory (błagalna bł. Bartolo Longo)
       — dni 28-54: prayer_thanksgiving (dziękczynna bł. Bartolo Longo)
11. 3× akt strzelisty końcowy
12. Znak krzyża
```

Fazę dnia odczytuj z `schedule.days[day_number-1].phase` lub bezpośrednio z `closing_prayer_id`.

## Stan praw autorskich

- Modlitwy tradycyjne (Credo, Pater, Ave, Gloria, Sub Tuum) — domena publiczna od stuleci.
- Modlitwy bł. Bartolo Longo (†1926) — domena publiczna od 1996.
- Rozważania tajemnic — autorstwa Claude (Anthropic), 1-2 zdania per tajemnica, można je modyfikować.
- Tekst Pisma Świętego — **nie jest częścią paczki**; wkleja użytkownik z własnych legalnie posiadanych źródeł, lokalnie u siebie.

## Wersja

`1.0` — 22 czerwca 2026
````

## `.gitignore`

<!-- sha256:1056518457f798a60171ca111dd64da76bfaa384da94b9c499a3fe07f0d1f7cf bytes:79 -->

```
# OS / editor junk
.DS_Store
Thumbs.db
*~
.idea/
.vscode/

# logs / temp
*.log
```

## `.claude/launch.json`

<!-- sha256:0ec03453b0815c725c6619152af9ca44a1b9273d1d61dc3151c9a9a2f4ab4814 bytes:201 -->

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "pompejanka",
      "runtimeExecutable": "python3",
      "runtimeArgs": ["-m", "http.server", "8756"],
      "port": 8756
    }
  ]
}
```
