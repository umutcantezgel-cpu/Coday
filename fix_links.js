const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Fix imports
    if (content.includes("from '@/shared/ui/LocalizedLink'")) {
      content = content.replace(/import\s+\{\s*LocalizedNavLink\s+as\s+NavLink\s*\}\s+from\s+['"]@\/shared\/ui\/LocalizedLink['"];?/g, "import { Link as NavLink } from '@/i18n/navigation';");
      content = content.replace(/import\s+\{\s*LocalizedLink\s+as\s+Link\s*\}\s+from\s+['"]@\/shared\/ui\/LocalizedLink['"];?/g, "import { Link } from '@/i18n/navigation';");
      modified = true;
    }

    // Replace <Link to="..." with <Link href="..."
    if (content.includes("<Link") && content.includes("to=")) {
      content = content.replace(/<Link([^>]*)\bto=/g, "<Link$1href=");
      modified = true;
    }
    
    // Replace <NavLink to="..." with <NavLink href="..."
    if (content.includes("<NavLink") && content.includes("to=")) {
      content = content.replace(/<NavLink([^>]*)\bto=/g, "<NavLink$1href=");
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated LocalizedLink in ${filePath}`);
    }
  }
});
