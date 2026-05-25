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

    if (content.includes("from 'react-router'") || content.includes('from "react-router"')) {
      const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]react-router['"];?/);
      if (importMatch) {
        const importedTokens = importMatch[1].split(',').map(t => t.trim());
        
        let nextIntlImports = [];
        let nextNavigationImports = [];

        if (importedTokens.includes('useNavigate')) {
          nextIntlImports.push('useRouter');
          content = content.replace(/useNavigate\(/g, 'useRouter(');
        }
        if (importedTokens.includes('Link')) {
          nextIntlImports.push('Link');
        }

        let newImportStr = '';
        if (nextIntlImports.length > 0) {
          newImportStr += `import { ${nextIntlImports.join(', ')} } from '@/i18n/navigation';\n`;
        }
        if (nextNavigationImports.length > 0) {
          newImportStr += `import { ${nextNavigationImports.join(', ')} } from 'next/navigation';\n`;
        }

        content = content.replace(importMatch[0], newImportStr);
        modified = true;
      }
    }

    if (content.includes("from 'react-helmet-async'") || content.includes('from "react-helmet-async"')) {
      content = content.replace(/import\s+\{[^}]+\}\s+from\s+['"]react-helmet-async['"];?/g, "");
      // Remove <Helmet>...</Helmet> entirely (simplified)
      content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, "");
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated react-router/helmet in ${filePath}`);
    }
  }
});
