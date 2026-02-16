// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!supabaseUrl || !supabaseKey) {
    console.error('Server misconfiguration: Missing Supabase keys');
    return new Response(
      JSON.stringify({ error: 'Server misconfiguration: Missing Supabase keys' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Handle GET: Fetch availability (booked slots)
  if (req.method === 'GET') {
    try {
      const url = new URL(req.url);
      const startDate = url.searchParams.get('start') || new Date().toISOString().split('T')[0];
      const endDate = url.searchParams.get('end');

      console.log(`[GET] Fetching bookings from ${startDate} to ${endDate || 'infinity'}`);

      let query = supabase.from('bookings').select('date,time_slot').gte('date', startDate);

      if (endDate) {
        query = query.lte('date', endDate);
      }

      const { data, error } = await query;

      if (error) {
        console.error('[GET] Supabase Query Error:', error);
        throw error;
      }

      console.log(`[GET] Found ${data?.length} bookings`);

      return new Response(JSON.stringify({ bookings: data || [] }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err: any) {
      console.error('[GET] Unexpected Error:', err);
      return new Response(
        JSON.stringify({
          error: err.message || 'Failed to fetch bookings',
          details: err,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }

  // Handle POST: Create Booking
  if (req.method === 'POST') {
    try {
      const payload = await req.json();
      const { name, email, phone, date, time_slot, service_type, notes } = payload;

      console.log(`[POST] New booking request: ${email} on ${date} at ${time_slot}`);

      if (!name || !email || !date || !time_slot) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 1. Check if slot is taken
      const { data: existing, error: checkError } = await supabase
        .from('bookings')
        .select('id')
        .eq('date', date)
        .eq('time_slot', time_slot)
        .single();

      if (existing) {
        return new Response(JSON.stringify({ error: 'This time slot is already booked.' }), {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 2. Insert Booking
      const { error: insertError } = await supabase.from('bookings').insert({
        name,
        email,
        phone,
        date,
        time_slot,
        service_type,
        notes,
        status: 'confirmed',
      });

      if (insertError) {
        console.error('[POST] Insert Error:', insertError);
        throw insertError;
      }

      // 3. Send Emails via Resend
      let emailStatus = 'skipped';
      if (resendApiKey) {
        try {
          const resendModule = await import('npm:resend');
          const resend = new resendModule.Resend(resendApiKey);

          // Email 1: Confirmation to the CUSTOMER
          await resend.emails.send({
            from: 'Coday Booking <onboarding@resend.dev>',
            to: [email],
            subject: `Terminbestätigung: ${date} um ${time_slot}`,
            html: `
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 16px;">
                <h2 style="color: #111827; margin-bottom: 8px;">Termin bestätigt ✅</h2>
                <p style="color: #374151;">Hallo ${name},</p>
                <p style="color: #374151;">Ihr Beratungstermin wurde erfolgreich gebucht.</p>
                <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
                  <tr><td style="padding: 8px 0; color: #6b7280;">Datum</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${date}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Uhrzeit</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${time_slot} Uhr</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280;">Service</td><td style="padding: 8px 0; font-weight: 600; color: #111827;">${service_type || 'Beratung'}</td></tr>
                </table>
                <p style="color: #374151;">Wir freuen uns auf das Gespräch!</p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
                <p style="color: #9ca3af; font-size: 13px;">Coday Agency · codayweb.de</p>
              </div>
            `,
          });

          // Email 2: Notification to ADMIN with full registration details
          await resend.emails.send({
            from: 'Coday Booking <onboarding@resend.dev>',
            to: ['umut@codayweb.de'],
            subject: `📅 Neue Buchung: ${name} — ${date} um ${time_slot}`,
            html: `
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f0fdf4; border-radius: 16px; border: 1px solid #bbf7d0;">
                <h2 style="color: #166534; margin-bottom: 16px;">📅 Neue Terminbuchung eingegangen</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Name</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${name}</td></tr>
                  <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">E-Mail</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
                  <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Telefon</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${phone || '—'}</td></tr>
                  <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Datum</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${date}</td></tr>
                  <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Uhrzeit</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${time_slot} Uhr</td></tr>
                  <tr><td style="padding: 10px 12px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Service</td><td style="padding: 10px 12px; font-weight: 600; color: #111827; border-bottom: 1px solid #e5e7eb;">${service_type || 'Beratung'}</td></tr>
                  <tr><td style="padding: 10px 12px; color: #6b7280;">Notizen</td><td style="padding: 10px 12px; color: #111827;">${notes || 'Keine Notizen'}</td></tr>
                </table>
                <hr style="border: none; border-top: 1px solid #bbf7d0; margin: 24px 0;" />
                <p style="color: #6b7280; font-size: 13px;">Automatisch generiert von Coday Booking System</p>
              </div>
            `,
          });

          emailStatus = 'sent';
          console.log('[POST] Confirmation + Admin notification emails sent successfully');
        } catch (emailErr) {
          console.error('[POST] Email Error:', emailErr);
          emailStatus = 'failed';
        }
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Booking confirmed', email: emailStatus }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error: any) {
      console.error('[POST] Booking Error:', error);
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'Internal Server Error',
          details: error,
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }

  return new Response('Method not allowed', { status: 405, headers: corsHeaders });
});
