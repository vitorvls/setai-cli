/**
 * Tipos para informações do projeto coletadas do usuário
 */

import type { AIGeneratedContent } from '../services/ai-service.js';

export interface ProjectInfo {
  projectName: string;
  projectDescription: string;
  problemImportance: string;
  targetUsers: string;
  businessGoals: string;
  technicalConstraints: string;
  businessConstraints: string;
  nonGoals: string;
  version: string;
  techStack: TechStack;
  preferences: Preferences;
  ideConfig?: {
    ide: string;
    configFolder: string;
  };
  advanced?: AdvancedConfig;
  aiGenerated?: AIGeneratedContent;
}

export interface TechStack {
  language: string;
  framework?: string | undefined;
  database?: string | undefined;
}

export interface Preferences {
  useTDD: boolean;
  strictMode: boolean;
}

export interface AdvancedConfig {
  // Grupos de configuração
  selectedGroups?: string[]; // IDs dos grupos selecionados
  
  // Grupo 1: AI Usage Rules
  preferredAIModels?: {
    architecture?: string;
    implementation?: string;
    refactoring?: string;
    debug?: string;
    boilerplate?: string;
  };
  aiUsageRules?: {
    allowArchitecturePlanning?: boolean;
    allowCodeGeneration?: boolean;
    allowRefactoring?: boolean;
    allowDebug?: boolean;
    allowDocumentation?: boolean;
  };
  
  // Grupo 2: Responsabilidades
  responsibilities?: {
    cto?: string;
    techLead?: string;
    dev?: string;
  };
  customConstraints?: string;
  
  // Grupo 3: Bibliotecas
  allowedLibraries?: string[];
  forbiddenLibraries?: string[];
  libraryNotes?: string;
  
  // Grupo 4: Arquitetura Detalhada
  architecturalDecisions?: string[];
  designPatterns?: string[];
  architecturalStyle?: string;
  
  // Grupo 5: Segurança
  securityRules?: string[];
  authenticationMethod?: string;
  dataProtection?: string;
  
  // Grupo 6: Testes
  testStrategy?: string;
  testCoverage?: string;
  testTools?: string[];
  
  // Grupo 7: Deploy
  deploymentMethod?: string;
  infrastructure?: string;
  ciCd?: string;
  environments?: string;
  
  // Grupo 8: Documentação
  documentationStandards?: string;
  apiDocumentation?: string;
  codeComments?: string;
}
