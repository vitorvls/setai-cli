import { describe, it, expect, vi, beforeEach } from 'vitest';
import { collectProjectInfo } from '../engines/question-engine.js';
import { validateProjectInfo } from '../engines/validator.js';
import { processTemplate } from '../engines/template-engine.js';
import { collectIDESelection } from '../engines/ide-selector.js';
import { initI18n, setLocale } from '../utils/i18n.js';
import inquirer from 'inquirer';
import type { ProjectInfo } from '../types/project-info.js';

/**
 * Testes de Integração
 * Testa a integração entre múltiplos componentes trabalhando juntos
 */

vi.mock('inquirer');

describe('Integration Tests', () => {
  beforeEach(async () => {
    await initI18n('pt-BR');
    await setLocale('pt-BR');
    vi.clearAllMocks();
  });

  describe('Question Engine + Validator Integration', () => {
    it('should collect and validate project info together', async () => {
      // Simula coleta de informações
      vi.mocked(inquirer.prompt).mockResolvedValue({
        projectName: 'integration-test',
        projectDescription: 'Integration test project',
        problemImportance: 'Very important',
        targetUsers: 'Developers',
        businessGoals: 'Test goals',
        technicalConstraints: 'None',
        businessConstraints: 'None',
        nonGoals: 'None',
        version: '1.0.0',
        language: 'TypeScript',
        framework: 'Next.js',
        database: 'PostgreSQL',
        useTDD: true,
        strictMode: true,
      });

      const projectInfo = await collectProjectInfo(false);

      // Valida que as informações foram coletadas
      expect(projectInfo.projectName).toBe('integration-test');
      expect(projectInfo.techStack.language).toBe('TypeScript');

      // Valida que as informações são válidas
      expect(() => validateProjectInfo(projectInfo)).not.toThrow();
    });

    it('should reject invalid project info', async () => {
      // Simula coleta com nome vazio
      vi.mocked(inquirer.prompt).mockResolvedValue({
        projectName: '',
        projectDescription: 'Test',
        problemImportance: 'Important',
        targetUsers: 'Users',
        businessGoals: 'Goals',
        technicalConstraints: 'None',
        businessConstraints: 'None',
        nonGoals: 'None',
        version: '1.0.0',
        language: 'TypeScript',
        useTDD: true,
        strictMode: true,
      });

      const projectInfo = await collectProjectInfo(false);

      // Deve lançar erro ao validar
      expect(() => validateProjectInfo(projectInfo)).toThrow();
    });
  });

  describe('IDE Selector + Template Engine Integration', () => {
    it('should use correct config folder from IDE selection in templates', async () => {
      // Seleciona IDE
      vi.mocked(inquirer.prompt).mockResolvedValue({
        ide: 'vscode',
      });

      const ideConfig = await collectIDESelection();

      expect(ideConfig.configFolder).toBe('.vscode');

      // Processa template com o config folder correto
      const template = 'Config folder: {{configFolder}}';
      const data = {
        configFolder: ideConfig.configFolder,
      };

      const result = processTemplate(template, data);

      expect(result).toContain('.vscode');
    });

    it('should handle custom IDE folder in templates', async () => {
      vi.mocked(inquirer.prompt).mockResolvedValue({
        ide: 'other',
        customFolder: '.custom',
      });

      const ideConfig = await collectIDESelection();

      expect(ideConfig.configFolder).toBe('.custom');

      const template = 'Folder: {{configFolder}}';
      const result = processTemplate(template, {
        configFolder: ideConfig.configFolder,
      });

      expect(result).toContain('.custom');
    });
  });

  describe('Template Engine + Project Info Integration', () => {
    it('should process template with complete project info', () => {
      const projectInfo: ProjectInfo = {
        projectName: 'test-project',
        projectDescription: 'A test project',
        problemImportance: 'Important',
        targetUsers: 'Developers',
        businessGoals: 'Goals',
        technicalConstraints: 'None',
        businessConstraints: 'None',
        nonGoals: 'None',
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

      const template = `
# {{projectName}}

Description: {{projectDescription}}
Language: {{techStack.language}}
Framework: {{techStack.framework}}
Version: {{version}}
      `.trim();

      const data = {
        projectName: projectInfo.projectName,
        projectDescription: projectInfo.projectDescription,
        'techStack.language': projectInfo.techStack.language,
        'techStack.framework': projectInfo.techStack.framework || '',
        version: projectInfo.version,
      };

      const result = processTemplate(template, data);

      expect(result).toContain('test-project');
      expect(result).toContain('TypeScript');
      expect(result).toContain('Next.js');
      expect(result).toContain('1.0.0');
    });

    it('should handle conditional blocks based on project info', () => {
      const template = `
# {{projectName}}
{{#if framework}}
Framework: {{framework}}
{{/if}}
Language: {{language}}
      `.trim();

      // Com framework
      const dataWithFramework = {
        projectName: 'test',
        framework: 'Next.js',
        language: 'TypeScript',
      };

      const resultWith = processTemplate(template, dataWithFramework);
      expect(resultWith).toContain('Framework: Next.js');

      // Sem framework
      const dataWithoutFramework = {
        projectName: 'test',
        framework: '',
        language: 'TypeScript',
      };

      const resultWithout = processTemplate(template, dataWithoutFramework);
      expect(resultWithout).not.toContain('Framework:');
    });
  });

  describe('Full Flow Integration', () => {
    it('should integrate all components in correct order', async () => {
      // 1. Seleciona IDE
      vi.mocked(inquirer.prompt).mockResolvedValueOnce({
        ide: 'cursor',
      });

      const ideConfig = await collectIDESelection();
      expect(ideConfig.configFolder).toBe('.cursor');

      // 2. Coleta informações do projeto
      vi.mocked(inquirer.prompt).mockResolvedValue({
        projectName: 'full-flow-test',
        projectDescription: 'Full flow test',
        problemImportance: 'Important',
        targetUsers: 'Users',
        businessGoals: 'Goals',
        technicalConstraints: 'None',
        businessConstraints: 'None',
        nonGoals: 'None',
        version: '1.0.0',
        language: 'TypeScript',
        useTDD: true,
        strictMode: true,
      });

      const projectInfo = await collectProjectInfo(false);
      projectInfo.ideConfig = {
        ide: ideConfig.ide,
        configFolder: ideConfig.configFolder,
      };

      // 3. Valida informações
      expect(() => validateProjectInfo(projectInfo)).not.toThrow();

      // 4. Processa template
      const template = 'Project: {{projectName}} in {{configFolder}}';
      const processed = processTemplate(template, {
        projectName: projectInfo.projectName,
        configFolder: ideConfig.configFolder,
      });

      expect(processed).toContain('full-flow-test');
      expect(processed).toContain('.cursor');
    });
  });
});
