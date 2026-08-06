/**
 * User answers collected after (or instead of) scan — domain values only.
 */

export interface UserAnswers {
  projectName: string;
  projectDescription: string;
  problemImportance: string;
  targetUsers: string;
  businessGoals: string;
  technicalConstraints: string | null;
  businessConstraints: string | null;
  nonGoals: string;
  /** Only set when user explicitly provides / overrides */
  version?: string;
  language?: string | null;
  framework?: string | null;
  database?: string | null;
  useTDD: boolean;
  strictMode: boolean;
  architecturalStyle?: string;
  authenticationMethod?: string;
  allowedLibraries?: string[];
  forbiddenLibraries?: string[];
  securityRules?: string[];
  testStrategy?: string;
  testCoverage?: string;
  deploymentMethod?: string;
  ciCd?: string;
  ideConfig?: {
    ide: string;
    configFolder: string;
  };
  /** AI prose enrichment — never factual stack */
  aiProse?: {
    enhancedDescription?: string;
    problemImportance?: string;
    businessGoals?: string[];
  };
  aiRecommendations?: Array<{ id: string; topic: string; text: string }>;
}
