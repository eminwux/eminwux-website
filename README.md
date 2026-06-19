# eminwux website

The source for Emiliano Spinella's personal website, built with React, CRACO,
and Tailwind CSS.

## Development

The frontend requires Node.js 20 or later.

```bash
cd frontend
corepack enable
yarn install --frozen-lockfile
yarn start
```

The development server is available at <http://localhost:3000>.

To create a production build locally:

```bash
cd frontend
yarn build
```

The generated static site is written to `frontend/build`.

## GitHub Pages

The [Deploy website to GitHub Pages](.github/workflows/deploy-pages.yml)
workflow builds and publishes the frontend whenever a commit reaches `main`.
It can also be started manually from the repository's **Actions** tab.

The workflow builds the site for the domain root and includes the Pages CNAME
file so assets and client-side routes work when hosted at:

<https://eminwux.com/>

The repository's Pages source must be set to **GitHub Actions** under
**Settings > Pages**, with `eminwux.com` configured as the custom domain,
before the first deployment.
