export interface ServiceData {
  slug: string;
  icon: string;
  category: string;

  // Translation Keys
  titleKey: string;
  descriptionKey: string;
  longDescriptionKey: string;
  benefitsKey: string;

  // Shared Data Keys (Optional)
  processStepsKey?: string;
  advantagesKey?: string;
  testimonialsKey?: string;
  faqsKey?: string;
}

export const servicesData: Record<string, Record<string, ServiceData>> = {
  'web-development': {
    'react-nextjs-agentur': {
      category: 'Web Development',
      slug: 'react-nextjs-agentur',
      icon: 'code',
      titleKey: 'services_data.web-development.react-nextjs-agentur.title',
      descriptionKey: 'services_data.web-development.react-nextjs-agentur.description',
      longDescriptionKey: 'services_data.web-development.react-nextjs-agentur.long_description',
      benefitsKey: 'services_data.web-development.react-nextjs-agentur.benefits',
      processStepsKey: 'services_data.web-development.react-nextjs-agentur.process',
      advantagesKey: 'services_data.web-development.react-nextjs-agentur.advantages',
      testimonialsKey: 'services_data.web-development.react-nextjs-agentur.testimonials',
      faqsKey: 'services_data.web-development.react-nextjs-agentur.faqs',
    },
    'e-commerce-shops': {
      category: 'Web Development',
      slug: 'e-commerce-shops',
      icon: 'shopping_cart',
      titleKey: 'services_data.web-development.e-commerce-shops.title',
      descriptionKey: 'services_data.web-development.e-commerce-shops.description',
      longDescriptionKey: 'services_data.web-development.e-commerce-shops.long_description',
      benefitsKey: 'services_data.web-development.e-commerce-shops.benefits',
      processStepsKey: 'services_data.web-development.e-commerce-shops.process',
      advantagesKey: 'services_data.web-development.e-commerce-shops.advantages',
      testimonialsKey: 'services_data.web-development.e-commerce-shops.testimonials',
      faqsKey: 'services_data.web-development.e-commerce-shops.faqs',
    },
    'full-stack-entwicklung': {
      category: 'Web Development',
      slug: 'full-stack-entwicklung',
      icon: 'layers',
      titleKey: 'services_data.web-development.full-stack-entwicklung.title',
      descriptionKey: 'services_data.web-development.full-stack-entwicklung.description',
      longDescriptionKey: 'services_data.web-development.full-stack-entwicklung.long_description',
      benefitsKey: 'services_data.web-development.full-stack-entwicklung.benefits',
      processStepsKey: 'services_data.web-development.full-stack-entwicklung.process',
      advantagesKey: 'services_data.web-development.full-stack-entwicklung.advantages',
      testimonialsKey: 'services_data.web-development.full-stack-entwicklung.testimonials',
      faqsKey: 'services_data.web-development.full-stack-entwicklung.faqs',
    },
    'cloud-infrastructure': {
      category: 'Web Development',
      slug: 'cloud-infrastructure',
      icon: 'cloud',
      titleKey: 'services_data.web-development.cloud-infrastructure.title',
      descriptionKey: 'services_data.web-development.cloud-infrastructure.description',
      longDescriptionKey: 'services_data.web-development.cloud-infrastructure.long_description',
      benefitsKey: 'services_data.web-development.cloud-infrastructure.benefits',
      processStepsKey: 'services_data.web-development.cloud-infrastructure.process',
      advantagesKey: 'services_data.web-development.cloud-infrastructure.advantages',
      testimonialsKey: 'services_data.web-development.cloud-infrastructure.testimonials',
      faqsKey: 'services_data.web-development.cloud-infrastructure.faqs',
    },
  },
  'web-design': {
    'ux-ui-design': {
      category: 'Web Design',
      slug: 'ux-ui-design',
      icon: 'palette',
      titleKey: 'services_data.web-design.ux-ui-design.title',
      descriptionKey: 'services_data.web-design.ux-ui-design.description',
      longDescriptionKey: 'services_data.web-design.ux-ui-design.long_description',
      benefitsKey: 'services_data.web-design.ux-ui-design.benefits',
      processStepsKey: 'services_data.web-design.ux-ui-design.process',
      advantagesKey: 'services_data.web-design.ux-ui-design.advantages',
      testimonialsKey: 'services_data.web-design.ux-ui-design.testimonials',
      faqsKey: 'services_data.web-design.ux-ui-design.faqs',
    },
    'design-systems': {
      category: 'Web Design',
      slug: 'design-systems',
      icon: 'widgets',
      titleKey: 'services_data.web-design.design-systems.title',
      descriptionKey: 'services_data.web-design.design-systems.description',
      longDescriptionKey: 'services_data.web-design.design-systems.long_description',
      benefitsKey: 'services_data.web-design.design-systems.benefits',
      processStepsKey: 'services_data.web-design.design-systems.process',
      advantagesKey: 'services_data.web-design.design-systems.advantages',
      testimonialsKey: 'services_data.web-design.design-systems.testimonials',
      faqsKey: 'services_data.web-design.design-systems.faqs',
    },
    'website-relaunch': {
      category: 'Web Design',
      slug: 'website-relaunch',
      icon: 'rocket',
      titleKey: 'services_data.web-design.website-relaunch.title',
      descriptionKey: 'services_data.web-design.website-relaunch.description',
      longDescriptionKey: 'services_data.web-design.website-relaunch.long_description',
      benefitsKey: 'services_data.web-design.website-relaunch.benefits',
      processStepsKey: 'services_data.web-design.website-relaunch.process',
      advantagesKey: 'services_data.web-design.website-relaunch.advantages',
      testimonialsKey: 'services_data.web-design.website-relaunch.testimonials',
      faqsKey: 'services_data.web-design.website-relaunch.faqs',
    },
  },
  growth: {
    'seo-optimization': {
      category: 'Growth',
      slug: 'seo-optimization',
      icon: 'search',
      titleKey: 'services_data.growth.seo-optimization.title',
      descriptionKey: 'services_data.growth.seo-optimization.description',
      longDescriptionKey: 'services_data.growth.seo-optimization.long_description',
      benefitsKey: 'services_data.growth.seo-optimization.benefits',
      processStepsKey: 'services_data.growth.seo-optimization.process',
      advantagesKey: 'services_data.growth.seo-optimization.advantages',
      testimonialsKey: 'services_data.growth.seo-optimization.testimonials',
      faqsKey: 'services_data.growth.seo-optimization.faqs',
    },
    'performance-optimization': {
      category: 'Growth',
      slug: 'performance-optimization',
      icon: 'speed',
      titleKey: 'services_data.growth.performance-optimization.title',
      descriptionKey: 'services_data.growth.performance-optimization.description',
      longDescriptionKey: 'services_data.growth.performance-optimization.long_description',
      benefitsKey: 'services_data.growth.performance-optimization.benefits',
      processStepsKey: 'services_data.growth.performance-optimization.process',
      advantagesKey: 'services_data.growth.performance-optimization.advantages',
      testimonialsKey: 'services_data.growth.performance-optimization.testimonials',
      faqsKey: 'services_data.growth.performance-optimization.faqs',
    },
    'digital-consulting': {
      category: 'Growth',
      slug: 'digital-consulting',
      icon: 'lightbulb',
      titleKey: 'services_data.growth.digital-consulting.title',
      descriptionKey: 'services_data.growth.digital-consulting.description',
      longDescriptionKey: 'services_data.growth.digital-consulting.long_description',
      benefitsKey: 'services_data.growth.digital-consulting.benefits',
      processStepsKey: 'services_data.growth.digital-consulting.process',
      advantagesKey: 'services_data.growth.digital-consulting.advantages',
      testimonialsKey: 'services_data.growth.digital-consulting.testimonials',
      faqsKey: 'services_data.growth.digital-consulting.faqs',
    },
  },
};
