import { writeFileSync } from 'node:fs';
import path from 'node:path';

import { renderOgPng } from '@/og/og-image-plugin';

const repoRoot = path.resolve(import.meta.dir, '../../..');
const OG_OUTPUT_ARG_INDEX = 2;
const outPath = process.argv[OG_OUTPUT_ARG_INDEX] ?? 'og-preview.png';
writeFileSync(outPath, await renderOgPng());
const printedPath = path.relative(repoRoot, path.resolve(outPath));
process.stdout.write(`Rendered og:image → ${printedPath}\n`);
