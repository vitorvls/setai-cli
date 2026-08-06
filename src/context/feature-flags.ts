/**
 * Feature flags for the evidence compiler migration.
 * Evidence path is the default; legacy template-helpers path is removed.
 */

export function useEvidenceCompiler(): boolean {
  const env = process.env.SETAI_EVIDENCE_COMPILER;
  if (env === '0' || env === 'false') {
    return false;
  }
  // Default ON — evidence-first is the product path
  return true;
}
