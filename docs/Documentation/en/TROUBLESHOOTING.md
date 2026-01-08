# Troubleshooting - SetAI CLI

Solutions to common problems.

## 🔧 Installation Problems

### "Command not found"

**Symptom:**
```bash
$ setai init
bash: setai: command not found
```

**Solutions:**
1. Check installation:
   ```bash
   npm list -g @setai/cli
   ```

2. Reinstall:
   ```bash
   npm install -g @setai/cli
   ```

3. Check PATH:
   ```bash
   echo $PATH  # Linux/macOS
   echo %PATH% # Windows
   ```

---

### "Permission denied"

**Symptom:**
```bash
EACCES: permission denied
```

**Solutions:**

**Linux/macOS:**
```bash
sudo npm install -g @setai/cli
```

**Windows:**
- Run PowerShell as Administrator
- Or use `npx @setai/cli init`

---

## 🚀 Execution Problems

### "Structure already exists"

**Symptom:**
```
⚠️  The .cursor/ structure already exists in this directory.
```

**Solutions:**
1. Answer `Yes` to overwrite
2. Or remove manually:
   ```bash
   rm -rf .cursor/
   ```

---

### "Questions don't appear"

**Symptom:**
CLI stops without asking questions.

**Solutions:**
1. Check if you're in correct directory
2. Run in interactive terminal (not script)
3. Check write permissions

---

## 🔑 API Key Problems

### "No API key configured"

**Symptom:**
```
No API key configured. Run "setai config" to configure.
```

**Solution:**
```bash
setai config
# Configure at least one API key
```

---

### "Invalid API key"

**Symptom:**
```
Invalid API key. Run "setai config" to configure again.
```

**Solutions:**
1. Check if key is correct
2. Remove and add again:
   ```bash
   setai config
   # Remove old key
   # Add a new valid key
   ```

---

### "Request limit exceeded"

**Symptom:**
```
Request limit exceeded. Try again in a few moments.
```

**Solutions:**
1. Wait a few minutes
2. Check your plan on the platform
3. CLI does automatic retry (up to 3 attempts)

---

### "API quota exhausted"

**Symptom:**
```
API quota exhausted. Check your plan.
```

**Solutions:**
1. Check credits on platform
2. Configure another provider as backup
3. CLI will try other providers automatically

---

## 📁 File Problems

### "Error creating directory"

**Symptom:**
```
Error: EACCES: permission denied, mkdir '.cursor'
```

**Solutions:**
1. Check directory permissions:
   ```bash
   ls -la .  # Linux/macOS
   ```

2. Give write permissions:
   ```bash
   chmod u+w .  # Linux/macOS
   ```

---

### "Error writing file"

**Symptom:**
```
Error: EACCES: permission denied, open '.cursor/README.md'
```

**Solutions:**
1. Check permissions
2. Run as administrator if necessary
3. Check disk space

---

## 🤖 AI Problems (Beta)

### "Error processing AI response"

**Symptom:**
```
Error processing AI response: ...
```

**Solutions:**
1. CLI continues without enrichment
2. Basic structure is still generated
3. Check logs for more details
4. Try again

---

### "Request timeout"

**Symptom:**
```
Timeout on API request
```

**Solutions:**
1. Check internet connection
2. CLI does automatic retry
3. Wait and try again

---

## 🔄 General Problems

### "Unexpected error"

**Symptom:**
```
Error: Unexpected error
```

**Solutions:**
1. Check Node.js version:
   ```bash
   node --version  # Should be >= 18.0.0
   ```

2. Update CLI:
   ```bash
   npm update -g @setai/cli
   ```

3. Clear cache:
   ```bash
   npm cache clean --force
   ```

---

### "Build fails"

**Symptom:**
```
Error during build
```

**Solutions:**
1. Check dependencies:
   ```bash
   npm install
   ```

2. Clean and rebuild:
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

---

## 📞 Get Help

### Detailed Logs

Run with debug:
```bash
DEBUG=* setai init
```

### Report Problem

1. Check version:
   ```bash
   setai --version
   ```

2. Collect information:
   - Node.js version
   - Operating system
   - Complete error message
   - Steps to reproduce

3. Open issue on GitHub

---

## 🔗 Links

- [FAQ](./FAQ.md)
- [Getting Started](./GETTING_STARTED.md)
- [Configuration](./CONFIGURATION.md)
