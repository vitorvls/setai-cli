/**
 * OpenAI Provider - Implementação do provedor OpenAI
 */

import OpenAI from 'openai';
import type { AIGeneratedContent } from '../ai-service.js';
import type { ProjectInfo } from '../../types/project-info.js';
import { getAPIKey, loadConfig } from '../../config/config-manager.js';
import { error } from '../../utils/output.js';
import { retryWithBackoff } from '../../utils/retry.js';
import { extractJSON, validateAIContent } from '../../utils/json-validator.js';

export interface OpenAIProviderConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Classe para interagir com a API da OpenAI
 */
export class OpenAIProvider {
  private client: OpenAI;
  private model: string;
  private temperature: number;
  private maxTokens: number;

  constructor(config: OpenAIProviderConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
    });
    this.model = config.model || 'gpt-4o';
    this.temperature = config.temperature ?? 0.7;
    this.maxTokens = config.maxTokens ?? 2000;
  }

  /**
   * Cria uma instância do provider a partir da configuração salva
   */
  static async create(): Promise<OpenAIProvider | null> {
    const apiKey = await getAPIKey('openai');
    if (!apiKey) {
      return null;
    }

    const config = await loadConfig();
    const defaultModel = config.ai?.openai?.defaultModel || 'gpt-4o';

    return new OpenAIProvider({
      apiKey,
      model: defaultModel,
    });
  }

  /**
   * Gera conteúdo usando a API da OpenAI com retry automático
   */
  async generateContent(prompt: string): Promise<string> {
    return retryWithBackoff(
      async () => {
        try {
          const response = await this.client.chat.completions.create({
            model: this.model,
            messages: [
              {
                role: 'system',
                content:
                  'Você é um especialista em desenvolvimento de software e arquitetura. Responda sempre em formato JSON válido quando solicitado.',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: this.temperature,
            max_tokens: this.maxTokens,
            response_format: { type: 'json_object' },
          });

          const content = response.choices[0]?.message?.content;
          if (!content) {
            throw new Error('Resposta vazia da API da OpenAI');
          }

          return content;
        } catch (err) {
          if (err instanceof Error) {
            // Tratamento de erros específicos da OpenAI
            if (err.message.includes('401') || err.message.includes('authentication')) {
              throw new Error('API Key inválida. Execute "setai config" para configurar novamente.');
            }
            if (err.message.includes('insufficient_quota')) {
              throw new Error('Cota de API esgotada. Verifique seu plano na OpenAI.');
            }
            // Erros de rate limit serão retentados automaticamente pelo retryWithBackoff
            throw new Error(`Erro na API da OpenAI: ${err.message}`);
          }
          throw err;
        }
      },
      {
        maxRetries: 3,
        initialDelay: 1000,
        maxDelay: 10000,
        retryableErrors: (error: Error) => {
          // Retry apenas em erros de rate limit e timeout
          return (
            error.message.includes('rate limit') ||
            error.message.includes('429') ||
            error.message.includes('timeout') ||
            error.message.includes('ETIMEDOUT')
          );
        },
      }
    );
  }

  /**
   * Analisa projeto e retorna conteúdo enriquecido
   */
  async analyzeProject(projectInfo: ProjectInfo): Promise<AIGeneratedContent> {
    const prompt = this.buildAnalysisPrompt(projectInfo);
    const response = await this.generateContent(prompt);

    try {
      const extracted = extractJSON(response);
      const validated = validateAIContent(extracted);

      const result: AIGeneratedContent = {};
      
      if (validated.enhancedDescription !== undefined) {
        result.enhancedDescription = validated.enhancedDescription;
      }
      if (validated.problemImportance !== undefined) {
        result.problemImportance = validated.problemImportance;
      }
      if (validated.businessGoals !== undefined) {
        result.businessGoals = validated.businessGoals;
      }
      if (validated.architectureDecisions !== undefined) {
        result.architectureDecisions = validated.architectureDecisions;
      }
      if (validated.bestPractices !== undefined) {
        result.bestPractices = validated.bestPractices;
      }
      if (validated.aiUsageGuidelines !== undefined) {
        result.aiUsageGuidelines = validated.aiUsageGuidelines;
      }
      if (validated.communicationPattern !== undefined) {
        result.communicationPattern = validated.communicationPattern;
      }
      if (validated.interactionModel !== undefined) {
        result.interactionModel = validated.interactionModel;
      }
      if (validated.sourceOfTruth !== undefined) {
        result.sourceOfTruth = validated.sourceOfTruth;
      }
      if (validated.cachingStrategy !== undefined) {
        result.cachingStrategy = validated.cachingStrategy;
      }
      if (validated.stateManagement !== undefined) {
        result.stateManagement = validated.stateManagement;
      }
      if (validated.authentication !== undefined) {
        result.authentication = validated.authentication;
      }
      if (validated.authorization !== undefined) {
        result.authorization = validated.authorization;
      }
      if (validated.securityConstraints !== undefined) {
        result.securityConstraints = validated.securityConstraints;
      }
      if (validated.expectedScale !== undefined) {
        result.expectedScale = validated.expectedScale;
      }
      if (validated.scalingStrategy !== undefined) {
        result.scalingStrategy = validated.scalingStrategy;
      }
      if (validated.failureHandling !== undefined) {
        result.failureHandling = validated.failureHandling;
      }
      if (validated.loggingStrategy !== undefined) {
        result.loggingStrategy = validated.loggingStrategy;
      }
      if (validated.monitoringMetrics !== undefined) {
        result.monitoringMetrics = validated.monitoringMetrics;
      }
      if (validated.alertsIncidentHandling !== undefined) {
        result.alertsIncidentHandling = validated.alertsIncidentHandling;
      }
      if (validated.architecturalStyle !== undefined) {
        result.architecturalStyle = validated.architecturalStyle;
      }
      if (validated.designPatterns !== undefined) {
        result.designPatterns = validated.designPatterns;
      }
      if (validated.architectureDiagrams !== undefined) {
        const diagrams: AIGeneratedContent['architectureDiagrams'] = {};
        if (validated.architectureDiagrams.highLevelFlow !== undefined) {
          diagrams.highLevelFlow = validated.architectureDiagrams.highLevelFlow;
        }
        if (validated.architectureDiagrams.componentInteraction !== undefined) {
          diagrams.componentInteraction = validated.architectureDiagrams.componentInteraction;
        }
        if (Object.keys(diagrams).length > 0) {
          result.architectureDiagrams = diagrams;
        }
      }
      if (validated.tradeOffs !== undefined && validated.tradeOffs.length > 0) {
        result.tradeOffs = validated.tradeOffs.map((to) => {
          const tradeOff: {
            decision?: string;
            alternative?: string;
            chosen?: string;
            sacrificed?: string;
          } = {};
          if (to.decision !== undefined) {
            tradeOff.decision = to.decision;
          }
          if (to.alternative !== undefined) {
            tradeOff.alternative = to.alternative;
          }
          if (to.chosen !== undefined) {
            tradeOff.chosen = to.chosen;
          }
          if (to.sacrificed !== undefined) {
            tradeOff.sacrificed = to.sacrificed;
          }
          return tradeOff;
        });
      }
      if (validated.limitations !== undefined) {
        result.limitations = validated.limitations;
      }
      
      return result;
    } catch (err) {
      error('Erro ao processar resposta da IA:');
      if (err instanceof Error) {
        error(err.message);
      }
      // Retorna estrutura vazia em caso de erro
      return {};
    }
  }

  /**
   * Constrói prompt de análise a partir das informações do projeto
   */
  private buildAnalysisPrompt(projectInfo: ProjectInfo): string {
    return `Você é um especialista em desenvolvimento de software e arquitetura.

Analise as seguintes informações do projeto:

**Nome do Projeto:** ${projectInfo.projectName}
**Descrição:** ${projectInfo.projectDescription}
**Importância do Problema:** ${projectInfo.problemImportance}
**Usuários Principais:** ${projectInfo.targetUsers}
**Objetivos de Negócio:** ${projectInfo.businessGoals}
**Linguagem:** ${projectInfo.techStack.language}
**Framework:** ${projectInfo.techStack.framework || 'Nenhum'}
**Banco de Dados:** ${projectInfo.techStack.database || 'Nenhum'}
**Restrições Técnicas:** ${projectInfo.technicalConstraints}
**Restrições de Negócio:** ${projectInfo.businessConstraints}
**Não-objetivos:** ${projectInfo.nonGoals}

Com base nessas informações e nas melhores práticas da indústria, gere uma análise completa em formato JSON estruturado com os seguintes campos:

{
  "enhancedDescription": "Descrição detalhada e profissional do problema que este projeto resolve, expandindo a descrição original com contexto técnico e de negócio",
  "problemImportance": "Explicação detalhada e convincente da importância do problema, incluindo impacto e urgência",
  "businessGoals": ["Objetivo de negócio 1 específico e mensurável", "Objetivo de negócio 2 específico e mensurável", "Objetivo de negócio 3 específico e mensurável"],
  "architectureDecisions": ["Decisão arquitetural 1 baseada no contexto do projeto", "Decisão arquitetural 2 baseada no contexto do projeto", "Decisão arquitetural 3 baseada no contexto do projeto"],
  "bestPractices": ["Melhor prática 1 específica para este tipo de projeto", "Melhor prática 2 específica para este tipo de projeto", "Melhor prática 3 específica para este tipo de projeto"],
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
  "designPatterns": ["Padrão de design 1 usado no projeto", "Padrão de design 2 usado no projeto", "Padrão de design 3 usado no projeto"]
}

**Instruções IMPORTANTES:**
- Seja específico e detalhado em TODOS os campos
- Baseie-se em melhores práticas da indústria
- Considere a stack tecnológica escolhida (${projectInfo.techStack.language}, ${projectInfo.techStack.framework || 'Nenhum'}, ${projectInfo.techStack.database || 'Nenhum'})
- Foque em objetivos mensuráveis e práticos
- Use linguagem profissional mas acessível
- Preencha TODOS os campos - não deixe nenhum vazio ou genérico
- Para campos de array, forneça pelo menos 3 itens relevantes
- Retorne APENAS o JSON válido, sem markdown ou texto adicional`;
  }
}

