# Design

Single-page static site (index.html + styles.css + script.js, no framework, no build step). The design system is the restaurant itself: the letterboard over the counter, the orange molded booths, the white tile walls, the quarry-tile floor, and a red painted sign.

## Theme

Light, bright, high-contrast — built to be read on a phone in Houston sun. Color strategy: **Committed** — sign red carries the header, hero, and Find Us band; everything between sits on white tile.

## Color palette (OKLCH)

| Token | Value | Use |
|---|---|---|
| `--red` | `oklch(0.51 0.2 25)` (≈ #c0122c) | Sign red: header, hero, Find Us, prices |
| `--red-deep` | `oklch(0.44 0.18 26)` | Hover/darker red |
| `--orange` | `oklch(0.68 0.155 41)` (≈ #e06a3b) | Bench orange: accents, stars, bench-curve divider, photo mat |
| `--orange-deep` | `oklch(0.58 0.15 41)` | Orange readable on white (large text only) |
| `--ink` | `oklch(0.22 0.012 40)` | Griddle black: text, board frames, quotes band |
| `--tile` | `oklch(0.977 0.003 80)` | White tile page background (with 84px tile-grid lines `--tile-line`) |
| `--brown` | `oklch(0.36 0.045 45)` | Quarry-tile brown: footer |

Contrast holds ≥4.5:1 for body text everywhere; orange never carries small text on white.

## Typography

- **Grand Hotel** (`--script`, self-hosted woff2) — the text logo/wordmark ("Dixie Maid"), photo captions, the quotes heading. Painted-sign soda-fountain script per the client's Dixie Maid lettering reference.
- **Big Shoulders** (`--sign`, variable woff2 100–900) — all headings, menu items, prices, buttons, chips. Condensed signage face; reads like letterboard plastic letters. Uppercase, tracked.
- System sans (`--body`) — body copy. Plain on purpose; the voice is the guy at the counter.

## Signature motifs

- **The letterboard**: menu categories are white boards with 3px ink frames, black title bars, horizontal ridge lines (repeating-linear-gradient), dot leaders, and red tabular prices — a faithful abstraction of the real board photo.
- **Bench curve**: an orange SVG wave divider (hero → menu) drawn from the molded booth profile.
- **Photo boards**: framed food photos slotted into the menu grid, echoing the framed photos pinned beside the real board. Captions in red script.
- **Tile grid**: faint 84px grid on the menu section background = the white tile wall.

## Layout & behavior

- Sections: sticky red header → split hero (red panel + real burger photo) → THE BOARD (menu) → story → quotes (ink band) → Come By (red band) → brown footer.
- Menu is the second section; hero primary CTA and header link jump to `#menu`.
- Sticky chip bar (category jump pills) inside the menu with IntersectionObserver scrollspy; first chip active by default; auto-scroll of the bar only after user scroll.
- Floating "Menu ↑" pill (`.menu-fab`) appears only after scrolling past the menu.
- Menu grid: CSS `columns: 2` (1 on ≤760px), boards `break-inside: avoid`.
- Reveals are JS-added (`.rv`/`.in`) so no-JS/headless renders fully visible; `?capture` query disables motion for screenshots; `prefers-reduced-motion` respected.
- Z-scale: chips 10 < header 20 < fab 30.

## Assets

- `assets/dm-burger-fries.jpg` — real listing photo (hero)
- `assets/dm-booths.jpg` — real listing photo (story; orange offset mat)
- `assets/classic-double.jpg`, `assets/strawberry-shake.jpg` — Unsplash, verified by eye
- `assets/fonts/grand-hotel.woff2`, `assets/fonts/big-shoulders.woff2` — Google Fonts latin subsets, self-hosted

## Testing

Headless Chrome screenshots; sub-500px widths via `_preview-mobile.html` iframe harness (headless Chrome clamps window width to 500px). Use `?capture` for full-page shots.

## Copy rules

Down-to-earth only: short sentences, no corporate menu-speak ("craveable", "signature", "crafted" are banned). Prices come from the physical board; the site says the board has the final say.
