# Mapeamento: Perguntas → Arquivos da Estrutura .cursor

## 📋 Perguntas Básicas (Obrigatórias)

### 1. Nome do Projeto (`projectName`)
**Pergunta:** "Qual o nome do projeto?"

**Arquivos preenchidos:**
- ✅ `.cursor/context/architecture.md`
  - Placeholder: `{{PROJECT_NAME}}`
  - Localização: Seção "System Overview" → "Project Name"

### 2. Descrição do Projeto (`projectDescription`)
**Pergunta:** "Descreva o problema que este projeto resolve:"

**Arquivos preenchidos:**
- ✅ `.cursor/context/project-goals.md`
  - Placeholder: `{{PROJECT_DESCRIPTION}}`
  - Localização: Seção "Problem Statement" → "Problema que estamos resolvendo"
- ✅ `.cursor/context/architecture.md`
  - Placeholder: `{{PROJECT_DESCRIPTION}}`
  - Localização: Seção "System Overview" → "Description"

### 3. Importância do Problema (`problemImportance`)
**Pergunta:** "Por que este problema importa?"

**Arquivos preenchidos:**
- ✅ `.cursor/context/project-goals.md`
  - Placeholder: `{{PROBLEM_IMPORTANCE}}`
  - Localização: Seção "Problem Statement" → "Por que este problema importa"

### 4. Usuários Principais (`targetUsers`)
**Pergunta:** "Quem são os usuários principais deste projeto?"

**Arquivos preenchidos:**
- ✅ `.cursor/context/project-goals.md`
  - Placeholder: `{{TARGET_USERS}}`
  - Localização: Seção "Target Users" → "Primary Users"
  - **Nota:** Formatado automaticamente como lista markdown se separado por vírgulas
- ✅ `.cursor/context/architecture.md`
  - Placeholder: `{{TARGET_USERS}}`
  - Localização: Seção "System Overview" → "Primary Users"
  - **Nota:** Formatado automaticamente como lista markdown se separado por vírgulas

### 5. Objetivos de Negócio (`businessGoals`)
**Pergunta:** "Quais são os objetivos de negócio principais?"

**Arquivos preenchidos:**
- ✅ `.cursor/context/project-goals.md`
  - Placeholder: `{{BUSINESS_GOALS}}`
  - Localização: Seção "Business Objectives" → "Primary Goals"

### 6. Restrições Técnicas (`technicalConstraints`)
**Pergunta:** "Quais são as restrições técnicas? (ou 'Nenhuma' se não houver)"

**Arquivos preenchidos:**
- ✅ `.cursor/context/project-goals.md`
  - Placeholder: `{{TECHNICAL_CONSTRAINTS}}`
  - Localização: Seção "Constraints" → "Technical Constraints"

### 7. Restrições de Negócio (`businessConstraints`)
**Pergunta:** "Quais são as restrições de negócio? (ou 'Nenhuma' se não houver)"

**Arquivos preenchidos:**
- ✅ `.cursor/context/project-goals.md`
  - Placeholder: `{{BUSINESS_CONSTRAINTS}}`
  - Localização: Seção "Constraints" → "Business Constraints"

### 8. Não-Objetivos (`nonGoals`)
**Pergunta:** "O que este projeto NÃO faz? (o que está fora do escopo)"

**Arquivos preenchidos:**
- ✅ `.cursor/context/project-goals.md`
  - Placeholder: `{{NON_GOALS}}`
  - Localização: Seção "Non-Goals"

### 9. Versão (`version`)
**Pergunta:** "Qual a versão inicial do projeto?"

**Arquivos preenchidos:**
- ✅ `.cursor/context/tech-stack.md`
  - Placeholder: `{{VERSION}}`
  - Localização: Seção "Language & Runtime" → "Version"

### 10. Linguagem (`language`)
**Pergunta:** "Qual a linguagem principal do projeto?"

**Arquivos preenchidos:**
- ✅ `.cursor/context/tech-stack.md`
  - Placeholder: `{{LANGUAGE}}`
  - Localização: Seção "Language & Runtime" → "Language"
- ✅ `.cursor/context/architecture.md`
  - Placeholder: `{{LANGUAGE}}`
  - Localização: Seção "Technology Stack" → "Runtime" → "Language"

### 11. Framework (`framework`)
**Pergunta:** "Qual framework você está usando?" *(Condicional: apenas se TypeScript ou JavaScript)*

**Arquivos preenchidos:**
- ✅ `.cursor/context/tech-stack.md`
  - Placeholder: `{{FRAMEWORK}}`
  - Localização: Seção "Framework" → "Framework"
- ✅ `.cursor/context/architecture.md`
  - Placeholder: `{{FRAMEWORK}}`
  - Localização: Seção "Technology Stack" → "Framework" → "Framework"

### 12. Banco de Dados (`database`)
**Pergunta:** "Qual banco de dados você está usando?"

**Arquivos preenchidos:**
- ✅ `.cursor/context/tech-stack.md`
  - Placeholder: `{{DATABASE}}`
  - Localização: Seção "Database" → "Database"
- ✅ `.cursor/context/architecture.md`
  - Placeholder: `{{DATABASE}}`
  - Localização: Seção "Technology Stack" → "Database" → "Database"

### 13. TDD (`useTDD`)
**Pergunta:** "Você usa TDD (Test-Driven Development)?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Esta informação é coletada mas não é usada em templates ainda
- 💡 **Sugestão:** Poderia ser usada em `.cursor/rules/testing-rules.md` no futuro

### 14. Strict Mode (`strictMode`)
**Pergunta:** "Você prefere modo strict no TypeScript?" *(Condicional: apenas se TypeScript)*

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Esta informação é coletada mas não é usada em templates ainda
- 💡 **Sugestão:** Poderia ser usada em `.cursor/rules/code-style.md` no futuro

---

## 🔧 Perguntas Avançadas (Opcionais - apenas com `--advanced`)

### 15. Configurar Opções Avançadas (`useAdvanced`)
**Pergunta:** "Deseja configurar opções avançadas de uso de IA?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Esta é uma pergunta de controle que ativa as outras perguntas avançadas

### 16-20. Modelos de IA Preferidos

#### 16. Modelo para Arquitetura (`preferredModelArchitecture`)
**Pergunta:** "Qual modelo de IA prefere para Arquitetura & Planejamento?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.preferredAIModels.architecture`
- 💡 **Sugestão:** Deveria preencher `.cursor/libs/ai-models.md` e `.cursor/rules/ai-usage-rules.md`

#### 17. Modelo para Implementação (`preferredModelImplementation`)
**Pergunta:** "Qual modelo de IA prefere para Implementação de Código?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.preferredAIModels.implementation`
- 💡 **Sugestão:** Deveria preencher `.cursor/libs/ai-models.md` e `.cursor/rules/ai-usage-rules.md`

#### 18. Modelo para Refatoração (`preferredModelRefactoring`)
**Pergunta:** "Qual modelo de IA prefere para Refatoração & Legado?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.preferredAIModels.refactoring`
- 💡 **Sugestão:** Deveria preencher `.cursor/libs/ai-models.md` e `.cursor/rules/ai-usage-rules.md`

#### 19. Modelo para Debug (`preferredModelDebug`)
**Pergunta:** "Qual modelo de IA prefere para Debug & Análise?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.preferredAIModels.debug`
- 💡 **Sugestão:** Deveria preencher `.cursor/libs/ai-models.md` e `.cursor/rules/ai-usage-rules.md`

#### 20. Modelo para Boilerplate (`preferredModelBoilerplate`)
**Pergunta:** "Qual modelo de IA prefere para Código Rápido / Boilerplate?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.preferredAIModels.boilerplate`
- 💡 **Sugestão:** Deveria preencher `.cursor/libs/ai-models.md` e `.cursor/rules/ai-usage-rules.md`

### 21-25. Regras de Uso de IA

#### 21. Permitir Arquitetura (`allowArchitecturePlanning`)
**Pergunta:** "Permitir uso de IA para Arquitetura & Planejamento?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.aiUsageRules.allowArchitecturePlanning`
- 💡 **Sugestão:** Deveria preencher `.cursor/rules/ai-usage-rules.md`

#### 22. Permitir Geração de Código (`allowCodeGeneration`)
**Pergunta:** "Permitir uso de IA para Geração de Código?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.aiUsageRules.allowCodeGeneration`
- 💡 **Sugestão:** Deveria preencher `.cursor/rules/ai-usage-rules.md`

#### 23. Permitir Refatoração (`allowRefactoring`)
**Pergunta:** "Permitir uso de IA para Refatoração?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.aiUsageRules.allowRefactoring`
- 💡 **Sugestão:** Deveria preencher `.cursor/rules/ai-usage-rules.md`

#### 24. Permitir Debug (`allowDebug`)
**Pergunta:** "Permitir uso de IA para Debug & Análise?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.aiUsageRules.allowDebug`
- 💡 **Sugestão:** Deveria preencher `.cursor/rules/ai-usage-rules.md`

#### 25. Permitir Documentação (`allowDocumentation`)
**Pergunta:** "Permitir uso de IA para Documentação?"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.aiUsageRules.allowDocumentation`
- 💡 **Sugestão:** Deveria preencher `.cursor/rules/ai-usage-rules.md`

### 26-28. Responsabilidades

#### 26. Responsabilidade do CTO (`ctoResponsibility`)
**Pergunta:** "Responsabilidade do CTO em relação ao uso de IA:"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.responsibilities.cto`
- 💡 **Sugestão:** Deveria preencher `.cursor/rules/ai-usage-rules.md` seção "Responsabilidades"

#### 27. Responsabilidade do Tech Lead (`techLeadResponsibility`)
**Pergunta:** "Responsabilidade do Tech Lead em relação ao uso de IA:"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.responsibilities.techLead`
- 💡 **Sugestão:** Deveria preencher `.cursor/rules/ai-usage-rules.md` seção "Responsabilidades"

#### 28. Responsabilidade do Dev (`devResponsibility`)
**Pergunta:** "Responsabilidade do Dev em relação ao uso de IA:"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.responsibilities.dev`
- 💡 **Sugestão:** Deveria preencher `.cursor/rules/ai-usage-rules.md` seção "Responsabilidades"

### 29. Restrições Customizadas (`customConstraints`)
**Pergunta:** "Restrições customizadas para uso de IA (ou deixe em branco):"

**Arquivos preenchidos:**
- ⚠️ **Nenhum arquivo atualmente** - Coletado em `projectInfo.advanced.customConstraints`
- 💡 **Sugestão:** Deveria preencher `.cursor/rules/ai-usage-rules.md` seção "Onde a IA NÃO Pode Atuar Sozinha"

---

## 📊 Resumo

### Arquivos Preenchidos com Perguntas Básicas

1. ✅ **`.cursor/context/project-goals.md`** - 7 placeholders
   - PROJECT_DESCRIPTION
   - PROBLEM_IMPORTANCE
   - TARGET_USERS
   - BUSINESS_GOALS
   - TECHNICAL_CONSTRAINTS
   - BUSINESS_CONSTRAINTS
   - NON_GOALS

2. ✅ **`.cursor/context/tech-stack.md`** - 4 placeholders
   - LANGUAGE
   - VERSION
   - FRAMEWORK
   - DATABASE

3. ✅ **`.cursor/context/architecture.md`** - 6 placeholders
   - PROJECT_NAME
   - PROJECT_DESCRIPTION
   - TARGET_USERS
   - LANGUAGE
   - FRAMEWORK
   - DATABASE

### Arquivos Preenchidos com Perguntas Avançadas

⚠️ **NENHUM ARQUIVO ATUALMENTE** - As informações avançadas são coletadas mas não são aplicadas aos templates ainda.

**Arquivos que DEVERIAM ser preenchidos:**
- `.cursor/rules/ai-usage-rules.md` - Modelos preferidos, regras de uso, responsabilidades
- `.cursor/libs/ai-models.md` - Modelos preferidos por fase

---

## 🎯 Conclusão

### Perguntas Básicas
- ✅ **3 arquivos** são preenchidos com dados das perguntas básicas
- ✅ **17 placeholders** são substituídos
- ✅ Funcionalidade **100% implementada**

### Perguntas Avançadas
- ⚠️ **0 arquivos** são preenchidos atualmente
- ⚠️ Dados são coletados mas **não aplicados aos templates**
- 💡 **Necessita implementação** para preencher:
  - `.cursor/rules/ai-usage-rules.md`
  - `.cursor/libs/ai-models.md`

---

## 📝 Próximos Passos Sugeridos

1. Adicionar placeholders nos templates de `ai-usage-rules.md` e `ai-models.md`
2. Atualizar `template-engine.ts` para processar dados avançados
3. Testar geração completa com `--advanced`

