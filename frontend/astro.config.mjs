// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://eminwux.com',
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [
    react(),
    mdx(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
  build: {
    format: 'directory',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: ['.preview.emergentagent.com', '.preview.emergentcf.cloud', '.emergent.host', 'localhost'],
      hmr: { clientPort: 443 },
    },
    preview: {
      allowedHosts: true,
    },
    build: {
      rollupOptions: {
        external: [/^\/_pagefind\/.*/],
      },
    },
  },
});
