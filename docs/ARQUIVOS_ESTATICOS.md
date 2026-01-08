# Arquivos NÃO Afetados pelas Respostas do Usuário

## 📋 Resumo

Dos **24 arquivos** gerados na estrutura `.cursor`, apenas **3 arquivos** são preenchidos com dados do usuário. Os outros **21 arquivos** são **estáticos** (copiados como estão, sem placeholders).

---

## ✅ Arquivos AFETADOS (3 arquivos)

Estes arquivos têm placeholders que são substituídos pelas respostas:

1. ✅ `.cursor/context/project-goals.md` - 7 placeholders
2. ✅ `.cursor/context/tech-stack.md` - 4 placeholders
3. ✅ `.cursor/context/architecture.md` - 6 placeholders

**Total:** 17 placeholders substituídos

---

## 📄 Arquivos NÃO AFETADOS (21 arquivos)

Estes arquivos são copiados **exatamente como estão** nos templates, sem nenhuma substituição de placeholders.

### 📂 Context (1 arquivo)

1. ❌ **`.cursor/context/deployment.md`**
   - **Conteúdo:** Template genérico sobre infraestrutura, deploy, CI/CD
   - **Motivo:** Informações genéricas que servem como guia, não específicas do projeto
   - **Status:** Estático - deve ser editado manualmente pelo usuário

### 📂 Rules (6 arquivos)

2. ❌ **`.cursor/rules/code-style.md`**
   - **Conteúdo:** Regras de estilo de código, lint, formatter, convenções
   - **Motivo:** Regras genéricas aplicáveis a qualquer projeto
   - **Status:** Estático - pode ser customizado manualmente se necessário

3. ❌ **`.cursor/rules/testing-rules.md`**
   - **Conteúdo:** Estratégia de testes, TDD, cobertura, padrões
   - **Motivo:** Regras genéricas de testes
   - **Status:** Estático - pode ser customizado manualmente se necessário

4. ❌ **`.cursor/rules/git-rules.md`**
   - **Conteúdo:** Padrões de commit, branches, PR, code review
   - **Motivo:** Regras genéricas de Git
   - **Status:** Estático - pode ser customizado manualmente se necessário

5. ❌ **`.cursor/rules/security-rules.md`**
   - **Conteúdo:** Regras de segurança, autenticação, validação, dados sensíveis
   - **Motivo:** Regras genéricas de segurança
   - **Status:** Estático - pode ser customizado manualmente se necessário

6. ❌ **`.cursor/rules/ai-usage-rules.md`**
   - **Conteúdo:** Onde e como usar IA, modelos recomendados, responsabilidades
   - **Motivo:** Regras genéricas de uso de IA
   - **Status:** Estático - **DEVERIA** ser preenchido com dados avançados (não implementado ainda)

7. ❌ **`.cursor/rules/business-rules.md`**
   - **Conteúdo:** Regras de negócio, validações, comportamentos esperados
   - **Motivo:** Template genérico - deve ser preenchido com regras específicas do projeto
   - **Status:** Estático - deve ser editado manualmente pelo usuário

### 📂 Libs (3 arquivos)

8. ❌ **`.cursor/libs/allowed-libs.md`**
   - **Conteúdo:** Lista de bibliotecas permitidas (Commander.js, Inquirer.js, fs-extra, etc.)
   - **Motivo:** Lista genérica baseada no SetAI CLI
   - **Status:** Estático - deve ser customizado manualmente para cada projeto

9. ❌ **`.cursor/libs/forbidden-libs.md`**
   - **Conteúdo:** Lista de bibliotecas proibidas (Yargs, Enquirer, Lodash, etc.)
   - **Motivo:** Lista genérica baseada no SetAI CLI
   - **Status:** Estático - deve ser customizado manualmente para cada projeto

10. ❌ **`.cursor/libs/ai-models.md`**
    - **Conteúdo:** Modelos de IA permitidos e quando usar (Claude, GPT, Gemini, etc.)
    - **Motivo:** Lista genérica de modelos
    - **Status:** Estático - **DEVERIA** ser preenchido com preferências avançadas (não implementado ainda)

### 📂 Commands (10 arquivos)

11. ❌ **`.cursor/commands/kickoff-project.md`**
    - **Conteúdo:** Prompt para alinhar entendimento de negócio
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático - pode ser usado como está ou customizado

12. ❌ **`.cursor/commands/architecture-review.md`**
    - **Conteúdo:** Prompt para validar decisões arquiteturais
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático

13. ❌ **`.cursor/commands/extract-business-rules.md`**
    - **Conteúdo:** Prompt para extrair regras de negócio
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático

14. ❌ **`.cursor/commands/test-strategy.md`**
    - **Conteúdo:** Prompt para estruturar estratégia de testes
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático

15. ❌ **`.cursor/commands/generate-boilerplate.md`**
    - **Conteúdo:** Prompt para gerar código boilerplate
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático

16. ❌ **`.cursor/commands/refactor-controlled.md`**
    - **Conteúdo:** Prompt para refatoração controlada
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático

17. ❌ **`.cursor/commands/generate-docs.md`**
    - **Conteúdo:** Prompt para gerar documentação técnica
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático

18. ❌ **`.cursor/commands/review-pr.md`**
    - **Conteúdo:** Prompt para revisão de PR
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático

19. ❌ **`.cursor/commands/challenge-solution.md`**
    - **Conteúdo:** Prompt para contestar soluções
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático

20. ❌ **`.cursor/commands/pre-deploy-validation.md`**
    - **Conteúdo:** Prompt para validação pré-deploy
    - **Motivo:** Template de prompt reutilizável
    - **Status:** Estático

### 📂 Root (1 arquivo)

21. ❌ **`.cursor/README.md`**
    - **Conteúdo:** Documentação sobre a estrutura `.cursor` e como usar
    - **Motivo:** Documentação genérica explicativa
    - **Status:** Estático - serve como guia para qualquer projeto

---

## 📊 Estatísticas

| Categoria | Total | Afetados | Não Afetados |
|-----------|-------|----------|--------------|
| **Context** | 4 | 3 | 1 |
| **Rules** | 6 | 0 | 6 |
| **Libs** | 3 | 0 | 3 |
| **Commands** | 10 | 0 | 10 |
| **Root** | 1 | 0 | 1 |
| **TOTAL** | **24** | **3** | **21** |

**Percentual:** 
- ✅ Afetados: **12.5%** (3/24)
- ❌ Não Afetados: **87.5%** (21/24)

---

## 🎯 Por que esses arquivos são estáticos?

### 1. **Templates Genéricos**
   - Arquivos como `code-style.md`, `testing-rules.md`, `git-rules.md` contêm regras genéricas que se aplicam a qualquer projeto
   - Servem como base que pode ser customizada manualmente

### 2. **Prompts Reutilizáveis**
   - Todos os arquivos em `commands/` são templates de prompts
   - Podem ser usados como estão ou customizados conforme necessário
   - Não precisam de dados específicos do projeto para funcionar

### 3. **Listas de Referência**
   - Arquivos em `libs/` são listas de referência
   - Devem ser customizadas manualmente para cada projeto
   - Baseadas em exemplos do SetAI CLI

### 4. **Documentação Explicativa**
   - `README.md` e `deployment.md` são documentação genérica
   - Explicam conceitos e estrutura, não dados específicos

---

## 💡 Arquivos que DEVERIAM ser afetados (mas não estão)

### ⚠️ Pendentes de Implementação

1. **`.cursor/rules/ai-usage-rules.md`**
   - **Deveria usar:** Dados das perguntas avançadas
   - **Placeholders necessários:**
     - Modelos preferidos por fase
     - Regras de uso (permitir/proibir)
     - Responsabilidades (CTO, Tech Lead, Dev)
     - Restrições customizadas

2. **`.cursor/libs/ai-models.md`**
   - **Deveria usar:** Modelos preferidos das perguntas avançadas
   - **Placeholders necessários:**
     - Modelo para Arquitetura
     - Modelo para Implementação
     - Modelo para Refatoração
     - Modelo para Debug
     - Modelo para Boilerplate

---

## ✅ Conclusão

**87.5% dos arquivos** são estáticos e não são afetados pelas respostas do usuário. Isso é **intencional** porque:

1. ✅ Fornecem uma base sólida de regras e templates
2. ✅ Podem ser customizados manualmente conforme necessário
3. ✅ Servem como referência e guia
4. ✅ Reduzem complexidade do CLI (não precisa perguntar sobre tudo)

Os **3 arquivos afetados** são os mais importantes para personalização inicial:
- `project-goals.md` - Contexto de negócio
- `tech-stack.md` - Stack tecnológica
- `architecture.md` - Visão arquitetural

