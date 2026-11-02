import { describe, it } from './stories';

describe('app.renderCardPng', () => {
  it('1.1.1 renders a react node to a png at the requested width', async ({ app }) => {
    const card = app.createElement('div', { style: { color: '#ffffff' } }, 'Zyplux');
    const png = await app.renderCardPng(card, { height: app.CARD_HEIGHT, width: app.CARD_WIDTH });
    app.expectPng(png, app.CARD_WIDTH);
  });
});

describe('data uri helpers', () => {
  it('1.2.1 encodes an svg as a png data uri', ({ app }) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${app.TINY_SVG_SIZE}" height="${app.TINY_SVG_SIZE}"/>`;
    app.expectPngDataUri(app.pngDataUri(svg), app.TINY_SVG_SIZE);
  });

  it('1.2.2 draws the background grid at the requested size', ({ app }) => {
    const uri = app.gridDataUri({ height: app.GRID_HEIGHT, stroke: '#58a6ff', width: app.GRID_WIDTH });
    app.expectPngDataUri(uri, app.GRID_WIDTH);
  });
});
