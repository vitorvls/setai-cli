# Sistema de Internacionalização (i18n)

Este documento descreve o sistema de internacionalização do SetAI CLI e como adicionar novos idiomas ou traduções.

## 🌐 Visão Geral

O sistema de i18n permite que o CLI funcione em múltiplos idiomas:
- **Perguntas**: Idioma das perguntas interativas
- **Mensagens**: Idioma das mensagens (info, success, error, warning)
- **Validações**: Idioma das mensagens de validação
- **Arquivos gerados**: Idioma dos templates e arquivos gerados

## 📁 Estrutura de Arquivos

### Locales

```
locales/
├── pt-BR/              # Português (Brasil) - Idioma padrão
│   ├── questions.json   # Traduções das perguntas
│   ├── messages.json    # Traduções de mensagens
│   ├── validation.json  # Traduções de validações
│   └── templates.json   # Traduções de strings de templates
├── en/                  # Inglês
│   ├── questions.json
│   ├── messages.json
│   ├── validation.json
│   └── templates.json
└── es/                  # Espanhol
    ├── questions.json
    ├── messages.json
    ├── validation.json
    └── templates.json
```

### Templates

```
templates/
├── .cursor/             # Templates padrão (pt-BR)
│   ├── README.md.template
│   └── context/
│       └── project-goals.md.template
├── .cursor.en/          # Templates em inglês
│   ├── README.md.template
│   └── context/
│       └── project-goals.md.template
└── .cursor.es/          # Templates em espanhol
    ├── README.md.template
    └── context/
        └── project-goals.md.template
```

## 🔧 Implementação

### Arquivo Principal: `src/utils/i18n.ts`

**Tipos:**
```typescript
export type SupportedLocale = 'pt-BR' | 'en' | 'es';

export interface LocaleData {
  questions: Record<string, string>;
  messages: Record<string, string>;
  validation: Record<string, string>;
  templates: Record<string, string>;
}
```

**Funções principais:**
- `initI18n(locale)`: Inicializa i18n com idioma
- `setLocale(locale)`: Define idioma atual
- `getLocale()`: Obtém idioma atual
- `t(key, params)`: Tradução genérica
- `tQuestion(key, params)`: Tradução de perguntas
- `tMessage(key, params)`: Tradução de mensagens
- `tValidation(key, params)`: Tradução de validações

### Uso no Código

```typescript
import { tMessage, tQuestion, tValidation } from '../utils/i18n.js';

// Mensagem
info(tMessage('init.starting'), true);

// Pergunta
const answer = await inquirer.prompt({
  message: tQuestion('project.name'),
});

// Validação
throw new Error(tValidation('project.name.required'));
```

## 📝 Adicionar Nova Tradução

### 1. Adicionar Chave em pt-BR

**Arquivo**: `locales/pt-BR/messages.json`

```json
{
  "init": {
    "starting": "Iniciando geração da estrutura...",
    "success": "Estrutura criada com sucesso!",
    "nova-chave": "Nova mensagem em português"
  }
}
```

### 2. Traduzir para Outros Idiomas

**Arquivo**: `locales/en/messages.json`

```json
{
  "init": {
    "starting": "Starting structure generation...",
    "success": "Structure created successfully!",
    "nova-chave": "New message in English"
  }
}
```

**Arquivo**: `locales/es/messages.json`

```json
{
  "init": {
    "starting": "Iniciando generación de estructura...",
    "success": "¡Estructura creada con éxito!",
    "nova-chave": "Nuevo mensaje en español"
  }
}
```

### 3. Usar no Código

```typescript
info(tMessage('init.nova-chave'), true);
```

## 🌍 Adicionar Novo Idioma

### 1. Criar Estrutura de Pastas

```bash
mkdir -p locales/novo-idioma
touch locales/novo-idioma/{questions,messages,validation,templates}.json
```

### 2. Adicionar Tipo

**Arquivo**: `src/utils/i18n.ts`

```typescript
export type SupportedLocale = 'pt-BR' | 'en' | 'es' | 'novo-idioma';
```

### 3. Traduzir Arquivos JSON

Copie estrutura de `locales/pt-BR/` e traduza todos os arquivos:
- `questions.json`
- `messages.json`
- `validation.json`
- `templates.json`

### 4. Criar Templates

```bash
mkdir -p templates/.cursor.novo-idioma
# Copie templates de templates/.cursor/ e traduza
```

### 5. Atualizar Config Manager

**Arquivo**: `src/config/config-manager.ts`

```typescript
export interface LanguageConfig {
  questions?: 'pt-BR' | 'en' | 'es' | 'novo-idioma';
  files?: 'pt-BR' | 'en' | 'es' | 'novo-idioma';
}
```

### 6. Atualizar Documentação

- Adicione novo idioma na documentação
- Atualize exemplos

## 📋 Estrutura de Chaves

### Messages (`messages.json`)

```json
{
  "init": {
    "starting": "...",
    "success": "...",
    "error": "..."
  },
  "config": {
    "title": "...",
    "setApiKey": "..."
  }
}
```

### Questions (`questions.json`)

```json
{
  "project": {
    "name": "Qual o nome do projeto?",
    "description": "Descreva o projeto..."
  },
  "tech": {
    "language": "Qual a linguagem principal?",
    "framework": "Qual framework você está usando?"
  }
}
```

### Validation (`validation.json`)

```json
{
  "project": {
    "name": {
      "required": "O nome do projeto é obrigatório"
    }
  }
}
```

### Templates (`templates.json`)

```json
{
  "readme": {
    "title": "# {{projectName}}",
    "description": "{{projectDescription}}"
  }
}
```

## 🔄 Fluxo de Tradução

### 1. Inicialização

```typescript
// src/index.ts
async function initializeI18n(): Promise<void> {
  await loadConfig();
  const langConfig = getLanguageConfig();
  await initI18n(langConfig.questions || 'pt-BR');
}
```

### 2. Definição de Idioma

```typescript
// src/commands/init.ts
const questionLocale = langOverride || langConfig.questions || 'pt-BR';
const filesLocale = langOverride || langConfig.files || 'pt-BR';

await setLocale(questionLocale);
```

### 3. Uso

```typescript
// Tradução automática
info(tMessage('init.starting'), true);

// Sem tradução (mensagem hardcoded)
info('Mensagem em inglês', false);
```

## 🎯 Fallback

### Estratégia de Fallback

1. Tenta carregar tradução do idioma solicitado
2. Se não encontrar, tenta pt-BR
3. Se ainda não encontrar, retorna chave original

**Código:**
```typescript
async function loadLocaleData(locale: SupportedLocale): Promise<LocaleData> {
  try {
    // Tenta carregar locale solicitado
    const data = await loadFromFile(locale);
    return data;
  } catch (error) {
    // Fallback para pt-BR
    if (locale !== 'pt-BR') {
      return loadLocaleData('pt-BR');
    }
    throw error;
  }
}
```

## 🔧 Configuração de Idioma

### Via Flag

```bash
setai init --lang en
```

### Via Config

```bash
setai config
# Seleciona "Configurar idioma"
```

**Arquivo**: `~/.setai/config.json`

```json
{
  "language": {
    "questions": "en",
    "files": "en"
  }
}
```

## 📊 Parâmetros em Traduções

### Suporte a Parâmetros

```json
{
  "init": {
    "errorDetails": "Erro: {{message}}"
  }
}
```

### Uso

```typescript
error(tMessage('init.errorDetails', { message: err.message }), true);
```

### Implementação

```typescript
function t(key: string, params?: Record<string, string>): string {
  let translation = getTranslation(key);
  
  if (params) {
    for (const [paramKey, paramValue] of Object.entries(params)) {
      translation = translation.replace(
        new RegExp(`{{${paramKey}}}`, 'g'),
        paramValue
      );
    }
  }
  
  return translation;
}
```

## 🧪 Testando Traduções

### Teste Manual

```bash
# Português
setai init --lang pt-BR

# Inglês
setai init --lang en

# Espanhol
setai init --lang es
```

### Teste Automatizado

```typescript
describe('i18n', () => {
  it('deve traduzir mensagem corretamente', () => {
    setLocale('en');
    expect(tMessage('init.starting')).toBe('Starting structure generation...');
  });
});
```

## 🎯 Boas Práticas

### 1. Organização de Chaves

- Use hierarquia clara: `categoria.subcategoria.chave`
- Agrupe por funcionalidade
- Mantenha consistência

### 2. Nomes Descritivos

```json
// ❌ Ruim
{
  "msg1": "..."
}

// ✅ Bom
{
  "init": {
    "starting": "..."
  }
}
```

### 3. Contexto

- Inclua contexto suficiente na tradução
- Evite ambiguidade
- Considere pluralização

### 4. Manutenção

- Mantenha todos os idiomas sincronizados
- Documente mudanças
- Revise traduções regularmente

## 🚀 Próximos Passos

- Veja [DESENVOLVIMENTO](./DESENVOLVIMENTO) para mais detalhes
- Consulte [CONTRIBUINDO](./CONTRIBUINDO) para contribuir com traduções
