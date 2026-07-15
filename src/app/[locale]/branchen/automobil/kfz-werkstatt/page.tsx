import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';

import fs from 'fs';
import path from 'path';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      'kfz-werkstatt.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design for Auto Repair Shops | Wetzlar Area';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en' ? 'Digital dominance for your industry.' : content.meta.description,
      path: `/${locale}/branchen/automobil/kfz-werkstatt`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design for Auto Repair Shops | Wetzlar Area'
          : 'Webdesign für KFZ-Werkstätten | Raum Wetzlar',
      description:
        locale === 'en'
          ? 'Digital dominance for your industry.'
          : 'Digitale Dominanz für Ihre Branche.',
      path: `/${locale}/branchen/automobil/kfz-werkstatt`,
      type: 'money',
    });
  }
}

export default async function SubIndustryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let content = null;
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'features',
      'local-seo',
      'model',
      'content',
      'kfz-werkstatt.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    content = JSON.parse(fileContents);
  } catch (e) {
    // Content is being generated or doesn't exist
  }

  if (!content) {
    return (
      <div className="p-20 text-center pt-48">
        <h2 className="text-2xl font-bold mb-4">Inhalt wird geladen...</h2>
        <p>Der branchenspezifische Content für diese Seite wird aktuell konfiguriert.</p>
      </div>
    );
  }

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Auto Repair Shops | Wetzlar Area | Coday'
      : 'Webdesign für KFZ-Werkstätten | Raum Wetzlar | Coday';
  return (
    <>
      <script
        id="schema-branchen-kfz-werkstatt"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'Web Design for Auto Repair Shops'
                    : 'Webdesign für KFZ-Werkstätten',
                description:
                  _locale === 'en'
                    ? 'Web design for auto repair shops in the Wetzlar area. Digital dominance for your industry.'
                    : 'Webdesign für KFZ-Werkstätten im Raum Wetzlar. Digitale Dominanz für Ihre Branche.',
                url: `${BASE_URL}/${_locale}/branchen/automobil/kfz-werkstatt`,
              }),
            ],
          }),
        }}
      />
      <GamifiedIndustryTemplate content={content} cityData={undefined} />
      {/* SEO */}
      {_locale === 'de' ? (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h2 className="text-3xl font-display font-bold mb-6">
            Professionelles Webdesign für KFZ-Werkstätten im Raum Wetzlar
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Eine professionelle Website ist für KFZ-Werkstätten heute kein Luxus mehr, sondern
              eine betriebliche Notwendigkeit. Fahrzeughalter im Raum Wetzlar suchen online nach
              Werkstätten, vergleichen Bewertungen und erwarten eine einfache Möglichkeit, Termine
              zu vereinbaren oder sich über Leistungen zu informieren. Wenn Ihre KFZ-Werkstatt in
              den Suchergebnissen nicht sichtbar ist, gehen potenzielle Kunden direkt zur
              Konkurrenz. Coday entwickelt maßgeschneiderte Webdesign- und IT-Lösungen, die genau
              auf die Anforderungen von Autowerkstätten zugeschnitten sind. Wir verstehen, dass ein
              Werkstattinhaber keine Zeit für komplizierte Technik hat – deshalb liefern wir
              Websites, die von Anfang an funktionieren, professionell aussehen und Kunden gewinnen.
            </p>
            <p>
              Unsere branchenspezifischen Webdesign-Lösungen für KFZ-Werkstätten umfassen
              Online-Terminbuchungssysteme, die nahtlos in Ihren Werkstattalltag integriert werden.
              Kunden können rund um die Uhr Inspektionstermine, Ölwechsel oder HU/AU-Termine buchen,
              ohne Ihr Telefon zu blockieren. Darüber hinaus integrieren wir Leistungsübersichten,
              Preistransparenz und digitale Auftragsformulare, die Ihr Team entlasten und
              gleichzeitig das Vertrauen Ihrer Kunden stärken. Google-Bewertungen und
              Erfahrungsberichte werden prominent platziert, denn im Werkstattgeschäft ist Vertrauen
              der entscheidende Faktor für die Kundenentscheidung. Wir sorgen dafür, dass Ihre
              bestehenden positiven Bewertungen maximale Wirkung entfalten.
            </p>
            <p>
              Suchmaschinenoptimierung (SEO) für KFZ-Werkstätten erfordert einen lokalen Fokus. Wir
              optimieren Ihre Website gezielt auf Suchbegriffe wie „KFZ-Werkstatt Wetzlar",
              „Autowerkstatt in meiner Nähe" oder „HU AU Wetzlar". Durch die Optimierung Ihres
              Google Business-Profils, den Aufbau lokaler Backlinks und die technische
              Perfektionierung Ihrer Website stellen wir sicher, dass Sie bei lokalen Suchanfragen
              ganz oben erscheinen. Jede Seite wird für mobile Endgeräte optimiert, denn die meisten
              Kunden suchen unterwegs auf dem Smartphone nach einer Werkstatt. Schnelle Ladezeiten
              und eine intuitive Navigation sind für uns selbstverständlich – denn jede Sekunde
              Verzögerung kostet Sie potenzielle Kunden.
            </p>
            <p>
              Als Ihre Webdesign-Agentur in Wetzlar bieten wir KFZ-Werkstätten ein
              Rundum-sorglos-Paket: von der strategischen Beratung über das Design und die
              Entwicklung bis hin zur laufenden Betreuung und Wartung. Wir implementieren
              DSGVO-konforme Kontaktformulare, Cookie-Banner und Datenschutzlösungen, damit Sie
              rechtlich auf der sicheren Seite stehen. Unser Ziel ist es, Ihre Werkstatt digital so
              professionell zu präsentieren, wie Sie Ihre Arbeit am Fahrzeug erledigen. Mit einer
              von Coday entwickelten Website gewinnen Sie nicht nur mehr Kunden, sondern bauen
              langfristig eine starke digitale Marke auf, die Ihre KFZ-Werkstatt als erste
              Anlaufstelle in der Region positioniert.
            </p>
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h2 className="text-3xl font-display font-bold mb-6">
            Professional Web Design for Auto Repair Shops in the Wetzlar Area
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              A professional website is no longer a luxury for auto repair shops — it is a business
              necessity. Vehicle owners in the Wetzlar area search online for workshops, compare
              reviews, and expect an easy way to book appointments or learn about services. If your
              auto repair shop is not visible in search results, potential customers go straight to
              the competition. Coday develops tailored web design and IT solutions built
              specifically for the needs of automotive workshops. We understand that a shop owner
              has no time for complicated technology — that is why we deliver websites that work
              from day one, look professional, and win customers.
            </p>
            <p>
              Our industry-specific web design solutions for auto repair shops include online
              appointment booking systems that integrate seamlessly into your daily workshop
              routine. Customers can book inspections, oil changes, or MOT appointments around the
              clock without tying up your phone line. Beyond that, we integrate service overviews,
              transparent pricing, and digital job request forms that reduce your team's workload
              while building customer trust. Google reviews and testimonials are prominently
              displayed, because in the automotive repair business, trust is the decisive factor in
              a customer's decision. We ensure your existing positive reviews achieve maximum
              impact.
            </p>
            <p>
              Search engine optimisation (SEO) for auto repair shops requires a strong local focus.
              We optimise your website specifically for search terms such as "auto repair shop
              Wetzlar", "car workshop near me", or "MOT Wetzlar". By optimising your Google Business
              Profile, building local backlinks, and technically perfecting your website, we make
              sure you appear at the top for local searches. Every page is optimised for mobile
              devices, because most customers search for a workshop on their smartphone while on the
              go. Fast loading times and intuitive navigation are standard for us — because every
              second of delay costs you potential customers.
            </p>
            <p>
              As your web design agency in Wetzlar, we offer auto repair shops a complete package:
              from strategic consultation through design and development to ongoing support and
              maintenance. We implement GDPR-compliant contact forms, cookie banners, and data
              privacy solutions so you remain on the safe side legally. Our goal is to present your
              workshop digitally with the same professionalism you bring to every vehicle you
              service. With a website developed by Coday, you not only win more customers but build
              a strong digital brand over the long term that positions your auto repair shop as the
              first port of call in the region.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
