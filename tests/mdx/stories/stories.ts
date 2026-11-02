import { compile } from '@mdx-js/mdx';
import { MDX_OPTIONS } from '@zyplux/mdx';
import { insightsFrontmatterPlugin } from '@zyplux/web/insights-frontmatter-plugin';
import { createServer } from 'vite';
import { vi } from 'vitest';
import { test as base } from 'vitest';

const compileMdx = async (source: string) => String(await compile(source, MDX_OPTIONS));

const sectionsDoc = (body: string) => `---
sections: true
---

${body}
`;

const openFrontmatterPlugin = async () => {
  const plugin = insightsFrontmatterPlugin();
  const server = await createServer({ configFile: false, plugins: [plugin] });
  await server.environments.client.transformRequest('virtual:insights-frontmatter');
  const send = vi.spyOn(server.ws, 'send');
  const update = async (file: string, source: string) =>
    plugin.handleHotUpdate.call(
      {
        debug: vi.fn(),
        error: () => {
          throw new Error('Vite plugin failed');
        },
        info: vi.fn(),
        meta: { rolldownVersion: '1', rollupVersion: '4', viteVersion: '8', watchMode: true },
        warn: vi.fn(),
      },
      { file, modules: [], read: () => Promise.resolve(source), server, timestamp: Date.now() },
    );
  return { close: () => server.close(), send, update };
};

const app = {
  compileMdx,
  INVALID_METADATA_RELOAD_COUNT: 3,
  METADATA_EDIT_RELOAD_COUNT: 2,
  openFrontmatterPlugin,
  sectionsDoc,
};

export const it = base.extend<{ app: typeof app }>({
  app: async ({}, provide) => {
    await provide(app);
  },
});
export { describe, expect } from 'vitest';
