# Templates - SetAI CLI

Estructura y personalización de templates.

## 📁 Estructura de Templates

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

## 🔄 Procesamiento

### Placeholders

Templates usan placeholders en formato `{{NOMBRE}}`:

```markdown
# {{PROJECT_NAME}}

Descripción: {{PROJECT_DESCRIPTION}}
```

### Bloques Condicionales

Soporte a `{{#if}}` y `{{#unless}}`:

```markdown
{{#if HAS_ADVANCED_AI_MODELS_AND_RULES}}
## Modelos Preferidos
{{PREFERRED_MODEL_ARCHITECTURE}}
{{/if}}
```

## 📝 Placeholders Disponibles

### Básicos

- `{{PROJECT_NAME}}` - Nombre del proyecto
- `{{PROJECT_DESCRIPTION}}` - Descripción
- `{{PROBLEM_IMPORTANCE}}` - Importancia
- `{{TARGET_USERS}}` - Usuarios principales
- `{{BUSINESS_GOALS}}` - Objetivos
- `{{TECHNICAL_CONSTRAINTS}}` - Restricciones técnicas
- `{{BUSINESS_CONSTRAINTS}}` - Restricciones de negocio
- `{{NON_GOALS}}` - No-objetivos
- `{{VERSION}}` - Versión inicial

### Stack

- `{{LANGUAGE}}` - Lenguaje principal
- `{{FRAMEWORK}}` - Framework
- `{{DATABASE}}` - Base de datos

### Preferencias

- `{{USE_TDD}}` - Usa TDD (Sí/No)
- `{{STRICT_MODE}}` - Modo strict (Sí/No)

### Avanzados

- `{{PREFERRED_MODEL_ARCHITECTURE}}` - Modelo para arquitectura
- `{{ALLOW_ARCHITECTURE_PLANNING}}` - Permitir IA para arquitectura
- `{{ALLOWED_CUSTOM_LIBS}}` - Bibliotecas permitidas personalizadas
- Y muchos otros...

## 🎨 Personalización

### Editar Templates

Templates están en `templates/.cursor/`. Puedes:
1. Editar templates existentes
2. Agregar nuevos templates
3. Modificar placeholders

### Agregar Nuevo Template

1. Crea archivo `.template` en carpeta apropiada
2. Usa placeholders disponibles
3. Agrega al `templateMap` en `template-engine.ts`

## 🔗 Enlaces

- [Arquitectura](./ARCHITECTURE.md) - Vista técnica
- [Uso Avanzado](./USAGE_ADVANCED.md) - Configuraciones avanzadas
