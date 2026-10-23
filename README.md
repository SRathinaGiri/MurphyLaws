# மர்பி விதிகள் — Murphy's Laws in Tamil (PWA)

1,642 Murphy's Laws in Tamil by சுப. இரத்தினகிரி — a web companion to the Android app.

- Search by words (all terms must match) or jump to a law with `#123`
- Dropdown of the most repeated words
- Bookmark (☆) laws — stored on your device
- Share any law; shared links open at that law (`…/#123`)
- Auto / light / dark themes
- Installable and works offline

## Updating the laws

Edit `murphy.db`, then regenerate the data file:

```
python tools/export_laws.py
```

## Running locally

```
python -m http.server 8765
```

Open http://localhost:8765 (the service worker needs http/https, not `file://`).
