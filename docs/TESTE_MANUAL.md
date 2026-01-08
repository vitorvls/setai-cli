# Como Testar Manualmente o SetAI CLI

## Método 1: Teste Interativo (Recomendado)

### ⚠️ IMPORTANTE: Teste em um diretório LIMPO

**O CLI detecta se `.cursor` já existe e pergunta se deseja sobrescrever ANTES das outras perguntas. Para ver todas as perguntas, teste em um diretório que NÃO tenha `.cursor`.**

### Passo 1: Build do projeto
```bash
pnpm build
```

### Passo 2: Criar diretório de teste LIMPO
```bash
mkdir test-manual
cd test-manual
```

**Certifique-se de que este diretório NÃO tenha `.cursor/`**

### Passo 3: Executar o CLI
```bash
node ../dist/index.js init
```

### Passo 4: Responder as perguntas
O CLI fará as seguintes perguntas interativamente:

1. **Qual o nome do projeto?** 
   - Digite um nome (ex: `meu-projeto`)

2. **Qual a linguagem principal do projeto?**
   - Use as setas ↑↓ para navegar
   - Pressione Enter para selecionar
   - Opções: TypeScript, JavaScript, Python, Go, Rust, Outro

3. **Qual framework você está usando?**
   - Aparece apenas se escolheu TypeScript ou JavaScript
   - Opções: Next.js, React, Vue, Angular, Express, FastAPI, Django, Nenhum, Outro

4. **Qual banco de dados você está usando?**
   - Opções: PostgreSQL, MySQL, MongoDB, SQLite, Supabase, Nenhum, Outro

5. **Você usa TDD (Test-Driven Development)?**
   - Pressione `Y` para Sim ou `N` para Não
   - Padrão: Sim (Y)

6. **Você prefere modo strict no TypeScript?**
   - Aparece apenas se escolheu TypeScript
   - Pressione `Y` para Sim ou `N` para Não
   - Padrão: Sim (Y)

### Passo 5: Verificar resultado
Após responder todas as perguntas, você verá:

```
✅ Informações coletadas:
   Projeto: meu-projeto
   Linguagem: TypeScript

📝 Processando templates...
📁 Gerando arquivos...

✅ Estrutura .cursor criada com sucesso!

Arquivos criados:
  ✓ .cursor/README.md
  ✓ .cursor/context/project-goals.md
  ✓ .cursor/context/tech-stack.md
  ... (e mais arquivos)

🎉 Estrutura .cursor gerada com sucesso!
```

### Passo 6: Verificar arquivos gerados

**No Windows (PowerShell):**
```powershell
# Ver estrutura completa
Get-ChildItem -Path .cursor -Recurse

# Ver conteúdo de um arquivo
Get-Content .cursor/context/tech-stack.md
```

**No Linux/Mac:**
```bash
# Ver estrutura completa
tree .cursor
# ou
find .cursor -type f

# Ver conteúdo de um arquivo
cat .cursor/context/tech-stack.md
```

### Passo 7: Verificar placeholders substituídos

Abra `.cursor/context/tech-stack.md` e verifique se:
- `{{LANGUAGE}}` foi substituído pela linguagem escolhida
- `{{FRAMEWORK}}` foi substituído pelo framework escolhido
- `{{DATABASE}}` foi substituído pelo banco escolhido

### Passo 8: Limpar teste

```bash
cd ..
rm -rf test-manual
# ou no Windows:
Remove-Item -Path test-manual -Recurse -Force
```

## Método 2: Teste com npm link (Desenvolvimento)

### Passo 1: Link local
```bash
# Na raiz do projeto setai
pnpm build
npm link
```

### Passo 2: Testar em outro diretório
```bash
cd /caminho/para/outro/projeto
setai init
```

## Checklist de Verificação

Após executar o teste, verifique:

- [ ] Diretório `.cursor/` foi criado
- [ ] Todos os subdiretórios foram criados:
  - [ ] `.cursor/context/`
  - [ ] `.cursor/rules/`
  - [ ] `.cursor/libs/`
  - [ ] `.cursor/commands/`
- [ ] Todos os arquivos foram gerados (24 arquivos no total)
- [ ] Placeholders foram substituídos nos templates
- [ ] Estrutura está completa e funcional
- [ ] Nenhum erro foi exibido durante a execução

## Troubleshooting

### ⚠️ Problema: "As perguntas não aparecem"

**Causa mais comum:** Você está executando em um diretório que já tem `.cursor/`

**Solução:**
1. Execute em um diretório **limpo** (sem `.cursor/`)
2. Ou responda a primeira pergunta: "Deseja sobrescrever?" com `Y` para continuar

**Exemplo:**
```bash
# ❌ ERRADO - Se executar aqui (onde já tem .cursor), verá apenas a pergunta de sobrescrever
cd /projeto/com/.cursor
node ../setai/dist/index.js init

# ✅ CORRETO - Execute em diretório limpo
mkdir test-manual
cd test-manual
node ../setai/dist/index.js init
```

### Erro: "User force closed the prompt"
- **Causa:** Terminal não está em modo interativo ou você não respondeu a pergunta
- **Solução:** Certifique-se de estar em um terminal interativo e responda as perguntas

### Erro: "Sem permissão de escrita"
- Verifique se você tem permissão de escrita no diretório
- Tente executar em outro diretório

### Erro: "Erro ao carregar template"
- Verifique se o build foi executado: `pnpm build`
- Verifique se a pasta `templates/` existe na raiz do projeto

### CLI não responde
- Certifique-se de estar em um terminal interativo
- Não execute em ambientes CI/CD sem input interativo
