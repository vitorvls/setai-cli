/**
 * Presentation helpers — format ContextFacts for Markdown (no inference).
 */

import type { CapabilityHit, CicdState, ContextFact, ProjectContext } from './types.js';

export function displayOrNone(value: string | null | undefined): string {
  if (value === null || value === undefined || value === '') return 'none';
  return value;
}

export function formatFactSource(f: ContextFact<unknown>): string {
  if (f.evidence.length === 0) return f.source;
  const paths = f.evidence.map((e) => (e.detail ? `${e.path} (${e.detail})` : e.path));
  return [...new Set(paths)].join(', ');
}

export function formatCapabilityTable(hits: CapabilityHit[]): string {
  if (hits.length === 0) return '_None classified._';
  const rows = hits.map(
    (h) => `| \`${h.package}\` | ${h.category} | ${h.capability} |`
  );
  return ['| Package | Category | Capability |', '|---------|----------|------------|', ...rows].join(
    '\n'
  );
}

export function formatRawDeps(names: string[]): string {
  if (names.length === 0) return '_None._';
  return names.map((n) => `- \`${n}\``).join('\n');
}

export function formatScripts(scripts: Record<string, string>): string {
  const keys = Object.keys(scripts);
  if (keys.length === 0) return '_No scripts in package.json._';
  return [
    '| Script | Command |',
    '|--------|---------|',
    ...keys.map((k) => `| \`${k}\` | \`${scripts[k]}\` |`),
  ].join('\n');
}

export function formatCicd(cicd: CicdState): string {
  if (cicd.status === 'absent') {
    return '**CI/CD:** none detected';
  }
  const paths = cicd.paths.length > 0 ? cicd.paths.map((p) => `\`${p}\``).join(', ') : 'n/a';
  const statusNote =
    cicd.status === 'present_commented'
      ? 'Workflow file(s) present but currently commented/disabled. Do not assume CI runs on PRs.'
      : cicd.status === 'active'
        ? 'Workflow appears active (has uncommented job definitions).'
        : cicd.status === 'empty'
          ? 'Workflow file(s) empty.'
          : 'CI status could not be verified.';
  return [
    `**Provider:** ${cicd.provider ?? 'unknown'}`,
    `**Status:** ${cicd.status}`,
    `**Paths:** ${paths}`,
    '',
    statusNote,
  ].join('\n');
}

export function formatTraits(ctx: ProjectContext): string {
  const traits = ctx.traits.value;
  if (traits.length === 0) return 'Unknown (insufficient evidence)';
  return `${ctx.displayType} (${traits.join(', ')})`;
}

export function formatStructure(ctx: ProjectContext): string {
  const s = ctx.architecture.observedStructure?.value;
  if (!s) return '_Structure not scanned._';
  const dirs = s.dirs.length > 0 ? s.dirs.map((d) => `- \`${d}/\``).join('\n') : '_No notable dirs._';
  const entries =
    s.entrypoints.length > 0
      ? s.entrypoints.map((e) => `- \`${e}\``).join('\n')
      : '_No entrypoints detected._';
  return `### Directories\n\n${dirs}\n\n### Entrypoints\n\n${entries}`;
}

export function formatUnknowns(ctx: ProjectContext): string {
  if (ctx.unknowns.length === 0) return '_None._';
  return ctx.unknowns
    .map((u) => `- **${u.field}** (${u.reason})${u.note ? `: ${u.note}` : ''}`)
    .join('\n');
}

export function formatConflicts(ctx: ProjectContext): string {
  if (ctx.conflicts.length === 0) return '_None._';
  return ctx.conflicts.map((c) => `- **${c.field}:** ${c.warning}`).join('\n');
}

export function formatSecuritySections(capabilities: string[]): {
  hasHttp: boolean;
  hasDatabase: boolean;
  hasExternalAi: boolean;
  hasCli: boolean;
  list: string;
} {
  return {
    hasHttp: capabilities.includes('http_request_validation'),
    hasDatabase: capabilities.includes('query_safety'),
    hasExternalAi: capabilities.includes('external_ai'),
    hasCli: capabilities.includes('cli_paths'),
    list: capabilities.map((c) => `- ${c}`).join('\n'),
  };
}
