import { PACKAGES, type PackageId } from '@/shared/data/packages';

export interface LeadScoreInput {
  packageId: PackageId | null;
  addonIds: string[];
  phone?: string;
  message?: string;
}

const REGION_HINTS = ['wetzlar', 'gießen', 'giessen', 'hessen', 'marburg', 'limburg', 'frankfurt'];

/**
 * Package-aware lead score, 0–10.
 *
 * tier 1–4 → 1–4 points · each add-on +1 (max 3) · phone +1 ·
 * message > 100 chars +1 · message mentions the home region +1
 */
export function calculatePackageLeadScore(input: LeadScoreInput): number {
  let score = 0;

  if (input.packageId) score += PACKAGES[input.packageId].tier;
  score += Math.min(input.addonIds.length, 3);
  if (input.phone && input.phone.trim().length > 5) score += 1;

  const message = (input.message ?? '').trim();
  if (message.length > 100) score += 1;
  const lower = message.toLowerCase();
  if (REGION_HINTS.some((hint) => lower.includes(hint))) score += 1;

  return Math.min(score, 10);
}

/** Leads at or above this score trigger the optional Slack notification. */
export const HOT_LEAD_THRESHOLD = 7;
