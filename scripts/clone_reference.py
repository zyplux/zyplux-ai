#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.14"
# ///
"""Shallow-clone a reference repo into reference_clones/ for browsing.

Usage: clone_reference.py <owner/name|url> [ref]
With a ref, keep history back to (but excluding) that commit/tag; otherwise
clone a single commit. Not part of `up`/idempotency — a manual dev helper.
"""

import argparse
import shutil
import subprocess
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Shallow-clone a reference repo into reference_clones/.")
    parser.add_argument("repo", help="owner/name or git URL")
    parser.add_argument("ref", nargs="?", default="", help="keep history back to (but excluding) this commit/tag")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    repo: str = args.repo
    ref: str = args.ref

    is_url = "://" in repo or repo.startswith("git@")
    url = repo if is_url else f"https://github.com/{repo}.git"
    dest = Path("reference_clones") / Path(repo).name.removesuffix(".git")

    if dest.exists():
        input(f"{dest} exists — rm -rf and re-clone? [enter to continue, ^C to abort] ")
        shutil.rmtree(dest)

    depth_args = ["--shallow-exclude", ref] if ref else ["--depth", "1"]
    subprocess.run(["git", "clone", *depth_args, "--single-branch", url, str(dest)], check=True)


if __name__ == "__main__":
    main()
