import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const DEFAULT_TYPE_INTERVAL_MS = 38;

type TypewriterOptions = { intervalMs?: number; play?: boolean };

export const useTypewriter = (
  text: string,
  { intervalMs = DEFAULT_TYPE_INTERVAL_MS, play = true }: TypewriterOptions = {},
) => {
  const prefersReducedMotion = useReducedMotion();
  const isStill = prefersReducedMotion === true;
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (isStill || !play) {
      return;
    }
    let count = 0;
    const id = setInterval(() => {
      count += 1;
      setTyped(count);
      if (count >= text.length) {
        clearInterval(id);
      }
    }, intervalMs);
    return () => {
      clearInterval(id);
    };
  }, [intervalMs, play, isStill, text.length]);

  const typedCount = isStill ? text.length : typed;
  return { revealed: typedCount >= text.length, typedText: text.slice(0, typedCount) };
};
