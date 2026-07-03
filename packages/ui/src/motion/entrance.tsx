import type { ReactNode } from 'react';

import * as m from 'motion/react-m';

const DEFAULT_RISE_PX = 20;

type EntranceProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: number;
  y?: number;
};

export const Entrance = ({ children, className, delay = 0, scale = 1, y = DEFAULT_RISE_PX }: EntranceProps) => (
  <m.div
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className={className}
    initial={{ opacity: 0, scale, y }}
    transition={{ delay, duration: 0.8 }}
  >
    {children}
  </m.div>
);
