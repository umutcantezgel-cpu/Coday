# Performance E2E Tests Fix Strategy Report

## Observation
1. In `e2e/performance.spec.ts`, `window.lcpValue` was initialized to `0`. If the LCP event never fired (e.g. blank page or 500 error painting quickly), the test falsely passed because `0 < 1500` evaluates to true.
2. The tests did not check the HTTP response of `await page.goto(url)`.
3. The tests did not assert that a meaningful element on the page was visible before capturing metrics, which means it could capture metrics on a blank or error page.
4. In `playwright-perf.config.ts`, the `webServer` block was commented out, which breaks automated CI runs because the server is never started.

## Logic Chain
To address these issues:
1. **LCP Default**: By initializing `window.lcpValue` to `-1` and checking `if (lcp === -1)` in `getMetrics`, we can throw an error if the LCP event never fired. This guarantees the test fails if the page is blank or fails to render a meaningful contentful paint.
2. **Response Check**: By capturing `const response = await page.goto('/')` and asserting `expect(response?.ok()).toBeTruthy()`, we ensure that 404s or 500s will immediately fail the test.
3. **Visibility Check**: By asserting `await expect(page.getByRole('heading').first()).toBeVisible()` before waiting for `networkidle`, we guarantee the page has rendered its main content structure before proceeding to read performance metrics.
4. **CI Server**: Uncommenting the `webServer` block in `playwright-perf.config.ts` ensures Playwright automatically spins up the preview server for the test suite, allowing the automated CI pipeline to run without external server management.

## Caveats
I have proactively applied these fixes to both `e2e/performance.spec.ts` and `playwright-perf.config.ts` using the file replace tools, meaning the code is already updated. No patch is necessary.

## Conclusion
The test files have been modified to:
- Initialize `window.lcpValue` to `-1` and throw if it remains `-1`.
- Capture the navigation response and verify `.ok()`.
- Wait for the first heading element to become visible.
- Uncomment the `webServer` block in the playwright config.

## Verification Method
1. Inspect `e2e/performance.spec.ts` to see the updated logic for LCP default, `.ok()` check, and `toBeVisible()` assertions.
2. Inspect `playwright-perf.config.ts` to verify the `webServer` is active.
3. Run `npx playwright test -c playwright-perf.config.ts` to ensure the tests execute properly against the server.
