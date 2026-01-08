# Allowed Libraries

## Objetivo
Este arquivo lista todas as bibliotecas permitidas no projeto, com motivo da escolha e casos de uso.

## Escopo
- Bibliotecas permitidas
- Motivo da escolha
- Casos de uso específicos

---

## CLI Libraries

### CLI Framework
- **Commander.js** → CLI framework
  - **Reason:** Padrão da indústria, bem mantido, suporte a subcommands
  - **Use Case:** Parsing de argumentos, definição de comandos

- **Inquirer.js** → Interactive prompts
  - **Reason:** Melhor UX, suporte a múltiplos tipos de perguntas
  - **Use Case:** Perguntas interativas (múltipla escolha, input, confirmação)

### File System
- **fs-extra** → File system operations
  - **Reason:** Cross-platform, API melhor que fs nativo, operações assíncronas
  - **Use Case:** Criar diretórios, escrever arquivos, verificar existência

- **path** → Path utilities (built-in Node.js)
  - **Reason:** Built-in, cross-platform paths
  - **Use Case:** Manipulação de caminhos de arquivos

### Template Processing
- **Handlebars** → Template engine (se necessário)
  - **Reason:** Simples, popular, suporta helpers
  - **Use Case:** Preencher templates com dados do usuário

- **Template Strings nativas** → Alternativa simples
  - **Reason:** Sem dependências, suficiente para casos simples
  - **Use Case:** Templates básicos sem lógica complexa

---

## Utility Libraries

### Validation
- **Zod** → Schema validation (TypeScript)
  - **Reason:** TypeScript-first, runtime validation, type inference
  - **Use Case:** Validar inputs do usuário, validar configurações

### Colors & Formatting
- **chalk** → Terminal string styling
  - **Reason:** Popular, bem mantido, suporta cores cross-platform
  - **Use Case:** Output colorido no terminal, destacar mensagens

- **ora** → Terminal spinners
  - **Reason:** Simples, bem mantido, boa UX
  - **Use Case:** Mostrar progresso durante operações longas

### Package Info
- **read-pkg** → Read package.json
  - **Reason:** Simples, type-safe
  - **Use Case:** Detectar informações do projeto (nome, versão, etc.)

### Error Handling
- **error-stack-parser** → Parse error stacks (se necessário)
  - **Reason:** Melhorar mensagens de erro
  - **Use Case:** Debugging e mensagens de erro mais claras

---

## Testing Libraries

### Unit Testing
- **Vitest** → Testing framework (preferido)
  - **Reason:** Rápido, compatível com ESM, TypeScript nativo
  - **Use Case:** Testes unitários e integração

- **Jest** → Testing framework (alternativa se necessário)
  - **Reason:** Popular, bom ecossistema
  - **Use Case:** Se Vitest não atender necessidades específicas

### Testing Utilities
- **@vitest/ui** → UI para Vitest (opcional)
  - **Reason:** Melhor DX para visualizar testes
  - **Use Case:** Desenvolvimento e debug de testes

- **mock-fs** → Mock file system (se necessário)
  - **Reason:** Testar operações de arquivo sem criar arquivos reais
  - **Use Case:** Testes de file generation sem side effects

---

## Build & Development Tools

### Build Tools
- **tsup** → TypeScript bundler (preferido)
  - **Reason:** Rápido, simples, suporta ESM, zero config
  - **Use Case:** Compilar TypeScript para distribuição

- **esbuild** → Fast bundler (alternativa)
  - **Reason:** Extremamente rápido
  - **Use Case:** Se tsup não atender necessidades

### Type Checking
- **TypeScript** → Type checker
  - **Reason:** Type safety, melhor DX
  - **Use Case:** Type checking durante desenvolvimento

### Code Quality
- **ESLint** → Linter
  - **Reason:** Padrão da indústria, plugins TypeScript
  - **Use Case:** Linting de código

- **Prettier** → Code formatter
  - **Reason:** Formatação consistente, integração com ESLint
  - **Use Case:** Formatação automática

---

## Package Management

### Package Manager
- **pnpm** → Package manager (preferido)
  - **Reason:** Mais rápido, eficiente em espaço, melhor para monorepos
  - **Use Case:** Gerenciamento de dependências

- **npm** → Package manager (alternativa)
  - **Reason:** Padrão, vem com Node.js
  - **Use Case:** Se pnpm não estiver disponível

---

## Update Policy

- Dependencies are updated monthly
- Security patches applied immediately
- Major version updates require review
- Breaking changes documented in CHANGELOG

---

## Related Documentation

- **Forbidden Libraries:** `.cursor/libs/forbidden-libs.md`
- **Tech Stack:** `.cursor/context/tech-stack.md`

