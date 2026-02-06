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

// All 37 Gemini API Keys
const GEMINI_KEYS: string[] = [
    process.env.GEMINI_API_KEY_1 || 'AIzaSyB5jP8OOs1FrVi92WAPk2fFLOmCBj34uxM',
    process.env.GEMINI_API_KEY_2 || 'AIzaSyATlqP8wc6R-KxlObHQ5j552eMAVWRhzT8',
    process.env.GEMINI_API_KEY_3 || 'AIzaSyA6YLfD5BWoffpZWIqjCwKCV3Z7CPH6s70',
    process.env.GEMINI_API_KEY_4 || 'AIzaSyBOOgZvVkVLwXci_NS1lWmUHn7YAyDVArg',
    process.env.GEMINI_API_KEY_5 || 'AIzaSyDgMU7RNS5BoTGDhX6swdilwgR-wjSpnzY',
    process.env.GEMINI_API_KEY_6 || 'AIzaSyC_TrP13i17c4QX_yXKcNjc3sUwaWCjQeo',
    process.env.GEMINI_API_KEY_7 || 'AIzaSyDa_I0cvAUG4MoK6CbC5SVzhoRe_0BpDY0',
    process.env.GEMINI_API_KEY_8 || 'AIzaSyCtVYSnfR2y0POGTsqDh22kYbQ8im4At1Y',
    process.env.GEMINI_API_KEY_9 || 'AIzaSyBP7llBh4UaJJBlaKE70dqQARlpAAEpPnI',
    process.env.GEMINI_API_KEY_10 || 'AIzaSyBjfFy6XrZk7GXQXfsnqxOBX1mhC2efQ-w',
    process.env.GEMINI_API_KEY_11 || 'AIzaSyANlUSdAY1tLyoMYgZoaET1ycwr7aRnjWQ',
    process.env.GEMINI_API_KEY_12 || 'AIzaSyBQ09LB506s6ni-teGs2qQKyF7i9oQV_PI',
    process.env.GEMINI_API_KEY_13 || 'AIzaSyCV5FSe7fJZ7M9_A1rPxrxxG6orlNFITwE',
    process.env.GEMINI_API_KEY_14 || 'AIzaSyCFwKCLZzAtJ-mfFts9y-J0bP60ME81w6Q',
    process.env.GEMINI_API_KEY_15 || 'AIzaSyAaRD9lQFdkDVOkZ5kub1KD57z4iF6aX4Y',
    process.env.GEMINI_API_KEY_16 || 'AIzaSyCfNs7jF0yTamWZzMEv0XSynBmVHacqkr0',
    process.env.GEMINI_API_KEY_17 || 'AIzaSyCehrLOfXVM_jiCMwJJqHWnDSy66Qpxvkk',
    process.env.GEMINI_API_KEY_18 || 'AIzaSyCMPW9xPK1Z6dZ32p-hUeI8xptG3JyY_iw',
    process.env.GEMINI_API_KEY_19 || 'AIzaSyA58X47XuDI0p2SjE4C1RmZOxl9bbPhDos',
    process.env.GEMINI_API_KEY_20 || 'AIzaSyCwUJSuMXGN1uV_sLR1Koyogs_i2dWLVh4',
    process.env.GEMINI_API_KEY_21 || 'AIzaSyBAf6kadlEjeJsdUjmJffxPeYDqMc_wAa0',
    process.env.GEMINI_API_KEY_22 || 'AIzaSyAQOo6psp0cnGo24ttdGMZGxquevHnsGpI',
    process.env.GEMINI_API_KEY_23 || 'AIzaSyBVa122YSDvjOBCYRJGf7qjMAK1dWlf-lY',
    process.env.GEMINI_API_KEY_24 || 'AIzaSyDUgGAoQHmTF1r9ihWHnaWNm2rENqL23gA',
    process.env.GEMINI_API_KEY_25 || 'AIzaSyAIJgwD-7llPwXs_e_YGtSA5QKL7afD2Tk',
    process.env.GEMINI_API_KEY_26 || 'AIzaSyBt0GkM8txkGk7aYZhizkxQ542mmzOielU',
    process.env.GEMINI_API_KEY_27 || 'AIzaSyD7_SQfDE7C3A7rW0XwAy5tfVbOcM9QDeY',
    process.env.GEMINI_API_KEY_28 || 'AIzaSyCxfyIuxfP-am61gJ8P_97r4Cghfcgk5tc',
    process.env.GEMINI_API_KEY_29 || 'AIzaSyDRxNr2ssa4FvDrK3qGph40F14B-huzedg',
    process.env.GEMINI_API_KEY_30 || 'AIzaSyDvdlkYJcqUUfrlDRvqd9_tNXWL4dxEjoo',
    process.env.GEMINI_API_KEY_31 || 'AIzaSyAF_EsC4rMwp8jPdtGy2xhUqpegXZzpbHM',
    process.env.GEMINI_API_KEY_32 || 'AIzaSyBHumld8NYuy9jo77XGXcI-jZBJFCz4PsE',
    process.env.GEMINI_API_KEY_33 || 'AIzaSyCrs3sj3RoQj8OusrSWiBRk5G1Rqf1CWxI',
    process.env.GEMINI_API_KEY_34 || 'AIzaSyBpKx0JIj1Ok9Kd4LaeVG8GgB492oOFaek',
    process.env.GEMINI_API_KEY_35 || 'AIzaSyBInOMOXf97mOIZWM97rbLUlIUS1UCbw_4',
    process.env.GEMINI_API_KEY_36 || 'AIzaSyBtdCv8MV2TNjvJevFjQ6l64pReAAvOa9U',
    process.env.GEMINI_API_KEY_37 || 'AIzaSyAfXl4MNhIQMV63ExLfpynVlvv3s2w9GRc',
];

const RATE_LIMIT_PER_MINUTE = 60;
const COOLDOWN_MS = 60000; // 1 minute cooldown for failed keys

class GeminiKeyPool {
    private keys: KeyHealth[];
    private currentIndex: number = 0;

    constructor() {
        this.keys = GEMINI_KEYS.map(key => ({
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
        const keyHealth = this.keys.find(k => k.key === key);
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
        const keyHealth = this.keys.find(k => k.key === key);
        if (keyHealth) {
            keyHealth.failureCount = 0;
        }
    }

    /**
     * Get pool statistics
     */
    getStats(): { total: number; healthy: number; requestsThisMinute: number } {
        const healthy = this.keys.filter(k => k.isHealthy).length;
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
    const { model = 'gemini-2.0-flash', temperature = 0.7, maxTokens = 4096 } = options;

    const apiKey = geminiPool.getNextKey();
    // const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const url = '/api/ai-proxy';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ parts: [{ text: prompt }] }],
                model: model // Pass model to proxy
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
