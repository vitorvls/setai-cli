import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtemp, writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { chdir } from 'process';
import { validateOutputFiles } from '../validation/output-validator.js';
import { scanProject } from '../scanner/index.js';
import { scoreContextQuality } from '../validation/quality-score.js';
import { resolveFacts } from '../context/fact-resolver.js';
import type { UserAnswers } from '../context/user-answers.js';

describe('validate + quality score', () => {
  let dir: string;
  let prevCwd: string;

  beforeAll(async () => {
    prevCwd = process.cwd();
    dir = await mkdtemp(join(tmpdir(), 'setai-validate-'));
    await writeFile(
      join(dir, 'package.json'),
      JSON.stringify({
        name: 'v',
        version: '1.0.0',
        bin: { v: './x.js' },
        dependencies: { commander: '1.0.0' },
        scripts: { test: 'echo ok' },
      })
    );
    await mkdir(join(dir, '.cursor', 'context'), { recursive: true });
    await writeFile(
      join(dir, '.cursor', 'context', 'tech-stack.md'),
      '# Stack\n\n- Language: TypeScript\n- Database: none\n'
    );
  });

  afterAll(async () => {
    chdir(prevCwd);
    await rm(dir, { recursive: true, force: true });
  });

  it('flags unresolved placeholders', () => {
    const files = new Map([['.cursor/x.md', 'Hello {{PROJECT_NAME}}']]);
    const issues = validateOutputFiles(files);
    expect(issues.some((i) => i.code === 'UNRESOLVED_PLACEHOLDER')).toBe(true);
  });

  it('flags layered REST as factual pattern', () => {
    const files = new Map([
      [
        '.cursor/architecture.md',
        'We use Layered Architecture (Controller-Service-Repository) as our style.',
      ],
    ]);
    const issues = validateOutputFiles(files);
    expect(issues.some((i) => i.code === 'LAYERED_REST')).toBe(true);
  });

  it('scores high for clean CLI evidence', async () => {
    chdir(dir);
    const evidence = await scanProject(dir);
    const answers: UserAnswers = {
      projectName: 'v',
      projectDescription: 'cli',
      problemImportance: 'x',
      targetUsers: 'devs',
      businessGoals: 'y',
      technicalConstraints: null,
      businessConstraints: null,
      nonGoals: 'z',
      useTDD: false,
      strictMode: true,
    };
    const ctx = resolveFacts(evidence, answers);
    const quality = scoreContextQuality(ctx, []);
    expect(quality.total).toBeGreaterThanOrEqual(70);
    expect(ctx.displayType).toMatch(/CLI/i);
  });
});
