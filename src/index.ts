/**
 * SetAI CLI - Entry Point
 * Evidence-first context compiler for AI-assisted development
 */

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { initCommand } from './commands/init.js';
import { configCommand } from './commands/config.js';
import { validateCommand } from './commands/validate.js';
import { initI18n } from './utils/i18n.js';
import { loadConfig, getLanguageConfig } from './config/config-manager.js';

function readPackageVersion(): string {
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const pkgPath = join(here, '..', 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { version?: string };
    return pkg.version ?? '0.1.2';
  } catch {
    return '0.1.2';
  }
}

async function initializeI18n(): Promise<void> {
  await loadConfig();
  const langConfig = getLanguageConfig();
  await initI18n(langConfig.questions || 'pt-BR');
}

initializeI18n().catch(() => {
  // continue with default locale
});

const program = new Command();

program
  .name('setai')
  .description('CLI Tool to generate evidence-based IDE context for AI-assisted development')
  .version(readPackageVersion())
  .addHelpText(
    'after',
    `
Examples:
  $ setai init
  $ setai init --advanced
  $ setai init --beta
  $ setai init --lang en
  $ setai validate
  $ setai validate .cursor
  $ setai config

Commands:
  init       Scan project, ask gaps, compile context folder
  validate   Deterministically audit a generated context folder
  config     Manage API keys for optional --beta AI enrichment

Notes:
  Core generation works offline without API keys.
  --beta only enriches prose/recommendations; it never invents stack facts.
`
  );

program
  .command('init')
  .description('Scan repository and generate IDE context from evidence + user intent')
  .option('--advanced', 'Include optional advanced question groups')
  .option('--beta', 'Optional AI prose enrichment (requires: setai config)')
  .option('--lang <locale>', 'Question locale (pt-BR, en, es)', 'pt-BR')
  .action(async (options) => {
    await initCommand(options.advanced ?? false, options.beta ?? false, options.lang);
  });

program
  .command('validate')
  .description('Validate a generated context folder against repository evidence')
  .argument('[folder]', 'Context folder to validate', '.cursor')
  .action(async (folder: string) => {
    await validateCommand(folder);
  });

program
  .command('config')
  .description('Manage CLI configuration (API keys, etc.)')
  .action(async () => {
    await configCommand();
  });

program.parse();
