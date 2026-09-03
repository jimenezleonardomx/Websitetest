---
name: project-ui
description: The house UI rules for this website. Use whenever building, editing, reviewing or restyling anything the user sees -- pages, components, layouts, forms, states, animation, dark mode, spacing, type. Load this BEFORE writing any JSX or CSS in this repo, and before reaching for any generic design skill.
---

# project-ui

This repo has one visual voice. Two people and two agents work in it, so the
voice lives here as rules rather than in anyone's head.

**This skill outranks generic design skills.** If a personal skill on your
machine says something different, follow this file.

## The look, in one paragraph

The darkroom archive. A near-black ground washed in warm amber safelight
rather than a flat accent color, wet-print silver-gray for photographic
surfaces, enamel-tray white for trim. This is the site's one committed
identity, not an OS-triggered dark mode: it does not lighten because a
visitor's phone is set to light. Every product image is a print that never
quite finishes developing -- a slow amber sweep at rest, quickening on
interaction -- and buttons give real tactile feedback, because this world's
whole identity is about something changing state in front of you. Generous
vertical space, restrained horizontal decoration otherwise. It should read
like a darkroom, not a dashboard.

## Pre-flight -- run through this before writing code

1. Does `src/components/ui/` already have this? Extend it instead.
2. Does every value you are about to write exist in `src/app/tokens.css`?
3. Is this actually a new pattern, or a variant of an existing one?
4. What do the empty, loading, error and long-content states look like?

## Rules

### Color

- Only token utilities: `bg-canvas`, `bg-surface`, `bg-sunken`, `text-ink`,
  `text-ink-muted`, `text-ink-faint`, `border-line`, `border-line-strong`,
  `bg-accent`, `text-accent`, `bg-accent-wash`, `text-danger`.
- `text-print-light`, `text-print-mid`, `text-print-dark` exist for exactly
  one purpose: the per-cigar "print" graphic (`cigar-placeholder-image.tsx`)
  that tells products apart. Never use a print tone as general UI color.
- The amber wash on `body` (see `globals.css`) is the site's one ambient
  light source. Do not add a second background gradient anywhere else --
  everything else sits flat on top of it.
- **The accent is a budget, not a paint.** Roughly one accent element per
  viewport: the primary action, or a link, or a highlighted stat. Not all three.
- Never a second gradient beyond the one safelight wash on `body` -- no
  gradient text, gradient buttons, or gradient borders. Never a colored drop
  shadow (the `.developing` sweep is the one sanctioned exception, and it
  lives only on product imagery).
- There is no dark mode to toggle -- this palette _is_ the site, always. If
  something looks wrong, fix the token in `tokens.css`, never branch on
  `prefers-color-scheme` or write a `dark:` variant.

### Typography

- Sizes come from the scale only: `text-caption`, `text-body`, `text-lead`,
  `text-title`, `text-display`, `text-hero`. Never `text-sm`/`text-2xl`/
  arbitrary sizes -- the scale carries its own line-height and tracking.
- Two weights on a page: normal and medium. `font-bold` is a last resort.
- Long-form text gets `<Container measure>` (~44rem). Never let body copy run
  the full page width.
- Sentence case for headings and buttons. No Title Case. `text-caption
uppercase tracking-wide` is for field/data labels only (a stat's caption,
  a form field label) -- never as a kicker/eyebrow sitting above a heading.
  The heading carries its own weight; if something needs saying, say it in
  the heading or the paragraph under it, not in a label above it.

### Space and layout

- Vertical rhythm uses the 4px scale: `2 3 4 6 8 10 12 16 20 24 32`. Nothing else.
- Section padding: `py-24` desktop, `py-16` mobile. Related items `gap-4`,
  distinct groups `gap-10`+.
- Every page section sits inside `<Container>`. No page-level horizontal padding
  invented per component.
- Prefer whitespace over borders and boxes for separation. Do not nest a card
  inside a card.
- A row of same-size cards (icon/heading/text, repeated) is the lazy default,
  not a pattern to reach for. A hairline-divided list (see the homepage
  highlights, or a cigar's stat strip) usually reads better than boxing every
  item -- one bordered container with internal dividers, not N separate cards.
- Mobile first. Layouts stack by default and `md:`/`sm:` widen them.

### Shape and depth

- Radii: `rounded-control` (buttons, inputs), `rounded-card`, `rounded-panel`.
- Shadows: `shadow-raise` for resting surfaces, `shadow-float` for things that
  genuinely overlay the page (menus, dialogs). Nothing else.
- One hairline weight everywhere: `border border-line`.

### Motion

This world's identity is built on things visibly changing state -- a print
developing, a shutter pressed -- so it earns a wider motion vocabulary than a
typical quiet site. That is still a fixed, named vocabulary, not a license to
animate everything: every element gets one of the patterns below, never an
invented one-off.

- `transition-colors duration-150 ease-out-soft` for ordinary hover and focus
  that doesn't fit a pattern below.
- **Developing (the signature ambient motion):** every product image carries
  `.developing` -- a slow amber sweep at rest (6s), quickening to 2.4s via
  `.developing-active` on hover/focus. Defined once in `globals.css`. Never
  hand-roll a second sweep animation; extend this one.
- **Tap feedback:** interactive controls (`Button`, cards, quantity steppers)
  use the `motion` library for press/hover feedback -- a small scale-down on
  press (`whileTap={{ scale: 0.97 }}`), a brightness/glow shift on hover taken
  from `accent-hover`. This replaces plain CSS for anything the visitor
  clicks or taps; CSS `transition-colors` still covers passive hover (links,
  nav items).
- **Entrance (page-level, once per page):** the cigar detail page's hero
  content (print graphic, name, price strip) reveals as one staggered
  sequence on mount via `motion` -- fade + slight rise, ~60ms stagger between
  children. This is the _one_ authored entrance per page; do not add a
  second staggered reveal elsewhere on the same page.
- **Scroll drift (the one scroll-linked effect):** a card or image may settle
  in slightly -- `translateY(12px) scale(0.98)` at `opacity: 0.85` up to its
  resting state -- driven by native CSS scroll-timeline (`animation-timeline:
view()`), never a JS scroll listener. Use the `.scroll-drift` utility in
  `globals.css`. Content only, never the whole page or a background layer.
  Browsers without `animation-timeline` support just see the resting state.
- No parallax on background/decorative layers, no bouncing easings, no motion
  invented outside the patterns above.
- `prefers-reduced-motion` is handled globally in `globals.css` for CSS
  animations; `motion`-driven components must also respect it (check
  `useReducedMotion()` before a whileTap/entrance animation plays).

### Components and accessibility

- New primitives go in `src/components/ui/`, one file per component, named
  export, props typed and extending the native element's props.
- Variants live in a `Record<Variant, string>` map at the top of the file, the
  way `button.tsx` does it. Do not inline conditional class strings.
- Always accept `className` and merge it last through `cn()` so callers can
  adjust spacing without a new variant.
- Semantic HTML first: `<button>` for actions, `<a>` for navigation. Never a
  `<div onClick>`.
- Every interactive element is keyboard reachable. The focus ring is global --
  never `outline-none` without a replacement.
- Every image has real `alt` text; decorative images get `alt=""`.
- Icons need an accessible label when they are the only content.

### Content

- Write real copy, never lorem ipsum.
- Empty states say what to do next, not "No data".
- Error messages say what happened and the next step. Never surface an error
  `code` to a user -- use `ApiError.message`.

## Banned outright

- Raw hex, `rgb()`, arbitrary `text-[..]` / `p-[..]` / `shadow-[..]` values
- `dark:` variants
- Purple/blue "AI startup" gradients, glassmorphism, neon glow
- Emoji as UI icons
- Marketing-speak: "seamless", "unlock", "supercharge", "revolutionize"
- A second Button, Card or Container implementation
- Inline `<style>` or a new global stylesheet

## When the rules do not fit

Add the missing token or variant in a small PR and update this file in the same
PR. The rules change by agreement, not by exception -- an inline one-off is how
two people end up with two websites.
