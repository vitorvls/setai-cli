# Configuração - SetAI CLI

Guia completo sobre configuração do SetAI CLI, incluindo gerenciamento de API keys.

## 📋 Visão Geral

O SetAI CLI armazena configurações localmente em `~/.setai/config.json`. Esta pasta não é commitada no Git e contém informações sensíveis como API keys.

---

## 🔧 Comando de Configuração

### `setai config`

Abre menu interativo para gerenciar configurações.

**Sintaxe:**
```bash
setai config
```

**Menu:**
```
🔧 Configuração do SetAI CLI

Arquivo de configuração: ~/.setai/config.json

? O que deseja fazer?
  ❯ ➕ Adicionar/Atualizar API Key
    ➖ Remover API Key
    📋 Listar API Keys configuradas
    🌐 Configurar idioma
    ❌ Sair
```

---

## 🔑 Gerenciamento de API Keys

### Adicionar/Atualizar API Key

#### 1. Selecionar Provedor

```
? Qual provedor de IA?
  ❯ OpenAI (GPT-4, GPT-3.5, etc.)
    Anthropic (Claude)
    Google (Gemini)
```

#### 2. Inserir API Key

```
? Digite sua API Key:
> [input oculto]
```

**Segurança:**
- Input é oculto (tipo `password`)
- Não aparece no terminal
- Armazenado de forma segura

#### 3. Selecionar Modelo Padrão

**OpenAI:**
```
? Qual modelo usar por padrão?
  ❯ gpt-4o (Recomendado - Mais capaz)
    gpt-4o-mini (Rápido e econômico)
    gpt-4-turbo
    gpt-4
    gpt-3.5-turbo (Mais barato)
```

**Anthropic:**
```
? Qual modelo usar por padrão?
  ❯ claude-3-5-sonnet-20241022 (Recomendado)
    claude-3-5-haiku-20241022 (Rápido)
    claude-3-opus-20240229
```

**Google:**
```
? Qual modelo usar por padrão?
  ❯ gemini-1.5-pro (Recomendado)
    gemini-1.5-flash (Rápido)
    gemini-pro
```

#### 4. Confirmação

```
✅ API Key do openai configurada com sucesso!
   Modelo padrão: gpt-4o
```

---

### Remover API Key

#### 1. Selecionar API Key para Remover

```
? Qual API Key deseja remover?
  ❯ OpenAI
    Anthropic
    Google
```

**Nota:** Apenas API keys configuradas aparecem na lista.

#### 2. Confirmar Remoção

```
? Tem certeza que deseja remover esta API Key?
  ❯ Yes
     No
```

#### 3. Confirmação

```
✅ API Key do openai removida com sucesso!
```

---

### Listar API Keys Configuradas

```
📋 API Keys configuradas:

  ✅ OpenAI: Configurada
  ⚪ Anthropic: Não configurada
  ⚪ Google: Não configurada
```

**Nota:** Os valores das API keys nunca são exibidos, apenas o status (configurada ou não).

---

## 📁 Estrutura do Arquivo de Configuração

### Localização

```
~/.setai/config.json
```

**Windows:**
```
C:\Users\<usuario>\.setai\config.json
```

**macOS/Linux:**
```
~/.setai/config.json
```

### Formato

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
  }
}
```

---

## 🔒 Segurança

### Armazenamento

- ✅ Arquivo local apenas (não enviado para servidores)
- ✅ Permissões restritas (apenas usuário pode ler)
- ✅ Não commitado no Git (`.gitignore`)
- ✅ Input oculto no terminal

### Boas Práticas

1. **Não compartilhe sua API key**
   - Mantenha o arquivo `~/.setai/config.json` privado
   - Não commite no Git
   - Não compartilhe em mensagens ou emails

2. **Use variáveis de ambiente (opcional)**
   - Você pode usar variáveis de ambiente como alternativa
   - O CLI prioriza arquivo de configuração sobre variáveis de ambiente

3. **Revise permissões do arquivo**
   ```bash
   # Linux/macOS
   chmod 600 ~/.setai/config.json
   ```

4. **Rotacione API keys regularmente**
   - Remova keys antigas
   - Adicione novas keys
   - Monitore uso na plataforma do provedor

---

## 🔄 Como Obter API Keys

### OpenAI

1. Acesse: https://platform.openai.com/api-keys
2. Faça login ou crie uma conta
3. Clique em "Create new secret key"
4. Copie a key (ela só aparece uma vez)
5. Configure no CLI: `setai config`

**Modelos disponíveis:**
- `gpt-4o` - Mais capaz, recomendado
- `gpt-4o-mini` - Rápido e econômico
- `gpt-4-turbo` - Versão turbo do GPT-4
- `gpt-4` - GPT-4 padrão
- `gpt-3.5-turbo` - Mais barato

### Anthropic

1. Acesse: https://console.anthropic.com/
2. Faça login ou crie uma conta
3. Vá para "API Keys"
4. Clique em "Create Key"
5. Copie a key
6. Configure no CLI: `setai config`

**Modelos disponíveis:**
- `claude-3-5-sonnet-20241022` - Mais capaz, recomendado
- `claude-3-5-haiku-20241022` - Rápido
- `claude-3-opus-20240229` - Opus (mais antigo)

### Google (Gemini)

1. Acesse: https://aistudio.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a key
5. Configure no CLI: `setai config`

**Modelos disponíveis:**
- `gemini-1.5-pro` - Mais capaz, recomendado
- `gemini-1.5-flash` - Rápido
- `gemini-pro` - Versão anterior

---

## 📊 Prioridade de Provedores

Quando múltiplos provedores estão configurados, o CLI usa esta ordem:

1. **OpenAI** (prioridade mais alta)
2. **Anthropic** (se OpenAI falhar)
3. **Google** (se anteriores falharem)

**Comportamento:**
- Tenta OpenAI primeiro
- Se falhar, tenta Anthropic
- Se falhar, tenta Google
- Se todos falharem, lança erro

---

## 🔍 Verificar Configuração

### Listar Todas as Keys

```bash
setai config
# Escolha "📋 Listar API Keys configuradas"
```

### Verificar Arquivo Diretamente

```bash
# Linux/macOS
cat ~/.setai/config.json

# Windows
type %USERPROFILE%\.setai\config.json
```

**Nota:** Cuidado ao compartilhar o conteúdo do arquivo (contém API keys).

---

## 🛠️ Edição Manual (Avançado)

Você pode editar o arquivo manualmente se necessário:

```bash
# Linux/macOS
nano ~/.setai/config.json

# Windows
notepad %USERPROFILE%\.setai\config.json
```

**Formato esperado:**
```json
{
  "ai": {
    "openai": {
      "apiKey": "sk-...",
      "defaultModel": "gpt-4o"
    }
  }
}
```

**⚠️ Cuidado:**
- Mantenha o formato JSON válido
- Não remova chaves necessárias
- Valide antes de salvar

---

## 🔄 Atualizar Modelo Padrão

### Via CLI (Recomendado)

```bash
setai config
# Escolha "➕ Adicionar/Atualizar API Key"
# Selecione o provedor
# Digite a mesma API key
# Escolha o novo modelo
```

### Via Edição Manual

Edite `~/.setai/config.json` e altere o campo `defaultModel`.

---

## 🌐 Configuração de Idioma

### Configurar Idioma das Perguntas e Arquivos

O SetAI CLI suporta múltiplos idiomas para perguntas e arquivos gerados.

#### 1. Acessar Menu de Idioma

```bash
setai config
# Escolha "🌐 Configurar idioma"
```

#### 2. Selecionar Idioma das Perguntas

```
? Selecione o idioma das perguntas:
  ❯ Português (Brasil)
    English
    Español
```

#### 3. Selecionar Idioma dos Arquivos Gerados

```
? Selecione o idioma dos arquivos gerados:
  ❯ Português (Brasil)
    English
    Español
```

**Nota:** Você pode escolher idiomas diferentes para perguntas e arquivos. Por exemplo, perguntas em inglês e arquivos em português.

#### 4. Confirmação

```
✅ Idioma configurado com sucesso!
```

### Idiomas Suportados

- **Português (pt-BR)** - Idioma padrão, totalmente suportado
- **English (en)** - Totalmente suportado
- **Español (es)** - Totalmente suportado

### Configuração via Flag

Você também pode definir o idioma diretamente no comando `init`:

```bash
# Perguntas e arquivos em inglês
setai init --lang en

# Perguntas e arquivos em espanhol
setai init --lang es

# Perguntas e arquivos em português (padrão)
setai init --lang pt-BR
```

**Nota:** A flag `--lang` define o idioma para perguntas e arquivos. Para configurações diferentes, use `setai config`.

### Formato do Arquivo de Configuração

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

**Campos:**
- `language.questions` - Idioma das perguntas interativas (pt-BR, en, es)
- `language.files` - Idioma dos arquivos gerados (pt-BR, en, es)

---

## ❓ FAQ

### Posso usar variáveis de ambiente?

Atualmente, o CLI usa apenas o arquivo de configuração. Variáveis de ambiente não são suportadas diretamente.

### O arquivo é seguro?

Sim, desde que:
- Permissões corretas (apenas você pode ler)
- Não commitado no Git
- Mantido localmente

### Posso ter múltiplas API keys do mesmo provedor?

Não, apenas uma API key por provedor é suportada. Para trocar, remova a antiga e adicione a nova.

### O que acontece se eu remover uma API key?

- O provedor não será mais usado
- O CLI tentará outros provedores configurados
- Se nenhum estiver configurado, o modo Beta não funcionará

---

## 🔗 Links Relacionados

- [Modo Beta](./USAGE_BETA.md) - Como usar com IA
- [Providers](./PROVIDERS.md) - Detalhes sobre provedores
- [Troubleshooting](./TROUBLESHOOTING.md) - Solução de problemas
- [Getting Started](./GETTING_STARTED.md) - Guia de início

