import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';

export default function TestPrimitivesPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="text-2xl font-bold">UI Primitives Test</h1>
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
    </div>
  );
}
