import { test } from 'bun:test';

import { BRAND_NAME, HERO_BADGE, SKIP_LINK_LABEL } from '@/fixtures/content';

import type { Harness } from './harness';

const registerLandingScenarios = (harness: Harness) => {
  test('shows the brand and hero copy', async () => {
    const scene = await harness.open();
    scene.assert.shows(BRAND_NAME);
    scene.assert.shows(HERO_BADGE);
    scene.dispose();
  });

  test('offers a skip link to main content', async () => {
    const scene = await harness.open();
    scene.assert.shows(SKIP_LINK_LABEL);
    scene.dispose();
  });
};

export default registerLandingScenarios;
