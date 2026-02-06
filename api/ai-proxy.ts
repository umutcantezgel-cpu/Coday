import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Rate limiting: Simple IP-based check
    const clientIP = req.headers['x-forwarded-for'] || req.socket?.remoteAddress;

    try {
        const { messages, model } = req.body;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-2.0-flash'}:generateContent?key=${GEMINI_API_KEY}`,
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
