/**
 * Testes para o serviço de IA
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ProjectInfo } from '../types/project-info.js';
import { enhanceWithAI } from '../services/ai-service.js';
import { OpenAIProvider } from '../services/providers/openai-provider.js';
import { AnthropicProvider } from '../services/providers/anthropic-provider.js';
import { GoogleProvider } from '../services/providers/google-provider.js';
import * as configManager from '../config/config-manager.js';

// Mock dos providers
vi.mock('../services/providers/openai-provider.js');
vi.mock('../services/providers/anthropic-provider.js');
vi.mock('../services/providers/google-provider.js');
vi.mock('../config/config-manager.js');

describe('AI Service', () => {
  const mockProjectInfo: ProjectInfo = {
    projectName: 'Test Project',
    projectDescription: 'A test project',
    problemImportance: 'Important problem',
    targetUsers: 'Developers',
    businessGoals: 'Build something great',
    technicalConstraints: 'None',
    businessConstraints: 'None',
    nonGoals: 'Nothing',
    version: '1.0.0',
    techStack: {
      language: 'TypeScript',
      framework: 'React',
      database: 'PostgreSQL',
    },
    preferences: {
      useTDD: true,
      strictMode: true,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve usar OpenAI quando disponível', async () => {
    const mockOpenAIProvider = {
      analyzeProject: vi.fn().mockResolvedValue({
        projectDescription: 'Enhanced description',
        problemImportance: 'Enhanced importance',
        businessGoals: ['Goal 1', 'Goal 2'],
        architectureDecisions: ['Decision 1'],
        bestPractices: ['Practice 1'],
        aiUsageGuidelines: 'Guidelines',
      }),
    };

    vi.mocked(configManager.getAPIKey).mockImplementation(async (provider) => {
      if (provider === 'openai') return 'test-key';
      return undefined;
    });

    vi.mocked(OpenAIProvider.create).mockResolvedValue(mockOpenAIProvider as unknown as OpenAIProvider);

    const result = await enhanceWithAI(mockProjectInfo);

    expect(OpenAIProvider.create).toHaveBeenCalled();
    expect(mockOpenAIProvider.analyzeProject).toHaveBeenCalledWith(mockProjectInfo);
    expect(result.projectDescription).toBe('Enhanced description');
  });

  it('deve usar Anthropic quando OpenAI não está disponível', async () => {
    const mockAnthropicProvider = {
      analyzeProject: vi.fn().mockResolvedValue({
        projectDescription: 'Anthropic description',
      }),
    };

    vi.mocked(configManager.getAPIKey).mockImplementation(async (provider) => {
      if (provider === 'anthropic') return 'test-key';
      return undefined;
    });

    vi.mocked(OpenAIProvider.create).mockResolvedValue(null);
    vi.mocked(AnthropicProvider.create).mockResolvedValue(mockAnthropicProvider as unknown as AnthropicProvider);

    const result = await enhanceWithAI(mockProjectInfo);

    expect(AnthropicProvider.create).toHaveBeenCalled();
    expect(mockAnthropicProvider.analyzeProject).toHaveBeenCalledWith(mockProjectInfo);
    expect(result.projectDescription).toBe('Anthropic description');
  });

  it('deve usar Google quando OpenAI e Anthropic não estão disponíveis', async () => {
    const mockGoogleProvider = {
      analyzeProject: vi.fn().mockResolvedValue({
        projectDescription: 'Google description',
      }),
    };

    vi.mocked(configManager.getAPIKey).mockImplementation(async (provider) => {
      if (provider === 'google') return 'test-key';
      return undefined;
    });

    vi.mocked(OpenAIProvider.create).mockResolvedValue(null);
    vi.mocked(AnthropicProvider.create).mockResolvedValue(null);
    vi.mocked(GoogleProvider.create).mockResolvedValue(mockGoogleProvider as unknown as GoogleProvider);

    const result = await enhanceWithAI(mockProjectInfo);

    expect(GoogleProvider.create).toHaveBeenCalled();
    expect(mockGoogleProvider.analyzeProject).toHaveBeenCalledWith(mockProjectInfo);
    expect(result.projectDescription).toBe('Google description');
  });

  it('deve lançar erro quando nenhum provedor está disponível', async () => {
    vi.mocked(configManager.getAPIKey).mockResolvedValue(undefined);

    await expect(enhanceWithAI(mockProjectInfo)).rejects.toThrow(
      'Nenhuma API key configurada. Execute "setai config" para configurar suas API keys.'
    );
  });

  it('deve tentar próximo provedor quando um falha', async () => {
    const mockAnthropicProvider = {
      analyzeProject: vi.fn().mockResolvedValue({
        projectDescription: 'Anthropic description',
      }),
    };

    vi.mocked(configManager.getAPIKey).mockImplementation(async (provider) => {
      if (provider === 'openai') return 'test-key';
      if (provider === 'anthropic') return 'test-key';
      return undefined;
    });

    vi.mocked(OpenAIProvider.create).mockResolvedValue(null);
    vi.mocked(OpenAIProvider.create).mockRejectedValueOnce(new Error('OpenAI error'));
    vi.mocked(AnthropicProvider.create).mockResolvedValue(mockAnthropicProvider as unknown as AnthropicProvider);

    const result = await enhanceWithAI(mockProjectInfo);

    expect(AnthropicProvider.create).toHaveBeenCalled();
    expect(result.projectDescription).toBe('Anthropic description');
  });
});

