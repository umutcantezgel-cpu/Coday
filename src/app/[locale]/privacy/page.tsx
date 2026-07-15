'use client';

import { useCookieStore } from '@/shared/lib/cookieStore';

export default function PrivacyPage() {
  const { preferences, openSettings, rejectAll } = useCookieStore();

  let _locale = 'de' as string;
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 prose dark:prose-invert">
      <h1>Datenschutzerklärung</h1>
      <p>
        Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der
        EU-Datenschutzgrundverordnung (DSGVO), ist: Codayweb.de
      </p>
      <h2>Ihre Datenschutzrechte</h2>
      <p>
        Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit
        folgende Rechte ausüben:
      </p>
      <ul>
        <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung</li>
        <li>Berichtigung unrichtiger personenbezogener Daten</li>
        <li>Löschung Ihrer bei uns gespeicherten Daten</li>
      </ul>
      <hr className="my-12" />
      <h2 id="cookies">Cookie-Einstellungen & Details</h2>
      <p>
        Wir nutzen auf unserer Website Cookies und ähnliche Technologien. Hier können Sie jederzeit
        Ihre getroffene Auswahl einsehen und widerrufen.
      </p>
      <div className="bg-zinc-100 dark:bg-zinc-800/50 p-6 rounded-xl my-6">
        <h3 className="mt-0">Ihre aktuelle Auswahl:</h3>
        <ul className="list-none pl-0">
          <li>✅ Notwendig (Immer aktiv)</li>
          <li>{preferences?.analytics ? '✅' : '❌'} Statistiken</li>
          <li>{preferences?.functional ? '✅' : '❌'} Funktional (Sentry)</li>
          <li>{preferences?.marketing ? '✅' : '❌'} Marketing (Cal.com)</li>
        </ul>

        <div className="flex gap-4 mt-6">
          <button
            onClick={openSettings}
            className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
          >
            Banner erneut öffnen
          </button>
          <button
            onClick={rejectAll}
            className="border border-red-200 text-red-600 dark:border-red-900/50 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 px-4 py-2 rounded-lg text-sm font-medium"
          >
            Alle nicht-notwendigen ablehnen
          </button>
        </div>
      </div>
      <h3>Liste der gesetzten Cookies und Technologien</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="py-3 px-4 font-semibold">Name / Technologie</th>
              <th className="py-3 px-4 font-semibold">Anbieter</th>
              <th className="py-3 px-4 font-semibold">Zweck</th>
              <th className="py-3 px-4 font-semibold">Kategorie</th>
              <th className="py-3 px-4 font-semibold">Speicherdauer</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4 font-mono">coday_gdpr_consent</td>
              <td className="py-3 px-4">Codayweb (Eigener Host)</td>
              <td className="py-3 px-4">
                Speichert Ihre Consent-Einstellungen aus dem Cookie-Banner.
              </td>
              <td className="py-3 px-4">Notwendig</td>
              <td className="py-3 px-4">1 Jahr</td>
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4 font-mono">coday_session_id</td>
              <td className="py-3 px-4">Codayweb (Eigener Host)</td>
              <td className="py-3 px-4">Anonyme Session-ID für serverseitiges Consent-Logging.</td>
              <td className="py-3 px-4">Notwendig</td>
              <td className="py-3 px-4">1 Jahr</td>
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4">Sentry</td>
              <td className="py-3 px-4">Sentry.io</td>
              <td className="py-3 px-4">
                Erfasst Fehlerprotokolle (Error Tracking) ohne PII, um die Stabilität der App zu
                gewährleisten.
              </td>
              <td className="py-3 px-4">Funktional</td>
              <td className="py-3 px-4">Session</td>
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4">Vercel Analytics</td>
              <td className="py-3 px-4">Vercel Inc.</td>
              <td className="py-3 px-4">
                Erfasst anonymisierte Zugriffsstatistiken. Arbeitet komplett ohne Cookies
                (Privacy-by-Design).
              </td>
              <td className="py-3 px-4">Notwendig / Keine Cookies</td>
              <td className="py-3 px-4">-</td>
            </tr>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <td className="py-3 px-4">Cal.com</td>
              <td className="py-3 px-4">Cal.com Inc.</td>
              <td className="py-3 px-4">
                Ermöglicht die direkte Terminbuchung auf unserer Website.
              </td>
              <td className="py-3 px-4">Marketing</td>
              <td className="py-3 px-4">Session / Third-Party</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
