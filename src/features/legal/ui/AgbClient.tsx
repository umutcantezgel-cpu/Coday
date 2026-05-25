'use client';
import React from 'react';
import LegalLayoutV2 from '@/widgets/layout/LegalLayoutV2';
import {
  QuickSummary,
  LegalAlertBox,
  LegalInfoCard,
  ExpandableClause,
  LegalTimeline,
  LegalSectionHeader,
} from '@/shared/ui/LegalComponents';
import {
  FileText,
  Books,
  Handshake,
  Wrench,
  Stack,
  CurrencyEur,
  SealCheck,
  Users,
  Copyright,
  Robot,
  ShieldCheck,
  Shield,
  Lock,
  Prohibit,
  Gavel,
  ChatCircle,
  Code,
  Pencil,
  RocketLaunch,
  Browsers,
} from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

export function AgbClient() {
  const t = useTranslations('legal');

  const tocItems = [
    {
      id: 'geltung',
      label: t('terms.toc.geltung', { defaultValue: '§1 Geltungsbereich' }),
      icon: FileText,
    },
    {
      id: 'definitionen',
      label: t('terms.toc.definitionen', { defaultValue: '§2 Definitionen' }),
      icon: Books,
    },
    {
      id: 'vertrag',
      label: t('terms.toc.vertrag', { defaultValue: '§3 Vertragsschluss' }),
      icon: Handshake,
    },
    {
      id: 'leistung',
      label: t('terms.toc.leistung', { defaultValue: '§4 Leistungsumfang' }),
      icon: Wrench,
    },
    {
      id: 'projektablauf',
      label: t('terms.toc.projektablauf', { defaultValue: '§5 Projektablauf' }),
      icon: Stack,
    },
    {
      id: 'preise',
      label: t('terms.toc.preise', { defaultValue: '§6 Preise' }),
      icon: CurrencyEur,
    },
    {
      id: 'festpreis',
      label: t('terms.toc.festpreis', { defaultValue: '§7 Festpreis-Garantie' }),
      icon: SealCheck,
    },
    {
      id: 'mitwirkung',
      label: t('terms.toc.mitwirkung', { defaultValue: '§8 Mitwirkungspflichten' }),
      icon: Users,
    },
    {
      id: 'eigentum',
      label: t('terms.toc.eigentum', { defaultValue: '§9 Geistiges Eigentum' }),
      icon: Copyright,
    },
    { id: 'ki', label: t('terms.toc.ki', { defaultValue: '§10 KI-Dienste' }), icon: Robot },
    {
      id: 'gewaehrleistung',
      label: t('terms.toc.gewaehrleistung', { defaultValue: '§11 Gewährleistung' }),
      icon: ShieldCheck,
    },
    {
      id: 'haftung',
      label: t('terms.toc.haftung', { defaultValue: '§12 Haftung' }),
      icon: Shield,
    },
    {
      id: 'vertraulichkeit',
      label: t('terms.toc.vertraulichkeit', { defaultValue: '§13 Vertraulichkeit' }),
      icon: Lock,
    },
    {
      id: 'kuendigung',
      label: t('terms.toc.kuendigung', { defaultValue: '§14 Kündigung' }),
      icon: Prohibit,
    },
    {
      id: 'schluss',
      label: t('terms.toc.schluss', { defaultValue: '§15 Schlussbestimmungen' }),
      icon: Gavel,
    },
  ];

  const projectTimelineItems = [
    {
      title: t('terms.timeline.inquiry', { defaultValue: 'Anfrage & Erstgespräch' }),
      description: t('terms.timeline.inquiry_desc', {
        defaultValue: 'Kostenlose Erstberatung und Projektbesprechung',
      }),
      icon: ChatCircle,
      status: 'completed' as const,
    },
    {
      title: t('terms.timeline.offer', { defaultValue: 'Angebot erhalten' }),
      description: t('terms.timeline.offer_desc', {
        defaultValue: 'Detailliertes Angebot mit Festpreis-Garantie',
      }),
      icon: FileText,
      status: 'completed' as const,
    },
    {
      title: t('terms.timeline.contract', { defaultValue: 'Vertragsabschluss' }),
      description: t('terms.timeline.contract_desc', {
        defaultValue: '50% Anzahlung, Projektstart',
      }),
      icon: Handshake,
      status: 'current' as const,
    },
    {
      title: t('terms.timeline.design', { defaultValue: 'Design & Entwicklung' }),
      description: t('terms.timeline.design_desc', {
        defaultValue: 'Iterative Entwicklung mit Zwischenabnahmen',
      }),
      icon: Code,
      status: 'upcoming' as const,
    },
    {
      title: t('terms.timeline.review', { defaultValue: 'Review & Revisionen' }),
      description: t('terms.timeline.review_desc', {
        defaultValue: 'Bis zu 3 Revisionsrunden inklusive',
      }),
      icon: Pencil,
      status: 'upcoming' as const,
    },
    {
      title: t('terms.timeline.handover', { defaultValue: 'Übergabe & Launch' }),
      description: t('terms.timeline.handover_desc', {
        defaultValue: 'Finaler Launch, Schulung, 30 Tage Support',
      }),
      icon: RocketLaunch,
      status: 'upcoming' as const,
    },
  ];

  return (
    <LegalLayoutV2
      title={t('terms.title', { defaultValue: 'Allgemeine Geschäftsbedingungen' })}
      subtitle={t('terms.subtitle', {
        defaultValue: 'Transparente Bedingungen für eine erfolgreiche Zusammenarbeit',
      })}
      lastUpdated={t('terms.last_updated', {
        date: '09.02.2026',
        defaultValue: 'Stand: 09.02.2026',
      })}
      tocItems={tocItems}
      pageType="terms"
      version="2.0"
    >
      {/* Quick Summary */}
      <QuickSummary
        title={t('terms.summary.title', { defaultValue: 'Das Wichtigste auf einen Blick' })}
        items={[
          t('terms.summary.1', {
            defaultValue: 'Festpreis-Garantie: Der genannte Preis ist verbindlich',
          }),
          t('terms.summary.2', { defaultValue: '30 Tage Fehlerbehebungs-Garantie nach Übergabe' }),
          t('terms.summary.3', {
            defaultValue: 'Bis zu 3 Revisionsrunden im Leistungsumfang enthalten',
          }),
          t('terms.summary.4', {
            defaultValue: 'Transparente Kommunikation während des gesamten Projekts',
          }),
          t('terms.summary.5', { defaultValue: 'Deutsches Recht, Gerichtsstand Wetzlar' }),
        ]}
      />

      {/* §1 Geltungsbereich */}
      <section id="geltung" className="scroll-mt-32 mt-12 mb-16">
        <LegalSectionHeader
          number="§1"
          title={t('terms.sections.1.title', { defaultValue: 'Geltungsbereich' })}
          subtitle={t('terms.sections.1.subtitle', {
            defaultValue: 'Anwendungsbereich dieser Bedingungen',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.1.p1', {
            defaultValue:
              '(1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") von Umutcan Emre Tezgel, Lessingstraße 4, 35578 Wetzlar (nachfolgend „Anbieter"), gelten für alle Verträge über Webdesign-, Webentwicklungs- und digitale Dienstleistungen, die zwischen dem Anbieter und seinen Kunden (nachfolgend „Auftraggeber") geschlossen werden.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.1.p2', {
            defaultValue:
              '(2) Maßgebend ist die zum Zeitpunkt des Vertragsschlusses gültige Fassung der AGB. Abweichende Geschäftsbedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600">
          {t('terms.sections.1.p3', {
            defaultValue:
              '(3) Diese AGB gelten sowohl für Verbraucher als auch für Unternehmer im Sinne des § 14 BGB.',
          })}
        </p>
      </section>

      {/* §2 Definitionen */}
      <section id="definitionen" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§2"
          title={t('terms.sections.2_def.title', { defaultValue: 'Definitionen' })}
          subtitle={t('terms.sections.2_def.subtitle', {
            defaultValue: 'Begriffserklärungen für diese AGB',
          })}
        />

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <LegalInfoCard
            title={t('terms.definitions.provider_title', { defaultValue: 'Anbieter' })}
            icon={Users}
          >
            {t('terms.definitions.provider', {
              defaultValue: 'Umutcan Emre Tezgel, handelnd unter „Coday", mit Sitz in Wetzlar.',
            })}
          </LegalInfoCard>
          <LegalInfoCard
            title={t('terms.definitions.client_title', { defaultValue: 'Auftraggeber' })}
            icon={Users}
          >
            {t('terms.definitions.client', {
              defaultValue:
                'Natürliche oder juristische Person, die Leistungen des Anbieters in Anspruch nimmt.',
            })}
          </LegalInfoCard>
          <LegalInfoCard
            title={t('terms.definitions.project_title', { defaultValue: 'Projekt' })}
            icon={Books}
          >
            {t('terms.definitions.project', {
              defaultValue:
                'Die im Angebot definierte Gesamtheit aller zu erbringenden Leistungen.',
            })}
          </LegalInfoCard>
          <LegalInfoCard
            title={t('terms.definitions.revision_title', { defaultValue: 'Revision' })}
            icon={Pencil}
          >
            {t('terms.definitions.revision', {
              defaultValue:
                'Änderungsrunde zur Anpassung von Design oder Funktionalität nach Zwischenabnahme.',
            })}
          </LegalInfoCard>
        </div>
      </section>

      {/* §3 Vertragsschluss */}
      <section id="vertrag" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§3"
          title={t('terms.sections.2.title', { defaultValue: 'Vertragsschluss' })}
          subtitle={t('terms.sections.2.subtitle', {
            defaultValue: 'Wie ein Vertrag zustande kommt',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.2.p1', {
            defaultValue:
              '(1) Die auf der Website dargestellten Leistungsbeschreibungen und Preisangaben stellen kein verbindliches Angebot dar, sondern eine Aufforderung zur Abgabe eines Angebots (invitatio ad offerendum).',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.2.p2', {
            defaultValue:
              '(2) Durch Absenden einer Projektanfrage über das Kontaktformular oder per E-Mail gibt der Auftraggeber ein unverbindliches Angebot ab.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.2.p3', {
            defaultValue:
              '(3) Ein Vertrag kommt erst durch die Unterzeichnung eines schriftlichen Angebots durch beide Parteien oder durch ausdrückliche schriftliche Annahme per E-Mail zustande.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600">
          {t('terms.sections.2.p4', {
            defaultValue:
              '(4) Der Anbieter speichert den Vertragstext und sendet dem Auftraggeber eine Bestätigung per E-Mail. Der Vertragstext ist für den Auftraggeber nach Vertragsschluss nicht mehr zugänglich außer auf Anfrage.',
          })}
        </p>
      </section>

      {/* §4 Leistungsumfang */}
      <section id="leistung" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§4"
          title={t('terms.sections.3.title', { defaultValue: 'Leistungsumfang' })}
          subtitle={t('terms.sections.3.subtitle', {
            defaultValue: 'Was unsere Dienstleistungen umfassen',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.3.p1', {
            defaultValue:
              '(1) Der Anbieter erbringt Webdesign-, Webentwicklungs- und digitale Marketingdienstleistungen gemäß dem individuellen Angebot. Dazu können gehören:',
          })}
        </p>

        <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-6">
          <li>
            {t('terms.services.list.1', {
              defaultValue: 'Konzeption und Design von Websites und Web-Applikationen',
            })}
          </li>
          <li>
            {t('terms.services.list.2', { defaultValue: 'Frontend- und Backend-Entwicklung' })}
          </li>
          <li>
            {t('terms.services.list.3', { defaultValue: 'Content-Erstellung und -Optimierung' })}
          </li>
          <li>{t('terms.services.list.4', { defaultValue: 'Suchmaschinenoptimierung (SEO)' })}</li>
          <li>
            {t('terms.services.list.5', {
              defaultValue: 'Hosting-Setup und technische Einrichtung',
            })}
          </li>
          <li>
            {t('terms.services.list.6', {
              defaultValue: 'Wartung und Support (nach Vereinbarung)',
            })}
          </li>
        </ul>

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.3.p2', {
            defaultValue:
              '(2) Die Anzahl der im Angebot vereinbarten Revisionsrunden ist verbindlich. Standardmäßig sind bis zu drei (3) Revisionsrunden im Leistungsumfang enthalten.',
          })}
        </p>

        <LegalAlertBox
          variant="success"
          title={t('terms.guarantee.title', { defaultValue: '30-Tage-Garantie' })}
        >
          {t('terms.sections.3.p3', {
            defaultValue:
              'Der Anbieter gewährt eine 30-tägige Fehlerbehebungs-Garantie ab Projektübergabe. Technische Fehler, die auf die Arbeit des Anbieters zurückzuführen sind, werden kostenlos behoben.',
          })}
        </LegalAlertBox>
      </section>

      {/* §5 Projektablauf */}
      <section id="projektablauf" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§5"
          title={t('terms.sections.projektablauf.title', {
            defaultValue: 'Projektablauf & Meilensteine',
          })}
          subtitle={t('terms.sections.projektablauf.subtitle', {
            defaultValue: 'Typischer Ablauf eines Projekts',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-6">
          {t('terms.sections.projektablauf.intro', {
            defaultValue:
              'Jedes Projekt durchläuft einen strukturierten Prozess, um höchste Qualität und transparente Kommunikation zu gewährleisten:',
          })}
        </p>

        <LegalTimeline
          items={projectTimelineItems}
          title={t('terms.timeline.title', { defaultValue: 'Projekt-Timeline' })}
        />

        <ExpandableClause
          title={t('terms.projektablauf.communication.title', {
            defaultValue: 'Kommunikation während des Projekts',
          })}
        >
          <p className="mb-2">
            {t('terms.projektablauf.communication.1', {
              defaultValue:
                'Der Auftraggeber erhält regelmäßige Updates über den Projektfortschritt per E-Mail.',
            })}
          </p>
          <p className="mb-2">
            {t('terms.projektablauf.communication.2', {
              defaultValue: 'Zwischenstände werden über einen Staging-Link zur Verfügung gestellt.',
            })}
          </p>
          <p>
            {t('terms.projektablauf.communication.3', {
              defaultValue:
                'Feedback sollte idealerweise gesammelt und nicht in Einzelnachrichten übermittelt werden.',
            })}
          </p>
        </ExpandableClause>
      </section>

      {/* §6 Preise */}
      <section id="preise" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§6"
          title={t('terms.sections.4.title', { defaultValue: 'Preise & Zahlungsbedingungen' })}
          subtitle={t('terms.sections.4.subtitle', {
            defaultValue: 'Transparente Preisgestaltung',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.4.p1', {
            defaultValue:
              '(1) Alle im Angebot genannten Preise sind Nettopreise zuzüglich der gesetzlichen Mehrwertsteuer von derzeit 19%.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.4.p2', {
            defaultValue: '(2) Die Zahlung erfolgt in der Regel in zwei Raten:',
          })}
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <LegalInfoCard
            title={t('terms.payment.first_title', { defaultValue: '1. Rate' })}
            icon={CurrencyEur}
            variant="highlight"
          >
            <strong>50%</strong>{' '}
            {t('terms.payment.first', {
              defaultValue: 'bei Auftragserteilung / Vertragsunterzeichnung',
            })}
          </LegalInfoCard>
          <LegalInfoCard
            title={t('terms.payment.second_title', { defaultValue: '2. Rate' })}
            icon={CurrencyEur}
            variant="highlight"
          >
            <strong>50%</strong>{' '}
            {t('terms.payment.second', { defaultValue: 'nach Fertigstellung und vor Übergabe' })}
          </LegalInfoCard>
        </div>

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.4.p3', {
            defaultValue:
              '(3) Bei größeren Projekten können abweichende Zahlungsmodalitäten (z.B. Dreiteilung) vereinbart werden.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600">
          {t('terms.sections.4.p4', {
            defaultValue:
              '(4) Rechnungen sind innerhalb von 14 Tagen nach Erhalt ohne Abzug zahlbar. Bei Zahlungsverzug werden Verzugszinsen in Höhe von 5 Prozentpunkten über dem Basiszinssatz berechnet.',
          })}
        </p>
      </section>

      {/* §7 Festpreis-Garantie */}
      <section id="festpreis" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§7"
          title={t('terms.sections.festpreis.title', { defaultValue: 'Festpreis-Garantie' })}
          subtitle={t('terms.sections.festpreis.subtitle', {
            defaultValue: 'Keine versteckten Kosten',
          })}
        />

        <LegalAlertBox
          variant="success"
          title={t('terms.festpreis.guarantee', { defaultValue: 'Unsere Garantie' })}
        >
          {t('terms.festpreis.text', {
            defaultValue:
              'Der im Angebot genannte Preis ist ein verbindlicher Festpreis. Er ändert sich nicht, solange keine zusätzlichen Leistungen beauftragt werden, die über den ursprünglichen Leistungsumfang hinausgehen.',
          })}
        </LegalAlertBox>

        <div className="mt-6">
          <p className="leading-relaxed text-gray-600 mb-4">
            {t('terms.festpreis.p1', {
              defaultValue:
                '(1) Der Festpreis umfasst alle im Angebot definierten Leistungen, einschließlich der vereinbarten Revisionsrunden.',
            })}
          </p>
          <p className="leading-relaxed text-gray-600 mb-4">
            {t('terms.festpreis.p2', {
              defaultValue:
                '(2) Zusätzliche Leistungen, die über das ursprüngliche Angebot hinausgehen, werden separat angeboten und berechnet. Eine schriftliche Beauftragung ist erforderlich.',
            })}
          </p>
          <p className="leading-relaxed text-gray-600">
            {t('terms.festpreis.p3', {
              defaultValue:
                '(3) Änderungen am Projektumfang durch den Auftraggeber können zu Preisanpassungen führen. Der Anbieter informiert hierüber vorab.',
            })}
          </p>
        </div>
      </section>

      {/* §8 Mitwirkungspflichten */}
      <section id="mitwirkung" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§8"
          title={t('terms.sections.mitwirkung.title', {
            defaultValue: 'Mitwirkungspflichten des Auftraggebers',
          })}
          subtitle={t('terms.sections.mitwirkung.subtitle', {
            defaultValue: 'Für eine erfolgreiche Zusammenarbeit',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.mitwirkung.intro', {
            defaultValue:
              'Der Auftraggeber stellt sicher, dass die für die Durchführung des Projekts erforderlichen Materialien und Informationen rechtzeitig zur Verfügung gestellt werden:',
          })}
        </p>

        <div className="space-y-4 mb-6">
          <ExpandableClause
            title={t('terms.mitwirkung.content.title', { defaultValue: 'Inhalte & Materialien' })}
            defaultOpen
          >
            <ul className="list-disc pl-5 space-y-1">
              <li>
                {t('terms.mitwirkung.content.1', {
                  defaultValue: 'Texte, Bilder, Logos in druckfähiger Qualität',
                })}
              </li>
              <li>
                {t('terms.mitwirkung.content.2', {
                  defaultValue: 'Zugangsdaten zu bestehenden Systemen (bei Bedarf)',
                })}
              </li>
              <li>
                {t('terms.mitwirkung.content.3', {
                  defaultValue: 'Styleguide oder Corporate Design Richtlinien (falls vorhanden)',
                })}
              </li>
            </ul>
          </ExpandableClause>

          <ExpandableClause
            title={t('terms.mitwirkung.feedback.title', { defaultValue: 'Feedback & Abnahmen' })}
          >
            <ul className="list-disc pl-5 space-y-1">
              <li>
                {t('terms.mitwirkung.feedback.1', {
                  defaultValue:
                    'Zeitnahe Rückmeldung zu Zwischenständen (idealerweise innerhalb von 5 Werktagen)',
                })}
              </li>
              <li>
                {t('terms.mitwirkung.feedback.2', {
                  defaultValue: 'Klare und konkrete Änderungswünsche',
                })}
              </li>
              <li>
                {t('terms.mitwirkung.feedback.3', {
                  defaultValue: 'Benennung eines Ansprechpartners für Rückfragen',
                })}
              </li>
            </ul>
          </ExpandableClause>
        </div>

        <LegalAlertBox
          variant="warning"
          title={t('terms.mitwirkung.delay.title', { defaultValue: 'Verzögerungen' })}
        >
          {t('terms.mitwirkung.delay.text', {
            defaultValue:
              'Verzögerungen, die auf verspätete Zulieferung von Materialien oder fehlendes Feedback zurückzuführen sind, können den Projektzeitplan beeinflussen. Der Anbieter ist in diesem Fall nicht für Terminverzögerungen verantwortlich.',
          })}
        </LegalAlertBox>
      </section>

      {/* §9 Geistiges Eigentum */}
      <section id="eigentum" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§9"
          title={t('terms.sections.eigentum.title', {
            defaultValue: 'Geistiges Eigentum & Urheberrecht',
          })}
          subtitle={t('terms.sections.eigentum.subtitle', {
            defaultValue: 'Rechte an den erstellten Werken',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.eigentum.p1', {
            defaultValue:
              '(1) Mit vollständiger Bezahlung gehen alle Nutzungsrechte an den erstellten Werken auf den Auftraggeber über. Dies umfasst das Recht zur unbeschränkten Nutzung für geschäftliche Zwecke.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.eigentum.p2', {
            defaultValue:
              '(2) Das Urheberrecht verbleibt beim Anbieter. Der Anbieter behält sich vor, die erstellten Werke zu Referenzzwecken im eigenen Portfolio zu präsentieren, sofern keine Vertraulichkeitsvereinbarung besteht.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.eigentum.p3', {
            defaultValue:
              '(3) Quelldateien (z.B. Design-Dateien in Figma, Sketch oder Adobe XD) werden nur übergeben, wenn dies ausdrücklich vereinbart wurde.',
          })}
        </p>

        <LegalInfoCard
          title={t('terms.eigentum.code.title', { defaultValue: 'Quellcode' })}
          icon={Code}
          variant="highlight"
        >
          {t('terms.eigentum.code.text', {
            defaultValue:
              'Der Quellcode der entwickelten Website oder Applikation wird dem Auftraggeber bei Projektabschluss zur Verfügung gestellt, sofern nicht anders vereinbart.',
          })}
        </LegalInfoCard>
      </section>

      {/* §10 KI-Dienste */}
      <section id="ki" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§10"
          title={t('terms.sections.5.title', { defaultValue: 'KI-Dienste & Automatisierung' })}
          subtitle={t('terms.sections.5.subtitle', { defaultValue: 'Nutzung von KI-Technologien' })}
        />

        <LegalAlertBox
          variant="warning"
          title={t('terms.ki.note', { defaultValue: 'Wichtiger Hinweis' })}
        >
          {t('terms.sections.5.note', {
            defaultValue:
              'Der auf dieser Website verfügbare KI-Assistent „Codi" sowie der Website-Analyzer nutzen automatisierte Systeme zur Verarbeitung von Anfragen.',
          })}
        </LegalAlertBox>

        <div className="mt-6 space-y-4">
          <p className="leading-relaxed text-gray-600">
            {t('terms.sections.5.p1', {
              defaultValue:
                '(1) Die KI-Dienste dienen ausschließlich zu Informationszwecken und stellen keine rechtliche, medizinische oder finanzielle Beratung dar.',
            })}
          </p>
          <p className="leading-relaxed text-gray-600">
            {t('terms.sections.5.p2', {
              defaultValue:
                '(2) Automatisch generierte Inhalte wurden maschinell erstellt und können Fehler enthalten.',
            })}
          </p>
          <p className="leading-relaxed text-gray-600">
            {t('terms.sections.5.p3', {
              defaultValue:
                '(3) Der Anbieter übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der KI-generierten Informationen.',
            })}
          </p>
          <p className="leading-relaxed text-gray-600">
            {t('terms.sections.5.p4', {
              defaultValue:
                '(4) Jegliche Haftung für Schäden, die aus der Nutzung von KI-generierten Inhalten entstehen, ist ausgeschlossen, soweit gesetzlich zulässig.',
            })}
          </p>
        </div>

        <div className="mt-6">
          <p className="leading-relaxed text-gray-600 mb-2">
            {t('terms.ki.not_for', {
              defaultValue: 'KI-Antworten sind insbesondere nicht geeignet für:',
            })}
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>{t('terms.sections.5.list.1', { defaultValue: 'Finanzielle Entscheidungen' })}</li>
            <li>{t('terms.sections.5.list.2', { defaultValue: 'Geschäftliche Strategien' })}</li>
            <li>{t('terms.sections.5.list.3', { defaultValue: 'Rechtliche Maßnahmen' })}</li>
            <li>
              {t('terms.sections.5.list.4', { defaultValue: 'Gesundheitsbezogene Entscheidungen' })}
            </li>
          </ul>
        </div>
      </section>

      {/* §11 Gewährleistung */}
      <section id="gewaehrleistung" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§11"
          title={t('terms.sections.gewaehrleistung.title', {
            defaultValue: 'Gewährleistung & Mängelansprüche',
          })}
          subtitle={t('terms.sections.gewaehrleistung.subtitle', {
            defaultValue: 'Unsere Qualitätsstandards',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.gewaehrleistung.p1', {
            defaultValue:
              '(1) Der Anbieter gewährleistet, dass die erbrachten Leistungen dem vereinbarten Funktionsumfang entsprechen und fachgerecht ausgeführt werden.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.gewaehrleistung.p2', {
            defaultValue:
              '(2) Mängel sind dem Anbieter unverzüglich nach Entdeckung schriftlich mitzuteilen. Der Anbieter wird berechtigte Mängel im Rahmen der Nacherfüllung kostenlos beseitigen.',
          })}
        </p>

        <LegalInfoCard
          title={t('terms.gewaehrleistung.browser.title', {
            defaultValue: 'Browser-Kompatibilität',
          })}
          icon={Browsers}
        >
          {t('terms.gewaehrleistung.browser.text', {
            defaultValue:
              'Websites werden für die aktuellen Versionen von Chrome, Firefox, Safari und Edge optimiert. Die Unterstützung älterer Browserversionen kann separat vereinbart werden.',
          })}
        </LegalInfoCard>

        <p className="leading-relaxed text-gray-600 mt-4">
          {t('terms.gewaehrleistung.p3', {
            defaultValue:
              '(3) Die Gewährleistungsfrist beträgt 12 Monate ab Projektübergabe, sofern nicht anders vereinbart.',
          })}
        </p>
      </section>

      {/* §12 Haftung */}
      <section id="haftung" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§12"
          title={t('terms.sections.6.title', { defaultValue: 'Haftungsbeschränkung' })}
          subtitle={t('terms.sections.6.subtitle', { defaultValue: 'Umfang unserer Haftung' })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.6.p1', {
            defaultValue:
              '(1) Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.6.p2', {
            defaultValue:
              '(2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.6.p3', {
            defaultValue:
              '(3) Eine weitergehende Haftung ist ausgeschlossen, soweit gesetzlich zulässig.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600">
          {t('terms.sections.6.p4', {
            defaultValue:
              '(4) Die Haftungsbeschränkungen gelten auch zugunsten der Erfüllungsgehilfen des Anbieters.',
          })}
        </p>
      </section>

      {/* §13 Vertraulichkeit */}
      <section id="vertraulichkeit" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§13"
          title={t('terms.sections.vertraulichkeit.title', { defaultValue: 'Vertraulichkeit' })}
          subtitle={t('terms.sections.vertraulichkeit.subtitle', {
            defaultValue: 'Schutz sensibler Informationen',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.vertraulichkeit.p1', {
            defaultValue:
              '(1) Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen vertraulichen Informationen geheim zu halten und nicht an Dritte weiterzugeben.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.vertraulichkeit.p2', {
            defaultValue:
              '(2) Vertrauliche Informationen umfassen insbesondere Geschäftsgeheimnisse, Kundendaten, technische Details und unveröffentlichte Marketingstrategien.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600">
          {t('terms.vertraulichkeit.p3', {
            defaultValue:
              '(3) Diese Verpflichtung gilt auch nach Beendigung des Vertragsverhältnisses fort.',
          })}
        </p>
      </section>

      {/* §14 Kündigung */}
      <section id="kuendigung" className="scroll-mt-32 mb-16">
        <LegalSectionHeader
          number="§14"
          title={t('terms.sections.kuendigung.title', { defaultValue: 'Kündigung & Rücktritt' })}
          subtitle={t('terms.sections.kuendigung.subtitle', {
            defaultValue: 'Beendigung des Vertrags',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.kuendigung.p1', {
            defaultValue:
              '(1) Bei projektbezogenen Verträgen ist eine ordentliche Kündigung nicht vorgesehen. Der Vertrag endet mit Abschluss des Projekts.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.kuendigung.p2', {
            defaultValue:
              '(2) Bei Wartungs- oder Supportverträgen kann mit einer Frist von 30 Tagen zum Monatsende gekündigt werden.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.kuendigung.p3', {
            defaultValue:
              '(3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.',
          })}
        </p>

        <LegalAlertBox
          variant="info"
          title={t('terms.kuendigung.cancellation.title', {
            defaultValue: 'Projektabbruch durch Auftraggeber',
          })}
        >
          {t('terms.kuendigung.cancellation.text', {
            defaultValue:
              'Bei Kündigung durch den Auftraggeber werden die bis dahin erbrachten Leistungen in Rechnung gestellt. Die Anzahlung (50%) ist nicht erstattungsfähig.',
          })}
        </LegalAlertBox>
      </section>

      {/* §15 Schlussbestimmungen */}
      <section id="schluss" className="scroll-mt-32 mb-8">
        <LegalSectionHeader
          number="§15"
          title={t('terms.sections.7.title', { defaultValue: 'Schlussbestimmungen' })}
          subtitle={t('terms.sections.7.subtitle', {
            defaultValue: 'Rechtliche Rahmenbedingungen',
          })}
        />

        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.7.p1', {
            defaultValue:
              '(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.7.p2', {
            defaultValue:
              '(2) Gerichtsstand für alle Streitigkeiten ist Wetzlar, sofern der Auftraggeber Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.7.p3', {
            defaultValue:
              '(3) Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.',
          })}
        </p>
        <p className="leading-relaxed text-gray-600 mb-4">
          {t('terms.sections.7.p4', {
            defaultValue:
              '(4) Änderungen und Ergänzungen dieses Vertrages bedürfen der Schriftform. Dies gilt auch für die Aufhebung dieses Schriftformerfordernisses.',
          })}
        </p>

        <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-gray-700 mb-2">
            {t('terms.sections.7.p5', {
              defaultValue: 'Bei Fragen zu diesen AGB kontaktieren Sie uns gerne:',
            })}
          </p>
          <a href="mailto:umut@codayweb.de" className="text-primary hover:underline font-medium">
            umut@codayweb.de
          </a>
        </div>
      </section>
    </LegalLayoutV2>
  );
};
