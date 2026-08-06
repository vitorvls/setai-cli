# Code Style Rules

## Current State — Tooling

| Tool | Config | Script |
|------|--------|--------|
| TypeScript strict | `tsconfig.json` | `pnpm type-check` |
| ESLint flat | `eslint.config.mjs` | `pnpm lint` / `pnpm lint:fix` |
| Prettier | `.prettierrc` | `pnpm format` / `pnpm format:check` |

Notable ESLint: `@typescript-eslint/no-explicit-any` is **error**. Prettier integration disables stylistic conflicts.

**Not Current State:** “formatting verified in CI” — CI workflow is commented out.

## Language conventions

- **Identifiers, file names, code strings for logs/errors in source:** English preferred (matches existing `src/`).
- **User-facing CLI strings:** come from `locales/*` (pt-BR / en / es) — edit locale JSON, not hardcode one language in engines when i18n already covers the string.
- **This `.cursor` folder:** English technical context for agents; product goals may include Portuguese statements.

## Patterns for this codebase

1. Keep CLI orchestration in `commands/`; keep reusable logic in `engines/`, `services/`, `utils/`.
2. Do not introduce a web MVC / repository-persistence layer — it does not match this architecture.
3. Prefer extending the custom template engine over adding Handlebars/EJS.
4. New dependencies need a clear reason (see `.cursor/libs/allowed-libs.md`).
5. Match existing formatting (Prettier: single quotes, semicolons, printWidth 100, LF).

## Before finishing a change

```bash
pnpm lint
pnpm type-check
pnpm test
```

## Related

- Architecture: `.cursor/context/architecture.md`
- Testing: `.cursor/rules/testing-rules.md`
- Git: `.cursor/rules/git-rules.md`
