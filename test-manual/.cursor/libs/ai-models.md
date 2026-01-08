# AI Models

## Objetivo
Este arquivo define quais modelos de IA são permitidos e quando usar cada um, baseado no comparativo de modelos.

## Escopo
- Modelos permitidos por fase
- Quando usar cada modelo
- Configurações recomendadas

---

## Modelos Permitidos

### Claude 4.5 Opus (Anthropic)
- **Contexto:** 200k tokens
- **Status:** ALLOWED
- **Best for:**
  - Arquitetura e decisões técnicas complexas
  - Trade-offs (performance vs custo vs manutenção)
  - Antes do código existir
- **Ponto forte:** Pensamento profundo, menos over-engineering

---

### Claude 4.5 Sonnet (Anthropic)
- **Contexto:** 200k → 1M tokens
- **Status:** ALLOWED
- **Best for:**
  - Refatoração de código legado
  - Leitura de código grande
  - Ajustes incrementais
- **Ponto forte:** Conservador, respeita código existente, não quebra produção

---

### GPT-5.2 (OpenAI)
- **Contexto:** 272k tokens
- **Status:** ALLOWED
- **Best for:**
  - Planejamento técnico
  - Definição de padrões
  - Documentação estruturada
  - Revisões de PR conceituais
- **Ponto forte:** Consistência, padronização, governança técnica

---

### GPT-5.1 Codex Max (OpenAI)
- **Contexto:** 272k tokens
- **Status:** ALLOWED
- **Best for:**
  - Escrita de código
  - APIs
  - Testes
  - Integrações
- **Ponto forte:** Execução precisa, menos devaneio, ideal para produção

---

### Cursor Composer + GPT-5.1 Codex
- **Contexto:** 200k tokens
- **Status:** ALLOWED (preferred for daily work)
- **Best for:**
  - Desenvolvimento diário
  - Trabalhar com código real
  - Evolução incremental
- **Ponto forte:** Contexto do repositório, trabalhar no código (não apenas gerar)

---

### Gemini 3 Flash (Google)
- **Contexto:** 200k → 1M tokens
- **Status:** ALLOWED
- **Best for:**
  - Boilerplate
  - Scripts rápidos
  - Conversões simples
- **Ponto forte:** Velocidade extrema, baixo custo
- **Limite:** Não ideal para decisões arquiteturais

---

### Gemini 3 Pro (Google)
- **Contexto:** 200k → 1M tokens
- **Status:** ALLOWED
- **Best for:**
  - Análise de grandes bases
  - Debug complexo
  - Revisão de múltiplos arquivos
- **Ponto forte:** Leitura de contexto massivo, boa análise estática

---

### Grok Code (xAI)
- **Status:** ALLOWED (with caution)
- **Best for:**
  - Explorar alternativas
  - Questionar decisões
  - Pensamento não convencional
- **Ponto forte:** Menos alinhado, mais provocativo
- **Limite:** Exige mais validação humana

---

## Uso por Fase do Ciclo

### Ideação & Arquitetura
- **Primary:** Claude 4.5 Opus
- **Alternative:** GPT-5.2

### Planejamento Técnico
- **Primary:** GPT-5.2
- **Alternative:** Claude 4.5 Opus

### Implementação Guiada
- **Primary:** Cursor Composer + GPT-5.1 Codex
- **Alternative:** GPT-5.1 Codex Max

### Refatoração & Legado
- **Primary:** Claude 4.5 Sonnet
- **Alternative:** Gemini 3 Pro

### Debug & Análise
- **Primary:** Gemini 3 Pro
- **Alternative:** Claude 4.5 Sonnet

### Código Rápido / Boilerplate
- **Primary:** Gemini 3 Flash
- **Alternative:** GPT-5.1 Codex

### Exploração & Alternativas
- **Primary:** Grok Code
- **Alternative:** Claude 4.5 Opus

---

## Regras de Uso

### Obrigatório
- Sempre revisar output da IA
- Validar código gerado com testes
- Não aceitar decisões arquiteturais sem revisão humana

### Proibido
- Usar IA para decisões de segurança sem revisão
- Aceitar código sem entender
- Pular testes em código gerado

---

## Configuração no Cursor

### Model Selection
- Configure modelos permitidos nas settings
- Use modelo apropriado para cada tarefa
- Não use modelos não listados sem aprovação

### Context Configuration
- Configure contexto máximo disponível
- Use contexto completo quando necessário
- Não desperdice tokens com contexto desnecessário

---

## Related Documentation

- **AI Usage Rules:** `.cursor/rules/ai-usage-rules.md`
- **Commands:** `.cursor/commands/` (prompts específicos)

