# Security Guide & HSTS Preload Checkliste

Dieses Dokument dient als Referenz für die Sicherheitskonfiguration der Codayweb Next.js-Applikation.

## 1. Verifizierung der Security Headers (Lokal & Live)

Nach dem Deployment auf Vercel oder beim lokalen Testen mit `next start` (Die Headers greifen oft nicht in `next dev`!) kannst du die Header wie folgt prüfen:

### Command Line (cURL)
```bash
curl -I https://codayweb.de | grep -i strict-transport
curl -I https://codayweb.de | grep -i cross-origin
```
*Tipp:* Wenn du lokal testest, ersetze `https://codayweb.de` durch `http://localhost:3000`.

### Automatisierte Web-Scans
Nach dem Live-Gang auf der Produktions-Domain solltest du die Seite hier testen:
- **SecurityHeaders.com:** [https://securityheaders.com/?q=https%3A%2F%2Fcodayweb.de&followRedirects=on](https://securityheaders.com/?q=https%3A%2F%2Fcodayweb.de&followRedirects=on) (Ziel: A+ Rating)
- **Mozilla Observatory:** [https://observatory.mozilla.org/analyze/codayweb.de](https://observatory.mozilla.org/analyze/codayweb.de)

## 2. HSTS Preload Prozess

Wir haben `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` in der `next.config.ts` gesetzt. Dies qualifiziert die Domain für das globale HSTS Preload-Verzeichnis der Browser (Chrome, Firefox, Safari).

### Wie man sich anmeldet:
1. Stelle sicher, dass die App **live** auf der Produktionsdomain (mit den neuen Headern) läuft.
2. Besuche: **[https://hstspreload.org/](https://hstspreload.org/)**
3. Gib `codayweb.de` in das Eingabefeld ein.
4. Klicke auf "Check HSTS preload status and eligibility".
5. Wenn alles grün ist, klicke auf "Submit codayweb.de to the HSTS preload list".

> [!WARNING]
> HSTS Preload ist eine Einbahnstraße. Sobald die Domain im Verzeichnis ist, verlangen Browser für diese Domain und ALLE Subdomains zwingend HTTPS. Ein Fallback auf HTTP ist dann hardcoded im Browser deaktiviert.

## 3. Bekannte Ausnahmen (Vercel & Sanity)

- **Sanity Studio (`/studio/*`)**: Sanity nutzt Popups zur Authentifizierung. Daher ist hier `Cross-Origin-Opener-Policy: same-origin-allow-popups` konfiguriert. Ein striktes `same-origin` würde den Login-Flow blockieren.
- **Vercel Default HSTS**: Vercel setzt einen eigenen HSTS Header. Unsere `next.config.ts` überschreibt diesen erfolgreich, da wir das `preload`-Flag und eine max-age von 2 Jahren benötigen.
