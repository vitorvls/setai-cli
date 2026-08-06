# CURSOR_CONTEXT_AUDIT_V1 — Baseline Audit

**Projeto auditado:** `@setai/cli` (repositório `setai-cli`)  
**Objeto:** pasta `.cursor/` gerada pelo próprio SetAI CLI  
**Data da auditoria:** 2026-08-05  
**Escopo:** somente investigação e classificação — nenhum arquivo em `.cursor/` ou no código-fonte foi alterado  
**Tipo:** BASELINE (output original do SetAI)

---

## 1. Executive Summary

A pasta `.cursor` gerada pelo SetAI **não representa fielmente** o projeto real. Há conteúdo útil (objetivos de negócio, algumas libs CLI reais, processo npm), mas o núcleo operacional para agentes — stack, arquitetura, segurança, tipo de projeto e restrições de dependências — está **contaminado por leaks de template, fallbacks genéricos de API REST e chaves i18n quebradas**.

Os sintomas mais graves:

1. Framework e database aparecem literalmente como `templates.other` e `templates.none`.
2. Uma CLI Node/TypeScript é documentada como **Layered Architecture + RESTful API + Database as Source of Truth**.
3. Regras de segurança falam em JWT, SQL injection, XSS, CORS, rate limiting e uploads — sem qualquer implementação correspondente.
4. `allowed-libs` / `forbidden-libs` misturam libs reais com libs ausentes e proíbem HTTP clients com a justificativa falsa de que “CLI doesn't make HTTP requests”, enquanto o projeto depende de SDKs OpenAI/Anthropic/Google.
5. Componentes reais (`engines/`, `services/providers/`, i18n, template engine próprio, modos `--advanced`/`--beta`) estão quase ausentes do contexto.

**Veredito:** o contexto atual é perigoso como source of truth operacional para agentes. Pode induzir decisões arquiteturais erradas.

---

## 2. Nota final

### **3.2 / 10.0**

Não atende o critério de 9+/10. Há informação falsa importante, tecnologias inventadas/mal rotuladas, recomendações apresentadas como estado atual, cobertura baixa da arquitetura real e ruído elevado.

---

## 3. Score detalhado por categoria

| # | Categoria | Peso | Nota | Ponderado | Justificativa resumida |
|---|-----------|------|------|-----------|------------------------|
| 1 | Fidelidade factual | 25% | **3.5** | 0.875 | Goals/negócio ok; stack/arquitetura/segurança majoritariamente errados |
| 2 | Cobertura | 15% | **3.2** | 0.480 | Falta estrutura `src/`, providers, engines, i18n, fluxo CLI real |
| 3 | Ausência de alucinações | 20% | **2.5** | 0.500 | `templates.*`, REST/DB, JWT/SQL, modelos genéricos, CI inventado |
| 4 | Consistência interna | 10% | **3.5** | 0.350 | CLI vs REST; “sem HTTP” vs SDKs; TDD absoluto vs realidade |
| 5 | Utilidade para agentes | 15% | **2.8** | 0.420 | Induz implementação errada; localizar mudanças reais é difícil |
| 6 | Relação sinal/ruído | 10% | **3.0** | 0.300 | Muitos `[To be defined]`, segurança genérica, models marketing |
| 7 | Rastreabilidade | 5% | **3.5** | 0.175 | Cross-refs internas em `.cursor`; pouca ligação a código real |
| | **TOTAL** | 100% | | **3.100 → 3.2** | |

---

## 4. Metodologia

1. **Inventário completo** de `.cursor/` via filesystem (27 arquivos).
2. **Source of truth** construída a partir de `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `tsup.config.ts`, `vitest.config.ts`, `eslint.config.mjs`, `.prettierrc`, `src/**`, `templates/**`, `locales/**`, `README.md`, `.github/workflows/ci.yml`, ausência de Docker/DB.
3. **Validação factual** afirmação por afirmação relevante, com classificação CONFIRMADA / PARCIAL / NÃO COMPROVADA / INCORRETA / DESATUALIZADA / RECOMENDAÇÃO-COMO-FATO / TEMPLATE LEAK.
4. **Auditoria agressiva** de padrões tipicamente inventados (Redis, JWT, K8s, GraphQL, CI, etc.).
5. **Validação de comandos/paths** contra scripts reais.
6. **Comparação arquitetural** código observado vs documentação gerada.
7. **Root-cause** no gerador: `question-engine`, `i18n`, `template-helpers`, `template-engine`, templates em `templates/.cursor.en/`.
8. Princípio: ausência de evidência ⇒ não é fato; implementação prevalece sobre documentação.

---

## 5. Inventário da `.cursor`

### Árvore

```
.cursor/
├── README.md
├── .setai/
│   ├── .gitignore
│   ├── config.json
│   └── README.md
├── commands/          (10)
│   ├── architecture-review.md
│   ├── challenge-solution.md
│   ├── extract-business-rules.md
│   ├── generate-boilerplate.md
│   ├── generate-docs.md
│   ├── kickoff-project.md
│   ├── pre-deploy-validation.md
│   ├── refactor-controlled.md
│   ├── review-pr.md
│   └── test-strategy.md
├── context/           (4)
│   ├── architecture.md
│   ├── deployment.md
│   ├── project-goals.md
│   └── tech-stack.md
├── libs/              (3)
│   ├── ai-models.md
│   ├── allowed-libs.md
│   └── forbidden-libs.md
└── rules/             (6)
    ├── ai-usage-rules.md
    ├── business-rules.md
    ├── code-style.md
    ├── git-rules.md
    ├── security-rules.md
    └── testing-rules.md
```

**Total de arquivos:** 27  
**Diretórios:** 5 (`commands`, `context`, `libs`, `rules`, `.setai`)

### Temas cobertos pelo inventário

| Tema | Presente em `.cursor`? | Qualidade observada |
|------|------------------------|---------------------|
| Regras / convenções | Sim | Mistura útil + genérico |
| Documentação de contexto | Sim | Goals bons; arquitetura ruim |
| Stack | Sim | Corrompida (`templates.*`, versão errada) |
| Comandos/workflows agentes | Sim | Prompts genéricos com stack errada |
| Arquitetura | Sim | **Incorreta** (REST/layered) |
| Infra / deploy | Sim | Parcialmente útil (npm); CI inventado |
| Segurança | Sim | Genérica de API web |
| Banco / auth | Sim (mencionado) | Inventado / placeholder |
| CI/CD | Sim (mencionado) | Recomendação como se existisse |
| Observabilidade | Parcial | Placeholders / npm stats |
| Testes | Sim | TDD absoluto + placeholder `{{TEST_COVERAGE}}` |
| Integrações externas | Quase ausente | SDKs AI reais não documentados como deps |

---

## 6. Estado real identificado do projeto

### Identidade

| Campo | Valor real |
|-------|------------|
| Nome | `@setai/cli` |
| Versão | `0.1.2` (`package.json`); CLI hardcoda `0.1.0` em `src/index.ts` |
| Descrição | CLI para gerar estrutura de configuração `.cursor` para desenvolvimento assistido por IA |
| Licença | MIT |
| Engines | Node `>=18` |
| Module | ESM |
| Package manager do repo | **pnpm** (`pnpm-lock.yaml`; sem `package-lock.json`) |
| Bin | `setai` → `./dist/index.js` |

### Stack real (evidência: `package.json`)

**Runtime/deps:** TypeScript, Node.js, Commander, Inquirer, fs-extra, chalk, ora, zod, `@anthropic-ai/sdk`, `@google/generative-ai`, `openai`.

**Dev:** tsup, vitest, eslint flat config, prettier, vitepress, typescript.

**Não presentes:** Handlebars, read-pkg, error-stack-parser, Axios, Jest, Playwright, Redis, PostgreSQL/MongoDB, Docker, GraphQL server, JWT/OAuth/RBAC app layer.

### Arquitetura observada

CLI modular:

```
src/index.ts (Commander)
  → commands/init.ts | config.ts
  → engines/ (question, advanced-groups, ide-selector, validator, template-engine, template-helpers, file-generator)
  → services/ai-service.ts + providers/{openai,anthropic,google}
  → config/config-manager.ts (~/.setai/config.json)
  → utils/ (i18n, retry, json-validator, output)
  → types/
```

**Não é** Layered REST (routes/controllers/services/data access).  
**Não há** database como source of truth.  
Source of truth operacional do produto: respostas do usuário + templates + (opcional) IA `--beta` → arquivos gerados.

### Infra real

| Item | Estado |
|------|--------|
| Docker / K8s | Ausente |
| Database | Ausente |
| CI GitHub Actions | Arquivo `.github/workflows/ci.yml` **inteiro comentado** — CI não ativo |
| Docs site | VitePress em `docs/` |
| Distribuição | Pacote npm (`publishConfig.access: public`) |
| Branch `develop` | Não encontrada como branch local relevante no momento da auditoria |

### Scripts reais (`package.json`)

`build`, `dev`, `start`, `cli`, `lint`, `lint:fix`, `format`, `format:check`, `type-check`, `test`, `test:watch`, `test:coverage`, `test:docs`, `docs*`, `prepublishOnly`, `prepack`.

---

## 7. Métricas da auditoria

| Métrica | Valor | % (sobre afirmações verificadas) |
|---------|------:|----------------------------------:|
| Arquivos auditados em `.cursor` | **27** | — |
| Afirmações relevantes verificadas | **128** | 100% |
| Confirmadas | **28** | 21.9% |
| Parcialmente confirmadas | **19** | 14.8% |
| Não comprovadas | **14** | 10.9% |
| Incorretas | **32** | 25.0% |
| Desatualizadas | **4** | 3.1% |
| Recommendations-as-fact | **18** | 14.1% |
| Template leaks | **22** | 17.2%* |
| Broken references | **3** | 2.3% |
| Missing contexts (itens-chave ausentes) | **16** | — |
| Redundâncias / noise (blocos) | **12** | — |
| Ocorrências literais `templates.other`/`templates.none` | **≥23** | — |
| Ocorrências `[To be defined` | **23** | — |

\*Template leaks podem sobrepor outras categorias (ex.: leak + incorreta).

---

## 8. Achados CRITICAL

### C-01 — Framework/Database literais `templates.other` / `templates.none`

| Campo | Valor |
|-------|-------|
| Arquivos | `context/architecture.md`, `context/tech-stack.md`, `libs/ai-models.md`, `rules/code-style.md`, `rules/security-rules.md`, **todos os 10** `commands/*.md` (linha de Stack) |
| Afirmação | Stack = TypeScript + `templates.other` + `templates.none`; DB = `templates.none`; framework = `templates.other` |
| Classificação | INCORRETA + TEMPLATE LEAK + HALLUCINATION |
| Categorias | `FACTUAL_ERROR`, `TEMPLATE_LEAK`, `HALLUCINATION`, `BROKEN_REFERENCE` (chave i18n) |
| Severidade | **CRITICAL** |
| Evidência repo | `locales/en/templates.json` tem chaves `other`/`none`, não `templates.other`/`templates.none`. `src/engines/question-engine.ts` L213–238 chama `t('templates.other')` / `t('templates.none')`. `src/utils/i18n.ts` retorna a própria chave se não achar. Projeto não tem framework web nem database. |
| Estado correto | Framework: nenhum / N/A (CLI); Database: nenhum / N/A |

### C-02 — Arquitetura REST/Layered inventada para CLI

| Campo | Valor |
|-------|-------|
| Arquivo | `context/architecture.md` (§2, §9) |
| Afirmação | Layered Architecture (routes/controllers/services/data access); RESTful API; Stateless API; Database as Source of Truth; Repository Pattern; trade-off REST vs GraphQL |
| Classificação | INCORRETA + RECOMMENDATION_AS_FACT + TEMPLATE LEAK |
| Categorias | `FACTUAL_ERROR`, `HALLUCINATION`, `RECOMMENDATION_AS_FACT`, `TEMPLATE_LEAK` |
| Severidade | **CRITICAL** |
| Evidência | Código real = CLI commands/engines/services (`src/index.ts`, `src/commands/`, `src/engines/`). Sem routes/controllers, sem endpoints REST, sem DB. Template else em `templates/.cursor.en/context/architecture.md.template` L40–77 hardcoda REST. Fallback `inferArchitecturalStyle` → `"Layered Architecture"` (`template-helpers.ts` L99–110). |
| Estado correto | Arquitetura modular de CLI: entry Commander → commands → engines → services/providers → file generation |

### C-03 — Segurança de API/DB aplicada a CLI sem DB/auth

| Campo | Valor |
|-------|-------|
| Arquivo | `rules/security-rules.md` |
| Afirmação | Auth JWT/OAuth/sessions; SQL injection; parameterized queries; XSS/CSP; CORS; rate limiting; file uploads; password hashing; HTTPS; Sentry; Database `templates.none` com SSL |
| Classificação | INCORRETA / RECOMMENDATION_AS_FACT / TEMPLATE LEAK |
| Categorias | `HALLUCINATION`, `RECOMMENDATION_AS_FACT`, `MISPLACED_INFORMATION`, `NOISE` |
| Severidade | **CRITICAL** |
| Evidência | Sem DB, sem servidor HTTP, sem auth de usuários finais. Segurança real relevante: API keys em `~/.setai`, não commitar secrets, validação de inputs CLI (zod/inquirer). |
| Estado correto | Regras de CLI: secrets locais, validação de prompts, sanitização de paths, cuidado com providers externos |

### C-04 — Tipo de projeto “Application” + indução a CRUD APIs

| Campo | Valor |
|-------|-------|
| Arquivos | `commands/*`, `libs/ai-models.md`, `rules/ai-usage-rules.md` (“Implement CRUD APIs”) |
| Afirmação | Type: Application; AI pode implementar CRUD APIs |
| Classificação | INCORRETA / AMBÍGUA |
| Categorias | `FACTUAL_ERROR`, `UNSUPPORTED_INFERENCE`, `AMBIGUOUS_INFORMATION` |
| Severidade | **CRITICAL** |
| Evidência | É uma CLI (`bin.setai`, `src/index.ts`). `inferProjectType` não tem branch CLI e defaulta `"Application"` (`template-helpers.ts` L78–94). |
| Estado correto | Tipo: CLI Tool / Developer Tool |

---

## 9. Achados HIGH

### H-01 — Versão `0.0.1` no tech-stack

| Campo | Valor |
|-------|-------|
| Arquivo | `context/tech-stack.md` L18 |
| Afirmação | Version: `0.0.1` sob Language & Runtime |
| Classificação | INCORRETA / DESATUALIZADA / AMBÍGUA |
| Categorias | `FACTUAL_ERROR`, `STALE_INFORMATION`, `AMBIGUOUS_INFORMATION` |
| Severidade | **HIGH** |
| Evidência | `package.json` → `0.1.2`; `src/index.ts` → `.version('0.1.0')`; default pergunta = `0.1.0` (`question-engine.ts` L196). Campo rotulado junto a Language/Runtime (parece Node version). |
| Estado correto | Versão do projeto `0.1.2`; runtime Node `>=18`; não confundir os dois |

### H-02 — Handlebars / read-pkg / error-stack-parser / mock-fs como allowed

| Campo | Valor |
|-------|-------|
| Arquivo | `libs/allowed-libs.md` |
| Afirmação | Handlebars, read-pkg, error-stack-parser, mock-fs permitidos/sugeridos |
| Classificação | NÃO COMPROVADA / RECOMMENDATION_AS_FACT |
| Categorias | `UNSUPPORTED_INFERENCE`, `RECOMMENDATION_AS_FACT`, `TEMPLATE_LEAK` |
| Severidade | **HIGH** |
| Evidência | Ausentes de `package.json` dependencies/devDependencies. Template engine próprio em `src/engines/template-engine.ts` (sintaxe `{{KEY}}`, não Handlebars). |
| Estado correto | Listar apenas deps reais ou marcar explicitamente como “candidatas não adotadas” |

### H-03 — Axios/node-fetch proibidos com razão falsa

| Campo | Valor |
|-------|-------|
| Arquivo | `libs/forbidden-libs.md` L100–109 |
| Afirmação | “CLI doesn't make HTTP requests” / “We don't need HTTP client” |
| Classificação | INCORRETA |
| Categorias | `FACTUAL_ERROR`, `CONTRADICTION` |
| Severidade | **HIGH** |
| Evidência | Deps `@anthropic-ai/sdk`, `openai`, `@google/generative-ai` fazem HTTP. AI service em `src/services/`. |
| Estado correto | HTTP via SDKs oficiais é parte do produto (`--beta` / config); proibir Axios pode ser política, mas a razão atual é falsa |

### H-04 — SDKs de IA reais ausentes em allowed-libs

| Campo | Valor |
|-------|-------|
| Arquivo | `libs/allowed-libs.md` |
| Afirmação (por omissão) | Lista CLI libs sem openai/anthropic/google |
| Classificação | MISSING_CONTEXT |
| Categorias | `MISSING_CONTEXT` |
| Severidade | **HIGH** |
| Evidência | Presentes em `package.json` dependencies |
| Estado correto | Documentar providers e quando são necessários (`setai config`, `--beta`) |

### H-05 — CI/CD GitHub Actions tratado como pipeline do projeto

| Campo | Valor |
|-------|-------|
| Arquivos | `context/deployment.md`, `context/architecture.md`, `rules/code-style.md`, `rules/testing-rules.md`, `rules/git-rules.md` |
| Afirmação | GitHub Actions (recommended)…; formatting verified in CI/CD; tests run on every PR; CI checks before merge |
| Classificação | RECOMMENDATION_AS_FACT / PARCIAL |
| Categorias | `RECOMMENDATION_AS_FACT`, `STALE_INFORMATION`, `UNSUPPORTED_INFERENCE` |
| Severidade | **HIGH** |
| Evidência | `.github/workflows/ci.yml` existe mas **todo comentado**. `inferCICDTool()` sempre retorna string fixa (`template-helpers.ts` L242–244). |
| Estado correto | CI planejado/comentado; não ativo. Distinguir recomendação de fato |

### H-06 — TDD obrigatório absoluto

| Campo | Valor |
|-------|-------|
| Arquivos | `rules/testing-rules.md`, `rules/code-style.md` |
| Afirmação | TDD MANDATORY; NEVER write code without test first |
| Classificação | RECOMMENDATION_AS_FACT / PARCIAL |
| Categorias | `RECOMMENDATION_AS_FACT`, `OVER_SPECIFICATION` |
| Severidade | **HIGH** |
| Evidência | Preferência `useTDD` default `true` no question engine; há suite Vitest ampla, mas não há evidência de enforcement processual (hooks/CI) que prove TDD obrigatório em todo o histórico |
| Estado correto | Preferência do projeto / meta; não apresentar como lei física sem enforcement |

### H-07 — Placeholder não substituído `{{TEST_COVERAGE}}`

| Campo | Valor |
|-------|-------|
| Arquivo | `rules/testing-rules.md` L82 |
| Afirmação | Minimum: `{{TEST_COVERAGE}}` |
| Classificação | BROKEN_REFERENCE |
| Categorias | `BROKEN_REFERENCE`, `TEMPLATE_LEAK` |
| Severidade | **HIGH** |
| Evidência | Variável não resolvida no arquivo gerado; mais abaixo o mesmo arquivo afirma Overall 70% |
| Estado correto | Valor concreto ou remoção do placeholder |

---

## 10. Achados MEDIUM

### M-01 — Muitos `[To be defined]` tratados como conteúdo

| Arquivos | `architecture.md`, `security-rules.md`, partes de `deployment.md` |
| Classificação | TEMPLATE LEAK / NOISE / AMBÍGUO |
| Categorias | `NOISE`, `AMBIGUOUS_INFORMATION`, `MISSING_CONTEXT` |
| Severidade | **MEDIUM** |
| Contagem | 23 ocorrências |
| Problema | Placeholders longos passam pelo motor como “conteúdo válido”, preenchendo seções que agentes podem interpretar como estado intencional |

### M-02 — Modelos AI marketing (Claude 4.5 / GPT-5.x / Gemini 3) como política do projeto

| Arquivos | `libs/ai-models.md`, `rules/ai-usage-rules.md` |
| Classificação | RECOMMENDATION_AS_FACT / NÃO COMPROVADA |
| Categorias | `RECOMMENDATION_AS_FACT`, `TEMPLATE_LEAK`, `UNSUPPORTED_INFERENCE` |
| Severidade | **MEDIUM** |
| Evidência | Defaults hardcoded em `template-engine.ts` (~L491+) e choices em `advanced-groups-collector` / `locales/*/templates.json`. Não há política oficial versionada no código do produto além do template gerado. Providers reais usam modelos da API configurada pelo usuário |

### M-03 — Git rules com exemplo JWT e branch `develop`

| Arquivo | `rules/git-rules.md` |
| Afirmação | Exemplo `feat(auth): add JWT authentication`; branch `develop` |
| Classificação | TEMPLATE LEAK / NÃO COMPROVADA |
| Categorias | `TEMPLATE_LEAK`, `UNSUPPORTED_INFERENCE`, `NOISE` |
| Severidade | **MEDIUM** |
| Evidência | Projeto sem auth JWT; branch develop não verificada como fluxo ativo |

### M-04 — Business rules genéricas (transactions, rate limiting, empty array APIs)

| Arquivo | `rules/business-rules.md` |
| Classificação | TEMPLATE LEAK / MISPLACED |
| Categorias | `TEMPLATE_LEAK`, `MISPLACED_INFORMATION`, `NOISE` |
| Severidade | **MEDIUM** |
| Problema | Seção “Specific Business Rules” vazia; edge cases de API/DB. Ironia: goals dizem “não inventar informações”, mas o gerador inventa arquitetura |

### M-05 — `code-style.md`: comments pt-BR vs código EN; verificação CI

| Arquivo | `rules/code-style.md` |
| Classificação | PARCIAL / RECOMMENDATION_AS_FACT |
| Categorias | `RECOMMENDATION_AS_FACT`, `AMBIGUOUS_INFORMATION` |
| Severidade | **MEDIUM** |
| Evidência | ESLint/Prettier/TS existem de fato; “Formatting is verified in CI/CD” não — CI comentado. Convenção comments pt-BR precisa ser validada amostralmente no código (há mistura docs PT/EN) |

### M-06 — `.setai/README.md` alerta “real API keys” vs keys placeholder

| Arquivos | `.setai/README.md`, `.setai/config.json` |
| Afirmação | Contém API keys reais |
| Classificação | PARCIAL / CONTRADICTION |
| Categorias | `CONTRADICTION`, `AMBIGUOUS_INFORMATION` |
| Severidade | **MEDIUM** |
| Evidência | `config.json` contém `"anthropic-key"`, `"google-key"`, `"openai-key"` (placeholders). README global de `.setai` afirma keys reais. Config canônica é `~/.setai/config.json` |

### M-07 — Deployment mistura fatos npm úteis com pipeline fictício

| Arquivo | `context/deployment.md` |
| Classificação | PARCIAL |
| Categorias | `RECOMMENDATION_AS_FACT`, `UNSUPPORTED_INFERENCE` |
| Severidade | **MEDIUM** |
| O que é bom | Publish npm, tags beta/latest, checklist de versão — alinhado a CLI npm |
| O que é ruim | Pipeline CI automático, secrets GitHub, stages como fatos |

### M-08 — E2E Playwright/Cypress e API endpoints na estratégia de testes

| Arquivo | `rules/testing-rules.md`, `context/tech-stack.md` |
| Classificação | RECOMMENDATION_AS_FACT / NÃO COMPROVADA |
| Categorias | `RECOMMENDATION_AS_FACT`, `UNSUPPORTED_INFERENCE` |
| Severidade | **MEDIUM** |
| Evidência | Testes reais = Vitest em `src/__tests__/` + links VitePress; sem Playwright/Cypress no package |

---

## 11. Achados LOW

### L-01 — Redundância massiva de project context nos commands

Cada command repete Project/Type/Stack/Description/Goals. Stack ainda por cima está errada.  
Categorias: `REDUNDANCY`, `NOISE`.

### L-02 — README `.cursor` genérico (“best practices 2026”)

Útil como índice; pouco específico. `NOISE` baixo impacto.

### L-03 — Naming “SetAi - CLI” inconsistente com `@setai/cli`

Cosmético. `AMBIGUOUS_INFORMATION` LOW.

### L-04 — Update policy “Dependencies are updated monthly”

Não comprovado. `UNSUPPORTED_INFERENCE` LOW.

### L-05 — Binary distribution future (pkg/nexe)

Explicitamente “Future / not MVP” — aceitável como intenção se marcado; ok-ish. `INFO`/`RECOMMENDATION_AS_FACT` leve.

---

## 12. Template Leaks

| Leak | Onde | Origem provável |
|------|------|-----------------|
| `templates.other` / `templates.none` | architecture, tech-stack, commands, ai-models, code-style, security | i18n key mismatch |
| REST / Layered / Repository / GraphQL trade-off | architecture.md else branches | `architecture.md.template` |
| JWT / SQL / XSS / CORS / uploads | security-rules.md | template segurança genérica + helpers REST |
| Handlebars allowed | allowed-libs.md | template estático CLI “idealizado” |
| Axios forbidden “no HTTP” | forbidden-libs.md | template estático |
| Exemplo commit JWT auth | git-rules.md | template git genérico |
| Claude 4.5 / GPT-5.x catálogo | ai-models.md | template + defaults engine |
| Type: Application | vários | `inferProjectType` default |
| Edge cases API/transactions | business-rules.md | template negócio genérico |
| `[To be defined - …]` longos | architecture/security | helpers fallback Application |
| `{{TEST_COVERAGE}}` | testing-rules.md | variável não mapeada |
| CI GitHub Actions sempre | deployment/architecture | `inferCICDTool()` |
| VitePress/docs reais ausentes; conteúdo genérico sobra | — | geração não lê repo |

---

## 13. Unsupported Inferences

| Inferência | Por que não sustenta |
|------------|----------------------|
| Layered Architecture para qualquer framework desconhecido | Default de `inferArchitecturalStyle` |
| Projeto = Application | Sem tipo CLI no helper |
| Keyword `api` na descrição ⇒ REST API | Falso positivo potencial (SDKs “API”) |
| GitHub Actions como ferramenta do projeto | Sem inspeção de `.github/workflows` |
| Coverage 70/80/90/100 por camada API | Defaults de template, sem medição no contexto |
| Branch develop + squash preferido | Convenção não comprovada no repo |
| Dependências atualizadas mensalmente | Sem evidência processual |
| Monitoring via npm stats/GitHub stars como “ops” | Métrica de produto open-source, não observabilidade de runtime |
| Modelos Cursor Composer/GPT-5.1 como allowed policy | Catálogo estático |

---

## 14. Recommendations Presented as Facts

| Recomendação apresentada como fato | Arquivo |
|------------------------------------|---------|
| GitHub Actions / GitLab / CircleCI como Tool de CI | deployment, architecture |
| Formatting verified in CI/CD | code-style |
| All CI checks passing before merge | git-rules |
| TDD mandatory forever | testing-rules, code-style |
| REST over GraphQL trade-off já decidido | architecture |
| Stateless API design já decidido | architecture |
| Database is single source of truth | architecture |
| Vitest or Jest (recommended) — ambíguo apesar de Vitest real | tech-stack, deployment |
| Playwright/Cypress “if applicable” em stack principal | tech-stack |
| Rate limiting / CORS / HTTPS checklist deploy | security |
| AI never replaces the CI pipeline (implica CI existente) | ai-usage-rules |
| Pre-commit/pre-push hooks descritos como parte do processo | git-rules |

---

## 15. Contradições

| # | Afirmação A | Afirmação B / Realidade |
|---|-------------|-------------------------|
| 1 | Architecture: REST API layered + DB SoT | Deployment: CLI local npm package, sem env vars sensíveis de app |
| 2 | forbidden-libs: CLI não faz HTTP | package.json: 3 SDKs HTTP de IA |
| 3 | project-goals/non-goals: não inventar info sem evidência | architecture/security inventam API/DB/auth |
| 4 | allowed: Handlebars | Código: template engine próprio; Handlebars ausente |
| 5 | testing-rules: `{{TEST_COVERAGE}}` vs “Overall: 70%” no mesmo arquivo | Placeholder vs número fixo |
| 6 | `.setai` README: keys reais | config.json: placeholders |
| 7 | tech-stack version 0.0.1 | package.json 0.1.2 / CLI 0.1.0 |
| 8 | Type Application + CRUD APIs | Produto é gerador de contexto CLI |
| 9 | security: database SSL para `templates.none` | Não há database |

---

## 16. Broken References

| Referência | Arquivo | Problema |
|------------|---------|----------|
| `{{TEST_COVERAGE}}` | `rules/testing-rules.md` | Variável de template não substituída |
| Paths internos `.cursor/...` | vários | Paths relativos corretos entre si — OK |
| CI/CD / hooks como existentes | rules/* | Referem processo inexistente/inativo |
| Framework `templates.other` | vários | Valor inválido / chave i18n crua |

Nenhuma referência a arquivo `.cursor` interno inexistente foi encontrada no índice README (estrutura listada corresponde aos arquivos presentes).

---

## 17. Missing Context

Informações importantes do projeto real **ausentes** ou insuficientes em `.cursor`:

1. Estrutura real de `src/` (commands/engines/services/providers/utils/types)
2. Fluxo `setai init` / `setai config` / flags `--advanced` `--beta` `--lang`
3. Template engine próprio (`processTemplate`, condicionais `{{#if}}`)
4. Sistema i18n (`locales/pt-BR|en|es`)
5. Providers OpenAI / Anthropic / Google e `ai-service`
6. Config path `~/.setai/config.json` vs cópia `.cursor/.setai`
7. Pasta `templates/` como asset publicado no npm (`files: dist, templates, locales`)
8. VitePress documentation site e scripts `docs:*`
9. Suite de testes real em `src/__tests__/` (o que é coberto)
10. Build tsup details (banner shebang, externals)
11. ESLint flat config (`eslint.config.mjs`) — doc cita formatos antigos também
12. Lockfile pnpm como source of truth do package manager do repo
13. CI workflow comentado (estado real: inativo)
14. Divergência de versão `package.json` vs `src/index.ts`
15. Que a geração de `.cursor` **deste** repo é auto-aplicada (dogfooding) e seus riscos
16. Restrição real: geração principal deve ser determinística sem API keys (está em goals — bom — mas não amarra às regras técnicas de implementação)

---

## 18. Redundancy / Noise

| Bloco | Problema |
|-------|----------|
| Context repetido em 10 commands | Mesmo bloco Project/Stack/Goals; aumenta tokens |
| architecture.md decisões duplicadas (§2 e §9) | Copy duplicado do mesmo Initial Architecture |
| ai-models.md + ai-usage-rules.md | Catálogo de modelos repetido |
| security checklist genérico | Alto volume, baixa aplicabilidade |
| 23× `[To be defined]` | Ruído que ocupa seções inteiras |
| README princípios genéricos 2026 | Pouco operacional |
| Trade-offs REST/GraphQL / offline / websockets | Irrelevantes para CLI |

---

## 19. Auditoria de comandos

### Comandos de desenvolvimento do projeto (esperados pelo agente)

| Comando documentado / implícito | Status | Evidência |
|---------------------------------|--------|-----------|
| `npm run build` / `pnpm build` | **Válido** | script `build`: `tsup` |
| `npm test` / `pnpm test` | **Válido** | `vitest run` |
| `npm run lint` | **Válido** | eslint |
| `npm run type-check` | **Válido** | `tsc --noEmit` |
| `npm link` (deployment.md) | **Parcial** | possível, não é script do package; repo prefere pnpm |
| `npm version` + `npm publish` | **Parcial/Válido** | coerente com pacote npm; processo humano |
| `npm install` no CI doc | **Parcial** | repo usa pnpm-lock; `pnpm install` é o idiomático |
| `setai config` (`.setai/README`) | **Válido** | implementado |
| `setai init` | **Não documentado em `.cursor/context`** | Missing — ironia do dogfooding |
| Formatação verificada em CI | **Inválido como fato** | CI comentado |
| Pipeline auto-deploy on main | **Não comprovado / incorreto como ativo** | workflow comentado |

### Paths citados

| Path | Status |
|------|--------|
| `.cursor/context/*.md` etc. cross-refs | OK (existem) |
| `rules/code-style.md` section refs | OK |
| `~/.setai/config.json` | OK (design real do config-manager) |
| `.eslintrc.js` / `eslint.config.js` / `eslint.config.mjs` | Parcial — real é `eslint.config.mjs` |
| Docker / K8s paths | N/A — não citados como existentes (bom) |

---

## 20. Auditoria de arquitetura

### Descrito em `.cursor`

- Layered (routes → controllers → services → data access)
- REST stateless
- DB (`templates.none`) como SoT
- Repository / Service / Validation patterns
- Componentes “to be defined”
- Trade-offs REST vs GraphQL
- Escala/auth/cache placeholders ou defaults de API

### Observado no código

| Componente real | Responsabilidade |
|-----------------|------------------|
| `src/index.ts` | CLI entry, version, comandos |
| `commands/init.ts` | Orquestra geração |
| `commands/config.ts` | API keys / language |
| `engines/question-engine.ts` | Coleta interativa |
| `engines/advanced-groups-collector.ts` | Grupos `--advanced` |
| `engines/ide-selector.ts` | Escolha IDE/pasta alvo |
| `engines/validator.ts` | Validação ProjectInfo |
| `engines/template-engine.ts` | Substituição templates |
| `engines/template-helpers.ts` | Inferências/fallbacks |
| `engines/file-generator.ts` | Escrita de arquivos |
| `services/ai-service.ts` + providers | Enrichment `--beta` |
| `utils/i18n.ts` | Locales |
| `templates/` + `locales/` | Assets de geração |

### Gap arquitetural

O contexto **substitui** a arquitetura real por um boilerplate de API. Isso é o maior dano operacional: um agente pedindo “onde fica o controller?” ou “como adicionar endpoint?” partirá de premissas falsas.

Componentes inventados: routes, controllers, data access, DB SoT, GraphQL alternative trade-off.  
Componentes omitidos: quase toda a pipeline de geração e i18n/providers.

---

## 21. Avaliação da utilidade para agentes

| Pergunta | Resposta |
|----------|----------|
| Entenderia corretamente o projeto? | **Não** — acharia API layered + DB |
| Localizaria onde implementar mudança? | **Mal** — procuraria controllers/repos inexistentes |
| Saberia comandos a executar? | **Parcial** — build/test/lint ok se ler package; docs falam npm/CI demais |
| Saberia tecnologias reais? | **Não** — `templates.*`, Handlebars, ausência dos SDKs |
| Distinguiria fato vs intenção? | **Não** — recomendações e placeholders misturados como seções preenchidas |
| Instruções que induzem erro? | **Sim** — REST, CRUD APIs, JWT, SQL, TDD absoluto + CI |
| Excesso de contexto? | **Sim** — models, security web, commands redundantes |
| Regras genéricas vs específicas? | Genéricas dominam; específicas de negócio estão nos goals mas não amarram a arquitetura |

**Utilidade líquida:** negativa para decisões estruturais; levemente positiva para tom de negócio (goals/non-goals) e lembrete de libs CLI core.

---

## 22. Análise de causa raiz no gerador SetAI

A geração (modo normal, sem `--beta`) é **template + helpers + defaults**, não análise estática do repositório.

Pipeline (`src/commands/init.ts`):

1. IDE selection  
2. Questions (+ optional advanced)  
3. Validate (campos obrigatórios apenas)  
4. Optional AI enhance (`--beta`)  
5. `processAllTemplates()` com `templates/.cursor.en`  
6. `generateFiles()`

### Causas estruturais

1. **Não há source-of-truth scanning** do `package.json`/código alvo para popular stack/libs/arquitetura.
2. **Fallbacks enviesados para web/API** em `template-helpers.ts`.
3. **Else branches de template** hardcodam REST quando decisões avançadas/IA estão vazias.
4. **Bug i18n** transforma “None/Other” em literais `templates.none`/`templates.other`.
5. **Listas de libs estáticas** no template, não derivadas de deps.
6. **CI/CD e models** hardcoded como strings de recomendação sem marcação explícita de “não verificado”.
7. **Validator fraco** não rejeita valores i18n quebrados nem inconsistências tipo CLI+database.
8. **Sem tipo de projeto CLI** no inferidor.

---

## 23. Mapeamento `problema → provável origem no código`

| Problema no output | Origem provável |
|--------------------|-----------------|
| `templates.other` / `templates.none` literais | `src/engines/question-engine.ts` (`t('templates.other\|none')`) + `src/utils/i18n.ts` (fallback=key) + `locales/*/templates.json` (keys `other`/`none`) |
| Layered Architecture no header | `template-helpers.inferArchitecturalStyle` default + `template-engine.ts` `ARCHITECTURAL_STYLE` |
| REST / DB SoT / Stateless no corpo | `templates/.cursor.en/context/architecture.md.template` bloco `{{else}}` de `ARCHITECTURAL_DECISIONS` |
| Repository Pattern | mesmo template, `{{else}}` de `DESIGN_PATTERNS` |
| Trade-off REST vs GraphQL | `architecture.md.template` else de `ARCHITECTURE_TRADE_OFFS` |
| Type Application / CRUD | `inferProjectType` + `ai-usage-rules.md.template` |
| Falso REST via keyword `api` | `inferProjectType` (`desc.includes('api')`) |
| Version desalinhada / 0.0.1 | pergunta `version` em `question-engine.ts` (não lê package.json) + label ambíguo no `tech-stack.md.template` |
| Handlebars allowed | `templates/.cursor.en/libs/allowed-libs.md.template` estático |
| Axios “no HTTP” | `templates/.cursor.en/libs/forbidden-libs.md.template` |
| SDKs AI ausentes | templates de libs não leem `package.json` |
| GitHub Actions sempre | `inferCICDTool()` |
| `[To be defined…]` | helpers de fallback + defaults `[A definir]` em `template-engine.ts` |
| Claude 4.5 / GPT-5.x | `ai-models.md.template` + defaults em `template-engine.ts` + choices advanced/locales |
| JWT/SQL/XSS security | `security-rules.md.template` + `generateSecurityPatterns` (quando REST) / placeholders Application |
| `{{TEST_COVERAGE}}` | template testing sem binding da variável no engine |
| Deploy npm `@setai/cli` genérico | `deployment.md.template` parcialmente escrito para CLI npm (útil) misturado com CI fictício |
| Stack errada em todos commands | commands templates usam `{{FRAMEWORK}}`/`{{DATABASE}}` já corrompidos |
| Sem correção mesmo com goals anti-alucinação | Goals são texto do usuário; gerador não aplica essas constraints ao preencher architecture/security |

---

## 24. Top 10 problemas que mais prejudicam a nota

1. **Literais `templates.other` / `templates.none` como stack** (CRITICAL) — destrói credibilidade factual.  
2. **Arquitetura REST/Layered/DB inventada** (CRITICAL) — decide errado a estrutura do sistema.  
3. **Security rules de API/DB** (CRITICAL) — agenda trabalho e checks irrelevantes/perigosamente deslocados.  
4. **Ausência da arquitetura real (engines/providers)** (HIGH/MISSING) — agente não acha o mapa.  
5. **Libs allowed/forbidden desalinhadas + “no HTTP”** (HIGH) — decisões de dependência erradas.  
6. **CI/CD e TDD como fatos absolutos** (HIGH) — processo falso.  
7. **Fallbacks genéricos sem label “unknown/unverified”** (HIGH) — mistura intenção com realidade.  
8. **Ruído: models + placeholders + commands redundantes** (MEDIUM) — dilui sinal.  
9. **Versão/tech-stack ambíguos/errados** (HIGH) — metadata básica falha.  
10. **Bug i18n + validator fraco** (root cause) — permite lixo chegar ao disco.

---

## 25. O que seria necessário para atingir 9/10

1. **Corrigir i18n** (`t('other')`/`t('none')` ou nested lookup) e normalizar sentinelas (`None`/`N/A` → vazio).  
2. **Detectar tipo real** (CLI/library/web/api) — nunca defaultar Layered REST para CLI.  
3. **Remover else REST** dos templates; se desconhecido, emitir `UNKNOWN` / `NOT EVIDENCED`, não boilerplate de API.  
4. **Popular stack/libs a partir de `package.json`/lockfile** do projeto alvo (ou respostas validadas).  
5. **Marcar explicitamente** FACT / USER_PROVIDED / INFERRED / RECOMMENDATION / UNKNOWN.  
6. **Security rules condicionais** ao tipo real (CLI secrets ≠ JWT/SQL).  
7. **Documentar arquitetura observada** (commands/engines/services) quando dogfooding neste repo.  
8. **Comandos reais** (`pnpm test/build/lint`, `setai init/config`) e estado real do CI.  
9. **Eliminar placeholders não resolvidos** e reduzir redundância dos commands.  
10. **Validator** que falha se framework/database forem chaves i18n ou inconsistentes com tipo CLI.  
11. **Cobertura alta** das partes que agentes precisam: onde mudar código, como testar, o que não inventar.

Somente após isso, com reauditoria limpa e quase zero falsidades, a nota pode cruzar 9.0.

---

## 26. Conclusão

Este baseline demonstra que o SetAI, no estado atual, **consegue capturar razoavelmente o discurso de negócio fornecido pelo usuário**, mas **falha em materializar um contexto técnico fiel**. O gerador preenche lacunas com um **esqueleto de aplicação web/API**, corrompe valores via **bug de i18n**, e **não ancora** afirmações no código do projeto alvo.

Para agentes, o resultado é pior do que “documentação incompleta”: é **documentação confiante e errada** em pontos estruturais.

**Nota baseline: 3.2 / 10.0**

Este relatório deve ser preservado para comparar futuramente:

`OUTPUT ORIGINAL DO SETAI` (este)  
vs. `CONTEXTO CORRIGIDO`  
vs. `OUTPUT DO SETAI APÓS REFATORAÇÃO`

---

## Apêndice A — Amostra de afirmações classificadas

| Afirmação | Arquivo | Classe |
|-----------|---------|--------|
| TypeScript como linguagem | tech-stack | CONFIRMADA |
| Node.js / ESM | architecture | CONFIRMADA |
| Commander / Inquirer / fs-extra / chalk / ora / zod | allowed-libs | CONFIRMADA |
| Vitest preferred | allowed-libs | CONFIRMADA (Vitest está no projeto) |
| tsup preferred | allowed-libs | CONFIRMADA |
| pnpm preferred | allowed-libs | CONFIRMADA (lockfile) |
| ESLint + Prettier existem como tools | code-style | CONFIRMADA (configs presentes) |
| Problema/goals/non-goals do SetAI | project-goals | CONFIRMADA (alinhado README/produto) |
| Geração local sem API keys (constraint) | project-goals | CONFIRMADA (modo default) |
| Publish npm / tags beta | deployment | PARCIALMENTE CONFIRMADA |
| `npm run build` + `npm test` no release | deployment | CONFIRMADA (scripts) |
| Framework `templates.other` | vários | INCORRETA + TEMPLATE LEAK |
| Database `templates.none` | vários | INCORRETA + TEMPLATE LEAK |
| Layered + REST + DB SoT | architecture | INCORRETA |
| Repository Pattern adotado | architecture | RECOMMENDATION_AS_FACT / INCORRETA |
| Version 0.0.1 | tech-stack | INCORRETA |
| Handlebars allowed/usado | allowed-libs | NÃO COMPROVADA / RECOMENDAÇÃO |
| CLI doesn't make HTTP | forbidden-libs | INCORRETA |
| GitHub Actions ativo | deployment | RECOMMENDATION_AS_FACT |
| JWT auth method | security | NÃO COMPROVADA / TEMPLATE |
| TDD mandatory | testing-rules | RECOMMENDATION_AS_FACT |
| `{{TEST_COVERAGE}}` | testing-rules | BROKEN_REFERENCE |
| Claude 4.5 Opus policy | ai-models | RECOMMENDATION_AS_FACT |
| Type Application | commands | INCORRETA / UNSUPPORTED |

## Apêndice B — Arquivos-chave do gerador para follow-up

- `src/engines/question-engine.ts`
- `src/utils/i18n.ts`
- `locales/*/templates.json`
- `src/engines/template-helpers.ts`
- `src/engines/template-engine.ts`
- `src/engines/validator.ts`
- `src/engines/advanced-groups-collector.ts`
- `templates/.cursor.en/context/architecture.md.template`
- `templates/.cursor.en/context/tech-stack.md.template`
- `templates/.cursor.en/context/deployment.md.template`
- `templates/.cursor.en/libs/allowed-libs.md.template`
- `templates/.cursor.en/libs/forbidden-libs.md.template`
- `templates/.cursor.en/libs/ai-models.md.template`
- `templates/.cursor.en/rules/security-rules.md.template`
- `templates/.cursor.en/rules/testing-rules.md.template`

---

*Fim do relatório BASELINE V1 — nenhuma alteração foi feita em `.cursor/` nem no gerador.*
