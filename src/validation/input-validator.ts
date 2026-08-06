/**
 * Input validation for user answers.
 */

import type { UserAnswers } from '../context/user-answers.js';
import { tValidation } from '../utils/i18n.js';

export function validateUserAnswers(answers: UserAnswers): void {
  if (!answers.projectName?.trim()) {
    throw new Error(tValidation('project.name.required'));
  }
  if (!answers.projectDescription?.trim()) {
    throw new Error(tValidation('project.description.required'));
  }
  if (!answers.problemImportance?.trim()) {
    throw new Error(tValidation('project.problemImportance.required'));
  }
  if (!answers.targetUsers?.trim()) {
    throw new Error(tValidation('project.targetUsers.required'));
  }
  if (!answers.businessGoals?.trim()) {
    throw new Error(tValidation('project.businessGoals.required'));
  }
  if (!answers.nonGoals?.trim()) {
    throw new Error(tValidation('project.nonGoals.required'));
  }
  if (answers.version && !/^\d+\.\d+\.\d+(-.*)?$/.test(answers.version.trim())) {
    throw new Error(tValidation('project.version.invalid'));
  }
}
