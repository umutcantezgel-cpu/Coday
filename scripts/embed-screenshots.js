const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../.antigravity/components');
const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('-documentation.md'));

files.forEach((file) => {
  const compName = file.replace('-documentation.md', '');
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // check if already has screenshot
  if (content.includes('![Screenshot]')) {
    console.log(`Already embedded in ${file}`);
    return;
  }

  // Find the first heading (e.g. # Button Component)
  const lines = content.split('\n');
  const h1Index = lines.findIndex((line) => line.startsWith('# '));

  if (h1Index !== -1) {
    lines.splice(h1Index + 1, 0, `\n![Screenshot](./screenshots/${compName}.png)\n`);
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Embedded screenshot in ${file}`);
  } else {
    // just prepend if no h1 found
    content = `![Screenshot](./screenshots/${compName}.png)\n\n` + content;
    fs.writeFileSync(filePath, content);
    console.log(`Prepend screenshot in ${file}`);
  }
});
