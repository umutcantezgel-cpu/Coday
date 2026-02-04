# Product Requirements Document: Agency Domination MVP

## Executive Summary

**Product:** Agency Domination — "The Market Eater"
**Version:** MVP 1.1
**Document Status:** Final — Ready for Technical Design
**Last Updated:** 2026-02-02
**Codename:** Aurora

### Product Vision

Eine massive, inhaltsreiche Agentur-Plattform, die den KMU-Markt durch **Premium-Qualität zu disruptiven Preisen** (10x günstiger als Marktstandard) dominiert. Die Webseite ist nicht nur Marketing-Tool, sondern **lebender Beweis** für die technische Überlegenheit — mit Ladezeiten, die Konkurrenten unmöglich erreichen können.

### Success Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 1.0s | Lighthouse, Core Web Vitals |
| Time to Interactive | < 1.5s | Lighthouse |
| Conversion Rate (Kalkulator → Kontakt) | > 8% | Analytics |
| Avg. Session Duration | > 4 min | Analytics |
| Bounce Rate | < 35% | Analytics |

---

## Problem Statement

### Problem Definition

Der KMU-Markt für Webentwicklung ist **broken**:

1. **Überteuerte Agenturen:** Standard-Websites kosten 15.000–50.000€ für Template-basierte Arbeit
2. **Intransparente Preise:** Kunden verstehen nicht, wofür sie zahlen
3. **Generisches Design:** 90% aller Agentur-Websites sehen identisch aus (AI-generated look)
4. **Langsame Lieferzeiten:** 8–16 Wochen für eine simple Corporate Site
5. **Schlechte Performance:** Die meisten Agentur-Websites haben selbst LCP > 3s

### Impact Analysis

- **User Impact:** KMUs verschwenden Budget und Zeit für minderwertige Ergebnisse
- **Market Impact:** Geschätztes Marktvolumen DE: 2.3 Mrd € (KMU-Webentwicklung)
- **Business Impact:** Bei 10x günstigeren Preisen mit Premium-Qualität: Marktanteil-Explosion möglich

---

## Target Audience

### Primary Persona: "Der Frustrierte Gründer"

**Name:** Stefan, 42
**Role:** Geschäftsführer eines mittelständischen Unternehmens (20-50 MA)
**Budget:** 5.000–15.000€ (erwartet aber 30.000€+ zu zahlen)
**Tech-Level:** Kann Qualität erkennen, versteht aber keine Technik

**Demographics:**
- Unternehmen: B2B-Dienstleister, Handwerk, lokaler Handel
- Standort: DACH-Region
- Umsatz: 1–10 Mio € p.a.

**Psychographics:**
- Wurde schon 2-3x von Agenturen enttäuscht
- Hasst intransparente Angebote ("Was kostet das?" → "Kommt drauf an")
- Will selbst kontrollieren, was er kauft
- Misstraut "Kreativ-Agenturen" mit vagen Versprechungen

**Jobs to Be Done:**

| Job Type | Description |
|----------|-------------|
| Functional | Eine Website, die Kunden generiert (nicht nur "schön" ist) |
| Emotional | Das Gefühl, nicht über den Tisch gezogen zu werden |
| Social | Eine Seite, die Professionalität ausstrahlt |

**Current Solutions & Pain Points:**

| Current Solution | Pain Points | Our Advantage |
|-----------------|-------------|---------------|
| Teure Agentur (15-30k€) | Intransparent, langsam, generisch | 10x günstiger, 1 Woche, einzigartig |
| Freelancer | Unzuverlässig, keine Skalierung | Professionelle Prozesse |
| Baukasten (Wix, Squarespace) | Sieht billig aus, kein SEO | Premium-Qualität, Performance |
| Offshore (Fiverr) | Qualitätsprobleme, Kommunikation | Deutsch, Premium-Standard |

### Secondary Personas

**"Der Startup-Founder"**
- 25-35 Jahre, tech-affin
- Budget: 2.000–5.000€
- Will: Schnell, modern, günstig
- Trigger: Sieht Performance-Zahlen, ist überzeugt

**"Der Marketing-Manager"**
- 30-45 Jahre, Angestellter in mittelgroßer Firma
- Budget: Vorgegeben (10.000–25.000€)
- Will: Nachweisbare ROI-Argumente für Chef
- Trigger: Case Studies mit messbaren Ergebnissen

---

## User Stories

### Epic: Website Configuration & Purchase

**Primary User Story:**
"Als KMU-Inhaber will ich selbst zusammenstellen, welche Features meine Website hat, damit ich nur für das zahle, was ich wirklich brauche."

**Acceptance Criteria:**
- [ ] User kann Module einzeln an/abwählen
- [ ] Preis aktualisiert sich in Echtzeit (<100ms)
- [ ] Gesamtpreis ist jederzeit sichtbar (sticky)
- [ ] Mindestens 15 verschiedene Module verfügbar
- [ ] Jedes Modul hat Beschreibung + visuelles Beispiel
- [ ] Konfiguration kann als Link geteilt werden
- [ ] Am Ende: Direkter CTA zu Kontaktformular mit Konfig-Summary

### Supporting User Stories

1. "Als User will ich sehen, wie schnell diese Agentur-Website lädt, damit ich der Performance-Versprechen vertraue."
   - AC: Performance-Badge im Header mit live LCP-Zeit
   - AC: Lighthouse-Score öffentlich einsehbar

2. "Als User will ich detaillierte Case Studies lesen, damit ich verstehe, wie die Agentur Probleme löst."
   - AC: Mindestens 3 vollständige Case Studies im MVP
   - AC: Jede Case Study hat: Problem → Lösung → Ergebnis → Screenshots

3. "Als User will ich auf jedem Device eine perfekte Erfahrung haben."
   - AC: Mobile-First Design
   - AC: Identische Funktionalität auf Mobile/Desktop
   - AC: Touch-optimierte Kalkulator-Interaktion

4. "Als potenzieller Kunde will ich sofort verstehen, warum diese Agentur anders ist."
   - AC: Value Proposition in <3 Sekunden erfassbar
   - AC: Keine generischen Stockfotos
   - AC: Konkrete Zahlen statt vage Versprechen

---

## Functional Requirements

### Core Features (MVP — P0)

---

#### Feature 1: The "Supermarket" Calculator

**Description:**
Ein interaktiver Konfigurator, der das Website-Angebot in kauf-bare Module aufteilt. Der User "shoppt" Features wie Waren im Supermarkt. Psychologischer Effekt: Transparenz + Kontrolle = Vertrauen.

**User Value:**
- Sofortige Preistransparenz (kein "Angebot anfragen")
- Gefühl der Kontrolle ("Ich kaufe nur, was ich brauche")
- Gamification-Element (macht Spaß zu konfigurieren)

**Business Value:**
- Qualifizierte Leads (User hat bereits Budget-Commitment)
- Differenzierung von allen Konkurrenten
- Datensammlung über gewünschte Features

**Module Categories:**

```
CATEGORY: Basis-Pakete (Pflicht: 1 wählen)
├── Starter (1-5 Seiten) ............... 1.490€
├── Business (6-15 Seiten) ............. 2.990€
└── Enterprise (16+ Seiten) ............ 4.990€

CATEGORY: Design-Upgrades
├── Custom Illustrations ............... +490€
├── 3D Hero Section .................... +690€
├── Micro-Animations (Lottie) .......... +390€
├── Dark Mode Toggle ................... +190€
└── Custom Icon Set .................... +290€

CATEGORY: Funktionen
├── Blog-System (Headless CMS) ......... +590€
├── Newsletter-Integration ............. +290€
├── Kontaktformular (Advanced) ......... +190€
├── Buchungssystem (Calendly-Style) .... +490€
├── Multi-Language (2 Sprachen) ........ +690€
└── Kundenportal (Login-Area) .......... +990€

CATEGORY: Performance & SEO
├── SEO-Grundpaket ..................... +390€
├── SEO-Premium (inkl. Content) ........ +990€
├── Speed-Optimierung (LCP <1s) ........ +290€
└── Analytics & Tracking Setup ......... +190€

CATEGORY: Support & Wartung
├── Basic (Email, 48h Response) ........ +0€/Monat
├── Priority (24h Response, Phone) ..... +99€/Monat
└── Enterprise (4h Response, Slack) .... +299€/Monat
```

**Calculator Logic:**

```typescript
interface Module {
  id: string;
  category: 'basis' | 'design' | 'function' | 'seo' | 'support';
  name: string;
  price: number;
  priceType: 'one-time' | 'monthly';
  description: string;
  previewImage: string;
  dependencies?: string[];  // Module IDs that must be selected
  incompatible?: string[]; // Module IDs that cannot be combined
  popular?: boolean;       // Show badge
  recommended?: boolean;   // AI-suggested based on selection
}

interface CalculatorState {
  selectedModules: string[];
  totalOneTime: number;
  totalMonthly: number;
  estimatedDelivery: number; // Days
  configHash: string;        // Shareable URL parameter
}

// Business Rules:
// 1. Exactly ONE Basis-Paket must be selected
// 2. Some modules have dependencies (e.g., Blog requires SEO-Grundpaket)
// 3. Delivery time increases with complexity
// 4. Price breaks: >5.000€ = -5%, >10.000€ = -10%
```

**UI/UX Requirements:**

- **Layout:** 2-Column (Desktop), Single Column (Mobile)
  - Left: Module Grid mit Category Filters
  - Right: Sticky Summary mit Total + CTA
- **Interaction:** Click to toggle, instant feedback
- **Visual Feedback:**
  - Selected: Outline in Accent Color
  - Hover: Subtle scale + shadow
  - Price change: Animated counter (typewriter effect)
- **Accessibility:** Full keyboard navigation, ARIA labels

**Acceptance Criteria:**
- [ ] Mindestens 15 Module implementiert
- [ ] Preis-Update in <100ms
- [ ] Shareable Config-URL funktioniert
- [ ] Mobile Touch-Interaktion smooth
- [ ] Dependencies werden enforced
- [ ] Discount-Logic (>5k, >10k) korrekt
- [ ] Lieferzeit-Schätzung dynamisch

**Priority:** P0 (Critical)
**Estimated Effort:** 8 Story Points

---

#### Feature 2: Deep-Dive Case Studies

**Description:**
Keine Thumbnail-Galerien. Jede Referenz ist ein vollständiger Blog-Artikel mit Storytelling-Struktur. Der User versteht nicht nur WAS gemacht wurde, sondern WARUM und mit welchem ERGEBNIS.

**User Value:**
- Vertrauen durch Transparenz
- Inspiration für eigenes Projekt
- Beweise für behauptete Kompetenz

**Business Value:**
- SEO-Value (Long-form content)
- Qualifizierung: Wer liest, ist ernsthaft interessiert
- Differenzierung von Portfolio-Slideshows

**Case Study Structure:**

```markdown
## [Project Name]: [Catchy Headline]

### Quick Stats (Above the Fold)
- Industry: [Branche]
- Duration: [X Wochen]
- Budget: [Preisrange]
- Results: [Key Metric, z.B. "+340% Organic Traffic"]

### The Challenge
[2-3 Paragraphen: Was war das Problem des Kunden?]
- Bullet points mit spezifischen Pain Points
- Zitate vom Kunden (authentisch)

### Our Approach
[Wie sind wir vorgegangen?]
1. Discovery Phase
2. Design Exploration
3. Development
4. Launch & Optimization

### The Solution
[Visuelle Präsentation]
- Full-width Screenshots
- Vorher/Nachher Vergleiche
- Detail-Shots (Mobile, Interaktionen)
- Code-Snippets (für Tech-Credibility)

### The Results
[Messbare Ergebnisse]
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Page Load | 4.2s | 0.9s | -78% |
| Bounce Rate | 67% | 31% | -54% |
| Conversions | 12/mo | 47/mo | +291% |

### Client Testimonial
> "Zitat vom Kunden mit Namen und Position"

### Technical Deep-Dive (Expandable)
[Für tech-affine Leser]
- Stack used
- Interesting challenges solved
- Performance optimizations
```

**Acceptance Criteria:**
- [ ] Mindestens 3 vollständige Case Studies im MVP
- [ ] Jede Case Study hat alle strukturellen Elemente
- [ ] Bilder sind optimiert (WebP, lazy-loaded)
- [ ] Expandable "Technical Deep-Dive" Sektion
- [ ] Social Sharing für jede Case Study
- [ ] Related Projects am Ende

**Priority:** P0 (Critical)
**Estimated Effort:** 5 Story Points

---

#### Feature 3: Performance Showcase

**Description:**
Die Website selbst ist der beste Verkaufsargument. Ein Live-Performance-Badge zeigt die aktuelle Ladezeit. Optional: Vergleich mit Konkurrenz-Websites.

**User Value:**
- Sofortiger Proof of Concept
- Vertrauen in technische Kompetenz

**Business Value:**
- Differenzierung (kein Konkurrent macht das)
- Viraler Effekt ("Schau mal, die zeigen ihre Ladezeit live")

**Implementation:**

```typescript
interface PerformanceWidget {
  currentLCP: number;        // Milliseconds
  lighthouseScore: number;   // 0-100
  lastUpdated: Date;
  compareTarget?: string;    // Optional: Competitor URL
}

// Display Logic:
// - Badge in Header (always visible)
// - Full Dashboard on /performance page
// - Real-time updates via Performance Observer API
```

**Acceptance Criteria:**
- [ ] Live LCP-Anzeige im Header
- [ ] Actual LCP < 1.0s auf allen Seiten
- [ ] Lighthouse Score > 95
- [ ] /performance Seite mit detaillierten Metriken
- [ ] Vergleichsfunktion (optional, V2)

**Priority:** P0 (Critical)
**Estimated Effort:** 3 Story Points

---

### Should Have (P1)

| Feature | Description | Rationale for P1 |
|---------|-------------|------------------|
| Blog/Insights Section | Thought Leadership Content | Builds SEO, aber nicht launch-critical |
| Newsletter Signup | Email-Liste aufbauen | Kann auch via Typeform/externe Lösung |
| Live Chat Widget | Direktkontakt | Intercom o.ä. kann nachgerüstet werden |

### Could Have (P2)

| Feature | Description | Rationale for P2 |
|---------|-------------|------------------|
| Client Portal | Login-Bereich für Projektstatus | Komplexität, erst bei Skalierung |
| A/B Testing Dashboard | Conversion-Optimierung | Erfordert Traffic-Volume |
| Multi-Language | DE/EN | Fokus erst auf DACH |

### Out of Scope (Won't Have)

- **E-Commerce Integration:** Keine direkten Zahlungen im MVP
- **CRM Integration:** Manueller Prozess zunächst
- **Mobile App:** Web-only
- **Video Production:** Fokus auf Performance, nicht Content

---

## Non-Functional Requirements

### Performance (CRITICAL)

| Metric | Requirement | Verification |
|--------|-------------|--------------|
| LCP | < 1.0s (p95) | Lighthouse CI |
| FID | < 100ms | Core Web Vitals |
| CLS | < 0.1 | Core Web Vitals |
| TTFB | < 200ms | Server monitoring |
| Bundle Size (JS) | < 150KB gzipped | Build analysis |
| Total Page Weight | < 500KB initial | Network analysis |

### Security

- **HTTPS:** Enforced everywhere
- **Headers:** Strict CSP, HSTS, X-Frame-Options
- **Form Protection:** CSRF tokens, rate limiting
- **Data:** No PII stored, GDPR compliant contact forms

### Usability

- **Accessibility:** WCAG 2.1 AA (minimum)
- **Browser Support:** Chrome, Safari, Firefox, Edge (latest 2 versions)
- **Mobile Support:** iOS 14+, Android 10+
- **Responsive Breakpoints:** 375px, 768px, 1024px, 1440px, 1920px

### Scalability

- **CDN:** Global edge caching
- **Static Generation:** Pre-render all possible pages
- **ISR:** Incremental regeneration for dynamic content
- **No Server-Side Bottlenecks:** Jamstack architecture

---

## Design System: "Aurora Protocol"

### Philosophy

> "Kunst trifft Technologie — Licht, Farbe und Bewegung verschmelzen zu einer Premium-Erfahrung."

Das Aurora Design System basiert auf drei Prinzipien:

1. **Luminous Artistry:** Licht und Farbverläufe schaffen Tiefe und Emotion. Jedes Element fühlt sich lebendig an.
2. **Gradient Expression:** Text und UI-Elemente nutzen Farbverläufe als künstlerisches Stilmittel — von Blau über Violett zu Pink.
3. **Premium Clarity:** Helle Hintergründe mit kontrastreichem Inhalt. Glassmorphism und weiche Schatten für Tiefe.

### Color System

```css
/* AURORA COLOR TOKENS */

/* === BASE PALETTE (Light Mode) === */
--aurora-white:    #FFFFFF;    /* Primary background */
--aurora-snow:     #FAFBFC;    /* Secondary background */
--aurora-cloud:    #F3F4F6;    /* Card backgrounds */
--aurora-mist:     #E5E7EB;    /* Borders, dividers */
--aurora-steel:    #9CA3AF;    /* Muted text */
--aurora-slate:    #6B7280;    /* Secondary text */
--aurora-charcoal: #374151;    /* Primary text */
--aurora-deep:     #111827;    /* Headings, emphasis */

/* === BLUE GRADIENT SPECTRUM (Core Palette) === */
--aurora-sky:      #60A5FA;    /* Light blue */
--aurora-azure:    #3B82F6;    /* Primary blue */
--aurora-sapphire: #2563EB;    /* Deep blue */
--aurora-indigo:   #4F46E5;    /* Blue-violet */
--aurora-violet:   #7C3AED;    /* Violet */
--aurora-purple:   #9333EA;    /* Purple */
--aurora-magenta:  #C026D3;    /* Magenta */
--aurora-pink:     #EC4899;    /* Pink accent */
--aurora-abyss:    #1E3A5F;    /* Dark blue for contrast */

/* === GRADIENT DEFINITIONS (Hero Feature) === */
--gradient-ocean:      linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%);
--gradient-twilight:   linear-gradient(135deg, #3B82F6 0%, #4F46E5 50%, #7C3AED 100%);
--gradient-aurora:     linear-gradient(135deg, #60A5FA 0%, #7C3AED 50%, #EC4899 100%);
--gradient-sunset:     linear-gradient(135deg, #F472B6 0%, #EC4899 50%, #C026D3 100%);

/* === TEXT GRADIENTS (Künstlerisch) === */
--gradient-text:       linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #7C3AED 100%);
--gradient-text-vivid: linear-gradient(135deg, #3B82F6 0%, #9333EA 50%, #EC4899 100%);
--gradient-text-ocean: linear-gradient(90deg, #60A5FA 0%, #2563EB 100%);

/* === GLASS EFFECTS === */
--glass-bg:        rgba(255, 255, 255, 0.7);
--glass-border:    rgba(255, 255, 255, 0.3);
--glass-shadow:    0 8px 32px rgba(37, 99, 235, 0.1);

/* === SEMANTIC COLORS === */
--aurora-success:  #10B981;    /* Green for validation */
--aurora-warning:  #F59E0B;    /* Amber for warnings */
--aurora-error:    #EF4444;    /* Red for errors */
```

### Gradient Text Implementation (CRITICAL)

```css
/* Gradient Text Classes — Use for all major headings */
.text-gradient {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-vivid {
  background: var(--gradient-text-vivid);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-ocean {
  background: var(--gradient-text-ocean);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animated Gradient Text (for Hero) */
.text-gradient-animated {
  background: linear-gradient(90deg, #3B82F6, #7C3AED, #EC4899, #3B82F6);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Color Usage Rules (ENFORCED)

| Context | Allowed Colors/Gradients | Notes |
|---------|--------------------------|-------|
| Backgrounds | aurora-white, aurora-snow, aurora-cloud | Light, airy feel |
| Body Text | aurora-charcoal, aurora-slate | High contrast on light |
| **Headings** | **gradient-text, gradient-text-vivid** | Always use gradients! |
| Subheadings | aurora-deep, aurora-abyss | Solid dark colors OK |
| Borders | aurora-mist, glass-border | Subtle, light |
| **CTAs/Buttons** | **gradient-ocean, gradient-twilight** | Gradient backgrounds |
| **Prices** | **aurora-sapphire, gradient-text** | Blue or gradient |
| Links | aurora-azure → aurora-sapphire on hover | Blue spectrum |
| Icons | aurora-slate → aurora-azure on hover | Subtle to vivid |

**The Gradient Rule:**
Major headings (H1, H2) should ALWAYS use gradient text. This creates the artistic, premium feel that differentiates the brand.

### Typography

```css
/* FONTS */
--font-display: 'Outfit', system-ui, sans-serif;      /* Headings — modern, friendly */
--font-body: 'Inter', system-ui, sans-serif;           /* Body text — readable */
--font-mono: 'JetBrains Mono', monospace;              /* Code, prices */

/* SCALE (Mobile-first, fluid) */
--text-xs:    clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm:    clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base:  clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg:    clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl:    clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl:   clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl:   clamp(2rem, 1.5rem + 2.5vw, 3rem);
--text-4xl:   clamp(2.5rem, 1.75rem + 3.75vw, 4rem);
--text-5xl:   clamp(3rem, 2rem + 5vw, 5rem);
--text-hero:  clamp(4rem, 2.5rem + 7.5vw, 8rem);

/* WEIGHTS */
--font-normal:    400;
--font-medium:    500;
--font-semibold:  600;
--font-bold:      700;
--font-black:     900;   /* For gradient hero text */

/* LINE HEIGHTS */
--leading-tight:  1.1;    /* Headings */
--leading-snug:   1.3;    /* Subheadings */
--leading-normal: 1.5;    /* Body (short) */
--leading-relaxed: 1.75;  /* Body (long-form) */
```

### Layout Principles

**1. Flowing Grid**
```
Standard Agency Grid:       Aurora Grid:
|  |  |  |  |  |  |        |░░|  |  |  |  |░░|
|  |  |  |  |  |  |        |░░|  |  |  |  |░░|
12 equal columns           Gradient bleed areas on edges
```

**2. Light & Depth**
- White/light backgrounds dominate (90%+)
- Cards have subtle shadows and glassmorphism
- Gradient blobs float in background (decorative)
- Content sections have breathing room

**3. Artistic Elements**
- Floating gradient orbs as background decoration
- Gradient borders on featured elements
- Text gradients on all major headings
- Glassmorphism for overlay cards

### Motion Design

```css
/* TIMING FUNCTIONS */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);       /* Primary easing */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);  /* Dramatic */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);    /* Bouncy */

/* DURATIONS */
--duration-instant: 100ms;   /* Micro-interactions */
--duration-fast:    200ms;   /* Hovers, toggles */
--duration-normal:  300ms;   /* Page transitions */
--duration-slow:    500ms;   /* Large reveals */
--duration-float:   6000ms;  /* Floating blob animation */

/* GRADIENT ANIMATION */
@keyframes blob-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

/* MOTION PRINCIPLES */
/* 1. Gradients shift slowly for ambient effect
 * 2. Elements float and breathe
 * 3. Hover states brighten colors
 * 4. Respect reduced-motion preferences */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Component Library (Key Components)

**1. Button System**
```
Primary Button:    [gradient-ocean background, white text, shadow]
                   Hover: brightness(1.1), enhanced shadow
                   Used for main CTAs

Secondary Button:  [transparent, gradient border, gradient text]
                   Hover: light gradient fill
                   For secondary actions

Ghost Button:      [No border, aurora-slate text]
                   Hover: aurora-azure text, underline
                   For tertiary actions
```

**2. Card System**
```
Standard Card:     [aurora-white bg, subtle shadow, rounded-2xl]
                   Hover: lift + enhanced shadow

Glass Card:        [glass-bg, glass-border, backdrop-blur]
                   Used for overlays, featured content

Feature Card:      [aurora-snow bg, gradient left border]
                   Used for calculator modules
                   Hover: gradient border glow

Case Study Card:   [Full-width image, gradient overlay at bottom]
                   Hover: image zoom, text reveal
```

**3. Input System**
```
Text Input:        [aurora-white bg, aurora-mist border]
                   Focus: aurora-azure border, ring glow
                   Error: aurora-error border

Select/Dropdown:   [aurora-white bg, aurora-mist border]
                   Open: aurora-azure highlight on selected
```

### Background Decoration (Floating Blobs)

```jsx
/* Decorative gradient blobs for artistic effect */
<div className="aurora-blob aurora-blob-1" />
<div className="aurora-blob aurora-blob-2" />
<div className="aurora-blob aurora-blob-3" />

/* CSS */
.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: blob-float 6s ease-in-out infinite;
  pointer-events: none;
}

.aurora-blob-1 {
  width: 400px;
  height: 400px;
  background: var(--gradient-ocean);
  top: 10%;
  left: -10%;
}

.aurora-blob-2 {
  width: 300px;
  height: 300px;
  background: var(--gradient-twilight);
  top: 50%;
  right: -5%;
  animation-delay: -2s;
}

.aurora-blob-3 {
  width: 350px;
  height: 350px;
  background: var(--gradient-aurora);
  bottom: 10%;
  left: 30%;
  animation-delay: -4s;
}
```

---

## Information Architecture

```
/                           # Homepage (Hero + Calculator Preview + Featured Cases)
├── /calculator             # Full Supermarket Calculator
├── /work                   # Case Studies Overview
│   ├── /work/[slug]        # Individual Case Study
├── /about                  # Team & Philosophy
├── /process                # How We Work (Timeline)
├── /performance            # Live Performance Dashboard
├── /contact                # Contact Form
├── /legal
│   ├── /legal/impressum    # Imprint
│   ├── /legal/datenschutz  # Privacy Policy
│   └── /legal/agb          # Terms & Conditions
└── /blog (P1)              # Insights & Articles
```

---

## Key User Flows

### Flow 1: Calculator → Contact

```mermaid
graph LR
    A[Landing Page] --> B[Sees Calculator Preview]
    B --> C[Clicks 'Configure']
    C --> D[/calculator]
    D --> E[Selects Base Package]
    E --> F[Adds Modules]
    F --> G[Reviews Total]
    G --> H{Satisfied?}
    H -->|Yes| I[Clicks 'Request Quote']
    I --> J[Form with Config Summary]
    J --> K[Submits]
    K --> L[Confirmation + Next Steps]
    H -->|No| F
```

### Flow 2: Case Study Deep-Dive

```mermaid
graph LR
    A[Homepage or /work] --> B[Sees Case Study Card]
    B --> C[Clicks Card]
    C --> D[Reads Quick Stats]
    D --> E[Scrolls: Challenge]
    E --> F[Scrolls: Solution]
    F --> G[Scrolls: Results]
    G --> H{Interested?}
    H -->|Yes| I[Clicks CTA 'Similar Project?']
    I --> J[/calculator or /contact]
    H -->|No| K[Reads Related Projects]
```

---

## Success Metrics

### North Star Metric

**Qualified Leads per Month** — defined as: User completed calculator AND submitted contact form with budget > 3.000€

### OKRs for MVP (First 90 Days)

**Objective 1:** Establish Market Presence
- KR1: 1.000 unique visitors in first month
- KR2: Average session duration > 4 minutes
- KR3: Calculator completion rate > 40%

**Objective 2:** Generate Revenue Pipeline
- KR1: 20 qualified leads in first month
- KR2: Conversion rate (visit → lead) > 2%
- KR3: First paying customer within 30 days

**Objective 3:** Prove Technical Excellence
- KR1: Lighthouse Score > 95 on all pages
- KR2: Zero performance regressions after updates
- KR3: 100% uptime (excluding planned maintenance)

### Metrics Framework

| Category | Metric | Target | Tool |
|----------|--------|--------|------|
| Acquisition | Unique Visitors | 1.000/mo | Analytics |
| Activation | Calculator Started | 40% of visitors | Custom Event |
| Engagement | Calculator Completed | 60% of started | Custom Event |
| Conversion | Lead Submitted | 2% of visitors | Form tracking |
| Retention | Return Visitors | 15% | Analytics |
| Referral | Shares/Mentions | 10/mo | Social tracking |

---

## Constraints & Assumptions

### Constraints

- **Budget:** Development with AI assistance, minimal external costs
- **Timeline:** MVP launch within 4 weeks
- **Resources:** Solo founder + AI coding assistants
- **Technical:** Must run on Google Antigravity environment
- **Legal:** Full GDPR compliance required (DE market)

### Assumptions

- KMUs actively search for alternatives to expensive agencies
- Price transparency is a key differentiator
- Performance metrics are convincing social proof
- Premium, artistic light-mode design conveys professionalism and trust

### Open Questions

- [ ] Exact pricing tiers need market validation
- [ ] Case study clients need approval for public display
- [ ] Payment integration scope for V2

### Dependencies

- Google Antigravity platform stability
- Claude Opus 4.5 / Gemini 3 Pro availability
- Third-party services: Analytics, Forms, CMS (if used)

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Performance regression | Medium | Critical | Lighthouse CI on every deploy |
| Calculator complexity | Medium | High | Start with 10 modules, iterate |
| Design consistency | Medium | Medium | Strict design token enforcement |
| Content delays (Case Studies) | High | Medium | Launch with 2, add third post-launch |
| Competitor copying | Low | Low | Speed of execution is the moat |

---

## MVP Definition of Done

### Feature Complete
- [ ] Calculator with 15+ modules functional
- [ ] 3 complete Case Studies published
- [ ] All pages responsive (375px → 1920px)
- [ ] Performance badge live and accurate
- [ ] Contact form submits to notification system

### Quality Assurance
- [ ] Lighthouse Score > 95 on all pages
- [ ] LCP < 1.0s verified on slow 3G
- [ ] WCAG 2.1 AA audit passed
- [ ] Cross-browser testing completed
- [ ] Mobile device testing (iOS Safari, Chrome Android)

### Legal & Compliance
- [ ] Impressum complete
- [ ] Datenschutz (GDPR-compliant privacy policy)
- [ ] Cookie consent implemented
- [ ] AGB if needed for calculator "quotes"

### Documentation
- [ ] README with setup instructions
- [ ] Component documentation
- [ ] Deployment guide

### Release Ready
- [ ] Production domain configured
- [ ] Analytics tracking verified
- [ ] Error monitoring configured (Sentry or similar)
- [ ] Backup/rollback plan documented

---

## Modularity Requirements (1-Week Delivery Architecture)

To enable the "1 week delivery" promise for clients, the codebase must be extremely modular:

### Component Reusability

```
/components
├── /ui              # Atomic components (Button, Input, Card)
│   └── 100% reusable across all projects
├── /layout          # Grid, Section, Container
│   └── 100% reusable
├── /blocks          # Composed components (Hero, Feature Grid, CTA Section)
│   └── 80% reusable, 20% customizable
└── /custom          # Client-specific components
    └── Built per project
```

### Configuration-Driven Customization

```typescript
// Example: Hero component configuration
interface HeroConfig {
  variant: 'centered' | 'split' | 'fullscreen';
  headline: string;
  subheadline?: string;
  cta: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  };
  media?: {
    type: 'image' | 'video' | 'animation';
    src: string;
    alt?: string;
  };
  overlay?: boolean;
  height?: 'full' | 'auto' | 'fixed';
}

// 90% of client projects use existing variants
// 10% need custom variants (billable extra)
```

### Theme Tokens Per Project

```typescript
// Client A: Uses Aurora defaults
const clientATheme = { ...auroraDefaults };

// Client B: Custom gradient spectrum (green-teal)
const clientBTheme = {
  ...auroraDefaults,
  gradientPrimary: 'linear-gradient(135deg, #10B981, #14B8A6, #06B6D4)',
  gradientText: 'linear-gradient(135deg, #059669, #0D9488, #0891B2)',
};

// Client C: Warmer palette (orange-pink)
const clientCTheme = {
  ...auroraDefaults,
  gradientPrimary: 'linear-gradient(135deg, #F97316, #EC4899, #C026D3)',
  gradientText: 'linear-gradient(135deg, #EA580C, #DB2777, #A21CAF)',
};

// Client D: Monochrome with single accent
const clientDTheme = {
  ...auroraDefaults,
  gradientPrimary: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
  gradientText: 'linear-gradient(90deg, #1E3A8A, #2563EB)',
};
```

---

## Appendices

### A. Competitive Analysis

| Competitor | Price Range | Delivery | Performance | Our Advantage |
|------------|-------------|----------|-------------|---------------|
| Standard Agency A | 15-30k€ | 8-12 weeks | LCP 2.5s | 10x cheaper, 8x faster, 2x faster load |
| Standard Agency B | 20-50k€ | 12-16 weeks | LCP 3.2s | 15x cheaper, 16x faster, 3x faster load |
| Freelancer Avg | 5-10k€ | 4-8 weeks | LCP 2.0s | Same price, 4x faster, 2x faster load |
| Baukasten (Wix) | 0.5-2k€ | DIY | LCP 4.0s | Premium quality, 4x faster load |

### B. Calculator Module Details

[See Feature 1 specification above — full module list with prices and dependencies]

### C. Design System Reference

[See Design System section above — complete token documentation]

---

*PRD Version: 1.1*
*Created: 2026-02-01*
*Updated: 2026-02-02 — Aurora Design System*
*Next Review: After MVP Launch*
*Owner: Agency Domination*
*Status: Ready for Technical Design (Part 3)*
