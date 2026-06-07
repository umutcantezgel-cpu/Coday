'use server';

import { createAdminClient } from '@/shared/lib/supabase/server';

export async function saveLeadInternalAction(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  project?: string;
  source?: string;
}) {
  try {
    const supabase = createAdminClient();

    const { error: dbError } = await supabase.from('leads').insert([
      {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        message: data.message,
        project: data.project,
        source: data.source || 'contact',
      },
    ]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      return { success: false, error: 'DB_ERROR: ' + JSON.stringify(dbError) };
    }

    // Fire-and-forget email notification via Supabase Edge Function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      return {
        success: false,
        error: 'MISSING_ENV: NEXT_PUBLIC_SUPABASE_URL is not defined in Vercel',
      };
    }
    if (!supabaseAnonKey) {
      return {
        success: false,
        error: 'MISSING_ENV: NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined in Vercel',
      };
    }

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const baseUrl = supabaseUrl.endsWith('/') ? supabaseUrl.slice(0, -1) : supabaseUrl;
        const res = await fetch(`${baseUrl}/functions/v1/send-lead`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone || '',
            company: data.company || '',
            project: data.project || '',
            message: data.message || '',
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error(`Edge Function Error (${res.status}):`, errorText);
          // Return the edge function error to UI for debugging
          return { success: false, error: `EMAIL_ERROR (${res.status}): ` + errorText };
        } else {
          console.log('Edge Function success:', await res.json());
        }
      } catch (emailError) {
        // Return fetch error to UI
        return { success: false, error: 'FETCH_ERROR: ' + String(emailError) };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Internal Save Error:', error);
    return { success: false, error: 'CATCH_ERROR: ' + String(error) };
  }
}
