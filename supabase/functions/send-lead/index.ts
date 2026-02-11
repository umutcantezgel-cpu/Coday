import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!resendApiKey) {
    return new Response(
      JSON.stringify({ error: 'Server misconfiguration: Missing RESEND_API_KEY' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

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
        from: 'Coday Contact <onboarding@resend.dev>',
        to: ['umut@codayweb.de', 'umut.yildirim@coday.de'], // Fallback to multiple emails
        subject: `Neue Anfrage: ${name} (${project || 'Allgemein'})`,
        html: `
          <h2>Neue Kontaktanfrage</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || '-'}</p>
          <p><strong>Firma:</strong> ${company || '-'}</p>
          <p><strong>Projekt:</strong> ${project || '-'}</p>
          <br/>
          <h3>Nachricht:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        `,
        reply_to: email,
      });

      return new Response(JSON.stringify({ success: true, data: emailResult }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      console.error('Email send error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response('Method not allowed', { status: 405, headers: corsHeaders });
});
