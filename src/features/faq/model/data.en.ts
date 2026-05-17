import { FAQItem, FAQCategory } from '@/features/faq/model/types';

export const faqCategories: FAQCategory[] = [
  { id: 'general', title: 'General', icon: 'info' },
  { id: 'pricing', title: 'Pricing & Models', icon: 'coins' },
  { id: 'services', title: 'Services', icon: 'layers' },
  { id: 'tech', title: 'Technology', icon: 'cpu' },
  { id: 'process', title: 'Process', icon: 'workflow' },
];

export const faqItems: FAQItem[] = [
  {
    id: 'cost-website',
    question: 'How much does a website cost?',
    answer:
      'Our pricing is transparent and fair. Our specific packages start at a one-time setup of **€939** plus **€49** monthly (Starter). Our popular Professional package is **€1,619** setup + **€99**/month. For complex Enterprise solutions, packages start at **€2,219** setup.',
    category: 'pricing',
    relatedServices: ['web-development', 'web-design'],
  },
  {
    id: 'wordpress',
    question: 'Do you work with WordPress?',
    answer:
      '**No.** We believe WordPress is a security risk and performance bottleneck for modern businesses. We build with React (React Router v7 / Next.js) and Headless CMS (Sanity/Strapi) to ensure 100/100 performance scores and military-grade security.',
    category: 'tech',
    relatedServices: ['web-development'],
  },
  {
    id: 'hourly-rate',
    question: 'What is your hourly rate?',
    answer:
      "We don't sell hours. We sell results. Our pricing is project-based or retainer-based, depending on the scope. This aligns our incentives with yours: We want to deliver high-quality work efficiently, not drag out the process to bill more hours.",
    category: 'pricing',
    relatedServices: ['consulting'],
  },
  {
    id: 'maintenance',
    question: 'Do you offer maintenance?',
    answer:
      "Yes. Digital products need care. We offer 'Growth Retainers' that include not just updates and security patches, but continuous optimization (CRO), A/B testing, and feature additions.",
    category: 'services',
    relatedServices: ['web-development', 'app-development'],
  },
  {
    id: 'timeline',
    question: 'How long does a project take?',
    answer:
      'A typical high-performance website takes 4-8 weeks. A complex web application takes 3-6 months. We work in 2-week sprints and deliver shippable code every fortnight.',
    category: 'process',
    relatedServices: ['web-development'],
  },
  {
    id: 'seo-guarantee',
    question: 'Do you guarantee #1 on Google?',
    answer:
      'No reputable agency can guarantee #1. However, we guarantee the best possible technical foundation (100/100 Lighthouse Scores, Semantic HTML, Schema.org) which is the prerequisite for ranking. Our content strategies have a proven track record of improved visibility.',
    category: 'services',
    relatedServices: ['seo', 'marketing'],
  },
  {
    id: 'hosting',
    question: 'Where is the data hosted?',
    answer:
      'We prioritize Digital Sovereignty. By default, we deploy on European infrastructure (managed Vercel/Netlify nodes in Frankfurt or Hetzner Cloud) to ensure strict GDPR compliance. We avoid US-only data centers for sensitive projects.',
    category: 'tech',
    relatedServices: ['web-development', 'consulting'],
  },
  {
    id: 'design-revisions',
    question: 'How many design revisions do I get?',
    answer:
      "We don't limit revisions strictly, but we work in a collaborative process to avoid 'surprise' reveals. We involve you in wireframing and prototyping, so by the time we get to high-fidelity UI, we differ only on details, not direction.",
    category: 'process',
    relatedServices: ['design', 'web-design'],
  },
  {
    id: 'mobile-app',
    question: 'Do I need a Mobile App or a Web App?',
    answer:
      "90% of businesses don't need a native app store app. A Progressive Web App (PWA) offers the same features (offline mode, push notifications, install ability) at a fraction of the cost and with better SEO. We advise native only for high-performance games or specific hardware access.",
    category: 'tech',
    relatedServices: ['app-development', 'web-development'],
  },
  {
    id: 'content-creation',
    question: 'Do you write the content or do I?',
    answer:
      'We can do both. However, we recommend our AI-Assisted Content Service. We interview you to capture your expertise, and then use our AI agents to structure and polish it. This saves you time and ensures SEO optimization.',
    category: 'services',
    relatedServices: ['marketing', 'seo'],
  },
];
