# Guia de Desenvolvimento

Este documento fornece um guia completo para desenvolver no projeto SetAI CLI.

## 🚀 Setup Inicial

### Pré-requisitos

- **Node.js 18+** (LTS recomendado)
- **pnpm** (preferido) ou npm
- **Git**

### Instalação

```bash
# Clone o repositório
git clone <repo-url>
cd setai

# Instale dependências
pnpm install

# Build inicial
pnpm build
```

### Verificação

```bash
# Execute testes
pnpm test

# Verifique tipos
pnpm type-check

# Execute lint
pnpm lint
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento

```bash
# Modo desenvolvimento (watch)
pnpm dev

# Build para produção
pnpm build

# Verificar tipos TypeScript
pnpm type-check
```

### Qualidade de Código

```bash
# Executar ESLint
pnpm lint

# Corrigir problemas de lint automaticamente
pnpm lint:fix

# Formatar código com Prettier
pnpm format

# Verificar formatação (sem modificar)
pnpm format:check
```

### Testes

```bash
# Executar testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Gerar relatório de cobertura
pnpm test:coverage
```

### Documentação

```bash
# Servir documentação localmente
pnpm docs

# Servir e abrir no navegador
pnpm docs:serve
```

## 📝 Convenções de Código

### Idioma

- **Código**: Inglês (variáveis, funções, classes)
- **Comentários**: Português (pt-BR)
- **Documentação**: Português (pt-BR)

### Nomenclatura

- **Variáveis e funções**: `camelCase`
- **Classes e tipos**: `PascalCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Arquivos**: `kebab-case.ts`

### Estrutura de Arquivos

```typescript
/**
 * Descrição do arquivo/componente
 * 
 * Responsabilidades:
 * - Responsabilidade 1
 * - Responsabilidade 2
 */

// Imports externos primeiro
import { Command } from 'commander';
import inquirer from 'inquirer';

// Imports internos depois
import { collectProjectInfo } from '../engines/question-engine.js';
import { info } from '../utils/output.js';

// Tipos e interfaces
interface MyType {
  // ...
}

// Constantes
const MY_CONSTANT = 'value';

// Funções auxiliares (privadas)
function helperFunction() {
  // ...
}

// Funções principais (exportadas)
export function mainFunction() {
  // ...
}
```

### Comentários

```typescript
/**
 * Descrição da função
 * 
 * @param param1 - Descrição do parâmetro
 * @param param2 - Descrição do parâmetro
 * @returns Descrição do retorno
 */
export function myFunction(param1: string, param2: number): boolean {
  // Implementação
}
```

### Tratamento de Erros

```typescript
try {
  // Código que pode falhar
} catch (err) {
  if (err instanceof Error) {
    error(tMessage('error.key', { message: err.message }), true);
  } else {
    error(tMessage('error.unknown'), true);
  }
  throw err; // Re-throw se necessário
}
```

## 🧩 Estrutura de Módulos

### Criar Novo Comando

1. **Criar arquivo**: `src/commands/novo-comando.ts`

```typescript
import { info, success, error } from '../utils/output.js';
import { tMessage } from '../utils/i18n.js';

export async function novoComandoCommand(options: {
  flag?: boolean;
}): Promise<void> {
  try {
    info(tMessage('novo-comando.starting'), true);
    
    // Lógica do comando
    
    success(tMessage('novo-comando.success'), true);
  } catch (err) {
    error(tMessage('novo-comando.error'), true);
    throw err;
  }
}
```

2. **Registrar em**: `src/index.ts`

```typescript
program
  .command('novo-comando')
  .description('Descrição do comando')
  .option('--flag', 'Descrição da flag')
  .action(async (options) => {
    await novoComandoCommand(options);
  });
```

3. **Adicionar traduções**: `locales/<locale>/messages.json`

```json
{
  "novo-comando": {
    "starting": "Iniciando...",
    "success": "Sucesso!",
    "error": "Erro ao executar"
  }
}
```

### Criar Novo Engine

1. **Criar arquivo**: `src/engines/novo-engine.ts`

```typescript
import type { ProjectInfo } from '../types/project-info.js';
import { tMessage } from '../utils/i18n.js';

/**
 * Novo Engine - Descrição
 */
export async function processarAlgo(projectInfo: ProjectInfo): Promise<string> {
  // Lógica do engine
  return resultado;
}
```

2. **Usar em comando**: `src/commands/init.ts`

```typescript
import { processarAlgo } from '../engines/novo-engine.js';

// Dentro do initCommand
const resultado = await processarAlgo(projectInfo);
```

### Criar Novo Provedor de IA

1. **Criar arquivo**: `src/services/providers/novo-provider.ts`

```typescript
import type { AIGeneratedContent } from '../ai-service.js';

export interface NovoProviderOptions {
  apiKey: string;
  model?: string;
}

export async function generateContent(
  prompt: string,
  options: NovoProviderOptions
): Promise<AIGeneratedContent> {
  // Implementação da API
  // ...
}
```

2. **Registrar em**: `src/services/ai-service.ts`

```typescript
import { generateContent as novoProviderGenerate } from './providers/novo-provider.js';

// Dentro de enhanceWithAI
if (provider === 'novo-provider') {
  const content = await novoProviderGenerate(prompt, {
    apiKey: apiKey!,
    model: defaultModel,
  });
  // ...
}
```

## 🧪 Escrevendo Testes

### Estrutura de Teste

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { minhaFuncao } from '../engines/meu-engine.js';

describe('meu-engine', () => {
  beforeEach(() => {
    // Setup antes de cada teste
  });

  it('deve fazer algo corretamente', () => {
    const resultado = minhaFuncao(input);
    expect(resultado).toBe(expected);
  });

  it('deve lançar erro quando input inválido', () => {
    expect(() => minhaFuncao(invalidInput)).toThrow();
  });
});
```

### Mocks

```typescript
import { vi } from 'vitest';

// Mock de função
vi.mock('../utils/output.js', () => ({
  info: vi.fn(),
  success: vi.fn(),
}));

// Mock de módulo
vi.mock('fs-extra', () => ({
  default: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
  },
}));
```

### Testes de Integração

Para testar fluxos completos:

```typescript
describe('init command integration', () => {
  it('deve gerar estrutura completa', async () => {
    // Setup
    const mockAnswers = { /* ... */ };
    vi.spyOn(inquirer, 'prompt').mockResolvedValue(mockAnswers);
    
    // Execute
    await initCommand(false, false);
    
    // Assert
    expect(fs.existsSync('.cursor')).toBe(true);
  });
});
```

## 🌐 Internacionalização

### Adicionar Nova Tradução

1. **Adicionar chave**: `locales/pt-BR/messages.json`

```json
{
  "minha-chave": "Minha mensagem em português"
}
```

2. **Traduzir para outros idiomas**:
   - `locales/en/messages.json`
   - `locales/es/messages.json`

3. **Usar no código**:

```typescript
import { tMessage } from '../utils/i18n.js';

info(tMessage('minha-chave'), true);
```

### Adicionar Novo Idioma

1. **Criar estrutura**: `locales/<novo-idioma>/`
2. **Criar arquivos**: `questions.json`, `messages.json`, `validation.json`, `templates.json`
3. **Adicionar tipo**: `src/utils/i18n.ts`

```typescript
export type SupportedLocale = 'pt-BR' | 'en' | 'es' | 'novo-idioma';
```

4. **Criar templates**: `templates/.cursor.<novo-idioma>/`

## 🔍 Debugging

### Modo Desenvolvimento

```bash
# Build em modo watch
pnpm dev

# Em outro terminal, teste localmente
node dist/index.js init
```

### Logs

```typescript
import { info } from '../utils/output.js';

// Debug temporário
info(`Debug: valor = ${valor}`);
```

### Source Maps

Source maps estão habilitados no `tsup.config.ts`, permitindo debug no código TypeScript original.

## 📦 Build e Publicação

### Build Local

```bash
pnpm build
```

Isso gera:
- `dist/index.js` - Código compilado
- `dist/index.js.map` - Source maps

### Testar Build

```bash
# Build
pnpm build

# Testar localmente
node dist/index.js init
```

### Publicação (apenas mantenedores)

```bash
# Build
pnpm build

# Publicar (requer permissões)
npm publish
```

## 🐛 Troubleshooting

### Erros Comuns

#### "Cannot find module"
- Verifique se `pnpm install` foi executado
- Verifique se o caminho do import está correto
- Use extensão `.js` nos imports (mesmo para arquivos `.ts`)

#### "Type errors"
- Execute `pnpm type-check` para ver erros detalhados
- Verifique se tipos estão corretos

#### "Lint errors"
- Execute `pnpm lint:fix` para corrigir automaticamente
- Verifique regras do ESLint em `eslint.config.mjs`

### Dicas

- **Sempre execute testes** antes de commitar
- **Verifique tipos** com `pnpm type-check`
- **Formate código** com `pnpm format`
- **Leia erros** cuidadosamente - geralmente são informativos

## 🎯 Próximos Passos

- Veja [TESTES](./TESTES) para mais detalhes sobre testes
- Consulte [CONTRIBUINDO](./CONTRIBUINDO) para guia de contribuição
- Leia [ARQUITETURA](./ARQUITETURA) para entender o design
