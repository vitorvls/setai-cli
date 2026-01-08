# Refactor Controlled

## Objetivo
Melhorar código sem mudar comportamento. Refatoração segura e controlada.

## Input
- Código selecionado para refatoração
- Contexto do código
- Testes existentes (se houver)

## Instructions
Refatore o código selecionado com os seguintes objetivos:

1. **Melhorar legibilidade**
   - Nomes mais claros
   - Estrutura mais clara
   - Reduzir complexidade cognitiva

2. **Reduzir complexidade**
   - Simplificar lógica
   - Extrair funções quando apropriado
   - Remover código duplicado

3. **Manter 100% do comportamento atual**
   - Não alterar funcionalidade
   - Não alterar interface pública
   - Manter compatibilidade

## Constraints
- Não altere comportamento
- Mantenha testes existentes passando
- Siga padrões do projeto (`.cursor/rules/code-style.md`)
- Documente mudanças significativas

## Output
Código refatorado com:
- Lista clara do que foi alterado
- Explicação do por quê
- Garantia de comportamento mantido
- Sugestões de testes adicionais (se necessário)

## Related Documentation
- **Code Style:** `.cursor/rules/code-style.md`
- **Testing Rules:** `.cursor/rules/testing-rules.md`

