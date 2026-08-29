import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createRateLimiter } from '@/shared/lib/rate-limiter';
import { generateAgencyLeadEmailHtml } from '@/shared/lib/email/leadTemplates';

// Max 5 lead submissions per 10 minutes per IP
const leadApiLimiter = createRateLimiter({
  max: 5,
  windowMs: 10 * 60 * 1000,
});

// Vercel Serverless Function for sending lead notification emails via Resend
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting by client IP
  const clientIP =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'unknown';

  if (leadApiLimiter.isRateLimited(clientIP)) {
    return res.status(429).json({
      success: false,
      error: 'Zu viele Anfragen. Bitte warten Sie einige Minuten vor der nächsten Anfrage.',
    });
  }

  try {
    const data = req.body;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'umut@codayweb.de';
    const EMAIL_FROM = process.env.EMAIL_FROM || 'Coday Leads <umut@codayweb.de>';

    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY missing - skipping email send.');
      return res.status(200).json({
        success: true,
        message: 'Lead saved (Email skipped - API key missing)',
      });
    }

    const emailHtml = generateAgencyLeadEmailHtml({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      project: data.project || data.projectType || 'Projektanfrage',
      source: data.source || 'API Endpoint',
    });

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [ADMIN_EMAIL],
        subject: `⚡ Neue Anfrage: ${data.name || 'Unbekannt'} (${data.project || data.projectType || 'Allgemein'})`,
        html: emailHtml,
        reply_to: data.email,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error('Resend API error:', errText);
      return res.status(200).json({ success: false, error: errText });
    }

    const result = await emailRes.json();
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Send lead error:', error);
    return res.status(200).json({ success: false, error: 'Email sending failed' });
  }
}
