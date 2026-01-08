# Providers de IA - SetAI CLI

Detalhes sobre os provedores de IA suportados.

## 🤖 Provedores Disponíveis

### OpenAI

**Modelos suportados:**
- `gpt-4o` - Mais capaz, recomendado
- `gpt-4o-mini` - Rápido e econômico
- `gpt-4-turbo` - Versão turbo
- `gpt-4` - GPT-4 padrão
- `gpt-3.5-turbo` - Mais barato

**SDK:** `openai` (oficial)

**Características:**
- Suporte a JSON mode
- Rate limiting robusto
- Retry automático

**Configuração:**
```bash
setai config
# Escolha OpenAI
# Digite API key
# Selecione modelo
```

---

### Anthropic (Claude)

**Modelos suportados:**
- `claude-3-5-sonnet-20241022` - Mais capaz, recomendado
- `claude-3-5-haiku-20241022` - Rápido
- `claude-3-opus-20240229` - Opus

**SDK:** `@anthropic-ai/sdk` (oficial)

**Características:**
- Respostas estruturadas
- System instructions
- Rate limiting

**Configuração:**
```bash
setai config
# Escolha Anthropic
# Digite API key
# Selecione modelo
```

---

### Google (Gemini)

**Modelos suportados:**
- `gemini-1.5-pro` - Mais capaz, recomendado
- `gemini-1.5-flash` - Rápido
- `gemini-pro` - Versão anterior

**SDK:** `@google/generative-ai` (oficial)

**Características:**
- JSON mode nativo
- System instructions
- Rate limiting

**Configuração:**
```bash
setai config
# Escolha Google
# Digite API key
# Selecione modelo
```

---

## 🔄 Priorização e Fallback

### Ordem de Prioridade

1. **OpenAI** (se configurado)
2. **Anthropic** (se OpenAI falhar ou não estiver configurado)
3. **Google** (se anteriores falharem)

### Fallback Automático

Se um provedor falhar, o CLI tenta o próximo automaticamente:

```
Tentando OpenAI...
⚠️  Erro ao usar OpenAI, tentando outros provedores...
   Usando Anthropic (Claude)...
✅ Respostas enriquecidas com IA!
```

---

## ⚙️ Configuração

### Adicionar Provider

```bash
setai config
# Escolha "➕ Adicionar/Atualizar API Key"
# Selecione o provedor
# Digite a API key
# Escolha o modelo padrão
```

### Remover Provider

```bash
setai config
# Escolha "➖ Remover API Key"
# Selecione o provedor
# Confirme remoção
```

---

## 💰 Custos Estimados

### OpenAI

- `gpt-4o`: ~$0.01 - $0.05 por execução
- `gpt-4o-mini`: ~$0.005 - $0.02 por execução

### Anthropic

- `claude-3-5-sonnet`: ~$0.015 - $0.06 por execução
- `claude-3-5-haiku`: ~$0.001 - $0.005 por execução

### Google

- `gemini-1.5-pro`: ~$0.001 - $0.005 por execução
- `gemini-1.5-flash`: ~$0.0005 - $0.002 por execução

**Nota:** Custos são estimativas. Consulte preços oficiais.

---

## 🔒 Segurança

### Armazenamento

- API keys armazenadas localmente
- Arquivo `~/.setai/config.json`
- Permissões restritas
- Não commitado no Git

### Comunicação

- HTTPS apenas
- Sem dados sensíveis enviados
- Comunicação direta com APIs

---

## 🔗 Links

- [Configuração](./CONFIGURATION.md) - Como configurar
- [Modo Beta](./USAGE_BETA.md) - Como usar
- [Troubleshooting](./TROUBLESHOOTING.md) - Problemas comuns

