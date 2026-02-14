import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
const inputFile = path.join(publicDir, 'favicon.svg');

const sizes = [
  { name: 'pwa-192.png', width: 192 },
  { name: 'pwa-512.png', width: 512 },
  { name: 'apple-touch-icon.png', width: 180 },
];

async function generateIcons() {
  if (!fs.existsSync(inputFile)) {
    console.error('favicon.svg not found in public directory');
    process.exit(1);
  }

  for (const size of sizes) {
    const outputFile = path.join(publicDir, size.name);
    try {
      await sharp(inputFile).resize(size.width, size.width).png().toFile(outputFile);
      console.log(`Generated ${size.name}`);
    } catch (err) {
      console.error(`Error generating ${size.name}:`, err);
    }
  }
}

generateIcons();
