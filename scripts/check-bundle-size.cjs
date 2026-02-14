const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const BUILD_DIR = path.resolve(__dirname, '../build/client/assets');
// Limits in KB (gzip)
const LIMITS = {
    'index': 150,  // Legacy index
    'entry.client': 150, // Main entry point
    'ui': 50,     // UI library chunk
    'vendor': 200, // React & Core libs
    '*': 100       // Default for other chunks
};

function getGzipSize(filePath) {
    const fileContents = fs.readFileSync(filePath);
    return zlib.gzipSync(fileContents).length / 1024;
}

if (!fs.existsSync(BUILD_DIR)) {
    console.error(`Build directory not found: ${BUILD_DIR}`);
    process.exit(1);
}

const files = fs.readdirSync(BUILD_DIR).filter(f => f.endsWith('.js'));
let failed = false;

console.log('📦 Checking Bundle Sizes (Gzip)...');
console.log('-----------------------------------');

files.forEach(file => {
    const size = getGzipSize(path.join(BUILD_DIR, file));
    let limit = LIMITS['*'];

    // Find applicable limit
    for (const [key, val] of Object.entries(LIMITS)) {
        if (file.startsWith(key) && key !== '*') {
            limit = val;
            break;
        }
    }

    const status = size > limit ? '❌ FAIL' : '✅ PASS';
    console.log(`${status} ${file.padEnd(40)}: ${size.toFixed(2)} KB (Limit: ${limit} KB)`);

    if (size > limit) {
        failed = true;
    }
});

console.log('-----------------------------------');
if (failed) {
    console.error('🚨 Bundle size check failed!');
    process.exit(1);
} else {
    console.log('🎉 All bundles within limits.');
}
