# Uso Avanzado - SetAI CLI

Guía completa sobre el uso avanzado de SetAI CLI con configuraciones personalizadas.

## 🎯 Visión General

El modo avanzado permite personalizar completamente la estructura generada a través de grupos modulares de configuración. Puedes elegir qué grupos responder y en qué orden.

---

## 🚀 Comando Avanzado

### `setai init --advanced`

Genera estructura con opciones avanzadas de personalización.

**Sintaxis:**
```bash
setai init --advanced
```

**Qué hace:**
1. Ejecuta todas las preguntas básicas
2. Pregunta si deseas configurar opciones avanzadas
3. Permite seleccionar grupos de configuración
4. Recopila respuestas de forma iterativa
5. Genera estructura completamente personalizada

---

## 📋 Flujo de Configuración Avanzada

### 1. Preguntas Básicas

Primero, todas las preguntas básicas son hechas (ve [Uso Básico](./USAGE_BASIC.md)).

### 2. Confirmación de Opciones Avanzadas

```
🔧 ¿Deseas configurar opciones avanzadas? (permitirá personalizar todos los archivos)
  ❯ Yes
     No
```

**Si eliges `No`:**
- Proceso termina
- Estructura básica es generada

**Si eliges `Yes`:**
- Entra en modo de configuración avanzada

### 3. Selección Iterativa de Grupos

El CLI presenta un menú interactivo donde puedes:

1. **Seleccionar un grupo** para responder
2. **Responder las preguntas** de ese grupo
3. **Volver al menú** para seleccionar otro grupo
4. **Finalizar** cuando termines

**Menú de selección:**
```
📋 Selecciona un grupo de configuración avanzada para llenar:
  ❯ 🤖 AI Usage Rules - Modelos preferidos y reglas de uso de IA
    👥 Responsabilidades - CTO, Tech Lead, Dev
    📚 Bibliotecas - Lista personalizada de libs permitidas/prohibidas
    🏗️ Arquitectura Detallada - Decisiones arquitectónicas y patrones
    🔒 Seguridad - Reglas específicas de seguridad
    🧪 Pruebas - Estrategia detallada de pruebas
    📦 Deploy - Configuraciones de deploy e infraestructura
    📝 Documentación - Estándares de documentación
    ✅ Finalizar configuración avanzada
```

**Comportamiento:**
- Grupos ya respondidos aparecen como "✓ (ya respondido)" y quedan indisponibles
- Puedes elegir el orden de respuesta
- Puedes finalizar en cualquier momento

---

## 📚 Grupos de Configuración

### 1. 🤖 AI Usage Rules

**Qué configura:**
- Modelos de IA preferidos por fase de desarrollo
- Permisos de uso de IA
- Restricciones personalizadas

**Preguntas:**
1. Modelo preferido para Arquitectura & Planeamiento
2. Modelo preferido para Implementación de Código
3. Modelo preferido para Refactorización & Legado
4. Modelo preferido para Debug & Análisis
5. Modelo preferido para Código Rápido / Boilerplate
6. ¿Permitir uso de IA para Arquitectura & Planeamiento?
7. ¿Permitir uso de IA para Generación de Código?
8. ¿Permitir uso de IA para Refactorización?
9. ¿Permitir uso de IA para Debug & Análisis?
10. ¿Permitir uso de IA para Documentación?
11. Restricciones personalizadas para uso de IA

**Archivos afectados:**
- `.cursor/rules/ai-usage-rules.md`
- `.cursor/libs/ai-models.md`

---

### 2. 👥 Responsabilidades

**Qué configura:**
- Responsabilidades del CTO en relación al uso de IA
- Responsabilidades del Tech Lead
- Responsabilidades del Dev

**Preguntas:**
1. Responsabilidad del CTO
2. Responsabilidad del Tech Lead
3. Responsabilidad del Dev

**Archivos afectados:**
- `.cursor/rules/ai-usage-rules.md`

---

### 3. 📚 Bibliotecas

**Qué configura:**
- Bibliotecas permitidas adicionales
- Bibliotecas prohibidas adicionales
- Notas sobre política de bibliotecas

**Preguntas:**
1. Bibliotecas permitidas adicionales (separadas por coma)
2. Bibliotecas prohibidas adicionales (separadas por coma)
3. Notas sobre política de bibliotecas

**Archivos afectados:**
- `.cursor/libs/allowed-libs.md`
- `.cursor/libs/forbidden-libs.md`

---

### 4. 🏗️ Arquitectura Detallada

**Qué configura:**
- Estilo arquitectónico del proyecto
- Decisiones arquitectónicas principales
- Patrones de diseño utilizados

**Preguntas:**
1. Estilo arquitectónico (ej: Monolito, Microservicios, Serverless)
2. Decisiones arquitectónicas principales (separadas por coma)
3. Patrones de diseño utilizados (separados por coma)

**Archivos afectados:**
- `.cursor/context/architecture.md`

---

### 5. 🔒 Seguridad

**Qué configura:**
- Método de autenticación
- Medidas de protección de datos
- Reglas de seguridad específicas

**Preguntas:**
1. Método de autenticación utilizado
2. Medidas de protección de datos
3. Reglas de seguridad específicas (separadas por coma)

**Archivos afectados:**
- `.cursor/rules/security-rules.md`

---

### 6. 🧪 Pruebas

**Qué configura:**
- Estrategia de pruebas personalizada
- Cobertura mínima esperada
- Herramientas de prueba utilizadas

**Preguntas:**
1. Estrategia de pruebas
2. Cobertura de pruebas mínima esperada (ej: 80%)
3. Herramientas de prueba utilizadas (separadas por coma)

**Archivos afectados:**
- `.cursor/rules/testing-rules.md`

---

### 7. 📦 Deploy

**Qué configura:**
- Método de deploy
- Infraestructura utilizada
- Herramienta de CI/CD
- Entornos disponibles

**Preguntas:**
1. Método de deploy (ej: Docker, Vercel, AWS)
2. Infraestructura utilizada
3. Herramienta de CI/CD (ej: GitHub Actions, GitLab CI)
4. Entornos disponibles (ej: dev, staging, prod)

**Archivos afectados:**
- `.cursor/context/deployment.md`

---

### 8. 📝 Documentación

**Qué configura:**
- Estándares de documentación
- Herramienta de documentación de API
- Patrón de comentarios en el código

**Preguntas:**
1. Estándares de documentación
2. Herramienta de documentación de API (ej: Swagger)
3. Patrón de comentarios en el código

**Archivos afectados:**
- `.cursor/rules/ai-usage-rules.md` (sección de documentación)

---

## 🔄 Flujo Iterativo

El flujo avanzado funciona de forma iterativa:

```
1. Responder preguntas básicas
   ↓
2. Confirmar uso de opciones avanzadas
   ↓
3. Menú de selección de grupos
   ↓
4. Seleccionar grupo
   ↓
5. Responder preguntas del grupo
   ↓
6. Grupo marcado como "✓ (ya respondido)"
   ↓
7. Volver al menú (grupo indisponible)
   ↓
8. Seleccionar otro grupo o finalizar
   ↓
9. Procesar todas las respuestas
   ↓
10. Generar estructura personalizada ✅
```

---

## 🎯 Cuándo Usar Modo Avanzado

✅ **Usa cuando:**
- Necesitas personalizar reglas específicas de IA
- Quieres definir bibliotecas permitidas/prohibidas personalizadas
- Necesitas documentar decisiones arquitectónicas detalladas
- Quieres configurar reglas de seguridad específicas
- Necesitas definir estrategia de pruebas personalizada
- Quieres documentar configuraciones de deploy
- Necesitas establecer estándares de documentación

❌ **No uses cuando:**
- Es tu primera vez usando el CLI
- Quieres comenzar rápidamente
- No necesitas personalización específica
- La estructura básica es suficiente

---

## 💡 Consejos

1. **Orden de Respuesta:**
   - Puedes responder los grupos en el orden que prefieras
   - No hay orden obligatorio

2. **Saltar Grupos:**
   - Puedes finalizar sin responder todos los grupos
   - Solo los grupos respondidos serán aplicados

3. **Editar Después:**
   - Todos los archivos generados son editables
   - Puedes modificar manualmente después de la generación

4. **Reejecutar:**
   - Si quieres agregar más configuraciones, ejecuta `setai init --advanced` nuevamente
   - Se preguntará si deseas sobrescribir

---

## 🔗 Enlaces Relacionados

- [Uso Básico](./USAGE_BASIC.md) - Modo básico
- [Modo Beta](./USAGE_BETA.md) - Integración con IA
- [Ejemplos](./EXAMPLES.md) - Ejemplos prácticos
- [Configuración](./CONFIGURATION.md) - Gestión de API keys
