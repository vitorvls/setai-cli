# Getting Started - SetAI CLI

Guia completo para começar a usar o SetAI CLI.

## 📦 Instalação

### Via npm

```bash
npm install -g @setai/cli
```

### Via pnpm

```bash
pnpm add -g @setai/cli
```

### Via yarn

```bash
yarn global add @setai/cli
```

### Verificar Instalação

```bash
setai --version
```

Você deve ver a versão instalada (ex: `0.1.0`).

---

## 🚀 Quick Start

### 1. Navegue até o diretório do seu projeto

```bash
cd meu-projeto
```

### 2. Execute o comando init

```bash
# Uso básico (português)
setai init

# Com idioma específico
setai init --lang en
setai init --lang es
```

### 3. Responda as perguntas

O CLI fará perguntas sobre:
- Nome do projeto
- Descrição e objetivos
- Stack tecnológica
- Preferências de desenvolvimento

### 4. Estrutura gerada

Após responder as perguntas, a estrutura será gerada na pasta apropriada (`.cursor`, `.vscode`, `.idea`, ou `.ai`).

---

## 📋 Primeiro Uso Passo a Passo

### Passo 1: Seleção de IDE

Ao executar `setai init`, você será perguntado qual IDE está usando:

```
? Qual IDE você está usando?
  ❯ Cursor
    VS Code
    JetBrains (IntelliJ, WebStorm, etc.)
    Outra IDE / Genérico (.ai)
```

**O que isso faz:**
- Determina a pasta de configuração (`.cursor`, `.vscode`, `.idea`, ou `.ai`)
- Personaliza a estrutura para sua IDE

### Passo 2: Informações Básicas do Projeto

Você será perguntado sobre:

1. **Nome do Projeto**
   ```
   ? Qual o nome do projeto?
   > meu-projeto
   ```

2. **Descrição do Problema**
   ```
   ? Descreva o problema que este projeto resolve:
   > Sistema de gerenciamento de tarefas para equipes
   ```

3. **Importância do Problema**
   ```
   ? Por que este problema importa?
   > Aumenta produtividade e organização da equipe
   ```

4. **Usuários Principais**
   ```
   ? Quem são os usuários principais deste projeto?
   > Desenvolvedores, Product Managers, Tech Leads
   ```

5. **Objetivos de Negócio**
   ```
   ? Quais são os objetivos de negócio principais?
   > Reduzir tempo de desenvolvimento, melhorar qualidade
   ```

6. **Restrições**
   ```
   ? Quais são as restrições técnicas?
   > Deve funcionar offline, suportar múltiplos navegadores
   ```

### Passo 3: Stack Tecnológica

1. **Linguagem**
   ```
   ? Qual a linguagem principal do projeto?
   ❯ TypeScript
     JavaScript
     Python
     Go
     Rust
     Outro
   ```

2. **Framework** (se aplicável)
   ```
   ? Qual framework você está usando?
   ❯ Next.js
     React
     Vue
     Angular
     Express
     Nenhum
     Outro
   ```

3. **Banco de Dados**
   ```
   ? Qual banco de dados você está usando?
   ❯ PostgreSQL
     MySQL
     MongoDB
     SQLite
     Supabase
     Nenhum
     Outro
   ```

### Passo 4: Preferências

1. **TDD**
   ```
   ? Você usa TDD (Test-Driven Development)?
   ❯ Yes
     No
   ```

2. **Strict Mode** (se TypeScript)
   ```
   ? Você prefere modo strict no TypeScript?
   ❯ Yes
     No
   ```

### Passo 5: Confirmação

Após responder todas as perguntas, você verá um resumo:

```
✅ Informações coletadas:
   Projeto: meu-projeto
   Versão: 0.1.0
   Linguagem: TypeScript
   IDE: Cursor
   Pasta: .cursor/
```

### Passo 6: Estrutura Gerada

A estrutura será criada automaticamente:

```
🎉 Estrutura .cursor/ gerada com sucesso!

Próximos passos:
  1. Revise os arquivos gerados em .cursor/
  2. Preencha os templates com informações específicas do seu projeto
  3. Configure lint e formatter conforme documentado em .cursor/rules/code-style.md
```

---

## 📁 Estrutura Gerada

Após executar `setai init`, você terá a seguinte estrutura:

```
.cursor/
├── README.md                    # Visão geral e guia de uso
├── context/
│   ├── project-goals.md         # Objetivos e contexto do projeto
│   ├── tech-stack.md            # Stack tecnológica
│   ├── architecture.md          # Decisões arquiteturais
│   └── deployment.md            # Estratégia de deploy
├── rules/
│   ├── code-style.md            # Regras de estilo de código
│   ├── testing-rules.md         # Regras de testes
│   ├── git-rules.md             # Regras de Git
│   ├── security-rules.md        # Regras de segurança
│   ├── ai-usage-rules.md        # Regras de uso de IA
│   └── business-rules.md        # Regras de negócio
├── libs/
│   ├── allowed-libs.md          # Bibliotecas permitidas
│   ├── forbidden-libs.md        # Bibliotecas proibidas
│   └── ai-models.md             # Modelos de IA recomendados
└── commands/
    ├── architecture-review.md   # Comando de revisão arquitetural
    ├── refactor-controlled.md   # Comando de refatoração controlada
    ├── generate-docs.md         # Comando de geração de docs
    └── test-strategy.md         # Comando de estratégia de testes
```

---

## ✅ Verificação

Após a geração, verifique:

1. **Estrutura criada:**
   ```bash
   ls -la .cursor/
   ```

2. **Arquivos preenchidos:**
   ```bash
   cat .cursor/context/project-goals.md
   ```

3. **Conteúdo personalizado:**
   - Verifique se seu nome de projeto aparece nos arquivos
   - Confirme que a stack tecnológica está correta
   - Valide que os objetivos estão documentados

---

## 🎯 Próximos Passos

Agora que você tem a estrutura básica:

1. **Revise os arquivos gerados**
   - Leia `.cursor/README.md` para entender a estrutura
   - Revise `.cursor/context/project-goals.md`

2. **Configure Lint e Formatter**
   - Siga as instruções em `.cursor/rules/code-style.md`
   - Configure ESLint e Prettier

3. **Personalize as Regras**
   - Ajuste `.cursor/rules/` conforme necessário
   - Adicione regras específicas do seu projeto

4. **Explore Opções Avançadas**
   - Veja [Uso Avançado](./USAGE_ADVANCED.md)
   - Experimente `setai init --advanced`

5. **Configure Integração com IA**
   - Veja [Modo Beta](./USAGE_BETA.md)
   - Execute `setai config` para configurar API keys

6. **Configure Idioma (Opcional)**
   - Execute `setai config` e escolha "🌐 Configurar idioma"
   - Ou use `setai init --lang <idioma>` para definir idioma das perguntas e arquivos
   - Idiomas suportados: pt-BR (padrão), en, es

---

## 💡 Dicas

- **Primeira vez?** Use `setai init` sem flags para começar simples
- **Projeto existente?** O CLI detecta estruturas existentes e pergunta se deseja sobrescrever
- **Múltiplos projetos?** Execute `setai init` em cada diretório de projeto
- **Personalização?** Use `setai init --advanced` para mais opções

---

## ❓ Problemas Comuns

### "Comando não encontrado"

**Solução:** Verifique se o pacote foi instalado globalmente:
```bash
npm list -g @setai/cli
```

### "Permissão negada"

**Solução:** Use `sudo` (Linux/macOS) ou execute como administrador (Windows):
```bash
sudo npm install -g @setai/cli
```

### "Estrutura já existe"

**Solução:** O CLI pergunta se deseja sobrescrever. Responda `Yes` se quiser substituir.

---

## 📚 Próximos Guias

- [**Uso Básico**](./USAGE_BASIC.md) - Comandos e funcionalidades básicas
- [**Uso Avançado**](./USAGE_ADVANCED.md) - Configurações avançadas
- [**Modo Beta**](./USAGE_BETA.md) - Integração com IA
- [**Exemplos**](./EXAMPLES.md) - Exemplos práticos

