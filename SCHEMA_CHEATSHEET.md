# Schema.org JSON-LD Cheat-Sheet

Dieses Dokument beschreibt, welches Schema auf welchen Seiten deiner Next.js App eingebunden werden sollte und wie man sie kombiniert.

## 1. Welches Schema gehört wohin?

| Seitentyp / Route | Benötigtes Schema | Generator-Funktion | Besonderheiten |
| :--- | :--- | :--- | :--- |
| **Startseite** (`/`) | `Organization` | `getOrganizationSchema()` | Basis-Identität. Muss nur hier oder im Root-Layout sein. |
| **Service-Seiten** (`/services/[slug]`) | `Service` | `generateServiceSchema()` | Definiert Angebot, Preis (falls `packages` übergeben) und Zielgruppe (B2B). |
| **Blog-Artikel** (`/knowledge/blog/[slug]`) | `BlogPosting` | `generateBlogSchema()` | Enorm wichtig für **GEO**! `dateModified` und `wordCount` ausfüllen! |
| **Case Studies** (`/work/[slug]`) | `CreativeWork` | `generateCaseStudySchema()` | Portfolio-Stücke. `clientName` nur bei Freigabe angeben! |
| **Alle Seiten mit FAQs** | `FAQPage` | `generateFAQSchema()` | Kann auf jeder Seite an ein anderes Schema *angehängt* werden. |
| **Alle Unterseiten (Tiefe ≥ 2)** | `BreadcrumbList` | `generateBreadcrumbSchema()`| Erzeugt Navigation in SERPs (Google Suchergebnissen). |

## 2. Verwendung in Next.js 15 (`page.tsx`)

Um ein Schema in eine Next.js 15 Seite einzubinden, nutzt du einfach einen `<script>` Tag mit `dangerouslySetInnerHTML`. 

### Beispiel 1: Einzelnes Schema (Blog)
```tsx
import { generateBlogSchema } from '@/shared/lib/schema';

export default function BlogPostPage({ params }) {
  // 1. Daten von Sanity holen
  const post = await getSanityPost(params.slug);
  
  // 2. Schema generieren
  const jsonLd = generateBlogSchema({
    title: post.title,
    description: post.excerpt,
    url: `https://codayweb.de/knowledge/blog/${post.slug}`,
    imageUrl: post.mainImage,
    datePublished: post.publishedAt,
    category: 'Web Development',
  });

  // 3. Ins DOM hängen
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>{post.title}</h1>
    </article>
  );
}
```

### Beispiel 2: Mehrere Schemata kombinieren (Service + FAQ)
Oft hast du Seiten, die sowohl einen *Service* beschreiben als auch *FAQs* enthalten. Du kannst einfach ein Array von Schemata an `JSON.stringify` übergeben:

```tsx
import { generateServiceSchema, generateFAQSchema } from '@/shared/lib/schema';

export default function ServicePage({ params }) {
  const service = await getSanityService(params.slug);
  
  const serviceJsonLd = generateServiceSchema({
    name: service.title,
    description: service.description,
    url: `https://codayweb.de/services/${service.slug}`,
  });

  const faqJsonLd = generateFAQSchema(service.faqs);

  // Array bilden (faqJsonLd kann null sein, daher filtern wir)
  const jsonLdArray = [serviceJsonLd, faqJsonLd].filter(Boolean);

  return (
    <section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArray) }} />
      {/* ... Content ... */}
    </section>
  );
}
```

## 3. Testen in der CI
Jeder Build wird von Vitest geprüft, um leere Felder zu vermeiden. Führe lokal aus:
```bash
npx vitest run src/shared/lib/schema/__tests__/schema.test.ts
```

Für **Live-Seiten** nutze Googles Testtool für Rich-Suchergebnisse:
[https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
