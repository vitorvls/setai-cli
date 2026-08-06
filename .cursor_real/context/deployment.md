# Deployment and Environments

## Current State — Distribution

SetAI ships as an **npm package** (`@setai/cli`), not as a hosted web service.

Typical install (from README):

```bash
npm install -g @setai/cli
# or
npx @setai/cli init
```

Build artifact: `dist/` via `tsup` (`pnpm build` / `npm run build`).  
`prepublishOnly` runs `build` + `test`. `prepack` runs `build`.

## Current State — CI

File: `.github/workflows/ci.yml`

**Status: inactive.** The entire workflow is commented out. There is **no** active GitHub Actions pipeline running tests/lint/build on PRs.

Do **not** assume:

- CI runs on every PR
- formatting is verified by CI
- merges require green CI checks

## Repository package manager

Development in this repo uses **pnpm** (`pnpm-lock.yaml`). Prefer:

```bash
pnpm install
pnpm test
pnpm build
pnpm lint
pnpm type-check
```

`npm run <script>` also works against `package.json` scripts if dependencies are installed.

## Confirmed scripts (`package.json`)

| Script | Command |
|--------|---------|
| `build` | `tsup` |
| `dev` | `tsup --watch` |
| `start` / `cli` | `node dist/index.js` |
| `lint` | `eslint . --ext .ts` |
| `lint:fix` | `eslint . --ext .ts --fix` |
| `format` | `prettier --write "**/*.{ts,js,json,md}"` |
| `format:check` | `prettier --check "**/*.{ts,js,json,md}"` |
| `type-check` | `tsc --noEmit` |
| `test` | `vitest run` |
| `test:watch` | `vitest --watch` |
| `test:coverage` | `vitest run --coverage` |
| `test:docs` | `vitest run docs/.vitepress/__tests__` |
| `docs` / `docs:dev` | `vitepress dev docs` |
| `docs:build` | `vitepress build docs` |
| `docs:serve` | `vitepress serve docs` |

## Environments (conceptual for a published CLI)

| Environment | Current meaning |
|-------------|-----------------|
| Local / development | Clone repo; `pnpm install`; `pnpm build`; run via `pnpm cli` or linked bin |
| Published package | Versions on npm registry |

There is **no** staging/production server infrastructure for this CLI in the repository.

## Planned / Recommended (not current)

- Uncomment and maintain `.github/workflows/ci.yml` (or equivalent) to run install → lint → type-check → test → build on PRs
- Align `src/index.ts` `.version()` with `package.json` before releases
- Use npm dist-tags (`latest` / `beta`) if adopting a beta channel — **not evidenced as an automated process today**

## Related

- Known issues: `.cursor/context/known-issues.md`
- Security (secrets / publish): `.cursor/rules/security-rules.md`
