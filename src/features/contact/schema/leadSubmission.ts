import { z } from 'zod';
import { normalizePackageId, type PackageId } from '@/shared/data/packages';
import { ADDON_MODULES } from '@/shared/data/modules';

const ADDON_ID_SET = new Set(ADDON_MODULES.map((m) => m.id));

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

/**
 * Runtime validation for `saveLeadInternalAction`.
 *
 * Every field except name and e-mail is optional so the six non-package callers
 * (newsletter, local pages, public sector, quick contact) keep working. Package
 * and add-on ids are normalised here; display names are never accepted from the
 * client and are re-derived on the server from `packages.ts` / `modules.ts`.
 */
export const leadSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: optionalTrimmed(40),
  company: optionalTrimmed(120),
  message: optionalTrimmed(4000),
  project: optionalTrimmed(160),
  source: optionalTrimmed(80),
  locale: z.enum(['de', 'en']).default('de'),
  /** Package id or alias; unknown values become `null` instead of failing. */
  packageId: z
    .string()
    .max(40)
    .optional()
    .transform((v): PackageId | null => normalizePackageId(v)),
  /** Add-on module ids only; unknown ids are dropped. */
  addonIds: z
    .array(z.string().max(40))
    .max(20)
    .default([])
    .transform((ids) => Array.from(new Set(ids.filter((id) => ADDON_ID_SET.has(id))))),
  /** Honeypot. Bots fill it; humans never see it. */
  _bot_trap_field: z.string().max(200).optional(),
});

export type LeadSubmissionInput = z.input<typeof leadSubmissionSchema>;
export type LeadSubmission = z.output<typeof leadSubmissionSchema>;
