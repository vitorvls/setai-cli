# Getting Started - SetAI CLI

Complete guide to start using SetAI CLI.

## 📦 Installation

### Via npm

```bash
npm install -g @setai/cli
```

### Via pnpm

```bash
pnpm add -g @setai/cli
```

### Via yarn

```bash
yarn global add @setai/cli
```

### Verify Installation

```bash
setai --version
```

You should see the installed version (e.g., `0.1.0`).

---

## 🚀 Quick Start

### 1. Navigate to your project directory

```bash
cd my-project
```

### 2. Run the init command

```bash
# Basic usage (English)
setai init --lang en

# Or configure language first
setai config
# Select "🌐 Configure language"
```

### 3. Answer the questions

The CLI will ask questions about:
- Project name
- Description and objectives
- Technology stack
- Development preferences

### 4. Generated structure

After answering the questions, the structure will be generated in the appropriate folder (`.cursor`, `.vscode`, `.idea`, or `.ai`).

---

## 📋 First Use Step by Step

### Step 1: IDE Selection

When you run `setai init`, you will be asked which IDE you are using:

```
? Which IDE are you using?
  ❯ Cursor
    VS Code
    JetBrains (IntelliJ, WebStorm, etc.)
    Other IDE / Generic (.ai)
```

**What this does:**
- Determines the configuration folder (`.cursor`, `.vscode`, `.idea`, or `.ai`)
- Customizes the structure for your IDE

### Step 2: Basic Project Information

You will be asked about:

1. **Project Name**
   ```
   ? What is the project name?
   > my-project
   ```

2. **Problem Description**
   ```
   ? Describe the problem this project solves:
   > Task management system for teams
   ```

3. **Problem Importance**
   ```
   ? Why does this problem matter?
   > Increases team productivity and organization
   ```

4. **Main Users**
   ```
   ? Who are the main users of this project?
   > Developers, Product Managers, Tech Leads
   ```

5. **Business Goals**
   ```
   ? What are the main business goals?
   > Reduce development time, improve code quality
   ```

6. **Constraints**
   ```
   ? What are the technical constraints? (or "None" if none)
   > Must work offline, support multiple browsers
   ```

### Step 3: Technology Stack

1. **Language**
   ```
   ? What is the main language of the project?
   ❯ TypeScript
     JavaScript
     Python
     Go
     Rust
     Other
   ```

2. **Framework** (if applicable)
   ```
   ? What framework are you using?
   ❯ Next.js
     React
     Vue
     Angular
     Express
     None
     Other
   ```

3. **Database**
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

### Step 4: Preferences

1. **TDD**
   ```
   ? Do you use TDD (Test-Driven Development)?
   ❯ Yes
     No
   ```

2. **Strict Mode** (if TypeScript)
   ```
   ? Do you prefer strict mode in TypeScript?
   ❯ Yes
     No
   ```

### Step 5: Confirmation

After answering all questions, you will see a summary:

```
✅ Information collected:
   Project: my-project
   Version: 0.1.0
   Language: TypeScript
   IDE: Cursor
   Folder: .cursor/
```

### Step 6: Generated Structure

The structure will be created automatically:

```
🎉 .cursor/ structure generated successfully!

Next steps:
  1. Review the generated files in .cursor/
  2. Fill the templates with project-specific information
  3. Configure lint and formatter as documented in .cursor/rules/code-style.md
```

---

## 📁 Generated Structure

After running `setai init`, you will have the following structure:

```
.cursor/
├── README.md                    # Overview and usage guide
├── context/
│   ├── project-goals.md         # Project objectives and context
│   ├── tech-stack.md            # Technology stack
│   ├── architecture.md          # Architectural decisions
│   └── deployment.md            # Deployment strategy
├── rules/
│   ├── code-style.md            # Code style rules
│   ├── testing-rules.md         # Testing rules
│   ├── git-rules.md             # Git rules
│   ├── security-rules.md        # Security rules
│   ├── ai-usage-rules.md        # AI usage rules
│   └── business-rules.md        # Business rules
├── libs/
│   ├── allowed-libs.md         # Allowed libraries
│   ├── forbidden-libs.md        # Forbidden libraries
│   └── ai-models.md             # Recommended AI models
└── commands/
    ├── architecture-review.md   # Architecture review command
    ├── refactor-controlled.md   # Controlled refactoring command
    ├── generate-docs.md         # Documentation generation command
    └── test-strategy.md         # Test strategy command
```

---

## ✅ Verification

After generation, verify:

1. **Structure created:**
   ```bash
   ls -la .cursor/
   ```

2. **Files filled:**
   ```bash
   cat .cursor/context/project-goals.md
   ```

3. **Personalized content:**
   - Check if your project name appears in the files
   - Confirm that the technology stack is correct
   - Validate that objectives are documented

---

## 🎯 Next Steps

Now that you have the basic structure:

1. **Review generated files**
   - Read `.cursor/README.md` to understand the structure
   - Review `.cursor/context/project-goals.md`

2. **Configure Lint and Formatter**
   - Follow instructions in `.cursor/rules/code-style.md`
   - Configure ESLint and Prettier

3. **Customize Rules**
   - Adjust `.cursor/rules/` as needed
   - Add project-specific rules

4. **Explore Advanced Options**
   - See [Advanced Usage](./USAGE_ADVANCED.md)
   - Try `setai init --advanced`

5. **Configure AI Integration**
   - See [Beta Mode](./USAGE_BETA.md)
   - Run `setai config` to configure API keys

6. **Configure Language (Optional)**
   - Run `setai config` and choose "🌐 Configure language"
   - Or use `setai init --lang <language>` to set language for questions and files
   - Supported languages: en (default), pt-BR, es

---

## 💡 Tips

- **First time?** Use `setai init --lang en` to start in English
- **Existing project?** The CLI detects existing structures and asks if you want to overwrite
- **Multiple projects?** Run `setai init` in each project directory
- **Customization?** Use `setai init --advanced` for more options

---

## ❓ Common Problems

### "Command not found"

**Solution:** Verify if the package was installed globally:
```bash
npm list -g @setai/cli
```

### "Permission denied"

**Solution:** Use `sudo` (Linux/macOS) or run as administrator (Windows):
```bash
sudo npm install -g @setai/cli
```

### "Structure already exists"

**Solution:** The CLI asks if you want to overwrite. Answer `Yes` if you want to replace.

---

## 📚 Next Guides

- [**Basic Usage**](./USAGE_BASIC.md) - Basic commands and features
- [**Advanced Usage**](./USAGE_ADVANCED.md) - Advanced configurations
- [**Beta Mode**](./USAGE_BETA.md) - AI integration
- [**Examples**](./EXAMPLES.md) - Practical examples
