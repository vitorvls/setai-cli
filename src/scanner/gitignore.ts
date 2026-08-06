/**
 * Minimal .gitignore parser for scanner ignore rules.
 * No external dependency — supports common patterns only.
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

const DEFAULT_IGNORES = [
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.git',
  '.next',
  '.nuxt',
  '.turbo',
  '.cache',
  '.venv',
  'venv',
  '__pycache__',
  'target',
  '.idea',
  '.vscode',
  '*.tsbuildinfo',
];

export async function loadIgnorePatterns(rootDir: string): Promise<string[]> {
  const patterns = [...DEFAULT_IGNORES];
  try {
    const content = await readFile(join(rootDir, '.gitignore'), 'utf-8');
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      if (trimmed.startsWith('!')) continue; // skip negations for simplicity
      patterns.push(trimmed.replace(/^\//, '').replace(/\/$/, ''));
    }
  } catch {
    // no .gitignore — use defaults
  }
  return patterns;
}

export function shouldIgnore(relativePath: string, patterns: string[]): boolean {
  const normalized = relativePath.replace(/\\/g, '/');
  const parts = normalized.split('/');

  for (const pattern of patterns) {
    const p = pattern.replace(/\\/g, '/').replace(/^\*\//, '');
    if (p.includes('*')) {
      const regex = globToRegExp(p);
      if (regex.test(normalized) || parts.some((part) => regex.test(part))) {
        return true;
      }
    } else {
      if (parts.includes(p) || normalized === p || normalized.startsWith(p + '/')) {
        return true;
      }
    }
  }
  return false;
}

function globToRegExp(glob: string): RegExp {
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '::DOUBLE::')
    .replace(/\*/g, '[^/]*')
    .replace(/::DOUBLE::/g, '.*');
  return new RegExp(`^${escaped}$`);
}
