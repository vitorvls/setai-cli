# 🔑 Como Configurar API Keys - SetAI CLI

## ❌ NÃO use Variáveis de Ambiente

O SetAI CLI **NÃO usa variáveis de ambiente** para API keys. As API keys são gerenciadas através do comando `setai config` e armazenadas em `~/.setai/config.json`.

## ✅ Método Correto: Comando `config`

### Passo 1: Executar o comando config

```bash
# Do diretório raiz do projeto (após build)
pnpm run cli config

# Ou se o CLI estiver instalado globalmente
setai config
```

### Passo 2: Menu Interativo

Você verá um menu com as seguintes opções:

```
🔧 Configuração do SetAI CLI

Arquivo de configuração: C:\Users\seu-usuario\.setai\config.json

? O que deseja fazer?
❯ ➕ Adicionar/Atualizar API Key
  ➖ Remover API Key
  📋 Listar API Keys configuradas
  ❌ Sair
```

### Passo 3: Adicionar API Key

1. **Escolha "➕ Adicionar/Atualizar API Key"**

2. **Selecione o provedor:**
   ```
   ? Qual provedor de IA?
   ❯ OpenAI (GPT-4, GPT-3.5, etc.)
     Anthropic (Claude)
     Google (Gemini)
   ```

3. **Digite sua API Key:**
   ```
   ? Digite sua API Key: 
   [sua-api-key-aqui]
   ```
   - A API key será ocultada enquanto você digita (campo password)
   - Exemplo OpenAI: `sk-...`
   - Exemplo Anthropic: `sk-ant-...`
   - Exemplo Google: `AIza...`

4. **Escolha o modelo padrão:**
   - **OpenAI:** gpt-4o, gpt-4o-mini, gpt-4-turbo, gpt-4, gpt-3.5-turbo
   - **Anthropic:** claude-3-5-sonnet-20241022, claude-3-5-haiku-20241022, claude-3-opus-20240229
   - **Google:** gemini-1.5-pro, gemini-1.5-flash, gemini-pro

5. **Confirmação:**
   ```
   ✅ API Key do openai configurada com sucesso!
      Modelo padrão: gpt-4o
   ```

### Passo 4: Verificar API Keys Configuradas

Escolha "📋 Listar API Keys configuradas" para ver quais estão configuradas:

```
📋 API Keys configuradas:

  ✅ OpenAI: Configurada
  ⚪ Anthropic: Não configurada
  ⚪ Google: Não configurada
```

## 📍 Onde as API Keys são Armazenadas?

As API keys são salvas em:

**Windows:**
```
C:\Users\SEU-USUARIO\.setai\config.json
```

**Linux/Mac:**
```
~/.setai/config.json
```

**Conteúdo do arquivo (exemplo):**
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
    }
  },
  "language": {
    "questions": "pt-BR",
    "files": "pt-BR"
  }
}
```

## 🔒 Segurança

- ✅ As API keys são armazenadas localmente no seu computador
- ✅ O arquivo `~/.setai/config.json` **NÃO** deve ser commitado no Git
- ✅ O arquivo está no `.gitignore` do projeto (se você clonar o repositório)
- ⚠️ **Nunca compartilhe suas API keys**

## 🧪 Testar Configuração

Após configurar as API keys, teste o modo beta:

```bash
# Do diretório de teste
cd test-manual
node ../dist/index.js init --beta
```

O CLI tentará usar as API keys configuradas para enriquecer as respostas.

## 🗑️ Remover API Key

1. Execute `setai config`
2. Escolha "➖ Remover API Key"
3. Selecione o provedor
4. Confirme a remoção

## 📝 Exemplo Completo

```bash
# 1. Build do projeto
pnpm build

# 2. Configurar API keys
pnpm run cli config

# 3. No menu:
#    - Escolha "➕ Adicionar/Atualizar API Key"
#    - Escolha "OpenAI"
#    - Digite sua API key
#    - Escolha modelo (ex: gpt-4o)
#    - Veja mensagem de sucesso

# 4. Testar modo beta
cd test-manual
node ../dist/index.js init --beta
```

## ❓ Onde Obter API Keys?

### OpenAI
1. Acesse: https://platform.openai.com/api-keys
2. Faça login ou crie uma conta
3. Clique em "Create new secret key"
4. Copie a chave (ela só aparece uma vez!)

### Anthropic
1. Acesse: https://console.anthropic.com/
2. Faça login ou crie uma conta
3. Vá em "API Keys"
4. Clique em "Create Key"
5. Copie a chave

### Google (Gemini)
1. Acesse: https://aistudio.google.com/app/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Escolha o projeto ou crie um novo
5. Copie a chave

## ⚠️ Troubleshooting

### "API Key inválida"
- Verifique se copiou a chave completa
- Verifique se não há espaços antes/depois
- Tente criar uma nova chave

### "Cota de API esgotada"
- Verifique seu plano na plataforma do provedor
- Alguns provedores têm limites gratuitos

### "Erro ao enriquecer com IA"
- O CLI continuará funcionando mesmo se a IA falhar
- Verifique se a API key está correta
- Verifique sua conexão com a internet

---

**Resumo:** Use `setai config` para gerenciar API keys. **NÃO** use variáveis de ambiente!
