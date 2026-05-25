# WCAG 2.2 AA Manuelle Test-Checkliste

Automatisierte Tools wie Axe-Core finden nur ca. 30-40% aller Accessibility-Probleme. Diese Checkliste muss vor jedem Major Release manuell durchgegangen werden.

## 1. Tastatur-Only Tests (Kein Maus-Einsatz)
- [ ] **Tab-Navigation:** Kann ich alle interaktiven Elemente (Links, Buttons, Formulare) mit der `Tab`-Taste erreichen?
- [ ] **Focus Visible:** Ist bei *jedem* Element klar erkennbar, dass es fokussiert ist (kein `outline: none` ohne Fallback)?
- [ ] **Skip to Content:** Ist das erste fokussierbare Element ein "Skip to Main Content" Link, der auch funktioniert?
- [ ] **Focus Trap (Modals):** Wenn ein Cookie-Banner oder Modal offen ist, ist der Fokus darin gefangen? Komme ich mit `ESC` wieder raus?
- [ ] **Logical Order:** Entspricht die Tab-Reihenfolge dem visuellen Lesefluss (von oben links nach unten rechts)?

## 2. Screenreader Tests (VoiceOver auf macOS / NVDA auf Windows)
*Teste 15 typische User-Flows, unter anderem:*
1. [ ] Navigation durch das Hauptmenü öffnen und schließen.
2. [ ] Ein Paket auf der Pricing-Seite auswählen.
3. [ ] Das Kontaktformular fehlerhaft ausfüllen und prüfen, ob der Fehler vorgelesen wird.
4. [ ] Den Cookie-Banner akzeptieren.
5. [ ] Einen Blogartikel komplett vorlesen lassen.

**Was muss geprüft werden?**
- Werden "versteckte" visuelle Informationen (wie ein Icon ohne Text) durch `aria-label` oder `sr-only` Klassen vorgelesen?
- Werden Formularfelder korrekt mit ihren Labels assoziiert (Click auf Label fokussiert das Feld)?
- Werden dynamische Änderungen (z.B. Lade-Spinner nach Button-Klick) durch `aria-live` Regionen angesagt?

## 3. Visuelle & Kognitive Tests
- [ ] **Zoom 200%:** Browser auf 200% zoomen. Wird Text abgeschnitten? Überlappen sich Elemente so, dass sie unbedienbar werden? (WCAG 1.4.4)
- [ ] **Text Spacing:** (Custom CSS via Bookmarklet) Zeilenabstand auf 1.5, Absatzabstand auf 2x, Zeichenabstand auf 0.12em. Bricht das Layout? (WCAG 1.4.12)
- [ ] **Redundant Entry (WCAG 2.2):** Muss der Nutzer im Buchungsprozess dieselben Informationen (z.B. Adresse) mehrfach eingeben? (WCAG 3.3.7)
- [ ] **Consistent Help (WCAG 2.2):** Ist der Link zur Kontaktseite/Support auf jeder Seite an der gleichen relativen Position? (WCAG 3.2.6)
- [ ] **High Contrast Mode (Windows):** Sind Icons (insbesondere SVGs) und Ränder noch sichtbar, wenn der High Contrast Modus aktiviert ist?
- [ ] **Color Contrast:** Auch im Hover- und Focus-Zustand muss der Kontrast für Text mindestens 4.5:1 betragen.

## 4. Spezifische Mobile-Tests
- [ ] **Target Size (Minimum) (WCAG 2.2):** Sind alle mobilen Menü-Links und Social-Icons mindestens 24x24 CSS-Pixel groß?
- [ ] **Orientation:** Funktioniert die Seite auch im Querformat (Landscape) ohne Datenverlust?
- [ ] **Dragging Movements (WCAG 2.2):** Wenn es Slider oder Maps gibt, die man "ziehen" (draggen) muss, gibt es eine Alternative durch einfaches Klicken (z.B. Pfeil-Buttons)? (WCAG 2.5.7)

---
*Protokoll ausfüllen, unterschreiben und an den Pull Request anhängen.*
