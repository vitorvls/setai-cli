/**
 * Public exports for the context compiler.
 */

export type * from './types.js';
export { fact } from './types.js';
export { resolveFacts } from './fact-resolver.js';
export { compileTemplateData } from './compiler.js';
export { useEvidenceCompiler } from './feature-flags.js';
