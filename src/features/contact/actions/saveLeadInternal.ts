'use server';

import { headers } from 'next/headers';
import { createRateLimiter } from '@/shared/lib/rate-limiter';
import { createAdminClient } from '@/shared/lib/supabase/server';
import {
  generateAgencyLeadEmailHtml,
  generateCustomerConfirmationEmailHtml,
  getAgencyLeadSubject,
  getCustomerConfirmationSubject,
  LeadEmailData,
} from '@/shared/lib/email/leadTemplates';
import { sendEmail, getAdminEmail, isEmailConfigured } from '@/shared/lib/email/sendEmail';
import {
  leadSubmissionSchema,
  type LeadSubmissionInput,
} from '@/features/contact/schema/leadSubmission';
import { calculatePackageLeadScore, HOT_LEAD_THRESHOLD } from '@/features/contact/schema/leadScore';
import { PACKAGES } from '@/shared/data/packages';
import { getModule } from '@/shared/data/modules';

// Max 5 lead submissions per 10 minutes per IP
const leadRateLimiter = createRateLimiter({
  max: 5,
  windowMs: 10 * 60 * 1000,
});

/** Payload accepted from every contact form on the site. Validated at runtime with zod. */
export type LeadSubmissionPayload = LeadSubmissionInput;

export interface LeadSubmissionResult {
  success: boolean;
  /** e.g. "both_sent:stored" — e-mail status and database status. */
  status?: string;
  score?: number;
  error?: string;
}

async function notifySlack(text: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  } catch (err) {
    console.warn('Slack webhook failed (non-blocking):', err);
  }
}

export async function saveLeadInternalAction(
  data: LeadSubmissionPayload
): Promise<LeadSubmissionResult> {
  try {
    // 0. Rate limiting by client IP
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    const clientIp = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : headerList.get('x-real-ip') || '127.0.0.1';

    if (leadRateLimiter.isRateLimited(clientIp)) {
      return {
        success: false,
        error:
          'Zu viele Anfragen. Bitte warten Sie einige Minuten, bevor Sie eine weitere Nachricht senden.',
      };
    }

    // 1. Validate and normalise. Names and ids from the client are never trusted.
    const parsed = leadSubmissionSchema.safeParse(data);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return {
        success: false,
        error: `VALIDATION_ERROR: ${first ? `${first.path.join('.')} ${first.message}` : 'invalid payload'}`,
      };
    }
    const lead = parsed.data;

    // 2. Honeypot: pretend success, never send or store anything.
    if (lead._bot_trap_field && lead._bot_trap_field.trim().length > 0) {
      return { success: true, status: 'honeypot_dropped' };
    }

    // 3. Resolve package and add-ons server-side
    const pkg = lead.packageId ? PACKAGES[lead.packageId] : null;
    const packageName = pkg ? pkg.name[lead.locale] : undefined;
    const addons = lead.addonIds
      .map((id) => getModule(id))
      .filter((m): m is NonNullable<typeof m> => !!m)
      .map((m) => ({ id: m.id, name: m.plainName[lead.locale], category: m.category }));

    const score = calculatePackageLeadScore({
      packageId: lead.packageId,
      addonIds: lead.addonIds,
      phone: lead.phone,
      message: lead.message,
    });

    const emailPayload: LeadEmailData = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      message: lead.message,
      project: lead.project,
      packageId: pkg?.id,
      packageTier: pkg?.tier,
      packageName: packageName || lead.project,
      packageLegacyName: pkg?.legacyName.de,
      addons,
      deliveryDays: pkg?.deliveryDays,
      source: lead.source,
      locale: lead.locale,
      score,
    };

    const summaryLine = `${lead.name} · ${packageName || lead.project || 'Projekt'} · ${lead.email}${lead.phone ? ` · ${lead.phone}` : ''}`;

    // 4. Persist first (non-blocking). Skipped silently when Supabase is not configured.
    let dbStatus: 'stored' | 'skipped' | 'failed' = 'skipped';
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createAdminClient();
        const { error: dbError } = await supabase.from('leads').insert([
          {
            name: lead.name,
            email: lead.email,
            phone: lead.phone ?? null,
            company: lead.company ?? null,
            message: lead.message ?? null,
            project: packageName || lead.project || null,
            source: lead.source ?? null,
            selected_package_id: pkg?.id ?? null,
            package_name: packageName ?? null,
            selected_module_ids: pkg ? [pkg.basisModuleId, ...lead.addonIds] : lead.addonIds,
            delivery_days: pkg?.deliveryDays ?? null,
            locale: lead.locale,
            score,
          },
        ]);
        if (dbError) {
          console.error('Supabase lead insert failed (non-blocking):', dbError);
          dbStatus = 'failed';
        } else {
          dbStatus = 'stored';
        }
      } catch (dbErr) {
        console.error('Supabase admin client error (non-blocking):', dbErr);
        dbStatus = 'failed';
      }
    }

    // 5. E-mails: agency notification and customer confirmation, sent in parallel,
    //    each with retries and sender fallback (see sendEmail).
    if (!isEmailConfigured()) {
      console.error('LEAD_EMAIL_NOT_CONFIGURED', JSON.stringify({ summaryLine, dbStatus }));
      await notifySlack(`⚠️ Lead ohne E-Mail-Versand (RESEND_API_KEY fehlt): ${summaryLine}`);
      if (dbStatus === 'stored') {
        return { success: true, status: `email_not_configured:${dbStatus}`, score };
      }
      return {
        success: false,
        error: 'MISSING_ENV: RESEND_API_KEY is not defined in Vercel',
      };
    }

    const adminEmail = getAdminEmail();
    const primaryAdmin = Array.isArray(adminEmail) ? adminEmail[0] : adminEmail;
    const [adminRes, customerRes] = await Promise.all([
      sendEmail({
        kind: 'lead_agency',
        to: adminEmail,
        subject: getAgencyLeadSubject(emailPayload),
        html: generateAgencyLeadEmailHtml(emailPayload),
        replyTo: lead.email,
        tags: [{ name: 'kind', value: 'lead_agency' }],
      }),
      sendEmail({
        kind: 'lead_customer',
        to: lead.email,
        subject: getCustomerConfirmationSubject(emailPayload),
        html: generateCustomerConfirmationEmailHtml(emailPayload),
        replyTo: primaryAdmin,
        tags: [{ name: 'kind', value: 'lead_customer' }],
      }),
    ]);

    const emailStatus =
      adminRes.ok && customerRes.ok
        ? 'both_sent'
        : adminRes.ok
          ? 'admin_sent'
          : customerRes.ok
            ? 'customer_sent'
            : 'none_sent';

    if (!adminRes.ok) {
      // The agency must never lose a lead: log the full lead and ping Slack.
      console.error(
        'LEAD_EMAIL_FAILED',
        JSON.stringify({ summaryLine, dbStatus, error: adminRes.error, lead: emailPayload })
      );
      await notifySlack(
        `🚨 Lead-E-Mail konnte nicht zugestellt werden (${adminRes.error ?? 'unbekannt'}). Lead: ${summaryLine}${dbStatus === 'stored' ? ' (in Supabase gespeichert)' : ''}`
      );
    } else if (score >= HOT_LEAD_THRESHOLD) {
      await notifySlack(`🚀 Hot Lead (Score ${score}/10): ${summaryLine}`);
    }

    const captured = adminRes.ok || customerRes.ok || dbStatus === 'stored';
    if (!captured) {
      return {
        success: false,
        status: `${emailStatus}:${dbStatus}`,
        error: 'DELIVERY_ERROR: ' + (adminRes.error ?? customerRes.error ?? 'unknown'),
      };
    }

    return { success: true, status: `${emailStatus}:${dbStatus}`, score };
  } catch (error) {
    console.error('Internal Save Error:', error);
    return { success: false, error: 'CATCH_ERROR: ' + String(error) };
  }
}
