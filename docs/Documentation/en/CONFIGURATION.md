# Configuration - SetAI CLI

Complete guide on SetAI CLI configuration, including API key management.

## 📋 Overview

SetAI CLI stores configurations locally in `~/.setai/config.json`. This folder is not committed to Git and contains sensitive information such as API keys.

---

## 🔧 Configuration Command

### `setai config`

Opens interactive menu to manage configurations.

**Syntax:**
```bash
setai config
```

**Menu:**
```
🔧 SetAI CLI Configuration

Configuration file: ~/.setai/config.json

? What do you want to do?
  ❯ ➕ Add/Update API Key
    ➖ Remove API Key
    📋 List configured API Keys
    🌐 Configure language
    ❌ Exit
```

---

## 🔑 API Key Management

### Add/Update API Key

#### 1. Select Provider

```
? Which AI provider?
  ❯ OpenAI (GPT-4, GPT-3.5, etc.)
    Anthropic (Claude)
    Google (Gemini)
```

#### 2. Enter API Key

```
? Enter your API Key:
> [hidden input]
```

**Security:**
- Input is hidden (type `password`)
- Doesn't appear in terminal
- Stored securely

#### 3. Select Default Model

**OpenAI:**
```
? Which model to use by default?
  ❯ gpt-4o (Recommended - Most capable)
    gpt-4o-mini (Fast and economical)
    gpt-4-turbo
    gpt-4
    gpt-3.5-turbo (Cheapest)
```

**Anthropic:**
```
? Which model to use by default?
  ❯ claude-3-5-sonnet-20241022 (Recommended)
    claude-3-5-haiku-20241022 (Fast)
    claude-3-opus-20240229
```

**Google:**
```
? Which model to use by default?
  ❯ gemini-1.5-pro (Recommended)
    gemini-1.5-flash (Fast)
    gemini-pro
```

#### 4. Confirmation

```
✅ OpenAI API Key configured successfully!
   Default model: gpt-4o
```

---

### Remove API Key

#### 1. Select API Key to Remove

```
? Which API Key do you want to remove?
  ❯ OpenAI
    Anthropic
    Google
```

**Note:** Only configured API keys appear in the list.

#### 2. Confirm Removal

```
? Are you sure you want to remove this API Key?
  ❯ Yes
     No
```

#### 3. Confirmation

```
✅ OpenAI API Key removed successfully!
```

---

### List Configured API Keys

```
📋 Configured API Keys:

  ✅ OpenAI: Configured
  ⚪ Anthropic: Not configured
  ⚪ Google: Not configured
```

**Note:** API key values are never displayed, only the status (configured or not).

---

## 📁 Configuration File Structure

### Location

```
~/.setai/config.json
```

**Windows:**
```
C:\Users\<user>\.setai\config.json
```

**macOS/Linux:**
```
~/.setai/config.json
```

### Format

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
    "questions": "en",
    "files": "en"
  }
}
```

---

## 🔒 Security

### Storage

- ✅ Local file only (not sent to servers)
- ✅ Restricted permissions (only user can read)
- ✅ Not committed to Git (`.gitignore`)
- ✅ Hidden input in terminal

### Best Practices

1. **Don't share your API key**
   - Keep `~/.setai/config.json` private
   - Don't commit to Git
   - Don't share in messages or emails

2. **Review file permissions**
   ```bash
   # Linux/macOS
   chmod 600 ~/.setai/config.json
   ```

3. **Rotate API keys regularly**
   - Remove old keys
   - Add new keys
   - Monitor usage on provider platform

---

## 🔄 How to Get API Keys

### OpenAI

1. Visit: https://platform.openai.com/api-keys
2. Login or create account
3. Click "Create new secret key"
4. Copy the key (it only appears once)
5. Configure in CLI: `setai config`

**Available models:**
- `gpt-4o` - Most capable, recommended
- `gpt-4o-mini` - Fast and economical
- `gpt-4-turbo` - GPT-4 turbo version
- `gpt-4` - Standard GPT-4
- `gpt-3.5-turbo` - Cheapest

### Anthropic

1. Visit: https://console.anthropic.com/
2. Login or create account
3. Go to "API Keys"
4. Click "Create Key"
5. Copy the key
6. Configure in CLI: `setai config`

**Available models:**
- `claude-3-5-sonnet-20241022` - Most capable, recommended
- `claude-3-5-haiku-20241022` - Fast
- `claude-3-opus-20240229` - Opus (older)

### Google (Gemini)

1. Visit: https://aistudio.google.com/app/apikey
2. Login with your Google account
3. Click "Create API Key"
4. Copy the key
5. Configure in CLI: `setai config`

**Available models:**
- `gemini-1.5-pro` - Most capable, recommended
- `gemini-1.5-flash` - Fast
- `gemini-pro` - Previous version

---

## 📊 Provider Priority

When multiple providers are configured, CLI uses this order:

1. **OpenAI** (highest priority)
2. **Anthropic** (if OpenAI fails)
3. **Google** (if previous ones fail)

**Behavior:**
- Tries OpenAI first
- If fails, tries Anthropic
- If fails, tries Google
- If all fail, throws error

---

## 🔍 Verify Configuration

### List All Keys

```bash
setai config
# Choose "📋 List configured API Keys"
```

### Check File Directly

```bash
# Linux/macOS
cat ~/.setai/config.json

# Windows
type %USERPROFILE%\.setai\config.json
```

**Note:** Be careful when sharing file content (contains API keys).

---

## 🛠️ Manual Editing (Advanced)

You can edit the file manually if needed:

```bash
# Linux/macOS
nano ~/.setai/config.json

# Windows
notepad %USERPROFILE%\.setai\config.json
```

**Expected format:**
```json
{
  "ai": {
    "openai": {
      "apiKey": "sk-...",
      "defaultModel": "gpt-4o"
    }
  },
  "language": {
    "questions": "en",
    "files": "en"
  }
}
```

**⚠️ Caution:**
- Keep valid JSON format
- Don't remove necessary keys
- Validate before saving

---

## 🔄 Update Default Model

### Via CLI (Recommended)

```bash
setai config
# Choose "➕ Add/Update API Key"
# Select provider
# Enter the same API key
# Choose new model
```

### Via Manual Editing

Edit `~/.setai/config.json` and change the `defaultModel` field.

---

## 🌐 Language Configuration

### Configure Language for Questions and Files

SetAI CLI supports multiple languages for questions and generated files.

#### 1. Access Language Menu

```bash
setai config
# Choose "🌐 Configure language"
```

#### 2. Select Question Language

```
? Select question language:
  ❯ Portuguese (Brazil)
    English
    Spanish
```

#### 3. Select Generated Files Language

```
? Select generated files language:
  ❯ Portuguese (Brazil)
    English
    Spanish
```

**Note:** You can choose different languages for questions and files. For example, questions in English and files in Portuguese.

#### 4. Confirmation

```
✅ Language configured successfully!
```

### Supported Languages

- **Portuguese (pt-BR)** - Default language, fully supported
- **English (en)** - Fully supported
- **Spanish (es)** - Fully supported

### Configuration via Flag

You can also set the language directly in the `init` command:

```bash
# Questions and files in English
setai init --lang en

# Questions and files in Spanish
setai init --lang es

# Questions and files in Portuguese (default)
setai init --lang pt-BR
```

**Note:** The `--lang` flag sets the language for both questions and files. For different configurations, use `setai config`.

### Configuration File Format

```json
{
  "ai": {
    "openai": {
      "apiKey": "sk-...",
      "defaultModel": "gpt-4o"
    }
  },
  "language": {
    "questions": "en",
    "files": "en"
  }
}
```

**Fields:**
- `language.questions` - Interactive question language (pt-BR, en, es)
- `language.files` - Generated files language (pt-BR, en, es)

---

## ❓ FAQ

### Can I use environment variables?

Currently, CLI only uses the configuration file. Environment variables are not directly supported.

### Is the file safe?

Yes, as long as:
- Correct permissions (only you can read)
- Not committed to Git
- Kept locally

### Can I have multiple API keys from the same provider?

No, only one API key per provider is supported. To change, remove the old one and add a new one.

### What happens if I remove an API key?

- Provider will no longer be used
- CLI will try other configured providers
- If none are configured, Beta mode won't work

---

## 🔗 Related Links

- [Beta Mode](./USAGE_BETA.md) - How to use with AI
- [Providers](./PROVIDERS.md) - Details about providers
- [Troubleshooting](./TROUBLESHOOTING.md) - Problem solving
- [Getting Started](./GETTING_STARTED.md) - Getting started guide
