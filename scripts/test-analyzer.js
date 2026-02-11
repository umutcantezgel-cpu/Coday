import 'dotenv/config';

async function testAnalyzer() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase keys missing in .env');
    return;
  }

  console.log('Testing Analyzer Edge Function at:', supabaseUrl);

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/analyze-website`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        url: 'https://example.com',
        action: 'scan',
      }),
    });

    if (!response.ok) {
      // If 404, maybe function doesn't exist
      // If 500, maybe internal error
      // If 401, maybe key issue
      console.error(`❌ Analyzer Error: ${response.status} ${response.statusText}`);
      const text = await response.text();
      console.error('Response:', text);
      return;
    }

    const data = await response.json();
    console.log('✅ Analyzer Success!');
    console.log('Snippet length:', data.html?.length);
  } catch (error) {
    console.error('❌ Network/Script Error:', error);
  }
}

testAnalyzer();
