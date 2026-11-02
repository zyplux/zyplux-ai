import { test } from './stories';

test('1.1.1 shows the brand and hero copy', async ({ app }) => {
  await app.expectPageShows('/', [app.BRAND_NAME, app.BRAND_POSITIONING]);
});

test('1.1.2 offers a skip link to main content', async ({ app }) => {
  await app.expectPageShows('/', [app.SKIP_LINK_LABEL]);
});

test('1.1.3 opens with the systems-thinking method', async ({ app }) => {
  await app.expectPageShows('/', [app.METHOD_HEADING]);
});

test('1.1.4 shows the three places intelligence pays back', async ({ app }) => {
  await app.expectPageShows('/', [app.BUILD_HEADING, ...app.BUILD_BUCKET_TITLES]);
});

test('1.2.1 the privacy page shows its body copy from the content pipeline', async ({ app }) => {
  await app.expectPageShows('/privacy', [
    'Privacy, plainly.',
    'What we collect.',
    'Zyplux is based in Sydney, Australia.',
  ]);
});

test('1.2.2 the agent page shows its body copy from the content pipeline', async ({ app }) => {
  await app.expectPageShows('/agent', ['The agent, live.', 'We’re polishing the showcase.']);
});
