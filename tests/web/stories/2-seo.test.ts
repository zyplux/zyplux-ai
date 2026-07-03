import { test } from 'vitest';

import type { Harness } from '@/stories/harness';

import { BRAND_NAME, PAGE_META } from '@/fixtures/content';
import { seoHarness } from '@/web/seo-harness';

const expectShows = async (harness: Harness, copies: string[]) => {
  const scene = await harness.open();
  try {
    for (const copy of copies) {
      scene.assert.shows(copy);
    }
  } finally {
    scene.dispose();
  }
};

const brandAndTitle = (title: string) => [BRAND_NAME, title];
const SHARE_CARD = ['/og.png', '1200', '630'];

test('2.1.1 the home page head carries the brand and its title', async () => {
  await expectShows(seoHarness('home', PAGE_META.home, '/'), brandAndTitle(PAGE_META.home.title));
});

test('2.1.2 the agent page head carries the brand and its title', async () => {
  await expectShows(seoHarness('agent', PAGE_META.agent, '/agent'), brandAndTitle(PAGE_META.agent.title));
});

test('2.1.3 the insights page head carries the brand and its title', async () => {
  await expectShows(seoHarness('insights', PAGE_META.insights, '/insights'), brandAndTitle(PAGE_META.insights.title));
});

test('2.1.4 the privacy page head carries the brand and its title', async () => {
  await expectShows(seoHarness('privacy', PAGE_META.privacy, '/privacy'), brandAndTitle(PAGE_META.privacy.title));
});

test('2.2.1 the home page declares the share-card image and dimensions', async () => {
  await expectShows(seoHarness('home', PAGE_META.home, '/'), SHARE_CARD);
});

test('2.2.2 the agent page declares the share-card image and dimensions', async () => {
  await expectShows(seoHarness('agent', PAGE_META.agent, '/agent'), SHARE_CARD);
});

test('2.2.3 the insights page declares the share-card image and dimensions', async () => {
  await expectShows(seoHarness('insights', PAGE_META.insights, '/insights'), SHARE_CARD);
});

test('2.2.4 the privacy page declares the share-card image and dimensions', async () => {
  await expectShows(seoHarness('privacy', PAGE_META.privacy, '/privacy'), SHARE_CARD);
});
