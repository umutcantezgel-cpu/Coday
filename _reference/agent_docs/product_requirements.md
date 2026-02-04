# Product Requirements Summary

> Condensed requirements from PRD-AgencyDomination-MVP.md
> Reference this for feature implementation details.

---

## Core Features (P0 — Must Have)

### Feature 1: The "Supermarket" Calculator

**Purpose:** Interactive configurator where users "shop" website features like items in a supermarket.

**User Value:**
- Instant price transparency
- Feeling of control ("I buy only what I need")
- Gamification element

**Business Value:**
- Pre-qualified leads (budget commitment shown)
- Market differentiation
- Feature demand data collection

#### Module Categories

| Category | Required | Max Selections | Description |
|----------|----------|----------------|-------------|
| Basis-Pakete | Yes (1) | 1 | Base package selection |
| Design-Upgrades | No | Unlimited | Visual enhancements |
| Funktionen | No | Unlimited | Feature add-ons |
| Performance & SEO | No | Unlimited | Speed & visibility |
| Support & Wartung | No | 1 | Ongoing support tier |

#### Module List

**Basis-Pakete (Must select one):**
- Starter (1-5 pages): €1.490
- Business (6-15 pages): €2.990
- Enterprise (16+ pages): €4.990

**Design-Upgrades:**
- Custom Illustrations: +€490
- 3D Hero Section: +€690
- Micro-Animations (Lottie): +€390
- Dark Mode Toggle: +€190
- Custom Icon Set: +€290

**Funktionen:**
- Blog-System: +€590 (requires SEO-Grundpaket)
- Newsletter-Integration: +€290
- Kontaktformular Advanced: +€190
- Buchungssystem: +€490
- Multi-Language: +€690 (requires Business+, incompatible with Starter)
- Kundenportal: +€990 (requires Enterprise)

**Performance & SEO:**
- SEO-Grundpaket: +€390
- SEO-Premium: +€990 (requires SEO-Grundpaket)
- Speed-Optimierung: +€290
- Analytics Setup: +€190

**Support & Wartung:**
- Basic (Email, 48h): €0/month
- Priority (24h, Phone): €99/month
- Enterprise (4h, Slack): €299/month

#### Business Rules

```typescript
// 1. Exactly ONE Basis-Paket must be selected
// 2. Dependencies must be satisfied before selection
// 3. Incompatibilities prevent certain combinations
// 4. Discount tiers:
//    - >€5.000 = 5% off
//    - >€10.000 = 10% off
// 5. Delivery time increases with module complexity
```

#### Acceptance Criteria

- [ ] 15+ modules implemented with all metadata
- [ ] Price updates in <100ms on module toggle
- [ ] Shareable configuration URL works
- [ ] Mobile touch interaction is smooth
- [ ] Dependencies are enforced with clear messaging
- [ ] Incompatibilities show warnings
- [ ] Discount logic applies correctly
- [ ] Delivery time estimate is dynamic

#### UI Requirements

```
Desktop Layout:
┌──────────────────────────┬─────────────────┐
│  Category Tabs           │  STICKY SUMMARY │
├──────────────────────────┤                 │
│  Module Grid             │  Total: €X.XXX  │
│  ┌────┐ ┌────┐ ┌────┐   │  Monthly: €XX   │
│  │    │ │    │ │    │   │  Delivery: X d  │
│  └────┘ └────┘ └────┘   │                 │
│  ┌────┐ ┌────┐ ┌────┐   │  [Get Quote]    │
│  │    │ │    │ │    │   │                 │
└──────────────────────────┴─────────────────┘

Mobile Layout:
┌─────────────────────────────────────────────┐
│  Category Tabs (horizontal scroll)          │
├─────────────────────────────────────────────┤
│  Module Cards (single column)               │
│  ┌─────────────────────────────────────┐   │
│  │  Module Name              €XXX      │   │
│  │  Description...                     │   │
│  └─────────────────────────────────────┘   │
├─────────────────────────────────────────────┤
│  STICKY BOTTOM BAR                          │
│  Total: €X.XXX          [Get Quote]         │
└─────────────────────────────────────────────┘
```

---

### Feature 2: Deep-Dive Case Studies

**Purpose:** Transform portfolio from thumbnail gallery to detailed blog-style articles with storytelling.

**User Value:**
- Build trust through transparency
- Inspiration for own project
- Proof of competence

**Business Value:**
- SEO value (long-form content)
- Lead qualification (readers are serious)
- Differentiation from competitors

#### Case Study Structure

```markdown
## [Project Name]: [Catchy Headline]

### Quick Stats (Above the Fold)
| Industry | Duration | Budget | Key Result |
|----------|----------|--------|------------|
| [Value]  | X weeks  | €X-Xk  | +X% metric |

### The Challenge
[2-3 paragraphs about client's problem]
- Pain point bullet 1
- Pain point bullet 2
- Client quote (authentic)

### Our Approach
1. Discovery Phase
2. Design Exploration
3. Development
4. Launch & Optimization

### The Solution
[Visual presentation]
- Full-width screenshots
- Before/after comparisons
- Mobile views
- Interaction details

### The Results
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Page Load | 4.2s | 0.9s | -78% |
| Bounce Rate | 67% | 31% | -54% |
| Conversions | 12/mo | 47/mo | +291% |

### Client Testimonial
> "Quote with name and position"

### Technical Deep-Dive (Expandable)
[For tech-savvy readers]
- Stack used
- Interesting challenges
- Performance optimizations
```

#### Acceptance Criteria

- [ ] Minimum 3 complete case studies at MVP launch
- [ ] Each has all structural elements above
- [ ] Images optimized (WebP/AVIF, lazy-loaded)
- [ ] "Technical Deep-Dive" section is expandable
- [ ] Social sharing buttons work
- [ ] "Related Projects" section at bottom
- [ ] SEO metadata generated per case study

---

### Feature 3: Performance Showcase

**Purpose:** Use the website itself as proof of technical capability with live metrics display.

**User Value:**
- Instant proof of concept
- Trust in technical competence

**Business Value:**
- Differentiation (no competitor does this)
- Viral potential ("Look at their live metrics")

#### Implementation

```typescript
interface PerformanceWidget {
  currentLCP: number;        // Milliseconds
  lighthouseScore: number;   // 0-100
  lastUpdated: Date;
}

// Display locations:
// 1. Header badge (always visible)
// 2. /performance page (detailed dashboard)
```

#### Acceptance Criteria

- [ ] Live LCP display in header
- [ ] Actual LCP < 1.0s on ALL pages
- [ ] Lighthouse Score > 95
- [ ] /performance page with detailed metrics
- [ ] Web Vitals tracked and stored

---

## Supporting Features (P1 — Should Have)

| Feature | Description | Notes |
|---------|-------------|-------|
| Blog/Insights | Thought leadership content | SEO value, not launch-critical |
| Newsletter Signup | Email list building | Can use external tool initially |
| Live Chat | Direct contact widget | Intercom or similar, add later |

---

## Future Features (P2 — Could Have)

| Feature | Description | When |
|---------|-------------|------|
| Client Portal | Login area for project status | After scaling |
| A/B Testing | Conversion optimization | After traffic volume |
| Multi-Language | DE/EN | After DACH validation |

---

## Out of Scope (Won't Have in MVP)

- E-Commerce (direct payments)
- CRM integration
- Mobile app
- Video production services

---

## User Personas

### Primary: "Der Frustrierte Gründer"

**Name:** Stefan, 42
**Role:** CEO of mid-sized company (20-50 employees)
**Budget:** €5.000-15.000 (expects to pay €30.000+)

**Characteristics:**
- Disappointed by 2-3 agencies already
- Hates intransparent pricing
- Wants control over what they buy
- Mistrusts "creative agencies"

**Jobs to Be Done:**
- Functional: Website that generates customers
- Emotional: Not feeling ripped off
- Social: Professional appearance

### Secondary: "Der Startup-Founder"

**Age:** 25-35, tech-savvy
**Budget:** €2.000-5.000
**Trigger:** Sees performance numbers, convinced

### Secondary: "Der Marketing-Manager"

**Age:** 30-45, employed at medium company
**Budget:** Given (€10.000-25.000)
**Trigger:** Case studies with measurable ROI

---

## User Stories

### Epic: Website Configuration & Purchase

**Primary Story:**
> "Als KMU-Inhaber will ich selbst zusammenstellen, welche Features meine Website hat, damit ich nur für das zahle, was ich wirklich brauche."

**Supporting Stories:**

1. "Als User will ich sehen, wie schnell diese Website lädt, um der Performance zu vertrauen."
   - Performance badge in header
   - Lighthouse score visible

2. "Als User will ich detaillierte Case Studies, um zu verstehen wie die Agentur Probleme löst."
   - 3+ complete case studies
   - Problem → Solution → Result structure

3. "Als User will ich auf jedem Device eine perfekte Erfahrung."
   - Mobile-first design
   - Touch-optimized calculator

4. "Als potenzieller Kunde will ich sofort verstehen, warum diese Agentur anders ist."
   - Value proposition in <3 seconds
   - Concrete numbers, no buzzwords

---

## Success Metrics

### North Star Metric

**Qualified Leads per Month**
= User completed calculator AND submitted form with budget > €3.000

### OKRs (First 90 Days)

**O1: Establish Market Presence**
- KR1: 1.000 unique visitors in month 1
- KR2: Avg. session duration > 4 minutes
- KR3: Calculator completion rate > 40%

**O2: Generate Revenue Pipeline**
- KR1: 20 qualified leads in month 1
- KR2: Conversion rate (visit → lead) > 2%
- KR3: First paying customer within 30 days

**O3: Prove Technical Excellence**
- KR1: Lighthouse Score > 95 on all pages
- KR2: Zero performance regressions
- KR3: 100% uptime

### Metrics to Track

| Metric | Target | Tool |
|--------|--------|------|
| Unique Visitors | 1.000/mo | Analytics |
| Calculator Started | 40% of visitors | Custom event |
| Calculator Completed | 60% of started | Custom event |
| Lead Submitted | 2% of visitors | Form tracking |
| LCP | < 1.0s | Web Vitals |
| Lighthouse | > 95 | CI/CD |

---

## Non-Functional Requirements

### Performance (CRITICAL)

| Metric | Target | Blocker |
|--------|--------|---------|
| LCP | < 1.0s | > 1.5s |
| FID | < 50ms | > 100ms |
| CLS | < 0.05 | > 0.1 |
| TTFB | < 100ms | > 200ms |
| JS Bundle | < 100KB | > 150KB |

### Accessibility

- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen reader support
- Color contrast ratios met

### Browser Support

- Chrome (latest 2)
- Safari (latest 2)
- Firefox (latest 2)
- Edge (latest 2)
- iOS Safari 14+
- Chrome Android 10+

### Legal (GDPR)

- Cookie consent banner
- Privacy policy (Datenschutz)
- Imprint (Impressum)
- Terms (AGB) if needed

---

## Definition of Done (MVP)

### Features
- [ ] Calculator with 15+ modules
- [ ] 3 complete case studies
- [ ] Performance badge live
- [ ] Contact form functional
- [ ] All pages responsive

### Quality
- [ ] Lighthouse > 95 all pages
- [ ] LCP < 1.0s verified
- [ ] WCAG 2.1 AA passed
- [ ] Cross-browser tested

### Legal
- [ ] Impressum complete
- [ ] Datenschutz complete
- [ ] Cookie consent working

### Deployment
- [ ] Production domain live
- [ ] Analytics tracking
- [ ] Error monitoring
- [ ] Backup plan ready

---

*Condensed from PRD-AgencyDomination-MVP.md*
*Last Updated: 2026-02-01*
