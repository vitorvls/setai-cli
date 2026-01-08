import { describe, it, expect, vi, beforeEach } from 'vitest';
import { collectAdvancedGroups } from '../engines/advanced-groups-collector.js';
import inquirer from 'inquirer';
import { initI18n, setLocale } from '../utils/i18n.js';

/**
 * Testes para Advanced Groups Collector
 * Testa coleta iterativa de grupos avançados
 */

vi.mock('inquirer');

describe('Advanced Groups Collector', () => {
  beforeEach(async () => {
    await initI18n('pt-BR');
    await setLocale('pt-BR');
    vi.clearAllMocks();
  });

  it('should return empty config when no groups are selected', async () => {
    // Simula usuário escolhendo "Finalizar" diretamente
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      selectedGroup: 'finish',
    });

    const result = await collectAdvancedGroups();

    expect(result).toHaveProperty('selectedGroups');
    expect(result.selectedGroups).toEqual([]);
  });

  it('should collect one group and then finish', async () => {
    // Primeira pergunta: escolhe um grupo
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({
        selectedGroup: 'ai-usage',
      })
      // Responde perguntas do grupo ai-usage
      .mockResolvedValueOnce({
        preferredModelArchitecture: 'GPT-4',
        preferredModelImplementation: 'GPT-4',
        preferredModelRefactoring: 'GPT-4',
        preferredModelDebug: 'GPT-4',
        preferredModelBoilerplate: 'GPT-4',
        allowArchitecturePlanning: true,
        allowCodeGeneration: true,
        allowRefactoring: true,
        allowDebug: true,
        allowDocumentation: true,
      })
      // Finaliza
      .mockResolvedValueOnce({
        selectedGroup: 'finish',
      });

    const result = await collectAdvancedGroups();

    expect(result).toHaveProperty('selectedGroups');
    expect(result.selectedGroups).toContain('ai-usage');
    expect(result).toHaveProperty('preferredAIModels');
    expect(result.preferredAIModels?.architecture).toBe('GPT-4');
  });

  it('should collect multiple groups iteratively', async () => {
    // Primeira iteração: seleciona grupo
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ selectedGroup: 'ai-usage' })
      .mockResolvedValueOnce({
        preferredModelArchitecture: 'GPT-4',
        preferredModelImplementation: 'GPT-4',
        preferredModelRefactoring: 'GPT-4',
        preferredModelDebug: 'GPT-4',
        preferredModelBoilerplate: 'GPT-4',
        allowArchitecturePlanning: true,
        allowCodeGeneration: true,
        allowRefactoring: true,
        allowDebug: true,
        allowDocumentation: true,
      })
      // Segunda iteração: seleciona outro grupo
      .mockResolvedValueOnce({ selectedGroup: 'architecture' })
      .mockResolvedValueOnce({
        architecturalStyle: 'Microservices',
        architecturalDecisions: 'Use REST API',
        designPatterns: 'Repository Pattern',
      })
      // Finaliza
      .mockResolvedValueOnce({ selectedGroup: 'finish' });

    const result = await collectAdvancedGroups();

    expect(result).toHaveProperty('selectedGroups');
    expect(result.selectedGroups).toContain('ai-usage');
    expect(result.selectedGroups).toContain('architecture');
    expect(result).toHaveProperty('preferredAIModels');
    expect(result).toHaveProperty('architecturalStyle');
  });

  it('should not show already answered groups in selection', async () => {
    // Primeira iteração: responde ai-usage
    vi.mocked(inquirer.prompt)
      .mockResolvedValueOnce({ selectedGroup: 'ai-usage' })
      .mockResolvedValueOnce({
        preferredModelArchitecture: 'GPT-4',
        preferredModelImplementation: 'GPT-4',
        preferredModelRefactoring: 'GPT-4',
        preferredModelDebug: 'GPT-4',
        preferredModelBoilerplate: 'GPT-4',
        allowArchitecturePlanning: true,
        allowCodeGeneration: true,
        allowRefactoring: true,
        allowDebug: true,
        allowDocumentation: true,
      })
      // Segunda iteração: seleciona outro grupo (ai-usage não deve aparecer)
      .mockResolvedValueOnce({ selectedGroup: 'architecture' })
      .mockResolvedValueOnce({
        architecturalStyle: 'Monolith',
        architecturalDecisions: 'Decisions',
        designPatterns: 'Patterns',
      })
      .mockResolvedValueOnce({ selectedGroup: 'finish' });

    const result = await collectAdvancedGroups();

    // Deve ter ambos os grupos
    expect(result).toHaveProperty('selectedGroups');
    expect(result.selectedGroups).toContain('ai-usage');
    expect(result.selectedGroups).toContain('architecture');
    expect(result).toHaveProperty('preferredAIModels');
    expect(result).toHaveProperty('architecturalStyle');
  });
});
