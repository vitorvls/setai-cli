# Controlled Refactor

Plan a safe refactor in SetAI CLI.

## Context

- `.cursor/context/architecture.md`
- `.cursor/rules/testing-rules.md`
- `.cursor/context/known-issues.md`

## Instructions

1. State current behavior and target behavior (no behavior change unless requested).
2. List files/modules to touch.
3. Identify tests to run or add (`src/__tests__/`).
4. Call out risks (i18n keys, template variable contracts, public CLI flags).
5. Propose incremental steps.

## Constraints

- Keep core init usable without API keys.
- Do not “fix” generator templates/locales unless that is the task scope.
- Stay within requested files.

## Output

Step plan, risk list, test plan.
