import { test } from './stories';

test('3.1.1 retains the home page content with reduced motion', async ({ app }) => {
  await app.expectReducedPageShows('/', [app.BRAND_NAME, app.BRAND_POSITIONING, app.METHOD_HEADING]);
});

test('3.1.2 shows the insights signup before articles are published', async ({ app }) => {
  await app.expectPageShows('/insights', ['How agents actually work', 'Send me the first one']);
});
