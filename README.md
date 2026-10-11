# learn-actions

A Next.js app that is automatically deployed to **Cloudflare Workers** by **GitHub Actions** on every push to `main`.

Live at: https://learn-actions.khalidlab.tech

## How it works

```
git push (main)  →  GitHub Actions runner  →  build with OpenNext  →  wrangler deploy  →  Cloudflare Workers
```

- **OpenNext (`@opennextjs/cloudflare`)** converts the Next.js build into a Cloudflare Worker.
- **Wrangler** is Cloudflare's CLI, which uploads the Worker and attaches the custom domain.
- **GitHub Actions** runs both steps in CI whenever you push, using secrets for authentication.

## Prerequisites

- Node.js 20 or newer
- A GitHub repository for this project
- A Cloudflare account, with the domain (`khalidlab.tech`) added as an **active zone**
- An existing Next.js project (App Router)

## Setup, step by step

### step 1: Install the adapter and Wrangler

```
npm install @opennextjs/cloudflare@latest
npm install -D wrangler@latest
```

### step 2: Create `wrangler.jsonc` in the project root

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "learn-actions",
  "main": ".open-next/worker.js",
  "compatibility_date": "2025-04-01",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS",
  },
  "routes": [
    { "pattern": "learn-actions.khalidlab.tech", "custom_domain": true },
  ],
}
```

`custom_domain: true` makes Cloudflare create the DNS record and TLS certificate automatically. This only works if the domain's zone is active in your Cloudflare account.

### step 3: Create `open-next.config.ts` in the project root

```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
```

### step 4: Add scripts to `package.json`

Inside the `"scripts"` section:

```json
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"
```

### step 5: Ignore the build output

```
echo ".open-next" >> .gitignore
```

### step 6: Test locally before involving CI

```
npm run preview
```

Open the URL it prints. If the page loads, the build side works.

### step 7: Create a Cloudflare API token

In the Cloudflare dashboard:

1. Go to **My Profile → API Tokens → Create Token**
2. Use the **Edit Cloudflare Workers** template
3. Make sure the token has these permissions:

   | Scope   | Permission       | Access |
   | ------- | ---------------- | ------ |
   | Account | Workers Scripts  | Edit   |
   | Account | Account Settings | Read   |
   | Zone    | Workers Routes   | Edit   |
   | Zone    | DNS              | Edit   |

4. Under **Account Resources**, select **Include → your account**
5. Under **Zone Resources**, select **Include → Specific zone → your domain**
6. Create the token and copy it (it is shown only once)

### step 8: Get your Cloudflare Account ID

1. In the dashboard, go to **Workers & Pages**
2. Copy **Account ID** from the right sidebar (a 32-character hex string)

> Do **not** use the Zone ID from the domain's overview page. It looks similar but is a different ID.

### step 9: Add the secrets to GitHub

In your repo on github.com:

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Name: `CLOUDFLARE_API_TOKEN`, value: your token, then **Add secret**
4. Click **New repository secret** again
5. Name: `CLOUDFLARE_ACCOUNT_ID`, value: your account ID, then **Add secret**

The names must match exactly, because the workflow references them.

### step 10: Create the workflow folder

```
mkdir -p .github/workflows
```

### step 11: Create `.github/workflows/deploy.yml`

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci

      - run: npm run deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

What each part does:

- `on.push.branches` runs the workflow on every push to `main`.
- `actions/checkout` downloads your code onto the runner.
- `actions/setup-node` installs Node and caches npm downloads.
- `npm ci` does a clean install from `package-lock.json`.
- `npm run deploy` builds with OpenNext and deploys with Wrangler, which reads the two env vars to authenticate.

### step 12: Commit and push

```
git add .
git commit -m "ci: deploy to cloudflare workers"
git push -u origin main
```

### step 13: Watch the run

1. In your repo, open the **Actions** tab
2. Click the latest run
3. Click the `deploy` job to see live logs for each step

When it turns green, open https://learn-actions.khalidlab.tech. The certificate can take a minute or two on the first deploy.

### step 14: Verify that pushing triggers a deploy

Edit any visible text in `app/page.tsx`, then:

```
git commit -am "test: change homepage text"
git push
```

A new run should start in the **Actions** tab, and the live site should update when it finishes.

## Troubleshooting

### `Could not route to /client/v4/accounts/***/workers/services/... [code: 7003]`

The `CLOUDFLARE_ACCOUNT_ID` secret is not a valid account ID. Common causes:

- You pasted the **Zone ID** instead of the **Account ID**
- You pasted the API token by mistake
- The value has a trailing space or newline
- The ID belongs to a different account than the token

Fix: copy the Account ID again from **Workers & Pages** (step 8) and update the secret via **Settings → Secrets and variables → Actions → pencil icon → Update secret**.

### `No access to the specified resource`

The API token lacks permission on Workers for that account. Fix:

1. Go to **My Profile → API Tokens → Edit** on your token
2. Confirm the four permissions from step 7
3. Confirm **Account Resources** includes your account and **Zone Resources** includes your domain
4. Save. If you created a brand new token, update the `CLOUDFLARE_API_TOKEN` secret too.

### Custom domain or DNS errors

- Check that the domain is an **active zone** in the same Cloudflare account
- Check that the token has **Zone → DNS → Edit** and **Zone → Workers Routes → Edit**
- Check that no existing DNS record already uses the subdomain. Delete it, or let the Worker take over the hostname.

### Re-running after a fix

In the **Actions** tab, open the failed run and click **Re-run failed jobs**. Or trigger a fresh run with an empty commit:

```
git commit --allow-empty -m "ci: retry deploy"
git push
```

### Reading a failed run

In the **Actions** tab, click the failed run, then the red step. The error is usually at the very bottom of that step's log.

## Useful commands

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Run the Next.js dev server                    |
| `npm run preview` | Build and run the Worker locally              |
| `npm run deploy`  | Build and deploy to Cloudflare (what CI runs) |

## Project structure

```
.
├── app/                  # Next.js App Router pages
├── public/               # Static assets
├── .github/workflows/    # GitHub Actions workflows
│   └── deploy.yml
├── open-next.config.ts   # OpenNext config
├── wrangler.jsonc        # Cloudflare Worker config
└── package.json
```
