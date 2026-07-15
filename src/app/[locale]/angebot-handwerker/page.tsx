import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SeoHead } from '@/shared/ui/SeoHead';
import ClientComponent from '@/features/landing/ui/AngebotHandwerkerClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Web Design Offer for Craftsmen | Central Hesse',
      description:
        'Special web design package for craftsmen in Wetzlar and Central Hesse. Fixed price, fast delivery and design that brings new clients. Inquire today.',
      path: '/en/angebot-handwerker',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign Angebot für Handwerker | Mittelhessen',
    description:
      'Spezielles Webdesign Paket für Handwerker in Wetzlar und Mittelhessen. Festpreis, schnelle Umsetzung und Design das Aufträge bringt. Jetzt anfragen.',
    path: '/de/angebot-handwerker',
    type: 'money',
  });
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  setRequestLocale(params.locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design Offer for Craftsmen | Central Hesse | Coday'
      : 'Webdesign Angebot für Handwerker | Mittelhessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Special web design package for craftsmen in Wetzlar and Central Hesse. Fixed price, fast delivery and design that brings new clients. Inquire today.'
      : 'Spezielles Webdesign Paket für Handwerker in Wetzlar und Mittelhessen. Festpreis, schnelle Umsetzung und Design das Aufträge bringt. Jetzt anfragen.';
  return (
    <>
      <SeoHead
        title="Coday | angebot-handwerker"
        description="Willkommen bei Coday. Entdecken Sie unsere Leistungen."
        pageType="default"
      />
      <ClientComponent />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {_locale === 'en' ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              The Ideal Web Design Offer for Craftsmen in Central Hesse
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                For craft businesses in Wetzlar, Gießen and across Central Hesse, a strong and
                convincing online presence is the most important key to consistently winning new,
                profitable contracts. More and more property owners, homeowners and commercial
                clients search the internet first when they need a qualified craftsman in their
                immediate area. A professional website tailored specifically to the needs of your
                trade is therefore one of the best and most sustainable investments in the future of
                your business. With our exclusive web design offer for craftsmen, Coday provides a
                comprehensive, perfectly coordinated solution that not only looks outstanding but
                also measurably generates new customers for your company.
              </p>
              <p>
                Our specially developed service package includes everything you need for a
                successful, professional start online. We begin the process with a thorough,
                personal and non-binding consultation in which we analyse your individual goals,
                your specific target audience and the particular strengths of your craft business in
                detail. Building on this, we develop a custom, modern and appealing design that
                presents your company, your team and your past reference projects in the best
                possible light. Naturally, we ensure with great care that your new website displays
                perfectly on every device — from a large desktop monitor in the office to a small
                smartphone on the construction site — and is always fast and intuitive to use.
              </p>
              <p>
                However, a truly effective, sales-driven design is only half the equation. To ensure
                that potential new customers in Wetzlar and Central Hesse can actually find you
                online, we integrate all fundamental measures of modern local search engine
                optimisation deeply into the technical structure and content of your new website
                from day one. We optimise the site architecture, meta tags, loading speeds and, on
                request, the copywriting for the most relevant, highest-converting search terms from
                your specific trade combined with your exact regional catchment area. In this way,
                we ensure sustainably that your business is prominently and visibly listed at the
                top of Google for the searches that matter most.
              </p>
              <p>
                Another enormously important advantage of our specialised offer for craftsmen is our
                absolute, transparent fixed-price guarantee. At Coday, you know from the very first
                minute exactly what costs you can expect for the creation of your new business
                website — with no unpleasant surprises, hidden fees or opaque surcharges. We also
                guarantee a swift, on-schedule and professional delivery of your project so that you
                can go live as quickly as possible and immediately benefit from the many advantages
                of your new, optimised online presence. Trust in our proven expertise in web design
                for craftsmen and let us work together to ensure that your business is just as
                successful digitally as it is in the real world of craftsmanship.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Das optimale Webdesign Angebot für Handwerker in Mittelhessen
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Für Handwerksbetriebe in Wetzlar, Gießen und dem gesamten mittelhessischen Raum ist
                eine starke, überzeugende Online-Präsenz heute der wichtigste Schlüssel zur
                kontinuierlichen Gewinnung neuer, lukrativer Aufträge. Immer mehr Bauherren,
                Hausbesitzer und gewerbliche Auftraggeber suchen bei akuten Problemen oder geplanten
                Projekten zuerst im Internet nach dem passenden, qualifizierten Handwerker in ihrer
                unmittelbaren Umgebung. Ein professionelles, speziell auf die Bedürfnisse Ihrer
                Branche zugeschnittenes Webdesign ist daher eine der absolut besten und
                nachhaltigsten Investitionen in die sichere Zukunft Ihres Unternehmens. Mit unserem
                exklusiven, maßgeschneiderten Webdesign Angebot für Handwerker bieten wir von Coday
                Ihnen eine ganzheitliche, perfekt abgestimmte Lösung, die nicht nur optisch auf
                ganzer Linie überzeugt, sondern vor allem auch messbar neue Kunden für Ihren Betrieb
                generiert.
              </p>
              <p>
                Unser speziell entwickeltes Leistungspaket umfasst absolut alles, was Sie für einen
                rundum erfolgreichen, professionellen Start im Internet benötigen. Wir beginnen den
                Prozess mit einer ausführlichen, persönlichen und unverbindlichen Beratung, in der
                wir gemeinsam mit Ihnen Ihre individuellen Ziele, Ihre spezifische Zielgruppe und
                die besonderen Stärken Ihres Handwerksbetriebs detailliert analysieren. Darauf
                aufbauend entwickeln unsere erfahrenen Webdesigner ein maßgeschneidertes, modernes
                und ansprechendes Design, das Ihr Unternehmen, Ihr Team und Ihre bisherigen
                Referenzprojekte im allerbesten Licht präsentiert. Selbstverständlich achten wir
                dabei penibel darauf, dass Ihre neue Website auf allen Endgeräten – vom großen
                Desktop-Monitor im Büro bis hin zum kleinen Smartphone auf der Baustelle – absolut
                perfekt dargestellt wird (Responsive Design) und sich stets schnell und intuitiv
                bedienen lässt.
              </p>
              <p>
                Doch ein wirklich gutes, verkaufsförderndes Design ist nur die sprichwörtliche halbe
                Miete. Damit Sie von potenziellen Neukunden in Wetzlar und Mittelhessen auch
                tatsächlich im Internet gefunden werden, integrieren wir von Anfang an alle
                grundlegenden, entscheidenden Maßnahmen der modernen Suchmaschinenoptimierung (Local
                SEO) tief in die technische Struktur und die inhaltliche Gestaltung Ihrer neuen
                Website. Wir optimieren die Seitenarchitektur, die Meta-Tags, die
                Ladegeschwindigkeiten und auf Wunsch auch die Texte gezielt für die relevantesten,
                umsatzstärksten Suchbegriffe aus Ihrem spezifischen Gewerk in Kombination mit Ihrem
                genauen regionalen Einzugsgebiet. Auf diese Weise stellen wir nachhaltig sicher,
                dass Ihr Betrieb bei den entscheidenden Suchanfragen auf Google prominent und gut
                sichtbar auf den vorderen Plätzen gelistet wird.
              </p>
              <p>
                Ein weiterer, enorm wichtiger Vorteil unseres spezialisierten Angebots für
                Handwerker ist unsere absolute, transparente Festpreisgarantie. Bei Coday wissen Sie
                von der ersten Minute an ganz genau, welche Kosten für die Erstellung Ihrer neuen
                Firmenwebsite auf Sie zukommen – ganz ohne böse Überraschungen, versteckte Gebühren
                oder undurchsichtige Nachzahlungen. Wir garantieren Ihnen zudem eine zügige,
                termingerechte und professionelle Umsetzung Ihres Projekts, damit Sie so schnell wie
                möglich online gehen und direkt von den zahlreichen Vorteilen Ihrer neuen,
                optimierten Online-Präsenz profitieren können. Vertrauen Sie auf unsere langjährige
                Expertise im Bereich Webdesign für Handwerker und lassen Sie uns gemeinsam dafür
                sorgen, dass Ihr Betrieb in Zukunft digital genauso erfolgreich ist wie in der
                analogen Welt der Handwerkskunst.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
