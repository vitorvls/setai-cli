# SetAI CLI

CLI Tool para gerar automaticamente a estrutura de configuração `.cursor` através de perguntas interativas, aplicando boas práticas de desenvolvimento com IA em novos projetos.

## 🌐 Idioma / Language

**🇧🇷 Português (Brasil) - Versão Atual**

Esta versão do SetAI CLI está **totalmente em Português (pt-BR)**:
- ✅ Todas as perguntas interativas são em português
- ✅ Todos os arquivos gerados são em português
- ✅ Documentação principal em português
- ✅ Mensagens e feedback em português

**📋 Roadmap de Internacionalização:**

- [ ] Suporte a Inglês (EN) - Perguntas e arquivos
- [ ] Suporte a Espanhol (ES) - Perguntas e arquivos
- [ ] Configuração de idioma das perguntas
- [ ] Configuração de idioma dos arquivos gerados
- [ ] Documentação completa em múltiplos idiomas

**🇺🇸 English**

**Current Version: Portuguese (pt-BR) Only**

This version of SetAI CLI is **fully in Portuguese (pt-BR)**:
- ✅ All interactive questions are in Portuguese
- ✅ All generated files are in Portuguese
- ✅ Main documentation is in Portuguese
- ✅ Messages and feedback are in Portuguese

**📋 Internationalization Roadmap:**

- [ ] English (EN) support - Questions and files
- [ ] Spanish (ES) support - Questions and files
- [ ] Language configuration for questions
- [ ] Language configuration for generated files
- [ ] Complete documentation in multiple languages

**📖 Documentation:**

- 🇧🇷 [Documentação em Português](./docs/Documentation/README.md)
- 🇺🇸 [Documentation in English](./docs/Documentation/en/README.md) (Coming Soon)

## 🎯 Objetivo

Facilitar a configuração inicial de projetos que usam IA para desenvolvimento (especialmente Cursor), gerando automaticamente a estrutura completa `.cursor` com todas as regras, contexto e configurações necessárias.

## 🚀 Instalação

```bash
npm install -g @setai/cli
```

Ou use com `npx`:

```bash
npx @setai/cli init
```

## 📖 Uso

### Uso Básico

```bash
setai init
```

### Uso Avançado

```bash
setai init --advanced
```

O comando `--advanced` inclui perguntas opcionais sobre:
- Modelos de IA preferidos por fase (Arquitetura, Implementação, Refatoração, etc.)
- Regras de uso de IA (permitir/proibir por categoria)
- Responsabilidades (CTO, Tech Lead, Dev)
- Restrições customizadas

### O que o comando faz

O comando irá:

1. Fazer perguntas interativas sobre seu projeto
2. Coletar informações sobre stack tecnológica
3. Validar as informações coletadas
4. Processar templates com os dados do projeto
5. Gerar a estrutura completa `.cursor/` com todos os arquivos necessários

### Exemplo de Uso

```bash
$ setai init
🚀 Iniciando geração da estrutura .cursor...

? Qual o nome do projeto? my-awesome-project
? Qual a linguagem principal do projeto? TypeScript
? Qual framework você está usando? Next.js
? Qual banco de dados você está usando? PostgreSQL
? Você usa TDD (Test-Driven Development)? Yes
? Você prefere modo strict no TypeScript? Yes

✅ Informações coletadas:
   Projeto: my-awesome-project
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

## 🧪 Como Testar Manualmente

### Teste Rápido

1. **Build do projeto:**
   ```bash
   pnpm build
   ```

2. **Criar diretório de teste:**
   ```bash
   mkdir test-manual
   cd test-manual
   ```

3. **Executar o CLI:**
   ```bash
   node ../dist/index.js init
   ```

4. **Responder as perguntas interativamente:**
   - Nome do projeto
   - Linguagem (TypeScript, JavaScript, etc.)
   - Framework (se aplicável)
   - Banco de dados
   - Preferências (TDD, strict mode)

5. **Verificar resultado:**
   ```bash
   # Ver estrutura criada
   ls .cursor/
   # ou no Windows:
   dir .cursor
   ```

6. **Limpar teste:**
   ```bash
   cd ..
   rm -rf test-manual
   # ou no Windows:
   Remove-Item -Path test-manual -Recurse -Force
   ```

> **Nota:** Para mais detalhes, veja `TESTE_MANUAL.md`

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 18+ (LTS recomendado)
- pnpm (preferido) ou npm

### Setup

```bash
# Instalar dependências
pnpm install

# Executar lint
pnpm lint

# Executar formatação
pnpm format

# Verificar tipos
pnpm type-check

# Executar testes
pnpm test
```

### Scripts Disponíveis

- `pnpm build` - Compilar TypeScript
- `pnpm dev` - Modo desenvolvimento (watch)
- `pnpm lint` - Executar ESLint
- `pnpm lint:fix` - Corrigir problemas de lint automaticamente
- `pnpm format` - Formatar código com Prettier
- `pnpm type-check` - Verificar tipos TypeScript
- `pnpm test` - Executar testes
- `pnpm test:watch` - Executar testes em modo watch
- `pnpm test:coverage` - Gerar relatório de cobertura

## 📋 Tecnologias

- **TypeScript** - Linguagem principal
- **Commander.js** - Framework CLI
- **Inquirer.js** - Prompts interativos
- **Vitest** - Framework de testes
- **tsup** - Build tool
- **ESLint + Prettier** - Qualidade de código

## 📝 Licença

MIT
