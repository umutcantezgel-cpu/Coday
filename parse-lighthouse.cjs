const fs = require('fs');
try {
    const report = JSON.parse(fs.readFileSync('./lighthouse-mobile.json'));
    const categories = report.categories;
    const audits = report.audits;

    console.log('Performance Score:', categories.performance.score * 100);
    console.log('LCP:', audits['largest-contentful-paint']?.displayValue);
    console.log('FCP:', audits['first-contentful-paint']?.displayValue);
    console.log('CLS:', audits['cumulative-layout-shift']?.displayValue);
    console.log('INP:', audits['interactive']?.displayValue); // Note: TTI is 'interactive', INP is separate
    console.log('TBT:', audits['total-blocking-time']?.displayValue);
    console.log('Speed Index:', audits['speed-index']?.displayValue);
} catch (e) {
    console.error('Error parsing report:', e);
}
