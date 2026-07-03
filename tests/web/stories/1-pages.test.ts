import { test } from 'vitest';

import {
  BRAND_NAME,
  BRAND_POSITIONING,
  BUILD_BUCKET_TITLES,
  BUILD_HEADING,
  METHOD_HEADING,
  SKIP_LINK_LABEL,
} from '@/fixtures/content';
import { routerHarness } from '@/web/harness';

const expectShows = async (path: string, copies: string[]) => {
  const scene = await routerHarness(path).open();
  try {
    for (const copy of copies) {
      scene.assert.shows(copy);
    }
  } finally {
    scene.dispose();
  }
};

test('1.1.1 shows the brand and hero copy', async () => {
  await expectShows('/', [BRAND_NAME, BRAND_POSITIONING]);
});

test('1.1.2 offers a skip link to main content', async () => {
  await expectShows('/', [SKIP_LINK_LABEL]);
});

test('1.1.3 opens with the systems-thinking method', async () => {
  await expectShows('/', [METHOD_HEADING]);
});

test('1.1.4 shows the three places intelligence pays back', async () => {
  await expectShows('/', [BUILD_HEADING, ...BUILD_BUCKET_TITLES]);
});

test('1.2.1 the privacy page shows its body copy from the content pipeline', async () => {
  await expectShows('/privacy', ['Privacy, plainly.', 'What we collect.', 'Zyplux is based in Sydney, Australia.']);
});

test('1.2.2 the agent page shows its body copy from the content pipeline', async () => {
  await expectShows('/agent', ['The agent, live.', 'We’re polishing the showcase.']);
});
