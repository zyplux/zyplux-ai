import type { MouseEvent, ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';

const trackSpotlight = ({ clientX, clientY, currentTarget }: MouseEvent<HTMLDivElement>) => {
  const bounds = currentTarget.getBoundingClientRect();
  currentTarget.style.setProperty('--spot-x', `${String(clientX - bounds.left)}px`);
  currentTarget.style.setProperty('--spot-y', `${String(clientY - bounds.top)}px`);
};

type SpotlightCardProps = { children: ReactNode };

export const SpotlightCard = ({ children }: SpotlightCardProps) => (
  <div
    className='group relative h-full overflow-hidden rounded-xl border border-border bg-surface p-8 transition-[border-color,box-shadow] duration-300 hover:border-accent/55 hover:shadow-glow'
    onMouseMove={trackSpotlight}
    style={{ backgroundImage: 'linear-gradient(180deg, var(--color-surface-sheen), transparent 40%)' }}
  >
    <div
      className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
      style={{
        background:
          'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), var(--color-accent-spotlight), transparent 65%)',
      }}
    />
    <div className='relative z-10'>{children}</div>
  </div>
);

type CardTitleProps = { children: ReactNode; className?: string };

export const CardTitle = ({ children, className }: CardTitleProps) => (
  <h3 className={cx('text-xl font-semibold text-heading mb-2', className)}>{children}</h3>
);
