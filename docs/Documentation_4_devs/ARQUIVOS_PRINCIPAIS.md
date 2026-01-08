# Arquivos Principais

Este documento descreve os principais arquivos do projeto, explicando o que cada um faz e sua importância.

## 📄 Arquivos de Configuração

### `package.json`
**Localização**: Raiz do projeto  
**Propósito**: Configuração do projeto Node.js

**Principais seções:**
- `name`: `@setai/cli` - Nome do pacote
- `version`: Versão atual do projeto
- `bin.setai`: Caminho para o executável CLI
- `scripts`: Comandos npm/pnpm disponíveis
  - `build`: Compila TypeScript para JavaScript
  - `dev`: Modo desenvolvimento com watch
  - `test`: Executa testes
  - `lint`: Verifica código com ESLint
  - `docs:serve`: Serve documentação com Docsify
- `dependencies`: Dependências de produção
  - `commander`: Framework CLI
  - `inquirer`: Prompts interativos
  - `chalk`: Cores no terminal
  - `fs-extra`: Operações de arquivo
  - `openai`, `@anthropic-ai/sdk`, `@google/generative-ai`: SDKs de IA
  - `zod`: Validação de schemas
- `devDependencies`: Dependências de desenvolvimento
  - `typescript`: Compilador TypeScript
  - `tsup`: Build tool
  - `vitest`: Framework de testes
  - `eslint`: Linter
  - `prettier`: Formatador

### `tsconfig.json`
**Localização**: Raiz do projeto  
**Propósito**: Configuração do compilador TypeScript

**Configurações importantes:**
- `target: "ES2022"` - Compila para ES2022
- `module: "ESNext"` - Usa módulos ESNext
- `strict: true` - Modo strict habilitado
- `outDir: "./dist"` - Saída do build
- `rootDir: "./src"` - Diretório raiz do código fonte

### `tsup.config.ts`
**Localização**: Raiz do projeto  
**Propósito**: Configuração do tsup (build tool)

**Configurações:**
- `entry: ['src/index.ts']` - Arquivo de entrada
- `format: ['esm']` - Formato ESM
- `target: 'node18'` - Target Node.js 18
- `banner`: Adiciona shebang `#!/usr/bin/env node` para executável

### `vitest.config.ts`
**Localização**: Raiz do projeto  
**Propósito**: Configuração do Vitest

**Configurações:**
- `environment: 'node'` - Ambiente Node.js
- `coverage.provider: 'v8'` - Provider de coverage
- `coverage.reporter`: Formatos de relatório

### `eslint.config.mjs`
**Localização**: Raiz do projeto  
**Propósito**: Configuração do ESLint

**Características:**
- Parser TypeScript
- Plugins: TypeScript ESLint, Prettier
- Regras customizadas
- Ignora: `dist/`, `node_modules/`, etc.

## 📂 Arquivos de Código Fonte

### `src/index.ts`
**Localização**: `src/index.ts`  
**Propósito**: Entry point principal do CLI

**Responsabilidades:**
- Inicializa o Commander.js
- Define comandos (`init`, `config`)
- Configura i18n (carrega idioma salvo)
- Trata argumentos e opções
- Exibe ajuda e exemplos

**Estrutura:**
```typescript
- initializeI18n(): Carrega configuração de idioma
- program.command('init'): Define comando init
- program.command('config'): Define comando config
- program.parse(): Executa parsing de argumentos
```

### `src/commands/init.ts`
**Localização**: `src/commands/init.ts`  
**Propósito**: Implementação do comando `setai init`

**Fluxo principal:**
1. Carrega configuração de idioma
2. Verifica permissões de escrita
3. Coleta seleção de IDE
4. Verifica se pasta já existe (pergunta se deve sobrescrever)
5. Coleta informações básicas do projeto
6. Coleta configurações avançadas (se `--advanced`)
7. Enriquece com IA (se `--beta`)
8. Valida informações
9. Processa templates
10. Gera arquivos

**Funções principais:**
- `initCommand(advanced, beta, langOverride)`: Função principal

### `src/commands/config.ts`
**Localização**: `src/commands/config.ts`  
**Propósito**: Implementação do comando `setai config`

**Funcionalidades:**
- Adicionar/atualizar API keys
- Remover API keys
- Listar API keys configuradas
- Configurar idioma

**Funções principais:**
- `configCommand()`: Função principal
- `handleSetAPIKey()`: Gerencia adição de API keys
- `handleRemoveAPIKey()`: Gerencia remoção de API keys
- `handleListAPIKeys()`: Lista API keys
- `handleSetLanguage()`: Configura idioma

## 🔧 Engines

### `src/engines/question-engine.ts`
**Localização**: `src/engines/question-engine.ts`  
**Propósito**: Coleta informações do usuário via perguntas interativas

**Funções principais:**
- `collectProjectInfo(advanced, beta)`: Coleta todas as informações do projeto
  - Perguntas básicas (nome, descrição, stack, etc.)
  - Perguntas avançadas (se `advanced === true`)
  - Integra com `advanced-groups-collector.ts` para grupos avançados

**Perguntas coletadas:**
- Informações básicas do projeto
- Stack tecnológica
- Preferências (TDD, strict mode)
- Configurações avançadas (se aplicável)

### `src/engines/template-engine.ts`
**Localização**: `src/engines/template-engine.ts`  
**Propósito**: Processa templates e preenche com dados coletados

**Funções principais:**
- `loadTemplate(templatePath, locale)`: Carrega template do disco
- `processTemplate(template, data)`: Processa template substituindo placeholders
- `processAllTemplates(projectInfo, locale)`: Processa todos os templates

**Características:**
- Suporta placeholders `{{KEY}}`
- Suporta blocos condicionais `{{#if KEY}}...{{/if}}`
- Carrega templates por idioma (`templates/.cursor.<locale>/`)

### `src/engines/file-generator.ts`
**Localização**: `src/engines/file-generator.ts`  
**Propósito**: Gera arquivos e diretórios

**Funções principais:**
- `generateFiles(baseDir, files)`: Gera todos os arquivos
- `checkConfigFolderExists(baseDir, configFolder)`: Verifica se pasta existe
- `checkWritePermissions(baseDir)`: Verifica permissões de escrita

**Responsabilidades:**
- Criar diretórios necessários
- Escrever arquivos com conteúdo processado
- Exibir resumo de arquivos criados

### `src/engines/validator.ts`
**Localização**: `src/engines/validator.ts`  
**Propósito**: Valida inputs do usuário

**Funções principais:**
- `validateProjectInfo(projectInfo)`: Valida informações do projeto
  - Verifica campos obrigatórios
  - Valida formatos
  - Lança erros com mensagens traduzidas

### `src/engines/ide-selector.ts`
**Localização**: `src/engines/ide-selector.ts`  
**Propósito**: Seleção de IDE e determinação da pasta de configuração

**Funções principais:**
- `collectIDESelection()`: Coleta seleção de IDE do usuário
- Retorna configuração de IDE (pasta, nome)

**IDEs suportadas:**
- Cursor → `.cursor`
- VS Code → `.vscode`
- JetBrains → `.idea`
- Outra → `.ai`

### `src/engines/advanced-groups-collector.ts`
**Localização**: `src/engines/advanced-groups-collector.ts`  
**Propósito**: Coleta configurações avançadas em grupos modulares

**Grupos disponíveis:**
1. **AI Usage Rules**: Modelos preferidos, regras de uso
2. **Responsabilidades**: CTO, Tech Lead, Dev
3. **Bibliotecas**: Permitidas, proibidas, notas
4. **Arquitetura Detalhada**: Decisões, padrões, estilo
5. **Segurança**: Regras, autenticação, proteção de dados
6. **Testes**: Estratégia, cobertura, ferramentas
7. **Deploy**: Método, infraestrutura, CI/CD, ambientes
8. **Documentação**: Padrões, API docs, comentários

**Características:**
- Seleção iterativa de grupos
- Grupos já respondidos são marcados como indisponíveis
- Permite finalizar a qualquer momento

## 🛠️ Serviços

### `src/services/ai-service.ts`
**Localização**: `src/services/ai-service.ts`  
**Propósito**: Integração com modelos de IA para enriquecer respostas

**Funções principais:**
- `enhanceWithAI(projectInfo)`: Enriquece informações do projeto usando IA
  - Carrega prompt de análise
  - Seleciona provedor (OpenAI, Anthropic, Google)
  - Faz chamada à API com retry
  - Valida resposta JSON
  - Retorna conteúdo enriquecido

**Características:**
- Retry com exponential backoff
- Validação de JSON com Zod
- Suporte a múltiplos provedores
- Fallback se API falhar

### `src/services/providers/openai-provider.ts`
**Localização**: `src/services/providers/openai-provider.ts`  
**Propósito**: Implementação do provedor OpenAI

**Funções:**
- `generateContent(prompt, options)`: Gera conteúdo usando OpenAI API
- Modelos suportados: GPT-4, GPT-3.5-turbo

### `src/services/providers/anthropic-provider.ts`
**Localização**: `src/services/providers/anthropic-provider.ts`  
**Propósito**: Implementação do provedor Anthropic

**Funções:**
- `generateContent(prompt, options)`: Gera conteúdo usando Anthropic API
- Modelos suportados: Claude 3 Opus, Sonnet, Haiku

### `src/services/providers/google-provider.ts`
**Localização**: `src/services/providers/google-provider.ts`  
**Propósito**: Implementação do provedor Google

**Funções:**
- `generateContent(prompt, options)`: Gera conteúdo usando Google AI API
- Modelos suportados: Gemini Pro, Gemini Pro Vision

## 🔧 Utilitários

### `src/utils/i18n.ts`
**Localização**: `src/utils/i18n.ts`  
**Propósito**: Sistema de internacionalização

**Funções principais:**
- `initI18n(locale)`: Inicializa i18n com idioma
- `setLocale(locale)`: Define idioma atual
- `getLocale()`: Obtém idioma atual
- `t(key, params)`: Tradução genérica
- `tQuestion(key, params)`: Tradução de perguntas
- `tMessage(key, params)`: Tradução de mensagens
- `tValidation(key, params)`: Tradução de validações

**Características:**
- Carrega traduções de `locales/<locale>/*.json`
- Fallback para pt-BR se tradução não encontrada
- Suporte a parâmetros nas traduções

### `src/utils/output.ts`
**Localização**: `src/utils/output.ts`  
**Propósito**: Funções de saída no console

**Funções:**
- `info(message, useTranslation)`: Mensagem informativa (azul)
- `success(message, useTranslation)`: Mensagem de sucesso (verde)
- `error(message, useTranslation)`: Mensagem de erro (vermelho)
- `warning(message, useTranslation)`: Mensagem de aviso (amarelo)
- `gray(message, useTranslation)`: Mensagem em cinza

**Características:**
- Usa `chalk` para cores
- Suporta tradução automática
- Centraliza `console.log` para evitar warnings do ESLint

### `src/utils/retry.ts`
**Localização**: `src/utils/retry.ts`  
**Propósito**: Implementação de retry com exponential backoff

**Funções:**
- `retryWithBackoff(fn, options)`: Executa função com retry

**Configurações:**
- `maxRetries`: Número máximo de tentativas (padrão: 3)
- `initialDelay`: Delay inicial em ms (padrão: 1000)
- `maxDelay`: Delay máximo em ms (padrão: 10000)
- `backoffMultiplier`: Multiplicador de backoff (padrão: 2)
- `retryableErrors`: Função que determina se erro é retryable

### `src/utils/json-validator.ts`
**Localização**: `src/utils/json-validator.ts`  
**Propósito**: Validação de JSON usando Zod

**Funções:**
- `validateAIContent(data)`: Valida conteúdo gerado por IA
- `extractJSON(text)`: Extrai JSON de string (pode conter markdown)

**Características:**
- Usa Zod para validação de schemas
- Extrai JSON de markdown code blocks
- Fallback para extração direta de JSON

## ⚙️ Configuração

### `src/config/config-manager.ts`
**Localização**: `src/config/config-manager.ts`  
**Propósito**: Gerenciamento de configuração do CLI

**Funções principais:**
- `loadConfig()`: Carrega configuração de `~/.setai/config.json`
- `saveConfig(config)`: Salva configuração
- `getAPIKey(provider)`: Obtém API key de um provedor
- `setAPIKey(provider, apiKey, defaultModel)`: Define API key
- `removeAPIKey(provider)`: Remove API key
- `listAPIKeys()`: Lista todas as API keys (sem valores)
- `getLanguageConfig()`: Obtém configuração de idioma
- `saveLanguageConfig(config)`: Salva configuração de idioma

**Estrutura do arquivo de configuração:**
```json
{
  "ai": {
    "openai": {
      "apiKey": "...",
      "defaultModel": "gpt-4"
    }
  },
  "language": {
    "questions": "pt-BR",
    "files": "pt-BR"
  }
}
```

## 📝 Tipos

### `src/types/project-info.ts`
**Localização**: `src/types/project-info.ts`  
**Propósito**: Definições de tipos relacionados a informações do projeto

**Interfaces principais:**
- `ProjectInfo`: Informações completas do projeto
- `TechStack`: Stack tecnológica
- `Preferences`: Preferências do usuário
- `AdvancedConfig`: Configurações avançadas

### `src/types/ide-config.ts`
**Localização**: `src/types/ide-config.ts`  
**Propósito**: Definições de tipos relacionados a configuração de IDEs

**Tipos principais:**
- `IDE`: Tipo de IDE (`'cursor' | 'vscode' | 'jetbrains' | 'other'`)
- `IDEConfig`: Configuração de IDE
- `IDE_CONFIGS`: Mapeamento de IDEs para configurações

## 🧪 Testes

### `src/__tests__/*.test.ts`
**Localização**: `src/__tests__/`  
**Propósito**: Testes unitários

**Arquivos de teste:**
- `cli.test.ts`: Testes do CLI principal
- `question-engine.test.ts`: Testes do engine de perguntas
- `template-engine.test.ts`: Testes do engine de templates
- `file-generator.test.ts`: Testes do gerador de arquivos
- `validator.test.ts`: Testes do validador
- `ai-service.test.ts`: Testes do serviço de IA
- `json-validator.test.ts`: Testes do validador JSON

## 📚 Templates

### `templates/.cursor/`
**Localização**: `templates/.cursor/`  
**Propósito**: Templates padrão (pt-BR)

**Estrutura:**
- Templates para todos os arquivos `.cursor/`
- Placeholders `{{KEY}}` para substituição
- Blocos condicionais `{{#if KEY}}...{{/if}}`

### `templates/.cursor.en/`
**Localização**: `templates/.cursor.en/`  
**Propósito**: Templates em inglês

### `templates/.cursor.es/`
**Localização**: `templates/.cursor.es/`  
**Propósito**: Templates em espanhol

## 🌐 Traduções

### `locales/<locale>/*.json`
**Localização**: `locales/<locale>/`  
**Propósito**: Arquivos de tradução por idioma

**Arquivos:**
- `questions.json`: Traduções das perguntas
- `messages.json`: Traduções de mensagens
- `validation.json`: Traduções de validações
- `templates.json`: Traduções de strings de templates

## 🎯 Próximos Passos

- Veja [ARQUITETURA](./ARQUITETURA) para entender o design do sistema
- Consulte [DESENVOLVIMENTO](./DESENVOLVIMENTO) para começar a desenvolver
