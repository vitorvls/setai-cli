# Generate Boilerplate

## Objetivo
Delegar trabalho mecânico à IA. Gerar código boilerplate seguindo padrões do projeto.

## Input
- Tipo de boilerplate necessário (componente, API, service, etc.)
- Arquitetura definida
- Padrões do projeto

## Instructions
Com base na arquitetura definida e nos padrões do projeto:

Gere o boilerplate necessário para este módulo seguindo:

1. **Siga estritamente os padrões existentes**
   - Estrutura de arquivos
   - Convenções de nomenclatura
   - Padrões de código

2. **Não introduza novas abstrações**
   - Use apenas padrões já estabelecidos
   - Não crie novas camadas sem necessidade
   - Mantenha consistência

3. **Comente apenas onde necessário para clareza**
   - Evite comentários óbvios
   - Comente decisões importantes
   - Documente complexidade

## Constraints
- Siga regras em `.cursor/rules/code-style.md`
- Use bibliotecas permitidas (`.cursor/libs/allowed-libs.md`)
- Não use bibliotecas proibidas (`.cursor/libs/forbidden-libs.md`)
- Mantenha estrutura consistente

## Output
Código boilerplate pronto para uso com:
- Estrutura correta
- Padrões seguidos
- Comentários apropriados
- Explicação rápida da estrutura criada

## Related Documentation
- **Code Style:** `.cursor/rules/code-style.md`
- **Architecture:** `.cursor/context/architecture.md`
- **Allowed Libraries:** `.cursor/libs/allowed-libs.md`

