---
name: competitor-snapshot
description: Capture a snapshot of competitor websites for periodic comparison.
tags: [seo, competitor-analysis, browser]
trigger: When user asks for competitor analysis or "snapshot"
needs_browser: true
---

# Competitor Snapshot

## Procedure

This skill REQUIRES `/browser` mode.

1. Read competitor list from .agent/competitors.json
   (Default: webdesignwetzlar.de, weflash.studio, redim.de,
    kagu-media.de, lahn-dill-design.de)

2. For each competitor:
   - Open in Chrome with mobile viewport
   - Extract:
     * Page title and meta description
     * H1 text
     * Primary CTA text and color
     * Detected tech stack (look for X-Powered-By, _next, etc.)
     * Whether they have llms.txt
     * Whether they have JSON-LD (and which @types)
   - Take a full-page screenshot

3. Compile comparison table:
   ```
   | Domain | Stack | H1 | CTA | llms.txt | Schema |
   |--------|-------|-----|-----|----------|--------|
   ```

4. Save to ~/projects/coday-docs/competitor-snapshots/{date}/

5. Compare to previous snapshot (if exists) — flag changes
