import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createRateLimiter } from '@/shared/lib/rate-limiter';

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

// Shared sliding-window rate limiter: 10 requests per minute
const aiProxyLimiter = createRateLimiter({
  max: 10,
  windowMs: 60_000,
});

function isAllowedOrigin(req: VercelRequest): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }
  const origin = (req.headers['origin'] as string) || '';
  const referer = (req.headers['referer'] as string) || '';

  const allowedHostnames = ['codayweb.de', 'www.codayweb.de'];

  if (origin) {
    try {
      const originUrl = new URL(origin);
      if (allowedHostnames.includes(originUrl.hostname)) return true;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      if (allowedHostnames.includes(refererUrl.hostname)) return true;
    } catch {
      return false;
    }
  }

  // Reject requests without Origin or Referer in production to prevent external API harvesting
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Origin verification guard against external API quota harvesting
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Access forbidden: unauthorized origin' });
  }

  // Rate limiting: IP-based check
  const clientIP =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'unknown';

  if (aiProxyLimiter.isRateLimited(clientIP)) {
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
