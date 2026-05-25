import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const routes = [
  '/',
  '/de',
  '/en',
  '/de/about',
  '/en/about',
  '/de/services',
  '/en/services',
  '/de/process',
  '/en/process',
  '/de/pricing',
  '/en/pricing',
  '/de/packages',
  '/en/packages',
  '/de/work',
  '/en/work',
  '/de/knowledge/blog',
  '/en/knowledge/blog',
  '/de/contact',
  '/en/contact',
  '/de/legal/impressum',
  '/en/legal/impressum',
  '/de/legal/datenschutz',
  '/en/legal/datenschutz'
];

async function runAudit() {
  const results = [];

  for (const route of routes) {
    const url = `${BASE_URL}${route}`;
    try {
      const res = await fetch(url);
      const html = await res.text();
      const $ = cheerio.load(html);

      const title = $('title').text() || 'N/A';
      const description = $('meta[name="description"]').attr('content') || 'N/A';
      const robots = $('meta[name="robots"]').attr('content') || 'N/A';
      const canonical = $('link[rel="canonical"]').attr('href') || 'N/A';
      
      const hreflangs = [];
      $('link[rel="alternate"][hreflang]').each((_, el) => {
        hreflangs.push(`${$(el).attr('hreflang')} (${$(el).attr('href')})`);
      });

      results.push({
        route,
        status: res.status,
        title,
        description,
        robots,
        canonical,
        hreflangs: hreflangs.length > 0 ? hreflangs.join(', ') : 'N/A'
      });
    } catch (e) {
      results.push({
        route,
        status: 'Error',
        title: e.message,
        description: 'N/A',
        robots: 'N/A',
        canonical: 'N/A',
        hreflangs: 'N/A'
      });
    }
  }

  const date = new Date().toISOString().split('T')[0];
  const mdPath = path.join(process.cwd(), `.agent/logs/repair/phase-1-audit-${date}.md`);
  
  let mdContent = `# Phase 1: Indexing State Audit\n\n`;
  mdContent += `| Route | Status | Title | Description | Robots | Canonical | Hreflang |\n`;
  mdContent += `|-------|--------|-------|-------------|--------|-----------|----------|\n`;
  
  for (const r of results) {
    mdContent += `| ${r.route} | ${r.status} | ${r.title} | ${r.description} | ${r.robots} | ${r.canonical} | ${r.hreflangs} |\n`;
  }

  fs.writeFileSync(mdPath, mdContent);
  console.log(`Audit saved to ${mdPath}`);
}

runAudit();
