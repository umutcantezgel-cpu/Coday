---
name: cleanup-dead-imports
description: Remove unused imports from TypeScript/JavaScript files using a combination of tools and AST analysis.
tags: [cleanup, typescript, refactor]
trigger: User mentions "dead imports", "unused imports", "import cleanup"
---

# Cleanup Dead Imports

## Procedure

1. Verify tools: `npx eslint --version`, `npx tsc --version`
2. Run ESLint with `--rule "no-unused-vars: error" --rule "@typescript-eslint/no-unused-vars: error"`
3. Capture output, parse file-by-file
4. For each unused import:
   - Verify it's truly unused (not used as type-only via `import type`)
   - Verify it's not a side-effect import (e.g., `import 'normalize.css'`)
   - Remove the import statement
5. Run prettier on touched files
6. Run typecheck
7. Report removed imports count and affected files

## Hard Constraints

- DO NOT remove side-effect imports
- DO NOT remove imports inside .d.ts files
- DO NOT touch generated files (sanity.types.ts, supabase.types.ts)
