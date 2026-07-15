import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { setRequestLocale } from 'next-intl/server';
import { IndustryDetailClient } from '@/features/industries/ui/IndustryDetailClient';
import { IndustryToolEmbed } from '@/features/industries/ui/IndustryToolEmbed';
import { getOrganizationSchema, getServiceSchema, BASE_URL } from '@/lib/schema';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Doctors & Clinics | Agency Hesse',
      description:
        'Professional practice websites for Doctors and Clinics by Agency Hesse. Attract patients through modern web design and local SEO. Inquire today!',
      path: '/en/branchen/gesundheitswesen',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Ärzte & Praxen | Healthcare Marketing',
    description:
      'Professionelle Praxis-Webseiten für Ärzte und Kliniken. Patientengewinnung durch modernes Webdesign und lokale SEO Optimierung. Jetzt anfragen!',
    path: '/de/branchen/gesundheitswesen',
    type: 'default',
  });
}

export default async function GesundheitswesenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Doctors & Clinics | Agency Hesse | Coday'
      : 'Webdesign für Ärzte & Praxen | Healthcare Marketing | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional practice websites for Doctors and Clinics by Agency Hesse. Attract patients through modern web design and local SEO. Inquire today!'
      : 'Professionelle Praxis-Webseiten für Ärzte und Kliniken. Patientengewinnung durch modernes Webdesign und lokale SEO Optimierung. Jetzt anfragen!';
  return (
    <>
      <script
        id="schema-branchen-gesundheitswesen"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/branchen/gesundheitswesen`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient industrySlug="aerzte-gesundheit" />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Web Design for Doctors & Clinics – Your Digital Practice in Hesse'
            : 'Webdesign für Ärzte & Praxen – Ihre digitale Praxis in Hessen'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? 'In an era where patients research medical professionals online before booking an appointment, a compelling and trustworthy website is no longer optional for doctors, dental practices, physiotherapists, and healthcare providers — it is essential. Patients in Hesse and beyond search for terms like "general practitioner near me" or "dentist Wetzlar" and expect to find a modern, informative, and reassuring online presence within seconds. At Coday, we specialize in creating bespoke web design solutions tailored specifically for healthcare professionals and clinics. Our designs prioritize clarity, professionalism, and patient trust. We understand that the medical field demands the highest standards of credibility, which is why every element of your website — from the color palette and typography to the imagery and layout — is carefully crafted to convey competence and warmth. A well-designed practice website reduces phone inquiries by providing essential information upfront: treatment offerings, physician qualifications, office hours, team introductions, and directions to your location. This not only improves the patient experience but also frees up your reception staff to focus on in-person care.'
              : 'In einer Zeit, in der Patienten Ärzte und medizinische Fachkräfte online recherchieren, bevor sie einen Termin vereinbaren, ist eine überzeugende und vertrauenswürdige Website für Ärzte, Zahnarztpraxen, Physiotherapeuten und Gesundheitsdienstleister längst keine Option mehr — sie ist unverzichtbar. Patienten in Hessen und darüber hinaus suchen nach Begriffen wie „Hausarzt in meiner Nähe" oder „Zahnarzt Wetzlar" und erwarten, innerhalb von Sekunden eine moderne, informative und vertrauenserweckende Online-Präsenz vorzufinden. Bei Coday sind wir darauf spezialisiert, maßgeschneiderte Webdesign-Lösungen speziell für Ärzte und Praxen im Gesundheitswesen zu entwickeln. Unsere Designs setzen auf Klarheit, Professionalität und Patientenvertrauen. Wir verstehen, dass der medizinische Bereich höchste Ansprüche an Glaubwürdigkeit stellt. Deshalb wird jedes Element Ihrer Website — von der Farbpalette und Typografie bis hin zu den Bildern und dem Layout — sorgfältig gestaltet, um Kompetenz und Wärme zu vermitteln. Eine durchdachte Praxis-Website reduziert telefonische Anfragen, indem sie wesentliche Informationen auf den ersten Blick bereitstellt: Behandlungsangebote, Qualifikationen der Ärzte, Sprechzeiten, Teamvorstellungen und die Anfahrt zu Ihrer Praxis. Das verbessert nicht nur das Patientenerlebnis, sondern entlastet auch Ihr Empfangsteam, damit es sich auf die persönliche Betreuung konzentrieren kann.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'One of the most impactful features we integrate into healthcare websites is an intelligent online appointment booking system. Patients today expect the convenience of scheduling appointments around the clock, without having to call during office hours. We implement seamless booking solutions that sync with your practice management software, send automated appointment confirmations and reminders via email or SMS, and dramatically reduce no-show rates. These systems are designed to be intuitive for patients of all ages, including elderly users who may be less comfortable with technology. Beyond booking, we develop secure patient portals that allow individuals to access lab results, download referral documents, or submit preliminary information before their visit. Every feature is built with strict GDPR and DSGVO compliance at its core. Patient data protection is non-negotiable in healthcare marketing, and we implement end-to-end encryption, secure hosting within EU data centers, and transparent cookie consent mechanisms to ensure your practice meets all legal requirements without compromise.'
              : 'Eine der wirkungsvollsten Funktionen, die wir in Healthcare-Websites integrieren, ist ein intelligentes Online-Terminbuchungssystem. Patienten erwarten heute die Möglichkeit, Termine rund um die Uhr zu vereinbaren, ohne während der Sprechzeiten anrufen zu müssen. Wir implementieren nahtlose Buchungslösungen, die mit Ihrer Praxisverwaltungssoftware synchronisiert werden, automatische Terminbestätigungen und Erinnerungen per E-Mail oder SMS versenden und die Ausfallquoten drastisch reduzieren. Diese Systeme sind so gestaltet, dass sie für Patienten jeden Alters intuitiv bedienbar sind — auch für ältere Nutzer, die weniger technikaffin sind. Über die Terminbuchung hinaus entwickeln wir sichere Patientenportale, über die Patienten Laborergebnisse einsehen, Überweisungsdokumente herunterladen oder vorab Informationen für ihren Besuch übermitteln können. Jede Funktion wird konsequent DSGVO-konform umgesetzt. Der Schutz von Patientendaten ist im Healthcare Marketing nicht verhandelbar. Wir setzen auf Ende-zu-Ende-Verschlüsselung, sicheres Hosting in EU-Rechenzentren und transparente Cookie-Consent-Mechanismen, damit Ihre Praxis alle gesetzlichen Anforderungen lückenlos erfüllt.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Medical practice branding goes far beyond a logo and business card. Your website is the central touchpoint of your healthcare brand, and it must communicate your medical philosophy, specializations, and the unique patient experience you offer. We help doctors and clinics in Hesse develop a distinctive visual identity that sets them apart from competitors. Whether you run a modern orthopedic center in Gießen, a family practice in Wetzlar, or a specialist dermatology clinic in Marburg, we create brand-consistent websites that authentically represent your medical expertise. Professional photography of your practice rooms, team, and equipment can be integrated to build immediate patient trust. We also craft compelling physician profiles and specialty pages that are optimized for local search engine visibility. By targeting long-tail keywords such as "pediatrician Wetzlar open hours" or "sports medicine clinic Hesse," we ensure that your practice appears prominently when potential patients are actively searching for the services you provide.'
              : 'Medical Practice Branding geht weit über ein Logo und eine Visitenkarte hinaus. Ihre Website ist der zentrale Berührungspunkt Ihrer Healthcare-Marke und muss Ihre medizinische Philosophie, Ihre Spezialisierungen und das besondere Patientenerlebnis kommunizieren, das Sie bieten. Wir unterstützen Ärzte und Praxen in Hessen dabei, eine unverwechselbare visuelle Identität zu entwickeln, die sie von der Konkurrenz abhebt. Ob Sie ein modernes orthopädisches Zentrum in Gießen, eine Hausarztpraxis in Wetzlar oder eine spezialisierte Dermatologie-Klinik in Marburg betreiben — wir gestalten markenkonforme Websites, die Ihre medizinische Kompetenz authentisch repräsentieren. Professionelle Fotografie Ihrer Praxisräume, Ihres Teams und Ihrer Ausstattung wird integriert, um sofortiges Patientenvertrauen aufzubauen. Zudem erstellen wir überzeugende Arztprofile und Fachseiten, die gezielt für die lokale Suchmaschinenoptimierung (SEO) aufbereitet werden. Durch die gezielte Ansprache von Long-Tail-Keywords wie „Kinderarzt Wetzlar Sprechzeiten" oder „Sportmedizin Praxis Hessen" stellen wir sicher, dass Ihre Praxis prominent erscheint, wenn potenzielle Patienten aktiv nach den Leistungen suchen, die Sie anbieten.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'At Coday, we understand that healthcare professionals have limited time for marketing activities, which is why we handle every aspect of your digital transformation — from initial strategy and concept development through design, technical implementation, and ongoing support. Our websites are built on modern, performant technology stacks that guarantee fast loading times, mobile responsiveness, and excellent Core Web Vitals scores. A slow or poorly optimized website is particularly damaging in the healthcare sector, where impatient users will simply move on to the next practice in the search results. We also provide comprehensive analytics dashboards that give you clear insights into visitor behavior, appointment conversion rates, and the most popular pages on your site. This data-driven approach allows us to continuously refine your online presence for maximum patient acquisition. Whether you are launching a new medical practice or modernizing an existing one, Coday is your dedicated partner for professional healthcare web design and marketing in Hesse. Contact us today for a free initial consultation and discover how a strategically designed website can sustainably grow your patient base.'
              : 'Bei Coday verstehen wir, dass Ärzte und medizinisches Fachpersonal nur begrenzt Zeit für Marketingaktivitäten haben. Deshalb übernehmen wir jeden Aspekt Ihrer digitalen Transformation — von der initialen Strategie und Konzeptentwicklung über Design und technische Umsetzung bis hin zur laufenden Betreuung. Unsere Websites basieren auf modernen, leistungsstarken Technologien, die schnelle Ladezeiten, mobile Responsivität und exzellente Core Web Vitals garantieren. Eine langsame oder schlecht optimierte Website ist im Gesundheitswesen besonders schädlich, da ungeduldige Nutzer einfach zur nächsten Praxis in den Suchergebnissen wechseln. Wir stellen außerdem umfassende Analytics-Dashboards bereit, die Ihnen klare Einblicke in das Besucherverhalten, die Termin-Conversion-Raten und die beliebtesten Seiten Ihrer Website geben. Dieser datengetriebene Ansatz ermöglicht es uns, Ihre Online-Präsenz kontinuierlich für maximale Patientengewinnung zu optimieren. Ob Sie eine neue Arztpraxis eröffnen oder eine bestehende modernisieren möchten — Coday ist Ihr engagierter Partner für professionelles Healthcare Webdesign und Marketing in Hessen. Kontaktieren Sie uns noch heute für ein kostenloses Erstgespräch und entdecken Sie, wie eine strategisch gestaltete Website Ihre Patientenbasis nachhaltig vergrößern kann.'}
          </p>
        </div>
      </section>
      <IndustryToolEmbed industryKey="gesundheit" />
    </>
  );
}
