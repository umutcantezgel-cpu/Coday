const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const client = await page.target().createCDPSession();
  await client.send('Performance.enable');

  console.log('Navigating to http://localhost:3000...');

  await page.tracing.start({ path: 'trace.json', screenshots: true });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Wait a bit
  await new Promise((r) => setTimeout(r, 1000));

  // Scroll down to trigger animations
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 150;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  });

  const metrics = await client.send('Performance.getMetrics');

  await page.tracing.stop();

  const formattedMetrics = {};
  for (const metric of metrics.metrics) {
    formattedMetrics[metric.name] = metric.value;
  }

  console.log('Metrics:');
  console.log(JSON.stringify(formattedMetrics, null, 2));

  // Parse trace for FPS and Layout
  const trace = JSON.parse(fs.readFileSync('trace.json', 'utf8'));

  let layoutCount = 0;
  let layoutDuration = 0;
  const frames = [];

  for (const event of trace.traceEvents) {
    if (event.name === 'Layout' && event.ph === 'X') {
      layoutCount++;
      layoutDuration += event.dur || 0;
    }
    if (event.name === 'DrawFrame') {
      frames.push(event.ts);
    }
  }

  let fps = 0;
  if (frames.length > 1) {
    const totalTimeMs = (frames[frames.length - 1] - frames[0]) / 1000;
    fps = frames.length / (totalTimeMs / 1000);
  }

  console.log(`\nEstimated FPS: ${fps.toFixed(2)}`);
  console.log(`Layout Triggers (from trace): ${layoutCount}`);
  console.log(`Total Layout Duration: ${(layoutDuration / 1000).toFixed(2)} ms`);
  console.log(
    `JS Heap Used Size: ${(formattedMetrics.JSHeapUsedSize / 1024 / 1024).toFixed(2)} MB`
  );

  await browser.close();
}

run().catch(console.error);
