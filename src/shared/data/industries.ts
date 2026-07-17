export interface IndustryData {
  slug: string;
  title: string;
  icon: string;
  hero: {
    headline: string;
    subheadline: string;
    excerpt?: string;
  };
  challenges: { title: string; description: string }[];
  solutions: { title: string; description: string; icon: string }[];
  customFeatures: { title: string; description: string }[];
}

export const industriesData: Record<string, IndustryData> = {
  automobil: {
    slug: 'automobil',
    title: 'automobil.title',
    icon: 'hammer',
    hero: {
      headline: 'automobil.hero.headline',
      subheadline: 'automobil.hero.subheadline',
      excerpt: 'automobil.hero.excerpt',
    },
    challenges: [
      {
        title: 'automobil.challenges.c1.title',
        description: 'automobil.challenges.c1.description',
      },
      {
        title: 'automobil.challenges.c2.title',
        description: 'automobil.challenges.c2.description',
      },
      {
        title: 'automobil.challenges.c3.title',
        description: 'automobil.challenges.c3.description',
      },
    ],
    solutions: [
      {
        title: 'automobil.solutions.s1.title',
        description: 'automobil.solutions.s1.description',
        icon: 'directions_car',
      },
      {
        title: 'automobil.solutions.s2.title',
        description: 'automobil.solutions.s2.description',
        icon: 'calendar_month',
      },
      {
        title: 'automobil.solutions.s3.title',
        description: 'automobil.solutions.s3.description',
        icon: 'group',
      },
    ],
    customFeatures: [
      {
        title: 'automobil.customFeatures.f1.title',
        description: 'automobil.customFeatures.f1.description',
      },
      {
        title: 'automobil.customFeatures.f2.title',
        description: 'automobil.customFeatures.f2.description',
      },
      {
        title: 'automobil.customFeatures.f3.title',
        description: 'automobil.customFeatures.f3.description',
      },
    ],
  },

  'handwerk-bau': {
    slug: 'handwerk-bau',
    title: 'handwerk-bau.title',
    icon: 'hammer',
    hero: {
      headline: 'handwerk-bau.hero.headline',
      subheadline: 'handwerk-bau.hero.subheadline',
      excerpt: 'handwerk-bau.hero.excerpt',
    },
    challenges: [
      {
        title: 'handwerk-bau.challenges.fachkraftemangel.title',
        description: 'handwerk-bau.challenges.fachkraftemangel.description',
      },
      {
        title: 'handwerk-bau.challenges.falsche_anfragen.title',
        description: 'handwerk-bau.challenges.falsche_anfragen.description',
      },
      {
        title: 'handwerk-bau.challenges.veralteter_auftritt.title',
        description: 'handwerk-bau.challenges.veralteter_auftritt.description',
      },
    ],
    solutions: [
      {
        title: 'handwerk-bau.solutions.mitarbeiter_funnel.title',
        description: 'handwerk-bau.solutions.mitarbeiter_funnel.description',
        icon: 'group',
      },
      {
        title: 'handwerk-bau.solutions.projekt_showcase.title',
        description: 'handwerk-bau.solutions.projekt_showcase.description',
        icon: 'collections',
      },
      {
        title: 'handwerk-bau.solutions.lokale_seo.title',
        description: 'handwerk-bau.solutions.lokale_seo.description',
        icon: 'location_on',
      },
    ],
    customFeatures: [
      {
        title: 'handwerk-bau.customFeatures.projekt_kalkulator.title',
        description: 'handwerk-bau.customFeatures.projekt_kalkulator.description',
      },
      {
        title: 'handwerk-bau.customFeatures.terminbuchung.title',
        description: 'handwerk-bau.customFeatures.terminbuchung.description',
      },
      {
        title: 'handwerk-bau.customFeatures.cms_referenzen.title',
        description: 'handwerk-bau.customFeatures.cms_referenzen.description',
      },
    ],
  },
  'immobilien-makler': {
    slug: 'immobilien-makler',
    title: 'immobilien-makler.title',
    icon: 'apartment',
    hero: {
      headline: 'immobilien-makler.hero.headline',
      subheadline: 'immobilien-makler.hero.subheadline',
      excerpt: 'immobilien-makler.hero.excerpt',
    },
    challenges: [
      {
        title: 'immobilien-makler.challenges.objektakquise.title',
        description: 'immobilien-makler.challenges.objektakquise.description',
      },
      {
        title: 'immobilien-makler.challenges.vergleichbarkeit.title',
        description: 'immobilien-makler.challenges.vergleichbarkeit.description',
      },
      {
        title: 'immobilien-makler.challenges.mobile_darstellung.title',
        description: 'immobilien-makler.challenges.mobile_darstellung.description',
      },
    ],
    solutions: [
      {
        title: 'immobilien-makler.solutions.digitales_expose.title',
        description: 'immobilien-makler.solutions.digitales_expose.description',
        icon: 'web',
      },
      {
        title: 'immobilien-makler.solutions.eigentuemer_flow.title',
        description: 'immobilien-makler.solutions.eigentuemer_flow.description',
        icon: 'currency_exchange',
      },
      {
        title: 'immobilien-makler.solutions.branding.title',
        description: 'immobilien-makler.solutions.branding.description',
        icon: 'verified',
      },
    ],
    customFeatures: [
      {
        title: 'immobilien-makler.customFeatures.immobilien_bewertungstool.title',
        description: 'immobilien-makler.customFeatures.immobilien_bewertungstool.description',
      },
      {
        title: 'immobilien-makler.customFeatures.virtuelle_touren.title',
        description: 'immobilien-makler.customFeatures.virtuelle_touren.description',
      },
      {
        title: 'immobilien-makler.customFeatures.objekt_filter.title',
        description: 'immobilien-makler.customFeatures.objekt_filter.description',
      },
    ],
  },
  'aerzte-gesundheit': {
    slug: 'aerzte-gesundheit',
    title: 'aerzte-gesundheit.title',
    icon: 'local_hospital',
    hero: {
      headline: 'aerzte-gesundheit.hero.headline',
      subheadline: 'aerzte-gesundheit.hero.subheadline',
      excerpt: 'aerzte-gesundheit.hero.excerpt',
    },
    challenges: [
      {
        title: 'aerzte-gesundheit.challenges.telefon_ueberlastung.title',
        description: 'aerzte-gesundheit.challenges.telefon_ueberlastung.description',
      },
      {
        title: 'aerzte-gesundheit.challenges.sichtbarkeit.title',
        description: 'aerzte-gesundheit.challenges.sichtbarkeit.description',
      },
      {
        title: 'aerzte-gesundheit.challenges.vertrauensaufbau.title',
        description: 'aerzte-gesundheit.challenges.vertrauensaufbau.description',
      },
    ],
    solutions: [
      {
        title: 'aerzte-gesundheit.solutions.online_terminbuchung.title',
        description: 'aerzte-gesundheit.solutions.online_terminbuchung.description',
        icon: 'calendar_month',
      },
      {
        title: 'aerzte-gesundheit.solutions.leistungs_darstellung.title',
        description: 'aerzte-gesundheit.solutions.leistungs_darstellung.description',
        icon: 'medical_services',
      },
      {
        title: 'aerzte-gesundheit.solutions.team_vorstellung.title',
        description: 'aerzte-gesundheit.solutions.team_vorstellung.description',
        icon: 'groups',
      },
    ],
    customFeatures: [
      {
        title: 'aerzte-gesundheit.customFeatures.digitaler_anamnesebogen.title',
        description: 'aerzte-gesundheit.customFeatures.digitaler_anamnesebogen.description',
      },
      {
        title: 'aerzte-gesundheit.customFeatures.recall_system.title',
        description: 'aerzte-gesundheit.customFeatures.recall_system.description',
      },
      {
        title: 'aerzte-gesundheit.customFeatures.rezept_bestellung.title',
        description: 'aerzte-gesundheit.customFeatures.rezept_bestellung.description',
      },
    ],
  },
  'anwaelte-kanzleien': {
    slug: 'anwaelte-kanzleien',
    title: 'anwaelte-kanzleien.title',
    icon: 'gavel',
    hero: {
      headline: 'anwaelte-kanzleien.hero.headline',
      subheadline: 'anwaelte-kanzleien.hero.subheadline',
      excerpt: 'anwaelte-kanzleien.hero.excerpt',
    },
    challenges: [
      {
        title: 'anwaelte-kanzleien.challenges.mandanten_qualitaet.title',
        description: 'anwaelte-kanzleien.challenges.mandanten_qualitaet.description',
      },
      {
        title: 'anwaelte-kanzleien.challenges.konservatives_image.title',
        description: 'anwaelte-kanzleien.challenges.konservatives_image.description',
      },
      {
        title: 'anwaelte-kanzleien.challenges.content_pflege.title',
        description: 'anwaelte-kanzleien.challenges.content_pflege.description',
      },
    ],
    solutions: [
      {
        title: 'anwaelte-kanzleien.solutions.mandats_anfrage.title',
        description: 'anwaelte-kanzleien.solutions.mandats_anfrage.description',
        icon: 'assignment',
      },
      {
        title: 'anwaelte-kanzleien.solutions.expertise_showcase.title',
        description: 'anwaelte-kanzleien.solutions.expertise_showcase.description',
        icon: 'workspace_premium',
      },
      {
        title: 'anwaelte-kanzleien.solutions.modernes_serioeses_design.title',
        description: 'anwaelte-kanzleien.solutions.modernes_serioeses_design.description',
        icon: 'balance',
      },
    ],
    customFeatures: [
      {
        title: 'anwaelte-kanzleien.customFeatures.kostenrechner.title',
        description: 'anwaelte-kanzleien.customFeatures.kostenrechner.description',
      },
      {
        title: 'anwaelte-kanzleien.customFeatures.download_center.title',
        description: 'anwaelte-kanzleien.customFeatures.download_center.description',
      },
      {
        title: 'anwaelte-kanzleien.customFeatures.blog_system.title',
        description: 'anwaelte-kanzleien.customFeatures.blog_system.description',
      },
    ],
  },
  'gastronomie-hotellerie': {
    slug: 'gastronomie-hotellerie',
    title: 'gastronomie-hotellerie.title',
    icon: 'restaurant',
    hero: {
      headline: 'gastronomie-hotellerie.hero.headline',
      subheadline: 'gastronomie-hotellerie.hero.subheadline',
      excerpt: 'gastronomie-hotellerie.hero.excerpt',
    },
    challenges: [
      {
        title: 'gastronomie-hotellerie.challenges.hohe_provisionen.title',
        description: 'gastronomie-hotellerie.challenges.hohe_provisionen.description',
      },
      {
        title: 'gastronomie-hotellerie.challenges.personalmangel.title',
        description: 'gastronomie-hotellerie.challenges.personalmangel.description',
      },
      {
        title: 'gastronomie-hotellerie.challenges.veraltete_karten.title',
        description: 'gastronomie-hotellerie.challenges.veraltete_karten.description',
      },
    ],
    solutions: [
      {
        title: 'gastronomie-hotellerie.solutions.direktbuchung.title',
        description: 'gastronomie-hotellerie.solutions.direktbuchung.description',
        icon: 'bookmark_add',
      },
      {
        title: 'gastronomie-hotellerie.solutions.event_marketing.title',
        description: 'gastronomie-hotellerie.solutions.event_marketing.description',
        icon: 'celebration',
      },
      {
        title: 'gastronomie-hotellerie.solutions.visual_storytelling.title',
        description: 'gastronomie-hotellerie.solutions.visual_storytelling.description',
        icon: 'camera_alt',
      },
    ],
    customFeatures: [
      {
        title: 'gastronomie-hotellerie.customFeatures.digitale_speisekarte.title',
        description: 'gastronomie-hotellerie.customFeatures.digitale_speisekarte.description',
      },
      {
        title: 'gastronomie-hotellerie.customFeatures.gutschein_shop.title',
        description: 'gastronomie-hotellerie.customFeatures.gutschein_shop.description',
      },
      {
        title: 'gastronomie-hotellerie.customFeatures.bewerber_video_integration.title',
        description: 'gastronomie-hotellerie.customFeatures.bewerber_video_integration.description',
      },
    ],
  },
  unternehmensberatung: {
    slug: 'unternehmensberatung',
    title: 'unternehmensberatung.title',
    icon: 'business_center',
    hero: {
      headline: 'unternehmensberatung.hero.headline',
      subheadline: 'unternehmensberatung.hero.subheadline',
      excerpt: 'unternehmensberatung.hero.excerpt',
    },
    challenges: [
      {
        title: 'unternehmensberatung.challenges.erklaerungsbedarf.title',
        description: 'unternehmensberatung.challenges.erklaerungsbedarf.description',
      },
      {
        title: 'unternehmensberatung.challenges.vertrauen.title',
        description: 'unternehmensberatung.challenges.vertrauen.description',
      },
      {
        title: 'unternehmensberatung.challenges.differenzierung.title',
        description: 'unternehmensberatung.challenges.differenzierung.description',
      },
    ],
    solutions: [
      {
        title: 'unternehmensberatung.solutions.whitepaper_funnels.title',
        description: 'unternehmensberatung.solutions.whitepaper_funnels.description',
        icon: 'description',
      },
      {
        title: 'unternehmensberatung.solutions.case_studies.title',
        description: 'unternehmensberatung.solutions.case_studies.description',
        icon: 'cases',
      },
      {
        title: 'unternehmensberatung.solutions.webinare.title',
        description: 'unternehmensberatung.solutions.webinare.description',
        icon: 'video_camera_front',
      },
    ],
    customFeatures: [
      {
        title: 'unternehmensberatung.customFeatures.termin_kalender.title',
        description: 'unternehmensberatung.customFeatures.termin_kalender.description',
      },
      {
        title: 'unternehmensberatung.customFeatures.podcast_integration.title',
        description: 'unternehmensberatung.customFeatures.podcast_integration.description',
      },
      {
        title: 'unternehmensberatung.customFeatures.mitgliederbereich.title',
        description: 'unternehmensberatung.customFeatures.mitgliederbereich.description',
      },
    ],
  },
  'startups-tech': {
    slug: 'startups-tech',
    title: 'startups-tech.title',
    icon: 'rocket_launch',
    hero: {
      headline: 'startups-tech.hero.headline',
      subheadline: 'startups-tech.hero.subheadline',
      excerpt: 'startups-tech.hero.excerpt',
    },
    challenges: [
      {
        title: 'startups-tech.challenges.time_to_market.title',
        description: 'startups-tech.challenges.time_to_market.description',
      },
      {
        title: 'startups-tech.challenges.talent_war.title',
        description: 'startups-tech.challenges.talent_war.description',
      },
      {
        title: 'startups-tech.challenges.internationalisierung.title',
        description: 'startups-tech.challenges.internationalisierung.description',
      },
    ],
    solutions: [
      {
        title: 'startups-tech.solutions.skalierbare_tech_stacks.title',
        description: 'startups-tech.solutions.skalierbare_tech_stacks.description',
        icon: 'code',
      },
      {
        title: 'startups-tech.solutions.modernstes_design.title',
        description: 'startups-tech.solutions.modernstes_design.description',
        icon: 'computer',
      },
      {
        title: 'startups-tech.solutions.investor_relations.title',
        description: 'startups-tech.solutions.investor_relations.description',
        icon: 'attach_money',
      },
    ],
    customFeatures: [
      {
        title: 'startups-tech.customFeatures.saas_integration.title',
        description: 'startups-tech.customFeatures.saas_integration.description',
      },
      {
        title: 'startups-tech.customFeatures.dark_mode.title',
        description: 'startups-tech.customFeatures.dark_mode.description',
      },
      {
        title: 'startups-tech.customFeatures.mehrsprachigkeit.title',
        description: 'startups-tech.customFeatures.mehrsprachigkeit.description',
      },
    ],
  },
  retail: {
    slug: 'retail',
    title: 'ecommerce-retail.title',
    icon: 'shopping_cart',
    hero: {
      headline: 'ecommerce-retail.hero.headline',
      subheadline: 'ecommerce-retail.hero.subheadline',
      excerpt: 'ecommerce-retail.hero.excerpt',
    },
    challenges: [
      {
        title: 'ecommerce-retail.challenges.warenkorb_abbrueche.title',
        description: 'ecommerce-retail.challenges.warenkorb_abbrueche.description',
      },
      {
        title: 'ecommerce-retail.challenges.performance.title',
        description: 'ecommerce-retail.challenges.performance.description',
      },
      {
        title: 'ecommerce-retail.challenges.marken_erlebnis.title',
        description: 'ecommerce-retail.challenges.marken_erlebnis.description',
      },
    ],
    solutions: [
      {
        title: 'ecommerce-retail.solutions.high_speed_frontend.title',
        description: 'ecommerce-retail.solutions.high_speed_frontend.description',
        icon: 'shopping_cart',
      },
      {
        title: 'ecommerce-retail.solutions.conversion_optimierung.title',
        description: 'ecommerce-retail.solutions.conversion_optimierung.description',
        icon: 'speed',
      },
      {
        title: 'ecommerce-retail.solutions.omnichannel.title',
        description: 'ecommerce-retail.solutions.omnichannel.description',
        icon: 'analytics',
      },
    ],
    customFeatures: [
      {
        title: 'ecommerce-retail.customFeatures.produkt_konfigurator.title',
        description: 'ecommerce-retail.customFeatures.produkt_konfigurator.description',
      },
      {
        title: 'ecommerce-retail.customFeatures.cross_selling_module.title',
        description: 'ecommerce-retail.customFeatures.cross_selling_module.description',
      },
      {
        title: 'ecommerce-retail.customFeatures.loyalty_integration.title',
        description: 'ecommerce-retail.customFeatures.loyalty_integration.description',
      },
    ],
  },
};
