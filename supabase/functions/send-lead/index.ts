import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const ALLOWED_ORIGINS = ['https://www.codayweb.de', 'https://codayweb.de', 'http://localhost:3000'];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('Origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!resendApiKey) {
    console.error('Server misconfiguration: Missing RESEND_API_KEY');
    return new Response(JSON.stringify({ error: 'Server misconfiguration' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Configurable email sender — set EMAIL_FROM in Supabase Edge Function secrets
  // once codayweb.de domain is verified in Resend
  const EMAIL_FROM = Deno.env.get('EMAIL_FROM') || 'Coday Contact <onboarding@resend.dev>';
  // Resend Sandbox requires emails to be sent to the verified account owner email
  const ADMIN_EMAIL = 'umutcantezgel@gmail.com';

  if (req.method === 'POST') {
    try {
      const payload = await req.json();
      const { name, email, phone, message, project, company } = payload;

      if (!email || !message) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Dynamic import for Resend
      const { Resend } = await import('npm:resend');
      const resend = new Resend(resendApiKey);

      const emailResult = await resend.emails.send({
        from: EMAIL_FROM,
        to: [ADMIN_EMAIL],
        subject: `Neue Anfrage: ${name || 'Unbekannt'} (${project || 'Allgemein'})`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #eff6ff; border-radius: 16px; border: 1px solid #bfdbfe;">
            <h2 style="color: #1e40af; margin-bottom: 16px;">📩 Neue Kontaktanfrage</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Name</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${name || '—'}</td></tr>
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">E-Mail</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Telefon</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${phone || '—'}</td></tr>
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Firma</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${company || '—'}</td></tr>
              <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Projekt</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${project || '—'}</td></tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 12px;">
              <h3 style="color: #374151; margin: 0 0 8px;">Nachricht:</h3>
              <p style="white-space: pre-wrap; color: #374151; margin: 0;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #bfdbfe; margin: 24px 0;" />
            <p style="color: #6b7280; font-size: 13px;">Automatisch generiert von Coday Contact System</p>
          </div>
        `,
        reply_to: email,
      });

      return new Response(JSON.stringify({ success: true, data: emailResult }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Email send error:', error);
      return new Response(
        JSON.stringify({ error: error instanceof Error ? error.message : 'Email send failed' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  }

  return new Response('Method not allowed', { status: 405, headers: corsHeaders });
});
