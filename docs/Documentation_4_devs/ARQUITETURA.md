# Arquitetura do Sistema

Este documento descreve a arquitetura do SetAI CLI, explicando o design, padrões utilizados e decisões arquiteturais.

## 🏗️ Visão Geral

O SetAI CLI segue uma arquitetura modular baseada em **engines** e **serviços**, com separação clara de responsabilidades:

```
┌─────────────────┐
│   src/index.ts  │  ← Entry Point (CLI)
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│Commands│ │ Config│
└───┬───┘ └───┬───┘
    │         │
┌───▼─────────▼───┐
│    Engines      │  ← Lógica de Negócio
└───┬─────────────┘
    │
┌───▼─────────────┐
│    Services     │  ← Integrações Externas
└───┬─────────────┘
    │
┌───▼─────────────┐
│    Utils        │  ← Utilitários
└─────────────────┘
```

## 📦 Camadas da Arquitetura

### 1. Camada de Apresentação (CLI)

**Arquivos**: `src/index.ts`, `src/commands/*.ts`

**Responsabilidades:**
- Parsing de argumentos e opções
- Definição de comandos
- Inicialização do sistema (i18n, config)
- Tratamento de erros de alto nível

**Padrões:**
- **Commander.js**: Framework CLI para parsing
- **Separação de comandos**: Cada comando em arquivo separado

### 2. Camada de Aplicação (Commands)

**Arquivos**: `src/commands/init.ts`, `src/commands/config.ts`

**Responsabilidades:**
- Orquestração do fluxo de execução
- Coordenação entre engines
- Tratamento de erros específicos do comando
- Feedback ao usuário

**Fluxo do comando `init`:**
```
initCommand()
  ├─> Verifica permissões
  ├─> Coleta seleção de IDE
  ├─> Verifica se pasta existe
  ├─> Coleta informações (question-engine)
  ├─> Coleta avançado (advanced-groups-collector)
  ├─> Enriquece com IA (ai-service) [opcional]
  ├─> Valida informações (validator)
  ├─> Processa templates (template-engine)
  └─> Gera arquivos (file-generator)
```

### 3. Camada de Domínio (Engines)

**Arquivos**: `src/engines/*.ts`

**Responsabilidades:**
- Lógica de negócio específica
- Processamento de dados
- Validação de regras de negócio

**Engines:**

#### `question-engine.ts`
- **Responsabilidade**: Coleta informações do usuário
- **Padrão**: Question-Answer Pattern
- **Dependências**: `inquirer`, `i18n`

#### `template-engine.ts`
- **Responsabilidade**: Processa templates e substitui placeholders
- **Padrão**: Template Method Pattern
- **Características**:
  - Suporta placeholders `{{KEY}}`
  - Suporta blocos condicionais `{{#if KEY}}...{{/if}}`
  - Carrega templates por idioma

#### `file-generator.ts`
- **Responsabilidade**: Gera arquivos e diretórios
- **Padrão**: Builder Pattern
- **Características**:
  - Cria diretórios automaticamente
  - Escreve arquivos com conteúdo processado
  - Exibe resumo de arquivos criados

#### `validator.ts`
- **Responsabilidade**: Valida inputs do usuário
- **Padrão**: Validator Pattern
- **Características**:
  - Valida campos obrigatórios
  - Mensagens de erro traduzidas

#### `ide-selector.ts`
- **Responsabilidade**: Seleção de IDE e determinação da pasta
- **Padrão**: Strategy Pattern
- **Características**:
  - Mapeamento de IDEs para pastas
  - Suporte a IDEs customizadas

#### `advanced-groups-collector.ts`
- **Responsabilidade**: Coleta configurações avançadas em grupos
- **Padrão**: Iterator Pattern
- **Características**:
  - Seleção iterativa de grupos
  - Grupos já respondidos são marcados
  - Permite finalizar a qualquer momento

### 4. Camada de Serviços

**Arquivos**: `src/services/*.ts`

**Responsabilidades:**
- Integrações com serviços externos
- Comunicação com APIs
- Tratamento de erros de rede

**Serviços:**

#### `ai-service.ts`
- **Responsabilidade**: Integração com modelos de IA
- **Padrão**: Adapter Pattern
- **Características**:
  - Suporta múltiplos provedores (OpenAI, Anthropic, Google)
  - Retry com exponential backoff
  - Validação de respostas JSON

#### `providers/*.ts`
- **Responsabilidade**: Implementação específica de cada provedor
- **Padrão**: Strategy Pattern
- **Provedores**:
  - `openai-provider.ts`: OpenAI API
  - `anthropic-provider.ts`: Anthropic API
  - `google-provider.ts`: Google AI API

### 5. Camada de Infraestrutura

**Arquivos**: `src/utils/*.ts`, `src/config/*.ts`

**Responsabilidades:**
- Utilitários reutilizáveis
- Gerenciamento de configuração
- Acesso a recursos do sistema

**Utilitários:**

#### `i18n.ts`
- **Responsabilidade**: Internacionalização
- **Padrão**: Singleton Pattern (estado global)
- **Características**:
  - Carrega traduções de arquivos JSON
  - Fallback para pt-BR
  - Suporte a parâmetros

#### `output.ts`
- **Responsabilidade**: Saída no console
- **Padrão**: Facade Pattern
- **Características**:
  - Centraliza `console.log`
  - Suporta cores (chalk)
  - Suporta tradução

#### `retry.ts`
- **Responsabilidade**: Retry com exponential backoff
- **Padrão**: Decorator Pattern
- **Características**:
  - Configurável (maxRetries, delays)
  - Filtro de erros retryable

#### `json-validator.ts`
- **Responsabilidade**: Validação de JSON
- **Padrão**: Validator Pattern
- **Características**:
  - Usa Zod para validação
  - Extrai JSON de markdown

#### `config-manager.ts`
- **Responsabilidade**: Gerenciamento de configuração
- **Padrão**: Repository Pattern
- **Características**:
  - Armazena em `~/.setai/config.json`
  - Cache de configuração
  - API keys criptografadas (futuro)

## 🔄 Fluxo de Dados

### Fluxo Principal (comando `init`)

```
1. Usuário executa: setai init --advanced --beta
   │
   ├─> index.ts: Parse arguments
   │
   ├─> init.ts: initCommand(advanced=true, beta=true)
   │   │
   │   ├─> Verifica permissões
   │   │
   │   ├─> ide-selector: Coleta seleção de IDE
   │   │   └─> Retorna: { ide: 'cursor', configFolder: '.cursor' }
   │   │
   │   ├─> file-generator: Verifica se pasta existe
   │   │   └─> Pergunta se deve sobrescrever (se existir)
   │   │
   │   ├─> question-engine: Coleta informações básicas
   │   │   └─> Retorna: ProjectInfo (parcial)
   │   │
   │   ├─> advanced-groups-collector: Coleta grupos avançados
   │   │   └─> Retorna: AdvancedConfig
   │   │
   │   ├─> ai-service: Enriquece com IA (se beta=true)
   │   │   ├─> Carrega prompt
   │   │   ├─> Seleciona provedor
   │   │   ├─> Faz chamada à API (com retry)
   │   │   ├─> Valida resposta JSON
   │   │   └─> Retorna: AIGeneratedContent
   │   │
   │   ├─> validator: Valida ProjectInfo completo
   │   │   └─> Lança erro se inválido
   │   │
   │   ├─> template-engine: Processa todos os templates
   │   │   ├─> Carrega templates do idioma correto
   │   │   ├─> Substitui placeholders
   │   │   ├─> Processa blocos condicionais
   │   │   └─> Retorna: Map<path, content>
   │   │
   │   └─> file-generator: Gera arquivos
   │       ├─> Cria diretórios
   │       ├─> Escreve arquivos
   │       └─> Exibe resumo
   │
   └─> Sucesso! Estrutura .cursor/ criada
```

## 🎨 Padrões de Design Utilizados

### 1. Command Pattern
**Onde**: `src/commands/*.ts`
**Por quê**: Separa comandos CLI em classes/funções isoladas

### 2. Strategy Pattern
**Onde**: `src/services/providers/*.ts`, `src/engines/ide-selector.ts`
**Por quê**: Permite trocar algoritmos (provedores de IA, IDEs) em runtime

### 3. Template Method Pattern
**Onde**: `src/engines/template-engine.ts`
**Por quê**: Define estrutura de processamento de templates, permitindo variações

### 4. Builder Pattern
**Onde**: `src/engines/file-generator.ts`
**Por quê**: Constrói estrutura de arquivos passo a passo

### 5. Adapter Pattern
**Onde**: `src/services/ai-service.ts`
**Por quê**: Adapta diferentes APIs de IA para interface comum

### 6. Repository Pattern
**Onde**: `src/config/config-manager.ts`
**Por quê**: Abstrai acesso a configuração persistida

### 7. Singleton Pattern
**Onde**: `src/utils/i18n.ts`
**Por quê**: Estado global de idioma atual

### 8. Facade Pattern
**Onde**: `src/utils/output.ts`
**Por quê**: Simplifica interface de saída no console

## 🔐 Segurança

### API Keys
- **Armazenamento**: `~/.setai/config.json` (não commitado)
- **Acesso**: Apenas via `config-manager.ts`
- **Futuro**: Criptografia de API keys

### Validação
- **Inputs do usuário**: Validados em `validator.ts`
- **Respostas de IA**: Validadas com Zod em `json-validator.ts`
- **Templates**: Sanitizados antes de processamento

## 🌐 Internacionalização

### Arquitetura i18n
```
locales/
├── pt-BR/
│   ├── questions.json
│   ├── messages.json
│   ├── validation.json
│   └── templates.json
├── en/
└── es/
```

### Fluxo de Tradução
1. `i18n.ts` carrega traduções do idioma atual
2. Funções `t*()` substituem chaves por valores
3. Fallback para pt-BR se tradução não encontrada
4. Templates carregados por idioma (`templates/.cursor.<locale>/`)

## 🧪 Testabilidade

### Estrutura de Testes
- **Testes unitários**: `src/__tests__/*.test.ts`
- **Cobertura**: Vitest com v8
- **Mocks**: Para serviços externos (APIs de IA)

### Princípios
- **Separação de responsabilidades**: Facilita testes isolados
- **Injeção de dependências**: Permite mocks
- **Funções puras**: Onde possível, facilita testes

## 📈 Escalabilidade

### Adicionar Novo Provedor de IA
1. Criar `src/services/providers/novo-provider.ts`
2. Implementar interface comum
3. Registrar em `ai-service.ts`

### Adicionar Novo Idioma
1. Criar `locales/<locale>/*.json`
2. Criar `templates/.cursor.<locale>/`
3. Adicionar tipo em `SupportedLocale`

### Adicionar Novo Grupo Avançado
1. Adicionar em `advanced-groups-collector.ts`
2. Adicionar tipo em `AdvancedConfig`
3. Adicionar perguntas em `question-engine.ts`

## 🎯 Próximos Passos

- Veja [FLUXO_DADOS](./FLUXO_DADOS) para entender o fluxo detalhado
- Consulte [DESENVOLVIMENTO](./DESENVOLVIMENTO) para começar a desenvolver
