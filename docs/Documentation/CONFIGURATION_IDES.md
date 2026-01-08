# Configuração de IDEs - SetAI CLI

Guia sobre suporte a múltiplas IDEs e seleção de pasta de configuração.

## 🎯 Visão Geral

O SetAI CLI suporta múltiplas IDEs e gera a estrutura na pasta apropriada para cada uma. Isso permite usar o CLI com qualquer IDE que suporte configuração via arquivos.

---

## 🖥️ IDEs Suportadas

### 1. Cursor

**Pasta:** `.cursor/`

**Quando usar:**
- Você está usando o editor Cursor
- Quer configuração específica para Cursor

**Características:**
- Estrutura otimizada para Cursor
- Compatível com recursos de IA do Cursor

### 2. VS Code

**Pasta:** `.vscode/`

**Quando usar:**
- Você está usando Visual Studio Code
- Quer configuração específica para VS Code

**Características:**
- Estrutura compatível com VS Code
- Pode ser usado com extensões de IA

### 3. JetBrains

**Pasta:** `.idea/`

**Quando usar:**
- Você está usando IntelliJ IDEA, WebStorm, PyCharm, etc.
- Quer configuração específica para IDEs JetBrains

**Características:**
- Estrutura compatível com IDEs JetBrains
- Funciona com todos os produtos JetBrains

### 4. Outra IDE / Genérico

**Pasta:** `.ai/` (ou customizada)

**Quando usar:**
- Você está usando outra IDE
- Quer uma pasta genérica
- Precisa de nome customizado

**Características:**
- Pasta genérica `.ai/`
- Permite nome customizado
- Funciona com qualquer IDE

---

## 🔄 Seleção de IDE

### Durante `setai init`

Ao executar `setai init`, a primeira pergunta é:

```
? Qual IDE você está usando?
  ❯ Cursor
    VS Code
    JetBrains (IntelliJ, WebStorm, etc.)
    Outra IDE / Genérico (.ai)
```

### Pasta Customizada

Se escolher "Outra IDE / Genérico", será perguntado:

```
? Nome da pasta de configuração (ou deixe em branco para usar .ai):
> .minha-ide
```

**Validação:**
- Não pode estar vazio
- Não pode conter `..`, `/`, ou `\`
- Deve ser um nome de pasta válido

---

## 📁 Estrutura por IDE

### Cursor (`.cursor/`)

```
.cursor/
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

### VS Code (`.vscode/`)

```
.vscode/
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

### JetBrains (`.idea/`)

```
.idea/
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

### Genérico (`.ai/` ou customizado)

```
.ai/  (ou nome customizado)
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

---

## 🔍 Detecção de Estrutura Existente

### Comportamento

O CLI verifica se a pasta de configuração já existe:

```
⚠️  A estrutura .cursor/ já existe neste diretório.

? Deseja sobrescrever a estrutura existente?
  ❯ Yes
     No
```

**Se escolher `No`:**
- Operação cancelada
- Estrutura existente preservada

**Se escolher `Yes`:**
- Estrutura existente será sobrescrita
- Todos os arquivos serão regenerados

---

## 💡 Casos de Uso

### Caso 1: Projeto com Cursor

```bash
$ setai init

? Qual IDE você está usando?
  ❯ Cursor

# Estrutura gerada em .cursor/
```

### Caso 2: Projeto com VS Code

```bash
$ setai init

? Qual IDE você está usando?
    VS Code

# Estrutura gerada em .vscode/
```

### Caso 3: Múltiplas IDEs no Mesmo Projeto

Você pode ter múltiplas pastas de configuração:

```bash
# Primeira execução - Cursor
$ setai init
? Qual IDE? Cursor
# Gera .cursor/

# Segunda execução - VS Code (em outro momento)
$ setai init
? Qual IDE? VS Code
# Gera .vscode/
```

**Resultado:**
```
projeto/
├── .cursor/    # Configuração para Cursor
├── .vscode/    # Configuração para VS Code
└── ...
```

### Caso 4: IDE Customizada

```bash
$ setai init

? Qual IDE você está usando?
    Outra IDE / Genérico (.ai)

? Nome da pasta de configuração (ou deixe em branco para usar .ai):
> .neovim

# Estrutura gerada em .neovim/
```

---

## 🔄 Mudando de IDE

### Cenário: Migrar de Cursor para VS Code

1. **Opção 1: Manter Ambas**
   ```bash
   # Já tem .cursor/
   setai init
   # Escolhe VS Code
   # Agora tem .cursor/ e .vscode/
   ```

2. **Opção 2: Substituir**
   ```bash
   # Remove .cursor/ manualmente
   rm -rf .cursor/
   
   # Gera nova estrutura para VS Code
   setai init
   # Escolhe VS Code
   ```

---

## 📋 Compatibilidade

### Estrutura Universal

A estrutura gerada é **universal** e funciona com qualquer IDE:

- ✅ Arquivos Markdown (`.md`)
- ✅ Estrutura de pastas padrão
- ✅ Sem dependências de IDE específica
- ✅ Editável em qualquer editor

### IDEs que Podem Usar

Qualquer IDE que:
- Suporte leitura de arquivos Markdown
- Permita configuração via arquivos
- Tenha suporte a pastas de configuração

**Exemplos:**
- Neovim / Vim
- Emacs
- Sublime Text
- Atom
- Qualquer editor de texto

---

## 🎯 Recomendações

### Para Cursor

Use `.cursor/` se:
- Você usa Cursor como editor principal
- Quer integração nativa com recursos do Cursor

### Para VS Code

Use `.vscode/` se:
- Você usa VS Code como editor principal
- Quer manter padrão do VS Code

### Para JetBrains

Use `.idea/` se:
- Você usa IDEs JetBrains
- Quer compatibilidade com estrutura JetBrains

### Para Outras IDEs

Use `.ai/` ou nome customizado se:
- Você usa outra IDE
- Quer pasta genérica
- Precisa de nome específico

---

## 🔗 Links Relacionados

- [Getting Started](./GETTING_STARTED.md) - Guia de início
- [Uso Básico](./USAGE_BASIC.md) - Comandos básicos
- [Configuração](./CONFIGURATION.md) - Gerenciamento de API keys

