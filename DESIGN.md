---
name: Sautter
description: A Mayfair cigar merchant's site, built as a darkroom where every product is a print still developing under amber safelight.
colors:
  canvas: '#0c0908'
  surface: '#171009'
  sunken: '#0a0705'
  ink: '#ece6d9'
  ink-muted: '#a99a86'
  ink-faint: '#6e6153'
  line: '#2c2118'
  line-strong: '#473424'
  accent: '#c9541f'
  accent-hover: '#e37a3f'
  accent-ink: '#180b04'
  accent-wash: '#33190c'
  danger: '#d9483a'
  danger-wash: '#2c1712'
  print-light: '#b7b0a3'
  print-mid: '#86796a'
  print-dark: '#4a4136'
typography:
  display:
    fontFamily: 'Fraunces, Georgia, serif'
    fontSize: '2.5rem (mobile) / 3.5rem hero (desktop)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  body:
    fontFamily: 'Archivo Narrow, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: 'Archivo Narrow, system-ui, sans-serif'
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

**Creative North Star: "The Darkroom Archive"**

Sautter's site is a darkroom, not a dashboard: every product photo is a print
still emerging from the developer tray under amber safelight, never a static
icon sitting inert on the page. The near-black ground carries a warm amber
wash from above -- an ambient light source, not a flat accent color -- and
that same amber governs every interactive surface: buttons, taps, and hovers
all give real, visible feedback, because this world's entire identity is
built on something visibly changing state in front of the visitor.

This is the second visual world this project has shipped. The first ("The
Humidor Room" -- lacquered near-black, cedar-brown surfaces, gilt-orange
accent used as flat decoration) was explicitly rejected by the client as too
generic. The darkroom archive won a three-direction round against a private
members' club and a rare-book room specifically because it carries a real
interaction metaphor -- developing -- rather than only a palette.

Confirmed visual rejections: a flat "dark mode plus one accent" treatment
where the accent never moves or does anything; a glowing neon accent (this
amber is matte and warm, like a lamp, never a signal color); kicker/eyebrow
labels above headings; scattered, purposeless hover animation.

**Key Characteristics:**

- Near-black canvas washed in ambient amber light from above, not a flat accent
- Every product image is a "print" with a perpetual slow-developing sweep, quickening on interaction
- Real tap/press feedback on every button and card via the `motion` library, not just a color swap
- One authored page-entrance (the cigar detail hero) that "develops into view" as a staggered reveal
- Fraunces (soft, hand-set display serif) paired with Archivo Narrow (equipment-label sans) for everything functional

## Colors

A near-black ground under one ambient amber wash, with wet-print silver-gray reserved for photographic surfaces only.

### Primary

- **Amber safelight** (`#c9541f`): the one accent, and the site's one light source (see the `body` background wash in `globals.css`). Primary buttons, links, focus rings, the developing-print sweep. Brightens toward `#e37a3f` on hover -- reads as the lamp turned up, not a state color swap.

### Neutral

- **Darkroom black** (`#0c0908`): page background, warmed by the amber wash above it.
- **Print surface** (`#171009`): cards, panels, trays -- one shade lighter than canvas.
- **Deep recess** (`#0a0705`): wells, inputs.
- **Enamel white** (`#ece6d9`): primary text. Never stark white.
- **Faded print** (`#a99a86`): secondary text, captions.
- **Spent fixer** (`#6e6153`): placeholders, disabled states.
- **Amber-warmed hairline** (`#2c2118`) / **strong hairline** (`#473424`): all borders.

### Named Rules

**The One Light Source Rule.** The amber wash on `body` is the scene's only ambient light. No second background gradient exists anywhere else on the site -- every other surface sits flat under that one light, the way objects in a real room don't each glow independently.

**The No-Neon Rule.** The accent is matte, warm amber with no glow, blur, or self-colored drop-shadow -- it looks lit by a safelight bulb, not lit from within a UI element.

## Typography

**Display Font:** Fraunces (with Georgia, Times New Roman fallback)
**Body Font:** Archivo Narrow (with system-ui fallback)

**Character:** A soft, slightly idiosyncratic serif for names and headlines against a condensed, equipment-label sans for everything functional -- captions, data, timer-like labels. The pairing reads like a handwritten darkroom log next to the printed markings on the equipment itself.

### Hierarchy

- **Hero** (600, 3.5rem, 1.05 line-height): the homepage headline only.
- **Display** (600, 2.5rem, 1.1 line-height): page-level `<h1>`s.
- **Title** (600, 1.5rem, 1.3 line-height): section headings, stat values.
- **Lead** (400, 1.1875rem, 1.6 line-height): the one supporting paragraph under a page's `<h1>`.
- **Body** (400, 1rem, 1.65 line-height): running copy, measure-capped at ~44rem.
- **Caption** (500, 0.8125rem, uppercase, tracking-wide): field labels and stat labels only -- also the floor of the type scale; nothing renders smaller (no arbitrary sub-caption sizes).

### Named Rules

**The No-Kicker Rule.** No caption-label sits above a heading as a kicker or eyebrow. The heading carries its own weight.

## Layout

Mobile-first; layouts stack by default and widen at `sm:`/`md:`. Every section sits inside a `Container` (72rem max width) or `Container measure` (44rem, for running prose). Vertical rhythm comes from a fixed 4px-multiple scale -- nothing else. Section padding is `py-24` desktop / `py-16` mobile. On the cigars listing, the filter panel collapses behind a toggle below `md:` so the first product is reachable without scrolling past every filter.

## Elevation & Depth

Flat by default; what little elevation exists reads as a print catching a sliver of warm light at its top edge, not a black shadow on a black ground (which would vanish). Depth comes primarily from surface-tone contrast against the ambient amber wash, not from shadow.

### Shadow Vocabulary

- **Raise** (`0 1px 0 0 rgb(255 180 120 / 0.05) inset, 0 2px 8px rgb(0 0 0 / 0.5)`): resting cards and panels.
- **Float** (`0 1px 0 0 rgb(255 180 120 / 0.08) inset, 0 16px 40px rgb(0 0 0 / 0.65)`): menus, dialogs, anything that overlays the page.

## Shapes

Three radii only: `control` (0.5rem), `card` (0.875rem), `panel` (1.25rem, the cigar hero image). One hairline border weight everywhere.

## Components

### Buttons

- **Shape:** `rounded-control` (0.5rem).
- **Primary:** amber fill (`#c9541f`), near-black ink text (`#180b04`) -- never white-on-amber.
- **Feedback:** real press/hover via `motion` -- `whileTap={{ scale: 0.97 }}`, hover brightens toward `accent-hover`. Not a CSS color transition; a physical press.

### Cards / Containers

- **Corner:** `rounded-card` (0.875rem).
- **Background:** print-surface tone on darkroom-black canvas -- never a floating white card.
- **Interaction:** the `CigarCard` lifts (`whileHover={{ y: -2 }}`) and presses (`whileTap={{ scale: 0.98 }}`) as a whole -- clicking into a product should feel like picking something up, not just following a link.
- Prefer a single hairline-divided list over N repeated same-size cards.

### Inputs / Fields

- **Style:** print-surface background, hairline border, enamel-white text.
- **Focus:** the one global focus ring (2px accent outline, 2px offset).

### The Developing Print (signature component)

The per-product identity device in place of real photography: a surface carrying `.developing` (`globals.css`) -- a slow amber sweep at rest (6s cycle), quickening to 2.4s on hover/focus via `.developing-active` or a `.group:hover` ancestor. A faint monogram (the brand's initials, toned from `print-light` / `print-mid` / `print-dark`, deterministically chosen from the brand name) sits over the print so products read apart from each other. This is the site's one ambient/idle animation; nothing else on the page animates without user interaction.

### Cigar Hero Entrance (signature interaction)

The cigar detail page's hero -- print, meta line, name, summary, add-to-cart, stat strip -- reveals as one `motion`-orchestrated staggered sequence on mount (~60ms between children, fade + 14px rise). This is the _one_ authored page-entrance in the system; do not add a second one elsewhere on the same page, and do not add page-entrance animation to other pages without a comparable reason.

## Do's and Don'ts

### Do:

- **Do** keep the amber wash as the only background gradient on the site (`The One Light Source Rule`).
- **Do** give every clickable control real `motion` press/hover feedback, not just a CSS color swap.
- **Do** use the developing-print monogram's brand-derived tone as the model for any future per-product visual distinction.
- **Do** treat this palette as the site's only identity -- no `prefers-color-scheme` branch, no `dark:` variant.

### Don't:

- **Don't** use pure `#000` or pure `#fff` anywhere -- always the warm near-black / warm enamel-white pair.
- **Don't** put a caption-style kicker above a heading (`The No-Kicker Rule`).
- **Don't** give any element a second, independently-glowing accent shadow (`The No-Neon Rule`).
- **Don't** use a print tone (`print-light` / `print-mid` / `print-dark`) as general UI color.
- **Don't** write an arbitrary `text-[...]` size smaller than `text-caption` -- it's the floor of the scale.
