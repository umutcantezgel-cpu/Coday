import { Project } from 'ts-morph';
const project = new Project({ tsConfigFilePath: "tsconfig.json" });
const sourceFiles = project.getSourceFiles();

let count = 0;
for (const sf of sourceFiles) {
  const filePath = sf.getFilePath();
  if (filePath.includes('node_modules')) continue;
  if (filePath.endsWith('.d.ts')) continue;
  if (filePath.includes('sanity.types.ts') || filePath.includes('supabase.types.ts')) continue;
  
  try {
    sf.organizeImports();
    count++;
  } catch(e) {}
}

project.saveSync();
console.log(`Organized imports in ${count} files.`);
