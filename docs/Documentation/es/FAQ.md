# FAQ - SetAI CLI

Preguntas frecuentes sobre SetAI CLI.

## 📋 General

### ¿Qué es SetAI CLI?

CLI Tool que genera automáticamente estructuras de configuración para desarrollo asistido por IA, aplicando mejores prácticas.

### ¿Para qué sirve?

Facilita la configuración inicial de proyectos que usan IA para desarrollo, generando estructura completa con reglas, contexto y configuraciones.

### ¿Es gratuito?

Sí, el CLI es open source y gratuito. El modo Beta consume tokens de los proveedores de IA (OpenAI, Anthropic, Google), que tienen sus propios costos.

---

## 🚀 Instalación

### ¿Cómo instalar?

```bash
npm install -g @setai/cli
```

### ¿Requisitos?

- Node.js >= 18.0.0
- npm, pnpm o yarn

### ¿Cómo verificar instalación?

```bash
setai --version
```

---

## 💻 Uso

### ¿Cómo usar por primera vez?

```bash
setai init
```

### ¿Puedo saltar preguntas?

No, preguntas básicas son obligatorias. En modo avanzado, puedes elegir qué grupos responder.

### ¿Puedo editar después?

¡Sí! Todos los archivos generados son editables.

### ¿Y si me equivoco en una respuesta?

Ejecuta `setai init` nuevamente. Se preguntará si deseas sobrescribir.

---

## 🔧 Configuración

### ¿Dónde se almacenan las API keys?

En `~/.setai/config.json` (local, no commiteado en Git).

### ¿Es seguro?

Sí, siempre que:
- Permisos correctos del archivo
- No commiteado en Git
- Mantenido localmente

### ¿Puedo usar variables de entorno?

Actualmente, solo archivo de configuración es soportado.

---

## 🤖 Modo Beta

### ¿Qué es el modo Beta?

Integración con modelos de IA para enriquecer automáticamente las respuestas.

### ¿Cuánto cuesta?

Depende del proveedor y modelo. Estimativa: $0.01 - $0.05 por ejecución.

### ¿Es obligatorio?

No, es opcional. Puedes usar el CLI sin el modo Beta.

### ¿Qué proveedores son soportados?

- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude 3.5)
- Google (Gemini 1.5)

---

## 📁 Estructura

### ¿Dónde se genera la estructura?

Depende de la IDE:
- Cursor → `.cursor/`
- VS Code → `.vscode/`
- JetBrains → `.idea/`
- Otra → `.ai/` o personalizada

### ¿Puedo tener múltiples estructuras?

Sí, puedes tener `.cursor/` y `.vscode/` en el mismo proyecto.

### ¿La estructura debe ser commiteada?

Sí, la estructura debe ser commiteada en Git para que todo el equipo tenga acceso.

---

## ❓ Problemas

### "Comando no encontrado"

Verifica si fue instalado globalmente:
```bash
npm list -g @setai/cli
```

### "Permiso denegado"

Usa `sudo` (Linux/macOS) o ejecuta como administrador (Windows).

### "Estructura ya existe"

El CLI pregunta si deseas sobrescribir. Responde `Yes` si quieres reemplazar.

### "API Key inválida"

Ejecuta `setai config` y configura una nueva API key válida.

---

## 🔗 Enlaces

- [Getting Started](./GETTING_STARTED.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
- [Configuración](./CONFIGURATION.md)
