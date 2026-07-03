import { useInView, useReducedMotion } from 'motion/react';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

export type DiagramPhases = { drawn: boolean; resolved: boolean; still: boolean };

export const DiagramPhaseContext = createContext<DiagramPhases | undefined>(undefined);

export const useDiagramPhase = () => {
  const phases = useContext(DiagramPhaseContext);
  if (!phases) {
    throw new Error('useDiagramPhase must be used inside a <Diagram>');
  }
  return phases;
};

type DiagramTiming = { resolveDelayMs: number };

export const useDiagramPhases = ({ resolveDelayMs }: DiagramTiming) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-80px', once: true });
  const prefersReducedMotion = useReducedMotion();
  const isStill = prefersReducedMotion === true;
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    if (isStill || !isInView) {
      return;
    }
    const timer = setTimeout(() => {
      setDelayDone(true);
    }, resolveDelayMs);
    return () => {
      clearTimeout(timer);
    };
  }, [isInView, resolveDelayMs, isStill]);

  return {
    drawn: isStill || isInView,
    ref,
    resolved: isStill || delayDone,
    still: isStill,
  };
};
