# Deployment

## Objetivo
Este arquivo documenta a infraestrutura, processo de deploy e configuração de ambientes.

## Escopo
- Infraestrutura e hospedagem
- Processo de deploy
- Configuração de ambientes
- Variáveis de ambiente

---

## 1. Infrastructure Overview

### Distribution

**Package Registry:**
- **Provider:** npm (npmjs.com)
- **Package Name:** `@setai/cli` (ou nome a definir)
- **Access:** Público (open-source)

**Installation Methods:**
- **Global Install:** `npm install -g @setai/cli`
- **npx (sem instalar):** `npx @setai/cli init`
- **Local Install:** `npm install @setai/cli --save-dev`

### Binary Distribution (Futuro)

**Optional Binaries:**
- **Windows:** `.exe` via pkg ou nexe
- **macOS:** Binário universal
- **Linux:** Binário estático

**Purpose:** Instalação sem Node.js (futuro, não no MVP)

---

## 2. Environments

### Development
- **Location:** Repositório local
- **Purpose:** Desenvolvimento e testes locais
- **Access:** Desenvolvedores do projeto
- **Installation:** `npm link` para desenvolvimento local

### Staging / Beta
- **Location:** npm com tag `beta` ou `next`
- **Purpose:** Testes com usuários beta antes de release
- **Access:** Público (qualquer um pode instalar com `npm install -g @setai/cli@beta`)
- **Versioning:** Versões beta (ex: `1.0.0-beta.1`)

### Production
- **Location:** npm com tag `latest`
- **Purpose:** Versão estável para todos os usuários
- **Access:** Público (instalação padrão)
- **Versioning:** Versões semânticas estáveis (ex: `1.0.0`)

---

## 3. Deployment Process

### Pre-Deployment Checklist

- [ ] Todos os testes passando (unit + integration)
- [ ] Code review aprovado
- [ ] CHANGELOG atualizado
- [ ] Versão atualizada no package.json
- [ ] Build local funcionando
- [ ] Testado localmente com `npm link`
- [ ] README atualizado se necessário

### Deployment Steps

1. **Atualizar versão:**
   ```bash
   npm version patch|minor|major
   ```

2. **Build do projeto:**
   ```bash
   npm run build
   ```

3. **Testes finais:**
   ```bash
   npm test
   ```

4. **Publicar no npm:**
   ```bash
   npm publish
   ```
   (ou `npm publish --tag beta` para versão beta)

5. **Criar release no GitHub:**
   - Tag da versão
   - Release notes do CHANGELOG

### Rollback Procedure

- **Como fazer rollback:**
  1. Publicar versão anterior com `npm publish`
  2. Ou deprecar versão problemática: `npm deprecate @setai/cli@x.x.x "reason"`
  
- **Quando fazer rollback:**
  - Bug crítico que quebra funcionalidade core
  - Problema de segurança
  - Regressão que afeta muitos usuários

---

## 4. Environment Variables

### Required Variables

**Development:**
```env
NODE_ENV=development
```

**Build/Production:**
- Não há variáveis de ambiente necessárias (CLI local)
- Todas as configurações são do usuário final

### Variable Management

- **Não aplicável:** CLI não usa variáveis de ambiente sensíveis
- **Configuração do usuário:** Feita via prompts interativos
- **Templates:** Incluídos no pacote npm (não configuráveis via env)

---

## 5. CI/CD Pipeline

### Pipeline Stages

1. **Lint & Type Check:**
   - ESLint
   - TypeScript type checking
   - Prettier check

2. **Test:**
   - Unit tests (Vitest)
   - Integration tests
   - Coverage report

3. **Build:**
   - Compilar TypeScript
   - Bundle com tsup/esbuild
   - Validar estrutura do pacote

4. **Publish (apenas em tags):**
   - Publicar no npm
   - Criar GitHub release

### Automated Deployments

- **Triggers:** Push de tag (ex: `v1.0.0`)
- **Branches:** `main` apenas
- **Condition:** Todos os testes passando, build bem-sucedido

### Manual Deployments

- **Quando:** 
  - Versões beta
  - Hotfixes urgentes
  - Primeira versão
- **Processo:** 
  ```bash
  npm version patch|minor|major
  git push --tags
  # CI/CD publica automaticamente
  ```

---

## 6. Monitoring & Alerts

### Monitoring

- **Tools:** 
  - npm download stats (via npmjs.com)
  - GitHub stars/forks
  - GitHub Issues/PRs
- **Metrics:** 
  - Downloads por versão
  - Issues abertos
  - Taxa de bugs reportados

### Alerts

- **Critical Alerts:** 
  - Issues críticos no GitHub (security, breaking changes)
  - Falhas no CI/CD
- **Warning Alerts:** 
  - Aumento de issues
  - Feedback negativo de usuários

---

## 7. Backup & Recovery

### Backup Strategy

- **Frequency:** N/A (código versionado no Git)
- **Retention:** Indefinido (Git mantém histórico)
- **Location:** GitHub (repositório principal)

### Recovery Procedure

- **Código:** Sempre disponível no Git, pode restaurar qualquer versão
- **npm Package:** Versões antigas permanecem no npm, podem ser reinstaladas
- **RTO/RPO:** N/A (não há dados a recuperar, apenas código)

---

## 8. Security

### Package Security

- **npm audit:** Executar regularmente
- **Dependencies:** Manter atualizadas
- **Vulnerabilities:** Corrigir imediatamente
- **2FA:** Obrigatório para publicação no npm

### Access Control

- **npm Publishing:** Apenas mantenedores autorizados
- **GitHub Repository:** Público (open-source)
- **CI/CD Secrets:** Tokens npm protegidos no GitHub Secrets

---

## Related Documentation

- **Architecture:** `.cursor/context/architecture.md`
- **Security Rules:** `.cursor/rules/security-rules.md`

