# Templates - SetAI CLI

Estrutura e personalização de templates.

## 📁 Estrutura de Templates

```
templates/
└── .cursor/
    ├── README.md.template
    ├── context/
    │   ├── project-goals.md.template
    │   ├── tech-stack.md.template
    │   ├── architecture.md.template
    │   └── deployment.md.template
    ├── rules/
    │   ├── code-style.md.template
    │   ├── testing-rules.md.template
    │   ├── git-rules.md.template
    │   ├── security-rules.md.template
    │   ├── ai-usage-rules.md.template
    │   └── business-rules.md.template
    ├── libs/
    │   ├── allowed-libs.md.template
    │   ├── forbidden-libs.md.template
    │   └── ai-models.md.template
    └── commands/
        ├── architecture-review.md.template
        ├── refactor-controlled.md.template
        ├── generate-docs.md.template
        └── test-strategy.md.template
```

## 🔄 Processamento

### Placeholders

Templates usam placeholders no formato `{{NOME}}`:

```markdown
# {{PROJECT_NAME}}

Descrição: {{PROJECT_DESCRIPTION}}
```

### Blocos Condicionais

Suporte a `{{#if}}` e `{{#unless}}`:

```markdown
{{#if HAS_ADVANCED_AI_MODELS_AND_RULES}}
## Modelos Preferidos
{{PREFERRED_MODEL_ARCHITECTURE}}
{{/if}}
```

## 📝 Placeholders Disponíveis

### Básicos

- `{{PROJECT_NAME}}` - Nome do projeto
- `{{PROJECT_DESCRIPTION}}` - Descrição
- `{{PROBLEM_IMPORTANCE}}` - Importância
- `{{TARGET_USERS}}` - Usuários principais
- `{{BUSINESS_GOALS}}` - Objetivos
- `{{TECHNICAL_CONSTRAINTS}}` - Restrições técnicas
- `{{BUSINESS_CONSTRAINTS}}` - Restrições de negócio
- `{{NON_GOALS}}` - Não-objetivos
- `{{VERSION}}` - Versão inicial

### Stack

- `{{LANGUAGE}}` - Linguagem principal
- `{{FRAMEWORK}}` - Framework
- `{{DATABASE}}` - Banco de dados

### Preferências

- `{{USE_TDD}}` - Usa TDD (Sim/Não)
- `{{STRICT_MODE}}` - Modo strict (Sim/Não)

### Avançados

- `{{PREFERRED_MODEL_ARCHITECTURE}}` - Modelo para arquitetura
- `{{ALLOW_ARCHITECTURE_PLANNING}}` - Permitir IA para arquitetura
- `{{ALLOWED_CUSTOM_LIBS}}` - Bibliotecas permitidas customizadas
- E muitos outros...

## 🎨 Personalização

### Editar Templates

Templates estão em `templates/.cursor/`. Você pode:
1. Editar templates existentes
2. Adicionar novos templates
3. Modificar placeholders

### Adicionar Novo Template

1. Crie arquivo `.template` em pasta apropriada
2. Use placeholders disponíveis
3. Adicione ao `templateMap` em `template-engine.ts`

## 🔗 Links

- [Arquitetura](./ARCHITECTURE.md) - Visão técnica
- [Uso Avançado](./USAGE_ADVANCED.md) - Configurações avançadas

