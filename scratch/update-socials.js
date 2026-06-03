const fs = require('fs');
const path = require('path');

const companyPath = 'src/shared/data/company.ts';
let companyCode = fs.readFileSync(companyPath, 'utf8');
companyCode = companyCode.replace(
  /linkedin:\s*'[^']+',/,
  "linkedin: 'https://www.linkedin.com/in/umutcan-emre-tezgel-65a41a3aa/',"
);
companyCode = companyCode.replace(
  /instagram:\s*'[^']+',/,
  "instagram: 'https://www.instagram.com/codayweb/',"
);
companyCode = companyCode.replace(
  /github:\s*'[^']+',/,
  "facebook: 'https://www.facebook.com/profile.php?id=61588758264018',\n    github: 'https://github.com/coday',"
);
fs.writeFileSync(companyPath, companyCode);

// Helper to replace links
function replaceLinks(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  
  // LinkedIn
  code = code.replace(/href="\/contact"(\s*aria-label="[^"]*LinkedIn")/g, 'href="https://www.linkedin.com/in/umutcan-emre-tezgel-65a41a3aa/" target="_blank" rel="noopener noreferrer"$1');
  code = code.replace(/href="\/contact"([\s]*aria-label="LinkedIn")/g, 'href="https://www.linkedin.com/in/umutcan-emre-tezgel-65a41a3aa/" target="_blank" rel="noopener noreferrer"$1');
  
  // Instagram
  code = code.replace(/href="\/contact"(\s*aria-label="[^"]*Instagram")/g, 'href="https://www.instagram.com/codayweb/" target="_blank" rel="noopener noreferrer"$1');
  code = code.replace(/href="\/contact"([\s]*aria-label="Instagram")/g, 'href="https://www.instagram.com/codayweb/" target="_blank" rel="noopener noreferrer"$1');
  
  // Facebook
  code = code.replace(/href="\/contact"(\s*aria-label="[^"]*Facebook")/g, 'href="https://www.facebook.com/profile.php?id=61588758264018" target="_blank" rel="noopener noreferrer"$1');
  code = code.replace(/href="\/contact"([\s]*aria-label="Facebook")/g, 'href="https://www.facebook.com/profile.php?id=61588758264018" target="_blank" rel="noopener noreferrer"$1');

  // Twitter (let's remove or hide it if it exists by just keeping it pointing to /contact, but user didn't ask to remove it so we just leave it or remove it entirely. The easiest is to leave it to /contact).

  fs.writeFileSync(filePath, code);
}

replaceLinks('src/widgets/layout/Footer.tsx');
replaceLinks('src/features/contact/ui/ContactClient.tsx');
replaceLinks('src/widgets/floating-menu/FloatingActionMenu.tsx');

console.log("Social links updated successfully!");
