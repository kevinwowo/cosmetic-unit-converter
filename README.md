# Cosmetic Unit Converter

A free, single-page tool to convert between the units used in cosmetic packaging:
**ml, cc, US fl oz, teaspoon, tablespoon, gram and ounce** — with a density field so
volume-to-weight conversions are actually correct for creams, oils and lotions.

No build step, no dependencies. The conversion logic lives in a standalone
`converter.js` so it can be reused in a browser extension, a WordPress plugin or an
npm package without rewriting it.

## Live demo

Deployed via GitHub Pages. (URL added after first deploy.)

## Features

- Volume units: ml, cc, liter, US fl oz, tsp, tbsp
- Weight units: gram, ounce (with density-based conversion)
- Editable density (g/ml) — water ≈ 1.0, creams ≈ 0.9–1.05, oils ≈ 0.91–0.93
- Live results table, mobile friendly, works fully offline

## Files

| File | Purpose |
|------|---------|
| `index.html` | UI + page markup |
| `converter.js` | Pure conversion logic (no DOM). Reusable everywhere. |

## Reusing the logic

`converter.js` is UMD-wrapped — it works as a browser global and as a CommonJS module.

```js
// Node / npm
const C = require("./converter.js");
C.convert(50, "ml", 0.95); // -> { ml:50, floz_us:1.69, g:47.5, ... }
```

```html
<!-- Browser -->
<script src="converter.js"></script>
<script>CosmeticConverter.convert(50, "ml", 0.95);</script>
```

`convert(value, fromUnit, density)` returns an object keyed by every supported unit
code: `ml, cc, l, floz_us, tsp_us, tbsp_us, g, oz_wt`.

## Deploy on GitHub Pages

1. Push `index.html`, `converter.js`, `README.md` to a public repo.
2. Repo **Settings → Pages → Source: `main` / root**.
3. Live at `https://<user>.github.io/<repo>/`.

### Use your own domain (zero code change)

Add a `CNAME` file with your domain, point DNS at GitHub Pages, enable HTTPS. No edits
to the source are needed.

## Math

- 1 ml = 1 cc = 1 cm³
- 1 US fl oz = 29.5735 ml
- 1 tsp = 4.92892 ml, 1 tbsp = 14.78676 ml
- 1 oz (weight) = 28.3495 g
- grams = ml × density (g/ml)

## License

MIT

---

Built and maintained by [Oulete](https://www.oulete.cn/), a cosmetic packaging & bottle manufacturer.
