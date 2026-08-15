# Cluster 5: Branchen & Spezial-Landingpages — Master Execution Prompts

Dieses Dokument enthält die vollständigen, copy-paste-fähigen Master-Prompts für den Hessen Master-Hub, lokale Branchen-Kombinationen (Healthcare, Handwerk, Automotive) und die Next.js-Migrationsseite.

---

## 1. Hessen Master-Hub & Navigator — `/standorte/hessen`

```markdown
### AGENT EXECUTION PROMPT: HESSEN MASTER-HUB & REGIONAL NAVIGATOR

**Ziel:** Vollwertiger Hessen-Master-Hub mit interaktiver Hessen-Karte, Filter nach Regierungsbezirken (Gießen, Kassel, Darmstadt), voller Homepage-Parität und Silo-Verlinkung aller 23 Städte und 13 Landkreise.

**Ziel-Dateien:**

- Page: `src/app/[locale]/standorte/hessen/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/hessen-master.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Hessen | Führende Next.js Webagentur · Coday` (52 Zeichen)
- **Description (DE):** `High-End Webdesign & Next.js Entwicklung in ganz Hessen. 100/100 Core Web Vitals, blitzschnelle Ladezeiten & messbare Leads für den hessischen Mittelstand.` (154 Zeichen)
- **Schema.org:** `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`. `areaServed: ['Hessen', 'Mittelhessen', 'Rhein-Main', 'Nordhessen', 'Osthessen', 'Südhessen']`.

---

#### 2. KERN-MODULE

- **Interaktiver Hessen-Navigator:** Schnellauswahl nach Region (Mittelhessen, Rhein-Main, Nordhessen, Osthessen, Südhessen).
- **Paritäts-Sektionen:** Hero mit `QuickContactForm`, `TrustBar`, 4-Pillar Stats Grid, WordPress-vs-Next.js Vergleichstabelle, Founder Philosophy, Services Grid, Testimonials, Geo-Semantic Block, FAQ Accordion.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 2. Arzt & Praxis Wetzlar — `/branchen/gesundheitswesen/arzt-wetzlar`

```markdown
### AGENT EXECUTION PROMPT: PRAXIS & ARZT WETZLAR

**Ziel:** High-Conversion Landingpage für Fachärzte, Zahnärzte, Gemeinschaftspraxen und Therapeuten in Wetzlar und Umgebung.

**Ziel-Dateien:**

- Page: `src/app/[locale]/branchen/gesundheitswesen/arzt-wetzlar/page.tsx`

---

#### 1. METADATEN & HIGHLIGHTS

- **Title (DE):** `Webdesign für Ärzte & Praxen Wetzlar | Coday Healthcare` (55 Zeichen)
- **Description (DE):** `DSGVO-konforme Praxis-Websites in Wetzlar. Online-Terminbuchung, barrierefreies Design & Patientengewinnung mit Next.js. Festpreise auf Anfrage.` (145 Zeichen)
- **Features:** Doctolib/Jameda-Integration, 100% DSGVO-Sicherheit, Barrierefreiheit nach BITV 2.0 / BFSG, Patienten-Filter.

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 3. Arzt & Praxis Gießen — `/branchen/gesundheitswesen/arzt-giessen`

```markdown
### AGENT EXECUTION PROMPT: PRAXIS & ARZT GIESSEN

**Ziel:** Zielgruppenorientierte Seite für Gießener Fachärzte, Privatpraxen und MVZ im Umfeld des Universitätsklinikums.

**Ziel-Dateien:**

- Page: `src/app/[locale]/branchen/gesundheitswesen/arzt-giessen/page.tsx`

---

#### 1. METADATEN & HIGHLIGHTS

- **Title (DE):** `Praxis Webdesign Gießen | Ärzte & Kliniken · Coday` (49 Zeichen)
- **Description (DE):** `Moderne Praxis-Homepages für Gießen. Schnelle Ladezeiten, reibungslose Online-Terminvergabe & Top-Google-Rankings. Festpreise auf Anfrage.` (143 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 4. Handwerker & Meisterbetrieb Wetzlar — `/branchen/handwerker/wetzlar`

```markdown
### AGENT EXECUTION PROMPT: HANDWERK & MEISTERBETRIEB WETZLAR

**Ziel:** Lokale Auftrags- und Mitarbeitergewinnungs-Landingpage für SHK, Elektrotechnik, Dachdecker, Schreiner und Bauhandwerker in Wetzlar und Lahn-Dill.

**Ziel-Dateien:**

- Page: `src/app/[locale]/branchen/handwerker/wetzlar/page.tsx`

---

#### 1. METADATEN & HIGHLIGHTS

- **Title (DE):** `Webdesign für Handwerker Wetzlar | Meister-Websites · Coday` (58 Zeichen)
- **Description (DE):** `Websites für Handwerksbetriebe in Wetzlar. Mehr lukrative Komplettaufträge & qualifizierte Azubis/Gesellen durch Top-Google-Rankings. Festpreis auf Anfrage.` (159 Zeichen)
- **Echte Referenz:** Batherm (Sanitär & Heizung Wetzlar).

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 5. KFZ-Werkstatt Hessen — `/branchen/automobil/kfz-werkstatt`

```markdown
### AGENT EXECUTION PROMPT: AUTOMOTIVE KFZ-WERKSTATT HESSEN

**Ziel:** B2B- & Endkunden-Landingpage für freie Werkstätten, Karosseriebetriebe und Meisterwerkstätten in Hessen.

**Ziel-Dateien:**

- Page: `src/app/[locale]/branchen/automobil/kfz-werkstatt/page.tsx`

---

#### 1. METADATEN & HIGHLIGHTS

- **Title (DE):** `Webdesign für KFZ-Werkstätten Hessen | Coday Automotive` (55 Zeichen)
- **Description (DE):** `High-Performance Websites für KFZ-Werkstätten in Hessen. Online-Terminbuchung für Inspektion, HU/AU & Reparatur. Festpreise auf Anfrage.` (143 Zeichen)
- **Funnel-Link:** Verlinkung auf das Automotive-Dashboard (`automobile-rose-five.vercel.app`).

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 6. KFZ-Mechatroniker Hessen — `/branchen/automobil/kfz-mechatroniker`

```markdown
### AGENT EXECUTION PROMPT: KFZ-MECHATRONIKER & SPEZIALBETRIEBE HESSEN

**Ziel:** Spezialisierte Seite für Tuning, Diagnosezentren, E-Mobilität-Service und Fahrzeugtechnik in Hessen.

**Ziel-Dateien:**

- Page: `src/app/[locale]/branchen/automobil/kfz-mechatroniker/page.tsx`

---

#### 1. METADATEN & HIGHLIGHTS

- **Title (DE):** `Webdesign für KFZ-Mechatroniker Hessen | Coday Auto-Tech` (56 Zeichen)
- **Description (DE):** `Webentwicklung & SEO für KFZ-Mechatroniker & Diagnose-Betriebe in Hessen. Modernes UI/UX-Design & mehr Werkstattanfragen. Festpreise auf Anfrage.` (148 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 7. Autohändler Hessen — `/branchen/automobil/autohaendler`

```markdown
### AGENT EXECUTION PROMPT: AUTOHÄNDLER & AUTOHÄUSER HESSEN

**Ziel:** Performante Plattform für Gebrauchtwagenhändler, Mehrmarken-Autohäuser und Premium-Fahrzeughandel in Hessen.

**Ziel-Dateien:**

- Page: `src/app/[locale]/branchen/automobil/autohaendler/page.tsx`

---

#### 1. METADATEN & HIGHLIGHTS

- **Title (DE):** `Webdesign für Autohändler Hessen | Coday Automotive Web` (56 Zeichen)
- **Description (DE):** `Websites für Autohäuser & Fahrzeughändler in Hessen. Schnelle Fahrzeugpräsentation, mobile Probefahrt-Buchung & SEO. Festpreise auf Anfrage.` (144 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 8. Next.js Migration Landingpage — `/landingpages/nextjsmigration`

```markdown
### AGENT EXECUTION PROMPT: NEXT.JS MIGRATION SERVICE LANDINGPAGE

**Ziel:** Spezifische Landingpage für Unternehmen, die von WordPress, Typo3, Shopware oder Wix auf einen modernen Next.js 15 & Headless CMS Stack migrieren wollen.

**Ziel-Dateien:**

- Page: `src/app/[locale]/landingpages/nextjsmigration/page.tsx`

---

#### 1. METADATEN & HIGHLIGHTS

- **Title (DE):** `Next.js Migration Service | WordPress zu Next.js · Coday` (56 Zeichen)
- **Description (DE):** `Migrieren Sie Ihre Website von WordPress auf Next.js 15. 10x schnellere Ladezeiten, 100% Sicherheit & nahtloser SEO-Relaunch ohne Ranking-Verlust.` (151 Zeichen)
- **Visuals:** Hack-Simulator (WordPress vs Next.js), PageSpeed Live-Vergleich, Migrations-Roadmap in 4 Phasen.

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```
