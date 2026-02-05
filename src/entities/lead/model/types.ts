import { z } from 'zod';

/**
 * Zod schema for lead form validation.
 * Validates contact form submissions before storage.
 */
export const LeadSchema = z.object({
    // Contact Information
    name: z.string().min(2, 'Name muss mindestens 2 Zeichen haben'),
    email: z.string().email('Ungültige E-Mail-Adresse'),
    phone: z.string().optional(),
    company: z.string().optional(),

    // Project Details
    message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen haben'),
    project: z.string().optional(),
    budget: z.enum(['5000', '10000', '25000', '50000', 'custom']).optional(),
    timeline: z.enum(['asap', '1-3months', '3-6months', 'unknown']).optional(),

    // Calculator Context (if coming from calculator)
    selectedModuleIds: z.array(z.string()).optional(),
    selectedPackageId: z.string().nullable().optional(),
    totalOneTimeCents: z.number().int().nonnegative().optional(),
    totalMonthlyCents: z.number().int().nonnegative().optional(),

    // Metadata
    source: z.enum(['contact', 'calculator', 'booking', 'packages']).default('contact'),
    createdAt: z.string().datetime().optional(),
});

/**
 * TypeScript type inferred from Zod schema.
 */
export type Lead = z.infer<typeof LeadSchema>;

/**
 * Lead with storage metadata.
 */
export interface StoredLead extends Lead {
    id: string;
    createdAt: string;
    status: 'new' | 'contacted' | 'qualified' | 'closed';
}

/**
 * Lead submission result.
 */
export interface LeadSubmissionResult {
    success: boolean;
    leadId?: string;
    error?: string;
}
