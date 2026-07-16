import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { GamifiedIndustryTemplate } from '@/features/industries/ui/GamifiedIndustryTemplate';
import { getCityBySlug } from '@/features/local-seo/model/cities';
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
      'aerzte-gesundheit-giessen.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design for Doctors Giessen | Coday';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en'
          ? 'Web design and local SEO for doctors in Giessen. Enhance your practice with a modern website.'
          : content.meta.description,
      path: `/${locale}/branchen/gesundheitswesen/arzt-giessen`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design for Doctors Giessen | Coday'
          : 'Webdesign für Ärzte in Gießen | Praxis Homepage',
      description:
        locale === 'en'
          ? 'Web design and local SEO for doctors in Giessen. Enhance your practice with a modern website.'
          : 'Digitale Dominanz für Ihre Branche.',
      path: `/${locale}/branchen/gesundheitswesen/arzt-giessen`,
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
      'aerzte-gesundheit-giessen.json'
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

  const cityData = getCityBySlug('giessen');

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Doctors Giessen | Coday'
      : 'Webdesign für Ärzte in Gießen | Praxis Homepage | Coday';
  return (
    <>
      <script
        id="schema-local-healthcare-gi"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'Web Design for Doctors in Giessen'
                    : 'Webdesign für Ärzte in Gießen',
                description:
                  _locale === 'en'
                    ? 'Web design for doctors in Giessen. Practice homepage with modern design and local SEO.'
                    : 'Webdesign für Ärzte in Gießen. Praxis Homepage mit modernem Design und lokaler SEO.',
                url: `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-giessen`,
              }),
            ],
          }),
        }}
      />
      <GamifiedIndustryTemplate content={content} cityData={cityData} />
      {/* SEO */}
      {_locale === 'de' ? (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h2 className="text-3xl font-display font-bold mb-6">
            Webdesign für Ärzte in Gießen – Ihre digitale Praxispräsenz
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Für Ärzte und medizinische Praxen in Gießen ist eine professionelle Website heute
              unverzichtbar. Patienten recherchieren online, vergleichen Bewertungen und treffen
              ihre Arztwahl zunehmend digital. Wenn Ihre Praxis in den Google-Ergebnissen nicht
              überzeugt, entscheiden sich Patienten für einen Mitbewerber. Coday entwickelt
              spezialisierte Webdesign- und IT-Lösungen für den Gesundheitssektor in Gießen und der
              gesamten Region Mittelhessen. Wir kennen die besonderen Anforderungen an
              Arzt-Websites: die Balance zwischen medizinischer Fachlichkeit und
              patientenfreundlicher Ansprache, strenge DSGVO-Konformität und die Notwendigkeit, vom
              ersten Seitenaufruf an Vertrauen zu schaffen. Unsere Praxis-Homepages sind so
              gestaltet, dass sie Patienten informieren, beruhigen und zur Kontaktaufnahme
              motivieren.
            </p>
            <p>
              Unsere Webdesign-Lösungen für Arztpraxen in Gießen gehen weit über eine einfache
              Visitenkarten-Website hinaus. Wir integrieren Online-Terminbuchungssysteme, die Ihrem
              Praxisteam wertvolle Zeit sparen, und gestalten detaillierte Leistungsseiten, die
              Patienten über Ihre Behandlungsschwerpunkte informieren. Professionelle
              Team-Vorstellungen mit Fotos und Qualifikationen schaffen Nähe und Vertrauen.
              Interaktive Anfahrtskarten, Hinweise zu Parkplätzen und öffentlichen Verkehrsmitteln
              sowie barrierefreie Designelemente sorgen dafür, dass Patienten jeden Alters Ihre
              Website komfortabel nutzen können. Bewertungen von zufriedenen Patienten und
              medizinische Zertifizierungen werden strategisch eingebunden, um die Entscheidung für
              Ihre Praxis zu erleichtern.
            </p>
            <p>
              Lokale Suchmaschinenoptimierung ist für Arztpraxen in Gießen von zentraler Bedeutung.
              Mit über 90.000 Einwohnern und einer großen Studierendenpopulation bietet Gießen ein
              enormes Patientenpotenzial – aber auch intensiven Wettbewerb. Wir optimieren Ihre
              Praxis-Homepage gezielt auf relevante Suchbegriffe wie „Arzt Gießen", „Zahnarzt
              Gießen" oder „Orthopäde in meiner Nähe". Die Optimierung Ihres Google
              Business-Profils, der Aufbau von Einträgen in Ärzteportalen wie Jameda und die
              technische Perfektion Ihrer Website bilden die Grundlage für Top-Platzierungen in den
              lokalen Suchergebnissen. Mobile Optimierung hat für uns höchste Priorität, denn die
              Mehrheit aller Arztsuchen in Gießen erfolgt über das Smartphone.
            </p>
            <p>
              Als Webdesign-Agentur aus dem Raum Wetzlar sind wir mit der Gesundheitslandschaft in
              Mittelhessen bestens vertraut. Wir entwickeln datenschutzkonforme Kontaktformulare,
              rechtssichere Datenschutzerklärungen und Cookie-Lösungen, die den strengen
              Anforderungen im medizinischen Bereich gerecht werden. Unser Ansatz verbindet
              technische Exzellenz mit einer patientenzentrierten Gestaltung, die Ihre Fachkompetenz
              unterstreicht. Mit einer von Coday gestalteten Praxis-Homepage in Gießen gewinnen Sie
              nicht nur neue Patienten, sondern positionieren sich langfristig als vertrauenswürdige
              medizinische Anlaufstelle in einer der wichtigsten Städte Mittelhessens.
            </p>
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h2 className="text-3xl font-display font-bold mb-6">
            Web Design for Doctors in Gießen – Your Digital Practice Presence
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              For doctors and medical practices in Gießen, a professional website is indispensable
              today. Patients research online, compare reviews, and increasingly make their choice
              of doctor digitally. If your practice does not impress in Google results, patients
              choose a competitor instead. Coday develops specialised web design and IT solutions
              for the healthcare sector in Gießen and across the Central Hesse region. We understand
              the particular demands of medical websites: the balance between clinical expertise and
              patient-friendly communication, strict GDPR compliance, and the need to build trust
              from the very first page view. Our practice homepages are designed to inform,
              reassure, and motivate patients to get in touch.
            </p>
            <p>
              Our web design solutions for medical practices in Gießen go far beyond a simple
              business-card website. We integrate online appointment booking systems that save your
              practice team valuable time and create detailed service pages that inform patients
              about your areas of treatment. Professional team introductions with photographs and
              qualifications build familiarity and trust. Interactive directions maps, information
              about parking and public transport, and accessible design elements ensure that
              patients of all ages can use your website comfortably. Reviews from satisfied patients
              and medical certifications are strategically embedded to make it easier for new
              patients to choose your practice.
            </p>
            <p>
              Local search engine optimisation is of central importance for medical practices in
              Gießen. With over 90,000 residents and a large student population, Gießen offers
              enormous patient potential — but also intense competition. We optimise your practice
              homepage specifically for relevant search terms such as "doctor Gießen", "dentist
              Gießen", or "orthopaedist near me". Optimising your Google Business Profile, building
              listings on medical directories such as Jameda, and technically perfecting your
              website form the foundation for top rankings in local search results. Mobile
              optimisation is our highest priority, as the majority of all doctor searches in Gießen
              are conducted on smartphones.
            </p>
            <p>
              As a web design agency from the Wetzlar area, we are thoroughly familiar with the
              healthcare landscape in Central Hesse. We develop data-privacy-compliant contact
              forms, legally secure privacy policies, and cookie solutions that meet the stringent
              requirements of the medical sector. Our approach combines technical excellence with a
              patient-centred design that underscores your professional expertise. With a practice
              homepage designed by Coday in Gießen, you not only attract new patients but position
              yourself over the long term as a trusted medical point of contact in one of the most
              important cities in Central Hesse.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
