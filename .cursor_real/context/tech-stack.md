# Technology Stack

All items below are **Current State** unless labeled otherwise. Source: `package.json`, lockfile, and tooling configs.

## Identity and versions

| Item | Value | Source |
|------|-------|--------|
| Package name | `@setai/cli` | `package.json` |
| Package version | `0.1.2` | `package.json` |
| CLI reported version | `0.1.0` | `src/index.ts` → `.version('0.1.0')` |
| Node engines | `>=18.0.0` | `package.json` `engines` |
| Module system | ESM (`"type": "module"`) | `package.json` |

**Known Issue:** package version and CLI `--version` diverge. Treat `package.json` as the published package version; treat `src/index.ts` as what `setai --version` prints until aligned.

## Runtime and language

- **Language:** TypeScript
- **Runtime:** Node.js `>=18`
- **Web framework:** none
- **Database:** none

## Production dependencies

| Package | Role |
|---------|------|
| `commander` | CLI parsing / commands |
| `inquirer` | Interactive prompts |
| `fs-extra` | Filesystem operations |
| `chalk` | Terminal colors |
| `ora` | Spinners |
| `zod` | Schema validation (incl. AI JSON) |
| `openai` | Optional AI provider SDK |
| `@anthropic-ai/sdk` | Optional AI provider SDK |
| `@google/generative-ai` | Optional AI provider SDK |

## Build and quality (dev)

| Package / tool | Role | Config |
|----------------|------|--------|
| `tsup` | Bundle CLI to `dist/` | `tsup.config.ts` |
| `typescript` | Types / `tsc --noEmit` | `tsconfig.json` (strict) |
| `eslint` | Lint (flat config) | `eslint.config.mjs` |
| `prettier` | Format | `.prettierrc` |
| `vitest` | Unit/integration tests | `vitest.config.ts` |
| `@vitest/coverage-v8` | Coverage | via `test:coverage` |
| `vitepress` | Docs site | `docs/.vitepress/` |

## Package management

- **Repository development:** `pnpm` — evidenced by `pnpm-lock.yaml` (no `package-lock.json` / `yarn.lock`).
- **Distribution:** npm package `@setai/cli` (`publishConfig.access: public`), bin `setai` → `./dist/index.js`.
- Published artifacts: `dist`, `templates`, `locales`.

## Template engine

Custom implementation in `src/engines/template-engine.ts` — **not** Handlebars/EJS/Pug.

## Not in the stack (do not assume)

Handlebars, Jest, Playwright, Cypress, Axios as a direct dependency, Express/Next/React as this product's framework, PostgreSQL/MongoDB/Redis, Docker runtime for the CLI.

## Related

- Allowed libs detail: `.cursor/libs/allowed-libs.md`
- Architecture: `.cursor/context/architecture.md`
- Known issues: `.cursor/context/known-issues.md`
