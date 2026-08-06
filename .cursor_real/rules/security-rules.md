# Security Rules — SetAI CLI

Applicable to this CLI. Web-app controls (JWT sessions, SQL injection, XSS, CSP, CORS, HTTP rate limits, file-upload malware scanning, password hashing, DB SSL) are **not current product concerns** — do not implement them unless a real feature requires them.

## Current State — Secrets and config

1. **API keys** for OpenAI / Anthropic / Google are stored via `src/config/config-manager.ts` in **`~/.setai/config.json`**.
2. CLI help/docs indicate configuration via **`setai config`**, not environment variables.
3. `setai init` may copy config into `{outputFolder}/.setai/config.json` and writes `.setai/.gitignore` ignoring `config.json`.
4. **Never commit** real API keys. Treat `.cursor/.setai/config.json` and `~/.setai/config.json` as sensitive.
5. Do not hardcode secrets in source, tests, templates, or docs.

## Current State — Inputs and filesystem

1. Validate questionnaire / config inputs before processing (`validator`, Inquirer validators, Zod for AI payloads in `src/utils/json-validator.ts`).
2. File generation writes under the selected IDE config folder — avoid path traversal and unsafe writes outside the intended target (`file-generator` / permission checks in init).
3. Be careful with user-provided paths and project names when constructing filesystem paths.

## Optional AI (`--beta`)

1. With `--beta`, project answers / prompts may be sent to external providers (OpenAI, Anthropic, Google).
2. Do not send secrets, private keys, or unrelated confidential files to providers.
3. Provider calls use official SDKs + retry helper (`src/utils/retry.ts`). Treat provider responses as untrusted until validated (Zod).
4. If AI enrichment fails, init continues without requiring keys for the core path.

## Dependencies

1. Prefer existing official SDKs already in `package.json` for provider HTTP.
2. Run vulnerability awareness on dependency changes (**Planned / Recommended:** regular `pnpm audit` / equivalent — not enforced by active CI today).
3. Do not add networking libraries casually; justify against existing SDKs.

## Planned / Recommended (not enforced today)

- Keep npm publish 2FA enabled for maintainers
- Ensure release checklist includes secret scanning of the staged tree
- Re-enable CI security-relevant checks when CI is activated

## Related

- Architecture (config + providers): `.cursor/context/architecture.md`
- Deployment (CI inactive): `.cursor/context/deployment.md`
- Allowed libs: `.cursor/libs/allowed-libs.md`
