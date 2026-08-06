# Architecture

## Current State — Overview

SetAI is a **Node.js CLI** (ESM, TypeScript) that collects project answers, optionally enriches them with AI, processes templates, and writes IDE config folders (default: `.cursor`).

It is **not** a REST API, GraphQL service, web app, or database-backed system.

```
CLI Entry (src/index.ts)
    ↓
Commands (init | config)
    ↓
Engines / Orchestration
    ↓
Services / Providers (optional AI)
    ↓
Template Processing
    ↓
File Generation
```

## Entry and commands

| Path | Role |
|------|------|
| `src/index.ts` | Commander program `setai`; registers commands; **CLI `--version` currently hardcoded `0.1.0`** (see known issues) |
| `src/commands/init.ts` | Orchestrates full generation pipeline |
| `src/commands/config.ts` | Interactive API key management (OpenAI / Anthropic / Google) |

### CLI surface (Current State)

```bash
setai init [--advanced] [--beta] [--lang pt-BR|en|es]
setai config
```

- `--advanced` — extra question groups (`src/engines/advanced-groups-collector.ts`)
- `--beta` — optional AI enrichment (`src/services/ai-service.ts`); needs keys via `setai config`
- `--lang` — locale for **questions/messages** (default `pt-BR`). Generated output files are currently forced to **English** in `init.ts` (`filesLocale = 'en'`).

## `setai init` pipeline (Current State)

Order in `src/commands/init.ts`:

1. Resolve question locale → `setLocale`
2. Check write permissions
3. `collectIDESelection` → target folder (`.cursor` / `.vscode` / `.idea` / custom)
4. Confirm overwrite if folder exists
5. `collectProjectInfo` (+ advanced groups if `--advanced`)
6. `validateProjectInfo`
7. If `--beta`: `enhanceWithAI` → `projectInfo.aiGenerated` (on failure: warn and continue without AI)
8. Switch locale for file generation (currently always `en`)
9. `processAllTemplates`
10. `generateFiles`
11. `generateSetaiConfig` → copy config into `{configFolder}/.setai/`

## Engines

| Path | Role |
|------|------|
| `src/engines/ide-selector.ts` | IDE → output folder mapping |
| `src/engines/question-engine.ts` | Core Inquirer questionnaire → `ProjectInfo` |
| `src/engines/advanced-groups-collector.ts` | Optional advanced groups |
| `src/engines/validator.ts` | Required-field validation for `ProjectInfo` |
| `src/engines/template-engine.ts` | Load templates; substitute `{{KEY}}`; process `{{#if}}` / `{{#unless}}` |
| `src/engines/template-helpers.ts` | Heuristic inference for template gaps (stack/arch defaults) |
| `src/engines/file-generator.ts` | Write generated files to disk |

## Template system (Current State)

- **Not Handlebars.** Custom engine in `src/engines/template-engine.ts`.
- Template assets: `templates/.cursor/`, `templates/.cursor.en/`, `templates/.cursor.es/` (`.md.template` files).
- Placeholders: `{{KEY}}`
- Conditionals: `{{#if KEY}}…{{else}}…{{/if}}`, `{{#unless KEY}}…{{/unless}}`
- Empty / `[A definir]` / `[To be defined]` treated as falsy for conditionals.
- Published npm package includes `templates` and `locales` (`package.json` → `files`).

## Services and AI (optional)

| Path | Role |
|------|------|
| `src/services/ai-service.ts` | Provider selection and enrichment orchestration |
| `src/services/providers/openai-provider.ts` | OpenAI SDK |
| `src/services/providers/anthropic-provider.ts` | Anthropic SDK |
| `src/services/providers/google-provider.ts` | Google Generative AI SDK |
| `src/prompts/project-analysis.prompt.md` | Prompt used for AI analysis JSON |

**Core path does not call providers.** HTTP/SDK usage is for `--beta` and config testing of keys.

Provider priority when multiple keys exist: OpenAI → Anthropic → Google (see `ai-service.ts`).

## Config

| Path | Role |
|------|------|
| `src/config/config-manager.ts` | Load/save `~/.setai/config.json` (API keys, language prefs) |

Canonical secrets location: **user home** `~/.setai/config.json` (not env vars — per CLI help/docs).  
`init` also writes a reference copy under `{output}/.setai/` with `.gitignore` for `config.json`.

## Utils and types

| Path | Role |
|------|------|
| `src/utils/i18n.ts` | Locale loaders; `t` / `tQuestion` / `tMessage` / `tValidation` |
| `src/utils/output.ts` | Terminal output helpers (chalk) |
| `src/utils/retry.ts` | Retry/backoff for provider calls |
| `src/utils/json-validator.ts` | Zod validation of AI JSON responses |
| `src/types/project-info.ts` | `ProjectInfo` and related types |
| `src/types/ide-config.ts` | IDE config types |

## i18n

Locales live under `locales/{pt-BR,en,es}/` with `questions.json`, `messages.json`, `validation.json`, `templates.json`.

**Known behavior:** if a key is missing, `t(key)` returns the **key string itself** (`src/utils/i18n.ts`). Wrong keys can leak into answers and generated files.

## What this project does not have (Current State)

- No application database
- No Redis / queues / workers
- No HTTP API server, GraphQL, or web UI product surface
- No Docker/Kubernetes deployment of the CLI itself
- No JWT/OAuth/session auth for end users
- No active CI pipeline (workflow file exists but is fully commented — see deployment / known issues)

## Related

- Structure map: `.cursor/context/project-structure.md`
- Stack: `.cursor/context/tech-stack.md`
- Deployment: `.cursor/context/deployment.md`
- Known issues: `.cursor/context/known-issues.md`
