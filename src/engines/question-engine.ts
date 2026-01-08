import inquirer from 'inquirer';
import type { ProjectInfo } from '../types/project-info.js';
import { collectAdvancedGroups } from './advanced-groups-collector.js';
import { tQuestion, tValidation, t, setLocale } from '../utils/i18n.js';
import { getLanguageConfig } from '../config/config-manager.js';

/**
 * Question Engine - Coleta informações do usuário através de perguntas interativas
 */

interface InquirerAnswers {
  projectName: string;
  projectDescription: string;
  problemImportance: string;
  targetUsers: string;
  businessGoals: string;
  technicalConstraints: string;
  businessConstraints: string;
  nonGoals: string;
  version: string;
  language: string;
  framework?: string;
  database?: string;
  useTDD: boolean;
  strictMode?: boolean;
  // Advanced options
  useAdvanced?: boolean;
  advancedGroups?: string[];
  // Grupo 1: AI Usage
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
  // Grupo 2: Responsabilidades
  ctoResponsibility?: string;
  techLeadResponsibility?: string;
  devResponsibility?: string;
  // Grupo 3: Bibliotecas
  allowedLibraries?: string;
  forbiddenLibraries?: string;
  libraryNotes?: string;
  // Grupo 4: Arquitetura
  architecturalStyle?: string;
  architecturalDecisions?: string;
  designPatterns?: string;
  // Grupo 5: Segurança
  authenticationMethod?: string;
  dataProtection?: string;
  securityRules?: string;
  // Grupo 6: Testes
  testStrategy?: string;
  testCoverage?: string;
  testTools?: string;
  // Grupo 7: Deploy
  deploymentMethod?: string;
  infrastructure?: string;
  ciCd?: string;
  environments?: string;
  // Grupo 8: Documentação
  documentationStandards?: string;
  apiDocumentation?: string;
  codeComments?: string;
}

export async function collectProjectInfo(advanced: boolean = false): Promise<ProjectInfo> {
  // Carrega configuração de idioma para perguntas
  const langConfig = getLanguageConfig();
  const questionLocale = langConfig.questions || 'pt-BR';
  await setLocale(questionLocale as 'pt-BR' | 'en' | 'es');

  const questions = createQuestions(advanced);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const answers = (await inquirer.prompt(questions as any)) as InquirerAnswers;

  const projectInfo: ProjectInfo = {
    projectName: answers.projectName,
    projectDescription: answers.projectDescription,
    problemImportance: answers.problemImportance,
    targetUsers: answers.targetUsers,
    businessGoals: answers.businessGoals,
    technicalConstraints: answers.technicalConstraints,
    businessConstraints: answers.businessConstraints,
    nonGoals: answers.nonGoals,
    version: answers.version,
    techStack: {
      language: answers.language,
      framework: answers.framework,
      database: answers.database,
    },
    preferences: {
      useTDD: answers.useTDD,
      strictMode: answers.strictMode ?? false,
    },
  };

  // Adiciona configurações avançadas se solicitado
  if (advanced && answers.useAdvanced) {
    // Coleta grupos avançados de forma iterativa
    projectInfo.advanced = await collectAdvancedGroups();
  }

  return projectInfo;
}

export function createQuestions(advanced: boolean = false) {
  const questions: Array<Record<string, unknown>> = [
    {
      type: 'input',
      name: 'projectName',
      message: tQuestion('project.name'),
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return tValidation('project.name.required');
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: tQuestion('project.description'),
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return tValidation('project.description.required');
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'problemImportance',
      message: tQuestion('project.problemImportance'),
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return tValidation('project.problemImportance.required');
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'targetUsers',
      message: tQuestion('project.targetUsers'),
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return tValidation('project.targetUsers.required');
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'businessGoals',
      message: tQuestion('project.businessGoals'),
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return tValidation('project.businessGoals.required');
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'technicalConstraints',
      message: tQuestion('project.technicalConstraints'),
      default: t('templates.constraints.none'),
    },
    {
      type: 'input',
      name: 'businessConstraints',
      message: tQuestion('project.businessConstraints'),
      default: t('templates.constraints.none'),
    },
    {
      type: 'input',
      name: 'nonGoals',
      message: tQuestion('project.nonGoals'),
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return tValidation('project.nonGoals.required');
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'version',
      message: tQuestion('project.version'),
      default: '0.1.0',
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return tValidation('project.version.required');
        }
        // Validação básica de versão semântica
        const versionPattern = /^\d+\.\d+\.\d+(-.*)?$/;
        if (!versionPattern.test(input.trim())) {
          return tValidation('project.version.invalid');
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'language',
      message: tQuestion('tech.language'),
      choices: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', t('templates.other')],
      default: 'TypeScript',
    },
    {
      type: 'list',
      name: 'framework',
      message: tQuestion('tech.framework'),
      choices: [
        'Next.js',
        'React',
        'Vue',
        'Angular',
        'Express',
        'FastAPI',
        'Django',
        t('templates.none'),
        t('templates.other'),
      ],
      when: (answers: InquirerAnswers) =>
        answers.language === 'TypeScript' || answers.language === 'JavaScript',
    },
    {
      type: 'list',
      name: 'database',
      message: tQuestion('tech.database'),
      choices: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Supabase', t('templates.none'), t('templates.other')],
    },
    {
      type: 'confirm',
      name: 'useTDD',
      message: tQuestion('preferences.useTDD'),
      default: true,
    },
    {
      type: 'confirm',
      name: 'strictMode',
      message: tQuestion('preferences.strictMode'),
      default: true,
      when: (answers: InquirerAnswers) => answers.language === 'TypeScript',
    },
  ];

  // Adiciona pergunta sobre opções avançadas se solicitado
  if (advanced) {
    questions.push({
      type: 'confirm',
      name: 'useAdvanced',
      message: tQuestion('advanced.confirm'),
      default: false,
    });
    // As perguntas dos grupos avançados são coletadas de forma iterativa em collectAdvancedGroups()
  }

  return questions;
}
