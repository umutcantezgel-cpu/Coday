/**
 * The location pages as one list: the Hessen hub plus the four regional groups
 * that used to fill the header mega menu. The footer ("Alle Standorte") and the
 * llms.txt route render from here; the header no longer links them.
 *
 * Every key is an existing nav.locations.* message in
 * public/locales/{de,en}/common.json: no copy lives in this file.
 *
 * Drift risk: sitemap.ts, standorte/hessen/page.tsx, uebersicht/page.tsx and
 * schemaPyramid.ts each keep their own list of the same pages. A new city or
 * Kreis page has to be added to all of them; locationLinks.test.ts only proves
 * that every href here is also in the sitemap.
 */

export interface LocationLink {
  labelKey: string;
  href: string;
  descKey?: string;
}

export interface LocationGroup {
  titleKey: string;
  links: LocationLink[];
}

export const HESSEN_HUB = {
  labelKey: 'nav.locations.hessen_mittelhessen.hessen_hub',
  href: '/standorte/hessen',
  descKey: 'nav.locations.hessen_mittelhessen.hessen_hub_desc',
} satisfies LocationLink;

export const LOCATION_GROUPS: LocationGroup[] = [
  {
    titleKey: 'nav.locations.hessen_mittelhessen.title',
    links: [
      HESSEN_HUB,
      {
        labelKey: 'nav.locations.hessen_mittelhessen.wetzlar',
        href: '/webdesign-agentur-wetzlar',
        descKey: 'nav.locations.hessen_mittelhessen.wetzlar_desc',
      },
      {
        labelKey: 'nav.locations.hessen_mittelhessen.giessen',
        href: '/webdesign-giessen',
        descKey: 'nav.locations.hessen_mittelhessen.giessen_desc',
      },
      {
        labelKey: 'nav.locations.hessen_mittelhessen.marburg',
        href: '/webdesign-marburg',
        descKey: 'nav.locations.hessen_mittelhessen.marburg_desc',
      },
      {
        labelKey: 'nav.locations.hessen_mittelhessen.herborn',
        href: '/webdesign-herborn',
        descKey: 'nav.locations.hessen_mittelhessen.herborn_desc',
      },
      {
        labelKey: 'nav.locations.hessen_mittelhessen.dillenburg',
        href: '/webdesign-dillenburg',
        descKey: 'nav.locations.hessen_mittelhessen.dillenburg_desc',
      },
      {
        labelKey: 'nav.locations.hessen_mittelhessen.limburg',
        href: '/webdesign-limburg',
        descKey: 'nav.locations.hessen_mittelhessen.limburg_desc',
      },
      {
        labelKey: 'nav.locations.hessen_mittelhessen.weilburg',
        href: '/webdesign-weilburg',
        descKey: 'nav.locations.hessen_mittelhessen.weilburg_desc',
      },
      {
        labelKey: 'nav.locations.hessen_mittelhessen.loehnberg',
        href: '/webdesign-loehnberg',
        descKey: 'nav.locations.hessen_mittelhessen.loehnberg_desc',
      },
    ],
  },
  {
    titleKey: 'nav.locations.rhein_main.title',
    links: [
      {
        labelKey: 'nav.locations.rhein_main.frankfurt',
        href: '/webdesign-frankfurt',
        descKey: 'nav.locations.rhein_main.frankfurt_desc',
      },
      {
        labelKey: 'nav.locations.rhein_main.wiesbaden',
        href: '/webdesign-wiesbaden',
        descKey: 'nav.locations.rhein_main.wiesbaden_desc',
      },
      {
        labelKey: 'nav.locations.rhein_main.bad_homburg',
        href: '/webdesign-bad-homburg',
        descKey: 'nav.locations.rhein_main.bad_homburg_desc',
      },
      { labelKey: 'nav.locations.rhein_main.oberursel', href: '/webdesign-oberursel' },
      { labelKey: 'nav.locations.rhein_main.bad_vilbel', href: '/webdesign-bad-vilbel' },
      { labelKey: 'nav.locations.rhein_main.offenbach', href: '/webdesign-offenbach' },
      { labelKey: 'nav.locations.rhein_main.hanau', href: '/webdesign-hanau' },
      { labelKey: 'nav.locations.rhein_main.hofheim', href: '/webdesign-hofheim' },
      { labelKey: 'nav.locations.rhein_main.ruesselsheim', href: '/webdesign-ruesselsheim' },
      { labelKey: 'nav.locations.rhein_main.rodgau', href: '/webdesign-rodgau' },
      { labelKey: 'nav.locations.rhein_main.dietzenbach', href: '/webdesign-dietzenbach' },
      { labelKey: 'nav.locations.rhein_main.friedberg', href: '/webdesign-friedberg' },
    ],
  },
  {
    titleKey: 'nav.locations.sued_nord_ost.title',
    links: [
      {
        labelKey: 'nav.locations.sued_nord_ost.darmstadt',
        href: '/webdesign-darmstadt',
        descKey: 'nav.locations.sued_nord_ost.darmstadt_desc',
      },
      {
        labelKey: 'nav.locations.sued_nord_ost.bensheim',
        href: '/webdesign-bensheim',
        descKey: 'nav.locations.sued_nord_ost.bensheim_desc',
      },
      {
        labelKey: 'nav.locations.sued_nord_ost.kassel',
        href: '/webdesign-kassel',
        descKey: 'nav.locations.sued_nord_ost.kassel_desc',
      },
      {
        labelKey: 'nav.locations.sued_nord_ost.fulda',
        href: '/webdesign-fulda',
        descKey: 'nav.locations.sued_nord_ost.fulda_desc',
      },
    ],
  },
  {
    titleKey: 'nav.locations.districts.title',
    links: [
      { labelKey: 'nav.locations.districts.lahn_dill', href: '/regionen/landkreis-lahn-dill' },
      { labelKey: 'nav.locations.districts.giessen_lk', href: '/regionen/landkreis-giessen' },
      { labelKey: 'nav.locations.districts.wetterau', href: '/regionen/wetteraukreis' },
      { labelKey: 'nav.locations.districts.hochtaunus', href: '/regionen/hochtaunuskreis' },
      { labelKey: 'nav.locations.districts.main_taunus', href: '/regionen/main-taunus-kreis' },
      { labelKey: 'nav.locations.districts.kreis_offenbach', href: '/regionen/kreis-offenbach' },
      { labelKey: 'nav.locations.districts.main_kinzig', href: '/regionen/main-kinzig-kreis' },
      {
        labelKey: 'nav.locations.districts.marburg_biedenkopf',
        href: '/regionen/landkreis-marburg-biedenkopf',
      },
      {
        labelKey: 'nav.locations.districts.limburg_weilburg',
        href: '/regionen/landkreis-limburg-weilburg',
      },
      {
        labelKey: 'nav.locations.districts.rheingau_taunus',
        href: '/regionen/rheingau-taunus-kreis',
      },
      {
        labelKey: 'nav.locations.districts.darmstadt_dieburg',
        href: '/regionen/landkreis-darmstadt-dieburg',
      },
      { labelKey: 'nav.locations.districts.fulda_lk', href: '/regionen/landkreis-fulda' },
      { labelKey: 'nav.locations.districts.kassel_lk', href: '/regionen/landkreis-kassel' },
    ],
  },
];

/**
 * Walks a dotted key ('nav.locations.rhein_main.title') through a messages
 * object and returns the string found there, or '' when any segment is missing
 * or the value is not a string. For code that has the raw JSON but no
 * next-intl translator, such as the llms.txt route.
 */
export function resolveMessage(messages: Record<string, unknown>, key: string): string {
  let current: unknown = messages;
  for (const segment of key.split('.')) {
    if (typeof current !== 'object' || current === null) return '';
    current = (current as Record<string, unknown>)[segment];
  }
  return typeof current === 'string' ? current : '';
}
