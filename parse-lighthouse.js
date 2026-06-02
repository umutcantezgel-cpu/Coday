const fs = require('fs');

const report = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));

// Performance Metrics
const lcp = report.audits['largest-contentful-paint'].numericValue;
const cls = report.audits['cumulative-layout-shift'].numericValue;

console.log(`LCP: ${lcp} ms`);
console.log(`CLS: ${cls}`);

// Accessibility Violations
const violations = [];
for (const audit of Object.values(report.audits)) {
  if (
    report.categories.accessibility.auditRefs.find((r) => r.id === audit.id) &&
    audit.score !== 1 &&
    audit.score !== null &&
    audit.score !== undefined
  ) {
    violations.push({
      id: audit.id,
      title: audit.title,
      score: audit.score,
      details: audit.details?.items,
    });
  }
}

console.log('A11y Violations:');
console.log(JSON.stringify(violations, null, 2));
