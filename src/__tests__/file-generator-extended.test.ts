import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fse from 'fs-extra';
import { join } from 'path';
import { tmpdir } from 'os';
import {
  generateFiles,
  checkConfigFolderExists,
  checkWritePermissions,
} from '../engines/file-generator.js';

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
});
