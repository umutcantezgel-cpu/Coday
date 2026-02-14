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
      processStepsKey: 'services_data.shared.tech_process',
      advantagesKey: 'services_data.shared.tech_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
    },
    'e-commerce-shops': {
      category: 'Web Development',
      slug: 'e-commerce-shops',
      icon: 'shopping_cart',
      titleKey: 'services_data.web-development.e-commerce-shops.title',
      descriptionKey: 'services_data.web-development.e-commerce-shops.description',
      longDescriptionKey: 'services_data.web-development.e-commerce-shops.long_description',
      benefitsKey: 'services_data.web-development.e-commerce-shops.benefits',
      processStepsKey: 'services_data.shared.tech_process',
      advantagesKey: 'services_data.shared.tech_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
    },
    'full-stack-entwicklung': {
      category: 'Web Development',
      slug: 'full-stack-entwicklung',
      icon: 'layers',
      titleKey: 'services_data.web-development.full-stack-entwicklung.title',
      descriptionKey: 'services_data.web-development.full-stack-entwicklung.description',
      longDescriptionKey: 'services_data.web-development.full-stack-entwicklung.long_description',
      benefitsKey: 'services_data.web-development.full-stack-entwicklung.benefits',
      processStepsKey: 'services_data.shared.tech_process',
      advantagesKey: 'services_data.shared.tech_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
    },
    'cloud-infrastructure': {
      category: 'Web Development',
      slug: 'cloud-infrastructure',
      icon: 'cloud',
      titleKey: 'services_data.web-development.cloud-infrastructure.title',
      descriptionKey: 'services_data.web-development.cloud-infrastructure.description',
      longDescriptionKey: 'services_data.web-development.cloud-infrastructure.long_description',
      benefitsKey: 'services_data.web-development.cloud-infrastructure.benefits',
      processStepsKey: 'services_data.shared.tech_process',
      advantagesKey: 'services_data.shared.tech_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
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
      processStepsKey: 'services_data.shared.design_process',
      advantagesKey: 'services_data.shared.design_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
    },
    'design-systems': {
      category: 'Web Design',
      slug: 'design-systems',
      icon: 'widgets',
      titleKey: 'services_data.web-design.design-systems.title',
      descriptionKey: 'services_data.web-design.design-systems.description',
      longDescriptionKey: 'services_data.web-design.design-systems.long_description',
      benefitsKey: 'services_data.web-design.design-systems.benefits',
      processStepsKey: 'services_data.shared.design_process',
      advantagesKey: 'services_data.shared.design_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
    },
    'website-relaunch': {
      category: 'Web Design',
      slug: 'website-relaunch',
      icon: 'rocket',
      titleKey: 'services_data.web-design.website-relaunch.title',
      descriptionKey: 'services_data.web-design.website-relaunch.description',
      longDescriptionKey: 'services_data.web-design.website-relaunch.long_description',
      benefitsKey: 'services_data.web-design.website-relaunch.benefits',
      processStepsKey: 'services_data.shared.design_process',
      advantagesKey: 'services_data.shared.design_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
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
      processStepsKey: 'services_data.shared.tech_process',
      advantagesKey: 'services_data.shared.tech_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
    },
    'performance-optimization': {
      category: 'Growth',
      slug: 'performance-optimization',
      icon: 'speed',
      titleKey: 'services_data.growth.performance-optimization.title',
      descriptionKey: 'services_data.growth.performance-optimization.description',
      longDescriptionKey: 'services_data.growth.performance-optimization.long_description',
      benefitsKey: 'services_data.growth.performance-optimization.benefits',
      processStepsKey: 'services_data.shared.tech_process',
      advantagesKey: 'services_data.shared.tech_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
    },
    'digital-consulting': {
      category: 'Growth',
      slug: 'digital-consulting',
      icon: 'lightbulb',
      titleKey: 'services_data.growth.digital-consulting.title',
      descriptionKey: 'services_data.growth.digital-consulting.description',
      longDescriptionKey: 'services_data.growth.digital-consulting.long_description',
      benefitsKey: 'services_data.growth.digital-consulting.benefits',
      processStepsKey: 'services_data.shared.tech_process',
      advantagesKey: 'services_data.shared.tech_advantages',
      testimonialsKey: 'services_data.shared.tech_testimonials',
      faqsKey: 'services_data.shared.standard_faqs',
    },
  },
};
