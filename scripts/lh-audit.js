import { execSync } from 'child_process';
import fs from 'fs';

const urls = [
  'https://www.codayweb.de/de',
  'https://www.codayweb.de/de/services',
  'https://www.codayweb.de/de/work',
  'https://www.codayweb.de/de/services/development/web-development',
  'https://www.codayweb.de/de/ai',
];

const results = [];

console.log('Running Lighthouse audits (this will take a few minutes)...');

for (const url of urls) {
  console.log(`Testing ${url}...`);
  try {
    // Run lighthouse
    execSync(
      `npx lighthouse ${url} --quiet --chrome-flags="--headless" --only-categories=performance --output=json --output-path=./lh-temp.json`
    );

    const data = JSON.parse(fs.readFileSync('./lh-temp.json', 'utf8'));

    // Extract key metrics
    const score = Math.round(data.categories.performance.score * 100);
    const lcp = data.audits['largest-contentful-paint'].displayValue;
    const fcp = data.audits['first-contentful-paint'].displayValue;
    const tbt = data.audits['total-blocking-time'].displayValue;
    const cls = data.audits['cumulative-layout-shift'].displayValue;
    const unusedJs = data.audits['unused-javascript']?.details?.overallSavingsMs || 0;
    const unusedCss = data.audits['unused-css-rules']?.details?.overallSavingsMs || 0;
    const renderBlocking = data.audits['render-blocking-resources']?.details?.overallSavingsMs || 0;

    results.push({ url, score, lcp, fcp, tbt, cls, unusedJs, unusedCss, renderBlocking });
    console.log(`✅ ${url}: Score ${score}, LCP ${lcp}, FCP ${fcp}`);
  } catch (error) {
    console.error(`❌ Failed to test ${url}`, error.message);
  }
}

fs.writeFileSync('./lh-summary.json', JSON.stringify(results, null, 2));
console.log('Saved to lh-summary.json');
