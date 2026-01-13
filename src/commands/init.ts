/**
 * Comando init - Inicia a geração da estrutura .cursor
 */

import { collectProjectInfo } from '../engines/question-engine.js';
import { validateProjectInfo } from '../engines/validator.js';
import { processAllTemplates } from '../engines/template-engine.js';
import {
  generateFiles,
  checkConfigFolderExists,
  checkWritePermissions,
  generateSetaiConfig,
} from '../engines/file-generator.js';
import { collectIDESelection } from '../engines/ide-selector.js';
import { enhanceWithAI } from '../services/ai-service.js';
import { info, success, gray, error, warning } from '../utils/output.js';
import { tMessage, setLocale } from '../utils/i18n.js';
import { getLanguageConfig, saveLanguageConfig } from '../config/config-manager.js';
import { cwd } from 'process';
import inquirer from 'inquirer';

export async function initCommand(
  advanced: boolean = false,
  beta: boolean = false,
  langOverride?: string
): Promise<void> {
  try {
    const baseDir = cwd();

    // Carrega configuração de idioma (ou usa override)
    const langConfig = getLanguageConfig();
    const questionLocale = (langOverride as 'pt-BR' | 'en' | 'es') || langConfig.questions || 'pt-BR';
    // Arquivos gerados sempre em inglês
    const filesLocale = 'en' as const;
    
    // Salva idioma se foi passado via flag
    if (langOverride) {
      await saveLanguageConfig({
        questions: questionLocale,
        files: filesLocale,
      });
    }
    
    await setLocale(questionLocale);

    info(tMessage('init.starting'), true);

    // Verificar permissões
    const hasPermissions = await checkWritePermissions(baseDir);
    if (!hasPermissions) {
      error(tMessage('init.noWritePermission'), true);
      process.exit(1);
    }

    // 0. Selecionar IDE e pasta de configuração
    const ideConfig = await collectIDESelection();
    const configFolder = ideConfig.configFolder;

    info(tMessage('init.configFolder', { folder: configFolder }), true);

    // Verificar se pasta de configuração já existe
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
      info(''); // Linha em branco após confirmação
    }

    // Aviso sobre --beta
    if (beta) {
      warning(tMessage('init.beta.warning'), true);
      warning(tMessage('init.beta.keys'), true);
    }

    // 1. Question Engine - coletar informações
    const projectInfo = await collectProjectInfo(advanced);
    projectInfo.ideConfig = {
      ide: ideConfig.ide,
      configFolder: ideConfig.configFolder,
    };

    // 2. Validator - validar inputs
    validateProjectInfo(projectInfo);

    success(tMessage('init.infoCollected'), true);
    gray(tMessage('init.info.project', { name: projectInfo.projectName }), true);
    gray(tMessage('init.info.version', { version: projectInfo.version }), true);
    gray(tMessage('init.info.language', { language: projectInfo.techStack.language }), true);
    gray(tMessage('init.info.ide', { ide: ideConfig.name }), true);
    gray(tMessage('init.info.folder', { folder: configFolder }), true);

    // 2.5. AI Service - enriquecer com IA (apenas se --beta)
    if (beta) {
      info(tMessage('init.ai.enriching'), true);
      try {
        const enhancedInfo = await enhanceWithAI(projectInfo);
        projectInfo.aiGenerated = enhancedInfo;
        success(tMessage('init.ai.success'), true);
      } catch (err) {
        warning(tMessage('init.ai.error'), true);
        if (err instanceof Error) {
          gray(tMessage('init.ai.errorDetails', { message: err.message }), true);
        }
      }
    }

    // 3. Template Engine - processar templates
    // Usa idioma dos arquivos, não das perguntas
    await setLocale(filesLocale);
    
    info(tMessage('init.processing'), true);
    const processedTemplates = await processAllTemplates(projectInfo, configFolder, filesLocale);

    // 4. File Generator - criar arquivos
    info(tMessage('init.generating'), true);
    await generateFiles(baseDir, processedTemplates);

    // 5. Criar pasta .setai com configurações do CLI
    await generateSetaiConfig(baseDir, configFolder);

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
