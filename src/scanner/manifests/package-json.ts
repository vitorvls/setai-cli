/**
 * package.json evidence extraction.
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { PackageJsonEvidence } from '../types.js';

export async function readPackageJson(rootDir: string): Promise<PackageJsonEvidence | undefined> {
  const path = join(rootDir, 'package.json');
  try {
    const raw = await readFile(path, 'utf-8');
    const pkg = JSON.parse(raw) as Record<string, unknown>;

    const bin = normalizeBin(pkg.bin);

    const evidence: PackageJsonEvidence = {
      path: 'package.json',
      dependencies: isStringRecord(pkg.dependencies) ? pkg.dependencies : {},
      devDependencies: isStringRecord(pkg.devDependencies) ? pkg.devDependencies : {},
      peerDependencies: isStringRecord(pkg.peerDependencies) ? pkg.peerDependencies : {},
    };
    if (typeof pkg.name === 'string') evidence.name = pkg.name;
    if (typeof pkg.version === 'string') evidence.version = pkg.version;
    if (typeof pkg.description === 'string') evidence.description = pkg.description;
    if (typeof pkg.license === 'string') evidence.license = pkg.license;
    if (typeof pkg.type === 'string') evidence.type = pkg.type;
    if (bin) evidence.bin = bin;
    if (isStringRecord(pkg.engines)) evidence.engines = pkg.engines;
    if (isStringRecord(pkg.scripts)) evidence.scripts = pkg.scripts;
    return evidence;
  } catch {
    return undefined;
  }
}

function normalizeBin(bin: unknown): Record<string, string> | undefined {
  if (!bin) return undefined;
  if (typeof bin === 'string') {
    return { default: bin };
  }
  if (isStringRecord(bin)) return bin;
  return undefined;
}

function isStringRecord(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  return Object.values(value).every((v) => typeof v === 'string');
}
