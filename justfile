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

# Install both workspaces: bun + uv.
install:
    bun install
    uv sync --all-packages --all-groups

# Report unused files, deps, and exports: knip (JS workspace) + vulture (Python).
knip:
    bun run knip
    uv run vulture

# Type-check both workspaces: tsc/bun for .ts, pyrefly for .py.
typecheck:
    bun run typecheck
    uv run pyrefly check

# Lint and format both workspaces with autofix, then verify org invariants with cerberus.
lint:
    bun run lint:fix
    bun run format
    uv run rumdl check --fix
    uv run rumdl fmt
    uv run ruff check --fix
    uv run ruff format
    uv run cerberus --fix

# Run tests for both workspaces. Optional arg filters by test name; never fails when nothing matches.
test name='':
    bun run test {{ if name == '' { '' } else { '-t ' + quote(name) + ' --passWithNoTests' } }}
    uv run pytest {{ if name == '' { '' } else { '-k ' + quote(name) } }} || [ "$?" -eq 5 ]

# Full gate across both workspaces: install, knip, typecheck, lint, test — autofix throughout.
check: install knip typecheck lint test

# Upgrade deps across both workspaces: ncu bumps JS ranges; uv lock --upgrade + uv-bump raise Python >= floors. Forwards extra args to ncu.
upgrade *args='':
    bun run upgrade -- {{ args }}
    uv lock --upgrade
    uvx uv-bump -v
    uv sync --all-packages --all-groups

# Interactively select JS upgrades, then non-interactively upgrade Python (uv has no interactive mode) and reinstall both.
upgrade-interactive:
    bun run upgrade -- -i
    bun install
    uv lock --upgrade
    uvx uv-bump -v
    uv sync --all-packages --all-groups

# Push the current branch and open a draft PR (-r/--ready marks it ready and enables auto-merge).
push *flags:
    bun run cz push-branch {{ flags }}

# Push the current branch and open a PR marked ready, enabling auto-merge.
push-ready: (push "--ready")

# Remove deps and caches from all workspaces.
clean:
    find . -type d \( -name node_modules -o -name .venv -o -name __pycache__ -o -name .tsbuild -o -name dist -o -name .ruff_cache -o -name .pytest_cache -o -name .rumdl_cache \) -prune -exec rm -rf {} +
    find . -type f \( -name '*.tsbuildinfo' -o -name '.eslintcache' -o -name '*.py[cod]' \) -delete

# CUSTOM

alias d := dev
alias b := build

# Serve the web app with the Vite dev server (HMR).
dev *args:
    bun run dev {{ args }}

# Build the web app — produces apps/web/dist consumed by `wrangler deploy`.
build:
    bun run build

# Reproduce the GitHub Actions CI run locally inside the org CI container.
# Anonymous volumes mask node_modules and .venv so the host install is left untouched.
ci:
    podman run --rm \
        -v {{ justfile_directory() }}:/work \
        -v /work/node_modules \
        -v /work/.venv \
        -w /work \
        ghcr.io/zyplux/ci:0.1.1 \
        sh -euc 'bun install --frozen-lockfile && uv sync --locked --all-groups && bun run build && bun run knip && uv run --no-sync vulture && bun run typecheck && uv run --no-sync rumdl check && uv run --no-sync rumdl fmt --check && bun run lint && bunx prettier --check . && uv run --no-sync ruff check && uv run --no-sync ruff format --check && uv run --no-sync pyrefly check && bun run test && { uv run --no-sync pytest || [ "$?" -eq 5 ]; } && uv run --no-sync cerberus'

# Deploy the web app to Cloudflare (vite build + wrangler deploy).
deploy:
    bun --filter @zyplux/web deploy

# Render the social share card to apps/web/og-preview.png for a quick visual check.
# The deployed image (dist/og.png) is generated automatically by the Vite build.
og:
    bun --filter @zyplux/web og

# Shallow-clone a reference repo into reference_clones/ (optional branch or tag).
clone repo ref="":
    scripts/clone_reference.py {{ repo }} {{ ref }}
