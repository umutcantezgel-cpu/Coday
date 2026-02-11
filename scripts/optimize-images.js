import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

const imagesToOptimize = [
  {
    input: 'images/services/drei-kunden-reviews.webp',
    widths: [640, 320],
  },
];

async function optimize() {
  console.log('Starting image optimization...');

  for (const img of imagesToOptimize) {
    const inputPath = path.join(publicDir, img.input);

    if (!fs.existsSync(inputPath)) {
      console.warn(`Image not found: ${inputPath}`);
      continue;
    }

    const metadata = await sharp(inputPath).metadata();
    console.log(`Processing ${img.input} (${metadata.width}x${metadata.height})`);

    for (const width of img.widths) {
      if (metadata.width && metadata.width <= width) {
        console.log(`Skipping ${width}w for ${img.input} (original smaller/equal)`);
        continue;
      }

      const dir = path.dirname(inputPath);
      const ext = path.extname(inputPath);
      const name = path.basename(inputPath, ext);
      const outputPath = path.join(dir, `${name}-${width}w${ext}`);

      await sharp(inputPath).resize(width).toFile(outputPath);

      console.log(`Created ${outputPath}`);
    }
  }
  console.log('Done.');
}

optimize().catch((err) => {
  console.error(err);
  process.exit(1);
});
