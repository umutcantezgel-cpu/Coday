export interface IndustryData {
  slug: string;
  title: string;
  icon: string;
  hero: {
    headline: string;
    subheadline: string;
  };
  challenges: { title: string; description: string }[];
  solutions: { title: string; description: string; icon: string }[];
  customFeatures: { title: string; description: string }[];
}

export const industriesData: Record<string, IndustryData> = {
  'handwerk-bau': {
    slug: 'handwerk-bau',
    title: 'industries.handwerk-bau.title',
    icon: 'hammer',
    hero: {
      headline: 'industries.handwerk-bau.hero.headline',
      subheadline: 'industries.handwerk-bau.hero.subheadline',
    },
    challenges: [
      {
        title: 'industries.handwerk-bau.challenges.fachkraftemangel.title',
        description: 'industries.handwerk-bau.challenges.fachkraftemangel.description',
      },
      {
        title: 'industries.handwerk-bau.challenges.falsche_anfragen.title',
        description: 'industries.handwerk-bau.challenges.falsche_anfragen.description',
      },
      {
        title: 'industries.handwerk-bau.challenges.veralteter_auftritt.title',
        description: 'industries.handwerk-bau.challenges.veralteter_auftritt.description',
      },
    ],
    solutions: [
      {
        title: 'industries.handwerk-bau.solutions.mitarbeiter_funnel.title',
        description: 'industries.handwerk-bau.solutions.mitarbeiter_funnel.description',
        icon: 'group',
      },
      {
        title: 'industries.handwerk-bau.solutions.projekt_showcase.title',
        description: 'industries.handwerk-bau.solutions.projekt_showcase.description',
        icon: 'collections',
      },
      {
        title: 'industries.handwerk-bau.solutions.lokale_seo.title',
        description: 'industries.handwerk-bau.solutions.lokale_seo.description',
        icon: 'location_on',
      },
    ],
    customFeatures: [
      {
        title: 'industries.handwerk-bau.customFeatures.projekt_kalkulator.title',
        description: 'industries.handwerk-bau.customFeatures.projekt_kalkulator.description',
      },
      {
        title: 'industries.handwerk-bau.customFeatures.terminbuchung.title',
        description: 'industries.handwerk-bau.customFeatures.terminbuchung.description',
      },
      {
        title: 'industries.handwerk-bau.customFeatures.cms_referenzen.title',
        description: 'industries.handwerk-bau.customFeatures.cms_referenzen.description',
      },
    ],
  },
  'immobilien-makler': {
    slug: 'immobilien-makler',
    title: 'industries.immobilien-makler.title',
    icon: 'apartment',
    hero: {
      headline: 'industries.immobilien-makler.hero.headline',
      subheadline: 'industries.immobilien-makler.hero.subheadline',
    },
    challenges: [
      {
        title: 'industries.immobilien-makler.challenges.objektakquise.title',
        description: 'industries.immobilien-makler.challenges.objektakquise.description',
      },
      {
        title: 'industries.immobilien-makler.challenges.vergleichbarkeit.title',
        description: 'industries.immobilien-makler.challenges.vergleichbarkeit.description',
      },
      {
        title: 'industries.immobilien-makler.challenges.mobile_darstellung.title',
        description: 'industries.immobilien-makler.challenges.mobile_darstellung.description',
      },
    ],
    solutions: [
      {
        title: 'industries.immobilien-makler.solutions.digitales_expose.title',
        description: 'industries.immobilien-makler.solutions.digitales_expose.description',
        icon: 'web',
      },
      {
        title: 'industries.immobilien-makler.solutions.eigentuemer_flow.title',
        description: 'industries.immobilien-makler.solutions.eigentuemer_flow.description',
        icon: 'currency_exchange',
      },
      {
        title: 'industries.immobilien-makler.solutions.branding.title',
        description: 'industries.immobilien-makler.solutions.branding.description',
        icon: 'verified',
      },
    ],
    customFeatures: [
      {
        title: 'industries.immobilien-makler.customFeatures.immobilien_bewertungstool.title',
        description:
          'industries.immobilien-makler.customFeatures.immobilien_bewertungstool.description',
      },
      {
        title: 'industries.immobilien-makler.customFeatures.virtuelle_touren.title',
        description: 'industries.immobilien-makler.customFeatures.virtuelle_touren.description',
      },
      {
        title: 'industries.immobilien-makler.customFeatures.objekt_filter.title',
        description: 'industries.immobilien-makler.customFeatures.objekt_filter.description',
      },
    ],
  },
  'aerzte-gesundheit': {
    slug: 'aerzte-gesundheit',
    title: 'industries.aerzte-gesundheit.title',
    icon: 'local_hospital',
    hero: {
      headline: 'industries.aerzte-gesundheit.hero.headline',
      subheadline: 'industries.aerzte-gesundheit.hero.subheadline',
    },
    challenges: [
      {
        title: 'industries.aerzte-gesundheit.challenges.telefon_ueberlastung.title',
        description: 'industries.aerzte-gesundheit.challenges.telefon_ueberlastung.description',
      },
      {
        title: 'industries.aerzte-gesundheit.challenges.sichtbarkeit.title',
        description: 'industries.aerzte-gesundheit.challenges.sichtbarkeit.description',
      },
      {
        title: 'industries.aerzte-gesundheit.challenges.vertrauensaufbau.title',
        description: 'industries.aerzte-gesundheit.challenges.vertrauensaufbau.description',
      },
    ],
    solutions: [
      {
        title: 'industries.aerzte-gesundheit.solutions.online_terminbuchung.title',
        description: 'industries.aerzte-gesundheit.solutions.online_terminbuchung.description',
        icon: 'calendar_month',
      },
      {
        title: 'industries.aerzte-gesundheit.solutions.leistungs_darstellung.title',
        description: 'industries.aerzte-gesundheit.solutions.leistungs_darstellung.description',
        icon: 'medical_services',
      },
      {
        title: 'industries.aerzte-gesundheit.solutions.team_vorstellung.title',
        description: 'industries.aerzte-gesundheit.solutions.team_vorstellung.description',
        icon: 'groups',
      },
    ],
    customFeatures: [
      {
        title: 'industries.aerzte-gesundheit.customFeatures.digitaler_anamnesebogen.title',
        description:
          'industries.aerzte-gesundheit.customFeatures.digitaler_anamnesebogen.description',
      },
      {
        title: 'industries.aerzte-gesundheit.customFeatures.recall_system.title',
        description: 'industries.aerzte-gesundheit.customFeatures.recall_system.description',
      },
      {
        title: 'industries.aerzte-gesundheit.customFeatures.rezept_bestellung.title',
        description: 'industries.aerzte-gesundheit.customFeatures.rezept_bestellung.description',
      },
    ],
  },
  'anwaelte-kanzleien': {
    slug: 'anwaelte-kanzleien',
    title: 'industries.anwaelte-kanzleien.title',
    icon: 'gavel',
    hero: {
      headline: 'industries.anwaelte-kanzleien.hero.headline',
      subheadline: 'industries.anwaelte-kanzleien.hero.subheadline',
    },
    challenges: [
      {
        title: 'industries.anwaelte-kanzleien.challenges.mandanten_qualitaet.title',
        description: 'industries.anwaelte-kanzleien.challenges.mandanten_qualitaet.description',
      },
      {
        title: 'industries.anwaelte-kanzleien.challenges.konservatives_image.title',
        description: 'industries.anwaelte-kanzleien.challenges.konservatives_image.description',
      },
      {
        title: 'industries.anwaelte-kanzleien.challenges.content_pflege.title',
        description: 'industries.anwaelte-kanzleien.challenges.content_pflege.description',
      },
    ],
    solutions: [
      {
        title: 'industries.anwaelte-kanzleien.solutions.mandats_anfrage.title',
        description: 'industries.anwaelte-kanzleien.solutions.mandats_anfrage.description',
        icon: 'assignment',
      },
      {
        title: 'industries.anwaelte-kanzleien.solutions.expertise_showcase.title',
        description: 'industries.anwaelte-kanzleien.solutions.expertise_showcase.description',
        icon: 'workspace_premium',
      },
      {
        title: 'industries.anwaelte-kanzleien.solutions.modernes_serioeses_design.title',
        description:
          'industries.anwaelte-kanzleien.solutions.modernes_serioeses_design.description',
        icon: 'balance',
      },
    ],
    customFeatures: [
      {
        title: 'industries.anwaelte-kanzleien.customFeatures.kostenrechner.title',
        description: 'industries.anwaelte-kanzleien.customFeatures.kostenrechner.description',
      },
      {
        title: 'industries.anwaelte-kanzleien.customFeatures.download_center.title',
        description: 'industries.anwaelte-kanzleien.customFeatures.download_center.description',
      },
      {
        title: 'industries.anwaelte-kanzleien.customFeatures.blog_system.title',
        description: 'industries.anwaelte-kanzleien.customFeatures.blog_system.description',
      },
    ],
  },
  'gastronomie-hotellerie': {
    slug: 'gastronomie-hotellerie',
    title: 'industries.gastronomie-hotellerie.title',
    icon: 'restaurant',
    hero: {
      headline: 'industries.gastronomie-hotellerie.hero.headline',
      subheadline: 'industries.gastronomie-hotellerie.hero.subheadline',
    },
    challenges: [
      {
        title: 'industries.gastronomie-hotellerie.challenges.hohe_provisionen.title',
        description: 'industries.gastronomie-hotellerie.challenges.hohe_provisionen.description',
      },
      {
        title: 'industries.gastronomie-hotellerie.challenges.personalmangel.title',
        description: 'industries.gastronomie-hotellerie.challenges.personalmangel.description',
      },
      {
        title: 'industries.gastronomie-hotellerie.challenges.veraltete_karten.title',
        description: 'industries.gastronomie-hotellerie.challenges.veraltete_karten.description',
      },
    ],
    solutions: [
      {
        title: 'industries.gastronomie-hotellerie.solutions.direktbuchung.title',
        description: 'industries.gastronomie-hotellerie.solutions.direktbuchung.description',
        icon: 'bookmark_add',
      },
      {
        title: 'industries.gastronomie-hotellerie.solutions.event_marketing.title',
        description: 'industries.gastronomie-hotellerie.solutions.event_marketing.description',
        icon: 'celebration',
      },
      {
        title: 'industries.gastronomie-hotellerie.solutions.visual_storytelling.title',
        description: 'industries.gastronomie-hotellerie.solutions.visual_storytelling.description',
        icon: 'camera_alt',
      },
    ],
    customFeatures: [
      {
        title: 'industries.gastronomie-hotellerie.customFeatures.digitale_speisekarte.title',
        description:
          'industries.gastronomie-hotellerie.customFeatures.digitale_speisekarte.description',
      },
      {
        title: 'industries.gastronomie-hotellerie.customFeatures.gutschein_shop.title',
        description: 'industries.gastronomie-hotellerie.customFeatures.gutschein_shop.description',
      },
      {
        title: 'industries.gastronomie-hotellerie.customFeatures.bewerber_video_integration.title',
        description:
          'industries.gastronomie-hotellerie.customFeatures.bewerber_video_integration.description',
      },
    ],
  },
  'ecommerce-retail': {
    slug: 'ecommerce-retail',
    title: 'industries.ecommerce-retail.title',
    icon: 'shopping_cart',
    hero: {
      headline: 'industries.ecommerce-retail.hero.headline',
      subheadline: 'industries.ecommerce-retail.hero.subheadline',
    },
    challenges: [
      {
        title: 'industries.ecommerce-retail.challenges.warenkorb_abbrueche.title',
        description: 'industries.ecommerce-retail.challenges.warenkorb_abbrueche.description',
      },
      {
        title: 'industries.ecommerce-retail.challenges.performance.title',
        description: 'industries.ecommerce-retail.challenges.performance.description',
      },
      {
        title: 'industries.ecommerce-retail.challenges.marken_erlebnis.title',
        description: 'industries.ecommerce-retail.challenges.marken_erlebnis.description',
      },
    ],
    solutions: [
      {
        title: 'industries.ecommerce-retail.solutions.high_speed_frontend.title',
        description: 'industries.ecommerce-retail.solutions.high_speed_frontend.description',
        icon: 'bolt',
      },
      {
        title: 'industries.ecommerce-retail.solutions.conversion_optimierung.title',
        description: 'industries.ecommerce-retail.solutions.conversion_optimierung.description',
        icon: 'trending_up',
      },
      {
        title: 'industries.ecommerce-retail.solutions.omnichannel.title',
        description: 'industries.ecommerce-retail.solutions.omnichannel.description',
        icon: 'storefront',
      },
    ],
    customFeatures: [
      {
        title: 'industries.ecommerce-retail.customFeatures.produkt_konfigurator.title',
        description: 'industries.ecommerce-retail.customFeatures.produkt_konfigurator.description',
      },
      {
        title: 'industries.ecommerce-retail.customFeatures.cross_selling_module.title',
        description: 'industries.ecommerce-retail.customFeatures.cross_selling_module.description',
      },
      {
        title: 'industries.ecommerce-retail.customFeatures.loyalty_integration.title',
        description: 'industries.ecommerce-retail.customFeatures.loyalty_integration.description',
      },
    ],
  },
  unternehmensberatung: {
    slug: 'unternehmensberatung',
    title: 'industries.unternehmensberatung.title',
    icon: 'business_center',
    hero: {
      headline: 'industries.unternehmensberatung.hero.headline',
      subheadline: 'industries.unternehmensberatung.hero.subheadline',
    },
    challenges: [
      {
        title: 'industries.unternehmensberatung.challenges.erklaerungsbedarf.title',
        description: 'industries.unternehmensberatung.challenges.erklaerungsbedarf.description',
      },
      {
        title: 'industries.unternehmensberatung.challenges.vertrauen.title',
        description: 'industries.unternehmensberatung.challenges.vertrauen.description',
      },
      {
        title: 'industries.unternehmensberatung.challenges.differenzierung.title',
        description: 'industries.unternehmensberatung.challenges.differenzierung.description',
      },
    ],
    solutions: [
      {
        title: 'industries.unternehmensberatung.solutions.whitepaper_funnels.title',
        description: 'industries.unternehmensberatung.solutions.whitepaper_funnels.description',
        icon: 'description',
      },
      {
        title: 'industries.unternehmensberatung.solutions.case_studies.title',
        description: 'industries.unternehmensberatung.solutions.case_studies.description',
        icon: 'cases',
      },
      {
        title: 'industries.unternehmensberatung.solutions.webinare.title',
        description: 'industries.unternehmensberatung.solutions.webinare.description',
        icon: 'video_camera_front',
      },
    ],
    customFeatures: [
      {
        title: 'industries.unternehmensberatung.customFeatures.termin_kalender.title',
        description: 'industries.unternehmensberatung.customFeatures.termin_kalender.description',
      },
      {
        title: 'industries.unternehmensberatung.customFeatures.podcast_integration.title',
        description:
          'industries.unternehmensberatung.customFeatures.podcast_integration.description',
      },
      {
        title: 'industries.unternehmensberatung.customFeatures.mitgliederbereich.title',
        description: 'industries.unternehmensberatung.customFeatures.mitgliederbereich.description',
      },
    ],
  },
  'startups-tech': {
    slug: 'startups-tech',
    title: 'industries.startups-tech.title',
    icon: 'rocket_launch',
    hero: {
      headline: 'industries.startups-tech.hero.headline',
      subheadline: 'industries.startups-tech.hero.subheadline',
    },
    challenges: [
      {
        title: 'industries.startups-tech.challenges.time_to_market.title',
        description: 'industries.startups-tech.challenges.time_to_market.description',
      },
      {
        title: 'industries.startups-tech.challenges.talent_war.title',
        description: 'industries.startups-tech.challenges.talent_war.description',
      },
      {
        title: 'industries.startups-tech.challenges.internationalisierung.title',
        description: 'industries.startups-tech.challenges.internationalisierung.description',
      },
    ],
    solutions: [
      {
        title: 'industries.startups-tech.solutions.skalierbare_tech_stacks.title',
        description: 'industries.startups-tech.solutions.skalierbare_tech_stacks.description',
        icon: 'code',
      },
      {
        title: 'industries.startups-tech.solutions.modernstes_design.title',
        description: 'industries.startups-tech.solutions.modernstes_design.description',
        icon: 'computer',
      },
      {
        title: 'industries.startups-tech.solutions.investor_relations.title',
        description: 'industries.startups-tech.solutions.investor_relations.description',
        icon: 'attach_money',
      },
    ],
    customFeatures: [
      {
        title: 'industries.startups-tech.customFeatures.saas_integration.title',
        description: 'industries.startups-tech.customFeatures.saas_integration.description',
      },
      {
        title: 'industries.startups-tech.customFeatures.dark_mode.title',
        description: 'industries.startups-tech.customFeatures.dark_mode.description',
      },
      {
        title: 'industries.startups-tech.customFeatures.mehrsprachigkeit.title',
        description: 'industries.startups-tech.customFeatures.mehrsprachigkeit.description',
      },
    ],
  },
};
