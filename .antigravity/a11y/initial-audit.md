# WCAG 2.2 AA Initial Audit Report

**Datum:** 2026-06-03
**Projekt:** codayweb.de (Coday Web-Agentur)
**Audit-Methode:** Automatisierter 15-Agenten-Schwarm mit manueller Code-Inspektion
**Scope:** Gesamtes Next.js-Projekt (alle Routen, Komponenten, Widgets, Features)

---

## Zusammenfassung der identifizierten Verstöße

### WCAG Prinzip 1 — Wahrnehmbarkeit (Perceivable)

| Kriterium | Gefundene Verstöße | Schweregrad |
|---|---|---|
| 1.1.1 Non-text Content | ~40 Bilder/Icons ohne alt-Text oder aria-label | Kritisch |
| 1.3.1 Info and Relationships | ~30 div/span statt semantic HTML (button, nav, article, section) | Kritisch |
| 1.3.2 Meaningful Sequence | ~10 Prozessschritte ohne ordered list Semantik | Mittel |
| 1.4.3 Contrast (Minimum) | 9 Farbtoken unter 4.5:1 Kontrast (slate-400, slate-500, accent, borders) | Kritisch |
| 1.4.11 Non-text Contrast | 3 Border-Tokens unter 3:1 Kontrast | Hoch |

### WCAG Prinzip 2 — Bedienbarkeit (Operable)

| Kriterium | Gefundene Verstöße | Schweregrad |
|---|---|---|
| 2.1.1 Keyboard | ~15 div-mit-onClick statt button/link (nicht keyboard-bedienbar) | Kritisch |
| 2.4.1 Bypass Blocks | Skip-Link vorhanden, aber nested main-Elemente (10 Seiten) | Hoch |
| 2.4.3 Focus Order | Modale ohne Focus-Trap (BookingUpsellModal) | Hoch |
| 2.4.6 Headings and Labels | ~12 Seiten mit übersprungenen Heading-Ebenen (h1→h3, h2→h4) | Hoch |
| 2.4.7 Focus Visible | ~20 interaktive Elemente ohne focus-visible Indikator | Hoch |
| 2.3.3 Animation | ~8 Animationskomponenten ohne prefers-reduced-motion Respekt | Mittel |

### WCAG Prinzip 3 — Verständlichkeit (Understandable)

| Kriterium | Gefundene Verstöße | Schweregrad |
|---|---|---|
| 3.1.1 Language of Page | lang-Attribut korrekt ✅ (kein Verstoß) | — |
| 3.2.3 Consistent Navigation | aria-current="page" fehlend in Nav-Dropdowns | Mittel |
| 3.3.1 Error Identification | ~7 Formularfelder ohne aria-invalid bei Fehlern | Hoch |
| 3.3.2 Labels or Instructions | ~12 Inputs ohne assoziiertes label-Element | Kritisch |
| 3.3.3 Error Suggestion | Fehlermeldungen ohne aria-describedby Verknüpfung | Hoch |

### WCAG Prinzip 4 — Robustheit (Robust)

| Kriterium | Gefundene Verstöße | Schweregrad |
|---|---|---|
| 4.1.2 Name, Role, Value | ~20 Accordions ohne aria-expanded/aria-controls | Kritisch |
| 4.1.3 Status Messages | ~15 dynamische Inhalte ohne aria-live Region | Hoch |

### Übersetzungs-Verstöße (WCAG 3.1.2)

| Problem | Anzahl |
|---|---|
| Deutsche Strings in englischen Locale-Dateien | 51 |
| Fehlende Übersetzungskeys (DE↔EN) | 10 |

---

## Gesamtbewertung

**Geschätzte Verstöße vor Korrektur:** ~200+
**Betroffene Dateien:** ~140+
**Schweregrad-Verteilung:**
- Kritisch: ~90 Verstöße
- Hoch: ~80 Verstöße
- Mittel: ~30 Verstöße
