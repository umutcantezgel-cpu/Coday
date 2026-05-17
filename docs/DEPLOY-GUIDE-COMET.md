# 🚀 Coday Deployment & SEO Guide – Perplexity (Comet) Edition

> **Zweck:** Detaillierte Schritt-für-Schritt-Anleitung für den KI-Assistenten (Perplexity Comet), um die Live-Website `www.codayweb.de` von Grund auf neu zu deployen, Vercel-Optimierungen vorzunehmen, die Strato-DNS-Konfiguration zu validieren und die Top 10 Pages in der Google Search Console zu indexieren.
>
> **Zuletzt aktualisiert:** 2026-05-17 • **Version:** 3.0.0 (CLI-Deployment Update)

---

## Inhaltsverzeichnis

1. [Architektur & Hosting-Paradigma](#1-architektur--hosting-paradigma)
2. [Phase 1 – Lokaler Build & Vercel CLI Deployment](#2-phase-1--lokaler-build--vercel-cli-deployment)
3. [Phase 2 – Vercel Optimierung & Konfiguration](#3-phase-2--vercel-optimierung--konfiguration)
4. [Phase 3 – Strato DNS Update & Validierung](#4-phase-3--strato-dns-update--validierung)
5. [Phase 4 – Google Search Console (Top 10 Indexing)](#5-phase-4--google-search-console-top-10-indexing)
6. [Troubleshooting & Rollback](#6-troubleshooting--rollback)

---

## 1. Architektur & Hosting-Paradigma

Aufgrund von Limitierungen im Vercel Hobby-Plan (keine Collaboration für private GitHub-Repos) ist das Projekt in Vercel **von GitHub entkoppelt**.
Deployments erfolgen **nicht** mehr durch einen einfachen Git Push! Stattdessen wird die Vercel CLI (`npx vercel --prod`) verwendet. Dies umgeht alle Account-Limitierungen und garantiert ein stabiles Deployment.

```text
┌─────────────────────────────────────────────────────────────┐
│                     INFRASTRUKTUR                           │
│                                                             │
│  Lokal (Comet Agent) ──Vercel CLI──▶ Vercel (Hosting)       │
│  $ npx vercel --prod                 │                      │
│                                      ├── SSR (React Router) │
│                                      ├── Vercel Edge Cache  │
│                                      └── BotID Protection   │
│                                                             │
│  Strato ──DNS──▶ Vercel Edge Network                        │
│  codayweb.de        A     → 76.76.21.21                     │
│                     CNAME → cname.vercel-dns.com             │
│                                                             │
│  Google Search Console ◀── Sitemap Index + Manuelles Limit  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Phase 1 – Lokaler Build & Vercel CLI Deployment

**⚠️ WICHTIG FÜR DEN ASSISTENTEN:** Du musst die Codebase lokal vorliegen haben und dich über die Vercel CLI authentifizieren.

### Schritt 1: Code vorbereiten

```bash
npm install --legacy-peer-deps
npm run typecheck
npm run build
```

_Stelle sicher, dass der Build fehlerfrei durchläuft (Exit Code 0)._

### Schritt 2: Vercel Deployment ausführen

Führe das Deployment direkt über die CLI aus:

```bash
npx vercel --prod --yes
```

_Hinweis: Falls Vercel Zugangsdaten verlangt, muss der User sich über `npx vercel login` authentifizieren._

Warte, bis die CLI die finale Produktions-URL (`https://coday-....vercel.app`) ausgibt.

---

## 3. Phase 2 – Vercel Optimierung & Konfiguration

Damit die Website maximal performant und sicher läuft, müssen folgende Konfigurationen im Vercel Dashboard (`vercel.com/dashboard`) oder in der `vercel.json` aktiv sein:

### 3.1 Caching & Headers (via `vercel.json`)

Stelle sicher, dass die `vercel.json` im Root-Verzeichnis folgende Caching-Header für statische Assets enthält:

```json
{
  "headers": [
    {
      "source": "/build/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### 3.2 Environment Variables setzen

Gehe in Vercel zu **Settings → Environment Variables** und setze:

- `VITE_SUPABASE_URL` (Plaintext)
- `VITE_SUPABASE_ANON_KEY` (Secret)
- `RESEND_API_KEY` (Secret)

### 3.3 Security: Vercel BotID aktivieren

1. Gehe in Vercel auf **Firewall → Rules**.
2. Aktiviere die **Vercel BotID Deep Analysis**, um Spam über das Kontaktformular (`/api/send-lead`) zu blockieren.

---

## 4. Phase 3 – Strato DNS Update & Validierung

Falls die Domain `codayweb.de` noch nicht korrekt auf Vercel zeigt, muss das DNS bei Strato aktualisiert werden.

1. Login unter `strato.de/apps/CustomerService`.
2. Gehe zu **Domains → DNS-Verwaltung → codayweb.de**.
3. Setze **exakt** diese beiden Einträge:

| Typ   | Name  | Wert                   | TTL |
| ----- | ----- | ---------------------- | --- |
| A     | `@`   | `76.76.21.21`          | 300 |
| CNAME | `www` | `cname.vercel-dns.com` | 300 |

_Alle alten A-Records oder AAAA-Records müssen gelöscht werden! MX- und TXT-Records für E-Mails dürfen **nicht** verändert werden._

Testen der DNS-Verbindung:

```bash
dig codayweb.de +short
# Muss 76.76.21.21 ausgeben
```

---

## 5. Phase 4 – Google Search Console (Top 10 Indexing)

Um SEO-Rankings sofort zu pushen, muss die Google Search Console aktiv bedient werden. Das tägliche Limit für manuelles Indexieren liegt bei ca. 10-12 URLs.

### Schritt 1: Sitemaps prüfen

1. Gehe zu `search.google.com/search-console`.
2. Navigiere zu **Sitemaps**.
3. Überprüfe, ob `https://www.codayweb.de/sitemap.xml` den Status **Erfolgreich** hat.
4. Alle 18 Sub-Sitemaps müssen ebenfalls "Erfolgreich" anzeigen.

### Schritt 2: Die Top 10 Pages manuell pushen

Kopiere die folgenden 10 wichtigsten URLs einzeln in die Suchleiste der Search Console (URL-Prüfung) und klicke jedes Mal auf **Indexierung beantragen**:

1. `https://www.codayweb.de/de` _(Homepage)_
2. `https://www.codayweb.de/de/services` _(Services Hub)_
3. `https://www.codayweb.de/de/work` _(Cases & Portfolio)_
4. `https://www.codayweb.de/de/about` _(Über uns)_
5. `https://www.codayweb.de/de/ai` _(AI Automatisierung Hub)_
6. `https://www.codayweb.de/de/services/development/web-development` _(Fokus-Service: Webentwicklung)_
7. `https://www.codayweb.de/de/services/seo/local-seo` _(Fokus-Service: Local SEO)_
8. `https://www.codayweb.de/de/landingpages/local-wetzlar` _(Sales-Landingpage Wetzlar)_
9. `https://www.codayweb.de/de/landingpages/nextjs-migration` _(Sales-Landingpage Next.js)_
10. `https://www.codayweb.de/de/contact` _(Lead Gen / Kontakt)_

_Warum diese 10?_ Diese URLs decken den gesamten Funnel ab – von der Brand-Awareness über Core-Services und lokales SEO bis hin zur Conversion (Kontakt).

---

## 6. Troubleshooting & Rollback

- **Sitemaps zeigen 0 Seiten / Fehler:**
  Falls Sitemaps (wie `sitemap-ai-data.xml`) 0 URLs enthalten, zeigt GSC einen Fehler. Dies wurde gefixt, indem eine Fallback-URL (`/ai`) in die Dateien geschrieben wurde. Niemals völlig leere Sitemaps hochladen!
- **Vercel Deployment blockiert im Dashboard:**
  Das ist normal, da das GitHub-Repo im Hobby-Plan als Kollaborateur-Repo gilt. **Lösung:** Immer über CLI deployen (`npx vercel --prod`), nicht über die Vercel-Website.
- **Layout bricht (CSS fehlt):**
  Prüfe, ob Tailwind CSS beim Build korrekt kompiliert wurde. Leere ggf. den Vite Cache oder verifiziere, dass keine Dateien in der Vercel `.vercelignore` irrtümlich ignoriert werden.

---

_End of Guide_
