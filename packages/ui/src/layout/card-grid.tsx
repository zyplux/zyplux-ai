import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';
import { Reveal, REVEAL_STAGGER_S } from '@zyplux/ui/motion';
import { isValidElement } from 'react';
import flattenChildren from 'react-keyed-flatten-children';

type CardGridProps = { children: ReactNode; className?: string };

export const CardGrid = ({ children, className }: CardGridProps) => (
  <div className={cx('grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-5xl', className)}>
    {flattenChildren(children).map((child, index) =>
      isValidElement(child) ? (
        <Reveal delay={index * REVEAL_STAGGER_S} key={child.key}>
          {child}
        </Reveal>
      ) : (
        child
      ),
    )}
  </div>
);
