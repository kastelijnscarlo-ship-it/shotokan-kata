# Shotokan Kata

A simple, mobile-first web app with all 26 Shotokan kata (with video) and the basic kihon techniques, in Dutch and English. It's a static site: no accounts, no login, no tracking, no analytics. Videos play through YouTube's privacy-enhanced mode (`youtube-nocookie.com`).

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
  - `kyu`: **to fill in yourself.** KBN has no national kyu syllabus, because each club sets its own kyu exams. Every `kyu` is therefore `null`, and the app shows a yellow "not filled in yet" note. Enter your club's grade as a number, for example `"kyu": 8`. You can then delete the `_todo_kyu` line.
  - `video.youtubeId`: the 11 characters after `watch?v=` in a YouTube link. For example, `https://www.youtube.com/watch?v=abcDEF12345` → `"abcDEF12345"`. Leave it empty (`""`) to show "no video yet". `title` and `channel` appear as the credit under the video.

### `data/kihon.json`

Grouped into stances, punches and strikes, blocks and kicks. Each technique has `name` (romaji), `translation` and `explanation` (`nl` / `en`). Each technique also has `image`, which is reserved for later. Put a picture in the repo (e.g. `img/kihon/mae-geri.webp`) and set `"image": "img/kihon/mae-geri.webp"`, and it will be shown.

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
