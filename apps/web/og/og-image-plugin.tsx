import type { CSSProperties, ReactNode } from 'react';
import type { Plugin } from 'vite';

import { gridDataUri, pngDataUri, renderCardPng } from '@zyplux/og';
import { PALETTE, TEXT_GRADIENT, toRgba } from '@zyplux/ui/tokens';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, postOgImagePath, SITE_URL } from '@zyplux/web/config';
import { BRAND_NAME, BRAND_POSITIONING, TAGLINE } from '@zyplux/web/site';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { readPostCards } from './posts';

const OG_FILE_NAME = 'og.png';
const OG_SIZE = { height: OG_IMAGE_HEIGHT, width: OG_IMAGE_WIDTH };
const SITE_DOMAIN = new URL(SITE_URL).hostname;

const BOLT_SVG =
  `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="${PALETTE.accent}">` +
  '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
const boltDataUri = pngDataUri(BOLT_SVG);

const backgroundGridUri = gridDataUri({ ...OG_SIZE, stroke: PALETTE.grid });

const ACCENT_GLOW_ALPHA = 0.16;
const VIOLET_GLOW_ALPHA = 0.12;
const PILL_FILL_ALPHA = 0.1;
const PILL_BORDER_ALPHA = 0.3;

const GRADIENT_TEXT = {
  backgroundClip: 'text',
  backgroundImage: TEXT_GRADIENT,
  color: 'transparent',
} satisfies CSSProperties;

type CardShellProps = { children: ReactNode; style: CSSProperties };

const CardShell = ({ children, style }: CardShellProps) => (
  <div
    style={{
      backgroundColor: PALETTE.background,
      backgroundImage:
        `radial-gradient(ellipse 90% 60% at 50% -10%, ${toRgba(PALETTE.accent, ACCENT_GLOW_ALPHA)}, transparent 70%),` +
        `radial-gradient(ellipse 60% 40% at 85% 0%, ${toRgba(PALETTE.violet, VIOLET_GLOW_ALPHA)}, transparent 70%)`,
      display: 'flex',
      fontFamily: 'Inter',
      height: OG_IMAGE_HEIGHT,
      justifyContent: 'center',
      position: 'relative',
      width: OG_IMAGE_WIDTH,
      ...style,
    }}
  >
    <img
      alt=''
      height={OG_IMAGE_HEIGHT}
      src={backgroundGridUri}
      style={{ inset: 0, position: 'absolute' }}
      width={OG_IMAGE_WIDTH}
    />
    {children}
    <div
      style={{
        bottom: 38,
        color: PALETTE.muted,
        display: 'flex',
        fontSize: 25,
        fontWeight: 500,
        justifyContent: 'center',
        position: 'absolute',
        width: OG_IMAGE_WIDTH,
      }}
    >
      {SITE_DOMAIN}
    </div>
  </div>
);

const brandCard = (
  <CardShell style={{ alignItems: 'center' }}>
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div
        style={{
          alignItems: 'center',
          backgroundColor: toRgba(PALETTE.accent, PILL_FILL_ALPHA),
          border: `1px solid ${toRgba(PALETTE.accent, PILL_BORDER_ALPHA)}`,
          borderRadius: 999,
          color: PALETTE.accent,
          display: 'flex',
          fontSize: 23,
          fontWeight: 500,
          marginBottom: 44,
          padding: '12px 26px',
        }}
      >
        {BRAND_POSITIONING}
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: 24, marginBottom: 32 }}>
        <img alt='' height={96} src={boltDataUri} style={{ marginTop: 10 }} width={96} />
        <div style={{ ...GRADIENT_TEXT, fontSize: 148, fontWeight: 800, letterSpacing: '-0.04em', paddingRight: 8 }}>
          {BRAND_NAME}
        </div>
      </div>
      <div style={{ color: PALETTE.heading, fontSize: 46, fontWeight: 600, letterSpacing: '-0.01em' }}>{TAGLINE}</div>
    </div>
  </CardShell>
);

const postCard = (title: string, description: string) => (
  <CardShell style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 80px', position: 'relative' }}>
      <div style={{ alignItems: 'center', display: 'flex', gap: 14, marginBottom: 48 }}>
        <img alt='' height={44} src={boltDataUri} width={44} />
        <div style={{ color: PALETTE.heading, fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em' }}>
          {BRAND_NAME}
        </div>
      </div>
      <div
        style={{
          ...GRADIENT_TEXT,
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: 28,
        }}
      >
        {title}
      </div>
      <div style={{ color: PALETTE.muted, fontSize: 30, fontWeight: 500, lineHeight: 1.4 }}>{description}</div>
    </div>
  </CardShell>
);

export const ogImagePlugin = () => {
  let cached: Buffer | undefined;
  const render = async () => (cached ??= await renderOgPng());

  return {
    applyToEnvironment: environment => environment.name === 'client',
    configureServer: server => {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?', 1)[0] !== `/${OG_FILE_NAME}`) {
          next();
          return;
        }
        const respond = async () => {
          try {
            const png = await render();
            res.setHeader('Content-Type', 'image/png');
            res.end(png);
          } catch (error) {
            next(error);
          }
        };
        void respond();
      });
    },
    name: 'zyplux:og-image',
    writeBundle: async options => {
      if (!options.dir) return;
      await writeFile(path.join(options.dir, OG_FILE_NAME), await render());
      const posts = await readPostCards();
      for (const post of posts) {
        const imagePath = path.join(options.dir, postOgImagePath(post.slug));
        await mkdir(path.dirname(imagePath), { recursive: true });
        await writeFile(imagePath, await renderCardPng(postCard(post.title, post.description), OG_SIZE));
      }
    },
  } satisfies Plugin;
};

export const renderOgPng = () => renderCardPng(brandCard, OG_SIZE);
