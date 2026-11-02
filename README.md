# Getting Started

## Prerequisites

- [pnpm](https://pnpm.io) 12.x (installs the pinned Node.js runtime)
- [uv](https://docs.astral.sh/uv/) for Python tooling
- [just](https://just.systems)

## Install

```bash
just install
```

## Development

```bash
just dev
```

Starts the Vite dev server on port 5173.

## Quality Gate

```bash
just check
```

Runs install, knip, typecheck, lint, and test with autofix throughout.

## Build and Deploy

```bash
just build
just deploy
```

Builds `apps/web/dist` and deploys it to Cloudflare via wrangler.

## Maintenance

| Command                    | Purpose                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| `just knip`                | Check unused files, dependencies, and exports in both dependency scans. |
| `just typecheck`           | Check all TypeScript projects.                                          |
| `just lint`                | Autofix lint, formatting, and shared repository rules.                  |
| `just test`                | Run Vitest with coverage; add a name to filter tests.                   |
| `just upgrade`             | Upgrade dependencies and toolchains through shared CZ tooling.          |
| `just upgrade-interactive` | Select JavaScript and toolchain upgrades interactively.                 |
| `just clean`               | Remove gitignored build artifacts and caches.                           |
| `just og`                  | Render the social share card to `apps/web/og-preview.png`.              |

Run `just` for every recipe and alias defined in the [justfile](justfile), including PR submission and reference cloning.

## Documentation

- [Monorepo setup](MONOREPO.md): package structure, configuration, runtime, and CI.
- [Coding guidance](OVERVIEW.md): TypeScript, React, and styling conventions.
- [UI package](packages/ui/README.md): styles, motion setup, and public exports.
