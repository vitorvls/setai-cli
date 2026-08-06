/**
 * Context Compiler domain model — evidence-first facts with provenance.
 * Domain values use null / unknown — never localized sentinel strings.
 */

export type EvidenceSource =
  | 'repository'
  | 'configuration'
  | 'package_manifest'
  | 'lockfile'
  | 'filesystem'
  | 'user'
  | 'inferred'
  | 'ai_generated'
  | 'recommendation';

export type Confidence = 'confirmed' | 'high' | 'medium' | 'low';

export interface EvidenceRef {
  path: string;
  detail?: string;
}

export interface ContextFact<T> {
  value: T;
  source: EvidenceSource;
  confidence: Confidence;
  evidence: EvidenceRef[];
  observedAt?: string;
}

export type ConflictResolution =
  | 'prefer_observed'
  | 'prefer_declared'
  | 'keep_both'
  | 'unresolved';

export interface Conflict<T = unknown> {
  field: string;
  observed: ContextFact<T>;
  declared: ContextFact<T>;
  resolution: ConflictResolution;
  warning: string;
}

export type UnknownReason =
  | 'not_detected'
  | 'not_applicable'
  | 'user_skipped'
  | 'insufficient_evidence';

export interface UnknownField {
  field: string;
  reason: UnknownReason;
  note?: string;
}

export interface Recommendation {
  id: string;
  topic: string;
  text: string;
  source: 'user' | 'inferred' | 'ai_generated';
}

export type ProjectTrait =
  | 'cli'
  | 'library'
  | 'web_frontend'
  | 'backend_api'
  | 'fullstack'
  | 'monorepo'
  | 'desktop'
  | 'mobile'
  | 'worker'
  | 'sdk'
  | 'documentation'
  | 'ai_integration';

export interface CapabilityHit {
  package: string;
  category: string;
  capability: string;
  source: 'package_manifest' | 'devDependencies' | 'configuration';
  confidence: Confidence;
}

export interface DatabaseState {
  detected: boolean;
  packages: string[];
  confidence: Confidence;
}

export interface HttpServerState {
  detected: boolean;
  frameworks: string[];
}

export interface CicdState {
  provider: string | null;
  status: 'active' | 'present_commented' | 'empty' | 'absent' | 'unverifiable';
  paths: string[];
}

export interface ObservedStructure {
  dirs: string[];
  entrypoints: string[];
}

export interface ProjectContext {
  identity: {
    name: ContextFact<string>;
    version: ContextFact<string>;
    description?: ContextFact<string>;
    license?: ContextFact<string>;
    engines?: ContextFact<Record<string, string>>;
    moduleSystem?: ContextFact<'esm' | 'cjs' | 'unknown'>;
    bin?: ContextFact<Record<string, string>>;
  };
  traits: ContextFact<ProjectTrait[]>;
  languages: ContextFact<string[]>;
  runtime: ContextFact<{ name: string; versionRange?: string } | null>;
  packageManager: ContextFact<{ name: string; lockfile?: string } | null>;
  frameworks: {
    application?: ContextFact<string | null>;
    ui?: ContextFact<string | null>;
    cli?: ContextFact<string | null>;
    docs?: ContextFact<string | null>;
    test?: ContextFact<string | null>;
    build?: ContextFact<string | null>;
    lint?: ContextFact<string | null>;
    formatter?: ContextFact<string | null>;
  };
  dependencies: {
    production: ContextFact<CapabilityHit[]>;
    development: ContextFact<CapabilityHit[]>;
    raw: {
      dependencies: string[];
      devDependencies: string[];
      peerDependencies: string[];
    };
  };
  database: ContextFact<DatabaseState>;
  httpServer: ContextFact<HttpServerState>;
  architecture: {
    observedStructure?: ContextFact<ObservedStructure>;
    style?: ContextFact<string>;
  };
  commands: ContextFact<Record<string, string>>;
  testing: {
    runner?: ContextFact<string | null>;
    coverageTool?: ContextFact<string | null>;
    preferTdd?: ContextFact<boolean>;
  };
  cicd: ContextFact<CicdState>;
  securityCapabilities: ContextFact<string[]>;
  business: {
    problemImportance: ContextFact<string>;
    targetUsers: ContextFact<string>;
    businessGoals: ContextFact<string>;
    technicalConstraints: ContextFact<string | null>;
    businessConstraints: ContextFact<string | null>;
    nonGoals: ContextFact<string>;
  };
  unknowns: UnknownField[];
  conflicts: Conflict[];
  recommendations: Recommendation[];
  warnings: string[];
  projectMode: 'existing' | 'greenfield';
  displayType: string;
}

/** Helper to create a ContextFact */
export function fact<T>(
  value: T,
  source: EvidenceSource,
  confidence: Confidence,
  evidence: EvidenceRef[] = []
): ContextFact<T> {
  return { value, source, confidence, evidence };
}
