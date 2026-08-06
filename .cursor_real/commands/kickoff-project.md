# Kickoff Project

Align understanding before implementing a feature in **SetAI CLI**.

## Context

Read first:

- `.cursor/context/project-goals.md`
- `.cursor/context/architecture.md`
- `.cursor/context/project-structure.md`
- `.cursor/context/known-issues.md`

**Type:** CLI Tool / Developer Tool (not a web/REST app).

## Instructions

1. Restate the problem and affected users.
2. List functional requirements for the CLI/generator change.
3. List non-functional constraints (determinism, no required API keys for core path, i18n, tests).
4. Identify risks (template hallucination, i18n key bugs, version drift, inactive CI).
5. Propose a high-level approach pointing at real modules (`commands/`, `engines/`, `templates/`, `locales/`).

## Constraints

- Do not generate application CRUD/REST scaffolding.
- Do not invent databases or infra.
- No code until understanding is approved.

## Output

Structured: requirements, constraints, risks, proposed touch points (file paths).
