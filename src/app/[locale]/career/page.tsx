import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { getOrganizationSchema, BASE_URL } from '@/lib/schema';
import { CareerOverviewClient } from '@/features/career/ui/CareerOverviewClient';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Careers at Coday | Web Design Agency Jobs Wetzlar',
      description:
        'Discover exciting career opportunities at the web design agency Coday in Wetzlar. Join our team for premium web development & digital solutions.',
      path: '/en/career',
      type: 'default',
    });
  }
  return generatePageMetadata({
    title: 'Karriere bei Coday | Webdesign Agentur Jobs Wetzlar',
    description:
      'Entdecken Sie tolle Karrieremöglichkeiten in der Webdesign Agentur Coday in Wetzlar. Werden Sie Teil unseres Teams für Premium Webentwicklung!',
    path: '/de/career',
    type: 'default',
  });
}

export default async function CareerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationSchema(),
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/${locale}/career`,
        name: isEn ? 'Careers at Coday' : 'Karriere bei Coday',
        description: isEn
          ? 'Discover exciting career opportunities at the web design agency Coday in Wetzlar. Join our team for premium web development & digital solutions.'
          : 'Entdecken Sie tolle Karrieremöglichkeiten in der Webdesign Agentur Coday in Wetzlar. Werden Sie Teil unseres Teams für Premium Webentwicklung!',
        isPartOf: { '@id': `${BASE_URL}/#website` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerOverviewClient />
      {/* SEO Content */}
      <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
        {isEn ? (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Careers at Coday – Your Future in Web Development in Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Welcome to the careers page of Coday, your leading agency for premium web design and
                digital solutions in Wetzlar and the greater Central Hesse region. If you are
                looking for a new professional challenge in web development, UI/UX design, or
                digital marketing, you have come to the right place. Our mission is not only to
                create outstanding digital products for our clients but also to provide a work
                environment that fosters creativity, innovation, and continuous growth. Wetzlar, as
                a thriving business hub in Hesse, offers the perfect backdrop for a flourishing
                career in the tech industry.
              </p>
              <p>
                At Coday, we place great value on a collaborative and inspiring work culture. We
                firmly believe that the best results emerge when talented individuals with diverse
                perspectives and skill sets work together. Whether you are an experienced frontend
                developer well-versed in React, Next.js, and modern CSS frameworks, a backend
                specialist who architects robust and scalable systems, or a creative web designer
                with an eye for detail – you will find exciting projects with us that both challenge
                and advance your career. Our agency serves clients across a wide range of
                industries, which means no two days are the same and you always have the opportunity
                to explore new domains and continuously expand your portfolio.
              </p>
              <p>
                We understand that the technology industry is constantly evolving. That is why we
                continuously invest in the professional development of our team. Regular workshops,
                conference attendance, and the open exchange of knowledge are integral parts of our
                daily work. We want our team members to stay at the forefront of innovation – not
                just following the latest trends and technologies, but actively shaping them. In
                addition, we offer flexible working arrangements that allow you to strike the ideal
                balance between your professional and personal life. Whether in our modern office in
                the heart of Wetzlar or working remotely – we create the conditions for you to
                deliver your best work.
              </p>
              <p>
                Launch your career at an up-and-coming web design agency in Wetzlar. Explore our
                current job openings or send us a speculative application if you believe you would
                be a perfect fit for our team, even if no matching position is currently advertised.
                We are always looking for motivated and passionate talent eager to shape the digital
                future alongside us. Let us build outstanding web projects together and elevate our
                clients&apos; online presence to the next level. We look forward to getting to know
                you and perhaps welcoming you as a new member of the Coday family very soon. Shape
                your future with us in Wetzlar, Hesse!
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-display font-bold mb-6">
              Karriere bei Coday – Ihre Zukunft in der Webentwicklung in Wetzlar
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Willkommen auf der Karriereseite von Coday, Ihrer führenden Agentur für
                Premium-Webdesign und digitale Lösungen in Wetzlar und der gesamten Region
                Mittelhessen. Wenn Sie auf der Suche nach einer neuen beruflichen Herausforderung im
                Bereich Webentwicklung, UI/UX-Design oder digitales Marketing sind, dann sind Sie
                hier genau richtig. Unser Ziel ist es, nicht nur herausragende digitale Produkte für
                unsere Kunden zu erschaffen, sondern auch ein Arbeitsumfeld zu bieten, das
                Kreativität, Innovation und kontinuierliches Wachstum fördert. Wetzlar, als
                pulsierender Wirtschaftsstandort in Hessen, bietet die perfekte Kulisse für eine
                florierende Karriere in der Tech-Branche.
              </p>
              <p>
                Bei Coday legen wir großen Wert auf ein kollegiales und inspirierendes Arbeitsklima.
                Wir glauben fest daran, dass die besten Ergebnisse dann entstehen, wenn talentierte
                Menschen mit unterschiedlichen Perspektiven und Fähigkeiten zusammenarbeiten. Egal,
                ob Sie ein erfahrener Frontend-Entwickler sind, der sich bestens mit React, Next.js
                und modernen CSS-Frameworks auskennt, ein Backend-Spezialist, der robuste und
                skalierbare Architekturen entwirft, oder ein kreativer Webdesigner mit einem Auge
                für das Detail – bei uns finden Sie spannende Projekte, die Sie fordern und fördern
                werden. Unsere Agentur betreut Kunden aus verschiedensten Branchen, was bedeutet,
                dass kein Tag wie der andere ist und Sie stets die Möglichkeit haben, sich in neue
                Themengebiete einzuarbeiten und Ihr Portfolio stetig zu erweitreiben.
              </p>
              <p>
                Wir wissen, dass die Technologiebranche einem ständigen Wandel unterworfen ist.
                Deshalb investieren wir kontinuierlich in die Weiterbildung unseres Teams.
                Regelmäßige Workshops, der Besuch von Konferenzen und der freie Austausch von Wissen
                gehören bei uns zum Arbeitsalltag. Wir möchten, dass unsere Mitarbeiter stets am
                Puls der Zeit bleiben und die neuesten Trends und Technologien nicht nur kennen,
                sondern aktiv mitgestalten. Darüber hinaus bieten wir flexible Arbeitszeitmodelle,
                die es Ihnen ermöglichen, Beruf und Privatleben optimal miteinander zu vereinbaren.
                Ob im modernen Büro im Herzen von Wetzlar oder im Homeoffice – wir schaffen die
                Rahmenbedingungen, damit Sie Ihre beste Leistung erbringen können.
              </p>
              <p>
                Starten Sie Ihre Karriere bei einer aufstrebenden Webdesign-Agentur in Wetzlar.
                Entdecken Sie unsere aktuellen Stellenangebote oder senden Sie uns eine
                Initiativbewerbung, wenn Sie der Meinung sind, dass Sie perfekt in unser Team
                passen, auch wenn gerade keine passende Position ausgeschrieben ist. Wir sind immer
                auf der Suche nach motivierten und leidenschaftlichen Talenten, die gemeinsam mit
                uns die digitale Zukunft gestalten möchten. Lassen Sie uns gemeinsam großartige
                Webprojekte realisieren und die Online-Präsenz unserer Kunden auf das nächste Level
                heben. Wir freuen uns darauf, Sie kennenzulernen und vielleicht schon bald als neues
                Mitglied in der Coday-Familie begrüßen zu dürfen. Gestalten Sie Ihre Zukunft mit uns
                in Wetzlar, Hessen!
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
