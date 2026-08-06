# Generate Docs

Draft or update documentation for SetAI.

## Context

- `.cursor/context/architecture.md`
- `.cursor/context/tech-stack.md`
- `.cursor/context/deployment.md`
- README / `docs/` as applicable

## Instructions

1. Document only evidenced behavior.
2. Separate Current State from Planned / Recommended.
3. Include real commands/flags (`init`, `config`, `--advanced`, `--beta`, `--lang`).
4. Mention known issues when they affect users (version mismatch, CI inactive, generated locale forced to en).

## Constraints

- No invented infra (Docker/K8s/DB/REST product API).
- Prefer linking to source paths for details.

## Output

Doc sections ready to paste, with uncertainty marked.
