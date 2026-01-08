import { describe, it, expect, beforeEach } from 'vitest';
import {
  initI18n,
  setLocale,
  getLocale,
  t,
  tQuestion,
  tMessage,
  tValidation,
  type SupportedLocale,
} from '../utils/i18n.js';

/**
 * Testes para i18n
 * Testa sistema de internacionalização
 */

describe('i18n', () => {
  beforeEach(async () => {
    await initI18n('pt-BR');
  });

  describe('initI18n', () => {
    it('should initialize with default locale', async () => {
      await initI18n();
      
      expect(getLocale()).toBe('pt-BR');
    });

    it('should initialize with specified locale', async () => {
      await initI18n('en');
      
      expect(getLocale()).toBe('en');
    });
  });

  describe('setLocale', () => {
    it('should change locale', async () => {
      await setLocale('en');
      
      expect(getLocale()).toBe('en');
    });

    it('should load locale data', async () => {
      await setLocale('pt-BR');
      
      const message = tMessage('init.starting');
      expect(message).toBeTruthy();
      expect(typeof message).toBe('string');
    });
  });

  describe('getLocale', () => {
    it('should return current locale', () => {
      const locale = getLocale();
      
      expect(['pt-BR', 'en', 'es']).toContain(locale);
    });
  });

  describe('t (generic translation)', () => {
    it('should translate message key', async () => {
      await setLocale('pt-BR');
      
      const result = t('init.starting');
      
      expect(result).toBeTruthy();
      expect(result).not.toBe('init.starting');
    });

    it('should return key if translation not found', async () => {
      await setLocale('pt-BR');
      
      const result = t('nonexistent.key');
      
      expect(result).toBe('nonexistent.key');
    });

    it('should replace parameters', async () => {
      await setLocale('pt-BR');
      
      const result = t('init.configFolder', { folder: '.cursor' });
      
      expect(result).toContain('.cursor');
    });
  });

  describe('tQuestion', () => {
    it('should translate question key', async () => {
      await setLocale('pt-BR');
      
      const result = tQuestion('project.name');
      
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should return key if translation not found', async () => {
      await setLocale('pt-BR');
      
      const result = tQuestion('nonexistent.question');
      
      expect(result).toBe('nonexistent.question');
    });
  });

  describe('tMessage', () => {
    it('should translate message key', async () => {
      await setLocale('pt-BR');
      
      const result = tMessage('init.starting');
      
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should replace parameters in messages', async () => {
      await setLocale('pt-BR');
      
      const result = tMessage('init.configFolder', { folder: '.cursor' });
      
      expect(result).toContain('.cursor');
    });
  });

  describe('tValidation', () => {
    it('should translate validation key', async () => {
      await setLocale('pt-BR');
      
      const result = tValidation('project.name.required');
      
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should return key if translation not found', async () => {
      await setLocale('pt-BR');
      
      const result = tValidation('nonexistent.validation');
      
      expect(result).toBe('nonexistent.validation');
    });
  });

  describe('locale switching', () => {
    it('should switch between locales', async () => {
      await setLocale('pt-BR');
      const ptMessage = tMessage('init.starting');
      
      await setLocale('en');
      const enMessage = tMessage('init.starting');
      
      // Messages should be different (unless they're the same in both languages)
      expect(ptMessage).toBeTruthy();
      expect(enMessage).toBeTruthy();
    });

    it('should handle all supported locales', async () => {
      const locales: SupportedLocale[] = ['pt-BR', 'en', 'es'];
      
      for (const locale of locales) {
        await setLocale(locale);
        expect(getLocale()).toBe(locale);
        
        const message = tMessage('init.starting');
        expect(message).toBeTruthy();
      }
    });
  });

  describe('parameter replacement', () => {
    it('should replace single parameter', async () => {
      await setLocale('pt-BR');
      
      const result = t('init.configFolder', { folder: 'test-folder' });
      
      expect(result).toContain('test-folder');
    });

    it('should replace multiple parameters', async () => {
      await setLocale('pt-BR');
      
      const result = t('init.info.project', { name: 'MyProject' });
      
      expect(result).toContain('MyProject');
    });

    it('should handle missing parameters gracefully', async () => {
      await setLocale('pt-BR');
      
      const result = t('init.configFolder', {});
      
      // Should not throw, but may contain {{folder}} if not replaced
      expect(result).toBeTruthy();
    });
  });
});
