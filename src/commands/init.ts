/**
 * Comando init — evidence-first context compilation.
 */

import { collectIDESelection } from '../engines/ide-selector.js';
import {
  generateFiles,
  checkConfigFolderExists,
  checkWritePermissions,
  generateSetaiConfig,
} from '../engines/file-generator.js';
import { processAllTemplates } from '../engines/template-engine.js';
import { scanProject } from '../scanner/index.js';
import { collectAdaptiveAnswers } from '../questions/adaptive.js';
import { resolveFacts } from '../context/fact-resolver.js';
import { validateUserAnswers } from '../validation/input-validator.js';
import { assertContextValid, validateContext } from '../validation/context-validator.js';
import { assertOutputValid, validateOutputFiles } from '../validation/output-validator.js';
import { scoreContextQuality } from '../validation/quality-score.js';
import { printGenerationReport } from '../reporting/generation-report.js';
import { enhanceWithAI } from '../services/ai-service.js';
import { info, success, gray, error, warning } from '../utils/output.js';
import { tMessage, setLocale } from '../utils/i18n.js';
import { getLanguageConfig, saveLanguageConfig } from '../config/config-manager.js';
import type { ProjectInfo } from '../types/project-info.js';
import type { UserAnswers } from '../context/user-answers.js';
import { cwd } from 'process';
import inquirer from 'inquirer';

export async function initCommand(
  advanced: boolean = false,
  beta: boolean = false,
  langOverride?: string
): Promise<void> {
  try {
    const baseDir = cwd();

    const langConfig = getLanguageConfig();
    const questionLocale = (langOverride as 'pt-BR' | 'en' | 'es') || langConfig.questions || 'pt-BR';
    const filesLocale = 'en' as const;

    if (langOverride) {
      await saveLanguageConfig({
        questions: questionLocale,
        files: filesLocale,
      });
    }

    await setLocale(questionLocale);

    info(tMessage('init.starting'), true);

    const hasPermissions = await checkWritePermissions(baseDir);
    if (!hasPermissions) {
      error(tMessage('init.noWritePermission'), true);
      process.exit(1);
      return;
    }

    const ideConfig = await collectIDESelection();
    const configFolder = ideConfig.configFolder;

    info(tMessage('init.configFolder', { folder: configFolder }), true);

    const configExists = await checkConfigFolderExists(baseDir, configFolder);
    if (configExists) {
      info(tMessage('init.configExists', { folder: configFolder }), true);
      const answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: tMessage('init.overwrite'),
          default: false,
        },
      ]);

      if (!answer.overwrite) {
        info(tMessage('init.operationCancelled', { folder: configFolder }), true);
        process.exit(0);
      }
      info('');
    }

    if (beta) {
      warning(tMessage('init.beta.warning'), true);
      warning(tMessage('init.beta.keys'), true);
    }

    // 1. Scan repository (deterministic, offline)
    info('Scanning project for evidence...', true);
    const evidence = await scanProject(baseDir);

    // 2. Adaptive questions (gaps + business intent)
    const { answers, advancedConfig } = await collectAdaptiveAnswers(evidence, advanced);
    answers.ideConfig = {
      ide: ideConfig.ide,
      configFolder: ideConfig.configFolder,
    };

    validateUserAnswers(answers);

    success(tMessage('init.infoCollected'), true);
    gray(tMessage('init.info.project', { name: answers.projectName }), true);
    gray(
      tMessage('init.info.version', {
        version: answers.version ?? evidence.packageJson?.version ?? 'n/a',
      }),
      true
    );
    gray(
      tMessage('init.info.language', {
        language: answers.language ?? evidence.languages[0] ?? 'detected/unknown',
      }),
      true
    );
    gray(tMessage('init.info.ide', { ide: ideConfig.name }), true);
    gray(tMessage('init.info.folder', { folder: configFolder }), true);

    // 3. Optional AI — prose/recommendations only
    if (beta) {
      info(tMessage('init.ai.enriching'), true);
      try {
        const projectInfo = userAnswersToProjectInfo(answers, advancedConfig);
        const enhanced = await enhanceWithAI(projectInfo);
        const prose: NonNullable<UserAnswers['aiProse']> = {};
        if (enhanced.enhancedDescription) prose.enhancedDescription = enhanced.enhancedDescription;
        if (enhanced.problemImportance) prose.problemImportance = enhanced.problemImportance;
        if (enhanced.businessGoals) prose.businessGoals = enhanced.businessGoals;
        if (Object.keys(prose).length > 0) {
          answers.aiProse = prose;
        }
        if (enhanced.recommendations?.length) {
          answers.aiRecommendations = enhanced.recommendations;
        }
        success(tMessage('init.ai.success'), true);
      } catch (err) {
        warning(tMessage('init.ai.error'), true);
        if (err instanceof Error) {
          gray(tMessage('init.ai.errorDetails', { message: err.message }), true);
        }
      }
    }

    // 4. Resolve facts
    const ctx = resolveFacts(evidence, answers);
    assertContextValid(ctx);

    // 5. Compile templates (presentation only)
    await setLocale(filesLocale);
    info(tMessage('init.processing'), true);

    const projectInfo = userAnswersToProjectInfo(answers, advancedConfig);
    projectInfo.ideConfig = answers.ideConfig;

    const processedTemplates = await processAllTemplates(
      projectInfo,
      configFolder,
      filesLocale,
      { projectContext: ctx, userAnswers: answers }
    );

    // 6. Output validation
    const outputIssues = validateOutputFiles(processedTemplates, evidence);
    assertOutputValid(processedTemplates, evidence);

    const quality = scoreContextQuality(ctx, [
      ...validateContext(ctx),
      ...outputIssues,
    ]);

    // 7. Write
    info(tMessage('init.generating'), true);
    await generateFiles(baseDir, processedTemplates);
    await generateSetaiConfig(baseDir, configFolder);

    printGenerationReport(ctx, evidence, quality, configFolder);

    success(tMessage('init.success', { folder: configFolder }), true);
    gray(tMessage('init.nextSteps'), true);
    gray(tMessage('init.nextSteps.review', { folder: configFolder }), true);
    gray(tMessage('init.nextSteps.fill'), true);
    gray(tMessage('init.nextSteps.config', { folder: configFolder }), true);
  } catch (err) {
    error(tMessage('init.error'), true);
    if (err instanceof Error) {
      error(err.message);
    }
    process.exit(1);
  }
}

function userAnswersToProjectInfo(
  answers: UserAnswers,
  advancedConfig?: ProjectInfo['advanced']
): ProjectInfo {
  const info: ProjectInfo = {
    projectName: answers.projectName,
    projectDescription: answers.projectDescription,
    problemImportance: answers.problemImportance,
    targetUsers: answers.targetUsers,
    businessGoals: answers.businessGoals,
    technicalConstraints: answers.technicalConstraints ?? 'None',
    businessConstraints: answers.businessConstraints ?? 'None',
    nonGoals: answers.nonGoals,
    version: answers.version ?? '0.0.0',
    techStack: {
      language: answers.language ?? 'TypeScript',
      ...(answers.framework ? { framework: answers.framework } : {}),
      ...(answers.database ? { database: answers.database } : {}),
    },
    preferences: {
      useTDD: answers.useTDD,
      strictMode: answers.strictMode,
    },
  };
  if (advancedConfig) {
    info.advanced = advancedConfig;
  }
  if (answers.ideConfig) {
    info.ideConfig = answers.ideConfig;
  }
  return info;
}
