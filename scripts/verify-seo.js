import puppeteer from 'puppeteer';

const BASE_URL = 'http://localhost:3001';

async function verifyUrl(browser, path, expectedLang) {
  console.log(`Verifying ${path}...`);
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.toString()));
  page.on('requestfailed', (req) =>
    console.log('REQUEST FAILED:', req.url(), req.failure().errorText)
  );

  // Clear SW
  try {
    await page.goto(BASE_URL);
    await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
          console.log('Unregistered SW');
        }
      }
    });
  } catch (e) {
    console.log('Error clearing SW:', e);
  }

  try {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle0' });
    // Wait for React hydration
    await new Promise((r) => setTimeout(r, 5000));
    const finalUrl = page.url();
    console.log(`Visited: ${path}. Final URL: ${finalUrl}`);

    let failed = false;

    // 1. Check HTML Lang
    const lang = await page.evaluate(() => document.documentElement.lang);
    const dir = await page.evaluate(() => document.documentElement.dir);

    if (lang !== expectedLang) {
      console.error(
        `[FAIL] HTML lang attribute mismatch. Found: ${lang}. Expected: ${expectedLang}`
      );
      return false;
    } else {
      console.log(`[PASS] HTML lang="${lang}" found.`);
    }

    // 1b. Check Title
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    if (!title.includes('Coday')) {
      console.error(`[FAIL] Title incorrect/missing. Found: "${title}"`);
      failed = true;
    } else {
      console.log(`[PASS] Title seems correct.`);
    }

    // 2. Check Canonical
    const canonical = await page.evaluate(() => {
      const el = document.querySelector('link[rel="canonical"]');
      return el ? el.href : null;
    });

    // Expected canonical logic:
    // /en -> https://coday.de/en
    // /de -> https://coday.de/de
    // / -> https://coday.de/
    // Note: The app might redirect / to /de or /en.
    // We need to account for what the *current* URL is in the browser if a redirect happened.
    const currentUrl = page.url();
    // If we navigated to /en, we expect to stay there.

    // SeoHead uses standard logic.
    const expectedCanonical = `https://coday.de${path.replace(/\/$/, '')}`; // simplified

    if (!canonical) {
      console.error(`[FAIL] Canonical tag missing.`);
      const headContent = await page.evaluate(() => document.head.innerHTML);
      console.log('DEBUG: Head Content:', headContent);
      failed = true;
    } else if (canonical !== expectedCanonical && canonical !== expectedCanonical + '/') {
      console.error(
        `[FAIL] Canonical mismatch. Found: ${canonical}, Expected: ${expectedCanonical}`
      );
      const headContent = await page.evaluate(() => document.head.innerHTML);
      console.log('DEBUG: Head Content:', headContent);
      failed = true;
    } else {
      console.log(`[PASS] Canonical tag correct: ${canonical}`);
    }

    // 3. Check Hreflang
    const hreflangs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((el) => ({
        lang: el.hreflang,
        href: el.href,
      }));
    });

    const hasDe = hreflangs.some((l) => l.lang === 'de' && l.href.includes('/de'));
    const hasEn = hreflangs.some((l) => l.lang === 'en' && l.href.includes('/en'));
    const hasXDefault = hreflangs.some((l) => l.lang === 'x-default');

    if (!hasDe) console.error(`[FAIL] hreflang="de" missing.`);
    if (!hasEn) console.error(`[FAIL] hreflang="en" missing.`);
    if (!hasXDefault) console.error(`[FAIL] hreflang="x-default" missing.`);

    if (hasDe && hasEn && hasXDefault) {
      console.log(`[PASS] All hreflang tags present.`);
    } else {
      return false;
    }

    return !failed;
  } catch (error) {
    console.error(`Error verifying ${path}:`, error);
    return false;
  } finally {
    await page.close();
  }
}

async function run() {
  console.log('Starting SEO Verification (Puppeteer)...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // Test EN Home
    const enParams = await verifyUrl(browser, '/en', 'en');

    // Test DE Home
    const deParams = await verifyUrl(browser, '/de', 'de');

    // Test Services EN
    const enServices = await verifyUrl(browser, '/en/services', 'en');

    if (enParams && deParams && enServices) {
      console.log('\n✅ ALL CHECKS PASSED');
    } else {
      console.error('\n❌ SOME CHECKS FAILED');
      process.exit(1);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
