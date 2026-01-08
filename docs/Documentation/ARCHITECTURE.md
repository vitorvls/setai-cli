# Arquitetura - SetAI CLI

Visão técnica da arquitetura interna do SetAI CLI.

## 🏗️ Visão Geral

O SetAI CLI é construído com TypeScript, seguindo uma arquitetura modular e extensível.

## 📁 Estrutura de Diretórios

```
setai/
├── src/
│   ├── index.ts              # Entry point
│   ├── commands/             # Comandos CLI
│   │   ├── init.ts          # Comando init
│   │   └── config.ts        # Comando config
│   ├── engines/              # Engines principais
│   │   ├── question-engine.ts
│   │   ├── template-engine.ts
│   │   ├── file-generator.ts
│   │   ├── validator.ts
│   │   ├── ide-selector.ts
│   │   └── advanced-groups-collector.ts
│   ├── services/             # Serviços
│   │   ├── ai-service.ts
│   │   └── providers/        # Providers de IA
│   │       ├── openai-provider.ts
│   │       ├── anthropic-provider.ts
│   │       └── google-provider.ts
│   ├── config/               # Configuração
│   │   └── config-manager.ts
│   ├── types/                # Tipos TypeScript
│   │   ├── project-info.ts
│   │   └── ide-config.ts
│   ├── utils/                # Utilitários
│   │   ├── output.ts
│   │   ├── retry.ts
│   │   └── json-validator.ts
│   └── prompts/              # Templates de prompts
│       └── project-analysis.prompt.md
├── templates/                # Templates de arquivos
│   └── .cursor/
├── dist/                     # Build output
└── docs/                     # Documentação
```

## 🔄 Fluxo de Execução

### Comando `init`

```
1. Entry Point (index.ts)
   ↓
2. initCommand (commands/init.ts)
   ↓
3. collectIDESelection (engines/ide-selector.ts)
   ↓
4. collectProjectInfo (engines/question-engine.ts)
   ↓
5. (Opcional) collectAdvancedGroups (engines/advanced-groups-collector.ts)
   ↓
6. (Opcional) enhanceWithAI (services/ai-service.ts)
   ↓
7. validateProjectInfo (engines/validator.ts)
   ↓
8. processAllTemplates (engines/template-engine.ts)
   ↓
9. generateFiles (engines/file-generator.ts)
   ↓
10. Estrutura gerada ✅
```

### Comando `config`

```
1. Entry Point (index.ts)
   ↓
2. configCommand (commands/config.ts)
   ↓
3. Menu interativo
   ↓
4. loadConfig / saveConfig (config/config-manager.ts)
   ↓
5. Configuração salva ✅
```

## 🧩 Componentes Principais

### Question Engine

**Responsabilidade:** Coletar informações do usuário via perguntas interativas.

**Tecnologias:**
- Inquirer.js para prompts
- Validação de inputs
- Fluxo condicional de perguntas

### Template Engine

**Responsabilidade:** Processar templates com dados do projeto.

**Funcionalidades:**
- Substituição de placeholders
- Blocos condicionais (`{{#if}}`, `{{#unless}}`)
- Processamento de arrays

### File Generator

**Responsabilidade:** Criar estrutura de diretórios e arquivos.

**Funcionalidades:**
- Criação de diretórios
- Escrita de arquivos
- Verificação de existência
- Confirmação de sobrescrita

### AI Service

**Responsabilidade:** Integração com modelos de IA.

**Funcionalidades:**
- Priorização de provedores
- Fallback automático
- Retry com backoff
- Validação de respostas

## 🔌 Providers de IA

### Arquitetura de Providers

Cada provider implementa interface comum:
- `create()` - Factory method
- `generateContent()` - Geração de conteúdo
- `analyzeProject()` - Análise de projeto

### Priorização

1. OpenAI (se configurado)
2. Anthropic (se OpenAI falhar)
3. Google (se anteriores falharem)

## 🔒 Segurança

### Armazenamento de API Keys

- Local: `~/.setai/config.json`
- Permissões restritas
- Não commitado no Git
- Input oculto no terminal

### Validação

- Validação de inputs com Zod
- Sanitização de dados
- Tratamento de erros robusto

## 🧪 Testes

### Estrutura

```
src/__tests__/
├── cli.test.ts
├── question-engine.test.ts
├── template-engine.test.ts
├── file-generator.test.ts
├── validator.test.ts
├── ai-service.test.ts
└── json-validator.test.ts
```

### Cobertura

- Testes unitários para cada componente
- Testes de integração
- Mocks para APIs externas

## 📦 Build

### Tecnologias

- **tsup** - Build tool
- **TypeScript** - Compilação
- **ESM** - Módulos ES

### Output

- `dist/index.js` - Bundle único
- `dist/index.js.map` - Source maps

## 🔗 Links

- [Providers](./PROVIDERS.md) - Detalhes sobre providers
- [Templates](./TEMPLATES.md) - Estrutura de templates

