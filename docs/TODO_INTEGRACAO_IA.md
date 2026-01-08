# TODO: Integração com Modelos de IA

## Objetivo

Integrar o SetAI CLI com modelos de IA para analisar as respostas do usuário e gerar automaticamente descrições avançadas e melhores práticas para os arquivos da estrutura de configuração (`.cursor`, `.ai`, ou pasta padrão da IDE).

**Nota:** O CLI suporta múltiplas IDEs (Cursor, VS Code, JetBrains, etc.) e pode gerar a estrutura em diferentes pastas conforme a IDE escolhida.

## Status

🟡 **PENDENTE** - Não implementado

## Funcionalidade Proposta

### Visão Geral

Quando o usuário executar `setai init --advanced --beta`, após coletar todas as respostas, o CLI deve:

1. **Enviar respostas para modelo de IA** (ex: Claude 4.5 Opus, GPT-5.2)
2. **IA analisa e interpreta** as respostas do usuário
3. **IA gera descrições avançadas** baseadas em melhores práticas
4. **IA preenche arquivos `.cursor`** com conteúdo enriquecido

### Fluxo Proposto

```
Usuário executa: setai init --advanced --beta
    ↓
CLI pergunta qual IDE está usando (Cursor, VS Code, JetBrains, etc.)
    ↓
CLI determina pasta de configuração (.cursor, .ai, .vscode, etc.)
    ↓
CLI coleta respostas básicas (obrigatórias)
    ↓
CLI coleta respostas avançadas (opcionais)
    ↓
CLI envia respostas para modelo de IA (apenas com --beta)
    ↓
IA analisa e interpreta:
  - Contexto do projeto
  - Stack tecnológica
  - Objetivos de negócio
  - Preferências de IA
    ↓
IA gera conteúdo enriquecido:
  - Descrições detalhadas para project-goals.md
  - Decisões arquiteturais para architecture.md
  - Regras customizadas para ai-usage-rules.md
  - Recomendações baseadas em melhores práticas
    ↓
CLI preenche templates com conteúdo gerado pela IA
    ↓
Estrutura gerada na pasta apropriada com conteúdo avançado
```

## Componentes Necessários

### 1. AI Service Module

**Arquivo:** `src/services/ai-service.ts`

**Responsabilidades:**
- Conectar com APIs de modelos de IA (OpenAI, Anthropic, Google)
- Enviar prompts estruturados
- Receber e processar respostas
- Tratar erros e rate limits

**Interfaces:**
```typescript
interface AIService {
  analyzeProjectInfo(projectInfo: ProjectInfo): Promise<EnhancedProjectInfo>;
  generateDescription(context: string): Promise<string>;
  suggestBestPractices(domain: string): Promise<string[]>;
}
```

### 2. Prompt Templates

**Arquivo:** `src/prompts/`

**Templates necessários:**
- `analyze-project.prompt.md` - Análise geral do projeto
- `generate-goals.prompt.md` - Geração de objetivos de negócio
- `generate-architecture.prompt.md` - Geração de decisões arquiteturais
- `generate-ai-rules.prompt.md` - Geração de regras de uso de IA

### 3. Enhanced Project Info

**Arquivo:** `src/types/enhanced-project-info.ts`

**Extensão de ProjectInfo:**
```typescript
interface EnhancedProjectInfo extends ProjectInfo {
  aiGenerated?: {
    projectDescription?: string;      // Versão enriquecida
    problemImportance?: string;        // Versão enriquecida
    businessGoals?: string[];          // Lista expandida
    architectureDecisions?: string[];  // Decisões arquiteturais
    bestPractices?: string[];          // Melhores práticas
    aiUsageGuidelines?: string;        // Diretrizes customizadas
  };
}
```

### 4. Configuration

**Arquivo:** `src/config/ai-config.ts`

**Configurações:**
- API Keys (variáveis de ambiente)
- Modelo padrão a usar
- Timeout e retry policies
- Rate limiting

## Modelos de IA Recomendados

### Para Análise e Geração de Conteúdo

1. **Claude 4.5 Opus** (Anthropic)
   - Melhor para: Análise profunda, geração de documentação
   - Contexto: 200k tokens
   - Quando usar: Análise de projeto completo

2. **GPT-5.2** (OpenAI)
   - Melhor para: Estruturação, padronização
   - Contexto: 272k tokens
   - Quando usar: Geração de regras e padrões

3. **Gemini 3 Pro** (Google)
   - Melhor para: Análise de contexto grande
   - Contexto: 1M tokens
   - Quando usar: Projetos complexos com muito contexto

## Exemplo de Uso

### Prompt para IA

```markdown
Você é um especialista em desenvolvimento de software e arquitetura.

Analise as seguintes informações do projeto:

**Nome:** {{PROJECT_NAME}}
**Descrição:** {{PROJECT_DESCRIPTION}}
**Linguagem:** {{LANGUAGE}}
**Framework:** {{FRAMEWORK}}
**Objetivos:** {{BUSINESS_GOALS}}

Com base nessas informações e nas melhores práticas da indústria:

1. Gere uma descrição detalhada e profissional do problema que este projeto resolve
2. Explique a importância do problema de forma convincente
3. Liste 5-7 objetivos de negócio específicos e mensuráveis
4. Sugira 3-5 decisões arquiteturais iniciais
5. Recomende melhores práticas específicas para este tipo de projeto

Formato de resposta: JSON estruturado
```

### Resposta Esperada

```json
{
  "enhancedDescription": "Este projeto resolve o problema de...",
  "problemImportance": "Este problema importa porque...",
  "businessGoals": [
    "Objetivo 1 específico e mensurável",
    "Objetivo 2 específico e mensurável",
    ...
  ],
  "architectureDecisions": [
    "Decisão arquitetural 1",
    "Decisão arquitetural 2",
    ...
  ],
  "bestPractices": [
    "Prática recomendada 1",
    "Prática recomendada 2",
    ...
  ]
}
```

## Considerações de Implementação

### Segurança

- ✅ API Keys em variáveis de ambiente
- ✅ Não enviar informações sensíveis
- ✅ Validação de respostas da IA
- ✅ Sanitização de conteúdo gerado

### Performance

- ⚠️ Timeout de 30s por requisição
- ⚠️ Cache de respostas similares (opcional)
- ⚠️ Retry com backoff exponencial

### Custo

- ⚠️ Estimar custo por execução
- ⚠️ Considerar rate limits
- ⚠️ Opção de usar modelos mais baratos

### UX

- ✅ Mostrar progresso ("Analisando com IA...")
- ✅ Permitir pular integração com IA
- ✅ Mostrar preview antes de aplicar
- ✅ Permitir edição manual após geração

## Dependências Necessárias

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.20.0",
    "openai": "^4.20.0",
    "@google/generative-ai": "^0.2.0"
  }
}
```

## Testes Necessários

1. **Unit Tests:**
   - Mock de serviços de IA
   - Teste de parsing de respostas
   - Teste de tratamento de erros

2. **Integration Tests:**
   - Teste com API real (com API key de teste)
   - Teste de timeout
   - Teste de rate limiting

3. **E2E Tests:**
   - Fluxo completo com IA
   - Validação de conteúdo gerado

## Prioridade

🟡 **MÉDIA** - Funcionalidade desejável mas não crítica para MVP

## Estimativa

- **Desenvolvimento:** 2-3 semanas
- **Testes:** 1 semana
- **Documentação:** 3 dias

## Bloqueadores

- [ ] Definir qual modelo de IA usar como padrão
- [ ] Obter API keys para testes
- [ ] Definir estrutura de prompts
- [ ] Decidir sobre cache de respostas

## Próximos Passos

1. Criar módulo `ai-service.ts` básico
2. Implementar integração com um modelo (ex: OpenAI)
3. Criar templates de prompts
4. Testar com projetos reais
5. Iterar baseado em feedback

---

**Nota:** Esta funcionalidade será implementada em uma versão futura do SetAI CLI, após validação do MVP.

