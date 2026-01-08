/**
 * i18n - Sistema de Internacionalização
 * 
 * Gerencia traduções e localização do CLI
 */

import fse from 'fs-extra';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type SupportedLocale = 'pt-BR' | 'en' | 'es';

export interface LocaleData {
  questions: Record<string, string>;
  messages: Record<string, string>;
  validation: Record<string, string>;
  templates: Record<string, string>;
}

let currentLocale: SupportedLocale = 'pt-BR';
let localeData: LocaleData | null = null;

/**
 * Obtém o caminho para a pasta de locales
 * Funciona tanto em desenvolvimento (src/) quanto em produção (dist/)
 */
function getLocalesPath(): string {
  // Se estiver em dist/, volta 2 níveis; se estiver em src/, volta 1 nível
  const isDist = __dirname.includes('dist');
  const projectRoot = isDist ? join(__dirname, '../') : join(__dirname, '../../');
  return join(projectRoot, 'locales');
}

/**
 * Carrega dados de tradução para um idioma
 */
async function loadLocaleData(locale: SupportedLocale): Promise<LocaleData> {
  const localesBasePath = getLocalesPath();
  const localePath = join(localesBasePath, locale);
  
  try {
    const [questions, messages, validation, templates] = await Promise.all([
      fse.readJson(join(localePath, 'questions.json')),
      fse.readJson(join(localePath, 'messages.json')),
      fse.readJson(join(localePath, 'validation.json')),
      fse.readJson(join(localePath, 'templates.json')),
    ]);

    return {
      questions: questions || {},
      messages: messages || {},
      validation: validation || {},
      templates: templates || {},
    };
  } catch {
    // Se não encontrar tradução, retorna pt-BR como fallback
    if (locale !== 'pt-BR') {
      return loadLocaleData('pt-BR');
    }
    throw new Error(`Failed to load locale data for ${locale}`);
  }
}

/**
 * Define o idioma atual
 */
export async function setLocale(locale: SupportedLocale): Promise<void> {
  if (currentLocale === locale && localeData !== null) {
    return; // Já está carregado
  }

  currentLocale = locale;
  localeData = await loadLocaleData(locale);
}

/**
 * Obtém o idioma atual
 */
export function getLocale(): SupportedLocale {
  return currentLocale;
}

/**
 * Traduz uma chave
 */
export function t(key: string, params?: Record<string, string>): string {
  if (!localeData) {
    // Fallback se não houver dados carregados
    return key;
  }

  // Tenta encontrar a chave em qualquer categoria
  let value: string | undefined =
    localeData.questions[key] ||
    localeData.messages[key] ||
    localeData.validation[key] ||
    localeData.templates[key];

  if (!value) {
    // Se não encontrar, retorna a chave
    return key;
  }

  // Substitui parâmetros
  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      value = value!.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
    });
  }

  return value;
}

/**
 * Traduz uma chave de pergunta
 */
export function tQuestion(key: string, params?: Record<string, string>): string {
  if (!localeData) {
    return key;
  }
  const value = localeData.questions[key];
  if (!value) {
    return key;
  }
  if (params) {
    let result = value;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
    });
    return result;
  }
  return value;
}

/**
 * Traduz uma mensagem
 */
export function tMessage(key: string, params?: Record<string, string>): string {
  if (!localeData) {
    return key;
  }
  const value = localeData.messages[key];
  if (!value) {
    return key;
  }
  if (params) {
    let result = value;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
    });
    return result;
  }
  return value;
}

/**
 * Traduz uma mensagem de validação
 */
export function tValidation(key: string, params?: Record<string, string>): string {
  if (!localeData) {
    return key;
  }
  const value = localeData.validation[key];
  if (!value) {
    return key;
  }
  if (params) {
    let result = value;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue);
    });
    return result;
  }
  return value;
}

/**
 * Inicializa o sistema de i18n
 */
export async function initI18n(locale: SupportedLocale = 'pt-BR'): Promise<void> {
  await setLocale(locale);
}

