#!/usr/bin/env node
/**
 * Verifies that every retired duplicate answers 308 with the exact canonical
 * Location, and that each destination itself answers 200.
 *
 * Nothing else in the toolchain covers redirects: the sitemap test only proves a
 * path is absent from the sitemap, and `next build` never exercises
 * `next.config.ts`'s redirect table. Until this script existed, the only proof
 * was a hand-run curl sweep.
 *
 *   npm run build && npx next start -p 3100
 *   npm run qa:redirects              # or BASE_URL=https://www.codayweb.de npm run qa:redirects
 */
import { CANONICAL_REDIRECTS } from './canonicalRedirects.mjs';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3100';
const LOCALE_PREFIXES = ['', '/de', '/en'];

/** Bare sources land on the unprefixed destination; prefixed ones keep their locale. */
function expectedLocation(prefix, destination) {
  return `${prefix}${destination}`;
}

async function head(url) {
  const res = await fetch(url, { redirect: 'manual' });
  return { status: res.status, location: res.headers.get('location') };
}

async function main() {
  const failures = [];
  let checked = 0;

  for (const [source, destination] of Object.entries(CANONICAL_REDIRECTS)) {
    for (const prefix of LOCALE_PREFIXES) {
      const from = `${prefix}${source}`;
      const want = expectedLocation(prefix, destination);
      let result;
      try {
        result = await head(`${BASE_URL}${from}`);
      } catch (error) {
        failures.push(`${from} — request failed: ${error.message}`);
        continue;
      }
      checked += 1;
      if (result.status !== 308 || result.location !== want) {
        failures.push(
          `${from} — got ${result.status} ${result.location ?? '(no Location)'}, want 308 ${want}`
        );
      }
    }
  }

  // A redirect into another redirect leaks link equity and shows up as a chain
  // in crawlers, so every destination must terminate in a 200.
  for (const destination of new Set(Object.values(CANONICAL_REDIRECTS))) {
    const url = `${BASE_URL}/de${destination}`;
    try {
      const res = await fetch(url, { redirect: 'manual' });
      checked += 1;
      if (res.status !== 200) failures.push(`${url} — destination answered ${res.status}, want 200`);
    } catch (error) {
      failures.push(`${url} — request failed: ${error.message}`);
    }
  }

  if (failures.length > 0) {
    console.error(`redirect check: ${failures.length} of ${checked} failed\n`);
    failures.forEach((f) => console.error(`  ${f}`));
    process.exit(1);
  }

  console.log(`redirect check: all ${checked} canonical redirects resolve correctly.`);
}

main().catch((error) => {
  console.error(`redirect check could not run against ${BASE_URL}: ${error.message}`);
  console.error('Start the production server first: npm run build && npx next start -p 3100');
  process.exit(1);
});
