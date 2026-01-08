# Guia de Contribuição

Este documento fornece um guia para contribuir com o projeto SetAI CLI.

## 🤝 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/setai.git
cd setai
```

### 2. Criar Branch

```bash
# Crie uma branch para sua feature/fix
git checkout -b feature/minha-feature
# ou
git checkout -b fix/minha-correcao
```

### 3. Desenvolver

- Siga as [convenções de código](./DESENVOLVIMENTO)
- Escreva testes para novas funcionalidades
- Mantenha cobertura de testes alta
- Documente mudanças significativas

### 4. Testar

```bash
# Execute testes
pnpm test

# Verifique tipos
pnpm type-check

# Execute lint
pnpm lint

# Formate código
pnpm format
```

### 5. Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Formato: <tipo>(<escopo>): <descrição>

# Exemplos:
git commit -m "feat(init): adiciona suporte a novo IDE"
git commit -m "fix(template): corrige processamento de placeholders"
git commit -m "docs(readme): atualiza instruções de instalação"
git commit -m "test(validator): adiciona testes para validação de nome"
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `test`: Testes
- `refactor`: Refatoração
- `style`: Formatação
- `chore`: Tarefas de manutenção

### 6. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/minha-feature

# Crie Pull Request no GitHub
```

## 📋 Checklist de Pull Request

Antes de submeter um PR, verifique:

- [ ] Código segue convenções do projeto
- [ ] Testes passam (`pnpm test`)
- [ ] Tipos estão corretos (`pnpm type-check`)
- [ ] Lint passa (`pnpm lint`)
- [ ] Código está formatado (`pnpm format`)
- [ ] Testes foram adicionados para novas funcionalidades
- [ ] Documentação foi atualizada (se necessário)
- [ ] Commits seguem Conventional Commits
- [ ] PR tem descrição clara do que foi feito

## 🎯 Áreas para Contribuir

### Funcionalidades

- Novos provedores de IA
- Novos grupos de configuração avançada
- Novos comandos CLI
- Melhorias na experiência do usuário

### Correções

- Bugs reportados
- Melhorias de performance
- Correções de tipos
- Correções de tradução

### Documentação

- Melhorias na documentação
- Exemplos adicionais
- Guias de uso
- Traduções

### Testes

- Aumentar cobertura
- Testes de integração
- Testes E2E

## 🔍 Processo de Revisão

### O que Esperamos

1. **Código limpo**: Segue convenções, bem formatado
2. **Testes**: Cobertura adequada, testes relevantes
3. **Documentação**: Atualizada quando necessário
4. **Descrição clara**: PR explica o que foi feito e por quê

### Feedback

- Revisores podem solicitar mudanças
- Responda aos comentários
- Faça ajustes conforme necessário
- Mantenha discussão construtiva

## 🐛 Reportar Bugs

### Como Reportar

1. **Verifique se já existe**: Procure em issues existentes
2. **Crie issue**: Use template de bug report
3. **Forneça informações**:
   - Versão do Node.js
   - Versão do CLI
   - Passos para reproduzir
   - Comportamento esperado vs. atual
   - Logs/erros (se houver)

### Template de Bug Report

```markdown
**Descrição**
Descrição clara do bug

**Reprodução**
1. Execute '...'
2. Faça '...'
3. Veja erro

**Comportamento Esperado**
O que deveria acontecer

**Comportamento Atual**
O que está acontecendo

**Ambiente**
- Node.js: v18.x.x
- OS: Windows/Linux/Mac
- CLI: v0.1.0

**Logs**
```
Logs relevantes aqui
```
```

## 💡 Sugerir Funcionalidades

### Como Sugerir

1. **Verifique se já existe**: Procure em issues existentes
2. **Crie issue**: Use template de feature request
3. **Descreva**:
   - Problema que resolve
   - Solução proposta
   - Alternativas consideradas

### Template de Feature Request

```markdown
**Problema**
Qual problema esta feature resolve?

**Solução Proposta**
Como você imagina que deveria funcionar?

**Alternativas Consideradas**
Outras soluções que você considerou?

**Contexto Adicional**
Qualquer informação adicional relevante
```

## 📝 Padrões de Código

### TypeScript

- Use tipos explícitos
- Evite `any`
- Use interfaces para objetos
- Prefira `const` sobre `let`

### Funções

- Funções pequenas e focadas
- Nomes descritivos
- Documentação quando necessário

### Erros

- Trate erros adequadamente
- Mensagens de erro claras
- Use tipos de erro específicos quando possível

## 🌐 Internacionalização

### Adicionar Traduções

Ao adicionar novas strings:

1. Adicione em `locales/pt-BR/`
2. Traduza para `locales/en/` e `locales/es/`
3. Use funções `t*()` do i18n

### Adicionar Novo Idioma

1. Crie estrutura `locales/<idioma>/`
2. Traduza todos os arquivos JSON
3. Crie templates `templates/.cursor.<idioma>/`
4. Adicione tipo em `SupportedLocale`

## 🧪 Testes

### Escrever Testes

- Teste casos de sucesso
- Teste casos de erro
- Teste edge cases
- Mantenha testes simples e focados

### Cobertura

- Mantenha cobertura alta (80%+)
- Foque em lógica de negócio
- Testes de integração quando relevante

## 📚 Documentação

### Atualizar Documentação

- Atualize docs quando adicionar funcionalidades
- Mantenha exemplos atualizados
- Documente APIs públicas

### Documentação para Desenvolvedores

- Atualize `docs/Documentation_4_devs/` quando necessário
- Documente decisões arquiteturais
- Mantenha guias atualizados

## 🎯 Roadmap

### Prioridades

1. **Bugs críticos**: Correções urgentes
2. **Funcionalidades solicitadas**: Features com mais votos
3. **Melhorias**: Refatorações e otimizações
4. **Documentação**: Melhorias na documentação

### Como Contribuir para Roadmap

- Vote em issues que você gostaria de ver
- Comente em issues com sugestões
- Crie PRs para itens do roadmap

## ❓ Dúvidas?

- Abra uma issue com tag `question`
- Consulte documentação
- Veja issues existentes

## 🙏 Agradecimentos

Obrigado por considerar contribuir! Sua ajuda é muito apreciada.

---

**Última atualização**: 2024
