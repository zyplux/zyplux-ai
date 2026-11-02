# @zyplux/ui

Shared design system: tokens, global styles, class recipes, and React components.

## Install

Peers expected in the consuming app: `react`, `react-dom`, `motion`, `lucide-react`, `tailwindcss` (v4).

## Styles

In the app's Tailwind entry CSS:

```css
@import 'tailwindcss';
@import '@zyplux/ui/theme.css';
@import '@zyplux/ui/base.css';
```

`theme.css` carries the design tokens (`@theme`) and a `@source` directive so the app's Tailwind build scans this package's classes. `base.css` adds the `text-gradient` utility and base layer (focus ring, `.skip-link`, body background).

## Motion

Wrap the app once; components animate via `m.*` + `LazyMotion`:

```tsx
import { MotionProvider } from '@zyplux/ui/motion';
```

## Exports

Ordered from most abstract to most composed:

- `@zyplux/ui/tokens` — `PALETTE` (hex values for SVG/canvas/OG rendering), `TEXT_GRADIENT`, `toRgba`
- `@zyplux/ui/lib/style` — `cva`, `cx` (cva + `tailwind-merge` taught the custom theme tokens)
- `@zyplux/ui/recipes` — class-only recipes: `container`, `heading`, `button`, `pill`, `navLink`, `inlineLink`, `prose`, `avatar`, `fieldInput`, `fieldLabel`
- `@zyplux/ui/hooks` — `useHasScrolledPast`, `useTypewriter`, `useCountUp`
- `@zyplux/ui/motion` — `MotionProvider`, `Reveal`, `REVEAL_STAGGER_S`, `Entrance`, `BlinkingCaret`, `FloatingParticles`, `ScrollCue`, `ScrollProgressBar`
- `@zyplux/ui/primitives` — buttons, brand lockups, badges, pictograms, spotlight and feature cards, disclosures, showcase panels, and animated bars
- `@zyplux/ui/layout` — `Section` with a heading slot and width options, `SectionIntro`, `CardGrid`, `PageHeadline`, `GridBackground`
- `@zyplux/ui/blocks` — `NavBar`, `SiteFooter`, `SubpageShell`, `BackLink`, `HeroShell`, `Timeline`, `TimelineItem`
- `@zyplux/ui/forms` — `useHostedForm`, honeypot and status components, `EmailCapture`
- `@zyplux/ui/diagram` — animated SVG diagram components and phase hooks

## Development

Exports raw TypeScript source (no build step); consuming applications transpile via Vite.
