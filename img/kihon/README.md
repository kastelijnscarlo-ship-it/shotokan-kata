# Kihon images

One picture per technique, named after its id in `data/kihon.json` (lower case, with hyphens, `.png`). `data/kihon.json` points each technique at its picture with `"image"`.

The pictures are cut out of the drawing sheet: one figure or foot diagram per technique, label removed, on a white 1200 × 900 background.

To add or replace a picture:
- Use a landscape 4:3 image (e.g. 1200 × 900 px) with a plain white background, under ~300 KB so the app stays fast on a phone.
- Save it here as `<id>.png` and set `"image": "img/kihon/<id>.png"` for that technique in `data/kihon.json`.
- If `"image"` is empty, the app looks for `img/kihon/<id>.jpg`.
- Only use pictures you made yourself or are allowed to use. The site is public.

To add a new technique, add an entry to the right group in `data/kihon.json` (same fields as the others) and put its picture here.
