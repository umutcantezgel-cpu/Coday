import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_KEYS = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '')
  .split(',')
  .map((k) => k.trim())
  .filter(Boolean);
const OPENROUTER_KEYS = (process.env.OPENROUTER_API_KEYS || '')
  .split(',')
  .map((k) => k.trim())
  .filter(Boolean);

function getRandomKey(keys: string[]) {
  if (keys.length === 0) return null;
  return keys[Math.floor(Math.random() * keys.length)];
}

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10; // 10 requests per minute
const RATE_LIMIT_WINDOW = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting: Simple IP-based check
  const clientIP =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(clientIP)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  try {
    const { messages, model } = req.body;
    const requestedModel = model || 'gemini-2.0-flash';

    // OpenRouter routing
    if (requestedModel.includes('/')) {
      const orKey = getRandomKey(OPENROUTER_KEYS);
      if (!orKey) {
        return res.status(500).json({ error: 'OpenRouter keys not configured' });
      }

      // Convert Gemini message format to OpenAI format for OpenRouter
      const openAiMessages = messages.map((m: any) => ({
        role: m.role || 'user',
        content: m.parts?.[0]?.text || '',
      }));

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${orKey}`,
          'HTTP-Referer': 'https://codayweb.de',
          'X-Title': 'Coday',
        },
        body: JSON.stringify({
          model: requestedModel,
          messages: openAiMessages,
        }),
      });

      const data = await response.json();

      // Convert OpenAI response format back to Gemini format for the client
      if (data.choices && data.choices[0]) {
        return res.status(200).json({
          candidates: [
            {
              content: {
                parts: [{ text: data.choices[0].message.content }],
              },
            },
          ],
        });
      }
      return res.status(200).json(data);
    }

    // Native Gemini routing
    const geminiKey = getRandomKey(GEMINI_KEYS);
    if (!geminiKey) {
      return res.status(500).json({ error: 'Gemini keys not configured' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${requestedModel}:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: messages }),
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('AI Proxy Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
