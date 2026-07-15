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

## Follow-up — 2026-05-30T23:16:34Z

# Teamwork Project Prompt — Draft

> Status: Step 9 — Ready for launch
> Goal: Refactor all components

Vollständige und systematische Aufwertung jeder einzelnen bestehenden Komponente des Coday Next.js 15 Projekts.

Working directory: /Users/umurey/agency-domination
Integrity mode: development

## Requirements

### R1. Primitive & Layout Komponenten (Agent A & B)

Überarbeite alle primitiven (Button, Input, Badge, Icon) und Layout-Komponenten (Card, Grid, Container, Divider). Setze die Interaktionsschicht gemäß emil-design-eng Protokoll (z.B. Button hover/active States, Card Hover-Effekte) um.

### R2. Navigation & Overlay Komponenten (Agent C & D)

Überarbeite Navigations- (Navbar, Sidebar, Breadcrumb, Tabs) und Overlay-Komponenten (Modal, Drawer, Popover, Tooltip, Toast). Beachte Modal Focus-Traps und Scroll-Locks sowie konsistente Entrance/Exit Animationen.

### R3. Feedback Komponenten (Agent E)

Überarbeite Feedback-Komponenten (Alert, Progress, Skeleton, Spinner). Integriere ARIA-Attribute und reduziere Motion wo angebracht.

### R4. Standardisiertes Komponenten-Protokoll anwenden

Führe für JEDE Komponente das folgende Protokoll aus:

- a11y-debugging: Semantik, ARIA, Focus, Keyboard, Tap Targets.
- chrome-devtools: Layout Shifts, Memory Leaks, CSS Performance.
- emil-design-eng: Korrekte easings, transition durations, states.

## Acceptance Criteria

### Implementierung

- [ ] Alle definierten Varianten implementiert (primary, secondary, etc.).
- [ ] Alle Zustände implementiert und visuell korrekt (default, hover, focus, active, disabled, success, error).
- [ ] Alle Design Tokens verwendet, absolut keine hartkodierten Farb- oder Spacing-Werte.
- [ ] TypeScript Interface oder PropTypes vollständig.
- [ ] JSDoc für alle Props vorhanden.
- [ ] Mindestens drei Verwendungsbeispiele dokumentiert.

### Accessibility & Performance

- [ ] Alle ARIA-Attribute korrekt und vollständig.
- [ ] Keyboard-Navigation vollständig unterstützt (Tab-Reihenfolge, Focus-Ring sichtbar).
- [ ] Reduced Motion Abfragen (@media prefers-reduced-motion) implementiert.

### Validierung & Dokumentation

- [ ] Screenshot-Dokumentation für Desktop und Mobile in allen Zuständen liegt in `.antigravity/components/[KOMPONENTENNAME]-documentation.md` vor.
- [ ] Component Inventory unter `.antigravity/components/inventory.md` ist für alle Komponenten aktualisiert und auf "vollständig" gesetzt.

## 2026-05-31T19:03:45Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Implementiere ein vollständiges, kohärentes und performantes Animations- und Interaktionssystem für das Coday Projekt. Jede Interaktion muss einen klaren Zweck haben, die Nutzerwahrnehmung unterstützen und darf keine Performance-Einbußen verursachen.

Working directory: ~/agency-domination
Integrity mode: development

## Requirements

### R1. Performance Baseline

Verwende `chrome-devtools`, um die FPS, Layout-Trigger (width, height, top, left), Paint-Trigger (box-shadow, border-radius) und GPU-Speichernutzung der aktuellen Animationen zu messen. Exportiere die Ergebnisse nach `.antigravity/motion/performance-baseline.md`.

### R2. Accessibility Audit

Verwende `a11y-debugging`, um bestehende Animationen auf `prefers-reduced-motion`-Konformität zu prüfen. Stelle sicher, dass keine Animationen länger als 5s ohne Pause laufen, keine blinkenden Elemente existieren und keine vestibulären Störungen ausgelöst werden können. Exportiere den Befund nach `.antigravity/motion/a11y-audit.md`.

### R3. Implementierung: Component Motion

Setze das Motion-System basierend auf den Emil Kowalski Prinzipien (Zweckgebunden, Subtil, Performant, Konsistent) um. Implementiere die exakten Animations-Spezifikationen für Buttons (inkl. hover, focus, active, loading, success, error), Navigation (Underlines, Drawer, Dropdowns), Inputs (Float-Label, Shake-Error), Cards, Modals, Tooltips, Toasts und Accordions gemäß Phase 2 des Auftrags.

### R4. Implementierung: Seiten-Übergänge

Implementiere spezifische Transitionen für Page-Routes: Same-Level (fade out 150ms/in 200ms), Deeper-Level (slide-right-in), Back-Navigation (slide-left-in) und Modal-Navigation. Nutze den `browser` Subagent zur Verifikation.

### R5. Implementierung: Scroll-Animationen

Implementiere Scroll-Animationen ausschließlich über die Intersection Observer API (Threshold: 0.15, rootMargin: 0px 0px -50px 0px). Animiere ausschließlich `transform` und `opacity`. Nutze staggered Listen (60ms Delay, Max 400ms). Schließe Header, Footer, Formulare, Tabellen und Hauptinhalte explizit davon aus.

### R6. Finale Verifikation (Performance, A11y, Visuell)

Verifiziere mit `chrome-devtools`, dass alle Animationen bei 60fps ohne Layout-Trigger laufen. Verifiziere mit `a11y-debugging`, dass bei Reduced-Motion alle `duration-*` auf 0.01ms gesetzt sind. Führe mit dem `browser` Subagent einen finalen visuellen Test durch (Standard, Reduced-Motion, Slow-Motion).

## Acceptance Criteria

### Baseline & Audits

- [ ] `.antigravity/motion/performance-baseline.md` existiert und dokumentiert die FPS, Layout/Paint-Trigger und Compositor-Eigenschaften.
- [ ] `.antigravity/motion/a11y-audit.md` existiert und listet alle Accessibility-Probleme vor der Überarbeitung.

### Code-Implementierung

- [ ] Kein einziges interaktives Element existiert ohne definierten Interaktionszustand.
- [ ] Scroll-Animationen triggern keine Layout-Paints und verwenden keinen `scroll`-Event-Listener, sondern nur Intersection Observer.
- [ ] Navigation, Footer und Hauptinhalte sind von Scroll-Animationen ausgenommen.
- [ ] Reduced-Motion ist global und strikt implementiert (Zeiten auf 0.01ms reduziert).

### Performance & Validation

- [ ] Keine Animation verursacht Layout-Triggers (width, height, margin, padding, top, left).
- [ ] Die visuellen Tests durch den `browser` Agenten (Same-Level, Deeper-Level, Back) sind bestätigt.

## Follow-up — 2026-07-15T14:59:53Z

# Teamwork Project Prompt — Draft

> Status: Launched

Fix all remaining Seobility errors on the Coday website to achieve a flawless 100/100 SEO score. This includes individually rewriting short texts, fixing H1 keyword presence, removing duplicates, and fixing meta configurations across over 90 pages.

**CRITICAL CONSTRAINT**: You MUST use strictly manual file edits. Do not use any automated scripts to generate or inject content.
**SCALE REQUIREMENT**: Mobilize a swarm of 20+ agents to handle the 91 files concurrently, followed by a secondary verification swarm to audit the work.

Working directory: /Users/umurey/agency-domination

## Requirements

### R1. Resolve "Low Text" and "Few Text Blocks" Issues

Individually expand the content on the 91 flagged pages so they exceed 500 words and have at least 3 distinct text blocks, without generating duplicate content.

### R2. Fix Keyword and Heading Alignment

Ensure that all keywords from H1 headings and Page Titles are naturally included in the body text of their respective pages (affects 33 and 8 pages). Fix the heading structure (H1->H2->H3) on the 5 flagged pages.

### R3. Resolve Meta Description and Alternate Link Errors

Shorten the 24 overly long Meta Descriptions to optimal lengths. Add missing self-referencing alternate links to the 3 English legal/partnership pages. Fix the language tag mismatches on the 3 flagged pages.

### R4. Fix Duplicate Link Texts and Orphaned URLs

Resolve the identical "full-stack development" link texts pointing to different URLs. Ensure `/en/services/performance` is properly linked within the site architecture, not just the sitemap.

## Verification Resources

A local Node.js script can be created (but only used for read-only validation) to parse the JSON files or HTML output to verify word counts and keyword presence before considering the task complete.

## Acceptance Criteria

### Content Quality

- [ ] No scripts are used to generate or inject content; all text additions are performed directly via native file editing tools.
- [ ] Translations to English are provided for any new German text added.
- [ ] Text additions are highly relevant to the specific page context (e.g., specific to the location or industry).

### Metric Verification

- [ ] All 91 flagged pages contain strictly > 500 words.
- [ ] No H1 or Meta Title keywords are missing from the body text.
- [ ] A secondary verification swarm confirms that no duplicate content was inadvertently created.
- [ ] `npm run build` succeeds and First Load JS remains within performance budgets.
