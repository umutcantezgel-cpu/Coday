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
export const leadSubmissionSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    /** Optional so a phone-only quick request is possible; see refine below. */
    email: z
      .string()
      .trim()
      .max(254)
      .optional()
      .transform((v) => (v ? v : undefined))
      .refine((v) => !v || z.string().email().safeParse(v).success, {
        message: 'Invalid email',
      }),
    phone: optionalTrimmed(40),
    company: optionalTrimmed(120),
    message: optionalTrimmed(4000),
    project: optionalTrimmed(160),
    source: optionalTrimmed(80),
    /**
     * Where the enquiry came from, as data rather than prose.
     *
     * Five of the six forms used to fold this into `message` — "Anfrage von
     * lokaler SEO-Landingpage für Wetzlar… Telefon: …" — and the customer
     * confirmation quotes `message` back verbatim, so people were shown our
     * internal labels and their own phone number. As fields they can drive the
     * agency notification and the customer's copy instead, and `message` holds
     * only what the person actually typed.
     */
    cityName: optionalTrimmed(80),
    district: optionalTrimmed(80),
    formKind: z
      .enum([
        'contact',
        'quick',
        'local',
        'gov',
        'newsletter',
        'website_check',
        'industries',
        'sticky',
      ])
      .optional(),
    /** Industry slug for industry landing pages, e.g. "gastronomie". */
    industry: optionalTrimmed(80),
    /** Website-check: the address the owner should look at. */
    websiteUrl: z
      .string()
      .trim()
      .max(300)
      .optional()
      .transform((v) => (v ? v : undefined))
      .refine((v) => !v || /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i.test(v), {
        message: 'Invalid website url',
      }),
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
  })
  .refine(
    (data) => Boolean(data.email || (data.phone && data.phone.replace(/\D/g, '').length >= 6)),
    {
      message: 'Provide an e-mail address or a phone number',
      path: ['email'],
    }
  );

export type LeadSubmissionInput = z.input<typeof leadSubmissionSchema>;
export type LeadSubmission = z.output<typeof leadSubmissionSchema>;
