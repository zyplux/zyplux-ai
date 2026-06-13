import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import { MDX_OPTIONS } from '@zyplux/mdx';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [{ enforce: 'pre', ...mdx(MDX_OPTIONS) }, react({ include: /\.(jsx?|tsx?|mdx)$/ })],
  resolve: { tsconfigPaths: true },
  test: {
    setupFiles: ['./src/web/happydom.ts'],
  },
});
