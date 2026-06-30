import { loadEnvConfig } from '@next/env';
import path from 'path';

loadEnvConfig(path.join(process.cwd(), '.'));

async function test() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  console.log('URL:', supabaseUrl ? 'Set' : 'Missing');
  console.log('Anon Key:', anonKey ? 'Set' : 'Missing');
  console.log('Service Key:', supabaseKey ? 'Set' : 'Missing');

  if (!supabaseUrl || !supabaseKey || !anonKey) return;

  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);

  const data = {
    name: 'Test Agent',
    email: 'test@example.com',
    phone: '',
    message: 'Lead from Homepage Quick Contact Form',
    source: 'quick_contact',
  };

  const { error: dbError } = await supabase.from('leads').insert([data]);

  if (dbError) {
    console.error('DB ERROR:', dbError);
  } else {
    console.log('DB Insert Success');
  }

  // test edge function
  const baseUrl = supabaseUrl.endsWith('/') ? supabaseUrl.slice(0, -1) : supabaseUrl;
  const res = await fetch(`${baseUrl}/functions/v1/send-lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      company: '',
      project: '',
      message: data.message || '',
    }),
  });

  if (!res.ok) {
    console.error('EDGE ERROR:', await res.text());
  } else {
    console.log('EDGE SUCCESS:', await res.json());
  }
}

test().catch(console.error);
