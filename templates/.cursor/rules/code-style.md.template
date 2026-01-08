# Code Style Rules

## Objetivo
Este arquivo define regras duras de estilo de código. Estas são regras, não sugestões.

## Escopo
- Padrões de código obrigatórios
- Convenções de nomenclatura
- Formatação
- Estrutura de arquivos

---

## General Rules

### Lint & Formatting Configuration - OBRIGATÓRIO

**CRITICAL: Configurações de lint DEVEM ser feitas antes de qualquer desenvolvimento**

Antes de começar a escrever código, o projeto DEVE ter:

1. **ESLint configurado:**
   - Arquivo de configuração: `.eslintrc.js`, `eslint.config.js` ou `eslint.config.mjs`
   - Extensões TypeScript instaladas e configuradas
   - Regras alinhadas com as convenções do projeto
   - Integração com Prettier (evitar conflitos)

2. **Prettier configurado:**
   - Arquivo de configuração: `.prettierrc`, `.prettierrc.js` ou `prettier.config.js`
   - Regras de formatação definidas
   - Integração com ESLint via `eslint-config-prettier`

3. **TypeScript configurado:**
   - Arquivo `tsconfig.json` com configurações apropriadas
   - Strict mode habilitado
   - Target e module apropriados (ESM para este projeto)

4. **Scripts no package.json:**
   - `lint`: Executar ESLint
   - `lint:fix`: Corrigir problemas automaticamente
   - `format`: Formatar código com Prettier
   - `type-check`: Verificar tipos TypeScript

5. **Git Hooks (opcional mas recomendado):**
   - Pre-commit hook para executar lint e format (ver `.cursor/rules/git-rules.md`)
   - Pre-push hook para executar testes (ver `.cursor/rules/git-rules.md`)

**Sem essas configurações, o desenvolvimento NÃO deve começar.**

### Code Formatting
- Use formatter automático (Prettier) antes de commit
- Não commite código não formatado
- Formatação é verificada no CI/CD
- **Lint e format devem passar antes de qualquer commit**

### Language Rules

**CRITICAL: Idioma do código vs comentários**

- **Código (100% em inglês):**
  - Nomes de variáveis, funções, classes, interfaces, tipos: **sempre em inglês**
  - Strings literais no código (mensagens de erro, logs): **sempre em inglês**
  - Nomes de arquivos e diretórios: **sempre em inglês**
  - Mensagens de commit: **sempre em inglês**
  - Documentação de código (JSDoc, docstrings): **sempre em inglês**

- **Comentários (pt-BR):**
  - Comentários inline (`//`, `/* */`): **sempre em português brasileiro**
  - Comentários explicativos: **sempre em português brasileiro**
  - Comentários de TODO/FIXME: **sempre em português brasileiro**

**Exceções:**
- Strings exibidas ao usuário final (CLI output, mensagens de UI): podem ser em pt-BR se aplicável
- Documentação de usuário (README, docs): podem ser em pt-BR

### Naming Conventions
- **Variables:** camelCase (JavaScript/TypeScript) ou snake_case (Python)
- **Functions:** camelCase ou snake_case (seguir padrão da linguagem)
- **Classes:** PascalCase
- **Constants:** UPPER_SNAKE_CASE
- **Files:** kebab-case ou snake_case

### Comments
- Comente apenas quando necessário para clareza
- Evite comentários óbvios
- Use comentários para explicar "por quê", não "o quê"
- **IMPORTANTE:** Todos os comentários devem ser escritos em **português brasileiro (pt-BR)**

---

## Testing Rules

> Ver `.cursor/rules/testing-rules.md` para detalhes completos

- **TDD é OBRIGATÓRIO:** Testes devem ser escritos ANTES do código
- Write tests for business logic
- Tests must be deterministic
- Use descriptive test names
- One assertion per test when possible
- **NUNCA commite código sem teste correspondente**

---

## Git Rules

> Ver `.cursor/rules/git-rules.md` para detalhes completos

- Follow conventional commits
- One logical change per commit
- Write clear commit messages

---

## Prohibited Patterns

### Do NOT
- **Começar desenvolvimento sem configuração de lint**
- Use `any` type (TypeScript) or untyped code
- Commit commented-out code
- Use magic numbers/strings
- Create circular dependencies
- Use `eval()` or similar dangerous functions
- Hardcode credentials or secrets
- Commit código que não passou no lint
- Desabilitar regras de lint sem justificativa

---

## Lint Configuration Checklist

Antes de começar o desenvolvimento, verificar:

- [ ] ESLint instalado e configurado
- [ ] Prettier instalado e configurado
- [ ] TypeScript configurado (tsconfig.json)
- [ ] Scripts de lint/format no package.json
- [ ] Integração ESLint + Prettier funcionando
- [ ] Git hooks configurados (opcional mas recomendado)
- [ ] CI/CD configurado para verificar lint

## Related Documentation

- **Testing Rules:** `.cursor/rules/testing-rules.md`
- **Git Rules:** `.cursor/rules/git-rules.md`
- **Tech Stack:** `.cursor/context/tech-stack.md`
- **AI Usage Rules:** `.cursor/rules/ai-usage-rules.md`

