# Getting Started - SetAI CLI

Guía completa para comenzar a usar SetAI CLI.

## 📦 Instalación

### Vía npm

```bash
npm install -g @setai/cli
```

### Vía pnpm

```bash
pnpm add -g @setai/cli
```

### Vía yarn

```bash
yarn global add @setai/cli
```

### Verificar Instalación

```bash
setai --version
```

Deberías ver la versión instalada (ej: `0.1.0`).

---

## 🚀 Quick Start

### 1. Navega hasta el directorio de tu proyecto

```bash
cd mi-proyecto
```

### 2. Ejecuta el comando init

```bash
# Uso básico (español)
setai init --lang es

# O configura el idioma primero
setai config
# Selecciona "🌐 Configurar idioma"
```

### 3. Responde las preguntas

El CLI hará preguntas sobre:
- Nombre del proyecto
- Descripción y objetivos
- Stack tecnológica
- Preferencias de desarrollo

### 4. Estructura generada

Después de responder las preguntas, la estructura se generará en la carpeta apropiada (`.cursor`, `.vscode`, `.idea`, o `.ai`).

---

## 📋 Primer Uso Paso a Paso

### Paso 1: Selección de IDE

Cuando ejecutes `setai init`, se te preguntará qué IDE estás usando:

```
? ¿Qué IDE estás usando?
  ❯ Cursor
    VS Code
    JetBrains (IntelliJ, WebStorm, etc.)
    Otra IDE / Genérico (.ai)
```

**Qué hace esto:**
- Determina la carpeta de configuración (`.cursor`, `.vscode`, `.idea`, o `.ai`)
- Personaliza la estructura para tu IDE

### Paso 2: Información Básica del Proyecto

Se te preguntará sobre:

1. **Nombre del Proyecto**
   ```
   ? ¿Cuál es el nombre del proyecto?
   > mi-proyecto
   ```

2. **Descripción del Problema**
   ```
   ? Describe el problema que este proyecto resuelve:
   > Sistema de gestión de tareas para equipos
   ```

3. **Importancia del Problema**
   ```
   ? ¿Por qué importa este problema?
   > Aumenta la productividad y organización del equipo
   ```

4. **Usuarios Principales**
   ```
   ? ¿Quiénes son los usuarios principales de este proyecto?
   > Desarrolladores, Product Managers, Tech Leads
   ```

5. **Objetivos de Negocio**
   ```
   ? ¿Cuáles son los objetivos de negocio principales?
   > Reducir tiempo de desarrollo, mejorar calidad del código
   ```

6. **Restricciones**
   ```
   ? ¿Cuáles son las restricciones técnicas? (o "Ninguna" si no hay)
   > Debe funcionar offline, soportar múltiples navegadores
   ```

### Paso 3: Stack Tecnológica

1. **Lenguaje**
   ```
   ? ¿Cuál es el lenguaje principal del proyecto?
   ❯ TypeScript
     JavaScript
     Python
     Go
     Rust
     Otro
   ```

2. **Framework** (si aplica)
   ```
   ? ¿Qué framework estás usando?
   ❯ Next.js
     React
     Vue
     Angular
     Express
     Ninguno
     Otro
   ```

3. **Base de Datos**
   ```
   ? ¿Qué base de datos estás usando?
   ❯ PostgreSQL
     MySQL
     MongoDB
     SQLite
     Supabase
     Ninguno
     Otro
   ```

### Paso 4: Preferencias

1. **TDD**
   ```
   ? ¿Usas TDD (Test-Driven Development)?
   ❯ Yes
     No
   ```

2. **Modo Strict** (si TypeScript)
   ```
   ? ¿Prefieres modo strict en TypeScript?
   ❯ Yes
     No
   ```

### Paso 5: Confirmación

Después de responder todas las preguntas, verás un resumen:

```
✅ Información recolectada:
   Proyecto: mi-proyecto
   Versión: 0.1.0
   Lenguaje: TypeScript
   IDE: Cursor
   Carpeta: .cursor/
```

### Paso 6: Estructura Generada

La estructura se creará automáticamente:

```
🎉 Estructura .cursor/ generada con éxito!

Próximos pasos:
  1. Revisa los archivos generados en .cursor/
  2. Completa los templates con información específica de tu proyecto
  3. Configura lint y formatter según se documenta en .cursor/rules/code-style.md
```

---

## 📁 Estructura Generada

Después de ejecutar `setai init`, tendrás la siguiente estructura:

```
.cursor/
├── README.md                    # Visión general y guía de uso
├── context/
│   ├── project-goals.md         # Objetivos y contexto del proyecto
│   ├── tech-stack.md            # Stack tecnológica
│   ├── architecture.md          # Decisiones arquitectónicas
│   └── deployment.md            # Estrategia de deploy
├── rules/
│   ├── code-style.md            # Reglas de estilo de código
│   ├── testing-rules.md         # Reglas de pruebas
│   ├── git-rules.md             # Reglas de Git
│   ├── security-rules.md        # Reglas de seguridad
│   ├── ai-usage-rules.md        # Reglas de uso de IA
│   └── business-rules.md        # Reglas de negocio
├── libs/
│   ├── allowed-libs.md         # Bibliotecas permitidas
│   ├── forbidden-libs.md        # Bibliotecas prohibidas
│   └── ai-models.md             # Modelos de IA recomendados
└── commands/
    ├── architecture-review.md   # Comando de revisión arquitectónica
    ├── refactor-controlled.md   # Comando de refactorización controlada
    ├── generate-docs.md         # Comando de generación de documentación
    └── test-strategy.md         # Comando de estrategia de pruebas
```

---

## ✅ Verificación

Después de la generación, verifica:

1. **Estructura creada:**
   ```bash
   ls -la .cursor/
   ```

2. **Archivos completados:**
   ```bash
   cat .cursor/context/project-goals.md
   ```

3. **Contenido personalizado:**
   - Verifica si el nombre de tu proyecto aparece en los archivos
   - Confirma que la stack tecnológica es correcta
   - Valida que los objetivos están documentados

---

## 🎯 Próximos Pasos

Ahora que tienes la estructura básica:

1. **Revisa los archivos generados**
   - Lee `.cursor/README.md` para entender la estructura
   - Revisa `.cursor/context/project-goals.md`

2. **Configura Lint y Formatter**
   - Sigue las instrucciones en `.cursor/rules/code-style.md`
   - Configura ESLint y Prettier

3. **Personaliza las Reglas**
   - Ajusta `.cursor/rules/` según sea necesario
   - Añade reglas específicas de tu proyecto

4. **Explora Opciones Avanzadas**
   - Ve [Uso Avanzado](./USAGE_ADVANCED.md)
   - Prueba `setai init --advanced`

5. **Configura Integración con IA**
   - Ve [Modo Beta](./USAGE_BETA.md)
   - Ejecuta `setai config` para configurar API keys

6. **Configura Idioma (Opcional)**
   - Ejecuta `setai config` y elige "🌐 Configurar idioma"
   - O usa `setai init --lang <idioma>` para definir idioma de preguntas y archivos
   - Idiomas soportados: es (predeterminado), pt-BR, en

---

## 💡 Consejos

- **¿Primera vez?** Usa `setai init --lang es` sin flags para empezar simple
- **¿Proyecto existente?** El CLI detecta estructuras existentes y pregunta si deseas sobrescribir
- **¿Múltiples proyectos?** Ejecuta `setai init` en cada directorio de proyecto
- **¿Personalización?** Usa `setai init --advanced` para más opciones

---

## ❓ Problemas Comunes

### "Comando no encontrado"

**Solución:** Verifica si el paquete fue instalado globalmente:
```bash
npm list -g @setai/cli
```

### "Permiso denegado"

**Solución:** Usa `sudo` (Linux/macOS) o ejecuta como administrador (Windows):
```bash
sudo npm install -g @setai/cli
```

### "Estructura ya existe"

**Solución:** El CLI pregunta si deseas sobrescribir. Responde `Yes` si quieres reemplazar.

---

## 📚 Próximos Guías

- [**Uso Básico**](./USAGE_BASIC.md) - Comandos y funcionalidades básicas
- [**Uso Avanzado**](./USAGE_ADVANCED.md) - Configuraciones avanzadas
- [**Modo Beta**](./USAGE_BETA.md) - Integración con IA
- [**Ejemplos**](./EXAMPLES.md) - Ejemplos prácticos
