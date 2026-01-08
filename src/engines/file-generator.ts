import fse from 'fs-extra';
import { join } from 'path';
import { dirname } from 'path';
import { success, gray, error } from '../utils/output.js';

/**
 * File Generator - Cria diretórios e arquivos baseado em templates processados
 */

/**
 * Gera todos os arquivos da estrutura .cursor
 */
export async function generateFiles(baseDir: string, files: Map<string, string>): Promise<void> {
  try {
    const createdFiles: string[] = [];

    for (const [relativePath, content] of files.entries()) {
      const fullPath = join(baseDir, relativePath);
      const dirPath = dirname(fullPath);

      // Cria diretório se não existir
      await fse.ensureDir(dirPath);

      // Escreve arquivo
      await fse.writeFile(fullPath, content, 'utf-8');
      createdFiles.push(relativePath);
    }

    // Mostra resumo
    success('\n✅ Estrutura .cursor criada com sucesso!\n');
    gray('Arquivos criados:');
    for (const file of createdFiles) {
      gray(`  ✓ ${file}`);
    }
  } catch (err) {
    error('Erro ao gerar arquivos:');
    if (err instanceof Error) {
      error(err.message);
    }
    throw err;
  }
}

/**
 * Verifica se pasta de configuração já existe
 */
export async function checkConfigFolderExists(baseDir: string, configFolder: string): Promise<boolean> {
  const configPath = join(baseDir, configFolder);
  return await fse.pathExists(configPath);
}

/**
 * Verifica permissões de escrita no diretório
 */
export async function checkWritePermissions(baseDir: string): Promise<boolean> {
  try {
    const testFile = join(baseDir, '.cursor-write-test');
    await fse.writeFile(testFile, 'test', 'utf-8');
    await fse.remove(testFile);
    return true;
  } catch {
    return false;
  }
}
