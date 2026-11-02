# Overview

> This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Use [Getting Started](README.md) for prerequisites and commands, [Monorepo Setup](MONOREPO.md) for architecture and configuration, and the [UI package guide](packages/ui/README.md) for component APIs.

## TypeScript

- Use `type` for all type definitions (no `interface`)
- No `any` (use `unknown`)
- No `@ts-ignore`, `@ts-nocheck`, `@ts-expect-error`
- No non-null assertion (`!`)
- Handle all `undefined`/`null` explicitly
- Prefer type inference over annotations
- Arrow functions only (no `function` declarations)
- Top-level `await` (no `.then()/.catch()`)

## React

- Functional components with arrow functions
- Animate via `m.*` from `motion/react-m` + `LazyMotion`; `MotionProvider` from `@zyplux/ui/motion` wraps the root route, and its strict mode rejects plain `motion.*` imports.
- `useScroll`/`useTransform` parallax, `useInView` scroll reveals
- `prefers-reduced-motion` support (`MotionConfig reducedMotion='user'` baseline plus component-level `useReducedMotion` replacements)

## Styling

- Tailwind CSS 4 with `@tailwindcss/vite`
- Dark-only GitHub-dark palette as `@theme` tokens in `@zyplux/ui/theme.css` (`background #0d1117`, `surface`, `accent #58a6ff`, `violet #bc8cff`); the same palette is exported as `PALETTE` from `@zyplux/ui/tokens` for SVG/OG rendering (a test keeps the two in sync)
- `theme.css` carries a `@source` directive so the app's Tailwind build scans the package's classes; the app's `index.css` is just three `@import`s (`tailwindcss`, theme, base)
- `text-gradient` utility for headline gradients; `shadow-glow` for card hover (both in `@zyplux/ui/base.css`)
- `cva`/`cx` from `@zyplux/ui/lib/style` (cva + `tailwind-merge` taught the custom theme tokens) for variant class builders and className merging
- Reuse class recipes from `@zyplux/ui/recipes`; see the [UI package guide](packages/ui/README.md#exports) for available exports.
