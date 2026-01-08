# Troubleshooting - SetAI CLI

Solución de problemas comunes.

## 🔧 Problemas de Instalación

### "Comando no encontrado"

**Síntoma:**
```bash
$ setai init
bash: setai: command not found
```

**Soluciones:**
1. Verifica instalación:
   ```bash
   npm list -g @setai/cli
   ```

2. Reinstala:
   ```bash
   npm install -g @setai/cli
   ```

3. Verifica PATH:
   ```bash
   echo $PATH  # Linux/macOS
   echo %PATH% # Windows
   ```

---

### "Permiso denegado"

**Síntoma:**
```bash
EACCES: permission denied
```

**Soluciones:**

**Linux/macOS:**
```bash
sudo npm install -g @setai/cli
```

**Windows:**
- Ejecuta PowerShell como Administrador
- O usa `npx @setai/cli init`

---

## 🚀 Problemas de Ejecución

### "Estructura ya existe"

**Síntoma:**
```
⚠️  La estructura .cursor/ ya existe en este directorio.
```

**Soluciones:**
1. Responde `Yes` para sobrescribir
2. O remueve manualmente:
   ```bash
   rm -rf .cursor/
   ```

---

### "Preguntas no aparecen"

**Síntoma:**
CLI se detiene sin hacer preguntas.

**Soluciones:**
1. Verifica si estás en directorio correcto
2. Ejecuta en terminal interactivo (no script)
3. Verifica permisos de escritura

---

## 🔑 Problemas con API Keys

### "Ninguna API key configurada"

**Síntoma:**
```
Ninguna API key configurada. Ejecuta "setai config" para configurar.
```

**Solución:**
```bash
setai config
# Configura al menos una API key
```

---

### "API Key inválida"

**Síntoma:**
```
API Key inválida. Ejecuta "setai config" para configurar nuevamente.
```

**Soluciones:**
1. Verifica si la key está correcta
2. Remueve y agrega nuevamente:
   ```bash
   setai config
   # Remueve la key antigua
   # Agrega una nueva key válida
   ```

---

### "Límite de solicitudes excedido"

**Síntoma:**
```
Límite de solicitudes excedido. Intenta nuevamente en unos momentos.
```

**Soluciones:**
1. Espera unos minutos
2. Verifica tu plan en la plataforma
3. El CLI hace retry automático (hasta 3 intentos)

---

### "Cuota de API agotada"

**Síntoma:**
```
Cuota de API agotada. Verifica tu plan.
```

**Soluciones:**
1. Verifica créditos en la plataforma
2. Configura otro proveedor como respaldo
3. El CLI intentará otros proveedores automáticamente

---

## 📁 Problemas con Archivos

### "Error al crear directorio"

**Síntoma:**
```
Error: EACCES: permission denied, mkdir '.cursor'
```

**Soluciones:**
1. Verifica permisos del directorio:
   ```bash
   ls -la .  # Linux/macOS
   ```

2. Da permisos de escritura:
   ```bash
   chmod u+w .  # Linux/macOS
   ```

---

### "Error al escribir archivo"

**Síntoma:**
```
Error: EACCES: permission denied, open '.cursor/README.md'
```

**Soluciones:**
1. Verifica permisos
2. Ejecuta como administrador si es necesario
3. Verifica espacio en disco

---

## 🤖 Problemas con IA (Beta)

### "Error al procesar respuesta de la IA"

**Síntoma:**
```
Error al procesar respuesta de la IA: ...
```

**Soluciones:**
1. El CLI continúa sin enriquecimiento
2. Estructura básica aún es generada
3. Verifica logs para más detalles
4. Intenta nuevamente

---

### "Timeout en la solicitud"

**Síntoma:**
```
Timeout en la solicitud para API
```

**Soluciones:**
1. Verifica conexión a internet
2. El CLI hace retry automático
3. Espera e intenta nuevamente

---

## 🔄 Problemas Generales

### "Error inesperado"

**Síntoma:**
```
Error: Unexpected error
```

**Soluciones:**
1. Verifica versión de Node.js:
   ```bash
   node --version  # Debe ser >= 18.0.0
   ```

2. Actualiza el CLI:
   ```bash
   npm update -g @setai/cli
   ```

3. Limpia caché:
   ```bash
   npm cache clean --force
   ```

---

### "Build falla"

**Síntoma:**
```
Error during build
```

**Soluciones:**
1. Verifica dependencias:
   ```bash
   npm install
   ```

2. Limpia y reconstruye:
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

---

## 📞 Obtener Ayuda

### Logs Detallados

Ejecuta con debug:
```bash
DEBUG=* setai init
```

### Reportar Problema

1. Verifica versión:
   ```bash
   setai --version
   ```

2. Recopila información:
   - Versión de Node.js
   - Sistema operativo
   - Mensaje de error completo
   - Pasos para reproducir

3. Abre issue en GitHub

---

## 🔗 Enlaces

- [FAQ](./FAQ.md)
- [Getting Started](./GETTING_STARTED.md)
- [Configuración](./CONFIGURATION.md)
