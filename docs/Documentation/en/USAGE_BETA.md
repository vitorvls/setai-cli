# Beta Mode (AI) - SetAI CLI

Complete guide on using Beta mode with AI model integration.

## 🎯 Overview

Beta mode (`--beta`) enables integration with AI models to **automatically enrich** user responses. AI analyzes the provided information and generates detailed descriptions, expanded objectives, architectural decisions, and best practices.

---

## ⚠️ Status: BETA

This feature is in **BETA** and requires:
- Configured API keys (see [Configuration](./CONFIGURATION.md))
- User tokens will be consumed
- Requires internet connection

---

## 🚀 Beta Command

### `setai init --beta`

Generates structure with automatic enrichment via AI.

**Syntax:**
```bash
setai init --beta
```

**Combined with advanced:**
```bash
setai init --advanced --beta
```

---

## 📋 Prerequisites

### 1. Configure API Keys

Before using Beta mode, you need to configure at least one API key:

```bash
setai config
```

**Available options:**
- **OpenAI** (GPT-4, GPT-3.5)
- **Anthropic** (Claude 3.5)
- **Google** (Gemini 1.5)

**See:** [Complete Configuration](./CONFIGURATION.md)

---

## 🔄 Flow with AI

```
1. Answer basic (or advanced) questions
   ↓
2. CLI checks configured API keys
   ↓
3. CLI sends responses to AI model
   ↓
4. AI analyzes and enriches:
   - Detailed descriptions
   - Expanded objectives
   - Architectural decisions
   - Best practices
   ↓
5. CLI processes AI response
   ↓
6. CLI validates and sanitizes JSON
   ↓
7. CLI fills templates with enriched content
   ↓
8. Structure generated with advanced content ✅
```

---

## 🤖 What AI Does

### Automatic Analysis

AI receives all collected information and generates:

1. **Enriched Description**
   - Expands original description
   - Adds technical and business context
   - Makes it more professional and detailed

2. **Expanded Problem Importance**
   - Better explains impact
   - Adds urgency and relevance
   - Connects with business objectives

3. **Expanded Business Objectives**
   - Lists 5-7 specific objectives
   - Makes objectives measurable
   - Based on best practices

4. **Architectural Decisions**
   - Suggests 3-5 architectural decisions
   - Based on technology stack
   - Aligned with objectives

5. **Best Practices**
   - Lists 3-5 specific practices
   - For the project type
   - Based on industry experience

6. **AI Usage Guidelines**
   - Custom recommendations
   - For the specific project
   - Considering stack and objectives

---

## 📊 Enrichment Example

### Before (User Response)

**Description:**
```
Task management system
```

**Objectives:**
```
Increase productivity
```

### After (Enriched by AI)

**Enriched Description:**
```
This project solves the critical problem of disorganization and lack of visibility
over task progress in development teams. The system offers a centralized platform
for task management, allowing developers, product managers, and tech leads to track
project status, prioritize work, and collaborate efficiently. The solution integrates
with existing development tools and provides real-time metrics for data-driven decision making.
```

**Expanded Objectives:**
```json
[
  "Reduce average task completion time by 30% through better organization",
  "Increase progress visibility for stakeholders by 100%",
  "Improve team satisfaction through intuitive tools",
  "Reduce rework through adequate dependency tracking",
  "Establish measurable and actionable productivity metrics"
]
```

---

## 🔧 Provider Configuration

### Automatic Priority

CLI tries to use providers in this order:

1. **OpenAI** (if configured)
2. **Anthropic** (if OpenAI fails or is not configured)
3. **Google** (if previous ones fail or are not configured)

### Automatic Fallback

If a provider fails, CLI automatically tries the next one:

```
Trying OpenAI...
⚠️  Error using OpenAI, trying other providers...
   Using Anthropic (Claude)...
✅ Responses enriched with AI!
```

---

## 📝 Complete Usage Example

### Step 1: Configure API Key

```bash
$ setai config

🔧 SetAI CLI Configuration

Configuration file: ~/.setai/config.json

? What do you want to do?
  ❯ ➕ Add/Update API Key

? Which AI provider?
  ❯ OpenAI (GPT-4, GPT-3.5, etc.)

? Enter your API Key:
> sk-...

? Which model to use by default?
  ❯ gpt-4o (Recommended - Most capable)

✅ OpenAI API Key configured successfully!
   Default model: gpt-4o
```

### Step 2: Execute with Beta

```bash
$ setai init --beta

# ... basic questions ...

⚠️  BETA mode activated: AI integration will be used to enrich responses.

   Make sure you have configured your API keys by running: setai config

✅ Information collected:
   Project: my-project
   Version: 0.1.0
   Language: TypeScript
   IDE: Cursor
   Folder: .cursor/

🤖 Enriching responses with AI...
   Analyzing responses with AI...
   Using OpenAI...
✅ Responses enriched with AI!

📝 Processing templates...
📁 Generating files...

🎉 .cursor/ structure generated successfully!
```

---

## 🎯 When to Use Beta Mode

✅ **Use when:**
- You want professional and detailed descriptions
- You need expanded and measurable objectives
- You want architectural decision suggestions
- You need best practice recommendations
- You want customized AI usage guidelines
- You have API keys configured
- You're willing to consume tokens

❌ **Don't use when:**
- You don't have API keys configured
- You don't want to consume tokens
- You prefer to write everything manually
- Basic structure is sufficient
- You're offline

---

## 💰 Token Costs

### Estimate per Execution

**OpenAI (gpt-4o):**
- Input: ~500-1000 tokens
- Output: ~1000-2000 tokens
- Approximate cost: $0.01 - $0.05 per execution

**Anthropic (claude-3-5-sonnet):**
- Input: ~500-1000 tokens
- Output: ~1000-2000 tokens
- Approximate cost: $0.015 - $0.06 per execution

**Google (gemini-1.5-pro):**
- Input: ~500-1000 tokens
- Output: ~1000-2000 tokens
- Approximate cost: $0.001 - $0.005 per execution

**Note:** Costs are estimates and may vary. Consult official prices from each provider.

---

## 🔒 Security and Privacy

### What is Sent to AI

- Project name
- Problem description
- Problem importance
- Main users
- Business objectives
- Technology stack
- Technical and business constraints
- Non-goals

### What is NOT Sent

- Project code
- Project files
- Sensitive information
- Credentials
- User data

### Storage

- API keys are stored locally in `~/.setai/config.json`
- No information is sent to SetAI CLI servers
- Direct communication with provider APIs (OpenAI, Anthropic, Google)

---

## ⚙️ Error Handling

### Common Errors

#### 1. "No API key configured"

**Solution:**
```bash
setai config
# Configure at least one API key
```

#### 2. "Invalid API key"

**Solution:**
```bash
setai config
# Remove old API key
# Add a new valid API key
```

#### 3. "Request limit exceeded"

**Solution:**
- Wait a few minutes
- Check your plan on the provider platform
- CLI does automatic retry (up to 3 attempts)

#### 4. "API quota exhausted"

**Solution:**
- Check your plan and credits
- Configure another provider as alternative
- CLI will try other providers automatically

#### 5. "Error processing AI response"

**Solution:**
- CLI continues without enrichment
- Basic structure is still generated
- Check logs for more details

---

## 🔄 Automatic Retry

CLI implements automatic retry with exponential backoff:

- **Attempts:** Up to 3
- **Initial delay:** 1 second
- **Maximum delay:** 10 seconds
- **Multiplier:** 2x

**Errors that are retried:**
- Rate limit (429)
- Timeout
- Temporary connection errors

**Errors that are NOT retried:**
- Invalid API Key (401)
- Quota exhausted
- Authentication errors

---

## 📊 Response Validation

### Validation Process

1. **JSON Extraction**
   - Removes markdown code blocks if present
   - Extracts JSON from mixed text
   - Tries direct parse

2. **Schema Validation**
   - Validates structure with Zod
   - Checks data types
   - Sanitizes fields

3. **Error Handling**
   - If validation fails, basic structure is used
   - Error is logged but doesn't interrupt process
   - User receives functional structure even with error

---

## 💡 Tips

1. **Use More Capable Models for Better Results**
   - `gpt-4o` or `claude-3-5-sonnet` for deeper analyses
   - Cheaper models (`gpt-4o-mini`, `gemini-1.5-flash`) for testing

2. **Combine with Advanced Mode**
   - `setai init --advanced --beta` for maximum customization

3. **Review Generated Content**
   - Always review AI-enriched content
   - Adjust manually if necessary

4. **Configure Multiple Providers**
   - Configure backup providers for greater reliability
   - CLI uses automatic fallback

---

## 🔗 Related Links

- [Configuration](./CONFIGURATION.md) - How to configure API keys
- [Providers](./PROVIDERS.md) - Details about supported providers
- [Advanced Usage](./USAGE_ADVANCED.md) - Combine with advanced mode
- [Examples](./EXAMPLES.md) - Practical examples with AI
