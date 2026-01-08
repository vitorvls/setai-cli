/**
 * Advanced Groups Collector - Coleta grupos avançados de forma iterativa
 * 
 * Permite que o usuário selecione um grupo, responda as perguntas,
 * e depois volte para selecionar outro grupo (com os já respondidos indisponíveis)
 */

import inquirer from 'inquirer';
import type { AdvancedConfig } from '../types/project-info.js';
import { tQuestion, tMessage, t, setLocale } from '../utils/i18n.js';
import { getLanguageConfig } from '../config/config-manager.js';
import { success, info } from '../utils/output.js';

interface GroupDefinition {
  id: string;
  name: string;
  questions: Array<Record<string, unknown>>;
}

interface InquirerAnswers {
  selectedGroup?: string;
  continueGroups?: boolean;
  preferredModelArchitecture?: string;
  preferredModelImplementation?: string;
  preferredModelRefactoring?: string;
  preferredModelDebug?: string;
  preferredModelBoilerplate?: string;
  allowArchitecturePlanning?: boolean;
  allowCodeGeneration?: boolean;
  allowRefactoring?: boolean;
  allowDebug?: boolean;
  allowDocumentation?: boolean;
  customConstraints?: string;
  ctoResponsibility?: string;
  techLeadResponsibility?: string;
  devResponsibility?: string;
  allowedLibraries?: string;
  forbiddenLibraries?: string;
  libraryNotes?: string;
  architecturalStyle?: string;
  architecturalDecisions?: string;
  designPatterns?: string;
  authenticationMethod?: string;
  dataProtection?: string;
  securityRules?: string;
  testStrategy?: string;
  testCoverage?: string;
  testTools?: string;
  deploymentMethod?: string;
  infrastructure?: string;
  ciCd?: string;
  environments?: string;
  documentationStandards?: string;
  apiDocumentation?: string;
  codeComments?: string;
}

/**
 * Cria definições de grupos com suas perguntas
 */
function createGroupDefinitions(): GroupDefinition[] {
  return [
    {
      id: 'ai-usage',
      name: '🤖 AI Usage Rules - Modelos preferidos e regras de uso de IA',
      questions: [
        {
          type: 'list',
          name: 'preferredModelArchitecture',
          message: tQuestion('ai.preferredModelArchitecture'),
          choices: ['Claude 4.5 Opus', 'GPT-5.2', 'Claude 4.5 Sonnet', 'Gemini 3 Pro', t('templates.notSpecified')],
          default: 'Claude 4.5 Opus',
        },
        {
          type: 'list',
          name: 'preferredModelImplementation',
          message: tQuestion('ai.preferredModelImplementation'),
          choices: [
            'Cursor Composer + GPT-5.1 Codex',
            'GPT-5.1 Codex Max',
            'Gemini 3 Flash',
            'Claude 4.5 Sonnet',
            t('templates.notSpecified'),
          ],
          default: 'Cursor Composer + GPT-5.1 Codex',
        },
        {
          type: 'list',
          name: 'preferredModelRefactoring',
          message: tQuestion('ai.preferredModelRefactoring'),
          choices: ['Claude 4.5 Sonnet', 'Gemini 3 Pro', 'GPT-5.1 Codex', t('templates.notSpecified')],
          default: 'Claude 4.5 Sonnet',
        },
        {
          type: 'list',
          name: 'preferredModelDebug',
          message: tQuestion('ai.preferredModelDebug'),
          choices: ['Gemini 3 Pro', 'Claude 4.5 Sonnet', 'GPT-5.2', t('templates.notSpecified')],
          default: 'Gemini 3 Pro',
        },
        {
          type: 'list',
          name: 'preferredModelBoilerplate',
          message: tQuestion('ai.preferredModelBoilerplate'),
          choices: ['Gemini 3 Flash', 'GPT-5.1 Codex', 'Claude 4.5 Sonnet', t('templates.notSpecified')],
          default: 'Gemini 3 Flash',
        },
        {
          type: 'confirm',
          name: 'allowArchitecturePlanning',
          message: tQuestion('ai.allowArchitecturePlanning'),
          default: true,
        },
        {
          type: 'confirm',
          name: 'allowCodeGeneration',
          message: tQuestion('ai.allowCodeGeneration'),
          default: true,
        },
        {
          type: 'confirm',
          name: 'allowRefactoring',
          message: tQuestion('ai.allowRefactoring'),
          default: true,
        },
        {
          type: 'confirm',
          name: 'allowDebug',
          message: tQuestion('ai.allowDebug'),
          default: true,
        },
        {
          type: 'confirm',
          name: 'allowDocumentation',
          message: tQuestion('ai.allowDocumentation'),
          default: true,
        },
        {
          type: 'input',
          name: 'customConstraints',
          message: tQuestion('ai.customConstraints'),
          default: '',
        },
      ],
    },
    {
      id: 'responsibilities',
      name: '👥 Responsabilidades - CTO, Tech Lead, Dev',
      questions: [
        {
          type: 'input',
          name: 'ctoResponsibility',
          message: tQuestion('responsibilities.cto'),
          default: 'Define política e limites',
        },
        {
          type: 'input',
          name: 'techLeadResponsibility',
          message: tQuestion('responsibilities.techLead'),
          default: 'Garante padrões e revisão',
        },
        {
          type: 'input',
          name: 'devResponsibility',
          message: tQuestion('responsibilities.dev'),
          default: 'Usa IA como ferramenta, não como atalho',
        },
      ],
    },
    {
      id: 'libraries',
      name: '📚 Bibliotecas - Lista customizada de libs permitidas/proibidas',
      questions: [
        {
          type: 'input',
          name: 'allowedLibraries',
          message: tQuestion('libraries.allowed'),
          default: '',
        },
        {
          type: 'input',
          name: 'forbiddenLibraries',
          message: tQuestion('libraries.forbidden'),
          default: '',
        },
        {
          type: 'input',
          name: 'libraryNotes',
          message: tQuestion('libraries.notes'),
          default: '',
        },
      ],
    },
    {
      id: 'architecture',
      name: '🏗️ Arquitetura Detalhada - Decisões arquiteturais e padrões',
      questions: [
        {
          type: 'input',
          name: 'architecturalStyle',
          message: tQuestion('architecture.style'),
          default: '',
        },
        {
          type: 'input',
          name: 'architecturalDecisions',
          message: tQuestion('architecture.decisions'),
          default: '',
        },
        {
          type: 'input',
          name: 'designPatterns',
          message: tQuestion('architecture.patterns'),
          default: '',
        },
      ],
    },
    {
      id: 'security',
      name: '🔒 Segurança - Regras específicas de segurança',
      questions: [
        {
          type: 'input',
          name: 'authenticationMethod',
          message: tQuestion('security.authentication'),
          default: '',
        },
        {
          type: 'input',
          name: 'dataProtection',
          message: tQuestion('security.dataProtection'),
          default: '',
        },
        {
          type: 'input',
          name: 'securityRules',
          message: tQuestion('security.rules'),
          default: '',
        },
      ],
    },
    {
      id: 'testing',
      name: '🧪 Testes - Estratégia detalhada de testes',
      questions: [
        {
          type: 'input',
          name: 'testStrategy',
          message: tQuestion('testing.strategy'),
          default: '',
        },
        {
          type: 'input',
          name: 'testCoverage',
          message: tQuestion('testing.coverage'),
          default: '',
        },
        {
          type: 'input',
          name: 'testTools',
          message: tQuestion('testing.tools'),
          default: '',
        },
      ],
    },
    {
      id: 'deployment',
      name: '📦 Deploy - Configurações de deploy e infraestrutura',
      questions: [
        {
          type: 'input',
          name: 'deploymentMethod',
          message: tQuestion('deployment.method'),
          default: '',
        },
        {
          type: 'input',
          name: 'infrastructure',
          message: tQuestion('deployment.infrastructure'),
          default: '',
        },
        {
          type: 'input',
          name: 'ciCd',
          message: tQuestion('deployment.cicd'),
          default: '',
        },
        {
          type: 'input',
          name: 'environments',
          message: tQuestion('deployment.environments'),
          default: '',
        },
      ],
    },
    {
      id: 'documentation',
      name: '📝 Documentação - Padrões de documentação',
      questions: [
        {
          type: 'input',
          name: 'documentationStandards',
          message: tQuestion('documentation.standards'),
          default: '',
        },
        {
          type: 'input',
          name: 'apiDocumentation',
          message: tQuestion('documentation.api'),
          default: '',
        },
        {
          type: 'input',
          name: 'codeComments',
          message: tQuestion('documentation.comments'),
          default: '',
        },
      ],
    },
  ];
}

/**
 * Coleta grupos avançados de forma iterativa
 */
export async function collectAdvancedGroups(): Promise<AdvancedConfig> {
  const groupDefinitions = createGroupDefinitions();
  const answeredGroups = new Set<string>();
  const allAnswers: InquirerAnswers = {};
  const advancedConfig: AdvancedConfig = {
    selectedGroups: [],
  };

  // Carrega idioma configurado
  const langConfig = getLanguageConfig();
  const questionLocale = langConfig.questions || 'pt-BR';
  await setLocale(questionLocale as 'pt-BR' | 'en' | 'es');

  info(tMessage('advanced.welcome'), true);
  info(tMessage('advanced.instruction'), true);

  // Loop iterativo: seleciona grupo → responde perguntas → volta para seleção
  while (true) {
    // Cria lista de grupos disponíveis (não respondidos)
    const availableGroups = groupDefinitions.filter((group) => !answeredGroups.has(group.id));
    
    // Se não há mais grupos disponíveis, finaliza
    if (availableGroups.length === 0) {
      break;
    }

    // Cria opções para seleção (com grupos respondidos marcados como indisponíveis)
    const groupChoices = groupDefinitions.map((group) => {
      const isAnswered = answeredGroups.has(group.id);
      return {
        name: isAnswered ? `${group.name}${tMessage('advanced.group.alreadyAnswered')}` : group.name,
        value: group.id,
        disabled: isAnswered,
      };
    });

    // Adiciona opção de finalizar
    groupChoices.push({
      name: tQuestion('advanced.finish'),
      value: 'finish',
    });

    // Pergunta qual grupo responder
    const groupSelection = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedGroup',
        message: tQuestion('advanced.groupSelection'),
        choices: groupChoices,
      },
    ]);

    const selectedGroupId = (groupSelection as { selectedGroup: string }).selectedGroup;

    // Se escolheu finalizar, sai do loop
    if (selectedGroupId === 'finish') {
      break;
    }

    // Encontra o grupo selecionado
    const selectedGroup = groupDefinitions.find((g) => g.id === selectedGroupId);
    if (!selectedGroup) {
      continue;
    }

    // Faz as perguntas do grupo selecionado
    info(tMessage('advanced.group.answering', { name: selectedGroup.name }), true);
    const groupAnswers = (await inquirer.prompt(selectedGroup.questions)) as InquirerAnswers;

    // Salva as respostas
    Object.assign(allAnswers, groupAnswers);

    // Marca o grupo como respondido
    answeredGroups.add(selectedGroupId);
    if (!advancedConfig.selectedGroups) {
      advancedConfig.selectedGroups = [];
    }
    advancedConfig.selectedGroups.push(selectedGroupId);

    // Processa as respostas do grupo e adiciona ao advancedConfig
    processGroupAnswers(selectedGroupId, groupAnswers, advancedConfig);

    success(tMessage('advanced.group.success', { name: selectedGroup.name }), true);
  }

  return advancedConfig;
}

/**
 * Processa as respostas de um grupo e adiciona ao advancedConfig
 */
function processGroupAnswers(
  groupId: string,
  answers: InquirerAnswers,
  config: AdvancedConfig
): void {
  switch (groupId) {
    case 'ai-usage':
      config.preferredAIModels = {
        architecture: answers.preferredModelArchitecture,
        implementation: answers.preferredModelImplementation,
        refactoring: answers.preferredModelRefactoring,
        debug: answers.preferredModelDebug,
        boilerplate: answers.preferredModelBoilerplate,
      };
      config.aiUsageRules = {
        allowArchitecturePlanning: answers.allowArchitecturePlanning,
        allowCodeGeneration: answers.allowCodeGeneration,
        allowRefactoring: answers.allowRefactoring,
        allowDebug: answers.allowDebug,
        allowDocumentation: answers.allowDocumentation,
      };
      config.customConstraints = answers.customConstraints;
      break;

    case 'responsibilities':
      config.responsibilities = {
        cto: answers.ctoResponsibility,
        techLead: answers.techLeadResponsibility,
        dev: answers.devResponsibility,
      };
      break;

    case 'libraries':
      config.allowedLibraries = answers.allowedLibraries
        ?.split(',')
        .map((lib) => lib.trim())
        .filter((lib) => lib.length > 0);
      config.forbiddenLibraries = answers.forbiddenLibraries
        ?.split(',')
        .map((lib) => lib.trim())
        .filter((lib) => lib.length > 0);
      config.libraryNotes = answers.libraryNotes;
      break;

    case 'architecture':
      config.architecturalStyle = answers.architecturalStyle;
      config.architecturalDecisions = answers.architecturalDecisions
        ?.split(',')
        .map((dec) => dec.trim())
        .filter((dec) => dec.length > 0);
      config.designPatterns = answers.designPatterns
        ?.split(',')
        .map((pattern) => pattern.trim())
        .filter((pattern) => pattern.length > 0);
      break;

    case 'security':
      config.authenticationMethod = answers.authenticationMethod;
      config.dataProtection = answers.dataProtection;
      config.securityRules = answers.securityRules
        ?.split(',')
        .map((rule) => rule.trim())
        .filter((rule) => rule.length > 0);
      break;

    case 'testing':
      config.testStrategy = answers.testStrategy;
      config.testCoverage = answers.testCoverage;
      config.testTools = answers.testTools
        ?.split(',')
        .map((tool) => tool.trim())
        .filter((tool) => tool.length > 0);
      break;

    case 'deployment':
      config.deploymentMethod = answers.deploymentMethod;
      config.infrastructure = answers.infrastructure;
      config.ciCd = answers.ciCd;
      config.environments = answers.environments;
      break;

    case 'documentation':
      config.documentationStandards = answers.documentationStandards;
      config.apiDocumentation = answers.apiDocumentation;
      config.codeComments = answers.codeComments;
      break;
  }
}

