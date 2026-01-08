# Estructura del Proyecto

Este documento describe la estructura completa del proyecto SetAI CLI, explicando el propósito de cada carpeta y archivo.

## 📁 Estructura de Directorios

```
setai/
├── dist/                    # Build compilado (generado automáticamente)
├── docs/                    # Documentación
│   ├── Documentation/      # Documentación para usuarios
│   ├── Documentation_4_devs/ # Documentación técnica (esta carpeta)
│   └── .vitepress/         # Configuración de VitePress
├── locales/                # Archivos de traducción (i18n)
│   ├── pt-BR/              # Portugués (Brasil)
│   ├── en/                 # Inglés
│   └── es/                 # Español
├── node_modules/           # Dependencias (generado por npm/pnpm)
├── scripts/                # Scripts auxiliares
│   └── test-cli.ps1        # Script de pruebas PowerShell
├── src/                    # Código fuente TypeScript
│   ├── __tests__/          # Pruebas unitarias
│   ├── commands/           # Comandos CLI
│   ├── config/             # Gestión de configuración
│   ├── engines/            # Motores de procesamiento
│   ├── prompts/            # Prompts para IA
│   ├── services/          # Servicios (IA, etc.)
│   ├── types/              # Definiciones de tipos TypeScript
│   └── utils/             # Utilidades
├── templates/              # Plantillas para generación de archivos .cursor
│   ├── .cursor/            # Plantillas base (pt-BR)
│   ├── .cursor.en/         # Plantillas en inglés
│   └── .cursor.es/         # Plantillas en español
├── .cursor/                # Configuración .cursor del propio proyecto
├── .gitignore              # Reglas de ignorar de Git
├── package.json            # Configuración del proyecto y dependencias
├── pnpm-lock.yaml          # Archivo de bloqueo de pnpm
├── README.md               # README principal del proyecto
├── tsconfig.json           # Configuración del compilador TypeScript
├── vitest.config.ts        # Configuración del framework de pruebas
└── tsup.config.ts          # Configuración de la herramienta de build
```

## 📂 Directorios Principales

### `src/` - Código Fuente

Contiene todo el código fuente TypeScript:

- **`commands/`**: Implementaciones de comandos CLI (`init.ts`, `config.ts`)
- **`engines/`**: Motores de procesamiento (recolección de preguntas, procesamiento de plantillas, validación)
- **`config/`**: Gestión de configuración (API keys, configuraciones de idioma)
- **`services/`**: Servicios externos (proveedores de IA)
- **`utils/`**: Funciones de utilidad (i18n, formato de salida)
- **`types/`**: Definiciones de tipos TypeScript
- **`__tests__/`**: Pruebas unitarias

### `templates/` - Plantillas de Archivos

Contiene plantillas para generar archivos de estructura `.cursor`:

- **`.cursor/`**: Plantillas base en portugués (pt-BR)
- **`.cursor.en/`**: Plantillas en inglés
- **`.cursor.es/`**: Plantillas en español

Cada directorio de plantillas contiene:
- `README.md.template`
- `context/` - Archivos de contexto
- `rules/` - Archivos de reglas
- Otros archivos de configuración

### `locales/` - Traducciones

Contiene archivos de traducción para i18n:

- **`pt-BR/`**: Traducciones en portugués
- **`en/`**: Traducciones en inglés
- **`es/`**: Traducciones en español

Cada locale contiene:
- `questions.json` - Preguntas CLI
- `messages.json` - Mensajes CLI
- `validation.json` - Mensajes de validación
- `templates.json` - Cadenas de plantillas

### `docs/` - Documentación

Contiene la documentación del proyecto:

- **`Documentation/`**: Documentación para usuarios (pt-BR, en, es)
- **`Documentation_4_devs/`**: Documentación técnica para desarrolladores
- **`.vitepress/`**: Configuración y tema de VitePress

## 📄 Archivos Clave

### Archivos de Configuración

- **`package.json`**: Metadatos del proyecto, dependencias, scripts
- **`tsconfig.json`**: Configuración del compilador TypeScript
- **`vitest.config.ts`**: Configuración del framework de pruebas
- **`tsup.config.ts`**: Configuración de la herramienta de build

### Puntos de Entrada

- **`src/index.ts`**: Punto de entrada principal del CLI
- **`docs/.vitepress/config.ts`**: Configuración de documentación VitePress

## 🔗 Documentación Relacionada

- [Archivos Principales](./ARCHIVOS_PRINCIPALES) - Descripción detallada de los archivos principales
- [Arquitectura](./ARQUITECTURA) - Arquitectura del sistema
- [Guía de Desarrollo](./DESARROLLO) - Cómo desarrollar

---

**Última actualización**: 2024
