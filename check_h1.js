const fs = require('fs');
const glob = require('glob');
const globSync = glob.sync;

const files = globSync('src/**/*.tsx');

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  // Count exact <h1> occurrences
  const h1Matches = content.match(/<h1[^>]*>/gi);
  if (h1Matches && h1Matches.length > 1) {
    console.log(`${file}: Multiple H1s (${h1Matches.length})`);
  } else if (
    !h1Matches &&
    file.includes('Client') &&
    !file.includes('Card') &&
    !file.includes('Section')
  ) {
    // maybe missing H1 on main client pages
    // console.log(`${file}: Missing H1`);
  }
});
