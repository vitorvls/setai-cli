import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { mkdtemp, writeFile, mkdir, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { scanProject } from '../scanner/index.js';
import { resolveFacts } from '../context/fact-resolver.js';
import type { UserAnswers } from '../context/user-answers.js';
import { compileTemplateData } from '../context/compiler.js';
import { processTemplate } from '../engines/template-engine.js';
import { validateOutputFiles } from '../validation/output-validator.js';

const baseAnswers = (): UserAnswers => ({
  projectName: 'fixture',
  projectDescription: 'fixture project with api in description but not necessarily REST',
  problemImportance: 'testing',
  targetUsers: 'devs',
  businessGoals: 'quality',
  technicalConstraints: null,
  businessConstraints: null,
  nonGoals: 'hallucinations',
  useTDD: false,
  strictMode: true,
});

async function createFixture(
  name: string,
  files: Record<string, string>
): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), `setai-${name}-`));
  for (const [rel, content] of Object.entries(files)) {
    const abs = join(dir, rel);
    await mkdir(join(abs, '..'), { recursive: true });
    await writeFile(abs, content, 'utf-8');
  }
  return dir;
}

describe('Scanner + Resolver fixtures', () => {
  const dirs: string[] = [];

  afterAll(async () => {
    await Promise.all(dirs.map((d) => rm(d, { recursive: true, force: true })));
  });

  it('Fixture A — Node CLI with commander', async () => {
    const dir = await createFixture('cli', {
      'package.json': JSON.stringify({
        name: 'cli-app',
        version: '1.0.0',
        type: 'module',
        bin: { cli: './dist/index.js' },
        dependencies: { commander: '^12.0.0' },
        devDependencies: { typescript: '^5.0.0', vitest: '^2.0.0' },
        scripts: { test: 'vitest' },
      }),
      'pnpm-lock.yaml': 'lockfileVersion: 9\n',
      'tsconfig.json': '{}',
      'src/index.ts': '#!/usr/bin/env node\n',
    });
    dirs.push(dir);

    const evidence = await scanProject(dir);
    expect(evidence.traits).toContain('cli');
    expect(evidence.httpFrameworks).toHaveLength(0);
    expect(evidence.databasePackages).toHaveLength(0);
    expect(evidence.frameworks.cli).toBe('commander');

    const ctx = resolveFacts(evidence, baseAnswers());
    expect(ctx.displayType).toMatch(/CLI/i);
    expect(ctx.httpServer.value.detected).toBe(false);
    expect(ctx.database.value.detected).toBe(false);
  });

  it('Fixture B — Next.js', async () => {
    const dir = await createFixture('next', {
      'package.json': JSON.stringify({
        name: 'web',
        version: '1.0.0',
        dependencies: { next: '^14.0.0', react: '^18.0.0' },
        devDependencies: { typescript: '^5.0.0' },
      }),
      'tsconfig.json': '{}',
    });
    dirs.push(dir);

    const evidence = await scanProject(dir);
    expect(evidence.traits).toContain('fullstack');
    expect(evidence.frameworks.application).toBe('next');
    expect(evidence.frameworks.ui).toBe('react');
  });

  it('Fixture C — Express API', async () => {
    const dir = await createFixture('express', {
      'package.json': JSON.stringify({
        name: 'api',
        version: '1.0.0',
        dependencies: { express: '^4.0.0' },
      }),
    });
    dirs.push(dir);

    const evidence = await scanProject(dir);
    expect(evidence.httpFrameworks).toContain('express');
    expect(evidence.traits).toContain('backend_api');
  });

  it('Fixture D — CLI + AI SDK must NOT become REST', async () => {
    const dir = await createFixture('cli-ai', {
      'package.json': JSON.stringify({
        name: 'ai-cli',
        version: '1.0.0',
        bin: { tool: './dist/index.js' },
        dependencies: { commander: '^12.0.0', openai: '^4.0.0' },
        description: 'CLI that calls external APIs for AI',
      }),
    });
    dirs.push(dir);

    const evidence = await scanProject(dir);
    const answers = baseAnswers();
    answers.projectDescription = 'CLI that calls external APIs for AI';
    const ctx = resolveFacts(evidence, answers);

    expect(ctx.traits.value).toContain('cli');
    expect(ctx.traits.value).toContain('ai_integration');
    expect(ctx.httpServer.value.detected).toBe(false);
    expect(ctx.displayType.toLowerCase()).not.toContain('rest');
  });

  it('Fixture E — empty / unknown', async () => {
    const dir = await createFixture('empty', {
      'README.md': '# empty\n',
    });
    dirs.push(dir);

    const evidence = await scanProject(dir);
    expect(evidence.isGreenfield).toBe(true);
    const ctx = resolveFacts(evidence, baseAnswers());
    expect(ctx.httpServer.value.detected).toBe(false);
    expect(ctx.displayType.toLowerCase()).not.toContain('rest');
  });

  it('Fixture F — database dependency', async () => {
    const dir = await createFixture('db', {
      'package.json': JSON.stringify({
        name: 'db-app',
        version: '1.0.0',
        dependencies: { '@prisma/client': '^5.0.0', express: '^4.0.0' },
        devDependencies: { prisma: '^5.0.0' },
      }),
    });
    dirs.push(dir);

    const evidence = await scanProject(dir);
    expect(evidence.databasePackages.length).toBeGreaterThan(0);
    const ctx = resolveFacts(evidence, baseAnswers());
    expect(ctx.database.value.detected).toBe(true);
    expect(ctx.architecture.style).toBeUndefined();
  });

  it('Fixture G — multiple lockfiles', async () => {
    const dir = await createFixture('locks', {
      'package.json': JSON.stringify({ name: 'x', version: '1.0.0', dependencies: {} }),
      'pnpm-lock.yaml': 'lockfileVersion: 9\n',
      'package-lock.json': '{}\n',
    });
    dirs.push(dir);

    const evidence = await scanProject(dir);
    expect(evidence.packageManagerConflict).toBe(true);
    expect(evidence.warnings.some((w) => /lockfile/i.test(w))).toBe(true);
  });

  it('Fixture H — commented CI', async () => {
    const dir = await createFixture('ci', {
      'package.json': JSON.stringify({ name: 'x', version: '1.0.0', dependencies: {} }),
      '.github/workflows/ci.yml':
        '# name: CI\n# on: [push]\n# jobs:\n#   build:\n#     runs-on: ubuntu-latest\n',
    });
    dirs.push(dir);

    const evidence = await scanProject(dir);
    expect(evidence.cicd.provider).toBe('GitHub Actions');
    expect(evidence.cicd.status).toBe('present_commented');
  });

  it('does not invent JWT/Layered REST in compiled output for CLI', async () => {
    const dir = await createFixture('cli-out', {
      'package.json': JSON.stringify({
        name: 'cli-out',
        version: '1.0.0',
        bin: { c: './x.js' },
        dependencies: { commander: '^12.0.0' },
        devDependencies: { typescript: '^5.0.0' },
      }),
      'tsconfig.json': '{}',
    });
    dirs.push(dir);

    const evidence = await scanProject(dir);
    const ctx = resolveFacts(evidence, baseAnswers());
    const data = compileTemplateData(ctx, baseAnswers());
    const arch = processTemplate(
      'Style: {{ARCHITECTURAL_STYLE}}\nAuth: {{AUTHENTICATION}}\nDB: {{DATABASE}}\nType: {{PROJECT_TYPE}}',
      data
    );
    expect(arch).not.toMatch(/Layered Architecture \(Controller-Service-Repository\)/);
    expect(arch).not.toMatch(/JWT \(JSON Web Tokens\)/);
    expect(arch).toContain('none');
    expect(arch.toLowerCase()).toContain('cli');

    const files = new Map([['.cursor/context/architecture.md', arch]]);
    const issues = validateOutputFiles(files, evidence).filter((i) => i.severity === 'error');
    expect(issues).toHaveLength(0);
  });
});
