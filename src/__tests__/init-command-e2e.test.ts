import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initCommand } from '../commands/init.js';
import { collectIDESelection } from '../engines/ide-selector.js';
import { collectProjectInfo } from '../engines/question-engine.js';
import { checkConfigFolderExists, checkWritePermissions } from '../engines/file-generator.js';
import { processAllTemplates } from '../engines/template-engine.js';
import { generateFiles } from '../engines/file-generator.js';
import { enhanceWithAI } from '../services/ai-service.js';
import { initI18n, setLocale } from '../utils/i18n.js';
import fse from 'fs-extra';
import { join } from 'path';
import { tmpdir } from 'os';
import inquirer from 'inquirer';

/**
 * Testes E2E para o comando init
 * 
 * Testes End-to-End simulam o fluxo completo do usuário:
 * 1. Usuário executa o comando
 * 2. Sistema faz perguntas
 * 3. Sistema valida respostas
 * 4. Sistema processa templates
 * 5. Sistema gera arquivos
 * 
 * Diferente de testes unitários que testam funções isoladas,
 * testes E2E testam a integração entre todos os componentes.
 */

// Mock de todas as dependências
vi.mock('../engines/ide-selector.js');
vi.mock('../engines/question-engine.js');
vi.mock('../engines/file-generator.js');
vi.mock('../engines/template-engine.js');
vi.mock('../services/ai-service.js');
vi.mock('inquirer');
vi.mock('process', async () => {
  const actual = await vi.importActual('process');
  return {
    ...actual,
    exit: vi.fn(),
    cwd: vi.fn(() => process.cwd()),
  };
});

describe('Init Command E2E', () => {
  let testDir: string;

  beforeEach(async () => {
    // Cria diretório temporário para testes
    testDir = join(tmpdir(), `setai-e2e-test-${Date.now()}`);
    await fse.ensureDir(testDir);

    // Mock do process.cwd() - já está mockado no vi.mock acima

    // Mock do process.exit para não encerrar o processo durante testes
    process.exit = vi.fn() as typeof process.exit;

    // Inicializa i18n
    await initI18n('pt-BR');
    await setLocale('pt-BR');

    // Limpa todos os mocks
    vi.clearAllMocks();
  });

  afterEach(async () => {
    // Restaura funções originais
    vi.restoreAllMocks();

    // Limpa diretório de teste
    await fse.remove(testDir).catch(() => {});
  });

  it('should complete full flow without advanced or beta', async () => {
    // Arrange - Configura mocks para simular o fluxo completo
    vi.mocked(checkWritePermissions).mockResolvedValue(true);
    vi.mocked(collectIDESelection).mockResolvedValue({
      ide: 'cursor',
      configFolder: '.cursor',
      name: 'Cursor',
    });
    vi.mocked(checkConfigFolderExists).mockResolvedValue(false);
    vi.mocked(collectProjectInfo).mockResolvedValue({
      projectName: 'test-project',
      projectDescription: 'A test project',
      problemImportance: 'Important problem',
      targetUsers: 'Developers',
      businessGoals: 'Improve productivity',
      technicalConstraints: 'None',
      businessConstraints: 'None',
      nonGoals: 'Not building a web app',
      version: '1.0.0',
      techStack: {
        language: 'TypeScript',
      },
      preferences: {
        useTDD: true,
        strictMode: true,
      },
    });
    vi.mocked(processAllTemplates).mockResolvedValue(
      new Map([
        ['.cursor/README.md', '# Test Project'],
        ['.cursor/context/project-goals.md', '# Goals'],
      ])
    );
    vi.mocked(generateFiles).mockResolvedValue();

    // Act - Executa o comando init
    try {
      await initCommand(false, false);
    } catch {
      // Ignora erros de process.exit em testes
    }

    // Assert - Verifica que todos os componentes foram chamados corretamente
    expect(checkWritePermissions).toHaveBeenCalled();
    expect(collectIDESelection).toHaveBeenCalled();
    expect(checkConfigFolderExists).toHaveBeenCalled();
    expect(collectProjectInfo).toHaveBeenCalledWith(false);
    expect(processAllTemplates).toHaveBeenCalled();
    expect(generateFiles).toHaveBeenCalled();
    expect(enhanceWithAI).not.toHaveBeenCalled(); // Não deve chamar IA sem --beta
  });

  it('should complete full flow with advanced mode', async () => {
    // Arrange
    vi.mocked(checkWritePermissions).mockResolvedValue(true);
    vi.mocked(collectIDESelection).mockResolvedValue({
      ide: 'vscode',
      configFolder: '.vscode',
      name: 'VS Code',
    });
    vi.mocked(checkConfigFolderExists).mockResolvedValue(false);
    vi.mocked(collectProjectInfo).mockResolvedValue({
      projectName: 'advanced-project',
      projectDescription: 'Advanced project',
      problemImportance: 'Very important',
      targetUsers: 'Users',
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
    });
    vi.mocked(processAllTemplates).mockResolvedValue(new Map());
    vi.mocked(generateFiles).mockResolvedValue();

    // Act
    await initCommand(true, false);

    // Assert
    expect(collectProjectInfo).toHaveBeenCalledWith(true); // Advanced mode
    expect(enhanceWithAI).not.toHaveBeenCalled();
  });

  it('should complete full flow with beta mode (AI enrichment)', async () => {
    // Arrange
    vi.mocked(checkWritePermissions).mockResolvedValue(true);
    vi.mocked(collectIDESelection).mockResolvedValue({
      ide: 'cursor',
      configFolder: '.cursor',
      name: 'Cursor',
    });
    vi.mocked(checkConfigFolderExists).mockResolvedValue(false);
    vi.mocked(collectProjectInfo).mockResolvedValue({
      projectName: 'beta-project',
      projectDescription: 'Beta project',
      problemImportance: 'Important',
      targetUsers: 'Users',
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
    });
    vi.mocked(enhanceWithAI).mockResolvedValue({
      projectDescription: 'Enhanced description',
      problemImportance: 'Enhanced importance',
      businessGoals: ['Goal 1', 'Goal 2'],
      architectureDecisions: ['Decision 1'],
      bestPractices: ['Practice 1'],
      aiUsageGuidelines: 'Guidelines',
    });
    vi.mocked(processAllTemplates).mockResolvedValue(new Map());
    vi.mocked(generateFiles).mockResolvedValue();

    // Act
    try {
      await initCommand(false, true);
    } catch {
      // Ignora erros
    }

    // Assert
    expect(enhanceWithAI).toHaveBeenCalled(); // Deve chamar IA com --beta
    expect(processAllTemplates).toHaveBeenCalled();
    expect(generateFiles).toHaveBeenCalled();
  });

  it('should handle existing config folder and ask for overwrite', async () => {
    // Arrange
    vi.mocked(checkWritePermissions).mockResolvedValue(true);
    vi.mocked(collectIDESelection).mockResolvedValue({
      ide: 'cursor',
      configFolder: '.cursor',
      name: 'Cursor',
    });
    vi.mocked(checkConfigFolderExists).mockResolvedValue(true);
    vi.mocked(inquirer.prompt).mockResolvedValue({ overwrite: true });
    vi.mocked(collectProjectInfo).mockResolvedValue({
      projectName: 'test',
      projectDescription: 'Test',
      problemImportance: 'Important',
      targetUsers: 'Users',
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
    });
    vi.mocked(processAllTemplates).mockResolvedValue(new Map());
    vi.mocked(generateFiles).mockResolvedValue();

    // Act
    try {
      await initCommand(false, false);
    } catch {
      // Ignora erros
    }

    // Assert
    expect(checkConfigFolderExists).toHaveBeenCalled();
    expect(inquirer.prompt).toHaveBeenCalled();
    expect(collectProjectInfo).toHaveBeenCalled(); // Deve continuar após confirmação
  });

  it('should exit when user cancels overwrite', async () => {
    // Arrange
    vi.mocked(checkWritePermissions).mockResolvedValue(true);
    vi.mocked(collectIDESelection).mockResolvedValue({
      ide: 'cursor',
      configFolder: '.cursor',
      name: 'Cursor',
    });
    vi.mocked(checkConfigFolderExists).mockResolvedValue(true);
    vi.mocked(inquirer.prompt).mockResolvedValue({ overwrite: false });

    // Act
    try {
      await initCommand(false, false);
    } catch {
      // Ignora erros
    }

    // Assert
    expect(inquirer.prompt).toHaveBeenCalled();
    // Verifica que process.exit foi chamado (mesmo que não pare a execução em testes)
    expect(process.exit).toHaveBeenCalled();
  });

  it('should exit when no write permissions', async () => {
    // Arrange
    vi.mocked(checkWritePermissions).mockResolvedValue(false);

    // Act
    try {
      await initCommand(false, false);
    } catch {
      // Ignora erros
    }

    // Assert
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should handle AI service errors gracefully in beta mode', async () => {
    // Arrange
    vi.mocked(checkWritePermissions).mockResolvedValue(true);
    vi.mocked(collectIDESelection).mockResolvedValue({
      ide: 'cursor',
      configFolder: '.cursor',
      name: 'Cursor',
    });
    vi.mocked(checkConfigFolderExists).mockResolvedValue(false);
    vi.mocked(collectProjectInfo).mockResolvedValue({
      projectName: 'test',
      projectDescription: 'Test',
      problemImportance: 'Important',
      targetUsers: 'Users',
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
    });
    vi.mocked(enhanceWithAI).mockRejectedValue(new Error('AI service error'));
    vi.mocked(processAllTemplates).mockResolvedValue(new Map());
    vi.mocked(generateFiles).mockResolvedValue();

    // Act
    try {
      await initCommand(false, true);
    } catch {
      // Ignora erros
    }

    // Assert
    expect(enhanceWithAI).toHaveBeenCalled();
    // Deve continuar mesmo com erro na IA
    expect(processAllTemplates).toHaveBeenCalled();
    expect(generateFiles).toHaveBeenCalled();
  });

  it('should handle language override', async () => {
    // Arrange
    vi.mocked(checkWritePermissions).mockResolvedValue(true);
    vi.mocked(collectIDESelection).mockResolvedValue({
      ide: 'cursor',
      configFolder: '.cursor',
      name: 'Cursor',
    });
    vi.mocked(checkConfigFolderExists).mockResolvedValue(false);
    vi.mocked(collectProjectInfo).mockResolvedValue({
      projectName: 'test',
      projectDescription: 'Test',
      problemImportance: 'Important',
      targetUsers: 'Users',
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
    });
    vi.mocked(processAllTemplates).mockResolvedValue(new Map());
    vi.mocked(generateFiles).mockResolvedValue();

    // Act
    try {
      await initCommand(false, false, 'en');
    } catch {
      // Ignora erros
    }

    // Assert
    // Deve processar templates com idioma correto
    expect(processAllTemplates).toHaveBeenCalledWith(
      expect.any(Object),
      '.cursor',
      'en'
    );
  });
});
