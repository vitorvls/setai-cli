# Review PR

Review a pull request for SetAI CLI.

## Context

- `.cursor/context/architecture.md`
- `.cursor/rules/code-style.md`
- `.cursor/rules/testing-rules.md`
- `.cursor/rules/security-rules.md`
- `.cursor/context/known-issues.md`

## Instructions

Check:

1. Correct layering (commands/engines/services/utils/templates/locales).
2. No invented product architecture in docs or generated defaults if in scope.
3. Secrets not committed; config handling safe.
4. Tests updated for behavior changes; `pnpm test` / lint / type-check expectations.
5. i18n keys exist in all needed locales when UI strings change.
6. CLI flags/help remain accurate.

## Constraints

- CI may be inactive — do not assume GitHub Checks prove quality.
- Be specific with file references.

## Output

Findings by severity; required vs optional follow-ups.
