/**
 * Gemini API Key Pool Manager
 * Implements round-robin rotation with health tracking for 37 API keys
 */

interface KeyHealth {
  key: string;
  lastUsed: number;
  failureCount: number;
  isHealthy: boolean;
  requestsThisMinute: number;
  minuteStart: number;
}

// Load Gemini API Keys from environment variables only.
// SECURITY: Never hardcode API keys — they must come from .env files (gitignored)
// or server-side environment variables (Vercel/Supabase secrets).
// Since this client calls /api/ai-proxy, keys are managed server-side.
// This pool is kept for local dev where VITE_GEMINI_API_KEY_* vars are set in .env.
const GEMINI_KEYS: string[] = [
  import.meta.env.VITE_GEMINI_API_KEY,
  ...Array.from({ length: 37 }, (_, i) => import.meta.env[`VITE_GEMINI_API_KEY_${i + 1}`]),
].filter((key): key is string => typeof key === 'string' && key.length > 0);

const RATE_LIMIT_PER_MINUTE = 60;

class GeminiKeyPool {
  private keys: KeyHealth[];
  private currentIndex: number = 0;

  constructor() {
    this.keys = GEMINI_KEYS.map((key) => ({
      key,
      lastUsed: 0,
      failureCount: 0,
      isHealthy: true,
      requestsThisMinute: 0,
      minuteStart: Date.now(),
    }));
  }

  /**
   * Get the next available API key using round-robin with health checks
   */
  getNextKey(): string {
    const now = Date.now();
    let attempts = 0;

    while (attempts < this.keys.length) {
      const keyHealth = this.keys[this.currentIndex];

      // Reset minute counter if needed
      if (now - keyHealth.minuteStart > 60000) {
        keyHealth.requestsThisMinute = 0;
        keyHealth.minuteStart = now;
        keyHealth.isHealthy = true; // Reset health after cooldown
      }

      // Check if key is available
      if (keyHealth.isHealthy && keyHealth.requestsThisMinute < RATE_LIMIT_PER_MINUTE) {
        keyHealth.requestsThisMinute++;
        keyHealth.lastUsed = now;

        const selectedKey = keyHealth.key;
        this.currentIndex = (this.currentIndex + 1) % this.keys.length;

        return selectedKey;
      }

      this.currentIndex = (this.currentIndex + 1) % this.keys.length;
      attempts++;
    }

    // All keys exhausted - throw error or return first key anyway
    console.warn('[GeminiPool] All keys exhausted, using first available');
    return this.keys[0].key;
  }

  /**
   * Mark a key as failed (will be cooled down)
   */
  markKeyFailed(key: string): void {
    const keyHealth = this.keys.find((k) => k.key === key);
    if (keyHealth) {
      keyHealth.failureCount++;
      if (keyHealth.failureCount >= 3) {
        keyHealth.isHealthy = false;
        console.warn(`[GeminiPool] Key ${key.slice(0, 10)}... marked unhealthy`);
      }
    }
  }

  /**
   * Mark a key as successful (reset failure count)
   */
  markKeySuccess(key: string): void {
    const keyHealth = this.keys.find((k) => k.key === key);
    if (keyHealth) {
      keyHealth.failureCount = 0;
    }
  }

  /**
   * Get pool statistics
   */
  getStats(): { total: number; healthy: number; requestsThisMinute: number } {
    const healthy = this.keys.filter((k) => k.isHealthy).length;
    const requestsThisMinute = this.keys.reduce((sum, k) => sum + k.requestsThisMinute, 0);

    return {
      total: this.keys.length,
      healthy,
      requestsThisMinute,
    };
  }
}

// Singleton instance
export const geminiPool = new GeminiKeyPool();

/**
 * Make a request to Gemini API with automatic key rotation
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

  const apiKey = geminiPool.getNextKey();
  // const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const url = '/api/ai-proxy';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ parts: [{ text: prompt }] }],
        model: model, // Pass model to proxy
      }),
    });

    if (!response.ok) {
      geminiPool.markKeyFailed(apiKey);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    geminiPool.markKeySuccess(apiKey);

    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (error) {
    geminiPool.markKeyFailed(apiKey);
    throw error;
  }
}

export default geminiPool;
