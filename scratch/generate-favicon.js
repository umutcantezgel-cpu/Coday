const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../src/assets/images/coday_logo.svg');
const iconPath = path.join(__dirname, '../src/app/icon.svg');
const appleIconPath = path.join(__dirname, '../src/app/apple-icon.svg');

let logoSvg = fs.readFileSync(logoPath, 'utf8');

// Extract the inner content of the SVG
const innerMatch = logoSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
if (!innerMatch) {
  console.error('Could not parse SVG');
  process.exit(1);
}

const innerContent = innerMatch[1];

// viewBox is 0 0 1008 576. We want a square 1024x1024 with a white circle.
// (1024 - 1008)/2 = 8
// (1024 - 576)/2 = 224
// Scale by 0.95:
// New width: 1008 * 0.95 = 957.6
// New height: 576 * 0.95 = 547.2
// New X: (1024 - 957.6)/2 = 33.2
// New Y: (1024 - 547.2)/2 = 238.4

const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
  <circle cx="512" cy="512" r="512" fill="#FFFFFF" />
  <g transform="translate(33.2, 238.4) scale(0.95)">
    ${innerContent}
  </g>
</svg>`;

fs.writeFileSync(iconPath, newSvg, 'utf8');
fs.writeFileSync(appleIconPath, newSvg, 'utf8');

console.log('Successfully generated icon.svg and apple-icon.svg with a white circular background.');
