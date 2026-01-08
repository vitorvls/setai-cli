# FAQ - SetAI CLI

Perguntas frequentes sobre o SetAI CLI.

## 📋 Geral

### O que é o SetAI CLI?

CLI Tool que gera automaticamente estruturas de configuração para desenvolvimento assistido por IA, aplicando melhores práticas.

### Para que serve?

Facilita a configuração inicial de projetos que usam IA para desenvolvimento, gerando estrutura completa com regras, contexto e configurações.

### É gratuito?

Sim, o CLI é open source e gratuito. O modo Beta consome tokens dos provedores de IA (OpenAI, Anthropic, Google), que têm seus próprios custos.

---

## 🚀 Instalação

### Como instalar?

```bash
npm install -g @setai/cli
```

### Requisitos?

- Node.js >= 18.0.0
- npm, pnpm ou yarn

### Como verificar instalação?

```bash
setai --version
```

---

## 💻 Uso

### Como usar pela primeira vez?

```bash
setai init
```

### Posso pular perguntas?

Não, perguntas básicas são obrigatórias. No modo avançado, você pode escolher quais grupos responder.

### Posso editar depois?

Sim! Todos os arquivos gerados são editáveis.

### E se eu errar uma resposta?

Execute `setai init` novamente. Será perguntado se deseja sobrescrever.

---

## 🔧 Configuração

### Onde são armazenadas as API keys?

Em `~/.setai/config.json` (local, não commitado no Git).

### É seguro?

Sim, desde que:
- Permissões corretas do arquivo
- Não commitado no Git
- Mantido localmente

### Posso usar variáveis de ambiente?

Atualmente, apenas arquivo de configuração é suportado.

---

## 🤖 Modo Beta

### O que é o modo Beta?

Integração com modelos de IA para enriquecer automaticamente as respostas.

### Quanto custa?

Depende do provedor e modelo. Estimativa: $0.01 - $0.05 por execução.

### É obrigatório?

Não, é opcional. Você pode usar o CLI sem o modo Beta.

### Quais provedores são suportados?

- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude 3.5)
- Google (Gemini 1.5)

---

## 📁 Estrutura

### Onde é gerada a estrutura?

Depende da IDE:
- Cursor → `.cursor/`
- VS Code → `.vscode/`
- JetBrains → `.idea/`
- Outra → `.ai/` ou customizada

### Posso ter múltiplas estruturas?

Sim, você pode ter `.cursor/` e `.vscode/` no mesmo projeto.

### A estrutura deve ser commitada?

Sim, a estrutura deve ser commitada no Git para que toda a equipe tenha acesso.

---

## ❓ Problemas

### "Comando não encontrado"

Verifique se foi instalado globalmente:
```bash
npm list -g @setai/cli
```

### "Permissão negada"

Use `sudo` (Linux/macOS) ou execute como administrador (Windows).

### "Estrutura já existe"

O CLI pergunta se deseja sobrescrever. Responda `Yes` se quiser substituir.

### "API Key inválida"

Execute `setai config` e configure uma nova API key válida.

---

## 🔗 Links

- [Getting Started](./GETTING_STARTED.md)
- [Troubleshooting](./TROUBLESHOOTING.md)
- [Configuração](./CONFIGURATION.md)

