# Basic Usage - SetAI CLI

Complete guide on basic usage of SetAI CLI.

## 📋 Overview

The basic mode of SetAI CLI allows you to generate a complete configuration structure for AI-assisted development with essential questions about the project.

---

## 🎯 Main Command

### `setai init`

Generates the basic configuration structure.

**Syntax:**
```bash
setai init
```

**What it does:**
1. Asks which IDE you are using
2. Collects basic project information
3. Collects technology stack information
4. Generates structure in the appropriate folder

---

## 📝 Basic Questions

### 1. IDE Selection

```
? Which IDE are you using?
  ❯ Cursor
    VS Code
    JetBrains (IntelliJ, WebStorm, etc.)
    Other IDE / Generic (.ai)
```

**Impact:**
- **Cursor** → Generates in `.cursor/`
- **VS Code** → Generates in `.vscode/`
- **JetBrains** → Generates in `.idea/`
- **Other IDE** → Generates in `.ai/` (or customized folder)

### 2. Project Information

#### Project Name
```
? What is the project name?
> my-project
```

**Validation:**
- Cannot be empty
- Must be a valid name

#### Problem Description
```
? Describe the problem this project solves:
> Task management system for teams
```

**Usage:**
- Fills `project-goals.md`
- Used for AI context

#### Problem Importance
```
? Why does this problem matter?
> Increases team productivity and organization
```

**Usage:**
- Fills `project-goals.md`
- Explains project value

#### Main Users
```
? Who are the main users of this project?
> Developers, Product Managers, Tech Leads
```

**Format:**
- Can be comma-separated list
- Will be formatted as markdown list

**Usage:**
- Fills `project-goals.md` and `architecture.md`

#### Business Goals
```
? What are the main business goals?
> Reduce development time, improve code quality
```

**Usage:**
- Fills `project-goals.md`

#### Technical Constraints
```
? What are the technical constraints? (or "None" if none)
> Must work offline, support multiple browsers
```

**Default:** "None"

**Usage:**
- Fills `project-goals.md`

#### Business Constraints
```
? What are the business constraints? (or "None" if none)
> Limited budget, 3-month deadline
```

**Default:** "None"

**Usage:**
- Fills `project-goals.md`

#### Non-Goals
```
? What does this project NOT do? (what is out of scope)
> Does not include mobile app, does not support integration with X
```

**Usage:**
- Fills `project-goals.md`
- Defines clear project boundaries

#### Initial Version
```
? What is the initial project version?
> 0.1.0
```

**Default:** `0.1.0`

**Validation:**
- Must follow semantic format (e.g., `1.0.0`, `0.1.0`)
- Accepts suffixes (e.g., `1.0.0-beta.1`)

**Usage:**
- Fills various context files

### 3. Technology Stack

#### Main Language
```
? What is the main language of the project?
  ❯ TypeScript
    JavaScript
    Python
    Go
    Rust
    Other
```

**Usage:**
- Fills `tech-stack.md`
- Affects code and testing rules

#### Framework
```
? What framework are you using?
  ❯ Next.js
    React
    Vue
    Angular
    Express
    FastAPI
    Django
    None
    Other
```

**Condition:** Appears only if language is TypeScript or JavaScript

**Usage:**
- Fills `tech-stack.md` and `architecture.md`

#### Database
```
? What database are you using?
  ❯ PostgreSQL
    MySQL
    MongoDB
    SQLite
    Supabase
    None
    Other
```

**Usage:**
- Fills `tech-stack.md` and `architecture.md`

### 4. Preferences

#### TDD (Test-Driven Development)
```
? Do you use TDD (Test-Driven Development)?
  ❯ Yes
     No
```

**Default:** `Yes`

**Usage:**
- Fills `testing-rules.md`
- Affects development rules

#### Strict Mode (TypeScript)
```
? Do you prefer strict mode in TypeScript?
  ❯ Yes
     No
```

**Condition:** Appears only if language is TypeScript

**Default:** `Yes`

**Usage:**
- Fills `code-style.md`
- Affects TypeScript configuration

---

## 📁 Generated Files

### Context (`context/`)

#### `project-goals.md`
- Business objectives
- Problem and importance
- Main users
- Constraints

#### `tech-stack.md`
- Language
- Framework
- Database
- Versions

#### `architecture.md`
- System overview
- Basic architectural decisions
- Technology stack

#### `deployment.md`
- Basic deployment strategy
- Environments

### Rules (`rules/`)

#### `code-style.md`
- Formatting rules
- Naming conventions
- Lint configuration
- Mandatory TDD

#### `testing-rules.md`
- Testing strategy
- Mandatory TDD
- Minimum coverage

#### `git-rules.md`
- Commit standards
- Branch structure
- Git hooks

#### `security-rules.md`
- Security rules
- Best practices

#### `ai-usage-rules.md`
- Basic AI usage rules
- Recommended models

#### `business-rules.md`
- CLI business rules
- Validations

### Libs (`libs/`)

#### `allowed-libs.md`
- Default allowed libraries
- Base list

#### `forbidden-libs.md`
- Default forbidden libraries
- Recommended alternatives

#### `ai-models.md`
- Recommended AI models
- Use cases

### Commands (`commands/`)

#### `architecture-review.md`
- Architecture review command

#### `refactor-controlled.md`
- Controlled refactoring command

#### `generate-docs.md`
- Documentation generation command

#### `test-strategy.md`
- Test strategy command

---

## 🔄 Complete Flow

```
1. User runs: setai init
   ↓
2. CLI asks: Which IDE?
   ↓
3. CLI asks: Project information
   ↓
4. CLI asks: Technology stack
   ↓
5. CLI asks: Preferences
   ↓
6. CLI validates responses
   ↓
7. CLI processes templates
   ↓
8. CLI generates files
   ↓
9. Structure created! ✅
```

---

## 💡 Usage Examples

### Example 1: React Project

```bash
$ setai init --lang en

? Which IDE are you using? Cursor
? What is the project name? my-react-app
? Describe the problem: Task management app
? Why does this problem matter? Increases productivity
? Who are the main users? Developers, end users
? What are the main business goals? MVP in 2 months
? What are the technical constraints? Must work offline
? What are the business constraints? Limited budget
? What does this project NOT do? Does not include backend
? What is the initial project version? 0.1.0
? What is the main language? TypeScript
? What framework are you using? React
? What database are you using? Supabase
? Do you use TDD? Yes
? Do you prefer strict mode in TypeScript? Yes

✅ .cursor/ structure generated successfully!
```

### Example 2: Python Backend Project

```bash
$ setai init --lang en

? Which IDE are you using? VS Code
? What is the project name? api-backend
? Describe the problem: REST API for sales system
? Why does this problem matter? Automates processes
? Who are the main users? Developers, integrators
? What are the main business goals? High availability, scalability
? What are the technical constraints? Must support 10k req/s
? What are the business constraints? None
? What does this project NOT do? Does not include frontend
? What is the initial project version? 1.0.0
? What is the main language? Python
? What database are you using? PostgreSQL
? Do you use TDD? Yes

✅ .vscode/ structure generated successfully!
```

---

## ⚙️ Available Options

### Without Flags

```bash
setai init
```

**Behavior:**
- Basic questions only
- Generates essential structure
- Ideal for quick start

---

## 🎯 When to Use Basic Mode

✅ **Use when:**
- It's your first time using the CLI
- You want to start quickly
- You only need the essential structure
- You don't need advanced customization

❌ **Don't use when:**
- You need to configure specific AI rules
- You want to customize allowed/forbidden libraries
- You need custom security configurations
- You want to use AI integration to enrich responses

**For these cases, see:**
- [Advanced Usage](./USAGE_ADVANCED.md) - `setai init --advanced`
- [Beta Mode](./USAGE_BETA.md) - `setai init --beta`

---

## 📚 Next Steps

After using basic mode:

1. **Review the generated structure**
   - Read `.cursor/README.md`
   - Verify everything is correct

2. **Configure Lint and Formatter**
   - Follow `.cursor/rules/code-style.md`
   - Configure ESLint and Prettier

3. **Explore advanced options**
   - See [Advanced Usage](./USAGE_ADVANCED.md)
   - Try `setai init --advanced`

---

## ❓ FAQ

### Can I skip questions?

No, all basic questions are mandatory to ensure the structure is complete.

### Can I edit later?

Yes! All generated files are editable. You can modify any file after generation.

### What if I make a mistake?

No problem! You can:
1. Run `setai init` again (will be asked if you want to overwrite)
2. Edit files manually

### Should the structure be committed to Git?

Yes, the `.cursor/` structure (or equivalent) should be committed to Git so the entire team has access to the configurations.

---

## 🔗 Related Links

- [Getting Started](./GETTING_STARTED.md) - Installation guide
- [Advanced Usage](./USAGE_ADVANCED.md) - Advanced configurations
- [Examples](./EXAMPLES.md) - Practical examples
- [Troubleshooting](./TROUBLESHOOTING.md) - Problem solving

