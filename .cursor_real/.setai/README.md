# SetAI local config copy

This folder is produced by `setai init` as a **reference copy** of CLI configuration used at generation time.

## Canonical config location

Real keys used by the CLI live at:

- Windows: `%USERPROFILE%\.setai\config.json`
- macOS/Linux: `~/.setai/config.json`

Managed via `setai config` (`src/config/config-manager.ts`).

## Contents

| File | Role |
|------|------|
| `config.json` | May contain API keys or placeholders — **do not commit secrets** |
| `.gitignore` | Ignores `config.json` |

## Security

- Treat any real API key here as sensitive.
- Values may be placeholders (e.g. `openai-key`) depending on what was configured when files were generated.
- Prefer editing keys through `setai config` / `~/.setai`, not by committing this copy.
