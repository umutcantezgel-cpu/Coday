/**
 * Robots-Meta Audit Script
 * Crawlt die Sitemap und reportet den Indexierungsstatus aller Seiten.
 *
 * Aufruf: npx tsx scripts/audit-robots.ts
 * Optional: npx tsx scripts/audit-robots.ts https://www.codayweb.de/sitemap.xml
 */

import * as cheerio from 'cheerio';

const DEFAULT_SITEMAP = 'https://www.codayweb.de/sitemap.xml';
const TIMEOUT_MS = 10_000;
const BATCH_SIZE = 5;

interface AuditResult {
  url: string;
  status: number;
  robotsMeta: string;
  xRobotsTag: string;
  indexable: boolean;
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function getSitemapUrls(sitemapUrl: string): Promise<string[]> {
  const res = await fetchWithTimeout(sitemapUrl);
  const xml = await res.text();
  const $ = cheerio.load(xml, { xmlMode: true });

  // Sitemap Index → recursive
  const sitemapLocs = $('sitemap > loc')
    .map((_, el) => $(el).text())
    .get();
  if (sitemapLocs.length > 0) {
    console.log(`📂 Sitemap Index: ${sitemapLocs.length} Sub-Sitemaps`);
    const allUrls: string[] = [];
    for (const sub of sitemapLocs) {
      const subUrls = await getSitemapUrls(sub);
      allUrls.push(...subUrls);
    }
    return allUrls;
  }

  return $('url > loc')
    .map((_, el) => $(el).text())
    .get();
}

async function auditUrl(url: string): Promise<AuditResult> {
  try {
    const res = await fetchWithTimeout(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const robotsMeta =
      $('meta[name="robots"]').attr('content') || '(nicht gesetzt)';
    const xRobotsTag =
      res.headers.get('x-robots-tag') || '(nicht gesetzt)';

    const isNoIndex =
      robotsMeta.toLowerCase().includes('noindex') ||
      xRobotsTag.toLowerCase().includes('noindex');

    return {
      url,
      status: res.status,
      robotsMeta,
      xRobotsTag,
      indexable: !isNoIndex,
    };
  } catch (error) {
    return {
      url,
      status: 0,
      robotsMeta: `FEHLER: ${(error as Error).message}`,
      xRobotsTag: '-',
      indexable: false,
    };
  }
}

async function main() {
  const sitemapUrl = process.argv[2] || DEFAULT_SITEMAP;

  console.log('🔍 Robots-Meta Audit');
  console.log(`📄 Sitemap: ${sitemapUrl}\n`);

  let urls: string[];
  try {
    urls = await getSitemapUrls(sitemapUrl);
  } catch {
    console.error(`❌ Sitemap nicht erreichbar: ${sitemapUrl}`);
    process.exit(1);
  }

  console.log(`📊 ${urls.length} URLs gefunden\n`);

  const results: AuditResult[] = [];

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(auditUrl));
    results.push(...batchResults);
    process.stdout.write(
      `  Fortschritt: ${Math.min(i + BATCH_SIZE, urls.length)}/${urls.length}\r`
    );
  }

  // ── Markdown Table Output ──
  console.log('\n\n## Audit-Ergebnis\n');
  console.log('| URL | Status | Robots-Meta | X-Robots-Tag | Indexable |');
  console.log('|-----|--------|-------------|--------------|----------|');

  let noIndexCount = 0;
  const baseUrl = new URL(sitemapUrl).origin;

  for (const r of results) {
    const flag = r.indexable ? '✅ J' : '❌ N';
    if (!r.indexable) noIndexCount++;
    const shortUrl = r.url.replace(baseUrl, '') || '/';
    console.log(
      `| ${shortUrl} | ${r.status} | ${r.robotsMeta} | ${r.xRobotsTag} | ${flag} |`
    );
  }

  // ── Summary ──
  console.log(
    `\n📊 Zusammenfassung: ${results.length} URLs, ${results.length - noIndexCount} indexierbar, ${noIndexCount} noindex`
  );

  // ── Flag unexpected noindex ──
  const expectedNoIndex = ['/legal/', '/dashboard', '/test-ui', '/booking'];
  const unexpected = results.filter(
    (r) =>
      !r.indexable &&
      !expectedNoIndex.some((pattern) => r.url.includes(pattern))
  );

  if (unexpected.length > 0) {
    console.log(
      `\n⚠️  ${unexpected.length} unerwartet nicht-indexierbare Seiten:`
    );
    for (const r of unexpected) {
      console.log(`   - ${r.url.replace(baseUrl, '')}: ${r.robotsMeta}`);
    }
  } else {
    console.log('\n✅ Keine unerwartet blockierten Seiten gefunden.');
  }
}

main().catch(console.error);
