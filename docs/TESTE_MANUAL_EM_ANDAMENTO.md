# 🎯 Teste Manual - O que Esperar

## ✅ Status Atual

Você executou:
```bash
cd test-manual
node ../dist/index.js init
```

O CLI está **funcionando corretamente** e aguardando suas respostas interativas.

## 📝 O que Você Verá (em ordem)

### 1. Mensagem Inicial
```
🚀 Iniciando geração da estrutura de configuração para IA...
```

### 2. Primeira Pergunta: IDE
```
? Qual IDE você está usando? (Use arrow keys)
❯ Cursor
  VS Code
  JetBrains (IntelliJ, WebStorm, etc.)
  Outra IDE / Genérico (.ai)
```

**Ação:** Use ↑↓ para navegar e Enter para selecionar (recomendo "Cursor")

### 3. Se escolheu "Outra IDE"
```
? Qual o nome da pasta de configuração? (.ai)
```

**Ação:** Digite o nome da pasta (ex: `.ai`) e pressione Enter

### 4. Perguntas Básicas do Projeto

Você verá uma série de perguntas:

```
? Qual o nome do projeto?
```

**Ação:** Digite um nome (ex: `meu-projeto-teste`) e pressione Enter

```
? Qual a descrição do projeto?
```

**Ação:** Digite uma descrição e pressione Enter

```
? Qual a importância do problema que este projeto resolve?
```

**Ação:** Digite uma resposta e pressione Enter

```
? Quem são os usuários principais?
```

**Ação:** Digite uma resposta e pressione Enter

```
? Quais são os objetivos de negócio?
```

**Ação:** Digite uma resposta e pressione Enter

```
? Quais são as restrições técnicas?
```

**Ação:** Digite "Nenhuma" ou pressione Enter

```
? Quais são as restrições de negócio?
```

**Ação:** Digite "Nenhuma" ou pressione Enter

```
? Quais são os não-objetivos (o que NÃO vamos fazer)?
```

**Ação:** Digite uma resposta e pressione Enter

```
? Qual a versão inicial do projeto? (1.0.0)
```

**Ação:** Pressione Enter para usar o padrão ou digite outra versão

### 5. Perguntas de Stack Tecnológica

```
? Qual a linguagem principal do projeto? (Use arrow keys)
❯ TypeScript
  JavaScript
  Python
  Go
  Rust
  Outro
```

**Ação:** Use ↑↓ para navegar e Enter para selecionar

```
? Qual framework você está usando? (Use arrow keys)
❯ Next.js
  React
  Vue
  Angular
  Express
  FastAPI
  Django
  Nenhum
  Outro
```

**Ação:** Use ↑↓ para navegar e Enter para selecionar

```
? Qual banco de dados você está usando? (Use arrow keys)
❯ PostgreSQL
  MySQL
  MongoDB
  SQLite
  Supabase
  Nenhum
  Outro
```

**Ação:** Use ↑↓ para navegar e Enter para selecionar

### 6. Perguntas de Preferências

```
? Você usa TDD (Test-Driven Development)? (Y/n)
```

**Ação:** Pressione `Y` para Sim ou `N` para Não

```
? Você prefere modo strict no TypeScript? (Y/n)
```

**Ação:** Pressione `Y` para Sim ou `N` para Não (só aparece se escolheu TypeScript)

### 7. Resultado Final

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

## 🔍 Verificar Resultado

Após o comando terminar, verifique:

```bash
# Listar arquivos gerados
ls -la .cursor/

# Ver conteúdo de um arquivo
cat .cursor/README.md
cat .cursor/context/project-goals.md
```

## ⚠️ Se o Comando Não Responder

Se o comando parecer travado:

1. **Verifique se está aguardando input** - Pressione Enter
2. **Verifique se há erro** - Veja mensagens de erro no terminal
3. **Tente novamente** - Pressione Ctrl+C para cancelar e execute novamente

## 🎯 Respostas de Exemplo Rápido

Para um teste rápido, use estas respostas:

- **IDE:** Cursor (primeira opção, Enter)
- **Nome do projeto:** `teste-manual`
- **Descrição:** `Teste manual do SetAI CLI`
- **Importância:** `Validar funcionalidades`
- **Usuários:** `Desenvolvedores`
- **Objetivos:** `Automatizar configuração`
- **Restrições técnicas:** `Nenhuma` (Enter)
- **Restrições de negócio:** `Nenhuma` (Enter)
- **Não-objetivos:** `Não criar app completo`
- **Versão:** `1.0.0` (Enter)
- **Linguagem:** TypeScript (Enter)
- **Framework:** Next.js (Enter)
- **Banco:** PostgreSQL (Enter)
- **TDD:** Y (Enter)
- **Strict mode:** Y (Enter)

## 📚 Próximos Testes

Após este teste básico, experimente:

```bash
# Teste avançado
node ../dist/index.js init --advanced

# Teste beta (precisa configurar API key primeiro)
node ../dist/index.js config  # Configure API key
node ../dist/index.js init --beta

# Teste em inglês
node ../dist/index.js init --lang en
```

---

**Dica:** Se estiver testando várias vezes, limpe a pasta antes:
```bash
rm -rf .cursor
```
