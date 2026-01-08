# Providers de IA - SetAI CLI

Detalles sobre los proveedores de IA soportados.

## 🤖 Proveedores Disponibles

### OpenAI

**Modelos soportados:**
- `gpt-4o` - Más capaz, recomendado
- `gpt-4o-mini` - Rápido y económico
- `gpt-4-turbo` - Versión turbo
- `gpt-4` - GPT-4 estándar
- `gpt-3.5-turbo` - Más barato

**SDK:** `openai` (oficial)

**Características:**
- Soporte a JSON mode
- Rate limiting robusto
- Retry automático

**Configuración:**
```bash
setai config
# Elige OpenAI
# Ingresa API key
# Selecciona modelo
```

---

### Anthropic (Claude)

**Modelos soportados:**
- `claude-3-5-sonnet-20241022` - Más capaz, recomendado
- `claude-3-5-haiku-20241022` - Rápido
- `claude-3-opus-20240229` - Opus

**SDK:** `@anthropic-ai/sdk` (oficial)

**Características:**
- Respuestas estructuradas
- System instructions
- Rate limiting

**Configuración:**
```bash
setai config
# Elige Anthropic
# Ingresa API key
# Selecciona modelo
```

---

### Google (Gemini)

**Modelos soportados:**
- `gemini-1.5-pro` - Más capaz, recomendado
- `gemini-1.5-flash` - Rápido
- `gemini-pro` - Versión anterior

**SDK:** `@google/generative-ai` (oficial)

**Características:**
- JSON mode nativo
- System instructions
- Rate limiting

**Configuración:**
```bash
setai config
# Elige Google
# Ingresa API key
# Selecciona modelo
```

---

## 🔄 Priorización y Fallback

### Orden de Prioridad

1. **OpenAI** (si configurado)
2. **Anthropic** (si OpenAI falla o no está configurado)
3. **Google** (si anteriores fallan)

### Fallback Automático

Si un proveedor falla, el CLI intenta el siguiente automáticamente:

```
Intentando OpenAI...
⚠️  Error al usar OpenAI, intentando otros proveedores...
   Usando Anthropic (Claude)...
✅ Respuestas enriquecidas con IA!
```

---

## ⚙️ Configuración

### Agregar Provider

```bash
setai config
# Elige "➕ Agregar/Actualizar API Key"
# Selecciona el proveedor
# Ingresa la API key
# Elige el modelo predeterminado
```

### Remover Provider

```bash
setai config
# Elige "➖ Remover API Key"
# Selecciona el proveedor
# Confirma remoción
```

---

## 💰 Costos Estimados

### OpenAI

- `gpt-4o`: ~$0.01 - $0.05 por ejecución
- `gpt-4o-mini`: ~$0.005 - $0.02 por ejecución

### Anthropic

- `claude-3-5-sonnet`: ~$0.015 - $0.06 por ejecución
- `claude-3-5-haiku`: ~$0.001 - $0.005 por ejecución

### Google

- `gemini-1.5-pro`: ~$0.001 - $0.005 por ejecución
- `gemini-1.5-flash`: ~$0.0005 - $0.002 por ejecución

**Nota:** Los costos son estimativas. Consulta precios oficiales.

---

## 🔒 Seguridad

### Almacenamiento

- API keys almacenadas localmente
- Archivo `~/.setai/config.json`
- Permisos restringidos
- No commiteado en Git

### Comunicación

- HTTPS únicamente
- Sin datos sensibles enviados
- Comunicación directa con APIs

---

## 🔗 Enlaces

- [Configuración](./CONFIGURATION.md) - Cómo configurar
- [Modo Beta](./USAGE_BETA.md) - Cómo usar
- [Troubleshooting](./TROUBLESHOOTING.md) - Problemas comunes
