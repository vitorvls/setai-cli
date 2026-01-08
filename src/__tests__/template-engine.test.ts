import { describe, it, expect } from 'vitest';
import { processTemplate } from '../engines/template-engine.js';

/**
 * Testes para Template Engine
 * Testa processamento de templates e substituição de placeholders
 */

describe('Template Engine', () => {
  it('should replace placeholders in template', () => {
    // Arrange
    const template = 'Hello {{NAME}}, welcome to {{PROJECT}}!';
    const data = {
      NAME: 'John',
      PROJECT: 'SetAI',
    };

    // Act
    const result = processTemplate(template, data);

    // Assert
    expect(result).toBe('Hello John, welcome to SetAI!');
  });

  it('should handle multiple occurrences of same placeholder', () => {
    // Arrange
    const template = '{{LANGUAGE}} is great. I love {{LANGUAGE}}!';
    const data = {
      LANGUAGE: 'TypeScript',
    };

    // Act
    const result = processTemplate(template, data);

    // Assert
    expect(result).toBe('TypeScript is great. I love TypeScript!');
  });

  it('should leave placeholders unchanged if not in data', () => {
    // Arrange
    const template = 'Hello {{NAME}}, your age is {{AGE}}';
    const data = {
      NAME: 'John',
    };

    // Act
    const result = processTemplate(template, data);

    // Assert
    expect(result).toBe('Hello John, your age is {{AGE}}');
  });

  it('should replace architecture template placeholders', () => {
    // Arrange
    const template = '**Project Name:** {{PROJECT_NAME}}\n\n**Description:**\n{{PROJECT_DESCRIPTION}}\n\n**Primary Users:**\n{{TARGET_USERS}}';
    const data = {
      PROJECT_NAME: 'My Awesome Project',
      PROJECT_DESCRIPTION: 'A project that solves important problems',
      TARGET_USERS: 'Developers and end users',
    };

    // Act
    const result = processTemplate(template, data);

    // Assert
    expect(result).toContain('**Project Name:** My Awesome Project');
    expect(result).toContain('**Description:**\nA project that solves important problems');
    expect(result).toContain('**Primary Users:**\nDevelopers and end users');
  });

  it('should handle conditional blocks {{#if}}', () => {
    // Arrange
    const template = 'Before\n{{#if KEY}}Content when KEY exists{{/if}}\nAfter';
    const data = {
      KEY: 'value',
    };

    // Act
    const result = processTemplate(template, data);

    // Assert
    expect(result).toContain('Content when KEY exists');
    expect(result).not.toContain('{{#if');
    expect(result).not.toContain('{{/if}}');
  });

  it('should remove conditional blocks when value is empty', () => {
    // Arrange
    const template = 'Before\n{{#if EMPTY}}This should be removed{{/if}}\nAfter';
    const data = {
      EMPTY: '',
    };

    // Act
    const result = processTemplate(template, data);

    // Assert
    expect(result).not.toContain('This should be removed');
    expect(result).not.toContain('{{#if');
    expect(result).not.toContain('{{/if}}');
    expect(result).toContain('Before');
    expect(result).toContain('After');
  });
});
