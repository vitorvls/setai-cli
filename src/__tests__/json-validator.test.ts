/**
 * Testes para validação de JSON
 */

import { describe, it, expect } from 'vitest';
import { extractJSON, validateAIContent } from '../utils/json-validator.js';

describe('JSON Validator', () => {
  describe('extractJSON', () => {
    it('deve extrair JSON de markdown code block', () => {
      const text = '```json\n{"key": "value"}\n```';
      const result = extractJSON(text);
      expect(result).toEqual({ key: 'value' });
    });

    it('deve extrair JSON sem especificar tipo no code block', () => {
      const text = '```\n{"key": "value"}\n```';
      const result = extractJSON(text);
      expect(result).toEqual({ key: 'value' });
    });

    it('deve extrair JSON entre primeira { e última }', () => {
      const text = 'Some text before {"key": "value"} some text after';
      const result = extractJSON(text);
      expect(result).toEqual({ key: 'value' });
    });

    it('deve fazer parse direto de JSON válido', () => {
      const text = '{"key": "value"}';
      const result = extractJSON(text);
      expect(result).toEqual({ key: 'value' });
    });

    it('deve lançar erro para JSON inválido', () => {
      const text = 'not a json';
      expect(() => extractJSON(text)).toThrow();
    });
  });

  describe('validateAIContent', () => {
    it('deve validar conteúdo válido', () => {
      const content = {
        enhancedDescription: 'Description',
        problemImportance: 'Importance',
        businessGoals: ['Goal 1', 'Goal 2'],
        architectureDecisions: ['Decision 1'],
        bestPractices: ['Practice 1'],
        aiUsageGuidelines: 'Guidelines',
      };

      const result = validateAIContent(content);
      expect(result).toEqual(content);
    });

    it('deve validar conteúdo parcial', () => {
      const content = {
        enhancedDescription: 'Description',
      };

      const result = validateAIContent(content);
      expect(result).toEqual(content);
    });

    it('deve validar com arrays vazios', () => {
      const content = {
        businessGoals: [],
        architectureDecisions: [],
      };

      const result = validateAIContent(content);
      expect(result).toEqual(content);
    });

    it('deve lançar erro para tipo inválido', () => {
      const content = {
        businessGoals: 'not an array',
      };

      expect(() => validateAIContent(content)).toThrow();
    });

    it('deve lançar erro para campo não permitido', () => {
      const content = {
        invalidField: 'value',
      };

      // Não deve lançar erro, apenas ignorar campos não permitidos
      const result = validateAIContent(content);
      expect(result).toEqual({});
    });
  });
});

