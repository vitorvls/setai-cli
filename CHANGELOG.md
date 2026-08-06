# Changelog

## Unreleased

### Breaking / behavior changes (evidence compiler)

- `setai init` now **scans the repository** before asking questions and compiles context from evidence + user intent.
- Templates no longer invent architecture (Layered REST), JWT auth, databases, CI providers, or E2E stacks.
- Domain values no longer use localized sentinels (`templates.none` / `None` as framework).
- `libs/ai-models.md` replaced by `libs/ai-providers.md` (optional SDKs only).
- New context files: `project-structure.md`, `known-issues.md`.
- Removed unsafe `template-helpers` inference layer.

### Added

- `setai validate [folder]` — deterministic audit of generated context.
- Project scanner (JS/TS manifests, lockfiles, tooling, CI status including commented workflows).
- Fact resolver with provenance, conflicts, and unknown handling.
- Generation quality report after `init`.
- Dogfooding benchmark tests against this repository.

### Notes

- Core generation remains **offline** and does **not** require API keys.
- `--beta` may enrich prose/recommendations only; it does not overwrite repository facts.
- CLI `--version` now reads from `package.json`.
