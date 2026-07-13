'use client';

import * as React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function TestPage() {
  let _locale = 'de' as string;
  return (
    <div className="flex h-screen w-full">
      \n{' '}
      <Sidebar
        items={[
          { id: '1', label: 'Dashboard', href: '#' },
          { id: '2', label: 'Settings', subItems: [{ label: 'Profile', href: '#' }] },
        ]}
      />
      <div className="flex-1 flex flex-col">
        <Navbar items={[{ label: 'Home', href: '#' }]} />
        <div className="p-8 flex-1 overflow-y-auto">
          <Breadcrumb
            items={[
              { label: 'Home', href: '#' },
              { label: 'Test', href: '#' },
            ]}
          />

          <h1 className="text-2xl font-bold mb-6">Navigation Test</h1>

          <h2 className="mt-8 mb-4 text-xl">Tabs Instance 1</h2>
          <Tabs
            tabs={[
              { id: 't1-1', label: 'Tab 1', content: <div>Content 1</div> },
              { id: 't1-2', label: 'Tab 2', content: <div>Content 2</div> },
            ]}
          />

          <h2 className="mt-8 mb-4 text-xl">Tabs Instance 2</h2>
          <Tabs
            tabs={[
              { id: 't2-1', label: 'Tab A', content: <div>Content A</div> },
              { id: 't2-2', label: 'Tab B', content: <div>Content B</div> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
