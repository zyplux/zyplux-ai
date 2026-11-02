import { cloudflare } from '@cloudflare/vite-plugin';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { MDX_OPTIONS } from '@zyplux/mdx';
import { defineConfig } from 'vite';

import { insightsFrontmatterPlugin } from './og/insights-frontmatter-plugin.ts';
import { ogImagePlugin } from './og/og-image-plugin.tsx';
import { SITE_URL } from './src/config.ts';

export default defineConfig({
  build: {
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
  },
  plugins: [
    { enforce: 'pre', ...mdx(MDX_OPTIONS) },
    insightsFrontmatterPlugin(),
    tailwindcss(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart({
      prerender: { crawlLinks: true, enabled: true, failOnError: true },
      sitemap: { host: SITE_URL },
    }),
    react({ include: /\.(jsx?|tsx?|mdx)$/ }),
    ogImagePlugin(),
  ],
  // Prerender boots `vite preview` and crawls its own `resolvedUrls.local` over
  // HTTP. On `localhost` (both 127.0.0.1 and ::1 in CI's /etc/hosts) the bind and
  // the fetch can pick different families -> ConnectionRefused. Pin one address.
  preview: { host: '127.0.0.1' },
  resolve: { tsconfigPaths: true },
});
