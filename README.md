# Website

Next.js + TypeScript + Tailwind v4, Supabase for data and auth, deployed to
Cloudflare. Built by two people with Claude Code, so the conventions ship in the
repo -- see [CLAUDE.md](CLAUDE.md).

## Setup (5 minutes)

```bash
git clone <repo-url>
cd website
npm install
cp .env.example .env.local   # then fill in the two Supabase values
npm run dev
```

Open http://localhost:3000.

That is the whole onboarding. Claude Code picks up `CLAUDE.md`,
`.claude/settings.json` and `.claude/skills/project-ui/` automatically on clone
-- nothing to install, nothing to configure.

### Getting the Supabase values

Supabase dashboard -> your project -> Project Settings -> API. Copy the project
URL and the **Publishable** key (older projects call it the `anon public` key)
into `.env.local`.

## Scripts

| Command          | Does                                             |
| ---------------- | ------------------------------------------------ |
| `npm run dev`    | dev server                                       |
| `npm run check`  | format + lint + typecheck -- run before every PR |
| `npm run build`  | production build                                 |
| `npm run format` | rewrite files with Prettier                      |

## Working on this together

Read [docs/working-together.md](docs/working-together.md). Short version: small
branches, PRs into `main`, agree on `src/lib/types.ts` before splitting work,
and don't edit files outside your area without saying so.

## The knowledge graph

`graphify-out/` holds a committed knowledge graph of the codebase, so either
agent can answer "where does X live?" without re-reading the repo:

```bash
/graphify .              # first build
/graphify . --update     # after merging to main
/graphify query "how does auth work?"
```

It is a generated artifact -- **never resolve a merge conflict in it by hand.**
`.gitattributes` keeps our side; just re-run `--update` on `main` and commit.
