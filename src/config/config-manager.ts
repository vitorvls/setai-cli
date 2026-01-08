/**
 * Config Manager - Gerencia configuração local do CLI
 * 
 * Armazena API keys e outras configurações em arquivo local
 * (não commitado no Git)
 */

import fse from 'fs-extra';
import { join } from 'path';
import { homedir } from 'os';

export interface AIConfig {
  openai?: {
    apiKey?: string;
    defaultModel?: string;
  };
  anthropic?: {
    apiKey?: string;
    defaultModel?: string;
  };
  google?: {
    apiKey?: string;
    defaultModel?: string;
  };
}

export interface LanguageConfig {
  questions?: 'pt-BR' | 'en' | 'es';
  files?: 'pt-BR' | 'en' | 'es';
}

export interface CLIConfig {
  ai?: AIConfig;
  language?: LanguageConfig;
}

const CONFIG_DIR = join(homedir(), '.setai');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

// Cache da configuração em memória
let cachedConfig: CLIConfig | null = null;

/**
 * Carrega configuração do arquivo local
 */
export async function loadConfig(): Promise<CLIConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    if (await fse.pathExists(CONFIG_FILE)) {
      const content = await fse.readFile(CONFIG_FILE, 'utf-8');
      cachedConfig = JSON.parse(content) as CLIConfig;
      return cachedConfig;
    }
  } catch (err) {
    // Se houver erro ao ler, retorna config vazia
    if (err instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Erro ao carregar configuração: ${err.message}`);
    }
  }
  cachedConfig = {} as CLIConfig;
  return cachedConfig;
}

/**
 * Salva configuração no arquivo local
 */
export async function saveConfig(config: CLIConfig): Promise<void> {
  try {
    // Garante que o diretório existe
    await fse.ensureDir(CONFIG_DIR);
    
    // Salva configuração
    await fse.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
    cachedConfig = config as CLIConfig; // Atualiza cache
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Erro ao salvar configuração: ${err.message}`);
    }
    throw err;
  }
}

/**
 * Obtém API key de um provedor específico
 */
export async function getAPIKey(provider: 'openai' | 'anthropic' | 'google'): Promise<string | undefined> {
  const config = await loadConfig();
  return config.ai?.[provider]?.apiKey;
}

/**
 * Define API key de um provedor específico
 */
export async function setAPIKey(
  provider: 'openai' | 'anthropic' | 'google',
  apiKey: string,
  defaultModel?: string
): Promise<void> {
  const config = await loadConfig();
  
  if (!config.ai) {
    config.ai = {};
  }
  
  if (!config.ai[provider]) {
    config.ai[provider] = {};
  }
  
  config.ai[provider]!.apiKey = apiKey;
  if (defaultModel) {
    config.ai[provider]!.defaultModel = defaultModel;
  }
  
  await saveConfig(config);
}

/**
 * Remove API key de um provedor específico
 */
export async function removeAPIKey(provider: 'openai' | 'anthropic' | 'google'): Promise<void> {
  const config = await loadConfig();
  
  if (config.ai?.[provider]) {
    delete config.ai[provider];
    await saveConfig(config);
  }
}

/**
 * Lista todas as API keys configuradas (sem mostrar os valores)
 */
export async function listAPIKeys(): Promise<Record<string, boolean>> {
  const config = await loadConfig();
  
  return {
    openai: !!config.ai?.openai?.apiKey,
    anthropic: !!config.ai?.anthropic?.apiKey,
    google: !!config.ai?.google?.apiKey,
  };
}

/**
 * Obtém caminho do arquivo de configuração (para debug)
 */
export function getConfigPath(): string {
  return CONFIG_FILE;
}

/**
 * Obtém configuração de idioma
 */
export function getLanguageConfig(): LanguageConfig {
  if (!cachedConfig) {
    return { questions: 'pt-BR', files: 'pt-BR' };
  }
  return cachedConfig.language || { questions: 'pt-BR', files: 'pt-BR' };
}

/**
 * Salva configuração de idioma
 */
export async function saveLanguageConfig(languageConfig: LanguageConfig): Promise<void> {
  const config = await loadConfig();
  config.language = languageConfig;
  await saveConfig(config);
}

