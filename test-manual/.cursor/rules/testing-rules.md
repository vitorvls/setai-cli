# Testing Rules

## Objetivo
Este arquivo define a estratégia de testes e regras obrigatórias para garantir qualidade do código.

## Escopo
- Estratégia de testes
- Tipos de testes obrigatórios
- Cobertura mínima
- Padrões de escrita de testes

---

## Testing Strategy


### TDD (Test-Driven Development) - OBRIGATÓRIO

**CRITICAL: Testes ANTES do código**

Este projeto utiliza **TDD (Test-Driven Development)** como metodologia obrigatória. Os testes devem ser escritos **ANTES** da implementação do código.

#### Ciclo TDD (Red-Green-Refactor)

1. **🔴 RED (Vermelho):** Escrever um teste que falha
   - Teste deve descrever o comportamento desejado
   - Teste deve falhar porque a funcionalidade ainda não existe

2. **🟢 GREEN (Verde):** Escrever código mínimo para fazer o teste passar
   - Implementar apenas o necessário para o teste passar
   - Não otimizar ou adicionar features extras ainda

3. **🔵 REFACTOR (Refatorar):** Melhorar o código mantendo os testes verdes
   - Melhorar estrutura, legibilidade, performance
   - Garantir que todos os testes continuam passando

#### Regras TDD Obrigatórias

- **NUNCA escreva código sem teste primeiro**
- **NUNCA commite código sem teste correspondente**
- **SEMPRE escreva o teste antes da implementação**
- **SEMPRE faça o teste passar antes de refatorar**
- **SEMPRE refatore mantendo os testes verdes**

#### Fluxo de Desenvolvimento com TDD

```
1. Escrever teste (deve falhar) → RED
2. Implementar código mínimo → GREEN
3. Refatorar se necessário → REFACTOR
4. Repetir para próxima funcionalidade
```

#### Exceções (Raríssimas)

Apenas em casos excepcionais, com aprovação explícita:
- Prototipagem rápida de conceitos (mas testes devem vir logo após)
- Spikes técnicos (mas devem ser descartados ou testados depois)

### Test Pyramid
- **Unit Tests:** Base da pirâmide, maior quantidade
- **Integration Tests:** Meio da pirâmide, quantidade média
- **E2E Tests:** Topo da pirâmide, menor quantidade

### When to Write Tests
- **Always:** Business logic, critical paths, edge cases
- **Recommended:** API endpoints, utility functions
- **Optional:** Simple UI components, trivial functions
- **IMPORTANTE:** Todos seguem TDD - teste ANTES do código

---

## Unit Tests

### Rules
- Test one thing at a time
- Tests must be isolated and independent
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### Coverage
- **Minimum:** {{TEST_COVERAGE}}
- **Critical paths:** 100% coverage required
- **Business logic:** 100% coverage required



### Examples

#### Exemplo TDD Completo

**Passo 1: RED - Escrever teste que falha**
```typescript
// calculateTotal.test.ts
describe('calculateTotal', () => {
  it('should return sum of all items', () => {
    // Arrange
    const items = [10, 20, 30];
    
    // Act
    const result = calculateTotal(items);
    
    // Assert
    expect(result).toBe(60);
  });
});
```
❌ Teste falha porque `calculateTotal` não existe ainda

**Passo 2: GREEN - Implementar código mínimo**
```typescript
// calculateTotal.ts
export function calculateTotal(items: number[]): number {
  return items.reduce((sum, item) => sum + item, 0);
}
```
✅ Teste passa

**Passo 3: REFACTOR - Melhorar se necessário**
```typescript
// calculateTotal.ts (refatorado se necessário)
export function calculateTotal(items: number[]): number {
  if (items.length === 0) return 0;
  return items.reduce((sum, item) => sum + item, 0);
}
```
✅ Teste continua passando, código melhorado

---

## Integration Tests

### Rules
- Test interactions between components
- Use test database (never production)
- Clean up after tests
- Mock external services

### What to Test
- API endpoints
- Database operations
- Service layer interactions
- Authentication flows

---

## E2E Tests

### Rules
- Test critical user journeys
- Use real browser environment
- Keep tests fast and reliable
- Use page object pattern

### What to Test
- Complete user workflows
- Critical business processes
- Cross-browser compatibility (if required)

---

## Test Structure

### File Naming
- Unit tests: `*.test.ts` or `*.spec.ts`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts`

### Organization
- Mirror source structure
- Group related tests
- Use describe blocks for organization

---

## Test Data

### Rules
- Use factories/fixtures for test data
- Do not use production data
- Make test data explicit and readable
- Clean up test data after tests

### Mocking
- Mock external dependencies
- Mock network requests
- Mock time-dependent functions
- Keep mocks simple and focused

---

## CI/CD Integration

### Rules
- All tests must pass before merge
- Tests run on every PR
- Failed tests block deployment
- Test results visible in PR
- **TDD enforcement:** PRs sem testes para código novo serão rejeitados
- **Coverage check:** Cobertura deve aumentar ou manter, nunca diminuir

---

## Prohibited Patterns

### Do NOT
- **Escrever código antes dos testes (viola TDD)**
- Skip tests without justification
- Write tests that depend on execution order
- Use production data in tests
- Write flaky tests
- Commit code without tests for new features
- Commit código que não foi desenvolvido seguindo TDD

---

## Coverage Requirements

### Minimum Coverage
- **Overall:** 70%
- **Business Logic:** 100%
- **API Endpoints:** 80%
- **Utilities:** 90%

### How to Measure
- Use coverage tools (Jest, pytest-cov, etc.)
- Coverage reports in CI/CD
- Review coverage in PRs

---

## Related Documentation

- **Code Style:** `.cursor/rules/code-style.md`
- **Git Rules:** `.cursor/rules/git-rules.md`
- **AI Usage Rules:** `.cursor/rules/ai-usage-rules.md`

