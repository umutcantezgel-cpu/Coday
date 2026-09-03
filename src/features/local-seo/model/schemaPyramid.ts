import { BASE_URL, ORG_ID, FOUNDER_ID, getReviewsSchema } from '@/lib/schema';

export interface CountyData {
  slug: string;
  name: string;
  wikidataId: string;
  capital: string;
  shortDesc: string;
  municipalities: string[];
}

export interface CityDataHierarchy {
  slug: string;
  cityName: string;
  countySlug: string;
  countyName: string;
  zip: string;
  street: string;
  lat: number;
  lng: number;
  wikidataId: string;
  districts: string[];
  serviceKeywords: string[];
}

export const HESSEN_STATE = {
  name: 'Hessen',
  wikidataId: 'https://www.wikidata.org/wiki/Q1198',
  url: `${BASE_URL}/de/standorte/hessen`,
  lat: 50.5558,
  lng: 8.5022,
};

export const COUNTIES_REGIONS: Record<string, CountyData> = {
  'landkreis-lahn-dill': {
    slug: 'landkreis-lahn-dill',
    name: 'Lahn-Dill-Kreis',
    wikidataId: 'https://www.wikidata.org/wiki/Q7903',
    capital: 'Wetzlar',
    shortDesc: 'Optik, Photonik, Feinmechanik & innovativer Mittelstand in Mittelhessen.',
    municipalities: [
      'Wetzlar',
      'Herborn',
      'Dillenburg',
      'Haiger',
      'Braunfels',
      'Solms',
      'Aßlar',
      'Ehringshausen',
      'Sinn',
      'Mittenaar',
      'Dietzhölztal',
      'Eschenburg',
      'Lahnau',
      'Hüttenberg',
      'Schöffengrund',
      'Waldsolms',
      'Greifenstein',
      'Driedorf',
      'Breitscheid',
      'Bischoffen',
      'Siegbach',
    ],
  },
  'landkreis-giessen': {
    slug: 'landkreis-giessen',
    name: 'Landkreis Gießen',
    wikidataId: 'https://www.wikidata.org/wiki/Q7900',
    capital: 'Gießen',
    shortDesc: 'Medizintechnik, universitäre Forschung, Logistik & starker Mittelstand.',
    municipalities: [
      'Gießen',
      'Grünberg',
      'Hungen',
      'Laubach',
      'Lich',
      'Linden',
      'Lollar',
      'Pohlheim',
      'Staufenberg',
      'Allendorf (Lumda)',
      'Buseck',
      'Fernwald',
      'Heuchelheim',
      'Langgöns',
      'Rabenau',
      'Reiskirchen',
      'Wettenberg',
      'Biebertal',
    ],
  },
  'landkreis-marburg-biedenkopf': {
    slug: 'landkreis-marburg-biedenkopf',
    name: 'Landkreis Marburg-Biedenkopf',
    wikidataId: 'https://www.wikidata.org/wiki/Q7904',
    capital: 'Marburg',
    shortDesc: 'Pharma-Cluster Behringwerke, Biotechnologie, Gesundheitswirtschaft & Handwerk.',
    municipalities: [
      'Marburg',
      'Biedenkopf',
      'Gladenbach',
      'Kirchhain',
      'Neustadt',
      'Rauschenberg',
      'Stadtallendorf',
      'Amöneburg',
      'Dautphetal',
      'Ebsdorfergrund',
      'Fronhausen',
      'Lahntal',
      'Münchhausen',
      'Weimar',
      'Wohratal',
    ],
  },
  'landkreis-limburg-weilburg': {
    slug: 'landkreis-limburg-weilburg',
    name: 'Landkreis Limburg-Weilburg',
    wikidataId: 'https://www.wikidata.org/wiki/Q7902',
    capital: 'Limburg an der Lahn',
    shortDesc: 'Handel, ICE-Drehscheibe, verarbeitende Industrie & starker Dienstleistungssektor.',
    municipalities: [
      'Limburg an der Lahn',
      'Weilburg',
      'Löhnberg',
      'Bad Camberg',
      'Hadamar',
      'Runkel',
      'Beselich',
      'Brechen',
      'Dornburg',
      'Elbtal',
      'Elz',
      'Hünfelden',
      'Mengerskirchen',
      'Merenberg',
      'Villmar',
      'Waldbrunn',
      'Weilmünster',
    ],
  },
  wetteraukreis: {
    slug: 'wetteraukreis',
    name: 'Wetteraukreis',
    wikidataId: 'https://www.wikidata.org/wiki/Q7908',
    capital: 'Friedberg',
    shortDesc: 'Wirtschaftsachse zwischen Frankfurt und Mittelhessen, Gewerbe & Hightech.',
    municipalities: [
      'Friedberg',
      'Bad Nauheim',
      'Bad Vilbel',
      'Büdingen',
      'Butzbach',
      'Gedern',
      'Karben',
      'Münzenberg',
      'Nidda',
      'Niddatal',
      'Ortenberg',
      'Reichelsheim',
      'Rosbach vor der Höhe',
      'Altenstadt',
      'Echzell',
      'Glauburg',
      'Hirzenhain',
      'Limeshain',
      'Ober-Mörlen',
      'Ranstadt',
      'Rockenberg',
      'Wölfersheim',
      'Wöllstadt',
    ],
  },
  hochtaunuskreis: {
    slug: 'hochtaunuskreis',
    name: 'Hochtaunuskreis',
    wikidataId: 'https://www.wikidata.org/wiki/Q7901',
    capital: 'Bad Homburg vor der Höhe',
    shortDesc: 'Internationale Unternehmenssitze, Family Offices, Medizintechnik & IT.',
    municipalities: [
      'Bad Homburg vor der Höhe',
      'Friedrichsdorf',
      'Königstein im Taunus',
      'Kronberg im Taunus',
      'Neu-Anspach',
      'Oberursel (Taunus)',
      'Usingen',
      'Glashütten',
      'Grävenwiesbach',
      'Schmitten',
      'Wehrheim',
      'Weilrod',
    ],
  },
  'main-taunus-kreis': {
    slug: 'main-taunus-kreis',
    name: 'Main-Taunus-Kreis',
    wikidataId: 'https://www.wikidata.org/wiki/Q7905',
    capital: 'Hofheim am Taunus',
    shortDesc: 'Direkte Nachbarschaft zu Frankfurt, IT-Cluster, Kanzleien & B2B-Mittelstand.',
    municipalities: [
      'Hofheim am Taunus',
      'Bad Soden am Taunus',
      'Eppstein',
      'Eschborn',
      'Flörsheim am Main',
      'Hattersheim am Main',
      'Hochheim am Main',
      'Kelkheim (Taunus)',
      'Schwalbach am Taunus',
      'Kriftel',
      'Liederbach am Taunus',
      'Sulzbach (Taunus)',
    ],
  },
  'kreis-offenbach': {
    slug: 'kreis-offenbach',
    name: 'Kreis Offenbach',
    wikidataId: 'https://www.wikidata.org/wiki/Q7907',
    capital: 'Dietzenbach',
    shortDesc: 'Dynamischer Wirtschaftsraum Rhein-Main, IT, Logistik & Industrie.',
    municipalities: [
      'Dietzenbach',
      'Dreieich',
      'Heusenstamm',
      'Langen',
      'Mühlheim am Main',
      'Neu-Isenburg',
      'Obertshausen',
      'Rodgau',
      'Rödermark',
      'Seligenstadt',
      'Egelsbach',
      'Hainburg',
      'Mainhausen',
    ],
  },
  'main-kinzig-kreis': {
    slug: 'main-kinzig-kreis',
    name: 'Main-Kinzig-Kreis',
    wikidataId: 'https://www.wikidata.org/wiki/Q7906',
    capital: 'Gelnhausen',
    shortDesc: 'Materialtechnik, Maschinenbau, Handel & Industrie zwischen Hanau und Fulda.',
    municipalities: [
      'Hanau',
      'Gelnhausen',
      'Bruchköbel',
      'Langenselbold',
      'Maintal',
      'Nidderau',
      'Schlüchtern',
      'Steinau an der Straße',
      'Wächtersbach',
      'Bad Orb',
      'Bad Soden-Salmünster',
      'Biebergemünd',
      'Birstein',
      'Brachttal',
      'Freigericht',
      'Gründau',
      'Großkrotzenburg',
      'Hammersbach',
      'Hasselroth',
      'Jossgrund',
      'Linsengericht',
      'Neuberg',
      'Rodenbach',
      'Ronneburg',
      'Schöneck',
      'Sinntal',
    ],
  },
  'landkreis-darmstadt-dieburg': {
    slug: 'landkreis-darmstadt-dieburg',
    name: 'Landkreis Darmstadt-Dieburg',
    wikidataId: 'https://www.wikidata.org/wiki/Q7899',
    capital: 'Darmstadt (Kranichstein)',
    shortDesc: 'Hightech-Region Südhessen, Software-Cluster, Ingenieurbau & Industrie.',
    municipalities: [
      'Babenhausen',
      'Dieburg',
      'Griesheim',
      'Groß-Bieberau',
      'Groß-Umstadt',
      'Ober-Ramstadt',
      'Pfungstadt',
      'Reinheim',
      'Weiterstadt',
      'Alsbach-Hähnlein',
      'Bickenbach',
      'Eppertshausen',
      'Erzhausen',
      'Fischbachtal',
      'Groß-Zimmern',
      'Messel',
      'Modautal',
      'Mühltal',
      'Münster',
      'Otzberg',
      'Roßdorf',
      'Seeheim-Jugenheim',
      'Schaafheim',
    ],
  },
  'rheingau-taunus-kreis': {
    slug: 'rheingau-taunus-kreis',
    name: 'Rheingau-Taunus-Kreis',
    wikidataId: 'https://www.wikidata.org/wiki/Q7909',
    capital: 'Bad Schwalbach',
    shortDesc: 'Gesundheitswirtschaft, Weinbau, Premium-Tourismus & B2B-Dienstleister.',
    municipalities: [
      'Bad Schwalbach',
      'Eltville am Rhein',
      'Geisenheim',
      'Idstein',
      'Lorch',
      'Oestrich-Winkel',
      'Rüdesheim am Rhein',
      'Taunusstein',
      'Aarbergen',
      'Heidenrod',
      'Hohenstein',
      'Hünstetten',
      'Kiedrich',
      'Schlangenbad',
      'Waldems',
      'Walluf',
    ],
  },
  'landkreis-fulda': {
    slug: 'landkreis-fulda',
    name: 'Landkreis Fulda',
    wikidataId: 'https://www.wikidata.org/wiki/Q7898',
    capital: 'Fulda',
    shortDesc: 'Zentraler Logistikknotenpunkt, Maschinenbau, IT & Industrie in Osthessen.',
    municipalities: [
      'Fulda',
      'Hünfeld',
      'Gersfeld',
      'Tann',
      'Bad Salzschlirf',
      'Burghaun',
      'Dipperz',
      'Ebersburg',
      'Ehrenberg',
      'Eichenzell',
      'Eiterfeld',
      'Flieden',
      'Großenlüder',
      'Hilders',
      'Hofbieber',
      'Hosenfeld',
      'Kalbach',
      'Neuhof',
      'Nüsttal',
      'Petersberg',
      'Poppenhausen',
      'Rasdorf',
    ],
  },
  'landkreis-kassel': {
    slug: 'landkreis-kassel',
    name: 'Landkreis Kassel',
    wikidataId: 'https://www.wikidata.org/wiki/Q7897',
    capital: 'Kassel',
    shortDesc: 'Mobilitätswirtschaft, Erneuerbare Energien, Maschinenbau & Logistik in Nordhessen.',
    municipalities: [
      'Baunatal',
      'Hofgeismar',
      'Immenhausen',
      'Liebenau',
      'Naumburg',
      'Trendelburg',
      'Vellmar',
      'Wolfhagen',
      'Zierenberg',
      'Ahnatal',
      'Bad Emstal',
      'Bad Karlshafen',
      'Breuna',
      'Calden',
      'Espenau',
      'Fuldabrück',
      'Fuldatal',
      'Habichtswald',
      'Helsa',
      'Kaufungen',
      'Lohfelden',
      'Nieste',
      'Niestetal',
      'Reinhardshagen',
      'Schauenburg',
      'Söhrewald',
      'Wesertal',
    ],
  },
};

export const CITIES_HIERARCHY: Record<string, CityDataHierarchy> = {
  'webdesign-agentur-wetzlar': {
    slug: 'webdesign-agentur-wetzlar',
    cityName: 'Wetzlar (HQ)',
    countySlug: 'landkreis-lahn-dill',
    countyName: 'Lahn-Dill-Kreis',
    zip: '35578',
    street: 'Lessingstraße 4',
    lat: 50.5558,
    lng: 8.5076,
    wikidataId: 'https://www.wikidata.org/wiki/Q3852',
    districts: [
      'Kernstadt Wetzlar',
      'Nauborn',
      'Hermannstein',
      'Dutenhofen',
      'Garbenheim',
      'Steindorf',
      'Münchholzhausen',
      'Blasbach',
      'Niedergirmes',
    ],
    serviceKeywords: [
      'Next.js 15 Webentwicklung Wetzlar',
      'Optik & MedTech B2B Portale',
      'Handwerker Webdesign Wetzlar',
      'Local SEO Lahn-Dill',
      'Sanity Headless CMS',
    ],
  },
  'webdesign-giessen': {
    slug: 'webdesign-giessen',
    cityName: 'Gießen',
    countySlug: 'landkreis-giessen',
    countyName: 'Landkreis Gießen',
    zip: '35390',
    street: 'Regionalbüro Mittelhessen / HQ Wetzlar',
    lat: 50.587274,
    lng: 8.67554,
    wikidataId: 'https://www.wikidata.org/wiki/Q3869',
    districts: [
      'Innenstadt',
      'Wieseck',
      'Kleinlinden',
      'Allendorf',
      'Rödgen',
      'Lützellinden',
      'Schiffenberger Tal',
      'TIG Technologiezentrum',
    ],
    serviceKeywords: [
      'Praxis- & Klinikwebseiten Gießen',
      'TIG Startup Webentwicklung',
      'Next.js 15 Webentwicklung',
      'B2B Portale Mittelhessen',
      'Local SEO Gießener Ring',
    ],
  },
  'webdesign-marburg': {
    slug: 'webdesign-marburg',
    cityName: 'Marburg',
    countySlug: 'landkreis-marburg-biedenkopf',
    countyName: 'Landkreis Marburg-Biedenkopf',
    zip: '35037',
    street: 'Regionalnetzwerk Mittelhessen / HQ Wetzlar',
    lat: 50.8021,
    lng: 8.7667,
    wikidataId: 'https://www.wikidata.org/wiki/Q3866',
    districts: [
      'Altstadt Marburg',
      'Richtsberg',
      'Cappel',
      'Wehrda',
      'Ockershausen',
      'Marbach',
      'Michelbach',
      'Behringwerke Campus',
    ],
    serviceKeywords: [
      'Biotech & Pharma Webentwicklung Marburg',
      'Praxen & Universitäts-Webdesign',
      'Headless CMS Sanity v3',
      'B2B Lead-Systeme Marburg-Biedenkopf',
    ],
  },
  'webdesign-frankfurt': {
    slug: 'webdesign-frankfurt',
    cityName: 'Frankfurt am Main',
    countySlug: 'standorte/hessen',
    countyName: 'Metropolregion Frankfurt/Rhein-Main',
    zip: '60311',
    street: 'Regionalbüro Rhein-Main / HQ Wetzlar',
    lat: 50.1109,
    lng: 8.6821,
    wikidataId: 'https://www.wikidata.org/wiki/Q1794',
    districts: [
      'Bankenviertel',
      'Westend',
      'Innenstadt',
      'Sachsenhausen',
      'Bornheim',
      'Bockenheim',
      'Nordend',
      'Gallus',
      'Europaviertel',
    ],
    serviceKeywords: [
      'Enterprise Next.js Webentwicklung Frankfurt',
      'FinTech & Corporate B2B Portale',
      'Kanzlei & Beratung Webdesign',
      'High-Speed Edge Hosting',
    ],
  },
  'webdesign-wiesbaden': {
    slug: 'webdesign-wiesbaden',
    cityName: 'Wiesbaden',
    countySlug: 'standorte/hessen',
    countyName: 'Landeshauptstadt Wiesbaden',
    zip: '65183',
    street: 'Regionalnetzwerk Rhein-Main / HQ Wetzlar',
    lat: 50.0825,
    lng: 8.24,
    wikidataId: 'https://www.wikidata.org/wiki/Q1721',
    districts: [
      'Mitte',
      'Biebrich',
      'Dotzheim',
      'Sonnenberg',
      'Bierstadt',
      'Schierstein',
      'Mainz-Kastel',
      'Nordost',
    ],
    serviceKeywords: [
      'Kanzlei & Notariat Webdesign Wiesbaden',
      'Privatpraxen & Klinikportale',
      'B2B Consulting Webentwicklung',
      'Local SEO Landeshauptstadt',
    ],
  },
  'webdesign-kassel': {
    slug: 'webdesign-kassel',
    cityName: 'Kassel',
    countySlug: 'landkreis-kassel',
    countyName: 'Landkreis Kassel / Nordhessen',
    zip: '34117',
    street: 'Regionalnetzwerk Nordhessen / HQ Wetzlar',
    lat: 51.3127,
    lng: 9.4797,
    wikidataId: 'https://www.wikidata.org/wiki/Q2865',
    districts: [
      'Mitte',
      'Vorderer Westen',
      'Bad Wilhelmshöhe',
      'Bettenhausen',
      'Wehlheiden',
      'Harleshausen',
      'Science Park Kassel',
    ],
    serviceKeywords: [
      'Maschinenbau & Automotive Webdesign Kassel',
      'Mobilität & Logistik B2B Portale',
      'Next.js 15 Webentwicklung Nordhessen',
    ],
  },
  'webdesign-darmstadt': {
    slug: 'webdesign-darmstadt',
    cityName: 'Darmstadt',
    countySlug: 'landkreis-darmstadt-dieburg',
    countyName: 'Wissenschaftsstadt Darmstadt',
    zip: '64283',
    street: 'Regionalnetzwerk Südhessen / HQ Wetzlar',
    lat: 49.8728,
    lng: 8.6512,
    wikidataId: 'https://www.wikidata.org/wiki/Q1202',
    districts: [
      'Stadtmitte',
      'Bessungen',
      'Arheilgen',
      'Eberstadt',
      'Kranichstein',
      'Wixhausen',
      'TU Darmstadt Campus',
    ],
    serviceKeywords: [
      'DeepTech & Software Webdesign Darmstadt',
      'Wissenschafts- & Forschungsinstitute',
      'Next.js 15 B2B Portale Südhessen',
    ],
  },
  'webdesign-offenbach': {
    slug: 'webdesign-offenbach',
    cityName: 'Offenbach am Main',
    countySlug: 'kreis-offenbach',
    countyName: 'Kreis Offenbach',
    zip: '63065',
    street: 'Regionalnetzwerk Rhein-Main / HQ Wetzlar',
    lat: 50.1055,
    lng: 8.7611,
    wikidataId: 'https://www.wikidata.org/wiki/Q3805',
    districts: [
      'Zentrum',
      'Bieber',
      'Bürgel',
      'Lauterborn',
      'Tempelsee',
      'Waldheim',
      'Kaiserlei-Viertel',
    ],
    serviceKeywords: [
      'Kreativwirtschaft & Automotive Webdesign Offenbach',
      'B2B E-Commerce & Plattformen',
      'Local SEO Rhein-Main',
    ],
  },
  'webdesign-hanau': {
    slug: 'webdesign-hanau',
    cityName: 'Hanau',
    countySlug: 'main-kinzig-kreis',
    countyName: 'Main-Kinzig-Kreis',
    zip: '63450',
    street: 'Regionalnetzwerk Osthessen / HQ Wetzlar',
    lat: 50.1333,
    lng: 8.9167,
    wikidataId: 'https://www.wikidata.org/wiki/Q3802',
    districts: [
      'Innenstadt',
      'Kesselstadt',
      'Großauheim',
      'Klein-Auheim',
      'Steinheim',
      'Wolfgang',
      'Industriepark Wolfgang',
    ],
    serviceKeywords: [
      'Materialtechnik & Chemie Webdesign Hanau',
      'Goldschmiede & Handwerk Portale',
      'Industrie 4.0 Weblösungen Main-Kinzig',
    ],
  },
  'webdesign-limburg': {
    slug: 'webdesign-limburg',
    cityName: 'Limburg an der Lahn',
    countySlug: 'landkreis-limburg-weilburg',
    countyName: 'Landkreis Limburg-Weilburg',
    zip: '65549',
    street: 'Regionalbüro Limburg-Weilburg / HQ Wetzlar',
    lat: 50.3833,
    lng: 8.0667,
    wikidataId: 'https://www.wikidata.org/wiki/Q15600',
    districts: [
      'Altstadt',
      'Dietkirchen',
      'Eschhofen',
      'Lindenholzhausen',
      'Linter',
      'Offheim',
      'Staffel',
      'ICE-Stadt Limburg',
    ],
    serviceKeywords: [
      'Handel & Großhandel Webentwicklung Limburg',
      'Handwerker-Webseiten Limburg-Weilburg',
      'Local SEO Lahn-Westerwald',
    ],
  },
  'webdesign-fulda': {
    slug: 'webdesign-fulda',
    cityName: 'Fulda',
    countySlug: 'landkreis-fulda',
    countyName: 'Landkreis Fulda',
    zip: '36037',
    street: 'Regionalnetzwerk Osthessen / HQ Wetzlar',
    lat: 50.5528,
    lng: 9.6756,
    wikidataId: 'https://www.wikidata.org/wiki/Q3859',
    districts: [
      'Innenstadt',
      'Frauenberg',
      'Neuenberg',
      'Aschenberg',
      'Horas',
      'Edelzell',
      'Ziehers-Nord',
      'Münsterfeld',
    ],
    serviceKeywords: [
      'Logistik & Großhandel Webdesign Fulda',
      'Handwerk & Maschinenbau Osthessen',
      'Local SEO ICE-Knoten Fulda',
    ],
  },
  'webdesign-ruesselsheim': {
    slug: 'webdesign-ruesselsheim',
    cityName: 'Rüsselsheim am Main',
    countySlug: 'standorte/hessen',
    countyName: 'Groß-Gerau / Rhein-Main',
    zip: '65428',
    street: 'Regionalnetzwerk Rhein-Main / HQ Wetzlar',
    lat: 49.995,
    lng: 8.4125,
    wikidataId: 'https://www.wikidata.org/wiki/Q4034',
    districts: ['Innenstadt', 'Königstädten', 'Bauschheim', 'Hassloch', 'Industrie-Campus'],
    serviceKeywords: [
      'Automotive & Engineering Webdesign Rüsselsheim',
      'Ingenieurbüros & Fertigung',
      'Next.js 15 Webentwicklung Rhein-Main',
    ],
  },
  'webdesign-bad-homburg': {
    slug: 'webdesign-bad-homburg',
    cityName: 'Bad Homburg vor der Höhe',
    countySlug: 'hochtaunuskreis',
    countyName: 'Hochtaunuskreis',
    zip: '61348',
    street: 'Regionalnetzwerk Taunus / HQ Wetzlar',
    lat: 50.226,
    lng: 8.618,
    wikidataId: 'https://www.wikidata.org/wiki/Q4053',
    districts: [
      'Innenstadt',
      'Kirdorf',
      'Gonzenheim',
      'Dornholzhausen',
      'Ober-Erlenbach',
      'Ober-Eschbach',
    ],
    serviceKeywords: [
      'Family Office & Finance Webdesign Bad Homburg',
      'MedTech & Privatkliniken Portale',
      'High-End UI/UX Webentwicklung Taunus',
    ],
  },
  'webdesign-oberursel': {
    slug: 'webdesign-oberursel',
    cityName: 'Oberursel (Taunus)',
    countySlug: 'hochtaunuskreis',
    countyName: 'Hochtaunuskreis',
    zip: '61440',
    street: 'Regionalnetzwerk Taunus / HQ Wetzlar',
    lat: 50.2014,
    lng: 8.5772,
    wikidataId: 'https://www.wikidata.org/wiki/Q16147',
    districts: ['Zentrum', 'Bommersheim', 'Oberstedten', 'Stierstadt', 'Weißkirchen'],
    serviceKeywords: [
      'IT & Consulting Webdesign Oberursel',
      'B2B Dienstleister Hochtaunus',
      'Next.js 15 High-Speed Plattformen',
    ],
  },
  'webdesign-rodgau': {
    slug: 'webdesign-rodgau',
    cityName: 'Rodgau',
    countySlug: 'kreis-offenbach',
    countyName: 'Kreis Offenbach',
    zip: '63110',
    street: 'Regionalnetzwerk Rhein-Main / HQ Wetzlar',
    lat: 50.025,
    lng: 8.8833,
    wikidataId: 'https://www.wikidata.org/wiki/Q16143',
    districts: ['Jügesheim', 'Dudenhofen', 'Hainhausen', 'Nieder-Roden', 'Weiskirchen'],
    serviceKeywords: [
      'Gewerbe & Logistik Webdesign Rodgau',
      'Handwerker-Websites Kreis Offenbach',
      'Local SEO Rodgau Ring',
    ],
  },
  'webdesign-dietzenbach': {
    slug: 'webdesign-dietzenbach',
    cityName: 'Dietzenbach',
    countySlug: 'kreis-offenbach',
    countyName: 'Kreis Offenbach',
    zip: '63128',
    street: 'Regionalnetzwerk Rhein-Main / HQ Wetzlar',
    lat: 50.0083,
    lng: 8.7833,
    wikidataId: 'https://www.wikidata.org/wiki/Q16140',
    districts: ['Altstadt', 'Steinberg', 'Hexenberg', 'Gewerbegebiet Süd'],
    serviceKeywords: [
      'Kreisstadt Offenbach B2B Weblösungen',
      'IT-Systemhäuser & Dienstleister Dietzenbach',
      'Local SEO Kreis Offenbach',
    ],
  },
  'webdesign-bensheim': {
    slug: 'webdesign-bensheim',
    cityName: 'Bensheim',
    countySlug: 'landkreis-darmstadt-dieburg',
    countyName: 'Kreis Bergstraße / Südhessen',
    zip: '64625',
    street: 'Regionalnetzwerk Bergstraße / HQ Wetzlar',
    lat: 49.6833,
    lng: 8.6167,
    wikidataId: 'https://www.wikidata.org/wiki/Q14887',
    districts: [
      'Mitte',
      'Auerbach',
      'Fehlheim',
      'Gronau',
      'Hochstädten',
      'Schönberg',
      'Wilmshausen',
      'Zell',
    ],
    serviceKeywords: [
      'Medizintechnik & Dental Webdesign Bensheim',
      'Handwerk & Tourismus Bergstraße',
      'Next.js 15 Webentwicklung Südhessen',
    ],
  },
  'webdesign-hofheim': {
    slug: 'webdesign-hofheim',
    cityName: 'Hofheim am Taunus',
    countySlug: 'main-taunus-kreis',
    countyName: 'Main-Taunus-Kreis',
    zip: '65719',
    street: 'Regionalnetzwerk Taunus / HQ Wetzlar',
    lat: 50.0872,
    lng: 8.4447,
    wikidataId: 'https://www.wikidata.org/wiki/Q16139',
    districts: [
      'Kernstadt',
      'Diedenbergen',
      'Langenhain',
      'Lorsbach',
      'Marxheim',
      'Wallau',
      'Wildsachsen',
    ],
    serviceKeywords: [
      'Mittelstand & Praxen Webdesign Hofheim',
      'Handwerker Main-Taunus-Kreis',
      'Local SEO Hofheim am Taunus',
    ],
  },
  'webdesign-friedberg': {
    slug: 'webdesign-friedberg',
    cityName: 'Friedberg (Hessen)',
    countySlug: 'wetteraukreis',
    countyName: 'Wetteraukreis',
    zip: '61169',
    street: 'Regionalbüro Wetterau / HQ Wetzlar',
    lat: 50.3333,
    lng: 8.75,
    wikidataId: 'https://www.wikidata.org/wiki/Q16138',
    districts: [
      'Kernstadt',
      'Bauernheim',
      'Bruchenbrücken',
      'Dorheim',
      'Ockstadt',
      'Ossenheim',
      'THM Campus Friedberg',
    ],
    serviceKeywords: [
      'Technologie & Handwerk Webdesign Friedberg',
      'THM Spin-offs & Mittelstand Wetterau',
      'Local SEO Friedberg Hessen',
    ],
  },
  'webdesign-bad-vilbel': {
    slug: 'webdesign-bad-vilbel',
    cityName: 'Bad Vilbel',
    countySlug: 'wetteraukreis',
    countyName: 'Wetteraukreis / Frankfurt Nord',
    zip: '61118',
    street: 'Regionalnetzwerk Wetterau / HQ Wetzlar',
    lat: 50.1833,
    lng: 8.75,
    wikidataId: 'https://www.wikidata.org/wiki/Q16145',
    districts: ['Kernstadt', 'Dortelweil', 'Gronau', 'Heilsberg', 'Massenheim'],
    serviceKeywords: [
      'Medien & Pharma Webentwicklung Bad Vilbel',
      'Kanzleien & Praxen Frankfurt-Nord',
      'Local SEO Quellenstadt',
    ],
  },
  'webdesign-weilburg': {
    slug: 'webdesign-weilburg',
    cityName: 'Weilburg',
    countySlug: 'landkreis-limburg-weilburg',
    countyName: 'Landkreis Limburg-Weilburg',
    zip: '35781',
    street: 'Regionalbüro Oberlahn / HQ Wetzlar',
    lat: 50.4833,
    lng: 8.2667,
    wikidataId: 'https://www.wikidata.org/wiki/Q15603',
    districts: [
      'Altstadt',
      'Ahausen',
      'Bermbach',
      'Drommershausen',
      'Gaudernbach',
      'Hasselbach',
      'Hirschhausen',
      'Kirschhofen',
      'Kubach',
      'Odersbach',
      'Waldhausen',
    ],
    serviceKeywords: [
      'Maschinenbau & Tourismus Webdesign Weilburg',
      'Handwerk Oberlahn & Taunus',
      'Local SEO Weilburg an der Lahn',
    ],
  },
  'webdesign-loehnberg': {
    slug: 'webdesign-loehnberg',
    cityName: 'Löhnberg',
    countySlug: 'landkreis-limburg-weilburg',
    countyName: 'Landkreis Limburg-Weilburg',
    zip: '35792',
    street: 'Regionalnetzwerk Lahntal / HQ Wetzlar',
    lat: 50.5139,
    lng: 8.2736,
    wikidataId: 'https://www.wikidata.org/wiki/Q574328',
    districts: [
      'Löhnberg-Kernort',
      'Niedershausen',
      'Obershausen',
      'Selters',
      'Gewerbegebiet Voitshain',
      'Gewerbe In der Schlei',
      'Burg Laneburg Campus',
    ],
    serviceKeywords: [
      'Webdesign Löhnberg 35792',
      'Handwerk & Bau Webentwicklung Niedershausen',
      'B2B Industrie & Gewerbe B49',
      'Tourismus & Gastronomie Lahntal Selters',
      'Local SEO Limburg-Weilburg',
    ],
  },
  'webdesign-dillenburg': {
    slug: 'webdesign-dillenburg',
    cityName: 'Dillenburg',
    countySlug: 'landkreis-lahn-dill',
    countyName: 'Lahn-Dill-Kreis',
    zip: '35683',
    street: 'Regionalbüro Dilltal / HQ Wetzlar',
    lat: 50.7333,
    lng: 8.2833,
    wikidataId: 'https://www.wikidata.org/wiki/Q569680',
    districts: [
      'Kernstadt',
      'Donsbach',
      'Eibach',
      'Frohnhausen',
      'Manderbach',
      'Nanzenbach',
      'Niederscheld',
      'Oberscheld',
    ],
    serviceKeywords: [
      'Kaltwalzwerke & Stahlindustrie Webdesign Dillenburg',
      'Handwerk Dilltal & Westerwald',
      'Local SEO Dillenburg',
    ],
  },
  'webdesign-herborn': {
    slug: 'webdesign-herborn',
    cityName: 'Herborn',
    countySlug: 'landkreis-lahn-dill',
    countyName: 'Lahn-Dill-Kreis',
    zip: '35745',
    street: 'Regionalbüro Herborn / HQ Wetzlar',
    lat: 50.6833,
    lng: 8.3,
    wikidataId: 'https://www.wikidata.org/wiki/Q518173',
    districts: [
      'Kernstadt',
      'Amdorf',
      'Burg',
      'Guntersdorf',
      'Hirschberg',
      'Hörbach',
      'Merkenbach',
      'Schönbach',
      'Seelbach',
      'Uckersdorf',
    ],
    serviceKeywords: [
      'Schaltschrankbau & Hightech Webdesign Herborn',
      'Handwerker-Webseiten Herborn-Burg',
      'Local SEO B277 & A45 Achse',
    ],
  },
};

/**
 * Tier 1: State Master Hub Schema (/standorte/hessen)
 */
export function getHessenMasterSchema(locale: string = 'de') {
  const stateUrl = `${BASE_URL}/${locale}/standorte/hessen`;
  const isEn = locale === 'en';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AdministrativeArea',
        '@id': `${stateUrl}#state-hub`,
        name: 'Hessen',
        sameAs: HESSEN_STATE.wikidataId,
        url: stateUrl,
        containsPlace: Object.values(COUNTIES_REGIONS).map((c) => ({
          '@type': 'AdministrativeArea',
          '@id': `${BASE_URL}/${locale}/regionen/${c.slug}#region`,
          name: c.name,
          sameAs: c.wikidataId,
          url: `${BASE_URL}/${locale}/regionen/${c.slug}`,
        })),
      },
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${stateUrl}#business`,
        name: isEn
          ? 'Coday – High-End Web Design & Web Development Hesse'
          : 'Coday – High-End Webdesign & Next.js Webentwicklung Hessen',
        url: stateUrl,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49-176-41195301',
        email: 'umut@codayweb.de',
        priceRange: '€€€€',
        parentOrganization: { '@id': ORG_ID },
        founder: { '@id': FOUNDER_ID },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'HQ Wetzlar / Regionalnetzwerk Hessen',
          addressLocality: 'Wetzlar',
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: HESSEN_STATE.lat,
          longitude: HESSEN_STATE.lng,
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Hessen',
            sameAs: HESSEN_STATE.wikidataId,
          },
          ...Object.values(COUNTIES_REGIONS).map((c) => ({
            '@type': 'AdministrativeArea',
            name: c.name,
            sameAs: c.wikidataId,
          })),
        ],
      },
    ],
  };
}

/**
 * Tier 2: County / Regional Hub Schema (/regionen/landkreis-*)
 */
export function getCountyHierarchySchema(countySlug: string, locale: string = 'de') {
  const county = COUNTIES_REGIONS[countySlug];
  if (!county) return null;

  const countyUrl = `${BASE_URL}/${locale}/regionen/${county.slug}`;
  const stateUrl = `${BASE_URL}/${locale}/standorte/hessen`;
  const isEn = locale === 'en';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AdministrativeArea',
        '@id': `${countyUrl}#region`,
        name: county.name,
        sameAs: county.wikidataId,
        url: countyUrl,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          '@id': `${stateUrl}#state-hub`,
          name: 'Hessen',
          sameAs: HESSEN_STATE.wikidataId,
        },
        containsPlace: county.municipalities.map((m) => ({
          '@type': 'City',
          name: m,
        })),
      },
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${countyUrl}#service`,
        name: isEn
          ? `Coday – Regional Web Agency ${county.name}`
          : `Coday – Regionale Webagentur ${county.name}`,
        url: countyUrl,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49-176-41195301',
        email: 'umut@codayweb.de',
        priceRange: '€€€',
        parentOrganization: { '@id': ORG_ID },
        founder: { '@id': FOUNDER_ID },
        address: {
          '@type': 'PostalAddress',
          streetAddress: `HQ Wetzlar / Regionalnetzwerk ${county.name}`,
          addressLocality: county.capital,
          postalCode: '35578',
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: county.name,
            sameAs: county.wikidataId,
          },
          ...county.municipalities.map((m) => ({
            '@type': 'City',
            name: m,
          })),
        ],
      },
    ],
  };
}

/**
 * Tier 3: City / Flagship Schema (/webdesign-*)
 */
export function getCityHierarchySchema(citySlug: string, locale: string = 'de') {
  const city = CITIES_HIERARCHY[citySlug];
  if (!city) return null;

  const cityUrl = `${BASE_URL}/${locale}/${city.slug}`;
  const stateUrl = `${BASE_URL}/${locale}/standorte/hessen`;
  const parentCounty = COUNTIES_REGIONS[city.countySlug];
  const isEn = locale === 'en';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'City',
        '@id': `${cityUrl}#city`,
        name: city.cityName,
        sameAs: city.wikidataId,
        url: cityUrl,
        containedInPlace: parentCounty
          ? {
              '@type': 'AdministrativeArea',
              '@id': `${BASE_URL}/${locale}/regionen/${parentCounty.slug}#region`,
              name: parentCounty.name,
              sameAs: parentCounty.wikidataId,
            }
          : {
              '@type': 'AdministrativeArea',
              '@id': `${stateUrl}#state-hub`,
              name: 'Hessen',
              sameAs: HESSEN_STATE.wikidataId,
            },
        containsPlace: city.districts.map((d) => ({
          '@type': 'Place',
          name: d,
        })),
      },
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${cityUrl}#localbusiness`,
        name: isEn
          ? `Coday – Web Design Agency ${city.cityName}`
          : `Coday – Webdesign Agentur ${city.cityName}`,
        url: cityUrl,
        logo: `${BASE_URL}/icon.png`,
        image: `${BASE_URL}/images/og-image.jpg`,
        telephone: '+49-176-41195301',
        email: 'umut@codayweb.de',
        priceRange: '€€€',
        parentOrganization: { '@id': ORG_ID },
        founder: { '@id': FOUNDER_ID },
        // Reviews intentionally NOT spread here — the city page's Product node
        // already carries them; two AggregateRating instances on one page
        // trigger the GSC "multiple aggregated ratings" error.
        address: {
          '@type': 'PostalAddress',
          streetAddress: city.street,
          addressLocality: city.cityName.replace(' (HQ)', ''),
          postalCode: city.zip,
          addressRegion: 'Hessen',
          addressCountry: 'DE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: city.lat,
          longitude: city.lng,
        },
        areaServed: [
          {
            '@type': 'City',
            name: city.cityName.replace(' (HQ)', ''),
            sameAs: city.wikidataId,
          },
          ...(parentCounty
            ? [
                {
                  '@type': 'AdministrativeArea' as const,
                  name: parentCounty.name,
                  sameAs: parentCounty.wikidataId,
                },
              ]
            : []),
          ...city.districts.map((d) => ({
            '@type': 'Place' as const,
            name: d,
          })),
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Webdesign- & Weblösungen ${city.cityName}`,
          itemListElement: city.serviceKeywords.map((kw) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: kw,
              description: `Professionelle Next.js 15 Weblösungen, Ladezeiten unter 500ms und 100/100 Core Web Vitals für ${city.cityName}.`,
            },
          })),
        },
      },
      {
        '@type': 'Product',
        '@id': `${cityUrl}#webdesign-package`,
        name: isEn
          ? `Coday Web Design & Web Development ${city.cityName}`
          : `Coday Webdesign & Webentwicklung ${city.cityName}`,
        description: isEn
          ? `High-Performance & High-Conversion Websites for businesses and crafts in ${city.cityName}. 100/100 PageSpeed, modern Next.js architecture and personal support.`
          : `High-Performance & High-Conversion Websites für Unternehmen und Handwerk in ${city.cityName}. 100/100 PageSpeed, modernste Next.js Architektur und persönliche Betreuung.`,
        image: `${BASE_URL}/images/og-image.jpg`,
        brand: { '@id': ORG_ID },
        offers: {
          '@type': 'Offer',
          price: '2000',
          priceCurrency: 'EUR',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          url: cityUrl,
          seller: { '@id': ORG_ID },
        },
        ...getReviewsSchema(locale),
      },
    ],
  };
}

/**
 * Hierarchical Breadcrumbs linking Tier 1 -> Tier 2 -> Tier 3
 */
export function getPyramidBreadcrumbs(
  tier: 1 | 2 | 3,
  params: { countySlug?: string; citySlug?: string },
  locale: string = 'de'
) {
  const isEn = locale === 'en';

  // The list needs an @id so the page's WebPage node can reference it as its
  // `breadcrumb`. The URL is derivable from the tier: the state hub, a Kreis hub
  // or a city page.
  const pageUrl =
    tier === 2 && params.countySlug
      ? `${BASE_URL}/${locale}/regionen/${params.countySlug}`
      : tier === 3 && params.citySlug
        ? `${BASE_URL}/${locale}/${params.citySlug}`
        : `${BASE_URL}/${locale}/standorte/hessen`;
  const listId = { '@id': `${pageUrl}#breadcrumb` };

  const startItem = {
    '@type': 'ListItem',
    position: 1,
    name: isEn ? 'Home' : 'Startseite',
    item: `${BASE_URL}/${locale}`,
  };

  const hessenItem = {
    '@type': 'ListItem',
    position: 2,
    name: 'Hessen',
    item: `${BASE_URL}/${locale}/standorte/hessen`,
  };

  if (tier === 1) {
    return {
      ...listId,
      '@type': 'BreadcrumbList',
      itemListElement: [startItem, hessenItem],
    };
  }

  if (tier === 2 && params.countySlug) {
    const county = COUNTIES_REGIONS[params.countySlug];
    const countyName = county ? county.name : 'Region';
    return {
      ...listId,
      '@type': 'BreadcrumbList',
      itemListElement: [
        startItem,
        hessenItem,
        {
          '@type': 'ListItem',
          position: 3,
          name: countyName,
          item: `${BASE_URL}/${locale}/regionen/${params.countySlug}`,
        },
      ],
    };
  }

  if (tier === 3 && params.citySlug) {
    const city = CITIES_HIERARCHY[params.citySlug];
    const cityName = city ? city.cityName : 'Stadt';
    const parentCounty = city ? COUNTIES_REGIONS[city.countySlug] : null;

    if (parentCounty) {
      return {
        ...listId,
        '@type': 'BreadcrumbList',
        itemListElement: [
          startItem,
          hessenItem,
          {
            '@type': 'ListItem',
            position: 3,
            name: parentCounty.name,
            item: `${BASE_URL}/${locale}/regionen/${parentCounty.slug}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: cityName,
            item: `${BASE_URL}/${locale}/${params.citySlug}`,
          },
        ],
      };
    }

    return {
      ...listId,
      '@type': 'BreadcrumbList',
      itemListElement: [
        startItem,
        hessenItem,
        {
          '@type': 'ListItem',
          position: 3,
          name: cityName,
          item: `${BASE_URL}/${locale}/${params.citySlug}`,
        },
      ],
    };
  }

  return {
    ...listId,
    '@type': 'BreadcrumbList',
    itemListElement: [startItem, hessenItem],
  };
}
