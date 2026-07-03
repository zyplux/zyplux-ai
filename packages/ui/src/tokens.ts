export const PALETTE = {
  accent: '#58a6ff',
  background: '#0d1117',
  border: '#30363d',
  foreground: '#c9d1d9',
  grid: '#6e7681',
  heading: '#f0f6fc',
  muted: '#8b949e',
  success: '#3fb950',
  surface: '#161b22',
  violet: '#bc8cff',
  warning: '#d29922',
} as const;

export const TEXT_GRADIENT = `linear-gradient(120deg, ${PALETTE.heading} 25%, ${PALETTE.accent} 65%, ${PALETTE.violet} 95%)`;

const HEX_RADIX = 16;
const HEX_PAIR_LENGTH = 2;
const RED_OFFSET = 1;
const GREEN_OFFSET = 3;
const BLUE_OFFSET = 5;

export const toRgba = (hex: string, alpha: number) => {
  const channels = [RED_OFFSET, GREEN_OFFSET, BLUE_OFFSET].map(offset =>
    Number.parseInt(hex.slice(offset, offset + HEX_PAIR_LENGTH), HEX_RADIX),
  );
  return `rgba(${channels.join(',')},${String(alpha)})`;
};
