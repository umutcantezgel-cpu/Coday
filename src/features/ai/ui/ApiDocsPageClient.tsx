'use client';

import React from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { GlobalCTA } from '@/shared/ui/GlobalCTA';
import { aiDataEndpoints } from '@/shared/data/ai-data-endpoints';
import { CodeBlock, dracula } from 'react-code-blocks';
import { Code, Database, FileText } from '@phosphor-icons/react';

export default function ApiDocsPage() {
  const curlExample = `curl -X GET "https://www.codayweb.de/api/data/cwv-dach-benchmarks/json" \\
  -H "Accept: application/json"`;

  const jsExample = `fetch('https://www.codayweb.de/api/data/cwv-dach-benchmarks/json')
  .then(response => response.json())
  .then(data => console.log(data));`;

  const pythonExample = `import requests

response = requests.get('https://www.codayweb.de/api/data/cwv-dach-benchmarks/json')
data = response.json()
print(data)`;

  return (
    <div className="bg-slate-50 min-h-dvh pt-24 pb-16">
      <SeoHead
        title="OpenAPI Documentation & Data Endpoints | Coday"
        description="Access Coday's machine-readable industry datasets, CWV benchmarks, and SEO adoption rates via our public JSON/CSV APIs."
        breadcrumbs={[
          { name: 'Home', url: 'https://www.codayweb.de' },
          { name: 'API Docs', url: 'https://www.codayweb.de/ai/api-docs' },
        ]}
      />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <Breadcrumbs className="mb-8" />

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
              OpenAPI
            </span>{' '}
            & Data Endpoints
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            Welcome to the Coday Data Layer. We provide 30 open datasets covering DACH benchmarks,
            Web Performance, and SEO trends. Free to use (CC-BY-4.0).
          </p>
        </header>

        {/* API Usage Examples */}
        <section className="mb-16 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-900 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Code weight="duotone" className="text-emerald-400" />
              Integration Snippets
            </h2>
          </div>
          <div className="p-8 grid md:grid-cols-3 gap-8 bg-slate-900 pt-0">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                cURL
              </h3>
              <div className="text-sm rounded-lg overflow-hidden font-mono">
                <CodeBlock
                  text={curlExample}
                  language="bash"
                  showLineNumbers={false}
                  theme={dracula}
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                JavaScript
              </h3>
              <div className="text-sm rounded-lg overflow-hidden font-mono">
                <CodeBlock
                  text={jsExample}
                  language="javascript"
                  showLineNumbers={false}
                  theme={dracula}
                />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                Python
              </h3>
              <div className="text-sm rounded-lg overflow-hidden font-mono">
                <CodeBlock
                  text={pythonExample}
                  language="python"
                  showLineNumbers={false}
                  theme={dracula}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Endpoint List */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <Database weight="duotone" className="text-primary" />
            Available Datasets
          </h2>

          <div className="grid gap-4">
            {aiDataEndpoints.map((endpoint) => (
              <a
                key={endpoint.slug}
                href={`/ai/data/${endpoint.slug}`}
                className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-primary/50 hover:shadow-md transition motion-reduce:duration-[0.01ms] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase rounded">
                      {endpoint.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors motion-reduce:duration-[0.01ms]">
                      {endpoint.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 font-mono">
                    GET /api/data/{endpoint.slug}/json
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-lg flex items-center gap-2">
                    <FileText weight="bold" /> JSON
                  </span>
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg flex items-center gap-2">
                    <FileText weight="bold" /> CSV
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
      <GlobalCTA />
    </div>
  );
}
