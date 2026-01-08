# Forbidden Libraries

## Objetivo
Este arquivo lista bibliotecas proibidas no projeto, com motivo da proibição e alternativas.

## Escopo
- Bibliotecas proibidas
- Motivo da proibição
- Alternativas recomendadas

---



## CLI Libraries

### CLI Frameworks

#### Yargs
- **Status:** NOT ALLOWED (unless Commander.js não atender)
- **Reason:** Commander.js é mais popular e suficiente
- **Alternative:** Commander.js

#### Meow / Gluegun
- **Status:** NOT ALLOWED
- **Reason:** Commander.js é padrão da indústria
- **Alternative:** Commander.js

### Prompt Libraries

#### Enquirer (sem Inquirer.js)
- **Status:** NOT ALLOWED (unless Inquirer.js não atender)
- **Reason:** Inquirer.js é mais popular e estável
- **Alternative:** Inquirer.js

#### prompts (sem Inquirer.js)
- **Status:** NOT ALLOWED
- **Reason:** Inquirer.js tem melhor suporte e documentação
- **Alternative:** Inquirer.js

---

## File System Libraries

### Deprecated/Unsafe

#### fs (nativo sem fs-extra)
- **Status:** NOT ALLOWED para operações complexas
- **Reason:** fs-extra tem API melhor e cross-platform
- **Alternative:** fs-extra (usa fs nativo internamente)

#### rimraf (sem necessidade)
- **Status:** NOT ALLOWED (a menos que necessário para o projeto)
- **Reason:** [A definir - razão específica do projeto]
- **Alternative:** [A definir - alternativa se necessário]

---

## Template Libraries

### Overkill

#### EJS / Pug / Mustache (sem necessidade)
- **Status:** NOT ALLOWED (a menos que Handlebars não atender)
- **Reason:** Handlebars ou template strings são suficientes
- **Alternative:** Handlebars ou template strings nativas

#### React/JSX para templates
- **Status:** NOT ALLOWED
- **Reason:** Overkill para CLI, não precisamos de React
- **Alternative:** Handlebars ou template strings

---

## Testing Libraries

### Deprecated/Unnecessary

#### Jest (se Vitest atender)
- **Status:** NOT ALLOWED (preferir Vitest)
- **Reason:** Vitest é mais rápido e compatível com ESM
- **Alternative:** Vitest

#### Mocha / Ava
- **Status:** NOT ALLOWED
- **Reason:** Vitest/Jest são padrão
- **Alternative:** Vitest

---

## Utility Libraries

### Unnecessary for CLI

#### Lodash / Underscore
- **Status:** NOT ALLOWED (a menos que realmente necessário)
- **Reason:** Bundle grande, maioria das funções não são necessárias
- **Alternative:** Funções nativas do JavaScript ou bibliotecas específicas

#### Axios / node-fetch
- **Status:** NOT ALLOWED (CLI não faz requisições HTTP)
- **Reason:** Não precisamos de HTTP client
- **Alternative:** N/A (não necessário)

---

## Build Tools

### Overkill/Deprecated

#### Webpack
- **Status:** NOT ALLOWED
- **Reason:** tsup/esbuild são mais rápidos e simples para CLI
- **Alternative:** tsup ou esbuild

#### Rollup (sem necessidade específica)
- **Status:** NOT ALLOWED (a menos que tsup não atender)
- **Reason:** tsup é mais simples e suficiente
- **Alternative:** tsup

---

## General Rules

### Prohibited Patterns

1. **Any library with > 1MB bundle size** (unless critical)
   - **Reason:** Performance impact
   - **Action:** Evaluate alternatives

2. **Libraries with < 1000 weekly downloads**
   - **Reason:** Maintenance risk
   - **Action:** Get approval before using

3. **Libraries with no TypeScript support** (TypeScript projects)
   - **Reason:** Type safety
   - **Action:** Find typed alternative or create types

4. **Duplicate functionality**
   - **Reason:** Bundle bloat, confusion
   - **Action:** Use existing library

---

## Approval Process

If you need to use a forbidden library:

1. Document why it's necessary
2. Get approval from Tech Lead
3. Update this file with exception
4. Document in architecture decisions

---

## Related Documentation

- **Allowed Libraries:** `.cursor/libs/allowed-libs.md`
- **Tech Stack:** `.cursor/context/tech-stack.md`

