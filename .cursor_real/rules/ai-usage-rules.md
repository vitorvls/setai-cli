# AI Usage Rules — Working on SetAI

Rules for **agents and humans changing this repository**. Separate from SetAI’s optional `--beta` feature (that is product behavior; see architecture).

## Principles

1. AI proposes; humans approve architectural and security-sensitive decisions.
2. Prefer this `.cursor` context and real code over generic stack assumptions.
3. Generated code enters the normal review + test cycle.
4. Do not invent project facts (DB, REST API, CI active, etc.).

## Where AI may help

- Implement CLI features in `src/commands`, `src/engines`, `src/services`, `src/utils`
- Add/adjust Vitest tests in `src/__tests__`
- Improve templates under `templates/` (knowing generator limitations — see known issues)
- Improve locales under `locales/`
- Refactor with tests green
- Draft docs under `docs/` carefully against real behavior

## Where AI must not decide alone

- Presenting unverified infrastructure as current state
- Changing secret handling without review
- Publishing/releasing the npm package
- “Fixing” version mismatch or enabling CI without explicit human request (those are product/process decisions)

## Product AI feature (`--beta`) vs repo work

| Concern | Guidance |
|---------|----------|
| Core `setai init` | Must remain usable without provider keys |
| `--beta` | May call OpenAI / Anthropic / Google SDKs |
| Model IDs | Configured via provider defaults / user config — do not hardcode marketing model catalogs into architecture docs |
| Failures | Degrade gracefully; do not hard-fail core generation |

Details: `.cursor/libs/ai-providers.md`, `.cursor/context/architecture.md`.

## Quality bar for AI-assisted changes

- Follow lint/typecheck/tests (`pnpm lint`, `pnpm type-check`, `pnpm test`)
- Update tests when behavior changes
- Keep changes scoped; do not rewrite the generator “while fixing docs” unless asked

## Related

- Business rules: `.cursor/rules/business-rules.md`
- Known issues: `.cursor/context/known-issues.md`
- Code style: `.cursor/rules/code-style.md`
