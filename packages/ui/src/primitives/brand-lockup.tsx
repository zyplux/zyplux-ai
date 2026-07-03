import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type BrandLockupProps = { children: ReactNode; icon: LucideIcon };

export const BrandLockup = ({ children, icon }: BrandLockupProps) => {
  const Icon = icon;
  return (
    <>
      <Icon aria-hidden className='h-6 w-6 text-accent' />
      <span className='text-xl font-bold tracking-tight text-heading'>{children}</span>
    </>
  );
};
