# Architecture Overview

## Objetivo
Este arquivo documenta as decisões arquiteturais, padrões e constraints do projeto. Serve como fonte de verdade para entender como o sistema é estruturado.

## Escopo
- Decisões arquiteturais tomadas
- Padrões e convenções
- Constraints técnicos
- Boundaries e responsabilidades

---

## 1. System Overview

**Project Name:** SetAI CLI

**Description:**  
CLI Tool que gera automaticamente a estrutura de configuração `.cursor` através de perguntas interativas, aplicando boas práticas de desenvolvimento com IA em novos projetos.

**Primary Users:**  
- Desenvolvedores que usam Cursor/IA
- Tech Leads que precisam padronizar práticas
- Equipes de desenvolvimento

**Architectural Style:**  
CLI Tool Modular (monolito com módulos bem definidos)

---

## 2. High-Level Architecture

### Main Components

- **CLI Entry Point:** Ponto de entrada do comando, parsing de argumentos
- **Question Engine:** Gerencia fluxo de perguntas interativas (Inquirer.js)
- **Template Engine:** Processa templates e preenche com dados coletados
- **File Generator:** Cria diretórios e arquivos baseado em templates
- **Validator:** Valida inputs do usuário e estrutura do projeto
- **Template Store:** Armazena templates de arquivos `.cursor`

### Communication

- Componentes se comunicam via funções/classes TypeScript
- Fluxo sequencial: CLI → Questions → Validation → Template Processing → File Generation
- Sem comunicação assíncrona complexa (tudo é síncrono/sequencial)

### Interaction Model

- **Síncrono:** Fluxo linear de perguntas e geração
- **Interativo:** Usuário responde perguntas em tempo real
- **Stateless:** Cada execução é independente (não mantém estado entre execuções)

---

## 3. Technology Stack

> Detalhes completos da stack estão em `.cursor/context/tech-stack.md`

### Runtime
- **Language:** TypeScript
- **Runtime:** Node.js 18+
- **Module System:** ESM (ES Modules)

### CLI Framework
- **CLI Parser:** Commander.js
- **Interactive Prompts:** Inquirer.js
- **File Operations:** fs-extra

### Build & Distribution
- **Bundler:** tsup ou esbuild
- **Package Registry:** npm
- **Distribution:** npm global install

### Infrastructure
- **CI/CD:** GitHub Actions
- **Package Hosting:** npmjs.com

---

## 4. Data & State Management

### Source of Truth

- **Templates:** Armazenados como arquivos estáticos no pacote (templates/)
- **User Input:** Coletado via prompts interativos, não persistido
- **Project Context:** Detectado do diretório atual (package.json, git, etc.)

### Caching Strategy

- Não há cache necessário (CLI stateless)
- Templates são lidos do pacote a cada execução
- Performance não é crítica (execução única, não repetitiva)

### State Management

- **Durante execução:** Estado mantido em variáveis/memória durante o fluxo
- **Após execução:** Nenhum estado persistido
- **Pattern:** Fluxo funcional sequencial (input → process → output)

---

## 5. Security & Access

> Detalhes completos estão em `.cursor/rules/security-rules.md`

### Authentication

- Não aplicável (CLI local, sem autenticação)

### Authorization

- CLI roda com permissões do usuário atual
- Apenas valida permissões de escrita no diretório do projeto
- Não acessa arquivos fora do diretório do projeto

### Security Constraints

- Não executa código arbitrário
- Não faz requisições de rede sem consentimento
- Valida todos os inputs do usuário
- Não sobrescreve arquivos sem confirmação explícita

---

## 6. Scalability & Reliability

### Expected Scale

- **Users:** Indefinido (open-source, pode crescer)
- **Concurrent Executions:** N/A (CLI local, não há servidor)
- **Data:** Apenas templates estáticos (pequeno, < 1MB)

### Scaling Strategy

- Não requer escalamento (CLI local)
- Performance é garantida por design (operações locais rápidas)
- Único gargalo: I/O de arquivos (mitigado com operações assíncronas)

### Failure Handling

- **Validação de inputs:** Valida antes de processar
- **Erros de I/O:** Try/catch com mensagens claras
- **Arquivos existentes:** Pergunta antes de sobrescrever
- **Permissões:** Valida permissões antes de escrever
- **Rollback:** Não há (operações são atômicas, ou não acontecem)

---

## 7. Observability & Operations

### Logging

- **Console Output:** Logs diretos no console (stdout/stderr)
- **Verbose Mode:** Flag `--verbose` para logs detalhados
- **Error Messages:** Mensagens claras e acionáveis para o usuário
- **Não persiste logs:** Tudo é output em tempo real

### Monitoring & Metrics

- **Não há monitoramento:** CLI local, sem telemetria
- **Feedback do usuário:** Via GitHub Issues (para bugs/features)
- **Métricas indiretas:** Downloads do npm, stars no GitHub

### Alerts & Incident Handling

- **Não aplicável:** Não há infraestrutura para monitorar
- **Bug Reports:** Via GitHub Issues
- **Releases:** Versionamento semântico, changelog

---

## 8. Architecture Diagrams

### High-Level System Flow

```
Usuário executa: setai init
    ↓
CLI Entry Point (Commander.js)
    ↓
Question Engine (Inquirer.js)
    ├─ Coleta informações do projeto
    ├─ Detecta contexto (package.json, git, etc.)
    └─ Valida inputs
    ↓
Template Engine
    ├─ Carrega templates
    ├─ Preenche com dados coletados
    └─ Prepara arquivos para escrita
    ↓
File Generator
    ├─ Cria diretórios (.cursor/...)
    ├─ Escreve arquivos
    └─ Valida estrutura criada
    ↓
Sucesso: Estrutura .cursor criada
```

### Component Interaction

```
┌─────────────┐
│   CLI CLI   │
│ Entry Point │
└──────┬──────┘
       │
       ├──────────────┐
       │              │
       ▼              ▼
┌─────────────┐  ┌─────────────┐
│  Question  │  │  Validator   │
│   Engine   │◄─┤             │
└──────┬──────┘  └─────────────┘
       │
       ▼
┌─────────────┐
│  Template   │
│   Engine    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    File     │
│  Generator  │
└─────────────┘
```

---

## 9. Architectural Decisions & Trade-offs

### Key Decisions

- **TypeScript sobre JavaScript:** Type safety, melhor DX, menos bugs
  - **Razão:** CLI precisa ser confiável, tipos ajudam a prevenir erros

- **Inquirer.js para prompts:** Padrão da indústria, bem mantido, UX excelente
  - **Razão:** Melhor experiência do usuário, menos código customizado

- **ESM sobre CommonJS:** Padrão moderno, melhor tree-shaking, futuro do Node.js
  - **Razão:** Alinhado com futuro do ecossistema Node.js

- **Templates estáticos sobre geração dinâmica:** Simplicidade, performance, confiabilidade
  - **Razão:** MVP focado, fácil de manter e testar

- **CLI interativa sobre flags:** Melhor UX, guia usuário, menos erros
  - **Razão:** Usuários não precisam decorar flags, fluxo guiado

### Trade-offs & Limitations

- **Interativo vs Não-interativo:** 
  - **Escolhido:** Interativo (melhor UX)
  - **Sacrificado:** Automação completa (mas pode adicionar flags no futuro)

- **Templates estáticos vs Dinâmicos:**
  - **Escolhido:** Estáticos (simplicidade)
  - **Sacrificado:** Flexibilidade extrema (mas templates são editáveis)

- **Sem persistência de estado:**
  - **Escolhido:** Stateless (simplicidade, sem side effects)
  - **Sacrificado:** Histórico de configurações (mas não é necessário para MVP)

- **Limitações conhecidas:**
  - Não detecta automaticamente stack tecnológica (usuário informa)
  - Não valida estrutura gerada contra regras (futuro)
  - Não suporta templates customizados (futuro)

---

## 10. Related Documentation

- **Tech Stack:** `.cursor/context/tech-stack.md`
- **Project Goals:** `.cursor/context/project-goals.md`
- **Deployment:** `.cursor/context/deployment.md`
- **Security:** `.cursor/rules/security-rules.md`
- **Business Rules:** `.cursor/rules/business-rules.md`

