import { describe, expect, it } from 'vitest';

import deUi from '../../../public/locales/de/ui.json';
import enUi from '../../../public/locales/en/ui.json';
import deCommon from '../../../public/locales/de/common.json';
import enCommon from '../../../public/locales/en/common.json';
import { ROOT_CLIENT_NAMESPACES } from '../clientMessages';
import { getNavItems } from '@/widgets/navigation/config';

type Messages = Record<string, unknown>;

/**
 * `ui` is the client-side slice of `common` (see clientMessages.ts). Every key
 * a `'use client'` component reads through `useTranslations('ui')` has to exist
 * in both locale files, with the value copied verbatim from common.json, or
 * `getMessageFallback` renders the literal `ui.<key>` into the page.
 */

// Static key paths read by the switched client components.
const STATIC_KEYS: Record<string, string[]> = {
  'src/features/enterprise/ScrollContextCTA.tsx': [
    'scroll_cta.ready',
    'scroll_cta.dominate',
    'scroll_cta.book_audit',
  ],
  'src/features/faq/ui/RelevantFAQs.tsx': ['generic_detail.faq.title'],
  'src/features/services/ui/ServiceDetailClient.tsx': [
    'nav.services.label',
    'generic_detail.trust.title',
  ],
  'src/features/services/ui/WebDevelopmentClient.tsx': ['actions.read_more'],
  'src/shared/ui/Breadcrumbs.tsx': [
    'nav.main.home',
    // NAV_KEYS map
    'nav.services.label',
    'nav.industries.label',
    'nav.work.label',
    'nav.resources.knowledge.title',
    'nav.about.contact.label',
    'nav.career.label',
    'nav.company.legal',
    'nav.services.web_development.label',
    'nav.services.web_design.label',
    'nav.services.seo.label',
    'nav.services.performance.label',
    'nav.academy.blog.label',
    'nav.main.pricing',
    // breadcrumb.<segment> lookups
    'breadcrumb.academy',
    'breadcrumb.benefits',
    'breadcrumb.branchen',
    'breadcrumb.calendar',
    'breadcrumb.community',
    'breadcrumb.culture',
    'breadcrumb.events',
    'breadcrumb.faq',
    'breadcrumb.jobs',
    'breadcrumb.marketplace',
    'breadcrumb.members',
    'breadcrumb.newsletter',
    'breadcrumb.whitepapers',
    'breadcrumb.wiki',
    'breadcrumb.wikihub',
  ],
  'src/shared/ui/GlobalCTA.tsx': [
    'global_cta.title_prefix',
    'global_cta.title_highlight',
    'global_cta.subtitle',
    'global_cta.button',
  ],
  'src/shared/ui/PreferredSourceCta.tsx': [
    'preferredSources.sectionTitle',
    'preferredSources.footerTitle',
    'preferredSources.footerDesc',
    'preferredSources.articleTitle',
    'preferredSources.articleDesc',
    'preferredSources.articleButton',
    'preferredSources.loadButton',
    'preferredSources.notice',
    'preferredSources.deeplinkLabel',
    'preferredSources.newTabHint',
    'preferredSources.moreLabel',
    'preferredSources.moreBlog',
    'preferredSources.moreServices',
  ],
  'src/shared/ui/StepIndicator.tsx': ['steps.packages', 'steps.calculator', 'steps.contact'],
  'src/shared/ui/StickyCTA.tsx': ['cta.sticky.label', 'cta.sticky.text', 'buttons.start_project'],
  // Header client islands (MobileReadyNav, MobileNavOverlay, CardNav) on top of
  // the nav config keys collected below.
  'src/widgets/navigation/*': [
    'nav.a11y.sections',
    'nav.packages.label',
    'nav.cta_booking',
    'nav.mobile.label',
    'close',
  ],
};

/** Every label / desc / title referenced by the header's nav config. */
function navConfigKeys(): string[] {
  const keys = new Set<string>();
  for (const item of getNavItems()) {
    keys.add(item.label);
    for (const group of item.groups ?? []) {
      keys.add(group.title);
      for (const link of group.links) {
        keys.add(link.label);
        if (link.desc) keys.add(link.desc);
      }
    }
    for (const link of item.links ?? []) {
      keys.add(link.label);
      if (link.desc) keys.add(link.desc);
    }
  }
  return [...keys];
}

function getPath(messages: Messages, keyPath: string): unknown {
  return keyPath.split('.').reduce<unknown>((node, segment) => {
    if (node && typeof node === 'object' && segment in (node as Messages)) {
      return (node as Messages)[segment];
    }
    return undefined;
  }, messages);
}

function leafPaths(messages: Messages, prefix = ''): string[] {
  return Object.entries(messages).flatMap(([key, value]) => {
    const keyPath = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === 'object' ? leafPaths(value as Messages, keyPath) : [keyPath];
  });
}

const locales = [
  { locale: 'de', ui: deUi as Messages, common: deCommon as Messages },
  { locale: 'en', ui: enUi as Messages, common: enCommon as Messages },
];

const requiredKeys = [...new Set([...Object.values(STATIC_KEYS).flat(), ...navConfigKeys()])];

describe('ui namespace (client-side slice of common)', () => {
  it('is the root client namespace instead of common', () => {
    expect(ROOT_CLIENT_NAMESPACES).toContain('ui');
    expect(ROOT_CLIENT_NAMESPACES).not.toContain('common');
  });

  it.each(locales)('$locale: contains every key path the client components read', ({ ui }) => {
    const missing = requiredKeys.filter((keyPath) => typeof getPath(ui, keyPath) !== 'string');
    expect(missing).toEqual([]);
  });

  it.each(locales)('$locale: every value is a verbatim copy of common.json', ({ ui, common }) => {
    const drifted = leafPaths(ui).filter(
      (keyPath) => getPath(ui, keyPath) !== getPath(common, keyPath)
    );
    expect(drifted).toEqual([]);
  });

  it('has the same key paths in both locales', () => {
    expect(leafPaths(enUi as Messages).sort()).toEqual(leafPaths(deUi as Messages).sort());
  });

  it('stays a small slice of common', () => {
    const uiLeaves = leafPaths(deUi as Messages).length;
    const commonLeaves = leafPaths(deCommon as Messages).length;
    expect(uiLeaves).toBeLessThan(commonLeaves);
  });
});
