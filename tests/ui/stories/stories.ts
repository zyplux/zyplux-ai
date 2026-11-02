import { test as base } from 'vitest';

import { app } from './fixtures';

export const it = base.extend<{ app: typeof app }>({
  app: async ({}, provide) => {
    await provide(app);
  },
});
export { describe, expect } from 'vitest';
