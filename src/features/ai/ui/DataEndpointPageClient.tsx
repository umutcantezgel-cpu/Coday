'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import { SeoHead } from '@/shared/ui/SeoHead';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { JsonLd } from '@/shared/ui/JsonLd';
import { aiDataEndpoints } from '@/shared/data/ai-data-endpoints';
import { Download, FileCsv, FileText, Database, ShieldCheck } from '@phosphor-icons/react';

export default function DataEndpointPage() {
  const params = useParams();
  const dataset = params?.dataset as string;
  const endpoint = aiDataEndpoints.find((d) => d.slug === dataset);

  if (!endpoint) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <h1 className="text-3xl font-bold">Dataset not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title={`${endpoint.title} | Coday Open Data`}
        description={endpoint.description}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'API Docs', url: 'https://www.codayweb.de/ai/api-docs' },
          { name: endpoint.title, url: `https://www.codayweb.de/ai/data/${endpoint.slug}` },
        ]}
      />
      <JsonLd
        pageUrl={`https://www.codayweb.de/ai/data/${endpoint.slug}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'API Docs', url: 'https://www.codayweb.de/ai/api-docs' },
          { name: endpoint.title, url: `https://www.codayweb.de/ai/data/${endpoint.slug}` },
        ]}
        data={{
          dataset: {
            name: endpoint.title,
            description: endpoint.description,
            url: `https://www.codayweb.de/ai/data/${endpoint.slug}`,
            license: endpoint.license,
            dateModified: endpoint.lastUpdated,
            distribution: [
              {
                encodingFormat: 'application/json',
                contentUrl: `https://www.codayweb.de${endpoint.endpoints.json}`,
              },
              {
                encodingFormat: 'text/csv',
                contentUrl: `https://www.codayweb.de${endpoint.endpoints.csv}`,
              },
            ],
          },
        }}
      />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <Breadcrumbs className="mb-8" />

        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider rounded-lg mb-6">
            <Database weight="fill" />
            {endpoint.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
            {endpoint.title}
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">{endpoint.description}</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Schema Definition
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-900 uppercase font-bold text-xs">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg">Field</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3 rounded-tr-lg">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {endpoint.schema.map((field) => (
                      <tr
                        key={field.field}
                        className="hover:bg-slate-50 transition-colors motion-reduce:duration-[0.01ms]"
                      >
                        <td className="px-4 py-4 font-mono font-bold text-primary">
                          {field.field}
                        </td>
                        <td className="px-4 py-4 font-mono text-xs">{field.type}</td>
                        <td className="px-4 py-4">{field.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Sample Data
              </h2>
              <div className="bg-slate-900 text-slate-300 p-6 rounded-xl overflow-x-auto font-mono text-sm shadow-inner">
                <pre>{JSON.stringify(endpoint.sampleData.slice(0, 3), null, 2)}</pre>
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 sticky top-32">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Access Data</h3>

              <div className="space-y-3 mb-8">
                <a
                  href={endpoint.endpoints.json}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between p-4 bg-emerald-50 text-emerald-800 rounded-xl hover:bg-emerald-100 transition-colors motion-reduce:duration-[0.01ms] group"
                >
                  <span className="flex items-center gap-3 font-bold">
                    <FileText weight="duotone" className="text-xl text-emerald-600" />
                    JSON Format
                  </span>
                  <Download
                    weight="bold"
                    className="opacity-50 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms]"
                  />
                </a>
                <a
                  href={endpoint.endpoints.csv}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-800 rounded-xl hover:bg-blue-100 transition-colors motion-reduce:duration-[0.01ms] group"
                >
                  <span className="flex items-center gap-3 font-bold">
                    <FileCsv weight="duotone" className="text-xl text-blue-600" />
                    CSV Format
                  </span>
                  <Download
                    weight="bold"
                    className="opacity-50 group-hover:opacity-100 transition-opacity motion-reduce:duration-[0.01ms]"
                  />
                </a>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Metadata
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">License</span>
                    <span className="flex items-center gap-1 text-slate-900 font-bold bg-slate-100 px-2 py-1 rounded">
                      <ShieldCheck weight="fill" className="text-emerald-500" />
                      {endpoint.license}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="font-semibold text-slate-500">Last Updated</span>
                    <span className="text-slate-900">
                      {new Date(endpoint.lastUpdated).toLocaleDateString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GlobalCTA />
    </div>
  );
}
