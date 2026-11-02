import { describe, expect, it } from './stories';

describe('app.cx', () => {
  it('1.1.1 joins class names', ({ app }) => {
    expect(app.cx('p-2', 'text-sm')).toBe('p-2 text-sm');
  });

  it('1.1.2 keeps the last conflicting tailwind class', ({ app }) => {
    expect(app.cx('p-2', 'p-4')).toBe('p-4');
  });

  it('1.1.3 drops falsy values', ({ app }) => {
    expect(app.cx('block', undefined, false)).toBe('block');
  });
});

describe('cva', () => {
  it('1.2.1 applies the default variant', ({ app }) => {
    expect(app.button()).toBe('rounded font-semibold bg-accent');
  });

  it('1.2.2 applies the requested variant', ({ app }) => {
    expect(app.button({ intent: 'secondary' })).toBe('rounded font-semibold border');
  });

  it('1.2.3 resolves caller class conflicts through tailwind-merge', ({ app }) => {
    expect(app.button({ class: 'rounded-xl' })).toBe('font-semibold bg-accent rounded-xl');
  });
});
