# .cursor Configuration

## Objetivo
Esta pasta contém toda a configuração e contexto para uso eficiente de IA no desenvolvimento do projeto.

## Estrutura

### 📂 `context/`
Contexto persistente do projeto - responde "Como este projeto pensa?"

- `architecture.md` - Decisões arquiteturais e padrões
- `tech-stack.md` - Stack tecnológico completo
- `project-goals.md` - Objetivos e contexto de negócio
- `deployment.md` - Infraestrutura e processo de deploy

### 📂 `rules/`
Regras duras - contrato com a IA

- `code-style.md` - Padrões de código obrigatórios
- `testing-rules.md` - Estratégia e regras de testes
- `git-rules.md` - Padrões de commit e PR
- `security-rules.md` - Regras de segurança obrigatórias
- `ai-usage-rules.md` - Onde e como usar IA
- `business-rules.md` - Regras de negócio

### 📂 `libs/`
Fonte de verdade sobre dependências

- `allowed-libs.md` - Bibliotecas permitidas
- `forbidden-libs.md` - Bibliotecas proibidas
- `ai-models.md` - Modelos de IA permitidos e quando usar

### 📂 `commands/`
Prompts executáveis - comandos reutilizáveis

- `kickoff-project.md` - Alinhar entendimento de negócio
- `architecture-review.md` - Validar decisões arquiteturais
- `extract-business-rules.md` - Extrair regras de negócio
- `test-strategy.md` - Estruturar estratégia de testes
- `generate-boilerplate.md` - Gerar código boilerplate
- `refactor-controlled.md` - Refatoração controlada
- `generate-docs.md` - Gerar documentação técnica
- `review-pr.md` - Revisão de PR
- `challenge-solution.md` - Contestar soluções
- `pre-deploy-validation.md` - Validação pré-deploy

## Como Usar

### Para Desenvolvedores
1. **Configure lint e formatter ANTES de começar** (ver `rules/code-style.md`)
2. Leia os arquivos de `context/` para entender o projeto
3. Siga as regras em `rules/`
4. Use apenas libs em `libs/allowed-libs.md`
5. Use os prompts em `commands/` quando apropriado

### Para IA
A IA deve:
1. **Verificar se lint está configurado antes de gerar código**
2. Ler `rules/` primeiro (regras duras)
3. Consultar `context/` para entender o projeto
4. Verificar `libs/` antes de sugerir dependências
5. Usar `commands/` como templates de prompts
6. **Sempre gerar código que passe no lint configurado**

## Princípios

- **Contexto explícito > Prompt bonito**
- **Regras duras, não sugestões**
- **Documentação viva, não estática**
- **IA propõe, humanos aprovam**

## Manutenção

- Atualize arquivos quando houver mudanças
- Mantenha consistência entre arquivos
- Documente decisões importantes
- Revise periodicamente

---

**Baseado nas melhores práticas de desenvolvimento com IA em 2026**

