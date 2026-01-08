# SetAI CLI - Documentación para Desarrolladores

¡Bienvenido a la documentación técnica de SetAI CLI! Esta sección está dirigida a desarrolladores que trabajan en el proyecto, incluyendo mantenimiento, soporte y onboarding de nuevos miembros del equipo.

## 📚 Índice

1. [Estructura del Proyecto](./ESTRUCTURA_PROYECTO) - Visión general de todas las carpetas y archivos
2. [Archivos Principales](./ARCHIVOS_PRINCIPALES) - Descripción detallada de los archivos principales
3. [Arquitectura](./ARQUITECTURA) - Arquitectura del sistema y patrones de diseño
4. [Guía de Desarrollo](./DESARROLLO) - Cómo desarrollar y contribuir
5. [Guía de Pruebas](./PRUEBAS) - Estrategia de pruebas y cómo escribir pruebas
6. [Contribuyendo](./CONTRIBUYENDO) - Guía para contribuidores
7. [Flujo de Datos](./FLUJO_DATOS) - Cómo fluyen los datos por el sistema
8. [Internacionalización](./INTERNACIONALIZACION) - Sistema de i18n y cómo agregar idiomas

## 🎯 Propósito de esta Documentación

Esta documentación fue creada para:

- **Nuevos Desarrolladores**: Entender rápidamente la estructura y comenzar a contribuir
- **Mantenimiento**: Facilitar la identificación de dónde hacer cambios
- **Soporte**: Entender el funcionamiento interno para resolver problemas
- **Arquitectura**: Comprender las decisiones de diseño y patrones utilizados

## 🏗️ Visión General del Proyecto

SetAI CLI es una herramienta de línea de comandos que genera automáticamente estructuras de configuración para IDEs con soporte a IA (principalmente Cursor). El proyecto está construido con:

- **TypeScript** - Lenguaje principal
- **Node.js 18+** - Runtime
- **Commander.js** - Framework CLI
- **Inquirer.js** - Prompts interactivos
- **Vitest** - Framework de pruebas
- **tsup** - Herramienta de build

## 📦 Estructura Rápida

```
setai/
├── src/              # Código fuente TypeScript
├── dist/            # Build compilado (generado)
├── templates/       # Plantillas para generación de archivos
├── locales/         # Traducciones (i18n)
├── docs/            # Documentación
└── scripts/         # Scripts auxiliares
```

## 🚀 Inicio Rápido para Desarrolladores

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd setai
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   pnpm dev
   ```

4. **Ejecutar pruebas**
   ```bash
   pnpm test
   ```

5. **Build para producción**
   ```bash
   pnpm build
   ```

## 📖 Próximos Pasos

- Lee [Estructura del Proyecto](./ESTRUCTURA_PROYECTO) para entender la organización
- Ve [Archivos Principales](./ARCHIVOS_PRINCIPALES) para conocer los archivos principales
- Consulta [Arquitectura](./ARQUITECTURA) para entender el diseño del sistema
- Sigue [Guía de Desarrollo](./DESARROLLO) para comenzar a desarrollar

## 🔗 Enlaces Útiles

- [Documentación del Usuario](/Documentation/es/README) - Documentación para usuarios finales
- [README Principal](/README) - README del proyecto

## ❓ ¿Preguntas?

Si tienes preguntas sobre el código o la arquitectura:

1. Consulta la documentación relevante en esta carpeta
2. Verifica los comentarios en el código (código en inglés, comentarios en portugués)
3. Ve los tests para ejemplos de uso
4. Abre un issue en el repositorio

---

**Última actualización**: 2024
