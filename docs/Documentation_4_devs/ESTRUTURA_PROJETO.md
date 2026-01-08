# Estrutura do Projeto

Este documento descreve a estrutura completa do projeto SetAI CLI, explicando o propósito de cada pasta e arquivo.

## 📁 Estrutura de Diretórios

```
setai/
├── dist/                    # Build compilado (gerado automaticamente)
├── docs/                    # Documentação
│   ├── Documentation/      # Documentação para usuários
│   ├── Documentation_4_devs/ # Documentação técnica (esta pasta)
│   └── index.html          # Página principal da documentação (Docsify)
├── locales/                # Arquivos de tradução (i18n)
│   ├── pt-BR/              # Português (Brasil)
│   ├── en/                 # Inglês
│   └── es/                 # Espanhol
├── node_modules/           # Dependências (gerado pelo npm/pnpm)
├── scripts/                # Scripts auxiliares
│   └── test-cli.ps1        # Script PowerShell para testes
├── src/                    # Código fonte TypeScript
│   ├── __tests__/          # Testes unitários
│   ├── commands/           # Comandos CLI
│   ├── config/             # Gerenciamento de configuração
│   ├── engines/            # Engines de processamento
│   ├── prompts/            # Prompts para IA
│   ├── services/           # Serviços (IA, etc.)
│   ├── types/              # Definições de tipos TypeScript
│   └── utils/              # Utilitários
├── templates/              # Templates para geração de arquivos .cursor
├── test-manual/            # Diretório para testes manuais (não commitado)
├── .gitignore             # Arquivos ignorados pelo Git
├── eslint.config.mjs       # Configuração do ESLint
├── package.json            # Configuração do projeto e dependências
├── pnpm-lock.yaml          # Lock file do pnpm
├── README.md               # README principal do projeto
├── tsconfig.json           # Configuração do TypeScript
├── tsup.config.ts          # Configuração do tsup (build tool)
└── vitest.config.ts        # Configuração do Vitest (testes)
```

## 📂 Descrição Detalhada das Pastas

### `/dist/`
**Propósito**: Diretório de saída do build compilado.

- Contém o JavaScript compilado a partir do TypeScript
- Gerado automaticamente pelo comando `pnpm build`
- **Não deve ser commitado** (está no `.gitignore`)
- Arquivos principais:
  - `index.js` - Entry point compilado
  - `index.js.map` - Source maps para debug

### `/docs/`
**Propósito**: Toda a documentação do projeto.

- `Documentation/` - Documentação para usuários finais (pt-BR, en, es)
- `Documentation_4_devs/` - Documentação técnica para desenvolvedores
- `index.html` - Página principal do Docsify
- `_sidebar.md` - Sidebar da documentação

### `/locales/`
**Propósito**: Arquivos de tradução para internacionalização (i18n).

**Estrutura por idioma:**
- `questions.json` - Traduções das perguntas do CLI
- `messages.json` - Traduções de mensagens (info, success, error, warning)
- `validation.json` - Traduções de mensagens de validação
- `templates.json` - Traduções de strings usadas em templates

**Idiomas suportados:**
- `pt-BR/` - Português (Brasil) - Idioma padrão
- `en/` - Inglês
- `es/` - Espanhol

### `/scripts/`
**Propósito**: Scripts auxiliares para desenvolvimento e testes.

- `test-cli.ps1` - Script PowerShell para testar o CLI localmente

### `/src/`
**Propósito**: Todo o código fonte TypeScript do projeto.

#### `/src/__tests__/`
**Propósito**: Testes unitários.

Arquivos de teste:
- `cli.test.ts` - Testes do CLI principal
- `question-engine.test.ts` - Testes do engine de perguntas
- `template-engine.test.ts` - Testes do engine de templates
- `file-generator.test.ts` - Testes do gerador de arquivos
- `validator.test.ts` - Testes do validador
- `ai-service.test.ts` - Testes do serviço de IA
- `json-validator.test.ts` - Testes do validador JSON

#### `/src/commands/`
**Propósito**: Implementação dos comandos CLI.

- `init.ts` - Comando `setai init` (geração da estrutura)
- `config.ts` - Comando `setai config` (gerenciamento de configuração)

#### `/src/config/`
**Propósito**: Gerenciamento de configuração do CLI.

- `config-manager.ts` - Gerencia API keys, idiomas e outras configurações
  - Armazena configuração em `~/.setai/config.json`
  - Funções: `loadConfig()`, `saveConfig()`, `getAPIKey()`, `setAPIKey()`, etc.

#### `/src/engines/`
**Propósito**: Engines de processamento (lógica de negócio).

- `question-engine.ts` - Coleta informações do usuário via perguntas interativas
- `template-engine.ts` - Processa templates e preenche com dados
- `file-generator.ts` - Gera arquivos e diretórios
- `validator.ts` - Valida informações coletadas
- `ide-selector.ts` - Seleção de IDE e determinação da pasta de configuração
- `advanced-groups-collector.ts` - Coleta configurações avançadas (modo `--advanced`)

#### `/src/prompts/`
**Propósito**: Prompts usados para comunicação com modelos de IA.

- `project-analysis.prompt.md` - Prompt para análise de projeto pela IA

#### `/src/services/`
**Propósito**: Serviços externos e integrações.

- `ai-service.ts` - Serviço principal de integração com IA
  - Coordena chamadas para diferentes provedores
  - Implementa retry com exponential backoff
  - Valida respostas JSON

**Subpasta `/src/services/providers/`:**
- `openai-provider.ts` - Provedor OpenAI (GPT-4, GPT-3.5)
- `anthropic-provider.ts` - Provedor Anthropic (Claude)
- `google-provider.ts` - Provedor Google (Gemini)

#### `/src/types/`
**Propósito**: Definições de tipos TypeScript.

- `project-info.ts` - Tipos relacionados a informações do projeto
  - `ProjectInfo` - Informações completas do projeto
  - `TechStack` - Stack tecnológica
  - `Preferences` - Preferências do usuário
  - `AdvancedConfig` - Configurações avançadas
- `ide-config.ts` - Tipos relacionados a configuração de IDEs
  - `IDE` - Tipo de IDE
  - `IDEConfig` - Configuração de IDE
  - `IDE_CONFIGS` - Mapeamento de IDEs para pastas

#### `/src/utils/`
**Propósito**: Funções utilitárias reutilizáveis.

- `i18n.ts` - Sistema de internacionalização
  - `t()` - Função de tradução genérica
  - `tQuestion()` - Tradução de perguntas
  - `tMessage()` - Tradução de mensagens
  - `tValidation()` - Tradução de validações
  - `setLocale()` - Define idioma atual
  - `getLocale()` - Obtém idioma atual
- `output.ts` - Funções de saída no console
  - `info()`, `success()`, `error()`, `warning()`, `gray()`
- `json-validator.ts` - Validação de JSON usando Zod
- `retry.ts` - Implementação de retry com exponential backoff

#### `/src/index.ts`
**Propósito**: Entry point principal do CLI.

- Inicializa o Commander.js
- Define comandos (`init`, `config`)
- Configura i18n
- Trata argumentos e opções

### `/templates/`
**Propósito**: Templates para geração de arquivos `.cursor`.

**Estrutura:**
```
templates/
├── .cursor/              # Templates padrão (pt-BR)
├── .cursor.en/           # Templates em inglês
└── .cursor.es/           # Templates em espanhol
```

Cada pasta contém a estrutura completa de arquivos que serão gerados, com placeholders `{{KEY}}` que são substituídos pelos dados coletados.

### `/test-manual/`
**Propósito**: Diretório para testes manuais do CLI.

- Criado durante testes manuais
- **Não deve ser commitado** (está no `.gitignore`)
- Usado para validar a geração de arquivos

## 📄 Arquivos de Configuração na Raiz

### `package.json`
**Propósito**: Configuração do projeto Node.js.

- Metadados do projeto (nome, versão, descrição)
- Dependências (`dependencies` e `devDependencies`)
- Scripts npm/pnpm (`build`, `dev`, `test`, etc.)
- Configuração do binário CLI (`bin.setai`)

### `tsconfig.json`
**Propósito**: Configuração do compilador TypeScript.

- Target: ES2022
- Module: ESNext
- Strict mode habilitado
- Source maps habilitados
- Declarações de tipo habilitadas

### `tsup.config.ts`
**Propósito**: Configuração do tsup (build tool).

- Entry: `src/index.ts`
- Output: `dist/index.js`
- Formato: ESM
- Target: Node 18
- Banner shebang para executável

### `vitest.config.ts`
**Propósito**: Configuração do Vitest (testes).

- Ambiente: Node.js
- Coverage: v8
- Reporters: text, json, html

### `eslint.config.mjs`
**Propósito**: Configuração do ESLint.

- Parser: TypeScript
- Plugins: TypeScript ESLint, Prettier
- Regras customizadas
- Ignora: `dist/`, `node_modules/`, etc.

### `.gitignore`
**Propósito**: Arquivos e pastas ignorados pelo Git.

- `node_modules/`
- `dist/`
- `coverage/`
- `.env*`
- `test-manual/`
- `~/.setai/` (configuração local)

## 🔄 Fluxo de Dados

1. **Entrada**: Usuário executa `setai init`
2. **Coleta**: `question-engine.ts` faz perguntas interativas
3. **Validação**: `validator.ts` valida os dados
4. **Processamento**: `template-engine.ts` processa templates
5. **Geração**: `file-generator.ts` cria arquivos e diretórios
6. **Saída**: Estrutura `.cursor/` gerada no diretório atual

## 📝 Notas Importantes

- **Código em inglês**: Todo o código fonte está em inglês
- **Comentários em português**: Comentários e documentação em português (pt-BR)
- **Templates traduzidos**: Templates existem em múltiplos idiomas
- **Configuração local**: API keys são armazenadas em `~/.setai/config.json` (não commitado)

## 🎯 Próximos Passos

- Veja [ARQUIVOS_PRINCIPAIS](./ARQUIVOS_PRINCIPAIS) para detalhes sobre arquivos específicos
- Consulte [ARQUITETURA](./ARQUITETURA) para entender o design do sistema
