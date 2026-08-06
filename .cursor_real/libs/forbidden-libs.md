# Dependency Caution List

There is **no formal, evidenced deny-list policy** encoded in the repository beyond normal engineering judgment.

Do **not** invent bans. The false claim “CLI doesn't make HTTP requests” is **invalid** — optional AI providers use official SDKs that perform HTTP.

## Guidance (Recommended, not a hard registry ban)

| Avoid adding casually | Why |
|-----------------------|-----|
| Parallel CLI frameworks (Yargs, Meow, Gluegun) | Commander is already the CLI framework |
| Parallel prompt libs instead of Inquirer | Inquirer is already used |
| Handlebars / EJS / Pug for SetAI templates | Custom engine already exists |
| Jest alongside Vitest | Vitest is the test runner |
| Extra HTTP clients (Axios, raw `node-fetch`) for providers | Use existing official SDKs (`openai`, `@anthropic-ai/sdk`, `@google/generative-ai`) |
| Webpack for packaging this CLI | `tsup` is the bundler |
| Database ORMs / Redis clients | No database/cache layer in this product |

Exceptions require a concrete feature need and dependency addition to `package.json`.

## Related

- Allowed libs: `.cursor/libs/allowed-libs.md`
- Security: `.cursor/rules/security-rules.md`
