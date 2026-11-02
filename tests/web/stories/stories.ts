import { test as base, vi } from 'vitest';

import type { Harness } from '@/stories/harness';

import {
  BRAND_NAME,
  BRAND_POSITIONING,
  BUILD_BUCKET_TITLES,
  BUILD_HEADING,
  METHOD_HEADING,
  PAGE_META,
  SKIP_LINK_LABEL,
} from '@/fixtures/content';
import { routerHarness } from '@/web/harness';
import { seoHarness } from '@/web/seo-harness';
const expectPageShows = async (path: string, copies: string[]) => {
  const scene = await routerHarness(path).open();
  try {
    for (const copy of copies) {
      scene.assert.shows(copy);
    }
  } finally {
    scene.dispose();
  }
};

const expectSeoShows = async (harness: Harness, copies: string[]) => {
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

const expectReducedPageShows = async (path: string, copies: string[]) => {
  const mediaQuery = globalThis.matchMedia('(prefers-reduced-motion)');
  const isReducedMotion = vi.spyOn(mediaQuery, 'matches', 'get').mockReturnValue(true);
  const matchMedia = vi.spyOn(globalThis, 'matchMedia').mockReturnValue(mediaQuery);
  try {
    await expectPageShows(path, copies);
  } finally {
    isReducedMotion.mockRestore();
    matchMedia.mockRestore();
  }
};

const app = {
  BRAND_NAME,
  BRAND_POSITIONING,
  brandAndTitle,
  BUILD_BUCKET_TITLES,
  BUILD_HEADING,
  expectPageShows,
  expectReducedPageShows,
  expectSeoShows,
  METHOD_HEADING,
  PAGE_META,
  seoHarness,
  SHARE_CARD,
  SKIP_LINK_LABEL,
};

export const test = base.extend<{ app: typeof app }>({
  app: async ({}, provide) => {
    await provide(app);
  },
});
