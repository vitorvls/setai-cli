# Templates - SetAI CLI

Template structure and customization.

## 📁 Template Structure

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

## 🔄 Processing

### Placeholders

Templates use placeholders in format `{{NAME}}`:

```markdown
# {{PROJECT_NAME}}

Description: {{PROJECT_DESCRIPTION}}
```

### Conditional Blocks

Support for `{{#if}}` and `{{#unless}}`:

```markdown
{{#if HAS_ADVANCED_AI_MODELS_AND_RULES}}
## Preferred Models
{{PREFERRED_MODEL_ARCHITECTURE}}
{{/if}}
```

## 📝 Available Placeholders

### Basic

- `{{PROJECT_NAME}}` - Project name
- `{{PROJECT_DESCRIPTION}}` - Description
- `{{PROBLEM_IMPORTANCE}}` - Importance
- `{{TARGET_USERS}}` - Main users
- `{{BUSINESS_GOALS}}` - Objectives
- `{{TECHNICAL_CONSTRAINTS}}` - Technical constraints
- `{{BUSINESS_CONSTRAINTS}}` - Business constraints
- `{{NON_GOALS}}` - Non-goals
- `{{VERSION}}` - Initial version

### Stack

- `{{LANGUAGE}}` - Main language
- `{{FRAMEWORK}}` - Framework
- `{{DATABASE}}` - Database

### Preferences

- `{{USE_TDD}}` - Uses TDD (Yes/No)
- `{{STRICT_MODE}}` - Strict mode (Yes/No)

### Advanced

- `{{PREFERRED_MODEL_ARCHITECTURE}}` - Model for architecture
- `{{ALLOW_ARCHITECTURE_PLANNING}}` - Allow AI for architecture
- `{{ALLOWED_CUSTOM_LIBS}}` - Custom allowed libraries
- And many others...

## 🎨 Customization

### Edit Templates

Templates are in `templates/.cursor/`. You can:
1. Edit existing templates
2. Add new templates
3. Modify placeholders

### Add New Template

1. Create `.template` file in appropriate folder
2. Use available placeholders
3. Add to `templateMap` in `template-engine.ts`

## 🔗 Links

- [Architecture](./ARCHITECTURE.md) - Technical view
- [Advanced Usage](./USAGE_ADVANCED.md) - Advanced configurations
