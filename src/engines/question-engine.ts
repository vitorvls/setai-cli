import inquirer from 'inquirer';
import type { ProjectInfo } from '../types/project-info.js';
import { collectAdvancedGroups } from './advanced-groups-collector.js';
import { tQuestion, tValidation, t, setLocale } from '../utils/i18n.js';
import { getLanguageConfig } from '../config/config-manager.js';
import {
  noneChoice,
  otherChoice,
  normalizeOptionalStackValue,
  isNoneConstraint,
} from '../questions/normalize.js';

/**
 * Question Engine — legacy full questionnaire (still used by some tests).
 * Prefer collectAdaptiveAnswers for init (evidence-first).
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
  framework?: string | null;
  database?: string | null;
  useTDD: boolean;
  strictMode?: boolean;
  useAdvanced?: boolean;
}

export async function collectProjectInfo(advanced: boolean = false): Promise<ProjectInfo> {
  const langConfig = getLanguageConfig();
  const questionLocale = langConfig.questions || 'pt-BR';
  await setLocale(questionLocale as 'pt-BR' | 'en' | 'es');

  const questions = createQuestions(advanced);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const answers = (await inquirer.prompt(questions as any)) as InquirerAnswers;

  const framework = normalizeOptionalStackValue(answers.framework);
  const database = normalizeOptionalStackValue(answers.database);

  const projectInfo: ProjectInfo = {
    projectName: answers.projectName,
    projectDescription: answers.projectDescription,
    problemImportance: answers.problemImportance,
    targetUsers: answers.targetUsers,
    businessGoals: answers.businessGoals,
    technicalConstraints: isNoneConstraint(answers.technicalConstraints)
      ? 'None'
      : answers.technicalConstraints,
    businessConstraints: isNoneConstraint(answers.businessConstraints)
      ? 'None'
      : answers.businessConstraints,
    nonGoals: answers.nonGoals,
    version: answers.version,
    techStack: {
      language:
        typeof answers.language === 'string' && answers.language.includes('templates.')
          ? 'Unknown'
          : answers.language,
      ...(framework ? { framework } : {}),
      ...(database ? { database } : {}),
    },
    preferences: {
      useTDD: answers.useTDD,
      strictMode: answers.strictMode ?? false,
    },
  };

  if (advanced && answers.useAdvanced) {
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
      validate: (input: string) =>
        input?.trim() ? true : tValidation('project.name.required'),
    },
    {
      type: 'input',
      name: 'projectDescription',
      message: tQuestion('project.description'),
      validate: (input: string) =>
        input?.trim() ? true : tValidation('project.description.required'),
    },
    {
      type: 'input',
      name: 'problemImportance',
      message: tQuestion('project.problemImportance'),
      validate: (input: string) =>
        input?.trim() ? true : tValidation('project.problemImportance.required'),
    },
    {
      type: 'input',
      name: 'targetUsers',
      message: tQuestion('project.targetUsers'),
      validate: (input: string) =>
        input?.trim() ? true : tValidation('project.targetUsers.required'),
    },
    {
      type: 'input',
      name: 'businessGoals',
      message: tQuestion('project.businessGoals'),
      validate: (input: string) =>
        input?.trim() ? true : tValidation('project.businessGoals.required'),
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
      validate: (input: string) =>
        input?.trim() ? true : tValidation('project.nonGoals.required'),
    },
    {
      type: 'input',
      name: 'version',
      message: tQuestion('project.version'),
      default: '0.1.0',
      validate: (input: string) => {
        if (!input?.trim()) return tValidation('project.version.required');
        if (!/^\d+\.\d+\.\d+(-.*)?$/.test(input.trim())) {
          return tValidation('project.version.invalid');
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'language',
      message: tQuestion('tech.language'),
      choices: [
        'TypeScript',
        'JavaScript',
        'Python',
        'Go',
        'Rust',
        otherChoice(t('templates.other')),
      ],
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
        noneChoice(t('templates.none')),
        otherChoice(t('templates.other')),
      ],
      when: (answers: InquirerAnswers) =>
        answers.language === 'TypeScript' || answers.language === 'JavaScript',
    },
    {
      type: 'list',
      name: 'database',
      message: tQuestion('tech.database'),
      choices: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'SQLite',
        'Supabase',
        noneChoice(t('templates.none')),
        otherChoice(t('templates.other')),
      ],
    },
    {
      type: 'confirm',
      name: 'useTDD',
      message: tQuestion('preferences.useTDD'),
      default: false,
    },
    {
      type: 'confirm',
      name: 'strictMode',
      message: tQuestion('preferences.strictMode'),
      default: true,
      when: (answers: InquirerAnswers) => answers.language === 'TypeScript',
    },
  ];

  if (advanced) {
    questions.push({
      type: 'confirm',
      name: 'useAdvanced',
      message: tQuestion('advanced.confirm'),
      default: false,
    });
  }

  return questions;
}
