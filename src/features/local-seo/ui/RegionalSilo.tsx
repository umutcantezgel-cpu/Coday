import React from 'react';
import { Link } from '@/i18n/navigation';
import { CITIES_HIERARCHY, COUNTIES_REGIONS } from '@/features/local-seo/model/schemaPyramid';
import { haversineDistance } from '@/shared/data/cities/utils';

/**
 * Closes the local silo: every city page links up to its county hub and
 * laterally to its nearest neighbours, with keyword-bearing anchors.
 *
 * Before this, the county hubs linked down to their cities 190 times while
 * 0 of 24 city pages linked back — a one-way street with no anchor signal
 * flowing to the county entity. The markup is the section that already shipped
 * on the Löhnberg page, so no new styling is introduced.
 *
 * Server component: no client JS.
 */
const NEIGHBOUR_COUNT = 5;

/** `Wetzlar (HQ)` is an internal label — anchors must read as a place name. */
function displayName(cityName: string) {
  return cityName.replace(/\s*\(HQ\)\s*$/, '');
}

/**
 * The Wetzlar page targets its own term rather than `Webdesign Wetzlar`, which
 * the homepage already owns — the generic anchor would put the two in competition.
 */
const ANCHOR_OVERRIDES: Record<string, { de: string; en: string }> = {
  'webdesign-agentur-wetzlar': {
    de: 'Webdesign Agentur Wetzlar',
    en: 'Web Design Agency Wetzlar',
  },
};

function anchorFor(city: { slug: string; cityName: string }, isEn: boolean) {
  const override = ANCHOR_OVERRIDES[city.slug];
  if (override) return isEn ? override.en : override.de;
  return `${isEn ? 'Web Design' : 'Webdesign'} ${displayName(city.cityName)}`;
}

export function RegionalSilo({ citySlug, locale }: { citySlug: string; locale: string }) {
  const city = CITIES_HIERARCHY[citySlug];
  if (!city) return null;

  const isEn = locale === 'en';
  // Frankfurt, Wiesbaden and Rüsselsheim carry `standorte/hessen` instead of a
  // county key — the same fallback the schema helpers use.
  const county = COUNTIES_REGIONS[city.countySlug];

  const others = Object.values(CITIES_HIERARCHY).filter((c) => c.slug !== citySlug);
  const sameCounty = others.filter((c) => county && c.countySlug === city.countySlug);
  const byDistance = others
    .filter((c) => !sameCounty.includes(c))
    .sort(
      (a, b) =>
        haversineDistance(city.lat, city.lng, a.lat, a.lng) -
        haversineDistance(city.lat, city.lng, b.lat, b.lng)
    );

  const neighbours = [...sameCounty, ...byDistance].slice(0, NEIGHBOUR_COUNT);

  // Bensheim and Darmstadt carry a countySlug that is only a routing fallback to
  // the nearest hub — naming that county in the heading would claim a membership
  // they do not have. Their own countyName differs, which is the reliable tell.
  const headingCounty = county && county.name === city.countyName ? county.name : null;
  const linkClass = 'hover:text-amber-800 underline decoration-slate-300 underline-offset-2';

  return (
    <section className="py-16 bg-white border-t border-slate-200 text-sm text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-4">
          {headingCounty
            ? isEn
              ? `Regional network in ${headingCounty} & Hesse:`
              : `Regionales Netzwerk im ${headingCounty} & Hessen:`
            : isEn
              ? 'Regional network in Hesse:'
              : 'Regionales Netzwerk in Hessen:'}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2.5">
          {neighbours.map((neighbour) => (
            <Link key={neighbour.slug} href={`/${neighbour.slug}`} className={linkClass}>
              {anchorFor(neighbour, isEn)}
            </Link>
          ))}

          {county && (
            <Link href={`/regionen/${county.slug}`} className={linkClass}>
              {isEn ? 'Web Design' : 'Webdesign'} {county.name}
            </Link>
          )}

          <Link href="/standorte/hessen" className={linkClass}>
            {isEn ? 'Web Design Hesse' : 'Webdesign Hessen'}
          </Link>
        </div>
      </div>
    </section>
  );
}
