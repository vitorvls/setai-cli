# Architecture Review

Review architecture for a SetAI CLI change.

## Context

- `.cursor/context/architecture.md`
- `.cursor/context/project-structure.md`
- `.cursor/context/known-issues.md`

## Instructions

Given the proposed change and existing code:

1. Check alignment with CLI → commands → engines → services → templates → files.
2. Flag accidental introduction of web/API/DB patterns.
3. Check impact on i18n, template helpers defaults, and `--beta` boundaries.
4. Call out coupling risks (e.g. helpers inventing stack facts).
5. Suggest simpler alternatives when over-engineered.

## Constraints

- Analysis only; no implementation in this command.
- Prefer evidence from `src/` over assumptions.

## Output

Strengths, risks, recommended adjustments, concrete file paths.
