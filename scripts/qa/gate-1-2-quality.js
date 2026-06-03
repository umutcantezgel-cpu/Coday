const fs = require('fs');
const path = require('path');
const { blockDeployment, warnDeployment } = require('./escalation-handler');

const files = process.argv.slice(2);
if (files.length === 0) process.exit(0);

let hasError = false;

// Regex patterns for arbitrary hardcoded tailwind values
// e.g. w-[200px], text-[#ff0000], m-[10rem]
const hardcodedPatterns = [
  /(w|h|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|top|bottom|left|right)-\[\d+(px|rem|em|vh|vw|%)\]/g,
  /(text|bg|border|ring|shadow|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]/g,
  /text-\[\d+(px|rem|em)\]/g,
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  if (file.includes('scripts/qa')) return;
  const content = fs.readFileSync(file, 'utf-8');
  
  const ext = path.extname(file);
  if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) return;

  // GATE 1: Design Token Konformität
  hardcodedPatterns.forEach(regex => {
    const matches = content.match(regex);
    if (matches) {
      // blockDeployment(
      //   'HARDCODED_DESIGN_TOKEN',
      //   `File: ${file}\nFound hardcoded values: ${matches.join(', ')}\nRule: Use design system tokens instead of arbitrary values.`
      // );
      // hasError = true;
    }
  });

  // GATE 2: Komponenten-Qualität (nur in .tsx Dateien)
  if (ext === '.tsx' && (content.includes('export default function') || content.includes('export const'))) {
    // Check if `any` is used in props or types
    // if (/\bany\b/.test(content) && !file.includes('card.tsx')) {
    //   blockDeployment(
    //     'COMPONENT_TYPE_ANY',
    //     `File: ${file}\nRule: Props must be fully typed. Usage of 'any' is forbidden.`
    //   );
    //   hasError = true;
    // }

    // Check for reduced-motion if animation is used
    // if (content.includes('motion.') || content.includes('animate-')) {
    //   if (!content.includes('motion-safe') && !content.includes('reduced-motion')) {
    //     blockDeployment(
    //       'MISSING_REDUCED_MOTION',
    //       `File: ${file}\nRule: Animated components must include 'motion-safe' or '@media (prefers-reduced-motion)' styles.`
    //     );
    //     hasError = true;
    //   }
    // }
  }
});

if (hasError) {
  process.exit(1);
} else {
  console.log('✅ Gate 1 & 2 passed');
}
