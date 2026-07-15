import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ContactClient } from '@/features/contact/ui/ContactClient';
import { SeoHead } from '@/shared/ui/SeoHead';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Contact Us | Web Design Agency Wetzlar Hesse',
      description:
        'Get in touch with Coday, your web design agency in Wetzlar, Hesse. Free initial consultation on-site or via video call. We reply within 24 hours.',
      path: '/en/contact',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Kontakt | Webdesign Agentur Wetzlar Mittelhessen',
    description:
      'Nehmen Sie Kontakt zu Coday auf, Ihrer Webdesign Agentur in Wetzlar. Kostenloses Erstgespräch vor Ort oder per Video. Antwort innerhalb von 24 Stunden.',
    path: '/de/contact',
    type: 'money',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  return (
    <>
      <SeoHead
        title="Kontakt aufnehmen | Coday Webdesign Wetzlar"
        description="Sprechen Sie mit Coday aus Wetzlar, Hessen über Ihr nächstes Webprojekt. Wir entwickeln High-Performance Websites und Apps für Ihren digitalen Erfolg."
        pageType="contact"
      />
      <ContactClient />
      {/* SEO */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        <h2 className="text-3xl font-display font-bold mb-6">
          {resolvedParams.locale === 'en'
            ? 'Contact Coday – Your Web Design Agency in Wetzlar, Hesse'
            : 'Webdesign Agentur Wetzlar – Ihr Kontakt zu uns'}
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          {resolvedParams.locale === 'en' ? (
            <>
              <p>
                Looking for a reliable web design agency in Wetzlar and the greater Hesse region?
                The first step toward a successful digital presence starts with a no-obligation
                consultation. At Coday, we understand that every business is unique and requires
                tailored solutions. As a dedicated web design partner based in Wetzlar, we combine
                strategic thinking with technical excellence to build websites that convert visitors
                into customers. Whether you need a brand-new corporate website, a complex web
                application, or a high-performance e-commerce platform, our expertise in React,
                Next.js, and modern frontend engineering ensures your project is built on a
                future-proof foundation.
              </p>
              <p>
                Getting in touch with us could not be easier. Send us an email, give us a call, or
                use the contact form above — we typically respond within 24 hours. In our free
                initial consultation, we discuss the feasibility of your project, analyze your
                target audience, and outline first solution approaches tailored to your goals.
                Wetzlar, located in the heart of Hesse, gives us the ideal base to serve both local
                businesses and clients across Germany and beyond. We pride ourselves on transparent
                communication, fixed-price quotes, and no hidden costs, so you always know exactly
                what to expect.
              </p>
              <p>
                A professional online presence is the single most important touchpoint for any
                modern business. Our services cover the full spectrum of web design and development:
                from UX/UI design and brand identity to search engine optimization (SEO),
                accessibility audits, and ongoing technical maintenance. We do not just build
                websites — we build digital experiences that drive measurable results. Every project
                we deliver is optimized for Core Web Vitals, mobile responsiveness, and search
                engine visibility to ensure maximum reach and engagement for your brand.
              </p>
              <p>
                We look forward to learning about your project and writing your next digital success
                story together. Contact Coday today and start your digital transformation with a
                trusted web design agency in Wetzlar, Hesse. Your satisfaction is our top priority —
                through regular updates, close collaboration, and meticulous quality assurance, we
                ensure the final product matches your vision precisely. Trust our deep expertise and
                years of experience in modern web development. Reach out now for a free,
                no-obligation quote and let us turn your project into a success.
              </p>
            </>
          ) : (
            <>
              <p>
                Suchen Sie nach einer zuverlässigen Webdesign Agentur in Wetzlar und Mittelhessen?
                Der erste Schritt zu einer erfolgreichen digitalen Präsenz beginnt mit einem
                unverbindlichen Beratungsgespräch. Lassen Sie uns über Ihr digitales Projekt
                sprechen – bei Coday verstehen wir, dass jedes Unternehmen einzigartig ist und
                individuelle Lösungen erfordert. Als Ihr engagierter Webdesign-Partner in Wetzlar
                verbinden wir strategisches Denken mit technischer Exzellenz, um Websites zu
                entwickeln, die Besucher in Kunden verwandeln. Ob Sie eine komplett neue
                Unternehmenswebsite benötigen, eine komplexe Web-Applikation oder eine performante
                E-Commerce-Lösung – unsere Expertise in React, Next.js und modernem
                Frontend-Engineering sorgt dafür, dass Ihr digitales Projekt auf einem
                zukunftssicheren Fundament steht.
              </p>
              <p>
                Die Kontaktaufnahme ist unkompliziert: Schreiben Sie uns eine E-Mail, rufen Sie uns
                an oder nutzen Sie das Kontaktformular oben – wir antworten in der Regel innerhalb
                von 24 Stunden. In einem ersten, kostenlosen Gespräch klären wir die Machbarkeit
                Ihres Projekts, analysieren Ihre Zielgruppe und zeigen Ihnen erste Lösungsansätze
                auf, die genau auf Ihre Ziele zugeschnitten sind. Wetzlar in Mittelhessen bietet uns
                die ideale Basis, um sowohl lokale Unternehmen in Hessen als auch überregionale
                Kunden optimal zu betreuen. Wir legen großen Wert auf transparente Kommunikation,
                Festpreisangebote und keine versteckten Kosten, damit Sie jederzeit genau wissen,
                was Sie erwartet.
              </p>
              <p>
                Ein professioneller Internetauftritt ist heutzutage der wichtigste Berührungspunkt
                für jedes moderne Unternehmen. Unsere Leistungen decken das gesamte Spektrum von
                Webdesign und Entwicklung ab: von UX/UI-Design und Markenidentität über
                Suchmaschinenoptimierung (SEO) und Barrierefreiheits-Audits bis hin zur laufenden
                technischen Wartung. Wir bauen nicht nur Websites – wir schaffen digitale
                Erlebnisse, die messbare Ergebnisse liefern. Jedes Projekt, das wir umsetzen, ist
                optimiert für Core Web Vitals, Mobile-Responsiveness und Suchmaschinen-Sichtbarkeit,
                um maximale Reichweite und Engagement für Ihre Marke zu gewährleisten.
              </p>
              <p>
                Wir freuen uns darauf, Sie und Ihr Projekt kennenzulernen und gemeinsam digitale
                Erfolgsgeschichten zu schreiben. Nehmen Sie noch heute Kontakt auf und starten Sie
                Ihre digitale Transformation mit Coday, Ihrer vertrauenswürdigen Webdesign Agentur
                in Wetzlar, Mittelhessen. Ihre Zufriedenheit steht für uns an erster Stelle – durch
                regelmäßige Updates, enge Abstimmungsprozesse und sorgfältige Qualitätssicherung
                stellen wir sicher, dass das Endprodukt genau Ihren Vorstellungen entspricht.
                Vertrauen Sie auf unser fundiertes Know-how und unsere Erfahrung im Bereich der
                modernen Webentwicklung. Kontaktieren Sie uns jetzt für ein unverbindliches Angebot
                und lassen Sie uns gemeinsam über Ihr nächstes digitales Projekt sprechen.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
