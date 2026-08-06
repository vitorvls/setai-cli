/**
 * FactResolver — reconciles scanner evidence + user answers into ProjectContext.
 * Precedence: repository > user (with conflict) > safe inference > unknown.
 * Recommendations NEVER become factual fields.
 */

import type { EvidenceBag } from '../scanner/types.js';
import type { UserAnswers } from './user-answers.js';
import {
  fact,
  type Conflict,
  type ContextFact,
  type ProjectContext,
  type Recommendation,
  type UnknownField,
} from './types.js';
import { displayTypeFromTraits } from '../scanner/detectors/project-traits.js';
import { detectModuleSystem } from '../scanner/detectors/language.js';
import { detectCoverageTool } from '../scanner/detectors/frameworks.js';

export interface ResolveOptions {
  preferDeclaredFor?: string[];
}

export function resolveFacts(
  evidence: EvidenceBag,
  answers: UserAnswers,
  _options: ResolveOptions = {}
): ProjectContext {
  const unknowns: UnknownField[] = [];
  const conflicts: Conflict[] = [];
  const warnings = [...evidence.warnings];
  const recommendations: Recommendation[] = [];

  if (answers.aiRecommendations) {
    for (const r of answers.aiRecommendations) {
      recommendations.push({ ...r, source: 'ai_generated' });
    }
  }

  const pkg = evidence.packageJson;
  const pkgPath = pkg?.path ?? 'package.json';

  // Identity
  const name = resolveIdentityName(pkg, answers, conflicts, pkgPath);
  const version = resolveVersion(pkg, answers, conflicts, warnings, pkgPath);

  const description = answers.aiProse?.enhancedDescription
    ? fact(answers.aiProse.enhancedDescription, 'ai_generated', 'medium', [])
    : fact(answers.projectDescription, 'user', 'confirmed', []);

  const identity: ProjectContext['identity'] = {
    name,
    version,
    description,
  };

  if (pkg?.license) {
    identity.license = fact(pkg.license, 'package_manifest', 'confirmed', [
      { path: pkgPath, detail: 'license' },
    ]);
  }
  if (pkg?.engines) {
    identity.engines = fact(pkg.engines, 'package_manifest', 'confirmed', [
      { path: pkgPath, detail: 'engines' },
    ]);
  }

  const moduleSystem = detectModuleSystem(pkg);
  identity.moduleSystem = fact(
    moduleSystem,
    pkg?.type ? 'package_manifest' : 'inferred',
    pkg?.type ? 'confirmed' : 'low',
    pkg?.type ? [{ path: pkgPath, detail: 'type' }] : []
  );

  if (pkg?.bin) {
    const bin =
      typeof pkg.bin === 'string' ? { default: pkg.bin } : (pkg.bin as Record<string, string>);
    identity.bin = fact(bin, 'package_manifest', 'confirmed', [
      { path: pkgPath, detail: 'bin' },
    ]);
  }

  // Traits
  const traits = fact(
    evidence.traits,
    evidence.traits.length > 0 ? 'repository' : 'inferred',
    evidence.traits.length > 0 ? 'high' : 'low',
    evidence.traits.length > 0 ? [{ path: pkgPath, detail: 'traits' }] : []
  );
  if (evidence.traits.length === 0 && !evidence.isGreenfield) {
    unknowns.push({
      field: 'traits',
      reason: 'insufficient_evidence',
      note: 'Could not classify project type from repository signals.',
    });
  }

  // Languages
  let languages = evidence.languages;
  if (answers.language && answers.language !== null) {
    if (languages.length > 0 && !languages.map((l) => l.toLowerCase()).includes(answers.language.toLowerCase())) {
      conflicts.push({
        field: 'languages',
        observed: fact(languages, 'repository', 'high', [{ path: pkgPath }]),
        declared: fact([answers.language], 'user', 'confirmed', []),
        resolution: 'prefer_observed',
        warning: `User declared language "${answers.language}" but repository indicates ${languages.join(', ')}.`,
      });
      warnings.push(conflicts[conflicts.length - 1]!.warning);
    } else if (languages.length === 0) {
      languages = [answers.language];
    }
  }
  if (languages.length === 0) {
    unknowns.push({ field: 'languages', reason: 'not_detected' });
  }

  const languagesFact = fact(
    languages,
    evidence.languages.length > 0 ? 'repository' : answers.language ? 'user' : 'inferred',
    evidence.languages.length > 0 ? 'confirmed' : answers.language ? 'confirmed' : 'low',
    evidence.languages.length > 0
      ? [{ path: 'tsconfig.json or package.json', detail: 'language' }]
      : []
  );

  // Runtime
  const runtime = fact(
    evidence.runtime ?? null,
    evidence.runtime ? 'package_manifest' : 'inferred',
    evidence.runtime?.versionRange ? 'confirmed' : evidence.runtime ? 'medium' : 'low',
    evidence.runtime ? [{ path: pkgPath, detail: 'engines.node' }] : []
  );

  // Package manager
  const packageManager = resolvePackageManager(evidence, warnings);

  // Frameworks — repository first; user framework only if no detection
  const frameworks = resolveFrameworks(evidence, answers, conflicts, unknowns, warnings);

  // Dependencies
  const prodHits = evidence.capabilities.filter((c) => c.source === 'package_manifest');
  const devHits = evidence.capabilities.filter((c) => c.source === 'devDependencies');
  const raw = {
    dependencies: Object.keys(pkg?.dependencies ?? {}),
    devDependencies: Object.keys(pkg?.devDependencies ?? {}),
    peerDependencies: Object.keys(pkg?.peerDependencies ?? {}),
  };

  // Database
  const dbDetected = evidence.databasePackages.length > 0;
  if (answers.database && answers.database !== null && !dbDetected) {
    conflicts.push({
      field: 'database',
      observed: fact(
        { detected: false, packages: [], confidence: 'confirmed' as const },
        'repository',
        'high',
        [{ path: pkgPath }]
      ),
      declared: fact(
        { detected: true, packages: [answers.database], confidence: 'medium' as const },
        'user',
        'confirmed',
        []
      ),
      resolution: 'keep_both',
      warning: `User declared database "${answers.database}" but no database packages were detected in package.json.`,
    });
    warnings.push(conflicts[conflicts.length - 1]!.warning);
  }

  const database = fact(
    {
      detected: dbDetected,
      packages: evidence.databasePackages,
      confidence: dbDetected ? ('medium' as const) : ('confirmed' as const),
    },
    'package_manifest',
    dbDetected ? 'medium' : 'confirmed',
    dbDetected
      ? evidence.databasePackages.map((p) => ({ path: pkgPath, detail: `dependencies.${p}` }))
      : [{ path: pkgPath, detail: 'no database packages' }]
  );

  // HTTP
  const httpServer = fact(
    {
      detected: evidence.httpFrameworks.length > 0,
      frameworks: evidence.httpFrameworks,
    },
    'package_manifest',
    'confirmed',
    evidence.httpFrameworks.map((f) => ({ path: pkgPath, detail: f }))
  );

  // Architecture — observed structure only; style only if user-declared
  const architecture: ProjectContext['architecture'] = {
    observedStructure: fact(evidence.structure, 'filesystem', 'high', [
      { path: '.', detail: 'directory scan' },
    ]),
  };
  if (answers.architecturalStyle) {
    architecture.style = fact(answers.architecturalStyle, 'user', 'confirmed', []);
  }

  // Commands
  const commands = fact(
    pkg?.scripts ?? {},
    'package_manifest',
    'confirmed',
    [{ path: pkgPath, detail: 'scripts' }]
  );

  // Testing
  const coverage = detectCoverageTool(evidence.capabilities);
  const testing: ProjectContext['testing'] = {
    runner: fact(
      evidence.frameworks.test,
      evidence.frameworks.test ? 'package_manifest' : 'inferred',
      evidence.frameworks.test ? 'confirmed' : 'low',
      evidence.frameworks.test ? [{ path: pkgPath, detail: evidence.frameworks.test }] : []
    ),
    coverageTool: fact(
      coverage,
      coverage ? 'package_manifest' : 'inferred',
      coverage ? 'confirmed' : 'low',
      coverage ? [{ path: pkgPath, detail: coverage }] : []
    ),
    preferTdd: fact(answers.useTDD, 'user', 'confirmed', []),
  };

  // CI/CD
  const cicd = fact(evidence.cicd, 'configuration', evidence.cicd.status === 'absent' ? 'confirmed' : 'high', [
    ...evidence.cicd.paths.map((p) => ({ path: p })),
  ]);

  // Security capabilities
  const securityCaps = deriveSecurityCapabilities(evidence, answers);
  const securityCapabilities = fact(securityCaps, 'inferred', 'high', [
    { path: pkgPath, detail: 'capability-based' },
  ]);

  // Business
  const business: ProjectContext['business'] = {
    problemImportance: fact(
      answers.aiProse?.problemImportance ?? answers.problemImportance,
      answers.aiProse?.problemImportance ? 'ai_generated' : 'user',
      'confirmed',
      []
    ),
    targetUsers: fact(answers.targetUsers, 'user', 'confirmed', []),
    businessGoals: fact(
      answers.aiProse?.businessGoals
        ? answers.aiProse.businessGoals.map((g) => `- ${g}`).join('\n')
        : answers.businessGoals,
      answers.aiProse?.businessGoals ? 'ai_generated' : 'user',
      'confirmed',
      []
    ),
    technicalConstraints: fact(answers.technicalConstraints, 'user', 'confirmed', []),
    businessConstraints: fact(answers.businessConstraints, 'user', 'confirmed', []),
    nonGoals: fact(answers.nonGoals, 'user', 'confirmed', []),
  };

  if (evidence.isGreenfield) {
    unknowns.push({
      field: 'repository',
      reason: 'not_detected',
      note: 'Greenfield project — little or no repository evidence.',
    });
  }

  if (!dbDetected) {
    // Explicit none — not unknown for CLI without DB deps
    // (unknowns only if greenfield and user didn't decide — handled above)
  }

  return {
    identity,
    traits,
    languages: languagesFact,
    runtime,
    packageManager,
    frameworks,
    dependencies: {
      production: fact(prodHits, 'package_manifest', 'confirmed', [{ path: pkgPath }]),
      development: fact(devHits, 'package_manifest', 'confirmed', [{ path: pkgPath, detail: 'devDependencies' }]),
      raw,
    },
    database,
    httpServer,
    architecture,
    commands,
    testing,
    cicd,
    securityCapabilities,
    business,
    unknowns,
    conflicts,
    recommendations,
    warnings,
    projectMode: evidence.isGreenfield ? 'greenfield' : 'existing',
    displayType: displayTypeFromTraits(evidence.traits),
  };
}

function resolveIdentityName(
  pkg: EvidenceBag['packageJson'],
  answers: UserAnswers,
  conflicts: Conflict[],
  pkgPath: string
): ContextFact<string> {
  if (pkg?.name && answers.projectName && pkg.name !== answers.projectName) {
    conflicts.push({
      field: 'identity.name',
      observed: fact(pkg.name, 'package_manifest', 'confirmed', [{ path: pkgPath, detail: 'name' }]),
      declared: fact(answers.projectName, 'user', 'confirmed', []),
      resolution: 'prefer_observed',
      warning: `Package name "${pkg.name}" differs from user project name "${answers.projectName}".`,
    });
    return fact(pkg.name, 'package_manifest', 'confirmed', [{ path: pkgPath, detail: 'name' }]);
  }
  if (pkg?.name) {
    return fact(pkg.name, 'package_manifest', 'confirmed', [{ path: pkgPath, detail: 'name' }]);
  }
  return fact(answers.projectName, 'user', 'confirmed', []);
}

function resolveVersion(
  pkg: EvidenceBag['packageJson'],
  answers: UserAnswers,
  conflicts: Conflict[],
  warnings: string[],
  pkgPath: string
): ContextFact<string> {
  if (pkg?.version) {
    if (answers.version && answers.version !== pkg.version) {
      conflicts.push({
        field: 'identity.version',
        observed: fact(pkg.version, 'package_manifest', 'confirmed', [
          { path: pkgPath, detail: 'version' },
        ]),
        declared: fact(answers.version, 'user', 'confirmed', []),
        resolution: 'prefer_observed',
        warning: `package.json version ${pkg.version} differs from user-declared ${answers.version}.`,
      });
      warnings.push(conflicts[conflicts.length - 1]!.warning);
    }
    return fact(pkg.version, 'package_manifest', 'confirmed', [
      { path: pkgPath, detail: 'version' },
    ]);
  }
  if (answers.version) {
    return fact(answers.version, 'user', 'confirmed', []);
  }
  return fact('0.0.0', 'inferred', 'low', []);
}

function resolvePackageManager(
  evidence: EvidenceBag,
  _warnings: string[]
): ContextFact<{ name: string; lockfile?: string } | null> {
  if (evidence.lockfiles.length === 0) {
    return fact(null, 'inferred', 'low', []);
  }
  if (evidence.packageManagerConflict) {
    return fact(
      {
        name: evidence.lockfiles[0]!.packageManager,
        lockfile: evidence.lockfiles[0]!.path,
      },
      'lockfile',
      'medium',
      evidence.lockfiles.map((l) => ({ path: l.path }))
    );
  }
  const lf = evidence.lockfiles[0]!;
  return fact(
    { name: lf.packageManager, lockfile: lf.path },
    'lockfile',
    'confirmed',
    [{ path: lf.path }]
  );
}

function resolveFrameworks(
  evidence: EvidenceBag,
  answers: UserAnswers,
  conflicts: Conflict[],
  _unknowns: UnknownField[],
  warnings: string[]
): ProjectContext['frameworks'] {
  const fw = evidence.frameworks;

  if (answers.framework && answers.framework !== null) {
    const detected =
      fw.application || fw.ui || fw.cli || fw.docs;
    if (detected && detected !== answers.framework) {
      // User named a different primary framework
      const isKnown =
        answers.framework === fw.application ||
        answers.framework === fw.ui ||
        answers.framework === fw.cli;
      if (!isKnown) {
        conflicts.push({
          field: 'frameworks',
          observed: fact(detected, 'package_manifest', 'high', [
            { path: 'package.json' },
          ]),
          declared: fact(answers.framework, 'user', 'confirmed', []),
          resolution: 'keep_both',
          warning: `User declared framework "${answers.framework}" but repository evidence points to "${detected}".`,
        });
        warnings.push(conflicts[conflicts.length - 1]!.warning);
      }
    }
  }

  return {
    application: fact(fw.application, 'package_manifest', fw.application ? 'confirmed' : 'confirmed', [
      { path: 'package.json' },
    ]),
    ui: fact(fw.ui, 'package_manifest', 'confirmed', [{ path: 'package.json' }]),
    cli: fact(fw.cli, 'package_manifest', fw.cli ? 'confirmed' : 'confirmed', [
      { path: 'package.json' },
    ]),
    docs: fact(fw.docs, 'package_manifest', 'confirmed', [{ path: 'package.json' }]),
    test: fact(fw.test, 'package_manifest', fw.test ? 'confirmed' : 'low', [
      { path: 'package.json' },
    ]),
    build: fact(fw.build, 'package_manifest', fw.build ? 'confirmed' : 'low', [
      { path: 'package.json' },
    ]),
    lint: fact(fw.lint, 'package_manifest', fw.lint ? 'confirmed' : 'low', [
      { path: 'package.json' },
    ]),
    formatter: fact(fw.formatter, 'package_manifest', fw.formatter ? 'confirmed' : 'low', [
      { path: 'package.json' },
    ]),
  };
}

function deriveSecurityCapabilities(evidence: EvidenceBag, answers: UserAnswers): string[] {
  const caps = new Set<string>(['secrets', 'filesystem']);

  if (evidence.traits.includes('cli') || evidence.packageJson?.bin) {
    caps.add('cli_paths');
    caps.add('config_files');
  }
  if (evidence.httpFrameworks.length > 0) {
    caps.add('http_request_validation');
    caps.add('http_headers');
  }
  if (evidence.databasePackages.length > 0) {
    caps.add('query_safety');
  }
  if (evidence.capabilities.some((c) => c.category === 'ai')) {
    caps.add('external_ai');
    caps.add('api_keys');
  }
  if (answers.authenticationMethod) {
    caps.add('authentication');
  }
  if (evidence.hasEnvFiles) {
    caps.add('env_config_present');
  }
  return [...caps];
}
