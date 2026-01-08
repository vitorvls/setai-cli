# TODO: Internacionalização (i18n) - SetAI CLI

## 🎯 Objetivo

Implementar suporte a múltiplos idiomas no SetAI CLI, permitindo que usuários escolham o idioma das perguntas interativas e dos arquivos gerados.

## 📋 Tarefas

### Fase 1: Estrutura Base

- [ ] Criar sistema de tradução/i18n
- [ ] Definir estrutura de arquivos de tradução
- [ ] Implementar carregamento de traduções
- [ ] Criar utilitário de tradução (`src/utils/i18n.ts`)

### Fase 2: Suporte a Inglês (EN)

- [ ] Traduzir todas as perguntas para inglês
- [ ] Traduzir templates de arquivos para inglês
- [ ] Traduzir mensagens do CLI para inglês
- [ ] Criar arquivos de tradução `locales/en/`
- [ ] Testar fluxo completo em inglês

### Fase 3: Suporte a Espanhol (ES)

- [ ] Traduzir todas as perguntas para espanhol
- [ ] Traduzir templates de arquivos para espanhol
- [ ] Traduzir mensagens do CLI para espanhol
- [ ] Criar arquivos de tradução `locales/es/`
- [ ] Testar fluxo completo em espanhol

### Fase 4: Configuração de Idioma

- [ ] Adicionar opção de idioma no comando `init`
- [ ] Adicionar configuração global de idioma
- [ ] Permitir idioma diferente para perguntas e arquivos
- [ ] Salvar preferência de idioma em `~/.setai/config.json`
- [ ] Adicionar comando `setai config` para gerenciar idioma

### Fase 5: Documentação

- [ ] Traduzir documentação completa para inglês
- [ ] Traduzir documentação completa para espanhol
- [ ] Criar estrutura `docs/Documentation/en/`
- [ ] Criar estrutura `docs/Documentation/es/`
- [ ] Atualizar README principal com links

## 🏗️ Estrutura Proposta

### Arquivos de Tradução

```
locales/
├── pt-BR/
│   ├── questions.json        # Perguntas interativas
│   ├── messages.json         # Mensagens do CLI
│   ├── templates/            # Templates traduzidos
│   └── validation.json       # Mensagens de validação
├── en/
│   ├── questions.json
│   ├── messages.json
│   ├── templates/
│   └── validation.json
└── es/
    ├── questions.json
    ├── messages.json
    ├── templates/
    └── validation.json
```

### Configuração

```json
{
  "language": {
    "questions": "pt-BR",
    "files": "pt-BR"
  }
}
```

### Uso

```bash
# Idioma padrão (pt-BR)
setai init

# Especificar idioma das perguntas
setai init --lang en

# Configurar idioma global
setai config
# Escolher "Configurar idioma"
```

## 🔧 Implementação Técnica

### Utilitário i18n

```typescript
// src/utils/i18n.ts
export interface Locale {
  questions: Record<string, string>;
  messages: Record<string, string>;
  templates: Record<string, string>;
}

export function loadLocale(lang: string): Locale;
export function t(key: string, params?: Record<string, string>): string;
```

### Integração

- `question-engine.ts` - Usar traduções para perguntas
- `template-engine.ts` - Usar templates traduzidos
- `output.ts` - Usar mensagens traduzidas
- `validator.ts` - Usar mensagens de validação traduzidas

## 📊 Prioridade

1. **Alta:** Estrutura base e suporte a inglês
2. **Média:** Configuração de idioma
3. **Baixa:** Suporte a espanhol (após inglês)

## 🔗 Referências

- [i18n Best Practices](https://en.wikipedia.org/wiki/Internationalization_and_localization)
- [Node.js i18n Libraries](https://www.npmjs.com/search?q=i18n)

## 📝 Notas

- Manter português como idioma padrão
- Garantir que todas as traduções sejam completas
- Testar cada idioma completamente antes de release
- Considerar usar biblioteca de i18n (ex: `i18next`)

