const fs = require('fs');
const path = require('path');

const locales = ['de', 'en'];
const missingIndustries = {
  automobil: {
    title: 'Automobil & KFZ',
    hero: {
      headline: 'Mehr Termine, volle Werkstatt',
      subheadline:
        'Wir digitalisieren Autohäuser und Werkstätten für planbare Kundenanfragen und Service-Buchungen.',
    },
    challenges: {
      c1: {
        title: 'Abhängigkeit von Portalen',
        description: 'Hohe Gebühren bei Mobile.de & Autoscout24.',
      },
      c2: {
        title: 'Termin-Chaos',
        description: 'Telefon klingelt ständig für einfache Terminvereinbarungen.',
      },
      c3: {
        title: 'Sichtbarkeit',
        description: 'Lokale Kunden finden eher die Konkurrenz als Sie.',
      },
    },
    solutions: {
      s1: {
        title: 'Eigener Vertriebskanal',
        description: 'Unabhängigkeit durch eine starke eigene Website.',
      },
      s2: {
        title: 'Digitale Terminbuchung',
        description: 'Werkstatt-Termine 24/7 online buchen lassen.',
      },
      s3: {
        title: 'Local SEO',
        description: 'Top-Platzierungen bei lokalen Suchanfragen.',
      },
    },
    customFeatures: {
      f1: {
        title: 'Fahrzeugbestand-Sync',
        description: 'Automatische Synchronisation mit Ihrer Fahrzeugsoftware.',
      },
      f2: {
        title: 'Schadensmelder',
        description: 'Kunden können Bilder vom Schaden direkt hochladen.',
      },
      f3: {
        title: 'Probefahrt-Kalender',
        description: 'Verwaltung von Probefahrten für Neufahrzeuge.',
      },
    },
  },
  'handwerk-bau': {
    title: 'Handwerk & Bau',
    hero: {
      headline: 'Digitales Fundament für Handwerker',
      subheadline:
        'Gewinnen Sie qualifizierte Aufträge und fähige Fachkräfte mit einer modernen, conversion-starken Website.',
    },
    challenges: {
      fachkraftemangel: {
        title: 'Fachkräftemangel',
        description:
          'Gute Mitarbeiter sind schwer zu finden und bewerben sich eher bei modernen Betrieben.',
      },
      falsche_anfragen: {
        title: 'Unqualifizierte Anfragen',
        description: 'Zu viele kleine Reparaturen statt lukrativer Großprojekte.',
      },
      veralteter_auftritt: {
        title: 'Veralteter Auftritt',
        description: 'Die aktuelle Website spiegelt nicht die hohe Qualität Ihrer Arbeit wider.',
      },
    },
    solutions: {
      mitarbeiter_funnel: {
        title: 'Mitarbeiter-Funnel',
        description: 'Bewerbungen in 60 Sekunden, optimiert für Social Media.',
      },
      projekt_showcase: {
        title: 'Projekt-Showcase',
        description: 'Ihre besten Referenzen im perfekten Licht.',
      },
      lokale_seo: {
        title: 'Lokale SEO',
        description: 'Dominanz in Ihrer Region für lukrative Suchbegriffe.',
      },
    },
    customFeatures: {
      projekt_kalkulator: {
        title: 'Projekt-Kalkulator',
        description: 'Vorqualifizierung durch Budget-Abfrage im Formular.',
      },
      terminbuchung: {
        title: 'Terminbuchung',
        description: 'Direkte Buchung von Beratungsgesprächen.',
      },
      cms_referenzen: {
        title: 'CMS für Referenzen',
        description: 'Projekte einfach selbst vom Smartphone aus hinzufügen.',
      },
    },
  },
  'immobilien-makler': {
    title: 'Immobilien & Makler',
    hero: {
      headline: 'Mehr Alleinaufträge generieren',
      subheadline:
        'Exklusive Webauftritte, die Eigentümer überzeugen und Immobilien perfekt in Szene setzen.',
    },
    challenges: {
      objektakquise: {
        title: 'Objektakquise',
        description: 'Es ist schwerer denn je, neue Verkaufsobjekte zu gewinnen.',
      },
      vergleichbarkeit: {
        title: 'Vergleichbarkeit',
        description: 'Kunden sehen oft keinen Unterschied zwischen Makler A und B.',
      },
      mobile_darstellung: {
        title: 'Mobile Darstellung',
        description: 'Exposés sehen auf dem Smartphone unübersichtlich aus.',
      },
    },
    solutions: {
      digitales_expose: {
        title: 'Digitale Exposés',
        description: 'Wunderschöne Objektpräsentation ohne PDF-Chaos.',
      },
      eigentuemer_flow: {
        title: 'Eigentümer-Flow',
        description: 'Gezielte Lead-Generierung von Verkäufern.',
      },
      branding: {
        title: 'Premium Branding',
        description: 'Ein Design, das Vertrauen und Expertise ausstrahlt.',
      },
    },
    customFeatures: {
      immobilien_bewertungstool: {
        title: 'Immobilien-Bewertung',
        description: 'Integrierter Lead-Magnet zur Adressgewinnung.',
      },
      virtuelle_touren: {
        title: 'Virtuelle Touren',
        description: 'Nahtlose Einbindung von 360°-Rundgängen.',
      },
      objekt_filter: {
        title: 'Objekt-Filter',
        description: 'Schnelle Suche nach Traumimmobilien auf Ihrer Seite.',
      },
    },
  },
  'aerzte-gesundheit': {
    title: 'Ärzte & Gesundheit',
    hero: {
      headline: 'Die digitale Praxis',
      subheadline:
        'Entlasten Sie Ihr Team und bieten Sie Patienten einen modernen Service von der Terminbuchung bis zum Rezept.',
    },
    challenges: {
      telefon_ueberlastung: {
        title: 'Telefon-Überlastung',
        description: 'Das Praxis-Team kommt kaum noch hinterher.',
      },
      sichtbarkeit: {
        title: 'Sichtbarkeit',
        description: 'Privatpatienten finden Sie nicht über Google.',
      },
      vertrauensaufbau: {
        title: 'Vertrauensaufbau',
        description: 'Patienten wollen vorab wissen, wer sie behandelt.',
      },
    },
    solutions: {
      online_terminbuchung: {
        title: 'Online-Terminbuchung',
        description: '24/7 Termine vergeben und das Telefon entlasten.',
      },
      leistungs_darstellung: {
        title: 'Leistungs-Darstellung',
        description: 'Klare Kommunikation von IGeL und Schwerpunkten.',
      },
      team_vorstellung: {
        title: 'Team-Vorstellung',
        description: 'Sympathische Einblicke in Ihre Praxis.',
      },
    },
    customFeatures: {
      digitaler_anamnesebogen: {
        title: 'Digitaler Anamnesebogen',
        description: 'Formulare vorab online ausfüllen lassen.',
      },
      recall_system: {
        title: 'Recall-System',
        description: 'Automatische Erinnerungen an Vorsorge-Termine.',
      },
      rezept_bestellung: {
        title: 'Rezept-Bestellung',
        description: 'Folgezepte sicher online anfordern.',
      },
    },
  },
  'anwaelte-kanzleien': {
    title: 'Anwälte & Kanzleien',
    hero: {
      headline: 'Digitale Souveränität',
      subheadline:
        'Gewinnen Sie lukrative Mandate durch einen Webauftritt, der absolute Expertise und Diskretion ausstrahlt.',
    },
    challenges: {
      mandanten_qualitaet: {
        title: 'Mandanten-Qualität',
        description: 'Zu viele unqualifizierte Anfragen blockieren Ihre Zeit.',
      },
      konservatives_image: {
        title: 'Konservatives Image',
        description: 'Die Kanzlei wirkt nicht modern genug für junge Talente.',
      },
      content_pflege: {
        title: 'Content-Pflege',
        description: 'Neue Urteile und Fachartikel sind schwer einzupflegen.',
      },
    },
    solutions: {
      mandats_anfrage: {
        title: 'Mandats-Anfrage',
        description: 'Strukturierte Online-Formulare filtern für Sie vor.',
      },
      expertise_showcase: {
        title: 'Expertise-Showcase',
        description: 'Fachanwaltstitel und Erfolge perfekt präsentiert.',
      },
      modernes_serioeses_design: {
        title: 'Modernes Design',
        description: 'Seriös, vertrauensvoll, aber auf dem neuesten Stand der Technik.',
      },
    },
    customFeatures: {
      kostenrechner: {
        title: 'Kostenrechner',
        description: 'Transparenz schaffen für Erstgespräche.',
      },
      download_center: {
        title: 'Download-Center',
        description: 'Sichere Bereitstellung von Vollmachten und Formularen.',
      },
      blog_system: {
        title: 'Blog-System',
        description: 'Einfaches Publizieren von juristischen Beiträgen.',
      },
    },
  },
  'gastronomie-hotellerie': {
    title: 'Gastronomie & Hotels',
    hero: {
      headline: 'Mehr Direktbuchungen, weniger Provision',
      subheadline:
        'Begeistern Sie Gäste schon vor dem Besuch mit emotionalem Webdesign und reibungslosen Buchungsprozessen.',
    },
    challenges: {
      hohe_provisionen: {
        title: 'Hohe Provisionen',
        description: 'Lieferando und Booking.com fressen die Marge auf.',
      },
      personalmangel: {
        title: 'Personalmangel',
        description: 'Dringend gesuchte Servicekräfte finden Sie nicht.',
      },
      veraltete_karten: {
        title: 'Veraltete Karten',
        description: 'Speisekarten als schlechte PDFs vertreiben Kunden.',
      },
    },
    solutions: {
      direktbuchung: {
        title: 'Direktbuchung',
        description: 'Eigene Tisch- und Zimmerreservierung ohne Gebühren.',
      },
      event_marketing: {
        title: 'Event-Marketing',
        description: 'Spezielle Landingpages für Hochzeiten und Firmenfeiern.',
      },
      visual_storytelling: {
        title: 'Visual Storytelling',
        description: 'Bildergalerien, die einem das Wasser im Mund zusammenlaufen lassen.',
      },
    },
    customFeatures: {
      digitale_speisekarte: {
        title: 'Digitale Speisekarte',
        description: 'Einfach anpassbar, filterbar nach Allergenen.',
      },
      gutschein_shop: {
        title: 'Gutschein-Shop',
        description: 'Zusätzlicher Umsatz durch Online-Verkauf.',
      },
      bewerber_video_integration: {
        title: 'Bewerber-Video',
        description: 'Einblicke ins Team zur Mitarbeitergewinnung.',
      },
    },
  },
};

for (const locale of locales) {
  const filePath = path.join(__dirname, `public/locales/${locale}/industries.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Add missing industries
    for (const [key, value] of Object.entries(missingIndustries)) {
      if (!data[key]) {
        data[key] = value;
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`${filePath} not found`);
  }
}
