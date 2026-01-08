# Documentation - SetAI CLI

Welcome to the complete documentation of **SetAI CLI**, a powerful tool for generating configuration structures for AI-assisted development.

## 🌐 Language

**🇺🇸 This documentation is in English**

**Current Version:** SetAI CLI supports multiple languages:
- ✅ **English (en)** - Fully supported
- ✅ **Portuguese (pt-BR)** - Fully supported (default)
- ✅ **Spanish (es)** - Fully supported

**🌐 Internationalization Features:**
- ✅ Language configuration for questions (via `--lang` or `setai config`)
- ✅ Language configuration for generated files
- ✅ Translated templates (with fallback to pt-BR)
- ✅ All messages and validations translated

**🇧🇷 Portuguese Documentation:** [Available here](../README.md)
**🇪🇸 Spanish Documentation:** [Available here](../es/README.md) (Coming Soon)

---

## 📚 Index

### 🚀 Quick Start
- [**Getting Started**](./GETTING_STARTED.md) - Installation and first steps
- [**Quick Start**](./GETTING_STARTED.md#quick-start) - Quick usage example

### 📖 Usage Guides
- [**Basic Usage**](./USAGE_BASIC.md) - Basic commands and essential features
- [**Advanced Usage**](./USAGE_ADVANCED.md) - Advanced configurations and customization
- [**Beta Mode (AI)**](./USAGE_BETA.md) - Integration with AI models

### ⚙️ Configuration
- [**CLI Configuration**](./CONFIGURATION.md) - API keys and settings management
- [**IDE Configuration**](./CONFIGURATION_IDES.md) - Multiple IDE support

### 🎯 Practical Examples
- [**Real Examples**](./EXAMPLES.md) - Use cases and practical examples
- [**Usage Scenarios**](./EXAMPLES.md#usage-scenarios) - Different project scenarios

### 🔧 Technical Reference
- [**Architecture**](./ARCHITECTURE.md) - Internal structure and CLI design
- [**AI Providers**](./PROVIDERS.md) - Details about supported AI providers
- [**Templates**](./TEMPLATES.md) - Template structure and customization

### 📝 Command Reference
- [**CLI Commands**](./COMMANDS.md) - Complete reference of all commands
- [**Options and Flags**](./COMMANDS.md#options-and-flags) - All available options

### ❓ FAQ and Troubleshooting
- [**FAQ**](./FAQ.md) - Frequently asked questions
- [**Troubleshooting**](./TROUBLESHOOTING.md) - Common problem solutions

---

## 🎯 What is SetAI CLI?

**SetAI CLI** is a command-line tool that automates the creation of configuration structures for AI-assisted development. It generates a complete and personalized structure based on user responses, applying development best practices.

### Main Features

✅ **Automatic Structure Generation**
- Creates complete AI configuration structure
- Supports multiple IDEs (Cursor, VS Code, JetBrains, etc.)
- Personalization based on interactive questions

✅ **Advanced Configuration**
- Modular configuration groups
- Iterative question flow
- Project-specific configurations

✅ **AI Integration (Beta)**
- Automatic response enrichment
- Support for multiple providers (OpenAI, Anthropic, Google)
- Automatic fallback between providers

✅ **API Key Management**
- Secure local storage
- Interactive configuration
- Support for multiple providers

✅ **Internationalization (i18n)**
- Support for English, Portuguese, and Spanish
- Language configuration for questions and files
- Automatically translated templates

---

## 🚀 Quick Start

```bash
# Installation
npm install -g @setai/cli

# Basic usage
setai init

# With advanced options
setai init --advanced

# With AI integration
setai init --beta

# With specific language
setai init --lang en
setai init --lang es

# Configure API keys and language
setai config
```

---

## 📋 Requirements

- **Node.js:** >= 18.0.0
- **npm/pnpm:** Recent version
- **Operating System:** Windows, macOS, Linux

---

## 🌐 Language Configuration

**Set Language for Questions and Files:**

You can configure the language for both interactive questions and generated files:

```bash
# Configure language via CLI
setai config
# Select "🌐 Configure language"

# Or use --lang flag
setai init --lang en
```

**Supported Languages:**
- English (en) - Fully supported
- Portuguese (pt-BR) - Default, fully supported
- Spanish (es) - Fully supported

---

## 📞 Support

- **GitHub Issues:** [Report issues](https://github.com/setai/cli/issues)
- **Documentation:** This complete documentation
- **Examples:** See [Practical Examples](./EXAMPLES.md)

---

## 📄 License

MIT License - See LICENSE file for details.

---

**Last updated:** 2025-01-07

