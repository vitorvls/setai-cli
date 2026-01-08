# Testes da Documentação

Este diretório contém testes para validar a documentação do SetAI CLI.

## 📋 Testes Disponíveis

### `links.test.ts`
Valida todos os links internos da documentação para garantir que não há links quebrados (404).

**O que testa:**
- ✅ Todos os links markdown (`[text](url)`) em todos os arquivos `.md`
- ✅ Links relativos (`./arquivo.md`, `../pasta/arquivo.md`)
- ✅ Links absolutos (`/Documentation/README`)
- ✅ Verifica se os arquivos/diretórios referenciados existem

**Como executar:**
```bash
# Executar apenas testes da documentação
pnpm test:docs

# Executar todos os testes
pnpm test
```

## 🚀 Adicionando Novos Testes

Para adicionar novos testes:

1. Crie um arquivo `*.test.ts` neste diretório
2. Use Vitest como framework de testes
3. Execute com `pnpm test:docs`

**Exemplo:**
```typescript
import { describe, it, expect } from 'vitest'

describe('Documentation Structure', () => {
  it('should have required files', () => {
    // Seu teste aqui
  })
})
```

## 📝 Notas

- Os testes são executados em Node.js (não no browser)
- Use `fs/promises` para ler arquivos
- Links externos (http/https) são sempre considerados válidos
- Links com âncoras (`#section`) são validados removendo a âncora
