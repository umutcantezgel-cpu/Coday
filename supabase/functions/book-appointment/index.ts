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

      // 3. Send Email via Resend
      let emailStatus = 'skipped';
      if (resendApiKey) {
        try {
          const resendModule = await import('npm:resend');
          const resend = new resendModule.Resend(resendApiKey);
          await resend.emails.send({
            from: 'Coday Booking <onboarding@resend.dev>',
            to: ['umut@codayweb.de', email], // Send to admin and user
            subject: `Terminbestätigung: ${date} um ${time_slot}`,
            html: `
                            <h2>Termin bestätigt!</h2>
                            <p>Hallo ${name},</p>
                            <p>Ihr Termin wurde erfolgreich gebucht.</p>
                            <ul>
                                <li><strong>Datum:</strong> ${date}</li>
                                <li><strong>Uhrzeit:</strong> ${time_slot}</li>
                                <li><strong>Service:</strong> ${service_type || 'Beratung'}</li>
                            </ul>
                            <p>Wir freuen uns auf das Gespräch!</p>
                            <hr />
                            <p><small>Coday Agency</small></p>
                        `,
          });
          emailStatus = 'sent';
          console.log('[POST] Email sent successfully');
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
