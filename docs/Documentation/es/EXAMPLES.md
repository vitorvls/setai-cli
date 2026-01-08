# Ejemplos Prácticos - SetAI CLI

Ejemplos reales de uso de SetAI CLI en diferentes escenarios.

## 📋 Índice

- [Proyecto React/Next.js](#proyecto-reactnextjs)
- [Proyecto Backend Node.js](#proyecto-backend-nodejs)
- [Proyecto Python/FastAPI](#proyecto-pythonfastapi)
- [Proyecto Full Stack](#proyecto-full-stack)
- [Con Modo Avanzado](#con-modo-avanzado)
- [Con Modo Beta (IA)](#con-modo-beta-ia)

---

## 🚀 Proyecto React/Next.js

### Escenario
Crear estructura para un proyecto Next.js con TypeScript, PostgreSQL y TDD.

### Comando
```bash
setai init --lang es
```

### Respuestas
```
? ¿Qué IDE estás usando? Cursor
? ¿Cuál es el nombre del proyecto? ecommerce-platform
? Describe el problema: Plataforma de e-commerce moderna
? ¿Por qué importa este problema? Facilita ventas online
? Usuarios principales: Desarrolladores, Product Managers
? Objetivos de negocio: MVP en 3 meses, alta performance
? Restricciones técnicas: Debe soportar 10k usuarios simultáneos
? Restricciones de negocio: Presupuesto limitado
? No-objetivos: No incluye app móvil
? Versión inicial: 0.1.0
? Lenguaje: TypeScript
? Framework: Next.js
? Base de datos: PostgreSQL
? ¿Usas TDD? Yes
? ¿Prefieres modo strict en TypeScript? Yes
```

### Resultado
Estructura `.cursor/` generada con:
- Configuración para Next.js
- Reglas de TDD
- TypeScript strict mode
- Contexto del proyecto lleno

---

## 🔧 Proyecto Backend Node.js

### Escenario
API REST con Express, MongoDB, sin TDD inicial.

### Comando
```bash
setai init --lang es
```

### Respuestas
```
? IDE: VS Code
? Nombre: api-backend
? Problema: API REST para sistema de gestión
? Importancia: Automatiza procesos
? Usuarios: Desarrolladores, integradores
? Objetivos: Alta disponibilidad, escalabilidad
? Restricciones técnicas: Debe soportar 50k req/min
? Restricciones de negocio: Ninguna
? No-objetivos: No incluye frontend
? Versión: 1.0.0
? Lenguaje: JavaScript
? Framework: Express
? Base de datos: MongoDB
? TDD: No
```

### Resultado
Estructura `.vscode/` generada con configuraciones para Express y MongoDB.

---

## 🐍 Proyecto Python/FastAPI

### Escenario
API FastAPI con PostgreSQL, TDD con pytest.

### Comando
```bash
setai init --lang es
```

### Respuestas
```
? IDE: JetBrains
? Nombre: ml-api
? Problema: API para modelos de ML
? Importancia: Disponibiliza IA para clientes
? Usuarios: Data Scientists, desarrolladores
? Objetivos: Baja latencia, alta precisión
? Restricciones técnicas: Debe procesar 1k req/s
? Restricciones de negocio: Ninguna
? No-objetivos: No incluye entrenamiento de modelos
? Versión: 0.1.0
? Lenguaje: Python
? Framework: FastAPI
? Base de datos: PostgreSQL
? TDD: Yes
```

### Resultado
Estructura `.idea/` generada con configuraciones para FastAPI y Python.

---

## 🌐 Proyecto Full Stack

### Escenario
Aplicación completa con Next.js, Node.js, PostgreSQL.

### Comando
```bash
setai init --advanced --lang es
```

### Respuestas Básicas
```
? IDE: Cursor
? Nombre: fullstack-app
? Problema: Aplicación completa de gestión
? ... (otras preguntas básicas)
? Lenguaje: TypeScript
? Framework: Next.js
? Base de datos: PostgreSQL
? TDD: Yes
```

### Respuestas Avanzadas
```
? ¿Deseas configurar opciones avanzadas? Yes

📋 Selecciona grupo:
  ❯ 🤖 AI Usage Rules

? Modelo para Arquitectura: Claude 4.5 Opus
? Modelo para Implementación: GPT-5.1 Codex
? ¿Permitir IA para Arquitectura? Yes
? ¿Permitir IA para Código? Yes
...

📋 Selecciona grupo:
  ❯ 🏗️ Arquitectura Detallada

? Estilo: Microservicios
? Decisiones: API Gateway, Event-Driven
? Patrones: Repository, Factory
...

📋 Selecciona grupo:
  ❯ ✅ Finalizar
```

### Resultado
Estructura completa con:
- Configuraciones avanzadas de IA
- Decisiones arquitectónicas detalladas
- Reglas personalizadas

---

## 🤖 Con Modo Beta (IA)

### Escenario
Proyecto que necesita descripciones profesionales y objetivos expandidos.

### Prerrequisito
```bash
setai config
# Configura OpenAI API key
```

### Comando
```bash
setai init --beta --lang es
```

### Respuestas
```
? IDE: Cursor
? Nombre: saas-platform
? Problema: Plataforma SaaS para gestión
? ... (otras preguntas básicas)
```

### Proceso con IA
```
🤖 Enriqueciendo respuestas con IA...
   Analizando respuestas con IA...
   Usando OpenAI...
✅ Respuestas enriquecidas con IA!
```

### Resultado
Archivos generados con:
- Descripciones profesionales expandidas
- Objetivos medibles (5-7 objetivos)
- Decisiones arquitectónicas sugeridas
- Mejores prácticas específicas
- Directrices de uso de IA personalizadas

---

## 💡 Consejos de Uso

### 1. Primera Vez
Usa `setai init --lang es` sin flags para comenzar simple.

### 2. Proyectos Complejos
Usa `setai init --advanced --lang es` para máxima personalización.

### 3. Contenido Profesional
Usa `setai init --beta --lang es` para enriquecimiento automático.

### 4. Máxima Personalización
Usa `setai init --advanced --beta --lang es` para todo.

---

## 🔗 Enlaces Relacionados

- [Getting Started](./GETTING_STARTED.md)
- [Uso Básico](./USAGE_BASIC.md)
- [Uso Avanzado](./USAGE_ADVANCED.md)
- [Modo Beta](./USAGE_BETA.md)
