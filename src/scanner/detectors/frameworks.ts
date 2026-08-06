/**
 * Framework / tooling detection by category from capabilities + configs.
 */

import type { CapabilityHit } from '../../context/types.js';
import type { ConfigFileEvidence } from '../types.js';
import { firstCapability, packagesInCategory } from '../catalog/classify.js';

export interface DetectedFrameworks {
  application: string | null;
  ui: string | null;
  cli: string | null;
  docs: string | null;
  test: string | null;
  build: string | null;
  lint: string | null;
  formatter: string | null;
}

export function detectFrameworks(
  capabilities: CapabilityHit[],
  configFiles: ConfigFileEvidence[]
): DetectedFrameworks {
  const app =
    firstCapability(capabilities, 'application') ??
    (capabilities.find((c) => c.package === 'next')?.package ?? null);

  const uiPkg = firstCapability(capabilities, 'ui');
  const cliPkg =
    capabilities.find((c) => c.capability === 'cli-framework')?.package ?? null;
  const docsPkg = firstCapability(capabilities, 'docs');
  const testRunner =
    capabilities.find((c) => c.capability === 'test-runner')?.package ?? null;
  const testPkg = testRunner ?? firstCapability(capabilities, 'testing');
  const buildPkg = firstCapability(capabilities, 'build');
  const lintPkg =
    firstCapability(capabilities, 'lint') ??
    (configFiles.some((c) => c.kind === 'eslint') ? 'eslint' : null);
  const formatterPkg =
    firstCapability(capabilities, 'formatter') ??
    (configFiles.some((c) => c.kind === 'prettier') ? 'prettier' : null);

  // Prefer vitest config evidence for test runner name display
  let test = testPkg;
  if (configFiles.some((c) => c.kind === 'vitest') && !test) {
    test = 'vitest';
  }
  if (configFiles.some((c) => c.kind === 'jest') && !test) {
    test = 'jest';
  }

  return {
    application: app,
    ui: uiPkg,
    cli: cliPkg,
    docs: docsPkg,
    test,
    build: buildPkg ?? (configFiles.some((c) => c.kind === 'tsup') ? 'tsup' : null),
    lint: lintPkg,
    formatter: formatterPkg,
  };
}

export function detectHttpFrameworks(capabilities: CapabilityHit[]): string[] {
  return packagesInCategory(capabilities, 'http');
}

export function detectDatabasePackages(capabilities: CapabilityHit[]): string[] {
  return packagesInCategory(capabilities, 'database');
}

export function detectCoverageTool(capabilities: CapabilityHit[]): string | null {
  const hit = capabilities.find((c) => c.capability === 'coverage');
  if (hit) return hit.package;
  if (capabilities.some((c) => c.package === 'vitest')) {
    // coverage package may be separate; don't invent tool name without package
    return null;
  }
  return null;
}
