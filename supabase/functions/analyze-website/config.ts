// Keys are now loaded from environment variables
export function getGeminiKeys(): string[] {
    const keys: string[] = [];
    // Load from Deno environment (Supabase Edge Functions)
    // Supports GEMINI_API_KEY and GEMINI_API_KEY_1 through GEMINI_API_KEY_30
    const primary = Deno.env.get('GEMINI_API_KEY');
    if (primary) keys.push(primary);

    for (let i = 1; i <= 30; i++) {
        const key = Deno.env.get(`GEMINI_API_KEY_${i}`);
        if (key) keys.push(key);
    }

    if (keys.length === 0) {
        console.warn('No Gemini API keys configured in environment variables');
    }
    return keys;
}

export const GOOGLE_MAPS_KEYS = [
    Deno.env.get('GOOGLE_MAPS_KEY_1') || "",
    Deno.env.get('GOOGLE_MAPS_KEY_2') || ""
].filter(k => !!k);

export const PERPLEXITY_KEY = Deno.env.get('PERPLEXITY_KEY') || "";

// Simple Random Rotator
export function getRandomGeminiKey(): string {
    const keys = getGeminiKeys();
    if (keys.length === 0) {
        throw new Error("No Gemini Keys available");
    }
    const min = 0;
    const max = keys.length - 1;
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    return keys[index];
}
