/**
 * IDE Selector - Seleciona IDE e determina pasta de configuração
 */

import inquirer from 'inquirer';
import { IDE_CONFIGS, type IDE, type IDEConfig } from '../types/ide-config.js';
import { tQuestion, tValidation, getLocale } from '../utils/i18n.js';
import { getLanguageConfig } from '../config/config-manager.js';

interface InquirerAnswers {
  ide: IDE;
  customFolder?: string;
}

/**
 * Coleta seleção de IDE do usuário
 */
export async function collectIDESelection(): Promise<IDEConfig> {
  // Carrega configuração de idioma para perguntas
  const langConfig = getLanguageConfig();
  const questionLocale = langConfig.questions || 'pt-BR';
  await import('../utils/i18n.js').then((m) => m.setLocale(questionLocale as 'pt-BR' | 'en' | 'es'));

  const questions = [
    {
      type: 'list',
      name: 'ide',
      message: tQuestion('ide.selection'),
      choices: [
        { name: 'Cursor', value: 'cursor' },
        { name: 'VS Code', value: 'vscode' },
        { name: 'JetBrains (IntelliJ, WebStorm, etc.)', value: 'jetbrains' },
        { name: 'Outra IDE / Genérico (.ai)', value: 'other' },
      ],
      default: 'cursor',
    },
    {
      type: 'input',
      name: 'customFolder',
      message: tQuestion('ide.customFolder'),
      default: '.ai',
      when: (answers: InquirerAnswers) => answers.ide === 'other',
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return tValidation('ide.customFolder.required');
        }
        // Validação básica: não pode ter caracteres inválidos
        if (input.includes('..') || input.includes('/') || input.includes('\\')) {
          return tValidation('ide.customFolder.invalid');
        }
        return true;
      },
    },
  ];

  const answers = (await inquirer.prompt(questions)) as InquirerAnswers;

  if (answers.ide === 'other') {
    return {
      ide: 'other',
      configFolder: answers.customFolder?.trim() || '.ai',
      name: 'Outra IDE',
    };
  }

  return IDE_CONFIGS[answers.ide];
}

