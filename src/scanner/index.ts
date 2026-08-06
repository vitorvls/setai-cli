/**
 * ProjectScanner — deterministic local evidence collection.
 * No external APIs. No AI.
 */

import { walkProject } from './fs-walker.js';
import { readPackageJson } from './manifests/package-json.js';
import { detectLockfiles } from './manifests/lockfiles.js';
import { classifyDependencies } from './catalog/classify.js';
import { detectLanguages, detectRuntime } from './detectors/language.js';
import { detectTraits } from './detectors/project-traits.js';
import {
  detectFrameworks,
  detectHttpFrameworks,
  detectDatabasePackages,
} from './detectors/frameworks.js';
import { detectCicd } from './detectors/cicd.js';
import { detectStructure, classifyConfigFiles } from './detectors/structure.js';
import type { EvidenceBag } from './types.js';
import { DEFAULT_SCAN_LIMITS } from './types.js';

export async function scanProject(rootDir: string): Promise<EvidenceBag> {
  const warnings: string[] = [];
  const walk = await walkProject(rootDir, DEFAULT_SCAN_LIMITS);
  if (walk.truncated) {
    warnings.push('Filesystem scan truncated due to file/depth limits.');
  }

  const packageJson = await readPackageJson(rootDir);
  const { lockfiles, conflict } = await detectLockfiles(rootDir);
  if (conflict) {
    warnings.push(
      `Multiple package manager lockfiles detected: ${lockfiles.map((l) => l.path).join(', ')}. Do not assume a single package manager.`
    );
  }

  const configFiles = classifyConfigFiles(walk.files);
  const prodCaps = packageJson
    ? classifyDependencies(packageJson.dependencies, 'package_manifest')
    : [];
  const devCaps = packageJson
    ? classifyDependencies(packageJson.devDependencies, 'devDependencies')
    : [];
  const capabilities = [...prodCaps, ...devCaps];

  const languages = detectLanguages(packageJson, configFiles);
  const runtime = detectRuntime(packageJson, languages);
  const httpFrameworks = detectHttpFrameworks(capabilities);
  const databasePackages = detectDatabasePackages(capabilities);
  const frameworks = detectFrameworks(capabilities, configFiles);
  const hasDocsTool = !!frameworks.docs || configFiles.some((c) => c.kind === 'vitepress');
  const traits = detectTraits(packageJson, capabilities, httpFrameworks, hasDocsTool);
  const cicd = await detectCicd(rootDir);
  const structure = detectStructure(walk.dirs, packageJson, walk.files);

  const isGreenfield = !packageJson && lockfiles.length === 0;

  const result: EvidenceBag = {
    rootDir,
    scannedAt: new Date().toISOString(),
    isGreenfield,
    lockfiles,
    packageManagerConflict: conflict,
    configFiles,
    traits,
    languages,
    frameworks,
    capabilities,
    databasePackages,
    httpFrameworks,
    cicd,
    structure,
    warnings,
    hasEnvFiles: walk.hasEnvFiles,
  };
  if (packageJson) result.packageJson = packageJson;
  if (runtime) result.runtime = runtime;
  return result;
}

export type { EvidenceBag } from './types.js';
