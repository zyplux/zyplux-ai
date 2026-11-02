import { renderOgPng } from '@zyplux/web/og-image-plugin';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '../../..');
const OG_OUTPUT_ARG_INDEX = 2;
const outPath = process.argv[OG_OUTPUT_ARG_INDEX] ?? 'og-preview.png';
writeFileSync(outPath, await renderOgPng());
const printedPath = path.relative(repoRoot, path.resolve(outPath));
process.stdout.write(`Rendered og:image → ${printedPath}\n`);
