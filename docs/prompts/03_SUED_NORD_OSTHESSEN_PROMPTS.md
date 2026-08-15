# Cluster 3: Süd-, Nord- & Osthessen — Master Execution Prompts

Dieses Dokument enthält die vollständigen, copy-paste-fähigen Master-Prompts für alle regionalen Oberzentren in Süd-, Nord- und Osthessen.

---

## 1. Darmstadt (Wissenschaftsstadt & Digital-Hub) — `/webdesign-darmstadt`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP DARMSTADT

**Ziel:** Tech- & Science-Flaggschiff für Darmstadt, Griesheim, Weiterstadt und Pfungstadt. Fokus auf Softwareunternehmen, Raumfahrt/ESA-Umfeld, TU Darmstadt Spin-offs, Chemie/Pharma und innovativen Mittelstand.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-darmstadt/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/darmstadt.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Darmstadt | Tech & Next.js Webagentur · Coday` (54 Zeichen)
- **Description (DE):** `High-End Webentwicklung & Webdesign in Darmstadt. Ultraschnelle Next.js Architekturen & messbare B2B-Leads für Startups, Tech & Mittelstand. Festpreis auf Anfrage.` (163 Zeichen)
- **Schema.org:** `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`. `areaServed: ['Darmstadt', 'Wissenschaftsstadt', 'Griesheim', 'Weiterstadt', 'Pfungstadt']`.

---

#### 2. HERO & VALUE PROPOSITIONS

- **H1:** `Webdesign & High-Performance Next.js in` + GradientText: `Darmstadt`
- **Subheadline:** `Entwickelt für die Digitalstadt Darmstadt: Blitzschnelle Webapplikationen, modernste Headless CMS Lösungen und kompromisslose technische Exzellenz. Verbindlicher Festpreis auf Anfrage.`
- **Rotating USPs:** `['Wissenschafts- & Tech-Fokus', '< 0.4s Ladezeit weltweit', '100% DSGVO & Cloud-Souveränität', 'Direkt vom Lead-Entwickler']`
- **Lead Capture:** `QuickContactForm` direkt integriert.

---

#### 3. DARMSTADT GEO-SEMANTIK

- **Wirtschaftsräume:** Europaviertel, Telekom City, TZ Rhein Main, Gewerbegebiet Weiterstadt.
- **Zielgruppen:** IT-Dienstleister, Cybersecurity-Firmen (CRISP-Umfeld), Pharma/Chemie, Ingenieurbüros.

---

#### 4. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 2. Bensheim (Wirtschaftszentrum Bergstraße) — `/webdesign-bensheim`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP BENSHEIM

**Ziel:** Regionales Flaggschiff für Bensheim, Heppenheim, Zwingenberg und den Kreis Bergstraße.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-bensheim/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/bensheim.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Bensheim | Webagentur Bergstraße · Coday` (49 Zeichen)
- **Description (DE):** `Professionelles Webdesign in Bensheim & an der Bergstraße. Schnelle Ladezeiten, top Google-Rankings & mehr Kunden für Mittelstand & Dienstleister. Festpreis.` (154 Zeichen)

---

#### 2. GEO-SEMANTIK

- **Schwerpunkte:** Gewerbepark Süd, Stubenwald, Bergstraße (B3 / A5 / A67). Dental- & Medizintechnik, Tourismus & Weinbau.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 3. Kassel (Nordhessische Metropole & Industrie) — `/webdesign-kassel`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP KASSEL

**Ziel:** Nordhessen-Flaggschiff für Kassel, Baunatal, Lohfelden und Vellmar. Fokus auf Mobilität, Logistik, Erneuerbare Energien und Maschinenbau.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-kassel/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/kassel.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Kassel | Next.js Agentur & SEO Nordhessen · Coday` (59 Zeichen)
- **Description (DE):** `Webdesign & Webentwicklung in Kassel. Next.js 15 Plattformen für Industrie, Logistik & Mittelstand in Nordhessen. Verbindliche Festpreise auf Anfrage.` (151 Zeichen)

---

#### 2. GEO-SEMANTIK

- **Schwerpunkte:** Science Park Kassel, Gewerbegebiet Waldau, Güterverkehrszentrum Kassel (A7 / A44 / A49).

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 4. Fulda (Osthessischer B2B- & Logistikknoten) — `/webdesign-fulda`

```markdown
### AGENT EXECUTION PROMPT: WEB DESIGN & DEVELOPMENT FLAGSHIP FULDA

**Ziel:** Osthessen-Flaggschiff für Fulda, Künzell, Petersberg, Eichenzell und Hünfeld. Fokus auf Textil, Maschinenbau, Großhandel, Logistik und Handwerk.

**Ziel-Dateien:**

- Page: `src/app/[locale]/webdesign-fulda/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/fulda.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Fulda | High-Performance Webagentur · Coday` (52 Zeichen)
- **Description (DE):** `Webdesign & SEO für Fulda und Osthessen. Blitzschnelle Websites, B2B-Lead-Generierung für Industrie, Logistik & Handwerk. Festpreise auf Anfrage.` (147 Zeichen)

---

#### 2. GEO-SEMANTIK

- **Schwerpunkte:** Industriepark Fulda-West, Münsterfeld, Eichenzell Röhn-Logistikpark (A7 / A66). ICE-Knotenpunkt.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```
