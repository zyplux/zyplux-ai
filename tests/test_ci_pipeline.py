"""The justfile `ci` recipe reproduces the GitHub Actions run: both pipelines must stay identical."""

import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
WORKFLOW_RUN_STEP = re.compile(r"^      - run: (.+)$", re.MULTILINE)
CONTAINER_PIPELINE = re.compile(r"sh -euc '([^']+)'")
CHECKOUT_ONLY_STEPS = ("git config",)


def parse_workflow_commands() -> list[str]:
    ci_yml = (REPO_ROOT / ".github" / "workflows" / "ci.yml").read_text()
    commands = WORKFLOW_RUN_STEP.findall(ci_yml)
    return [command for command in commands if not command.startswith(CHECKOUT_ONLY_STEPS)]


def parse_container_commands() -> list[str]:
    justfile = (REPO_ROOT / "justfile").read_text()
    pipeline = CONTAINER_PIPELINE.search(justfile)
    assert pipeline is not None, "justfile `ci` recipe has no `sh -euc '...'` pipeline"
    return [segment.strip().removeprefix("{ ").removesuffix("; }") for segment in pipeline.group(1).split("&&")]


def test_ci_recipe_matches_workflow() -> None:
    assert parse_container_commands() == parse_workflow_commands()
