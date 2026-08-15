# Cluster 4: Die 13 Hessischen Landkreis-Hubs — Master Execution Prompts

Dieses Dokument enthält die vollständigen, copy-paste-fähigen Master-Prompts für alle 13 hessischen Kreis-Silos (`/regionen/...`). Jeder Kreis fungiert als autoritativer Silo-Hub für alle darin liegenden Städte und Gemeinden.

---

## 1. Lahn-Dill-Kreis (Agentur-Heimatkreis) — `/regionen/landkreis-lahn-dill`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB LAHN-DILL-KREIS

**Ziel:** Master-Kreis-Hub für den gesamten Lahn-Dill-Kreis (Wetzlar, Herborn, Dillenburg, Haiger, Braunfels, Solms, Aßlar, Ehringshausen, Sinn, Mittenaar, Dietzhölztal, Eschenburg, Lahnau, Schöffengrund, Waldsolms, Hüttenberg, Siegbach, Bischoffen, Driedorf, Breitscheid, Greifenstein).

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/landkreis-lahn-dill/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/landkreis-lahn-dill.json`

---

#### 1. METADATEN & SCHEMA.ORG

- **Title (DE):** `Webdesign Lahn-Dill-Kreis | Regionale Webagentur · Coday` (55 Zeichen)
- **Description (DE):** `Ihre lokale Webagentur für den Lahn-Dill-Kreis. High-Performance Websites & SEO für Mittelstand & Handwerk in Wetzlar, Herborn & Dillenburg. Festpreise.` (154 Zeichen)
- **Schema.org:** `LocalBusiness`, `ProfessionalService`, `BreadcrumbList`, `FAQPage`. `areaServed: ['Wetzlar', 'Herborn', 'Dillenburg', 'Haiger', 'Braunfels', 'Solms', 'Aßlar', 'Lahn-Dill-Kreis']`.

---

#### 2. KREIS-SILO FEATURES & NAVIGATOR

- **Interaktiver Städte-Navigator:** Direktverlinkung aller kreisangehörigen Städte und Gemeinden.
- **Wirtschafts-DNA:** Optikzentrum Wetzlar, Schaltschrankbau & Werkzeugmacher im Dilltal, Handwerk an der Lahn.
- **Paritäts-Module:** Hero mit `QuickContactForm`, `TrustBar` (Batherm Wetzlar), Stats Bento, WordPress-Vergleich, FAQ Accordion.

---

#### 3. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 2. Landkreis Gießen — `/regionen/landkreis-giessen`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB LANDKREIS GIESSEN

**Ziel:** Kreis-Hub für Gießen, Linden, Pohlheim, Buseck, Reiskirchen, Grünberg, Hungen, Laubach, Lich, Allendorf (Lumda), Staufenberg, Lollar, Wettenberg, Heuchelheim, Biebertal, Fernwald, Rabenau.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/landkreis-giessen/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/landkreis-giessen.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Landkreis Gießen | B2B & Praxen Webagentur · Coday` (58 Zeichen)
- **Description (DE):** `Webdesign im Landkreis Gießen. Ultraschnelle Websites für Praxen, Handwerk & Mittelstand in Linden, Pohlheim, Lich & Grünberg. Festpreise auf Anfrage.` (152 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 3. Wetteraukreis — `/regionen/wetteraukreis`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB WETTERAUKREIS

**Ziel:** Kreis-Hub für Friedberg, Bad Nauheim, Butzbach, Karben, Büdingen, Nidda, Rosbach v. d. H., Altenstadt, Wölfersheim, Florstadt, Münzenberg, Rockenberg, Reichelsheim, Gedern, Ortenberg, Ranstadt, Glauburg, Hirzenhain, Limeshain, Ober-Mörlen.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/wetteraukreis/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/wetteraukreis.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Wetteraukreis | Webagentur & SEO · Coday` (49 Zeichen)
- **Description (DE):** `Webentwicklung & SEO für den Wetteraukreis. Performante Next.js Websites für Friedberg, Bad Nauheim, Butzbach & Karben. Verbindliche Festpreise auf Anfrage.` (159 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 4. Hochtaunuskreis — `/regionen/hochtaunuskreis`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB HOCHTAUNUSKREIS

**Ziel:** Kreis-Hub für Bad Homburg, Oberursel, Friedrichsdorf, Kronberg, Königstein, Usingen, Neu-Anspach, Wehrheim, Schmitten, Glashütten, Grävenwiesbach, Weilrod.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/hochtaunuskreis/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/hochtaunuskreis.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Hochtaunuskreis | Premium Webagentur · Coday` (53 Zeichen)
- **Description (DE):** `Exklusives Webdesign für den Hochtaunuskreis. High-Performance Websites & diskreter Service für Bad Homburg, Oberursel & Kronberg. Festpreis auf Anfrage.` (155 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 5. Main-Taunus-Kreis — `/regionen/main-taunus-kreis`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB MAIN-TAUNUS-KREIS

**Ziel:** Kreis-Hub für Hofheim, Bad Soden, Eschborn, Kelkheim, Flörsheim, Hattersheim, Schwalbach, Kriftel, Hochheim, Eppstein, Liederbach, Sulzbach.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/main-taunus-kreis/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/main-taunus-kreis.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Main-Taunus-Kreis | B2B Agentur MTK · Coday` (52 Zeichen)
- **Description (DE):** `Webdesign & Webentwicklung im Main-Taunus-Kreis. Next.js Websites für Hofheim, Eschborn, Bad Soden & Kelkheim. Schnelle Ladezeiten & Festpreise auf Anfrage.` (158 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 6. Kreis Offenbach — `/regionen/kreis-offenbach`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB KREIS OFFENBACH

**Ziel:** Kreis-Hub für Rodgau, Dietzenbach, Dreieich, Neu-Isenburg, Langen, Rödermark, Seligenstadt, Obertshausen, Mühlheim, Heusenstamm, Egelsbach, Mainhausen, Hainburg.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/kreis-offenbach/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/kreis-offenbach.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Kreis Offenbach | Webagentur & SEO · Coday` (51 Zeichen)
- **Description (DE):** `Professionelles Webdesign im Kreis Offenbach. Ultraschnelle Websites für Rodgau, Dietzenbach, Dreieich & Neu-Isenburg. Verbindlicher Festpreis auf Anfrage.` (158 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 7. Main-Kinzig-Kreis — `/regionen/main-kinzig-kreis`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB MAIN-KINZIG-KREIS

**Ziel:** Kreis-Hub für Hanau, Maintal, Gelnhausen, Bruchköbel, Nidderau, Schlüchtern, Langenselbold, Freigericht, Rodenbach, Bad Orb, Schöneck, Wächtersbach, Biebergemünd.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/main-kinzig-kreis/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/main-kinzig-kreis.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Main-Kinzig-Kreis | B2B Webagentur MKK · Coday` (55 Zeichen)
- **Description (DE):** `Webentwicklung & SEO für den Main-Kinzig-Kreis. Next.js Websites für Industrie & Mittelstand in Hanau, Maintal & Gelnhausen. Festpreise auf Anfrage.` (151 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 8. Landkreis Marburg-Biedenkopf — `/regionen/landkreis-marburg-biedenkopf`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB LANDKREIS MARBURG-BIEDENKOPF

**Ziel:** Kreis-Hub für Marburg, Biedenkopf, Gladenbach, Stadtallendorf, Kirchhain, Neustadt, Wetter, Dautphetal, Cölbe, Ebsdorfergrund, Lahntal, Steffenberg, Weimar.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/landkreis-marburg-biedenkopf/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/landkreis-marburg-biedenkopf.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Landkreis Marburg-Biedenkopf | Agentur · Coday` (56 Zeichen)
- **Description (DE):** `Webdesign im Landkreis Marburg-Biedenkopf. Performante Websites für Pharma, Handwerk & Mittelstand in Marburg, Biedenkopf & Gladenbach. Festpreis.` (147 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 9. Landkreis Limburg-Weilburg — `/regionen/landkreis-limburg-weilburg`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB LANDKREIS LIMBURG-WEILBURG

**Ziel:** Kreis-Hub für Limburg, Weilburg, Bad Camberg, Hadamar, Runkel, Elz, Hünfelden, Brechen, Villmar, Beselich, Löhnberg, Merenberg, Weilmünster, Weinbach, Waldbrunn.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/landkreis-limburg-weilburg/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/landkreis-limburg-weilburg.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Landkreis Limburg-Weilburg | Agentur · Coday` (54 Zeichen)
- **Description (DE):** `Webagentur für den Landkreis Limburg-Weilburg. Next.js Websites & SEO für Limburg, Weilburg, Bad Camberg & das Lahntal. Festpreise auf Anfrage.` (144 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 10. Rheingau-Taunus-Kreis — `/regionen/rheingau-taunus-kreis`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB RHEINGAU-TAUNUS-KREIS

**Ziel:** Kreis-Hub für Taunusstein, Idstein, Eltville, Rüdesheim, Geisenheim, Bad Schwalbach, Oestrich-Winkel, Walluf, Hünstetten, Hohenstein, Aarbergen, Lorch, Heidenrod.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/rheingau-taunus-kreis/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/rheingau-taunus-kreis.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Rheingau-Taunus-Kreis | Webagentur · Coday` (51 Zeichen)
- **Description (DE):** `Webdesign & SEO im Rheingau-Taunus-Kreis. Hochwertige Websites für Weinbau, Tourismus & Dienstleister in Taunusstein, Idstein & Eltville. Festpreis.` (150 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 11. Landkreis Darmstadt-Dieburg — `/regionen/landkreis-darmstadt-dieburg`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB LANDKREIS DARMSTADT-DIEBURG

**Ziel:** Kreis-Hub für Weiterstadt, Griesheim, Pfungstadt, Dieburg, Groß-Umstadt, Reinheim, Babenhausen, Seeheim-Jugenheim, Roßdorf, Münster, Alsbach-Hähnlein, Schaafheim.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/landkreis-darmstadt-dieburg/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/landkreis-darmstadt-dieburg.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Landkreis Darmstadt-Dieburg | Agentur · Coday` (55 Zeichen)
- **Description (DE):** `Ihre Webagentur für Darmstadt-Dieburg. Schnelle Next.js Websites für Weiterstadt, Griesheim, Dieburg & Groß-Umstadt. Festpreise auf Anfrage.` (141 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 12. Landkreis Fulda — `/regionen/landkreis-fulda`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB LANDKREIS FULDA

**Ziel:** Kreis-Hub für Fulda, Künzell, Petersberg, Hünfeld, Eichenzell, Flieden, Neuhof, Großenlüder, Eiterfeld, Gersfeld, Tann, Hilders, Hofbieber, Kalbach.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/landkreis-fulda/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/landkreis-fulda.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Landkreis Fulda | B2B & SEO Agentur · Coday` (52 Zeichen)
- **Description (DE):** `Webentwicklung & Webdesign für den Landkreis Fulda & Osthessen. Performante Plattformen für Logistik, Handwerk & Industrie. Festpreis auf Anfrage.` (149 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```

---

## 13. Landkreis Kassel — `/regionen/landkreis-kassel`

```markdown
### AGENT EXECUTION PROMPT: DISTRICT HUB LANDKREIS KASSEL

**Ziel:** Kreis-Hub für Baunatal, Vellmar, Hofgeismar, Wolfhagen, Kaufungen, Schauenburg, Fuldatal, Lohfelden, Habichtswald, Zierenberg, Naumburg, Immenhausen.

**Ziel-Dateien:**

- Page: `src/app/[locale]/regionen/landkreis-kassel/page.tsx`
- Content-Modell: `src/features/local-seo/model/content/landkreis-kassel.json`

---

#### 1. METADATEN

- **Title (DE):** `Webdesign Landkreis Kassel | Webagentur Nordhessen · Coday` (58 Zeichen)
- **Description (DE):** `Professionelles Webdesign im Landkreis Kassel. Next.js Websites für Baunatal, Vellmar & Hofgeismar. Schnelle Ladezeiten & Festpreise auf Anfrage.` (145 Zeichen)

---

#### 2. QA & BUILD

- `npm run typecheck && npm run lint && npm run build`
```
