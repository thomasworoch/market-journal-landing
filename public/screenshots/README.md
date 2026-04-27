# Hero Carousel Screenshots

The landing page hero carousel cycles through 7 screenshots in this folder.
Filenames have spaces — they're URL-encoded (`%20`) in `index.html`.

## Files in current cycle order

| #   | Filename                       | Caption shown      |
| --- | ------------------------------ | ------------------ |
| 1   | `Mission Control.png`          | Mission Control    |
| 2   | `Mission Control_Heatmap.png`  | Sector Heatmap     |
| 3   | `Notebook Feed.png`            | Notebook Feed      |
| 4   | `Sentiment.png`                | Sentiment Tracking |
| 5   | `Milestones.png`               | Milestones         |
| 6   | `Insights 1.png`               | Insights           |
| 7   | `Insights 2.png`               | Activity Heatmap   |

## Capture specs

- **Resolution**: 2560 × 1600 (16:10) is ideal. Anything close to 16:10
  works; the carousel container is fixed to that ratio so the page
  layout doesn't shift while images load.
- **Format**: PNG. We can convert to optimized WebP later if bundle
  size becomes an issue.
- **Browser**: Chrome or Safari at 100% zoom, window maximized. Capture
  at Retina (2x) so it stays sharp on high-DPI displays.
- **Tool**: [CleanShot X](https://cleanshot.com/) or [Shottr](https://shottr.cc/)
  give you clean window captures.
- **Consistency**: take all in the same browser at the same window
  size — keeps the visual rhythm consistent through the auto-cycle.

## What to redact (if shooting from your real account)

- User email + initial avatar in the sidebar bottom-left
- Any specific dollar amounts that reveal position size
- AI summary content if it references your real analysis
- Tag names that reveal private ideas

## How to add / replace / reorder later

- **Replace one**: drop a new file with the same filename. No code change.
- **Reorder**: edit the `<div class="carousel-stage">` block in `/index.html`,
  rearrange the `<div class="carousel-slide">` rows, and rearrange the
  matching `<button class="carousel-dot">` rows below to match.
- **Rename a file**: change the `src` in the matching `<img>` and the
  `aria-label` on the slide. Spaces in filenames need to be encoded as
  `%20` in the `src` attribute.
- **Add or remove a slide**: add/remove a `<div class="carousel-slide">`
  block AND a matching `<button class="carousel-dot">` button (these
  must always have the same count). Update the `aria-label` "X of N"
  counts.
