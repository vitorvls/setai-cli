# SetAI CLI - Documentação para Desenvolvedores

Bem-vindo à documentação técnica do SetAI CLI! Esta seção é voltada para desenvolvedores que trabalham no projeto, incluindo manutenção, suporte e onboarding de novos membros da equipe.

## 📚 Índice

1. [Estrutura do Projeto](./ESTRUTURA_PROJETO) - Visão geral de todas as pastas e arquivos
2. [Arquivos Principais](./ARQUIVOS_PRINCIPAIS) - Descrição detalhada dos principais arquivos
3. [Arquitetura](./ARQUITETURA) - Arquitetura do sistema e design patterns
4. [Guia de Desenvolvimento](./DESENVOLVIMENTO) - Como desenvolver e contribuir
5. [Guia de Testes](./TESTES) - Estratégia de testes e como escrever testes
6. [Contribuindo](./CONTRIBUINDO) - Guia para contribuidores
7. [Fluxo de Dados](./FLUXO_DADOS) - Como os dados fluem pelo sistema
8. [Internacionalização](./INTERNACIONALIZACAO) - Sistema de i18n e como adicionar idiomas

## 🎯 Objetivo desta Documentação

Esta documentação foi criada para:

- **Novos Desenvolvedores**: Entender rapidamente a estrutura e começar a contribuir
- **Manutenção**: Facilitar a identificação de onde fazer mudanças
- **Suporte**: Entender o funcionamento interno para resolver problemas
- **Arquitetura**: Compreender as decisões de design e padrões utilizados

## 🏗️ Visão Geral do Projeto

O SetAI CLI é uma ferramenta de linha de comando que gera automaticamente estruturas de configuração para IDEs com suporte a IA (principalmente Cursor). O projeto é construído com:

- **TypeScript** - Linguagem principal
- **Node.js 18+** - Runtime
- **Commander.js** - Framework CLI
- **Inquirer.js** - Prompts interativos
- **Vitest** - Framework de testes
- **tsup** - Build tool

## 📦 Estrutura Rápida

```
setai/
├── src/              # Código fonte TypeScript
├── dist/            # Build compilado (gerado)
├── templates/       # Templates para geração de arquivos
├── locales/         # Traduções (i18n)
├── docs/            # Documentação
└── scripts/         # Scripts auxiliares
```

## 🚀 Quick Start para Desenvolvedores

1. **Clone o repositório**
   ```bash
   git clone <repo-url>
   cd setai
   ```

2. **Instale dependências**
   ```bash
   pnpm install
   ```

3. **Execute em modo desenvolvimento**
   ```bash
   pnpm dev
   ```

4. **Execute testes**
   ```bash
   pnpm test
   ```

5. **Build para produção**
   ```bash
   pnpm build
   ```

## 📖 Próximos Passos

- Leia [ESTRUTURA_PROJETO](./ESTRUTURA_PROJETO) para entender a organização
- Veja [ARQUIVOS_PRINCIPAIS](./ARQUIVOS_PRINCIPAIS) para conhecer os arquivos principais
- Consulte [ARQUITETURA](./ARQUITETURA) para entender o design do sistema
- Siga [DESENVOLVIMENTO](./DESENVOLVIMENTO) para começar a desenvolver

## 🔗 Links Úteis

- [Documentação do Usuário](/Documentation/README) - Documentação para usuários finais
- [README Principal](/README) - README do projeto

## ❓ Dúvidas?

Se você tiver dúvidas sobre o código ou a arquitetura:

1. Consulte a documentação relevante nesta pasta
2. Verifique os comentários no código (código em inglês, comentários em português)
3. Veja os testes para exemplos de uso
4. Abra uma issue no repositório

---

**Última atualização**: 2024
