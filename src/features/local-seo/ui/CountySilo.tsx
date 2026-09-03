import React from 'react';
import { Link } from '@/i18n/navigation';
import {
  COUNTIES_REGIONS,
  MITTELHESSEN_COUNTY_SLUGS,
} from '@/features/local-seo/model/schemaPyramid';

/**
 * Closes the rung of the silo that was missing entirely.
 *
 * `RegionalSilo` gave the 24 city pages an upward link to their Kreis and to
 * Hessen. The 13 Kreis hubs had no equivalent: a repo-wide search for
 * `standorte/hessen` inside `src/app/[locale]/regionen` returned nothing, so the
 * state hub — the tier every one of them sits under — received not a single
 * internal link from the tier below it. The containment existed in the JSON-LD
 * and nowhere a crawler could follow.
 *
 * Schema does not move authority; links do. This is the link half of the same
 * pyramid.
 *
 * Markup mirrors RegionalSilo exactly, so nothing new is introduced visually.
 * Server component: no client JS.
 */
const SIBLING_COUNT = 4;

export function CountySilo({ countySlug, locale }: { countySlug: string; locale: string }) {
  const county = COUNTIES_REGIONS[countySlug];
  if (!county) return null;

  const isEn = locale === 'en';
  const inMittelhessen = MITTELHESSEN_COUNTY_SLUGS.includes(countySlug as never);

  // Siblings from the same tier first — the four Mittelhessen Kreise belong
  // together, and pairing one of them with Landkreis Kassel would suggest a
  // proximity that does not exist.
  const all = Object.values(COUNTIES_REGIONS).filter((c) => c.slug !== countySlug);
  const sameTier = all.filter(
    (c) => MITTELHESSEN_COUNTY_SLUGS.includes(c.slug as never) === inMittelhessen
  );
  const siblings = [...sameTier, ...all.filter((c) => !sameTier.includes(c))].slice(
    0,
    SIBLING_COUNT
  );

  const linkClass = 'hover:text-amber-800 underline decoration-slate-300 underline-offset-2';

  return (
    <section className="py-16 bg-white border-t border-slate-200 text-sm text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-4">
          {inMittelhessen
            ? isEn
              ? 'Regional network in Central Hesse:'
              : 'Regionales Netzwerk in Mittelhessen:'
            : isEn
              ? 'Regional network in Hesse:'
              : 'Regionales Netzwerk in Hessen:'}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2.5">
          {siblings.map((sibling) => (
            <Link key={sibling.slug} href={`/regionen/${sibling.slug}`} className={linkClass}>
              {isEn ? 'Web Design' : 'Webdesign'} {sibling.name}
            </Link>
          ))}

          <Link href="/standorte/hessen" className={linkClass}>
            {isEn ? 'Web Design Hesse' : 'Webdesign Hessen'}
          </Link>
        </div>
      </div>
    </section>
  );
}
