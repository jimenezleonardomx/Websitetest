# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Existing regulars of Sautter's physical shop at 106 Mount Street, Mayfair, London. They already
know and trust the shop; they land on the site to browse current stock or reorder favourites
between visits, not to be persuaded a stranger is trustworthy. Design and copy should prioritise
speed, clarity, and utility over building trust from zero — the heritage story can live in the
background rather than up front.

## Product Purpose

The online extension of a real, decades-old Mayfair cigar merchant: a stock catalogue regulars can
browse from anywhere, plus a prototype purchase flow (cart, checkout, order confirmation) and an
owner-facing order dashboard. It exists to keep regulars connected to current stock between shop
visits, not to replace the in-person relationship.

## Positioning

What a generic online cigar retailer can't truthfully claim:

- **Decades of heritage and a real physical shop** — Sautter has traded from the same stretch of
  Mount Street, Mayfair for over fifty years.
- **Aged, cellared inventory bought in small direct parcels** — cigars rest in a cellar humidor
  before sale, and staff can tell a customer where a box has been resting and for how long, because
  stock is bought one box at a time rather than in bulk.
- **Personal, honest advice over upselling** — staff smoke what they sell and say so when they
  wouldn't smoke something themselves; the humidor room at the back is open for a no-purchase
  conversation.

## Operating Context

- A physical shop and humidor room at 106 Mount Street, London W1K 2TW, where regulars keep their
  own boxes between visits alongside the shop's aged stock.
- Stock turns over with the seasons; the site's catalogue is expected to change as boxes sell
  through and new parcels are bought.
- Order fulfilment is currently manual and owner-run: an order placed on the site is meant to be
  seen, packed, and shipped by the shop owner, tracked through the owner dashboard.

## Capabilities and Constraints

- Static export (Next.js `output: 'export'`) deployed to shared Apache hosting — no Node.js
  process, no server routes, no middleware. All dynamic behaviour runs client-side against
  Supabase (browser client + RLS) or is faked entirely.
- **The purchase flow (payment, order creation, the owner dashboard) is an intentional prototype
  and stays one indefinitely** — not a staging step toward real payments. No real money moves, no
  real card details are collected, and no shipping actually happens. This is a durable product
  decision, not a temporary gap to close later.
- Because it is a permanent prototype, age-verification and shipping/customs restrictions for a
  real age-restricted product were explicitly decided as out of scope — do not add them, and do
  not treat the checkout as if it needs to become production-real.
- Contact details (phone, email) in the current site are explicit placeholders, not real
  information — do not treat them as evidence-backed facts.

## Brand Commitments

- Name: **Sautter**. Existing wordmark is a cursive script logotype.
- Address: 106 Mount Street, London W1K 2TW.
- Voice, from existing About copy: plain-spoken and unpretentious about an expensive product —
  "sell what you'd smoke yourself, and say so when you wouldn't." Confidence without salesmanship.

## Evidence on Hand

- A real six-product catalogue (`src/lib/cigars.ts`) with genuine names, origins, tasting notes,
  and prices — this is real content, not placeholder.
- No real product photography exists yet; every product currently shares one generic placeholder
  line-art icon, which is a known gap, not a design choice to preserve.
- Phone and email on the Contact page are literal placeholder strings ("Add real number/email
  here") — not real evidence.

## Product Principles

1. Design for someone who already trusts Sautter — optimise for fast, clear browsing and
   reordering, not for persuading a skeptical stranger.
2. Every heritage, quality, or provenance claim shown must be truthful and traceable to real copy
   or data already in the project — never invent testimonials, numbers, or history.
3. The prototype nature of checkout and the owner dashboard is permanent by decision, not a
   temporary shortcut — future work should keep making that faked-but-honest, not "finish" it into
   real commerce.
4. Stock and pricing are living data (`src/lib/cigars.ts`), expected to change — design must hold
   up with different counts, prices, and text lengths, not just today's six products.
