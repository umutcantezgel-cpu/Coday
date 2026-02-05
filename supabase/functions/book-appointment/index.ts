// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const payload = await req.json()
        const { name, email, phone, date, time_slot, service_type, notes } = payload

        // Basic Validation
        if (!name || !email || !date || !time_slot) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields (name, email, date, time_slot)' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Init Supabase Admin Client
        const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Server misconfiguration: Missing Supabase keys')
        }

        const supabase = createClient(supabaseUrl, supabaseKey)

        // 1. Check if slot is taken (Simple check)
        const { data: existing } = await supabase
            .from('bookings')
            .select('id')
            .eq('date', date)
            .eq('time_slot', time_slot)
            .single()

        if (existing) {
            return new Response(
                JSON.stringify({ error: 'This time slot is already booked.' }),
                { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
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
            status: 'confirmed' // Auto-confirm for now
        })

        if (insertError) {
            console.error('Database Error:', insertError)
            throw insertError
        }

        // 3. TODO: Send Confirmation Email
        // (Placeholder for Resend/SendGrid integration)
        console.log(`[Booking] New booking for ${email} on ${date} at ${time_slot}`)

        return new Response(
            JSON.stringify({ success: true, message: 'Booking confirmed successfully' }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error('Booking Error:', error)
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : 'Internal Server Error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
