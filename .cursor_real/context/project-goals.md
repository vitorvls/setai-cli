# Project Goals

## Current State — Product

**Name:** SetAI CLI (`@setai/cli`)  
**Type:** CLI Tool / Developer Tool  
**License:** MIT

**Problem:** Structuring and maintaining reliable technical context for AI agents is hard. Incomplete or invented context causes wrong decisions and rework.

**What SetAI does:** Automates creation of an organized base of documentation, rules, architecture notes, patterns, and project information so agents (e.g. Cursor) can work with higher precision.

**What SetAI does not do (non-goals):**

- Develop or modify the user's application code as a coding agent
- Invent missing facts and present them as project truth
- Replace Cursor or other coding agents
- Require external AI to perform its **core** generation path

## Explicit Project Constraints

1. **Core generation is local and deterministic** — main `setai init` must work without API keys or external AI services.
2. **Unproven information must not be presented as fact** in generated context.
3. **IA enrichment is optional** (`--beta`) and needs configured provider keys.
4. **Open source / free for main functionality** — no subscription required for core CLI use.
5. **Multi-stack target projects** — the CLI itself is TypeScript/Node; it generates context for user projects of various stacks.
6. **Useful on first run** — reduce need for heavy manual audits after generation.

## Primary users

Developers and teams using AI agents who need structured, trustworthy project context.

## Related

- Business rules: `.cursor/rules/business-rules.md`
- Architecture: `.cursor/context/architecture.md`
- Known issues: `.cursor/context/known-issues.md`
