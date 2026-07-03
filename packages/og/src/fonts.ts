import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { type SatoriOptions } from 'satori';

const require = createRequire(import.meta.url);
const interFilesDir = path.join(path.dirname(require.resolve('@fontsource/inter/package.json')), 'files');
const readInterWeight = (weight: number) => readFileSync(path.join(interFilesDir, `inter-latin-${weight}-normal.woff`));

const FONT_WEIGHT_MEDIUM = 500;
const FONT_WEIGHT_SEMIBOLD = 600;
const FONT_WEIGHT_EXTRABOLD = 800;

export const INTER_FONTS: SatoriOptions['fonts'] = [
  { data: readInterWeight(FONT_WEIGHT_MEDIUM), name: 'Inter', style: 'normal', weight: FONT_WEIGHT_MEDIUM },
  { data: readInterWeight(FONT_WEIGHT_SEMIBOLD), name: 'Inter', style: 'normal', weight: FONT_WEIGHT_SEMIBOLD },
  { data: readInterWeight(FONT_WEIGHT_EXTRABOLD), name: 'Inter', style: 'normal', weight: FONT_WEIGHT_EXTRABOLD },
];
