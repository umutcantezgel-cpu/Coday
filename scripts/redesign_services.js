const fs = require('fs');
const path = require('path');

const uiDir = path.join(__dirname, '../src/features/services/ui');
const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(uiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Colors mapping
  content = content.replace(/bg-white/g, 'bg-surface-elevated');
  content = content.replace(/bg-background-light/g, 'bg-surface-base');
  content = content.replace(/text-secondary/g, 'text-content-base');
  content = content.replace(/text-slate-600/g, 'text-content-muted');
  content = content.replace(/text-primary/g, 'text-action-primary');
  content = content.replace(/bg-gray-50/g, 'bg-surface-muted');
  content = content.replace(/border-gray-100/g, 'border-border-muted');
  content = content.replace(/border-gray-200/g, 'border-border-subtle');
  content = content.replace(/bg-slate-50/g, 'bg-surface-muted');
  
  // Typography mapping
  // Add max-w-prose to descriptions
  // We'll replace leading-[1.8] with leading-relaxed max-w-prose text-pretty
  content = content.replace(/leading-\[1\.8\]/g, 'leading-relaxed max-w-prose text-pretty');
  content = content.replace(/leading-relaxed(?! max-w-prose)/g, 'leading-relaxed max-w-prose text-pretty');
  
  // text-balance on headings
  content = content.replace(/text-[3456]xl[^"']*"/g, match => {
    if (!match.includes('text-balance')) {
      return match.slice(0, -1) + ' text-balance"';
    }
    return match;
  });

  // Hover micro-interactions
  // Find hover:scale-105 or hover:scale-110 or hover:shadow-lg or hover:-translate-y-1
  // and replace with hover:scale-[0.97] transition-transform duration-300 ease-spring
  content = content.replace(/hover:-translate-y-1/g, 'hover:scale-[0.97] ease-spring');
  content = content.replace(/hover:scale-105/g, 'hover:scale-[0.97] ease-spring');
  content = content.replace(/hover:scale-110/g, 'hover:scale-[0.97] ease-spring');
  
  // Also just append to GlareHover or BentoCard if they don't have it
  // Actually regex for generic cards
  
  // Dimensions for images (check if there's any image without explicit dimensions)
  // Most Next/Image already requires width and height or fill. We don't touch them if they have fill or width/height.

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Done redesigning services files');
