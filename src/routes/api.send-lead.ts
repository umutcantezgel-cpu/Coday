/**
 * Resource Route: /api/send-lead
 * Sends lead notification emails via Resend.
 *
 * Security:
 * - Input validation via Zod schema
 * - HTML escaping to prevent XSS in email templates
 */
import { z } from 'zod';

// ── Input Validation Schema ──
const LeadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(30).optional().default(''),
  company: z.string().max(200).optional().default(''),
  project: z.string().max(200).optional().default(''),
  projectType: z.string().max(200).optional().default(''),
  budget: z.string().max(100).optional().default(''),
  timeline: z.string().max(200).optional().default(''),
  message: z.string().max(5000).optional().default(''),
});

// ── HTML Escaping ──
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function safeField(value: string | undefined): string {
  return escapeHtml(value || '-');
}

export async function action({ request }: { request: Request }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const rawData = await request.json();

    // ── Validate Input ──
    const parsed = LeadSchema.safeParse(rawData);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: 'Invalid input',
          details: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const data = parsed.data;

    const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY missing in environment variables.');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Configuration Error',
          details: 'Email service not configured (Missing RESEND_API_KEY).',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Dynamic import to avoid bundling issues
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);

    const projectLabel = data.project || data.projectType || 'Allgemein';

    const emailResult = await resend.emails.send({
      from: 'Coday Leads <onboarding@resend.dev>',
      to: ['umut@codayweb.de'],
      subject: `Neue Anfrage: ${safeField(data.name)} - ${safeField(projectLabel)}`,
      html: `
        <h2>Neue Anfrage über codayweb.de</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeField(data.name)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeField(data.email)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeField(data.phone)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Firma</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeField(data.company)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Projektart</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeField(projectLabel)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeField(data.budget)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Zeitplan</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeField(data.timeline)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; vertical-align: top;"><strong>Nachricht</strong></td><td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${safeField(data.message)}</td></tr>
        </table>
      `,
    });

    return new Response(JSON.stringify({ success: true, data: emailResult }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Send lead error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Email sending failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
