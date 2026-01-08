import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configCommand } from '../commands/config.js';
import inquirer from 'inquirer';
import {
  setAPIKey,
  removeAPIKey,
  listAPIKeys,
  getConfigPath,
  getLanguageConfig,
} from '../config/config-manager.js';
import { initI18n, setLocale } from '../utils/i18n.js';

/**
 * Testes para o comando config
 * Testa gerenciamento de API keys e configurações
 */

vi.mock('inquirer');
vi.mock('../config/config-manager.js', () => ({
  setAPIKey: vi.fn(),
  removeAPIKey: vi.fn(),
  listAPIKeys: vi.fn(),
  getConfigPath: vi.fn(),
  getLanguageConfig: vi.fn(),
  saveLanguageConfig: vi.fn(),
}));

describe('Config Command', () => {
  beforeEach(async () => {
    await initI18n('pt-BR');
    await setLocale('pt-BR');
    vi.clearAllMocks();
    vi.mocked(getConfigPath).mockReturnValue('/path/to/config.json');
    vi.mocked(getLanguageConfig).mockReturnValue({
      questions: 'pt-BR',
      files: 'pt-BR',
    });
  });

  it('should set API key for OpenAI', async () => {
    // Simula fluxo: escolhe "set", escolhe OpenAI, insere key
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({
        action: 'set',
      })
      .mockResolvedValueOnce({
        provider: 'openai',
        apiKey: 'test-key-123',
        defaultModel: 'gpt-4',
      })
      .mockResolvedValueOnce({
        action: 'exit',
      });

    vi.mocked(setAPIKey).mockResolvedValue();
    vi.mocked(listAPIKeys).mockResolvedValue({
      openai: false,
      anthropic: false,
      google: false,
    });

    await configCommand();

    expect(setAPIKey).toHaveBeenCalledWith('openai', 'test-key-123', 'gpt-4');
  });

  it('should remove API key', async () => {
    // Simula: escolhe "remove", escolhe provider, confirma
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({
        action: 'remove',
      })
      .mockResolvedValueOnce({
        provider: 'openai',
        confirm: true,
      })
      .mockResolvedValueOnce({
        action: 'exit',
      });

    vi.mocked(listAPIKeys)
      .mockResolvedValueOnce({
        openai: true,
        anthropic: false,
        google: false,
      })
      .mockResolvedValueOnce({
        openai: false,
        anthropic: false,
        google: false,
      });

    vi.mocked(removeAPIKey).mockResolvedValue();

    await configCommand();

    expect(removeAPIKey).toHaveBeenCalledWith('openai');
  });

  it('should list API keys', async () => {
    // Simula: escolhe "list", depois "exit"
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({
        action: 'list',
      })
      .mockResolvedValueOnce({
        action: 'exit',
      });

    vi.mocked(listAPIKeys).mockResolvedValue({
      openai: true,
      anthropic: true,
      google: false,
    });

    await configCommand();

    expect(listAPIKeys).toHaveBeenCalled();
  });

  it('should not remove when user cancels', async () => {
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({
        action: 'remove',
      })
      .mockResolvedValueOnce({
        provider: 'openai',
        confirm: false, // Cancela
      })
      .mockResolvedValueOnce({
        action: 'exit',
      });

    vi.mocked(listAPIKeys).mockResolvedValue({
      openai: true,
      anthropic: false,
      google: false,
    });

    await configCommand();

    expect(removeAPIKey).not.toHaveBeenCalled();
  });

  it('should handle all providers (OpenAI, Anthropic, Google)', async () => {
    const providers = ['openai', 'anthropic', 'google'] as const;

    for (const provider of providers) {
      vi.mocked(inquirer.prompt)
        .mockResolvedValueOnce({
          action: 'set',
        })
        .mockResolvedValueOnce({
          provider,
          apiKey: `test-key-${provider}`,
          defaultModel: provider === 'openai' ? 'gpt-4' : provider === 'anthropic' ? 'claude-3' : 'gemini-1.5',
        })
        .mockResolvedValueOnce({
          action: 'exit',
        });

      vi.mocked(listAPIKeys).mockResolvedValue({
        openai: false,
        anthropic: false,
        google: false,
      });

      vi.clearAllMocks();
      await configCommand();

      expect(setAPIKey).toHaveBeenCalledWith(
        provider,
        `test-key-${provider}`,
        expect.any(String)
      );
    }
  });
});
