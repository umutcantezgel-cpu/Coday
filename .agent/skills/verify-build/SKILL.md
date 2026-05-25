---
name: verify-build
description: Run the full verification suite (typecheck, lint, build) and report results.
tags: [verification, quality]
trigger: After any code change, before user confirms task complete
---

# Verify Build

## Procedure

1. `npm run typecheck` — capture output, must exit 0
2. `npm run lint` — capture output, warnings OK, errors not
3. `npm run build` — capture output, must complete successfully
4. Check .next/build output size, compare to baseline if available

## Reporting

Format:
```
✅ typecheck: passed (0 errors)
⚠️  lint: passed (N warnings)
✅ build: completed in Xs
   Bundle size: Y KB (Δ vs baseline: Z)
```

If anything fails:
- Show the exact error message
- Stop and report — do NOT mark task complete
- Suggest 1-2 likely root causes
