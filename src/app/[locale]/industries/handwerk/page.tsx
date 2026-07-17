import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/industries/ui/HandwerkClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design for Craftsmen | Wetzlar & Hesse',
      description:
        'Professional websites for craft businesses in Wetzlar and Hesse. More orders through local visibility on Google. Personal service at a fixed price.',
      path: '/en/industries/handwerk',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Handwerker | Wetzlar & Hessen',
    description:
      'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.',
    path: '/de/industries/handwerk',
    type: 'default',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const _locale = locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Craftsmen | Wetzlar & Hesse | Coday'
      : 'Webdesign für Handwerker | Wetzlar & Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional websites for craft businesses in Wetzlar and Hesse. More orders through local visibility on Google. Personal service at a fixed price.'
      : 'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.';
  return (
    <>
      <SeoHead title={_seoTitle} description={_seoDesc} pageType="default" />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Professional Web Design for Craftsmen in Wetzlar and Hesse
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                In today&apos;s highly digitalized world, a professional, modern website is no
                longer a luxury for craft businesses — it is an absolute business necessity. Whether
                you work as an experienced electrician, a reliable plumber, a creative carpenter, or
                a versatile roofer in Wetzlar, Central Hesse, or the greater Hesse region, your
                potential customers now search almost exclusively online via search engines like
                Google for the right local service providers for their specific needs. If your craft
                business is not visible in these crucial search results, or if your current website
                is outdated, cluttered, or not optimized for mobile devices like smartphones, you
                lose valuable contracts every single day to your digitally better-positioned
                competitors. This is exactly where we at Coday step in as your specialized web
                design agency to revolutionize your digital presence.
              </p>
              <p>
                At Coday, we have deliberately specialized in developing tailor-made,
                high-converting web design solutions specifically for small and medium-sized craft
                businesses. We understand the unique challenges and special needs of your
                traditional industry inside and out. A craftsman in their busy workday often has
                neither the time nor the deep technical expertise to dedicate to the complex
                creation, maintenance, and search engine optimization (SEO) of a modern company
                website. For this reason, we offer you a comprehensive, worry-free full-service
                approach. We take over the entire digital process for you — from the initial,
                well-founded strategic consultation and the development of an appealing,
                industry-appropriate design, through clean, high-performance technical development,
                all the way to long-term maintenance, care, and continuous optimization of your new
                online presence.
              </p>
              <p>
                Our primary, declared goal is always to help you achieve significantly more
                qualified customer inquiries and lucrative contracts from your immediate area
                through substantially increased local visibility on Google and other important
                search engines. A professionally created website by Coday is far more than just a
                static digital business card on the web. It functions as your tireless digital sales
                representative, working for you 24 hours a day, 7 days a week. It showcases your
                hard-earned craftsmanship through high-quality images and references, builds
                immediate trust with potential new customers through transparent customer reviews,
                and makes it as easy as possible for interested parties to get in touch with you
                quickly and directly through well-designed calls-to-action (CTAs) and user-friendly
                contact forms.
              </p>
              <p>
                As an agency, we place the greatest value on transparent, honest communication at
                eye level, personal and reliable service, and absolutely fair, easily calculable
                fixed prices without any hidden costs. We do not work with rigid, prefabricated
                standard templates, but instead develop an individual solution tailored to the
                respective corporate identity for each craft business, one that optimally and
                target-group-appropriately showcases your specific strengths, your years of
                experience, and your unique service portfolio. Trust the proven expertise of Coday
                and make your craft business unmissable on the internet. Let us lay the foundation
                together for your future, sustainable digital success in Wetzlar and all of Hesse.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Professionelles Webdesign für Handwerker in Wetzlar und Hessen
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                In der heutigen, stark digitalisierten Welt ist eine professionelle, moderne Website
                für Handwerksbetriebe längst kein Luxus mehr, sondern eine absolute geschäftliche
                Notwendigkeit. Egal ob Sie als erfahrener Elektriker, zuverlässiger
                Sanitärinstallateur, kreativer Schreiner oder vielseitiger Dachdecker in Wetzlar,
                Mittelhessen oder der gesamten Region Hessen tätig sind – Ihre potenziellen Kunden
                suchen heutzutage fast ausschließlich online über Suchmaschinen wie Google nach den
                passenden, lokalen Dienstleistern für ihre spezifischen Anliegen. Wenn Ihr
                Handwerksbetrieb in diesen entscheidenden Suchergebnissen nicht präsent ist oder
                Ihre aktuelle Website veraltet, unübersichtlich oder nicht für mobile Endgeräte wie
                Smartphones optimiert ist, verlieren Sie Tag für Tag wertvolle Aufträge an Ihre
                direkten, digital besser aufgestellten Mitbewerber. Genau hier setzen wir von Coday
                als Ihre spezialisierte Webdesign-Agentur an, um Ihren digitalen Auftritt zu
                revolutionieren.
              </p>
              <p>
                Wir haben uns bei Coday ganz bewusst darauf spezialisiert, maßgeschneiderte,
                hochkonvertierende Webdesign-Lösungen speziell für kleine und mittelständische
                Handwerksunternehmen zu entwickeln. Wir verstehen die einzigartigen
                Herausforderungen und die besonderen Bedürfnisse Ihrer traditionsreichen Branche
                ganz genau. Ein Handwerker hat im stressigen Arbeitsalltag oft weder die nötige Zeit
                noch die tiefe technische Expertise, um sich intensiv um die komplexe Erstellung,
                Pflege und Suchmaschinenoptimierung (SEO) einer modernen Firmenwebsite zu kümmern.
                Aus diesem Grund bieten wir Ihnen einen umfassenden, sorgenfreien
                Full-Service-Ansatz an. Wir nehmen Ihnen den gesamten digitalen Prozess ab – von der
                ersten, fundierten strategischen Beratung und der Entwicklung eines ansprechenden,
                branchengerechten Designs über die saubere, performante technische Programmierung
                bis hin zur langfristigen Wartung, Pflege und kontinuierlichen Optimierung Ihrer
                neuen Online-Präsenz.
              </p>
              <p>
                Unser oberstes, erklärtes Ziel ist es dabei stets, Ihnen durch eine signifikant
                erhöhte lokale Sichtbarkeit bei Google und anderen wichtigen Suchmaschinen
                nachhaltig zu deutlich mehr qualifizierten Kundenanfragen und lukrativen Aufträgen
                aus Ihrer direkten Umgebung zu verhelfen. Eine von Coday professionell erstellte
                Website ist dabei weit mehr als nur eine statische, digitale Visitenkarte im Netz.
                Sie fungiert vielmehr als Ihr unermüdlicher, digitaler Vertriebsmitarbeiter, der 24
                Stunden am Tag, 7 Tage die Woche für Sie im Einsatz ist. Sie präsentiert Ihr hart
                erarbeitetes handwerkliches Können durch hochwertige Bilder und Referenzen, schafft
                sofortiges Vertrauen bei potenziellen Neukunden durch transparente Kundenbewertungen
                und macht es Interessenten durch durchdachte Call-to-Actions (CTAs) und
                benutzerfreundliche Kontaktformulare so einfach wie möglich, schnell und
                unkompliziert direkt mit Ihnen in Verbindung zu treten.
              </p>
              <p>
                Dabei legen wir als Agentur allergrößten Wert auf eine transparente, ehrliche
                Kommunikation auf Augenhöhe, einen persönlichen, verlässlichen Service und absolut
                faire, gut kalkulierbare Festpreise ohne jegliche versteckte Kosten. Wir arbeiten
                nicht mit starren, vorgefertigten Standard-Templates, sondern entwickeln für jeden
                einzelnen Handwerksbetrieb eine individuelle, auf die jeweilige Corporate Identity
                abgestimmte Lösung, die Ihre spezifischen Stärken, Ihre langjährige Erfahrung und
                Ihr besonderes Leistungsportfolio optimal und zielgruppengerecht in Szene setzt.
                Setzen Sie auf die ausgewiesene Expertise von Coday und machen Sie Ihren
                Handwerksbetrieb im Internet endgültig unübersehbar. Lassen Sie uns gemeinsam den
                Grundstein für Ihren zukünftigen, nachhaltigen digitalen Erfolg in Wetzlar und ganz
                Hessen legen.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
