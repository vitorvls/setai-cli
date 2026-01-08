# AI Providers - SetAI CLI

Details about supported AI providers.

## 🤖 Available Providers

### OpenAI

**Supported models:**
- `gpt-4o` - Most capable, recommended
- `gpt-4o-mini` - Fast and economical
- `gpt-4-turbo` - Turbo version
- `gpt-4` - Standard GPT-4
- `gpt-3.5-turbo` - Cheapest

**SDK:** `openai` (official)

**Characteristics:**
- JSON mode support
- Robust rate limiting
- Automatic retry

**Configuration:**
```bash
setai config
# Choose OpenAI
# Enter API key
# Select model
```

---

### Anthropic (Claude)

**Supported models:**
- `claude-3-5-sonnet-20241022` - Most capable, recommended
- `claude-3-5-haiku-20241022` - Fast
- `claude-3-opus-20240229` - Opus

**SDK:** `@anthropic-ai/sdk` (official)

**Characteristics:**
- Structured responses
- System instructions
- Rate limiting

**Configuration:**
```bash
setai config
# Choose Anthropic
# Enter API key
# Select model
```

---

### Google (Gemini)

**Supported models:**
- `gemini-1.5-pro` - Most capable, recommended
- `gemini-1.5-flash` - Fast
- `gemini-pro` - Previous version

**SDK:** `@google/generative-ai` (official)

**Characteristics:**
- Native JSON mode
- System instructions
- Rate limiting

**Configuration:**
```bash
setai config
# Choose Google
# Enter API key
# Select model
```

---

## 🔄 Prioritization and Fallback

### Priority Order

1. **OpenAI** (if configured)
2. **Anthropic** (if OpenAI fails or is not configured)
3. **Google** (if previous ones fail)

### Automatic Fallback

If a provider fails, CLI automatically tries the next one:

```
Trying OpenAI...
⚠️  Error using OpenAI, trying other providers...
   Using Anthropic (Claude)...
✅ Responses enriched with AI!
```

---

## ⚙️ Configuration

### Add Provider

```bash
setai config
# Choose "➕ Add/Update API Key"
# Select provider
# Enter API key
# Choose default model
```

### Remove Provider

```bash
setai config
# Choose "➖ Remove API Key"
# Select provider
# Confirm removal
```

---

## 💰 Estimated Costs

### OpenAI

- `gpt-4o`: ~$0.01 - $0.05 per execution
- `gpt-4o-mini`: ~$0.005 - $0.02 per execution

### Anthropic

- `claude-3-5-sonnet`: ~$0.015 - $0.06 per execution
- `claude-3-5-haiku`: ~$0.001 - $0.005 per execution

### Google

- `gemini-1.5-pro`: ~$0.001 - $0.005 per execution
- `gemini-1.5-flash`: ~$0.0005 - $0.002 per execution

**Note:** Costs are estimates. Consult official prices.

---

## 🔒 Security

### Storage

- API keys stored locally
- File `~/.setai/config.json`
- Restricted permissions
- Not committed to Git

### Communication

- HTTPS only
- No sensitive data sent
- Direct communication with APIs

---

## 🔗 Links

- [Configuration](./CONFIGURATION.md) - How to configure
- [Beta Mode](./USAGE_BETA.md) - How to use
- [Troubleshooting](./TROUBLESHOOTING.md) - Common problems
