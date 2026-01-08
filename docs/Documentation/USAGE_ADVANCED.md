# Uso Avançado - SetAI CLI

Guia completo sobre o uso avançado do SetAI CLI com configurações personalizadas.

## 🎯 Visão Geral

O modo avançado permite personalizar completamente a estrutura gerada através de grupos modulares de configuração. Você pode escolher quais grupos responder e em qual ordem.

---

## 🚀 Comando Avançado

### `setai init --advanced`

Gera estrutura com opções avançadas de personalização.

**Sintaxe:**
```bash
setai init --advanced
```

**O que faz:**
1. Executa todas as perguntas básicas
2. Pergunta se deseja configurar opções avançadas
3. Permite selecionar grupos de configuração
4. Coleta respostas de forma iterativa
5. Gera estrutura completamente personalizada

---

## 📋 Fluxo de Configuração Avançada

### 1. Perguntas Básicas

Primeiro, todas as perguntas básicas são feitas (veja [Uso Básico](./USAGE_BASIC.md)).

### 2. Confirmação de Opções Avançadas

```
🔧 Deseja configurar opções avançadas? (permitirá personalizar todos os arquivos)
  ❯ Yes
     No
```

**Se escolher `No`:**
- Processo termina
- Estrutura básica é gerada

**Se escolher `Yes`:**
- Entra no modo de configuração avançada

### 3. Seleção Iterativa de Grupos

O CLI apresenta um menu interativo onde você pode:

1. **Selecionar um grupo** para responder
2. **Responder as perguntas** desse grupo
3. **Voltar ao menu** para selecionar outro grupo
4. **Finalizar** quando terminar

**Menu de seleção:**
```
📋 Selecione um grupo de configuração avançada para preencher:
  ❯ 🤖 AI Usage Rules - Modelos preferidos e regras de uso de IA
    👥 Responsabilidades - CTO, Tech Lead, Dev
    📚 Bibliotecas - Lista customizada de libs permitidas/proibidas
    🏗️ Arquitetura Detalhada - Decisões arquiteturais e padrões
    🔒 Segurança - Regras específicas de segurança
    🧪 Testes - Estratégia detalhada de testes
    📦 Deploy - Configurações de deploy e infraestrutura
    📝 Documentação - Padrões de documentação
    ✅ Finalizar configuração avançada
```

**Comportamento:**
- Grupos já respondidos aparecem como "✓ (já respondido)" e ficam indisponíveis
- Você pode escolher a ordem de resposta
- Pode finalizar a qualquer momento

---

## 📚 Grupos de Configuração

### 1. 🤖 AI Usage Rules

**O que configura:**
- Modelos de IA preferidos por fase de desenvolvimento
- Permissões de uso de IA
- Restrições customizadas

**Perguntas:**
1. Modelo preferido para Arquitetura & Planejamento
2. Modelo preferido para Implementação de Código
3. Modelo preferido para Refatoração & Legado
4. Modelo preferido para Debug & Análise
5. Modelo preferido para Código Rápido / Boilerplate
6. Permitir uso de IA para Arquitetura & Planejamento?
7. Permitir uso de IA para Geração de Código?
8. Permitir uso de IA para Refatoração?
9. Permitir uso de IA para Debug & Análise?
10. Permitir uso de IA para Documentação?
11. Restrições customizadas para uso de IA

**Arquivos afetados:**
- `.cursor/rules/ai-usage-rules.md`
- `.cursor/libs/ai-models.md`

**Exemplo:**
```
📝 Respondendo perguntas do grupo: 🤖 AI Usage Rules

? Qual modelo de IA prefere para Arquitetura & Planejamento?
  ❯ Claude 4.5 Opus
    GPT-5.2
    Claude 4.5 Sonnet
    Gemini 3 Pro
    Não especificado

? Qual modelo de IA prefere para Implementação de Código?
  ❯ Cursor Composer + GPT-5.1 Codex
    GPT-5.1 Codex Max
    Gemini 3 Flash
    Claude 4.5 Sonnet
    Não especificado

? Permitir uso de IA para Arquitetura & Planejamento?
  ❯ Yes
     No

✅ Grupo "🤖 AI Usage Rules" configurado com sucesso!
```

---

### 2. 👥 Responsabilidades

**O que configura:**
- Responsabilidades do CTO em relação ao uso de IA
- Responsabilidades do Tech Lead
- Responsabilidades do Dev

**Perguntas:**
1. Responsabilidade do CTO
2. Responsabilidade do Tech Lead
3. Responsabilidade do Dev

**Arquivos afetados:**
- `.cursor/rules/ai-usage-rules.md`

**Exemplo:**
```
📝 Respondendo perguntas do grupo: 👥 Responsabilidades

? Responsabilidade do CTO em relação ao uso de IA:
> Define política e limites de uso de IA na empresa

? Responsabilidade do Tech Lead em relação ao uso de IA:
> Garante padrões, revisa código gerado por IA, valida arquitetura

? Responsabilidade do Dev em relação ao uso de IA:
> Usa IA como ferramenta de produtividade, não como atalho. Sempre revisa código gerado.

✅ Grupo "👥 Responsabilidades" configurado com sucesso!
```

---

### 3. 📚 Bibliotecas

**O que configura:**
- Bibliotecas permitidas adicionais
- Bibliotecas proibidas adicionais
- Notas sobre política de bibliotecas

**Perguntas:**
1. Bibliotecas permitidas adicionais (separadas por vírgula)
2. Bibliotecas proibidas adicionais (separadas por vírgula)
3. Notas sobre política de bibliotecas

**Arquivos afetados:**
- `.cursor/libs/allowed-libs.md`
- `.cursor/libs/forbidden-libs.md`

**Exemplo:**
```
📝 Respondendo perguntas do grupo: 📚 Bibliotecas

? Bibliotecas permitidas adicionais (separadas por vírgula, ou deixe em branco):
> date-fns, zod, react-query

? Bibliotecas proibidas adicionais (separadas por vírgula, ou deixe em branco):
> moment, lodash, axios

? Notas sobre política de bibliotecas (ou deixe em branco):
> Preferir bibliotecas leves e modernas. Evitar dependências pesadas.

✅ Grupo "📚 Bibliotecas" configurado com sucesso!
```

---

### 4. 🏗️ Arquitetura Detalhada

**O que configura:**
- Estilo arquitetural do projeto
- Decisões arquiteturais principais
- Padrões de design utilizados

**Perguntas:**
1. Estilo arquitetural (ex: Monolito, Microserviços, Serverless)
2. Decisões arquiteturais principais (separadas por vírgula)
3. Padrões de design utilizados (separados por vírgula)

**Arquivos afetados:**
- `.cursor/context/architecture.md`

**Exemplo:**
```
📝 Respondendo perguntas do grupo: 🏗️ Arquitetura Detalhada

? Estilo arquitetural do projeto (ex: Monolito, Microserviços, Serverless):
> Arquitetura de Microserviços

? Decisões arquiteturais principais (separadas por vírgula, ou deixe em branco):
> API Gateway, Event-Driven, CQRS, Domain-Driven Design

? Padrões de design utilizados (separados por vírgula, ou deixe em branco):
> Repository Pattern, Factory Pattern, Strategy Pattern

✅ Grupo "🏗️ Arquitetura Detalhada" configurado com sucesso!
```

---

### 5. 🔒 Segurança

**O que configura:**
- Método de autenticação
- Medidas de proteção de dados
- Regras de segurança específicas

**Perguntas:**
1. Método de autenticação utilizado
2. Medidas de proteção de dados
3. Regras de segurança específicas (separadas por vírgula)

**Arquivos afetados:**
- `.cursor/rules/security-rules.md`

**Exemplo:**
```
📝 Respondendo perguntas do grupo: 🔒 Segurança

? Método de autenticação utilizado (ou deixe em branco):
> JWT com refresh tokens, OAuth2 para terceiros

? Medidas de proteção de dados (ou deixe em branco):
> Criptografia em repouso e em trânsito, PII mascarado em logs

? Regras de segurança específicas (separadas por vírgula, ou deixe em branco):
> Rate limiting, CORS restritivo, Validação de input rigorosa

✅ Grupo "🔒 Segurança" configurado com sucesso!
```

---

### 6. 🧪 Testes

**O que configura:**
- Estratégia de testes customizada
- Cobertura mínima esperada
- Ferramentas de teste utilizadas

**Perguntas:**
1. Estratégia de testes
2. Cobertura de testes mínima esperada (ex: 80%)
3. Ferramentas de teste utilizadas (separadas por vírgula)

**Arquivos afetados:**
- `.cursor/rules/testing-rules.md`

**Exemplo:**
```
📝 Respondendo perguntas do grupo: 🧪 Testes

? Estratégia de testes (ou deixe em branco para usar padrão):
> TDD obrigatório, testes unitários + integração + E2E

? Cobertura de testes mínima esperada (ex: 80%, ou deixe em branco):
> 85%

? Ferramentas de teste utilizadas (separadas por vírgula, ou deixe em branco):
> Vitest, Testing Library, Playwright, MSW

✅ Grupo "🧪 Testes" configurado com sucesso!
```

---

### 7. 📦 Deploy

**O que configura:**
- Método de deploy
- Infraestrutura utilizada
- Ferramenta de CI/CD
- Ambientes disponíveis

**Perguntas:**
1. Método de deploy (ex: Docker, Vercel, AWS)
2. Infraestrutura utilizada
3. Ferramenta de CI/CD (ex: GitHub Actions, GitLab CI)
4. Ambientes disponíveis (ex: dev, staging, prod)

**Arquivos afetados:**
- `.cursor/context/deployment.md`

**Exemplo:**
```
📝 Respondendo perguntas do grupo: 📦 Deploy

? Método de deploy (ex: Docker, Vercel, AWS, ou deixe em branco):
> Docker containers em Kubernetes

? Infraestrutura utilizada (ou deixe em branco):
> AWS EKS, RDS PostgreSQL, S3, CloudFront

? Ferramenta de CI/CD (ex: GitHub Actions, GitLab CI, ou deixe em branco):
> GitHub Actions

? Ambientes disponíveis (ex: dev, staging, prod, ou deixe em branco):
> development, staging, production

✅ Grupo "📦 Deploy" configurado com sucesso!
```

---

### 8. 📝 Documentação

**O que configura:**
- Padrões de documentação
- Ferramenta de documentação de API
- Padrão de comentários no código

**Perguntas:**
1. Padrões de documentação
2. Ferramenta de documentação de API (ex: Swagger)
3. Padrão de comentários no código

**Arquivos afetados:**
- `.cursor/rules/ai-usage-rules.md` (seção de documentação)

**Exemplo:**
```
📝 Respondendo perguntas do grupo: 📝 Documentação

? Padrões de documentação (ou deixe em branco):
> README em cada módulo, JSDoc para funções públicas, ADRs para decisões importantes

? Ferramenta de documentação de API (ex: Swagger, ou deixe em branco):
> Swagger/OpenAPI 3.0

? Padrão de comentários no código (ou deixe em branco):
> Comentários em pt-BR, código em inglês. JSDoc para funções públicas.

✅ Grupo "📝 Documentação" configurado com sucesso!
```

---

## 🔄 Fluxo Iterativo

O fluxo avançado funciona de forma iterativa:

```
1. Responder perguntas básicas
   ↓
2. Confirmar uso de opções avançadas
   ↓
3. Menu de seleção de grupos
   ↓
4. Selecionar grupo
   ↓
5. Responder perguntas do grupo
   ↓
6. Grupo marcado como "✓ (já respondido)"
   ↓
7. Voltar ao menu (grupo indisponível)
   ↓
8. Selecionar outro grupo ou finalizar
   ↓
9. Processar todas as respostas
   ↓
10. Gerar estrutura personalizada ✅
```

---

## 💡 Exemplo Completo

```bash
$ setai init --advanced

# ... perguntas básicas ...

🔧 Deseja configurar opções avançadas?
  ❯ Yes

🔧 Configuração Avançada

Você pode responder os grupos na ordem que preferir.
Grupos já respondidos ficarão indisponíveis.

📋 Selecione um grupo de configuração avançada para preencher:
  ❯ 🤖 AI Usage Rules
    👥 Responsabilidades
    📚 Bibliotecas
    🏗️ Arquitetura Detalhada
    🔒 Segurança
    🧪 Testes
    📦 Deploy
    📝 Documentação
    ✅ Finalizar configuração avançada

# Usuário seleciona "🤖 AI Usage Rules"
📝 Respondendo perguntas do grupo: 🤖 AI Usage Rules
# ... perguntas do grupo ...
✅ Grupo "🤖 AI Usage Rules" configurado com sucesso!

📋 Selecione um grupo de configuração avançada para preencher:
    🤖 AI Usage Rules ✓ (já respondido) [indisponível]
  ❯ 👥 Responsabilidades
    📚 Bibliotecas
    # ... outros grupos ...

# Usuário seleciona "📚 Bibliotecas"
📝 Respondendo perguntas do grupo: 📚 Bibliotecas
# ... perguntas do grupo ...
✅ Grupo "📚 Bibliotecas" configurado com sucesso!

📋 Selecione um grupo de configuração avançada para preencher:
    🤖 AI Usage Rules ✓ (já respondido) [indisponível]
    📚 Bibliotecas ✓ (já respondido) [indisponível]
  ❯ ✅ Finalizar configuração avançada

# Usuário finaliza
✅ Estrutura gerada com todas as personalizações!
```

---

## 📁 Arquivos Afetados por Cada Grupo

### AI Usage Rules
- `.cursor/rules/ai-usage-rules.md`
- `.cursor/libs/ai-models.md`

### Responsabilidades
- `.cursor/rules/ai-usage-rules.md`

### Bibliotecas
- `.cursor/libs/allowed-libs.md`
- `.cursor/libs/forbidden-libs.md`

### Arquitetura Detalhada
- `.cursor/context/architecture.md`

### Segurança
- `.cursor/rules/security-rules.md`

### Testes
- `.cursor/rules/testing-rules.md`

### Deploy
- `.cursor/context/deployment.md`

### Documentação
- `.cursor/rules/ai-usage-rules.md` (seção de documentação)

---

## 🎯 Quando Usar Modo Avançado

✅ **Use quando:**
- Precisa personalizar regras específicas de IA
- Quer definir bibliotecas permitidas/proibidas customizadas
- Precisa documentar decisões arquiteturais detalhadas
- Quer configurar regras de segurança específicas
- Precisa definir estratégia de testes customizada
- Quer documentar configurações de deploy
- Precisa estabelecer padrões de documentação

❌ **Não use quando:**
- É sua primeira vez usando o CLI
- Quer começar rapidamente
- Não precisa de personalização específica
- A estrutura básica é suficiente

---

## 💡 Dicas

1. **Ordem de Resposta:**
   - Você pode responder os grupos na ordem que preferir
   - Não há ordem obrigatória

2. **Pular Grupos:**
   - Você pode finalizar sem responder todos os grupos
   - Apenas os grupos respondidos serão aplicados

3. **Editar Depois:**
   - Todos os arquivos gerados são editáveis
   - Você pode modificar manualmente após a geração

4. **Reexecutar:**
   - Se quiser adicionar mais configurações, execute `setai init --advanced` novamente
   - Será perguntado se deseja sobrescrever

---

## 🔗 Links Relacionados

- [Uso Básico](./USAGE_BASIC.md) - Modo básico
- [Modo Beta](./USAGE_BETA.md) - Integração com IA
- [Exemplos](./EXAMPLES.md) - Exemplos práticos
- [Configuração](./CONFIGURATION.md) - Gerenciamento de API keys

