# FAQ - SetAI CLI

Frequently asked questions about SetAI CLI.

## 📋 General

### What is SetAI CLI?

CLI Tool that automatically generates configuration structures for AI-assisted development, applying best practices.

### What is it for?

Facilitates initial configuration of projects that use AI for development, generating complete structure with rules, context, and configurations.

### Is it free?

Yes, the CLI is open source and free. Beta mode consumes tokens from AI providers (OpenAI, Anthropic, Google), which have their own costs.

---

## 🚀 Installation

### How to install?

```bash
npm install -g @setai/cli
```

### Requirements?

- Node.js >= 18.0.0
- npm, pnpm or yarn

### How to verify installation?

```bash
setai --version
```

---

## 💻 Usage

### How to use for the first time?

```bash
setai init
```

### Can I skip questions?

No, basic questions are mandatory. In advanced mode, you can choose which groups to answer.

### Can I edit later?

Yes! All generated files are editable.

### What if I make a mistake?

Run `setai init` again. You'll be asked if you want to overwrite.

---

## 🔧 Configuration

### Where are API keys stored?

In `~/.setai/config.json` (local, not committed to Git).

### Is it safe?

Yes, as long as:
- Correct file permissions
- Not committed to Git
- Kept locally

### Can I use environment variables?

Currently, only configuration file is supported.

---

## 🤖 Beta Mode

### What is Beta mode?

Integration with AI models to automatically enrich responses.

### How much does it cost?

Depends on provider and model. Estimate: $0.01 - $0.05 per execution.

### Is it mandatory?

No, it's optional. You can use the CLI without Beta mode.

### Which providers are supported?

- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude 3.5)
- Google (Gemini 1.5)

---

## 📁 Structure

### Where is the structure generated?

Depends on IDE:
- Cursor → `.cursor/`
- VS Code → `.vscode/`
- JetBrains → `.idea/`
- Other → `.ai/` or customized

### Can I have multiple structures?

Yes, you can have `.cursor/` and `.vscode/` in the same project.

### Should the structure be committed?

Yes, the structure should be committed to Git so the entire team has access.

---

## ❓ Problems

### "Command not found"

Check if it was installed globally:
```bash
npm list -g @setai/cli
```

### "Permission denied"

Use `sudo` (Linux/macOS) or run as administrator (Windows).

### "Structure already exists"

CLI asks if you want to overwrite. Answer `Yes` if you want to replace.

### "Invalid API key"

Run `setai config` and configure a new valid API key.

---

## 🔗 Links

- [Getting Started](./GETTING_STARTED.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
- [Configuration](./CONFIGURATION.md)
