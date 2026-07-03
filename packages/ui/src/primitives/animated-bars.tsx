import { cx } from '@zyplux/ui/lib/style';
import { useReducedMotion } from 'motion/react';
import * as m from 'motion/react-m';

type Bar = { id: string; percent: number };

const FULL_SCALE_PERCENT = 100;
const BAR_STAGGER_S = 0.08;

type AnimatedBarsProps = {
  bars: Bar[];
  className?: string;
  revealed?: boolean;
};

export const AnimatedBars = ({ bars, className, revealed = true }: AnimatedBarsProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isStill = prefersReducedMotion === true;

  return (
    <div aria-hidden className={cx('flex h-28 items-end gap-2', className)}>
      {bars.map((bar, index) => (
        <m.div
          animate={{ scaleY: revealed ? bar.percent / FULL_SCALE_PERCENT : 0 }}
          className='flex-1 rounded-t bg-linear-to-t from-accent/40 to-accent'
          initial={{ scaleY: isStill ? bar.percent / FULL_SCALE_PERCENT : 0 }}
          key={bar.id}
          style={{ height: '100%', transformOrigin: 'bottom' }}
          transition={{ delay: isStill ? 0 : index * BAR_STAGGER_S, duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};
