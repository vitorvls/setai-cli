# Technology Stack

## Objetivo
Este arquivo documenta a stack tecnológica completa do projeto, incluindo versões, dependências permitidas e restrições técnicas.

## Escopo
- Stack tecnológico completo
- Versões específicas
- Dependências permitidas
- Restrições técnicas

---

## CLI Stack

### Language & Runtime
- **Language:** TypeScript
- **Runtime:** Node.js
- **Version:** Node.js 18+ (LTS recomendado)

### CLI Framework
- **Framework:** Commander.js ou Inquirer.js (para prompts interativos)
- **Purpose:** Criar interface de linha de comando interativa

### Build Tools
- **Bundler:** tsup ou esbuild (para compilar TypeScript)
- **Package Manager:** pnpm (preferido) ou npm
- **Module System:** ESM (ES Modules)

### File System Operations
- **Library:** fs-extra (operações de arquivo cross-platform)
- **Purpose:** Criar diretórios, escrever arquivos, verificar existência

### Template Engine
- **Solution:** Handlebars ou template strings nativas
- **Purpose:** Preencher templates com dados coletados do usuário

---

## Infrastructure

### Distribution
- **Package Registry:** npm (npmjs.com)
- **Installation:** `npm install -g @setai/cli` ou `npx @setai/cli`
- **Binary Distribution:** Opcionalmente via pkg ou nexe (futuro)

### CI/CD
- **Platform:** GitHub Actions
- **Pipeline:** 
  - Lint e type check
  - Testes unitários
  - Build do pacote
  - Publicação no npm (automática em tags)

### Monitoring
- **Solution:** N/A (CLI local, sem telemetria)
- **Error Tracking:** Logs locais apenas

---

## Development Tools

### Code Quality
- **Linter:** ESLint com regras TypeScript
- **Formatter:** Prettier
- **Type Checker:** TypeScript (strict mode)

### Testing
- **Unit Tests:** Vitest (rápido, compatível com ESM)
- **Integration Tests:** Vitest (testar geração de arquivos)
- **E2E Tests:** Testes manuais do fluxo completo (futuro: automatizar)

---

## Version Constraints

### Node.js
- **Minimum:** 18.0.0 (LTS)
- **Recommended:** 20.x LTS (mais recente)
- **Reason:** Suporte a ESM nativo, performance melhorada

### TypeScript
- **Minimum:** 5.0.0
- **Recommended:** 5.3+ (mais recente estável)
- **Reason:** Melhorias de tipo, performance do compilador

---

## Dependencies Policy

> Ver `.cursor/libs/allowed-libs.md` e `.cursor/libs/forbidden-libs.md` para lista completa

### Allowed
- Bibliotecas listadas em `.cursor/libs/allowed-libs.md`

### Forbidden
- Bibliotecas listadas em `.cursor/libs/forbidden-libs.md`

### Update Policy
- Dependências atualizadas mensalmente
- Security patches aplicados imediatamente
- Major version updates requerem review e testes
- Usar `pnpm update --latest` e testar antes de commitar

---

## Constraints

### Technical Constraints
- Deve funcionar offline (sem dependências de rede)
- Deve ser cross-platform (Windows, macOS, Linux)
- Deve ser rápido (< 5s para gerar estrutura completa)
- Não pode modificar arquivos fora do diretório do projeto
- Deve funcionar com Node.js 18+ apenas

### Business Constraints
- MVP deve ser simples e direto
- Não deve ter muitas dependências (manter bundle pequeno)
- Deve ser fácil de instalar e usar

---

## Related Documentation

- **Allowed Libraries:** `.cursor/libs/allowed-libs.md`
- **Forbidden Libraries:** `.cursor/libs/forbidden-libs.md`
- **Code Style:** `.cursor/rules/code-style.md`

