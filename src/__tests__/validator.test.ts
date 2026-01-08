import { describe, it, expect, beforeAll } from 'vitest';
import { validateProjectInfo } from '../engines/validator.js';
import type { ProjectInfo } from '../types/project-info.js';
import { initI18n, setLocale } from '../utils/i18n.js';

/**
 * Testes para Validator
 * Testa validação de inputs do usuário
 */

// Inicializa i18n antes dos testes
beforeAll(async () => {
  await initI18n();
  setLocale('pt-BR');
});

describe('Validator', () => {
  it('should validate project name is not empty', () => {
    // Arrange
    const invalidInfo: ProjectInfo = {
      projectName: '',
      projectDescription: 'Test description',
      problemImportance: 'Test importance',
      targetUsers: 'Test users',
      businessGoals: 'Test goals',
      technicalConstraints: 'None',
      businessConstraints: 'None',
      nonGoals: 'Test non-goals',
      version: '1.0.0',
      techStack: {
        language: 'TypeScript',
      },
      preferences: {
        useTDD: true,
        strictMode: true,
      },
    };

    // Act & Assert
    expect(() => validateProjectInfo(invalidInfo)).toThrow('O nome do projeto é obrigatório');
  });

  it('should validate language is provided', () => {
    // Arrange
    const invalidInfo: ProjectInfo = {
      projectName: 'test-project',
      projectDescription: 'Test description',
      problemImportance: 'Test importance',
      targetUsers: 'Test users',
      businessGoals: 'Test goals',
      technicalConstraints: 'None',
      businessConstraints: 'None',
      nonGoals: 'Test non-goals',
      version: '1.0.0',
      techStack: {
        language: '',
      },
      preferences: {
        useTDD: true,
        strictMode: true,
      },
    };

    // Act & Assert
    expect(() => validateProjectInfo(invalidInfo)).toThrow('Linguagem é obrigatória');
  });

  it('should pass validation for valid project info', () => {
    // Arrange
    const validInfo: ProjectInfo = {
      projectName: 'my-project',
      projectDescription: 'A test project',
      problemImportance: 'This problem matters',
      targetUsers: 'Developers',
      businessGoals: 'Improve productivity',
      technicalConstraints: 'None',
      businessConstraints: 'None',
      nonGoals: 'Not building a web app',
      version: '1.0.0',
      techStack: {
        language: 'TypeScript',
        framework: 'Next.js',
      },
      preferences: {
        useTDD: true,
        strictMode: true,
      },
    };

    // Act & Assert
    expect(() => validateProjectInfo(validInfo)).not.toThrow();
  });
});
