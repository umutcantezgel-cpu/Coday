'use server';

import { createAdminClient } from '@/shared/lib/supabase/server';

export async function saveLeadInternalAction(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  project_type?: string;
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
        project_type: data.project_type,
        source: data.source,
      },
    ]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      return { success: false, error: 'Database error occurred.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Internal Save Error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
