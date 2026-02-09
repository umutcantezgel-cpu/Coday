import React from 'react';
import LegalLayoutV2 from "../../widgets/layout/LegalLayoutV2";
import {
  LegalInfoCard,
  LegalAlertBox,
  LegalSectionHeader,
  QuickSummary,
} from '@/shared/ui/LegalComponents';
import { Icon } from '@/shared/ui/Icon';
import { useTranslation } from 'react-i18next';

const Impressum: React.FC = () => {
  const { t } = useTranslation('legal');

  const tocItems = [
    { id: 'unternehmen', label: t('impressum.toc.unternehmen', { defaultValue: '1. Unternehmensangaben' }), icon: 'business' },
    { id: 'vertreter', label: t('impressum.toc.vertreter', { defaultValue: '2. Vertretungsberechtigte' }), icon: 'person' },
    { id: 'kontakt', label: t('impressum.toc.kontakt', { defaultValue: '3. Kontakt' }), icon: 'mail' },
    { id: 'regulatorisch', label: t('impressum.toc.regulatorisch', { defaultValue: '4. Regulatorische Angaben' }), icon: 'verified' },
    { id: 'qualifikation', label: t('impressum.toc.qualifikation', { defaultValue: '5. Qualifikationen' }), icon: 'school' },
    { id: 'mission', label: t('impressum.toc.mission', { defaultValue: '6. Unsere Mission' }), icon: 'rocket' },
    { id: 'haftung', label: t('impressum.toc.haftung', { defaultValue: '7. Haftungshinweise' }), icon: 'shield' },
    { id: 'streitbeilegung', label: t('impressum.toc.streitbeilegung', { defaultValue: '8. Streitbeilegung' }), icon: 'gavel' },
  ];

  return (
    <LegalLayoutV2
      title={t('impressum.title', { defaultValue: 'Impressum' })}
      subtitle={t('impressum.subtitle', { defaultValue: 'Angaben gemäß § 5 DDG' })}
      tocItems={tocItems}
      pageType="impressum"
      version="2.0"
    >
      {/* Quick Summary */}
      <QuickSummary
        title={t('impressum.summary.title', { defaultValue: 'Auf einen Blick' })}
        items={[
          t('impressum.summary.1', { defaultValue: 'Einzelunternehmen mit Sitz in Wetzlar, Deutschland' }),
          t('impressum.summary.2', { defaultValue: 'Spezialisiert auf Webdesign, Entwicklung & digitale Lösungen' }),
          t('impressum.summary.3', { defaultValue: 'Direkter Kontakt per E-Mail, Telefon oder Kontaktformular' }),
          t('impressum.summary.4', { defaultValue: 'DSGVO-konform und transparent' }),
        ]}
      />

      {/* 1. Unternehmensangaben */}
      <section id="unternehmen" className="scroll-mt-32 mt-12 mb-16">
        <LegalSectionHeader
          number="1"
          title={t('impressum.sections.unternehmen.title', { defaultValue: 'Unternehmensangaben' })}
          subtitle={t('impressum.sections.unternehmen.subtitle', { defaultValue: 'Der Anbieter dieser Website' })}
        />

        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Logo / Avatar */}
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white font-display font-black text-3xl">C</span>
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <h3 className="font-display font-bold text-2xl text-secondary mb-2">
                {t('impressum.provider.name', { defaultValue: 'Umutcan Emre Tezgel' })}
              </h3>
              <p className="text-primary font-medium mb-4">
                {t('impressum.trading_as', { defaultValue: 'handelnd unter „Coday"' })}
              </p>
              <div className="text-gray-600 leading-relaxed">
                <p className="whitespace-pre-line">
                  {t('impressum.provider.address', { defaultValue: 'Lessingstraße 4\n35578 Wetzlar\nDeutschland' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vertretungsberechtigte Person */}
      <section id="vertreter" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="2"
          title={t('impressum.sections.vertreter.title', { defaultValue: 'Vertretungsberechtigte Person' })}
          subtitle={t('impressum.sections.vertreter.subtitle', { defaultValue: 'Gesetzlicher Vertreter' })}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <LegalInfoCard
            title={t('impressum.representative.title', { defaultValue: 'Inhaber & Geschäftsführer' })}
            icon="person"
            variant="highlight"
          >
            <p className="font-bold text-gray-900">{t('impressum.representative.name', { defaultValue: 'Umutcan Emre Tezgel' })}</p>
            <p className="text-sm text-gray-500 mt-1">{t('impressum.representative.role', { defaultValue: 'Einzelunternehmer, vollumfänglich vertretungsberechtigt' })}</p>
          </LegalInfoCard>

          <LegalInfoCard
            title={t('impressum.profession.title', { defaultValue: 'Berufsbezeichnung' })}
            icon="work"
          >
            <p className="font-medium text-gray-900">{t('impressum.profession.desc', { defaultValue: 'Webdesigner & Entwickler' })}</p>
            <p className="text-sm text-gray-500 mt-1">{t('impressum.profession.type', { defaultValue: 'Freiberufliche Tätigkeit / Einzelunternehmer' })}</p>
          </LegalInfoCard>
        </div>
      </section>

      {/* 3. Kontaktinformationen */}
      <section id="kontakt" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="3"
          title={t('impressum.sections.kontakt.title', { defaultValue: 'Kontaktinformationen' })}
          subtitle={t('impressum.sections.kontakt.subtitle', { defaultValue: 'So erreichen Sie uns' })}
        />

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Email Card */}
          <a
            href="mailto:umut@codayweb.de"
            className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Icon name="mail" className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">E-Mail</h4>
            <p className="text-primary font-medium">umut@codayweb.de</p>
            <p className="text-sm text-gray-500 mt-2">{t('impressum.contact.email_note', { defaultValue: 'Antwort innerhalb 24h' })}</p>
          </a>

          {/* Phone Card */}
          <a
            href="tel:+4917641195301"
            className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
              <Icon name="phone" className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Telefon</h4>
            <p className="text-green-600 font-medium">+49 176 41195301</p>
            <p className="text-sm text-gray-500 mt-2">{t('impressum.contact.phone_note', { defaultValue: 'Mo-Fr: 9:00 - 18:00 Uhr' })}</p>
          </a>

          {/* Website Card */}
          <a
            href="https://www.codayweb.de"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-primary/30 transition-all"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <Icon name="globe" className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Website</h4>
            <p className="text-blue-600 font-medium">www.codayweb.de</p>
            <p className="text-sm text-gray-500 mt-2">{t('impressum.contact.web_note', { defaultValue: 'Besuchen Sie uns online' })}</p>
          </a>
        </div>

        {/* Map Placeholder */}
        <div className="bg-slate-100 rounded-2xl h-48 flex items-center justify-center border border-slate-200">
          <div className="text-center text-gray-500">
            <Icon name="location" className="w-8 h-8 mx-auto mb-2" />
            <p className="font-medium">Lessingstraße 4, 35578 Wetzlar</p>
            <p className="text-sm">Deutschland</p>
          </div>
        </div>
      </section>

      {/* 4. Regulatorische Angaben */}
      <section id="regulatorisch" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="4"
          title={t('impressum.sections.regulatorisch.title', { defaultValue: 'Regulatorische Angaben' })}
          subtitle={t('impressum.sections.regulatorisch.subtitle', { defaultValue: 'Steuer- und Handelsregister' })}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <LegalInfoCard
            title={t('impressum.tax.title', { defaultValue: 'Steuernummer' })}
            icon="receipt"
          >
            <p className="font-mono text-lg text-gray-900">{t('impressum.tax.number', { defaultValue: '039 874 00784' })}</p>
            <p className="text-sm text-gray-500 mt-1">{t('impressum.tax.authority', { defaultValue: 'Finanzamt Wetzlar' })}</p>
          </LegalInfoCard>

          <LegalInfoCard
            title={t('impressum.ust.title', { defaultValue: 'Umsatzsteuer-ID' })}
            icon="description"
          >
            <p className="font-medium text-gray-900">{t('impressum.ust.status', { defaultValue: 'Nicht vorhanden' })}</p>
            <p className="text-sm text-gray-500 mt-1">{t('impressum.ust.note', { defaultValue: 'Kleinunternehmerregelung nach § 19 UStG' })}</p>
          </LegalInfoCard>
        </div>

        <LegalAlertBox variant="info" title={t('impressum.registration.title', { defaultValue: 'Handelsregister' })}>
          {t('impressum.registration.note', {
            defaultValue: 'Als Einzelunternehmer ohne Kaufmannseigenschaft besteht keine Eintragungspflicht im Handelsregister.'
          })}
        </LegalAlertBox>
      </section>

      {/* 5. Berufliche Qualifikationen */}
      <section id="qualifikation" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="5"
          title={t('impressum.sections.qualifikation.title', { defaultValue: 'Berufliche Qualifikationen' })}
          subtitle={t('impressum.sections.qualifikation.subtitle', { defaultValue: 'Expertise und Zertifizierungen' })}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="code" className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900">{t('impressum.skills.webdev', { defaultValue: 'Webentwicklung' })}</h4>
            </div>
            <p className="text-sm text-gray-600">{t('impressum.skills.webdev_desc', { defaultValue: 'React, Next.js, TypeScript, Node.js, Tailwind CSS' })}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Icon name="palette" className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900">{t('impressum.skills.design', { defaultValue: 'UI/UX Design' })}</h4>
            </div>
            <p className="text-sm text-gray-600">{t('impressum.skills.design_desc', { defaultValue: 'Figma, Adobe XD, User Research, Design Systems' })}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Icon name="trending_up" className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900">{t('impressum.skills.seo', { defaultValue: 'SEO & Marketing' })}</h4>
            </div>
            <p className="text-sm text-gray-600">{t('impressum.skills.seo_desc', { defaultValue: 'Suchmaschinenoptimierung, Content-Strategie, Analytics' })}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Icon name="smart_toy" className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="font-bold text-gray-900">{t('impressum.skills.ai', { defaultValue: 'KI-Integration' })}</h4>
            </div>
            <p className="text-sm text-gray-600">{t('impressum.skills.ai_desc', { defaultValue: 'Chatbots, AI-Assistenten, Automatisierung' })}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Icon name="database" className="w-5 h-5 text-cyan-600" />
              </div>
              <h4 className="font-bold text-gray-900">{t('impressum.skills.backend', { defaultValue: 'Backend & DB' })}</h4>
            </div>
            <p className="text-sm text-gray-600">{t('impressum.skills.backend_desc', { defaultValue: 'Supabase, PostgreSQL, REST APIs, Serverless' })}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Icon name="shield" className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="font-bold text-gray-900">{t('impressum.skills.security', { defaultValue: 'Security' })}</h4>
            </div>
            <p className="text-sm text-gray-600">{t('impressum.skills.security_desc', { defaultValue: 'DSGVO, SSL/TLS, sichere Authentifizierung' })}</p>
          </div>
        </div>
      </section>

      {/* 6. Unsere Mission */}
      <section id="mission" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="6"
          title={t('impressum.sections.mission.title', { defaultValue: 'Unsere Mission' })}
          subtitle={t('impressum.sections.mission.subtitle', { defaultValue: 'Wofür wir stehen' })}
        />

        <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 border border-secondary/20">
          <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
            {t('impressum.mission.quote', {
              defaultValue: '"Wir entwickeln digitale Lösungen, die nicht nur technisch überzeugen, sondern Menschen begeistern und Unternehmen erfolgreich machen."'
            })}
          </blockquote>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Icon name="favorite" className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{t('impressum.values.passion', { defaultValue: 'Leidenschaft' })}</h4>
              <p className="text-sm text-gray-600">{t('impressum.values.passion_desc', { defaultValue: 'Wir lieben, was wir tun' })}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Icon name="verified" className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{t('impressum.values.quality', { defaultValue: 'Qualität' })}</h4>
              <p className="text-sm text-gray-600">{t('impressum.values.quality_desc', { defaultValue: 'Höchste Standards, immer' })}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Icon name="handshake" className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{t('impressum.values.partnership', { defaultValue: 'Partnerschaft' })}</h4>
              <p className="text-sm text-gray-600">{t('impressum.values.partnership_desc', { defaultValue: 'Zusammenarbeit auf Augenhöhe' })}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Haftungshinweise */}
      <section id="haftung" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="7"
          title={t('impressum.sections.haftung.title', { defaultValue: 'Haftungs- und Urheberrechtshinweise' })}
          subtitle={t('impressum.sections.haftung.subtitle', { defaultValue: 'Rechtliche Hinweise' })}
        />

        <div className="space-y-4">
          <LegalInfoCard
            title={t('impressum.liability.content.title', { defaultValue: 'Haftung für Inhalte' })}
            icon="description"
          >
            {t('impressum.liability.content.desc', {
              defaultValue: 'Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.'
            })}
          </LegalInfoCard>

          <LegalInfoCard
            title={t('impressum.liability.links.title', { defaultValue: 'Haftung für Links' })}
            icon="link"
          >
            {t('impressum.liability.links.desc', {
              defaultValue: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
            })}
          </LegalInfoCard>

          <LegalInfoCard
            title={t('impressum.liability.images.title', { defaultValue: 'Urheberrecht & Bildnachweise' })}
            icon="image"
          >
            {t('impressum.liability.images.desc', {
              defaultValue: 'Alle auf dieser Website verwendeten Inhalte (Texte, Bilder, Grafiken, Code) wurden selbst erstellt oder mithilfe von KI-Generatoren erzeugt. Die Urheberrechte liegen beim Betreiber dieser Website. Eine Vervielfältigung oder Verwendung bedarf der ausdrücklichen Zustimmung.'
            })}
          </LegalInfoCard>
        </div>
      </section>

      {/* 8. Streitbeilegung */}
      <section id="streitbeilegung" className="scroll-mt-32 mb-8">
        <LegalSectionHeader
          number="8"
          title={t('impressum.sections.streitbeilegung.title', { defaultValue: 'Streitbeilegung' })}
          subtitle={t('impressum.sections.streitbeilegung.subtitle', { defaultValue: 'Alternative Konfliktlösung' })}
        />

        <LegalAlertBox variant="info" title={t('impressum.odr.title', { defaultValue: 'Online-Streitbeilegung' })}>
          <p className="mb-3">
            {t('impressum.odr.text', {
              defaultValue: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:'
            })}
          </p>
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </LegalAlertBox>

        <div className="mt-6">
          <p className="leading-relaxed text-gray-600 mb-4">
            {t('impressum.dispute.p1', {
              defaultValue: 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
            })}
          </p>
          <p className="leading-relaxed text-gray-600">
            {t('impressum.dispute.p2', {
              defaultValue: 'Bei Fragen oder Anliegen bitten wir Sie, zunächst direkt mit uns Kontakt aufzunehmen. Wir sind stets bemüht, eine einvernehmliche Lösung zu finden.'
            })}
          </p>
        </div>

        {/* Final Contact CTA */}
        <div className="mt-8 bg-primary/5 rounded-2xl p-6 border border-primary/20 text-center">
          <h4 className="font-bold text-gray-900 mb-2">
            {t('impressum.cta.title', { defaultValue: 'Haben Sie Fragen?' })}
          </h4>
          <p className="text-gray-600 mb-4">
            {t('impressum.cta.text', { defaultValue: 'Wir freuen uns auf Ihre Nachricht.' })}
          </p>
          <a
            href="mailto:umut@codayweb.de"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon name="mail" className="w-5 h-5" />
            Kontakt aufnehmen
          </a>
        </div>
      </section>
    </LegalLayoutV2>
  );
};

export default Impressum;
