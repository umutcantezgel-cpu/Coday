/**
 * Resource Route: /api/send-lead
 * Sends lead notification emails via Resend.
 */

export async function action({ request }: { request: Request }) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.json();
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY missing - skipping email send. Lead saved to DB.');
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Lead saved (Email skipped - Config missing)',
          data,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Dynamic import to avoid bundling issues
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);

    const emailResult = await resend.emails.send({
      from: 'Coday Leads <leads@coday.de>',
      to: ['kontakt@coday.de'],
      subject: `Neue Anfrage: ${data.name} - ${data.projectType || 'Allgemein'}`,
      html: `
        <h2>Neue Anfrage über codayweb.de</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.name || '-'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.email || '-'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.phone || '-'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Firma</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.company || '-'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Projektart</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.projectType || '-'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.budget || '-'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Zeitplan</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.timeline || '-'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Nachricht</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.message || '-'}</td></tr>
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
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
