import React from 'react';
import LegalLayoutV2 from '../../widgets/layout/LegalLayoutV2';
import {
  QuickSummary,
  LegalAlertBox,
  LegalInfoCard,
  ExpandableClause,
  LegalTimeline,
  LegalSectionHeader,
  DataProcessorCard,
  RightsChecklist,
} from '@/shared/ui/LegalComponents';
import { useTranslation } from 'react-i18next';

const Privacy: React.FC = () => {
  const { t } = useTranslation('legal');

  const tocItems = [
    { id: 'praeambel', label: t('privacy.toc.praeambel', { defaultValue: '1. Präambel' }), icon: 'info' },
    { id: 'grundsaetze', label: t('privacy.toc.grundsaetze', { defaultValue: '2. Grundsätze' }), icon: 'verified' },
    { id: 'erhebung', label: t('privacy.toc.erhebung', { defaultValue: '3. Datenerhebung' }), icon: 'database' },
    { id: 'cookies', label: t('privacy.toc.cookies', { defaultValue: '4. Cookies' }), icon: 'cookie' },
    { id: 'datenfluss', label: t('privacy.toc.datenfluss', { defaultValue: '5. Datenfluss' }), icon: 'share' },
    { id: 'ki-dienste', label: t('privacy.toc.ki_dienste', { defaultValue: '6. KI-Dienste' }), icon: 'smart_toy' },
    { id: 'drittanbieter', label: t('privacy.toc.drittanbieter', { defaultValue: '7. Drittanbieter' }), icon: 'cloud' },
    { id: 'international', label: t('privacy.toc.international', { defaultValue: '8. Internationale Übertragung' }), icon: 'globe' },
    { id: 'speicherung', label: t('privacy.toc.speicherung', { defaultValue: '9. Speicherfristen' }), icon: 'schedule' },
    { id: 'rechte', label: t('privacy.toc.rechte', { defaultValue: '10. Ihre Rechte' }), icon: 'person' },
    { id: 'beschwerde', label: t('privacy.toc.beschwerde', { defaultValue: '11. Beschwerderecht' }), icon: 'support' },
    { id: 'aenderungen', label: t('privacy.toc.aenderungen', { defaultValue: '12. Änderungen' }), icon: 'edit' },
    { id: 'sicherheit', label: t('privacy.toc.sicherheit', { defaultValue: '13. Datensicherheit' }), icon: 'shield' },
    { id: 'kontakt', label: t('privacy.toc.kontakt', { defaultValue: '14. Kontakt' }), icon: 'mail' },
  ];

  const retentionTimelineItems = [
    {
      title: t('privacy.retention.contact', { defaultValue: 'Kontaktanfragen' }),
      description: t('privacy.retention.contact_desc', { defaultValue: 'Nach Abschluss der Bearbeitung, max. 6 Monate' }),
      icon: 'mail',
      status: 'completed' as const,
    },
    {
      title: t('privacy.retention.project', { defaultValue: 'Projektdaten' }),
      description: t('privacy.retention.project_desc', { defaultValue: 'Für die Dauer des Projekts + 3 Jahre (Gewährleistung)' }),
      icon: 'folder',
      status: 'completed' as const,
    },
    {
      title: t('privacy.retention.invoices', { defaultValue: 'Rechnungsdaten' }),
      description: t('privacy.retention.invoices_desc', { defaultValue: '10 Jahre (gesetzliche Aufbewahrungspflicht)' }),
      icon: 'payments',
      status: 'current' as const,
    },
    {
      title: t('privacy.retention.chat', { defaultValue: 'Chatbot-Konversationen' }),
      description: t('privacy.retention.chat_desc', { defaultValue: 'Nur lokal im Browser, keine serverseitige Speicherung' }),
      icon: 'chat',
      status: 'upcoming' as const,
    },
    {
      title: t('privacy.retention.analytics', { defaultValue: 'Analysedaten' }),
      description: t('privacy.retention.analytics_desc', { defaultValue: 'Anonymisiert nach 26 Monaten' }),
      icon: 'analytics',
      status: 'upcoming' as const,
    },
  ];

  const rightsItems = [
    {
      article: 'Art. 15',
      title: t('privacy.rights.art15.title', { defaultValue: 'Auskunft' }),
      description: t('privacy.rights.art15.desc', { defaultValue: 'Sie haben das Recht, Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten.' }),
    },
    {
      article: 'Art. 16',
      title: t('privacy.rights.art16.title', { defaultValue: 'Berichtigung' }),
      description: t('privacy.rights.art16.desc', { defaultValue: 'Sie können die Berichtigung unrichtiger oder Vervollständigung unvollständiger Daten verlangen.' }),
    },
    {
      article: 'Art. 17',
      title: t('privacy.rights.art17.title', { defaultValue: 'Löschung' }),
      description: t('privacy.rights.art17.desc', { defaultValue: 'Sie haben das "Recht auf Vergessenwerden" – Löschung Ihrer Daten auf Anfrage.' }),
    },
    {
      article: 'Art. 18',
      title: t('privacy.rights.art18.title', { defaultValue: 'Einschränkung' }),
      description: t('privacy.rights.art18.desc', { defaultValue: 'Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.' }),
    },
    {
      article: 'Art. 20',
      title: t('privacy.rights.art20.title', { defaultValue: 'Datenübertragbarkeit' }),
      description: t('privacy.rights.art20.desc', { defaultValue: 'Sie können Ihre Daten in einem gängigen, maschinenlesbaren Format erhalten.' }),
    },
    {
      article: 'Art. 21',
      title: t('privacy.rights.art21.title', { defaultValue: 'Widerspruch' }),
      description: t('privacy.rights.art21.desc', { defaultValue: 'Sie können der Verarbeitung Ihrer Daten widersprechen, insbesondere bei Direktwerbung.' }),
    },
  ];

  return (
    <LegalLayoutV2
      title={t('privacy.title', { defaultValue: 'Datenschutzerklärung' })}
      subtitle={t('privacy.subtitle', { defaultValue: 'Transparenter Umgang mit Ihren Daten' })}
      lastUpdated={t('privacy.last_updated', { date: '09.02.2026', defaultValue: 'Letztes Update: 09.02.2026' })}
      tocItems={tocItems}
      pageType="privacy"
      version="2.0"
    >
      {/* Quick Summary */}
      <QuickSummary
        title={t('privacy.summary.title', { defaultValue: 'Das Wichtigste auf einen Blick' })}
        items={[
          t('privacy.summary.1', { defaultValue: 'DSGVO-konform: Wir verarbeiten Ihre Daten nach EU-Recht' }),
          t('privacy.summary.2', { defaultValue: 'Kein Verkauf: Wir verkaufen Ihre Daten niemals an Dritte' }),
          t('privacy.summary.3', { defaultValue: 'Transparenz: Sie wissen jederzeit, welche Daten wir haben' }),
          t('privacy.summary.4', { defaultValue: 'Kontrolle: Sie können Ihre Daten jederzeit löschen lassen' }),
          t('privacy.summary.5', { defaultValue: 'Sicherheit: Verschlüsselte Übertragung und sichere Speicherung' }),
        ]}
      />

      {/* 1. Präambel */}
      <section id="praeambel" className="scroll-mt-32 mt-12 mb-16">
        <LegalSectionHeader
          number="1"
          title={t('privacy.sections.praeambel.title', { defaultValue: 'Präambel & Verantwortlicher' })}
          subtitle={t('privacy.sections.praeambel.subtitle', { defaultValue: 'Wer für Ihre Daten verantwortlich ist' })}
        />

        <p className="leading-relaxed text-gray-600 mb-6">
          {t('privacy.intro', {
            defaultValue: 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Nachfolgend informieren wir Sie über die Erhebung, Verarbeitung und Nutzung Ihrer Daten gemäß der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG).'
          })}
        </p>

        <LegalInfoCard title={t('privacy.controller.title', { defaultValue: 'Verantwortlicher' })} icon="person" variant="highlight">
          <div className="space-y-1">
            <p className="font-bold text-gray-900">Umutcan Emre Tezgel</p>
            <p>Lessingstraße 4<br />35578 Wetzlar<br />Deutschland</p>
            <div className="pt-2 space-y-1">
              <p><strong>E-Mail:</strong> <a href="mailto:umut@codayweb.de" className="text-primary hover:underline">umut@codayweb.de</a></p>
              <p><strong>Telefon:</strong> +49 176 41195301</p>
              <p><strong>Website:</strong> <a href="https://www.codayweb.de" className="text-primary hover:underline">www.codayweb.de</a></p>
            </div>
          </div>
        </LegalInfoCard>
      </section>

      {/* 2. Grundsätze */}
      <section id="grundsaetze" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="2"
          title={t('privacy.sections.grundsaetze.title', { defaultValue: 'Grundsätze der Datenverarbeitung' })}
          subtitle={t('privacy.sections.grundsaetze.subtitle', { defaultValue: 'Unsere Verpflichtungen nach DSGVO Art. 5' })}
        />

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <LegalInfoCard title={t('privacy.principles.lawfulness', { defaultValue: 'Rechtmäßigkeit' })} icon="verified">
            {t('privacy.principles.lawfulness_desc', { defaultValue: 'Jede Verarbeitung basiert auf einer gültigen Rechtsgrundlage (Einwilligung, Vertrag, berechtigtes Interesse).' })}
          </LegalInfoCard>
          <LegalInfoCard title={t('privacy.principles.transparency', { defaultValue: 'Transparenz' })} icon="visibility">
            {t('privacy.principles.transparency_desc', { defaultValue: 'Sie werden umfassend über alle Verarbeitungsvorgänge informiert.' })}
          </LegalInfoCard>
          <LegalInfoCard title={t('privacy.principles.purpose', { defaultValue: 'Zweckbindung' })} icon="target">
            {t('privacy.principles.purpose_desc', { defaultValue: 'Daten werden nur für festgelegte, eindeutige und legitime Zwecke erhoben.' })}
          </LegalInfoCard>
          <LegalInfoCard title={t('privacy.principles.minimization', { defaultValue: 'Datenminimierung' })} icon="filter_list">
            {t('privacy.principles.minimization_desc', { defaultValue: 'Wir erheben nur die Daten, die wir tatsächlich benötigen.' })}
          </LegalInfoCard>
        </div>
      </section>

      {/* 3. Erhebung */}
      <section id="erhebung" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="3"
          title={t('privacy.sections.2.title', { defaultValue: 'Erhebung personenbezogener Daten' })}
          subtitle={t('privacy.sections.2.subtitle', { defaultValue: 'Welche Daten wir sammeln' })}
        />

        <ExpandableClause
          title={t('privacy.sections.2.a.title', { defaultValue: 'Beim Besuch der Website' })}
          defaultOpen
        >
          <p className="mb-3">{t('privacy.sections.2.a.content', { defaultValue: 'Beim Aufrufen unserer Website werden durch den Browser automatisch Informationen an den Server gesendet. Diese werden temporär in Logfiles gespeichert:' })}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>IP-Adresse (anonymisiert)</li>
            <li>Datum & Uhrzeit des Zugriffs</li>
            <li>Aufgerufene URL</li>
            <li>Referrer URL (vorherige Seite)</li>
            <li>Browser & Betriebssystem</li>
          </ul>
          <p className="mt-3 text-sm text-gray-500">Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</p>
        </ExpandableClause>

        <div className="space-y-4 mt-4">
          <ExpandableClause title={t('privacy.sections.2.b.title', { defaultValue: 'Bei Nutzung des Kontaktformulars' })}>
            <p className="mb-3">{t('privacy.sections.2.b.content', { defaultValue: 'Bei Nutzung des Kontaktformulars erheben wir:' })}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name (erforderlich)</li>
              <li>E-Mail-Adresse (erforderlich)</li>
              <li>Telefonnummer (optional)</li>
              <li>Ihre Nachricht</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)</p>
          </ExpandableClause>

          <ExpandableClause title={t('privacy.sections.2.c.title', { defaultValue: 'Bei Nutzung des Website-Analyzers' })}>
            <p className="mb-3">{t('privacy.sections.2.c.content', { defaultValue: 'Beim Website-Analyzer erheben wir:' })}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Die analysierte URL</li>
              <li>E-Mail-Adresse (für Report-Zustellung)</li>
              <li>Analyseergebnisse (temporär gespeichert)</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</p>
          </ExpandableClause>

          <ExpandableClause title={t('privacy.sections.2.d.title', { defaultValue: 'Bei Nutzung des Chatbots (Jarvis)' })}>
            <p className="mb-3">{t('privacy.sections.2.d.content', { defaultValue: 'Der Chatbot speichert Ihre Konversation lokal im Browser zur Bereitstellung der Chat-Funktionalität.' })}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chat-Nachrichten (nur im Browser gespeichert)</li>
              <li>Keine personenbezogenen Daten auf unserem Server</li>
              <li>Übermittlung an externe KI-Dienste zur Verarbeitung</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch Nutzung)</p>
          </ExpandableClause>
        </div>
      </section>

      {/* 4. Cookies */}
      <section id="cookies" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="4"
          title={t('privacy.sections.3.title', { defaultValue: 'Cookies & Tracking-Technologien' })}
          subtitle={t('privacy.sections.3.subtitle', { defaultValue: 'Wie wir Cookies einsetzen' })}
        />

        <p className="leading-relaxed text-gray-600 mb-6">
          {t('privacy.sections.3.content', { defaultValue: 'Wir verwenden Cookies, um unsere Website funktionsfähig zu halten und Ihre Nutzererfahrung zu verbessern. Sie können Ihre Cookie-Einstellungen jederzeit über unser Cookie-Banner anpassen.' })}
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <LegalInfoCard
            title={t('privacy.sections.3.necessary.title', { defaultValue: 'Notwendige Cookies' })}
            icon="lock"
            variant="highlight"
          >
            <p className="text-sm">{t('privacy.sections.3.necessary.desc', { defaultValue: 'Erforderlich für die Grundfunktionen der Website (Session, Cookie-Einstellungen). Ohne diese funktioniert die Website nicht.' })}</p>
            <p className="mt-2 text-xs text-gray-500">Speicherdauer: Session / 1 Jahr</p>
          </LegalInfoCard>

          <LegalInfoCard
            title={t('privacy.sections.3.functional.title', { defaultValue: 'Funktionale Cookies' })}
            icon="settings"
          >
            <p className="text-sm">{t('privacy.sections.3.functional.desc', { defaultValue: 'Speichern Ihre Präferenzen wie Sprachauswahl und Chatbot-Verlauf (localStorage).' })}</p>
            <p className="mt-2 text-xs text-gray-500">Speicherdauer: 1 Jahr</p>
          </LegalInfoCard>

          <LegalInfoCard
            title={t('privacy.sections.3.analytics.title', { defaultValue: 'Analyse-Cookies' })}
            icon="analytics"
          >
            <p className="text-sm">{t('privacy.sections.3.analytics.desc', { defaultValue: 'Google Analytics zur Verbesserung unserer Website – nur mit Ihrer ausdrücklichen Einwilligung.' })}</p>
            <p className="mt-2 text-xs text-gray-500">Speicherdauer: 26 Monate</p>
          </LegalInfoCard>
        </div>

        <p className="text-sm text-slate-500">
          {t('privacy.sections.3.note', { defaultValue: 'Sie können Ihre Cookie-Einstellungen jederzeit über das Cookie-Banner anpassen oder alle Cookies in Ihren Browsereinstellungen blockieren.' })}
        </p>
      </section>

      {/* 5. Datenfluss */}
      <section id="datenfluss" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="5"
          title={t('privacy.sections.datenfluss.title', { defaultValue: 'Datenfluss-Übersicht' })}
          subtitle={t('privacy.sections.datenfluss.subtitle', { defaultValue: 'Wie Ihre Daten verarbeitet werden' })}
        />

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-6">
          <div className="text-center text-sm text-gray-600 mb-4">
            {t('privacy.dataflow.description', { defaultValue: 'Visualisierung des Datenflusses bei der Nutzung unserer Dienste' })}
          </div>

          {/* Simple Data Flow Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">👤</span>
              </div>
              <p className="text-xs font-medium text-gray-900">Nutzer</p>
            </div>

            <div className="text-center text-gray-400 hidden md:block">→</div>

            <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🌐</span>
              </div>
              <p className="text-xs font-medium text-gray-900">Website</p>
              <p className="text-xs text-gray-500">Vercel</p>
            </div>

            <div className="text-center text-gray-400 hidden md:block">→</div>

            <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🗄️</span>
              </div>
              <p className="text-xs font-medium text-gray-900">Datenbank</p>
              <p className="text-xs text-gray-500">Supabase (EU)</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center border border-amber-200">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🤖</span>
              </div>
              <p className="text-xs font-medium text-gray-900">KI-Verarbeitung</p>
              <p className="text-xs text-gray-500">Google Gemini / Perplexity</p>
            </div>

            <div className="bg-white rounded-xl p-4 text-center border border-purple-200">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">📊</span>
              </div>
              <p className="text-xs font-medium text-gray-900">Analytics</p>
              <p className="text-xs text-gray-500">Google Analytics (optional)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. KI-Dienste */}
      <section id="ki-dienste" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="6"
          title={t('privacy.sections.4.title', { defaultValue: 'KI-Dienste & Automatisierte Verarbeitung' })}
          subtitle={t('privacy.sections.4.subtitle', { defaultValue: 'Einsatz von Künstlicher Intelligenz' })}
        />

        <LegalAlertBox variant="warning" title={t('privacy.ki.note', { defaultValue: 'Wichtiger Hinweis' })}>
          {t('privacy.sections.4.note', { defaultValue: 'Unser KI-Assistent "Jarvis" und der Website-Analyzer nutzen externe KI-Dienste zur Verarbeitung. Bei der Nutzung werden Ihre Eingaben an diese Dienste übermittelt.' })}
        </LegalAlertBox>

        <div className="space-y-4 mt-6">
          <ExpandableClause title={t('privacy.sections.4.gemini.title', { defaultValue: 'Google Gemini API' })} defaultOpen>
            <p className="mb-3">{t('privacy.sections.4.gemini.content', { defaultValue: 'Für den Chatbot und Website-Analyzer werden Ihre Anfragen an die Google Gemini API übermittelt.' })}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Verarbeitet werden: Ihre Chat-Nachrichten, Website-Inhalte bei Analyse</li>
              <li>Anbieter: Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</li>
              <li>Datenschutz: EU-Standardvertragsklauseln</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch Nutzung)</p>
          </ExpandableClause>

          <ExpandableClause title={t('privacy.sections.4.perplexity.title', { defaultValue: 'Perplexity API' })}>
            <p className="mb-3">{t('privacy.sections.4.perplexity.content', { defaultValue: 'Für erweiterte Suchanfragen wird die Perplexity API genutzt.' })}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Es werden ausschließlich die Suchanfragen übermittelt</li>
              <li>Keine personenbezogenen Daten werden übertragen</li>
              <li>Anbieter: Perplexity AI, San Francisco, USA</li>
            </ul>
          </ExpandableClause>
        </div>

        <LegalAlertBox variant="info" title={t('privacy.ki.disclaimer.title', { defaultValue: 'Keine rechtliche/medizinische Beratung' })}>
          {t('privacy.sections.4.disclaimer.content', { defaultValue: 'KI-generierte Antworten dienen ausschließlich Informationszwecken und ersetzen keine professionelle Beratung. Wir übernehmen keine Haftung für Entscheidungen, die auf Basis von KI-Antworten getroffen werden.' })}
        </LegalAlertBox>
      </section>

      {/* 7. Drittanbieter */}
      <section id="drittanbieter" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="7"
          title={t('privacy.sections.5.title', { defaultValue: 'Auftragsverarbeiter & Drittanbieter' })}
          subtitle={t('privacy.sections.5.subtitle', { defaultValue: 'Mit wem wir zusammenarbeiten' })}
        />

        <p className="leading-relaxed text-gray-600 mb-6">
          {t('privacy.sections.5.content', { defaultValue: 'Wir arbeiten mit sorgfältig ausgewählten Dienstleistern zusammen, die uns bei der Erbringung unserer Leistungen unterstützen. Mit allen Auftragsverarbeitern bestehen entsprechende Verträge nach Art. 28 DSGVO.' })}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <DataProcessorCard
            name="Vercel Inc."
            purpose={t('privacy.processors.vercel.purpose', { defaultValue: 'Website-Hosting & CDN' })}
            location="USA (EU-Standardvertragsklauseln)"
            icon="cloud"
            gdprCompliant={true}
            privacyUrl="https://vercel.com/legal/privacy-policy"
          />
          <DataProcessorCard
            name="Supabase Inc."
            purpose={t('privacy.processors.supabase.purpose', { defaultValue: 'Datenbank & Backend' })}
            location="EU (Frankfurt)"
            icon="database"
            gdprCompliant={true}
            privacyUrl="https://supabase.com/privacy"
          />
          <DataProcessorCard
            name="Google LLC"
            purpose={t('privacy.processors.google.purpose', { defaultValue: 'Gemini API & Analytics' })}
            location="USA (EU-Standardvertragsklauseln)"
            icon="smart_toy"
            gdprCompliant={true}
            privacyUrl="https://policies.google.com/privacy"
          />
          <DataProcessorCard
            name="Perplexity AI"
            purpose={t('privacy.processors.perplexity.purpose', { defaultValue: 'KI-gestützte Web-Suche' })}
            location="USA"
            icon="search"
            gdprCompliant={true}
            privacyUrl="https://www.perplexity.ai/privacy"
          />
        </div>
      </section>

      {/* 8. Internationale Übertragung */}
      <section id="international" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="8"
          title={t('privacy.sections.international.title', { defaultValue: 'Internationale Datenübertragung' })}
          subtitle={t('privacy.sections.international.subtitle', { defaultValue: 'Übermittlung in Drittländer' })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('privacy.international.p1', {
            defaultValue: 'Einige unserer Dienstleister haben ihren Sitz außerhalb der Europäischen Union, insbesondere in den USA. In diesen Fällen stellen wir durch geeignete Garantien sicher, dass Ihre Daten angemessen geschützt werden.'
          })}
        </p>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <LegalInfoCard title={t('privacy.international.scc.title', { defaultValue: 'EU-Standardvertragsklauseln' })} icon="description">
            {t('privacy.international.scc.desc', { defaultValue: 'Mit Dienstleistern in Drittländern haben wir die von der EU-Kommission genehmigten Standardvertragsklauseln abgeschlossen.' })}
          </LegalInfoCard>
          <LegalInfoCard title={t('privacy.international.adequacy.title', { defaultValue: 'Angemessenheitsbeschlüsse' })} icon="verified">
            {t('privacy.international.adequacy.desc', { defaultValue: 'Wo vorhanden, stützen wir uns auf Angemessenheitsbeschlüsse der EU-Kommission (z.B. für bestimmte US-Unternehmen).' })}
          </LegalInfoCard>
        </div>
      </section>

      {/* 9. Speicherfristen */}
      <section id="speicherung" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="9"
          title={t('privacy.sections.speicherung.title', { defaultValue: 'Datenspeicherung & Löschfristen' })}
          subtitle={t('privacy.sections.speicherung.subtitle', { defaultValue: 'Wie lange wir Ihre Daten aufbewahren' })}
        />

        <p className="leading-relaxed text-gray-600 mb-6">
          {t('privacy.speicherung.intro', {
            defaultValue: 'Wir speichern Ihre Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.'
          })}
        </p>

        <LegalTimeline
          items={retentionTimelineItems}
          title={t('privacy.retention.title', { defaultValue: 'Speicherfristen nach Datenart' })}
        />
      </section>

      {/* 10. Ihre Rechte */}
      <section id="rechte" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="10"
          title={t('privacy.sections.6.title', { defaultValue: 'Betroffenenrechte' })}
          subtitle={t('privacy.sections.6.subtitle', { defaultValue: 'Ihre Rechte nach DSGVO' })}
        />

        <p className="leading-relaxed text-gray-600 mb-6">
          {t('privacy.sections.6.content', { defaultValue: 'Sie haben umfassende Rechte bezüglich Ihrer personenbezogenen Daten. Zur Ausübung dieser Rechte kontaktieren Sie uns bitte unter umut@codayweb.de.' })}
        </p>

        <RightsChecklist items={rightsItems} />

        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
          <p className="text-sm text-gray-700">
            <strong>{t('privacy.rights.exercise', { defaultValue: 'Wie Sie Ihre Rechte ausüben:' })}</strong><br />
            {t('privacy.rights.exercise_desc', { defaultValue: 'Senden Sie uns eine E-Mail an' })} <a href="mailto:umut@codayweb.de" className="text-primary hover:underline font-medium">umut@codayweb.de</a> {t('privacy.rights.exercise_desc2', { defaultValue: 'mit dem Betreff "Datenschutzanfrage". Wir antworten innerhalb von 30 Tagen.' })}
          </p>
        </div>
      </section>

      {/* 11. Beschwerderecht */}
      <section id="beschwerde" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="11"
          title={t('privacy.sections.beschwerde.title', { defaultValue: 'Beschwerderecht bei der Aufsichtsbehörde' })}
          subtitle={t('privacy.sections.beschwerde.subtitle', { defaultValue: 'Wenn Sie unzufrieden sind' })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('privacy.beschwerde.p1', {
            defaultValue: 'Wenn Sie der Meinung sind, dass die Verarbeitung Ihrer Daten gegen Datenschutzrecht verstößt, haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).'
          })}
        </p>

        <LegalInfoCard
          title={t('privacy.beschwerde.authority.title', { defaultValue: 'Zuständige Aufsichtsbehörde' })}
          icon="business"
          variant="muted"
        >
          <p className="mb-2">
            <strong>Der Hessische Beauftragte für Datenschutz und Informationsfreiheit</strong>
          </p>
          <p>
            Gustav-Stresemann-Ring 1<br />
            65189 Wiesbaden<br />
            Telefon: +49 611 1408-0<br />
            E-Mail: <a href="mailto:poststelle@datenschutz.hessen.de" className="text-primary hover:underline">poststelle@datenschutz.hessen.de</a>
          </p>
        </LegalInfoCard>
      </section>

      {/* 12. Änderungen */}
      <section id="aenderungen" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="12"
          title={t('privacy.sections.aenderungen.title', { defaultValue: 'Änderungen dieser Datenschutzerklärung' })}
          subtitle={t('privacy.sections.aenderungen.subtitle', { defaultValue: 'Aktualisierungen und Versionierung' })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('privacy.aenderungen.p1', {
            defaultValue: 'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder Änderungen unserer Dienste anzupassen. Die aktuelle Version finden Sie stets auf dieser Seite.'
          })}
        </p>
        <p className="leading-relaxed text-gray-600">
          {t('privacy.aenderungen.p2', {
            defaultValue: 'Bei wesentlichen Änderungen werden wir Sie – soweit möglich – per E-Mail oder durch einen Hinweis auf unserer Website informieren.'
          })}
        </p>
      </section>

      {/* 13. Datensicherheit */}
      <section id="sicherheit" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="13"
          title={t('privacy.sections.7.title', { defaultValue: 'Datensicherheit' })}
          subtitle={t('privacy.sections.7.subtitle', { defaultValue: 'Technische und organisatorische Maßnahmen' })}
        />

        <p className="leading-relaxed text-gray-600 mb-6">
          {t('privacy.sections.7.content', { defaultValue: 'Wir setzen umfangreiche technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen:' })}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <LegalInfoCard title={t('privacy.security.encryption', { defaultValue: 'Verschlüsselung' })} icon="lock" variant="highlight">
            {t('privacy.security.encryption_desc', { defaultValue: 'TLS/SSL-Verschlüsselung für alle Datenübertragungen (HTTPS).' })}
          </LegalInfoCard>
          <LegalInfoCard title={t('privacy.security.updates', { defaultValue: 'Regelmäßige Updates' })} icon="refresh">
            {t('privacy.security.updates_desc', { defaultValue: 'Unsere Systeme werden regelmäßig aktualisiert und auf Sicherheitslücken überprüft.' })}
          </LegalInfoCard>
          <LegalInfoCard title={t('privacy.security.access', { defaultValue: 'Zugriffskontrolle' })} icon="key">
            {t('privacy.security.access_desc', { defaultValue: 'Der Zugriff auf personenbezogene Daten ist streng begrenzt und protokolliert.' })}
          </LegalInfoCard>
          <LegalInfoCard title={t('privacy.security.backup', { defaultValue: 'Backup' })} icon="cloud_done">
            {t('privacy.security.backup_desc', { defaultValue: 'Regelmäßige, verschlüsselte Backups zum Schutz vor Datenverlust.' })}
          </LegalInfoCard>
        </div>
      </section>

      {/* 14. Kontakt */}
      <section id="kontakt" className="scroll-mt-32 mb-8">
        <LegalSectionHeader
          number="14"
          title={t('privacy.sections.kontakt.title', { defaultValue: 'Kontakt & Datenschutzanfragen' })}
          subtitle={t('privacy.sections.kontakt.subtitle', { defaultValue: 'Sprechen Sie uns an' })}
        />

        <p className="leading-relaxed text-gray-600 mb-6">
          {t('privacy.kontakt.intro', {
            defaultValue: 'Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Betroffenenrechte stehen wir Ihnen gerne zur Verfügung:'
          })}
        </p>

        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Datenschutz-Kontakt</h4>
              <p className="text-gray-600 mb-4">
                Umutcan Emre Tezgel<br />
                Lessingstraße 4<br />
                35578 Wetzlar
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Erreichbarkeit</h4>
              <p className="text-gray-600">
                <strong>E-Mail:</strong> <a href="mailto:umut@codayweb.de" className="text-primary hover:underline">umut@codayweb.de</a><br />
                <strong>Telefon:</strong> +49 176 41195301<br />
                <strong>Antwortzeit:</strong> Innerhalb von 30 Tagen
              </p>
            </div>
          </div>
        </div>
      </section>
    </LegalLayoutV2 >
  );
};

export default Privacy;
