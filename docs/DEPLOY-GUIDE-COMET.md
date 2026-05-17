# 🚀 Coday Deployment Guide – Perplexity Comet Edition

> **Zweck:** Schritt-für-Schritt-Anleitung, damit ein KI-Assistent (Perplexity Comet)
> die Live-Website `www.codayweb.de` vollständig neu deployen, Search Console aktualisieren
> und die Strato-DNS-Konfiguration validieren kann.
>
> **Zuletzt aktualisiert:** 2026-05-17 • **Version:** 2.0.0

---

## Inhaltsverzeichnis

1. [Architektur-Überblick](#1-architektur-überblick)
2. [Voraussetzungen & Zugänge](#2-voraussetzungen--zugänge)
3. [Phase 1 – Lokale Build-Validierung](#3-phase-1--lokale-build-validierung)
4. [Phase 2 – Git Push & Vercel Deployment](#4-phase-2--git-push--vercel-deployment)
5. [Phase 3 – Strato DNS verifizieren/aktualisieren](#5-phase-3--strato-dns-verifizierenaktualisieren)
6. [Phase 4 – Google Search Console aktualisieren](#6-phase-4--google-search-console-aktualisieren)
7. [Phase 5 – Post-Deployment Verification](#7-phase-5--post-deployment-verification)
8. [Rollback-Prozedur](#8-rollback-prozedur)
9. [Referenz: Environment Variables](#9-referenz-environment-variables)
10. [Referenz: DNS-Records](#10-referenz-dns-records)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Architektur-Überblick

```
┌─────────────────────────────────────────────────────────────┐
│                     INFRASTRUKTUR                           │
│                                                             │
│  GitHub Repo ──push──▶ Vercel (Build + Hosting)             │
│  umutcantezgel-cpu/Coday        │                           │
│                                 ├── SSR via @vercel/react-router │
│                                 ├── Serverless API Routes   │
│                                 ├── Edge Network (CDN)      │
│                                 └── BotID Protection        │
│                                                             │
│  Strato ──DNS──▶ Vercel Edge Network                        │
│  codayweb.de        A     → 76.76.21.21                     │
│                     CNAME → cname.vercel-dns.com             │
│                                                             │
│  Google Search Console ◀── Sitemap Index                    │
│  Property: www.codayweb.de      18 Sub-Sitemaps             │
│  Verification: qkqa8A5TESjhVg1kESd65TRfn9HBiSMrMnNBTXAoOko │
└─────────────────────────────────────────────────────────────┘
```

| Komponente       | Technologie           | Version   |
| ---------------- | --------------------- | --------- |
| Framework        | React Router v7 (SSR) | `^7.13.0` |
| Build Tool       | Vite                  | `^6.2.0`  |
| Hosting          | Vercel (vercelPreset) | —         |
| Domain Registrar | Strato                | —         |
| Sprachen         | DE (default) / EN     | i18next   |
| Node.js          | `>=20.0.0`            | —         |

---

## 2. Voraussetzungen & Zugänge

Bevor du startest, stelle sicher, dass folgende Zugänge verfügbar sind:

### 2.1 Benötigte Accounts

| Dienst                    | URL                                | Benötigt für                        |
| ------------------------- | ---------------------------------- | ----------------------------------- |
| **GitHub**                | github.com/umutcantezgel-cpu/Coday | Source Code & CI/CD Trigger         |
| **Vercel**                | vercel.com/dashboard               | Hosting, Deployment, Env Vars       |
| **Strato**                | strato.de/apps/CustomerService     | DNS-Records für codayweb.de         |
| **Google Search Console** | search.google.com/search-console   | SEO-Indexierung & Sitemap           |
| **Supabase**              | supabase.com/dashboard             | Datenbank (Leads, Analyses)         |
| **Resend**                | resend.com                         | E-Mail-Versand (Lead-Notifications) |

### 2.2 Lokale Werkzeuge

```bash
# Prüfe Node.js Version (muss >=20 sein)
node -v

# Prüfe npm
npm -v

# Prüfe Git
git --version
```

---

## 3. Phase 1 – Lokale Build-Validierung

> **Ziel:** Sicherstellen, dass der Build fehlerfrei durchläuft, BEVOR ein Deployment getriggert wird.

### Schritt 1.1 – Repository klonen / aktualisieren

```bash
# Falls noch nicht geklont:
git clone https://github.com/umutcantezgel-cpu/Coday.git
cd Coday

# Falls bereits geklont:
cd /Users/umurey/agency-domination
git pull origin main
```

### Schritt 1.2 – Dependencies installieren

```bash
npm install --legacy-peer-deps
```

> ⚠️ **Wichtig:** `--legacy-peer-deps` ist wegen `react-helmet-async` erforderlich.

### Schritt 1.3 – Typecheck

```bash
npm run typecheck
```

✅ Erwartetes Ergebnis: Keine Fehler.

### Schritt 1.4 – Lint

```bash
npm run lint
```

✅ Erwartetes Ergebnis: Keine Fehler (Warnungen sind akzeptabel).

### Schritt 1.5 – Production Build

```bash
npm run build
```

✅ Erwartetes Ergebnis: `Exit code: 0`. Der Build erzeugt das `build/`-Verzeichnis mit:

- `build/client/` – Statische Assets (JS, CSS, Fonts, Images)
- `build/server/` – SSR Server Bundle

### Schritt 1.6 – Lokale Preview (optional)

```bash
npm run start
# Öffne http://localhost:3000
```

Prüfe:

- [ ] Homepage lädt korrekt
- [ ] Navigation funktioniert
- [ ] Sprachschalter DE/EN funktioniert
- [ ] Kontaktformular ist sichtbar

---

## 4. Phase 2 – Git Push & Vercel Deployment

> **Ziel:** Änderungen in den `main`-Branch pushen und das automatische Vercel-Deployment auslösen.

### Schritt 2.1 – Änderungen committen

```bash
git add -A
git commit -m "chore: production deployment $(date +%Y-%m-%d)"
```

### Schritt 2.2 – Push nach GitHub

```bash
git push origin main
```

> Vercel erkennt den Push automatisch und startet ein neues Deployment.

### Schritt 2.3 – Deployment auf Vercel überwachen

1. Öffne **https://vercel.com/dashboard**
2. Wähle das Projekt **Coday** (bzw. den Projektnamen)
3. Klicke auf das **aktive Deployment** (Status: `Building...`)
4. Warte, bis der Status auf **✅ Ready** wechselt (~2–4 Minuten)

### Schritt 2.4 – Vercel Build-Einstellungen prüfen

Falls das Projekt NEU aufgesetzt wird, stelle sicher:

| Einstellung          | Wert                             |
| -------------------- | -------------------------------- |
| **Framework Preset** | `Other` (oder `Vite`)            |
| **Build Command**    | `npm run build`                  |
| **Output Directory** | `build`                          |
| **Install Command**  | `npm install --legacy-peer-deps` |
| **Node.js Version**  | `20.x`                           |

### Schritt 2.5 – Environment Variables auf Vercel setzen

Navigiere zu: **Project Settings → Environment Variables**

Setze folgende Variablen für **Production**, **Preview** und **Development**:

| Variable                   | Typ       | Pflicht     |
| -------------------------- | --------- | ----------- |
| `VITE_SUPABASE_URL`        | Plaintext | ✅          |
| `VITE_SUPABASE_ANON_KEY`   | Secret    | ✅          |
| `RESEND_API_KEY`           | Secret    | ✅          |
| `VITE_GOOGLE_MAPS_API_KEY` | Secret    | ⚡ Optional |
| `VITE_GEMINI_API_KEY`      | Secret    | ⚡ Optional |
| `VITE_PERPLEXITY_API_KEY`  | Secret    | ⚡ Optional |
| `VITE_SENTRY_DSN`          | Plaintext | ⚡ Optional |
| `VITE_GA_MEASUREMENT_ID`   | Plaintext | ⚡ Optional |

> 🔑 **Quellen für die Keys:**
>
> - Supabase: https://supabase.com/dashboard → Project Settings → API
> - Resend: https://resend.com/api-keys
> - Google Maps: https://console.cloud.google.com/apis/credentials
> - Gemini: https://aistudio.google.com/apikey
> - Sentry: https://sentry.io → Project Settings → Client Keys (DSN)

### Schritt 2.6 – Custom Domain verifizieren

Navigiere zu: **Project Settings → Domains**

Stelle sicher, dass folgende Domains konfiguriert sind:

| Domain            | Typ                          | Status                 |
| ----------------- | ---------------------------- | ---------------------- |
| `www.codayweb.de` | Primary                      | ✅ Valid Configuration |
| `codayweb.de`     | Redirect → `www.codayweb.de` | ✅ Valid Configuration |

> Die `vercel.json` enthält bereits die 301-Redirect-Regel von `codayweb.de` → `www.codayweb.de`.

### Schritt 2.7 – Vercel Firewall / BotID aktivieren

1. Navigiere zu: **Project → Firewall → Rules**
2. Aktiviere **Vercel BotID Deep Analysis**
3. Die Client-seitige Integration ist bereits in `entry.client.tsx` über `initBotId()` konfiguriert
4. Der Server-seitige Check erfolgt in `api.send-lead.ts` via `checkBotId()`

---

## 5. Phase 3 – Strato DNS verifizieren/aktualisieren

> **Ziel:** Sicherstellen, dass die DNS-Records bei Strato korrekt auf Vercel zeigen.

### Schritt 3.1 – Strato Kundenbereich öffnen

1. Öffne **https://www.strato.de/apps/CustomerService**
2. Login mit den Zugangsdaten für `codayweb.de`
3. Navigiere zu: **Domains → DNS-Verwaltung → codayweb.de**

### Schritt 3.2 – DNS-Records prüfen/setzen

Stelle sicher, dass **exakt** folgende Records gesetzt sind:

| Typ       | Name            | Wert                   | TTL |
| --------- | --------------- | ---------------------- | --- |
| **A**     | `@` (oder leer) | `76.76.21.21`          | 300 |
| **CNAME** | `www`           | `cname.vercel-dns.com` | 300 |

> ⚠️ **Wichtig:**
>
> - Lösche eventuell vorhandene alte A-Records, die auf andere IPs zeigen
> - Lösche eventuell vorhandene AAAA-Records, die nicht von Vercel stammen
> - Der CNAME für `www` darf NICHT auf eine andere Subdomain zeigen

### Schritt 3.3 – DNS-Propagation prüfen

Warte 5–15 Minuten, dann prüfe:

```bash
# A-Record prüfen
dig codayweb.de +short
# Erwartete Ausgabe: 76.76.21.21

# CNAME prüfen
dig www.codayweb.de +short
# Erwartete Ausgabe: cname.vercel-dns.com. → dann die Vercel-IPs

# HTTPS prüfen
curl -I https://www.codayweb.de
# Erwarteter Status: HTTP/2 200
```

### Schritt 3.4 – SSL/TLS verifizieren

Vercel stellt automatisch ein SSL-Zertifikat bereit. Prüfe:

```bash
echo | openssl s_client -connect www.codayweb.de:443 -servername www.codayweb.de 2>/dev/null | openssl x509 -noout -dates
# Erwartete Ausgabe: Gültigkeitsdaten des Zertifikats
```

### Schritt 3.5 – E-Mail DNS-Records (falls vorhanden)

Falls Strato auch E-Mails für `codayweb.de` verwaltet, stelle sicher, dass diese Records unberührt bleiben:

| Typ | Name | Wert                               |
| --- | ---- | ---------------------------------- |
| MX  | `@`  | (Strato-Mailserver, nicht ändern!) |
| TXT | `@`  | SPF-Record (nicht ändern!)         |

> 🛑 **FINGER WEG von MX- und TXT-Records**, es sei denn, du weißt genau, was du tust.

---

## 6. Phase 4 – Google Search Console aktualisieren

> **Ziel:** Sitemap neu einreichen, Indexierung anstoßen und Crawl-Fehler prüfen.

### Schritt 6.1 – Search Console öffnen

1. Öffne **https://search.google.com/search-console**
2. Wähle Property: **`https://www.codayweb.de`**

> Falls die Property noch nicht existiert:
>
> - Klicke auf „Property hinzufügen"
> - Wähle „URL-Präfix" → `https://www.codayweb.de`
> - Verifizierung erfolgt automatisch via HTML-Meta-Tag:
>   ```html
>   <meta name="google-site-verification" content="qkqa8A5TESjhVg1kESd65TRfn9HBiSMrMnNBTXAoOko" />
>   ```
>   (Bereits in `src/shared/ui/SeoHead.tsx` eingebaut)

### Schritt 6.2 – Alte Sitemaps entfernen

1. Navigiere zu: **Sitemaps** (linke Sidebar)
2. Prüfe die Liste der eingereichten Sitemaps
3. Falls veraltete Sitemaps vorhanden: **Entferne sie**

### Schritt 6.3 – Aktuelle Sitemap einreichen

Reiche die **Sitemap-Index-Datei** ein:

```
https://www.codayweb.de/sitemap.xml
```

Diese enthält automatisch Verweise auf alle 18 Sub-Sitemaps:

| Sub-Sitemap                | Inhalt                                    |
| -------------------------- | ----------------------------------------- |
| `sitemap-pages.xml`        | Haupt-Seiten (Home, About, Contact, etc.) |
| `sitemap-services.xml`     | Service-Seiten                            |
| `sitemap-blog.xml`         | Blog-Artikel                              |
| `sitemap-wiki.xml`         | Wissensartikel                            |
| `sitemap-cities.xml`       | Lokale Landingpages                       |
| `sitemap-cases.xml`        | Case Studies                              |
| `sitemap-legal.xml`        | Rechtliche Seiten                         |
| `sitemap-core.xml`         | Kern-Seiten                               |
| `sitemap-ai-kosten.xml`    | AI-Kosten-Seiten                          |
| `sitemap-ai-triples.xml`   | AI-Triple-Seiten                          |
| `sitemap-ai-usecases.xml`  | AI-Use-Case-Seiten                        |
| `sitemap-ai-processes.xml` | AI-Prozess-Seiten                         |
| `sitemap-ai-personas.xml`  | AI-Persona-Seiten                         |
| `sitemap-ai-pricing.xml`   | AI-Pricing-Seiten                         |
| `sitemap-ai-positions.xml` | AI-Positions-Seiten                       |
| `sitemap-ai-reviews.xml`   | AI-Review-Seiten                          |
| `sitemap-ai-data.xml`      | AI-Daten-Seiten                           |

### Schritt 6.4 – URL-Überprüfung für kritische Seiten

Nutze das Tool **URL-Überprüfung** (oben in der Suchleiste), um die Indexierung folgender Seiten manuell anzustoßen:

```
https://www.codayweb.de/de
https://www.codayweb.de/en
https://www.codayweb.de/de/services
https://www.codayweb.de/de/contact
https://www.codayweb.de/de/about
https://www.codayweb.de/de/work
```

Für jede URL:

1. URL eingeben → „Enter"
2. Ergebnis prüfen (ggf. „Indexierung beantragen" klicken)

### Schritt 6.5 – Crawl-Fehler prüfen

1. Navigiere zu: **Seiten** (linke Sidebar)
2. Prüfe den Tab „Warum Seiten nicht indexiert werden"
3. Häufige Probleme und Lösungen:

| Fehler                       | Lösung                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------- |
| „Durch robots.txt blockiert" | Prüfe `public/robots.txt` – `/api/` und `/dashboard/` sind absichtlich blockiert |
| „Seite mit Weiterleitung"    | 301 von `codayweb.de` → `www.codayweb.de` ist beabsichtigt                       |
| „Nicht gefunden (404)"       | Prüfe ob die Route im Code existiert                                             |
| „noindex-Tag erkannt"        | Prüfe ob `noIndex={true}` in SeoHead gesetzt wurde                               |

### Schritt 6.6 – robots.txt validieren

1. Navigiere zu: **Einstellungen → robots.txt-Tester** (falls verfügbar)
2. Oder prüfe manuell: `https://www.codayweb.de/robots.txt`

Aktuelle Konfiguration:

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /dashboard/
Disallow: /preview/

# AI-Crawler explizit erlaubt
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://www.codayweb.de/sitemap.xml
Sitemap: https://www.codayweb.de/llms.txt
Sitemap: https://www.codayweb.de/ai.txt
```

### Schritt 6.7 – IndexNow anstoßen (optional)

Falls das IndexNow-Script verfügbar ist:

```bash
npm run ping:indexnow
```

> Nutzt den Schlüssel `codayweb-indexnow-key-4a2b9c8d` (verifiziert über `public/codayweb-indexnow-key-4a2b9c8d.txt`).

---

## 7. Phase 5 – Post-Deployment Verification

> **Ziel:** Sicherstellen, dass die Live-Website voll funktionsfähig ist.

### Schritt 7.1 – Funktionale Tests

Öffne `https://www.codayweb.de` und prüfe:

| Test           | URL                   | Erwartung                              |
| -------------- | --------------------- | -------------------------------------- |
| Homepage DE    | `/de`                 | Lädt, Hero-Sektion sichtbar            |
| Homepage EN    | `/en`                 | Englische Version korrekt              |
| Services-Seite | `/de/services`        | Alle Service-Karten sichtbar           |
| Kontakt        | `/de/contact`         | Formular sichtbar und abschickbar      |
| About          | `/de/about`           | Team-Sektion, Vision sichtbar          |
| Work/Portfolio | `/de/work`            | Case Studies laden                     |
| Blog           | `/de/blog`            | Blog-Übersicht mit Artikeln            |
| Careers        | `/de/careers`         | Job-Listings sichtbar                  |
| Impressum      | `/de/legal/impressum` | Steuernummer `039 874 00784` vorhanden |
| Datenschutz    | `/de/legal/privacy`   | DSGVO-Text vollständig                 |

### Schritt 7.2 – Performance-Audit

```bash
# Lighthouse CLI (optional)
npx lighthouse https://www.codayweb.de/de --output=json --chrome-flags="--headless"
```

**Zielwerte:**

| Metrik         | Ziel |
| -------------- | ---- |
| Performance    | > 90 |
| Accessibility  | > 95 |
| Best Practices | > 90 |
| SEO            | > 95 |

### Schritt 7.3 – Security Headers prüfen

1. Öffne **https://securityheaders.com**
2. Gib `https://www.codayweb.de` ein
3. **Erwartete Note: A oder A+**

Geprüfte Header (via `vercel.json`):

- `Strict-Transport-Security` (HSTS, 2 Jahre)
- `Content-Security-Policy` (CSP)
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (Kamera/Mikrofon/Geo deaktiviert)
- `Cross-Origin-Opener-Policy: same-origin`

### Schritt 7.4 – HTTPS-Redirect prüfen

```bash
curl -I http://codayweb.de
# Erwartung: 301 → https://www.codayweb.de/

curl -I https://codayweb.de
# Erwartung: 308 → https://www.codayweb.de/
```

### Schritt 7.5 – API-Routen testen

```bash
# /api/send-lead (BotID-geschützt – erwartet 403 von curl)
curl -X POST https://www.codayweb.de/api/send-lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.de"}'
# Erwartung: 403 (Bot detected) – das ist KORREKT, da curl kein BotID-Token sendet

# llms.txt
curl -s https://www.codayweb.de/llms.txt | head -5
# Erwartung: Textinhalt der llms.txt Datei

# Sitemap
curl -s https://www.codayweb.de/sitemap.xml | head -10
# Erwartung: XML-Sitemap-Index
```

---

## 8. Rollback-Prozedur

Falls nach dem Deployment Probleme auftreten:

### Option A: Vercel Instant Rollback (empfohlen)

1. Öffne **Vercel Dashboard → Deployments**
2. Finde das **letzte funktionierende Deployment**
3. Klicke auf **„…" → „Promote to Production"**
4. Die Website wird sofort auf den vorherigen Stand zurückgesetzt

### Option B: Git Revert

```bash
# Letzten Commit rückgängig machen
git revert HEAD
git push origin main
# Vercel baut automatisch neu
```

---

## 9. Referenz: Environment Variables

Vollständige Liste aller Environment Variables:

```env
# ══════════════════════════════════════════
# REQUIRED
# ══════════════════════════════════════════
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
RESEND_API_KEY=re_xxxxxxxx

# ══════════════════════════════════════════
# OPTIONAL (aber empfohlen)
# ══════════════════════════════════════════
VITE_GOOGLE_MAPS_API_KEY=AIzaSy...
VITE_GEMINI_API_KEY=AIzaSy...
VITE_PERPLEXITY_API_KEY=pplx-...
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> **Konvention:** `VITE_`-Prefix = Client-seitig verfügbar. Ohne Prefix = nur Server-seitig.

---

## 10. Referenz: DNS-Records

### Strato DNS für codayweb.de → Vercel

```
┌──────────┬──────────┬──────────────────────────┬──────┐
│ Typ      │ Name     │ Wert                     │ TTL  │
├──────────┼──────────┼──────────────────────────┼──────┤
│ A        │ @        │ 76.76.21.21              │ 300  │
│ CNAME    │ www      │ cname.vercel-dns.com     │ 300  │
├──────────┼──────────┼──────────────────────────┼──────┤
│ MX       │ @        │ (Strato – NICHT ÄNDERN)  │ —    │
│ TXT      │ @        │ SPF (NICHT ÄNDERN)       │ —    │
└──────────┴──────────┴──────────────────────────┴──────┘
```

---

## 11. Troubleshooting

### Build schlägt fehl: Peer Dependency Error

```bash
# Lösung: --legacy-peer-deps Flag verwenden
npm install --legacy-peer-deps
```

### Build schlägt fehl: MISSING_EXPORT

```
Error: "clientLogos" is not exported by "src/widgets/home/LogoBarSection.tsx"
```

**Lösung:** Sicherstellen, dass alle Imports von `clientLogos` aus `@/shared/data/clientLogos` kommen, NICHT aus Widget-Dateien.

### 404 auf Seitenrefresh

Sollte nicht auftreten, da SSR via `react-router.config.ts` aktiv ist:

```ts
export default { ssr: true, presets: [vercelPreset()] };
```

### DNS zeigt auf alten Server

```bash
# DNS-Cache leeren (macOS)
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Propagation prüfen
dig www.codayweb.de +trace
```

### Search Console: „Seite nicht indexierbar"

1. Prüfe, ob `noIndex={true}` in `SeoHead.tsx` gesetzt ist
2. Prüfe `robots.txt` – `/api/` und `/dashboard/` sind gewollt blockiert
3. Prüfe, ob die Seite einen 200-Status zurückgibt

### Vercel: Domain nicht verifiziert

1. Gehe zu Vercel → Project Settings → Domains
2. Prüfe, ob DNS-Records korrekt auf Vercel zeigen
3. Klicke auf „Refresh" neben der Domain
4. Warte bis das SSL-Zertifikat erneuert wurde

---

> **Kontakt bei Problemen:** umut@codayweb.de
