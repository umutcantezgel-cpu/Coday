import React from 'react';
import { useLocale } from 'next-intl';
import { OptimizedImage } from '@/shared/ui/OptimizedImage';

export const SeoAuthorBlock: React.FC = () => {
  const locale = useLocale();
  const isDe = locale !== 'en';

  return (
    <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-2 border-white/10 relative">
          <OptimizedImage
            src="/images/agency/umutcan-emre-tezgel-coday-webdesign-agentur-wetzlar-inhaber.webp"
            alt="Umutcan Emre Tezgel - Inhaber Coday Webdesign Agentur Wetzlar"
            className="w-full h-full object-cover"
            title="Umutcan Emre Tezgel"
          />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {isDe ? 'Über den Autor & die Coday Agentur' : 'About the Author & Coday Agency'}
          </h3>
          <p className="text-gray-300 font-medium mb-4">
            {isDe
              ? 'Umutcan Emre Tezgel · Inhaber & Senior Entwickler'
              : 'Umutcan Emre Tezgel · Owner & Senior Developer'}
          </p>
          <div className="prose prose-invert max-w-none text-gray-400 text-sm md:text-base leading-relaxed">
            {isDe ? (
              <>
                <p>
                  Als Inhaber der <strong>Coday Webdesign Agentur in Wetzlar</strong> verfasse ich
                  regelmäßig Fachartikel rund um die Themen moderne Webentwicklung, Headless CMS,
                  Performance-Optimierung und strategisches UI/UX-Design. Mein Anspruch ist es,
                  Unternehmen im B2B- und B2C-Sektor nicht nur technisch einwandfreie, sondern auch
                  geschäftsfördernde digitale Lösungen zu liefern.
                </p>
                <p>
                  Bei Coday setzen wir auf messbare Resultate: blitzschnelle Ladezeiten durch
                  Next.js, erstklassige Suchmaschinenoptimierung (SEO), barrierefreie Interfaces und
                  ein Premium-Design, das bei Ihren Kunden nachhaltig Vertrauen schafft. Wir
                  verstehen uns als langfristiger Technologiepartner für Unternehmen in ganz Hessen
                  und darüber hinaus, die den nächsten digitalen Schritt gehen wollen. Ob komplexe
                  Web-Applikationen, maßgeschneiderte Corporate Websites oder Conversion-starke
                  E-Commerce Plattformen – handwerkliche Code-Qualität, ehrliche Transparenz und
                  eine partnerschaftliche Zusammenarbeit auf Augenhöhe stehen bei mir immer an
                  erster Stelle. Zögern Sie nicht, Kontakt aufzunehmen, wenn Sie Ihr digitales
                  Produkt auf das nächste Level heben möchten.
                </p>
              </>
            ) : (
              <>
                <p>
                  As the owner of the <strong>Coday Web Design Agency in Wetzlar, Germany</strong>,
                  I regularly write technical articles on modern web development, Headless CMS,
                  performance optimization, and strategic UI/UX design. My goal is to provide
                  businesses in both B2B and B2C sectors with digital solutions that are not only
                  technically flawless but also drive real business results.
                </p>
                <p>
                  At Coday, we focus on measurable results: lightning-fast load times through
                  Next.js, top-tier search engine optimization (SEO), fully accessible interfaces,
                  and premium design that builds lasting trust with your customers. We see ourselves
                  as a long-term technology partner for companies ready to take their next digital
                  step. Whether it's complex web applications, highly customized corporate websites,
                  or high-conversion e-commerce platforms, handcrafted code quality, absolute
                  transparency, and a true partnership are always my top priorities. Don't hesitate
                  to reach out if you are ready to elevate your digital product to the next level.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
