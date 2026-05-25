---
name: safe-commit
description: Generate a Conventional Commit message, but never actually commit. Stages files for user review.
tags: [git, workflow]
trigger: User says "commit", "make a commit", "save this"
---

# Safe Commit

## Procedure

1. Run `git status` and `git diff --stat` to summarize changes
2. Analyze changes:
   - What was added/modified/deleted
   - Primary scope (which folder/feature)
   - Type: feat / fix / chore / refactor / perf / docs / test / build / ci

3. Generate Conventional Commit message:
   - Format: `type(scope): subject` (max 72 chars)
   - Body: bullet points of key changes
   - Footer: BREAKING CHANGE if applicable

4. `git add` ONLY the files that match the changes (no random adds)

5. Output:
   ```
   Suggested commit message:

   <message>

   Files staged:
   <list>

   To commit, run:
   git commit -m "<message>"

   Or amend and commit yourself.
   ```

## Hard Constraint

NEVER run `git commit` or `git push` automatically. Always wait for human.
