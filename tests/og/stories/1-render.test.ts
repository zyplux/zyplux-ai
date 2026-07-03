import { gridDataUri, pngDataUri, renderCardPng } from '@zyplux/og';
import { createElement } from 'react';
import { describe, expect, it } from 'vitest';

const PNG_SIGNATURE = Uint8Array.from('\u{89}PNG\r\n\u{1A}\n', character => character.codePointAt(0) ?? 0);
const PNG_WIDTH_OFFSET = 16;
const PNG_DATA_URI_PREFIX = 'data:image/png;base64,';

const CARD_WIDTH = 120;
const CARD_HEIGHT = 63;
const TINY_SVG_SIZE = 4;
const GRID_WIDTH = 40;
const GRID_HEIGHT = 30;

const pngWidth = ({ buffer, byteLength, byteOffset }: Uint8Array) =>
  new DataView(buffer, byteOffset, byteLength).getUint32(PNG_WIDTH_OFFSET);

const expectPng = (png: Uint8Array, width: number) => {
  expect(Uint8Array.from(png.subarray(0, PNG_SIGNATURE.length))).toEqual(PNG_SIGNATURE);
  expect(pngWidth(png)).toBe(width);
};

const expectPngDataUri = (uri: string, width: number) => {
  expect(uri.startsWith(PNG_DATA_URI_PREFIX)).toBe(true);
  expectPng(Uint8Array.fromBase64(uri.slice(PNG_DATA_URI_PREFIX.length)), width);
};

describe('renderCardPng', () => {
  it('1.1.1 renders a react node to a png at the requested width', async () => {
    const card = createElement('div', { style: { color: '#ffffff' } }, 'Zyplux');
    const png = await renderCardPng(card, { height: CARD_HEIGHT, width: CARD_WIDTH });
    expectPng(png, CARD_WIDTH);
  });
});

describe('data uri helpers', () => {
  it('1.2.1 encodes an svg as a png data uri', () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TINY_SVG_SIZE}" height="${TINY_SVG_SIZE}"/>`;
    expectPngDataUri(pngDataUri(svg), TINY_SVG_SIZE);
  });

  it('1.2.2 draws the background grid at the requested size', () => {
    const uri = gridDataUri({ height: GRID_HEIGHT, stroke: '#58a6ff', width: GRID_WIDTH });
    expectPngDataUri(uri, GRID_WIDTH);
  });
});
