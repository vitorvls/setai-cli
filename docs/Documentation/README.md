# Documentação Completa - SetAI CLI

Bem-vindo à documentação completa do **SetAI CLI**, uma ferramenta poderosa para gerar estruturas de configuração para desenvolvimento assistido por IA.

## 🌐 Idioma / Language

**🇧🇷 Esta documentação está em Português (pt-BR)**

**Versão Atual:** O SetAI CLI suporta múltiplos idiomas:
- ✅ **Português (pt-BR)** - Idioma padrão, totalmente suportado
- ✅ **Inglês (en)** - Totalmente suportado
- ✅ **Espanhol (es)** - Totalmente suportado

**🌐 Funcionalidades de Internacionalização:**
- ✅ Configuração de idioma das perguntas (via `--lang` ou `setai config`)
- ✅ Configuração de idioma dos arquivos gerados
- ✅ Templates traduzidos (com fallback para pt-BR)
- ✅ Todas as mensagens e validações traduzidas

**🇺🇸 English Documentation:** [Available here](./en/README.md)
**🇪🇸 Documentación en Español:** [Disponible aquí](./es/README.md)
**🇪🇸 Documentación en Español:** [Disponible aquí](./es/README.md) (Em breve)

## 📚 Índice

### 🚀 Início Rápido
- [**Getting Started**](./GETTING_STARTED.md) - Guia de instalação e primeiros passos
- [**Quick Start**](./GETTING_STARTED.md#quick-start) - Exemplo rápido de uso

### 📖 Guias de Uso
- [**Uso Básico**](./USAGE_BASIC.md) - Comandos básicos e funcionalidades essenciais
- [**Uso Avançado**](./USAGE_ADVANCED.md) - Configurações avançadas e personalização
- [**Modo Beta (IA)**](./USAGE_BETA.md) - Integração com modelos de IA

### ⚙️ Configuração
- [**Configuração do CLI**](./CONFIGURATION.md) - Gerenciamento de API keys e configurações
- [**Configuração de IDEs**](./CONFIGURATION_IDES.md) - Suporte a múltiplas IDEs

### 🎯 Exemplos Práticos
- [**Exemplos Reais**](./EXAMPLES.md) - Casos de uso e exemplos práticos
- [**Cenários de Uso**](./EXAMPLES.md#cenarios-de-uso) - Diferentes cenários de projeto

### 🔧 Referência Técnica
- [**Arquitetura**](./ARCHITECTURE.md) - Estrutura interna e design do CLI
- [**Providers de IA**](./PROVIDERS.md) - Detalhes sobre provedores de IA suportados
- [**Templates**](./TEMPLATES.md) - Estrutura de templates e personalização

### 📝 Referência de Comandos
- [**Comandos CLI**](./COMMANDS.md) - Referência completa de todos os comandos
- [**Opções e Flags**](./COMMANDS.md#opcoes-e-flags) - Todas as opções disponíveis

### ❓ FAQ e Troubleshooting
- [**FAQ**](./FAQ.md) - Perguntas frequentes
- [**Troubleshooting**](./TROUBLESHOOTING.md) - Solução de problemas comuns

---

## 🎯 O que é o SetAI CLI?

O **SetAI CLI** é uma ferramenta de linha de comando que automatiza a criação de estruturas de configuração para desenvolvimento assistido por IA. Ele gera uma estrutura completa e personalizada baseada nas respostas do usuário, aplicando melhores práticas de desenvolvimento.

### Principais Funcionalidades

✅ **Geração Automática de Estrutura**
- Cria estrutura completa de configuração para IA
- Suporta múltiplas IDEs (Cursor, VS Code, JetBrains, etc.)
- Personalização baseada em perguntas interativas

✅ **Configuração Avançada**
- Grupos modulares de configuração
- Fluxo iterativo de perguntas
- Configurações específicas por projeto

✅ **Integração com IA (Beta)**
- Enriquecimento automático de respostas
- Suporte a múltiplos provedores (OpenAI, Anthropic, Google)
- Fallback automático entre provedores

✅ **Gerenciamento de API Keys**
- Armazenamento seguro local
- Configuração interativa
- Suporte a múltiplos provedores

✅ **Internacionalização (i18n)**
- Suporte a Português, Inglês e Espanhol
- Configuração de idioma para perguntas e arquivos
- Templates traduzidos automaticamente

---

## 🚀 Quick Start

```bash
# Instalação
npm install -g @setai/cli

# Uso básico
setai init

# Com opções avançadas
setai init --advanced

# Com integração de IA
setai init --beta

# Com idioma específico
setai init --lang en
setai init --lang es

# Configurar API keys e idioma
setai config
```

---

## 📋 Requisitos

- **Node.js:** >= 18.0.0
- **npm/pnpm:** Versão recente
- **Sistema Operacional:** Windows, macOS, Linux

---

## 📞 Suporte

- **GitHub Issues:** [Reportar problemas](https://github.com/setai/cli/issues)
- **Documentação:** Esta documentação completa
- **Exemplos:** Veja [Exemplos Práticos](./EXAMPLES.md)

---

## 📄 Licença

MIT License - Veja o arquivo LICENSE para mais detalhes.

---

**Última atualização:** 2025-01-07

