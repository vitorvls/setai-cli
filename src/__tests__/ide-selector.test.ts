import { describe, it, expect, vi, beforeEach } from 'vitest';
import { collectIDESelection } from '../engines/ide-selector.js';
import inquirer from 'inquirer';
import { initI18n, setLocale } from '../utils/i18n.js';

/**
 * Testes para IDE Selector
 * Testa seleção de IDE e configuração de pasta
 */

vi.mock('inquirer');

describe('IDE Selector', () => {
  beforeEach(async () => {
    await initI18n();
    await setLocale('pt-BR');
    vi.clearAllMocks();
  });

  it('should select Cursor IDE', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      ide: 'cursor',
    });

    const result = await collectIDESelection();

    expect(result.ide).toBe('cursor');
    expect(result.configFolder).toBe('.cursor');
    expect(result.name).toBe('Cursor');
  });

  it('should select VS Code IDE', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      ide: 'vscode',
    });

    const result = await collectIDESelection();

    expect(result.ide).toBe('vscode');
    expect(result.configFolder).toBe('.vscode');
    expect(result.name).toBe('VS Code');
  });

  it('should select JetBrains IDE', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      ide: 'jetbrains',
    });

    const result = await collectIDESelection();

    expect(result.ide).toBe('jetbrains');
    expect(result.configFolder).toBe('.idea');
    expect(result.name).toBe('JetBrains (IntelliJ, WebStorm, etc.)');
  });

  it('should select other IDE with custom folder', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      ide: 'other',
      customFolder: '.ai',
    });

    const result = await collectIDESelection();

    expect(result.ide).toBe('other');
    expect(result.configFolder).toBe('.ai');
    expect(result.name).toBe('Outra IDE');
  });

  it('should use default folder when other IDE is selected without custom folder', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      ide: 'other',
      customFolder: '',
    });

    const result = await collectIDESelection();

    expect(result.ide).toBe('other');
    expect(result.configFolder).toBe('.ai'); // Default
    expect(result.name).toBe('Outra IDE');
  });

  it('should trim custom folder name', async () => {
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      ide: 'other',
      customFolder: '  .custom  ',
    });

    const result = await collectIDESelection();

    expect(result.configFolder).toBe('.custom');
  });
});
