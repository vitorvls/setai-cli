/**
 * Normalize questionnaire sentinels to domain values.
 * Never store localized strings as domain facts.
 */

export const DOMAIN_NONE = null;
export const DOMAIN_OTHER = '__other__';

/** Canonical choice values for Inquirer (value ≠ display name) */
export function noneChoice(label: string): { name: string; value: null } {
  return { name: label, value: null };
}

export function otherChoice(label: string): { name: string; value: typeof DOMAIN_OTHER } {
  return { name: label, value: DOMAIN_OTHER };
}

export function normalizeOptionalStackValue(
  value: string | null | undefined
): string | null {
  if (value === null || value === undefined) return null;
  const v = value.trim();
  if (!v) return null;
  // Legacy leaks / localized sentinels
  const lower = v.toLowerCase();
  if (
    lower === 'none' ||
    lower === 'nenhum' ||
    lower === 'ninguno' ||
    lower === 'templates.none' ||
    lower === 'n/a' ||
    v === DOMAIN_OTHER ||
    lower === 'other' ||
    lower === 'outro' ||
    lower === 'otro' ||
    lower === 'templates.other'
  ) {
    return null;
  }
  return v;
}

export function isNoneConstraint(value: string | null | undefined): boolean {
  if (value === null || value === undefined) return true;
  const lower = value.trim().toLowerCase();
  return (
    lower === '' ||
    lower === 'none' ||
    lower === 'nenhuma' ||
    lower === 'ninguna' ||
    lower === 'templates.constraints.none'
  );
}
