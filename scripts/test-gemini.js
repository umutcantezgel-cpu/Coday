import 'dotenv/config';

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY (or VITE_GEMINI_API_KEY) is missing in .env');
    return;
  }

  console.log('Testing Gemini API with key:', apiKey.substring(0, 8) + '...');

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Hello, are you working?' }] }],
        }),
      }
    );

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error('Error Body:', errorBody);
      return;
    }

    const data = await response.json();
    console.log('✅ API Success!');
    console.log('Response:', data.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (error) {
    console.error('❌ Network/Script Error:', error);
  }
}

testGemini();
