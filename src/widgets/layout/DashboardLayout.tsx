import React from 'react';
import { SeoHead } from '@/shared/ui/SeoHead';
import { OptimizedIcon } from '@/shared/ui/OptimizedIcon';
import {
  ShareNetwork,
  SquaresFour,
  ChartBar,
  Gear,
  Plus,
  House,
  Palette,
  Info,
  FolderOpen,
} from '@phosphor-icons/react/dist/ssr';

const DashboardLayout: React.FC = () => {
  // ...
  return (
    <div className="flex h-dvh bg-gray-50 overflow-hidden">
      <SeoHead title="Coday Admin" noIndex={true} />
      <div className="flex items-center gap-2 text-primary font-bold">
        <OptimizedIcon icon={ShareNetwork} />
        <span>Agency Admin</span>
      </div>

      <nav role="navigation" className="flex-1 px-4 py-6 space-y-1">
        <a
          href="/contact"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <OptimizedIcon icon={SquaresFour} size="sm" className="text-xl" />
          Dashboard
        </a>
        <a
          href="/contact"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-primary bg-primary/5 rounded-lg"
        >
          <OptimizedIcon icon={ShareNetwork} size="sm" className="text-xl" />
          Sitemap & URLs
        </a>
        <a
          href="/contact"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <OptimizedIcon icon={ChartBar} size="sm" className="text-xl" />
          Performance
        </a>
        <a
          href="/contact"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
        >
          <OptimizedIcon icon={Gear} size="sm" className="text-xl" />
          Settings
        </a>
      </nav>

      {/* ... */}
      {/* Header */}
      <header
        role="banner"
        className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6"
      >
        <h1 className="text-lg font-bold text-gray-900">System-Architektur & URLs</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90">
          <OptimizedIcon icon={Plus} className="text-sm" />
          Add New URL
        </button>
      </header>

      {/* ... */}
      {/* Node 1 Root */}
      <div className="absolute top-[50px] left-[50%] -translate-x-1/2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <OptimizedIcon icon={House} className="text-sm" />
            </div>
            {/* ... */}
            {/* Node Services */}
            <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 relative">
              {/* ... */}
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <OptimizedIcon icon={Palette} className="text-sm" />
              </div>
              {/* ... */}
              {/* Node About */}
              <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 relative">
                {/* ... */}
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                  <OptimizedIcon icon={Info} className="text-sm" />
                </div>
                {/* ... */}
                {/* Node Work */}
                <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 relative">
                  {/* ... */}
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                    <OptimizedIcon icon={FolderOpen} className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Work</h4>
                    <p className="text-xs text-gray-500">Portfolio</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded p-2 text-xs">
                <span className="font-mono text-gray-500">/work</span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                  LCP 0.8s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
