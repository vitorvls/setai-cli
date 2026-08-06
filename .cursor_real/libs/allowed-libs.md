# Allowed / Current Libraries

**Current State** — packages actually declared in `package.json`. Prefer these before adding new dependencies.

## Production

| Package | Role |
|---------|------|
| `commander` | CLI framework |
| `inquirer` | Interactive prompts |
| `fs-extra` | Filesystem helpers |
| `chalk` | Terminal styling |
| `ora` | Spinners |
| `zod` | Runtime validation / AI JSON schema |
| `openai` | OpenAI provider SDK (`--beta` / config) |
| `@anthropic-ai/sdk` | Anthropic provider SDK |
| `@google/generative-ai` | Google Generative AI provider SDK |

Node built-ins (`path`, `fs`, `os`, etc.) are fine where appropriate; `fs-extra` is already used for richer FS APIs.

## Development

| Package | Role |
|---------|------|
| `typescript` | Language / typecheck |
| `tsup` | Bundler |
| `vitest` + `@vitest/coverage-v8` + `@vitest/ui` | Tests |
| `eslint` + `@typescript-eslint/*` + `@eslint/js` + `eslint-config-prettier` | Lint |
| `prettier` | Format |
| `vitepress` | Docs site |
| `@types/node`, `@types/fs-extra`, `@types/inquirer` | Types |

## Not current dependencies (do not treat as adopted)

Handlebars, read-pkg, error-stack-parser, mock-fs, Jest, Playwright, Cypress, Axios, Express, Next.js, database clients.

Template processing is custom (`src/engines/template-engine.ts`).

## Adding a new dependency

1. Justify why an existing package is insufficient.
2. Prefer well-maintained, typed packages with clear license fit.
3. Update this file when a dependency is actually added to `package.json`.

## Related

- Stack: `.cursor/context/tech-stack.md`
- Providers: `.cursor/libs/ai-providers.md`
- Forbidden / caution: `.cursor/libs/forbidden-libs.md`
