# Git Rules

## Current State

- Remote / public open-source repo (see `package.json` `repository`)
- No evidenced mandatory git hooks in-repo for lint/test
- No active CI gate on merge (workflow commented)
- No documented enforced branch model (`develop` is **not** an evidenced required branch)

## Recommended convention (not enforced)

### Commits

Conventional Commits are a reasonable default for this repo:

```
<type>(<scope>): <subject>
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`.

**Domain-appropriate examples:**

```
feat(init): support overwrite confirmation for existing config folder

fix(i18n): use correct locale key for empty database choice

test(template-engine): cover unless blocks for empty placeholders

docs(readme): clarify --beta requires setai config keys
```

Avoid misleading examples from unrelated domains (e.g. JWT auth endpoints).

### Branches / PRs

**Planned / Recommended:**

- Prefer feature branches off the default branch
- Keep PRs focused
- Describe what/why/how to test

Do not claim squash-only, rebase-forbidden, or “develop required” unless the maintainers document that later.

### Do not

- Commit secrets (`~/.setai` contents, real keys in `.cursor/.setai/config.json`)
- Skip hooks with `--no-verify` if hooks are later added and required by maintainers
- Commit large unrelated generated artifacts (`coverage/`, `dist/` if not intended)

## Related

- Deployment / CI: `.cursor/context/deployment.md`
- Security: `.cursor/rules/security-rules.md`
