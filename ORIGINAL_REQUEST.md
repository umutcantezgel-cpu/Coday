# Original User Request

## Initial Request — 2026-05-23T11:00:57Z

Das Projektziel ist es, die Website der Coday Agency durch eine umfassende Local SEO, technische SEO und Barrierefreiheits-Optimierung (a11y) so zu verbessern, dass sie in "Wetzlar und Umgebung" den ersten Platz in den Suchmaschinen erreicht.

Working directory: /Users/umurey/agency-domination
Integrity mode: development

## Requirements

### R1. Local SEO on Existing Pages
Optimiere die bestehenden Seiten (Homepage, Services) für den Standort "Wetzlar", ohne neue Seiten hinzuzufügen. Integriere lokales Schema.org Markup (LocalBusiness) direkt in die bestehende Struktur, um die Relevanz in der Region zu erhöhen.

### R2. Technical SEO & a11y
Behebe technische und strukturelle Barrierefreiheits-Probleme basierend auf den web.dev a11y-Guidelines. Dies schließt korrekte semantische Tags, ARIA-Attribute, ausreichende Kontraste und Tastatur-Navigierbarkeit ein, was sich positiv auf das Suchmaschinenranking auswirkt. Du kannst das a11y-debugging Skill für Chrome DevTools verwenden. Du kannst auch den Browser-Subagenten (`browser`) benutzen.

## Verification Resources
Das Projekt enthält bereits Lighthouse- und Playwright-Konfigurationen, die zur automatischen Überprüfung der Änderungen herangezogen werden können.

## Acceptance Criteria

### Verifizierung der Maßnahmen
- [ ] Lighthouse Accessibility (a11y) und SEO Scores für die Startseite und Service-Seiten liegen bei 100/100 (überprüft mittels der lokalen Lighthouse-Konfiguration).
- [ ] Alle bestehenden Playwright E2E-Tests durchlaufen erfolgreich (keine Regressionen).
- [ ] Ein gültiges `LocalBusiness` Schema.org JSON-LD Skript ist im `<head>` oder `<body>` der optimierten Seiten vorhanden und spezifiziert Wetzlar als Standort.

## Follow-up — 2026-05-23T19:46:45Z

Das Agenten-Team soll die Coday-Codebasis scannen und das gesamte semantische Branding von einer aggressiven "Anti-KI"-Rhetorik zu "AI-Driven Development" (AI-DD) und dem "High-Performance-Ökosystem" refactoren. Dabei sollen alle relevanten TSX-, JSON- und MD-Dateien aktualisiert werden.

Working directory: /Users/umurey/agency-domination
Integrity mode: development

## Requirements

### R1. Semantisches Refactoring
Das Team muss die gesamte Codebasis nach veralteten aggressiven Marketing-Begriffen (z.B. "Agenturen-Killer", "von Hand geschrieben", "WordPress-Spaghetti", "Waffensysteme") durchsuchen. Diese sollen durch eine professionelle AI-DD Tonalität ersetzt werden, die menschliche Exzellenz mit KI-Präzision ("Human-in-the-loop") vereint.

### R2. Stabilität & Syntax
Durch die Anpassungen an Texten und JSON-Lokalisierungen darf die Applikation nicht beschädigt werden. Die funktionale Struktur der React-Komponenten muss unangetastet bleiben.

## Acceptance Criteria

### Verifizierung der Stabilität
- [ ] Der Befehl `npm run build` läuft im Anschluss fehlerfrei durch, um sicherzustellen, dass keine Syntax-Fehler oder Typisierungs-Brüche in den modifizierten TSX- und JSON-Dateien entstanden sind.

## Follow-up — 2026-05-23T16:56:34-07:00

Fully migrate the remaining Vite/React Router legacy codebase to Next.js 15 App Router and resolve all TypeScript errors so the codebase is "build-ready".

Working directory: /Users/umurey/agency-domination
Integrity mode: development

## Requirements

### R1. Complete the Next.js 15 Migration
Remove all dependencies and imports related to `react-router` and `react-router-dom` across the entire codebase (e.g., in `src/features`, `src/shared`, `src/legacy`). Rewrite these legacy files to utilize Next.js App Router patterns (`next/link`, `next/navigation`, React Server Components vs. Client Components with `'use client'`). 

### R2. Resolve all TypeScript Errors
Fix all remaining TypeScript errors, including the `sanity` typing issues in the new location schema and the `z.enum` formatting errors in the Lead Form schema. The codebase must compile without using widespread `// @ts-ignore` hacks. 

### R3. Accessibility Assurance
Use the `a11y-debugging` skill to ensure any refactored interactive components maintain or improve accessibility. Verify the fixes against the existing Playwright audit setup.

## Acceptance Criteria

### Build Readiness
- [ ] Running `npm run typecheck` in the root directory exits with code 0 (no errors).
- [ ] Running `npm run build` successfully creates a Next.js production build without failing.
- [ ] No `react-router-dom` imports remain anywhere in the `src/` directory.

## Follow-up — 2026-05-24T20:02:11Z

Restore the original UI/UX design by fixing broken layouts, hydration mismatches, and Tailwind CSS conflicts introduced during the recent Next.js 15 App Router migration. The final result must be a flawless, production-ready interface matching high-end agency standards.

The severe build errors that were crashing the Next.js CSS loader and ESLint have been fully resolved. The project now successfully builds (npm run build) and the local dev server is running again on localhost:3000. You can now proceed with your task to restore the UI/UX design, fix the Tailwind conflicts, and eliminate the hydration errors. Let me know if you need anything else!

Working directory: /Users/umurey/agency-domination

## Requirements

### R1. Resolve Migration Visual Bugs
Identify and fix all visual regressions, broken CSS, layout shifts, and Tailwind CSS conflicts that occurred during the migration to Next.js 15 App Router.

### R2. Eliminate Hydration Errors
Ensure that all React Server Components vs. Client Components boundaries are correctly respected and that no hydration mismatches occur on the client side that could break the UI.

### R3. Production Polish
Ensure the resulting UI/UX meets high-end agency standards and feels premium, responsive, and flawless for end-users on all viewports.

## Acceptance Criteria

### Visual & Layout Integrity
- [ ] No visual regressions or layout shifts remain from the migration.
- [ ] UI components render flawlessly across mobile, tablet, and desktop viewports.

### Console & Build
- [ ] No React hydration mismatches appear in the browser console during local development.
- [ ] The Next.js production build (`npm run build`) completes successfully without any CSS module or Tailwind configuration errors.
