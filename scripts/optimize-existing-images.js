import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '../public/assets/images');
const MAX_WIDTH = 1920;
const QUALITY = 80;
const SIZE_THRESHOLD = 500 * 1024; // 500KB

const formatSize = (bytes) => {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};

const optimizeFile = async (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size < SIZE_THRESHOLD) return;

    const metadata = await sharp(filePath).metadata();

    // Skip if already small enough dimensions (though size might be big due to lack of compression)
    /* 
           Actually, even if dimensions are small, we might want to compress if size is huge.
           But let's resize if width > MAX_WIDTH
        */

    let pipeline = sharp(filePath);

    if (metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    // Compress based on format
    if (filePath.endsWith('.png')) {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    } else if (filePath.match(/\.jpe?g$/i)) {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    } else {
      return; // Skip other formats
    }

    // Process to buffer first to check result size
    const buffer = await pipeline.toBuffer();

    if (buffer.length < stats.size) {
      fs.writeFileSync(filePath, buffer);
      console.log(`✅ Optimized: ${path.basename(filePath)}`);
      console.log(`   Before: ${formatSize(stats.size)} -> After: ${formatSize(buffer.length)}`);
      console.log(`   Savings: ${((1 - buffer.length / stats.size) * 100).toFixed(1)}%`);
    } else {
      console.log(`⚠️  Skipped: ${path.basename(filePath)} (Optimization resulted in larger file)`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
};

const scanDirectory = async (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      await scanDirectory(filePath);
    } else if (stats.isFile()) {
      if (file.match(/\.(jpe?g|png)$/i)) {
        await optimizeFile(filePath);
      }
    }
  }
};

console.log(`🚀 Starting Image Optimization...`);
console.log(`   Target: ${PUBLIC_DIR}`);
console.log(`   Threshold: > 500KB`);
console.log(`   Max Width: ${MAX_WIDTH}px`);

scanDirectory(PUBLIC_DIR);
