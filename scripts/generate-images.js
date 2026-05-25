import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DIRS_TO_SCAN = [
  path.join(rootDir, 'public'),
  path.join(rootDir, 'src', 'assets')
];

async function generateImagesForFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const dir = path.dirname(filePath);
    const basename = path.basename(filePath, path.extname(filePath));
    
    const webpPath = path.join(dir, `${basename}.webp`);
    const avifPath = path.join(dir, `${basename}.avif`);

    const sourceStat = await fs.stat(filePath);

    // Check if webp needs generation
    let needsWebp = false;
    try {
      const webpStat = await fs.stat(webpPath);
      if (sourceStat.mtime > webpStat.mtime) needsWebp = true;
    } catch {
      needsWebp = true;
    }

    if (needsWebp) {
      console.log(`Generating ${webpPath}`);
      try {
        await sharp(filePath).webp({ quality: 80 }).toFile(webpPath);
      } catch (error) {
        console.error(`Error generating ${webpPath}:`, error.message);
      }
    }

    // Check if avif needs generation
    let needsAvif = false;
    try {
      const avifStat = await fs.stat(avifPath);
      if (sourceStat.mtime > avifStat.mtime) needsAvif = true;
    } catch {
      needsAvif = true;
    }

    if (needsAvif) {
      console.log(`Generating ${avifPath}`);
      try {
        await sharp(filePath).avif({ quality: 75 }).toFile(avifPath);
      } catch (error) {
        console.error(`Error generating ${avifPath}:`, error.message);
      }
    }
  }
}

async function processDirectory(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`Error reading directory ${dir}:`, error);
    }
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    try {
      if (entry.isDirectory()) {
        await processDirectory(fullPath);
      } else {
        await generateImagesForFile(fullPath);
      }
    } catch (error) {
      console.error(`Error processing ${fullPath}:`, error);
    }
  }
}

async function main() {
  console.log('Generating optimized images (WebP/AVIF)...');
  for (const dir of DIRS_TO_SCAN) {
    await processDirectory(dir);
  }
  console.log('Image generation complete.');
}

main().catch(console.error);
