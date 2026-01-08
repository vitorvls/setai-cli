/**
 * Comando config - Gerencia configuração do CLI (API keys, etc.)
 */

import inquirer from 'inquirer';
import {
  setAPIKey,
  removeAPIKey,
  listAPIKeys,
  getConfigPath,
  getLanguageConfig,
  saveLanguageConfig,
} from '../config/config-manager.js';
import { info, success, error, warning, gray } from '../utils/output.js';
import { tMessage, tValidation, setLocale, type SupportedLocale } from '../utils/i18n.js';

interface InquirerAnswers {
  action: 'set' | 'remove' | 'list' | 'exit';
  provider?: 'openai' | 'anthropic' | 'google';
  apiKey?: string;
  defaultModel?: string;
}

/**
 * Comando principal de configuração
 */
export async function configCommand(): Promise<void> {
  info('🔧 Configuração do SetAI CLI\n');
  info(`Arquivo de configuração: ${getConfigPath()}\n`);

  while (true) {
    const answers = (await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que deseja fazer?',
        choices: [
          { name: '➕ Adicionar/Atualizar API Key', value: 'set' },
          { name: '➖ Remover API Key', value: 'remove' },
          { name: '📋 Listar API Keys configuradas', value: 'list' },
          { name: '❌ Sair', value: 'exit' },
        ],
      },
    ])) as InquirerAnswers;

    switch (answers.action) {
      case 'set':
        await handleSetAPIKey();
        break;
      case 'remove':
        await handleRemoveAPIKey();
        break;
      case 'list':
        await handleListAPIKeys();
        break;
      case 'exit':
        info(tMessage('config.goodbye'), true);
        return;
    }
  }
}

/**
 * Lida com adição/atualização de API key
 */
async function handleSetAPIKey(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const answers = (await inquirer.prompt([
    {
      type: 'list' as const,
      name: 'provider',
      message: 'Qual provedor de IA?',
      choices: [
        { name: 'OpenAI (GPT-4, GPT-3.5, etc.)', value: 'openai' },
        { name: 'Anthropic (Claude)', value: 'anthropic' },
        { name: 'Google (Gemini)', value: 'google' },
      ],
    },
    {
      type: 'password',
      name: 'apiKey',
      message: tMessage('config.apiKey'),
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return tValidation('apiKey.required');
        }
        return true;
      },
    },
      {
        type: 'list',
        name: 'defaultModel',
        message: tMessage('config.model'),
        choices: [
          { name: 'gpt-4o (Recomendado - Mais capaz)', value: 'gpt-4o' },
          { name: 'gpt-4o-mini (Rápido e econômico)', value: 'gpt-4o-mini' },
          { name: 'gpt-4-turbo', value: 'gpt-4-turbo' },
          { name: 'gpt-4', value: 'gpt-4' },
          { name: 'gpt-3.5-turbo (Mais barato)', value: 'gpt-3.5-turbo' },
        ],
        default: 'gpt-4o',
        when: (answers: InquirerAnswers) => answers.provider === 'openai',
      },
      {
        type: 'list',
        name: 'defaultModel',
        message: tMessage('config.model'),
        choices: [
          { name: 'claude-3-5-sonnet-20241022 (Recomendado)', value: 'claude-3-5-sonnet-20241022' },
          { name: 'claude-3-5-haiku-20241022 (Rápido)', value: 'claude-3-5-haiku-20241022' },
          { name: 'claude-3-opus-20240229', value: 'claude-3-opus-20240229' },
        ],
        default: 'claude-3-5-sonnet-20241022',
        when: (answers: InquirerAnswers) => answers.provider === 'anthropic',
      },
      {
        type: 'list',
        name: 'defaultModel',
        message: tMessage('config.model'),
        choices: [
          { name: 'gemini-1.5-pro (Recomendado)', value: 'gemini-1.5-pro' },
          { name: 'gemini-1.5-flash (Rápido)', value: 'gemini-1.5-flash' },
          { name: 'gemini-pro', value: 'gemini-pro' },
        ],
        default: 'gemini-1.5-pro',
        when: (answers: InquirerAnswers) => answers.provider === 'google',
      },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any)) as InquirerAnswers;

  try {
    await setAPIKey(answers.provider!, answers.apiKey!, answers.defaultModel);
    success(tMessage('config.keySuccess', { provider: answers.provider! }), true);
    gray(`   Modelo padrão: ${answers.defaultModel || 'não definido'}\n`);
  } catch (err) {
    error('\n❌ Erro ao salvar API Key:');
    if (err instanceof Error) {
      error(err.message);
    }
  }
}

/**
 * Lida com remoção de API key
 */
async function handleRemoveAPIKey(): Promise<void> {
  const keys = await listAPIKeys();
  const availableProviders = Object.entries(keys)
    .filter(([, configured]) => configured)
    .map(([provider]) => provider);

  if (availableProviders.length === 0) {
    warning('\n⚠️  Nenhuma API Key configurada para remover.\n');
    return;
  }

  const answers = (await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Qual API Key deseja remover?',
      choices: availableProviders.map((provider) => ({
        name: provider.charAt(0).toUpperCase() + provider.slice(1),
        value: provider,
      })),
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Tem certeza que deseja remover esta API Key?',
      default: false,
    },
  ])) as InquirerAnswers & { confirm: boolean };

  if (!answers.confirm) {
    info('\nOperação cancelada.\n');
    return;
  }

  try {
    await removeAPIKey(answers.provider as 'openai' | 'anthropic' | 'google');
    success(tMessage('config.keyRemoved', { provider: answers.provider! }), true);
  } catch (err) {
    error('\n❌ Erro ao remover API Key:');
    if (err instanceof Error) {
      error(err.message);
    }
  }
}

/**
 * Lista API keys configuradas
 */
async function handleListAPIKeys(): Promise<void> {
  const keys = await listAPIKeys();
  
  info('\n📋 API Keys configuradas:\n');
  
  const providers = [
    { name: 'OpenAI', key: 'openai' },
    { name: 'Anthropic', key: 'anthropic' },
    { name: 'Google', key: 'google' },
  ];

  for (const provider of providers) {
    const configured = keys[provider.key];
    if (configured) {
      success(`  ✅ ${provider.name}: Configurada`);
    } else {
      gray(`  ⚪ ${provider.name}: Não configurada`);
    }
  }
  
  info('\n');
}

/**
 * Lida com configuração de idioma
 * @internal Função não utilizada no momento - mantida para uso futuro
 */
// Função mantida para uso futuro
// @ts-expect-error - Função não utilizada
async function _handleSetLanguage(): Promise<void> {
  const { questionsLang, filesLang } = await inquirer.prompt([
    {
      type: 'list',
      name: 'questionsLang',
      message: tMessage('config.language.questions'),
      choices: [
        { name: 'Português (pt-BR)', value: 'pt-BR' },
        { name: 'English (en)', value: 'en' },
        { name: 'Español (es)', value: 'es' },
      ],
      default: getLanguageConfig().questions || 'pt-BR',
    },
    {
      type: 'list',
      name: 'filesLang',
      message: tMessage('config.language.files'),
      choices: [
        { name: 'Português (pt-BR)', value: 'pt-BR' },
        { name: 'English (en)', value: 'en' },
        { name: 'Español (es)', value: 'es' },
      ],
      default: getLanguageConfig().files || 'pt-BR',
    },
  ]);

  await saveLanguageConfig({
    questions: questionsLang as SupportedLocale,
    files: filesLang as SupportedLocale,
  });

  success(tMessage('config.language.success'), true);
  
  // Atualiza locale atual para refletir mudança
  await setLocale(questionsLang as SupportedLocale);
}

