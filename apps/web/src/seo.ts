import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, postOgImagePath, SITE_URL, THEME_COLOR } from '@/config';
import { BRAND_NAME, TAGLINE } from '@/site';

export type MetaTag = { content: string; name?: string; property?: string } | { title: string };
export type PageHead = { meta: MetaTag[] };
export type PageMeta = { description: string; title: string };

const ogImageAlt = `${BRAND_NAME} — ${TAGLINE}`;
const ogImageUrl = `${SITE_URL}/og.png`;

type OgImageRef = { alt: string; url: string };

const head = ({ description, title }: PageMeta, path: string, { alt, url }: OgImageRef) =>
  ({
    meta: [
      { title: title },
      { content: description, name: 'description' },
      { content: THEME_COLOR, name: 'theme-color' },
      { content: title, property: 'og:title' },
      { content: description, property: 'og:description' },
      { content: 'website', property: 'og:type' },
      { content: `${SITE_URL}${path}`, property: 'og:url' },
      { content: url, property: 'og:image' },
      { content: String(OG_IMAGE_WIDTH), property: 'og:image:width' },
      { content: String(OG_IMAGE_HEIGHT), property: 'og:image:height' },
      { content: alt, property: 'og:image:alt' },
      { content: 'summary_large_image', name: 'twitter:card' },
    ],
  }) satisfies PageHead;

export const pageHead = (page: PageMeta, path: string) => head(page, path, { alt: ogImageAlt, url: ogImageUrl });

type PostMeta = { description: string; slug: string; title: string };

export const postHead = ({ description, slug, title }: PostMeta) =>
  head({ description: description, title: `${BRAND_NAME} — ${title}` }, `/insights/${slug}`, {
    alt: title,
    url: `${SITE_URL}${postOgImagePath(slug)}`,
  });
