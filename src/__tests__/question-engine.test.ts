import { describe, it, expect, vi } from 'vitest';
import { collectProjectInfo } from '../engines/question-engine.js';

/**
 * Testes para Question Engine
 * Testa a coleta de informações do usuário
 */

// Mock do Inquirer
vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn(),
  },
}));

describe('Question Engine', () => {
  it('should collect project name from user', async () => {
    // Arrange
    const { default: inquirer } = await import('inquirer');
    const mockProjectName = 'my-awesome-project';
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({
      projectName: mockProjectName,
      projectDescription: 'Test description',
      problemImportance: 'Test importance',
      targetUsers: 'Test users',
      businessGoals: 'Test goals',
      technicalConstraints: 'None',
      businessConstraints: 'None',
      nonGoals: 'Test non-goals',
      version: '1.0.0',
      language: 'TypeScript',
      useTDD: true,
    });

    // Act
    const result = await collectProjectInfo();

    // Assert
    expect(result.projectName).toBe(mockProjectName);
    expect(inquirer.prompt).toHaveBeenCalled();
  });

  it('should collect tech stack information', async () => {
    // Arrange
    const { default: inquirer } = await import('inquirer');
    const mockAnswers = {
      projectName: 'test-project',
      projectDescription: 'Test description',
      problemImportance: 'Test importance',
      targetUsers: 'Test users',
      businessGoals: 'Test goals',
      technicalConstraints: 'None',
      businessConstraints: 'None',
      nonGoals: 'Test non-goals',
      version: '1.0.0',
      language: 'TypeScript',
      framework: 'Next.js',
      database: 'PostgreSQL',
      useTDD: true,
    };
    vi.mocked(inquirer.prompt).mockResolvedValueOnce(mockAnswers);

    // Act
    const result = await collectProjectInfo();

    // Assert
    expect(result.techStack.language).toBe('TypeScript');
    expect(result.techStack.framework).toBe('Next.js');
    expect(result.techStack.database).toBe('PostgreSQL');
  });

  it('should collect preferences', async () => {
    // Arrange
    const { default: inquirer } = await import('inquirer');
    const mockAnswers = {
      projectName: 'test-project',
      projectDescription: 'Test description',
      problemImportance: 'Test importance',
      targetUsers: 'Test users',
      businessGoals: 'Test goals',
      technicalConstraints: 'None',
      businessConstraints: 'None',
      nonGoals: 'Test non-goals',
      version: '1.0.0',
      language: 'TypeScript',
      useTDD: true,
      strictMode: true,
    };
    vi.mocked(inquirer.prompt).mockResolvedValueOnce(mockAnswers);

    // Act
    const result = await collectProjectInfo();

    // Assert
    expect(result.preferences.useTDD).toBe(true);
    expect(result.preferences.strictMode).toBe(true);
  });

  it('should collect project description', async () => {
    // Arrange
    const { default: inquirer } = await import('inquirer');
    const mockAnswers = {
      projectName: 'test-project',
      projectDescription: 'A CLI tool for generating .cursor structure',
      problemImportance: 'Test importance',
      targetUsers: 'Test users',
      businessGoals: 'Test goals',
      technicalConstraints: 'None',
      businessConstraints: 'None',
      nonGoals: 'Test non-goals',
      version: '1.0.0',
      language: 'TypeScript',
      useTDD: true,
    };
    vi.mocked(inquirer.prompt).mockResolvedValueOnce(mockAnswers);

    // Act
    const result = await collectProjectInfo();

    // Assert
    expect(result.projectDescription).toBe('A CLI tool for generating .cursor structure');
  });

  it('should collect business information', async () => {
    // Arrange
    const { default: inquirer } = await import('inquirer');
    const mockAnswers = {
      projectName: 'test-project',
      projectDescription: 'Test description',
      problemImportance: 'This problem matters because...',
      targetUsers: 'Developers and tech leads',
      businessGoals: 'Improve developer productivity',
      technicalConstraints: 'Must work offline',
      businessConstraints: 'Budget limited',
      nonGoals: 'Not building a web app',
      version: '1.0.0',
      language: 'TypeScript',
    };
    vi.mocked(inquirer.prompt).mockResolvedValueOnce(mockAnswers);

    // Act
    const result = await collectProjectInfo();

    // Assert
    expect(result.problemImportance).toBe('This problem matters because...');
    expect(result.targetUsers).toBe('Developers and tech leads');
    expect(result.businessGoals).toBe('Improve developer productivity');
    expect(result.technicalConstraints).toBe('Must work offline');
    expect(result.businessConstraints).toBe('Budget limited');
    expect(result.nonGoals).toBe('Not building a web app');
    expect(result.version).toBe('1.0.0');
  });
});
