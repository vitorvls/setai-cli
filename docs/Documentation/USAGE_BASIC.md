# Uso Básico - SetAI CLI

Guia completo sobre o uso básico do SetAI CLI.

## 📋 Visão Geral

O modo básico do SetAI CLI permite gerar uma estrutura completa de configuração para desenvolvimento assistido por IA com perguntas essenciais sobre o projeto.

---

## 🎯 Comando Principal

### `setai init`

Gera a estrutura de configuração básica.

**Sintaxe:**
```bash
setai init
```

**O que faz:**
1. Pergunta qual IDE você está usando
2. Coleta informações básicas do projeto
3. Coleta informações sobre stack tecnológica
4. Gera estrutura na pasta apropriada

---

## 📝 Perguntas Básicas

### 1. Seleção de IDE

```
? Qual IDE você está usando?
  ❯ Cursor
    VS Code
    JetBrains (IntelliJ, WebStorm, etc.)
    Outra IDE / Genérico (.ai)
```

**Impacto:**
- **Cursor** → Gera em `.cursor/`
- **VS Code** → Gera em `.vscode/`
- **JetBrains** → Gera em `.idea/`
- **Outra IDE** → Gera em `.ai/` (ou pasta customizada)

### 2. Informações do Projeto

#### Nome do Projeto
```
? Qual o nome do projeto?
> meu-projeto
```

**Validação:**
- Não pode estar vazio
- Deve ser um nome válido

#### Descrição do Problema
```
? Descreva o problema que este projeto resolve:
> Sistema de gerenciamento de tarefas para equipes
```

**Uso:**
- Preenche `project-goals.md`
- Usado para contexto de IA

#### Importância do Problema
```
? Por que este problema importa?
> Aumenta produtividade e organização da equipe
```

**Uso:**
- Preenche `project-goals.md`
- Explica o valor do projeto

#### Usuários Principais
```
? Quem são os usuários principais deste projeto?
> Desenvolvedores, Product Managers, Tech Leads
```

**Formato:**
- Pode ser lista separada por vírgula
- Será formatado como lista markdown

**Uso:**
- Preenche `project-goals.md` e `architecture.md`

#### Objetivos de Negócio
```
? Quais são os objetivos de negócio principais?
> Reduzir tempo de desenvolvimento, melhorar qualidade do código
```

**Uso:**
- Preenche `project-goals.md`

#### Restrições Técnicas
```
? Quais são as restrições técnicas? (ou "Nenhuma" se não houver)
> Deve funcionar offline, suportar múltiplos navegadores
```

**Padrão:** "Nenhuma"

**Uso:**
- Preenche `project-goals.md`

#### Restrições de Negócio
```
? Quais são as restrições de negócio? (ou "Nenhuma" se não houver)
> Orçamento limitado, prazo de 3 meses
```

**Padrão:** "Nenhuma"

**Uso:**
- Preenche `project-goals.md`

#### Não-objetivos
```
? O que este projeto NÃO faz? (o que está fora do escopo)
> Não inclui mobile app, não suporta integração com X
```

**Uso:**
- Preenche `project-goals.md`
- Define limites claros do projeto

#### Versão Inicial
```
? Qual a versão inicial do projeto?
> 0.1.0
```

**Padrão:** `0.1.0`

**Validação:**
- Deve seguir formato semântico (ex: `1.0.0`, `0.1.0`)
- Aceita sufixos (ex: `1.0.0-beta.1`)

**Uso:**
- Preenche vários arquivos de contexto

### 3. Stack Tecnológica

#### Linguagem Principal
```
? Qual a linguagem principal do projeto?
  ❯ TypeScript
    JavaScript
    Python
    Go
    Rust
    Outro
```

**Uso:**
- Preenche `tech-stack.md`
- Afeta regras de código e testes

#### Framework
```
? Qual framework você está usando?
  ❯ Next.js
    React
    Vue
    Angular
    Express
    FastAPI
    Django
    Nenhum
    Outro
```

**Condição:** Aparece apenas se linguagem for TypeScript ou JavaScript

**Uso:**
- Preenche `tech-stack.md` e `architecture.md`

#### Banco de Dados
```
? Qual banco de dados você está usando?
  ❯ PostgreSQL
    MySQL
    MongoDB
    SQLite
    Supabase
    Nenhum
    Outro
```

**Uso:**
- Preenche `tech-stack.md` e `architecture.md`

### 4. Preferências

#### TDD (Test-Driven Development)
```
? Você usa TDD (Test-Driven Development)?
  ❯ Yes
     No
```

**Padrão:** `Yes`

**Uso:**
- Preenche `testing-rules.md`
- Afeta regras de desenvolvimento

#### Strict Mode (TypeScript)
```
? Você prefere modo strict no TypeScript?
  ❯ Yes
     No
```

**Condição:** Aparece apenas se linguagem for TypeScript

**Padrão:** `Yes`

**Uso:**
- Preenche `code-style.md`
- Afeta configuração TypeScript

---

## 📁 Arquivos Gerados

### Context (`context/`)

#### `project-goals.md`
- Objetivos de negócio
- Problema e importância
- Usuários principais
- Restrições

#### `tech-stack.md`
- Linguagem
- Framework
- Banco de dados
- Versões

#### `architecture.md`
- Visão geral do sistema
- Decisões arquiteturais básicas
- Stack tecnológica

#### `deployment.md`
- Estratégia de deploy básica
- Ambientes

### Rules (`rules/`)

#### `code-style.md`
- Regras de formatação
- Convenções de nomenclatura
- Configuração de lint
- TDD obrigatório

#### `testing-rules.md`
- Estratégia de testes
- TDD obrigatório
- Cobertura mínima

#### `git-rules.md`
- Padrões de commit
- Estrutura de branches
- Git hooks

#### `security-rules.md`
- Regras de segurança
- Boas práticas

#### `ai-usage-rules.md`
- Regras básicas de uso de IA
- Modelos recomendados

#### `business-rules.md`
- Regras de negócio do CLI
- Validações

### Libs (`libs/`)

#### `allowed-libs.md`
- Bibliotecas permitidas padrão
- Lista base

#### `forbidden-libs.md`
- Bibliotecas proibidas padrão
- Alternativas recomendadas

#### `ai-models.md`
- Modelos de IA recomendados
- Casos de uso

### Commands (`commands/`)

#### `architecture-review.md`
- Comando de revisão arquitetural

#### `refactor-controlled.md`
- Comando de refatoração controlada

#### `generate-docs.md`
- Comando de geração de documentação

#### `test-strategy.md`
- Comando de estratégia de testes

---

## 🔄 Fluxo Completo

```
1. Usuário executa: setai init
   ↓
2. CLI pergunta: Qual IDE?
   ↓
3. CLI pergunta: Informações do projeto
   ↓
4. CLI pergunta: Stack tecnológica
   ↓
5. CLI pergunta: Preferências
   ↓
6. CLI valida respostas
   ↓
7. CLI processa templates
   ↓
8. CLI gera arquivos
   ↓
9. Estrutura criada! ✅
```

---

## 💡 Exemplos de Uso

### Exemplo 1: Projeto React

```bash
$ setai init

? Qual IDE você está usando? Cursor
? Qual o nome do projeto? meu-app-react
? Descreva o problema que este projeto resolve: App de gerenciamento de tarefas
? Por que este problema importa? Aumenta produtividade
? Quem são os usuários principais? Desenvolvedores, usuários finais
? Quais são os objetivos de negócio? MVP em 2 meses
? Quais são as restrições técnicas? Deve funcionar offline
? Quais são as restrições de negócio? Orçamento limitado
? O que este projeto NÃO faz? Não inclui backend
? Qual a versão inicial do projeto? 0.1.0
? Qual a linguagem principal? TypeScript
? Qual framework você está usando? React
? Qual banco de dados você está usando? Supabase
? Você usa TDD? Yes
? Você prefere modo strict no TypeScript? Yes

✅ Estrutura .cursor/ gerada com sucesso!
```

### Exemplo 2: Projeto Backend Python

```bash
$ setai init

? Qual IDE você está usando? VS Code
? Qual o nome do projeto? api-backend
? Descreva o problema que este projeto resolve: API REST para sistema de vendas
? Por que este problema importa? Automatiza processos
? Quem são os usuários principais? Desenvolvedores, integradores
? Quais são os objetivos de negócio? Alta disponibilidade, escalabilidade
? Quais são as restrições técnicas? Deve suportar 10k req/s
? Quais são as restrições de negócio? Nenhuma
? O que este projeto NÃO faz? Não inclui frontend
? Qual a versão inicial do projeto? 1.0.0
? Qual a linguagem principal? Python
? Qual banco de dados você está usando? PostgreSQL
? Você usa TDD? Yes

✅ Estrutura .vscode/ gerada com sucesso!
```

---

## ⚙️ Opções Disponíveis

### Sem Flags

```bash
setai init
```

**Comportamento:**
- Perguntas básicas apenas
- Gera estrutura essencial
- Ideal para começar rápido

---

## 🎯 Quando Usar Modo Básico

✅ **Use quando:**
- É sua primeira vez usando o CLI
- Quer começar rapidamente
- Precisa apenas da estrutura essencial
- Não precisa de personalização avançada

❌ **Não use quando:**
- Precisa configurar regras específicas de IA
- Quer personalizar bibliotecas permitidas/proibidas
- Precisa de configurações de segurança customizadas
- Quer usar integração com IA para enriquecer respostas

**Para esses casos, veja:**
- [Uso Avançado](./USAGE_ADVANCED.md) - `setai init --advanced`
- [Modo Beta](./USAGE_BETA.md) - `setai init --beta`

---

## 📚 Próximos Passos

Após usar o modo básico:

1. **Revise a estrutura gerada**
   - Leia `.cursor/README.md`
   - Verifique se tudo está correto

2. **Configure Lint e Formatter**
   - Siga `.cursor/rules/code-style.md`
   - Configure ESLint e Prettier

3. **Explore opções avançadas**
   - Veja [Uso Avançado](./USAGE_ADVANCED.md)
   - Experimente `setai init --advanced`

---

## ❓ FAQ

### Posso pular perguntas?

Não, todas as perguntas básicas são obrigatórias para garantir que a estrutura seja completa.

### Posso editar depois?

Sim! Todos os arquivos gerados são editáveis. Você pode modificar qualquer arquivo após a geração.

### E se eu errar uma resposta?

Não há problema! Você pode:
1. Executar `setai init` novamente (será perguntado se deseja sobrescrever)
2. Editar os arquivos manualmente

### A estrutura é commitada no Git?

Sim, a estrutura `.cursor/` (ou equivalente) deve ser commitada no Git para que toda a equipe tenha acesso às configurações.

---

## 🔗 Links Relacionados

- [Getting Started](./GETTING_STARTED.md) - Guia de instalação
- [Uso Avançado](./USAGE_ADVANCED.md) - Configurações avançadas
- [Exemplos](./EXAMPLES.md) - Exemplos práticos
- [Troubleshooting](./TROUBLESHOOTING.md) - Solução de problemas

