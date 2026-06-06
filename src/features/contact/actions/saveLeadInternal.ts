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
      return { success: false, error: 'Database error occurred.' };
    }

    // Fire-and-forget email notification via Supabase Edge Function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        await fetch(`${supabaseUrl}/functions/v1/send-lead`, {
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
      } catch (emailError) {
        // Email failure should not block the lead submission
        console.error('Email notification failed (non-blocking):', emailError);
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Internal Save Error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
