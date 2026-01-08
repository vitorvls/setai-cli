import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OpenAIProvider } from '../services/providers/openai-provider.js';
import { AnthropicProvider } from '../services/providers/anthropic-provider.js';
import { GoogleProvider } from '../services/providers/google-provider.js';
import { getAPIKey, setAPIKey, loadConfig } from '../config/config-manager.js';

/**
 * Testes para Providers de IA
 * Testa criação e configuração dos providers
 */

vi.mock('../config/config-manager.js', () => ({
  getAPIKey: vi.fn(),
  setAPIKey: vi.fn(),
  loadConfig: vi.fn(),
}));

describe('AI Providers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('OpenAIProvider', () => {
    it('should create instance with config', () => {
      const provider = new OpenAIProvider({
        apiKey: 'test-key',
        model: 'gpt-4',
        temperature: 0.5,
        maxTokens: 1000,
      });

      expect(provider).toBeInstanceOf(OpenAIProvider);
    });

    it('should use default values when not provided', () => {
      const provider = new OpenAIProvider({
        apiKey: 'test-key',
      });

      expect(provider).toBeInstanceOf(OpenAIProvider);
    });

    it('should return null when no API key is configured', async () => {
      vi.mocked(getAPIKey).mockResolvedValue(undefined);

      const provider = await OpenAIProvider.create();

      expect(provider).toBeNull();
    });

    it('should create instance from config when API key exists', async () => {
      vi.mocked(getAPIKey).mockResolvedValue('test-key');
      vi.mocked(loadConfig).mockResolvedValue({
        ai: {
          openai: {
            defaultModel: 'gpt-4',
          },
        },
      });

      const provider = await OpenAIProvider.create();

      expect(provider).toBeInstanceOf(OpenAIProvider);
    });
  });

  describe('AnthropicProvider', () => {
    it('should create instance with config', () => {
      const provider = new AnthropicProvider({
        apiKey: 'test-key',
        model: 'claude-3-5-sonnet-20241022',
        temperature: 0.5,
        maxTokens: 1000,
      });

      expect(provider).toBeInstanceOf(AnthropicProvider);
    });

    it('should use default values when not provided', () => {
      const provider = new AnthropicProvider({
        apiKey: 'test-key',
      });

      expect(provider).toBeInstanceOf(AnthropicProvider);
    });

    it('should return null when no API key is configured', async () => {
      vi.mocked(getAPIKey).mockResolvedValue(undefined);

      const provider = await AnthropicProvider.create();

      expect(provider).toBeNull();
    });

    it('should create instance from config when API key exists', async () => {
      vi.mocked(getAPIKey).mockResolvedValue('test-key');
      vi.mocked(loadConfig).mockResolvedValue({
        ai: {
          anthropic: {
            defaultModel: 'claude-3-5-sonnet-20241022',
          },
        },
      });

      const provider = await AnthropicProvider.create();

      expect(provider).toBeInstanceOf(AnthropicProvider);
    });
  });

  describe('GoogleProvider', () => {
    it('should create instance with config', () => {
      const provider = new GoogleProvider({
        apiKey: 'test-key',
        model: 'gemini-1.5-pro',
        temperature: 0.5,
        maxOutputTokens: 1000,
      });

      expect(provider).toBeInstanceOf(GoogleProvider);
    });

    it('should use default values when not provided', () => {
      const provider = new GoogleProvider({
        apiKey: 'test-key',
      });

      expect(provider).toBeInstanceOf(GoogleProvider);
    });

    it('should return null when no API key is configured', async () => {
      vi.mocked(getAPIKey).mockResolvedValue(undefined);

      const provider = await GoogleProvider.create();

      expect(provider).toBeNull();
    });

    it('should create instance from config when API key exists', async () => {
      vi.mocked(getAPIKey).mockResolvedValue('test-key');
      vi.mocked(loadConfig).mockResolvedValue({
        ai: {
          google: {
            defaultModel: 'gemini-1.5-pro',
          },
        },
      });

      const provider = await GoogleProvider.create();

      expect(provider).toBeInstanceOf(GoogleProvider);
    });
  });
});
