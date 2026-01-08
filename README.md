# SetAI CLI

<div align="center">

**🚀 CLI Tool para gerar automaticamente estruturas de configuração para desenvolvimento assistido por IA**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)

[English](#english) | [Português](#português)

</div>

---

## Português

### 📖 Sobre

**SetAI CLI** é uma ferramenta de linha de comando que automatiza a criação de estruturas de configuração para desenvolvimento assistido por IA. Gera uma estrutura completa e personalizada baseada nas respostas do usuário, aplicando melhores práticas de desenvolvimento.

### ✨ Funcionalidades

- ✅ **Geração Automática de Estrutura** - Cria estrutura completa de configuração para IA
- ✅ **Suporte a Múltiplas IDEs** - Cursor, VS Code, JetBrains, e outras
- ✅ **Configuração Avançada** - Grupos modulares de configuração avançada
- ✅ **Integração com IA (Beta)** - Enriquecimento automático de respostas via OpenAI, Anthropic, Google
- ✅ **Internacionalização** - Suporte a Português, Inglês e Espanhol
- ✅ **Gerenciamento de API Keys** - Armazenamento seguro local

### 🚀 Instalação

```bash
npm install -g @setai/cli
```

Ou use com `npx`:

```bash
npx @setai/cli init
```

### 📖 Uso Rápido

```bash
# Uso básico
setai init

# Com opções avançadas
setai init --advanced

# Com integração de IA (Beta)
setai init --beta

# Com idioma específico
setai init --lang en
setai init --lang es

# Configurar API keys e idioma
setai config
```

### 🎯 Exemplo

```bash
$ setai init
🚀 Iniciando geração da estrutura .cursor...

? Qual IDE você está usando? Cursor
? Qual o nome do projeto? my-awesome-project
? Qual a linguagem principal do projeto? TypeScript
? Qual framework você está usando? Next.js

✅ Informações coletadas
📝 Processando templates...
📁 Gerando arquivos...

✅ Estrutura .cursor criada com sucesso!
```

### 📚 Documentação

- 📖 [Documentação Completa](./docs/Documentation/README.md)
- 🚀 [Getting Started](./docs/Documentation/GETTING_STARTED.md)
- ⚙️ [Configuração](./docs/Documentation/CONFIGURATION.md)
- 🤖 [Modo Beta (IA)](./docs/Documentation/USAGE_BETA.md)
- 🌐 [Internacionalização](./docs/Documentation/en/README.md)

### 🛠️ Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Executar testes
pnpm test

# Executar testes com cobertura
pnpm test:coverage

# Build
pnpm build

# Lint
pnpm lint
```

### 📋 Requisitos

- Node.js >= 18.0.0
- npm, pnpm ou yarn

### 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## English

### 📖 About

**SetAI CLI** is a command-line tool that automates the creation of configuration structures for AI-assisted development. It generates a complete and personalized structure based on user responses, applying development best practices.

### ✨ Features

- ✅ **Automatic Structure Generation** - Creates complete AI configuration structure
- ✅ **Multiple IDE Support** - Cursor, VS Code, JetBrains, and others
- ✅ **Advanced Configuration** - Modular advanced configuration groups
- ✅ **AI Integration (Beta)** - Automatic response enrichment via OpenAI, Anthropic, Google
- ✅ **Internationalization** - Support for Portuguese, English, and Spanish
- ✅ **API Key Management** - Secure local storage

### 🚀 Installation

```bash
npm install -g @setai/cli
```

Or use with `npx`:

```bash
npx @setai/cli init
```

### 📖 Quick Usage

```bash
# Basic usage
setai init

# With advanced options
setai init --advanced

# With AI integration (Beta)
setai init --beta

# With specific language
setai init --lang en
setai init --lang es

# Configure API keys and language
setai config
```

### 🎯 Example

```bash
$ setai init
🚀 Starting .cursor structure generation...

? Which IDE are you using? Cursor
? What is the project name? my-awesome-project
? What is the main language? TypeScript
? Which framework are you using? Next.js

✅ Information collected
📝 Processing templates...
📁 Generating files...

✅ .cursor structure created successfully!
```

### 📚 Documentation

- 📖 [Complete Documentation](./docs/Documentation/en/README.md)
- 🚀 [Getting Started](./docs/Documentation/en/GETTING_STARTED.md)
- ⚙️ [Configuration](./docs/Documentation/en/CONFIGURATION.md)
- 🤖 [Beta Mode (AI)](./docs/Documentation/en/USAGE_BETA.md)

### 🛠️ Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Build
pnpm build

# Lint
pnpm lint
```

### 📋 Requirements

- Node.js >= 18.0.0
- npm, pnpm or yarn

### 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Feito com ❤️ para a comunidade de desenvolvedores**

[Report Bug](https://github.com/vitorvls/setai-cli/issues) · [Request Feature](https://github.com/vitorvls/setai-cli/issues) · [Documentation](./docs/Documentation/README.md)

</div>
