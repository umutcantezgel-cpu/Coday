import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  
  // Viewports to test
  const viewports = [
    { name: 'iPhone_SE', width: 375, height: 667 },
    { name: 'iPhone_14', width: 390, height: 844 },
    { name: 'iPad_Mini', width: 768, height: 1024 }
  ];

  const routes = [
    '/',
    '/services',
    '/contact',
    '/knowledge/blog'
  ];

  const artifactDir = '/Users/umurey/.gemini/antigravity/brain/2c3b722d-5126-4c1e-b072-c03229584a11';

  try {
    for (const viewport of viewports) {
      await page.setViewport(viewport);
      
      for (const route of routes) {
        // Go to local preview
        await page.goto(`http://localhost:4173${route}`, { waitUntil: 'networkidle0' });
        
        // Sanitize route name
        const routeName = route === '/' ? 'home' : route.replace(/\//g, '_').substring(1);
        const fileName = `mobile_audit_${viewport.name}_${routeName}.webp`;
        const filePath = path.join(artifactDir, fileName);

        await page.screenshot({ path: filePath, type: 'webp', quality: 50 });
        console.log(`Captured: ${fileName}`);
      }
    }
  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
})();
