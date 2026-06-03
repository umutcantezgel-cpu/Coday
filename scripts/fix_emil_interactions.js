const fs = require('fs');
const path = require('path');

const uiDir = path.join(__dirname, '../src/features/services/ui');
const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(uiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix up duration if needed when hover:scale-[0.97] is present
  content = content.replace(/duration-500(?=[^"']*hover:scale-\[0\.97\])/g, 'duration-300');
  content = content.replace(/duration-500 ease-spring/g, 'duration-300 ease-spring');
  content = content.replace(/duration-500 ease-out bg-surface-elevated/g, 'duration-300 ease-spring bg-surface-elevated');

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed durations');
