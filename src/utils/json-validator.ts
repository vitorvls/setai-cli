/**
 * JSON Validator - Valida e sanitiza respostas JSON de APIs de IA
 */

import { z } from 'zod';

/**
 * Schema de validação para resposta de análise de projeto
 */
const AIGeneratedContentSchema = z.object({
  enhancedDescription: z.string().optional(),
  problemImportance: z.string().optional(),
  businessGoals: z.array(z.string()).optional(),
  architectureDecisions: z.array(z.string()).optional(),
  bestPractices: z.array(z.string()).optional(),
  aiUsageGuidelines: z.string().optional(),
  communicationPattern: z.string().optional(),
  interactionModel: z.string().optional(),
  sourceOfTruth: z.string().optional(),
  cachingStrategy: z.string().optional(),
  stateManagement: z.string().optional(),
  authentication: z.string().optional(),
  authorization: z.string().optional(),
  securityConstraints: z.string().optional(),
  expectedScale: z.string().optional(),
  scalingStrategy: z.string().optional(),
  failureHandling: z.string().optional(),
  loggingStrategy: z.string().optional(),
  monitoringMetrics: z.string().optional(),
  alertsIncidentHandling: z.string().optional(),
  architecturalStyle: z.string().optional(),
  designPatterns: z.array(z.string()).optional(),
  architectureDiagrams: z.object({
    highLevelFlow: z.string().optional(),
    componentInteraction: z.string().optional(),
  }).optional(),
  tradeOffs: z.array(z.object({
    decision: z.string().optional(),
    alternative: z.string().optional(),
    chosen: z.string().optional(),
    sacrificed: z.string().optional(),
  })).optional(),
  limitations: z.array(z.string()).optional(),
});

export type ValidatedAIContent = z.infer<typeof AIGeneratedContentSchema>;

/**
 * Valida e sanitiza resposta JSON de API de IA
 */
export function validateAIContent(data: unknown): ValidatedAIContent {
  try {
    return AIGeneratedContentSchema.parse(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      throw new Error(`Resposta inválida da IA: ${err.errors.map((e) => e.message).join(', ')}`);
    }
    throw err;
  }
}

/**
 * Extrai JSON de uma string que pode conter markdown ou texto adicional
 */
export function extractJSON(text: string): unknown {
  // Tenta extrair JSON de markdown code blocks
  const jsonMatch = text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch {
      // Continua para outras tentativas
    }
  }

  // Tenta encontrar JSON diretamente (entre primeira { e última })
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    try {
      return JSON.parse(text.substring(jsonStart, jsonEnd + 1));
    } catch {
      // Continua para última tentativa
    }
  }

  // Última tentativa: parse direto
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Não foi possível extrair JSON válido da resposta: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
  }
}

