# Command Reference - SetAI CLI

Complete reference of all available commands and options.

## 📋 Available Commands

### `setai init`

Generates configuration structure for AI-assisted development.

**Syntax:**
```bash
setai init [options]
```

**Options:**
- `--advanced` - Includes optional advanced questions
- `--beta` - Enables AI integration
- `--lang <locale>` - Sets language for questions and files (pt-BR, en, es)

**Examples:**
```bash
setai init
setai init --advanced
setai init --beta
setai init --advanced --beta
setai init --lang en
setai init --lang es
setai init --advanced --lang en
```

**What it does:**
1. Asks which IDE you're using
2. Collects project information
3. (Optional) Advanced questions
4. (Optional) Enriches with AI
5. Generates structure in appropriate folder

---

### `setai config`

Manages CLI configurations, including API keys.

**Syntax:**
```bash
setai config
```

**Interactive menu:**
- ➕ Add/Update API Key
- ➖ Remove API Key
- 📋 List configured API Keys
- 🌐 Configure language
- ❌ Exit

**What it does:**
- Manages API keys for OpenAI, Anthropic, and Google
- Allows selecting default model per provider
- Configures language for questions and generated files
- Stores configurations in `~/.setai/config.json`

---

### `setai --help`

Displays help and usage examples.

**Syntax:**
```bash
setai --help
setai init --help
setai config --help
```

---

### `setai --version`

Displays CLI version.

**Syntax:**
```bash
setai --version
```

---

## 🔧 Detailed Options

### `--lang <locale>`

**Command:** `setai init --lang <locale>`

**Accepted values:**
- `pt-BR` - Portuguese (Brazil) - Default
- `en` - English
- `es` - Spanish

**What it does:**
- Sets interactive question language
- Sets generated files language
- Saves preference in `~/.setai/config.json`

**Examples:**
```bash
# English
setai init --lang en

# Spanish
setai init --lang es

# Portuguese (default)
setai init --lang pt-BR
```

**Note:** You can also configure different languages for questions and files using `setai config`.

---

### `--advanced`

**Command:** `setai init --advanced`

**What it does:**
- Enables optional advanced questions
- Allows configuring modular groups:
  - AI Usage Rules
  - Responsibilities
  - Libraries
  - Detailed Architecture
  - Security
  - Testing
  - Deploy
  - Documentation

**When to use:**
- You need to customize specific rules
- You want to configure custom libraries
- You need to document architectural decisions

**See:** [Advanced Usage](./USAGE_ADVANCED.md)

---

### `--beta`

**Command:** `setai init --beta`

**What it does:**
- Enables integration with AI models
- Automatically enriches responses
- Generates professional descriptions
- Expands objectives and decisions

**Prerequisites:**
- At least one API key configured
- Run `setai config` first

**When to use:**
- You want professional descriptions
- You need expanded objectives
- You want architectural suggestions

**See:** [Beta Mode](./USAGE_BETA.md)

---

## 🔄 Combinations

### Basic
```bash
setai init
```
- Basic questions only
- Essential structure

### Advanced
```bash
setai init --advanced
```
- Basic + advanced questions
- Complete customized structure

### Beta
```bash
setai init --beta
```
- Basic questions
- AI enrichment

### Complete
```bash
setai init --advanced --beta
```
- Basic + advanced questions
- AI enrichment
- Maximum customization

### With Specific Language
```bash
setai init --lang en
setai init --advanced --lang es
setai init --beta --lang en
```
- Sets language for questions and files
- Can be combined with other options

---

## 📚 Related Links

- [Getting Started](./GETTING_STARTED.md)
- [Basic Usage](./USAGE_BASIC.md)
- [Advanced Usage](./USAGE_ADVANCED.md)
- [Beta Mode](./USAGE_BETA.md)
- [Configuration](./CONFIGURATION.md)
