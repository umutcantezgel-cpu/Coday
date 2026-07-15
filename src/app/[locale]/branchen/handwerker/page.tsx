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
      title: 'Web Design for Craftsmen | Agency Wetzlar Hesse',
      description:
        'Web design and digital visibility for craft businesses in Wetzlar and Hesse. Generate lucrative orders through a professional online presence.',
      path: `/en/branchen/handwerker`,
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Webdesign für Handwerker | Agentur Wetzlar Hessen',
    description:
      'Webdesign und digitale Sichtbarkeit für Handwerker in Wetzlar und Hessen. Generieren Sie lukrative Aufträge durch professionelle Online-Präsenz.',
    path: `/de/branchen/handwerker`,
    type: 'money',
  });
}

export default async function HandwerkerHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const _locale = (await params)?.locale || 'de';
  const _seoTitle =
    _locale === 'en'
      ? 'Web Design for Craftsmen | Agency Wetzlar Hesse | Coday'
      : 'Webdesign für Handwerker | Agentur Wetzlar Hessen | Coday';
  const _seoDesc =
    _locale === 'en'
      ? 'Professional websites for craft businesses in Wetzlar and Hesse. More orders through local visibility on Google. Personal service at a fixed price.'
      : 'Professionelle Webseiten für Handwerksbetriebe in Wetzlar und Hessen. Mehr Aufträge durch lokale Sichtbarkeit bei Google. Persönlich und zum Festpreis.';
  return (
    <>
      <script
        id="schema-branchen-handwerker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              getOrganizationSchema(_locale),
              getServiceSchema({
                name: _seoTitle,
                description: _seoDesc,
                url: `${BASE_URL}/${_locale}/branchen/handwerker`,
              }),
            ],
          }),
        }}
      />
      <IndustryDetailClient industrySlug="handwerk-bau" />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {_locale === 'en'
            ? 'Web Design for Craftsmen – More Orders Through Digital Visibility in Wetzlar & Hesse'
            : 'Webdesign für Handwerker – Mehr Aufträge durch digitale Sichtbarkeit in Wetzlar & Hessen'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            {_locale === 'en'
              ? 'For craftsmen and trade businesses in Wetzlar, Hesse, and across Germany, a professional website is one of the most effective tools for generating a steady flow of high-quality leads and new customer inquiries. Gone are the days when word-of-mouth alone could sustain a craft business — today, homeowners and commercial clients search online for electricians, plumbers, roofers, painters, tilers, and carpenters before picking up the phone. If your craft business does not appear in local search results, you are losing valuable orders to competitors who have invested in their digital presence. At Coday, we are a specialized agency in Wetzlar that builds custom websites designed specifically for the needs of Handwerker and trade professionals. We understand that craftsmen are busy on the job site and need a website that works for them around the clock, capturing leads and building trust even when they cannot answer the phone. Our websites feature prominent call-to-action buttons, click-to-call functionality, and streamlined contact forms that make it effortless for potential customers to request quotes or schedule consultations. Every design decision is made with one goal in mind: converting website visitors into paying customers.'
              : 'Für Handwerker und Handwerksbetriebe in Wetzlar, Hessen und deutschlandweit ist eine professionelle Website eines der wirksamsten Instrumente, um kontinuierlich hochwertige Leads und Kundenanfragen zu generieren. Die Zeiten, in denen Mundpropaganda allein einen Handwerksbetrieb tragen konnte, sind vorbei — heute suchen Eigenheimbesitzer und gewerbliche Auftraggeber online nach Elektrikern, Klempnern, Dachdeckern, Malern, Fliesenlegern und Schreinern, bevor sie zum Telefon greifen. Wenn Ihr Handwerksbetrieb in den lokalen Suchergebnissen nicht erscheint, verlieren Sie wertvolle Aufträge an Wettbewerber, die in ihre digitale Präsenz investiert haben. Bei Coday sind wir eine spezialisierte Agentur in Wetzlar, die maßgeschneiderte Websites speziell für die Bedürfnisse von Handwerkern und Baubetrieben entwickelt. Wir wissen, dass Handwerker auf der Baustelle beschäftigt sind und eine Website brauchen, die rund um die Uhr für sie arbeitet — Leads erfasst und Vertrauen aufbaut, auch wenn sie gerade nicht ans Telefon gehen können. Unsere Websites bieten prominente Call-to-Action-Buttons, Click-to-Call-Funktionalität und schlanke Kontaktformulare, die es potenziellen Kunden mühelos ermöglichen, Angebote anzufordern oder Beratungsgespräche zu vereinbaren. Jede Designentscheidung wird mit einem einzigen Ziel getroffen: Website-Besucher in zahlende Kunden zu verwandeln.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'One of the most powerful marketing tools for craftsmen is a compelling before-and-after gallery that showcases completed projects. Homeowners want to see tangible proof of craftsmanship quality before entrusting someone with their renovation, construction, or repair project. We design visually striking portfolio sections with interactive image sliders, categorized project galleries, and detailed case studies that highlight the scope of work, materials used, and the transformation achieved. These galleries not only impress potential customers but also serve as excellent SEO content, as they can be optimized with descriptive alt text and relevant keywords such as "bathroom renovation Wetzlar" or "kitchen remodeling Hesse." We also integrate authentic customer testimonials and verified reviews directly into your website, because social proof is one of the strongest conversion drivers in the trades industry. A homeowner who sees five-star reviews alongside stunning project photos is far more likely to submit an inquiry than one who lands on a generic, text-only page. Our agency in Wetzlar helps you present your best work in the most persuasive way possible.'
              : 'Eines der wirkungsvollsten Marketinginstrumente für Handwerker ist eine überzeugende Vorher-Nachher-Galerie, die abgeschlossene Projekte präsentiert. Eigenheimbesitzer möchten greifbare Beweise für die Qualität der handwerklichen Arbeit sehen, bevor sie jemandem ihre Renovierung, ihren Neubau oder ihre Reparatur anvertrauen. Wir gestalten visuell beeindruckende Portfolio-Bereiche mit interaktiven Bild-Slidern, kategorisierten Projektgalerien und detaillierten Fallstudien, die den Umfang der Arbeiten, die verwendeten Materialien und die erzielte Transformation hervorheben. Diese Galerien beeindrucken nicht nur potenzielle Kunden, sondern dienen auch als exzellenter SEO-Content, da sie mit beschreibenden Alt-Texten und relevanten Keywords wie „Badsanierung Wetzlar" oder „Küchenumbau Hessen" optimiert werden können. Wir integrieren außerdem authentische Kundenstimmen und verifizierte Bewertungen direkt in Ihre Website, denn Social Proof ist einer der stärksten Conversion-Treiber in der Handwerksbranche. Ein Eigenheimbesitzer, der Fünf-Sterne-Bewertungen neben beeindruckenden Projektfotos sieht, wird deutlich eher eine Anfrage senden als jemand, der auf einer generischen, textlastigen Seite landet. Unsere Agentur in Wetzlar hilft Ihnen, Ihre beste Arbeit auf die überzeugendste Art und Weise zu präsentieren.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'A cornerstone of our digital strategy for craftsmen is comprehensive Google Business Profile optimization and local SEO. When someone in your service area searches for "electrician near me" or "roofing company Wetzlar," your business needs to appear in the Google Maps pack and the top organic results. We optimize your Google Business Profile with accurate business information, high-quality images of your work, service descriptions, and regularly published posts that keep your profile active and engaging. On your website, we implement local SEO best practices including location-specific landing pages, structured data markup with LocalBusiness schema, and consistent NAP (Name, Address, Phone) citations across all online directories. We also ensure your website loads blazingly fast on mobile devices, because the majority of craftsmen searches happen on smartphones — often by homeowners in the middle of an emergency plumbing issue or a power outage. Page speed and mobile usability are direct ranking factors, and our websites consistently achieve excellent Core Web Vitals scores that give you a competitive edge in search results.'
              : 'Ein Eckpfeiler unserer Digitalstrategie für Handwerker ist die umfassende Google Business Profil-Optimierung und lokale SEO. Wenn jemand in Ihrem Einzugsgebiet nach „Elektriker in meiner Nähe" oder „Dachdeckerei Wetzlar" sucht, muss Ihr Betrieb im Google Maps Pack und in den vorderen organischen Ergebnissen erscheinen. Wir optimieren Ihr Google Business Profil mit korrekten Geschäftsinformationen, hochwertigen Bildern Ihrer Arbeit, Leistungsbeschreibungen und regelmäßig veröffentlichten Beiträgen, die Ihr Profil aktiv und ansprechend halten. Auf Ihrer Website setzen wir lokale SEO-Best-Practices um — darunter standortspezifische Landing Pages, strukturierte Daten mit LocalBusiness-Schema und konsistente NAP-Einträge (Name, Adresse, Telefon) in allen Online-Verzeichnissen. Wir stellen außerdem sicher, dass Ihre Website auf mobilen Geräten blitzschnell lädt, denn die Mehrheit der Handwerker-Suchanfragen erfolgt über Smartphones — oft von Eigenheimbesitzern mitten in einem Rohrbruch-Notfall oder einem Stromausfall. Seitengeschwindigkeit und mobile Nutzerfreundlichkeit sind direkte Rankingfaktoren, und unsere Websites erreichen durchgängig exzellente Core Web Vitals-Werte, die Ihnen einen Wettbewerbsvorteil in den Suchergebnissen verschaffen.'}
          </p>
          <p>
            {_locale === 'en'
              ? 'Lead generation for craftsmen requires more than just a pretty website — it demands a strategic, conversion-focused approach. We implement intelligent lead capture mechanisms such as instant quote calculators, project planners, and callback request forms that lower the barrier for customers to reach out. Our websites are integrated with email notification systems so you receive every inquiry instantly on your phone, even when you are on the job. We also set up automated follow-up sequences that nurture leads who have shown interest but have not yet committed. Beyond the website itself, we help craftsmen in Wetzlar and Hesse establish a cohesive digital presence across all relevant platforms — from Google Maps and social media to regional trade directories. As a solo agency based right here in Wetzlar, Coday offers personal, no-nonsense service at transparent fixed prices. We speak the language of local businesses and understand the real challenges craft professionals face every day. No corporate overhead, no unnecessary complexity — just effective digital solutions that bring measurable results. Get in touch today to discuss how we can help your craft business grow with a professional website and targeted local marketing strategy.'
              : 'Lead-Generierung für Handwerker erfordert mehr als nur eine hübsche Website — sie verlangt einen strategischen, conversion-fokussierten Ansatz. Wir implementieren intelligente Lead-Erfassungsmechanismen wie Sofort-Angebotsrechner, Projektplaner und Rückruf-Anfrageformulare, die die Hemmschwelle für Kunden senken, Kontakt aufzunehmen. Unsere Websites sind mit E-Mail-Benachrichtigungssystemen integriert, sodass Sie jede Anfrage sofort auf Ihrem Smartphone erhalten — auch wenn Sie gerade auf der Baustelle sind. Zudem richten wir automatisierte Follow-up-Sequenzen ein, die Leads pflegen, die Interesse gezeigt, aber noch nicht zugesagt haben. Über die Website hinaus helfen wir Handwerkern in Wetzlar und Hessen, eine einheitliche digitale Präsenz auf allen relevanten Plattformen aufzubauen — von Google Maps und Social Media bis hin zu regionalen Branchenverzeichnissen. Als Solo-Agentur mit Sitz direkt in Wetzlar bietet Coday persönlichen, unkomplizierten Service zu transparenten Festpreisen. Wir sprechen die Sprache lokaler Unternehmen und verstehen die realen Herausforderungen, denen Handwerker täglich begegnen. Kein Konzern-Overhead, keine unnötige Komplexität — nur effektive digitale Lösungen, die messbare Ergebnisse liefern. Nehmen Sie noch heute Kontakt auf und erfahren Sie, wie wir Ihrem Handwerksbetrieb mit einer professionellen Website und gezielter lokaler Marketingstrategie zu mehr Aufträgen verhelfen können.'}
          </p>
        </div>
      </section>
      <IndustryToolEmbed industryKey="handwerk" />
    </>
  );
}
