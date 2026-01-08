# Practical Examples - SetAI CLI

Real examples of SetAI CLI usage in different scenarios.

## 📋 Index

- [React/Next.js Project](#reactnextjs-project)
- [Node.js Backend Project](#nodejs-backend-project)
- [Python/FastAPI Project](#pythonfastapi-project)
- [Full Stack Project](#full-stack-project)
- [With Advanced Mode](#with-advanced-mode)
- [With Beta Mode (AI)](#with-beta-mode-ai)

---

## 🚀 React/Next.js Project

### Scenario
Create structure for a Next.js project with TypeScript, PostgreSQL, and TDD.

### Command
```bash
setai init --lang en
```

### Responses
```
? Which IDE are you using? Cursor
? What is the project name? ecommerce-platform
? Describe the problem: Modern e-commerce platform
? Why does this problem matter? Facilitates online sales
? Main users: Developers, Product Managers
? Business goals: MVP in 3 months, high performance
? Technical constraints: Must support 10k concurrent users
? Business constraints: Limited budget
? Non-goals: Does not include mobile app
? Initial version: 0.1.0
? Main language: TypeScript
? Framework: Next.js
? Database: PostgreSQL
? Use TDD: Yes
? Strict mode: Yes
```

### Result
`.cursor/` structure generated with:
- Configuration for Next.js
- TDD rules
- TypeScript strict mode
- Project context filled

---

## 🔧 Node.js Backend Project

### Scenario
REST API with Express, MongoDB, no initial TDD.

### Command
```bash
setai init --lang en
```

### Responses
```
? IDE: VS Code
? Name: api-backend
? Problem: REST API for management system
? Importance: Automates processes
? Users: Developers, integrators
? Objectives: High availability, scalability
? Technical constraints: Must support 50k req/min
? Business constraints: None
? Non-goals: Does not include frontend
? Version: 1.0.0
? Language: JavaScript
? Framework: Express
? Database: MongoDB
? TDD: No
```

### Result
`.vscode/` structure generated with configurations for Express and MongoDB.

---

## 🐍 Python/FastAPI Project

### Scenario
FastAPI API with PostgreSQL, TDD with pytest.

### Command
```bash
setai init --lang en
```

### Responses
```
? IDE: JetBrains
? Name: ml-api
? Problem: API for ML models
? Importance: Makes AI available to clients
? Users: Data Scientists, developers
? Objectives: Low latency, high precision
? Technical constraints: Must process 1k req/s
? Business constraints: None
? Non-goals: Does not include model training
? Version: 0.1.0
? Language: Python
? Framework: FastAPI
? Database: PostgreSQL
? TDD: Yes
```

### Result
`.idea/` structure generated with configurations for FastAPI and Python.

---

## 🌐 Full Stack Project

### Scenario
Complete application with Next.js, Node.js, PostgreSQL.

### Command
```bash
setai init --advanced --lang en
```

### Basic Responses
```
? IDE: Cursor
? Name: fullstack-app
? Problem: Complete management application
? ... (other basic questions)
? Language: TypeScript
? Framework: Next.js
? Database: PostgreSQL
? TDD: Yes
```

### Advanced Responses
```
? Do you want to configure advanced options? Yes

📋 Select group:
  ❯ 🤖 AI Usage Rules

? Model for Architecture: Claude 4.5 Opus
? Model for Implementation: GPT-5.1 Codex
? Allow AI for Architecture: Yes
? Allow AI for Code: Yes
...

📋 Select group:
  ❯ 🏗️ Detailed Architecture

? Style: Microservices
? Decisions: API Gateway, Event-Driven
? Patterns: Repository, Factory
...

📋 Select group:
  ❯ ✅ Finish
```

### Result
Complete structure with:
- Advanced AI configurations
- Detailed architectural decisions
- Custom rules

---

## 🤖 With Beta Mode (AI)

### Scenario
Project that needs professional descriptions and expanded objectives.

### Prerequisite
```bash
setai config
# Configure OpenAI API key
```

### Command
```bash
setai init --beta --lang en
```

### Responses
```
? IDE: Cursor
? Name: saas-platform
? Problem: SaaS platform for management
? ... (other basic questions)
```

### Process with AI
```
🤖 Enriching responses with AI...
   Analyzing responses with AI...
   Using OpenAI...
✅ Responses enriched with AI!
```

### Result
Generated files with:
- Professional expanded descriptions
- Measurable objectives (5-7 objectives)
- Suggested architectural decisions
- Specific best practices
- Customized AI usage guidelines

---

## 💡 Usage Tips

### 1. First Time
Use `setai init --lang en` without flags to start simple.

### 2. Complex Projects
Use `setai init --advanced --lang en` for maximum customization.

### 3. Professional Content
Use `setai init --beta --lang en` for automatic enrichment.

### 4. Maximum Customization
Use `setai init --advanced --beta --lang en` for everything.

---

## 🔗 Related Links

- [Getting Started](./GETTING_STARTED.md)
- [Basic Usage](./USAGE_BASIC.md)
- [Advanced Usage](./USAGE_ADVANCED.md)
- [Beta Mode](./USAGE_BETA.md)
