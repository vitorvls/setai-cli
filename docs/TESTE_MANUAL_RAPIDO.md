# ⚡ Teste Manual Rápido - SetAI CLI

Guia rápido para testar o CLI em 3 passos.

## 🚀 Método Mais Rápido

### 1. Build
```bash
pnpm build
```

### 2. Criar diretório de teste
```bash
mkdir test-manual
cd test-manual
```

### 3. Executar
```bash
# Básico
node ../dist/index.js init

# Com opções
node ../dist/index.js init --advanced
node ../dist/index.js init --beta
node ../dist/index.js init --advanced --beta --lang en
```

## 📋 Usando Scripts Auxiliares

### Windows PowerShell
```powershell
# Teste básico
.\scripts\test-manual.ps1

# Teste avançado
.\scripts\test-manual.ps1 -Advanced

# Teste beta
.\scripts\test-manual.ps1 -Beta

# Teste completo
.\scripts\test-manual.ps1 -Advanced -Beta

# Teste em inglês
.\scripts\test-manual.ps1 -Lang en

# Limpar e testar
.\scripts\test-manual.ps1 -Clean
```

### Linux/Mac
```bash
# Teste básico
./scripts/test-manual.sh

# Teste avançado
./scripts/test-manual.sh --advanced

# Teste beta
./scripts/test-manual.sh --beta

# Teste completo
./scripts/test-manual.sh --advanced --beta

# Teste em inglês
./scripts/test-manual.sh --lang en

# Limpar e testar
./scripts/test-manual.sh --clean
```

## ✅ Verificação Rápida

Após executar, verifique:

```bash
# Listar arquivos gerados
ls -la .cursor/

# Ver um arquivo
cat .cursor/README.md
```

## 🎯 Comandos Úteis

```bash
# Do diretório raiz do projeto
pnpm run cli init              # Básico
pnpm run cli init --advanced   # Avançado
pnpm run cli init --beta       # Com IA
pnpm run cli config            # Configurar API keys
pnpm run cli --help            # Ajuda
```

---

**Para guia completo, veja:** [TESTE_MANUAL_COMPLETO.md](./TESTE_MANUAL_COMPLETO.md)
