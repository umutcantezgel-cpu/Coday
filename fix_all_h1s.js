const fs = require('fs');
const glob = require('glob');

function fixKeywords() {
  const files = glob.sync('src/features/local-seo/model/content/*.json');
  let fixedCount = 0;

  for (const file of files) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      console.log(`Error parsing ${file}: ${e.message}`);
      continue;
    }

    if (!data.hero) continue;

    const h1Str = data.hero.subheadline || '';
    let bodyStr = data.hero.description || '';
    if (data.hero.headline) bodyStr += ' ' + data.hero.headline;

    const h1WordsRaw = h1Str
      .replace(/[^a-zA-ZäöüßÄÖÜ]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3);
    const missing = [];

    for (const w of h1WordsRaw) {
      const regex = new RegExp(`\\b${w}\\b`, 'i');
      if (!regex.test(bodyStr)) {
        missing.push(w);
      }
    }

    if (missing.length > 0) {
      // Prepend the missing keywords/the whole H1 to the description
      // A natural way is just to prepend the subheadline as a sentence.
      let newDesc = `${h1Str} ${data.hero.description || ''}`.trim();
      data.hero.description = newDesc;

      fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`Fixed ${file}`);
      fixedCount++;
    }
  }
  console.log(`Total fixed: ${fixedCount}`);
}
fixKeywords();
