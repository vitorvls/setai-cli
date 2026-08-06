import { readFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { SupportedLocale } from '../utils/i18n.js';
import type { ProjectInfo } from '../types/project-info.js';
import type { ProjectContext } from '../context/types.js';
import type { UserAnswers } from '../context/user-answers.js';
import { compileTemplateData } from '../context/compiler.js';
import { useEvidenceCompiler } from '../context/feature-flags.js';

/**
 * Template Engine — presentation layer only.
 * Facts are resolved before this module runs.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Resolve package root that contains `templates/`.
 * Works for:
 * - bundled CLI: dist/index.js → ../
 * - vitest/source: src/engines/*.ts → ../../
 */
async function resolvePackageRoot(): Promise<string> {
  const candidates = [
    join(__dirname, '..'), // dist/
    join(__dirname, '../..'), // src/engines/
    join(__dirname, '../../..'),
  ];
  for (const root of candidates) {
    try {
      await access(join(root, 'templates'));
      return root;
    } catch {
      // try next
    }
  }
  // Fallback aligned with i18n: dist vs source
  const isDist = __dirname.includes(`${join('dist')}`) || /[/\\]dist$/i.test(__dirname);
  return isDist ? join(__dirname, '..') : join(__dirname, '../..');
}

/**
 * Process template placeholders and conditionals.
 */
export function processTemplate(
  template: string,
  data: Record<string, string | undefined>
): string {
  let result = template;

  let changed = true;
  while (changed) {
    changed = false;
    const ifElsePattern =
      /\{\{#if\s+(\w+)\}\}((?:[^{]|\{(?!\{)|(?:\{\{[^#])|(?:\{\{#if[^}]*\}\}[^}]*\{\{\/if\}\}))*?)\{\{else\}\}((?:[^{]|\{(?!\{)|(?:\{\{[^#])|(?:\{\{#if[^}]*\}\}[^}]*\{\{\/if\}\}))*?)\{\{\/if\}\}/g;
    result = result.replace(ifElsePattern, (_match, key, ifContent, elseContent) => {
      const value = data[key];
      const isEmpty =
        !value ||
        value.trim().length === 0 ||
        value === '[A definir]' ||
        value === '[To be defined]';
      const isTrue = !isEmpty && (value === 'true' || value !== 'false');
      changed = true;
      return isTrue ? ifContent : elseContent;
    });
  }

  const unlessPattern = /\{\{#unless\s+(\w+)\}\}([\s\S]*?)\{\{\/unless\}\}/g;
  result = result.replace(unlessPattern, (_match, key, content) => {
    const value = data[key];
    const isTrue = value === 'true' || (value && value.trim().length > 0 && value !== 'false');
    return !isTrue ? content : '';
  });

  changed = true;
  while (changed) {
    changed = false;
    const conditionalPattern =
      /\{\{#if\s+(\w+)\}\}((?:[^{]|\{(?!\{)|(?:\{\{[^#])|(?:\{\{#if[^}]*\}\}[^}]*\{\{\/if\}\}))*?)\{\{\/if\}\}/g;
    result = result.replace(conditionalPattern, (_match, key, content) => {
      const value = data[key];
      const isEmpty =
        !value ||
        value.trim().length === 0 ||
        value === '[A definir]' ||
        value === '[To be defined]';
      const isTrue = !isEmpty && (value === 'true' || value !== 'false');
      changed = true;
      return isTrue ? content : '';
    });
  }

  for (const [key, value] of Object.entries(data)) {
    const placeholder = `{{${key}}}`;
    const replacement = value && value.trim().length > 0 ? value : '';
    if (!replacement) {
      const emptyLinePattern = new RegExp(
        `^\\s*${placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`,
        'gm'
      );
      result = result.replace(emptyLinePattern, '');
    }
    result = result.replaceAll(placeholder, replacement);
  }

  return result;
}

export async function loadTemplate(
  templatePath: string,
  locale?: SupportedLocale
): Promise<string> {
  const currentLocale = locale || 'en';
  const projectRoot = await resolvePackageRoot();

  const localeMap: Record<string, string> = {
    'pt-BR': '.cursor',
    en: '.cursor.en',
    es: '.cursor.es',
  };

  const templateDir = localeMap[currentLocale] || '.cursor.en';
  let adjustedPath = templatePath;
  if (templatePath.startsWith('.cursor/')) {
    adjustedPath = templatePath.replace('.cursor/', `${templateDir}/`);
  }

  const fullPath = join(projectRoot, 'templates', adjustedPath);

  try {
    return await readFile(fullPath, 'utf-8');
  } catch {
    if (currentLocale !== 'en') {
      const enPath = join(
        projectRoot,
        'templates',
        templatePath.replace('.cursor/', '.cursor.en/')
      );
      return readFile(enPath, 'utf-8');
    }
    throw new Error(`Template not found: ${fullPath}`);
  }
}

export interface ProcessTemplatesOptions {
  projectContext?: ProjectContext;
  userAnswers?: UserAnswers;
}

/**
 * Process all templates into a path → content map.
 * Prefer evidence ProjectContext; never invent stack via helpers.
 */
export async function processAllTemplates(
  projectInfo: ProjectInfo,
  configFolder: string = '.cursor',
  templateLocale: SupportedLocale = 'en',
  options: ProcessTemplatesOptions = {}
): Promise<Map<string, string>> {
  const folder = configFolder;
  const processedTemplates = new Map<string, string>();

  const templateMap = [
    { template: '.cursor/README.md.template', destination: `${folder}/README.md` },
    {
      template: '.cursor/context/project-goals.md.template',
      destination: `${folder}/context/project-goals.md`,
    },
    {
      template: '.cursor/context/tech-stack.md.template',
      destination: `${folder}/context/tech-stack.md`,
    },
    {
      template: '.cursor/context/architecture.md.template',
      destination: `${folder}/context/architecture.md`,
    },
    {
      template: '.cursor/context/deployment.md.template',
      destination: `${folder}/context/deployment.md`,
    },
    {
      template: '.cursor/context/project-structure.md.template',
      destination: `${folder}/context/project-structure.md`,
    },
    {
      template: '.cursor/context/known-issues.md.template',
      destination: `${folder}/context/known-issues.md`,
    },
    {
      template: '.cursor/rules/code-style.md.template',
      destination: `${folder}/rules/code-style.md`,
    },
    {
      template: '.cursor/rules/testing-rules.md.template',
      destination: `${folder}/rules/testing-rules.md`,
    },
    {
      template: '.cursor/rules/git-rules.md.template',
      destination: `${folder}/rules/git-rules.md`,
    },
    {
      template: '.cursor/rules/security-rules.md.template',
      destination: `${folder}/rules/security-rules.md`,
    },
    {
      template: '.cursor/rules/ai-usage-rules.md.template',
      destination: `${folder}/rules/ai-usage-rules.md`,
    },
    {
      template: '.cursor/rules/business-rules.md.template',
      destination: `${folder}/rules/business-rules.md`,
    },
    {
      template: '.cursor/libs/allowed-libs.md.template',
      destination: `${folder}/libs/allowed-libs.md`,
    },
    {
      template: '.cursor/libs/forbidden-libs.md.template',
      destination: `${folder}/libs/forbidden-libs.md`,
    },
    {
      template: '.cursor/libs/ai-providers.md.template',
      destination: `${folder}/libs/ai-providers.md`,
    },
  ];

  let templateData: Record<string, string>;

  if (useEvidenceCompiler() && options.projectContext && options.userAnswers) {
    templateData = compileTemplateData(options.projectContext, options.userAnswers);
  } else if (options.projectContext && options.userAnswers) {
    templateData = compileTemplateData(options.projectContext, options.userAnswers);
  } else {
    // Minimal fallback from ProjectInfo without inventing architecture
    templateData = legacySafeTemplateData(projectInfo);
  }

  for (const { template, destination } of templateMap) {
    try {
      const templateContent = await loadTemplate(template, templateLocale);
      const processed = processTemplate(templateContent, templateData);
      processedTemplates.set(destination, processed);
    } catch (err) {
      // Skip missing optional templates (e.g. during migration)
      if (template.includes('project-structure') || template.includes('known-issues') || template.includes('ai-providers')) {
        continue;
      }
      throw err;
    }
  }

  const commandTemplates = [
    'kickoff-project.md',
    'architecture-review.md',
    'extract-business-rules.md',
    'test-strategy.md',
    'generate-boilerplate.md',
    'refactor-controlled.md',
    'generate-docs.md',
    'review-pr.md',
    'challenge-solution.md',
    'pre-deploy-validation.md',
  ];

  for (const command of commandTemplates) {
    const templatePath = `.cursor/commands/${command}.template`;
    const templateContent = await loadTemplate(templatePath, templateLocale);
    const processed = processTemplate(templateContent, templateData);
    processedTemplates.set(`${folder}/commands/${command}`, processed);
  }

  return processedTemplates;
}

/** Safe minimal data — no infer* inventing REST/JWT/CI */
function legacySafeTemplateData(projectInfo: ProjectInfo): Record<string, string> {
  const language = projectInfo.techStack.language;
  const framework = projectInfo.techStack.framework ?? '';
  const database = projectInfo.techStack.database ?? '';

  return {
    PROJECT_NAME: projectInfo.projectName,
    LANGUAGE: language,
    FRAMEWORK: framework || 'none',
    DATABASE: database || 'none',
    VERSION: projectInfo.version,
    PROJECT_DESCRIPTION: projectInfo.projectDescription,
    PROBLEM_IMPORTANCE: projectInfo.problemImportance,
    TARGET_USERS: projectInfo.targetUsers,
    BUSINESS_GOALS: projectInfo.businessGoals,
    TECHNICAL_CONSTRAINTS: projectInfo.technicalConstraints,
    BUSINESS_CONSTRAINTS: projectInfo.businessConstraints,
    NON_GOALS: projectInfo.nonGoals,
    RUNTIME: language === 'TypeScript' || language === 'JavaScript' ? 'Node.js' : 'none detected',
    MODULE_SYSTEM: 'unknown',
    BUILD_TOOL: 'none',
    TEST_FRAMEWORK: 'none',
    PROJECT_TYPE: 'Unknown',
    PROJECT_TRAITS: 'Unknown',
    ARCHITECTURAL_STYLE: 'Not defined',
    COMMUNICATION_PATTERN: 'Not detected',
    INTERACTION_MODEL: 'Not detected',
    SOURCE_OF_TRUTH: 'Repository and user answers',
    CACHING_STRATEGY: 'Not detected',
    STATE_MANAGEMENT: 'Not detected',
    AUTHENTICATION: 'Not defined',
    AUTHORIZATION: 'Not defined',
    SECURITY_CONSTRAINTS: '- Never commit secrets',
    EXPECTED_SCALE: 'Not defined',
    SCALING_STRATEGY: 'Not defined',
    FAILURE_HANDLING: 'Not defined',
    LOGGING_STRATEGY: 'Not defined',
    MONITORING_METRICS: 'Not defined',
    ALERTS_INCIDENT_HANDLING: 'Not defined',
    AI_ARCHITECTURAL_STYLE: '',
    DATABASE_CLIENT: 'none',
    DEPLOYMENT_PLATFORM: 'Not defined',
    CI_CD_TOOL: 'none detected',
    CI_CD: 'none detected',
    TEST_TOOLS: 'none detected',
    COVERAGE_TOOL: 'none',
    TYPESCRIPT_CONFIG: '',
    ESLINT_CONFIG: '',
    LANGUAGE_TYPESCRIPT: language === 'TypeScript' ? 'true' : 'false',
    FRAMEWORK_EXPRESS: 'false',
    FRAMEWORK_NEXTJS: 'false',
    PROJECT_TYPE_REST_API: 'false',
    STRICT_MODE: projectInfo.preferences?.strictMode ? 'true' : 'false',
    USE_TDD: projectInfo.preferences?.useTDD ? 'true' : 'false',
    ARCHITECTURE_DIAGRAM_HIGH_LEVEL: '',
    ARCHITECTURE_DIAGRAM_COMPONENT: '',
    ARCHITECTURE_TRADE_OFFS: '',
    ARCHITECTURE_LIMITATIONS: '',
    ARCHITECTURAL_DECISIONS: '',
    DESIGN_PATTERNS: '',
    OBSERVED_STRUCTURE: '_Not scanned._',
    PACKAGE_MANAGER: 'none detected',
    CLI_FRAMEWORK: 'none',
    APPLICATION_FRAMEWORK: 'none',
    UI_FRAMEWORK: 'none',
    DOCS_FRAMEWORK: 'none',
    LINTER: 'none',
    FORMATTER: 'none',
    DATABASE_DETECTED: 'false',
    DATABASE_NOTE: 'No database packages detected.',
    HTTP_SERVER: 'none',
    HTTP_DETECTED: 'false',
    SOURCE_IDENTITY: 'user',
    SOURCE_VERSION: 'user',
    PRODUCTION_DEPS_TABLE: '_None._',
    DEV_DEPS_TABLE: '_None._',
    PRODUCTION_DEPS_RAW: '_None._',
    DEV_DEPS_RAW: '_None._',
    SCRIPTS_TABLE: '_None._',
    CI_STATUS: 'absent',
    CI_PROVIDER: 'none',
    TDD_NOTE: 'User preference only.',
    SECURITY_CAPABILITIES: '- secrets\n- filesystem',
    HAS_HTTP: 'false',
    HAS_DATABASE: 'false',
    HAS_EXTERNAL_AI: 'false',
    HAS_CLI: 'false',
    UNKNOWNS: '_None._',
    CONFLICTS: '_None._',
    WARNINGS: '_None._',
    KNOWN_ISSUES: '_None._',
    ALLOWED_LIBRARIES: '_See package.json._',
    FORBIDDEN_LIBRARIES: 'No formal deny-list.',
    AI_PROVIDERS_SECTION: '_None detected._',
    ENGINES: '_Not specified._',
    BIN: '_No bin entry._',
    LICENSE: 'not specified',
    IS_CLI: 'false',
    IS_EXISTING: 'false',
    HAS_AI_SDK: 'false',
    HAS_CICD_ACTIVE: 'false',
    HAS_CICD_COMMENTED: 'false',
    HAS_ARCHITECTURE_STYLE: 'false',
    AI_MODEL_ARCHITECTURE: 'Not specified',
    AI_MODEL_IMPLEMENTATION: 'Not specified',
    AI_MODEL_REFACTORING: 'Not specified',
    AI_MODEL_DEBUG: 'Not specified',
    AI_MODEL_BOILERPLATE: 'Not specified',
    AI_ALLOW_ARCHITECTURE: 'Not specified',
    AI_ALLOW_CODE_GENERATION: 'Not specified',
    AI_ALLOW_REFACTORING: 'Not specified',
    AI_ALLOW_DEBUG: 'Not specified',
    AI_ALLOW_DOCUMENTATION: 'Not specified',
    AI_CUSTOM_CONSTRAINTS: '',
    CTO_RESPONSIBILITY: 'Define policy and limits',
    TECH_LEAD_RESPONSIBILITY: 'Enforce standards and review',
    DEV_RESPONSIBILITY: 'Use AI as a tool, not a shortcut',
    ALLOWED_LIBRARIES_CUSTOM: '',
    FORBIDDEN_LIBRARIES_CUSTOM: '',
    LIBRARY_NOTES: '',
    AUTHENTICATION_METHOD: 'Not defined',
    DATA_PROTECTION: 'Not defined',
    SECURITY_RULES_CUSTOM: '',
    TEST_STRATEGY: '',
    TEST_COVERAGE: 'No coverage minimum enforced.',
    DEPLOYMENT_METHOD: 'Not defined',
    INFRASTRUCTURE: 'Not defined',
    ENVIRONMENTS: 'Not defined',
    DOCUMENTATION_STANDARDS: 'Not defined',
    API_DOCUMENTATION: 'Not applicable',
    CODE_COMMENTS: 'Not defined',
  };
}
