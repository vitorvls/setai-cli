/**
 * setai validate — deterministic audit of a generated context folder.
 */

import { readdir, readFile, stat } from 'fs/promises';
import { join, relative } from 'path';
import { cwd } from 'process';
import { scanProject } from '../scanner/index.js';
import { validateOutputFiles } from '../validation/output-validator.js';
import { info, success, error, gray, warning } from '../utils/output.js';

export async function validateCommand(folder: string = '.cursor'): Promise<void> {
  const baseDir = cwd();
  const target = join(baseDir, folder);

  try {
    await stat(target);
  } catch {
    error(`Context folder not found: ${folder}`, true);
    process.exit(1);
  }

  info(`Validating ${folder}/ against repository evidence...`, true);

  const evidence = await scanProject(baseDir);
  const files = await readMarkdownTree(target, folder);
  const issues = validateOutputFiles(files, evidence);

  // Extra: dependency names claimed as current
  const allContent = [...files.values()].join('\n');
  for (const fake of ['Handlebars', 'Playwright', 'Cypress']) {
    const re = new RegExp(`\\b${fake}\\b`);
    const idx = allContent.search(re);
    if (idx >= 0) {
      const window = allContent.slice(Math.max(0, idx - 40), idx).toLowerCase();
      const negated =
        window.includes('not ') ||
        window.includes('do not') ||
        window.includes('none') ||
        window.includes('invent');
      if (!negated) {
        const inManifest =
          !!evidence.packageJson?.dependencies[fake.toLowerCase()] ||
          !!evidence.packageJson?.devDependencies[fake.toLowerCase()] ||
          Object.keys({
            ...evidence.packageJson?.dependencies,
            ...evidence.packageJson?.devDependencies,
          }).some((k) => k.toLowerCase() === fake.toLowerCase());
        if (!inManifest) {
          issues.push({
            severity: 'error',
            code: 'UNSUPPORTED_DEP_CLAIM',
            message: `"${fake}" mentioned as if adopted but not in package.json`,
          });
        }
      }
    }
  }

  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  if (warnings.length) {
    info('Warnings:', true);
    for (const w of warnings) {
      warning(`  [${w.code}] ${w.message}`, true);
    }
  }

  if (errors.length) {
    info('Errors:', true);
    for (const e of errors) {
      error(`  [${e.code}] ${e.message}`, true);
    }
    error(`Validation failed with ${errors.length} error(s).`, true);
    process.exit(1);
  }

  success(`Validation passed (${files.size} files, ${warnings.length} warning(s)).`, true);
  gray(`Scan mode: ${evidence.isGreenfield ? 'greenfield' : 'existing'}`, true);
  gray(`Languages: ${evidence.languages.join(', ') || 'none'}`, true);
  gray(`Traits: ${evidence.traits.join(', ') || 'none'}`, true);
}

async function readMarkdownTree(
  absDir: string,
  prefix: string
): Promise<Map<string, string>> {
  const map = new Map<string, string>();

  async function walk(dir: string): Promise<void> {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const abs = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === '.setai' || entry.name === 'node_modules') continue;
        await walk(abs);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const rel = relative(cwd(), abs).replace(/\\/g, '/');
        const content = await readFile(abs, 'utf-8');
        map.set(rel.startsWith(prefix) ? rel : `${prefix}/${entry.name}`, content);
      }
    }
  }

  await walk(absDir);
  return map;
}
