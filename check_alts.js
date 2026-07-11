const fs = require('fs');
const glob = require('glob');
const globSync = glob.sync;

const files = globSync('src/**/*.tsx');

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const imgRegex = /<(OptimizedImage|img|Image)[^>]*>/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const tag = match[0];
    if (!tag.includes('alt=')) {
      console.log(`${file}: Missing alt in ${tag.substring(0, 50)}...`);
    } else if (tag.includes('alt=""') || tag.includes("alt={''}")) {
      console.log(`${file}: Empty alt in ${tag.substring(0, 50)}...`);
    }
  }
});
