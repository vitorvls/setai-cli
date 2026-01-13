import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fse from 'fs-extra';
import { join } from 'path';
import { tmpdir } from 'os';
import {
  generateFiles,
  checkConfigFolderExists,
  checkWritePermissions,
  generateSetaiConfig,
} from '../engines/file-generator.js';
import { type CLIConfig } from '../config/config-manager.js';
import { vi } from 'vitest';

/**
 * Testes estendidos para File Generator
 * Testa criação de arquivos e diretórios
 */

describe('File Generator Extended', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = join(tmpdir(), `setai-test-${Date.now()}`);
    await fse.ensureDir(testDir);
  });

  afterEach(async () => {
    await fse.remove(testDir).catch(() => {});
  });

  describe('generateFiles', () => {
    it('should create nested directory structure', async () => {
      const files = new Map([
        ['.cursor/context/project-goals.md', '# Project Goals'],
        ['.cursor/rules/code-style.md', '# Code Style'],
      ]);

      await generateFiles(testDir, files);

      const goalsPath = join(testDir, '.cursor/context/project-goals.md');
      const stylePath = join(testDir, '.cursor/rules/code-style.md');

      expect(await fse.pathExists(goalsPath)).toBe(true);
      expect(await fse.pathExists(stylePath)).toBe(true);
    });

    it('should write file content correctly', async () => {
      const files = new Map([
        ['.cursor/README.md', '# Test Content'],
      ]);

      await generateFiles(testDir, files);

      const content = await fse.readFile(join(testDir, '.cursor/README.md'), 'utf-8');
      expect(content).toBe('# Test Content');
    });

    it('should handle multiple files', async () => {
      const files = new Map([
        ['file1.md', 'Content 1'],
        ['file2.md', 'Content 2'],
        ['file3.md', 'Content 3'],
      ]);

      await generateFiles(testDir, files);

      for (let i = 1; i <= 3; i++) {
        const content = await fse.readFile(join(testDir, `file${i}.md`), 'utf-8');
        expect(content).toBe(`Content ${i}`);
      }
    });

    it('should overwrite existing files', async () => {
      const oldPath = join(testDir, 'test.md');
      await fse.writeFile(oldPath, 'Old Content', 'utf-8');

      const files = new Map([
        ['test.md', 'New Content'],
      ]);

      await generateFiles(testDir, files);

      const content = await fse.readFile(oldPath, 'utf-8');
      expect(content).toBe('New Content');
    });

    it('should handle empty files map', async () => {
      const files = new Map<string, string>();

      await expect(generateFiles(testDir, files)).resolves.not.toThrow();
    });
  });

  describe('checkConfigFolderExists', () => {
    it('should return true when folder exists', async () => {
      const folderPath = join(testDir, '.cursor');
      await fse.ensureDir(folderPath);

      const exists = await checkConfigFolderExists(testDir, '.cursor');

      expect(exists).toBe(true);
    });

    it('should return false when folder does not exist', async () => {
      const exists = await checkConfigFolderExists(testDir, '.nonexistent');

      expect(exists).toBe(false);
    });

    it('should check nested folders', async () => {
      const folderPath = join(testDir, '.vscode/settings');
      await fse.ensureDir(folderPath);

      const exists = await checkConfigFolderExists(testDir, '.vscode');

      expect(exists).toBe(true);
    });
  });

  describe('checkWritePermissions', () => {
    it('should return true when directory is writable', async () => {
      const hasPermission = await checkWritePermissions(testDir);

      expect(hasPermission).toBe(true);
    });

    it('should clean up test file after check', async () => {
      await checkWritePermissions(testDir);

      const testFile = join(testDir, '.cursor-write-test');
      const exists = await fse.pathExists(testFile);

      expect(exists).toBe(false);
    });
  });

  describe('generateSetaiConfig', () => {
    let mockLoadConfig: ReturnType<typeof vi.fn>;

    beforeEach(async () => {
      // Mock do loadConfig
      const configManager = await import('../config/config-manager.js');
      mockLoadConfig = vi.fn();
      
      // Configuração padrão de teste
      const defaultTestConfig: CLIConfig = {
        ai: {
          openai: {
            apiKey: 'test-openai-key',
            defaultModel: 'gpt-4o',
          },
          anthropic: {
            apiKey: 'test-anthropic-key',
            defaultModel: 'claude-3-5-sonnet-20241022',
          },
        },
        language: {
          questions: 'pt-BR',
          files: 'en',
        },
      };
      
      mockLoadConfig.mockResolvedValue(defaultTestConfig);
      vi.spyOn(configManager, 'loadConfig').mockImplementation(mockLoadConfig);
    });

    afterEach(async () => {
      vi.restoreAllMocks();
    });

    it('should create .setai directory inside config folder', async () => {
      const configFolder = '.cursor';
      await generateSetaiConfig(testDir, configFolder);

      const setaiDir = join(testDir, configFolder, '.setai');
      expect(await fse.pathExists(setaiDir)).toBe(true);
    });

    it('should create config.json with CLI configuration', async () => {
      const configFolder = '.cursor';
      await generateSetaiConfig(testDir, configFolder);

      const configPath = join(testDir, configFolder, '.setai', 'config.json');
      expect(await fse.pathExists(configPath)).toBe(true);

      const configContent = await fse.readJson(configPath);
      expect(configContent).toHaveProperty('ai');
      expect(configContent).toHaveProperty('language');
      expect(configContent.ai.openai).toBeDefined();
      expect(configContent.ai.openai.apiKey).toBe('test-openai-key');
      expect(configContent.ai.openai.defaultModel).toBe('gpt-4o');
      expect(configContent.language.questions).toBe('pt-BR');
      expect(configContent.language.files).toBe('en');
    });

    it('should create .gitignore file', async () => {
      const configFolder = '.cursor';
      await generateSetaiConfig(testDir, configFolder);

      const gitignorePath = join(testDir, configFolder, '.setai', '.gitignore');
      expect(await fse.pathExists(gitignorePath)).toBe(true);

      const gitignoreContent = await fse.readFile(gitignorePath, 'utf-8');
      expect(gitignoreContent).toContain('SetAI Configuration');
      expect(gitignoreContent).toContain('config.json');
      expect(gitignoreContent).toContain('DO NOT commit');
    });

    it('should create README.md file', async () => {
      const configFolder = '.cursor';
      await generateSetaiConfig(testDir, configFolder);

      const readmePath = join(testDir, configFolder, '.setai', 'README.md');
      expect(await fse.pathExists(readmePath)).toBe(true);

      const readmeContent = await fse.readFile(readmePath, 'utf-8');
      expect(readmeContent).toContain('SetAI Configuration');
      expect(readmeContent).toContain('SECURITY WARNING');
      expect(readmeContent).toContain('DO NOT commit');
    });

    it('should work with different config folders', async () => {
      const configFolders = ['.cursor', '.vscode', '.idea', '.ai'];
      
      for (const folder of configFolders) {
        await generateSetaiConfig(testDir, folder);
        
        const setaiDir = join(testDir, folder, '.setai');
        expect(await fse.pathExists(setaiDir)).toBe(true);
        
        const configPath = join(setaiDir, 'config.json');
        expect(await fse.pathExists(configPath)).toBe(true);
      }
    });

    it('should handle empty configuration gracefully', async () => {
      // Mock com configuração vazia
      mockLoadConfig.mockResolvedValueOnce({});
      
      const configFolder = '.cursor';
      await expect(generateSetaiConfig(testDir, configFolder)).resolves.not.toThrow();

      const configPath = join(testDir, configFolder, '.setai', 'config.json');
      const configContent = await fse.readJson(configPath);
      expect(configContent).toEqual({});
    });

    it('should preserve all AI provider configurations', async () => {
      const fullConfig: CLIConfig = {
        ai: {
          openai: {
            apiKey: 'openai-key',
            defaultModel: 'gpt-4o',
          },
          anthropic: {
            apiKey: 'anthropic-key',
            defaultModel: 'claude-3-5-sonnet-20241022',
          },
          google: {
            apiKey: 'google-key',
            defaultModel: 'gemini-1.5-pro',
          },
        },
        language: {
          questions: 'en',
          files: 'en',
        },
      };

      mockLoadConfig.mockResolvedValueOnce(fullConfig);

      const configFolder = '.cursor';
      await generateSetaiConfig(testDir, configFolder);

      const configPath = join(testDir, configFolder, '.setai', 'config.json');
      const configContent = await fse.readJson(configPath);

      expect(configContent.ai.openai).toBeDefined();
      expect(configContent.ai.anthropic).toBeDefined();
      expect(configContent.ai.google).toBeDefined();
      expect(configContent.ai.openai.apiKey).toBe('openai-key');
      expect(configContent.ai.anthropic.apiKey).toBe('anthropic-key');
      expect(configContent.ai.google.apiKey).toBe('google-key');
    });
  });
});
