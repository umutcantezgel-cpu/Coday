import React from 'react';
import { LegalLayout } from '../../components/LegalLayout';

const Privacy: React.FC = () => {
    const tocItems = [
        { id: 'verantwortlicher', label: '1. Verantwortlicher' },
        { id: 'erhebung', label: '2. Datenerfassung' },
        { id: 'zwecke', label: '3. Zwecke der Verarbeitung' },
        { id: 'weitergabe', label: '4. Weitergabe von Daten' },
        { id: 'analyse', label: '5. Analyse-Tools' },
        { id: 'rechte', label: '6. Betroffenenrechte' },
        { id: 'sicherheit', label: '7. Datensicherheit' },
    ];

    return (
        <LegalLayout
            title="Datenschutz"
            subtitle={<span className="text-primary">erklärung</span>}
            lastUpdated="24. Oktober 2023"
            tocItems={tocItems}
        >
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Nachfolgend informieren wir Sie über die Erhebung, Verarbeitung und Nutzung Ihrer Daten gemäß der Datenschutz-Grundverordnung (DSGVO).
            </p>

            <section id="verantwortlicher" className="scroll-mt-32 mb-16">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    1. Name und Kontaktdaten des Verantwortlichen
                </h2>
                <p>Diese Datenschutz-Information gilt für die Datenverarbeitung durch:</p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 my-6">
                    <p className="font-bold text-gray-900 m-0">Coday GmbH</p>
                    <p className="m-0">Musterstraße 42<br />
                        10115 Berlin<br />
                        Deutschland</p>
                    <p className="mt-4 mb-0">
                        <strong>Email:</strong> <a href="mailto:privacy@agency-domination.de" className="text-primary hover:underline">privacy@agency-domination.de</a><br />
                        <strong>Telefon:</strong> +49 (0) 30 12345678
                    </p>
                </div>
            </section>

            <section id="erhebung" className="scroll-mt-32 mb-16">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    2. Erhebung und Speicherung personenbezogener Daten
                </h2>
                <h4 className="font-bold text-gray-900 mt-6 mb-3">a) Beim Besuch der Website</h4>
                <p>Beim Aufrufen unserer Website www.agency-domination.de werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sog. Logfile gespeichert.</p>

                <h4 className="font-bold text-gray-900 mt-8 mb-3">b) Bei Nutzung unseres Kontaktformulars</h4>
                <p>Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der Website bereitgestelltes Formular Kontakt aufzunehmen.</p>
            </section>

            <section id="zwecke" className="scroll-mt-32 mb-16">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    3. Zwecke der Datenverarbeitung
                </h2>
                <ul className="grid sm:grid-cols-2 gap-4 mt-6 list-none pl-0">
                    <li className="flex items-start bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <span className="material-symbols-outlined text-primary mr-3 text-sm mt-1">check_circle</span>
                        <span>Gewährleistung eines reibungslosen Verbindungsaufbaus der Website.</span>
                    </li>
                    <li className="flex items-start bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <span className="material-symbols-outlined text-primary mr-3 text-sm mt-1">check_circle</span>
                        <span>Gewährleistung einer komfortablen Nutzung unserer Website.</span>
                    </li>
                    <li className="flex items-start bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <span className="material-symbols-outlined text-primary mr-3 text-sm mt-1">check_circle</span>
                        <span>Auswertung der Systemsicherheit und -stabilität.</span>
                    </li>
                </ul>
                <p className="mt-4 text-sm text-slate-500">Rechtsgrundlage: Art. 6 Abs. 1 S. 1 lit. f DSGVO.</p>
            </section>

            <section id="weitergabe" className="scroll-mt-32 mb-16">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    4. Weitergabe von Daten
                </h2>
                <p>Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt.</p>
            </section>

            <section id="analyse" className="scroll-mt-32 mb-16">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    5. Analyse-Tools & Cookies
                </h2>
                <p>Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät gespeichert werden.</p>
            </section>

            <section id="rechte" className="scroll-mt-32 mb-16">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    6. Betroffenenrechte
                </h2>
                <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 space-y-3">
                    <div className="flex">
                        <span className="font-bold text-primary w-24 flex-shrink-0">Art. 15</span>
                        <span>Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten.</span>
                    </div>
                    <div className="flex">
                        <span className="font-bold text-primary w-24 flex-shrink-0">Art. 16</span>
                        <span>Berichtigung unrichtiger oder Vervollständigung Ihrer Daten.</span>
                    </div>
                    <div className="flex">
                        <span className="font-bold text-primary w-24 flex-shrink-0">Art. 17</span>
                        <span>Löschung Ihrer bei uns gespeicherten Daten ("Recht auf Vergessenwerden").</span>
                    </div>
                </div>
            </section>

            <section id="sicherheit" className="scroll-mt-32">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-6 pb-2 border-b border-gray-100">
                    7. Datensicherheit
                </h2>
                <p>Wir verwenden SSL-Verschlüsselung und modernste Sicherheitsstandards, um Ihre Daten zu schützen.</p>
            </section>
        </LegalLayout>
    );
};

export default Privacy;
