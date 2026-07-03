# Copilot review instructions

- The `justfile` region between `# BASELINE` and `# CUSTOM` is org-canonical: the
  `zyplux-cerberus` linter requires it to match its packaged `baseline.just`
  byte-for-byte. Do not suggest per-repo edits inside that region; baseline changes
  belong in the zyplux repo.
