import React from 'react';
import { LegalLayout } from '../../components/LegalLayout';

const Terms: React.FC = () => {
    const tocItems = [
        { id: 'geltung', label: '§ 1 Geltungsbereich' },
        { id: 'vertrag', label: '§ 2 Vertragsschluss' },
        { id: 'leistung', label: '§ 3 Leistungen und Inhalte' },
        { id: 'zahlung', label: '§ 4 Zahlungsbedingungen' },
        { id: 'haftung', label: '§ 5 Haftung' },
        { id: 'schluss', label: '§ 6 Schlussbestimmungen' },
    ];

    return (
        <LegalLayout
            title="Allgemeine Geschäftsbedingungen"
            lastUpdated="Oktober 2023"
            tocItems={tocItems}
        >
            <section id="geltung" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">§ 1 Geltungsbereich</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    (1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB“) der Coday GmbH (nachfolgend „Anbieter“), gelten für alle Verträge über die Lieferung von Dienstleistungen, digitalen Inhalten und den Zugang zur Community, die ein Verbraucher oder Unternehmer (nachfolgend „Kunde“) mit dem Anbieter hinsichtlich der vom Anbieter auf seiner Website dargestellten Waren und Leistungen abschließt.
                </p>
                <p className="leading-relaxed text-gray-600">
                    (2) Hiermit wird der Einbeziehung von eigenen Bedingungen des Kunden widersprochen, es sei denn, es ist etwas anderes vereinbart.
                </p>
            </section>

            <section id="vertrag" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">§ 2 Vertragsschluss</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    (1) Die im Online-Shop des Verkäufers enthaltenen Produktbeschreibungen stellen keine verbindlichen Angebote seitens des Verkäufers dar, sondern dienen zur Abgabe eines verbindlichen Angebots durch den Kunden.
                </p>
                <p className="leading-relaxed text-gray-600">
                    (2) Der Kunde kann das Angebot über das in den Online-Shop des Verkäufers integrierte Online-Bestellformular abgeben. Dabei gibt der Kunde, nachdem er die ausgewählten Waren in den virtuellen Warenkorb gelegt und den elektronischen Bestellprozess durchlaufen hat, durch Klicken des den Bestellvorgang abschließenden Buttons ein rechtlich verbindliches Vertragsangebot in Bezug auf die im Warenkorb enthaltenen Waren ab.
                </p>
            </section>

            <section id="leistung" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">§ 3 Leistungen und Inhalte</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    (1) Der Anbieter stellt dem Kunden Zugang zu einer digitalen Community-Plattform sowie diverse digitale Lerninhalte zur Verfügung. Der genaue Leistungsumfang ergibt sich aus der jeweiligen Produktbeschreibung auf der Webseite.
                </p>
                <p className="leading-relaxed text-gray-600">
                    (2) Der Anbieter ist berechtigt, die Inhalte jederzeit zu aktualisieren, zu erweitern oder unwesentliche Bestandteile zu ändern, sofern dies den Kern der vereinbarten Leistung nicht berührt und für den Kunden zumutbar ist.
                </p>
            </section>

            <section id="zahlung" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">§ 4 Zahlungsbedingungen</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    (1) Sofern sich aus der Produktbeschreibung des Verkäufers nichts anderes ergibt, handelt es sich bei den angegebenen Preisen um Gesamtpreise, die die gesetzliche Umsatzsteuer enthalten. Gegebenenfalls zusätzlich anfallende Liefer- und Versandkosten werden in der jeweiligen Produktbeschreibung gesondert angegeben.
                </p>
                <p className="leading-relaxed text-gray-600">
                    (2) Bei Zahlungen aus Ländern außerhalb der Europäischen Union können im Einzelfall weitere Kosten anfallen, die der Verkäufer nicht zu vertreten hat und die vom Kunden zu tragen sind.
                </p>
            </section>

            <section id="haftung" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">§ 5 Haftung</h2>
                <p className="leading-relaxed text-gray-600">
                    Der Anbieter haftet unbeschränkt, soweit die Schadensursache auf Vorsatz oder grober Fahrlässigkeit beruht. Ferner haftet der Anbieter für die leicht fahrlässige Verletzung von wesentlichen Pflichten, deren Verletzung die Erreichung des Vertragszwecks gefährdet, oder für die Verletzung von Pflichten, deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertraut.
                </p>
            </section>

            <section id="schluss" className="scroll-mt-32 mb-12">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">§ 6 Schlussbestimmungen</h2>
                <p className="leading-relaxed text-gray-600 mb-4">
                    (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss der Gesetze über den internationalen Kauf beweglicher Sachen.
                </p>
                <p className="leading-relaxed text-gray-600">
                    (2) Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist ausschließlicher Gerichtsstand für alle Streitigkeiten aus diesem Vertrag der Geschäftssitz des Anbieters. Dasselbe gilt, wenn der Kunde keinen allgemeinen Gerichtsstand in Deutschland oder der EU hat.
                </p>
            </section>
        </LegalLayout>
    );
};

export default Terms;
