# SetAI CLI - Documentation for Developers

Welcome to the technical documentation of SetAI CLI! This section is aimed at developers working on the project, including maintenance, support, and onboarding of new team members.

## 📚 Index

1. [Project Structure](./PROJECT_STRUCTURE) - Overview of all folders and files
2. [Main Files](./MAIN_FILES) - Detailed description of main files
3. [Architecture](./ARCHITECTURE) - System architecture and design patterns
4. [Development Guide](./DEVELOPMENT) - How to develop and contribute
5. [Testing Guide](./TESTING) - Testing strategy and how to write tests
6. [Contributing](./CONTRIBUTING) - Guide for contributors
7. [Data Flow](./DATA_FLOW) - How data flows through the system
8. [Internationalization](./INTERNATIONALIZATION) - i18n system and how to add languages

## 🎯 Purpose of this Documentation

This documentation was created for:

- **New Developers**: Quickly understand the structure and start contributing
- **Maintenance**: Facilitate identification of where to make changes
- **Support**: Understand internal operation to solve problems
- **Architecture**: Understand design decisions and patterns used

## 🏗️ Project Overview

SetAI CLI is a command-line tool that automatically generates configuration structures for AI-supported IDEs (mainly Cursor). The project is built with:

- **TypeScript** - Main language
- **Node.js 18+** - Runtime
- **Commander.js** - CLI framework
- **Inquirer.js** - Interactive prompts
- **Vitest** - Testing framework
- **tsup** - Build tool

## 📦 Quick Structure

```
setai/
├── src/              # TypeScript source code
├── dist/            # Compiled build (generated)
├── templates/       # Templates for file generation
├── locales/         # Translations (i18n)
├── docs/            # Documentation
└── scripts/         # Helper scripts
```

## 🚀 Quick Start for Developers

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd setai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run in development mode**
   ```bash
   pnpm dev
   ```

4. **Run tests**
   ```bash
   pnpm test
   ```

5. **Build for production**
   ```bash
   pnpm build
   ```

## 📖 Next Steps

- Read [Project Structure](./PROJECT_STRUCTURE) to understand the organization
- See [Main Files](./MAIN_FILES) to know the main files
- Consult [Architecture](./ARCHITECTURE) to understand the system design
- Follow [Development Guide](./DEVELOPMENT) to start developing

## 🔗 Useful Links

- [User Documentation](/Documentation/en/README) - Documentation for end users
- [Main README](/README) - Project README

## ❓ Questions?

If you have questions about the code or architecture:

1. Consult the relevant documentation in this folder
2. Check the code comments (code in English, comments in Portuguese)
3. See the tests for usage examples
4. Open an issue in the repository

---

**Last update**: 2024
