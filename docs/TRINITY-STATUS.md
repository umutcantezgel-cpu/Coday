# TRINITY STATUS: OPERATIVES MASTERDOSSIER

## ZIEL: Vollständige Google-Dominanz für codayweb.de in Wetzlar, Mittelhessen und Hessen

---

## PHASE 0: LOS ALAMOS (Bestandsaufnahme & Audit) - ABGESCHLOSSEN

### 1. Codebasis-Audit (Inventar)

- **Routen/Pages (`src/app/[locale]/`)**: about, analyzer, angebot-handwerker, booking, branchen, calculator, career, community, contact, dashboard, garantie, industries, knowledge, landingpages, legal, pricing, privacy, process, providers, services, standorte, webdesign-agentur-wetzlar, work.
- **Layouts**:
  - `src/app/layout.tsx` (Global)
  - `src/app/[locale]/layout.tsx` (Locale-spezifisch, setzt `<html lang={locale}>`, lädt Fonts & JSON-LD).
- **Metadata**: Zentralisiert in `src/lib/metadata.ts`. Generiert Titles, Descriptions, Robots-Tags und Alternates (hreflang).
- **Robots/Sitemap**:
  - `src/app/robots.ts` erlaubt `/` für reguläre & KI-Bots.
  - `src/app/sitemap.ts` generiert statische & dynamische Routen (Sanity-Anbindung) inkl. `de` und `en` Alternates.
- **Sprachrouting (i18n)**: `next-intl` via `middleware.ts`. `/de` und `/en` werden unterstützt.
- **JSON-LD Schema**: Vorhanden in `src/lib/schema.ts`. `[locale]/layout.tsx` injiziert `Organization` und `ProfessionalService` global.

### 2. Blocker-Diagnose (Priorisierte Fehlerliste)

1. **Robots / noindex-Problem**:
   - `src/lib/metadata.ts` setzt standardmäßig alles auf `noindex`, falls `NEXT_PUBLIC_VERCEL_ENV !== 'production'`. Dies kann dazu führen, dass Vercel-Preview-Deployments oder falsch konfigurierte Prod-Deployments komplett deindexiert werden.
   - Auf Code-Ebene sind `about` und `webdesign-agentur-wetzlar` korrekt als `type: 'money'` klassifiziert (sollten indexiert werden). Wir müssen sicherstellen, dass sie im Prod-Build immer `index: true` erhalten.
2. **Sprachproblem (/en/ rankt in DE)**:
   - `generateAlternates` in `metadata.ts` und `sitemapEntry` in `sitemap.ts` generieren standardmäßig für jede Route englische hreflang- und Sitemap-Einträge. Wenn englische Seiten in deutschen SERPs ranken, verwässert das die Relevanz.
   - **Empfehlung**: Falls der englische Markt momentan irrelevant ist, sollten wir die `/en/`-Routen in der Sitemap und den Alternates komplett entfernen und alle Anfragen auf `/en/*` per 301-Redirect in der Middleware auf `/de/*` umleiten (oder zumindest canonicals auf die `/de/`-Version setzen und `noindex` für `/en/` vergeben).
3. **LocalBusiness / ProfessionalService Schema**:
   - `getProfessionalServiceSchema()` in `schema.ts` fehlen wichtige lokale Attribute: `geo`-Koordinaten, `openingHours`, und `foundingDate`. Die angegebene Preis-Range ist `€€€`.
   - Die `areaServed` Liste enthält Wetzlar, Lahn-Dill, Hessen etc., kann aber um den restlichen Zielraum ergänzt werden.
4. **Sitemap & Robots**:
   - `sitemap.ts` ist weitgehend vollständig, muss aber um die neuen Landingpages für Städte und Branchen (Phase 3) erweitert werden.

---

## AKTUELLES GATE: GATE 0

Statusbericht erstellt. Warte auf Freigabe zur Einleitung von **PHASE 1 (MANHATTAN)**.

---

## NÄCHSTE SCHRITTE (PHASE 1)

- [ ] `noindex` Sicherheit erhöhen (explizites Indexieren von SEO/Über-Uns Seiten).
- [ ] Sprachproblem beheben: Hreflangs optimieren, Canonical-Tags strikt setzen, Empfehlung bzgl. 301 umsetzen.
- [ ] Schema.org: `ProfessionalService` mit `geo`, `openingHours`, `foundingDate` anreichern.
- [ ] `sitemap.ts` & `robots.ts` bereinigen.
