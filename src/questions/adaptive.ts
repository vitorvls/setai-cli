/**
 * Adaptive / greenfield question collection.
 * Scanner answers what it can prove; user answers intent and gaps.
 */

import inquirer from 'inquirer';
import type { EvidenceBag } from '../scanner/types.js';
import type { UserAnswers } from '../context/user-answers.js';
import type { AdvancedConfig } from '../types/project-info.js';
import { collectAdvancedGroups } from '../engines/advanced-groups-collector.js';
import { tQuestion, tValidation, t, setLocale } from '../utils/i18n.js';
import { getLanguageConfig } from '../config/config-manager.js';
import { noneChoice, otherChoice, normalizeOptionalStackValue, isNoneConstraint } from './normalize.js';
import { info, gray } from '../utils/output.js';

export function printScanSummary(evidence: EvidenceBag): void {
  info('Repository scan complete.', true);
  if (evidence.isGreenfield) {
    gray('  Mode: greenfield (little or no manifest evidence)', true);
    return;
  }
  if (evidence.languages.length) {
    gray(`  ✓ Languages: ${evidence.languages.join(', ')}`, true);
  }
  if (evidence.runtime) {
    gray(
      `  ✓ Runtime: ${evidence.runtime.name}${evidence.runtime.versionRange ? ' ' + evidence.runtime.versionRange : ''}`,
      true
    );
  }
  if (evidence.traits.length) {
    gray(`  ✓ Traits: ${evidence.traits.join(', ')}`, true);
  }
  if (evidence.frameworks.cli) {
    gray(`  ✓ CLI framework: ${evidence.frameworks.cli}`, true);
  }
  if (evidence.frameworks.test) {
    gray(`  ✓ Test runner: ${evidence.frameworks.test}`, true);
  }
  if (evidence.frameworks.build) {
    gray(`  ✓ Build: ${evidence.frameworks.build}`, true);
  }
  if (evidence.lockfiles.length === 1) {
    gray(`  ✓ Package manager: ${evidence.lockfiles[0]!.packageManager}`, true);
  }
  if (evidence.databasePackages.length === 0) {
    gray('  — Database: none detected', true);
  } else {
    gray(`  ✓ Database packages: ${evidence.databasePackages.join(', ')}`, true);
  }
  if (evidence.httpFrameworks.length === 0) {
    gray('  — Web/HTTP framework: none detected', true);
  }
  if (evidence.cicd.status === 'absent') {
    gray('  — Active CI: none detected', true);
  } else {
    gray(`  ✓ CI: ${evidence.cicd.provider} (${evidence.cicd.status})`, true);
  }
  for (const w of evidence.warnings) {
    gray(`  ! ${w}`, true);
  }
}

export async function collectAdaptiveAnswers(
  evidence: EvidenceBag,
  advanced: boolean
): Promise<{ answers: UserAnswers; advancedConfig?: AdvancedConfig }> {
  const langConfig = getLanguageConfig();
  const questionLocale = langConfig.questions || 'pt-BR';
  await setLocale(questionLocale as 'pt-BR' | 'en' | 'es');

  printScanSummary(evidence);

  const questions = buildQuestions(evidence, advanced);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = (await inquirer.prompt(questions as any)) as Record<string, unknown>;

  let advancedConfig: AdvancedConfig | undefined;
  if (advanced && raw.useAdvanced) {
    advancedConfig = await collectAdvancedGroups();
  }

  const answers = mapToUserAnswers(raw, evidence, advancedConfig);
  return advancedConfig ? { answers, advancedConfig } : { answers };
}

function buildQuestions(evidence: EvidenceBag, advanced: boolean): Array<Record<string, unknown>> {
  const hasStrongLanguage = evidence.languages.length > 0;
  const hasVersion = !!evidence.packageJson?.version;
  const hasName = !!evidence.packageJson?.name;
  const hasStrongFw =
    !!(evidence.frameworks.cli || evidence.frameworks.application || evidence.frameworks.ui);
  const hasDbSignal = evidence.databasePackages.length > 0;
  const isGreenfield = evidence.isGreenfield;

  const questions: Array<Record<string, unknown>> = [];

  if (!hasName || isGreenfield) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: tQuestion('project.name'),
      default: evidence.packageJson?.name,
      validate: (input: string) =>
        input?.trim() ? true : tValidation('project.name.required'),
    });
  }

  questions.push(
    {
      type: 'input',
      name: 'projectDescription',
      message: tQuestion('project.description'),
      default: evidence.packageJson?.description,
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
    }
  );

  if (!hasVersion || isGreenfield) {
    questions.push({
      type: 'input',
      name: 'version',
      message: tQuestion('project.version'),
      default: evidence.packageJson?.version ?? '0.1.0',
      validate: (input: string) => {
        if (!input?.trim()) return tValidation('project.version.required');
        if (!/^\d+\.\d+\.\d+(-.*)?$/.test(input.trim())) {
          return tValidation('project.version.invalid');
        }
        return true;
      },
    });
  }

  if (!hasStrongLanguage || isGreenfield) {
    questions.push({
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
      default: evidence.languages[0] ?? 'TypeScript',
    });
  }

  // Ask framework only when greenfield or weak detection
  if (isGreenfield || !hasStrongFw) {
    questions.push({
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
      when: (answers: Record<string, unknown>) => {
        const lang =
          (answers.language as string | undefined) ?? evidence.languages[0] ?? 'TypeScript';
        return lang === 'TypeScript' || lang === 'JavaScript';
      },
    });
  }

  if (isGreenfield || !hasDbSignal) {
    // For existing projects without DB packages, skip asking — none detected is enough
    if (isGreenfield) {
      questions.push({
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
      });
    }
  }

  questions.push(
    {
      type: 'confirm',
      name: 'useTDD',
      message: tQuestion('preferences.useTDD'),
      default: false, // preference, not invented process
    },
    {
      type: 'confirm',
      name: 'strictMode',
      message: tQuestion('preferences.strictMode'),
      default: true,
      when: (answers: Record<string, unknown>) => {
        const lang =
          (answers.language as string | undefined) ?? evidence.languages[0] ?? 'TypeScript';
        return lang === 'TypeScript';
      },
    }
  );

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

function mapToUserAnswers(
  raw: Record<string, unknown>,
  evidence: EvidenceBag,
  advanced?: AdvancedConfig
): UserAnswers {
  const techConstraints = String(raw.technicalConstraints ?? '');
  const bizConstraints = String(raw.businessConstraints ?? '');

  const answers: UserAnswers = {
    projectName: String(raw.projectName ?? evidence.packageJson?.name ?? 'unnamed'),
    projectDescription: String(raw.projectDescription ?? ''),
    problemImportance: String(raw.problemImportance ?? ''),
    targetUsers: String(raw.targetUsers ?? ''),
    businessGoals: String(raw.businessGoals ?? ''),
    technicalConstraints: isNoneConstraint(techConstraints) ? null : techConstraints,
    businessConstraints: isNoneConstraint(bizConstraints) ? null : bizConstraints,
    nonGoals: String(raw.nonGoals ?? ''),
    useTDD: Boolean(raw.useTDD),
    strictMode: Boolean(raw.strictMode ?? false),
  };

  if (raw.version) {
    answers.version = String(raw.version);
  }
  if (raw.language !== undefined) {
    answers.language = normalizeOptionalStackValue(raw.language as string | null);
  }
  if (raw.framework !== undefined) {
    answers.framework = normalizeOptionalStackValue(raw.framework as string | null);
  }
  if (raw.database !== undefined) {
    answers.database = normalizeOptionalStackValue(raw.database as string | null);
  }

  if (advanced) {
    if (advanced.architecturalStyle) answers.architecturalStyle = advanced.architecturalStyle;
    if (advanced.authenticationMethod) answers.authenticationMethod = advanced.authenticationMethod;
    if (advanced.allowedLibraries) answers.allowedLibraries = advanced.allowedLibraries;
    if (advanced.forbiddenLibraries) answers.forbiddenLibraries = advanced.forbiddenLibraries;
    if (advanced.securityRules) answers.securityRules = advanced.securityRules;
    if (advanced.testStrategy) answers.testStrategy = advanced.testStrategy;
    if (advanced.testCoverage) answers.testCoverage = advanced.testCoverage;
    if (advanced.deploymentMethod) answers.deploymentMethod = advanced.deploymentMethod;
    if (advanced.ciCd) answers.ciCd = advanced.ciCd;
  }

  return answers;
}
