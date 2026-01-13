import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getLocale, type SupportedLocale } from '../utils/i18n.js';
import type { AIGeneratedContent } from '../services/ai-service.js';
import * as templateHelpers from './template-helpers.js';

/**
 * Template Engine - Processa templates e preenche com dados coletados
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Processa um template substituindo placeholders {{KEY}} pelos valores em data
 */
export function processTemplate(
  template: string,
  data: Record<string, string | undefined>
): string {
  let result = template;

  // Processa blocos {{#if KEY}}...{{else}}...{{/if}}
  // Usa uma abordagem mais robusta para lidar com blocos aninhados
  // Processa de dentro para fora, removendo blocos aninhados primeiro
  let changed = true;
  while (changed) {
    changed = false;
    const ifElsePattern = /\{\{#if\s+(\w+)\}\}((?:[^{]|\{(?!\{)|(?:\{\{[^#])|(?:\{\{#if[^}]*\}\}[^}]*\{\{\/if\}\}))*?)\{\{else\}\}((?:[^{]|\{(?!\{)|(?:\{\{[^#])|(?:\{\{#if[^}]*\}\}[^}]*\{\{\/if\}\}))*?)\{\{\/if\}\}/g;
    result = result.replace(ifElsePattern, (_match, key, ifContent, elseContent) => {
      const value = data[key];
      // Verifica se o valor é "true" (string) ou se existe e não está vazio (e não é placeholder genérico)
      const isEmpty = !value || value.trim().length === 0 || value === '[A definir]' || value === '[To be defined]';
      const isTrue = !isEmpty && (value === 'true' || value !== 'false');
      changed = true;
      if (isTrue) {
        // Remove marcadores e retorna conteúdo do if
        return ifContent;
      } else {
        // Remove marcadores e retorna conteúdo do else
        return elseContent;
      }
    });
  }

  // Processa blocos {{#unless KEY}}...{{/unless}} (inverso do if)
  const unlessPattern = /\{\{#unless\s+(\w+)\}\}([\s\S]*?)\{\{\/unless\}\}/g;
  result = result.replace(unlessPattern, (_match, key, content) => {
    const value = data[key];
    // Verifica se o valor é "true" (string) ou se existe e não está vazio
    const isTrue = value === 'true' || (value && value.trim().length > 0 && value !== 'false');
    if (!isTrue) {
      // Remove marcadores e retorna conteúdo
      return content;
    }
    // Remove o bloco inteiro se a condição for verdadeira
    return '';
  });

  // Processa blocos {{#if KEY}}...{{/if}} simples (sem else)
  // Processa múltiplas vezes para lidar com blocos aninhados
  changed = true;
  while (changed) {
    changed = false;
    const conditionalPattern = /\{\{#if\s+(\w+)\}\}((?:[^{]|\{(?!\{)|(?:\{\{[^#])|(?:\{\{#if[^}]*\}\}[^}]*\{\{\/if\}\}))*?)\{\{\/if\}\}/g;
    result = result.replace(conditionalPattern, (_match, key, content) => {
      const value = data[key];
      // Verifica se o valor é "true" (string) ou se existe e não está vazio (e não é placeholder genérico)
      const isEmpty = !value || value.trim().length === 0 || value === '[A definir]' || value === '[To be defined]';
      const isTrue = !isEmpty && (value === 'true' || value !== 'false');
      changed = true;
      if (isTrue) {
        // Remove os marcadores {{#if}} e {{/if}}, mantém o conteúdo
        return content;
      }
      // Remove o bloco inteiro se vazio
      return '';
    });
  }

  // Substitui todos os placeholders {{KEY}} pelos valores
  for (const [key, value] of Object.entries(data)) {
    const placeholder = `{{${key}}}`;
    // Se o valor estiver vazio, remove linhas que contêm apenas o placeholder
    if (!value || value.trim().length === 0) {
      // Remove linhas que contêm apenas o placeholder (com espaços opcionais)
      const emptyLinePattern = new RegExp(`^\\s*${placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'gm');
      result = result.replace(emptyLinePattern, '');
    }
    const replacement = value && value.trim().length > 0 ? value : placeholder;
    result = result.replaceAll(placeholder, replacement);
  }

  return result;
}

/**
 * Carrega um template do diretório templates/
 * Tenta carregar a versão traduzida primeiro, depois fallback para pt-BR
 */
export async function loadTemplate(templatePath: string, locale?: SupportedLocale): Promise<string> {
  // Calcula caminho relativo ao diretório do projeto
  // Se estiver em dist/, volta 2 níveis; se estiver em src/, volta 1 nível
  const isDist = __dirname.includes('dist');
  const projectRoot = isDist ? join(__dirname, '../') : join(__dirname, '../../');
  
  // Usa o locale atual se não fornecido
  const currentLocale = locale || getLocale();
  
  // Tenta carregar template traduzido primeiro
  // Estrutura: templates/.cursor.en/ ou templates/.cursor.es/
  // Se não encontrar, usa templates/.cursor/ (pt-BR padrão)
  const localeSuffix = currentLocale === 'pt-BR' ? '' : `.${currentLocale}`;
  
  // Substitui .cursor/ por .cursor.en/ ou .cursor.es/ se necessário
  let localizedPath = templatePath;
  if (localeSuffix && templatePath.startsWith('.cursor/')) {
    localizedPath = templatePath.replace('.cursor/', `.cursor${localeSuffix}/`);
  }
  
  const fullPath = join(projectRoot, 'templates', localizedPath);

  try {
    const content = await readFile(fullPath, 'utf-8');
    return content;
  } catch (error) {
    // Se não encontrar template traduzido, tenta pt-BR como fallback
    if (currentLocale !== 'pt-BR') {
      const fallbackPath = join(projectRoot, 'templates', templatePath);
      try {
        const content = await readFile(fallbackPath, 'utf-8');
        return content;
      } catch {
        throw new Error(
          `Erro ao carregar template ${templatePath} (tentou ${localizedPath} e fallback): ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    throw new Error(
      `Erro ao carregar template ${templatePath}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Processa todos os templates necessários para gerar estrutura .cursor
 */
interface ProcessAllTemplatesParams {
  projectName: string;
  projectDescription: string;
  problemImportance: string;
  targetUsers: string;
  businessGoals: string;
  technicalConstraints: string;
  businessConstraints: string;
  nonGoals: string;
  version: string;
  techStack: { language: string; framework?: string | undefined; database?: string | undefined };
  advanced?: {
    selectedGroups?: string[];
    preferredAIModels?: {
      architecture?: string;
      implementation?: string;
      refactoring?: string;
      debug?: string;
      boilerplate?: string;
    };
    aiUsageRules?: {
      allowArchitecturePlanning?: boolean;
      allowCodeGeneration?: boolean;
      allowRefactoring?: boolean;
      allowDebug?: boolean;
      allowDocumentation?: boolean;
    };
    responsibilities?: {
      cto?: string;
      techLead?: string;
      dev?: string;
    };
    customConstraints?: string;
    allowedLibraries?: string[];
    forbiddenLibraries?: string[];
    libraryNotes?: string;
    architecturalStyle?: string;
    architecturalDecisions?: string[];
    designPatterns?: string[];
    authenticationMethod?: string;
    dataProtection?: string;
    securityRules?: string[];
    testStrategy?: string;
    testCoverage?: string;
    testTools?: string[];
    deploymentMethod?: string;
    infrastructure?: string;
    ciCd?: string;
    environments?: string;
    documentationStandards?: string;
    apiDocumentation?: string;
    codeComments?: string;
  };
  aiGenerated?: AIGeneratedContent;
}

export async function processAllTemplates(
  projectInfo: ProcessAllTemplatesParams,
  configFolder: string = '.cursor',
  locale?: SupportedLocale
): Promise<Map<string, string>> {
  const folder = configFolder ?? '.cursor';
  const processedTemplates = new Map<string, string>();
  const templateLocale = locale || getLocale();

  // Mapeia templates para seus caminhos de destino
  const templateMap: Array<{ template: string; destination: string }> = [
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
      template: '.cursor/rules/code-style.md.template',
      destination: `${folder}/rules/code-style.md`,
    },
    {
      template: '.cursor/rules/testing-rules.md.template',
      destination: `${folder}/rules/testing-rules.md`,
    },
    { template: '.cursor/rules/git-rules.md.template', destination: `${folder}/rules/git-rules.md` },
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
    { template: '.cursor/libs/ai-models.md.template', destination: `${folder}/libs/ai-models.md` },
  ];

  // Prepara dados para substituição
  // Formata TARGET_USERS como lista se não estiver formatado
  const formatTargetUsers = (users: string): string => {
    // Se já está formatado como lista (contém "-" ou "*"), retorna como está
    if (users.includes('-') || users.includes('*')) {
      return users;
    }
    // Caso contrário, formata como lista
    return users
      .split(',')
      .map((user) => user.trim())
      .filter((user) => user.length > 0)
      .map((user) => `- ${user}`)
      .join('\n');
  };

  // Prepara dados básicos para substituição
  // Usa dados da IA se disponíveis, senão usa dados do usuário
  // Infere valores inteligentes quando dados não estão disponíveis
  
  // Inferências básicas do stack
  const language = projectInfo.techStack.language;
  const framework = projectInfo.techStack.framework ?? '';
  const database = projectInfo.techStack.database ?? '';
  const projectType = templateHelpers.inferProjectType(framework, projectInfo.projectDescription);
  const useTDD = projectInfo.preferences?.useTDD ?? false;
  const strictMode = projectInfo.preferences?.strictMode ?? false;
  
  const templateData: Record<string, string> = {
    PROJECT_NAME: projectInfo.projectName,
    LANGUAGE: language,
    FRAMEWORK: framework || 'Nenhum',
    DATABASE: database || 'Nenhum',
    VERSION: projectInfo.version,
    PROJECT_DESCRIPTION: projectInfo.aiGenerated?.enhancedDescription ?? projectInfo.projectDescription,
    PROBLEM_IMPORTANCE: projectInfo.aiGenerated?.problemImportance ?? projectInfo.problemImportance,
    TARGET_USERS: formatTargetUsers(projectInfo.targetUsers),
    BUSINESS_GOALS: projectInfo.aiGenerated?.businessGoals 
      ? projectInfo.aiGenerated.businessGoals.map((g) => `- ${g}`).join('\n')
      : projectInfo.businessGoals,
    TECHNICAL_CONSTRAINTS: projectInfo.technicalConstraints,
    BUSINESS_CONSTRAINTS: projectInfo.businessConstraints,
    NON_GOALS: projectInfo.nonGoals,
    
    // Inferências inteligentes do stack
    RUNTIME: templateHelpers.inferRuntime(language),
    MODULE_SYSTEM: templateHelpers.inferModuleSystem(language),
    BUILD_TOOL: templateHelpers.inferBuildTool(language, framework),
    TEST_FRAMEWORK: templateHelpers.inferTestFramework(language, useTDD),
    PROJECT_TYPE: projectType,
    ARCHITECTURAL_STYLE: projectInfo.advanced?.architecturalStyle ?? templateHelpers.inferArchitecturalStyle(framework) ?? 'Layered Architecture (recommended for REST APIs)',
    
    // Campos da IA para preencher "[A definir]" no architecture.md
    // Usa inferências inteligentes como fallback
    COMMUNICATION_PATTERN: projectInfo.aiGenerated?.communicationPattern ?? templateHelpers.inferCommunicationPattern(projectType),
    INTERACTION_MODEL: projectInfo.aiGenerated?.interactionModel ?? templateHelpers.inferInteractionModel(projectType),
    SOURCE_OF_TRUTH: projectInfo.aiGenerated?.sourceOfTruth ?? templateHelpers.inferSourceOfTruth(projectType, database),
    CACHING_STRATEGY: projectInfo.aiGenerated?.cachingStrategy ?? templateHelpers.inferCachingStrategy(projectType, database),
    STATE_MANAGEMENT: projectInfo.aiGenerated?.stateManagement ?? templateHelpers.inferStateManagement(projectType),
    AUTHENTICATION: projectInfo.aiGenerated?.authentication ?? projectInfo.advanced?.authenticationMethod ?? templateHelpers.inferAuthMethod(projectType),
    AUTHORIZATION: projectInfo.aiGenerated?.authorization ?? templateHelpers.inferAuthorization(projectType),
    SECURITY_CONSTRAINTS: projectInfo.aiGenerated?.securityConstraints ?? projectInfo.advanced?.securityRules?.join('\n') ?? templateHelpers.generateSecurityPatterns(projectType),
    EXPECTED_SCALE: projectInfo.aiGenerated?.expectedScale ?? templateHelpers.inferExpectedScale(projectType),
    SCALING_STRATEGY: projectInfo.aiGenerated?.scalingStrategy ?? templateHelpers.inferScalingStrategy(projectType, framework),
    FAILURE_HANDLING: projectInfo.aiGenerated?.failureHandling ?? templateHelpers.inferFailureHandling(projectType),
    LOGGING_STRATEGY: projectInfo.aiGenerated?.loggingStrategy ?? templateHelpers.inferLoggingStrategy(projectType, framework),
    MONITORING_METRICS: projectInfo.aiGenerated?.monitoringMetrics ?? templateHelpers.inferMonitoringMetrics(projectType),
    ALERTS_INCIDENT_HANDLING: projectInfo.aiGenerated?.alertsIncidentHandling ?? templateHelpers.inferAlertsIncidentHandling(projectType),
    AI_ARCHITECTURAL_STYLE: projectInfo.aiGenerated?.architecturalStyle ?? projectInfo.advanced?.architecturalStyle ?? templateHelpers.inferArchitecturalStyle(framework),
    
    // Novas variáveis de inferência
    DATABASE_CLIENT: templateHelpers.inferDatabaseClient(database),
    DEPLOYMENT_PLATFORM: templateHelpers.inferDeploymentPlatform(framework),
    CI_CD_TOOL: templateHelpers.inferCICDTool(),
    TEST_TOOLS: templateHelpers.generateTestToolsList(language, framework, database),
    COVERAGE_TOOL: templateHelpers.inferCoverageTool(templateHelpers.inferTestFramework(language, useTDD)),
    TYPESCRIPT_CONFIG: language === 'TypeScript' ? templateHelpers.generateTypeScriptConfig(strictMode) : '[Not applicable]',
    ESLINT_CONFIG: templateHelpers.generateESLintConfig(language, framework),
    
    // Flags condicionais para templates
    LANGUAGE_TYPESCRIPT: language === 'TypeScript' ? 'true' : 'false',
    FRAMEWORK_EXPRESS: framework === 'Express' ? 'true' : 'false',
    FRAMEWORK_NEXTJS: framework === 'Next.js' ? 'true' : 'false',
    PROJECT_TYPE_REST_API: projectType === 'REST API' ? 'true' : 'false',
    STRICT_MODE: strictMode ? 'true' : 'false',
    USE_TDD: useTDD ? 'true' : 'false',
    // Diagramas e trade-offs da IA
    ARCHITECTURE_DIAGRAM_HIGH_LEVEL: projectInfo.aiGenerated?.architectureDiagrams?.highLevelFlow ?? '', // Vazio para usar bloco {{else}} no template
    ARCHITECTURE_DIAGRAM_COMPONENT: projectInfo.aiGenerated?.architectureDiagrams?.componentInteraction ?? '', // Vazio para usar bloco {{else}} no template
    ARCHITECTURE_TRADE_OFFS: projectInfo.aiGenerated?.tradeOffs && projectInfo.aiGenerated.tradeOffs.length > 0
      ? projectInfo.aiGenerated.tradeOffs.map((to) => {
          if (to.decision && to.alternative && to.chosen && to.sacrificed) {
            return `- **${to.decision} over ${to.alternative}:**\n  - **Chosen:** ${to.chosen}\n  - **Sacrificed:** ${to.sacrificed}`;
          }
          return '';
        }).filter(Boolean).join('\n\n')
      : '', // Vazio para usar bloco {{else}} no template
    ARCHITECTURE_LIMITATIONS: projectInfo.aiGenerated?.limitations && projectInfo.aiGenerated.limitations.length > 0
      ? projectInfo.aiGenerated.limitations.map((lim) => `- ${lim}`).join('\n')
      : '', // Vazio para usar bloco {{else}} no template
  };

  // Adiciona dados avançados se disponíveis
  if (projectInfo.advanced) {
    // Grupo 1: AI Usage Rules
    if (projectInfo.advanced.preferredAIModels) {
      templateData.AI_MODEL_ARCHITECTURE =
        projectInfo.advanced.preferredAIModels.architecture ?? 'Não especificado';
      templateData.AI_MODEL_IMPLEMENTATION =
        projectInfo.advanced.preferredAIModels.implementation ?? 'Não especificado';
      templateData.AI_MODEL_REFACTORING =
        projectInfo.advanced.preferredAIModels.refactoring ?? 'Não especificado';
      templateData.AI_MODEL_DEBUG = projectInfo.advanced.preferredAIModels.debug ?? 'Não especificado';
      templateData.AI_MODEL_BOILERPLATE =
        projectInfo.advanced.preferredAIModels.boilerplate ?? 'Não especificado';
    }

    if (projectInfo.advanced.aiUsageRules) {
      templateData.AI_ALLOW_ARCHITECTURE = projectInfo.advanced.aiUsageRules.allowArchitecturePlanning
        ? 'Sim'
        : 'Não';
      templateData.AI_ALLOW_CODE_GENERATION = projectInfo.advanced.aiUsageRules.allowCodeGeneration
        ? 'Sim'
        : 'Não';
      templateData.AI_ALLOW_REFACTORING = projectInfo.advanced.aiUsageRules.allowRefactoring ? 'Sim' : 'Não';
      templateData.AI_ALLOW_DEBUG = projectInfo.advanced.aiUsageRules.allowDebug ? 'Sim' : 'Não';
      templateData.AI_ALLOW_DOCUMENTATION = projectInfo.advanced.aiUsageRules.allowDocumentation
        ? 'Sim'
        : 'Não';
    }

    templateData.AI_CUSTOM_CONSTRAINTS = projectInfo.advanced.customConstraints ?? '';

    // Grupo 2: Responsabilidades
    if (projectInfo.advanced.responsibilities) {
      templateData.CTO_RESPONSIBILITY = projectInfo.advanced.responsibilities.cto ?? 'Define política e limites';
      templateData.TECH_LEAD_RESPONSIBILITY =
        projectInfo.advanced.responsibilities.techLead ?? 'Garante padrões e revisão';
      templateData.DEV_RESPONSIBILITY =
        projectInfo.advanced.responsibilities.dev ?? 'Usa IA como ferramenta, não como atalho';
    }

    // Grupo 3: Bibliotecas
    if (projectInfo.advanced.allowedLibraries && projectInfo.advanced.allowedLibraries.length > 0) {
      templateData.ALLOWED_LIBRARIES_CUSTOM = projectInfo.advanced.allowedLibraries
        .map((lib) => `- ${lib}`)
        .join('\n');
    } else {
      templateData.ALLOWED_LIBRARIES_CUSTOM = '';
    }

    if (projectInfo.advanced.forbiddenLibraries && projectInfo.advanced.forbiddenLibraries.length > 0) {
      templateData.FORBIDDEN_LIBRARIES_CUSTOM = projectInfo.advanced.forbiddenLibraries
        .map((lib) => `- ${lib}`)
        .join('\n');
    } else {
      templateData.FORBIDDEN_LIBRARIES_CUSTOM = '';
    }

    templateData.LIBRARY_NOTES = projectInfo.advanced.libraryNotes ?? '';

    // Grupo 4: Arquitetura
    // Usa dados da IA se disponíveis, senão usa dados avançados, senão '[A definir]'
    templateData.ARCHITECTURAL_STYLE = projectInfo.advanced.architecturalStyle 
      ?? projectInfo.aiGenerated?.architecturalStyle 
      ?? '[A definir]';
    
    if (projectInfo.advanced.architecturalDecisions && projectInfo.advanced.architecturalDecisions.length > 0) {
      templateData.ARCHITECTURAL_DECISIONS = projectInfo.advanced.architecturalDecisions
        .map((dec) => `- ${dec}`)
        .join('\n');
    } else if (projectInfo.aiGenerated?.architectureDecisions && projectInfo.aiGenerated.architectureDecisions.length > 0) {
      templateData.ARCHITECTURAL_DECISIONS = projectInfo.aiGenerated.architectureDecisions
        .map((dec) => `- ${dec}`)
        .join('\n');
    } else {
      templateData.ARCHITECTURAL_DECISIONS = ''; // Vazio para usar bloco {{else}} no template
    }

    if (projectInfo.advanced.designPatterns && projectInfo.advanced.designPatterns.length > 0) {
      templateData.DESIGN_PATTERNS = projectInfo.advanced.designPatterns.map((pattern) => `- ${pattern}`).join('\n');
    } else if (projectInfo.aiGenerated?.designPatterns && projectInfo.aiGenerated.designPatterns.length > 0) {
      templateData.DESIGN_PATTERNS = projectInfo.aiGenerated.designPatterns.map((pattern: string) => `- ${pattern}`).join('\n');
    } else if (projectInfo.aiGenerated?.bestPractices && projectInfo.aiGenerated.bestPractices.length > 0) {
      // Usa bestPractices da IA como design patterns se não houver design patterns específicos
      templateData.DESIGN_PATTERNS = projectInfo.aiGenerated.bestPractices.map((practice) => `- ${practice}`).join('\n');
    } else {
      templateData.DESIGN_PATTERNS = ''; // Vazio para usar bloco {{else}} no template
    }

    // Grupo 5: Segurança
    templateData.AUTHENTICATION_METHOD = projectInfo.advanced.authenticationMethod 
      ?? projectInfo.aiGenerated?.authentication 
      ?? '[A definir]';
    templateData.DATA_PROTECTION = projectInfo.advanced.dataProtection ?? '[A definir]';
    if (projectInfo.advanced.securityRules && projectInfo.advanced.securityRules.length > 0) {
      templateData.SECURITY_RULES_CUSTOM = projectInfo.advanced.securityRules
        .map((rule) => `- ${rule}`)
        .join('\n');
    } else {
      templateData.SECURITY_RULES_CUSTOM = '';
    }

    // Grupo 6: Testes
    templateData.TEST_STRATEGY = projectInfo.advanced.testStrategy ?? '';
    templateData.TEST_COVERAGE = projectInfo.advanced.testCoverage ?? '';
    if (projectInfo.advanced.testTools && projectInfo.advanced.testTools.length > 0) {
      templateData.TEST_TOOLS = projectInfo.advanced.testTools.map((tool) => `- ${tool}`).join('\n');
    } else {
      templateData.TEST_TOOLS = '';
    }

    // Grupo 7: Deploy
    templateData.DEPLOYMENT_METHOD = projectInfo.advanced.deploymentMethod ?? '[A definir]';
    templateData.INFRASTRUCTURE = projectInfo.advanced.infrastructure ?? '[A definir]';
    templateData.CI_CD = projectInfo.advanced.ciCd ?? '[A definir]';
    templateData.ENVIRONMENTS = projectInfo.advanced.environments ?? '[A definir]';

    // Grupo 8: Documentação
    templateData.DOCUMENTATION_STANDARDS = projectInfo.advanced.documentationStandards ?? '[A definir]';
    templateData.API_DOCUMENTATION = projectInfo.advanced.apiDocumentation ?? '[A definir]';
    templateData.CODE_COMMENTS = projectInfo.advanced.codeComments ?? '[A definir]';
  } else {
    // Valores padrão quando não há dados avançados
    templateData.AI_MODEL_ARCHITECTURE = 'Claude 4.5 Opus';
    templateData.AI_MODEL_IMPLEMENTATION = 'Cursor Composer + GPT-5.1 Codex';
    templateData.AI_MODEL_REFACTORING = 'Claude 4.5 Sonnet';
    templateData.AI_MODEL_DEBUG = 'Gemini 3 Pro';
    templateData.AI_MODEL_BOILERPLATE = 'Gemini 3 Flash';
    templateData.AI_ALLOW_ARCHITECTURE = 'Sim';
    templateData.AI_ALLOW_CODE_GENERATION = 'Sim';
    templateData.AI_ALLOW_REFACTORING = 'Sim';
    templateData.AI_ALLOW_DEBUG = 'Sim';
    templateData.AI_ALLOW_DOCUMENTATION = 'Sim';
    templateData.AI_CUSTOM_CONSTRAINTS = '';
    templateData.CTO_RESPONSIBILITY = 'Define política e limites';
    templateData.TECH_LEAD_RESPONSIBILITY = 'Garante padrões e revisão';
    templateData.DEV_RESPONSIBILITY = 'Usa IA como ferramenta, não como atalho';
    templateData.ALLOWED_LIBRARIES_CUSTOM = '';
    templateData.FORBIDDEN_LIBRARIES_CUSTOM = '';
    templateData.LIBRARY_NOTES = '';
    templateData.ARCHITECTURAL_STYLE = projectInfo.aiGenerated?.architecturalStyle ?? templateHelpers.inferArchitecturalStyle(framework) ?? 'Layered Architecture (recommended for REST APIs)';
    // Usa dados da IA se disponíveis para preencher campos "[A definir]"
    if (projectInfo.aiGenerated?.architectureDecisions && projectInfo.aiGenerated.architectureDecisions.length > 0) {
      templateData.ARCHITECTURAL_DECISIONS = projectInfo.aiGenerated.architectureDecisions
        .map((dec) => `- ${dec}`)
        .join('\n');
    } else {
      templateData.ARCHITECTURAL_DECISIONS = ''; // Vazio para usar bloco {{else}} no template
    }
    
    if (projectInfo.aiGenerated?.designPatterns && projectInfo.aiGenerated.designPatterns.length > 0) {
      templateData.DESIGN_PATTERNS = projectInfo.aiGenerated.designPatterns.map((pattern: string) => `- ${pattern}`).join('\n');
    } else if (projectInfo.aiGenerated?.bestPractices && projectInfo.aiGenerated.bestPractices.length > 0) {
      templateData.DESIGN_PATTERNS = projectInfo.aiGenerated.bestPractices.map((practice) => `- ${practice}`).join('\n');
    } else {
      templateData.DESIGN_PATTERNS = ''; // Vazio para usar bloco {{else}} no template
    }
    templateData.AUTHENTICATION_METHOD = projectInfo.aiGenerated?.authentication ?? '[A definir]';
    templateData.DATA_PROTECTION = '[A definir]';
    templateData.SECURITY_RULES_CUSTOM = '';
    templateData.TEST_STRATEGY = '';
    templateData.TEST_COVERAGE = '';
    templateData.TEST_TOOLS = '';
    templateData.DEPLOYMENT_METHOD = '[A definir]';
    templateData.INFRASTRUCTURE = '[A definir]';
    templateData.CI_CD = '[A definir]';
    templateData.ENVIRONMENTS = '[A definir]';
    templateData.DOCUMENTATION_STANDARDS = '[A definir]';
    templateData.API_DOCUMENTATION = '[A definir]';
    templateData.CODE_COMMENTS = '[A definir]';
  }

  // Processa cada template
  for (const { template, destination } of templateMap) {
    const templateContent = await loadTemplate(template, templateLocale);
    const processed = processTemplate(templateContent, templateData);
    processedTemplates.set(destination, processed);
  }

  // Processa templates de commands (sem placeholders por enquanto)
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
