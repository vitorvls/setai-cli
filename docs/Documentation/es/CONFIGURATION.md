# Configuración - SetAI CLI

Guía completa sobre configuración de SetAI CLI, incluyendo gestión de API keys.

## 📋 Visión General

SetAI CLI almacena configuraciones localmente en `~/.setai/config.json`. Esta carpeta no se commitea en Git y contiene información sensible como API keys.

---

## 🔧 Comando de Configuración

### `setai config`

Abre menú interactivo para gestionar configuraciones.

**Sintaxis:**
```bash
setai config
```

**Menú:**
```
🔧 Configuración de SetAI CLI

Archivo de configuración: ~/.setai/config.json

? ¿Qué deseas hacer?
  ❯ ➕ Agregar/Actualizar API Key
    ➖ Remover API Key
    📋 Listar API Keys configuradas
    🌐 Configurar idioma
    ❌ Salir
```

---

## 🔑 Gestión de API Keys

### Agregar/Actualizar API Key

#### 1. Seleccionar Proveedor

```
? ¿Qué proveedor de IA?
  ❯ OpenAI (GPT-4, GPT-3.5, etc.)
    Anthropic (Claude)
    Google (Gemini)
```

#### 2. Insertar API Key

```
? Ingresa tu API Key:
> [input oculto]
```

**Seguridad:**
- Input está oculto (tipo `password`)
- No aparece en terminal
- Almacenado de forma segura

#### 3. Seleccionar Modelo Predeterminado

**OpenAI:**
```
? ¿Qué modelo usar por defecto?
  ❯ gpt-4o (Recomendado - Más capaz)
    gpt-4o-mini (Rápido y económico)
    gpt-4-turbo
    gpt-4
    gpt-3.5-turbo (Más barato)
```

**Anthropic:**
```
? ¿Qué modelo usar por defecto?
  ❯ claude-3-5-sonnet-20241022 (Recomendado)
    claude-3-5-haiku-20241022 (Rápido)
    claude-3-opus-20240229
```

**Google:**
```
? ¿Qué modelo usar por defecto?
  ❯ gemini-1.5-pro (Recomendado)
    gemini-1.5-flash (Rápido)
    gemini-pro
```

---

### Remover API Key

#### 1. Seleccionar API Key para Remover

```
? ¿Qué API Key deseas remover?
  ❯ OpenAI
    Anthropic
    Google
```

**Nota:** Solo API keys configuradas aparecen en la lista.

#### 2. Confirmar Remoción

```
? ¿Estás seguro de que deseas remover esta API Key?
  ❯ Yes
     No
```

---

### Listar API Keys Configuradas

```
📋 API Keys configuradas:

  ✅ OpenAI: Configurada
  ⚪ Anthropic: No configurada
  ⚪ Google: No configurada
```

**Nota:** Los valores de las API keys nunca se muestran, solo el estado (configurada o no).

---

## 📁 Estructura del Archivo de Configuración

### Ubicación

```
~/.setai/config.json
```

**Windows:**
```
C:\Users\<usuario>\.setai\config.json
```

**macOS/Linux:**
```
~/.setai/config.json
```

### Formato

```json
{
  "ai": {
    "openai": {
      "apiKey": "sk-...",
      "defaultModel": "gpt-4o"
    },
    "anthropic": {
      "apiKey": "sk-ant-...",
      "defaultModel": "claude-3-5-sonnet-20241022"
    },
    "google": {
      "apiKey": "...",
      "defaultModel": "gemini-1.5-pro"
    }
  },
  "language": {
    "questions": "es",
    "files": "es"
  }
}
```

---

## 🔒 Seguridad

### Almacenamiento

- ✅ Archivo local únicamente (no enviado a servidores)
- ✅ Permisos restringidos (solo usuario puede leer)
- ✅ No commiteado en Git (`.gitignore`)
- ✅ Input oculto en terminal

### Buenas Prácticas

1. **No compartas tu API key**
   - Mantén el archivo `~/.setai/config.json` privado
   - No commitees en Git
   - No compartas en mensajes o emails

2. **Revisa permisos del archivo**
   ```bash
   # Linux/macOS
   chmod 600 ~/.setai/config.json
   ```

3. **Rota API keys regularmente**
   - Remueve keys antiguas
   - Agrega nuevas keys
   - Monitorea uso en la plataforma del proveedor

---

## 🔄 Cómo Obtener API Keys

### OpenAI

1. Visita: https://platform.openai.com/api-keys
2. Inicia sesión o crea una cuenta
3. Haz clic en "Create new secret key"
4. Copia la key (solo aparece una vez)
5. Configura en CLI: `setai config`

**Modelos disponibles:**
- `gpt-4o` - Más capaz, recomendado
- `gpt-4o-mini` - Rápido y económico
- `gpt-4-turbo` - Versión turbo de GPT-4
- `gpt-4` - GPT-4 estándar
- `gpt-3.5-turbo` - Más barato

### Anthropic

1. Visita: https://console.anthropic.com/
2. Inicia sesión o crea una cuenta
3. Ve a "API Keys"
4. Haz clic en "Create Key"
5. Copia la key
6. Configura en CLI: `setai config`

**Modelos disponibles:**
- `claude-3-5-sonnet-20241022` - Más capaz, recomendado
- `claude-3-5-haiku-20241022` - Rápido
- `claude-3-opus-20240229` - Opus (más antiguo)

### Google (Gemini)

1. Visita: https://aistudio.google.com/app/apikey
2. Inicia sesión con tu cuenta Google
3. Haz clic en "Create API Key"
4. Copia la key
5. Configura en CLI: `setai config`

**Modelos disponibles:**
- `gemini-1.5-pro` - Más capaz, recomendado
- `gemini-1.5-flash` - Rápido
- `gemini-pro` - Versión anterior

---

## 🌐 Configuración de Idioma

### Configurar Idioma de Preguntas y Archivos

SetAI CLI soporta múltiples idiomas para preguntas y archivos generados.

#### 1. Acceder al Menú de Idioma

```bash
setai config
# Elige "🌐 Configurar idioma"
```

#### 2. Seleccionar Idioma de Preguntas

```
? Selecciona el idioma de las preguntas:
  ❯ Português (Brasil)
    English
    Español
```

#### 3. Seleccionar Idioma de Archivos Generados

```
? Selecciona el idioma de los archivos generados:
  ❯ Português (Brasil)
    English
    Español
```

**Nota:** Puedes elegir idiomas diferentes para preguntas y archivos. Por ejemplo, preguntas en inglés y archivos en español.

### Idiomas Soportados

- **Português (pt-BR)** - Idioma predeterminado, totalmente soportado
- **English (en)** - Totalmente soportado
- **Español (es)** - Totalmente soportado

### Configuración vía Flag

También puedes definir el idioma directamente en el comando `init`:

```bash
# Preguntas y archivos en español
setai init --lang es

# Preguntas y archivos en inglés
setai init --lang en

# Preguntas y archivos en portugués (predeterminado)
setai init --lang pt-BR
```

---

## 🔗 Enlaces Relacionados

- [Modo Beta](./USAGE_BETA.md) - Cómo usar con IA
- [Providers](./PROVIDERS.md) - Detalles sobre proveedores
- [Troubleshooting](./TROUBLESHOOTING.md) - Solución de problemas
- [Getting Started](./GETTING_STARTED.md) - Guía de inicio
