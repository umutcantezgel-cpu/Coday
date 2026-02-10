/**
 * Gemini API Client
 * Uses server-side proxy to protect API keys.
 * Refactored to remove client-side key rotation and exposure.
 */

export async function callGemini(
  prompt: string,
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  } = {}
): Promise<string> {
  const { model = 'gemini-2.0-flash' } = options;
  const url = '/api/ai-proxy';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ parts: [{ text: prompt }] }],
        model: model,
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (error) {
    console.error('Gemini API request failed:', error);
    throw error;
  }
}

// Export a dummy object for compatibility if other files import default
export default { callGemini };
