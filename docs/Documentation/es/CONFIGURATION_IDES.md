# Configuración de IDEs - SetAI CLI

Guía sobre soporte a múltiples IDEs y selección de carpeta de configuración.

## 🎯 Visión General

SetAI CLI soporta múltiples IDEs y genera la estructura en la carpeta apropiada para cada una. Esto permite usar el CLI con cualquier IDE que soporte configuración vía archivos.

---

## 🖥️ IDEs Soportadas

### 1. Cursor

**Carpeta:** `.cursor/`

**Cuándo usar:**
- Estás usando el editor Cursor
- Quieres configuración específica para Cursor

**Características:**
- Estructura optimizada para Cursor
- Compatible con recursos de IA de Cursor

### 2. VS Code

**Carpeta:** `.vscode/`

**Cuándo usar:**
- Estás usando Visual Studio Code
- Quieres configuración específica para VS Code

**Características:**
- Estructura compatible con VS Code
- Puede usarse con extensiones de IA

### 3. JetBrains

**Carpeta:** `.idea/`

**Cuándo usar:**
- Estás usando IntelliJ IDEA, WebStorm, PyCharm, etc.
- Quieres configuración específica para IDEs JetBrains

**Características:**
- Estructura compatible con IDEs JetBrains
- Funciona con todos los productos JetBrains

### 4. Otra IDE / Genérico

**Carpeta:** `.ai/` (o personalizada)

**Cuándo usar:**
- Estás usando otra IDE
- Quieres una carpeta genérica
- Necesitas nombre personalizado

**Características:**
- Carpeta genérica `.ai/`
- Permite nombre personalizado
- Funciona con cualquier IDE

---

## 🔄 Selección de IDE

### Durante `setai init`

Al ejecutar `setai init`, la primera pregunta es:

```
? ¿Qué IDE estás usando?
  ❯ Cursor
    VS Code
    JetBrains (IntelliJ, WebStorm, etc.)
    Otra IDE / Genérico (.ai)
```

### Carpeta Personalizada

Si eliges "Otra IDE / Genérico", se preguntará:

```
? Nombre de la carpeta de configuración (o deja en blanco para usar .ai):
> .mi-ide
```

**Validación:**
- No puede estar vacío
- No puede contener `..`, `/`, o `\`
- Debe ser un nombre de carpeta válido

---

## 📁 Estructura por IDE

### Cursor (`.cursor/`)

```
.cursor/
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

### VS Code (`.vscode/`)

```
.vscode/
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

### JetBrains (`.idea/`)

```
.idea/
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

### Genérico (`.ai/` o personalizado)

```
.ai/  (o nombre personalizado)
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

---

## 🔍 Detección de Estructura Existente

### Comportamiento

El CLI verifica si la carpeta de configuración ya existe:

```
⚠️  La estructura .cursor/ ya existe en este directorio.

? ¿Deseas sobrescribir la estructura existente?
  ❯ Yes
     No
```

**Si eliges `No`:**
- Operación cancelada
- Estructura existente preservada

**Si eliges `Yes`:**
- Estructura existente será sobrescrita
- Todos los archivos serán regenerados

---

## 💡 Casos de Uso

### Caso 1: Proyecto con Cursor

```bash
$ setai init

? ¿Qué IDE estás usando?
  ❯ Cursor

# Estructura generada en .cursor/
```

### Caso 2: Proyecto con VS Code

```bash
$ setai init

? ¿Qué IDE estás usando?
    VS Code

# Estructura generada en .vscode/
```

### Caso 3: Múltiples IDEs en el Mismo Proyecto

Puedes tener múltiples carpetas de configuración:

```bash
# Primera ejecución - Cursor
$ setai init
? ¿Qué IDE? Cursor
# Genera .cursor/

# Segunda ejecución - VS Code (en otro momento)
$ setai init
? ¿Qué IDE? VS Code
# Genera .vscode/
```

**Resultado:**
```
proyecto/
├── .cursor/    # Configuración para Cursor
├── .vscode/    # Configuración para VS Code
└── ...
```

---

## 🔗 Enlaces Relacionados

- [Getting Started](./GETTING_STARTED.md) - Guía de inicio
- [Uso Básico](./USAGE_BASIC.md) - Comandos básicos
- [Configuración](./CONFIGURATION.md) - Gestión de API keys
