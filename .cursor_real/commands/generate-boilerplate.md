# Generate Boilerplate

Generate minimal boilerplate for SetAI CLI code.

## Context

- `.cursor/context/architecture.md`
- `.cursor/context/project-structure.md`
- `.cursor/rules/code-style.md`
- `.cursor/libs/allowed-libs.md`

## Instructions

1. Confirm the correct layer (command vs engine vs service vs util vs template vs locale).
2. Generate the smallest TypeScript scaffold matching existing patterns.
3. Include a corresponding Vitest stub when behavior is non-trivial.
4. Wire exports/registration only if required (`src/index.ts` for new commands).

## Constraints

- No web controllers, REST routes, ORM repositories, or Handlebars.
- Prefer existing dependencies.
- Follow ESLint/Prettier/TypeScript strictness.

## Output

Files to create/modify with brief rationale.
