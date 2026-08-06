/**
 * Deterministic context quality score (0–100).
 * Not a substitute for human semantic audit — biased toward unsupported-claim penalties.
 */

import type { ProjectContext } from '../context/types.js';
import type { ValidationIssue } from './context-validator.js';

export interface QualityBreakdown {
  evidenceCoverage: number;
  unsupportedClaimsPenalty: number;
  brokenReferencesPenalty: number;
  placeholderIntegrity: number;
  dependencyAccuracy: number;
  commandAccuracy: number;
  contextCompleteness: number;
  signalNoise: number;
  total: number;
}

export function scoreContextQuality(
  ctx: ProjectContext,
  issues: ValidationIssue[]
): QualityBreakdown {
  const existing = ctx.projectMode === 'existing';

  // Evidence coverage: fillable technical fields with evidence
  let covered = 0;
  let fillable = 0;
  const checks: boolean[] = [
    ctx.languages.value.length > 0,
    ctx.runtime.value !== null,
    ctx.packageManager.value !== null,
    ctx.traits.value.length > 0,
    Object.keys(ctx.commands.value).length > 0 || !existing,
  ];
  for (const ok of checks) {
    fillable++;
    if (ok) covered++;
  }
  const evidenceCoverage = fillable === 0 ? 100 : Math.round((covered / fillable) * 100);

  const errorCount = issues.filter((i) => i.severity === 'error').length;
  const warnCount = issues.filter((i) => i.severity === 'warning').length;
  const unsupportedClaimsPenalty = Math.min(100, errorCount * 25 + warnCount * 5);

  const brokenReferencesPenalty = Math.min(
    100,
    issues.filter((i) => i.code === 'UNKNOWN_SCRIPT' || i.code === 'BROKEN_PATH').length * 15
  );

  const placeholderIntegrity =
    issues.some((i) => i.code.startsWith('PLACEHOLDER') || i.code === 'UNRESOLVED_PLACEHOLDER' || i.code.startsWith('I18N'))
      ? 0
      : 100;

  const dependencyAccuracy =
    existing && ctx.dependencies.raw.dependencies.length > 0
      ? ctx.dependencies.production.value.length > 0 || ctx.dependencies.raw.dependencies.length > 0
        ? 100
        : 50
      : existing
        ? 80
        : 70;

  const commandAccuracy =
    existing && Object.keys(ctx.commands.value).length > 0 ? 100 : existing ? 60 : 70;

  let completenessPoints = 0;
  if (ctx.business.problemImportance.value) completenessPoints += 20;
  if (ctx.business.targetUsers.value) completenessPoints += 20;
  if (ctx.business.businessGoals.value) completenessPoints += 20;
  if (ctx.business.nonGoals.value) completenessPoints += 20;
  if (ctx.architecture.observedStructure?.value.dirs.length) completenessPoints += 20;
  const contextCompleteness = completenessPoints;

  // Signal/noise: fewer unknowns inventing content = better; unknowns OK
  const hallucinatedType = /rest api/i.test(ctx.displayType) && !ctx.httpServer.value.detected;
  const signalNoise = hallucinatedType ? 20 : ctx.unknowns.length > 8 ? 70 : 95;

  // Weighted total — unsupported claims dominate
  const total = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        evidenceCoverage * 0.15 +
          (100 - unsupportedClaimsPenalty) * 0.3 +
          (100 - brokenReferencesPenalty) * 0.1 +
          placeholderIntegrity * 0.15 +
          dependencyAccuracy * 0.1 +
          commandAccuracy * 0.05 +
          contextCompleteness * 0.1 +
          signalNoise * 0.05
      )
    )
  );

  return {
    evidenceCoverage,
    unsupportedClaimsPenalty,
    brokenReferencesPenalty,
    placeholderIntegrity,
    dependencyAccuracy,
    commandAccuracy,
    contextCompleteness,
    signalNoise,
    total,
  };
}
