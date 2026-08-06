# Extract Business Rules

Extract or refine business rules for SetAI from code, goals, and behavior.

## Context

- `.cursor/rules/business-rules.md`
- `.cursor/context/project-goals.md`
- Relevant `src/` modules under discussion

## Instructions

1. List explicit product rules (core without keys, no invented facts, optional AI, etc.).
2. Separate **Current State** behavior from **Planned / Recommended**.
3. Note edge cases (AI failure, missing locale keys, overwrite of config folders).
4. Propose updates only where evidence exists.

## Constraints

- Do not import generic SaaS/API business rules.
- Mark uncertainty clearly.

## Output

Bullet rules with source pointers (file or doc).
