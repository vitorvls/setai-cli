/**
 * AI Service - Integração com modelos de IA para enriquecer respostas
 * 
 * Esta funcionalidade está em BETA e requer o flag --beta
 */

import type { ProjectInfo } from '../types/project-info.js';
import { info, warning, error } from '../utils/output.js';
import { OpenAIProvider } from './providers/openai-provider.js';
import { AnthropicProvider } from './providers/anthropic-provider.js';
import { GoogleProvider } from './providers/google-provider.js';
import { getAPIKey } from '../config/config-manager.js';

/**
 * Interface para conteúdo gerado pela IA
 */
export interface AIGeneratedContent {
  enhancedDescription?: string;
  problemImportance?: string;
  businessGoals?: string[];
  architectureDecisions?: string[];
  bestPractices?: string[];
  aiUsageGuidelines?: string;
  communicationPattern?: string;
  interactionModel?: string;
  sourceOfTruth?: string;
  cachingStrategy?: string;
  stateManagement?: string;
  authentication?: string;
  authorization?: string;
  securityConstraints?: string;
  expectedScale?: string;
  scalingStrategy?: string;
  failureHandling?: string;
  loggingStrategy?: string;
  monitoringMetrics?: string;
  alertsIncidentHandling?: string;
  architecturalStyle?: string;
  designPatterns?: string[];
  architectureDiagrams?: {
    highLevelFlow?: string;
    componentInteraction?: string;
  };
  tradeOffs?: Array<{
    decision?: string;
    alternative?: string;
    chosen?: string;
    sacrificed?: string;
  }>;
  limitations?: string[];
}

/**
 * Enriquece informações do projeto usando IA
 * 
 * @param projectInfo - Informações coletadas do usuário
 * @returns Conteúdo enriquecido pela IA
 */
export async function enhanceWithAI(projectInfo: ProjectInfo): Promise<AIGeneratedContent> {
  // Verificar se há API keys configuradas
  const openaiKey = await getAPIKey('openai');
  const anthropicKey = await getAPIKey('anthropic');
  const googleKey = await getAPIKey('google');

  if (!openaiKey && !anthropicKey && !googleKey) {
    throw new Error(
      'Nenhuma API key configurada. Execute "setai config" para configurar suas API keys.'
    );
  }

  info('   Analisando respostas com IA...');

  // Prioridade: OpenAI > Anthropic > Google
  if (openaiKey) {
    try {
      const provider = await OpenAIProvider.create();
      if (provider) {
        info('   Usando OpenAI...');
        return await provider.analyzeProject(projectInfo);
      }
    } catch (err) {
      warning('   ⚠️  Erro ao usar OpenAI, tentando outros provedores...');
      if (err instanceof Error) {
        error(`   Erro: ${err.message}`);
      }
    }
  }

  if (anthropicKey) {
    try {
      const provider = await AnthropicProvider.create();
      if (provider) {
        info('   Usando Anthropic (Claude)...');
        return await provider.analyzeProject(projectInfo);
      }
    } catch (err) {
      warning('   ⚠️  Erro ao usar Anthropic, tentando outros provedores...');
      if (err instanceof Error) {
        error(`   Erro: ${err.message}`);
      }
    }
  }

  if (googleKey) {
    try {
      const provider = await GoogleProvider.create();
      if (provider) {
        info('   Usando Google (Gemini)...');
        return await provider.analyzeProject(projectInfo);
      }
    } catch (err) {
      warning('   ⚠️  Erro ao usar Google.');
      if (err instanceof Error) {
        error(`   Erro: ${err.message}`);
      }
    }
  }

  throw new Error('Nenhum provedor de IA disponível ou funcionando corretamente.');
}

