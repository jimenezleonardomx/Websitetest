# Deploying to Smooth Hosting

See [ADR 0002](adr/0002-static-export-for-shared-hosting.md) for why this is a
static export rather than a running Next.js server.

`npm run build` produces a folder, `out/`, containing the entire site as plain
files. Deploying is: upload the _contents_ of `out/` into `public_html` --
never the `out` folder itself, its contents.

Confirmed for this project: domain `tabaco.visualmarker.co.uk` points at
`/home/sites/25a/8/8b5ff4250a/public_html`.

## One-time: get FTP/SFTP credentials

Smooth Hosting's control panel (cPanel or their own panel) has an
**FTP Accounts** section. Create or find the account for this site and note:

- Host (often `ftp.yourdomain.co.uk` or an IP -- the panel shows it)
- Username
- Password
- Port (`21` for FTP, `22` for SFTP if offered -- prefer SFTP if available)

Do not commit these anywhere. If you want me to hold them for scripted
deploys, put them in `.env.local` under new `DEPLOY_*` keys (already
gitignored) or as GitHub Actions secrets (see below) -- never in a tracked file.

## Manual deploy (do this first, to confirm it works)

1. `npm run build` -- creates `out/`
2. Open an FTP/SFTP client (e.g. [FileZilla](https://filezilla-project.org/),
   free, both of you should install it) and connect with the credentials above
3. Navigate to `public_html` on the remote side
4. Upload everything **inside** `out/` (not the `out` folder itself) into
   `public_html`, overwriting existing files
5. Visit `tabaco.visualmarker.co.uk` and confirm the new build is live

Command-line alternative, if you'd rather script it (replace the placeholders):

```bash
npm run build
npx lftp -e "mirror -R out/ /home/sites/25a/8/8b5ff4250a/public_html --parallel=4; quit" \
  -u "$FTP_USER,$FTP_PASSWORD" sftp://ftp.yourdomain.co.uk
```

## Automated deploy on every push to main (recommended once the manual path works)

Add a step to `.github/workflows/ci.yml` (or a separate workflow) using an
FTP-deploy action, guarded by GitHub Actions secrets so credentials never touch
the repo:

```yaml
deploy:
  needs: check
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: 24, cache: npm }
    - run: npm ci
    - run: npm run build
      env:
        NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY }}
    - uses: SamKirkland/FTP-Deploy-Action@v4.3.5
      with:
        server: ${{ secrets.SMOOTHHOSTING_FTP_HOST }}
        username: ${{ secrets.SMOOTHHOSTING_FTP_USER }}
        password: ${{ secrets.SMOOTHHOSTING_FTP_PASSWORD }}
        local-dir: ./out/
        server-dir: /public_html/
```

Set the four secrets under repo Settings -> Secrets and variables -> Actions:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
`SMOOTHHOSTING_FTP_HOST`, `SMOOTHHOSTING_FTP_USER`,
`SMOOTHHOSTING_FTP_PASSWORD`. Once that's in place, merging to `main` deploys
automatically -- no one needs FileZilla for routine changes.

## Checklist before every deploy

- [ ] `npm run check` passes
- [ ] `npm run build` completes with no errors (a page using `cookies()`,
      a Route Handler, or Server Action will fail the build here -- see
      [ADR 0002](adr/0002-static-export-for-shared-hosting.md))
- [ ] `npm run serve` and click through the site locally against the real
      `out/` output before uploading
