# Advanced Usage - SetAI CLI

Complete guide on advanced usage of SetAI CLI with custom configurations.

## 🎯 Overview

Advanced mode allows you to completely customize the generated structure through modular configuration groups. You can choose which groups to answer and in what order.

---

## 🚀 Advanced Command

### `setai init --advanced`

Generates structure with advanced customization options.

**Syntax:**
```bash
setai init --advanced
```

**What it does:**
1. Executes all basic questions
2. Asks if you want to configure advanced options
3. Allows selecting configuration groups
4. Collects responses iteratively
5. Generates completely customized structure

---

## 📋 Advanced Configuration Flow

### 1. Basic Questions

First, all basic questions are asked (see [Basic Usage](./USAGE_BASIC.md)).

### 2. Advanced Options Confirmation

```
🔧 Do you want to configure advanced options? (will allow customizing all files)
  ❯ Yes
     No
```

**If you choose `No`:**
- Process ends
- Basic structure is generated

**If you choose `Yes`:**
- Enters advanced configuration mode

### 3. Iterative Group Selection

The CLI presents an interactive menu where you can:

1. **Select a group** to answer
2. **Answer the questions** for that group
3. **Return to menu** to select another group
4. **Finish** when done

**Selection menu:**
```
📋 Select an advanced configuration group to fill:
  ❯ 🤖 AI Usage Rules - Preferred models and AI usage rules
    👥 Responsibilities - CTO, Tech Lead, Dev
    📚 Libraries - Custom list of allowed/forbidden libs
    🏗️ Detailed Architecture - Architectural decisions and patterns
    🔒 Security - Specific security rules
    🧪 Testing - Detailed testing strategy
    📦 Deploy - Deploy and infrastructure configurations
    📝 Documentation - Documentation standards
    ✅ Finish advanced configuration
```

**Behavior:**
- Already answered groups appear as "✓ (already answered)" and become unavailable
- You can choose the order of response
- Can finish at any time

---

## 📚 Configuration Groups

### 1. 🤖 AI Usage Rules

**What it configures:**
- Preferred AI models by development phase
- AI usage permissions
- Custom restrictions

**Questions:**
1. Preferred model for Architecture & Planning
2. Preferred model for Code Implementation
3. Preferred model for Refactoring & Legacy
4. Preferred model for Debug & Analysis
5. Preferred model for Quick Code / Boilerplate
6. Allow AI usage for Architecture & Planning?
7. Allow AI usage for Code Generation?
8. Allow AI usage for Refactoring?
9. Allow AI usage for Debug & Analysis?
10. Allow AI usage for Documentation?
11. Custom restrictions for AI usage

**Affected files:**
- `.cursor/rules/ai-usage-rules.md`
- `.cursor/libs/ai-models.md`

**Example:**
```
📝 Answering questions for group: 🤖 AI Usage Rules

? Which AI model do you prefer for Architecture & Planning?
  ❯ Claude 4.5 Opus
    GPT-5.2
    Claude 4.5 Sonnet
    Gemini 3 Pro
    Not specified

? Which AI model do you prefer for Code Implementation?
  ❯ Cursor Composer + GPT-5.1 Codex
    GPT-5.1 Codex Max
    Gemini 3 Flash
    Claude 4.5 Sonnet
    Not specified

? Allow AI usage for Architecture & Planning?
  ❯ Yes
     No

✅ Group "🤖 AI Usage Rules" configured successfully!
```

---

### 2. 👥 Responsibilities

**What it configures:**
- CTO responsibilities regarding AI usage
- Tech Lead responsibilities
- Dev responsibilities

**Questions:**
1. CTO responsibility
2. Tech Lead responsibility
3. Dev responsibility

**Affected files:**
- `.cursor/rules/ai-usage-rules.md`

**Example:**
```
📝 Answering questions for group: 👥 Responsibilities

? CTO responsibility regarding AI usage:
> Defines policy and limits for AI usage in the company

? Tech Lead responsibility regarding AI usage:
> Ensures standards, reviews AI-generated code, validates architecture

? Dev responsibility regarding AI usage:
> Uses AI as a productivity tool, not as a shortcut. Always reviews generated code.

✅ Group "👥 Responsibilities" configured successfully!
```

---

### 3. 📚 Libraries

**What it configures:**
- Additional allowed libraries
- Additional forbidden libraries
- Notes on library policy

**Questions:**
1. Additional allowed libraries (comma-separated)
2. Additional forbidden libraries (comma-separated)
3. Notes on library policy

**Affected files:**
- `.cursor/libs/allowed-libs.md`
- `.cursor/libs/forbidden-libs.md`

**Example:**
```
📝 Answering questions for group: 📚 Libraries

? Additional allowed libraries (comma-separated, or leave blank):
> date-fns, zod, react-query

? Additional forbidden libraries (comma-separated, or leave blank):
> moment, lodash, axios

? Notes on library policy (or leave blank):
> Prefer lightweight and modern libraries. Avoid heavy dependencies.

✅ Group "📚 Libraries" configured successfully!
```

---

### 4. 🏗️ Detailed Architecture

**What it configures:**
- Project architectural style
- Main architectural decisions
- Design patterns used

**Questions:**
1. Architectural style (e.g., Monolith, Microservices, Serverless)
2. Main architectural decisions (comma-separated)
3. Design patterns used (comma-separated)

**Affected files:**
- `.cursor/context/architecture.md`

**Example:**
```
📝 Answering questions for group: 🏗️ Detailed Architecture

? Project architectural style (e.g., Monolith, Microservices, Serverless):
> Microservices Architecture

? Main architectural decisions (comma-separated, or leave blank):
> API Gateway, Event-Driven, CQRS, Domain-Driven Design

? Design patterns used (comma-separated, or leave blank):
> Repository Pattern, Factory Pattern, Strategy Pattern

✅ Group "🏗️ Detailed Architecture" configured successfully!
```

---

### 5. 🔒 Security

**What it configures:**
- Authentication method
- Data protection measures
- Specific security rules

**Questions:**
1. Authentication method used
2. Data protection measures
3. Specific security rules (comma-separated)

**Affected files:**
- `.cursor/rules/security-rules.md`

**Example:**
```
📝 Answering questions for group: 🔒 Security

? Authentication method used (or leave blank):
> JWT with refresh tokens, OAuth2 for third parties

? Data protection measures (or leave blank):
> Encryption at rest and in transit, PII masked in logs

? Specific security rules (comma-separated, or leave blank):
> Rate limiting, restrictive CORS, rigorous input validation

✅ Group "🔒 Security" configured successfully!
```

---

### 6. 🧪 Testing

**What it configures:**
- Custom testing strategy
- Minimum expected coverage
- Testing tools used

**Questions:**
1. Testing strategy
2. Minimum expected test coverage (e.g., 80%)
3. Testing tools used (comma-separated)

**Affected files:**
- `.cursor/rules/testing-rules.md`

**Example:**
```
📝 Answering questions for group: 🧪 Testing

? Testing strategy (or leave blank to use default):
> Mandatory TDD, unit + integration + E2E tests

? Minimum expected test coverage (e.g., 80%, or leave blank):
> 85%

? Testing tools used (comma-separated, or leave blank):
> Vitest, Testing Library, Playwright, MSW

✅ Group "🧪 Testing" configured successfully!
```

---

### 7. 📦 Deploy

**What it configures:**
- Deploy method
- Infrastructure used
- CI/CD tool
- Available environments

**Questions:**
1. Deploy method (e.g., Docker, Vercel, AWS)
2. Infrastructure used
3. CI/CD tool (e.g., GitHub Actions, GitLab CI)
4. Available environments (e.g., dev, staging, prod)

**Affected files:**
- `.cursor/context/deployment.md`

**Example:**
```
📝 Answering questions for group: 📦 Deploy

? Deploy method (e.g., Docker, Vercel, AWS, or leave blank):
> Docker containers in Kubernetes

? Infrastructure used (or leave blank):
> AWS EKS, RDS PostgreSQL, S3, CloudFront

? CI/CD tool (e.g., GitHub Actions, GitLab CI, or leave blank):
> GitHub Actions

? Available environments (e.g., dev, staging, prod, or leave blank):
> development, staging, production

✅ Group "📦 Deploy" configured successfully!
```

---

### 8. 📝 Documentation

**What it configures:**
- Documentation standards
- API documentation tool
- Code comment pattern

**Questions:**
1. Documentation standards
2. API documentation tool (e.g., Swagger)
3. Code comment pattern

**Affected files:**
- `.cursor/rules/ai-usage-rules.md` (documentation section)

**Example:**
```
📝 Answering questions for group: 📝 Documentation

? Documentation standards (or leave blank):
> README in each module, JSDoc for public functions, ADRs for important decisions

? API documentation tool (e.g., Swagger, or leave blank):
> Swagger/OpenAPI 3.0

? Code comment pattern (or leave blank):
> Comments in pt-BR, code in English. JSDoc for public functions.

✅ Group "📝 Documentation" configured successfully!
```

---

## 🔄 Iterative Flow

The advanced flow works iteratively:

```
1. Answer basic questions
   ↓
2. Confirm use of advanced options
   ↓
3. Group selection menu
   ↓
4. Select group
   ↓
5. Answer group questions
   ↓
6. Group marked as "✓ (already answered)"
   ↓
7. Return to menu (group unavailable)
   ↓
8. Select another group or finish
   ↓
9. Process all responses
   ↓
10. Generate customized structure ✅
```

---

## 💡 Complete Example

```bash
$ setai init --advanced

# ... basic questions ...

🔧 Do you want to configure advanced options?
  ❯ Yes

🔧 Advanced Configuration

You can answer groups in any order you prefer.
Already answered groups will become unavailable.

📋 Select an advanced configuration group to fill:
  ❯ 🤖 AI Usage Rules
    👥 Responsibilities
    📚 Libraries
    🏗️ Detailed Architecture
    🔒 Security
    🧪 Testing
    📦 Deploy
    📝 Documentation
    ✅ Finish advanced configuration

# User selects "🤖 AI Usage Rules"
📝 Answering questions for group: 🤖 AI Usage Rules
# ... group questions ...
✅ Group "🤖 AI Usage Rules" configured successfully!

📋 Select an advanced configuration group to fill:
    🤖 AI Usage Rules ✓ (already answered) [unavailable]
  ❯ 👥 Responsibilities
    📚 Libraries
    # ... other groups ...

# User selects "📚 Libraries"
📝 Answering questions for group: 📚 Libraries
# ... group questions ...
✅ Group "📚 Libraries" configured successfully!

📋 Select an advanced configuration group to fill:
    🤖 AI Usage Rules ✓ (already answered) [unavailable]
    📚 Libraries ✓ (already answered) [unavailable]
  ❯ ✅ Finish advanced configuration

# User finishes
✅ Structure generated with all customizations!
```

---

## 📁 Files Affected by Each Group

### AI Usage Rules
- `.cursor/rules/ai-usage-rules.md`
- `.cursor/libs/ai-models.md`

### Responsibilities
- `.cursor/rules/ai-usage-rules.md`

### Libraries
- `.cursor/libs/allowed-libs.md`
- `.cursor/libs/forbidden-libs.md`

### Detailed Architecture
- `.cursor/context/architecture.md`

### Security
- `.cursor/rules/security-rules.md`

### Testing
- `.cursor/rules/testing-rules.md`

### Deploy
- `.cursor/context/deployment.md`

### Documentation
- `.cursor/rules/ai-usage-rules.md` (documentation section)

---

## 🎯 When to Use Advanced Mode

✅ **Use when:**
- You need to customize specific AI rules
- You want to define custom allowed/forbidden libraries
- You need to document detailed architectural decisions
- You want to configure specific security rules
- You need to define custom testing strategy
- You want to document deploy configurations
- You need to establish documentation standards

❌ **Don't use when:**
- It's your first time using the CLI
- You want to start quickly
- You don't need specific customization
- Basic structure is sufficient

---

## 💡 Tips

1. **Response Order:**
   - You can answer groups in any order you prefer
   - There's no mandatory order

2. **Skip Groups:**
   - You can finish without answering all groups
   - Only answered groups will be applied

3. **Edit Later:**
   - All generated files are editable
   - You can modify manually after generation

4. **Re-run:**
   - If you want to add more configurations, run `setai init --advanced` again
   - You'll be asked if you want to overwrite

---

## 🔗 Related Links

- [Basic Usage](./USAGE_BASIC.md) - Basic mode
- [Beta Mode](./USAGE_BETA.md) - AI integration
- [Examples](./EXAMPLES.md) - Practical examples
- [Configuration](./CONFIGURATION.md) - API key management
