# Architecture - SetAI CLI

Technical view of SetAI CLI internal architecture.

## 🏗️ Overview

SetAI CLI is built with TypeScript, following a modular and extensible architecture.

## 📁 Directory Structure

```
setai/
├── src/
│   ├── index.ts              # Entry point
│   ├── commands/             # CLI commands
│   │   ├── init.ts          # init command
│   │   └── config.ts        # config command
│   ├── engines/              # Main engines
│   │   ├── question-engine.ts
│   │   ├── template-engine.ts
│   │   ├── file-generator.ts
│   │   ├── validator.ts
│   │   ├── ide-selector.ts
│   │   └── advanced-groups-collector.ts
│   ├── services/             # Services
│   │   ├── ai-service.ts
│   │   └── providers/        # AI providers
│   │       ├── openai-provider.ts
│   │       ├── anthropic-provider.ts
│   │       └── google-provider.ts
│   ├── config/               # Configuration
│   │   └── config-manager.ts
│   ├── types/                # TypeScript types
│   │   ├── project-info.ts
│   │   └── ide-config.ts
│   ├── utils/                # Utilities
│   │   ├── output.ts
│   │   ├── retry.ts
│   │   └── json-validator.ts
│   └── prompts/              # Prompt templates
│       └── project-analysis.prompt.md
├── templates/                # File templates
│   └── .cursor/
├── dist/                     # Build output
└── docs/                     # Documentation
```

## 🔄 Execution Flow

### `init` Command

```
1. Entry Point (index.ts)
   ↓
2. initCommand (commands/init.ts)
   ↓
3. collectIDESelection (engines/ide-selector.ts)
   ↓
4. collectProjectInfo (engines/question-engine.ts)
   ↓
5. (Optional) collectAdvancedGroups (engines/advanced-groups-collector.ts)
   ↓
6. (Optional) enhanceWithAI (services/ai-service.ts)
   ↓
7. validateProjectInfo (engines/validator.ts)
   ↓
8. processAllTemplates (engines/template-engine.ts)
   ↓
9. generateFiles (engines/file-generator.ts)
   ↓
10. Structure generated ✅
```

### `config` Command

```
1. Entry Point (index.ts)
   ↓
2. configCommand (commands/config.ts)
   ↓
3. Interactive menu
   ↓
4. loadConfig / saveConfig (config/config-manager.ts)
   ↓
5. Configuration saved ✅
```

## 🧩 Main Components

### Question Engine

**Responsibility:** Collect user information via interactive questions.

**Technologies:**
- Inquirer.js for prompts
- Input validation
- Conditional question flow

### Template Engine

**Responsibility:** Process templates with project data.

**Features:**
- Placeholder substitution
- Conditional blocks (`{{#if}}`, `{{#unless}}`)
- Array processing

### File Generator

**Responsibility:** Create directory and file structure.

**Features:**
- Directory creation
- File writing
- Existence checking
- Overwrite confirmation

### AI Service

**Responsibility:** Integration with AI models.

**Features:**
- Provider prioritization
- Automatic fallback
- Retry with backoff
- Response validation

## 🔌 AI Providers

### Provider Architecture

Each provider implements common interface:
- `create()` - Factory method
- `generateContent()` - Content generation
- `analyzeProject()` - Project analysis

### Prioritization

1. OpenAI (if configured)
2. Anthropic (if OpenAI fails)
3. Google (if previous ones fail)

## 🔒 Security

### API Key Storage

- Local: `~/.setai/config.json`
- Restricted permissions
- Not committed to Git
- Hidden input in terminal

### Validation

- Input validation with Zod
- Data sanitization
- Robust error handling

## 🧪 Testing

### Structure

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

### Coverage

- Unit tests for each component
- Integration tests
- Mocks for external APIs

## 📦 Build

### Technologies

- **tsup** - Build tool
- **TypeScript** - Compilation
- **ESM** - ES Modules

### Output

- `dist/index.js` - Single bundle
- `dist/index.js.map` - Source maps

## 🔗 Links

- [Providers](./PROVIDERS.md) - Details about providers
- [Templates](./TEMPLATES.md) - Template structure
