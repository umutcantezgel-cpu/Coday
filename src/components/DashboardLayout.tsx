import React from 'react';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden lg:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined">hub</span>
            <span>Agency Admin</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-primary bg-primary/5 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">lan</span>
            Sitemap & URLs
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">analytics</span>
            Performance
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@agency.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-bold text-gray-900">System-Architektur & URLs</h1>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90">
            <span className="material-symbols-outlined text-sm">add</span>
            Add New URL
          </button>
        </header>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto p-8 relative bg-slate-50" style={{backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px'}}>
          
          {/* Node 1 Root */}
          <div className="absolute top-[50px] left-[50%] -translate-x-1/2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined text-sm">home</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Home Page</h4>
                  <p className="text-xs text-gray-500">Main Entry</p>
                </div>
              </div>
              <span className="text-gray-400">...</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded p-2 text-xs">
              <span className="font-mono text-gray-500">/</span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">LCP 0.4s</span>
            </div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
          </div>

          {/* SVG Connector Lines */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
             <path d="M 600 135 C 600 200, 300 200, 300 250" fill="none" stroke="#cbd5e1" strokeWidth="2" />
             <path d="M 600 135 C 600 200, 600 200, 600 250" fill="none" stroke="#cbd5e1" strokeWidth="2" />
             <path d="M 600 135 C 600 200, 900 200, 900 250" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          </svg>

          {/* Level 2 Nodes */}
          <div className="flex justify-center gap-16 mt-48">
            
            {/* Node Services */}
            <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 relative">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    <span className="material-symbols-outlined text-sm">design_services</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Services</h4>
                    <p className="text-xs text-gray-500">Overview</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded p-2 text-xs">
                <span className="font-mono text-gray-500">/services</span>
                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">LCP 1.2s</span>
              </div>
            </div>

            {/* Node About */}
            <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 relative">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                    <span className="material-symbols-outlined text-sm">info</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">About Us</h4>
                    <p className="text-xs text-gray-500">Company</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded p-2 text-xs">
                <span className="font-mono text-gray-500">/about</span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">LCP 0.6s</span>
              </div>
            </div>

            {/* Node Work */}
            <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 relative">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                    <span className="material-symbols-outlined text-sm">folder_open</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Work</h4>
                    <p className="text-xs text-gray-500">Portfolio</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded p-2 text-xs">
                <span className="font-mono text-gray-500">/work</span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">LCP 0.8s</span>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
