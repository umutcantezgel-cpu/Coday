/**
 * Shared server-side in-memory rate limiter.
 * Used by API proxy routes to prevent abuse.
 *
 * @module shared/lib/rate-limiter
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimiterOptions {
  /** Maximum requests per window. Default: 10 */
  max?: number;
  /** Window duration in milliseconds. Default: 60_000 (1 minute) */
  windowMs?: number;
  /** Max entries before automatic cleanup. Default: 10_000 */
  maxEntries?: number;
}

export function createRateLimiter(options: RateLimiterOptions = {}) {
  const { max = 10, windowMs = 60_000, maxEntries = 10_000 } = options;
  const store = new Map<string, RateLimitEntry>();
  let requestsSinceCleanup = 0;

  /** Remove expired entries to prevent unbounded memory growth */
  function cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetAt) {
        store.delete(key);
      }
    }
  }

  /** Check if a given key (e.g. IP) exceeds the rate limit */
  function isRateLimited(key: string): boolean {
    // Periodic cleanup every 100 requests
    requestsSinceCleanup++;
    if (requestsSinceCleanup >= 100 || store.size > maxEntries) {
      cleanup();
      requestsSinceCleanup = 0;
    }

    const now = Date.now();
    const entry = store.get(key);

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      return false;
    }

    entry.count++;
    return entry.count > max;
  }

  return { isRateLimited };
}
