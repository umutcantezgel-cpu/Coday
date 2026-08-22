import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createRateLimiter } from '@/shared/lib/rate-limiter';

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// Max 10 requests per minute per IP
const perplexityLimiter = createRateLimiter({
  max: 10,
  windowMs: 60_000,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIP =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'unknown';

  if (perplexityLimiter.isRateLimited(clientIP)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  if (!PERPLEXITY_API_KEY) {
    console.warn('Perplexity API Key missing');
    return res.status(500).json({ error: 'Server misconfiguration: API Key missing' });
  }

  try {
    const {
      messages,
      model = 'llama-3.1-sonar-large-128k-online',
      temperature,
      max_tokens,
      search_domain_filter,
    } = req.body;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens,
        search_domain_filter,
        return_citations: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Perplexity Upstream Error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Perplexity Proxy Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
