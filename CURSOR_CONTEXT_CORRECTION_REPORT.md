# CURSOR_CONTEXT_CORRECTION_REPORT

**Date:** 2026-08-05  
**Scope:** Manual correction of `.cursor/` only (golden reference)  
**Baseline:** `CURSOR_CONTEXT_AUDIT_V1.md` (3.2/10)  
**Generator code:** **not modified** (`src/`, `templates/`, `locales/`, `package.json` untouched)

---

## 1. Resumo das mudanças

A `.cursor` foi reescrita como **source of truth operacional** alinhada ao repositório real:

- Tipo corrigido para **CLI Tool / Developer Tool**
- Arquitetura real documentada (commands → engines → services → templates → files)
- Stack e libs derivadas de `package.json`
- Segurança restrita a concerns de CLI (API keys, paths, `--beta`)
- CI documentado como **inativo** (workflow comentado)
- IA opcional separada do core determinístico
- Template engine próprio documentado (não Handlebars)
- i18n, estrutura de navegação e known issues adicionados
- Commands enxutos com referências a `context/` (sem stack inventada)
- Ruído removido (catálogo de modelos, REST/JWT/SQL, placeholders)

---

## 2. Arquivos alterados

Todos sob `.cursor/` (pasta gitignored no repo; conteúdo atualizado no disco):

| Arquivo | Ação |
|---------|------|
| `README.md` | Reescrito |
| `context/architecture.md` | Reescrito |
| `context/tech-stack.md` | Reescrito |
| `context/project-goals.md` | Reescrito |
| `context/deployment.md` | Reescrito |
| `context/project-structure.md` | **Criado** |
| `context/known-issues.md` | **Criado** |
| `rules/business-rules.md` | Reescrito |
| `rules/security-rules.md` | Reescrito |
| `rules/testing-rules.md` | Reescrito |
| `rules/code-style.md` | Reescrito |
| `rules/git-rules.md` | Reescrito |
| `rules/ai-usage-rules.md` | Reescrito |
| `libs/allowed-libs.md` | Reescrito |
| `libs/forbidden-libs.md` | Reescrito (lista cautelar mínima) |
| `libs/ai-providers.md` | **Criado** (substitui catálogo de modelos) |
| `libs/ai-models.md` | **Removido** |
| `commands/*.md` (10) | Reescritos |
| `.setai/README.md` | Reescrito |
| `.setai/.gitignore` | Mantido |
| `.setai/config.json` | Mantido (placeholders locais) |

---

## 3. Arquivos removidos / criados

**Removidos**

- `.cursor/libs/ai-models.md` — catálogo genérico de modelos (Claude 4.5 / GPT-5.x etc.) sem vínculo com comportamento implementado

**Criados**

- `.cursor/context/project-structure.md` — mapa “onde alterar X”
- `.cursor/context/known-issues.md` — issues reais que afetam desenvolvimento
- `.cursor/libs/ai-providers.md` — providers SDK reais e papel do `--beta`

---

## 4. Problemas CRITICAL da V1 — resolução

| ID | Problema | Resolução |
|----|----------|-----------|
| C-01 | `templates.other` / `templates.none` como stack | Removidos como fatos. Só restam menções em `known-issues.md` documentando o **bug de i18n** |
| C-02 | Layered REST / DB SoT / Repository | Removidos. `architecture.md` descreve pipeline CLI real com paths |
| C-03 | Security JWT/SQL/XSS/CORS… | Removidos como regras aplicáveis; `security-rules.md` cobre keys, FS, `--beta` |
| C-04 | Type Application + CRUD APIs | Tipo = CLI Tool; commands proíbem scaffolding REST/CRUD |

---

## 5. Problemas HIGH da V1 — resolução

| Problema | Resolução |
|----------|-----------|
| Versão `0.0.1` / ambígua | Documentada divergência `package.json 0.1.2` vs `src/index.ts 0.1.0` |
| Handlebars / read-pkg / etc. as adopted | Removidos de allowed; explicitamente “not current” |
| Axios “CLI doesn't make HTTP” | Removido; forbidden virou caution list honestamente limitada |
| SDKs AI ausentes | Documentados em tech-stack, allowed-libs, ai-providers |
| CI como ativo | Documentado inativo; labels Planned/Recommended |
| TDD absoluto | Preferência, sem gate evidenciado |
| `{{TEST_COVERAGE}}` | Eliminado |

---

## 6. Missing contexts adicionados

- Pipeline real de `setai init` / flags
- Mapa `src/` engines/services/providers
- Template engine custom + sintaxe
- i18n (`locales/*`, fallback de chave)
- Providers e fronteira core vs `--beta`
- VitePress / scripts reais
- pnpm como package manager do repo
- Navegação “onde mudar X”
- Known issues (versão, CI, i18n, helpers, filesLocale=en)

---

## 7. Conteúdo genérico removido

- Arquitetura REST vs GraphQL / trade-offs websockets
- Catálogo de modelos de chat
- Security checklist web (uploads, CSP, password hashing, DB SSL)
- Edge cases de transactions/rate limiting em business rules
- Blocos duplicados de Project/Stack/Goals em 10 commands
- Placeholders `[To be defined …]` como conteúdo de seção
- Exemplos JWT em git rules
- Afirmações “CI verifies formatting / blocks merge”

---

## 8. Arquitetura final documentada

```
src/index.ts (Commander)
  → commands/init.ts | config.ts
  → engines/ (questions, advanced, ide, validator, template-engine, helpers, file-generator)
  → services/ai-service + providers (opcional --beta)
  → templates/ + locales/
  → escrita em pasta IDE (.cursor / .vscode / .idea / custom)
```

Sem database, sem API HTTP de produto, sem layered REST.

---

## 9. Stack final documentada

TypeScript + Node ≥18 + Commander + Inquirer + fs-extra + chalk + ora + zod + SDKs OpenAI/Anthropic/Google + tsup + Vitest + ESLint + Prettier + VitePress + pnpm (dev) + npm publish (`@setai/cli`).

Framework web: nenhum. Database: nenhum.

---

## 10. Known issues preservados

Em `.cursor/context/known-issues.md`:

1. Version mismatch package vs CLI  
2. CI comentado/inativo  
3. i18n fallback retorna a chave  
4. `filesLocale` forçado para `en`  
5. Helpers/templates enviesados para web/API  
6. Validator não checa consistência de stack  

---

## 11. Decisões de redução de ruído

- Commands só referenciam context (sem repetir stack)
- `ai-models.md` → `ai-providers.md` focado no produto
- `forbidden-libs` sem política inventada
- Labels FACT / Known Issue / Planned usados onde evitam ambiguidade
- Seções sem evidência removidas em vez de preenchidas com defaults

---

## 12. Resultado da autoauditoria

Buscas em `.cursor/**` (exceto secrets em config):

| Padrão | Resultado |
|--------|-----------|
| `templates.other` / `templates.none` | Apenas em `known-issues.md` (documentação do bug) — **não** como stack |
| `{{` | Apenas documentando sintaxe real do template engine |
| `[To be defined` | Apenas documentando tratamento falsy no engine |
| JWT / SQL / XSS / CORS / GraphQL / REST / CRUD | Apenas em negações (“not”, “do not”, “is not”) ou known-issues |
| Playwright / Cypress / Handlebars | Apenas como **não adotados** |
| `Repository Pattern` / `database as` (SoT) | **Zero** ocorrências |
| Placeholder `{{TEST_COVERAGE}}` | **Zero** |

Verificações manuais: paths citados existem; scripts batem com `package.json`; CI descrito como inativo; providers batem com deps.

---

## 13. Problemas que ainda permanecem

*Dentro da `.cursor` (contexto):* nenhum CRITICAL da V1 residual como “fato falso”.

*No gerador (fora de escopo desta correção — intencional):*

- Bug i18n `t('templates.*')` ainda no código
- Helpers/templates ainda podem regenerar lixo se `setai init` for rodado de novo sobrepondo esta pasta
- CI continua inativo no repo
- Divergência de versão no código permanece

**Atenção:** `.cursor/` está no `.gitignore`. Esta correção é o **golden reference em disco**; regenerar com o SetAI atual pode sobrescrever e degradar a qualidade.

---

## 14. Estimativa honesta da qualidade final

| Categoria (pesos da V1) | Estimativa |
|-------------------------|------------|
| Fidelidade factual | ~9.4 |
| Cobertura | ~9.2 |
| Ausência de alucinações | ~9.5 |
| Consistência interna | ~9.3 |
| Utilidade para agentes | ~9.3 |
| Sinal/ruído | ~9.0 |
| Rastreabilidade | ~9.2 |
| **Estimativa ponderada** | **~9.3 / 10.0** |

Esta estimativa **não substitui** a Auditoria V2 independente.

---

## 15. Confirmação — gerador intocado

Confirmado: **nenhum arquivo** de `src/`, `templates/`, `locales/`, `package.json`, lockfile, CI, ou configs de build/test foi modificado neste passo.

Únicos artefatos fora de `.cursor/`:

- `CURSOR_CONTEXT_AUDIT_V1.md` (já existia / baseline)
- `CURSOR_CONTEXT_CORRECTION_REPORT.md` (este relatório)

---

*Golden reference pronto para comparação futura: OUTPUT ORIGINAL → CONTEXTO CORRIGIDO → OUTPUT APÓS REFATORAÇÃO DO SETAI.*
