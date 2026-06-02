const fs = require('fs');

const report = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));

// Performance Metrics
console.log(Object.keys(report.audits).filter((k) => k.includes('largest')));
