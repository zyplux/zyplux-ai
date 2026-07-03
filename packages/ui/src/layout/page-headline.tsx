import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';
import { heading } from '@zyplux/ui/recipes';

type PageHeadlineProps = { children: ReactNode; className?: string };

export const PageHeadline = ({ children, className }: PageHeadlineProps) => (
  <h1 className={heading({ class: cx('mb-8', className) })}>
    <span className='text-gradient'>{children}</span>
  </h1>
);
