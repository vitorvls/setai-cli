# Project Structure — Agent Navigation

Compact map of where to change things. Paths are relative to the repository root.

## Top level

```
src/           TypeScript source (CLI)
templates/     Generation templates (*.md.template)
locales/       i18n JSON (pt-BR, en, es)
docs/          VitePress documentation site
scripts/       Repo helper scripts (e.g. release/translate)
.github/       Workflows (CI currently commented)
.cursor/       This agent context (golden reference; not the generator source)
```

## Where do I…?

| Task | Location |
|------|----------|
| Add a CLI command | `src/index.ts` + new file under `src/commands/` |
| Change `init` orchestration | `src/commands/init.ts` |
| Change `config` command | `src/commands/config.ts` |
| Change core questions | `src/engines/question-engine.ts` + `locales/*/questions.json` |
| Change advanced groups | `src/engines/advanced-groups-collector.ts` |
| Change IDE → folder mapping | `src/engines/ide-selector.ts` |
| Change validation rules | `src/engines/validator.ts` |
| Change template substitution / conditionals | `src/engines/template-engine.ts` |
| Change inference heuristics / defaults | `src/engines/template-helpers.ts` |
| Change how files are written | `src/engines/file-generator.ts` |
| Change AI enrichment flow | `src/services/ai-service.ts` |
| Change a provider implementation | `src/services/providers/*.ts` |
| Change AI analysis prompt | `src/prompts/project-analysis.prompt.md` |
| Change config persistence | `src/config/config-manager.ts` |
| Change translations / messages | `locales/{pt-BR,en,es}/*.json` + `src/utils/i18n.ts` |
| Change generated document content | `templates/.cursor*/**/*.md.template` |
| Change types for collected data | `src/types/project-info.ts`, `src/types/ide-config.ts` |
| Add tests | `src/__tests__/*.test.ts` (Vitest) |
| Change build bundling | `tsup.config.ts` |
| Change lint/format/ts | `eslint.config.mjs`, `.prettierrc`, `tsconfig.json` |

## `src/` layout

```
src/
  index.ts
  commands/     init.ts, config.ts
  engines/      question, advanced-groups, ide-selector, validator,
                template-engine, template-helpers, file-generator
  services/     ai-service.ts, providers/
  config/       config-manager.ts
  utils/        i18n, output, retry, json-validator
  types/        project-info, ide-config
  prompts/      project-analysis.prompt.md
  __tests__/    Vitest suites
```

## Templates layout

```
templates/
  .cursor/       # used when files locale resolves to pt-BR path
  .cursor.en/    # English templates (init currently forces filesLocale=en)
  .cursor.es/
```

Each tree mirrors: `context/`, `rules/`, `libs/`, `commands/`, `README.md.template`.

## Related

- Architecture: `.cursor/context/architecture.md`
- Stack: `.cursor/context/tech-stack.md`
