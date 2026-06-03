import React from 'react';
import { Link } from '@/i18n/navigation';
import { getNearbyCities } from '@/features/local-seo/model/cities';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const NearbyCities: React.FC<{ currentSlug: string }> = ({ currentSlug }) => {
  const nearby = getNearbyCities(currentSlug, 6);

  if (nearby.length === 0) return null;

  return (
    <section className="py-[var(--space-section)] bg-secondary border-t border-white/10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Digitale Exzellenz in der gesamten Region
        </h2>

        <nav aria-label="Nahegelegene Städte">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 list-none p-0 m-0">
            {nearby.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/webagentur-${city.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition motion-reduce:duration-[0.01ms] group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                      {city.displayName}
                    </div>
                    <div className="text-xs text-muted">{city.distanceFromCurrent} km</div>
                  </div>
                  <ArrowRight className="text-muted group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};
