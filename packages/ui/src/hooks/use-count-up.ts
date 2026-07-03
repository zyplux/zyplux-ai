import { animate, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const DEFAULT_COUNT_UP_DURATION_S = 0.9;

type CountUpOptions = { duration?: number; play?: boolean };

export const useCountUp = (
  target: number,
  { duration = DEFAULT_COUNT_UP_DURATION_S, play = true }: CountUpOptions = {},
) => {
  const prefersReducedMotion = useReducedMotion();
  const isStill = prefersReducedMotion === true;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isStill || !play) {
      return;
    }
    const controls = animate(0, target, {
      duration,
      onUpdate: value => {
        setCount(Math.round(value));
      },
    });
    return () => {
      controls.stop();
    };
  }, [duration, play, isStill, target]);

  return isStill ? target : count;
};
