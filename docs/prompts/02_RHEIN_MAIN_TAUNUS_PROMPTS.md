# Cluster 2: Rhein-Main & Taunus — Master Execution Prompts

Dieses Dokument enthält die vollständigen, copy-paste-fähigen Master-Prompts für alle Städte in der Metropolregion Rhein-Main und im Vordertaunus.

---

## 1. Frankfurt am Main (Finanzmetropole & B2B-Flaggschiff) — `/webdesign-frankfurt`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP FRANKFURT

**Ziel:** High-End B2B- & Enterprise-Flaggschiff für Frankfurt am Main mit voller Homepage-Parität, Fokus auf FinTech, Corporate Law, Beratung und B2B-Mittelstand.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-frankfurt/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/frankfurt.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Frankfurt | High-End Next.js Webagentur · Coday` (56 Zeichen)
- **Description (DE):** `Enterprise Webdesign & Webentwicklung in Frankfurt am Main. Next.js 15, <0.4s Ladezeit & B2B-Leads für FinTech, Kanzleien & Mittelstand. Festpreis auf Anfrage.` (157 Zeichen)
- **Schema.org:** `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`. `areaServed: ['Frankfurt am Main', 'Bankenviertel', 'Westend', 'Sachsenhausen', 'Gateway Gardens']`.

---

#### 2. HERO SECTION & VALUE PROPOSITIONS

- **H1:** `Webdesign & Enterprise Next.js Entwicklung in` + GradientText: `Frankfurt am Main`
- **Subheadline:** `Ultraschnelle Webapplikationen, kompromisslose Datensicherheit und hochkonvertierende Websites für anspruchsvolle Frankfurter Unternehmen. Verbindlicher Festpreis auf Anfrage.`
- **Rotating USPs:** `['Enterprise Next.js Architektur', 'Banken-Grade Sicherheit & DSGVO', '5-10x günstiger als Großagenturen', 'Inhabergeführte Präzision']`
- **Lead Capture:** `QuickContactForm` direkt integriert.

---

#### 3. FRANKFURT-SPEZIFISCHE GEO-SEMANTIK

- **Wirtschaftsräume:** Bankenviertel, Mainzer Landstraße, Westhafen, Industriepark Höchst, Gateway Gardens (Flughafen).
- **Zielgruppen:** FinTechs, Family Offices, M&A-Boutiquen, Wirtschaftskanzleien, Technologieberatungen.
- **Technischer USP:** Globale CDN-Edge-Verteilung (<20ms TTFB am DE-CIX Frankfurt).

---

#### 4. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 2. Wiesbaden (Hessische Landeshauptstadt) — `/webdesign-wiesbaden`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP WIESBADEN

**Ziel:** Exklusiver Ausbau von `/webdesign-wiesbaden` mit Fokus auf Ministerien, Kanzleien, Consulting, Facharztkliniken und Premium-Dienstleister.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-wiesbaden/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/wiesbaden.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Wiesbaden | Premium Webagentur & SEO · Coday` (54 Zeichen)
- **Description (DE):** `Exzellentes Webdesign & Next.js Entwicklung in Wiesbaden. Schnelle Ladezeiten, seriöse Ästhetik & SEO für Kanzleien, Praxen & Berater. Festpreis auf Anfrage.` (154 Zeichen)

---

#### 2. GEO-SEMANTIK & WIRTSCHAFTS-DNA

- **Schwerpunkte:** Landeshauptstadt, Wilhelmstraße, Kurhaus, Gewerbegebiete Nordenstadt und Schierstein.
- **Branchen:** Steuerberater, Notare, Privatkliniken, Consulting-Boutiquen, Immobilienmakler.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 3. Bad Homburg v. d. H. (Hochtaunus Enterprise) — `/webdesign-bad-homburg`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP BAD HOMBURG

**Ziel:** High-End Auftritt für Bad Homburg vor der Höhe, Friedrichsdorf und den Hochtaunuskreis. Fokus auf Family Offices, Pharma, Healthcare und gehobene Dienstleister.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-bad-homburg/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/bad-homburg.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Bad Homburg | High-End Webagentur · Coday` (52 Zeichen)
- **Description (DE):** `Webdesign & Webentwicklung in Bad Homburg v. d. H. Elegantes UX-Design, maximale Performance & Diskretion für Family Offices, Praxen & B2B. Festpreis auf Anfrage.` (159 Zeichen)

---

#### 2. GEO-SEMANTIK BAD HOMBURG

- **Schwerpunkte:** Kurpark, Kaiser-Friedrich-Promenade, Gewerbegebiete Mitte und Süd. Pharmastandort und Unternehmenszentralen.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 4. Oberursel Taunus (IT- & Business-Hub) — `/webdesign-oberursel`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP OBERURSEL

**Ziel:** Lokale B2B- & Tech-Seite für Oberursel, Steinbach und Kronberg im Taunus.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-oberursel/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/oberursel.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Oberursel | Next.js Agentur & SEO · Coday` (51 Zeichen)
- **Description (DE):** `Ihre Webagentur für Oberursel (Taunus). Moderne B2B-Websites, schnelle Ladezeiten & automatisierte Lead-Generierung für Mittelstand & IT. Festpreis auf Anfrage.` (158 Zeichen)

---

#### 2. GEO-SEMANTIK

- **Schwerpunkte:** Gewerbegebiet An den Drei Hasen, Zimmersmühlenweg, Taunus-Infrastruktur (U3 / S5 Anbindung).

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 5. Bad Vilbel (Quellenstadt & Rhein-Main Nord) — `/webdesign-bad-vilbel`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP BAD VILBEL

**Ziel:** Flaggschiff für Bad Vilbel, Dortelweil und Massenheim. Fokus auf Medien, Musik, Pharma und regionale Dienstleister.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-bad-vilbel/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/bad-vilbel.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Bad Vilbel | Webentwicklung & SEO · Coday` (51 Zeichen)
- **Description (DE):** `Professionelles Webdesign in Bad Vilbel. Moderne Websites, Top-PageSpeed & lokale Google-Rankings für Mittelstand & Dienstleister. Festpreise auf Anfrage.` (154 Zeichen)

---

#### 2. GEO-SEMANTIK

- **Schwerpunkte:** Quellenpark, Dortelweil Gewerbegebiet, B3-Achse nach Frankfurt und Gießen.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 6. Offenbach am Main (Kreativ- & Design-Hub) — `/webdesign-offenbach`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP OFFENBACH

**Ziel:** Moderner Auftritt für Offenbach am Main, Kaiserlei und Hafen Offenbach. Fokus auf Designwirtschaft, E-Commerce, Automotive und urbane Gewerbebetriebe.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-offenbach/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/offenbach.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Offenbach | High-End Next.js Agentur · Coday` (53 Zeichen)
- **Description (DE):** `Modernes Webdesign & Webentwicklung in Offenbach am Main. Schnelle Ladezeiten, starkes UI/UX-Design & SEO für Kreative & Mittelstand. Festpreis auf Anfrage.` (156 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 7. Hanau (Brüder-Grimm-Stadt & Main-Kinzig) — `/webdesign-hanau`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP HANAU

**Ziel:** Lokale B2B- & Industrie-Landingpage für Hanau, Wolfgang, Großauheim und Steinheim. Fokus auf Materialtechnik, Chemie, Handwerk und Logistik.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-hanau/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/hanau.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Hanau | B2B Webentwicklung & SEO · Coday` (49 Zeichen)
- **Description (DE):** `Webdesign & SEO für Hanau und Main-Kinzig. Ultraschnelle Next.js Plattformen für Industrie, Handwerk & Technologieunternehmen. Festpreise auf Anfrage.` (153 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 8. Hofheim am Taunus (Main-Taunus Zentrum) — `/webdesign-hofheim`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP HOFHEIM

**Ziel:** Hochwertiger Webauftritt für Hofheim am Taunus, Kriftel, Kelkheim und Eppstein.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-hofheim/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/hofheim.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Hofheim am Taunus | Webagentur · Coday` (49 Zeichen)
- **Description (DE):** `Webdesign & SEO in Hofheim am Taunus. Moderne Websites mit <0.5s Ladezeit für Praxen, Kanzleien & lokale Dienstleister. Verbindlicher Festpreis auf Anfrage.` (157 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 9. Rüsselsheim am Main (Automotive & Engineering) — `/webdesign-ruesselsheim`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP RÜSSELSHEIM

**Ziel:** B2B- & Engineering-Fokus für Rüsselsheim am Main, Raunheim und Bischofsheim.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-ruesselsheim/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/ruesselsheim.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Rüsselsheim | Automotive & B2B Agentur · Coday` (56 Zeichen)
- **Description (DE):** `Webdesign & Webentwicklung in Rüsselsheim am Main. Performante Next.js Websites für Ingenieurbüros, Automotive & Mittelstand. Festpreis auf Anfrage.` (151 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 10. Rodgau (Gewerbeparks & Mittelstand) — `/webdesign-rodgau`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP RODGAU

**Ziel:** Mittelstands- & Handwerkerseite für Rodgau (Jügesheim, Dudenhofen, Nieder-Roden).

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-rodgau/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/rodgau.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Rodgau | Lokale Webagentur & SEO · Coday` (49 Zeichen)
- **Description (DE):** `Professionelles Webdesign in Rodgau & Kreis Offenbach. Ultraschnelle Ladezeiten, messbare Leads für Handwerk & Mittelstand. Festpreise auf Anfrage.` (151 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 11. Dietzenbach (Kreisstadt & Logistik-Cluster) — `/webdesign-dietzenbach`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP DIETZENBACH

**Ziel:** Lokale B2B- & Handwerker-Präsenz für Dietzenbach und das Rodgau-Umfeld.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-dietzenbach/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/dietzenbach.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Dietzenbach | Webagentur & SEO · Coday` (48 Zeichen)
- **Description (DE):** `Webdesign & Webentwicklung in Dietzenbach. Schnelle Ladezeiten, top Google-Rankings für Gewerbe, Logistik & Handwerk. Verbindlicher Festpreis auf Anfrage.` (156 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 12. Friedberg Hessen (Wetterau-Kreisstadt) — `/webdesign-friedberg`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP FRIEDBERG

**Ziel:** Flaggschiff für Friedberg (Hessen), Bad Nauheim und das südliche Mittelhessen.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-friedberg/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/friedberg.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Friedberg Hessen | Webagentur & SEO · Coday` (53 Zeichen)
- **Description (DE):** `Webdesign & SEO in Friedberg & Bad Nauheim. Next.js Websites mit <0.5s Ladezeit für Praxen, Mittelstand & Hochschulumfeld. Festpreis auf Anfrage.` (150 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```
