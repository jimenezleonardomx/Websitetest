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

Warm, quiet, editorial. An off-white paper ground rather than pure white, near-
black warm text rather than `#000`, one green accent used sparingly for action
and focus. Generous vertical space, restrained horizontal decoration. Typography
carries the hierarchy; borders and shadows barely whisper. It should read like a
well-set document, not a dashboard.

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
- **The accent is a budget, not a paint.** Roughly one accent element per
  viewport: the primary action, or a link, or a highlighted stat. Not all three.
- Never a gradient as decoration. Never a colored drop shadow.
- Dark mode is already handled by token overrides. Do not write `dark:`
  variants; if something looks wrong in dark, fix the token, not the component.

### Typography

- Sizes come from the scale only: `text-caption`, `text-body`, `text-lead`,
  `text-title`, `text-display`, `text-hero`. Never `text-sm`/`text-2xl`/
  arbitrary sizes -- the scale carries its own line-height and tracking.
- Two weights on a page: normal and medium. `font-bold` is a last resort.
- Long-form text gets `<Container measure>` (~44rem). Never let body copy run
  the full page width.
- Sentence case for headings and buttons. No Title Case, no ALL CAPS except the
  small `text-caption uppercase tracking-wide` eyebrow label.

### Space and layout

- Vertical rhythm uses the 4px scale: `2 3 4 6 8 10 12 16 20 24 32`. Nothing else.
- Section padding: `py-24` desktop, `py-16` mobile. Related items `gap-4`,
  distinct groups `gap-10`+.
- Every page section sits inside `<Container>`. No page-level horizontal padding
  invented per component.
- Prefer whitespace over borders and boxes for separation. Do not nest a card
  inside a card.
- Mobile first. Layouts stack by default and `md:`/`sm:` widen them.

### Shape and depth

- Radii: `rounded-control` (buttons, inputs), `rounded-card`, `rounded-panel`.
- Shadows: `shadow-raise` for resting surfaces, `shadow-float` for things that
  genuinely overlay the page (menus, dialogs). Nothing else.
- One hairline weight everywhere: `border border-line`.

### Motion

- `transition-colors duration-150 ease-out-soft` for hover and focus. That is
  the default and it covers most cases.
- Entrances only where something genuinely appears (dialog, toast, popover).
  No scroll-triggered reveals, no parallax, no bouncing easings.
- `prefers-reduced-motion` is handled globally in `globals.css`; do not
  reimplement it.

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
