import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'en') {
    return generatePageMetadata({
      title: 'Our Work — Client Projects',
      description: 'See real client projects by Coday: Batherm, MS Schlüsseldienst Wetzlar, Lindener Ratsstuben.',
      path: '/en/work',
      type: 'money',
    });
  }
  return generatePageMetadata({
    title: 'Referenzen — Kundenprojekte',
    description: 'Echte Kundenprojekte von Coday: Batherm, MS Schlüsseldienst Wetzlar, Lindener Ratsstuben.',
    path: '/de/work',
    type: 'money',
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const projects = [
    { name: 'Batherm', desc: isEn ? 'Heating technology company' : 'Heiztechnik-Unternehmen' },
    { name: 'MS Schlüsseldienst Wetzlar', desc: isEn ? 'Locksmith service' : 'Schlüsseldienst' },
    { name: 'Lindener Ratsstuben', desc: isEn ? 'Restaurant & inn' : 'Restaurant & Gasthaus' },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        {isEn ? 'Our Work' : 'Unsere Referenzen'}
      </h1>
      <p className="text-xl text-gray-300 mb-12">
        {isEn ? 'Real projects. Real results.' : 'Echte Projekte. Echte Ergebnisse.'}
      </p>

      <div className="grid gap-6">
        {projects.map((p) => (
          <div key={p.name} className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-bold mb-2">{p.name}</h2>
            <p className="text-gray-400">{p.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
