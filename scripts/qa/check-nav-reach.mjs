#!/usr/bin/env node
/**
 * Proves the promise the header makes: every live page is reachable from it in
 * at most two clicks — linked directly, or listed on a page the header links.
 *
 * Nothing else checks this. The sitemap test only proves a path is absent, and
 * `next build` is happy to prerender a page nothing links to; that is how the
 * Academy shipped indexable with no way to click to it.
 *
 *   npm run build && npm run qa:nav
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const APP_DIR = '.next/server/app/de';
const CONFIG = 'next.config.ts';
const ROBOTS = 'src/app/robots.ts';

/**
 * Pages that are deliberately not linked, each with the reason. Anything else
 * that turns up unreachable is a finding, not a known exception.
 */
const ALLOWED_ORPHANS = new Map([
  ['/dashboard', 'client portal, reached by login not navigation'],
  ['/privacy', 'duplicate of /legal/datenschutz, noindex'],
  ['/nav-test', 'developer scratch page, noindex'],
  ['/page-stress-test', 'developer scratch page, noindex'],
  ['/test-overlays', 'developer scratch page, noindex'],
  ['/test-primitives', 'developer scratch page, noindex'],
  ['/work/work', 'noindex duplicate of /work'],
  ['/work/projectdetail', 'noindex template shell'],
]);

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

/** `/:locale(de|en)/a/:slug` -> a RegExp matching `/a/<anything>`. */
function sourceToRegExp(source) {
  const bare = source.replace(/^\/:locale\([^)]*\)/, '');
  const pattern = bare
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:[A-Za-z]+\*/g, '.*')
    .replace(/:[A-Za-z]+/g, '[^/]+');
  return new RegExp(`^${pattern}$`);
}

function redirectSources() {
  const config = readFileSync(CONFIG, 'utf8');
  const redirectBlock = config.slice(config.indexOf('async redirects()'), config.indexOf('async headers()'));
  return [...redirectBlock.matchAll(/source:\s*'([^']+)'/g)].map((m) => sourceToRegExp(m[1]));
}

function robotsBlocked() {
  const robots = readFileSync(ROBOTS, 'utf8');
  const block = robots.slice(robots.indexOf('BLOCKED_PATHS'), robots.indexOf('export default'));
  return [...block.matchAll(/'([^']+)'/g)]
    .map((m) => m[1])
    .map((p) => new RegExp(`^${p.replace(/^\/\*/, '').replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}`));
}

/** A prerendered page whose body is a redirect shim carries almost no content. */
function isRedirectShim(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const text = (main ? main[1] : html)
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.split(' ').length < 40;
}

function linksIn(html) {
  return new Set(
    [...html.matchAll(/href=\\?"\/de(\/[^"\\?#]*)/g)].map((m) => m[1].replace(/\/$/, '') || '/')
  );
}

function main() {
  if (!existsSync(APP_DIR)) {
    console.error(`nav reachability check: no build found at ${APP_DIR}. Run \`npm run build\` first.`);
    process.exit(1);
  }

  const files = walk(APP_DIR);
  const pages = new Map();
  for (const file of files) {
    const url = '/' + path.relative(APP_DIR, file).replace(/\.html$/, '');
    pages.set(url === '/index' ? '/' : url, readFileSync(file, 'utf8'));
  }

  const skipRedirect = redirectSources();
  const skipRobots = robotsBlocked();

  // The home page is prerendered as a sibling of the locale directory, not inside it.
  const homeFile = `${APP_DIR}.html`;
  if (!existsSync(homeFile)) {
    console.error(`nav reachability check: no prerendered home page at ${homeFile}.`);
    process.exit(1);
  }
  const home = readFileSync(homeFile, 'utf8');
  pages.set('/', home);

  // Level 1: what the header itself links.
  //
  // The 38 location pages (city and Kreis hubs) are no longer in the header:
  // they sit in the footer's collapsed "Alle Standorte" <details> block, and a
  // closed <details> still ships every link in the prerendered HTML. The footer
  // renders on every page, so those links are picked up at level 2 through any
  // header-linked page; nothing here needs to know about the footer.
  const headerHtml = home.slice(home.indexOf('<header'), home.indexOf('</header>'));
  const headerLinks = linksIn(headerHtml);

  // Level 2: what those pages link in turn (their footer included).
  const reachable = new Set(headerLinks);
  for (const target of headerLinks) {
    const html = pages.get(target);
    if (html) for (const link of linksIn(html)) reachable.add(link);
  }

  const unreachable = [];
  for (const [url, html] of pages) {
    if (url === '/' || reachable.has(url)) continue;
    if (ALLOWED_ORPHANS.has(url)) continue;
    if (skipRedirect.some((re) => re.test(url))) continue;
    if (skipRobots.some((re) => re.test(url))) continue;
    if (isRedirectShim(html)) continue;
    unreachable.push(url);
  }

  console.log(
    `nav reachability: ${pages.size} prerendered pages, ${headerLinks.size} linked straight from the header, ${reachable.size} within two clicks.`
  );

  if (unreachable.length > 0) {
    console.error(`\n${unreachable.length} page(s) cannot be reached from the header in two clicks:\n`);
    unreachable.sort().forEach((u) => console.error(`  ${u}`));
    console.error('\nLink them from the header or from a page the header links, or add them to');
    console.error('ALLOWED_ORPHANS in this script with the reason they stay unlinked.');
    process.exit(1);
  }

  console.log('Every live page is reachable from the header.');
}

main();
