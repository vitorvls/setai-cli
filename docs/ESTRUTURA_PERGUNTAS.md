# Estrutura de Perguntas - Básicas vs Avançadas

## 🎯 Objetivo

Garantir que as perguntas básicas forneçam o **essencial** para melhorar o desempenho da IA, e que as perguntas avançadas permitam **personalização completa** de todos os arquivos.

## 📋 Perguntas Básicas (Obrigatórias)

### Essencial para IA

As perguntas básicas devem garantir:
1. ✅ **Contexto do projeto** - O que o projeto faz e por quê
2. ✅ **Stack tecnológica** - Linguagem, framework, banco de dados
3. ✅ **Objetivos claros** - O que se espera alcançar

**Arquivos preenchidos:**
- `.cursor/context/project-goals.md` (7 placeholders)
- `.cursor/context/tech-stack.md` (4 placeholders)
- `.cursor/context/architecture.md` (6 placeholders)

## 🔧 Perguntas Avançadas (Opcionais - Grupos Modulares)

### Grupos de Perguntas

O usuário deve poder escolher quais grupos responder:

1. **🤖 AI Usage Rules** - Modelos preferidos, regras de uso
2. **👥 Responsabilidades** - CTO, Tech Lead, Dev
3. **📚 Bibliotecas** - Lista customizada de libs permitidas/proibidas
4. **🏗️ Arquitetura Detalhada** - Decisões arquiteturais, padrões
5. **🔒 Segurança** - Regras específicas de segurança
6. **🧪 Testes** - Estratégia detalhada de testes
7. **📦 Deploy** - Configurações de deploy e infraestrutura
8. **📝 Documentação** - Padrões de documentação

### Fluxo Proposto

```
Perguntas Básicas (sempre)
    ↓
Deseja configurar opções avançadas? (Y/N)
    ↓ (se Y)
Selecionar grupos de perguntas:
  [ ] AI Usage Rules
  [ ] Responsabilidades
  [ ] Bibliotecas
  [ ] Arquitetura Detalhada
  [ ] Segurança
  [ ] Testes
  [ ] Deploy
  [ ] Documentação
    ↓
Perguntas do grupo selecionado
    ↓
Próximo grupo ou finalizar
```

