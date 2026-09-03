# Project rules

Read this before making any change. It applies to every agent and every human
working in this repo. If a rule here conflicts with your personal preferences
or a personal (`~/.claude`) skill, **this file wins** -- consistency between the
two of us matters more than either of our habits.

## Stack

- Next.js (App Router) + TypeScript, `src/` layout, `@/*` -> `src/*`
- Tailwind CSS v4 -- theme lives in `src/app/tokens.css`, no `tailwind.config.js`
- Supabase for Postgres, auth, storage (`@supabase/ssr`)
- Deploy target: Cloudflare Pages / Workers
- Package manager: npm

## Non-negotiables

1. **No raw design values.** No hex colors, no `#fff`, no `text-[15px]`, no
   ad-hoc `shadow-[...]`. Use the token utilities (`bg-canvas`, `text-ink-muted`,
   `rounded-card`, `shadow-raise`). Need a value that does not exist? Add it to
   `src/app/tokens.css` in its own PR.
2. **Check `src/components/ui/` before writing a component.** Extend what is
   there. A second Button is a bug.
3. **`src/lib/types.ts` is a shared contract.** Changes to it land in their own
   small PR, reviewed by both of us, merged before dependent code.
4. **Every table has RLS enabled and explicit policies.** Schema changes are
   files in `supabase/migrations/`, never dashboard edits.
5. **Secrets never reach the client.** Only `NEXT_PUBLIC_*` is browser-safe.
   Never read or print `.env.local`. Never commit it.
6. **Server-side Supabase client is `await createClient()`** from
   `@/lib/supabase/server`. The browser one is `createClient()` from
   `@/lib/supabase/client`. Do not mix them up.

## Where things live

| Path                         | What                                      |
| ---------------------------- | ----------------------------------------- |
| `src/app/tokens.css`         | every color, size, radius, shadow, easing |
| `src/app/globals.css`        | base element styles + focus ring          |
| `src/components/ui/`         | shared primitives -- reused everywhere    |
| `src/lib/types.ts`           | the frontend/backend contract             |
| `src/lib/supabase/`          | client + server Supabase factories        |
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
npm run build        # production build
```

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
