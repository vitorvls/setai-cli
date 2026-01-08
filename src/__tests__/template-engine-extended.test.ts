import { describe, it, expect, beforeEach } from 'vitest';
import { processTemplate } from '../engines/template-engine.js';
import { initI18n, setLocale } from '../utils/i18n.js';

/**
 * Testes estendidos para Template Engine
 * Testa processamento de templates
 */

describe('Template Engine Extended', () => {
  beforeEach(async () => {
    await initI18n('pt-BR');
  });

  describe('processTemplate', () => {
    it('should replace simple placeholders', () => {
      const template = 'Hello {{name}}!';
      const data = { name: 'World' };

      const result = processTemplate(template, data);

      expect(result).toBe('Hello World!');
    });

    it('should replace multiple placeholders', () => {
      const template = '{{greeting}} {{name}}, welcome to {{project}}!';
      const data = {
        greeting: 'Hello',
        name: 'John',
        project: 'SetAI',
      };

      const result = processTemplate(template, data);

      expect(result).toBe('Hello John, welcome to SetAI!');
    });

    it('should handle empty values', () => {
      const template = 'Name: {{name}}';
      const data = { name: '' };

      const result = processTemplate(template, data);

      expect(result).toBe('Name: {{name}}');
    });

    it('should handle undefined values', () => {
      const template = 'Name: {{name}}';
      const data = { name: undefined };

      const result = processTemplate(template, data);

      expect(result).toBe('Name: {{name}}');
    });

    it('should remove conditional blocks when value is empty', () => {
      const template = 'Start\n{{#if optional}}Optional content{{/if}}\nEnd';
      const data = { optional: '' };

      const result = processTemplate(template, data);

      expect(result).not.toContain('Optional content');
      expect(result).toContain('Start');
      expect(result).toContain('End');
    });

    it('should keep conditional blocks when value is not empty', () => {
      const template = 'Start\n{{#if optional}}Optional content{{/if}}\nEnd';
      const data = { optional: 'yes' };

      const result = processTemplate(template, data);

      expect(result).toContain('Optional content');
      expect(result).toContain('Start');
      expect(result).toContain('End');
    });

    it('should handle nested conditional blocks', () => {
      const template = `
{{#if section1}}
Section 1 content
{{#if subsection}}Subsection content{{/if}}
{{/if}}
Other content
      `.trim();
      const data = {
        section1: 'yes',
        subsection: 'yes',
      };

      const result = processTemplate(template, data);

      expect(result).toContain('Section 1 content');
      expect(result).toContain('Subsection content');
      expect(result).toContain('Other content');
    });

    it('should remove lines with only empty placeholders', () => {
      const template = 'Line 1\n{{empty}}\nLine 2';
      const data = { empty: '' };

      const result = processTemplate(template, data);

      expect(result).not.toContain('{{empty}}');
      expect(result).toContain('Line 1');
      expect(result).toContain('Line 2');
    });

    it('should handle whitespace in placeholders', () => {
      const template = '  {{name}}  ';
      const data = { name: 'Test' };

      const result = processTemplate(template, data);

      expect(result).toContain('Test');
    });

    it('should replace all occurrences of same placeholder', () => {
      const template = '{{name}} and {{name}} are the same';
      const data = { name: 'John' };

      const result = processTemplate(template, data);

      expect(result).toBe('John and John are the same');
    });

    it('should handle complex template with multiple conditionals', () => {
      const template = `
# {{projectName}}

{{#if description}}
## Description
{{description}}
{{/if}}

{{#if version}}
Version: {{version}}
{{/if}}
      `.trim();
      const data = {
        projectName: 'MyProject',
        description: 'A great project',
        version: '1.0.0',
      };

      const result = processTemplate(template, data);

      expect(result).toContain('# MyProject');
      expect(result).toContain('## Description');
      expect(result).toContain('A great project');
      expect(result).toContain('Version: 1.0.0');
    });
  });
});
