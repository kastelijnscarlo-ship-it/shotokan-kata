# Shotokan Kata

A simple, mobile-first study app for Shotokan exams: the exam programme per belt (7th kyu to 1st dan), all 26 kata (with video), the basic kihon techniques and the theory (etiquette, counting, terms), in Dutch and English. It's a static site: no accounts, no login, no tracking, no analytics. Videos play through YouTube's privacy-enhanced mode (`youtube-nocookie.com`).

## Put it online with GitHub Pages (no software needed)

1. Sign in at [github.com](https://github.com) and click **New repository**. Name it, for example, `shotokan-kata`. Choose **Public** (free GitHub Pages needs a public repo) and click **Create repository**.
2. On the new repo's page, click **uploading an existing file**.
3. Open the `shotokan-kata` folder on your computer, select **everything inside it** (not the folder itself), and drag it into the browser window. Include the hidden file `.nojekyll`. In Windows Explorer, turn on **View → Show → Hidden items** to see it.
4. Click **Commit changes**.
5. Go to **Settings → Pages**. Under *Build and deployment*, set **Source** to *Deploy from a branch*, **Branch** to `main` and folder `/ (root)`, then click **Save**.
6. After a minute or two, the address appears at the top of that page, for example `https://<your-username>.github.io/shotokan-kata/`.

## Install it on a phone

**iPhone / iPad (Safari):** open the address, tap the **Share** button, then **Add to Home Screen**.

**Android (Chrome):** open the address, tap the **⋮** menu, then **Install app** or **Add to Home screen**.

The app then opens full-screen like a normal app. Pages and texts also work offline, but videos need internet.

## Editing the content

All content lives in the `data` folder. You can edit it directly on GitHub: open the file, click the pencil icon, make your change, and click **Commit changes**. The site updates within a few minutes.

### `data/kata.json`

- `levels`: the sections of the kata overview, in belt order, each with a short note in `nl` and `en`.
- `kata`: one entry per kata, in belt order. The order in the file is the order in the app.
  - `name`: the name in romaji.
  - `level`: which section the kata appears in (`kyu`, `dan1`, `dan2`, `dan3`).
  - `meaning`: what the name means (`nl` / `en`).
  - `exam`: where the kata appears in the KBN dan exam programme (`nl` / `en`).
  - `kyu`: the kyu grade where the kata first appears in the Shin-ju exam programme (Heian Shodan 7, Nidan 6, Sandan 5, Yondan 4, Godan 3, Tekki Shodan 3, Bassai Dai 2, Kanku Dai 1). `null` means the kata isn't part of a kyu exam. The kata page also lists every belt whose exam includes it, taken from `data/exams.json`.
  - `video.youtubeId`: the 11 characters after `watch?v=` in a YouTube link. For example, `https://www.youtube.com/watch?v=abcDEF12345` → `"abcDEF12345"`. Leave it empty (`""`) to show "no video yet". `title` and `channel` appear as the credit under the video.

### `data/kihon.json`

Grouped into stances, punches and strikes, blocks and kicks. Each technique has `name` (romaji), `translation` and `explanation` (`nl` / `en`).

### `data/exams.json`

The exam programme per belt, from 7th kyu (yellow) to 1st dan, following Shin-ju Karate-do Amsterdam (Shotokan 4e platform) and the KBN 1st dan programme.

- `parts`: every exam part once (for example `tsuki-a`, `renzoku`, `jiyu-ippon`), with its steps. `dir` is V (forward), A (backward) or Z (sideways); `move` is `h` (towards the table), `t` (away from it) or `ht` (there and back). `links` point to kihon ids, or to kata as `kata:<id>`. These become the buttons under each step.
- `belts`: per belt, which parts are in `kihon` and `kumite`, plus the `kata` (`"id"` for one kata, `"choice"` for a list to choose from). The app marks a part or kata as **New** when no earlier belt had it.
- 2nd kyu is marked `incomplete`: its programme isn't online yet, so only Bassai Dai is listed. Fill in `kihon`, `kata` and `kumite` once you have it, and delete `incomplete`.

### `data/theory.json`

Bowing, counting, exam abbreviations, a glossary, kinds of kata and a short history. Each belt page lists the terms that occur in its programme automatically. Terms with `"scan": false` are left out of that list.

### Kihon images

33 of the 35 techniques have a `.png` in `img/kihon/` (sanbon-zuki and nukite don't have a picture yet), named after the technique (for example `img/kihon/mae-geri.png`), and `"image"` in `data/kihon.json` points to it. A technique without a picture shows a grey placeholder with its name. See [`img/kihon/README.md`](img/kihon/README.md) for how to add or replace one.

To upload them on GitHub: open the `img/kihon` folder in your repo, click **Add file → Upload files**, drag the pictures in and click **Commit changes**.

Using another format or file name? Set `"image"` for that technique in `data/kihon.json`, e.g. `"image": "img/kihon/mae-geri.jpg"`.

## Look and feel

The styling follows the Pastoe layout: warm off-white `#F1F0EA`, black text, taupe lines `#BBB6AB`, grey image cards `#DAD7D0`, and uppercase headings with wide letter-spacing. A dark version is used automatically when the phone is in dark mode. All colours are at the top of `css/style.css`. Pastoe's own font (Brown) is licensed and not included, so the app uses Helvetica Neue / Arial.

### Tips

- JSON is strict: keep the quotes and commas exactly as they are. If the app shows "The content could not be loaded" after an edit, there is a typo. Paste the file into [jsonlint.com](https://jsonlint.com) to find it.
- After changing code files (not data), raise `VERSION` in `sw.js` (e.g. `kata-v2`) so installed phones pick up the new version.

## Sources for the belt order

The order and the exam notes come from the KBN Shotokan dan exam programmes (Shotokan 4e platform, 2026), listed on [KBN – Dangraadeisen](https://www.kbn.nl/kennisbank/dangraadeisen/):

- 1st dan: one Heian of choice, Tekki Shodan required, and one of Bassai Dai, Kanku Dai, Jion or Enpi.
- 2nd dan: one Heian of choice, Tekki Nidan required, and one of Jion, Enpi, Bassai Sho, Kanku Sho, Jitte or Gankaku.
- 3rd dan: Tekki Sandan required, plus a tokui kata from the list of advanced kata.

## Video player controls

- Play / pause (also by tapping the video once it is playing)
- Speed: 0.25×, 0.5×, 0.75×, 1×, 1.25×, 1.5×
- Step back or forward 0.2 s or 1 s (this pauses the video first)
- Repeat a section: tap **Start (A)** at the beginning and **End (B)** at the end. The section then plays on repeat. **Clear** removes it.
- Fullscreen button. On iPhone, the player fills the screen.
- On a computer: space = play/pause, ← / → = small step, Shift + ← / → = 1 second.

## Running it locally

Run any static web server in this folder, for example:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.
