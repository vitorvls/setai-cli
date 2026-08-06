# Business Rules — SetAI CLI

Rules that implementations and generated context should respect.

## Explicit Product Rules

1. **Trustworthy context** — Generated or documented project context must not invent technologies, architecture, or infrastructure without evidence.
2. **Facts vs recommendations** — Unproven items are `Not evidenced`, `Not implemented`, or clearly labeled **Planned / Recommended**. Never present them as current state.
3. **Core path without API keys** — Default `setai init` must work offline regarding AI providers. Keys are only required for `--beta` / provider features.
4. **AI is optional** — Providers enrich answers; they must not be required for basic generation. Failures in `--beta` should degrade gracefully (warn + continue).
5. **Templates must not inject nonexistent stack** — Prefer empty/unknown over fabricating databases, REST layers, or frameworks the target project does not use.
6. **Agent usefulness** — Output should help agents navigate real code (paths, commands, constraints), not generic web-app boilerplate.
7. **Predictable generation** — Same inputs should produce stable structure; heuristics must not silently invent critical facts.
8. **Do not modify user application code** as part of SetAI’s product role — SetAI generates config/context files; it is not a coding agent for the user’s app.
9. **Secrets stay local** — API keys live in `~/.setai/config.json`; generated `.setai/config.json` must remain gitignored.

## Input and errors (Current State expectations)

- Validate user-facing inputs before acting (`validator`, Inquirer validate callbacks, Zod for AI JSON).
- Prefer clear, actionable CLI errors; avoid leaking secrets in logs/output.
- Do not expose provider API keys in generated committed files.

## Out of scope for this product

- End-user authentication products (JWT/OAuth apps)
- Application databases and CRUD domain APIs
- Hosting/runtime of user apps

## Related

- Goals: `.cursor/context/project-goals.md`
- Known generator issues: `.cursor/context/known-issues.md`
- Security: `.cursor/rules/security-rules.md`
