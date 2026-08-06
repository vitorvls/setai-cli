/**
 * Post-init generation report UX.
 */

import type { ProjectContext } from '../context/types.js';
import type { EvidenceBag } from '../scanner/types.js';
import type { QualityBreakdown } from './../validation/quality-score.js';
import { success, gray, info } from '../utils/output.js';

export function printGenerationReport(
  ctx: ProjectContext,
  evidence: EvidenceBag,
  quality: QualityBreakdown,
  folder: string
): void {
  success(`Context generated → ${folder}/`, true);
  info('', true);
  info('Detected:', true);
  for (const line of buildDetectedLines(ctx, evidence)) {
    gray(`  ✓ ${line}`, true);
  }
  info('Not detected:', true);
  for (const line of buildNotDetectedLines(ctx, evidence)) {
    gray(`  - ${line}`, true);
  }
  if (ctx.conflicts.length > 0 || ctx.unknowns.length > 0) {
    info('Needs attention:', true);
    for (const c of ctx.conflicts) {
      gray(`  ! ${c.warning}`, true);
    }
    for (const u of ctx.unknowns.slice(0, 5)) {
      gray(`  ? ${u.field} (${u.reason})`, true);
    }
  }
  info('Validation:', true);
  gray(`  ✓ Context model resolved with provenance`, true);
  gray(`  ✓ Quality score: ${quality.total}/100`, true);
  info('', true);
}

function buildDetectedLines(ctx: ProjectContext, evidence: EvidenceBag): string[] {
  const lines: string[] = [];
  if (ctx.languages.value.length) lines.push(ctx.languages.value.join(', '));
  if (ctx.runtime.value) {
    lines.push(
      ctx.runtime.value.versionRange
        ? `${ctx.runtime.value.name} ${ctx.runtime.value.versionRange}`
        : ctx.runtime.value.name
    );
  }
  if (ctx.displayType !== 'Unknown') lines.push(ctx.displayType);
  if (ctx.frameworks.test?.value) lines.push(ctx.frameworks.test.value);
  if (ctx.frameworks.build?.value) lines.push(ctx.frameworks.build.value);
  if (ctx.packageManager.value) lines.push(ctx.packageManager.value.name);
  for (const p of evidence.capabilities.filter((c) => c.category === 'ai').map((c) => c.package)) {
    lines.push(p);
  }
  if (ctx.frameworks.cli?.value) lines.push(ctx.frameworks.cli.value);
  if (ctx.frameworks.docs?.value) lines.push(ctx.frameworks.docs.value);
  if (ctx.frameworks.lint?.value) lines.push(ctx.frameworks.lint.value);
  if (ctx.frameworks.formatter?.value) lines.push(ctx.frameworks.formatter.value);
  return [...new Set(lines)];
}

function buildNotDetectedLines(ctx: ProjectContext, evidence: EvidenceBag): string[] {
  const lines: string[] = [];
  if (!ctx.database.value.detected) lines.push('Database');
  if (!ctx.httpServer.value.detected) lines.push('Web/HTTP framework');
  if (evidence.cicd.status !== 'active') lines.push('Active CI');
  return lines;
}
