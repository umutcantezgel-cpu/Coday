import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, '../Bilder Webseite');
const DEST_DIR = path.resolve(__dirname, '../public/assets/images');

// Ensure source directory exists
if (!fs.existsSync(SRC_DIR)) {
  console.error(`Source directory not found: ${SRC_DIR}`);
  process.exit(1);
}

const processImage = async (filename, category, subcategory, newName, type = 'card') => {
  const sourcePath = path.join(SRC_DIR, filename);

  if (!fs.existsSync(sourcePath)) {
    console.error(`File not found: ${filename}`);
    return;
  }

  const destSubDir = path.join(DEST_DIR, category, subcategory);
  if (!fs.existsSync(destSubDir)) {
    fs.mkdirSync(destSubDir, { recursive: true });
  }

  const destPath = path.join(destSubDir, `${newName}.webp`);

  // Define sizing logic
  let width = 800; // Default for cards
  if (type === 'hero') width = 1920;
  if (type === 'thumbnail') width = 400;

  try {
    await sharp(sourcePath)
      .resize({ width: width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destPath);

    console.log(`✅ Processed: ${newName}.webp (${width}px) -> ${category}/${subcategory}`);
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error);
  }
};

// Example usage (uncomment or call dynamically):
// processImage('original-file.jpg', 'industries', 'gastronomie', 'hero-restaurant', 'hero');

// Export function if needed for other scripts, or run standalone args
const args = process.argv.slice(2);
if (args.length >= 4) {
  const [filename, category, subcategory, newName, type] = args;
  processImage(filename, category, subcategory, newName, type);
} else {
  console.log(
    'Usage: node scripts/process-image.js <filename> <category> <subcategory> <newName> [type]'
  );
}
