import type { ReactNode } from 'react';

import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';

type MotionProviderProps = { children: ReactNode };

export const MotionProvider = ({ children }: MotionProviderProps) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion='user'>{children}</MotionConfig>
  </LazyMotion>
);
