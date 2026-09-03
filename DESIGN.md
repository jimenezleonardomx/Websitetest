---
name: Sautter
description: A Mayfair cigar merchant's site, built as if you're standing inside its cedar-lined humidor room.
colors:
  canvas: '#171009'
  surface: '#251a10'
  sunken: '#120c07'
  ink: '#f2e8da'
  ink-muted: '#c2ad9b'
  ink-faint: '#85715e'
  line: '#3c2c1e'
  line-strong: '#5a4430'
  accent: '#e0862c'
  accent-hover: '#f2a04a'
  accent-ink: '#1c1108'
  accent-wash: '#3a2412'
  danger: '#d9483a'
  danger-wash: '#2c1712'
  band-gold: '#a9843f'
  band-oxblood: '#7a3326'
  band-bottle: '#3c5240'
typography:
  display:
    fontFamily: 'Playfair Display, Georgia, serif'
    fontSize: '2.5rem (mobile) / 3.5rem hero (desktop)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  body:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: 'Inter, system-ui, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 500
    letterSpacing: 'wide, uppercase'
rounded:
  control: '0.5rem'
  card: '0.875rem'
  panel: '1.25rem'
spacing:
  sm: '0.5rem'
  md: '1rem'
  lg: '2.5rem'
  xl: '6rem'
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.accent-ink}'
    rounded: '{rounded.control}'
    padding: '0 1rem'
  button-primary-hover:
    backgroundColor: '{colors.accent-hover}'
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.control}'
    padding: '0 1rem'
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.card}'
    padding: '1.5rem'
---

# Design System: Sautter

## Overview

**Creative North Star: "The Humidor Room"**

The site is built as if a regular has walked into Sautter's own humidor room at
the back of the Mount Street shop: dim, warm-lit, cedar and leather, a single
foil-orange band catching the light on the shelf. It is not a dark-mode
reskin of a light site — it is the one identity the brand has, and it does
not lighten because a visitor's phone is set to light. The palette borrows
directly from the product's own material world: lacquered near-black rather
than a pure `#000` void, cedar-brown drawers for cards rather than glass
tiles, and the gilt-orange of a real cigar band as the single accent, spent
like foil rather than paint.

Confirmed visual rejections: no gradient-and-glass "AI startup" look, no
neon-glow-on-black cliché (the accent is warm brass-orange, never a signal
color), no kicker/eyebrow labels sitting above headings, no white cards
floating on the dark ground.

**Key Characteristics:**

- Lacquered near-black canvas, cedar-brown surfaces, one gilt-orange accent
- Warm ivory text, never stark white; warm near-black text-on-accent, never white
- Hairline-divided lists in place of repeated same-size cards
- Each product carries its own colored "band" graphic so items read apart at a glance
- Serif display type (kept from the incumbent system) for headlines; sans for everything functional

## Colors

A lacquered, warm-dark palette: one near-black ground, one warm cedar surface tone, and exactly one accent, used the way foil is used on a cigar band.

### Primary

- **Gilt-orange foil** (`#e0862c`): the one accent. Primary buttons, links, focus rings, active filter states. Roughly one accent element per viewport — it marks the thing to act on, never decorates.

### Neutral

- **Lacquer black** (`#171009`): page background. Warm brown-black, not pure `#000`.
- **Cedar drawer** (`#251a10`): cards, panels, the sticky header — a drawer pulled from the humidor, always sitting one shade lighter than canvas.
- **Deep recess** (`#120c07`): wells, inputs, anything sunken below the surface plane.
- **Warm ivory** (`#f2e8da`): primary text. Never stark white.
- **Tobacco tan** (`#c2ad9b`): secondary text, captions, muted copy.
- **Faint brass** (`#85715e`): placeholders, disabled states, the faintest label text.
- **Brass hairline** (`#3c2c1e`) / **strong hairline** (`#5a4430`): all borders. One weight (1px) everywhere; "strong" only for hover states.

### Named Rules

**The One Foil Rule.** The accent is spent once per viewport — the primary action, or a link, or a highlighted stat — never on more than one of those at once. A price, a badge, and a button do not all get to be orange on the same screen.

**The No-Neon Rule.** On a near-black ground, the reflex is a glowing neon accent. Sautter's accent is matte foil-orange with no glow, blur, or drop-shadow of its own color — it looks lit by a lamp, not lit from within.

## Typography

**Display Font:** Playfair Display (with Georgia, Times New Roman fallback)
**Body Font:** Inter (with system-ui fallback)

**Character:** A confident serif for names and headlines (the same one the incumbent site already used — it belongs in this room), paired with a plain, quiet sans for everything functional. Two weights only: normal and medium.

### Hierarchy

- **Hero** (600, 3.5rem, 1.05 line-height): the homepage headline only.
- **Display** (600, 2.5rem, 1.1 line-height): page-level `<h1>`s.
- **Title** (600, 1.5rem, 1.3 line-height): section headings, stat values.
- **Lead** (400, 1.1875rem, 1.6 line-height): the one supporting paragraph under a page's `<h1>`.
- **Body** (400, 1rem, 1.65 line-height): running copy, measure-capped at ~44rem.
- **Caption** (500, 0.8125rem, uppercase, tracking-wide): field labels and stat labels only.

### Named Rules

**The No-Kicker Rule.** No caption-label sits above a heading as a kicker or eyebrow. The heading carries its own weight; anything that needs saying goes in the heading itself or the paragraph beneath it.

## Layout

Mobile-first; layouts stack by default and widen at `sm:`/`md:`. Every section sits inside a `Container` (72rem max width) or `Container measure` (44rem, for running prose). Vertical rhythm comes from a fixed 4px-multiple scale (2/3/4/6/8/10/12/16/20/24/32) — nothing else. Section padding is `py-24` desktop / `py-16` mobile; related items sit at `gap-4`, distinct groups at `gap-10`+. On the cigars listing, the filter panel collapses behind a toggle below `md:` so the first product is reachable without scrolling past every filter.

## Elevation & Depth

Flat by default; the little elevation that exists reads as a cedar panel catching a sliver of warm light on its top edge, not a black shadow on a black ground (which would simply vanish). Depth comes from surface-tone contrast (cedar surface against near-black canvas) more than from shadow.

### Shadow Vocabulary

- **Raise** (`0 1px 0 0 rgb(255 200 140 / 0.05) inset, 0 2px 8px rgb(0 0 0 / 0.45)`): resting cards and panels.
- **Float** (`0 1px 0 0 rgb(255 200 140 / 0.08) inset, 0 16px 40px rgb(0 0 0 / 0.6)`): menus, dialogs, anything that overlays the page.

## Shapes

Three radii only: `control` (0.5rem, buttons/inputs), `card` (0.875rem), `panel` (1.25rem, the largest surfaces — the cigar hero image). One hairline border weight everywhere. No hard-edged neobrutalist shadows, no clip-path silhouettes.

## Components

### Buttons

- **Shape:** `rounded-control` (0.5rem).
- **Primary:** gilt-orange fill (`#e0862c`), near-black ink text (`#1c1108`) — engraved-on-foil, never white-on-orange.
- **Secondary:** cedar-surface fill, ivory text, hairline border.
- **Ghost:** transparent, muted ivory text, cedar-surface fill on hover.
- **Hover:** background brightens toward `accent-hover` (`#f2a04a`) — reads as catching more light, not as a state color swap.

### Cards / Containers

- **Corner:** `rounded-card` (0.875rem).
- **Background:** cedar surface (`#251a10`) on lacquer-black canvas — never a floating white card.
- **Border:** one hairline (`border-line`).
- **Internal padding:** `p-6`.
- Prefer a single hairline-divided list over N repeated same-size cards (see the homepage highlights and a cigar's stat strip) — a card grid is the fallback, not the default.

### Inputs / Fields

- **Style:** cedar-surface background, hairline border, ivory text, faint-brass placeholder text.
- **Focus:** the one global focus ring (2px accent outline, 2px offset) — never a custom per-input treatment.

### Navigation

- Sticky header, cedar-surface background at 80% opacity with backdrop blur. Wordmark in accent orange. Nav items in ivory with a cedar-surface hover fill.

### Cigar Band (signature component)

The one piece of per-product identity the site has without real photography. A cigar illustrated in outline (`text-ink-faint`, `currentColor` strokes) wears a colored paper band — one of three tobacco-world tones (`band-gold`, `band-oxblood`, `band-bottle`, deterministically chosen from the brand name) — carrying the brand's initials in serif type. This exists specifically so products read apart from each other at a glance; when real product photography arrives, it retires in favor of that, but the per-product color-coding idea is worth carrying forward into whatever replaces it.

## Do's and Don'ts

### Do:

- **Do** keep the accent to roughly one element per viewport (`The One Foil Rule`).
- **Do** use the cigar band's brand-derived color coding as the model for any future per-product visual distinction.
- **Do** prefer a hairline-divided list to a row of identical cards.
- **Do** treat this palette as the site's only identity — no `prefers-color-scheme` branch, no `dark:` variant.

### Don't:

- **Don't** use pure `#000` or pure `#fff` anywhere — always the warm near-black / warm ivory pair.
- **Don't** put a caption-style kicker above a heading (`The No-Kicker Rule`).
- **Don't** give any element a glowing/neon drop-shadow in the accent color (`The No-Neon Rule`).
- **Don't** use a band tone (`band-gold` / `band-oxblood` / `band-bottle`) as general UI color — they exist only for per-cigar identity.
