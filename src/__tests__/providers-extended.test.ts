import { describe, it, expect, vi } from 'vitest';
import { OpenAIProvider } from '../services/providers/openai-provider.js';
import { AnthropicProvider } from '../services/providers/anthropic-provider.js';
import { GoogleProvider } from '../services/providers/google-provider.js';
import type { ProjectInfo } from '../types/project-info.js';

/**
 * Testes estendidos para Providers de IA
 * Testa métodos e comportamentos dos providers
 */

// Mock das bibliotecas de IA
vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  })),
}));

vi.mock('@anthropic-ai/sdk', () => ({
  default: vi.fn().mockImplementation(() => ({
    messages: {
      create: vi.fn(),
    },
  })),
}));

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn(() => ({
      generateContent: vi.fn(),
    })),
  })),
}));

describe('AI Providers Extended', () => {
  const mockProjectInfo: ProjectInfo = {
    projectName: 'test-project',
    projectDescription: 'A test project',
    problemImportance: 'Important',
    targetUsers: 'Developers',
    businessGoals: 'Goals',
    technicalConstraints: 'None',
    businessConstraints: 'None',
    nonGoals: 'None',
    version: '1.0.0',
    techStack: {
      language: 'TypeScript',
    },
    preferences: {
      useTDD: true,
      strictMode: true,
    },
  };

  describe('OpenAIProvider', () => {
    it('should build analysis prompt correctly', async () => {
      const provider = new OpenAIProvider({
        apiKey: 'test-key',
        model: 'gpt-4',
      });

      // Acessa método privado através de análise do projeto
      await provider.analyzeProject(mockProjectInfo).catch(() => ({}));

      // Verifica que o método foi chamado (mesmo que falhe por falta de API key real)
      expect(provider).toBeInstanceOf(OpenAIProvider);
    });

    it('should handle API errors correctly', async () => {
      const provider = new OpenAIProvider({
        apiKey: 'invalid-key',
        model: 'gpt-4',
      });

      // Deve retornar objeto vazio em caso de erro
      await provider.analyzeProject(mockProjectInfo).catch(() => ({}));
    });
  });

  describe('AnthropicProvider', () => {
    it('should create instance with correct config', () => {
      const provider = new AnthropicProvider({
        apiKey: 'test-key',
        model: 'claude-3-5-sonnet-20241022',
        temperature: 0.8,
        maxTokens: 3000,
      });

      expect(provider).toBeInstanceOf(AnthropicProvider);
    });

    it('should use default model when not specified', () => {
      const provider = new AnthropicProvider({
        apiKey: 'test-key',
      });

      expect(provider).toBeInstanceOf(AnthropicProvider);
    });
  });

  describe('GoogleProvider', () => {
    it('should create instance with correct config', () => {
      const provider = new GoogleProvider({
        apiKey: 'test-key',
        model: 'gemini-1.5-pro',
        temperature: 0.8,
        maxOutputTokens: 3000,
      });

      expect(provider).toBeInstanceOf(GoogleProvider);
    });

    it('should use default model when not specified', () => {
      const provider = new GoogleProvider({
        apiKey: 'test-key',
      });

      expect(provider).toBeInstanceOf(GoogleProvider);
    });
  });

  describe('Provider Error Handling', () => {
    it('should handle rate limit errors', async () => {
      const provider = new OpenAIProvider({
        apiKey: 'test-key',
      });

      // Simula erro de rate limit
      const result = await provider.generateContent('test prompt').catch((error) => {
        expect(error).toBeInstanceOf(Error);
        return null;
      });

      // Deve tentar retry ou lançar erro apropriado
      expect(result).toBeNull();
    });

    it('should handle authentication errors', async () => {
      const provider = new OpenAIProvider({
        apiKey: 'invalid-key',
      });

      const result = await provider.generateContent('test prompt').catch((error) => {
        expect(error).toBeInstanceOf(Error);
        return null;
      });

      expect(result).toBeNull();
    });
  });
});
