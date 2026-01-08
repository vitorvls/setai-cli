/**
 * Tipos para configuração de IDEs e pastas de configuração
 */

export type IDE = 'cursor' | 'vscode' | 'jetbrains' | 'other';

export interface IDEConfig {
  ide: IDE;
  configFolder: string; // Ex: '.cursor', '.ai', '.vscode', etc.
  name: string; // Nome amigável da IDE
}

export const IDE_CONFIGS: Record<IDE, IDEConfig> = {
  cursor: {
    ide: 'cursor',
    configFolder: '.cursor',
    name: 'Cursor',
  },
  vscode: {
    ide: 'vscode',
    configFolder: '.vscode',
    name: 'VS Code',
  },
  jetbrains: {
    ide: 'jetbrains',
    configFolder: '.idea',
    name: 'JetBrains (IntelliJ, WebStorm, etc.)',
  },
  other: {
    ide: 'other',
    configFolder: '.ai',
    name: 'Outra IDE / Genérico (.ai)',
  },
};

