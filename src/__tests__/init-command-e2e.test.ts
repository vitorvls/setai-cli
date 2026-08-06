import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { initCommand } from '../commands/init.js';
import { collectIDESelection } from '../engines/ide-selector.js';
import {
  checkConfigFolderExists,
  checkWritePermissions,
  generateFiles,
  generateSetaiConfig,
} from '../engines/file-generator.js';
import { processAllTemplates } from '../engines/template-engine.js';
import { enhanceWithAI } from '../services/ai-service.js';
import { scanProject } from '../scanner/index.js';
import { collectAdaptiveAnswers } from '../questions/adaptive.js';
import { initI18n, setLocale } from '../utils/i18n.js';
import fse from 'fs-extra';
import { join } from 'path';
import { tmpdir } from 'os';
import type { EvidenceBag } from '../scanner/types.js';
import type { UserAnswers } from '../context/user-answers.js';

vi.mock('../engines/ide-selector.js');
vi.mock('../engines/file-generator.js');
vi.mock('../engines/template-engine.js');
vi.mock('../services/ai-service.js');
vi.mock('../scanner/index.js');
vi.mock('../questions/adaptive.js');
vi.mock('inquirer');

function minimalEvidence(overrides: Partial<EvidenceBag> = {}): EvidenceBag {
  return {
    rootDir: process.cwd(),
    scannedAt: new Date().toISOString(),
    isGreenfield: false,
    packageJson: {
      path: 'package.json',
      name: 'test-project',
      version: '1.0.0',
      dependencies: { commander: '^12.0.0' },
      devDependencies: { vitest: '^2.0.0' },
      peerDependencies: {},
      bin: { test: './dist/index.js' },
      scripts: { test: 'vitest' },
    },
    lockfiles: [{ path: 'pnpm-lock.yaml', packageManager: 'pnpm' }],
    packageManagerConflict: false,
    configFiles: [{ path: 'tsconfig.json', kind: 'tsconfig' }],
    traits: ['cli'],
    languages: ['TypeScript'],
    runtime: { name: 'Node.js', versionRange: '>=18' },
    frameworks: {
      application: null,
      ui: null,
      cli: 'commander',
      docs: null,
      test: 'vitest',
      build: null,
      lint: null,
      formatter: null,
    },
    capabilities: [
      {
        package: 'commander',
        category: 'cli',
        capability: 'cli-framework',
        source: 'package_manifest',
        confidence: 'confirmed',
      },
      {
        package: 'vitest',
        category: 'testing',
        capability: 'test-runner',
        source: 'devDependencies',
        confidence: 'confirmed',
      },
    ],
    databasePackages: [],
    httpFrameworks: [],
    cicd: { provider: null, status: 'absent', paths: [] },
    structure: { dirs: ['src'], entrypoints: ['src/index.ts'] },
    warnings: [],
    hasEnvFiles: false,
    ...overrides,
  };
}

function minimalAnswers(overrides: Partial<UserAnswers> = {}): UserAnswers {
  return {
    projectName: 'test-project',
    projectDescription: 'A test project',
    problemImportance: 'Important problem',
    targetUsers: 'Developers',
    businessGoals: 'Improve productivity',
    technicalConstraints: null,
    businessConstraints: null,
    nonGoals: 'Not building a web app',
    version: '1.0.0',
    useTDD: false,
    strictMode: true,
    ...overrides,
  };
}

describe('Init Command E2E (evidence path)', () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = join(tmpdir(), `setai-e2e-test-${Date.now()}`);
    await fse.ensureDir(testDir);
    process.exit = vi.fn() as typeof process.exit;
    await initI18n('pt-BR');
    await setLocale('pt-BR');
    vi.clearAllMocks();

    vi.mocked(generateSetaiConfig).mockResolvedValue(undefined as never);
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    await fse.remove(testDir).catch(() => {});
  });

  it('should complete full flow without advanced or beta', async () => {
    vi.mocked(checkWritePermissions).mockResolvedValue(true);
    vi.mocked(collectIDESelection).mockResolvedValue({
      ide: 'cursor',
      configFolder: '.cursor',
      name: 'Cursor',
    });
    vi.mocked(checkConfigFolderExists).mockResolvedValue(false);
    vi.mocked(scanProject).mockResolvedValue(minimalEvidence());
    vi.mocked(collectAdaptiveAnswers).mockResolvedValue({
      answers: minimalAnswers(),
    });
    vi.mocked(processAllTemplates).mockResolvedValue(
      new Map([
        ['.cursor/README.md', '# Test Project\nCLI Tool'],
        ['.cursor/context/tech-stack.md', 'Database: none'],
      ])
    );
    vi.mocked(generateFiles).mockResolvedValue();

    await initCommand(false, false);

    expect(checkWritePermissions).toHaveBeenCalled();
    expect(collectIDESelection).toHaveBeenCalled();
    expect(scanProject).toHaveBeenCalled();
    expect(collectAdaptiveAnswers).toHaveBeenCalled();
    expect(processAllTemplates).toHaveBeenCalled();
    expect(generateFiles).toHaveBeenCalled();
    expect(enhanceWithAI).not.toHaveBeenCalled();
  });

  it('should call AI only with --beta', async () => {
    vi.mocked(checkWritePermissions).mockResolvedValue(true);
    vi.mocked(collectIDESelection).mockResolvedValue({
      ide: 'cursor',
      configFolder: '.cursor',
      name: 'Cursor',
    });
    vi.mocked(checkConfigFolderExists).mockResolvedValue(false);
    vi.mocked(scanProject).mockResolvedValue(minimalEvidence());
    vi.mocked(collectAdaptiveAnswers).mockResolvedValue({
      answers: minimalAnswers(),
    });
    vi.mocked(enhanceWithAI).mockResolvedValue({
      enhancedDescription: 'Enhanced',
      recommendations: [{ id: '1', topic: 'docs', text: 'Improve docs' }],
    });
    vi.mocked(processAllTemplates).mockResolvedValue(new Map([['.cursor/README.md', '# x']]));
    vi.mocked(generateFiles).mockResolvedValue();

    await initCommand(false, true);

    expect(enhanceWithAI).toHaveBeenCalled();
  });

  it('should exit when no write permissions', async () => {
    vi.mocked(checkWritePermissions).mockResolvedValue(false);

    await initCommand(false, false);

    expect(process.exit).toHaveBeenCalledWith(1);
    expect(scanProject).not.toHaveBeenCalled();
  });
});
