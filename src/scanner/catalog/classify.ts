/**
 * Capability catalog — embedded for reliable dist bundling.
 */

import type { CapabilityHit, Confidence } from '../../context/types.js';
import catalogJson from './npm-capabilities.json';

interface CatalogEntry {
  package: string;
  category: string;
  capability: string;
}

const catalog = catalogJson as CatalogEntry[];

export function classifyDependencies(
  dependencies: Record<string, string>,
  source: 'package_manifest' | 'devDependencies'
): CapabilityHit[] {
  const byName = new Map(catalog.map((e) => [e.package, e]));
  const hits: CapabilityHit[] = [];
  const confidence: Confidence = 'confirmed';

  for (const name of Object.keys(dependencies)) {
    const entry = byName.get(name);
    if (entry) {
      hits.push({
        package: name,
        category: entry.category,
        capability: entry.capability,
        source,
        confidence,
      });
    }
  }
  return hits;
}

export function packagesInCategory(hits: CapabilityHit[], category: string): string[] {
  return hits.filter((h) => h.category === category).map((h) => h.package);
}

export function firstCapability(hits: CapabilityHit[], category: string): string | null {
  const hit = hits.find((h) => h.category === category);
  return hit?.package ?? null;
}

export function getCatalog(): CatalogEntry[] {
  return catalog;
}
