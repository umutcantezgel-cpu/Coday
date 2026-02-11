/**
 * Image Optimization Script
 * Converts all JPEG/PNG images in public/images/ to WebP
 * Resizes to max 1920px width while maintaining aspect ratio
 * Outputs to same directories with .webp extension
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, relative } from 'path';

const SOURCE_DIR = './public/images';
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function getAllImages(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...(await getAllImages(fullPath)));
        } else {
            const ext = extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                files.push(fullPath);
            }
        }
    }

    return files;
}

async function convertImage(inputPath) {
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const relPath = relative('.', inputPath);

    try {
        const info = await stat(inputPath);
        const sizeMB = (info.size / 1024 / 1024).toFixed(1);

        await sharp(inputPath)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .webp({ quality: QUALITY })
            .toFile(outputPath);

        const newInfo = await stat(outputPath);
        const newSizeMB = (newInfo.size / 1024 / 1024).toFixed(1);
        const savings = ((1 - newInfo.size / info.size) * 100).toFixed(0);

        console.log(`✅ ${relPath}: ${sizeMB}MB → ${newSizeMB}MB (-${savings}%)`);
        return { original: info.size, optimized: newInfo.size };
    } catch (err) {
        console.error(`❌ ${relPath}: ${err.message}`);
        return { original: 0, optimized: 0 };
    }
}

async function main() {
    console.log('🖼️  Finding images...');
    const images = await getAllImages(SOURCE_DIR);
    console.log(`Found ${images.length} images to convert\n`);

    let totalOriginal = 0;
    let totalOptimized = 0;

    for (const img of images) {
        const result = await convertImage(img);
        totalOriginal += result.original;
        totalOptimized += result.optimized;
    }

    const totalOriginalMB = (totalOriginal / 1024 / 1024).toFixed(1);
    const totalOptimizedMB = (totalOptimized / 1024 / 1024).toFixed(1);
    const totalSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(0);

    console.log(`\n📊 Summary:`);
    console.log(`   Original:  ${totalOriginalMB} MB`);
    console.log(`   Optimized: ${totalOptimizedMB} MB`);
    console.log(`   Savings:   ${totalSavings}%`);
}

main().catch(console.error);
