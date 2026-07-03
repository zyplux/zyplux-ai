import { pngDataUri } from './render';

const gridCell = (stroke: string, cellPx: number, opacity: number) =>
  `<pattern id="cell${cellPx}" width="${cellPx}" height="${cellPx}" patternUnits="userSpaceOnUse">` +
  `<path d="M${cellPx} 0H0V${cellPx}" fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1"/></pattern>`;

const FINE_CELL_PX = 36;
const FINE_CELL_OPACITY = 0.14;
const COARSE_CELL_PX = 180;
const COARSE_CELL_OPACITY = 0.2;

type GridSpec = { height: number; stroke: string; width: number };

export const gridDataUri = ({ height, stroke, width }: GridSpec) =>
  pngDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs>` +
      gridCell(stroke, FINE_CELL_PX, FINE_CELL_OPACITY) +
      gridCell(stroke, COARSE_CELL_PX, COARSE_CELL_OPACITY) +
      `<radialGradient id="fade" cx="50%" cy="0%" fx="50%" fy="0%" r="95%">` +
      `<stop offset="25%" stop-color="#fff"/><stop offset="78%" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
      `<mask id="fadeMask"><rect width="${width}" height="${height}" fill="url(#fade)"/></mask></defs>` +
      `<g mask="url(#fadeMask)"><rect width="${width}" height="${height}" fill="url(#cell36)"/>` +
      `<rect width="${width}" height="${height}" fill="url(#cell180)"/></g></svg>`,
  );
