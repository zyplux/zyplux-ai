import { test } from './stories';

test('2.1.1 the home page head carries the brand and its title', async ({ app }) => {
  await app.expectSeoShows(
    app.seoHarness('home', app.PAGE_META.home, '/'),
    app.brandAndTitle(app.PAGE_META.home.title),
  );
});

test('2.1.2 the agent page head carries the brand and its title', async ({ app }) => {
  await app.expectSeoShows(
    app.seoHarness('agent', app.PAGE_META.agent, '/agent'),
    app.brandAndTitle(app.PAGE_META.agent.title),
  );
});

test('2.1.3 the insights page head carries the brand and its title', async ({ app }) => {
  await app.expectSeoShows(
    app.seoHarness('insights', app.PAGE_META.insights, '/insights'),
    app.brandAndTitle(app.PAGE_META.insights.title),
  );
});

test('2.1.4 the privacy page head carries the brand and its title', async ({ app }) => {
  await app.expectSeoShows(
    app.seoHarness('privacy', app.PAGE_META.privacy, '/privacy'),
    app.brandAndTitle(app.PAGE_META.privacy.title),
  );
});

test('2.2.1 the home page declares the share-card image and dimensions', async ({ app }) => {
  await app.expectSeoShows(app.seoHarness('home', app.PAGE_META.home, '/'), app.SHARE_CARD);
});

test('2.2.2 the agent page declares the share-card image and dimensions', async ({ app }) => {
  await app.expectSeoShows(app.seoHarness('agent', app.PAGE_META.agent, '/agent'), app.SHARE_CARD);
});

test('2.2.3 the insights page declares the share-card image and dimensions', async ({ app }) => {
  await app.expectSeoShows(app.seoHarness('insights', app.PAGE_META.insights, '/insights'), app.SHARE_CARD);
});

test('2.2.4 the privacy page declares the share-card image and dimensions', async ({ app }) => {
  await app.expectSeoShows(app.seoHarness('privacy', app.PAGE_META.privacy, '/privacy'), app.SHARE_CARD);
});
