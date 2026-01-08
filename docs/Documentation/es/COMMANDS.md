# Referencia de Comandos - SetAI CLI

Referencia completa de todos los comandos y opciones disponibles.

## 📋 Comandos Disponibles

### `setai init`

Genera estructura de configuración para desarrollo asistido por IA.

**Sintaxis:**
```bash
setai init [opciones]
```

**Opciones:**
- `--advanced` - Incluye preguntas avanzadas opcionales
- `--beta` - Habilita integración con IA
- `--lang <locale>` - Define idioma de preguntas y archivos (pt-BR, en, es)

**Ejemplos:**
```bash
setai init
setai init --advanced
setai init --beta
setai init --advanced --beta
setai init --lang es
setai init --lang en
setai init --advanced --lang es
```

**Qué hace:**
1. Pregunta qué IDE estás usando
2. Recopila información del proyecto
3. (Opcional) Preguntas avanzadas
4. (Opcional) Enriquece con IA
5. Genera estructura en la carpeta apropiada

---

### `setai config`

Gestiona configuraciones del CLI, incluyendo API keys.

**Sintaxis:**
```bash
setai config
```

**Menú interactivo:**
- ➕ Agregar/Actualizar API Key
- ➖ Remover API Key
- 📋 Listar API Keys configuradas
- 🌐 Configurar idioma
- ❌ Salir

**Qué hace:**
- Gestiona API keys de OpenAI, Anthropic y Google
- Permite seleccionar modelo predeterminado por proveedor
- Configura idioma de preguntas y archivos generados
- Almacena configuraciones en `~/.setai/config.json`

---

### `setai --help`

Muestra ayuda y ejemplos de uso.

**Sintaxis:**
```bash
setai --help
setai init --help
setai config --help
```

---

### `setai --version`

Muestra versión del CLI.

**Sintaxis:**
```bash
setai --version
```

---

## 🔧 Opciones Detalladas

### `--lang <locale>`

**Comando:** `setai init --lang <locale>`

**Valores aceptados:**
- `pt-BR` - Português (Brasil) - Predeterminado
- `en` - English
- `es` - Español

**Qué hace:**
- Define el idioma de las preguntas interactivas
- Define el idioma de los archivos generados
- Guarda la preferencia en `~/.setai/config.json`

**Ejemplos:**
```bash
# Español
setai init --lang es

# Inglés
setai init --lang en

# Português (predeterminado)
setai init --lang pt-BR
```

**Nota:** También puedes configurar idiomas diferentes para preguntas y archivos usando `setai config`.

---

### `--advanced`

**Comando:** `setai init --advanced`

**Qué hace:**
- Habilita preguntas avanzadas opcionales
- Permite configurar grupos modulares:
  - AI Usage Rules
  - Responsabilidades
  - Bibliotecas
  - Arquitectura Detallada
  - Seguridad
  - Pruebas
  - Deploy
  - Documentación

**Cuándo usar:**
- Necesitas personalizar reglas específicas
- Quieres configurar bibliotecas personalizadas
- Necesitas documentar decisiones arquitectónicas

**Ve:** [Uso Avanzado](./USAGE_ADVANCED.md)

---

### `--beta`

**Comando:** `setai init --beta`

**Qué hace:**
- Habilita integración con modelos de IA
- Enriquece respuestas automáticamente
- Genera descripciones profesionales
- Expande objetivos y decisiones

**Prerrequisitos:**
- Al menos una API key configurada
- Ejecutar `setai config` primero

**Cuándo usar:**
- Quieres descripciones profesionales
- Necesitas objetivos expandidos
- Quieres sugerencias arquitectónicas

**Ve:** [Modo Beta](./USAGE_BETA.md)

---

## 🔄 Combinaciones

### Básico
```bash
setai init
```
- Preguntas básicas únicamente
- Estructura esencial

### Avanzado
```bash
setai init --advanced
```
- Preguntas básicas + avanzadas
- Estructura completa personalizada

### Beta
```bash
setai init --beta
```
- Preguntas básicas
- Enriquecimiento con IA

### Completo
```bash
setai init --advanced --beta
```
- Preguntas básicas + avanzadas
- Enriquecimiento con IA
- Máxima personalización

### Con Idioma Específico
```bash
setai init --lang es
setai init --advanced --lang en
setai init --beta --lang es
```
- Define idioma de preguntas y archivos
- Puede combinarse con otras opciones

---

## 📚 Enlaces Relacionados

- [Getting Started](./GETTING_STARTED.md)
- [Uso Básico](./USAGE_BASIC.md)
- [Uso Avanzado](./USAGE_ADVANCED.md)
- [Modo Beta](./USAGE_BETA.md)
- [Configuración](./CONFIGURATION.md)
