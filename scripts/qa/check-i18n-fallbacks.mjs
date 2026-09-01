#!/usr/bin/env node
/**
 * Fails if any prerendered page contains a next-intl fallback literal.
 *
 * `getMessageFallback` in src/i18n/request.ts renders `namespace.key` when a
 * message is missing, so a namespace that a route's client components need but
 * its provider does not ship shows up as visible text like
 * `services.hero.title` instead of throwing. This crawls the build output for
 * that pattern — it also catches genuinely missing keys.
 *
 * Usage: node scripts/qa/check-i18n-fallbacks.mjs   (after `next build`)
 */
import fs from 'node:fs';
import path from 'node:path';

const APP_DIR = '.next/server/app';
const LOCALES_DIR = 'public/locales/de';

if (!fs.existsSync(APP_DIR)) {
  // Nothing to inspect without a build — skip rather than block the hook.
  console.log(`i18n fallback check: skipped (${APP_DIR} not found, run \`next build\` first).`);
  process.exit(0);
}

const namespaces = fs
  .readdirSync(LOCALES_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => f.replace(/\.json$/, ''));

// `namespace.key` or `namespace.key.sub`, as rendered text or an attribute value.
const pattern = new RegExp(
  `(?:>|=")((?:${namespaces.join('|')})(?:\\.[A-Za-z0-9_]+)+)(?:<|")`,
  'g'
);

const offenders = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) {
      const matches = fs.readFileSync(full, 'utf8').match(pattern);
      if (matches) {
        offenders.push({ file: full, samples: [...new Set(matches)].slice(0, 5) });
      }
    }
  }
}

walk(APP_DIR);

if (offenders.length === 0) {
  console.log('i18n fallback check: no missing messages in any prerendered page.');
  process.exit(0);
}

console.error(`i18n fallback check FAILED — ${offenders.length} page(s) render fallback literals:`);
for (const { file, samples } of offenders.slice(0, 20)) {
  console.error(`  ${file}`);
  console.error(`      ${samples.join('  ')}`);
}
process.exit(1);
