# Documentación - SetAI CLI

Bienvenido a la documentación completa de **SetAI CLI**, una herramienta poderosa para generar estructuras de configuración para desarrollo asistido por IA.

## 🌐 Idioma

**🇪🇸 Esta documentación está en Español**

**Versión Actual:** SetAI CLI soporta múltiples idiomas:
- ✅ **Español (es)** - Totalmente soportado
- ✅ **Portugués (pt-BR)** - Totalmente soportado (predeterminado)
- ✅ **Inglés (en)** - Totalmente soportado

**🌐 Funcionalidades de Internacionalización:**
- ✅ Configuración de idioma de las preguntas (vía `--lang` o `setai config`)
- ✅ Configuración de idioma de los archivos generados
- ✅ Plantillas traducidas (con fallback a pt-BR)
- ✅ Todas las mensajes y validaciones traducidas

**🇧🇷 Documentación en Portugués:** [Disponible aquí](../README.md)
**🇺🇸 English Documentation:** [Available here](../en/README.md)

---

## 📚 Índice

### 🚀 Inicio Rápido
- [**Getting Started**](./GETTING_STARTED.md) - Guía de instalación y primeros pasos
- [**Quick Start**](./GETTING_STARTED.md#quick-start) - Ejemplo rápido de uso

### 📖 Guías de Uso
- [**Uso Básico**](./USAGE_BASIC.md) - Comandos básicos y funcionalidades esenciales
- [**Uso Avanzado**](./USAGE_ADVANCED.md) - Configuraciones avanzadas y personalización
- [**Modo Beta (IA)**](./USAGE_BETA.md) - Integración con modelos de IA

### ⚙️ Configuración
- [**Configuración del CLI**](./CONFIGURATION.md) - Gestión de API keys y configuraciones
- [**Configuración de IDEs**](./CONFIGURATION_IDES.md) - Soporte a múltiples IDEs

### 🎯 Ejemplos Prácticos
- [**Ejemplos Reales**](./EXAMPLES.md) - Casos de uso y ejemplos prácticos
- [**Escenarios de Uso**](./EXAMPLES.md#escenarios-de-uso) - Diferentes escenarios de proyecto

### 🔧 Referencia Técnica
- [**Arquitectura**](./ARCHITECTURE.md) - Estructura interna y diseño del CLI
- [**Proveedores de IA**](./PROVIDERS.md) - Detalles sobre proveedores de IA soportados
- [**Plantillas**](./TEMPLATES.md) - Estructura de plantillas y personalización

### 📝 Referencia de Comandos
- [**Comandos CLI**](./COMMANDS.md) - Referencia completa de todos los comandos
- [**Opciones y Flags**](./COMMANDS.md#opciones-y-flags) - Todas las opciones disponibles

### ❓ FAQ y Troubleshooting
- [**FAQ**](./FAQ.md) - Preguntas frecuentes
- [**Troubleshooting**](./TROUBLESHOOTING.md) - Solución de problemas comunes

---

## 🎯 ¿Qué es SetAI CLI?

**SetAI CLI** es una herramienta de línea de comandos que automatiza la creación de estructuras de configuración para desarrollo asistido por IA. Genera una estructura completa y personalizada basada en las respuestas del usuario, aplicando mejores prácticas de desarrollo.

### Principales Funcionalidades

✅ **Generación Automática de Estructura**
- Crea estructura completa de configuración para IA
- Soporta múltiples IDEs (Cursor, VS Code, JetBrains, etc.)
- Personalización basada en preguntas interactivas

✅ **Configuración Avanzada**
- Grupos modulares de configuración
- Flujo iterativo de preguntas
- Configuraciones específicas por proyecto

✅ **Integración con IA (Beta)**
- Enriquecimiento automático de respuestas
- Soporte a múltiples proveedores (OpenAI, Anthropic, Google)
- Fallback automático entre proveedores

✅ **Gestión de API Keys**
- Almacenamiento seguro local
- Configuración interactiva
- Soporte a múltiples proveedores

✅ **Internacionalización (i18n)**
- Soporte a Español, Portugués e Inglés
- Configuración de idioma para preguntas y archivos
- Plantillas traducidas automáticamente

---

## 🚀 Quick Start

```bash
# Instalación
npm install -g @setai/cli

# Uso básico
setai init

# Con opciones avanzadas
setai init --advanced

# Con integración de IA
setai init --beta

# Con idioma específico
setai init --lang es
setai init --lang en

# Configurar API keys e idioma
setai config
```

---

## 📋 Requisitos

- **Node.js:** >= 18.0.0
- **npm/pnpm:** Versión reciente
- **Sistema Operativo:** Windows, macOS, Linux

---

## 🌐 Configuración de Idioma

**Configurar Idioma de Preguntas y Archivos:**

Puedes configurar el idioma tanto para las preguntas interactivas como para los archivos generados:

```bash
# Configurar idioma vía CLI
setai config
# Selecciona "🌐 Configurar idioma"

# O usa la bandera --lang
setai init --lang es
```

**Idiomas Soportados:**
- Español (es) - Totalmente soportado
- Portugués (pt-BR) - Predeterminado, totalmente soportado
- Inglés (en) - Totalmente soportado

---

## 📞 Soporte

- **GitHub Issues:** [Reportar problemas](https://github.com/setai/cli/issues)
- **Documentación:** Esta documentación completa
- **Ejemplos:** Ver [Ejemplos Prácticos](./EXAMPLES.md)

---

## 📄 Licencia

MIT License - Ver el archivo LICENSE para más detalles.

---

**Última actualización:** 2025-01-07

