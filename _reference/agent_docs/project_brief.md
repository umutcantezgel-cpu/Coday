# Project Brief — Aurora Design Protocol

> **NEUES DESIGN-SYSTEM: Aurora**
> Helles, künstlerisches Premium-Design mit Farbverläufen.
> Reference this document for ALL design and visual decisions.

---

## Project Vision

**Agency Domination** präsentiert sich mit einem **leuchtenden, künstlerischen Design**, das durch:

1. **Premium Light Mode** — Helle, luftige Ästhetik
2. **Gradient Typography** — Fließende Farbverläufe in Texten
3. **Artistic Expression** — Kreative, fließende Layouts
4. **Blue-Gray Harmony** — Elegante, professionelle Farbpalette

---

## Das Aurora Design Protocol

### Philosophy

> "Licht, Farbe und Bewegung verschmelzen zu einer visuellen Symphonie —
> wo jeder Gradient eine Geschichte erzählt."

Das Aurora Protocol basiert auf drei Prinzipien:

1. **Chromatic Flow** — Farbverläufe erzeugen Tiefe und Bewegung
2. **Light as Canvas** — Helle Flächen als Bühne für farbige Akzente
3. **Artistic Typography** — Text wird zum visuellen Statement

---

## Color System

### Die Aurora Palette

```css
/* ═══════════════════════════════════════════════════════════
   AURORA COLOR SYSTEM — Light Mode Premium
   ═══════════════════════════════════════════════════════════ */

:root {
  /* === BACKGROUND PALETTE (Helle Basis) === */
  --aurora-white:      #FFFFFF;     /* Pure white - primary bg */
  --aurora-snow:       #FAFBFC;     /* Off-white - section bg */
  --aurora-cloud:      #F3F4F6;     /* Light gray - card bg */
  --aurora-mist:       #E5E7EB;     /* Medium gray - borders */
  --aurora-fog:        #D1D5DB;     /* Darker gray - dividers */
  --aurora-slate:      #9CA3AF;     /* Muted text */
  --aurora-storm:      #6B7280;     /* Secondary text */
  --aurora-night:      #374151;     /* Primary text */
  --aurora-deep:       #111827;     /* Headlines, emphasis */

  /* === BLUE GRADIENT SPECTRUM === */
  --aurora-sky:        #E0F2FE;     /* Lightest blue */
  --aurora-azure:      #7DD3FC;     /* Light blue */
  --aurora-ocean:      #38BDF8;     /* Bright blue */
  --aurora-sapphire:   #0EA5E9;     /* Primary blue */
  --aurora-cobalt:     #0284C7;     /* Deep blue */
  --aurora-navy:       #0369A1;     /* Dark blue */
  --aurora-abyss:      #075985;     /* Deepest blue */

  /* === ACCENT GRADIENTS (Die Magie!) === */

  /* Primary Gradient - Ocean Flow */
  --gradient-ocean: linear-gradient(135deg,
    #0EA5E9 0%,
    #6366F1 50%,
    #8B5CF6 100%
  );

  /* Secondary Gradient - Sky Dream */
  --gradient-sky: linear-gradient(135deg,
    #38BDF8 0%,
    #818CF8 100%
  );

  /* Accent Gradient - Aurora Borealis */
  --gradient-aurora: linear-gradient(135deg,
    #06B6D4 0%,
    #3B82F6 25%,
    #8B5CF6 50%,
    #EC4899 75%,
    #F43F5E 100%
  );

  /* Subtle Gradient - Whisper */
  --gradient-whisper: linear-gradient(135deg,
    #E0F2FE 0%,
    #EDE9FE 50%,
    #FCE7F3 100%
  );

  /* Text Gradient - Sapphire Flow */
  --gradient-text: linear-gradient(135deg,
    #0EA5E9 0%,
    #6366F1 100%
  );

  /* Text Gradient - Vivid */
  --gradient-text-vivid: linear-gradient(135deg,
    #0EA5E9 0%,
    #8B5CF6 50%,
    #EC4899 100%
  );

  /* Button Gradient */
  --gradient-button: linear-gradient(135deg,
    #0EA5E9 0%,
    #6366F1 100%
  );

  /* Card Hover Gradient */
  --gradient-card-hover: linear-gradient(135deg,
    rgba(14, 165, 233, 0.05) 0%,
    rgba(99, 102, 241, 0.05) 100%
  );

  /* === GLASSMORPHISM === */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.5);
  --glass-blur: blur(12px);

  /* === SHADOWS (Soft, Premium) === */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07),
               0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08),
               0 4px 6px -2px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08),
               0 10px 10px -5px rgba(0, 0, 0, 0.03);
  --shadow-glow: 0 0 40px rgba(14, 165, 233, 0.15);
  --shadow-glow-strong: 0 0 60px rgba(14, 165, 233, 0.25);
}
```

### Gradient Text Implementation

```css
/* GRADIENT TEXT - Die Signature des Aurora Designs */

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

.text-gradient-aurora {
  background: var(--gradient-aurora);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: aurora-shift 8s ease infinite;
}

@keyframes aurora-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Color Usage Rules

| Element | Allowed Colors/Gradients | Notes |
|---------|-------------------------|-------|
| **Page Background** | aurora-white, aurora-snow | Helle, reine Basis |
| **Section Background** | aurora-cloud, gradient-whisper | Subtle Variation |
| **Card Background** | aurora-white + shadow | Floating Cards |
| **Primary Text** | aurora-deep, aurora-night | Lesbarkeit first |
| **Secondary Text** | aurora-storm, aurora-slate | Hierarchy |
| **Headlines** | **gradient-text**, aurora-deep | Gradients für Impact! |
| **Hero Headlines** | **gradient-text-vivid** | Maximum Impact |
| **Prices** | **gradient-text** | Eye-catching |
| **CTAs** | **gradient-button** | Action-oriented |
| **Links** | aurora-sapphire → gradient on hover | Interactive |
| **Borders** | aurora-mist, aurora-fog | Subtle definition |
| **Icons** | aurora-sapphire, gradient fills | Consistent accent |

### The Gradient Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│  GRADIENT USAGE GUIDE                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🌟 HERO HEADLINES → gradient-text-vivid (3 colors)        │
│     "Websites die begeistern"                              │
│                                                             │
│  ⭐ SECTION HEADLINES → gradient-text (2 colors)           │
│     "Unsere Arbeit", "Der Prozess"                         │
│                                                             │
│  💫 ACCENT TEXT → gradient-text                            │
│     Prices, Key metrics, CTAs labels                       │
│                                                             │
│  ✨ DECORATIVE → gradient-aurora (animated)                │
│     Background shapes, dividers, special effects           │
│                                                             │
│  🔵 STANDARD EMPHASIS → aurora-sapphire (solid)            │
│     Links, icons, small highlights                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Typography

### Font Stack

```css
--font-display: 'Outfit', system-ui, sans-serif;      /* Headlines - Modern, elegant */
--font-body:    'Inter', system-ui, sans-serif;       /* Body - Clean, readable */
--font-mono:    'JetBrains Mono', monospace;          /* Code, prices */
```

### Type Scale (Fluid)

```css
--text-hero:  clamp(3.5rem, 2.5rem + 6vw, 7rem);    /* Hero headlines */
--text-5xl:   clamp(2.5rem, 2rem + 4vw, 4.5rem);
--text-4xl:   clamp(2rem, 1.5rem + 3vw, 3.5rem);
--text-3xl:   clamp(1.75rem, 1.25rem + 2vw, 2.5rem);
--text-2xl:   clamp(1.5rem, 1.25rem + 1vw, 2rem);
--text-xl:    clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem);
--text-base:  clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--text-sm:    clamp(0.875rem, 0.85rem + 0.125vw, 0.9375rem);
```

### Gradient Headlines Implementation

```tsx
// Hero Headline - Maximum Impact
<h1 className="text-hero font-display font-bold text-gradient-vivid">
  Websites die begeistern
</h1>

// Section Headline
<h2 className="text-4xl font-display font-semibold text-gradient">
  Unsere Arbeit
</h2>

// Accent Text (Prices, Stats)
<span className="text-3xl font-mono font-bold text-gradient">
  €1.490
</span>
```

---

## Layout Principles

### 1. Flowing, Organic Shapes

```css
/* Decorative gradient blobs */
.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: float 20s ease-in-out infinite;
}

.aurora-blob-1 {
  background: linear-gradient(135deg, #0EA5E9, #6366F1);
  width: 400px;
  height: 400px;
}

.aurora-blob-2 {
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  width: 300px;
  height: 300px;
  animation-delay: -5s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}
```

### 2. Glassmorphism Cards

```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.85);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.08),
    0 20px 25px -5px rgba(14, 165, 233, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}
```

### 3. Generous Whitespace

- **Section padding:** 160px (desktop), 80px (mobile)
- **Between cards:** 32-48px gaps
- **Content max-width:** 1200px (narrower for elegance)
- **Line height:** 1.8 for body text (airy feeling)

### 4. Gradient Borders & Dividers

```css
/* Gradient border trick */
.gradient-border {
  position: relative;
  background: white;
  border-radius: 24px;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 26px;
  background: var(--gradient-ocean);
  z-index: -1;
}

/* Gradient divider */
.gradient-divider {
  height: 2px;
  background: var(--gradient-text);
  border-radius: 1px;
}
```

---

## Component Design Language

### Buttons

```
Primary Button (Gradient):
┌─────────────────────────────────────┐
│  background: gradient-button        │
│  text: white                        │
│  shadow: shadow-lg + glow           │
│  hover: brightness(1.1) + lift      │
│  border-radius: 12px                │
└─────────────────────────────────────┘

Secondary Button (Outlined):
┌─────────────────────────────────────┐
│  background: transparent            │
│  border: 2px gradient (via ::before)│
│  text: gradient-text                │
│  hover: fill with gradient-whisper  │
└─────────────────────────────────────┘

Ghost Button:
┌─────────────────────────────────────┐
│  background: transparent            │
│  text: aurora-storm                 │
│  hover: text becomes gradient       │
└─────────────────────────────────────┘
```

### Cards

```
Standard Card:
┌─────────────────────────────────────┐
│  background: aurora-white           │
│  border-radius: 24px                │
│  shadow: shadow-lg                  │
│  border: 1px solid aurora-mist      │
│                                     │
│  Hover:                             │
│  - translateY(-8px)                 │
│  - shadow-xl                        │
│  - gradient-card-hover overlay      │
└─────────────────────────────────────┘

Glass Card:
┌─────────────────────────────────────┐
│  background: glass-bg               │
│  backdrop-filter: blur(12px)        │
│  border: glass-border               │
│  Use over gradient backgrounds      │
└─────────────────────────────────────┘

Feature Card (with gradient accent):
┌─────────────────────────────────────┐
│  ┌───────────────────────────────┐ │
│  │  GRADIENT TOP BAR (4px)       │ │
│  └───────────────────────────────┘ │
│                                     │
│  Icon (gradient fill)               │
│  Title (aurora-deep)                │
│  Description (aurora-storm)         │
│                                     │
└─────────────────────────────────────┘
```

### Form Inputs

```
Default State:
┌─────────────────────────────────────┐
│  background: aurora-snow            │
│  border: 2px solid aurora-mist      │
│  border-radius: 12px                │
│  text: aurora-deep                  │
│  placeholder: aurora-slate          │
└─────────────────────────────────────┘

Focus State:
┌─────────────────────────────────────┐
│  border: 2px gradient-ocean         │
│  box-shadow: shadow-glow            │
│  (Gradient border via ::before)     │
└─────────────────────────────────────┘
```

---

## Motion Design

### Timing Functions

```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);      /* Standard */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful */
--ease-elegant: cubic-bezier(0.16, 1, 0.3, 1);    /* Premium feel */
```

### Signature Animations

```css
/* Gradient shimmer effect */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.shimmer {
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
}

/* Floating elements */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Pulse glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(14, 165, 233, 0.3); }
  50% { box-shadow: 0 0 40px rgba(14, 165, 233, 0.5); }
}

/* Text reveal with gradient */
@keyframes text-reveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

---

## Visual Examples

### Hero Section Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ╭─────────╮                              ╭─────────╮       │
│  │ BLOB 1  │ (blur, aurora-sapphire)      │ BLOB 2  │       │
│  ╰─────────╯                              ╰─────────╯       │
│                                                             │
│           ╭───────────────────────────────────────╮         │
│           │                                       │         │
│           │   "Websites die                       │         │
│           │    begeistern"                        │         │
│           │    ↑ GRADIENT TEXT (vivid)            │         │
│           │                                       │         │
│           │   Premium Webdesign zu fairen Preisen │         │
│           │   ↑ aurora-storm (normal text)        │         │
│           │                                       │         │
│           │   [ Jetzt konfigurieren ]             │         │
│           │     ↑ GRADIENT BUTTON                 │         │
│           │                                       │         │
│           ╰───────────────────────────────────────╯         │
│                                                             │
│                              ╭─────────╮                    │
│                              │ BLOB 3  │                    │
│                              ╰─────────╯                    │
└─────────────────────────────────────────────────────────────┘
```

### Card with Gradient Price

```
┌─────────────────────────────────────────┐
│                                         │
│   🚀  Starter Paket                     │
│       ↑ Icon with gradient fill         │
│                                         │
│   Perfekt für kleine Projekte           │
│   mit 1-5 Seiten.                       │
│   ↑ aurora-storm text                   │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  €1.490                         │  │
│   │  ↑ GRADIENT TEXT (big, mono)    │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ✓ Responsive Design                   │
│   ✓ SEO Grundlagen                      │
│   ✓ 1 Revisionsrunde                    │
│   ↑ aurora-night with aurora-sapphire ✓ │
│                                         │
└─────────────────────────────────────────┘

Hover State:
- Card lifts (translateY: -8px)
- Shadow expands + glow
- Subtle gradient overlay appears
```

---

## Imagery Guidelines

### Allowed

```
✅ Abstract gradient backgrounds
✅ Geometric shapes with gradient fills
✅ Light, airy photography (if any)
✅ Custom illustrations with gradient accents
✅ Glassmorphism UI elements
✅ Floating 3D objects (subtle, gradient-lit)
```

### Forbidden

```
❌ Dark, moody imagery
❌ Stock photos of business people
❌ Heavy, cluttered visuals
❌ Solid color blocks (use gradients!)
❌ Sharp, aggressive design elements
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  AURORA DESIGN QUICK REFERENCE                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BACKGROUNDS                                                │
│  Page:     aurora-white / aurora-snow                       │
│  Section:  aurora-cloud / gradient-whisper                  │
│  Cards:    aurora-white + shadow-lg                         │
│                                                             │
│  TEXT                                                       │
│  Headlines:  GRADIENT (text-gradient / text-gradient-vivid) │
│  Body:       aurora-night / aurora-deep                     │
│  Secondary:  aurora-storm / aurora-slate                    │
│  Prices:     GRADIENT (text-gradient, mono font)            │
│                                                             │
│  ACCENTS                                                    │
│  Buttons:    gradient-button (blue → purple)                │
│  Links:      aurora-sapphire → gradient on hover            │
│  Icons:      aurora-sapphire or gradient fills              │
│  Borders:    aurora-mist or gradient-border                 │
│                                                             │
│  EFFECTS                                                    │
│  Cards:      shadow-lg, hover: shadow-xl + lift             │
│  Glass:      backdrop-blur + white/70% bg                   │
│  Blobs:      Blurred gradient circles, animated             │
│                                                             │
│  FONTS                                                      │
│  Display:    Outfit (headlines)                             │
│  Body:       Inter                                          │
│  Mono:       JetBrains Mono (prices, code)                  │
│                                                             │
│  REMEMBER: Gradients are the signature. Use them liberally! │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

*Last Updated: 2026-02-02*
*Design Version: Aurora 1.0*
*Theme: Light Premium with Gradients*
