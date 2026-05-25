import React from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import { Wheelchair, EnvelopeSimple, ShieldCheck } from '@phosphor-icons/react';

const AccessibilityStatement: React.FC = () => {
  return (
    <>
      <SeoHead
        title="Erklärung zur Barrierefreiheit | Coday Webdesign"
        description="Erklärung zur Barrierefreiheit (BFSG 2025) für die Website codayweb.de."
        noIndex={false}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white min-h-dvh pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <OptimizedIcon icon={Wheelchair} className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-display font-black text-3xl md:text-4xl text-secondary">
                  Erklärung zur Barrierefreiheit
                </h1>
                <p className="text-gray-500 mt-2">Stand: Mai 2026</p>
              </div>
            </div>

            <div className="prose prose-lg prose-primary max-w-none text-gray-700">
              <p>
                Die Coday Webdesign Agentur (nachfolgend „wir“) ist bemüht, ihre Websites im
                Einklang mit den nationalen Rechtsvorschriften zur Umsetzung der Richtlinie (EU)
                2016/2102 des Europäischen Parlaments und des Rates barrierefrei zugänglich zu
                machen, sowie die Anforderungen des Barrierefreiheitsstärkungsgesetzes (BFSG 2025)
                zu erfüllen.
              </p>

              <p>
                Diese Erklärung zur Barrierefreiheit gilt für die unter <strong>codayweb.de</strong>{' '}
                abrufbare Website.
              </p>

              <h2 className="text-2xl font-bold text-secondary mt-10 mb-4 flex items-center gap-2">
                <OptimizedIcon icon={ShieldCheck} className="w-6 h-6 text-green-500" />
                Stand der Vereinbarkeit mit den Anforderungen
              </h2>

              <p>
                Diese Website ist wegen der folgenden Ausnahmen teilweise mit der{' '}
                <strong>BITV 2.0</strong> und den Vorgaben der <strong>WCAG 2.2</strong> (Web
                Content Accessibility Guidelines) auf dem Konformitätslevel <strong>AA</strong>{' '}
                vereinbar.
              </p>

              <p>
                Wir setzen automatisierte Tests (Lighthouse CI, pa11y) und manuelle Überprüfungen
                ein, um ein hohes Maß an Barrierefreiheit zu gewährleisten, einschließlich
                ausreichender Kontrastverhältnisse, Tastaturbedienbarkeit und
                Screenreader-Unterstützung.
              </p>

              <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
                Nicht barrierefreie Inhalte
              </h2>
              <p>
                Die nachstehend aufgeführten Inhalte sind aus den folgenden Gründen derzeit
                möglicherweise nicht vollständig barrierefrei:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>PDF-Dokumente:</strong> Ältere, eingebundene PDF-Dokumente (z.B.
                  Whitepapers) sind eventuell nicht vollständig maschinenlesbar. Wir arbeiten an
                  einer schrittweisen Umstellung auf barrierefreie PDFs.
                </li>
                <li>
                  <strong>Komplexe interaktive Dashboards:</strong> Bestimmte datengetriebene
                  Diagramme können von Screenreadern eventuell noch nicht in vollem Umfang
                  interpretiert werden. Wir evaluieren Alternativtexte und tabellarische Ansichten.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-secondary mt-10 mb-4 flex items-center gap-2">
                <OptimizedIcon icon={EnvelopeSimple} className="w-6 h-6 text-primary" />
                Feedback und Kontaktangaben
              </h2>

              <p>
                Sind Ihnen Mängel beim barrierefreien Zugang zu Inhalten von codayweb.de
                aufgefallen? Oder haben Sie Fragen zum Thema Barrierefreiheit? Dann können Sie sich
                gerne bei uns melden:
              </p>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mt-6">
                <p className="mb-2">
                  <strong>Coday Webdesign</strong>
                </p>
                <p className="mb-2">Musterstraße 123</p>
                <p className="mb-2">12345 Musterstadt</p>
                <p className="mb-2">
                  E-Mail:{' '}
                  <a href="mailto:hello@codayweb.de" className="text-primary hover:underline">
                    hello@codayweb.de
                  </a>
                </p>
              </div>

              <h2 className="text-2xl font-bold text-secondary mt-10 mb-4">
                Durchsetzungsverfahren
              </h2>
              <p>
                Sollten Sie nach Ihrer Anfrage bei uns der Ansicht sein, dass Sie durch eine nicht
                ausreichende barrierefreie Gestaltung unserer Website benachteiligt sind, können Sie
                sich an die zuständige Durchsetzungsstelle wenden. Weitere Informationen zum
                Durchsetzungsverfahren finden Sie auf den Seiten der zuständigen Landesbehörden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessibilityStatement;
