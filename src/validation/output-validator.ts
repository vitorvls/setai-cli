/**
 * Output validation — catch objective problems in generated Markdown.
 */

import type { EvidenceBag } from '../scanner/types.js';
import type { ValidationIssue } from './context-validator.js';

const CRITICAL_ABSENCE_AS_FACT = [
  { re: /Layered Architecture \(Controller-Service-Repository\)/i, code: 'LAYERED_REST' },
  { re: /Database as Source of Truth/i, code: 'DB_SOT' },
  { re: /Repository Pattern/i, code: 'REPO_PATTERN' },
  { re: /templates\.other/i, code: 'I18N_OTHER' },
  { re: /templates\.none/i, code: 'I18N_NONE' },
];

/** Patterns that are OK only inside negations / known-issues */
function isNegatedContext(content: string, index: number): boolean {
  const start = Math.max(0, index - 80);
  const window = content.slice(start, index).toLowerCase();
  return (
    window.includes('not ') ||
    window.includes('do not') ||
    window.includes('never ') ||
    window.includes('none') ||
    window.includes('absent') ||
    window.includes('known issue') ||
    window.includes('not detected') ||
    window.includes('not applicable') ||
    window.includes('is not')
  );
}

export function validateOutputFiles(
  files: Map<string, string>,
  evidence?: EvidenceBag
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  for (const [path, content] of files) {
    // Unresolved placeholders
    if (/\{\{[A-Z0-9_]+\}\}/.test(content)) {
      issues.push({
        severity: 'error',
        code: 'UNRESOLVED_PLACEHOLDER',
        message: `Unresolved template placeholder in ${path}`,
      });
    }
    if (/\[To be defined/i.test(content)) {
      issues.push({
        severity: 'error',
        code: 'PLACEHOLDER_TO_BE_DEFINED',
        message: `Legacy "[To be defined" placeholder in ${path}`,
      });
    }
    if (/\[A definir/i.test(content)) {
      issues.push({
        severity: 'error',
        code: 'PLACEHOLDER_A_DEFINIR',
        message: `Legacy "[A definir" placeholder in ${path}`,
      });
    }

    for (const { re, code } of CRITICAL_ABSENCE_AS_FACT) {
      let match: RegExpExecArray | null;
      const clone = new RegExp(re.source, re.flags + (re.flags.includes('g') ? '' : 'g'));
      while ((match = clone.exec(content)) !== null) {
        if (!isNegatedContext(content, match.index)) {
          // Repository Pattern / JWT in security as mandatory — flag
          if (code === 'REPO_PATTERN' && path.includes('known-issues')) continue;
          issues.push({
            severity: 'error',
            code,
            message: `Forbidden factual pattern "${code}" in ${path}`,
          });
          break;
        }
      }
    }

    // JWT as mandatory auth without HTTP — check security-rules
    if (path.includes('security-rules') && /JWT \(JSON Web Tokens\)/i.test(content)) {
      if (!isNegatedContext(content, content.search(/JWT \(JSON Web Tokens\)/i))) {
        if (evidence && !evidence.httpFrameworks.length) {
          issues.push({
            severity: 'error',
            code: 'JWT_WITHOUT_HTTP',
            message: `JWT presented as fact in ${path} but no HTTP server detected`,
          });
        }
      }
    }
  }

  // Script accuracy
  if (evidence?.packageJson?.scripts) {
    const scripts = evidence.packageJson.scripts;
    for (const [path, content] of files) {
      if (!path.includes('deployment') && !path.includes('tech-stack')) continue;
      // Look for `npm run X` or script backticks that claim current scripts
      for (const mentioned of content.matchAll(/`(?:npm|pnpm|yarn) run ([a-zA-Z0-9:_-]+)`/g)) {
        const name = mentioned[1]!;
        if (!(name in scripts)) {
          issues.push({
            severity: 'warning',
            code: 'UNKNOWN_SCRIPT',
            message: `Documented script "${name}" not in package.json (${path})`,
          });
        }
      }
    }
  }

  return issues;
}

export function assertOutputValid(
  files: Map<string, string>,
  evidence?: EvidenceBag
): void {
  const errors = validateOutputFiles(files, evidence).filter((i) => i.severity === 'error');
  if (errors.length > 0) {
    throw new Error(
      `Output validation failed:\n${errors.map((e) => `- [${e.code}] ${e.message}`).join('\n')}`
    );
  }
}
