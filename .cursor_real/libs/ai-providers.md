# AI Providers (Product Feature)

Documents **implemented** optional AI integration. Not a catalog of Cursor IDE chat models.

## Current State

| Concern | Reality |
|---------|---------|
| Core generation | Deterministic templates + user answers; **no** provider call |
| Optional enrichment | `setai init --beta` → `src/services/ai-service.ts` |
| Configuration | `setai config` → keys in `~/.setai/config.json` |
| Env vars for keys | Not the supported path (per CLI help/docs) |

## Implemented providers

| Provider | SDK package | Implementation |
|----------|-------------|----------------|
| OpenAI | `openai` | `src/services/providers/openai-provider.ts` |
| Anthropic | `@anthropic-ai/sdk` | `src/services/providers/anthropic-provider.ts` |
| Google | `@google/generative-ai` | `src/services/providers/google-provider.ts` |

Selection / fallback order is defined in `src/services/ai-service.ts` (OpenAI → Anthropic → Google when keys exist).

Supporting pieces:

- Prompt: `src/prompts/project-analysis.prompt.md`
- JSON validation: `src/utils/json-validator.ts` (Zod)
- Retries: `src/utils/retry.ts`

Default model IDs are whatever the provider modules / config currently set — **read the provider source** rather than assuming a marketing model name from docs.

## Agent guidance

1. Do not hardcode large “allowed model” catalogs into architecture docs.
2. When changing providers, update tests under `src/__tests__/providers*.test.ts` and `ai-service.test.ts`.
3. Keep core init working if providers are absent or fail.

## Related

- Architecture: `.cursor/context/architecture.md`
- AI usage when coding this repo: `.cursor/rules/ai-usage-rules.md`
- Security: `.cursor/rules/security-rules.md`
