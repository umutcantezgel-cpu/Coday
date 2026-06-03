const fs = require('fs');
const path = require('path');

const dateStr = new Date().toISOString().split('T')[0];
const progressDir = path.join(__dirname, '../../.antigravity/progress');
if (!fs.existsSync(progressDir)) {
  fs.mkdirSync(progressDir, { recursive: true });
}

const summaryPath = path.join(progressDir, `${dateStr}-daily.md`);

// In a real agentic setup, this script would read task.md to parse progress.
// For now, it mocks the parser.
const taskMdPath = path.join(__dirname, '../../.gemini/antigravity/brain/f2afa8cf-5c82-48c0-8a81-f91c694a753f/task.md');
let completed = 0;
let total = 32;

if (fs.existsSync(taskMdPath)) {
  const content = fs.readFileSync(taskMdPath, 'utf8');
  const matches = content.match(/- \\[x\\]/g);
  if (matches) completed = matches.length;
}

const percent = Math.round((completed / total) * 100);

const reportContent = `# Täglicher Fortschrittsbericht - ${dateStr}

## Status: IN PROGRESS
**Gesamtfortschritt:** ${percent}% (${completed} von ${total} Aufgaben abgeschlossen)

## Blockierende Probleme
- Keine (Schwarm läuft autark)

## Nächste geplante Meilensteine
- Phase 2: Design System Token Integration
- Phase 3: Base Component Refactoring
`;

fs.writeFileSync(summaryPath, reportContent, 'utf8');
console.log(`Daily progress generated at: ${summaryPath}`);
