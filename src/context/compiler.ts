/**
 * ContextCompiler — ProjectContext → template substitution data.
 * Presentation only. Does not invent architecture, auth, CI, or databases.
 */

import type { ProjectContext } from './types.js';
import type { UserAnswers } from './user-answers.js';
import {
  displayOrNone,
  formatCapabilityTable,
  formatCicd,
  formatConflicts,
  formatFactSource,
  formatRawDeps,
  formatScripts,
  formatSecuritySections,
  formatStructure,
  formatTraits,
  formatUnknowns,
} from './presenters.js';

export function compileTemplateData(
  ctx: ProjectContext,
  answers: UserAnswers
): Record<string, string> {
  const lang = ctx.languages.value[0] ?? 'Unknown';
  const runtime = ctx.runtime.value;
  const pm = ctx.packageManager.value;
  const db = ctx.database.value;
  const http = ctx.httpServer.value;
  const sec = formatSecuritySections(ctx.securityCapabilities.value);

  const cliFw = ctx.frameworks.cli?.value ?? null;
  const appFw = ctx.frameworks.application?.value ?? null;
  const uiFw = ctx.frameworks.ui?.value ?? null;
  const primaryFw = cliFw || appFw || uiFw || null;

  const data: Record<string, string> = {
    PROJECT_NAME: ctx.identity.name.value,
    VERSION: ctx.identity.version.value,
    PROJECT_DESCRIPTION: ctx.identity.description?.value ?? answers.projectDescription,
    PROBLEM_IMPORTANCE: ctx.business.problemImportance.value,
    TARGET_USERS: formatTargetUsers(ctx.business.targetUsers.value),
    BUSINESS_GOALS: ctx.business.businessGoals.value,
    TECHNICAL_CONSTRAINTS: ctx.business.technicalConstraints.value ?? 'None',
    BUSINESS_CONSTRAINTS: ctx.business.businessConstraints.value ?? 'None',
    NON_GOALS: ctx.business.nonGoals.value,

    LANGUAGE: lang,
    RUNTIME: runtime
      ? runtime.versionRange
        ? `${runtime.name} ${runtime.versionRange}`
        : runtime.name
      : 'none detected',
    MODULE_SYSTEM: ctx.identity.moduleSystem?.value === 'esm'
      ? 'ESM (ES Modules)'
      : ctx.identity.moduleSystem?.value === 'cjs'
        ? 'CommonJS'
        : 'unknown',
    PACKAGE_MANAGER: pm ? `${pm.name}${pm.lockfile ? ` (lockfile: ${pm.lockfile})` : ''}` : 'none detected',
    PROJECT_TYPE: ctx.displayType,
    PROJECT_TRAITS: formatTraits(ctx),

    FRAMEWORK: displayOrNone(primaryFw),
    CLI_FRAMEWORK: displayOrNone(cliFw),
    APPLICATION_FRAMEWORK: displayOrNone(appFw),
    UI_FRAMEWORK: displayOrNone(uiFw),
    DOCS_FRAMEWORK: displayOrNone(ctx.frameworks.docs?.value),
    BUILD_TOOL: displayOrNone(ctx.frameworks.build?.value),
    TEST_FRAMEWORK: displayOrNone(ctx.frameworks.test?.value ?? ctx.testing.runner?.value),
    LINTER: displayOrNone(ctx.frameworks.lint?.value),
    FORMATTER: displayOrNone(ctx.frameworks.formatter?.value),
    COVERAGE_TOOL: displayOrNone(ctx.testing.coverageTool?.value),

    DATABASE: db.detected ? db.packages.join(', ') : 'none',
    DATABASE_DETECTED: db.detected ? 'true' : 'false',
    DATABASE_NOTE: db.detected
      ? `Database-related packages detected (${db.packages.join(', ')}). This indicates potential use, not necessarily an active database deployment.`
      : 'No database packages detected.',

    HTTP_SERVER: http.detected ? http.frameworks.join(', ') : 'none',
    HTTP_DETECTED: http.detected ? 'true' : 'false',

    ARCHITECTURAL_STYLE: ctx.architecture.style?.value ?? 'Not defined (no explicit architectural style declared or evidenced)',
    OBSERVED_STRUCTURE: formatStructure(ctx),
    SOURCE_IDENTITY: formatFactSource(ctx.identity.name),
    SOURCE_VERSION: formatFactSource(ctx.identity.version),

    PRODUCTION_DEPS_TABLE: formatCapabilityTable(ctx.dependencies.production.value),
    DEV_DEPS_TABLE: formatCapabilityTable(ctx.dependencies.development.value),
    PRODUCTION_DEPS_RAW: formatRawDeps(ctx.dependencies.raw.dependencies),
    DEV_DEPS_RAW: formatRawDeps(ctx.dependencies.raw.devDependencies),

    SCRIPTS_TABLE: formatScripts(ctx.commands.value),
    CI_CD: formatCicd(ctx.cicd.value),
    CI_STATUS: ctx.cicd.value.status,
    CI_PROVIDER: ctx.cicd.value.provider ?? 'none',

    USE_TDD: answers.useTDD ? 'true' : 'false',
    TDD_NOTE: answers.useTDD
      ? 'User preference: TDD encouraged. No coverage gate is enforced unless configured in the repository.'
      : 'User preference: TDD not selected as a preference.',
    STRICT_MODE: answers.strictMode ? 'true' : 'false',

    SECURITY_CAPABILITIES: sec.list,
    HAS_HTTP: sec.hasHttp ? 'true' : 'false',
    HAS_DATABASE: sec.hasDatabase ? 'true' : 'false',
    HAS_EXTERNAL_AI: sec.hasExternalAi ? 'true' : 'false',
    HAS_CLI: sec.hasCli ? 'true' : 'false',

    UNKNOWNS: formatUnknowns(ctx),
    CONFLICTS: formatConflicts(ctx),
    WARNINGS: ctx.warnings.length > 0 ? ctx.warnings.map((w) => `- ${w}`).join('\n') : '_None._',
    KNOWN_ISSUES: formatKnownIssues(ctx),

    ALLOWED_LIBRARIES: formatAllowedLibs(ctx, answers),
    FORBIDDEN_LIBRARIES: formatForbiddenLibs(answers),
    AI_PROVIDERS_SECTION: formatAiProviders(ctx),

    ENGINES: ctx.identity.engines
      ? Object.entries(ctx.identity.engines.value)
          .map(([k, v]) => `- **${k}:** ${v}`)
          .join('\n')
      : '_Not specified in package.json._',
    BIN: ctx.identity.bin
      ? Object.entries(ctx.identity.bin.value)
          .map(([k, v]) => `- **${k}:** \`${v}\``)
          .join('\n')
      : '_No bin entry._',

    LICENSE: ctx.identity.license?.value ?? 'not specified',

    // Conditional flags for templates (truthy strings)
    LANGUAGE_TYPESCRIPT: lang === 'TypeScript' ? 'true' : 'false',
    IS_CLI: ctx.traits.value.includes('cli') ? 'true' : 'false',
    IS_EXISTING: ctx.projectMode === 'existing' ? 'true' : 'false',
    HAS_AI_SDK: ctx.traits.value.includes('ai_integration') ? 'true' : 'false',
    HAS_CICD_ACTIVE: ctx.cicd.value.status === 'active' ? 'true' : 'false',
    HAS_CICD_COMMENTED: ctx.cicd.value.status === 'present_commented' ? 'true' : 'false',
    HAS_ARCHITECTURE_STYLE: ctx.architecture.style ? 'true' : 'false',

    // Clear dangerous legacy placeholders — never invent
    AUTHENTICATION: answers.authenticationMethod
      ? answers.authenticationMethod
      : 'Not applicable / not configured for this project type',
    AUTHORIZATION: 'Not defined',
    SECURITY_CONSTRAINTS: formatSecurityConstraints(sec),
    COMMUNICATION_PATTERN: http.detected
      ? `HTTP server frameworks detected: ${http.frameworks.join(', ')}`
      : ctx.traits.value.includes('cli')
        ? 'CLI process — local stdin/stdout and filesystem; no product HTTP API detected'
        : 'Not detected',
    INTERACTION_MODEL: ctx.traits.value.includes('cli')
      ? 'Interactive / command-line invocation'
      : 'Not detected',
    SOURCE_OF_TRUTH: 'Repository code and package manifests are the source of truth for technical facts. User answers are the source of truth for business intent.',
    CACHING_STRATEGY: 'Not detected',
    STATE_MANAGEMENT: 'Not detected',
    EXPECTED_SCALE: 'Not defined',
    SCALING_STRATEGY: 'Not defined',
    FAILURE_HANDLING: 'Not defined',
    LOGGING_STRATEGY: 'Not defined',
    MONITORING_METRICS: 'Not defined',
    ALERTS_INCIDENT_HANDLING: 'Not defined',
    DEPLOYMENT_PLATFORM: answers.deploymentMethod ?? 'Not defined',
    DATABASE_CLIENT: db.detected ? db.packages.join(', ') : 'none',
    TEST_TOOLS: formatTestTools(ctx),
    ARCHITECTURAL_DECISIONS: ctx.architecture.style
      ? `- Architectural style (user-declared): ${ctx.architecture.style.value}`
      : '',
    DESIGN_PATTERNS: '',
    AI_ARCHITECTURAL_STYLE: ctx.architecture.style?.value ?? '',
    ARCHITECTURE_DIAGRAM_HIGH_LEVEL: '',
    ARCHITECTURE_DIAGRAM_COMPONENT: '',
    ARCHITECTURE_TRADE_OFFS: '',
    ARCHITECTURE_LIMITATIONS: '',
    TYPESCRIPT_CONFIG: '',
    ESLINT_CONFIG: ctx.frameworks.lint?.value
      ? `Linter detected: ${ctx.frameworks.lint.value}. See repository config files.`
      : 'No linter detected.',

    // Advanced / AI usage defaults — do not invent model names
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
    ALLOWED_LIBRARIES_CUSTOM: answers.allowedLibraries?.map((l) => `- ${l}`).join('\n') ?? '',
    FORBIDDEN_LIBRARIES_CUSTOM:
      answers.forbiddenLibraries?.map((l) => `- ${l}`).join('\n') ?? '',
    LIBRARY_NOTES: '',
    AUTHENTICATION_METHOD: answers.authenticationMethod ?? 'Not defined',
    DATA_PROTECTION: 'Not defined',
    SECURITY_RULES_CUSTOM: answers.securityRules?.map((r) => `- ${r}`).join('\n') ?? '',
    TEST_STRATEGY: answers.testStrategy ?? '',
    TEST_COVERAGE: answers.testCoverage ?? 'No coverage minimum is documented as an enforced gate.',
    DEPLOYMENT_METHOD: answers.deploymentMethod ?? 'Not defined',
    INFRASTRUCTURE: 'Not defined',
    ENVIRONMENTS: 'Not defined',
    DOCUMENTATION_STANDARDS: 'Not defined',
    API_DOCUMENTATION: 'Not applicable unless an HTTP API is present',
    CODE_COMMENTS: 'Not defined',
    FRAMEWORK_EXPRESS: http.frameworks.includes('express') ? 'true' : 'false',
    FRAMEWORK_NEXTJS: appFw === 'next' ? 'true' : 'false',
    PROJECT_TYPE_REST_API: http.detected && ctx.traits.value.includes('backend_api') ? 'true' : 'false',
  };

  return data;
}

function formatTargetUsers(users: string): string {
  if (users.includes('-') || users.includes('*')) return users;
  return users
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean)
    .map((u) => `- ${u}`)
    .join('\n');
}

function formatAllowedLibs(ctx: ProjectContext, answers: UserAnswers): string {
  const all = [
    ...ctx.dependencies.production.value,
    ...ctx.dependencies.development.value,
  ];
  const lines = all.map(
    (h) => `- \`${h.package}\` — ${h.capability} (${h.category})`
  );
  const custom = answers.allowedLibraries?.map((l) => `- ${l} (user-declared)`) ?? [];
  if (lines.length === 0 && custom.length === 0) {
    return '_No dependencies classified. See raw package.json._';
  }
  return [...lines, ...custom].join('\n');
}

function formatForbiddenLibs(answers: UserAnswers): string {
  if (answers.forbiddenLibraries && answers.forbiddenLibraries.length > 0) {
    return answers.forbiddenLibraries.map((l) => `- ${l}`).join('\n');
  }
  return 'No formal deny-list is defined for this project. Prefer packages already in `package.json` unless explicitly approved.';
}

function formatAiProviders(ctx: ProjectContext): string {
  const ai = [...ctx.dependencies.production.value, ...ctx.dependencies.development.value].filter(
    (h) => h.category === 'ai'
  );
  if (ai.length === 0) {
    return '_No AI provider SDKs detected in package.json._';
  }
  return [
    'AI SDKs present (optional enrichment path — not required for core context generation):',
    ...ai.map((h) => `- \`${h.package}\``),
  ].join('\n');
}

function formatSecurityConstraints(sec: ReturnType<typeof formatSecuritySections>): string {
  const lines = [
    '- Never commit secrets or API keys',
    '- Validate filesystem paths; avoid path traversal',
    '- Treat user-provided paths and config carefully',
  ];
  if (sec.hasExternalAi) {
    lines.push('- External AI: API keys stored outside the repo; do not log prompt/response secrets');
    lines.push('- Treat AI-generated content as untrusted until validated');
  }
  if (sec.hasHttp) {
    lines.push('- Validate and sanitize HTTP inputs');
    lines.push('- Configure security headers appropriately for the HTTP stack');
  }
  if (sec.hasDatabase) {
    lines.push('- Use parameterized queries / ORM APIs; never concatenate untrusted input into queries');
  }
  if (sec.hasCli) {
    lines.push('- CLI: safe handling of config directories and overwrite confirmation');
  }
  return lines.join('\n');
}

function formatTestTools(ctx: ProjectContext): string {
  const tools: string[] = [];
  if (ctx.testing.runner?.value) tools.push(`- **Unit/Integration:** ${ctx.testing.runner.value}`);
  if (ctx.testing.coverageTool?.value) {
    tools.push(`- **Coverage:** ${ctx.testing.coverageTool.value}`);
  }
  return tools.length > 0 ? tools.join('\n') : 'No test tooling detected.';
}

function formatKnownIssues(ctx: ProjectContext): string {
  const items: string[] = [];
  for (const c of ctx.conflicts) {
    items.push(`### Conflict: ${c.field}\n\n${c.warning}\n\nResolution: ${c.resolution}`);
  }
  for (const u of ctx.unknowns) {
    items.push(`### Unknown: ${u.field}\n\nReason: ${u.reason}${u.note ? `\n\n${u.note}` : ''}`);
  }
  if (ctx.cicd.value.status === 'present_commented') {
    items.push(
      `### CI inactive\n\n${formatCicd(ctx.cicd.value)}`
    );
  }
  for (const w of ctx.warnings) {
    if (!items.some((i) => i.includes(w))) {
      items.push(`### Warning\n\n${w}`);
    }
  }
  return items.length > 0 ? items.join('\n\n') : '_No known issues recorded from scan._';
}
