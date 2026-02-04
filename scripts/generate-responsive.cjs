
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🖼️  Responsive Image Generator (Node.js)');
console.log('=======================================');

const SIZES = [320, 640, 1024, 1920];
const DIRS = ['public/images/hero', 'public/images/portfolio', 'public/images/team'];

// Ensure sharp-cli is available
try {
    execSync('npx -y sharp-cli --help', { stdio: 'ignore' });
} catch (e) {
    console.log('Installing sharp-cli...');
}

async function processFile(filePath) {
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const base = path.basename(filePath, ext);

    if (base.match(/-\d+w$/)) return; // Skip existing resized versions

    console.log(`Processing: ${base}${ext}`);

    for (const size of SIZES) {
        const outFile = path.join(dir, `${base}-${size}w.webp`);
        if (!fs.existsSync(outFile)) {
            try {
                console.log(`  -> ${size}w`);
                // Using npx -y sharp-cli for each file is still slow, but parallelizing could help.
                // For now, let's just run it synchronously but reliably.
                execSync(`npx -y sharp-cli -i "${filePath}" -o "${outFile}" resize ${size} --withoutEnlargement`, { stdio: 'inherit' });
            } catch (err) {
                console.error(`  ❌ Failed to generate ${size}w for ${base}`);
            }
        }
    }
}

async function main() {
    for (const dir of DIRS) {
        const fullDir = path.resolve(process.cwd(), dir);
        if (!fs.existsSync(fullDir)) continue;

        const files = fs.readdirSync(fullDir);
        for (const file of files) {
            if (file.endsWith('.webp')) {
                await processFile(path.join(fullDir, file));
            }
        }
    }
    console.log('✅ Done!');
}

main();
