import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Navigating to http://localhost:3001/de');
  await page.goto('http://localhost:3001/de');
  
  console.log('Waiting for network idle...');
  await page.waitForLoadState('networkidle');

  console.log('Running Axe...');
  let logOutput = '';
  try {
    const results = await new AxeBuilder({ page }).analyze();
    logOutput += '--- Axe Results ---\n';
    logOutput += `Violations: ${results.violations.length}\n`;
    if (results.violations.length > 0) {
      logOutput += JSON.stringify(results.violations, null, 2) + '\n';
    }
  } catch (e) {
    logOutput += 'Axe error: ' + e + '\n';
  }

  logOutput += '\n--- Keyboard Navigation Test ---\n';
  const focusable = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    const focusedInfo = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        text: el.textContent?.substring(0, 30).trim().replace(/\n/g, ''),
        visible: rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.opacity !== '0',
        width: rect.width,
        height: rect.height,
        opacity: style.opacity
      };
    });
    if (focusedInfo) {
      focusable.push(focusedInfo);
    }
  }
  
  logOutput += 'Focused elements order:\n';
  logOutput += JSON.stringify(focusable, null, 2) + '\n';

  fs.writeFileSync(path.join(process.cwd(), '.agents/teamwork_preview_challenger_m1_1/a11y-results.txt'), logOutput);
  console.log('Done writing results to a11y-results.txt');

  await browser.close();
})();
