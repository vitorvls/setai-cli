# Prompt: Análise de Projeto

Você é um especialista em desenvolvimento de software e arquitetura.

Analise as seguintes informações do projeto:

**Nome do Projeto:** {{PROJECT_NAME}}
**Descrição:** {{PROJECT_DESCRIPTION}}
**Importância do Problema:** {{PROBLEM_IMPORTANCE}}
**Usuários Principais:** {{TARGET_USERS}}
**Objetivos de Negócio:** {{BUSINESS_GOALS}}
**Linguagem:** {{LANGUAGE}}
**Framework:** {{FRAMEWORK}}
**Banco de Dados:** {{DATABASE}}
**Restrições Técnicas:** {{TECHNICAL_CONSTRAINTS}}
**Restrições de Negócio:** {{BUSINESS_CONSTRAINTS}}
**Não-objetivos:** {{NON_GOALS}}

Com base nessas informações e nas melhores práticas da indústria, gere uma análise completa em formato JSON estruturado com os seguintes campos:

```json
{
  "enhancedDescription": "Descrição detalhada e profissional do problema que este projeto resolve, expandindo a descrição original com contexto técnico e de negócio",
  "problemImportance": "Explicação detalhada e convincente da importância do problema, incluindo impacto e urgência",
  "businessGoals": [
    "Objetivo de negócio 1 específico e mensurável",
    "Objetivo de negócio 2 específico e mensurável",
    "Objetivo de negócio 3 específico e mensurável"
  ],
  "architectureDecisions": [
    "Decisão arquitetural 1 baseada no contexto do projeto",
    "Decisão arquitetural 2 baseada no contexto do projeto",
    "Decisão arquitetural 3 baseada no contexto do projeto"
  ],
  "bestPractices": [
    "Melhor prática 1 específica para este tipo de projeto",
    "Melhor prática 2 específica para este tipo de projeto",
    "Melhor prática 3 específica para este tipo de projeto"
  ],
  "aiUsageGuidelines": "Diretrizes customizadas para uso de IA neste projeto específico, considerando a stack tecnológica e objetivos de negócio",
  "communicationPattern": "Como os componentes do sistema se comunicam (APIs REST, GraphQL, mensageria, eventos, etc.)",
  "interactionModel": "Modelo de interação do sistema (síncrono, assíncrono, eventos, polling, etc.)",
  "sourceOfTruth": "Onde está a fonte de verdade dos dados (banco de dados, APIs externas, arquivos, etc.)",
  "cachingStrategy": "Estratégia de cache (quando usar, onde armazenar, TTL, invalidação, etc.)",
  "stateManagement": "Como o estado é gerenciado (Redux, Context API, Zustand, estado local, etc.)",
  "authentication": "Como a autenticação é feita (JWT, OAuth, sessões, etc.)",
  "authorization": "Como a autorização é gerenciada (RBAC, permissões, roles, etc.)",
  "securityConstraints": "Restrições de segurança específicas do projeto (validação de inputs, sanitização, HTTPS, etc.)",
  "expectedScale": "Escala esperada (número de usuários, requisições por segundo, volume de dados, etc.)",
  "scalingStrategy": "Estratégia de escalamento (horizontal, vertical, auto-scaling, CDN, etc.)",
  "failureHandling": "Como falhas são tratadas (retry, circuit breaker, fallback, rollback, etc.)",
  "loggingStrategy": "Estratégia de logging (onde, formato, níveis, retenção, etc.)",
  "monitoringMetrics": "Monitoramento (ferramentas, métricas importantes, dashboards, etc.)",
  "alertsIncidentHandling": "Alertas (quando disparar, canais, runbooks, etc.)",
  "architecturalStyle": "Estilo arquitetural do projeto (microserviços, monolito, serverless, etc.)",
  "designPatterns": [
    "Padrão de design 1 usado no projeto",
    "Padrão de design 2 usado no projeto",
    "Padrão de design 3 usado no projeto"
  ],
  "architectureDiagrams": {
    "highLevelFlow": "Descrição detalhada do fluxo de alto nível do sistema, incluindo principais componentes, fluxo de dados e interações. Use formato texto descritivo que pode ser usado para criar diagramas.",
    "componentInteraction": "Descrição detalhada de como os componentes interagem entre si, incluindo protocolos de comunicação, dependências e fluxos de dados."
  },
  "tradeOffs": [
    {
      "decision": "Decisão arquitetural específica tomada",
      "alternative": "Alternativa considerada",
      "chosen": "Opção escolhida e razão",
      "sacrificed": "Benefício da opção não escolhida"
    },
    {
      "decision": "Outra decisão arquitetural",
      "alternative": "Outra alternativa",
      "chosen": "Opção escolhida e razão",
      "sacrificed": "Benefício da opção não escolhida"
    }
  ],
  "limitations": [
    "Limitação conhecida 1 do projeto",
    "Limitação conhecida 2 do projeto",
    "Limitação conhecida 3 do projeto"
  ]
}
```

**Instruções IMPORTANTES:**
- Seja específico e detalhado em TODOS os campos
- Baseie-se em melhores práticas da indústria
- Considere a stack tecnológica escolhida ({{LANGUAGE}}, {{FRAMEWORK}}, {{DATABASE}})
- Foque em objetivos mensuráveis e práticos
- Use linguagem profissional mas acessível
- Preencha TODOS os campos - não deixe nenhum vazio ou genérico
- Para campos de array, forneça pelo menos 3 itens relevantes
- Para `architectureDiagrams`, forneça descrições detalhadas que possam ser usadas para criar diagramas
- Para `tradeOffs`, forneça pelo menos 2 decisões arquiteturais importantes com suas alternativas
- Para `limitations`, liste limitações conhecidas e realistas do projeto
- Retorne APENAS o JSON válido, sem markdown ou texto adicional

