import { PALETTE } from '@zyplux/ui/tokens';
import * as m from 'motion/react-m';

import { useDiagramPhase } from './use-diagram-phases';

const { accent, border, heading, muted, success, surface, warning } = PALETTE;

const HALF = 0.5;
const NODE_WIDTH = 96;
const NODE_HEIGHT = 40;
const NODE_HALF_WIDTH = NODE_WIDTH * HALF;
const NODE_HALF_HEIGHT = NODE_HEIGHT * HALF;
const NODE_STROKE_WIDTH = 1.5;
const SNAG_STROKE_WIDTH = 2;
const LABEL_BASELINE_OFFSET = 5;
const PULSE_SCALE = 1.06;
const DASH_TRAVEL_OFFSET = -96;
const SPOKE_STROKE_WIDTH = 2;
const RESOLVE_BADGE_RADIUS = 38;
const RESOLVE_RING_STROKE_WIDTH = 2;
const RIPPLE_PEAK_OPACITY = 0.4;
const RIPPLE_PEAK_SCALE = 1.55;
const CENTERED = { transformBox: 'fill-box', transformOrigin: 'center' } as const;

type DiagramNodeProps = {
  label: string;
  snag?: boolean | undefined;
  x: number;
  y: number;
};

export const DiagramNode = ({ label, snag = false, x, y }: DiagramNodeProps) => {
  const { resolved, still } = useDiagramPhase();
  const isPulsing = snag && !resolved && !still;
  return (
    <m.g
      animate={isPulsing ? { scale: [1, PULSE_SCALE, 1] } : { scale: 1 }}
      style={CENTERED}
      transition={isPulsing ? { duration: 1.6, ease: 'easeInOut', repeat: Infinity } : { duration: 0.3 }}
    >
      <m.rect
        animate={{ stroke: resolved ? success : snag ? warning : border }}
        fill={surface}
        height={NODE_HEIGHT}
        rx={10}
        strokeWidth={snag ? SNAG_STROKE_WIDTH : NODE_STROKE_WIDTH}
        transition={{ duration: 0.5 }}
        width={NODE_WIDTH}
        x={x - NODE_HALF_WIDTH}
        y={y - NODE_HALF_HEIGHT}
      />
      <text
        fill={snag ? heading : muted}
        fontSize={14}
        fontWeight={500}
        textAnchor='middle'
        x={x}
        y={y + LABEL_BASELINE_OFFSET}
      >
        {label}
      </text>
    </m.g>
  );
};

type LoopRingProps = { cx: number; cy: number; r: number };

export const LoopRing = ({ cx, cy, r }: LoopRingProps) => {
  const { drawn, resolved, still } = useDiagramPhase();
  return (
    <>
      <m.circle
        animate={{ pathLength: drawn ? 1 : 0, stroke: resolved ? success : accent }}
        cx={cx}
        cy={cy}
        fill='none'
        initial={{ pathLength: still ? 1 : 0 }}
        r={r}
        strokeWidth={2.5}
        style={{ opacity: 0.55 }}
        transition={{ pathLength: { duration: 1, ease: 'easeInOut' }, stroke: { duration: 0.6 } }}
      />
      <m.circle
        animate={resolved && !still ? { opacity: 1, strokeDashoffset: [0, DASH_TRAVEL_OFFSET] } : { opacity: 0 }}
        cx={cx}
        cy={cy}
        fill='none'
        initial={{ opacity: 0 }}
        r={r}
        stroke={success}
        strokeLinecap='round'
        strokeWidth={3}
        style={{ strokeDasharray: '2 22' }}
        transition={
          resolved && !still
            ? { opacity: { duration: 0.4 }, strokeDashoffset: { duration: 1.4, ease: 'linear', repeat: Infinity } }
            : { duration: 0.3 }
        }
      />
    </>
  );
};

type SpokeLineProps = { x1: number; x2: number; y1: number; y2: number };

export const SpokeLine = ({ x1, x2, y1, y2 }: SpokeLineProps) => {
  const { resolved, still } = useDiagramPhase();
  return (
    <m.line
      animate={resolved ? { opacity: 0.7, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
      initial={{ opacity: 0, pathLength: still ? 1 : 0 }}
      stroke={success}
      strokeWidth={SPOKE_STROKE_WIDTH}
      transition={{ duration: 0.5 }}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
    />
  );
};

type ResolveBadgeProps = { label: string; r?: number; x: number; y: number };

export const ResolveBadge = ({ label, r = RESOLVE_BADGE_RADIUS, x, y }: ResolveBadgeProps) => {
  const { resolved, still } = useDiagramPhase();
  return (
    <>
      <m.circle
        animate={
          resolved && !still
            ? { opacity: [RIPPLE_PEAK_OPACITY, 0, RIPPLE_PEAK_OPACITY], scale: [1, RIPPLE_PEAK_SCALE, 1] }
            : { opacity: 0 }
        }
        cx={x}
        cy={y}
        fill='none'
        initial={{ opacity: 0, scale: 1 }}
        r={r}
        stroke={success}
        strokeWidth={1.5}
        style={CENTERED}
        transition={resolved && !still ? { duration: 2.2, ease: 'easeInOut', repeat: Infinity } : { duration: 0.3 }}
      />
      <m.g
        animate={resolved ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 0 }}
        style={CENTERED}
        transition={{ damping: 16, stiffness: 220, type: 'spring' }}
      >
        <circle cx={x} cy={y} fill={surface} r={r} stroke={success} strokeWidth={RESOLVE_RING_STROKE_WIDTH} />
        <text fill={heading} fontSize={13} fontWeight={600} textAnchor='middle' x={x} y={y + LABEL_BASELINE_OFFSET}>
          {label}
        </text>
      </m.g>
    </>
  );
};

type PhaseCaptionProps = {
  pending: string;
  resolved: string;
  x: number;
  y: number;
};

export const PhaseCaption = ({ pending, resolved: resolvedLabel, x, y }: PhaseCaptionProps) => {
  const { resolved, still } = useDiagramPhase();
  return (
    <>
      <m.text
        animate={{ opacity: resolved ? 0 : 1 }}
        fill={warning}
        fontSize={12}
        fontWeight={600}
        initial={{ opacity: still ? 0 : 1 }}
        textAnchor='middle'
        transition={{ duration: 0.4 }}
        x={x}
        y={y}
      >
        {pending}
      </m.text>
      <m.text
        animate={{ opacity: resolved ? 1 : 0 }}
        fill={success}
        fontSize={12}
        fontWeight={600}
        initial={{ opacity: still ? 1 : 0 }}
        textAnchor='middle'
        transition={{ duration: 0.4 }}
        x={x}
        y={y}
      >
        {resolvedLabel}
      </m.text>
    </>
  );
};
