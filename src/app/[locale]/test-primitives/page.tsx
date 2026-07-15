import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Primitives',
  robots: { index: false, follow: false },
};

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-static';

export default function TestPrimitivesPage() {
  let _locale = 'de' as string;
  return (
    <div className="p-8 flex flex-col gap-8">
      \n <h1 className="text-2xl font-bold">UI Primitives Test</h1>
      <div>
        <h2 className="mb-4">Buttons</h2>
        <div className="flex gap-4 items-center">
          <Button id="btn-sm" size="sm">
            Small
          </Button>
          <Button id="btn-md" size="md">
            Medium
          </Button>
          <Button id="btn-icon" size="icon" aria-label="Confirm">
            <Icon icon={CheckCircle} />
          </Button>
          <Button id="btn-loading" state="loading">
            Loading
          </Button>
          <Button id="btn-success" state="success">
            Success
          </Button>
        </div>
      </div>
      <div>
        <h2 className="mb-4">Inputs</h2>
        <div className="max-w-sm">
          <Input id="input-normal" label="Normal Input" />
          <Input id="input-error" label="Error Input" error="This is an error" />
          <Input id="input-helper" label="Helper Input" helperText="Helper text" />
        </div>
      </div>
      <div>
        <h2 className="mb-4">Badges</h2>
        <div className="flex gap-4 items-center">
          <Badge id="badge-normal">Normal Badge</Badge>
          <Badge id="badge-interactive" interactive>
            Interactive Badge
          </Badge>
        </div>
      </div>
      {/* SEO Content */}
      <div className="mt-16 text-secondary-600 max-w-5xl">
        <h2 className="text-3xl font-display font-bold mb-6">
          Modern UI Primitives for Premium Web Development
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Building a modern, highly interactive, and visually stunning web application requires a
            solid foundation of UI primitives. At Coday, a leading web design and development agency
            based in Wetzlar, we leverage a comprehensive suite of meticulously crafted UI
            components to deliver exceptional user experiences. This test page serves as a sandbox
            to validate and demonstrate the capabilities of our foundational UI elements, such as
            buttons, input fields, badges, and various interactive states. By standardizing these
            primitives, we ensure absolute consistency across all our digital products, accelerating
            the development process while maintaining the highest standards of quality and
            performance.
          </p>
          <p>
            The importance of robust UI components cannot be overstated in today's fast-paced
            digital landscape. A well-designed button or a perfectly accessible input field might
            seem like a small detail, but these micro-interactions collectively shape how a user
            perceives a brand. Our approach focuses on semantic HTML, full keyboard accessibility,
            and dynamic state management (such as loading, success, and error states). Every
            component is built to be highly customizable, allowing us to adapt the visual language
            to meet the unique branding requirements of each client. Whether we are building a
            complex headless e-commerce platform or a sleek corporate website, these primitives form
            the building blocks of our success.
          </p>
          <p>
            Furthermore, our UI primitives are optimized for performance. By utilizing modern
            frameworks like Next.js and TailwindCSS, we guarantee that our components add minimal
            overhead to the application bundle. We strictly adhere to performance budgets, ensuring
            that metrics like Largest Contentful Paint (LCP) and Interaction to Next Paint (INP)
            remain firmly within the green zone. This relentless focus on performance not only
            provides a superior experience for the end-user but also significantly boosts the
            website's SEO rankings. Search engines reward fast, accessible, and well-structured web
            pages, making our robust component library an integral part of our overarching SEO
            strategy.
          </p>
          <p>
            This testing environment is an essential part of our quality assurance process. Before
            any component is deployed to a live production environment, it undergoes rigorous
            testing here to ensure it behaves correctly under all possible conditions and across
            various devices and screen sizes. From mobile smartphones to large desktop monitors, our
            responsive UI primitives adapt seamlessly. As we continue to push the boundaries of
            modern web development in Wetzlar and beyond, our component library will evolve,
            incorporating the latest design trends and technological advancements. We are committed
            to engineering excellence, and this test page is a testament to our dedication to
            delivering flawless digital solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
