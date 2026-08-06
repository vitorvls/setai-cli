# Testing Rules

## Current State

- **Runner:** Vitest (`vitest.config.ts` — `environment: 'node'`, `globals: true`)
- **Location:** `src/__tests__/*.test.ts`
- **Docs link tests:** `docs/.vitepress/__tests__/links.test.ts` via `pnpm test:docs`
- **Coverage command:** `pnpm test:coverage` (Vitest + `@vitest/coverage-v8` → `./coverage`)
- **Not in stack:** Jest, Playwright, Cypress

### Suites present (non-exhaustive names)

`cli`, `init-command-e2e`, `config-command`, `config-manager`, `question-engine`, `advanced-groups-collector`, `ide-selector`, `validator`, `template-engine`, `template-engine-extended`, `file-generator`, `file-generator-extended`, `ai-service`, `providers`, `providers-extended`, `i18n`, `retry`, `json-validator`, `integration`

## Rules for agents

1. Add or update tests under `src/__tests__/` when changing behavior in `src/`.
2. Prefer deterministic tests; mock filesystem/network/providers where needed.
3. Run `pnpm test` (and targeted suites) before considering a change done.
4. Do not assume a documented minimum coverage percentage — **none is enforced in repo config as a gate**.
5. **TDD:** treated as a **preference / good practice**, not a proven enforced process (no active CI gate requiring tests-before-code). Prefer tests with behavior changes.

## Planned / Recommended

- Re-enable CI to run `pnpm test` on PRs (see `.cursor/context/deployment.md`)
- Keep coverage from regressing on critical engines (template-engine, init, i18n, providers)

## Related

- Structure: `.cursor/context/project-structure.md`
- Stack: `.cursor/context/tech-stack.md`
