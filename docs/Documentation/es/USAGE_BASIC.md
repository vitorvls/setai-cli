# Uso Básico - SetAI CLI

Guía completa sobre el uso básico de SetAI CLI.

## 📋 Visión General

El modo básico de SetAI CLI permite generar una estructura completa de configuración para desarrollo asistido por IA con preguntas esenciales sobre el proyecto.

---

## 🎯 Comando Principal

### `setai init`

Genera la estructura de configuración básica.

**Sintaxis:**
```bash
setai init
```

**Qué hace:**
1. Pregunta qué IDE estás usando
2. Recopila información básica del proyecto
3. Recopila información sobre stack tecnológica
4. Genera estructura en la carpeta apropiada

---

## 📝 Preguntas Básicas

### 1. Selección de IDE

```
? ¿Qué IDE estás usando?
  ❯ Cursor
    VS Code
    JetBrains (IntelliJ, WebStorm, etc.)
    Otra IDE / Genérico (.ai)
```

**Impacto:**
- **Cursor** → Genera en `.cursor/`
- **VS Code** → Genera en `.vscode/`
- **JetBrains** → Genera en `.idea/`
- **Otra IDE** → Genera en `.ai/` (o carpeta personalizada)

### 2. Información del Proyecto

#### Nombre del Proyecto
```
? ¿Cuál es el nombre del proyecto?
> mi-proyecto
```

**Validación:**
- No puede estar vacío
- Debe ser un nombre válido

#### Descripción del Problema
```
? Describe el problema que este proyecto resuelve:
> Sistema de gestión de tareas para equipos
```

**Uso:**
- Llena `project-goals.md`
- Usado para contexto de IA

#### Importancia del Problema
```
? ¿Por qué importa este problema?
> Aumenta productividad y organización del equipo
```

**Uso:**
- Llena `project-goals.md`
- Explica el valor del proyecto

#### Usuarios Principales
```
? ¿Quiénes son los usuarios principales de este proyecto?
> Desarrolladores, Product Managers, Tech Leads
```

**Formato:**
- Puede ser lista separada por comas
- Se formateará como lista markdown

**Uso:**
- Llena `project-goals.md` y `architecture.md`

#### Objetivos de Negocio
```
? ¿Cuáles son los objetivos de negocio principales?
> Reducir tiempo de desarrollo, mejorar calidad del código
```

**Uso:**
- Llena `project-goals.md`

#### Restricciones Técnicas
```
? ¿Cuáles son las restricciones técnicas? (o "Ninguna" si no hay)
> Debe funcionar offline, soportar múltiples navegadores
```

**Predeterminado:** "Ninguna"

**Uso:**
- Llena `project-goals.md`

#### Restricciones de Negocio
```
? ¿Cuáles son las restricciones de negocio? (o "Ninguna" si no hay)
> Presupuesto limitado, plazo de 3 meses
```

**Predeterminado:** "Ninguna"

**Uso:**
- Llena `project-goals.md`

#### No-objetivos
```
? ¿Qué NO hace este proyecto? (lo que está fuera del alcance)
> No incluye app móvil, no soporta integración con X
```

**Uso:**
- Llena `project-goals.md`
- Define límites claros del proyecto

#### Versión Inicial
```
? ¿Cuál es la versión inicial del proyecto?
> 0.1.0
```

**Predeterminado:** `0.1.0`

**Validación:**
- Debe seguir formato semántico (ej: `1.0.0`, `0.1.0`)
- Acepta sufijos (ej: `1.0.0-beta.1`)

**Uso:**
- Llena varios archivos de contexto

### 3. Stack Tecnológica

#### Lenguaje Principal
```
? ¿Cuál es el lenguaje principal del proyecto?
  ❯ TypeScript
    JavaScript
    Python
    Go
    Rust
    Otro
```

**Uso:**
- Llena `tech-stack.md`
- Afecta reglas de código y pruebas

#### Framework
```
? ¿Qué framework estás usando?
  ❯ Next.js
    React
    Vue
    Angular
    Express
    FastAPI
    Django
    Ninguno
    Otro
```

**Condición:** Aparece solo si el lenguaje es TypeScript o JavaScript

**Uso:**
- Llena `tech-stack.md` y `architecture.md`

#### Base de Datos
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

**Uso:**
- Llena `tech-stack.md` y `architecture.md`

### 4. Preferencias

#### TDD (Test-Driven Development)
```
? ¿Usas TDD (Test-Driven Development)?
  ❯ Yes
     No
```

**Predeterminado:** `Yes`

**Uso:**
- Llena `testing-rules.md`
- Afecta reglas de desarrollo

#### Modo Strict (TypeScript)
```
? ¿Prefieres modo strict en TypeScript?
  ❯ Yes
     No
```

**Condición:** Aparece solo si el lenguaje es TypeScript

**Predeterminado:** `Yes`

**Uso:**
- Llena `code-style.md`
- Afecta configuración TypeScript

---

## 📁 Archivos Generados

### Context (`context/`)

#### `project-goals.md`
- Objetivos de negocio
- Problema e importancia
- Usuarios principales
- Restricciones

#### `tech-stack.md`
- Lenguaje
- Framework
- Base de datos
- Versiones

#### `architecture.md`
- Visión general del sistema
- Decisiones arquitectónicas básicas
- Stack tecnológica

#### `deployment.md`
- Estrategia de deploy básica
- Entornos

### Rules (`rules/`)

#### `code-style.md`
- Reglas de formato
- Convenciones de nomenclatura
- Configuración de lint
- TDD obligatorio

#### `testing-rules.md`
- Estrategia de pruebas
- TDD obligatorio
- Cobertura mínima

#### `git-rules.md`
- Estándares de commit
- Estructura de branches
- Git hooks

#### `security-rules.md`
- Reglas de seguridad
- Buenas prácticas

#### `ai-usage-rules.md`
- Reglas básicas de uso de IA
- Modelos recomendados

#### `business-rules.md`
- Reglas de negocio del CLI
- Validaciones

### Libs (`libs/`)

#### `allowed-libs.md`
- Bibliotecas permitidas predeterminadas
- Lista base

#### `forbidden-libs.md`
- Bibliotecas prohibidas predeterminadas
- Alternativas recomendadas

#### `ai-models.md`
- Modelos de IA recomendados
- Casos de uso

### Commands (`commands/`)

#### `architecture-review.md`
- Comando de revisión arquitectónica

#### `refactor-controlled.md`
- Comando de refactorización controlada

#### `generate-docs.md`
- Comando de generación de documentación

#### `test-strategy.md`
- Comando de estrategia de pruebas

---

## 🔄 Flujo Completo

```
1. Usuario ejecuta: setai init
   ↓
2. CLI pregunta: ¿Qué IDE?
   ↓
3. CLI pregunta: Información del proyecto
   ↓
4. CLI pregunta: Stack tecnológica
   ↓
5. CLI pregunta: Preferencias
   ↓
6. CLI valida respuestas
   ↓
7. CLI procesa templates
   ↓
8. CLI genera archivos
   ↓
9. ¡Estructura creada! ✅
```

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Proyecto React

```bash
$ setai init --lang es

? ¿Qué IDE estás usando? Cursor
? ¿Cuál es el nombre del proyecto? mi-app-react
? Describe el problema: App de gestión de tareas
? ¿Por qué importa este problema? Aumenta productividad
? ¿Quiénes son los usuarios principales? Desarrolladores, usuarios finales
? ¿Cuáles son los objetivos de negocio? MVP en 2 meses
? ¿Cuáles son las restricciones técnicas? Debe funcionar offline
? ¿Cuáles son las restricciones de negocio? Presupuesto limitado
? ¿Qué NO hace este proyecto? No incluye backend
? ¿Cuál es la versión inicial? 0.1.0
? ¿Cuál es el lenguaje principal? TypeScript
? ¿Qué framework estás usando? React
? ¿Qué base de datos estás usando? Supabase
? ¿Usas TDD? Yes
? ¿Prefieres modo strict en TypeScript? Yes

✅ Estructura .cursor/ generada con éxito!
```

---

## 🎯 Cuándo Usar Modo Básico

✅ **Usa cuando:**
- Es tu primera vez usando el CLI
- Quieres comenzar rápidamente
- Solo necesitas la estructura esencial
- No necesitas personalización avanzada

❌ **No uses cuando:**
- Necesitas configurar reglas específicas de IA
- Quieres personalizar bibliotecas permitidas/prohibidas
- Necesitas configuraciones de seguridad personalizadas
- Quieres usar integración con IA para enriquecer respuestas

**Para estos casos, ve:**
- [Uso Avanzado](./USAGE_ADVANCED.md) - `setai init --advanced`
- [Modo Beta](./USAGE_BETA.md) - `setai init --beta`

---

## 🔗 Enlaces Relacionados

- [Getting Started](./GETTING_STARTED.md) - Guía de instalación
- [Uso Avanzado](./USAGE_ADVANCED.md) - Configuraciones avanzadas
- [Ejemplos](./EXAMPLES.md) - Ejemplos prácticos
- [Troubleshooting](./TROUBLESHOOTING.md) - Solución de problemas
