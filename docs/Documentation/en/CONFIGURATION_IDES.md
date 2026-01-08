# IDE Configuration - SetAI CLI

Guide on multiple IDE support and configuration folder selection.

## 🎯 Overview

SetAI CLI supports multiple IDEs and generates the structure in the appropriate folder for each one. This allows using the CLI with any IDE that supports configuration via files.

---

## 🖥️ Supported IDEs

### 1. Cursor

**Folder:** `.cursor/`

**When to use:**
- You're using Cursor editor
- You want Cursor-specific configuration

**Characteristics:**
- Structure optimized for Cursor
- Compatible with Cursor AI features

### 2. VS Code

**Folder:** `.vscode/`

**When to use:**
- You're using Visual Studio Code
- You want VS Code-specific configuration

**Characteristics:**
- Structure compatible with VS Code
- Can be used with AI extensions

### 3. JetBrains

**Folder:** `.idea/`

**When to use:**
- You're using IntelliJ IDEA, WebStorm, PyCharm, etc.
- You want JetBrains IDEs-specific configuration

**Characteristics:**
- Structure compatible with JetBrains IDEs
- Works with all JetBrains products

### 4. Other IDE / Generic

**Folder:** `.ai/` (or customized)

**When to use:**
- You're using another IDE
- You want a generic folder
- You need a custom name

**Characteristics:**
- Generic `.ai/` folder
- Allows custom name
- Works with any IDE

---

## 🔄 IDE Selection

### During `setai init`

When you run `setai init`, the first question is:

```
? Which IDE are you using?
  ❯ Cursor
    VS Code
    JetBrains (IntelliJ, WebStorm, etc.)
    Other IDE / Generic (.ai)
```

### Custom Folder

If you choose "Other IDE / Generic", you'll be asked:

```
? Configuration folder name (or leave blank to use .ai):
> .my-ide
```

**Validation:**
- Cannot be empty
- Cannot contain `..`, `/`, or `\`
- Must be a valid folder name

---

## 📁 Structure by IDE

### Cursor (`.cursor/`)

```
.cursor/
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

### VS Code (`.vscode/`)

```
.vscode/
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

### JetBrains (`.idea/`)

```
.idea/
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

### Generic (`.ai/` or customized)

```
.ai/  (or custom name)
├── README.md
├── context/
├── rules/
├── libs/
└── commands/
```

---

## 🔍 Existing Structure Detection

### Behavior

CLI checks if the configuration folder already exists:

```
⚠️  The .cursor/ structure already exists in this directory.

? Do you want to overwrite the existing structure?
  ❯ Yes
     No
```

**If you choose `No`:**
- Operation cancelled
- Existing structure preserved

**If you choose `Yes`:**
- Existing structure will be overwritten
- All files will be regenerated

---

## 💡 Use Cases

### Case 1: Project with Cursor

```bash
$ setai init

? Which IDE are you using?
  ❯ Cursor

# Structure generated in .cursor/
```

### Case 2: Project with VS Code

```bash
$ setai init

? Which IDE are you using?
    VS Code

# Structure generated in .vscode/
```

### Case 3: Multiple IDEs in Same Project

You can have multiple configuration folders:

```bash
# First execution - Cursor
$ setai init
? Which IDE? Cursor
# Generates .cursor/

# Second execution - VS Code (at another time)
$ setai init
? Which IDE? VS Code
# Generates .vscode/
```

**Result:**
```
project/
├── .cursor/    # Configuration for Cursor
├── .vscode/    # Configuration for VS Code
└── ...
```

### Case 4: Custom IDE

```bash
$ setai init

? Which IDE are you using?
    Other IDE / Generic (.ai)

? Configuration folder name (or leave blank to use .ai):
> .neovim

# Structure generated in .neovim/
```

---

## 🔄 Changing IDE

### Scenario: Migrate from Cursor to VS Code

1. **Option 1: Keep Both**
   ```bash
   # Already has .cursor/
   setai init
   # Choose VS Code
   # Now has .cursor/ and .vscode/
   ```

2. **Option 2: Replace**
   ```bash
   # Remove .cursor/ manually
   rm -rf .cursor/
   
   # Generate new structure for VS Code
   setai init
   # Choose VS Code
   ```

---

## 📋 Compatibility

### Universal Structure

The generated structure is **universal** and works with any IDE:

- ✅ Markdown files (`.md`)
- ✅ Standard folder structure
- ✅ No IDE-specific dependencies
- ✅ Editable in any editor

### IDEs That Can Use

Any IDE that:
- Supports reading Markdown files
- Allows configuration via files
- Has support for configuration folders

**Examples:**
- Neovim / Vim
- Emacs
- Sublime Text
- Atom
- Any text editor

---

## 🎯 Recommendations

### For Cursor

Use `.cursor/` if:
- You use Cursor as main editor
- You want native integration with Cursor features

### For VS Code

Use `.vscode/` if:
- You use VS Code as main editor
- You want to maintain VS Code standard

### For JetBrains

Use `.idea/` if:
- You use JetBrains IDEs
- You want compatibility with JetBrains structure

### For Other IDEs

Use `.ai/` or custom name if:
- You use another IDE
- You want generic folder
- You need specific name

---

## 🔗 Related Links

- [Getting Started](./GETTING_STARTED.md) - Getting started guide
- [Basic Usage](./USAGE_BASIC.md) - Basic commands
- [Configuration](./CONFIGURATION.md) - API key management
