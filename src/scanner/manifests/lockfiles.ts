/**
 * Lockfile detection — strong evidence for package manager.
 * Multiple lockfiles produce a conflict warning (no silent pick).
 */

import { access } from 'fs/promises';
import { join } from 'path';
import type { LockfileEvidence } from '../types.js';

const LOCKFILES: Array<{ file: string; packageManager: LockfileEvidence['packageManager'] }> = [
  { file: 'pnpm-lock.yaml', packageManager: 'pnpm' },
  { file: 'package-lock.json', packageManager: 'npm' },
  { file: 'yarn.lock', packageManager: 'yarn' },
  { file: 'bun.lock', packageManager: 'bun' },
  { file: 'bun.lockb', packageManager: 'bun' },
];

export async function detectLockfiles(rootDir: string): Promise<{
  lockfiles: LockfileEvidence[];
  conflict: boolean;
}> {
  const found: LockfileEvidence[] = [];

  for (const { file, packageManager } of LOCKFILES) {
    try {
      await access(join(rootDir, file));
      found.push({ path: file, packageManager });
    } catch {
      // absent
    }
  }

  const managers = new Set(found.map((l) => l.packageManager));
  return {
    lockfiles: found,
    conflict: managers.size > 1,
  };
}
