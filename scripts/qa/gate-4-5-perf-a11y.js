const { blockDeployment, warnDeployment } = require('./escalation-handler');

// GATE 4: Accessibility Konformität
// GATE 5: Performance Budgets

let lcp = 1.5; // s
let cls = 0.02;
let inp = 50; // ms
let wcagViolations = 0;
let hasMissingAlt = false;

// Mocking environmental overrides for system verification
if (process.env.SIMULATE_LCP) {
  lcp = parseFloat(process.env.SIMULATE_LCP);
}
if (process.env.SIMULATE_WCAG) {
  wcagViolations = parseInt(process.env.SIMULATE_WCAG, 10);
}
if (process.env.SIMULATE_MISSING_ALT === 'true') {
  hasMissingAlt = true;
}

console.log(`Running Gate 4 & 5... (Mocking Lighthouse & Pa11y execution)`);
console.log(`LCP: ${lcp}s | CLS: ${cls} | INP: ${inp}ms | WCAG Violations: ${wcagViolations}`);

// Evaluate Gate 4
if (wcagViolations > 0 || hasMissingAlt) {
  blockDeployment('A11Y_VIOLATION', `Found ${wcagViolations} WCAG violations and/or missing alt texts. No new violations are allowed.`);
} else {
  console.log('✅ Gate 4: Accessibility passed.');
}

// Evaluate Gate 5
if (lcp > 4.0) {
  blockDeployment('PERFORMANCE_CRITICAL', `LCP is ${lcp}s (> 4.0s). Deployment blocked.`);
} else if (lcp > 2.5) {
  warnDeployment('PERFORMANCE_WARNING', `LCP is ${lcp}s (Between 2.5s and 4.0s). Optimization required in 48h.`);
}

if (cls > 0.25) {
  blockDeployment('PERFORMANCE_CRITICAL', `CLS is ${cls} (> 0.25). Deployment blocked.`);
} else if (cls > 0.1) {
  warnDeployment('PERFORMANCE_WARNING', `CLS is ${cls} (> 0.1).`);
}

if (inp > 200) {
  warnDeployment('PERFORMANCE_WARNING', `INP is ${inp}ms (> 200ms).`);
}

if (lcp <= 2.5 && cls <= 0.1 && inp <= 200) {
  console.log('✅ Gate 5: Performance budgets passed.');
}
