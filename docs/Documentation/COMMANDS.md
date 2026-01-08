# Referência de Comandos - SetAI CLI

Referência completa de todos os comandos e opções disponíveis.

## 📋 Comandos Disponíveis

### `setai init`

Gera estrutura de configuração para desenvolvimento assistido por IA.

**Sintaxe:**
```bash
setai init [opções]
```

**Opções:**
- `--advanced` - Inclui perguntas avançadas opcionais
- `--beta` - Habilita integração com IA
- `--lang <locale>` - Define idioma das perguntas e arquivos (pt-BR, en, es)

**Exemplos:**
```bash
setai init
setai init --advanced
setai init --beta
setai init --advanced --beta
setai init --lang en
setai init --lang es
setai init --advanced --lang en
```

**O que faz:**
1. Pergunta qual IDE está usando
2. Coleta informações do projeto
3. (Opcional) Perguntas avançadas
4. (Opcional) Enriquece com IA
5. Gera estrutura na pasta apropriada

---

### `setai config`

Gerencia configurações do CLI, incluindo API keys.

**Sintaxe:**
```bash
setai config
```

**Menu interativo:**
- ➕ Adicionar/Atualizar API Key
- ➖ Remover API Key
- 📋 Listar API Keys configuradas
- 🌐 Configurar idioma
- ❌ Sair

**O que faz:**
- Gerencia API keys de OpenAI, Anthropic e Google
- Permite selecionar modelo padrão por provedor
- Configura idioma das perguntas e arquivos gerados
- Armazena configurações em `~/.setai/config.json`

---

### `setai --help`

Exibe ajuda e exemplos de uso.

**Sintaxe:**
```bash
setai --help
setai init --help
setai config --help
```

---

### `setai --version`

Exibe versão do CLI.

**Sintaxe:**
```bash
setai --version
```

---

## 🔧 Opções Detalhadas

### `--lang <locale>`

**Comando:** `setai init --lang <locale>`

**Valores aceitos:**
- `pt-BR` - Português (Brasil) - Padrão
- `en` - English
- `es` - Español

**O que faz:**
- Define o idioma das perguntas interativas
- Define o idioma dos arquivos gerados
- Salva a preferência em `~/.setai/config.json`

**Exemplos:**
```bash
# Inglês
setai init --lang en

# Espanhol
setai init --lang es

# Português (padrão)
setai init --lang pt-BR
```

**Nota:** Você também pode configurar idiomas diferentes para perguntas e arquivos usando `setai config`.

---

### `--advanced`

**Comando:** `setai init --advanced`

**O que faz:**
- Habilita perguntas avançadas opcionais
- Permite configurar grupos modulares:
  - AI Usage Rules
  - Responsabilidades
  - Bibliotecas
  - Arquitetura Detalhada
  - Segurança
  - Testes
  - Deploy
  - Documentação

**Quando usar:**
- Precisa personalizar regras específicas
- Quer configurar bibliotecas customizadas
- Precisa documentar decisões arquiteturais

**Veja:** [Uso Avançado](./USAGE_ADVANCED.md)

---

### `--beta`

**Comando:** `setai init --beta`

**O que faz:**
- Habilita integração com modelos de IA
- Enriquece respostas automaticamente
- Gera descrições profissionais
- Expande objetivos e decisões

**Pré-requisitos:**
- Pelo menos uma API key configurada
- Executar `setai config` primeiro

**Quando usar:**
- Quer descrições profissionais
- Precisa de objetivos expandidos
- Quer sugestões arquiteturais

**Veja:** [Modo Beta](./USAGE_BETA.md)

---

## 🔄 Combinações

### Básico
```bash
setai init
```
- Perguntas básicas apenas
- Estrutura essencial

### Avançado
```bash
setai init --advanced
```
- Perguntas básicas + avançadas
- Estrutura completa personalizada

### Beta
```bash
setai init --beta
```
- Perguntas básicas
- Enriquecimento com IA

### Completo
```bash
setai init --advanced --beta
```
- Perguntas básicas + avançadas
- Enriquecimento com IA
- Máxima personalização

### Com Idioma Específico
```bash
setai init --lang en
setai init --advanced --lang es
setai init --beta --lang en
```
- Define idioma das perguntas e arquivos
- Pode ser combinado com outras opções

---

## 📚 Links Relacionados

- [Getting Started](./GETTING_STARTED.md)
- [Uso Básico](./USAGE_BASIC.md)
- [Uso Avançado](./USAGE_ADVANCED.md)
- [Modo Beta](./USAGE_BETA.md)
- [Configuração](./CONFIGURATION.md)

