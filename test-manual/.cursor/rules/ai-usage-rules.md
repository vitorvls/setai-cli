# AI Usage Rules

## Objetivo
Este arquivo define onde e como a IA pode ser usada no desenvolvimento. Baseado no Guideline Interno para uso de IA.

## Escopo
- Onde IA pode atuar
- Onde IA NÃO pode atuar
- Processo de revisão
- Responsabilidades

---

## Princípios Fundamentais

1. **IA não decide sozinha**
   - Decisões arquiteturais, de domínio e de segurança sempre são humanas

2. **Processo antes de ferramenta**
   - Sem padrões, a IA apenas gera caos mais rápido

3. **Contexto explícito > Prompt bonito**
   - Qualidade do output depende da clareza do contexto

4. **Código gerado é código a ser mantido**
   - Tudo que a IA escreve entra no ciclo normal de revisão, testes e documentação

---

## Onde a IA Pode Atuar

### 1. Arquitetura & Planejamento

**Permitido:** Sim
- Explorar alternativas arquiteturais
- Avaliar trade-offs técnicos
- Desenhar fluxos e boundaries
- Sugerir padrões de design

**Regras:**
- Nunca aceitar arquitetura final sem revisão humana
- Registrar decisões (ADR - Architecture Decision Records)
- Usar modelo: Claude 4.5 Opus

---

### 2. Implementação de Código

**Permitido:** Sim
- Gerar boilerplate
- Implementar APIs CRUD
- Escrever testes
- Criar integrações
- Refatorar código

**Regras:**
- Sempre seguir lint, formatter e padrões do projeto
- Código gerado sem testes é considerado incompleto
- Usar modelo: Cursor Composer + GPT-5.1 Codex

---

### 3. Refatoração & Legado

**Permitido:** Sim
- Melhorar legibilidade
- Isolar regras de negócio
- Reduzir complexidade
- Modernizar código legado

**Regras:**
- Refatorar comportamento sem alterar regras de negócio
- Sempre validar com testes existentes
- Usar modelo: Claude 4.5 Sonnet

---

### 4. Debug & Análise

**Permitido:** Sim
- Analisar logs e erros
- Rastrear bugs complexos
- Identificar regressões
- Analisar grandes bases de código

**Regras:**
- IA sugere causas, não verdades absolutas
- Sempre validar hipóteses
- Usar modelo: Gemini 3 Pro

---

### 5. Documentação

**Permitido:** Sim
- Gerar documentação técnica
- Criar comentários explicativos
- Documentar APIs
- Atualizar README

**Regras:**
- Revisar documentação gerada
- Garantir precisão e clareza

---

## Onde a IA NÃO Pode Atuar Sozinha

### Proibido Sempre

- **Decisões de segurança**
  - Configurações de autenticação
  - Políticas de acesso
  - Criptografia

- **Lógicas financeiras**
  - Cálculos monetários
  - Transações financeiras
  - Relatórios financeiros

- **Regras regulatórias**
  - Compliance
  - LGPD/GDPR
  - Regulamentações específicas

- **Migrações destrutivas**
  - Alterações em produção
  - Deletar dados
  - Mudanças de schema sem backup

- **Deploy em produção**
  - Aprovação de deploy
  - Configuração de infraestrutura crítica



> **Regra de ouro:** IA propõe. Humanos aprovam.

---

## Processo de Revisão

### Código Gerado por IA

1. **Revisão obrigatória**
   - Todo código gerado deve ser revisado
   - Não aceitar código sem entender

2. **Testes obrigatórios**
   - Código gerado → testes gerados
   - Refatoração → testes existentes verdes

3. **Validação de regras de negócio**
   - Verificar se segue regras de negócio
   - Validar lógica implementada

---

## Modelos Recomendados por Fase

### Ideação & Arquitetura
- **Claude 4.5 Opus** - Modelo preferido para arquitetura e planejamento

### Planejamento Técnico
- **GPT-5.2** - Estrutura, consistência e padrões

### Implementação
- **Cursor Composer + GPT-5.1 Codex** - Modelo preferido para implementação de código

### Refatoração & Legado
- **Claude 4.5 Sonnet** - Modelo preferido para refatoração

### Debug & Análise
- **Gemini 3 Pro** - Modelo preferido para debug e análise

### Código Rápido / Boilerplate
- **Gemini 3 Flash** - Modelo preferido para código rápido

---

## Padronização Obrigatória

Todo projeto deve conter antes de usar IA:

- [ ] **Configuração de lint (ESLint) instalada e funcionando**
- [ ] **Configuração de formatter (Prettier) instalada e funcionando**
- [ ] **TypeScript configurado (tsconfig.json)**
- [ ] **Scripts de lint/format no package.json**
- [ ] Regras de lint e formatter documentadas
- [ ] Templates de prompts (Cursor / CLI)
- [ ] Estrutura de contexto (`.cursor/context`)
- [ ] Regras técnicas explícitas (`.cursor/rules`)

**Sem isso, o uso de IA não é autorizado.**

### Configuração de Lint - Detalhes

> Para detalhes completos sobre configuração de lint, ver `.cursor/rules/code-style.md` seção "Lint & Formatting Configuration"

A configuração de lint DEVE incluir:

1. **ESLint:** Configurado para TypeScript, regras alinhadas com code-style.md, integração com Prettier
2. **Prettier:** Configuração de formatação, integração com ESLint
3. **TypeScript:** tsconfig.json configurado, strict mode habilitado

**A IA deve sempre seguir as regras de lint configuradas. Código que não passa no lint é considerado inválido.**

---

## Testes e Qualidade

### Regras Inegociáveis

- Código gerado → testes gerados
- Refatoração → testes existentes verdes
- PR sem testes → PR incompleto

**A IA nunca substitui a pipeline de CI.**

---

## Riscos Comuns e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Over engineering | Regras simples e objetivos claros |
| Código inconsistente | Lint + templates obrigatórios |
| Devaneios da IA | Prompts restritos e escopo fechado |
| Perda de padrão | Revisões técnicas humanas |

---

## Responsabilidades

- **CTO:** Define política e limites
- **Tech Lead:** Garante padrões e revisão
- **Dev:** Usa IA como ferramenta, não como atalho

---

## Regra Final

> Se a IA está tomando decisões que você não consegue explicar para o time, o processo falhou.

**IA bem usada gera velocidade.**
**IA sem processo gera dívida técnica.**

---

## Related Documentation

- **Code Style:** `.cursor/rules/code-style.md`
- **Testing Rules:** `.cursor/rules/testing-rules.md`
- **AI Models:** `.cursor/libs/ai-models.md`

