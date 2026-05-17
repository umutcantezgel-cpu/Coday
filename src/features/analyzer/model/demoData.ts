import type { TFunction } from 'i18next';
import { AnalysisResult } from '@/features/analyzer/model/types';

export const getDemoResult = (t: TFunction): AnalysisResult => ({
  id: 'demo-audit-123',
  url: 'https://example-agency.com',
  domain: 'example-agency.com',
  overallScore: 42,
  urgencyScore: 85,
  analyzedAt: new Date().toISOString(),
  duration: 1240,
  techStack: ['WordPress', 'jQuery', 'Apache'],
  screenshotUrl:
    '/images/portfolio/mockup-website-immobilienagentur-real-estate-listings-preise-berlin.webp',

  performance: {
    score: 35,
    summary: t('demo.performance.summary'),
    metrics: {
      lcp: {
        value: '4.8s',
        status: t('demo.performance.lcp_status') as 'gut' | 'mittel' | 'schlecht',
      },
      fid: {
        value: '240ms',
        status: t('demo.performance.fid_status') as 'gut' | 'mittel' | 'schlecht',
      },
      cls: {
        value: '0.25',
        status: t('demo.performance.cls_status') as 'gut' | 'mittel' | 'schlecht',
      },
      ttfb: {
        value: '1.2s',
        status: t('demo.performance.ttfb_status') as 'gut' | 'mittel' | 'schlecht',
      },
    },
    issues: [
      {
        severity: 'kritisch',
        title: t('demo.performance.issues.0.title'),
        description: t('demo.performance.issues.0.description'),
        fix: t('demo.performance.issues.0.fix'),
      },
      {
        severity: 'hoch',
        title: t('demo.performance.issues.1.title'),
        description: t('demo.performance.issues.1.description'),
        fix: t('demo.performance.issues.1.fix'),
      },
    ],
  },

  seo: {
    score: 65,
    summary: t('demo.seo.summary'),
    checks: {
      metaTitle: {
        found: true,
        value: 'Home - Example Agency',
        quality: t('demo.seo.checks.metaTitle.quality') as 'gut' | 'mittel' | 'schlecht',
      },
      metaDescription: {
        found: true,
        value: 'Wir machen Webdesign.',
        quality: t('demo.seo.checks.metaDescription.quality') as 'gut' | 'mittel' | 'schlecht',
      },
      h1: {
        count: 1,
        values: ['Willkommen'],
        quality: t('demo.seo.checks.h1.quality') as 'gut' | 'mittel' | 'schlecht',
      },
      images: { total: 12, withAlt: 5, percentage: 41 },
      internalLinks: 5,
      schemaMarkup: false,
    },
    issues: [
      {
        severity: 'hoch',
        title: t('demo.seo.issues.0.title'),
        description: t('demo.seo.issues.0.description'),
        fix: t('demo.seo.issues.0.fix'),
      },
      {
        severity: 'mittel',
        title: t('demo.seo.issues.1.title'),
        description: t('demo.seo.issues.1.description'),
        fix: t('demo.seo.issues.1.fix'),
      },
    ],
  },

  security: {
    score: 20,
    summary: t('demo.security.summary'),
    checks: {
      https: { enabled: false, valid: false },
      headers: { csp: false, xFrameOptions: false, hsts: false, xContentType: true },
      cookies: { secure: false, httpOnly: true },
    },
    issues: [
      {
        severity: 'kritisch',
        title: t('demo.security.issues.0.title'),
        description: t('demo.security.issues.0.description'),
        fix: t('demo.security.issues.0.fix'),
      },
      {
        severity: 'hoch',
        title: t('demo.security.issues.1.title'),
        description: t('demo.security.issues.1.description'),
        fix: t('demo.security.issues.1.fix'),
      },
    ],
  },

  accessibility: {
    score: 80,
    summary: t('demo.accessibility.summary'),
    wcagLevel: 'AA',
    checks: {
      colorContrast: { passed: 15, failed: 2 },
      keyboardNav: true,
      ariaLabels: {
        used: true,
        quality: t('demo.accessibility.checks.ariaLabels') as 'gut' | 'mittel' | 'schlecht',
      },
      formLabels: { total: 4, labeled: 4 },
    },
    issues: [
      {
        severity: 'niedrig',
        title: t('demo.accessibility.issues.0.title'),
        description: t('demo.accessibility.issues.0.description'),
        fix: t('demo.accessibility.issues.0.fix'),
      },
    ],
  },

  ux: {
    score: 45,
    summary: t('demo.ux.summary'),
    checks: {
      mobileResponsive: false,
      navigation: {
        quality: t('demo.ux.checks.navigation') as 'gut' | 'mittel' | 'schlecht',
        depth: 3,
      },
      cta: {
        visible: true,
        count: 1,
        quality: t('demo.ux.checks.cta') as 'gut' | 'mittel' | 'schlecht',
      },
      trustSignals: { count: 0, types: [] },
      visualHierarchy: t('demo.ux.checks.visualHierarchy') as 'gut' | 'mittel' | 'schlecht',
    },
    issues: [
      {
        severity: 'hoch',
        title: t('demo.ux.issues.0.title'),
        description: t('demo.ux.issues.0.description'),
        fix: t('demo.ux.issues.0.fix'),
      },
      {
        severity: 'mittel',
        title: t('demo.ux.issues.1.title'),
        description: t('demo.ux.issues.1.description'),
        fix: t('demo.ux.issues.1.fix'),
      },
    ],
  },

  content: {
    score: 60,
    summary: t('demo.content.summary'),
    checks: {
      headline: {
        quality: t('demo.content.checks.headline') as 'gut' | 'mittel' | 'schlecht',
        hasUVP: false,
      },
      readability: {
        score: 60,
        gradeLevel: t('demo.content.checks.readability.grade'),
        quality: t('demo.content.checks.readability.quality') as 'gut' | 'mittel' | 'schlecht',
      },
      socialProof: { found: false, types: [] },
      ctaText: {
        quality: t('demo.content.checks.ctaText') as 'gut' | 'mittel' | 'schlecht',
        examples: ['Hier klicken'],
      },
      freshness: 'unbekannt',
    },
    issues: [
      {
        severity: 'mittel',
        title: t('demo.content.issues.0.title'),
        description: t('demo.content.issues.0.description'),
        fix: t('demo.content.issues.0.fix'),
      },
    ],
  },

  actionPlan: [
    {
      step: 1,
      title: t('demo.actionPlan.0.title'),
      description: t('demo.actionPlan.0.description'),
      impact: 'hoch',
      effort: 'niedrig',
      role: 'dev',
    },
    {
      step: 2,
      title: t('demo.actionPlan.1.title'),
      description: t('demo.actionPlan.1.description'),
      impact: 'hoch',
      effort: 'mittel',
      role: 'dev',
    },
    {
      step: 3,
      title: t('demo.actionPlan.2.title'),
      description: t('demo.actionPlan.2.description'),
      impact: 'mittel',
      effort: 'niedrig',
      role: 'marketing',
    },
  ],
});
