import { cva, cx } from '@zyplux/ui/lib/style';
import { describe, expect, it } from 'vitest';

describe('cx', () => {
  it('1.1.1 joins class names', () => {
    expect(cx('p-2', 'text-sm')).toBe('p-2 text-sm');
  });

  it('1.1.2 keeps the last conflicting tailwind class', () => {
    expect(cx('p-2', 'p-4')).toBe('p-4');
  });

  it('1.1.3 drops falsy values', () => {
    expect(cx('block', undefined, false)).toBe('block');
  });
});

describe('cva', () => {
  const button = cva({
    base: 'rounded font-semibold',
    defaultVariants: { intent: 'primary' },
    variants: { intent: { primary: 'bg-accent', secondary: 'border' } },
  });

  it('1.2.1 applies the default variant', () => {
    expect(button()).toBe('rounded font-semibold bg-accent');
  });

  it('1.2.2 applies the requested variant', () => {
    expect(button({ intent: 'secondary' })).toBe('rounded font-semibold border');
  });

  it('1.2.3 resolves caller class conflicts through tailwind-merge', () => {
    expect(button({ class: 'rounded-xl' })).toBe('font-semibold bg-accent rounded-xl');
  });
});
