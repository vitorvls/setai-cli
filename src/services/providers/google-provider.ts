/**
 * Google Provider - Implementação do provedor Google (Gemini)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIGeneratedContent } from '../ai-service.js';
import type { ProjectInfo } from '../../types/project-info.js';
import { getAPIKey, loadConfig } from '../../config/config-manager.js';
import { error } from '../../utils/output.js';
import { retryWithBackoff } from '../../utils/retry.js';
import { extractJSON, validateAIContent } from '../../utils/json-validator.js';

export interface GoogleProviderConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

/**
 * Classe para interagir com a API da Google (Gemini)
 */
export class GoogleProvider {
  private genAI: GoogleGenerativeAI;
  private model: string;
  private temperature: number;
  private maxOutputTokens: number;

  constructor(config: GoogleProviderConfig) {
    this.genAI = new GoogleGenerativeAI(config.apiKey);
    this.model = config.model || 'gemini-1.5-pro';
    this.temperature = config.temperature ?? 0.7;
    this.maxOutputTokens = config.maxOutputTokens ?? 2000;
  }

  /**
   * Cria uma instância do provider a partir da configuração salva
   */
  static async create(): Promise<GoogleProvider | null> {
    const apiKey = await getAPIKey('google');
    if (!apiKey) {
      return null;
    }

    const config = await loadConfig();
    const defaultModel = config.ai?.google?.defaultModel || 'gemini-1.5-pro';

    return new GoogleProvider({
      apiKey,
      model: defaultModel,
    });
  }

  /**
   * Gera conteúdo usando a API da Google com retry automático
   */
  async generateContent(prompt: string): Promise<string> {
    return retryWithBackoff(
      async () => {
        try {
          const model = this.genAI.getGenerativeModel({
            model: this.model,
            generationConfig: {
              temperature: this.temperature,
              maxOutputTokens: this.maxOutputTokens,
              responseMimeType: 'application/json',
            },
            systemInstruction:
              'Você é um especialista em desenvolvimento de software e arquitetura. Responda sempre em formato JSON válido quando solicitado.',
          });

          const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
          });

          const response = result.response;
          const text = response.text();

          if (!text) {
            throw new Error('Resposta vazia da API da Google');
          }

          return text;
        } catch (err) {
          if (err instanceof Error) {
            // Tratamento de erros específicos da Google
            if (err.message.includes('401') || err.message.includes('API_KEY_INVALID')) {
              throw new Error('API Key inválida. Execute "setai config" para configurar novamente.');
            }
            if (err.message.includes('429') || err.message.includes('RESOURCE_EXHAUSTED')) {
              throw new Error('Limite de requisições excedido. Tente novamente em alguns instantes.');
            }
            if (err.message.includes('quota')) {
              throw new Error('Cota de API esgotada. Verifique seu plano na Google.');
            }
            throw new Error(`Erro na API da Google: ${err.message}`);
          }
          throw err;
        }
      },
      {
        maxRetries: 3,
        initialDelay: 1000,
        maxDelay: 10000,
        retryableErrors: (error: Error) => {
          return (
            error.message.includes('rate limit') ||
            error.message.includes('429') ||
            error.message.includes('timeout') ||
            error.message.includes('ETIMEDOUT') ||
            error.message.includes('RESOURCE_EXHAUSTED')
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

      return {
        enhancedDescription: validated.enhancedDescription,
        problemImportance: validated.problemImportance,
        businessGoals: validated.businessGoals,
        architectureDecisions: validated.architectureDecisions,
        bestPractices: validated.bestPractices,
        aiUsageGuidelines: validated.aiUsageGuidelines,
        communicationPattern: validated.communicationPattern,
        interactionModel: validated.interactionModel,
        sourceOfTruth: validated.sourceOfTruth,
        cachingStrategy: validated.cachingStrategy,
        stateManagement: validated.stateManagement,
        authentication: validated.authentication,
        authorization: validated.authorization,
        securityConstraints: validated.securityConstraints,
        expectedScale: validated.expectedScale,
        scalingStrategy: validated.scalingStrategy,
        failureHandling: validated.failureHandling,
        loggingStrategy: validated.loggingStrategy,
        monitoringMetrics: validated.monitoringMetrics,
        alertsIncidentHandling: validated.alertsIncidentHandling,
        architecturalStyle: validated.architecturalStyle,
        designPatterns: validated.designPatterns,
        architectureDiagrams: validated.architectureDiagrams,
        tradeOffs: validated.tradeOffs,
        limitations: validated.limitations,
      };
    } catch (err) {
      error('Erro ao processar resposta da IA:');
      if (err instanceof Error) {
        error(err.message);
      }
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

