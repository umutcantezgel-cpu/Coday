
const fs = require('fs');
const path = require('path');

// 1. Parse Icon.tsx to get supported icons
const iconFile = fs.readFileSync('/Users/umurey/agency-domination/src/shared/ui/Icon.tsx', 'utf8');
const mapMatch = iconFile.match(/const iconMap: Record<string, React.ElementType> = {([\s\S]*?)};/);

if (!mapMatch) {
    console.error("Could not find iconMap in Icon.tsx");
    process.exit(1);
}

const supportedIcons = new Set();
const mapContent = mapMatch[1];
const lines = mapContent.split('\n');
lines.forEach(line => {
    const match = line.match(/^\s*['"]?([a-zA-Z0-9_]+)['"]?:\s*[a-zA-Z0-9_]+,/);
    if (match) {
        supportedIcons.add(match[1]);
    }
});

console.log(`Found ${supportedIcons.size} supported icons in Icon.tsx`);

// 2. Scan codebase
const srcDir = '/Users/umurey/agency-domination/src';
const missingIcons = new Map(); // iconName -> [files]

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Matches: icon="name" or icon: "name" or icon: 'name'
            const regex = /icon[:=]\s*['"]([a-zA-Z0-9_]+)['"]/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const iconName = match[1];
                if (!supportedIcons.has(iconName) && !supportedIcons.has(iconName.toLowerCase())) {
                    if (!missingIcons.has(iconName)) {
                        missingIcons.set(iconName, []);
                    }
                    if (!missingIcons.get(iconName).includes(fullPath)) {
                        missingIcons.get(iconName).push(fullPath);
                    }
                }
            }
        }
    });
}

scanDir(srcDir);

// 3. Report
console.log("\n--- Missing Icons ---");
missingIcons.forEach((files, icon) => {
    console.log(`${icon}:`);
    files.forEach(f => console.log(`  - ${f.split('/src/')[1]}`));
});

if (missingIcons.size === 0) {
    console.log("No missing icons found!");
}
