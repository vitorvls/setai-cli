# Modo Beta (IA) - SetAI CLI

Guia completo sobre o uso do modo Beta com integração de modelos de IA.

## 🎯 Visão Geral

O modo Beta (`--beta`) habilita a integração com modelos de IA para **enriquecer automaticamente** as respostas do usuário. A IA analisa as informações fornecidas e gera descrições detalhadas, objetivos expandidos, decisões arquiteturais e melhores práticas.

---

## ⚠️ Status: BETA

Esta funcionalidade está em **BETA** e requer:
- API keys configuradas (veja [Configuração](./CONFIGURATION.md))
- Tokens do usuário serão consumidos
- Requer conexão com internet

---

## 🚀 Comando Beta

### `setai init --beta`

Gera estrutura com enriquecimento automático via IA.

**Sintaxe:**
```bash
setai init --beta
```

**Combinado com avançado:**
```bash
setai init --advanced --beta
```

---

## 📋 Pré-requisitos

### 1. Configurar API Keys

Antes de usar o modo Beta, você precisa configurar pelo menos uma API key:

```bash
setai config
```

**Opções disponíveis:**
- **OpenAI** (GPT-4, GPT-3.5)
- **Anthropic** (Claude 3.5)
- **Google** (Gemini 1.5)

**Veja:** [Configuração Completa](./CONFIGURATION.md)

---

## 🔄 Fluxo com IA

```
1. Responder perguntas básicas (ou avançadas)
   ↓
2. CLI verifica API keys configuradas
   ↓
3. CLI envia respostas para modelo de IA
   ↓
4. IA analisa e enriquece:
   - Descrições detalhadas
   - Objetivos expandidos
   - Decisões arquiteturais
   - Melhores práticas
   ↓
5. CLI processa resposta da IA
   ↓
6. CLI valida e sanitiza JSON
   ↓
7. CLI preenche templates com conteúdo enriquecido
   ↓
8. Estrutura gerada com conteúdo avançado ✅
```

---

## 🤖 O que a IA Faz

### Análise Automática

A IA recebe todas as informações coletadas e gera:

1. **Descrição Enriquecida**
   - Expande a descrição original
   - Adiciona contexto técnico e de negócio
   - Torna mais profissional e detalhada

2. **Importância do Problema Expandida**
   - Explica melhor o impacto
   - Adiciona urgência e relevância
   - Conecta com objetivos de negócio

3. **Objetivos de Negócio Expandidos**
   - Lista 5-7 objetivos específicos
   - Torna objetivos mensuráveis
   - Baseado em melhores práticas

4. **Decisões Arquiteturais**
   - Sugere 3-5 decisões arquiteturais
   - Baseadas na stack tecnológica
   - Alinhadas com objetivos

5. **Melhores Práticas**
   - Lista 3-5 práticas específicas
   - Para o tipo de projeto
   - Baseadas em experiência da indústria

6. **Diretrizes de Uso de IA**
   - Recomendações customizadas
   - Para o projeto específico
   - Considerando stack e objetivos

---

## 📊 Exemplo de Enriquecimento

### Antes (Resposta do Usuário)

**Descrição:**
```
Sistema de gerenciamento de tarefas
```

**Objetivos:**
```
Aumentar produtividade
```

### Depois (Enriquecido pela IA)

**Descrição Enriquecida:**
```
Este projeto resolve o problema crítico de desorganização e falta de visibilidade
sobre o progresso de tarefas em equipes de desenvolvimento. O sistema oferece uma
plataforma centralizada para gerenciamento de tarefas, permitindo que desenvolvedores,
product managers e tech leads acompanhem o status de projetos, priorizem trabalho
e colaborem de forma eficiente. A solução integra-se com ferramentas de desenvolvimento
existentes e fornece métricas em tempo real para tomada de decisão baseada em dados.
```

**Objetivos Expandidos:**
```json
[
  "Reduzir tempo médio de conclusão de tarefas em 30% através de melhor organização",
  "Aumentar visibilidade de progresso para stakeholders em 100%",
  "Melhorar satisfação da equipe através de ferramentas intuitivas",
  "Reduzir retrabalho através de rastreamento adequado de dependências",
  "Estabelecer métricas de produtividade mensuráveis e acionáveis"
]
```

---

## 🔧 Configuração de Provedores

### Prioridade Automática

O CLI tenta usar os provedores nesta ordem:

1. **OpenAI** (se configurado)
2. **Anthropic** (se OpenAI falhar ou não estiver configurado)
3. **Google** (se anteriores falharem ou não estiverem configurados)

### Fallback Automático

Se um provedor falhar, o CLI automaticamente tenta o próximo:

```
Tentando OpenAI...
⚠️  Erro ao usar OpenAI, tentando outros provedores...
   Usando Anthropic (Claude)...
✅ Respostas enriquecidas com IA!
```

---

## 📝 Exemplo de Uso Completo

### Passo 1: Configurar API Key

```bash
$ setai config

🔧 Configuração do SetAI CLI

Arquivo de configuração: ~/.setai/config.json

? O que deseja fazer?
  ❯ ➕ Adicionar/Atualizar API Key

? Qual provedor de IA?
  ❯ OpenAI (GPT-4, GPT-3.5, etc.)

? Digite sua API Key:
> sk-...

? Qual modelo usar por padrão?
  ❯ gpt-4o (Recomendado - Mais capaz)

✅ API Key do openai configurada com sucesso!
   Modelo padrão: gpt-4o
```

### Passo 2: Executar com Beta

```bash
$ setai init --beta

# ... perguntas básicas ...

⚠️  Modo BETA ativado: Integração com IA será usada para enriquecer respostas.

   Certifique-se de ter configurado suas API keys executando: setai config

✅ Informações coletadas:
   Projeto: meu-projeto
   Versão: 0.1.0
   Linguagem: TypeScript
   IDE: Cursor
   Pasta: .cursor/

🤖 Enriquecendo respostas com IA...
   Analisando respostas com IA...
   Usando OpenAI...
✅ Respostas enriquecidas com IA!

📝 Processando templates...
📁 Gerando arquivos...

🎉 Estrutura .cursor/ gerada com sucesso!
```

---

## 🎯 Quando Usar Modo Beta

✅ **Use quando:**
- Quer descrições profissionais e detalhadas
- Precisa de objetivos expandidos e mensuráveis
- Quer sugestões de decisões arquiteturais
- Precisa de recomendações de melhores práticas
- Quer diretrizes customizadas de uso de IA
- Tem API keys configuradas
- Está disposto a consumir tokens

❌ **Não use quando:**
- Não tem API keys configuradas
- Não quer consumir tokens
- Prefere escrever tudo manualmente
- A estrutura básica é suficiente
- Está offline

---

## 💰 Custo de Tokens

### Estimativa por Execução

**OpenAI (gpt-4o):**
- Input: ~500-1000 tokens
- Output: ~1000-2000 tokens
- Custo aproximado: $0.01 - $0.05 por execução

**Anthropic (claude-3-5-sonnet):**
- Input: ~500-1000 tokens
- Output: ~1000-2000 tokens
- Custo aproximado: $0.015 - $0.06 por execução

**Google (gemini-1.5-pro):**
- Input: ~500-1000 tokens
- Output: ~1000-2000 tokens
- Custo aproximado: $0.001 - $0.005 por execução

**Nota:** Custos são estimativas e podem variar. Consulte os preços oficiais de cada provedor.

---

## 🔒 Segurança e Privacidade

### O que é Enviado para a IA

- Nome do projeto
- Descrição do problema
- Importância do problema
- Usuários principais
- Objetivos de negócio
- Stack tecnológica
- Restrições técnicas e de negócio
- Não-objetivos

### O que NÃO é Enviado

- Código do projeto
- Arquivos do projeto
- Informações sensíveis
- Credenciais
- Dados de usuários

### Armazenamento

- API keys são armazenadas localmente em `~/.setai/config.json`
- Nenhuma informação é enviada para servidores do SetAI CLI
- Comunicação direta com APIs dos provedores (OpenAI, Anthropic, Google)

---

## ⚙️ Tratamento de Erros

### Erros Comuns

#### 1. "Nenhuma API key configurada"

**Solução:**
```bash
setai config
# Configure pelo menos uma API key
```

#### 2. "API Key inválida"

**Solução:**
```bash
setai config
# Remova a API key antiga
# Adicione uma nova API key válida
```

#### 3. "Limite de requisições excedido"

**Solução:**
- Aguarde alguns minutos
- Verifique seu plano na plataforma do provedor
- O CLI faz retry automático (até 3 tentativas)

#### 4. "Cota de API esgotada"

**Solução:**
- Verifique seu plano e créditos
- Configure outro provedor como alternativa
- O CLI tentará outros provedores automaticamente

#### 5. "Erro ao processar resposta da IA"

**Solução:**
- O CLI continua sem enriquecimento
- Estrutura básica ainda é gerada
- Verifique os logs para mais detalhes

---

## 🔄 Retry Automático

O CLI implementa retry automático com backoff exponencial:

- **Tentativas:** Até 3
- **Delay inicial:** 1 segundo
- **Delay máximo:** 10 segundos
- **Multiplicador:** 2x

**Erros que são retentados:**
- Rate limit (429)
- Timeout
- Erros de conexão temporários

**Erros que NÃO são retentados:**
- API Key inválida (401)
- Cota esgotada
- Erros de autenticação

---

## 📊 Validação de Respostas

### Processo de Validação

1. **Extração de JSON**
   - Remove markdown code blocks se presente
   - Extrai JSON de texto misto
   - Tenta parse direto

2. **Validação com Schema**
   - Valida estrutura com Zod
   - Verifica tipos de dados
   - Sanitiza campos

3. **Tratamento de Erros**
   - Se validação falhar, estrutura básica é usada
   - Erro é logado mas não interrompe o processo
   - Usuário recebe estrutura funcional mesmo com erro

---

## 💡 Dicas

1. **Use Modelos Mais Capazes para Melhores Resultados**
   - `gpt-4o` ou `claude-3-5-sonnet` para análises mais profundas
   - Modelos mais baratos (`gpt-4o-mini`, `gemini-1.5-flash`) para testes

2. **Combine com Modo Avançado**
   - `setai init --advanced --beta` para máximo de personalização

3. **Revise Conteúdo Gerado**
   - Sempre revise o conteúdo enriquecido pela IA
   - Ajuste manualmente se necessário

4. **Configure Múltiplos Provedores**
   - Configure backup providers para maior confiabilidade
   - O CLI usa fallback automático

---

## 🔗 Links Relacionados

- [Configuração](./CONFIGURATION.md) - Como configurar API keys
- [Providers](./PROVIDERS.md) - Detalhes sobre provedores suportados
- [Uso Avançado](./USAGE_ADVANCED.md) - Combinar com modo avançado
- [Exemplos](./EXAMPLES.md) - Exemplos práticos com IA

