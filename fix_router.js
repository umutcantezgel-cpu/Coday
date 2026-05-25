const fs = require('fs');
const path = require('path');

const files = [
  'src/features/calculator/ui/CalculatorClient.tsx',
  'src/features/knowledge/ui/BlogPostClient.tsx',
  'src/features/ai/ui/DataEndpointPageClient.tsx',
  'src/features/ai/ui/ReviewAggregatePageClient.tsx',
  'src/features/work/ui/ProjectDetailClient.tsx',
  'src/features/pricing/ui/PackagesClient.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Replace react-router-dom imports with Next.js navigation equivalents
  if (content.includes("from 'react-router-dom'") || content.includes('from "react-router-dom"')) {
    // Determine what is imported
    const importMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]react-router-dom['"];?/);
    if (importMatch) {
      const importedTokens = importMatch[1].split(',').map(t => t.trim());
      
      let nextIntlImports = [];
      let nextNavigationImports = [];

      if (importedTokens.includes('useNavigate')) {
        nextIntlImports.push('useRouter');
        content = content.replace(/useNavigate\(/g, 'useRouter(');
      }
      if (importedTokens.includes('useParams')) {
        nextNavigationImports.push('useParams');
      }
      if (importedTokens.includes('useLocation')) {
        nextIntlImports.push('usePathname');
        // Quick hack for useLocation
        content = content.replace(/const\s+location\s*=\s*useLocation\(\);/g, 'const pathname = usePathname();\n  const location = { pathname };');
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

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Replaced react-router-dom in ${filePath}`);
  }
});
