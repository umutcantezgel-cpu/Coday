#!/usr/bin/env node
/**
 * Holds the entity graph together.
 *
 * The JSON-LD on this site is not one document: the root layout emits #organization
 * and #website, every page emits its own <script>, and they are joined only by @id
 * references across those scripts. Nothing verified that those references land
 * anywhere — `next build` is perfectly happy to ship an edge pointing at a node that
 * does not exist, and it did: every blog post's `mainEntityOfPage` named a bare URL
 * with no node behind it, and `getContactSchema` pointed at #local-business, which
 * nothing has ever emitted.
 *
 * The second invariant is the one that does SEO work. A page declares what it is
 * answerable for via `mainEntity`. If two pages name the same entity, they are
 * telling Google they are the same page — which is what cannibalisation is. This
 * script is what stops that regressing.
 *
 *   npm run build && npm run qa:graph
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const APP_DIR = '.next/server/app';
const ORIGIN = 'https://www.codayweb.de';

/**
 * Violations that exist today and are scheduled for a named later slice. Anything
 * NOT listed here fails the build. Each entry must say which slice removes it, so
 * the list cannot quietly become a dumping ground.
 */
const KNOWN = [];

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function jsonLdBlocks(html) {
  const out = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      out.push({ __unparsable: true });
    }
  }
  return out;
}

/**
 * `{'@id': X}` — and `{'@id': X, '@type': T}` — is a reference to a node defined
 * elsewhere. Anything carrying real properties alongside its @id is a definition.
 */
function isReferenceOnly(node) {
  const keys = Object.keys(node).filter((k) => k !== '@type' && k !== '@context');
  return keys.length === 1 && keys[0] === '@id';
}

/** Depth-first over the whole JSON-LD tree, including nodes nested in properties. */
function eachNode(value, visit) {
  if (Array.isArray(value)) {
    value.forEach((v) => eachNode(v, visit));
    return;
  }
  if (!value || typeof value !== 'object') return;
  visit(value);
  for (const [key, child] of Object.entries(value)) {
    if (key === '@id' || key === '@type' || key === '@context') continue;
    eachNode(child, visit);
  }
}

function typeOf(node) {
  const t = node['@type'];
  return Array.isArray(t) ? t.join('+') : String(t ?? '');
}

function isKnown(rule, id) {
  return KNOWN.some((k) => k.rule === rule && k.match.test(id));
}

function main() {
  if (!existsSync(APP_DIR)) {
    console.error(`graph check: no build found at ${APP_DIR}. Run \`npm run build\` first.`);
    process.exit(1);
  }

  const files = walk(APP_DIR);

  /**
   * Every URI this build actually serves. A reference to a node defined on
   * another page — the wiki hub naming its 101 terms, say — is valid linked data
   * as long as that page exists, because the @id dereferences. Only site-global
   * ids (`https://…/#organization`) must resolve inside the same document, since
   * nothing dereferences them.
   */
  const servedUris = new Set(
    files.map((f) => {
      const rel = '/' + path.relative(APP_DIR, f).replace(/\.html$/, '');
      return ORIGIN + (rel === '/index' ? '/' : rel);
    })
  );

  /**
   * Every @id defined anywhere in the build. Collected in a first pass so a
   * cross-document reference can be checked against the node that actually
   * exists, not merely against the page it points into. Without this, any
   * fragment hung off a real URL — `…/branchen/handwerk-bau#audience` — would
   * pass whether or not that node was ever emitted.
   */
  const definedAnywhere = new Set();

  const resolves = (id, definedHere) => {
    if (definedHere.has(id)) return true;
    if (id.startsWith(`${ORIGIN}/#`)) return false; // site-global, must be in-document
    if (definedAnywhere.has(id)) return true;
    // A reference to a page as a whole, with no fragment, resolves if that page
    // is served.
    if (!id.includes('#')) {
      return servedUris.has(id) || servedUris.has(id.replace(/\/$/, ''));
    }
    return false;
  };

  // First pass: which nodes exist at all.
  for (const file of files) {
    for (const block of jsonLdBlocks(readFileSync(file, 'utf8'))) {
      if (block.__unparsable) continue;
      eachNode(block, (node) => {
        const id = node['@id'];
        if (typeof id === 'string' && !isReferenceOnly(node)) definedAnywhere.add(id);
      });
    }
  }

  const findings = { dangling: [], doubleDefined: [], rating: [], faq: [], noLocale: [] };
  const mainEntityOwners = new Map(); // entity @id -> Set of page urls claiming it
  let pagesChecked = 0;
  let nodesSeen = 0;

  for (const file of files) {
    const url = '/' + path.relative(APP_DIR, file).replace(/\.html$/, '');
    const html = readFileSync(file, 'utf8');
    const blocks = jsonLdBlocks(html);
    if (blocks.length === 0) continue;
    pagesChecked++;

    const defined = new Map(); // @id -> serialized body, to catch contradictory redefinitions
    const referenced = new Set();
    let ratings = 0;
    let faqPages = 0;

    for (const block of blocks) {
      if (block.__unparsable) {
        console.error(`  ${url}: a JSON-LD block does not parse`);
        process.exitCode = 1;
        continue;
      }
      eachNode(block, (node) => {
        nodesSeen++;
        const id = node['@id'];
        const type = typeOf(node);

        if (type.includes('AggregateRating')) ratings++;
        if (type === 'FAQPage') faqPages++;

        if (typeof id === 'string') {
          if (isReferenceOnly(node)) {
            referenced.add(id);
          } else {
            const body = JSON.stringify(node);
            const prev = defined.get(id);
            if (prev !== undefined && prev !== body) {
              findings.doubleDefined.push({ url, id });
            }
            defined.set(id, body);

            // A page-scoped @id must name a locale, or /de and /en collapse onto
            // one URI describing two different documents.
            if (id.startsWith(`${ORIGIN}/`) && !id.startsWith(`${ORIGIN}/#`)) {
              const tail = id.slice(ORIGIN.length + 1);
              // `de#webpage` is the home page and legitimate; only a path that
              // names no locale at all is the defect.
              if (!/^(de|en)([/#]|$)/.test(tail)) findings.noLocale.push({ url, id });
            }
          }
        }

        if (node.mainEntity && typeof node.mainEntity === 'object' && !Array.isArray(node.mainEntity)) {
          const target = node.mainEntity['@id'];
          // Only WebPage-family nodes stake a claim. FAQPage.mainEntity is a
          // question list, not an ownership assertion.
          if (typeof target === 'string' && /Page$/.test(type) && type !== 'FAQPage') {
            if (!mainEntityOwners.has(target)) mainEntityOwners.set(target, new Set());
            mainEntityOwners.get(target).add(url);
          }
        }
      });
    }

    for (const id of referenced) {
      if (!resolves(id, defined) && !isKnown('dangling', id)) findings.dangling.push({ url, id });
    }
    if (ratings > 1) findings.rating.push({ url, count: ratings });
    if (faqPages > 1) findings.faq.push({ url, count: faqPages });
  }

  // A page and its locale twin legitimately describe different entities, so
  // compare only within a locale.
  const contested = [...mainEntityOwners.entries()]
    .map(([id, pages]) => [id, [...pages]])
    .filter(([, pages]) => {
      const de = pages.filter((p) => p.startsWith('/de'));
      const en = pages.filter((p) => p.startsWith('/en'));
      return de.length > 1 || en.length > 1;
    });

  console.log(
    `graph: ${pagesChecked} prerendered pages, ${nodesSeen} nodes, ${mainEntityOwners.size} entities claimed by a page.`
  );

  const report = (label, rows, render) => {
    if (rows.length === 0) return false;
    console.error(`\n${rows.length} ${label}:`);
    rows.slice(0, 15).forEach((r) => console.error('  ' + render(r)));
    if (rows.length > 15) console.error(`  … and ${rows.length - 15} more`);
    return true;
  };

  const short = (s) => s.replace(ORIGIN, '');
  let failed = false;
  failed = report('@id reference(s) resolving to no node', findings.dangling, (r) => `${r.url}  ->  ${short(r.id)}`) || failed;
  failed = report('entity/entities claimed by more than one page in the same locale', contested, ([id, pages]) => `${short(id)}\n      ${pages.join('  ')}`) || failed;
  failed = report('@id(s) defined twice with different content in one document', findings.doubleDefined, (r) => `${r.url}  ->  ${short(r.id)}`) || failed;
  failed = report('page(s) with more than one AggregateRating', findings.rating, (r) => `${r.url}  (${r.count})`) || failed;
  failed = report('page(s) with more than one FAQPage', findings.faq, (r) => `${r.url}  (${r.count})`) || failed;
  failed = report('page-scoped @id(s) without a locale segment', findings.noLocale, (r) => `${r.url}  ->  ${short(r.id)}`) || failed;

  if (failed || process.exitCode === 1) {
    console.error('\nAn @id that resolves nowhere is an edge Google cannot follow; two pages');
    console.error('claiming one entity is cannibalisation stated in machine-readable form.');
    console.error('Fix the page, or add the case to KNOWN in this script with the slice that');
    console.error('will remove it.');
    process.exit(1);
  }

  console.log('Every reference resolves and every entity has exactly one owner.');
}

main();
