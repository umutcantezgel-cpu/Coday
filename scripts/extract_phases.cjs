const fs = require('fs');
const transcript = fs.readFileSync('/Users/umurey/.gemini/antigravity/brain/38714ecf-ae76-4c28-b45c-9ad2be6e97a2/.system_generated/logs/transcript.jsonl', 'utf-8');
const lines = transcript.split('\n');
for (const line of lines) {
  if (line.includes('"type":"USER_INPUT"')) {
    const data = JSON.parse(line);
    const content = data.content;
    const startIndex = content.indexOf('Phase 1');
    if (startIndex !== -1) {
      console.log(content.substring(startIndex, startIndex + 5000));
      break;
    }
  }
}
