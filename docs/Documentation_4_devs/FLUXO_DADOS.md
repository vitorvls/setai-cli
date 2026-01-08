# Fluxo de Dados

Este documento descreve como os dados fluem pelo sistema SetAI CLI, desde a entrada do usuário até a geração dos arquivos.

## 🔄 Fluxo Principal (comando `init`)

### 1. Entrada do Usuário

```
Usuário executa: setai init --advanced --beta
```

**Arquivo**: `src/index.ts`
- Parse de argumentos via Commander.js
- Extração de opções: `{ advanced: true, beta: true, lang: undefined }`
- Chamada: `initCommand(true, true, undefined)`

### 2. Inicialização

**Arquivo**: `src/commands/init.ts`

```typescript
initCommand(advanced: true, beta: true, langOverride: undefined)
```

**Fluxo:**
1. Carrega configuração de idioma (`config-manager.ts`)
2. Define locale para perguntas (`i18n.ts`)
3. Verifica permissões de escrita (`file-generator.ts`)

**Dados:**
```typescript
{
  baseDir: '/caminho/atual',
  questionLocale: 'pt-BR',
  filesLocale: 'pt-BR',
  hasPermissions: true
}
```

### 3. Seleção de IDE

**Arquivo**: `src/engines/ide-selector.ts`

```typescript
const ideConfig = await collectIDESelection();
```

**Fluxo:**
1. Pergunta ao usuário qual IDE está usando
2. Retorna configuração da IDE

**Dados:**
```typescript
{
  ide: 'cursor',
  configFolder: '.cursor',
  name: 'Cursor'
}
```

### 4. Verificação de Pasta Existente

**Arquivo**: `src/engines/file-generator.ts`

```typescript
const exists = await checkConfigFolderExists(baseDir, configFolder);
```

**Fluxo:**
1. Verifica se `.cursor/` já existe
2. Se existir, pergunta se deve sobrescrever
3. Se não, continua

**Dados:**
```typescript
{
  exists: false,
  shouldOverwrite: undefined
}
```

### 5. Coleta de Informações Básicas

**Arquivo**: `src/engines/question-engine.ts`

```typescript
const projectInfo = await collectProjectInfo(advanced: true, beta: true);
```

**Fluxo:**
1. Faz perguntas básicas via Inquirer
2. Coleta informações do projeto
3. Retorna `ProjectInfo` parcial

**Dados coletados:**
```typescript
{
  projectName: 'meu-projeto',
  projectDescription: 'Descrição...',
  problemImportance: 'Importante porque...',
  targetUsers: 'Desenvolvedores',
  businessGoals: 'Objetivos...',
  technicalConstraints: 'Restrições...',
  businessConstraints: 'Restrições de negócio...',
  nonGoals: 'Não é objetivo...',
  version: '1.0.0',
  techStack: {
    language: 'TypeScript',
    framework: 'Next.js',
    database: 'PostgreSQL'
  },
  preferences: {
    useTDD: true,
    strictMode: true
  }
}
```

### 6. Coleta de Configurações Avançadas

**Arquivo**: `src/engines/advanced-groups-collector.ts`

```typescript
const advancedConfig = await collectAdvancedGroups();
```

**Fluxo:**
1. Mostra menu de grupos disponíveis
2. Usuário seleciona grupos para responder
3. Para cada grupo selecionado, faz perguntas específicas
4. Grupos já respondidos são marcados como indisponíveis
5. Usuário pode finalizar a qualquer momento

**Dados coletados:**
```typescript
{
  selectedGroups: ['ai-usage', 'responsibilities', 'architecture'],
  preferredAIModels: {
    architecture: 'gpt-4',
    implementation: 'gpt-4',
    refactoring: 'claude-3-opus'
  },
  aiUsageRules: {
    allowArchitecturePlanning: true,
    allowCodeGeneration: true,
    // ...
  },
  responsibilities: {
    cto: 'Decisões arquiteturais',
    techLead: 'Code review',
    dev: 'Implementação'
  },
  architecturalDecisions: [
    'Usar TypeScript strict mode',
    'Implementar TDD'
  ],
  // ... outros grupos
}
```

### 7. Enriquecimento com IA (se `beta === true`)

**Arquivo**: `src/services/ai-service.ts`

```typescript
const aiGenerated = await enhanceWithAI(projectInfo);
```

**Fluxo:**
1. Carrega prompt de análise (`prompts/project-analysis.prompt.md`)
2. Seleciona provedor de IA (OpenAI, Anthropic, Google)
3. Obtém API key do provedor (`config-manager.ts`)
4. Faz chamada à API com retry (`retry.ts`)
5. Extrai JSON da resposta (`json-validator.ts`)
6. Valida JSON com Zod (`json-validator.ts`)
7. Retorna conteúdo enriquecido

**Dados gerados:**
```typescript
{
  aiGenerated: {
    projectDescription: 'Descrição enriquecida pela IA...',
    problemImportance: 'Análise detalhada...',
    businessGoals: [
      'Objetivo 1 detalhado',
      'Objetivo 2 detalhado'
    ],
    architectureDecisions: [
      'Decisão 1 com justificativa',
      'Decisão 2 com justificativa'
    ],
    bestPractices: [
      'Prática 1',
      'Prática 2'
    ],
    aiUsageGuidelines: 'Diretrizes de uso de IA...'
  }
}
```

### 8. Validação

**Arquivo**: `src/engines/validator.ts`

```typescript
validateProjectInfo(projectInfo);
```

**Fluxo:**
1. Valida campos obrigatórios
2. Verifica formatos
3. Lança erros com mensagens traduzidas se inválido

**Validações:**
- `projectName`: Não vazio
- `projectDescription`: Não vazio
- `problemImportance`: Não vazio
- `targetUsers`: Não vazio
- `businessGoals`: Não vazio
- `nonGoals`: Não vazio
- `version`: Não vazio
- `techStack.language`: Não vazio

### 9. Processamento de Templates

**Arquivo**: `src/engines/template-engine.ts`

```typescript
const files = await processAllTemplates(projectInfo, filesLocale);
```

**Fluxo:**
1. Determina diretório de templates (`templates/.cursor.<locale>/`)
2. Para cada template:
   - Carrega template do disco
   - Processa template substituindo placeholders
   - Processa blocos condicionais
   - Retorna conteúdo processado
3. Retorna mapa de arquivos: `Map<path, content>`

**Processamento:**
- Placeholders: `{{projectName}}` → `'meu-projeto'`
- Blocos condicionais: `{{#if useTDD}}...{{/if}}` → removido se vazio

**Dados gerados:**
```typescript
Map {
  '.cursor/README.md' => '# meu-projeto\n\nDescrição...',
  '.cursor/context/project-goals.md' => '# Objetivos...',
  '.cursor/context/tech-stack.md' => '# Stack Tecnológica...',
  // ... outros arquivos
}
```

### 10. Geração de Arquivos

**Arquivo**: `src/engines/file-generator.ts`

```typescript
await generateFiles(baseDir, files);
```

**Fluxo:**
1. Para cada arquivo no mapa:
   - Cria diretório pai se não existir (`fs-extra.ensureDir`)
   - Escreve arquivo com conteúdo (`fs-extra.writeFile`)
2. Exibe resumo de arquivos criados

**Resultado:**
```
✅ Estrutura .cursor criada com sucesso!

Arquivos criados:
  ✓ .cursor/README.md
  ✓ .cursor/context/project-goals.md
  ✓ .cursor/context/tech-stack.md
  ...
```

## 📊 Estrutura de Dados

### ProjectInfo

```typescript
interface ProjectInfo {
  // Informações básicas
  projectName: string;
  projectDescription: string;
  problemImportance: string;
  targetUsers: string;
  businessGoals: string;
  technicalConstraints: string;
  businessConstraints: string;
  nonGoals: string;
  version: string;
  
  // Stack tecnológica
  techStack: {
    language: string;
    framework?: string;
    database?: string;
  };
  
  // Preferências
  preferences: {
    useTDD: boolean;
    strictMode: boolean;
  };
  
  // Configuração de IDE
  ideConfig?: {
    ide: string;
    configFolder: string;
  };
  
  // Configurações avançadas
  advanced?: AdvancedConfig;
  
  // Conteúdo gerado por IA
  aiGenerated?: {
    projectDescription?: string;
    problemImportance?: string;
    businessGoals?: string[];
    architectureDecisions?: string[];
    bestPractices?: string[];
    aiUsageGuidelines?: string;
  };
}
```

### AdvancedConfig

```typescript
interface AdvancedConfig {
  selectedGroups?: string[];
  preferredAIModels?: { ... };
  aiUsageRules?: { ... };
  responsibilities?: { ... };
  customConstraints?: string;
  allowedLibraries?: string[];
  forbiddenLibraries?: string[];
  architecturalDecisions?: string[];
  designPatterns?: string[];
  securityRules?: string[];
  // ... outros grupos
}
```

## 🔀 Fluxos Alternativos

### Modo Básico (sem `--advanced`)

1. Coleta informações básicas
2. Pula coleta de configurações avançadas
3. Continua com validação e processamento

### Sem IA (sem `--beta`)

1. Coleta todas as informações
2. Pula enriquecimento com IA
3. Continua com validação e processamento

### Pasta Já Existe

1. Detecta pasta existente
2. Pergunta se deve sobrescrever
3. Se sim, continua normalmente
4. Se não, cancela operação

### Erro de Validação

1. Valida informações
2. Se inválido, lança erro
3. Exibe mensagem de erro traduzida
4. Cancela operação

### Erro de API de IA

1. Tenta chamada à API
2. Se falhar, tenta retry (até 3 vezes)
3. Se ainda falhar, continua sem enriquecimento
4. Exibe aviso ao usuário

## 🎯 Próximos Passos

- Veja [ARQUITETURA](./ARQUITETURA) para entender o design
- Consulte [ARQUIVOS_PRINCIPAIS](./ARQUIVOS_PRINCIPAIS) para detalhes dos arquivos
