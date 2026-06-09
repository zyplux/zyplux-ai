import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const ACCENT = '#58a6ff';
const SUCCESS = '#3fb950';
const WARNING = '#d29922';
const SURFACE = '#161b22';
const BORDER = '#30363d';
const HEADING = '#f0f6fc';
const MUTED = '#8b949e';

const NODE_HALF_WIDTH = 48;
const NODE_HALF_HEIGHT = 20;
const RESOLVE_DELAY_MS = 1800;
const CENTERED = { transformBox: 'fill-box', transformOrigin: 'center' } as const;

const NODES = [
  { label: 'Order', snag: false, x: 280, y: 50 },
  { label: 'Fulfil', snag: false, x: 430, y: 200 },
  { label: 'Invoice', snag: true, x: 280, y: 350 },
  { label: 'Cash', snag: false, x: 130, y: 200 },
];

const LoopNode = ({ node, resolved, still }: { node: (typeof NODES)[number]; resolved: boolean; still: boolean }) => {
  const pulsing = node.snag && !resolved && !still;
  return (
    <motion.g
      animate={pulsing ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      style={CENTERED}
      transition={pulsing ? { duration: 1.6, ease: 'easeInOut', repeat: Infinity } : { duration: 0.3 }}
    >
      <motion.rect
        animate={{ stroke: resolved ? SUCCESS : node.snag ? WARNING : BORDER }}
        fill={SURFACE}
        height={NODE_HALF_HEIGHT * 2}
        rx={10}
        strokeWidth={node.snag ? 2 : 1.5}
        transition={{ duration: 0.5 }}
        width={NODE_HALF_WIDTH * 2}
        x={node.x - NODE_HALF_WIDTH}
        y={node.y - NODE_HALF_HEIGHT}
      />
      <text
        fill={node.snag ? HEADING : MUTED}
        fontSize={14}
        fontWeight={500}
        textAnchor='middle'
        x={node.x}
        y={node.y + 5}
      >
        {node.label}
      </text>
    </motion.g>
  );
};

export const SystemMap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-80px', once: true });
  const prefersReducedMotion = useReducedMotion();
  const still = prefersReducedMotion === true;
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    if (still || !isInView) {
      return;
    }
    const timer = setTimeout(() => {
      setDelayDone(true);
    }, RESOLVE_DELAY_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [isInView, still]);

  const resolved = still || delayDone;
  const drawn = still || isInView;

  return (
    <figure className='mx-auto mt-16 mb-4 max-w-2xl' ref={ref}>
      <svg aria-hidden className='h-auto w-full' role='img' viewBox='0 0 560 400' xmlns='http://www.w3.org/2000/svg'>
        <motion.circle
          animate={{ pathLength: drawn ? 1 : 0, stroke: resolved ? SUCCESS : ACCENT }}
          cx={280}
          cy={200}
          fill='none'
          initial={{ pathLength: still ? 1 : 0 }}
          r={150}
          strokeWidth={2.5}
          style={{ opacity: 0.55 }}
          transition={{ pathLength: { duration: 1, ease: 'easeInOut' }, stroke: { duration: 0.6 } }}
        />

        <motion.circle
          animate={resolved && !still ? { opacity: 1, strokeDashoffset: [0, -96] } : { opacity: 0 }}
          cx={280}
          cy={200}
          fill='none'
          initial={{ opacity: 0 }}
          r={150}
          stroke={SUCCESS}
          strokeLinecap='round'
          strokeWidth={3}
          style={{ strokeDasharray: '2 22' }}
          transition={
            resolved && !still
              ? { opacity: { duration: 0.4 }, strokeDashoffset: { duration: 1.4, ease: 'linear', repeat: Infinity } }
              : { duration: 0.3 }
          }
        />

        <motion.line
          animate={resolved ? { opacity: 0.7, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
          initial={{ opacity: 0, pathLength: still ? 1 : 0 }}
          stroke={SUCCESS}
          strokeWidth={2}
          transition={{ duration: 0.5 }}
          x1={280}
          x2={280}
          y1={200}
          y2={350}
        />

        <motion.circle
          animate={resolved && !still ? { opacity: [0.4, 0, 0.4], scale: [1, 1.55, 1] } : { opacity: 0 }}
          cx={280}
          cy={200}
          fill='none'
          initial={{ opacity: 0, scale: 1 }}
          r={38}
          stroke={SUCCESS}
          strokeWidth={1.5}
          style={CENTERED}
          transition={resolved && !still ? { duration: 2.2, ease: 'easeInOut', repeat: Infinity } : { duration: 0.3 }}
        />

        {NODES.map(node => (
          <LoopNode key={node.label} node={node} resolved={resolved} still={still} />
        ))}

        <motion.text
          animate={{ opacity: resolved ? 0 : 1 }}
          fill={WARNING}
          fontSize={12}
          fontWeight={600}
          initial={{ opacity: still ? 0 : 1 }}
          textAnchor='middle'
          transition={{ duration: 0.4 }}
          x={280}
          y={392}
        >
          by hand
        </motion.text>
        <motion.text
          animate={{ opacity: resolved ? 1 : 0 }}
          fill={SUCCESS}
          fontSize={12}
          fontWeight={600}
          initial={{ opacity: still ? 1 : 0 }}
          textAnchor='middle'
          transition={{ duration: 0.4 }}
          x={280}
          y={392}
        >
          runs itself
        </motion.text>

        <motion.g
          animate={resolved ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          initial={{ opacity: still ? 1 : 0, scale: still ? 1 : 0 }}
          style={CENTERED}
          transition={{ damping: 16, stiffness: 220, type: 'spring' }}
        >
          <circle cx={280} cy={200} fill={SURFACE} r={38} stroke={SUCCESS} strokeWidth={2} />
          <text fill={HEADING} fontSize={13} fontWeight={600} textAnchor='middle' x={280} y={205}>
            Zyplux
          </text>
        </motion.g>
      </svg>

      <figcaption className='mt-2 text-center text-sm text-muted'>
        When a step is done by hand, the loop snags. Put Zyplux in the loop and it runs end to end — and anything that
        leaves the building still waits for your approval.
      </figcaption>
    </figure>
  );
};
