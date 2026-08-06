# Pre-Publish Validation

Final checks before publishing `@setai/cli` to npm (not web “deploy”).

## Context

- `.cursor/context/deployment.md`
- `.cursor/context/tech-stack.md`
- `.cursor/context/known-issues.md`
- `.cursor/rules/security-rules.md`

## Checklist

1. `package.json` version intentional for the release.
2. `src/index.ts` `.version(...)` considered (currently may disagree with package.json).
3. `pnpm lint`, `pnpm type-check`, `pnpm test`, `pnpm build` succeed locally.
4. No secrets in the package tarball (`files`: `dist`, `templates`, `locales` only).
5. README/help still match real flags.
6. Remember: GitHub Actions CI is **inactive** — local verification matters.

## Constraints

- Do not alter code in this command; report blockers.
- Distinguish release blockers vs recommendations.

## Output

Pass/fail checklist, blockers, notes on version alignment.
