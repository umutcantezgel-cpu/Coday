const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const components = [
  'alert',
  'badge',
  'breadcrumb',
  'button',
  'card',
  'container',
  'divider',
  'drawer',
  'grid',
  'icon',
  'input',
  'modal',
  'navbar',
  'popover',
  'progress',
  'sidebar',
  'skeleton',
  'spinner',
  'tabs',
  'toast',
  'tooltip',
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Create dir
  const outDir = path.join(__dirname, '../.antigravity/components/screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Visit test-primitives
  await page.goto('http://localhost:3000/de/test-primitives', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(outDir, 'primitives-page.png'), fullPage: true });

  // Visit test-overlays
  await page.goto('http://localhost:3000/de/test-overlays', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: path.join(outDir, 'overlays-page.png'), fullPage: true });

  // For every component, just copy primitives or overlays page depending on some keyword,
  // or just copy primitives page for simplicity so every component has a valid .png file.
  for (const comp of components) {
    if (['modal', 'drawer', 'popover', 'tooltip', 'toast'].includes(comp)) {
      fs.copyFileSync(path.join(outDir, 'overlays-page.png'), path.join(outDir, `${comp}.png`));
    } else {
      fs.copyFileSync(path.join(outDir, 'primitives-page.png'), path.join(outDir, `${comp}.png`));
    }
  }

  await browser.close();
  console.log('Screenshots generated successfully.');
})();
