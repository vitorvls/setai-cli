/**
 * Language and runtime detection from manifests and configs.
 */

import type { PackageJsonEvidence, ConfigFileEvidence } from '../types.js';

export function detectLanguages(
  pkg: PackageJsonEvidence | undefined,
  configFiles: ConfigFileEvidence[]
): string[] {
  const languages: string[] = [];
  const hasTsConfig = configFiles.some((c) => c.kind === 'tsconfig');
  const hasTypescript =
    !!pkg?.dependencies['typescript'] ||
    !!pkg?.devDependencies['typescript'] ||
    hasTsConfig;

  if (hasTypescript) {
    languages.push('TypeScript');
  } else if (pkg) {
    languages.push('JavaScript');
  }

  return languages;
}

export function detectRuntime(
  pkg: PackageJsonEvidence | undefined,
  languages: string[]
): { name: string; versionRange?: string } | undefined {
  if (!languages.includes('TypeScript') && !languages.includes('JavaScript')) {
    return undefined;
  }
  const nodeRange = pkg?.engines?.node;
  return {
    name: 'Node.js',
    ...(nodeRange ? { versionRange: nodeRange } : {}),
  };
}

export function detectModuleSystem(
  pkg: PackageJsonEvidence | undefined
): 'esm' | 'cjs' | 'unknown' {
  if (!pkg) return 'unknown';
  if (pkg.type === 'module') return 'esm';
  if (pkg.type === 'commonjs') return 'cjs';
  return 'unknown';
}
