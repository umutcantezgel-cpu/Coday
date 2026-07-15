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
      'aerzte-gesundheit-wetzlar.json'
    );
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContents);

    const enTitle = 'Web Design for Doctors in Wetzlar | Practice Homepage';

    return generatePageMetadata({
      title: locale === 'en' ? enTitle : content.meta.title,
      description:
        locale === 'en' ? 'Digital dominance for your practice.' : content.meta.description,
      path: `/${locale}/branchen/gesundheitswesen/arzt-wetzlar`,
      type: 'money',
    });
  } catch (e) {
    return generatePageMetadata({
      title:
        locale === 'en'
          ? 'Web Design for Doctors in Wetzlar | Practice Homepage'
          : 'Webdesign für Ärzte in Wetzlar | Praxis Homepage',
      description:
        locale === 'en'
          ? 'Digital dominance for your practice.'
          : 'Digitale Dominanz für Ihre Branche.',
      path: `/${locale}/branchen/gesundheitswesen/arzt-wetzlar`,
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
      'aerzte-gesundheit-wetzlar.json'
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

  const cityData = getCityBySlug('wetzlar');

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Doctors in Wetzlar | Practice Homepage | Coday'
      : 'Webdesign für Ärzte in Wetzlar | Praxis Homepage | Coday';
  return (
    <>
      <script
        id="schema-branchen-arzt-wetzlar"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name:
                  _locale === 'en'
                    ? 'Web Design for Doctors in Wetzlar'
                    : 'Webdesign für Ärzte in Wetzlar',
                description:
                  _locale === 'en'
                    ? 'Web design for doctors in Wetzlar. Practice homepage with modern design and local SEO.'
                    : 'Webdesign für Ärzte in Wetzlar. Praxis Homepage mit modernem Design und lokaler SEO.',
                url: `${BASE_URL}/${_locale}/branchen/gesundheitswesen/arzt-wetzlar`,
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
            Webdesign für Ärzte in Wetzlar – Die moderne Praxis-Homepage
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Patienten in Wetzlar und dem Lahn-Dill-Kreis suchen heute online nach ihrem nächsten
              Arzt. Eine professionelle Praxis-Homepage ist damit weit mehr als eine digitale
              Visitenkarte – sie ist Ihr wichtigstes Instrument zur Patientengewinnung. Coday
              entwickelt maßgeschneiderte Webdesign- und IT-Lösungen speziell für Ärzte, Zahnärzte
              und medizinische Praxen in Wetzlar. Wir verstehen die besonderen Anforderungen des
              Gesundheitswesens: strenge Datenschutzanforderungen, die Notwendigkeit von Vertrauen
              und Seriosität sowie die Erwartungen anspruchsvoller Patienten an eine moderne
              digitale Präsenz. Jede von uns gestaltete Praxis-Website vermittelt vom ersten Klick
              an Kompetenz und Empathie.
            </p>
            <p>
              Unsere Webdesign-Lösungen für Arztpraxen umfassen die Integration von
              Online-Terminbuchungssystemen, die Ihrem Praxisteam Telefonzeit sparen und Patienten
              rund um die Uhr eine bequeme Terminvereinbarung ermöglichen. Wir gestalten
              übersichtliche Leistungsseiten für jedes Ihrer Behandlungsgebiete, stellen Ihr
              Ärzteteam mit professionellen Profilseiten vor und integrieren interaktive
              Anfahrtskarten. Patientenbewertungen und Zertifizierungen werden prominent
              eingebunden, um neuen Patienten die Entscheidung für Ihre Praxis zu erleichtern.
              Darüber hinaus implementieren wir barrierefreie Designelemente, damit auch ältere
              Patienten oder Menschen mit Einschränkungen Ihre Website problemlos nutzen können.
            </p>
            <p>
              Lokale Suchmaschinenoptimierung (SEO) ist für Arztpraxen in Wetzlar besonders wichtig.
              Wir optimieren Ihre Website gezielt auf Suchbegriffe wie „Arzt Wetzlar",
              „Hausarztpraxis Wetzlar" oder „Zahnarzt in meiner Nähe". Durch die Optimierung Ihres
              Google Business-Profils, den Aufbau von Zitationen in Ärzteportalen und die technische
              Perfektionierung Ihrer Praxis-Homepage sorgen wir dafür, dass Sie bei lokalen
              Gesundheitssuchanfragen ganz oben stehen. Mobile Optimierung ist dabei
              selbstverständlich, denn über 70 Prozent aller Arztsuchen erfolgen über das
              Smartphone. Schnelle Ladezeiten und eine klare, beruhigende Farbgestaltung runden das
              Nutzererlebnis ab.
            </p>
            <p>
              Als Webdesign-Agentur in Wetzlar kennen wir die lokale Gesundheitslandschaft und die
              Erwartungen der Patienten in der Region. Wir entwickeln DSGVO-konforme
              Kontaktformulare, sichere Datenschutzerklärungen und Cookie-Lösungen, die den hohen
              Anforderungen des Medizinbereichs entsprechen. Unser Ziel ist es, Ihre Praxis digital
              so professionell und vertrauenswürdig zu präsentieren, wie Sie Ihre Patienten
              behandeln. Mit einer von Coday gestalteten Praxis-Homepage stärken Sie nicht nur Ihre
              Online-Sichtbarkeit, sondern positionieren sich nachhaltig als erste Anlaufstelle für
              Gesundheitsversorgung in Wetzlar und Umgebung.
            </p>
          </div>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
          <h2 className="text-3xl font-display font-bold mb-6">
            Web Design for Doctors in Wetzlar – The Modern Practice Homepage
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Patients in Wetzlar and the Lahn-Dill district search online for their next doctor. A
              professional practice homepage is therefore far more than a digital business card — it
              is your most important tool for acquiring new patients. Coday develops tailored web
              design and IT solutions specifically for doctors, dentists, and medical practices in
              Wetzlar. We understand the unique requirements of the healthcare sector: strict data
              protection regulations, the need for trust and credibility, and the expectations that
              discerning patients place on a modern digital presence. Every practice website we
              create conveys competence and empathy from the very first click.
            </p>
            <p>
              Our web design solutions for medical practices include the integration of online
              appointment booking systems that save your practice team phone time while allowing
              patients to conveniently schedule appointments around the clock. We create clear
              service pages for each of your treatment areas, present your medical team with
              professional profile pages, and integrate interactive directions maps. Patient reviews
              and certifications are prominently featured to make it easier for new patients to
              choose your practice. We also implement accessible design elements so that elderly
              patients or people with impairments can use your website without difficulty.
            </p>
            <p>
              Local search engine optimisation (SEO) is particularly important for medical practices
              in Wetzlar. We optimise your website specifically for search terms such as "doctor
              Wetzlar", "general practice Wetzlar", or "dentist near me". By optimising your Google
              Business Profile, building citations on medical directories, and technically
              perfecting your practice homepage, we ensure you rank at the top for local
              health-related searches. Mobile optimisation is a given, as over 70 per cent of all
              doctor searches are conducted on smartphones. Fast loading times and a clear, calming
              colour scheme round off the user experience.
            </p>
            <p>
              As a web design agency in Wetzlar, we know the local healthcare landscape and the
              expectations of patients in the region. We develop GDPR-compliant contact forms,
              secure privacy policies, and cookie solutions that meet the high standards of the
              medical field. Our goal is to present your practice digitally with the same
              professionalism and trustworthiness you bring to patient care. With a practice
              homepage designed by Coday, you not only strengthen your online visibility but
              sustainably position yourself as the first point of contact for healthcare in Wetzlar
              and the surrounding area.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
