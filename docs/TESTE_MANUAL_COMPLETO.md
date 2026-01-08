# 🧪 Guia Completo de Teste Manual - SetAI CLI

Este guia mostra como testar manualmente todas as funcionalidades do SetAI CLI.

## 📋 Pré-requisitos

1. **Build do projeto:**
   ```bash
   pnpm build
   ```

2. **Verificar se o build foi bem-sucedido:**
   ```bash
   ls dist/index.js
   ```

## 🚀 Método 1: Teste Básico (Recomendado para iniciantes)

### Passo 1: Criar diretório de teste limpo

```bash
# No diretório raiz do projeto
mkdir test-manual
cd test-manual
```

**⚠️ IMPORTANTE:** Certifique-se de que este diretório **NÃO** tenha `.cursor/`, `.vscode/`, `.idea/` ou `.ai/` para ver todas as perguntas.

### Passo 2: Executar o CLI

```bash
# Do diretório test-manual
node ../dist/index.js init
```

Ou usando o script do package.json:

```bash
# Do diretório raiz
pnpm run cli init
```

### Passo 3: Responder as perguntas básicas

O CLI fará as seguintes perguntas:

1. **Qual IDE você está usando?**
   - Use ↑↓ para navegar
   - Opções: Cursor, VS Code, JetBrains, Outra IDE
   - **Teste:** Escolha "Cursor" (padrão)

2. **Qual o nome do projeto?**
   - Digite: `meu-projeto-teste`

3. **Qual a descrição do projeto?**
   - Digite: `Projeto de teste do SetAI CLI`

4. **Qual a importância do problema que este projeto resolve?**
   - Digite: `Testar funcionalidades do CLI`

5. **Quem são os usuários principais?**
   - Digite: `Desenvolvedores`

6. **Quais são os objetivos de negócio?**
   - Digite: `Automatizar configuração de projetos`

7. **Quais são as restrições técnicas?**
   - Digite: `Nenhuma` ou pressione Enter

8. **Quais são as restrições de negócio?**
   - Digite: `Nenhuma` ou pressione Enter

9. **Quais são os não-objetivos (o que NÃO vamos fazer)?**
   - Digite: `Não vamos criar uma aplicação web completa`

10. **Qual a versão inicial do projeto?**
    - Digite: `1.0.0` ou pressione Enter

11. **Qual a linguagem principal do projeto?**
    - Use ↑↓ para navegar
    - Opções: TypeScript, JavaScript, Python, Go, Rust, Outro
    - **Teste:** Escolha "TypeScript"

12. **Qual framework você está usando?** (aparece se escolheu TS/JS)
    - Use ↑↓ para navegar
    - Opções: Next.js, React, Vue, Angular, Express, FastAPI, Django, Nenhum, Outro
    - **Teste:** Escolha "Next.js"

13. **Qual banco de dados você está usando?**
    - Use ↑↓ para navegar
    - Opções: PostgreSQL, MySQL, MongoDB, SQLite, Supabase, Nenhum, Outro
    - **Teste:** Escolha "PostgreSQL"

14. **Você usa TDD (Test-Driven Development)?**
    - Pressione `Y` (Sim) ou `N` (Não)
    - Padrão: `Y`

15. **Você prefere modo strict no TypeScript?** (aparece se escolheu TS)
    - Pressione `Y` (Sim) ou `N` (Não)
    - Padrão: `Y`

### Passo 4: Verificar resultado

Após responder todas as perguntas, você verá:

```
✅ Informações coletadas:
   Projeto: meu-projeto-teste
   Versão: 1.0.0
   Linguagem: TypeScript
   IDE: Cursor
   Pasta: .cursor/

📝 Processando templates...

📁 Gerando arquivos...

🎉 Estrutura .cursor/ gerada com sucesso!

Próximos passos:
  1. Revise os arquivos gerados em .cursor/
  2. Preencha os templates com informações específicas do seu projeto
  3. Configure lint e formatter conforme documentado em .cursor/rules/code-style.md
```

### Passo 5: Verificar arquivos gerados

```bash
# Listar estrutura criada
ls -la .cursor/

# Ver conteúdo de um arquivo
cat .cursor/README.md
cat .cursor/context/project-goals.md
```

## 🎯 Método 2: Teste com Modo Avançado

### Executar com `--advanced`

```bash
cd test-manual
node ../dist/index.js init --advanced
```

**O que muda:**
- Após as perguntas básicas, você verá um menu para escolher grupos avançados
- Pode escolher múltiplos grupos na ordem que desejar
- Grupos já respondidos não aparecem novamente

**Grupos disponíveis:**
1. 🤖 AI Usage Rules - Modelos preferidos e regras de uso de IA
2. 👥 Responsabilidades - CTO, Tech Lead, Dev
3. 📚 Bibliotecas - Permitidas e proibidas
4. 🏗️ Arquitetura Detalhada - Decisões arquiteturais
5. 🔒 Segurança - Regras específicas de segurança
6. 🧪 Testes - Estratégia detalhada de testes
7. 📦 Deploy - Configurações de deploy
8. 📝 Documentação - Padrões de documentação

**Teste sugerido:**
- Escolha 2-3 grupos para testar
- Responda as perguntas de cada grupo
- Verifique que os grupos respondidos não aparecem mais na lista

## 🤖 Método 3: Teste com Modo Beta (IA)

### Pré-requisito: Configurar API Key

```bash
# Do diretório raiz
node dist/index.js config
```

**No menu interativo:**
1. Escolha "➕ Adicionar/Atualizar API Key"
2. Escolha um provedor (OpenAI, Anthropic, ou Google)
3. Digite sua API Key
4. Escolha o modelo padrão
5. Escolha "❌ Sair"

### Executar com `--beta`

```bash
cd test-manual
node ../dist/index.js init --beta
```

**O que acontece:**
- Após coletar informações básicas, o CLI usará IA para enriquecer:
  - Descrição do projeto
  - Importância do problema
  - Objetivos de negócio
  - Decisões arquiteturais
  - Melhores práticas
  - Diretrizes de uso de IA

**Teste sugerido:**
- Responda as perguntas básicas normalmente
- Observe as mensagens de enriquecimento com IA
- Verifique se os arquivos gerados contêm conteúdo enriquecido

## 🌐 Método 4: Teste com Diferentes Idiomas

### Teste em Inglês

```bash
cd test-manual
node ../dist/index.js init --lang en
```

**O que muda:**
- Todas as perguntas aparecem em inglês
- Todos os arquivos gerados são em inglês
- Templates usam versão `.cursor.en/`

### Teste em Espanhol

```bash
cd test-manual
node ../dist/index.js init --lang es
```

**O que muda:**
- Todas as perguntas aparecem em espanhol
- Todos os arquivos gerados são em espanhol
- Templates usam versão `.cursor.es/`

## 🎨 Método 5: Teste com Diferentes IDEs

### Teste com VS Code

```bash
cd test-manual
node ../dist/index.js init
```

**Quando perguntar a IDE:**
- Escolha "VS Code"
- Verifique que a pasta criada é `.vscode/` e não `.cursor/`

### Teste com JetBrains

```bash
cd test-manual
node ../dist/index.js init
```

**Quando perguntar a IDE:**
- Escolha "JetBrains (IntelliJ, WebStorm, etc.)"
- Verifique que a pasta criada é `.idea/`

### Teste com IDE Customizada

```bash
cd test-manual
node ../dist/index.js init
```

**Quando perguntar a IDE:**
- Escolha "Outra IDE / Genérico (.ai)"
- Digite uma pasta customizada (ex: `.ai`, `.config`)
- Verifique que a pasta criada é a que você especificou

## 🔄 Método 6: Teste de Overwrite (Pasta Existente)

### Passo 1: Criar estrutura existente

```bash
cd test-manual
mkdir .cursor
echo "# Teste" > .cursor/README.md
```

### Passo 2: Executar CLI

```bash
node ../dist/index.js init
```

**O que acontece:**
- O CLI detecta que `.cursor/` já existe
- Pergunta: "A estrutura .cursor/ já existe neste diretório. Deseja sobrescrever?"
- **Teste 1:** Responda `N` (Não) - Deve cancelar e sair
- **Teste 2:** Execute novamente e responda `Y` (Sim) - Deve sobrescrever

## ⚙️ Método 7: Teste do Comando Config

### Gerenciar API Keys

```bash
# Do diretório raiz
node dist/index.js config
```

**Testes sugeridos:**

1. **Adicionar API Key:**
   - Escolha "➕ Adicionar/Atualizar API Key"
   - Escolha "OpenAI"
   - Digite uma API key de teste (ex: `sk-test-123`)
   - Escolha modelo (ex: `gpt-4o`)
   - Verifique mensagem de sucesso

2. **Listar API Keys:**
   - Escolha "📋 Listar API Keys configuradas"
   - Verifique que OpenAI aparece como configurada

3. **Remover API Key:**
   - Escolha "➖ Remover API Key"
   - Escolha "OpenAI"
   - Confirme a remoção
   - Verifique mensagem de sucesso

4. **Testar todos os providers:**
   - Adicione API keys para OpenAI, Anthropic e Google
   - Liste novamente e verifique que todos aparecem

## 🧹 Limpeza entre Testes

### Limpar diretório de teste

```bash
# Do diretório test-manual
rm -rf .cursor .vscode .idea .ai .config
```

Ou no Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .cursor, .vscode, .idea, .ai, .config -ErrorAction SilentlyContinue
```

## 📝 Checklist de Teste Manual Completo

### ✅ Testes Básicos
- [ ] Executar `init` sem opções
- [ ] Verificar que todas as perguntas aparecem
- [ ] Verificar que arquivos são gerados corretamente
- [ ] Verificar conteúdo dos arquivos gerados

### ✅ Testes de IDEs
- [ ] Testar com Cursor (`.cursor/`)
- [ ] Testar com VS Code (`.vscode/`)
- [ ] Testar com JetBrains (`.idea/`)
- [ ] Testar com IDE customizada (`.ai` ou outra)

### ✅ Testes de Modos
- [ ] Testar modo básico (`init`)
- [ ] Testar modo avançado (`init --advanced`)
- [ ] Testar modo beta (`init --beta`)
- [ ] Testar modo completo (`init --advanced --beta`)

### ✅ Testes de Idiomas
- [ ] Testar em Português (padrão)
- [ ] Testar em Inglês (`--lang en`)
- [ ] Testar em Espanhol (`--lang es`)

### ✅ Testes de Edge Cases
- [ ] Testar com pasta existente (overwrite)
- [ ] Testar cancelamento de overwrite
- [ ] Testar com respostas vazias (deve validar)
- [ ] Testar com caracteres especiais no nome do projeto

### ✅ Testes de Config
- [ ] Adicionar API key (todos os providers)
- [ ] Listar API keys
- [ ] Remover API key
- [ ] Verificar arquivo de configuração (`~/.setai/config.json`)

## 🐛 Troubleshooting

### Problema: "Cannot find module"
**Solução:**
```bash
pnpm build
```

### Problema: "Sem permissão de escrita"
**Solução:**
- Verifique permissões do diretório
- Execute em um diretório onde você tem permissão de escrita

### Problema: "Perguntas não aparecem"
**Solução:**
- Certifique-se de que está em um diretório limpo (sem `.cursor/`)
- Ou remova a pasta existente antes de testar

### Problema: "Erro ao usar IA"
**Solução:**
- Verifique se configurou API key corretamente (`setai config`)
- Verifique se a API key é válida
- O CLI continuará mesmo se a IA falhar (modo beta)

## 📊 Resultado Esperado

Após um teste bem-sucedido, você deve ter:

```
.cursor/
├── README.md
├── context/
│   ├── project-goals.md
│   ├── tech-stack.md
│   ├── architecture.md
│   └── deployment.md
├── rules/
│   ├── code-style.md
│   ├── business-rules.md
│   ├── git-rules.md
│   ├── security-rules.md
│   ├── testing-rules.md
│   └── ai-usage-rules.md (se --advanced)
├── libs/
│   ├── allowed-libs.md
│   ├── forbidden-libs.md
│   └── ai-models.md (se --advanced)
└── commands/
    └── (vários arquivos de comandos)
```

## 🎯 Comandos Rápidos de Referência

```bash
# Build
pnpm build

# Teste básico
pnpm run cli init

# Teste avançado
pnpm run cli init --advanced

# Teste beta
pnpm run cli init --beta

# Teste completo
pnpm run cli init --advanced --beta

# Teste em inglês
pnpm run cli init --lang en

# Configurar API keys
pnpm run cli config

# Ajuda
pnpm run cli --help
pnpm run cli init --help
```

---

**Dica:** Para testes mais rápidos, crie um script que limpa e executa automaticamente!
