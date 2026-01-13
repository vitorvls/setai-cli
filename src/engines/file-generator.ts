import fse from 'fs-extra';
import { join } from 'path';
import { dirname } from 'path';
import { success, gray, error } from '../utils/output.js';
import { loadConfig, type CLIConfig } from '../config/config-manager.js';

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
    success('\n✅ Estrutura criada com sucesso!\n');
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

/**
 * Cria pasta .setai dentro da pasta de configuração e copia as configurações do CLI
 */
export async function generateSetaiConfig(baseDir: string, configFolder: string): Promise<void> {
  try {
    const setaiDir = join(baseDir, configFolder, '.setai');
    
    // Cria o diretório .setai
    await fse.ensureDir(setaiDir);
    
    // Carrega configurações do CLI
    const cliConfig = await loadConfig();
    
    // Prepara configuração para salvar (inclui credenciais reais)
    // Nota: As credenciais são salvas aqui para referência do projeto,
    // mas o .gitignore protege contra commit acidental
    const configToSave: CLIConfig = {
      ai: cliConfig.ai,
      language: cliConfig.language,
    };
    
    // Salva configuração no arquivo .setai/config.json
    const configPath = join(setaiDir, 'config.json');
    await fse.writeFile(configPath, JSON.stringify(configToSave, null, 2), 'utf-8');
    
    // Cria arquivo .gitignore para proteger credenciais
    const gitignorePath = join(setaiDir, '.gitignore');
    const gitignoreContent = `# SetAI Configuration
# This folder contains CLI configuration including API keys
# DO NOT commit this folder to version control

config.json
`;
    await fse.writeFile(gitignorePath, gitignoreContent, 'utf-8');
    
    // Cria README explicativo
    const readmePath = join(setaiDir, 'README.md');
    const readmeContent = `# SetAI Configuration

This folder contains the SetAI CLI configuration used to generate this project structure.

## Contents

- \`config.json\` - CLI configuration (API keys, language settings, etc.)
- \`.gitignore\` - Prevents committing sensitive configuration to version control

## Important Notes

- **⚠️ DO NOT commit this folder** - It contains sensitive information like API keys
- **⚠️ SECURITY WARNING:** This folder contains real API keys. Never commit it to version control
- The \`.gitignore\` file is included to prevent accidental commits, but always verify before pushing
- To update configuration, use \`setai config\` command in your terminal

## Configuration Location

The actual configuration file with full API keys is located at:
- **Windows:** \`%USERPROFILE%\\.setai\\config.json\`
- **macOS/Linux:** \`~/.setai/config.json\`

This folder (\`.setai\`) is a reference copy that shows what configuration was used when generating the project structure.
`;
    await fse.writeFile(readmePath, readmeContent, 'utf-8');
    
  } catch (err) {
    error('Erro ao criar pasta .setai:');
    if (err instanceof Error) {
      error(err.message);
    }
    // Não lança erro para não interromper o fluxo principal
  }
}
