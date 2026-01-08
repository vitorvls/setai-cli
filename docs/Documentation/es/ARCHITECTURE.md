# Arquitectura - SetAI CLI

Vista técnica de la arquitectura interna de SetAI CLI.

## 🏗️ Visión General

SetAI CLI está construido con TypeScript, siguiendo una arquitectura modular y extensible.

## 📁 Estructura de Directorios

```
setai/
├── src/
│   ├── index.ts              # Entry point
│   ├── commands/             # Comandos CLI
│   │   ├── init.ts          # Comando init
│   │   └── config.ts        # Comando config
│   ├── engines/              # Engines principales
│   │   ├── question-engine.ts
│   │   ├── template-engine.ts
│   │   ├── file-generator.ts
│   │   ├── validator.ts
│   │   ├── ide-selector.ts
│   │   └── advanced-groups-collector.ts
│   ├── services/             # Servicios
│   │   ├── ai-service.ts
│   │   └── providers/        # Providers de IA
│   │       ├── openai-provider.ts
│   │       ├── anthropic-provider.ts
│   │       └── google-provider.ts
│   ├── config/               # Configuración
│   │   └── config-manager.ts
│   ├── types/                # Tipos TypeScript
│   │   ├── project-info.ts
│   │   └── ide-config.ts
│   ├── utils/                # Utilidades
│   │   ├── output.ts
│   │   ├── retry.ts
│   │   └── json-validator.ts
│   └── prompts/              # Templates de prompts
│       └── project-analysis.prompt.md
├── templates/                # Templates de archivos
│   └── .cursor/
├── dist/                     # Build output
└── docs/                     # Documentación
```

## 🔄 Flujo de Ejecución

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
10. Estructura generada ✅
```

### Comando `config`

```
1. Entry Point (index.ts)
   ↓
2. configCommand (commands/config.ts)
   ↓
3. Menú interactivo
   ↓
4. loadConfig / saveConfig (config/config-manager.ts)
   ↓
5. Configuración guardada ✅
```

## 🧩 Componentes Principales

### Question Engine

**Responsabilidad:** Recopilar información del usuario vía preguntas interactivas.

**Tecnologías:**
- Inquirer.js para prompts
- Validación de inputs
- Flujo condicional de preguntas

### Template Engine

**Responsabilidad:** Procesar templates con datos del proyecto.

**Funcionalidades:**
- Sustitución de placeholders
- Bloques condicionales (`{{#if}}`, `{{#unless}}`)
- Procesamiento de arrays

### File Generator

**Responsabilidad:** Crear estructura de directorios y archivos.

**Funcionalidades:**
- Creación de directorios
- Escritura de archivos
- Verificación de existencia
- Confirmación de sobrescrita

### AI Service

**Responsabilidad:** Integración con modelos de IA.

**Funcionalidades:**
- Priorización de proveedores
- Fallback automático
- Retry con backoff
- Validación de respuestas

## 🔌 Providers de IA

### Arquitectura de Providers

Cada provider implementa interfaz común:
- `create()` - Factory method
- `generateContent()` - Generación de contenido
- `analyzeProject()` - Análisis de proyecto

### Priorización

1. OpenAI (si configurado)
2. Anthropic (si OpenAI falla)
3. Google (si anteriores fallan)

## 🔒 Seguridad

### Almacenamiento de API Keys

- Local: `~/.setai/config.json`
- Permisos restringidos
- No commiteado en Git
- Input oculto en terminal

### Validación

- Validación de inputs con Zod
- Sanitización de datos
- Tratamiento de errores robusto

## 🧪 Pruebas

### Estructura

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

- Pruebas unitarias para cada componente
- Pruebas de integración
- Mocks para APIs externas

## 📦 Build

### Tecnologías

- **tsup** - Build tool
- **TypeScript** - Compilación
- **ESM** - Módulos ES

### Output

- `dist/index.js` - Bundle único
- `dist/index.js.map` - Source maps

## 🔗 Enlaces

- [Providers](./PROVIDERS.md) - Detalles sobre providers
- [Templates](./TEMPLATES.md) - Estructura de templates
