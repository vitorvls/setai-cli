/**
 * Scanner evidence bag — raw observations before fact resolution.
 */

import type { CapabilityHit, CicdState, ProjectTrait } from '../context/types.js';

export interface ScanLimits {
  maxDepth: number;
  maxFiles: number;
  maxFileSizeBytes: number;
}

export const DEFAULT_SCAN_LIMITS: ScanLimits = {
  maxDepth: 4,
  maxFiles: 2000,
  maxFileSizeBytes: 256 * 1024,
};

export interface PackageJsonEvidence {
  path: string;
  name?: string;
  version?: string;
  description?: string;
  license?: string;
  type?: string;
  bin?: Record<string, string> | string;
  engines?: Record<string, string>;
  scripts?: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
}

export interface LockfileEvidence {
  path: string;
  packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun';
}

export interface ConfigFileEvidence {
  path: string;
  kind:
    | 'tsconfig'
    | 'vitest'
    | 'jest'
    | 'eslint'
    | 'prettier'
    | 'tsup'
    | 'vite'
    | 'vitepress'
    | 'other';
}

export interface EvidenceBag {
  rootDir: string;
  scannedAt: string;
  isGreenfield: boolean;
  packageJson?: PackageJsonEvidence;
  lockfiles: LockfileEvidence[];
  packageManagerConflict: boolean;
  configFiles: ConfigFileEvidence[];
  traits: ProjectTrait[];
  languages: string[];
  runtime?: { name: string; versionRange?: string };
  frameworks: {
    application: string | null;
    ui: string | null;
    cli: string | null;
    docs: string | null;
    test: string | null;
    build: string | null;
    lint: string | null;
    formatter: string | null;
  };
  capabilities: CapabilityHit[];
  databasePackages: string[];
  httpFrameworks: string[];
  cicd: CicdState;
  structure: {
    dirs: string[];
    entrypoints: string[];
  };
  warnings: string[];
  hasEnvFiles: boolean;
}
