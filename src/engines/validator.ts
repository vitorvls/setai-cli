import type { ProjectInfo } from '../types/project-info.js';
import { tValidation } from '../utils/i18n.js';

/**
 * Validator - Valida inputs do usuário e estrutura do projeto
 */

export function validateProjectInfo(projectInfo: ProjectInfo): void {
  if (!projectInfo.projectName || projectInfo.projectName.trim().length === 0) {
    throw new Error(tValidation('project.name.required'));
  }

  if (!projectInfo.projectDescription || projectInfo.projectDescription.trim().length === 0) {
    throw new Error(tValidation('project.description.required'));
  }

  if (!projectInfo.problemImportance || projectInfo.problemImportance.trim().length === 0) {
    throw new Error(tValidation('project.problemImportance.required'));
  }

  if (!projectInfo.targetUsers || projectInfo.targetUsers.trim().length === 0) {
    throw new Error(tValidation('project.targetUsers.required'));
  }

  if (!projectInfo.businessGoals || projectInfo.businessGoals.trim().length === 0) {
    throw new Error(tValidation('project.businessGoals.required'));
  }

  if (!projectInfo.nonGoals || projectInfo.nonGoals.trim().length === 0) {
    throw new Error(tValidation('project.nonGoals.required'));
  }

  if (!projectInfo.version || projectInfo.version.trim().length === 0) {
    throw new Error(tValidation('project.version.required'));
  }

  if (!projectInfo.techStack.language || projectInfo.techStack.language.trim().length === 0) {
    throw new Error(tValidation('tech.language.required'));
  }
}
