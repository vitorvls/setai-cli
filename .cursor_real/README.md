# .cursor — SetAI CLI Context

Operational context for AI agents working on **@setai/cli**.

**Project type:** CLI Tool / Developer Tool  
**Purpose:** Generate IDE configuration/context structures for AI-assisted development.

## How to use this folder

1. Read `rules/` first (constraints).
2. Read `context/` for architecture, stack, goals, and known issues.
3. Check `libs/` before suggesting dependencies.
4. Use `commands/` as task prompts (they reference context; they do not redefine the stack).

## Layout

| Path | Role |
|------|------|
| `context/` | Current state: architecture, stack, goals, deployment, structure, known issues |
| `rules/` | Hard rules for agents (style, tests, git, security, AI usage, business) |
| `libs/` | Current dependencies and dependency guidance |
| `commands/` | Reusable agent prompts |
| `.setai/` | Local SetAI config copy (gitignored secrets; see its README) |

## Labels used in this context

- **Current State** — evidenced in the repository
- **Explicit Project Constraint** — product principle / intentional constraint
- **Known Issue** — real issue agents should account for
- **Planned / Recommended** — not implemented; do not treat as current behavior

## Source of truth hierarchy

1. Implementation under `src/`
2. Config files (`package.json`, lockfile, tsconfig, eslint, vitest, tsup)
3. Tests
4. Scripts
5. Repo structure
6. Maintained docs / README
7. Explicit constraints in this folder
8. Conservative inference only when labeled

If documentation and code diverge, **code wins** for describing current behavior.
