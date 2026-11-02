# BASELINE
set shell := ["bash", "-euo", "pipefail", "-c"]

alias i := install
alias k := knip
alias tc := typecheck
alias l := lint
alias t := test
alias c := check
alias u := upgrade
alias ui := upgrade-interactive
alias p := push
alias pr := push-ready

# List available recipes.
default:
    @just --list

# Install both workspaces: pnpm + uv.
install:
    pnpm install
    uv sync --all-packages --all-groups

# Report unused files, dependencies, and exports.
knip:
    pnpm run knip
    pnpm run knip --config knip.prod.json

# Type-check TypeScript.
typecheck:
    pnpm run typecheck

# Lint and format both workspaces with autofix, then verify org invariants with cerberus.
lint:
    pnpm run lint:fix
    pnpm run format
    uv run rumdl check --fix
    uv run rumdl fmt
    uv run cerberus --fix

# Run tests; optionally filter by test name.
test name='':
    pnpm run test {{ if name == '' { '' } else { '-t ' + quote(name) + ' --passWithNoTests' } }}

# Full gate across both workspaces: install, knip, typecheck, lint, test — autofix throughout.
check: install knip typecheck lint test

# Upgrade workspace dependencies and toolchains.
upgrade *args='':
    pnpm run cz upgrade {{ args }}

# Interactively select JavaScript and toolchain upgrades.
upgrade-interactive:
    pnpm run cz upgrade --interactive

# Push the current branch and open a draft PR (-r/--ready marks it ready and enables auto-merge).
push *flags:
    pnpm run cz push-branch {{ flags }}

# Push the current branch and open a PR marked ready, enabling auto-merge.
push-ready: (push "--ready")

# Remove gitignored build artifacts and caches.
clean *flags:
    pnpm run cz clean {{ flags }}

# CUSTOM

alias d := dev
alias b := build

# Serve the web app with the Vite dev server (HMR).
dev *args:
    pnpm run dev {{ args }}

# Build the web app — produces apps/web/dist consumed by `wrangler deploy`.
build:
    pnpm run build

# Deploy the web app to Cloudflare (vite build + wrangler deploy).
deploy:
    pnpm --filter @zyplux/web deploy

# Render the social share card to apps/web/og-preview.png for a quick visual check.
# The deployed image (dist/og.png) is generated automatically by the Vite build.
og:
    pnpm --filter @zyplux/web og

# Shallow-clone a reference repo into reference_clones/ (optional branch or tag).
clone repo ref="":
    pnpm run cz clone-reference-repo {{ repo }} {{ ref }}
