const fs = require('fs');
let code = fs.readFileSync('src/components/ui/input.tsx', 'utf8');

// Replace colors in wrapper and input classes
code = code.replace(/bg-white/g, 'bg-surface-base');
code = code.replace(/border-gray-200/g, 'border-border-base');
code = code.replace(/focus-within:border-primary-600 focus-within:ring-1 focus-within:ring-primary-600/g, 'focus-within:border-action-primary focus-within:ring-1 focus-within:ring-action-primary');
code = code.replace(/bg-gray-50/g, 'bg-surface-muted');
code = code.replace(/text-gray-400/g, 'text-content-muted');
code = code.replace(/text-gray-500/g, 'text-content-muted');
code = code.replace(/text-secondary/g, 'text-content-base');
code = code.replace(/text-primary-600/g, 'text-action-primary');
code = code.replace(/text-red-500/g, 'text-danger-base');

// Replace transitions
code = code.replace(/duration-150 ease-appear/g, 'duration-300 ease-spring');

fs.writeFileSync('src/components/ui/input.tsx', code);
