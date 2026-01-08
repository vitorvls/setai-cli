# Guia de Testes

Este documento descreve a estratégia de testes do projeto SetAI CLI e como escrever e executar testes.

## 🧪 Estrutura de Testes

### Framework

- **Vitest**: Framework de testes (similar ao Jest, mas mais rápido)
- **Coverage**: v8 (via `@vitest/coverage-v8`)

### Localização

Todos os testes estão em `src/__tests__/`:

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

## 🎯 Estratégia de Testes

### Tipos de Testes

1. **Testes Unitários**: Testam funções isoladas
2. **Testes de Integração**: Testam fluxos completos
3. **Testes de Snapshot**: Testam saídas esperadas

### Cobertura Alvo

- **Mínimo**: 80% de cobertura
- **Ideal**: 90%+ de cobertura
- **Foco**: Lógica de negócio (engines, services)

## 📝 Escrevendo Testes

### Estrutura Básica

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { minhaFuncao } from '../engines/meu-engine.js';

describe('meu-engine', () => {
  beforeEach(() => {
    // Setup antes de cada teste
  });

  afterEach(() => {
    // Cleanup após cada teste
  });

  describe('minhaFuncao', () => {
    it('deve retornar resultado correto para input válido', () => {
      const input = 'teste';
      const resultado = minhaFuncao(input);
      expect(resultado).toBe('esperado');
    });

    it('deve lançar erro para input inválido', () => {
      expect(() => minhaFuncao('')).toThrow('Erro esperado');
    });
  });
});
```

### Testando Funções Assíncronas

```typescript
import { describe, it, expect } from 'vitest';

describe('funcao-assincrona', () => {
  it('deve resolver corretamente', async () => {
    const resultado = await minhaFuncaoAsync();
    expect(resultado).toBe('esperado');
  });

  it('deve rejeitar com erro', async () => {
    await expect(minhaFuncaoAsync()).rejects.toThrow('Erro esperado');
  });
});
```

### Mocks

#### Mock de Módulos

```typescript
import { vi } from 'vitest';

// Mock completo de módulo
vi.mock('../utils/output.js', () => ({
  info: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
}));

// Mock parcial (mantém implementação original)
vi.mock('../config/config-manager.js', async () => {
  const actual = await vi.importActual('../config/config-manager.js');
  return {
    ...actual,
    getAPIKey: vi.fn().mockResolvedValue('mock-key'),
  };
});
```

#### Mock de Funções

```typescript
import { vi } from 'vitest';

// Mock de função
const mockFn = vi.fn();
mockFn.mockReturnValue('valor');
mockFn.mockResolvedValue('promise');
mockFn.mockRejectedValue(new Error('erro'));

// Verificar chamadas
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledTimes(2);
```

#### Mock de APIs Externas

```typescript
import { vi } from 'vitest';

// Mock de chamada HTTP
vi.mock('openai', () => ({
  OpenAI: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn().mockResolvedValue({
          choices: [{ message: { content: '{"result": "test"}' } }],
        }),
      },
    },
  })),
}));
```

### Testando CLI

```typescript
import { describe, it, expect, vi } from 'vitest';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

describe('CLI', () => {
  it('deve exibir ajuda', async () => {
    const { stdout } = await execAsync('node dist/index.js --help');
    expect(stdout).toContain('setai');
  });
});
```

### Testando com Inquirer

```typescript
import { vi } from 'vitest';
import inquirer from 'inquirer';

// Mock de inquirer.prompt
vi.spyOn(inquirer, 'prompt').mockResolvedValue({
  projectName: 'test-project',
  language: 'TypeScript',
});
```

### Testando File System

```typescript
import { vi } from 'vitest';
import fse from 'fs-extra';

// Mock de fs-extra
vi.mock('fs-extra', () => ({
  default: {
    pathExists: vi.fn().mockResolvedValue(false),
    ensureDir: vi.fn().mockResolvedValue(undefined),
    writeFile: vi.fn().mockResolvedValue(undefined),
    readFile: vi.fn().mockResolvedValue('conteúdo'),
  },
}));
```

## 🚀 Executando Testes

### Comandos

```bash
# Executar todos os testes
pnpm test

# Executar em modo watch
pnpm test:watch

# Executar com coverage
pnpm test:coverage

# Executar teste específico
pnpm test question-engine

# Executar com UI
pnpm test --ui
```

### Modo Watch

```bash
pnpm test:watch
```

Isso executa testes em modo watch, re-executando quando arquivos mudam.

### Coverage

```bash
pnpm test:coverage
```

Isso gera relatório de cobertura em:
- Console (texto)
- `coverage/coverage-final.json` (JSON)
- `coverage/index.html` (HTML - abra no navegador)

## 📊 Exemplos de Testes

### Teste de Engine

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processTemplate } from '../engines/template-engine.js';

describe('template-engine', () => {
  describe('processTemplate', () => {
    it('deve substituir placeholders simples', () => {
      const template = 'Olá {{name}}!';
      const data = { name: 'Mundo' };
      const resultado = processTemplate(template, data);
      expect(resultado).toBe('Olá Mundo!');
    });

    it('deve processar blocos condicionais', () => {
      const template = '{{#if show}}Visível{{/if}}';
      const data = { show: 'true' };
      const resultado = processTemplate(template, data);
      expect(resultado).toBe('Visível');
    });

    it('deve remover blocos condicionais vazios', () => {
      const template = '{{#if show}}Visível{{/if}}';
      const data = { show: '' };
      const resultado = processTemplate(template, data);
      expect(resultado).toBe('');
    });
  });
});
```

### Teste de Validador

```typescript
import { describe, it, expect } from 'vitest';
import { validateProjectInfo } from '../engines/validator.js';
import type { ProjectInfo } from '../types/project-info.js';

describe('validator', () => {
  describe('validateProjectInfo', () => {
    it('deve validar projeto válido', () => {
      const projectInfo: ProjectInfo = {
        projectName: 'test',
        projectDescription: 'desc',
        // ... outros campos obrigatórios
      };
      expect(() => validateProjectInfo(projectInfo)).not.toThrow();
    });

    it('deve lançar erro se nome vazio', () => {
      const projectInfo: ProjectInfo = {
        projectName: '',
        // ...
      };
      expect(() => validateProjectInfo(projectInfo)).toThrow();
    });
  });
});
```

### Teste de Serviço com Mock

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { enhanceWithAI } from '../services/ai-service.js';
import { getAPIKey } from '../config/config-manager.js';

vi.mock('../config/config-manager.js');
vi.mock('../services/providers/openai-provider.js');

describe('ai-service', () => {
  beforeEach(() => {
    vi.mocked(getAPIKey).mockReturnValue('test-key');
  });

  it('deve enriquecer projeto com IA', async () => {
    const projectInfo = {
      projectName: 'test',
      // ...
    };
    const resultado = await enhanceWithAI(projectInfo);
    expect(resultado).toHaveProperty('aiGenerated');
  });
});
```

## 🎯 Boas Práticas

### 1. Nomes Descritivos

```typescript
// ❌ Ruim
it('test 1', () => { ... });

// ✅ Bom
it('deve retornar erro quando nome do projeto está vazio', () => { ... });
```

### 2. Um Conceito por Teste

```typescript
// ❌ Ruim
it('deve validar e processar', () => {
  validate();
  process();
});

// ✅ Bom
it('deve validar input', () => {
  validate();
});

it('deve processar template', () => {
  process();
});
```

### 3. Arrange-Act-Assert

```typescript
it('deve substituir placeholder', () => {
  // Arrange (preparar)
  const template = '{{name}}';
  const data = { name: 'Test' };
  
  // Act (executar)
  const resultado = processTemplate(template, data);
  
  // Assert (verificar)
  expect(resultado).toBe('Test');
});
```

### 4. Testes Independentes

```typescript
// Cada teste deve ser independente
// Não depender de estado de outros testes
```

### 5. Limpar Mocks

```typescript
afterEach(() => {
  vi.clearAllMocks();
});
```

## 🐛 Debugging de Testes

### Executar Teste Específico

```bash
pnpm test question-engine.test.ts
```

### Executar com Debug

```bash
# Node.js debugger
node --inspect-brk node_modules/.bin/vitest question-engine.test.ts
```

### Logs no Teste

```typescript
it('deve fazer algo', () => {
  console.log('Debug:', valor);
  // ...
});
```

## 📈 Melhorando Cobertura

### Identificar Gaps

```bash
pnpm test:coverage
# Abra coverage/index.html no navegador
```

### Adicionar Testes

1. Identifique linhas não cobertas
2. Adicione testes para cobrir
3. Execute coverage novamente
4. Verifique se cobertura aumentou

## 🎯 Próximos Passos

- Veja [DESENVOLVIMENTO](./DESENVOLVIMENTO) para mais detalhes sobre desenvolvimento
- Consulte [CONTRIBUINDO](./CONTRIBUINDO) para guia de contribuição
