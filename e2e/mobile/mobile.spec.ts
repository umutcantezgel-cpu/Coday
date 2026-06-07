import { test, expect } from '@playwright/test';
const BASE_URL = 'http://localhost:3000';

test.describe('Mobile Navigation - Tier 1 E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await page.waitForSelector('header.card-nav-container');
  });

  // --- Viewport Scaling ---
  test.describe('Viewport Scaling', () => {
    const viewports = [
      { width: 320, height: 568 },
      { width: 375, height: 667 },
      { width: 390, height: 844 },
      { width: 414, height: 896 },
      { width: 430, height: 932 },
    ];

    for (const vp of viewports) {
      test(`Header has no horizontal overflow at ${vp.width}x${vp.height}`, async ({ page }) => {
        await page.setViewportSize(vp);
        const header = page.locator('header.card-nav-container');
        await expect(header).toBeVisible();
        const box = await header.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeLessThanOrEqual(vp.width);

        // Ensure body has no horizontal overflow
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const windowWidth = await page.evaluate(() => window.innerWidth);
        expect(bodyWidth).toBeLessThanOrEqual(windowWidth);
      });
    }
  });

  // --- Element Rendering ---
  test.describe('Element Rendering', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('Floating header should be visible on mobile', async ({ page }) => {
      const header = page.locator('header.card-nav-container');
      await expect(header).toBeVisible();
    });

    test('Mobile menu trigger button should be visible', async ({ page }) => {
      const trigger = page.locator('.mobile-menu-trigger');
      await expect(trigger).toBeVisible();
    });

    test('Desktop nav links should be hidden on mobile', async ({ page }) => {
      const desktopLinks = page.locator('.nav-desktop-links');
      await expect(desktopLinks).toBeHidden();
    });

    test('Mobile overlay container should be visible when triggered', async ({ page }) => {
      const trigger = page.locator('.mobile-menu-trigger');
      await trigger.click();
      const overlay = page.locator('body > .mobile-overlay-container');
      await expect(overlay).toBeVisible();
    });

    test('Mobile logo inside overlay should be visible when opened', async ({ page }) => {
      const trigger = page.locator('.mobile-menu-trigger');
      await trigger.click();
      const logo = page.locator('body > .mobile-overlay-container .mobile-logo');
      await expect(logo).toBeVisible();
    });
  });

  // --- Touch Targets ---
  test.describe('Touch Targets', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('Hamburger trigger must be at least 44x44', async ({ page }) => {
      const trigger = page.locator('.mobile-menu-trigger');
      await expect(trigger).toBeVisible();
      const box = await trigger.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });

    test('Close button in overlay must be at least 44x44', async ({ page }) => {
      await page.locator('.mobile-menu-trigger').click();
      const closeBtn = page.locator('body > .mobile-overlay-container .mobile-close-btn');
      await expect(closeBtn).toBeVisible();
      const box = await closeBtn.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });

    test('Accordion trigger must be at least 44px height', async ({ page }) => {
      await page.locator('.mobile-menu-trigger').click();
      const accordion = page
        .locator('body > .mobile-overlay-container .mobile-accordion-trigger')
        .first();
      await expect(accordion).toBeVisible();
      const box = await accordion.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });

    test('Mobile link item must be at least 44px height', async ({ page }) => {
      await page.locator('.mobile-menu-trigger').click();
      const accordion = page
        .locator('body > .mobile-overlay-container .mobile-accordion-trigger')
        .first();
      await accordion.click();
      const link = page.locator('body > .mobile-overlay-container .mobile-link-item').first();
      await expect(link).toBeVisible();
      const box = await link.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });

    test('Footer action button must be at least 44px height', async ({ page }) => {
      await page.locator('.mobile-menu-trigger').click();
      // Wait for animation
      await page.waitForTimeout(300);
      const footerBtn = page
        .locator('body > .mobile-overlay-container .mobile-footer-actions a')
        .last();
      await expect(footerBtn).toBeVisible();
      const box = await footerBtn.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });
  });

  // --- Nav Menu Interaction ---
  test.describe('Nav Menu Interaction', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('Menu opens correctly', async ({ page }) => {
      const trigger = page.locator('.mobile-menu-trigger');
      await trigger.click();
      const overlay = page.locator('body > .mobile-overlay-container');
      await expect(overlay).toBeVisible();
    });

    test('Menu closes using close button', async ({ page }) => {
      await page.locator('.mobile-menu-trigger').click();
      const overlay = page.locator('body > .mobile-overlay-container');
      await expect(overlay).toBeVisible();
      const closeBtn = page.locator('body > .mobile-overlay-container .mobile-close-btn');
      await closeBtn.click();
      await expect(overlay).toBeHidden();
    });

    test('Accordion opens inner links', async ({ page }) => {
      await page.locator('.mobile-menu-trigger').click();
      const accordion = page
        .locator('body > .mobile-overlay-container .mobile-accordion-trigger')
        .first();
      await accordion.click();
      const link = page.locator('body > .mobile-overlay-container .mobile-link-item').first();
      await expect(link).toBeVisible();
    });

    test('Menu closes on Escape key', async ({ page }) => {
      await page.locator('.mobile-menu-trigger').click();
      const overlay = page.locator('body > .mobile-overlay-container');
      await expect(overlay).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(overlay).toBeHidden();
    });

    test('Clicking a footer link closes the menu', async ({ page }) => {
      await page.locator('.mobile-menu-trigger').click();
      const overlay = page.locator('body > .mobile-overlay-container');
      await expect(overlay).toBeVisible();
      const footerBtn = page
        .locator('body > .mobile-overlay-container .mobile-footer-actions a')
        .last();
      await footerBtn.click();
      await expect(overlay).toBeHidden();
    });
  });
});
