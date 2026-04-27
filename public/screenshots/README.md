# Hero Carousel Screenshots

Drop your screenshots here using the exact filenames below. The hero
carousel on the landing page references these by name — once the file is
present, the placeholder striping is replaced automatically.

## Required files

| Filename                      | What it shows                                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `01-mission-control.png`      | Mission Control dashboard — watchlist, fear & greed, Polymarket cards, macro/economic grids   |
| `02-journal-feed.png`         | Stock journal feed — entries with sentiment, tags, AI summary, link previews                  |
| `03-insights.png`             | Insights view — price chart with entries overlaid, activity heatmap, sentiment-by-tag         |
| `04-new-entry.png`            | New entry form — link preview, sentiment picker, tags, milestone linking                      |
| `05-themes.png`               | Theme view — entries grouped by an ad-hoc theme (e.g. "Artificial Intelligence")              |

## Capture specs

- **Resolution**: 2560 × 1600 (16:10 aspect) is ideal. Anything close
  to 16:10 works; the carousel container is fixed to that ratio so the
  page layout doesn't shift while images load.
- **Format**: PNG. We can convert to optimized WebP later if bundle
  size becomes an issue, but with 5 images PNG is fine.
- **Browser**: Chrome or Safari at 100% zoom, window maximized. Capture
  at Retina (2x) so it stays sharp on high-DPI displays.
- **Tool**: [CleanShot X](https://cleanshot.com/) or [Shottr](https://shottr.cc/)
  give you clean window captures with optional shadow/rounded corners
  baked in. macOS native `Cmd+Shift+4` then space also works but is uglier.
- **Consistency**: take all 5 in the same browser at the same window
  size — keeps the visual rhythm consistent through the auto-cycle.

## What to redact (if shooting from your real account)

- User email + initial avatar in the sidebar bottom-left
- Any specific dollar amounts that reveal position size
- AI summary content if it references your real analysis
- Tag names that reveal private ideas

A blur tool or a colored rectangle is fine. Better long-term: create a
demo account with curated fake content so you can re-shoot any time the
UI changes.

## How to add / replace later

Drop the file in this folder with the matching name. No code change
needed — the carousel just picks it up. To change the order, captions,
or add/remove a slide, edit the `<div class="carousel-stage">` block in
`/index.html` and the matching `<button class="carousel-dot">` row.
