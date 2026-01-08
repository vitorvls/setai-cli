# Documentação SetAI CLI

Esta pasta contém a documentação do SetAI CLI que pode ser visualizada em um navegador.

## 🚀 Como Visualizar

### Opção 1: Usando o script npm/pnpm (Recomendado)

```bash
# Abre automaticamente no navegador
pnpm docs:serve

# Ou apenas inicia o servidor
pnpm docs
```

O servidor será iniciado em `http://localhost:3000` e abrirá automaticamente no seu navegador.

### Opção 2: Usando docsify diretamente

```bash
# Instalar globalmente (se ainda não tiver)
npm install -g docsify-cli

# Iniciar servidor
docsify serve docs --port 3000 --open
```

### Opção 3: Usando outro servidor HTTP

Se preferir usar outro servidor HTTP estático:

```bash
# Com Python
cd docs
python -m http.server 3000

# Com Node.js (http-server)
npx http-server docs -p 3000

# Com PHP
cd docs
php -S localhost:3000
```

Depois acesse: `http://localhost:3000`

## 📁 Estrutura

- `index.html` - Página principal do Docsify
- `_sidebar.md` - Menu lateral de navegação
- `Documentation/` - Todos os arquivos de documentação em Markdown

## 🔧 Personalização

Você pode personalizar a aparência editando `docs/index.html`:

- Tema: Altere `vue.css` para outro tema do Docsify
- Cores: Adicione CSS customizado na tag `<style>`
- Plugins: Adicione mais plugins do Docsify

## 📚 Documentação

A documentação está organizada em:

- **Português (pt-BR)**: `Documentation/*.md`
- **English (en)**: `Documentation/en/*.md`
- **Español (es)**: `Documentation/es/*.md`
