# Test Strategy

Plan tests for a SetAI change.

## Context

- `.cursor/rules/testing-rules.md`
- `.cursor/context/project-structure.md`
- Existing suites in `src/__tests__/`

## Instructions

1. Identify units/integration points affected (engine, command, provider, i18n, templates).
2. Propose Vitest cases (success, validation failure, locale fallback, AI failure degrade).
3. Specify mocks (fs, inquirer, providers) where needed.
4. Map to files under `src/__tests__/`.

## Constraints

- Use Vitest only (not Jest/Playwright/Cypress).
- Do not invent coverage percentage gates.
- TDD is a preference, not an enforced process.

## Output

Test list with target files and scenarios.
