# Project rules

Read this before making any change. It applies to every agent and every human
working in this repo. If a rule here conflicts with your personal preferences
or a personal (`~/.claude`) skill, **this file wins** -- consistency between the
two of us matters more than either of our habits.

## Stack

- Next.js (App Router) + TypeScript, `src/` layout, `@/*` -> `src/*`
- Tailwind CSS v4 -- theme lives in `src/app/tokens.css`, no `tailwind.config.js`
- Supabase for Postgres, auth, storage -- **browser client only** (see below)
- Deploy target: Smooth Hosting shared hosting, static export to `public_html`
- Package manager: npm

## This is a static site. There is no server.

`next.config.ts` sets `output: 'export'`. `npm run build` emits plain HTML/CSS/JS
into `out/`, which gets uploaded to `public_html`. There is no Node.js process
behind it -- Smooth Hosting's shared plan is Apache serving files, nothing more.

This rules out, permanently, unless the hosting plan changes:

- Route Handlers (`src/app/api/**`)
- Server Actions
- Middleware
- Anything that reads cookies on the server (`next/headers`, a server-side
  Supabase client) -- there is no request to attach a server client to
- `next/image` optimization -- `images.unoptimized` is already set

**All Supabase access goes through `createClient()` in `@/lib/supabase/client`,
called from Client Components (`'use client'`).** There is no
`@/lib/supabase/server` -- do not add one back; it cannot work here. Auth,
inserts, queries -- all of it runs in the browser against Supabase directly,
protected by RLS policies, exactly the way a static site is supposed to talk to
a backend.

If a feature genuinely needs server-side logic (a webhook, a secret API call, a
cron job), it does not belong in this Next.js app -- write it as a **Supabase
Edge Function** (`supabase/functions/`) instead. That runs on Supabase's
infrastructure, not the host.

## Non-negotiables

1. **No raw design values.** No hex colors, no `#fff`, no `text-[15px]`, no
   ad-hoc `shadow-[...]`. Use the token utilities (`bg-canvas`, `text-ink-muted`,
   `rounded-card`, `shadow-raise`). Need a value that does not exist? Add it to
   `src/app/tokens.css` in its own PR.
2. **Check `src/components/ui/` before writing a component.** Extend what is
   there. A second Button is a bug.
3. **`src/lib/types.ts` is a shared contract.** Changes to it land in their own
   small PR, reviewed by both of us, merged before dependent code.
4. **Every table has RLS enabled and explicit policies.** This matters more
   here than on a typical setup -- the browser client is the _only_ client, so
   RLS is the entire security boundary, not a second layer behind server checks.
   Schema changes are files in `supabase/migrations/`, never dashboard edits.
5. **Secrets never reach the client.** Only `NEXT_PUBLIC_*` is browser-safe.
   Never read or print `.env.local`. Never commit it. There is no secret
   Supabase key anywhere in this app -- if a task seems to need one, it belongs
   in an Edge Function, not here.
6. **Every route needs a real folder with real content at build time.** No
   dynamic route can defer to a server -- if it's not pre-rendered by
   `next build`, it does not exist on Smooth Hosting.

## Where things live

| Path                         | What                                      |
| ---------------------------- | ----------------------------------------- |
| `src/app/tokens.css`         | every color, size, radius, shadow, easing |
| `src/app/globals.css`        | base element styles + focus ring          |
| `src/components/ui/`         | shared primitives -- reused everywhere    |
| `src/lib/types.ts`           | the frontend/backend contract             |
| `src/lib/supabase/client.ts` | the only Supabase client -- browser only  |
| `supabase/migrations/`       | schema, append-only                       |
| `.claude/skills/project-ui/` | the UI skill both agents must use         |
| `docs/adr/`                  | why we decided things                     |

## Working with two people

- Branch names: `feat/<area>-<thing>`, `fix/<area>-<thing>`.
- Small branches, merge daily. Never leave a branch open over a weekend.
- **Do not edit files outside your area of ownership** without saying so first.
  Two agents editing one file overwrite each other silently.
- Before parallel work: agree on `src/lib/types.ts`, merge it, then split.
- After merging to `main`, refresh the knowledge graph:
  `/graphify . --update` and commit `graphify-out/`.

## Commands

```
npm run dev          # dev server
npm run check        # format + lint + typecheck -- run before every PR
npm run build         # static export -> out/
npm run serve         # preview the exported out/ locally, as a static host would
```

See [docs/deploy.md](docs/deploy.md) for pushing `out/` to Smooth Hosting.

## Before you open a PR

- [ ] `npm run check` passes
- [ ] No raw hex / arbitrary sizes introduced
- [ ] No new component that duplicates one in `src/components/ui/`
- [ ] New tables have RLS policies
- [ ] `.env.local` untouched and uncommitted

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
