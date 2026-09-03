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

There is no FTP involved. Deployment goes through cPanel's **Git™ Version
Control** feature:

1. `npm run build` produces `out/` -- the entire site as static files.
2. Those files get committed to a `deploy` branch in this repo. `deploy` is
   **generated content only** -- always force-pushed, never edited by hand,
   never merged into `main`.
3. cPanel has a repository (named `website`) cloned at `public_html/tabaco`,
   configured with **Deployment Branch: `deploy`**.
4. Clicking **Deploy Repository** in that cPanel panel does a fetch + deploy
   in one step -- it pulls the latest `deploy` branch and copies it into
   `public_html/tabaco`. Confirmed working by hand on 2026-09-03.

`.github/workflows/deploy.yml` automates steps 1-2 on every push to `main`,
and can also trigger step 4 via cPanel's API once the secrets below are set.

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
setup needed. The cPanel-trigger half needs four repo secrets (Settings ->
Secrets and variables -> Actions -> New repository secret):

| Secret             | Value                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `CPANEL_HOST`      | Your cPanel server hostname **with port**, e.g. `server123.smoothhosting.co.uk:2083` -- found in the URL bar while logged into cPanel |
| `CPANEL_USERNAME`  | Your cPanel account username (not the FTP or email address -- the master login for the whole hosting account)                         |
| `CPANEL_REPO_PATH` | `/home/sites/25a/8/8b5ff4250a/public_html/tabaco`                                                                                     |
| `CPANEL_API_TOKEN` | Generate one in cPanel: **Security -> Manage API Tokens -> Create**                                                                   |

Also needed for the build step itself (same as before):

| Secret                                 | Value             |
| -------------------------------------- | ----------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | from `.env.local` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | from `.env.local` |

Until `CPANEL_HOST` is set, the workflow still builds and pushes `deploy`
automatically -- it just posts a warning instead of failing, and you click
**Deploy Repository** in cPanel by hand for that last step.

**This part is less certain than everything else here.** The remote-trigger
call uses cPanel's UAPI (`VersionControl` module, `deployment_create`
function) -- confirmed to exist, but not exhaustively tested against Smooth
Hosting's specific cPanel version. If the "Trigger cPanel deploy" step in
Actions fails, the static export still made it to the `deploy` branch safely
-- just click Deploy Repository manually and let me know what error came back
so we can adjust the call.

## Checklist before every deploy

- [ ] `npm run check` passes
- [ ] `npm run build` completes with no errors (a page using `cookies()`,
      a Route Handler, or Server Action will fail the build here -- see
      [ADR 0002](adr/0002-static-export-for-shared-hosting.md))
- [ ] `npm run serve` and click through the site locally against the real
      `out/` output before deploying
