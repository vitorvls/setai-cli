# Troubleshooting - SetAI CLI

Solução de problemas comuns.

## 🔧 Problemas de Instalação

### "Comando não encontrado"

**Sintoma:**
```bash
$ setai init
bash: setai: command not found
```

**Soluções:**
1. Verifique instalação:
   ```bash
   npm list -g @setai/cli
   ```

2. Reinstale:
   ```bash
   npm install -g @setai/cli
   ```

3. Verifique PATH:
   ```bash
   echo $PATH  # Linux/macOS
   echo %PATH% # Windows
   ```

---

### "Permissão negada"

**Sintoma:**
```bash
EACCES: permission denied
```

**Soluções:**

**Linux/macOS:**
```bash
sudo npm install -g @setai/cli
```

**Windows:**
- Execute PowerShell como Administrador
- Ou use `npx @setai/cli init`

---

## 🚀 Problemas de Execução

### "Estrutura já existe"

**Sintoma:**
```
⚠️  A estrutura .cursor/ já existe neste diretório.
```

**Soluções:**
1. Responda `Yes` para sobrescrever
2. Ou remova manualmente:
   ```bash
   rm -rf .cursor/
   ```

---

### "Perguntas não aparecem"

**Sintoma:**
CLI para sem fazer perguntas.

**Soluções:**
1. Verifique se está em diretório correto
2. Execute em terminal interativo (não script)
3. Verifique permissões de escrita

---

## 🔑 Problemas com API Keys

### "Nenhuma API key configurada"

**Sintoma:**
```
Nenhuma API key configurada. Execute "setai config" para configurar.
```

**Solução:**
```bash
setai config
# Configure pelo menos uma API key
```

---

### "API Key inválida"

**Sintoma:**
```
API Key inválida. Execute "setai config" para configurar novamente.
```

**Soluções:**
1. Verifique se a key está correta
2. Remova e adicione novamente:
   ```bash
   setai config
   # Remova a key antiga
   # Adicione uma nova key válida
   ```

---

### "Limite de requisições excedido"

**Sintoma:**
```
Limite de requisições excedido. Tente novamente em alguns instantes.
```

**Soluções:**
1. Aguarde alguns minutos
2. Verifique seu plano na plataforma
3. O CLI faz retry automático (até 3 tentativas)

---

### "Cota de API esgotada"

**Sintoma:**
```
Cota de API esgotada. Verifique seu plano.
```

**Soluções:**
1. Verifique créditos na plataforma
2. Configure outro provedor como backup
3. O CLI tentará outros provedores automaticamente

---

## 📁 Problemas com Arquivos

### "Erro ao criar diretório"

**Sintoma:**
```
Error: EACCES: permission denied, mkdir '.cursor'
```

**Soluções:**
1. Verifique permissões do diretório:
   ```bash
   ls -la .  # Linux/macOS
   ```

2. Dê permissões de escrita:
   ```bash
   chmod u+w .  # Linux/macOS
   ```

---

### "Erro ao escrever arquivo"

**Sintoma:**
```
Error: EACCES: permission denied, open '.cursor/README.md'
```

**Soluções:**
1. Verifique permissões
2. Execute como administrador se necessário
3. Verifique espaço em disco

---

## 🤖 Problemas com IA (Beta)

### "Erro ao processar resposta da IA"

**Sintoma:**
```
Erro ao processar resposta da IA: ...
```

**Soluções:**
1. O CLI continua sem enriquecimento
2. Estrutura básica ainda é gerada
3. Verifique logs para mais detalhes
4. Tente novamente

---

### "Timeout na requisição"

**Sintoma:**
```
Timeout na requisição para API
```

**Soluções:**
1. Verifique conexão com internet
2. O CLI faz retry automático
3. Aguarde e tente novamente

---

## 🔄 Problemas Gerais

### "Erro inesperado"

**Sintoma:**
```
Error: Unexpected error
```

**Soluções:**
1. Verifique versão do Node.js:
   ```bash
   node --version  # Deve ser >= 18.0.0
   ```

2. Atualize o CLI:
   ```bash
   npm update -g @setai/cli
   ```

3. Limpe cache:
   ```bash
   npm cache clean --force
   ```

---

### "Build falha"

**Sintoma:**
```
Error during build
```

**Soluções:**
1. Verifique dependências:
   ```bash
   npm install
   ```

2. Limpe e reconstrua:
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

---

## 📞 Obter Ajuda

### Logs Detalhados

Execute com debug:
```bash
DEBUG=* setai init
```

### Reportar Problema

1. Verifique versão:
   ```bash
   setai --version
   ```

2. Colete informações:
   - Versão do Node.js
   - Sistema operacional
   - Mensagem de erro completa
   - Passos para reproduzir

3. Abra issue no GitHub

---

## 🔗 Links

- [FAQ](./FAQ.md)
- [Getting Started](./GETTING_STARTED.md)
- [Configuração](./CONFIGURATION.md)

