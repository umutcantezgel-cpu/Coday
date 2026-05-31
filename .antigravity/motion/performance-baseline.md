# Performance Baseline Audit

**Date:** 2026-05-31
**Tool:** Chrome DevTools Protocol (Puppeteer Trace) & Lighthouse
**Target:** `http://localhost:3000/de`

## Core Metrics (Lighthouse)
* **Overall Performance Score:** 47 / 100
* **Largest Contentful Paint (LCP):** 24.3 s (Critically High)
* **Cumulative Layout Shift (CLS):** 0.003 (Excellent)
* **Total Blocking Time (TBT):** 1,620 ms (High)

## GPU & Layout Metrics (Puppeteer Trace `Performance.getMetrics`)
Based on real trace data collected during a 3-second window on page load:
* **Layout Triggers (`LayoutCount`):** 14
* **Style Recalculations (`RecalcStyleCount`):** 74
* **JS Heap Used:** 26.45 MB / 48.77 MB Total
* **Script Duration:** ~281 ms
* **Task Duration:** ~470 ms

## Observations & Issues
1. **LCP is severely degraded (24.3s).** This indicates massive render-blocking resources, unoptimized hero images, or delayed server responses.
2. **High Total Blocking Time (1,620ms)** suggests heavy JavaScript execution on the main thread during hydration/load.
3. **Layout Triggers (14)** are relatively low, meaning there is not excessive layout thrashing, but JS execution is still blocking the main thread.
4. **JS Heap Size** is reasonable for a Next.js app, but script execution time is contributing significantly to TBT.

## Recommended Action Items
- **Optimize Hero Assets:** Implement `fetchpriority="high"` and preload critical LCP images.
- **Defer Non-Critical JS:** Reduce Total Blocking Time by moving non-essential scripts (like third-party analytics or chatbot scripts) to web workers or lazy-loading them.
- **Investigate Server Response:** A 24.3s LCP strongly implies a bottleneck in Server-Side Rendering (SSR) or data fetching delays.
