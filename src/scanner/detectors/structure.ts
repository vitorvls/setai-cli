/**
 * Shallow structure detection — dirs and entrypoints, not architecture patterns.
 */

import type { PackageJsonEvidence } from '../types.js';

const INTERESTING_TOP_DIRS = new Set([
  'src',
  'lib',
  'app',
  'apps',
  'packages',
  'tests',
  'test',
  'docs',
  'templates',
  'locales',
  'scripts',
  'bin',
  'cmd',
  'internal',
  'services',
  'engines',
  'commands',
  'config',
  'utils',
  'types',
]);

export function detectStructure(
  dirs: string[],
  pkg: PackageJsonEvidence | undefined,
  files: string[]
): { dirs: string[]; entrypoints: string[] } {
  const topLevel = dirs
    .filter((d) => !d.includes('/'))
    .filter((d) => INTERESTING_TOP_DIRS.has(d) || d.startsWith('src'));

  // Also include interesting nested under src (one level)
  const srcChildren = dirs
    .filter((d) => d.startsWith('src/') && d.split('/').length === 2)
    .slice(0, 30);

  const observedDirs = [...new Set([...topLevel, ...srcChildren])].sort();

  const entrypoints: string[] = [];
  if (pkg?.bin) {
    const bin = typeof pkg.bin === 'string' ? { default: pkg.bin } : pkg.bin;
    for (const target of Object.values(bin)) {
      entrypoints.push(target.replace(/^\.\//, ''));
    }
  }

  // Common entry files if present
  for (const candidate of ['src/index.ts', 'src/index.js', 'src/main.ts', 'index.ts', 'index.js']) {
    if (files.includes(candidate) && !entrypoints.includes(candidate)) {
      entrypoints.push(candidate);
    }
  }

  return { dirs: observedDirs, entrypoints };
}

export function classifyConfigFiles(files: string[]): Array<{
  path: string;
  kind: 'tsconfig' | 'vitest' | 'jest' | 'eslint' | 'prettier' | 'tsup' | 'vite' | 'vitepress' | 'other';
}> {
  const result: Array<{
    path: string;
    kind: 'tsconfig' | 'vitest' | 'jest' | 'eslint' | 'prettier' | 'tsup' | 'vite' | 'vitepress' | 'other';
  }> = [];

  for (const f of files) {
    const base = f.split('/').pop() ?? f;
    if (/^tsconfig.*\.json$/i.test(base)) {
      result.push({ path: f, kind: 'tsconfig' });
    } else if (/vitest\.config\./i.test(base)) {
      result.push({ path: f, kind: 'vitest' });
    } else if (/jest\.config\./i.test(base)) {
      result.push({ path: f, kind: 'jest' });
    } else if (/eslint\.config\./i.test(base) || base === '.eslintrc.js' || base === '.eslintrc.cjs') {
      result.push({ path: f, kind: 'eslint' });
    } else if (base === '.prettierrc' || base === '.prettierrc.json' || /prettier\.config\./i.test(base)) {
      result.push({ path: f, kind: 'prettier' });
    } else if (/tsup\.config\./i.test(base)) {
      result.push({ path: f, kind: 'tsup' });
    } else if (/vite\.config\./i.test(base)) {
      result.push({ path: f, kind: 'vite' });
    } else if (f.includes('.vitepress')) {
      result.push({ path: f, kind: 'vitepress' });
    }
  }
  return result;
}
