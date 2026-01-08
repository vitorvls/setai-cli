import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fse from 'fs-extra';
import { join } from 'path';
import { homedir } from 'os';
import {
  loadConfig,
  saveConfig,
  getAPIKey,
  setAPIKey,
  removeAPIKey,
  listAPIKeys,
  getConfigPath,
  getLanguageConfig,
  saveLanguageConfig,
  type CLIConfig,
} from '../config/config-manager.js';

/**
 * Testes para Config Manager
 * Testa gerenciamento de configuração e API keys
 */

const TEST_CONFIG_DIR = join(homedir(), '.setai-test');
const TEST_CONFIG_FILE = join(TEST_CONFIG_DIR, 'config.json');

describe('Config Manager', () => {
  beforeEach(async () => {
    // Limpa cache e arquivo de teste
    await fse.remove(TEST_CONFIG_DIR);
  });

  afterEach(async () => {
    await fse.remove(TEST_CONFIG_DIR);
  });

  describe('loadConfig', () => {
    it('should return config object', async () => {
      const config = await loadConfig();
      
      expect(config).toBeDefined();
      expect(typeof config).toBe('object');
    });
  });

  describe('saveConfig', () => {
    it('should save config to file', async () => {
      const testConfig: CLIConfig = {
        ai: {
          openai: {
            apiKey: 'test-key',
          },
        },
      };
      
      await saveConfig(testConfig);
      
      const configPath = getConfigPath();
      const exists = await fse.pathExists(configPath);
      expect(exists).toBe(true);
      
      const content = await fse.readFile(configPath, 'utf-8');
      const savedConfig = JSON.parse(content);
      
      expect(savedConfig.ai?.openai?.apiKey).toBe('test-key');
      
      // Limpa
      await fse.remove(configPath);
    });

    it('should create directory if it does not exist', async () => {
      const testConfig: CLIConfig = {};
      
      await saveConfig(testConfig);
      
      const configPath = getConfigPath();
      const dirExists = await fse.pathExists(configPath);
      expect(dirExists).toBe(true);
      
      // Limpa
      await fse.remove(configPath);
    });
  });

  describe('getAPIKey', () => {
    it('should return undefined when no API key is set', async () => {
      const key = await getAPIKey('openai');
      
      expect(key).toBeUndefined();
    });

    it('should return API key when set', async () => {
      await setAPIKey('openai', 'test-key-123');
      
      const key = await getAPIKey('openai');
      
      expect(key).toBe('test-key-123');
    });
  });

  describe('setAPIKey', () => {
    it('should save API key for provider', async () => {
      await setAPIKey('openai', 'test-key');
      
      const config = await loadConfig();
      expect(config.ai?.openai?.apiKey).toBe('test-key');
    });

    it('should save default model with API key', async () => {
      await setAPIKey('openai', 'test-key', 'gpt-4');
      
      const config = await loadConfig();
      expect(config.ai?.openai?.apiKey).toBe('test-key');
      expect(config.ai?.openai?.defaultModel).toBe('gpt-4');
    });

    it('should update existing API key', async () => {
      await setAPIKey('openai', 'old-key');
      await setAPIKey('openai', 'new-key');
      
      const key = await getAPIKey('openai');
      expect(key).toBe('new-key');
    });

    it('should work with all providers', async () => {
      await setAPIKey('openai', 'openai-key');
      await setAPIKey('anthropic', 'anthropic-key');
      await setAPIKey('google', 'google-key');
      
      expect(await getAPIKey('openai')).toBe('openai-key');
      expect(await getAPIKey('anthropic')).toBe('anthropic-key');
      expect(await getAPIKey('google')).toBe('google-key');
    });
  });

  describe('removeAPIKey', () => {
    it('should remove API key for provider', async () => {
      await setAPIKey('openai', 'test-key');
      await removeAPIKey('openai');
      
      const key = await getAPIKey('openai');
      expect(key).toBeUndefined();
    });

    it('should not throw when removing non-existent key', async () => {
      await expect(removeAPIKey('openai')).resolves.not.toThrow();
    });
  });

  describe('listAPIKeys', () => {
    it('should return object with provider keys', async () => {
      const keys = await listAPIKeys();
      
      expect(keys).toHaveProperty('openai');
      expect(keys).toHaveProperty('anthropic');
      expect(keys).toHaveProperty('google');
      expect(typeof keys.openai).toBe('boolean');
      expect(typeof keys.anthropic).toBe('boolean');
      expect(typeof keys.google).toBe('boolean');
    });

    it('should return true for configured keys', async () => {
      await setAPIKey('openai', 'openai-key');
      await setAPIKey('anthropic', 'anthropic-key');
      
      const keys = await listAPIKeys();
      
      expect(keys.openai).toBe(true);
      expect(keys.anthropic).toBe(true);
    });
  });

  describe('getConfigPath', () => {
    it('should return config file path', () => {
      const path = getConfigPath();
      
      expect(path).toBeTruthy();
      expect(typeof path).toBe('string');
    });
  });

  describe('getLanguageConfig', () => {
    it('should return default language config when no config exists', () => {
      const config = getLanguageConfig();
      
      expect(config).toEqual({
        questions: 'pt-BR',
        files: 'pt-BR',
      });
    });
  });

  describe('saveLanguageConfig', () => {
    it('should save language configuration', async () => {
      await saveLanguageConfig({
        questions: 'en',
        files: 'es',
      });
      
      const config = getLanguageConfig();
      
      expect(config.questions).toBe('en');
      expect(config.files).toBe('es');
    });

    it('should update existing language config', async () => {
      await saveLanguageConfig({
        questions: 'en',
        files: 'en',
      });
      
      await saveLanguageConfig({
        questions: 'pt-BR',
        files: 'pt-BR',
      });
      
      const config = getLanguageConfig();
      
      expect(config.questions).toBe('pt-BR');
      expect(config.files).toBe('pt-BR');
    });
  });
});
