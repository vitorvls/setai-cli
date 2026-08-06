# Known Issues

Issues evidenced in the repository that affect development. Not a full bug tracker.

## 1. Version mismatch (CLI vs package)

- `package.json` → `0.1.2`
- `src/index.ts` → `.version('0.1.0')`

`setai --version` / Commander help can disagree with the published package version.

## 2. CI workflow inactive

`.github/workflows/ci.yml` exists but is **fully commented**. No automated PR checks from that file.

## 3. i18n missing-key fallback returns the key

In `src/utils/i18n.ts`, `t(key)` returns `key` when the lookup fails. Incorrect keys such as `templates.other` / `templates.none` (if used) can surface literally in UI answers and generated context.

Related: `locales/*/templates.json` uses keys like `other` and `none` (not `templates.other`). Call sites that pass the wrong key produce literal leaks.

## 4. Generated files locale forced to English

In `src/commands/init.ts`, `filesLocale` is set to `'en'` regardless of `--lang`. Question locale can be pt-BR/en/es; written templates currently come from the English template tree.

## 5. Template helpers default toward web/API shapes

`src/engines/template-helpers.ts` infers project type / architecture with web-oriented defaults (e.g. “Layered Architecture”, REST-oriented branches when keywords match). Combined with REST-oriented `{{else}}` blocks in `templates/.cursor.en/context/architecture.md.template`, **generated context for non-web projects can invent API/DB architecture**.

This is why this repo’s `.cursor` was manually corrected into a golden reference — do not trust unreviewed generator output as ground truth for architecture.

## 6. Validator does not check stack consistency

`src/engines/validator.ts` validates required fields; it does not reject invalid i18n literals or CLI+database inconsistencies.

## Related

- Architecture: `.cursor/context/architecture.md`
- Business rules (anti-hallucination): `.cursor/rules/business-rules.md`
