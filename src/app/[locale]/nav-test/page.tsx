'use client';

import * as React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const dynamic = 'force-static';

export default function TestPage() {
  let _locale = 'de' as string;
  return (
    <div className="flex h-screen w-full">
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
          {/* SEO */}
          <section className="container mx-auto px-4 py-16 max-w-5xl text-secondary-600">
            <h2 className="text-3xl font-display font-bold mb-6">
              Navigating the Future of Web Design and User Experience
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                In the rapidly evolving landscape of digital interaction, intuitive navigation
                stands as the cornerstone of effective web design. A well-structured navigation
                system not only guides users seamlessly through a website but also serves as a
                critical factor in search engine optimization (SEO) and user retention. When users
                arrive at a webpage, their immediate goal is often to find specific information
                quickly and effortlessly. If the navigation is convoluted or unintuitive, the
                likelihood of them bouncing off to a competitor's site increases exponentially.
              </p>
              <p>
                Modern web design demands that navigation be more than just a list of links; it must
                be an intelligent, responsive, and accessible tool. This includes utilizing clear,
                descriptive labels, logical hierarchical structures, and visual cues that indicate
                the current page or section. For instance, implementing a sticky navigation bar
                ensures that the menu remains accessible regardless of how far down a user scrolls,
                enhancing the overall user experience. Additionally, the rise of mobile browsing has
                necessitated the adoption of responsive navigation patterns, such as the ubiquitous
                hamburger menu, which conserves valuable screen real estate while providing full
                access to the site's architecture.
              </p>
              <p>
                Furthermore, accessibility in navigation cannot be overstated. Ensuring that
                navigation elements are keyboard-navigable and screen-reader friendly is not just a
                best practice; it's an essential aspect of inclusive design. By incorporating ARIA
                (Accessible Rich Internet Applications) landmarks and roles, developers can provide
                essential context to assistive technologies, making the web a more welcoming place
                for everyone. Ultimately, the goal of navigation testing and optimization is to
                create a frictionless journey for the user, one that naturally leads them to their
                destination while simultaneously communicating the site's structure to search engine
                crawlers, thereby boosting visibility and engagement.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
