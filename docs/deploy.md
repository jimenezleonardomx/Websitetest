# Deploying to Smooth Hosting

See [ADR 0002](adr/0002-static-export-for-shared-hosting.md) for why this is a
static export rather than a running Next.js server.

**This site lives at `public_html/tabaco`, not the account's root
`public_html`.** That directory is shared with several other live sites
(`bife`, `garage`, `schedule`, and more) -- never delete or overwrite anything
at the `public_html` root. Everything below is scoped to the `tabaco`
subfolder only.

Confirmed for this project:

- Domain: `tabaco.visualmarker.co.uk`
- Document root: `/home/sites/25a/8/8b5ff4250a/public_html/tabaco`

## How it works

Deployment goes through cPanel's **Git™ Version Control** feature -- no FTP.

1. `npm run build` produces `out/` -- the entire site as static files.
2. Those files get committed to a `deploy` branch in this repo. `deploy` is
   **generated content only** -- always force-pushed, never edited by hand,
   never merged into `main`.
3. cPanel has a repository (named `website`) cloned directly at
   `public_html/tabaco`, configured with **Deployment Branch: `deploy`**.
4. `git fetch origin deploy && git reset --hard origin/deploy`, run inside
   that folder, pulls the latest build into place. (Clicking "Deploy
   Repository" in cPanel's UI does exactly this internally -- confirmed by
   hand on 2026-09-03.)

`.github/workflows/deploy.yml` automates steps 1-2 on every push to `main`,
and does step 4 itself over SSH once the secrets below are set.

## Manual deploy (the fallback, always works)

1. `npm run build`
2. Push `out/` to the `deploy` branch (see the "Push static export to the
   deploy branch" step in `deploy.yml` for the exact commands, or just let the
   GitHub Action do it on push to `main`)
3. In cPanel: **Git™ Version Control** -> `website` -> open it -> **Deploy
   Repository**
4. Visit `tabaco.visualmarker.co.uk` and confirm the new build is live

## Automated deploy -- finishing the setup

The build-and-push-to-`deploy` half already runs on every push to `main`, no
setup needed. The server-pull half needs a dedicated SSH deploy key and five
repo secrets (Settings -> Secrets and variables -> Actions -> New repository
secret).

**One-time key setup:**

1. A dedicated ed25519 keypair -- generated only for this, not reused from
   anywhere else, so it can only ever do this one thing.
2. Public half added to **cPanel -> SSH Access -> Manage SSH Keys -> Import
   Key**, then **Authorize**d.
3. Private half pasted into the `SSH_PRIVATE_KEY` secret below.

**Secrets:**

| Secret            | Value                                                                            |
| ----------------- | -------------------------------------------------------------------------------- |
| `SSH_PRIVATE_KEY` | The full deploy private key, including the `BEGIN`/`END` lines                   |
| `SSH_HOST`        | From cPanel -> SSH Access, e.g. `server123.smoothhosting.co.uk`                  |
| `SSH_USER`        | Your cPanel master username -- also shown on the SSH Access page                 |
| `SSH_PORT`        | From cPanel -> SSH Access -- often `22`, but shared hosts often use a custom one |
| `REPO_PATH`       | `/home/sites/25a/8/8b5ff4250a/public_html/tabaco`                                |

Also needed for the build step itself (same as before):

| Secret                                 | Value             |
| -------------------------------------- | ----------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | from `.env.local` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | from `.env.local` |

Until `SSH_HOST` is set, the workflow still builds and pushes `deploy`
automatically -- it just posts a warning instead of failing, and you click
**Deploy Repository** in cPanel by hand for that last step.

The deploy step itself is the exact two git commands from "How it works"
above, run over SSH -- it doesn't depend on an undocumented API surface the
way an earlier version of this file (using cPanel's UAPI) did.

## Checklist before every deploy

- [ ] `npm run check` passes
- [ ] `npm run build` completes with no errors (a page using `cookies()`,
      a Route Handler, or Server Action will fail the build here -- see
      [ADR 0002](adr/0002-static-export-for-shared-hosting.md))
- [ ] `npm run serve` and click through the site locally against the real
      `out/` output before deploying
