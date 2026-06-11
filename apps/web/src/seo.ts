import {
  BRAND_NAME,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  PAGES,
  SITE_URL,
  TAGLINE,
  THEME_COLOR,
} from '@zyplux/web/content';

export type MetaTag = { content: string; name?: string; property?: string } | { title: string };
export type Page = (typeof PAGES)[PageKey];
export type PageHead = { meta: MetaTag[] };
export type PageKey = keyof typeof PAGES;

const ogImageAlt = `${BRAND_NAME} — ${TAGLINE}`;
const ogImageUrl = `${SITE_URL}/og.png`;

export const postOgImagePath = (slug: string) => `/og/insights/${slug}.png`;

const head = (page: Page, image: { alt: string; url: string }) =>
  ({
    meta: [
      { title: page.title },
      { content: page.description, name: 'description' },
      { content: THEME_COLOR, name: 'theme-color' },
      { content: page.title, property: 'og:title' },
      { content: page.description, property: 'og:description' },
      { content: 'website', property: 'og:type' },
      { content: `${SITE_URL}${page.path}`, property: 'og:url' },
      { content: image.url, property: 'og:image' },
      { content: String(OG_IMAGE_WIDTH), property: 'og:image:width' },
      { content: String(OG_IMAGE_HEIGHT), property: 'og:image:height' },
      { content: image.alt, property: 'og:image:alt' },
      { content: 'summary_large_image', name: 'twitter:card' },
    ],
  }) satisfies PageHead;

export const pageHead = (page: Page) => head(page, { alt: ogImageAlt, url: ogImageUrl });

export const postHead = (post: { description: string; slug: string; title: string }) =>
  head(
    { description: post.description, path: `/insights/${post.slug}`, title: `${BRAND_NAME} — ${post.title}` },
    { alt: post.title, url: `${SITE_URL}${postOgImagePath(post.slug)}` },
  );
