# மர்பி விதிகள் — Murphy's Laws in Tamil (PWA)

1,642 Murphy's Laws in Tamil by சுப. இரத்தினகிரி — a web companion to the Android app.

- Search by words (all terms must match) or jump to a law with `#123`
- Dropdown of the most repeated words
- Continuous scroll, or "10 / பக்கம்" paging (« ‹ page › », jump to page, ←/→ keys)
- Bookmark (☆) laws — stored on your device
- Share any law; shared links open at that law (`…/#123`)
- Auto / light / dark themes
- Installable and works offline

## Updating the laws

Edit `murphy.db`, then regenerate the data file:

```
python tools/export_laws.py
```

## Releasing

Every release bumps the version in **all** of: `VERSION` and the `v=…`/badge tags in `index.html`,
`CACHE_VERSION` in `sw.js`, and `version` in `manifest.webmanifest`. Installed apps then show
"புதிய பதிப்பு தயார்" with an Update button. Check before pushing:

```
node --test tests/*.test.mjs
```

## Running locally

```
python -m http.server 8765
```

Open http://localhost:8765 (the service worker needs http/https, not `file://`).
