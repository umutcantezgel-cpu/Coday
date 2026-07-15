import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Client Portal & Dashboard | Web Design Wetzlar',
      description:
        'Your personal Coday client portal. Project progress, files and communication in one place. For web design clients in Wetzlar and Central Hesse.',
      path: '/en/dashboard',
      type: 'noindex',
    });
  }
  return generatePageMetadata({
    title: 'Kundenportal & Dashboard | Webdesign Agentur Wetzlar',
    description:
      'Ihr persönliches Coday Kundenportal. Projektfortschritt, Dateien und Kommunikation an einem Ort. Für Webdesign Kunden in Wetzlar und Mittelhessen.',
    path: '/de/dashboard',
    type: 'noindex',
  });
}

export default async function DashboardPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  // For now, we redirect the dashboard to the analyzer or a coming-soon page.
  // The user can implement a real auth-gated dashboard later.
  redirect(`/${params.locale}/analyzer`);

  return (
    <>
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {params.locale === 'en'
            ? 'Client Portal and Digital Dashboard'
            : 'Kundenportal und digitales Dashboard'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {params.locale === 'en'
              ? 'A dedicated client dashboard is an essential tool for managing web design projects and ensuring smooth communication between the agency and the client. Through our secure and intuitive dashboard, you gain full transparency into every phase of your project, from the initial planning stages to the final launch. We believe that clear, organized collaboration is the key to creating outstanding digital products. Within this portal, you can easily review design mockups, track development milestones, and provide direct feedback on specific tasks. This centralized approach eliminates the confusion of scattered email threads and missed messages, allowing for a highly efficient workflow. Security and data privacy are our top priorities, meaning all your files, credentials, and project details are encrypted and safely stored. As a business owner, your time is valuable, and our dashboard is designed to save you as much time as possible. You can access your project information 24/7, from any device, giving you the flexibility to check progress whenever it suits your schedule. We continuously update the portal with the latest reports on performance, SEO metrics, and actionable insights to help you understand how your website is performing in real-time. Whether we are building a completely new website, optimizing an existing platform, or running a comprehensive SEO campaign, the client dashboard serves as your personal command center. By fostering a collaborative environment, we empower you to be an active participant in your digital success story. In the fast-paced world of digital marketing and web development, having instant access to crucial project data provides a significant competitive advantage. Experience a new standard of agency-client collaboration where transparency, efficiency, and exceptional results are always at the forefront of everything we do. Our tailored solutions ensure that no detail goes unnoticed, empowering teams to operate at maximum productivity. Real-time notifications and integrated chat features further bridge the gap between creative execution and business strategy, ensuring a cohesive and unified vision.'
              : 'Ein dediziertes Kunden-Dashboard ist ein unverzichtbares Werkzeug für die Verwaltung von Webdesign-Projekten und die Gewährleistung einer reibungslosen Kommunikation zwischen der Agentur und dem Kunden. Über unser sicheres und intuitives Dashboard erhalten Sie volle Transparenz in jede Phase Ihres Projekts, von den ersten Planungsphasen bis zum finalen Launch. Wir glauben, dass eine klare, organisierte Zusammenarbeit der Schlüssel zur Schaffung herausragender digitaler Produkte ist. Innerhalb dieses Portals können Sie ganz einfach Design-Entwürfe überprüfen, Entwicklungsmeilensteine verfolgen und direktes Feedback zu bestimmten Aufgaben geben. Dieser zentralisierte Ansatz eliminiert die Verwirrung durch verstreute E-Mail-Threads und verpasste Nachrichten und ermöglicht einen hocheffizienten Workflow. Sicherheit und Datenschutz stehen bei uns an erster Stelle, was bedeutet, dass all Ihre Dateien, Zugangsdaten und Projektdetails verschlüsselt und sicher gespeichert sind. Als Geschäftsinhaber ist Ihre Zeit wertvoll, und unser Dashboard wurde entwickelt, um Ihnen so viel Zeit wie möglich zu sparen. Sie können rund um die Uhr und von jedem Gerät aus auf Ihre Projektinformationen zugreifen, was Ihnen die Flexibilität gibt, den Fortschritt zu überprüfen, wann immer es in Ihren Zeitplan passt. Wir aktualisieren das Portal kontinuierlich mit den neuesten Berichten zu Leistung, SEO-Metriken und umsetzbaren Erkenntnissen, um Ihnen zu helfen, in Echtzeit zu verstehen, wie Ihre Website abschneidet. Egal, ob wir eine komplett neue Website erstellen, eine bestehende Plattform optimieren oder eine umfassende SEO-Kampagne durchführen, das Kunden-Dashboard dient als Ihre persönliche Kommandozentrale. Durch die Förderung eines kollaborativen Umfelds befähigen wir Sie, ein aktiver Teilnehmer an Ihrer digitalen Erfolgsgeschichte zu sein. In der schnelllebigen Welt des digitalen Marketings und der Webentwicklung bietet der sofortige Zugriff auf wichtige Projektdaten einen erheblichen Wettbewerbsvorteil. Erleben Sie einen neuen Standard der Zusammenarbeit zwischen Agentur und Kunde, bei dem Transparenz, Effizienz und außergewöhnliche Ergebnisse immer im Vordergrund unseres Handelns stehen. Unsere maßgeschneiderten Lösungen stellen sicher, dass kein Detail unbemerkt bleibt, und befähigen Teams, mit maximaler Produktivität zu arbeiten. Echtzeit-Benachrichtigungen und integrierte Chat-Funktionen überbrücken die Lücke zwischen kreativer Ausführung und Geschäftsstrategie weiter und sorgen für eine kohärente und einheitliche Vision.'}
          </p>
        </div>
      </section>
    </>
  );
}
