/**
 * Controlled filesystem walker for project scanning.
 */

import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import { loadIgnorePatterns, shouldIgnore } from './gitignore.js';
import { isSecretPath, isEnvConfigPath } from './secrets.js';
import type { ScanLimits } from './types.js';
import { DEFAULT_SCAN_LIMITS } from './types.js';

export interface WalkResult {
  files: string[];
  dirs: string[];
  hasEnvFiles: boolean;
  truncated: boolean;
}

export async function walkProject(
  rootDir: string,
  limits: ScanLimits = DEFAULT_SCAN_LIMITS
): Promise<WalkResult> {
  const ignorePatterns = await loadIgnorePatterns(rootDir);
  const files: string[] = [];
  const dirs: string[] = [];
  let hasEnvFiles = false;
  let truncated = false;

  async function walk(absDir: string, depth: number): Promise<void> {
    if (truncated) return;
    if (depth > limits.maxDepth) return;
    if (files.length >= limits.maxFiles) {
      truncated = true;
      return;
    }

    let entries;
    try {
      entries = await readdir(absDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (truncated || files.length >= limits.maxFiles) {
        truncated = true;
        return;
      }

      const abs = join(absDir, entry.name);
      const rel = relative(rootDir, abs).replace(/\\/g, '/');

      if (shouldIgnore(rel, ignorePatterns)) continue;

      if (entry.isDirectory()) {
        if (depth < limits.maxDepth) {
          dirs.push(rel);
          await walk(abs, depth + 1);
        }
        continue;
      }

      if (!entry.isFile()) continue;

      if (isEnvConfigPath(rel)) {
        hasEnvFiles = true;
        continue;
      }
      if (isSecretPath(rel)) {
        continue;
      }

      try {
        const s = await stat(abs);
        if (s.size > limits.maxFileSizeBytes) continue;
      } catch {
        continue;
      }

      files.push(rel);
    }
  }

  await walk(rootDir, 0);
  return { files, dirs, hasEnvFiles, truncated };
}
