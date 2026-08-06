/**
 * Project trait detection from evidence (not description keywords).
 */

import type { CapabilityHit, ProjectTrait } from '../../context/types.js';
import type { PackageJsonEvidence } from '../types.js';

export function detectTraits(
  pkg: PackageJsonEvidence | undefined,
  capabilities: CapabilityHit[],
  httpFrameworks: string[],
  hasDocsTool: boolean
): ProjectTrait[] {
  const traits = new Set<ProjectTrait>();

  if (pkg?.bin && Object.keys(normalizeBin(pkg.bin)).length > 0) {
    traits.add('cli');
  }

  const cliFw = capabilities.some((c) => c.capability === 'cli-framework');
  if (cliFw) {
    traits.add('cli');
  }

  if (httpFrameworks.length > 0) {
    traits.add('backend_api');
  }

  if (capabilities.some((c) => c.category === 'ui')) {
    traits.add('web_frontend');
  }

  if (capabilities.some((c) => c.package === 'next')) {
    traits.add('fullstack');
  }

  if (capabilities.some((c) => c.category === 'ai')) {
    traits.add('ai_integration');
  }

  if (hasDocsTool) {
    traits.add('documentation');
  }

  return [...traits];
}

function normalizeBin(bin: PackageJsonEvidence['bin']): Record<string, string> {
  if (!bin) return {};
  if (typeof bin === 'string') return { default: bin };
  return bin;
}

export function displayTypeFromTraits(traits: ProjectTrait[]): string {
  if (traits.includes('cli') && !traits.includes('backend_api') && !traits.includes('web_frontend')) {
    return 'CLI Tool';
  }
  if (traits.includes('fullstack')) return 'Fullstack Application';
  if (traits.includes('backend_api') && traits.includes('web_frontend')) return 'Fullstack Application';
  if (traits.includes('backend_api')) return 'Backend API';
  if (traits.includes('web_frontend')) return 'Web Frontend';
  if (traits.includes('library')) return 'Library';
  if (traits.includes('documentation') && traits.length === 1) return 'Documentation';
  if (traits.length === 0) return 'Unknown';
  return traits.map((t) => t.replace(/_/g, ' ')).join(' + ');
}
