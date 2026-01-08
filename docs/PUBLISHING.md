# 📦 Guia de Publicação no npm

Este documento descreve o processo de publicação do `@setai/cli` no npm.

## 📋 Pré-requisitos

1. **Conta npm**: Tenha uma conta no [npmjs.com](https://www.npmjs.com/)
2. **Login no npm**: Execute `npm login` para autenticar
3. **Escopo configurado**: O pacote usa o escopo `@setai`, então você precisa:
   - Criar uma organização `setai` no npm, OU
   - Configurar o escopo como público no `package.json` (já configurado)

## 🚀 Processo de Publicação

### Opção 1: Usando o Script de Release (Recomendado)

O script `scripts/release.js` automatiza o processo:

```bash
# Patch release (0.1.0 -> 0.1.1)
node scripts/release.js patch

# Minor release (0.1.0 -> 0.2.0)
node scripts/release.js minor

# Major release (0.1.0 -> 1.0.0)
node scripts/release.js major
```

O script irá:
1. ✅ Executar testes
2. ✅ Executar lint
3. ✅ Verificar tipos TypeScript
4. ✅ Compilar o projeto
5. ✅ Atualizar a versão no `package.json`
6. ✅ Criar commit e tag git

Depois, você precisa fazer push e publicar:

```bash
git push && git push --tags && npm publish
```

### Opção 2: Processo Manual

1. **Atualizar versão**:
   ```bash
   npm version patch   # ou minor, major
   ```

2. **Executar testes e build**:
   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   pnpm build
   ```

3. **Verificar o que será publicado**:
   ```bash
   npm pack --dry-run
   ```

4. **Publicar**:
   ```bash
   npm publish
   ```

## 📝 Checklist Antes de Publicar

- [ ] Todos os testes passando (`pnpm test`)
- [ ] Lint sem erros (`pnpm lint`)
- [ ] Type-check sem erros (`pnpm type-check`)
- [ ] Build bem-sucedido (`pnpm build`)
- [ ] Versão atualizada no `package.json`
- [ ] `README.md` atualizado
- [ ] `CHANGELOG.md` atualizado (se houver)
- [ ] Mudanças commitadas no git
- [ ] Tag git criada (se usando script de release)

## 🔍 Verificar o Pacote Antes de Publicar

Para ver exatamente o que será publicado:

```bash
npm pack
```

Isso criará um arquivo `.tgz` que você pode inspecionar:

```bash
tar -tzf setai-cli-0.1.0.tgz
```

## 📦 Arquivos Incluídos no Pacote

O `package.json` define o campo `files` que controla quais arquivos são incluídos:

```json
"files": [
  "dist",
  "templates",
  "locales"
]
```

Isso garante que apenas os arquivos necessários sejam publicados:
- `dist/` - Código compilado
- `templates/` - Templates de configuração
- `locales/` - Arquivos de tradução

## 🏷️ Versionamento Semântico

Seguimos [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Mudanças incompatíveis na API
- **MINOR** (0.1.0): Novas funcionalidades compatíveis
- **PATCH** (0.0.1): Correções de bugs compatíveis

## 🔐 Publicar Escopo Público

O `package.json` já está configurado com:

```json
"publishConfig": {
  "access": "public"
}
```

Isso permite publicar pacotes com escopo (`@setai/cli`) publicamente sem precisar de uma organização paga.

## 🐛 Troubleshooting

### Erro: "You must sign up for private packages"

Se você receber este erro, verifique se o `publishConfig.access` está definido como `"public"` no `package.json`.

### Erro: "Package name already exists"

Verifique se a versão já existe no npm. Se sim, incremente a versão.

### Erro: "You do not have permission to publish"

Certifique-se de que:
1. Você está logado no npm (`npm whoami`)
2. Você tem permissão para publicar no escopo `@setai`
3. O escopo está configurado como público

## 📚 Referências

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm Scoped Packages](https://docs.npmjs.com/cli/v9/using-npm/scope)
