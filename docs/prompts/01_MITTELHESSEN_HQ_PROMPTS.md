# Cluster 1: Mittelhessen & HQ — Master Execution Prompts

Dieses Dokument enthält die vollständigen, sofort ausführbaren Master-Prompts für alle Flaggschiff-Seiten im Kernland Mittelhessen. Jeder Prompt ist zu 100% copy-paste-fähig und baut die jeweilige Stadtseite auf Basis des vollständigen Homepage-Architekturstandards auf.

---

## 1. Wetzlar (Agentur-HQ & Optikstadt) — `/webdesign-agentur-wetzlar`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP WETZLAR (HQ)

**Ziel:** Vollständiger Ausbau von `/webdesign-agentur-wetzlar` zum ultimativen lokalen Flaggschiff mit 100% Homepage-Parität, lokaler Wetzlarer Optik- & Industrie-DNA und maximaler Conversion-Power.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-agentur-wetzlar/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/wetzlar.json`

---

#### 1. METADATEN & SCHEMA.ORG GRAPH

- **Title (DE):** `Webdesign Agentur Wetzlar | High-End Websites & SEO · Coday` (59 Zeichen)
- **Description (DE):** `Ihre lokale Webagentur in Wetzlar. Next.js 15, <0.5s Ladezeit & messbare B2B-Leads für Mittelstand, Optik & Handwerk. Verbindlicher Festpreis auf Anfrage.` (154 Zeichen)
- **Schema.org Graph:**
  - `LocalBusiness` & `ProfessionalService` mit `address: { addressLocality: 'Wetzlar', postalCode: '35578', streetAddress: 'Lessingstraße 4', addressRegion: 'Hessen' }`, `geo: { latitude: 50.5558, longitude: 8.5076 }`, `areaServed: ['Wetzlar', 'Lahn-Dill-Kreis', 'Mittelhessen']`.
  - `BreadcrumbList`: Home > Standorte > Wetzlar.
  - `FAQPage` mit den 5 lokalen Kernfragen.

---

#### 2. HERO SECTION (HOMEPAGE-PARITÄT)

- **H1 Headline:** `Webdesign & Next.js Entwicklung in` + GradientText: `Wetzlar & Lahn-Dill`
- **Subheadline:** `High-End Webentwicklung, blitzschnelle Ladezeiten unter 500ms und automatisierte Lead-Generierung für den Wetzlarer Mittelstand, Optikunternehmen und Handwerksbetriebe. Verbindlicher Festpreis nach kostenloser Bedarfsanalyse.`
- **Rotating USPs:** `['Agentur-HQ in Wetzlar', '100/100 Core Web Vitals', 'Direkte Zusammenarbeit mit Inhaber', 'Go-Live in unter 14 Tagen']`
- **Inline Lead Form:** `QuickContactForm` direkt integriert.
- **Trust Badges:** `['100% DSGVO-konform', 'Hosting auf deutschen Servern', 'Lighthouse-90-Garantie']`

---

#### 3. TRUSTBAR & REAL CLIENT PROOF

- `TrustBar` mit verifizierten Partnern: **Batherm**, **MS Schlüsseldienst Wetzlar**, **Lindener Ratsstuben**.

---

#### 4. 4-PILLAR STATS BENTO GRID

- **Metric 1:** `< 0.4s` — Ladezeit in Wetzlar & Hessen (TTFB < 50ms via deutsches Edge-Netzwerk).
- **Metric 2:** `100%` — Code-Eigentum (Keine Lizenzgebühren, kein Vendor-Lock-in).
- **Metric 3:** `24h` — Lokale Reaktionszeit direkt vom Gründer in Wetzlar.
- **Metric 4:** `5-10x` — Günstiger als traditionelle Großagenturen bei signifikant höherer Performance.

---

#### 5. COMPARISON TABLE (NEXT.JS VS. TRADITIONELLES WORDPRESS)

- Interaktiver Vergleichstabelle: Ladezeit (<0.5s vs 3-5s), Sicherheit (Enterprise-Static vs Plugin-Risiken), Lead-Conversion (+300% vs Durchschnitt), Support (Persönlich vor Ort vs Callcenter).

---

#### 6. FOUNDER PHILOSOPHY BLOCK

- **Titel:** `Echtes Handwerk statt Agentur-Overhead in Wetzlar`
- **Text:** `Bei Coday sprechen Sie direkt mit mir – Umutcan Emre Tezgel. Keine ahnungslosen Junior-Projektmanager, keine verdeckten Subunternehmer. Reine Ingenieurskunst und KI-gestützte Entwicklungsgeschwindigkeit für maximale Ergebnisse in Wetzlar.`

---

#### 7. SERVICES BENTO SHOWCASE (LOKAL ZUGESCHNITTEN)

1. **High-Performance Webentwicklung:** Next.js 15, React 19, TypeScript.
2. **B2B-Webdesign & UX-Design:** Optik-, Medizintechnik- & Mittelstands-Fokus.
3. **Lokales Silo-SEO & Google-Dominanz:** Top-Rankings für Wetzlar, Hermannstein, Nauborn, Dutenhofen.
4. **Headless CMS & Automatisierung:** Sanity CMS für kinderleichte Content-Pflege ohne Programmierkenntnisse.

---

#### 8. VERIFIED CASE STUDIES & LOCAL PROOF

- Case Study **Batherm** (Sanitär & Heizung Wetzlar): +340% qualifizierte Anfragen, 100/100 Mobile Score.
- Case Study **MS Schlüsseldienst Wetzlar**: 24/7 Notdienst-Dominanz in Mittelhessen.

---

#### 9. LOCAL GEO-SEMANTIC CONTENT SILO (P1–P3)

- **P1 (Wirtschaftsraum Wetzlar & Optik-Zentrum):** Verbindung von Tradition und High-Tech – von Leica und Zeiss bis zu innovativen Präzisionsfertigern im Gewerbepark Spilburg und Dillfeld.
- **P2 (Technologische Überlegenheit für Lahn-Dill):** Warum langsame WordPress-Websites lokale Kunden abschrecken und wie moderne Next.js-Architektur den Unterschied im B2B-Vertrieb macht.
- **P3 (Infrastruktur & Vernetzung):** Perfekte regionale Anbindung über die B49 und A45 an Gießen, Herborn, Limburg und Frankfurt am Main.

---

#### 10. LOCAL FAQ ACCORDION

1. _Wie viel kostet eine professionelle Website in Wetzlar?_ → Verbindlicher Festpreis auf Anfrage nach kostenloser Bedarfsanalyse. Durch schlanke AI-Workflows 5–10x günstiger als typische Agenturen.
2. _Wie lange dauert die Umsetzung?_ → In der Regel 10 bis 14 Werktage bis zum schlüsselfertigen Go-Live.
3. _Können wir uns persönlich in Wetzlar treffen?_ → Ja, sehr gerne direkt vor Ort in Wetzlar oder im Raum Mittelhessen.
4. _Bieten Sie eine Zufriedenheitsgarantie?_ → Ja, vertraglich garantierte Lighthouse-Scores von über 90 Punkten.
5. _Wer betreut die Website nach dem Launch?_ → Inhaber Umutcan Emre Tezgel persönlich mit 24h-Support.

---

#### 11. VERIFIKATION

- `npm run typecheck && npm run lint && npm run build`
```

---

## 2. Gießen (Universitäts- & Medizinstadt) — `/webdesign-giessen`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP GIESSEN

**Ziel:** Vollständiger Ausbau von `/webdesign-giessen` und `/standorte/giessen` zum High-Performance-Lead-Magneten für den Wirtschaftsraum Gießen, Universitätskliniken, Forschung und Dienstleister.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-giessen/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/giessen.json`

---

#### 1. METADATEN & SCHEMA.ORG GRAPH

- **Title (DE):** `Webdesign Gießen | Next.js Webagentur & SEO · Coday` (53 Zeichen)
- **Description (DE):** `Moderne Webentwicklung & Webdesign für Gießen. Ultra-schnelle Ladezeiten, messbare Neukunden & Festpreise auf Anfrage für Praxen, Startups & Mittelstand.` (154 Zeichen)
- **Schema.org:** `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`. `areaServed: ['Gießen', 'Landkreis Gießen', 'Linden', 'Pohlheim', 'Buseck']`.

---

#### 2. HERO SECTION

- **H1 Headline:** `Webdesign & Next.js Entwicklung in` + GradientText: `Gießen & Umgebung`
- **Subheadline:** `Entwickelt für Gießener Ärzte, Kliniken, Tech-Startups und führende Mittelständler. Maximale Ladezeiten, perfekte Google-Rankings und automatisierte Lead-Erfassung.`
- **Rotating USPs:** `['Top-Rankings in Gießen', 'Spezialisiert auf Praxen & B2B', 'Unter 500ms Ladezeit', 'Festpreis auf Anfrage']`
- **Inline Lead Form:** `QuickContactForm` direkt integriert.

---

#### 3. LOKALE GIEßEN-SPEZIFISCHE HIGHLIGHTS

- **Schwerpunkt-Branchen:** Universitätsmedizin, Zahnarzt- & Facharztpraxen, Startups im Technologie- und Innovationszentrum Gießen (TIG), Handel am Seltersweg und Gewerbegebiet West / Europaviertel.
- **Referenz-Fokus:** Lindener Ratsstuben (Gastronomie & Event Gießen-Süd), Praxen-Systeme.
- **Geo-Semantik:** Anbindung über A485 (Gießener Ring), A45 und Schiffenberger Tal.

---

#### 4. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 3. Marburg (Biotech & historische Universitätsstadt) — `/webdesign-marburg`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP MARBURG

**Ziel:** Flaggschiff-Seite für Marburg an der Lahn mit Fokus auf Pharma-, Biotech-Cluster (Görzhain/Behringwerke), Kanzleien, Hotellerie und innovative Dienstleister.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-marburg/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/marburg.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Marburg | High-Performance Webagentur · Coday` (56 Zeichen)
- **Description (DE):** `Webdesign & Next.js Entwicklung in Marburg. Schnelle Ladezeiten, barrierefreies UX-Design & Top-SEO für Pharma, Praxen & Mittelstand. Festpreis auf Anfrage.` (154 Zeichen)

---

#### 2. LOKALER CONTENT-SCHWERPUNKT

- **Wirtschafts-DNA:** Behringwerke, Pharma & Life Sciences, Philipps-Universität, historische Oberstadt, Gewerbegebiete Wehrda und Cappel.
- **Verkehr:** B3-Achse Gießen-Marburg-Kassel.
- **Kernangebot:** Hochsichere Webportale, barrierefreie Interfaces (BITV 2.0 konform) und Premium-Webdesign.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 4. Herborn (Industrie- & Mittelstandszentrum) — `/webdesign-herborn`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP HERBORN

**Ziel:** Lokale B2B-Flaggschiff-Seite für Herborn, Sinn, Mittenaar und das obere Dillgebiet. Fokus auf Maschinenbau, Schaltschrankbau, Zulieferindustrie und Handwerksmeister.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-herborn/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/herborn.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Herborn | B2B-Websites & SEO Agentur · Coday` (54 Zeichen)
- **Description (DE):** `Ihre Webagentur für Herborn & Lahn-Dill. Modernes Webdesign, ultraschnelle Ladezeiten & mehr B2B-Anfragen für Industrie & Handwerk. Festpreis auf Anfrage.` (153 Zeichen)

---

#### 2. LOKALE WIRTSCHAFTS-DNA

- **Schwerpunkte:** Gewerbegebiete Untere Au, Altheimer Feld, Friedrich-Birk-Straße. Industrie- und Schaltschrank-Cluster an der A45 (Sauerlandlinie).
- **Zielgruppe:** Hidden Champions, Werkzeugmacher, B2B-Zulieferer und lokale Handwerksbetriebe.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 5. Dillenburg (Oranienstadt & Werkzeugbau) — `/webdesign-dillenburg`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP DILLENBURG

**Ziel:** Vollständige Transformation von `/webdesign-dillenburg` zu einer reichhaltigen Next.js 15 Flaggschiff-Seite mit voller Homepage-Parität und lokalem Fokus auf Werkzeugbau, Metallverarbeitung und Meisterbetriebe.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-dillenburg/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/dillenburg.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Dillenburg | Next.js B2B Webagentur · Coday` (54 Zeichen)
- **Description (DE):** `Webdesign & Webentwicklung in Dillenburg. Schnelle Ladezeiten, messbare B2B-Leads für Werkzeugbau, Metalltechnik & Handwerk. Festpreis auf Anfrage.` (149 Zeichen)

---

#### 2. LOKALE DILLENBURG-DNA

- **Schwerpunkte:** Gewerbepark Dillfeld, Frohnhausen, Manderbach. Schlossberg, historische Oranienstadt, Anbindung B277 und A45.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 6. Limburg an der Lahn (Domstadt & Wirtschaftsraum Lahntal) — `/webdesign-limburg`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP LIMBURG

**Ziel:** High-Performance Landingpage für Limburg an der Lahn, Diez, Elz und Hadamar. Fokus auf Handel, Logistik am ICE-Knotenpunkt, Dienstleister und Kanzleien.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-limburg/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/limburg.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Limburg | Next.js Agentur & SEO · Coday` (50 Zeichen)
- **Description (DE):** `Professionelles Webdesign in Limburg an der Lahn. Moderne Websites, Top-Ladezeiten & SEO für Dienstleister, Handel & Kanzleien. Festpreis auf Anfrage.` (151 Zeichen)

---

#### 2. LOKALE WIRTSCHAFTS-DNA

- **Schwerpunkte:** ICE-Stadt Limburg, Gewerbegebiet Dietkircher Höhe, Limburger Kreuz (A3 / B49 / B54). Schnittstelle Hessen / Rheinland-Pfalz.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 7. Weilburg an der Lahn (Residenzstadt & Gewerbe Lahntal) — `/webdesign-weilburg`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP WEILBURG

**Ziel:** Lokale Flaggschiff-Seite für Weilburg, Löhnberg, Merenberg und Weinbach. Fokus auf Mittelstand, Tourismus, Hotellerie, Bauhandwerk und B49-Gewerbeparks.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-weilburg/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/weilburg.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Weilburg | High-End Webentwicklung · Coday` (53 Zeichen)
- **Description (DE):** `Webdesign & SEO für Weilburg an der Lahn. Ultraschnelle Next.js Websites für Handwerk, Tourismus & Mittelstand. Verbindliche Festpreise auf Anfrage.` (150 Zeichen)

---

#### 2. LOKALE WEILBURG-DNA

- **Schwerpunkte:** Schloss Weilburg, Lahntal-Tourismus, Gewerbeparks Kubach, Guntersau und Löhnberg. Direkte B49-Schlagader nach Wetzlar und Limburg.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```
