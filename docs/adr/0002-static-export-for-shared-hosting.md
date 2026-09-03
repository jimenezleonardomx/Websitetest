# ADR 0002 -- Static export for Smooth Hosting

**Status:** accepted
**Date:** 2026-09-03
**Supersedes:** the Cloudflare Pages/Workers hosting decision in
[0001-stack.md](0001-stack.md)

## Context

The domain and hosting are with [Smooth Hosting](https://smoothhosting.co.uk),
pointed at `public_html`. That is a shared-hosting document root -- Apache
serving files, no persistent Node.js process behind it. Cloudflare Workers
config was wired up first and then removed once this became clear.

## Decision

`next.config.ts` sets `output: 'export'`. `npm run build` produces static
HTML/CSS/JS in `out/`, uploaded to `public_html` as-is. No server-side Next.js
feature is available:

- No Route Handlers, Server Actions, or middleware
- No server-side Supabase client -- `src/lib/supabase/server.ts` does not
  exist in this repo, and should not be re-added
- No `next/image` optimization server (`images.unoptimized: true`)

All Supabase access happens from the browser, through
`createClient()` in `@/lib/supabase/client`, protected entirely by Postgres RLS
policies.

## Why not fight the host instead

The alternatives were: move to a Node-capable host (Cloudflare, Vercel,
Railway, or Smooth Hosting's own VPS/dedicated tier), or run a static export.
The domain and hosting plan were already a given, not open questions, so this
ADR is about working with that constraint rather than re-opening it.

A static export is not a downgrade for a two-person marketing/content site --
most of what such a site needs (pages, forms that write to Supabase, auth) work
fine as browser-driven calls against RLS-protected tables. It becomes a real
constraint only if the app later needs something that must not run in the
browser (a secret third-party API key, a webhook receiver, scheduled jobs).

## Revisit if

- The project needs server-side secrets or a webhook receiver -- reach for a
  **Supabase Edge Function** first (still free, still no new host), and only
  reconsider the hosting plan if Edge Functions genuinely don't fit.
- Smooth Hosting's VPS/dedicated tier gets used instead of the shared plan --
  that regains a real Node.js process and this ADR should be revisited.

## Consequences

- `npm run build` must succeed as a fully static export; a page or component
  that requires `cookies()`, `headers()`, or a Route Handler will fail the
  build, not fail silently.
- Deploys are a file upload (FTP/SFTP or File Manager) of `out/`, documented in
  [docs/deploy.md](../deploy.md) -- there is no git-push-to-deploy pipeline
  unless Smooth Hosting's panel is later scripted against.
- RLS policies are the _entire_ authorization boundary. There is no server
  layer double-checking permissions behind them.
