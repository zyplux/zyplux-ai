import type { ReactNode } from 'react';

import { CardTitle, SpotlightCard } from './spotlight-card';
import { StepBadge } from './step-badge';

type StepCardProps = { children: ReactNode; step: ReactNode; title: ReactNode };

export const StepCard = ({ children, step, title }: StepCardProps) => (
  <SpotlightCard>
    <StepBadge className='mb-6'>{step}</StepBadge>
    <CardTitle className='mb-3'>{title}</CardTitle>
    <div className='text-muted'>{children}</div>
  </SpotlightCard>
);
