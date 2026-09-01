import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { BASE_URL, getOrganizationSchema, getBreadcrumbSchema } from '@/lib/schema';
import { CODAY_STORAGE_INVENTORY } from '@/shared/lib/consent/storageInventory';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Privacy Policy | Web Design Agency Wetzlar Hesse',
      description:
        'Privacy policy of Coday, your web design agency in Wetzlar. GDPR and TDDDG compliant data processing, local storage transparency, and your rights.',
      keywords: [
        'Coday Privacy Policy',
        'GDPR Compliance Coday',
        'Data Protection Web Agency',
        'TDDDG Transparency',
      ],
      path: '/en/legal/datenschutz',
      type: 'legal',
    });
  }
  return generatePageMetadata({
    title: 'Datenschutzerklärung | Webdesign Agentur Wetzlar',
    description:
      'Datenschutzerklärung von Coday, Ihrer Webdesign Agentur in Wetzlar. DSGVO- und TDDDG-konforme Datenverarbeitung, transparente lokale Speicherung und Ihre Rechte.',
    keywords: [
      'Coday Datenschutzerklärung',
      'Datenschutz Webagentur Wetzlar',
      'DSGVO Konformität Coday',
      'TDDDG Speicherinformationen',
    ],
    path: '/de/legal/datenschutz',
    type: 'legal',
  });
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const _locale = locale || 'de';
  const isEn = _locale === 'en';

  const breadcrumbs = getBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', url: `/${_locale}` },
    {
      name: isEn ? 'Privacy Policy' : 'Datenschutzerklärung',
      url: `/${_locale}/legal/datenschutz`,
    },
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(_locale),
      breadcrumbs,
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${_locale}/legal/datenschutz#webpage`,
        name: isEn ? 'Privacy Policy' : 'Datenschutzerklärung',
        url: `${BASE_URL}/${_locale}/legal/datenschutz`,
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-16 md:pt-6 md:pb-20 text-slate-900">
        <h1 className="text-3xl font-bold mb-8 text-secondary-900">
          {isEn ? 'Privacy Policy' : 'Datenschutzerklärung'}
        </h1>

        <section className="py-[var(--space-section)] space-y-8 text-secondary-800 leading-relaxed">
          {/* 1. Verantwortlicher */}
          <div>
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">
              {isEn ? '1. Data Controller' : '1. Name und Anschrift des Verantwortlichen'}
            </h2>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO), sonstiger in den
              Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und anderer
              Bestimmungen mit datenschutzrechtlichem Charakter ist:
            </p>
            <p className="mt-2 font-medium">
              Umutcan Emre Tezgel
              <br />
              Coday · Einzelunternehmen
              <br />
              Lessingstraße 4
              <br />
              35578 Wetzlar
              <br />
              Deutschland
              <br />
              E-Mail: umut@codayweb.de
              <br />
              Telefon: +49 176 41195301
            </p>
          </div>

          {/* 2. Lokale Speicherung & TDDDG */}
          <div>
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">
              {isEn
                ? '2. Local Storage & Consent Management (TDDDG § 25 & GDPR Art. 6)'
                : '2. Lokale Speichertechnologien & Consent-Management (§ 25 TDDDG & Art. 6 DSGVO)'}
            </h2>
            <p>
              {isEn
                ? 'We primarily use local browser storage (LocalStorage and SessionStorage) instead of tracking cookies to deliver instant sub-300ms performance and ensure state persistence for interactive features without sending your data to external servers.'
                : 'Wir setzen primär auf moderne, lokale Browserspeicher (LocalStorage und SessionStorage) anstelle von Tracking-Cookies. Dies garantiert Ladezeiten unter 300ms und ermöglicht es, dass Ihre Einstellungen direkt auf Ihrem Endgerät verbleiben, ohne unbemerkt an Dritte übermittelt zu werden.'}
            </p>

            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">
                {isEn
                  ? 'Inventory of Stored Local Keys:'
                  : 'Verzeichnis der genutzten lokalen Speicherschlüssel:'}
              </h3>
              <div className="space-y-2">
                {CODAY_STORAGE_INVENTORY.map((item) => (
                  <div
                    key={item.key}
                    className="bg-white p-3 rounded-lg border border-slate-200 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <code className="font-mono text-primary-700 font-bold">{item.key}</code>
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-600">
                        {item.category === 'necessary'
                          ? isEn
                            ? 'Essential (§ 25 Abs. 2 TDDDG)'
                            : 'Essenziell (§ 25 Abs. 2 TDDDG)'
                          : isEn
                            ? 'Functional / Comfort'
                            : 'Komfort / Funktion'}
                      </span>
                      <span className="text-slate-500">{item.duration}</span>
                    </div>
                    <p className="text-slate-700">{isEn ? item.purposeEn : item.purposeDe}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4">
              <strong>
                {isEn
                  ? 'Right to Revoke (Art. 7(3) GDPR):'
                  : 'Recht auf jederzeitigen Widerruf (Art. 7 Abs. 3 DSGVO):'}
              </strong>{' '}
              {isEn
                ? 'You can change or revoke your storage and privacy preferences at any time by clicking the "Privacy Settings" link in the footer or the floating shield widget at the bottom of the screen.'
                : 'Sie können Ihre erteilte Einwilligung für funktionale Speicherungen oder statistische Messungen jederzeit mit Wirkung für die Zukunft ändern oder widerrufen. Nutzen Sie dazu einfach den Link „Cookie-Einstellungen“ im Footer oder das interaktive Schild-Icon am Bildschirmrand.'}
            </p>
          </div>

          {/* 3. Hosting */}
          <div>
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">
              {isEn
                ? '3. Edge Hosting & Content Delivery'
                : '3. Edge-Hosting & Content Delivery Network'}
            </h2>
            <p>
              {isEn
                ? 'This website is hosted on Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA). To deliver our pages securely and globally at sub-second speeds, Vercel edge nodes process standard server request headers (IP address, user agent, requested URL, timestamp) based on our legitimate interest in secure, performant website delivery (Art. 6(1)(f) GDPR).'
                : 'Diese Website wird auf der globalen Edge-Infrastruktur von Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Zur sicheren und ausfallsicheren Auslieferung werden technisch notwendige Server-Logdaten (IP-Adresse, User-Agent, Zeitstempel) verarbeitet. Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren Bereitstellung (Art. 6 Abs. 1 lit. f DSGVO).'}
            </p>
          </div>

          {/* 4. Kontaktaufnahme */}
          <div>
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">
              {isEn
                ? '4. Contact Forms & Consultation Requests'
                : '4. Kontaktaufnahme & Beratungsanfragen'}
            </h2>
            <p>
              {isEn
                ? 'When you contact us via our contact form, budget calculator, or direct email, your provided details (name, email address, company, project scope) are processed solely for responding to your inquiry and pre-contractual measures (Art. 6(1)(b) GDPR).'
                : 'Wenn Sie uns über unsere Kontaktformulare, den Projekt-Kalkulator oder per E-Mail kontaktieren, werden Ihre Angaben (Name, E-Mail, Unternehmen, Projektumfang) ausschließlich zur Bearbeitung Ihrer Anfrage und zur Durchführung vorvertraglicher Maßnahmen verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).'}
            </p>
          </div>

          {/* 5. Google Preferred Sources */}
          <div>
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">
              {isEn ? '5. Google "Preferred Sources"' : '5. Google „Bevorzugte Quellen“'}
            </h2>
            <p>
              {isEn
                ? 'On some pages we offer a button to add our website as a "preferred source" in Google Search. The button provided by Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) is only loaded after you actively click "Load Google button". Only then is a connection to Google servers established, transmitting your IP address and browser information to Google, potentially in the USA (Art. 49(1)(a) GDPR). Without that click, no data is sent to Google. Alternatively, a plain link takes you directly to the Google preferences page; the usual rules of that external site apply there. Legal basis is your consent expressed through the active click (Art. 6(1)(a) GDPR, §25(1) TDDDG).'
                : 'Auf einigen Seiten bieten wir einen Button an, mit dem Sie unsere Website als „bevorzugte Quelle“ in der Google Suche hinterlegen können. Der von Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) bereitgestellte Button wird erst geladen, nachdem Sie aktiv auf „Google-Button laden“ geklickt haben. Erst dann wird eine Verbindung zu Google-Servern aufgebaut und dabei Ihre IP-Adresse sowie Browser-Informationen an Google übertragen, ggf. auch in die USA (Art. 49 Abs. 1 lit. a DSGVO). Ohne diesen Klick werden keine Daten an Google gesendet. Alternativ führt ein einfacher Link direkt zur Google-Einstellungsseite; dort gelten die Regeln der externen Website. Rechtsgrundlage ist Ihre durch den aktiven Klick erklärte Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG).'}
            </p>
          </div>

          {/* 6. Ihre Rechte */}
          <div>
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">
              {isEn ? '6. Your Rights as a Data Subject' : '6. Ihre Rechte als betroffene Person'}
            </h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                {isEn ? 'Right to access (Art. 15 GDPR)' : 'Recht auf Auskunft (Art. 15 DSGVO)'}
              </li>
              <li>
                {isEn
                  ? 'Right to rectification (Art. 16 GDPR)'
                  : 'Recht auf Berichtigung (Art. 16 DSGVO)'}
              </li>
              <li>
                {isEn
                  ? 'Right to erasure / "Right to be forgotten" (Art. 17 GDPR)'
                  : 'Recht auf Löschung (Art. 17 DSGVO)'}
              </li>
              <li>
                {isEn
                  ? 'Right to restriction of processing (Art. 18 GDPR)'
                  : 'Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)'}
              </li>
              <li>
                {isEn
                  ? 'Right to data portability (Art. 20 GDPR)'
                  : 'Recht auf Datenübertragbarkeit (Art. 20 DSGVO)'}
              </li>
              <li>
                {isEn ? 'Right to object (Art. 21 GDPR)' : 'Recht auf Widerspruch (Art. 21 DSGVO)'}
              </li>
              <li>
                {isEn
                  ? 'Right to lodge a complaint with a supervisory authority (Art. 77 GDPR) – e.g. Der Hessische Beauftragte für Datenschutz und Informationsfreiheit'
                  : 'Beschwerderecht bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO) – zuständig ist u.a. Der Hessische Beauftragte für Datenschutz und Informationsfreiheit'}
              </li>
            </ul>
          </div>

          <p className="text-sm text-secondary-600 mt-12 border-t border-slate-200 pt-6">
            {isEn
              ? 'Last updated: August 2026 · Coday Web Agency'
              : 'Stand: August 2026 · Coday Webagentur Wetzlar'}
          </p>
        </section>
      </div>
    </>
  );
}
