import { gridDataUri, pngDataUri, renderCardPng } from '@zyplux/og';
import { createElement } from 'react';
import { expect } from 'vitest';
import { test as base } from 'vitest';

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

const app = {
  CARD_HEIGHT,
  CARD_WIDTH,
  createElement,
  expectPng,
  expectPngDataUri,
  GRID_HEIGHT,
  GRID_WIDTH,
  gridDataUri,
  pngDataUri,
  renderCardPng,
  TINY_SVG_SIZE,
};

export const it = base.extend<{ app: typeof app }>({
  app: async ({}, provide) => {
    await provide(app);
  },
});
export { describe } from 'vitest';
