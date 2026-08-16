import { test, expect } from '@playwright/test';

const routes = [
  '/de',
  '/en',
  '/de/services',
  '/de/about',
  '/de/contact',
  '/de/pricing',
  '/de/work',
];

test.describe('WCAG 2.2 AA Accessibility Audits', () => {
  for (const route of routes) {
    test(`Route ${route} has proper heading structure and landmark regions`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('domcontentloaded');

      // Ensure page has title
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      // Ensure single H1 exists
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Ensure main content landmark exists
      const main = page.locator('main, [role="main"]');
      await expect(main.first()).toBeVisible();

      // Ensure all images have alt attributes
      const images = page.locator('img');
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    });
  }
});
