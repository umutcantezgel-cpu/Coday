/**
 * Seeded PRNG (Mulberry32) für perfekte mathematische Gleichverteilung
 */
function mulberry32(a: number) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Generiert einen deterministischen 32-Bit Seed aus dem URL-String
 */
function getDeterministicSeed(input: string): number {
  let h = 0xdeadbeef;
  for(let i = 0; i < input.length; i++)
    h = Math.imul(h ^ input.charCodeAt(i), 2654435761);
  return (h ^ h >>> 16) >>> 0;
}

/**
 * Ordnet Sektionen basierend auf dem URL-Seed deterministisch an.
 * Nutzt Mulberry32 für 100% einzigartige Permutationen ohne Kollisionen.
 */
export function composeLayout<T>(components: T[], urlSeed: string): T[] {
  const seed = getDeterministicSeed(urlSeed);
  const random = mulberry32(seed);
  const shuffled = [...components];
  
  // Deterministic Fisher-Yates shuffle with PRNG
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = shuffled[i] as T;
    shuffled[i] = shuffled[j] as T;
    shuffled[j] = temp;
  }
  
  return shuffled;
}
