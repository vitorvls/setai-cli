# Modo Beta (IA) - SetAI CLI

Guía completa sobre el uso del modo Beta con integración de modelos de IA.

## 🎯 Visión General

El modo Beta (`--beta`) habilita la integración con modelos de IA para **enriquecer automáticamente** las respuestas del usuario. La IA analiza la información proporcionada y genera descripciones detalladas, objetivos expandidos, decisiones arquitectónicas y mejores prácticas.

---

## ⚠️ Estado: BETA

Esta funcionalidad está en **BETA** y requiere:
- API keys configuradas (ve [Configuración](./CONFIGURATION.md))
- Se consumirán tokens del usuario
- Requiere conexión a internet

---

## 🚀 Comando Beta

### `setai init --beta`

Genera estructura con enriquecimiento automático vía IA.

**Sintaxis:**
```bash
setai init --beta
```

**Combinado con avanzado:**
```bash
setai init --advanced --beta
```

---

## 📋 Prerrequisitos

### 1. Configurar API Keys

Antes de usar el modo Beta, necesitas configurar al menos una API key:

```bash
setai config
```

**Opciones disponibles:**
- **OpenAI** (GPT-4, GPT-3.5)
- **Anthropic** (Claude 3.5)
- **Google** (Gemini 1.5)

**Ve:** [Configuración Completa](./CONFIGURATION.md)

---

## 🔄 Flujo con IA

```
1. Responder preguntas básicas (o avanzadas)
   ↓
2. CLI verifica API keys configuradas
   ↓
3. CLI envía respuestas a modelo de IA
   ↓
4. IA analiza y enriquece:
   - Descripciones detalladas
   - Objetivos expandidos
   - Decisiones arquitectónicas
   - Mejores prácticas
   ↓
5. CLI procesa respuesta de la IA
   ↓
6. CLI valida y sanitiza JSON
   ↓
7. CLI llena templates con contenido enriquecido
   ↓
8. Estructura generada con contenido avanzado ✅
```

---

## 🤖 Qué Hace la IA

### Análisis Automático

La IA recibe toda la información recolectada y genera:

1. **Descripción Enriquecida**
   - Expande la descripción original
   - Agrega contexto técnico y de negocio
   - La hace más profesional y detallada

2. **Importancia del Problema Expandida**
   - Explica mejor el impacto
   - Agrega urgencia y relevancia
   - Conecta con objetivos de negocio

3. **Objetivos de Negocio Expandidos**
   - Lista 5-7 objetivos específicos
   - Hace objetivos medibles
   - Basado en mejores prácticas

4. **Decisiones Arquitectónicas**
   - Sugiere 3-5 decisiones arquitectónicas
   - Basadas en la stack tecnológica
   - Alineadas con objetivos

5. **Mejores Prácticas**
   - Lista 3-5 prácticas específicas
   - Para el tipo de proyecto
   - Basadas en experiencia de la industria

6. **Directrices de Uso de IA**
   - Recomendaciones personalizadas
   - Para el proyecto específico
   - Considerando stack y objetivos

---

## 💰 Costo de Tokens

### Estimativa por Ejecución

**OpenAI (gpt-4o):**
- Input: ~500-1000 tokens
- Output: ~1000-2000 tokens
- Costo aproximado: $0.01 - $0.05 por ejecución

**Anthropic (claude-3-5-sonnet):**
- Input: ~500-1000 tokens
- Output: ~1000-2000 tokens
- Costo aproximado: $0.015 - $0.06 por ejecución

**Google (gemini-1.5-pro):**
- Input: ~500-1000 tokens
- Output: ~1000-2000 tokens
- Costo aproximado: $0.001 - $0.005 por ejecución

**Nota:** Los costos son estimativas y pueden variar. Consulta los precios oficiales de cada proveedor.

---

## 🔒 Seguridad y Privacidad

### Qué se Envía a la IA

- Nombre del proyecto
- Descripción del problema
- Importancia del problema
- Usuarios principales
- Objetivos de negocio
- Stack tecnológica
- Restricciones técnicas y de negocio
- No-objetivos

### Qué NO se Envía

- Código del proyecto
- Archivos del proyecto
- Información sensible
- Credenciales
- Datos de usuarios

### Almacenamiento

- API keys se almacenan localmente en `~/.setai/config.json`
- Ninguna información se envía a servidores de SetAI CLI
- Comunicación directa con APIs de los proveedores (OpenAI, Anthropic, Google)

---

## 🎯 Cuándo Usar Modo Beta

✅ **Usa cuando:**
- Quieres descripciones profesionales y detalladas
- Necesitas objetivos expandidos y medibles
- Quieres sugerencias de decisiones arquitectónicas
- Necesitas recomendaciones de mejores prácticas
- Quieres directrices personalizadas de uso de IA
- Tienes API keys configuradas
- Estás dispuesto a consumir tokens

❌ **No uses cuando:**
- No tienes API keys configuradas
- No quieres consumir tokens
- Prefieres escribir todo manualmente
- La estructura básica es suficiente
- Estás offline

---

## 🔗 Enlaces Relacionados

- [Configuración](./CONFIGURATION.md) - Cómo configurar API keys
- [Providers](./PROVIDERS.md) - Detalles sobre proveedores soportados
- [Uso Avanzado](./USAGE_ADVANCED.md) - Combinar con modo avanzado
- [Ejemplos](./EXAMPLES.md) - Ejemplos prácticos con IA
