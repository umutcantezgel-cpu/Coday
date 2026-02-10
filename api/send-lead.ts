import type { VercelRequest, VercelResponse } from '@vercel/node';

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

  try {
    const data = req.body;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY missing - skipping email send.');
      return res.status(200).json({
        success: true,
        message: 'Lead saved (Email skipped - API key missing)',
      });
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Coday Leads <onboarding@resend.dev>',
        to: ['umut@codayweb.de'],
        subject: `Neue Anfrage: ${data.name} - ${data.project || data.projectType || 'Allgemein'}`,
        html: `
          <h2>Neue Anfrage über codayweb.de</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Firma</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Projektart</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.project || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.budget || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Zeitplan</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.timeline || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Nachricht</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.message || '-'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Quelle</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.source || '-'}</td></tr>
          </table>
        `,
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
