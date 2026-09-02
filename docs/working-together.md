# Working together

Two people, two Claude Code agents, one repo. This is the protocol.

## 1. Ownership beats coordination

Split by directory, not by ticket. Overlap is where the pain comes from.

| Area                                                   | Owner                              |
| ------------------------------------------------------ | ---------------------------------- |
| `src/app/**` (pages, routing)                          | TBD                                |
| `src/components/**`                                    | TBD                                |
| `src/lib/**`, `src/app/api/**`                         | TBD                                |
| `supabase/**`                                          | TBD                                |
| `src/lib/types.ts`, `src/app/tokens.css`, `.claude/**` | **both -- always review together** |

Fill in the names on day one. Working outside your area is fine, but say so in
chat first so the other person's agent isn't mid-edit in the same file.

## 2. Contract first, then parallel

Before splitting a feature:

1. Agree on the types in `src/lib/types.ts` and the API route shapes.
2. Land that in its own small PR. Both approve.
3. Now work in parallel for hours without colliding -- one against the real
   backend, one against the types.

Skipping this step is the single most common way two agents produce work that
does not fit together.

## 3. Branches and PRs

- `main` is protected: no direct pushes, PR + one approval + green CI.
- Branch names: `feat/<area>-<thing>`, `fix/<area>-<thing>`.
- Small branches, merged daily. A three-day branch is a three-hour merge.
- Rebase on `main` before asking for review.
- `npm run check` must pass locally before you open the PR.

## 4. Genuinely simultaneous editing

Git is not a live-editing tool, and two agents writing the same file will
overwrite each other with no conflict warning. When you truly need to be in one
file at the same time, use **VS Code Live Share** for that session and let one
person drive. Everything else goes through branches.

## 5. Keeping the style identical

Nothing about the look depends on remembering anything:

- `src/app/tokens.css` -- the only place values are defined
- `src/components/ui/` -- the only place primitives are defined
- `.claude/skills/project-ui/SKILL.md` -- the rules both agents read
- `CLAUDE.md` -- the rules both agents read every session
- CI -- format, lint, types and build gate every PR

If you find yourself wanting an exception, change the rule in a PR instead. An
inline one-off is how two people end up with two websites.

## 6. After every merge to main

```bash
git checkout main && git pull
/graphify . --update
git commit -am "chore: refresh knowledge graph"
```

Weekly is enough early on. The graph does not need to be perfect to be useful.
