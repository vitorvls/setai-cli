/**
 * Context model coherence validation.
 */

import type { ProjectContext } from '../context/types.js';

export interface ValidationIssue {
  severity: 'error' | 'warning';
  code: string;
  message: string;
}

export function validateContext(ctx: ProjectContext): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // i18n leaks in factual fields
  const leakPatterns = [/templates\.(none|other)/i, /^nenhum$/i, /^ninguno$/i];
  const checkStr = (label: string, value: string | null | undefined) => {
    if (!value) return;
    for (const re of leakPatterns) {
      if (re.test(value)) {
        issues.push({
          severity: 'error',
          code: 'I18N_LEAK',
          message: `Domain field ${label} contains i18n/sentinel leak: "${value}"`,
        });
      }
    }
  };

  checkStr('framework.cli', ctx.frameworks.cli?.value ?? undefined);
  checkStr('framework.application', ctx.frameworks.application?.value ?? undefined);
  checkStr('displayType', ctx.displayType);

  // Database claim consistency
  if (!ctx.database.value.detected && ctx.database.value.packages.length > 0) {
    issues.push({
      severity: 'error',
      code: 'DB_INCONSISTENT',
      message: 'database.detected=false but packages list is non-empty',
    });
  }

  // Recommendations must not appear as identity facts
  for (const rec of ctx.recommendations) {
    if (rec.source === 'ai_generated' && ctx.identity.name.source === 'ai_generated') {
      issues.push({
        severity: 'warning',
        code: 'AI_NAME',
        message: 'Project name should not be AI-generated',
      });
    }
  }

  // HTTP vs CLI consistency warning only
  if (
    ctx.traits.value.includes('cli') &&
    ctx.httpServer.value.detected === false &&
    ctx.displayType.toLowerCase().includes('rest')
  ) {
    issues.push({
      severity: 'error',
      code: 'TYPE_HALLUCINATION',
      message: 'CLI project incorrectly labeled as REST',
    });
  }

  return issues;
}

export function assertContextValid(ctx: ProjectContext): void {
  const errors = validateContext(ctx).filter((i) => i.severity === 'error');
  if (errors.length > 0) {
    throw new Error(
      `Context validation failed:\n${errors.map((e) => `- [${e.code}] ${e.message}`).join('\n')}`
    );
  }
}
