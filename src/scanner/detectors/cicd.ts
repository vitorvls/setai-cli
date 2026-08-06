/**
 * CI/CD detection — differentiate active vs commented vs absent.
 */

import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import type { CicdState } from '../../context/types.js';

export async function detectCicd(rootDir: string): Promise<CicdState> {
  const ghDir = join(rootDir, '.github', 'workflows');
  let workflowFiles: string[] = [];

  try {
    const entries = await readdir(ghDir);
    workflowFiles = entries
      .filter((f) => /\.(yml|yaml)$/i.test(f))
      .map((f) => `.github/workflows/${f}`);
  } catch {
    // no workflows dir
  }

  if (workflowFiles.length === 0) {
    // Check GitLab / CircleCI presence
    const others = await detectOtherCi(rootDir);
    if (others) return others;
    return { provider: null, status: 'absent', paths: [] };
  }

  const statuses: Array<CicdState['status']> = [];
  for (const rel of workflowFiles) {
    try {
      const content = await readFile(join(rootDir, rel), 'utf-8');
      statuses.push(classifyWorkflowContent(content));
    } catch {
      statuses.push('unverifiable');
    }
  }

  const overall = aggregateStatus(statuses);
  return {
    provider: 'GitHub Actions',
    status: overall,
    paths: workflowFiles,
  };
}

function classifyWorkflowContent(content: string): CicdState['status'] {
  const trimmed = content.trim();
  if (!trimmed) return 'empty';

  const lines = content.split(/\r?\n/);
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length === 0) return 'empty';

  const uncommented = nonEmpty.filter((l) => !l.trim().startsWith('#'));
  if (uncommented.length === 0) return 'present_commented';

  // Has real YAML keys outside comments
  const hasOn = uncommented.some((l) => /^\s*on\s*:/.test(l));
  const hasJobs = uncommented.some((l) => /^\s*jobs\s*:/.test(l));
  if (hasOn || hasJobs) return 'active';

  // Mostly commented with few leftover lines
  if (uncommented.length < nonEmpty.length * 0.2) return 'present_commented';
  return 'unverifiable';
}

function aggregateStatus(statuses: Array<CicdState['status']>): CicdState['status'] {
  if (statuses.includes('active')) return 'active';
  if (statuses.every((s) => s === 'present_commented')) return 'present_commented';
  if (statuses.every((s) => s === 'empty')) return 'empty';
  if (statuses.includes('present_commented')) return 'present_commented';
  return 'unverifiable';
}

async function detectOtherCi(rootDir: string): Promise<CicdState | null> {
  const candidates: Array<{ file: string; provider: string }> = [
    { file: '.gitlab-ci.yml', provider: 'GitLab CI' },
    { file: '.circleci/config.yml', provider: 'CircleCI' },
  ];
  for (const { file, provider } of candidates) {
    try {
      const content = await readFile(join(rootDir, file), 'utf-8');
      return {
        provider,
        status: classifyWorkflowContent(content),
        paths: [file],
      };
    } catch {
      // continue
    }
  }
  return null;
}
