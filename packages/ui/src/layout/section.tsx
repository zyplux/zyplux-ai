import type { ReactNode } from 'react';

import { cx } from '@zyplux/ui/lib/style';
import { Reveal } from '@zyplux/ui/motion';
import { container, heading, prose } from '@zyplux/ui/recipes';

type SectionHeadingProps = { children: ReactNode; className?: string };

export const SectionHeading = ({ children, className }: SectionHeadingProps) => (
  <Reveal className={cx('text-center', className)}>
    <h2 className={heading()}>
      <span className='text-gradient'>{children}</span>
    </h2>
  </Reveal>
);

type SectionIntroProps = {
  centered?: boolean;
  children: ReactNode;
  className?: string;
};

export const SectionIntro = ({ centered = false, children, className }: SectionIntroProps) => (
  <Reveal
    className={cx(prose({ tone: 'muted' }), 'mx-auto -mt-10 mb-16 max-w-2xl', centered && 'text-center', className)}
  >
    {children}
  </Reveal>
);

const SECTION_WIDTHS = {
  narrow: 'max-w-3xl',
  slim: 'max-w-xl',
};

type SectionProps = {
  centered?: boolean;
  children: ReactNode;
  className?: string | undefined;
  heading?: ReactNode;
  id?: string | undefined;
  width?: keyof typeof SECTION_WIDTHS;
};

export const Section = ({
  centered = false,
  children,
  className,
  heading: headingContent,
  id,
  width,
}: SectionProps) => (
  <section className='relative py-32' id={id}>
    <div
      className={container({
        className: cx(width !== undefined && SECTION_WIDTHS[width], centered && 'text-center', className),
      })}
    >
      {headingContent !== undefined && <SectionHeading className='mb-16'>{headingContent}</SectionHeading>}
      {children}
    </div>
  </section>
);
