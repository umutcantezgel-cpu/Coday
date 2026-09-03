/**
 * Shapes of the long-form package copy in `public/locales/{de,en}/pricing.json`.
 * Read with `t.raw(...)` and cast to these types.
 */

export interface PackageFeatureCopy {
  label: string;
  hint: string;
}

export interface PackageNotIncludedCopy {
  label: string;
  addon_id: string;
}

export interface PackageCopy {
  name: string;
  subtitle: string;
  badge?: string;
  for_who: string;
  example: string;
  outcome: string;
  features: PackageFeatureCopy[];
  not_included: PackageNotIncludedCopy[];
  cta: string;
}

export interface AddonCopy {
  name: string;
  benefit: string;
  for_who: string;
  type: 'optional' | 'care';
}

export type ComparisonValue = 'included' | 'addon' | 'no' | 'voluntary' | (string & {});

export interface ComparisonRowCopy {
  key: string;
  label: string;
  starter: ComparisonValue;
  business: ComparisonValue;
  corporate: ComparisonValue;
  enterprise: ComparisonValue;
}

export interface FaqItemCopy {
  question: string;
  answer: string;
}

export interface StepCopy {
  title: string;
  text: string;
}

export interface PillarCopy {
  subtitle: string;
  title: string;
  text: string;
}

export const COMPARISON_TOKENS = ['included', 'addon', 'no', 'voluntary'] as const;
export type ComparisonToken = (typeof COMPARISON_TOKENS)[number];

export function isComparisonToken(value: string): value is ComparisonToken {
  return (COMPARISON_TOKENS as readonly string[]).includes(value);
}
