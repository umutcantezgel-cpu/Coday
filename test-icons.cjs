const icons = require('@phosphor-icons/react/dist/ssr');
const src = require('fs').readFileSync('src/shared/ui/Icon.tsx', 'utf-8');
const match = src.match(/import\s*\{([^}]*)\}\s*from\s*'@phosphor-icons\/react\/dist\/ssr'/s);
if (match) {
  const list = match[1].split(',').map(s => s.trim().split(' as ')[0].trim()).filter(Boolean);
  list.forEach(i => {
    if (!(i in icons)) console.log('Missing:', i);
  });
}
