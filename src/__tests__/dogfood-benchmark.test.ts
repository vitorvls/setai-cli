/**
 * Dogfooding benchmark — the SetAI repo must never regenerate V1 CRITICAL hallucinations.
 */

import { describe, it, expect } from 'vitest';
import { scanProject } from '../scanner/index.js';
import { resolveFacts } from '../context/fact-resolver.js';
import { compileTemplateData } from '../context/compiler.js';
import { processAllTemplates } from '../engines/template-engine.js';
import { validateOutputFiles } from '../validation/output-validator.js';
import type { UserAnswers } from '../context/user-answers.js';
import type { ProjectInfo } from '../types/project-info.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');

const answers: UserAnswers = {
  projectName: '@setai/cli',
  projectDescription:
    'CLI Tool to generate .cursor configuration structure for AI-assisted development',
  problemImportance: 'Agents need faithful project context',
  targetUsers: 'Developers using AI coding assistants',
  businessGoals: 'Reliable offline context generation',
  technicalConstraints: null,
  businessConstraints: null,
  nonGoals: 'Requiring API keys for core generation; inventing stack facts',
  useTDD: false,
  strictMode: true,
};

describe('SetAI dogfooding benchmark', () => {
  it('scans this repository as a CLI TypeScript project', async () => {
    const evidence = await scanProject(ROOT);

    expect(evidence.isGreenfield).toBe(false);
    expect(evidence.languages).toContain('TypeScript');
    expect(evidence.traits).toContain('cli');
    expect(evidence.frameworks.cli).toBe('commander');
    expect(evidence.frameworks.test).toBe('vitest');
    expect(evidence.frameworks.build).toBe('tsup');
    expect(evidence.frameworks.docs).toBe('vitepress');
    expect(evidence.databasePackages).toHaveLength(0);
    expect(evidence.httpFrameworks).toHaveLength(0);
    expect(evidence.lockfiles.some((l) => l.packageManager === 'pnpm')).toBe(true);
    expect(evidence.capabilities.some((c) => c.package === 'openai')).toBe(true);
    expect(evidence.capabilities.some((c) => c.package === 'zod')).toBe(true);
    expect(evidence.capabilities.some((c) => c.package === 'inquirer')).toBe(true);
    expect(evidence.cicd.status).toBe('present_commented');
  });

  it('resolves facts without REST/DB hallucinations', async () => {
    const evidence = await scanProject(ROOT);
    const ctx = resolveFacts(evidence, answers);

    expect(ctx.displayType).toMatch(/CLI/i);
    expect(ctx.httpServer.value.detected).toBe(false);
    expect(ctx.database.value.detected).toBe(false);
    expect(ctx.packageManager.value?.name).toBe('pnpm');
    expect(ctx.identity.version.value).toBe('0.1.2');
    expect(Object.keys(ctx.commands.value)).toContain('test');
    expect(ctx.securityCapabilities.value).toContain('external_ai');
    expect(ctx.securityCapabilities.value).not.toContain('http_request_validation');
  });

  it('compiled context never contains V1 CRITICAL factual patterns', async () => {
    const evidence = await scanProject(ROOT);
    const ctx = resolveFacts(evidence, answers);
    const projectInfo: ProjectInfo = {
      projectName: answers.projectName,
      projectDescription: answers.projectDescription,
      problemImportance: answers.problemImportance,
      targetUsers: answers.targetUsers,
      businessGoals: answers.businessGoals,
      technicalConstraints: 'None',
      businessConstraints: 'None',
      nonGoals: answers.nonGoals,
      version: '0.1.2',
      techStack: { language: 'TypeScript' },
      preferences: { useTDD: false, strictMode: true },
    };

    const files = await processAllTemplates(projectInfo, '.cursor', 'en', {
      projectContext: ctx,
      userAnswers: answers,
    });

    const joined = [...files.values()].join('\n\n');

    // Absences (CRITICAL) — factual adoption claims, not negation lists
    expect(joined).not.toMatch(/templates\.other/);
    expect(joined).not.toMatch(/templates\.none/);
    expect(joined).not.toMatch(/Layered Architecture \(Controller-Service-Repository\)/);
    expect(joined).not.toMatch(/Database as Source of Truth/i);
    expect(joined).not.toMatch(/Repository Pattern/);
    expect(joined).not.toMatch(/JWT \(JSON Web Tokens\)/);
    expect(joined).not.toMatch(/\[To be defined/);
    expect(joined).not.toMatch(/\{\{TEST_COVERAGE\}\}/);
    expect(joined).not.toMatch(/→ Template engine \(if necessary\)/);
    expect(joined).not.toMatch(/\*\*Handlebars\*\*/);

    // Must not claim Playwright/Cypress as adopted tooling
    expect(joined).not.toMatch(/\*\*E2E Tests:\*\* Playwright or Cypress/);

    // Presences
    expect(joined).toMatch(/CLI Tool/i);
    expect(joined).toMatch(/TypeScript/);
    expect(joined).toMatch(/commander/i);
    expect(joined).toMatch(/vitest/i);
    expect(joined).toMatch(/tsup/i);
    expect(joined).toMatch(/pnpm/i);
    expect(joined).toMatch(/vitepress/i);
    expect(joined).toMatch(/openai/i);
    expect(joined).toMatch(/none/i); // database none

    const errors = validateOutputFiles(files, evidence).filter((i) => i.severity === 'error');
    expect(errors).toEqual([]);
  });

  it('template data marks database and HTTP as none', () => {
    return scanProject(ROOT).then((evidence) => {
      const ctx = resolveFacts(evidence, answers);
      const data = compileTemplateData(ctx, answers);
      expect(data.DATABASE).toBe('none');
      expect(data.HTTP_SERVER).toBe('none');
      expect(data.HAS_HTTP).toBe('false');
      expect(data.HAS_DATABASE).toBe('false');
      expect(data.IS_CLI).toBe('true');
      expect(data.PROJECT_TYPE_REST_API).toBe('false');
    });
  });
});
