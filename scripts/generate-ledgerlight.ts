/**
 * One-shot greenfield generation for ledgerlight gabarito (non-interactive).
 */
import { join } from 'path';
import { mkdir } from 'fs/promises';
import { scanProject } from '../src/scanner/index.js';
import { resolveFacts } from '../src/context/fact-resolver.js';
import { processAllTemplates } from '../src/engines/template-engine.js';
import { generateFiles, generateSetaiConfig } from '../src/engines/file-generator.js';
import { validateUserAnswers } from '../src/validation/input-validator.js';
import { assertContextValid, validateContext } from '../src/validation/context-validator.js';
import { assertOutputValid, validateOutputFiles } from '../src/validation/output-validator.js';
import { scoreContextQuality } from '../src/validation/quality-score.js';
import { printGenerationReport } from '../src/reporting/generation-report.js';
import type { UserAnswers } from '../src/context/user-answers.js';
import type { ProjectInfo } from '../src/types/project-info.js';

const ROOT = process.argv[2] || 'D:/Projetos/ledgerlight';

const answers: UserAnswers = {
  projectName: 'ledgerlight',
  projectDescription:
    'Offline personal finance CLI that imports bank CSV files, categorizes expenses with local rules, and prints monthly summaries in the terminal',
  problemImportance:
    'People need a private, local way to understand spending without uploading bank data to SaaS dashboards',
  targetUsers:
    'Individuals who want privacy-first personal budgeting from exported bank CSVs',
  businessGoals:
    'Ship a reliable CLI MVP that imports CSV, applies category rules, and generates readable monthly reports without cloud sync',
  technicalConstraints: 'Must work fully offline; no mandatory cloud services; Node.js LTS only',
  businessConstraints: 'No paid subscriptions in MVP; keep scope small enough for a solo maintainer',
  nonGoals:
    'Mobile app; web dashboard; multi-user accounts; bank API integrations; real-time sync; investment portfolio tracking',
  version: '0.1.0',
  language: 'TypeScript',
  framework: null,
  database: null,
  useTDD: false,
  strictMode: true,
  ideConfig: { ide: 'cursor', configFolder: '.cursor' },
};

async function main() {
  await mkdir(ROOT, { recursive: true });
  process.chdir(ROOT);

  console.log(`Generating context in ${ROOT} ...`);
  const evidence = await scanProject(ROOT);
  console.log(`Mode: ${evidence.isGreenfield ? 'greenfield' : 'existing'}`);

  validateUserAnswers(answers);
  const ctx = resolveFacts(evidence, answers);
  assertContextValid(ctx);

  const projectInfo: ProjectInfo = {
    projectName: answers.projectName,
    projectDescription: answers.projectDescription,
    problemImportance: answers.problemImportance,
    targetUsers: answers.targetUsers,
    businessGoals: answers.businessGoals,
    technicalConstraints: answers.technicalConstraints ?? 'None',
    businessConstraints: answers.businessConstraints ?? 'None',
    nonGoals: answers.nonGoals,
    version: answers.version ?? '0.1.0',
    techStack: { language: answers.language ?? 'TypeScript' },
    preferences: { useTDD: answers.useTDD, strictMode: answers.strictMode },
    ideConfig: answers.ideConfig,
  };

  const files = await processAllTemplates(projectInfo, '.cursor', 'en', {
    projectContext: ctx,
    userAnswers: answers,
  });

  const outputIssues = validateOutputFiles(files, evidence);
  assertOutputValid(files, evidence);
  const quality = scoreContextQuality(ctx, [...validateContext(ctx), ...outputIssues]);

  await generateFiles(ROOT, files);
  await generateSetaiConfig(ROOT, '.cursor');
  printGenerationReport(ctx, evidence, quality, '.cursor');
  console.log(`Files written: ${files.size}`);
  console.log(`Quality: ${quality.total}/100`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
