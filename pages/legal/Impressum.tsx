import React from 'react';
import { LegalLayout } from '../../components/LegalLayout';

const Impressum: React.FC = () => {
  const tocItems = [
    { id: 'anbieter', label: 'Anbieter & Kontakt' },
    { id: 'vertreter', label: 'Vertretung & Register' },
    { id: 'haftung', label: 'Haftung & Urheberrecht' },
  ];

  return (
    <LegalLayout title="Impressum" tocItems={tocItems}>
      <p className="font-medium text-gray-500 mb-8">Angaben gemäß § 5 DDG</p>

      <section id="anbieter" className="scroll-mt-32">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 mb-4">Anbieter</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Umutcan Emre Tezgel</strong><br />
              Technologiepark 12<br />
              10115 Berlin<br />
              Deutschland
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 mb-4">Kontakt</h3>
            <p className="text-gray-700 leading-relaxed">
              Telefon: <a href="tel:+493012345678" className="text-primary hover:underline">+49 30 1234 5678</a><br />
              E-Mail: <a href="mailto:umut@codayweb.de" className="text-primary hover:underline">umut@codayweb.de</a><br />
              Web: <a href="https://codayweb.de" className="text-primary hover:underline">www.codayweb.de</a>
            </p>
          </div>
        </div>
      </section>

      <section id="vertreter" className="scroll-mt-32">
        <div className="mb-12 space-y-6">
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Vertreten durch</h3>
            <p className="text-gray-700">Inhaber: Umutcan Emre Tezgel</p>
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900 mb-2">Steuernummer</h3>
            <p className="text-gray-700">
              Steuernummer: 039 874 00784
            </p>
          </div>
        </div>
      </section>

      <hr className="border-gray-100 my-10" />

      <section id="haftung" className="scroll-mt-32">
        <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Haftungs- und Schutzrechtshinweise</h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">Haftung für Inhalte</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">Bildnachweise</h3>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Die auf dieser Website verwendeten Bilder stammen aus folgenden Quellen:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm">
              <li>Unsplash.com (Various Artists)</li>
              <li>Adobe Stock (Lizenznummern auf Anfrage)</li>
            </ul>
          </div>
        </div>
      </section>
    </LegalLayout>
  );
};

export default Impressum;
