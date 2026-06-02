import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Capture Component Screenshots', () => {
  test('capture all', async ({ page }) => {
    await page.goto('http://localhost:3000/en/test-all', { waitUntil: 'networkidle' });

    // Wait for the page to be ready
    await page.waitForTimeout(1000); // Give it some time to render and for toast to appear

    const screenshotsDir = path.resolve('.antigravity/components/screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const simpleComponents = [
      'alert',
      'badge',
      'breadcrumb',
      'button',
      'card',
      'container',
      'divider',
      'grid',
      'icon',
      'input',
      'navbar',
      'progress',
      'sidebar',
      'skeleton',
      'spinner',
      'tabs',
    ];

    for (const comp of simpleComponents) {
      const locator = page.locator(`#wrapper-${comp}`);
      await locator.waitFor({ state: 'visible' });
      await locator.screenshot({ path: path.join(screenshotsDir, `${comp}.png`) });
    }

    // Toast
    const toastLocator = page.locator('li[role="status"], .group.toast').first();
    if (await toastLocator.isVisible()) {
      await toastLocator.screenshot({ path: path.join(screenshotsDir, 'toast.png') });
    } else {
      await page.screenshot({ path: path.join(screenshotsDir, 'toast.png') });
    }

    // Tooltip
    await page.hover('#tooltip-trigger');
    await page.waitForTimeout(500); // Wait for tooltip to animate
    await page
      .locator('#wrapper-tooltip')
      .screenshot({ path: path.join(screenshotsDir, 'tooltip.png') });

    // Popover
    await page.click('#popover-trigger');
    await page.waitForTimeout(500);
    // screenshot the whole wrapper so we see the trigger and the popover content
    await page
      .locator('#wrapper-popover')
      .screenshot({ path: path.join(screenshotsDir, 'popover.png') });

    // close popover by clicking outside
    await page.mouse.click(0, 0);
    await page.waitForTimeout(500);

    // Modal
    await page.click('#trigger-modal');
    await page.waitForTimeout(500);
    const modalLocator = page.locator('[role="dialog"]').first();
    await modalLocator.screenshot({ path: path.join(screenshotsDir, 'modal.png') });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Drawer
    await page.click('#trigger-drawer');
    await page.waitForTimeout(500);
    const drawerLocator = page.locator('[role="dialog"]').first();
    await drawerLocator.screenshot({ path: path.join(screenshotsDir, 'drawer.png') });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    // Primitives page & Overlays page screenshots
    await page
      .locator('#primitives-page')
      .screenshot({ path: path.join(screenshotsDir, 'primitives-page.png') });
    await page
      .locator('#overlays-page')
      .screenshot({ path: path.join(screenshotsDir, 'overlays-page.png') });

    console.log('Captured 23 screenshots.');
  });
});
