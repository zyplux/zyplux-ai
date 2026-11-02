import { describe, expect, it } from './stories';

describe('css tokens', () => {
  it('2.1.1 keeps the palette in sync with the theme.css tokens', async ({ app }) => {
    const themeCss = await app.readCss('theme.css');
    for (const tokenValue of Object.values(app.PALETTE)) {
      expect(themeCss).toContain(tokenValue);
    }
  });

  it('2.1.2 keeps the text gradient in sync with the text-gradient utility in base.css', async ({ app }) => {
    const baseCss = await app.readCss('base.css');
    let cssVarGradient = app.TEXT_GRADIENT;
    for (const [tokenName, hex] of Object.entries(app.PALETTE)) {
      cssVarGradient = cssVarGradient.replaceAll(hex, () => `var(--color-${tokenName})`);
    }
    expect(baseCss).toContain(cssVarGradient);
  });
});

const ACCENT_TINT_ALPHA = 0.16;

describe('app.toRgba', () => {
  it('2.2.1 converts a hex color and alpha to an rgba() string', ({ app }) => {
    expect(app.toRgba('#58a6ff', ACCENT_TINT_ALPHA)).toBe('rgba(88,166,255,0.16)');
  });
});
