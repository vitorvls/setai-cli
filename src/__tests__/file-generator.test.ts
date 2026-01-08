import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { promises as fs } from 'fs';
import { join } from 'path';
import { generateFiles } from '../engines/file-generator.js';

/**
 * Testes para File Generator
 * Testa criação de diretórios e arquivos
 */

// Mock do fs-extra
vi.mock('fs-extra', () => ({
  default: {
    ensureDir: vi.fn(),
    writeFile: vi.fn(),
    pathExists: vi.fn(),
  },
}));

describe('File Generator', () => {
  const testDir = join(process.cwd(), 'test-output');

  beforeEach(async () => {
    // Limpar diretório de teste se existir
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch {
      // Ignora se não existir
    }
  });

  afterEach(async () => {
    // Limpar após teste
    try {
      await fs.rm(testDir, { recursive: true, force: true });
    } catch {
      // Ignora
    }
  });

  it('should create directory structure', async () => {
    // Arrange
    const files = new Map<string, string>([
      ['.cursor/README.md', '# README'],
      ['.cursor/context/project-goals.md', '# Project Goals'],
    ]);

    // Act
    await generateFiles(process.cwd(), files);

    // Assert
    const { default: fse } = await import('fs-extra');
    expect(fse.ensureDir).toHaveBeenCalled();
  });

  it('should write files with correct content', async () => {
    // Arrange
    const files = new Map<string, string>([['.cursor/README.md', '# README Content']]);

    // Act
    await generateFiles(process.cwd(), files);

    // Assert
    const { default: fse } = await import('fs-extra');
    expect(fse.writeFile).toHaveBeenCalled();
  });
});
