# Design System Token Inventory

Dieses Dokument listet die skalierbaren Tokens auf, die während der Design-System-Migration extrahiert und in den Codebase integriert wurden.
Der Fokus lag auf einem reinen Light-Theme ("Premium Light") für eine Solo-Agentur.

## 1. Primitive Tokens (`tokens/primitive.css`)

### Farben
Das Farbsystem basiert auf dem Kern-Brand von Coday (Teal & Slate).
- **Primary:** Teal (50 bis 950)
- **Secondary:** Slate (50 bis 950)
- **Neutral:** Zink/Gray (50 bis 950)
- **Accent:** Amber (50 bis 950)

### Typografie (Skala)
- Ratio: 1.25 (Modular Scale)
- Font Families: `Inter` (sans-serif)

### Layout & Spacing
- `--space-section`: clamp(48px, 8vw, 96px)
- `--space-container`: clamp(16px, 4vw, 48px)
- `--space-gap`: clamp(16px, 2vw, 24px)

---

## 2. Semantische Tokens (`tokens/semantic.css`)

Die semantischen Tokens trennen die Bedeutung vom hardkodierten Farbwert. In den React-Komponenten werden ausschließlich diese verwendet.

### Oberflächen (Surfaces)
- `--color-surface-base`: Basis Hintergrund (Weiß)
- `--color-surface-muted`: Abgeschwächter Hintergrund (für Cards/Modals)
- `--color-surface-elevated`: Abgehobener Hintergrund (für Sticky/Floating Elements)
- `--color-surface-inverse`: Invertierter Hintergrund (für den extremen Kontrast, ehemals Dark Mode Elemente)

### Inhalt (Content)
- `--color-content-base`: Standard Textfarbe (Slate 900)
- `--color-content-muted`: Abgeschwächte Textfarbe (Slate 600/700)
- `--color-content-inverse`: Invertierter Text (Weiß)
- `--color-content-brand`: Highlight Text (Primary Teal)

### Rahmen (Borders)
- `--color-border-base`: Standard Rahmen
- `--color-border-muted`: Abgeschwächter Rahmen

---

## 3. Motion Tokens (`tokens/motion.css`)

Implementiert nach den Prinzipien von Emil Kowalski, hardwarebeschleunigt und "snappy".

### Dauern (Durations)
- `--duration-instant`: 150ms
- `--duration-fast`: 200ms
- `--duration-normal`: 300ms
- `--duration-deliberate`: 500ms

### Easings (Bézier Curves)
- `--ease-out`: cubic-bezier(0, 0, 0.2, 1)
- `--ease-in-out`: cubic-bezier(0.4, 0, 0.2, 1)
- `--ease-spring`: cubic-bezier(0.175, 0.885, 0.32, 1.275)

> *Hinweis:* Alle hartkodierten Werte wie `text-slate-500`, `bg-teal-600` oder feste `z-index` Werte (z.B. `z-[105]`) wurden durch systematisierte Variablen wie `text-content-muted`, `bg-primary` und `z-modal` ersetzt.
