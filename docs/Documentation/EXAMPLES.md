# Exemplos Práticos - SetAI CLI

Exemplos reais de uso do SetAI CLI em diferentes cenários.

## 📋 Índice

- [Projeto React/Next.js](#projeto-reactnextjs)
- [Projeto Backend Node.js](#projeto-backend-nodejs)
- [Projeto Python/FastAPI](#projeto-pythonfastapi)
- [Projeto Full Stack](#projeto-full-stack)
- [Com Modo Avançado](#com-modo-avançado)
- [Com Modo Beta (IA)](#com-modo-beta-ia)

---

## 🚀 Projeto React/Next.js

### Cenário
Criar estrutura para um projeto Next.js com TypeScript, PostgreSQL e TDD.

### Comando
```bash
setai init
```

### Respostas
```
? Qual IDE você está usando? Cursor
? Qual o nome do projeto? ecommerce-platform
? Descreva o problema: Plataforma de e-commerce moderna
? Por que este problema importa? Facilita vendas online
? Usuários principais: Desenvolvedores, Product Managers
? Objetivos de negócio: MVP em 3 meses, alta performance
? Restrições técnicas: Deve suportar 10k usuários simultâneos
? Restrições de negócio: Orçamento limitado
? Não-objetivos: Não inclui app mobile
? Versão inicial: 0.1.0
? Linguagem: TypeScript
? Framework: Next.js
? Banco de dados: PostgreSQL
? Usa TDD: Yes
? Modo strict: Yes
```

### Resultado
Estrutura `.cursor/` gerada com:
- Configuração para Next.js
- Regras de TDD
- TypeScript strict mode
- Contexto do projeto preenchido

---

## 🔧 Projeto Backend Node.js

### Cenário
API REST com Express, MongoDB, sem TDD inicial.

### Comando
```bash
setai init
```

### Respostas
```
? IDE: VS Code
? Nome: api-backend
? Problema: API REST para sistema de gestão
? Importância: Automatiza processos
? Usuários: Desenvolvedores, integradores
? Objetivos: Alta disponibilidade, escalabilidade
? Restrições técnicas: Deve suportar 50k req/min
? Restrições de negócio: Nenhuma
? Não-objetivos: Não inclui frontend
? Versão: 1.0.0
? Linguagem: JavaScript
? Framework: Express
? Banco: MongoDB
? TDD: No
```

### Resultado
Estrutura `.vscode/` gerada com configurações para Express e MongoDB.

---

## 🐍 Projeto Python/FastAPI

### Cenário
API FastAPI com PostgreSQL, TDD com pytest.

### Comando
```bash
setai init
```

### Respostas
```
? IDE: JetBrains
? Nome: ml-api
? Problema: API para modelos de ML
? Importância: Disponibiliza IA para clientes
? Usuários: Data Scientists, desenvolvedores
? Objetivos: Baixa latência, alta precisão
? Restrições técnicas: Deve processar 1k req/s
? Restrições de negócio: Nenhuma
? Não-objetivos: Não inclui treinamento de modelos
? Versão: 0.1.0
? Linguagem: Python
? Framework: FastAPI
? Banco: PostgreSQL
? TDD: Yes
```

### Resultado
Estrutura `.idea/` gerada com configurações para FastAPI e Python.

---

## 🌐 Projeto Full Stack

### Cenário
Aplicação completa com Next.js, Node.js, PostgreSQL.

### Comando
```bash
setai init --advanced
```

### Respostas Básicas
```
? IDE: Cursor
? Nome: fullstack-app
? Problema: Aplicação completa de gestão
? ... (outras perguntas básicas)
? Linguagem: TypeScript
? Framework: Next.js
? Banco: PostgreSQL
? TDD: Yes
```

### Respostas Avançadas
```
? Deseja configurar opções avançadas? Yes

📋 Selecione grupo:
  ❯ 🤖 AI Usage Rules

? Modelo para Arquitetura: Claude 4.5 Opus
? Modelo para Implementação: GPT-5.1 Codex
? Permitir IA para Arquitetura: Yes
? Permitir IA para Código: Yes
...

📋 Selecione grupo:
  ❯ 🏗️ Arquitetura Detalhada

? Estilo: Microserviços
? Decisões: API Gateway, Event-Driven
? Padrões: Repository, Factory
...

📋 Selecione grupo:
  ❯ ✅ Finalizar
```

### Resultado
Estrutura completa com:
- Configurações avançadas de IA
- Decisões arquiteturais detalhadas
- Regras customizadas

---

## 🤖 Com Modo Beta (IA)

### Cenário
Projeto que precisa de descrições profissionais e objetivos expandidos.

### Pré-requisito
```bash
setai config
# Configure OpenAI API key
```

### Comando
```bash
setai init --beta
```

### Respostas
```
? IDE: Cursor
? Nome: saas-platform
? Problema: Plataforma SaaS para gestão
? ... (outras perguntas básicas)
```

### Processo com IA
```
🤖 Enriquecendo respostas com IA...
   Analisando respostas com IA...
   Usando OpenAI...
✅ Respostas enriquecidas com IA!
```

### Resultado
Arquivos gerados com:
- Descrições profissionais expandidas
- Objetivos mensuráveis (5-7 objetivos)
- Decisões arquiteturais sugeridas
- Melhores práticas específicas
- Diretrizes de uso de IA customizadas

---

## 💡 Dicas de Uso

### 1. Primeira Vez
Use `setai init` sem flags para começar simples.

### 2. Projetos Complexos
Use `setai init --advanced` para máxima personalização.

### 3. Conteúdo Profissional
Use `setai init --beta` para enriquecimento automático.

### 4. Máximo de Personalização
Use `setai init --advanced --beta` para tudo.

---

## 🔗 Links Relacionados

- [Getting Started](./GETTING_STARTED.md)
- [Uso Básico](./USAGE_BASIC.md)
- [Uso Avançado](./USAGE_ADVANCED.md)
- [Modo Beta](./USAGE_BETA.md)

